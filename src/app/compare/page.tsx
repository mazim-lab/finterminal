import type { Metadata } from 'next';
import Link from 'next/link';
import { allCards, BENEFIT_LABELS, type Benefits } from '@/data/cards';
import { ogMeta } from '@/lib/og';
import CompareClient, { type CompareCard } from './CompareClient';
import s from './compare.module.css';

export const metadata: Metadata = {
  title: 'Compare credit cards side by side | FinTerminal',
  description: 'Put up to four Canadian or US credit cards head to head: fees, welcome bonuses, first-year value, earn rates and perks, side by side.',
  alternates: { canonical: '/compare' },
  ...ogMeta('Compare credit cards side by side', 'Credit cards', '/compare'),
};

// Server component: we ship only the fields the comparison table shows, never
// the full card JSON, and the page head prerenders as static HTML.
export default function ComparePage() {
  const cards: CompareCard[] = allCards.map((c) => ({
    slug: c.slug,
    name: c.name,
    issuer: c.issuer,
    country: c.country,
    network: c.network,
    rewards_program: c.rewards_program,
    annual_fee: c.annual_fee,
    first_year_fee: c.first_year_fee,
    welcome_bonus: c.welcome_bonus,
    welcome_bonus_points: c.welcome_bonus_points,
    welcome_bonus_value: c.welcome_bonus_value,
    first_year_value: c.first_year_value,
    cpp_cad: c.cpp_cad,
    foreign_transaction_fee: c.foreign_transaction_fee,
    foreign_transaction_fee_pct: c.foreign_transaction_fee_pct,
    earn_rates_summary: c.earn_rates_summary,
    earn_rates: c.earn_rates.slice(0, 5),
    benefits: c.benefits,
    benefits_incomplete: c.benefits_incomplete,
    apply_url: c.apply_url,
  }));
  // Same plain-language perk names the explorer and card pages use.
  const NICE: Partial<Record<keyof Benefits, string>> = {
    lounge_access: 'Lounge access', no_fx_fee: 'No foreign fees', car_rental_insurance: 'Rental car insurance',
    free_checked_bags: 'Free checked bag', travel_medical: 'Travel medical', trip_cancellation: 'Trip cancellation',
    mobile_insurance: 'Mobile insurance', purchase_protection: 'Purchase protection', extended_warranty: 'Extended warranty',
    flight_delay: 'Flight delay',
  };
  const benefitLabels = (Object.entries(BENEFIT_LABELS) as [keyof Benefits, string][]).map(
    ([k, l]): [keyof Benefits, string] => [k, NICE[k] ?? l],
  );
  // Quick picks: the top three Canadian cards by our own first-year estimate,
  // so the empty state has a one-tap way to start.
  const picks = [...allCards]
    .filter((c) => c.country === 'CA')
    .sort((a, b) => b.first_year_value - a.first_year_value)
    .slice(0, 3)
    .map((c) => c.slug);

  return (
    <div className={`wrap page tone-cards ${s.page}`}>
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span className="sep" aria-hidden="true">/</span>
        <Link href="/cards">Cards</Link><span className="sep" aria-hidden="true">/</span>
        <span className="cur" aria-current="page">Compare</span>
      </nav>
      <header className="page-head">
        <p className="eyebrow">Credit cards</p>
        <h1>Compare cards side by side</h1>
        <p className="dek">
          Pick up to four cards from the {allCards.length} we track. You get fees, welcome bonuses, our first-year
          estimate, earn rates and perks in one table, and the link updates so you can share it.
        </p>
      </header>
      <CompareClient cards={cards} benefitLabels={benefitLabels} picks={picks} />
    </div>
  );
}
