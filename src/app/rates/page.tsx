import Link from "next/link";
import { ogMeta } from "@/lib/og";
import { VerifiedStamp } from "@/components/VerifiedStamp";
import { RATE_PAGES, RATE_CADENCE_DAYS } from "@/components/money/ratePages";
import s from "./rates.module.css";

const BASE = "https://www.finterminal.ca";

export const metadata = {
  title: "Best rates in Canada: savings, GICs, and chequing | FinTerminal",
  description:
    "A simple hub for the best rates in Canada. Where to find high-interest savings rates, GIC rates by term, and chequing account bonuses, plus a quick framework for how to think about parking your cash. General info as of July 2026, not advice.",
  alternates: { canonical: "/rates" },
  ...ogMeta("Best rates in Canada: savings, GICs, and chequing", "Rates", "/rates"),
};

// What each rate page is for. Copy kept from the original hub list.
const COVERS: Record<string, { best: string; body: string; cta: string }> = {
  "/personal-finance/best-savings-account-rates-canada": {
    best: "Emergency fund, short-term cash",
    body: "Variable rates you can withdraw from any time, ideal for an emergency fund or any short-term cash. Fully liquid and, at a CDIC member, insured.",
    cta: "See the savings rates",
  },
  "/personal-finance/best-gic-rates-canada": {
    best: "Known-date goals, like a down payment",
    body: "A fixed, guaranteed rate in exchange for locking the money up for a set term. Best for a known-date goal like a down payment, and laddering lets you keep some maturing along the way.",
    cta: "See the GIC rates",
  },
  "/personal-finance/best-chequing-account-bonuses-canada": {
    best: "A one-time cash boost",
    body: "Cash welcome offers for opening and setting up a new chequing account, which is a different kind of return than a rate but often worth more up front.",
    cta: "See the current bonuses",
  },
};

const PILLARS = [
  {
    k: "Liquidity",
    v: "Can you get at the money when you need it? An emergency fund has to stay liquid, so a savings account beats a locked GIC no matter what the rate says.",
  },
  {
    k: "Yield",
    v: "The rate itself, and it usually rises the longer you can commit, which is why a known-date goal can accept a locked term for a better number.",
  },
  {
    k: "Insurance",
    v: "Deposits at a CDIC member are covered up to $100,000 per category per member (credit unions use provincial coverage instead), while a cash ETF held in a brokerage is generally not a CDIC-insured deposit.",
  },
];

export default function RatesHubPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Rates", item: `${BASE}/rates` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Rate pages",
      itemListElement: RATE_PAGES.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.title,
        url: `${BASE}${r.href}`,
      })),
    },
  ];

  return (
    <main className="wrap page tone-money">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span className="sep">/</span>
        <span className="cur" aria-current="page">Rates</span>
      </nav>

      <header className="page-head">
        <span className="eyebrow">Rates</span>
        <h1>Best rates in Canada: savings, GICs and chequing</h1>
        <p className="dek">
          Your jumping-off point. Instead of scattering numbers across a dozen pages, we keep the figures on a few
          focused pages and use this hub to send you to the right one for the job in front of you.
        </p>
        <div className="meta">
          <span>General info as of July 2026; rules and limits change, not advice</span>
        </div>
      </header>

      <section className="section" aria-labelledby="rate-pages">
        <div className="section-head">
          <h2 id="rate-pages">The rate pages</h2>
          <p>Each keeps its own figures and its own check date. Treat them as the source of truth.</p>
        </div>
        <div className={s.rateGrid}>
          {RATE_PAGES.map((r) => {
            const c = COVERS[r.href];
            return (
              <article key={r.href} className={`link-card has-stripe ${s.rateCard}`}>
                <span className="lc-kicker">{r.kicker}</span>
                <h3 className="lc-title"><Link href={r.href}>{r.title}</Link></h3>
                {c ? <p className={s.bestFor}><span>Best for</span> {c.best}</p> : null}
                {c ? <p className="lc-dek">{c.body}</p> : null}
                <div className={`lc-meta ${s.rateMeta}`}>
                  <span>{r.asOf}</span>
                  <VerifiedStamp date={r.verified} cadenceDays={RATE_CADENCE_DAYS} />
                </div>
                {c ? <span className={s.cta} aria-hidden="true">{c.cta} &rarr;</span> : null}
              </article>
            );
          })}
        </div>
        <Link href="/personal-finance/where-to-hold-cash-canada" className={s.framework}>
          <span className={s.fwK}>The framework</span>
          <span className={s.fwT}>Where to hold your cash</span>
          <span className={s.fwD}>
            The full decision guide that ties it all together, matching each pot of money to the right home based on
            your goal and time horizon.
          </span>
          <span className={s.fwA} aria-hidden="true">Read the framework &rarr;</span>
        </Link>
      </section>

      <section className="section" aria-labelledby="parking">
        <div className="section-head">
          <h2 id="parking">How to think about parking cash</h2>
          <p>Three things decide where your cash should sit, and yield is only one of them.</p>
        </div>
        <div className={s.pillars}>
          {PILLARS.map((p) => (
            <div key={p.k} className={s.pillar}>
              <div className={s.pk}>{p.k}</div>
              <p>{p.v}</p>
            </div>
          ))}
        </div>
        <p className={s.after}>Match the vehicle to the job first, then chase the rate. The pages above have the numbers, each with the date we checked them.</p>
      </section>

      <section className="section" aria-labelledby="boc">
        <div className="section-head">
          <h2 id="boc">Rates move with the Bank of Canada</h2>
        </div>
        <div>
          <p className={s.prose}>
            One thing worth keeping in the back of your mind: savings and GIC rates are not fixed features of a bank, they
            move with the Bank of Canada&apos;s overnight rate. When the central bank raises or cuts, savings rates and new GIC
            offers tend to follow, sometimes quickly and sometimes with a lag. That is why we do not pin specific
            per-provider numbers on this hub. As of July 2026 the overnight rate sits at 2.25 percent and everyday
            high-interest savings rates were broadly in the mid-2 percent range, but that is a snapshot, not a promise.
            Always confirm the live figure on the linked page before you move money, and confirm current limits or product
            rules with the provider or the CRA where they matter to you.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="honest">
        <div className={`notice ${s.note}`}>
          <div>
            <h2 id="honest" className={s.noteH}>A quick honest note</h2>
            <p>
              A slightly higher savings rate is nice, but it rarely moves the needle as much as getting the basics right:
              keeping your emergency fund liquid, not locking money you might need, and using registered room so the
              interest is not taxed away. This is general information, not personal financial or tax advice, and everyone&apos;s
              situation differs, so check with a professional for your own case.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="keep-going">
        <div className="section-head">
          <h2 id="keep-going">Keep going</h2>
          <Link href="/personal-finance" className="more">More personal finance &rarr;</Link>
        </div>
        <p className={s.after}>
          Pick the page that matches what you are doing right now. Liquid cash goes to savings, known-date money goes to a
          GIC, a new account might come with a bonus, and the framework page helps you decide when you are not sure.
        </p>
      </section>
    </main>
  );
}
