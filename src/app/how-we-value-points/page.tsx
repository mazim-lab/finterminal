import type { Metadata } from 'next';
import Link from 'next/link';
import { POINT_VALUATIONS, VALUATION_SOURCE } from '@/data/point-valuations';
import { ogMeta } from "@/lib/og";
import s from './methodology.module.css';

export const metadata: Metadata = {
  title: 'How we value points | FinTerminal',
  description: 'How FinTerminal estimates the first-year value of a credit card welcome bonus, with the baseline cents-per-point rate we use for every rewards program.',
  alternates: { canonical: '/how-we-value-points' },
  ...ogMeta("How we value points", "Methodology", "/how-we-value-points"),
};

// Program display names for the valuations table. We drive the table straight
// from POINT_VALUATIONS so the numbers here can never drift from the ones the
// card explorer uses. "cash back" is 1 cent by definition, so it is not a
// per-program row worth listing.
const PROGRAM_LABELS: Record<string, string> = {
  'membership rewards': 'Amex Membership Rewards',
  'aeroplan': 'Aeroplan',
  'rbc avion': 'RBC Avion',
  'rbc rewards': 'RBC Rewards',
  'cibc aventura': 'CIBC Aventura',
  'marriott bonvoy': 'Marriott Bonvoy',
  'scene+': 'Scene+',
  'td rewards': 'TD Rewards',
  'bmo rewards': 'BMO Rewards',
  'national bank': 'National Bank À la carte',
  'mbna rewards': 'MBNA Rewards',
  'desjardins bonusdollars': 'Desjardins BonusDollars',
  'pc optimum': 'PC Optimum',
  'triangle rewards': 'Triangle Rewards',
  'westjet rewards': 'WestJet Rewards',
};

const valuationRows = Object.entries(POINT_VALUATIONS)
  .filter(([key]) => key !== 'cash back')
  .map(([key, v]) => ({
    program: PROGRAM_LABELS[key] || key,
    baseline: v.baseline,
    max: v.max,
  }));

const sections = [
  {
    h: 'First-year value, in plain terms',
    p: `For each card we estimate a first-year value: the welcome bonus valued at our baseline point valuations, minus the annual fee. If a card waives or rebates the fee in the first year, we deduct $0. If it charges a different first-year fee, we use that.`,
  },
  {
    h: 'We use conservative "baseline" valuations',
    p: `A point isn't worth a fixed amount. It depends how you redeem it. We value each rewards currency at a realistic, everyday "baseline" rate rather than a best-case one, so the numbers don't over-promise. Cash back is valued at face value (a dollar is a dollar).`,
  },
  {
    h: 'Transferable points can be worth more',
    p: `Some currencies (like Membership Rewards, Aeroplan, and Avion) can be transferred to airline and hotel partners, where savvy redemptions such as business-class flights are worth well above our baseline. Where it's relevant we note that upside, but the headline first-year value always uses the conservative baseline.`,
  },
  {
    h: 'Canadian and US cards stay in their own currency',
    p: `We don't convert between currencies. Canadian cards are valued in CAD and US cards in USD, each clearly labelled, so you're never comparing against a guessed exchange rate. Tip: filter the card explorer by country to compare like-for-like.`,
  },
  {
    h: 'We keep valuations current',
    p: `Welcome offers and point values change often. We refresh card offers regularly and review our valuations on an ongoing basis, including a read of the big published valuation studies to see which programs actually moved. Those studies are mostly American and quoted in US dollars, so we use them to spot the change rather than copy the number. In our August 2026 review the big one was Marriott Bonvoy, where award prices went up at the great majority of hotels, so we lowered our Bonvoy rate. On the US side of the card explorer we also nudged American AAdvantage and Alaska Atmos up, since award prices in those programs have not kept pace with cash fares. Figures are estimates to help you compare cards, not guarantees, and not financial advice.`,
  },
];

const faqs = [
  {
    q: 'How does FinTerminal calculate a card’s first-year value?',
    a: 'We take the welcome bonus, value it at our baseline point valuations, and subtract the annual fee. If the fee is waived or rebated in year one we deduct $0; if a different first-year fee applies, we use that instead.',
  },
  {
    q: 'What is a "baseline" point valuation?',
    a: 'It is a realistic everyday redemption rate for each rewards currency rather than a best-case one. Using the baseline keeps the headline numbers honest and avoids over-promising. Cash back is always valued at face value.',
  },
  {
    q: 'Can points be worth more than your baseline?',
    a: 'Yes. Transferable currencies like Membership Rewards, Aeroplan, and Avion can beat the baseline when you move them to airline or hotel partners for redemptions such as business-class flights. We flag that upside where it matters, but the first-year value still uses the conservative baseline.',
  },
  {
    q: 'Do you convert US card values into Canadian dollars?',
    a: 'No. Canadian cards are valued in CAD and US cards in USD, each clearly labelled, so nothing rides on a guessed exchange rate. You can filter the card explorer by country to compare like-for-like.',
  },
  {
    q: 'Are these valuations guaranteed?',
    a: 'No. Welcome offers and point values change often, so our figures are estimates to help you compare cards. They are not guarantees and not financial advice.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

const sid = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finterminal.ca/' },
    { '@type': 'ListItem', position: 2, name: 'Cards', item: 'https://www.finterminal.ca/cards' },
    { '@type': 'ListItem', position: 3, name: 'How we value points', item: 'https://www.finterminal.ca/how-we-value-points' },
  ],
};

