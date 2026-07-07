export interface SweetSpot {
  /** URL slug for the post's own page at /travel/sweet-spots/<slug>. */
  slug: string;
  /** The loyalty program this example uses, e.g. "Aeroplan". Drives the rotation. */
  program: string;
  /** Post headline. */
  title: string;
  /** One-sentence summary shown on the travel tab and as the lede. */
  dek: string;
  /** Short read estimate, e.g. "5 min read". */
  read: string;
  /** Month-year stamp, e.g. "Jun 2026". */
  date: string;
  /** Body copy. Split into paragraphs on blank lines when rendered. */
  body: string;
  /** Optional on-site link (a card filter or guide) and its label. */
  href?: string;
  hrefLabel?: string;
  /**
   * Optional self-contained answer to the post's core question (2 to 4 sentences,
   * including the key number). Shown up top for answer-first, AI-search-friendly reading.
   */
  shortAnswer?: string;
  /** Optional 4 to 6 genuine related Q/As, rendered as a visible FAQ + FAQPage JSON-LD. */
  faqs?: { q: string; a: string }[];
}

/**
 * The rotation the twice-weekly sweet-spot cron walks through. Each run posts a
 * worked example for the NEXT program after the most recent SWEET_SPOTS entry,
 * looping back to the start. Keep this list in the intended order.
 */
export const ROTATION = [
  "Aeroplan",
  "Avios",
  "WestJet",
  "Delta",
  "United",
  "Alaska",
  "Flying Blue",
] as const;

