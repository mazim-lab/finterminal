import type { HistoryPoint } from "@/data/portfolio";
import s from "./ReturnChart.module.css";

/**
 * Cumulative return chart. Pure SVG, server-rendered, no client JS.
 * x-axis = month, y-axis = portfolio return %. Line in --fin-d, points above
 * zero green, below zero red.
 *
 * Two layouts are drawn from the same points: a wide one for tablets and
 * desktops and a compact one for phones. The compact layout uses its own
 * viewBox close to a phone's real width, so text renders at its true size
 * instead of being scaled down, and it shows only as many month labels as fit
 * without touching. CSS shows exactly one of the two, so assistive tech sees
 * one chart.
 */

interface Layout {
  id: string;
  W: number; H: number; padL: number; padR: number; padT: number; padB: number;
  font: number;        // axis label size in viewBox units
  endFont: number;     // end-value label size
  charW: number;       // approximate glyph width of the mono axis font, as a share of font size
  maxLabels: number;   // upper bound on x labels
  dot: number; lastDot: number;
}

const WIDE: Layout = { id: "w", W: 860, H: 280, padL: 10, padR: 84, padT: 22, padB: 34, font: 12, endFont: 15, charW: 0.62, maxLabels: 10, dot: 3, lastDot: 5 };
const COMPACT: Layout = { id: "c", W: 300, H: 220, padL: 6, padR: 46, padT: 26, padB: 28, font: 11, endFont: 13, charW: 0.62, maxLabels: 4, dot: 2.5, lastDot: 4 };

export function ReturnChart({ points }: { points: HistoryPoint[] }) {
  const last = points[points.length - 1];
  const label = `Cumulative portfolio return by month, from ${shortDate(points[0]?.date ?? "")} to ${shortDate(last?.date ?? "")}, ending at ${fmt(last?.returnPct ?? 0)}`;
  return (
    <>
      <Chart points={points} L={WIDE} className={s.wide} label={label} />
      <Chart points={points} L={COMPACT} className={s.compact} label={label} />
    </>
  );
}

function Chart({ points, L, className, label }: { points: HistoryPoint[]; L: Layout; className: string; label: string }) {
  const { W, H, padL, padR, padT, padB } = L;
  const innerW = W - padL - padR, innerH = H - padT - padB;

  const vals = points.map((p) => p.returnPct);
  const rawMin = Math.min(0, ...vals);
  const rawMax = Math.max(0, ...vals);
  const span = rawMax - rawMin || 1;
  const yMin = rawMin - span * 0.08;
  const yMax = rawMax + span * 0.1;

  const x = (i: number) => padL + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const y = (v: number) => padT + innerH - ((v - yMin) / (yMax - yMin)) * innerH;

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.returnPct).toFixed(1)}`).join(" ");
  const zeroY = y(0);
  const area = `${line} L ${x(points.length - 1).toFixed(1)} ${zeroY.toFixed(1)} L ${x(0).toFixed(1)} ${zeroY.toFixed(1)} Z`;

  // y gridlines at a few round percentages
  const ticks: number[] = [];
  const step = niceStep(yMax - yMin);
  for (let t = Math.ceil(yMin / step) * step; t <= yMax; t += step) ticks.push(Number(t.toFixed(2)));

  const xLabels = pickXLabels(points, L, x);
  const gid = `rc-fill-${L.id}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`${s.chart} ${className}`} role="img" aria-label={label}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--fin-d)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--fin-d)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} className={s.grid} />
          <text x={W - padR + 6} y={y(t) + L.font / 3} className={s.axis} style={{ fontSize: L.font }}>{t > 0 ? "+" : ""}{t}%</text>
        </g>
      ))}

      <line x1={padL} x2={W - padR} y1={zeroY} y2={zeroY} className={s.zero} />

      <path d={area} fill={`url(#${gid})`} />
      <path d={line} className={s.line} />

      {points.map((p, i) => (
        <circle key={i} cx={x(i)} cy={y(p.returnPct)} r={i === points.length - 1 ? L.lastDot : L.dot}
          className={p.returnPct < 0 ? s.dotDown : s.dotUp} />
      ))}

      {points.length ? (
        <text x={x(points.length - 1) - 8} y={Math.max(L.endFont, y(points[points.length - 1].returnPct) - 10)} textAnchor="end"
          className={`${s.endLabel} ${points[points.length - 1].returnPct < 0 ? s.down : s.up}`} style={{ fontSize: L.endFont }}>
          {fmt(points[points.length - 1].returnPct)}
        </text>
      ) : null}

      {xLabels.map(({ i, anchor }) => (
        <text key={`l-${i}`} x={x(i)} y={H - 8} textAnchor={anchor} className={s.axis} style={{ fontSize: L.font }}>
          {shortDate(points[i].date)}
        </text>
      ))}
    </svg>
  );
}

/** Pick month labels that never overlap: evenly spaced candidates, then drop
 *  any whose box would touch its neighbour. The first and last month always
 *  show; the last wins a collision with the one before it. */
function pickXLabels(points: HistoryPoint[], L: Layout, x: (i: number) => number) {
  const n = points.length;
  if (!n) return [];
  const every = Math.max(1, Math.ceil((n - 1) / Math.max(1, L.maxLabels - 1)));
  const cand: number[] = [];
  for (let i = 0; i < n; i += every) cand.push(i);
  if (cand[cand.length - 1] !== n - 1) cand.push(n - 1);

  const width = (i: number) => shortDate(points[i].date).length * L.font * L.charW;
  const anchorFor = (i: number): "start" | "middle" | "end" => (i === 0 ? "start" : i === n - 1 ? "end" : "middle");
  const box = (i: number) => {
    const w = width(i), a = anchorFor(i), cx = x(i);
    return a === "start" ? [cx, cx + w] : a === "end" ? [cx - w, cx] : [cx - w / 2, cx + w / 2];
  };
  const gap = L.font * 0.8;

  const kept: number[] = [];
  for (const i of cand) {
    if (i === n - 1) {
      while (kept.length > 1 && box(kept[kept.length - 1])[1] + gap > box(i)[0]) kept.pop();
      kept.push(i);
    } else if (!kept.length || box(kept[kept.length - 1])[1] + gap <= box(i)[0]) {
      kept.push(i);
    }
  }
  return kept.map((i) => ({ i, anchor: anchorFor(i) }));
}

function fmt(n: number): string {
  return (n < 0 ? "−" : "+") + Math.abs(n).toFixed(1) + "%";
}

function niceStep(range: number): number {
  const rough = range / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(rough || 1)));
  const n = rough / mag;
  const nice = n >= 5 ? 5 : n >= 2 ? 2 : 1;
  return nice * mag;
}

function shortDate(d: string): string {
  const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const parts = d.split("-");
  const mi = Number(parts[1]) - 1;
  return mi >= 0 && mi < 12 ? `${m[mi]} ${parts[0].slice(2)}` : d;
}
