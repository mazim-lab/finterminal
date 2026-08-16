# Card-data refresh — 2026-08-16

## Coverage

194 cards on file (131 CA + 63 US). **0 checked, 0 changed** this run — no usable golden
source was reachable in this cloud container, the same structural wall the last two
cloud runs hit (2026-08-12, PR #40; and the cloud portion of 2026-08-09, PR merged via
#36/278224b).

- **CA cards (131):** golden source is `data/raw/cards/<slug>.md`. That directory lives
  under `data/raw/`, which is `.gitignore`d and has never been committed to any branch
  (`git log --all -- data/raw/cards/` returns nothing). A fresh cloud clone has no such
  files at all. No CA card could be checked.
- **US Amex cards (22):** golden source is `data/raw/md/american-express-us.md`, same
  `data/raw/` gitignore problem — not present here either. The 23 Amex files that DO
  exist in `scrapers/detail_cache/` are the known 22,029-byte login-wall junk page
  (confirmed by grouping on file size: 23 files share that exact byte count), so they
  were correctly ignored rather than trusted.
- **US non-Amex cards (41, Chase and others):** the one golden source that IS tracked in
  git, `scrapers/detail_cache/<slug>.txt`, exists (203 files present) but is a Jul 8
  snapshot. The 2026-08-09 local full-deck run (`refresh_report_2026-08-09-local.md`)
  explicitly re-captured same-day `chase.com` pages for all 41 of these cards into
  `data/raw/cards/us-<slug>.md` (gitignored, not committed) and states it "deliberately
  left [`scrapers/detail_cache/`] untouched" because those fresher captures superseded
  it. Re-verifying against the stale Jul 8 snapshot now would risk reverting already-
  fresher merged data rather than confirming it, so per the runbook's conservative rule
  this source was held rather than used.

No WebFetch/WebSearch spot-checks were attempted beyond confirming the above file
inventory: the runbook reserves a targeted WebSearch for filling in one missing welcome-
bonus figure against a known stored card, not for re-deriving an entire deck from
scratch, and issuer sites (Chase, Amex, the CA banks) are known to bot-block `WebFetch`
per runbook §3c/§6.

## Schema / internal-consistency check (no source needed)

Ran the source-free checks from runbook §3e directly against the stored JSON (no golden
source required for these):
- CA: every card has `foreign_transaction_fee` set; every charger has `_pct: 2.5`; no
  cash-back card carries a points welcome-bonus value; no earn-rate category key exceeds
  the 40-char/7-word gate. **0 issues found.**
- US: no card carries a CA-only field (`welcome_bonus_points`,
  `welcome_bonus_value_cad`, `foreign_transaction_fee_pct`); no points-currency signup
  bonus is missing both a formatted string and a USD value. **0 issues found.**

Both JSON files parse cleanly (`node -e "JSON.parse(...)"`, CA and US). `npx tsc
--noEmit` could not run cleanly in this container because `node_modules` is not
installed (pre-existing environment gap, unrelated to any card data — no TypeScript
data files were touched this run).

## Changes

None. Nothing was source-confirmed this run, so nothing was written.

## Held (not changed)

All 194 cards, for the reasons above. None of the previously-flagged holds (e.g. the
`blue-business-plus-credit-card` / `business-green-rewards-card` FX-fee internal
contradiction noted in the 2026-08-09 report) could be resolved either, since they also
need the missing US Amex golden source.

## CARDS_VERIFIED

**Not bumped.** Stays `2026-08-09` (7 days old, inside the 14-day freshness window but
the window closes 2026-08-23). This run verified nothing, so it does not get credit for
a fresh stamp.

## Recommendation

This is the third consecutive cloud run (2026-08-09 cloud portion, 2026-08-12, and now
2026-08-16) to hit the identical `data/raw/` gitignore wall for CA + US Amex, and the
second to correctly decline the now-stale `scrapers/detail_cache/` for US non-Amex. The
structural gap flagged in PR #40 is unresolved: this cron cannot see the CA/US-Amex
golden sources from a cloud container at all, and the one tracked non-Amex source
degrades in value every time a local run refreshes captures without committing them.
`CARDS_VERIFIED` will go stale (>14 days, 2026-08-23) unless a local full-deck run (like
2026-08-09's) happens before then, since this cron cannot supply a substitute. Worth
either committing a redacted copy of fresh captures somewhere not gitignored so cloud
runs can use them, or accepting this cron as a report-only fallback between local
full-deck runs, as previously recommended.

Prior open, unmerged `card-refresh*` PRs (#40 `card-refresh` 2026-08-12, and any earlier
stale ones referenced there) remain safe to close without merging once one card-refresh
PR lands, since none of them changed any card data either.
