# Rate drift report, 2026-08-10

Report-only staleness check of the three personal-finance rate pages against each
provider's own first-party page. No page copy was edited. This is a report for human
review; a person should decide what, if anything, to update.

Run date (America/Toronto): 2026-08-10.

Pages checked:
- src/app/personal-finance/best-gic-rates-canada/page.tsx
- src/app/personal-finance/best-savings-account-rates-canada/page.tsx
- src/app/personal-finance/best-chequing-account-bonuses-canada/page.tsx

Materiality bar: a rate off by 0.15 percentage points or more, or an offer that has
clearly ended or changed amount. Everyday rates and promotional rates were kept separate
and never compared to each other. Every live value below was confirmed on the provider's
own domain only.

Continuity note: the Oaken GIC drift, the CIBC Smart Start amount change, and the Simplii
and Tangerine savings promo staleness were all flagged in the 2026-08-03 report as well.
The page copy has not yet been updated by a human, so these same figures are still stale on
the live site today. They are re-reported here because they are still materially wrong, not
because anything new drifted this week.

## Flagged figures

| Page | Claimed figure | Live value | First-party source | Status |
|---|---|---|---|---|
| best-gic-rates | Oaken 1yr GIC (annual-pay, non-redeemable) 3.35% | 3.50% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.15 pp) |
| best-gic-rates | Oaken 18mo GIC 3.45% | 3.60% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.15 pp) |
| best-gic-rates | Oaken 2yr GIC 3.65% | 3.85% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp) |
| best-gic-rates | Oaken 3yr GIC 3.70% | 3.90% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp) |
| best-gic-rates | Oaken 4yr GIC 3.75% | 3.95% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp) |
| best-chequing-account-bonuses | CIBC Smart Start (under 25) $125 cash plus 12 months Skip+ | $175 cash plus free Skip+ | https://www.cibc.com/en/personal-banking/bank-accounts/chequing-accounts/smart-start.html | DRIFTED (amount changed, $125 to $175) |
| best-savings-account-rates | Simplii HISA new-client promo 4.60% for 5 months, up to $100,000, ending July 31, 2026 | Rate still 4.60%, but the July 31 window closed; a renewed promo runs Aug 1 to Oct 31, 2026 with the balance cap raised to $200,000 | https://www.simplii.com/en/special-offers/high-interest-savings-account.html | ENDED (claimed window and cap are stale; rate itself unchanged) |
| best-savings-account-rates | Tangerine savings new-client promo 4.50%, for five months, ending July 31, 2026 | Rate 4.50% confirmed live; the offer is a rolling per-client 153-day (5 month) promo with no fixed July 31 calendar end date | https://www.tangerine.ca/en/offers/savings-account-promo | DRIFTED (stated end date is stale; rate unchanged) |

## Notes for the human reviewer

- Oaken repriced its GIC book upward and the live table took effect around July 28, 2026.
  Five terms drifted up past the materiality bar. The 5yr moved 4.00% to 4.10% (+0.10 pp),
  which is below the bar, so it is not flagged. Oaken cashable 1yr (2.25%) and Oaken savings
  (2.80%) are both unchanged and correct.
- CIBC Smart Start is a genuine amount change: the under-25 cash reward on the live product
  page is now $175, not the $125 our page states. The Skip+ membership (12 months free) is
  unchanged. Note there is still an older $125 terms PDF cached on cibc.com, but the current
  Smart Start product page shows $175, so a reviewer should treat $175 as the live figure.
  The CIBC Smart Account "up to $850" headline is unchanged and still current.
- Simplii HISA: the rate a reader would get today is still 4.60%, so the rate should not be
  changed. What is stale is the stated end date (July 31, 2026, now past) and the balance cap
  (the renewed window caps at $200,000, not $100,000). Simplii No Fee Chequing ($300, ends
  Sept 30, 2026) is unchanged and correct.
- Tangerine savings: the 4.50% rate is confirmed live and unchanged, so this is not a rate
  drift. The stale part is the framing "ending July 31, 2026." The first-party offer page
  shows this is a rolling 153-day (5 month) new-client promo that runs from each client's own
  account opening, with no single July 31 calendar cutoff. A reviewer may want to reword the
  end-date phrasing. Tangerine chequing ($250, through Oct 31, 2026) is unchanged and correct.

## Everything else verified current (no change needed)

- best-gic-rates: Achieva 1yr 3.60%, 2yr 3.65%, 3yr 3.70%, 4yr 3.75%, 5yr 4.05% (all match);
  Peoples Trust 1yr 3.25%, 2yr 3.00%, 3yr 3.25%, 4yr 3.25%, 5yr 3.45% (all match); Oaken 5yr
  4.00% to 4.10% (immaterial), cashable 2.25% (match). EQ, Wealthsimple, Simplii, Tangerine,
  and Saven GIC figures on this page were described qualitatively rather than asserted, so
  there was no hard number to check.
- best-savings-account-rates: EQ Bank 1.00% base and 2.75% with a qualifying $2,000 direct
  deposit; Saven 2.85%; Oaken 2.80%; Neo Savings 2.75% and Neo High-Interest Savings 1.25%
  (both confirmed on Neo's own interest-rates page; an aggregated marketing figure of 4.00%
  seen elsewhere was not first-party and was not used); Wealthsimple Cash 1.25% under $100k,
  1.75% over $100k, 2.25% at $500k or more. All match.
- best-chequing-account-bonuses: Scotiabank up to $1,000 (end Oct 29, 2026); CIBC Smart
  Account up to $850; TD up to $750 (open by Oct 1, 2026) and TD Student $150; National Bank
  up to $600 (end Nov 3, 2026); RBC iPad on Signature No Limit and student AirPods 4 (end
  Nov 2, 2026); Simplii $300 chequing (end Sept 30, 2026); Tangerine $250 chequing (through
  Oct 31, 2026). Headline amounts and end dates all match. National Bank's per-component
  Mastercard bonus is now $30 (Connected) or $150 (Total) rather than a flat $100, but the
  $600 maximum and the end date are unchanged, so this is not material.

Sources were the providers' own domains only. No aggregator or competitor site was used.
Where a first-party value could not be confirmed, it is marked UNSURE rather than guessed.
