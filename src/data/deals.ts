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

// Hand-picked and curated on demand, a deal or two at a time, whenever we spot
// something worth passing along. We only post real product or service deals that
// save people money: high quality things at a deep discount, or productive buys
// that pay for themselves over time. No credit card or bank welcome offers here,
// those live in the Cards tab. Always verify the deal is live, then link straight
// to the merchant. Prices below were confirmed on the listed date.
export const DEALS: Deal[] = [
  {
    title: "AMD Ryzen 5 7600X 6-core desktop processor",
    merchant: "Newegg",
    url: "https://www.newegg.ca/amd-ryzen-5-7600x-ryzen-5-7000-series-raphael-zen-4-socket-am5/p/N82E16819113770",
    price: "$209.99",
    was: "$449.99",
    blurb:
      "If you are building or upgrading a gaming PC, this is a genuinely low price on a very capable chip. Newegg has the AMD Ryzen 5 7600X at $209.99, sold and shipped by Newegg with free 30 day returns. You get six fast Zen 4 cores that handle modern games and everyday work without breaking a sweat, and paired with a decent graphics card this is the kind of processor a build stays happy on for years. One honest note so you buy clear eyed: this is an AM5 chip, so unless you are already on that platform you will also need an AM5 motherboard and DDR5 memory, which adds to the real cost. It is a part for a build or an upgrade, not a plug and play gadget. If you are already on AM5 or planning a fresh build though, this is a lot of processor for the money.",
    category: "Electronics",
    posted: "Jul 18, 2026",
  },
  {
    title: "Verbatim 8-in-1 USB-C hub with 4K HDMI and 100W passthrough",
    merchant: "Newegg",
    url: "https://www.newegg.ca/verbatim-vuc-2081d-usb-ethernet/p/N82E16817130333",
    price: "$14.38",
    was: "$59.99",
    blurb:
      "Here is a cheap and genuinely handy little accessory at $14.38, down from $59.99. It is a Verbatim 8 in 1 USB-C hub that turns a single USB-C port into a 4K HDMI output, two full size USB 3.0 ports, SD and microSD card readers, a headphone jack, and 100W passthrough charging so your laptop keeps topping up while everything else is plugged in. For anyone on a slim laptop or tablet that is short on ports, it is the sort of thing that quietly earns its keep on the desk and in the bag. It is sold and shipped by Newegg with free 30 day returns. One honest note so it works for you: a hub like this only drives an external screen if your device's USB-C port supports video out, which most recent laptops do but some budget and older ones do not, so check your port before you count on the HDMI.",
    category: "Electronics",
    posted: "Jul 18, 2026",
  },
  {
    title: "Samsung 27-inch QHD 180Hz IPS gaming monitor (Odyssey G5 G50F)",
    merchant: "Newegg",
    url: "https://www.newegg.ca/samsung-ls27fg500enxza-27-qhd-180hz-ips-black/p/N82E16824027405",
    price: "$199.99",
    was: "$349.99",
    blurb:
      "If you are still working or gaming on a basic 1080p screen, this is the kind of upgrade you feel every single day. Samsung has its 27 inch Odyssey G5 down to $199.99 from $349.99, a clean $150 off, and the specs punch well above that price. You get sharp QHD 2560x1440 resolution, a fast 180Hz refresh rate, and an IPS panel that keeps colours honest from any angle, so text stays crisp for a work day and motion stays smooth for a game night. One honest note so you buy clear eyed: this is a straightforward gaming and productivity monitor without extras like USB-C charging or built-in speakers, and Newegg gives you a short 15 day return window, so if you want to try it, decide inside that window.",
    category: "Electronics",
    posted: "Jul 16, 2026",
  },
  {
    title: "Gigabyte 27-inch QHD 180Hz curved gaming monitor (GS27QCA)",
    merchant: "Newegg",
    url: "https://www.newegg.ca/gigabyte-gs27qca-27-qhd-180hz-gs-series-va-black/p/N82E16824012112",
    price: "$179.99",
    was: "$269.99",
    blurb:
      "Here is the curved option if that is your thing, and it is genuinely cheap for what you get. Newegg has this Gigabyte 27 inch QHD monitor down to $179.99 from $269.99, a third off. It pairs the same sharp 2560x1440 resolution and quick 180Hz refresh as the flat panels with a gentle 1500R curve and a VA screen, which gives you deeper blacks and more contrast that a lot of people love for movies and darker games. One honest note so you go in knowing: VA panels trade a little of the wide viewing angle and pixel response speed you would get from IPS, and a curve is a personal taste, so if you do detailed colour work or share the screen sideways, the flat IPS option may suit you better.",
    category: "Electronics",
    posted: "Jul 16, 2026",
  },
  {
    title: "Cooler Master Elite Liquid 240 AIO CPU cooler",
    merchant: "Newegg",
    url: "https://www.newegg.ca/cooler-master-liquid-cooling-system/p/N82E16835103322",
    price: "$85.49",
    was: "$229.99",
    blurb:
      "If you have a desktop PC that runs hot and loud under load, a good all in one liquid cooler is one of the nicer quality of life upgrades, and this one is 62 percent off at $85.49 down from $229.99. A 240mm radiator like this pulls heat off the processor far better than a small stock cooler, which keeps the chip running faster for longer and lets the fans spin down to a whisper instead of roaring during a game or a big export. It is sold and shipped by Newegg with free 30 day returns. One honest note so nobody buys wrong: this only makes sense if you are building or upgrading a desktop and your case has room for a 240mm radiator, so check your case clearance and socket support first. It is not a plug and play gadget for a laptop or a non PC household.",
    category: "Electronics",
    posted: "Jul 16, 2026",
  },
  {
    title: "Corsair Scimitar Elite Wireless SE gaming mouse",
    merchant: "Newegg",
    url: "https://www.newegg.ca/corsair-scimitar-elite-wireless-se-usb-bluetooth-bluetooth-2-4ghz-wired/p/N82E16826816225",
    price: "$109.99",
    was: "$199.99",
    blurb:
      "This is Corsair's flagship mouse for people who live in MMOs, MOBAs, or macro heavy work, and it is down to $109.99 from $199.99, a full 45 percent off. The draw is the twelve button side panel that slides to fit your thumb, so all those abilities, hotkeys, or shortcuts sit right under one finger instead of scattered across the keyboard, and it runs wireless over both a 2.4GHz dongle and Bluetooth. One honest note so you buy for the right reason: that side panel is wonderful if you actually use a lot of buttons, but it makes the mouse chunkier and busier than a plain everyday pointer, so if you just want something simple to move a cursor around, a basic mouse will serve you better for a lot less. At this price though, it is a treat for the right kind of gamer.",
    category: "Electronics",
    posted: "Jul 16, 2026",
  },
  {
    title: "MSI Versa 300 wireless gaming mouse",
    merchant: "Newegg",
    url: "https://www.newegg.ca/p/N82E16826554085",
    price: "$42.99",
    was: "$69.99",
    blurb:
      "For anyone still fighting a cheap office mouse, this is an easy and affordable step up at $42.99, down from $69.99. The MSI Versa 300 is a light wireless mouse with an adjustable sensor up to 8000 DPI and both Bluetooth and a low lag 2.4GHz dongle, so it works nicely for gaming and doubles as a tidy cordless mouse for everyday work at the desk. It is sold and shipped by Newegg with free 30 day returns. One honest note so you buy clear eyed: MSI is a newer name in mice rather than an established Logitech or Razer, and the shape is built for a gaming grip, so it suits someone who wants a responsive wireless mouse on a budget more than someone after a specific ergonomic fit.",
    category: "Electronics",
    posted: "Jul 16, 2026",
  },
  {
    title: "Ninja Foodi 8-qt 2-basket air fryer, DualZone (DZ201C)",
    merchant: "Amazon",
    url: "https://www.amazon.ca/dp/B08GL1XSH8",
    price: "$149.99",
    was: "$229.99",
    blurb:
      "The Ninja DualZone is the air fryer that actually earns its counter space in a busy house, and it is down to $149.99 from $229.99, a clean 35 percent off. The trick is the two separate baskets, so you can run fries in one zone and chicken in the other and have them finish at the same time instead of cooking one thing and then the other. Eight quarts total is plenty for a weeknight family dinner, and the reviews back it up with a 4.7 star average across more than sixteen thousand ratings. One honest note so nobody is surprised: with both baskets going it is a chunky unit that takes up real room on the counter, and if you only ever cook for one or two people a smaller single basket fryer will do the job for less. For feeding a family though, this is the one people keep reaching for.",
    category: "Appliances",
    posted: "Jul 16, 2026",
  },
  {
    title: "X-Sense Wi-Fi water leak detector kit, 4 sensors and base",
    merchant: "Amazon",
    url: "https://www.amazon.ca/dp/B0DFCMJH5L",
    price: "$58.99",
    was: "$69.99",
    blurb:
      "This is the kind of boring buy that saves you a five figure headache. A burst supply line or a slow drip under the water heater can wreck a finished basement before you ever smell it, and this X-Sense kit puts four Wi-Fi sensors around the house with a base station that pings your phone the second one gets wet. It is down to $58.99 from $69.99 and holds a 4.5 star rating across nearly two thousand reviews. Set the sensors by the washer, the dishwasher, the sump, the water heater, and under a bathroom sink, and you get a loud 100 dB alarm plus a phone alert even when you are out of the house. One honest note so you buy clear eyed: it leans on your 2.4 GHz Wi-Fi to send the away from home alerts, and it warns you about water, it does not shut the water off. For the price it is cheap insurance.",
    category: "Home",
    posted: "Jul 16, 2026",
  },
  {
    title: "Ricardo Beverly Hills Huntington 2-piece hardside luggage set",
    merchant: "Costco",
    url: "https://www.costco.ca/ricardo-beverly-hills---huntington-2-piece-hardside-luggage-set.product.4000407321.html",
    price: "$99.97",
    was: "$199.99",
    blurb:
      "If a bag has ever popped open on you mid trip, a solid hardside set at half price is worth a look. Costco has the Ricardo Beverly Hills Huntington two piece hardside set down to $99.97 from the $199.99 it sold at before, and shipping is free. Ricardo is a real luggage name rather than a no name, and you get a carry on plus a larger checked size, both with spinner wheels and hard shells, which is enough to cover a family that travels a couple of times a year. Two honest notes before you grab it. This is a Costco Last Chance clearance, so there is no set end date and once the stock is gone it just quietly disappears. And a hardside shell scuffs and shows scratches more than soft luggage does, so if you need it to stay showroom clean forever this is not the one, but for getting your stuff there in one piece it does the job.",
    category: "Travel",
    posted: "Jul 16, 2026",
  },
  {
    title: "LEGO Icons Ferrari F2004 & Michael Schumacher (11375)",
    merchant: "Amazon",
    url: "https://www.amazon.ca/dp/B0FMYV6NRM",
    price: "$79.99",
    was: "$119.99",
    blurb:
      "If there is an F1 fan in the house, this one is a treat at $79.99, down from $119.99. It is the LEGO Icons build of Michael Schumacher's 2004 Ferrari, the car from his championship run, aimed at adults and meant to sit on a desk or a shelf once it is done. A third off a display piece like this does not come around often, and it carries a 4.8 star rating. One honest note so you buy it for the right reason: this is a grown up build to enjoy putting together and then look at, not a toy to hand a small kid, and eighty dollars is a want and not a need. But if that is your era of racing, it is a lovely thing to have on the shelf.",
    category: "Toys",
    posted: "Jul 16, 2026",
  },
  {
    title: "LEGO Sonic the Hedgehog: Sonic's Campfire Clash (77001)",
    merchant: "Amazon",
    url: "https://www.amazon.ca/dp/B0DJ19BXLJ",
    price: "$15.00",
    was: "$24.99",
    blurb:
      "Here is an easy one for the birthday gift drawer. The LEGO Sonic Campfire Clash set is down to $15 from $24.99, its lowest price in a month, and it comes with four Sonic characters and a little launcher, aimed at ages seven and up. At fifteen bucks it is the kind of thing you keep one or two of on hand for the next kid party invite without thinking about it, and Sonic is a safe bet with most kids that age. One honest note: it is a small set, so it is a stocking stuffer sized gift rather than a big centrepiece build, but for the price that is exactly the point.",
    category: "Toys",
    posted: "Jul 16, 2026",
  },
  {
    title: "Dyson V15 Detect cordless stick vacuum, refurbished",
    merchant: "Walmart",
    url: "https://www.walmart.ca/en/ip/Dyson-Official-Outlet-V15-Detect-Cordless-Stick-Vacuum-Cleaner-Refurbished-Colour-may-vary/2O3EG212IDV7",
    price: "$499.99",
    was: "$799.99",
    blurb:
      "The V15 Detect is the Dyson a lot of people quietly want and never quite justify at full price, so a certified refurbished one at $499.99 down from $799.99 is the moment to look. It is Dyson's flagship cordless: strong suction, the laser head that lights up the fine dust you did not know was on the floor, and a runtime that gets a whole house done on one charge. It ships from Dyson's own official outlet through Walmart, so it is not some random reseller. One honest note so you buy clear eyed: refurbished means it was returned and reconditioned, the colour may vary, and these are final sale with no returns, only warranty service. If a scuff or a mystery colour would bug you, pay more for new. If you just want a Dyson that works, this is a real chunk off.",
    category: "Home",
    posted: "Jul 7, 2026",
  },
  {
    title: "Hisense 3.3 cu ft compact fridge",
    merchant: "Costco",
    url: "https://www.costco.ca/hisense-19-in.-3.3-cu-ft.-world-cup-canada-refrigerator.product.4201000053.html",
    price: "$99.97",
    was: "$149.99",
    blurb:
      "If you have been meaning to put a small fridge in the garage, the basement, a dorm, or a kid's rec room, Costco has a Hisense 3.3 cubic foot compact one down to $99.97 from the $149.99 to $169.99 it sold at before. It is Energy Star rated, has a little 2L beverage shelf and adjustable legs, and at a hundred bucks it is about as cheap as a name brand mini fridge gets. Two honest notes before you grab one. This is a Costco Last Chance clearance, which means there is no set end date and once the stock is gone it just disappears, so do not sit on it. And it is a genuinely small 3.3 cubic foot fridge, a spare or a bar fridge, not something to feed a family, and it happens to wear a World Cup Canada design with a trophy sticker in the box if that is your thing.",
    category: "Appliances",
    posted: "Jul 7, 2026",
  },
  {
    title: "RYOBI ONE+ 18V 1-gallon electric sprayer (tool only)",
    merchant: "Princess Auto",
    url: "https://www.princessauto.com/en/product/1-gallon-18v-electric-sprayer-tool-only/PA0009626011/9626011",
    price: "$24.99",
    blurb:
      "This is a niche one, but a good price if it fits your life: Princess Auto has the RYOBI ONE+ 18V one-gallon electric sprayer, tool only, for $24.99 on surplus. If you already own RYOBI 18V batteries it turns into a genuinely handy thing, misting the garden, spraying down the deck, applying a water based cleaner or disinfectant, all cordless and one handed instead of pumping a manual sprayer. This same tool runs a fair bit more through the regular tool channels, so twenty five dollars is the draw. Two honest notes so nobody buys wrong. It is tool only, no battery or charger, so it only makes sense if you are already in the RYOBI 18V world. And it is meant for thin water based liquids, not paint or thick weed killers that will clog it. Stock is low and it is a surplus buy, so it will not last.",
    category: "Tools",
    posted: "Jul 7, 2026",
  },
  {
    title: "ASICS Gel-Kayano 32 running shoes",
    merchant: "Altitude Sports",
    url: "https://www.altitude-sports.com/p/asics-gelkayano-32-running-shoes-mens-acs-1011c052",
    price: "$145.19",
    was: "$219.99",
    blurb:
      "The Gel-Kayano is Asics' flagship stability shoe, the one runners with flat feet or tired knees quietly swear by, and Altitude Sports has the current version 32 on clearance at $145.19, down from $219.99, simply because the Kayano 33 just landed. Nothing about the shoe changed overnight because a new model number arrived. Sign up for a free Altitude Sports account and another 5 percent comes off at checkout, bringing it to $137.93. If you run, walk a lot, or stand all day, this is a genuine flagship shoe at a mid-tier price. One honest note so you go in clear eyed: clearance means sizes and colours are already thinning out and a few widths are gone, so grab your size sooner rather than later, and buy it because you need good shoes, not because the percent-off looks big.",
    category: "Apparel",
    posted: "Jul 2, 2026",
  },
  {
    title: "Milwaukee M12 REDLITHIUM HIGH OUTPUT XC 5.0Ah battery 2-pack with charger",
    merchant: "Home Depot",
    url: "https://www.homedepot.ca/product/milwaukee-tool-m12-12v-lithium-ion-extended-capacity-xc-5-0-ah-redlithium-battery-with-charger-2-pack-/1001917113",
    price: "$148",
    blurb:
      "If you already live in the Milwaukee M12 cordless world, this is the kind of quiet restock deal worth jumping on. Home Depot has the M12 REDLITHIUM HIGH OUTPUT XC 5.0 Ah battery two-pack, charger included, for $148. A single one of these high-output batteries on its own usually runs close to what this whole kit costs, so getting two of them plus a charger at this price is the real draw, and they power the entire M12 lineup of 125-plus tools. One honest caveat so nobody buys wrong: this is batteries and a charger, not a tool, and it only makes sense if you are already on M12 or about to be. If you have never owned a Milwaukee tool, start with an actual tool kit instead. Stock has moved around by region through this sale, so make sure your local store shows it in stock before you drive over.",
    category: "Tools",
    posted: "Jul 2, 2026",
    expires: "ends Jul 18",
    expiresAt: "2026-07-18",
  },
  {
    title: "Helinox Chair One lightweight camping chair, 2-pack",
    merchant: "Costco",
    url: "https://www.costco.ca/p/-/helinox-chair-one-original-lightweight-compact-collapsible-camping-chair-2-pack/4000420308",
    price: "$199.99",
    was: "$239.99",
    blurb:
      "Helinox makes the camping chair that backpackers and patio sitters quietly obsess over, the kind that folds down to the size of a water bottle and still holds you up properly, and Costco has a two pack for $199.99, which is $40 off. Buy these one at a time at an outdoor shop and you are usually looking at well over a hundred each, so getting a matched pair for two hundred is the real draw here, perfect for the cottage, the campsite, or a couple of chairs you can toss in the trunk and forget about. One honest note so you go in clear eyed: this is $40 off Costco's own price rather than some blowout, so think of it as a fair deal on a genuinely good chair, not a fire sale. It is online only and the offer runs through July 5.",
    category: "Outdoors",
    posted: "Jun 29, 2026",
    expires: "ends Jul 5",
    expiresAt: "2026-07-05",
  },
  {
    title: "Savino 10x12 hardtop gazebo with netting",
    merchant: "Costco",
    url: "https://www.costco.ca/savino---gazebo-10x12-black-pc-8mm-with-nylon-net.product.4201000439.html",
    price: "$849.97",
    was: "$1,699.99",
    blurb:
      "If you have been pricing out a permanent shade structure for the deck or backyard, this one is hard to ignore: Costco has the Savino 10x12 hardtop gazebo down to $849.97 from $1,699.99, a clean half off. It is the proper kind with an 8mm polycarbonate roof and built in netting, so you get real shade that stands up to sun and rain and a screen to keep the bugs out on summer evenings, and at this price it undercuts most of what you will find elsewhere by a wide margin. Two honest notes before you commit. This is a last chance clearance item, which means once the stock is gone it is gone and there is no set end date, so it can disappear quietly. And it is a big build that needs a flat spot and proper anchoring, so plan for an afternoon of assembly and a helper or two.",
    category: "Home & Garden",
    posted: "Jun 29, 2026",
  },
  {
    title: "9.26-inch wireless CarPlay & Android Auto screen",
    merchant: "Amazon",
    url: "https://www.amazon.ca/dp/B0DNZMCN1R",
    price: "~$100",
    was: "$138.99",
    blurb:
      "If you are driving an older car that never came with CarPlay, a portable screen like this is a genuinely productive little buy that drags your dashboard into the modern era for about a hundred dollars. It runs wireless Apple CarPlay and Android Auto on a 9.26 inch display, supports a backup camera, and handles maps, music, and hands free calls without you ever touching your phone. It lists at $138.99 with a 28% off coupon you tick at checkout, which brings it down to roughly $100. One honest catch so you buy with eyes open: this is an off brand unit from a third party seller rather than a name you will recognize, and the price hinges entirely on that checkout coupon, so make sure the 28% is actually showing before you pay. It is also a screen that mounts on your dash, not a built in head unit.",
    category: "Electronics",
    posted: "Jun 29, 2026",
    expires: "ends Jul 18",
    expiresAt: "2026-07-18",
  },
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
    title: "Apple Watch on sale across the lineup (Series 11, SE 3, Ultra 3)",
    merchant: "Amazon",
    url: "https://www.amazon.ca/dp/B0FQFH6261",
    price: "$414",
    was: "$589",
    blurb:
      "Apple almost never marks down the Apple Watch, so a real Prime Day cut across the whole lineup is worth a look. The Series 11 in 46mm GPS is down to $414 from $589, about 30% off, and the cheaper SE 3 and the rugged Ultra 3 are discounted too. It is the upgrade most people actually feel day to day: a bigger always-on screen, proper sleep and heart tracking, and the watchOS bits that just work with an iPhone. Two honest notes so you pick the right one. This price is the GPS model, the cellular version costs more and only earns its keep if you want to leave your phone behind on runs. And if you mostly want notifications and fitness basics, the SE 3 does the job for a good bit less. Sale runs through Prime Day, which wraps June 26.",
    category: "Electronics",
    posted: "Jun 24, 2026",
    expires: "ends Jun 26",
    expiresAt: "2026-06-26",
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
    url: "https://www.shoppersdrugmart.ca/apple-airpods-pro3-active-noise-cancellation-earbuds/p/BB_195950543612?variantCode=195950543612",
    price: "$329.99",
    blurb:
      "Shoppers has the newest AirPods Pro at $329.99 and is stacking points offers that hand back roughly 148,000 PC Optimum points, which is about $148 you can put toward groceries or gas down the road. Net it out and you are closer to $182 to $224 for the best earbuds Apple makes for an iPhone. Buy online and sign in first so both point offers actually show up at checkout, a few people found they had to refresh their login. This one wraps up June 21, so it is a short window.",
    category: "Electronics",
    posted: "Jun 20, 2026",
    expires: "ends Jun 21",
    expiresAt: "2026-06-21",
  },
];

// Today's date in Canadian time, as "YYYY-MM-DD" (en-CA formats this way).
export function dealsTodayISO(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// A deal is expired once its expiry date is strictly before today, so a deal
// that "ends Jun 21" stays live through all of June 21 and archives on June 22.
export function isDealExpired(d: Deal, today: string): boolean {
  return !!d.expiresAt && d.expiresAt < today;
}
