import type { Metadata } from "next";
import Link from "next/link";
import { ogMeta } from "@/lib/og";
import { allCards } from "@/data/cards";
import { NEWS } from "@/data/news";
import { SWEET_SPOTS } from "@/data/sweet-spots";
import { TRAVEL_GUIDES } from "@/data/travel-guides";
import { livePFArticles } from "@/data/personal-finance";
import { TAGS, tagCount, MIN_INDEXABLE_TAG_ARTICLES } from "@/data/tags";
import { programGroups } from "../travel/programs";
import s from "./directory.module.css";

export const metadata: Metadata = {
  title: "Directory | FinTerminal",
  description:
    "The full site directory for FinTerminal: every section and page in one place, from the card explorer and travel guides to personal-finance articles, rates, news, deals, and topic tags.",
  alternates: { canonical: "/directory" },
  ...ogMeta("Directory", "Directory", "/directory"),
};

// Human-readable companion to /sitemap.xml. Every dynamic list here reads from
// the same data sources sitemap.ts uses (allCards, NEWS, SWEET_SPOTS,
// TRAVEL_GUIDES, livePFArticles, TAGS), so new posts show up here on their own.
// For the big groups (every card, every news item) we link the hub plus a
// scannable subset rather than dumping every URL.

// A few high-signal issuer filters into the card explorer (the ?q= param the
// explorer reads). The hub links every one of the cards; these just save a step.
const CARD_QUICK_FILTERS = ["Amex", "RBC", "Scotiabank", "TD", "CIBC", "BMO", "Wealthsimple"];

const JUMP = [
  { id: "cards", label: "Cards" },
  { id: "travel", label: "Travel" },
  { id: "money", label: "Personal finance" },
  { id: "rates", label: "Rates" },
  { id: "news", label: "News" },
  { id: "deals", label: "Deals" },
  { id: "topics", label: "Topics" },
  { id: "guides", label: "Guides" },
  { id: "about", label: "About" },
];

function BoxHead({ id, title, href, more }: { id: string; title: string; href?: string; more?: string }) {
  return (
    <div className={s.boxHead}>
      <h2 id={`${id}-h`}>{title}</h2>
      {href && more ? <Link href={href}>{more} &rarr;</Link> : null}
    </div>
  );
}

