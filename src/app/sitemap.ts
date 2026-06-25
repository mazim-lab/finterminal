import type { MetadataRoute } from "next";
import { allCards } from "@/data/cards";
import { NEWS } from "@/data/news";
import { getNewsRemote } from "@/data/airtable";

const BASE = "https://www.finterminal.ca";

// Refresh the sitemap on the same short cycle as the content.
export const revalidate = 3600;

const STATIC_PATHS = [
  "",
  "/news",
  "/deals",
  "/personal-finance",
  "/travel",
  "/cards",
  "/compare",
  "/portfolio",
  "/how-we-value-points",
  "/disclosure",
  "/guides/us-cards-for-canadians",
  "/guides/us-cards-for-canadians/interactive",
  "/personal-finance/smith-manoeuvre",
  "/personal-finance/costco-membership-worth-it-canada",
  "/travel/aeroplan-sweet-spots",
  "/travel/amex-mr-to-aeroplan",
  "/travel/avios-sweet-spots-rbc-avion-transfer",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const news = (await getNewsRemote()) ?? NEWS;

  return [
    ...STATIC_PATHS.map((p) => ({ url: `${BASE}${p}`, lastModified: now })),
    ...allCards.map((c) => ({ url: `${BASE}/cards/${c.slug}`, lastModified: now })),
    ...news.map((n) => ({ url: `${BASE}/news/${n.slug}`, lastModified: now })),
  ];
}
