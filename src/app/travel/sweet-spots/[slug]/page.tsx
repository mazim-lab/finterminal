import { Metadata } from "next";
import Link from "next/link";
import { SWEET_SPOTS } from "@/data/sweet-spots";
import { ArticleTags } from "@/components/ArticleTags";
import { ogMeta } from "@/lib/og";
import { ArticleSchema } from "@/components/ArticleSchema";
import { ArticleHero } from "@/components/ArticleHero";
import { Comments } from "@/components/Comments";
import { RouteArcsMotif } from "@/components/heroes/motifs";
import { VerifiedStamp } from "@/components/VerifiedStamp";

// All sweet-spot posts are known at build time from the committed list.
export function generateStaticParams() {
  return SWEET_SPOTS.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

function findSpot(slug: string) {
  return SWEET_SPOTS.find((s) => s.slug === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const spot = findSpot(slug);
  if (!spot) return { title: "Sweet Spot Not Found | FinTerminal" };
  return { title: `${spot.title} | FinTerminal`, description: spot.dek, ...ogMeta(spot.title, "Travel · Sweet spot") };
}

export default async function SweetSpotPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spot = findSpot(slug);

  if (!spot) {
    return (
      <div className="app norail">
        <main>
          <div className="head"><h1>404 · No Such Post</h1></div>
          <p className="cd-empty">
            That sweet spot isn&apos;t here.{" "}
            <Link href="/travel" style={{ color: "var(--emerald)", fontWeight: 700 }}>← back to Travel &amp; Points</Link>
          </p>
        </main>
      </div>
    );
  }

  const paragraphs = spot.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="app norail">
      <main>
        <div className="doc">
          {spot.faqs && spot.faqs.length > 0 ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: spot.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              }}
            />
          ) : null}
          <nav className="crumb">
            <Link href="/">home</Link><span className="sep">/</span>
            <Link href="/travel">travel</Link><span className="sep">/</span>
            <span className="cur">{spot.slug}</span>
          </nav>
          <ArticleSchema headline={spot.title} path={`/travel/sweet-spots/${spot.slug}`} kicker="Travel · Sweet spot" />

          <ArticleHero variant="graphic" alt="Flight-path arcs connecting cities over a faint map">
            <RouteArcsMotif />
          </ArticleHero>

          <div className="head"><h1>{spot.title}</h1></div>
          <p className="lede">{spot.dek}</p>
          <div className="docmeta">
            <span className="gd">SWEET SPOT</span><span className="sep">·</span>
            <span>{spot.program}</span><span className="sep">·</span>
            <span>{spot.read}</span><span className="sep">·</span>
            <span>{spot.date}</span>
            {spot.lastChecked ? (
              <>
                <span className="sep">·</span>
                <VerifiedStamp date={spot.lastChecked} cadenceDays={30} verb="CHECKED" />
              </>
            ) : null}
          </div>
          <ArticleTags path={`/travel/sweet-spots/${spot.slug}`} />

          {spot.shortAnswer ? (
            <div className="cd-note short">
              <div className="cap">The short answer</div>
              <p style={{ margin: 0 }} className="sub">{spot.shortAnswer}</p>
            </div>
          ) : null}

          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}

          {spot.faqs && spot.faqs.length > 0 ? (
            <>
              <div className="cd-sec">Frequently asked questions</div>
              {spot.faqs.map((f, i) => (
                <div key={i}>
                  <h4>{f.q}</h4>
                  <p>{f.a}</p>
                </div>
              ))}
            </>
          ) : null}

          <div className="cd-sec">Where to next</div>
          <p>Dig into the full strategy, or go back for more examples.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            {spot.href ? (
              <Link href={spot.href} className="cd-apply">
                {spot.hrefLabel ?? "Read more"} →
              </Link>
            ) : null}
            <Link href="/travel" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>
              ← Back to Travel &amp; Points
            </Link>
          </div>

          <Comments path={`/travel/sweet-spots/${spot.slug}`} />
        </div>
      </main>
    </div>
  );
}
