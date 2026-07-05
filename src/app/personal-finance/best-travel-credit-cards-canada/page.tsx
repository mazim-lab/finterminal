import Link from "next/link";
import { ArticleTags } from "@/components/ArticleTags";
import { allCards, formatCurrency, type Card } from "@/data/cards";
import { ArticleHero } from "@/components/ArticleHero";
import { DataGridMotif } from "@/components/heroes/motifs";
import { ogMeta } from "@/lib/og";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata = {
  title: "The best travel and rewards credit cards in Canada | FinTerminal",
  description:
    "Our pick of the best travel and rewards credit cards in Canada, organized by how you actually travel: best premium card, best no-annual-fee, best for Aeroplan, best for flexible transferable points, best for lounge access, and best for no foreign transaction fees. Every fee, earn rate, and value figure comes straight from our own card data. Our view as of July 2026, not advice.",
  ...ogMeta("The best travel and rewards credit cards in Canada", "Personal finance"),
};

export const revalidate = 3600;

// ── Pull every figure from OUR card data, by slug, so the page stays accurate ──
// as the underlying data updates. We only ever read fields that exist in our
// Card interface (annual_fee, first_year_fee, welcome_bonus, welcome_bonus_value,
// first_year_value, earn_rates, benefits, foreign_transaction_fee). Nothing here
// is invented; if a value is not in the data, we simply do not show it.

