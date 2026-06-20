import type { HistoryPoint } from "@/data/portfolio";

/**
 * Terminal-style return chart. Pure SVG, server-rendered, no client JS.
 * x-axis = date (month), y-axis = portfolio return %. Renders nothing useful
 * below 2 points (the page shows a placeholder instead).
 */
export function ReturnChart({ points }: { points: HistoryPoint[] }) {
  const W = 860, H = 260, padL = 44, padR = 16, padT = 18, padB = 28;
  const innerW = W - padL - padR, innerH = H - padT - padB;

  const vals = points.map((p) => p.returnPct);
  const rawMin = Math.min(0, ...vals);
  const rawMax = Math.max(0, ...vals);
  const span = rawMax - rawMin || 1;
  const yMin = rawMin - span * 0.12;
  const yMax = rawMax + span * 0.12;

  const x = (i: number) => padL + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const y = (v: number) => padT + innerH - ((v - yMin) / (yMax - yMin)) * innerH;

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.returnPct).toFixed(1)}`).join(" ");
  const area = `${line} L ${x(points.length - 1).toFixed(1)} ${y(yMin).toFixed(1)} L ${x(0).toFixed(1)} ${y(yMin).toFixed(1)} Z`;

  // y gridlines at a few round percentages
  const ticks: number[] = [];
  const step = niceStep(yMax - yMin);
  for (let t = Math.ceil(yMin / step) * step; t <= yMax; t += step) ticks.push(Number(t.toFixed(2)));

  const zeroY = y(0);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Portfolio return over time">
      <defs>
        <linearGradient id="rc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--emerald)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--emerald)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeWidth="1" />
          <text x={padL - 8} y={y(t) + 3} textAnchor="end" fontFamily="var(--mono)" fontSize="10" fill="var(--ink-dim)">{t > 0 ? "+" : ""}{t}%</text>
        </g>
      ))}

      <line x1={padL} x2={W - padR} y1={zeroY} y2={zeroY} stroke="var(--line-strong)" strokeWidth="1" />

      <path d={area} fill="url(#rc-fill)" />
      <path d={line} fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 5px rgba(70,179,108,.4))" }} />

      {points.map((p, i) => (
        <circle key={i} cx={x(i)} cy={y(p.returnPct)} r="2.6" fill="var(--paper)" stroke="var(--emerald)" strokeWidth="1.5" />
      ))}

      {points.map((p, i) =>
        (points.length <= 14 || i % Math.ceil(points.length / 12) === 0 || i === points.length - 1) ? (
          <text key={`l-${i}`} x={x(i)} y={H - 9} textAnchor="middle" fontFamily="var(--mono)" fontSize="10" fill="var(--ink-dim)">{shortDate(p.date)}</text>
        ) : null
      )}
    </svg>
  );
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
