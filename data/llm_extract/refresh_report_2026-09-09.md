# Card-data refresh — 2026-09-09

## Coverage

194 cards checked (131 CA + 63 US). Only **41 of those 194** had a reachable golden
source in this cloud container this run — all 41 are the US Chase cards, verified
against `scrapers/detail_cache/<slug>.txt` (tracked in git, not gitignored).

The other **153 cards (131 CA + 22 US Amex)** have no reachable golden source here:
`data/raw/cards/*.md` (CA) and `data/raw/md/american-express-us.md` (US Amex) both live
under `data/raw/`, which is `.gitignore`d and was never committed. This cloud container is
a fresh clone with no prior local state, so that directory doesn't exist at all
(`find data/raw` confirms it). This is the same structural wall every cloud run has hit
since 2026-07-08, most recently PR #40 (`card-refresh`, 2026-08-12, 0 cards checked). Per
the runbook's conservative rule, these 153 cards were left untouched rather than guessed
at.

The 41 Chase cards were verified by fanning out 4 auditor subagents (~10-11 cards each)
against their own cached issuer pages, cross-checking every `annual_fee`, `signup_bonus` /
`signup_bonus_formatted` / `signup_bonus_value_usd`, `foreign_transaction_fee`,
`earn_rates`, `key_perks`, and `benefits` field. All 41 cache files were confirmed to be
the correct card's own page (no wrong-card or junk/login-wall captures found this run).

