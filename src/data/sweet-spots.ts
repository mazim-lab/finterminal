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
  /** Optional ISO date (YYYY-MM-DD) the figures were last spot-checked. Drives a freshness stamp on the post. */
  lastChecked?: string;
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
    slug: "aeroplan-short-haul-north-america-economy-6k",
    program: "Aeroplan",
    title: "Aeroplan sweet spot: short hops across North America from 6,000 points one-way, no fuel surcharges",
    dek: "Aeroplan prices flights within North America off a fixed, distance based chart, so the everyday sweet spot most Canadians will actually use is the short hop, anything under 500 flown miles for just 6,000 points one-way in economy, which turns a pricey last-minute cash fare into a handful of points and modest taxes with no fuel surcharge attached.",
    read: "5 min read",
    date: "Aug 2026",
    lastChecked: "2026-08-14",
    body:
      "Aeroplan is the home currency for most Canadian points collectors, and the headlines always go to the lie-flat runs to Europe and Asia. But the redemption a family actually uses over and over is the humble short hop, and Aeroplan quietly does those beautifully. We have already covered the marquee Toronto to Europe business award and the quieter business run down to South America, so this time the target is the everyday one: a short flight across North America for as little as 6,000 points one-way. The figures below are an example of how the chart works, not a quote for any date, so always confirm the live price when you search.\n\nHere is how it works. Aeroplan prices flights within North America off a fixed, distance based chart, and the shortest band, anything under 500 flown miles, sits at just 6,000 points one-way in economy. From there it steps up gently: 501 to 1,500 miles is 10,000 points, 1,501 to 2,750 is 12,500, and only the longest transcontinental hops reach 22,500. Business class on the same short legs runs 10,000, 15,000, 20,000, and 30,000 points by the same bands. Plenty of useful routes live in that bottom 6,000 point tier, short runs like Toronto to New York, Montreal to Boston, Toronto to Chicago, or Vancouver to Seattle. Treat the bands as the framework and price your own dates, because the chart does get adjusted.\n\nOne wrinkle is worth understanding up front, because it is the whole game. On a Star Alliance partner the chart price is fixed, so a qualifying short hop books at the set 6,000 points no matter the cash fare. On Air Canada's own metal, though, the same short flights are priced within a dynamic range, and 6,000 points is the floor of that range rather than a guarantee, so you catch it on lower-demand dates and watch it drift up on busy ones. Either way the trick is the same: search a range of dates and grab the 6,000 point seat when it shows.\n\nHere is the cents-per-point math on a realistic booking. Short-haul cash fares look cheap until you need one last minute, and that is exactly when this shines. Say a one-way Toronto to New York seat a week out would run about $350 in cash, and the award books for 6,000 points plus roughly $45 in taxes and fees, with no fuel surcharge because Aeroplan does not add them. That works out to (350 minus 45) divided by 6000, times 100, which is about 5.1 cents per point. Anything north of 2 cents is a good use of Aeroplan, so a last-minute short hop at this price is your points working hard for something you would otherwise have paid real money for. Prices move, so confirm the live fare when you book.\n\nA couple of things make it sing for Canadians. Earning is the easy part, which sets this apart from the US programs where building a balance is the chore: Amex Membership Rewards transfers to Aeroplan at a clean 1 to 1, and the TD, CIBC, and Amex Aeroplan co-branded cards earn it directly, so almost every points collector here already has a way in. Aeroplan also lets you tack a stopover onto a longer award for a flat 5,000 points, though on a simple point to point short hop that is not usually in play. And because the short-haul bands sit so low, this is the redemption you reach for when a cheap seat sale is not running and a last-minute cash fare has ballooned.\n\nNow the honest caveats, and there are a few. The value only really lands when the cash fare is high, so on a $120 seat-sale hop the 6,000 points plus taxes can come out worse than just paying, which means you should always run the cents-per-point math before you burn points on a cheap route. Award space at the low price is genuinely limited, especially on the fixed-price partner seats, so stay flexible and search a few days on either side. On Air Canada metal remember 6,000 is a floor and not a promise, so a busy date can price higher. And the transborder hops carry small US government fees while purely domestic Canadian ones are cheaper still, so check the all-in taxes on your specific flight before you assume the number.",
    href: "/travel/aeroplan-sweet-spots",
    hrefLabel: "Full Aeroplan sweet-spots guide",
    shortAnswer:
      "Aeroplan prices flights within North America off a fixed, distance based chart, and the shortest band, anything under 500 flown miles, sits at just 6,000 points one-way in economy, stepping up to 10,000 for 501 to 1,500 miles and 12,500 for 1,501 to 2,750. On a last-minute one-way like Toronto to New York that might run about $350 in cash, booked for 6,000 points plus roughly $45 in taxes and no fuel surcharge, that is about 5.1 cents per point, well above the 2 cents that already makes a good Aeroplan redemption. The one wrinkle is that the price is fixed on Star Alliance partners but only the floor of a dynamic range on Air Canada's own metal, so you catch 6,000 on lower-demand dates and grab it when it shows. Earning is the easy part for Canadians, since Amex Membership Rewards transfers to Aeroplan at 1 to 1 and the co-branded cards earn it directly, though the value only really lands when the cash fare is high, so run the math on cheap routes before you book.",
    faqs: [
      {
        q: "How many Aeroplan points is a short flight within North America?",
        a: "The shortest band, anything under 500 flown miles, sits at just 6,000 points one-way in economy, stepping up to 10,000 for 501 to 1,500 miles, 12,500 for 1,501 to 2,750, and 22,500 for the longest transcontinental hops. Business class on the same bands runs 10,000, 15,000, 20,000, and 30,000 points. Aeroplan prices these off a fixed distance chart, so price your own dates, because the chart does get adjusted.",
      },
      {
        q: "Is a short-haul hop a good value on Aeroplan points?",
        a: "It can be, when the cash fare is high. On a last-minute one-way Toronto to New York that might run about $350 in cash, booked for 6,000 points plus roughly $45 in taxes and no fuel surcharge, the math is (350 minus 45) divided by 6000, times 100, which is about 5.1 cents per point. Anything north of 2 cents is a good use of Aeroplan, so a pricey last-minute short hop is where your points work hardest.",
      },
      {
        q: "Why does the 6,000 point price sometimes disappear?",
        a: "Because the pricing differs by airline. On a Star Alliance partner the chart price is fixed, so a qualifying short hop books at the set 6,000 points, but on Air Canada's own metal the same flights are priced within a dynamic range where 6,000 is only the floor. That means you catch the low price on lower-demand dates and watch it drift up on busy ones, so search a range of dates and grab it when it shows.",
      },
      {
        q: "Does Aeroplan charge fuel surcharges on short-haul North America awards?",
        a: "No. Aeroplan does not add carrier-imposed fuel surcharges, so a short hop books for the points plus modest taxes, often around $45 on a transborder one-way and less on a purely domestic Canadian flight. Check the all-in taxes on your specific route before you assume the number.",
      },
      {
        q: "How do Canadians earn Aeroplan points for this?",
        a: "This is the easy part, unlike the US programs where building a balance is the chore. Amex Membership Rewards transfers to Aeroplan at a clean 1 to 1, and the TD, CIBC, and Amex Aeroplan co-branded cards earn it directly, so almost every points collector here already has a way in.",
      },
      {
        q: "When is it not worth using points on a short hop?",
        a: "When the cash fare is cheap. On a $120 seat-sale hop, 6,000 points plus taxes can come out worse than simply paying, so always run the cents-per-point math before you burn points on a low fare. Save the trick for the pricey last-minute short flights where the cash fare has ballooned.",
      },
    ],
  },
  {
    slug: "flying-blue-intra-europe-economy-short-haul-10k",
    program: "Flying Blue",
    title: "Flying Blue sweet spot: hop around Europe in economy from about 10,000 miles one-way with low surcharges",
    dek: "Flying Blue prices awards dynamically with no fixed chart, but short-haul economy on Air France, KLM, and their SkyTeam partners still starts around 10,000 miles one-way off-peak with only modest surcharges, which makes it the quiet, practical way to reach the smaller European cities a pricey cash hop or a separate positioning flight would otherwise cost you.",
    read: "5 min read",
    date: "Aug 2026",
    lastChecked: "2026-08-11",
    body:
      "Flying Blue, the shared program behind Air France, KLM, and their SkyTeam partners, works differently from a fixed-chart program like Aeroplan or Avios, and it is only fair to say so before we talk value. There is no published award chart and no distance bands to memorize, because Flying Blue prices awards dynamically, roughly tracking the cash fare. We already walked through the marquee Flying Blue sweet spot, a lie-flat seat across the Atlantic to Europe in the monthly Promo Rewards, so this time the target is the quiet everyday version most travellers will actually use more often: getting around Europe cheaply in economy once you have crossed the ocean. The figures below are an example of how the pricing works, not a quote for any date, so always confirm the live price when you search.\n\nHere is how it works. Short-haul economy within Europe on Air France, KLM, and SkyTeam partners such as SAS or ITA starts around 10,000 miles one-way off-peak, with some routes landing closer to 12,500 or 15,000, and the Promo Rewards that drop on the first of every month regularly knock popular hops down to about 7,500 miles each way. The surcharges on these short legs stay low, often around $40 to $70 one-way, which is the part that keeps the value intact. One thing worth knowing up front is that short-haul European business class is not really a cabin worth chasing here, because on these flights it is usually just an economy seat with the middle blocked and lounge access thrown in, so economy is the sensible play and the miles go further there. Treat these as approximate, dynamic figures rather than a fixed quote, and price your specific dates before you assume a number.\n\nHere is the cents-per-mile math on a realistic short-haul booking. Say a peak-summer or last-minute hop like Paris to Nice or Amsterdam to Venice would run about $260 one-way in cash, and the award books for 10,000 miles plus roughly $50 in taxes and fees. That works out to (260 minus 50) divided by 10000, times 100, which is about 2.1 cents per mile. Across the whole program a Flying Blue mile is worth a little over a cent on average, so anything north of about 1.5 cents is a strong use, and on a pricier last-minute leg where the cash fare climbs higher the number only gets better. Prices move, so confirm the live fare when you book.\n\nA couple of things make it sing for Canadians. This is the natural companion to crossing the Atlantic on another program: fly to a Paris or Amsterdam hub on an Aeroplan or Avios business award, then use cheap Flying Blue economy to reach the smaller cities that would otherwise be an expensive fare add-on or a standalone positioning flight, places like Nice, Venice, Lisbon, or Prague. KLM feeds most of the continent out of Amsterdam and Air France out of Paris, so between the two hubs the coverage is deep, and because the Promo Rewards list refreshes every month there is always a fresh batch of discounted short-haul routes to check rather than one fleeting sale. Search a range of dates, because award space at the low price is genuinely limited and the best days go early.\n\nNow the honest caveats, and there are a few. The biggest one is that dynamic pricing cuts both ways, because the miles cost rises with the cash fare, so the real win is redeeming when the cash price is high, on a peak or last-minute leg, while an off-peak route that is already cheap in cash can price under a cent per mile, so always run the cents-per-mile math before you book rather than assuming the low number. Earning the miles is the friendly part: as of January 2026 Amex Canada moved its Membership Rewards transfer to Flying Blue to a clean 1 to 1, which makes Amex the most direct way for a Canadian to build a balance, and Marriott Bonvoy is a backup at 3 to 1 with a 5,000-mile bonus for every 60,000 points moved in one block, so 60,000 Bonvoy points land as 25,000 miles. Transfers are one-way, so only move points once you have found the seat you want. And while surcharges on short-haul economy are light, Flying Blue does pass along carrier-imposed fees on some fares and partners, so check the all-in taxes on your specific flight before you commit.",
    href: "/cards?q=amex",
    hrefLabel: "Amex cards that feed Flying Blue",
    shortAnswer:
      "Flying Blue prices awards dynamically with no fixed chart, but short-haul economy on Air France, KLM, and their SkyTeam partners still starts around 10,000 miles one-way off-peak, with some routes closer to 12,500 or 15,000 and the monthly Promo Rewards dropping popular hops to about 7,500. Surcharges on these short European legs stay low, often around $40 to $70 one-way, so on a peak-summer or last-minute hop that would sell for about $260 in cash, booking for 10,000 miles plus roughly $50 works out to around 2.1 cents per mile, above the roughly 1 cent a Flying Blue mile is worth on average. The catch is that dynamic pricing means the miles cost rises with the cash fare, so the real win is redeeming when the cash price is high, and an off-peak-cheap route can price under a cent, so run the math before you book. For Canadians the cleanest feed is Amex Membership Rewards, which moved to a clean 1 to 1 transfer in January 2026, with Marriott Bonvoy at 3 to 1 as a backup.",
    faqs: [
      {
        q: "How many Flying Blue miles is a short-haul flight within Europe?",
        a: "Short-haul economy within Europe on Air France, KLM, and SkyTeam partners starts around 10,000 miles one-way off-peak, with some routes closer to 12,500 or 15,000, and the monthly Promo Rewards regularly knock popular hops down to about 7,500 miles each way. Flying Blue prices dynamically with no award chart, so treat these as approximate figures and confirm the live price when you search.",
      },
      {
        q: "Is using Flying Blue miles to get around Europe a good value?",
        a: "It can be. On a peak-summer or last-minute hop like Paris to Nice that would run about $260 one-way in cash, booked for 10,000 miles plus roughly $50 in taxes, the math is (260 minus 50) divided by 10000, times 100, which is about 2.1 cents per mile. A Flying Blue mile is worth a little over a cent on average, so anything north of about 1.5 cents is a strong use, and on a pricier last-minute leg the number only gets better.",
      },
      {
        q: "Should I book short-haul European business class with Flying Blue miles?",
        a: "Usually not. On these short intra-Europe flights, business class is generally just an economy seat with the middle blocked and lounge access thrown in, so it is rarely worth the extra miles. Economy is the sensible play here, and the miles go further there.",
      },
      {
        q: "What are the taxes and surcharges on these short-haul awards?",
        a: "They stay low, often around $40 to $70 one-way, which is the part that keeps the value intact. That said, Flying Blue does pass along carrier-imposed fees on some fares and partners, so check the all-in taxes on your specific flight before you commit.",
      },
      {
        q: "How do Canadians earn Flying Blue miles for this?",
        a: "As of January 2026 Amex Canada moved its Membership Rewards transfer to Flying Blue to a clean 1 to 1, which makes Amex the most direct way for a Canadian to build a balance. Marriott Bonvoy is a backup at 3 to 1 with a 5,000-mile bonus for every 60,000 points moved in one block, so 60,000 Bonvoy points land as 25,000 miles. Transfers are one-way, so only move points once you have found the seat you want.",
      },
      {
        q: "When is this sweet spot not worth using?",
        a: "When the cash fare is already cheap. Because Flying Blue prices dynamically, the miles cost rises with the cash fare, so an off-peak route that is inexpensive in cash can price under a cent per mile. Always run the cents-per-mile math before you book, and save the miles for the peak or last-minute legs where the cash price is high.",
      },
    ],
  },
  {
    slug: "alaska-qantas-business-australia-85k",
    program: "Alaska",
    title: "Alaska sweet spot: business class to Australia on Qantas for about 85,000 Atmos points, no fuel surcharges",
    dek: "Alaska's Mileage Plan is now Atmos Rewards, but it still prices partner awards off a fixed distance chart with no fuel surcharges, so the durable long-haul sweet spot is a lie-flat Qantas seat from the US West Coast to Australia for about 85,000 points one-way, with only a small partner fee and taxes on top.",
    read: "5 min read",
    date: "Aug 2026",
    lastChecked: "2026-08-07",
    body:
      "Alaska's frequent flyer program was renamed Atmos Rewards in 2026, but the thing that made the old Mileage Plan special is still intact, so it is worth saying up front. In a year when almost every US program has drifted to dynamic pricing, Atmos still prices its partner awards off a fixed, distance based chart, and it still does not pass along the carrier imposed fuel surcharges that some partners are known for. We already walked through the closest version of that idea, Japan Airlines business class from Vancouver to Tokyo, so this time the target is the long haul people save for years to take: a lie-flat seat across the Pacific to Australia on Qantas. The figures below are an example of how the chart works, not a quote for any date, so always confirm the live price when you search.\n\nThe numbers look like this. From the US West Coast, gateways like Los Angeles and San Francisco, Qantas business class to Australia prices at about 85,000 Atmos points one-way, with premium economy around 55,000 and economy lower still. Fiji Airways, which flies the same Pacific through its Nadi hub, sits in the same band, so you have two carriers to hunt across rather than one. This is a distance based chart, so treat 85,000 as an approximate band rather than a fixed quote, and price your own dates before you assume a number, because the 2026 rebrand came with some chart tweaks.\n\nHere is the cents-per-point math on a realistic business booking. Say a one-way Qantas business fare from Los Angeles to Sydney would run about $5,500 in cash, and the award books for 85,000 points plus taxes and fees. Because Atmos strips the fuel surcharges and US departure taxes to Australia are light, the cash portion stays small, often around $60 to $100 all in once you add the partner award fee, so call it $80. That works out to (5500 minus 80) divided by 85000, times 100, which is about 6.4 cents per point. Anything above about 1.5 cents is a strong use of Atmos points, so a flat bed across the Pacific at this price is your points doing real work. Prices move, so confirm the live fare when you book.\n\nTwo things make it sing. The no-surcharge policy is the durable edge, because a Qantas business award booked through some other programs can carry hundreds of dollars in fees, while Atmos keeps the cash portion to modest taxes plus a small partner award fee, which rose to $20 on July 1 2026 and is still a rounding error on a trip like this. Atmos also lets you add a free enroute stopover of up to 14 days on a one-way international partner award, so you can break the trip in, say, Fiji or another Pacific city on the same booking, turning one redemption into two destinations. Alaska shows a good deal of partner space, including Qantas and Fiji Airways, right on alaskaair.com, so you can usually search and book online without a phone call.\n\nNow the honest caveats, and there are a few. The biggest one is availability, because Qantas is famously tight with releasing long-haul business award seats to partners, and the best space tends to show up either about eleven months out when the schedule first opens or in the last week or two before departure, so this is a trip to plan around the calendar rather than book on a whim. Watch for mixed-cabin results too, where only part of the long flight is actually in business, and confirm the whole Pacific leg is the cabin you are paying for before you book. Earning the points is the other hard part for Canadians, because no Canadian bank transfers directly to Atmos. The cleanest route is Marriott Bonvoy, which moves to Atmos at 3 to 1 and adds a 5,000-point bonus for every 60,000 Bonvoy points you transfer in one block, so a 60,000-point transfer lands as 25,000 Atmos points rather than 20,000. That means the 85,000 points for this seat take on the order of 204,000 Bonvoy points to build, so plan the transfer around a real booking and confirm the current ratio first, since transfers are one-way. And the distance based chart means your gateway matters, as you will still need to position from Canada to the West Coast, so price that leg in before you assume the whole trip is cheap. If business space is scarce, that roughly 55,000-point premium economy seat on the same carriers is the quiet fallback, and it prices just as cleanly with the same low fees.",
    href: "/cards?q=marriott",
    hrefLabel: "Bonvoy cards that feed Atmos Rewards",
    shortAnswer:
      "Alaska's Mileage Plan is now Atmos Rewards, but it still prices partner awards off a fixed distance chart with no fuel surcharges, and the durable long-haul sweet spot is Qantas business class from the US West Coast to Australia for about 85,000 points one-way, with premium economy around 55,000 and Fiji Airways pricing in the same band. On a roughly $5,500 one-way cash fare booked for 85,000 points plus about $80 in taxes and a small partner fee, that is around 6.4 cents per point, well above the 1.5 cents that already counts as a strong use. Earning is the hard part for Canadians, since no Canadian bank transfers directly to Atmos and the cleanest route is Marriott Bonvoy at 3 to 1 with a 5,000-point bonus per 60,000-point block, so 60,000 Bonvoy points land as 25,000 Atmos points and the 85,000 for this seat take on the order of 204,000 Bonvoy. The real catch is availability, because Qantas is stingy with releasing partner business space, so treat 85,000 as an approximate chart band and confirm the live price when you search.",
    faqs: [
      {
        q: "How many Atmos points is Qantas business class to Australia?",
        a: "About 85,000 points one-way from the US West Coast, gateways like Los Angeles and San Francisco, with premium economy around 55,000 and economy lower still. Fiji Airways sits in the same band through its Nadi hub, so you have two carriers to search. This is a distance based chart, so treat 85,000 as an approximate band and confirm the live price when you search.",
      },
      {
        q: "Is booking Qantas business to Australia on Atmos points a good value?",
        a: "Yes. On a roughly $5,500 one-way cash fare booked for 85,000 points plus about $80 in taxes and a small partner fee, the math is (5500 minus 80) divided by 85000, times 100, which is about 6.4 cents per point. Anything above about 1.5 cents is a strong use of Atmos points, so a flat bed across the Pacific at this price is your points doing real work.",
      },
      {
        q: "Does Atmos Rewards charge fuel surcharges on Qantas awards?",
        a: "No, and that is the durable edge of this sweet spot. Atmos does not pass along the carrier imposed fuel surcharges that a Qantas business award can carry through some other programs, so the cash portion stays to modest taxes plus a small partner award fee, which rose to $20 on July 1 2026 and is still a rounding error on a trip like this.",
      },
      {
        q: "How do Canadians earn Atmos Rewards points for this?",
        a: "It is the hard part, because no Canadian bank transfers directly to Atmos. The cleanest route is Marriott Bonvoy, which moves to Atmos at 3 to 1 and adds a 5,000-point bonus for every 60,000 Bonvoy points transferred in one block, so 60,000 Bonvoy points land as 25,000 Atmos points. That means the 85,000 points for this seat take on the order of 204,000 Bonvoy points to build, so confirm the current ratio first, since transfers are one-way.",
      },
      {
        q: "Can I add a stopover on the way to Australia?",
        a: "Yes. Atmos lets you add a free enroute stopover of up to 14 days on a one-way international partner award, so you can break the trip in Fiji or another Pacific city on the same booking, turning one redemption into two destinations.",
      },
      {
        q: "How hard is it to find Qantas award space?",
        a: "This is the main catch. Qantas is famously tight with releasing long-haul business award seats to partners, and the best space tends to show up either about eleven months out when the schedule first opens or in the last week or two before departure. Plan this trip around the calendar rather than booking on a whim, watch for mixed-cabin results, and lean on the roughly 55,000-point premium economy fallback if business is scarce.",
      },
    ],
  },
  {
    slug: "united-ana-the-room-business-japan-tokyo-100k",
    program: "United",
    title: "United sweet spot: ANA \"The Room\" business class to Tokyo from about 100,000 miles, one-way and surcharge-free",
    dek: "United prices its own flights dynamically, but partner awards still sit at semi-fixed Saver levels, so the marquee United sweet spot to Asia is ANA's suite-like \"The Room\" business class to Tokyo, roughly 90,000 to 110,000 miles one-way with the fuel surcharges stripped out and booked as a one-way, which most programs will not let you do on ANA.",
    read: "5 min read",
    date: "Aug 2026",
    lastChecked: "2026-08-04",
    body:
      "United MileagePlus works differently from a fixed-chart program like Aeroplan, and it is worth saying so before we talk value. United prices its own flights dynamically, so a seat on United metal floats with the cash fare, and partner awards are the exception. When you book a Star Alliance partner through United the price still sits at United's semi-fixed Saver levels rather than the floating fare, and United does not pass along the carrier-imposed fuel surcharges its partners are known for. We already walked through the Europe version of that sweet spot on Lufthansa and SWISS, so this time the target is the one people cross the Pacific for, ANA's suite-like business class to Tokyo, the cabin known as The Room. The figures below are an example of how the Saver levels work, not a quote for any date, so always confirm the live price when you search.\n\nThe numbers look like this. North America to North Asia in business on a Star Alliance partner such as ANA prices in a band that has been landing roughly 90,000 to 110,000 miles one-way at the Saver level, with economy on the same partners from around 40,000 miles. United no longer publishes a single fixed partner chart the way it once did, so treat that band as approximate rather than a promise, and price your own dates before you assume a number. The real magic is on the cash side, because United absorbs the fuel surcharges, so an ANA business seat that would carry a few hundred dollars in surcharges through some other programs comes with only modest taxes attached, often under a hundred dollars outbound from a US gateway.\n\nHere is the cents-per-mile math on a realistic business booking. Say a one-way ANA business fare from the US to Tokyo would run about $6,000 in cash, and the award books for 100,000 miles plus roughly $100 in taxes and fees. That works out to (6000 minus 100) divided by 100000, times 100, which is about 5.9 cents per mile. Anything north of about 1.5 cents is a strong use of United miles, so a private suite across the Pacific at this price is your miles doing real work. Prices move, so confirm the live fare when you book.\n\nA couple of things make it sing. The Room really is the draw: an unusually wide business seat with a sliding door for privacy, a proper fully flat bed, and ANA's famously gentle service, and it is widely rated one of the best business cabins flying. United shows most ANA Saver space right on united.com, so you can hunt for a seat and book it online without a phone call, and the surcharge-free, one-way booking is the quiet structural edge here, because ANA's own program leans on round trips and some partner programs will not sell you a one-way on ANA at all. That means you can fly The Room out and come home on points or cash however you like. Search a range of dates, because Saver space in the front cabin is genuinely limited and the best days go early.\n\nNow the honest caveats, and there are a few. Earning the miles is the hard part for Canadians, because no Canadian bank transfers directly to United. The cleanest route is Marriott Bonvoy, which moves to United at 3 to 1 and tacks on a bonus when you transfer in 60,000-point blocks, so a 60,000-point transfer lands as roughly 25,000 United miles rather than 20,000, which means the 100,000 miles for this seat take on the order of 240,000 Bonvoy points to build. Plan the transfer around a real booking and confirm the current ratio first, since transfers are one-way. The cabin is the next catch: The Room only flies on ANA's Boeing 777-300ER, which currently runs to gateways like New York JFK and select San Francisco and Chicago frequencies, while Los Angeles, Seattle, Houston, and Washington are 787s with ANA's older business seat, and ANA's own Vancouver to Tokyo flight is a 787 too, so a Canadian chasing The Room usually positions to JFK, San Francisco, or Chicago and should check the aircraft on the seat map before booking. Because United's partner pricing is a semi-fixed band rather than a published chart, a date can price at the high end or occasionally above, so confirm the live number. And if business space is scarce, that roughly 40,000-mile economy seat on the same partners is the quiet everyday version of this sweet spot, and it prices just as cleanly with the same low surcharges.",
    href: "/cards?q=marriott",
    hrefLabel: "Bonvoy cards that feed United",
    shortAnswer:
      "United MileagePlus prices its own flights dynamically, but partner awards still sit at semi-fixed Saver levels, and the marquee United sweet spot to Asia is ANA's suite-like The Room business class to Tokyo, which has been landing roughly 90,000 to 110,000 miles one-way, with economy on the same partners from around 40,000. Because United does not pass along fuel surcharges, the cash portion stays small, so on a roughly $6,000 one-way business fare booked for 100,000 miles plus about $100 in taxes that is about 5.9 cents per mile, well above the 1.5 cents that already counts as a strong use. The quiet edge is that United books ANA as a surcharge-free one-way, which ANA's own program and some partners will not do. Earning is the hard part for Canadians, since no Canadian bank transfers directly to United and the cleanest route is Marriott Bonvoy at 3 to 1, so the 100,000 miles take on the order of 240,000 Bonvoy points to build. United no longer publishes a fixed partner chart, so treat the band as approximate and confirm the live price when you search.",
    faqs: [
      {
        q: "How many United miles is ANA business class to Tokyo?",
        a: "North America to North Asia in business on a Star Alliance partner such as ANA has been landing roughly 90,000 to 110,000 miles one-way at United's Saver level, with economy on the same partners from around 40,000 miles. United no longer publishes a single fixed partner chart, so treat that band as approximate and confirm the live price when you search.",
      },
      {
        q: "Is booking ANA's The Room on United miles a good value?",
        a: "Yes. On a roughly $6,000 one-way cash fare booked for 100,000 miles plus about $100 in taxes and fees, the math is (6000 minus 100) divided by 100000, times 100, which is about 5.9 cents per mile. Anything north of about 1.5 cents is a strong use of United miles, so a private suite across the Pacific at this price is your miles doing real work.",
      },
      {
        q: "Does United charge fuel surcharges on ANA awards?",
        a: "No, and that is a big part of the appeal. United does not pass along the carrier-imposed fuel surcharges that an ANA business seat can carry through some other programs, so the cash portion stays to modest taxes, often under a hundred dollars outbound from a US gateway.",
      },
      {
        q: "Why book ANA through United instead of another program?",
        a: "Two reasons: United absorbs the fuel surcharges, and it will sell you a one-way on ANA. ANA's own program leans on round trips and some partner programs will not book a one-way on ANA at all, so United lets you fly The Room out and come home however you like, on points or cash.",
      },
      {
        q: "How do Canadians earn United miles for this?",
        a: "It is the hard part, because no Canadian bank transfers directly to United. The cleanest route is Marriott Bonvoy, which moves to United at 3 to 1 and adds a bonus when you transfer in 60,000-point blocks, so 60,000 Bonvoy points land as roughly 25,000 United miles. That means the 100,000 miles for this seat take on the order of 240,000 Bonvoy points to build, so plan the transfer around a real booking and confirm the current ratio first, since transfers are one-way.",
      },
      {
        q: "Which flights actually have The Room?",
        a: "The Room only flies on ANA's Boeing 777-300ER, which currently runs to gateways like New York JFK and select San Francisco and Chicago frequencies, while Los Angeles, Seattle, Houston, and Washington are 787s with ANA's older business seat, and ANA's own Vancouver to Tokyo flight is a 787 too. A Canadian chasing The Room usually positions to JFK, San Francisco, or Chicago, and should check the aircraft on the seat map before booking.",
      },
    ],
  },
  {
    slug: "delta-award-deals-sun-mexico-caribbean-12k",
    program: "Delta",
    title: "Delta sweet spot: round-trip economy to the sun near 12,000 SkyMiles in the Award Deals",
    dek: "Delta SkyMiles has no award chart and prices dynamically, so the durable Delta sweet spot for a winter escape is its standing SkyMiles Award Deals page, where in recent rounds round-trip economy to the Bahamas, Mexico, and the Caribbean has dropped near 12,000 SkyMiles, and a Delta cardholder's discount lower.",
    read: "5 min read",
    date: "Jul 2026",
    lastChecked: "2026-07-31",
    body:
      "Delta SkyMiles works differently from Aeroplan or Avios, and it is only fair to say so before we talk value. There is no published award chart and no fixed distance bands, so SkyMiles prices awards dynamically, roughly tracking the cash fare, and across the whole program a mile is worth on average a little over a cent, call it about 1.2 cents. We already walked through one durable Delta sweet spot, the transatlantic flash sale to Europe, so this time the target is the one families reach for in the depths of a Canadian winter: a cheap round trip to the sun. The figures below are an example drawn from recent sales, not a quote for any date, so always confirm the live price when you search.\n\nHere is how it works. Delta keeps a standing SkyMiles Award Deals page on delta.com, a permanent feature where a rotating set of discounted award routes is published, and on top of that it runs shorter unadvertised flash sales a few times a year. The sun destinations are the ones worth watching. In the recent rounds, round-trip economy to the Bahamas, Mexico, and much of the Caribbean has come down to around 12,000 SkyMiles, with the very best dates and shorter hops dipping lower, and Central and South America a step up from there. Because the list rotates and the flash sales are short, this is a book-it-when-you-see-it deal rather than one you plan months ahead, and the cheapest fares are usually the no-frills Main Basic cabin.\n\nHere is the cents-per-mile math on a realistic economy booking. Say a round trip from a Delta hub to Cancun or Nassau would otherwise cost about $450 in cash, and the award books for 12,000 SkyMiles plus roughly $90 in taxes and fees. That works out to (450 minus 90) divided by 12000, times 100, which is about 3 cents per mile. Against a program that averages a little over a cent, that is your SkyMiles doing real work, and if you happen to hold an eligible Delta American Express card, the TakeOff 15 benefit knocks 15 percent off the mileage, dropping the same seat to about 10,200 miles and nudging the value closer to 3.5 cents. Confirm the live fare when you book, because prices move and the example is only there to show the shape of the deal.\n\nOne honest note on TakeOff 15. That 15 percent discount applies only to Delta-operated award flights booked on delta.com, not to partner awards, and it requires an eligible Delta co-branded Amex. Most of those cards are US products that Canadians cannot easily hold, so treat the discount as a nice bonus if you have the card rather than the baseline you should count on.\n\nA couple of things make it sing. A sun destination is exactly the trip a family actually takes in February, so this is a redemption most households will use far more often than a lie-flat seat to Asia, and Delta's network into Mexico, the Bahamas, and the Caribbean is deep. The flights are short enough that the bare Main Basic fare stings much less than it would on a long haul, and because the Award Deals page is a standing feature rather than a single fleeting sale, there is always a fresh batch of discounted routes to check rather than one date you have to catch. Search a range of dates within the travel window, because award space at the sale price is genuinely limited and the best days go early.\n\nNow the honest caveats, and there are a few. Earning the SkyMiles is the hard part for Canadians. Amex Canada Membership Rewards does not transfer to Delta, so the cleanest route is Marriott Bonvoy, which moves to Delta at 3 to 1 with no transfer bonus, meaning 60,000 Bonvoy points become 20,000 SkyMiles. The sale routes also lean on US gateways, so a Canadian often books a Delta flight from Toronto, Montreal, or another home city into a US hub and strings the sun leg onto the same ticket, or positions to the hub separately, so check whether your city is included before you assume the low number. Main Basic is the cheapest bucket for a reason: no advance seat selection, last boarding group, and no changes, so read the fare rules before you commit. And because the deals are dynamically priced and short-lived, there is no date you can plan around in advance, so set an alert on the Award Deals page and pounce when a good one lands.",
    href: "/cards?q=marriott",
    hrefLabel: "Bonvoy cards that feed Delta",
    shortAnswer:
      "Delta SkyMiles has no award chart and prices dynamically, averaging a little over a cent a mile, so the durable Delta sweet spot for a winter escape is its standing SkyMiles Award Deals page, where in recent rounds round-trip economy to the Bahamas, Mexico, and the Caribbean has dropped near 12,000 SkyMiles, with the best dates lower. On a roughly $450 round-trip cash fare booked for 12,000 SkyMiles plus about $90 in taxes and fees, that is around 3 cents per mile, and an eligible Delta Amex cardholder's 15 percent TakeOff 15 discount trims the seat to about 10,200 miles, closer to 3.5 cents. Earning the miles is the hard part for Canadians, since Amex Canada does not transfer to Delta and the cleanest route is Marriott Bonvoy, which moves 3 to 1 with no bonus, so 60,000 Bonvoy becomes 20,000 SkyMiles. These are example figures from recent sales, not a quote for any date, so confirm the live price when you book.",
    faqs: [
      {
        q: "How many SkyMiles is a round trip to the sun in Delta's Award Deals?",
        a: "In the recent rounds, round-trip economy to the Bahamas, Mexico, and much of the Caribbean has come down to around 12,000 SkyMiles, with the very best dates and shorter hops dipping lower, and Central and South America a step up from there. Delta prices dynamically with no award chart, and the discounted routes rotate, so confirm the live price when you search because the cheapest fares are usually the no-frills Main Basic cabin.",
      },
      {
        q: "Is a sun-destination Award Deal a good value on Delta?",
        a: "Yes, for economy it is. On a roughly $450 round-trip cash fare booked for 12,000 SkyMiles plus about $90 in taxes and fees, the math is (450 minus 90) divided by 12000, times 100, which is about 3 cents per mile. Against a program that averages a little over a cent a mile, that is your SkyMiles doing real work.",
      },
      {
        q: "What is TakeOff 15 and can Canadians use it?",
        a: "TakeOff 15 knocks 15 percent off the mileage on Delta-operated award flights booked on delta.com, so a 12,000-mile seat drops to about 10,200 and nudges the value closer to 3.5 cents. It applies only to Delta's own flights, not partner awards, and it requires an eligible Delta co-branded Amex, most of which are US products Canadians cannot easily hold, so treat it as a bonus rather than the baseline.",
      },
      {
        q: "How do Canadians earn Delta SkyMiles?",
        a: "Earning is the hard part, because Amex Canada Membership Rewards does not transfer to Delta. The cleanest route is Marriott Bonvoy, which moves to Delta at 3 to 1 with no transfer bonus, so 60,000 Bonvoy points become 20,000 SkyMiles.",
      },
      {
        q: "Can I fly to these sun destinations from Canada?",
        a: "The sale routes lean on US gateways, so a Canadian often books a Delta flight from Toronto, Montreal, or another home city into a US hub and strings the sun leg onto the same ticket, or positions to the hub separately. Check whether your city is included in the deal before you assume the low number, because the discounted routes rotate.",
      },
      {
        q: "What is Main Basic and what does it not include?",
        a: "Main Basic is Delta's cheapest economy bucket and usually the one the sale fares book into. It comes with no advance seat selection, the last boarding group, and no changes, so read the fare rules before you commit, though on a short hop to the sun those restrictions sting far less than they would on a long haul.",
      },
    ],
  },
  {
    slug: "westjet-companion-voucher-domestic-economy-119",
    program: "WestJet",
    title: "WestJet sweet spot: fly a companion across Canada or to the US for a fixed $119 base fare",
    dek: "WestJet points are a flat cent each with no award chart, so the everyday sweet spot for Canadians is the RBC companion voucher used at home, capping a second economy base fare across Canada and to the continental US at a fixed $119 on the World Elite card, or $199 on the no-fee version.",
    read: "5 min read",
    date: "Jul 2026",
    lastChecked: "2026-07-28",
    body:
      "WestJet Rewards works differently from the mileage programs, and it helps to say so up front. WestJet points are worth a flat cent each, 100 points knocks $1 off the base fare, surcharges, bags, and seats, with no award chart and no blackout dates, so there is no hidden business class deal buried in the points the way there is with Aeroplan or Avios. The real WestJet sweet spot for Canadians is the annual companion voucher that comes with the WestJet RBC cards. We already walked through the marquee version of that voucher, flying a companion to Europe in Premium for a fixed $499, so this time the target is the everyday version most families will actually use far more often: the same voucher on a domestic or transborder trip. The figures below are an example of how the voucher works, not a quote for any date, so always confirm the live fare when you book.\n\nHere is how it works. Once a year the WestJet RBC card hands you a round-trip companion voucher, and your travel partner books the exact same itinerary as you and pays a fixed base fare instead of the going rate. On the WestJet RBC World Elite Mastercard, that fixed fare for travel within Canada or to and from the continental US is $119 in economy or $219 in Premium. There is also a no-fee card, the WestJet RBC Mastercard, whose voucher caps the same domestic and continental US economy base fare at $199, or $299 in Premium. Either way your companion still owes the taxes and fees on top, and you still pay your own fare in full, but that second base fare is locked no matter how pricey the route gets.\n\nHere is the value math on a realistic booking. Say a peak-summer economy round trip from Toronto to Vancouver prices around $600 all in, of which roughly $450 is the base fare the voucher discounts and the rest is taxes and fees. With the World Elite voucher your companion pays the fixed $119 base fare plus those same taxes and fees, so about $270 instead of $600. That is roughly $330 off the second seat, on a card whose annual fee is $139, so a single voucher more than pays for the card in one trip. Confirm the live fare when you book, because prices move and the example is only there to show the shape of the deal.\n\nA couple of things make it sing. The voucher works on any available WestJet fare on the route, so unlike a fixed award chart there are no capacity controls beyond the seats actually being for sale, and the savings scale with how expensive the route is. That makes the priciest domestic and transborder runs the place to spend it: a long peak-season transcontinental like Toronto or Halifax to Vancouver, or an expensive last-minute trip where the cash fare has ballooned. And if the $139 annual fee gives you pause, the no-fee WestJet RBC Mastercard still hands you a voucher every year, just at the higher $199 domestic economy base fare, which is a genuinely good deal for a card that costs nothing to hold.\n\nNow the honest caveats, and there are a few. You need two people traveling together on the same booking, and the companion still pays the taxes and fees, which on a domestic round trip usually run a bit over a hundred dollars. The bigger catch is that WestJet adds some carrier charges to companion voucher bookings that a plain cash booking would not, the so-called Other ATC fees, so always compare the all-in companion price against the all-in cash price before you commit. On a cheap seat-sale fare, say a $250 round trip, the voucher can actually come out roughly even or even cost a touch more once those fees are counted, so this trick only really wins when the cash fare is high. The voucher is also one per year, and the way you unlock it is changing: starting November 5 2026 the World Elite card asks for $5,000 of annual spend to earn the voucher and the no-fee card asks for $2,500, though vouchers issued before that date carry no minimum spend. Peak-season seats sell out early, so book ahead and stay flexible, and remember the points themselves are worth a flat cent each, handy for shaving cash off any WestJet fare but not the place to hunt for outsized value.",
    href: "/cards?q=westjet",
    hrefLabel: "WestJet RBC cards",
    shortAnswer:
      "WestJet Rewards points are a flat cent each with no award chart, so the everyday WestJet sweet spot for Canadians is the annual RBC companion voucher used at home. It caps your travel partner's base fare for travel within Canada and to and from the continental US at a fixed $119 in economy on the World Elite card, or $199 on the no-fee WestJet RBC Mastercard. On a peak-summer Toronto to Vancouver round trip that might sell for around $600 all in, the companion pays the fixed $119 base fare plus the same taxes and fees, roughly $270 instead of $600, which is about $330 off the second seat on a card whose annual fee is $139. Just know WestJet adds some Other ATC fees to voucher bookings, so on a cheap seat-sale fare the voucher can come out roughly even, and it only really wins when the cash fare is high, so confirm the live fare before you book.",
    faqs: [
      {
        q: "How much does a companion pay to fly across Canada with the WestJet voucher?",
        a: "For travel within Canada or to and from the continental US, the companion's base fare is capped at a fixed $119 in economy or $219 in Premium on the WestJet RBC World Elite Mastercard, plus the usual taxes and fees. The no-fee WestJet RBC Mastercard caps the same domestic and continental US economy base fare at $199, or $299 in Premium. You still pay your own fare in full.",
      },
      {
        q: "Is the WestJet companion voucher worth it for a domestic trip?",
        a: "It can be, on a pricey route. On a peak-summer Toronto to Vancouver round trip that might sell for around $600 all in, the companion pays the fixed $119 base fare plus the same taxes and fees, so about $270 instead of $600. That is roughly $330 off the second seat, on a card whose annual fee is $139, so one voucher more than pays for the card in a single trip.",
      },
      {
        q: "Should I get the World Elite card or the no-fee WestJet card for the voucher?",
        a: "Both hand you an annual companion voucher. The World Elite card charges a $139 annual fee but caps the domestic economy base fare lower, at $119, while the no-fee WestJet RBC Mastercard costs nothing to hold and caps it at $199. If you will use the voucher on expensive routes every year the World Elite card usually wins, but the no-fee card is a genuinely good deal for someone who wants a voucher without paying an annual fee.",
      },
      {
        q: "Are there extra fees on a WestJet companion voucher booking?",
        a: "Yes, and this is the honest catch. The companion still owes the taxes and fees, which on a domestic round trip usually run a bit over a hundred dollars, and WestJet adds some carrier charges to voucher bookings, the Other ATC fees, that a plain cash booking would not. Always compare the all-in companion price against the all-in cash price before you commit.",
      },
      {
        q: "When is the WestJet companion voucher not worth using?",
        a: "On a cheap fare. Because the voucher adds Other ATC fees, a cheap seat-sale round trip of around $250 can come out roughly even or even cost a touch more once those fees are counted. The voucher only really wins when the cash fare is high, so save it for the priciest transcontinental or last-minute trips rather than a discounted seat sale.",
      },
      {
        q: "How do I earn the WestJet companion voucher, and is that changing?",
        a: "The voucher comes with the WestJet RBC cards, once after your first purchase and then one more each year. Starting November 5 2026 the World Elite card asks for $5,000 of annual spend to unlock the voucher and the no-fee card asks for $2,500, though vouchers issued before that date carry no minimum spend.",
      },
    ],
  },
  {
    slug: "avios-qatar-qsuites-montreal-doha-70k",
    program: "Avios",
    title: "Avios sweet spot: Qatar Qsuites business class to Doha from about 70,000 points, nonstop from Montreal or Toronto",
    dek: "Avios is shared with Qatar Airways, so one of its best redemptions is a Qsuites suite-with-a-door to Doha for about 70,000 points one-way off-peak in business, and the quiet bonus for Canadians is that Qatar flies it nonstop from both Montreal and Toronto with modest surcharges.",
    read: "5 min read",
    date: "Jul 2026",
    lastChecked: "2026-07-24",
    body:
      "Avios is the shared currency behind British Airways, Aer Lingus, Iberia, and Qatar Airways, and one balance moves freely between them at the same rate. We have already covered the friendly Aer Lingus run to Dublin, so this time the target is the one that turns heads, Qatar Airways Qsuites business class to Doha, and the quiet good news for Canadians is that Qatar flies it nonstop from both Montreal and Toronto. The figures below are an example of how the Qatar distance chart works, not a quote for any specific date, so always confirm the live price when you search.\n\nQatar Airways prices its own awards off a fixed, distance based chart through its Privilege Club, and one Avios balance moves freely between British Airways and Qatar Privilege Club at 1 to 1, so Canadian points land right where you need them. An off-peak Qsuites seat from Montreal or Toronto to Doha prices at about 70,000 Avios one-way in business, and if you want to carry on past Doha to somewhere else in the Middle East or down to Africa, the onward band runs about 75,000. Peak dates cost considerably more, sometimes close to double, so the off-peak calendar is where the value lives. Treat these as approximate bands rather than a fixed quote, because the Avios charts do get adjusted, and price your own dates before you assume a number.\n\nHere is the cents-per-point math on a realistic business booking. Say a one-way Qsuites fare from Toronto or Montreal to Doha would run about $4,000 in cash, and the award books for 70,000 Avios plus taxes and fees. Qatar keeps the carrier surcharges on its own metal modest, so outbound from Canada those fees often land around $150 to $200, call it $180. That works out to (4000 minus 180) divided by 70000, times 100, which is about 5.5 cents per Avios. Anything above about 1.5 cents is a strong use of Avios, so a suite with a door to the Gulf at this price is your points doing real work. Prices move, so confirm the live fare when you book.\n\nA couple of things make it sing. Qsuites is genuinely one of the best business seats flying, a private suite with a closing door, and on the middle pairs the panels fold down into a double bed you can share with a travel partner, which is rare in the air. Qatar also allows a stopover in Doha on many award itineraries, so you can break the trip for a few days and see the city on the same booking, and Doha is a comfortable, easy hub to spend a couple of nights. And for Canadians the earning side is refreshingly doable: RBC Avion transfers to British Airways Avios at 1 to 1 and runs a 30 percent transfer bonus a couple of times a year, and Amex Membership Rewards in Canada feeds Avios as well, so most points collectors here can build a Qsuites balance without anything exotic.\n\nNow the honest caveats, and there are a few. The biggest one is space, because Qatar is famously tight with releasing Qsuites award seats to partners, and the best availability tends to show up either about eleven months out when the schedule first opens or in the last week or two before departure, so this is a trip to plan around the calendar rather than book on a whim. The 70,000 figure is the off-peak band, and peak dates can run close to double, so watch the date grid before you assume the low number. Taxes are modest outbound from Canada, but the Doha origin return carries higher departure fees, so budget for that on a round trip. And transfers are one-way, both from Avion or Amex into Avios and from British Airways over to Qatar Privilege Club, so only move the points once you have found the seat you want. Price your specific trip before you assume a figure, because the Avios charts do get tinkered with.",
    href: "/travel/avios-sweet-spots-rbc-avion-transfer",
    hrefLabel: "Full Avios guide",
    shortAnswer:
      "One of Avios's marquee sweet spots is Qatar Airways Qsuites business class to Doha, which Qatar flies nonstop from both Montreal and Toronto, priced off a fixed distance chart at about 70,000 Avios one-way off-peak in business, with the onward band past Doha to the Middle East or Africa about 75,000. Qatar keeps surcharges on its own metal modest, so taxes outbound from Canada often land around $150 to $200, and on a roughly $4,000 one-way cash fare that is around 5.5 cents per Avios, well above the 1.5 cents that already counts as a strong use. For Canadians the earning is doable through RBC Avion at 1 to 1 with periodic 30 percent bonuses and through Amex Membership Rewards, with one Avios balance moving freely between British Airways and Qatar Privilege Club at 1 to 1. Just know Qatar is stingy with releasing partner Qsuites space and peak dates cost considerably more, so treat 70,000 as an approximate off-peak band and confirm the live price when you search.",
    faqs: [
      {
        q: "How many Avios is Qatar Qsuites business class to Doha?",
        a: "About 70,000 Avios one-way off-peak from Montreal or Toronto, priced off Qatar's fixed distance chart, with the onward band past Doha to the Middle East or Africa about 75,000. Peak dates cost considerably more, sometimes close to double, so the off-peak calendar is where the value lives. Treat these as approximate bands and confirm the live price when you search.",
      },
      {
        q: "Is Qsuites to Doha a good value on Avios?",
        a: "Yes. On a roughly $4,000 one-way cash fare booked for 70,000 Avios plus about $180 in taxes and fees, the math is (4000 minus 180) divided by 70000, times 100, which is about 5.5 cents per Avios. Anything above about 1.5 cents is a strong use of Avios, so a suite with a door to the Gulf at this price is your points doing real work.",
      },
      {
        q: "Does Qatar fly to Canada, or do I have to position to the US?",
        a: "You do not have to position. Qatar Airways flies nonstop to Doha from both Montreal and Toronto with Qsuites-equipped aircraft, so a Canadian can start the trip at home. The distance chart prices those Canadian departures the same as the US East Coast at about 70,000 Avios off-peak in business.",
      },
      {
        q: "How do Canadians earn the Avios for this?",
        a: "RBC Avion transfers to British Airways Avios at 1 to 1 and runs a 30 percent transfer bonus a couple of times a year, and Amex Membership Rewards in Canada feeds Avios as well. One Avios balance moves freely between British Airways and Qatar Privilege Club at 1 to 1, so you can book the Qatar award directly. Transfers are one-way, so only move points once you have found the seat you want.",
      },
      {
        q: "Does Qatar charge fuel surcharges on these awards?",
        a: "Qatar keeps the carrier surcharges on its own metal modest, so the taxes and fees outbound from Canada often land around $150 to $200 one-way. The Doha origin return carries higher departure fees, though, so budget for that on a round trip.",
      },
      {
        q: "How hard is it to find Qsuites award space?",
        a: "This is the main catch. Qatar is famously tight with releasing Qsuites award seats to partners, and the best availability tends to show up either about eleven months out when the schedule first opens or in the last week or two before departure. Plan this trip around the calendar rather than booking on a whim, and stay flexible on dates.",
      },
    ],
  },
  {
    slug: "aeroplan-south-america-business-bogota-50k",
    program: "Aeroplan",
    title: "Aeroplan sweet spot: business class to South America from about 50,000 points on Avianca or Copa",
    dek: "Aeroplan prices its Star Alliance partners off a fixed distance chart, so a quiet, durable sweet spot for Canadians is business class to South America on Avianca or Copa, about 50,000 points one-way to closer cities like Bogota or Lima and 60,000 to deep South America like Buenos Aires, with the fuel surcharges stripped out.",
    read: "5 min read",
    date: "Jul 2026",
    lastChecked: "2026-07-21",
    body:
      "Aeroplan is the home currency for most Canadian points collectors, and that is exactly why its quieter sweet spots are worth knowing, not just the famous lie-flat run to Europe. Aeroplan prices flights on its Star Alliance partners off a fixed, distance based chart rather than the floating cash fare, and one of the most underrated corners of that chart is business class down to South America on Avianca and Copa. The figures below are an example of how the chart works, not a quote for any specific date, so always confirm the live price when you search.\n\nThe numbers look like this. Closer, northern South America such as Bogota in Colombia or Lima in Peru sits in the band that prices business class at about 50,000 points one-way, with economy closer to 30,000. Push deeper into the continent, to Buenos Aires, Sao Paulo, or Santiago, and the longer distance moves business to about 60,000 points one-way and economy to roughly 40,000. Avianca flies a nonstop from Toronto to Bogota a few days a week, and Copa threads the rest of the continent through its Panama City hub, so a Canadian has a couple of clean ways in. Treat these as approximate bands rather than a fixed quote, and price your own dates before you assume a number.\n\nHere is the cents-per-point math on a realistic business booking. Say a one-way business fare from Toronto to Bogota would run about $2,000 in cash, and the award books for 50,000 points plus taxes and fees. Because Aeroplan does not pass along fuel surcharges and Avianca and Copa are light on them to begin with, the cash portion stays small, often around $120 to $140 outbound from Canada, so call it $130. That works out to (2000 minus 130) divided by 50000, times 100, which is about 3.7 cents per point. Anything north of 2 cents is a good use of Aeroplan, so this sits comfortably in the range where your points are doing real work, even if the number is more modest than the Europe or Asia business deals. Prices move, so confirm the live fare when you book.\n\nA few things make it sing. The no-surcharge policy keeps the cash low, and Aeroplan lets you add a stopover of up to 45 days for a flat 5,000 points, so you can break the trip in Bogota or Panama City and see two places on one award. There is even a neat quirk worth knowing: Aeroplan treats Panama City as part of its North America zone, so routing through it can sometimes price lower than you would expect. And here is the part that sets this apart from the Delta, United, and Alaska sweet spots we have covered, where earning the miles is the hard part for Canadians. Aeroplan is the easy one. Amex Membership Rewards in Canada transfers to Aeroplan at a clean 1 to 1, and the TD, CIBC, and Amex Aeroplan co-branded cards earn it directly, so most Canadians can build this balance without any exotic manoeuvres.\n\nNow the honest caveats, and there are a few. The biggest one is the cabin: Avianca's Toronto to Bogota flight uses a narrowbody A319 and Copa flies all 737s, so the business seat here is a recliner with extra room, not a lie-flat pod. It is a comfortable step up for a daytime run to South America, but do not walk on expecting the flat bed you would get to Europe. Book the partner, not Air Canada, because Air Canada's own flights on these routes are dynamically priced and can cost far more points than the fixed Avianca or Copa award. Partner business space is genuinely limited and the Toronto to Bogota nonstop only operates a few days a week, so stay flexible and search a range of dates. The good news for a post that lives forever is that Aeroplan left every South America band untouched in its June 2026 chart update, so these numbers are about as durable as award pricing gets, but price your specific trip before you assume a figure.",
    href: "/cards?q=aeroplan",
    hrefLabel: "Cards that earn Aeroplan",
    shortAnswer:
      "Aeroplan prices Star Alliance partner flights off a fixed distance chart, so the quiet, durable sweet spot for Canadians is business class to South America on Avianca or Copa: about 50,000 points one-way to closer cities such as Bogota or Lima, and 60,000 to deep South America like Buenos Aires or Sao Paulo, with economy near 30,000 to 40,000. On a roughly $2,000 one-way business fare booked for 50,000 points plus about $130 in taxes, that is around 3.7 cents per point, comfortably above the 2 cents that already makes a good Aeroplan redemption. Aeroplan does not pass fuel surcharges and lets you add a stopover for 5,000 points, and unlike the US programs it is easy for Canadians to earn through Amex Membership Rewards at 1 to 1 and the Aeroplan co-branded cards. Just know the business cabin on Avianca's A319 and Copa's 737 is a recliner rather than lie-flat, and South America pricing was left untouched in the June 2026 chart, so these bands are durable, though you should still confirm the live price when you search.",
    faqs: [
      {
        q: "How many Aeroplan points is business class to South America?",
        a: "About 50,000 points one-way to closer, northern South America such as Bogota in Colombia or Lima in Peru, and about 60,000 to deeper destinations like Buenos Aires, Sao Paulo, or Santiago, with economy closer to 30,000 and 40,000. Aeroplan prices its Star Alliance partners off a fixed distance chart, so treat these as approximate bands and confirm the live price when you search.",
      },
      {
        q: "Is business class to South America a good value on Aeroplan?",
        a: "Yes. On a roughly $2,000 one-way business fare from Toronto to Bogota booked for 50,000 points plus about $130 in taxes, the math is (2000 minus 130) divided by 50000, times 100, which is about 3.7 cents per point. Anything north of 2 cents is a good use of Aeroplan, so this sits comfortably in the range where your points are doing real work, even if it is more modest than the Europe or Asia business deals.",
      },
      {
        q: "Should I book Air Canada or a partner like Avianca or Copa?",
        a: "Book the partner. Avianca and Copa price on Aeroplan's fixed distance chart at about 50,000 to 60,000 points in business, while Air Canada's own flights on these routes are dynamically priced and can cost far more points. Avianca flies a nonstop from Toronto to Bogota a few days a week, and Copa threads the rest of the continent through its Panama City hub.",
      },
      {
        q: "Does Aeroplan charge fuel surcharges on these awards?",
        a: "No. Aeroplan does not pass along carrier-imposed fuel surcharges, and Avianca and Copa are light on them to begin with, so the cash portion stays small, often around $120 to $140 outbound from Canada. Aeroplan also lets you add a stopover of up to 45 days for a flat 5,000 points, so you can see Bogota or Panama City on the same award.",
      },
      {
        q: "How do Canadians earn Aeroplan points for this?",
        a: "This is the easy part, unlike the US programs where earning is the hard step. Amex Membership Rewards in Canada transfers to Aeroplan at a clean 1 to 1, and the TD, CIBC, and Amex Aeroplan co-branded cards earn it directly, so most Canadians can build this balance without any exotic manoeuvres.",
      },
      {
        q: "Is the business cabin lie-flat?",
        a: "No. Avianca's Toronto to Bogota flight uses a narrowbody A319 and Copa flies all 737s, so the business seat here is a recliner with extra room, not a lie-flat pod. It is a comfortable step up for a daytime run to South America, but do not expect the flat bed you would get to Europe.",
      },
    ],
  },
  {
    slug: "flying-blue-promo-rewards-europe-business-50k",
    program: "Flying Blue",
    title: "Flying Blue sweet spot: business class to Europe from about 50,000 miles in the monthly Promo Rewards",
    dek: "Flying Blue prices awards dynamically with no fixed chart, so the durable sweet spot is the Promo Rewards it releases on the first of every month, where in a good month a North American to Europe business seat on Air France or KLM drops to roughly 45,000 to 60,000 miles one-way and economy near 20,000, though which routes and cabins are discounted rotates month to month.",
    read: "5 min read",
    date: "Jul 2026",
    lastChecked: "2026-07-17",
    body:
      "Flying Blue, the shared program behind Air France, KLM, and their SkyTeam partners, works differently from a fixed-chart program like Aeroplan or Avios, and it is only fair to say so before we talk value. There is no published award chart and no distance bands to memorize. Flying Blue prices awards dynamically, roughly tracking the cash fare, so the same business seat can cost 60,000 miles on a quiet Tuesday and nearly triple that on a peak Friday. The genuine, repeatable sweet spot lives somewhere more reliable: the Promo Rewards that Flying Blue releases on the first of every single month. The figures below are an example of how a good promo month prices, not a quote for any date, so always confirm the live price when you search.\n\nHere is how the promo works. Every route has a minimum rate, and each month Flying Blue takes a rotating set of routes and knocks up to 25 percent off that minimum, publishing the list on the first with a booking deadline and a set travel window. In a strong month, North America to Europe has come down to around 18,750 to 25,000 miles one-way in economy, about 30,000 in premium economy, and roughly 45,000 to 60,000 miles one-way in business, the lie-flat cabin on the Air France and KLM widebodies. Canadian gateways like Toronto and Montreal do rotate into the list, both flown by Air France and KLM, but the honest catch is that which cities and which cabins get discounted changes every month, so the trick is flexibility on both your gateway and your travel month. Treat these as approximate promo bands rather than a fixed quote, and price your specific trip before you assume a number.\n\nHere is the cents-per-mile math on a realistic business booking in a promo month. Say the cash fare is about $3,500 one-way and the award books for 50,000 miles plus taxes and fees. Outbound from a North American city those fees are more modest than on the return, so call it roughly $250 all in to be safe. That works out to (3500 minus 250) divided by 50000, times 100, which is about 6.5 cents per mile. Across the whole program a Flying Blue mile is worth a little over a cent on average, so anything north of about 1.5 cents is a strong use, and a flat bed to Europe at this price is your miles doing real work. Prices move, so confirm the live fare when you book.\n\nA couple of things make it sing for Canadians. As of January 2026, Amex Canada moved its Membership Rewards transfer to Flying Blue to a clean 1 to 1, which is a real improvement and makes Amex the most direct way for a Canadian to build a Flying Blue balance, and Amex Canada has even run the occasional transfer bonus on top. Flying Blue also lets you break a long trip with a stopover on some award routings, turning one redemption into two destinations, and the promo list refreshing every month means there is always a new batch of discounted routes to check rather than one fleeting flash sale. Search a range of dates within the travel window, because promo award space is genuinely limited and the best days go early.\n\nNow the honest caveats, and there are a few. Unlike Aeroplan or Alaska, Flying Blue does pass along carrier-imposed fuel surcharges, so the cash portion is not trivial, especially on the Europe-origin return, where taxes and fees on an Air France or KLM business award can push past $500 in a single direction. Budget for that before you assume the whole round trip is cheap. The promo routes rotate, so your home city may not be discounted in the month you want to fly, which is why gateway flexibility matters so much here. And because non-promo dates are dynamically priced, a seat outside the promo list or travel window can cost two or three times as many miles, so the discount really is the whole game. If Amex is not your currency, Marriott Bonvoy also feeds Flying Blue at 3 to 1 with a 5,000-mile bonus for every 60,000 points moved in one block, so 60,000 Bonvoy points land as 25,000 miles, a slower but workable backup. Confirm the current ratios and any transfer bonus before you move points, since transfers are one-way.",
    href: "/cards?q=amex",
    hrefLabel: "Amex cards that feed Flying Blue",
    shortAnswer:
      "Flying Blue prices awards dynamically with no fixed chart, so the durable sweet spot for Canadians is the Promo Rewards it releases on the first of every month, up to 25 percent off a route's minimum rate. In a good month, North America to Europe business class on Air France or KLM drops to roughly 45,000 to 60,000 miles one-way, with economy near 18,750 to 25,000, though which cities and cabins are discounted rotates month to month. On a roughly $3,500 one-way business fare booked for 50,000 miles plus about $250 in taxes outbound from North America, that is about 6.5 cents per mile, well above the roughly 1 cent a Flying Blue mile is worth on average. For Canadians the cleanest feed is Amex Membership Rewards, which moved to a clean 1 to 1 transfer in January 2026, with Marriott Bonvoy at 3 to 1 plus a bonus as a backup. Just know that Flying Blue passes fuel surcharges, so taxes run higher than on Aeroplan, and these are approximate promo bands, not a quote for any date, so confirm the live price when you search.",
    faqs: [
      {
        q: "How many Flying Blue miles is North America to Europe in business class?",
        a: "There is no fixed chart, because Flying Blue prices dynamically, but in a good Promo Rewards month a North America to Europe business seat on Air France or KLM has come down to roughly 45,000 to 60,000 miles one-way, with economy near 18,750 to 25,000 and premium economy about 30,000. Which cities and cabins get the discount rotates every month, so treat these as approximate promo bands and confirm the live price when you search.",
      },
      {
        q: "What are Flying Blue Promo Rewards and how often do they change?",
        a: "Promo Rewards are Flying Blue's monthly discount, up to 25 percent off a route's minimum rate, released on the first of every single month with a booking deadline and a set travel window. Because the list refreshes monthly, there is always a fresh batch of discounted routes to check rather than one fleeting flash sale, but the routes and cabins that get discounted rotate, so your home city may not be included every month.",
      },
      {
        q: "Is booking business class to Europe on Flying Blue a good value?",
        a: "In a promo month, yes. On a roughly $3,500 one-way cash fare booked for 50,000 miles plus about $250 in taxes outbound from North America, the math is (3500 minus 250) divided by 50000, times 100, which is about 6.5 cents per mile. A Flying Blue mile is worth a little over a cent on average, so anything north of about 1.5 cents is a strong use, and a flat bed to Europe at this price is your miles doing real work.",
      },
      {
        q: "How do Canadians earn Flying Blue miles?",
        a: "The cleanest route is Amex Canada Membership Rewards, which moved to a clean 1 to 1 transfer to Flying Blue in January 2026, and Amex has run the occasional transfer bonus on top. Marriott Bonvoy is a backup, moving at 3 to 1 with a 5,000-mile bonus for every 60,000 points transferred in one block, so 60,000 Bonvoy points land as 25,000 miles. Confirm the current ratios and any bonus before you move points, since transfers are one-way.",
      },
      {
        q: "Does Flying Blue charge fuel surcharges on awards?",
        a: "Yes, and this is the honest catch that sets it apart from Aeroplan or Alaska. Flying Blue passes along carrier-imposed fuel surcharges, so the cash portion is not trivial, especially on the Europe-origin return, where taxes and fees on an Air France or KLM business award can push past $500 in a single direction. Budget for that before you assume the whole round trip is cheap.",
      },
      {
        q: "What if my city is not in the Promo Rewards this month?",
        a: "That is the main limitation, because the discounted routes and cabins rotate every month, so flexibility on both your gateway and your travel month matters a lot. Non-promo dates are dynamically priced and can cost two or three times as many miles, so the discount really is the whole game. Canadian gateways like Toronto and Montreal do rotate into the list, so it is worth checking each month when the new promo drops.",
      },
    ],
  },
  {
    slug: "alaska-jal-business-vancouver-tokyo-60k",
    program: "Alaska",
    title: "Alaska sweet spot: Vancouver or Seattle to Tokyo in JAL business for 60,000 Atmos points with no fuel surcharges",
    dek: "Alaska's Mileage Plan is now Atmos Rewards, but it still prices partner awards off a fixed distance chart, so the durable sweet spot for Canadians is a lie-flat Japan Airlines seat from Vancouver or Seattle to Tokyo for about 60,000 points one-way, with the fuel surcharges stripped out.",
    read: "5 min read",
    date: "Jul 2026",
    lastChecked: "2026-07-14",
    body:
      "Alaska's frequent flyer program was renamed Atmos Rewards in 2026, but the thing that made the old Mileage Plan special is still intact, so it is worth saying up front. In a year when almost every US program has drifted to dynamic pricing, Atmos still prices its partner awards off a fixed, distance based chart, and it still does not pass along the carrier imposed fuel surcharges that some partners are known for. That combination is where the real value lives, and for Canadians the standout is Japan Airlines business class to Tokyo, because Vancouver is one of the closest gateways to Japan and the chart rewards that short distance. The figures below are an example of how the chart works, not a quote for any date, so always confirm the live price when you search.\n\nThe numbers look like this. Vancouver or Seattle to Tokyo on Japan Airlines is just under 5,000 flown miles, which lands it in the chart band that prices business class at about 60,000 Atmos points one-way. Push the start point down the coast and the distance tips over 5,000 miles, so Los Angeles, San Francisco, and San Diego to Tokyo move up to about 75,000 points one-way in business. That is the quiet advantage of flying out of Vancouver: the same lie-flat JAL seat costs a Canadian roughly 15,000 fewer points than it does someone starting in California, purely because of the distance band. Treat these as approximate bands rather than a fixed quote, because Atmos does adjust the chart.\n\nHere is the cents-per-point math on a realistic business booking. Say the cash fare is about $3,500 one-way and the award books for 60,000 points plus taxes and fees. Because Atmos strips the JAL fuel surcharges, the cash portion stays small, often well under $100 outbound from Canada, so call it roughly $150 all in to be safe. That works out to (3500 minus 150) divided by 60000, times 100, which is about 5.6 cents per point. Anything above about 1.5 cents is a strong use of Atmos points, so a flat bed to Tokyo at this price is your points doing real work. Prices move, so confirm the live fare when you book.\n\nTwo things make it sing. The no-surcharge policy is the durable edge, because Japan Airlines awards booked through some other programs can carry hundreds of dollars in fuel surcharges, while Atmos keeps the cash portion to modest taxes. And Atmos lets you add a free stopover on a one-way partner award, so you can break the trip in Tokyo for a week and carry on to another JAL city on the same award, turning one redemption into two destinations. Alaska shows a good deal of partner space, including Japan Airlines, right on its own site, though a few partner awards still need a quick phone call and a small booking fee, so search online first and pick up the phone only if you must.\n\nNow the honest caveats, and there are a few. Earning the points is the hard part for Canadians, because no Canadian bank transfers directly to Atmos. The cleanest route is Marriott Bonvoy, which moves to Atmos at 3 to 1 and adds a 5,000-point bonus for every 60,000 Bonvoy points you transfer in one block, so a 60,000-point transfer lands as 25,000 Atmos points rather than 20,000. That means the 60,000 points for this seat take roughly 144,000 Bonvoy points to build, so plan the transfer around a real booking and confirm the current ratio first, since transfers are one-way. The distance based chart also means your gateway matters, as the same seat out of Los Angeles or San Francisco costs about 75,000 points instead of 60,000. Award space in the front cabin is genuinely limited and the best dates go early, and the 2026 rebrand came with some chart tweaks, so price your specific trip before you assume a number. If business space is scarce, Atmos still prices short-haul economy from around 4,500 points one-way, the quiet everyday version of this program that is always there.",
    href: "/cards?q=marriott",
    hrefLabel: "Bonvoy cards that feed Atmos Rewards",
    shortAnswer:
      "Alaska's Mileage Plan is now Atmos Rewards, but it still prices partner awards off a fixed distance chart with no fuel surcharges, and that is the durable sweet spot: Japan Airlines business class from Vancouver or Seattle to Tokyo runs about 60,000 points one-way, because that route is just under 5,000 flown miles. Farther gateways like Los Angeles or San Francisco tip into the next band at about 75,000 points, so flying out of Vancouver saves a Canadian roughly 15,000 points on the same lie-flat seat. On a roughly $3,500 one-way cash fare booked for 60,000 points plus about $150 in taxes and fees, that is around 5.6 cents per point, well above the 1.5 cents that already counts as a strong use. Earning is the hard part for Canadians, since no Canadian bank transfers directly to Atmos and the cleanest route is Marriott Bonvoy at 3 to 1 with a 5,000-point bonus per 60,000-point block, so 60,000 Bonvoy points land as 25,000 Atmos points. These are approximate chart bands, not a quote for any date, so confirm the live price when you search.",
    faqs: [
      {
        q: "How many Atmos points is Vancouver to Tokyo in JAL business class?",
        a: "About 60,000 points one-way, because Vancouver or Seattle to Tokyo on Japan Airlines is just under 5,000 flown miles, which lands in that chart band. Farther gateways like Los Angeles, San Francisco, or San Diego tip over 5,000 miles and move up to about 75,000 points one-way. Treat these as approximate bands rather than a fixed quote, and confirm the live price when you search, because Atmos does adjust the chart.",
      },
      {
        q: "Is booking JAL business to Tokyo on Atmos points a good value?",
        a: "Yes. On a roughly $3,500 one-way cash fare booked for 60,000 points plus about $150 in taxes and fees, the math is (3500 minus 150) divided by 60000, times 100, which is about 5.6 cents per point. Anything above about 1.5 cents is a strong use of Atmos points, so a flat bed to Tokyo at this price is your points doing real work.",
      },
      {
        q: "Does Atmos Rewards charge fuel surcharges on Japan Airlines awards?",
        a: "No, and that is the durable edge of this sweet spot. Atmos does not pass along the carrier imposed fuel surcharges that Japan Airlines awards can carry through some other programs, so the cash portion stays to modest taxes, often well under $100 outbound from Canada.",
      },
      {
        q: "How do Canadians earn Atmos Rewards points?",
        a: "It is the hard part, because no Canadian bank transfers directly to Atmos. The cleanest route is Marriott Bonvoy, which moves to Atmos at 3 to 1 and adds a 5,000-point bonus for every 60,000 Bonvoy points transferred in one block, so 60,000 Bonvoy points land as 25,000 Atmos points rather than 20,000. That means the 60,000 points for this seat take roughly 144,000 Bonvoy points to build, so confirm the current ratio first, since transfers are one-way.",
      },
      {
        q: "Can I add a stopover to this trip?",
        a: "Yes. Atmos lets you add a free stopover on a one-way partner award, so you can break the trip in Tokyo for a week and carry on to another Japan Airlines city on the same award, turning one redemption into two destinations.",
      },
      {
        q: "What if business class space is scarce?",
        a: "Atmos still prices short-haul economy from around 4,500 points one-way, the quiet everyday version of this program that is always there when the premium cabin is not. Award space in the front cabin is genuinely limited and the best dates go early, so search a range of dates and book the moment the math works.",
      },
    ],
  },
  {
    slug: "united-partner-business-europe-88k",
    program: "United",
    title: "United sweet spot: Star Alliance business class to Europe from about 88,000 miles with almost no surcharges",
    dek: "United prices its own flights dynamically, but partner awards still come off a fixed Saver chart, so the durable United sweet spot is a lie-flat seat to Europe on Lufthansa or SWISS from around 88,000 miles one-way, and economy from about 30,000, with the fuel surcharges stripped out.",
    read: "5 min read",
    date: "Jul 2026",
    lastChecked: "2026-07-10",
    body:
      "United MileagePlus works differently from a fixed-chart program like Aeroplan, and it is worth saying so before we talk value. United prices its own flights dynamically, so a seat on United metal floats with the cash fare and there is no band to memorize. Its partner awards are the exception, and that is where the real sweet spot lives. When you book a Star Alliance partner such as Lufthansa, SWISS, Austrian, Brussels Airlines, LOT, or TAP through United, the price still comes off a fixed Saver chart, and United does not pass along the carrier-imposed fuel surcharges those airlines are known for. The figures below are an example of how that chart works, not a quote for any date, so always confirm the live price when you search.\n\nThe numbers look like this. North America to Europe on a Star Alliance partner prices from around 30,000 miles one-way in economy and about 88,000 miles one-way in business at the Saver level, and United has at times brought partner business to Europe down closer to 80,000. Treat those as approximate bands rather than a fixed quote, because United does adjust them. The real magic is the cash side, because United absorbs the fuel surcharges, so a Lufthansa or SWISS business seat that would cost hundreds of dollars in surcharges through some other programs comes with only modest taxes attached.\n\nHere is the cents-per-mile math on a realistic business booking. Say the cash fare is about $5,000 and the award books for 88,000 miles plus taxes and fees. Out of a US gateway those fees can be almost nothing, and out of a Canadian city they run higher, so call it roughly $150 all in. That works out to (5000 minus 150) divided by 88000, times 100, which is about 5.5 cents per mile. Anything north of about 1.5 cents is a strong use of United miles, so a lie-flat seat to Europe at this price is your miles doing real work. Prices move, so confirm the live fare when you book.\n\nA couple of things make it sing. United shows most Star Alliance partner Saver space right on united.com, so you can hunt for a Lufthansa or SWISS seat and book it online without a phone call. And the no-surcharge policy is the durable edge here, because the same partner business seat booked through a surcharge-passing program can carry several hundred dollars in fees, while United keeps the cash portion small. Search a range of dates, because Saver space in the front cabin is genuinely limited and the best days go early.\n\nNow the honest caveats, and there are a few. Earning United miles is the hard part for Canadians, because no Canadian bank transfers directly to United. The cleanest route is Marriott Bonvoy, which moves to United at 3 to 1 and tacks on bonus miles when you transfer in 60,000-point blocks, so a 60,000-point transfer lands as roughly 25,000 United miles rather than 20,000. Confirm the current ratio and any transfer bonus before you move points, since transfers are one-way. The other thing to know is that the co-branded card discount, the 10 to 15 percent fewer miles some United cardholders get, applies only to United-operated flights, not to these partner awards, so it does not help here. And the old Excursionist Perk that let you tack a free one-way onto a round trip is gone as of August 2025, so do not plan around it. If business space is scarce, that 30,000-mile economy seat to Europe is the quiet everyday version of this sweet spot, and it prices just as cleanly.",
    href: "/cards?q=marriott",
    hrefLabel: "Bonvoy cards that feed United",
    shortAnswer:
      "United MileagePlus prices its own flights dynamically, but partner awards still come off a fixed Saver chart, and that is the durable sweet spot: North America to Europe on a Star Alliance partner such as Lufthansa or SWISS runs from around 30,000 miles one-way in economy and about 88,000 in business, sometimes closer to 80,000. Because United does not pass along fuel surcharges, the cash portion stays small, so on a roughly $5,000 business fare booked for 88,000 miles plus about $150 in taxes that is around 5.5 cents per mile, well above the 1.5 cents that already counts as a strong use. Earning is the hard part for Canadians, since no Canadian bank transfers directly to United and the cleanest route is Marriott Bonvoy at 3 to 1, so 60,000 Bonvoy points land as roughly 25,000 United miles. These are approximate chart bands, not a quote for any date, so confirm the live price when you search.",
    faqs: [
      {
        q: "How many United miles is North America to Europe in business?",
        a: "On a Star Alliance partner such as Lufthansa or SWISS, business prices from around 88,000 miles one-way at the Saver level, and United has at times brought it down closer to 80,000. Economy on the same partners starts from about 30,000 miles one-way. Treat these as approximate chart bands rather than a fixed quote, and confirm the live price when you search, because United does adjust them.",
      },
      {
        q: "Is booking partner business to Europe on United a good value?",
        a: "Yes. On a roughly $5,000 cash fare booked for 88,000 miles plus about $150 in taxes and fees, the math is (5000 minus 150) divided by 88000, times 100, which is about 5.5 cents per mile. Anything north of about 1.5 cents is a strong use of United miles, so a lie-flat seat to Europe at this price is your miles doing real work.",
      },
      {
        q: "Does United charge fuel surcharges on partner awards?",
        a: "No, and that is the durable edge of this sweet spot. United does not pass along the carrier-imposed fuel surcharges that airlines like Lufthansa and SWISS are known for, so a business seat that would cost hundreds of dollars in surcharges through some other programs comes with only modest taxes attached.",
      },
      {
        q: "How do Canadians earn United miles?",
        a: "It is the hard part, because no Canadian bank transfers directly to United. The cleanest route is Marriott Bonvoy, which moves to United at 3 to 1 and adds bonus miles when you transfer in 60,000-point blocks, so a 60,000-point transfer lands as roughly 25,000 United miles rather than 20,000. Confirm the current ratio and any transfer bonus first, since transfers are one-way.",
      },
      {
        q: "Does the United credit card discount help on partner awards?",
        a: "No. The 10 to 15 percent fewer miles that some United cardholders and elites get applies only to United-operated flights, not to partner awards, so it does not lower these Lufthansa or SWISS bookings. The old Excursionist Perk that added a free one-way to a round trip is also gone as of August 2025, so do not plan around it.",
      },
      {
        q: "What if business class space is scarce?",
        a: "Fall back to economy. North America to Europe on the same Star Alliance partners prices from about 30,000 miles one-way at the Saver level, the quiet everyday version of this sweet spot, and it prices just as cleanly with the same low surcharges. Search a range of dates, because Saver space in every cabin is limited and the best days go early.",
      },
    ],
  },
  {
    slug: "delta-flash-sale-europe-economy-26k",
    program: "Delta",
    title: "Delta sweet spot: round-trip economy to Europe near 26,000 SkyMiles in the flash sales",
    dek: "Delta SkyMiles has no award chart and prices dynamically, so the real Delta sweet spot is the recurring transatlantic flash sale, where in recent rounds round-trip economy to Europe has dropped near 26,000 SkyMiles, and the best dates lower.",
    read: "5 min read",
    date: "Jul 2026",
    lastChecked: "2026-07-07",
    body:
      "Delta SkyMiles works differently from Aeroplan or Avios, and it is only fair to say so before we talk value. There is no published award chart and no fixed distance bands. SkyMiles prices awards dynamically, roughly tracking the cash fare, and across the whole program a mile is worth on average a little over a cent. That means there is no hidden business class band to memorize the way there is with Aeroplan. The genuine Delta sweet spot lives somewhere else, in the transatlantic award flash sales Delta runs several times a year. The figures below are an example drawn from past sales, not a quote for any date, so always confirm the live price when you search.\n\nHere is how the sale works. A few times a year, usually for a short window of about three days, Delta quietly discounts award seats to Europe. In the recent rounds, round-trip economy to popular cities such as Dublin, Madrid, and Marrakech has come down to around 26,000 SkyMiles, and the very best dates have dipped closer to 20,000 round trip. The catch is that the travel window is limited to a set range of off-peak dates, and the cheapest fares get picked over quickly, so you book when you see it rather than when it suits you. Delta One, Premium Select, and Comfort seats are sometimes included in the same sale, though the deepest discounts land in the main economy cabin.\n\nHere is the cents-per-mile math on a realistic economy booking. Say a round trip to Dublin would otherwise cost about $800 in cash, and the award books for 26,000 SkyMiles plus roughly $150 in taxes and fees. That works out to (800 minus 150) divided by 26000, times 100, which is about 2.5 cents per mile. Against a program that averages a little over a cent, that is your SkyMiles doing real work, and if you happen to hold an eligible Delta American Express card, the TakeOff 15 benefit knocks 15 percent off the mileage, dropping the same seat to about 22,100 miles and nudging the value closer to 2.9 cents. Confirm the live fare when you book, because prices move and the example is only there to show the shape of the deal.\n\nOne honest note on TakeOff 15. That 15 percent discount applies only to Delta-operated award flights booked on delta.com, not to partner awards on Air France, KLM, or Virgin Atlantic, and it requires an eligible Delta co-branded Amex. Most of those cards are US products that Canadians cannot easily hold, so treat the discount as a nice bonus if you have the card rather than the baseline you should count on.\n\nA word on the premium cabin, since people always ask. Delta One to Europe does show up in the summer flash sales, recently from about 115,000 SkyMiles one-way, or roughly 97,750 with the TakeOff 15 discount. On a cash fare of two to three thousand dollars one-way that is a fair use of miles, somewhere around 2 to 2.5 cents, but it is still a large pile of SkyMiles for one seat, and the value is nowhere near the outsized business class deals Aeroplan or Avios can produce. The accessible, repeatable Delta sweet spot really is economy on sale, not the lie-flat cabin.\n\nA few honest caveats to close. Earning the SkyMiles is the hard part for Canadians. Amex Canada Membership Rewards does not transfer to Delta, so the cleanest route is Marriott Bonvoy, which moves to Delta at 3 to 1 with no transfer bonus, meaning 60,000 Bonvoy points become 20,000 SkyMiles. Because the sales are dynamically priced and short-lived, there is no date you can plan around in advance, so set an alert and pounce when one lands. And if you just need a cheap short hop, Delta regularly prices short-haul domestic economy from around 5,000 miles one-way, which a cardholder's TakeOff 15 discount can pull below 4,250, a quiet everyday sweet spot that is always there when the flash sale is not.",
    href: "/cards?q=marriott",
    hrefLabel: "Bonvoy cards that feed Delta",
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
    lastChecked: "2026-08-13",
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
    lastChecked: "2026-08-06",
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
    lastChecked: "2026-07-16",
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
