import type { Metadata } from 'next';
import Link from 'next/link';
import { POINT_VALUATIONS, VALUATION_SOURCE } from '@/data/point-valuations';
import { ogMeta } from "@/lib/og";

export const metadata: Metadata = {
  title: 'How we value points | FinTerminal',
  description: 'How FinTerminal estimates the first-year value of a credit card welcome bonus.',
  ...ogMeta("How we value points", "Methodology"),
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
    p: `Welcome offers and point values change often. We refresh card offers regularly and review our valuations on an ongoing basis. Figures are estimates to help you compare cards, not guarantees, and not financial advice.`,
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

export default function HowWeValuePoints() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <p className="text-xs uppercase tracking-[0.2em] text-gold-text dark:text-gold font-semibold mb-3">Methodology</p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold mb-4">How we value points</h1>
      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        So you can trust the numbers, here&apos;s exactly how we estimate what a card is worth.
      </p>
      <div className="rounded-lg border border-border bg-muted/40 p-5 mb-12">
        <p className="text-xs uppercase tracking-[0.15em] text-gold-text dark:text-gold font-semibold mb-2">Bottom line</p>
        <p className="text-muted-foreground leading-relaxed">
          FinTerminal&apos;s first-year value is the welcome bonus, valued at conservative baseline point rates, minus the annual fee. We use everyday redemption rates (not best-case ones), value cash back at face value, and keep Canadian and US cards in their own currency. The figures are honest estimates to help you compare cards, not guarantees.
        </p>
      </div>
      <div className="space-y-10">
        {sections.map(s => (
          <section key={s.h}>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">{s.h}</h2>
            <p className="text-muted-foreground leading-relaxed">{s.p}</p>
          </section>
        ))}
      </div>

      <div className="atlas-rule my-12" />
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-4">Our point valuations by program</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Here are the baseline rates we use for the headline first-year value, plus the upper-end &quot;up to&quot; rate you can reach on premium transfer-partner sweet spots. These are estimates to help you compare cards, not guarantees. Cash back is always valued at 1 cent per point.
      </p>
      <div className="overflow-x-auto rounded-lg border border-border mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left">
              <th className="px-4 py-2 font-semibold">Program</th>
              <th className="px-4 py-2 font-semibold text-right">Baseline (¢/pt)</th>
              <th className="px-4 py-2 font-semibold text-right">Up to (¢/pt)</th>
            </tr>
          </thead>
          <tbody>
            {valuationRows.map(row => (
              <tr key={row.program} className="border-b border-border last:border-0">
                <td className="px-4 py-2">{row.program}</td>
                <td className="px-4 py-2 text-right tabular-nums">{row.baseline.toFixed(2)}</td>
                <td className="px-4 py-2 text-right tabular-nums text-muted-foreground">{row.max != null ? row.max.toFixed(1) : 'fixed value'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mb-2">
        Source: {VALUATION_SOURCE.name}, as of {VALUATION_SOURCE.asOf}. Reviewed quarterly. &quot;Fixed value&quot; means the currency is not transferable to airline or hotel partners.
      </p>

      <div className="atlas-rule my-12" />
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-6">Frequently asked questions</h2>
      <div className="space-y-8">
        {faqs.map(f => (
          <section key={f.q}>
            <h3 className="font-semibold mb-2">{f.q}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.a}</p>
          </section>
        ))}
      </div>
      <div className="atlas-rule my-12" />
      <p className="text-sm text-muted-foreground">
        Questions about a specific card&apos;s valuation? <Link href="/cards" className="text-gold-text dark:text-gold font-medium hover:underline">Browse the card explorer →</Link>
      </p>
    </div>
  );
}
