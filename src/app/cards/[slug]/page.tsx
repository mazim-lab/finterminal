import { allCards, Card, BENEFIT_LABELS, Benefits, formatCurrency } from '@/data/cards';
import { receiptLines, programName, isUnvalued, isTextOnlyBonus, compareByValue } from '@/data/card-view';
import { valuationFor } from '@/data/point-valuations';
import { ogMeta } from '@/lib/og';
import { formatBonusText } from '@/lib/bonusText';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import s from './detail.module.css';

export function generateStaticParams() {
  return allCards.map(card => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = allCards.find(c => c.slug === slug);
  if (!card) notFound();
  return {
    title: `${card.name} | FinTerminal`,
    description: stripDashes(`${card.name} by ${card.issuer}. Annual fee: ${formatCurrency(card.annual_fee, card.country)}. ${bonusProse(card.welcome_bonus) || 'Compare and learn more.'}`),
    alternates: { canonical: `/cards/${card.slug}` },
    ...ogMeta(card.name, 'Credit card', `/cards/${card.slug}`),
  };
}

// Plain-language perk names, shared with the explorer so one benefit never has two names.
const TAG_DEFS: [keyof Benefits, string][] = [
  ['lounge_access', 'Lounge access'], ['no_fx_fee', 'No foreign fees'], ['car_rental_insurance', 'Rental car insurance'],
  ['free_checked_bags', 'Free checked bag'], ['travel_medical', 'Travel medical'], ['trip_cancellation', 'Trip cancellation'],
  ['mobile_insurance', 'Mobile insurance'], ['purchase_protection', 'Purchase protection'], ['extended_warranty', 'Extended warranty'], ['flight_delay', 'Flight delay'],
];

// Insurance rows arrive as raw key/value pairs with no units, and the stored
// values are not coverage amounts we can stand behind: the same coverage reads
// "16" on one card and "500000" on another, and several look like footnote or
// section numbers picked up by the scraper. So we never print the number as a
// dollar or day amount. A non-empty value only tells us the issuer lists that
// coverage, which we show as "Included"; a word value (other than yes/no) is
// shown as the label itself. Each row gets a readable name and a one-line note.
const INSURANCE_INFO: Record<string, [string, string]> = {
  travel_medical: ['Emergency travel medical', 'Medical emergencies while travelling outside your home province or state'],
  trip_cancellation: ['Trip cancellation and interruption', 'Prepaid trip costs if you have to cancel or cut a trip short for a covered reason'],
  flight_delay: ['Flight delay', 'Meals, hotel and essentials when a flight is delayed'],
  baggage_delay: ['Baggage delay', 'Essentials you buy while your checked bags are delayed'],
  lost_baggage: ['Lost or damaged baggage', 'Bags and personal items lost or damaged in transit'],
  travel_accident: ['Travel accident', 'Accidental death or dismemberment while travelling on a common carrier'],
  car_rental: ['Rental car collision and damage', 'Damage to or theft of a rental car when you decline the agency coverage'],
  mobile_insurance: ['Mobile device', 'Loss, theft or damage to a phone bought with the card'],
  purchase_protection: ['Purchase protection', 'Theft or damage to new purchases for a period after you buy'],
  extended_warranty: ['Extended warranty', 'Extends the manufacturer warranty on eligible purchases'],
};
function insuranceValue(v: string): string {
  const t = v.trim();
  if (!t) return 'Not listed';
  if (/^no$/i.test(t)) return 'Not included';
  // "Yes", or any bare number or code (no stated unit): the coverage is listed.
  if (/^yes$/i.test(t) || /^[\d.,$%\s]+$/.test(t)) return 'Included';
  return formatBonusText(t);
}
function prettyKey(k: string): string {
  const w = k.replace(/_/g, ' ').trim();
  return w.charAt(0).toUpperCase() + w.slice(1);
}

// ── Answer-first generated copy ─────────────────────────
// Everything below is derived from a card's real fields so all ~195 cards (and any
// future ones) get an answer-first verdict + FAQ from a single template. No em dashes
// in any generated prose (house voice). Never fabricate facts; drop what we can't back
// with data.

// Strip em dashes (and en dashes) from any data-sourced string before it reaches
// generated prose or JSON-LD. House voice forbids em dashes, and some issuer-sourced
// fields (welcome_bonus, conditions, value formula) can contain them; the upstream
// cleaners do not remove a stray dash mid-string, so we guard here. Replace with a
// comma when the dash sits between words, otherwise just drop it.
function stripDashes(s: string): string {
  return s
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/,\s*,/g, ',')
    .replace(/,(\s*[.;])/g, '$1');
}

