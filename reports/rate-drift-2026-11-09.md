# Rate drift report, 2026-11-09

Report-only staleness check of the three personal-finance rate pages against each
provider's own first-party page. No page copy was edited. This is a report for human
review; a person decides what, if anything, to update.

Run date (America/Toronto): 2026-11-09.

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

Five earlier watchdog branches are still open and unmerged: rate-watchdog-2026-09-21,
rate-watchdog-2026-10-05, rate-watchdog-2026-10-12, and rate-watchdog-2026-11-02. Because
none has merged, the live pages still show the old figures, so several drifts those
branches flagged are still true today and are repeated here so this report stands on its
own. This run is not a duplicate: it adds new material drift that appeared in the week
since the 2026-11-02 branch, almost all of it on the chequing page where several
promotional windows have now rolled over.

What is genuinely NEW this run (the 2026-11-02 branch listed each of these as live,
current, or unchanged):

- TD chequing. The page's "up to $750 / open by October 1, 2026" offer has been replaced.
  TD's own offers page now advertises a different, higher cash offer (850 dollars on the
  All-Inclusive plan or 700 dollars on Unlimited Chequing) with a brand new opening window
  of November 3, 2026 to March 3, 2027. The amount and the window have both changed.
- RBC chequing. The page's "new iPad" and student "AirPods 4" device promotion has ended.
  RBC's own page now shows cash offers only, with no device or Apple Music offer anywhere on
  it.
- National Bank. The page's up-to-600-dollar cashback offer has ended. National Bank's own
  page now displays an "Offer ended" heading over the May 7 to November 3, 2026 window.
- Saven's 1-year GIC and its HISA have each crossed the materiality bar since November 2
  (both were below the bar on that branch).
- EQ Bank's boosted everyday savings rate (the rate you get with a qualifying direct
  deposit) rose from 2.75% to 3.00%, effective November 6, 2026. The 2026-11-02 branch read
  that boosted rate as unchanged at 2.75%, so this is a genuine new move.
- Neo's savings membership tiers were repriced upward again (effective October 29, 2026).

Rows below are tagged NEW (not on the open branches, or changed since them) or CARRIED
(already flagged on an open branch and still true) so a reviewer can see what changed.

## Flagged figures

