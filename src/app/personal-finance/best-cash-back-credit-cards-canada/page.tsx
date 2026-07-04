import Link from "next/link";
import { ArticleTags } from "@/components/ArticleTags";
import { allCards, formatCurrency, type Card } from "@/data/cards";

export const metadata = {
  title: "The best cash-back credit cards in Canada | FinTerminal",
  description:
    "Our pick of the best cash-back credit cards in Canada, organized by how you actually spend: best no-annual-fee, best for groceries, best flat-rate everyday, and best premium. Every fee, earn rate, and value figure comes straight from our own card data. Our view as of July 2026, not advice.",
};

export const revalidate = 3600;

// ── Pull every figure from OUR card data, by slug, so the page stays accurate ──
// as the underlying data updates. We only ever read fields that exist in our
// Card interface (annual_fee, first_year_fee, welcome_bonus, welcome_bonus_value,
// first_year_value, earn_rates, benefits, foreign_transaction_fee). Nothing here
// is invented; if a value is not in the data, we simply do not show it.

function cardBySlug(slug: string): Card {
  const c = allCards.find((x) => x.slug === slug);
  if (!c) throw new Error(`best-cash-back-credit-cards-canada: unknown card slug "${slug}"`);
  return c;
}

// A pick is a curated slug plus a short, honest human note (the catch). The
// numbers rendered next to each pick are read live from the card by slug.
interface Pick {
  slug: string;
  blurb: string; // why it earns a spot, in our words
  catch: string; // the honest downside, grounded in the data
}

interface Category {
  id: string;
  label: string;
  intro: string;
  picks: Pick[];
}

