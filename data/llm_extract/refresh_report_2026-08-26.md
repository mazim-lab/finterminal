# Card-data refresh — 2026-08-26

## Coverage

194 cards on file (131 CA + 63 US). **0 checked, 0 changed** this run.

This is the sixth consecutive cloud run to hit the same structural wall first flagged in
the cloud portion of the 2026-08-09 run (merged via commit `266233f`) and repeated on
2026-08-12 (PR #40), 2026-08-16 (PR #46), 2026-08-19 (PR #51), and 2026-08-23 (branch
`card-refresh-2026-08-23`, pushed with no changes):

- **CA cards (131):** golden source is `data/raw/cards/<slug>.md`. That directory lives
  under `data/raw/`, which is `.gitignore`d and has never been committed to any branch.
  This fresh cloud clone has none of those files. No CA card could be checked.
- **US Amex cards (22):** golden source is `data/raw/md/american-express-us.md`, under
  the same `data/raw/` gap — not present here either.
- **US non-Amex cards (41, Chase and others):** the one golden source tracked in git,
  `scrapers/detail_cache/<slug>.txt` (203 files present), was last updated 2026-07-14
  (commit `d1e7360`) — before the 2026-08-09 local full-deck run re-verified and corrected
  many of these same cards directly from chase.com and merged the results into `main`.
  Using this now-stale snapshot risks reverting fields the 2026-08-09 local run already
  fixed with fresher evidence (e.g. Sapphire Reserve's bonus drop from 125k to 100k,
  Ink Cash/Unlimited's $750→$1,000 bump, the World of Hyatt dispute settlement). Held
  rather than used, per the runbook's conservative rule and consistent with the
  2026-08-19/08-23 runs' reasoning.

**New this run:** while confirming the wall, I noticed `scrapers/detail_cache/` also
contains ~106 CA-bank-named `.txt` files (BMO, CIBC, TD, Tangerine, etc.) not mentioned in
prior reports. I read two of them (`bmo-cashback-mastercard.txt`,
`tangerine-money-back-credit-card.txt`) and confirmed they hold genuine, non-junk issuer
content (real welcome offers and earn rates), not the Amex-style login-wall duplicate. I
did **not** use them to verify CA cards this run: they are not the CA golden source this
routine is scoped to (`data/raw/cards/<slug>.md`), they were last touched the same
2026-07-14 commit as the US non-Amex files (pre-dating the 2026-08-09 local corrections),
and using an unassigned, six-week-stale source to touch 131 cards is a bigger deviation
than a single automated run should make unprompted. Flagging for a human decision instead
(see Recommendation).

No WebFetch/WebSearch attempt was made to route around the gap: the runbook reserves a
targeted WebSearch for filling one missing welcome-bonus figure on an otherwise-confirmed
card, not for re-deriving an entire deck from scratch, and issuer sites bot-block
`WebFetch` regardless.

## Schema / internal-consistency checks (no source needed)

Ran the source-free checks from runbook §3e directly against the stored JSON:
- Both JSON files parse cleanly (`node -e "JSON.parse(...)"`, CA and US); counts match
  (131 CA, 63 US).
- CA: every card has `foreign_transaction_fee` set; every card with
  `foreign_transaction_fee: true` has `foreign_transaction_fee_pct` set; no cash-back
  card carries a non-null `welcome_bonus_points`. **0 issues.**
- US: no card carries a CA-only field (`welcome_bonus_points`,
  `welcome_bonus_value_cad`, `foreign_transaction_fee_pct`). **0 issues.**
- Earn rates: 0 categories over 40 chars / 7 words; 0 known junk-pattern keys, both files.
- `npx tsc --noEmit` (after `npm install`, since `node_modules` was not present in this
  fresh container): clean, 0 errors.

## Changes

None. Nothing was source-confirmed this run, so nothing was written to either JSON file.

## Held (unresolved across multiple runs)

- **blue-business-plus-credit-card, business-green-rewards-card** (both US Amex):
  `foreign_transaction_fee: false` while `benefits.no_fx_fee: false` — an internal
  contradiction first flagged 2026-08-09. Still unresolved; still needs the US Amex
  golden source, unreachable from this container.
- All 194 cards otherwise, for the coverage reasons above.

## CARDS_VERIFIED

**Not bumped.** Stays `2026-08-09`, now **17 days old** — past the 14-day freshness
window, which closed 2026-08-23. The homepage's public "cards re-verified" stamp is now
rendering stale/red. This run verified nothing, so it does not get credit for a fresh
stamp.

## Recommendation

Six consecutive cloud runs (2026-08-09 cloud portion, 08-12, 08-16, 08-19, 08-23, now
08-26) have hit the identical `data/raw/` gitignore wall with no change to the underlying
setup. The public stamp has now actually gone stale as a direct result — this is no longer
a preventive warning, it is the outcome those warnings were about. Two independent choices
remain open for a human:

1. **Close the source gap for cloud runs.** Commit a redacted/trimmed copy of the CA `.md`
   captures and the US Amex `.md` somewhere not covered by `.gitignore` (or carve out an
   exception in `.gitignore` for those specific paths), so a fresh cloud clone has a real
   golden source to check against.
2. **Decide on the newly-found CA files in `scrapers/detail_cache/`.** They are real,
   non-junk content but six weeks stale and not the designated CA source — a human should
   decide whether to promote them to a fallback source (with dedup/staleness caveats) or
   leave them unused as this run did.
3. Absent either, this cron is a report-only placeholder between local full-deck runs, and
   the 14-day stamp cadence needs a human to run a local refresh before each deadline
   rather than relying on the cloud cron to catch it.

Prior open, unmerged `card-refresh*` PRs (#40 `card-refresh` 2026-08-12, #46
`card-refresh-2026-08-16`, #51 `card-refresh-2026-08-19`) remain safe to close without
merging, since none of them changed any card data either.
