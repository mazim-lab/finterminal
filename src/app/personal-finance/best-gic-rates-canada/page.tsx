import Link from "next/link";
import { ArticleTags } from "@/components/ArticleTags";

export const metadata = {
  title: "Best GIC rates in Canada | FinTerminal",
  description:
    "An honest look at the best GIC rates in Canada across terms, from Oaken and Achieva to EQ Bank, Wealthsimple, and the big banks. Rates as of July 2026, with cashable vs non-redeemable, the ladder strategy, registered GICs, and the CDIC vs credit-union coverage you really get.",
};

export const revalidate = 3600;

const TOC = [
  { id: "short", label: "What is the best GIC rate right now?" },
  { id: "table", label: "The rates, term by term" },
  { id: "cashable", label: "Cashable vs non-redeemable" },
  { id: "ladder", label: "The GIC ladder strategy" },
  { id: "registered", label: "Registered GICs (TFSA, RRSP, FHSA)" },
  { id: "cdic", label: "Is your money actually insured?" },
  { id: "faq", label: "Frequently asked questions" },
];

const FAQ = [
  {
    q: "What is the best GIC rate in Canada right now?",
    a: "As of July 2026, the strongest verified non-redeemable GIC rates from mainstream providers sit around 3.3 to 3.4 percent for a one-year term and around 4.0 percent for five years, from names like Oaken and Achieva. Big banks usually post lower posted rates and expect you to negotiate. Cashable GICs pay less, often around the low-two-percent range, because you are paying for the flexibility to break the term early. GIC rates change often, so confirm the current rate on the provider's own page before you lock in.",
  },
  {
    q: "Do longer GIC terms always pay more?",
    a: "Not always. The yield curve moves around, and there are stretches where a one-year GIC pays more than a two-year, or where the five-year barely beats the one-year. As of July 2026 the curve is fairly flat and even slightly humped at some providers, meaning a mid-length term can out-pay both shorter and longer ones. That is exactly why laddering, spreading money across several terms, tends to beat guessing which single term will win.",
  },
  {
    q: "What is the difference between a cashable and a non-redeemable GIC?",
    a: "A non-redeemable (or non-cashable) GIC locks your money in for the full term and pays the highest rate. A cashable or redeemable GIC lets you take your money out early, usually after a short holding period, but pays a noticeably lower rate in exchange for that flexibility. If you are certain you will not touch the money, non-redeemable pays more. If there is any chance you will need it, a cashable GIC or a high-interest savings account may fit better.",
  },
  {
    q: "Can I hold a GIC inside a TFSA, RRSP, or FHSA?",
    a: "Yes. Most GIC providers offer registered versions of their GICs for TFSA, RRSP, and often FHSA and RRIF accounts. The interest earned inside a TFSA or FHSA is tax-free, and inside an RRSP it grows tax-deferred, which makes a registered GIC a simple, safe way to use contribution room you do not want exposed to market risk. Registered GIC rates are often identical to the non-registered rate for the same term at the same provider.",
  },
  {
    q: "Are GICs covered by CDIC?",
    a: "GICs from CDIC member banks are covered, up to $100,000 per insured category per member institution, and eligible GICs with terms of five years or less are included. GICs from credit unions like Achieva or Saven are not covered by CDIC. Instead they are covered by provincial deposit insurance, which in Manitoba (Achieva) guarantees deposits without a dollar limit and in Ontario (Saven) is handled by FSRA. Both are legitimate, just different regimes, so it is worth knowing which one protects your money.",
  },
  {
    q: "How often do GIC rates change?",
    a: "Often. GIC rates move with the Bank of Canada and with each provider's own funding needs, so a rate you see today can be different next week. Once you buy a GIC your rate is locked for the whole term, which is the point, but the rate on offer for new purchases changes regularly. Use this page to understand the landscape, then click through to the provider's own rate page to confirm the live figure before you commit.",
  },
];

