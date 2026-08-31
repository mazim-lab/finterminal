# Rate drift report, 2026-08-31

Report-only staleness check of the three personal-finance rate pages against each
provider's own first-party page. No page copy was edited. This is a report for human
review; a person should decide what, if anything, to update.

Run date (America/Toronto): 2026-08-31.

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
| best-gic-rates | Achieva 3yr GIC (non-redeemable) 3.70% | 3.95% | https://www.achieva.mb.ca/rates | DRIFTED (+0.25 pp) |
| best-gic-rates | Achieva 1yr GIC (non-redeemable) 3.60% | could not read (JavaScript-rendered table) | https://www.achieva.mb.ca/rates | UNSURE |
| best-gic-rates | Achieva 2yr GIC (non-redeemable) 3.65% | could not read (JavaScript-rendered table) | https://www.achieva.mb.ca/rates | UNSURE |
| best-gic-rates | Achieva 4yr GIC (non-redeemable) 3.75% | could not read (JavaScript-rendered table) | https://www.achieva.mb.ca/rates | UNSURE |
| best-gic-rates | Achieva 5yr GIC (non-redeemable) 4.05% | could not read (JavaScript-rendered table) | https://www.achieva.mb.ca/rates | UNSURE |

## Notes for the human reviewer

- Oaken repriced its GIC book upward again (the live table on oaken.com is stated as in
  effect since August 21, 2026). Reading the annual-pay column, only the 5yr crosses the
  materiality bar: claimed 4.10% versus live 4.25% (+0.15 pp). The shorter terms also
  drifted up but by less than 0.15 pp, so they are not flagged: live annual-pay 1yr 3.55%,
  18mo 3.65%, 2yr 3.90%, 3yr 4.00%, 4yr 4.05%. Oaken cashable 1yr (2.25%) and Oaken savings
  (2.80%) are both unchanged and match the pages.
  - One thing for a person to double-check before editing: the page labels the Oaken row
    "annual-pay," and the claimed figures line up almost exactly with Oaken's semi-annual-pay
    column (which sits about 0.05 pp below the annual column across terms). If the intent was
    the annual-pay column, the 5yr should read 4.25% and several other terms are one step low.
    If the intent was semi-annual, most terms match and only the 5yr is off (semi-annual 5yr
    is 4.20% versus claimed 4.10%). Either way the 5yr is stale; confirm the column basis when
    updating.
- Achieva 3yr GIC: Achieva's featured "3 Year GIC" block reads 3.95% on both its rates page
  and its GIC product page (https://www.achieva.mb.ca/achieva-gic), read directly from static
  first-party text and consistent across both. The page claims 3.70%, a 0.25 pp gap, so this
  is flagged DRIFTED. Note that on the August 3 run this figure verified at 3.70%, so it
  appears to be a genuine repricing since then.
- Achieva 1yr, 2yr, 4yr, and 5yr GICs: the rest of Achieva's non-redeemable GIC table renders
  via JavaScript and did not expose any figure to a first-party read on this run (the table
  returned empty templates). Per the sourcing rules these are marked UNSURE rather than
  assumed still-current. A person with a browser should read the rendered table at
  https://www.achieva.mb.ca/rates and confirm or correct the 3.60 / 3.65 / 3.75 / 4.05 values.
  The live 3.95% on the 3yr breaks the smooth 3.60 to 4.05 progression the page shows, which
  is a further reason to eyeball the whole Achieva column. Achieva Daily Interest Savings
  (1.80% on the savings page) was readable in static text and is confirmed unchanged.

## Everything else verified current (no change needed)

- best-gic-rates: Peoples Trust 1yr 3.25%, 2yr 3.00%, 3yr 3.25%, 4yr 3.25%, 5yr 3.45% all
  match first-party. Saven GIC figures drifted slightly upward but all stay below the bar
  (live 1yr 3.70%, 3yr 3.95%, 4yr 4.00%, 5yr 4.10% versus claimed 3.60 / 3.90 / 3.95 / 4.05;
  claimed 2yr 3.85% is an exact match), so Saven is not flagged. EQ, Wealthsimple, Simplii,
  Tangerine, and the big banks on this page are described qualitatively rather than asserted,
  so there is no number to check.
- best-savings-account-rates: EQ Bank 1.00% base and 2.75% with a qualifying $2,000 direct
  deposit; Saven HISA 2.85%; Oaken savings 2.80%; Neo Savings 2.75% and Neo High-Interest
  Savings 1.25%; Achieva Daily Interest Savings 1.80%; Wealthsimple Cash 1.25% under $100k,
  1.75% over $100k, 2.25% at $500k or more. All confirmed first-party. Simplii HISA new-client
  promo 4.60% for 153 days up to $200,000, window August 1 to October 31, 2026, confirmed
  live. Tangerine savings new-client promo 4.50% for 153 days confirmed live.
- best-chequing-account-bonuses: Scotiabank up to $1,000 (end October 29, 2026); CIBC Smart
  Account up to $850 and Smart Start (under 25) $175 cash; TD up to $750 (open by October 1,
  2026) and TD Student $150 (open by November 2, 2026); National Bank up to $600 (end
  November 3, 2026); RBC iPad and student AirPods 4 (end November 2, 2026); Simplii $300 plus
  $50 Skip gift card (end September 30, 2026); Tangerine $250 (through October 31, 2026). All
  confirmed on the banks' own pages.

## Minor observations (not material, noted for context only)

- CIBC Skip+ wording: the page says the Smart Start Skip+ membership "stays free for as long
  as your eligible CIBC card is linked to your Skip account and active, rather than for a
  fixed 12 months." CIBC's student bank-accounts page supports that framing, but CIBC's main
  bank-accounts landing page still describes the same benefit as "12 months of Skip+ for
  free." This is an inconsistency within CIBC's own marketing, not a rate drift or amount
  change, so it is not flagged; a person may want to confirm which framing to mirror.
- BMO: the page currently asserts no BMO amount (it points readers to the source). BMO's own
  site now carries a live Canadian offer (a 2026 summer everyday-banking cash bonus, up to
  $900 total, up to $800 on the Performance plan, offer period around August 7 to November 2,
  2026). Because the page asserts no figure, nothing is stale, but a person could add a
  verified BMO amount if they want the page to carry one.

Sources were the providers' own domains only. No aggregator or competitor site was used.
Where a first-party value could not be confirmed, it is marked UNSURE rather than guessed.
