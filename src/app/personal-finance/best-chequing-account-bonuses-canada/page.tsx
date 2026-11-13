import Link from "next/link";
import { ArticleTags } from "@/components/ArticleTags";
import { ArticleHero } from "@/components/ArticleHero";
import { ValueCoinsMotif } from "@/components/heroes/motifs";
import { ogMeta } from "@/lib/og";
import { ArticleSchema } from "@/components/ArticleSchema";
import { VerifiedStamp } from "@/components/VerifiedStamp";
import { RATE_STAMPS, RATE_CADENCE_DAYS } from "@/components/money/ratePages";
import { Comments } from "@/components/Comments";
import { RateGlance, isPastDate, type GlanceRow } from "@/components/money/RateGlance";

export const metadata = {
  alternates: { canonical: "/personal-finance/best-chequing-account-bonuses-canada" },
  title: "Best chequing account welcome bonuses in Canada | FinTerminal",
  description:
    "An honest look at the best chequing account welcome bonuses in Canada, from BMO, Scotiabank, TD, and CIBC to RBC, Simplii, and Tangerine. Offers as of November 2026, with the direct-deposit conditions you actually have to meet, the monthly fees to watch, and how switching for a bonus really works.",
  ...ogMeta("Best chequing account welcome bonuses in Canada", "Personal finance", "/personal-finance/best-chequing-account-bonuses-canada", "article"),
};

const TOC = [
  { id: "glance", label: "At a glance" },
  { id: "short", label: "What is the best bonus right now?" },
  { id: "table", label: "The offers, bank by bank" },
  { id: "how", label: "How these bonuses actually work" },
  { id: "fees", label: "Watch the monthly fee" },
  { id: "switching", label: "Is switching for a bonus worth it?" },
  { id: "cards", label: "Not the same as a credit-card bonus" },
  { id: "faq", label: "Frequently asked questions" },
];

const FAQ = [
  {
    q: "What is the best chequing account welcome bonus in Canada right now?",
    a: "As of November 2026, the largest verified offers come from the big banks and require bundling. BMO advertises up to $1,100 in cash when you pair a Performance or Premium chequing account with a savings account and a credit card, Scotiabank advertises up to $1,000 when you pair an eligible chequing package with a registered account and a credit card, TD advertises up to $1,000 in cash on its All-Inclusive plan with a savings account and credit card bundle, and CIBC advertises up to $850 on its Smart Account through bundled actions. Among the no-fee online options, Simplii offers $350 for new clients who set up recurring direct deposits of at least $100 a month for four consecutive months, and Tangerine offers $250 for setting up qualifying payroll direct deposits. Every one of these carries conditions and an end date, so confirm the current offer on the bank's own page before you open anything.",
  },
  {
    q: "What conditions do I have to meet to actually get paid?",
    a: "Almost every chequing bonus requires you to set up recurring direct deposits, often two or more of a minimum amount, and many also want you to add pre-authorized payments, online bill payments, or a set number of debit transactions inside a window like 60 or 120 days. Some of the largest offers only reach their headline number if you also open a savings account or a credit card in the same bundle. The bonus usually lands a few months after you qualify, and many offers ask you to keep the account open for a year. Read the specific conditions on the bank's own offer page, because the headline dollar figure is the best case, not a guarantee.",
  },
  {
    q: "Do chequing accounts charge monthly fees?",
    a: "Many of the accounts tied to the biggest bonuses do. Full-service plans from RBC, TD, Scotiabank, BMO, CIBC, and National Bank typically carry a monthly fee in the roughly $16 to $30 range, which is usually waived if you keep a minimum balance (often around $3,000 to $6,000) or meet other criteria. No-fee options like Simplii and Tangerine do not charge a monthly fee at all. When you compare a bonus, subtract any fees you would actually pay over the time you plan to keep the account, because a fee that is not waived can quietly eat a chunk of the reward.",
  },
  {
    q: "Is switching banks for a welcome bonus actually a good idea?",
    a: "It can be, and plenty of people do it deliberately. A few hundred dollars for setting up a direct deposit and a couple of bill payments is real money for a modest amount of effort. The honest caveats are that you need to genuinely meet the conditions, watch for a monthly fee that is not waived, and remember that moving your payroll and pre-authorized payments takes a little coordination. If you are organized and read the fine print, chequing bonuses are one of the more reliable low-risk perks in Canadian banking. If setting up and later unwinding an account stresses you out, the reward may not be worth it.",
  },
  {
    q: "Are these the same as credit-card welcome bonuses?",
    a: "No. A chequing account bonus is cash (or occasionally a gift like a tablet) for opening a bank account and meeting deposit conditions, with no credit check for the account itself in most cases. A credit-card welcome bonus is points or cash back for being approved for a card and hitting a minimum spend, and it does involve a credit application. They are completely separate rewards, and you can pursue both. Some bank offers even bundle the two, giving you extra cash for adding a credit card on top of the chequing account.",
  },
  {
    q: "How often do these offers change?",
    a: "Constantly. Chequing bonuses rotate on fixed end dates, and banks raise, lower, or retire them throughout the year. The amounts and conditions in this guide were verified on November 13, 2026 against each bank's own offer page, but a number you see today can be gone or different next month. Use this page to understand the landscape and the conditions to look for, then click through to the bank's own page to confirm the live offer before you apply.",
  },
];