const CATEGORIES: Category[] = [
  {
    id: "no-fee",
    label: "Best no-annual-fee cash back",
    intro:
      "If you would rather not pay a fee at all, these cards give you back a slice of your spending for nothing. The rates are lower than the premium cards further down, but there is no fee working against you, so every dollar of cash back is pure upside.",
    picks: [
      {
        slug: "wealthsimple-cash-back-visa",
        blurb:
          "A clean flat 2 percent back on everything, with no annual fee and no foreign transaction fee, which is genuinely rare. If you do not want to think about categories, a single 2 percent rate on every purchase is hard to beat for the money (which is nothing).",
        catch:
          "There is no welcome bonus in our data, so the value is all in the ongoing earn. It is tied to the Wealthsimple ecosystem, so it suits people who already use or are happy to open a Wealthsimple account.",
      },
      {
        slug: "simplycash-card-from-american-express",
        blurb:
          "No annual fee, a straightforward 2 percent back on gas and groceries, and a welcome bonus of up to $100 in the first three months. A tidy no-fee everyday card for households that spend on the essentials.",
        catch:
          "It is an Amex, so acceptance is not universal, and everything outside gas and groceries earns the lower base rate. It also charges foreign transaction fees on purchases abroad.",
      },
      {
        slug: "cibc-dividend-visa-card",
        blurb:
          "No annual fee with 2 percent back on groceries, which is a solid base for a grocery-heavy household that does not want to pay for the privilege. Being a Visa, it is accepted just about everywhere.",
        catch:
          "Our data shows no dollar welcome bonus on this one, so the value is all in the ongoing cash back, and everything outside groceries and the mid-tier categories earns a modest base rate.",
      },
    ],
  },
  {
    id: "groceries",
    label: "Best for groceries",
    intro:
      "Groceries are one of the biggest line items in most Canadian budgets, so a high grocery rate compounds fast. These are the strongest grocery earners in our data. They carry a fee, so they pay off best if your grocery spend is high enough to clear that fee comfortably.",
    picks: [
      {
        slug: "bmo-cashback-world-elite-mastercard",
        blurb:
          "The top grocery rate in our data at 5 percent, plus 4 percent on transit and 3 percent on gas and EV charging. With a sizeable welcome offer whose value includes a first-year fee rebate, it posts the highest estimated first-year value of any cash-back card we track.",
        catch:
          "The grocery rate is capped by a monthly spend limit at the issuer, and the fee returns in year two, so it is best for households with steady, meaningful grocery spending. It also charges foreign transaction fees.",
      },
      {
        slug: "cibc-dividend-visa-infinite-card",
        blurb:
          "A strong 4 percent back on gas, EV charging, and groceries together, plus 2 percent on transport, dining, bills, and travel. As a Visa Infinite it is widely accepted, and the welcome offer includes a first-year fee rebate.",
        catch:
          "It carries an annual fee and a minimum income requirement typical of Infinite cards, and it charges foreign transaction fees abroad.",
      },
    ],
  },
  {
    id: "premium",
    label: "Best premium cash back (higher earn for a fee)",
    intro:
      "Pay a fee, earn more. These cards ask for an annual fee but return richer rates across the categories most people spend on. The math works when your spending in the bonus categories is high enough that the extra cash back clears the fee and then some.",
    picks: [
      {
        slug: "td-cash-back-visa-infinite-card",
        blurb:
          "A flat 3 percent on groceries, gas, EV charging, and transit, and another 3 percent on recurring bills and streaming. That is a wide net of everyday categories at a single high rate, and the welcome offer includes a first-year fee rebate.",
        catch:
          "It carries an annual fee and the usual Infinite income requirement, everything else earns the base rate, and it charges foreign transaction fees.",
      },
      {
        slug: "simplycash-preferred-card-from-americanexpress",
        blurb:
          "A high 4 percent back on both gas and groceries, and 2 percent on everything else, which is one of the simplest premium structures around. The welcome offer adds up to $250 in bonus value early on.",
        catch:
          "It is an Amex, so acceptance is not universal, it carries an annual fee, and it charges foreign transaction fees on spending abroad.",
      },
    ],
  },
  {
    id: "flat-rate",
    label: "Best flat-rate everyday",
    intro:
      "If you would rather not track categories at all, a flat rate on every purchase keeps things simple and rewards the spending that does not fit a neat category. Here are the flat-rate earners we like.",
    picks: [
      {
        slug: "wealthsimple-cash-back-visa",
        blurb:
          "Our overall flat-rate pick: 2 percent on absolutely everything, no annual fee, and no foreign transaction fee. For a no-fuss card you can use on any purchase at home or abroad, this is the one to beat.",
        catch:
          "No welcome bonus in our data, and it sits inside the Wealthsimple ecosystem, so it fits best if you are comfortable there.",
      },
      {
        slug: "rbc-cash-back-preferred-world-elite-mastercard",
        blurb:
          "A flat 1.5 percent on the first $25,000 of purchases each year (1 percent after that), from a big-bank issuer with a World Elite feature set. A reasonable flat-rate option if you want a major-bank card and value the World Elite perks.",
        catch:
          "The 1.5 percent rate is capped at $25,000 of annual spend, it carries an annual fee, and it charges foreign transaction fees. The flat rate is lower than our no-fee 2 percent pick.",
      },
    ],
  },
  {
    id: "dining",
    label: "Best for dining out",
    intro:
      "If a big chunk of your spending goes to restaurants, bars, and coffee shops, a card that pays extra there can add up over a year.",
    picks: [
      {
        slug: "simplii-financial-cash-back-visa-card",
        blurb:
          "A standout 4 percent back on restaurants, bars, and coffee shops, no annual fee, and a welcome offer of up to $100 in the first three months. For a dining-heavy no-fee card, this is our pick.",
        catch:
          "The top rate is limited to the dining category and capped in spend by the issuer, and most other spending earns a low base rate. It also charges foreign transaction fees.",
      },
    ],
  },
];

// The set of slugs we actually feature, for the data note and to guard accuracy.
const FEATURED_SLUGS = Array.from(new Set(CATEGORIES.flatMap((c) => c.picks.map((p) => p.slug))));