export default function DirectoryPage() {
  const cardCount = allCards.length;
  const pf = livePFArticles();
  const latestNews = NEWS.slice(0, 10);
  const indexableTags = TAGS.filter((t) => tagCount(t.slug) >= MIN_INDEXABLE_TAG_ARTICLES);
  const programs = programGroups();

  return (
    <div className="wrap tone-neutral">
      <div className="page">
      <header className="page-head">
        <span className="eyebrow">Directory</span>
        <h1>Every page on FinTerminal</h1>
        <p className="dek">
          Every section and page, laid out in one place. It is the human-readable companion to the{" "}
          <Link className="lnk" href="/sitemap.xml">XML sitemap</Link>, and it reads from the same data, so new posts
          show up here on their own.
        </p>
      </header>

      <nav className={s.jump} aria-label="Jump to a section">
        {JUMP.map((j) => <a key={j.id} href={`#${j.id}`}>{j.label}</a>)}
      </nav>

      <div className={s.grid}>
        <section id="cards" className={`${s.box} tone-cards`} aria-labelledby="cards-h">
          <BoxHead id="cards" title="Cards" href="/cards" more="Explorer" />
          <ul className={s.list}>
            <li><Link href="/cards">Card explorer</Link> <span className={s.note}>filter and compare all {cardCount} cards</span></li>
            <li><Link href="/compare">Side-by-side card comparison</Link></li>
            <li><Link href="/how-we-value-points">How we value points</Link> <span className={s.note}>the formula behind every ranking</span></li>
            <li><Link href="/personal-finance/best-cash-back-credit-cards-canada">The best cash-back credit cards in Canada</Link></li>
            <li><Link href="/personal-finance/best-travel-credit-cards-canada">The best travel and rewards credit cards in Canada</Link></li>
          </ul>
          <h3 className={s.sub}>Jump straight to one issuer</h3>
          <div className={s.chips}>
            {CARD_QUICK_FILTERS.map((issuer) => (
              <Link key={issuer} href={`/cards?q=${encodeURIComponent(issuer)}`}>{issuer} cards</Link>
            ))}
          </div>
        </section>

        <section id="rates" className={s.box} aria-labelledby="rates-h">
          <BoxHead id="rates" title="Rates" href="/rates" more="Dashboard" />
          <ul className={s.list}>
            <li><Link href="/rates">Rates dashboard</Link></li>
            <li><Link href="/personal-finance/best-savings-account-rates-canada">Best high-interest savings account rates</Link></li>
            <li><Link href="/personal-finance/best-gic-rates-canada">Best GIC rates in Canada</Link></li>
            <li><Link href="/personal-finance/best-chequing-account-bonuses-canada">Best chequing account welcome bonuses</Link></li>
            <li><Link href="/personal-finance/where-to-hold-cash-canada">Where to hold your cash in Canada</Link></li>
          </ul>
        </section>

        <section id="deals" className={s.box} aria-labelledby="deals-h">
          <BoxHead id="deals" title="Deals" />
          <ul className={s.list}>
            <li><Link href="/deals">All deals</Link> <span className={s.note}>current offers, expired ones filtered out</span></li>
          </ul>
          <h3 className={s.sub} id="guides">Guides</h3>
          <ul className={s.list}>
            <li><Link href="/guides/us-cards-for-canadians">US credit cards for Canadians</Link></li>
            <li><Link href="/guides/us-cards-for-canadians/interactive">US cards for Canadians: interactive tool</Link></li>
          </ul>
          <h3 className={s.sub} id="about">About and policies</h3>
          <ul className={s.list}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/portfolio">Portfolio</Link> <span className={s.note}>real positions, in percent terms</span></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/newsletter">Newsletter</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/disclosure">Disclosure</Link></li>
          </ul>
        </section>
      </div>

      <section id="travel" className={`${s.box} ${s.wide} tone-travel`} aria-labelledby="travel-h">
        <BoxHead id="travel" title="Travel and points" href="/travel" more="Travel hub" />
        <div className={s.cols}>
          <div className={s.colGroup}>
            <h3 className={s.sub}>Hubs</h3>
            <ul className={s.list}>
              <li><Link href="/travel">Travel and points hub</Link></li>
              <li><Link href="/travel/sweet-spots">Every sweet spot, by program</Link></li>
            </ul>
          </div>
          <div className={s.colGroup}>
            <h3 className={s.sub}>Guides</h3>
            <ul className={s.list}>
              {TRAVEL_GUIDES.map((g) => (
                <li key={g.slug}><Link href={`/travel/${g.slug}`}>{g.title}</Link></li>
              ))}
            </ul>
          </div>
          {programs.map((grp) => (
            <div key={grp.slug} className={s.colGroup}>
              <h3 className={s.sub}>{grp.program} sweet spots</h3>
              <ul className={s.list}>
                {grp.spots.map((spot) => (
                  <li key={spot.slug}><Link className={s.clamp} href={`/travel/sweet-spots/${spot.slug}`}>{spot.title}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <span className="sr-only">{SWEET_SPOTS.length} sweet-spot posts in total.</span>
      </section>

      <section id="money" className={`${s.box} ${s.wide} tone-money`} aria-labelledby="money-h">
        <BoxHead id="money" title="Personal finance" href="/personal-finance" more="Personal finance hub" />
        <ul className={`${s.list} ${s.cols}`}>
          <li><Link href="/personal-finance">Personal finance hub</Link></li>
          {pf.map((a) => (
            <li key={a.slug}><Link href={`/personal-finance/${a.slug}`}>{a.title}</Link></li>
          ))}
        </ul>
      </section>

      <section id="news" className={`${s.box} ${s.wide}`} aria-labelledby="news-h">
        <BoxHead id="news" title="News" href="/news" more="All news" />
        <ul className={`${s.list} ${s.cols}`}>
          <li><Link href="/news">All news</Link></li>
          {latestNews.map((n) => (
            <li key={n.slug}><Link className={s.clamp} href={`/news/${n.slug}`}>{n.headline}</Link></li>
          ))}
        </ul>
      </section>

      <section id="topics" className={`${s.box} ${s.wide}`} aria-labelledby="topics-h">
        <BoxHead id="topics" title="Topics" href="/tags" more="All topics" />
        <ul className={`${s.list} ${s.cols}`}>
          <li><Link href="/tags">All topics</Link></li>
          {indexableTags.map((t) => (
            <li key={t.slug}><Link href={`/tags/${t.slug}`}>{t.label}</Link></li>
          ))}
        </ul>
      </section>
      </div>
    </div>
  );
}
