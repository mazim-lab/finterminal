import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { POSITIONS, CLOSED_POSITIONS, LAST_UPDATED, SNAPSHOT_PENDING, ALLTIME_RETURN_PCT, OPEN_BOOK_RETURN_PCT, PORTFOLIO_HISTORY } from "@/data/portfolio";
import { ReturnChart } from "@/components/ReturnChart";
import { VerifiedStamp } from "@/components/VerifiedStamp";
import { ogMeta } from "@/lib/og";
import s from "./portfolio.module.css";

export const metadata: Metadata = {
  title: "Current Portfolio | FinTerminal",
  description: "My real positions and the thesis behind each. Personal positions, not advice.",
  alternates: { canonical: "/portfolio" },
  ...ogMeta("Current Portfolio", "Portfolio", "/portfolio"),
};

// Percentages only, everywhere on this page (standing privacy rule).
const pct = (n: number) => (n < 0 ? "−" : "+") + Math.abs(n).toFixed(1) + "%";
const tone = (n: number) => (n < 0 ? "neg" : "pos");

function longDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function monthLabel(ym: string): string {
  const d = new Date(`${ym}-01T12:00:00Z`);
  return isNaN(d.getTime()) ? ym : d.toLocaleDateString("en-CA", { month: "short", year: "numeric", timeZone: "UTC" });
}

