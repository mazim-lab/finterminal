# Card-data refresh — 2026-08-12

## Coverage

131 CA + 63 US = 194 cards on file. **0 golden sources reachable this run.**

This cloud container has no `data/raw/` directory at all: it is `.gitignore`d (see
`.gitignore` line "# data / data/raw/") and was never committed, so a fresh clone here
starts without it. That takes out both `data/raw/cards/<slug>.md` (all 131 CA cards) and
`data/raw/md/american-express-us.md` (22 US Amex cards) entirely. This is the identical
wall every cloud run has hit since 2026-07-08, most recently documented in
`data/llm_extract/refresh_report_2026-08-09.md`.

The one source that IS tracked in git, `scrapers/detail_cache/<slug>.txt` (41 US Chase
cards), was checked but not used as a basis for any change this run. `git log` shows that
directory was last touched 2026-07-08 — it predates, and was deliberately left untouched
by, the full local verification run on 2026-08-09
(`data/llm_extract/refresh_report_2026-08-09-local.md`), which re-scraped all 41 of those
same Chase cards from chase.com the same day and is already merged to `main`
(commit `266233f`, salvage commit `d3a1088`, stamp commit `278224b`). Re-deriving fixes
from the stale July 8 cache now would mean checking today's stored values (which reflect
the fresher Aug 9 capture) against an older snapshot — any "fix" produced that way would
risk reverting already-correct, more current data rather than improving it. Per the
runbook's conservative rule (never guess, and here that extends to never "fix" against a
source known to be staler than what's already stored), this run made no changes from that
cache either.

## Changes

**None.** No card JSON was touched.

## Stamp

`CARDS_VERIFIED` in `src/data/cards.ts` was **left at `2026-08-09`** — not bumped. It
already reflects a genuine, full 194/194-card verification pass from 3 days ago and is
still well inside the 14-day freshness window (goes stale 2026-08-23). This run could not
verify the deck (0 reachable sources), so it does not get to claim credit for a fresh
stamp; bumping it today would misrepresent what actually happened.

## Validation

- Both JSON files parse clean (`node -e "JSON.parse(...)"`, CA and US).
- No files were modified, so no earn-rate gate / schema / `tsc` check applies.

## Recommendation for a human reviewer

- **Structural gap, not a one-off:** every cloud run since 2026-07-08 hits this same
  `data/raw/` wall (2026-07-08, -18, -29, -08-05, -08-09, and now -08-12 all note it). The
  cloud cron can only ever see the 41 tracked-in-git Chase `.txt` files, and even those go
  stale the moment a local run re-captures fresher pages into the gitignored path. As things
  stand, this cron cannot do the job the runbook describes for CA or US Amex, and for US
  Chase it can only usefully run in the gap *before* the next local full-deck pass. Worth
  either (a) committing a redacted/trimmed copy of the golden sources somewhere not
  gitignored so the cloud container can see them, or (b) treating this twice-weekly cron as
  a fallback that mostly reports "no reachable source" between local runs, per the
  runbook's own "Partial" cron-feasibility note.
- **Stale open PRs to clean up:** `card-refresh-2026-07-29` (#22), `card-refresh-2026-08-05`
  (#31), and `card-refresh-2026-08-09` (#36) are all still open against `main`. Their
  content is superseded by the 2026-08-09 local full-deck pass and the salvage commit
  (`d3a1088`) that already pulled the unique fixes worth keeping out of them. Safe to close
  all three without merging.

No card-data files changed this run — this report is the entire output, opened as a PR
for visibility per the standing runbook process.