// At-a-glance grid. Every amount and date here is printed in "The offers, bank
// by bank" below. "Ended" is computed at build time from the printed deadline.
const CHECK = { text: "Check site", check: true } as const;
const GLANCE: GlanceRow[] = [
  { name: "BMO", sub: "Performance / Premium", cells: { bonus: { text: "Up to $1,100", sub: "$800 chequing, $200 savings, $100 credit card" }, fee: "Yes, typically waived with a minimum balance", ends: { text: "Open by Mar 1, 2027", ended: isPastDate("2027-03-01") } } },
  { name: "Scotiabank", sub: "Ultimate / Preferred Package", cells: { bonus: { text: "Up to $1,000", sub: "Bundle chequing, a registered account and a credit card" }, fee: "Yes, waivable with a minimum balance", ends: { text: "Open by Mar 4, 2027", ended: isPastDate("2027-03-04") } } },
  { name: "TD", sub: "All-Inclusive / Unlimited", cells: { bonus: { text: "Up to $1,000", sub: "$850 (All-Inclusive) or $700 (Unlimited), plus $150 bundle; student offer $150" }, fee: "Yes, waived with a minimum balance", ends: { text: "Open by Mar 3, 2027", ended: isPastDate("2027-03-03") } } },
  { name: "CIBC", sub: "Smart Account", cells: { bonus: { text: "Up to $850", sub: "Through bundled actions" }, fee: "$16.95 a month, rebated with a $4,000 balance", ends: { text: "Not stated", check: true } } },
  { name: "RBC", sub: "Signature No Limit / VIP", cells: { bonus: { text: "Up to $600", sub: "$500 plus a $100 anniversary bonus; up to $1,000 with an RBC credit card" }, fee: "$16.95 a month (Signature No Limit)", ends: { text: "Open by Mar 1, 2027", ended: isPastDate("2027-03-01") } } },
  { name: "Simplii Financial", sub: "No Fee Chequing", cells: { bonus: { text: "$350", sub: "$100+ a month in direct deposits for 4 consecutive months" }, fee: "None", ends: { text: "Jan 31, 2027", ended: isPastDate("2027-01-31") } } },
  { name: "Tangerine", sub: "Chequing Account", cells: { bonus: { text: "$250", sub: "Payroll direct deposits of $200+ a month for 2 months" }, fee: "None", ends: { text: "Apr 30, 2027", ended: isPastDate("2027-04-30") } } },
  { name: "National Bank", sub: "Connected / Total", cells: { bonus: { text: "No offer running", check: true }, fee: CHECK, ends: { text: "Last offer ended Nov 3, 2026", ended: isPastDate("2026-11-03") } } },
  { name: "EQ Bank", sub: "Everyday account", cells: { bonus: CHECK, fee: "None", ends: CHECK } },
];

