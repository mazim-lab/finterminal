// JSON-free view helpers for the Card Explorer.
//
// IMPORTANT: this module must never import the card JSON (directly or via
// cards.ts runtime values). The /cards client bundle imports from here, so any
// data import would drag the full ~349KB of card JSON back into the browser.
// Only `import type` from cards.ts is allowed (types are erased at compile).

import type { Benefits } from './cards';

/** The minimal card shape the Card Explorer table + filters actually use.
 *  Keeping this lean means the /cards client bundle ships ~14 fields per card
 *  instead of the full record (long bonus terms, insurance, pros/cons, earn
 *  tables, sources, notes…), all of which stay server-side for the detail page. */
export interface SlimCard {
  slug: string;
  name: string;
  issuer: string;
  rewards_program: string;
  card_type: string;
  annual_fee: number;
  welcome_bonus_value: number;
  welcome_bonus_points: number | null;
  first_year_value: number;
  cpp_cad: number | null;
  country: 'CA' | 'US';
  network: string;
  categories: string[];
  benefits: Benefits;
}

export function formatCurrency(value: number, country: 'CA' | 'US' = 'CA'): string {
  const prefix = country === 'US' ? 'US$' : 'CA$';
  return `${prefix}${Math.round(value).toLocaleString()}`;
}

/** One line of the Receipt: a human label, an amount, and whether it subtracts. */
export interface ReceiptLine {
  label: string;
  amount: number; // signed: fee lines are negative
  neg?: boolean;
}

/** The Receipt, stage one. Rebuild the SAME math the data pipeline uses to get
 *  first_year_value, line by line, straight from the slim payload:
 *    bonus = welcome_bonus_points × cpp_cad  (or the stored bonus value for
 *            cash-back / no-points cards)
 *    first_year_value = bonus − annual fee
 *  The slim payload does NOT carry first_year_fee, so on the handful of cards
 *  whose stored first_year_value already bakes in a waived first-year fee, the
 *  two derivable lines won't reconcile to the total. Rather than fake a line,
 *  we surface the honest remainder as "first-year fee adjustment" so the math
 *  on screen always sums to the published total. No earn line yet: per-category
 *  earn data isn't in this payload (that's Receipt stage two).
 *  This is the single source of truth for the receipt; the row renders THIS. */
export function receiptLines(c: SlimCard): ReceiptLine[] {
  const lines: ReceiptLine[] = [];
  const cpp = c.cpp_cad ?? 1.0;

  if (c.welcome_bonus_points && c.welcome_bonus_points > 0) {
    lines.push({
      label: `welcome bonus  ${c.welcome_bonus_points.toLocaleString()} pts × ${cpp}¢`,
      amount: c.welcome_bonus_value,
    });
  } else if (c.welcome_bonus_value > 0) {
    lines.push({ label: 'welcome bonus (cash value)', amount: c.welcome_bonus_value });
  }

  if (c.annual_fee > 0) {
    lines.push({ label: 'annual fee', amount: -c.annual_fee, neg: true });
  }

  // Honest reconciliation: whatever the pipeline's total minus what we can
  // derive here. Non-zero only when a first-year fee was waived (or on tiny
  // USD rounding). We label it plainly rather than pretend it's an earn line.
  const derived = lines.reduce((sum, l) => sum + l.amount, 0);
  const remainder = c.first_year_value - derived;
  if (Math.abs(remainder) >= 1) {
    lines.push({
      label: remainder > 0 ? 'first-year fee waived' : 'first-year fee adjustment',
      amount: remainder,
      neg: remainder < 0,
    });
  }

  return lines;
}
