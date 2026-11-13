# Rate drift report, 2026-10-05

Report-only staleness check of the three personal-finance rate pages against each
provider's own first-party page. No page copy was edited. This is a report for human
review; a person should decide what, if anything, to update.

Run date (America/Toronto): 2026-10-05.

Pages checked:
- src/app/personal-finance/best-gic-rates-canada/page.tsx
- src/app/personal-finance/best-savings-account-rates-canada/page.tsx
- src/app/personal-finance/best-chequing-account-bonuses-canada/page.tsx

Materiality bar: a rate off by 0.15 percentage points or more, or an offer that has
clearly ended or changed amount. Everyday rates and promotional rates were kept separate
and never compared to each other. Every live value below was confirmed on the provider's
own domain only. Where a first-party value could not be confirmed, it is marked UNSURE
rather than guessed. No aggregator or competitor site was used.

Note on the prior branch: an earlier watchdog branch, rate-watchdog-2026-09-21, flagged a
subset of these items (Oaken 1yr/18mo/5yr, Peoples Trust 1yr, and the CIBC Smart Start
Skip+ wording). This run is not a duplicate: Oaken has now drifted on all six annual-pay
terms, Achieva has a newly confirmed drift, and three chequing offers changed or lapsed
after their end dates passed (Simplii's chequing bonus ended Sept 30, and the claimed TD
open-by date of Oct 1 has passed). The CIBC Skip+ finding has also reversed (see notes).

## Flagged figures

| Page | Claimed figure | Live value | First-party source | Status |
|---|---|---|---|---|
| best-gic-rates | Oaken 1yr GIC (annual-pay, non-redeemable) 3.55% | 3.80% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.25 pp) |
| best-gic-rates | Oaken 18mo GIC (annual-pay, non-redeemable) 3.65% | 3.85% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp) |
| best-gic-rates | Oaken 2yr GIC (annual-pay, non-redeemable) 4.05% | 4.25% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp) |
| best-gic-rates | Oaken 3yr GIC (annual-pay, non-redeemable) 4.10% | 4.30% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp) |
| best-gic-rates | Oaken 4yr GIC (annual-pay, non-redeemable) 4.15% | 4.35% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp) |
| best-gic-rates | Oaken 5yr GIC (annual-pay, non-redeemable) 4.25% | 4.50% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.25 pp) |
| best-gic-rates | Achieva 2yr GIC (non-redeemable) 3.75% | 4.05% | https://www.achieva.mb.ca/rates | DRIFTED (+0.30 pp) |
| best-gic-rates | Achieva 1yr GIC (non-redeemable) 3.65% | could not read live table | https://www.achieva.mb.ca/rates | UNSURE |
| best-gic-rates | Achieva 3yr GIC (non-redeemable) 3.95% | could not read live table | https://www.achieva.mb.ca/rates | UNSURE |
| best-gic-rates | Achieva 4yr GIC (non-redeemable) 3.90% | could not read live table | https://www.achieva.mb.ca/rates | UNSURE |
| best-gic-rates | Achieva 5yr GIC (non-redeemable) 4.10% | could not read live table | https://www.achieva.mb.ca/rates | UNSURE |
| best-gic-rates | Peoples Trust 1yr GIC (non-registered, annual-pay) 3.25% | 3.70% | https://www.peoplesgroup.com/personal/gic/non-registered | DRIFTED (+0.45 pp) |
| best-gic-rates | EQ Bank 2yr GIC (non-registered, non-redeemable) 3.85% | 4.00% (search-only; see note) | https://www.eqbank.ca/rates | UNSURE |
| best-chequing-account-bonuses | CIBC Smart Start (under 25) $175 cash | $125 cash | https://www.cibc.com/en/personal-banking/bank-accounts/chequing-accounts/smart-start.html | CHANGED (amount, lower by $50) |
| best-chequing-account-bonuses | TD chequing offer, "Open by October 1, 2026" | offer still live; actual window June 4 to November 2, 2026 | https://www.td.com/ca/en/personal-banking/new-bank-account-offers-promotions | CHANGED (stale date; offer not ended) |
| best-chequing-account-bonuses | TD Student Chequing $150 cash (open by Nov 2, 2026) | could not confirm a separate student cash offer first-party | https://www.td.com/ca/en/personal-banking/products/bank-accounts/chequing-accounts | UNSURE |
| best-chequing-account-bonuses | Simplii No Fee Chequing $300 plus $50 Skip gift card (ends Sept 30, 2026) | offer replaced: $350 cash, no Skip gift card, ends Jan 31, 2027 | https://www.simplii.com/en/special-offers/no-fee-chequing-account.html | ENDED / REPLACED |

## Notes for the human reviewer

- Oaken is the big mover this run. Its live annual-pay non-redeemable table, in effect
  since October 2, 2026, now reads 1yr 3.80%, 18mo 3.85%, 2yr 4.25%, 3yr 4.30%, 4yr 4.35%,
  5yr 4.50%. All six terms have repriced upward past the materiality bar, so every number
  in the page's Oaken row understates what a reader would get today. The cashable one-year
  (2.25%) is unchanged and correct.

- Achieva repriced its 2-year to 4.05% (claimed 3.75%, +0.30 pp), confirmed on the
  provider's own page. The 1, 3, 4, and 5-year figures could not be confirmed: Achieva's
  live rate table is JavaScript-rendered and did not expose those cells to a first-party
  read, and the only numbers a domain-restricted search surfaced came from Achieva's
  illustrative "GIC ladder" explainer, not the live rate table, so they were not trusted.
  Those four terms are genuinely UNSURE and a person should re-check them on Achieva's own
  page before touching them.

