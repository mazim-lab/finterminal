# Rate drift report, 2026-11-02

Report-only staleness check of the three personal-finance rate pages against each
provider's own first-party page. No page copy was edited. This is a report for human
review; a person decides what, if anything, to update.

Run date (America/Toronto): 2026-11-02.

Pages checked:
- src/app/personal-finance/best-gic-rates-canada/page.tsx
- src/app/personal-finance/best-savings-account-rates-canada/page.tsx
- src/app/personal-finance/best-chequing-account-bonuses-canada/page.tsx

Materiality bar: a rate off by 0.15 percentage points or more, or an offer that has
clearly ended or changed amount. Everyday rates and promotional rates were kept separate
and never compared to each other. Every live value below was confirmed on the provider's
own domain only. Where a first-party value could not be read, it is marked UNSURE rather
than guessed. No aggregator or competitor site was used.

## Relationship to the open watchdog branches (not a duplicate)

Three earlier watchdog branches are still open and unmerged: rate-watchdog-2026-09-21,
rate-watchdog-2026-10-05, and rate-watchdog-2026-10-12. Because none has merged, the live
pages still show the old figures, so several drifts those branches flagged are still true
today and are repeated here so this report stands on its own. This run is not a duplicate,
because it adds new material drift that appeared in the three weeks since the 2026-10-12
branch:

- Several promotional windows that were still live on 2026-10-12 have now closed. The
  Scotiabank chequing window (ended Oct 29), the Simplii HISA 4.60% promo (ended Oct 31),
  and the page's Tangerine chequing date (Oct 31) are all now in the past. Two of these have
  been replaced with new offers at different terms.
- Achieva's everyday Daily Interest Savings rate rose from 1.80% to 2.05%. The 2026-10-12
  branch read it as unchanged at 1.80%, so this is a genuine new move.
- Neo restructured its savings pricing on Oct 1, 2026, from balance-based tiers to paid
  membership tiers, which changes how the 2.75% rate the page cites is actually earned.
- Oaken and Saven GICs have repriced upward again since Oct 12, so their live numbers are
  now higher than the figures the open branches recorded.
- Achieva's 5-year GIC is now first-party confirmed as drifted; it was UNSURE on Oct 12.

Rows below are tagged NEW (not on the open branches, or changed since them) or CARRIED
(already flagged on an open branch and still true) so a reviewer can see what changed.

## Flagged figures

