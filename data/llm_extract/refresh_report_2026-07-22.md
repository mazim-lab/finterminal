# Card-data refresh — 2026-07-22

## Golden-source gap (same as 2026-07-08 and 2026-07-19 cloud runs)

`data/raw/` is gitignored and has never been committed to git, so this cloud
clone gets **zero** CA `.md` captures and **zero** US Amex `.md` capture.
Only `scrapers/detail_cache/` (the non-Amex US / Chase source) is tracked in
git and available here.

- **131 CA cards:** golden source `data/raw/cards/<slug>.md` — absent, 0 available.
- **22 US Amex cards:** golden source `data/raw/md/american-express-us.md` — absent.
- **41 US Chase cards:** golden source `scrapers/detail_cache/<slug>.txt` — fully
  available and used this run. Confirmed all 41 files are genuine, distinct captures
  (unique md5 per file, none of the known 22047-byte Amex login-wall junk pattern),
  and the tracked source files are byte-identical to the last time they were checked
  (2026-07-05), so nothing changed on the source side since the 2026-07-19 run.

Per the runbook's escape hatch and the conservative rule, the 153 cards without a
source were left untouched. Nothing was fabricated or guessed to fill the gap.

## What was checked: all 41 Chase-issued US cards

Fanned out 4 agents (~10 cards each) over all 41 Chase cards, each re-verifying
annual fee, signup bonus, foreign_transaction_fee, earn rates (including the
"up to Nx total" bundled-rate trap), key_perks (fabrication check), apply_url,
and insurance dollar figures against `scrapers/detail_cache/<slug>.txt`. Every
finding was required to be backed by an exact quote from the source file before
being applied.

**Cards checked: 41. Cards changed: 31 (10 had no discrepancies).**

### Changes applied (31 cards)

