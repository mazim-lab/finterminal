import type { ReactNode } from "react";
import { AccountDecisionGraphic } from "./AccountDecisionGraphic";

/**
 * Reusable hero-motif library for concept/PF article heroes. Each motif is an
 * abstract, on-palette SVG themed entirely through CSS vars (.gh-* in terminal.css),
 * so it works in light and dark and needs no sourcing. Assign one per article by
 * topic (see MOTIFS map below); reuse before inventing new ones.
 *
 * Usage:
 *   <ArticleHero variant="graphic" alt="..."><GrowthMotif /></ArticleHero>
 */

const V = Array.from({ length: 21 }, (_, i) => i * 50);
const H = Array.from({ length: 7 }, (_, i) => i * 50 + 30);

function Grid() {
  return (
    <>
      {V.map((x) => (
        <line key={`v${x}`} className="gh-grid" x1={x} y1={0} x2={x} y2={360} />
      ))}
      {H.map((y) => (
        <line key={`h${y}`} className="gh-grid" x1={0} y1={y} x2={1000} y2={y} />
      ))}
    </>
  );
}

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg className="ahero-gfx" viewBox="0 0 1000 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Grid />
      {children}
    </svg>
  );
}

/** Growth / compounding: rising bars under a trend line. (savings, GICs, RESP, investing) */
export function GrowthMotif() {
  const heights = [60, 95, 122, 165, 205, 250, 300];
  const base = 322;
  const bars = heights.map((h, i) => ({ x: 150 + i * 108, h }));
  const pts = bars.map((b) => `${b.x + 32},${base - b.h}`).join(" ");
  const last = bars[bars.length - 1];
  return (
    <Svg>
      {bars.map((b, i) => (
        <rect
          key={i}
          className={i === bars.length - 1 ? "gh-bar" : "gh-bar-b"}
          x={b.x}
          y={base - b.h}
          width={64}
          height={b.h}
          rx={5}
        />
      ))}
      <polyline className="gh-path" points={pts} />
      <circle className="gh-node" cx={last.x + 32} cy={base - last.h} r={9} />
    </Svg>
  );
}

/** Value / cash back: rising stacks of coins. (cash-back, points value, "worth it") */
export function ValueCoinsMotif() {
  const stacks = [
    { x: 250, n: 2 },
    { x: 500, n: 4 },
    { x: 760, n: 6 },
  ];
  return (
    <Svg>
      {stacks.map((s, si) => (
        <g key={si}>
          {Array.from({ length: s.n }, (_, i) => (
            <ellipse key={i} className="gh-fill" cx={s.x} cy={300 - i * 26} rx={58} ry={15} />
          ))}
        </g>
      ))}
    </Svg>
  );
}

/** Credit score: a semicircular gauge with a needle. (build credit, credit report, score) */
export function CreditGaugeMotif() {
  return (
    <Svg>
      <path className="gh-track" d="M300 300 A200 200 0 0 1 700 300" />
      <path className="gh-track-v" d="M300 300 A200 200 0 0 1 617.6 138.2" />
      <line className="gh-needle" x1={500} y1={300} x2={592} y2={176} />
      <circle className="gh-node" cx={500} cy={300} r={13} />
      <text className="gh-lbl" x={296} y={334} textAnchor="middle" style={{ fontSize: 14 }}>300</text>
      <text className="gh-lbl" x={704} y={334} textAnchor="middle" style={{ fontSize: 14 }}>900</text>
    </Svg>
  );
}

/** Protection: a layered shield with a check. (travel insurance, purchase protection, fraud) */
export function ShieldMotif() {
  return (
    <Svg>
      <path className="gh-shield-b" d="M400 82 L600 82 L600 190 Q600 268 500 312 Q400 268 400 190 Z" />
      <path className="gh-shield" d="M424 104 L576 104 L576 186 Q576 250 500 288 Q424 250 424 186 Z" />
      <polyline className="gh-check" points="466,182 494,212 548,150" />
      <circle className="gh-node" cx={330} cy={140} r={6} />
      <circle className="gh-node" cx={670} cy={150} r={6} />
      <circle className="gh-node" cx={360} cy={252} r={5} />
    </Svg>
  );
}

