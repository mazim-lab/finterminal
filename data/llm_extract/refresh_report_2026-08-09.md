# Card-data refresh — 2026-08-09

## Coverage

194 cards checked (131 CA + 63 US). Only **41 of those 194** had a reachable golden
source in this cloud container this run — all 41 are the US Chase cards, verified
against `scrapers/detail_cache/<slug>.txt` (tracked in git).

The other **153 cards (131 CA + 22 US Amex)** have no reachable golden source here:
`data/raw/cards/*.md` (CA) and `data/raw/md/american-express-us.md` (US Amex) both live
under `data/raw/`, which is `.gitignore`d and was never committed. This cloud container
is a fresh clone with no prior local state, so that directory doesn't exist at all. This
is the same gap every cloud run has hit since 2026-07-08 (confirmed against the most
recent prior run, PR #31 / `card-refresh-2026-08-05`, which hit the identical wall).
Per the runbook's conservative rule, these 153 cards were left untouched rather than
guessed at, and **`CARDS_VERIFIED` was NOT bumped** (stays `2026-07-18`) — the full deck
was not verified this run, so the public "cards re-verified" stamp shouldn't claim
otherwise.

Three earlier `card-refresh*` branches (#10, #22, #31) are still open and unmerged
against `main`, so this run started from a clean `main` and re-derived several of the
same fixes those PRs already found, plus some new ones (see below). Worth closing the
stale duplicates once one card-refresh PR is merged.

## Changes (20 cards, all US Chase)

**Foreign transaction fee corrected** (was `false`; each card's own Chase pricing &
terms confirms the standard 3% FX fee, cross-checked against multiple independent
sources beyond the cached page, since the cached page itself was silent on the point).
The stored `false` also directly contradicted the same record's own
`benefits.no_fx_fee: false` on every one of these:
- Chase Freedom Unlimited, Chase Freedom Flex, Chase Freedom Rise, Slate, Ink Business
  Unlimited, Ink Business Cash

**Earn-rate trap fixed** (stored the inflated MileagePlus-bundled "total" rate instead
of the card's own base multiplier — confirmed directly from the cached source text,
which states both the "total" figure and the card-only figure separately):
- United Explorer 3x → 2x, United Quest 4x → 3x, United Club 5x → 4x
- Ink Business Premier: removed a fabricated "Chase Travel: 5%" tier (source shows only
  a 2.5%/$5,000+ and 2%-other two-tier structure)

**Fabricated key_perks removed** (unsupported by the card's own cached page — likely
cross-card contamination from a shared scrape/template):
- Aeroplan (Chase): removed "Priority Pass lounge access" (the phrase appears in the
  cache but is attributed to the Sapphire Reserve for Business blurb, not Aeroplan; also
  contradicted the card's own `benefits.lounge_access: false`)
- British Airways Visa Signature, Iberia Visa Signature: removed "Food delivery
  credits" / "Subscription perks"
- World of Hyatt (personal): removed "Concierge service" / "Food delivery credits" /
  "Subscription perks"
- World of Hyatt Business: removed "Food delivery credits" / "Subscription perks" /
  "Statement credits"
- UnitedSM Business, United ClubSM Business: removed "Food delivery credits"

**Free-checked-bag perk understated** (source describes a more generous benefit than
was stored):
- United Quest, United Club: "Free first checked bag" → "Free first and second checked
  bags"

**Welcome bonus restructured** (stored value was a stale flat-points figure; the card's
own cached page shows the current offer is a Free Night Award / free-night bundle
instead, with the source itself stating a total-value-in-points figure for the bundle):
- Marriott Bonvoy Boundless: was "125,000 Marriott Bonvoy points" → now describes the 5
  Free Night Award + $100 airline credit offer (source states combined value up to
  250,000 points)
- Marriott Bonvoy Bold: was "60,000 Marriott Bonvoy points" → now describes the 2 Free
  Night Award offer (source states combined value up to 100,000 points)
- World of Hyatt (personal): was "60,000 World of Hyatt points" → now describes the
  current tiered free-night offer (3 nights at $5k spend + 2 more at $15k spend, ends
  Feb 26, 2026). Left `signup_bonus` / `signup_bonus_value_usd` as `null` (unquantified)
  rather than invent a dollar figure, since the source states no single total-value
  number for this offer.

**Blank field filled from an already-correct sibling field:**
- Chase Freedom Unlimited: `signup_bonus` was `null` while `signup_bonus_formatted`
  ("$200 cash back") and `signup_bonus_value_usd` (200) were already correct.

**Benefits-field consistency fix:**
- Ink Business Premier: `benefits.no_fx_fee` was `false` while `foreign_transaction_fee`
  was (correctly) `false` — the two disagreed. Confirmed independently that Ink Premier
  does not charge a foreign transaction fee (it's one of Chase's premium no-FX-fee
  business products, alongside Ink Preferred), so `benefits.no_fx_fee` was corrected to
  `true` to match.

## Held (not changed)

- **blue-business-plus-credit-card, business-green-rewards-card** (both US Amex): same
  `foreign_transaction_fee: false` / `benefits.no_fx_fee: false` internal contradiction
  as the Chase cards above, but no golden source was reachable for Amex this run (see
  Coverage). Left as-is rather than guess which side is correct.
- **aeroplan-card**: the cached source (`scrapers/detail_cache/aeroplan-card.txt`) is
  actually the full Chase "All Credit Cards" listing page, not this card's own detail
  page — a wrong/sibling-page situation per runbook §3c. The listing page's Aeroplan
  blurb was enough to confirm the fee/bonus/earn-rate basics and catch the Priority Pass
  contamination (above), but not enough to confirm or deny "Food delivery credits",
  "Subscription perks", or "Statement credits" on `key_perks`, so those were left
  unchanged. `apply_url` also could not be checked (no raw links in the scrape).
- **united-clubsm-card**: `apply_url` uses a "club-infinite" slug that looks like it may
  be a legacy URL versus the "united-club" pattern on sibling United cards, but nothing
  in the cached text confirms or refutes it. Left unchanged.
- **ihg-one-rewards-premier-credit-card**: `signup_bonus_formatted` says "...first
  three months..." while the source and the `welcome_bonus` field both say "...first 3
  months...". Cosmetic wording only, not changed.
- **marriott-bonvoy-bold-credit-card**: `earn_rates["All other purchases"] = "1x"` is
  not explicitly restated in the source's visible marketing copy (only the 2x
  categories are listed there), but nothing contradicts it either. Left as-is.
- **131 CA cards + 22 US Amex cards**: no golden source reachable this run (see
  Coverage). Untouched.

## Validation

- Both card JSON files parse clean (`node -e "JSON.parse(...)"`, both files)
- Earn-rate quality gate (≤40 chars / ≤7 words per category): 0 violations
- No CA-only field (`foreign_transaction_fee_pct`, `welcome_bonus_points`,
  `welcome_bonus_value_cad`) was added to any US card
- CA file: byte-for-byte untouched this run (no source available)
- `npx tsc --noEmit`: clean, 0 errors (after `npm install`, since `node_modules` wasn't
  present in this fresh container)
- `CARDS_VERIFIED` in `src/data/cards.ts`: **left at `2026-07-18`** — not bumped, since
  the full deck wasn't verified this run

## Recommendation for a human reviewer

The recurring `data/raw/` gap means this cron can only ever refresh the 41 US-Chase
cards from a cloud container. Closing that gap (committing a redacted/trimmed version of
the CA `.md` captures and the US Amex `.md`, or moving them outside `.gitignore`) would
let this routine actually cover the other 153 cards it's meant to check twice weekly.
