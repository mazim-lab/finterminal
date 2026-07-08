import Link from "next/link";
import { ArticleTags } from "@/components/ArticleTags";
import { ArticleHero } from "@/components/ArticleHero";
import { GrowthMotif } from "@/components/heroes/motifs";
import { isPFPublished } from "@/data/personal-finance";
import { ogMeta } from "@/lib/og";
import { ArticleSchema } from "@/components/ArticleSchema";
import { Comments } from "@/components/Comments";

export const metadata = {
  title: "FHSA vs the RRSP Home Buyers' Plan: which to use for a first home | FinTerminal",
  description:
    "A plain-language head-to-head on funding a first home in Canada. The FHSA gives a tax-free withdrawal you never repay; the Home Buyers' Plan is a loan from your own RRSP you repay over 15 years. Which to prioritize, and how to use both. General info as of July 2026, not advice.",
  ...ogMeta("FHSA vs the RRSP Home Buyers' Plan: which to use for a first home", "Personal finance"),
};

export const revalidate = 3600;

const TOC = [
  { id: "short", label: "The short answer" },
  { id: "difference", label: "The one difference that decides it" },
  { id: "numbers", label: "The limits, side by side" },
  { id: "deduction", label: "The deduction angle" },
  { id: "repayment", label: "How HBP repayment actually works" },
  { id: "priority", label: "Why the FHSA usually goes first" },
  { id: "both", label: "Stacking both for a bigger down payment" },
  { id: "qualify", label: "First-time buyer and the qualifying withdrawal" },
  { id: "who", label: "Who each one suits" },
  { id: "faq", label: "Frequently asked questions" },
];

const FAQ = [
  {
    q: "Should I use the FHSA or the Home Buyers' Plan first?",
    a: "For most first-time buyers, fill the FHSA first. A qualifying FHSA withdrawal for a first home is completely tax-free and you never repay it, so it is genuinely free money out the door on top of the deduction you already got going in. The Home Buyers' Plan is different: it lets you pull money out of your own RRSP, but you have to put it back over 15 years, and any year you miss the required repayment, that amount gets added to your taxable income. So the usual order is FHSA to the top, then the HBP as a top-up if you need a bigger down payment. Both are separate programs, so you are allowed to use them on the same home.",
  },
  {
    q: "Do I have to repay an FHSA withdrawal like I do the HBP?",
    a: "No, and this is the whole point of the comparison. A qualifying FHSA withdrawal for a first home comes out tax-free and there is nothing to repay. The Home Buyers' Plan is a loan from your future self: you withdraw from your RRSP now and repay it back into your RRSP over 15 years. If you skip a required annual repayment, the amount you were supposed to repay is added to your income for that year and taxed. So the FHSA is the cleaner tool, and the HBP is useful but comes with strings.",
  },
  {
    q: "How much can I take out under each program?",
    a: "The FHSA lets you contribute up to $8,000 a year and $40,000 over your lifetime, and a qualifying withdrawal can take out up to the full balance, contributions plus any growth, tax-free. The Home Buyers' Plan lets a first-time buyer withdraw up to $60,000 from an RRSP, a limit that was raised from $35,000 for withdrawals made after April 16, 2024. Confirm the current figures with the CRA before you plan around them, since these numbers change.",
  },
  {
    q: "Can a couple combine the FHSA and the HBP?",
    a: "Yes, and this is where the numbers get large. Both accounts are per person, so if each partner is an eligible first-time buyer, each can have their own FHSA and each can make their own HBP withdrawal. Two people who have each maxed an FHSA and can each draw the full HBP amount can assemble a substantial down payment from registered money alone. The exact total depends on how much each of you has actually saved and your RRSP balances, so run your own numbers rather than assuming the headline maximums.",
  },
  {
    q: "Is there really a grace period before HBP repayments start?",
    a: "There is a temporary one. Normally your 15-year HBP repayment period starts the second year after the year you made your first withdrawal. As temporary relief, for participants whose first withdrawal falls between January 1, 2022 and December 31, 2025, the start of the repayment period is deferred by an extra three years, so repayments begin in the fifth year after the year of that first withdrawal. This is a time-limited rule, so check the current wording on canada.ca for your own withdrawal year before you count on it.",
  },
  {
    q: "Am I a first-time buyer for these accounts?",
    a: "Both programs use a similar test built around not having owned and lived in your own home recently. For the FHSA, you are treated as a first-time buyer if you did not, in the current calendar year (aside from the 30 days right before the withdrawal) or in the previous four calendar years, live in a qualifying home as your principal residence that you owned or jointly owned. The four-year lookback is more forgiving than people expect, so a past owner who has been renting for a while may qualify again. Check the precise CRA definition for your situation, since the wording matters.",
  },
  {
    q: "What if I never end up buying a home?",
    a: "The two accounts behave very differently here. If you never buy, your FHSA can be transferred tax-free into your RRSP or a RRIF without using any RRSP room, so it effectively becomes bonus retirement savings you already got a deduction for. The HBP question does not really arise the same way, because you only take an HBP withdrawal once you are actually buying. If you take an HBP withdrawal and the purchase falls through, there are specific cancellation rules, so check those with the CRA. For the full FHSA mechanics, see our FHSA playbook.",
  },
];