| Page | Claimed figure | Live value | First-party source | Status |
|---|---|---|---|---|
| best-gic-rates | Oaken 1yr GIC (annual-pay, non-redeemable) 3.55% | 3.75% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp), CARRIED |
| best-gic-rates | Oaken 18mo GIC (annual-pay, non-redeemable) 3.65% | 3.80% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.15 pp), CARRIED |
| best-gic-rates | Oaken 2yr GIC (annual-pay, non-redeemable) 4.05% | 4.20% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.15 pp), CARRIED |
| best-gic-rates | Oaken 3yr GIC (annual-pay, non-redeemable) 4.10% | 4.30% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp), CARRIED |
| best-gic-rates | Oaken 4yr GIC (annual-pay, non-redeemable) 4.15% | 4.35% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp), CARRIED |
| best-gic-rates | Oaken 5yr GIC (annual-pay, non-redeemable) 4.25% | 4.50% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.25 pp), CARRIED |
| best-gic-rates | Saven 2yr GIC (non-redeemable) 3.90% | 4.25% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.35 pp), CARRIED |
| best-gic-rates | Saven 3yr GIC (non-redeemable) 4.00% | 4.30% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.30 pp), CARRIED |
| best-gic-rates | Saven 4yr GIC (non-redeemable) 4.05% | 4.35% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.30 pp), CARRIED |
| best-gic-rates | Saven 5yr GIC (non-redeemable) 4.25% | 4.50% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.25 pp), CARRIED |
| best-gic-rates | Peoples Trust 1yr GIC (non-registered, annual-pay) 3.25% | 3.70% | https://www.peoplesgroup.com/personal/gic/non-registered | DRIFTED (+0.45 pp), CARRIED |
| best-gic-rates | EQ Bank 2yr GIC (non-registered, non-redeemable) 3.85% | 4.00% | https://www.eqbank.ca/rates | DRIFTED (+0.15 pp), CARRIED (see confidence note) |
| best-gic-rates | Achieva 5yr GIC (non-redeemable) 4.10% | 4.35% | https://www.achieva.mb.ca/achieva-gic | DRIFTED (+0.25 pp), NEW (first-party confirmed this run) |
| best-gic-rates | Achieva 1yr GIC (non-redeemable) 3.65% | could not read live table | https://www.achieva.mb.ca/rates | UNSURE, CARRIED |
| best-gic-rates | Achieva 2yr GIC (non-redeemable) 3.75% | could not read live table | https://www.achieva.mb.ca/rates | UNSURE, CARRIED |
| best-gic-rates | Achieva 3yr GIC (non-redeemable) 3.95% | could not read live table | https://www.achieva.mb.ca/rates | UNSURE, CARRIED |
| best-gic-rates | Achieva 4yr GIC (non-redeemable) 3.90% | could not read live table | https://www.achieva.mb.ca/rates | UNSURE, CARRIED |
| best-savings-account-rates | EQ Bank Personal Account everyday base rate 1.00% | 1.50% | https://www.eqbank.ca/rates | DRIFTED (+0.50 pp), CARRIED (see confidence note) |
| best-savings-account-rates | Achieva Daily Interest Savings everyday rate 1.80% | 2.05% | https://www.achieva.mb.ca/daily-interest-savings-account | DRIFTED (+0.25 pp), NEW |
| best-savings-account-rates | Simplii HISA promo 4.60% for 153 days, up to $200,000 (window Aug 1 to Oct 31, 2026) | promo ended and replaced: 5.00% combined for 153 days, up to $100,000, new window Nov 1, 2026 to Jan 31, 2027 | https://www.simplii.com/en/special-offers/high-interest-savings-account.html | ENDED / REPLACED, NEW |
| best-savings-account-rates | Neo Savings 2.75%, condition stated as "minimum combined balance" | 2.75% still exists but is now the paid Grow membership tier ($14.99/mo); balance-based tiers retired Oct 1, 2026 | https://www.neofinancial.com/accounts/interest-rates | CHANGED (qualifying condition; rate value unchanged), NEW |
| best-savings-account-rates | Neo High-Interest Savings 1.25% | could not confirm after the Oct 1 membership restructure | https://www.neofinancial.com/accounts/interest-rates | UNSURE, NEW |
| best-chequing-account-bonuses | Scotiabank up to $1,000, "Offer end date October 29, 2026" | up to $1,000 still offered, but the Oct 29 window closed; a new $1,000 bundled offer now runs Oct 30, 2026 to March 4, 2027 | https://www.scotiabank.com/ca/en/personal/bank-accounts/chequing-accounts.html | CHANGED (stale end date; offer renewed, amount unchanged), NEW |
| best-chequing-account-bonuses | CIBC Smart Start (under 25) $175 cash | $125 cash | https://www.cibc.com/en/special-offers/smart-start.html | CHANGED (amount, lower by $50), CARRIED |
| best-chequing-account-bonuses | TD chequing offer, "Open by October 1, 2026" | offer still live, up to $750; actual opening window June 4 to November 2, 2026 | https://www.td.com/ca/en/personal-banking/new-bank-account-offers-promotions | CHANGED (stale date; offer not ended), CARRIED |
| best-chequing-account-bonuses | Simplii No Fee Chequing $300 plus $50 Skip gift card (ends Sept 30, 2026) | offer replaced: $350 cash, no Skip gift card, ends Jan 31, 2027 | https://www.simplii.com/en/special-offers/no-fee-chequing-account.html | ENDED / REPLACED, CARRIED |
| best-chequing-account-bonuses | Tangerine Chequing $250, "Offer period runs through October 31, 2026" | $250 unchanged, but the Oct 31 date is stale; the live window now runs through April 30, 2027 | https://www.tangerine.ca/en/ | CHANGED (stale end date; offer extended, amount unchanged), NEW |

## Notes for the human reviewer

New or changed this run:

