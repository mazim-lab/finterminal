import { allCards } from '@/data/cards';
import { CardGrid } from '@/components/CardGrid';
import { CardTileV2, CardCompareRow, CardCompareHeader } from '@/components/CardPrototypes';

const SLUGS = [
  'the-platinum-card',
  'americanexpress-cobalt-card',
  'cibc-aventura-visa-infinite-card',
  'td-aeroplan-visa-infinite-card',
  'rbc-avion-visa-infinite',
  'scotiabank-gold-american-express-card',
];

export default function CardsPreview() {
  const cards = SLUGS.map(s => allCards.find(c => c.slug === s)).filter(Boolean) as typeof allCards;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <p className="text-xs uppercase tracking-[0.2em] text-gold-text dark:text-gold font-semibold mb-2">Layout prototypes</p>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-2">Card layout options</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl">Same cards, three layouts. Pick the one that feels best and I&apos;ll roll it out across the card explorer.</p>

      {/* Option A */}
      <section className="mb-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-1">Option A — Cleaner visual grid</h2>
        <p className="text-sm text-muted-foreground mb-6">Roomier tiles led by one hero number (estimated first-year value) + a couple of key tags; full detail on the card page.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(c => <CardTileV2 key={c.slug} card={c} />)}
        </div>
      </section>

      <div className="atlas-rule mb-16" />

      {/* Option B */}
      <section className="mb-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-1">Option B — Comparison table</h2>
        <p className="text-sm text-muted-foreground mb-6">Scannable rows for comparing many cards at a glance — fee, bonus, and value lined up in columns.</p>
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <CardCompareHeader />
          {cards.map(c => <CardCompareRow key={c.slug} card={c} />)}
        </div>
      </section>

      <div className="atlas-rule mb-16" />

      {/* Current for reference */}
      <section>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-1">Current format (for reference)</h2>
        <p className="text-sm text-muted-foreground mb-6">What&apos;s live today — denser, with stat boxes, earn-rate text, and benefit icons.</p>
        <CardGrid cards={cards} />
      </section>
    </div>
  );
}
