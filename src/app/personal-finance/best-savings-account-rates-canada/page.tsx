import Link from "next/link";
import { ArticleTags } from "@/components/ArticleTags";
import { ArticleHero } from "@/components/ArticleHero";
import { GrowthMotif } from "@/components/heroes/motifs";
import { ogMeta } from "@/lib/og";
import { ArticleSchema } from "@/components/ArticleSchema";
import { VerifiedStamp } from "@/components/VerifiedStamp";
import { RATE_STAMPS, RATE_CADENCE_DAYS } from "@/components/money/ratePages";
import { Comments } from "@/components/Comments";
import { RateGlance, isPastDate, type GlanceRow } from "@/components/money/RateGlance";

export const metadata = {
  alternates: { canonical: "/personal-finance/best-savings-account-rates-canada" },
  title: "Best high-interest savings account (HISA) rates in Canada | FinTerminal",
  description:
    "A clear, honest look at the best everyday high-interest savings account rates in Canada, from EQ Bank and Wealthsimple to Neo, Saven, and Oaken. Rates as of November 2026, with the CDIC coverage you actually get and the promo-rate traps to watch.",
  ...ogMeta("Best high-interest savings account (HISA) rates in Canada", "Personal finance", "/personal-finance/best-savings-account-rates-canada", "article"),
};

