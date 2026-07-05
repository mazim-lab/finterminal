/**
 * Animated front-page hero: a line-art jet climbing while shedding coins from its
 * tail instead of exhaust. Pure SVG + CSS (see .tk-* + keyframes in terminal.css),
 * themed via CSS vars, loops smoothly, and falls back to a static frame under
 * prefers-reduced-motion. Decorative; the hero section carries the label.
 */
const V = Array.from({ length: 25 }, (_, i) => i * 50);
const H = Array.from({ length: 7 }, (_, i) => i * 50 + 20);
const COINS = Array.from({ length: 8 }, (_, i) => i);

export function TakeoffGraphic() {
  return (
    <svg className="home-hero-gfx tk" viewBox="0 0 1200 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {V.map((x) => (
        <line key={`v${x}`} className="ds-grid" x1={x} y1={0} x2={x} y2={340} />
      ))}
      {H.map((y) => (
        <line key={`h${y}`} className="ds-grid" x1={0} y1={y} x2={1200} y2={y} />
      ))}

      {/* runway + faint climb guide */}
      <line className="tk-runway" x1={20} y1={300} x2={540} y2={252} />
      <path className="tk-guide" d="M40 300 C 320 250, 660 165, 1160 66" />

      {/* coins streaming from the tail (animated along an arc, staggered) */}
      {COINS.map((i) => (
        <g key={i} className={`tk-coin tk-coin-${i}`}>
          <circle className="tk-coin-c" r={9} />
          <circle className="tk-coin-r" r={4} />
        </g>
      ))}

      {/* the jet, climbing (outer group = static position/angle, inner = idle bob) */}
      <g transform="translate(872 128) rotate(-15)">
        <g className="tk-plane">
          <path className="tk-body" d="M-78 0 Q -66 -11 42 -9 L 82 0 L 42 9 Q -66 11 -78 0 Z" />
          <path className="tk-wing" d="M-14 5 L -48 40 L 8 9 Z" />
          <path className="tk-wing" d="M-6 -5 L -30 -30 L 10 -8 Z" />
          <path className="tk-fin" d="M-64 -2 L -86 -30 L -52 -7 Z" />
          <circle className="tk-port" cx={44} cy={0} r={3} />
        </g>
      </g>
    </svg>
  );
}
