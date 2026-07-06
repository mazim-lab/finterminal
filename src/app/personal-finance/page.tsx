import Link from "next/link";
import { livePFArticles } from "@/data/personal-finance";
import { ogMeta } from "@/lib/og";

export const metadata = {
  title: "Personal Finance | FinTerminal",
  description: "Practical, plain-language personal finance guides for Canadians, from tax-efficient borrowing to building real wealth.",
  ...ogMeta("Personal Finance", "Personal finance"),
};

// Re-check hourly so scheduled articles appear on their publishAt date, no redeploy needed.
export const revalidate = 3600;

// Life-moment grouping (spec 3.7): the index is organized by the moment a reader
// is actually in, not by a flat archive list. Each moment carries a mono micro
// label. The mapping is data-driven by slug; an article lands in the first moment
// that claims it, and anything unclaimed falls into the catch-all.
type Moment = {
  /** Mono micro-cap group label. */
  label: string;
  /** One human line under the label. */
  note: string;
  /** Slugs, in the order they should appear within the group. */
  slugs: string[];
};

const MOMENTS: Moment[] = [
  {
    label: "New baby",
    note: "the accounts that grow up with your kid",
    slugs: ["resp-cesg-grant-canada"],
  },
  {
    label: "Buying a home",
    note: "saving the down payment and the tax tricks around it",
    slugs: ["fhsa-vs-rrsp-home-buyers-plan", "fhsa-playbook-canada", "smith-manoeuvre"],
  },
  {
    label: "Drowning in fees",
    note: "the charges quietly eating your money, and how to kill them",
    slugs: [
      "credit-card-interest-canada",
      "foreign-transaction-fee-cards-canada",
      "pay-bills-with-credit-card-canada",
      "costco-membership-worth-it-canada",
    ],
  },
  {
    label: "Points for family trips",
    note: "turning everyday spending into flights for the whole crew",
    slugs: [
      "two-player-mode-couples-welcome-bonuses",
      "how-to-hit-minimum-spend-canada",
      "points-vs-cash-back-canada",
      "are-credit-card-points-taxable-canada",
    ],
  },
  {
    label: "The rest of the money",
    note: "the everyday stuff that keeps the whole thing running",
    slugs: [], // catch-all: filled with whatever no moment above claimed
  },
];

export default function PersonalFinancePage() {
  const articles = livePFArticles();
  const bySlug = new Map(articles.map((a) => [a.slug, a]));

  // Assign each live article to its moment; unclaimed articles feed the catch-all.
  const claimed = new Set<string>();
  const groups = MOMENTS.filter((m) => m.slugs.length > 0)
    .map((m) => {
      const items = m.slugs
        .map((s) => bySlug.get(s))
        .filter((a): a is NonNullable<typeof a> => a !== undefined);
      items.forEach((a) => claimed.add(a.slug));
      return { ...m, items };
    })
    // Skip any moment whose articles are not live yet; it reappears automatically
    // when a scheduled article goes live (e.g. "New baby" before resp-cesg goes live).
    .filter((g) => g.items.length > 0);
  const rest = articles.filter((a) => !claimed.has(a.slug));
  const catchAll = MOMENTS.find((m) => m.slugs.length === 0);
  if (catchAll && rest.length > 0) {
    groups.push({ ...catchAll, items: rest });
  }

  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <div className="head"><h1>Personal Finance</h1></div>
          <p className="lede">
            Plain-language guides for Canadians, grouped by the moment you are actually in. Pick the one that
            sounds like your life right now.
          </p>

          {groups.map((g) => (
            <section key={g.label} className="pf-moment">
              <div className="pf-moment-head">
                <span className="pf-moment-label">{g.label}</span>
                <span className="pf-moment-note">{g.note}</span>
              </div>
              {g.items.map((a) => (
                <Link key={a.slug} href={`/personal-finance/${a.slug}`} className="arow-card">
                  <div className="at">{a.title}</div>
                  <div className="ab">{a.dek}</div>
                  <div className="am">
                    <span className="tg">{a.tag}</span>
                    <span className="sep">·</span><span>{a.read}</span>
                    <span className="sep">·</span><span>{a.date}</span>
                  </div>
                </Link>
              ))}
            </section>
          ))}

          <p className="lede" style={{ marginTop: 20 }}>
            New guides land regularly, on cards, points, and building real wealth in Canada. Check back soon.
          </p>

          <div className="cd-sec" style={{ marginTop: 24 }}>Reference</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/rates" className="cd-apply">
              Best rates in Canada: savings, GICs, chequing &rarr;
            </Link>
            <Link href="/personal-finance/best-savings-account-rates-canada" className="cd-apply">
              Best high-interest savings rates in Canada &rarr;
            </Link>
            <Link href="/personal-finance/best-gic-rates-canada" className="cd-apply">
              Best GIC rates in Canada &rarr;
            </Link>
            <Link href="/personal-finance/best-chequing-account-bonuses-canada" className="cd-apply">
              Best chequing account welcome bonuses in Canada &rarr;
            </Link>
            <Link href="/personal-finance/where-to-hold-cash-canada" className="cd-apply">
              Where to hold your cash in Canada &rarr;
            </Link>
            <Link href="/personal-finance/best-cash-back-credit-cards-canada" className="cd-apply">
              The best cash-back credit cards in Canada &rarr;
            </Link>
            <Link href="/personal-finance/best-travel-credit-cards-canada" className="cd-apply">
              The best travel and rewards credit cards in Canada &rarr;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