- Scotiabank chequing. The page's "up to $1,000" headline is still correct, but its stated
  "Offer end date October 29, 2026" is now in the past. Scotiabank's own chequing page shows
  a current bundled up-to-$1,000 offer (Ultimate and Preferred packages) with an opening
  window of October 30, 2026 to March 4, 2027. So a reader trusting the Oct 29 date would
  wrongly believe the offer had ended, when an identical-value offer is in fact running into
  2027. The breakdown ($700 chequing, $200 registered account, $100 credit card) is
  unchanged. There is also a separate Preferred Package for Students and Youth offer of $200
  (open by Nov 1, 2026), which the page does not assert, so there is nothing to flag there.

- Simplii HISA (savings page). The page's 4.60% new-client promo (window Aug 1 to Oct 31,
  2026, up to $200,000) has ended. Simplii's own high-interest savings offer page now shows a
  replacement: 5.00% combined (regular plus promotional) interest for 153 days on balances up
  to $100,000, with an opening window of November 1, 2026 to January 31, 2027. So the rate is
  up (4.60% to 5.00%), the balance cap is halved ($200,000 to $100,000), and the window has
  rolled forward. This is a promotional rate and is kept separate from the everyday leaders.

- Achieva Daily Interest Savings (savings page). Achieva's own Daily Interest Savings Account
  product page now shows 2.05%, up from the 1.80% on the page (+0.25 pp). This is an everyday,
  non-promotional rate. The 2026-10-12 branch read it as 1.80% and unchanged, so this is a
  genuine move in the past three weeks. For context, Achieva's own pages also show the TFSA
  Savings at 2.20% and the RRSP Savings at 1.95%, but the page only asserts the Daily Interest
  figure, so only that one is flagged.

- Neo (savings page). Neo changed its savings model on October 1, 2026. The rate is now tied
  to a paid membership tier rather than to a minimum combined balance: Essentials 2.00%,
  Start 2.25%, Build 2.50%, Grow 2.75%, confirmed on Neo's own interest-rates page (dated Oct
  21, 2026). So the 2.75% the page cites is still available, but only on the Grow membership
  ($14.99/mo), not by keeping a balance as the page says. The rate value has not drifted, but
  the qualifying condition the page describes is now wrong, which is why it is flagged as a
  condition change rather than a rate drift. The page's separate "Neo High-Interest Savings
  1.25%" claim could not be reconfirmed after the restructure, so it is marked UNSURE.

- Achieva 5-year GIC (GIC page). Now first-party confirmed at 4.35% (claimed 4.10%, +0.25 pp)
  on Achieva's own GIC page. On Oct 12 only the 2-year was readable and the 5-year was UNSURE;
  this run the live table exposed the 5-year. The 1, 2, 3, and 4-year Achieva terms remain
  unreadable first-party (the live table is JavaScript-rendered and did not expose those
  cells), so those four stay UNSURE rather than being carried as confirmed drifts.

- Tangerine chequing (chequing page). The $250 amount is unchanged and correct, but the
  page's "Offer period runs through October 31, 2026" is now stale. Tangerine's own site shows
  the New Client Payroll Offer open to Client Numbers created between May 1, 2024 and April 30,
  2027. The conditions ($200/month payroll, first deposit within 60 days, continuing two
  consecutive months) are unchanged. As with TD and Scotiabank, the risk is a reader believing
  a live offer has expired.

Carried from the open branches (still true because those branches are unmerged):

- Oaken is still the largest GIC mover and has repriced upward again. Its live annual-pay
  non-redeemable table, in effect since October 16, 2026, reads 1yr 3.75%, 18mo 3.80%, 2yr
  4.20%, 3yr 4.30%, 4yr 4.35%, 5yr 4.50%. All six terms are past the bar versus the page. The
  cashable one-year (2.25%) and Oaken savings (2.80%, effective July 28, 2026) are unchanged
  and correct.

- Saven GICs have also moved up further. Saven's live non-redeemable table reads 1yr 3.80%,
  2yr 4.25%, 3yr 4.30%, 4yr 4.35%, 5yr 4.50%, confirmed on savenfinancial.ca. The 2, 3, 4, and
  5-year terms are each well past the bar. The 1-year is up only 0.10 pp (3.70% to 3.80%) and
  stays below the bar, though a person refreshing the row may want to update it at the same
  time. The Saven HISA (2.85%) is unchanged and correct.

- Peoples Trust 1-year non-registered GIC reads 3.70% on the provider's dedicated
  non-registered GIC page (claimed 3.25%, +0.45 pp). The 2, 3, 4, and 5-year figures (3.00%,
  3.25%, 3.25%, 3.45%) are unchanged and correct.

