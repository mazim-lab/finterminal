import Link from "next/link";

export const metadata = {
  title: "Best high-interest savings account (HISA) rates in Canada | FinTerminal",
  description:
    "A clear, honest look at the best everyday high-interest savings account rates in Canada, from EQ Bank and Wealthsimple to Neo, Saven, and Oaken. Rates as of July 2026, with the CDIC coverage you actually get and the promo-rate traps to watch.",
};

export const revalidate = 3600;

const TOC = [
  { id: "short", label: "What is the best rate right now?" },
  { id: "table", label: "The rates, side by side" },
  { id: "everyday", label: "Everyday vs promotional rates" },
  { id: "cdic", label: "Is your money actually insured?" },
  { id: "choose", label: "How to pick one" },
  { id: "faq", label: "Frequently asked questions" },
];

const FAQ = [
  {
    q: "What is the best high-interest savings account rate in Canada right now?",
    a: "As of July 2026, the best everyday (non-promotional) rates from mainstream providers sit roughly in the 2.75 to 2.85 percent range, from names like Saven Financial, Oaken, and Neo, or from EQ Bank if you set up a qualifying direct deposit. Short-term promotional offers for new clients run higher, around 4.5 to 4.6 percent at Simplii and Tangerine, but those drop back to a much lower rate after a few months. Rates change often, so always confirm the current number on the provider's own page before you move money.",
  },
  {
    q: "Are promotional savings rates worth chasing?",
    a: "They can be, but read the fine print. A promo like 4.60 percent usually applies only to new clients, only for about five months, and often only up to a balance cap such as $100,000. After the window closes the rate drops to the everyday rate, which at a big-bank-owned account is often well under one percent. Promos are great for a lump sum you can move in and out. For money that just sits, a steady everyday rate near 2.8 percent often beats a promo that expires.",
  },
  {
    q: "Is my money safe in an online savings account?",
    a: "For most of these providers, yes, as long as you stay within the coverage limits. Banks like EQ Bank, Simplii, Tangerine, and Oaken (through Home Bank and Home Trust) are CDIC members, so eligible deposits are insured up to $100,000 per category, per institution. Wealthsimple and Neo are not banks themselves, so they hold your cash in trust with partner banks that are CDIC members. Manitoba and Ontario credit unions like Achieva and Saven are covered by provincial deposit insurance instead of CDIC.",
  },
  {
    q: "Does Wealthsimple Cash have CDIC coverage?",
    a: "Not directly, because Wealthsimple is not a bank or a CDIC member. Instead it holds your cash in trust with member institutions of the CDIC, and it advertises combined coverage up to $1 million CAD across those partner banks. That is a different structure from a normal bank account, so it is worth understanding rather than assuming your money sits in a single insured account.",
  },
  {
    q: "What happened to motusbank?",
    a: "motusbank, the digital bank launched by Meridian Credit Union, is winding down. Its deposit accounts and loans are being moved to Meridian and Coast Capital Savings, with the transition completing around early 2026. Customer deposits stayed insured throughout. If you see old guides recommending motusbank for savings, treat that as out of date.",
  },
  {
    q: "How often do savings rates change?",
    a: "Often. Everyday HISA rates tend to move with the Bank of Canada's overnight rate, so they can shift within days of a rate decision. Promotional rates are set by each provider and expire on fixed dates. That is exactly why we do not want you to trust any single number for long. Use this page to see the landscape, then click through to the provider's own rate page to confirm the live figure before you act.",
  },
];

