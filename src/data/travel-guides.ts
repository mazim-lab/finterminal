export interface TravelGuide {
  slug: string;
  title: string;
  dek: string;
  tag: string;
  read: string;
  /** Month-year stamp, e.g. "Jul 2026". */
  date: string;
}

// Travel & Points long-form guides. Newest first. These live at /travel/<slug>.
// The rotating worked examples live separately in sweet-spots.ts.
export const TRAVEL_GUIDES: TravelGuide[] = [
  {
    slug: "business-class-sweet-spots-canada",
    title: "Business-class sweet spots from Canada: where your points go furthest",
    dek: "The hub for the best lie-flat redemptions Canadians can actually reach: what a sweet spot is, the honest reality of availability and surcharges, and which currency feeds Aeroplan, AAdvantage, and Avios business class. Links every deep-dive.",
    tag: "Hub",
    read: "8 min read",
    date: "Jul 2026",
  },
  {
    slug: "how-to-book-award-flights-canada",
    title: "How to search for and book award flights from Canada",
    dek: "The whole method in order: decide the trip, search availability at the source, treat availability as the real constraint, hold the seat, then transfer points in only once you can book. Where to search each Canadian program, plus the honest gotchas.",
    tag: "How-to",
    read: "9 min read",
    date: "Jul 2026",
  },
  {
    slug: "airport-lounge-access-canada",
    title: "Airport lounge access for Canadians: how it actually works",
    dek: "The three ways into a lounge: a Priority Pass or DragonPass membership bundled with a card, an airline lounge like Air Canada's Maple Leaf reached via status or fare, or a paid day pass. Plus the Canadian cards in our data that include lounge access, and the fine print that decides its worth.",
    tag: "Hub",
    read: "9 min read",
    date: "Jul 2026",
  },
  {
    slug: "airline-alliances-guide-canada",
    title: "The airline alliance guide for Canadians: Star Alliance, oneworld, and SkyTeam",
    dek: "The three global alliances, the notable member airlines, and exactly how a Canadian reaches each with points. Star is strongest via Aeroplan, oneworld via Avios and AAdvantage, and SkyTeam the honest thin spot.",
    tag: "Hub",
    read: "9 min read",
    date: "Jul 2026",
  },
  {
    slug: "points-transfer-partners-canada",
    title: "The Canadian points-transfer map: which points actually transfer, and where",
    dek: "Most Canadian bank points do not transfer to airlines. Here is the honest map: Amex MR and RBC Avion are the real transfer currencies, while TD, Scene+, Aventura and BMO are fixed-value or portal programs. Verified partners and ratios.",
    tag: "Hub",
    read: "9 min read",
    date: "Jul 2026",
  },
  {
    slug: "rbc-avion-to-aadvantage",
    title: "How to transfer RBC Avion points to American Airlines AAdvantage",
    dek: "Avion is one of the few Canadian programs that feeds American Airlines, though the rate is a real 1 to 0.7. Here is which cards qualify, the exact steps, and the timing trick that softens the haircut.",
    tag: "How-to",
    read: "8 min read",
    date: "Jun 2026",
  },
  {
    slug: "aadvantage-sweet-spots",
    title: "AAdvantage sweet spots: redeeming American Airlines miles",
    dek: "AAdvantage miles shine on partner airlines, not on American's own dynamic pricing. Here are the genuine sweet spots, from business class to Europe to Qatar Qsuite, and how to dodge the surcharge traps.",
    tag: "Strategy",
    read: "10 min read",
    date: "Jun 2026",
  },
  {
    slug: "avios-sweet-spots-rbc-avion-transfer",
    title: "Avios sweet spots, and converting RBC Avion to Avios",
    dek: "Avios are best on short flights and on partner airlines that skip the big surcharges. Here is where they shine, plus how to move RBC Avion points into Avios without nasty surprises.",
    tag: "Strategy",
    read: "8 min read",
    date: "Jun 2026",
  },
  {
    slug: "amex-mr-to-aeroplan",
    title: "How to convert Amex Membership Rewards to Aeroplan",
    dek: "A simple walkthrough for moving your Amex points to Air Canada Aeroplan at 1 to 1, including when to do it, how to avoid the common mistakes, and how to catch a transfer bonus.",
    tag: "How-to",
    read: "7 min read",
    date: "Jun 2026",
  },
  {
    slug: "aeroplan-sweet-spots",
    title: "Using Aeroplan points to get the most value",
    dek: "Where Aeroplan quietly pays off, from cheap short hops to business class across the Atlantic, plus the stopover trick and how to do the cents-per-point math before you book.",
    tag: "Strategy",
    read: "11 min read",
    date: "Jun 2026",
  },
];
