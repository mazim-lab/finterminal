import Link from "next/link";
import { notFound } from "next/navigation";
import { isPFPublished } from "@/data/personal-finance";

export const metadata = {
  title: "Two-player mode: how Canadian couples double their welcome bonuses — FinTerminal",
  description:
    "Two people means two credit profiles, so two full sets of welcome bonuses over time, plus referral points for pointing each other to cards. Here is how a household runs it together without wrecking anyone's credit.",
};

export const revalidate = 3600;

const TOC = [
  { id: "idea", label: "The core idea" },
  { id: "referral", label: "Stacking referrals" },
  { id: "coordinate", label: "Coordinating turns" },
  { id: "authorized", label: "Authorized users" },
  { id: "pooling", label: "Pooling points" },
  { id: "healthy", label: "Keeping it healthy" },
  { id: "caveats", label: "The caveats" },
];

export default function TwoPlayerModePage() {
  if (!isPFPublished("two-player-mode-couples-welcome-bonuses")) notFound();

  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <nav className="crumb">
            <Link href="/">home</Link><span className="sep">/</span>
            <Link href="/personal-finance">personal-finance</Link><span className="sep">/</span>
            <span className="cur">two-player-mode-couples-welcome-bonuses</span>
          </nav>

          <div className="head"><h1>Two-Player Mode: How Canadian Couples Double Their Welcome Bonuses</h1></div>
          <p className="lede">
            If you are chasing credit card welcome bonuses on your own, you are quietly playing on hard mode. A
            couple, or really any two trusted adults sharing a household, has a natural advantage that most people
            never use on purpose. Two people means two separate credit profiles, which means two full sets of
            welcome bonuses on the very same cards over time. Play it as a team and you roughly double your points
            for the same trips and the same everyday spending. Let me walk you through how a household actually
            runs this, calmly and kindly, without anyone feeling rushed or over-extended.
          </p>
          <div className="docmeta">
            <span className="gd">PERSONAL FINANCE</span><span className="sep">·</span>
            <span>about 8 min read</span><span className="sep">·</span>
            <span>offers change; general info, not advice</span>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* IDEA */}
          <div id="idea" className="cd-sec" style={{ scrollMarginTop: 70 }}>The core idea: two people, two sets of bonuses</div>
          <p>
            A welcome bonus is tied to a person, not to a household. Each of you has your own credit file, your own
            application history, and your own eligibility for any given card. So when a card offers a bonus for a
            new cardholder, both of you can earn it, just not always at the same moment. One of you opens the card
            and clears the bonus, then months or a year later the other opens the same card and clears the very
            same bonus. Same product, same trip fund, twice the points.
          </p>
          <p>
            Think of it as taking turns on a shared goal. If a card&apos;s bonus is worth, say, a return flight for
            two, then one partner earning it covers half the goal and the other partner earning it later covers the
            rest. You were going to spend the money on groceries and gas anyway. Two-player mode just makes sure
            both of your credit profiles get credit for it over time.
          </p>
          <div className="cd-note">
            <div className="cap">Why it roughly doubles your haul</div>
            <p style={{ margin: 0 }} className="sub">
              Over a year, a single person can responsibly open only so many cards before their credit needs a
              rest. A household of two has two of those capacities running in parallel. You are not doing anything
              unusual, you are simply letting each person&apos;s eligibility do its normal work instead of leaving
              one profile idle.
            </p>
          </div>

          {/* REFERRAL */}
          <div id="referral" className="cd-sec" style={{ scrollMarginTop: 70 }}>Stacking a referral on top of a bonus</div>
          <p>
            Here is the move that turns doubling into something even better. Several issuers, and American Express
            in Canada is the standout, run a refer-a-friend program. When one cardholder refers another person to a
            card, the referrer earns referral points, and the person who was referred still receives the card&apos;s
            welcome bonus. Nothing is taken away from the newcomer. You are stacking a referral reward on top of a
            full bonus, both landing in your household.
          </p>
          <p>
            The sequence is what makes it click, so let me lay it out plainly.
          </p>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <div className="st">Partner A gets the card first</div>
              <p>One of you applies for the card and earns its welcome bonus in the normal way. Now Partner A is an existing cardholder, which is the only requirement to unlock the referral link.</p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <div className="st">Partner A refers Partner B</div>
              <p>Partner A logs in, generates their personal refer-a-friend link, and sends it to Partner B. Partner B applies through that link rather than through the public page.</p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <div className="st">Both rewards land</div>
              <p>Once Partner B is approved, Partner A receives the referral points, and Partner B still earns the card&apos;s welcome bonus by meeting its minimum spend. Two rewards from one card opening, all inside the household.</p>
            </div>
          </div>
          <p>
            A couple of honest notes on referrals. The offer a friend sees through a referral link can differ from
            the best public offer, sometimes higher, sometimes lower, so it is worth comparing the referral offer
            against whatever is publicly available before Partner B applies. Amex also caps how many referrals one
            person can earn from in a year, and the exact referral amounts and rules change over time, so treat any
            figure as illustrative and confirm the current terms when you actually do it. And of course, referrals
            only make sense when Partner B genuinely wants that card anyway. The referral is a bonus on a good
            decision, never a reason to open a card you would otherwise skip.
          </p>

          {/* COORDINATE */}
          <div id="coordinate" className="cd-sec" style={{ scrollMarginTop: 70 }}>Coordinating your turns</div>
          <p>
            The single biggest mistake households make is treating two-player mode as a race where you both sprint
            at once. That is how you end up with two large minimum spends due in the same month and a tight cash
            flow that tempts you to carry a balance. The whole strategy quietly falls apart the moment you pay a
            cent of interest. So the real skill here is pacing, not speed.
          </p>
          <p>
            Two simple rules of thumb keep it comfortable.
          </p>
          <ul>
            <li><strong>Stagger the minimum spends.</strong> Try not to have both partners chasing a large first-few-months spend at the same time. If Partner A is in the middle of clearing a bonus, let them finish and pay it off before Partner B starts theirs. That way each big spend lines up with money you already have, rather than forcing you to float two at once.</li>
            <li><strong>Take turns so credit can recover.</strong> Every application nudges a credit score down a little and adds a fresh account. Alternating who applies gives each person&apos;s profile time to settle between cards, which keeps approvals smooth and scores healthy. Think of it as one person resting while the other plays a round.</li>
          </ul>
          <div className="cd-note">
            <div className="cap">A gentle cadence beats a sprint</div>
            <p style={{ margin: 0 }} className="sub">
              A relaxed rhythm of one bonus at a time, handed back and forth between the two of you, earns just as
              many points over a year as trying to do everything at once, and it does so without cash-flow stress
              or a bruised credit score. Slower here really is richer.
            </p>
          </div>

          {/* AUTHORIZED */}
          <div id="authorized" className="cd-sec" style={{ scrollMarginTop: 70 }}>Authorized users: helpful, but not a bonus</div>
          <p>
            This is the part where people most often get their hopes up, so let me be clear and save you the
            disappointment. Adding your partner as an authorized user, sometimes called a supplementary
            cardholder, does <strong>not</strong> normally earn them a separate welcome bonus. The bonus belongs to
            the primary applicant who opened the account. A supplementary card is a second card on the same
            account, not a new account of its own.
          </p>
          <p>
            That does not mean supplementary cards are useless, they just do a different job. They can be genuinely
            handy for a few things:
          </p>
          <ul>
            <li><strong>Pooling spend toward a goal.</strong> When both of you put purchases on the same account, you reach a minimum spend or an annual spend threshold faster, since every dollar counts on the one card.</li>
            <li><strong>Sharing perks.</strong> Some premium cards extend certain benefits, like lounge access or travel coverage, to supplementary cardholders, which can be worth more than a small annual fee for the extra card.</li>
            <li><strong>Simple everyday convenience.</strong> Two cards on one account can just make household spending tidier.</li>
          </ul>
          <p>
            So use supplementary cards for perks and for pooling spend, but do not expect a welcome bonus from
            them. If a bonus is what you are after, the other person needs to open their own card as a primary
            applicant. That distinction is the whole point of two-player mode.
          </p>

          {/* POOLING */}
          <div id="pooling" className="cd-sec" style={{ scrollMarginTop: 70 }}>Pooling your points for one trip</div>
          <p>
            Earning two sets of points is only half the fun. The other half is bringing them together so they can
            fund a single trip for the family. Plenty of Canadian programs let members of a household share or
            transfer points, which means a bonus that landed in one partner&apos;s account can still help book the
            other partner&apos;s seat.
          </p>
          <p>
            The clearest example is <strong>Aeroplan Family Sharing</strong>. Air Canada lets a group of verified
            family members combine their Aeroplan points into a shared balance that any member with redemption
            privileges can spend. Spouses and partners, children, siblings, parents, and even in-laws and
            grandparents can join the same pool, up to a set number of people. So the points from Partner A&apos;s
            welcome bonus and Partner B&apos;s welcome bonus can sit in one shared balance and book flights for the
            whole family together. There are eligibility and timing rules to satisfy, such as minimum membership
            periods before you can join or leave a pool, so read the current terms before you set it up.
          </p>
          <p>
            Aeroplan is not the only program with household features, and some flexible bank points can be moved
            between partners or into a shared travel program too. The details differ by program and change over
            time, so the habit to build is simple: before you chase a bonus, check whether that program lets a
            household combine points, because a bonus you can pool is worth far more than one stranded in the wrong
            account.
          </p>

          {/* HEALTHY */}
          <div id="healthy" className="cd-sec" style={{ scrollMarginTop: 70 }}>Keeping it healthy for both of you</div>
          <p>
            Two-player mode works beautifully when it is built on the same habits that make any points strategy
            safe. Here is what keeps it a joy rather than a source of friction.
          </p>
          <ul>
            <li><strong>Pay every statement in full.</strong> This is the foundation. Credit card interest runs high enough to erase any bonus several times over. If a bonus tempts you toward spending you cannot clear, the answer is to slow down, not to carry a balance.</li>
            <li><strong>Watch each person&apos;s credit score.</strong> Keep a light eye on both profiles, not just one. If either score dips more than you are comfortable with, pause new applications for that person and let it recover. There is no deadline you need to beat.</li>
            <li><strong>Communicate openly.</strong> Decide together who is applying for what and when. A shared note or spreadsheet of who has which card, which bonus is in progress, and when annual fees hit keeps you both on the same page and prevents surprises.</li>
            <li><strong>Think ahead about whose points are whose.</strong> Points and cards are held in individual names. It is worth a calm, honest conversation about how you would handle those balances if circumstances ever changed. Deciding this while everything is happy is far easier than sorting it out later, and it is simply the grown-up way to run shared finances.</li>
          </ul>

          {/* CAVEATS */}
          <div id="caveats" className="cd-sec" style={{ scrollMarginTop: 70 }}>The honest caveats</div>
          <p>
            Two-player mode is powerful, but it is not for everyone, and it deserves a few straight words before
            you dive in.
          </p>
          <p>
            First, this is a strategy for an organised, trusting household. It relies on both people paying in full,
            keeping notes, and being honest with each other about spending and scores. If money is a source of
            tension between you, adding coordinated credit card applications will not help, and that is a perfectly
            fair reason to keep things simple instead.
          </p>
          <p>
            Second, it is never a licence to overspend. The points are a reward for spending you were already going
            to do. The moment you buy things you do not need in order to hit a bonus, or open a card just for a
            referral, the math turns against you and the whole benefit evaporates. Manufactured pressure to spend
            is the opposite of a healthy plan.
          </p>
          <p>
            Third, it genuinely doubles the admin. Two people means twice the applications to track, twice the
            minimum spends to time, twice the annual fees to remember, and twice the statements to pay. Some
            households find that satisfying and some find it a chore. Be honest about which one you are, because the
            best strategy is always the one you will actually keep up with calmly.
          </p>
          <div className="cd-note">
            <div className="cap">A friendly reminder</div>
            <p style={{ margin: 0 }} className="sub">
              This is general information to help two people think through playing as a team, not personalized
              financial advice, and all of the specifics, the referral amounts, the bonus offers, and the program
              rules for sharing points, change over time. Confirm the current terms with each issuer and program
              before you act, pay every statement in full, and only reach for this when both of you are genuinely on
              board.
            </p>
          </div>

          <div className="cd-sec">Keep going</div>
          <p>The natural next step is picking which cards to pass back and forth between the two of you, and lining up their welcome bonuses.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/cards" className="cd-apply">Browse cards &amp; bonuses →</Link>
            <Link href="/personal-finance" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>More personal finance →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