/** Transfer: source points flowing through a hub to destinations. (points transfer, MR/Avion) */
export function TransferFlowMotif() {
  return (
    <Svg>
      <path className="gh-path" d="M210 120 C 330 140, 380 170, 470 178" />
      <path className="gh-path" d="M210 240 C 330 220, 380 190, 470 182" />
      <path className="gh-path" d="M530 178 C 640 168, 700 130, 790 122" />
      <path className="gh-dash" d="M530 182 C 640 195, 700 232, 790 240" />
      <circle className="gh-node" cx={180} cy={120} r={11} />
      <circle className="gh-node" cx={180} cy={240} r={11} />
      <circle className="gh-coin" cx={500} cy={180} r={27} />
      <circle className="gh-ring" cx={500} cy={180} r={16} />
      <circle className="gh-node" cx={820} cy={120} r={11} />
      <circle className="gh-node" cx={820} cy={240} r={11} />
    </Svg>
  );
}

/** Comparison / roundup: a data grid with a highlighted top row. (best-of lists, compare) */
export function DataGridMotif() {
  const cols = 9;
  const rows = 4;
  const cells: { r: number; c: number }[] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push({ r, c });
  return (
    <Svg>
      {cells.map(({ r, c }, i) => {
        const on = r === 0 || (c + r) % 4 === 0;
        return (
          <rect
            key={i}
            className={on ? "gh-cell-on" : "gh-cell"}
            x={118 + c * 84}
            y={104 + r * 52}
            width={64}
            height={36}
            rx={5}
          />
        );
      })}
    </Svg>
  );
}

/** Travel routes: flight arcs over a faint map. (award booking, alliances, lounges, sweet spots) */
export function RouteArcsMotif() {
  return (
    <Svg>
      <path className="gh-map" d="M40 300 C 250 280, 450 300, 700 285 S 980 300, 1160 288" />
      <path className="gh-map" d="M40 250 C 300 235, 520 255, 760 240 S 1000 250, 1160 244" />
      <path className="gh-arc" d="M180 280 Q 400 88 640 250" />
      <path className="gh-arc" d="M420 250 Q 700 58 940 240" />
      <circle className="gh-node" cx={180} cy={280} r={9} />
      <circle className="gh-node" cx={640} cy={250} r={9} />
      <circle className="gh-node" cx={420} cy={250} r={8} />
      <circle className="gh-node" cx={940} cy={240} r={9} />
    </Svg>
  );
}

/** Fees / interest: a value bar with a fee segment and a bold percent. (fx fees, interest, fees) */
export function FeePercentMotif() {
  return (
    <Svg>
      <rect className="gh-fill" x={140} y={158} width={560} height={46} rx={23} />
      <rect className="gh-bar" x={628} y={158} width={72} height={46} rx={10} />
      <text className="gh-glyph" x={848} y={214} textAnchor="middle" style={{ fontSize: 150 }}>%</text>
    </Svg>
  );
}

/**
 * Topic -> motif assignment guide (extend as needed; reuse before inventing):
 *   decision    -> RRSP vs TFSA, FHSA vs HBP, points vs cash back, "which X"
 *   growth      -> savings rates, GIC rates, RESP/CESG, where to hold cash, investing
 *   value       -> best cash-back, points valuation, Costco, "is X worth it"
 *   creditGauge -> build credit, check credit report, credit-card interest, credit score
 *   shield      -> travel insurance, purchase protection, fraud/security
 *   transfer    -> points-transfer partners, MR->Aeroplan, Avion->AAdvantage
 *   dataGrid    -> best travel/cash-back roundups, compare, card explorer guides
 *   routes      -> award booking, airline alliances, lounges, sweet-spot hubs (non-photo travel)
 *   fee         -> foreign transaction fee, interest explainers, pay-bills fees
 */
export const MOTIFS = {
  decision: AccountDecisionGraphic,
  growth: GrowthMotif,
  value: ValueCoinsMotif,
  creditGauge: CreditGaugeMotif,
  shield: ShieldMotif,
  transfer: TransferFlowMotif,
  dataGrid: DataGridMotif,
  routes: RouteArcsMotif,
  fee: FeePercentMotif,
} as const;

export type MotifKey = keyof typeof MOTIFS;
