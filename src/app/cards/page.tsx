import type { Metadata } from 'next';
import Link from 'next/link';
import { allCards, CARDS_VERIFIED } from '@/data/cards';
import { isTextOnlyBonus, type SlimCard } from '@/data/card-view';
import { VerifiedStamp } from '@/components/VerifiedStamp';
import { ogMeta } from '@/lib/og';
import Explorer from './Explorer';
import { packCard } from './packed';
import s from './cards.module.css';

export const metadata: Metadata = {
  title: 'Compare Canadian credit cards | FinTerminal',
  description: `Browse and filter ${allCards.length} Canadian and US credit cards by rewards, fees and perks, with our own point valuations and the first-year math for every card.`,
  alternates: { canonical: '/cards' },
  ...ogMeta('Compare Canadian credit cards', 'Credit cards', '/cards'),
};

// Server component: the full card data + normalization stay on the server. We
// ship only the lean SlimCard list the explorer table/filters need, packed into
// short arrays (see ./packed), so the browser never downloads the raw card JSON
// or re-runs normalization and the page payload stays small.
export default function CardsPage() {
  const cards: SlimCard[] = allCards.map((c) => ({
    slug: c.slug,
    name: c.name,
    issuer: c.issuer,
    rewards_program: c.rewards_program,
    card_type: c.card_type,
    annual_fee: c.annual_fee,
    welcome_bonus_value: c.welcome_bonus_value,
    welcome_bonus_points: c.welcome_bonus_points,
    first_year_value: c.first_year_value,
    cpp_cad: c.cpp_cad,
    country: c.country,
    network: c.network,
    categories: c.categories,
    benefits: c.benefits,
    earn_rates: c.earn_rates.slice(0, 4),
    bonus_text_only: isTextOnlyBonus(c),
  }));
  const networks = [...new Set(allCards.map((c) => c.network))].filter((n) => n !== 'Unknown').sort();
  const caCount = allCards.filter((c) => c.country === 'CA').length;
  const usCount = allCards.length - caCount;

  // The head is rendered here on the server and handed to the client explorer
  // as a prop, so it is plain static HTML with exactly one h1.
  const head = (
    <header key="explorer-head" className={s.head}>
      <p className="eyebrow">Credit cards</p>
      <h1 className={s.h1}>Card Explorer</h1>
      <p className={s.dek}>
        All {allCards.length} cards we track, {caCount} Canadian and {usCount} US, with our own estimate of what
        each one is worth in the first year. Tap any value to see the math behind it.
      </p>
      <div className={s.headMeta}>
        <VerifiedStamp date={CARDS_VERIFIED} cadenceDays={14} verb="CHECKED" />
        <span className={s.formula}>
          first-year value = <b>welcome bonus × base ¢/pt − annual fee</b>
        </span>
      </div>
      <nav className={s.headLinks} aria-label="Card tools">
        <Link href="/compare" className="btn btn-sm">Compare cards side by side</Link>
        <Link href="/how-we-value-points" className="btn btn-sm">How we value points</Link>
        <Link href="/guides/us-cards-for-canadians" className="btn btn-sm">US cards for Canadians</Link>
      </nav>
    </header>
  );

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Credit cards tracked by FinTerminal',
    numberOfItems: allCards.length,
    itemListElement: allCards.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.finterminal.ca/cards/${c.slug}`,
      name: c.name,
    })),
  };

  return (
    <>
      <Explorer packed={cards.map(packCard)} networks={networks} head={head} verified={CARDS_VERIFIED} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </>
  );
}
