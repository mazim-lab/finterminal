import { allCards } from "@/data/cards";
import { PF_ARTICLES } from "@/data/personal-finance";
import { TRAVEL_GUIDES } from "@/data/travel-guides";
import { SWEET_SPOTS } from "@/data/sweet-spots";
import { NEWS } from "@/data/news";

// A single flat, build-time index over everything a reader might type into the
// topbar search: card names, guide titles (personal finance + travel + worked
// sweet-spot examples), and news headlines. It is a plain array baked at build
// time from the existing data modules, so "RESP" at 9:41pm actually lands on the
// RESP guide. No runtime fetch, no separate JSON file to keep in sync.

export type SearchKind = "guide" | "card" | "news";

export interface SearchEntry {
  title: string;
  href: string;
  kind: SearchKind;
}

// Human-readable group headings for each kind, used by the SearchBox UI.
export const KIND_LABELS: Record<SearchKind, string> = {
  card: "Cards",
  guide: "Guides",
  news: "News",
};

export const SEARCH_INDEX: SearchEntry[] = [
  ...allCards.map((c) => ({
    title: c.name,
    href: `/cards/${c.slug}`,
    kind: "card" as const,
  })),
  ...PF_ARTICLES.map((a) => ({
    title: a.title,
    href: `/personal-finance/${a.slug}`,
    kind: "guide" as const,
  })),
  ...TRAVEL_GUIDES.map((a) => ({
    title: a.title,
    href: `/travel/${a.slug}`,
    kind: "guide" as const,
  })),
  ...SWEET_SPOTS.map((s) => ({
    title: s.title,
    href: `/travel/sweet-spots/${s.slug}`,
    kind: "guide" as const,
  })),
  ...NEWS.map((n) => ({
    title: n.headline,
    href: `/news/${n.slug}`,
    kind: "news" as const,
  })),
];

/**
 * Case-insensitive substring match over entry titles. Returns at most `limit`
 * entries (default 8). Cards are the largest set, so a light ranking keeps
 * prefix and word-start matches above mid-word ones.
 */
export function searchEntries(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of SEARCH_INDEX) {
    const title = entry.title.toLowerCase();
    const idx = title.indexOf(q);
    if (idx === -1) continue;
    // Lower score sorts first: exact prefix, then word-start, then anywhere.
    let score = 2;
    if (idx === 0) score = 0;
    else if (title[idx - 1] === " ") score = 1;
    scored.push({ entry, score });
  }

  scored.sort((a, b) => a.score - b.score);
  return scored.slice(0, limit).map((s) => s.entry);
}
