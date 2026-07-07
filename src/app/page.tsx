import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { getTopCardsByValue, formatCurrency, CARDS_VERIFIED } from "@/data/cards";
import { POSITIONS } from "@/data/portfolio";
import { livePFArticles, isPFPublished, PF_ARTICLES } from "@/data/personal-finance";
import { NEWS } from "@/data/news";
import { DEALS, dealsTodayISO, isDealExpired } from "@/data/deals";
import { HomeHero } from "@/components/HomeHero";
import { VerifiedStamp } from "@/components/VerifiedStamp";
import { GrowthMotif, MOTIFS, type MotifKey } from "@/components/heroes/motifs";
import { FreshDot } from "@/components/FreshDot";

// Re-check hourly so the featured guide and RESP row flip live on their
// publishAt dates without a redeploy (see isPFPublished).
export const revalidate = 3600;

// ── Computed, honest figures (spec 3.5) ─────────────────────────────────────

// Best first-year value on the board right now, computed from the real card data.
const topCard = getTopCardsByValue(1, "CA")[0];
const bestValue = topCard ? formatCurrency(topCard.first_year_value, "CA") : "";
const bestCardHref = topCard ? `/cards?q=${encodeURIComponent(topCard.name)}` : "/cards";

// Portfolio: N positions and the BEST performer, in percent terms only. Never a
// dollar figure. The standing privacy rule holds everywhere.
const rated = POSITIONS.filter((p) => typeof p.returnPct === "number");
const best = rated.reduce<(typeof POSITIONS)[number] | null>(
  (hi, p) => (hi === null || (p.returnPct as number) > (hi.returnPct as number) ? p : hi),
  null,
);
const bestPct =
  best && typeof best.returnPct === "number"
    ? `${best.returnPct >= 0 ? "+" : ""}${best.returnPct.toFixed(1)}%`
    : "";

// RESP row: link the RESP guide once it is live, else the Money index (spec 3.5).
const RESP_SLUG = "resp-cesg-grant-canada";
const respHref = isPFPublished(RESP_SLUG) ? `/personal-finance/${RESP_SLUG}` : "/personal-finance";

// ── Featured guide: flagship RRSP/TFSA or RESP if live, else newest live ─────

function pickFeatured() {
  const live = livePFArticles();
  const flagship =
    (isPFPublished(RESP_SLUG) && PF_ARTICLES.find((a) => a.slug === RESP_SLUG)) ||
    live.find((a) => a.slug === "rrsp-vs-tfsa-canada") ||
    live.find((a) => /resp|tfsa|rrsp/i.test(a.slug));
  return flagship || live[0];
}
const featured = pickFeatured();
// One motif per topic, demoted to a small stamp beside the title (spec 3.6).
const FEATURED_MOTIF: Record<string, MotifKey> = {
  "resp-cesg-grant-canada": "growth",
  "rrsp-vs-tfsa-canada": "decision",
};
const FeaturedMotif = featured
  ? MOTIFS[FEATURED_MOTIF[featured.slug] ?? "growth"] ?? GrowthMotif
  : GrowthMotif;

// ── Departures: the reader's jobs, not the site's furniture (spec 3.5) ───────

interface Departure {
  dest: string[]; // flap-in clusters
  gate: string;
  href: string;
  num: ReactNode;
  status: ReactNode;
}
const DEPARTURES: Departure[] = [
  {
    dest: ["PICK THE", "FAMILY", "CARD"],
    gate: "CARDS",
    href: bestCardHref,
    num: (
      <>
        Best first-year value on the board right now: <b>{bestValue}</b> after the annual fee, at a normal
        family&apos;s spend.
      </>
    ),
    status: (
      <>
        <span className="dot">&#9679;</span> UPDATED <span className="dt">THIS WEEK</span>
      </>
    ),
  },
  {
    dest: ["START THE", "RESP"],
    gate: "MONEY",
    href: respHref,
    num: (
      <>
        The government adds a guaranteed <b>20%</b> to what you put in. One account, one evening.
      </>
    ),
    status: (
      <>
        <span className="dot">&#9679;</span> GUIDE
      </>
    ),
  },
  {
    dest: ["FLY FOUR", "ON", "POINTS"],
    gate: "TRAVEL",
    href: "/travel",
    num: <>Get the whole family across the country and back on points, without touching the vacation fund.</>,
    status: (
      <>
        <span className="dot">&#9679;</span> GUIDE
      </>
    ),
  },
  {
    dest: ["KILL A", "BANK", "FEE"],
    gate: "MONEY",
    href: "/personal-finance/best-chequing-account-bonuses-canada",
    num: <>The monthly chequing fee, ended in one afternoon. A no-fee account does the same job for free.</>,
    status: (
      <>
        <span className="dot">&#9679;</span> GUIDE
      </>
    ),
  },
  {
    dest: ["SEE MY", "REAL", "MONEY"],
    gate: "PORTFOLIO",
    href: "/portfolio",
    num: (
      <>
        <b>{POSITIONS.length} positions</b>, each with a written thesis. Losses shown, on purpose.
      </>
    ),
    status: (
      <>
        <span className="dot live">&#9679;</span> <span className="live">LIVE</span>
      </>
    ),
  },
];