// Scraped welcome-bonus copy used inside our own sentences (FAQ answers, the
// meta description): a number range keeps its meaning ("5 to 10"), any other
// dash becomes a comma, and footnote markers go (see lib/bonusText).
function bonusProse(s: string): string {
  const ranged = s.replace(/(\d)\s*[\u2013\u2014]\s*(?=\$?\d)/g, '$1 to ');
  return stripDashes(formatBonusText(ranged)).replace(/\s+-\s+/g, ', ');
}

// Trim trailing punctuation/whitespace so we can safely append our own sentence.
// Also strips em/en dashes so data-sourced text stays within house voice.
function stripTrailingPunct(s: string): string {
  return stripDashes(s).replace(/[\s.;,]+$/, '').trim();
}

// Coerce card_type to a safe value. The US importer passes it through with no
// fallback, so an empty/undefined value would otherwise render as "undefined".
function cardTypeWord(card: Card): string {
  return card.card_type || 'rewards';
}

// A short, plain description of who the card suits, inferred from data only.
function audienceFor(card: Card): string {
  const b = card.benefits;
  const type = cardTypeWord(card);
  if (card.is_business) return 'small business owners who want to earn on company spending';
  if (b.lounge_access) return 'frequent flyers who value lounge access and premium travel perks';
  if (b.no_fx_fee) return 'people who travel or shop in other currencies and want to skip foreign transaction fees';
  if (type === 'cashback') return 'people who want straightforward cash back without tracking points';
  if (card.categories?.includes('travel')) return 'travellers who want to earn flexible points toward flights and trips';
  if (type === 'secured') return 'people building or rebuilding their credit history';
  if (type === 'student') return 'students who want a simple first rewards card';
  return 'everyday spenders who want to earn rewards on regular purchases';
}

// 2 to 4 sentence plain-language verdict, built entirely from real fields.
function buildBottomLine(card: Card): string {
  const cur = card.country;
  const netPart = card.network && card.network !== 'Unknown' ? ` on the ${card.network} network` : '';
  const typeWord = (card.is_business ? 'business ' : '') + cardTypeWord(card);

  // Sentence 1: what it is + annual fee.
  let feeClause: string;
  if (card.annual_fee === 0) {
    feeClause = 'has no annual fee';
  } else {
    feeClause = `carries a ${formatCurrency(card.annual_fee, cur)} annual fee`;
    if (card.first_year_fee === 0) {
      feeClause += ', though the first year is free';
    } else if (card.first_year_fee != null && card.first_year_fee !== card.annual_fee) {
      feeClause += `, or ${formatCurrency(card.first_year_fee, cur)} in the first year`;
    }
  }
  const s1 = `The ${card.name} is a ${typeWord} card from ${card.issuer}${netPart} that ${feeClause}.`;

  // Sentence 2: welcome bonus + first-year value, only with real numbers.
  let s2 = '';
  const hasBonus = card.welcome_bonus_points || card.welcome_bonus_value > 0;
  if (hasBonus) {
    const bonusPhrase = card.welcome_bonus_points
      ? `a welcome bonus of ${card.welcome_bonus_points.toLocaleString()} points`
      : `a welcome bonus worth about ${formatCurrency(card.welcome_bonus_value, cur)}`;
    if (isUnvalued(card)) {
      // Currency we don't value (VIPorter, Avios): state the points, claim no dollar figure.
      s2 = `It offers ${bonusPhrase}. We don't put a dollar value on these points, because the program publishes no fixed redemption rate.`;
    } else if (card.first_year_value > 0) {
      s2 = `It offers ${bonusPhrase}, which we estimate at roughly ${formatCurrency(card.first_year_value, cur)} of value in your first year after the fee.`;
    } else if (card.annual_fee > 0) {
      s2 = `It offers ${bonusPhrase}, though the annual fee offsets most of that in the first year.`;
    } else {
      s2 = `It offers ${bonusPhrase}.`;
    }
  } else if (card.first_year_value > 0) {
    s2 = `We estimate roughly ${formatCurrency(card.first_year_value, cur)} of value in your first year.`;
  }

  // Sentence 3: who it suits.
  const s3 = `It suits ${audienceFor(card)}.`;

  // Sentence 4: one honest caveat.
  let s4 = '';
  if (card.cons.length > 0) {
    s4 = `One thing to weigh: ${stripTrailingPunct(card.cons[0])}.`;
  } else if (card.annual_fee > 0 && !hasBonus && !isTextOnlyBonus(card)) {
    s4 = `Just note it charges an annual fee without a listed welcome bonus, so the everyday earn rates need to carry their weight.`;
  } else if (card.foreign_transaction_fee === true) {
    const pct = card.foreign_transaction_fee_pct != null ? `${card.foreign_transaction_fee_pct}%` : 'the standard';
    s4 = `Just note it charges ${pct} on foreign currency purchases, so it is not ideal for spending abroad.`;
  } else if (card.benefits_incomplete) {
    s4 = `We are still verifying its full benefit list, so check the issuer's terms before you apply.`;
  }

  return [s1, s2, s3, s4].filter(Boolean).join(' ');
}

