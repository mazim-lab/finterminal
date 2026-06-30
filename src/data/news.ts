export interface NewsItem {
  /** Headline timestamp for the typewriter ticker. */
  time: string;
  /** URL slug for the item's own page at /news/<slug>. */
  slug: string;
  headline: string;
  dek: string;
  body: string;
  category: string;
  region: "CA" | "US";
  date: string;
  /**
   * Only set this for genuine scoops that an outlet broke exclusively. We then
   * credit them ("According to ..."). Public info like offer changes needs no credit.
   */
  exclusive?: string[];
  /** Primary source (issuer / program), shown as a small label. */
  sourceLabel?: string;
  /** First-party link to the official announcement / offer page (the source). */
  sourceUrl?: string;
  /** Optional related section/filter to jump to (a card filter, a guide, deals). */
  href?: string;
  /** Short label for that section link, e.g. "Compare Aeroplan cards". */
  hrefLabel?: string;
}

// Canadian market first. Newest at the top.
export const NEWS: NewsItem[] = [
  {
    time: "10:00",
    slug: "petro-canada-triangle-canada-day-bonus-ct-money",
    headline: "Petro-Canada is handing out bonus CT Money on Canada Day fill-ups",
    dek: "From July 1 to 5 you can collect $3 in bonus Canadian Tire Money every time you pump 25 litres or more, and there is no cap on how often you earn it.",
    body:
      "If you have a road trip or even just a few errands lined up around Canada Day, this is an easy bit of value to grab. Petro-Canada and Triangle Rewards are giving $3 in bonus CT Money on every fuel-up of 25 litres or more between July 1 and July 5, and unlike a lot of these promos there is no one-and-done limit, so each separate fill counts. You will need to scan your Triangle Rewards card or a linked cardless method at the pump, or pay with a Triangle credit card, for it to register. It is not life-changing money, but if you were filling up anyway it adds up nicely across the week, especially when more than one driver in the household is pumping gas.",
    category: "Loyalty programs",
    region: "CA",
    date: "Jun 2026",
    sourceLabel: "Petro-Canada and Triangle Rewards",
  },
  {
    time: "09:30",
    slug: "aeroplan-estore-20x-canadian-down-feather",
    headline: "Earn 20x Aeroplan points on bedding from the Canadian Down & Feather Company",
    dek: "Through July 12 the Aeroplan eStore is paying 20 points per dollar at the Canadian-made bedding brand, one of the richest multipliers we have seen on the portal this year.",
    body:
      "This is a nice one if a new duvet or fresh pillows were already on your list. From now through July 12 you earn 20 Aeroplan points for every dollar you spend at the Canadian Down & Feather Company when you start your shopping through the Aeroplan eStore, which works out to roughly a 30 percent return once you value the points. The habit to build is clicking through the eStore first and easing off any ad blockers, since that tracking is what triggers the bonus. We would not buy bedding you do not actually need just to chase points, but if you were going to replace yours anyway, this is a tidy way to pad your Aeroplan balance toward the next trip.",
    category: "Travel and points",
    region: "CA",
    date: "Jun 2026",
    sourceLabel: "Aeroplan",
    href: "/travel/aeroplan-sweet-spots",
    hrefLabel: "Aeroplan sweet-spots guide",
  },
];
