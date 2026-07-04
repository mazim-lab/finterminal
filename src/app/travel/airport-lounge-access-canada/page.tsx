import Link from "next/link";
import { allCards } from "@/data/cards";

export const metadata = {
  title: "Airport lounge access for Canadians: how it actually works | FinTerminal",
  description:
    "A plain-English guide to airport lounge access for Canadians: how a card-bundled network like Priority Pass or DragonPass works, how airline lounges such as Air Canada Maple Leaf Lounges are reached through status or fare or a card, and the paid day-pass options when you have neither. Which of our Canadian cards include lounge access, and the fine print that actually matters. As of July 2026.",
};

const TOC = [
  { id: "routes", label: "The three ways into a lounge" },
  { id: "networks", label: "Route 1: a lounge network bundled with a card" },
  { id: "airline", label: "Route 2: airline lounges via status, fare, or a card" },
  { id: "paid", label: "Route 3: paid day passes and lounge apps" },
  { id: "cards", label: "Canadian cards that include lounge access" },
  { id: "fineprint", label: "The fine print that actually matters" },
  { id: "deep", label: "Keep going" },
];

// Derive, from our own card data, the Canadian cards whose benefits include lounge access.
// We only ever link the card page and say "check its benefit guide"; we never state a specific
// number of visits, a guest fee, or which network a named card uses, because that is card-by-card
// fine print that changes. Sorted by annual fee so we can show a couple of examples per tier.
const LOUNGE_CARDS = allCards
  .filter((c) => c.country === "CA" && c.benefits.lounge_access && (c.annual_fee || 0) > 0)
  .sort((a, b) => (b.annual_fee || 0) - (a.annual_fee || 0));

function pickExamples(min: number, max: number, n: number) {
  return LOUNGE_CARDS.filter(
    (c) => (c.annual_fee || 0) >= min && (c.annual_fee || 0) < max && !c.is_business,
  ).slice(0, n);
}

const PREMIUM = pickExamples(500, 100000, 3);
const MID = pickExamples(200, 500, 3);
const ENTRY = pickExamples(1, 200, 3);

