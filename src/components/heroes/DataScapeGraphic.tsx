/**
 * Front-page generative hero: an abstract "terminal data-scape" recomposed short
 * (1200x240, spec 3.5) so the hero runs at roughly half its old height. A gold
 * flight arc, an emerald portfolio sparkline, faint earn-rate bars, and the
 * split-flap tile cluster. The cluster lives in the RIGHT portion of the
 * composition so it never collides with the copy column on wide viewports; the
 * hero anchors the crop right on mobile (see .home-hero-gfx) so the cluster
 * stays in frame there too. Pure SVG, themed via CSS vars (.ds-* in
 * terminal.css); the split-flap tiles stay dark by design. All strokes are
 * non-scaling so the slice crop never fattens a line. Decorative; the hero
 * section carries the label.
 */
export function DataScapeGraphic() {
  const verticals = [200, 400, 600, 800, 1000];
  const horizontals = [60, 120, 180];
  return (
    <svg
      className="home-hero-gfx"
      viewBox="0 0 1200 240"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
    >
      {/* faint board grid */}
      {verticals.map((x) => (
        <line key={`v${x}`} className="ds-grid" x1={x} y1={0} x2={x} y2={240} vectorEffect="non-scaling-stroke" />
      ))}
      {horizontals.map((y) => (
        <line key={`h${y}`} className="ds-grid" x1={0} y1={y} x2={1200} y2={y} vectorEffect="non-scaling-stroke" />
      ))}

      {/* flight arc, gold, dashed (attention) with a small heading marker */}
      <path className="ds-arc" d="M60,206 Q600,16 1150,146" vectorEffect="non-scaling-stroke" />
      <path className="ds-arc-tip" d="M742,90 l20,-3 -14,14 z" />

      {/* portfolio sparkline, emerald (gain), trending up to the right */}
      <polyline
        className="ds-line"
        points="620,190 680,182 730,192 790,170 850,178 910,156 970,163 1040,140 1110,148 1180,124"
        vectorEffect="non-scaling-stroke"
      />
      <circle className="ds-node" cx="1180" cy="124" r="3.5" />

      {/* earn-rate bars */}
      <g className="ds-bars">
        <rect x="654" y="214" width="9" height="16" />
        <rect x="672" y="204" width="9" height="26" />
        <rect x="690" y="210" width="9" height="20" />
        <rect x="708" y="196" width="9" height="34" />
        <rect x="726" y="202" width="9" height="28" />
        <rect x="744" y="188" width="9" height="42" />
        <rect x="762" y="196" width="9" height="34" />
        <rect x="780" y="182" width="9" height="48" />
      </g>

      {/* gate markers */}
      <g className="ds-gate">
        <text x="760" y="60">YYZ 22:04 GATE D8</text>
        <text x="946" y="228">MCO 01:12 ON TIME</text>
      </g>

      {/* the split-flap cluster in the right portion: Y Y Z 2 2 0 4 (dark by design) */}
      <g transform="translate(885,132)">
        <g transform="translate(-138,-22)">
          <g>
            {[0, 34, 68, 110, 144, 178, 212, 246].map((x) => (
              <rect key={x} className="ds-tile" x={x} y={0} width="30" height="44" rx="3" />
            ))}
            <line className="ds-tile-line" x1={0} y1={22} x2={276} y2={22} />
          </g>
          <g className="ds-tile-glyph" textAnchor="middle">
            <text x="15" y="30">Y</text>
            <text x="49" y="30">Y</text>
            <text x="83" y="30">Z</text>
            <text x="125" y="30" className="g-amber">2</text>
            <text x="159" y="30" className="g-amber">2</text>
            <text x="193" y="30" className="g-amber">0</text>
            <text x="227" y="30" className="g-amber">4</text>
            <text x="261" y="30" className="g-em">&#9650;</text>
          </g>
        </g>
      </g>
    </svg>
  );
}
