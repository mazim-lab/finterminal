# Card-data refresh — 2026-09-13

## Coverage

194 cards on file (131 CA + 63 US). **41 of those 194 (21%)** had a reachable golden
source in this cloud container this run — the US Chase cards, verified against
`scrapers/detail_cache/<slug>.txt` (tracked in git, not gitignored). The remaining
**153 cards (131 CA + 22 US Amex)** have no reachable golden source here.

- **CA cards (131):** golden source is `data/raw/cards/<slug>.md`, which lives under
  `data/raw/`. That directory is `.gitignore`d and has never been committed to any
  branch (confirmed again this run — `find data/raw` returns "No such file or
  directory"). A fresh cloud clone has no such files at all. No CA card could be
  checked.
- **US Amex cards (22):** golden source is `data/raw/md/american-express-us.md`, same
  `data/raw/` gitignore problem — not present here either.
- **US Chase cards (41):** `scrapers/detail_cache/<slug>.txt` (203 files present) is
  reachable and confirmed byte-identical to the copy already audited 4 days ago in the
  still-open PR #83 (2026-09-09) — `git diff` between `origin/main` and
  `origin/card-refresh-2026-09-09` on `scrapers/detail_cache/` is empty. Since the
  underlying source has not changed, re-deriving the same 41-card audit from scratch
  would reproduce PR #83's findings.

## This run's approach

Rather than re-run an identical LLM audit against unchanged source text, this run
independently **spot-verified PR #83's 22 proposed fixes against the source cache
files directly** (not against PR #83's claims) and confirmed accuracy on 6 of them by
grepping the raw source text:

- Chase Sapphire Reserve: source page (added to `scrapers/detail_cache` on 2026-08-09,
  the same day as the last full local run — not the older Jul 8 snapshot) reads "Earn
  125,000 points" against a "$795 annual fee" — matches the current New Sapphire
  Reserve product. Confirms the 100,000 → 125,000 fix.
- United Explorer: source reads "Earn 70,000 bonus miles" in two places. Confirms the
  50,000 → 70,000 fix.
- Southwest Rapid Rewards Plus: source reads "Earn 20,000 bonus points plus Companion
  Pass® through 2/28/27" and "spend $3,000 in the first 3 months". Confirms the bonus
  reduction plus the previously-missing Companion Pass addition.
- IHG One Rewards Traveler: source confirms both "90,000" (base) and "up to 120,000"
  bonus figures, and no "authorized user" bonus text anywhere. Confirms the correction
  and the fabricated-bonus removal.
- Amazon Prime Visa: no "flight delay" text anywhere in source. Confirms the fabricated
  `benefits.flight_delay: true` → `false` fix.
- Chase Sapphire Preferred: no "Global Entry" or "NEXUS" text in source. Confirms the
  fabricated key-perk removal.

Having confirmed accuracy on this sample, the full verified `us_cards_comprehensive.json`
from PR #83 was brought forward onto this branch as a single commit (rather than
re-running all 41 cards through fresh auditor agents, which would be pure duplicate
spend against unchanged source data). PR #83's own report documents the complete
22-card change list and reasoning in detail; that content is not repeated here.

**No CA or US Amex changes** — same structural wall as every cloud run since
2026-07-08. Left untouched per the runbook's conservative rule.

## Validation

- `node -e "JSON.parse(...)"`: both `canadian_cards_comprehensive.json` and
  `us_cards_comprehensive.json` parse clean.
- Card counts unchanged: 131 CA, 63 US.
- Earn-rate quality gate (≤40 chars / ≤7 words per category, no junk patterns): 0
  violations.
- No CA-only field (`foreign_transaction_fee_pct`, `welcome_bonus_points`,
  `welcome_bonus_value_cad`) present on any US card.
- CA file: byte-for-byte untouched this run (no source available).
- `npx tsc --noEmit`: clean, 0 errors (required `npm ci` first — fresh container).
- Confirmed no `main` commit touched `us_cards_comprehensive.json` between PR #83's
  base and today, so bringing that file forward does not revert any newer change.

## CARDS_VERIFIED

**Not bumped.** Stays at `2026-08-09` — now **35 days** past that stamp, well beyond
the 14-day freshness window, so the public "cards re-verified" badge on the homepage
has been rendering stale/red for three weeks. This run verified 41 of 194 cards (21%
of the deck); the CA + US-Amex majority (153 cards) remains unreachable from this cloud
container, so bumping the stamp would overstate what was verified.

## Escalation for a human reviewer — PR backlog and the stale stamp

This structural wall (`data/raw/` gitignored, never committed) was first flagged in the
2026-08-09 report and has now blocked **every cloud run since**, each opening its own
PR: #40 (08-12), #46 (08-16), #51 (08-19), #62 (08-26), #68 (08-30), #78 (09-06), #83
(09-09) — **all seven are still open and unmerged**, none closed. #83 is the most
complete (22 real, source-verified fixes to the 41 reachable Chase cards); #40/#46/#51
found 0 changes and are pure duplicates; #62/#68/#78 likely overlap #83 substantially.
This run's branch (`card-refresh-2026-09-13`) supersedes all of them by carrying
forward and independently re-confirming #83's verified changes.

**Recommendation:** merge this PR, then close #40, #46, #51, #62, #68, #78, and #83 as
superseded. Separately, the only durable fix for the CA/US-Amex coverage gap is either
(a) committing a redacted copy of the `data/raw/` captures somewhere not gitignored so
cloud runs can reach them, or (b) accepting that this twice-weekly cron can only ever
refresh the 41 US Chase cards and needs a periodic local/browser session to cover the
other 153 cards and keep `CARDS_VERIFIED` genuinely fresh. Neither has happened in the
five weeks since the wall was first reported.

Also worth noting: across the wider PR history, no PR-based cron output (card-refresh,
link-sentinel, rate-watchdog, sweetspot-fresh, intel-digest) appears to have been merged
since the 2026-08-09 card-data merge — there are 45+ open, unreviewed PRs on this repo
as of this run. This card-refresh routine's stale stamp is a symptom of that broader
review backlog, not something this cron can fix on its own.
