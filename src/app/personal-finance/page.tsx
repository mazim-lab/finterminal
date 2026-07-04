import Link from "next/link";
import { LoadMoreCards } from "@/components/LoadMoreCards";
import { livePFArticles } from "@/data/personal-finance";

export const metadata = {
  title: "Personal Finance | FinTerminal",
  description: "Practical, plain-language personal finance guides for Canadians, from tax-efficient borrowing to building real wealth.",
};

// Re-check hourly so scheduled articles appear on their publishAt date, no redeploy needed.
export const revalidate = 3600;

export default function PersonalFinancePage() {
  const articles = livePFArticles();
  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <div className="head"><h1>Personal Finance</h1></div>

          <div className="cd-sec">Guides</div>
          <LoadMoreCards
            cards={articles.map((a) => ({
              href: `/personal-finance/${a.slug}`,
              title: a.title,
              dek: a.dek,
              tag: a.tag,
              meta: [a.read, a.date],
            }))}
            pageSize={10}
          />

          <p className="lede" style={{ marginTop: 20 }}>
            New guides land regularly, on cards, points, and building real wealth in Canada. Check back soon.
          </p>

          <div className="cd-sec" style={{ marginTop: 24 }}>Reference</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/personal-finance/best-savings-account-rates-canada" className="cd-apply">
              Best high-interest savings rates in Canada &rarr;
            </Link>
            <Link href="/personal-finance/best-gic-rates-canada" className="cd-apply">
              Best GIC rates in Canada &rarr;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
