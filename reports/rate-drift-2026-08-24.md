# Rate drift report, 2026-08-24

Report-only staleness check of the three personal-finance rate pages against each
provider's own first-party page. No page copy was edited. This is a report for human
review; a person should decide what, if anything, to update.

Run date (America/Toronto): 2026-08-24.

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
| best-gic-rates | Oaken 5yr GIC (annual-pay, non-redeemable) 4.10% | 4.25% | https://www.oaken.com/gic-rates/ | DRIFTED (+0.15 pp) |

## Notes for the human reviewer

- Oaken repriced its GIC book upward again since the last check. The whole ladder ticked
  up, but only the 5yr crosses the materiality bar: claimed 4.10% versus a live 4.25%,
  which is exactly +0.15 pp and therefore flagged. The shorter terms all rose too but stay
  within tolerance and are not flagged: 1yr 3.50% to 3.55% (+0.05), 18mo 3.60% to 3.65%
  (+0.05), 2yr 3.85% to 3.90% (+0.05), 3yr 3.90% to 4.00% (+0.10), 4yr 3.95% to 4.05%
  (+0.10). A reviewer may still want to refresh the whole Oaken row at once, since the page
  asserts each of these as a verified bold figure, even though only the 5yr is formally
  material. Oaken cashable 1yr (2.25%), the $1,000 minimum, and Oaken savings (2.80%) are
  all unchanged.
- Nothing else drifted, ended, or came back UNSURE. Every other asserted figure on all
  three pages was confirmed live on the provider's own domain.

## Everything else verified current (no change needed)

- best-gic-rates: Achieva 1yr 3.60%, 2yr 3.65%, 3yr 3.70%, 4yr 3.75%, 5yr 4.05%, DISA
  1.80%; Peoples Trust 1yr 3.25%, 2yr 3.00%, 3yr 3.25%, 4yr 3.25%, 5yr 3.45%; Saven 1yr
  3.60%, 2yr 3.85%, 3yr 3.90%, 4yr 3.95%, 5yr 4.05%; Oaken shorter terms and cashable (see
  note above). EQ, Wealthsimple, Simplii, Tangerine, and the big banks are described
  qualitatively on this page rather than asserted with a number, so there was nothing to
  check.
- best-savings-account-rates: EQ Bank 1.00% base and 2.75% with a qualifying $2,000 direct
  deposit; Saven 2.85%; Oaken 2.80%; Neo Savings 2.75% and Neo High-Interest Savings 1.25%;
  Achieva Daily Interest Savings 1.80%; Wealthsimple Cash 1.25% under $100k, 1.75% over
  $100k, 2.25% at $500k or more; Simplii HISA promo 4.60% for 153 days up to $200,000
  (Aug 1 to Oct 31, 2026); Tangerine savings promo 4.50% for 153 days.
- best-chequing-account-bonuses: Scotiabank up to $1,000 (end Oct 29, 2026); CIBC Smart
  Account up to $850 and Smart Start $175 plus Skip+ (free while an eligible card stays
  linked and active); TD up to $750 (open by Oct 1, 2026) and TD Student $150 (open by
  Nov 2, 2026); National Bank up to $600 (end Nov 3, 2026); Simplii $300 plus $50 Skip gift
  card (end Sept 30, 2026); Tangerine $250 (through Oct 31, 2026); RBC iPad and student
  AirPods 4 with Apple Music (open by Nov 2, 2026).

Sources were the providers' own domains only. No aggregator or competitor site was used.
Where a first-party value could not be confirmed, it is marked UNSURE rather than guessed.
