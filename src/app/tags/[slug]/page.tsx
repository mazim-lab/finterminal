import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TAGS, tagBySlug, articlesForTag, MIN_INDEXABLE_TAG_ARTICLES, type TaggedArticle } from "@/data/tags";
import { SWEET_SPOTS } from "@/data/sweet-spots";
import { NEWS } from "@/data/news";
import { ogMeta } from "@/lib/og";
import { SECTION_ORDER } from "../groups";
import s from "../tags.module.css";

import { ShelfArt } from "@/components/illustrations/HomeArt";
const BASE = "https://www.finterminal.ca";
// Long groups show this many rows up front; the rest sit in an open-on-click
// <details>, which is still in the prerendered HTML.
const VISIBLE_ROWS = 12;

// Every tag hub is known at build time from the canonical list.
export function generateStaticParams() {
  return TAGS.map((t) => ({ slug: t.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tag = tagBySlug(slug);
  if (!tag) return { title: "Topic Not Found | FinTerminal" };

  const thin = articlesForTag(slug).length < MIN_INDEXABLE_TAG_ARTICLES;
  return {
    title: `${tag.label}: every article on this topic | FinTerminal`,
    description: tag.description,
    alternates: { canonical: `/tags/${tag.slug}` },
    ...ogMeta(tag.label, "Topic", `/tags/${tag.slug}`),
    ...(thin ? { robots: { index: false, follow: true } } : {}),
  };
}

interface Item {
  a: TaggedArticle;
  date?: string;
  kicker?: string;
  rank: number;
}

// Pull a date (and for sweet spots the program) from the source data when the
// path matches, and sort dated groups newest first by their position there.
function enrich(a: TaggedArticle, i: number): Item {
  if (a.path.startsWith("/travel/sweet-spots/")) {
    const idx = SWEET_SPOTS.findIndex((x) => `/travel/sweet-spots/${x.slug}` === a.path);
    if (idx >= 0) return { a, date: SWEET_SPOTS[idx].date, kicker: SWEET_SPOTS[idx].program, rank: idx };
  }
  if (a.path.startsWith("/news/")) {
    const idx = NEWS.findIndex((x) => `/news/${x.slug}` === a.path);
    if (idx >= 0) return { a, date: NEWS[idx].date, rank: idx };
  }
  return { a, rank: 100000 + i };
}

function Rows({ items }: { items: Item[] }) {
  const dated = items.some((it) => it.date);
  return (
    <ul className="rows">
      {items.map(({ a, date, kicker }) => (
        <li key={a.path} className={`row is-link ${s.row}`}>
          {dated ? <span className="r-date">{date ?? ""}</span> : null}
          <div className="r-main">
            {kicker ? <div className={s.kicker}>{kicker}</div> : null}
            <div className="r-title">
              <Link href={a.path}>{a.title}</Link>
            </div>
            {a.dek ? <p className={`r-sub ${s.clamp2}`}>{a.dek}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tag = tagBySlug(slug);
  if (!tag) notFound();

  const articles = articlesForTag(slug);
  const items = articles.map(enrich);

  const known = new Set(SECTION_ORDER.map((x) => x.section));
  const groups = [
    ...SECTION_ORDER.map((x) => ({ ...x, items: items.filter((it) => it.a.section === x.section) })),
    { section: "Other", id: "other", label: "More", items: items.filter((it) => !known.has(it.a.section)) },
  ]
    .map((g) => ({ ...g, items: [...g.items].sort((p, q) => p.rank - q.rank) }))
    .filter((g) => g.items.length > 0);

  // Topics that most often share an article with this one.
  const co = new Map<string, number>();
  for (const a of articles) for (const t of a.tags) if (t !== slug) co.set(t, (co.get(t) ?? 0) + 1);
  const related = [...co.entries()]
    .map(([s2, n]) => ({ tag: tagBySlug(s2), n }))
    .filter((x): x is { tag: NonNullable<ReturnType<typeof tagBySlug>>; n: number } => !!x.tag)
    .sort((p, q) => q.n - p.n || p.tag.label.localeCompare(q.tag.label))
    .slice(0, 10);

  const thin = articles.length < MIN_INDEXABLE_TAG_ARTICLES;
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${tag.label} on FinTerminal`,
    numberOfItems: articles.length,
    itemListElement: groups.flatMap((g) => g.items).map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}${it.a.path}`,
      name: it.a.title,
    })),
  };

  return (
    <main className="wrap tone-neutral">
      <div className="page">
      {!thin && articles.length > 0 ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      ) : null}

      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span className="sep">/</span>
        <Link href="/tags">Topics</Link><span className="sep">/</span>
        <span className="cur" aria-current="page">{tag.label}</span>
      </nav>

      <header className="page-head">
        <span className="eyebrow">Topic</span>
        <h1>{tag.label}</h1>
        <p className="dek">{tag.description}</p>
        {articles.length > 0 ? (
          <div className={s.headStats}>
            <span><b>{articles.length}</b> article{articles.length === 1 ? "" : "s"}</span>
            {groups.map((g) => (
              <span key={g.id}><b>{g.items.length}</b> {g.label.toLowerCase()}</span>
            ))}
          </div>
        ) : null}
      </header>

      {groups.length > 1 ? (
        <nav className={s.jump} aria-label="Jump to a content type">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`}>
              {g.label} <span>{g.items.length}</span>
            </a>
          ))}
        </nav>
      ) : null}

      {groups.length === 0 ? (
        <div className="empty">
          <ShelfArt className="empty-art" />
          <h2 className={s.emptyH}>Nothing tagged here yet</h2>
          <p>We have not filed anything under this topic so far.</p>
          <Link className="btn" href="/tags">Browse other topics</Link>
        </div>
      ) : null}

      {groups.map((g) => {
        const head = g.items.slice(0, VISIBLE_ROWS);
        const rest = g.items.slice(VISIBLE_ROWS);
        return (
          <section key={g.id} id={g.id} className={s.group} aria-labelledby={`${g.id}-h`}>
            <div className={s.groupHead}>
              <h2 id={`${g.id}-h`}>{g.label}</h2>
              <span className="ct">{g.items.length}</span>
              {g.id === "sweet-spots" ? (
                <Link className={s.headLink} href="/travel/sweet-spots">
                  All sweet spots &rarr;
                </Link>
              ) : null}
              {g.id === "news" ? (
                <Link className={s.headLink} href="/news">
                  All news &rarr;
                </Link>
              ) : null}
            </div>
            <Rows items={head} />
            {rest.length > 0 ? (
              <details className="acc" style={{ marginTop: "var(--s3)" }}>
                <summary>Show {rest.length} more</summary>
                <div style={{ padding: "0 var(--s3) var(--s3)" }}>
                  <Rows items={rest} />
                </div>
              </details>
            ) : null}
          </section>
        );
      })}

      {related.length > 0 ? (
        <section className={s.related} aria-labelledby="related-h">
          <div className="section-head">
            <h2 id="related-h">Related topics</h2>
            <Link className="more" href="/tags">All topics &rarr;</Link>
          </div>
          <div className={s.jump} style={{ marginBottom: 0 }}>
            {related.map(({ tag: t }) => (
              <Link key={t.slug} href={`/tags/${t.slug}`}>{t.label}</Link>
            ))}
          </div>
        </section>
      ) : null}
      </div>
    </main>
  );
}
