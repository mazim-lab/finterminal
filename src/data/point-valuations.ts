/**
 * Point & mile valuations (cents per point, CAD). FINTERMINAL'S OWN ESTIMATES.
 *
 * These are our own directional estimates, informed by the per-program cpp already in our
 * card data and by widely-known Canadian redemption norms. They are NOT taken from a single
 * external source, and the `max` figures in particular are rough ceilings, not cited values.
 *
 * METHODOLOGY:
 *  - `baseline` is a realistic everyday redemption value. We use it for the headline
 *    "estimated first-year value" so we never over-promise.
 *  - `max` is an UPPER-END estimate reachable on premium transfer-partner sweet spots
 *    (e.g. Aeroplan / Membership Rewards business-class redemptions can reach ~5¢). Shown
 *    only as upside ("up to X¢"), never as the headline. A rough ceiling, not a guarantee.
 *    `null` max = the currency isn't transferable / has a fixed value.
 *  - For cash-back currencies, 1 point = 1 cent by definition.
 *
 * Review quarterly.
 *
 * LAST CROSS-CHECK: 2026-08-29, against NerdWallet's 2026 points-and-miles valuation study.
 * That study is US-centric and quoted in USD, so we treat it as a signal about which
 * programs moved and by how much, never as a set of numbers to copy across. The only
 * program it moved for us this round was Marriott Bonvoy. Air Canada Aeroplan, Amex
 * Membership Rewards, RBC Avion, CIBC Aventura and the Canadian fixed-value programs are
 * not in the study, so they keep the rates we set from Canadian sources.
 *
 * 2026-11-13: program-mapping fix. More Rewards, Moi and CIBC Adapta cards had been
 * valued at the RBC Avion or CIBC Aventura rate. They now carry their own fixed rates,
 * taken from each program's own redemption terms (sources inline below). VIPorter
 * points and Avios have no fixed rate, so they are listed in UNVALUED_PROGRAMS.
 */

export interface Valuation {
  baseline: number; // cents per point (CAD)
  max: number | null; // upside via transfer partners, or null if fixed-value
  transferable: boolean;
}

export const POINT_VALUATIONS: Record<string, Valuation> = {
  // Transferable / flexible currencies
  'membership rewards': { baseline: 1.95, max: 5.0, transferable: true },
  'aeroplan': { baseline: 2.05, max: 5.0, transferable: true },
  'rbc avion': { baseline: 1.8, max: 3.0, transferable: true },
  'rbc rewards': { baseline: 1.8, max: 3.0, transferable: true },
  'cibc aventura': { baseline: 1.1, max: 2.3, transferable: true },
  // Bonvoy cut in 2026: award pricing rose at roughly 95% of properties, so both the
  // everyday rate and the ceiling come down. Bonvoy has no separate Canadian chart, so
  // the cut lands on Canadian members the same way.
  'marriott bonvoy': { baseline: 0.7, max: 0.9, transferable: true },
  // Fixed / quasi-fixed value currencies
  'scene+': { baseline: 1.0, max: null, transferable: false },
  'td rewards': { baseline: 0.5, max: null, transferable: false },
  'bmo rewards': { baseline: 0.67, max: 0.7, transferable: false },
  'national bank': { baseline: 0.95, max: null, transferable: false },
  'mbna rewards': { baseline: 1.0, max: null, transferable: false },
  'desjardins bonusdollars': { baseline: 1.0, max: null, transferable: false },
  'pc optimum': { baseline: 0.1, max: null, transferable: false },
  'triangle rewards': { baseline: 0.5, max: null, transferable: false },
  'westjet rewards': { baseline: 1.0, max: null, transferable: false },
  // Store and co-brand currencies with a fixed, first-party redemption rate (checked
  // 2026-11-13). Each one is its own currency, NOT RBC Avion or CIBC Aventura points.
  //  - More Rewards (More Rewards RBC Visa cards): "10,000 points = $15" with Pay With
  //    Points at partner grocers, per morerewards.ca/rewards and the RBC card page.
  //    $15 / 10,000 = 0.15 cents.
  'more rewards': { baseline: 0.15, max: null, transferable: false },
  //  - Moi (Moi RBC Visa): "the moi program redemption rate of 500 moi points for
  //    $4.00", per the RBC card page. $4 / 500 = 0.8 cents.
  'moi': { baseline: 0.8, max: null, transferable: false },
  //  - CIBC Adapta: "1,500 Adapta Points are worth $10 when applied to your credit card
  //    balance or a recent purchase" (baseline, $10 / 1,500 = 0.667 cents) and "1,200
  //    Adapta Points are worth $10 when used toward select CIBC financial products"
  //    (ceiling, $10 / 1,200 = 0.83 cents), per cibc.com.
  'cibc adapta': { baseline: 0.667, max: 0.83, transferable: false },
  'cash back': { baseline: 1.0, max: null, transferable: false },
};

/**
 * Currencies we deliberately do NOT put a cents-per-point figure on, because the
 * program publishes no fixed redemption rate we can cite. Cards earning these show
 * their bonus in points with no dollar figure. Checked against first-party pages
 * 2026-11-13:
 *  - VIPorter points (BMO VIPorter Mastercards): flyporter.com says points pay for all
 *    or part of a base fare, with no fixed rate stated.
 *  - Avios (RBC British Airways Visa Infinite): award pricing is dynamic, and RBC's
 *    terms say Avios "have no cash value".
 * Matched before POINT_VALUATIONS so a loose match can never hand them another rate.
 */
export const UNVALUED_PROGRAMS: string[] = ['viporter', 'avios'];

/** A baseline of 0 means "no valuation". cards.ts then shows the bonus in points only. */
export const NO_VALUATION: Valuation = { baseline: 0, max: null, transferable: false };

export const VALUATION_SOURCE = {
  name: 'FinTerminal estimates',
  url: null,
  // Month precision on purpose. The ticker and the methodology page both print this
  // straight through, and a full date reads oddly in that sentence.
  asOf: '2026-11',
};

/** Look up a valuation by rewards-program string (case-insensitive, loose match). */
export function valuationFor(program: string | null | undefined): Valuation {
  const p = (program || '').toLowerCase().trim();
  if (p && UNVALUED_PROGRAMS.some(k => p.includes(k))) return NO_VALUATION;
  if (POINT_VALUATIONS[p]) return POINT_VALUATIONS[p];
  for (const key of Object.keys(POINT_VALUATIONS)) {
    if (p.includes(key) || key.includes(p)) return POINT_VALUATIONS[key];
  }
  return { baseline: 1.0, max: null, transferable: false }; // safe default
}
