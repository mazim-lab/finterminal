# Rate drift report, 2026-09-21

Report-only staleness check of the three personal-finance rate pages against each
provider's own first-party page. No page copy was edited. This is a report for human
review; a person should decide what, if anything, to update.

Run date (America/Toronto): 2026-09-21.

Pages checked:
- src/app/personal-finance/best-gic-rates-canada/page.tsx
- src/app/personal-finance/best-savings-account-rates-canada/page.tsx
- src/app/personal-finance/best-chequing-account-bonuses-canada/page.tsx

Materiality bar: a rate off by 0.15 percentage points or more, or an offer that has
clearly ended or changed amount. Everyday rates and promotional rates were kept separate
and never compared to each other. Every live value below was confirmed on the provider's
own domain only. Where a first-party value could not be confirmed, it is marked UNSURE
rather than guessed.

## Flagged figures

| Page | Claimed figure | Live value | First-party source | Status |
|---|---|---|---|---|
| best-gic-rates | Oaken 1yr GIC (annual-pay, non-redeemable) 3.55% | 3.80% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.25 pp) |
| best-gic-rates | Oaken 18mo GIC (annual-pay, non-redeemable) 3.65% | 3.85% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.20 pp) |
| best-gic-rates | Oaken 5yr GIC (annual-pay, non-redeemable) 4.25% | 4.40% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.15 pp) |
| best-gic-rates | Peoples Trust 1yr GIC (non-registered, annual-pay) 3.25% | 3.40% | https://www.peoplesgroup.com/personal/resources/account-rates | DRIFTED (+0.15 pp) |
| best-chequing-account-bonuses | CIBC Smart Start (under 25) Skip+ described as free "for as long as your eligible CIBC card is linked to your Skip account and active" | CIBC's own page states the perk is 12 months of Skip+ for free | https://www.cibc.com/en/personal-banking/bank-accounts.html | CHANGED (offer term) |

## Notes for the human reviewer

- The rate drift this run is confined to GIC rates and it is upward: two issuers repriced
  higher since the page was last set, so every flagged rate understates what a reader would
  actually get today. The risk is a reader seeing a lower number than the provider now
  offers, not a headline that overpromises.
- Oaken: the live annual-pay non-redeemable table now reads 1yr 3.80%, 18mo 3.85%,
  2yr 4.05%, 3yr 4.20%, 4yr 4.25%, 5yr 4.40%. Three terms crossed the materiality bar:
  1yr (+0.25 pp), 18mo (+0.20 pp), and 5yr (+0.15 pp). The 3yr and 4yr each moved up
  0.10 pp and are below the bar, so they are not flagged, though a person updating the
  table may want to refresh them at the same time. Oaken 2yr (4.05%), cashable 1yr
  (2.25%), and Oaken savings (2.80%) are unchanged and correct.
- Peoples Trust: the 1yr non-registered GIC moved up to 3.40% (claimed 3.25%, +0.15 pp).
  The 2yr (3.00%), 3yr (3.25%), 4yr (3.25%), and 5yr (3.45%) are unchanged and correct.
- CIBC Smart Start Skip+ term: this is a changed offer detail rather than a rate or dollar
  amount, but it is flagged because the page now makes a specific claim that CIBC's own
  page contradicts. The page copy currently says the Skip+ membership stays free "for as
  long as your eligible CIBC card is linked to your Skip account and active, rather than
  for a fixed 12 months." CIBC's own bank accounts page presents it as "12 months of Skip+
  for free." The prior 2026-09-14 report verified this same perk as 12 months, so the page
  appears to have been edited toward the open-ended wording since then. The $175 cash
  amount itself is unchanged and correct. A person should re-check the Skip+ term against
  CIBC's live offer disclosure and, if the 12 month framing is current, restore it.

## Everything else verified current (no change needed)

- best-gic-rates: Oaken 2yr 4.05% and cashable 1yr 2.25%; Achieva 1yr 3.65%, 2yr 3.75%,
  3yr 3.95%, 4yr 3.90%, 5yr 4.10%; Peoples Trust 2yr 3.00%, 3yr 3.25%, 4yr 3.25%,
  5yr 3.45%; EQ Bank 1yr 3.70%, 2yr 3.85%, 3yr 4.10%, 4yr 4.15%, 5yr 4.25%; Saven 1yr
  3.70%, 2yr 3.90%, 3yr 4.00%, 4yr 4.05%, 5yr 4.25%. Wealthsimple, Simplii, and Tangerine
  GIC figures on this page are described qualitatively rather than asserted, so there was
  nothing to check.
- best-savings-account-rates: EQ Bank 1.00% base and 2.75% with a qualifying $2,000
  direct deposit; Saven 2.85%; Oaken 2.80%; Neo Savings 2.75% and Neo High-Interest
  Savings 1.25%; Achieva Daily Interest Savings 1.80%; Wealthsimple Cash 1.25% under
  $100k, 1.75% over $100k, 2.25% at $500k or more; Simplii HISA promo 4.60% for 153 days
  up to $200,000 (Aug 1 to Oct 31, 2026); Tangerine savings promo 4.50% for 153 days. All
  confirmed first-party and unchanged.
- best-chequing-account-bonuses: Scotiabank up to $1,000 (end Oct 29, 2026); CIBC Smart
  Account up to $850 and Smart Start (under 25) $175 cash (see the Skip+ note above); TD up
  to $750 (open by Oct 1, 2026) and TD Student $150 (open by Nov 2, 2026); National Bank up
  to $600 (end Nov 3, 2026); RBC iPad and student AirPods 4 (end Nov 2, 2026); Simplii $300
  plus $50 Skip gift card (end Sept 30, 2026); Tangerine $250 (through Oct 31, 2026). All
  dollar amounts and dates confirmed first-party and unchanged.

Sources were the providers' own domains only. No aggregator or competitor site was used.