export default function BestSavingsAccountRatesPage() {
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
            <span className="cur">best-savings-account-rates-canada</span>
          </nav>

          <div className="head"><h1>Best High-Interest Savings Account (HISA) Rates in Canada</h1></div>
          <p className="lede">
            A good savings account is the quiet workhorse of your money. It holds your emergency fund and your
            short-term goals somewhere safe, pays you a fair rate while it waits, and lets you pull the cash out
            the moment you need it. The catch is that the flashiest number you see advertised is often a
            promotional rate that expires, while the boring everyday rate is what your money actually earns most
            of the year. Below is an honest look at where the best Canadian HISA rates sit today, which ones are
            promos in disguise, and the deposit insurance you really get with each.
          </p>
          <div className="docmeta">
            <span className="gd">PERSONAL FINANCE</span><span className="sep">·</span>
            <span>about 9 min read</span><span className="sep">·</span>
            <span>Rates as of July 2026; general info, not advice</span>
          </div>

          <div className="cd-note">
            <div className="cap">The short answer</div>
            <p style={{ margin: 0 }} className="sub">
              As of July 2026, the best everyday high-interest savings rates from mainstream Canadian providers
              land roughly in the 2.75 to 2.85 percent range, from names like Saven Financial, Oaken, and Neo, or
              from EQ Bank if you add a qualifying direct deposit. New-client promotional rates run higher, around
              4.5 to 4.6 percent at Simplii and Tangerine, but they expire after a few months and then fall well
              below the everyday leaders. Savings rates change often and promos have hard end dates, so confirm
              the current rate on the provider&apos;s own page before you move money.
            </p>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* SHORT */}
          <div id="short" className="cd-sec" style={{ scrollMarginTop: 70 }}>What is the best rate right now?</div>
          <p>
            There is no single winner, because the right account depends on whether you want a steady rate you can
            forget about or a short burst of a high promotional rate. For money that just sits, the everyday rate
            is what matters, and today the leaders cluster in the high two-percent range. For a lump sum you are
            willing to move around, a five-month promo can beat everyone for a while, then hand you back to a much
            lower rate. Both are valid, and knowing which game you are playing is most of the decision.
          </p>
          <p>
            The figures below come from each provider&apos;s own rate pages, checked in July 2026. Where a
            provider loads its everyday rate dynamically and we could not confirm an exact number, we say so
            plainly rather than guess. A savings site that prints a wrong rate is worse than useless, so we would
            rather describe something qualitatively than invent a digit.
          </p>

          {/* TABLE */}
          <div id="table" className="cd-sec" style={{ scrollMarginTop: 70 }}>The rates, side by side</div>
          <p>
            Here is where the mainstream options stand as of July 2026. Everyday means the ongoing rate with no
            strings, unless a condition is noted. Promotional means a temporary rate, usually for new clients
            only, that reverts afterward.
          </p>
          <div className="kv" style={{ marginTop: 10 }}>
            <div className="kvrow">
              <div className="kvk">EQ Bank, Personal Account</div>
              <div className="kvv">
                1.00% everyday base, rising to <strong>2.75%</strong> if you add a qualifying recurring direct
                deposit of at least $2,000 a month. CDIC member. A strong pick if your payroll can land here.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Saven Financial, HISA</div>
              <div className="kvv">
                <strong>2.85%</strong> everyday, no promo games and no minimum balance. A division of FirstOntario
                Credit Union, so deposits are covered by Ontario credit union insurance (FSRA), not CDIC.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Oaken Financial, Savings Account</div>
              <div className="kvv">
                Around <strong>2.80%</strong> everyday at the time of writing. Deposits are held with Home Bank
                and Home Trust, both CDIC members. Confirm the live figure on Oaken&apos;s savings page, since it
                loads dynamically.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Neo Financial, Neo Savings</div>
              <div className="kvv">
                <strong>2.75%</strong> on the Neo Savings account (effective late June 2026), which requires
                keeping a minimum combined balance across your Neo accounts. Neo&apos;s separate
                High-Interest Savings account was listed at 1.25%. Neo is not a bank itself, so cash is held in
                trust with CDIC-member partner banks.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Achieva Financial, Daily Interest Savings</div>
              <div className="kvv">
                A no-promo everyday account in the high-one to low-two-percent range at the time of writing, with
                its exact rate loaded dynamically on Achieva&apos;s site. Deposits are guaranteed without limit by
                the Deposit Guarantee Corporation of Manitoba. Confirm the current figure before you move money.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Wealthsimple, Cash</div>
              <div className="kvv">
                Tiered by how much you hold: <strong>1.25%</strong> under $100,000, <strong>1.75%</strong> over
                $100,000, and <strong>2.25%</strong> at $500,000 or more, with an extra boost available for
                setting up a $2,000 direct deposit. Not a bank, so cash is held in trust with CDIC-member
                partners, advertised up to $1 million combined.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Simplii Financial, High Interest Savings</div>
              <div className="kvv">
                Running a new-client promotional rate of <strong>4.60%</strong> for roughly five months on
                balances up to $100,000, ending July 31, 2026. The everyday rate afterward is much lower, in the
                usual big-bank range. CDIC member (Simplii is a division of CIBC).
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Tangerine, Savings Account</div>
              <div className="kvv">
                Offering a new-client promotional rate of <strong>4.50%</strong> for five months, ending July 31,
                2026, on non-registered savings. The ongoing everyday rate is much lower once the promo ends.
                CDIC member (Tangerine is owned by Scotiabank).
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">motusbank, no longer available</div>
              <div className="kvv">
                Winding down. Its accounts are moving to Meridian and Coast Capital Savings, with the transition
                completing around early 2026. Deposits stayed insured, but this is no longer an account you can
                open. Ignore older guides that still list it.
              </div>
            </div>
          </div>

          <div className="cd-note">
            <div className="cap">Rates change; this is a snapshot</div>
            <p style={{ margin: 0 }} className="sub">
              Every number above was checked in July 2026 against the provider&apos;s own materials, but everyday
              rates move with the Bank of Canada and promotional rates expire on fixed dates. Treat this as a map
              of the landscape, not a live quote. Before you move a dollar, open the provider&apos;s own rate page
              and confirm the current figure.
            </p>
          </div>

          {/* EVERYDAY */}
          <div id="everyday" className="cd-sec" style={{ scrollMarginTop: 70 }}>Everyday vs promotional rates</div>
          <p>
            This is the single most important distinction in Canadian savings accounts, and it trips up a lot of
            people. The big, bank-owned accounts like Simplii and Tangerine tend to advertise an eye-catching rate
            such as 4.50 or 4.60 percent. Read the asterisk and you will find it is a promotional rate: new
            clients only, for about five months, often capped at a balance like $100,000. When the window closes,
            the rate falls to the everyday rate, which at those accounts is frequently well under one percent.
          </p>
          <p>
            The everyday leaders work differently. Saven, Oaken, Achieva, and EQ Bank (with its direct-deposit
            bonus) do not dangle a teaser. They pay a steady rate all year, which is why a boring 2.8 percent that
            never expires often beats a flashy 4.6 percent that lasts five months and then collapses. If your
            money is going to sit for a year or more, the everyday rate is the number that decides your outcome.
          </p>
          <div className="cd-note">
            <div className="cap">A simple way to think about it</div>
            <p style={{ margin: 0 }} className="sub">
              Use promos for a lump sum you can actively move in and grab the high rate for its window, then move
              on. Use a steady everyday account for money that just needs a good home and your attention
              elsewhere. Chasing promos with a balance you never touch usually earns less than picking one solid
              everyday rate and leaving it alone.
            </p>
          </div>

          {/* CDIC */}
          <div id="cdic" className="cd-sec" style={{ scrollMarginTop: 70 }}>Is your money actually insured?</div>
          <p>
            Deposit insurance is the reason a savings account is boring in the best possible way. But not every
            provider is insured the same way, and the differences are worth understanding before you park a large
            balance.
          </p>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <div className="st">CDIC banks</div>
              <p>
                EQ Bank, Simplii, Tangerine, and Oaken (through Home Bank and Home Trust) are CDIC members.
                Eligible deposits are insured up to $100,000 per insured category, per member institution. If you
                hold more than that, spreading across separate member institutions keeps you within coverage.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <div className="st">Not-a-bank providers</div>
              <p>
                Wealthsimple and Neo are not banks and are not themselves CDIC members. They hold your cash in
                trust with partner banks that are CDIC members. Wealthsimple advertises combined coverage up to $1
                million CAD across its partners. The protection is real, but the structure is different from a
                single bank account, so it is worth knowing how it works.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <div className="st">Credit unions</div>
              <p>
                Saven (a division of FirstOntario Credit Union) is covered by Ontario&apos;s credit union deposit
                insurance through FSRA, not CDIC. Achieva, based in Manitoba, is covered by the Deposit Guarantee
                Corporation of Manitoba, which guarantees deposits without a dollar limit. Different regimes, both
                legitimate, just not CDIC.
              </p>
            </div>
          </div>

          {/* CHOOSE */}
          <div id="choose" className="cd-sec" style={{ scrollMarginTop: 70 }}>How to pick one</div>
          <p>
            You do not need the mathematically perfect account. You need a good one that fits how you actually
            behave with money. A few honest questions get you most of the way there.
          </p>
          <ul>
            <li>
              <strong>Will this money just sit?</strong> If yes, chase the best everyday rate and ignore promos.
              Something near 2.8 percent that never expires beats a promo you will forget to move out of.
            </li>
            <li>
              <strong>Is this a lump sum you can move?</strong> If yes, a five-month new-client promo at 4.5 to
              4.6 percent can be worth opening, as long as you note the end date and plan your exit.
            </li>
            <li>
              <strong>Can your payroll direct-deposit somewhere?</strong> If yes, EQ Bank&apos;s jump to 2.75
              percent with a $2,000 monthly deposit turns an everyday account into a top-tier one.
            </li>
            <li>
              <strong>Do you want CDIC specifically?</strong> If a CDIC bank matters to you, stick with EQ Bank,
              Simplii, Tangerine, or Oaken rather than a credit union or a hold-in-trust provider.
            </li>
            <li>
              <strong>How big is the balance?</strong> Above $100,000, mind the coverage limits and consider
              splitting across insured institutions rather than piling everything into one.
            </li>
          </ul>
          <div className="cd-note">
            <div className="cap">A friendly reminder</div>
            <p style={{ margin: 0 }} className="sub">
              This is general information to help you compare, not personalized financial advice, and every rate
              here changes over time. Confirm the current number and the coverage details on each provider&apos;s
              own site before you decide, and remember that a slightly lower rate on an account you will actually
              use beats a higher one you never get around to opening.
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
            A savings account is one piece of a healthy money setup. It pairs naturally with picking the right
            card for your spending and with the rest of our plain-language personal-finance guides.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/personal-finance/best-gic-rates-canada" className="cd-apply">
              Best GIC rates in Canada &rarr;
            </Link>
            <Link href="/personal-finance/best-chequing-account-bonuses-canada" className="cd-apply">
              Best chequing account welcome bonuses in Canada &rarr;
            </Link>
            <Link href="/personal-finance/where-to-hold-cash-canada" className="cd-apply">
              Where to hold your cash in Canada &rarr;
            </Link>
            <Link href="/personal-finance/pay-bills-with-credit-card-canada" className="cd-apply">
              Paying bills with a credit card &rarr;
            </Link>
            <Link href="/cards" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>
              Browse cards &amp; bonuses &rarr;
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