function cardBySlug(slug: string): Card {
  const c = allCards.find((x) => x.slug === slug);
  if (!c) throw new Error(`best-travel-credit-cards-canada: unknown card slug "${slug}"`);
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
    id: "premium",
    label: "Best premium travel card (high earn and perks for a fee)",
    intro:
      "These are the big-fee, big-perk cards. You pay a real annual fee, and in return you get a large welcome bonus, strong travel earn, and lounge access. The math works when you travel enough that the perks and the points clear the fee and then some. If you fly a few times a year and use the lounges, these are the cards that pull ahead.",
    picks: [
      {
        slug: "the-platinum-card",
        blurb:
          "The flagship Membership Rewards card, and the highest estimated first-year value of the travel cards in this roundup. You get a large welcome bonus, 2x on dining and travel, and airport lounge access in our data. Membership Rewards points transfer to Aeroplan and other partners, so the points are as flexible as they come.",
        catch:
          "It carries the steepest annual fee here by a wide margin, so it only makes sense if you will use the lounge access and travel credits. It is an Amex, so acceptance is not universal, and it charges foreign transaction fees on spending abroad.",
      },
      {
        slug: "americanexpress-aeroplan-reserve-card",
        blurb:
          "The top-tier Aeroplan Amex: 3x on Air Canada, 2x on dining and food delivery, a large Aeroplan welcome bonus, and airport lounge access in our data. If Air Canada is your airline, this stacks Aeroplan points fast and treats you well at the airport.",
        catch:
          "The annual fee is high and only earns back its keep if you fly Air Canada often and value the lounge access. It is an Amex, so acceptance is not universal, and it charges foreign transaction fees abroad.",
      },
    ],
  },
  {
    id: "no-fee",
    label: "Best no-annual-fee travel and points card",
    intro:
      "If you would rather not pay a fee at all, these cards still earn a transferable or travel-linked currency for nothing. The welcome bonuses and earn rates are smaller than the premium cards, but there is no fee working against you, so every point is pure upside. A sensible way to start collecting a points currency before you commit to a fee card.",
    picks: [
      {
        slug: "americanexpressgreen-card",
        blurb:
          "A no-annual-fee card that earns Membership Rewards, the most flexible points currency in Canada, with a welcome bonus and no fee to claw it back. A clean way to start building transferable points you can later move to Aeroplan and other partners.",
        catch:
          "The earn rate is a flat 1x in our data, so it is more of a points starter than a heavy earner. It is an Amex, so acceptance is not universal, and it charges foreign transaction fees abroad.",
      },
      {
        slug: "cibc-aeroplan-visa-card",
        blurb:
          "A no-fee Aeroplan card on the Visa network, so it is accepted just about everywhere. You earn Aeroplan points on gas, EV charging, groceries, and Air Canada, with a welcome bonus and no annual fee to work off.",
        catch:
          "Spending outside the bonus categories earns a reduced base rate in our data, and it charges foreign transaction fees, so it is a domestic everyday earner rather than a card to use overseas.",
      },
      {
        slug: "scotiabank-scene-tm-visa-card",
        blurb:
          "A no-fee Scene+ Visa that earns 2x at Sobeys-family grocers, Home Hardware, and Cineplex, with a small welcome bonus. Scene+ points are easy to redeem for groceries, movies, and travel, which makes this a low-commitment everyday card.",
        catch:
          "The top rate is limited to a few partners and most spending earns the base rate, the welcome bonus is modest, and it charges foreign transaction fees abroad.",
      },
    ],
  },
  {
    id: "aeroplan",
    label: "Best for Aeroplan",
    intro:
      "Aeroplan is Air Canada's program, and if you fly Air Canada it is one of the most rewarding currencies a Canadian can collect. These are the strongest Aeroplan earners in our data below the top premium tier. They carry a fee, so they pay off best if you fly enough to use the points on flights.",
    picks: [
      {
        slug: "td-aeroplan-visa-infinite-card",
        blurb:
          "A popular Aeroplan Visa Infinite: 1.5x on gas, EV charging, groceries, and Air Canada, a solid Aeroplan welcome bonus, and a first-year annual fee rebate in our data. As a Visa Infinite it is widely accepted, which matters if you do not want an Amex.",
        catch:
          "The annual fee returns after the first-year rebate, it carries the usual Infinite income requirement, and it charges foreign transaction fees abroad.",
      },
      {
        slug: "cibc-aeroplan-visa-infinite-card",
        blurb:
          "A close cousin to the TD Aeroplan card: 1.5x on gas, EV, groceries, and Air Canada, and one of the larger Aeroplan welcome bonuses in our data at this fee level. A strong pick if you bank with CIBC or want a second Aeroplan earner.",
        catch:
          "It carries an annual fee and the usual Visa Infinite income requirement, everything outside the bonus categories earns the base rate, and it charges foreign transaction fees.",
      },
      {
        slug: "americanexpress-aeroplan-card",
        blurb:
          "The mid-tier Aeroplan Amex: 2x on Air Canada, 1.5x on dining and food delivery, and a healthy Aeroplan welcome bonus for a moderate fee. If you already carry an Amex and fly Air Canada, it stacks Aeroplan points nicely on dining.",
        catch:
          "It is an Amex, so acceptance is not universal, it carries an annual fee, and it charges foreign transaction fees on spending abroad.",
      },
    ],
  },
  {
    id: "flexible",
    label: "Best for flexible transferable points",
    intro:
      "Transferable points are the most valuable kind, because you are not locked into one airline. Amex Membership Rewards and RBC Avion (on eligible RBC cards) both let you move points to airline and travel partners, so you can find the sweet spot instead of taking whatever a co-brand card gives you. These are our picks for flexibility. See our points transfer partners page for where each currency can go and which cards qualify.",
    picks: [
      {
        slug: "americanexpress-cobalt-card",
        blurb:
          "One of the best everyday earners in Canada: 5x on eats and drinks, 3x on streaming, and 2x on gas, transit, and ride share, all in flexible Membership Rewards points. If a big share of your spending is food and groceries, few cards build transferable points faster.",
        catch:
          "The fee is billed monthly and the welcome bonus in our data is smaller than the headline cards, it is an Amex so acceptance is not universal, and it charges foreign transaction fees abroad.",
      },
      {
        slug: "americanexpress-gold-rewards-card",
        blurb:
          "A flexible Membership Rewards card with 2x on travel and everyday purchases and a large welcome bonus, posting one of the higher estimated first-year values in our data. Points transfer to Aeroplan and other partners, so you keep your redemption options open.",
        catch:
          "It carries a mid-to-high annual fee, it is an Amex so acceptance is not universal, and it charges foreign transaction fees on spending abroad.",
      },
      {
        slug: "rbc-avion-visa-infinite",
        blurb:
          "The flexible-points pick for people who want a Visa. Avion points can transfer to airline partners on eligible RBC cards, so you keep your redemption options open, and it earns 1.25x on travel with a large welcome bonus and a strong estimated first-year value in our data. See our points transfer partners guide for which RBC cards transfer and at what ratios.",
        catch:
          "The base earn rate is modest outside travel, it carries an annual fee and the usual Infinite income requirement, and it charges foreign transaction fees abroad.",
      },
    ],
  },
  {
    id: "lounge",
    label: "Best for lounge access",
    intro:
      "If time in the airport is time you would rather spend in a lounge, these cards include lounge access in our data. Lounge access is a perk that quietly justifies a fee once you travel a few times a year, between the food, the wifi, and somewhere quiet to wait.",
    picks: [
      {
        slug: "the-platinum-card",
        blurb:
          "The strongest lounge card in our lineup, with a broad lounge network on top of its large welcome bonus and flexible Membership Rewards earn. If lounge access is the perk you care about most, this is the benchmark.",
        catch:
          "It carries the highest annual fee here, so it only pays off if you travel enough to lean on the lounge access and credits. It is an Amex, and it charges foreign transaction fees abroad.",
      },
      {
        slug: "scotiabank-passport-visa-infinite-card",
        blurb:
          "A rare combination in our data: lounge access, no foreign transaction fee, and Scene+ points, all on a widely accepted Visa Infinite. For a single travel card that covers lounges and spending abroad without an FX penalty, this is our standout.",
        catch:
          "It carries an annual fee and the usual Visa Infinite income requirement, and the number of included lounge visits is limited, so check the current terms on the card page before you rely on it.",
      },
      {
        slug: "td-first-class-travel-visa-infinite-card",
        blurb:
          "A TD Rewards Visa Infinite with lounge access in our data, high earn through Expedia For TD, a large welcome bonus, and a first-year annual fee rebate. A strong all-rounder if you book travel through the TD portal and want lounge access on a Visa.",
        catch:
          "The top earn rate is tied to booking through Expedia For TD, the annual fee returns after the first year, it carries the usual Infinite income requirement, and it charges foreign transaction fees abroad.",
      },
    ],
  },
  {
    id: "no-fx",
    label: "Best for no foreign transaction fees",
    intro:
      "Most Canadian cards add a foreign transaction fee, commonly around 2.5 percent, to every purchase in another currency. Over a trip that adds up. These travel cards waive it in our data, so what you spend abroad is what you pay, and you still earn points on top.",
    picks: [
      {
        slug: "scotiabank-passport-visa-infinite-card",
        blurb:
          "The travel card that ties it all together: no foreign transaction fee, lounge access, and Scene+ points, on a Visa Infinite that is accepted worldwide. If you want one card for trips that does not nickel-and-dime you on every foreign purchase, this is our pick.",
        catch:
          "It carries an annual fee and the usual Visa Infinite income requirement. The lounge visits are limited, so treat the FX savings and points as the main draw.",
      },
      {
        slug: "scotiabank-gold-american-express-card",
        blurb:
          "A high-earning Scene+ Amex with no foreign transaction fee and lounge access in our data, plus rich multipliers on groceries, dining, and entertainment. A strong everyday earner that also behaves well overseas.",
        catch:
          "It is an Amex, so acceptance is not universal, and it carries an annual fee. Its no-FX perk is most useful where Amex is accepted abroad, so many travellers pair it with a Visa or Mastercard.",
      },
    ],
  },
];