- Peoples Trust 1-year non-registered GIC reads 3.70% on the provider's dedicated
  non-registered GIC page (claimed 3.25%, +0.45 pp), confirmed by two direct reads. A
  domain-restricted search snippet showed 3.40% for the same term; the dedicated page read
  is the authoritative first-party source, so 3.70% is reported. Either value clears the
  materiality bar. The 2, 3, 4, and 5-year figures (3.00%, 3.25%, 3.25%, 3.45%) are
  unchanged and correct.

- EQ Bank is flagged UNSURE rather than DRIFTED. Direct reads of eqbank.ca returned
  HTTP 403, so the live figures came from a domain-restricted search of eqbank.ca only.
  That search returned a personal non-registered set (1yr 3.70%, 2yr 4.00%, 3yr 4.15%,
  4yr 4.20%, 5yr 4.30%) in which the 2-year is 0.15 pp above the claimed 3.85%, right at
  the bar. It also surfaced an EQ "Business GIC" set (3.70/3.85/4.10/4.15/4.25) that
  matches the page's claimed numbers exactly, which raises the possibility the page's table
  was taken from EQ's business GICs rather than its personal ones. Because this could not
  be settled with a direct first-party page read, the 2-year is reported UNSURE and the
  whole EQ row is worth a human re-check against eqbank.ca's personal non-registered table.

- Saven is not flagged. Its live non-redeemable table (1yr 3.70%, 2yr 3.95%, 3yr 4.10%,
  4yr 4.15%, 5yr 4.35%) runs 0.05 to 0.10 pp above the page's figures, all within
  tolerance, but the 3, 4, and 5-year terms are creeping toward the bar and may cross it
  on a future run.

- CIBC Smart Start: two findings. The cash amount has changed. CIBC's own Smart Start and
  student bank-account pages now say "$125 cash" (5 eligible Visa Debit purchases within
  60 days), not the $175 the page claims, so that is a confirmed downward change of $50.
  Separately, the page's Skip+ wording (free "for as long as your eligible CIBC card is
  linked to your Skip account and active, rather than for a fixed 12 months") is CORRECT
  on this run: CIBC's own Skip partnership page describes the perk as open-ended and
  conditional on the linked card staying active, not a fixed 12 months. This reverses the
  2026-09-21 branch's reading, which had flagged the open-ended wording as wrong. No change
  is needed to the Skip+ wording; only the $175 to $125 cash figure needs attention.

- TD: the up-to-$750 headline value is correct and the offer is still live, but the page's
  "Open by October 1, 2026" date is wrong and now in the past. TD's own offer page shows an
  opening window of June 4 to November 2, 2026 (two qualifying activities to be completed by
  Jan 4, 2027). A reader trusting the Oct 1 date would wrongly believe the offer had ended.
  The separate "TD Student Chequing $150 cash, open by Nov 2, 2026" could not be confirmed
  as a standalone promotion first-party; TD's page lists Student Chequing at up to $475 in
  value and the $150 appears to be a component of the main offer, so that line is UNSURE.

- Simplii chequing: the claimed offer ($300 plus a $50 Skip gift card, ending Sept 30,
  2026) has lapsed and been replaced. Simplii's own offer page now shows $350 cash for
  setting up direct deposits of at least $100 a month for four consecutive months within
  150 days of opening, with no Skip gift card, ending January 31, 2027. So the amount is up
  $50, the Skip gift card is gone, the requirement is longer (four months instead of three,
  150 days instead of 120), and the deadline has moved.

## Everything else verified current (no change needed)

- best-gic-rates: Oaken cashable 1yr 2.25%; Peoples Trust 2yr 3.00%, 3yr 3.25%, 4yr 3.25%,
  5yr 3.45%; Saven 1yr 3.70%, 2yr 3.95%, 3yr 4.10%, 4yr 4.15%, 5yr 4.35% (all within
  tolerance of the page's figures). EQ Bank 1yr, 3yr, 4yr, and 5yr are within tolerance
  (see the EQ note on confidence). Wealthsimple, Simplii, and Tangerine GIC figures on this
  page are described qualitatively rather than asserted, so there was nothing to check.

- best-savings-account-rates: all figures confirmed first-party and unchanged. EQ Bank
  1.00% base and 2.75% with a qualifying $2,000 direct deposit; Saven HISA 2.85%; Oaken
  savings 2.80% (rates in effect since Oct 2, 2026); Neo Savings 2.75% and Neo
  High-Interest Savings 1.25%; Achieva Daily Interest Savings 1.80%; Wealthsimple Cash
  1.25% under $100k, 1.75% at $100k or more, 2.25% at $500k or more, plus the direct-deposit
  boost; Simplii HISA promo 4.60% up to $200,000 (window Aug 1 to Oct 31, 2026, still open);
  Tangerine savings promo 4.50% for new clients (rolling 153-day window, still live). One
  minor non-material note: Neo's rates page does not state the "minimum combined balance"
  condition the page attributes to the 2.75% Neo Savings rate, but the rate value itself is
  confirmed and unchanged, so this is not a drift.

- best-chequing-account-bonuses: Scotiabank up to $1,000 (window July 3 to Oct 29, 2026);
  CIBC Smart Account up to $850 (see the Smart Start note above for the under-25 offer);
  TD up to $750 (see the TD note on the date); National Bank up to $600 (ends Nov 3, 2026);
  Tangerine $250 (ends Oct 31, 2026); RBC iPad on Signature No Limit and student AirPods 4
  with three months of Apple Music (both ending Nov 2, 2026). All of these headline amounts
  and their end dates were confirmed first-party and are current.

Sources were the providers' own domains only. No aggregator or competitor site was used.
