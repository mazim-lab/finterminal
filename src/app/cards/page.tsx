import { Suspense } from 'react';
import { allCards } from '@/data/cards';
import type { SlimCard } from '@/data/card-view';
import Explorer from './Explorer';
import { ogMeta } from "@/lib/og";

export const metadata = {
  title: "Compare Canadian credit cards | FinTerminal",
  description: `Browse and filter ${allCards.length} Canadian credit cards by rewards, fees, and perks, with our own point valuations.`,
  ...ogMeta("Compare Canadian credit cards", "Credit cards"),
};

// Server component: the full card data + normalization stay on the server. We
// ship only the lean SlimCard list the explorer table/filters need, so the
// browser no longer downloads ~270KB of raw card JSON or re-runs normalization.
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
  }));
  const networks = [...new Set(allCards.map((c) => c.network))].filter((n) => n !== 'Unknown').sort();

  return (
    <Suspense fallback={<div className="app norail"><main><div className="head"><h1>Card Explorer</h1></div></main></div>}>
      <Explorer cards={cards} networks={networks} />
    </Suspense>
  );
}
