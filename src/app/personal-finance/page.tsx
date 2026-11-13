import Link from "next/link";
import { livePFArticles, type PFArticle } from "@/data/personal-finance";
import { ogMeta } from "@/lib/og";
import { VerifiedStamp } from "@/components/VerifiedStamp";
import { RATE_PAGES, RATE_CADENCE_DAYS } from "@/components/money/ratePages";
import s from "./hub.module.css";

import { GardenArt } from "@/components/illustrations/HomeArt";
const BASE = "https://www.finterminal.ca";

export const metadata = {
  title: "Personal Finance | FinTerminal",
  description: "Practical, plain-language personal finance guides for Canadians, from tax-efficient borrowing to building real wealth.",
  alternates: { canonical: "/personal-finance" },
  ...ogMeta("Personal Finance", "Personal finance", "/personal-finance"),
};

// Life-moment grouping (spec 3.7): the index is organized by the moment a reader
// is actually in, not by a flat archive list. The mapping is data-driven by slug;
// an article lands in the first moment that claims it, and anything unclaimed
// falls into the catch-all.
type Moment = {
  /** Stable anchor id for the jump links. */
  id: string;
  /** Group heading. */
  label: string;
  /** One human line under the heading. */
  note: string;
  /** Slugs, in the order they should appear within the group. */
  slugs: string[];
};

const MOMENTS: Moment[] = [
  {
    id: "new-baby",
    label: "New baby",
    note: "The accounts that grow up with your kid.",
    slugs: ["resp-cesg-grant-canada"],
  },
  {
    id: "buying-a-home",
    label: "Buying a home",
    note: "Saving the down payment and the tax tricks around it.",
    slugs: ["fhsa-vs-rrsp-home-buyers-plan", "fhsa-playbook-canada", "smith-manoeuvre"],
  },
  {
    id: "fees",
    label: "Drowning in fees",
    note: "The charges quietly eating your money, and how to kill them.",
    slugs: [
      "credit-card-interest-canada",
      "foreign-transaction-fee-cards-canada",
      "pay-bills-with-credit-card-canada",
      "costco-membership-worth-it-canada",
    ],
  },
  {
    id: "family-trips",
    label: "Points for family trips",
    note: "Turning everyday spending into flights for the whole crew.",
    slugs: [
      "two-player-mode-couples-welcome-bonuses",
      "how-to-hit-minimum-spend-canada",
      "points-vs-cash-back-canada",
      "are-credit-card-points-taxable-canada",
    ],
  },
  {
    id: "the-rest",
    label: "The rest of the money",
    note: "The everyday stuff that keeps the whole thing running.",
    slugs: [], // catch-all: filled with whatever no moment above claimed
  },
];

// Display-only labels for the data's `tag` field. The nav already calls this
// section "Money", so a chip that also says "Money" reads as a label for the
// whole section. The data stays untouched; only the chip text changes.
const TAG_LABEL: Record<string, string> = { Money: "Basics" };
const TAG_CHIP: Record<string, string> = { Cards: "chip-cards", Points: "chip-travel" };

const REFERENCE = [
  { href: "/personal-finance/where-to-hold-cash-canada", title: "Where to hold your cash in Canada", sub: "The framework behind the rate pages" },
  { href: "/personal-finance/best-cash-back-credit-cards-canada", title: "The best cash-back credit cards in Canada", sub: "Simple rewards, no points math" },
  { href: "/personal-finance/best-travel-credit-cards-canada", title: "The best travel and rewards credit cards in Canada", sub: "For families who want to fly on points" },
];

function GuideCard({ a }: { a: PFArticle }) {
  const label = TAG_LABEL[a.tag] ?? a.tag;
  const chip = TAG_CHIP[a.tag] ?? "";
  return (
    <article className={`link-card ${s.card}`}>
      <h3 className="lc-title"><Link href={`/personal-finance/${a.slug}`}>{a.title}</Link></h3>
      <p className={`lc-dek ${s.dek}`}>{a.dek}</p>
      <div className="lc-meta">
        <span className={`chip ${chip}`}>{label}</span>
        <span>{a.read}</span>
        <span className={s.sep} aria-hidden="true">&middot;</span>
        <span>{a.date}</span>
      </div>
    </article>
  );
}

