# Card-data refresh — 2026-09-16

## Coverage

194 cards on file (131 CA + 63 US). As with every cloud run since 2026-07-08, only the
**41 US Chase cards** have a reachable golden source in this container
(`scrapers/detail_cache/<slug>.txt`, tracked in git). The remaining **153 cards (131 CA +
22 US Amex)** have no reachable golden source here.

- **CA cards (131):** golden source is `data/raw/cards/<slug>.md`. `data/raw/` is
  `.gitignore`d and has never been committed to any branch — confirmed again this run
  (`data/raw/cards/` does not exist in this checkout). No CA card could be checked.
- **US Amex cards (22):** golden source is `data/raw/md/american-express-us.md`, same
  `data/raw/` gitignore problem. Not present here either.
- **US Chase cards (41):** `scrapers/detail_cache/<slug>.txt` (203 files) is reachable.
  `git log -- scrapers/detail_cache` shows the last commit to touch that directory is
  `840c7f5` ("Merge rate drift report 2026-07-20") — the source text is byte-identical to
  what PR #83 (2026-09-09) audited and PR #89 (2026-09-13) independently spot-confirmed
  and carried forward. Both PRs are still open and unmerged.

## This run's approach — no new PR opened

Re-deriving the 41-card audit from unchanged source text would reproduce a diff
byte-for-byte identical to the one already sitting in open PR #89. Opening a 9th
near-duplicate card-refresh PR would add review noise without adding any new verified
information, so this run did **not** open a new data-changing PR. Instead:

- Posted a status comment on PR #89 confirming today's re-check and recommending the
  backlog be resolved (merge #89 + close the superseded PRs, or fix the structural
  gitignore wall, or pause this cron until one of those happens).
- **No card facts were changed today** — CA and US Amex remain unverifiable from this
  container; US Chase remains identical to the already-verified, already-open PR #89.

## Backlog (open, unmerged card-refresh PRs as of today)

`#40` (2026-08-12), `#46`, `#51`, `#62`, `#68` (2026-08-30), `#78` (2026-09-06), `#83`
(2026-09-09), `#89` (2026-09-13). This structural wall — `data/raw/` gitignored and never
committed — has been reported in this same report series since 2026-07-08 without a
merge or a fix landing.

## CARDS_VERIFIED

**Not bumped.** Still `2026-08-09` on `main` — 38 days stale, past the 14-day freshness
window used by the homepage `VerifiedStamp`. The deck as a whole (153 of 194 cards)
still cannot be verified from this container, so bumping the stamp would misrepresent
what was actually checked.

## Recommendation

A human decision is needed on one of:
1. Merge PR #89 (lands the verified US-Chase fixes) and close #40/#46/#51/#62/#68/#78 as
   superseded.
2. Commit a redacted/trackable copy of `data/raw/cards/` and `data/raw/md/` so this cron
   can reach the CA + US-Amex golden sources directly.
3. Pause this cron until one of the above happens — further twice-weekly runs will only
   keep re-confirming the same wall.

## Validation

No data files were changed this run, so the standard JSON/tsc validation checklist does
not apply. `data/raw/cards/` and `data/raw/md/` were confirmed absent via `ls`; the
`scrapers/detail_cache/` unchanged-since-2026-07-20 claim was confirmed via
`git log --oneline -- scrapers/detail_cache`.
