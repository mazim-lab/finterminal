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
