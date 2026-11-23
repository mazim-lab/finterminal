# Rate drift report, 2026-11-23

Report-only staleness check of the three personal-finance rate pages against each
provider's own first-party page. No page copy was edited. This is a report for human
review; a person decides what, if anything, to update.

Run date (America/Toronto): 2026-11-23.

Pages checked:
- src/app/personal-finance/best-gic-rates-canada/page.tsx
- src/app/personal-finance/best-savings-account-rates-canada/page.tsx
- src/app/personal-finance/best-chequing-account-bonuses-canada/page.tsx

Materiality bar: a rate off by 0.15 percentage points or more, or an offer that has
clearly ended or changed amount. Everyday rates and promotional rates were kept separate
and never compared to each other. Every live value below was confirmed on the provider's
own domain only. Where a first-party value could not be read, it is marked UNSURE rather
than guessed. No aggregator or competitor site was used.

## Context: the pages were re-verified on November 13, 2026

The three pages carry a November 13, 2026 verification stamp, and almost everything on them
still checks out first-party today. Saven, Peoples Trust, Neo, Achieva's savings and 5-year
GIC, EQ Bank's savings, Wealthsimple Cash, the Simplii savings promo and no-fee chequing
offer, the Tangerine chequing offer, and the BMO, Scotiabank, TD, RBC, and National Bank
chequing offers were each re-confirmed on the provider's own page and match the page. This
report stands alone (it lists everything currently wrong, not only what is new), but for a
reviewer: the only material movement since the November 13 pass is EQ Bank trimming its GIC
term rates and the CIBC Smart Account offer coming down. The UNSURE rows are the same
cloud-blocked providers that cannot be read from this environment; they are not new drift,
only figures this run could not confirm either way.

## Flagged figures

| Page | Claimed figure | Live value | First-party source | Status |
|---|---|---|---|---|
| best-gic-rates | EQ Bank 3-year GIC 4.15% | 4.00% | https://www.eqbank.ca/rates | DRIFTED (-0.15 pp) |
| best-chequing-account-bonuses | CIBC Smart Account welcome offer "up to $850" through bundled actions | Up to $700: $500 base plus a $100 Black Friday bonus (ends December 14, 2026) plus a separate $100 for an eligible credit card. The headline on CIBC's own pages is $600 ($500 plus the $100 Black Friday bonus). No savings-account component and no $850 total appears anywhere on CIBC's offer page. | https://www.cibc.com/en/special-offers/smart-cash-offer.html | CHANGED (amount lower than claimed) |
| best-gic-rates | Oaken 1yr 3.90%, 18mo 3.95%, 2yr 4.30%, 3yr 4.35%, 4yr 4.40%, 5yr 4.50%, cashable 1yr 2.25% | Could not confirm first-party this run (see note) | https://www.oaken.com/en/rates | UNSURE |
| best-savings-account-rates | Oaken Savings Account 3.00% (and 3.00% on TFSA, RSP, spousal RSP savings) | Could not confirm first-party this run (same Oaken page would not read) | https://www.oaken.com/en/rates | UNSURE |
| best-gic-rates | Achieva 1yr 3.95%, 2yr 4.10%, 3yr 4.15%, 4yr 4.20% | Live rate table did not expose these cells (JavaScript-rendered) | https://www.achieva.mb.ca/rates | UNSURE |
| best-chequing-account-bonuses | TD Student Chequing $150 (open by March 3, 2027) | A current TD Student $150 chequing offer was not shown on TD's offers page this run | https://www.td.com/ca/en/personal-banking/new-bank-account-offers-promotions | UNSURE |

## Notes for the human reviewer

Material this run:

- EQ Bank GIC terms, GIC page. EQ Bank has trimmed its GIC rates since the November 13 pass.
  EQ's own rates page and its dedicated GIC page both now read 1yr 3.70%, 15mo 3.80%,
  2yr 4.10%, 27mo 4.00%, 3yr 4.00%, 4yr 4.10%, 5yr 4.25%. The page asserts 1yr 3.70%,
  2yr 4.15%, 3yr 4.15%, 4yr 4.20%, 5yr 4.30% (plus 15mo 3.80% and 27mo 4.10%). Only the
  3-year term crosses the materiality bar, and it does so exactly: claimed 4.15%, live 4.00%,
  a 0.15 pp gap. The 2-year (4.15% to 4.10%), 4-year (4.20% to 4.10%), 5-year (4.30% to
  4.25%), and 27-month (4.10% to 4.00%) figures have all eased by 0.05 to 0.10 pp and sit
  just under the bar, so they are not flagged as separate rows, but a reviewer refreshing the
  EQ row should update the whole set at once since the entire curve moved down a notch. The
  1-year (3.70%) and 15-month (3.80%) figures are unchanged and correct. Confirmed on two EQ
  first-party pages (eqbank.ca/rates and eqbank.ca/personal-banking/gics), which agreed.

