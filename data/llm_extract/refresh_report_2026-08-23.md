# Card-data refresh — 2026-08-23

## Coverage

194 cards on file (131 CA + 63 US). **0 checked, 0 changed** this run. This is the
**fifth** consecutive cloud run to hit the identical structural wall first flagged in the
cloud portion of the 2026-08-09 run (merged via #36) and repeated on 2026-08-12 (PR #40),
2026-08-16 (PR #46), and 2026-08-19 (PR #51) — none of which have been merged or closed
yet, so this makes a fourth open, unmerged, zero-change `card-refresh*` PR sitting against
`main`.

- **CA cards (131):** golden source is `data/raw/cards/<slug>.md`. That directory lives
  under `data/raw/`, which is `.gitignore`d (`.gitignore` line "# data" / `data/raw/`) and
  has never been committed to any branch (`git log --all -- 'data/raw/cards/*'` returns
  nothing). A fresh cloud clone has no such files at all — confirmed again this run
  (`ls data/raw` → "No such file or directory"; no `american-express-us.md` or
  `data/raw/cards` directory found anywhere on this container's filesystem). No CA card
  could be checked.
- **US Amex cards (22):** golden source is `data/raw/md/american-express-us.md`, same
  `data/raw/` gitignore problem — not present here either. The 23 files in
  `scrapers/detail_cache/` whose names suggest Amex are the known login-wall junk page:
  grouping all 203 `scrapers/detail_cache/*.txt` files by byte size shows 23 files sharing
  one identical size (22,029 bytes), the confirmed junk signature. Correctly ignored
  rather than trusted.
- **US non-Amex cards (41, Chase and others):** the one golden source tracked in git,
  `scrapers/detail_cache/<slug>.txt` (203 files present), is still the same snapshot last
  touched **Jul 14, 2026** per `git log -1 --format=%cd -- scrapers/detail_cache`. The
  2026-08-09 local full-deck run re-captured same-day pages for all 41 of these cards into
  `data/raw/cards/us-<slug>.md` (gitignored, never committed) and deliberately left
  `scrapers/detail_cache/` untouched, so re-verifying against the stale cache now would
  risk reverting already-fresher merged data rather than confirming it. Per the runbook's
  conservative rule, this source was held rather than used, exactly as the three prior
  cloud runs did.

No WebFetch/WebSearch attempt was made to route around this: the runbook reserves a
targeted WebSearch for filling in one missing welcome-bonus figure against an otherwise
source-confirmed card, not for re-deriving an entire 194-card deck from scratch, and
issuer sites bot-block `WebFetch` per runbook §3c/§6 in any case.

## Schema / internal-consistency check (no source needed)

Ran the source-free checks from runbook §3e directly against the stored JSON:

- Both JSON files parse cleanly (`node -e "JSON.parse(...)"`); counts match (131 CA, 63 US).
- CA: every card has `foreign_transaction_fee` set; every card with
  `foreign_transaction_fee: true` has `foreign_transaction_fee_pct` set; no cash-back card
  carries a points welcome-bonus value; 0 earn-rate category-key gate violations
  (>40 chars / >7 words) and 0 known junk-pattern keys. **0 issues found.**
- US: no card carries a CA-only field (`welcome_bonus_points`, `welcome_bonus_value_cad`,
  `foreign_transaction_fee_pct`); 0 earn-rate gate violations. **0 issues found.**
- `npm install` (node_modules was not present in this fresh container) then
  `npx tsc --noEmit`: clean, 0 errors. No TypeScript data files were touched this run in
  any case.

## Changes

None. Nothing was source-confirmed this run, so nothing was written to either JSON file.

## Held (not changed, unresolved across multiple runs)

- **blue-business-plus-credit-card, business-green-rewards-card** (both US Amex):
  `foreign_transaction_fee: false` while `benefits.no_fx_fee: false` — an internal
  contradiction first flagged in the 2026-08-09 report, still present and still
  unresolved as of this run. Still needs the US Amex golden source, which remains
  unreachable from this container.
- All 194 cards otherwise, for the coverage reasons above.

## Stamp

`CARDS_VERIFIED` in `src/data/cards.ts` was **left at `2026-08-09`** — not bumped. Nothing
was verified this run, so it does not get to claim a fresh stamp. **This is the run where
the 14-day freshness window actually lapses**: 2026-08-09 + 14 days = 2026-08-23 (today).
The homepage `VerifiedStamp` (cadenceDays=14) will render as stale/red starting with this
build unless a human either supplies fresh golden sources for a real verification pass or
otherwise addresses the gap below.

## Recommendation for a human reviewer (unchanged ask, now more urgent)

1. **Close the `data/raw/` gap.** Every cloud run since 2026-07-08 (six in a row, counting
   this one) hits the same wall. The cloud container can only ever see the 41
   tracked-in-git Chase `.txt` files, and even those go stale the moment a local run
   re-captures fresher pages into the gitignored path. Committing a redacted/trimmed copy
   of the golden sources (or moving them outside `.gitignore`) would let this routine
   actually cover the other 153 cards it's meant to check twice weekly.
2. **The public stamp is now stale.** `CARDS_VERIFIED` has been stuck at `2026-08-09` for
   14 days with no cloud-reachable way to refresh it; only a manual/local run with real
   `data/raw/` captures (like the 2026-08-09 local pass) can safely bump it.
3. **Four open, unmerged, zero-change PRs are piling up:** `card-refresh` (#40, Aug 12),
   `card-refresh-2026-08-16` (#46), `card-refresh-2026-08-19` (#51), and now
   `card-refresh-2026-08-23` (this run). All report the identical wall and contain no
   card-data changes. Safe to close all four once reviewed, or to leave the newest one
   open as the running record until the `data/raw/` gap is fixed.
