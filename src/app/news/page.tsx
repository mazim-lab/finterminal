import type { Metadata } from "next";
import Link from "next/link";
import { NEWS } from "@/data/news";
import { ogMeta } from "@/lib/og";
import { NewsArchive, type ArchiveItem } from "./NewsFeed";
import { humanToISO } from "./humanDate";
import s from "./news.module.css";

export const metadata: Metadata = {
  title: "News | FinTerminal",
  description: "Canadian credit-card and points news, in plain language.",
  alternates: { canonical: "/news" },
  ...ogMeta("News", "News", "/news"),
};

// The ticker shows the 5 newest items (array order, newest first). The full
// append-only archive renders below it, a page at a time.
const TICKER_MAX = 5;
const SITE = "https://www.finterminal.ca";

export default function NewsPage() {
  const ticker = NEWS.slice(0, TICKER_MAX);
  const latest = NEWS[0];
  const caCount = NEWS.filter((n) => n.region === "CA").length;

  // Only what the index needs; the long story bodies stay on the story pages.
  const archive: ArchiveItem[] = NEWS.map((n) => ({
    slug: n.slug,
    headline: n.headline,
    dek: n.dek,
    date: n.date,
    category: n.category,
    region: n.region,
    exclusive: n.exclusive,
    sourceLabel: n.sourceLabel,
    href: n.href,
    hrefLabel: n.hrefLabel,
  }));

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FinTerminal newswire",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: NEWS.length,
    itemListElement: NEWS.map((n, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/news/${n.slug}`,
      name: n.headline,
    })),
  };

  return (
    <main className="wrap">
    <div className="page tone-neutral">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <header className="page-head">
        <span className="eyebrow">News</span>
        <h1>Newswire</h1>
        <p className="dek">
          What&apos;s changing in Canadian cards, points, travel and personal finance, and what it means for your
          wallet. Every story links to the issuer or program&apos;s own page so you can check it yourself.
        </p>
        <div className="meta">
          <span>{NEWS.length} stories</span>
          <span className="sep" aria-hidden="true">/</span>
          <span>{caCount} from Canada</span>
          {latest ? (
            <>
              <span className="sep" aria-hidden="true">/</span>
              <span>
                latest <time dateTime={humanToISO(latest.date) ?? undefined}>{latest.date}</time>
              </span>
            </>
          ) : null}
        </div>
      </header>

      <div className={s.layout}>
        <section className={s.tickerSec} aria-labelledby="wire-latest">
          <div className="ticker-box">
            <div className="ticker-head">
              <h2 id="wire-latest" className={s.tickerTitle}>Latest on the wire</h2>
              <span>{ticker.length} newest</span>
            </div>
            <ol className={s.tickerList}>
              {ticker.map((n, i) => (
                <li key={n.slug} className={`nline ${s.tline}`} style={{ ["--i" as string]: i }}>
                  <time className="ndate" dateTime={humanToISO(n.date) ?? undefined}>{n.date.split(",")[0]}</time>
                  <span className="nts" aria-hidden="true">{n.time}</span>
                  <Link href={`/news/${n.slug}`} className={`ntext ${s.ttext}`}>{n.headline}</Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.archiveSec} aria-labelledby="wire-archive">
          <div className="section-head">
            <h2 id="wire-archive">The archive</h2>
            <p>Newest first. We add to it and never rewrite it.</p>
          </div>
          {NEWS.length ? (
            <NewsArchive items={archive} />
          ) : (
            <div className="empty">
              <h3>The wire is quiet</h3>
              <p>No stories yet. Check back soon.</p>
            </div>
          )}
        </section>
      </div>
    </div>
    </main>
  );
}
