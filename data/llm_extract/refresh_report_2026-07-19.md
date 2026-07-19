# Card-data refresh — 2026-07-19

## Context: this run followed a full local pass by one day

`CARDS_VERIFIED` was already bumped to `2026-07-18` yesterday by a local session
with full golden-source access (commit `204c300`, "194/194 cards vs golden
sources"). This cloud run repeats the same golden-source gap documented in the
2026-07-08 report: `data/raw/` is gitignored and has never been committed to
git, so a fresh cloud clone gets **zero** CA `.md` captures and **zero** US
Amex `.md` capture. Only `scrapers/detail_cache/` (the non-Amex US / Chase
source) is tracked in git and available here.

- **131 CA cards:** golden source `data/raw/cards/<slug>.md` — absent, 0 available.
- **22 US Amex cards:** golden source `data/raw/md/american-express-us.md` — absent.
- **41 US Chase cards:** golden source `scrapers/detail_cache/<slug>.txt` — fully available and used this run.

Per the runbook's escape hatch and the conservative rule, the 153 cards
without a source were left untouched. Nothing was fabricated or guessed to
fill the gap.

## What was checked: all 41 Chase-issued US cards

Fanned out 3 agents over the 41 Chase cards, each re-verifying annual fee,
signup bonus, foreign_transaction_fee, earn rates (including the "up to Nx
total" bundled-rate trap), key_perks, apply_url, and insurance figures
against `scrapers/detail_cache/<slug>.txt` — confirmed genuine (checked
size/md5, no cross-card contamination in this batch). Every finding below
was independently re-confirmed by direct reading of the source file before
being applied.

**Notable finding:** several fields changed in yesterday's local pass turned
out not to be supported by this exact tracked source file (which the
2026-07-18 commit message itself cites as one of its sources, "scraped
2026-06-17/18" — the same file). Those are reverted/corrected below.

### Changes applied (9 cards, 11 field fixes)

| Card | What changed |
|---|---|
| southwest-rapid-rewards-priority-credit-card | `insurance.purchase_protection` 3000 → 500 (the $3,000 figure belongs to Lost Luggage Reimbursement; source states Purchase Protection is $500/item) |
| ihg-one-rewards-traveler-credit-card | removed fabricated "Food delivery credits" and "Subscription perks" key_perks — source has zero DoorDash/Instacart/subscription content |
| british-airways-visa-signature-credit-card | removed fabricated "Food delivery credits" and "Subscription perks" key_perks — same, zero support in source |
| unitedsm-explorer-card | earn_rates "United Airlines purchases" 3x → 2x (source: "7x total = 5x MileagePlus member + 2x card"; 3x matched neither the card's own rate nor the bundled total) |
| united-questsm-card | earn_rates "United purchases" 4x → 3x (source: "8x total = 5x member + 3x card"); `insurance.purchase_protection` 1500 → 10000 (the 1,500 figure is the Trip Cancellation amount, not Purchase Protection, which source states as $10,000/item) |
| united-clubsm-card | earn_rates "United purchases" 5x → 4x (source: "9x total = 5x member + 4x card") |
| ink-business-premier-credit-card | removed fabricated "Chase Travel: 5%" earn rate — source describes only 2.5% (purchases ≥$5,000) and 2% (all other); no separate Chase Travel tier exists anywhere in source |
| marriott-bonvoy-boundless-credit-card | welcome bonus corrected from a flat "125,000 Marriott Bonvoy points" (unsupported — that figure appears nowhere in source) to the actual current offer: 3-5 Free Night Awards, source-stated total value up to 250,000 points, plus a $100 airline credit |
| marriott-bonvoy-bold-credit-card | welcome bonus corrected from a flat "60,000 Marriott Bonvoy points" (unsupported) to the actual current offer: 2 Free Night Awards, source-stated total value up to 100,000 points |
| aer-lingus-visa-signature-credit-card | key_perk "Companion Pass" → "Companion Ticket" (source's real benefit name; the old label implied the much larger Southwest-style Companion Pass benefit) |

### Held / unsure — left unchanged

- **world-of-hyatt-credit-card:** source's captured offer text explicitly reads "Offer ends February 26, 2026" — already past as of today (Jul 19, 2026), so the capture itself describes an expired promo. Same call as the 2026-07-08 run: left the stored 60,000-point bonus untouched rather than guess at whatever offer is live now.
- **chase-freedom-rise-credit-card / ink-business-unlimited-credit-card:** both carry `foreign_transaction_fee: false` plus a "No foreign transaction fee" key_perk, but neither's source page states an FX-fee position either way (no dedicated benefit tile, unlike sibling cards that explicitly disclose it), and both internally contradict the stored (unused/legacy) `benefits.no_fx_fee: false` field. This exact ambiguity was already flagged and held in the 2026-07-08 report; still unresolved, still held rather than guessed.
- **unitedsm-business-card / united-clubsm-business-card / unitedsm-explorer-card / ihg-one-rewards-traveler-credit-card:** "Food delivery credits" / "Subscription perks" key_perks map to an Instacart grocery-delivery credit (not DoorDash/restaurant delivery) in source for the United-branded cards that do have an Instacart tie-in — imprecise but not fabricated, per the 2026-07-08 call; left as-is. (The IHG Traveler and British Airways cards above are different: their sources have no Instacart/DoorDash/subscription content at all, which is why those two were corrected.)
- **aeroplan-card:** cached source is still Chase's general card-catalog listing page, not a dedicated Aeroplan detail page (same issue noted 2026-07-08). Only catalog-visible fields were checked; all matched. Key_perks "Priority Pass lounge access"/"Concierge service" remain unconfirmed by this source.
- **marriott-bonvoy-boundless / -bold's `benefits` object** (legacy field): `cards.ts` recomputes the live `Benefits` shown on the site via `textContains()` over key_perks/other text at normalization time — the raw `benefits` object stored in the JSON is not read directly for rendering, so a few stale-looking `benefits.*` flags elsewhere in the deck (noted by the audit) don't reach the live site and were not treated as bugs.

## Not checked this run — 153 cards, golden source unavailable

- 131 CA cards (`data/raw/cards/*.md` absent).
- 22 US Amex cards (`data/raw/md/american-express-us.md` absent).

No values were changed, added, or guessed for any of these 153 cards.

## Validation

- `node -e "JSON.parse(...)"` on both `canadian_cards_comprehensive.json` and `us_cards_comprehensive.json`: **both valid.**
- Card counts unchanged: CA 131, US 63.
- Earn-rate quality gate (≤40 chars / ≤7 words per category, no junk keys): **0 violations** across both files.
- FX fields: every CA card has `foreign_transaction_fee` set; no charger missing `_pct: 2.5`; no US card carries a leaked CA-only field (`welcome_bonus_points`, `welcome_bonus_value_cad`, `foreign_transaction_fee_pct`) — confirmed clean.
- No CA cash-back card mislabeled with a points welcome value: confirmed clean.
- `npx tsc --noEmit` (after `npm install`, needed since this container had no `node_modules`): **passes with 0 errors.**

## CARDS_VERIFIED stamp: NOT bumped

`src/data/cards.ts` `CARDS_VERIFIED` remains **`2026-07-18`** (set by yesterday's
local full pass), unchanged. This run re-verified 41 of 194 cards (21%) — the
same 79% CA + Amex gap as 2026-07-08 blocked full-deck coverage, so per the
runbook the stamp should not be bumped again today. It is not stale (1 day
old, 14-day cadence), so there's no urgency; the next run with real
`data/raw/` access should close the CA + Amex gap and re-verify the whole
deck.

## PR

Branch `card-refresh` pushed to origin. Compare URL:
https://github.com/mazim-lab/finterminal/compare/main...card-refresh?expand=1
