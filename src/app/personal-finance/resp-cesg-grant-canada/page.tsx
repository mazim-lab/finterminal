import Link from "next/link";
import { ArticleTags } from "@/components/ArticleTags";
import { ArticleHero } from "@/components/ArticleHero";
import { GrowthMotif } from "@/components/heroes/motifs";
import { notFound } from "next/navigation";
import { isPFPublished } from "@/data/personal-finance";
import { ogMeta } from "@/lib/og";

export const metadata = {
  title: "RESP and the 20% CESG grant: the easiest guaranteed return in Canada | FinTerminal",
  description:
    "The government adds 20 percent to what you put in an RESP, up to $500 a year per child, through the Canada Education Savings Grant. Here is how the grant works, how not to leave money on the table, and how to invest it wisely.",
  ...ogMeta("RESP and the 20% CESG grant: the easiest guaranteed return in Canada", "Personal finance"),
};

export const revalidate = 3600;

const TOC = [
  { id: "headline", label: "How does the CESG grant work?" },
  { id: "limits", label: "How much can I contribute and get?" },
  { id: "catchup", label: "Can I catch up on missed years?" },
  { id: "extras", label: "Extra help for lower income" },
  { id: "plans", label: "Family or individual plan?" },
  { id: "invest", label: "How should I invest it?" },
  { id: "withdrawals", label: "How do I get the money out?" },
  { id: "caveats", label: "The caveats" },
];

const FAQ = [
  {
    q: "How much money does the government add to an RESP?",
    a: "The Canada Education Savings Grant adds 20 percent of what you contribute, on the first $2,500 per child each year. That is up to $500 a year per child. The basic grant has no income test, so families at any income level can collect it.",
  },
  {
    q: "How much should I contribute each year to get the full CESG?",
    a: "Contribute $2,500 per child per year to capture the full $500 grant. Put in less and you get 20 percent of whatever you contribute. Put in more in one year and the extra earns no additional grant that year, though it can still grow tax sheltered.",
  },
  {
    q: "Can I catch up on RESP grant room from missed years?",
    a: "Yes. Unused grant room carries forward, but you can only claim one missed year on top of the current year. That means the most CESG you can collect in a single year is $1,000, on a $5,000 contribution. You cannot wipe out several missed years in one big deposit.",
  },
  {
    q: "What is the lifetime CESG limit per child?",
    a: "The lifetime CESG cap is $7,200 per child. That is separate from the $50,000 lifetime contribution limit, which is your own money. At $500 a year it takes roughly 14 or 15 years of full contributions to reach the $7,200 grant maximum.",
  },
  {
    q: "What happens to the RESP if my child does not go to school?",
    a: "The CESG that was never used goes back to the government. Your own contributions stay yours and come out tax-free. The investment growth becomes an Accumulated Income Payment, taxable as income plus a penalty tax, though you can often move up to $50,000 of it into your RRSP if you have room and the plan qualifies, which avoids the penalty.",
  },
  {
    q: "Is RESP money taxed when it comes out?",
    a: "Your contributions come back tax-free because they are your own capital. The grant and growth are paid as an Educational Assistance Payment, which is taxable in the student's hands, not yours. Because most students have little income and get tuition and personal credits, this money is often taxed very little or not at all.",
  },
];