- CIBC Smart Account, chequing page. The page says you can earn "up to $850 on the CIBC
  Smart Account through bundled qualifying actions." CIBC's own Smart Account offer page no
  longer supports that figure. It advertises a $600 headline ($500 base plus a limited-time
  $100 Black Friday bonus that ends December 14, 2026), with a further $100 available for
  being approved for an eligible CIBC credit card, for up to $700 in total. There is no
  savings-account tier and no $850 figure anywhere on the page. So the page overstates the
  current CIBC offer by at least $150, and the $850 "bundled actions" framing no longer
  matches how CIBC structures the reward. After December 14, 2026 the Black Friday $100 lapses
  and the stackable total falls to $600 ($500 plus the $100 card bonus). CIBC's separate Smart
  Start offer for clients under 25 ($125 cash plus a free Skip+ membership) and the Smart
  Account monthly fee ($16.95, rising to $17.95 on January 1, 2027, rebated with a $4,000
  daily balance) both still match the page and are not flagged.

UNSURE this run (could not confirm first-party, not guessed):

- Oaken, GIC and savings pages. Oaken's rate page is JavaScript-rendered and returns an empty
  shell to a direct read from this environment. A search restricted to oaken.com surfaced only
  older Oaken rate snapshots, dated August 21, 2026 and October 16, 2026, both earlier than the
  "in effect since November 6, 2026" date the page itself cites, so they can neither confirm
  nor refute the current page. The page's Oaken figures look internally consistent and recent
  (they carry a November 6 effective date, presumably set during the November 13 local pass),
  but this run cannot verify them, so all Oaken GIC terms, the Oaken cashable 1-year, and the
  Oaken Savings 3.00% are left UNSURE. A person on a residential connection should open
  oaken.com directly to settle whether Oaken has moved.

- Achieva 1 through 4 year GICs, GIC page. Achieva's rate table is JavaScript-rendered and did
  not expose the 1, 2, 3, or 4 year cells to any read this run (the rates, achieva-gic, and
  tfsa-gic pages all returned the table headers with empty values). Achieva's 5-year GIC
  (4.35%) and its Daily Interest Savings Account (2.05%) did render and both match the page, so
  only the four shorter GIC terms are UNSURE.

- TD Student Chequing $150, chequing page. The page asserts a separate TD Student Chequing
  offer of $150 (open by March 3, 2027, two activities by May 3, 2027). TD's own offers page
  showed the All-Inclusive ($850), Unlimited ($700), and $150 bundle offers this run, but did
  not surface a student cash offer, so the $150 student figure is left UNSURE rather than
  confirmed or called ended. The main TD offers on the page were all confirmed.

## Everything else verified current this run

- best-gic-rates: Saven 1yr 4.00%, 2yr 4.25%, 3yr 4.30%, 4yr 4.35%, 5yr 4.50% confirmed on
  savenfinancial.ca/en/on-rates (the correct Saven rates page). Peoples Trust 1yr 3.70%,
  2yr 3.00%, 3yr 3.25%, 4yr 3.25%, 5yr 3.45% confirmed on peoplesgroup.com. Achieva 5-year GIC
  4.35% confirmed. EQ Bank 1-year 3.70% and 15-month 3.80% confirmed.

- best-savings-account-rates: Saven HISA 3.00%, EQ Bank Personal Account 1.50% base rising to
  3.00% with a qualifying $2,000-a-month direct deposit, Neo Savings tiers (Essentials 2.25%,
  Start 2.5%, Build 2.75%, Grow 3.00%, as of October 29, 2026) with the old 1.25% HISA closed
  to new accounts, Achieva Daily Interest Savings 2.05%, and Wealthsimple Cash (1.25% under
  $100k, 1.75% over $100k, 2.25% at $500k or more, with a direct-deposit boost) all confirmed
  first-party and match the page. The Simplii HISA promo (5.00% combined for 153 days, up to
  $100,000, November 1, 2026 to January 31, 2027) confirmed on Simplii's own offer page. The
  Tangerine savings promo rate (4.50% for about five months) is live on tangerine.ca; its own
  page renders the eligibility-window dates only as unfilled template placeholders, so the
  July 28 to November 30, 2026 window on the page could not be read back verbatim, but the rate
  and the live offer are confirmed and the window has not passed as of this run.

- best-chequing-account-bonuses: BMO up to $1,100 ($800 chequing plus bundle, Walmart+ up to
  12 months, open by March 1, 2027) confirmed via a bmo.com domain search (BMO's page returns
  503 to a direct read). Scotiabank up to $1,000 ($700 plus $200 registered plus $100 credit
  card, October 30, 2026 to March 4, 2027) confirmed on scotiabank.com. TD up to $1,000
  (All-Inclusive $850 or Unlimited $700, plus a $150 bundle, by March 3, 2027) confirmed on
  td.com. RBC up to $600 ($500 plus a $100 anniversary bonus, open by March 1, 2027, activities
  by May 10, 2027, no iPad or device offer) confirmed on rbcroyalbank.com. Simplii No Fee
  Chequing $350 (recurring deposits of $100-plus a month for four consecutive months, ends
  January 31, 2027) confirmed. Tangerine Chequing $250 (payroll direct deposits of $200-plus a
  month, Client Numbers through April 30, 2027) confirmed. National Bank confirmed as no offer
  running (the up-to-$600 cashback ended November 3, 2026, under an "Offer ended" heading).
  CIBC Smart Start $125 and the CIBC monthly fee confirmed (the CIBC Smart Account total is the
  flagged item above).

Sources were the providers' own domains only. No aggregator or competitor site was used.
Where Oaken and BMO blocked or did not expose a direct page read, the value came from a search
restricted to the provider's own domain, and that caveat is noted on the affected rows.
Nothing was guessed.