| Page | Claimed figure | Live value | First-party source | Status |
|---|---|---|---|---|
| best-chequing-account-bonuses | TD "up to $750" total value, "Open by October 1, 2026" | Offer replaced: new TD cash offer is 850 dollars (All-Inclusive) or 700 dollars (Unlimited Chequing), plus a 150-dollar bundle offer and a 90-day 4% bonus savings interest offer; opening window November 3, 2026 to March 3, 2027 | https://www.td.com/ca/en/personal-banking/new-bank-account-offers-promotions | CHANGED (amount and window; old Oct 1 date now in the past), NEW |
| best-chequing-account-bonuses | RBC "new iPad" on Signature No Limit plus student "AirPods 4" and Apple Music, "Offer ends November 2, 2026" | Device offer ended and replaced with cash: up to 1,000 dollars (chequing plus credit card, ends March 1, 2027), 150 dollars student (RBC Advantage Banking for Students, ends May 31, 2027), and up to 600 dollars on Signature No Limit Banking. No iPad, AirPods, or Apple Music offer appears on the page | https://www.rbcroyalbank.com/accounts/index.html | ENDED / REPLACED (device to cash), NEW |
| best-chequing-account-bonuses | National Bank "up to $600" cashback, "Offer end date November 3, 2026" | Offer ended. The page shows an "Offer ended" heading over the May 7 to November 3, 2026 window | https://www.nbc.ca/personal/accounts.html | ENDED, NEW |
| best-gic-rates | Saven 1yr GIC (non-redeemable) 3.70% | 4.00% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.30 pp), NEW (was below the bar on Nov 2) |
| best-savings-account-rates | Saven HISA 2.85% | 3.00% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.15 pp), NEW |
| best-savings-account-rates | EQ Bank Personal Account boosted rate (with a qualifying $2,000/month direct deposit) 2.75% | 3.00% (effective Nov 6, 2026) | eqbank.ca (domain-restricted search; see method note) | DRIFTED (+0.25 pp), NEW |
| best-savings-account-rates | Neo Savings 2.75%, condition stated as "minimum combined balance" | Membership tiers, effective Oct 29, 2026: Essentials 2.25%, Start 2.5%, Build 2.75%, Grow 3.00%. The 2.75% is now the mid "Build" tier, the top rate is 3.00% (Grow, $14.99/month), and the qualifier is a paid membership, not a balance | https://www.neofinancial.com/accounts/interest-rates | CHANGED (condition wrong, tiers moved up, 2.75% no longer the top rate), NEW |
| best-savings-account-rates | EQ Bank Personal Account everyday base rate 1.00% | 1.50% (effective Nov 6, 2026) | eqbank.ca (domain-restricted search; see method note) | DRIFTED (+0.50 pp), CARRIED |
| best-savings-account-rates | Achieva Daily Interest Savings everyday rate 1.80% | 2.05% | https://www.achieva.mb.ca/daily-interest-savings-account | DRIFTED (+0.25 pp), CARRIED |
| best-savings-account-rates | Simplii HISA promo 4.60% for 153 days, up to $200,000 (window Aug 1 to Oct 31, 2026) | Promo ended and replaced: 5.00% combined for 153 days, up to $100,000, new window Nov 1, 2026 to Jan 31, 2027 | https://www.simplii.com/en/special-offers/high-interest-savings-account.html | ENDED / REPLACED, CARRIED |
| best-gic-rates | Saven 2yr GIC (non-redeemable) 3.90% | 4.25% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.35 pp), CARRIED |
| best-gic-rates | Saven 3yr GIC (non-redeemable) 4.00% | 4.30% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.30 pp), CARRIED |
| best-gic-rates | Saven 4yr GIC (non-redeemable) 4.05% | 4.35% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.30 pp), CARRIED |
| best-gic-rates | Saven 5yr GIC (non-redeemable) 4.25% | 4.50% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.25 pp), CARRIED |
| best-gic-rates | Peoples Trust 1yr GIC (non-registered, annual-pay) 3.25% | 3.70% | https://www.peoplesgroup.com/personal/gic/non-registered | DRIFTED (+0.45 pp), CARRIED |
| best-gic-rates | Achieva 5yr GIC (non-redeemable) 4.10% | 4.35% | https://www.achieva.mb.ca/achieva-gic | DRIFTED (+0.25 pp), CARRIED |
| best-chequing-account-bonuses | CIBC Smart Start (under 25) $175 cash | $125 cash | https://www.cibc.com/en/special-offers/smart-start.html | CHANGED (amount, lower by $50), CARRIED |
| best-chequing-account-bonuses | Scotiabank "up to $1,000", "Offer end date October 29, 2026" | Up to 1,000 dollars still offered, but the Oct 29 window closed; a renewed up-to-1,000-dollar bundled offer now runs October 30, 2026 to March 4, 2027, and the 200-dollar tier now requires a registered account (RRSP/TFSA/FHSA) rather than the "Money Master Savings Account" the page names | https://www.scotiabank.com/ca/en/personal/bank-accounts/chequing-accounts.html | CHANGED (stale end date, offer renewed, amount unchanged), CARRIED |
| best-chequing-account-bonuses | Simplii No Fee Chequing $300 plus a $50 Skip gift card (ends Sept 30, 2026) | Offer replaced: 350 dollars cash, no Skip gift card, ends January 31, 2027 | https://www.simplii.com/en/special-offers/no-fee-chequing-account.html | ENDED / REPLACED, CARRIED |
| best-chequing-account-bonuses | Tangerine Chequing $250, "Offer period runs through October 31, 2026" | 250 dollars unchanged, but the Oct 31 date is stale; the live window now runs through April 30, 2027 | https://www.tangerine.ca/en/ | CHANGED (stale end date, offer extended, amount unchanged), CARRIED |
| best-gic-rates | Oaken 1yr/18mo/2yr/3yr/4yr/5yr GICs (3.55 / 3.65 / 4.05 / 4.10 / 4.15 / 4.25) | Could not confirm first-party this run (see note) | https://www.oaken.com/gic-rates/ | UNSURE |
| best-gic-rates | Achieva 1yr/2yr/3yr/4yr GICs (3.65 / 3.75 / 3.95 / 3.90) | Live rate table did not expose these cells | https://www.achieva.mb.ca/rates | UNSURE, CARRIED |
| best-gic-rates | EQ Bank 1yr-5yr GICs (3.70 / 3.85 / 4.10 / 4.15 / 4.25) | eqbank.ca blocks direct page reads and the GIC term cells were not exposed via a domain-restricted search this run | https://www.eqbank.ca/rates | UNSURE |
| best-chequing-account-bonuses | TD Student Chequing $150 (open by November 2, 2026) | The open-by date has passed and a current TD Student 150-dollar offer was not found on TD's offers page this run | https://www.td.com/ca/en/personal-banking/new-bank-account-offers-promotions | UNSURE |

## Notes for the human reviewer

New or changed this run:

