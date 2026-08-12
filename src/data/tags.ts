// Topic tags for editorial articles and news items. Tags render as clickable
// chips on each article, and each tag has its own hub page at /tags/<slug>.

export interface Tag {
  slug: string;
  label: string;
  description: string;
}

// The canonical tag list. Add new slugs here (and only here) when the taxonomy grows.
export const TAGS: Tag[] = [
  // Section-level
  { slug: "points", label: "Points", description: "Everything about earning, moving, and cashing out loyalty points from Canadian cards." },
  { slug: "travel", label: "Travel", description: "Turning points into real trips, from award booking to lounges and business class." },
  { slug: "personal-finance", label: "Personal finance", description: "The everyday money stuff: savings, chequing, credit, and the accounts that hold it all." },
  { slug: "cards", label: "Credit cards", description: "Picking the right Canadian card, from welcome bonuses to cash back to no FX fees." },
  { slug: "news", label: "News", description: "What just changed in Canadian cards, points, and personal finance, and why it matters to you." },

  // Loyalty programs and currencies
  { slug: "aeroplan", label: "Aeroplan", description: "Air Canada's Aeroplan program: where the points shine and how to get them there." },
  { slug: "avios", label: "Avios", description: "The Avios currency behind British Airways, Qatar, and friends, and how Canadians reach it." },
  { slug: "aadvantage", label: "AAdvantage", description: "American Airlines miles, the partner sweet spots, and how to feed them from Canada." },
  { slug: "delta", label: "Delta SkyMiles", description: "Delta SkyMiles for Canadians, where the dynamic pricing hides real value and how to feed a balance from here." },
  { slug: "united", label: "United MileagePlus", description: "United MileagePlus for Canadians, where the fixed partner Saver chart and no fuel surcharges hide the real value, and how to feed a balance from here." },
  { slug: "westjet", label: "WestJet Rewards", description: "WestJet points and the RBC companion voucher, and how Canadians squeeze value out of both." },
  { slug: "alaska", label: "Alaska Atmos Rewards", description: "Alaska's Atmos Rewards, formerly Mileage Plan, where the fixed distance-based partner charts and no fuel surcharges hide lie-flat value to Asia, and how Canadians feed a balance." },
  { slug: "flying-blue", label: "Flying Blue", description: "Air France and KLM's Flying Blue for Canadians, where the dynamic pricing hides value in the monthly Promo Rewards, and how Amex feeds a balance from here." },
  { slug: "scene-plus", label: "Scene+", description: "Scotiabank and Empire's Scene+ program: earning at the grocery till and cashing points out at par." },
  { slug: "amex", label: "Amex / Membership Rewards", description: "Amex Membership Rewards, the transfer partners, and the cards that earn them." },
  { slug: "rbc-avion", label: "RBC Avion", description: "RBC's Avion points, one of the few Canadian currencies that actually transfers to airlines." },
  { slug: "transfers", label: "Points transfers", description: "Which Canadian points move to airlines and hotels, at what ratio, and when to pull the trigger." },

  // Cards subtopics
  { slug: "welcome-bonuses", label: "Welcome bonuses", description: "The big up-front point hauls, the spend to unlock them, and how to plan around them." },
  { slug: "cash-back", label: "Cash back", description: "Straightforward cards that hand you money back, no points math required." },
  { slug: "travel-cards", label: "Travel cards", description: "Cards built for trips: travel earn rates, insurance, and perks that pay their fee." },
  { slug: "no-fx-fees", label: "No FX fees", description: "Cards that skip the foreign transaction fee, so spending abroad does not cost extra." },

  // Travel how-to
  { slug: "award-booking", label: "Award booking", description: "Searching for and locking in award seats before you ever transfer a single point." },
  { slug: "lounges", label: "Airport lounges", description: "How lounge access really works in Canada, and which cards get you through the door." },
  { slug: "alliances", label: "Airline alliances", description: "Star Alliance, oneworld, and SkyTeam, and how a Canadian reaches each one with points." },
  { slug: "business-class", label: "Business class", description: "The lie-flat redemptions that give Canadians the most value for their points." },
  { slug: "travel-insurance", label: "Travel insurance", description: "The travel coverage tucked into Canadian cards, and how to read the fine print." },

  // Personal finance subtopics
  { slug: "savings-and-gics", label: "Savings and GICs", description: "Where to park cash for a real rate, from high-interest savings to laddered GICs." },
  { slug: "chequing", label: "Chequing accounts", description: "Everyday banking, the fees worth dodging, and the sign-up bonuses worth grabbing." },
  { slug: "credit-score", label: "Credit score and reports", description: "How Canadian credit scores work, how to build one, and how to read your report." },
  { slug: "newcomers", label: "Newcomers to Canada", description: "First cards, first accounts, and building credit from scratch after you land." },
  { slug: "registered-accounts", label: "Registered accounts", description: "The tax-sheltered accounts that do the heavy lifting: TFSA, RRSP, FHSA, and RESP." },
  { slug: "home-buying", label: "Home buying", description: "Saving the down payment and the accounts and rules that help you get there." },
  { slug: "taxes", label: "Taxes", description: "The Canadian tax angles on your money, from registered accounts to points and perks." },
];

export interface TaggedArticle {
  path: string;
  title: string;
  dek?: string;
  section: "Personal finance" | "Travel" | "Sweet spot" | "News" | "Guides";
  tags: string[];
}

