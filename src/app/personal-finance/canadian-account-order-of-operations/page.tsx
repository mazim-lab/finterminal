import Link from "next/link";
import { ArticleTags } from "@/components/ArticleTags";
import { ArticleHero } from "@/components/ArticleHero";
import { GrowthMotif } from "@/components/heroes/motifs";
import { notFound } from "next/navigation";
import { isPFPublished } from "@/data/personal-finance";
import { ogMeta } from "@/lib/og";
import { ArticleSchema } from "@/components/ArticleSchema";
import { Comments } from "@/components/Comments";

export const metadata = {
  title: "Where your next dollar should go: the Canadian account order | FinTerminal",
  description:
    "Employer match, RESP, FHSA, TFSA, RRSP, or taxable? A clear order of operations for where a Canadian should put the next dollar, with the marginal-rate logic that decides when an RRSP beats a TFSA.",
  ...ogMeta("Where your next dollar should go: the Canadian account order", "Personal finance"),
};

export const revalidate = 3600;

const TOC = [
  { id: "why", label: "Why does the order matter?" },
  { id: "waterfall", label: "What is the waterfall?" },
  { id: "tfsa-rrsp", label: "TFSA or RRSP?" },
  { id: "reorder", label: "When should you reorder it?" },
  { id: "caveats", label: "The caveats" },
  { id: "verdict", label: "Is this order for you?" },
];

const FAQ = [
  {
    q: "What is the order of operations for a Canadian's next dollar?",
    a: "The default waterfall is: clear high-interest debt first, then capture any employer match, then the RESP if you have kids, then the FHSA if a first home is on the horizon, then the TFSA, then the RRSP, and finally a non-registered taxable account once your registered room is full. Each dollar fills the highest-value bucket first, then spills into the next.",
  },
  {
    q: "Should I pay off my credit card before investing?",
    a: "Yes, in almost every case. A credit card balance costs you roughly 20 percent or more a year, and paying it off is a guaranteed, tax-free return of that same 20 percent. No investment reliably beats that, and none does it risk-free, so clearing expensive debt comes before everything else.",
  },
  {
    q: "Is the TFSA or RRSP better for me?",
    a: "It depends on your tax rate now versus in retirement. The RRSP tends to win when your rate today is higher than it will be later, because you deduct at a high rate and withdraw at a low one. The TFSA tends to win when your rate is lower now, or when you value tax-free, penalty-free access. If you are torn, splitting between the two is a reasonable hedge.",
  },
  {
    q: "Where does the RESP fit in the order?",
    a: "If you have kids and unused grant room, the RESP ranks very high, just below capturing free money at work. The government adds a 20 percent grant on the first $2,500 you contribute per child each year, up to $500 a year and $7,200 over the child's lifetime. That guaranteed 20 percent top-up beats your own TFSA and RRSP contributions.",
  },
  {
    q: "What are the 2026 contribution limits for these accounts?",
    a: "For 2026 the TFSA annual room is $7,000, the FHSA allows up to $8,000 a year to a lifetime limit of $40,000, and the RRSP lets you contribute 18 percent of last year's earned income up to $33,810, minus any pension adjustment. Limits and grant amounts change, so confirm the current figures before you rely on them.",
  },
  {
    q: "When should I change this order for my own situation?",
    a: "The waterfall is a default, not a law. Build an emergency fund first if you have none, move the FHSA up if a first home is your near-term goal, move the RRSP up if you are a high earner, favour the TFSA if your income is uneven, and treat lower-interest debt like a mortgage with less urgency than a credit card. Your goals and timeline fill in the details.",
  },
];

