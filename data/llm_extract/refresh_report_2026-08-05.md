# Card-data refresh — 2026-08-05

## Headline: golden-source gap in this cloud checkout persists

`data/raw/` is gitignored (`.gitignore` line 9: `data/raw/`) and has never been committed
to git. A fresh clone in this cloud environment gets none of it, same as every prior
cloud-cron run since 2026-07-08:

- **CA cards (131):** golden source `data/raw/cards/<slug>.md` — absent, 0 available.
- **US Amex cards (22):** golden source `data/raw/md/american-express-us.md` — absent.
- **US Chase cards (41):** golden source `scrapers/detail_cache/<slug>.txt` — tracked in
  git, fully available. All 41 files confirmed genuine (cross-checked against the known
  22047-byte Amex login-wall junk hash and against each other via md5 grouping; no
  contamination found among the 41 beyond one cosmetic/harmless case noted below).

So **153 of 194 cards (79%) had zero usable golden source this run.** Per the runbook's
escape hatch and the conservative rule, those 153 cards were left untouched — nothing
fabricated or guessed to fill the gap. `CARDS_VERIFIED` in `src/data/cards.ts` was **not**
bumped (still `2026-07-18`); the full deck was not verified, so the stamp should not claim
otherwise. This is the same call made on 2026-07-08, -19, -22, and -29.

