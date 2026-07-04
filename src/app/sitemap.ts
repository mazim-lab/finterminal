import type { MetadataRoute } from "next";
import { allCards } from "@/data/cards";
import { NEWS } from "@/data/news";
import { SWEET_SPOTS } from "@/data/sweet-spots";
import { livePFArticles } from "@/data/personal-finance";
import { TAGS, tagCount } from "@/data/tags";

const BASE = "https://www.finterminal.ca";

// Refresh the sitemap on the same short cycle as the content.
export const revalidate = 3600;

const STATIC_PATHS = [
  "",
  "/tags",
  "/rates",
  "/news",
  "/deals",
  "/personal-finance",
  "/personal-finance/rrsp-vs-tfsa-canada",
  "/personal-finance/credit-card-interest-canada",
  "/personal-finance/fhsa-vs-rrsp-home-buyers-plan",
  "/personal-finance/best-savings-account-rates-canada",
  "/personal-finance/best-gic-rates-canada",
  "/personal-finance/best-chequing-account-bonuses-canada",
  "/personal-finance/where-to-hold-cash-canada",
  "/personal-finance/credit-card-travel-insurance-canada",
  "/personal-finance/best-cash-back-credit-cards-canada",
  "/personal-finance/best-travel-credit-cards-canada",
  "/personal-finance/how-to-build-credit-canada",
  "/personal-finance/check-your-credit-report-canada",
  "/personal-finance/newcomer-to-canada-first-cards-accounts",
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
  "/travel/points-transfer-partners-canada",
  "/travel/airline-alliances-guide-canada",
  "/travel/how-to-book-award-flights-canada",
  "/travel/airport-lounge-access-canada",
  "/travel/business-class-sweet-spots-canada",
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
    ...TAGS.filter((t) => tagCount(t.slug) > 0).map((t) => ({ url: `${BASE}/tags/${t.slug}`, lastModified: now })),
  ];
}
