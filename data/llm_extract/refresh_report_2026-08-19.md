# Card-data refresh — 2026-08-19

## Coverage

194 cards on file (131 CA + 63 US). **0 checked, 0 changed** this run. This is the
fourth consecutive cloud run to hit the identical structural wall first flagged in the
cloud portion of the 2026-08-09 run (PR merged via #36) and repeated on 2026-08-12
(PR #40) and 2026-08-16 (PR #46):

- **CA cards (131):** golden source is `data/raw/cards/<slug>.md`. That directory lives
  under `data/raw/`, which is `.gitignore`d and has never been committed to any branch
  (`git log --all -- 'data/raw/cards/*'` returns nothing). A fresh cloud clone has no
  such files at all. No CA card could be checked.
- **US Amex cards (22):** golden source is `data/raw/md/american-express-us.md`, same
  `data/raw/` gitignore problem — not present here either. The 23 Amex files that DO
  exist in `scrapers/detail_cache/` are the known login-wall junk page (identical byte
  size across all 23), correctly ignored rather than trusted.
- **US non-Amex cards (41, Chase and others):** the one golden source that IS tracked in
  git, `scrapers/detail_cache/<slug>.txt` (203 files present), is still the same Jul 8
  snapshot the 2026-08-16 run found. The 2026-08-09 local full-deck run re-captured
  same-day pages for all 41 of these cards into `data/raw/cards/us-<slug>.md`
  (gitignored, never committed) and deliberately left `scrapers/detail_cache/`
  untouched, so re-verifying against the stale Jul 8 snapshot now would risk reverting
  already-fresher merged data rather than confirming it. Per the runbook's conservative
  rule, this source was held rather than used.

No WebFetch/WebSearch attempt was made to route around this: the runbook reserves a
targeted WebSearch for filling in one missing welcome-bonus figure against an otherwise
confirmed card, not for re-deriving an entire deck from scratch, and issuer sites bot-
block `WebFetch` per runbook §3c/§6 in any case.

## Schema / internal-consistency check (no source needed)

Ran the source-free checks from runbook §3e directly against the stored JSON:
- Both JSON files parse cleanly (`node -e "JSON.parse(...)"`, CA and US); counts match
  (131 CA, 63 US).
- CA: every card has `foreign_transaction_fee` set; every card with
  `foreign_transaction_fee: true` has `foreign_transaction_fee_pct` set; no cash-back
  card carries a points welcome-bonus value; 0 earn-rate category-key gate violations
  (>40 chars / >7 words) and 0 known junk-pattern keys. **0 issues found.**
- US: no card carries a CA-only field (`welcome_bonus_points`,
  `welcome_bonus_value_cad`, `foreign_transaction_fee_pct`); 0 earn-rate gate
  violations. **0 issues found.**

`npx tsc --noEmit` could not run (no `node_modules` in this container — pre-existing
environment gap). No TypeScript data files were touched this run, so this doesn't block
anything; `cards.ts` was not edited (see CARDS_VERIFIED below).

## Changes

None. Nothing was source-confirmed this run, so nothing was written to either JSON file.

## Held (not changed, unresolved across multiple runs)

- **blue-business-plus-credit-card, business-green-rewards-card** (both US Amex):
  `foreign_transaction_fee: false` while `benefits.no_fx_fee: false` — an internal
  contradiction first flagged in the 2026-08-09 report. Still unresolved; still needs
  the US Amex golden source, which remains unreachable from this container.
- All 194 cards otherwise, for the coverage reasons above.

## CARDS_VERIFIED

**Not bumped.** Stays `2026-08-09`, now 10 days old. The 14-day freshness window closes
**2026-08-23** (4 days from this run). This run verified nothing, so it does not get
credit for a fresh stamp. Unless a local full-deck run (like 2026-08-09's) lands before
2026-08-23, the homepage's public "cards re-verified" stamp will render stale/red.

## Recommendation

This is the fourth consecutive cloud run (2026-08-09 cloud portion, 2026-08-12,
2026-08-16, now 2026-08-19) to hit the identical `data/raw/` gitignore wall for CA and
US Amex, with no change in the underlying container setup across any of them. The
structural gap is unresolved and this cron cannot self-correct it: cloud sessions never
have `data/raw/cards/*.md` or `data/raw/md/american-express-us.md`, and the one tracked
non-Amex source (`scrapers/detail_cache/`) is now over 6 weeks stale relative to what a
local run already captured and merged.

Options worth a human decision: (1) commit a redacted/trimmed copy of fresh `.md`
captures somewhere not gitignored so cloud runs have a real source, or (2) accept this
cron as a report-only fallback between local full-deck runs and rely on a human to run
a local refresh before each 14-day stamp deadline. With the stamp deadline now 4 days
out and no local run since 2026-08-09, this is the point where (2) needs a human to act
on manually rather than assume the cron will catch it.

Prior open, unmerged `card-refresh*` PRs (#40 `card-refresh` 2026-08-12, #46
`card-refresh-2026-08-16`) remain safe to close without merging once one card-refresh
PR lands, since none of them changed any card data either.
