// Shared helpers for the travel hub, the sweet-spot index and the sweet-spot
// posts. Everything is derived from SWEET_SPOTS / ROTATION / TAGS, so a new post
// prepended by the cron (or a new program) shows up with no code change.
import { ROTATION, SWEET_SPOTS, type SweetSpot } from "@/data/sweet-spots";
import { tagBySlug } from "@/data/tags";

export function programSlug(program: string): string {
  return program
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Long-form guides that go deeper on a program, where one exists. */
const PROGRAM_GUIDES: Record<string, { href: string; label: string }> = {
  aeroplan: { href: "/travel/aeroplan-sweet-spots", label: "Aeroplan sweet spots guide" },
  avios: { href: "/travel/avios-sweet-spots-rbc-avion-transfer", label: "Avios and RBC Avion guide" },
  aadvantage: { href: "/travel/aadvantage-sweet-spots", label: "AAdvantage sweet spots guide" },
};

export function programGuide(program: string) {
  return PROGRAM_GUIDES[programSlug(program)] ?? null;
}

/** The topic hub for a program, when the tag registry has one with the same slug. */
export function programTag(program: string) {
  const tag = tagBySlug(programSlug(program));
  return tag ? { href: `/tags/${tag.slug}`, label: tag.label } : null;
}

export interface ProgramGroup {
  program: string;
  slug: string;
  spots: SweetSpot[];
}

/**
 * Posts grouped by program: ROTATION order first, then any program that appears
 * in the data but not in the rotation. Posts inside a group stay newest first.
 */
export function programGroups(spots: SweetSpot[] = SWEET_SPOTS): ProgramGroup[] {
  const order: string[] = [...ROTATION];
  for (const s of spots) if (!order.includes(s.program)) order.push(s.program);
  return order
    .map((program) => ({ program, slug: programSlug(program), spots: spots.filter((s) => s.program === program) }))
    .filter((g) => g.spots.length > 0);
}

export const spotHref = (s: SweetSpot) => `/travel/sweet-spots/${s.slug}`;
