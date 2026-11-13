# Card-data refresh - 2026-11-13 (local full-deck verification)

Run type: LOCAL, on the Dropbox clone with a residential IP. Previous genuine full
verification: 2026-09-16. Every issuer page was re-captured today, and every card was audited
against today's capture. Nothing scraped is committed: captures live only in the gitignored
`data/raw/cards/`, and `scrapers/detail_cache/` was not used as a source.

## Verification basis for the stamp

All **194 cards** (131 CA + 63 US) were audited. **193 of 194** product URLs produced a usable
capture today.

| Basis | Cards |
|---|---|
| Card's own issuer page, captured today | **189** |
| Partial: first-party page captured today, but not a full product page | 4 |
| Fallback to an older capture | 0 |
| Unverifiable (product page gone; discontinued) | 1 |

The 4 partial cards:

- `rogers-red-mastercard` and `rogers-red-world-elite-mastercard`. Their stored URL is
  Rogers' compare-cards page, captured today, but its table cells render empty, as on Sep 16.
  The footnotes confirm earn rates, spend caps and the 2.5% FX fee, and these match the deck.
  The annual fee, interest rate and offer could not be confirmed.
- `neo-world-mastercard`. The product URL now returns 404, and the client-rendered page came
  back thin (2,174 chars) twice. Neo's own credit-cards listing, fetched today over plain
  HTTP, still markets the card in three variants, with fee, rate rows and spend caps that
  match the record. The card is **not** discontinued. Its `apply_url` now points to that
  listing.
- US `american-express-green-card`. The card URL redirects to the US all-cards listing, which
  was captured today and confirms the card is not offered (see Discontinued products).

The 1 unverifiable card is `cash-advantage-mastercard`. Its URL returns Canadian Tire Bank's
404 page today, so it is treated as discontinued.

`neo-mastercard` counts as fresh: it is the right product page, but it shows no fee, rate or
offer detail to check beyond the perks.

This is at least as strong as the Sep 16 mix (186 fresh, 5 partial, 1 fallback, 2 no source),
so `CARDS_VERIFIED` moves from `2026-09-16` to **`2026-11-13`**.

## Capture

The tool was `scrapers/fetch_render.py`, plus a wrapper that added a firefox+JS-scroll engine
and a plain-HTTP engine for CIBC. All output went to `data/raw/cards/` only.

| Issuer | Cards | Captured today | Engine | Notes |
|---|---|---|---|---|
| Amex Canada | 14 | 14 | firefox, keyboard | The first run hung on Business Gold. The other 9 were captured in a second firefox run. |
| RBC | 21 | 21 | chromium | 1 benign redirect (WestJet Business, URL corrected) |
| Scotiabank | 21 | 21 | chromium, then firefox | 4 timed out on chromium (Passport VI, Momentum VI, Gold Amex, Scene+ Visa) and were captured on firefox. |
| TD | 14 | 14 | chromium | |
| CIBC | 16 | 16 | plain HTTP, browser headers | |
| BMO | 11 | 11 | firefox, JS scroll | 2 redirects to the `/en-ca/` paths (URLs corrected) |
| Desjardins + National Bank | 15 | 15 | chromium | 2 NBC redirects to the `/en/` paths (URLs corrected). Syncro's own page now captures. |
| MBNA | 4 | 4 | firefox, JS scroll | Timed out on chromium |
| Tangerine | 1 | 1 | firefox, JS scroll | Timed out on chromium |
| Rogers | 2 | 2 | chromium | Compare page with empty cells (partial) |
| Wealthsimple | 1 | 1 | chromium | |
| Neo | 3 | 2 | chromium, firefox | The World Mastercard page is thin or 404. The listing was fetched over HTTP. |
| PC Financial | 4 | 4 | firefox, JS scroll | |
| Simplii | 1 | 1 | firefox, JS scroll | |
| Triangle | 2 | 2 | firefox, JS scroll | |
| Canadian Tire Cash Advantage | 1 | 404 page | firefox, JS scroll | Discontinued |
| Chase (US) | 41 | 41 | chromium; Flex on firefox | Freedom Unlimited and Flex timed out. Unlimited was captured on a chromium retry, and Flex on firefox through the capped script. |
| Amex (US) | 22 | 22 | firefox, keyboard | The Green Card redirected to the listing. |

**What went wrong with capture, and the fix.** The first attempt ran 11 issuer waves in
parallel, plus three retry runs. Finished runs hung while closing their browsers. At peak,
about 55 headless Chrome and 16 Firefox processes were alive, and other agents on the machine
were starved. The leftover browser trees from this pass were then closed. 192 of the 194
cards were captured under that parallel setup. Under the new limit, one sequential process
with one browser captured 1 more card (Freedom Flex) and re-captured Slate as a dry run.

The limit is now structural, in `scrapers/fetch_render.py`:

- `MAX_BROWSERS = 3`. The `FETCH_RENDER_MAX_BROWSERS` env var can lower it but never raise it.
  Pages open one at a time.
- A PID lock file, `data/raw/fetch_render.lock`, makes a second invocation refuse to start. A
  stale lock from a dead process or an old run is replaced.
- Every context and browser is closed in a `finally` block.
- `ffjs` (firefox with JS scroll) is now a built-in engine.

`docs/CRON_RUNBOOK.md` section 3 states the rule: one `fetch_render.py` at a time, at most 3
browsers, never parallel issuer waves, and never alongside other agents that build, test or
drive browsers. A one-card dry run (Slate) captured cleanly and released its lock. A second
invocation while the lock was held refused to start with exit code 3.

## Method

Seventeen audit subagents each covered one issuer group of 1 to 16 cards. Each read only
today's capture and wrote a patch file. Every proposed change carried the current value, the
new value, a reason and a quoted line of evidence. No agent wrote to the decks. A script
applied every change and would refuse any change whose stated current value did not match
the deck exactly. It would also refuse unknown keys, a CA-only key on a US card, new benefit
keys, and em dashes.

- **Auditor patches:** 341 proposed. The lead dropped 4 and modified 4 (details below). All
  337 that remained **matched, and 0 were refused**. With 1 lead patch added, 338 were applied.
- **Discontinued-product and US value-sync patches:** 19 applied, 0 refused.
- **Derived-value normalization:** 75 applied, 0 refused.

**Total: 432 field changes across 151 cards (278 CA, 154 US).**

By field: welcome_bonus 78, welcome_bonus_conditions 67, first_year_value_cad 46,
welcome_bonus_value_cad 41, signup_bonus_formatted 33, signup_bonus 23,
signup_bonus_value_usd 23, benefits 17, min_spend 17, welcome_bonus_points 16, key_perks 12,
cash_advance_rate 12, apply_url 10, earn_rates 9, minimum_income 7, name 7,
balance_transfer_rate 5, annual_fee 4, foreign_transaction_fee 2,
foreign_transaction_fee_pct 1, first_year_fee 1, purchase_interest_rate 1.

### Lead adjustments to auditor proposals

- **Dropped:** NBC Business Line `purchase_interest_rate` 5 to 9.9. The rate is "Prime + 5%"
  and was derived from another card's page. Prime-linked rates remain an open hold.
- **Dropped:** IHG One Rewards Business (US) `earn_rates`. The proposal used the 2027
  structure, but general travel and office supply still earn 5x through Dec 31, 2026.
- **Dropped:** Tangerine `benefits.lounge_access` true to false, and the matching `key_perks`
  edit. The evidence was absence only.
- **Modified:** NBC Platinum Business earn category "À la carte Travel" is renamed "NBC travel
  agency bookings". The `cards.ts` quality gate filters "à la carte" and would have dropped
  the category silently.
- **Modified:** the WestJet RBC World Elite Business 3x category is shortened to 36 characters.
  The proposal had 44, and the gate maximum is 40.
- **Modified:** BMO Eclipse VI Privilege `foreign_transaction_fee_pct` is set to `null`, not 0.
  That is the deck convention for FX-free cards.
- **Modified:** the Wealthsimple bonus text now states the $20 monthly fee and how to waive it.
- **Added:** NBC Platinum `welcome_bonus_value_cad` 332 to 0. The offer ended and its points
  are now null, so the site would otherwise have shown the stale 332.

## Priority targets

1. **Offers past their stated end date (12 cards).**
   - Scotiabank Passport VI: renamed "Passport Visa Infinite +" (display name only). The offer
     is now up to 45,000 points, Nov 2, 2026 to Jan 3, 2027. The lead was confirmed.
   - Scotiabank Gold Amex: now up to 65,000 points (40,000 + 25,000), to Jan 3, 2027. The lead
     was confirmed. `lounge_access` is set to false: the page offers only a Priority Pass
     membership discount, and Scotia's FAQ excludes this card.
   - Scotiabank Momentum VI: renamed "Visa Infinite +". The offer is now 10% on up to $2,000
     (was 15%), to Apr 30, 2027.
   - Scotiabank Scene+ Visa: now up to 10,000 points (was 5,000), to Apr 30, 2027.
   - TD Business Travel Visa and TD Aeroplan Visa Business: **not expired.** "Offer effective
     as of September 1, 2026" is a start date, not an end date. The offers are unchanged and
     still live. Only the empty conditions were filled.
   - RBC ION+ (`rbc-ion-visa`): now 14,000 points on approval, apply by Jan 12, 2027 (was
     28,000).
   - RBC ION (`rbc-ion-visa-2`): now up to 7,000 points, to Jan 12, 2027 (was 14,000). These are
     two different products, not duplicates.
   - RBC Cash Back Preferred WE: the card was redesigned. The fee went from 99 to 120. Earn is
     now 3% in four category groups and 1% on everything else. The offer is 15% on up to
     $2,000 (up to $300), apply by Mar 1, 2027. Three coverages were added.
   - National Bank Platinum: the page shows "Promotion Ended" (Nov 4) and no new offer. The
     text says so, points are null, and the first-year fee rebate is removed with the
     promotion.
   - Amex Marriott Bonvoy Bevy (US): 85,000 points, no end date stated (was 125,000 + $150).
   - Amex Marriott Bonvoy Brilliant (US): 100,000 points (was 150,000 + $250).
   - Chase Aeroplan (US): confirmed. "Up to 80,000" (60,000 + up to 20,000), replacing
     115,000. The display name is now "Air Canada Aeroplan® Card".
2. **Dead apply links.**
   - `cash-advantage-mastercard`: the 404 was confirmed, and the card is handled as
     discontinued.
   - `neo-world-mastercard`: the product page 404s, but the card is still marketed on Neo's
     listing. `apply_url` is now the listing, and the card stays live.
3. **Marriott Bonvoy Boundless US$3,000.**
   - Root cause: the stored text included a separate airline statement-credit offer. The
     "statement credit" wording sent `normalizeUS` down the cash-bonus path, which took the
     first dollar figure in the text: the $3,000 spend threshold.
   - Fix: the airline-credit sentence moved into `welcome_bonus_conditions`. The card now takes
     the points path: 150,000 points x 0.7 = US$1,050, a ceiling, since each free night is "up
     to 50,000 points". Today's offer is unchanged: 3 Free Night Awards after $3,000.