export default function PersonalFinancePage() {
  const articles = livePFArticles();
  const bySlug = new Map(articles.map((a) => [a.slug, a]));

  // Assign each live article to its moment; unclaimed articles feed the catch-all.
  const claimed = new Set<string>();
  const groups = MOMENTS.filter((m) => m.slugs.length > 0)
    .map((m) => {
      const items = m.slugs
        .map((sl) => bySlug.get(sl))
        .filter((a): a is NonNullable<typeof a> => a !== undefined);
      items.forEach((a) => claimed.add(a.slug));
      return { ...m, items };
    })
    // Skip any moment whose articles are not live yet; it reappears automatically
    // when a scheduled article goes live.
    .filter((g) => g.items.length > 0);
  const rest = articles.filter((a) => !claimed.has(a.slug));
  const catchAll = MOMENTS.find((m) => m.slugs.length === 0);
  if (catchAll && rest.length > 0) {
    groups.push({ ...catchAll, items: rest });
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Personal finance", item: `${BASE}/personal-finance` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Personal finance guides",
      itemListElement: groups
        .flatMap((g) => g.items)
        .map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: `${BASE}/personal-finance/${a.slug}` })),
    },
  ];

  return (
    <main className="wrap page tone-money">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="page-head has-art">

        <div>
          <span className="eyebrow">Money</span>
          <h1>Personal finance, sorted by the moment you&apos;re in</h1>
          <p className="dek">
            Plain-language guides for Canadians, grouped by the moment you are actually in. Pick the one that sounds like
            your life right now.
          </p>
          <div className="meta">
            <span>{articles.length} guides</span>
            <span className="sep">/</span>
            <span>{groups.length} life moments</span>
            <span className="sep">/</span>
            <span>general info, not advice</span>
          </div>

        </div>

        <GardenArt className="head-art" />
      </header>

      <section className={s.rates} aria-labelledby="rates-strip">
        <div className={s.ratesHead}>
          <h2 id="rates-strip" className={s.ratesTitle}>Rates and bonuses</h2>
          <Link href="/rates" className={s.ratesAll}>All rates &rarr;</Link>
        </div>
        <ul className={s.ratesList}>
          {RATE_PAGES.map((r) => (
            <li key={r.href} className={s.rateItem}>
              <span className={s.rateK}>{r.kicker}</span>
              <Link href={r.href} className={s.rateT}>{r.title}</Link>
              <span className={s.rateD}>{r.short}</span>
              <span className={s.rateM}>
                <span>{r.asOf}</span>
                <VerifiedStamp date={r.verified} cadenceDays={RATE_CADENCE_DAYS} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <nav className={s.jump} aria-label="Jump to a life moment">
        <span className={s.jumpL}>Jump to</span>
        {groups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className={s.jumpA}>
            {g.label} <span className={s.jumpN}>{g.items.length}</span>
          </a>
        ))}
      </nav>

      {groups.map((g) => (
        <section key={g.id} id={g.id} className={`section ${s.moment}`} aria-labelledby={`${g.id}-h`}>
          <div className="section-head">
            <h2 id={`${g.id}-h`}><span className="dot" aria-hidden="true" /> {g.label}</h2>
            <p>{g.note}</p>
          </div>
          <div className="grid-3">
            {g.items.map((a) => <GuideCard key={a.slug} a={a} />)}
          </div>
        </section>
      ))}

      <section className="section" aria-labelledby="reference">
        <div className="section-head">
          <h2 id="reference">Reference</h2>
          <p>New guides land regularly, on cards, points, and building real wealth in Canada.</p>
        </div>
        <ul className="rows">
          {[{ href: "/rates", title: "Best rates in Canada: savings, GICs, chequing", sub: "The rates hub" }, ...REFERENCE].map((r) => (
            <li key={r.href} className={`row is-link ${s.refRow}`}>
              <div className="r-main">
                <div className="r-title"><Link href={r.href}>{r.title}</Link></div>
                <div className="r-sub">{r.sub}</div>
              </div>
              <span className="r-end" aria-hidden="true">&rarr;</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
