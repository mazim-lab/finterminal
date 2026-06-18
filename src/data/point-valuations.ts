/**
 * Point & mile valuations (cents per point, CAD).
 *
 * SOURCE: Prince of Travel — "Points Valuations" (https://princeoftravel.com/points-valuations/),
 *         cross-checked against the per-program cpp already in our card data. As of 2026-06.
 *
 * METHODOLOGY:
 *  - `baseline` is a realistic everyday redemption value. We use it for the headline
 *    "estimated first-year value" so we never over-promise.
 *  - `max` is the upper end reachable via transfer-partner sweet spots (e.g. Membership
 *    Rewards → Aeroplan business class). Shown only as upside ("up to X¢"), never as the
 *    headline number. `null` max = the currency isn't transferable / has a fixed value.
 *  - For cash-back currencies, 1 point = 1 cent by definition.
 *
 * Keep this in sync with PoT's monthly update; it is the single source of truth for valuation.
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
  'marriott bonvoy': { baseline: 0.8, max: 1.0, transferable: true },
  // Fixed / quasi-fixed value currencies
  'scene+': { baseline: 1.0, max: null, transferable: false },
  'td rewards': { baseline: 0.5, max: null, transferable: false },
  'bmo rewards': { baseline: 0.67, max: 0.7, transferable: false },
  'national bank': { baseline: 0.95, max: null, transferable: false },
  'mbna rewards': { baseline: 1.0, max: null, transferable: false },
  'desjardins bonusdollars': { baseline: 1.0, max: null, transferable: false },
  'pc optimum': { baseline: 0.7, max: null, transferable: false },
  'triangle rewards': { baseline: 0.5, max: null, transferable: false },
  'westjet rewards': { baseline: 1.0, max: null, transferable: false },
  'cash back': { baseline: 1.0, max: null, transferable: false },
};

export const VALUATION_SOURCE = {
  name: 'Prince of Travel — Points Valuations',
  url: 'https://princeoftravel.com/points-valuations/',
  asOf: '2026-06',
};

/** Look up a valuation by rewards-program string (case-insensitive, loose match). */
export function valuationFor(program: string | null | undefined): Valuation {
  const p = (program || '').toLowerCase().trim();
  if (POINT_VALUATIONS[p]) return POINT_VALUATIONS[p];
  for (const key of Object.keys(POINT_VALUATIONS)) {
    if (p.includes(key) || key.includes(p)) return POINT_VALUATIONS[key];
  }
  return { baseline: 1.0, max: null, transferable: false }; // safe default
}
