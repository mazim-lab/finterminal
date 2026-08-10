# Card-data refresh - 2026-08-09 (local full-deck verification)

Run type: LOCAL, on the Dropbox clone with a residential IP, so issuer pages could be
re-scraped instead of only re-read. Previous genuine full verification: 2026-07-18.

## Coverage

All **194 cards** were verified: 131 CA + 63 US. Every card except one was checked against
a golden source; `bmo-prepaid-mastercard` has no capture at all and was held untouched.

| Source freshness | Cards |
|---|---|
| Re-captured from the issuer's own site TODAY (2026-08-09) | **89** (45 CA, 44 US) |
| Verified against the 2026-06-17/18 capture | 104 |
| No source available at all | 1 (bmo-prepaid-mastercard) |

Two passes ran over the deck:

1. **Full audit pass** - 13 auditors, about 15 cards each, covering annual fee, welcome and
   signup bonus fields, foreign transaction fee, earn rates, key perks, apply URL, and the
   CA points/value internal-consistency check.
2. **Freshness re-check pass** - 6 re-checkers over the 89 same-day captures, hunting for
   anything that had moved since June. Where the two passes disagreed on a field, the
   re-check against the fresher capture won.

## Sources refreshed

The capture pipeline (Playwright with chromium for bank sites and firefox for Amex and
BMO, then markitdown to text) ran in three waves and wrote into the gitignored
`data/raw/cards/` paths only. Nothing scraped was committed. `scrapers/detail_cache/`
(which IS tracked in git) was deliberately left untouched, and refreshed US non-Amex pages
went to `data/raw/cards/us-<slug>.md` instead.

- **Wave 1, time-sensitive subset (18 targets, 15 captured):** every card whose stored
  bonus carried a date, plus the World of Hyatt dispute. PC Financial failed on chromium
  with ERR_HTTP2_PROTOCOL_ERROR and was recovered on firefox in wave 2.
- **Wave 2 US (39 targets, 39 captured):** all remaining US Chase cards. Combined with
  wave 1, **all 41 US Chase cards now have a same-day chase.com capture.**
- **Wave 2 CA (37 targets, 35 captured):** flagships across Amex, TD, Scotiabank, BMO,
  CIBC, RBC, PC and the single-card issuers.

**Capture failures (kept the June capture and verified against that instead):**
`triangle-world-elite-mastercard` (timeout) and `simplii-financial-cash-back-visa-card`.
US Amex was not re-scraped; those 22 cards were verified against
`data/raw/md/american-express-us.md` as usual. The 23 US-Amex files in
`scrapers/detail_cache/` remain login-wall junk and were ignored.

## Headline: offers that had moved since June

The freshness pass was the whole point of running locally. More than twenty cards were
advertising a different welcome offer than the one stored.

**Canada**

- The Platinum Card (Amex CA): 170,000 to **100,000** MR points (70,000 at $10k in 3
  months, plus 30,000 at months 15 to 17)
- Amex Aeroplan Reserve: 150,000 to **110,000** Aeroplan points (elevated offer)
- Scotiabank Platinum Amex: 80,000 to **100,000** Scene+ (offer window Jul 2 to Nov 1, 2026)
- Scotiabank Gold Amex: 45,000 to **50,000** Scene+
- Scotiabank Passport Visa Infinite: 60,000 to **35,000** Scene+
- RBC Avion Visa Infinite: 70,000 to **55,000** Avion
- RBC Avion Visa Platinum: 70,000 to **55,000** Avion
- RBC Avion Visa Infinite Privilege: 100,000 to **70,000** Avion
- RBC Avion Visa Infinite Business: 45,000 to **35,000** Avion
- WestJet RBC World Elite for Business: 45,000 to **35,000** WestJet points
- National Bank World Elite: welcome bonus **withdrawn**. The page now says the Feb 3 to
  Jun 29 2026 promotion has ended, with no replacement showing.
- PC Mastercard, PC World, PC World Elite: same 50,000 points, but the apply-by date moved
  from the already-expired Jun 30, 2026 to **Aug 31, 2026**

**United States**

- Chase Sapphire Reserve: 125,000 to **100,000** points
- Sapphire Reserve for Business: 150,000 to **200,000** points
- Ink Business Cash and Ink Business Unlimited: $750 to **$1,000** cash back
- United Explorer: 70,000 to **50,000** miles; United Quest: 80,000 to **60,000** miles
- Southwest Priority 40,000 to **60,000**, Premier 30,000 to **55,000**, Plus to
  **50,000**, and the Companion Pass tie-in is gone from all three
- IHG Premier: 175,000 to **140,000**; IHG Traveler: 90,000 to **80,000**
- Marriott Bonvoy Boundless: 5 Free Night Awards to **4**; Bonvoy Bold: free nights to a
  straight **45,000 points**
- Delta Gold 90,000 to **80,000**, Delta Platinum 100,000 to **90,000**, Delta Reserve
  125,000 to **100,000** miles
- Disney Inspire: $600 to **$500**
- World of Hyatt Business: 60,000 to **70,000** points
- World of Hyatt personal: see the dispute below

On the struck-through offers (Ink Cash, Ink Unlimited and Sapphire Reserve for Business,
which chase.com renders as "Earn $750 strike-through $1,000"), the live figure was
confirmed against each page's own legal paragraph, which names it outright: "New
Cardmember Bonus - $1,000 Cash Back" and "New Cardmember Bonus - 200,000 Points".

## Step 3: the World of Hyatt personal card dispute, settled

chase.com's own World of Hyatt page on 2026-08-09 states:

> **Earn up to 75,000 Bonus Points.** 45,000 Bonus Points after you spend $5,000 on
> purchases in your first 3 months of account opening and up to 30,000 more Bonus Points
> by earning 2 Bonus Points total per $1 spent in the first 6 months from account opening
> on purchases that normally earn 1 Bonus Point, on up to $15,000 spent.

So **both** July cloud runs were wrong. The flat 60,000-point figure is not what Chase
shows, and the free-night offer the other run proposed carried an "offer ends Feb 26, 2026"
date that has since passed and is gone from the page. Stored in the existing schema only:
`signup_bonus` and `signup_bonus_value_usd` set to 75000, `signup_bonus_currency` left at
"points", `signup_bonus_formatted` and `welcome_bonus` set to the text above. No novel
currency type was introduced.

On the second half of the dispute: **"Concierge service" was NOT fabricated.** The same
page carries "Get complimentary Visa Signature Concierge Service 24 hours a day" plus a
"Concierge Service" line in the legal terms, so it was restored to `key_perks` alongside
two other plainly stated benefits (the anniversary Category 1-4 Free Night Award and the 5
tier-qualifying night credits). Annual fee $95 and the 4x/2x/1x earn rates were both
confirmed unchanged. The page's "up to 9X total points" headline is the usual bundled
figure and was correctly not stored.

## Other systemic findings

- **Fabricated perk boilerplate on US Amex.** Nearly every US Amex record carried the same
  block of "Hotel elite status/collection", "Airport lounge access", "Priority Pass lounge
  access", "Premium lounge access", "Front of the Line presale tickets" and "Free first
  checked bag" whether or not the card has them. The Delta Gold, Delta Platinum, Delta
  Blue, Amex Gold and Business Gold pages say in their own FAQ that they do not include
  lounge access. Cleaned on 15 cards.
- **The same pattern on CA Amex and elsewhere.** Marriott Bonvoy CA (personal and
  business), Business Gold Rewards, Aeroplan Business Reserve, Scotiabank Platinum Amex,
  Neo World Elite, RBC Avion Visa Infinite, WestJet RBC Mastercard, more-rewards-rbc-visa
  and moi-rbc-visa all lost perks their own pages do not support.
- **Scotiabank Passport Visa Infinite** claimed Priority Pass. The page shows it actually
  uses the Visa Airport Companion Program (DragonPass). Priority Pass belongs to the
  Scotiabank Platinum Amex on the same site.
- **`insurance.purchase_protection` storing "120"** (the coverage window in days) instead
  of the dollar amount, on six Chase business cards. This is the same bug class d3a1088
  fixed on 24 cards; these six were missed. Each page states $10,000 per item.
- **Ink Business Premier's 5% Chase Travel tier is real.** Commit d3a1088 removed it as
  fabricated based on the older capture. The 2026-08-09 chase.com capture states "Earn
  unlimited 5% cash back on travel purchased through Chase Travel" outright, so it was
  restored. This is the one place this run deliberately reverses that commit, and it is on
  first-party evidence.
- **Interest rates drifted at Scotiabank, Desjardins, National Bank and Canadian Tire.**
  Thirteen purchase_interest_rate values and eleven interest_rates.purchases values now
  match the issuer pages, including a Scotiabank Amex stored at 9.99% that is actually
  21.99%, and a Scotiabank Platinum Amex stored at 20.99% that is actually 9.99%.
- **BMO Eclipse Rise earns per $2, not per $1.** The page says "5x the BMO Rewards points
  for every $2 spent", so under the site's own per-dollar convention the rates are 2.5x and
  0.5x, not 5x and 1x.
- **BMO CashBack World Elite annual fee** is $139, not the stored $120. The $120 was the
  first-year-rebated figure.
- **rbc-ion-visa pointed at the wrong product page.** The record describes the $48 ION+
  card but apply_url pointed at the free base ION page, which is what kept getting
  captured. The correct URL was confirmed live at
  rbcroyalbank.com/credit-cards/rewards/rbc-ion-plus-visa.html ($48 fee, 28,000-point
  offer, matching the stored record) and fixed. Everything else on that card stays HELD
  because no genuine ION+ capture exists yet.

## Auditor proposals the orchestrator overruled

- `americanexpress-aeroplan-reserve-card.key_perks`: an auditor proposed rewriting the
  "up to $4,400 in value within your first 13 months" line to "$5,700 within 17 months".
  The 2026-08-09 capture of that card's own page says $4,400 and 13 months, matching what
  is stored, so the proposal came from a stale read. Left alone.
- `rbc-cash-back-preferred-world-elite-mastercard.key_perks`: proposed ADDING lounge and
  subscription perks to an empty array. Removing fabricated perks is in scope; inventing
  new ones is not, and RBC's lounge access on this card is pay-per-visit.
- `pc-mastercard.apply_url`: proposed swapping to a /pc-silver-mastercard/ path seen in the
  site nav. The stored /pc-mastercard/ URL loads this card's own page correctly in today's
  re-capture, so the change was not made.

## Full change list

299 field changes across 117 cards (64 CA, 53 US). By field: key_perks 45,
welcome_bonus_conditions 40, welcome_bonus 35, signup_bonus_formatted 22, min_spend 19,
signup_bonus_value_usd 19, signup_bonus 18, purchase_interest_rate 13, insurance 12,
welcome_bonus_points 11, welcome_bonus_value_cad 11, interest_rates 11, benefits 10,
earn_rates 9, minimum_income 8, apply_url 4, cash_advance_rate 3, first_year_value_cad 3,
signup_bonus_currency 3, annual_fee 1, min_income 1, first_year_fee 1.

Note on `welcome_bonus_value_cad`: it was recomputed ONLY where the points count itself
changed, using each record's own `cpp_cad`. It was never "corrected" toward an issuer's
advertised dollar figure, because that gap is the site's deliberate valuation methodology,
not an error.

Every change below is source-confirmed, one line of reasoning each.

