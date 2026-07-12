# Card-data refresh — 2026-07-12

## Headline: same golden-source gap as the 2026-07-08 run, and that run's fixes are still unmerged

`data/raw/` is gitignored (`.gitignore` line 9: `data/raw/`) and has never been committed
to git (`git log --all --diff-filter=A -- 'data/raw/*'` returns nothing). A fresh cloud
checkout — this run included — gets none of it. That means, as of this run:

- **CA cards (131):** golden source `data/raw/cards/<slug>.md` — absent, 0 available.
- **US Amex cards (22):** golden source `data/raw/md/american-express-us.md` — absent.
- **US Chase cards (41):** golden source `scrapers/detail_cache/<slug>.txt` — tracked in
  git, available.

So, as before, **153 of 194 cards (79%) have zero usable golden source** in this
environment. Per the runbook's escape hatch and the conservative "never guess" rule,
those cards were left untouched again this run.

## Why no new audit was run on the 41 Chase cards

The 2026-07-08 run already fully audited all 41 Chase-issued US cards (the only cards
with a usable source in this checkout) against `scrapers/detail_cache/`, producing 29
card fixes. That work is sitting in **PR #1** ("Card-data refresh 2026-07-08",
`card-refresh` -> `main`), which as of this run:

- is still **open and unmerged** (no human review or merge in 4 days),
- has **passing CI** (Vercel deploy: success) and **no conflicts** — verified by diffing
  `main` at PR #1's base commit (`5132489`) against current `main`
  (`git diff 5132489...origin/main -- src/data/us_cards_comprehensive.json
  src/data/canadian_cards_comprehensive.json src/data/cards.ts` is empty),
- so `main`'s card data is byte-identical to what PR #1 was audited against.

Since the source files (`scrapers/detail_cache/`) haven't changed either (no new commits
touching that path since the audit), re-running the same 41-card audit today would
reproduce the exact same 29 fixes already proposed in PR #1. Doing that again and opening
a second, functionally-duplicate PR would just add review burden without adding new
verification. Left a short comment on PR #1 flagging it's been open 4 days and is still
clean/mergeable, so a human can review and merge it.

**Cards checked this run: 0 new. Cards changed this run: 0.** (41 Chase cards remain
checked-and-fixed, but only within the still-open PR #1, not yet on `main`.)

## Stamp

`CARDS_VERIFIED` in `src/data/cards.ts` was **not bumped** (stays at `2026-07-03`) — most
of the deck (153/194 cards) still has no usable golden source in this environment, and the
one audited subset (41 Chase cards) hasn't landed on `main` yet, so the deck as a whole has
not been freshly verified.

## Validation

Both JSON files still parse and the repo state is unchanged from `main`, since no data
files were edited this run:
- `node -e "JSON.parse(require('fs').readFileSync('src/data/canadian_cards_comprehensive.json','utf8'))"` — OK
- `node -e "JSON.parse(require('fs').readFileSync('src/data/us_cards_comprehensive.json','utf8'))"` — OK

## Recommendation (repeated from 2026-07-08, still open)

1. **Merge PR #1** — it has been sitting unreviewed for 4 days and contains 29
   source-confirmed fixes to real bugs (stale bonuses, mixed-up signup-bonus fields,
   fabricated/missing perks, an FX-fee contradiction).
2. Find a way to make `data/raw/` (or a read-only mirror of it) reachable from cloud-cron
   checkouts, or this same 79%-of-deck gap will keep recurring every twice-weekly run.
   Options: commit a scrubbed copy outside the gitignored path, or run the recapture step
   (needs a real browser / residential Playwright, per runbook §3c) periodically from a
   local session and sync the result somewhere the cloud runner can read.