// ── The wire: newest news + deals (spec 3.5) ────────────────────────────────

const wireNews = NEWS.slice(0, 4);
// Newest live deals first, by posted date. Expired deals are filtered out
// (same expiry logic as the Deals page) so the wire never surfaces a dead offer.
const today = dealsTodayISO();
const wireDeals = [...DEALS]
  .filter((d) => !isDealExpired(d, today))
  .sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime())
  .slice(0, 4);

function shortDate(d: string): string {
  const parsed = new Date(d);
  if (isNaN(parsed.getTime())) return d;
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return `${months[parsed.getMonth()]} ${String(parsed.getDate()).padStart(2, "0")}`;
}

export default function Home() {
  return (
    <div className="app norail">
      <main>
        <HomeHero variant="graphic" />

        {/* ── Departures: five reader jobs ─────────────────────────────── */}
        <section className="hp-sec" aria-labelledby="dep-h">
          <div className="hp-sechead">
            <span className="hp-mlabel" id="dep-h">DEPARTURES</span>
            <span className="hp-meta">five things worth doing with your money this week</span>
          </div>
          <div className="board">
            <div className="board-cols" aria-hidden="true">
              <span>Destination</span>
              <span>Gate</span>
              <span>The number</span>
              <span className="r">Status</span>
            </div>
            {DEPARTURES.map((d, i) => (
              <Link key={d.dest.join(" ")} className="brow" href={d.href} style={{ "--d": `${i * 0.07}s` } as CSSProperties}>
                <span className="dest">
                  {d.dest.map((w) => (
                    <span key={w} className="fw">{w}</span>
                  ))}
                </span>
                <span className="gate">{d.gate}</span>
                <span className="num">{d.num}</span>
                <span className="status">{d.status}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Tonight's read: one featured guide, given room ───────────── */}
        {featured && (
          <section className="hp-sec" aria-labelledby="read-h">
            <div className="hp-sechead">
              <span className="hp-mlabel" id="read-h">TONIGHT&apos;S READ</span>
              <span className="hp-meta">one guide, given room</span>
            </div>
            <div className="featured">
              <div className="featured-motif" aria-hidden="true">
                <FeaturedMotif />
              </div>
              <div className="featured-body">
                <h3 className="featured-title">
                  <Link href={`/personal-finance/${featured.slug}`}>{featured.title}</Link>
                </h3>
                <p className="featured-dek">{featured.dek}</p>
                <p className="featured-meta">
                  {featured.read} <span className="sep">·</span> {featured.tag}{" "}
                  <span className="sep">·</span>{" "}
                  <VerifiedStamp date={`${featured.date}`} cadenceDays={120} />
                  <FreshDot date={featured.date} />
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── Proof strip: reader-stakes numbers, not site plumbing ─────── */}
        <section className="hp-sec" aria-label="Proof strip">
          <div className="proofstrip">
            <Link className="proof-item" href={bestCardHref}>
              <span className="pl">Best first-year value</span>
              <span className="pv em">{bestValue}</span>
              <span className="pd">after the fee, computed</span>
            </Link>
            <div className="proof-item">
              <span className="pl">Cards last re-verified</span>
              <span className="pv gd">
                <VerifiedStamp date={CARDS_VERIFIED} cadenceDays={14} verb="CHECKED" />
              </span>
              <span className="pd">on the twice-weekly playbook</span>
            </div>
            <Link className="proof-item" href="/portfolio">
              <span className="pl">My portfolio</span>
              <span className="pv">
                {POSITIONS.length} positions <span className="best">best {bestPct}</span>
              </span>
              <span className="pd">percent terms only, losses shown</span>
            </Link>
          </div>
        </section>

        {/* ── The wire: news + deals, two columns in one data frame ─────── */}
        <section className="hp-sec" aria-labelledby="wire-h">
          <div className="hp-sechead">
            <span className="hp-mlabel" id="wire-h">THE WIRE</span>
            <span className="hp-meta">what changed, and whether you should care</span>
          </div>
          <div className="wire">
            <div className="wirecol">
              <div className="wt">
                <span className="hp-mlabel em">NEWS</span>
                <Link className="wt-all" href="/news">all news &rarr;</Link>
              </div>
              {wireNews.map((n) => (
                <Link key={n.slug} className="wireitem" href={`/news/${n.slug}`}>
                  <span className="ts">{shortDate(n.date)}<FreshDot date={n.date} /></span>
                  <h4>{n.headline}</h4>
                  <p className="wd">{n.dek}</p>
                </Link>
              ))}
            </div>
            <div className="wirecol">
              <div className="wt">
                <span className="hp-mlabel em">DEALS</span>
                <Link className="wt-all" href="/deals">all deals &rarr;</Link>
              </div>
              {wireDeals.map((d) => (
                <a key={d.url} className="wireitem" href={d.url} target="_blank" rel="noopener noreferrer">
                  <span className="ts">{d.expires ? d.expires.toUpperCase() : shortDate(d.posted)}<FreshDot date={d.posted} /></span>
                  <h4>{d.title}</h4>
                  <p className="wd">{d.price ? `${d.price} at ${d.merchant}` : d.merchant}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
