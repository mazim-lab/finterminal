import Link from "next/link";
import { notFound } from "next/navigation";
import { isPFPublished } from "@/data/personal-finance";

export const metadata = {
  title: "Points vs cash back: which actually wins for your household — FinTerminal",
  description:
    "Travel points can be worth more per dollar, but only if you redeem them well. Here is the honest cents-per-point threshold where simple, frictionless cash back is the smarter, lower-effort choice for a Canadian household.",
};

export const revalidate = 3600;

const TOC = [
  { id: "tradeoff", label: "The honest tradeoff" },
  { id: "cpp", label: "The cents-per-point math" },
  { id: "example", label: "A worked example" },
  { id: "leak", label: "The quiet leak" },
  { id: "cashback", label: "Lean cash back if" },
  { id: "points", label: "Lean points if" },
  { id: "verdict", label: "Know thyself" },
];

export default function PointsVsCashBackPage() {
  if (!isPFPublished("points-vs-cash-back-canada")) notFound();

  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <nav className="crumb">
            <Link href="/">home</Link><span className="sep">/</span>
            <Link href="/personal-finance">personal-finance</Link><span className="sep">/</span>
            <span className="cur">points-vs-cash-back-canada</span>
          </nav>

          <div className="head"><h1>Points vs Cash Back: Which Actually Wins for Your Household</h1></div>
          <p className="lede">
            This is one of the friendliest arguments in the whole rewards world, and also one of the most
            misunderstood. Travel points can absolutely be worth more per dollar than cash back, sometimes several
            times more. But that extra value is not free. It is paid for in effort, flexibility, and follow
            through, and plenty of good people quietly lose that trade without realizing it. Cash back asks nothing
            of you and can never disappoint you. Let me lay out the real tradeoff, the simple math that settles it,
            and how to figure out honestly which one fits the life you actually live.
          </p>
          <div className="docmeta">
            <span className="gd">PERSONAL FINANCE</span><span className="sep">·</span>
            <span>about 9 min read</span><span className="sep">·</span>
            <span>values change; general info, not advice</span>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* TRADEOFF */}
          <div id="tradeoff" className="cd-sec" style={{ scrollMarginTop: 70 }}>The honest tradeoff</div>
          <p>
            Start with what each reward really is. Cash back is money. It lands in your account or on your
            statement, it is worth exactly one cent per cent, and you can spend it on anything. A good Canadian
            cash-back card returns somewhere in the range of 1 to 4 percent, with a flat everyday rate of around 2
            percent being about the ceiling and richer rates showing up in specific categories like groceries and
            gas. It is simple, guaranteed, and frictionless. There is nothing to learn and nothing to time.
          </p>
          <p>
            Travel points are a currency with a floating exchange rate. A program like Aeroplan is often worth
            somewhere around 1.5 to 2 cents per point on ordinary redemptions, and it can climb to 3, 4, or even 5
            plus cents each when you put them toward the right premium-cabin or partner flight. That is the whole
            allure. Earn points at a card&apos;s stated rate, redeem them cleverly, and you can beat a cash-back
            card by a wide margin. We keep a running view of what different programs are actually worth in{" "}
            <Link href="/how-we-value-points">how we value points</Link>, and the sweet-spot redemptions that push
            the value up in guides like our{" "}
            <Link href="/travel/aeroplan-sweet-spots">Aeroplan sweet spots</Link>.
          </p>
          <p>
            But notice the words doing the heavy lifting there: cleverly, right, sweet spot. Points reward effort,
            flexibility, and good redemptions. Cash back rewards nothing and punishes nothing. The entire debate
            comes down to whether you will reliably do the work that turns points into their higher value, or
            whether that value stays theoretical.
          </p>

          {/* CPP */}
          <div id="cpp" className="cd-sec" style={{ scrollMarginTop: 70 }}>The cents-per-point math that settles it</div>
          <p>
            Here is the framing that cuts through all the noise. A card that earns some number of points per dollar
            only beats a straightforward cash-back card if you actually redeem those points above a certain value
            per point. That value has a name, cents per point, and it is the single number the whole comparison
            turns on.
          </p>
          <p>
            The logic is short. If a card earns a set number of points per dollar spent, multiply that earn rate by
            the value you get per point, and you have the effective return in cents on the dollar. Line that up
            against the cash-back rate you could have earned instead, and the winner is obvious.
          </p>
          <p className="cd-formula">
            // effective return = points earned per dollar × <b>cents-per-point when redeemed</b>
          </p>
          <p>
            So a card earning 2 points per dollar is really earning 2 percent only if each point is worth 1 cent.
            Redeem those same points at 2 cents each and the card is quietly returning 4 percent. Redeem them at
            half a cent, which happens more often than people admit, and it is a 1 percent card wearing a costume.
            The points earn rate on the front of the card tells you almost nothing on its own. The redemption value
            is where the truth lives.
          </p>
          <div className="cd-note">
            <div className="cap">The breakeven, stated plainly</div>
            <p style={{ margin: 0 }} className="sub">
              To find the cents per point where a points card ties a cash-back card, divide the cash-back rate by
              the points earn rate. A 2-points-per-dollar card ties a 2 percent cash-back card at exactly 1 cent
              per point <span className="fld">2% ÷ 2 pts = 1.0¢</span>. Beat that redemption value and points win.
              Fall below it and cash back wins. It really is that clean.
            </p>
          </div>

          {/* EXAMPLE */}
          <div id="example" className="cd-sec" style={{ scrollMarginTop: 70 }}>A worked example, both outcomes</div>
          <p>
            Let me make it concrete with round numbers. Picture two cards for the same $20,000 of annual household
            spending. Card A is a flat 2 percent cash-back card. Card B earns 2 points per dollar in a travel
            program. Which one comes out ahead depends entirely on the cents per point you get when you redeem.
          </p>
          <div className="cd-note">
            <div className="cap">Card A, the cash-back card</div>
            <p style={{ margin: 0 }} className="sub">
              $20,000 spent at 2 percent returns a flat $400. It is guaranteed, it arrives without any effort, and
              it is worth $400 whether you redeem it today or in two years. No thinking required.
            </p>
          </div>
          <div className="cd-note">
            <div className="cap">Card B, the points card</div>
            <p style={{ margin: 0 }} className="sub">
              $20,000 at 2 points per dollar earns 40,000 points. Redeem them at 0.7 cents each, a lazy
              gift-card-style redemption, and they are worth about $280, so cash back wins by $120. Redeem the same
              40,000 points at 2 cents each on a good flight and they are worth about $800, double the cash-back
              card. Redeem at that magic 1 cent breakeven and it is a tie.
            </p>
          </div>
          <p>
            Same spending, same card on paper, and the outcome swings from a clear loss to a clear win based on one
            thing: whether you redeemed above or below 1 cent per point. That is the entire debate in a single
            table. Points do not beat 2 percent cash back automatically. They beat it only when you clear the
            cents-per-point bar, and staying above that bar is a skill, not a given.
          </p>

          {/* LEAK */}
          <div id="leak" className="cd-sec" style={{ scrollMarginTop: 70 }}>The quiet leak nobody talks about: unredeemed points and devaluations</div>
          <p>
            The cents-per-point math assumes you actually redeem your points, and redeem them well. In real life,
            this is where the biggest value quietly drains away, and it is the most important part of this whole
            guide.
          </p>
          <p>
            Two things go wrong. The first is hoarding. Points feel like savings, so people let them pile up,
            waiting for the perfect trip that keeps slipping to next year. A balance you never spend has an
            effective value of zero, no matter how many cents per point it could have fetched. A card earning a
            gorgeous rate returns nothing at all if the points sit untouched.
          </p>
          <p>
            The second is devaluation. Loyalty programs are not banks, and the points are theirs to reprice. A
            program can quietly raise the number of points a flight costs, and every point you were holding just
            became worth a little less. This has happened again and again across airline and hotel programs. The
            general rule of the hobby is to earn and burn, because points held for years tend to lose value, not
            gain it.
          </p>
          <p>
            Put those together and you get the uncomfortable truth. For a lot of households, the effective return
            on a points card is far lower than the brochure suggests, because a chunk of the points are never
            redeemed, are redeemed poorly, or lose value while waiting. Cash back has neither problem. It cannot be
            devalued by anyone, and it never expires unused, because you take it as money and it is always spent.
            That reliability is worth more than most people give it credit for.
          </p>
          <div className="cd-note">
            <div className="cap">The reliability premium</div>
            <p style={{ margin: 0 }} className="sub">
              A guaranteed 2 percent you always collect can easily beat a theoretical 4 percent you collect only
              half the time. When you compare the two rewards, compare what you will realistically capture, not the
              best case on a perfect day.
            </p>
          </div>

          {/* CASHBACK */}
          <div id="cashback" className="cd-sec" style={{ scrollMarginTop: 70 }}>Lean cash back if this sounds like you</div>
          <p>
            Cash back is the right default for more households than the points crowd likes to admit, and choosing it
            is not settling. It is matching the reward to your actual life.
          </p>
          <ul>
            <li><strong>You do not travel much,</strong> or your trips are the kind that points do not help with, like driving to see family. If flights and hotels are rare, the premium value of points has nowhere to land.</li>
            <li><strong>You want simplicity above all.</strong> One card, one rate, money back, done. No transfer partners, no award charts, no watching for sweet spots.</li>
            <li><strong>Your family logistics are already full.</strong> Between work, kids, and everything else, hunting for award availability on flexible dates is one more job you do not want. That is a completely fair choice.</li>
            <li><strong>You know you will not chase redemptions.</strong> Be honest here. If your points would sit in an account for years, cash back captures value you would otherwise leave on the table.</li>
            <li><strong>You value certainty.</strong> A guaranteed return that cannot be devalued is genuinely worth paying a little in headline rate to get.</li>
          </ul>

          {/* POINTS */}
          <div id="points" className="cd-sec" style={{ scrollMarginTop: 70 }}>Lean points if this sounds like you</div>
          <p>
            Points can be the far richer choice, sometimes dramatically so, when you are the kind of person who will
            actually do the work and enjoy it. The upside is real, and for the right household it dwarfs cash back.
          </p>
          <ul>
            <li><strong>You have specific travel goals.</strong> A dream trip in a lie-flat seat, or a family holiday you would happily plan around, is exactly where points shine, because premium redemptions are where the highest cents-per-point values live.</li>
            <li><strong>You are willing to learn the sweet spots.</strong> The gap between an average redemption and a great one is enormous, and it comes down to knowing a handful of good uses. If reading a sweet-spots guide sounds fun rather than tiring, you are in the right camp.</li>
            <li><strong>You have flexible dates.</strong> Award availability rewards flexibility. If you can move a trip by a few days to grab the good seats, you will consistently redeem above the breakeven.</li>
            <li><strong>You will earn and burn.</strong> If you redeem regularly instead of hoarding, you sidestep devaluation and actually collect the value you earned.</li>
          </ul>
          <p>
            If that is you, points are not just competitive, they can be the best deal in the entire rewards world.
            The premium-cabin redemptions that reach 4 or 5 plus cents per point are the reason experienced churners
            lean into travel currencies rather than cash.
          </p>

          {/* VERDICT */}
          <div id="verdict" className="cd-sec" style={{ scrollMarginTop: 70 }}>Know thyself: the best card is the one you will actually use</div>
          <p>
            After all the math, the answer is less about spreadsheets than about self-knowledge. The best rewards
            card is not the one with the highest theoretical value. It is the one whose rewards you will genuinely
            use. A points card you optimize beats a cash-back card. A cash-back card you always redeem beats a
            points card you neglect. The gap between those two outcomes is bigger than the gap between any two cards.
          </p>
          <p>
            So ask yourself the honest questions. Do you travel in a way points can serve? Will you learn a few
            redemption sweet spots, or would you rather not think about it? Will you burn points promptly, or watch
            them pile up? There is no wrong answer, only a right fit. Plenty of thoughtful, money-smart families are
            better off with plain cash back, and plenty of others leave real value on the table by not going deeper
            into points. Match the reward to the person, and you win either way.
          </p>
          <div className="cd-note">
            <div className="cap">A friendly reminder</div>
            <p style={{ margin: 0 }} className="sub">
              This is general information to help you think it through, not personalized financial advice, and the
              point valuations here move over time as programs change their charts. Redemption values are estimates,
              not promises, so check the current numbers before you count on them, and always pay your statement in
              full so interest never erases the rewards on either side of this choice.
            </p>
          </div>

          <div className="cd-sec">Keep going</div>
          <p>Once you know which camp you are in, the next step is finding a card that fits it, whether that is a flat cash-back rate or a travel currency with real sweet spots.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/cards" className="cd-apply">Browse cards →</Link>
            <Link href="/how-we-value-points" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>How we value points →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
