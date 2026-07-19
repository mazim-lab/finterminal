import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TAGS, tagBySlug, articlesForTag, MIN_INDEXABLE_TAG_ARTICLES } from "@/data/tags";
import { LoadMoreCards } from "@/components/LoadMoreCards";

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
    title: `${tag.label} | FinTerminal`,
    description: tag.description,
    ...(thin ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tag = tagBySlug(slug);
  if (!tag) notFound();

  const articles = articlesForTag(slug);
  const cards = articles.map((a) => ({
    href: a.path,
    title: a.title,
    dek: a.dek ?? "",
    tag: a.section,
    meta: [] as string[],
  }));

  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <nav className="crumb">
            <Link href="/">home</Link><span className="sep">/</span>
            <Link href="/tags">tags</Link><span className="sep">/</span>
            <span className="cur">{tag.label}</span>
          </nav>

          <div className="head"><h1>{tag.label}</h1></div>
          <p className="lede">{tag.description}</p>

          <div className="cd-sec">Articles</div>
          {cards.length > 0 ? (
            <LoadMoreCards cards={cards} pageSize={20} />
          ) : (
            <p className="cd-empty">
              Nothing tagged here yet.{" "}
              <Link href="/tags" style={{ color: "var(--emerald)", fontWeight: 700 }}>← browse other topics</Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