// Phase 2 populates this registry. Empty is fine; everything still compiles.
export const TAGGED_ARTICLES: TaggedArticle[] = [
  // Personal finance standalone pages
  {
    path: "/personal-finance/are-credit-card-points-taxable-canada",
    title: "Are credit card points and cash back taxable in Canada?",
    dek: "When the CRA cares about your rewards, and when it does not.",
    section: "Personal finance",
    tags: ["personal-finance", "taxes", "points", "cash-back", "cards"],
  },
  {
    path: "/personal-finance/rrsp-vs-tfsa-canada",
    title: "RRSP vs TFSA: the honest decision for Canadians",
    dek: "The marginal-rate rule that actually decides it, and why the answer is often both.",
    section: "Personal finance",
    tags: ["personal-finance", "registered-accounts", "taxes"],
  },
  {
    path: "/personal-finance/credit-card-interest-canada",
    title: "How credit card interest works (and how to never pay it)",
    dek: "Grace periods, cash advances, and the one habit that keeps your interest at zero.",
    section: "Personal finance",
    tags: ["personal-finance", "cards", "credit-score"],
  },
  {
    path: "/personal-finance/best-cash-back-credit-cards-canada",
    title: "The best cash-back credit cards in Canada",
    dek: "The cards that hand you money back, and how to pick the right one.",
    section: "Personal finance",
    tags: ["personal-finance", "cards", "cash-back"],
  },
  {
    path: "/personal-finance/best-chequing-account-bonuses-canada",
    title: "Best chequing account welcome bonuses in Canada",
    dek: "The everyday bank accounts paying you to switch, and the fees to dodge.",
    section: "Personal finance",
    tags: ["personal-finance", "chequing"],
  },
  {
    path: "/personal-finance/best-gic-rates-canada",
    title: "Best GIC rates in Canada",
    dek: "Where to lock in a guaranteed rate, and how to ladder your GICs.",
    section: "Personal finance",
    tags: ["personal-finance", "savings-and-gics"],
  },
  {
    path: "/personal-finance/best-savings-account-rates-canada",
    title: "Best high-interest savings account (HISA) rates in Canada",
    dek: "Where to park cash for a real rate without locking it away.",
    section: "Personal finance",
    tags: ["personal-finance", "savings-and-gics"],
  },
  {
    path: "/personal-finance/best-travel-credit-cards-canada",
    title: "The best travel and rewards credit cards in Canada",
    dek: "The travel cards worth their fee, from earn rates to insurance and perks.",
    section: "Personal finance",
    tags: ["personal-finance", "cards", "travel-cards", "points", "welcome-bonuses"],
  },
  {
    path: "/personal-finance/canadian-account-order-of-operations",
    title: "Where your next dollar should go: the Canadian account order",
    dek: "A plain-language order of operations for every extra dollar you save.",
    section: "Personal finance",
    tags: ["personal-finance", "registered-accounts", "savings-and-gics"],
  },
  {
    path: "/personal-finance/check-your-credit-report-canada",
    title: "Check your credit report and score in Canada, free",
    dek: "How to pull your Equifax and TransUnion reports and read what is on them.",
    section: "Personal finance",
    tags: ["personal-finance", "credit-score"],
  },
  {
    path: "/personal-finance/costco-membership-worth-it-canada",
    title: "Does a Costco membership pay for itself?",
    dek: "The honest math on whether the membership fee earns its keep.",
    section: "Personal finance",
    tags: ["personal-finance", "cash-back"],
  },
  {
    path: "/personal-finance/credit-card-travel-insurance-canada",
    title: "What your credit card's travel insurance actually covers in Canada",
    dek: "Reading the fine print on the coverage tucked into your card.",
    section: "Personal finance",
    tags: ["personal-finance", "cards", "travel-insurance", "travel-cards"],
  },
  {
    path: "/personal-finance/fhsa-playbook-canada",
    title: "The FHSA playbook: Canada's most underused account",
    dek: "How the First Home Savings Account works and why you should open one now.",
    section: "Personal finance",
    tags: ["personal-finance", "registered-accounts", "home-buying", "taxes"],
  },
  {
    path: "/personal-finance/fhsa-vs-rrsp-home-buyers-plan",
    title: "FHSA vs the RRSP Home Buyers' Plan: which to use for a first home",
    dek: "The tax-free FHSA withdrawal versus the RRSP loan you repay over 15 years, and how to use both.",
    section: "Personal finance",
    tags: ["personal-finance", "registered-accounts", "home-buying", "taxes"],
  },
  {
    path: "/personal-finance/foreign-transaction-fee-cards-canada",
    title: "The 2.5% foreign transaction fee, and the cards that kill it",
    dek: "Why spending abroad costs extra, and the cards that skip the fee.",
    section: "Personal finance",
    tags: ["personal-finance", "cards", "no-fx-fees"],
  },
  {
    path: "/personal-finance/how-to-build-credit-canada",
    title: "How to build (or rebuild) credit in Canada: a plain-language guide",
    dek: "The steps that actually move your score, from your first card up.",
    section: "Personal finance",
    tags: ["personal-finance", "credit-score", "cards"],
  },
  {
    path: "/personal-finance/how-to-hit-minimum-spend-canada",
    title: "How to hit a credit card minimum spend without wasting a dollar",
    dek: "Clearing a welcome bonus threshold on spending you were doing anyway.",
    section: "Personal finance",
    tags: ["personal-finance", "cards", "welcome-bonuses", "points"],
  },
  {
    path: "/personal-finance/newcomer-to-canada-first-cards-accounts",
    title: "Newcomer to Canada: your first credit cards and bank accounts",
    dek: "First cards, first accounts, and building credit from scratch after you land.",
    section: "Personal finance",
    tags: ["personal-finance", "newcomers", "credit-score", "cards", "chequing"],
  },
  {
    path: "/personal-finance/pay-bills-with-credit-card-canada",
    title: "Paying rent, taxes, and your mortgage with a credit card in Canada",
    dek: "When routing big bills through a card is worth the fee, and when it is not.",
    section: "Personal finance",
    tags: ["personal-finance", "cards", "points", "welcome-bonuses"],
  },
  {
    path: "/personal-finance/points-vs-cash-back-canada",
    title: "Points vs cash back: which actually wins for your household",
    dek: "How to tell whether points or cash back is the better fit for you.",
    section: "Personal finance",
    tags: ["personal-finance", "cards", "cash-back", "points"],
  },
  {
    path: "/personal-finance/resp-cesg-grant-canada",
    title: "RESP and the 20% CESG grant: the easiest guaranteed return in Canada",
    dek: "Why the RESP grant is free money you should not leave on the table.",
    section: "Personal finance",
    tags: ["personal-finance", "registered-accounts", "taxes"],
  },
  {
    path: "/personal-finance/smith-manoeuvre",
    title: "The Smith Manoeuvre, explained properly",
    dek: "How the tax-deductible mortgage strategy works, and who it actually suits.",
    section: "Personal finance",
    tags: ["personal-finance", "home-buying", "taxes", "registered-accounts"],
  },
  {
    path: "/personal-finance/two-player-mode-couples-welcome-bonuses",
    title: "Two-player mode: how Canadian couples double their welcome bonuses",
    dek: "Coordinating two people's applications to double the point hauls.",
    section: "Personal finance",
    tags: ["personal-finance", "cards", "welcome-bonuses", "points"],
  },
  {
    path: "/personal-finance/where-to-hold-cash-canada",
    title: "Where to hold your cash in Canada: HISA vs GIC vs high-interest chequing vs cash ETFs",
    dek: "Matching where you park cash to when you actually need it.",
    section: "Personal finance",
    tags: ["personal-finance", "savings-and-gics", "chequing"],
  },

  // Travel standalone pages
  {
    path: "/travel/aadvantage-sweet-spots",
    title: "AAdvantage sweet spots: redeeming American Airlines miles",
    dek: "The partner redemptions where AAdvantage miles go furthest from Canada.",
    section: "Travel",
    tags: ["travel", "aadvantage", "points", "award-booking", "business-class", "alliances"],
  },
  {
    path: "/travel/aeroplan-sweet-spots",
    title: "Using Aeroplan points to get the most value",
    dek: "Where Aeroplan shines, from business class to the flat-rate stopover.",
    section: "Travel",
    tags: ["travel", "aeroplan", "points", "award-booking", "business-class", "alliances"],
  },
  {
    path: "/travel/airline-alliances-guide-canada",
    title: "The airline alliance guide for Canadians: Star Alliance, oneworld, and SkyTeam",
    dek: "How the three alliances work and how a Canadian reaches each with points.",
    section: "Travel",
    tags: ["travel", "alliances", "points", "award-booking"],
  },
  {
    path: "/travel/airport-lounge-access-canada",
    title: "Airport lounge access for Canadians: how it actually works",
    dek: "The real ways into a lounge, and which cards get you through the door.",
    section: "Travel",
    tags: ["travel", "lounges", "travel-cards", "cards"],
  },
  {
    path: "/travel/amex-mr-to-aeroplan",
    title: "How to convert Amex Membership Rewards to Aeroplan",
    dek: "Moving Amex points to Aeroplan, at what ratio, and when to do it.",
    section: "Travel",
    tags: ["travel", "aeroplan", "amex", "points", "transfers"],
  },
  {
    path: "/travel/avios-sweet-spots-rbc-avion-transfer",
    title: "Avios sweet spots, and converting RBC Avion to Avios",
    dek: "The best Avios redemptions and how RBC Avion feeds your balance.",
    section: "Travel",
    tags: ["travel", "avios", "rbc-avion", "points", "transfers", "award-booking"],
  },
  {
    path: "/travel/business-class-sweet-spots-canada",
    title: "Business-class sweet spots from Canada: where your points go furthest",
    dek: "The lie-flat redemptions that give Canadians the most value per point.",
    section: "Travel",
    tags: ["travel", "business-class", "points", "award-booking", "alliances"],
  },
  {
    path: "/travel/how-to-book-award-flights-canada",
    title: "How to search for and book award flights from Canada: the method",
    dek: "A repeatable method for finding award seats before you transfer a point.",
    section: "Travel",
    tags: ["travel", "award-booking", "points", "transfers"],
  },
  {
    path: "/travel/points-transfer-partners-canada",
    title: "The Canadian points-transfer map: which points actually transfer, and where",
    dek: "Which Canadian points move to airlines and hotels, and at what ratio.",
    section: "Travel",
    tags: ["travel", "transfers", "points", "amex", "rbc-avion", "aeroplan"],
  },
  {
    path: "/travel/rbc-avion-to-aadvantage",
    title: "How to transfer RBC Avion points to American Airlines AAdvantage",
    dek: "Moving RBC Avion to AAdvantage, and the sweet spots waiting on the other side.",
    section: "Travel",
    tags: ["travel", "rbc-avion", "aadvantage", "points", "transfers"],
  },

  // Sweet-spot pages
  {
    path: "/travel/sweet-spots/avios-toronto-to-dublin-aer-lingus-50k",
    title: "Avios sweet spot: Toronto to Dublin on Aer Lingus from about 13,000 points",
    dek: "Aer Lingus gives Canadians one of the friendliest ways into Europe on Avios, economy from roughly 13,000 points or business for about 50,000.",
    section: "Sweet spot",
    tags: ["travel", "avios", "rbc-avion", "points", "award-booking", "business-class"],
  },
  {
    path: "/travel/sweet-spots/aeroplan-toronto-to-europe-business-60k",
    title: "Aeroplan sweet spot: Toronto to Europe in business for about 60,000 points",
    dek: "A worked example of the redemption Aeroplan is famous for, a lie-flat seat across the Atlantic for roughly 60,000 points one-way.",
    section: "Sweet spot",
    tags: ["travel", "aeroplan", "points", "award-booking", "business-class", "alliances"],
  },
  {
    path: "/travel/sweet-spots/delta-flash-sale-europe-economy-26k",
    title: "Delta sweet spot: round-trip economy to Europe near 26,000 SkyMiles in the flash sales",
    dek: "Delta SkyMiles has no award chart and prices dynamically, so the real Delta sweet spot is the recurring transatlantic flash sale, where round-trip economy to Europe has dropped near 26,000 SkyMiles, sometimes lower.",
    section: "Sweet spot",
    tags: ["travel", "delta", "points", "award-booking", "transfers"],
  },
  {
    path: "/travel/sweet-spots/westjet-companion-voucher-premium-europe-499",
    title: "WestJet sweet spot: fly a companion to Europe in Premium for a fixed $499",
    dek: "WestJet points are a flat cent each with no award chart, so the real sweet spot for Canadians is the RBC World Elite companion voucher, which caps a second Premium base fare to Europe at $499.",
    section: "Sweet spot",
    tags: ["travel", "westjet", "points", "travel-cards", "cards"],
  },
  {
    path: "/travel/sweet-spots/united-partner-business-europe-88k",
    title: "United sweet spot: Star Alliance business class to Europe from about 88,000 miles with almost no surcharges",
    dek: "United prices its own flights dynamically, but partner awards still come off a fixed Saver chart, so the durable United sweet spot is a lie-flat seat to Europe on Lufthansa or SWISS from around 88,000 miles one-way, and economy from about 30,000, with the fuel surcharges stripped out.",
    section: "Sweet spot",
    tags: ["travel", "united", "points", "award-booking", "business-class", "alliances"],
  },
  {
    path: "/travel/sweet-spots/alaska-jal-business-vancouver-tokyo-60k",
    title: "Alaska sweet spot: Vancouver or Seattle to Tokyo in JAL business for 60,000 Atmos points with no fuel surcharges",
    dek: "Alaska's Mileage Plan is now Atmos Rewards, but it still prices partner awards off a fixed distance chart, so the durable sweet spot for Canadians is a lie-flat Japan Airlines seat from Vancouver or Seattle to Tokyo for about 60,000 points one-way, with the fuel surcharges stripped out.",
    section: "Sweet spot",
    tags: ["travel", "alaska", "points", "award-booking", "business-class", "alliances"],
  },

  {
    path: "/travel/sweet-spots/flying-blue-promo-rewards-europe-business-50k",
    title: "Flying Blue sweet spot: business class to Europe from about 50,000 miles in the monthly Promo Rewards",
    dek: "Flying Blue prices awards dynamically with no fixed chart, so the durable sweet spot is the Promo Rewards it releases on the first of every month, where a North American to Europe business seat on Air France or KLM can drop to roughly 45,000 to 60,000 miles one-way and economy near 20,000.",
    section: "Sweet spot",
    tags: ["travel", "flying-blue", "amex", "points", "award-booking", "business-class", "alliances"],
  },
  {
    path: "/travel/sweet-spots/aeroplan-south-america-business-bogota-50k",
    title: "Aeroplan sweet spot: business class to South America from about 50,000 points on Avianca or Copa",
    dek: "Aeroplan prices its Star Alliance partners off a fixed distance chart, so a quiet, durable sweet spot for Canadians is business class to South America on Avianca or Copa, about 50,000 points one-way to closer cities like Bogota or Lima and 60,000 to deep South America like Buenos Aires, with the fuel surcharges stripped out.",
    section: "Sweet spot",
    tags: ["travel", "aeroplan", "points", "award-booking", "business-class", "alliances"],
  },
  {
    path: "/travel/sweet-spots/avios-qatar-qsuites-montreal-doha-70k",
    title: "Avios sweet spot: Qatar Qsuites business class to Doha from about 70,000 points, nonstop from Montreal or Toronto",
    dek: "Avios is shared with Qatar Airways, so one of its best redemptions is a Qsuites suite-with-a-door to Doha for about 70,000 points one-way off-peak in business, and the quiet bonus for Canadians is that Qatar flies it nonstop from both Montreal and Toronto with modest surcharges.",
    section: "Sweet spot",
    tags: ["travel", "avios", "rbc-avion", "points", "award-booking", "business-class", "transfers"],
  },

  {
    path: "/travel/sweet-spots/westjet-companion-voucher-domestic-economy-119",
    title: "WestJet sweet spot: fly a companion across Canada or to the US for a fixed $119 base fare",
    dek: "WestJet points are a flat cent each with no award chart, so the everyday sweet spot for Canadians is the RBC companion voucher used at home, capping a second economy base fare across Canada and to the continental US at a fixed $119 on the World Elite card, or $199 on the no-fee version.",
    section: "Sweet spot",
    tags: ["travel", "westjet", "points", "travel-cards", "cards"],
  },

  {
    path: "/travel/sweet-spots/delta-award-deals-sun-mexico-caribbean-12k",
    title: "Delta sweet spot: round-trip economy to the sun near 12,000 SkyMiles in the Award Deals",
    dek: "Delta SkyMiles has no award chart and prices dynamically, so the durable Delta sweet spot for a winter escape is its standing SkyMiles Award Deals page, where round-trip economy to the Bahamas, Mexico, and the Caribbean has dropped near 12,000 SkyMiles, sometimes lower.",
    section: "Sweet spot",
    tags: ["travel", "delta", "points", "award-booking", "transfers"],
  },

  {
    path: "/travel/sweet-spots/united-ana-the-room-business-japan-tokyo-100k",
    title: "United sweet spot: ANA \"The Room\" business class to Tokyo from about 100,000 miles, one-way and surcharge-free",
    dek: "United prices its own flights dynamically, but partner awards still sit at semi-fixed Saver levels, so the marquee United sweet spot to Asia is ANA's suite-like The Room business class to Tokyo, roughly 90,000 to 110,000 miles one-way with the fuel surcharges stripped out and booked as a one-way.",
    section: "Sweet spot",
    tags: ["travel", "united", "points", "award-booking", "business-class", "alliances"],
  },

  {
    path: "/travel/sweet-spots/alaska-qantas-business-australia-85k",
    title: "Alaska sweet spot: business class to Australia on Qantas for about 85,000 Atmos points, no fuel surcharges",
    dek: "Alaska's Mileage Plan is now Atmos Rewards, but it still prices partner awards off a fixed distance chart with no fuel surcharges, so the durable long-haul sweet spot is a lie-flat Qantas seat from the US West Coast to Australia for about 85,000 points one-way, with only a small partner fee and taxes on top.",
    section: "Sweet spot",
    tags: ["travel", "alaska", "points", "award-booking", "business-class", "alliances"],
  },

  {
    path: "/travel/sweet-spots/flying-blue-intra-europe-economy-short-haul-10k",
    title: "Flying Blue sweet spot: hop around Europe in economy from about 10,000 miles one-way with low surcharges",
    dek: "Flying Blue prices awards dynamically with no fixed chart, but short-haul economy on Air France, KLM, and their SkyTeam partners still starts around 10,000 miles one-way off-peak with only modest surcharges, the quiet, practical way to reach the smaller European cities.",
    section: "Sweet spot",
    tags: ["travel", "flying-blue", "amex", "points", "award-booking", "alliances"],
  },

  // News items
  {
    path: "/news/air-canada-sells-25-percent-aeroplan-stake-blackstone-la-caisse-august-11",
    title: "Air Canada sells a 25% stake in Aeroplan to Blackstone, La Caisse and two big Canadian pension funds for $2.5 billion, and says members will see no change",
    section: "News",
    tags: ["news", "aeroplan", "points", "travel"],
  },
  {
    path: "/news/aeroplan-flight-reward-flash-sale-25-percent-off-points-august-10",
    title: "Aeroplan opens a flight reward flash sale on August 10, taking up to 25% off the points cost of Air Canada award tickets through August 18",
    section: "News",
    tags: ["news", "aeroplan", "travel", "points", "award-booking"],
  },
  {
    path: "/news/westjet-cupe-local-8125-launches-ratification-vote-process-august-7",
    title: "WestJet's cabin crew move to lock the deal in: CUPE launches the ratification process on August 7, with member meetings next week and the bargaining committee unanimously behind it",
    section: "News",
    tags: ["news", "westjet", "travel"],
  },
  {
    path: "/news/westjet-full-schedule-zero-cancellations-recovery-august-5",
    title: "WestJet closes the book on its strike week, operating a full schedule on August 5 with no cancellations as the recovery essentially lands",
    dek: "Following up on our August 4 note about cancellations tapering off, WestJet's recovery reached its natural finish line on August 5: the airline operated its full mainline schedule of roughly 460 flights without a single cancellation, a day after trimming only a handful. WestJet has kept its free change-and-cancel window open for travel through August 6 and says it will keep evaluating daily extensions, and the tentative deal that ended the walkout now goes to a ratification vote its cabin crew have about a month to complete.",
    section: "News",
    tags: ["news", "westjet", "travel"],
  },
  {
    path: "/news/westjet-operations-gradually-resume-cancellations-taper-august-4",
    title: "WestJet's planes are coming back: cancellations taper off on August 4 as the airline ramps its network up again, though a full recovery will still take a few days",
    dek: "Following up on our August 3 note about the tentative deal that ended the cabin-crew strike, the operation is now clawing its way back. WestJet's travel advisory says it is gradually resuming service after reaching a tentative agreement with CUPE, and the cancellation count dropped sharply on August 4 from the hundreds scrubbed on Monday, with only a handful of flights cut on Tuesday. WestJet is warning that fully rebuilding the schedule will take several days as it repositions aircraft and crews, so some flights may still be disrupted, and its free change-and-cancel window for travel through August 6 remains in place.",
    section: "News",
    tags: ["news", "westjet", "travel"],
  },
  {
    path: "/news/westjet-cupe-tentative-agreement-strike-ends-august-3",
    title: "WestJet and its cabin crew reach a tentative deal a day into the strike, withdrawing the strike and lockout notices and starting the work of getting the fleet flying again",
    dek: "Following up on our August 2 note about the walkout that grounded WestJet's mainline jets, the stoppage turned out to be short: WestJet and CUPE reached a tentative agreement on August 3, both the strike and lockout notices were withdrawn, and the airline began restoring service. The deal, which the union says evolves the flight-credit system to recognize more of the ground work cabin crew do, still has to pass a ratification vote, and WestJet is warning that rebuilding the schedule after a network-wide shutdown takes a few days rather than happening all at once.",
    section: "News",
    tags: ["news", "westjet", "travel"],
  },
  {
    path: "/news/westjet-flight-attendants-strike-begins-work-stoppage-august-2",
    title: "WestJet's flight attendants are officially on strike, grounding the mainline fleet from just after midnight on August 2 after last-ditch talks collapsed",
    dek: "Following up on our August 1 note about the mounting cancellations, the deadline came and went without a deal: about 4,400 WestJet cabin crew walked off the job at 12:01 a.m. Mountain Time on August 2, and the airline confirmed a full work stoppage is now in effect, so it cannot fly its scheduled 737 and 787 flights. Reports had cancellations climbing into the hundreds over the long-weekend Sunday, Encore turboprop and partner codeshare flights are not part of the stoppage, and WestJet says affected guests will be refunded or reaccommodated.",
    section: "News",
    tags: ["news", "westjet", "travel"],
  },
  {
    path: "/news/westjet-initiates-flight-cancellations-strike-deadline-august-1",
    title: "WestJet moves from parking planes to actually cancelling flights, scrubbing hundreds of departures as the August 2 strike deadline arrives",
    dek: "Following up on our July 31 note about WestJet parking its 737 fleet, the airline began what it calls an organized take-down of its network late on July 31 and through August 1, cancelling hundreds of flights and emailing affected guests directly. Reports had the count climbing past 270 flights by Saturday afternoon, the earliest possible strike or lockout is still set for 12:01 a.m. Mountain Time on August 2, and the free change-and-cancel window for travel between July 30 and August 4 remains in place.",
    section: "News",
    tags: ["news", "westjet", "travel"],
  },
  {
    path: "/news/westjet-begins-parking-737-fleet-strike-deadline-july-31",
    title: "WestJet starts parking its 737 fleet as talks fail to land a deal, moving the strike from a threat to something you can see on the tarmac",
    dek: "Following up on our July 30 note about the strike and lockout notices, WestJet said on July 31 that negotiations had not produced an agreement, so it has begun the difficult work of parking its Boeing 737 aircraft ahead of a possible stoppage as early as 12:01 a.m. Mountain Time on August 2. WestJet Encore Q400 flights and partner codeshares are not affected, and the free change-and-cancel window for travel between July 30 and August 4 still stands.",
    section: "News",
    tags: ["news", "westjet", "travel"],
  },
  {
    path: "/news/westjet-cabin-crew-strike-notice-filed-lockout-august-2",
    title: "WestJet's cabin crew file their 72-hour strike notice and the airline answers with a lockout notice, putting the earliest stoppage at 12:01 a.m. on August 2",
    dek: "Following up on our earlier July 30 note, the window did not stay open long: CUPE served WestJet a formal 72-hour strike notice on July 30 and the airline responded the same day with its own lockout notice, so a work stoppage could begin as early as 12:01 a.m. Mountain Time on August 2, the Saturday of the Civic long weekend, though both sides say talks are continuing.",
    section: "News",
    tags: ["news", "westjet", "travel"],
  },
  {
    path: "/news/westjet-strike-72-hour-notice-window-opens-july-30",
    title: "WestJet's flight-attendant strike enters its final countdown as the earliest 72-hour walkout notice can now be filed",
    dek: "Following up on our July 24 note, WestJet's roughly 4,400 cabin crew reached the point on July 30 where their union can legally file a 72-hour strike notice, putting the earliest possible walkout at August 2, the Saturday of the Civic long weekend, and the airline and CUPE have reportedly worked out a plan to wind operations down in an orderly way if it comes to that.",
    section: "News",
    tags: ["news", "westjet", "travel"],
  },
  {
    path: "/news/air-canada-premium-economy-business-class-basic-fares-july-28",
    title: "Air Canada adds cheaper Premium Economy Basic and Business Class Basic fares, but they earn fewer Aeroplan points and block eUpgrades",
    dek: "Air Canada rolled out two new lower-priced premium fares on July 28, Premium Economy Basic and Business Class Basic, that keep the roomy seat and the meal but strip out things like free advance seat selection, some lounge access, and the ability to use eUpgrades, and they earn Aeroplan at the base 1 point per dollar rather than a fare-brand bonus.",
    section: "News",
    tags: ["news", "aeroplan", "business-class", "travel"],
  },
  {
    path: "/news/aeroplan-calm-air-reward-bookings-move-to-air-canada-july-22",
    title: "Aeroplan reward bookings on Calm Air move to Air Canada, opening up northern flights to combine with 50-plus partners",
    dek: "As of July 22, Aeroplan members book award flights on Calm Air, the airline that serves Manitoba and Nunavut, directly at aircanada.com or in the Air Canada app rather than through Calm Air itself, and those seats can now be strung together with Aeroplan's 50-plus airline partners on one reward booking.",
    section: "News",
    tags: ["news", "aeroplan", "award-booking", "travel"],
  },
  {
    path: "/news/porter-viporter-reward-flight-fuel-surcharge-back-to-40-july",
    title: "Porter puts its reward-flight fuel surcharge back up to $40, undoing the cut it made only last month",
    dek: "Porter Airlines told VIPorter members on July 17 that it is raising the fuel surcharge on reward flight bookings back to $40 each way, doubling the $20 it had trimmed the fee to in June, and pointing to a sharp jump in jet fuel prices. Bookings already made keep their original rate.",
    section: "News",
    tags: ["news", "points", "award-booking", "travel"],
  },
  {
    path: "/news/aeroplan-emirates-premium-economy-first-class-restriction-july-18",
    title: "Aeroplan opens up Emirates Premium Economy awards, while quietly walling off Emirates First Class to its top-tier members",
    dek: "Air Canada confirmed on July 18 that Aeroplan members can start redeeming points for Emirates Premium Economy from July 21, making Emirates the first Aeroplan partner bookable in all four cabins, but Emirates First Class awards are now limited to members with Aeroplan 35K status or higher.",
    section: "News",
    tags: ["news", "aeroplan", "award-booking", "travel"],
  },
  {
    path: "/news/westjet-flexible-change-policy-strike-threat-july-24",
    title: "WestJet lets travellers change or cancel late-July and early-August flights for free as the flight-attendant strike threat nears",
    dek: "Following up on our July 15 note, WestJet posted a travel advisory on July 23 offering guests booked between July 30 and August 4 a one-time change or cancellation with no fee, giving people some breathing room while talks with its 4,400 cabin crew continue and the earliest legal walkout date of August 2 approaches.",
    section: "News",
    tags: ["news", "westjet", "travel"],
  },
  {
    path: "/news/aeroplan-buy-points-110-percent-bonus-july-16-19",
    title: "Aeroplan lifts its summer buy-points sale to a 110 percent bonus, now running through July 19",
    dek: "Following up on our July 12 note, Aeroplan sweetened its summer buy-points sale on July 16 to a targeted bonus of up to 110 percent, a step up from the 100 percent it had been offering, and set the new window to close July 19.",
    section: "News",
    tags: ["news", "aeroplan", "points"],
  },
  {
    path: "/news/rbc-avion-visa-infinite-55k-offer-july-16",
    title: "RBC's Avion Visa Infinite resets to a 55,000-point offer now that the record 70,000 window has closed",
    dek: "Following up on our July 10 note, RBC's record-high Avion welcome bonuses closed to new applications on July 15, and a fresh Avion Visa Infinite offer worth up to 55,000 points opened July 16 and runs through August 12.",
    section: "News",
    tags: ["news", "rbc-avion", "cards", "welcome-bonuses"],
  },
  {
    path: "/news/westjet-flight-attendants-vote-yes-strike-mandate",
    title: "WestJet flight attendants vote overwhelmingly for a strike mandate, with a walkout possible from August 2",
    dek: "Following up on our July 11 note, CUPE announced on July 15 that 99.4 percent of voting WestJet flight attendants backed a strike mandate on a 97.3 percent turnout, though the earliest any legal walkout or lockout could begin is the August long weekend.",
    section: "News",
    tags: ["news", "westjet", "travel"],
  },
  {
    path: "/news/aeroplan-world-of-hyatt-partnership",
    title: "Aeroplan and World of Hyatt team up, so you can now turn points into hotel nights and Hyatt stays into Air Canada flights",
    dek: "Air Canada's Aeroplan and World of Hyatt launched a partnership on July 15 that lets you redeem Aeroplan points for Hyatt free nights from 25,000 points, convert Hyatt points to Aeroplan at 2:1, and earn on both sides when you link your accounts.",
    section: "News",
    tags: ["news", "aeroplan", "points", "transfers", "travel"],
  },
  {
    path: "/news/flair-pilots-ratify-three-year-contract",
    title: "Flair Airlines pilots ratify a three-year contract, taking labour uncertainty off the table for the discount carrier",
    dek: "Flair Airlines pilots, represented by ALPA, voted on July 14 to ratify a new three-year collective agreement with 89 percent support, ending more than ten months of negotiations and settling one more piece of Canada's summer airline labour picture.",
    section: "News",
    tags: ["news", "travel"],
  },
  {
    path: "/news/marriott-bonvoy-japan-airlines-preferred-partnership",
    title: "Marriott Bonvoy and Japan Airlines launch a partnership that hands you points just for linking accounts",
    dek: "Marriott Bonvoy and Japan Airlines launched a preferred partnership on July 14 that gives Bonvoy members JAL FLY ON Points, from 2,000 up to 20,000 a year by elite tier, just for linking their accounts, while JAL members get a shortcut to Marriott elite status.",
    section: "News",
    tags: ["news", "points", "transfers", "travel"],
  },
  {
    path: "/news/air-canada-iamaw-tentative-agreement-maintenance",
    title: "Air Canada reaches a tentative deal with 11,000 maintenance and operations workers, easing summer disruption worries",
    dek: "Air Canada said on July 13 that it reached a tentative four-year agreement with the IAMAW, the union for about 11,000 of its technical operations, maintenance, airport, and cargo staff, subject to a ratification vote expected to wrap up over the coming days.",
    section: "News",
    tags: ["news", "travel"],
  },
  {
    path: "/news/air-canada-city-shuttle-downtown-montreal-yul",
    title: "Air Canada launches a $9 City Shuttle between downtown Montréal and the airport",
    dek: "Air Canada started a new City Shuttle on July 13 running between the Palais des congrès downtown and Montréal-Trudeau airport for $9 one way, with 37 departures a day and a dedicated lane that can shave up to 25 minutes off the trip at peak times.",
    section: "News",
    tags: ["news", "travel"],
  },
  {
    path: "/news/aeroplan-buy-points-100-percent-bonus-flash-sale-july",
    title: "Aeroplan's summer buy-points sale is back with up to a 100 percent bonus, running through July 17",
    dek: "Aeroplan brought back its summer buy-points sale on July 12 with up to a 100 percent bonus through July 17, and it lifted the per-transaction cap to 500,000 points, though the offer looks targeted so the bonus you see may be lower.",
    section: "News",
    tags: ["news", "aeroplan", "points"],
  },
  {
    path: "/news/rbc-avion-record-high-welcome-bonuses-final-days-july-15",
    title: "RBC's record-high Avion welcome bonuses close July 15, up to 70,000 points on the Visa Infinite and 100,000 on the Privilege",
    dek: "RBC's record-high Avion welcome offers close to new applications on July 15, with up to 70,000 Avion points on the Visa Infinite and up to 100,000 on the Visa Infinite Privilege.",
    section: "News",
    tags: ["news", "rbc-avion", "cards", "welcome-bonuses"],
  },
  {
    path: "/news/westjet-flight-attendants-strike-mandate-vote",
    title: "WestJet flight attendants open a strike-mandate vote, but the earliest any walkout could come is August",
    dek: "WestJet's roughly 4,400 mainline flight attendants, represented by CUPE, opened a strike-mandate vote on July 8 that runs through July 15, though a vote is not a strike and the earliest a legal walkout or lockout could begin is August 2.",
    section: "News",
    tags: ["news", "westjet", "travel"],
  },
  {
    path: "/news/rbc-avion-aadvantage-15-percent-transfer-bonus-august",
    title: "RBC's summer Avion-to-AAdvantage transfer bonus is back, 15 percent through August",
    dek: "RBC confirmed on July 8 that its annual bonus for moving Avion points to American Airlines AAdvantage returns for August, giving 8.05 miles for every 10 Avion points transferred all month.",
    section: "News",
    tags: ["news", "rbc-avion", "aadvantage", "transfers", "points"],
  },
  {
    path: "/news/air-canada-new-ceo-anko-van-der-werff",
    title: "Air Canada names Anko Van der Werff as its next CEO, starting early 2027",
    dek: "Air Canada said on July 8 that Scandinavian Airlines chief Anko Van der Werff will take over as president and CEO by the end of January 2027, succeeding the retiring Michael Rousseau.",
    section: "News",
    tags: ["news", "aeroplan", "travel"],
  },
  {
    path: "/news/scene-plus-members-day-july-7-grocery-discount-or-points",
    title: "Scene+ Members Day lands today with a choice of up to 15 percent off groceries or bonus points",
    dek: "A one-day Scene+ Members Day at Sobeys and its Empire grocery banners lets you take 10 or 15 percent off, depending on your province, or earn 200 points per $20 on a $50-plus shop, so plan a bigger grocery run for today.",
    section: "News",
    tags: ["news", "scene-plus", "points"],
  },
  {
    path: "/news/scotiabank-scene-plus-refresh-platinum-amex-100k",
    title: "Scotiabank refreshes its Scene+ welcome offers, with an all-time-high 100,000 points on the Platinum Amex",
    dek: "A new round of Scene+ card offers that opened July 2 headlines with up to 100,000 Scene+ points on the Platinum Amex, the richest bonus that card has ever carried, plus a bumped 50,000 on the Gold Amex.",
    section: "News",
    tags: ["news", "scene-plus", "cards", "welcome-bonuses"],
  },
  {
    path: "/news/aeroplan-club-avolta-airport-shopping-partnership",
    title: "Aeroplan ties up with Club Avolta so you can earn points shopping and dining at the airport",
    dek: "A new North American partnership lets you earn 1 Aeroplan point per $2 spent at Hudson, Dufry, and other airport shops once you link the two accounts.",
    section: "News",
    tags: ["news", "aeroplan", "points"],
  },
  {
    path: "/news/aeroplan-san-antonio-package-5000-bonus",
    title: "Air Canada Vacations is adding 5,000 bonus Aeroplan points on San Antonio packages",
    dek: "A new promo hands Aeroplan members 5,000 bonus points on select San Antonio flight and hotel packages booked by July 26.",
    section: "News",
    tags: ["news", "aeroplan", "points", "travel"],
  },
  {
    path: "/news/petro-canada-triangle-canada-day-bonus-ct-money",
    title: "Petro-Canada is handing out bonus CT Money on Canada Day fill-ups",
    dek: "From July 1 to 5 you can collect $3 in bonus Canadian Tire Money every time you pump 25 litres or more, and there is no cap on how often you earn it.",
    section: "News",
    tags: ["news", "points"],
  },
  {
    path: "/news/aeroplan-estore-20x-canadian-down-feather",
    title: "Earn 20x Aeroplan points on bedding from the Canadian Down & Feather Company",
    dek: "Through July 12 the Aeroplan eStore is paying 20 points per dollar at the Canadian-made bedding brand, one of the richest multipliers we have seen this year.",
    section: "News",
    tags: ["news", "aeroplan", "points"],
  },
  {
    path: "/news/amex-aeroplan-reserve-150k-welcome",
    title: "The Amex Aeroplan Reserve is back at its all-time-high 150,000-point welcome offer",
    dek: "Through July 28 new cardmembers can earn up to 150,000 Aeroplan points, the richest welcome bonus this card has ever carried.",
    section: "News",
    tags: ["news", "aeroplan", "amex", "cards", "welcome-bonuses", "points"],
  },
  {
    path: "/news/westjet-companion-voucher-fuel-surcharge-trimmed",
    title: "WestJet trims the companion voucher fuel surcharge from $60 to $40",
    dek: "As fuel prices ease, WestJet has cut the surcharge on companion voucher bookings to $40, with Porter going further down to $20.",
    section: "News",
    tags: ["news", "travel", "points"],
  },
  {
    path: "/news/british-airways-porter-codeshare-avios",
    title: "British Airways and Porter launch a codeshare, and you can earn Avios on Porter flights",
    dek: "From July 8 you can book 17 Porter destinations across Canada on a single British Airways ticket and earn Avios and tier points on the Porter legs.",
    section: "News",
    tags: ["news", "avios", "points", "travel", "alliances"],
  },
  {
    path: "/news/rbc-avion-ticketmaster-redemption",
    title: "RBC opens up Avion points for Ticketmaster events across Canada",
    dek: "Avion Rewards members can now put points toward concert and event tickets on Ticketmaster.ca, from a single cent up to $500 a day with no redemption fees.",
    section: "News",
    tags: ["news", "rbc-avion", "points"],
  },
  {
    path: "/news/chase-sapphire-preferred-100k-refresh",
    title: "Chase Sapphire Preferred refreshes its perks and brings back a 100,000-point bonus",
    dek: "The June refresh keeps the $95 annual fee while adding a $100 hotel credit and a Global Entry, TSA PreCheck or NEXUS credit, alongside its best-ever welcome offer.",
    section: "News",
    tags: ["news", "cards", "welcome-bonuses", "travel-cards", "points"],
  },

  // Guides
  {
    path: "/guides/us-cards-for-canadians",
    title: "US credit cards for Canadians: how to get approved and why you would",
    dek: "Building US credit and landing American welcome bonuses from north of the border.",
    section: "Guides",
    tags: ["personal-finance", "cards", "welcome-bonuses", "amex", "newcomers"],
  },
];