export default function AccountOrderOfOperationsPage() {
  if (!isPFPublished("canadian-account-order-of-operations")) notFound();

  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }) }} />
          <nav className="crumb">
            <Link href="/">home</Link><span className="sep">/</span>
            <Link href="/personal-finance">personal-finance</Link><span className="sep">/</span>
            <span className="cur">canadian-account-order-of-operations</span>
          </nav>
          <ArticleSchema headline="Where your next dollar should go: the Canadian account order" path="/personal-finance/canadian-account-order-of-operations" kicker="Personal finance" />

          <ArticleHero variant="graphic" alt="A rising bar chart with an upward trend line">
            <GrowthMotif />
          </ArticleHero>

          <div className="head"><h1>Where Your Next Dollar Should Go: The Canadian Account Order</h1></div>
          <p className="lede">
            You have a spare hundred dollars, or a bonus, or a raise that finally gave you a little breathing
            room. Where should it go? Down the credit card? Into the TFSA? The RRSP? An account for the kids?
            It is one of the most common questions in personal finance, and the good news is there is a sensible
            default order that works for most Canadian households. Think of it as a waterfall. Each dollar fills
            the highest-value bucket first, then spills into the next. Let me walk you through that order, explain
            the one piece of logic people find genuinely confusing, and then be honest about when your own life
            should rearrange the whole thing.
          </p>
          <div className="docmeta">
            <span className="gd">PERSONAL FINANCE</span><span className="sep">·</span>
            <span>about 10 min read</span><span className="sep">·</span>
            <span>limits change; general info, not advice</span>
          </div>
          <ArticleTags path="/personal-finance/canadian-account-order-of-operations" />

          <div className="cd-note short">
            <div className="cap">The short answer</div>
            <p style={{ margin: 0 }} className="sub">
              For most Canadian households, send your next dollar down this waterfall in order: clear high-interest
              debt (around 20 percent), then grab any employer match, then the RESP if you have kids, then the FHSA
              if a first home is coming, then the TFSA, then the RRSP, and finally a taxable account once the
              shelters are full. Guaranteed returns come before tax shelters, and the RRSP-versus-TFSA call comes
              down to whether your tax rate is higher now or in retirement. Limits change, so confirm the current
              figures before you act.
            </p>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* WHY */}
          <div id="why" className="cd-sec" style={{ scrollMarginTop: 70 }}>Why does the order matter at all?</div>
          <p>
            Every place you can put a dollar comes with a return, and those returns are not equal. Paying off a
            credit card charging 20 percent is worth far more than earning a few percent in a savings account.
            An employer who matches your retirement contributions is handing you an instant, guaranteed gain that
            no investment can touch. The whole point of an order of operations is to make sure your money goes to
            the highest-return spot available before it moves on to the next.
          </p>
          <p>
            The trick is that the very best returns are often the least exciting. They are guaranteed things:
            debt cleared, free money captured, government grants collected. Only once those are exhausted does it
            make sense to reach for the ordinary work of tax-sheltered investing. Follow the order and you rarely
            leave the easy money on the table, which is the single most common mistake people make.
          </p>

          {/* WATERFALL */}
          <div id="waterfall" className="cd-sec" style={{ scrollMarginTop: 70 }}>What is the waterfall, step by step?</div>
          <p>
            Here is the default sequence. Work down it. When one bucket is full, or does not apply to you, move
            to the next.
          </p>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <div className="st">Clear high-interest debt first</div>
              <p>Before anything else, kill the expensive debt. A credit card balance costs you roughly 20 percent or more a year, and paying it off is a guaranteed, tax-free return of that same 20 percent. No investment reliably beats that, and none does it risk-free. If you are carrying a card balance, a payday loan, or any debt in that punishing range, every spare dollar belongs here until it is gone. This step is not optional and it comes before everything below it.</p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <div className="st">Capture any employer match</div>
              <p>If your workplace matches contributions to a group RRSP or pension, contribute at least enough to grab the full match. This is the closest thing to free money you will ever find. A common arrangement is the employer matching fifty cents or a full dollar for every dollar you put in, which is an instant 50 to 100 percent return before your investments have earned a thing. Turning this down is leaving part of your salary unclaimed. Take the whole match, always.</p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <div className="st">RESP if you have kids</div>
              <p>If you have children, the RESP is extraordinary. The government adds a 20 percent grant, the Canada Education Savings Grant, on the first $2,500 you contribute per child each year, up to $500 a year and $7,200 over the child&apos;s lifetime. A guaranteed 20 percent top-up is the same kind of return as the employer match, so it ranks very high, just below capturing free money at work. If you have kids and unused grant room, this beats your own TFSA and RRSP contributions, since a guaranteed 20 percent match is hard for any investment to top.</p>
            </div>
            <div className="step">
              <div className="num">4</div>
              <div className="st">FHSA if a first home is on the horizon</div>
              <p>The First Home Savings Account is a rare thing that gives you the best of both worlds. Your contribution is tax-deductible now, like an RRSP, and qualifying withdrawals for a first home come out completely tax-free, like a TFSA. You can put in up to $8,000 a year to a lifetime limit of $40,000. If there is any real chance you will buy a first home, this account is hard to beat and usually deserves a spot above the plain TFSA and RRSP. Our <Link href="/personal-finance/fhsa-playbook-canada">FHSA playbook</Link> covers how the room works and how to stack it with the Home Buyers&apos; Plan.</p>
            </div>
            <div className="step">
              <div className="num">5</div>
              <div className="st">TFSA</div>
              <p>Next comes the Tax-Free Savings Account, the workhorse of Canadian investing. The money grows tax-free, withdrawals are tax-free, and taking money out never counts as income, which keeps it from clawing back benefits later. The 2026 annual room is $7,000, and unused room carries forward. Its flexibility is its superpower. Because withdrawals do not trigger tax, the TFSA doubles as long-term savings and a backstop for life&apos;s surprises. For most middle-income Canadians, filling the TFSA is a very high priority.</p>
            </div>
            <div className="step">
              <div className="num">6</div>
              <div className="st">RRSP</div>
              <p>The Registered Retirement Savings Plan gives you a deduction today and taxes the money when you withdraw it in retirement. That makes it most powerful when your income, and therefore your tax rate, is high right now. You can contribute 18 percent of last year&apos;s earned income up to an annual dollar cap, which is $33,810 for 2026, minus any pension adjustment. The higher your current bracket, the more an RRSP contribution is worth, which is exactly the logic we untangle in the next section.</p>
            </div>
            <div className="step">
              <div className="num">7</div>
              <div className="st">Non-registered, once the shelters are full</div>
              <p>When your registered room is genuinely used up, the next dollar goes into a plain taxable account. There is no tax shelter here, so growth and income are taxable each year, but a taxable account is unlimited and completely flexible. This is a good problem to have. It means the tax-advantaged buckets are already doing their job and you are simply investing beyond them.</p>
            </div>
          </div>
          <div className="cd-note">
            <div className="cap">The one idea to hold onto</div>
            <p style={{ margin: 0 }} className="sub">
              Guaranteed returns come first: clearing 20 percent debt, grabbing an employer match, collecting a
              20 percent RESP grant. Only after those are captured do you move into the tax shelters, and even
              there you fill the highest-value account for your situation before the next. Contribution limits and
              grant amounts change, so confirm the current figures before you rely on them.
            </p>
          </div>

          {/* TFSA VS RRSP */}
          <div id="tfsa-rrsp" className="cd-sec" style={{ scrollMarginTop: 70 }}>TFSA or RRSP: which one wins?</div>
          <p>
            This is the part that trips people up, so let me make it as plain as I can. Both accounts shelter your
            growth from tax. The difference is when you pay the tax on the money itself. With an RRSP you skip tax
            now and pay it on withdrawal. With a TFSA you pay tax now, on the way in, and never again.
          </p>
          <p>
            So the whole question comes down to one comparison: is your tax rate higher today, when you put the
            money in, or will it be higher later, when you take it out?
          </p>
          <div className="cd-note">
            <div className="cap">The rule of thumb</div>
            <p style={{ margin: 0 }} className="sub">
              The RRSP tends to win when your tax rate now is higher than it will be in retirement, because you
              deduct at a high rate and withdraw at a low one. The TFSA tends to win when your rate is lower now
              than it will be later, or when you simply value the flexibility of tax-free, penalty-free access.
              Same money, opposite timing.
            </p>
          </div>
          <p>
            A quick picture helps. A high earner in their peak years might deduct an RRSP contribution at a 45
            percent marginal rate, then draw that money in retirement when their income, and their rate, is much
            lower. That gap is pure gain, and the RRSP shines. A younger person early in their career, or anyone
            in a modest bracket, gets a small deduction today and might well be in the same or a higher bracket
            later. For them the TFSA usually makes more sense, and it keeps every dollar of the withdrawal in
            their pocket.
          </p>
          <p>
            There are two softer points worth knowing. First, TFSA withdrawals do not count as income, so they
            will not reduce income-tested benefits like Old Age Security later in life, which is a quiet but real
            advantage. Second, a disciplined saver can reinvest the RRSP tax refund, which sharpens the RRSP&apos;s
            edge, but only if the refund actually goes back to work rather than into a vacation. If you are truly
            torn, splitting between the two is a perfectly reasonable hedge. You do not have to pick a single
            winner for life.
          </p>

          {/* REORDER */}
          <div id="reorder" className="cd-sec" style={{ scrollMarginTop: 70 }}>When should your life reorder the list?</div>
          <p>
            Here is the honest truth about the waterfall: it is a default, not a law. It is a strong starting
            point for a typical household, and then real life rearranges it. A few common situations that
            legitimately shuffle the order:
          </p>
          <ul>
            <li><strong>You have no emergency fund.</strong> Before you invest much of anything, a cushion of a few months of expenses keeps a surprise from becoming a credit card balance. A TFSA can hold that cushion, since you can withdraw it without tax or penalty.</li>
            <li><strong>A first home is your near-term goal.</strong> If a down payment is the priority, the FHSA can jump to the front of the tax-sheltered pack, and pairing it with the RRSP Home Buyers&apos; Plan can stretch your down payment further.</li>
            <li><strong>You are a high earner.</strong> The higher your bracket, the more an RRSP deduction is worth, so the RRSP may deserve to move up ahead of the TFSA for you.</li>
            <li><strong>Your income is uneven or unstable.</strong> If your work is seasonal, contract, or commission-based, the TFSA&apos;s flexibility becomes more valuable, and you might favour it over locking money into an RRSP you may need to tap in a lean year.</li>
            <li><strong>You have children.</strong> The RESP grant is so good that for many families it outranks their own TFSA and RRSP contributions, at least up to the amount that captures the full annual grant.</li>
            <li><strong>You have lower-interest debt.</strong> A mortgage or a student loan at a modest rate does not demand the same urgency as a credit card. Whether to pay it down or invest instead depends on the rate and on how you feel about debt, and reasonable people land in different places.</li>
          </ul>
          <p>
            The framework is there to keep you from making the big, obvious mistakes, like ignoring free money or
            investing while a credit card quietly charges you 20 percent. Within that, your own goals, timeline,
            and temperament fill in the details.
          </p>

          {/* CAVEATS */}
          <div id="caveats" className="cd-sec" style={{ scrollMarginTop: 70 }}>The honest caveats</div>
          <p>A few things deserve real weight before you treat any list as gospel.</p>
          <ul>
            <li><strong>The numbers change.</strong> Contribution limits, grant amounts, and thresholds are updated regularly. The figures here are current for 2026, but confirm the latest before you act on them.</li>
            <li><strong>Your marginal rate is personal.</strong> The TFSA-versus-RRSP call depends on your bracket now and your best guess about retirement, and that guess is genuinely hard. When in doubt, splitting between the two is a sensible hedge rather than a mistake.</li>
            <li><strong>Order is not the same as pace.</strong> This guide is about where each dollar goes, not how fast you should save. Filling these buckets is the work of years, not a single sprint, and slow and steady counts.</li>
            <li><strong>Behaviour beats optimization.</strong> The account you will actually contribute to consistently beats the theoretically optimal one you find too fiddly to use. A simple plan you stick with wins.</li>
            <li><strong>This is education, not advice.</strong> A tricky pension adjustment, a business, a blended family, or a near-term move can all change the answer, and a good fee-for-service planner can be worth every dollar.</li>
          </ul>

          {/* VERDICT */}
          <div id="verdict" className="cd-sec" style={{ scrollMarginTop: 70 }}>So, is this order for you?</div>
          <p>
            For most Canadian households, following the waterfall in order will put nearly every dollar to good
            use: clear the expensive debt, grab the free match, collect the grants, then fill the tax shelter that
            fits your bracket and your plans, and finally invest beyond them in a taxable account. Get that
            sequence roughly right and you have already avoided the mistakes that cost people the most.
          </p>
          <p>
            But your mileage will vary, and that is the point. Debt, a home on the horizon, kids, an uneven
            paycheque, or a high income can all nudge the order around, and none of that means you are doing it
            wrong. Use the list as a map, not a cage. The best version of this plan is the one that matches your
            actual life and that you will genuinely keep following.
          </p>
          <div className="cd-note">
            <div className="cap">A friendly reminder</div>
            <p style={{ margin: 0 }} className="sub">
              This is general information to help you think it through, not personalized financial advice, and the
              limits, grants, and thresholds mentioned here change over time. Confirm the current numbers and, if
              your situation is at all complicated, talk it through with a planner or accountant before you decide.
              The framework is a tool. How you use it depends on how you actually live.
            </p>
          </div>

          <div className="cd-sec">Frequently asked questions</div>
          {FAQ.map((f) => (
            <div key={f.q}>
              <h4>{f.q}</h4>
              <p>{f.a}</p>
            </div>
          ))}

          <div className="cd-sec">Keep going</div>
          <p>Once you know where your dollars should go, the right card can help the everyday spending along the way earn a little something too.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/personal-finance" className="cd-apply">More personal finance →</Link>
            <Link href="/cards" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>Browse cards →</Link>
          </div>
          <Comments path="/personal-finance/canadian-account-order-of-operations" />
        </div>
      </main>
    </div>
  );
}
