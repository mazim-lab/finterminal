# Rate drift report, 2026-09-14

Report-only staleness check of the three personal-finance rate pages against each
provider's own first-party page. No page copy was edited. This is a report for human
review; a person should decide what, if anything, to update.

Run date (America/Toronto): 2026-09-14.

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
| best-gic-rates | Oaken 5yr GIC (annual-pay, non-redeemable) 4.10% | 4.25% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.15 pp) |
| best-gic-rates | Saven 5yr GIC (non-redeemable) 4.05% | 4.25% | https://savenfinancial.ca/en/on-rates | DRIFTED (+0.20 pp) |
| best-gic-rates | Achieva 3yr GIC (non-redeemable) 3.70% | 3.95% | https://www.achieva.mb.ca/rates | DRIFTED (+0.25 pp) |
| best-gic-rates | Achieva 1yr GIC (non-redeemable) 3.60% | could not confirm first-party | https://www.achieva.mb.ca/rates | UNSURE |
| best-gic-rates | Achieva 2yr GIC (non-redeemable) 3.65% | could not confirm first-party | https://www.achieva.mb.ca/rates | UNSURE |
| best-gic-rates | Achieva 4yr GIC (non-redeemable) 3.75% | could not confirm first-party | https://www.achieva.mb.ca/rates | UNSURE |

## Notes for the human reviewer

- The drift this run is confined to GIC rates, and it is upward: three online-bank and
  credit-union issuers repriced their GIC books higher since the page was last set. All
  three flagged rates understate what a reader would actually get today, so the risk is a
  reader seeing a lower number than the provider now offers.
- Oaken: the live annual-pay non-redeemable table (in effect since Aug 21, 2026) reads
  1yr 3.55%, 18mo 3.65%, 2yr 3.90%, 3yr 4.00%, 4yr 4.05%, 5yr 4.25%. Only the 5yr crossed
  the materiality bar (+0.15 pp); the other five terms drifted up 0.05 to 0.10 pp and are
  not flagged. Oaken cashable 1yr (2.25%) and Oaken savings (2.80%) are unchanged.
- Saven: the live non-redeemable table reads 1yr 3.70%, 2yr 3.90%, 3yr 4.00%, 4yr 4.05%,
  5yr 4.25%. Only the 5yr crossed the bar (+0.20 pp); the rest moved up 0.05 to 0.10 pp
  and are not flagged. Saven HISA (2.85%) is unchanged.
- Achieva: the rates table is JavaScript-rendered, so a first-party read surfaced only the
  featured 3yr and 5yr values. The 3yr is confirmed drifted to 3.95% (+0.25 pp). The 5yr
  is confirmed at 4.10% (claimed 4.05%, immaterial). The 1yr, 2yr, and 4yr could not be
  read from Achieva's own domain and are marked UNSURE; the illustrative ladder figures
  found in Achieva blog content were not treated as live rates. Since both confirmable
  Achieva terms moved up, a person should re-check 1yr, 2yr, and 4yr in a real browser.
  Achieva Daily Interest Savings (1.80%) is unchanged.

## Everything else verified current (no change needed)

- best-gic-rates: Oaken cashable 1yr 2.25%; Peoples Trust 1yr 3.25%, 2yr 3.00%, 3yr 3.25%,
  4yr 3.25%, 5yr 3.45%; Saven 1yr, 2yr, 3yr, 4yr and HISA within the bar. EQ, Wealthsimple,
  Simplii, and Tangerine GIC figures on this page are described qualitatively rather than
  asserted, so there was nothing to check.
- best-savings-account-rates: EQ Bank 1.00% base and 2.75% with a qualifying $2,000 direct
  deposit; Saven 2.85%; Oaken 2.80%; Neo Savings 2.75% and Neo High-Interest Savings 1.25%;
  Achieva Daily Interest Savings 1.80%; Wealthsimple Cash 1.25% under $100k, 1.75% over
  $100k, 2.25% at $500k or more; Simplii HISA promo 4.60% for 153 days up to $200,000
  (Aug 1 to Oct 31, 2026); Tangerine savings promo 4.50% for 153 days. All confirmed
  first-party and unchanged.
- best-chequing-account-bonuses: Scotiabank up to $1,000 (end Oct 29, 2026); CIBC Smart
  Account up to $850 and Smart Start (under 25) $175 cash plus 12 months Skip+; TD up to
  $750 (open by Oct 1, 2026) and TD Student $150 (open by Nov 2, 2026); National Bank up to
  $600 (end Nov 3, 2026); RBC iPad and student AirPods 4 (end Nov 2, 2026); Simplii $300
  plus $50 Skip gift card (end Sept 30, 2026); Tangerine $250 (through Oct 31, 2026). All
  confirmed first-party and unchanged.

Sources were the providers' own domains only. No aggregator or competitor site was used.