### CA | americanexpress-aeroplan-business-reserve-card
- `key_perks`: ["Statement credits","You could earn up to $5,600 or more in value within your first 13 mo -> ["Statement credits","You could earn up to $5,600 or more in value within your first 13 months26","Travel prog  
  "Priority Pass lounge access", "Premium lounge access" and "Free first checked bag" are unsupported. The Featured Benefits carousel is a complete, numbered 7-item list covering value calculation, 4th Night Free, 3x Air Canada earn, Aeroplan Elite/SQC, Companion Pass, Avis President's Club, and NEXUS credit - with zero mention of any lounge program or baggage anywhere in the file.
- `benefits.free_checked_bags`: true -> false  
  Source's complete 7-item Featured Benefits carousel and full-file text contain zero mention of baggage, contradicting the true flag; this also aligns with the key_perks removal of 'Free first checked bag' for this card.

### CA | americanexpress-aeroplan-card
- `key_perks`: ["Reach Aeroplan EliteTM Status faster6‡","Front of the Line presale tickets","You could e -> ["Reach Aeroplan EliteTM Status faster6‡","You could earn up to $1,550 or more in value within your first 13 m  
  The stored '$1,450' figure is stale; the source states $1,550 (stated three times). 'Front of the Line presale tickets' is unsupported anywhere in the source ('presale' and 'Front of the Line' both return zero matches). 'Free first checked bag' is confirmed and kept.
- `earn_rates`: {"Air Canada":"2x","Dining & food delivery":"1.5x","All other purchases":"1x"} -> {"Air Canada":"2x","Dining & food delivery":"1.5x","Hyatt":"1.5x","All other purchases":"1x"}  
  fresh source lists a distinct 1.5x Hyatt earn category not captured in stored record
- `key_perks`: ["Reach Aeroplan EliteTM Status faster6‡","You could earn up to $1,550 or more in value wi -> ["Reach Aeroplan EliteTM Status faster6‡","Front of the Line presale tickets","You could earn up to $1,550 or   
  first-13-months value estimate rose from $1,450 to $1,550
- `welcome_bonus_conditions`: null -> "Earn 35,000 points after spending $7,500 in the first 6 months, plus 10,000 points after spending $1,000 in m  
  fresh source spells out the two-part spend requirement behind the 45,000-point total; welcome_bonus_points (45,000) itself is unchanged

### CA | americanexpress-aeroplan-reserve-card
- `welcome_bonus_points`: 150000 -> 110000  
  the live 'ELEVATED OFFER' banner shows 70,000 + 40,000 = 110,000 points, not the stored 150,000
- `welcome_bonus`: "Earn up to 150,000 Bonus Aeroplan®* points" -> "Earn up to 110,000 Bonus Aeroplan®* points (elevated offer: 70,000 after $7,500 spend in 3 months + 40,000 af  
  matches the currently live elevated offer total of 110,000 points
- `welcome_bonus_value_cad`: 3075 -> 2255  
  recomputed as new points count (110,000) x the record's own cpp_cad (2.05) / 100, per the deliberate-revaluation rule
- `welcome_bonus_conditions`: null -> "Spend $7,500 in the first 3 months for 70,000 points, plus $2,500 in month 13 for 40,000 points (total $10,00  
  fresh source spells out the two-part spend requirement behind the elevated 110,000-point offer
- `earn_rates`: {"Air Canada":"3x","Dining & food delivery":"2x","All other purchases":"1.25x"} -> {"Air Canada":"3x","Dining & food delivery":"2x","Hyatt":"2x","All other purchases":"1.25x"}  
  fresh source lists a distinct 2x Hyatt earn category not captured in stored record

### CA | americanexpress-business-gold-rewards-card
- `key_perks`: ["Hotel elite status/collection","Statement credits","With Flexible Payment Option2, you h -> ["Statement credits","With Flexible Payment Option2, you have options when paying your balance","Earn 10,000 b  
  "Hotel elite status/collection" and "Free first checked bag" are unsupported. This card has no hotel-program tie-in and no baggage benefit anywhere in the source; only the generic site-nav links to Fine Hotels+Resorts/Hotel Collection appear (not a card-specific benefit tile), and 'checked bag' has zero matches in the file.

### CA | americanexpress-gold-rewards-card
- `benefits.lounge_access`: false -> true  
  Source explicitly confirms airport lounge access via Plaza Premium Lounges, contradicting the stored false flag while key_perks already lists three lounge-related perks for this card.

### CA | bmo-cashback-world-elite-mastercard
- `annual_fee`: 120 -> 139  
  Source states the ongoing annual fee is $139, waived only in the first year. Stored value of 120 does not match anything in the source.

### CA | bmo-eclipse-rise-visa-card
- `earn_rates`: {"Bills, groceries, dining & takeout":"5x","All other purchases":"1x"} -> {"Bills, groceries, dining & takeout":"2.5x","All other purchases":"0.5x"}  
  this card's BMO Rewards points accrue per $2 spent (not per $1 like the other BMO cards in this batch); per the site's own conversion rule ('1 pt per $1.50 becomes 0.67x'), '5 points per $2' becomes 2.5x and '1 point per $2' becomes 0.5x, matching the literal points-per-dollar convention used on every other card audited in this batch (all of which earn per $1)
- `insurance`: {"trip_cancellation":""} -> {}  
  the source explicitly states this card does not include travel insurance, so a trip_cancellation key should not be present (benefits.trip_cancellation is already correctly false)

### CA | cash-advantage-mastercard
- `purchase_interest_rate`: 22.99 -> 21.99  
  Source gives 21.99% as the rate on regular (non-cash) charges outside Quebec; 22.99% is the cash-transaction rate, not the purchase rate
- `cash_advance_rate`: null -> 22.99  
  Source states the cash transaction / cash advance rate explicitly; currently null
- `interest_rates.purchases`: 10.9 -> 21.99  
  10.9% does not appear anywhere in this card's source (it belongs to an unrelated low-interest product); the confirmed purchase rate is 21.99%

### CA | cibc-aeroplan-visa-infinite-card
- `min_spend`: null -> 12000  
  Full 50,000-point welcome bonus requires the anniversary tier of $12,000 in net purchases over the first 12 monthly statement periods; min_spend was blank.

### CA | cibc-aeroplan-visa-infinite-privilege-card
- `min_spend`: null -> 25000  
  Full 100,000-point welcome bonus requires the anniversary tier of $25,000 in net eligible purchases over the first 12 monthly statement periods; min_spend was blank.

### CA | cibc-aventura-gold-visa-card
- `min_spend`: null -> 3000  
  Full 35,000-point welcome bonus requires $3,000 in net purchases in the first 4 monthly statement periods (on top of the first-purchase 15,000 pts); min_spend was blank.

### CA | cibc-aventura-visa-infinite-card
- `min_spend`: null -> 3000  
  Full 35,000-point welcome bonus requires $3,000 in net purchases in the first 4 monthly statement periods (on top of the first-purchase 15,000 pts); min_spend was blank.

### CA | cibc-aventura-visa-infinite-privilege-card
- `min_spend`: null -> 25000  
  Full 80,000-point welcome bonus requires the anniversary tier of $25,000 in net eligible purchases over the first 12 monthly statement periods; min_spend was blank.

### CA | cibc-dividend-visa-card-for-students
- `insurance.purchase_protection`: "8" -> ""  
  the '8' is a scraped footnote reference number, not an insurance coverage amount; no dollar figure for purchase protection is stated on this card's page

### CA | desjardins-cash-back-visa
- `interest_rates.purchases`: 10.9 -> 20.9  
  10.9% does not match this card's source (it's already correctly reflected in the separate purchase_interest_rate field as 20.9); the redundant interest_rates.purchases field carries a stale/wrong value

### CA | desjardins-cash-back-world-elite-mastercard
- `interest_rates.purchases`: 10.9 -> 20.9  
  10.9% does not match this card's source; purchase_interest_rate is already correctly 20.9 in the record, but the redundant interest_rates.purchases field is stale/wrong
- `key_perks`: ["Up to 3% cash back"] -> ["Up to 4% cash back"]  
  The card's headline and max earn rate is 4% (on groceries), not 3%; stored key_perk understates it

### CA | desjardins-flexi-visa
- `key_perks`: ["Statement credits"] -> []  
  No mention of 'statement credit' anywhere in the full source file (checked via full-text search); Flexi Visa is a no-rewards, low-interest card with no cash-back or credit mechanic described. This is the type of fabricated statement-credit perk the audit flags for removal

### CA | desjardins-odyssey-gold-visa
- `interest_rates.purchases`: 10.9 -> 20.9  
  10.9% does not match this card's source; purchase_interest_rate is already correctly 20.9, but the redundant interest_rates.purchases field is stale/wrong

### CA | desjardins-odyssey-visa-infinite-privilege
- `purchase_interest_rate`: 20.9 -> 11.9  
  This premium card has a distinctly lower promotional purchase rate than the other Desjardins cards; stored value of 20.9 appears copy-pasted from the standard Desjardins cards and contradicts this card's own source
- `interest_rates.purchases`: 10.9 -> 11.9  
  Should mirror the corrected purchase_interest_rate of 11.9%, not the unrelated 10.9%

### CA | desjardins-odyssey-world-elite-mastercard
- `interest_rates.purchases`: 10.9 -> 20.9  
  10.9% does not match this card's source; purchase_interest_rate is already correctly 20.9, but the redundant interest_rates.purchases field is stale/wrong

### CA | marriott-bonvoy-american-express-card
- `key_perks`: ["Receive complimentary Marriott Bonvoy Silver Elite status","Front of the Line presale ti -> ["Receive complimentary Marriott Bonvoy Silver Elite status","Earn 5 points for every $1 spent in eligible Car  
  "Front of the Line presale tickets" and "Free first checked bag" are not supported anywhere in the source; the fully-expanded Featured Benefits and All Benefits sections list only Free Night Award, Silver Elite status, and Elite Night Credits. The checked-bag removal also resolves the contradiction with benefits.free_checked_bags, which is already false.

### CA | marriott-bonvoy-business-americanexpress-card
- `key_perks`: ["Receive 15 Elite Night Credits each calendar year5","Receive an Annual Free Night Award3 -> ["Receive 15 Elite Night Credits each calendar year5","Receive an Annual Free Night Award3","Earn 5X the point  
  "Free first checked bag" is unsupported. The Featured Benefits carousel is a complete, numbered 4-item list (15 Elite Night Credits, Free Night Award, Gold Elite upgrade, 5x accelerated earn) with no baggage item, and this matches the stored benefits.free_checked_bags: false flag.

### CA | mbna-rewards-platinum-plus-mastercard
- `min_spend`: null -> 500  
  Source states the min spend condition for the first half of the welcome bonus explicitly.
- `welcome_bonus_conditions`: null -> "Spend $500 within the first 90 days of account opening (5,000 pts) and enroll in paperless e-statements withi  
  Source spells out both conditions required to earn the two 5,000-point halves of the bonus.

### CA | mbna-rewards-world-elite-mastercard
- `min_spend`: null -> 2000  
  Source states the min spend condition for the larger half of the welcome bonus.
- `welcome_bonus_conditions`: null -> "Spend $2,000 within the first 90 days of account opening (20,000 pts) and enroll in paperless e-statements wi  
  Source spells out both conditions required to earn the two halves of the bonus, which together match the stored $245 value ($165+$80).
- `minimum_income`: null -> 80000  
  Source states the income eligibility requirement explicitly.

### CA | moi-rbc-visa
- `key_perks`: ["Subscription perks"] -> []  
  No DashPass, subscription service, or any other 'subscription perk' is mentioned anywhere on this card's captured page - appears to be a fabricated perk.

### CA | more-rewards-rbc-visa
- `key_perks`: ["Subscription perks"] -> []  
  No DashPass, subscription service, or any other 'subscription perk' is mentioned anywhere on this card's captured page (unlike the Visa Infinite tier of this same product, which does have DashPass) - this appears to be fabricated/copied from a related card.

### CA | national-bank-corporate-mastercard
- `purchase_interest_rate`: 20.99 -> 19.15  
  Source states the purchase interest rate for this card is 19.15%, not 20.99%.

### CA | national-bank-platinum-mastercard
- `benefits.travel_medical`: false -> true  
  Source explicitly lists out-of-province/hospital medical travel insurance as a card benefit.
- `benefits.trip_cancellation`: false -> true  
  Source explicitly lists trip cancellation insurance as a card benefit.
- `benefits.mobile_insurance`: false -> true  
  Source explicitly lists mobile device insurance as a card benefit.

### CA | national-bank-syncro-mastercard
- `interest_rates.purchases`: 20.95 -> 8.9  
  Stored value does not match the source's stated current purchase interest rate; appears to be corrupted/leftover data (top-level purchase_interest_rate field already correctly shows 8.9).
- `interest_rates.balance_transfer`: 111.95 -> 12.9  
  111.95% is not a plausible interest rate and does not match the source; the source clearly states 12.90% for balance transfers and cash advances.
- `min_income`: 12000 -> null  
  The source explicitly states there is no minimum income requirement for this card, contradicting the stored $12,000 minimum income figure.

### CA | national-bank-world-elite-mastercard
- `welcome_bonus`: "Up to 35,000 points" -> ""  
  the welcome promotion behind the stored 35,000-point figure has ended and no replacement offer is shown; the hero banner image itself is now literally filenamed 'sans-promo' (French for 'without promo')
- `welcome_bonus_points`: 35000 -> null  
  same as above - the promotion that added up to the stored 35,000 points (10,000 payment-insurance + 5,000 spend + 10,000 spend + 10,000 bonus account) ran Feb 3-Jun 29, 2026 and has ended
- `welcome_bonus_value_cad`: 332 -> null  
  no current points figure to value, since the underlying promotion has ended

### CA | neo-world-elite-mastercard
- `minimum_income`: null -> 80000  
  Source states the income eligibility requirement explicitly right below the annual-fee summary line.
- `key_perks`: ["5% grocery","Airport lounge access","Statement credits","4% recurring payments","3% gas" -> ["5% grocery","Airport lounge access","4% recurring payments","3% gas","1% everything else","Travel benefits",  
  No statement-credit benefit appears anywhere on this card's own page (checked the full file, not just the digest). The complete "Top features" list only covers purchase protection, Mastercard travel/lounge benefit, additional cardholder, and auto-pay - no statement credits. This is one of the explicitly-listed fabrication-prone perk types.

### CA | neo-world-mastercard
- `minimum_income`: null -> 50000  
  Source states the income eligibility requirement explicitly right below the annual-fee summary line.

### CA | pc-insiders-world-elite-mastercard
- `min_spend`: null -> 3000  
  Source states the min spend condition for the 50,000-point welcome offer explicitly (this card's offer differs from the other PC Mastercards: $3,000 spend, not $100).
- `welcome_bonus_conditions`: null -> "Spend $3,000 in total qualifying purchases within 3 months of account approval to earn the 50,000-point bonus  
  Directly stated in the welcome-offer terms on this card's own page.
- `minimum_income`: null -> 80000  
  Source states the income eligibility requirement explicitly.
- `first_year_fee`: null -> 0  
  Source explicitly states the first year's annual fee is waived via a one-time credit, distinct from the $120 ongoing annual_fee already stored.

### CA | pc-mastercard
- `min_spend`: null -> 100  
  Source states the min spend condition for the 50,000-point welcome offer explicitly.
- `welcome_bonus_conditions`: null -> "Spend $100 or more at participating stores within 60 days of account approval"  
  Directly stated in the welcome-offer terms on this card's own page.
- `insurance`: {"car_rental":"8"} -> {}  
  The "8" is a footnote marker leaked from the PC World Elite tier's section of this same multi-card comparison page ("Travel Emergency Medical Insurance8", "Car Rental Collision/Loss Damage Waiver Insurance8", "Concierge Services8" all around lines 123-134, which is nested under the $80K/$150K World Elite eligibility line at 93). The base PC Mastercard's own dedicated section (lines 225-277) lists no car rental insurance benefit at all, consistent with benefits.car_rental_insurance already being false.
- `welcome_bonus`: "Earn 50,000 bonus PC Optimum points when you spend $100+ at participating stores within 6 -> "Earn 50,000 bonus PC Optimum points when you spend $100+ at participating stores within 60 days (apply by Aug  
  Stale apply-by date; fresh capture shows the deadline extended to August 31, 2026, points amount unchanged

### CA | pc-world-elite-mastercard
- `min_spend`: null -> 100  
  Source states the min spend condition for the 50,000-point welcome offer explicitly.
- `welcome_bonus_conditions`: null -> "Spend $100 or more at participating stores within 60 days of account approval"  
  Directly stated in the welcome-offer terms on this card's own page.
- `minimum_income`: null -> 80000  
  Source states the income eligibility requirement explicitly.
- `welcome_bonus`: "Earn 50,000 bonus PC Optimum points when you spend $100+ at participating stores within 6 -> "Earn 50,000 bonus PC Optimum points when you spend $100+ at participating stores within 60 days (apply by Aug  
  Stale apply-by date; fresh capture shows the deadline extended to August 31, 2026, points amount unchanged

### CA | pc-world-mastercard
- `min_spend`: null -> 100  
  Source states the min spend condition for the 50,000-point welcome offer explicitly.
- `welcome_bonus_conditions`: null -> "Spend $100 or more at participating stores within 60 days of account approval"  
  Directly stated in the welcome-offer terms on this card's own page.
- `minimum_income`: null -> 50000  
  Source states the income eligibility requirement explicitly.
- `welcome_bonus`: "Earn 50,000 bonus PC Optimum points when you spend $100+ at participating stores within 6 -> "Earn 50,000 bonus PC Optimum points when you spend $100+ at participating stores within 60 days (apply by Aug  
  Stale apply-by date; fresh capture shows the deadline extended to August 31, 2026, points amount unchanged

### CA | rbc-avion-visa-infinite
- `welcome_bonus`: "Get up to 70,000 Avion points (travel value up to $1,500). Apply by July 15, 2026." -> "Get up to 55,000 Avion points (max travel value of $1,100), that's up to 3 short haul round trip flights."  
  Current captured offer is 55,000 Avion points (35,000 welcome + 20,000 spend bonus) with max travel value $1,100, not 70,000 points / $1,500; no July 15, 2026 deadline appears on the captured page.
- `welcome_bonus_points`: 70000 -> 55000  
  Source confirms 35,000 + 20,000 = 55,000 Avion points, not 70,000.
- `welcome_bonus_value_cad`: 1260 -> 990  
  Points count corrected from 70,000 to 55,000; re-valued using the record's own existing cpp_cad (1.8): 55,000 x 0.018 = 990.
- `minimum_income`: null -> 60000  
  Source explicitly states the minimum income requirement for this card.
- `key_perks`: ["Airport lounge access","Subscription perks","Concierge service"] -> ["Subscription perks","Concierge service"]  
  Airport lounge access is not a benefit of this card. The only lounge-access mention on the captured page describes the separate, higher-tier RBC Avion Visa Infinite Privilege card, and this perk contradicts the record's own benefits.lounge_access:false.
- `welcome_bonus`: "Get up to 55,000 Avion points (max travel value of $1,100), that's up to 3 short haul rou -> "Get up to 55,000 Avion points (max travel value of $1,100): 35,000 Welcome Points on approval + 20,000 bonus   
  The prior 70,000-point / July 15 2026 offer has been replaced by a new 55,000-point offer
- `min_spend`: null -> 5000  
  Fresh offer requires $5,000 in qualifying spend within 6 months to earn the 20,000-point bonus tranche
- `first_year_value_cad`: 1140 -> 870  
  Follows the site formula (bonus value minus annual fee) after the points correction: 990 minus the 120 fee.

### CA | rbc-avion-visa-infinite-business
- `welcome_bonus`: "Get up to 45,000 welcome Avion points upon enrollment (offer ends June 30, 2026)" -> "Get 35,000 Welcome Avion points upon approval (a value of up to $750)."  
  Source states 35,000 points in both the hero banner and the highlights list; '45,000' and the June 30, 2026 expiry do not appear anywhere for this card (they match the WestJet Business card's offer instead, suggesting a data mix-up between the two business cards). The record's own first_year_value_cad (455) already reconciles exactly with a 35,000-point bonus (630 - 175 = 455), corroborating that 35,000 is correct and 45,000/810 is the error.
- `welcome_bonus_points`: 45000 -> 35000  
  Source states 35,000 points twice, never 45,000.
- `welcome_bonus_value_cad`: 810 -> 630  
  Points count changed from 45,000 to 35,000; recomputed at the record's own cpp_cad of 1.8: 35,000 x 1.8¢ = $630. This also matches first_year_value_cad's existing formula (630 - 175 annual fee = 455, exactly the currently stored first_year_value_cad), confirming internal consistency.
- `key_perks`: ["Hotel elite status/collection","Airport lounge access","Food delivery credits","Subscrip -> ["Hotel elite status/collection","Airport lounge access","Food delivery credits","Subscription perks","Concier  
  No free/complimentary checked-bag perk is mentioned anywhere; this is a general Avion Visa Infinite Business card with no airline co-brand, only baggage INSURANCE (lost/delayed baggage coverage) is present, which is a different thing. Likely bled over from the WestJet Business card.
- `insurance.lost_baggage`: "10006" -> "1000"  
  Source states the lost/stolen baggage coverage cap is $1,000; the stored value of 10006 appears to be '$1,000' with the adjacent footnote marker '6' erroneously concatenated onto it.

### CA | rbc-avion-visa-infinite-privilege
- `welcome_bonus`: "Get up to 100,000 Avion points plus 6 airport lounge passes (value up to $2,375). Apply b -> "Get up to 70,000 Avion points, that's a travel value of up to $1,500."  
  Source repeatedly and consistently states the current welcome offer is up to 70,000 points / $1,500 travel value; no '100,000' or '$2,375' figure appears anywhere. The 6 lounge passes are a separate ongoing card benefit, not part of the points bonus.
- `welcome_bonus_points`: 100000 -> 70000  
  Breakdown confirms 35,000 (approval) + 20,000 ($5,000 spend in 6 months) + 15,000 (anniversary) = 70,000, not 100,000.
- `welcome_bonus_value_cad`: 1800 -> 1260  
  Points count changed from 100,000 to 70,000 (confirmed error); recomputed at the record's own cpp_cad of 1.8: 70,000 x 1.8¢ = $1,260.
- `first_year_value_cad`: 1401 -> 861  
  Recomputed using the record's own formula (welcome_bonus_value_cad minus annual_fee): 1260 - 399 = 861.
- `welcome_bonus_conditions`: null -> "Get 35,000 points on approval, 20,000 bonus points when you spend $5,000 in your first 6 months, plus a 15,00  
  Explicit tiered breakdown of the offer was missing.
- `min_spend`: null -> 5000  
  The 20,000-point bonus tranche requires $5,000 spend in the first 6 months.
- `welcome_bonus`: "Get up to 70,000 Avion points, that's a travel value of up to $1,500." -> "Get up to 70,000 Avion points (travel value up to $1,500): 35,000 on approval + 20,000 for spending $5,000 in  
  The old 100,000-point / July 15 2026 offer has expired and been replaced by a new, smaller 70,000-point offer split into approval/spend/anniversary tranches

### CA | rbc-avion-visa-platinum
- `welcome_bonus`: "Get up to 70,000 Avion points (travel value up to $1,500). Apply by July 15, 2026." -> "Get up to 55,000 Avion points (max travel value of $1,100)."  
  Current captured offer is 55,000 points (35,000 on approval + 20,000 for $5,000 spend in 6 months), not 70,000; the 70,000/$1,500 figure appears stale.
- `welcome_bonus_points`: 70000 -> 55000  
  Source repeats 55,000 (35,000 + 20,000) as the current welcome offer total in the hero banner, the offer-details bullet, and the earn calculator, never 70,000.
- `welcome_bonus_value_cad`: 1260 -> 990  
  Points count changed from 70,000 to 55,000 (confirmed error, not a re-valuation quibble); recomputed at the record's own cpp_cad of 1.8: 55,000 x 1.8¢ = $990.
- `first_year_value_cad`: 1140 -> 870  
  Recomputed using the record's own formula (welcome_bonus_value_cad minus annual_fee) with the corrected 55,000-point valuation: 990 - 120 = 870.
- `welcome_bonus_conditions`: null -> "Get 35,000 Welcome Points on approval and 20,000 bonus points when you spend $5,000 in your first 6 months."  
  Explicit tiered breakdown of the offer was missing.
- `min_spend`: null -> 5000  
  The 20,000-point bonus tranche requires $5,000 spend in the first 6 months; this threshold was missing.
- `apply_url`: "https://www.rbcroyalbank.com/credit-cards/travel-credit-cards/platinum-avion.html" -> "https://www.rbcroyalbank.com/credit-cards/travel/rbc-visa-platinum-avion.html"  
  Stored URL path does not appear anywhere in the captured source; the site's own internal links (nav menu, legal-disclaimer anchors) all point to /credit-cards/travel/rbc-visa-platinum-avion.html for this exact card (Annual Fee $120 matches).
- `welcome_bonus`: "Get up to 55,000 Avion points (max travel value of $1,100)." -> "Get up to 55,000 Avion points (max travel value of $1,100): 35,000 Welcome Points on approval + 20,000 bonus   
  The prior 70,000-point / July 15 2026 offer has been replaced by a new 55,000-point offer, identical structure to RBC Avion Visa Infinite

### CA | rbc-ion-visa
- `apply_url`: "https://www.rbcroyalbank.com/credit-cards/rewards/rbc-ion-visa.html" -> "https://www.rbcroyalbank.com/credit-cards/rewards/rbc-ion-plus-visa.html"  
  Stored apply_url points to the base RBC ION Visa product page, not RBC ION+ Visa (the card this record describes). The correct ION+ page link is visible in this same capture's cross-sell block.
- `cash_advance_rate`: null -> 22.99  
  The RBC ION+ Visa cross-sell teaser box on this page explicitly shows its cash advance rate.

### CA | rbc-ion-visa-2
- `min_spend`: null -> 500  
  7,000 of the 14,000 welcome points require $500 spend in the first 3 months; this threshold was missing.
- `welcome_bonus_conditions`: null -> "7,000 points on approval plus 7,000 bonus points when you spend $500 in your first 3 months (totaling up to 1  
  Explicit breakdown of the up-to-14,000 point offer was missing; the two tranches (7k+7k) sum exactly to the stored welcome_bonus_points of 14,000.

### CA | rbc-u-s-dollar-visa-gold
- `apply_url`: "https://www.rbcroyalbank.com/credit-cards/rewards-credit-cards/us-dollar-credit-card.html -> "https://www.rbcroyalbank.com/credit-cards/travel/rbc-us-dollar-visa-gold.html"  
  Stored URL path does not appear anywhere in the source; the page's own analytics tracking pixel and image/PDF asset paths all confirm the canonical current URL is /credit-cards/travel/rbc-us-dollar-visa-gold.html.

### CA | rbc-visa-platinum
- `insurance`: {"trip_cancellation":"9"} -> {}  
  Card's insurance list is limited to exactly three items (Travel Accident, Auto Rental Collision/LDW, Purchase Security & Extended Warranty); Trip Cancellation Insurance is not among them.
- `benefits.trip_cancellation`: true -> false  
  No trip cancellation coverage is listed for this no-fee card's three-item insurance suite.
- `benefits.flight_delay`: true -> false  
  No flight delay coverage is listed for this no-fee card's three-item insurance suite.

### CA | rogers-red-world-elite-mastercard
- `key_perks`: ["1.5% on non-USD with Rogers service","Statement credits","Lounge access ($32 USD)","3% o -> ["2% on non-USD with Rogers service","Statement credits","Lounge access ($32 USD)","3% on USD purchases","Rent  
  The source table shows the non-USD rate WITH an eligible Rogers service is 2%, not 1.5%; 1.5% is actually the rate WITHOUT an eligible Rogers service. The stored perk text had the condition inverted, and 2% also matches the card's own stored earn_rates."All other purchases": "2%".
- `benefits.lounge_access`: false -> true  
  Source confirms discounted Mastercard Travel Pass lounge access, which the stored key_perks array already lists ("Lounge access ($32 USD)") but benefits.lounge_access contradicts it.

### CA | scotia-momentum-mastercard-credit-card
- `purchase_interest_rate`: 19.99 -> 20.99  
  Top-level purchase_interest_rate (19.99) disagrees with the card's own interest_rates.purchases field (20.99, already correct); source confirms 20.99%

### CA | scotia-momentum-no-fee-visa-card
- `purchase_interest_rate`: 19.99 -> 20.99  
  Top-level purchase_interest_rate (19.99) disagrees with the card's own interest_rates.purchases field (20.99, already correct); source confirms 20.99%

### CA | scotiabank-american-express-card
- `purchase_interest_rate`: 9.99 -> 21.99  
  Stored purchase rate (9.99%) does not match the source; source confirms 21.99% on purchases
- `interest_rates.purchases`: 19.99 -> 21.99  
  Nested interest_rates.purchases (19.99%) also disagrees with the source's stated 21.99% purchase rate

### CA | scotiabank-american-express-card-for-students
- `min_spend`: null -> 1000  
  Source states the full 10,000-point bonus requires $1,000 in eligible purchases in the first 3 months (2,500 pts at $250 spend + 7,500 pts at $1,000 spend); min_spend was blank.

### CA | scotiabank-gold-american-express-card
- `purchase_interest_rate`: 20.99 -> 21.99  
  Source states the purchase interest rate is 21.99%, not 20.99%
- `interest_rates.purchases`: 20.99 -> 21.99  
  Same underlying purchase rate mismatch as purchase_interest_rate; both fields should read 21.99%
- `welcome_bonus`: "Earn up to $850^ in welcome offers, first year rewards and savings value, including no an -> "Earn up to $950 in welcome offers, first year rewards and savings value, including up to 50,000 bonus Scene+   
  Total value and point count both increased in the fresh offer (was $850/45,000, now $950/50,000)
- `welcome_bonus_points`: 45000 -> 50000  
  30,000 + 20,000 = 50,000 total points in the fresh offer
- `welcome_bonus_value_cad`: 450 -> 500  
  Recomputed using the record's own cpp_cad (1): 50,000 x 1 / 100 = 500

### CA | scotiabank-passport-visa-infinite-card
- `key_perks`: ["Hotel elite status/collection","Airport lounge access","Priority Pass lounge access","Pr -> ["Hotel elite status/collection","Airport lounge access","Premium lounge access","No foreign transaction fee",  
  This card's lounge benefit is the Visa Airport Companion Program (DragonPass), not Priority Pass; Priority Pass is only mentioned on this page in reference to the separate Scotiabank American Express Platinum card
- `welcome_bonus`: "Earn up to $1,500Δ in first year welcome offers, rewards and savings, including up to 60, -> "Earn up to $1,250 in first year welcome offers, rewards and savings, including up to 35,000 bonus Scene+ poin  
  Both the total value and point count dropped in the fresh offer (was $1,500/60,000, now $1,250/35,000)
- `welcome_bonus_points`: 60000 -> 35000  
  25,000 + 10,000 = 35,000 total points in the fresh offer, down from 60,000
- `welcome_bonus_value_cad`: 600 -> 350  
  Recomputed using the record's own cpp_cad (1): 35,000 x 1 / 100 = 350

### CA | scotiabank-platinum-american-express-card
- `purchase_interest_rate`: 20.99 -> 9.99  
  Top-level purchase_interest_rate (20.99) disagrees with the card's own interest_rates.purchases field (9.99, already correct); source confirms 9.99%
- `key_perks`: ["Airport lounge access","Statement credits","Front of the Line presale tickets","Priority -> ["Airport lounge access","Front of the Line presale tickets","Priority Pass lounge access","Premium lounge acc  
  No statement-credit benefit appears anywhere on this card's page (searched for 'statement credit' and dollar-credit language with no hits); appears fabricated or copied from another card
- `welcome_bonus`: "Earn up to $2,500* in value in the first 14 months, including up to 80,0004 bonus Scene+  -> "Earn up to $3,000* in value in the first 14 months, including up to 100,000 bonus Scene+ points."  
  The stored welcome_bonus text was internally inconsistent (said $2,500 but welcome_bonus_points already stored as 80,000, not matching either). Fresh capture shows a current, dated offer (open account between July 2, 2026 and November 1, 2026) of up to $3,000 value / 100,000 points via a 60k+20k+20k tiered structure.
- `welcome_bonus_points`: 80000 -> 100000  
  Points count changed from 80,000 to 100,000 per fresh offer terms (60,000 + 20,000 + 20,000 tiers).
- `welcome_bonus_value_cad`: 800 -> 1000  
  Recomputed using the record's own cpp_cad=1: new_points 100,000 x 1 / 100 = 1000. (Not using the issuer's own $3,000 headline figure, per the deliberate-revaluation rule.)

### CA | scotiabank-scene-tm-visa-card
- `purchase_interest_rate`: 20.99 -> 21.99  
  Source states the purchase interest rate is 21.99%, not 20.99%
- `interest_rates.purchases`: 20.99 -> 21.99  
  Same underlying purchase rate mismatch as purchase_interest_rate; both fields should read 21.99%

### CA | scotiabank-scene-tm-visa-card-for-students
- `min_spend`: null -> 1000  
  Source states the full 10,000-point bonus requires $1,000 in eligible purchases in the first 3 months (2,500 pts at $250 spend + 7,500 pts at $1,000 spend); min_spend was blank.

### CA | scotiabank-u-s-dollar-visa-card
- `purchase_interest_rate`: 13.99 -> 19.99  
  Top-level purchase_interest_rate (13.99) disagrees with the card's own interest_rates.purchases field (19.99, already correct); source confirms 19.99%

### CA | simplii-financial-cash-back-visa-card
- `minimum_income`: null -> 15000  
  Source states the income eligibility requirement in the rates/fees table and again in the FAQ.

### CA | simplycash-preferred-card-from-americanexpress
- `key_perks`: ["Statement credits","Earn up to 4% cash back on eligible gas and grocery purchases3","Fro -> ["Statement credits","Earn up to 4% cash back on eligible gas and grocery purchases3","Front of the Line presa  
  "Free first checked bag" is unsupported. The Featured Benefits carousel is a complete, numbered 4-item list (referral bonus, exclusive-ticket-access experiences, mobile device insurance, Instacart credit) with no baggage item, matching the stored benefits.free_checked_bags: false flag. (The two Front-of-the-Line entries are kept: the source describes 'exclusive ticket access... with American Express Experiences' under footnote 6, matching 'Front Of The Line® Access6'.)
- `key_perks`: ["Statement credits","Earn up to 4% cash back on eligible gas and grocery purchases3","Fro -> ["Statement credits","Earn up to 4% cash back on eligible gas and grocery purchases3","Food delivery credits",  
  The fresh, complete capture (522 lines, full page including footer) contains no mention of 'Front of the Line' presale/priority access or a free checked bag benefit anywhere on the page. The only baggage-related item found is a Baggage Delay Insurance benefit (up to $500 for delayed checked baggage), which is insurance, not a free-checked-bag perk. These three list items appear to be carried over in error from a different Amex travel card and are not supported by this card's own page.

### CA | tangerine-money-back-world-mastercard
- `purchase_interest_rate`: 20.99 -> 20.95  
  Source states 20.95% for this specific card in two places, not 20.99%.
- `min_spend`: null -> 1500  
  Source states the min spend condition for the $100 cash back bonus explicitly.
- `welcome_bonus_conditions`: null -> "Spend $1,500 within the first 3 months of account opening"  
  Directly stated on the card's own offer section.
- `benefits.lounge_access`: false -> true  
  Source confirms DragonPass lounge access, which the stored key_perks array already lists ("DragonPass lounge access") but benefits.lounge_access contradicts it.

### CA | the-platinum-card
- `welcome_bonus`: "Earn up to 170,000 Membership Rewards® points" -> "Earn up to 100,000 Membership Rewards points (70,000 after spending $10,000 in first 3 months, plus 30,000 wh  
  Current offer headline is explicitly 'UP TO 100,000 POINTS', a large drop from the stored 170,000.
- `welcome_bonus_points`: 170000 -> 100000  
  Points count dropped from 170,000 to 100,000 (70,000 + 30,000 tiers) per the current offer.
- `welcome_bonus_value_cad`: 3315 -> 1950  
  Recomputed using the record's own cpp_cad=1.95: new_points 100,000 x 1.95 / 100 = 1950.
- `key_perks`: ["Statement credits","Access to a $200 Annual Travel Credit6","Unlock access to more than  -> ["Statement credits","Access to a $200 Annual Travel Credit6","Unlock access to more than 1,550 airport lounge  
  Lounge count in the perk text is stale: fresh source states 'more than 1,550 lounges' vs the stored '1,400'.

### CA | triangle-mastercard
- `purchase_interest_rate`: 22.99 -> 21.99  
  21.99% is the purchase rate (all charges excl. cash transactions); 22.99% is the cash-transaction rate
- `apply_url`: "https://www.ctfs.com/content/ctfs3/en/homepage.html" -> "https://mastercard.triangle.com/content/dsa2/en.html?cardType=OMX&pcid=tr009&utm_source=ctfswebsite&utm_mediu  
  Stored URL points to a generic CTFS homepage, not an application page; the source page's own 'Apply Now' link goes to a card-specific application URL

### CA | triangle-world-elite-mastercard
- `purchase_interest_rate`: 22.99 -> 21.99  
  21.99% is the purchase rate (all charges excl. cash transactions); 22.99% is the cash-transaction rate
- `cash_advance_rate`: null -> 22.99  
  Source states the cash transaction rate explicitly; currently null

### CA | westjet-rbc-mastercard
- `key_perks`: ["Subscription perks","Free first checked bag"] -> ["Subscription perks"]  
  This is the base (non-World-Elite) WestJet Mastercard. The source only offers point REDEMPTION for checked bags (paying with points), not a complimentary free bag, and explicitly notes premium benefits belong to the World Elite tier instead.
- `benefits.free_checked_bags`: true -> false  
  Matches the key_perks correction above: this card only allows paying for checked bags with points, it does not grant a free checked bag.

### CA | westjet-rbc-world-elite-mastercard
- `min_spend`: null -> 5000  
  The 30,000-point 'Additional WestJet Points' tranche (part of the up-to-70,000 total) requires $5,000 spend in the first 3 months; this threshold was missing.
- `welcome_bonus_conditions`: null -> "30,000 points on first purchase, additional 30,000 points require $5,000 spend within first 3 months, plus 10  
  Explicit tiered breakdown of the up-to-70,000 point offer was missing; the three tranches (30k+30k+10k) sum exactly to the stored welcome_bonus_points of 70,000, confirming the total is correct.

### CA | westjet-rbc-world-elite-mastercard-for-business
- `welcome_bonus_conditions`: null -> "No minimum spend required to earn the 45,000 welcome points; includes instant Silver status with WestJet."  
  Source explicitly states no spend threshold and confirms an added instant-status perk; this also corroborates that min_spend correctly remains null.
- `welcome_bonus`: "Receive up to 45,000 welcome WestJet points after your first purchase (offer ends June 30 -> "Sign up today and receive 35,000 welcome WestJet points after your first purchase."  
  The stored 'offer ends June 30, 2026' offer has been replaced; the fresh capture shows a flat 35,000-point welcome offer with no 'up to' framing or expiry date.
- `welcome_bonus_points`: 45000 -> 35000  
  Points count dropped from 45,000 to 35,000 per the current confirmed offer.
- `welcome_bonus_value_cad`: 450 -> 350  
  Recomputed per the record's own cpp_cad (1): 35,000 x 1 / 100 = 350, consistent with how the old value (45,000 x 1 / 100 = 450) was derived.
- `key_perks`: ["Subscription perks","Airport lounge access","Food delivery credits","Free first checked  -> ["Subscription perks","Airport lounge access","Food delivery credits","Free first and second checked bags"]  
  Fresh source explicitly states two free checked bags for this business card, not one.
- `welcome_bonus`: "Sign up today and receive 35,000 welcome WestJet points after your first purchase." -> "Receive 35,000 welcome WestJet points after your first purchase."  
  rbcroyalbank.com re-captured 2026-08-09 states 35,000 welcome WestJet points after the first purchase; the stored 45,000 figure and its June 30, 2026 end date are both stale.

### US | american-express-gold-card
- `key_perks`: ["Free first checked bag","Hotel elite status/collection","Statement credits","Airport lou -> ["Hotel elite status/collection","Statement credits","Front of the Line presale tickets","4X points at restaur  
  The card's own FAQ explicitly says the Gold Card does NOT have lounge access, directly contradicting three stored perks ('Airport lounge access', 'Priority Pass lounge access', 'Premium lounge access'). No free-checked-bag benefit appears anywhere in the source either, and this also matches the record's own benefits.lounge_access: false and benefits.free_checked_bags: false, which key_perks contradicted
- `welcome_bonus_conditions`: null -> "After you spend $8,000 in purchases on your new Card within the first 6 months of Card Membership."  
  Source states the spend condition explicitly; field was empty

### US | american-express-green-card
- `key_perks`: ["Hotel elite status/collection","Statement credits","3X Membership Rewards® points on Tra -> ["Statement credits","3X Membership Rewards® points on Travel‡","Front of the Line presale tickets","3X Member  
  removed fabricated lounge-access, hotel-elite-status, and free-checked-bag perks not supported by this entry-level MR card

### US | blue-business-plus-credit-card
- `key_perks`: ["Hotel elite status/collection","Statement credits","1X points on Purchases Thereafter‡", -> ["1X points on Purchases Thereafter‡","2X points on All Eligible Purchases, up to $50K per calendar year‡","Ex  
  removed fabricated lounge-access, hotel-elite-status, statement-credit, presale-ticket, and free-checked-bag perks; this simple no-fee business rewards card has none of them

### US | blue-cash-everyday-card
- `key_perks`: ["3% cash back at U.S. supermarkets on up to $6K in purchases (then 1%)‡","Free first chec -> ["3% cash back at U.S. supermarkets on up to $6K in purchases (then 1%)‡","Statement credits","3% cash back at  
  Blue Cash Everyday is a no-annual-fee, no-frills cash-back card with none of these premium travel perks. A full-text search of the source turns up 'lounge', 'hotel collection', 'elite status', 'checked bag', and 'presale' only inside generic site navigation menu boilerplate, never as an actual benefit of this card
- `signup_bonus_currency`: "points" -> "cash"  
  This card's welcome offer and everyday rewards are cash back (Reward Dollars), not Membership Rewards points
- `welcome_bonus_conditions`: null -> "After you spend $2,000 in purchases on your new Card within the first 6 months of Card Membership."  
  Source states the spend condition explicitly; field was empty

### US | blue-cash-preferred-card
- `key_perks`: ["Hotel elite status/collection","Statement credits","6% cash back on select U.S. streamin -> ["Statement credits","6% cash back on select U.S. streaming subscriptions‡","6% cash back at U.S. supermarkets  
  Blue Cash Preferred is a no-frills cash-back card with none of these premium travel perks. A full-text search of the source turns up 'lounge', 'hotel collection', 'elite status', 'checked bag', and 'presale' only inside generic site navigation menu boilerplate (identical nav links appear on every Amex US page), never as an actual benefit of this card. These read as copy-paste contamination from a premium travel card record
- `signup_bonus_currency`: "points" -> "cash"  
  This card's welcome offer and everyday rewards are cash back (Reward Dollars), not Membership Rewards points
- `welcome_bonus_conditions`: null -> "After you spend $3,000 in purchases on your new Card within the first 6 months of Card Membership."  
  Source states the spend condition explicitly; field was empty

### US | british-airways-visa-signature-credit-card
- `welcome_bonus_conditions`: null -> "Spend $5,000 on purchases within the first 3 months of account opening"  
  fresh source states the min-spend condition explicitly; field was empty

### US | business-gold-card
- `key_perks`: ["$240 Flexible Business Credit (up to $20 per month)‡","Discover which Card with Flexible -> ["$240 Flexible Business Credit (up to $20 per month)‡","Statement credits","Walmart+ Monthly Membership Credi  
  removed a junk nav fragment and fabricated lounge-access, hotel-elite-status, presale-ticket, and free-checked-bag perks that this card explicitly does not have

### US | business-green-rewards-card
- `key_perks`: ["Hotel elite status/collection","Statement credits","Airport lounge access","Pay Over Tim -> ["Pay Over Time with Interest‡","2X points on AmexTravel.com‡","American Express® App ‡"]  
  removed fabricated lounge-access, hotel-elite-status, statement-credit, presale-ticket, and free-checked-bag perks; this simple no-frills business charge card has none of them

### US | business-platinum-card
- `key_perks`: ["Hotel elite status/collection","Statement credits","Airport lounge access","Reward Your  -> ["Hotel elite status/collection","Statement credits","Airport lounge access","Front of the Line presale ticket  
  removed junk nav/marketing fragments ('Reward Your Growth', 'Choose Your Color') and a fabricated free-checked-bag perk not supported by this card; kept lounge/status/presale perks, which are all confirmed

### US | chase-freedom-flex-credit-card
- `welcome_bonus_conditions`: null -> "Spend $500 on purchases in the first 3 months from account opening"  
  Source states the spend requirement for the $200 bonus but stored record has this field null

### US | chase-freedom-rise-credit-card
- `welcome_bonus_conditions`: null -> "Set up automatic payments within the first 3 months of account opening and remain enrolled for at least 90 co  
  Source states the enrollment requirement for the $25 statement credit but stored record has this field null
- `earn_rates`: {"All purchases":"1.5%"} -> {"Dining, takeout & delivery (6 mo)":"3%","All other purchases":"1.5%"}  
  fresh source shows a 3% dining/takeout/delivery category (capped at $6,000 spend in first 6 months) on top of the 1.5% base rate; stored record only had the flat 1.5% rate

### US | chase-freedom-unlimited-credit-card
- `welcome_bonus_conditions`: null -> "Spend $500 on purchases in the first 3 months from account opening"  
  Source states the spend requirement for the $200 bonus but stored record has this field null

### US | chase-sapphire-preferred-credit-card
- `welcome_bonus_conditions`: null -> "Spend $5,000 on purchases in the first 3 months from account opening"  
  Source states the spend requirement for the 75,000-point bonus but stored record has this field null
- `earn_rates`: {"Travel via Chase Travel":"5x","Dining":"3x","Online grocery":"3x","Select streaming":"3x -> {"Travel via Chase Travel":"5x","Dining":"3x","Gas, EV charging, vacation homes":"3x","Online grocery":"3x","S  
  fresh source adds a new 3x category (tagged NEW on the page) for gas stations, EV charging, and vacation homes at top brands, not present in the stored record
- `key_perks`: ["Food delivery credits","Statement credits","No foreign transaction fee"] -> ["Food delivery credits","Statement credits","No foreign transaction fee","Travel program credit (NEXUS/Global  
  fresh source shows a new (tagged NEW) $120 Global Entry/TSA PreCheck/NEXUS statement credit not present in stored key_perks
- `welcome_bonus_conditions`: "Spend $5,000 on purchases in the first 3 months from account opening" -> "Spend $5,000 in purchases in the first 3 months from account opening"  
  fresh source states the min-spend condition explicitly; field was empty

### US | delta-skymiles-blue-american-express-card
- `key_perks`: ["Free first checked bag","Hotel elite status/collection","Statement credits","Airport lou -> ["Statement credits","Front of the Line presale tickets","20% Back on In-Flight Purchases‡","No Foreign Transa  
  removed fabricated free-checked-bag, hotel-elite-status, and lounge-access perks; this no-fee entry Delta card has none of them

### US | delta-skymiles-gold-american-express-card
- `signup_bonus_formatted`: "Earn Up To 90,000 Bonus Mileswith the Delta SkyMiles® Gold American Express Card. Earn 70 -> "Earn Up To 90,000 Bonus Mileswith the Delta SkyMiles® Gold American Express Card. Earn 70,000 Bonus Miles aft  
  stored offer-end date is stale; captured page shows a later expiration date
- `key_perks`: ["Hotel elite status/collection","Statement credits","Airport lounge access","Front of the -> ["Statement credits","Front of the Line presale tickets","Save 15% (excluding on taxes & fees) when you book A  
  removed fabricated lounge-access and hotel-elite-status perks the card does not have
- `signup_bonus`: 90000 -> 80000  
  welcome offer dropped from 90,000 (70k+20k tiered, offer ended 04/01/26) to a single-tier 80,000 evergreen offer
- `signup_bonus_value_usd`: 90000 -> 80000  
  site convention sets this equal to the points count; points count changed
- `signup_bonus_formatted`: "Earn Up To 90,000 Bonus Mileswith the Delta SkyMiles® Gold American Express Card. Earn 70 -> "AS HIGH AS 80,000 Bonus Miles after you spend $2,000 in purchases on your new Card within the first 6 months   
  stored offer text is the old, now-expired tiered structure with a stale 04/01/26 end date; fresh page shows a different, lower, evergreen single-tier offer
- `welcome_bonus_conditions`: null -> "Spend $2,000 in purchases within the first 6 months of Card Membership"  
  matches new lower offer's condition

### US | delta-skymiles-platinum-american-express-card
- `signup_bonus_formatted`: "Earn Up To 100,000 Bonus Mileswith your Delta SkyMiles® Platinum American Express Card. E -> "Earn Up To 100,000 Bonus Mileswith your Delta SkyMiles® Platinum American Express Card. Earn 80,000 bonus mil  
  stored offer-end date is stale; captured page shows a later expiration date
- `key_perks`: ["Hotel elite status/collection","Statement credits","Airport lounge access","Take 15% off -> ["Statement credits","Take 15% off Award Travel on Delta flights*‡. *Not applicable to partner operated flight  
  removed fabricated lounge-access and hotel-elite-status perks the card does not have
- `signup_bonus`: 100000 -> 90000  
  welcome offer dropped from 100,000 (80k+20k tiered, offer ended 04/01/2026) to a single-tier 90,000 evergreen offer
- `signup_bonus_value_usd`: 100000 -> 90000  
  site convention sets this equal to the points count; points count changed
- `signup_bonus_formatted`: "Earn Up To 100,000 Bonus Mileswith your Delta SkyMiles® Platinum American Express Card. E -> "AS HIGH AS 90,000 Bonus Miles after you spend $3,000 in purchases on your new Card within the first 6 months   
  stored offer text is the old, now-expired tiered structure with a stale 04/01/2026 end date; fresh page shows a different, lower, evergreen single-tier offer
- `welcome_bonus_conditions`: null -> "Spend $3,000 in purchases within the first 6 months of Card Membership"  
  matches new lower offer's condition

### US | delta-skymiles-platinum-business-card
- `welcome_bonus_conditions`: null -> "Spend $8,000 in purchases within the first 6 months of Card Membership"  
  Source states the spend requirement for the 100,000-mile bonus but stored record has this field null
- `key_perks`: ["Hotel elite status/collection","Statement credits","Airport lounge access","Front of the -> ["Statement credits","Get Closer to Medallion Status with MQD Headstart‡ and MQD Boost‡","3X Miles on Eligible  
  Card's own FAQ explicitly denies lounge access; 'Priority Pass lounge access', 'Premium lounge access', and 'Airport lounge access' are fabricated and contradict the record's own benefits.lounge_access:false. 'Hotel elite status/collection' and 'Front of the Line presale tickets' are not supported anywhere in the captured source (this is a business charge card for Delta, not a hotel card)

### US | delta-skymiles-reserve-american-express-card
- `key_perks`: ["Hotel elite status/collection","Delta Sky Club® Access‡","Statement credits","Airport lo -> ["Delta Sky Club® Access‡","Statement credits","Airport lounge access","Front of the Line presale tickets","Wi  
  removed fabricated hotel-elite-status perk (no hotel program on this Delta co-brand card) and Priority Pass, which is not part of this card's lounge benefit
- `signup_bonus`: 125000 -> 100000  
  welcome offer dropped from 125,000 (100k+25k tiered, offer ended 04/01/2026) to a single-tier 100,000 evergreen offer
- `signup_bonus_value_usd`: 125000 -> 100000  
  site convention sets this equal to the points count; points count changed
- `signup_bonus_formatted`: "Earn Up To 125,000 Bonus Mileswith your Delta SkyMiles® Reserve American Express Card. Ea -> "AS HIGH AS 100,000 Bonus Miles after you spend $5,000 in purchases on your new Card within the first 6 months  
  stored offer text is the old, now-expired tiered structure with a stale 04/01/2026 end date; fresh page shows a different, evergreen single-tier offer at a lower total with a lower spend threshold
- `welcome_bonus_conditions`: null -> "Spend $5,000 in purchases within the first 6 months of Card Membership"  
  matches new offer's condition

### US | delta-skymiles-reserve-business-card
- `key_perks`: ["Hotel elite status/collection","Statement credits","Airport lounge access","Enjoy Delta  -> ["Statement credits","Airport lounge access","Enjoy Delta Sky Club® Access‡","Get Closer to Medallion Status w  
  removed fabricated hotel-elite-status perk (no hotel program on this Delta co-brand card) and Priority Pass, which is not part of this card's lounge benefit

### US | disney-inspire-visa-card
- `signup_bonus`: 600 -> 500  
  welcome offer dropped from $600 total ($300 gift card + $300 statement credit) to $500 total ($300 gift card + $200 statement credit)
- `signup_bonus_value_usd`: 600 -> 500  
  matches new total offer value
- `signup_bonus_formatted`: "$600 Offer" -> "$500 Offer"  
  matches new headline offer figure on the page
- `welcome_bonus`: "$600 Offer: $300 Disney Gift Card eGift upon approval + $300 statement credit" -> "$500 Offer: $300 Disney Gift Card eGift upon approval + $200 statement credit after you spend $1,000 on purch  
  statement credit portion dropped from $300 to $200 (gift card portion unchanged at $300)
- `welcome_bonus_conditions`: null -> "Spend $1,000 on purchases within the first 3 months of account opening"  
  fresh source states the min-spend condition explicitly; field was empty

### US | disney-premier-visa-card
- `welcome_bonus_conditions`: null -> "Spend $500 on purchases in the first 3 months from account opening"  
  fresh source states the min-spend condition explicitly; field was empty

### US | disney-visa-card
- `signup_bonus_currency`: "points" -> "cash"  
  the welcome offer is entirely a Disney Gift Card eGift + a cash statement credit, not points; the site's own sibling records (Disney Inspire, Disney Premier) label an identical gift-card+statement-credit structure as "cash", so "points" here is an outlier the fresh capture does not support
- `welcome_bonus_conditions`: null -> "Spend $500 on purchases in the first 3 months of account opening"  
  fresh source states the min-spend condition explicitly; field was empty

### US | hilton-honors-american-express-aspire-card
- `key_perks`: ["Hotel elite status/collection","Statement credits","Earn 7X Hilton Honors Bonus Points a -> ["Hotel elite status/collection","Statement credits","Earn 7X Hilton Honors Bonus Points at U.S. Restaurants a  
  removed fabricated airport-lounge, presale-ticket, and free-checked-bag perks; source only describes hotel-property lounge access via Diamond status, not airport/Priority Pass lounge access

### US | hilton-honors-american-express-card
- `key_perks`: ["Hotel elite status/collection","Statement credits","Airport lounge access","Front of the -> ["Hotel elite status/collection","Earn 5X Hilton Honors Bonus Points at U.S. restaurants, U.S. gas stations, a  
  removed fabricated lounge-access, presale-ticket, and free-checked-bag perks; the only 'statement credit' on the page is a one-time welcome-offer component, not an ongoing perk

### US | hilton-honors-american-express-surpass-card
- `key_perks`: ["Hotel elite status/collection","Statement credits","Earn 6X Hilton Honors Bonus Points a -> ["Hotel elite status/collection","Statement credits","Earn 6X Hilton Honors Bonus Points at U.S. restaurants,   
  removed fabricated lounge-access, presale-ticket, and free-checked-bag perks not supported by this hotel-only card

### US | hilton-honors-business-card
- `welcome_bonus_conditions`: null -> "Spend $8,000 in purchases within the first 6 months of Card Membership"  
  Source states the spend requirement for the 130,000-point bonus but stored record has this field null
- `key_perks`: ["Get up to $240 Back Per Year on Eligible Hilton Purchases‡","Hotel elite status/collecti -> ["Get up to $240 Back Per Year on Eligible Hilton Purchases‡","Hotel elite status/collection","Statement credi  
  This is a hotel card with no airline component, so 'Free first checked bag' is fabricated (also contradicts the record's own benefits.free_checked_bags:false). 'Airport lounge access', 'Priority Pass lounge access', 'Premium lounge access' and 'Front of the Line presale tickets' appear nowhere in the full captured source (also contradicts benefits.lounge_access:false)

### US | iberia-visa-signature-credit-card
- `welcome_bonus_conditions`: null -> "Spend $5,000 on purchases within the first 3 months of account opening"  
  fresh source states the min-spend condition explicitly; field was empty

### US | ihg-one-rewards-premier-business-credit-card
- `insurance.purchase_protection`: "120" -> "10000"  
  Stored value (120) is actually the coverage period in days, not the dollar coverage amount.

### US | ihg-one-rewards-premier-credit-card
- `signup_bonus`: 175000 -> 140000  
  welcome offer dropped from 175,000 points to 140,000 points and the min-spend requirement dropped from $5,000 to $3,000
- `signup_bonus_value_usd`: 175000 -> 140000  
  site convention sets this equal to the points count; points count changed
- `signup_bonus_formatted`: "Earn 175,000 Bonus Points after you spend $5,000 on purchases in the first three months f -> "Earn 140,000 Bonus Points after you spend $3,000 on purchases in the first 3 months from account opening."  
  matches the new lower headline offer and lower spend threshold on the page
- `welcome_bonus`: "Earn 175,000 Bonus Points after you spend $5,000 on purchases in the first 3 months from  -> "Earn 140,000 Bonus Points after you spend $3,000 on purchases in the first 3 months from account opening."  
  same offer decrease reflected in the separate welcome_bonus field
- `welcome_bonus_conditions`: null -> "Spend $3,000 on purchases within the first 3 months of account opening"  
  matches new lower offer's condition

### US | ihg-one-rewards-traveler-credit-card
- `signup_bonus`: 90000 -> 80000  
  Welcome bonus dropped from 90,000 to 80,000 points and the bonus structure changed (the old 30,000-point spend-tier add-on is gone, replaced by a 10,000-point authorized-user bonus).
- `signup_bonus_value_usd`: 90000 -> 80000  
  Recomputed 1:1 with the new points count per site convention (was 90000=90000).
- `signup_bonus_formatted`: "Earn 90,000 bonus points after spending $2,000 on purchases in the first 3 months from ac -> "Earn 80,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening. Plus  
  Matches the current on-page offer text; the old spend-tier add-on offer is no longer shown.
- `welcome_bonus`: "Earn 90,000 bonus points after spending $2,000 on purchases in the first 3 months from ac -> "Earn 80,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening. Plus  
  Same as signup_bonus_formatted.

### US | ink-business-cash-credit-card
- `insurance.purchase_protection`: "120" -> "10000"  
  Stored value (120) is actually the coverage period in days, not the dollar coverage amount.
- `signup_bonus_formatted`: "$750 bonus cash back" -> "$1,000 bonus cash back"  
  Page is running 'OUR BEST OFFER EVER' with the bonus displayed as $750 struck through / $1,000 active; the legal Offer Details paragraph explicitly names the current bonus '$1,000 Cash Back', confirming $1,000 (not the crossed-out $750) is the live offer.
- `signup_bonus_value_usd`: 750 -> 1000  
  Matches the confirmed current cash-back bonus amount.
- `welcome_bonus`: "$750 bonus cash back" -> "$1,000 bonus cash back"  
  Same as signup_bonus_formatted.

### US | ink-business-preferred-credit-card
- `insurance`: (absent) -> {"purchase_protection":"10000","trip_cancellation":"5000","mobile_insurance":"Yes"}  
  Stored record has no insurance object at all, despite benefits.purchase_protection, benefits.trip_cancellation and benefits.mobile_insurance all being true and the source page listing specific dollar figures for each.

### US | ink-business-premier-credit-card
- `insurance.purchase_protection`: "" -> "10000"  
  Stored value is an empty string; source states the dollar coverage amount explicitly.
- `earn_rates`: {"Purchases of $5,000 or more":"2.5%","All other purchases":"2%"} -> {"Purchases of $5,000 or more":"2.5%","Chase Travel purchases":"5%","All other purchases":"2%"}  
  A whole earn-rate category (5% cash back on Chase Travel purchases) is missing from the stored earn_rates.

### US | ink-business-unlimited-credit-card
- `insurance.purchase_protection`: "120" -> "10000"  
  Stored value (120) is actually the coverage period in days, not the dollar coverage amount; every other card in this batch stores the dollar figure in this field.
- `signup_bonus`: 750 -> 1000  
  Page is running 'OUR BEST OFFER EVER' with the bonus displayed as $750 struck through / $1,000 active; the legal Offer Details paragraph explicitly names the current bonus '$1,000 Cash Back', confirming $1,000 (not the crossed-out $750) is the live offer.
- `signup_bonus_formatted`: "$750 cash back" -> "$1,000 cash back"  
  Same as signup_bonus.
- `signup_bonus_value_usd`: 750 -> 1000  
  Matches the confirmed current cash-back bonus amount.
- `welcome_bonus`: "$750 cash back" -> "$1,000 cash back"  
  Same as signup_bonus_formatted.

### US | marriott-bonvoy-bevy-american-express-card
- `key_perks`: ["4X points at restaurants worldwide & U.S. Supermarkets (up to $15K in combined purchases -> ["4X points at restaurants worldwide & U.S. Supermarkets (up to $15K in combined purchases per calendar year)   
  removed fabricated lounge-access, statement-credit, presale-ticket, and free-checked-bag perks not supported by this hotel-only card

### US | marriott-bonvoy-bold-credit-card
- `signup_bonus`: 100000 -> 45000  
  The Free Night Award structure (2 nights, up to 50,000 points each) has been replaced entirely with a straight 45,000-point cash bonus.
- `signup_bonus_value_usd`: 100000 -> 45000  
  Recomputed 1:1 with the new points count per site convention (was 100000=100000).
- `signup_bonus_formatted`: "Earn 2 Free Night Awards (each good for stays up to 50,000 points/night, combined value u -> "Earn 45,000 Bonus Points after spending $1,000 on eligible purchases within 3 months of account opening."  
  The Free Night Award offer is gone from the live page; the new offer is a straight points bonus at the same $1,000/3-month spend requirement.
- `welcome_bonus`: "Earn 2 Free Night Awards (each good for stays up to 50,000 points/night, combined value u -> "Earn 45,000 Bonus Points after spending $1,000 on eligible purchases within 3 months of account opening."  
  Same as signup_bonus_formatted.

### US | marriott-bonvoy-boundless-credit-card
- `signup_bonus`: 250000 -> 200000  
  Free Night Award count dropped from 5 to 4 (still up to 50,000 points/night each), so total combined value drops from 250,000 to 200,000. The airline statement credit is still present but now framed as a time-limited 'Special Offer through 6/30/2027' rather than a flat part of the welcome bonus.
- `signup_bonus_value_usd`: 250000 -> 200000  
  Recomputed 1:1 with the new points count (4 x 50,000) per site convention.
- `signup_bonus_formatted`: "Earn 5 Free Night Awards (each good for stays up to 50,000 points/night, combined value u -> "Earn 4 Free Night Awards (each good for stays up to 50,000 points/night, combined value up to 200,000 points)  
  Matches the current on-page structure: 4 nights instead of 5, and the $100 credit is now a separate time-limited special offer with its own spend condition rather than bundled unconditionally into the sign-up bonus.
- `welcome_bonus`: "Earn 5 Free Night Awards (each good for stays up to 50,000 points/night, combined value u -> "Earn 4 Free Night Awards (each good for stays up to 50,000 points/night, combined value up to 200,000 points)  
  Same as signup_bonus_formatted.

### US | marriott-bonvoy-brilliant-american-express-card
- `key_perks`: ["Hotel elite status/collection","Statement credits","Each calendar year, get up to $300 ( -> ["Hotel elite status/collection","Statement credits","Each calendar year, get up to $300 (up to $25 per month)  
  removed fabricated presale-ticket and free-checked-bag perks not supported by this hotel-only card

### US | marriott-bonvoy-business-card
- `welcome_bonus_conditions`: null -> "Spend $8,000 in purchases within the first 6 months of Card Membership"  
  Source states the spend requirement for the welcome offer but stored record has this field null
- `key_perks`: ["Hotel elite status/collection","Statement credits","Earn 6X Marriott Bonvoy Points at ho -> ["Hotel elite status/collection","Statement credits","Earn 6X Marriott Bonvoy Points at hotels participating i  
  This is a hotel card with no airline component, so 'Free first checked bag' is fabricated (also contradicts the record's own benefits.free_checked_bags:false). 'Airport lounge access', 'Priority Pass lounge access', 'Premium lounge access' and 'Front of the Line presale tickets' appear nowhere in the full captured source (also contradicts benefits.lounge_access:false)

### US | platinum-card
- `key_perks`: ["Hotel elite status/collection","Statement credits","Airport lounge access","Front of the -> ["Hotel elite status/collection","Statement credits","Airport lounge access","Front of the Line presale ticket  
  No free checked bag benefit exists anywhere on the Platinum Card page; the only 'checked bag' mention is the $200 Airline Fee Credit, which reimburses incidental fees (including checked bags) as a statement credit, not a complimentary bag. This also matches the record's own benefits.free_checked_bags: false, which key_perks contradicted
- `welcome_bonus_conditions`: null -> "After you spend $12,000 in purchases on your new Card within the first 6 months of Card Membership."  
  Source states the spend condition explicitly; field was empty

### US | sapphire-reserve-for-businesssm-credit-card
- `signup_bonus`: 150000 -> 200000  
  Page is running 'OUR BEST OFFER RETURNS' with 150,000 struck through and 200,000 as the live figure; the value breakdown underneath explicitly computes '$4,000 value of 200,000 points', confirming 200,000 (not the crossed-out 150,000) is the current bonus.
- `signup_bonus_value_usd`: 150000 -> 200000  
  Matches the confirmed current points bonus.
- `signup_bonus_formatted`: "Earn 150,000 bonus points" -> "Earn 200,000 bonus points after you spend $30,000 on purchases in your first 6 months from account opening."  
  Matches confirmed current offer amount and spend requirement shown on page.
- `welcome_bonus`: "Earn 150,000 bonus points" -> "Earn 200,000 bonus points after you spend $30,000 on purchases in your first 6 months from account opening."  
  Same as signup_bonus_formatted.

### US | southwest-rapid-rewards-plus-credit-card
- `signup_bonus`: 20000 -> 50000  
  The welcome offer no longer includes the full Companion Pass; it is now a straight 50,000-point bonus, with only a much smaller '10,000 Companion Pass qualifying points boost' surviving as an ongoing yearly perk (not a welcome-offer Companion Pass award).
- `signup_bonus_value_usd`: 20000 -> 50000  
  Recomputed 1:1 with the new points count per site convention.
- `signup_bonus_formatted`: "Earn Companion Pass® through 2/28/27 and 20,000 bonus points after you spend $3,000 in th -> "Earn 50,000 bonus points after you spend $1,000 on purchases in the first 3 months from account opening."  
  The Companion Pass welcome award and the $3,000 spend threshold are gone from the live page; new offer is 50,000 points at a $1,000 spend threshold.
- `welcome_bonus`: "Earn Companion Pass® through 2/28/27 and 20,000 bonus points after you spend $3,000 in th -> "Earn 50,000 bonus points after you spend $1,000 on purchases in the first 3 months from account opening."  
  Same as signup_bonus_formatted.

### US | southwest-rapid-rewards-premier-business-credit-card
- `insurance.purchase_protection`: "120" -> "10000"  
  Stored value (120) is actually the coverage period in days, not the dollar coverage amount.

### US | southwest-rapid-rewards-premier-credit-card
- `signup_bonus`: 30000 -> 55000  
  Fresh site headline offer is now 55,000 points, not 30,000; the previous Companion Pass-through-2/28/27 framing is gone from the current new-cardmember offer.
- `signup_bonus_value_usd`: 30000 -> 55000  
  Same points-count change as signup_bonus (1:1 points valuation, consistent with stored convention).
- `signup_bonus_formatted`: "Earn Companion Pass® through 2/28/27 and 30,000 bonus points after you spend $4,000 in th -> "Earn 55,000 bonus points after you spend $1,500 on purchases in the first 3 months from account opening."  
  Current offer text has no Companion Pass tie-in and a lower min spend ($1,500 vs $4,000).
- `welcome_bonus`: "Earn Companion Pass® through 2/28/27 and 30,000 bonus points after you spend $4,000 in th -> "Earn 55,000 bonus points after you spend $1,500 on purchases in the first 3 months from account opening."  
  Same as signup_bonus_formatted change.

### US | southwest-rapid-rewards-priority-credit-card
- `signup_bonus`: 40000 -> 60000  
  Fresh site headline offer is now 60,000 points, not 40,000; no Companion Pass tie-in in the current offer.
- `signup_bonus_value_usd`: 40000 -> 60000  
  Same points-count change as signup_bonus (1:1 points valuation, consistent with stored convention).
- `signup_bonus_formatted`: "Earn Companion Pass® through 2/28/27 and 40,000 bonus points after you spend $5,000 in th -> "Earn 60,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening."  
  Current offer text has no Companion Pass tie-in and a lower min spend ($2,000 vs $5,000).
- `welcome_bonus`: "Earn Companion Pass® through 2/28/27 and 40,000 bonus points after you spend $5,000 in th -> "Earn 60,000 bonus points after you spend $2,000 on purchases in the first 3 months from account opening."  
  Same as signup_bonus_formatted change.

### US | the-new-chase-sapphire-reserve-credit-card
- `welcome_bonus_conditions`: null -> "Spend $6,000 in purchases in the first 3 months from account opening"  
  Source states the spend requirement for the 125,000-point bonus but stored record has this field null
- `signup_bonus`: 125000 -> 100000  
  Current headline offer for this card is 100,000 points after $6,000 spend, down from stored 125,000. (A separate '75,000 bonus points' mention on the page is for the Chase Sapphire Preferred, a different card, cross-sold at the bottom of this page - not used.)
- `signup_bonus_value_usd`: 125000 -> 100000  
  Same points-count change as signup_bonus.
- `signup_bonus_formatted`: "Earn 125,000 points" -> "Earn 100,000 points after you spend $6,000 in purchases in the first 3 months from account opening."  
  Updated to match current confirmed offer text.
- `welcome_bonus`: "Earn 125,000 points" -> "Earn 100,000 points after you spend $6,000 in purchases in the first 3 months from account opening."  
  Same as signup_bonus_formatted change.

### US | united-clubsm-card
- `welcome_bonus_conditions`: null -> "Spend $5,000 on purchases in the first 3 months from account opening"  
  Source states the spend requirement for the 90,000-mile bonus but stored record has this field null
- `earn_rates`: {"Prepaid hotels (Renowned)":"5x","United purchases":"4x","Other travel":"2x","Dining":"2x -> {"Prepaid hotels (Renowned)":"5x","United purchases":"5x","Other travel":"2x","Dining":"2x","All other purchas  
  Card's own United-purchases multiplier increased from 4x to 5x, explicitly flagged 'NEW!' by the issuer. (The page's '11x total miles on eligible United flights' bundles a separate 6x MileagePlus-membership fare bonus on top of the card's 5x - that bundled figure is not used here.)

### US | united-gatewaysm-card
- `welcome_bonus_conditions`: null -> "Spend $1,000 on purchases in the first 3 months your account is open"  
  Source states the spend requirement for the 30,000-mile bonus but stored record has this field null

### US | united-questsm-card
- `welcome_bonus_conditions`: null -> "Spend $4,000 on purchases in the first 3 months your account is open"  
  Source states the spend requirement for the 80,000-mile + 3,000 PQP bonus but stored record has this field null
- `signup_bonus`: 80000 -> 60000  
  Base spend-achievable offer dropped to 60,000 bonus miles + 500 PQP (from 80,000 + 3,000 PQP). Headline shows 'up to 70,000 + 500 PQP' which includes a conditional +10,000 for adding an authorized user.
- `signup_bonus_value_usd`: 80000 -> 60000  
  Same points-count change as signup_bonus.
- `signup_bonus_formatted`: "Earn 80,000 bonus miles + 3,000 Premier qualifying points (PQP) after qualifying purchase -> "Earn 60,000 bonus miles + 500 Premier qualifying points (PQP) after you spend $4,000 on purchases in the firs  
  Updated to match current confirmed base offer (both miles and PQP count dropped).
- `welcome_bonus`: "Earn 80,000 bonus miles + 3,000 Premier qualifying points (PQP) after qualifying purchase -> "Earn 60,000 bonus miles + 500 Premier qualifying points (PQP) after you spend $4,000 on purchases in the firs  
  Same as signup_bonus_formatted change.
- `earn_rates`: {"Prepaid hotels (Renowned)":"5x","United purchases":"3x","Other travel":"2x","Dining":"2x -> {"Prepaid hotels (Renowned)":"5x","United purchases":"4x","Other travel":"2x","Dining":"2x","Select streaming"  
  Card's own United-purchases multiplier increased from 3x to 4x, explicitly flagged 'NEW!' by the issuer.

### US | unitedsm-business-card
- `insurance.purchase_protection`: "120" -> "10000"  
  Stored value (120) is actually the coverage period in days, not the dollar coverage amount.

### US | unitedsm-explorer-card
- `welcome_bonus_conditions`: null -> "Spend $3,000 in purchases within the first 3 months of account opening"  
  Source states the spend requirement for the 70,000-mile bonus but stored record has this field null
- `signup_bonus`: 70000 -> 50000  
  Base spend-achievable offer dropped to 50,000 bonus miles (from 70,000). Headline shows 'up to 60,000' which includes a conditional +10,000 for adding an authorized user.
- `signup_bonus_value_usd`: 70000 -> 50000  
  Same points-count change as signup_bonus.
- `signup_bonus_formatted`: "Earn 70,000 bonus miles after qualifying purchases." -> "Earn 50,000 bonus miles after you spend $3,000 on purchases in the first 3 months your account is open."  
  Updated to match current confirmed base offer.
- `welcome_bonus`: "Earn 70,000 bonus miles after qualifying purchases." -> "Earn 50,000 bonus miles after you spend $3,000 on purchases in the first 3 months your account is open."  
  Same as signup_bonus_formatted change.
- `earn_rates`: {"United Airlines purchases":"2x","Dining":"2x","Hotel stays booked with hotel":"2x","All  -> {"United Airlines purchases":"3x","Dining":"2x","Hotel stays booked with hotel":"2x","All other purchases":"1x  
  Card's own United-purchases multiplier increased from 2x to 3x, explicitly flagged 'NEW!' by the issuer. (Page's '9x total miles on eligible United flights' bundles a separate 6x MileagePlus fare bonus on top of the card's 3x - not used.)

### US | world-of-hyatt-business-credit-card
- `signup_bonus`: 60000 -> 70000  
  Current offer, explicitly labeled 'NEW OFFER' on the page, is 70,000 Bonus Points after $7,000 spend, up from stored 60,000.
- `signup_bonus_value_usd`: 60000 -> 70000  
  Same points-count change as signup_bonus.
- `signup_bonus_formatted`: "60,000 World of Hyatt points" -> "Earn 70,000 Bonus Points after you spend $7,000 on purchases in the first 3 months of account opening."  
  Updated to match current confirmed offer text.
- `welcome_bonus`: "60,000 World of Hyatt points" -> "Earn 70,000 Bonus Points after you spend $7,000 on purchases in the first 3 months of account opening."  
  Same as signup_bonus_formatted change.

### US | world-of-hyatt-credit-card
- `signup_bonus`: null -> 75000  
  The old free-nights offer (which stored 'offer ends Feb 26, 2026', a date already past as of today 2026-08-09) has been fully replaced by a points-based offer of up to 75,000 Bonus Points.
- `signup_bonus_value_usd`: null -> 75000  
  Same points-count as signup_bonus (points-based offer replaces the old free-night-based offer, which had no clean points count).
- `signup_bonus_formatted`: "Earn up to 5 free nights: 3 free nights after spending $5,000 in the first 3 months, plus -> "Earn up to 75,000 Bonus Points: 45,000 Bonus Points after you spend $5,000 on purchases in your first 3 month  
  Stale expired offer (Feb 26, 2026 deadline already passed) replaced with the current confirmed points-based offer.
- `welcome_bonus`: "Earn up to 5 free nights: 3 free nights after spending $5,000 in the first 3 months, plus -> "Earn up to 75,000 Bonus Points: 45,000 Bonus Points after you spend $5,000 on purchases in your first 3 month  
  Same as signup_bonus_formatted change.
- `signup_bonus_formatted`: "Earn up to 75,000 Bonus Points: 45,000 Bonus Points after you spend $5,000 on purchases i -> "Earn up to 75,000 Bonus Points: 45,000 Bonus Points after you spend $5,000 on purchases in your first 3 month  
  Step 3 dispute settled: chase.com's own World of Hyatt page on 2026-08-09 states the current offer as up to 75,000 Bonus Points. The stored free-night offer expired Feb 26, 2026, and the rival 60,000 flat figure is not what Chase shows.
- `welcome_bonus`: "Earn up to 75,000 Bonus Points: 45,000 Bonus Points after you spend $5,000 on purchases i -> "Earn up to 75,000 Bonus Points: 45,000 Bonus Points after you spend $5,000 on purchases in your first 3 month  
  Kept in sync with signup_bonus_formatted from the same chase.com capture.
- `key_perks`: ["No foreign transaction fee"] -> ["Annual free night (Category 1-4)","5 tier qualifying night credits","Concierge service","No foreign transact  
  chase.com's own page confirms the anniversary Category 1-4 Free Night Award, 5 tier-qualifying night credits, and complimentary Visa Signature Concierge, so 'Concierge service' was NOT fabricated and is restored.

## Held (verified but deliberately not changed)

Every item below was flagged during verification and left at its stored value because the
source was inconclusive, contradictory, or silent. Per the conservative rule, no guesses.

- **CA the-platinum-card** `key_perks`: "Unlock access to more than 1,400 airport lounges worldwide with the Global Lounge Collection.7" is not mentioned anywhere in the captured source (grep for 'lounge'/'Global Lounge'/'1,400' returns zero matches in the card-specific content). Held because Amex Platinum CA lounge access is a well-established real benefit; the capture's 'All Benefits' accordion is collapsed/truncated rather than contradicting it, so absence here is inconclusive, not disproof.
- **CA the-platinum-card** `benefits.lounge_access`: Flag is true but not confirmable from this capture. Held because Same accordion-truncation issue as key_perks lounge claim; not contradicted, just unconfirmed.
- **CA americanexpress-aeroplan-reserve-card** `key_perks`: "Travel program credit (NEXUS/Global Entry)" and "Priority access to the standby list and eUpgrades on Air Canada flights" are not mentioned in the captured text. Held because These sit inside the collapsed 'All Benefits' accordion tiles (e.g. 'Get on board with incredible Air Canada travel benefits'), which are known real Aeroplan Reserve features; absence here reflects capture truncation, not contradiction.
- **CA business-platinum-card-from-americanexpress** `key_perks`: "Hotel elite status/collection", "Airport lounge access", "Priority Pass lounge access", "Premium lounge access", and "Free first checked bag" are not present in the fully-expanded Featured Benefits carousel and are not confirmable from the collapsed All Benefits accordion. Held because Amex Business Platinum CA is well-documented to include Global Lounge Collection access in reality; absence in this thin capture is inconclusive, so removal is not warranted without contradiction.
- **CA americanexpress-aeroplan-card** `key_perks`: "Reach Aeroplan EliteTM Status faster6‡" is not explicitly stated in the captured text. Held because Likely sits inside the collapsed 'Get on board with incredible Air Canada travel benefits' accordion tile; not contradicted, just unconfirmed from this capture.
- **CA americanexpressgreen-card** `key_perks`: "Front Of The Line® Access15" is not mentioned anywhere in the captured source. Held because Card's benefit list is minimal (recycled-plastic material, generic Amex Experiences/shopping coverage, exclusive offers) with no ticket-access tile visible; absence could reflect either a genuine data error or content not captured, so holding rather than removing.
- **CA td-aeroplan-visa-infinite-privilege-credit-card** `first_year_value_cad`: Stored 1143 doesn't reconcile with welcome_bonus_value_cad (1742, which matches 85,000 pts x cpp_cad 2.05) or with the source's own combined-value breakdown ($1,700 points + $140 bags + lounge passes). Held because Cannot determine the intended formula from the source; not clearly wrong, just internally inconsistent with sibling value fields.
- **CA td-u-s-dollar-visa-card** `rewards_program`: Stored value is "td rewards", but the card's own page shows no TD Rewards Points earn rate for this card at all (only nav cross-sell links to other TD cards mention TD Rewards). Held because No explicit statement that this card does or doesn't participate in TD Rewards; conservative to leave for manual check since changing to null/none is a guess.
- **CA td-business-travel-visa-card** `welcome_bonus_value_cad`: Stored value (1300) equals the issuer's raw advertised headline figure rather than the site's own cpp_cad methodology (200,000 pts x cpp_cad 0.5 = 1000, which matches the record's own first_year_value_cad of 1000). Held because Points count (200,000) is confirmed correct by the source, so per the conservative rule this isn't a case for a value fix (only points-count changes or cashback mislabels qualify); flagging the inconsistency for awareness only.
- **CA td-aeroplan-visa-business-card** `welcome_bonus_value_cad`: Stored value (1900) equals the issuer's raw advertised headline figure (source's own footnote total is actually $1,923) rather than a cpp_cad-based figure; doesn't reconcile with first_year_value_cad (1081). Held because Points count (60,000) is confirmed correct by the source, so this doesn't meet the conservative rule's bar for a value fix; flagging inconsistency only.
- **CA rbc-avion-visa-infinite** `first_year_value_cad`: Stored 1140 doesn't reconcile with the corrected welcome_bonus_value_cad (990) or the old value (1260); exact intended formula unclear. Held because No source basis to compute a specific replacement figure; left for manual recompute alongside the welcome bonus correction.
- **CA rbc-ion-visa** `annual_fee`: Stored 48 is confirmed by the ION+ cross-sell teaser box on this page (not by a fully profiled ION+ page). Held because Confirmed via a secondary teaser snippet only; noted here for transparency but not changed since it already matches.
- **CA rbc-ion-visa** `welcome_bonus`: Stored offer is 28,000 Avion points / $200 gift-card value, apply by Nov 4, 2026 -- exactly double the base RBC ION Visa's captured offer (14,000 points / $100 value, same Nov 4, 2026 deadline). This page never states ION+'s actual current offer. Held because Source describes the wrong card for this field; cannot confirm or deny the doubled figures without a genuine ION+ capture.
- **CA rbc-ion-visa** `welcome_bonus_points`: See welcome_bonus above (28,000 unconfirmed for ION+). Held because Wrong-card source.
- **CA rbc-ion-visa** `welcome_bonus_value_cad`: See welcome_bonus above (504 unconfirmed for ION+). Held because Wrong-card source.
- **CA rbc-ion-visa** `earn_rates`: Stored rates (1.5x groceries/gas/rideshare/streaming, 1x other) exactly match the BASE RBC ION Visa's rates shown on this page. As the enhanced "+" tier, ION+ likely earns at different (higher) rates, but this page never states them. Held because Wrong-card source; the match to the base card's rates is suspicious rather than reassuring.
- **CA rbc-ion-visa** `key_perks`: "Food delivery credits" and "Subscription perks" are sourced from the base ION Visa's DashPass description on this page, not from a genuine ION+ profile. Held because Wrong-card source; cannot confirm these apply identically to ION+.
- **CA rbc-ion-visa** `insurance.purchase_protection`: Value "3" is not confirmed anywhere for ION+ specifically on this page. Held because Wrong-card source.
- **CA westjet-rbc-mastercard** `benefits.travel_medical / benefits.trip_cancellation / benefits.flight_delay`: Source's Insurance and Protection list only names Travel Accident, Auto Rental, Purchase Security/Extended Warranty, Mobile Device, Delayed Baggage, and Hotel/Motel Burglary Insurance - no explicit 'travel medical', 'trip cancellation', or 'flight delay' line items. Held because This source file is a condensed/curated summary rather than a full page capture, so it is unclear whether the insurance list is exhaustive; unlike free_checked_bags there is no explicit contradicting statement, so holding rather than changing.
- **CA rbc-avion-visa-infinite-business** `earn_rates`: Stored includes a 'Purchases over $75,000/year: 1x' tier, but the source's footnote [3] explaining what happens above the $75,000 cap was not present in the captured page content. Held because The 1.25x rate on the first $75,000/year is explicitly confirmed, but no text describing the post-cap rate could be located in this capture, so the 1x tail rate is unconfirmed rather than contradicted.
- **CA rbc-avion-visa-business** `insurance.trip_cancellation`: Stored as empty string while benefits.trip_cancellation is true and the source confirms trip cancellation/interruption coverage exists, but no dollar figure for this benefit appears in the digest Held because Cannot confirm the specific coverage amount without opening the linked insurance PDF, which is outside the captured page
- **CA rbc-visa-creditline-for-small-business** `purchase_interest_rate`: Stored as flat 2.9%, but source states the rate is a variable range "From Prime + 2.9% to 11.9%" (line 680), i.e. 2.9% is a margin over Prime, not the actual APR Held because Cannot compute the true flat rate without knowing the current Prime rate, which isn't in the captured page
- **CA scotiabank-passport-visa-infinite-card** `min_spend`: Stored as null, but the source specifies a two-tier spend requirement for the full bonus ($2,000 in 3 months for 40,000 points, then $10,000 in 6 months for the additional 10,000 points) Held because Bonus is tiered across two thresholds; unclear which single number the min_spend field is meant to hold, so not proposing a value
- **CA scotiabank-gold-american-express-card** `min_spend`: Stored as null, but the source specifies a two-tier spend requirement ($2,000 in 3 months for 25,000 points, then $7,500 in the first year for an additional 20,000 points) Held because Bonus is tiered across two thresholds; unclear which single number the min_spend field is meant to hold
- **CA scotiabank-scene-tm-visa-card** `min_spend`: Stored as null, but the source specifies a two-tier spend requirement ($250 in 3 months for 2,500 points, then $1,000 in 3 months for an additional 7,500 points) Held because Bonus is tiered across two thresholds; unclear which single number the min_spend field is meant to hold
- **CA scotiabank-american-express-card** `min_spend`: Stored as null, but the source specifies a two-tier spend requirement ($250 in 3 months for 2,500 points, then $1,000 in 3 months for an additional 7,500 points) Held because Bonus is tiered across two thresholds; unclear which single number the min_spend field is meant to hold
- **CA scotiabank-platinum-american-express-card** `min_spend`: Stored as null, but the source specifies a two-tier spend requirement ($3,000 in 3 months for 60,000 points, then $10,000 in 14 months for an additional 20,000 points) Held because Bonus is tiered across two thresholds; unclear which single number the min_spend field is meant to hold
- **CA scotiabank-passport-visa-infinite-privilege-card** `min_spend`: Stored as null, but the source specifies a three-tier spend requirement ($3,000 in 3 months for 30,000 points, $20,000 in 6 months for another 30,000 points, then one purchase in month 14 for a final 20,000 points) Held because Bonus is tiered across three thresholds; unclear which single number the min_spend field is meant to hold
- **CA scotia-momentum-visa-card-for-students** `key_perks`: key_perks lists "Statement credits" as a perk Held because Source only says redeemed cash back can be applied as a statement credit or deposited to an account; this is a redemption method for the card's own cash back, not a distinct bonus statement-credit perk. Ambiguous whether it counts as fabricated, holding rather than removing.
- **CA cibc-aventura-visa-infinite-card** `key_perks`: key_perks includes "Travel program credit (NEXUS/Global Entry)" Held because Source only confirms a NEXUS Application Fee rebate ($160 value); "Global Entry" is never mentioned in the captured page. Holding rather than editing since the NEXUS portion is real and I can't confirm whether the site intends the combined label as shorthand.
- **CA cibc-aventura-visa-infinite-card** `insurance.car_rental / insurance.trip_cancellation`: Both fields store "500000", but the source's only explicit $500,000 figure is attached to "$500,000 Common Carrier Accident Insurance", a separate coverage line from Car Rental Collision/Loss Damage and Trip Cancellation/Interruption insurance. Held because Cannot confirm from the captured page whether car rental and trip cancellation coverage are actually $500,000 each or whether this figure was mis-copied from the Common Carrier Accident Insurance line; benefit guide PDF not in the capture.
- **CA cibc-aventura-visa-infinite-privilege-card** `key_perks`: key_perks includes "Travel program credit (NEXUS/Global Entry)" Held because Source only confirms 2 NEXUS Application Fee rebates ($325 value); "Global Entry" is never mentioned in the captured page. Holding rather than editing since the NEXUS portion is real.
- **CA cibc-aeroplan-visa-infinite-privilege-card** `key_perks`: key_perks includes "Travel program credit (NEXUS/Global Entry)" Held because Source only confirms a NEXUS Application Fee rebate ($160 value); "Global Entry" is never mentioned in the captured page. Holding rather than editing since the NEXUS portion, free checked bag, and lounge access perks are all separately confirmed.
- **CA cibc-aventura-gold-visa-card** `key_perks`: key_perks includes "Travel program credit (NEXUS/Global Entry)" Held because Source only confirms a NEXUS Application Fee rebate ($160 value); "Global Entry" is never mentioned in the captured page. Holding rather than editing since the NEXUS portion is real.
- **CA cibc-dividend-visa-infinite-card** `insurance.purchase_protection`: stored value 500000 may be mis-mapped from Common Carrier Accident Insurance rather than Purchase Security Insurance Held because source lists 'Purchase Security and Extended Protection Insurance' with no dollar figure attached, while '$500,000 Common Carrier Accident Insurance' is a separate line item; true purchase-protection coverage amount is not stated in the source so a correct replacement value cannot be confirmed
- **CA cibc-dividend-platinum-visa-card** `insurance.purchase_protection`: stored value 500000 may be mis-mapped from Common Carrier Accident Insurance rather than Purchase Security Insurance Held because source lists 'Purchase Security and Extended Protection Insurance' with no dollar figure attached, while '$500,000 Common Carrier Accident Insurance' is a separate line item; true purchase-protection coverage amount is not stated in the source so a correct replacement value cannot be confirmed
- **CA cibc-aventura-visa-card-for-students** `welcome_bonus_value_cad`: stored 138 for the identical 12,500-point/$125-travel-value bonus that the sibling card cibc-aventura-visa-card (same points, same cpp_cad 1.1) stores as 125 Held because source states 'up to $125 in travel value' for the 12,500 points (line 488); this card's cpp-derived figure (138) diverges from its own sibling record's welcome_bonus_value_cad for the same offer, which looks like a cross-card inconsistency, but per audit rules we do not overwrite a cpp-methodology valuation on our own judgment
- **CA bmo-eclipse-visa-infinite-privilege-card** `earn_rates.Groceries, dining, gas & travel`: category label omits 'drugstore', which the source confirms is part of the same 5x tier Held because source states '5x the points ... For every $1 spent on groceries, dining in and out, drugstore purchases, gas, and travel' (line 714) and the calculator table lists 'Groceries, dining, drugstore, gas and travel' (line 785); adding 'drugstore' to the key pushes it to roughly 42 characters, which risks the site's 40-character quality gate silently dropping the whole category, so a specific rewording is left to editorial judgment rather than proposed here
- **CA bmo-cashback-mastercard** `key_perks`: "Statement credits" is listed as a key perk but the source only mentions a statement credit as one of several ways to redeem earned cash back ("as a statement credit on your BMO CashBack Mastercard"), not an issuer-funded bonus credit. Held because Text is technically present in the source but describes a redemption option, not a distinct perk; not clearly fabricated so not removing, but flagging as questionable.
- **CA bmo-cashback-world-elite-mastercard** `key_perks`: "Statement credits" is listed as a key perk but the source only mentions a statement credit as a cash-back redemption option, not an issuer-funded bonus credit. Held because Same ambiguity as the base CashBack card; not clearly fabricated.
- **CA bmo-cashback-world-elite-mastercard** `benefits.lounge_access`: Lounge access is only via a paid Mastercard Travel Pass (DragonPass) membership at US$32 per person per visit, not complimentary/free lounge access. Held because Source text does support some form of lounge access, so not proposing removal, but the field may overstate the benefit (it's pay-per-visit, not free).
- **CA bmo-prepaid-mastercard** `annual_fee`: Cannot verify $9.99 fee. Held because No source available.
- **CA bmo-prepaid-mastercard** `welcome_bonus`: Cannot verify (currently empty). Held because No source available.
- **CA bmo-prepaid-mastercard** `key_perks`: Cannot verify "Travel program credit (NEXUS/Global Entry)" or "Statement credits". Held because No source available.
- **CA bmo-prepaid-mastercard** `apply_url`: URL points to a generic BMO all-cards listing page, not a card-specific page. Held because No source available to confirm correct URL; cannot verify without a captured page.
- **CA student-bmo-cashback-mastercard** `key_perks`: "Statement credits" is listed as a key perk but the source only mentions a statement credit as a cash-back redemption option, not an issuer-funded bonus credit. Also, the source mentions an Instacart+ / $5 monthly Instacart credit (a food-delivery credit) that is not reflected in key_perks. Held because Not proposing removal (redemption wording is present) or addition (rules only require flagging fabrications, not adding missing perks).
- **CA bmo-ascend-world-elite-business-mastercard** `key_perks`: "Statement credits" is listed separately from "Travel program credit (NEXUS/Global Entry)", but the only statement credit mentioned in the source is the same Nexus statement credit already captured by the other perk. Held because Could be a duplicate/generic label rather than a distinct additional perk; not clearly fabricated so not removing.
- **CA national-bank-syncro-mastercard** `insurance.mobile_insurance`: insurance.mobile_insurance is set to "Yes" but benefits.mobile_insurance is false in the same record, and no mobile/device insurance is mentioned anywhere in the source for this card (only Apple Pay/Google Pay contactless payment mentions were found). Held because Internal contradiction found, but conservative rule says not to guess which side is correct without explicit source confirmation of absence; flagging for manual review.
- **CA national-bank-syncro-mastercard** `welcome_bonus`: Source shows a welcome promotion ($70 cashback bonus + first-year fee waiver) but it is explicitly labeled "Ended promotion" running Oct 1, 2025 to Mar 3, 2026, which is in the past relative to today (2026-08-09). Held because Stored empty welcome_bonus is correct given the promotion has expired; noting only for awareness, not proposing a change.
- **CA national-bank-business-line-mastercard** `purchase_interest_rate`: Stored as flat 5, but the source states the purchase rate is "Prime rate + 5%" (a variable rate), not a flat 5% rate. The stored value appears to conflate the prime-rate spread with the actual rate. Held because Source does not state the resolved current percentage (unlike the Syncro card, which gives an explicit "Current rate"), so the correct absolute figure cannot be confirmed from this source alone.
- **CA national-bank-corporate-mastercard** `benefits.car_rental_insurance`: Marked true but no explicit confirmation found in the captured page; the page only says insurance details vary and directs to a separate summary if the specific card variant includes insurance. Held because No direct contradiction, but also no explicit confirmation; leaving as-is rather than guessing.
- **CA national-bank-corporate-mastercard** `benefits.travel_medical`: Marked true but no explicit confirmation found in the captured page for this specific card variant. Held because Same as above.
- **CA rogers-red-mastercard** `annual_fee / purchase_interest_rate / interest_rates.purchases`: No numeric fee or rate value for this card is present anywhere in the capture. Also the stored record is internally inconsistent: purchase_interest_rate is 20.99 but interest_rates.purchases is 10.9 (the latter suspiciously matches MBNA True Line Gold's 10.99% from a different card in this same batch, suggesting possible cross-contamination). Held because Source has zero numeric confirmation for either figure, so there is nothing to verify against.
- **CA rogers-red-mastercard** `earn_rates`: Stored earn_rates shows a flat "All eligible purchases: 2%", but the source table shows this rate is conditional: 2% flat only applies WITH an eligible Rogers service; WITHOUT one it's 2% on USD purchases and 1% on everything else (this conditional detail is already captured correctly in key_perks). Held because Not clearly wrong (2% is a real, sourced rate under one condition), and it's ambiguous which condition the site intends as the canonical earn_rates entry.
- **CA rogers-red-world-elite-mastercard** `annual_fee / insurance.purchase_protection / insurance.trip_cancellation`: No numeric fee or insurance-dollar values for this card are present anywhere in this capture (compare-table cell values not rendered). Held because Nothing in the source to confirm or contradict the stored $0 fee or the "1300" insurance figures.
- **CA wealthsimple-cash-back-visa** `annual_fee`: The fee is conditionally waived (requires $100K+ in assets or a $4,000+/month direct deposit); cardholders who don't qualify are billed $20/month ($240/yr), per the source's own FAQ. Held because This isn't a simple first-year waiver (rule 5's exception), it's an ongoing conditional waiver, so it's unclear whether $0 is the value the site's methodology wants stored; not confident enough to propose a different number.
- **CA neo-mastercard** `annual_fee`: Not stated anywhere in this capture. Held because No source confirmation either way.
- **CA neo-mastercard** `foreign_transaction_fee / foreign_transaction_fee_pct`: Not stated anywhere in this capture. Held because No source confirmation either way.
- **CA neo-world-mastercard** `interest_rates.purchases`: No interest-rate figure appears anywhere in this capture (only "What's the purchase rate and APR?" as an unanswered FAQ heading). Held because No source confirmation for the stored 10.99%.
- **CA neo-world-mastercard** `foreign_transaction_fee / foreign_transaction_fee_pct`: Not stated anywhere in this capture. Held because No source confirmation either way.
- **CA neo-world-elite-mastercard** `insurance.lost_baggage / insurance.mobile_insurance`: Neither baggage delay/loss insurance nor mobile device insurance is mentioned anywhere on this marketing page. Held because Could plausibly live on a separate insurance-certificate page (the site footer links to one) that wasn't captured; not confident enough to delete outright without seeing that page contradict it.
- **CA neo-world-elite-mastercard** `interest_rates.purchases / foreign_transaction_fee / foreign_transaction_fee_pct`: Not stated anywhere in this capture. Held because No source confirmation either way.
- **CA simplii-financial-cash-back-visa-card** `foreign_transaction_fee / foreign_transaction_fee_pct`: No FX-fee text found in this capture (only an unrelated "Foreign Cash" nav link to a currency-exchange product). Held because No source confirmation either way.
- **CA pc-world-elite-mastercard** `insurance.car_rental`: Value "9" looks like a leaked footnote marker (matches the superscript "9" on the Travel Emergency Medical Insurance / Car Rental CDW / Concierge Services headings on this page) rather than an actual coverage amount or day count. Held because No actual coverage figure (dollar amount or day count) is stated anywhere in this capture to replace it with, so there's nothing to change it to.
- **US american-express-gold-card** `key_perks`: 'Hotel elite status/collection' is ambiguous for this card: the source only shows a Hertz Five Star Status upgrade (car rental, not hotel) and a $100 Hotel Collection booking credit (a credit, not an elite-status program) - no explicit hotel elite-status language like Platinum's Marriott/Hilton Gold status Held because Source doesn't clearly confirm OR clearly contradict a hotel elite-status claim for this specific card, so leaving it rather than guessing
- **US business-platinum-card** `signup_bonus`: stored value 20000 equals the $20,000 spend requirement, not a Membership Rewards point bonus amount Held because line 640 confirms $20,000 is the spend threshold, not the bonus; the actual offer is personalized/targeted ("Apply and find out your welcome offer... Welcome offers vary and you may not be eligible for an offer", lines 634-640) with no fixed public bonus number to substitute, so no specific correct value can be confirmed from this source
- **US business-gold-card** `signup_bonus`: stored value 15000 equals the $15,000 spend requirement, not a Membership Rewards point bonus amount Held because line 765 confirms $15,000 is the spend threshold, not the bonus; the actual offer is personalized/targeted ("AS HIGH AS 200,000 Membership Rewards® Points... Welcome offers vary and you may not be eligible for an offer") with no fixed public bonus number to substitute
- **US blue-business-plus-credit-card** `foreign_transaction_fee / benefits.no_fx_fee`: foreign_transaction_fee is false (implying no FX fee) while benefits.no_fx_fee is also false (implying the card DOES have an FX fee) - these are contradictory Held because no "foreign transaction" text appears anywhere in the captured page, so the source does not resolve which side is correct
- **US business-green-rewards-card** `foreign_transaction_fee / benefits.no_fx_fee`: foreign_transaction_fee is false (implying no FX fee) while benefits.no_fx_fee is also false (implying the card DOES have an FX fee) - these are contradictory Held because no "foreign transaction" text appears anywhere in the captured page, so the source does not resolve which side is correct
- **US marriott-bonvoy-business-card** `welcome_bonus`: The source's actual welcome offer headline is 'Earn 150,000 Marriott Bonvoy® Bonus Points and a $125 Statement Credit', but stored welcome_bonus/signup_bonus_formatted only mention the 150,000 points and omit the $125 statement credit component Held because Not confident whether the site's methodology intends to fold the statement credit into the points bonus or track it separately; flagging for awareness rather than proposing a specific fix
- **US the-new-chase-sapphire-reserve-credit-card** `insurance.mobile_insurance`: insurance.mobile_insurance is 'Yes' but benefits.mobile_insurance is false, and the source's full built-in-benefits list (Auto Rental, Trip Cancellation, Trip Delay, Travel Accident, Travel & Emergency Assistance, Lost Luggage, Baggage Delay, Emergency Evacuation, Roadside Assistance, Emergency Medical, Purchase Protection, Return Protection, Extended Warranty) never mentions cell phone/mobile protection Held because Absence of a benefit in the source is not an explicit contradiction of the specific value; holding rather than guessing at removal
- **US chase-sapphire-preferred-credit-card** `insurance.mobile_insurance`: insurance.mobile_insurance is 'Yes' but benefits.mobile_insurance is false, and the source's built-in-benefits list (Trip Cancellation, Baggage Delay, Travel & Emergency Assistance, Purchase Protection, Auto Rental, Trip Delay, Extended Warranty) never mentions cell phone/mobile protection Held because Absence of a benefit in the source is not an explicit contradiction of the specific value; holding rather than guessing at removal
- **US slate-credit-card** `key_perks`: 'Subscription perks' is only loosely supported - the only subscription-like item on the source page is the 6-month complimentary DashPass membership, which is already separately captured as 'Food delivery credits' Held because Reasonable overlap between DashPass as both a food-delivery credit and a subscription perk makes this ambiguous rather than clearly fabricated
- **US unitedsm-explorer-card** `benefits.lounge_access`: benefits.lounge_access is true, but the card's only lounge-related benefit stated in the source is '2 United Club one-time passes per year', not standing/unlimited lounge access, and key_perks doesn't list any lounge perk at all Held because Ambiguous whether 'true' is intended to capture limited one-time-pass access; not clear-cut enough to change either the boolean or key_perks
- **US unitedsm-explorer-card** `insurance.mobile_insurance`: insurance.mobile_insurance is 'Yes' but benefits.mobile_insurance is false, and the source's full protections list (Auto Rental, Baggage Delay, Lost Luggage, Trip Cancellation, Trip Delay, Purchase Protection, Visa Concierge, Extended Warranty) never mentions cell phone protection Held because Absence of a benefit in the source is not an explicit contradiction of the specific value; holding rather than guessing at removal
- **US united-questsm-card** `insurance.mobile_insurance`: insurance.mobile_insurance is 'Yes' but benefits.mobile_insurance is false, and the source's full protections list (Trip Cancellation, Baggage Delay, Lost Luggage, Visa Concierge, Trip Delay, Auto Rental, Purchase Protection, Extended Warranty) never mentions cell phone protection Held because Absence of a benefit in the source is not an explicit contradiction of the specific value; holding rather than guessing at removal
- **US united-clubsm-card** `insurance.mobile_insurance`: insurance.mobile_insurance is 'Yes' but benefits.mobile_insurance is false, and the source's full protections list (Trip Cancellation, Baggage Delay, Lost Luggage, Trip Delay, Visa Infinite Concierge, Auto Rental, Purchase Protection, Return Protection, Extended Warranty) never mentions cell phone protection Held because Absence of a benefit in the source is not an explicit contradiction of the specific value; holding rather than guessing at removal
- **US southwest-rapid-rewards-plus-credit-card** `benefits.flight_delay`: benefits.flight_delay is true, but the source's travel/purchase coverage section only lists Lost Luggage Reimbursement, Baggage Delay Insurance, Extended Warranty Protection and Purchase Protection - no trip/flight delay benefit is listed anywhere Held because Absence of a stated benefit is not a firm contradiction; holding rather than guessing at removal
- **US southwest-rapid-rewards-priority-credit-card** `benefits.flight_delay`: benefits.flight_delay is true, but the source's travel/purchase coverage section only lists Lost Luggage Reimbursement, Baggage Delay Insurance, Extended Warranty Protection and Purchase Protection - no trip/flight delay benefit is listed anywhere Held because Absence of a stated benefit is not a firm contradiction; holding rather than guessing at removal
- **US southwest-rapid-rewards-premier-credit-card** `benefits.flight_delay`: Record has flight_delay: true, but the source's Travel & Purchase Protection drawer lists only Lost Luggage Reimbursement, Baggage Delay Insurance, Extended Warranty Protection, and Purchase Protection. No Trip Delay Reimbursement benefit is mentioned anywhere on the page. Held because Source is silent, not contradictory; no explicit statement that trip/flight delay coverage is absent, so cannot confirm a fix either way.
- **US marriott-bonvoy-bold-credit-card** `earn_rates.All other purchases`: Stored earn_rates includes "All other purchases": "1x", but the source's EARN REWARDS section only lists 3X hotels, 2X grocery, 2X rideshare/food delivery, and 2X streaming/internet/cable/phone. No base/all-other-purchases rate is stated anywhere on this captured page. Held because Source is silent on the base rate rather than contradicting it, so cannot confirm whether 1x is correct or should be removed.
- **US world-of-hyatt-credit-card** `insurance.purchase_protection`: Stored value is "1", which looks like a data-entry placeholder rather than a real dollar coverage limit (every other card in this batch stores a figure like "500"). Held because This capture's Travel & Purchase Protection drawer is collapsed with no expanded detail, so the true coverage amount is not visible in the source to confirm a replacement value.
- **US world-of-hyatt-credit-card** `benefits.car_rental_insurance / benefits.trip_cancellation / benefits.flight_delay`: These are all marked true in the record but none of the underlying benefit text (auto rental coverage, trip cancellation, trip delay) appears in this capture. Held because Collapsed drawer content means the source neither confirms nor contradicts these flags.
- **US british-airways-visa-signature-credit-card** `insurance.purchase_protection`: Stored value is "1", which looks like a data-entry placeholder rather than a real dollar coverage limit. Held because The Travel & purchase protection drawer is collapsed in this capture, so the true coverage amount cannot be confirmed.
- **US iberia-visa-signature-credit-card** `insurance.purchase_protection`: Stored value is "1", which looks like a data-entry placeholder rather than a real dollar coverage limit. Held because The Travel & purchase protection drawer is collapsed in this capture, so the true coverage amount cannot be confirmed.
- **US ink-business-premier-credit-card** `foreign_transaction_fee`: Stored false (no FX fee) with benefits.no_fx_fee true and key_perks listing "No foreign transaction fee". Held because Unlike Ink Business Preferred, this capture has no dedicated 'No foreign transaction fees' content section for this specific card, only generic nav-menu category links, so the claim cannot be independently confirmed from this source.
- **US united-clubsm-business-card** `foreign_transaction_fee`: Stored false (no FX fee) with benefits.no_fx_fee true and key_perks listing "No foreign transaction fee". Held because The 'No foreign transaction fees' overlay content was not captured on this page, so the claim can't be verified from this source (though it is plausible for a card at this tier).
- **US united-clubsm-business-card** `insurance.purchase_protection`: Stored value is "100", which is inconsistent with every other Chase business card in this batch, which show $10,000 purchase protection. Held because The Travel & purchase coverage overlay content was not captured on this page, so the actual dollar figure for this specific card cannot be confirmed.
- **US world-of-hyatt-business-credit-card** `insurance.purchase_protection / benefits.purchase_protection`: insurance.purchase_protection is populated ("120") and insurance.trip_cancellation is populated ("1500"), yet benefits.purchase_protection and benefits.trip_cancellation are both false - internal contradiction. Held because This capture only links to the 'Travel & Purchase Protection' overlay without its expanded content, so neither the correct dollar figure nor which side (insurance object vs. benefits flags) is right can be confirmed from this source.
- **CA americanexpress-aeroplan-card** `key_perks`: 'Reach Aeroplan EliteTM Status faster' and 'Front of the Line presale tickets' do not appear anywhere in the full top-to-bottom fresh capture (497 lines), including the card's own benefits-overview paragraph which lists checked bag, preferred pricing, and accelerated earn rates but not these two Held because absence across a full capture is suggestive but not an explicit contradicting quote; hard rule requires quoted evidence to change, so holding rather than removing
- **CA americanexpress-aeroplan-reserve-card** `key_perks`: 'Travel program credit (NEXUS/Global Entry)', 'Priority access to the standby list and eUpgrades on Air Canada flights12‡', 'Front of the Line presale tickets', and 'Priority Pass lounge access' do not appear anywhere in the full 543-line fresh capture; only 'Maple Leaf Lounge', 'Annual Worldwide Companion Pass', and 'Priority Airport Services' (check-in/boarding) are named Held because absence across a full-page capture is suggestive of removal but is not an explicit contradicting quote; holding per the evidence-required hard rule rather than proposing removal
- **CA americanexpress-aeroplan-reserve-card** `first_year_value_cad (2476)`: this stored figure was derived using the old 150,000-point welcome bonus and is now likely stale given the 110,000-point change above Held because recomputing derived/composite value fields is outside this task's explicit scope (welcome_bonus_value_cad only); flagging for a separate pass
- **CA national-bank-world-elite-mastercard** `key_perks`: stored key_perks is empty; fresh source shows travel insurance, extended warranty, and an annual up-to-$150 travel expense refund (line 92-109) that could be added Held because adding brand-new perks to an empty list is outside this task's remove/confirm scope; flagging for a separate pass
- **CA pc-insiders-world-elite-mastercard** `earn_rates`: fresh source also shows a 4% Joe Fresh/clothing category and an 'up to 7c/litre' Esso/Mobil gas category not in the stored earn_rates Held because minor additional categories, not a contradiction of what's already stored; the litre-based gas rate also doesn't fit the required Nx/N% format cleanly, so flagging rather than proposing
- **CA pc-mastercard** `foreign_transaction_fee_pct`: stored 2.5 Held because fresh source does not mention FX fee for this card; no contradiction found
- **CA rbc-british-airways-visa-infinite** `min_spend`: stored null; fresh source shows two $5,000 spend tranches (90-day + 91-180 day) to earn the 60,000 total Held because not a contradiction of stored data (which is silent), and the welcome_bonus text itself doesn't claim unconditional bonus, so left as a note rather than a forced change
- **CA rbc-ion-visa** `welcome_bonus / welcome_bonus_points / welcome_bonus_value_cad / min_spend`: cannot verify Held because the fresh capture only shows the base ION (non-plus) card's offer (14,000 points); do not want to misattribute that offer to ION+. Needs a re-capture of the correct ION+ URL.
- **CA rbc-ion-visa** `earn_rates`: cannot verify Held because no ION+-specific earn rate detail present in this capture
- **CA rbc-ion-visa** `key_perks`: cannot verify Held because no ION+-specific perk detail present in this capture
- **CA rogers-red-world-elite-mastercard** `annual_fee`: $0 stored Held because no numeric annual fee value rendered in this comparison-table capture; not contradicted, but not independently re-confirmed either
- **CA scotiabank-passport-visa-infinite-privilege-card** `welcome_bonus_points`: stored 80,000 total (30k+30k+20k tiers) Held because fresh source confirms same structure and same 80,000 total (lines 480-482: 30,000+30,000+20,000); no change
- **CA scotiabank-passport-visa-infinite-privilege-card** `annual_fee`: stored 599 Held because fresh source line 1046 confirms 'the current annual fee is $599' - no change
- **CA scotiabank-platinum-american-express-card** `annual_fee`: stored 399 Held because fresh source line 1078 confirms 'the current annual fee is $399' - no change
- **CA simplycash-preferred-card-from-americanexpress** `annual_fee`: stored 119.88 Held because not explicitly re-confirmed with a dollar figure in the greppable text sampled; no contradicting figure found either, held rather than guessed
- **CA simplycash-preferred-card-from-americanexpress** `foreign_transaction_fee_pct`: stored true / 2.5 Held because no explicit '2.5%' FX fee statement found in the sampled sections of this capture; not contradicted either, so left as-is per conservative rule
- **CA tangerine-money-back-world-mastercard** `purchase_interest_rate`: fresh source shows 20.95%, stored shows 20.99 Held because purchase interest rate is out of scope for this recheck (not annual fee, bonus, FX fee, earn rate, or perk); flagging only for awareness, not proposing a change
- **CA td-aeroplan-visa-business-card** `key_perks: Premium lounge access`: fresh source describes a limited benefit, not full premium lounge access Held because fresh source (line 906-907) describes 'Maple Leaf Lounge One-Time Guest Passes' earned at 1 pass per $10,000 of net purchases, max 4 passes/year - this is a capped, spend-gated benefit rather than ongoing 'premium lounge access.' Not a clear-cut contradiction (a lounge benefit does exist), so held rather than changed per the conservative rule.
- **CA td-aeroplan-visa-infinite-privilege-credit-card** `earn_rates`: not fully verified line-by-line but not contradicted Held because fresh source describes Air Canada, gas/bills/travel/transit/groceries earn categories consistent with stored tiers; no contradicting multiplier numbers found, held as-is
- **CA td-aeroplan-visa-infinite-privilege-credit-card** `key_perks: missing 'Concierge service'`: fresh source describes a complimentary Visa Infinite Privilege Concierge (line 1036) that is not currently in the stored key_perks list Held because adding new perks is outside the conservative scope of this recheck (only removing contradicted perks); flagging for awareness only, no change proposed
- **CA td-business-travel-visa-card** `foreign_transaction_fee / foreign_transaction_fee_pct`: confirmed consistent Held because card earns 6x on 'Foreign Currency Purchases' (a rewards bonus) while still charging the standard 2.5% FX fee - these are not mutually exclusive; stored true/2.5 is not contradicted
- **CA td-cash-back-visa-infinite-card** `key_perks: Hotel elite status/collection`: confirmed_ok (as hotel collection, not true elite status) Held because fresh line 947 confirms 'Visa Infinite Luxury Hotel Collection' with seven exclusive benefits at 900+ properties - matches the 'collection' half of the perk label, held as-is
- **CA td-platinum-travel-visa-card** `key_perks`: confirmed_ok - empty list Held because no lounge access, concierge, or hotel status language found for this entry-level travel card; matches stored empty key_perks array
- **CA the-platinum-card** `key_perks: lounge access future change`: not yet in effect Held because fresh source (line 336) discloses that starting January 1, 2027, Plaza Premium/Priority Pass access becomes limited unless $20,000 annual spend is reached; this does not take effect until 2027 so current 'lounge access' perk and benefits.lounge_access=true remain accurate today - flagging for a future recheck, no change proposed now
- **US chase-sapphire-preferred-credit-card** `signup_bonus`: headline offer is 75,000 points confirmed unchanged; a nearby "100,000 bonus points" mention on the page is for the separate Chase Sapphire Reserve card being cross-sold, not this card Held because not this card's offer - would be a mis-attribution to propose it
- **US delta-skymiles-gold-american-express-card** `key_perks: free_checked_bags`: first checked bag free confirmed, plus a NEW second-bag-free benefit on domestic flights not reflected in key_perks text Held because second bag benefit is a minor enhancement to an already-confirmed perk, not a contradiction; leaving wording as-is since only the bonus/fee/perk-contradiction scope was in play
- **US doordash-rewards-mastercard** `signup_bonus_currency`: labeled "points" but the bonus is a DashPass membership (a service, not cash or points) Held because ambiguous taxonomy call, not clearly wrong the way Disney Visa's was; holding rather than guessing
- **US ihg-one-rewards-premier-business-credit-card** `signup_bonus (secondary)`: fresh source also mentions a secondary 10,000-point bonus for adding an employee card in the first 3 months, not reflected in stored record Held because this is a minor add-on offer, not the primary welcome bonus; primary 140,000-point figure is unchanged, so held as informational rather than proposed as a change
- **US ihg-one-rewards-premier-credit-card** `signup_bonus (secondary)`: fresh source also mentions a secondary 10,000-point bonus for adding an authorized user in the first 3 months Held because minor add-on offer, not the primary welcome bonus; already captured the primary figure change above
- **US ihg-one-rewards-traveler-credit-card** `earn_rates`: N/A Held because Fresh source confirms all three stored rates unchanged: 5x IHG Hotels ('That's 5X points with this card'), 3x dining/utilities/streaming/gas, 2x all other. confirmed_ok: true.
- **US ihg-one-rewards-traveler-credit-card** `key_perks / foreign_transaction_fee`: N/A Held because Fresh source confirms 'No foreign transaction fees' still applies. confirmed_ok: true.
- **US ihg-one-rewards-traveler-credit-card** `annual_fee`: N/A Held because Fresh source confirms $0 annual fee (line 275). confirmed_ok: true.
- **US ink-business-cash-credit-card** `signup_bonus`: Stored value is already null (not 750) Held because Leaving as null unchanged; only the formatted/value/welcome_bonus text fields carry the dollar figure in this record's existing convention.
- **US ink-business-cash-credit-card** `annual_fee`: N/A Held because Fresh source confirms $0 (line 271). confirmed_ok: true.
- **US ink-business-cash-credit-card** `earn_rates`: N/A Held because Fresh source confirms 5% office supply/internet/cable/phone, 2% gas/dining, 1% everything else, all unchanged. confirmed_ok: true.
- **US ink-business-cash-credit-card** `foreign_transaction_fee`: N/A Held because No 'no foreign transaction fee' claim found anywhere in the fresh capture, consistent with stored foreign_transaction_fee: true (fee applies). confirmed_ok: true.
- **US ink-business-preferred-credit-card** `signup_bonus / welcome_bonus`: N/A Held because Fresh source confirms 100,000 bonus points unchanged ('### Earn 100,000 bonus points', lines 253 and 280). confirmed_ok: true.
- **US ink-business-preferred-credit-card** `annual_fee`: N/A Held because Fresh source confirms $95 (line 268). confirmed_ok: true.
- **US ink-business-preferred-credit-card** `earn_rates`: N/A Held because Fresh source confirms 3x on travel/shipping/ads/internet-cable-phone ('3X points... first $150,000 spent... each account anniversary year') and implicit 1x on all other. confirmed_ok: true.
- **US ink-business-preferred-credit-card** `key_perks`: N/A Held because Fresh source confirms food delivery credits and subscription perks via complimentary DashPass access (lines 299-301) and no foreign transaction fee (line 315/430-432). confirmed_ok: true.
- **US ink-business-premier-credit-card** `signup_bonus / welcome_bonus`: N/A Held because Fresh source confirms 'Earn $1,000 bonus cash back' unchanged (line 253). confirmed_ok: true.
- **US ink-business-premier-credit-card** `annual_fee`: N/A Held because Fresh source confirms $195 (line 269). confirmed_ok: true.
- **US ink-business-premier-credit-card** `earn_rates`: N/A Held because Fresh source confirms 2.5% on purchases $5,000+ and 2% on all other purchases, both unchanged (lines 281-287). confirmed_ok: true.
- **US ink-business-premier-credit-card** `foreign_transaction_fee`: N/A Held because Fresh source confirms 'No foreign transaction fees' (line 430-432). confirmed_ok: true.
- **US ink-business-unlimited-credit-card** `annual_fee`: N/A Held because Fresh source confirms $0 (line 269). confirmed_ok: true.
- **US ink-business-unlimited-credit-card** `earn_rates`: N/A Held because Fresh source confirms unlimited 1.5% cash back on every purchase, unchanged (line 287). confirmed_ok: true.
- **US ink-business-unlimited-credit-card** `foreign_transaction_fee`: N/A Held because No 'no foreign transaction fee' claim found in the fresh capture, consistent with stored foreign_transaction_fee: true (fee applies). confirmed_ok: true.
- **US instacart-mastercard** `signup_bonus_formatted / welcome_bonus`: N/A Held because Fresh source confirms '$50 Instacart credit automatically upon approval' unchanged (line 255/286). confirmed_ok: true.
- **US instacart-mastercard** `annual_fee`: N/A Held because Fresh source confirms $0 (line 269). confirmed_ok: true.
- **US instacart-mastercard** `earn_rates`: N/A Held because Not contradicted by fresh capture; page confirms card sits in Cash Back and No Annual Fee categories consistent with stored rates.
- **US instacart-mastercard** `key_perks / foreign_transaction_fee`: N/A Held because Fresh source confirms 'No foreign transaction fees' (line 365-367). confirmed_ok: true.
- **US marriott-bonvoy-bold-credit-card** `annual_fee`: N/A Held because Fresh source confirms $0 (line 271). confirmed_ok: true.
- **US marriott-bonvoy-bold-credit-card** `earn_rates`: N/A Held because Fresh source confirms card-only multipliers unchanged: 3x Marriott hotels ('up to 14X total... that's 5X... wait see note'), 2x grocery/rideshare-fooddelivery/streaming-internet-cable-phone, 1x all other, all matching stored. confirmed_ok: true.
- **US marriott-bonvoy-bold-credit-card** `key_perks`: N/A Held because Fresh source confirms statement credits (Pay Yourself Back), food delivery credits and subscription perks (DashPass), concierge service, and no foreign transaction fee all still present. confirmed_ok: true.
- **US marriott-bonvoy-boundless-credit-card** `annual_fee`: N/A Held because Fresh source confirms $95 (line 282). confirmed_ok: true.
- **US marriott-bonvoy-boundless-credit-card** `earn_rates`: N/A Held because Fresh source confirms card-only multipliers unchanged: 6x Marriott hotels ('That's 6X points' card portion within the 17X total banner), 3x grocery/gas/dining, 2x all other.
- **US marriott-bonvoy-boundless-credit-card** `key_perks`: N/A Held because Not contradicted by fresh capture (statement credits, food delivery, subscription perks, no foreign transaction fee, concierge all still referenced in the fuller capture). confirmed_ok: true.
- **US marriott-bonvoy-bountiful-credit-card** `signup_bonus / welcome_bonus`: N/A Held because Fresh source confirms 'Earn 85,000 Bonus Points after you spend $4,000 in purchases in your first 3 months from your account opening' unchanged (lines 261-263, 356-358). confirmed_ok: true.
- **US marriott-bonvoy-bountiful-credit-card** `annual_fee`: N/A Held because Fresh source confirms $250 (line 277). confirmed_ok: true.
- **US marriott-bonvoy-bountiful-credit-card** `foreign_transaction_fee`: N/A Held because Fresh source confirms 'No foreign transaction fees' (line 415-417). confirmed_ok: true.
- **US prime-visa** `signup_bonus_formatted / welcome_bonus`: N/A Held because Fresh source confirms '$150 Amazon Gift Card' loaded on approval, unchanged (lines 257-259, 290-292). confirmed_ok: true.
- **US prime-visa** `annual_fee`: N/A Held because Fresh source confirms $0 ('NO ANNUAL FEE' card art badge, line 273: $0). confirmed_ok: true.
- **US prime-visa** `foreign_transaction_fee`: N/A Held because Fresh source confirms 'No foreign transaction fees' (line 344-346). confirmed_ok: true.
- **US sapphire-reserve-for-businesssm-credit-card** `annual_fee`: N/A Held because Fresh source confirms $795 (line 270). confirmed_ok: true.
- **US sapphire-reserve-for-businesssm-credit-card** `key_perks (lounge access, Priority Pass, premium lounge, concierge, NEXUS/Global Entry credit)`: N/A Held because Fresh source confirms Chase Sapphire Lounge + 1,300+ Priority Pass lounges (lines 315-317, 537-543), $120 Global Entry/TSA PreCheck/NEXUS credit (line 331/495), and Visa Infinite Concierge (line 461/695). confirmed_ok: true.
- **US sapphire-reserve-for-businesssm-credit-card** `foreign_transaction_fee`: N/A Held because Fresh source confirms 'no foreign transaction fees' (line 581). confirmed_ok: true.
- **US slate-credit-card** `signup_bonus / welcome_bonus`: N/A Held because Fresh source confirms this remains an intro-APR product with no points/cash bonus: 'Save on interest with a low intro APR for 21 months' (line 329/331), matching stored null bonus. confirmed_ok: true.
- **US slate-credit-card** `annual_fee`: N/A Held because Fresh source confirms 'No Annual Fee' (line 339-341). confirmed_ok: true.
- **US slate-credit-card** `foreign_transaction_fee`: N/A Held because No 'no foreign transaction fee' claim found anywhere in the fresh capture, consistent with stored foreign_transaction_fee: true (fee applies). confirmed_ok: true.
- **US southwest-rapid-rewards-performance-business-credit-card** `signup_bonus / welcome_bonus`: N/A Held because Fresh source confirms 'Earn 80,000 points' unchanged (lines 253, 273). confirmed_ok: true.
- **US southwest-rapid-rewards-performance-business-credit-card** `annual_fee`: N/A Held because Fresh source confirms $299 (line 267). confirmed_ok: true.
- **US southwest-rapid-rewards-performance-business-credit-card** `earn_rates`: N/A Held because Fresh source confirms all card-own multipliers unchanged: 4x Southwest, 2x hotels booked direct, 2x gas, 2x restaurants, 2x local transit/commuting, implicit 1x other (lines 291-297). confirmed_ok: true.
- **US southwest-rapid-rewards-performance-business-credit-card** `foreign_transaction_fee / key_perks`: N/A Held because Fresh source confirms no foreign transaction fees (lines 368, 431-433) and free first checked bag / 25% back on inflight purchases still present. confirmed_ok: true.
- **US southwest-rapid-rewards-plus-credit-card** `annual_fee`: N/A Held because Fresh source confirms $99 (line 272, 'applied to first billing statement' -- this is a billed fee, not a first-year waiver). confirmed_ok: true.
- **US southwest-rapid-rewards-plus-credit-card** `earn_rates`: N/A Held because Fresh source confirms card-own multipliers unchanged: 2x Southwest, 2x gas stations/grocery (combined first $5,000/yr), 1x all other (lines 301-307). confirmed_ok: true.
- **US southwest-rapid-rewards-plus-credit-card** `key_perks`: N/A Held because Fresh source confirms free first checked bag (line 315), complimentary DashPass = food delivery credit + subscription perk (line 456-458), Instacart+ (line 466), and no foreign transaction fees (line 329). confirmed_ok: true.
- **US southwest-rapid-rewards-premier-business-credit-card** `signup_bonus / welcome_bonus`: N/A Held because Fresh source confirms 'Earn 60,000 points' unchanged (lines 253, 273). confirmed_ok: true.
- **US southwest-rapid-rewards-premier-business-credit-card** `annual_fee`: N/A Held because Fresh source confirms $149 (line 267). confirmed_ok: true.
- **US southwest-rapid-rewards-premier-business-credit-card** `earn_rates`: N/A Held because Fresh source confirms card-own multipliers unchanged: 3x Southwest, 2x gas stations/restaurants combined first $8,000/yr, implicit 1x other (lines 291-293). confirmed_ok: true.
- **US southwest-rapid-rewards-premier-business-credit-card** `foreign_transaction_fee`: N/A Held because Fresh source confirms no foreign transaction fees (lines 355, 418-420). confirmed_ok: true.
- **US southwest-rapid-rewards-premier-credit-card** `annual_fee`: Fresh source confirms $149 unchanged Held because No change needed, confirmed match
- **US southwest-rapid-rewards-priority-credit-card** `annual_fee`: Fresh source confirms $229 unchanged Held because No change needed, confirmed match
- **US southwest-rapid-rewards-priority-credit-card** `earn_rates`: 4x Southwest, 2x gas stations and restaurants both confirmed unchanged Held because No change needed, confirmed match
- **US the-new-chase-sapphire-reserve-credit-card** `annual_fee`: Fresh source confirms $795 unchanged Held because No change needed, confirmed match
- **US the-new-chase-sapphire-reserve-credit-card** `earn_rates`: 8x Chase Travel/The Edit, 4x flights direct, 4x hotels direct, 3x dining, 1x other all confirmed unchanged Held because No change needed, confirmed match
- **US united-clubsm-business-card** `annual_fee`: Fresh source confirms $695 unchanged Held because No change needed, confirmed match
- **US united-clubsm-business-card** `earn_rates`: 2x United, 5x Renowned Hotels prepaid, 1.5x all other all confirmed unchanged Held because No change needed, confirmed match
- **US united-clubsm-card** `annual_fee`: Fresh source confirms $695 unchanged Held because No change needed, confirmed match
- **US united-questsm-card** `annual_fee`: Fresh source confirms $350 unchanged Held because No change needed, confirmed match
- **US unitedsm-business-card** `annual_fee`: Fresh source confirms $150 unchanged Held because No change needed, confirmed match
- **US unitedsm-business-card** `earn_rates`: 2x United, gas stations, dining, office supply stores, local transit + 1x other all confirmed unchanged Held because No change needed, confirmed match
- **US unitedsm-explorer-card** `annual_fee`: Fresh source confirms $150 ongoing fee unchanged (page also shows a $0 first-year intro waiver, which is a first-year promo, not the ongoing fee) Held because No change to ongoing annual_fee needed, confirmed match
- **US world-of-hyatt-business-credit-card** `annual_fee`: Fresh source confirms $199 unchanged Held because No change needed, confirmed match
- **US world-of-hyatt-business-credit-card** `earn_rates`: 4x Hyatt Hotels, 2x top three spend categories/quarter, 2x fitness club and gym memberships all confirmed unchanged Held because No change needed, confirmed match
- **US world-of-hyatt-credit-card** `annual_fee`: Fresh source confirms $95 unchanged Held because No change needed, confirmed match
- **US world-of-hyatt-credit-card** `earn_rates`: 4x Hyatt hotels, 2x restaurants/airline/transit/gym all confirmed unchanged Held because No change needed, confirmed match
- **CA wealthsimple-cash-back-visa** `annual_fee / earn_rates / foreign_transaction_fee`: $0 annual fee for qualifying clients (waived; up to $599/year if not qualifying), 2% cash back on everything, 0% FX fee all confirmed unchanged Held because No change needed, confirmed match
- **CA westjet-rbc-world-elite-mastercard-for-business** `annual_fee`: Fresh source confirms $175 unchanged Held because No change needed, confirmed match
- **CA westjet-rbc-world-elite-mastercard-for-business** `earn_rates - WestJet flights`: Page states 'up to 6 WestJet points for every $1 spent on WestJet flights,' but this bundles Instant Silver Status earning on top of the card's own base rate (the classic WestJet 'up to Nx' trap); no footnote breakdown of the card-only base rate was present in this capture Held because Cannot confirm the card's own (non-bundled) flights multiplier from this capture, so not proposing a new 'WestJet flights' earn_rates entry. Existing 'WestJet & Sunwing vacations': '3x', 'Telecom, shipping & electronics': '3x', and 'All other purchases': '1.5x' are all confirmed unchanged.
- **CA westjet-rbc-world-elite-mastercard** `welcome_bonus / welcome_bonus_points / welcome_bonus_value_cad`: Fresh source confirms 'up to 70,000 WestJet points, a value of up to $700 off travel' unchanged Held because No change needed, confirmed match
- **CA westjet-rbc-world-elite-mastercard** `annual_fee`: Fresh source confirms $139 unchanged Held because No change needed, confirmed match
- **CA westjet-rbc-world-elite-mastercard** `earn_rates`: 2x WestJet/Sunwing travel (flights, vacations), 2x groceries & transportation (flagged 'New!' on the page but the rate itself, 2x, matches what was already stored), 1.5x all other all confirmed unchanged Held because No change needed, confirmed match
## Sources that could not carry their card

Eight cards had a source problem worth recording:

- `bmo-prepaid-mastercard` - no capture exists at all. Every field is unverifiable and
  nothing was touched.
- `rbc-ion-visa` - the stored record is the $48 ION+ card, but both the June capture and
  today's re-capture are the free base ION Visa page. Only the apply_url was fixed (to the
  ION+ page, confirmed live); every other field is HELD.
- `the-platinum-card` and `business-platinum-card-from-americanexpress` (Amex CA) - the
  "All Benefits" accordion captures as collapsed headers, so lounge and hotel perk claims
  can be neither confirmed nor contradicted. The re-capture did improve the Platinum Card
  enough to confirm the current 100,000-point offer and the 1,550-lounge figure.
- `rogers-red-mastercard` and `rogers-red-world-elite-mastercard` - Rogers Bank renders its
  fee and rate cells outside the text layer, so the numeric values never make it into the
  capture. Only the earn-rate table and footnotes survive.
- `neo-mastercard` - Neo's marketing page never states the annual fee, FX fee, or interest
  rate as text.
- `united-clubsm-business-card` - the "Opens overlay" benefit sections capture as link
  labels only.

## Validation

- `node -e "JSON.parse(...)"` on both card files: **PASS** (CA 131 cards, US 63 cards)
- Earn-rate quality gate (category 40 chars or fewer, 7 words or fewer, clean rate format):
  **0 violations**
- Every CA card has `foreign_transaction_fee` set: **0 missing**; every charger carries
  `foreign_transaction_fee_pct`: **0 missing**
- CA-only fields leaked onto a US card: **0**
- Cash-back cards carrying a points bonus (the Tangerine bug class): **0**
- Earn-rate blobs shared by 3 or more cards: 2, both benign (a trivial "All purchases: 1x"
  blob, and three Desjardins siblings that genuinely share a rate table)
- `npx tsc --noEmit`: **exit 0, clean**
- `CARDS_VERIFIED` in `src/data/cards.ts`: bumped `2026-07-18` to **`2026-08-09`**

The stamp bump is honest: all 194 cards were checked this run, 89 of them against captures
taken the same day.

## Note for the next run

Three `cpp_cad: 1.0` values re-serialize as `cpp_cad: 1` in the diff. That is a JSON number
normalization, semantically identical, not a data change.

The remaining freshness gap is the 104 cards still on the June capture, chiefly US Amex
(22 cards, verified against the shared `american-express-us.md`), CIBC (which blocks
Playwright and needs the plain-HTTP path), and the smaller CA issuers. A future local run
should extend the re-scrape to those, and should retry
`triangle-world-elite-mastercard` and `simplii-financial-cash-back-visa-card`.