| Card | What changed |
|---|---|
| the-new-chase-sapphire-reserve-credit-card | `insurance.purchase_protection` 120 → 10000 (120 was the coverage-period days, not the dollar limit); `insurance.trip_cancellation` filled in (→ 10000) |
| chase-sapphire-preferred-credit-card | `insurance.purchase_protection` filled in (→ 500); `insurance.trip_cancellation` filled in (→ 10000) |
| chase-freedom-unlimited-credit-card | `insurance.purchase_protection` 120 → 500 (days-vs-dollars mislabel) |
| chase-freedom-flex-credit-card | `insurance.purchase_protection` 120 → 500 |
| chase-freedom-rise-credit-card | `insurance.purchase_protection` 120 → 500 |
| slate-credit-card | `insurance.purchase_protection` 120 → 500 |
| unitedsm-explorer-card | `earn_rates["United Airlines purchases"]` 3x → 2x (source: "7x total" = 5x MileagePlus member + 2x card); `insurance.purchase_protection` filled in (→ 10000) |
| united-questsm-card | `earn_rates["United purchases"]` 4x → 3x (source: "8x total" = 5x member + 3x card); `insurance.purchase_protection` filled in (→ 10000); key_perk "Free first checked bag" → "Free first and second checked bags" (understated the benefit) |
| united-gatewaysm-card | `insurance.purchase_protection` 120 → 500 |
| united-clubsm-card | `earn_rates["United purchases"]` 5x → 4x (source: "9x total" = 5x member + 4x card); `insurance.purchase_protection` and `insurance.trip_cancellation` filled in (→ 10000 each); key_perk "Free first checked bag" → "Free first and second checked bags" |
| southwest-rapid-rewards-plus-credit-card | `insurance.purchase_protection` 3000 → 500 (3,000 was the Lost Luggage Reimbursement figure) |
| southwest-rapid-rewards-priority-credit-card | `insurance.purchase_protection` 3000 → 500 (same Lost Luggage mislabel) |
| southwest-rapid-rewards-premier-credit-card | `insurance.purchase_protection` filled in (→ 500) |
| marriott-bonvoy-boundless-credit-card | welcome bonus corrected from a stale flat "125,000 Marriott Bonvoy points" (unsupported by source) to the current offer: 3-5 Free Night Awards (redemption level up to 50,000 pts/night, total value up to 250,000 points) plus a $100 Airline Incidental credit; `signup_bonus`/`signup_bonus_value_usd` updated to 250,000 to match; `insurance.purchase_protection` 100 → 500 |
| marriott-bonvoy-bountiful-credit-card | `insurance.purchase_protection` filled in (→ 500) |
| marriott-bonvoy-bold-credit-card | welcome bonus corrected from a stale flat "60,000 Marriott Bonvoy points" to the current offer: 2 Free Night Awards (redemption level up to 50,000 pts/night, total value up to 100,000 points); `signup_bonus`/`signup_bonus_value_usd` updated to 100,000; `insurance.purchase_protection` 100 → 500 |
| ihg-one-rewards-premier-credit-card | `insurance.purchase_protection` 100 → 500; `insurance.trip_cancellation` filled in (→ 5000) |
| ihg-one-rewards-traveler-credit-card | `insurance.purchase_protection` 100 → 500; `insurance.trip_cancellation` filled in (→ 5000) |
| disney-inspire-visa-card | `insurance.purchase_protection` 120 → 500 |
| disney-premier-visa-card | `insurance.purchase_protection` 120 → 500 |
| disney-visa-card | `insurance.purchase_protection` 120 → 500 |
| world-of-hyatt-credit-card | removed fabricated key_perks "Food delivery credits", "Subscription perks", "Concierge service" (zero support in source; only benefit tiles present are elite status, FX-free, contactless, travel/purchase protection, merchant offers, Pay Over Time) |
| aer-lingus-visa-signature-credit-card | key_perk "Companion Pass" → "Economy Companion Ticket" (source: a single annual voucher after $30k/year spend, not an unlimited-use companion pass); `insurance.purchase_protection` filled in (→ 500) |
| prime-visa | `insurance.purchase_protection` 120 → 500 |
| amazon-visa | `insurance.purchase_protection` filled in (→ 500) |
| doordash-rewards-mastercard | `insurance.purchase_protection` 120 → 500 |
| sapphire-reserve-for-businesssm-credit-card | `insurance.purchase_protection` 120 → 10000 |
| ink-business-premier-credit-card | removed fabricated "Chase Travel: 5%" earn-rate tier (source shows only 2.5% on purchases ≥$5,000 and 2% on all other; no separate Chase Travel tier exists) |
| unitedsm-business-card | `welcome_bonus` text corrected from "up to 110,000 bonus miles" (unsupported; no 110,000 figure appears anywhere in source) to "100,000 bonus miles", matching the already-correct `signup_bonus_formatted` field |
| ihg-one-rewards-premier-business-credit-card | `insurance.trip_cancellation` filled in (→ 1500) |
| world-of-hyatt-business-credit-card | removed fabricated key_perks "Food delivery credits", "Subscription perks", "Statement credits" (zero support in source — no delivery/subscription/statement-credit text anywhere in the capture) |

**Systemic pattern found and fixed:** `insurance.purchase_protection` was wrong
on most of the deck's Chase cards — many stored the "120" from "covered for 120
days," a couple stored an unrelated benefit's dollar figure (Lost Luggage
Reimbursement, Trip Cancellation) instead of Purchase Protection's own stated
limit, and several were simply blank. This looks like a scraper/parser bug that
grabbed the wrong number out of the same sentence, not a one-off error, and it
recurred across cards from several different card families (Sapphire, Freedom,
United, Southwest, Marriott, IHG, Disney, Amazon, DoorDash).

### Held / unsure — left unchanged, flagged for human review

- **chase-freedom-unlimited-credit-card, chase-freedom-flex-credit-card,
  chase-freedom-rise-credit-card, slate-credit-card:** all store
  `foreign_transaction_fee: false` plus a "No foreign transaction fee" key_perk,
  but the word "foreign" does not appear anywhere in any of these four cards'
  captured source text (checked via full-text search). This also conflicts with
  each record's own internal `benefits.no_fx_fee: false` field. Same open
  question flagged in the 2026-07-08 and 2026-07-19 runs, still unresolved —
  held rather than guessed either way.
- **ink-business-unlimited-credit-card, ink-business-cash-credit-card,
  ink-business-premier-credit-card, united-clubsm-business-card:** same FX-fee
  ambiguity — only a generic nav-carousel "No Foreign Transaction Fees" category
  link appears in these captures, no dedicated benefit tile or sentence for the
  card itself. Held.
