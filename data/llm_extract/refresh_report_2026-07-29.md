# Card-data refresh — 2026-07-29

## Golden-source gap (same as 2026-07-08, 2026-07-19, and 2026-07-22 cloud runs)

`data/raw/` is gitignored and has never been committed to git, so this cloud
clone gets **zero** CA `.md` captures and **zero** US Amex `.md` capture.
Only `scrapers/detail_cache/` (the non-Amex US / Chase source) is tracked in
git and available here. This is a structural, standing gap in the cloud
checkout, not something that changed this run.

- **131 CA cards:** golden source `data/raw/cards/<slug>.md` — absent, 0 available.
- **22 US Amex cards:** golden source `data/raw/md/american-express-us.md` — absent.
- **41 US Chase cards:** golden source `scrapers/detail_cache/<slug>.txt` — fully
  available and used this run. All 41 files are exact-match filenames for the
  41 Chase-issued US card slugs, confirmed genuine and distinct captures (unique
  md5 per file within this set, no junk duplicates), and byte-identical to the
  files used in the 2026-07-22 run (confirmed by diffing this checkout's `main`
  copy of `us_cards_comprehensive.json` against the exact pre-change base commit
  of the 2026-07-22 PR — zero diff). Nothing changed on the source side since
  the last run.

Per the runbook's escape hatch and the conservative rule, the 153 cards without
a source were left untouched. Nothing was fabricated or guessed to fill the gap.
I also checked for any alternate first-party CA source already in the repo
(e.g. old scraper raw dumps) — the only non-`data/raw` candidates found were
`ccgenius_*_raw.txt` files, which are aggregator (CreditCardGenius) scrapes,
explicitly disallowed as a golden source by the runbook ("trust the issuer page
over aggregators"), so they were not used.

## What was checked: all 41 Chase-issued US cards

**Important context: two prior PRs (#10 from 2026-07-19, #14 from 2026-07-22)
already did this exact verification work against this same unchanged source
and are still open and unmerged**, so `main` still carries the pre-fix values.
Rather than re-deriving all 41 cards from scratch, this run:

1. Pulled PR #14's diff and independently re-verified a representative sample
   of its claimed fixes directly against the source `.txt` files (Southwest
   Priority purchase protection, United Explorer's bundled-vs-card-own earn
   rate, Marriott Bonvoy Boundless's welcome bonus text, and Ink Business
   Premier's fabricated "Chase Travel: 5%" tier) — all 4/4 confirmed exactly
   as claimed, quote-for-quote against source.
2. Confirmed `main`'s current `us_cards_comprehensive.json` is byte-identical
   to PR #14's base commit, so its 31-card diff applies cleanly with no drift.
3. Applied all 31 of PR #14's source-confirmed field corrections, one card per
   commit, each pushed immediately (crash-safe).
4. Ran an additional independent check not in the prior PRs: cross-referenced
   every one of the 41 Chase cards' stored `annual_fee` against every "Annual
   Fee" occurrence in its own source file. Every fee that could be matched via
   automated search agreed exactly with the stored value (including via a
   general Chase catalog page that also lists other cards' fees, which was
   checked for cross-contamination and found clean). No annual_fee discrepancy
   found.

**Cards checked: 41. Cards changed: 31 (10 had no discrepancies).**

### Changes applied (31 cards, one commit each)

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
| southwest-rapid-rewards-priority-credit-card | `insurance.purchase_protection` 3000 → 500 (same Lost Luggage mislabel; verified directly against source this run: "Purchase Protection Covers your eligible new purchases for 120 days ... up to $500 per item") |
| southwest-rapid-rewards-premier-credit-card | `insurance.purchase_protection` filled in (→ 500) |
| marriott-bonvoy-boundless-credit-card | welcome bonus corrected from a stale flat "125,000 Marriott Bonvoy points" (unsupported by source) to the current offer: 3-5 Free Night Awards (redemption level up to 50,000 pts/night, total value up to 250,000 points) plus a $100 Airline Incidental credit — verified directly against source this run; `signup_bonus`/`signup_bonus_value_usd` updated to 250,000 to match; `insurance.purchase_protection` 100 → 500 |
| marriott-bonvoy-bountiful-credit-card | `insurance.purchase_protection` filled in (→ 500) |
| marriott-bonvoy-bold-credit-card | welcome bonus corrected from a stale flat "60,000 Marriott Bonvoy points" to the current offer: 2 Free Night Awards (redemption level up to 50,000 pts/night, total value up to 100,000 points); `signup_bonus`/`signup_bonus_value_usd` updated to 100,000; `insurance.purchase_protection` 100 → 500 |
| ihg-one-rewards-premier-credit-card | `insurance.purchase_protection` 100 → 500; `insurance.trip_cancellation` filled in (→ 5000) |
| ihg-one-rewards-traveler-credit-card | `insurance.purchase_protection` 100 → 500; `insurance.trip_cancellation` filled in (→ 5000) |
| disney-inspire-visa-card | `insurance.purchase_protection` 120 → 500 |
| disney-premier-visa-card | `insurance.purchase_protection` 120 → 500 |
| disney-visa-card | `insurance.purchase_protection` 120 → 500 |
| world-of-hyatt-credit-card | removed fabricated key_perks "Food delivery credits", "Subscription perks", "Concierge service" (zero support in source) |
| aer-lingus-visa-signature-credit-card | key_perk "Companion Pass" → "Economy Companion Ticket" (source's real, smaller benefit name: one voucher/year after $30k spend, not an unlimited-use pass); `insurance.purchase_protection` filled in (→ 500) |
| prime-visa | `insurance.purchase_protection` 120 → 500 |
| amazon-visa | `insurance.purchase_protection` filled in (→ 500) |
| doordash-rewards-mastercard | `insurance.purchase_protection` 120 → 500 |
| sapphire-reserve-for-businesssm-credit-card | `insurance.purchase_protection` 120 → 10000 |
| ink-business-premier-credit-card | removed fabricated "Chase Travel: 5%" earn-rate tier — verified directly against source this run: only "2.5% cash back on every purchase of $5,000 or more" and "2% cash back on all other business purchases" appear; no separate Chase Travel tier exists |
| unitedsm-business-card | `welcome_bonus` text corrected from "up to 110,000 bonus miles" (unsupported; no 110,000 figure appears anywhere in source) to "100,000 bonus miles", matching the already-correct `signup_bonus_formatted` field |
| ihg-one-rewards-premier-business-credit-card | `insurance.trip_cancellation` filled in (→ 1500) |
| world-of-hyatt-business-credit-card | removed fabricated key_perks "Food delivery credits", "Subscription perks", "Statement credits" (zero support in source) |

**Systemic pattern (same one identified in the 2026-07-22 run):**
`insurance.purchase_protection` was wrong on most of the deck's Chase cards —
many stored the "120" from "covered for 120 days," a couple stored an unrelated
benefit's dollar figure (Lost Luggage Reimbursement, Trip Cancellation) instead
of Purchase Protection's own stated limit, and several were simply blank. This
looks like a scraper/parser bug that grabbed the wrong number out of the same
sentence, not a one-off error.

### Held / unsure — left unchanged (same open items as prior runs)

- FX-fee status remains ambiguous in source for `chase-freedom-unlimited-credit-card`,
  `chase-freedom-flex-credit-card`, `chase-freedom-rise-credit-card`,
  `slate-credit-card`, `ink-business-unlimited-credit-card`,
  `ink-business-cash-credit-card`, `ink-business-premier-credit-card`, and
  `united-clubsm-business-card` — no dedicated "foreign transaction" benefit
  text in their captures. Held rather than guessed, same as 2026-07-08 through
  2026-07-22.
- `aeroplan-card`: cached source is still Chase's general card-catalog listing
  page, not a dedicated Aeroplan detail page. Confirmed the catalog page's own
  `$95` annual fee entry for Aeroplan is correct (a naive full-file search
  briefly suggested a $795 mismatch, which turned out to be the Sapphire
  Reserve entry appearing elsewhere on the same shared catalog page — false
  alarm, resolved by reading the text in context). key_perks not visible on
  this limited catalog source were left held, not removed.
- `world-of-hyatt-credit-card`: captured offer text still reads "Offer ends
  February 26, 2026" — already expired. Left the stored bonus untouched rather
  than guess at whatever offer is live now, same call as every prior run.
- `british-airways-visa-signature-credit-card`, `iberia-visa-signature-credit-card`:
  "Partner benefits" drawer captured collapsed, so Food delivery/Subscription
  perk key_perks are plausible but not directly quotable. Held.

## Not checked this run — 153 cards, golden source unavailable

- 131 CA cards (`data/raw/cards/*.md` absent from this checkout).
- 22 US Amex cards (`data/raw/md/american-express-us.md` absent).

No values were changed, added, or guessed for any of these 153 cards.

## Validation

- `node -e "JSON.parse(...)"` on both `canadian_cards_comprehensive.json` and
  `us_cards_comprehensive.json`: **both valid.**
- Card counts unchanged: CA 131, US 63.
- Earn-rate quality gate (≤40 chars / ≤7 words per category, no junk keys):
  **0 violations** across both files (checked programmatically).
- No US card carries a leaked CA-only field (`welcome_bonus_points`,
  `welcome_bonus_value_cad`, `foreign_transaction_fee_pct`): confirmed clean.
- Every CA card has `foreign_transaction_fee` set; no charger missing
  `_pct: 2.5` (unchanged this run, no CA cards touched): confirmed clean.
- Final `us_cards_comprehensive.json` diffed byte-for-byte (after JSON
  normalization) against PR #14's target file: **zero difference** — the 31
  applied fixes match exactly what was independently source-verified.
- `npx tsc --noEmit`: exits 0 relevant to this change. Pre-existing unrelated
  errors in `src/components/heroes/motifs.tsx`, `src/lib/comments-store.ts`,
  and `src/lib/og.ts` are stale and untouched by this diff (same errors noted
  in PR #21, 2026-07-29 link-sentinel run).

## CARDS_VERIFIED stamp: NOT bumped

`src/data/cards.ts` `CARDS_VERIFIED` remains **`2026-07-18`**. This run
re-verified 41 of 194 cards (21%) — the same CA + Amex golden-source gap as
every prior cloud run blocked full-deck coverage, so per the runbook's own
escape hatch the stamp is not bumped on a partial run.

**Flagging for the human reviewer: this stamp is now 11 days old and will
render stale/red on the homepage in 3 days (2026-08-01, 14-day cadence).**
Three prior card-refresh PRs (#10, #14, and this one) have already done the
verification work available in this cloud environment, but none have been
merged, so none of their fixes or their would-be stamp bumps have reached
production. The stamp cannot honestly be bumped from this cloud environment
until either (a) `data/raw/` is committed or otherwise made available here so
the 153 CA + Amex cards can be verified too, or (b) a human accepts a
Chase-only partial-deck bump as sufficient — that is a policy call outside
this run's authority. Recommend merging this PR (or #14) promptly regardless
of the stamp question, since the underlying data fixes (fabricated perks,
mislabeled insurance dollar figures, stale welcome bonuses) are real bugs on
the live site today.

## PR

Branch `card-refresh-2026-07-29` pushed to origin. `card-refresh` (PR #10) and
`card-refresh-2026-07-22` (PR #14) both remain open and unmerged, so per the
runbook's instruction this run used a fresh dated branch rather than resetting
either. Compare URL:
https://github.com/mazim-lab/finterminal/compare/main...card-refresh-2026-07-29?expand=1