export default function PortfolioPage() {
  const withNums = POSITIONS.filter((p) => typeof p.returnPct === "number");
  const ranked = [...withNums].sort((a, b) => (b.weightPct ?? 0) - (a.weightPct ?? 0));
  const hasWeights = POSITIONS.some((p) => typeof p.weightPct === "number" && p.weightPct > 0);
  const maxWeight = Math.max(1, ...withNums.map((p) => p.weightPct ?? 0));

  // Until the first snapshot, show positions in a stable, readable order.
  const rows = SNAPSHOT_PENDING ? POSITIONS : (ranked.length ? ranked : POSITIONS);

  // Best and worst open holding, in percent terms only, computed from the same
  // rows the table renders, so every tile agrees with the table below it.
  // (TOP_PROFIT / TOP_LOSS in the data file rank names by total profit across
  // closed and open trades, a different measure the table cannot show, so the
  // tiles no longer use them.)
  const best = withNums.reduce<(typeof POSITIONS)[number] | null>(
    (hi, p) => (hi === null || (p.returnPct as number) > (hi.returnPct as number) ? p : hi),
    null,
  );
  const worst = withNums.reduce<(typeof POSITIONS)[number] | null>(
    (lo, p) => (lo === null || (p.returnPct as number) < (lo.returnPct as number) ? p : lo),
    null,
  );
  const upCount = withNums.filter((p) => (p.returnPct as number) >= 0).length;
  const closedWins = CLOSED_POSITIONS.filter((c) => c.returnPct >= 0).length;

  // Freshness, computed at build time like the stamp itself.
  const ageDays = LAST_UPDATED ? (Date.now() - new Date(`${LAST_UPDATED}T12:00:00Z`).getTime()) / 86400000 : null;
  const isOld = ageDays !== null && ageDays > 7;
  const firstMonth = PORTFOLIO_HISTORY[0]?.date;

  return (
    <main className="wrap page tone-neutral">
      <header className={`page-head ${s.head}`}>
        <span className="eyebrow">Portfolio</span>
        <h1>My portfolio, open book</h1>
        <p className="dek">
          My real positions and the thesis behind each, shown in percentages only. <b className={s.strong}>Personal positions, not advice.</b>
        </p>
      </header>

      <div className={`${s.fresh} ${isOld ? s.freshOld : ""}`}>
        <div className={s.freshMain}>
          <span className={s.freshL}>Numbers as of</span>
          <span className={s.freshDate}>{LAST_UPDATED ? longDate(LAST_UPDATED) : "awaiting first snapshot"}</span>
          {LAST_UPDATED ? <VerifiedStamp date={LAST_UPDATED} cadenceDays={7} verb="CHECKED" /> : null}
        </div>
        <p className={s.freshNote}>
          I update this by hand when I refresh my numbers from my brokerage.
          {isOld ? " Markets have moved since that date, so read every figure here as a snapshot from then." : ""}
        </p>
      </div>

      <div className={`stat-grid ${s.stats}`}>
        <div>
          <div className="stat-l">Total return</div>
          <div className={`stat-v ${s.bigV} ${typeof ALLTIME_RETURN_PCT === "number" ? tone(ALLTIME_RETURN_PCT) : ""}`}>
            {typeof ALLTIME_RETURN_PCT === "number" ? pct(ALLTIME_RETURN_PCT) : "–"}
          </div>
          <div className="stat-d">all-time, money-weighted</div>
        </div>
        <div>
          <div className="stat-l">Open book</div>
          <div className={`stat-v ${typeof OPEN_BOOK_RETURN_PCT === "number" ? tone(OPEN_BOOK_RETURN_PCT) : ""}`}>
            {typeof OPEN_BOOK_RETURN_PCT === "number" ? pct(OPEN_BOOK_RETURN_PCT) : "–"}
          </div>
          <div className="stat-d">current positions vs book cost</div>
        </div>
        {best && typeof best.returnPct === "number" ? (
          <div>
            <div className="stat-l">Best open position</div>
            <div className={`stat-v ${tone(best.returnPct)}`}>{pct(best.returnPct)}</div>
            <div className="stat-d">{best.ticker} &middot; {best.name}</div>
          </div>
        ) : null}
        {worst && worst !== best && typeof worst.returnPct === "number" ? (
          <div>
            <div className="stat-l">Worst open position</div>
            <div className={`stat-v ${tone(worst.returnPct)}`}>{pct(worst.returnPct)}</div>
            <div className="stat-d">{worst.ticker} &middot; {worst.name}</div>
          </div>
        ) : null}
        <div>
          <div className="stat-l">Holdings</div>
          <div className="stat-v">{POSITIONS.length}</div>
          <div className="stat-d">{withNums.length ? `${upCount} up, ${withNums.length - upCount} down${withNums.length < POSITIONS.length ? `, ${POSITIONS.length - withNums.length} not priced` : ""}` : "each with a thesis"}</div>
        </div>
      </div>

      {SNAPSHOT_PENDING && (
        <div className="notice amber" style={{ marginTop: 18 }}>
          <div>
            <b>Returns load with the next snapshot.</b> Positions are mostly long-dated options, which public price feeds
            don&apos;t quote, so values come straight from my brokerage. The convictions and theses below are live now.
          </div>
        </div>
      )}

      <section className="section" aria-labelledby="performance">
        <div className="section-head">
          <h2 id="performance">Performance</h2>
          {firstMonth ? <p>Cumulative return since {monthLabel(firstMonth)}</p> : null}
        </div>
        {PORTFOLIO_HISTORY.length >= 2 ? (
          <figure className={s.chartCard}>
            <ReturnChart points={PORTFOLIO_HISTORY} />
            <figcaption className={s.chartFoot}>
              <span>Monthly points, read off my brokerage&apos;s performance charts, so they are approximate</span>
              <span>open book {typeof OPEN_BOOK_RETURN_PCT === "number" ? pct(OPEN_BOOK_RETURN_PCT) : "–"}</span>
            </figcaption>
          </figure>
        ) : (
          <div className="empty"><p>The return chart builds as snapshots come in. It will plot portfolio return % by date here.</p></div>
        )}
      </section>

      <section className="section" aria-labelledby="positions">
        <div className="section-head">
          <h2 id="positions">Current positions</h2>
          <p>{hasWeights ? "Largest weight first" : "In no particular order"}</p>
        </div>

        {(best || worst) && (
          <div className={s.moments}>
            {best && typeof best.returnPct === "number" && (
              <div className="best-moment">
                <span className="wm-l">Best holding right now</span>
                <span className="wm-v pos">{pct(best.returnPct)}</span>
                <span className="wm-d">{best.ticker} &middot; {best.name}</span>
                <span className="wm-t">{best.thesis}</span>
              </div>
            )}
            {worst && worst !== best && typeof worst.returnPct === "number" && (
              <div className="worst-moment">
                <span className="wm-l">Worst holding right now</span>
                <span className="wm-v neg">{pct(worst.returnPct)}</span>
                <span className="wm-d">{worst.ticker} &middot; {worst.name}</span>
                <span className="wm-t">{worst.thesis}</span>
              </div>
            )}
          </div>
        )}

        <div className="tablewrap">
          <div className={`tablescroll ${s.scroll}`}>
            <table className={s.pos}>
              <caption className="sr-only">Current positions with theme, type, return and weight</caption>
              <thead><tr>
                <th scope="col">Position</th>
                <th scope="col">Theme</th>
                <th scope="col">Type</th>
                <th scope="col" className="r">Return</th>
                {hasWeights ? <th scope="col" className="r">Weight</th> : null}
              </tr></thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.ticker}>
                    <td className={s.cName}>
                      <div className={s.tick}><b>{p.ticker}</b> <span>{p.name}</span></div>
                      <div className="p-thesis">{p.thesis}</div>
                    </td>
                    <td className={s.cTheme}>
                      <span className="chips">
                        <span className="chip">{p.theme}</span>
                        {p.tags.map((t) => <span key={t} className={`chip ${s.tagChip}`}>{t}</span>)}
                      </span>
                    </td>
                    <td className={s.cType}>{p.position}</td>
                    <td className={`r ${s.cRet} ${typeof p.returnPct === "number" ? tone(p.returnPct) : ""}`}>
                      {typeof p.returnPct === "number" ? pct(p.returnPct) : "–"}
                    </td>
                    {hasWeights ? (
                      <td className={`r ${s.cWeight}`}>
                        {typeof p.weightPct === "number" ? (
                          <span className={s.weight}>
                            <span className={s.wNum}>{p.weightPct.toFixed(1)}%</span>
                            <span className={s.wBar} aria-hidden="true">
                              <span style={{ "--w": `${(p.weightPct / maxWeight) * 100}%` } as CSSProperties} />
                            </span>
                          </span>
                        ) : <span className={s.muted}>{"–"}</span>}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="foot">
            <span>Combined registered accounts (TFSA + RRSP). Percentages only, no dollar figures.</span>
            <span>Return is unrealized, vs book cost</span>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="closed">
        <div className="section-head">
          <h2 id="closed">Closed positions</h2>
          <p>{CLOSED_POSITIONS.length} notable names, {closedWins} closed up and {CLOSED_POSITIONS.length - closedWins} closed down</p>
        </div>
        <div className="tablewrap">
          <ul className={s.closed}>
            {CLOSED_POSITIONS.map((c) => (
              <li key={c.ticker} className={s.closedRow}>
                <div className={s.closedName}>
                  <b>{c.ticker}</b> <span>{c.name}</span>
                  <span className={s.closedTheme}>{c.theme} &middot; {c.tags.join(", ")}</span>
                </div>
                <span className={`${s.closedRet} ${tone(c.returnPct)}`}>{pct(c.returnPct)}</span>
                <span className={s.closedBar} aria-hidden="true">
                  <span className={c.returnPct < 0 ? s.barNeg : s.barPos}
                    style={{ "--w": `${Math.min(100, Math.abs(c.returnPct) / 3.2)}%` } as CSSProperties} />
                </span>
              </li>
            ))}
          </ul>
          <div className="foot">
            <span>Realized return on cost basis, from the activity log. Combined accounts.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
