import type { HistoryPoint } from "@/data/portfolio";
import s from "./ReturnChart.module.css";

/**
 * Cumulative return chart. Pure SVG, server-rendered, no client JS.
 * x-axis = month, y-axis = portfolio return %. Line in --fin-d, points above
 * zero green, below zero red. Axis labels get larger type on phones so they stay
 * readable when the SVG scales down to phone width.
 */
export function ReturnChart({ points }: { points: HistoryPoint[] }) {
  const W = 860, H = 280, padL = 10, padR = 84, padT = 22, padB = 34;
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

  const last = points[points.length - 1];
  const every = points.length <= 14 ? 1 : Math.ceil(points.length / 12);
  const shown = points.map((_, i) => i % every === 0 || i === points.length - 1);
  let k = 0;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={s.chart} role="img"
      aria-label={`Cumulative portfolio return by month, from ${shortDate(points[0]?.date ?? "")} to ${shortDate(last?.date ?? "")}, ending at ${fmt(last?.returnPct ?? 0)}`}>
      <defs>
        <linearGradient id="rc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--fin-d)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--fin-d)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} className={s.grid} />
          <text x={W - padR + 8} y={y(t) + 4} className={s.yl}>{t > 0 ? "+" : ""}{t}%</text>
        </g>
      ))}

      <line x1={padL} x2={W - padR} y1={zeroY} y2={zeroY} className={s.zero} />

      <path d={area} fill="url(#rc-fill)" />
      <path d={line} className={s.line} />

      {points.map((p, i) => (
        <circle key={i} cx={x(i)} cy={y(p.returnPct)} r={i === points.length - 1 ? 5 : 3}
          className={p.returnPct < 0 ? s.dotDown : s.dotUp} />
      ))}

      {last ? (
        <text x={x(points.length - 1) - 10} y={y(last.returnPct) - 12} textAnchor="end" className={`${s.endLabel} ${last.returnPct < 0 ? s.down : s.up}`}>
          {fmt(last.returnPct)}
        </text>
      ) : null}

      {points.map((p, i) => {
        if (!shown[i]) return null;
        const alt = k++ % 2 === 1 && i !== points.length - 1;
        return (
          <text key={`l-${i}`} x={x(i)} y={H - 10} textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
            className={`${s.xl} ${alt ? s.xlAlt : ""}`}>{shortDate(p.date)}</text>
        );
      })}
    </svg>
  );
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
