# Rate drift report, 2026-10-12

Report-only staleness check of the three personal-finance rate pages against each
provider's own first-party page. No page copy was edited. This is a report for human
review; a person should decide what, if anything, to update.

Run date (America/Toronto): 2026-10-12.

Pages checked:
- src/app/personal-finance/best-gic-rates-canada/page.tsx
- src/app/personal-finance/best-savings-account-rates-canada/page.tsx
- src/app/personal-finance/best-chequing-account-bonuses-canada/page.tsx

Materiality bar: a rate off by 0.15 percentage points or more, or an offer that has
clearly ended or changed amount. Everyday rates and promotional rates were kept separate
and never compared to each other. Every live value below was confirmed on the provider's
own domain only. Where a first-party value could not be confirmed, it is marked UNSURE
rather than guessed. No aggregator or competitor site was used.

## Relationship to the open watchdog branches (not a duplicate)

Two earlier watchdog branches are still open and unmerged: rate-watchdog-2026-09-21 and
rate-watchdog-2026-10-05. Because neither has merged, the live pages still show the old
figures, so several drifts they already flagged are still true today and are repeated here
so this report stands on its own. This run is not a duplicate of them, because it adds new
material drift that appeared in the week since Oct 5:

- Saven Financial GICs: the 2, 3, 4, and 5-year terms have now crossed the materiality bar.
  The 2026-10-05 branch checked Saven and found it within tolerance (not flagged). It has
  repriced upward since.
- EQ Bank everyday savings base rate: moved from 1.00% to 1.50%. The 2026-10-05 branch read
  this as unchanged at 1.00%.
- EQ Bank 2-year GIC: the 2026-10-05 branch marked this UNSURE; it is now confirmed drifted.

Rows below are tagged NEW (not on the open branches) or CARRIED (already flagged on an open
branch and still true) so a reviewer can see what changed this week.

## Flagged figures

| Page | Claimed figure | Live value | First-party source | Status |
|---|---|---|---|---|
| best-gic-rates | Saven 2yr GIC (non-redeemable) 3.90% | 4.05% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.15 pp), NEW |
| best-gic-rates | Saven 3yr GIC (non-redeemable) 4.00% | 4.20% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.20 pp), NEW |
| best-gic-rates | Saven 4yr GIC (non-redeemable) 4.05% | 4.25% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.20 pp), NEW |
| best-gic-rates | Saven 5yr GIC (non-redeemable) 4.25% | 4.40% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.15 pp), NEW |
| best-savings-account-rates | EQ Bank Personal Account everyday base rate 1.00% | 1.50% | https://www.eqbank.ca/rates | DRIFTED (+0.50 pp), NEW (see confidence note) |
| best-gic-rates | EQ Bank 2yr GIC (non-registered, non-redeemable) 3.85% | 4.00% | https://www.eqbank.ca/personal-banking/investments/gics | DRIFTED (+0.15 pp), NEW (see confidence note) |
| best-gic-rates | Oaken 1yr GIC (annual-pay, non-redeemable) 3.55% | 3.80% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.25 pp), CARRIED |
| best-gic-rates | Oaken 18mo GIC (annual-pay, non-redeemable) 3.65% | 3.85% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp), CARRIED |
| best-gic-rates | Oaken 2yr GIC (annual-pay, non-redeemable) 4.05% | 4.25% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp), CARRIED |
| best-gic-rates | Oaken 3yr GIC (annual-pay, non-redeemable) 4.10% | 4.30% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp), CARRIED |
| best-gic-rates | Oaken 4yr GIC (annual-pay, non-redeemable) 4.15% | 4.35% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp), CARRIED |
| best-gic-rates | Oaken 5yr GIC (annual-pay, non-redeemable) 4.25% | 4.50% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.25 pp), CARRIED |
| best-gic-rates | Achieva 2yr GIC (non-redeemable) 3.75% | 4.05% | https://www.achieva.mb.ca/achieva-gic | DRIFTED (+0.30 pp), CARRIED |
| best-gic-rates | Achieva 1yr GIC (non-redeemable) 3.65% | could not read live table | https://www.achieva.mb.ca/rates | UNSURE, CARRIED |
| best-gic-rates | Achieva 3yr GIC (non-redeemable) 3.95% | could not read live table | https://www.achieva.mb.ca/rates | UNSURE, CARRIED |
| best-gic-rates | Achieva 4yr GIC (non-redeemable) 3.90% | could not read live table | https://www.achieva.mb.ca/rates | UNSURE, CARRIED |
| best-gic-rates | Achieva 5yr GIC (non-redeemable) 4.10% | could not read live table | https://www.achieva.mb.ca/rates | UNSURE, CARRIED |
| best-gic-rates | Peoples Trust 1yr GIC (non-registered, annual-pay) 3.25% | 3.70% | https://www.peoplesgroup.com/personal/gic/non-registered | DRIFTED (+0.45 pp), CARRIED |
| best-chequing-account-bonuses | CIBC Smart Start (under 25) $175 cash | $125 cash | https://www.cibc.com/en/special-offers/smart-start.html | CHANGED (amount, lower by $50), CARRIED |
| best-chequing-account-bonuses | TD chequing offer, "Open by October 1, 2026" | offer still live; actual window June 4 to November 2, 2026 | https://www.td.com/ca/en/personal-banking/new-bank-account-offers-promotions | CHANGED (stale date; offer not ended), CARRIED |
| best-chequing-account-bonuses | Simplii No Fee Chequing $300 plus $50 Skip gift card (ends Sept 30, 2026) | offer replaced: $350 cash, no Skip gift card, ends Jan 31, 2027 | https://www.simplii.com/en/special-offers/no-fee-chequing-account.html | ENDED / REPLACED, CARRIED |

