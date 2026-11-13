// Compact wire format for the /cards explorer.
//
// The explorer is a client component, so every card it receives is serialized
// into the page HTML as part of the React payload. Sending 194 objects with
// long key names and a ten-key boolean benefits object made that payload about
// 190 KB. Here each card travels as a short positional array with the benefits
// packed into one bitmask, and the client unpacks it back into the same
// SlimCard shape the explorer already uses. Same data, same math, smaller page.
//
// Like card-view.ts, this module must never import card JSON or runtime values
// from '@/data/cards'; type-only imports are fine.

import type { Benefits } from '@/data/cards';
import type { SlimCard } from '@/data/card-view';

/** Fixed bit order for the benefits mask. Append only; never reorder. */
export const BENEFIT_BITS: (keyof Benefits)[] = [
  'lounge_access', 'no_fx_fee', 'car_rental_insurance', 'travel_medical', 'trip_cancellation',
  'flight_delay', 'mobile_insurance', 'purchase_protection', 'extended_warranty', 'free_checked_bags',
];

export type PackedCard = [
  slug: string,
  name: string,
  issuer: string,
  program: string,
  cardType: string,
  annualFee: number,
  bonusValue: number,
  bonusPoints: number,      // 0 when the card has no points bonus
  firstYearValue: number,
  cppCad: number,           // 0 when unknown (null in SlimCard)
  country: 0 | 1,           // 0 = CA, 1 = US
  network: string,
  categories: string,       // comma separated
  benefits: number,         // bitmask over BENEFIT_BITS
  earn: string[],           // flat [category, rate, category, rate, ...]
];

export function packCard(c: SlimCard): PackedCard {
  let mask = 0;
  BENEFIT_BITS.forEach((k, i) => { if (c.benefits[k]) mask |= 1 << i; });
  return [
    c.slug, c.name, c.issuer, c.rewards_program, c.card_type,
    c.annual_fee, c.welcome_bonus_value, c.welcome_bonus_points ?? 0, c.first_year_value,
    c.cpp_cad ?? 0, c.country === 'US' ? 1 : 0, c.network, c.categories.join(','), mask,
    c.earn_rates.flatMap((e) => [e.category, e.rate]),
  ];
}

export function unpackCard(p: PackedCard): SlimCard {
  const [slug, name, issuer, program, cardType, fee, bonusValue, bonusPoints, fyv, cpp, country, network, cats, mask, earn] = p;
  const benefits = Object.fromEntries(BENEFIT_BITS.map((k, i) => [k, (mask & (1 << i)) !== 0])) as unknown as Benefits;
  const earn_rates = [];
  for (let i = 0; i + 1 < earn.length; i += 2) earn_rates.push({ category: earn[i], rate: earn[i + 1] });
  return {
    slug, name, issuer, rewards_program: program, card_type: cardType,
    annual_fee: fee, welcome_bonus_value: bonusValue, welcome_bonus_points: bonusPoints || null,
    first_year_value: fyv, cpp_cad: cpp || null, country: country === 1 ? 'US' : 'CA',
    network, categories: cats ? cats.split(',') : [], benefits, earn_rates,
  };
}