// Newest at the top. Each entry is one worked redemption example in the house
// voice. The twice-weekly cron prepends a new one for the next program in
// ROTATION. See docs/CRON_RUNBOOK.md section 5.
export const SWEET_SPOTS: SweetSpot[] = [
  {
    slug: "delta-flash-sale-europe-economy-26k",
    program: "Delta",
    title: "Delta sweet spot: round-trip economy to Europe near 26,000 SkyMiles in the flash sales",
    dek: "Delta SkyMiles has no award chart and prices dynamically, so the real Delta sweet spot is the recurring transatlantic flash sale, where round-trip economy to Europe has dropped near 26,000 SkyMiles, sometimes lower.",
    read: "5 min read",
    date: "Jul 2026",
    body:
      "Delta SkyMiles works differently from Aeroplan or Avios, and it is only fair to say so before we talk value. There is no published award chart and no fixed distance bands. SkyMiles prices awards dynamically, roughly tracking the cash fare, and across the whole program a mile is worth on average a little over a cent. That means there is no hidden business class band to memorize the way there is with Aeroplan. The genuine Delta sweet spot lives somewhere else, in the transatlantic award flash sales Delta runs several times a year. The figures below are an example drawn from past sales, not a quote for any date, so always confirm the live price when you search.\n\nHere is how the sale works. A few times a year, usually for a short window of about three days, Delta quietly discounts award seats to Europe. In the recent rounds, round-trip economy to popular cities such as Dublin, Madrid, and Marrakech has come down to around 26,000 SkyMiles, and the very best dates have dipped closer to 20,000 round trip. The catch is that the travel window is limited to a set range of off-peak dates, and the cheapest fares get picked over quickly, so you book when you see it rather than when it suits you. Delta One, Premium Select, and Comfort seats are sometimes included in the same sale, though the deepest discounts land in the main economy cabin.\n\nHere is the cents-per-mile math on a realistic economy booking. Say a round trip to Dublin would otherwise cost about $800 in cash, and the award books for 26,000 SkyMiles plus roughly $150 in taxes and fees. That works out to (800 minus 150) divided by 26000, times 100, which is about 2.5 cents per mile. Against a program that averages a little over a cent, that is your SkyMiles doing real work, and if you happen to hold an eligible Delta American Express card, the TakeOff 15 benefit knocks 15 percent off the mileage, dropping the same seat to about 22,100 miles and nudging the value closer to 2.9 cents. Confirm the live fare when you book, because prices move and the example is only there to show the shape of the deal.\n\nOne honest note on TakeOff 15. That 15 percent discount applies only to Delta-operated award flights booked on delta.com, not to partner awards on Air France, KLM, or Virgin Atlantic, and it requires an eligible Delta co-branded Amex. Most of those cards are US products that Canadians cannot easily hold, so treat the discount as a nice bonus if you have the card rather than the baseline you should count on.\n\nA word on the premium cabin, since people always ask. Delta One to Europe does show up in the summer flash sales, recently from about 115,000 SkyMiles one-way, or roughly 97,750 with the TakeOff 15 discount. On a cash fare of two to three thousand dollars one-way that is a fair use of miles, somewhere around 2 to 2.5 cents, but it is still a large pile of SkyMiles for one seat, and the value is nowhere near the outsized business class deals Aeroplan or Avios can produce. The accessible, repeatable Delta sweet spot really is economy on sale, not the lie-flat cabin.\n\nA few honest caveats to close. Earning the SkyMiles is the hard part for Canadians. Amex Canada Membership Rewards does not transfer to Delta, so the cleanest route is Marriott Bonvoy, which moves to Delta at 3 to 1 with no transfer bonus, meaning 60,000 Bonvoy points become 20,000 SkyMiles. Because the sales are dynamically priced and short-lived, there is no date you can plan around in advance, so set an alert and pounce when one lands. And if you just need a cheap short hop, Delta regularly prices short-haul domestic economy from around 5,000 miles one-way, which a cardholder's TakeOff 15 discount can pull below 4,250, a quiet everyday sweet spot that is always there when the flash sale is not.",
    href: "/cards?q=marriott",
    hrefLabel: "Amex Bonvoy cards",
    shortAnswer:
      "Delta SkyMiles has no award chart and prices dynamically, averaging a little over a cent a mile, so the real Delta sweet spot for Canadians is the recurring transatlantic flash sale, where round-trip economy to Europe such as Dublin or Madrid has dropped near 26,000 SkyMiles and the best dates closer to 20,000. On a roughly $800 round-trip cash fare booked for 26,000 SkyMiles plus about $150 in taxes and fees, that is around 2.5 cents per mile, and an eligible Delta Amex cardholder's 15 percent TakeOff 15 discount trims the seat to about 22,100 miles, closer to 2.9 cents. Earning the miles is the hard part for Canadians, since Amex Canada does not transfer to Delta and the cleanest route is Marriott Bonvoy, which moves 3 to 1 with no bonus, so 60,000 Bonvoy becomes 20,000 SkyMiles. These are example figures from past sales, not a quote for any date, so confirm the live price when you book.",
    faqs: [
      {
        q: "How many SkyMiles is a round trip to Europe in the Delta flash sale?",
        a: "In the recent transatlantic flash sales, round-trip economy to cities such as Dublin, Madrid, and Marrakech has come down to around 26,000 SkyMiles, and the very best dates have dipped closer to 20,000 round trip. Delta prices dynamically with no award chart, so confirm the live price when you search, because prices move and the travel window is limited to a set range of off-peak dates.",
      },
      {
        q: "Is the Delta flash sale to Europe a good value?",
        a: "Yes, for economy it is. On a roughly $800 round-trip cash fare booked for 26,000 SkyMiles plus about $150 in taxes and fees, the math is (800 minus 150) divided by 26000, times 100, which is about 2.5 cents per mile. Against a program that averages a little over a cent a mile, that is your SkyMiles doing real work.",
      },
      {
        q: "What is TakeOff 15 and can Canadians use it?",
        a: "TakeOff 15 knocks 15 percent off the mileage on Delta-operated award flights booked on delta.com, so a 26,000-mile seat drops to about 22,100. It applies only to Delta's own flights, not partner awards on Air France, KLM, or Virgin Atlantic, and it requires an eligible Delta co-branded Amex, most of which are US products Canadians cannot easily hold, so treat it as a bonus rather than the baseline.",
      },
      {
        q: "How do Canadians earn Delta SkyMiles?",
        a: "Earning is the hard part, because Amex Canada Membership Rewards does not transfer to Delta. The cleanest route is Marriott Bonvoy, which moves to Delta at 3 to 1 with no transfer bonus, so 60,000 Bonvoy points become 20,000 SkyMiles.",
      },
      {
        q: "Is Delta One to Europe on SkyMiles a sweet spot too?",
        a: "Not really. Delta One shows up in the summer flash sales from about 115,000 SkyMiles one-way, or roughly 97,750 with TakeOff 15, which on a two to three thousand dollar fare is a fair 2 to 2.5 cents but still a large pile of miles for one seat. The accessible, repeatable Delta sweet spot is economy on sale, not the lie-flat cabin.",
      },
      {
        q: "What if I just need a cheap short flight?",
        a: "Delta regularly prices short-haul domestic economy from around 5,000 miles one-way, which a cardholder's TakeOff 15 discount can pull below 4,250. It is a quiet everyday sweet spot that is always there when the flash sale is not.",
      },
    ],
  },
  {
    slug: "westjet-companion-voucher-premium-europe-499",
    program: "WestJet",
    title: "WestJet sweet spot: fly a companion to Europe in Premium for a fixed $499",
    dek: "WestJet points are a flat cent each with no award chart, so the real sweet spot for Canadians is the RBC World Elite companion voucher, which caps a second Premium base fare to Europe at $499.",
    read: "5 min read",
    date: "Jul 2026",
    body:
      "WestJet Rewards works differently from the mileage programs, and it helps to say so up front. WestJet points are worth a flat cent each, 100 points knocks $1 off the base fare, surcharges, bags, and seats, and you can apply any number of points to any available fare with no award chart and no blackout dates. That is refreshingly simple, but it also means there is no hidden business class deal buried in the points the way there is with Aeroplan or Avios. The real WestJet sweet spot for Canadians lives in the annual companion voucher that comes with the WestJet RBC World Elite Mastercard. The figures below are an example of how the voucher works, not a quote for any date, so always confirm the live fare when you book.\n\nHere is how it works. You get a round-trip companion voucher after your first purchase on the card and then one more each year. Your travel partner books the exact same itinerary as you and pays a fixed base fare instead of the going rate. Within Canada and the continental US that fixed fare is $119 in economy or $219 in Premium. To the rest of the WestJet network, which is where Europe and the Calgary to Tokyo route live, it is $399 in economy or $499 in Premium. Your companion still owes the taxes and fees, and you still pay your own fare in full, but that second base fare is capped no matter how expensive the route gets.\n\nHere is the value math on a realistic booking. WestJet flies its Boeing 787 Dreamliners from Calgary to Europe, with London, Rome, Paris, Dublin, and Barcelona among the destinations, plus the long Calgary to Tokyo run. Say a summer Premium round trip from Calgary to London prices around $2,600 all in, of which roughly $2,000 is the base fare the voucher discounts and the rest is taxes and fees. Your companion pays the fixed $499 base fare plus those same taxes and fees, so about $1,100 instead of $2,600. That is roughly $1,500 off the second seat, on a card whose annual fee is $139. Confirm the live fare when you book, because prices move and the example is only there to show the shape of the deal.\n\nOne honest thing about the cabin. WestJet Premium on the 787 is a premium economy cabin, a wide recliner in a 2-3-2 layout with a proper leg rest and extra legroom, not a lie-flat business seat. It is a genuine and comfortable step up for a long overnight to Europe, but do not walk on expecting an Aeroplan-style flat bed. The voucher is also not valid on WestJet's Business or BusinessFlex fares, nor on Member Exclusive fares, so the lie-flat cabin is simply off the table for this trick.\n\nA few more caveats worth knowing. You need two people traveling together on the same booking, and the companion still pays the taxes and fees, which on a transatlantic run can be a few hundred dollars. The card's annual fee is $139, and starting November 5 2026 you will need to put $5,000 on the card each year to earn the voucher, though vouchers issued before that date carry no minimum spend. Premium seats on the 787 are limited and summer sells out early, so book ahead and stay flexible. And remember the points themselves are worth a flat cent, handy for shaving cash off any WestJet fare with no blackouts, just not the place to hunt for outsized premium value.",
    href: "/cards?q=westjet",
    hrefLabel: "WestJet RBC cards",
    shortAnswer:
      "WestJet Rewards points are a flat cent each with no award chart, so the real WestJet sweet spot for Canadians is the annual companion voucher on the RBC World Elite Mastercard. It caps your travel partner's base fare at a fixed $499 in Premium to the rest of the network, which includes WestJet's 787 Dreamliner routes to Europe and Tokyo. On a summer Premium round trip from Calgary to London that might sell for around $2,600 all in, the companion pays the fixed $499 base fare plus the same taxes and fees, roughly $1,100 instead of $2,600, which is about $1,500 off the second seat on a card whose annual fee is $139. Just know that Premium is a premium economy recliner rather than lie-flat business, and confirm the live fare when you book.",
    faqs: [
      {
        q: "How much does a companion pay to Europe with the WestJet voucher?",
        a: "In Premium to the rest of the WestJet network, which includes Europe, the companion's base fare is capped at a fixed $499 plus the usual taxes and fees. In economy to that same rest of network it is $399, and within Canada and the continental US it drops to $119 in economy or $219 in Premium. You still pay your own fare in full.",
      },
      {
        q: "Is the WestJet companion voucher a good value?",
        a: "It can be. On a summer Premium round trip from Calgary to London that might sell for around $2,600 all in, the companion pays the fixed $499 base fare plus the same taxes and fees, so about $1,100 instead of $2,600. That is roughly $1,500 off the second seat, on a card whose annual fee is $139. Confirm the live fare when you book, because prices move.",
      },
      {
        q: "Is WestJet Premium on the 787 a lie-flat business seat?",
        a: "No. WestJet Premium on the Boeing 787 Dreamliner is a premium economy cabin, a wide recliner in a 2-3-2 layout with a leg rest and extra legroom, not a lie-flat bed. The voucher is also not valid on WestJet's Business, BusinessFlex, or Member Exclusive fares, so the lie-flat cabin is off the table for this trick.",
      },
      {
        q: "How do I earn the WestJet companion voucher?",
        a: "It comes with the WestJet RBC World Elite Mastercard, once after your first purchase and then one more each year. The card's annual fee is $139, and starting November 5 2026 you will need to spend $5,000 on the card each year to earn the voucher, though vouchers issued before that date carry no minimum spend.",
      },
      {
        q: "Are WestJet points worth using for premium cabins?",
        a: "Not for outsized value. WestJet points are worth a flat cent each, 100 points to $1 off, and apply to any fare with no award chart and no blackouts, so they are handy for shaving cash off a WestJet ticket but not a hidden business class deal. For premium value, the companion voucher is where to look.",
      },
      {
        q: "What are the catches with the companion voucher?",
        a: "You need two people traveling together on the same booking, and the companion still owes the taxes and fees, which on a transatlantic trip can be a few hundred dollars. Premium seats on the 787 are limited and summer sells out early, so book ahead and stay flexible, and confirm the live fare before you assume the savings.",
      },
    ],
  },
  {
    slug: "avios-toronto-to-dublin-aer-lingus-50k",
    program: "Avios",
    title: "Avios sweet spot: Toronto to Dublin on Aer Lingus from about 13,000 points",
    dek: "Aer Lingus gives Canadians one of the friendliest ways into Europe on Avios, an economy seat to Dublin from roughly 13,000 points one-way off-peak, or the lie-flat business cabin for about 50,000.",
    read: "5 min read",
    date: "Jun 2026",
    body:
      "Avios is the shared currency behind British Airways, Aer Lingus, Iberia, and Qatar, and one balance moves freely between them at the same rate. For Canadians the standout is Aer Lingus, because its transatlantic hub in Dublin is one of the closest European gateways to the East Coast, which keeps the Avios price low. These figures are an example of how the chart works, not a quote for any given date, so always confirm the live price when you search.\n\nThe numbers look like this off-peak. Toronto to Dublin runs around 13,000 Avios one-way in economy and about 50,000 in business, the lie-flat cabin Aer Lingus flies on its A330s. Peak dates cost more, so the off-peak calendar is where the value lives, and Aer Lingus does not impose the heavy fuel surcharges British Airways is known for, which keeps the cash portion sane.\n\nHere is the cents-per-point math on a realistic business class booking. Say the cash fare is about $3,000 and the award books for 50,000 Avios plus taxes and fees that on surcharge-light Aer Lingus often land around $120 to $140, say $130. That works out to (3000 minus 130) divided by 50000, times 100, which is around 5.7 cents per Avios. Anything above about 1.5 cents is a solid use of Avios, so a lie-flat seat to Europe at this price is your points doing real work.\n\nOne quietly important tip. Book the Aer Lingus award through the Aer Lingus site or avios.com rather than through British Airways. The Avios price is identical, but the taxes and fees can be hundreds of dollars lower, often around $120 to $140 instead of nearly $790 in business on the same seat. Confirm the live figure when you book. Same flight, same points, far less cash, just for booking on the right site.\n\nA few honest caveats. Getting the Avios in the first place matters for Canadians: RBC Avion transfers to British Airways at 1 to 1, and RBC runs a 30 percent transfer bonus a couple of times a year, but transfers are one-way, so only move points once you have found the seat you want. Off-peak award space in the lie-flat cabin is genuinely limited and the best dates go early, so stay flexible and search a few days on either side. And price your specific trip before you assume a number, because the Avios charts do get adjusted.",
    href: "/travel/avios-sweet-spots-rbc-avion-transfer",
    hrefLabel: "Full Avios guide",
    shortAnswer:
      "Off-peak, Toronto to Dublin on Aer Lingus runs around 13,000 Avios one-way in economy and about 50,000 in business, the airline's lie-flat A330 cabin. On a roughly $3,000 business fare booked for 50,000 Avios plus taxes and fees that on surcharge-light Aer Lingus often land around $120 to $140, that works out to around 5.7 cents per Avios, well above the 1.5 cents that already counts as a solid use. Book on the Aer Lingus site or avios.com rather than through British Airways to keep the cash portion low. These figures show how the chart works, not a quote for any date, so confirm the live price when you search.",
    faqs: [
      {
        q: "How many Avios is Toronto to Dublin on Aer Lingus?",
        a: "Off-peak, expect around 13,000 Avios one-way in economy and about 50,000 in business. Peak dates cost more, so the off-peak calendar is where the value lives. Always confirm the live price when you search, because the Avios charts do get adjusted.",
      },
      {
        q: "Is booking Toronto to Dublin in business on Avios a good value?",
        a: "Yes. On a roughly $3,000 cash fare booked for 50,000 Avios plus taxes and fees that on surcharge-light Aer Lingus often land around $120 to $140, say $130, the math is (3000 minus 130) divided by 50000, times 100, which is around 5.7 cents per Avios. Confirm the live figure when you book. Anything above about 1.5 cents is a solid use, so a lie-flat seat to Europe at this price is your points doing real work.",
      },
      {
        q: "Should I book the Aer Lingus award through British Airways?",
        a: "No, book it through the Aer Lingus site or avios.com instead. The Avios price is identical, but the taxes and fees can be hundreds of dollars lower, often around $120 to $140 instead of nearly $790 in business on the same seat. Confirm the live figure when you book. Same flight, same points, far less cash, just for booking on the right site.",
      },
      {
        q: "How do Canadians earn Avios for this redemption?",
        a: "RBC Avion transfers to British Airways at 1 to 1, and one Avios balance moves freely between British Airways, Aer Lingus, Iberia, and Qatar at the same rate. RBC runs a 30 percent transfer bonus a couple of times a year. Transfers are one-way, so only move points once you have found the seat you want.",
      },
      {
        q: "Does Aer Lingus charge high fuel surcharges on Avios awards?",
        a: "No. Aer Lingus does not impose the heavy fuel surcharges British Airways is known for, which keeps the cash portion sane. That is a big part of why this route prices so well for Canadians heading to Europe.",
      },
      {
        q: "How hard is it to find the lie-flat award seats?",
        a: "Off-peak award space in the lie-flat cabin is genuinely limited and the best dates go early. Stay flexible and search a few days on either side of your ideal date, and price your specific trip before you assume a number.",
      },
    ],
  },
  {
    slug: "aeroplan-toronto-to-europe-business-60k",
    program: "Aeroplan",
    title: "Aeroplan sweet spot: Toronto to Europe in business for about 60,000 points",
    dek: "A worked example of the redemption Aeroplan is famous for, a lie-flat seat to nearer Western Europe such as the UK and Ireland for roughly 60,000 points one-way and very little cash.",
    read: "5 min read",
    date: "Jun 2026",
    body:
      "Let us walk through one of the cleanest uses of Aeroplan points there is, a one-way business class seat from Toronto to Europe. This is an example to show how the math works, not a quote on any specific date, so always confirm the live price when you search.\n\nThe setup is simple. Aeroplan prices flights on Star Alliance partners from a fixed, distance based chart rather than the floating cash fare, and the 60,000 point figure is the 0 to 4,000 mile band, which covers nearer Western Europe such as the UK and Ireland in business. Longer bands cost more: 4,001 to 6,000 miles runs about 75,000 points one-way in business effective June 1 2026, so deeper into the continent prices higher. The same seat in cash often runs three to four thousand dollars or more, which is what makes this redemption sing.\n\nHere is the cents-per-point math on a realistic booking. Say the cash fare is $3,600 and the award books for 60,000 points plus about $200 in taxes and fees. That works out to (3600 minus 200) divided by 60000, times 100, which is roughly 5.7 cents per point. Anything north of 2 cents is a good use of Aeroplan, so this is squarely in the range where your points are doing real work.\n\nTwo things make it even better. Aeroplan does not pass along carrier-imposed fuel surcharges, so the cash you pay stays low on partners like Lufthansa, Swiss, Austrian, or Brussels Airlines. And if your route connects through a partner hub, you can often add an Aeroplan stopover for a flat 5,000 points, turning one trip into two destinations.\n\nA few honest caveats. Partner business space is limited and the best dates go quickly, so flexibility helps a lot, and you want to search a few days on either side of your ideal date. The June 1 chart update nudged several long-haul premium awards higher, so price your specific trip before you assume a number. And book the moment the math works and the seat is there, because award seats are not held for free while you think it over.",
    href: "/travel/aeroplan-sweet-spots",
    hrefLabel: "Full Aeroplan sweet-spots guide",
    shortAnswer:
      "Toronto to nearer Western Europe such as the UK and Ireland in business on a Star Alliance partner lands around 60,000 Aeroplan points one-way, the 0 to 4,000 mile band, plus about $200 in taxes and fees. Longer bands cost more: 4,001 to 6,000 miles runs about 75,000 points one-way in business effective June 1 2026. The same seat in cash often runs three to four thousand dollars or more, so on a $3,600 fare that is roughly 5.7 cents per point, well above the 2 cents that already makes a good Aeroplan redemption. Aeroplan does not pass along carrier-imposed fuel surcharges, which keeps the cash low on partners like Lufthansa, Swiss, Austrian, and Brussels Airlines. This is an example of how the chart works, not a quote for any date, so confirm the live price when you search.",
    faqs: [
      {
        q: "How many Aeroplan points for Toronto to Europe in business?",
        a: "Toronto to nearer Western Europe such as the UK and Ireland in business lands around 60,000 points one-way, which is the 0 to 4,000 mile band. Aeroplan prices Star Alliance partner flights from a fixed, distance based chart rather than the floating cash fare, so longer bands cost more: 4,001 to 6,000 miles runs about 75,000 points one-way in business effective June 1 2026. Price your specific trip before you assume a number.",
      },
      {
        q: "Is 60,000 points for business class a good value?",
        a: "Yes. On a $3,600 cash fare booked for 60,000 points plus about $200 in taxes and fees, the math is (3600 minus 200) divided by 60000, times 100, which is roughly 5.7 cents per point. Anything north of 2 cents is a good use of Aeroplan, so this is squarely in the range where your points are doing real work.",
      },
      {
        q: "Does Aeroplan charge fuel surcharges on partner awards?",
        a: "No. Aeroplan does not pass along carrier-imposed fuel surcharges, so the cash you pay stays low on partners like Lufthansa, Swiss, Austrian, or Brussels Airlines. That is a big reason this redemption prices so well.",
      },
      {
        q: "Can I add a stopover to this trip?",
        a: "Often, yes. If your route connects through a partner hub, you can frequently add an Aeroplan stopover for a flat 5,000 points, turning one trip into two destinations.",
      },
      {
        q: "How far ahead should I book?",
        a: "Book the moment the math works and the seat is there. Partner business space is limited and the best dates go quickly, so flexibility helps a lot, and you want to search a few days on either side of your ideal date. Award seats are not held for free while you think it over.",
      },
    ],
  },
];