export default function RespCesgGrantPage() {
  if (!isPFPublished("resp-cesg-grant-canada")) notFound();

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
            <span className="cur">resp-cesg-grant-canada</span>
          </nav>

          <ArticleHero variant="graphic" alt="A rising bar chart with an upward trend line">
            <GrowthMotif />
          </ArticleHero>

          <div className="head"><h1>RESP and the 20% CESG Grant: the Easiest Guaranteed Return in Canada</h1></div>
          <p className="lede">
            There are very few places in personal finance where someone hands you a guaranteed 20 percent return
            with no strings and no risk. The Registered Education Savings Plan is one of them. When you put money
            in for your child, the federal government tops it up by 20 percent through the Canada Education Savings
            Grant, before you have invested a single dollar. If you have a kid and some room in the budget, this is
            usually the first account I would tell a friend to open. Let me walk you through exactly how it works,
            how to avoid leaving free money on the table, and the honest cautions worth knowing.
          </p>
          <div className="docmeta">
            <span className="gd">PERSONAL FINANCE</span><span className="sep">·</span>
            <span>about 9 min read</span><span className="sep">·</span>
            <span>rules and figures change; general info, not advice</span>
          </div>
          <ArticleTags path="/personal-finance/resp-cesg-grant-canada" />

          <div className="cd-note">
            <div className="cap">The short answer</div>
            <p style={{ margin: 0 }} className="sub">
              An RESP is a registered account for a child&apos;s education, and the Canada Education Savings Grant
              (CESG) tops up your contributions by 20 percent. The grant applies to the first $2,500 you put in per
              child each year, so contributing $2,500 captures the full $500 annual grant, up to a lifetime cap of
              $7,200 per child. It is a guaranteed 20 percent return before you invest a dollar, with no income test
              on the basic grant, which is why it is usually the first education account worth opening.
            </p>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* HEADLINE */}
          <div id="headline" className="cd-sec" style={{ scrollMarginTop: 70 }}>How does the CESG grant actually work?</div>
          <p>
            An RESP is a registered account built for one purpose, saving for a child&apos;s education after high
            school. What makes it special is the grant that comes with it. The Canada Education Savings Grant, or
            CESG, adds <strong>20 percent of whatever you contribute</strong>, up to a limit each year.
          </p>
          <p>
            Here is the number that matters. The grant applies to the first <strong>$2,500</strong> you contribute
            per child each year, which means the government adds up to <strong>$500 a year per child</strong>. Put
            in $2,500 and roughly $500 in grant money lands in the account. That is a guaranteed 20 percent return
            before your money has been invested in anything at all, and there is no income test on this basic
            grant, so it is available whether you earn a little or a lot.
          </p>
          <div className="cd-note">
            <div className="cap">The one number to remember</div>
            <p style={{ margin: 0 }} className="sub">
              Contribute $2,500 per child per year and you capture the full $500 CESG. That is the sweet spot most
              families aim for. Contribute less and you get 20 percent of whatever you put in; contribute more in a
              single year and the extra does not earn additional grant that year, though it can still grow tax
              sheltered.
            </p>
          </div>
          <p>
            It is worth pausing on how good this is. There is no ordinary investment that promises you 20 percent
            up front with zero risk. The stock market does not, a savings account does not, nothing does. The CESG
            effectively does, because it is a government match, not a market return. That is why capturing it is
            the single highest-value move most parents can make with education money.
          </p>

          {/* LIMITS */}
          <div id="limits" className="cd-sec" style={{ scrollMarginTop: 70 }}>How much can you put in, and how much grant can you get?</div>
          <p>Two separate ceilings are at play here, and keeping them straight saves a lot of confusion.</p>
          <ul>
            <li><strong>The lifetime CESG cap is $7,200 per child.</strong> That is the most grant money one child can ever receive. At $500 a year, it takes about 14 or 15 years of full contributions to reach it, which is roughly why steady annual contributing from early on works so neatly.</li>
            <li><strong>The lifetime contribution limit is $50,000 per child.</strong> This is your own money, and it is separate from the grant. Notably, there is no annual contribution limit; you could deposit a large sum in one year if you wanted. The catch is that only the first $2,500 in a year earns the 20 percent grant, so front-loading everything at once means walking away from grant money you could have collected by spreading it out.</li>
          </ul>
          <p>
            Put those together and the takeaway is simple. To collect the full $7,200 in grants, you generally
            want to contribute around $2,500 a year for enough years to get there, rather than dumping the whole
            $50,000 in early. The grant rewards patience.
          </p>

          {/* CATCHUP */}
          <div id="catchup" className="cd-sec" style={{ scrollMarginTop: 70 }}>Can you catch up on missed years?</div>
          <p>
            Life happens, and plenty of parents cannot manage $2,500 every single year, especially in the busy,
            expensive early years. The good news is that unused grant room carries forward, so a lean year is not
            gone forever.
          </p>
          <p>
            The rule is that you can claim one year of missed grant on top of the current year. That means the most
            CESG you can collect in a single year is <strong>$1,000</strong>, which takes a contribution of about
            <strong> $5,000</strong> ($2,500 for this year and $2,500 for one prior year). You cannot catch up more
            than one back year at a time, so you cannot wipe out several missed years in one big deposit.
          </p>
          <div className="cd-note">
            <div className="cap">The catch-up ceiling</div>
            <p style={{ margin: 0 }} className="sub">
              Maximum grant in any one year is $1,000, on a $5,000 contribution. If you have several years of unused
              room, you chip away at it a year at a time, catching up one back year annually until you are current.
              This is why starting early, even with small amounts, beats scrambling later.
            </p>
          </div>

          {/* EXTRAS */}
          <div id="extras" className="cd-sec" style={{ scrollMarginTop: 70 }}>Extra help for lower-income families</div>
          <p>
            The 20 percent basic grant is available to everyone, but there are two additional programs aimed at
            families with lower income, and they are genuinely generous. If your household might qualify, these are
            well worth chasing.
          </p>
          <h4>Additional CESG</h4>
          <p>
            On top of the basic 20 percent, families below certain income thresholds receive an extra amount of
            CESG on the first $500 they contribute each year. Depending on your adjusted family net income, that
            adds either 10 or 20 percent more on that first $500. The income brackets are updated annually, so the
            exact cut-offs shift each year, but the principle holds: lower-income families get a bigger match on
            their first dollars in.
          </p>
          <h4>The Canada Learning Bond</h4>
          <p>
            The Canada Learning Bond, or CLB, is the standout, because it requires <strong>no contribution at
            all</strong>. For eligible children from lower-income families, the government deposits money directly
            into an RESP just for opening one. It pays $500 in the first year of eligibility, plus $100 for each
            additional eligible year, up to a lifetime maximum of <strong>$2,000</strong> per child, and there is
            usually a small extra amount to help cover the cost of opening the account.
          </p>
          <p>
            If you qualify for the CLB, opening an RESP is close to a no-brainer, because you can receive $2,000 of
            government money without putting in a cent of your own. Eligibility is based on adjusted family income
            and the number of children in the household, and the thresholds change each year, so check whether you
            qualify rather than assuming you do not.
          </p>

          {/* PLANS */}
          <div id="plans" className="cd-sec" style={{ scrollMarginTop: 70 }}>Should you pick a family plan or an individual plan?</div>
          <p>
            When you open an RESP you choose between an individual plan and a family plan, and for most households
            with more than one child, the family plan is the friendlier choice.
          </p>
          <ul>
            <li><strong>An individual plan</strong> has one beneficiary. Anyone can open one, including for a child they are not related to, and it is the simple option if you have a single child or want fully separate accounts.</li>
            <li><strong>A family plan</strong> can name more than one beneficiary, and the beneficiaries must be connected to you by blood or adoption, such as your own children. Its real advantage is flexibility: contributions and, importantly, the investment growth can be shared among the siblings. If one child does not pursue further education, another sibling can often use the growth in their place, which reduces the risk of stranded money.</li>
          </ul>
          <p>
            One thing does not change between the two, the CESG limits are always per child, not per plan. Each
            beneficiary has their own $7,200 grant cap and $50,000 contribution limit, no matter how the plan is
            structured. The family plan just makes it easier to move the growth around within the family.
          </p>

          {/* INVEST */}
          <div id="invest" className="cd-sec" style={{ scrollMarginTop: 70 }}>How should you invest the money?</div>
          <p>
            Here is a mistake I see often. A parent diligently contributes, captures every dollar of grant, and
            then leaves the whole balance sitting in cash or a low-interest savings option inside the RESP. The
            grant is wonderful, but the account is meant to be invested so the money grows over the many years
            before your child needs it.
          </p>
          <p>
            For a young child with a long runway, a low-cost, broadly diversified approach is the usual fit. Many
            families use a simple portfolio of index ETFs or an all-in-one asset allocation fund, so their
            contributions and grant money compound alongside the market for a decade or more. The long time horizon
            is exactly what lets growth do the heavy lifting.
          </p>
          <div className="cd-note">
            <div className="cap">Glide toward safer holdings near the finish line</div>
            <p style={{ margin: 0 }} className="sub">
              As your child approaches 18 and the first tuition bill, gradually shift the money out of stocks and
              into safer, more stable holdings like high-interest savings, GICs, or short-term bonds. You do not
              want a market drop the year before college to erase gains you cannot wait to recover. The idea is
              simple: grow aggressively when time is long, protect the money when the deadline is near.
            </p>
          </div>

          {/* WITHDRAWALS */}
          <div id="withdrawals" className="cd-sec" style={{ scrollMarginTop: 70 }}>How do you get the money out, and is it taxed?</div>
          <p>
            When your child enrols in an eligible program after high school, the RESP splits into two kinds of
            money on the way out, and they are treated very differently.
          </p>
          <ul>
            <li><strong>Your contributions come back tax-free.</strong> This is your own capital, already taxed once, so the government does not tax it again. It can be paid to you or the student with no tax attached.</li>
            <li><strong>The grant plus growth is an Educational Assistance Payment, or EAP.</strong> This portion, the CESG and all the investment gains, is taxable, but here is the kind part: it is taxed in the <strong>student&apos;s</strong> hands, not yours. Because most students have little or no other income, and thanks to tuition and basic personal credits, this money is often taxed at very little or nothing at all. That is a large part of the RESP&apos;s magic; the growth is effectively shifted to the lowest-taxed person in the family.</li>
          </ul>
          <p>Now for the honest part, the what-if. What happens if the child does not pursue eligible education?</p>
          <ul>
            <li><strong>The grant goes back.</strong> The CESG that was never used is returned to the government. You do not get to keep the match if the education does not happen.</li>
            <li><strong>Your contributions are still yours.</strong> You can withdraw the money you put in, tax-free, as always.</li>
            <li><strong>The growth becomes an Accumulated Income Payment, or AIP.</strong> The investment earnings can be paid to you, but they are taxed as income plus an extra penalty tax on top. The friendlier route, if you qualify, is to move up to $50,000 of that growth into your own RRSP, provided you have the contribution room and the plan meets the conditions. Done that way, you avoid the penalty and keep the money working tax-sheltered.</li>
          </ul>
          <p>
            A family plan softens this risk considerably, because if one child skips further education, the grant
            and growth can often be redirected to a sibling who does go, keeping the money in the family and the
            grant in play.
          </p>

          {/* CAVEATS */}
          <div id="caveats" className="cd-sec" style={{ scrollMarginTop: 70 }}>The honest caveats</div>
          <p>None of these should scare you off, but you deserve the full picture before you commit.</p>
          <ul>
            <li><strong>The grant has an age deadline.</strong> A child can receive CESG only up to the end of the calendar year they turn 17, and the last couple of years have their own rules for teens who are just starting. Starting late means you may not have enough years left to collect the full $7,200, so earlier is genuinely better.</li>
            <li><strong>Do not over-contribute.</strong> Going past the $50,000 lifetime contribution limit per child triggers a monthly penalty tax on the excess. Track your contributions, especially if grandparents or others also chip in for the same child.</li>
            <li><strong>Coordinate with other contributors.</strong> If more than one person opens or funds an RESP for the same child, the limits still apply per child across all plans. A quick family conversation avoids accidentally blowing past the caps.</li>
            <li><strong>Figures and income brackets change.</strong> The dollar amounts here are current at writing, but the additional-CESG income thresholds and CLB eligibility are updated yearly, and program rules can shift. Confirm the current numbers on Canada.ca or with your RESP provider before you rely on them.</li>
            <li><strong>Invest it, do not park it.</strong> The single most common way families shortchange themselves is leaving the balance in cash for years. The grant is the head start; the investing is what turns it into a real tuition fund.</li>
          </ul>
          <div className="cd-note">
            <div className="cap">A friendly reminder</div>
            <p style={{ margin: 0 }} className="sub">
              This is general information to help you understand how the RESP and CESG work, not personalized
              financial advice. The grant rates, contribution limits, income thresholds, and tax rules can change,
              so confirm the current figures with Canada.ca or your RESP provider before you decide. Every family&apos;s
              situation is a little different, and a quick chat with a planner can help you fit this to yours.
            </p>
          </div>
          <p>
            If you take one thing from all of this, let it be the headline: a guaranteed 20 percent, free, on money
            you were going to save for your kid anyway. Open the account, capture the grant, invest it patiently,
            and glide it to safety near the end. Future-you and future-them will both be glad you started.
          </p>

          <div className="cd-sec">Frequently asked questions</div>
          {FAQ.map((f) => (
            <div key={f.q}>
              <h4>{f.q}</h4>
              <p>{f.a}</p>
            </div>
          ))}

          <div className="cd-sec">Keep going</div>
          <p>Once the RESP is humming, it helps to know where your next dollar should go across all your accounts, and how to put any rewards you earn to work too.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/personal-finance" className="cd-apply">More personal finance →</Link>
            <Link href="/cards" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>Browse cards &amp; bonuses →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
