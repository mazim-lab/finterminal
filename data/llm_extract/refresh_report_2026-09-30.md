# Card-data refresh — 2026-09-30

## Coverage

194 cards on file (131 CA + 63 US). As with every cloud run, only the **41 US Chase
cards** have a reachable golden source in this container
(`scrapers/detail_cache/<slug>.txt`, tracked in git). The remaining **153 cards (131 CA +
22 US Amex)** have no reachable golden source here.

- **CA cards (131):** golden source is `data/raw/cards/<slug>.md`. `data/raw/` is
  `.gitignore`d and confirmed absent from this checkout (`ls data/raw` fails). No CA card
  could be checked.
- **US Amex cards (22):** golden source is `data/raw/md/american-express-us.md`, same
  `data/raw/` gitignore wall. Not present here either.
- **US Chase cards (41):** `scrapers/detail_cache/<slug>.txt` (203 files total in the
  directory) is reachable. Last touched `f6be470` (2026-08-07), unchanged since. Of the
  203 files, 68 are byte-identical contaminated duplicates (grouped by md5); one of the
  41 target files (`the-new-chase-sapphire-reserve-credit-card.txt`) fell into a
  contaminated group (shares its hash with `amazon-business-card.txt` — both are a
  broken font/CSS shell, no real card content), so it was held. The other **40 files are
  genuine, uniquely-named captures of their own card's page** (verified by content, not
  filename) and were audited.

## Backlog check

Checked `git ls-remote --heads origin` for existing `card-refresh-*` branches (none found)
and the open-PR list via the GitHub API (5 open PRs, none card-related: #99 link
sentinel, #98/#95 sweet-spot freshness, #97 rate drift, #96 link sentinel). The
July-through-September backlog of unmerged card-refresh PRs noted in earlier reports has
since cleared. This run's branch and PR are not duplicates of anything currently open.

## Method

Fanned out 4 audit agents (~10 cards each) over the 40 trustworthy US-Chase cache files,
comparing stored `annual_fee`, `foreign_transaction_fee`, `key_perks`, `apply_url`, and
`earn_rates` against each card's own captured page text. Per the conservative rule, welcome
bonus dollar/point amounts were explicitly NOT flagged when they differed from the stale
(~7-month-old) cache, since Chase promos rotate constantly and the differences were
internally self-consistent in the stored data (expected promo drift, not extraction
errors). Every recommended fix below was independently re-verified by hand against the raw
source text before being applied.

## Changes made (7 cards, `src/data/us_cards_comprehensive.json`)

1. **aeroplan-card** — `annual_fee` $195 -> $95. Source's own "At A Glance" box states
   "Annual Fee$95†" for this card ($595 is the Aeroplan *Reserve* fee tier; $195 does not
   match anything on this card's page).
2. **ink-business-premier-credit-card** — removed fabricated earn rate `"Chase Travel
   purchases": "5%"`. The full 4,415-char source page describes only a flat two-tier
   structure: 2.5% on purchases of $5,000+, 2% on everything else. No Chase Travel
   category exists anywhere in the text.
3. **chase-sapphire-preferred-credit-card** — removed fabricated earn rate `"Gas, EV
   charging, vacation homes": "3x"` (the card's real category list is Chase Travel 5x,
   other travel 2x, dining 3x, online grocery 3x, select streaming 3x, all other 1x — no
   gas/EV/vacation-home bonus exists) and removed fabricated key perk "Travel program
   credit (NEXUS/Global Entry)" (0 hits for "Global Entry", "NEXUS", or "TSA PreCheck" in
   the source; that credit belongs to Sapphire *Reserve*, not Preferred).
4. **chase-freedom-rise-credit-card** — removed fabricated earn rate `"Dining, takeout &
   delivery (6 mo)": "3%"`. Source describes a single flat rate: "1.5% cash back on all
   purchases," repeated at-a-glance, in the rewards summary, and in terms. No dining
   bonus category exists for this card.
5. **unitedsm-explorer-card** — United earn rate 3x -> 2x. Classic "#1 trap": source
   states "7x total miles on United flights - 5x miles ... as a MileagePlus member, plus
   2x miles on entire United purchase." The card's own multiplier is 2x; stored 3x matched
   neither the card's real rate nor the bundled total.
6. **united-questsm-card** — United earn rate 4x -> 3x. Same trap: source states "8x
   total... 5x ... MileagePlus member, plus 3x miles on entire United purchase." Card's
   own rate is 3x.
7. **united-clubsm-card** — United earn rate 5x -> 4x. Same trap: source states "9x
   total... 5x ... MileagePlus member, plus 4x miles on entire United purchase." Card's
   own rate is 4x.

## Held (not changed)

- Every welcome-bonus dollar/point amount that differed from the stale cache across all
  40 cards (normal Chase promo rotation, not an extraction error).
- `chase-freedom-unlimited-credit-card` / other cards' `foreign_transaction_fee`: the
  cache's "No Foreign Transaction Fees" text on several cards is generic site-navigation
  boilerplate repeated identically across every card page (including ones that do charge
  FX), so it carries no evidentiary weight either way and was left as stored.
- A handful of low-confidence perk-taxonomy quibbles (e.g. whether a DashPass mention
  should count as "Subscription perks" on some cards, a possibly-dropped
  `welcome_bonus_conditions` on `aer-lingus-visa-signature-credit-card`, an unconfirmed
  "Concierge service" perk on `world-of-hyatt-credit-card`) — none rose to the bar of a
  clear, source-contradicted fact, so left untouched per the conservative rule.
- All 22 US Amex cards and all 131 CA cards — no reachable golden source in this
  container.

## Validation

- `python3 -c "import json; json.load(...)"` — both `canadian_cards_comprehensive.json`
  and `us_cards_comprehensive.json` parse cleanly.
- Earn-rate quality gate (categories <=40 chars / <=7 words): 0 violations across the US
  file.
- No CA cash-back card mislabeled with points; no CA-only field added to any US card
  (this run only edited existing US-schema fields).
- `npx tsc --noEmit`: pre-existing failures only (`next`, `@types/node`, and JSX intrinsic
  types are missing because `node_modules` is not installed in this checkout — confirmed
  identical error set with the change stashed out, i.e. unrelated to this edit).

## CARDS_VERIFIED

**Not bumped.** This run verified 40 of 194 cards. `src/data/cards.ts` is untouched.
