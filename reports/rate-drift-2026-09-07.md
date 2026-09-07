# Rate drift report, 2026-09-07

Report-only staleness check of the three personal-finance rate pages against each
provider's own first-party page. No page copy was edited. This is a report for human
review; a person should decide what, if anything, to update.

Run date (America/Toronto): 2026-09-07.

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
| best-gic-rates | Saven 1yr GIC (annual-pay, non-redeemable) 3.60% | 2.50% | https://savenfinancial.ca/en/on-gics | DRIFTED (-1.10 pp) |
| best-gic-rates | Saven 2yr GIC 3.85% | 2.75% | https://savenfinancial.ca/en/on-gics | DRIFTED (-1.10 pp) |
| best-gic-rates | Saven 3yr GIC 3.90% | 3.70% | https://savenfinancial.ca/en/on-gics | DRIFTED (-0.20 pp) |
| best-gic-rates | Achieva 3yr GIC (annual-pay, non-redeemable) 3.70% | 3.95% | https://www.achieva.mb.ca/rates | DRIFTED (+0.25 pp) |
| best-gic-rates | Achieva 1yr GIC 3.60% | could not confirm first-party | https://www.achieva.mb.ca/rates | UNSURE |
| best-gic-rates | Achieva 2yr GIC 3.65% | could not confirm first-party | https://www.achieva.mb.ca/rates | UNSURE |
| best-gic-rates | Achieva 4yr GIC 3.75% | could not confirm first-party | https://www.achieva.mb.ca/rates | UNSURE |
| best-gic-rates | Achieva 5yr GIC 4.05% | could not confirm first-party | https://www.achieva.mb.ca/rates | UNSURE |

## Notes for the human reviewer

- Saven Financial is the largest concern. Its non-redeemable GIC table now reads 1yr 2.50%,
  2yr 2.75%, 3yr 3.70%, 4yr 3.85%, 5yr 3.95%. The short terms have fallen hard: our page
  overstates the 1yr and 2yr by a full 1.10 pp each, which is a big miss for a reader
  choosing a short GIC. The 3yr is overstated by 0.20 pp. The 4yr (claimed 3.95% vs live
  3.85%) and 5yr (claimed 4.05% vs live 3.95%) are each off by 0.10 pp, below the
  materiality bar, so they are not flagged, but they lean the same direction and a person
  may want to trim them while touching this row anyway. One caveat: a stray 4% and 4.1%
  figure also appears in a rate-calculator widget on Saven's page without a clear term
  label. The standard non-redeemable table consistently shows 3.95% for the 5yr, so 3.95%
  is reported as the live 5yr, but a human should eyeball that widget before finalizing the
  5yr cell.
- Oaken repriced its GIC book upward again since the last check. Annual-pay non-redeemable
  is now 1yr 3.55%, 18mo 3.65%, 2yr 3.90%, 3yr 4.00%, 4yr 4.05%, 5yr 4.25% (effective around
  Aug 21, 2026). Only the 5yr crosses the materiality bar (4.10% to 4.25%, +0.15 pp). The
  other five terms each drifted up by 0.05 to 0.10 pp, which is below the bar, so they are
  not flagged, though a person updating the 5yr may want to refresh the whole Oaken row at
  once. Oaken cashable 1yr (2.25%) is unchanged.
- Achieva only exposes its 3yr rate (3.95%, up from our 3.70%) in first-party page content
  and search snippets. The 1yr, 2yr, 4yr, and 5yr terms load through a JavaScript rate
  widget that neither a first-party page fetch nor a domain-restricted search would reveal,
  so those four are marked UNSURE rather than guessed. Given the confirmed 3yr moved up
  0.25 pp, the other Achieva terms may well have moved too; confirming them needs a real
  browser render of achieva.mb.ca/rates or a direct check with Achieva. Achieva's savings
  side (1.80% Daily Interest Savings) is unchanged and confirmed.
- Payout-frequency was matched like-to-like throughout. All four GIC issuers above were
  confirmed to offer annual-pay (per-annum, paid on each anniversary), so every comparison
  is annual-pay to annual-pay. No cross-payout comparisons were made.

## Everything else verified current (no change needed)

- best-gic-rates: Oaken 1yr 3.50% to 3.55%, 18mo 3.60% to 3.65%, 2yr 3.85% to 3.90%, 3yr
  3.90% to 4.00%, 4yr 3.95% to 4.05% (all immaterial, below the 0.15 pp bar); Oaken cashable
  2.25%; Peoples Trust 1yr 3.25%, 2yr 3.00%, 3yr 3.25%, 4yr 3.25%, 5yr 3.45% (exact match,
  all five). EQ, Wealthsimple, Simplii, Tangerine GIC figures on this page are described
  qualitatively rather than asserted, so nothing to check.
- best-savings-account-rates: every figure matched first-party with zero drift. EQ Bank
  1.00% base and 2.75% with a qualifying $2,000 direct deposit; Saven HISA 2.85%; Oaken
  Savings 2.80% (in effect since Aug 21, 2026); Neo Savings 2.75% (effective June 24, 2026)
  and Neo High-Interest Savings 1.25%; Achieva Daily Interest Savings 1.80%; Wealthsimple
  Cash 1.25% under $100k, 1.75% over $100k, 2.25% at $500k or more. Both promos are still
  live and unchanged: Simplii HISA 4.60% (window Aug 1 to Oct 31, 2026, cap $200,000) and
  Tangerine savings 4.50% new-client (153 days). Note that the Saven 2.85% HISA is fine; it
  is only Saven's GIC table that drifted.
- best-chequing-account-bonuses: every offer matched first-party with no material change.
  Scotiabank up to $1,000 (end Oct 29, 2026); CIBC Smart Account up to $850 and Smart Start
  (under 25) $175 cash plus Skip+; TD up to $750 (open by Oct 1, 2026) and TD Student $150
  (open by Nov 2, 2026); National Bank up to $600 (end Nov 3, 2026); Simplii $300 plus $50
  Skip gift card (end Sept 30, 2026); Tangerine $250 (through Oct 31, 2026); RBC iPad and
  student AirPods 4 with Apple Music (end Nov 2, 2026). CIBC does not publish an explicit
  end date on its first-party pages, but our page asserts no CIBC end date, so there is
  nothing stale there.

Sources were the providers' own domains only. No aggregator or competitor site was used.
</content>
</invoke>
