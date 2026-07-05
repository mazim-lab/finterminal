import type { Metadata } from "next";

/**
 * Build the openGraph + twitter image metadata pointing at our branded OG
 * generator (/api/og). One line per page:
 *   export const metadata = { title, description, ...ogMeta(title, "Personal finance") };
 * or inside generateMetadata: return { title, description, ...ogMeta(headline, "News") };
 * The URL is relative; Next resolves it against metadataBase (finterminal.ca).
 */
export function ogMeta(title: string, kicker: string): Pick<Metadata, "openGraph" | "twitter"> {
  const url = `/api/og?title=${encodeURIComponent(title)}&kicker=${encodeURIComponent(kicker)}`;
  const images = [{ url, width: 1200, height: 630, alt: title }];
  return {
    openGraph: { images },
    twitter: { card: "summary_large_image", images: [url] },
  };
}