4. **Leads from the stale cache (checked only against today's chase.com captures).**
   - United earn rates: the stored rates were confirmed as the cards' own rates. Explorer 3x,
     Quest 4x, Club 5x and Gateway 2x on United purchases; United Business and Club Business
     2x. The "8x/9x/10x/11x total" figures include MileagePlus member miles. No change.
   - Freedom Rise: no intro dining rate today, so earn_rates is now "All purchases 1.5%". The
     only incentive is the $25 autopay credit, which was already stored.
   - Ink Business Cash 5% on Chase Travel: not on today's page, and not stored. No change.
     Separately, the Ink Cash and Ink Unlimited offer dropped from $1,000 to $750, now after
     $6,000 in 3 months.
   - NEXUS / Global Entry / TSA PreCheck credit: confirmed on every card that claims it
     (Sapphire Reserve, Sapphire Preferred, United Explorer, Quest and Club, Sapphire Reserve
     for Business, Southwest Performance Business, IHG Premier). No change.
5. **amex-cobalt stored values.** The offer itself was confirmed: up to 15,000 points (1,250
   per month with $750 spend), and the fee is $15.99 a month, or 191.88 a year. Only the bonus
   text was cleaned. `welcome_bonus_value_cad` went from 292 to 293 (15,000 x 1.95 = 292.5,
   which JS rounds to 293). `first_year_value_cad` went from 276 to 101.12. Both stored fields
   now equal what `cards.ts` computes.

## Owner-delegate decisions applied

- **Discontinued products.**
  - `cash-advantage-mastercard` (CA): its URL serves Canadian Tire Bank's 404 page. The CTFS
    navigation and the Triangle application chooser list only the two Triangle cards.
    `apply_url` is now `https://www.ctfs.com/content/ctfs3/en/cards.html` (HTTP 200 today).
    The bonus text starts "Not open to new applicants as of November 2026.", and the value is
    0. Points, conditions and min_spend were already null.
  - `american-express-green-card` (US): its URL redirects to the all-cards listing, and the
    rendered listing ("Browse All Cards (13)") does not include it. `apply_url` is now
    `https://www.americanexpress.com/us/credit-cards/`. The bonus text gets the same first
    sentence, and signup_bonus and signup_bonus_value_usd are 0. Caveat: the listing's
    embedded page data still holds a legacy Green Card content block, but no card tile or
    product page exists.
  - `neo-world-mastercard` was a suspected discontinuation but is **not** discontinued (see
    above).
- **welcome_bonus_value_cad uses the cpp methodology everywhere.** On every CA points card, the
  stored value now equals points x the baseline cpp from `point-valuations.ts`, exactly what
  `cards.ts` displays. `first_year_value_cad` equals the displayed first-year value.
  - CIBC Aventura Visa Infinite: value 1400 to 660, first-year value 1261 to 660.
  - CIBC Aventura Gold: value 1400 to 660, first-year value 1261 to 660.
  - CIBC Aventura Visa Infinite Privilege: value 2500 to 880, first-year value 2001 to 381.
  - CIBC Aventura Visa: value 125 to 138.
  - CIBC Adapta: value 100 to 66 and first-year value 100 to 66 (the offer also dropped to
    6,000 points).
  - CIBC Adapta for Students: value 150 to 165 and first-year value 150 to 165.
  - Also brought in line: BMO Ascend WE 1600 to 771, TD Business Travel 1300 to 1000, and TD
    Aeroplan Business 1900 to 1230. In all, 41 values and 46 first-year values changed; every
    row is in the appendix.
  - For cash-back cards, the value is the stated cash amount, not the issuer's headline total.
    This affects CIBC Dividend VI and Platinum (250), TD Cash Back VI (350), BMO CashBack WE
    (480), Simplii (40) and Momentum VI (200).
- **BMO Prepaid annual_fee 9.99.** Today's page says "$9.99 annual fee", so it is not a monthly
  fee, and the value stays. Following the same rule, Wealthsimple's annual_fee moved from 0 to
  240. Its page charges $20 monthly unless assets reach $100K or direct deposits reach $4K a
  month. The bonus text says so.
- **Issuer renames, display name only, slugs unchanged.**
  - Scotiabank Passport VI and Momentum VI, to "Visa Infinite +".
  - Chase Aeroplan, to "Air Canada Aeroplan® Card".
  - Chase Sapphire Reserve, "The New" dropped.
  - IHG Traveler, to "IHG One Rewards Credit Card".
  - IHG Premier Business, to "IHG One Rewards Business Credit Card".
  - Also: a double space removed from "Scotia Momentum Visa".
- **Conditional fee waivers stay un-encoded.** No `first_year_fee` was added for conditional
  waivers. The Scotia Passport rebate needs a banking package, so it is left null.
- **The nine Chase flight_delay flips from Sep 16.** Every Chase card's `benefits.flight_delay`
  was re-checked against today's benefits text.
  - Pages that list Trip Delay Reimbursement: Sapphire Reserve, United Explorer, United Club,
    Boundless, Bountiful and Bold. Their records were already true.
  - All five Southwest cards (Plus, Priority, Premier, Performance Business, Premier Business)
    show a fully rendered four-item coverage list with no trip delay. The pages contradict
    `true`, so they were set to false.
  - No page lists trip delay on a card stored false, so no Sep 16 false flip was contradicted.
  - On the remaining cards the coverage section was silent or did not render, so they were left
    unchanged.
  - World of Hyatt Business gained four coverages its page lists outright: car rental, trip
    cancellation, purchase protection and extended warranty.
- **Stated offer end dates** were written into the bonus text wherever the issuer states one.

## Other notable corrections

- **Canadian offers that changed:**
  - Amex Platinum: 100,000 to 130,000.
  - Amex Marriott Bonvoy: 110,000 to 70,000. Marriott Bonvoy Business: 110,000 to 80,000.
  - Scotia Platinum Amex: 100,000 to 80,000. Scotia Amex: 10,000 to 5,000.
  - Scotia Home Hardware PRO: 7,500 to 15,000, ends Nov 30.
  - Scotia Passport Business: now tiered at 40,000.
  - NBC World Elite: new offer of up to 35,000, Nov 5, 2026 to Mar 31, 2027.
  - Tangerine: $100 to $120, apply by Nov 30.
  - TD Cash Back Visa: no welcome offer now.
  - CIBC Dividend Visa and Costco: no welcome offer shown.
  - BMO Eclipse VI Privilege: is now FX-free, and health and wellness became a 5x category.
- **US Chase offers that changed:**
  - United Explorer: up to 80,000. Quest: up to 90,000. Gateway: up to 50,000. Club: up to
    100,000.
  - Southwest Plus: 80,000. Priority: 90,000 (spend $3,000). Premier: 85,000.
  - IHG Premier: 180,000, with the fee going from 99 to 150. IHG Traveler: 125,000.
  - IHG Premier Business: 190,000, with the fee going from 99 to 200.
  - World of Hyatt: now 4 free nights, not points, so the bonus value is 0.
  - Prime Visa: $200, read past a struck-through $150. Amazon Visa: $60, read past a
    struck-through $50.
  - Freedom Flex: now FX-free.
- **US Amex offers that changed:**
  - Delta Reserve: as high as 125,000. Delta Reserve Business: as high as 125,000 (was
    200,000).
  - Blue Business Plus: as high as 50,000.
  - Marriott Bonvoy Business: 75,000.
  - Delta Gold and Delta Platinum: lower spend thresholds.
  - Hilton Aspire and Hilton Business: end date of 1/13/2027 added.
- **Unsupported perks removed:**
  - BA: "10% Off BA Flights".
  - Iberia: the $1,000 voucher and the 10% discount.
  - Aer Lingus: priority boarding.
  - Scotia Passport Business: hotel status.
  - Neo Mastercard: "Guaranteed approval" reworded.
- **Apply URLs corrected (10):**
  - BMO Prepaid and BMO Student.
  - NBC Business and NBC Corporate.
  - WestJet RBC WE Business.
  - IHG Traveler and IHG Premier Business.
  - Neo World Mastercard.
  - The two discontinued cards.

## Unresolved, for the owner

1. **More Rewards RBC Visa, More Rewards RBC Visa Infinite and Moi RBC Visa are overvalued on
   the site.**
   - Their `rewards_program` "rbc rewards" maps to 1.8 cpp. So a 20,000-point More Rewards
     bonus, worth $30 per RBC, displays as $360, and Moi shows $90 against $40.
   - The stored fields now match the site's methodology, as instructed.
   - The fix belongs in `src/data/point-valuations.ts`: add More Rewards and Moi entries at
     about 0.15 cpp. That file was outside this pass's scope.
2. **Valuation mappings that are probably wrong:**
   - CIBC Adapta points use the Aventura rate (1.1). The page values them at about 0.67.
   - BMO VIPorter uses BMO Rewards (0.67).
   - World of Hyatt (US) free nights cannot be valued, so the bonus shows 0.
3. **Prime-linked rates** are still stored as scalars: ScotiaLine for Business, RBC Creditline
   for Small Business and NBC Business Line.
4. **Rogers:** neither product page is reachable. Annual fee, rate and offer are unverified.
   From Nov 18, 2026, Rogers removes trip cancellation, interruption and delay coverage on the
   Red World Elite. Flip those flags after that date.
5. **Dated changes to re-check:**
   - WestJet RBC offers end Nov 18. Home Hardware PRO and Tangerine end Nov 30.
   - CIBC Aeroplan VI and VI Privilege fees rise Jan 12, 2027. Amex Aeroplan Reserve, Aeroplan
     Business Reserve and Aeroplan Card fees rise Jan 12, 2027. Amex Marriott Bonvoy's fee
     rises Feb 9, 2027.
   - IHG travel earn narrows Jan 1, 2027. Chase Aeroplan grocery and dining go from 3x to 2x
     after Dec 31, 2026.
   - RBC Visa Classic Low Rate fee waiver: apply by Jan 12, 2027.
6. **Coverage flags left alone because the evidence was only absence:**
   - Freedom Flex `mobile_insurance` is not in its benefits list.
   - Amex Brilliant and Aspire `travel_medical`: the pages show only a hotline.
   - TD US Dollar Visa `flight_delay` and `trip_cancellation`.
   - Tangerine and Rogers WE `lounge_access`: Mastercard Travel Pass is a paid per-visit
     membership.
7. **Odd values outside this pass's fields:**
   - `insurance.purchase_protection` values of "1", "10", "100" and "120" on several cards.
   - The RBC Cash Back Preferred `interest_rates.purchases` value of 1.5.
   - Non-reward cards carrying a `rewards_program` or `card_type` "rewards": BMO Prepaid, TD
     Low Rate, RBC Visa Platinum, Scotia US Dollar Visa, NBC Business, NBC Business Line and
     NBC Corporate.
   - Blue Business Plus stores FX false but `no_fx_fee` false.
8. **US schema limits:** US cards have no `first_year_fee`, so the $0 first-year fees on United
   Explorer, Blue Cash Preferred and Delta Gold are noted, not encoded.
9. **NBC World Elite** "up to 35,000" includes 10,000 points for opening a chequing account.
   Store 25,000 if bank-account bonuses should not count.

## Validation

- Both decks parse: 131 CA and 63 US cards, with no duplicate slugs.
- No added or dropped keys against the HEAD schema, and no new `benefits` keys.
- Earn-rate quality gate clean: every category is 40 characters or fewer and 7 words or fewer,
  with no junk patterns and only clean rate strings.
- No em dashes and no U+FFFD in any changed card.
- `npx tsc --noEmit` exits 0.

## Stamp

`CARDS_VERIFIED` moves from `2026-09-16` to **`2026-11-13`**. The basis is 189 cards checked
against their own issuer page captured today, 4 partial against first-party pages captured
today, 0 fallback, and 1 unverifiable because its page is gone and the product is
discontinued.

## Appendix: every change

"Old" and "New" are JSON values, truncated at 110 characters. "Source" is the quoted issuer
line the auditor cited, a lead decision, or "derived" for the `cards.ts` value normalization.

| Deck | Card | Field | Old | New | Source |
|---|---|---|---|---|---|
| CA | americanexpress-aeroplan-business-reserve-card | first_year_value_cad | 1246 | 1861 | derived: cards.ts methodology |
| CA | americanexpress-aeroplan-reserve-card | first_year_value_cad | 2476 | 1656 | derived: cards.ts methodology |
| CA | americanexpress-cobalt-card | welcome_bonus | "Earn up to 15,000 Welcome Bonus Membership Rewards® points1 – that’s up to $150 in value11." | "Earn up to 15,000 Membership Rewards® points: 1,250 points for each monthly billing period in which you sp... | issuer page captured 2026-11-13: ## Earn up to **15,000** Membership Rewards Points1\\* by earning 1,250 Membership Rewards® points for each monthly ... |
| CA | americanexpress-cobalt-card | welcome_bonus_conditions | "Earn 1,250 points for each monthly billing period in which you spend $750 in your first year, up to 15,000... | "Earn 1,250 points for each monthly billing period in which you spend $750 in your first year, up to 15,000... | issuer page captured 2026-11-13: ## Earn up to **15,000** Membership Rewards Points1\\* by earning 1,250 Membership Rewards® points for each monthly ... |
| CA | americanexpress-cobalt-card | welcome_bonus_value_cad | 292 | 293 | derived: cards.ts methodology |
| CA | americanexpress-cobalt-card | first_year_value_cad | 276 | 101.12 | derived: cards.ts methodology |
| CA | americanexpress-gold-rewards-card | welcome_bonus | "Earn up to 60,000 Membership Rewards® points1 – that’s up to $600 in value.12" | "Earn up to 60,000 Membership Rewards® points: 5,000 points for each monthly billing period in which you sp... | issuer page captured 2026-11-13: ## Earn **60,000** Membership Rewards® points1\\* by earning 5,000 Membership Rewards points for each monthly billin... |
| CA | americanexpressgreen-card | welcome_bonus | "Earn a Welcome Bonus of 10,000 Membership Rewards® points1 – that’s $100 in value11" | "Earn 10,000 Membership Rewards® points when you spend $1,000 in the first 3 months" | issuer page captured 2026-11-13: ## Earn 10,000 Membership Rewards® points1\\* ## when you spend $1,000 on your Card within the first 3 months as a n... |
| CA | bmo-ascend-world-elite-business-mastercard | first_year_value_cad | 856 | 1005 | derived: cards.ts methodology |
| CA | bmo-ascend-world-elite-mastercard | welcome_bonus_value_cad | 1600 | 771 | derived: cards.ts methodology |
| CA | bmo-ascend-world-elite-mastercard | first_year_value_cad | 1600 | 771 | derived: cards.ts methodology |
| CA | bmo-cashback-world-elite-mastercard | welcome_bonus | "Get up to $650 in value and annual fees waived first year" | "Get up to $650 in value, including $40 cash back each month in your first year when you spend at least $2,... | issuer page captured 2026-11-13: + **$40 in cash back** each month when you spend a minimum of $2,000 in your first year / Including $40 monthly cash... |
| CA | bmo-cashback-world-elite-mastercard | welcome_bonus_value_cad | 650 | 480 | issuer page captured 2026-11-13: + **$40 in cash back** each month when you spend a minimum of $2,000 in your first year / + **$139 annual fee** reba... |
| CA | bmo-cashback-world-elite-mastercard | welcome_bonus_conditions | null | "Spend at least $2,000 in a month during your first year to earn $40 cash back for that month (up to $480)." | issuer page captured 2026-11-13: Including $40 monthly cash back during your first year when you spend a minimum of $2,000 each month. |
| CA | bmo-cashback-world-elite-mastercard | first_year_value_cad | 650 | 480 | derived: cards.ts methodology |
| CA | bmo-eclipse-visa-infinite-card | welcome_bonus | "Get up to $1,150 in value including up to 70,000 Bonus points, no annual fee first year" | "Get up to $1,150 in value including up to 70,000 bonus points, $20 monthly streaming subscription credits ... | issuer page captured 2026-11-13: **Get up to $1,150 in value** including up to **70,000 Bonus points****,** monthly streaming statement credit, $50 a... |
| CA | bmo-eclipse-visa-infinite-privilege-card | welcome_bonus | "Get up to $2,300 including up to 200,000 points and NEXUS Statement Credit" | "Get up to $2,700 in value including up to 200,000 points, 10 airport lounge passes and a $200 annual Trave... | issuer page captured 2026-11-13: **New Get up to** **$2,700** including up to 200,000 points**, 10 lounge passes and a $200 annual Travel Credit**. /... |
| CA | bmo-eclipse-visa-infinite-privilege-card | foreign_transaction_fee | true | false | issuer page captured 2026-11-13: NO FX FEES / Travel and shop globally without the 2.5% foreign transaction fee on eligible purchases. |
| CA | bmo-eclipse-visa-infinite-privilege-card | foreign_transaction_fee_pct | 2.5 | null | issuer page captured 2026-11-13: Enjoy greater savings with **nono** **foreign transaction fees** when you travel and shop globally |
| CA | bmo-eclipse-visa-infinite-privilege-card | benefits.no_fx_fee | false | true | issuer page captured 2026-11-13: ### No foreign transaction fees ... Enjoy greater savings with **nono** **foreign transaction fees** when you travel... |
| CA | bmo-eclipse-visa-infinite-privilege-card | earn_rates | {"Groceries, dining, gas & travel": "5x", "All other purchases": "1x"} | {"Groceries, dining, gas, travel, wellness": "5x", "All other purchases": "1x"} | issuer page captured 2026-11-13: ### NEW 5xFive times on health and wellness / Earn 5 points for every $1 spent on gym and golf club memberships, spa... |
| CA | bmo-eclipse-visa-infinite-privilege-card | key_perks | ["Hotel elite status/collection", "Travel program credit (NEXUS/Global Entry)", "Statement credits", "Airpo... | ["No foreign transaction fees", "Hotel elite status/collection", "Travel program credit (NEXUS/Global Entry... | issuer page captured 2026-11-13: NO FX FEES / Travel and shop in style, whether you're abroad or at home, with no foreign transaction fees |
| CA | bmo-prepaid-mastercard | welcome_bonus | "" | "No welcome offer." | issuer page captured 2026-11-13: Page has no Welcome offer section; hero reads: Enjoy a reloadable and secure card for your day-to-day transactions. |
| CA | bmo-prepaid-mastercard | benefits.purchase_protection | false | true | issuer page captured 2026-11-13: * Enjoy extended warranty and purchase protection.[37] |
| CA | bmo-prepaid-mastercard | benefits.extended_warranty | false | true | issuer page captured 2026-11-13: * Enjoy extended warranty and purchase protection.[37] |
| CA | bmo-prepaid-mastercard | apply_url | "https://www.bmo.com/main/personal/credit-cards/prepaid-credit-cards/" | "https://www.bmo.com/en-ca/main/personal/credit-cards/prepaid-credit-cards/" | issuer page captured 2026-11-13: Capture log: REDIR https://www.bmo.com/en-ca/main/personal/credit-cards/prepaid-credit-cards/ / page H1: # BMO Prepa... |
| CA | bmo-viporter-mastercard | welcome_bonus | "Get up to $1,800 in value including 40,000 VIPorter points" | "Get up to $1,800 in value including 40,000 VIPorter points, a 35% off flight voucher and the annual fee wa... | issuer page captured 2026-11-13: Get up to $1,800 in value including **40,000 VIPorter points**, a **35% off flight voucher** and the annual fees wai... |
| CA | bmo-viporter-mastercard | first_year_value_cad | 179 | 268 | derived: cards.ts methodology |
| CA | bmo-viporter-world-elite-mastercard | welcome_bonus | "Get up to $2,400 in value including 70,000 VIPorter points" | "Get up to $2,400 in value including 70,000 VIPorter points, a round-trip companion pass and the annual fee... | issuer page captured 2026-11-13: Apply by December 8, 2026 to **claim your share of 50 million** **VIPorter points**. / **New Claim your share of 50 ... |
| CA | bmo-viporter-world-elite-mastercard | first_year_value_cad | 270 | 469 | derived: cards.ts methodology |
| CA | business-platinum-card-from-americanexpress | welcome_bonus | "Earn up to 120,000 Welcome Bonus Membership Rewards® points.1 That’s up to $1,200 in statement credits tha... | "Earn up to 120,000 Membership Rewards® points (80,000 after spending $15,000 in the first 3 months, plus 4... | issuer page captured 2026-11-13: UP TO 120,000 POINTS ## Earn **80,000** Membership Rewards® points1\\* after you spend $15,000 on your Card within y... |
| CA | cash-advantage-mastercard | apply_url | "https://www.ctfs.com/content/ctfs/en/cards/cash_advantage.html" | "https://www.ctfs.com/content/ctfs3/en/cards.html" | discontinued decision; Stored product URL returns Canadian Tire Bank's 404 page today ('# 404 / Oops! Looks l... |
| CA | cash-advantage-mastercard | welcome_bonus | "" | "Not open to new applicants as of November 2026. Canadian Tire Bank no longer offers this card; its current... | discontinued decision; Stored product URL returns Canadian Tire Bank's 404 page today ('# 404 / Oops! Looks l... |
| CA | cash-advantage-mastercard | welcome_bonus_value_cad | null | 0 | discontinued decision; Stored product URL returns Canadian Tire Bank's 404 page today ('# 404 / Oops! Looks l... |
| CA | cibc-adapta-mastercard | welcome_bonus | "Join and earn up to $280 in value with no annual fee" | "Join and earn up to $200 in value with no annual fee, including up to 6,000 Adapta Points." | issuer page captured 2026-11-13: Join and earn up to $200 in value with no annual fee. / * Receive a Welcome Bonus of 3,000 Adapta Points after your ... |
| CA | cibc-adapta-mastercard | welcome_bonus_points | 15000 | 6000 | issuer page captured 2026-11-13: * Receive a Welcome Bonus of 3,000 Adapta Points after your first purchase * Get 3,000 Adapta Points when you spend ... |
| CA | cibc-adapta-mastercard | welcome_bonus_conditions | null | "3,000 Adapta Points on first purchase. 3,000 more points when you spend $1,000 in the first 4 monthly stat... | issuer page captured 2026-11-13: * Receive a Welcome Bonus of 3,000 Adapta Points after your first purchase * Get 3,000 Adapta Points when you spend ... |
| CA | cibc-adapta-mastercard | welcome_bonus_value_cad | 100 | 66 | derived: cards.ts methodology |
| CA | cibc-adapta-mastercard | first_year_value_cad | 100 | 66 | derived: cards.ts methodology |
| CA | cibc-adapta-mastercard-for-students | welcome_bonus | "Join and earn up to $350 in value" | "Join and earn up to $280 in value, including up to 15,000 Adapta Points." | issuer page captured 2026-11-13: Join and earn up to $280 in value / * Receive a Welcome Bonus of 3,000 Adapta Points after your first purchase * Ear... |
| CA | cibc-adapta-mastercard-for-students | welcome_bonus_conditions | null | "3,000 Adapta Points on first purchase. 9,000 points when you spend $1,000 in the first 4 monthly statement... | issuer page captured 2026-11-13: * Receive a Welcome Bonus of 3,000 Adapta Points after your first purchase * Earn 9,000 Adapta Points (up to $75 val... |
| CA | cibc-adapta-mastercard-for-students | welcome_bonus_value_cad | 150 | 165 | derived: cards.ts methodology |
| CA | cibc-adapta-mastercard-for-students | first_year_value_cad | 150 | 165 | derived: cards.ts methodology |
| CA | cibc-aeroplan-visa-card | welcome_bonus_conditions | null | "2,500 Aeroplan points on first purchase. 2,500 points when you spend $1,500 in the first 4 monthly stateme... | issuer page captured 2026-11-13: * 2,500 Aeroplan points when you make your first purchase. * 2,500 Aeroplan points when you spend $1,500 or more dur... |
| CA | cibc-aeroplan-visa-card-for-students | welcome_bonus_conditions | null | "2,500 Aeroplan points on first purchase. 2,500 points when you spend $1,500 in the first 4 monthly stateme... | issuer page captured 2026-11-13: * 2,500 Aeroplan points when you make your first purchase. * 2,500 Aeroplan points when you spend $1,500 or more dur... |
| CA | cibc-aeroplan-visa-infinite-card | welcome_bonus_conditions | null | "10,000 Aeroplan points on first purchase. 15,000 points when you spend $6,000 in the first 6 monthly state... | issuer page captured 2026-11-13: * 10,000 Aeroplan points when you make your first purchase. * 15,000 Aeroplan points when you spend $6,000 or more d... |
| CA | cibc-aeroplan-visa-infinite-card | first_year_value_cad | 886 | 1025 | derived: cards.ts methodology |
| CA | cibc-aeroplan-visa-infinite-privilege-card | welcome_bonus_conditions | null | "10,000 Aeroplan points when you spend $1,000 in the first 2 monthly statement periods. 40,000 points when ... | issuer page captured 2026-11-13: * 10,000 Aeroplan points when you spend $1,000 or more during your first 2 monthly statement periods * 40,000 Aeropl... |
| CA | cibc-aventura-gold-visa-card | welcome_bonus_conditions | null | "15,000 Aventura Points on first purchase. 30,000 points when you spend $3,000 in the first 4 monthly state... | issuer page captured 2026-11-13: * 15,000 Aventura Points when you make your first purchase * 30,000 Aventura Points when you spend $3,000 or more in... |
| CA | cibc-aventura-gold-visa-card | welcome_bonus_value_cad | 1400 | 660 | derived: cards.ts methodology |
| CA | cibc-aventura-gold-visa-card | first_year_value_cad | 1261 | 660 | derived: cards.ts methodology |
| CA | cibc-aventura-visa-card | welcome_bonus_conditions | null | "2,500 Aventura Points when you complete five set-up activities within 60 days of approval. 10,000 more poi... | issuer page captured 2026-11-13: * 2,500 Aventura Points when you complete all five of these activities within 60 days of your CIBC Aventura Visa Car... |
| CA | cibc-aventura-visa-card | welcome_bonus_value_cad | 125 | 138 | derived: cards.ts methodology |
| CA | cibc-aventura-visa-card-for-students | welcome_bonus_conditions | null | "2,500 Aventura Points when you complete five set-up activities within 60 days of approval. 10,000 more poi... | issuer page captured 2026-11-13: * 2,500 Aventura Points when you complete all five of these activities within 60 days of your CIBC Aventura Visa Car... |
| CA | cibc-aventura-visa-infinite-card | welcome_bonus_conditions | null | "15,000 Aventura Points on first purchase. 30,000 points when you spend $3,000 in the first 4 monthly state... | issuer page captured 2026-11-13: Get a total of up to 60,000 Aventura Points ... during your first year: * 15,000 Aventura Points when you make your ... |
| CA | cibc-aventura-visa-infinite-card | welcome_bonus_value_cad | 1400 | 660 | derived: cards.ts methodology |
| CA | cibc-aventura-visa-infinite-card | first_year_value_cad | 1261 | 660 | derived: cards.ts methodology |
| CA | cibc-aventura-visa-infinite-privilege-card | welcome_bonus_conditions | null | "25,000 Aventura Points when you spend $3,000 in the first 4 monthly statement periods. 25,000 more points ... | issuer page captured 2026-11-13: * 25,000 Aventura Points when you spend $3,000 or more in the first 4 monthly statement periods * 25,000 Aventura Po... |
| CA | cibc-aventura-visa-infinite-privilege-card | welcome_bonus_value_cad | 2500 | 880 | derived: cards.ts methodology |
| CA | cibc-aventura-visa-infinite-privilege-card | first_year_value_cad | 2001 | 381 | derived: cards.ts methodology |
| CA | cibc-costco-mastercard | welcome_bonus | "Earn up to 3% cash back everywhere Mastercard is accepted" | "No welcome offer is currently shown on the CIBC page." | issuer page captured 2026-11-13: Costco members exclusive / ## The CIBC Costco Mastercard exclusively for Costco members. / Earn up to 3% cash back o... |
| CA | cibc-dividend-platinum-visa-card | welcome_bonus_conditions | null | "10% cash back on up to $2,000 in net purchases in the first 4 statements (up to $200). $50 cash back for s... | issuer page captured 2026-11-13: * Earn a 10% cash back welcome bonus of up to $200 for the first 4 statements on net purchases up to $2,000. * A $50... |
| CA | cibc-dividend-platinum-visa-card | min_spend | null | 2000 | issuer page captured 2026-11-13: Earn a 10% cash back welcome bonus of up to $200 for the first 4 statements on net purchases up to $2,000. |
| CA | cibc-dividend-platinum-visa-card | welcome_bonus_value_cad | 300 | 250 | issuer page captured 2026-11-13: Earn a 10% cash back welcome bonus of up to $200 ... A $50 cash back bonus for setting up one pre-authorized payment... |
| CA | cibc-dividend-platinum-visa-card | first_year_value_cad | 300 | 250 | derived: cards.ts methodology |
| CA | cibc-dividend-visa-card | welcome_bonus | "Cash back on daily essentials" | "No welcome offer is currently shown on the CIBC page." | issuer page captured 2026-11-13: # CIBC Dividend Visa Card / Get the reliable, everyday use card that earns you cash back on daily essentials for no ... |
| CA | cibc-dividend-visa-card-for-students | welcome_bonus_conditions | null | "$25 cash back after your first purchase within the first 4 monthly statements. 10% cash back on up to $1,0... | issuer page captured 2026-11-13: * Get $25 cash back after you make your first purchase within the first 4 monthly statements. * Earn a 10% cash back... |
| CA | cibc-dividend-visa-card-for-students | min_spend | null | 1000 | issuer page captured 2026-11-13: Earn a 10% cash back welcome bonus of up to $100 within the first 4 monthly statements on net purchases up to $1,000. |
| CA | cibc-dividend-visa-infinite-card | welcome_bonus_conditions | null | "10% cash back on up to $2,000 in net purchases in the first 4 statements (up to $200). $50 cash back for s... | issuer page captured 2026-11-13: * Earn a 10% cash back welcome bonus of up to $200 for the first 4 statements on net purchases up to $2,000 * A $50 ... |
| CA | cibc-dividend-visa-infinite-card | min_spend | null | 2000 | issuer page captured 2026-11-13: Earn a 10% cash back welcome bonus of up to $200 for the first 4 statements on net purchases up to $2,000 |
| CA | cibc-dividend-visa-infinite-card | welcome_bonus_value_cad | 350 | 250 | issuer page captured 2026-11-13: Earn a 10% cash back welcome bonus of up to $200 ... A $50 cash back bonus for setting up one pre-authorized payment... |
| CA | cibc-dividend-visa-infinite-card | first_year_value_cad | 350 | 250 | derived: cards.ts methodology |
| CA | desjardins-cash-back-world-elite-mastercard | minimum_income | null | 80000 | issuer page captured 2026-11-13: Eligibility: minimum annual income of $80,000 (personal) or $150,000 (household) |
| CA | desjardins-odyssey-visa-infinite-privilege | minimum_income | null | 150000 | issuer page captured 2026-11-13: Eligibility: minimum annual income of $150,000 (personal) or $200,000 (household) |
| CA | desjardins-odyssey-world-elite-mastercard | minimum_income | null | 80000 | issuer page captured 2026-11-13: Eligibility: minimum annual income of $80,000 (personal) or $150,000 (household) |
| CA | marriott-bonvoy-american-express-card | welcome_bonus | "Earn up to 110,000 Marriott Bonvoy® points (80,000 after spending $6,000 in the first 6 months, plus 30,00... | "Earn up to 70,000 Marriott Bonvoy® points (60,000 after spending $3,000 in the first 3 months, plus 10,000... | issuer page captured 2026-11-13: **UP TO 70,000 POINTS** ### **Earn 60,000 Marriott Bonvoy® points1**\\* after you spend $3,000 on your Card within t... |
| CA | marriott-bonvoy-american-express-card | welcome_bonus_conditions | "Spend $6,000 in the first 6 months for 80,000 points, plus make a purchase in month 15 for 30,000 points" | "Spend $3,000 in the first 3 months for 60,000 points, plus spend $500 in month 13 for 10,000 points. Curre... | issuer page captured 2026-11-13: **UP TO 70,000 POINTS** ### **Earn 60,000 Marriott Bonvoy® points1**\\* after you spend $3,000 on your Card within t... |
| CA | marriott-bonvoy-american-express-card | welcome_bonus_points | 110000 | 70000 | issuer page captured 2026-11-13: **UP TO 70,000 POINTS** ### **Earn 60,000 Marriott Bonvoy® points1**\\* after you spend $3,000 on your Card within t... |
| CA | marriott-bonvoy-american-express-card | welcome_bonus_value_cad | 770 | 490 | derived: cards.ts methodology |
| CA | marriott-bonvoy-business-americanexpress-card | welcome_bonus | "Earn up to 110,000 Marriott Bonvoy® points (80,000 after spending $10,000 in the first 6 months, plus 30,0... | "Earn up to 80,000 Marriott Bonvoy® points (70,000 after spending $5,000 in the first 3 months, plus 10,000... | issuer page captured 2026-11-13: **EARN UP TO 80,000 POINTS** ### **Earn 70,000 Marriott Bonvoy® Points1\\*** after you spend $5,000 on your Card wit... |
| CA | marriott-bonvoy-business-americanexpress-card | welcome_bonus_conditions | "Spend $10,000 in the first 6 months for 80,000 points, plus make a purchase in month 15 for 30,000 points" | "Spend $5,000 in the first 3 months for 70,000 points, plus spend $1,000 in month 13 for 10,000 points. Cur... | issuer page captured 2026-11-13: **EARN UP TO 80,000 POINTS** ### **Earn 70,000 Marriott Bonvoy® Points1\\*** after you spend $5,000 on your Card wit... |
| CA | marriott-bonvoy-business-americanexpress-card | welcome_bonus_points | 110000 | 80000 | issuer page captured 2026-11-13: **EARN UP TO 80,000 POINTS** ### **Earn 70,000 Marriott Bonvoy® Points1\\*** after you spend $5,000 on your Card wit... |
| CA | marriott-bonvoy-business-americanexpress-card | welcome_bonus_value_cad | 770 | 560 | derived: cards.ts methodology |
| CA | mbna-rewards-platinum-plus-mastercard | cash_advance_rate | null | 22.99 | issuer page captured 2026-11-13: * Interest: Cash Advances\n\n  22.99% |
| CA | mbna-rewards-platinum-plus-mastercard | balance_transfer_rate | null | 22.99 | issuer page captured 2026-11-13: * Interest: Balance Transfers[✪]\n\n  22.99% |
| CA | mbna-rewards-platinum-plus-mastercard | welcome_bonus_value_cad | 50 | 100 | derived: cards.ts methodology |
| CA | mbna-rewards-world-elite-mastercard | cash_advance_rate | null | 22.99 | issuer page captured 2026-11-13: * Interest: Cash Advances\n\n  22.99% |
| CA | mbna-rewards-world-elite-mastercard | balance_transfer_rate | null | 22.99 | issuer page captured 2026-11-13: * Interest: Balance Transfers[✪]\n\n  22.99% |
| CA | mbna-rewards-world-elite-mastercard | welcome_bonus_value_cad | 245 | 300 | derived: cards.ts methodology |
| CA | mbna-true-line-gold-mastercard | cash_advance_rate | null | 24.99 | issuer page captured 2026-11-13: * Interest: Cash Advances\n\n  24.99% |
| CA | mbna-true-line-gold-mastercard | balance_transfer_rate | null | 13.99 | issuer page captured 2026-11-13: * Interest: Balance Transfers[✪]\n\n  13.99% |
| CA | mbna-true-line-mastercard | cash_advance_rate | null | 24.99 | issuer page captured 2026-11-13: * Interest: Cash Advances\n\n  24.99% |
| CA | mbna-true-line-mastercard | balance_transfer_rate | null | 17.99 | issuer page captured 2026-11-13: * Interest: Balance Transfers[✪]\n\n  17.99% |
| CA | moi-rbc-visa | welcome_bonus_value_cad | 40 | 90 | derived: cards.ts methodology |
| CA | more-rewards-rbc-visa | welcome_bonus_value_cad | 30 | 360 | derived: cards.ts methodology |
| CA | more-rewards-rbc-visa-infinite | welcome_bonus | "Up to 20,000 bonus More Rewards points - a value of $30 in groceries." | "Get 20,000 bonus More Rewards points after your first purchase, a value of $30 in groceries. Offer ends Oc... | issuer page captured 2026-11-13: Enjoy up to 20,000 bonus More Rewards points. That's a value of $30 in groceries!1 / Legal 1: \"your application mus... |
| CA | more-rewards-rbc-visa-infinite | welcome_bonus_conditions | null | "Make your first purchase. A valid More Rewards number must be linked to the card. Points post up to 6 week... | issuer page captured 2026-11-13: \"you must have a valid More Rewards number linked to your RBC Visa credit card. You will be eligible to receive 20,... |
| CA | more-rewards-rbc-visa-infinite | welcome_bonus_value_cad | 30 | 360 | derived: cards.ts methodology |
| CA | national-bank-business-mastercard | apply_url | "https://www.nbc.ca/business/credit-cards/mastercard-business.html" | "https://www.nbc.ca/en/business/credit-cards/mastercard-business.html" | issuer page captured 2026-11-13: # Business Mastercard credit card / No annual fee for your primary card, as well as any additional cards (capture fi... |
| CA | national-bank-corporate-mastercard | apply_url | "https://www.nbc.ca/business/credit-cards/mastercard-corporate.html" | "https://www.nbc.ca/en/business/credit-cards/mastercard-corporate.html" | issuer page captured 2026-11-13: # Corporate Mastercard credit card / Simplify your accounts payable / Annual fee $35 (capture final URL https://www.... |
| CA | national-bank-platinum-business-mastercard | earn_rates | {"All purchases": "1.5x"} | {"NBC travel agency bookings": "3x", "All purchases": "1.5x"} | issuer page captured 2026-11-13: * Get 1.5 points for every $1 spent on eligible purchases / * Earn an additional 1.5 points for every $1 spent on el... |
| CA | national-bank-platinum-mastercard | welcome_bonus | "Earn up to 35,000 National Bank rewards points and get the first year free" | "No welcome offer is shown on the issuer page. The last promotion ended November 4, 2026." | issuer page captured 2026-11-13: ## Promotion Ended ... **Length of the welcome promotion** From June 30, 2026, to November 4, 2026. |
| CA | national-bank-platinum-mastercard | welcome_bonus_points | 35000 | null | issuer page captured 2026-11-13: ## Promotion Ended ... From June 30, 2026, to November 4, 2026. |
| CA | national-bank-platinum-mastercard | welcome_bonus_conditions | "10,000 points for keeping credit card payment insurance for the first 3 months, 10,000 points for $2,500 i... | null | issuer page captured 2026-11-13: ## Promotion Ended ... From June 30, 2026, to November 4, 2026. |
| CA | national-bank-platinum-mastercard | min_spend | 10000 | null | issuer page captured 2026-11-13: ## Promotion Ended |
| CA | national-bank-platinum-mastercard | first_year_fee | 0 | null | issuer page captured 2026-11-13: Annual fee for the cardholder **$70** ... ## Promotion Ended ... The $70 annual fee for the primary cardholder will ... |
| CA | national-bank-platinum-mastercard | welcome_bonus_value_cad | 332 | 0 | issuer page captured 2026-11-13: ## Promotion Ended ... From June 30, 2026, to November 4, 2026. |
| CA | national-bank-syncro-mastercard | first_year_value_cad | 70 | -35 | derived: cards.ts methodology |
| CA | national-bank-world-elite-mastercard | welcome_bonus | "" | "Earn up to 35,000 National Bank rewards points. Offer ends March 31, 2027." | issuer page captured 2026-11-13: Sign up for a National Bank World Elite Mastercard credit card and you could receive up to 35,000 rewards points fol... |
| CA | national-bank-world-elite-mastercard | welcome_bonus_points | null | 35000 | issuer page captured 2026-11-13: / 10,000 / Sign up for payment insurance* for at least the first 90 days. / ... / 5,000 / $5,000 in net purchases in... |
| CA | national-bank-world-elite-mastercard | welcome_bonus_conditions | null | "5,000 points for $5,000 in net purchases in the first 90 days, 10,000 points for $20,000 in net purchases ... | issuer page captured 2026-11-13: Length of the welcome promotion: From November 5, 2026, to March 31, 2027 / Not have held any National Bank Masterca... |
| CA | national-bank-world-elite-mastercard | min_spend | null | 20000 | issuer page captured 2026-11-13: / 10,000 / $20,000 in net purchases in the first 12 months / By the end of the 15th month after enrollment** / |
| CA | national-bank-world-elite-mastercard | minimum_income | null | 80000 | issuer page captured 2026-11-13: Minimum annual income: $80,000 for the applicant, or $150,000 for household income. |
| CA | national-bank-world-elite-mastercard | welcome_bonus_value_cad | null | 333 | derived: cards.ts methodology |
| CA | national-bank-world-elite-mastercard | first_year_value_cad | 182 | 183 | derived: cards.ts methodology |
| CA | neo-mastercard | key_perks | ["Guaranteed approval", "1% grocery", "1% gas", "Build credit history"] | ["No minimum credit score (secured option)", "1% grocery", "1% gas", "Build credit history"] | issuer page captured 2026-11-13: Listing (neofinancial.com/credit-cards, 2026-11-13): \"No minimum credit score required⁴\" / \"⁴Conditions apply. Mu... |
| CA | neo-world-mastercard | apply_url | "https://www.neofinancial.com/credit-cards/neo-world-mastercard" | "https://www.neofinancial.com/credit-cards" | issuer page captured 2026-11-13: neo-mastercard.md (today) footer: \"[Neo Mastercard](/credit-cards/neo-mastercard)Neo World Mastercard®[Neo World El... |
| CA | pc-insiders-world-elite-mastercard | cash_advance_rate | null | 22.97 | issuer page captured 2026-11-13: Cash advance interest rate (Standard)9: 22.97% 21.97% (Quebec) |
| CA | pc-insiders-world-elite-mastercard | welcome_bonus | "Earn 50,000 bonus PC Optimum Points + first year annual fee waived" | "Earn 50,000 bonus PC Optimum Points + first year annual fee waived (apply by December 31, 2026)" | issuer page captured 2026-11-13: \"Offer valid for new President's Choice Financial(R) Mastercard(R) cardholders who apply with the specified link by... |
| CA | pc-insiders-world-elite-mastercard | first_year_value_cad | 350 | 50 | derived: cards.ts methodology |
| CA | pc-mastercard | cash_advance_rate | null | 22.97 | issuer page captured 2026-11-13: Cash advance interest rate (Standard)1: 22.97% 21.97% (Quebec) |
| CA | pc-mastercard | first_year_value_cad | 350 | 50 | derived: cards.ts methodology |
| CA | pc-world-elite-mastercard | cash_advance_rate | null | 22.97 | issuer page captured 2026-11-13: Cash advance interest rate (Standard)1: 22.97% 21.97% (Quebec) |
| CA | pc-world-elite-mastercard | first_year_value_cad | 350 | 50 | derived: cards.ts methodology |
| CA | pc-world-mastercard | cash_advance_rate | null | 22.97 | issuer page captured 2026-11-13: Cash advance interest rate (Standard)1: 22.97% 21.97% (Quebec) |
| CA | pc-world-mastercard | first_year_value_cad | 350 | 50 | derived: cards.ts methodology |
| CA | rbc-avion-visa-business | welcome_bonus | "Receive 35,000 Welcome Avion points upon enrollment" | "Get 35,000 Avion points upon approval." | issuer page captured 2026-11-13: \"Get 35,000 Avion points upon approval1\" / Legal 1: \"your application ... must be received and approved by us. Th... |
| CA | rbc-avion-visa-business | welcome_bonus_conditions | null | "Get approved for the card. Points post within 60 days of approval. Only the primary business owner qualifi... | issuer page captured 2026-11-13: Legal 1: \"within 60 days after your application has been approved ... Only the primary business owner on the Credit... |
| CA | rbc-avion-visa-infinite | first_year_value_cad | 870 | 1140 | derived: cards.ts methodology |
| CA | rbc-avion-visa-infinite-business | welcome_bonus | "Get up to 100,000 Avion points plus a first year annual fee waiver: 25,000 on approval + 20,000 on your fi... | "Get up to 100,000 Avion points plus a first year annual fee waiver: 25,000 on approval + 20,000 on your fi... | issuer page captured 2026-11-13: \"This offer only applies to new applications for an RBC Avion Visa Infinite Business credit card received between A... |
| CA | rbc-avion-visa-infinite-business | first_year_value_cad | 455 | 1800 | derived: cards.ts methodology |
| CA | rbc-avion-visa-infinite-privilege | first_year_value_cad | 861 | 1401 | derived: cards.ts methodology |
| CA | rbc-avion-visa-platinum | first_year_value_cad | 870 | 1140 | derived: cards.ts methodology |
| CA | rbc-british-airways-visa-infinite | first_year_value_cad | 915 | 735 | derived: cards.ts methodology |
| CA | rbc-business-cash-back-mastercard | welcome_bonus_conditions | null | "Extra 1% cash back (2% total) on net purchases for the first 3 full monthly statement periods. Combined an... | issuer page captured 2026-11-13: \"for the first 3 full monthly statement periods ... you will earn an additional $1.00 back for every $100.00 (1% Ca... |
| CA | rbc-cash-back-preferred-world-elite-mastercard | welcome_bonus | "Get 12% cash back for the first 3 months on up to $2,000 in total purchases. Apply by September 30, 2026." | "Get 15% extra cash back on your first $2,000 in spend for 3 months (up to $300). Apply by March 1, 2027." | issuer page captured 2026-11-13: Get **15% extra cash back** on your first $2,000 in spend for 3 months^. Apply by March 1, 2027. |
| CA | rbc-cash-back-preferred-world-elite-mastercard | welcome_bonus_value_cad | 240 | 300 | issuer page captured 2026-11-13: on up to $2,000 in Net Purchases (\"Welcome Bonus\"), for a total Welcome Bonus of up to $300 in Cash Back Reward. |
| CA | rbc-cash-back-preferred-world-elite-mastercard | welcome_bonus_conditions | null | "Earn an extra 15% cash back on up to $2,000 in net purchases in the first 3 months from account opening, f... | issuer page captured 2026-11-13: received between October 1, 2026 and March 1, 2027 (\"Offer Period\") ... additional $15.00 back for every $100.00 (... |
| CA | rbc-cash-back-preferred-world-elite-mastercard | annual_fee | 99 | 120 | issuer page captured 2026-11-13: Annual Fee\n$120 |
| CA | rbc-cash-back-preferred-world-elite-mastercard | purchase_interest_rate | 20.99 | 21.99 | issuer page captured 2026-11-13: Purchase Rate\n21.99% |
| CA | rbc-cash-back-preferred-world-elite-mastercard | earn_rates | {"All purchases (first $25k/yr)": "1.5%", "All purchases thereafter": "1%"} | {"Groceries, dining & food delivery": "3%", "Gas, EV charging, transit & rideshare": "3%", "Streaming & dig... | issuer page captured 2026-11-13: You will earn (i) $3.00 Cash Back for every $100.00 (3% Cash Back Credit) spent on eligible purchases, unlimited, in... |
| CA | rbc-cash-back-preferred-world-elite-mastercard | minimum_income | null | 80000 | issuer page captured 2026-11-13: A minimum personal income of $80,000 or a minimum household income of $150,000 is required for this card. |
| CA | rbc-cash-back-preferred-world-elite-mastercard | key_perks | [] | ["Mastercard Travel Pass lounge membership", "12 months of complimentary DashPass", "Petro-Canada fuel savi... | issuer page captured 2026-11-13: Mastercard Travel Pass ... provided by Dragon Pass Membership gives you access to 1,300+ airport lounges worldwide /... |
| CA | rbc-cash-back-preferred-world-elite-mastercard | benefits.travel_medical | false | true | issuer page captured 2026-11-13: * Emergency Medical Insurance7 / Stay protected with Out of Province/Country Emergency Medical, Flight Delay and Del... |
| CA | rbc-cash-back-preferred-world-elite-mastercard | benefits.flight_delay | false | true | issuer page captured 2026-11-13: * Flight Delay Insurance7 |
| CA | rbc-cash-back-preferred-world-elite-mastercard | benefits.mobile_insurance | false | true | issuer page captured 2026-11-13: * Mobile Device Insurance7 |
| CA | rbc-ion-visa | welcome_bonus | "Get up to 28,000 Avion points (up to $200 of value in gift cards). Apply by November 4, 2026." | "Get 14,000 Avion points on approval (that's $100 of value in gift cards). Apply by January 12, 2027." | issuer page captured 2026-11-13: Get **14,000 Avion points**^ - that's $100 of value in gift cards†! Apply by January 12, 2027. / This offer only app... |
| CA | rbc-ion-visa | welcome_bonus_points | 28000 | 14000 | issuer page captured 2026-11-13: 14,000 welcome Avion points (\"Welcome Points\") will appear on your monthly credit card statement within sixty (60)... |
| CA | rbc-ion-visa | welcome_bonus_conditions | "7,000 points on approval, 14,000 points after you spend $1,500 in your first 6 months, and 7,000 one-time ... | "14,000 welcome Avion points after approval. No minimum spend. Offer for new applications received November... | issuer page captured 2026-11-13: 14,000 welcome Avion points (\"Welcome Points\") will appear on your monthly credit card statement within sixty (60)... |
| CA | rbc-ion-visa | min_spend | 1500 | null | issuer page captured 2026-11-13: 14,000 welcome Avion points ... within sixty (60) days after your application has been approved |
| CA | rbc-ion-visa | welcome_bonus_value_cad | 504 | 252 | derived: cards.ts methodology |
| CA | rbc-ion-visa | first_year_value_cad | 456 | 204 | derived: cards.ts methodology |
| CA | rbc-ion-visa-2 | welcome_bonus | "Get up to 14,000 Avion points (up to $100 of value in gift cards). Apply by November 4, 2026." | "Get up to 7,000 Avion points (up to $50 of value in gift cards): 3,500 welcome points plus 3,500 points wh... | issuer page captured 2026-11-13: Get up to **7,000 Avion points**^ - that's up to $50 of value in gift cards†! Apply by January 12, 2027. * 3,500 wel... |
| CA | rbc-ion-visa-2 | welcome_bonus_points | 14000 | 7000 | issuer page captured 2026-11-13: Get up to **7,000 Avion points**^ |
| CA | rbc-ion-visa-2 | welcome_bonus_conditions | "7,000 points on approval plus 7,000 bonus points when you spend $500 in your first 3 months (totaling up t... | "3,500 points on approval plus 3,500 bonus points when you spend $500 in your first 3 months (totaling up t... | issuer page captured 2026-11-13: This offer only applies to new applications for an RBC ION Visa credit card received between November 5, 2026 and Ja... |
| CA | rbc-ion-visa-2 | welcome_bonus_value_cad | 252 | 126 | derived: cards.ts methodology |
| CA | rbc-ion-visa-2 | first_year_value_cad | 252 | 126 | derived: cards.ts methodology |
| CA | rbc-visa-classic-low-rate-option | welcome_bonus | "" | "No annual fee for the first year, plus a 1.9% introductory rate on balance transfers for the first 10 mont... | issuer page captured 2026-11-13: Enjoy a 1.9% introductory interest rate for the first 10 months on balance transfers^ and **no annual fee** for the ... |
| CA | rbc-visa-classic-low-rate-option | cash_advance_rate | null | 14.99 | issuer page captured 2026-11-13: Get a low, fixed annual interest rate of 12.99% on purchases and 14.99% on cash advances including balance transfers1. |
| CA | rbc-visa-classic-low-rate-option | balance_transfer_rate | null | 14.99 | issuer page captured 2026-11-13: Cash Advance Rate\n\n(including Balance Transfers)\n\n14.99% |
| CA | rbc-visa-creditline-for-small-business | first_year_value_cad | 0.02 | 0 | derived: cards.ts methodology |
| CA | scotia-home-hardware-pro-visa-business-card | welcome_bonus | "Earn up to 7,500 bonus Scene+ points in your first 3 months (up to $75 in points value)." | "Earn up to 15,000 bonus Scene+ points in your first 3 months when you spend $1,500 at Home Hardware. Offer... | issuer page captured 2026-11-13: Earn up to 15,000 bonus Scene+ points in your first 3 months with minimum spend (that's up to $150 in points value).... |
| CA | scotia-home-hardware-pro-visa-business-card | welcome_bonus_points | 7500 | 15000 | issuer page captured 2026-11-13: To qualify for 15,000 bonus Scene+ points: (the \"Offer\") |
| CA | scotia-home-hardware-pro-visa-business-card | min_spend | 1000 | 1500 | issuer page captured 2026-11-13: Spend at least $1,500 in eligible purchases at eligible Home Hardware, Home Building Centre, Home Hardware Building ... |
| CA | scotia-home-hardware-pro-visa-business-card | welcome_bonus_conditions | null | "Spend $1,500 at Home Hardware, Home Building Centre or Home Hardware Building Centre (in Canada or online ... | issuer page captured 2026-11-13: Spend at least $1,500 in eligible purchases at eligible Home Hardware, Home Building Centre, Home Hardware Building ... |
| CA | scotia-home-hardware-pro-visa-business-card | welcome_bonus_value_cad | 75 | 150 | derived: cards.ts methodology |
| CA | scotia-home-hardware-pro-visa-business-card | first_year_value_cad | 75 | 150 | derived: cards.ts methodology |
| CA | scotia-momentum-for-business-visa-card | welcome_bonus | "Get 5% cash back on up to $6,500 in purchases in the first 3 months. Plus, 2.99% introductory interest rat... | "No cash back welcome bonus is shown. Current offer: 2.99% introductory interest rate on balance transfers ... | issuer page captured 2026-11-13: Special Offer: 2.99% introductory interest rate on Balance transfers for the first 6 months (22.99% after that; annu... |
| CA | scotia-momentum-for-business-visa-card | welcome_bonus_value_cad | 325 | null | issuer page captured 2026-11-13: Special Offer: 2.99% introductory interest rate on Balance transfers for the first 6 months (22.99% after that; annu... |
| CA | scotia-momentum-mastercard-credit-card | welcome_bonus | "No points or cash welcome bonus. Current offer: 7.99% introductory interest rate on purchases for the firs... | "No points or cash welcome bonus. Current offer: 7.99% introductory interest rate on purchases for the firs... | issuer page captured 2026-11-13: Get a 7.99% introductory rate on purchases for the first 6 months (20.99% applies after that; $0 annual fee). / (T&C... |
| CA | scotia-momentum-no-fee-visa-card | welcome_bonus | "Earn 5% cash back on all purchases for the first 3 months (up to $2,000 in total purchases). Plus, get a 0... | "Earn 5% cash back on all purchases for the first 3 months (up to $2,000 in total purchases). Plus, get a 0... | issuer page captured 2026-11-13: The 5% Cash Back and Introductory 0.99% Balance Transfer Rate Offer (the \"Offer\") applies only to new Scotia Momen... |
| CA | scotia-momentum-no-fee-visa-card-for-students | welcome_bonus | "Earn 5% Cash Back on all purchases for the first 3 months (up to $2,000 in total purchases). Plus, 0.99% i... | "Earn 5% Cash Back on all purchases for the first 3 months (up to $2,000 in total purchases). Plus, 0.99% i... | issuer page captured 2026-11-13: The 5% Cash Back and Introductory 0.99% Balance Transfer Rate Offer (the \"Offer\") applies only to new Scotia Momen... |
| CA | scotia-momentum-visa-card | name | "Scotia Momentum® Visa*  Card" | "Scotia Momentum® Visa* Card" | issuer page captured 2026-11-13: # Scotia Momentum® Visa\\* Card |
| CA | scotia-momentum-visa-card | welcome_bonus | "No points or cash welcome bonus. Current offer: 0.99% introductory interest rate on balance transfers for ... | "No points or cash welcome bonus. Current offer: 0.99% introductory interest rate on balance transfers for ... | issuer page captured 2026-11-13: Get a 0.99% introductory interest rate on balance transfers for the first 9 months (2% fee per cash advance; 22.99% ... |
| CA | scotia-momentum-visa-card-for-students | welcome_bonus | "No points or cash welcome bonus. Current offer: 0.99% introductory interest rate on balance transfers for ... | "No points or cash welcome bonus. Current offer: 0.99% introductory interest rate on balance transfers for ... | issuer page captured 2026-11-13: This introductory rate applies if the new Account is opened between July 2, 2026 and January 3, 2027 |
| CA | scotia-momentum-visa-infinite-card | name | "Scotia Momentum® Visa Infinite* Card" | "Scotia Momentum® Visa Infinite +* Card" | issuer page captured 2026-11-13: # Scotia Momentum® Visa Infinite +\\* Card |
| CA | scotia-momentum-visa-infinite-card | welcome_bonus | "Earn 15% cash back on all purchases for the first 3 months (up to $2,000 in total purchases). Plus, get a ... | "Earn 10% cash back on all purchases for the first 3 months (up to $2,000 in total purchases), up to $200. ... | issuer page captured 2026-11-13: Earn 10% cash back on all purchases for the first 3 months (up to $2,000 in total purchases). Plus, get a 0% introdu... |
| CA | scotia-momentum-visa-infinite-card | welcome_bonus_value_cad | 300 | 200 | issuer page captured 2026-11-13: Get 10% cash back for your first 3 months on the first $2,000 in purchases - that's up to $200 back. |
| CA | scotiabank-american-express-card | welcome_bonus | "Earn up to 10,000 bonus Scene+ points within your first 3 months (that's up to $100 towards travel)" | "Earn up to 5,000 bonus Scene+ points within your first 3 months: 2,500 points for spending $250, plus 2,50... | issuer page captured 2026-11-13: Earn up to 5,000 bonus Scene+ points within your first 3 months. That's up to $50 in value that you can redeem on tr... |
| CA | scotiabank-american-express-card | welcome_bonus_points | 10000 | 5000 | issuer page captured 2026-11-13: The 5,000 Bonus Scene+ Points Offer (the \"Offer\") applies only to new Scotiabank American Express credit card acco... |
| CA | scotiabank-american-express-card | welcome_bonus_conditions | null | "Spend $250 in the first 3 months for 2,500 points and $1,000 in the first 3 months for 2,500 more. Not ope... | issuer page captured 2026-11-13: To be eligible for 2,500 bonus Scene+ points ..., you must have at least $250 ... an additional 2,500 bonus Scene+ p... |
| CA | scotiabank-american-express-card | welcome_bonus_value_cad | 100 | 50 | derived: cards.ts methodology |
| CA | scotiabank-american-express-card | first_year_value_cad | 100 | 50 | derived: cards.ts methodology |
| CA | scotiabank-american-express-card-for-students | welcome_bonus | "Earn up to 10,000 bonus Scene+ points within your first 3 months (that's up to $100 towards travel)" | "Earn up to 5,000 bonus Scene+ points within your first 3 months (that's up to $50 towards travel). Offer v... | issuer page captured 2026-11-13: Earn up to 5,000 bonus Scene+ points within your first 3 months. That's up to $50 in value that you can redeem on tr... |
| CA | scotiabank-american-express-card-for-students | welcome_bonus_points | 10000 | 5000 | issuer page captured 2026-11-13: Get up to 5,000 bonus Scene+ points - that's up to $50 toward travel. |
| CA | scotiabank-american-express-card-for-students | welcome_bonus_conditions | null | "2,500 points after $250 in purchases in the first 3 months, plus 2,500 more after $1,000 in purchases in t... | issuer page captured 2026-11-13: Start with 2,500 bonus Scene+ points: Spend at least $250 on eligible purchases in your first 3 months. Then, get 2,... |
| CA | scotiabank-american-express-card-for-students | welcome_bonus_value_cad | 100 | 50 | derived: cards.ts methodology |
| CA | scotiabank-american-express-card-for-students | first_year_value_cad | 100 | 50 | derived: cards.ts methodology |
| CA | scotiabank-gold-american-express-card | welcome_bonus | "Earn up to $950 in welcome offers, first year rewards and savings value, including up to 50,000 bonus Scen... | "Earn up to 65,000 bonus Scene+ points: 40,000 points for spending $2,000 in the first 3 months, plus 25,00... | issuer page captured 2026-11-13: Earn up to $1,100 in welcome offers, first year rewards and savings value, including up to 65,000 bonus Scene+ point... |
| CA | scotiabank-gold-american-express-card | welcome_bonus_points | 50000 | 65000 | issuer page captured 2026-11-13: The 65,000 Bonus Scene+ Points Offer (the \"Offer\") applies only to new Scotiabank Gold American Express credit car... |
| CA | scotiabank-gold-american-express-card | welcome_bonus_conditions | null | "Spend $2,000 in the first 3 months for 40,000 points and $7,500 in the first 12 months for 25,000 more. No... | issuer page captured 2026-11-13: To be eligible for 40,000 bonus Scene+ points ..., you must have at least $2,000 in eligible purchases posted to you... |
| CA | scotiabank-gold-american-express-card | min_spend | null | 7500 | issuer page captured 2026-11-13: Spend at least $7,500 on eligible purchases in your first 12 months. |
| CA | scotiabank-gold-american-express-card | benefits.lounge_access | true | false | issuer page captured 2026-11-13: As a Scotiabank Gold American Express® cardholder, you get a discount on a Priority Pass™ membership. / Which credit... |
| CA | scotiabank-gold-american-express-card | key_perks | ["Front of the Line presale tickets", "Priority Pass lounge access", "No foreign transaction fee", "Concier... | ["Front of the Line presale tickets", "Priority Pass membership discount", "No foreign transaction fee", "C... | issuer page captured 2026-11-13: you get a discount on a Priority Pass™ membership. This gets you access to over 1,200 lounges around the world. |
| CA | scotiabank-gold-american-express-card | welcome_bonus_value_cad | 500 | 650 | derived: cards.ts methodology |
| CA | scotiabank-gold-american-express-card | first_year_value_cad | 450 | 530 | derived: cards.ts methodology |
| CA | scotiabank-passport-visa-infinite-business-card | welcome_bonus | "Earn up to $2,600 in first year savings and reward value, including up to 40,000 bonus Scene+ points." | "Earn up to 40,000 bonus Scene+ points: 30,000 after $5,000 in purchases in the first 3 months, plus 10,000... | issuer page captured 2026-11-13: Earn 30,000 bonus Scene+ points by making at least $5,000 in everyday eligible business purchases in your first 3 mo... |
| CA | scotiabank-passport-visa-infinite-business-card | min_spend | null | 5000 | issuer page captured 2026-11-13: Earn 30,000 bonus Scene+ points by making at least $5,000 in everyday eligible business purchases in your first 3 mo... |
| CA | scotiabank-passport-visa-infinite-business-card | welcome_bonus_conditions | null | "30,000 points after $5,000 in eligible business purchases in the first 3 months. 10,000 more after $60,000... | issuer page captured 2026-11-13: Individuals who are currently or were previously primary or secondary cardholders of a Scotiabank business credit ca... |
| CA | scotiabank-passport-visa-infinite-business-card | key_perks | ["Airport lounge access", "No foreign transaction fee", "Concierge service", "Hotel elite status/collection"] | ["6 complimentary airport lounge passes", "No foreign transaction fee", "Visa Infinite Concierge", "Visa In... | issuer page captured 2026-11-13: Get 6 complimentary airport lounge passes / Access Visa Infinite Concierge and the Luxury Hotel Collection: Visa Inf... |
| CA | scotiabank-passport-visa-infinite-card | name | "Scotiabank Passport® Visa Infinite* Card" | "Scotiabank Passport® Visa Infinite +* Card" | issuer page captured 2026-11-13: # Scotiabank Passport® Visa Infinite +\\* Card |
| CA | scotiabank-passport-visa-infinite-card | welcome_bonus | "Earn up to $1,250 in first year welcome offers, rewards and savings, including up to 35,000 bonus Scene+ p... | "Earn up to 45,000 bonus Scene+ points: 15,000 points for spending $3,000 in the first 3 months, plus 20,00... | issuer page captured 2026-11-13: Earn up to $1,350 in first year welcome offers, rewards and savings, including up to 45,000 bonus Scene+ points. / O... |
| CA | scotiabank-passport-visa-infinite-card | welcome_bonus_points | 35000 | 45000 | issuer page captured 2026-11-13: including up to 45,000 bonus Scene+ points. |
| CA | scotiabank-passport-visa-infinite-card | welcome_bonus_conditions | null | "Spend $3,000 in the first 3 months for 15,000 points and $10,000 in the first 6 months for 20,000 more. Th... | issuer page captured 2026-11-13: Individuals who are currently or were previously primary or secondary cardholders of a Scotiabank personal credit ca... |
| CA | scotiabank-passport-visa-infinite-card | min_spend | null | 10000 | issuer page captured 2026-11-13: Spend at least $10,000 on eligible purchases in your first 6 months. |
| CA | scotiabank-passport-visa-infinite-card | welcome_bonus_value_cad | 350 | 450 | derived: cards.ts methodology |
| CA | scotiabank-passport-visa-infinite-card | first_year_value_cad | 450 | 300 | derived: cards.ts methodology |
| CA | scotiabank-passport-visa-infinite-privilege-card | welcome_bonus | "Earn up to 80,000 bonus Scene+ points in your first 14 months (up to $800 in value)" | "Earn up to 80,000 bonus Scene+ points in your first 14 months: 40,000 points for spending $3,000 in the fi... | issuer page captured 2026-11-13: Earn up to 80,000 bonus Scene+ points within your first 14 months. / Open a new Scotiabank Passport Visa Infinite Pr... |
| CA | scotiabank-passport-visa-infinite-privilege-card | welcome_bonus_conditions | null | "Spend $3,000 in the first 3 months for 40,000 points and $20,000 in the first 6 months for 30,000 more. Ma... | issuer page captured 2026-11-13: Individuals who are currently or were previously primary or secondary cardholders of a Scotiabank personal credit ca... |
| CA | scotiabank-passport-visa-infinite-privilege-card | min_spend | null | 20000 | issuer page captured 2026-11-13: Spend at least $20,000 on eligible purchases in your first 6 months. |
| CA | scotiabank-platinum-american-express-card | welcome_bonus | "Earn up to $3,000* in value in the first 14 months, including up to 100,000 bonus Scene+ points." | "Earn up to $2,800* in value in the first 14 months, including up to 80,000 bonus Scene+ points: 45,000 poi... | issuer page captured 2026-11-13: Earn up to $2,800 in value in the first 14 months, including up to 80,000 bonus Scene+ points. / Open a new Scotiaba... |
| CA | scotiabank-platinum-american-express-card | welcome_bonus_points | 100000 | 80000 | issuer page captured 2026-11-13: The 80,000 Bonus Scene+ Points Offer (the \"Offer\") applies only to new Scotiabank Platinum American Express credit... |
| CA | scotiabank-platinum-american-express-card | welcome_bonus_conditions | null | "Spend $5,000 in the first 6 months for 45,000 points and $10,000 in the first 12 months for 25,000 more. M... | issuer page captured 2026-11-13: To qualify for 45,000 bonus Scene+ points ..., you must have at least $5,000 ... first 6 months ... 25,000 ... at le... |
| CA | scotiabank-platinum-american-express-card | min_spend | null | 10000 | issuer page captured 2026-11-13: Spend at least $10,000 on eligible purchases in your first 12 months. |
| CA | scotiabank-platinum-american-express-card | welcome_bonus_value_cad | 1000 | 800 | derived: cards.ts methodology |
| CA | scotiabank-scene-tm-visa-card | welcome_bonus | "Earn up to 5,000 bonus Scene+ points in your first 3 months: 2,500 points for spending $250, plus an extra... | "Earn up to 10,000 bonus Scene+ points in your first 3 months: 2,500 points for spending $500, plus an extr... | issuer page captured 2026-11-13: Earn up to 10,000 bonus Scene+ points within your first 3 months. Plus, get a 0.99% introductory interest rate on ba... |
| CA | scotiabank-scene-tm-visa-card | welcome_bonus_points | 5000 | 10000 | issuer page captured 2026-11-13: Get up to 10,000 bonus Scene+ points - that's up to $100 |
| CA | scotiabank-scene-tm-visa-card | min_spend | 1000 | 1500 | issuer page captured 2026-11-13: Spend at least $1,500 on eligible purchases in your first 3 months. |
| CA | scotiabank-scene-tm-visa-card | welcome_bonus_conditions | null | "Spend $500 in the first 3 months for 2,500 points and $1,500 in the first 3 months for 7,500 more. Not ope... | issuer page captured 2026-11-13: Individuals who are currently or were previously primary or secondary cardholders of a Scotiabank personal credit ca... |
| CA | scotiabank-scene-tm-visa-card | welcome_bonus_value_cad | 50 | 100 | derived: cards.ts methodology |
| CA | scotiabank-scene-tm-visa-card-for-students | welcome_bonus | "Earn up to 5,000 bonus Scene+ points in your first 3 months." | "Earn up to 10,000 bonus Scene+ points in your first 3 months. Plus, a 0.99% introductory interest rate on ... | issuer page captured 2026-11-13: Earn up to 10,000 bonus Scene+ points within your first 3 months. Plus, get a 0.99% introductory interest rate on ba... |
| CA | scotiabank-scene-tm-visa-card-for-students | welcome_bonus_points | 5000 | 10000 | issuer page captured 2026-11-13: Get up to 10,000 bonus Scene+ points - that's up to $100 |
| CA | scotiabank-scene-tm-visa-card-for-students | min_spend | 1000 | 1500 | issuer page captured 2026-11-13: Then, get 7,500 more bonus Scene+ points. Spend at least $1,500 on eligible purchases in your first 3 months. |
| CA | scotiabank-scene-tm-visa-card-for-students | welcome_bonus_conditions | null | "2,500 points after $500 in purchases in the first 3 months, plus 7,500 more after $1,500 in purchases in t... | issuer page captured 2026-11-13: Start with 2,500 bonus Scene+ points: Spend at least $500 on eligible purchases in your first 3 months. Then, get 7,... |
| CA | scotiabank-scene-tm-visa-card-for-students | welcome_bonus_value_cad | 50 | 100 | derived: cards.ts methodology |
| CA | scotiabank-u-s-dollar-visa-card | welcome_bonus | "" | "No welcome offer." | issuer page captured 2026-11-13: Page has no 'Special offer' block: heading '# Scotiabank® U.S. Dollar Visa\\* Card' is followed directly by 'Apply n... |
| CA | scotiabank-value-visa-card | welcome_bonus | "Get a 0% promotional interest rate on balance transfers for your first 9 months (1% transfer fee). Plus, p... | "Get a 0% promotional interest rate on balance transfers for your first 9 months (1% transfer fee). Plus, p... | issuer page captured 2026-11-13: 0% promotional interest rate on balance transfers for the first 9 months with a 1% balance transfer fee. Plus pay no... |
| CA | scotiabank-value-visa-card | first_year_value_cad | 71 | 0 | derived: cards.ts methodology |
| CA | scotiabank-value-visa-card-for-students | welcome_bonus | "Get a 0% promotional interest rate on balance transfers for your first 9 months (1% transfer fee). Plus, p... | "Get a 0% promotional interest rate on balance transfers for your first 9 months (1% transfer fee). Plus, p... | issuer page captured 2026-11-13: ...new Scotiabank Value Visa credit card accounts (\"Accounts\") that are opened between July 2, 2026, and January 3... |
| CA | simplii-financial-cash-back-visa-card | welcome_bonus | "Earn up to $100 cash back in first 3 months (up to 20% on eligible purchases)" | "Earn 8% cash back on eligible restaurant, bar and coffee shop purchases for your first 3 monthly statement... | issuer page captured 2026-11-13: ## Earn up to 8% cash back ... double your cash back in your first 3 months (up to $80) at eligible restaurants, bar... |
| CA | simplii-financial-cash-back-visa-card | welcome_bonus_value_cad | 100 | 40 | issuer page captured 2026-11-13: \"$1,000 in total restaurant, bar and coffee shop purchases (equal to $40 bonus cash back), whichever comes first.\ |
| CA | simplii-financial-cash-back-visa-card | welcome_bonus_conditions | null | "Extra 4% cash back on eligible restaurant, bar and coffee shop purchases during your first 3 monthly state... | issuer page captured 2026-11-13: \"The 4% incremental cash back applies on eligible restaurant, bar and coffee shop purchases made during your first ... |
| CA | simplii-financial-cash-back-visa-card | first_year_value_cad | 100 | 40 | derived: cards.ts methodology |
| CA | simplycash-card-from-american-express | welcome_bonus_conditions | null | "Earn a bonus 5% cash back on up to $2,000 in purchases in the first 3 months. Current or former Cardmember... | issuer page captured 2026-11-13: ## Earn up to $100 in bonus cash back1\\* ## by earning a bonus 5% cash back on all purchases (up to $2,000 in purch... |
| CA | student-bmo-cashback-mastercard | apply_url | "https://www.bmo.com/main/personal/credit-cards/student-bmo-cashback-mastercard/" | "https://www.bmo.com/en-ca/main/personal/credit-cards/student-bmo-cashback-mastercard/" | issuer page captured 2026-11-13: Capture log: REDIR https://www.bmo.com/en-ca/main/personal/credit-cards/student-bmo-cashback-mastercard/ / page H1: ... |
| CA | tangerine-money-back-world-mastercard | welcome_bonus | "Get $100 cash back when you spend $1,500 in your first 3 months" | "Get $120 cash back when you spend $1,500 in your first 3 months. Apply by November 30, 2026." | issuer page captured 2026-11-13: ## **Get $120 with a Money-Back World Mastercard®\\***\nSpend $1,500 in your first 3 months to enjoy this Bonus. ...... |
| CA | tangerine-money-back-world-mastercard | welcome_bonus_value_cad | 100 | 120 | issuer page captured 2026-11-13: The Offer Bonus of $120 Money-Back Rewards will be credited to the Primary Cardholder's Account within approximately... |
| CA | tangerine-money-back-world-mastercard | welcome_bonus_conditions | "Spend $1,500 within the first 3 months of account opening" | "Apply by November 30, 2026, activate within 45 days of approval, and make $1,500 in net purchases within 9... | issuer page captured 2026-11-13: (i) apply ... by November 30, 2026, (ii) activate their Account within 45 days of approval, and (iii) have at least ... |
| CA | tangerine-money-back-world-mastercard | cash_advance_rate | null | 22.95 | issuer page captured 2026-11-13: / **Interest on Cash Advances** / 22.95% / |
| CA | td-aeroplan-visa-business-card | welcome_bonus_conditions | null | "10,000 points on first purchase, 30,000 points when you spend $15,000 in the first 180 days, plus 20,000 p... | issuer page captured 2026-11-13: 1. Earn 10,000 Aeroplan points when you make your first Purchase. 2. Earn 30,000 Aeroplan points when you spend $15,... |
| CA | td-aeroplan-visa-business-card | welcome_bonus_value_cad | 1900 | 1230 | derived: cards.ts methodology |
| CA | td-aeroplan-visa-business-card | first_year_value_cad | 1081 | 1230 | derived: cards.ts methodology |
| CA | td-aeroplan-visa-infinite-card | first_year_value_cad | 820 | 1025 | derived: cards.ts methodology |
| CA | td-aeroplan-visa-infinite-privilege-credit-card | first_year_value_cad | 1143 | 1451 | derived: cards.ts methodology |
| CA | td-aeroplan-visa-platinum-credit-card | welcome_bonus_conditions | null | "10,000 points on first purchase, plus 10,000 points when you spend $1,500 within 90 days of account openin... | issuer page captured 2026-11-13: Earn a welcome bonus of 10,000 Aeroplan points when you make your first Purchase with your new Card. / Earn an addit... |
| CA | td-aeroplan-visa-platinum-credit-card | min_spend | null | 1500 | issuer page captured 2026-11-13: Earn an additional 10,000 Aeroplan points when you spend $1,500 within 90 days of Account opening. |
| CA | td-business-travel-visa-card | welcome_bonus_conditions | null | "30,000 points on first purchase, 120,000 points when you spend $15,000 in the first 180 days, 30,000 point... | issuer page captured 2026-11-13: Earn a Welcome Bonus of 30,000 TD Rewards Points when you make your first Purchase. / Earn 120,000 TD Rewards Points... |
| CA | td-business-travel-visa-card | welcome_bonus_value_cad | 1300 | 1000 | derived: cards.ts methodology |
| CA | td-cash-back-visa-card | welcome_bonus | "Earn up to $100 in Cash Back Dollars" | "No welcome offer is currently shown on TD's page for this card." | issuer page captured 2026-11-13: Hero: 'Earn Cash Back Dollars. Redeem them to help pay down your Account balance.' then 'Annual Fee $0'. No 'Special... |
| CA | td-cash-back-visa-card | welcome_bonus_value_cad | 100 | 0 | issuer page captured 2026-11-13: No 'Special Offer' block on the TD Cash Back Visa Card page captured 2026-11-13. |
| CA | td-cash-back-visa-card | first_year_value_cad | 100 | 0 | derived: cards.ts methodology |
| CA | td-cash-back-visa-infinite-card | welcome_bonus_value_cad | 600 | 350 | issuer page captured 2026-11-13: Earn up to **$600** in total value, which includes 10% in Cash Back Dollars in the first 3 months on Bonus Eligible ... |
| CA | td-cash-back-visa-infinite-card | welcome_bonus_conditions | null | "10% Cash Back Dollars in the first 3 months on Bonus Eligible Purchases (grocery, gas and EV charging, pub... | issuer page captured 2026-11-13: Bonus Eligible Purchases are Grocery, Gas & Electric Vehicle Charging, Public Transit, Recurring Bill Payments, and ... |
| CA | td-cash-back-visa-infinite-card | first_year_value_cad | 600 | 350 | derived: cards.ts methodology |
| CA | td-first-class-travel-visa-infinite-card | min_spend | null | 7500 | issuer page captured 2026-11-13: Earn 140,000 TD Rewards Points when you spend $7,500 within 180 days of Account opening. |
| CA | td-first-class-travel-visa-infinite-card | first_year_value_cad | 730 | 800 | derived: cards.ts methodology |
| CA | td-platinum-travel-visa-card | welcome_bonus_conditions | null | "15,000 points on first purchase, plus 35,000 points when you spend $3,000 within 180 days of account openi... | issuer page captured 2026-11-13: Welcome Bonus of 15,000 TD Rewards Points when you make your first Purchase with your Card. / 35,000 TD Rewards Poin... |
| CA | td-platinum-travel-visa-card | min_spend | null | 3000 | issuer page captured 2026-11-13: 35,000 TD Rewards Points when you spend $3,000 within 180 days of Account opening. |
| CA | td-rewards-visa-card | first_year_value_cad | 100 | 76 | derived: cards.ts methodology |
| CA | the-platinum-card | welcome_bonus | "Earn up to 100,000 Membership Rewards points (70,000 after spending $10,000 in first 3 months, plus 30,000... | "Earn up to 130,000 Membership Rewards points (90,000 after spending $10,000 in the first 3 months, plus 40... | issuer page captured 2026-11-13: ## Earn ~~70,000~~ **90,000** Membership Rewards® points1\\* after spending $10,000 on your Card within your first 3... |
| CA | the-platinum-card | welcome_bonus_conditions | "Spend $10,000 in the first 3 months for 70,000 points, plus make a purchase between 15 and 17 months of Ca... | "Spend $10,000 in the first 3 months for 90,000 points, plus make a purchase between 15 and 17 months of Ca... | issuer page captured 2026-11-13: ## Earn ~~70,000~~ **90,000** Membership Rewards® points1\\* after spending $10,000 on your Card within your first 3... |
| CA | the-platinum-card | welcome_bonus_points | 100000 | 130000 | issuer page captured 2026-11-13: ## Earn ~~70,000~~ **90,000** Membership Rewards® points1\\* after spending $10,000 on your Card within your first 3... |
| CA | the-platinum-card | welcome_bonus_value_cad | 1950 | 2535 | derived: cards.ts methodology |
| CA | the-platinum-card | first_year_value_cad | 2516 | 1736 | derived: cards.ts methodology |
| CA | triangle-mastercard | cash_advance_rate | null | 22.99 | issuer page captured 2026-11-13: \"I am applying for the Triangle(R) Mastercard(R) (the 'Card') with annual interest rates of 21.99% for all charges ... |
| CA | triangle-world-elite-mastercard | minimum_income | null | 80000 | issuer page captured 2026-11-13: \"Applications for the Triangle World Elite Mastercard are currently only being accepted online. Minimum $80,000 ann... |
| CA | wealthsimple-cash-back-visa | welcome_bonus | "New clients earn 5% cash back for the first month, then 2% every month after" | "New clients get 5% cash back on everything for 5 weeks, then 2% after. The card carries a $20 monthly fee ... | issuer page captured 2026-11-13: # New clients get 5% cash back on everything for 5 weeks / / Cash back / 5% for your first month, then 2% after (on ... |
| CA | wealthsimple-cash-back-visa | annual_fee | 0 | 240 | issuer page captured 2026-11-13: ### I'm not eligible to have the annual fees waived, how much will I pay in fees?\nYou'll be charged $20 monthly if ... |
| CA | wealthsimple-cash-back-visa | minimum_income | null | 80000 | issuer page captured 2026-11-13: To qualify for the Wealthsimple Visa Infinite + card you must meet the requirements above and have a personal income... |
| CA | wealthsimple-cash-back-visa | cash_advance_rate | null | 22.99 | issuer page captured 2026-11-13: The annual interest rate for purchases is 20.99%, and for cash advances or cash-like transactions, it's 22.99%. |
| CA | wealthsimple-cash-back-visa | key_perks | ["No FX fees", "Hotel elite status/collection", "Purchase protection 90 days", "Metal card for $100K+ clien... | ["No FX fees", "Visa Infinite Luxury Hotel Collection", "Purchase protection 90 days", "Metal card for $100... | issuer page captured 2026-11-13: + Visa Infinite + Luxury Hotel Collection benefits at over 900 locations |
| CA | westjet-rbc-mastercard | welcome_bonus | "Get up to 15,000 WestJet points - a value of up to $150 off travel." | "Get up to 15,000 WestJet points - a value of up to $150 off travel. Offer valid for applications received ... | issuer page captured 2026-11-13: your application must be received and approved by Royal Bank of Canada (\"Royal Bank\") between **June 16, 2026** an... |
| CA | westjet-rbc-mastercard | key_perks | ["Subscription perks"] | ["Annual round-trip companion voucher", "6 months of complimentary DashPass"] | issuer page captured 2026-11-13: Get a welcome round-trip companion voucher starting from $199 CAD ... Your annual companion voucher will be issued e... |
| CA | westjet-rbc-world-elite-mastercard | welcome_bonus | "Get up to 70,000 WestJet points - a value of up to $700 off travel." | "Get up to 70,000 WestJet points - a value of up to $700 off travel. Offer valid for applications received ... | issuer page captured 2026-11-13: your application must be received and approved by Royal Bank of Canada (\"Royal Bank\") between **June 16, 2026** an... |
| CA | westjet-rbc-world-elite-mastercard | key_perks | ["Subscription perks", "Airport lounge access", "Food delivery credits", "Free first checked bag"] | ["Annual round-trip companion voucher", "Free first checked bag for you and up to 8 guests", "Mastercard Tr... | issuer page captured 2026-11-13: Receive a welcome round-trip companion voucher starting from $119 CAD ... Your annual companion voucher will be issu... |
| CA | westjet-rbc-world-elite-mastercard-for-business | apply_url | "https://www.rbcroyalbank.com/business/credit-cards/small-business-credit-cards/westjet-rbc-world-elite-mas... | "https://www.rbcroyalbank.com/business/credit-cards/small-business-credit-cards/westjet-rbc-world-elite-mas... | issuer page captured 2026-11-13: log_ca_rbc.txt: REDIR https://www.rbcroyalbank.com/business/credit-cards/small-business-credit-cards/westjet-rbc-wor... |
| CA | westjet-rbc-world-elite-mastercard-for-business | earn_rates | {"WestJet & Sunwing vacations": "3x", "Telecom, shipping & electronics": "3x", "All other purchases": "1.5x"} | {"WestJet flights & vacations, Sunwing": "3x", "Telecom, shipping & electronics": "3x", "All other purchase... | issuer page captured 2026-11-13: Legal 1: \"Earn 3 WestJet points per $1 spent on eligible WestJet flights, WestJet Vacations and Sunwing Vacations, ... |
| CA | westjet-rbc-world-elite-mastercard-for-business | first_year_value_cad | 175 | 825 | derived: cards.ts methodology |
| US | aer-lingus-visa-signature-credit-card | key_perks | ["Food delivery credits", "Subscription perks", "No foreign transaction fee", "Economy Companion Ticket", "... | ["Food delivery credits", "Subscription perks", "No foreign transaction fee", "Economy Companion Ticket"] | issuer page captured 2026-11-13: ### Economy Companion Ticket each year ... ### No foreign transaction fees on card purchases / Complimentary DashPas... |
| US | aer-lingus-visa-signature-credit-card | welcome_bonus_conditions | null | "Spend $5,000 on purchases within the first 3 months of account opening" | issuer page captured 2026-11-13: Earn 75,000 Avios after you spend $5,000 on purchases within the first 3 months of account opening. |
| US | aeroplan-card | signup_bonus | 115000 | 80000 | issuer page captured 2026-11-13: Up to80Kbonus points / NEW CARDMEMBER OFFER Earn up to 80,000 bonus points. / ### Earn up to 80,000 bonus points |
| US | aeroplan-card | signup_bonus_formatted | "Earn up to 115,000 bonus points: 75,000 bonus points after you spend $4,000 on purchases in the first 3 mo... | "Earn up to 80,000 bonus points: 60,000 bonus points after spending $3,000 on purchases in the first 3 mont... | issuer page captured 2026-11-13: Earn **60,000** bonus points after spending $3,000 on purchases in the first 3 months from account opening. Plus, up... |
| US | aeroplan-card | signup_bonus_value_usd | 115000 | 80000 | issuer page captured 2026-11-13: Earn up to 80,000 bonus points. |
| US | aeroplan-card | welcome_bonus_conditions | null | "60,000 points after $3,000 in purchases in the first 3 months. Up to 20,000 more points (1.5X on purchases... | issuer page captured 2026-11-13: **50% More Bonus Points:** This offer is available for any individual who has never held an Aeroplan credit card, of... |
| US | aeroplan-card | name | "Aeroplan® Card" | "Air Canada Aeroplan® Card" | issuer page captured 2026-11-13: # Air Canada Aeroplan® Card |
| US | amazon-visa | signup_bonus | 50 | 60 | issuer page captured 2026-11-13: #### $50Strike through $60 Amazon Gift Card  Get a $60 Amazon Gift Card instantly loaded into your Amazon account's ... |
| US | amazon-visa | signup_bonus_formatted | "$50 Amazon Gift Card" | "$60 Amazon Gift Card" | issuer page captured 2026-11-13: Get a $60 Amazon Gift Card instantly loaded ... |
| US | amazon-visa | signup_bonus_value_usd | 50 | 60 | issuer page captured 2026-11-13: Get a $60 Amazon Gift Card |
| US | american-express-green-card | apply_url | "https://www.americanexpress.com/us/credit-cards/card/green/" | "https://www.americanexpress.com/us/credit-cards/" | discontinued decision; americanexpress.com/us/credit-cards/card/green/ redirects to the US all-cards listing ... |
| US | american-express-green-card | signup_bonus_formatted | "40,000 Membership Rewards bonus points" | "Not open to new applicants as of November 2026. American Express no longer lists the personal Green Card." | discontinued decision; americanexpress.com/us/credit-cards/card/green/ redirects to the US all-cards listing ... |
| US | american-express-green-card | welcome_bonus | "40,000 Membership Rewards bonus points" | "Not open to new applicants as of November 2026. American Express no longer lists the personal Green Card." | discontinued decision; americanexpress.com/us/credit-cards/card/green/ redirects to the US all-cards listing ... |
| US | american-express-green-card | signup_bonus | 40000 | 0 | discontinued decision; americanexpress.com/us/credit-cards/card/green/ redirects to the US all-cards listing ... |
| US | american-express-green-card | signup_bonus_value_usd | 40000 | 0 | discontinued decision; americanexpress.com/us/credit-cards/card/green/ redirects to the US all-cards listing ... |
| US | blue-business-plus-credit-card | signup_bonus | 15000 | 50000 | issuer page captured 2026-11-13: ## AS HIGH AS 50,000 Membership Rewards® Points / after you spend $5,000 in purchases on your new Card within the fi... |
| US | blue-business-plus-credit-card | signup_bonus_formatted | "15,000 Membership Rewards bonus points" | "AS HIGH AS 50,000 Membership Rewards® Points after you spend $5,000 in purchases on your new Card within t... | issuer page captured 2026-11-13: ## AS HIGH AS 50,000 Membership Rewards® Points / after you spend $5,000 in purchases on your new Card within the fi... |
| US | blue-business-plus-credit-card | welcome_bonus | "15,000 Membership Rewards bonus points" | "AS HIGH AS 50,000 Membership Rewards® Points after you spend $5,000 in purchases on your new Card within t... | issuer page captured 2026-11-13: ## AS HIGH AS 50,000 Membership Rewards® Points |
| US | blue-business-plus-credit-card | welcome_bonus_conditions | "Spend $3,000 in purchases within the first 3 months of Card Membership" | "Spend $5,000 in purchases within the first 3 months of Card Membership" | issuer page captured 2026-11-13: after you spend $5,000 in purchases on your new Card within the first 3 months of Card Membership. |
| US | blue-business-plus-credit-card | signup_bonus_value_usd | 15000 | 50000 | lead: Points card: field mirrors the points count (deck convention; site values from points ... |
| US | blue-cash-everyday-card | signup_bonus_formatted | "AS HIGH AS $200 Cash Back1 after you spend $2,000 in purchases on your new Card within the first 6 months ... | "Earn $200 Cash Back after you spend $2,000 in purchases on your new Card in the first 6 months of Card Mem... | issuer page captured 2026-11-13: ## Earn $200 Cash Back / after you spend $2,000 in purchases on your new Card in the first 6 months of Card Membersh... |
| US | blue-cash-preferred-card | signup_bonus_formatted | "AS HIGH AS $300 Cash Back1 after you spend $3,000 in purchases on your new Card within the first 6 months ... | "Earn $300 Cash Back after you spend $3,000 in purchases on your new Card within the first 6 months of Card... | issuer page captured 2026-11-13: ## Earn $300 Cash Back / after you spend $3,000 in purchases on your new Card within the first 6 months of Card Memb... |
| US | british-airways-visa-signature-credit-card | key_perks | ["Statement credits", "No foreign transaction fee", "Travel Together Ticket", "10% Off British Airways Flig... | ["Statement credits", "No foreign transaction fee", "Travel Together Ticket"] | issuer page captured 2026-11-13: #### Up to $600 Reward Flight Statement Credits ... #### Use your Travel Together Ticket (no '10%' anywhere in the c... |
| US | chase-freedom-flex-credit-card | foreign_transaction_fee | true | false | issuer page captured 2026-11-13: \"Now enjoy all this with no foreign transaction fee.\" (AT A GLANCE) and \"### NO FOREIGN TRANSACTION FEES / #### N... |
| US | chase-freedom-flex-credit-card | benefits.no_fx_fee | false | true | issuer page captured 2026-11-13: \"Now enjoy all this with no foreign transaction fee.\" (AT A GLANCE) and \"### NO FOREIGN TRANSACTION FEES / #### N... |
| US | chase-freedom-flex-credit-card | key_perks | ["Food delivery credits", "Statement credits"] | ["Food delivery credits", "Statement credits", "No foreign transaction fee"] | issuer page captured 2026-11-13: \"Now enjoy all this with no foreign transaction fee.\" (AT A GLANCE) and \"### NO FOREIGN TRANSACTION FEES / #### N... |
| US | chase-freedom-rise-credit-card | earn_rates | {"Dining, takeout & delivery (6 mo)": "3%", "All other purchases": "1.5%"} | {"All purchases": "1.5%"} | issuer page captured 2026-11-13: 1.5%cash back on all purchases / ### Earn 1.5% Cash Back / With Chase Freedom Rise, you can establish credit and ear... |
| US | delta-skymiles-gold-american-express-card | signup_bonus_formatted | "AS HIGH AS 80,000 Bonus Miles after you spend $3,000 in purchases on your new Card within the first 6 mont... | "AS HIGH AS 80,000 Bonus Miles after you spend $2,000 in purchases on your new Card within the first 6 mont... | issuer page captured 2026-11-13: ### **AS HIGH AS 80,000 Bonus Miles** / after you spend $2,000 in purchases on your new Card within the first 6 mont... |
| US | delta-skymiles-gold-american-express-card | welcome_bonus_conditions | "Spend $3,000 in purchases within the first 6 months of Card Membership" | "Spend $2,000 in purchases within the first 6 months of Card Membership" | issuer page captured 2026-11-13: after you spend $2,000 in purchases on your new Card within the first 6 months of Card Membership. |
| US | delta-skymiles-platinum-american-express-card | signup_bonus_formatted | "AS HIGH AS 90,000 Bonus Miles after you spend $4,000 in purchases on your new Card within the first 6 mont... | "AS HIGH AS 90,000 Bonus Miles after you spend $3,000 in purchases on your new Card within the first 6 mont... | issuer page captured 2026-11-13: ### **AS HIGH AS 90,000 Bonus Miles** / after you spend $3,000 in purchases on your new Card within the first 6 mont... |
| US | delta-skymiles-platinum-american-express-card | welcome_bonus_conditions | "Spend $4,000 in purchases within the first 6 months of Card Membership" | "Spend $3,000 in purchases within the first 6 months of Card Membership" | issuer page captured 2026-11-13: after you spend $3,000 in purchases on your new Card within the first 6 months of Card Membership. |
| US | delta-skymiles-platinum-business-card | signup_bonus_formatted | "100,000 SkyMiles bonus miles" | "AS HIGH AS 100,000 Bonus Miles after you spend $10,000 in purchases on your new Card within the first 6 mo... | issuer page captured 2026-11-13: ## AS HIGH AS 100,000 Bonus Miles / after you spend $10,000 in purchases on your new Card within the first 6 months ... |
| US | delta-skymiles-platinum-business-card | welcome_bonus | "100,000 SkyMiles bonus miles" | "AS HIGH AS 100,000 Bonus Miles after you spend $10,000 in purchases on your new Card within the first 6 mo... | issuer page captured 2026-11-13: ## AS HIGH AS 100,000 Bonus Miles |
| US | delta-skymiles-platinum-business-card | welcome_bonus_conditions | "Spend $8,000 in purchases within the first 6 months of Card Membership" | "Spend $10,000 in purchases within the first 6 months of Card Membership" | issuer page captured 2026-11-13: after you spend $10,000 in purchases on your new Card within the first 6 months of Card Membership. |
| US | delta-skymiles-reserve-american-express-card | signup_bonus | 50000 | 125000 | issuer page captured 2026-11-13: ### **AS HIGH AS 125,000 Bonus Miles** / after you spend $5,000 in purchases on your new Card within the first 6 mon... |
| US | delta-skymiles-reserve-american-express-card | signup_bonus_formatted | "50,000 Bonus Miles plus two round-trip Delta Comfort Flight Certificates after you spend $10,000 in purcha... | "AS HIGH AS 125,000 Bonus Miles after you spend $5,000 in purchases on your new Card within the first 6 mon... | issuer page captured 2026-11-13: ### **AS HIGH AS 125,000 Bonus Miles** / after you spend $5,000 in purchases on your new Card within the first 6 mon... |
| US | delta-skymiles-reserve-american-express-card | signup_bonus_value_usd | 50000 | 125000 | issuer page captured 2026-11-13: ### **AS HIGH AS 125,000 Bonus Miles** |
| US | delta-skymiles-reserve-american-express-card | welcome_bonus_conditions | "Spend $10,000 in purchases within the first 6 months of Card Membership" | "Spend $5,000 in purchases within the first 6 months of Card Membership" | issuer page captured 2026-11-13: after you spend $5,000 in purchases on your new Card within the first 6 months of Card Membership. |
| US | delta-skymiles-reserve-business-card | signup_bonus | 200000 | 125000 | issuer page captured 2026-11-13: ## AS HIGH AS 125,000 Bonus Miles / after you spend $15,000 in purchases on your new Card within the first 6 months ... |
| US | delta-skymiles-reserve-business-card | signup_bonus_formatted | "200,000 SkyMiles bonus miles" | "AS HIGH AS 125,000 Bonus Miles after you spend $15,000 in purchases on your new Card within the first 6 mo... | issuer page captured 2026-11-13: ## AS HIGH AS 125,000 Bonus Miles / after you spend $15,000 in purchases on your new Card within the first 6 months ... |
| US | delta-skymiles-reserve-business-card | welcome_bonus | "200,000 SkyMiles bonus miles" | "AS HIGH AS 125,000 Bonus Miles after you spend $15,000 in purchases on your new Card within the first 6 mo... | issuer page captured 2026-11-13: ## AS HIGH AS 125,000 Bonus Miles |
| US | delta-skymiles-reserve-business-card | welcome_bonus_conditions | "Spend $20,000 in purchases within the first 6 months of Card Membership" | "Spend $15,000 in purchases within the first 6 months of Card Membership" | issuer page captured 2026-11-13: after you spend $15,000 in purchases on your new Card within the first 6 months of Card Membership. |
| US | delta-skymiles-reserve-business-card | signup_bonus_value_usd | 200000 | 125000 | lead: Points card: field mirrors the points count (deck convention; site values from points ... |
| US | hilton-honors-american-express-aspire-card | signup_bonus_formatted | "200,000 Hilton Honors bonus points" | "200,000 Hilton Honors bonus points. Offer ends 1/13/2027." | issuer page captured 2026-11-13: ### Best Hilton Points Offer Yet: Earn 200,000 Hilton Honors Bonus Points / with the Hilton Honors American Express ... |
| US | hilton-honors-american-express-aspire-card | welcome_bonus | "200,000 Hilton Honors bonus points" | "200,000 Hilton Honors bonus points. Offer ends 1/13/2027." | issuer page captured 2026-11-13: after you spend $6,000 in purchases on the Card within your first 6 months of Card Membership. Offer ends 1/13/2027.† |
| US | hilton-honors-business-card | signup_bonus_formatted | "150,000 Hilton Honors bonus points + a Free Night Reward" | "150,000 Hilton Honors bonus points + a Free Night Reward. Offer ends 1/13/27." | issuer page captured 2026-11-13: ## Earn 150,000 Hilton Honors Bonus Points and a Free Night Reward / after you spend $8,000 on eligible purchases on... |
| US | hilton-honors-business-card | welcome_bonus | "150,000 Hilton Honors bonus points + a Free Night Reward" | "150,000 Hilton Honors bonus points + a Free Night Reward. Offer ends 1/13/27." | issuer page captured 2026-11-13: Offer ends 1/13/27.† |
| US | iberia-visa-signature-credit-card | key_perks | ["No foreign transaction fee", "$1,000 Airfare Discount Voucher", "10% discount on Iberia flights"] | ["No foreign transaction fee", "2,500 anniversary Avios"] | issuer page captured 2026-11-13: #### 2,500 Anniversary Avios  Get closer to your next adventure as you earn 2,500 anniversary bonus Avios each accou... |
| US | ihg-one-rewards-premier-business-credit-card | name | "IHG One Rewards Premier Business Credit Card" | "IHG One Rewards Business Credit Card" | issuer page captured 2026-11-13: # IHG One Rewards Business Credit Card / Rewards Program Agreement at [chase.com/ihgonerewardsbizcard/rewardsagreeme... |
| US | ihg-one-rewards-premier-business-credit-card | annual_fee | 99 | 200 | issuer page captured 2026-11-13: ## ANNUAL FEE / $200 |
| US | ihg-one-rewards-premier-business-credit-card | signup_bonus | 140000 | 190000 | issuer page captured 2026-11-13: ### Earn 190,000 Bonus Points / after spending $5,000 in the first 3 months from account opening. / New Cardmember B... |
| US | ihg-one-rewards-premier-business-credit-card | signup_bonus_formatted | "Earn 140,000 Bonus Points after spending $4,000 in the first 3 months from account opening." | "Earn 190,000 Bonus Points after spending $5,000 in the first 3 months from account opening." | issuer page captured 2026-11-13: ### Earn 190,000 Bonus Points / after spending $5,000 in the first 3 months from account opening. |
| US | ihg-one-rewards-premier-business-credit-card | welcome_bonus_conditions | null | "Spend $5,000 in the first 3 months. Earn 10,000 more bonus points after you add an employee card in the fi... | issuer page captured 2026-11-13: OFFER ENDS SOON / Plus, earn 10,000 bonus points after you add an employee card to your account in the first 3 month... |
| US | ihg-one-rewards-premier-business-credit-card | apply_url | "https://creditcards.chase.com/business-credit-cards/IHG/business-premier" | "https://creditcards.chase.com/business-credit-cards/IHG/business" | issuer page captured 2026-11-13: capture log: OK us:ihg-one-rewards-premier-business-credit-card REDIR https://creditcards.chase.com/business-credit-... |
| US | ihg-one-rewards-premier-business-credit-card | signup_bonus_value_usd | 140000 | 190000 | lead: Points card: field mirrors the points count (deck convention; site values from points ... |
| US | ihg-one-rewards-premier-credit-card | annual_fee | 99 | 150 | issuer page captured 2026-11-13: ## ANNUAL FEE  $150[†Opens pricing and terms in new window](.../LGC65294.html) |
| US | ihg-one-rewards-premier-credit-card | signup_bonus | 140000 | 180000 | issuer page captured 2026-11-13: ### Earn 180,000 Bonus Points after you spend $3,000 on purchases in the first 3 months from account opening. / **Ne... |
| US | ihg-one-rewards-premier-credit-card | signup_bonus_formatted | "Earn 140,000 Bonus Points after you spend $3,000 on purchases in the first 3 months from account opening." | "Earn 180,000 Bonus Points after you spend $3,000 on purchases in the first 3 months from account opening. ... | issuer page captured 2026-11-13: #### Earn 180,000 Bonus Points after you spend $3,000 on purchases in the first 3 months from account opening. Plus,... |
| US | ihg-one-rewards-premier-credit-card | welcome_bonus | "Earn 140,000 Bonus Points after you spend $3,000 on purchases in the first 3 months from account opening." | "Earn 180,000 Bonus Points after you spend $3,000 on purchases in the first 3 months from account opening. ... | issuer page captured 2026-11-13: #### Earn 180,000 Bonus Points ... |
| US | ihg-one-rewards-premier-credit-card | signup_bonus_value_usd | 140000 | 180000 | issuer page captured 2026-11-13: Earn 180,000 Bonus Points |
| US | ihg-one-rewards-premier-credit-card | earn_rates | {"IHG Hotels and Resorts": "10x", "Travel, dining, gas stations": "5x", "All other purchases": "3x"} | {"IHG Hotels and Resorts": "10x", "Dining, grocery stores, gas stations": "5x", "Direct airfare and car ren... | issuer page captured 2026-11-13: **5 points (\"5X points\"):** ... grocery stores; gas stations; dining at restaurants ... **5 points (\"5X points\")... |
| US | ihg-one-rewards-traveler-credit-card | name | "IHG One Rewards Traveler Credit Card" | "IHG One Rewards Credit Card" | issuer page captured 2026-11-13: # IHG One Rewards Credit Card / ANNUAL FEE $0 / That's **5X** points with this card. / Automatic Silver Elite Status... |
| US | ihg-one-rewards-traveler-credit-card | apply_url | "https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/traveler" | "https://creditcards.chase.com/travel-credit-cards/ihg-rewards-club/one-rewards" | issuer page captured 2026-11-13: cap log: OK us:ihg-one-rewards-traveler-credit-card: 71076 REDIR https://creditcards.chase.com/travel-credit-cards/i... |
| US | ihg-one-rewards-traveler-credit-card | signup_bonus | 80000 | 125000 | issuer page captured 2026-11-13: ### Earn 125,000 Bonus Points after you spend $2,000 on purchases in the first 3 months from account opening. / **Ne... |
| US | ihg-one-rewards-traveler-credit-card | signup_bonus_formatted | "Earn 80,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening. P... | "Earn 125,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening. ... | issuer page captured 2026-11-13: #### Earn 125,000 Bonus Points after you spend $2,000 on purchases in the first 3 months from account opening. Plus,... |
| US | ihg-one-rewards-traveler-credit-card | welcome_bonus | "Earn 80,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening. P... | "Earn 125,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening. ... | issuer page captured 2026-11-13: #### Earn 125,000 Bonus Points ... |
| US | ihg-one-rewards-traveler-credit-card | signup_bonus_value_usd | 80000 | 125000 | issuer page captured 2026-11-13: Earn 125,000 Bonus Points |
| US | ihg-one-rewards-traveler-credit-card | earn_rates | {"IHG Hotels and Resorts": "5x", "Dining, utilities, streaming, gas": "3x", "All other purchases": "2x"} | {"IHG Hotels and Resorts": "5x", "Dining, grocery stores, gas stations": "3x", "Utilities, streaming (thru ... | issuer page captured 2026-11-13: **3 points (\"3X points\"):** ... grocery stores; gas stations; dining at restaurants ... **3 points (\"3X points\")... |
| US | ihg-one-rewards-traveler-credit-card | welcome_bonus_conditions | null | "Spend $2,000 on purchases in the first 3 months from account opening. Extra 10,000 points for adding an au... | issuer page captured 2026-11-13: after you spend $2,000 on purchases in the first 3 months from account opening. Plus, earn 10,000 bonus points after... |
| US | ink-business-cash-credit-card | signup_bonus | 1000 | 750 | issuer page captured 2026-11-13: ### Earn $750 cash back / after you spend $6,000 on purchases in the first 3 months after account opening. / New Car... |
| US | ink-business-cash-credit-card | signup_bonus_formatted | "Earn $1,000 bonus cash back after you spend $8,000 on purchases in the first 4 months after account opening." | "Earn $750 cash back after you spend $6,000 on purchases in the first 3 months after account opening." | issuer page captured 2026-11-13: Earn $750 cash back / after you spend $6,000 on purchases in the first 3 months after account opening. |
| US | ink-business-cash-credit-card | signup_bonus_value_usd | 1000 | 750 | issuer page captured 2026-11-13: New Cardmember Bonus – $750 Cash Back |
| US | ink-business-cash-credit-card | welcome_bonus | "Earn $1,000 bonus cash back after you spend $8,000 on purchases in the first 4 months after account opening." | "Earn $750 cash back after you spend $6,000 on purchases in the first 3 months after account opening." | issuer page captured 2026-11-13: Earn $750 cash back / after you spend $6,000 on purchases in the first 3 months after account opening. |
| US | ink-business-unlimited-credit-card | signup_bonus | 1000 | 750 | issuer page captured 2026-11-13: NEW CARDMEMBER OFFEREarn $750 cash backafter you spend $6,000 on purchases in the first 3 months after account openi... |
| US | ink-business-unlimited-credit-card | signup_bonus_formatted | "Earn $1,000 cash back after you spend $8,000 on purchases in the first 4 months after account opening." | "Earn $750 cash back after you spend $6,000 on purchases in the first 3 months after account opening." | issuer page captured 2026-11-13: Earn $750 cash back / after you spend $6,000 on purchases in the first 3 months after account opening. |
| US | ink-business-unlimited-credit-card | signup_bonus_value_usd | 1000 | 750 | issuer page captured 2026-11-13: New Cardmember Bonus – $750 Cash Back |
| US | ink-business-unlimited-credit-card | welcome_bonus | "Earn $1,000 cash back after you spend $8,000 on purchases in the first 4 months after account opening." | "Earn $750 cash back after you spend $6,000 on purchases in the first 3 months after account opening." | issuer page captured 2026-11-13: Earn $750 cash back / after you spend $6,000 on purchases in the first 3 months after account opening. |
| US | instacart-mastercard | earn_rates | {"Instacart purchases": "5%", "Chase Travel purchases": "5%", "Restaurants, gas, streaming": "2%", "All oth... | {"Instacart (first $6,000/yr)": "5%", "Chase Travel purchases": "5%", "Restaurants, gas, streaming": "2%", ... | issuer page captured 2026-11-13: Earn 5% cash back on qualifying Instacart purchases on your first $6,000 spent annually, 5% cash back on Chase Trave... |
| US | marriott-bonvoy-bevy-american-express-card | signup_bonus | 125000 | 85000 | issuer page captured 2026-11-13: ### Earn 85,000 Marriott Bonvoy® Bonus Points / after you use your new Card to make $5,000 in purchases within the f... |
| US | marriott-bonvoy-bevy-american-express-card | signup_bonus_formatted | "125,000 Marriott Bonvoy bonus points plus a $150 statement credit" | "85,000 Marriott Bonvoy bonus points" | issuer page captured 2026-11-13: ### Earn 85,000 Marriott Bonvoy® Bonus Points |
| US | marriott-bonvoy-bevy-american-express-card | signup_bonus_value_usd | 125000 | 85000 | issuer page captured 2026-11-13: ### Earn 85,000 Marriott Bonvoy® Bonus Points |
| US | marriott-bonvoy-bevy-american-express-card | welcome_bonus | "125,000 Marriott Bonvoy bonus points plus a $150 statement credit after you spend $5,000 in purchases in t... | "85,000 Marriott Bonvoy bonus points after you spend $5,000 in purchases in the first 6 months." | issuer page captured 2026-11-13: ### Earn 85,000 Marriott Bonvoy® Bonus Points / after you use your new Card to make $5,000 in purchases within the f... |
| US | marriott-bonvoy-boundless-credit-card | signup_bonus_formatted | "Earn 3 Free Night Awards (each good for stays up to 50,000 points/night, combined value up to 150,000 poin... | "Earn 3 Free Night Awards (each valued up to 50,000 points, up to 150,000 points in total) after you spend ... | issuer page captured 2026-11-13: Earn **3 Free Night Awards** after spending $3,000 on eligible purchases within 3 months of account opening with **t... |
| US | marriott-bonvoy-boundless-credit-card | welcome_bonus | "Earn 3 Free Night Awards (each good for stays up to 50,000 points/night, combined value up to 150,000 poin... | "Earn 3 Free Night Awards (each valued up to 50,000 points, up to 150,000 points in total) after you spend ... | issuer page captured 2026-11-13: Earn 3 Free Night Awards after spending $3,000 on eligible purchases within 3 months of account opening with **the M... |
| US | marriott-bonvoy-boundless-credit-card | welcome_bonus_conditions | null | "Spend $3,000 on eligible purchases within 3 months of account opening. Each Free Night Award covers one ni... | issuer page captured 2026-11-13: To qualify and receive 3 Free Night Awards you must make purchases totaling $3,000 or more during the first 3 months... |
| US | marriott-bonvoy-brilliant-american-express-card | signup_bonus | 150000 | 100000 | issuer page captured 2026-11-13: ### Earn 100,000 Marriott Bonvoy® Bonus Points / after you use your new Card to make $6,000 in purchases within the ... |
| US | marriott-bonvoy-brilliant-american-express-card | signup_bonus_formatted | "150,000 Marriott Bonvoy bonus points plus a $250 statement credit" | "100,000 Marriott Bonvoy bonus points" | issuer page captured 2026-11-13: ### Earn 100,000 Marriott Bonvoy® Bonus Points |
| US | marriott-bonvoy-brilliant-american-express-card | signup_bonus_value_usd | 150000 | 100000 | issuer page captured 2026-11-13: ### Earn 100,000 Marriott Bonvoy® Bonus Points |
| US | marriott-bonvoy-brilliant-american-express-card | welcome_bonus | "150,000 Marriott Bonvoy bonus points plus a $250 statement credit after you spend $6,000 in purchases in t... | "100,000 Marriott Bonvoy bonus points after you spend $6,000 in purchases in the first 6 months." | issuer page captured 2026-11-13: ### Earn 100,000 Marriott Bonvoy® Bonus Points / after you use your new Card to make $6,000 in purchases within the ... |
| US | marriott-bonvoy-business-card | signup_bonus | 100000 | 75000 | issuer page captured 2026-11-13: ## Earn 75,000 Marriott Bonvoy® Bonus Points / after you use your new Card to make $6,000 in purchases within the fi... |
| US | marriott-bonvoy-business-card | signup_bonus_formatted | "100,000 Marriott Bonvoy bonus points + 1 Free Night Award" | "75,000 Marriott Bonvoy bonus points" | issuer page captured 2026-11-13: ## Earn 75,000 Marriott Bonvoy® Bonus Points |
| US | marriott-bonvoy-business-card | welcome_bonus | "100,000 Marriott Bonvoy bonus points + 1 Free Night Award" | "75,000 Marriott Bonvoy bonus points" | issuer page captured 2026-11-13: ## Earn 75,000 Marriott Bonvoy® Bonus Points |
| US | marriott-bonvoy-business-card | welcome_bonus_conditions | "Spend $8,000 in purchases within the first 6 months of Card Membership" | "Spend $6,000 in purchases within the first 6 months of Card Membership" | issuer page captured 2026-11-13: after you use your new Card to make $6,000 in purchases within the first 6 months.† |
| US | marriott-bonvoy-business-card | signup_bonus_value_usd | 100000 | 75000 | lead: Points card: field mirrors the points count (deck convention; site values from points ... |
| US | prime-visa | signup_bonus | 150 | 200 | issuer page captured 2026-11-13: #### $150Strike through $200 Amazon Gift Card on approval  Prime members, get a $200 Amazon Gift Card instantly load... |
| US | prime-visa | signup_bonus_formatted | "$150 Amazon Gift Card" | "$200 Amazon Gift Card" | issuer page captured 2026-11-13: Prime members, get a $200 Amazon Gift Card instantly loaded ... on approval |
| US | prime-visa | signup_bonus_value_usd | 150 | 200 | issuer page captured 2026-11-13: get a $200 Amazon Gift Card |
| US | prime-visa | welcome_bonus | "$150 Amazon Gift Card" | "$200 Amazon Gift Card" | issuer page captured 2026-11-13: get a $200 Amazon Gift Card |
| US | southwest-rapid-rewards-performance-business-credit-card | benefits.flight_delay | true | false | issuer page captured 2026-11-13: ## Travel & purchase coverage / ### Lost Luggage Reimbursement / ### Baggage Delay Insurance / ### Extended Warranty... |
| US | southwest-rapid-rewards-plus-credit-card | signup_bonus | 50000 | 80000 | issuer page captured 2026-11-13: ### Earn 80,000 bonus points / after you spend $1,000 on purchases in the first 3 months from account opening. / **N... |
| US | southwest-rapid-rewards-plus-credit-card | signup_bonus_formatted | "Earn 50,000 bonus points after you spend $1,000 on purchases in the first 3 months from account opening." | "Earn 80,000 bonus points after you spend $1,000 on purchases in the first 3 months from account opening." | issuer page captured 2026-11-13: **Earn 80,000 bonus points** after you spend $1,000 on purchases in the first 3 months from account opening. |
| US | southwest-rapid-rewards-plus-credit-card | welcome_bonus | "Earn 50,000 bonus points after you spend $1,000 on purchases in the first 3 months from account opening." | "Earn 80,000 bonus points after you spend $1,000 on purchases in the first 3 months from account opening." | issuer page captured 2026-11-13: **Earn 80,000 bonus points** after you spend $1,000 on purchases in the first 3 months from account opening. |
| US | southwest-rapid-rewards-plus-credit-card | welcome_bonus_conditions | null | "Spend $1,000 on purchases in the first 3 months from account opening" | issuer page captured 2026-11-13: To qualify, you must make $1,000 in purchases during the first 3 months from account opening. |
| US | southwest-rapid-rewards-plus-credit-card | benefits.flight_delay | true | false | issuer page captured 2026-11-13: ### Travel & purchase coverage ... #### Lost Luggage Reimbursement ... #### Baggage Delay Insurance ... #### Extende... |
| US | southwest-rapid-rewards-plus-credit-card | signup_bonus_value_usd | 50000 | 80000 | lead: Points card: field mirrors the points count (deck convention; site values from points ... |
| US | southwest-rapid-rewards-premier-business-credit-card | benefits.flight_delay | true | false | issuer page captured 2026-11-13: ## Travel & purchase coverage / ### Lost Luggage Reimbursement / ### Baggage Delay Insurance / ### Extended Warranty... |
| US | southwest-rapid-rewards-premier-business-credit-card | earn_rates | {"Southwest Airlines purchases": "3x", "Gas stations": "2x", "Restaurants": "2x", "All other purchases": "1x"} | {"Southwest Airlines purchases": "3x", "Gas and restaurants (first $8,000/yr)": "2x", "All other purchases"... | issuer page captured 2026-11-13: **Earn 2 points for every $1** you spend at gas stations and restaurants on the first $8,000 in combined purchases p... |
| US | southwest-rapid-rewards-premier-credit-card | signup_bonus | 55000 | 85000 | issuer page captured 2026-11-13: ### Earn 85,000 bonus points / after you spend $2,000 on purchases in the first 3 months from account opening. / **E... |
| US | southwest-rapid-rewards-premier-credit-card | signup_bonus_formatted | "Earn 55,000 bonus points after you spend $1,500 on purchases in the first 3 months from account opening." | "Earn 85,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening." | issuer page captured 2026-11-13: **Earn 85,000 bonus points** after you spend $2,000 on purchases in the first 3 months from account opening. |
| US | southwest-rapid-rewards-premier-credit-card | welcome_bonus | "Earn 55,000 bonus points after you spend $1,500 on purchases in the first 3 months from account opening." | "Earn 85,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening." | issuer page captured 2026-11-13: **Earn 85,000 bonus points** after you spend $2,000 on purchases in the first 3 months from account opening. |
| US | southwest-rapid-rewards-premier-credit-card | welcome_bonus_conditions | null | "Spend $2,000 on purchases in the first 3 months from account opening" | issuer page captured 2026-11-13: after you spend $2,000 on purchases in the first 3 months from account opening. |
| US | southwest-rapid-rewards-premier-credit-card | benefits.flight_delay | true | false | issuer page captured 2026-11-13: ### Travel & purchase coverage ... #### Lost Luggage Reimbursement ... #### Baggage Delay Insurance ... #### Extende... |
| US | southwest-rapid-rewards-premier-credit-card | signup_bonus_value_usd | 55000 | 85000 | lead: Points card: field mirrors the points count (deck convention; site values from points ... |
| US | southwest-rapid-rewards-priority-credit-card | signup_bonus | 60000 | 90000 | issuer page captured 2026-11-13: ### Earn 90,000 bonus points / after you spend $3,000 on purchases in the first 3 months from account opening. / **N... |
| US | southwest-rapid-rewards-priority-credit-card | signup_bonus_formatted | "Earn 60,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening." | "Earn 90,000 bonus points after you spend $3,000 on purchases in the first 3 months from account opening." | issuer page captured 2026-11-13: **Earn 90,000 bonus points** after you spend $3,000 on purchases in the first 3 months from account opening. |
| US | southwest-rapid-rewards-priority-credit-card | welcome_bonus | "Earn 60,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening." | "Earn 90,000 bonus points after you spend $3,000 on purchases in the first 3 months from account opening." | issuer page captured 2026-11-13: **Earn 90,000 bonus points** after you spend $3,000 on purchases in the first 3 months from account opening. |
| US | southwest-rapid-rewards-priority-credit-card | welcome_bonus_conditions | null | "Spend $3,000 on purchases in the first 3 months from account opening" | issuer page captured 2026-11-13: To qualify, you must make $3,000 in purchases during the first 3 months from account opening. |
| US | southwest-rapid-rewards-priority-credit-card | benefits.flight_delay | true | false | issuer page captured 2026-11-13: ### Travel & purchase coverage ... #### Lost Luggage Reimbursement ... #### Baggage Delay Insurance ... #### Extende... |
| US | southwest-rapid-rewards-priority-credit-card | signup_bonus_value_usd | 60000 | 90000 | lead: Points card: field mirrors the points count (deck convention; site values from points ... |
| US | the-new-chase-sapphire-reserve-credit-card | name | "The New Chase Sapphire Reserve® Credit Card" | "Chase Sapphire Reserve® Credit Card" | issuer page captured 2026-11-13: # Chase Sapphire Reserve® Credit Card |
| US | united-clubsm-business-card | signup_bonus_formatted | "Earn 100,000 bonus miles + 2,000 Premier qualifying points (PQP) after you spend $5,000 on purchases in th... | "Earn up to 100,000 bonus miles + 2,000 Premier qualifying points (PQP) after qualifying activities." | issuer page captured 2026-11-13: NEW CARDMEMBER OFFEREarn up to 100,000 bonus miles + 2,000 Premier qualifying points (PQP)after qualifying activitie... |
| US | united-clubsm-business-card | welcome_bonus_conditions | null | "Earn 90,000 bonus miles + 2,000 PQP after you spend $5,000 on purchases in the first 3 months. Earn 10,000... | issuer page captured 2026-11-13: New Cardmember Bonus – 90,000 Miles:To qualify, you must make $5,000 in purchases during the first 3 months from acc... |
| US | united-clubsm-business-card | welcome_bonus | "Earn 100,000 bonus miles + 2,000 Premier qualifying points (PQP) after you spend $5,000 on purchases in th... | "Earn up to 100,000 bonus miles + 2,000 PQP: 90,000 miles + 2,000 PQP after you spend $5,000 on purchases i... | issuer page captured 2026-11-13: Earn 90,000 bonus miles + 2,000 PQP after you spend $5,000 ... Plus, earn 10,000 bonus miles after you add an employ... |
| US | united-clubsm-card | signup_bonus | 80000 | 100000 | issuer page captured 2026-11-13: ### Earn up to 100,000 bonus miles / **Earn 90,000 bonus miles** after you spend $5,000 on purchases in the first 3 ... |
| US | united-clubsm-card | signup_bonus_formatted | "Earn 80,000 bonus miles after you spend $5,000 on purchases in the first 3 months your account is open." | "Earn up to 100,000 bonus miles: 90,000 bonus miles after you spend $5,000 on purchases in the first 3 mont... | issuer page captured 2026-11-13: **Earn 90,000 bonus miles** after you spend $5,000 on purchases in the first 3 months your account is open. **Plus, ... |
| US | united-clubsm-card | welcome_bonus_conditions | "Spend $5,000 on purchases in the first 3 months from account opening" | "Spend $5,000 on purchases in the first 3 months your account is open for 90,000 miles. Add an authorized u... | issuer page captured 2026-11-13: **New Cardmember Bonus – 90,000 Miles:** To qualify, you must make $5,000 in purchases during the first 3 months fro... |
| US | united-clubsm-card | signup_bonus_value_usd | 80000 | 100000 | lead: Points card: field mirrors the points count (deck convention; site values from points ... |
| US | united-gatewaysm-card | signup_bonus | 30000 | 50000 | issuer page captured 2026-11-13: ### Earn up to ~~40,000~~ 50,000 bonus miles / **Earn 40,000 bonus miles** after you spend $1,000 on purchases in th... |
| US | united-gatewaysm-card | signup_bonus_formatted | "Earn 30,000 bonus miles after qualifying purchases." | "Earn up to 50,000 bonus miles: 40,000 bonus miles after you spend $1,000 on purchases in the first 3 month... | issuer page captured 2026-11-13: **Earn 40,000 bonus miles** after you spend $1,000 on purchases in the first 3 months your account is open. **Plus, ... |
| US | united-gatewaysm-card | welcome_bonus | "Earn 30,000 bonus miles after qualifying purchases." | "Earn up to 50,000 bonus miles: 40,000 bonus miles after you spend $1,000 on purchases in the first 3 month... | issuer page captured 2026-11-13: Same as signup_bonus_formatted. |
| US | united-gatewaysm-card | welcome_bonus_conditions | "Spend $1,000 on purchases in the first 3 months your account is open" | "Spend $1,000 on purchases in the first 3 months your account is open for 40,000 miles. Add an authorized u... | issuer page captured 2026-11-13: **New Cardmember Bonus – 40,000 Miles:**To qualify, you must make $1,000 in purchases during the first 3 months from... |
| US | united-gatewaysm-card | signup_bonus_value_usd | 30000 | 50000 | lead: Points card: field mirrors the points count (deck convention; site values from points ... |
| US | united-questsm-card | signup_bonus | 60000 | 90000 | issuer page captured 2026-11-13: ### Earn up to 90,000 bonus miles + 500 Premier qualifying points (PQP) / **Earn 500 PQP after first purchase and 80... |
| US | united-questsm-card | signup_bonus_formatted | "Earn 60,000 bonus miles + 500 Premier qualifying points (PQP) after you spend $4,000 on purchases in the f... | "Earn up to 90,000 bonus miles + 500 Premier qualifying points (PQP): 80,000 bonus miles after you spend $4... | issuer page captured 2026-11-13: **Earn up to 90,000 bonus miles** after qualifying activities **+ 500 Premier qualifying points (PQP) after your fir... |
| US | united-questsm-card | welcome_bonus | "Earn 60,000 bonus miles + 500 Premier qualifying points (PQP) after you spend $4,000 on purchases in the f... | "Earn up to 90,000 bonus miles + 500 Premier qualifying points (PQP): 80,000 bonus miles after you spend $4... | issuer page captured 2026-11-13: Same as signup_bonus_formatted. |
| US | united-questsm-card | welcome_bonus_conditions | "Spend $4,000 on purchases in the first 3 months your account is open" | "Spend $4,000 on purchases in the first 3 months your account is open for 80,000 miles. Add an authorized u... | issuer page captured 2026-11-13: **New Cardmember Bonus - 80,000 Miles:** To qualify, you must make $4,000 in purchases during the first 3 months fro... |
| US | united-questsm-card | signup_bonus_value_usd | 60000 | 90000 | lead: Points card: field mirrors the points count (deck convention; site values from points ... |
| US | unitedsm-business-card | signup_bonus_formatted | "Earn 100,000 bonus miles + 2,000 Premier qualifying points (PQP) after you spend $5,000 on purchases in th... | "Earn up to 100,000 bonus miles + 2,000 Premier qualifying points (PQP) after qualifying activities." | issuer page captured 2026-11-13: NEW CARDMEMBER OFFEREarn up to 100,000 bonus miles + 2,000 Premier qualifying points (PQP)after qualifying activitie... |
| US | unitedsm-business-card | welcome_bonus_conditions | null | "Earn 90,000 bonus miles + 2,000 PQP after you spend $5,000 on purchases in the first 3 months. Earn 10,000... | issuer page captured 2026-11-13: New Cardmember Bonus – 90,000 Miles: To qualify, you must make $5,000 in purchases during the first 3 months from ac... |
| US | unitedsm-business-card | welcome_bonus | "Earn 100,000 bonus miles + 2,000 Premier qualifying points (PQP) after you spend $5,000 on purchases in th... | "Earn up to 100,000 bonus miles + 2,000 PQP: 90,000 miles + 2,000 PQP after you spend $5,000 on purchases i... | issuer page captured 2026-11-13: Earn 90,000 bonus miles + 2,000 PQP after you spend $5,000 ... Plus, earn 10,000 bonus miles after you add an employ... |
| US | unitedsm-explorer-card | signup_bonus | 50000 | 80000 | issuer page captured 2026-11-13: ### Earn up to 60,000Strike through 80,000 bonus miles / **Earn 70,000 bonus miles** after you spend $3,000 on purch... |
| US | unitedsm-explorer-card | signup_bonus_formatted | "Earn 50,000 bonus miles after you spend $3,000 on purchases in the first 3 months your account is open." | "Earn up to 80,000 bonus miles: 70,000 bonus miles after you spend $3,000 on purchases in the first 3 month... | issuer page captured 2026-11-13: **Earn 70,000 bonus miles** after you spend $3,000 on purchases in the first 3 months your account is open. **Plus, ... |
| US | unitedsm-explorer-card | welcome_bonus | "Earn 50,000 bonus miles after you spend $3,000 on purchases in the first 3 months your account is open." | "Earn up to 80,000 bonus miles: 70,000 bonus miles after you spend $3,000 on purchases in the first 3 month... | issuer page captured 2026-11-13: Same as signup_bonus_formatted. |
| US | unitedsm-explorer-card | welcome_bonus_conditions | "Spend $3,000 in purchases within the first 3 months of account opening" | "Spend $3,000 on purchases in the first 3 months your account is open for 70,000 miles. Add an authorized u... | issuer page captured 2026-11-13: **New Cardmember Bonus – 70,000 Miles:**To qualify, you must make $3,000 in purchases during the first 3 months from... |
| US | unitedsm-explorer-card | signup_bonus_value_usd | 50000 | 80000 | lead: Points card: field mirrors the points count (deck convention; site values from points ... |
| US | world-of-hyatt-business-credit-card | benefits.car_rental_insurance | false | true | issuer page captured 2026-11-13: ### Auto Rental Coverage / Coverage is primary when renting for business purposes and provides reimbursement up to $... |
| US | world-of-hyatt-business-credit-card | benefits.trip_cancellation | false | true | issuer page captured 2026-11-13: ### Trip Cancellation and Interruption Insurance / You can be reimbursed up to $1,500 per covered traveler and $6,00... |
| US | world-of-hyatt-business-credit-card | benefits.purchase_protection | false | true | issuer page captured 2026-11-13: ### Purchase Protection / Covers your eligible new purchases for 120 days from the date of purchase against damage o... |
| US | world-of-hyatt-business-credit-card | benefits.extended_warranty | false | true | issuer page captured 2026-11-13: ### Extended Warranty Protection / Extends the time period of the manufacturer's U.S. warranty by an additional year |
| US | world-of-hyatt-credit-card | signup_bonus | 60000 | 0 | issuer page captured 2026-11-13: ### Earn 4 Free Nights  Earn 4 free nights at any Category 1-4 Hyatt hotel after spending $5,000 within the first 3 ... |
| US | world-of-hyatt-credit-card | signup_bonus_formatted | "Earn up to 60,000 Bonus Points: 30,000 Bonus Points after you spend $3,000 on purchases in your first 3 mo... | "Earn 4 free nights at any Category 1-4 Hyatt hotel after spending $5,000 within the first 3 months of acco... | issuer page captured 2026-11-13: Earn 4 free nights at any Category 1-4 Hyatt hotel after spending $5,000 within the first 3 months of account opening. |
| US | world-of-hyatt-credit-card | welcome_bonus | "Earn up to 60,000 Bonus Points: 30,000 Bonus Points after you spend $3,000 on purchases in your first 3 mo... | "Earn 4 free nights at any Category 1-4 Hyatt hotel after spending $5,000 within the first 3 months of acco... | issuer page captured 2026-11-13: Earn 4 free nights at any Category 1-4 Hyatt hotel after spending $5,000 within the first 3 months of account opening. |
| US | world-of-hyatt-credit-card | signup_bonus_value_usd | 60000 | 0 | issuer page captured 2026-11-13: Earn 4 Free Night Awards ... Each Free Night Award is valid for one (1) night ... Category 1 through 4 |
| US | world-of-hyatt-credit-card | welcome_bonus_conditions | null | "Spend $5,000 on purchases within the first 3 months of account opening. Each free night is valid 12 months... | issuer page captured 2026-11-13: Qualify to earn 4 Free Night Awards when you make $5000 in Purchases within 3 months of account opening. ... Each Fr... |