export default function AirportLoungeAccessCanadaPage() {
  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do Canadians get airport lounge access?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "There are three main routes. First, a credit card can bundle a membership in a lounge network like Priority Pass or DragonPass, which gets you into hundreds of lounges worldwide, though the exact terms vary by card. Second, airline lounges like Air Canada's Maple Leaf Lounges are reached through elite status, a same-day business or premium fare, or in some cases an airline credit card benefit. Third, when you have neither, you can buy a day pass or use a lounge booking app. As of July 2026; lounge programs, card benefits, and access rules change, so confirm the current terms with the card issuer and the lounge program before you rely on access.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How does Priority Pass or DragonPass work with a Canadian credit card?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Some Canadian cards include a membership in a lounge network such as Priority Pass or DragonPass, which is a network of independent airport lounges you can visit around the world. A card membership typically comes with either a set number of free visits per year or unlimited visits, and guests are usually an extra charge. The exact number of visits, the guest policy, and which network a card uses vary card by card and change over time, so check the card's own benefit guide and the lounge program's terms for the specifics. As of July 2026.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I get into an Air Canada Maple Leaf Lounge?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Air Canada Maple Leaf Lounges are generally reached one of three ways: holding Aeroplan Elite status, flying a same-day Air Canada business or premium fare, or a lounge benefit attached to certain Aeroplan credit cards. When you fly international business on a Star Alliance partner, you can often use partner lounges too. The rules depend on your fare and status, which can both change, so confirm your eligibility with Air Canada before you travel. As of July 2026.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I get into a lounge without a card or status?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Many lounges sell a day pass at the door or online, and lounge booking apps let you reserve and pay for a single visit at participating lounges. It is the pay-as-you-go route when you have neither a card membership nor airline status, and it can be worth it on a long layover. Prices vary by lounge and change, so check the current cost before you count on it. As of July 2026.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is lounge access with a credit card guaranteed?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. Lounge access is a perk, not a guarantee. Lounges have a capacity and can fill up and turn you away at busy times, and shared network lounges tend to feel this most at peak hours. On top of that, guest policies and visit caps are the fine print that decides how useful the benefit really is, and status-based access can change with your fare or your status. Treat lounge access as a nice-to-have you confirm in advance, not something you count on. As of July 2026.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Which Canadian credit card is best for lounge access?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "That depends on how you travel and which lounges you actually use, so this guide does not re-rank cards. It explains how the lounge routes work and points to the Canadian cards in our data that include lounge access. For a ranked pick of the best card for lounge access, see our best travel credit cards in Canada roundup. As of July 2026.",
                    },
                  },
                ],
              }),
            }}
          />
          <nav className="crumb">
            <Link href="/">home</Link><span className="sep">/</span>
            <Link href="/travel">travel</Link><span className="sep">/</span>
            <span className="cur">airport-lounge-access-canada</span>
          </nav>

          <div className="head"><h1>Airport Lounge Access for Canadians: How It Actually Works</h1></div>
          <p className="lede">
            An airport lounge is one of those perks that sounds fancier than it is. Somewhere quiet to sit, a snack and a
            drink you did not pay for at gate prices, decent wifi, and a bathroom that is not shared with the whole
            terminal. The confusing part is not what a lounge is, it is how you actually get in, because there are a few
            different routes and they work in completely different ways. This guide walks the three main paths as a
            Canadian: a lounge network bundled with a credit card, an airline lounge you reach through status or fare, and
            the paid day-pass options for when you have neither. It is the how-it-works guide, so if you want a ranked
            pick of which card is best for lounges, we send you to the roundup for that.
          </p>
          <div className="docmeta">
            <span className="gd">TRAVEL &amp; POINTS</span><span className="sep">·</span>
            <span>about 9 min read</span><span className="sep">·</span>
            <span>as of July 2026, lounge programs and access rules change, confirm with the issuer and the lounge program before you rely on access</span>
          </div>

          <div className="cd-note">
            <div className="cap">The short answer</div>
            <p style={{ margin: 0 }} className="sub">
              There are three ways into a lounge. One, a credit card can include a membership in a lounge network like
              Priority Pass or DragonPass, which typically gives you either a set number of free visits a year or
              unlimited, with guests usually costing extra, though the exact terms vary by card. Two, airline lounges like
              Air Canada&apos;s Maple Leaf Lounges are reached through Aeroplan Elite status, a same-day Air Canada
              business or premium fare, or a benefit on certain Aeroplan cards, and flying international business on a
              partner often opens partner lounges too. Three, when you have neither, you can buy a day pass or use a
              lounge app. Access is a perk, not a guarantee: lounges can be full at peak times, and guest policies and
              visit caps are the fine print that matters. As of July 2026; lounge programs, card benefits, and access
              rules change, so confirm the current terms with the card issuer and the lounge program before you rely on
              access.
            </p>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* ROUTES */}
          <div id="routes" className="cd-sec" style={{ scrollMarginTop: 70 }}>The three ways into a lounge</div>
          <p>
            Almost every lounge visit a Canadian makes comes down to one of three routes, and the useful trick is knowing
            which one you are using, because each has its own rules and its own fine print. The first route is a lounge
            network membership that rides along with a credit card, the second is an airline&apos;s own lounge that you
            earn your way into with status or a premium fare, and the third is simply paying for a single visit. Most
            frequent travellers end up using a mix of all three depending on the trip. The sections below take them one at
            a time.
          </p>

          {/* NETWORKS */}
          <div id="networks" className="cd-sec" style={{ scrollMarginTop: 70 }}>Route 1: a lounge network bundled with a card</div>
          <p>
            The most common way Canadians get into lounges is through a membership that comes attached to a credit card.
            The big lounge networks here are{" "}
            <a href="https://www.prioritypass.com/" target="_blank" rel="noopener noreferrer">Priority Pass</a> and{" "}
            <a href="https://www.dragonpass.com/" target="_blank" rel="noopener noreferrer">DragonPass</a>. A network like
            this is not a single lounge, it is a directory of hundreds of independent airport lounges around the world that
            all honour the same membership. You show your membership at a participating lounge, they check you in, and you
            are in. Some Canadian cards include one of these memberships as a perk, which is how a card in your wallet turns
            into a lounge door on the other side of the planet.
          </p>
          <p>
            How the membership works varies, but the shape is usually the same. A card typically bundles either a set
            number of free visits per year or an unlimited membership, and bringing a guest usually costs extra on top,
            often a per-person fee charged each time. The exact number of free visits, the guest policy, and even which
            network a given card uses all differ card by card, and issuers change these terms, so the honest advice is to
            treat the specifics as something you look up rather than assume. When a card advertises lounge access, read its
            benefit guide to see how many visits you get, what a guest costs, and which network it runs on.
          </p>
          <div className="cd-note">
            <div className="cap">A network membership is not the same as unlimited free lounging</div>
            <p style={{ margin: 0 }} className="sub">
              A Priority Pass or DragonPass membership on a card is generous, but it comes with a cap and a guest policy
              nearly every time. Some cards give unlimited visits for the cardholder, some give a handful per year, and
              guests are usually an extra charge whichever way it goes. Check the card&apos;s own benefit guide and the
              network&apos;s terms for the numbers. As of July 2026; the visits, guest fees, and network a card uses can
              change, so confirm the current terms before you rely on them.
            </p>
          </div>

          {/* AIRLINE */}
          <div id="airline" className="cd-sec" style={{ scrollMarginTop: 70 }}>Route 2: airline lounges via status, fare, or a card</div>
          <p>
            The second route is the airline&apos;s own lounge, and for most Canadians that means Air Canada&apos;s{" "}
            <a href="https://www.aircanada.com/ca/en/aco/home/fly/airport/maple-leaf-lounge.html" target="_blank" rel="noopener noreferrer">Maple Leaf Lounges</a>.
            These are different from a network membership, because you generally do not buy your way in with a card
            membership, you earn or qualify your way in. There are three usual doors: holding Aeroplan Elite status, flying
            a same-day Air Canada business or premium fare that includes lounge access, or a lounge benefit attached to
            certain Aeroplan credit cards. Which door applies to you depends on your status and the ticket you are
            travelling on that day.
          </p>
          <p>
            It also stretches beyond Air Canada. Because Air Canada is part of Star Alliance, when you fly international
            business class on a Star Alliance partner you can usually use that partner&apos;s lounge as well, and the same
            idea holds for the other alliances and their premium cabins. That is why the alliance a program belongs to
            quietly decides which lounges open up on a given trip. Our{" "}
            <Link href="/travel/airline-alliances-guide-canada">airline alliance guide for Canadians</Link> maps out the
            three alliances and how a Canadian reaches each with points, which is the same map that governs partner lounge
            access.
          </p>
          <div className="cd-note">
            <div className="cap">Status and fare access can change under you</div>
            <p style={{ margin: 0 }} className="sub">
              Airline-lounge access that comes from status or a fare is only as stable as that status or fare. Requalify at
              a lower tier, or fly a cheaper fare class next time, and the lounge door can close. Treat status-based access
              as a benefit of your current situation, not a permanent membership, and confirm your eligibility with the
              airline before you travel. As of July 2026; access rules and fare benefits change.
            </p>
          </div>

          {/* PAID */}
          <div id="paid" className="cd-sec" style={{ scrollMarginTop: 70 }}>Route 3: paid day passes and lounge apps</div>
          <p>
            The third route is the simplest: pay for a single visit. Plenty of lounges sell a day pass at the door or
            online, and lounge booking apps let you reserve and pay for one visit at participating lounges before you even
            get to the airport. This is the pay-as-you-go option for when you have no card membership and no airline
            status, and it genuinely earns its keep on a long layover, an early departure, or a delayed flight when a few
            hours somewhere comfortable is worth the money. It also works as a backup when your usual lounge is full.
          </p>
          <p>
            The catch is only that prices vary a lot by lounge and change over time, so a day pass is worth a quick
            cost-versus-comfort check rather than an automatic yes. If you are travelling with family, do the math per
            person, because a paid visit for a group adds up fast. Confirm the current price on the lounge&apos;s own page
            or in the app before you count on it.
          </p>

          {/* CARDS */}
          <div id="cards" className="cd-sec" style={{ scrollMarginTop: 70 }}>Canadian cards that include lounge access</div>
          <p>
            If the card route is the one you want, here are Canadian cards from our own data that include lounge access as
            a benefit, grouped roughly by annual fee so you can see the tiers. We are deliberately not stating how many
            visits any one card gives, what its guests cost, or which network it uses, because those are exactly the
            details that vary card by card and change over time. Instead, open the card page and read its benefit guide
            for the specifics. And to be clear about scope: this is the how-it-works guide, so for a ranked pick of which
            card is actually best for lounges, see our{" "}
            <Link href="/personal-finance/best-travel-credit-cards-canada">best travel credit cards in Canada</Link>{" "}
            roundup, which has a dedicated best-for-lounge-access section.
          </p>

          {PREMIUM.length > 0 && (
            <>
              <p><strong>Premium tier (higher annual fee).</strong> The big-fee cards, where a broad lounge benefit is often part of what the fee buys.</p>
              <ul>
                {PREMIUM.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/cards/${c.slug}`}>{c.name}</Link>. Includes lounge access in our data; check its benefit guide for the visit count, guest policy, and network.
                  </li>
                ))}
              </ul>
            </>
          )}
          {MID.length > 0 && (
            <>
              <p><strong>Mid tier.</strong> A middle-fee band where lounge access shows up alongside strong travel earn.</p>
              <ul>
                {MID.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/cards/${c.slug}`}>{c.name}</Link>. Includes lounge access in our data; check its benefit guide for the visit count, guest policy, and network.
                  </li>
                ))}
              </ul>
            </>
          )}
          {ENTRY.length > 0 && (
            <>
              <p><strong>Lower-fee tier.</strong> Cards with a smaller fee that still bundle some lounge access, usually with a tighter visit cap.</p>
              <ul>
                {ENTRY.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/cards/${c.slug}`}>{c.name}</Link>. Includes lounge access in our data; check its benefit guide for the visit count, guest policy, and network.
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="cd-note">
            <div className="cap">Read the benefit guide, do not assume the numbers</div>
            <p style={{ margin: 0 }} className="sub">
              &quot;Lounge access&quot; on a card can mean unlimited visits or just a couple a year, with guests free or
              paid, on Priority Pass or DragonPass or an airline&apos;s own lounges. Those differences are the whole game,
              so the card page and its benefit guide are where you confirm what you actually get. For the ranked pick, our{" "}
              <Link href="/personal-finance/best-travel-credit-cards-canada">best travel credit cards roundup</Link> does
              the comparing. As of July 2026; card lounge benefits change, confirm with the issuer.
            </p>
          </div>

          {/* FINE PRINT */}
          <div id="fineprint" className="cd-sec" style={{ scrollMarginTop: 70 }}>The fine print that actually matters</div>
          <p>
            Lounge access reads like a simple yes-or-no perk, but the value lives almost entirely in the fine print. A few
            honest notes worth internalising before you lean on it.
          </p>
          <ul>
            <li><strong>Access is a perk, not a guarantee.</strong> Lounges have a capacity, and at busy times they can and do turn people away, with shared network lounges tending to feel it most at peak hours. Have a plan B, because a full lounge is a normal outcome, not a mistake on your end.</li>
            <li><strong>Guest policies and visit caps are the real story.</strong> Whether guests are free or paid, and how many visits you get a year, decide how useful the benefit is far more than the headline &quot;lounge access&quot; does. A card with unlimited visits and free guests is a different animal from one with two visits a year and paid guests, even though both say the same three words.</li>
            <li><strong>Status-based access can change with your fare or status.</strong> Airline-lounge access that comes from status or a business fare can disappear if you requalify lower or fly a cheaper ticket next time. It is a benefit of your current situation, not a permanent right.</li>
            <li><strong>Which network a card uses varies.</strong> Two cards can both say &quot;lounge access&quot; and give you entirely different networks, so do not assume Priority Pass just because a friend&apos;s card has it. Check the specific card.</li>
            <li><strong>Everything here is general and dated.</strong> Lounge programs, card benefits, and access rules change. Everything in this guide is as of July 2026, so confirm the current terms with the card issuer and the lounge program before you rely on access.</li>
          </ul>

          <div className="cd-sec">The short version</div>
          <p>
            Getting into a lounge as a Canadian comes down to three routes. A card can bundle a Priority Pass or
            DragonPass network membership, which usually means a set number of free visits or unlimited, with guests
            costing extra and the exact terms varying by card. An airline lounge like an Air Canada Maple Leaf Lounge is
            reached through Aeroplan Elite status, a same-day business or premium fare, or a benefit on certain Aeroplan
            cards, and a partner&apos;s lounge often opens when you fly international business. And when you have neither,
            a day pass or a lounge app lets you pay for a single visit. Whichever route you use, remember that access is a
            perk and not a guarantee, and that the guest policy and visit cap are the fine print that decides how much the
            benefit is really worth.
          </p>

          {/* FAQ */}
          <div className="cd-sec">Frequently asked questions</div>
          <h4>How do Canadians get airport lounge access?</h4>
          <p>
            There are three main routes. First, a credit card can bundle a membership in a lounge network like Priority
            Pass or DragonPass, which gets you into hundreds of lounges worldwide, though the exact terms vary by card.
            Second, airline lounges like Air Canada&apos;s Maple Leaf Lounges are reached through elite status, a same-day
            business or premium fare, or in some cases an airline credit card benefit. Third, when you have neither, you
            can buy a day pass or use a lounge booking app. As of July 2026; lounge programs, card benefits, and access
            rules change, so confirm the current terms with the card issuer and the lounge program before you rely on
            access.
          </p>
          <h4>How does Priority Pass or DragonPass work with a Canadian credit card?</h4>
          <p>
            Some Canadian cards include a membership in a lounge network such as Priority Pass or DragonPass, which is a
            network of independent airport lounges you can visit around the world. A card membership typically comes with
            either a set number of free visits per year or unlimited visits, and guests are usually an extra charge. The
            exact number of visits, the guest policy, and which network a card uses vary card by card and change over
            time, so check the card&apos;s own benefit guide and the lounge program&apos;s terms for the specifics. As of
            July 2026.
          </p>
          <h4>How do I get into an Air Canada Maple Leaf Lounge?</h4>
          <p>
            Air Canada Maple Leaf Lounges are generally reached one of three ways: holding Aeroplan Elite status, flying a
            same-day Air Canada business or premium fare, or a lounge benefit attached to certain Aeroplan credit cards.
            When you fly international business on a Star Alliance partner, you can often use partner lounges too. The
            rules depend on your fare and status, which can both change, so confirm your eligibility with Air Canada
            before you travel. As of July 2026.
          </p>
          <h4>Can I get into a lounge without a card or status?</h4>
          <p>
            Yes. Many lounges sell a day pass at the door or online, and lounge booking apps let you reserve and pay for a
            single visit at participating lounges. It is the pay-as-you-go route when you have neither a card membership
            nor airline status, and it can be worth it on a long layover. Prices vary by lounge and change, so check the
            current cost before you count on it. As of July 2026.
          </p>
          <h4>Is lounge access with a credit card guaranteed?</h4>
          <p>
            No. Lounge access is a perk, not a guarantee. Lounges have a capacity and can fill up and turn you away at
            busy times, and shared network lounges tend to feel this most at peak hours. On top of that, guest policies
            and visit caps are the fine print that decides how useful the benefit really is, and status-based access can
            change with your fare or your status. Treat lounge access as a nice-to-have you confirm in advance, not
            something you count on. As of July 2026.
          </p>
          <h4>Which Canadian credit card is best for lounge access?</h4>
          <p>
            That depends on how you travel and which lounges you actually use, so this guide does not re-rank cards. It
            explains how the lounge routes work and points to the Canadian cards in our data that include lounge access.
            For a ranked pick of the best card for lounge access, see our{" "}
            <Link href="/personal-finance/best-travel-credit-cards-canada">best travel credit cards in Canada</Link>{" "}
            roundup. As of July 2026.
          </p>

          {/* KEEP GOING */}
          <div id="deep" className="cd-sec" style={{ scrollMarginTop: 70 }}>Keep going</div>
          <p>
            Once you know how the lounge routes work, the natural next steps are picking a card and understanding the
            alliances that govern partner-lounge access.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/personal-finance/best-travel-credit-cards-canada" className="cd-apply">Best travel credit cards in Canada (ranked) &rarr;</Link>
            <Link href="/travel/airline-alliances-guide-canada" className="cd-apply">The airline alliance guide for Canadians &rarr;</Link>
            <Link href="/travel/how-to-book-award-flights-canada" className="cd-apply">How to book award flights from Canada &rarr;</Link>
            <Link href="/travel/points-transfer-partners-canada" className="cd-apply">The Canadian points-transfer map &rarr;</Link>
            <Link href="/cards" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>Browse the cards &rarr;</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
