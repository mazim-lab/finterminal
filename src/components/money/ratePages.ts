/**
 * The three rate pages, as the Money hub and /rates link to them.
 *
 * KEEP IN SYNC: `verified` and `asOf` repeat what each rate page prints in its
 * own docmeta (the VerifiedStamp date and the "as of" line). When a rate page
 * is re-verified and its stamp date bumps, bump it here too. No rates live in
 * this file on purpose, so a hub can never show a stale number.
 */
export interface RatePageLink {
  href: string;
  kicker: string;
  title: string;
  short: string;
  /** Same wording as the page's docmeta line. */
  asOf: string;
  /** Same date as the page's VerifiedStamp. */
  verified: string;
}

export const RATE_PAGES: RatePageLink[] = [
  {
    href: "/personal-finance/best-savings-account-rates-canada",
    kicker: "Savings",
    title: "Best high-interest savings rates",
    short: "Everyday and promo HISA rates, side by side",
    asOf: "Rates as of September 2026",
    verified: "2026-09-16",
  },
  {
    href: "/personal-finance/best-gic-rates-canada",
    kicker: "GICs",
    title: "Best GIC rates by term",
    short: "Non-redeemable rates, one to five years",
    asOf: "Rates as of September 2026",
    verified: "2026-09-16",
  },
  {
    href: "/personal-finance/best-chequing-account-bonuses-canada",
    kicker: "Chequing",
    title: "Best chequing account bonuses",
    short: "Welcome offers, conditions and deadlines",
    asOf: "Offers as of September 2026",
    verified: "2026-09-16",
  },
];

/** Same cadence the rate pages pass to their VerifiedStamp. */
export const RATE_CADENCE_DAYS = 30;