- TD chequing. This is the most consequential change. The page asserts "up to $750 in
  total value" with an "Open by October 1, 2026" date. TD's own offers page now runs a
  different, higher promotion: Offer 1 pays 850 dollars on the All-Inclusive Banking Plan or
  700 dollars on Unlimited Chequing, Offer 2 adds 150 dollars for bundling a savings account
  and an eligible credit card, and Offer 3 adds a 90-day 4% bonus savings interest offer.
  The opening window is November 3, 2026 to March 3, 2027. So both the dollar structure and
  the dates on the page are now wrong. TD's own page is internally inconsistent about a
  separate add-on amount, so a human should confirm the exact tiers first-party before
  rewriting the row.

- RBC chequing. The page describes RBC's current chequing promotion as a "new iPad" on
  Signature No Limit Banking, plus a student "AirPods 4" with three months of Apple Music.
  Both device offers have ended (their November 2, 2026 deadline has passed). RBC's own page
  now shows cash offers only: up to 1,000 dollars when you open an eligible chequing account
  with an eligible RBC credit card (ends March 1, 2027), 150 dollars on RBC Advantage Banking
  for Students (ends May 31, 2027), and up to 600 dollars on Signature No Limit Banking. Both
  halves of RBC's long offers page were read and neither mentions an iPad, AirPods, or Apple
  Music offer. The whole RBC paragraph on the page is now out of date.

- National Bank. The page asserts "up to $600 cashback" with an "Offer end date November 3,
  2026." National Bank's own accounts page now shows that window (May 7 to November 3, 2026)
  under an "Offer ended" heading, so the offer the page describes has closed. No replacement
  amount or window was visible on the page at the time of this run, so there is nothing new
  to assert in its place yet; a human should check first-party for a successor offer before
  editing.

- Saven, two items. Saven has repriced upward again. Its live non-redeemable GIC table now
  reads 1yr 4.00%, 2yr 4.25%, 3yr 4.30%, 4yr 4.35%, 5yr 4.50%, and its HISA now reads 3.00%,
  all confirmed on savenfinancial.ca. The 1-year GIC (3.70% claimed, now 4.00%, +0.30 pp) and
  the HISA (2.85% claimed, now 3.00%, +0.15 pp) have each crossed the materiality bar since
  the 2026-11-02 branch, which had both below it. The 2 through 5 year GIC drifts were
  already flagged on the open branches and remain true.

- EQ Bank, savings page. EQ's own rates listing and a matching EQ news release
  (both on eqbank.ca) show the Personal Account base rate at 1.50% and the boosted rate at
  3.00% with a qualifying 2,000-dollar monthly direct deposit, effective November 6, 2026.
  The page claims 1.00% base rising to 2.75%. So the base is up 0.50 pp (a carried drift) and
  the boosted rate is up 0.25 pp (a new drift this run; the 2026-11-02 branch read the
  boosted rate as unchanged at 2.75%). Method note: eqbank.ca returns an empty shell to a
  direct page read (it bot-blocks WebFetch), so both EQ savings values here came from a search
  restricted to eqbank.ca only, cross-checked against EQ's own news release, not a direct page
  read. A person should confirm both with a signed-in look at eqbank.ca before editing. EQ's
  GIC term rates could not be exposed first-party this run, so they are marked UNSURE rather
  than carried.

- Neo, savings page. Neo's own interest-rates page (dated October 29, 2026) now shows the
  Neo Savings tiers at Essentials 2.25%, Start 2.5%, Build 2.75%, and Grow 3.00%, tied to a
  paid membership rather than a balance. This is a further step up from the tiers the
  2026-11-02 branch recorded (which topped out at 2.75%). So the 2.75% the page cites is no
  longer the top rate (it is now the middle Build tier), the top rate is 3.00% on the Grow
  membership ($14.99/month), and the page's "minimum combined balance" condition is still
  wrong. The separate Neo High-Interest Savings account is still 1.25% (matching the page, so
  no rate drift), but Neo's page notes it is closed to new accounts.

Carried from the open branches (still true because those branches are unmerged, and
re-confirmed first-party this run unless noted):

- Peoples Trust 1-year non-registered GIC reads 3.70% on the provider's dedicated
  non-registered GIC page (claimed 3.25%, +0.45 pp). The 2 through 5 year figures (3.00%,
  3.25%, 3.25%, 3.45%) are unchanged and correct.

- Achieva Daily Interest Savings reads 2.05% on Achieva's own product page (claimed 1.80%,
  +0.25 pp). This is an everyday, non-promotional rate. Achieva's 5-year GIC is first-party
  confirmed at 4.35% (claimed 4.10%, +0.25 pp). The 1 through 4 year Achieva GIC terms remain
  unreadable first-party (the live table is JavaScript-rendered and did not expose those
  cells), so those four stay UNSURE rather than being carried as confirmed drifts.

