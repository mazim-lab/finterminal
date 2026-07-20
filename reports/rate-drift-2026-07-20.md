# Rate drift report 2026-07-20

Report-only check of the three rate/offer pages against each provider's own
first-party page. This is for human review. No page copy was edited.

Pages checked:
- src/app/personal-finance/best-gic-rates-canada/page.tsx
- src/app/personal-finance/best-savings-account-rates-canada/page.tsx
- src/app/personal-finance/best-chequing-account-bonuses-canada/page.tsx

## Material drift found

| page | claimed figure | live value | first-party source URL | status |
|---|---|---|---|---|
| best-chequing-account-bonuses-canada | CIBC Smart Start (under 25): $125 cash + 12 months Skip+ | $175 cash + 12 months Skip+ (Skip+ unchanged) | https://www.cibc.com/en/personal-banking/bank-accounts/chequing-accounts/smart-start.html | DRIFTED |

Notes on the one flag:
- The CIBC Smart Start cash amount for clients under 25 has increased from the
  claimed $125 to $175 on CIBC's own Smart Start landing page and its main
  bank-accounts page. The 12 months of Skip+ is unchanged.
- This is a favourable change for readers (the offer got bigger), so the page
  currently understates it. A CIBC terms PDF is still titled "$125 Offer", but
  both live first-party landing pages state $175, so the current headline is
  $175.
- The parent CIBC Smart Account "up to $850" figure on the same page is
  unchanged and still current.

## Everything else: verified current, no material drift, nothing UNSURE

All figures below were confirmed on each provider's own first-party page and
sit within the 0.15 percentage-point materiality threshold (rates) or are still
live at the claimed amount and end date (offers). Listed for the reviewer's
context only; no action needed.

GIC page:
- Oaken non-redeemable: claimed 1yr 3.35 / 18mo 3.45 / 2yr 3.65 / 3yr 3.70 / 4yr
  3.75 / 5yr 4.00; live 3.40 / 3.50 / 3.70 / 3.80 / 3.85 / 4.05. Every term is
  slightly higher live but each gap is under 0.15 points, so not material. The
  3yr and 4yr gaps (0.10) are the closest to the threshold and worth watching
  next run. Cashable 1yr 2.25% is an exact match.
- Achieva non-redeemable: 1yr 3.60 / 2yr 3.65 / 3yr 3.70 / 4yr 3.75 / 5yr 4.05,
  all exact matches. Daily Interest Savings live 1.80%, consistent with the
  page's qualitative "high-one to low-two-percent" description.
- Peoples Trust annual-pay non-registered: 1yr 3.25 / 2yr 3.00 / 3yr 3.25 / 4yr
  3.25 / 5yr 3.45, all exact matches.

Savings page (everyday rates):
- EQ Bank Personal Account: 1.00% base, 2.75% with a $2,000+/mo direct deposit.
  Confirmed.
- Saven HISA 2.85%, Oaken Savings 2.80%, Neo Savings 2.75% (min combined
  balance), Neo High-Interest Savings 1.25%. All confirmed.
- Wealthsimple Cash tiers 1.25% / 1.75% / 2.25% plus the direct-deposit boost.
  Confirmed.

Savings page (promotional rates, kept separate from everyday):
- Simplii 4.60% promo (up to $100,000, ~5 months) and Tangerine 4.50%
  non-registered promo (5 months), both ending July 31, 2026. Still live as of
  today (July 20). Heads-up for the reviewer: both expire in about 11 days, so
  the page copy will need a refresh shortly after July 31.

Chequing page (offers):
- Scotiabank up to $1,000 bundle, live July 3 to October 29, 2026. Confirmed.
- CIBC Smart Account up to $850, live, no stated end date. Confirmed.
- TD up to $750 (All-Inclusive / Unlimited), open by October 1, 2026; TD Student
  Chequing $150, open by November 2, 2026. Confirmed.
- National Bank up to $600, ends November 3, 2026. Confirmed.
- Simplii $300 No Fee Chequing, ends September 30, 2026. Confirmed.
- Tangerine $250 Chequing, through October 31, 2026. Confirmed.
- RBC iPad offer (Signature No Limit) plus student AirPods 4 offer, ends
  November 2, 2026. Confirmed.

Sourcing: every figure was checked against the provider's or issuer's own
domain only. No aggregator or competitor site was used. Nothing was marked
UNSURE this run.
