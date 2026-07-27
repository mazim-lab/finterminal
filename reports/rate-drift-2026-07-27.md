# Rate drift report 2026-07-27

Automated staleness check of the three personal-finance rate pages against each
provider's own first-party page. This is a report for human review only. No page
copy was edited. First-party sources only; no aggregators.

Pages checked:

- src/app/personal-finance/best-gic-rates-canada/page.tsx
- src/app/personal-finance/best-savings-account-rates-canada/page.tsx
- src/app/personal-finance/best-chequing-account-bonuses-canada/page.tsx

Materiality bar: a rate off by 0.15 percentage points or more, or an offer or
bonus that has clearly ended or changed amount. Smaller moves are noted below as
within tolerance and are not flagged.

## Flagged figures

| Page | Claimed figure | Live value | First-party source | Status |
|---|---|---|---|---|
| best-chequing-account-bonuses-canada | CIBC Smart Start (under 25): $125 cash plus 12 months Skip+ | $175 cash plus 12 months Skip+ | https://www.cibc.com/en/personal-banking/bank-accounts.html | DRIFTED |

Note on the one flag: the change is in the reader's favour (the real offer is now
larger than what the page states), but the stated dollar figure is no longer
accurate, so it is flagged for a copy fix. The main CIBC Smart Account headline
(up to $850) is unchanged and correct.

## Verified current (within tolerance, not flagged)

GIC page:

- Oaken non-redeemable annual-pay. Live 1yr 3.40, 18mo 3.50, 2yr 3.70, 3yr 3.80,
  4yr 3.85, 5yr 4.05. Page states 3.35, 3.45, 3.65, 3.70, 3.75, 4.00. Every term
  has ticked up by 0.05 to 0.10 points, all under the 0.15 bar, so not flagged.
  Cashable 1yr 2.25 matches. Source https://www.oaken.com/gic-rates/
- Achieva non-redeemable. Live 1yr 3.60, 2yr 3.65, 3yr 3.70, 4yr 3.75, 5yr 4.05.
  All match. Source https://www.achieva.mb.ca/rates
- Peoples Trust annual-pay non-registered. Live 1yr 3.25, 2yr 3.00, 3yr 3.25,
  4yr 3.25, 5yr 3.45. All match. Source
  https://www.peoplesgroup.com/personal/resources/account-rates
- EQ Bank, Wealthsimple, Simplii, Tangerine, Saven, big banks: the page asserts
  no hard GIC number for these (qualitative only), so nothing to verify.

Savings page:

- EQ Bank Personal Account 1.00 base rising to 2.75 with a qualifying $2,000
  monthly direct deposit. Matches. Source https://www.eqbank.ca/rates
- Saven HISA 2.85 everyday. Matches. Source https://savenfinancial.ca/en/on-rates
- Oaken Savings 2.80 everyday. Matches. Source
  https://www.oaken.com/en-ca/savings-account-rates/
- Neo Savings up to 2.75 ongoing with a minimum combined balance, and the
  separate Neo High-Interest Savings account 1.25 ongoing. Both match. A
  marketing landing page advertises a higher promo, but the first-party interest
  rates page confirms the ongoing figures. Source
  https://www.neofinancial.com/accounts/interest-rates
- Wealthsimple Cash tiers 1.25, 1.75, 2.25. Matches (the page maps these to
  balance bands, Wealthsimple maps them to client tiers, same numbers). Source
  https://www.wealthsimple.com/en-ca/product/cash
- Simplii promo HISA 4.60 for new clients, running through July 31, 2026. Matches
  and still live as of the run date. Promotional, kept separate from everyday
  rates. Source
  https://www.simplii.com/en/special-offers/high-interest-savings-account.html
- Tangerine promo savings 4.50 for new clients, eligibility window through
  July 31, 2026. Matches. Promotional. Source
  https://www.tangerine.ca/en/offers/savings-account-promo
- Achieva Daily Interest Savings: page describes it qualitatively (high-one to
  low-two-percent), no hard number to check.

Chequing page:

- Scotiabank up to $1,000 bundled (about $700 plus $200 plus $100), end
  October 29, 2026. Matches. Source
  https://www.scotiabank.com/ca/en/personal/bank-accounts/chequing-accounts.html
- CIBC Smart Account up to $850. Matches (the Smart Start sub-offer is the flag
  above). Source https://www.cibc.com/en/personal-banking/bank-accounts.html
- TD up to $750 on All-Inclusive and Unlimited, open by October 1, 2026, and TD
  Student Chequing $150 open by November 2, 2026. Matches. Source
  https://www.td.com/ca/en/personal-banking/products/bank-accounts/chequing-accounts
- National Bank up to $600 on The Connected or The Total, end November 3, 2026.
  Matches. Source https://www.nbc.ca/personal/accounts.html
- Simplii No Fee Chequing $300 for a qualifying direct deposit, ends
  September 30, 2026. The $300 and the end date match. The offer now also adds a
  $50 Skip gift card that the page does not mention, but the stated figure is not
  wrong, so not flagged. Source
  https://www.simplii.com/en/special-offers/no-fee-chequing-account.html
- Tangerine Chequing $250 for payroll direct deposits of at least $200 a month,
  offer through October 31, 2026. Matches. Source
  https://www.tangerine.ca/en/offers
- RBC Signature No Limit iPad offer plus student AirPods 4 with Apple Music, end
  November 2, 2026. Matches. Source https://www.rbcroyalbank.com/accounts/index.html
- BMO and EQ Bank chequing: the page already states it could not verify a live
  figure and describes them qualitatively, so there is nothing asserted to check.

## Summary

One material drift found (CIBC Smart Start dollar amount). No figures were left
unsure; every asserted number on the three pages was confirmed against a
first-party source. All other figures are current or within the 0.15 point
tolerance.