export default function BestChequingBonusesPage() {
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
            <span className="cur" aria-current="page">Best Chequing Account Welcome Bonuses in Canada</span>
          </nav>
          <ArticleSchema headline="Best chequing account welcome bonuses in Canada" path="/personal-finance/best-chequing-account-bonuses-canada" kicker="Personal finance" />

          <ArticleHero variant="graphic" alt="Rising stacks of coins">
            <ValueCoinsMotif />
          </ArticleHero>

          <div className="head"><h1>Best Chequing Account Welcome Bonuses in Canada</h1></div>
          <p className="lede">
            Opening a chequing account is one of the few times a bank pays you to walk in the door. Set up your
            payroll direct deposit, add a couple of bill payments, keep the account open for a while, and a bank
            will often hand you a few hundred dollars for the trouble. The reward is real, but so is the fine
            print, and the headline number is almost always the best case rather than a sure thing. Below is an
            honest look at the current chequing bonuses we could verify from each bank's own page, the conditions
            you actually have to meet, the monthly fees to watch for, and how switching for a bonus really works.
          </p>
          <div className="docmeta">
            <span className="gd">PERSONAL FINANCE</span><span className="sep">·</span>
            <span>about 9 min read</span><span className="sep">·</span>
            <span>{RATE_STAMPS.chequing.asOf}; general info, not advice</span><span className="sep">·</span>
            {/* Stamp date and "as of" line live in RATE_STAMPS (src/components/money/ratePages.ts), shared with the hubs. Rates and links stay in this file. */}
            <VerifiedStamp date={RATE_STAMPS.chequing.verified} cadenceDays={RATE_CADENCE_DAYS} />
          </div>
          <ArticleTags path="/personal-finance/best-chequing-account-bonuses-canada" />

          <div className="cd-note short">
            <div className="cap">The short answer</div>
            <p className="sub">
              As of November 2026, the biggest verified chequing offers come from the big banks and need bundling:
              BMO advertises up to $1,100, Scotiabank and TD up to $1,000 each, and CIBC up to $850, each when you
              pair a chequing account with a savings or registered account or a credit card and meet direct-deposit
              and activity conditions. Among no-fee online accounts, Simplii offers $350 for new clients who set up a
              qualifying direct deposit and Tangerine offers $250 for setting up qualifying payroll direct deposits. Bank account promos change and expire; confirm
              the current offer and its conditions on the bank&apos;s own page before you open an account.
            </p>
          </div>

          <RateGlance
            caption="Chequing account welcome offers by bank, as of November 2026"
            firstColLabel="Bank"
            intro={<>Offers as of November 2026, verified on each bank&apos;s own offer page. Most are the maximum possible value, so read the conditions in <a href="#table">the full rundown</a> below.</>}
            columns={[
              { key: "bonus", label: "Welcome offer" },
              { key: "fee", label: "Monthly fee" },
              { key: "ends", label: "Offer deadline" },
            ]}
            rows={GLANCE}
            notes={[
              <>&ldquo;Check site&rdquo; means the bank&apos;s page did not load or did not state it, so we could not verify it. &ldquo;Ended&rdquo; means the deadline printed here has passed; the bank may have a new offer. National Bank&apos;s own page showed no new chequing offer on November 13, 2026.</>,
            ]}
          />

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* SHORT */}
          <h2 id="short" className="cd-sec">What is the best bonus right now?</h2>
          <p>
            There is no single winner, because the biggest dollar figures come attached to the most conditions. The
            largest offers, from BMO, Scotiabank, TD, and CIBC, only reach their headline number when you bundle a
            chequing account with a savings account or a credit card and complete a checklist of activities. The
            simplest offers, from Simplii and Tangerine, pay less but ask only that you move a direct deposit over,
            and they come with no monthly fee. Which one is best depends on how much setup you are willing to do and
            whether you want a full-service bank or a lean no-fee account.
          </p>
          <p>
            The figures below were checked on November 13, 2026 against each bank&apos;s own offer page. Some bank pages
            load their promotions dynamically or timed out when we tried to read them, so we could not confirm an
            exact live number for every name. Where that is the case we say so plainly and describe the account
            qualitatively rather than guess. A finance site that prints a wrong bonus is worse than useless, so we
            would rather point you to the source than invent a figure.
          </p>

          {/* TABLE */}
          <h2 id="table" className="cd-sec">The offers, bank by bank</h2>
          <p>
            Here is where the mainstream chequing offers stand as of November 2026. Amounts shown in bold were verified
            on the bank&apos;s own offer page on November 13, 2026. Most are the maximum possible value, reached only if you
            meet every condition, so treat the headline as a ceiling and read the specific terms.
          </p>
          <div className="kv" style={{ marginTop: 10 }}>
            <div className="kvrow">
              <div className="kvk">Scotiabank (Ultimate / Preferred Package)</div>
              <div className="kvv">
                Verified November 13, 2026: earn <strong>up to $1,000</strong> when you bundle an eligible chequing package
                (Ultimate or Preferred), a registered account, and an eligible credit card. The breakdown is $700 for
                opening the chequing account between October 30, 2026 and March 4, 2027, receiving a recurring direct
                deposit within 60 days that continues for four months in a row, and completing one more activity (a
                recurring pre-authorized transaction of $50 or more, a $50 bill payment, or five Visa Debit purchases);
                $200 more for opening your first RRSP, TFSA, or FHSA within 60 days; and $100 more for an eligible
                credit card with a qualifying purchase. These packages carry
                a monthly fee that can be waived with a minimum balance.{" "}
                <a href="https://www.scotiabank.com/ca/en/personal/bank-accounts/chequing-accounts.html" target="_blank" rel="noopener noreferrer">Scotiabank chequing offers</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">CIBC (Smart Account)</div>
              <div className="kvv">
                Verified November 13, 2026: earn <strong>up to $850</strong> on the CIBC Smart Account through
                bundled qualifying actions, with &quot;conditions apply.&quot; A separate CIBC Smart Start offer for
                clients under 25 gives <strong>$125</strong> cash for opening your first chequing account and making
                five Visa Debit purchases within 60 days, plus a free Skip+ membership when you link an eligible CIBC
                card. The Smart Account costs $16.95 a month ($17.95 from January 1, 2027), rebated in any month you
                keep a $4,000 balance every day. The page did not state a firm end date for the bundle offer, so
                confirm the live terms.{" "}
                <a href="https://www.cibc.com/en/personal-banking/bank-accounts.html" target="_blank" rel="noopener noreferrer">CIBC bank accounts</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">TD (All-Inclusive / Unlimited Chequing)</div>
              <div className="kvv">
                Verified November 13, 2026: <strong>up to $1,000</strong> in cash. Open a TD All-Inclusive Banking Plan
                for <strong>$850</strong> or TD Unlimited Chequing for <strong>$700</strong> by March 3, 2027. You
                need a recurring direct deposit of at least $1,500 (All-Inclusive) or $500 (Unlimited) within 30 days
                of opening, plus one $50 online bill payment or a recurring pre-authorized debit within 60 days.
                Another $150 comes from also opening a TD savings account (with a pre-authorized transfer set up) and
                an eligible TD credit card within 30 days, and new savings deposits can earn an extra 4% bonus
                interest for 90 days.
                A separate TD Student Chequing offer pays <strong>$150</strong> cash for opening by March 3, 2027 and
                completing two activities by May 3, 2027. These plans carry a monthly fee that is waived with a
                minimum balance.{" "}
                <a href="https://www.td.com/ca/en/personal-banking/new-bank-account-offers-promotions" target="_blank" rel="noopener noreferrer">TD bank account offers</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">National Bank (Connected / Total)</div>
              <div className="kvv">
                Checked November 13, 2026: no chequing welcome offer is running right now. National Bank&apos;s
                up to $600 cashback offer on The Connected and The Total ran from May 7 to November 3, 2026, and its
                accounts page now marks it as ended. Its offers page did not show a replacement chequing bonus, so
                check back before you choose National Bank for a bonus.{" "}
                <a href="https://www.nbc.ca/personal/accounts.html" target="_blank" rel="noopener noreferrer">National Bank accounts</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Simplii Financial (No Fee Chequing)</div>
              <div className="kvv">
                Verified November 13, 2026: <strong>$350</strong> cash on the No Fee Chequing Account for new Simplii
                clients. Open the account by January 31, 2027, set up recurring direct deposits within 150 days of
                opening it, and keep at least $100 a month coming in for four consecutive months. The cash lands
                within three business days of meeting the conditions. No monthly fee and no minimum balance.
                Simplii is a division of CIBC and a CDIC member.{" "}
                <a href="https://www.simplii.com/en/special-offers/no-fee-chequing-account.html" target="_blank" rel="noopener noreferrer">Simplii chequing offer</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Tangerine (Chequing Account)</div>
              <div className="kvv">
                Verified November 13, 2026: <strong>$250</strong> for opening a Tangerine Chequing Account within 60 days of
                creating a Client Number and setting up payroll direct deposits of at least $200 a month, with the
                first deposit within 60 days and deposits continuing for at least two consecutive months. No monthly
                fee. The offer covers Client Numbers created through April 30, 2027. Tangerine is owned by Scotiabank and is a CDIC
                member.{" "}
                <a href="https://www.tangerine.ca/en/" target="_blank" rel="noopener noreferrer">Tangerine</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">RBC (Signature No Limit Banking)</div>
              <div className="kvv">
                Verified November 13, 2026: the earlier iPad promotion has ended and RBC is back to cash. Open your
                first RBC Signature No Limit Banking ($16.95 a month) or VIP Banking ($30 a month) account by March 1,
                2027 and complete two of three activities by May 10, 2027 (move your full payroll or pension direct
                deposit, set up two pre-authorized payments, or set up two bill payments) for <strong>$500</strong>,
                plus a <strong>$100</strong> anniversary bonus if the account stays open 13 months, for{" "}
                <strong>up to $600</strong>. RBC also advertises up to $1,000 if you open an eligible RBC credit card
                too, and students get <strong>$150</strong> on RBC Advantage Banking for students (offer ends May 31,
                2027). The offer is for new RBC personal banking clients, so read the eligibility rules in RBC&apos;s terms.{" "}
                <a href="https://www.rbcroyalbank.com/bank-accounts/new-bank-accounts-offers-canada.html" target="_blank" rel="noopener noreferrer">RBC chequing offer</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">BMO (Performance / Premium Chequing)</div>
              <div className="kvv">
                Verified November 13, 2026: <strong>up to $1,100</strong> in cash. Open and fund a new BMO Performance
                or Premium chequing account by March 1, 2027, set up a recurring direct deposit of at least $500 and
                make two $50 bill payments or two $50 pre-authorized debits (to two different payees) by April 30,
                2027 for <strong>$800</strong>. Add a Savings Amplifier Account by March 1, 2027 with $10,000 or more
                deposited within 30 days, kept there for four months plus another 90 days, for another <strong>$200</strong>, and
                get approved for an eligible BMO credit card for another <strong>$100</strong>. BMO also adds a
                Walmart+ membership for up to 12 months. BMO plans carry a monthly fee that is typically waived with
                a minimum balance.{" "}
                <a href="https://www.bmo.com/en-ca/main/personal/bank-accounts/new-bank-account-offers-and-promotions/" target="_blank" rel="noopener noreferrer">BMO bank account offers</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">EQ Bank (no-fee everyday account)</div>
              <div className="kvv">
                EQ Bank offers a no-monthly-fee everyday account that works much like a chequing account, and it is
                better known for a strong savings rate than for a cash sign-up bonus. We could not read a live
                chequing welcome offer from EQ Bank&apos;s page at the time of writing, so treat it as a low-fee
                account to consider on its own merits rather than a bonus play, and confirm any current promotion on
                its site. EQ Bank is a trade name of Equitable Bank, a CDIC member.{" "}
                <a href="https://www.eqbank.ca/" target="_blank" rel="noopener noreferrer">EQ Bank</a>.
              </div>
            </div>
          </div>

          <div className="cd-note">
            <div className="cap">Offers change; this is a snapshot</div>
            <p className="sub">
              The bold figures above were verified on November 13, 2026 against each bank&apos;s own materials, but bank
              account promos change and expire often. Confirm the current offer and its conditions on the
              bank&apos;s own page before you open an account. Treat this as a map of the landscape, not a live
              quote.
            </p>
          </div>

          {/* HOW */}
          <h2 id="how" className="cd-sec">How these bonuses actually work</h2>
          <p>
            The mechanics are similar from bank to bank. You open an eligible chequing account during the promotion
            window, then complete a short list of qualifying activities inside a set number of days. The most common
            requirement is one or more recurring direct deposits, usually your payroll or a government benefit, of at
            least a minimum amount. Many offers add a second hurdle: a couple of pre-authorized payments, some online
            bill payments, or a set number of debit transactions. The bonus is paid a few months after you qualify,
            not the day you open, and several offers ask you to keep the account open for around a year.
          </p>
          <p>
            The important thing to understand is that the headline number is almost always a maximum. When a bank
            says &quot;up to&quot; a figure, that top amount usually assumes you also open a savings account or a
            credit card and meet every single condition. If you only want the chequing account, you will earn the
            chequing portion, which can be a good deal on its own but is smaller than the advertised ceiling. Read
            the offer terms and add up only the parts you will actually complete.
          </p>

          {/* FEES */}
          <h2 id="fees" className="cd-sec">Watch the monthly fee</h2>
          <p>
            The biggest bonuses tend to sit on full-service accounts that carry a monthly fee, often somewhere in
            the roughly $16 to $30 range at the big banks. That fee is usually waived if you keep a minimum balance
            in the account, commonly around $3,000 to $6,000, or sometimes if you meet another condition like a
            certain number of transactions or a bundled product. If you can comfortably park the minimum balance,
            the fee effectively disappears and the bonus is close to pure upside.
          </p>
          <p>
            If you cannot keep the minimum balance, do the math before you commit. A $30 monthly fee is $360 a year,
            which can swallow most of a $300 or $400 bonus. In that case a no-fee account like Simplii or Tangerine,
            or waiving the fee at a big bank, often leaves you further ahead. The no-fee online accounts never charge
            you to keep the account open, so their smaller bonus can be worth more in your pocket than a larger one
            that comes with a fee you cannot avoid.
          </p>
          <div className="cd-note">
            <div className="cap">A simple way to compare</div>
            <p className="sub">
              Take the bonus you would actually qualify for, then subtract any monthly fees you cannot waive over
              the time you plan to keep the account. The result is your real reward. A $250 no-fee bonus can quietly
              beat a $500 bonus that comes with a fee you keep paying.
            </p>
          </div>

          {/* SWITCHING */}
          <h2 id="switching" className="cd-sec">Is switching for a bonus worth it?</h2>
          <p>
            Switching your everyday banking to chase a welcome bonus is a real and legitimate tactic, and plenty of
            organized people do it every year. A few hundred dollars for moving a direct deposit and setting up a
            couple of payments is a strong return on an afternoon of admin. The trick is to treat it like a small
            project: note the exact conditions and their deadlines, set a reminder for when the bonus should arrive,
            and another for any minimum-open period before you close the account.
          </p>
          <p>
            The honest caveats are worth stating. You have to genuinely meet the conditions, which usually means
            routing your actual payroll, not a token transfer, to the new account. You need to watch for a monthly
            fee that is not waived. And you should keep the account open long enough to satisfy the terms, since some
            banks can claw back a bonus if you close early. If reading fine print and juggling deadlines is not your
            idea of a good time, the reward may not justify the hassle. If you are the type who keeps a spreadsheet,
            this is one of the more dependable perks in Canadian banking.
          </p>

          {/* CARDS */}
          <h2 id="cards" className="cd-sec">Not the same as a credit-card bonus</h2>
          <p>
            It is worth being clear that a chequing account bonus and a credit-card welcome bonus are two different
            rewards. A chequing bonus is cash (or occasionally a perk, like BMO&apos;s Walmart+ membership right now) for opening a bank account and meeting
            deposit and activity conditions, and opening the account itself usually does not involve a hard credit
            check. A credit-card welcome bonus is points or cash back for being approved for a card and hitting a
            minimum spend, and that does require a credit application.
          </p>
          <p>
            The good news is you can pursue both, and some bank offers even reward you for doing exactly that by
            adding cash when you open a credit card alongside the chequing account. If you are weighing which card to
            pair with a new account, our cards section lays out the current welcome bonuses and everyday earn rates
            in plain language, so you can line up a chequing bonus and a card bonus without double-counting either.
          </p>

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
            A chequing bonus is a nice one-time boost, but the account it lives in usually pays little on your
            balance. The money you are not spending belongs somewhere that actually earns, so it pairs naturally
            with a good high-interest savings account, a laddered set of GICs, and the right credit card for your
            spending.
          </p>
          <div className="cta-row">
            <Link href="/personal-finance/best-savings-account-rates-canada" className="cd-apply">
              Best high-interest savings rates in Canada &rarr;
            </Link>
            <Link href="/personal-finance/best-gic-rates-canada" className="cd-apply">
              Best GIC rates in Canada &rarr;
            </Link>
            <Link href="/personal-finance/where-to-hold-cash-canada" className="cd-apply">
              Where to hold your cash in Canada &rarr;
            </Link>
            <Link href="/cards" className="cd-apply">
              Browse cards &amp; bonuses &rarr;
            </Link>
            <Link href="/personal-finance" className="cd-apply">
              More personal finance &rarr;
            </Link>
          </div>
          <Comments path="/personal-finance/best-chequing-account-bonuses-canada" />
        </div>
      </main>
    </div>
  );
}
