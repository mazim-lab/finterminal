import type { Metadata } from "next";
import Link from "next/link";
import { TAGS, TAGGED_ARTICLES, tagCount } from "@/data/tags";
import { ogMeta } from "@/lib/og";
import { groupTags } from "./groups";
import s from "./tags.module.css";

export const metadata: Metadata = {
  title: "Browse by topic | FinTerminal",
  description:
    "Every FinTerminal topic in one place. Pick a tag to see every article on points, travel, cards, and personal finance that touches it.",
  alternates: { canonical: "/tags" },
  ...ogMeta("Browse by topic", "Topics", "/tags"),
};

export default function TagsIndexPage() {
  const withCounts = TAGS.map((t) => ({ ...t, count: tagCount(t.slug) }))
    .filter((t) => t.count > 0)
    .sort((a, b) => a.label.localeCompare(b.label));
  const groups = groupTags(withCounts);

  return (
    <main className="wrap tone-neutral">
      <div className="page">
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span className="sep">/</span>
        <span className="cur" aria-current="page">Topics</span>
      </nav>

      <header className="page-head">
        <span className="eyebrow">Topics</span>
        <h1>Browse by topic</h1>
        <p className="dek">
          Every FinTerminal topic in one place. Pick a tag to pull up every article that touches it, whether that is
          Aeroplan sweet spots, cash back cards, or where to park your emergency fund.
        </p>
        <div className={s.headStats}>
          <span><b>{withCounts.length}</b> topics</span>
          <span><b>{TAGGED_ARTICLES.length}</b> tagged articles</span>
        </div>
      </header>

      {groups.length > 0 ? (
        <>
          <nav className={s.jump} aria-label="Jump to a topic group">
            {groups.map((g) => (
              <a key={g.id} href={`#${g.id}`}>
                {g.label} <span>{g.items.length}</span>
              </a>
            ))}
          </nav>

          {groups.map((g) => (
            <section key={g.id} id={g.id} className={`${s.group} ${g.tone}`} aria-labelledby={`${g.id}-h`}>
              <div className={s.groupHead}>
                <h2 id={`${g.id}-h`}>{g.label}</h2>
                <span className="ct">{g.items.length} topic{g.items.length === 1 ? "" : "s"}</span>
              </div>
              <ul className={s.tiles}>
                {g.items.map((t) => (
                  <li key={t.slug} className={s.tile}>
                    <div className={s.tileTop}>
                      <span className={s.tileName}>
                        <Link href={`/tags/${t.slug}`}>{t.label}</Link>
                      </span>
                      <span className={s.count} aria-label={`${t.count} articles`}>{t.count}</span>
                    </div>
                    <p className={`${s.tileDek} ${s.clamp2}`}>{t.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      ) : (
        <div className="empty">
          <h2 className={s.emptyH}>No tagged articles yet</h2>
          <p>Check back soon.</p>
        </div>
      )}
      </div>
    </main>
  );
}
