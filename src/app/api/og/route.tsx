import { ImageResponse } from "next/og";

// Branded social/OG image generator. One endpoint renders a share card for any
// page: /api/og?title=...&kicker=...
// Styled to the site identity: a soft indigo "room", the Homestead sprout mark,
// the title in Fraunces, a sentence-case kicker in Source Sans 3, and the
// kitchen-table drawing. Colours are the site's own token values.
// Rendered at request time and cached hard at the CDN.
export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;

const C = {
  room: "#eef0ff", // --fin-bg
  card: "#ffffff", // --surface
  text: "#18181b", // --text
  text2: "#52525b", // --text-2
  fin: "#4338ca", // --fin
  finBd: "#c9cdfa", // --fin-bd
  acctBg: "#e4f5f9", // --acct-bg
  acctBd: "#a8d8e4", // --acct-bd
  econBg: "#fbeafd", // --econ-bg
  surface2: "#f4f4f5", // --surface-2
  leaf: "#bbf7d0", // --green-border
  line: "#52525b", // --text-2
};

const MARK =
  "M14.4 4.3Q16 3 17.6 4.3L28 12.6Q29 13.4 29 14.8V25.6Q29 28.2 26.4 28.2H5.6Q3 28.2 3 25.6V14.8Q3 13.4 4 12.6Z" +
  "M14.9 25.4V21.6C12.2 21.4 10.4 19.7 10 16.9 12.6 16.9 14.4 18.2 14.9 19.9V18.2C15.3 14.8 17.8 12.9 22 12.8 21.8 16.6 19.6 18.8 17.1 19.1V25.4Q17.1 26.4 16 26.4 14.9 26.4 14.9 25.4Z";

// The kitchen-table drawing from src/components/illustrations/HomeArt.tsx,
// with the CSS classes resolved to the light-theme hex values. Inline SVG
// elements, because satori renders those directly.
const LN = { fill: "none", stroke: C.line, strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
function TableDrawing() {
  return (
    <svg viewBox="0 0 240 150" width="300" height="188">
      <rect x="70" y="6" width="100" height="62" rx="12" fill={C.acctBg} />
      <rect x="70" y="6" width="100" height="62" rx="12" {...LN} />
      <path d="M120 6v62M70 37h100" {...LN} />
      <path d="M30 104q-8 0-8-10v-8q0-18 24-18t24 18v8q0 10-8 10Z" fill={C.room} />
      <path d="M30 104q-8 0-8-10v-8q0-18 24-18t24 18v8q0 10-8 10ZM70 82q12 0 8 14M22 84 10 76" {...LN} />
      <circle cx="46" cy="64" r="4" fill={C.finBd} />
      <circle cx="108" cy="80" r="10" fill={C.econBg} />
      <circle cx="126" cy="78" r="11" fill={C.room} />
      <ellipse cx="117" cy="72" rx="10" ry="7" fill={C.acctBg} />
      <path d="M118 68C119.6 61.6 124.4 58.4 130.8 58.4 130 64.8 125.2 68 118 68Z" fill={C.leaf} />
      <path d="M92 84h52q-2 20-26 20t-26-20Z" fill={C.surface2} />
      <path d="M92 84h52q-2 20-26 20t-26-20Z" {...LN} />
      <path d="M160 88h20v10q0 6-6 6h-8q-6 0-6-6Z" fill={C.econBg} />
      <path d="M160 88h20v10q0 6-6 6h-8q-6 0-6-6ZM180 91q7 0 5 6t-6 4" {...LN} />
      <rect x="194" y="96" width="30" height="8" rx="3" fill={C.room} />
      <rect x="196" y="88" width="28" height="8" rx="3" fill={C.acctBg} />
      <rect x="194" y="96" width="30" height="8" rx="3" {...LN} />
      <rect x="196" y="88" width="28" height="8" rx="3" {...LN} />
      <path d="M6 104h228M24 104v40M216 104v40" {...LN} />
      <path d="M40 116h160" {...LN} strokeWidth={2} />
    </svg>
  );
}

type Font = { name: string; data: ArrayBuffer; weight: 400 | 600 | 700; style: "normal" };

// Fraunces for the title, Source Sans 3 for everything else, as on the site.
// If a fetch fails we fall back to satori's built-in font so an OG image is
// never broken.
async function loadFonts(): Promise<Font[]> {
  const base = "https://cdn.jsdelivr.net/npm/@fontsource";
  const urls: { name: string; url: string; weight: 400 | 600 | 700 }[] = [
    { name: "Fraunces", url: `${base}/fraunces@5.0.21/files/fraunces-latin-600-normal.woff`, weight: 600 },
    { name: "Source Sans 3", url: `${base}/source-sans-3@5.0.12/files/source-sans-3-latin-400-normal.woff`, weight: 400 },
    { name: "Source Sans 3", url: `${base}/source-sans-3@5.0.12/files/source-sans-3-latin-600-normal.woff`, weight: 600 },
  ];
  const results = await Promise.all(
    urls.map(async ({ name, url, weight }) => {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        return { name, data: await res.arrayBuffer(), weight, style: "normal" as const };
      } catch {
        return null;
      }
    }),
  );
  return results.filter((f): f is Font => f !== null);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawTitle = (searchParams.get("title") || "Canadian money, explained plainly").trim();
  const title = rawTitle.length > 130 ? `${rawTitle.slice(0, 127)}...` : rawTitle;
  const kicker = (searchParams.get("kicker") || "Cards, points & personal finance").trim().slice(0, 48);

  const fonts = await loadFonts();
  const serif = fonts.some((f) => f.name === "Fraunces") ? "Fraunces" : "serif";
  const sans = fonts.some((f) => f.name === "Source Sans 3") ? "Source Sans 3" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: C.room,
          padding: "36px",
          fontFamily: sans,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: C.card,
            borderRadius: "40px",
            padding: "48px 56px 44px",
            position: "relative",
          }}
        >
          {/* brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <svg width="56" height="56" viewBox="0 0 32 32">
              <path d={MARK} fill={C.fin} fillRule="evenodd" />
            </svg>
            <div style={{ display: "flex", fontFamily: serif, fontSize: "38px", fontWeight: 600, color: C.text }}>
              FinTerminal
            </div>
          </div>

          {/* kicker + headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "720px" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                color: C.fin,
                background: C.room,
                borderRadius: "999px",
                padding: "8px 20px",
                fontSize: "26px",
                fontWeight: 600,
              }}
            >
              {kicker}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: serif,
                color: C.text,
                fontSize: title.length > 60 ? "52px" : "64px",
                fontWeight: 600,
                lineHeight: 1.1,
                maxWidth: "680px",
              }}
            >
              {title}
            </div>
          </div>

          {/* footer */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "24px", color: C.text2 }}>
            <div style={{ display: "flex", color: C.text, fontWeight: 600 }}>finterminal.ca</div>
            <div style={{ display: "flex" }}>Sorted out at the kitchen table, with a date on every number</div>
          </div>

          <div style={{ display: "flex", position: "absolute", right: "44px", top: "48px" }}>
            <TableDrawing />
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: fonts.length ? fonts.map((f) => ({ name: f.name, data: f.data, weight: f.weight, style: f.style })) : undefined,
      headers: {
        "Cache-Control": "public, immutable, no-transform, max-age=604800",
      },
    },
  );
}