const TOC = [
  { id: "glance", label: "At a glance" },
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
    a: "As of November 2026, the best everyday (non-promotional) rates from mainstream providers sit at about 3.00 percent, from Saven Financial and Oaken, from EQ Bank if you set up a qualifying direct deposit, and from Neo on its top paid membership. Short-term promotional offers for new clients run higher, around 4.5 to 5.0 percent at Tangerine and Simplii, but those drop back to a much lower rate after a few months. Rates change often, so always confirm the current number on the provider's own page before you move money.",
  },
  {
    q: "Are promotional savings rates worth chasing?",
    a: "They can be, but read the fine print. A promo like 5.00 percent usually applies only to new clients, only for about five months, and often only up to a stated balance cap. After the window closes the rate drops to the everyday rate, which at a big-bank-owned account is often well under one percent. Promos are great for a lump sum you can move in and out. For money that just sits, a steady everyday rate near 3 percent often beats a promo that expires.",
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

// At-a-glance grid. Every figure here is the bold number printed in "The rates,
// side by side" below, with the same conditions. Nothing new is stated.
// Sorted everyday rates first, then tiered, then promos, so a promo never
// reads as the "best" ongoing rate.
const GLANCE: GlanceRow[] = [
  { name: "Saven Financial", sub: "HISA", cells: { rate: "3.00%", kind: { text: "Everyday", sub: "No minimum balance" }, ins: "FSRA (Ontario CU)" } },
  { name: "Oaken Financial", sub: "Savings Account", cells: { rate: "3.00%", kind: { text: "Everyday", sub: "Same 3.00% on TFSA, RSP and spousal RSP savings" }, ins: "CDIC" } },
  { name: "EQ Bank", sub: "Personal Account", cells: { rate: { text: "3.00%", sub: "1.50% base" }, kind: { text: "Everyday, with a condition", sub: "Recurring direct deposit of at least $2,000 a month" }, ins: "CDIC" } },
  { name: "Neo Financial", sub: "Neo Savings", cells: { rate: { text: "Up to 3.00%", sub: "2.25% to 3.00% by membership" }, kind: { text: "Everyday, with a condition", sub: "Rate depends on your Neo membership; fees run $0 to $14.99 a month" }, ins: "CDIC partners (in trust)" } },
  { name: "Achieva Financial", sub: "Daily Interest Savings", cells: { rate: "2.05%", kind: "Everyday", ins: "DGCM (Manitoba CU)" } },
  { name: "Wealthsimple", sub: "Cash", cells: { rate: { text: "1.25%", sub: "1.75% over $100k, 2.25% at $500k+" }, kind: { text: "Tiered by balance", sub: "Extra boost with a $2,000 direct deposit" }, ins: "CDIC partners (in trust)" } },
  { name: "Simplii Financial", sub: "High Interest Savings", cells: { rate: { text: "5.00%", ended: isPastDate("2027-01-31") }, kind: { text: "Promo, new clients", sub: "153 days, up to $100,000; window Nov 1, 2026 to Jan 31, 2027" }, ins: "CDIC" } },
  { name: "Tangerine", sub: "Savings Account", cells: { rate: { text: "4.50%", ended: isPastDate("2026-11-30") }, kind: { text: "Promo, new clients", sub: "153 days; Client Number created Jul 28 to Nov 30, 2026" }, ins: "CDIC" } },
  { name: "motusbank", sub: "No longer available", cells: { rate: { text: "Closed", check: true }, kind: "Winding down", ins: null } },
];

export default function BestSavingsAccountRatesPage() {
  return (
    <div className="app norail tone-money">
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
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span className="sep">/</span>
            <Link href="/personal-finance">Personal finance</Link><span className="sep">/</span>
            <span className="cur" aria-current="page">Best High-Interest Savings Account (HISA) Rates in Canada</span>
          </nav>
          <ArticleSchema headline="Best high-interest savings account (HISA) rates in Canada" path="/personal-finance/best-savings-account-rates-canada" kicker="Personal finance" />

          <ArticleHero variant="graphic" alt="A rising bar chart with an upward trend line">
            <GrowthMotif />
          </ArticleHero>

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
            <span>{RATE_STAMPS.savings.asOf}; general info, not advice</span><span className="sep">·</span>
            {/* Stamp date and "as of" line live in RATE_STAMPS (src/components/money/ratePages.ts), shared with the hubs. Rates and links stay in this file. */}
            <VerifiedStamp date={RATE_STAMPS.savings.verified} cadenceDays={RATE_CADENCE_DAYS} />
          </div>
          <ArticleTags path="/personal-finance/best-savings-account-rates-canada" />

          <div className="cd-note short">
            <div className="cap">The short answer</div>
            <p className="sub">
              As of November 2026, the best everyday high-interest savings rates from mainstream Canadian providers
              land at about 3.00 percent, from Saven Financial and Oaken, from EQ Bank if you add a qualifying direct
              deposit, and from Neo on its top paid membership. New-client promotional rates run higher, around
              4.5 to 5.0 percent at Tangerine and Simplii, but they expire after a few months and then fall well
              below the everyday leaders. Savings rates change often and promos have hard end dates, so confirm
              the current rate on the provider&apos;s own page before you move money.
            </p>
          </div>

          <RateGlance
            caption="High-interest savings rates by provider, as of November 2026"
            intro={<>Rates as of November 2026, from each provider&apos;s own rate page. Everyday rates are the ongoing rate; promos are temporary and revert. Details are in <a href="#table">the full rundown</a> below.</>}
            columns={[
              { key: "rate", label: "Rate", numeric: true },
              { key: "kind", label: "Type and condition" },
              { key: "ins", label: "Deposit insurance" },
            ]}
            rows={GLANCE}
            notes={[
              <>Promo rates drop to a much lower everyday rate when the window ends. Tangerine also pays 5.00% for 153 days on new registered savings accounts under the same offer.</>,
            ]}
          />

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* SHORT */}
          <h2 id="short" className="cd-sec">What is the best rate right now?</h2>
          <p>
            There is no single winner, because the right account depends on whether you want a steady rate you can
            forget about or a short burst of a high promotional rate. For money that just sits, the everyday rate
            is what matters, and today the leaders cluster at about three percent. For a lump sum you are
            willing to move around, a five-month promo can beat everyone for a while, then hand you back to a much
            lower rate. Both are valid, and knowing which game you are playing is most of the decision.
          </p>
          <p>
            The figures below come from each provider&apos;s own rate pages, checked on November 13, 2026. Where a
            provider loads its everyday rate dynamically and we could not confirm an exact number, we say so
            plainly rather than guess. A savings site that prints a wrong rate is worse than useless, so we would
            rather describe something qualitatively than invent a digit.
          </p>

          {/* TABLE */}
          <h2 id="table" className="cd-sec">The rates, side by side</h2>
          <p>
            Here is where the mainstream options stand as of November 2026. Everyday means the ongoing rate with no
            strings, unless a condition is noted. Promotional means a temporary rate, usually for new clients
            only, that reverts afterward.
          </p>
          <div className="kv" style={{ marginTop: 10 }}>
            <div className="kvrow">
              <div className="kvk">EQ Bank, Personal Account</div>
              <div className="kvv">
                1.50% everyday base, rising to <strong>3.00%</strong> if you add a qualifying recurring direct
                deposit of at least $2,000 a month, both effective November 6, 2026. CDIC member. A strong pick if your payroll can land here.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Saven Financial, HISA</div>
              <div className="kvv">
                <strong>3.00%</strong> everyday, no promo games and no minimum balance. A division of FirstOntario
                Credit Union, so deposits are covered by Ontario credit union insurance (FSRA), not CDIC.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Oaken Financial, Savings Account</div>
              <div className="kvv">
                <strong>3.00%</strong> everyday, and the same 3.00% on the TFSA, RSP, and spousal RSP savings
                accounts. Deposits are held with Home Bank and Home Trust, both CDIC members. Oaken&apos;s own
                rate page is the place to confirm the live figure before you move money.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Neo Financial, Neo Savings</div>
              <div className="kvv">
                <strong>2.25% to 3.00%</strong> on the Neo Savings account (rates as of October 29, 2026), depending
                on your Neo membership. Memberships cost $0 to $14.99 a month, and the top 3.00% needs the Grow
                membership, so subtract the fee before you compare. Neo&apos;s older High-Interest Savings account
                (1.25%) is closed to new accounts. Neo is not a bank itself, so cash is held in
                trust with CDIC-member partner banks.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Achieva Financial, Daily Interest Savings</div>
              <div className="kvv">
                <strong>2.05%</strong> everyday, no promo games, on Achieva&apos;s Daily Interest Savings Account, effective October 29, 2026.
                Deposits are guaranteed without limit by the Deposit Guarantee Corporation of Manitoba. Confirm the
                current figure before you move money.
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
                Running a new-client promotional rate of <strong>5.00%</strong> (regular plus promotional interest
                combined) for 153 days, roughly five months, on balances up to $100,000. The current window runs
                November 1, 2026 to January 31, 2027, and you have to open your first Simplii HISA inside it, within
                60 days of becoming a Simplii client, to qualify. The everyday rate afterward is much lower, in
                the usual big-bank range. CDIC member (Simplii is a division of CIBC).
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Tangerine, Savings Account</div>
              <div className="kvv">
                Still offering a new-client promotional rate of <strong>4.50%</strong> for 153 days, five months,
                on non-registered savings (and 5.00% on new registered savings accounts), confirmed live on
                November 13, 2026. It applies to new clients whose Client Number is created between July 28 and
                November 30, 2026, so this window closes soon. The ongoing everyday rate is much lower once the promo ends.
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
            <p className="sub">
              Every number above was re-checked on November 13, 2026 against the provider&apos;s own materials.
              Everyday rates move with the Bank of Canada and promotional rates expire on fixed
              dates, so treat this as a map of the landscape, not a live quote. Before you move a dollar, open the provider&apos;s own rate page
              and confirm the current figure.
            </p>
          </div>

          {/* EVERYDAY */}
          <h2 id="everyday" className="cd-sec">Everyday vs promotional rates</h2>
          <p>
            This is the single most important distinction in Canadian savings accounts, and it trips up a lot of
            people. The big, bank-owned accounts like Simplii and Tangerine tend to advertise an eye-catching rate
            such as 4.50 or 5.00 percent. Read the asterisk and you will find it is a promotional rate: new
            clients only, for about five months, and usually capped at a stated balance. When the window closes,
            the rate falls to the everyday rate, which at those accounts is frequently well under one percent.
          </p>
          <p>
            The everyday leaders work differently. Saven, Oaken, Achieva, and EQ Bank (with its direct-deposit
            bonus) do not dangle a teaser. They pay a steady rate all year, which is why a boring 3 percent that
            never expires often beats a flashy 5 percent that lasts five months and then collapses. If your
            money is going to sit for a year or more, the everyday rate is the number that decides your outcome.
          </p>
          <div className="cd-note">
            <div className="cap">A simple way to think about it</div>
            <p className="sub">
              Use promos for a lump sum you can actively move in and grab the high rate for its window, then move
              on. Use a steady everyday account for money that just needs a good home and your attention
              elsewhere. Chasing promos with a balance you never touch usually earns less than picking one solid
              everyday rate and leaving it alone.
            </p>
          </div>

          {/* CDIC */}
          <h2 id="cdic" className="cd-sec">Is your money actually insured?</h2>
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
          <h2 id="choose" className="cd-sec">How to pick one</h2>
          <p>
            You do not need the mathematically perfect account. You need a good one that fits how you actually
            behave with money. A few honest questions get you most of the way there.
          </p>
          <ul>
            <li>
              <strong>Will this money just sit?</strong> If yes, chase the best everyday rate and ignore promos.
              Something near 3 percent that never expires beats a promo you will forget to move out of.
            </li>
            <li>
              <strong>Is this a lump sum you can move?</strong> If yes, a five-month new-client promo at 4.5 to
              5.0 percent can be worth opening, as long as you note the end date and plan your exit.
            </li>
            <li>
              <strong>Can your payroll direct-deposit somewhere?</strong> If yes, EQ Bank&apos;s jump to 3.00
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
            <p className="sub">
              This is general information to help you compare, not personalized financial advice, and every rate
              here changes over time. Confirm the current number and the coverage details on each provider&apos;s
              own site before you decide, and remember that a slightly lower rate on an account you will actually
              use beats a higher one you never get around to opening.
            </p>
          </div>

          {/* FAQ */}
          <h2 id="faq" className="cd-sec">Frequently asked questions</h2>
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="faq-q">{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}

          <h2 className="cd-sec">Keep going</h2>
          <p>
            A savings account is one piece of a healthy money setup. It pairs naturally with picking the right
            card for your spending and with the rest of our plain-language personal-finance guides.
          </p>
          <div className="cta-row">
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
            <Link href="/cards" className="cd-apply">
              Browse cards &amp; bonuses &rarr;
            </Link>
            <Link href="/personal-finance" className="cd-apply">
              More personal finance &rarr;
            </Link>
          </div>
          <Comments path="/personal-finance/best-savings-account-rates-canada" />
        </div>
      </main>
    </div>
  );
}
