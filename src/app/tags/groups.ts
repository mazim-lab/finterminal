// Display grouping for the topic index and the "related topics" strip.
// Mirrors the sections in src/data/tags.ts. A tag that is not listed here still
// shows up, under "More topics", so growing the taxonomy needs no code change.
import type { Tag, TaggedArticle } from "@/data/tags";

export const TAG_GROUPS: { id: string; label: string; tone: string; slugs: string[] }[] = [
  { id: "sections", label: "The big sections", tone: "tone-neutral", slugs: ["points", "travel", "cards", "personal-finance", "news"] },
  {
    id: "programs",
    label: "Loyalty programs and currencies",
    tone: "tone-travel",
    slugs: ["aeroplan", "avios", "aadvantage", "delta", "united", "westjet", "alaska", "flying-blue", "scene-plus", "amex", "rbc-avion", "transfers"],
  },
  { id: "cards", label: "Picking a card", tone: "tone-cards", slugs: ["welcome-bonuses", "cash-back", "travel-cards", "no-fx-fees"] },
  { id: "travel", label: "Travel how-to", tone: "tone-travel", slugs: ["award-booking", "lounges", "alliances", "business-class", "travel-insurance"] },
  {
    id: "money",
    label: "Personal finance",
    tone: "tone-money",
    slugs: ["savings-and-gics", "chequing", "credit-score", "newcomers", "registered-accounts", "home-buying", "taxes"],
  },
];

export function groupTags<T extends Tag>(tags: T[]) {
  const used = new Set<string>();
  const groups = TAG_GROUPS.map((g) => {
    const items = tags.filter((t) => g.slugs.includes(t.slug));
    items.forEach((t) => used.add(t.slug));
    return { ...g, items };
  });
  const rest = tags.filter((t) => !used.has(t.slug));
  if (rest.length) groups.push({ id: "more", label: "More topics", tone: "tone-neutral", slugs: [], items: rest });
  return groups.filter((g) => g.items.length > 0);
}

/** Content-type buckets for a tag hub, in display order. */
export const SECTION_ORDER: { section: TaggedArticle["section"]; id: string; label: string }[] = [
  { section: "Travel", id: "travel-guides", label: "Travel guides" },
  { section: "Guides", id: "guides", label: "Guides" },
  { section: "Personal finance", id: "personal-finance", label: "Personal finance" },
  { section: "Sweet spot", id: "sweet-spots", label: "Sweet spots" },
  { section: "News", id: "news", label: "News" },
];
