import type { MetadataRoute } from "next";
import { allCards, CARDS_VERIFIED } from "@/data/cards";
import { NEWS } from "@/data/news";
import { SWEET_SPOTS } from "@/data/sweet-spots";
import { livePFArticles } from "@/data/personal-finance";
import { TAGS, tagCount, MIN_INDEXABLE_TAG_ARTICLES } from "@/data/tags";

const BASE = "https://www.finterminal.ca";

const STATIC_PATHS = [
  "",
  "/directory",
  "/tags",
  "/rates",
  "/news",
  "/deals",
  "/personal-finance",
  "/personal-finance/best-savings-account-rates-canada",
  "/personal-finance/best-gic-rates-canada",
  "/personal-finance/best-chequing-account-bonuses-canada",
  "/personal-finance/where-to-hold-cash-canada",
  "/personal-finance/best-cash-back-credit-cards-canada",
  "/personal-finance/best-travel-credit-cards-canada",
  "/travel",
  "/travel/sweet-spots",
  "/cards",
  "/compare",
  "/portfolio",
  "/newsletter",
  "/about",
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

// Real dates from the data where we have a day-level one; build time otherwise.
function dateOr(value: string | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const d = new Date(value);
  return isNaN(d.getTime()) || d.getTime() > fallback.getTime() ? fallback : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const news = NEWS;

  return [
    ...STATIC_PATHS.map((p) => ({ url: `${BASE}${p}`, lastModified: now })),
    ...allCards.map((c) => ({ url: `${BASE}/cards/${c.slug}`, lastModified: dateOr(CARDS_VERIFIED, now) })),
    ...news.map((n) => ({ url: `${BASE}/news/${n.slug}`, lastModified: dateOr(n.date, now) })),
    ...SWEET_SPOTS.map((s) => ({ url: `${BASE}/travel/sweet-spots/${s.slug}`, lastModified: dateOr(s.lastChecked, now) })),
    ...livePFArticles().map((a) => ({ url: `${BASE}/personal-finance/${a.slug}`, lastModified: now })),
    ...TAGS.filter((t) => tagCount(t.slug) >= MIN_INDEXABLE_TAG_ARTICLES).map((t) => ({ url: `${BASE}/tags/${t.slug}`, lastModified: now })),
  ];
}
