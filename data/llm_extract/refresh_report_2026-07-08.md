# Card-data refresh — 2026-07-08

## Headline: golden-source gap in this cloud checkout

`data/raw/` is gitignored (`.gitignore` line 9: `data/raw/`) and has **never been
committed to git** — `git log --all --diff-filter=A -- data/raw/` returns nothing.
It only exists on whatever machine captured it locally (per the runbook, that's a
Dropbox/OneDrive-synced working copy, populated by a real browser or the residential
Playwright pipeline). A fresh `git clone` in a cloud environment — this run included —
gets none of it.

That means, in this environment:
- **CA cards (131):** golden source `data/raw/cards/<slug>.md` — **absent, 0 available.**
- **US Amex cards (22):** golden source `data/raw/md/american-express-us.md` — **absent.**
- **US Chase cards (41):** golden source `scrapers/detail_cache/<slug>.txt` — this
  directory IS tracked in git and was fully available.

So **153 of 194 cards (79%) had zero usable golden source this run.** Per the runbook's
own escape hatch ("if a refresh needs new `.md` captures, the cron should STOP... rather
than fetch with WebFetch") and the conservative rule ("never guess... if you cannot
confirm, mark it UNSURE and leave the stored value"), those 153 cards were left
untouched. Nothing was fabricated or guessed to fill the gap; no WebFetch/WebSearch
substitute was used for CA welcome-bonus text at scale, since that would mean writing
131 cards' worth of numbers from a source other than "the card's own captured issuer
page," which isn't what this run is supposed to do.

**Recommendation:** run a local/interactive session (browser-capable) periodically to
refresh `data/raw/` and commit a durable copy of it somewhere cloud runs can reach (or
change the ignore rule for a read-only mirror), otherwise every cloud-cron card refresh
will keep hitting this same wall for CA + US Amex.

## What was actually checked: 41 Chase US cards

All 41 Chase-issued US cards were audited against their real `scrapers/detail_cache/<slug>.txt`
captures (confirmed genuine — not the 22047-byte Amex login-wall junk, and cross-checked
for byte-identical duplicate contamination via md5 grouping across all 203 cached files;
one contamination was found — `amazon-business-card.txt`, a card not in our dataset,
contained Chase Sapphire Reserve content instead of its own — which does not affect any
stored card here).

One source file, `aeroplan-card.txt`, turned out to be Chase's general card-catalog
listing page rather than a dedicated Aeroplan detail page, so verification of that card
was only partial; nothing was changed on it beyond what the catalog blurb could confirm
(all matched).

**Cards checked: 41 (all Chase US). Cards changed: 29. Cards confirmed unchanged (MATCH): 9.
Cards held for human review (UNSURE): 3.**

### Changes applied (29 cards, 31 total field fixes)

| Card | What changed |
|---|---|
| the-new-chase-sapphire-reserve-credit-card | `welcome_bonus` "100,000" → "125,000 points" (stale, disagreed with correct signup_bonus fields) |
| chase-sapphire-preferred-credit-card | `welcome_bonus` "100,000 (limited-time)" → "75,000 bonus points"; removed unsupported "Subscription perks" |
| chase-freedom-unlimited-credit-card | removed unsupported "Subscription perks" key_perk |
| chase-freedom-flex-credit-card | `signup_bonus`/`signup_bonus_formatted`/`signup_bonus_value_usd`/`signup_bonus_currency` were storing the earn-rate summary text (1,500 "points") instead of the real $200 bonus; corrected to match source + the card's own `welcome_bonus` field; removed unsupported "Subscription perks" |
| chase-freedom-rise-credit-card | same bug as Freedom Flex (signup_bonus fields held earn-rate text/nulls); corrected to the real $25 autopay statement credit; `welcome_bonus` was a fabricated "3% dining offer" not present anywhere in source, corrected; removed unsupported "Subscription perks" |
| unitedsm-explorer-card | **`annual_fee` $0 → $150** — source shows "$0 intro annual fee for the first year, then $150"; the stored value was the first-year waiver, not the ongoing fee; `welcome_bonus` stale (60,000) → 70,000 |
| united-questsm-card | `welcome_bonus` stale (70,000+500 PQP) → 80,000+3,000 PQP, matches signup_bonus_formatted |
| united-gatewaysm-card | `welcome_bonus` stale (40,000) → 30,000; "Free first checked bag" corrected to "2 checked bags after $10K annual spend" (source shows a conditional 2-bag benefit, not an unconditional first bag) |
| southwest-rapid-rewards-plus/priority/premier-credit-card (3 cards) | `welcome_bonus` on all three was stale/unsupported numbers (80k/90k/85k) that disagreed with the correct signup_bonus_formatted text (which already had the real Companion Pass + 20k/40k/30k offers); corrected to match |
| ihg-one-rewards-premier-credit-card | `welcome_bonus` stale ("up to 185,000") → 175,000 flat, matches signup_bonus_formatted |
| ihg-one-rewards-traveler-credit-card | `welcome_bonus` "up to 125,000" → "up to 120,000" (90k base + up to 30k additional per source = 120k, not 125k); added confirmed DashPass-related key_perks ("Subscription perks", "Food delivery credits") that were present on every sibling card but missing here |
| disney-inspire-visa-card | `welcome_bonus` stale ("$500 Offer...$200 statement credit") → "$600 Offer...$300 statement credit", matches signup_bonus 600 and source |
| disney-premier-visa-card | `foreign_transaction_fee` false → true; removed fabricated "No foreign transaction fee" key_perk — source's benefit list has no FX-fee-free section (unlike sibling Disney cards), and the record's own `benefits.no_fx_fee: false` already flagged this contradiction |
| disney-visa-card | same FX-fee fix as Disney Premier; also removed unsupported "Subscription perks" (this flat-1% base card has no subscription-tier content in source) |
| british-airways-visa-signature-credit-card | `signup_bonus`/`signup_bonus_value_usd` were null despite `signup_bonus_formatted` correctly saying "Earn 75,000 Avios" — filled in 75,000/75,000 to match; added "Travel Together Ticket" and "10% Off British Airways Flights" key_perks, both confirmed named benefit sections in source and present on this card but missing from storage |
| aer-lingus-visa-signature-credit-card | added "Companion Pass" and "Priority Boarding" key_perks, confirmed in source, missing from storage |
| iberia-visa-signature-credit-card | added "$1,000 Airfare Discount Voucher" and "10% discount on Iberia flights" key_perks, confirmed in source, missing from storage |
| prime-visa | `welcome_bonus` stale ("$200 Amazon Gift Card") → "$150 Amazon Gift Card", matches signup_bonus 150 and source |
| amazon-visa | removed unsupported "Food delivery credits" key_perk — no DoorDash/delivery content anywhere in source, likely copy-paste bleed from DoorDash/Instacart cards |
| doordash-rewards-mastercard | `signup_bonus_formatted` was storing the earn-rate summary text, not the bonus; corrected to "Free year of DashPass (a $96 value)" to match the card's own (already-correct) `welcome_bonus` field; set `signup_bonus_value_usd` to 96 per the source-stated $96 value |
| instacart-mastercard | `signup_bonus_formatted`/`welcome_bonus` said "$50 cash back" but source clearly shows an automatic $50 Instacart account credit, not cash back — corrected wording on both |
| sapphire-reserve-for-businesssm-credit-card | `welcome_bonus` stale (200,000) → 150,000, matches signup_bonus_formatted; removed "Lyft rides: 5x" from earn_rates (a time-limited promo through 9/30/27, not a standing rate); filled empty `insurance.purchase_protection` (120 days) and `insurance.trip_cancellation` ($10,000) from source |
| ink-business-unlimited-credit-card | signup bonus was $1,000 (unsupported — source clearly and repeatedly states $750; looks like it was mixed up with Ink Business Premier's real $1,000 bonus) — corrected to $750 across `signup_bonus_formatted`/`signup_bonus_value_usd`/`welcome_bonus`; removed "Lyft rides: 5%" time-limited promo from earn_rates |
| ink-business-preferred-credit-card | removed "Lyft rides: 5x" time-limited promo from earn_rates |
| ink-business-cash-credit-card | same $1,000→$750 signup-bonus fix and Lyft-promo removal as Ink Unlimited |
| unitedsm-business-card | fixed self-contradictory `benefits` flags (`no_fx_fee`, `car_rental_insurance`, `purchase_protection`, `extended_warranty`, `trip_cancellation`, `flight_delay` were all `false` while the correct top-level fields, the card's own `insurance` sub-object, and the source all confirm `true`); added confirmed "United Club lounge passes (2 per year)" key_perk, missing from storage |
| united-clubsm-business-card | `welcome_bonus` stale ("up to 110,000") → 100,000, matches signup_bonus_formatted; corrected "Free first checked bag" to "Free first and second checked bags" per source; added confirmed "United Club lounge membership" and "Premier Access travel services" key_perks, missing from storage |
| southwest-rapid-rewards-performance-business-credit-card | added confirmed "Preferred seat selection", "Group 5 boarding priority", "25% back on inflight purchases" key_perks, missing from storage |
| ihg-one-rewards-premier-business-credit-card | added confirmed "Automatic IHG Platinum Elite Status" and "Anniversary Free Night" key_perks, missing from storage |

### Confirmed unchanged (MATCH, 9 cards)

united-clubsm-card, marriott-bonvoy-bountiful-credit-card, slate-credit-card (see HOLD
note below on an unconfirmed FX-fee flag), southwest-rapid-rewards-premier-business-credit-card,
ink-business-premier-credit-card (financial fields only — see HOLD), plus the 4 remaining
Chase cards whose full record matched source with no discrepancies.

### Held / unsure — left untouched, needs human judgment (this run's Chase subset)

- **marriott-bonvoy-boundless-credit-card** and **marriott-bonvoy-bold-credit-card**:
  stored bonus is a flat points figure (125k / 60k), but the live source shows the offer
  has moved to a Free Night Award structure (5 Free Nights + $100 airline credit / 2 Free
  Nights) — a structural change, not just a number bump. Translating "Free Night Awards"
  into `signup_bonus_value_usd` is a judgment call; left as-is for a human to confirm and
  re-model.
- **world-of-hyatt-credit-card**: source's captured offer carries an explicit "Offer ends
  February 26, 2026" — already past as of this run (Jul 8, 2026) — so the captured page
  itself may be stale. Left the stored 60,000-point bonus untouched rather than guess at
  a live offer that this source can't confirm.
- **aeroplan-card**: source file is the wrong page type (catalog listing, not a detail
  page) — only the fields visible in the catalog blurb were checked (all matched); no
  changes made given the source's poor quality for this card.
- **chase-freedom-unlimited-credit-card / chase-freedom-flex-credit-card / slate-credit-card
  / ink-business-unlimited-credit-card / ink-business-cash-credit-card / ink-business-premier-credit-card**:
  each carries `foreign_transaction_fee: false` plus a "No foreign transaction fee"
  key_perk, but the source text for these specific cards never states an FX-fee position
  either way (no dedicated benefit tile, unlike sibling cards that explicitly advertise
  it) — and several of these records internally contradict themselves (`benefits.no_fx_fee: false`
  alongside `foreign_transaction_fee: false`). This is a real, likely bug, but since the
  source doesn't confirm which way is correct, nothing was changed — flagging for a human
  to check the pricing & terms page directly.
- A few "Food delivery credits" key_perks on United-branded cards (Explorer, Quest, United
  Club Business) map only to an Instacart grocery-delivery credit in source, not a
  DoorDash/restaurant-delivery credit — imprecise but not clearly fabricated, left as-is.

## Not checked this run (153 cards) — golden source unavailable

- **131 CA cards** — `data/raw/cards/*.md` absent (see gap explanation above).
- **22 US Amex cards** — `data/raw/md/american-express-us.md` absent. (The `scrapers/detail_cache/`
  Amex files are all the same 22,047-byte login-wall junk page per the runbook, confirmed
  again this run via md5 — 23 identical files.)

No values were changed, added, or guessed for any of these 153 cards. `last_verified`
dates on CA/Amex records were left untouched (they should not be bumped without an actual
source check).

## Validation

- `node -e "JSON.parse(...)"` on both `canadian_cards_comprehensive.json` and
  `us_cards_comprehensive.json`: **both valid.**
- Card counts unchanged: CA 131, US 63.
- Earn-rate quality gate (≤40 chars / ≤7 words per category, no junk keys): **0 violations**
  across all 63 US cards.
- No CA-only fields (`welcome_bonus_points`, `welcome_bonus_value_cad`,
  `foreign_transaction_fee_pct`) leaked onto any US card: **confirmed clean.**
- `npx tsc --noEmit`: **passes with 0 errors** (after running `npm install` — this
  container had no `node_modules`, which was producing unrelated phantom `Cannot find
  module 'react'/'next'` errors; those are gone post-install and unrelated to this
  refresh's data changes).

## CARDS_VERIFIED stamp: NOT bumped

`src/data/cards.ts` `CARDS_VERIFIED` remains **`2026-07-03`**, unchanged. Per the runbook,
this stamp should only be bumped "once verification has run across the whole deck." This
run verified 41 of 194 cards (21%) — the 131 CA cards and 22 US Amex cards that make up
the other 79% had no usable golden source in this cloud checkout. Bumping the stamp would
tell readers the whole deck was re-checked when it wasn't, so it was left as-is. The
homepage's "cards re-verified" stamp (14-day cadence) will read as aging/stale on its
normal schedule; a session with access to `data/raw/` (interactive/browser or a synced
capture) needs to close the CA + Amex gap before the stamp can honestly move.

## PR

Branch `card-refresh` pushed to origin. PR compare URL:
https://github.com/mazim-lab/finterminal/compare/main...card-refresh?expand=1