// The set of slugs we actually feature, for the data note and to guard accuracy.
const FEATURED_SLUGS = Array.from(new Set(CATEGORIES.flatMap((c) => c.picks.map((p) => p.slug))));

const FAQ = [
  {
    q: "What is the best travel credit card in Canada?",
    a: "There is no single best travel card, because the right one depends on how you travel and where your money goes. In our view, if you fly a lot and will use lounge access, a premium card earning flexible Membership Rewards or Aeroplan points gives the most value once the fee is covered. If you fly Air Canada, a dedicated Aeroplan card is hard to beat. If you want one card for trips abroad, a card that waives the foreign transaction fee and includes lounge access wins. This roundup is organized by use case so you can match a card to how you actually travel. Our rankings are our own view, built from our card data as of July 2026, and card terms change, so confirm the current details with the issuer before you apply.",
  },
  {
    q: "Are points better than cash back for travel?",
    a: "It depends on how you travel and how much effort you want to put in. Travel points, especially flexible ones like Amex Membership Rewards or RBC Avion transferred to an airline partner, can be worth more per dollar than cash back when you redeem them well. But that upside only shows up if you actually book travel and find good redemptions; if you leave points sitting or cash them out at a poor rate, a simple cash-back card can beat them. If you enjoy optimizing and travel regularly, points usually pull ahead. If you want guaranteed, effortless value, cash back is the safer home. See our how-we-value-points page for how we put a dollar figure on points, and our cash-back roundup if you decide cash back suits you better.",
  },
  {
    q: "What are transferable points and why do they matter?",
    a: "Transferable points are currencies like Amex Membership Rewards and RBC Avion (the latter on eligible RBC cards) that you can move to different airline and travel partners rather than being locked into one airline. That flexibility matters because it lets you find the best redemption for a given trip instead of taking whatever a single co-brand card offers. A co-brand card like an Aeroplan card is great if you always fly Air Canada, but a transferable currency keeps your options open across programs. Our points transfer partners page lays out where each currency can go, so you can see which flexibility is worth paying for.",
  },
  {
    q: "Do travel credit cards charge foreign transaction fees?",
    a: "Most do. In our data, the majority of Canadian travel cards charge a foreign transaction fee, commonly around 2.5 percent, on purchases made in another currency, which is exactly the spending you do most on a trip. A handful of cards waive it, and those are the ones we highlight in the no-foreign-transaction-fees section above. If you travel or shop in other currencies often, check the foreign transaction fee on the individual card page before you rely on a card overseas, because that fee can quietly outweigh the points you earn.",
  },
  {
    q: "How do you estimate a card's first-year value?",
    a: "We take the welcome bonus value from our data, valued at our own baseline cents-per-point across programs, and subtract the fee you actually pay in year one, using the first-year fee where the card waives or reduces it and the regular annual fee otherwise. That gives a like-for-like first-year figure across cards. It does not include the ongoing points you would earn from everyday spending, since that depends entirely on how much you spend and where, and point values are estimates that change with how you redeem. Treat our first-year value as the headline offer minus the fee, not a total return. Every figure on this page comes from our own card data.",
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

export default function BestTravelCardsPage() {
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
            <span className="cur">best-travel-credit-cards-canada</span>
          </nav>
          <ArticleSchema headline="The best travel and rewards credit cards in Canada" path="/personal-finance/best-travel-credit-cards-canada" kicker="Personal finance" />

          <ArticleHero variant="graphic" alt="A comparison grid with a highlighted top row">
            <DataGridMotif />
          </ArticleHero>

          <div className="head"><h1>The Best Travel and Rewards Credit Cards in Canada</h1></div>
          <p className="lede">
            A good travel card turns spending you were doing anyway into flights, hotels, and lounge afternoons. The
            catch is that the best one for you depends entirely on how you travel: whether you fly Air Canada, whether
            you want flexible points you can move between airlines, whether lounge access matters, and whether you spend
            abroad enough to care about foreign transaction fees. So instead of crowning one winner, we have organized
            our picks by use case: the best premium card, the best no-annual-fee card, the best for Aeroplan, the best
            for flexible transferable points, the best for lounge access, and the best for no foreign transaction fees.
            Every fee, earn rate, welcome bonus, and value figure below is pulled straight from our own card data, and
            each pick links to its full card page so you can check the details yourself.
          </p>
          <div className="docmeta">
            <span className="gd">PERSONAL FINANCE</span><span className="sep">·</span>
            <span>about 9 min read</span><span className="sep">·</span>
            <span>Our view as of July 2026; card offers and earn rates change, not advice</span>
          </div>
          <ArticleTags path="/personal-finance/best-travel-credit-cards-canada" />

          <div className="cd-note">
            <div className="cap">The short answer</div>
            <p style={{ margin: 0 }} className="sub">
              If you fly a lot and will use the perks, a premium card earning flexible Membership Rewards or Aeroplan
              points returns the most once its fee is covered. If Air Canada is your airline, a dedicated Aeroplan card
              is hard to beat. If you want flexibility, collect a transferable currency like Amex Membership Rewards or
              RBC Avion so you are not locked into one airline. And if you want one card for trips abroad, pick one that
              waives the foreign transaction fee. Match the card to how you travel and you will almost always beat a
              generic pick. These are our rankings, built from our card data as of July 2026. Point values are
              estimates. Card offers, earn rates, and points values change; confirm the current terms with the issuer
              before you apply, and see the card page for full details.
            </p>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              <a href="#how">How we picked, and points vs cash back</a>
              {CATEGORIES.map((cat) => (
                <a key={cat.id} href={`#${cat.id}`}>{cat.label}</a>
              ))}
              <a href="#faq">Frequently asked questions</a>
            </div>
          </div>

          {/* HOW WE PICKED */}
          <div id="how" className="cd-sec" style={{ scrollMarginTop: 70 }}>How we picked, and points vs cash back</div>
          <p>
            These rankings are our own view, drawn entirely from the Canadian travel and rewards cards in our data. For
            every pick we show, from our data, the annual fee, the standout earn rate or two, the welcome bonus if the
            card has one, our estimated first-year value, and notable travel perks like lounge access or a waived
            foreign transaction fee when the data says the card has them. That first-year number is the welcome bonus
            value, priced at our own baseline points valuation, minus the fee you pay in year one. It is deliberately
            conservative: it does not include the ongoing points you earn from everyday spending, because that depends
            on how much you spend and where. Think of it as the headline offer after the fee, not a total return, and
            remember that point values are estimates.
          </p>
          <p>
            Before you commit to a travel card, it is worth a quick gut check on points versus cash back. Travel points
            can be worth more per dollar than cash back, especially flexible points redeemed well, but only if you
            actually book travel and find good redemptions. If you want guaranteed, effortless value, cash back may
            suit you better, and we have a separate{" "}
            <Link href="/personal-finance/best-cash-back-credit-cards-canada">best cash-back cards roundup</Link> for
            that. We put a dollar figure on points across programs on our{" "}
            <Link href="/how-we-value-points">how we value points</Link> page, which is the same valuation logic behind
            the first-year values you see here.
          </p>
          <div className="cd-note">
            <div className="cap">Flexible points keep your options open</div>
            <p style={{ margin: 0 }} className="sub">
              The most valuable points are the ones you are not locked into. Amex Membership Rewards and RBC Avion (on
              eligible RBC cards) both transfer to airline and travel partners, so you can chase the best redemption
              instead of taking whatever a single co-brand card gives you. A co-brand card like an Aeroplan card is great if you always fly Air
              Canada, but a transferable currency travels with you across programs. See our{" "}
              <Link href="/travel/points-transfer-partners-canada">points transfer partners guide</Link> for where each
              currency can go, then compare the full field yourself with our{" "}
              <Link href="/cards">card explorer</Link> and side-by-side{" "}
              <Link href="/compare">compare tool</Link>.
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
                  const perks: string[] = [];
                  if (c.benefits.lounge_access) perks.push("airport lounge access");
                  if (c.benefits.no_fx_fee) perks.push("no foreign transaction fee");
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
                            {formatCurrency(c.first_year_value, c.country)} (welcome bonus, valued at our baseline points
                            estimate, minus the first-year fee).
                          </div>
                        ) : (
                          <div>
                            <strong>Our estimated first-year value:</strong> most of the value here is in the ongoing
                            points rather than a welcome bonus.
                          </div>
                        )}
                        {perks.length > 0 && (
                          <div>
                            <strong>Travel perks:</strong> {perks.join(", ")}.
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
              We built this roundup entirely from the {FEATURED_SLUGS.length} travel and rewards cards we feature in our
              own card data, not from any aggregator or competitor list. The fees, earn rates, welcome bonuses, travel
              perks, and first-year values are read directly from the data, and each card links to its full page. Point
              values are estimates. Card offers, earn rates, and points values change; confirm the current terms with
              the issuer before you apply, and see the card page for full details.
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
            Picking a travel card is really about matching how you travel to what a card rewards. Once you know whether
            you want flexible points, an Aeroplan earner, lounge access, or no foreign transaction fees, the field
            narrows fast. Explore the full lineup, stack cards side by side, see where each points currency can transfer,
            and read our valuation method below.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/cards" className="cd-apply">
              Explore all cards &rarr;
            </Link>
            <Link href="/compare" className="cd-apply">
              Compare cards side by side &rarr;
            </Link>
            <Link href="/travel/points-transfer-partners-canada" className="cd-apply">
              Points transfer partners &rarr;
            </Link>
            <Link href="/travel/airport-lounge-access-canada" className="cd-apply">
              How airport lounge access works &rarr;
            </Link>
            <Link href="/personal-finance/best-cash-back-credit-cards-canada" className="cd-apply">
              Best cash-back cards &rarr;
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
