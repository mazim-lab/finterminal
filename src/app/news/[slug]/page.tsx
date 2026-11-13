import type { Metadata } from "next";
import Link from "next/link";
import { NEWS } from "@/data/news";
import { ArticleTags } from "@/components/ArticleTags";
import { ogMeta } from "@/lib/og";
import { humanToISO } from "../humanDate";
import s from "./story.module.css";

const SITE = "https://www.finterminal.ca";

// All stories are known at build time from the committed news list.
export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}
export const dynamicParams = false;

function findItem(slug: string) {
  return NEWS.find((n) => n.slug === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);
  if (!item) return { title: "Story Not Found | FinTerminal" };
  return {
    title: `${item.headline} | FinTerminal`,
    description: item.dek,
    alternates: { canonical: `/news/${item.slug}` },
    ...ogMeta(item.headline, "News", `/news/${item.slug}`, "article"),
  };
}

// Many wire bodies are one very long paragraph. For readability only, break
// any paragraph over ~700 characters at sentence ends into chunks of roughly
// that size. Words are never changed, only where the paragraph breaks fall.
const CHUNK = 700;
function splitLong(p: string): string[] {
  if (p.length <= CHUNK * 1.4) return [p];
  // A sentence end: lowercase letter, digit or closing quote/paren, then . ! or ?,
  // then whitespace and a capital letter or opening quote.
  const sentences = p.split(/(?<=[a-z0-9)"'’][.!?])\s+(?=[A-Z"“])/);
  const out: string[] = [];
  let cur = "";
  for (const sen of sentences) {
    if (cur && cur.length + sen.length > CHUNK) {
      out.push(cur);
      cur = sen;
    } else {
      cur = cur ? `${cur} ${sen}` : sen;
    }
  }
  if (cur) out.push(cur);
  return out;
}

// Up to four nearby stories from the same category, in archive order.
function moreFromWire(slug: string, category: string) {
  const self = NEWS.findIndex((n) => n.slug === slug);
  return NEWS.map((n, idx) => ({ n, idx }))
    .filter(({ n, idx }) => idx !== self && n.category === category)
    .sort((a, b) => Math.abs(a.idx - self) - Math.abs(b.idx - self))
    .slice(0, 4)
    .sort((a, b) => a.idx - b.idx)
    .map(({ n }) => n);
}

export default async function NewsStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findItem(slug);

  if (!item) {
    return (
      <div className="app norail">
        <main>
          <div className="doc">
            <div className="head"><h1>We could not find that story</h1></div>
            <p className="lede">
              It isn&apos;t on the wire. <Link href="/news">Head back to the newswire</Link>.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const paragraphs = item.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .flatMap(splitLong);
  // Parse the human date ("Jun 30, 2026") to ISO for structured data; guard against
  // a malformed date so a bad entry can never throw during render.
  const published = (() => {
    const d = new Date(`${item.date} 12:00:00`);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  })();
  const isoDay = humanToISO(item.date);
  const region = item.region === "CA" ? "Canada" : "US";
  const more = moreFromWire(item.slug, item.category);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "News", item: `${SITE}/news` },
      { "@type": "ListItem", position: 3, name: item.headline, item: `${SITE}/news/${item.slug}` },
    ],
  };

  return (
    <div className="app norail">
      <main>
        <article className={`doc tone-neutral ${s.story}`}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                headline: item.headline,
                description: item.dek,
                image: `https://www.finterminal.ca/api/og?title=${encodeURIComponent(item.headline)}&kicker=News`,
                ...(published ? { datePublished: published, dateModified: published } : {}),
                author: { "@type": "Organization", name: "FinTerminal", url: "https://www.finterminal.ca" },
                publisher: { "@type": "Organization", name: "FinTerminal", url: "https://www.finterminal.ca" },
                mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.finterminal.ca/news/${item.slug}` },
              }),
            }}
          />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span className="sep" aria-hidden="true">/</span>
            <Link href="/news">News</Link><span className="sep" aria-hidden="true">/</span>
            <span className="cur" aria-current="page">{item.headline}</span>
          </nav>

          <span className="eyebrow">{item.category}</span>
          <div className={`head ${s.head}`}><h1>{item.headline}</h1></div>
          <p className="lede">{item.dek}</p>

          <div className="docmeta">
            <time dateTime={isoDay ?? undefined}>{item.date}</time>
            <span className="sep" aria-hidden="true">/</span>
            <span className="gd">{item.category}</span>
            <span className="sep" aria-hidden="true">/</span>
            <span>{region}</span>
            {item.exclusive ? (
              <><span className="sep" aria-hidden="true">/</span><span>According to {item.exclusive.join(" and ")}</span></>
            ) : item.sourceLabel ? (
              <><span className="sep" aria-hidden="true">/</span><span>Source: {item.sourceLabel}</span></>
            ) : null}
          </div>
          <ArticleTags path={`/news/${item.slug}`} />

          <div className={s.body}>
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <h2 className="cd-sec sm">Where to next</h2>
          <p className="sub">
            {item.sourceUrl
              ? "Go straight to the source, or jump to what it affects on FinTerminal."
              : "Jump to what it affects on FinTerminal, or keep reading the wire."}
          </p>
          <div className="cta-row">
            {item.sourceUrl ? (
              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="cd-apply primary">
                Read it at {item.sourceLabel ?? "the source"} <span aria-hidden="true">&#8599;</span>
              </a>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="cd-apply">
                {item.hrefLabel ?? "Open related section"} <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : null}
            <Link href="/news" className="cd-apply">
              <span aria-hidden="true">&larr;</span> Back to the newswire
            </Link>
          </div>

          {more.length > 0 && (
            <>
              <h2 className="cd-sec sm">More on {item.category.toLowerCase()}</h2>
              <div className={`rows ${s.more}`}>
                {more.map((n) => (
                  <div key={n.slug} className={`row ${s.moreRow}`}>
                    <time className="r-date" dateTime={humanToISO(n.date) ?? undefined}>{n.date.split(",")[0]}</time>
                    <div className="r-main">
                      <div className={`r-title ${s.moreTitle}`}>
                        <Link href={`/news/${n.slug}`} className="lnk-quiet">{n.headline}</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </article>
      </main>
    </div>
  );
}
