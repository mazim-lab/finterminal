import Link from "next/link";
import { ogMeta } from "@/lib/og";
import { allCards } from "@/data/cards";
import { NEWS } from "@/data/news";
import { SWEET_SPOTS } from "@/data/sweet-spots";
import { livePFArticles } from "@/data/personal-finance";
import { TAGS, tagCount, MIN_INDEXABLE_TAG_ARTICLES } from "@/data/tags";

export const metadata = {
  title: "Directory | FinTerminal",
  description:
    "The full site directory for FinTerminal: every section and page in one place, from the card explorer and travel guides to personal-finance articles, rates, news, deals, and topic tags.",
  ...ogMeta("Directory", "Directory"),
};

// Human-readable companion to /sitemap.xml. Every dynamic list here reads from
// the SAME data sources sitemap.ts uses (allCards, NEWS, SWEET_SPOTS,
// livePFArticles, TAGS), so the two can never drift apart. For the big groups
// (194 cards, 25 news items) we link the hub plus a scannable subset rather than
// dumping every URL.

// Static travel guides, mirroring the fixed travel paths in sitemap.ts.
const TRAVEL_GUIDES: { href: string; label: string }[] = [
  { href: "/travel/aeroplan-sweet-spots", label: "Using Aeroplan points to get the most value" },
  { href: "/travel/amex-mr-to-aeroplan", label: "Convert Amex Membership Rewards to Aeroplan" },
  { href: "/travel/avios-sweet-spots-rbc-avion-transfer", label: "Avios sweet spots and the RBC Avion transfer" },
  { href: "/travel/rbc-avion-to-aadvantage", label: "Transfer RBC Avion to American AAdvantage" },
  { href: "/travel/aadvantage-sweet-spots", label: "AAdvantage sweet spots" },
  { href: "/travel/points-transfer-partners-canada", label: "The Canadian points-transfer map" },
  { href: "/travel/airline-alliances-guide-canada", label: "Airline alliances guide for Canadians" },
  { href: "/travel/how-to-book-award-flights-canada", label: "How to book award flights from Canada" },
  { href: "/travel/airport-lounge-access-canada", label: "Airport lounge access for Canadians" },
  { href: "/travel/business-class-sweet-spots-canada", label: "Business-class sweet spots from Canada" },
];

// A few high-signal issuer filters into the card explorer (the ?q= param the
// explorer reads). The hub links every one of the cards; these just save a step.
const CARD_QUICK_FILTERS = ["Amex", "RBC", "Scotiabank", "TD", "CIBC", "BMO", "Wealthsimple"];

export default function DirectoryPage() {
  const cardCount = allCards.length;
  const pf = livePFArticles();
  const latestNews = NEWS.slice(0, 10);
  const indexableTags = TAGS.filter((t) => tagCount(t.slug) >= MIN_INDEXABLE_TAG_ARTICLES);

  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <div className="head"><h1>Directory</h1></div>
          <p className="lede">
            Every section and page on FinTerminal, laid out in one place. It is the human-readable
            companion to the <Link className="lnk" href="/sitemap.xml">XML sitemap</Link>, and it
            reads from the same data, so nothing here goes stale.
          </p>

          <h2 className="cd-sec">Cards</h2>
          <ul>
            <li><Link className="lnk" href="/cards">Card explorer</Link>: filter and compare all {cardCount} cards</li>
            <li><Link className="lnk" href="/compare">Side-by-side card comparison</Link></li>
            <li><Link className="lnk" href="/how-we-value-points">How we value points</Link>: the formula behind every ranking</li>
            <li><Link className="lnk" href="/personal-finance/best-cash-back-credit-cards-canada">The best cash-back credit cards in Canada</Link></li>
            <li><Link className="lnk" href="/personal-finance/best-travel-credit-cards-canada">The best travel and rewards credit cards in Canada</Link></li>
          </ul>
          <p className="sub">Jump straight to one issuer:</p>
          <div className="guidestrip">
            {CARD_QUICK_FILTERS.map((issuer) => (
              <Link key={issuer} className="guidechip" href={`/cards?q=${encodeURIComponent(issuer)}`}>
                <span className="gi">&#9656;</span> {issuer} cards
              </Link>
            ))}
          </div>

          <h2 className="cd-sec">Travel &amp; points</h2>
          <ul>
            <li><Link className="lnk" href="/travel">Travel and points hub</Link></li>
            {TRAVEL_GUIDES.map((g) => (
              <li key={g.href}><Link className="lnk" href={g.href}>{g.label}</Link></li>
            ))}
          </ul>
          <p className="sub">Worked sweet-spot examples:</p>
          <ul>
            {SWEET_SPOTS.map((s) => (
              <li key={s.slug}>
                <Link className="lnk" href={`/travel/sweet-spots/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>

          <h2 className="cd-sec">Personal finance</h2>
          <ul>
            <li><Link className="lnk" href="/personal-finance">Personal finance hub</Link></li>
            {pf.map((a) => (
              <li key={a.slug}>
                <Link className="lnk" href={`/personal-finance/${a.slug}`}>{a.title}</Link>
              </li>
            ))}
          </ul>

          <h2 className="cd-sec">Rates</h2>
          <ul>
            <li><Link className="lnk" href="/rates">Live rates dashboard</Link></li>
            <li><Link className="lnk" href="/personal-finance/best-savings-account-rates-canada">Best high-interest savings account rates</Link></li>
            <li><Link className="lnk" href="/personal-finance/best-gic-rates-canada">Best GIC rates in Canada</Link></li>
            <li><Link className="lnk" href="/personal-finance/best-chequing-account-bonuses-canada">Best chequing account welcome bonuses</Link></li>
            <li><Link className="lnk" href="/personal-finance/where-to-hold-cash-canada">Where to hold your cash in Canada</Link></li>
          </ul>

          <h2 className="cd-sec">News</h2>
          <ul>
            <li><Link className="lnk" href="/news">All news</Link></li>
            {latestNews.map((n) => (
              <li key={n.slug}>
                <Link className="lnk" href={`/news/${n.slug}`}>{n.headline}</Link>
              </li>
            ))}
          </ul>

          <h2 className="cd-sec">Deals</h2>
          <ul>
            <li><Link className="lnk" href="/deals">All deals</Link>: current offers, expired ones filtered out</li>
          </ul>

          <h2 className="cd-sec">Tags</h2>
          <ul>
            <li><Link className="lnk" href="/tags">All topics</Link></li>
            {indexableTags.map((t) => (
              <li key={t.slug}>
                <Link className="lnk" href={`/tags/${t.slug}`}>{t.label}</Link>
              </li>
            ))}
          </ul>

          <h2 className="cd-sec">Guides</h2>
          <ul>
            <li><Link className="lnk" href="/guides/us-cards-for-canadians">US credit cards for Canadians</Link></li>
            <li><Link className="lnk" href="/guides/us-cards-for-canadians/interactive">US cards for Canadians: interactive tool</Link></li>
          </ul>

          <h2 className="cd-sec">About &amp; policies</h2>
          <ul>
            <li><Link className="lnk" href="/">Home</Link></li>
            <li><Link className="lnk" href="/portfolio">Portfolio</Link>: real positions, in percent terms</li>
            <li><Link className="lnk" href="/about">About</Link></li>
            <li><Link className="lnk" href="/newsletter">Newsletter</Link></li>
            <li><Link className="lnk" href="/contact">Contact</Link></li>
            <li><Link className="lnk" href="/disclosure">Disclosure</Link></li>
          </ul>
        </div>
      </main>
    </div>
  );
}
