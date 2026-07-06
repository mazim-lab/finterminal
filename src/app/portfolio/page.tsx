import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { POSITIONS, CLOSED_POSITIONS, LAST_UPDATED, SNAPSHOT_PENDING, ALLTIME_RETURN_PCT, OPEN_BOOK_RETURN_PCT, PORTFOLIO_HISTORY, TOP_PROFIT, TOP_LOSS } from "@/data/portfolio";
import { ReturnChart } from "@/components/ReturnChart";
import { VerifiedStamp } from "@/components/VerifiedStamp";
import { ogMeta } from "@/lib/og";

export const metadata: Metadata = {
  title: "Current Portfolio | FinTerminal",
  description: "My real positions and the thesis behind each. Personal positions, not advice.",
  ...ogMeta("Current Portfolio", "Portfolio"),
};

const pct = (n: number) => (n < 0 ? "−" : "+") + Math.abs(n).toFixed(1) + "%";

export default function PortfolioPage() {
  const withNums = POSITIONS.filter((p) => typeof p.returnPct === "number");
  const ranked = [...withNums].sort((a, b) => (b.weightPct ?? 0) - (a.weightPct ?? 0));
  const maxWeight = Math.max(1, ...withNums.map((p) => p.weightPct ?? 0));

  // Until the first snapshot, show positions in a stable, readable order.
  const rows = SNAPSHOT_PENDING ? POSITIONS : (ranked.length ? ranked : POSITIONS);

  // Worst open holding, in percent terms only (standing privacy rule), so the
  // page carries the same losses-shown honesty as the homepage proof strip.
  const worst = withNums.reduce<(typeof POSITIONS)[number] | null>(
    (lo, p) => (lo === null || (p.returnPct as number) < (lo.returnPct as number) ? p : lo),
    null,
  );

  return (
    <div className="app norail">
      <main>
        <div className="head"><h1>Current Portfolio</h1><span className="meta">
          {LAST_UPDATED ? <VerifiedStamp date={LAST_UPDATED} cadenceDays={7} verb="CHECKED" /> : "awaiting first snapshot"} · refreshed twice weekly
        </span></div>
        <div className="subhead">My real positions and the thesis behind each. <b>Personal positions, not advice.</b></div>

        <div className="stats">
          <div className="stat">
            <div className="l">Highest profit</div>
            <div className="v em">{pct(TOP_PROFIT.returnPct)}</div>
            <div className="d">{TOP_PROFIT.ticker} · {TOP_PROFIT.label}</div>
          </div>
          <div className="stat">
            <div className="l">Highest loss</div>
            <div className="v rd">{pct(TOP_LOSS.returnPct)}</div>
            <div className="d">{TOP_LOSS.ticker} · {TOP_LOSS.label}</div>
          </div>
          <div className="stat">
            <div className="l">Total return</div>
            <div className="v gd">{typeof ALLTIME_RETURN_PCT === "number" ? pct(ALLTIME_RETURN_PCT) : "—"}</div>
            <div className="d">all-time, money-weighted</div>
          </div>
          <div className="stat">
            <div className="l">Holdings</div>
            <div className="v">{POSITIONS.length}</div>
            <div className="d">each with a thesis</div>
          </div>
        </div>

        {SNAPSHOT_PENDING && (
          <div className="cd-note" style={{ marginBottom: 18 }}>
            <div className="cap">Returns load with the next snapshot</div>
            Positions are mostly long-dated options, which public price feeds don&apos;t quote, so values come
            straight from my brokerage twice a week. The convictions and theses below are live now.
          </div>
        )}

        <div className="cd-sec">Performance</div>
        {PORTFOLIO_HISTORY.length >= 2 ? (
          <div className="tablewrap" style={{ padding: "16px 20px 8px", marginBottom: 6, maxWidth: 1100 }}>
            <ReturnChart points={PORTFOLIO_HISTORY} />
            <div className="foot" style={{ borderTop: "none", paddingTop: 4 }}>
              <span>cumulative return since Dec 2024</span>
              <span>open book {typeof OPEN_BOOK_RETURN_PCT === "number" ? pct(OPEN_BOOK_RETURN_PCT) : "—"}</span>
            </div>
          </div>
        ) : (
          <div className="cd-empty">The return chart builds as snapshots come in. It will plot portfolio return % by date here.</div>
        )}

        <details className="coll" open>
          <summary className="cd-sec">Current Positions</summary>
          {worst && typeof worst.returnPct === "number" && (
            <div className="worst-moment">
              <span className="wm-l">Worst holding right now</span>
              <span className="wm-v negv">{pct(worst.returnPct)}</span>
              <span className="wm-d">{worst.ticker} · {worst.name}</span>
              <span className="wm-t">{worst.thesis}</span>
            </div>
          )}
          <div className="tablewrap">
            <div className="tablescroll">
              <table>
                <thead><tr>
                  <th>Position</th><th>Theme</th><th>Type</th>
                  <th className="r">Return</th><th className="r">Weight</th>
                </tr></thead>
                <tbody>
                  {rows.map((p) => (
                    <tr key={p.ticker}>
                      <td>
                        <div className="cn">{p.ticker} · {p.name}</div>
                        <div className="p-thesis">{p.thesis}</div>
                      </td>
                      <td>
                        <span className="tag em">{p.theme}</span>
                        {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                      </td>
                      <td className="mono" style={{ color: "var(--ink-soft)", fontSize: 12, whiteSpace: "nowrap" }}>{p.position}</td>
                      <td className={`r mono ${typeof p.returnPct === "number" ? (p.returnPct < 0 ? "negv" : "pos") : ""}`}>
                        {typeof p.returnPct === "number" ? pct(p.returnPct) : "—"}
                      </td>
                      <td className="r">
                        {typeof p.weightPct === "number"
                          ? <span className="vbar" style={{ "--w": `${((p.weightPct ?? 0) / maxWeight) * 100}%` } as CSSProperties} />
                          : <span className="mono" style={{ color: "var(--ink-dim)" }}>—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="foot">
              <span>combined registered accounts · percentages only, no dollar figures shown</span>
              <span>thesis articles coming soon</span>
            </div>
          </div>
        </details>

        <details className="coll" style={{ marginTop: 8 }}>
          <summary className="cd-sec">Closed Positions</summary>
          <div className="tablewrap">
            <div className="tablescroll">
              <table>
                <thead><tr>
                  <th>Position</th><th>Theme</th><th className="r">Realized return</th>
                </tr></thead>
                <tbody>
                  {CLOSED_POSITIONS.map((c) => (
                    <tr key={c.ticker}>
                      <td><div className="cn">{c.ticker} · {c.name}</div></td>
                      <td>
                        <span className="tag em">{c.theme}</span>
                        {c.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                      </td>
                      <td className={`r mono big ${c.returnPct < 0 ? "negv" : "pos"}`}>{pct(c.returnPct)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="foot">
              <span>realized return on cost basis · notable closed names · combined accounts</span>
            </div>
          </div>
        </details>
      </main>
    </div>
  );
}