const FAQ = [
  {
    q: "What is the best cash-back credit card in Canada?",
    a: "There is no single best card, because the right one depends on where your money goes. In our view, for a no-fee card the best all-rounder is a flat 2 percent card with no annual fee and no foreign transaction fee, and for a fee-paying card the best value comes from a premium grocery-and-everyday earner if your spending in those categories is high enough to clear the fee. This roundup is organized by use case so you can match a card to your own spending. Our rankings are our own view, built from our card data as of July 2026, and card terms change, so confirm the current details with the issuer before you apply.",
  },
  {
    q: "Is cash back better than points?",
    a: "It depends on how you like to be rewarded. Cash back is simple and predictable: you earn a percentage of your spending and it comes back as a statement credit or deposit, with no redemption puzzle. Points can be worth more per dollar spent, especially travel points redeemed well, but only if you actually use them that way, and their value swings with how you redeem. If you want zero effort and guaranteed value, cash back usually wins. If you travel and enjoy optimizing, points can pull ahead. See our how-we-value-points page for how we put a dollar figure on points across programs.",
  },
  {
    q: "Do cash-back cards charge foreign transaction fees?",
    a: "Most do. In our data, nearly every Canadian cash-back card charges a foreign transaction fee (commonly around 2.5 percent) on purchases made in another currency. A rare exception among the cards here is one flat-rate no-fee card that also waives the foreign transaction fee, which makes it handy for spending abroad. If you travel or shop in other currencies often, check the foreign transaction fee on the individual card page before you rely on it overseas.",
  },
  {
    q: "How do you estimate a card's first-year value?",
    a: "We take the welcome bonus value from our data and subtract the fee you actually pay in year one, using the first-year fee where the card waives or reduces it and the regular annual fee otherwise. That gives a like-for-like first-year figure across cards. It does not include the ongoing cash back you would earn from everyday spending, since that depends entirely on how much you spend and where, so treat our first-year value as the headline offer minus the fee, not a total return. Every figure on this page comes from our own card data.",
  },
  {
    q: "Is it worth paying an annual fee for a cash-back card?",
    a: "It comes down to your spending in the card's bonus categories. A fee card only pays off once the extra cash back it earns clears the fee and then some. Roughly, take the difference between the fee card's rate and a no-fee 2 percent card in the category you spend on most, and see how much annual spending it takes for that gap to cover the fee. For a card paying 5 percent on groceries versus a flat 2 percent card, the 3 percent edge covers a $139 fee at about $4,600 of yearly grocery spend, and everything above that is profit. If your spending in those categories is high and steady, a fee card usually wins; if it is spread thin, a no-fee flat card is often the smarter pick. These are illustrations, not advice, and the figures come from our own card data as of July 2026.",
  },
];

function feeText(c: Card): string {
  if (c.annual_fee === 0) return "no annual fee";
  const base = `${formatCurrency(c.annual_fee, c.country)} annual fee`;
  if (c.first_year_fee != null && c.first_year_fee !== c.annual_fee) {
    return `${base} (${formatCurrency(c.first_year_fee, c.country)} in the first year)`;
  }
  return base;
}

