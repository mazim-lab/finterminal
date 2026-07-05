/**
 * Generative concept hero: one dollar diverging into two account paths (RRSP / TFSA).
 * Pure SVG, themed entirely through CSS variables (see .gh-* in terminal.css), so it
 * adapts to light and dark and never needs sourcing. Decorative; the parent figure
 * carries the aria-label.
 */
export function AccountDecisionGraphic() {
  const verticals = Array.from({ length: 21 }, (_, i) => i * 50);
  const horizontals = Array.from({ length: 7 }, (_, i) => i * 60);
  return (
    <svg className="ahero-gfx" viewBox="0 0 1000 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {verticals.map((x) => (
        <line key={`v${x}`} className="gh-grid" x1={x} y1={0} x2={x} y2={360} />
      ))}
      {horizontals.map((y) => (
        <line key={`h${y}`} className="gh-grid" x1={0} y1={y} x2={1000} y2={y} />
      ))}

      {/* the two account paths diverging from one dollar */}
      <path className="gh-path" d="M164 180 C 380 180, 520 104, 812 100" />
      <path className="gh-path-b" d="M164 180 C 380 180, 520 256, 812 260" />

      {/* start: your dollar */}
      <circle className="gh-node" cx="150" cy="180" r="13" />
      <text className="gh-glyph" x="150" y="185" textAnchor="middle">$</text>

      {/* coins at the ends */}
      <circle className="gh-coin" cx="812" cy="100" r="30" />
      <circle className="gh-ring" cx="812" cy="100" r="19" />
      <circle className="gh-coin-b" cx="812" cy="260" r="30" />
      <circle className="gh-ring-b" cx="812" cy="260" r="19" />

      <text className="gh-lbl" x="812" y="52" textAnchor="middle">RRSP</text>
      <text className="gh-lbl" x="812" y="322" textAnchor="middle">TFSA</text>
    </svg>
  );
}