## Notes for the human reviewer

New this week:

- Saven Financial GICs are the main new mover. Saven's live non-redeemable table now reads
  1yr 3.80%, 2yr 4.05%, 3yr 4.20%, 4yr 4.25%, 5yr 4.40%, confirmed on savenfinancial.ca.
  The 2, 3, 4, and 5-year terms are each 0.15 to 0.20 pp above the page's figures, so all
  four clear the bar. The 1-year is up only 0.10 pp (3.70% to 3.80%) and stays below the
  bar, though a person refreshing the row may want to update it at the same time. The Saven
  HISA (2.85%) is unchanged and correct. On the 2026-10-05 run Saven was within tolerance,
  so this is a genuine move in the past week.

- EQ Bank everyday savings base rate: flagged DRIFTED but with a confidence note. EQ's own
  site blocks direct page reads (HTTP 403 on eqbank.ca/rates), so the live figure came from
  a domain-restricted search of eqbank.ca only, which surfaced EQ's own news post titled
  "EQ Bank increases everyday interest rate to 1.50%" (reported effective Oct 2, 2026). The
  boosted 2.75% rate with a qualifying $2,000-a-month direct deposit, and the condition
  itself, are unchanged and correct. This 1.00% to 1.50% base-rate reading conflicts with
  the 2026-10-05 branch, which recorded the base as unchanged at 1.00% a week ago, so a
  person should confirm it with a direct look at eqbank.ca before editing the page.

- EQ Bank 2-year GIC: now reads 4.00% (claimed 3.85%, +0.15 pp), right at the bar. Same
  method caveat as above: direct reads returned 403, so this is from a domain-restricted
  eqbank.ca search. EQ's 1-year non-registered rate (3.70%) is explicitly labelled and
  matches the page; the 2 to 5-year rows sit in a long-term table that is not explicitly
  tagged "non-registered" on-page, though EQ shows identical values across its
  non-registered, registered, and business GICs for those terms. The 2-year is reported as
  a drift; the 3, 4, and 5-year terms are each only +0.05 pp and stay below the bar.

Carried from the open branches (still true because those branches are unmerged):

- Oaken is still the largest rate mover. Its live annual-pay non-redeemable table, in effect
  since October 2, 2026, reads 1yr 3.80%, 18mo 3.85%, 2yr 4.25%, 3yr 4.30%, 4yr 4.35%,
  5yr 4.50%. All six terms are past the bar, so every number in the page's Oaken row
  understates what a reader would get today. The cashable one-year (2.25%) and Oaken savings
  (2.80%) are unchanged and correct.

- Achieva: the 2-year reads 4.05% (claimed 3.75%, +0.30 pp), confirmed on Achieva's own GIC
  page. The 1, 3, 4, and 5-year figures could not be confirmed: Achieva's live rate table is
  JavaScript-rendered and did not expose those cells to a first-party read, and the only
  other numbers on the domain came from Achieva's illustrative GIC ladder explainer, not the
  live rate table, so they were not trusted. Those four terms are genuinely UNSURE. The
  Achieva Daily Interest Savings everyday rate (1.80%) is unchanged and correct.