export default function BestCashBackCardsPage() {
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
            <span className="cur">best-cash-back-credit-cards-canada</span>
          </nav>

          <div className="head"><h1>The Best Cash-Back Credit Cards in Canada</h1></div>
          <p className="lede">
            Cash back is the friendliest reward there is. You earn a percentage of what you spend, it comes back as a
            statement credit or a deposit, and there is no redemption puzzle to solve. The catch is that the best card
            for you depends entirely on where your money goes, so instead of crowning one winner, we have organized our
            picks by how people actually shop: the best no-annual-fee cards, the best for groceries, the best flat-rate
            everyday cards, the best premium earners, and the best for dining out. Every fee, earn rate, welcome bonus,
            and value figure below is pulled straight from our own card data, and each pick links to its full card page
            so you can check the details yourself.
          </p>
          <div className="docmeta">
            <span className="gd">PERSONAL FINANCE</span><span className="sep">·</span>
            <span>about 8 min read</span><span className="sep">·</span>
            <span>Our view as of July 2026; card offers and earn rates change, not advice</span>
          </div>
          <ArticleTags path="/personal-finance/best-cash-back-credit-cards-canada" />

          <div className="cd-note">
            <div className="cap">The short answer</div>
            <p style={{ margin: 0 }} className="sub">
              If you want one no-fee card and no fuss, a flat 2 percent card with no annual fee and no foreign
              transaction fee is the best all-rounder in our data. If your grocery and everyday spending is high, a
              premium card that pays 4 to 5 percent on groceries can return far more, once its fee is covered. Match the
              card to your biggest categories and you will almost always beat a generic pick. These are our rankings,
              built from our card data as of July 2026. Card offers and earn rates change; confirm the current terms with
              the issuer before you apply, and see the card page for full details.
            </p>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              <a href="#how">How we picked, and cash back vs points</a>
              {CATEGORIES.map((cat) => (
                <a key={cat.id} href={`#${cat.id}`}>{cat.label}</a>
              ))}
              <a href="#faq">Frequently asked questions</a>
            </div>
          </div>

          {/* HOW WE PICKED */}
          <div id="how" className="cd-sec" style={{ scrollMarginTop: 70 }}>How we picked, and cash back vs points</div>
          <p>
            These rankings are our own view, drawn entirely from the Canadian cash-back cards in our data. For every
            pick we show, from our data, the annual fee, the standout earn rate or two, the welcome bonus if the card has
            one, and our estimated first-year value, which is the welcome bonus value minus the fee you pay in year one.
            That first-year number is deliberately conservative: it does not include the ongoing cash back you earn from
            everyday spending, because that depends on how much you spend and where. Think of it as the headline offer
            after the fee, not a total return.
          </p>
          <p>
            Before you settle on cash back at all, it is worth a quick gut check on cash back versus points. Cash back is
            simple and guaranteed, which is exactly why a lot of people prefer it. Points can be worth more per dollar,
            especially travel points redeemed well, but only if you actually redeem them that way, and their value moves
            with how you use them. If you want effortless, predictable value, cash back is a great home. If you travel and
            enjoy optimizing, points may pull ahead. We put a dollar figure on points across programs on our{" "}
            <Link href="/how-we-value-points">how we value points</Link> page, which is the same valuation logic behind
            the first-year values you see here.
          </p>
          <div className="cd-note">
            <div className="cap">The best card is the one that fits your spending</div>
            <p style={{ margin: 0 }} className="sub">
              A 5 percent grocery card is only the best card if you actually spend a lot on groceries. A flat 2 percent
              card can quietly beat a flashy tiered card for someone whose spending is spread out. Look at your last few
              months of statements, find your two or three biggest categories, and pick the card that pays the most
              there. Want to compare the full field yourself? Our{" "}
              <Link href="/cards">card explorer</Link> and side-by-side{" "}
              <Link href="/compare">compare tool</Link> let you filter and stack cards on the numbers that matter to you.
            </p>
          </div>

          {/* CATEGORY SECTIONS */}
          {CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <div id={cat.id} className="cd-sec" style={{ scrollMarginTop: 70 }}>{cat.label}</div>
              <p>{cat.intro}</p>
              <div className="kv" style={{ marginTop: 10 }}>
                {cat.picks.map((pick) => {
                  const c = cardBySlug(pick.slug);
                  const topRates = c.earn_rates.filter((e) => !/all other|thereafter/i.test(e.category)).slice(0, 3);
                  return (
                    <div key={cat.id + pick.slug} className="kvrow">
                      <div className="kvk">
                        <Link href={`/cards/${c.slug}`}>{c.name}</Link>
                      </div>
                      <div className="kvv">
                        <p style={{ marginTop: 0 }}>{pick.blurb}</p>
                        <div>
                          <strong>Annual fee:</strong> {feeText(c)}.
                        </div>
                        {topRates.length > 0 && (
                          <div>
                            <strong>Standout earn:</strong>{" "}
                            {topRates.map((e) => `${e.rate} ${e.category.toLowerCase()}`).join(", ")}.
                          </div>
                        )}
                        {c.welcome_bonus && (
                          <div>
                            <strong>Welcome bonus:</strong> {c.welcome_bonus}.
                          </div>
                        )}
                        {c.first_year_value > 0 ? (
                          <div>
                            <strong>Our estimated first-year value:</strong>{" "}
                            {formatCurrency(c.first_year_value, c.country)} (welcome bonus minus the first-year fee).
                          </div>
                        ) : (
                          <div>
                            <strong>Our estimated first-year value:</strong> most of the value here is in the ongoing cash
                            back rather than a welcome bonus.
                          </div>
                        )}
                        <div>
                          <strong>The catch:</strong> {pick.catch}
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <Link href={`/cards/${c.slug}`} className="cd-apply">
                            See the {c.name} details &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="cd-note">
            <div className="cap">Every number here comes from our own data</div>
            <p style={{ margin: 0 }} className="sub">
              We built this roundup entirely from the {FEATURED_SLUGS.length} cash-back cards we feature in our own card
              data, not from any aggregator or competitor list. The fees, earn rates, welcome bonuses, and first-year
              values are read directly from the data, and each card links to its full page. Card offers and earn rates
              change; confirm the current terms with the issuer before you apply, and see the card page for full details.
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
            Picking a cash-back card is really about matching a rate to the categories you already spend on. Once you
            know your top two or three, the field narrows fast. Explore the full lineup, stack cards side by side, and
            read our valuation method below.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/cards" className="cd-apply">
              Explore all cards &rarr;
            </Link>
            <Link href="/compare" className="cd-apply">
              Compare cards side by side &rarr;
            </Link>
            <Link href="/personal-finance/best-travel-credit-cards-canada" className="cd-apply">
              Best travel and rewards cards &rarr;
            </Link>
            <Link href="/how-we-value-points" className="cd-apply">
              How we value points &rarr;
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