- Simplii HISA (savings page) promo is replaced, confirmed on Simplii's own high-interest
  savings offer page: 5.00% combined (regular plus promotional) for 153 days on balances up to
  100,000 dollars, window November 1, 2026 to January 31, 2027. So versus the page the rate is
  up (4.60% to 5.00%), the cap is halved (200,000 to 100,000 dollars), and the window has
  rolled forward. Kept separate from the everyday leaders as a promotional rate.

- Simplii No Fee Chequing (chequing page) is replaced: Simplii's own offer page now shows
  350 dollars cash for setting up recurring deposits of at least 100 dollars a month for four
  consecutive months within 150 days of opening, with no Skip gift card, and an offer period
  ending January 31, 2027. The page's "$300 plus a $50 Skip gift card, ends Sept 30, 2026" has
  lapsed.

- Scotiabank chequing (chequing page). The "up to $1,000" headline is still correct, but the
  page's "Offer end date October 29, 2026" is in the past. Scotiabank's own chequing page shows
  a renewed up-to-1,000-dollar bundled offer (Ultimate and Preferred packages) with an opening
  window of October 30, 2026 to March 4, 2027. The breakdown is 700 dollars for the chequing
  account plus activity, 200 dollars for opening a registered account (now RRSP, TFSA, or FHSA,
  where the page says "Money Master Savings Account"), and 100 dollars for an eligible credit
  card. The main risk is a reader trusting the Oct 29 date and wrongly believing the offer
  ended.

- Tangerine chequing (chequing page). The 250-dollar amount is unchanged and correct, but the
  page's "Offer period runs through October 31, 2026" is stale. Tangerine's own site shows the
  New Client Payroll Offer open to Client Numbers created between May 1, 2024 and April 30,
  2027, with the same 200-dollar-a-month payroll conditions. As with TD and Scotiabank, the
  risk is a reader believing a live offer has expired.

- CIBC Smart Start cash is confirmed at 125 dollars on CIBC's own Smart Start page (claimed
  175 dollars), conditional on 5 eligible Visa Debit purchases within 60 days. The CIBC Smart
  Account "up to $850" headline is not contradicted by anything first-party this run.

UNSURE this run (could not confirm first-party, not guessed):

- Oaken GICs. Oaken's rate page is JavaScript-rendered and returned no rate figures to a
  direct page read. A search restricted to oaken.com returned Oaken's own rate page showing
  1yr 3.55%, 18mo 3.65%, and 5yr 4.25% "in effect since August 21, 2026", which match the
  values the page already asserts. That domain-restricted summary could not be fully trusted
  (its own date metadata was flagged as inconsistent) and it did not reproduce the higher
  Oaken figures that earlier open branches recorded. Because this run could neither confirm a
  drift nor cleanly confirm the page is current, all Oaken GIC terms (and, since the same page
  would not read, the Oaken cashable 1-year and savings rates) are marked UNSURE. A person
  should open oaken.com/gic-rates directly to settle whether Oaken has drifted. Note this is a
  change from the open branches, which recorded Oaken as drifted upward; that drift could not
  be reproduced first-party today.

- Achieva 1 through 4 year GICs, EQ Bank GIC terms, and the TD Student 150-dollar offer: each
  could not be read first-party this run and is left UNSURE, as noted in the table.

## Everything else verified current, or not re-checked this run

- best-gic-rates: Peoples Trust 2 through 5 year GICs (3.00%, 3.25%, 3.25%, 3.45%) are
  unchanged and correct. Saven 1-year HISA and the 2 through 5 year GIC drifts are covered
  above. Wealthsimple, Simplii, and Tangerine GIC figures on this page are described
  qualitatively rather than asserted, so there was nothing to check.

- best-savings-account-rates: Oaken Savings (2.80%) could not be read this run (Oaken page
  would not render), so it is not asserted as current. Wealthsimple Cash tiers
  (1.25% / 1.75% / 2.25%) were not re-verified this run; they were confirmed on the 2026-11-02
  branch and the page is unchanged. The Tangerine savings promo and the motusbank wind-down
  note were not re-checked this run and are unchanged on the page.

- best-chequing-account-bonuses: CIBC Smart Account "up to $850" is not contradicted
  first-party. BMO and EQ Bank are described qualitatively on the page (no number asserted),
  so there is nothing to flag.

Sources were the providers' own domains only. No aggregator or competitor site was used.
Where EQ Bank and Oaken blocked or did not expose a direct page read, the value came from a
search restricted to the provider's own domain, and that caveat is noted on each affected
row. Nothing was guessed.