export default function FHSAvsHBPPage() {
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
                mainEntity: FAQ.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
          <nav className="crumb">
            <Link href="/">home</Link><span className="sep">/</span>
            <Link href="/personal-finance">personal-finance</Link><span className="sep">/</span>
            <span className="cur">fhsa-vs-rrsp-home-buyers-plan</span>
          </nav>
          <ArticleSchema headline="FHSA vs the RRSP Home Buyers' Plan: which to use for a first home" path="/personal-finance/fhsa-vs-rrsp-home-buyers-plan" kicker="Personal finance" />

          <ArticleHero variant="graphic" alt="A rising bar chart with an upward trend line">
            <GrowthMotif />
          </ArticleHero>

          <div className="head"><h1>FHSA vs the RRSP Home Buyers&apos; Plan: Which to Use for a First Home</h1></div>
          <p className="lede">
            If you are saving for a first home in Canada, you have two registered tools built for exactly that, and
            people constantly mix them up. The First Home Savings Account and the RRSP Home Buyers&apos; Plan both let
            you throw registered money at a down payment, but they are not two versions of the same thing. One hands you
            a tax-free withdrawal you never pay back. The other lends you money out of your own retirement savings that
            you are on the hook to repay over 15 years. That single difference decides which one you should lean on
            first, and once you see it clearly, the whole thing gets a lot easier to plan. This is a focused head-to-head
            on funding the purchase itself. If you want the full mechanics of the FHSA, our{" "}
            {isPFPublished("fhsa-playbook-canada") ? (
              <Link href="/personal-finance/fhsa-playbook-canada">FHSA playbook</Link>
            ) : (
              "FHSA playbook"
            )}{" "}
            goes deep on the account itself.
          </p>
          <div className="docmeta">
            <span className="gd">PERSONAL FINANCE</span><span className="sep">·</span>
            <span>about 10 min read</span><span className="sep">·</span>
            <span>General info as of July 2026; rules and limits change, not advice</span>
          </div>
          <ArticleTags path="/personal-finance/fhsa-vs-rrsp-home-buyers-plan" />

          <div className="cd-note short">
            <div className="cap">The short answer</div>
            <p style={{ margin: 0 }} className="sub">
              Use the FHSA first. A qualifying FHSA withdrawal for a first home is tax-free and you never repay it, on
              top of the deduction you got going in, so nothing else touches your down payment as kindly. The Home
              Buyers&apos; Plan is a loan from your own RRSP: you can pull out up to $60,000, but you must repay it into
              your RRSP over 15 years, and any missed repayment is added to your taxable income. For most first-time
              buyers the play is simple. Fill the FHSA, then use the HBP as a top-up if you need more, and because they
              are separate programs you can use both on the same home. Confirm current limits with the CRA before you
              plan.
            </p>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* DIFFERENCE */}
          <div id="difference" className="cd-sec" style={{ scrollMarginTop: 70 }}>The one difference that decides it</div>
          <p>
            Almost everything that matters here comes down to one line: the FHSA withdrawal is a gift, and the Home
            Buyers&apos; Plan withdrawal is a loan. Get that straight and the rest follows.
          </p>
          <ul>
            <li>
              <strong>FHSA: tax-free, and never repaid.</strong> When you meet the qualifying withdrawal conditions and
              take money out of your FHSA to buy a first home, the withdrawal is completely tax-free, both your
              contributions and any growth, and there is nothing to pay back. The money leaves the account and it is
              simply yours.
            </li>
            <li>
              <strong>HBP: a loan from your own RRSP.</strong> The Home Buyers&apos; Plan lets you withdraw from your
              RRSP without immediate tax, but only on the promise that you put it back. You repay it into your RRSP over
              15 years, and if in any year you do not make the required repayment, that shortfall is added to your income
              and taxed that year.
            </li>
          </ul>
          <div className="cd-note">
            <div className="cap">Say it plainly</div>
            <p style={{ margin: 0 }} className="sub">
              The FHSA gives you money you keep. The HBP gives you access to money you already had, on the condition you
              give it back to yourself on schedule. Both are useful, but they are not equal, and that is why the FHSA is
              almost always the first dollar you spend and the HBP is the second.
            </p>
          </div>

          {/* NUMBERS */}
          <div id="numbers" className="cd-sec" style={{ scrollMarginTop: 70 }}>The limits, side by side</div>
          <p>
            Here are the numbers that matter for each program, verified against the CRA as of July 2026. Limits change,
            so treat these as the current figures and confirm before you plan around them.
          </p>
          <div className="kv" style={{ marginTop: 10 }}>
            <div className="kvrow">
              <div className="kvk">FHSA (First Home Savings Account)</div>
              <div className="kvv">
                <strong>Contribution limit:</strong> $8,000 per year, $40,000 lifetime.{" "}
                <strong>Withdrawal:</strong> a qualifying withdrawal can take out up to the full balance, contributions
                plus growth, tax-free. <strong>Repayment:</strong> none, ever. <strong>Tax going in:</strong> contributions
                are deductible, like an RRSP. See the{" "}
                {isPFPublished("fhsa-playbook-canada") ? (
                  <Link href="/personal-finance/fhsa-playbook-canada">FHSA playbook</Link>
                ) : (
                  "FHSA playbook"
                )}{" "}
                for the deep mechanics.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">HBP (RRSP Home Buyers&apos; Plan)</div>
              <div className="kvv">
                <strong>Withdrawal limit:</strong> up to $60,000 per person, raised from $35,000 for withdrawals made
                after April 16, 2024. <strong>Source of funds:</strong> your own RRSP.{" "}
                <strong>Repayment:</strong> repaid into your RRSP over 15 years, or the missed amount is added to your
                income. <strong>Deduction:</strong> you got the RRSP deduction when you originally contributed, not on
                the withdrawal.
              </div>
            </div>
          </div>
          <div className="cd-note">
            <div className="cap">Per person, so a couple doubles up</div>
            <p style={{ margin: 0 }} className="sub">
              Both limits are per individual. If you and a partner are each eligible first-time buyers, each of you can
              run your own FHSA and each of you can make your own HBP withdrawal, which is how two people assemble a
              genuinely large down payment from registered money. What you can actually pull depends on what you have
              saved, not the headline maximums.
            </p>
          </div>

          {/* DEDUCTION */}
          <div id="deduction" className="cd-sec" style={{ scrollMarginTop: 70 }}>The deduction angle</div>
          <p>
            People often assume the two accounts are a wash on tax because both involve a deduction somewhere. They are
            not, and this is the second reason the FHSA wins on the merits.
          </p>
          <p>
            With an RRSP, you got a deduction when you first contributed, which lowered your taxable income that year.
            But the RRSP is a tax-deferred account: the money is meant to be taxed on the way out in retirement. The Home
            Buyers&apos; Plan does not change that. It just lets you borrow the money out early and put it back, so the
            deduction you claimed years ago is the only tax break the HBP itself gives you. There is no second benefit
            for using the HBP.
          </p>
          <p>
            The FHSA is the only account that gives you both breaks on the same dollar. Your contribution is deductible
            going in, exactly like an RRSP, and the qualifying withdrawal for a first home comes out tax-free, exactly
            like a TFSA. Deduction on the way in, tax-free on the way out. Nothing else in the Canadian system does both
            at once, which is why, when you have room in both, the FHSA dollar is worth more than the HBP dollar.
          </p>
          <div className="cd-note">
            <div className="cap">The tidy way to think about it</div>
            <p style={{ margin: 0 }} className="sub">
              FHSA: deduction going in, tax-free coming out, no repayment. HBP: you already used your deduction years
              ago, and now you are borrowing tax-deferred money that you have to repay. Same idea of funding a home with
              registered money, very different value.
            </p>
          </div>

          {/* REPAYMENT */}
          <div id="repayment" className="cd-sec" style={{ scrollMarginTop: 70 }}>How HBP repayment actually works</div>
          <p>
            The repayment obligation is the part of the Home Buyers&apos; Plan that catches people off guard, so it is
            worth walking through carefully. This is where the loan nature of the HBP becomes real.
          </p>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <div className="st">You get 15 years to repay</div>
              <p>
                Once repayment begins, you owe roughly one-fifteenth of the amount you withdrew back into your RRSP each
                year, for up to 15 years. You can always repay more in a year to get ahead, but you cannot repay less
                than the required minimum without a consequence.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <div className="st">There is a temporary grace-period extension</div>
              <p>
                Normally your repayment period starts the second year after the year of your first withdrawal. As
                temporary relief, if your first withdrawal falls between January 1, 2022 and December 31, 2025, the start
                is pushed back by three extra years, so repayments begin in the fifth year after the year of that
                withdrawal. This is a time-limited rule, so verify the exact treatment for your own withdrawal year on
                canada.ca.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <div className="st">Miss a repayment and it becomes taxable income</div>
              <p>
                If you do not make your required repayment in a given year, that shortfall is not forgiven. It is added
                to your income for that year and taxed at your marginal rate, and it does not go back into your RRSP.
                That is the real cost of treating the HBP casually, and it is exactly the risk the FHSA does not carry.
              </p>
            </div>
          </div>
          <div className="cd-note">
            <div className="cap">Why this matters for your budget</div>
            <p style={{ margin: 0 }} className="sub">
              An HBP withdrawal quietly adds a small annual commitment to your finances for years after you buy, right
              when a new mortgage and the costs of a home are already stretching you. It is manageable and plenty of
              people use it well, but it is not free, and pretending it is would not be honest. Plan the repayment into
              your budget before you rely on the HBP.
            </p>
          </div>

          {/* PRIORITY */}
          <div id="priority" className="cd-sec" style={{ scrollMarginTop: 70 }}>Why the FHSA usually goes first</div>
          <p>
            Put the two side by side and the priority order almost writes itself for a typical first-time buyer. The FHSA
            gives you a deduction and a tax-free withdrawal and asks nothing in return. The HBP gives you access to money
            you already had and then asks for it back, on a schedule, with a tax penalty for slipping. When one tool is
            strictly kinder, you use it first.
          </p>
          <p>
            So the general playbook is to build up your FHSA and use it to the extent you can, then reach for the Home
            Buyers&apos; Plan only if you still need more for the down payment you want. The HBP becomes the top-up, not
            the foundation. There are exceptions, and the next sections cover who each suits, but for most people, most of
            the time, the FHSA leads.
          </p>
          <p>
            One honest caveat: the FHSA only helps if you have actually funded it. Room does not build up before you open
            the account, so if a purchase is close and your FHSA is thin, an HBP withdrawal from an already-funded RRSP
            may be the larger lever you have on hand. That is a reason to open and feed an FHSA early, which our{" "}
            {isPFPublished("fhsa-playbook-canada") ? (
              <Link href="/personal-finance/fhsa-playbook-canada">FHSA playbook</Link>
            ) : (
              "FHSA playbook"
            )}{" "}
            makes the case for in detail.
          </p>

          {/* BOTH */}
          <div id="both" className="cd-sec" style={{ scrollMarginTop: 70 }}>Stacking both for a bigger down payment</div>
          <p>
            You do not have to choose. The FHSA and the Home Buyers&apos; Plan are separate programs with separate rules,
            so you can use both on the same first home. That is how you assemble a large down payment out of registered
            money, and for couples the totals can be striking.
          </p>
          <p>
            Picture one person who has fully funded an FHSA and also has RRSP savings. They can take their tax-free FHSA
            withdrawal and layer an HBP withdrawal from their RRSP on top of it for the same purchase. Now picture a
            couple where each partner does the same. Because both accounts are per person, the two of you effectively
            double every number: two FHSAs and two HBP withdrawals, all pointed at one home. What you can actually pull
            depends on your real balances, not the maximums, so add up what each of you has rather than assuming the top
            figures.
          </p>
          <div className="cd-note">
            <div className="cap">The sensible stacking order</div>
            <p style={{ margin: 0 }} className="sub">
              Spend the FHSA first because it is tax-free with no repayment, then add an HBP withdrawal only for the
              amount you still need. That keeps your repayment obligation as small as it can be while still getting you to
              the down payment you are aiming for. If you are also weighing this against other savings goals, our{" "}
              {isPFPublished("canadian-account-order-of-operations") ? (
                <Link href="/personal-finance/canadian-account-order-of-operations">account order guide</Link>
              ) : (
                "account order guide"
              )}{" "}
              covers where each dollar
              should go.
            </p>
          </div>

          {/* QUALIFY */}
          <div id="qualify" className="cd-sec" style={{ scrollMarginTop: 70 }}>First-time buyer and the qualifying withdrawal</div>
          <p>
            Both programs are built for first-time buyers, and both use a similar test that hinges on not having owned and
            lived in your own home recently. This is a high-level view, so check the precise CRA wording for your
            situation, since the details can decide whether you qualify.
          </p>
          <ul>
            <li>
              <strong>The four-year lookback.</strong> For the FHSA, you count as a first-time buyer if you did not, in
              the current calendar year (setting aside the 30 days right before the withdrawal) or in the previous four
              calendar years, live in a qualifying home as your principal residence that you owned or jointly owned. The
              HBP uses a comparable first-time-buyer test. That four-year window is more forgiving than people assume, so
              a former owner who has been renting for a while can often qualify again.
            </li>
            <li>
              <strong>The qualifying withdrawal conditions.</strong> To pull FHSA money out tax-free, you generally need
              to be a first-time buyer, have a written agreement to buy or build a qualifying home, and intend to live in
              it as your principal residence within the required timeframe. The HBP has its own set of conditions around
              buying or building a qualifying home. Meet the conditions and the FHSA withdrawal is tax-free; the HBP
              withdrawal avoids immediate tax but still has to be repaid.
            </li>
          </ul>
          <p>
            The takeaway is not to memorize every clause but to check them before you commit. Confirm you meet the
            first-time-buyer test and the qualifying withdrawal conditions with the CRA or your institution, because
            getting a detail wrong can turn a tax-free withdrawal into a taxable one.
          </p>

          {/* WHO */}
          <div id="who" className="cd-sec" style={{ scrollMarginTop: 70 }}>Who each one suits</div>
          <p>
            The order is not identical for everyone. Here is a quick read on who leans which way, keeping in mind that for
            most people the answer is simply both, FHSA first.
          </p>
          <div className="kv" style={{ marginTop: 10 }}>
            <div className="kvrow">
              <div className="kvk">Lead with the FHSA if</div>
              <div className="kvv">
                you are early enough to open and fund one before you buy, you want the cleanest tax outcome, and you would
                rather not carry a repayment obligation into your first years of home ownership. This is most first-time
                buyers.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Lean more on the HBP if</div>
              <div className="kvv">
                your purchase is close and your FHSA is not funded yet, but you already have meaningful RRSP savings you
                can borrow against. The HBP lets you use money you have now, as long as you are comfortable with the
                15-year repayment.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Use both if</div>
              <div className="kvv">
                you want the largest down payment you can build from registered money, or you are a couple who can each
                run both accounts. Fill the FHSA, then top up with the HBP for the rest.
              </div>
            </div>
          </div>
          <div className="cd-note">
            <div className="cap">A friendly reminder</div>
            <p style={{ margin: 0 }} className="sub">
              This is general information to help you compare the two programs, not personalized financial or tax advice,
              and the limits, eligibility rules, and repayment terms do change. Confirm the current numbers with the CRA
              or your financial institution before you act, and if your situation is complicated, an hour with a
              fee-for-service planner or an accountant is money well spent.
            </p>
          </div>

          {/* FAQ */}
          <div id="faq" className="cd-sec" style={{ scrollMarginTop: 70 }}>Frequently asked questions</div>
          {FAQ.map((f) => (
            <div key={f.q}>
              <h4>{f.q}</h4>
              <p>{f.a}</p>
            </div>
          ))}

          <div className="cd-sec">Keep going</div>
          <p>
            The FHSA versus HBP question is really one piece of a bigger plan: how you fund a first home, and where every
            saved dollar should go before then. The guides below carry the deeper mechanics and the broader order of
            operations.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            {isPFPublished("fhsa-playbook-canada") && (
              <Link href="/personal-finance/fhsa-playbook-canada" className="cd-apply">
                The FHSA playbook &rarr;
              </Link>
            )}
            {isPFPublished("canadian-account-order-of-operations") && (
              <Link href="/personal-finance/canadian-account-order-of-operations" className="cd-apply">
                What order to fund your accounts &rarr;
              </Link>
            )}
            <Link href="/personal-finance" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>
              More personal finance &rarr;
            </Link>
          </div>
          <Comments path="/personal-finance/fhsa-vs-rrsp-home-buyers-plan" />
        </div>
      </main>
    </div>
  );
}
