export interface Deal {
  title: string;
  merchant: string;
  /** Direct link to the merchant. We never credit where we spotted it. */
  url: string;
  /** Headline price, the number people actually care about. */
  price?: string;
  /** Was-price or regular price, shown struck through next to price. */
  was?: string;
  blurb: string;
  category: string;
  posted: string;
  /** Human-friendly expiry label shown in the meta line, e.g. "ends Jun 21". */
  expires?: string;
  /** Machine-readable expiry as "YYYY-MM-DD". Once this date has passed, the deal
   *  auto-moves to the Archive on the Deals page. Omit for deals with no end date. */
  expiresAt?: string;
}

// Curated 2 to 3 times a day. We only post real product or service deals that
// save people money: high quality things at a deep discount, or productive buys
// that pay for themselves over time. No credit card or bank welcome offers here,
// those live in the Cards tab. Always verify the deal is live, then link straight
// to the merchant. Prices below were confirmed on the listed date.
export const DEALS: Deal[] = [
  {
    title: "DEWALT 20V MAX cordless tire inflator (DCC020IB)",
    merchant: "Amazon",
    url: "https://www.amazon.ca/dp/B07H39S9JQ",
    price: "$142",
    was: "$198.70",
    blurb:
      "A good cordless inflator is one of those buys you forget about until the morning you have a soft tire and somewhere to be, and then it pays for itself in one go. The DEWALT 20V MAX is the one most people land on, and Prime Day has it at $142 down from $198.70. It tops up car tires quickly, handles bikes and sports balls, and runs off the same 20V batteries as the rest of the DEWALT lineup. One honest catch so you buy with eyes open: this is the tool only, no battery or charger in the box, so it is a no brainer if you already own DEWALT 20V gear and a pricier proposition if you are starting from scratch. Deal runs through Prime Day, which wraps June 26.",
    category: "Tools",
    posted: "Jun 24, 2026",
    expires: "ends Jun 26",
    expiresAt: "2026-06-26",
  },
  {
    title: "LEGO Speed Champions Back to the Future Time Machine (77256)",
    merchant: "Amazon",
    url: "https://www.amazon.ca/dp/B0FMS84RFJ",
    price: "$26.49",
    was: "$34.99",
    blurb:
      "If you have a Back to the Future fan in the house, this is a lovely little gift at $26.49, down from $34.99. It is the DeLorean time machine in LEGO form, 357 pieces, with Doc Brown and Marty minifigures and two build modes. Aimed at ages nine and up, and honestly just as fun for the grown up who grew up on the movies. Two honest notes: it is a Prime Day price so you need a Prime membership to grab it, and Amazon is showing it more than half claimed already, so it may sell out before the sale ends June 26.",
    category: "Toys",
    posted: "Jun 24, 2026",
    expires: "ends Jun 26",
    expiresAt: "2026-06-26",
  },
  {
    title: "Corliving Nova Ridge upholstered queen bed",
    merchant: "Home Depot",
    url: "https://www.homedepot.ca/product/corliving-nova-ridge-dark-grey-button-tufted-upholstered-queen-bed/1001490953",
    price: "$139",
    blurb:
      "This is a genuinely good price on a real bed, not a flimsy frame: $139 for an upholstered queen with a padded, button tufted headboard from Home Depot, in dark grey or ocean blue. For a spare room, a first apartment, or a teen's room, it is hard to do better, and delivery is free. A couple of honest heads ups so there are no surprises. You supply your own mattress, this is the frame and headboard only, and it uses wooden slats so you do not need a box spring. And it ships rather than sitting in store, with delivery landing in early July, so it is not a same week fix.",
    category: "Furniture",
    posted: "Jun 24, 2026",
  },
  {
    title: "LG 65-inch OLED C5 4K TV",
    merchant: "Costco",
    url: "https://www.costco.ca/p/-/lg-65-class-oledc5-series-4k-uhd-oled-tv/4000370787",
    price: "$1,696.99",
    was: "$2,196.99",
    blurb:
      "The LG C5 is the OLED a lot of people quietly want, and Costco has the 65 inch down to $1,696.99 from $2,196.99, a clean $500 off. The picture is the real draw here, with the perfect inky blacks and rich contrast that make sports and movies look special, and right now LG is tossing in six months of TSN on top. Two honest notes before you jump. This price has dipped here once or twice before, so think of it as a strong deal rather than a once ever one. And OLED panels are a bit of a lottery, so I would add Costco's inexpensive extended warranty for real peace of mind, and their return policy has your back if anything ever goes sideways. The sale runs to June 26.",
    category: "Electronics",
    posted: "Jun 21, 2026",
    expires: "ends Jun 26",
    expiresAt: "2026-06-26",
  },
  {
    title: "Benchmark 173cc 2-in-1 gas lawn mower, 21 inch",
    merchant: "Home Hardware",
    url: "https://www.homehardware.ca/en/173cc-2-in-1-grasscycler-gas-lawn-mower-21/p/5124070",
    price: "$149.97",
    was: "$299.99",
    blurb:
      "Half price on a straightforward gas mower, $149.97 down from $299.99, and Home Hardware backs it with a five year warranty. If you have a small or medium yard and you are tired of paying someone to cut it, a mower like this pays for itself in a season or two. One honest heads up so you buy with eyes open: this is a basic 173cc engine, happiest on dry grass that you keep up with weekly. Let the lawn get tall or soggy and it can bog down, so it is not the one for a big or rough property. Shipping to your local store is free with plenty of stock on hand, and the sale runs through July 29.",
    category: "Home & Garden",
    posted: "Jun 21, 2026",
    expires: "ends Jul 29",
    expiresAt: "2026-07-29",
  },
  {
    title: "Roborock Q7 M5+ robot vacuum and mop",
    merchant: "Best Buy",
    url: "https://www.bestbuy.ca/en-ca/product/roborock-q7-m5-robot-vacuum-mop-for-pet-hair-carpet-with-self-empty-dock-10000pa-suction-dual-anti-tangle-lidar-app-control/19815215",
    price: "$279.99",
    was: "$649",
    blurb:
      "This is Wirecutter's top robot vacuum pick, and it just dropped to $279.99 from $649. It empties itself, maps your home, and quietly hands you back an hour or two every week. If a clean floor without the nagging sounds good, this is the lowest price we have seen on it, and a fair bit under what Amazon is asking. One honest note so you buy with eyes open: the mopping is light duty and long hair can still tangle the brush, so it is happiest set loose on hard floors.",
    category: "Home",
    posted: "Jun 20, 2026",
  },
  {
    title: "Sony WH-1000XM5 wireless noise-cancelling headphones",
    merchant: "Amazon",
    url: "https://www.amazon.ca/dp/B09XS7JWHH",
    price: "$298",
    was: "$449",
    blurb:
      "Sony's flagship over-ear headphones are down to $298, a long way from their usual $449 and change. The noise cancelling is the kind that makes a noisy house or a long flight feel calm, and the battery stretches for days between charges. If you have been telling yourself you will get a proper pair eventually, this is a comfortable price to finally do it.",
    category: "Electronics",
    posted: "Jun 20, 2026",
  },
  {
    title: "Apple AirPods Pro 3",
    merchant: "Shoppers Drug Mart",
    url: "https://www.shoppersdrugmart.ca/en/health-and-pharmacy/electronics",
    price: "$329.99",
    blurb:
      "Shoppers has the newest AirPods Pro at $329.99 and is stacking points offers that hand back roughly 148,000 PC Optimum points, which is about $148 you can put toward groceries or gas down the road. Net it out and you are closer to $182 to $224 for the best earbuds Apple makes for an iPhone. Buy online and sign in first so both point offers actually show up at checkout, a few people found they had to refresh their login. This one wraps up June 21, so it is a short window.",
    category: "Electronics",
    posted: "Jun 20, 2026",
    expires: "ends Jun 21",
    expiresAt: "2026-06-21",
  },
];