- **aeroplan-card:** cached source is still Chase's general card-catalog listing
  page, not a dedicated Aeroplan detail page (same issue noted 2026-07-08 and
  2026-07-19). Only catalog-visible fields were checked and all matched
  (annual fee, signup bonus, 3x earn categories, "Free first checked bag").
  key_perks "Priority Pass lounge access", "Food delivery credits",
  "Subscription perks", and "Statement credits" are not visible on this limited
  source — held, not removed (a catalog page's silence isn't proof a real
  detail page wouldn't show them).
- **british-airways-visa-signature-credit-card, iberia-visa-signature-credit-card:**
  key_perks "Food delivery credits"/"Subscription perks" rely on a "Partner
  benefits" drawer that is captured collapsed (no expanded text) for these two
  cards, unlike the sibling Aer Lingus capture where the same drawer is expanded
  and shows a genuine DoorDash DashPass benefit. Plausible but not directly
  quotable for these two — held.
- **world-of-hyatt-credit-card:** the captured offer text explicitly reads
  "Offer ends February 26, 2026" — already expired as of this run (2026-07-22).
  Same call as the 2026-07-08 and 2026-07-19 runs: left the stored 60,000-point
  bonus untouched rather than guess at whatever offer is live now. (Note: the
  fabricated key_perks noted above were still removed — that finding is
  independent of the stale-offer question.)
- **marriott-bonvoy-bold-credit-card:** `earn_rates["All other purchases"]: "1x"`
  has no supporting quote in this capture (source lists only the bonus
  categories); left as-is since it isn't contradicted, just unverifiable from
  this source.
- **united-clubsm-card apply_url:** uses a `.../club-infinite` path that breaks
  the naming pattern of its sibling United cards; the plain-text scrape has no
  hrefs to verify against, so this could not be confirmed or corrected.
- **world-of-hyatt-business-credit-card:** `insurance.purchase_protection` (120)
  and `insurance.trip_cancellation` (1500) — the "Travel & Purchase Protection"
  tile is present in the capture but its expanded dollar-figure text was not
  captured; held rather than guessed.
- A few `insurance.mobile_insurance: "Yes"` fields (United Explorer, Quest,
  Club, Gateway) have no supporting cell-phone-protection text in their
  captures, but aren't contradicted either — left as-is.

## Not checked this run — 153 cards, golden source unavailable

- 131 CA cards (`data/raw/cards/*.md` absent from this checkout).
- 22 US Amex cards (`data/raw/md/american-express-us.md` absent).

No values were changed, added, or guessed for any of these 153 cards.

## Validation

- `node -e "JSON.parse(...)"` on both `canadian_cards_comprehensive.json` and
  `us_cards_comprehensive.json`: **both valid.**
- Card counts unchanged: CA 131, US 63.
- Earn-rate quality gate (≤40 chars / ≤7 words per category, no junk keys):
  **0 violations** across both files.
- No US card carries a leaked CA-only field (`welcome_bonus_points`,
  `welcome_bonus_value_cad`, `foreign_transaction_fee_pct`): confirmed clean.
- Every CA card has `foreign_transaction_fee` set; no charger missing
  `_pct: 2.5`: confirmed clean (unchanged this run, no CA cards touched).
- `npx tsc --noEmit` (after `npm install`, this container had no
  `node_modules`): **passes with 0 errors.**

## CARDS_VERIFIED stamp: NOT bumped

`src/data/cards.ts` `CARDS_VERIFIED` remains **`2026-07-18`**, unchanged. This
run re-verified 41 of 194 cards (21%) — the same CA + Amex golden-source gap
as the 2026-07-08 and 2026-07-19 runs blocked full-deck coverage, so per the
runbook's own escape hatch the stamp should not be bumped again on a partial
run. It is not stale (4 days old against a 14-day cadence), so there is no
urgency. The next run with real `data/raw/` access (a local session with the
claude-in-chrome browser, or the residential Playwright pipeline) should close
the CA + Amex gap and re-verify the whole deck end to end.

## PR

Branch `card-refresh-2026-07-22` pushed to origin (a separate branch from the
still-open, unmerged `card-refresh` branch / PR #10 from 2026-07-19, per the
runbook's instruction to avoid resetting an open PR). Compare URL:
https://github.com/mazim-lab/finterminal/compare/main...card-refresh-2026-07-22?expand=1
