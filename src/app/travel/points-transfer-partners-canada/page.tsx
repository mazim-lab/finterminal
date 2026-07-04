import Link from "next/link";
import { ArticleTags } from "@/components/ArticleTags";

export const metadata = {
  title: "The Canadian points-transfer map: which points actually transfer, and where | FinTerminal",
  description:
    "A plain-English map of Canadian rewards currencies: which points genuinely transfer to airline and hotel loyalty programs (essentially Amex Membership Rewards and RBC Avion) and which big-bank programs are fixed-value or portal programs instead. Verified partners and ratios as of July 2026.",
};

const TOC = [
  { id: "trap", label: "The trap: transfer means two different things" },
  { id: "map", label: "The transfer map at a glance" },
  { id: "amex", label: "Amex Membership Rewards partners" },
  { id: "avion", label: "RBC Avion Rewards partners" },
  { id: "fixed", label: "TD, Scene+, Aventura and BMO: what they really are" },
  { id: "cautions", label: "Universal cautions before any transfer" },
  { id: "deep", label: "Deep dives by program" },
];

export default function PointsTransferPartnersCanadaPage() {
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
                    name: "Which Canadian credit card points transfer to airlines?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "In Canada, the two currencies that genuinely transfer into airline and hotel loyalty programs are American Express Membership Rewards and RBC Avion Rewards (on Avion Elite cards). Amex MR moves to partners like Air Canada Aeroplan and British Airways Avios, generally at 1 to 1. RBC Avion moves to British Airways Avios at 1 to 1 and American Airlines AAdvantage at 10 points for 7 miles, among a short list. The other big-bank programs are mostly fixed-value or travel-portal programs, not airline-transfer currencies.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I transfer TD Rewards, Scene+, CIBC Aventura or BMO Rewards to airlines?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Not in the way people mean by transfer. TD Rewards, Scotiabank Scene+, CIBC Aventura and BMO Rewards are primarily fixed-value or travel-portal programs. You redeem the points against a travel booking, or through the program's own award chart in the case of Aventura, rather than converting them into a stack of Aeroplan or Avios you then book with. They are useful, they just work differently, so treat their points as a set number of dollars off travel, not as a transferable airline currency.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the Amex Membership Rewards to Aeroplan ratio in Canada?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Amex Membership Rewards transfers to Air Canada Aeroplan at 1 to 1, so 30,000 MR points become 30,000 Aeroplan points, usually within minutes. British Airways Avios is also 1 to 1. A minimum of 1,000 points applies and transfers move in 100-point increments. Ratios and partners change, so confirm the live figure in your Amex account before you move anything. As of July 2026.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the RBC Avion to British Airways and American Airlines ratio?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "On Avion Elite cards, RBC Avion transfers to British Airways Avios at a base 1 to 1 with a 10,000-point minimum, and to American Airlines AAdvantage at a base 10 Avion points for 7 miles (a 1 to 0.7 ratio) with a 5,000-point minimum. RBC also lists Cathay Pacific Asia Miles and WestJet as conversion partners; confirm those live ratios in Avion Rewards. RBC runs periodic transfer bonuses that improve the math. As of July 2026.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are points transfers reversible?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. Every transfer covered here is one-way and irreversible. Once your Membership Rewards or Avion points become Aeroplan, Avios, AAdvantage or Asia Miles, you cannot convert them back. That is why the golden rule is to find and confirm the award seat first, then transfer only the points that booking needs.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Should I wait for a transfer bonus?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "If your trip is flexible, yes. Both Amex and RBC periodically run limited-time transfer bonuses that add roughly 15 to 35 percent to a given partner, which meaningfully softens a ratio like Avion to AAdvantage. But a bonus only helps if you were going to use the points and the award seat is still there. Never transfer against a seat you have not confirmed just to catch a promo.",
                    },
                  },
                ],
              }),
            }}
          />
          <nav className="crumb">
            <Link href="/">home</Link><span className="sep">/</span>
            <Link href="/travel">travel</Link><span className="sep">/</span>
            <span className="cur">points-transfer-partners-canada</span>
          </nav>

          <div className="head"><h1>The Canadian Points-Transfer Map</h1></div>
          <p className="lede">
            There is a quiet trap in Canadian points that catches almost everyone at least once. You read that some
            program has &ldquo;transfer partners,&rdquo; you assume yours does too, and you plan a trip around points that
            were never going to turn into airline miles. So let us clear it up. In Canada, the currencies that genuinely
            transfer into airline and hotel loyalty programs are essentially two: American Express Membership Rewards
            and RBC Avion Rewards. The big-bank programs you have probably heard of, TD Rewards, Scene+, CIBC Aventura,
            and BMO Rewards, are a different animal, and this guide draws the whole map so you know which points do what.
          </p>
          <div className="docmeta">
            <span className="gd">TRAVEL &amp; POINTS</span><span className="sep">·</span>
            <span>about 9 min read</span><span className="sep">·</span>
            <span>as of July 2026, ratios and partners change, confirm before you transfer</span>
          </div>
          <ArticleTags path="/travel/points-transfer-partners-canada" />

          <div className="cd-note">
            <div className="cap">The short answer</div>
            <p style={{ margin: 0 }} className="sub">
              In Canada, the points that actually transfer to airline and hotel loyalty programs are essentially Amex
              Membership Rewards and RBC Avion Rewards (on Avion Elite cards). Amex MR moves to Air Canada Aeroplan and
              British Airways Avios at 1 to 1, among others. RBC Avion moves to British Airways Avios at a base 1 to 1
              and to American Airlines AAdvantage at 10 points for 7 miles, plus a couple more. TD Rewards, Scene+,
              CIBC Aventura and BMO Rewards are mostly fixed-value or travel-portal programs, so &ldquo;transfer&rdquo;
              means something different: you spend the points against a booking, you do not convert them into airline
              miles. Transfers are one-way, so find the award seat first. As of July 2026; transfer partners and ratios
              change, so confirm on the program&apos;s own site before you transfer, and transfers are usually one-way
              and irreversible.
            </p>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* TRAP */}
          <div id="trap" className="cd-sec" style={{ scrollMarginTop: 70 }}>The trap: transfer means two different things</div>
          <p>
            The word &ldquo;transfer&rdquo; gets used loosely in Canadian points, and the looseness is exactly what
            trips people up. In the classic, valuable sense, a transfer means moving your bank or card points into a
            separate airline or hotel loyalty program, where they become that program&apos;s own miles or points and get
            booked under that program&apos;s award rules. That is how you unlock a business-class seat that would cost a
            fortune in cash. Only a couple of Canadian currencies do this.
          </p>
          <p>
            In the looser sense, plenty of programs let you &ldquo;use points toward travel,&rdquo; which usually means
            redeeming them at a fixed cents-per-point value against a flight or hotel you book through the program&apos;s
            portal, or against a charge on your statement. That is genuinely useful and often the right call for most
            people, but it is not the same thing, and it does not give you access to the sweet spots that make points
            people so excited. Keeping these two ideas separate is the single most important habit in Canadian points.
          </p>
          <div className="cd-note">
            <div className="cap">The test to apply</div>
            <p style={{ margin: 0 }} className="sub">
              Ask one question of any program: can I move these points into a separate airline or hotel program and book
              under that program&apos;s award chart? If yes, you hold a transferable currency (Amex MR or RBC Avion in
              Canada). If the only option is to spend the points against a travel booking at a set value, you hold a
              fixed-value or portal currency. Both are fine. They are just not interchangeable.
            </p>
          </div>

          {/* MAP */}
          <div id="map" className="cd-sec" style={{ scrollMarginTop: 70 }}>The transfer map at a glance</div>
          <p>
            Here is the whole Canadian landscape in one table. The verified ratios are the ones each program publishes
            on its own site as of July 2026; where a ratio moves around or I could not cleanly confirm the current
            number, it says so rather than guessing.
          </p>
          <div className="kv">
            <div className="kvrow">
              <div className="kvk">Amex Membership Rewards (Canada)</div>
              <div className="kvv">
                <strong>Transferable to loyalty programs.</strong> Moves to airline and hotel partners. Verified: Air
                Canada Aeroplan 1 to 1, British Airways Avios 1 to 1. Minimum 1,000 points, in 100-point increments.
                Earned on Amex Cobalt, Gold, and Platinum cards.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">RBC Avion Rewards (Avion Elite)</div>
              <div className="kvv">
                <strong>Transferable to loyalty programs.</strong> Verified: British Airways Avios base 1 to 1 (minimum
                10,000), American Airlines AAdvantage base 10 points for 7 miles, a 1 to 0.7 ratio (minimum 5,000). Also
                lists Cathay Pacific Asia Miles and WestJet as partners; confirm those live ratios in Avion Rewards. Only
                Avion Elite cards can transfer.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">TD Rewards</div>
              <div className="kvv">
                <strong>Fixed-value / travel portal.</strong> Redeem points against travel booked through the TD portal
                (and some other redemptions) at a set value. Not an airline-transfer currency; you do not convert TD
                Rewards into Aeroplan or Avios.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Scotiabank Scene+</div>
              <div className="kvv">
                <strong>Fixed-value / broad redemption.</strong> Points redeem at a set value toward travel booked
                through Scene+, plus dining, groceries at participating stores, entertainment, and statement credits.
                Not an airline-transfer currency.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">CIBC Aventura</div>
              <div className="kvv">
                <strong>Own award chart / travel portal.</strong> Book flights through the CIBC Rewards Centre, either on
                Aventura&apos;s own fixed award chart (points plus taxes and fees) or against paid travel at a set value.
                It is not a transfer-to-airline currency; you book within CIBC&apos;s program, you do not move points into
                Aeroplan or Avios.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">BMO Rewards</div>
              <div className="kvv">
                <strong>Fixed-value / travel portal.</strong> Redeem points against travel you book through BMO, and
                other options like statement credits, at a set value. Not an airline-transfer currency.
              </div>
            </div>
          </div>
          <div className="cd-note">
            <div className="cap">Why only two transfer to loyalty programs</div>
            <p style={{ margin: 0 }} className="sub">
              It is easy to assume every bank program works like the big American transferable currencies. In Canada it
              does not shake out that way. Amex Membership Rewards and RBC Avion are the two that maintain airline and
              hotel transfer partnerships. Everyone else built a fixed-value or portal model instead, which is simpler
              to use and harder to mess up, but does not reach the transfer sweet spots.
            </p>
          </div>

          {/* AMEX */}
          <div id="amex" className="cd-sec" style={{ scrollMarginTop: 70 }}>Amex Membership Rewards partners</div>
          <p>
            American Express Membership Rewards is the most flexible transferable currency a Canadian can hold. You earn
            it on cards like the Amex Cobalt, the Gold Rewards Card, and the Platinum Card, and from a full-MR card you
            can move points into a range of airline and hotel loyalty partners. The two that matter most for Canadians,
            and the two I have verified at 1 to 1 as of July 2026, are Air Canada Aeroplan and British Airways Avios.
          </p>
          <p>
            Aeroplan at 1 to 1 is the workhorse. It is instant most of the time, it opens up Star Alliance awards, and
            Air Canada does not pass along the big fuel surcharges that plague some programs. British Airways Avios,
            also 1 to 1, is your route into distance-based short-haul awards and surcharge-light partners like Qatar.
            Amex maintains other partners too, and the exact list shifts over time as programs are added or dropped, so
            the reliable move is to open the transfer page in your own Amex account and read the current partners and
            ratios there before you plan.
          </p>
          <div className="cd-note">
            <div className="cap">Partner lists change, so check the source</div>
            <p style={{ margin: 0 }} className="sub">
              Amex Canada adjusts its Membership Rewards partner roster from time to time (partners get added and dropped,
              and one example is that Etihad Guest stopped being a Canadian MR transfer partner in 2026). Aeroplan and
              British Airways Avios at 1 to 1 are the anchors verified here as of July 2026. For any other partner or
              ratio, confirm it live on the Amex Membership Rewards transfer page in your account, because a stale figure
              is worse than no figure when the transfer is irreversible.
            </p>
          </div>

          {/* AVION */}
          <div id="avion" className="cd-sec" style={{ scrollMarginTop: 70 }}>RBC Avion Rewards partners</div>
          <p>
            RBC Avion Rewards is the other genuinely transferable Canadian currency, with one big asterisk: only Avion
            Elite points can transfer to airline partners. Those are the points earned on the premium Avion-branded
            credit cards, such as the RBC Avion Visa Infinite and Visa Infinite Privilege. Points earned on no-fee or
            lower-tier RBC cards like the ION and ION+ cannot make the airline jump, so check which points you actually
            hold before you build a plan.
          </p>
          <p>
            From Avion Elite, the partners I have verified as of July 2026 are British Airways Avios at a base 1 to 1
            (with a 10,000-point minimum) and American Airlines AAdvantage at a base 10 Avion points for 7 miles, which
            is a 1 to 0.7 ratio (with a 5,000-point minimum). AAdvantage losing 30 percent of your points count is the
            cost of reaching awards you cannot otherwise touch from Canada, and it only pays off when the award on the
            far side is priced well. RBC also lists Cathay Pacific Asia Miles and WestJet as conversion partners. The
            Asia Miles and WestJet ratios move around and I would not want to quote a stale number, so confirm those
            live in Avion Rewards before you count on them.
          </p>
          <div className="cd-note">
            <div className="cap">Watch for the transfer bonus</div>
            <p style={{ margin: 0 }} className="sub">
              RBC runs periodic transfer bonuses that meaningfully improve a partner ratio for a limited window. Recent
              examples include bonuses to British Airways Avios and to American Airlines AAdvantage. A bonus turns a
              rough ratio like Avion to AAdvantage into something closer to fair, so if your trip is flexible it is worth
              holding your points until one appears. Just never wait past an award seat you have already found.
            </p>
          </div>

          {/* FIXED */}
          <div id="fixed" className="cd-sec" style={{ scrollMarginTop: 70 }}>TD, Scene+, Aventura and BMO: what they really are</div>
          <p>
            None of these four are airline-transfer currencies, and it would be misleading to invent airline
            &ldquo;transfer partners&rdquo; for them, so here is an honest description of what each one actually does.
            The common thread is that you spend the points inside the program at a set value, rather than converting them
            into a separate loyalty currency you book with elsewhere.
          </p>
          <ul>
            <li><strong>TD Rewards.</strong> A travel-portal and fixed-value program. You mainly redeem points against travel you book through TD, at a set redemption value, along with some other redemption options. There is no conversion of TD Rewards into Aeroplan, Avios, or any airline loyalty balance.</li>
            <li><strong>Scotiabank Scene+.</strong> A broad fixed-value program shared with Cineplex and Empire. Points redeem at a set value toward travel booked through Scene+, plus dining, entertainment, groceries at participating stores, and statement credits. Flexible and easy, but not an airline currency you transfer.</li>
            <li><strong>CIBC Aventura.</strong> The closest to feeling like a travel program, because it has its own award chart. You book flights through the CIBC Rewards Centre, either on Aventura&apos;s fixed points-plus-taxes chart or by redeeming against paid travel at a set value. Crucially, you book within CIBC&apos;s own program. You do not move Aventura points into an airline&apos;s account and book under that airline&apos;s rules.</li>
            <li><strong>BMO Rewards.</strong> A travel-portal and fixed-value program. Points redeem at a set value against travel you book through BMO, and toward other options like statement credits. Again, no airline transfer.</li>
          </ul>
          <p>
            None of this makes them bad. For a lot of people, a fixed-value program that quietly knocks a set number of
            dollars off any flight is exactly the right, low-stress choice, and it sidesteps award-seat hunting
            entirely. The point is simply to hold them for what they are. Treat their points as dollars off travel, plan
            around that value, and you will never be caught expecting an airline transfer that was never on the menu.
          </p>

          {/* CAUTIONS */}
          <div id="cautions" className="cd-sec" style={{ scrollMarginTop: 70 }}>Universal cautions before any transfer</div>
          <p>
            Whichever transferable currency you hold, the same handful of rules keep you out of trouble. They are boring,
            and they are also the difference between a great redemption and a pile of stranded points.
          </p>
          <ul>
            <li><strong>Transfers are one-way and irreversible.</strong> Once MR or Avion points become Aeroplan, Avios, AAdvantage, or Asia Miles, they cannot come back. Only ever transfer what you have a concrete plan to use.</li>
            <li><strong>Find the award seat first.</strong> Confirm the actual award flight is bookable on your dates, in the program you plan to book from, before you move a single point. Points are easy to transfer and impossible to untransfer.</li>
            <li><strong>Ratios and partners change.</strong> Programs add and drop partners and adjust ratios without much warning. Everything here is as of July 2026, so confirm the live number on the program&apos;s own site before you commit.</li>
            <li><strong>Watch for transfer bonuses.</strong> Both Amex and RBC run limited-time bonuses that add roughly 15 to 35 percent to a partner. If your travel is flexible, waiting for one stretches your points. If you have already found the seat, book it and do not gamble on a promo.</li>
            <li><strong>Mind minimums and increments.</strong> Each partner has a minimum transfer and moves in set blocks. Avion to Avios starts at 10,000 and Avion to AAdvantage at 5,000, for example. Make sure your balance clears the floor before you plan the redemption.</li>
          </ul>

          <div className="cd-sec">The short version</div>
          <p>
            The Canadian transfer map is smaller than it looks. Two currencies, Amex Membership Rewards and RBC Avion
            Rewards, genuinely move into airline and hotel loyalty programs, and those are the ones that reach the
            sweet spots. Amex MR anchors on Aeroplan and Avios at 1 to 1. Avion Elite reaches Avios at 1 to 1 and
            AAdvantage at 1 to 0.7, with a couple more partners to confirm live. TD Rewards, Scene+, CIBC Aventura, and
            BMO Rewards are fixed-value or portal programs that you spend against travel, not airline currencies you
            transfer. Know which bucket your points sit in, find the seat before you move anything, and confirm every
            ratio on the source before you pull the trigger. Do that and Canadian points reward you instead of surprising
            you.
          </p>

          {/* FAQ */}
          <div className="cd-sec">Frequently asked questions</div>
          <h4>Which Canadian credit card points transfer to airlines?</h4>
          <p>
            In Canada, the two currencies that genuinely transfer into airline and hotel loyalty programs are American
            Express Membership Rewards and RBC Avion Rewards (on Avion Elite cards). Amex MR moves to partners like Air
            Canada Aeroplan and British Airways Avios, generally at 1 to 1. RBC Avion moves to British Airways Avios at
            1 to 1 and American Airlines AAdvantage at 10 points for 7 miles, among a short list. The other big-bank
            programs are mostly fixed-value or travel-portal programs, not airline-transfer currencies.
          </p>
          <h4>Can I transfer TD Rewards, Scene+, CIBC Aventura or BMO Rewards to airlines?</h4>
          <p>
            Not in the way people mean by transfer. TD Rewards, Scotiabank Scene+, CIBC Aventura, and BMO Rewards are
            primarily fixed-value or travel-portal programs. You redeem the points against a travel booking, or through
            the program&apos;s own award chart in the case of Aventura, rather than converting them into a stack of
            Aeroplan or Avios you then book with. They are useful, they just work differently, so treat their points as
            a set number of dollars off travel, not as a transferable airline currency.
          </p>
          <h4>What is the Amex Membership Rewards to Aeroplan ratio in Canada?</h4>
          <p>
            Amex Membership Rewards transfers to Air Canada Aeroplan at 1 to 1, so 30,000 MR points become 30,000
            Aeroplan points, usually within minutes. British Airways Avios is also 1 to 1. A minimum of 1,000 points
            applies and transfers move in 100-point increments. Ratios and partners change, so confirm the live figure
            in your Amex account before you move anything. As of July 2026.
          </p>
          <h4>What is the RBC Avion to British Airways and American Airlines ratio?</h4>
          <p>
            On Avion Elite cards, RBC Avion transfers to British Airways Avios at a base 1 to 1 with a 10,000-point
            minimum, and to American Airlines AAdvantage at a base 10 Avion points for 7 miles (a 1 to 0.7 ratio) with a
            5,000-point minimum. RBC also lists Cathay Pacific Asia Miles and WestJet as conversion partners; confirm
            those live ratios in Avion Rewards. RBC runs periodic transfer bonuses that improve the math. As of July
            2026.
          </p>
          <h4>Are points transfers reversible?</h4>
          <p>
            No. Every transfer covered here is one-way and irreversible. Once your Membership Rewards or Avion points
            become Aeroplan, Avios, AAdvantage, or Asia Miles, you cannot convert them back. That is why the golden rule
            is to find and confirm the award seat first, then transfer only the points that booking needs.
          </p>
          <h4>Should I wait for a transfer bonus?</h4>
          <p>
            If your trip is flexible, yes. Both Amex and RBC periodically run limited-time transfer bonuses that add
            roughly 15 to 35 percent to a given partner, which meaningfully softens a ratio like Avion to AAdvantage.
            But a bonus only helps if you were going to use the points and the award seat is still there. Never transfer
            against a seat you have not confirmed just to catch a promo.
          </p>

          {/* KEEP GOING */}
          <div id="deep" className="cd-sec" style={{ scrollMarginTop: 70 }}>Deep dives by program</div>
          <p>
            Once you know which points transfer where, the next step is the specific redemption. These walk through the
            exact mechanics and the sweet spots on each currency.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/travel/amex-mr-to-aeroplan" className="cd-apply">Amex MR to Aeroplan →</Link>
            <Link href="/travel/rbc-avion-to-aadvantage" className="cd-apply">RBC Avion to AAdvantage →</Link>
            <Link href="/travel/avios-sweet-spots-rbc-avion-transfer" className="cd-apply">Avios sweet spots &amp; Avion transfer →</Link>
            <Link href="/travel/aeroplan-sweet-spots" className="cd-apply">Aeroplan sweet spots →</Link>
            <Link href="/travel/business-class-sweet-spots-canada" className="cd-apply">Business-class sweet spots from Canada →</Link>
            <Link href="/travel/how-to-book-award-flights-canada" className="cd-apply">How to search for and book award flights →</Link>
            <Link href="/travel/airline-alliances-guide-canada" className="cd-apply">The airline alliance guide for Canadians →</Link>
            <Link href="/cards" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>Browse the cards →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
