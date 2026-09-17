# Card-data refresh - 2026-09-16 (local full-deck verification)

Run type: LOCAL, on the Dropbox clone with a residential IP, so every issuer page could be
re-captured rather than only re-read. Previous genuine full verification: 2026-08-09.

This pass was triggered by commit `7ab9bbe` (merged PR #89) earlier the same day, which
rewrote 41 US Chase cards from the stale February/March `scrapers/detail_cache`. Every one
of those edits has now been re-checked against a chase.com page captured today.

## Coverage

All **194 cards** (131 CA + 63 US) were checked. **193 of 194** have a capture taken today.

| Source used for verification | Cards |
|---|---|
| Card's own issuer detail page, captured today (2026-09-16) | **186** |
| Issuer's own listing page or offer footnotes, captured today (partial) | 5 |
| 2026-06-18 capture (issuer page renders nothing to capture) | 1 |
| No usable first-party source today | 2 |

The 5 partial verifications are `student-bmo-cashback-mastercard` and
`bmo-prepaid-mastercard` (fee, rates and offer read off BMO's own all-cards listing, which
was captured fresh today), `rogers-red-mastercard` and
`rogers-red-world-elite-mastercard` (Rogers' compare-cards page rendered its table cells
empty, but its footnotes confirmed earn rates and the FX fee, both of which matched the
deck), and `cash-advantage-mastercard` (its own URL 404s; the rewards terms were read from
Canadian Tire's Triangle capture, which carries them verbatim).

The 1 June fallback is `neo-world-mastercard`. Neo's site is a client-rendered app: both
chromium and firefox returned 2,176 characters today, under the pipeline's 6,000-character
thin-page guard, so the prior capture was preserved and used. Neo's own footer now lists
this card as plain text while every sibling is a link, so it may be closed to new
applications. Flagged, not changed.

The 2 without a usable source are `national-bank-syncro-mastercard` (its stored URL served
NBC's Mastercard listing hub; the only change made was correcting `apply_url` to the
product page linked from that hub) and US `american-express-green-card` (its page redirects
to americanexpress.com's all-cards listing, and the Green Card appears nowhere on it). Both
were left otherwise untouched. The US Green Card in particular needs an owner decision on
whether it is still an open product.

## Capture pipeline

`python scrapers/fetch_render.py <targets.json>`, in parallel waves, writing only to the
gitignored `data/raw/cards/`. Nothing scraped is committed, and `scrapers/detail_cache/`
(which IS tracked) was deliberately left untouched.

| Wave | Engine | Result |
|---|---|---|
| US Chase (41) | chromium | 41/41 |
| US Amex (22) | firefox, keyboard scroll | 22/22, 2 benign redirects |
| CA Amex (14) | firefox, keyboard scroll | 14/14, plus 1 re-capture |
| RBC (21), Scotiabank (21), TD (14) | chromium | 56/56 |
| Desjardins + National Bank (15) | chromium | 15/15 |
| CIBC (16) | plain HTTP with browser headers | 16/16 |
| BMO (11) | firefox + JS scroll | 11/11 |
| Smaller CA issuers (19) | chromium, then firefox retry | 18/19 |

Two issuer-level blocks were worked around. BMO refused chromium outright with
`ERR_HTTP2_PROTOCOL_ERROR` on all 11 cards and also hung a plain-HTTP fetch, but firefox
with the standard JS scroll captured all 11; this is new behaviour since August and belongs
in `scrapers/SCRAPING.md`. PC Financial, Simplii and Triangle threw the same chromium error
or timed out and were recovered on firefox. CIBC still blocks Playwright and still works
over plain HTTP, as documented.

One capture came back as a cookie consent wall (`americanexpress-business-gold-rewards-card`),
was re-captured, and was then audited normally.

## Method

17 audit agents, 10 to 20 cards each, one issuer group apiece. Each agent read only the
freshest capture for its cards and emitted a patch file of proposed changes with the
current value, the new value, a reason and a quoted phrase of evidence. Nothing was written
to the decks by an agent. Every proposed change was then applied by a script that refuses
any change whose stated current value does not match the deck byte for byte: **387 changes
proposed, 387 matched, 0 refused, 0 blocked for writing a CA-only field onto a US card or
the reverse.**

## The 7ab9bbe Chase merge did not survive

That commit changed **73 fields across 22 cards**. Against today's captures:

- **4 edits survived.** Three are the `benefits.flight_delay` flips on Aer Lingus, Prime
  Visa and Amazon Visa, which today's benefits lists confirm.
- **69 edits were contradicted and corrected**, 60 of them straight back to the value the
  merge had overwritten.

The failure had a single cause, and it is worth recording. Chase renders a superseded offer
struck through next to the live one ("Earn ~~$750~~ $1,000 cash back"). The February cache
had captured the struck-through number, so the merge systematically installed **expired,
usually smaller** offers and presented them as current. Examples:

| Card | Merge wrote | chase.com today |
|---|---|---|
| Sapphire Reserve | 125,000 | 100,000 |
| Sapphire Reserve for Business | 150,000 / $20,000 / 3 mo | 200,000 / $30,000 / 6 mo |
| Ink Business Unlimited and Ink Business Cash | $750 / $6,000 / 3 mo | $1,000 / $8,000 / 4 mo |
| Marriott Bonvoy Bold | 2 Free Night Awards | 45,000 points |
| IHG One Rewards Premier | 175,000 / $5,000 | 140,000 / $3,000 |
| World of Hyatt Business | 60,000 / $5,000 | 70,000 / $7,000 |
| Disney Inspire | $600 offer | $500 offer |

The three Southwest personal cards are the worst case: the merge replaced live 50,000 /
60,000 / 55,000 point offers with smaller ones wrapped in a Companion Pass welcome offer
that does not exist on any of the three pages. Companion Pass appears there only as an
annual 10,000 qualifying-point boost for existing cardmembers. Those strings are gone.

The merge also deleted three real things that today's pages still show: Sapphire Preferred's
3x on gas, EV charging and vacation homes and its Global Entry / TSA PreCheck / NEXUS
credit, Freedom Rise's 3% intro dining rate, and Ink Business Premier's 5% on Chase Travel.
All restored.

**The United earn-rate question is now settled.** Both the 2026-08-09 cloud pass and this
merge cut United Explorer to 2x, Quest to 3x and Club to 4x on the theory that the higher
figure was a MileagePlus-stacked total. The live page disproves it: it lists "NEW! 3x miles
on all other eligible United purchases" as the card rate and separately "9x total miles on
eligible United flights - 6x as a MileagePlus member, plus 3x on entire United purchase
with United Explorer Card". 3x is the card's own rate, 9x is the stacked total. Restored to
3x / 4x / 5x on the three cards.

## Changes: 387 across 129 cards (189 CA, 198 US)

By field: welcome_bonus 67, key_perks 40, welcome_bonus_conditions 36,
signup_bonus_formatted 35, signup_bonus 29, signup_bonus_value_usd 27, first_year_fee 25,
welcome_bonus_points 21, welcome_bonus_value_cad 19, min_spend 17, apply_url 11,
earn_rates 11, benefits booleans 40, purchase_interest_rate 6, annual_fee 1.

### Stale welcome offers, Canada

The single biggest category. Issuer offer windows had rolled and the deck was carrying the
previous cycle. Every figure below comes from the card's own page today.

- **RBC Avion Visa Infinite and Avion Visa Platinum**: the deck's July 16 to August 12
  window had closed. The replacement offer is larger, 55,000 to **70,000** points, and the
  Infinite's `apply_url` was corrected to RBC's current path.
- **RBC Avion Visa Infinite Privilege** 70,000 to **100,000**; **RBC Avion Visa Infinite
  Business** 35,000 to **100,000** plus a year-one fee waiver; **WestJet RBC World Elite
  for Business** 35,000 to **100,000** across four tiers, where the old record also
  contradicted its own conditions text.
- **RBC British Airways Visa Infinite** 60,000 to **50,000** Avios, now with a $6,000 spend
  gate the deck had as null.
- **CIBC Aventura Visa Infinite and Aventura Gold** 35,000 to **60,000** points, with the
  top tier now requiring $5,000 rather than $3,000; **both Adapta cards** re-offered
  (6,000 to 15,000 and 12,000 to 15,000).
- **TD Aeroplan Visa Infinite** 40,000 to **50,000**, **Aeroplan Infinite Privilege**
  85,000 to **100,000**, **First Class Travel** 146,000 to **160,000**. **TD Rewards Visa**
  went the other way, 30,310 to **15,152** points, its $100 Amazon.ca offer halved.
- **Scotiabank Scene+ Visa and its student twin** 10,000 to **5,000**; **Home Hardware PRO
  Business** 15,000 to **7,500**; **Momentum No-Fee** and its student twin dropped from 10%
  to **5%** intro cash back.
- **BMO Ascend World Elite** is running an increased offer, 100,000 to **115,000** points.
- **National Bank Platinum** 25,000 to **35,000** plus a year-one fee rebate.
- **Both Canadian Marriott Bonvoy Amex cards** 70,000 and 80,000 to **110,000**. Note these
  are stamped "offer ends September 22, 2026" and will need a re-check next week.
- **PC Financial's** three core cards had an "apply by August 31, 2026" window; the same
  offer now runs to **December 31, 2026**.

### Stale welcome offers, US Amex

- **Delta SkyMiles Reserve** 100,000 to **50,000** miles plus two Comfort+ certificates,
  **Hilton Honors** 100,000 to **70,000**, **Marriott Bonvoy Bevy** 135,000 to **125,000**,
  **Marriott Bonvoy Business** 150,000 to **100,000**.
- Upward: **Hilton Aspire** 175,000 to **200,000**, **Delta Reserve Business** 125,000 to
  **200,000**, **Hilton Honors Business** 130,000 to **150,000**.
- **Business Platinum** and **Business Gold** held 20,000 and 15,000, which are the spend
  thresholds, not the bonuses. Corrected to the ceilings their pages state verbatim,
  **300,000** and **200,000**, matching how the Delta cards already store "as high as"
  offers. Both remain application-dependent maximums.
- Delta Gold and Delta Platinum min-spend both rose ($2,000 to $3,000, $3,000 to $4,000).

### Other corrections

- **Chase Aeroplan is a different product now.** Same URL, refreshed card: annual fee **$95
  to $195**, offer 60,000 to **up to 115,000**, plus two new earn categories. This is the
  only annual-fee change in the deck this run.
- **Scotiabank moved its business card pages** from `/small-business/business-banking/` to
  `/business-banking/banking-solutions/`. Four `apply_url` values corrected.
- **Six wrong purchase APRs at Scotiabank**, several of them cross-card copy-paste (both
  Value Visa cards stored 20.99 against a stated 13.99, while their own `interest_rates`
  sub-object already said 13.99).
- **Four dead or wrong apply URLs** fixed: BMO prepaid and BMO student (the latter 404s
  today), PC Mastercard (now at the `pc-silver-mastercard` path), NBC Syncro.
- **40 benefits booleans** corrected where the issuer page states the coverage outright,
  mostly purchase protection, extended warranty and car rental insurance on US Amex cards
  that had them set false.
- **Two overstated lounge claims removed**: Scotiabank Gold Amex (the page offers a
  discount on a Priority Pass membership, and Scotia's own FAQ names only three Scotia
  cards with lounge access) and BMO CashBack World Elite (Mastercard Travel Pass at US$32
  per visit, no free passes). Amex Brilliant lost "Premium lounge access" for the same
  reason: its capture lists Priority Pass only.
- **Two fabricated perks removed** from the Canadian Business Platinum: a claim of up to
  $820 in annual statement credits where the page says up to $620, and a free checked bag
  the page never mentions and which contradicted the card's own benefits object.
- **40 key_perks lists rebuilt.** Many cards, Amex especially, carried raw marketing
  sentences scraped with their footnote markers still attached ("Earn 5X the points on
  eligible eats & drinks3", "You could earn up to $5,600 or more in value within your first
  13 months26"). These were replaced with the deck's canonical short perk vocabulary for
  the perks each capture actually supports. Two US business cards come back with an empty
  list because their captures support none of the canonical perks.
- **Cash Advantage Mastercard earn rates were wrong**: the deck claimed 3% at Canadian Tire
  and 1.5% elsewhere, where the live terms are a single tiered rate on all purchases
  (0.25% / 0.5% / 1% / 1.5% by annual spend).
- **25 first_year_fee values set to 0** where the issuer shows the year-one fee struck
  through or rebated as part of the live offer: BMO 6, CIBC 5, Scotiabank 3, RBC 2,
  National Bank 1, TD 8. The TD 8 came from a dedicated consistency sweep run after the
  main pass, because `src/data/cards.ts` computes first-year value as bonus minus
  `first_year_fee ?? annual_fee`, and encoding the waiver on some issuers but not others
  would have silently reordered the value rankings. That sweep read all 59 CA cards with a
  fee and a null `first_year_fee` and found waivers only at TD. It also caught a trap:
  TD's site-wide promo banner advertises a fee rebate on pages for cards that do not have
  one, so the US Dollar Visa and the Aeroplan Infinite Privilege were correctly left alone.

## Holds

127 items were recorded as holds rather than changed. The ones that need an owner decision:

1. **`welcome_bonus_value_cad` has two conventions.** On Aeroplan cards it is
   points x cpp. On the CIBC Aventura and Adapta cards it is simply the issuer's marketing
   headline (1400 where points x cpp gives 385). Same field, two meanings. Nothing was
   "fixed" here, per the standing rule that valuation-derived numbers are not replaced with
   issuer marketing numbers, but the field needs one ruling. The BMO Ascend and the two TD
   business cards have the same problem.
2. **US `american-express-green-card`** appears to be retired. No first-party page exists.
3. **`neo-world-mastercard`** may be closed to new applications.
4. **`cash-advantage-mastercard`** no longer has its own page at Canadian Tire.
5. **`bmo-prepaid-mastercard`** carries `annual_fee: 9.99`, which is almost certainly a
   monthly fee miscoded, plus `rewards_program`, `cpp_cad` and `card_type: rewards` that
   mean nothing on a prepaid product. It arguably does not belong in the deck.
6. **Scotiabank has renamed** both the Passport Visa Infinite and the Momentum Visa Infinite
   to "Visa Infinite +". A `name` change was out of scope for this pass.
7. **Conditional first-year fee waivers** (9 cards) that depend on holding another bank
   product or on being a physician, dentist, lawyer or accountant were deliberately not
   encoded as `first_year_fee: 0`. The Scotiabank Passport terms explicitly exclude year one
   from their rebate.
8. **Prime-linked rates stored as scalars**: ScotiaLine for Business stores 1.99 and RBC
   Creditline stores 2.9 where the issuer quotes "Prime + 1.99% to 9.49%" and "Prime + 2.9%
   to 11.9%". The stored numbers read as absolute APRs and are wrong, but there is no single
   correct scalar to replace them with.
9. **Nine `benefits.flight_delay` flips on Chase cards** were inferred from absence rather
   than contradiction: Chase's benefits drawer is an enumerated list, and these cards are
   not in it, while product-identical siblings were already false. Applied, but on a weaker
   basis than the rest of this pass. Revert if a stricter bar is wanted.

## Validation

- Both decks parse; 131 CA and 63 US cards, no duplicate slugs.
- No unknown or dropped keys against the pre-run schema union.
- Earn-rate quality gate clean: every category string is 40 characters or fewer and 7 words
  or fewer.
- `benefits` objects all carry exactly the 10 expected boolean keys.
- No em dashes and no U+FFFD replacement characters anywhere in either deck.
- `npx tsc --noEmit` exits 0.

## Stamp

`CARDS_VERIFIED` moved from `2026-08-09` to **`2026-09-16`**.

The claim the stamp makes is that the whole deck was re-checked. It was: 186 of 194 cards
against their own issuer page captured today, 5 more against first-party listing or
footnote text captured today, 1 against a June capture because the issuer's page renders
nothing to capture, and 2 left untouched because no first-party source exists for them
today. That is a stronger mix than the 2026-08-09 pass that last bumped this constant (89
same-day captures and 105 verified against June).
