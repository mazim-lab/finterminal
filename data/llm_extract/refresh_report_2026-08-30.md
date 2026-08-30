# Card-data refresh — 2026-08-30

## Coverage

194 cards on file (131 CA + 63 US). **0 checked, 0 changed** this run.

This is the seventh consecutive cloud run to hit the same structural wall first flagged in
the cloud portion of the 2026-08-09 run (merged via commit `266233f`) and repeated on
2026-08-12 (PR #40), 2026-08-16 (PR #46), 2026-08-19 (PR #51), 2026-08-23 (branch
`card-refresh-2026-08-23`, no changes), and 2026-08-26 (PR #62, no changes):

- **CA cards (131):** golden source is `data/raw/cards/<slug>.md`. That directory lives
  under `data/raw/`, which is `.gitignore`d and has never been committed to any branch.
  This fresh cloud clone has none of those files (confirmed: `data/raw/` does not exist in
  this container at all). No CA card could be checked.
- **US Amex cards (22):** golden source is `data/raw/md/american-express-us.md`, under the
  same `data/raw/` gap — not present here either.
- **US non-Amex cards (41, Chase and others):** the one golden source tracked in git,
  `scrapers/detail_cache/<slug>.txt` (203 files present), was last meaningfully updated
  2026-07-14 (commit `d1e7360`) — before the 2026-08-09 local full-deck run re-verified and
  corrected many of these same cards directly from chase.com and merged the results into
  `main`. Using this now six-week-stale snapshot risks reverting fields the 2026-08-09 local
  run already fixed with fresher evidence. Held rather than used, per the runbook's
  conservative rule and consistent with every prior run's reasoning since 2026-08-19.

No WebFetch/WebSearch attempt was made to route around the gap: the runbook reserves a
targeted WebSearch for filling one missing welcome-bonus figure on an otherwise-confirmed
card, not for re-deriving an entire deck from scratch, and issuer sites bot-block `WebFetch`
regardless.

## Schema / internal-consistency checks (no source needed)

Ran the source-free checks from runbook §3e directly against the stored JSON:
- Both JSON files parse cleanly (`node -e "JSON.parse(...)"`, CA and US); counts match
  (131 CA, 63 US).
- CA: every card has `foreign_transaction_fee` set; every card with
  `foreign_transaction_fee: true` has `foreign_transaction_fee_pct` set; no cash-back card
  carries a non-null `welcome_bonus_points`. **0 issues.**
- US: no card carries a CA-only field (`welcome_bonus_points`, `welcome_bonus_value_cad`,
  `foreign_transaction_fee_pct`). **0 issues.**
- Earn rates: 0 categories over 40 chars / 7 words; 0 known junk-pattern keys, both files.
- `npx tsc --noEmit` (after `npm install`, since `node_modules` was not present in this
  fresh container): clean, 0 errors.

## Changes

None. Nothing was source-confirmed this run, so nothing was written to either JSON file.

## Held (unresolved across multiple runs)

- All 194 cards, for the coverage reasons above — same as every cloud run since 2026-08-09.

## CARDS_VERIFIED

**Not bumped.** Stays `2026-08-09`, now **21 days old** — 7 days past the 14-day freshness
window, which closed 2026-08-23. The homepage's public "cards re-verified" stamp has been
rendering stale/red for a week. This run verified nothing, so it does not get credit for a
fresh stamp.

## Recommendation (unchanged, now overdue)

Seven consecutive cloud runs (2026-08-09 cloud portion, 08-12, 08-16, 08-19, 08-23, 08-26,
now 08-30) have hit the identical `data/raw/` gitignore wall with no change to the underlying
setup, and the public stamp has now been visibly stale for a full week with no local run to
cover it. This is no longer a preventive warning; it is an ongoing outage in the routine's
one job. A human needs to pick one:

1. **Close the source gap for cloud runs.** Commit a redacted/trimmed copy of the CA `.md`
   captures and the US Amex `.md` somewhere not covered by `.gitignore` (or carve out a
   `.gitignore` exception for those specific paths), so a fresh cloud clone has a real golden
   source to check against.
2. **Decide on the CA files already sitting in `scrapers/detail_cache/`** (first surfaced
   2026-08-26): real, non-junk BMO/CIBC/TD/Tangerine content, but six-plus weeks stale and
   not the designated CA source. Promote to an explicit fallback (with dedup/staleness
   caveats), or leave unused.
3. Absent either, this cron is a report-only placeholder between local full-deck runs, and
   the 14-day stamp cadence needs a human to run a local refresh before each deadline.

Separately: the open `card-refresh*` PRs (#40 from 08-12, #51 from 08-19, #62 from 08-26)
are all unmerged and all changed zero card data — this run's predecessor already flagged
them as safe to close. They remain open, and a fourth near-identical PR is being opened by
this run. A human closing the stale three (or merging one as the placeholder and closing the
rest) would stop the pile-up; none of them carry data worth preserving individually.
