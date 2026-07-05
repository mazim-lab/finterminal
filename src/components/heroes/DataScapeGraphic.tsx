/**
 * Front-page generative hero: an abstract "terminal data-scape" (rising ticker
 * lines, glowing nodes, faint flight arcs, a split-flap tile cluster). Pure SVG,
 * themed via CSS vars (.ds-* in terminal.css); the split-flap tiles stay dark by
 * design. Decorative; the hero section carries the label.
 */
export function DataScapeGraphic() {
  const verticals = Array.from({ length: 25 }, (_, i) => i * 50);
  const horizontals = Array.from({ length: 7 }, (_, i) => i * 50 + 20);
  const tiles = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 5; c++) {
      tiles.push({ x: 988 + c * 40, y: 232 + r * 52 });
    }
  }
  return (
    <svg className="home-hero-gfx" viewBox="0 0 1200 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {verticals.map((x) => (
        <line key={`v${x}`} className="ds-grid" x1={x} y1={0} x2={x} y2={340} />
      ))}
      {horizontals.map((y) => (
        <line key={`h${y}`} className="ds-grid" x1={0} y1={y} x2={1200} y2={y} />
      ))}

      {/* faint flight arcs */}
      <path className="ds-arc" d="M-60 360 Q 460 70 1260 30" />
      <path className="ds-arc" d="M-60 300 Q 560 180 1260 110" />

      {/* ticker sparklines, trending up to the right */}
      <polyline className="ds-line c" points="0,196 200,204 400,182 600,192 800,166 1000,176 1200,150" />
      <polyline className="ds-line b" points="0,300 150,291 300,301 450,274 600,284 750,258 900,266 1050,242 1200,252" />
      <polyline className="ds-line" points="0,250 120,236 240,258 360,208 480,224 600,178 720,194 840,148 960,164 1080,118" />

      {/* glowing nodes on the main line */}
      <circle className="ds-node-ring" cx="600" cy="178" r="11" />
      <circle className="ds-node" cx="600" cy="178" r="4.5" />
      <circle className="ds-node-ring" cx="1080" cy="118" r="12" />
      <circle className="ds-node" cx="1080" cy="118" r="5" />

      {/* split-flap tile cluster (dark by design) */}
      {tiles.map((t, i) => (
        <g key={`t${i}`}>
          <rect className="ds-tile" x={t.x} y={t.y} width="30" height="40" rx="4" />
          <line className="ds-tile-line" x1={t.x} y1={t.y + 20} x2={t.x + 30} y2={t.y + 20} />
        </g>
      ))}
    </svg>
  );
}