interface Faq { q: string; a: string; }

// 4 to 6 Q/As, each dropped entirely when its backing data is missing.
function buildCardFaqs(card: Card): Faq[] {
  const cur = card.country;
  const faqs: Faq[] = [];

  // Annual fee (always answerable).
  faqs.push({
    q: `What is the annual fee for the ${card.name}?`,
    a: card.annual_fee === 0
      ? `The ${card.name} has no annual fee.`
      : (() => {
          let a = `The ${card.name} has an annual fee of ${formatCurrency(card.annual_fee, cur)}.`;
          if (card.first_year_fee === 0) a += ` The fee is waived for the first year.`;
          else if (card.first_year_fee != null && card.first_year_fee !== card.annual_fee) a += ` In the first year the fee is ${formatCurrency(card.first_year_fee, cur)}.`;
          return a;
        })(),
  });

  // Welcome bonus.
  if (card.welcome_bonus || card.welcome_bonus_points || card.welcome_bonus_value > 0) {
    let a: string;
    if (card.welcome_bonus) {
      a = stripTrailingPunct(bonusProse(card.welcome_bonus)) + '.';
    } else if (card.welcome_bonus_points) {
      a = `The ${card.name} offers a welcome bonus of ${card.welcome_bonus_points.toLocaleString()} points.`;
    } else {
      a = `The ${card.name} offers a welcome bonus worth about ${formatCurrency(card.welcome_bonus_value, cur)}.`;
    }
    if (card.welcome_bonus_conditions) a += ` ${stripTrailingPunct(bonusProse(card.welcome_bonus_conditions))}.`;
    faqs.push({ q: `What welcome bonus does the ${card.name} offer?`, a });
  }

  // Foreign transaction fees (only when we actually know).
  if (card.foreign_transaction_fee === false) {
    faqs.push({
      q: `Does the ${card.name} charge foreign transaction fees?`,
      a: `No. The ${card.name} does not charge foreign transaction fees, so purchases in other currencies do not carry the usual surcharge.`,
    });
  } else if (card.foreign_transaction_fee === true) {
    const pct = card.foreign_transaction_fee_pct != null ? `${card.foreign_transaction_fee_pct}%` : 'the standard rate';
    faqs.push({
      q: `Does the ${card.name} charge foreign transaction fees?`,
      a: `Yes. The ${card.name} charges ${pct} on purchases made in a foreign currency, which is worth keeping in mind if you travel or shop abroad.`,
    });
  }

  // First-year value (only when positive, so we never surface a negative headline).
  if (card.first_year_value > 0) {
    let a = `We estimate the ${card.name} is worth roughly ${formatCurrency(card.first_year_value, cur)} in the first year.`;
    if (card.first_year_value_formula) a += ` That is based on ${stripDashes(card.first_year_value_formula)}.`;
    else a += ` That estimate values the welcome bonus at our baseline redemption rate and subtracts the annual fee.`;
    faqs.push({ q: `What is the ${card.name} worth in the first year?`, a });
  } else if (isUnvalued(card) && card.welcome_bonus_points) {
    faqs.push({
      q: `What is the ${card.name} worth in the first year?`,
      a: `We don't put a dollar figure on it. The welcome bonus is ${card.welcome_bonus_points.toLocaleString()} points in a program that publishes no fixed redemption rate, so we leave those points unvalued rather than guess.`,
    });
  }

  // Who it is best for.
  faqs.push({
    q: `Who is the ${card.name} best for?`,
    a: `The ${card.name} is best for ${audienceFor(card)}.`,
  });

  // Main downsides (only when we have cons).
  if (card.cons.length > 0) {
    const list = card.cons.slice(0, 3).map(stripTrailingPunct);
    const a = list.length === 1
      ? `The main downside is that ${list[0].charAt(0).toLowerCase() + list[0].slice(1)}.`
      : `A few things to weigh: ${list.join('; ')}.`;
    faqs.push({ q: `What are the main downsides of the ${card.name}?`, a });
  }

  // Payment network (only when we actually know it). Always-answerable filler that
  // helps thin free cards reach a useful FAQ count without fabricating anything.
  if (card.network && card.network !== 'Unknown') {
    faqs.push({
      q: `What payment network does the ${card.name} use?`,
      a: `The ${card.name} runs on the ${card.network} network, so you can use it anywhere ${card.network} is accepted.`,
    });
  }

  // Where the card is offered. Answerable from country for every card.
  const countryName = card.country === 'CA' ? 'Canada' : card.country === 'US' ? 'the United States' : null;
  if (countryName) {
    faqs.push({
      q: `Is the ${card.name} available in ${card.country === 'CA' ? 'Canada' : 'the US'}?`,
      a: `Yes. The ${card.name} is a ${card.country === 'CA' ? 'Canadian' : 'US'} card offered in ${countryName}, and you generally need to be a resident with a local credit history to apply.`,
    });
  }

  return faqs.slice(0, 6);
}

