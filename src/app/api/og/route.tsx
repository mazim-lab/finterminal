import { ImageResponse } from "next/og";

// Branded social/OG image generator. One endpoint renders an on-aesthetic share
// card for any article: /api/og?title=...&kicker=...
// Terminal styling matches the site (charcoal board, split-flap wordmark, emerald
// accents). Rendered at request time and cached hard at the CDN.
export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;
const WORDMARK = "FINTERMINAL";

// Load JetBrains Mono for the terminal feel. If the fetch fails for any reason we
// fall back to satori's built-in font so an OG image is never broken.
async function loadFonts(): Promise<{ name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[]> {
  const urls: { url: string; weight: 400 | 700 }[] = [
    { url: "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.18/files/jetbrains-mono-latin-400-normal.woff", weight: 400 },
    { url: "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.18/files/jetbrains-mono-latin-700-normal.woff", weight: 700 },
  ];
  try {
    const fonts = await Promise.all(
      urls.map(async ({ url, weight }) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`font ${weight} ${res.status}`);
        return { name: "JetBrains Mono", data: await res.arrayBuffer(), weight, style: "normal" as const };
      }),
    );
    return fonts;
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawTitle = (searchParams.get("title") || "The terminal for Canadian money").trim();
  const title = rawTitle.length > 130 ? `${rawTitle.slice(0, 127)}...` : rawTitle;
  const kicker = (searchParams.get("kicker") || "Cards, points & personal finance").trim().slice(0, 48).toUpperCase();

  const fonts = await loadFonts();
  const fontFamily = fonts.length ? "JetBrains Mono" : "monospace";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E1110",
          borderTop: "12px solid #356B4C",
          padding: "62px 68px",
          fontFamily,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 4px)",
        }}
      >
        {/* Split-flap wordmark */}
        <div style={{ display: "flex", gap: "5px" }}>
          {WORDMARK.split("").map((ch, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "56px",
                background: "#14130f",
                color: "#EFE8D6",
                borderRadius: "5px",
                fontSize: "34px",
                fontWeight: 700,
                boxShadow: "inset 0 0 0 1px rgba(239,232,214,0.16)",
              }}
            >
              {ch}
            </div>
          ))}
        </div>

        {/* Kicker + headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px", marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              color: "#46B36C",
              fontSize: "27px",
              fontWeight: 700,
              letterSpacing: "3px",
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              color: "#E7ECE9",
              fontSize: title.length > 72 ? "56px" : "68px",
              fontWeight: 700,
              lineHeight: 1.14,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", color: "#8C998F", fontSize: "26px", fontWeight: 400 }}>finterminal.ca</div>
          <div style={{ display: "flex", color: "#46B36C", fontSize: "24px", fontWeight: 700 }}>
            &gt; independent · verified data
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
