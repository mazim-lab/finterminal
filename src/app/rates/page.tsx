import Link from "next/link";

export const metadata = {
  title: "Best rates in Canada: savings, GICs, and chequing | FinTerminal",
  description:
    "A simple hub for the best rates in Canada. Where to find live high-interest savings rates, GIC rates by term, and chequing account bonuses, plus a quick framework for how to think about parking your cash. General info as of July 2026, not advice.",
};

export const revalidate = 3600;

export default function RatesHubPage() {
  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <nav className="crumb">
            <Link href="/">home</Link><span className="sep">/</span>
            <span className="cur">rates</span>
          </nav>

          <div className="head"><h1>Best Rates in Canada: Savings, GICs, and Chequing</h1></div>
          <p className="lede">
            This is your jumping-off point for the best rates in Canada. Instead of scattering the numbers across a dozen
            pages, we keep the live figures on a few focused resources and use this hub to send you to the right one for
            the job in front of you. Whether you are hunting for a higher yield on your emergency fund, locking in a rate
            for a down payment you will spend on a known date, or chasing a cash bonus for opening a new account, the four
            pages below carry the current numbers. First, a quick word on how to think about where your cash should live,
            because the highest advertised rate is rarely the whole story.
          </p>
          <div className="docmeta">
            <span className="gd">RATES</span><span className="sep">·</span>
            <span>hub</span><span className="sep">·</span>
            <span>General info as of July 2026; rules and limits change, not advice</span>
          </div>

          <div className="cd-note">
            <div className="cap">How to think about parking cash</div>
            <p style={{ margin: 0 }} className="sub">
              Three things decide where your cash should sit, and yield is only one of them. Liquidity is whether you can
              get at the money when you need it: an emergency fund has to stay liquid, so a savings account beats a locked
              GIC no matter what the rate says. Yield is the rate itself, and it usually rises the longer you can commit,
              which is why a known-date goal can accept a locked term for a better number. Insurance is your safety net:
              deposits at a CDIC member are covered up to $100,000 per category per member (credit unions use provincial
              coverage instead), while a cash ETF held in a brokerage is generally not a CDIC-insured deposit. Match the
              vehicle to the job first, then chase the rate. The pages below have the live numbers.
            </p>
          </div>

          <div className="cd-sec">The rate pages</div>
          <p>
            Each of these keeps its own live figures and updates on its own schedule, so treat them as the source of truth
            for the current numbers rather than anything you read here.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/personal-finance/best-savings-account-rates-canada" className="cd-apply">
              Best high-interest savings rates &rarr;
            </Link>
            <Link href="/personal-finance/best-gic-rates-canada" className="cd-apply">
              Best GIC rates by term &rarr;
            </Link>
            <Link href="/personal-finance/best-chequing-account-bonuses-canada" className="cd-apply">
              Best chequing account bonuses &rarr;
            </Link>
            <Link href="/personal-finance/where-to-hold-cash-canada" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>
              Where to hold your cash (the framework) &rarr;
            </Link>
          </div>

          <ul>
            <li>
              <strong>Best high-interest savings rates:</strong> variable rates you can withdraw from any time, ideal for an
              emergency fund or any short-term cash. Fully liquid and, at a CDIC member, insured.{" "}
              <Link href="/personal-finance/best-savings-account-rates-canada">See the live savings rates</Link>.
            </li>
            <li>
              <strong>Best GIC rates by term:</strong> a fixed, guaranteed rate in exchange for locking the money up for a
              set term. Best for a known-date goal like a down payment, and laddering lets you keep some maturing along the
              way. <Link href="/personal-finance/best-gic-rates-canada">See the live GIC rates</Link>.
            </li>
            <li>
              <strong>Best chequing account bonuses:</strong> cash welcome offers for opening and setting up a new chequing
              account, which is a different kind of return than a rate but often worth more up front.{" "}
              <Link href="/personal-finance/best-chequing-account-bonuses-canada">See the current bonuses</Link>.
            </li>
            <li>
              <strong>Where to hold your cash:</strong> the full decision guide that ties it all together, matching each pot
              of money to the right home based on your goal and time horizon.{" "}
              <Link href="/personal-finance/where-to-hold-cash-canada">Read the framework</Link>.
            </li>
          </ul>

          <div className="cd-sec">Rates move with the Bank of Canada</div>
          <p>
            One thing worth keeping in the back of your mind: savings and GIC rates are not fixed features of a bank, they
            move with the Bank of Canada's overnight rate. When the central bank raises or cuts, savings rates and new GIC
            offers tend to follow, sometimes quickly and sometimes with a lag. That is why we do not pin specific
            per-provider numbers on this hub. As of July 2026 the overnight rate sits at 2.25 percent and everyday
            high-interest savings rates were broadly in the mid-2 percent range, but that is a snapshot, not a promise.
            Always confirm the live figure on the linked page before you move money, and confirm current limits or product
            rules with the provider or the CRA where they matter to you.
          </p>

          <div className="cd-note">
            <div className="cap">A quick honest note</div>
            <p style={{ margin: 0 }} className="sub">
              A slightly higher savings rate is nice, but it rarely moves the needle as much as getting the basics right:
              keeping your emergency fund liquid, not locking money you might need, and using registered room so the
              interest is not taxed away. This is general information, not personal financial or tax advice, and everyone's
              situation differs, so check with a professional for your own case.
            </p>
          </div>

          <div className="cd-sec">Keep going</div>
          <p>
            Pick the page that matches what you are doing right now. Liquid cash goes to savings, known-date money goes to a
            GIC, a new account might come with a bonus, and the framework page helps you decide when you are not sure.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/personal-finance/best-savings-account-rates-canada" className="cd-apply">
              Best high-interest savings rates &rarr;
            </Link>
            <Link href="/personal-finance/best-gic-rates-canada" className="cd-apply">
              Best GIC rates by term &rarr;
            </Link>
            <Link href="/personal-finance" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>
              More personal finance &rarr;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