export default function HowWeValuePoints() {
  return (
    <div className="app norail tone-cards">
      <main>
        <article className="doc">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span className="sep" aria-hidden="true">/</span>
            <Link href="/cards">Cards</Link><span className="sep" aria-hidden="true">/</span>
            <span className="cur" aria-current="page">How we value points</span>
          </nav>

          <header className="head">
            <p className="eyebrow">Methodology</p>
            <h1 className={s.h1}>How we value points</h1>
          </header>
          <p className="lede">
            So you can trust the numbers, here&apos;s exactly how we estimate what a card is worth.
          </p>
          <div className="docmeta">
            <span>Valuations as of {VALUATION_SOURCE.asOf}</span>
            <span className="sep">/</span>
            <span>Reviewed quarterly</span>
          </div>

          <div className="cd-note short">
            <div className="cap">Bottom line</div>
            <p>
              FinTerminal&apos;s first-year value is the welcome bonus, valued at conservative baseline point rates, minus the annual fee. We use everyday redemption rates (not best-case ones), value cash back at face value, and keep Canadian and US cards in their own currency. The figures are honest estimates to help you compare cards, not guarantees.
            </p>
          </div>

          <div className={s.formula}>
            <span className={s.fLab}>First-year value</span>
            <span className={s.fEq}>=</span>
            <span className={s.fTerm}>welcome bonus × baseline ¢/pt</span>
            <span className={s.fEq}>−</span>
            <span className={s.fTerm}>annual fee (or first-year fee)</span>
          </div>

          <nav className="toc" aria-label="On this page">
            <div className="tt">On this page</div>
            <div className="toc-grid">
              {sections.map(sec => <a key={sec.h} href={`#${sid(sec.h)}`}>{sec.h}</a>)}
              <a href="#valuations">Our point valuations by program</a>
              <a href="#faq">Frequently asked questions</a>
            </div>
          </nav>

          {sections.map(sec => (
            <section key={sec.h} id={sid(sec.h)} className={s.sec}>
              <h2 className="cd-sec">{sec.h}</h2>
              <p>{sec.p}</p>
            </section>
          ))}

          <section id="valuations" className={s.sec}>
            <h2 className="cd-sec">Our point valuations by program</h2>
            <p>
              Here are the baseline rates we use for the headline first-year value, plus the upper-end &quot;up to&quot; rate you can reach on premium transfer-partner sweet spots. These are estimates to help you compare cards, not guarantees. Cash back is always valued at 1 cent per point.
            </p>
            <div className={`tablewrap ${s.tw}`}>
              <table className={s.table}>
                <caption className="sr-only">Baseline and upper-end cents-per-point valuations by rewards program</caption>
                <thead>
                  <tr>
                    <th scope="col">Program</th>
                    <th scope="col" className="r">Baseline ¢/pt</th>
                    <th scope="col" className="r">Up to ¢/pt</th>
                  </tr>
                </thead>
                <tbody>
                  {valuationRows.map(row => (
                    <tr key={row.program}>
                      <th scope="row" className={s.prog}>{row.program}</th>
                      <td className={`r ${s.num} ${s.base}`}>{row.baseline.toFixed(2)}</td>
                      <td className={`r ${s.num}`}>{row.max != null ? row.max.toFixed(1) : <span className={s.fixed}>fixed value</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={s.source}>
              Source: {VALUATION_SOURCE.name}, as of {VALUATION_SOURCE.asOf}. Reviewed quarterly. &quot;Fixed value&quot; means the currency is not transferable to airline or hotel partners.
            </p>
          </section>

          <section id="faq" className={s.sec}>
            <h2 className="cd-sec">Frequently asked questions</h2>
            {faqs.map(f => (
              <div key={f.q}>
                <h3 className="faq-q">{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </section>

          <div className={s.next}>
            <p>Questions about a specific card&apos;s valuation?</p>
            <div className="cta-row">
              <Link href="/cards" className="cd-apply primary">Browse the Card Explorer <span aria-hidden="true">→</span></Link>
              <Link href="/compare" className="cd-apply">Compare cards side by side</Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