export default async function CardDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = allCards.find(c => c.slug === slug);
  if (!card) notFound();

  const cur = card.country;
  const benefitEntries = Object.entries(card.benefits) as [keyof Benefits, boolean][];
  const active = benefitEntries.filter(([, v]) => v);
  const cpp = card.cpp_cad ?? 1.0;
  const unvalued = isUnvalued(card);
  const val = valuationFor(card.rewards_program);
  const maxCpp = val.max ?? null;
  const fxLabel = card.foreign_transaction_fee === false
    ? '0%'
    : (card.foreign_transaction_fee_pct != null ? `${card.foreign_transaction_fee_pct}%` : 'Not listed');
  const countryName = cur === 'CA' ? 'Canada' : 'United States';
  const tags = TAG_DEFS.filter(([k]) => card.benefits[k]).map(([, l]) => l);

  const bottomLine = buildBottomLine(card);
  const faqs = buildCardFaqs(card);
  const lines = receiptLines(card);

  // Drop APR/interest-rate rows that leaked into earn_rates (no card earns >10x base).
  const earnRates = [...card.earn_rates]
    .filter(er => { const n = parseFloat(er.rate); return isNaN(n) || n <= 10; })
    .sort((a, b) => (parseFloat(b.rate) || 0) - (parseFloat(a.rate) || 0));

  const insurance = Object.entries(card.insurance).filter(([, v]) => v != null && String(v).trim() !== '');
  const keyPerks = card.key_perks.filter(p => p && p.trim());
  const pros = card.pros.filter(p => p && p.trim());
  const cons = card.cons.filter(p => p && p.trim());

  const similar = allCards
    .filter(c => c.slug !== card.slug && c.card_type === card.card_type && c.country === card.country)
    .sort((a, b) => compareByValue(a, b, (c) => c.first_year_value))
    .slice(0, 4);

  const programLabel = programName(card.rewards_program) || null;

  const toc: [string, string][] = [
    ['verdict', 'The bottom line'],
    ...(card.welcome_bonus ? [['offer', 'Welcome offer'] as [string, string]] : []),
    ...(earnRates.length || card.earn_rates_summary ? [['earn', 'Earn rates'] as [string, string]] : []),
    ['benefits', 'Benefits'],
    ...(insurance.length ? [['insurance', 'Insurance'] as [string, string]] : []),
    ...(pros.length || cons.length ? [['assessment', 'Pros and cons'] as [string, string]] : []),
    ...(faqs.length ? [['faq', 'Questions'] as [string, string]] : []),
  ];

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finterminal.ca/' },
      { '@type': 'ListItem', position: 2, name: 'Cards', item: 'https://www.finterminal.ca/cards' },
      { '@type': 'ListItem', position: 3, name: card.name, item: `https://www.finterminal.ca/cards/${card.slug}` },
    ],
  };

  const applyRow = (
    <div className={s.actions}>
      {card.apply_url && (
        <a href={card.apply_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
          Apply on the issuer site <span aria-hidden="true">↗</span>
        </a>
      )}
      <Link href={`/compare?cards=${card.slug}`} className="btn btn-lg">Compare with other cards</Link>
    </div>
  );

  return (
    <main className={`wrap page tone-cards ${s.page}`}>
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span className="sep" aria-hidden="true">/</span>
        <Link href="/cards">Cards</Link><span className="sep" aria-hidden="true">/</span>
        <span className="cur" aria-current="page">{card.name}</span>
      </nav>

      {/* ── hero ── */}
      <header className={s.hero}>
        <p className="eyebrow">{card.is_business ? 'Business credit card' : 'Credit card'}</p>
        <h1 className={s.h1}>{card.name}</h1>
        <p className={s.byline}>
          {card.issuer}
          {card.network && card.network !== 'Unknown' && <> · {card.network}</>}
          {programLabel && <> · {programLabel}</>}
        </p>
        <div className={`chips ${s.chips}`}>
          <span className="chip">{countryName}</span>
          {card.card_type && <span className={`chip ${s.cap}`}>{card.card_type}</span>}
          {card.is_business && <span className="chip">Business</span>}
          {tags.map(t => <span key={t} className={`chip chip-tone ${s.perkChip}`}>{t}</span>)}
        </div>
      </header>

      <div className={s.layout}>
        {/* ── at a glance (right column on desktop, right after the hero on mobile) ── */}
        <aside className={s.side} aria-label="At a glance">
          <div className={s.glance}>
            <dl className={s.vitals}>
              <div className={s.vital}>
                <dt>Annual fee</dt>
                <dd className={`${s.vv}${card.annual_fee === 0 ? ` ${s.pos}` : ''}`}>
                  {card.annual_fee === 0 ? 'No fee' : formatCurrency(card.annual_fee, cur)}
                </dd>
                {card.first_year_fee != null && card.first_year_fee !== card.annual_fee && (
                  <dd className={s.vs}>{card.first_year_fee === 0 ? 'First year free' : `First year ${formatCurrency(card.first_year_fee, cur)}`}</dd>
                )}
              </div>
              <div className={s.vital}>
                <dt>Welcome bonus</dt>
                <dd className={s.vv}>
                  {card.welcome_bonus_points
                    ? card.welcome_bonus_points.toLocaleString('en-CA')
                    : card.welcome_bonus_value > 0 ? formatCurrency(card.welcome_bonus_value, cur)
                      : isTextOnlyBonus(card) ? 'See offer' : 'None listed'}
                </dd>
                <dd className={s.vs}>{card.welcome_bonus_points ? 'points' : card.welcome_bonus_value > 0 ? 'estimated value' : ' '}</dd>
              </div>
              {card.cpp_cad != null && !!card.welcome_bonus_points && (
                <div className={s.vital}>
                  <dt>Base value per point</dt>
                  <dd className={s.vv}>{cpp.toFixed(2)}¢</dd>
                  {maxCpp && <dd className={s.vs}>up to {maxCpp.toFixed(1)}¢ on sweet spots</dd>}
                </div>
              )}
              <div className={s.vital}>
                <dt>Foreign transaction fee</dt>
                <dd className={`${s.vv}${fxLabel === '0%' ? ` ${s.pos}` : ''}`}>{fxLabel}</dd>
              </div>
            </dl>

            <div className={s.ledger}>
              <div className={s.ledgerCap}>Est. first-year value</div>
              <div className={`${s.ledgerNum}${unvalued ? '' : card.first_year_value < 0 ? ` ${s.neg}` : ` ${s.pos}`}`}>
                {unvalued ? 'Not valued' : formatCurrency(card.first_year_value, cur)}
              </div>
              <div className={`receipt ${s.receipt}`}>
                {unvalued && card.welcome_bonus_points && (
                  <div className="rl">
                    <span className="lab">welcome bonus  {card.welcome_bonus_points.toLocaleString()} pts</span>
                    <span className="dots" />
                    <span className="amt">not valued</span>
                  </div>
                )}
                {lines.map((l, i) => (
                  <div className="rl" key={i}>
                    <span className="lab">{l.label}</span>
                    <span className="dots" />
                    <span className={`amt${l.neg ? ' neg' : ''}`}>{l.neg ? '−' : ''}{formatCurrency(Math.abs(l.amount), cur)}</span>
                  </div>
                ))}
                <div className="rl total">
                  <span className="lab">TOTAL</span>
                  <span className="dots" />
                  <span className={`amt${!unvalued && card.first_year_value < 0 ? ' neg' : ''}`}>{unvalued ? 'Not valued' : formatCurrency(card.first_year_value, cur)}</span>
                </div>
              </div>
              {unvalued && (
                <p className={s.formula}>This program publishes no fixed redemption rate we can cite, so we show the bonus in points and leave it out of the dollar estimate.</p>
              )}
              {card.first_year_value_formula && (
                <p className={s.formula}>Source math: {stripDashes(card.first_year_value_formula)}</p>
              )}
              <p className={s.ledgerNote}>
                Values are in {cur === 'CA' ? 'Canadian' : 'US'} dollars. <Link href="/how-we-value-points">How we value points</Link>
              </p>
            </div>

            {applyRow}
          </div>
        </aside>

        {/* ── the record ── */}
        <div className={s.main}>
          <nav className={s.toc} aria-label="On this page">
            {toc.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>

          <section id="verdict" className={s.sec}>
            <h2 className={s.h2}>The bottom line</h2>
            <div className={`cd-note short ${s.verdict}`}><p>{bottomLine}</p></div>
            {card.notes_for_canadians && (
              <div className={s.canNote}>
                <div className={s.canCap}>Note for Canadians</div>
                <p>{card.notes_for_canadians}</p>
              </div>
            )}
          </section>

          {card.welcome_bonus && (
            <section id="offer" className={s.sec}>
              <h2 className={s.h2}>Welcome offer</h2>
              <div className={s.offer}>
                <p className={s.offerText}>{formatBonusText(card.welcome_bonus)}</p>
                {card.welcome_bonus_conditions && (
                  <p className={s.offerFine}><span className={s.fineCap}>Conditions</span>{formatBonusText(card.welcome_bonus_conditions)}</p>
                )}
              </div>
            </section>
          )}

          {(earnRates.length > 0 || card.earn_rates_summary) && (
            <section id="earn" className={s.sec}>
              <h2 className={s.h2}>Earn rates</h2>
              {earnRates.length > 0 ? (
                <div className="tablewrap">
                  <table className={s.earnTable}>
                    <thead>
                      <tr><th scope="col">Rate</th><th scope="col">On</th></tr>
                    </thead>
                    <tbody>
                      {earnRates.map((er, i) => (
                        <tr key={i}>
                          <td className={s.rate}>{er.rate.match(/^[\d.]+x?/)?.[0] || er.rate}</td>
                          <td>{er.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className={s.p}>{card.earn_rates_summary}</p>
              )}
            </section>
          )}

          <section id="benefits" className={s.sec}>
            <h2 className={s.h2}>Benefits</h2>
            {card.benefits_incomplete ? (
              <p className={s.muted}>We are still verifying this card&apos;s benefit list. Check the issuer&apos;s terms before you apply.</p>
            ) : (
              <>
                <p className={s.secSub}>{active.length} of {benefitEntries.length} benefits we track</p>
                <ul className={s.benlist}>
                  {benefitEntries.map(([key, on]) => (
                    <li key={key} className={on ? s.benOn : s.benOff}>
                      <span className={s.mk} aria-hidden="true">{on ? '✓' : '–'}</span>
                      {TAG_DEFS.find(([k]) => k === key)?.[1] ?? BENEFIT_LABELS[key]}
                      <span className="sr-only">{on ? ': included' : ': not included'}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {keyPerks.length > 0 && (
              <>
                <h3 className={s.h3}>Key perks</h3>
                <ul className={s.perkList}>
                  {keyPerks.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </>
            )}
          </section>

          {insurance.length > 0 && (
            <section id="insurance" className={s.sec}>
              <h2 className={s.h2}>Insurance</h2>
              <div className="tablewrap">
                <table className={s.insTable}>
                  <thead>
                    <tr><th scope="col">Coverage</th><th scope="col" className="r">On this card</th></tr>
                  </thead>
                  <tbody>
                    {insurance.map(([k, v]) => {
                      const info = INSURANCE_INFO[k];
                      return (
                        <tr key={k}>
                          <td>
                            <div className={s.insName}>{info ? info[0] : prettyKey(k)}</div>
                            {info && <div className={s.insWhat}>{info[1]}</div>}
                          </td>
                          <td className={`r ${s.insVal}`}>{insuranceValue(String(v))}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className={s.fine}>
                This shows which coverages the issuer lists for this card, not how much each one pays. Amounts, limits,
                waiting periods and eligibility are in the issuer&apos;s certificate of insurance, so read that before you
                count on a coverage.
              </p>
            </section>
          )}

          {(pros.length > 0 || cons.length > 0) && (
            <section id="assessment" className={s.sec}>
              <h2 className={s.h2}>Pros and cons</h2>
              <div className={s.proscons}>
                {pros.length > 0 && (
                  <div className={s.pcCol}>
                    <h3 className={s.pcHead}>What we like</h3>
                    <ul>{pros.map((p, i) => <li key={i} className={s.pro}><span aria-hidden="true">+</span>{p}</li>)}</ul>
                  </div>
                )}
                {cons.length > 0 && (
                  <div className={s.pcCol}>
                    <h3 className={s.pcHead}>Watch out for</h3>
                    <ul>{cons.map((p, i) => <li key={i} className={s.con}><span aria-hidden="true">−</span>{p}</li>)}</ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {similar.length > 0 && (
            <section className={s.sec}>
              <h2 className={s.h2}>Similar cards</h2>
              <p className={s.secSub}>Other {cur === 'CA' ? 'Canadian' : 'US'} {cardTypeWord(card)} cards, by estimated first-year value</p>
              <ul className="rows">
                {similar.map(c => (
                  <li key={c.slug} className="row is-link">
                    <div className="r-main">
                      <div className="r-title"><Link href={`/cards/${c.slug}`}>{c.name}</Link></div>
                      <div className="r-sub">{c.issuer} · {c.annual_fee === 0 ? 'no annual fee' : `${formatCurrency(c.annual_fee, c.country)} a year`}</div>
                    </div>
                    {isUnvalued(c)
                      ? <span className="r-end">Not valued</span>
                      : <span className={`r-end ${c.first_year_value < 0 ? s.neg : s.pos}`}>{formatCurrency(c.first_year_value, c.country)}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {faqs.length > 0 && (
            <section id="faq" className={s.sec}>
              <h2 className={s.h2}>Questions people ask</h2>
              <div className={s.faq}>
                {faqs.map((f, i) => (
                  <div key={i} className={s.faqItem}>
                    <h3 className={s.faqQ}>{f.q}</h3>
                    <p className={s.p}>{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className={s.endActions}>{applyRow}</div>

          <p className={s.updated}>
            Card details last updated {card.last_updated || 'n/a'} · est. value = welcome bonus × base ¢/pt − annual fee
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // A credit card is a financial product, not a retail Product. Using
          // schema.org/CreditCard (no offers/price) avoids Google's Merchant-listing
          // and Product-snippet requirements (image, availability, reviews, etc.),
          // which do not apply to cards and which we will not fabricate.
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreditCard',
            name: card.name,
            description: `${card.name} by ${card.issuer}. ${card.card_type} credit card.`,
            provider: { '@type': 'Organization', name: card.issuer },
          }),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* FAQPage schema, built from the SAME faqs array as the visible FAQ so
          they can never drift. Rendered only when at least one FAQ exists. */}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
      )}
    </main>
  );
}
