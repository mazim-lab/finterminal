import { ImageResponse } from "next/og";

// Branded social/OG image generator. One endpoint renders a share card for any
// page: /api/og?title=...&kicker=...
// Styled to the FAEConf palette the site uses: white page, ink text, the 3px
// tricolor bar, an ink logo mark with three ascending bars, and a mono kicker.
// Rendered at request time and cached hard at the CDN.
export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;

const C = {
  bg: "#ffffff",
  text: "#18181b",
  text2: "#52525b",
  text3: "#6b6b75",
  border: "#e4e4e7",
  ink: "#18181b",
  fin: "#4f46e5",
  acct: "#0891b2",
  econ: "#c026d3",
  mark1: "#8f97ff",
  mark2: "#3fd2ea",
  mark3: "#ee8afa",
};

type Font = { name: string; data: ArrayBuffer; weight: 400 | 600 | 700; style: "normal" };

// Inter for words, IBM Plex Mono for the kicker and footer, as on the site.
// If a fetch fails we fall back to satori's built-in font so an OG image is
// never broken.
async function loadFonts(): Promise<Font[]> {
  const base = "https://cdn.jsdelivr.net/npm/@fontsource";
  const urls: { name: string; url: string; weight: 400 | 600 | 700 }[] = [
    { name: "Inter", url: `${base}/inter@5.0.18/files/inter-latin-700-normal.woff`, weight: 700 },
    { name: "Inter", url: `${base}/inter@5.0.18/files/inter-latin-400-normal.woff`, weight: 400 },
    { name: "Plex Mono", url: `${base}/ibm-plex-mono@5.0.13/files/ibm-plex-mono-latin-600-normal.woff`, weight: 600 },
    { name: "Plex Mono", url: `${base}/ibm-plex-mono@5.0.13/files/ibm-plex-mono-latin-400-normal.woff`, weight: 400 },
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
  const rawTitle = (searchParams.get("title") || "The terminal for Canadian money").trim();
  const title = rawTitle.length > 130 ? `${rawTitle.slice(0, 127)}...` : rawTitle;
  const kicker = (searchParams.get("kicker") || "Cards, points & personal finance").trim().slice(0, 48).toUpperCase();

  const fonts = await loadFonts();
  const hasInter = fonts.some((f) => f.name === "Inter");
  const hasMono = fonts.some((f) => f.name === "Plex Mono");
  const sans = hasInter ? "Inter" : "sans-serif";
  const mono = hasMono ? "Plex Mono" : "monospace";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: C.bg,
          fontFamily: sans,
        }}
      >
        {/* tricolor bar */}
        <div style={{ display: "flex", height: "12px", width: "100%" }}>
          <div style={{ flex: 1, background: C.fin }} />
          <div style={{ flex: 1, background: C.acct }} />
          <div style={{ flex: 1, background: C.econ }} />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 72px 52px",
          }}
        >
          {/* brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: "5px",
                width: "52px",
                height: "52px",
                borderRadius: "12px",
                background: C.ink,
                padding: "0 0 12px",
              }}
            >
              <div style={{ width: "8px", height: "12px", borderRadius: "2px", background: C.mark1 }} />
              <div style={{ width: "8px", height: "20px", borderRadius: "2px", background: C.mark2 }} />
              <div style={{ width: "8px", height: "28px", borderRadius: "2px", background: C.mark3 }} />
            </div>
            <div style={{ display: "flex", fontSize: "34px", fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>
              Fin<span style={{ color: C.text3 }}>Terminal</span>
            </div>
          </div>

          {/* kicker + headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontFamily: mono,
                color: C.text2,
                fontSize: "24px",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: C.fin }} />
              {kicker}
            </div>
            <div
              style={{
                display: "flex",
                color: C.text,
                fontSize: title.length > 72 ? "56px" : "70px",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                maxWidth: "1040px",
              }}
            >
              {title}
            </div>
          </div>

          {/* footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "22px",
              borderTop: `2px solid ${C.border}`,
              fontFamily: mono,
              fontSize: "22px",
            }}
          >
            <div style={{ display: "flex", color: C.text, fontWeight: 600 }}>finterminal.ca</div>
            <div style={{ display: "flex", color: C.text3, fontWeight: 400 }}>Dated numbers, checked by hand</div>
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
