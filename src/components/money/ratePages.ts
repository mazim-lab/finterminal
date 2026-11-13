/**
 * The three rate pages: their public freshness dates, and how the Money hub
 * and /rates link to them.
 *
 * SINGLE SOURCE OF TRUTH for each rate page's "verified" date and "as of"
 * line. The rate page itself reads RATE_STAMPS for its VerifiedStamp and its
 * docmeta line, and the hubs read the same values through RATE_PAGES. When a
 * rate page is re-verified, change its entry in RATE_STAMPS (and nothing
 * else for the stamp): the page and both hubs follow.
 *
 * Rates, offers and issuer links do NOT live here. They stay in each page's
 * own page.tsx, which is what the rate watchdog and link sentinel read. No
 * rates live in this file on purpose, so a hub can never show a stale number.
 */
export interface RateStamp {
  /** ISO date of the last first-party verification (VerifiedStamp date). */
  verified: string;
  /** Docmeta wording, e.g. "Rates as of September 2026". */
  asOf: string;
}

export const RATE_STAMPS = {
  savings: { verified: "2026-09-16", asOf: "Rates as of September 2026" },
  gic: { verified: "2026-09-16", asOf: "Rates as of September 2026" },
  chequing: { verified: "2026-09-16", asOf: "Offers as of September 2026" },
} as const satisfies Record<string, RateStamp>;

/** Stamp cadence for all three rate pages and their hub listings. */
export const RATE_CADENCE_DAYS = 30;

export interface RatePageLink extends RateStamp {
  href: string;
  kicker: string;
  title: string;
  short: string;
}

export const RATE_PAGES: RatePageLink[] = [
  {
    href: "/personal-finance/best-savings-account-rates-canada",
    kicker: "Savings",
    title: "Best high-interest savings rates",
    short: "Everyday and promo HISA rates, side by side",
    ...RATE_STAMPS.savings,
  },
  {
    href: "/personal-finance/best-gic-rates-canada",
    kicker: "GICs",
    title: "Best GIC rates by term",
    short: "Non-redeemable rates, one to five years",
    ...RATE_STAMPS.gic,
  },
  {
    href: "/personal-finance/best-chequing-account-bonuses-canada",
    kicker: "Chequing",
    title: "Best chequing account bonuses",
    short: "Welcome offers, conditions and deadlines",
    ...RATE_STAMPS.chequing,
  },
];
