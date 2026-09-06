# Card-data refresh — 2026-09-06

## Coverage

194 cards on file (131 CA + 63 US). **0 checked, 0 changed** this run.

This is the ninth consecutive cloud run to hit the same structural wall first flagged in
the cloud portion of the 2026-08-09 run (merged via commit `266233f`) and repeated on
2026-08-12 (PR #40), 2026-08-16 (PR #46), 2026-08-19 (PR #51), 2026-08-23 (branch
`card-refresh-2026-08-23`, no PR), 2026-08-26 (PR #62), and 2026-08-30 (PR #68), all with
zero data changes:

- **CA cards (131):** golden source is `data/raw/cards/<slug>.md`. That directory lives
  under `data/raw/`, which is `.gitignore`d and has never been committed to any branch.
  Confirmed again this run: `data/raw/` does not exist anywhere in this fresh cloud clone
  (`git log --all -- data/raw` returns nothing). No CA card could be checked.
- **US Amex cards (22):** golden source is `data/raw/md/american-express-us.md`, under the
  same `data/raw/` gap — not present here either.
- **US non-Amex cards (41, Chase and others):** the one golden source tracked in git,
  `scrapers/detail_cache/<slug>.txt` (203 files present), was last touched 2026-07-29
  (commit `49441e5`, an unrelated news commit that happened to add/reorganize cache files)
  — over five weeks before this run, and still well after the 2026-08-09 local full-deck
  verification that re-checked and corrected many of these same cards directly against
  chase.com. Using this cache now risks reverting fields the 2026-08-09 local run already
  fixed with fresher, more authoritative evidence (confirmed by spot-check: current
  `United QuestSM Card` / `United ClubSM Card` earn rates in `us_cards_comprehensive.json`
  already differ from what the cache-based 2026-08-09 cloud pass had proposed, meaning the
  local run's numbers won out and are newer than the cache). Held rather than used, per the
  runbook's conservative rule and consistent with every prior run's reasoning since
  2026-08-19.

No WebFetch/WebSearch attempt was made to route around the gap: the runbook reserves a
targeted WebSearch for filling one missing welcome-bonus figure on an otherwise-confirmed
card, not for re-deriving an entire deck from scratch, and issuer sites bot-block `WebFetch`
regardless.

## Schema / internal-consistency checks (no source needed)

Ran the source-free checks from runbook §3e directly against the stored JSON:
- Both JSON files parse cleanly (`node -e "JSON.parse(...)"`), counts match (131 CA, 63 US).
- CA: every card has `foreign_transaction_fee` set; every card with
  `foreign_transaction_fee: true` has `foreign_transaction_fee_pct` set; no cash-back card
  carries a non-null `welcome_bonus_points`. **0 issues.**
- US: no card carries a CA-only field (`welcome_bonus_points`, `welcome_bonus_value_cad`,
  `foreign_transaction_fee_pct`). **0 issues.**
- Earn rates: 0 categories over 40 chars / 7 words; 0 known junk-pattern keys, both files.
- `npx tsc --noEmit` (after `npm install`, `node_modules` not present in this fresh
  container): clean, 0 errors.

## Changes

None. Nothing was source-confirmed this run, so nothing was written to either JSON file.

## Held (unresolved across multiple runs)

- All 194 cards, for the coverage reasons above — same as every cloud run since 2026-08-09.

## CARDS_VERIFIED

**Not bumped.** Stays `2026-08-09`, now **28 days old** — 14 days past the 14-day
freshness window, which closed 2026-08-23. The homepage's public "cards re-verified" stamp
has been rendering stale/red for two weeks. This run verified nothing, so it does not get
credit for a fresh stamp.

## Open duplicate PRs (unchanged advice, now four deep)

Four open `card-refresh*` PRs carry zero card-data changes and are safe to close without
losing anything: #40 (08-12), #46 (08-16), #51 (08-19), #62 (08-26). (#68 from 08-30 is
also report-only and in the same boat, though it wasn't listed as a target for closing in
the prior report.) This run opens a fifth near-identical report-only PR rather than closing
the others itself, since closing others' PRs is outside this routine's mandate.

## Recommendation (unchanged, now two and a half weeks overdue)

Nine consecutive cloud runs (2026-08-09 cloud portion, 08-12, 08-16, 08-19, 08-23, 08-26,
08-30, now 09-06) have hit the identical `data/raw/` gitignore wall with no change to the
underlying setup, and the public stamp has now been visibly stale for two weeks with no
local run to cover it. This is not a preventive warning anymore; it is an ongoing outage in
the routine's one job. A human needs to pick one:

1. **Close the source gap for cloud runs.** Commit a redacted/trimmed copy of the CA `.md`
   captures and the US Amex `.md` somewhere not covered by `.gitignore` (or carve out a
   `.gitignore` exception for those specific paths), so a fresh cloud clone has a real
   golden source to check against.
2. **Decide on the CA/other files already sitting in `scrapers/detail_cache/`**: real,
   non-junk content for some non-Amex cards, but now stale relative to the 2026-08-09 local
   full-deck run and not the designated CA source. Promote to an explicit fallback (with
   dedup/staleness caveats), or leave unused.
3. Absent either, this cron is a report-only placeholder between local full-deck runs, and
   the 14-day stamp cadence needs a human to run a local refresh before each deadline — one
   is now overdue.

Separately: close the four stale, zero-change `card-refresh*` PRs (#40, #46, #51, #62) to
stop the pile-up; none carry data worth preserving individually.
