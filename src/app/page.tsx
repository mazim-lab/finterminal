import type { Metadata } from "next";
import Link from "next/link";
import { getTopCardsByValue, formatCurrency, CARDS_VERIFIED, canadianCards } from "@/data/cards";
import { POSITIONS, LAST_UPDATED } from "@/data/portfolio";
import { livePFArticles, isPFPublished, PF_ARTICLES } from "@/data/personal-finance";
import { TRAVEL_GUIDES } from "@/data/travel-guides";
import { SWEET_SPOTS } from "@/data/sweet-spots";
import { NEWS } from "@/data/news";
import { DEALS, dealsTodayISO, isDealExpired } from "@/data/deals";
import { VerifiedStamp } from "@/components/VerifiedStamp";
import { FreshDot } from "@/components/FreshDot";
import { Ticker } from "@/components/Ticker";
import { GrowthMotif, MOTIFS, type MotifKey } from "@/components/heroes/motifs";
import { TableArt, BasketArt, WindowArt, GardenArt, ShelfArt, PantryArt } from "@/components/illustrations/HomeArt";
import { ogMeta } from "@/lib/og";
import s from "./page.module.css";

const TITLE = "FinTerminal | Cards, Points & Personal Finance for Canadians";
const DESCRIPTION = `Canadian credit cards, travel points and personal finance, explained plainly by one dad. Compare ${canadianCards.length} Canadian cards, find the points sweet spots and check the rates, with a date on every number.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  ...ogMeta("Canadian money, explained plainly", "Cards, points & personal finance", "/"),
};

const SITE = "https://www.finterminal.ca";
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "FinTerminal",
      url: SITE,
      inLanguage: "en-CA",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "FinTerminal",
      url: SITE,
      logo: `${SITE}/icons/apple-icon-180.png`,
    },
  ],
};

// ── Computed figures. Everything below comes straight from the data files. ──

// Best first-year value right now, named and linked to its own page.
const topCard = getTopCardsByValue(1, "CA")[0];
const bestValue = topCard ? formatCurrency(topCard.first_year_value, "CA") : "";

// Portfolio in percent terms only. Never a dollar figure.
const rated = POSITIONS.filter((p) => typeof p.returnPct === "number");
const best = rated.reduce<(typeof POSITIONS)[number] | null>(
  (hi, p) => (hi === null || (p.returnPct as number) > (hi.returnPct as number) ? p : hi),
  null,
);
const bestPct =
  best && typeof best.returnPct === "number"
    ? `${best.returnPct >= 0 ? "+" : ""}${best.returnPct.toFixed(1)}%`
    : "";

// Snapshot date straight from portfolio.ts, shown as is (no freshness claim).
function isoToLabel(iso: string | null): string | null {
  const m = iso ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso) : null;
  if (!m) return null;
  return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
}
const portfolioAsOf = isoToLabel(LAST_UPDATED);

const livePF = livePFArticles();

// Featured guide: the RESP guide once live, else RRSP vs TFSA, else the newest live guide.
const RESP_SLUG = "resp-cesg-grant-canada";
function pickFeatured() {
  const flagship =
    (isPFPublished(RESP_SLUG) && PF_ARTICLES.find((a) => a.slug === RESP_SLUG)) ||
    livePF.find((a) => a.slug === "rrsp-vs-tfsa-canada") ||
    livePF.find((a) => /resp|tfsa|rrsp/i.test(a.slug));
  return flagship || livePF[0];
}
const featured = pickFeatured();
const FEATURED_MOTIF: Record<string, MotifKey> = {
  "resp-cesg-grant-canada": "growth",
  "rrsp-vs-tfsa-canada": "decision",
};
const FeaturedMotif = featured ? MOTIFS[FEATURED_MOTIF[featured.slug] ?? "growth"] ?? GrowthMotif : GrowthMotif;

// What's new: newest news first (the file is newest at the top).
const latestNews = NEWS.slice(0, 5);
const newSpots = SWEET_SPOTS.slice(0, 3);

// Deals: live only (same expiry rule as /deals), newest posted first.
const today = dealsTodayISO();
const liveDeals = [...DEALS]
  .filter((d) => !isDealExpired(d, today))
  .sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime());
const DEAL_STALE_DAYS = 21;
const newestDealMs = liveDeals.length ? new Date(liveDeals[0].posted).getTime() : NaN;
const dealAgeDays = Number.isNaN(newestDealMs)
  ? Infinity
  : (new Date(`${today}T12:00:00`).getTime() - newestDealMs) / 86_400_000;
const dealsStale = dealAgeDays > DEAL_STALE_DAYS;
const shownDeals = liveDeals.slice(0, dealsStale ? 3 : 4);

// Start here: a few top guides per pillar.
const START_MONEY = [
  "rrsp-vs-tfsa-canada",
  "canadian-account-order-of-operations",
  "how-to-build-credit-canada",
  "fhsa-playbook-canada",
]
  .map((slug) => livePF.find((a) => a.slug === slug))
  .filter((a): a is (typeof livePF)[number] => !!a && a.slug !== featured?.slug)
  .slice(0, 3);
const START_CARDS = [
  "points-vs-cash-back-canada",
  "two-player-mode-couples-welcome-bonuses",
  "foreign-transaction-fee-cards-canada",
  "how-to-hit-minimum-spend-canada",
]
  .map((slug) => livePF.find((a) => a.slug === slug))
  .filter((a): a is (typeof livePF)[number] => !!a)
  .slice(0, 3);
const START_TRAVEL = TRAVEL_GUIDES.slice(0, 4);
const RATES = [
  { href: "/personal-finance/best-savings-account-rates-canada", label: "High-interest savings rates" },
  { href: "/personal-finance/best-gic-rates-canada", label: "GIC rates" },
  { href: "/personal-finance/best-chequing-account-bonuses-canada", label: "Chequing account bonuses" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function shortDate(d: string): string {
  const p = new Date(d);
  if (Number.isNaN(p.getTime())) return d;
  return `${MONTHS[p.getMonth()]} ${p.getDate()}`;
}

function Arrow() {
  return (
    <svg className={s.arrow} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className={`wrap ${s.home}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ── Front door: who this is for and a warm hello ─────────────────── */}
      <section className={`tone-cards ${s.hero}`} aria-labelledby="home-h1">
        <div className={s.heroCopy}>
          <p className={`eyebrow ${s.kick}`}>Canadian money, explained plainly</p>
          <h1 id="home-h1" className={s.h1}>
            Credit cards, points and personal finance for Canadians, sorted out at the kitchen table.
          </h1>
          <p className={s.dek}>
            Pull up a chair. I&apos;m a dad in Ontario who runs these numbers for my own family first. I compare
            Canadian cards on what they actually put back in your pocket, turn points into real trips, and write plain
            guides to the accounts that matter. Every number carries the date I last checked it.
          </p>
          <p className={s.forWho}>
            <b>Who it&apos;s for:</b> Canadian households who want their everyday spending to give a little back,
            without turning it into a second job.
          </p>
          <div className={s.ctas}>
            <Link className="btn btn-primary btn-lg" href="/cards">
              Explore the cards <Arrow />
            </Link>
            <Link className="btn btn-lg" href="/personal-finance">
              Start with the money guides
            </Link>
          </div>
          <p className={s.signed}>
            <Link href="/about">Who runs this site</Link>
          </p>
        </div>
        <div className={s.heroArt}>
          <TableArt />
        </div>
      </section>

      {/* ── Three doors ───────────────────────────────────────────────────── */}
      <section className={s.doorsSec} aria-labelledby="doors-h">
        <h2 id="doors-h" className={s.secTitle}>
          Three things you can do here
        </h2>
        <div className={s.doors}>
          <div className={`tone-cards ${s.door}`}>
            <BasketArt className={s.doorArt} />
            <h3 className={s.doorTitle}>
              <Link href="/cards">Pick a card</Link>
            </h3>
            <p className={s.doorDek}>Ranked on first-year value after the fee, with the math shown for every card.</p>
            <p className={s.doorFact}>
              <b>{canadianCards.length}</b> Canadian cards compared
            </p>
            <span className={s.doorGo} aria-hidden="true">
              Find yours <Arrow />
            </span>
          </div>
          <div className={`tone-travel ${s.door}`}>
            <WindowArt className={s.doorArt} />
            <h3 className={s.doorTitle}>
              <Link href="/travel">Plan a trip on points</Link>
            </h3>
            <p className={s.doorDek}>Transfer partners, award booking and worked redemptions you can copy.</p>
            <p className={s.doorFact}>
              <b>{TRAVEL_GUIDES.length}</b> guides and <b>{SWEET_SPOTS.length}</b> sweet spots
            </p>
            <span className={s.doorGo} aria-hidden="true">
              Start planning <Arrow />
            </span>
          </div>
          <div className={`tone-money ${s.door}`}>
            <GardenArt className={s.doorArt} />
            <h3 className={s.doorTitle}>
              <Link href="/personal-finance">Sort out your money</Link>
            </h3>
            <p className={s.doorDek}>RRSP, TFSA, FHSA, RESP, credit and bank fees, in plain words.</p>
            <p className={s.doorFact}>
              <b>{livePF.length}</b> guides and <b>{RATES.length}</b> rate tables
            </p>
            <span className={s.doorGo} aria-hidden="true">
              Get settled <Arrow />
            </span>
          </div>
        </div>
      </section>

      {/* ── What's fresh ──────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="new-h">
        <div className="section-head">
          <h2 id="new-h">Newest on the table</h2>
          <Link className="more" href="/news">
            All news &rarr;
          </Link>
          <p>The newest stories, sweet spots and deals, each with the date it went up.</p>
        </div>
        <div className={s.newGrid}>
          <div>
            <h3 className={s.colHead}>Latest news</h3>
            <ol className={`rows ${s.news}`}>
              {latestNews.map((n) => (
                <li key={n.slug} className="row is-link">
                  <time className="r-date" dateTime={new Date(n.date).toISOString().slice(0, 10)}>
                    {shortDate(n.date)}
                  </time>
                  <div className="r-main">
                    <p className={`r-title ${s.clamp2}`}>
                      <Link href={`/news/${n.slug}`}>{n.headline}</Link>
                      <FreshDot date={n.date} />
                    </p>
                    <p className={`r-sub ${s.clamp2}`}>{n.dek}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={s.side}>
            <div className="tone-travel">
              <h3 className={s.colHead}>
                New sweet spots
                <Link className={s.colMore} href="/travel/sweet-spots">
                  All &rarr;
                </Link>
              </h3>
              <ul className={`rows ${s.spots}`}>
                {newSpots.map((sp) => (
                  <li key={sp.slug} className="row is-link">
                    <div className="r-main">
                      <p className={s.spotMeta}>
                        <span className="dot" aria-hidden="true" />
                        {sp.program} · {sp.date}
                        <FreshDot date={sp.date} />
                      </p>
                      <p className={`r-title ${s.clamp2} ${s.spotTitle}`}>
                        <Link href={`/travel/sweet-spots/${sp.slug}`}>{sp.title}</Link>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={s.colHead}>
                Deals
                <Link className={s.colMore} href="/deals">
                  All &rarr;
                </Link>
              </h3>
              {dealsStale && (
                <p className={s.dealNote}>
                  No new picks lately. Older picks may have changed price, so check before you buy.
                </p>
              )}
              {shownDeals.length > 0 ? (
                <ul className={`rows ${s.deals}`}>
                  {shownDeals.map((d) => (
                    <li key={d.url} className="row is-link">
                      <div className="r-main">
                        <p className={`r-title ${s.clamp2} ${s.dealTitle}`}>
                          <a href={d.url} target="_blank" rel="noopener noreferrer">
                            {d.title}
                          </a>
                        </p>
                        <p className={s.dealMeta}>
                          {d.price && <b>{d.price}</b>}
                          <span>{d.merchant}</span>
                          <span>posted {d.posted}</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={s.dealNote}>No live picks right now.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── The pantry: the numbers worth knowing, each with its date ────── */}
      <section className={`section ${s.pantry}`} aria-labelledby="proof-h">
        <div className={s.pantryHead}>
          <PantryArt className={s.pantryArt} />
          <div>
            <h2 id="proof-h" className={s.secTitle}>
              What&apos;s in the pantry
            </h2>
            <p className={s.pantryDek}>The numbers I lean on, worked out from the data on this site and dated.</p>
          </div>
        </div>
        <div className={s.jars}>
          {topCard && (
            <Link className={`${s.jar} ${s.jarLink} tone-cards`} href={`/cards/${topCard.slug}`}>
              <span className={s.jarLabel}>
                Best first-year value <Arrow />
              </span>
              <span className={s.jarBig}>{bestValue}</span>
              <span className={s.jarSub}>
                <b>{topCard.name}</b>, after the annual fee at a normal family&apos;s spend
              </span>
            </Link>
          )}
          <div className={`${s.jar} tone-cards`}>
            <span className={s.jarLabel}>Card data</span>
            <span className={s.jarStamp}>
              <VerifiedStamp date={CARDS_VERIFIED} cadenceDays={14} verb="CHECKED" />
            </span>
            <span className={s.jarSub}>Fees, offers and earn rates across {canadianCards.length} Canadian cards</span>
          </div>
          <Link className={`${s.jar} ${s.jarLink} tone-money`} href="/portfolio">
            <span className={s.jarLabel}>
              My own portfolio <Arrow />
            </span>
            <span className={s.jarMid}>
              {POSITIONS.length} positions
              {best && bestPct && (
                <>
                  {" "}
                  <span className={s.jarGain}>
                    best {best.ticker} {bestPct}
                  </span>
                </>
              )}
            </span>
            <span className={s.jarSub}>
              Percent terms only, losses shown
              {portfolioAsOf && <> · snapshot {portfolioAsOf}</>}
            </span>
          </Link>
          <div className={`${s.jar} tone-travel`}>
            <span className={s.jarLabel}>What a point is worth to us</span>
            <span className={s.jarPoints}>
              <Ticker />
            </span>
          </div>
        </div>
      </section>

      {/* ── Featured guide ────────────────────────────────────────────────── */}
      {featured && (
        <section className="section tone-money" aria-labelledby="feat-h">
          <div className="section-head">
            <h2 id="feat-h">Worth an evening</h2>
            <Link className="more" href="/personal-finance">
              All money guides &rarr;
            </Link>
          </div>
          <article className={s.feature}>
            <div className={s.featMotif} aria-hidden="true">
              <FeaturedMotif />
            </div>
            <div className={s.featBody}>
              <span className="eyebrow">{featured.tag}</span>
              <h3 className={s.featTitle}>
                <Link href={`/personal-finance/${featured.slug}`}>{featured.title}</Link>
              </h3>
              <p className={s.featDek}>{featured.dek}</p>
              <p className={s.featMeta}>
                <span>{featured.read}</span>
                <VerifiedStamp date={`${featured.date}`} cadenceDays={120} />
                <FreshDot date={featured.date} />
              </p>
            </div>
          </article>
        </section>
      )}

      {/* ── Where to start: a shelf of guides per room ────────────────────── */}
      <section className="section" aria-labelledby="start-h">
        <div className={s.startHeadRow}>
          <ShelfArt className={s.startArt} />
          <div>
            <h2 id="start-h" className={s.secTitle}>
              Where to start
            </h2>
            <p className={s.pantryDek}>The guides I&apos;d hand a friend first.</p>
          </div>
        </div>
        <div className={s.startGrid}>
          <div className={`tone-cards ${s.startCol}`}>
            <h3 className={s.startHead}>Cards</h3>
            <ul className={s.startList}>
              <li>
                <Link href="/cards">The card explorer</Link>
                <span>Every Canadian card, ranked and filterable</span>
              </li>
              {START_CARDS.map((a) => (
                <li key={a.slug}>
                  <Link href={`/personal-finance/${a.slug}`}>{a.title}</Link>
                  <span>
                    {a.read} · {a.date}
                  </span>
                </li>
              ))}
            </ul>
            <Link className={s.startMore} href="/cards">
              All cards &rarr;
            </Link>
          </div>

          <div className={`tone-travel ${s.startCol}`}>
            <h3 className={s.startHead}>Travel and points</h3>
            <ul className={s.startList}>
              {START_TRAVEL.map((g) => (
                <li key={g.slug}>
                  <Link href={`/travel/${g.slug}`}>{g.title}</Link>
                  <span>
                    {g.read} · {g.date}
                  </span>
                </li>
              ))}
            </ul>
            <Link className={s.startMore} href="/travel">
              All travel guides &rarr;
            </Link>
          </div>

          <div className={`tone-money ${s.startCol}`}>
            <h3 className={s.startHead}>Money</h3>
            <ul className={s.startList}>
              {START_MONEY.map((a) => (
                <li key={a.slug}>
                  <Link href={`/personal-finance/${a.slug}`}>{a.title}</Link>
                  <span>
                    {a.read} · {a.date}
                  </span>
                </li>
              ))}
            </ul>
            <p className={s.rateLabel}>Rates</p>
            <div className={s.rateChips}>
              {RATES.map((r) => (
                <Link key={r.href} className="chip chip-tone" href={r.href}>
                  {r.label}
                </Link>
              ))}
              <Link className="chip" href="/rates">
                All rates
              </Link>
            </div>
            <Link className={s.startMore} href="/personal-finance">
              All money guides &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