export function listTags(): Tag[] {
  return TAGS;
}

export function tagBySlug(slug: string): Tag | undefined {
  return TAGS.find((t) => t.slug === slug);
}

export function articlesForTag(slug: string): TaggedArticle[] {
  return TAGGED_ARTICLES.filter((a) => a.tags.includes(slug));
}

export function tagsForPath(path: string): Tag[] {
  const entry = TAGGED_ARTICLES.find((a) => a.path === path);
  if (!entry) return [];
  return entry.tags
    .map((slug) => tagBySlug(slug))
    .filter((t): t is Tag => t !== undefined);
}

export function tagCount(slug: string): number {
  return articlesForTag(slug).length;
}

// A tag page is only indexed (and only listed in the sitemap) once it has at
// least this many articles. Shared so the sitemap and the tag page's noindex
// rule can never drift apart. See src/app/tags/[slug]/page.tsx.
export const MIN_INDEXABLE_TAG_ARTICLES = 3;

// Fallback for data-driven items that may not be in the registry yet.
export function fallbackTagsForPath(path: string): string[] {
  if (path.startsWith("/travel/sweet-spots/")) return ["travel", "points", "award-booking"];
  if (path.startsWith("/news/")) return ["news"];
  return [];
}

export function resolveTagSlugsForPath(path: string): string[] {
  const entry = TAGGED_ARTICLES.find((a) => a.path === path);
  if (entry) return entry.tags;
  return fallbackTagsForPath(path);
}