- Peoples Trust 1-year non-registered GIC reads 3.70% on the provider's dedicated
  non-registered GIC page (claimed 3.25%, +0.45 pp), confirmed by direct reads. The 2, 3, 4,
  and 5-year figures (3.00%, 3.25%, 3.25%, 3.45%) are unchanged and correct.

- CIBC Smart Start cash is now $125 (claimed $175), a confirmed downward change of $50 on
  CIBC's own Smart Start page, conditional on 5 eligible Visa Debit purchases within 60 days.
  Separately, CIBC's own pages are internally inconsistent on the Skip+ perk term (the offer
  page frames it as conditional on keeping an eligible CIBC card linked and active, while a
  tier block elsewhere mentions a 12-month free trial), so the page's current open-ended
  Skip+ wording is defensible and is not flagged as a drift; a person may still want to
  confirm the current Skip+ framing. The CIBC Smart Account "up to $850" headline is correct.

- TD: the up-to-$750 headline value is correct and the offer is still live, but the page's
  "Open by October 1, 2026" date is wrong and now in the past. TD's own offer page shows an
  opening window of June 4 to November 2, 2026, with qualifying activities to be completed by
  Jan 4, 2027. A reader trusting the Oct 1 date would wrongly believe the offer had ended.
  The separate TD Student Chequing $150 cash offer (open by Nov 2, 2026, two activities) is
  now confirmed first-party on TD's student chequing product page, so it is current and
  correct (it was UNSURE on the 2026-10-05 run).

- Simplii chequing: the claimed offer ($300 plus a $50 Skip gift card, ending Sept 30, 2026)
  has lapsed and been replaced. Simplii's own offer page now shows $350 cash for setting up
  direct deposits of at least $100 a month for four consecutive months within 150 days of
  opening, with no Skip gift card, and an offer period that begins Oct 1, 2026 and ends
  January 31, 2027. So the amount is up $50, the Skip gift card is gone, the requirement is
  longer (four months instead of three, 150 days instead of 120), and the deadline has moved.

## Everything else verified current (no change needed)

- best-gic-rates: Oaken cashable 1yr 2.25%; Peoples Trust 2yr 3.00%, 3yr 3.25%, 4yr 3.25%,
  5yr 3.45%; Saven 1yr 3.80% (up 0.10 pp, below the bar) and HISA 2.85%; EQ Bank 1yr 3.70%
  (explicitly labelled, matches) and 3yr/4yr/5yr within tolerance. Wealthsimple, Simplii, and
  Tangerine GIC figures on this page are described qualitatively rather than asserted, so
  there was nothing to check.

- best-savings-account-rates: EQ Bank boosted 2.75% with a qualifying $2,000 direct deposit
  (base rate flagged above); Saven HISA 2.85%; Oaken savings 2.80% (effective Oct 2, 2026);
  Neo Savings 2.75% and Neo High-Interest Savings 1.25%; Achieva Daily Interest Savings
  1.80%; Wealthsimple Cash 1.25% under $100k, 1.75% over $100k, 2.25% at $500k or more, plus
  the direct-deposit boost; Simplii HISA promo 4.60% up to $200,000 (window Aug 1 to Oct 31,
  2026, still open, ends in about three weeks); Tangerine savings promo 4.50% for 153 days
  (rate confirmed; the first-party page does not display an explicit window). One minor
  non-material note carried from the prior run: Neo's rates page does not state the "minimum
  combined balance" condition the page attributes to the 2.75% Neo Savings rate, but the rate
  value itself is confirmed and unchanged, so this is not a drift.

- best-chequing-account-bonuses: Scotiabank up to $1,000 (window July 3 to Oct 29, 2026);
  CIBC Smart Account up to $850 (see the Smart Start note above for the under-25 offer); TD
  up to $750 (see the TD note on the date) and TD Student $150 (now confirmed); National Bank
  up to $600 (window May 7 to Nov 3, 2026); Tangerine $250 (Client Number by Oct 31, 2026);
  RBC iPad on Signature No Limit and student AirPods 4 with three months of Apple Music (both
  ending Nov 2, 2026). All of these headline amounts and end dates were confirmed first-party
  and are current. Informational only: BMO, whose offer our page does not assert a number for
  (the page points readers to the source), is currently running an up-to-$900 cash offer on
  its Performance Plan (window Aug 7 to Nov 2, 2026), confirmed on bmo.com; since the page
  makes no BMO claim, there is nothing to flag.

Sources were the providers' own domains only. No aggregator or competitor site was used.