- EQ Bank, two items, both with the same method caveat. EQ's own site blocks direct page
  reads (HTTP 403 on eqbank.ca/rates), so these live values came from a search restricted to
  eqbank.ca only, not a direct page read. (1) Everyday savings base rate now reads 1.50%
  (claimed 1.00%, +0.50 pp), effective Oct 29, 2026 per EQ's rates listing; the boosted 2.75%
  with a qualifying $2,000-a-month direct deposit, and the condition itself, are unchanged and
  correct. (2) The 2-year non-registered GIC reads 4.00% (claimed 3.85%, +0.15 pp), right at
  the bar; EQ's 1-year (3.70%) is explicitly labelled and matches the page, and the 3, 4, and
  5-year terms (about 4.15%, 4.15%, 4.30%) are each within 0.10 pp and stay below the bar. A
  person should confirm both EQ figures with a direct look at eqbank.ca before editing.

- CIBC Smart Start cash is now $125 (claimed $175), a confirmed downward change of $50 on
  CIBC's own Smart Start page, conditional on 5 eligible Visa Debit purchases within 60 days.
  The CIBC Smart Account "up to $850" headline is correct. CIBC's pages remain internally
  inconsistent on the Skip+ perk term, so the page's current open-ended Skip+ wording is
  defensible and is not flagged.

- TD: the up-to-$750 headline is correct and the offer is still live, but the page's "Open by
  October 1, 2026" date is wrong and now in the past. TD's own offer page shows an opening
  window of June 4 to November 2, 2026, with qualifying activities due by Jan 4, 2027. Note
  that the live window ends November 2, 2026, which is the run date, so by the time a human
  reviews this the TD offer may itself have closed; confirm first-party before editing.

- Simplii chequing: the claimed offer ($300 plus a $50 Skip gift card, ending Sept 30, 2026)
  has lapsed and been replaced. Simplii's own offer page now shows $350 cash for setting up
  direct deposits of at least $100 a month for four consecutive months within 150 days of
  opening, with no Skip gift card, and an offer period ending January 31, 2027.

## Everything else verified current (no change needed)

- best-gic-rates: Oaken cashable 1yr 2.25%; Peoples Trust 2yr 3.00%, 3yr 3.25%, 4yr 3.25%,
  5yr 3.45%; Saven 1yr 3.80% (up 0.10 pp, below the bar) and HISA 2.85%; EQ Bank 1yr 3.70%
  (explicitly labelled, matches) and 3yr/4yr/5yr within tolerance. Wealthsimple, Simplii, and
  Tangerine GIC figures on this page are described qualitatively rather than asserted, so
  there was nothing to check.

- best-savings-account-rates: EQ Bank boosted 2.75% with a qualifying $2,000 direct deposit
  (base rate flagged above); Saven HISA 2.85%; Oaken savings 2.80% (effective July 28, 2026);
  Wealthsimple Cash 1.25% under $100,000 (Core), 1.75% at $100,000-plus (Premium), 2.25% at
  $500,000-plus (Generation), plus the $2,000 direct-deposit boost, all confirmed on
  wealthsimple.com and matching the page. Tangerine savings promo 4.50% for up to 5 months is
  confirmed on tangerine.ca (the first-party page still shows unfilled template placeholders
  for the explicit start and end dates, so no window could be read, but the rate is current).
  The motusbank wind-down note is historical and needs no check.

- best-chequing-account-bonuses: CIBC Smart Account up to $850 (correct); National Bank up to
  $600 (window May 7 to Nov 3, 2026, confirmed first-party and still live); RBC iPad on
  Signature No Limit Banking and student AirPods 4, both ending Nov 2, 2026, confirmed on
  rbcroyalbank.com. BMO and EQ Bank are described qualitatively on the page (no number
  asserted), so there was nothing to flag; for information, BMO is currently running a cash
  offer on its Performance plan, but since the page makes no BMO claim it is not flagged.

Sources were the providers' own domains only. No aggregator or competitor site was used.
Where EQ Bank and Neo blocked or did not expose a direct page read, the value came from a
search restricted to the provider's own domain, and that caveat is noted on each affected
row. Nothing was guessed.
