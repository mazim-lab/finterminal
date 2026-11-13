import type { Metadata } from "next";

/**
 * Build the openGraph + twitter metadata for a page, pointing the image at our
 * branded OG generator (/api/og). One line per page:
 *   export const metadata = { title, description, ...ogMeta(title, "Personal finance", "/personal-finance/x") };
 * Next merges openGraph shallowly, so a page's openGraph replaces the layout's
 * entirely; that is why siteName, locale, type and title are repeated here.
 * Pass `path` (the page's canonical path) to emit og:url. Relative URLs resolve
 * against metadataBase (https://www.finterminal.ca).
 */
export function ogMeta(
  title: string,
  kicker: string,
  path?: string,
  type: "website" | "article" = "website",
): Pick<Metadata, "openGraph" | "twitter"> {
  const image = `/api/og?title=${encodeURIComponent(title)}&kicker=${encodeURIComponent(kicker)}`;
  const images = [{ url: image, width: 1200, height: 630, alt: title }];
  return {
    openGraph: {
      title,
      siteName: "FinTerminal",
      locale: "en_CA",
      type,
      images,
      ...(path ? { url: path } : {}),
    },
    twitter: { card: "summary_large_image", title, images: [image] },
  };
}
