import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SWEET_SPOTS } from "@/data/sweet-spots";
import { ArticleTags } from "@/components/ArticleTags";
import { ogMeta } from "@/lib/og";
import { ArticleSchema } from "@/components/ArticleSchema";
import { ArticleHero } from "@/components/ArticleHero";
import { Comments } from "@/components/Comments";
import { RouteArcsMotif } from "@/components/heroes/motifs";
import { VerifiedStamp } from "@/components/VerifiedStamp";
import { programGuide, programSlug, spotHref } from "../../programs";
import s from "../../travel.module.css";

const BASE = "https://www.finterminal.ca";

// All sweet-spot posts are known at build time from the committed list.
export function generateStaticParams() {
  return SWEET_SPOTS.map((spot) => ({ slug: spot.slug }));
}
export const dynamicParams = false;

function findSpot(slug: string) {
  return SWEET_SPOTS.find((spot) => spot.slug === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const spot = findSpot(slug);
  if (!spot) return { title: "Sweet Spot Not Found | FinTerminal" };
  return {
    title: `${spot.title} | FinTerminal`,
    description: spot.dek,
    alternates: { canonical: `/travel/sweet-spots/${spot.slug}` },
    ...ogMeta(spot.title, "Travel · Sweet spot"),
  };
}

export default async function SweetSpotPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spot = findSpot(slug);
  if (!spot) notFound();

  const path = `/travel/sweet-spots/${spot.slug}`;
  const paragraphs = spot.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const hasFaqs = !!spot.faqs && spot.faqs.length > 0;

  const sameProgram = SWEET_SPOTS.filter((x) => x.program === spot.program && x.slug !== spot.slug);
  const morePosts = sameProgram.length > 0 ? sameProgram.slice(0, 4) : SWEET_SPOTS.filter((x) => x.slug !== spot.slug).slice(0, 4);
  const guide = programGuide(spot.program);
  const showGuide = guide && guide.href !== spot.href;

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Travel", item: `${BASE}/travel` },
      { "@type": "ListItem", position: 3, name: "Sweet spots", item: `${BASE}/travel/sweet-spots` },
      { "@type": "ListItem", position: 4, name: spot.title, item: `${BASE}${path}` },
    ],
  };

  return (
    <div className="app norail tone-travel">
      <main>
        <article className="doc">
          {hasFaqs ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: spot.faqs!.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              }}
            />
          ) : null}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span className="sep">/</span>
            <Link href="/travel">Travel</Link><span className="sep">/</span>
            <Link href="/travel/sweet-spots">Sweet spots</Link><span className="sep">/</span>
            <span className={`cur ${s.crumbCur}`} aria-current="page">{spot.title}</span>
          </nav>
          <ArticleSchema headline={spot.title} path={path} kicker="Travel · Sweet spot" />

          <ArticleHero variant="graphic" alt="Flight-path arcs connecting cities over a faint map">
            <RouteArcsMotif />
          </ArticleHero>

          <div className="head">
            <span className="eyebrow">{spot.program} sweet spot</span>
            <h1 style={{ marginTop: "var(--s2)" }}>{spot.title}</h1>
          </div>
          <p className="lede">{spot.dek}</p>
          <div className="docmeta">
            <Link href={`/travel/sweet-spots#${programSlug(spot.program)}`} className="chip chip-tone">
              {spot.program}
            </Link>
            <span>{spot.date}</span><span className="sep">·</span>
            <span>{spot.read}</span>
            {spot.lastChecked ? (
              <>
                <span className="sep">·</span>
                <VerifiedStamp date={spot.lastChecked} cadenceDays={30} verb="CHECKED" />
              </>
            ) : null}
          </div>
          <ArticleTags path={path} />

          {spot.shortAnswer ? (
            <div className="cd-note short">
              <div className="cap">The short answer</div>
              <p className="sub">{spot.shortAnswer}</p>
            </div>
          ) : null}

          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}

          {spot.href || (showGuide && guide) ? (
            <div className="cta-row">
              {spot.href ? (
                <Link href={spot.href} className="cd-apply primary">
                  {spot.hrefLabel ?? "Read more"} &rarr;
                </Link>
              ) : null}
              {showGuide && guide ? (
                <Link href={guide.href} className="cd-apply">{guide.label} &rarr;</Link>
              ) : null}
            </div>
          ) : null}

          {hasFaqs ? (
            <>
              <h2 className="cd-sec" id="faq">Frequently asked questions</h2>
              {spot.faqs!.map((f, i) => (
                <div key={i}>
                  <h3 className="faq-q">{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </>
          ) : null}

          {morePosts.length > 0 ? (
            <>
              <h2 className="cd-sec" id="more">
                {sameProgram.length > 0 ? `More ${spot.program} sweet spots` : "More sweet spots"}
              </h2>
              <ul className={`rows ${s.more}`}>
                {morePosts.map((x) => (
                  <li key={x.slug} className="row is-link">
                    <span className="r-date">{x.date}</span>
                    <div className="r-main">
                      <div className={`r-title ${s.clamp2}`}>
                        <Link className="lnk-quiet" href={spotHref(x)}>{x.title}</Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cta-row" style={{ marginTop: "var(--s4)" }}>
                <Link href="/travel/sweet-spots" className="cd-apply">
                  All {SWEET_SPOTS.length} sweet spots &rarr;
                </Link>
                <Link href="/travel" className="cd-apply">Travel and points hub</Link>
              </div>
            </>
          ) : null}

          <Comments path={path} />
        </article>
      </main>
    </div>
  );
}