**Note on the last four runs:** branches `card-refresh` (PR #10, Jul 19), `card-refresh-2026-07-22`
(PR #14), and `card-refresh-2026-07-29` (PR #22) are all still open and unmerged against
`main`. Because none of their fixes have landed, this run re-audited the same 41 Chase
cards from the same unfixed baseline and independently re-derived a very similar set of
corrections (Ink Business Premier's fabricated Chase Travel rate, IHG/Ink Business
fabricated perks, United Business bonus text) plus several new ones this pass caught that
the earlier runs didn't (the Freedom/Slate/Ink foreign-transaction-fee bug below, the
Marriott/Hyatt free-night-award bonuses, four currency mislabels). Recommend closing the
three stale duplicates once this PR (or whichever is merged) lands, and treating the
month-long backlog as a signal to review whether `data/raw/` needs a durable, cloud-reachable
mirror.

## What was checked: all 41 Chase US cards

Fanned out 4 parallel auditor agents (~10 cards each) against `scrapers/detail_cache/<slug>.txt`,
covering annual_fee, signup_bonus/signup_bonus_formatted/welcome_bonus text, foreign_transaction_fee,
earn_rates, key_perks (fabricated-perk check), and apply_url. Findings were then manually
cross-checked against a targeted WebSearch (Chase's own pricing & terms via secondary sources)
before any foreign_transaction_fee flip, per the conservative rule.

## Cards changed: 20 of 41 Chase cards

**Foreign transaction fee corrected (was `false`, all confirmed via WebSearch to charge Chase's
standard 3% FX fee, and the "No foreign transaction fee" key_perk was internally contradicted
by the card's own `benefits.no_fx_fee: false`):**
- `chase-freedom-unlimited-credit-card` — charges 3% FX fee (Chase's own pricing & terms).
- `chase-freedom-flex-credit-card` — charges 3% FX fee today; Chase has announced this drops
  to $0 starting Sep 20, 2026, but that hasn't taken effect as of this run's date.
- `chase-freedom-rise-credit-card` — charges 3% FX fee.
- `slate-credit-card` — charges 3% FX fee.
- `ink-business-unlimited-credit-card` — charges 3% FX fee (Chase reserves the FX waiver for
  Ink Preferred/Premier).
- `ink-business-cash-credit-card` — charges 3% FX fee.
- (`ink-business-premier-credit-card` was flagged for the same reason by one auditor pass but
  WebSearch confirmed it genuinely has $0 FX fee — left unchanged, only its earn-rate fix below
  was applied. Good example of why the search-confirm step matters before flipping a boolean.)

**Earn-rate trap (stored the inflated "total miles" figure that bundles MileagePlus member-status
bonus points, instead of the card's own base multiplier):**
- `unitedsm-explorer-card`: "United Airlines purchases" 3x → 2x.
- `united-questsm-card`: "United purchases" 4x → 3x.
- `united-clubsm-card`: "United purchases" 5x → 4x.
- `ink-business-premier-credit-card`: removed a fabricated "Chase Travel: 5%" earn-rate tier
  not supported anywhere in the source (only the 2.5%/2% cash-back tiers exist).

**Fabricated key_perks removed (no support in the card's own source; looks like stale
content bled in from a sibling card template):**
- `ihg-one-rewards-traveler-credit-card`: removed "Subscription perks" and "Food delivery
  credits" (no DashPass/subscription mention anywhere in source).
- `iberia-visa-signature-credit-card`: same two perks removed, same reason.
- `world-of-hyatt-credit-card`: same two perks removed, same reason.
- `aeroplan-card`: removed "Priority Pass lounge access" — contradicted the card's own
  `benefits.lounge_access: false`, and this $95 co-brand card does not include lounge access.

**Welcome-bonus text was an inflated "up to" bundle that didn't match the card's own base
bonus (the #1 trap):**
- `ihg-one-rewards-traveler-credit-card`: `welcome_bonus` said "up to 120,000 Bonus Points"
  while the card's own base bonus (already correct in `signup_bonus_formatted`) is 90,000 +
  a conditional up-to-30,000 kicker. `welcome_bonus` now matches.
- `unitedsm-business-card`: `welcome_bonus` said "up to 110,000 bonus miles" bundling an
  unrelated employee-card promo; source confirms the card's own bonus is 100,000 miles +
  2,000 PQP (already correct elsewhere in the record).

**Signup bonus was stale/restructured (source no longer offers what's stored):**
- `marriott-bonvoy-bold-credit-card`: was a flat "60,000 points" figure not found anywhere
  in the source. Current offer is 2 Free Night Awards (redemption level up to 50,000
  points/night, source-stated total value 100,000 points) after $1,000 spend in 3 months.
  Updated `signup_bonus`, `signup_bonus_formatted`, `signup_bonus_value_usd`, `welcome_bonus`.
- `marriott-bonvoy-boundless-credit-card`: same issue, was "125,000 points." Current offer
  is 5 Free Night Awards + $100 Airline Credit after $3,000 spend in 3 months, source-stated
  total value 250,000 points. Same four fields updated.
- `world-of-hyatt-credit-card`: was "60,000 points," not found in source. Current offer is
  up to 5 free nights via two spend thresholds ($5,000/3mo → 3 nights, $15,000/6mo → 2 more),
  redeemable at Category 1-4 hotels. The source states no total point or dollar value for
  this offer, so `signup_bonus`/`signup_bonus_value_usd` were left null rather than guessed;
  `signup_bonus_currency` set to `"nights"`; formatted text and `welcome_bonus` rewritten to
  describe the real structure.

**Currency mislabel (bonus is a gift card / statement credit, not points):**
- `disney-premier-visa-card`, `disney-inspire-visa-card`, `prime-visa`, `amazon-visa`:
  `signup_bonus_currency` was `"points"` on all four; corrected to `"cash"` (none of these
  bonuses involve points — Disney and Amazon issue gift cards/statement credits).

**Blank field filled from an already-correct sibling field:**
- `chase-freedom-unlimited-credit-card` and `ink-business-unlimited-credit-card`: `signup_bonus`
  was `null` while `signup_bonus_formatted`/`signup_bonus_value_usd` were already correct
  ($200 and $750 respectively); filled `signup_bonus` to match.

## Held / not applied

- `insurance` sub-object fields (`purchase_protection`, `trip_cancellation`, `mobile_insurance`
  dollar/day figures) were flagged by the auditor agents on roughly half the batch, but two
  agent passes disagreed with each other on the correct convention (one treated "120" as the
  right value, others treated it as a mixed-up day-count that should be a dollar figure).
  Traced the render path in `src/data/cards.ts`: this dict only feeds a lowercase keyword
  join used to derive `benefits.*` booleans, and the raw digit strings never match any of
  those keywords, so the field has zero effect on anything rendered on the site. Given the
  contradictory conventions found and zero user-facing impact, left this field alone this run
  rather than risk introducing a third, equally-arbitrary convention. Recommend a dedicated
  pass to standardize it (with the correct convention decided first) rather than ad hoc patches.
- `aeroplan-card`: the cached `detail_cache/aeroplan-card.txt` is Chase's general
  "All Credit Cards" listing page, not the card's own dedicated product page. annual_fee,
  signup bonus, and earn_rates cross-checked fine against the blurb it does contain, and the
  one clearly unsupported perk (lounge access) was removed, but the rest of `key_perks`
  couldn't be fully verified against a proper detail page. Recommend re-scraping
  `creditcards.chase.com/travel-credit-cards/aircanada/aeroplan` directly in a browser-capable
  session.
- `british-airways-visa-signature-credit-card` and a couple of others had an implausible
  `insurance.purchase_protection: "1"` value, but the source's protection-benefit drawer
  wasn't expanded in the cached scrape, so no source-backed number was available — left as is
  (also inside the out-of-scope `insurance` dict above).

## Validation

- `node -e "JSON.parse(...)"` — both `canadian_cards_comprehensive.json` and
  `us_cards_comprehensive.json` parse clean.
- Earn-rate quality gate (≤40 chars / ≤7 words per category key) — 0 violations across both
  files.
- CA file (untouched this run): all 131 cards have `foreign_transaction_fee` set, all FX
  chargers carry `foreign_transaction_fee_pct`, 0 cash-back cards mislabeled with a points
  value — all pre-existing from the 2026-07-18 pass, confirmed still clean.
- `npx tsc --noEmit` — clean, 0 errors (project dependencies had to be installed first via
  `npm install`; this container started with no `node_modules`, which had made an initial
  `tsc` run report ~10,600 spurious "cannot find module react/next" errors unrelated to any
  card-data change — resolved by installing, not a real issue).
- `CARDS_VERIFIED` in `src/data/cards.ts` left at `2026-07-18` — not bumped, since 153 of
  194 cards (CA + US Amex) still have no reachable golden source in this environment.

## Recommendation (repeated from prior runs)

Run a local/interactive session (browser-capable) to refresh `data/raw/` and commit a
durable, cloud-reachable copy (or adjust the ignore rule for a read-only mirror), otherwise
every cloud-cron card refresh keeps hitting this same 79%-of-the-deck wall. Separately: three
open, unmerged card-refresh PRs (#10, #14, #22) are stacking up without human review — worth
closing the stale ones once one refresh (this one or a consolidated pass) is merged, so future
runs stop re-deriving the same fixes against an unfixed `main`.
