# Rate drift report, 2026-08-03

Report-only staleness check of the three personal-finance rate pages against each
provider's own first-party page. No page copy was edited. This is a report for human
review; a person should decide what, if anything, to update.

Run date (America/Toronto): 2026-08-03.

Pages checked:
- src/app/personal-finance/best-gic-rates-canada/page.tsx
- src/app/personal-finance/best-savings-account-rates-canada/page.tsx
- src/app/personal-finance/best-chequing-account-bonuses-canada/page.tsx

Materiality bar: a rate off by 0.15 percentage points or more, or an offer that has
clearly ended or changed amount. Everyday rates and promotional rates were kept separate
and never compared to each other. Every live value below was confirmed on the provider's
own domain only.

## Flagged figures

| Page | Claimed figure | Live value | First-party source | Status |
|---|---|---|---|---|
| best-gic-rates | Oaken 1yr GIC (annual-pay, non-redeemable) 3.35% | 3.50% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.15 pp) |
| best-gic-rates | Oaken 18mo GIC 3.45% | 3.60% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.15 pp) |
| best-gic-rates | Oaken 2yr GIC 3.65% | 3.85% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp) |
| best-gic-rates | Oaken 3yr GIC 3.70% | 3.90% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp) |
| best-gic-rates | Oaken 4yr GIC 3.75% | 3.95% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp) |
| best-chequing-account-bonuses | CIBC Smart Start (under 25) $125 cash plus 12 months Skip+ | $175 cash plus 12 months Skip+ | https://www.cibc.com/en/personal-banking/bank-accounts/chequing-accounts/smart-start.html | ENDED (amount changed, $125 to $175) |
| best-savings-account-rates | Simplii HISA new-client promo 4.60% for 5 months, up to $100,000, ending July 31, 2026 | Rate still 4.60%, but the July 31 window closed and a new promo runs Aug 1 to Oct 31, 2026 with the balance cap raised to $200,000 | https://www.simplii.com/en/special-offers/high-interest-savings-account.html | ENDED (claimed window and cap are stale; rate itself unchanged) |
| best-savings-account-rates | Tangerine savings new-client promo 4.50%, ending July 31, 2026 | Rate 4.50% still advertised live on Aug 3; current end date could not be confirmed first-party (offer page shows unpopulated template placeholders for the date) | https://www.tangerine.ca/en/offers/savings-account-promo | UNSURE (end date; rate is fine) |

## Notes for the human reviewer

- Oaken repriced its GIC book upward (the live table took effect around July 28, 2026).
  Five terms drifted up. The 5yr moved 4.00% to 4.10% (+0.10 pp), which is below the
  materiality bar, so it is not flagged. Oaken cashable 1yr (2.25%) and Oaken savings
  (2.80%) are both unchanged.
- CIBC Smart Start is a genuine amount change: the under-25 cash reward went from $125 to
  $175 (new offer began July 16, 2026). The Skip+ portion (12 months free) is unchanged.
  The CIBC Smart Account "up to $850" headline is unchanged and still current.
- Simplii HISA: the rate a reader would get today is still 4.60%, so nobody should change
  the rate. What is stale is the stated end date (July 31, 2026, now past) and the
  balance cap (the new window caps at $200,000, not $100,000). Simplii No Fee Chequing
  ($300, ends Sept 30, 2026) is unchanged.
- Tangerine savings: the 4.50% rate is confirmed live and unchanged, so this is not a rate
  drift. The only open question is the end date, which the site renders dynamically and did
  not expose to a first-party read. It is flagged UNSURE so a person can confirm whether the
  July 31 date on our page is still correct or was extended. Tangerine chequing ($250,
  through Oct 31, 2026) is unchanged.

## Everything else verified current (no change needed)

- best-gic-rates: Achieva 1yr 3.60%, 2yr 3.65%, 3yr 3.70%, 4yr 3.75%, 5yr 4.05%; Peoples
  Trust 1yr 3.25%, 2yr 3.00%, 3yr 3.25%, 4yr 3.25%, 5yr 3.45%; Oaken 5yr 4.00% to 4.10%
  (immaterial), cashable 2.25%. EQ, Wealthsimple, Simplii, Tangerine, Saven GIC figures on
  this page were already described qualitatively rather than asserted, so nothing to check.
- best-savings-account-rates: EQ Bank 1.00% base and 2.75% with a qualifying $2,000 direct
  deposit; Saven 2.85%; Oaken 2.80%; Neo Savings 2.75% and Neo High-Interest Savings 1.25%;
  Wealthsimple Cash 1.25% under $100k, 1.75% over $100k, 2.25% at $500k or more.
- best-chequing-account-bonuses: Scotiabank up to $1,000 (end Oct 29, 2026); CIBC Smart
  Account up to $850; TD up to $750 (open by Oct 1, 2026) and TD Student $150 (open by
  Nov 2, 2026); National Bank up to $600 (end Nov 3, 2026); RBC iPad and student AirPods 4
  (end Nov 2, 2026); Simplii $300 chequing (end Sept 30, 2026); Tangerine $250 chequing
  (through Oct 31, 2026).

Sources were the providers' own domains only. No aggregator or competitor site was used.
Where a first-party value could not be confirmed, it is marked UNSURE rather than guessed.
