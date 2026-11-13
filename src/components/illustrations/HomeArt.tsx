import type { ReactNode } from "react";

/**
 * FinTerminal illustration language: small line drawings of home and plenty.
 * Rules: 2.5 unit round strokes in the text colour (.il-line), soft flat fills
 * from the three pale pillar backgrounds (.il-a indigo, .il-b cyan, .il-c
 * fuchsia, .il-n neutral) plus fresh green leaves (.il-g), no gradients, no
 * faces. Every colour is a site token, so each drawing follows light and dark.
 * All drawings are decorative (aria-hidden); the text around them carries meaning.
 */

export type ArtName = "pantry" | "basket" | "kettle" | "window" | "garden" | "table" | "door" | "shelf";

function Svg({ vb, className, children }: { vb: string; className?: string; children: ReactNode }) {
  return (
    <svg className={`il ${className ?? ""}`} viewBox={vb} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

function Leaf({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <path
      className="il-g"
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
      d="M0 0C2-8 8-12 16-12 15-4 9 0 0 0Z"
    />
  );
}

/** Pantry shelf: jars put up for later, savings as a full shelf. */
export function PantryArt({ className }: { className?: string }) {
  return (
    <Svg vb="0 0 160 120" className={className}>
      <rect className="il-ad" x="25" y="40" width="22" height="7" rx="2.5" />
      <rect className="il-a" x="21" y="47" width="30" height="37" rx="8" />
      <rect className="il-line" x="21" y="47" width="30" height="37" rx="8" />
      <rect className="il-n" x="27" y="58" width="18" height="12" rx="3" />
      <rect className="il-bd" x="61" y="24" width="26" height="7" rx="2.5" />
      <rect className="il-b" x="57" y="31" width="34" height="53" rx="9" />
      <rect className="il-line" x="57" y="31" width="34" height="53" rx="9" />
      <circle className="il-bd" cx="66" cy="70" r="4" /><circle className="il-bd" cx="76" cy="74" r="4" />
      <circle className="il-bd" cx="83" cy="66" r="4" /><circle className="il-bd" cx="71" cy="61" r="4" />
      <rect className="il-cd" x="100" y="50" width="22" height="6" rx="2.5" />
      <rect className="il-c" x="97" y="56" width="28" height="28" rx="8" />
      <rect className="il-line" x="97" y="56" width="28" height="28" rx="8" />
      <path className="il-n" d="M132 70h14l-2 14h-10Z" />
      <path className="il-line" d="M132 70h14l-2 14h-10Z" />
      <Leaf x={139} y={70} s={0.9} />
      <Leaf x={139} y={70} s={0.7} flip />
      <path className="il-line" d="M10 84h140M22 84v8M138 84v8" />
    </Svg>
  );
}

/** Basket of good things: rewards gathered over time. */
export function BasketArt({ className }: { className?: string }) {
  return (
    <Svg vb="0 0 160 120" className={className}>
      <path className="il-line" d="M44 62Q80 8 116 62" />
      <circle className="il-c" cx="62" cy="56" r="11" />
      <circle className="il-a" cx="98" cy="55" r="12" />
      <ellipse className="il-b" cx="80" cy="52" rx="13" ry="9" />
      <Leaf x={64} y={46} s={0.8} />
      <Leaf x={96} y={44} s={0.7} flip />
      <path className="il-n" d="M30 62h100l-10 42q-2 4-7 4H47q-5 0-7-4Z" />
      <path className="il-line" d="M30 62h100l-10 42q-2 4-7 4H47q-5 0-7-4Z" />
      <path className="il-thin" d="M34 76h92M38 90h84M60 62l4 46M100 62l-4 46M80 62v46" />
    </Svg>
  );
}

/** Kettle and cup: sitting down to sort it out over tea. */
export function KettleArt({ className }: { className?: string }) {
  return (
    <Svg vb="0 0 160 120" className={className}>
      <path className="il-thin" d="M64 34q-4-6 0-12t0-12M76 34q-4-6 0-12t0-12" />
      <path className="il-line" d="M92 60q20 0 12 24" />
      <path className="il-a" d="M44 98q-8 0-6-10l8-30q2-8 10-8h28q8 0 10 8l8 30q2 10-6 10Z" />
      <path className="il-line" d="M44 98q-8 0-6-10l8-30q2-8 10-8h28q8 0 10 8l8 30q2 10-6 10Z" />
      <path className="il-line" d="M42 70 28 58" />
      <path className="il-line" d="M54 50q16-10 32 0" />
      <circle className="il-ad" cx="70" cy="42" r="4" />
      <path className="il-c" d="M112 80h26v12q0 6-6 6h-14q-6 0-6-6Z" />
      <path className="il-line" d="M112 80h26v12q0 6-6 6h-14q-6 0-6-6ZM138 84q8 0 6 6t-7 4" />
      <path className="il-line" d="M16 104h128" />
    </Svg>
  );
}

/** Windowsill with a plant: unhurried, light coming in, something growing. */
export function WindowArt({ className }: { className?: string }) {
  return (
    <Svg vb="0 0 160 120" className={className}>
      <rect className="il-b" x="32" y="12" width="96" height="76" rx="12" />
      <circle className="il-bd" cx="104" cy="34" r="9" />
      <rect className="il-line" x="32" y="12" width="96" height="76" rx="12" />
      <path className="il-line" d="M80 12v76M32 50h96" />
      <Leaf x={76} y={72} s={1.3} flip />
      <Leaf x={78} y={66} s={1.2} />
      <Leaf x={76} y={60} s={0.9} flip />
      <path className="il-line" d="M77 74V56" />
      <path className="il-c" d="M64 72h28l-3 18H67Z" />
      <path className="il-line" d="M64 72h28l-3 18H67Z" />
      <rect className="il-n" x="22" y="88" width="116" height="9" rx="4.5" />
      <rect className="il-line" x="22" y="88" width="116" height="9" rx="4.5" />
    </Svg>
  );
}

/** Garden bed: steady growth you tend, not a chart you watch. */
export function GardenArt({ className }: { className?: string }) {
  return (
    <Svg vb="0 0 160 120" className={className}>
      <path className="il-line" d="M44 86V72M80 86V58M116 86V40" />
      <Leaf x={44} y={76} s={0.7} /><Leaf x={44} y={78} s={0.6} flip />
      <Leaf x={80} y={66} s={0.9} /><Leaf x={80} y={70} s={0.85} flip />
      <Leaf x={116} y={52} s={1.1} /><Leaf x={116} y={58} s={1.05} flip />
      <circle className="il-c" cx="116" cy="36" r="7" />
      <circle className="il-cd" cx="116" cy="36" r="3" />
      <path className="il-n" d="M14 96q66-22 132 0Z" />
      <path className="il-line" d="M14 96q66-22 132 0" />
      <rect className="il-a" x="10" y="96" width="140" height="14" rx="5" />
      <rect className="il-line" x="10" y="96" width="140" height="14" rx="5" />
    </Svg>
  );
}

/** A table set with more than enough: the home page welcome scene. */
export function TableArt({ className }: { className?: string }) {
  return (
    <Svg vb="0 0 240 150" className={className}>
      {/* window behind */}
      <rect className="il-b" x="70" y="6" width="100" height="62" rx="12" />
      <rect className="il-line" x="70" y="6" width="100" height="62" rx="12" />
      <path className="il-line" d="M120 6v62M70 37h100" />
      {/* teapot */}
      <path className="il-thin" d="M50 56q-4-6 0-12" />
      <path className="il-a" d="M30 104q-8 0-8-10v-8q0-18 24-18t24 18v8q0 10-8 10Z" />
      <path className="il-line" d="M30 104q-8 0-8-10v-8q0-18 24-18t24 18v8q0 10-8 10ZM70 82q12 0 8 14M22 84 10 76" />
      <circle className="il-ad" cx="46" cy="64" r="4" />
      {/* bowl heaped full */}
      <circle className="il-c" cx="108" cy="80" r="10" />
      <circle className="il-a" cx="126" cy="78" r="11" />
      <ellipse className="il-b" cx="117" cy="72" rx="10" ry="7" />
      <Leaf x={118} y={68} s={0.8} />
      <path className="il-n" d="M92 84h52q-2 20-26 20t-26-20Z" />
      <path className="il-line" d="M92 84h52q-2 20-26 20t-26-20Z" />
      {/* cup and a little stack of cards */}
      <path className="il-c" d="M160 88h20v10q0 6-6 6h-8q-6 0-6-6Z" />
      <path className="il-line" d="M160 88h20v10q0 6-6 6h-8q-6 0-6-6ZM180 91q7 0 5 6t-6 4" />
      <rect className="il-a" x="194" y="96" width="30" height="8" rx="3" />
      <rect className="il-b" x="196" y="88" width="28" height="8" rx="3" />
      <rect className="il-line" x="194" y="96" width="30" height="8" rx="3" />
      <rect className="il-line" x="196" y="88" width="28" height="8" rx="3" />
      {/* table */}
      <path className="il-line" d="M6 104h228M24 104v40M216 104v40" />
      <path className="il-thin" d="M40 116h160" />
    </Svg>
  );
}

/** An open door: you are welcome in. Used on the 404 page. */
export function DoorArt({ className }: { className?: string }) {
  return (
    <Svg vb="0 0 160 120" className={className}>
      <path className="il-b" d="M50 104V44q0-30 30-30t30 30v60Z" />
      <path className="il-line" d="M50 104V44q0-30 30-30t30 30v60Z" />
      <path className="il-a" d="M50 104V44q0-24 18-28l0 96Z" />
      <path className="il-line" d="M50 104V44q0-24 18-28v96Z" />
      <circle className="il-ad" cx="62" cy="66" r="2.5" />
      <ellipse className="il-c" cx="80" cy="108" rx="34" ry="5" />
      <path className="il-c" d="M120 88h18l-2 16h-14Z" />
      <path className="il-line" d="M120 88h18l-2 16h-14Z" />
      <Leaf x={129} y={88} s={1} /><Leaf x={129} y={86} s={0.9} flip />
      <path className="il-line" d="M14 104h132" />
    </Svg>
  );
}

/** A long shelf of guides: the "where to start" shelf. */
export function ShelfArt({ className }: { className?: string }) {
  return (
    <Svg vb="0 0 160 120" className={className}>
      <rect className="il-a" x="22" y="40" width="14" height="50" rx="3" />
      <rect className="il-c" x="38" y="34" width="16" height="56" rx="3" />
      <rect className="il-b" x="56" y="44" width="12" height="46" rx="3" />
      <rect className="il-n" x="70" y="38" width="16" height="52" rx="3" />
      <path className="il-line" d="M22 90V43q0-3 3-3h8q3 0 3 3v47M38 90V37q0-3 3-3h10q3 0 3 3v53M56 90V47q0-3 3-3h6q3 0 3 3v43M70 90V41q0-3 3-3h10q3 0 3 3v49" />
      <path className="il-a" d="M100 90q0-24 18-24t18 24Z" />
      <path className="il-line" d="M100 90q0-24 18-24t18 24" />
      <Leaf x={118} y={66} s={0.9} /><Leaf x={118} y={64} s={0.8} flip />
      <path className="il-line" d="M10 90h140M24 90v8M136 90v8" />
    </Svg>
  );
}

export const ART: Record<ArtName, (p: { className?: string }) => ReactNode> = {
  pantry: PantryArt,
  basket: BasketArt,
  kettle: KettleArt,
  window: WindowArt,
  garden: GardenArt,
  table: TableArt,
  door: DoorArt,
  shelf: ShelfArt,
};

export function Art({ name, className }: { name: ArtName; className?: string }) {
  const C = ART[name];
  return <>{C({ className })}</>;
}
