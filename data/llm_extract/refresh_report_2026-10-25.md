# Card-data refresh report — 2026-10-25

## Scope of this run

This is the cloud cron run of the card-data refresh job. Per the runbook
(`docs/CRON_RUNBOOK.md` §3), the full golden sources (`data/raw/cards/*.md`
for CA cards, `data/raw/md/american-express-us.md` for US Amex) live in
`data/raw/`, which is gitignored and absent from this checkout. So this run
could only verify the one golden source that IS present in a cloud
checkout: `scrapers/detail_cache/<slug>.txt`, which covers the 41 US
Chase-issued cards (the other 22 US cards are American Express and have no
usable source here — the Amex files in this same cache are a 22,047-byte
login-wall page, confirmed junk).

CA cards (131) and US Amex cards (22) were **not verifiable** this run and
were not touched.

## Dedup check

Found an existing open PR, #100 ("Card-data refresh 2026-09-30", branch
`card-refresh-2026-09-30`), proposing 7 extraction-error fixes to
`us_cards_comprehensive.json` from the same `scrapers/detail_cache`
source. Confirmed via `git diff origin/main origin/card-refresh-2026-09-30`
that none of its fixes have landed on `main` yet (still unmerged after ~4
weeks) and that it does not conflict with anything in this run. Those 7
fixes (inflated United earn-rate traps, a stale Freedom Rise promo
category, a stale Chase Travel 5% promo on Ink Business Cash, a fabricated
NEXUS/Global Entry perk, and an annual-fee correction) are **not
reproduced here** — they're still valid and waiting on a merge of #100.

## What was checked this run (41 US Chase cards)

- Cross-referenced each card's `scrapers/detail_cache/<slug>.txt` content
  against the stored JSON (annual fee, welcome bonus, FX fee, earn rates,
  key perks), confirming the file actually names the right card first (one
  file, `the-new-chase-sapphire-reserve-credit-card.txt`, shares an MD5
  with `amazon-business-card.txt`, but its own text content is genuinely
  the Sapphire Reserve page — kept).
- Cross-referenced git history (`git log` on `us_cards_comprehensive.json`)
  to find which of the 41 cards were already re-verified by the owner's two
  most recent local "fresh issuer capture" passes (2026-09-13 and
  2026-09-16) — 33 of 41 were. Fields touched by those passes are **more
  recent and more trustworthy than this stale Feb–Mar-2026 cache**, so they
  were left untouched even where the cache disagreed (example: Aeroplan
  Card annual fee — cache says $95, current stored value is $195 from the
  Sept 16 fresh-capture pass; held, not reverted, since the fee likely rose
  after the cache was captured).
- The 8 cards never touched by either pass got a closer look:
  `chase-freedom-flex-credit-card`, `chase-freedom-unlimited-credit-card`,
  `doordash-rewards-mastercard`, `ihg-one-rewards-premier-business-credit-card`,
  `instacart-mastercard`, `marriott-bonvoy-bountiful-credit-card`,
  `slate-credit-card`, `united-gatewaysm-card`. All checked clean except
  one.

## Fix applied (1 card, 1 field)

**`doordash-rewards-mastercard`** — removed the fabricated **"Concierge
service"** perk from `key_perks`. The card's full issuer page (36KB,
confirms the right card by name) makes zero mention of concierge service
anywhere; it is a Mastercard product (no Visa Signature Concierge
eligibility) and its real benefits are DashPass, cash back, and statement
credits only. By contrast, two other untouched cards in this same batch
that also carry a "Concierge service" perk — `marriott-bonvoy-bountiful-credit-card`
and `united-gatewaysm-card` — were confirmed genuine (both are Visa
Signature cards and their issuer pages explicitly advertise "Visa
Signature® Concierge Service"), so those were left alone.

## Held / not changed

- Everything already covered by open PR #100 (see Dedup above) — left for
  that PR to carry.
- Aeroplan Card annual fee discrepancy ($95 in stale cache vs. $195
  currently stored) — held per the "don't let the stale cache overwrite a
  more recent correction" rule; the $195 figure came from the owner's
  2026-09-16 fresh-capture pass, which postdates this cache.
- IHG One Rewards Premier Business earn rate (10x hotels) — verified
  correct against the card's own breakdown ("Up to 26X total" = 10x card +
  10x base member + 6x Platinum Elite); not the inflated headline number.
- United Gateway earn rate (2x United purchases) — verified correct
  against the card's own breakdown ("up to 7x total" = 5x MileagePlus base
  + 2x card); not the inflated headline number.
- Instacart Mastercard, Chase Freedom Flex/Unlimited, Chase Slate — all
  checked field-by-field against source and found already accurate; no
  changes.

## Validation results

- `python -c "import json; json.load(...)"` — both CA and US JSON files
  parse cleanly.
- Earn-rate quality gate — 0 violations (no category >40 chars / >7 words,
  no junk keys) across both decks.
- No CA-only fields present on the touched US card.
- `npx tsc --noEmit` — no new errors introduced; pre-existing unrelated
  errors (JSX typing in `motifs.tsx`, missing `@types/node` in
  `comments-store.ts`/`og.ts`) are present on `origin/main` too and are
  unrelated to this change.

## Stamp

`CARDS_VERIFIED` in `src/data/cards.ts` was **not touched**. This run only
verified 41 of 194 cards (and even those only against a stale, partially
untrustworthy cache); a full-deck verification requires the owner's local
pass with the real golden sources.