export default function BestGicRatesPage() {
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
            <span className="cur">best-gic-rates-canada</span>
          </nav>

          <div className="head"><h1>Best GIC Rates in Canada</h1></div>
          <p className="lede">
            A GIC is one of the most honest products in Canadian banking. You hand over your money for a fixed
            term, the bank tells you the exact rate up front, and you get every penny back with interest at the
            end. There is no market risk and no fine-print surprise on the return. The only real decisions are how
            long you are willing to lock the money away, whether you want the option to break the term early, and
            which provider pays the most for the term you choose. Below is an honest look at where the best
            Canadian GIC rates sit today, how cashable and non-redeemable GICs differ, how a simple ladder can
            smooth out your returns, and the deposit insurance you actually get with each provider.
          </p>
          <div className="docmeta">
            <span className="gd">PERSONAL FINANCE</span><span className="sep">·</span>
            <span>about 10 min read</span><span className="sep">·</span>
            <span>Rates as of July 2026; general info, not advice</span>
          </div>
          <ArticleTags path="/personal-finance/best-gic-rates-canada" />

          <div className="cd-note">
            <div className="cap">The short answer</div>
            <p style={{ margin: 0 }} className="sub">
              As of July 2026, the strongest verified non-redeemable GIC rates from mainstream providers land
              around 3.3 to 3.4 percent for one year and around 4.0 percent for five years, from names like Oaken
              and Achieva. Cashable GICs pay less, often in the low-two-percent range, because you are paying for
              the freedom to break the term early. Big banks usually post lower rates and expect negotiation. GIC
              rates change often and once you buy, your rate is locked, so confirm the current rate on the
              provider&apos;s own page before you lock in.
            </p>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* SHORT */}
          <div id="short" className="cd-sec" style={{ scrollMarginTop: 70 }}>What is the best GIC rate right now?</div>
          <p>
            There is no single winner, because the best GIC depends on your term and on whether you need the option
            to cash out early. For a locked, non-redeemable GIC, the online banks and credit unions consistently
            beat the big banks&apos; posted rates. As of July 2026 the leaders we could verify pay in the mid-three
            percent range for one year and around four percent for five years. If you want the flexibility to break
            the term, a cashable GIC will pay noticeably less, and for money you genuinely might need soon, a
            high-interest savings account can be the better home.
          </p>
          <p>
            The figures below come from each provider&apos;s own rate pages, checked in July 2026. Some providers,
            including several big banks and a few online banks, load their rates dynamically or only display them
            after you sign in, so we could not confirm an exact live number for every name. Where that is the case
            we say so plainly and describe the rate qualitatively rather than guess. A finance site that prints a
            wrong rate is worse than useless, so we would rather point you to the source than invent a digit.
          </p>

          {/* TABLE */}
          <div id="table" className="cd-sec" style={{ scrollMarginTop: 70 }}>The rates, term by term</div>
          <p>
            Here is where the mainstream options stand as of July 2026. Rates shown in bold were verified live on
            the provider&apos;s own rate page in July 2026. Where a provider does not expose its rates to a simple
            page read, we describe the level and link you to the source to confirm.
          </p>
          <div className="kv" style={{ marginTop: 10 }}>
            <div className="kvrow">
              <div className="kvk">Oaken Financial (Home Bank / Home Trust)</div>
              <div className="kvv">
                Verified July 2026, annual-pay non-redeemable: <strong>1yr 3.35%</strong>,{" "}
                <strong>18mo 3.45%</strong>, <strong>2yr 3.65%</strong>, <strong>3yr 3.70%</strong>,{" "}
                <strong>4yr 3.75%</strong>, <strong>5yr 4.00%</strong>. Cashable one-year around{" "}
                <strong>2.25%</strong> after the holding period. Registered (RSP/TFSA) GICs currently match the
                non-registered rates. Each deposit is issued by either Home Bank or Home Trust, both separate CDIC
                members. Minimum $1,000.{" "}
                <a href="https://www.oaken.com/gic-rates/" target="_blank" rel="noopener noreferrer">Oaken rate page</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Achieva Financial</div>
              <div className="kvv">
                Verified July 2026, non-redeemable: <strong>1yr 3.60%</strong>, <strong>2yr 3.65%</strong>,{" "}
                <strong>3yr 3.70%</strong>, <strong>4yr 3.75%</strong>, <strong>5yr 4.05%</strong>. A Manitoba
                credit union, so deposits are guaranteed without a dollar limit by the Deposit Guarantee
                Corporation of Manitoba, not CDIC. GICs are not redeemable before maturity.{" "}
                <a href="https://www.achieva.mb.ca/rates" target="_blank" rel="noopener noreferrer">Achieva rate page</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Peoples Trust (Peoples Bank of Canada)</div>
              <div className="kvv">
                Verified July 2026, annual-pay non-registered: <strong>1yr 3.25%</strong>, <strong>2yr 3.00%</strong>,{" "}
                <strong>3yr 3.25%</strong>, <strong>4yr 3.25%</strong>, <strong>5yr 3.45%</strong>. Note the flat,
                slightly humped curve here, a good reminder that longer does not always pay more. Peoples Trust
                Company and Peoples Bank of Canada are CDIC members.{" "}
                <a href="https://www.peoplesgroup.com/personal/resources/account-rates" target="_blank" rel="noopener noreferrer">Peoples Group rate page</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">EQ Bank</div>
              <div className="kvv">
                A long-standing GIC leader among online banks, offering non-redeemable GICs across terms from a few
                months to five years, plus registered (TFSA/RRSP/FHSA) versions. EQ Bank&apos;s site did not expose
                a live rate to us at the time of writing, so confirm the current figure on its page. EQ Bank is a
                trade name of Equitable Bank, a CDIC member.{" "}
                <a href="https://www.eqbank.ca/personal-banking/investments/gic" target="_blank" rel="noopener noreferrer">EQ Bank GIC page</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Wealthsimple GICs</div>
              <div className="kvv">
                Wealthsimple offers non-redeemable GICs across common terms inside registered and non-registered
                accounts, issued through partner institutions. We could not read a live rate from Wealthsimple&apos;s
                page, so confirm the current term rates in the app or on its site. Because Wealthsimple is not a
                bank itself, GICs are held through CDIC-member partner institutions.{" "}
                <a href="https://www.wealthsimple.com/en-ca" target="_blank" rel="noopener noreferrer">Wealthsimple</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Simplii Financial</div>
              <div className="kvv">
                Offers non-registered and registered GICs across one- to five-year terms, held for the full term.
                Simplii&apos;s rate page loads its numbers dynamically and we could not verify an exact live rate,
                so check the current figure on its site. Simplii is a division of CIBC, a CDIC member.{" "}
                <a href="https://www.simplii.com/en/rates/gic-rates.html" target="_blank" rel="noopener noreferrer">Simplii GIC rates</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Tangerine</div>
              <div className="kvv">
                Offers GICs across terms from 90 days to five years. Tangerine&apos;s rate page displays its figures
                dynamically and we could not confirm an exact live number, so confirm the current rate on its site.
                Tangerine is owned by Scotiabank and is a CDIC member.{" "}
                <a href="https://www.tangerine.ca/en/rates/gic-rates" target="_blank" rel="noopener noreferrer">Tangerine GIC rates</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Saven Financial</div>
              <div className="kvv">
                A digital brand of FirstOntario Credit Union that focuses on competitive GICs and savings. Its rate
                table loads dynamically, so we could not verify a live figure here, but Saven historically sits near
                the top of the credit-union pack. Deposits are covered by Ontario credit union insurance through
                FSRA, not CDIC.{" "}
                <a href="https://www.savenfinancial.ca/gic" target="_blank" rel="noopener noreferrer">Saven GIC page</a>.
              </div>
            </div>
            <div className="kvrow">
              <div className="kvk">Big banks (RBC, TD, Scotiabank, BMO, CIBC)</div>
              <div className="kvv">
                The big banks offer the full range of cashable and non-redeemable GICs, including registered
                versions, but their posted non-redeemable rates are usually well below the online banks and credit
                unions above. Their posted numbers are often a starting point for negotiation, especially on larger
                deposits, so it can be worth asking. All five are CDIC members. Confirm current posted rates on each
                bank&apos;s own GIC page.
              </div>
            </div>
          </div>

          <div className="cd-note">
            <div className="cap">Rates change; this is a snapshot</div>
            <p style={{ margin: 0 }} className="sub">
              The bold figures above were verified in July 2026 against each provider&apos;s own materials, but GIC
              rates move with the Bank of Canada and with each provider&apos;s funding needs. Once you buy, your
              rate is locked for the term, which is the whole point, but the rate on offer for new purchases keeps
              changing. Treat this as a map of the landscape, not a live quote, and confirm the current figure on
              the provider&apos;s own rate page before you lock in.
            </p>
          </div>

          {/* CASHABLE */}
          <div id="cashable" className="cd-sec" style={{ scrollMarginTop: 70 }}>Cashable vs non-redeemable</div>
          <p>
            This is the first fork in the road, and it decides both your rate and your flexibility. A non-redeemable
            GIC (sometimes called non-cashable) locks your money in for the entire term. You cannot pull it out
            early except in narrow hardship situations, and in exchange the provider pays you the highest rate on
            offer. A cashable or redeemable GIC lets you take your money back early, usually after a short holding
            period like 30 or 90 days, but pays a lower rate because you are buying the option to change your mind.
          </p>
          <p>
            The gap between the two is real. At the same provider, a cashable GIC can pay a full percentage point or
            more below the non-redeemable rate for a similar term. So the honest question is not which pays more,
            it is how sure you are that you will leave the money alone. If you are certain, take the non-redeemable
            rate. If there is a real chance you will need the cash, either choose a cashable GIC or keep that money
            in a high-interest savings account, which stays fully liquid while still paying a competitive rate.
          </p>

          {/* LADDER */}
          <div id="ladder" className="cd-sec" style={{ scrollMarginTop: 70 }}>The GIC ladder strategy</div>
          <p>
            A GIC ladder is the simplest way to stop guessing which term will win. Instead of putting your whole
            balance into one term, you split it into equal pieces across several terms. A classic five-year ladder
            divides your money into five parts and buys a one-year, two-year, three-year, four-year, and five-year
            GIC. Each year one rung matures, and you either take the cash or reinvest it into a fresh five-year GIC
            at the back of the ladder.
          </p>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <div className="st">Split the balance</div>
              <p>
                Divide the money you want in GICs into equal portions, one per rung. A five-rung ladder uses five
                equal pieces across one through five years.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <div className="st">Reinvest at maturity</div>
              <p>
                Each year one GIC matures. Roll it into a new longest-term GIC (a five-year, in a five-year ladder).
                After the first full cycle, every rung is earning the higher long-term rate.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <div className="st">Enjoy the balance of the two</div>
              <p>
                You always have money maturing soon, which gives you regular access and a chance to catch rising
                rates, while most of your balance still earns the better long-term rate. You never have to time the
                market or bet on one term.
              </p>
            </div>
          </div>
          <p>
            The ladder shines exactly when the yield curve is flat or humped, like it is at some providers as of
            July 2026, because you stop needing to predict whether short or long terms will pay more. You simply
            hold a bit of each and let the average work for you.
          </p>

          {/* REGISTERED */}
          <div id="registered" className="cd-sec" style={{ scrollMarginTop: 70 }}>Registered GICs (TFSA, RRSP, FHSA)</div>
          <p>
            A GIC does not have to sit in a plain taxable account. Most providers offer registered versions that
            live inside your TFSA, RRSP, and often your FHSA or RRIF. The GIC itself works the same way, a fixed
            rate for a fixed term, but the tax treatment of the interest changes depending on the account.
          </p>
          <ul>
            <li>
              <strong>TFSA GIC:</strong> the interest is completely tax-free, and withdrawals do not count as
              income. A tidy way to use TFSA room you do not want exposed to the stock market.
            </li>
            <li>
              <strong>RRSP GIC:</strong> the interest grows tax-deferred, and you pay tax only when you eventually
              withdraw, ideally in retirement at a lower rate. Good for the fixed-income slice of a registered
              portfolio.
            </li>
            <li>
              <strong>FHSA GIC:</strong> if you are saving for a first home, an FHSA GIC gives you a deduction on
              the way in and tax-free growth and withdrawal for a qualifying home purchase, with zero market risk
              on the timeline that matters.
            </li>
          </ul>
          <p>
            At most providers the registered GIC rate matches the non-registered rate for the same term, so you are
            not giving up yield to get the tax shelter. Because GIC interest is otherwise fully taxable as ordinary
            income, holding GICs inside a registered account is often the most tax-efficient place for them.
          </p>

          {/* CDIC */}
          <div id="cdic" className="cd-sec" style={{ scrollMarginTop: 70 }}>Is your money actually insured?</div>
          <p>
            Deposit insurance is a big part of why a GIC feels so safe, but not every provider is insured the same
            way. The differences matter most when your balance climbs past the coverage limit.
          </p>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <div className="st">CDIC banks</div>
              <p>
                EQ Bank (Equitable Bank), Oaken (through Home Bank and Home Trust), Peoples Trust, Simplii (CIBC),
                Tangerine (Scotiabank), and the big five are CDIC members. Eligible GICs with terms of five years or
                less are insured up to $100,000 per insured category, per member institution. Oaken is worth a
                special note: because it issues through two separate CDIC members, you can hold coverage under each.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <div className="st">Credit unions</div>
              <p>
                Achieva, based in Manitoba, is covered by the Deposit Guarantee Corporation of Manitoba, which
                guarantees deposits without a dollar limit. Saven, a brand of FirstOntario Credit Union in Ontario,
                is covered by Ontario&apos;s credit union deposit insurance through FSRA. Both are legitimate, they
                are simply not CDIC, so the rules and limits differ.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <div className="st">Not-a-bank providers</div>
              <p>
                Wealthsimple is not a bank itself, so the GICs it offers are held through CDIC-member partner
                institutions rather than insured by Wealthsimple directly. The protection is real, but the
                structure is different from buying a GIC straight from a bank, so it is worth understanding how the
                coverage flows through to you.
              </p>
            </div>
          </div>
          <p>
            The practical takeaway: if you are placing more than $100,000 in GICs, spread it across separate insured
            institutions (or, at Oaken, across its two issuers) so every dollar stays within coverage.
          </p>

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
            A GIC is the locked-in cousin of a good savings account, and the two work best as a pair: liquid cash in
            savings, longer-term money laddered in GICs. It also fits alongside picking the right card and the rest
            of our plain-language personal-finance guides.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/personal-finance/best-savings-account-rates-canada" className="cd-apply">
              Best high-interest savings rates in Canada &rarr;
            </Link>
            <Link href="/personal-finance/best-chequing-account-bonuses-canada" className="cd-apply">
              Best chequing account welcome bonuses in Canada &rarr;
            </Link>
            <Link href="/personal-finance/where-to-hold-cash-canada" className="cd-apply">
              Where to hold your cash in Canada &rarr;
            </Link>
            <Link href="/personal-finance/pay-bills-with-credit-card-canada" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>
              Paying bills with a credit card &rarr;
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
