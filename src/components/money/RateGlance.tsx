import type { ReactNode } from "react";
import s from "./RateGlance.module.css";

/**
 * "At a glance" comparison table for the rate pages. Server component, plain
 * table markup so the figures prerender into the HTML.
 *
 * Every figure passed in must already be printed in that page's own prose.
 * This component only lays them out; it never fetches or computes a rate.
 * The one derived thing it does is mark the highest percentage in a column
 * flagged with markBest, among the verified figures given.
 */

export type GlanceCell =
  | string
  | null
  | {
      text: string;
      /** Smaller second line under the value, e.g. a condition. */
      sub?: string;
      /** Rate could not be verified on the provider page: render as "Check site". */
      check?: boolean;
      /** The printed deadline has passed (computed at build time by the page). */
      ended?: boolean;
    };

export interface GlanceColumn {
  key: string;
  label: string;
  numeric?: boolean;
  /** Highlight the highest percentage in this column. */
  markBest?: boolean;
}

export interface GlanceRow {
  name: string;
  sub?: string;
  cells: Record<string, GlanceCell>;
}

/** True once an ISO date (end of that day, Toronto time) is in the past at build time. */
export function isPastDate(iso: string): boolean {
  const end = new Date(`${iso}T23:59:59-05:00`);
  return !isNaN(end.getTime()) && end.getTime() < Date.now();
}

function pctOf(cell: GlanceCell): number | null {
  if (!cell || typeof cell === "string") {
    const m = typeof cell === "string" ? /^(\d+(?:\.\d+)?)%$/.exec(cell.trim()) : null;
    return m ? Number(m[1]) : null;
  }
  if (cell.check) return null;
  const m = /^(\d+(?:\.\d+)?)%$/.exec(cell.text.trim());
  return m ? Number(m[1]) : null;
}

export function RateGlance({
  id = "glance",
  heading = "At a glance",
  intro,
  caption,
  firstColLabel = "Provider",
  columns,
  rows,
  notes,
  legendBest = false,
}: {
  id?: string;
  heading?: string;
  intro?: ReactNode;
  /** Screen-reader caption and scroll-region label. */
  caption: string;
  firstColLabel?: string;
  columns: GlanceColumn[];
  rows: GlanceRow[];
  notes?: ReactNode[];
  legendBest?: boolean;
}) {
  const best: Record<string, number | null> = {};
  for (const c of columns) {
    if (!c.markBest) continue;
    const vals = rows.map((r) => pctOf(r.cells[c.key] ?? null)).filter((v): v is number => v !== null);
    best[c.key] = vals.length ? Math.max(...vals) : null;
  }

  return (
    <section className={s.glance} aria-labelledby={id}>
      <h2 id={id} className="cd-sec">{heading}</h2>
      {intro ? <p className={s.intro}>{intro}</p> : null}
      <div className={`tablewrap ${s.wrap}`}>
        <div className={`tablescroll ${s.scroll}`} role="region" aria-label={caption} tabIndex={0}>
          <table className={s.table}>
            <caption className="sr-only">{caption}</caption>
            <thead>
              <tr>
                <th scope="col" className={s.nameCol}>{firstColLabel}</th>
                {columns.map((c) => (
                  <th key={c.key} scope="col" className={c.numeric ? "r" : undefined}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <th scope="row" className={s.name}>
                    <span className={s.nameText}>{r.name}</span>
                    {r.sub ? <span className={s.nameSub}>{r.sub}</span> : null}
                  </th>
                  {columns.map((c) => {
                    const cell = r.cells[c.key] ?? null;
                    const cls = [c.numeric ? `r ${s.num}` : s.txt];
                    if (cell === null) {
                      return (
                        <td key={c.key} className={cls.join(" ")}>
                          <span className={s.dash} aria-label="not applicable">&ndash;</span>
                        </td>
                      );
                    }
                    const obj = typeof cell === "string" ? { text: cell } : cell;
                    if ("check" in obj && obj.check) {
                      return (
                        <td key={c.key} className={cls.join(" ")}>
                          <span className={s.check}>{obj.text || "Check site"}</span>
                        </td>
                      );
                    }
                    const v = pctOf(cell);
                    const isBest = c.markBest && v !== null && best[c.key] === v;
                    if (isBest) cls.push(s.best);
                    return (
                      <td key={c.key} className={cls.join(" ")}>
                        <span className={s.val}>
                          {obj.text}
                          {isBest ? <span className="sr-only"> (highest in this column)</span> : null}
                        </span>
                        {"ended" in obj && obj.ended ? <span className={`chip chip-red ${s.ended}`}>Ended</span> : null}
                        {"sub" in obj && obj.sub ? <span className={s.cellSub}>{obj.sub}</span> : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(notes && notes.length) || legendBest ? (
          <div className={s.foot}>
            {legendBest ? (
              <p className={s.legend}>
                <span className={s.swatch} aria-hidden="true" /> Highest rate in its column among the verified figures
              </p>
            ) : null}
            {notes?.map((n, i) => <p key={i}>{n}</p>)}
          </div>
        ) : null}
      </div>
    </section>
  );
}
