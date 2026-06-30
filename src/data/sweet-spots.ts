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
    slug: "avios-toronto-to-dublin-aer-lingus-50k",
    program: "Avios",
    title: "Avios sweet spot: Toronto to Dublin on Aer Lingus from about 13,000 points",
    dek: "Aer Lingus gives Canadians one of the friendliest ways into Europe on Avios, an economy seat to Dublin from roughly 13,000 points one-way off-peak, or the lie-flat business cabin for about 50,000.",
    read: "5 min read",
    date: "Jun 2026",
    body:
      "Avios is the shared currency behind British Airways, Aer Lingus, Iberia, and Qatar, and one balance moves freely between them at the same rate. For Canadians the standout is Aer Lingus, because its transatlantic hub in Dublin is one of the closest European gateways to the East Coast, which keeps the Avios price low. These figures are an example of how the chart works, not a quote for any given date, so always confirm the live price when you search.\n\nThe numbers look like this off-peak. Toronto to Dublin runs around 13,000 Avios one-way in economy and about 50,000 in business, the lie-flat cabin Aer Lingus flies on its A330s. Peak dates cost more, so the off-peak calendar is where the value lives, and Aer Lingus does not impose the heavy fuel surcharges British Airways is known for, which keeps the cash portion sane.\n\nHere is the cents-per-point math on a realistic business class booking. Say the cash fare is about $3,000 and the award books for 50,000 Avios plus roughly $225 in taxes and fees. That works out to (3000 minus 225) divided by 50000, times 100, which is around 5.5 cents per Avios. Anything above about 1.5 cents is a solid use of Avios, so a lie-flat seat to Europe at this price is your points doing real work.\n\nOne quietly important tip. Book the Aer Lingus award through the Aer Lingus site or avios.com rather than through British Airways. The Avios price is identical, but the taxes and fees can be hundreds of dollars lower, on the order of $225 instead of nearly $790 in business on the same seat. Same flight, same points, far less cash, just for booking on the right site.\n\nA few honest caveats. Getting the Avios in the first place matters for Canadians: RBC Avion transfers to British Airways at 1 to 1, and RBC runs a 30 percent transfer bonus a couple of times a year, but transfers are one-way, so only move points once you have found the seat you want. Off-peak award space in the lie-flat cabin is genuinely limited and the best dates go early, so stay flexible and search a few days on either side. And price your specific trip before you assume a number, because the Avios charts do get adjusted.",
    href: "/travel/avios-sweet-spots-rbc-avion-transfer",
    hrefLabel: "Full Avios guide",
  },
  {
    slug: "aeroplan-toronto-to-europe-business-60k",
    program: "Aeroplan",
    title: "Aeroplan sweet spot: Toronto to Europe in business for about 60,000 points",
    dek: "A worked example of the redemption Aeroplan is famous for, a lie-flat seat across the Atlantic for roughly 60,000 points one-way and very little cash.",
    read: "5 min read",
    date: "Jun 2026",
    body:
      "Let us walk through one of the cleanest uses of Aeroplan points there is, a one-way business class seat from Toronto to Europe. This is an example to show how the math works, not a quote on any specific date, so always confirm the live price when you search.\n\nThe setup is simple. Aeroplan prices flights on Star Alliance partners from a distance and region based chart rather than the floating cash fare, and Toronto to most of Europe sits in a band that lands around 60,000 points one-way in business off-peak. The same seat in cash often runs three to four thousand dollars or more, which is what makes this redemption sing.\n\nHere is the cents-per-point math on a realistic booking. Say the cash fare is $3,600 and the award books for 60,000 points plus about $200 in taxes and fees. That works out to (3600 minus 200) divided by 60000, times 100, which is roughly 5.7 cents per point. Anything north of 2 cents is a good use of Aeroplan, so this is squarely in the range where your points are doing real work.\n\nTwo things make it even better. Aeroplan does not pass along carrier-imposed fuel surcharges, so the cash you pay stays low on partners like Lufthansa, Swiss, Austrian, or Brussels Airlines. And if your route connects through a partner hub, you can often add an Aeroplan stopover for a flat 5,000 points, turning one trip into two destinations.\n\nA few honest caveats. Partner business space is limited and the best dates go quickly, so flexibility helps a lot, and you want to search a few days on either side of your ideal date. The June 1 chart update nudged several long-haul premium awards higher, so price your specific trip before you assume a number. And book the moment the math works and the seat is there, because award seats are not held for free while you think it over.",
    href: "/travel/aeroplan-sweet-spots",
    hrefLabel: "Full Aeroplan sweet-spots guide",
  },
];
