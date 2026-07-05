import Link from "next/link";
import { TAGS, tagCount } from "@/data/tags";
import { LoadMoreCards } from "@/components/LoadMoreCards";
import { ogMeta } from "@/lib/og";

export const metadata = {
  title: "Browse by topic | FinTerminal",
  description: "Every FinTerminal topic in one place. Pick a tag to see every article on points, travel, cards, and personal finance that touches it.",
  ...ogMeta("Browse by topic", "Topics"),
};

export const revalidate = 3600;

export default function TagsIndexPage() {
  const cards = TAGS.map((t) => ({ ...t, count: tagCount(t.slug) }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .map((t) => ({
      href: `/tags/${t.slug}`,
      title: t.label,
      dek: t.description,
      tag: "Topic",
      meta: [`${t.count} article${t.count === 1 ? "" : "s"}`],
    }));

  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <nav className="crumb">
            <Link href="/">home</Link><span className="sep">/</span>
            <span className="cur">tags</span>
          </nav>

          <div className="head"><h1>Browse by topic</h1></div>
          <p className="lede">
            Every FinTerminal topic in one place. Pick a tag to pull up every article that touches it,
            whether that is Aeroplan sweet spots, cash back cards, or where to park your emergency fund.
          </p>

          <div className="cd-sec">Topics</div>
          {cards.length > 0 ? (
            <LoadMoreCards cards={cards} pageSize={30} />
          ) : (
            <p className="cd-empty">No tagged articles yet. Check back soon.</p>
          )}
        </div>
      </main>
    </div>
  );
}
