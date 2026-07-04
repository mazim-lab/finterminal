import type { MetadataRoute } from "next";
import { allCards } from "@/data/cards";
import { NEWS } from "@/data/news";
import { SWEET_SPOTS } from "@/data/sweet-spots";
import { livePFArticles } from "@/data/personal-finance";

const BASE = "https://www.finterminal.ca";

// Refresh the sitemap on the same short cycle as the content.
export const revalidate = 3600;

const STATIC_PATHS = [
  "",
  "/news",
  "/deals",
  "/personal-finance",
  "/personal-finance/best-savings-account-rates-canada",
  "/personal-finance/best-gic-rates-canada",
  "/personal-finance/best-chequing-account-bonuses-canada",
  "/travel",
  "/cards",
  "/compare",
  "/portfolio",
  "/newsletter",
  "/contact",
  "/how-we-value-points",
  "/disclosure",
  "/guides/us-cards-for-canadians",
  "/guides/us-cards-for-canadians/interactive",
  "/travel/aeroplan-sweet-spots",
  "/travel/amex-mr-to-aeroplan",
  "/travel/avios-sweet-spots-rbc-avion-transfer",
  "/travel/rbc-avion-to-aadvantage",
  "/travel/aadvantage-sweet-spots",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const news = NEWS;

  return [
    ...STATIC_PATHS.map((p) => ({ url: `${BASE}${p}`, lastModified: now })),
    ...allCards.map((c) => ({ url: `${BASE}/cards/${c.slug}`, lastModified: now })),
    ...news.map((n) => ({ url: `${BASE}/news/${n.slug}`, lastModified: now })),
    ...SWEET_SPOTS.map((s) => ({ url: `${BASE}/travel/sweet-spots/${s.slug}`, lastModified: now })),
    ...livePFArticles().map((a) => ({ url: `${BASE}/personal-finance/${a.slug}`, lastModified: now })),
  ];
}