An open PR (#40, branch `card-refresh`) already exists from a prior run that found 0
changes; per the runbook this run used a dated branch (`card-refresh-2026-09-09`) instead
of resetting it. A human should close #40 as superseded once this PR is reviewed.

## Changes (22 cards, all US Chase)

**Stale signup bonuses corrected** (issuer page shows a different current offer than
stored; `signup_bonus`, `signup_bonus_formatted`, `signup_bonus_value_usd`, and — where it
duplicated the stale text — `welcome_bonus` were all updated together):
- Chase Sapphire Reserve: 100,000 → 125,000 points
- United Explorer: 50,000 → 70,000 miles
- United Quest: 60,000 + 500 PQP → 80,000 + 3,000 PQP
- Southwest Rapid Rewards Plus: 50,000 pts/$1,000 spend → 20,000 pts/$3,000 spend, plus a
  Companion Pass through 2/28/27 that was missing entirely
- Southwest Rapid Rewards Priority: 60,000 pts/$2,000 spend → 40,000 pts/$5,000 spend +
  Companion Pass through 2/28/27
- Southwest Rapid Rewards Premier: 55,000 pts/$1,500 spend → 30,000 pts/$4,000 spend +
  Companion Pass through 2/28/27
- Marriott Bonvoy Boundless: 4 Free Night Awards (200,000 pts) → 5 Free Night Awards
  (250,000 pts) + $100 airline credit
- Marriott Bonvoy Bold: flat 45,000-point bonus → 2 Free Night Awards (100,000 pts) — the
  stored offer *type* itself was wrong, not just the number
- IHG One Rewards Premier: 140,000 pts/$3,000 spend → 175,000 pts/$5,000 spend
- IHG One Rewards Traveler: 80,000 pts (+ a fabricated "add an authorized user" bonus that
  isn't on the page at all) → up to 120,000 pts (90,000 base + up to 30,000 from a 3X
  bonus-category promo), authorized-user bonus removed
- Disney Inspire Visa: "$500 Offer" ($300 gift card + $200 credit) → "$600 Offer" ($300
  gift card + $300 credit)
- Chase Sapphire Reserve for Business: 200,000 pts/$30,000 spend/6mo → 150,000 pts/
  $20,000 spend/3mo (independently corroborated by the "all cards" listing snapshot found
  inside `aeroplan-card.txt`)
- Ink Business Unlimited: $1,000 cash back → $750 cash back/$6,000 spend
- Ink Business Cash: `signup_bonus` was `null` (with a stale $1,000 in
  `signup_bonus_value_usd`/`signup_bonus_formatted`) → $750 cash back/$6,000 spend,
  consistent across all three fields
- World of Hyatt Business: 70,000 pts/$7,000 spend → 60,000 pts/$5,000 spend

**Earn-rate "bundled total" trap fixed** (source advertises an inflated "up to Nx total"
that bundles a separate MileagePlus-member elite bonus on top of the card's own rate; the
stored data had captured the wrong portion):
- United Explorer: "United Airlines purchases" 3x → 2x (source: 5x MileagePlus-member base
  + 2x card = "7x total")
- United Quest: "United purchases" 4x → 3x (5x base + 3x card = "8x total")
- United Club: "United purchases" 5x → 4x (5x base + 4x card = "9x total")

**Unsupported / fabricated earn-rate categories removed** (not present anywhere in the
card's own current source text):
- Chase Sapphire Preferred: removed "Gas, EV charging, vacation homes: 3x" (no such
  category on the current page; source lists Chase Travel, other travel, dining, online
  grocery, streaming, and the base rate only)
- Chase Freedom Rise: removed "Dining, takeout & delivery (6 mo): 3%" (source states only
  a flat 1.5% cash back with no bonus category anywhere)
- Ink Business Premier: removed "Chase Travel purchases: 5%" (source's two-tier structure
  is 2.5% on $5,000+ purchases and 2% on everything else — no travel bonus tier exists)

**Fabricated key_perks removed:**
- Chase Sapphire Preferred: removed "Travel program credit (NEXUS/Global Entry)" — that
  benefit belongs to the Reserve card, not Preferred; looks like copy-paste bleed-over
- Southwest Rapid Rewards Premier: removed "Statement credits" — no such benefit appears
  anywhere on the card's own page

**Fabricated `benefits.flight_delay: true` corrected to `false`** (source's expanded
insurance/protection section explicitly enumerates every covered benefit — Baggage Delay,
Purchase Protection, Extended Warranty, Trip Cancellation, Travel Accident, Auto Rental —
and Flight Delay Insurance is not among them on any of these four cards):
- Amazon Prime Visa, Amazon Visa, Aer Lingus Visa Signature, Chase Sapphire Reserve for
  Business

## Held (not changed)

- **World of Hyatt (personal) card's welcome offer**: the card's live offer switched from
  a 75,000-point bonus to a Free Nights structure ("up to 5 free nights: 3 after $5,000
  spend + 2 after $15,000 spend, ends Feb 26 2026") — clearly confirmed by the source, but
  this dataset's `normalizeUS()` logic in `cards.ts` infers cash-vs-points bonus type and
  the displayed dollar value from `signup_bonus_currency`/`signup_bonus_formatted` text
  patterns that assume a "points", "miles", or "cash" currency. Setting
  `signup_bonus_currency` to anything else (e.g. "nights") risks the parser
  misinterpreting the `$5,000`/`$15,000` spend thresholds embedded in the offer text as a
  cash bonus amount, silently displaying a wrong dollar figure. Since fixing this properly
  needs a schema/parsing change in `cards.ts` (out of scope for a data-only refresh run),
  the entire signup-bonus record for this card was left untouched rather than risk a
  worse, silently-wrong display. Flagging for a human to add "nights"-offer support to
  `normalizeUS()`, then re-run the refresh on this one card.
- **Ink Business Premier `benefits.mobile_insurance: true`**: possibly unsupported (no
  mobile-protection benefit found in this capture), but the cache file is a truncated,
  single-line, JS-collapsed capture missing the expanded "Travel & purchase coverage"
  overlay that fuller sibling captures include — held rather than flagged as confirmed
  fabrication, since the source is incomplete rather than contradictory.
- **`foreign_transaction_fee` on several cards** (Chase Freedom Unlimited, Freedom Flex,
  Freedom Rise, Slate, Ink Business Cash, Ink Business Premier, United Club Business,
  Aeroplan): none of these cached pages state an explicit per-card FX-fee policy (only
  generic sitewide nav boilerplate that appears identically across cards regardless of
  actual policy) — left unchanged rather than guess.
- **`aeroplan-card`**: the cached source is Chase's generic "All Credit Cards" listing
  page rather than a dedicated Aeroplan product page. Its Aeroplan blurb was detailed
  enough to confirm annual fee, signup bonus, and earn rates (all already correct), but
  not enough to verify `foreign_transaction_fee` or a couple of minor perks — those pieces
  held.
- **`united-clubsm-card` `apply_url`**: uses a legacy "club-infinite" slug (the card was
  previously marketed as "United Club Infinite Card"); plausible rather than clearly
  wrong, and unverifiable without a live fetch. Flagged for a human sanity check, not
  changed.
- **131 CA cards + 22 US Amex cards**: no golden source reachable this run (see Coverage).
  Untouched.

## Validation

- Both card JSON files parse clean (`node -e "JSON.parse(...)"`, both files)
- Card counts unchanged: 131 CA, 63 US
- Earn-rate quality gate (≤40 chars / ≤7 words per category, no junk patterns): 0
  violations across the US file
- No shared/contaminated `earn_rates` blob found between any two unrelated cards
- No CA-only field (`foreign_transaction_fee_pct`, `welcome_bonus_points`,
  `welcome_bonus_value_cad`) was added to any US card
- CA file: byte-for-byte untouched this run (no source available)
- `npx tsc --noEmit`: clean, 0 errors (required `npm ci` first — `node_modules` wasn't
  present in this fresh container)
- Diff confirmed exactly 22 US cards changed, all issuer `Chase`, zero `American Express`
  cards touched

## CARDS_VERIFIED

**Not bumped.** Stays at `2026-08-09` — now **31 days** past that stamp, well beyond the
14-day freshness window the homepage `VerifiedStamp` uses, so the public "cards
re-verified" badge is currently rendering stale/red. This run verified only 41 of 194
cards (21% of the deck); per the runbook, the stamp should only move once the *whole* deck
has been checked, and the CA + US-Amex majority (153 cards) could not be reached from this
cloud container. Bumping the stamp now would overstate what was actually verified.

## Recommendation for a human reviewer

This is now the **third consecutive cloud run** (following 2026-08-05 and 2026-08-12) to
hit the identical `data/raw/` wall and leave `CARDS_VERIFIED` stale. The stamp has not
moved since the last full local run on 2026-08-09 — 31 days ago. Closing the `data/raw/`
gitignore gap (committing a redacted/trimmed copy of the CA `.md` captures and the US Amex
`.md` somewhere not gitignored, or giving the cloud cron a way to fetch them) would let
this twice-weekly routine actually cover the other 153 cards it's meant to check, instead
of only ever refreshing the same 41 US Chase cards. Until that's fixed, this cron cannot
keep the public stamp fresh on its own — a periodic manual/local full-deck run is needed to
do that.

Also: PR #40 (branch `card-refresh`, opened 2026-08-12) is a stale duplicate with 0
changes — safe to close once this PR is merged.
