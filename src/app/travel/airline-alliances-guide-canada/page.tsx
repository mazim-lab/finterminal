import Link from "next/link";

export const metadata = {
  title: "The airline alliance guide for Canadians: Star Alliance, oneworld, and SkyTeam | FinTerminal",
  description:
    "A plain-English guide to the three global airline alliances (Star Alliance, oneworld, and SkyTeam), the notable member airlines, and exactly how a Canadian reaches each one with points. Star is strongest via Aeroplan, oneworld via Avios and AAdvantage, and SkyTeam the thinnest. As of July 2026.",
};

const TOC = [
  { id: "what", label: "What an alliance is, and why it matters for points" },
  { id: "map", label: "The three alliances at a glance" },
  { id: "star", label: "Star Alliance: the Canadian workhorse" },
  { id: "oneworld", label: "oneworld: reachable, with a bit of work" },
  { id: "skyteam", label: "SkyTeam: the honest thin spot" },
  { id: "notes", label: "Universal notes before you transfer" },
  { id: "deep", label: "Deep dives and next steps" },
];

export default function AirlineAlliancesGuideCanadaPage() {
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
                    name: "What is an airline alliance?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "An airline alliance is a group of airlines that agree to cooperate on things like shared lounges, connections, and loyalty. The three big global alliances are Star Alliance, oneworld, and SkyTeam. For points, the key benefit is that one program inside an alliance usually lets you book award flights on many partner airlines and earn or redeem across the group, so a single balance of miles reaches a whole network of carriers.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Which alliance is Air Canada in, and how do Canadians reach it with points?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Air Canada is in Star Alliance, alongside United, Lufthansa, Swiss, Austrian, Brussels, ANA, Singapore, Turkish, and EVA, among others. Canadians reach Star Alliance most easily through Aeroplan, Air Canada's own program. You can also feed Aeroplan from Amex Membership Rewards at 1 to 1, which makes Star the strongest alliance for Canadian points collectors. As of July 2026; confirm memberships and ratios live before you book.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do Canadians book oneworld flights with points?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "oneworld includes American, British Airways, Cathay Pacific, Qatar, Iberia, Finnair, Japan Airlines, Qantas, and Alaska, among others. Canadians reach it mainly through Avios (used by British Airways, Iberia, Aer Lingus, and Qatar) and through American Airlines AAdvantage. Amex Membership Rewards and RBC Avion both transfer to British Airways Avios, and RBC Avion on Avion Elite cards transfers to American AAdvantage at a base 10 points for 7 miles. As of July 2026.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can Canadians book SkyTeam flights with credit card points?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "SkyTeam, which includes Air France, KLM, Delta, and Korean Air, is the hardest alliance for Canadians to reach with points. Its main loyalty programs, Air France-KLM Flying Blue and Delta SkyMiles, are not standard transfer partners of the mainstream Canadian transferable currencies, so there is no clean direct path from a Canadian bank or card program into SkyTeam the way there is for Star or oneworld. Confirm current partners live, since programs do change.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is Aer Lingus in an alliance?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. Aer Lingus is not a member of any of the three global alliances, but it is an Avios partner, so you can still book Aer Lingus flights using Avios. WestJet is likewise not in a global alliance. Alliance membership and points partnerships are two different things, so always check both before you plan.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are points transfers into alliance programs reversible?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. Transfers from a Canadian currency like Amex Membership Rewards or RBC Avion into an airline program such as Aeroplan or Avios are one-way and irreversible. The safe habit is to find and confirm the specific award seat first, then transfer only the points that booking needs.",
                    },
                  },
                ],
              }),
            }}
          />
          <nav className="crumb">
            <Link href="/">home</Link><span className="sep">/</span>
            <Link href="/travel">travel</Link><span className="sep">/</span>
            <span className="cur">airline-alliances-guide-canada</span>
          </nav>

          <div className="head"><h1>The Airline Alliance Guide for Canadians</h1></div>
          <p className="lede">
            Airline alliances sound like insider jargon, but they are one of the most useful ideas in points, because
            they decide how far a single balance of miles can actually take you. There are three big global alliances,
            Star Alliance, oneworld, and SkyTeam, and each one is a club of airlines that cooperate on connections,
            lounges, and loyalty. The practical upshot for a Canadian is simple: the alliance a program belongs to tells
            you which airlines you can book with those points, and some alliances are far easier to reach from Canadian
            cards than others. This guide walks all three, the notable member airlines, and exactly how you get into each
            one with points you can earn here.
          </p>
          <div className="docmeta">
            <span className="gd">TRAVEL &amp; POINTS</span><span className="sep">·</span>
            <span>about 9 min read</span><span className="sep">·</span>
            <span>as of July 2026, alliances and partners change, confirm before you book or transfer</span>
          </div>

          <div className="cd-note">
            <div className="cap">The short answer</div>
            <p style={{ margin: 0 }} className="sub">
              There are three global airline alliances. Star Alliance (Air Canada, United, Lufthansa, ANA, Singapore,
              Turkish, and more) is the strongest for Canadians, reached through Aeroplan, which Amex Membership Rewards
              feeds at 1 to 1. oneworld (American, British Airways, Cathay Pacific, Qatar, Japan Airlines, Qantas, Alaska,
              and more) is reachable through Avios (Amex MR and RBC Avion both transfer to British Airways Avios) and
              through American AAdvantage (RBC Avion on Avion Elite cards). SkyTeam (Air France, KLM, Delta, Korean Air)
              is the thinnest for Canadians, because its programs are not standard partners of the mainstream Canadian
              transferable currencies. Transfers are one-way, so find the award seat first. As of July 2026; alliances,
              partners, and transfer options change, so confirm on the airline or program site before you book or
              transfer.
            </p>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* WHAT */}
          <div id="what" className="cd-sec" style={{ scrollMarginTop: 70 }}>What an alliance is, and why it matters for points</div>
          <p>
            An airline alliance is a formal partnership between a group of airlines. They agree to recognize each
            other&apos;s loyalty status, share lounges, coordinate schedules so connections work, and, crucially for us,
            let their frequent-flyer programs cooperate. The three global alliances are Star Alliance, oneworld, and
            SkyTeam. Most large international airlines belong to one of them, though a few notable carriers sit outside
            all three, and that is worth remembering before you plan.
          </p>
          <p>
            Here is why this matters for points. When you hold miles in one program inside an alliance, you can usually
            book award flights across the whole alliance, not just on that one airline. Aeroplan miles, for example, can
            book a seat on Lufthansa, ANA, or Singapore Airlines, because all of them fly under the Star Alliance
            umbrella. That is the magic: one balance, many airlines. It means you can collect into a single Canadian-
            friendly program and still reach a huge network of routes and cabins around the world.
          </p>
          <div className="cd-note">
            <div className="cap">Alliance membership is not the same as a points partnership</div>
            <p style={{ margin: 0 }} className="sub">
              Two airlines being in the same alliance means you can generally book one using the other&apos;s miles. A
              points partnership is separate: it is whether a specific loyalty program (like Avios) can book a given
              airline, alliance or not. Aer Lingus, for instance, is in no alliance but is an Avios partner, so you can
              still book it with Avios. Always check both the alliance and the direct partnership before you plan.
            </p>
          </div>

          {/* MAP */}
          <div id="map" className="cd-sec" style={{ scrollMarginTop: 70 }}>The three alliances at a glance</div>
          <p>
            Here is the whole picture in one table: each alliance, a few of its notable member airlines, and the
            Canadian currency or program that gets you in. The transfer paths below match our own{" "}
            <Link href="/travel/points-transfer-partners-canada">Canadian points-transfer map</Link>, so they only claim
            routes we can actually verify. Everything is as of July 2026, and alliances and partners do change, so treat
            the table as a starting point and confirm live.
          </p>
          <div className="kv">
            <div className="kvrow">
              <div className="kvk">Star Alliance</div>
              <div className="kvv">
                <strong>Key airlines:</strong> Air Canada, United, Lufthansa, Swiss, Austrian, Brussels, ANA, Singapore
                Airlines, Turkish Airlines, EVA Air. <strong>How Canadians reach it:</strong> Aeroplan (Air Canada&apos;s
                program) is the workhorse, and Amex Membership Rewards transfers to Aeroplan at 1 to 1. Strongest alliance
                for Canadian points.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">oneworld</div>
              <div className="kvv">
                <strong>Key airlines:</strong> American Airlines, British Airways, Cathay Pacific, Qatar Airways, Iberia,
                Finnair, Japan Airlines, Qantas, Alaska Airlines. <strong>How Canadians reach it:</strong> Avios (used by
                British Airways, Iberia, and Qatar, and also an Aer Lingus currency), which Amex MR and RBC Avion both
                transfer to; plus American AAdvantage, reachable from RBC Avion on Avion Elite cards.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">SkyTeam</div>
              <div className="kvv">
                <strong>Key airlines:</strong> Air France, KLM, Delta, Korean Air. <strong>How Canadians reach it:</strong>{" "}
                This is the thin spot. The main SkyTeam programs (Air France-KLM Flying Blue and Delta SkyMiles) are not
                standard partners of the mainstream Canadian transferable currencies, so there is no clean direct
                points route from a Canadian bank or card program. Confirm current partners live.
              </div>
            </div>
          </div>
          <div className="cd-note">
            <div className="cap">Check membership at the source</div>
            <p style={{ margin: 0 }} className="sub">
              Alliance rosters shift over time, so verify who belongs where on the first-party sites before you plan:{" "}
              <a href="https://www.staralliance.com/en/member-airlines" target="_blank" rel="noopener noreferrer">Star Alliance members</a>,{" "}
              <a href="https://www.oneworld.com/members" target="_blank" rel="noopener noreferrer">oneworld members</a>, and{" "}
              <a href="https://www.skyteam.com/en/about/our-members" target="_blank" rel="noopener noreferrer">SkyTeam members</a>. For the main Canadian on-ramp, see{" "}
              <a href="https://www.aircanada.com/ca/en/aco/home/aeroplan.html" target="_blank" rel="noopener noreferrer">Aeroplan</a>. As of July 2026; confirm live, since alliances and partners change.
            </p>
          </div>

          {/* STAR */}
          <div id="star" className="cd-sec" style={{ scrollMarginTop: 70 }}>Star Alliance: the Canadian workhorse</div>
          <p>
            Star Alliance is the biggest of the three and, for a Canadian, by far the easiest to reach. Its members
            include Air Canada, United, Lufthansa, Swiss, Austrian, Brussels Airlines, ANA, Singapore Airlines, Turkish
            Airlines, and EVA Air, among others. That is a network that covers most of the routes a Canadian traveller
            actually wants, from transatlantic hops on Lufthansa or Swiss to long-haul business class on ANA or
            Singapore.
          </p>
          <p>
            The reason Star is the workhorse is Aeroplan, Air Canada&apos;s own loyalty program. Aeroplan can book award
            seats across the entire Star Alliance, and it is a genuinely Canadian program with no big fuel surcharges on
            most partners. On top of that, Amex Membership Rewards transfers to Aeroplan at 1 to 1, usually within
            minutes, which means anyone earning Amex points on a card like the Cobalt, Gold, or Platinum can top up an
            Aeroplan balance and reach the whole alliance. That combination, a strong home program plus an easy 1 to 1
            feed from a flexible currency, is why Star is where most Canadian points journeys begin.
          </p>
          <div className="cd-note">
            <div className="cap">The Canadian path into Star Alliance</div>
            <p style={{ margin: 0 }} className="sub">
              Earn Amex Membership Rewards, transfer to Aeroplan at 1 to 1 once you have found an award seat, and book
              your Star Alliance partner flight through Aeroplan. Aeroplan also earns directly on Air Canada co-branded
              cards. For the specific mechanics and the best redemptions, see our{" "}
              <Link href="/travel/amex-mr-to-aeroplan">Amex MR to Aeroplan</Link> and{" "}
              <Link href="/travel/aeroplan-sweet-spots">Aeroplan sweet spots</Link> guides. As of July 2026; confirm
              memberships and ratios live.
            </p>
          </div>

          {/* ONEWORLD */}
          <div id="oneworld" className="cd-sec" style={{ scrollMarginTop: 70 }}>oneworld: reachable, with a bit of work</div>
          <p>
            oneworld is the second alliance a Canadian can reach without too much trouble, though it takes a little more
            planning than Star. Its members include American Airlines, British Airways, Cathay Pacific, Qatar Airways,
            Iberia, Finnair, Japan Airlines, Qantas, and Alaska Airlines. That lineup includes some of the best premium
            products in the sky, notably Qatar&apos;s Qsuite business class and Cathay Pacific&apos;s long-haul cabins.
          </p>
          <p>
            There are two main Canadian doors into oneworld. The first is Avios, the currency shared by British Airways,
            Iberia, and Qatar (and used by Aer Lingus too, even though Aer Lingus is not in the alliance). Both Amex
            Membership Rewards and RBC Avion transfer to British Airways Avios, generally at a base 1 to 1, and Avios is
            excellent for shorter flights and for surcharge-light partners. The second door is American Airlines
            AAdvantage, which RBC Avion on Avion Elite cards can reach at a base 10 Avion points for 7 miles, a 1 to 0.7
            ratio. AAdvantage is a strong way to book oneworld partners like Qatar and Japan Airlines, and the haircut
            on the transfer is the price of reaching awards you often cannot touch any other way from Canada.
          </p>
          <div className="cd-note">
            <div className="cap">The Canadian paths into oneworld</div>
            <p style={{ margin: 0 }} className="sub">
              Via Avios: transfer Amex Membership Rewards or RBC Avion to British Airways Avios (base 1 to 1), then book a
              oneworld partner. Via AAdvantage: transfer RBC Avion (Avion Elite cards only) to American AAdvantage at a
              base 10 points for 7 miles. See our{" "}
              <Link href="/travel/avios-sweet-spots-rbc-avion-transfer">Avios sweet spots and Avion transfer</Link> guide
              for the details. These are the paths verified on our transfer-partners page as of July 2026; confirm ratios
              live before you move anything.
            </p>
          </div>

          {/* SKYTEAM */}
          <div id="skyteam" className="cd-sec" style={{ scrollMarginTop: 70 }}>SkyTeam: the honest thin spot</div>
          <p>
            SkyTeam is the third global alliance, and for Canadians it is genuinely the hardest to reach with points, so
            it is worth being honest about that rather than inventing a path that does not exist. SkyTeam&apos;s members
            include Air France, KLM, Delta, and Korean Air, all excellent airlines with strong networks into Europe and
            Asia. The problem is not the airlines, it is the on-ramp from Canadian points.
          </p>
          <p>
            The main SkyTeam loyalty programs are Air France-KLM Flying Blue and Delta SkyMiles. Neither is a standard
            transfer partner of the mainstream Canadian transferable currencies (Amex Membership Rewards and RBC Avion)
            in the way Aeroplan and Avios are, and the big-bank programs (TD Rewards, Scene+, CIBC Aventura, BMO Rewards)
            are fixed-value or portal programs that do not transfer to airlines at all. That means there is no clean,
            direct route from a typical Canadian bank or card balance into SkyTeam the way there is for Star and
            oneworld. If reaching SkyTeam matters to you, the realistic options tend to involve programs or cards outside
            the standard Canadian transfer map, so treat this as an area to research carefully and confirm live rather
            than assume.
          </p>
          <div className="cd-note">
            <div className="cap">Being honest about SkyTeam</div>
            <p style={{ margin: 0 }} className="sub">
              We only claim transfer routes we can verify on our own{" "}
              <Link href="/travel/points-transfer-partners-canada">points-transfer map</Link>, and SkyTeam is not on it
              from the mainstream Canadian currencies. So rather than quote a path that might not hold, the honest guidance
              is that SkyTeam is the thinnest alliance for Canadian points collectors today. Programs do add and drop
              partners, so if this changes we will update the transfer map first. As of July 2026; confirm live before you
              plan.
            </p>
          </div>

          {/* NOTES */}
          <div id="notes" className="cd-sec" style={{ scrollMarginTop: 70 }}>Universal notes before you transfer</div>
          <p>
            Whichever alliance you are aiming for, a few rules keep you out of trouble. They apply across every program
            and every transfer, and they are the difference between a great redemption and a pile of stranded points.
          </p>
          <ul>
            <li><strong>One currency, many airlines.</strong> The whole point of an alliance is that a single program (Aeroplan for Star, Avios or AAdvantage for oneworld) can book award seats across the group. Collect into a reachable program and you reach the whole network.</li>
            <li><strong>Transfers are one-way and irreversible.</strong> Once Amex Membership Rewards or RBC Avion points become Aeroplan, Avios, or AAdvantage, they cannot come back. Only ever transfer what you have a concrete plan to use.</li>
            <li><strong>Find the award seat first.</strong> Confirm the specific award flight is bookable on your dates, in the program you plan to book from, before you move a single point.</li>
            <li><strong>Membership is not the same as a partnership.</strong> Some airlines (Aer Lingus, WestJet) sit outside the alliances but may still be bookable with a given currency or not, so check the direct partnership too.</li>
            <li><strong>Alliances, partners, and ratios change.</strong> Airlines join and leave alliances, and programs adjust partners and transfer ratios. Everything here is as of July 2026, so confirm the live details on the airline or program site before you book or transfer.</li>
          </ul>

          <div className="cd-sec">The short version</div>
          <p>
            Three global alliances, three very different stories for a Canadian. Star Alliance is the easy one, reached
            through Aeroplan and fed by Amex Membership Rewards at 1 to 1, and it covers Air Canada, United, Lufthansa,
            ANA, Singapore, Turkish, and more. oneworld takes a bit more work but is very reachable through Avios (Amex MR
            and RBC Avion) and through American AAdvantage (RBC Avion on Avion Elite), unlocking American, British
            Airways, Cathay Pacific, Qatar, Japan Airlines, Qantas, and Alaska. SkyTeam, home to Air France, KLM, Delta,
            and Korean Air, is the honest thin spot, with no clean route from the mainstream Canadian currencies today.
            Know which alliance your target airline sits in, match it to a program you can actually reach, find the seat
            before you transfer, and confirm every detail live. Do that and one balance of points turns into a whole map
            of the world.
          </p>

          {/* FAQ */}
          <div className="cd-sec">Frequently asked questions</div>
          <h4>What is an airline alliance?</h4>
          <p>
            An airline alliance is a group of airlines that agree to cooperate on things like shared lounges,
            connections, and loyalty. The three big global alliances are Star Alliance, oneworld, and SkyTeam. For
            points, the key benefit is that one program inside an alliance usually lets you book award flights on many
            partner airlines and earn or redeem across the group, so a single balance of miles reaches a whole network of
            carriers.
          </p>
          <h4>Which alliance is Air Canada in, and how do Canadians reach it with points?</h4>
          <p>
            Air Canada is in Star Alliance, alongside United, Lufthansa, Swiss, Austrian, Brussels, ANA, Singapore,
            Turkish, and EVA, among others. Canadians reach Star Alliance most easily through Aeroplan, Air Canada&apos;s
            own program. You can also feed Aeroplan from Amex Membership Rewards at 1 to 1, which makes Star the strongest
            alliance for Canadian points collectors. As of July 2026; confirm memberships and ratios live before you book.
          </p>
          <h4>How do Canadians book oneworld flights with points?</h4>
          <p>
            oneworld includes American, British Airways, Cathay Pacific, Qatar, Iberia, Finnair, Japan Airlines, Qantas,
            and Alaska, among others. Canadians reach it mainly through Avios (used by British Airways, Iberia, Aer
            Lingus, and Qatar) and through American Airlines AAdvantage. Amex Membership Rewards and RBC Avion both
            transfer to British Airways Avios, and RBC Avion on Avion Elite cards transfers to American AAdvantage at a
            base 10 points for 7 miles. As of July 2026.
          </p>
          <h4>Can Canadians book SkyTeam flights with credit card points?</h4>
          <p>
            SkyTeam, which includes Air France, KLM, Delta, and Korean Air, is the hardest alliance for Canadians to
            reach with points. Its main loyalty programs, Air France-KLM Flying Blue and Delta SkyMiles, are not standard
            transfer partners of the mainstream Canadian transferable currencies, so there is no clean direct path from a
            Canadian bank or card program into SkyTeam the way there is for Star or oneworld. Confirm current partners
            live, since programs do change.
          </p>
          <h4>Is Aer Lingus in an alliance?</h4>
          <p>
            No. Aer Lingus is not a member of any of the three global alliances, but it is an Avios partner, so you can
            still book Aer Lingus flights using Avios. WestJet is likewise not in a global alliance. Alliance membership
            and points partnerships are two different things, so always check both before you plan.
          </p>
          <h4>Are points transfers into alliance programs reversible?</h4>
          <p>
            No. Transfers from a Canadian currency like Amex Membership Rewards or RBC Avion into an airline program such
            as Aeroplan or Avios are one-way and irreversible. The safe habit is to find and confirm the specific award
            seat first, then transfer only the points that booking needs.
          </p>

          {/* KEEP GOING */}
          <div id="deep" className="cd-sec" style={{ scrollMarginTop: 70 }}>Deep dives and next steps</div>
          <p>
            Once you know which alliance your target airline sits in, the next step is the specific transfer and
            redemption. These walk through the exact mechanics on each Canadian-friendly path.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/travel/points-transfer-partners-canada" className="cd-apply">The Canadian points-transfer map →</Link>
            <Link href="/travel/how-to-book-award-flights-canada" className="cd-apply">How to search for and book award flights →</Link>
            <Link href="/travel/business-class-sweet-spots-canada" className="cd-apply">Business-class sweet spots from Canada →</Link>
            <Link href="/travel/aeroplan-sweet-spots" className="cd-apply">Aeroplan sweet spots →</Link>
            <Link href="/travel/avios-sweet-spots-rbc-avion-transfer" className="cd-apply">Avios sweet spots &amp; Avion transfer →</Link>
            <Link href="/travel/amex-mr-to-aeroplan" className="cd-apply">Amex MR to Aeroplan →</Link>
            <Link href="/cards" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>Browse the cards →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
