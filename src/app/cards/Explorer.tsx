'use client';

import { Fragment, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Benefits } from '@/data/cards';
import { formatCurrency, receiptLines, earnLines, programName, type SlimCard } from '@/data/card-view';
import { VerifiedStamp } from '@/components/VerifiedStamp';
import { unpackCard, type PackedCard } from './packed';
import s from './cards.module.css';

type SortKey = 'name' | 'fee' | 'bonus' | 'cpp' | 'value';
type SortDir = 'asc' | 'desc';
type Country = 'CA' | 'US' | 'all';

// Card types offered as filters. "cashback" is the data key; people read "Cash back".
const CARD_TYPES: [string, string][] = [
  ['travel', 'Travel'], ['cashback', 'Cash back'], ['airline', 'Airline'], ['hotel', 'Hotel'], ['business', 'Business'],
];

// Perk labels used everywhere on this page (rail filters, row perks line,
// tooltips), so one benefit never shows up under two different names.
const PERKS: [keyof Benefits, string, string][] = [
  ['lounge_access', 'Lounge access', 'Airport lounge access'],
  ['no_fx_fee', 'No foreign fees', 'No foreign transaction fees'],
  ['car_rental_insurance', 'Rental car insurance', 'Rental car collision and damage insurance'],
  ['free_checked_bags', 'Free checked bag', 'Free checked bag on the co-brand airline'],
  ['travel_medical', 'Travel medical', 'Emergency travel medical coverage'],
  ['trip_cancellation', 'Trip cancellation', 'Trip cancellation and interruption coverage'],
  ['mobile_insurance', 'Mobile insurance', 'Cell phone and mobile device insurance'],
  ['purchase_protection', 'Purchase protection', 'Purchase protection on new buys'],
  ['extended_warranty', 'Extended warranty', 'Extended manufacturer warranty'],
  ['flight_delay', 'Flight delay', 'Flight and baggage delay coverage'],
];
// The rail offers the four perks people filter on most.
const RAIL_PERKS: (keyof Benefits)[] = ['lounge_access', 'no_fx_fee', 'car_rental_insurance', 'free_checked_bags'];
const perkLabel = (k: keyof Benefits) => PERKS.find(([key]) => key === k)![1];

const COLUMNS: { key: SortKey; label: string; right?: boolean; className?: string }[] = [
  { key: 'name', label: 'Card' },
  { key: 'fee', label: 'Annual fee', right: true },
  { key: 'bonus', label: 'Welcome bonus', right: true },
  { key: 'cpp', label: 'Base ¢/pt', right: true, className: 'col-cpp' },
  { key: 'value', label: 'Est. first-year value', right: true },
];

const perksFor = (c: SlimCard) => PERKS.filter(([k]) => c.benefits[k]);
const cppFor = (c: SlimCard) => c.cpp_cad ?? 1.0;
const num = (n: number) => n.toLocaleString('en-CA');
const FEE_MAX = 1000;

function median(values: number[]): number | null {
  if (!values.length) return null;
  const v = [...values].sort((a, b) => a - b);
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}

// useLayoutEffect on the client so a client-side navigation to /cards?q=... paints
// the filtered list in the same frame; useEffect on the server so React never warns.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Reading useSearchParams() during Explorer's own render would bail the whole page
// out of static prerendering (crawlers would see no card names and no
// /cards/<slug> links). The hook lives in this null-rendering leaf, isolated
// behind its own Suspense boundary, so the entire table still prerenders as HTML.
// It reports the params upward after hydration.
function SearchParamsSync({ onParams }: { onParams: (params: URLSearchParams) => void }) {
  const qs = useSearchParams().toString();
  useIsomorphicLayoutEffect(() => {
    onParams(new URLSearchParams(qs));
  }, [qs, onParams]);
  return null;
}

export default function Explorer({
  packed, networks, head, verified,
}: { packed: PackedCard[]; networks: string[]; head: ReactNode; verified: string }) {
  const cards = useMemo(() => packed.map(unpackCard), [packed]);
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState<Country>('all');
  const [types, setTypes] = useState<string[]>([]);
  const [networkFilter, setNetworkFilter] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<(keyof Benefits)[]>([]);
  const [maxFee, setMaxFee] = useState(FEE_MAX);
  const [sortKey, setSortKey] = useState<SortKey>('value');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openReceipt, setOpenReceipt] = useState<string | null>(null);

  // ?q= tracks the URL on every navigation, while ?country= / ?type= seed the
  // filters once and never clobber a filter the reader has since changed.
  const seeded = useRef(false);
  const applyParams = useCallback((params: URLSearchParams) => {
    setQuery(params.get('q') || '');
    if (seeded.current) return;
    seeded.current = true;
    const c = params.get('country');
    if (c === 'CA' || c === 'US') setCountry(c);
    const t = params.get('type');
    if (t) setTypes(t.split(','));
  }, []);

  // Close the mobile filter sheet with Escape.
  useEffect(() => {
    if (!filtersOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFiltersOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filtersOpen]);

  const countryCounts = useMemo(() => ({
    all: cards.length,
    CA: cards.filter((c) => c.country === 'CA').length,
    US: cards.filter((c) => c.country === 'US').length,
  }), [cards]);
  const base = useMemo(() => (country === 'all' ? cards : cards.filter((c) => c.country === country)), [country, cards]);
  const typeCounts = useMemo(() => Object.fromEntries(CARD_TYPES.map(([t]) => [t, base.filter((c) => c.categories.includes(t)).length])), [base]);
  const netCounts = useMemo(() => Object.fromEntries(networks.map((n) => [n, base.filter((c) => c.network === n).length])), [base, networks]);
  const perkCounts = useMemo(() => Object.fromEntries(RAIL_PERKS.map((k) => [k, base.filter((c) => c.benefits[k]).length])), [base]);
  const noFeeCount = useMemo(() => base.filter((c) => c.annual_fee === 0).length, [base]);

  const filtered = useMemo(() => {
    let list = base;
    if (query) {
      const words = query.toLowerCase().split(/\s+/).filter(Boolean).map((w) => (w === 'amex' ? 'american express' : w));
      list = list.filter((c) => {
        let t = `${c.name} ${c.issuer} ${c.rewards_program} ${c.card_type} ${c.network}`.toLowerCase();
        if (t.includes('american express')) t += ' amex';
        if (t.includes('mastercard')) t += ' mc';
        return words.every((w) => t.includes(w));
      });
    }
    if (types.length) list = list.filter((c) => types.some((t) => c.categories.includes(t)));
    if (networkFilter.length) list = list.filter((c) => networkFilter.includes(c.network));
    if (benefits.length) list = list.filter((c) => benefits.every((b) => c.benefits[b]));
    if (maxFee < FEE_MAX) list = list.filter((c) => c.annual_fee <= maxFee);

    const dir = sortDir === 'asc' ? 1 : -1;
    const val = (c: SlimCard): number | string => {
      switch (sortKey) {
        case 'name': return c.name.toLowerCase();
        case 'fee': return c.annual_fee;
        case 'bonus': return c.welcome_bonus_value;
        case 'cpp': return cppFor(c);
        case 'value': return c.first_year_value;
      }
    };
    return [...list].sort((a, b) => {
      const av = val(a), bv = val(b);
      if (typeof av === 'string' || typeof bv === 'string') return String(av).localeCompare(String(bv)) * dir;
      return (av - bv) * dir;
    });
  }, [base, query, types, networkFilter, benefits, maxFee, sortKey, sortDir]);

  // Stats never mix currencies: every money figure is computed within one
  // country and labelled with its currency.
  const stats = useMemo(() => {
    const by = (cc: 'CA' | 'US') => filtered.filter((c) => c.country === cc);
    const top = (list: SlimCard[]) => list.reduce<SlimCard | null>((a, c) => (!a || c.first_year_value > a.first_year_value ? c : a), null);
    const ca = by('CA'), us = by('US');
    return {
      ca, us,
      topCA: top(ca), topUS: top(us),
      medCA: median(ca.map((c) => c.first_year_value)),
      medUS: median(us.map((c) => c.first_year_value)),
      noFx: filtered.filter((c) => c.benefits.no_fx_fee).length,
      maxCA: Math.max(1, ...ca.map((c) => c.first_year_value)),
      maxUS: Math.max(1, ...us.map((c) => c.first_year_value)),
    };
  }, [filtered]);

  const onSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir(key === 'name' ? 'asc' : 'desc'); }
  };
  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const arrow = sortDir === 'asc' ? '▲' : '▼';
  const sortLabel = COLUMNS.find((c) => c.key === sortKey)?.label.toLowerCase() ?? 'value';

  const activeFilters: { key: string; label: string; clear: () => void }[] = [
    ...types.map((t) => ({ key: `t-${t}`, label: CARD_TYPES.find(([k]) => k === t)?.[1] ?? t, clear: () => setTypes(types.filter((x) => x !== t)) })),
    ...(maxFee === 0
      ? [{ key: 'fee', label: 'No annual fee', clear: () => setMaxFee(FEE_MAX) }]
      : maxFee < FEE_MAX ? [{ key: 'fee', label: `Fee up to $${maxFee}`, clear: () => setMaxFee(FEE_MAX) }] : []),
    ...benefits.map((b) => ({ key: `b-${b}`, label: perkLabel(b), clear: () => setBenefits(benefits.filter((x) => x !== b)) })),
    ...networkFilter.map((n) => ({ key: `n-${n}`, label: n, clear: () => setNetworkFilter(networkFilter.filter((x) => x !== n)) })),
  ];
  const clearAll = () => { setTypes([]); setMaxFee(FEE_MAX); setBenefits([]); setNetworkFilter([]); setQuery(''); };

  const statCell = (label: string, value: ReactNode, detail: ReactNode, tone?: 'pos' | 'neg') => (
    <div className="stat">
      <div className="l">{label}</div>
      <div className={`v${tone === 'pos' ? ' em' : tone === 'neg' ? ' rd' : ''}`}>{value}</div>
      <div className="d">{detail}</div>
    </div>
  );
  const valueTone = (v: number | null | undefined) => (v == null ? undefined : v < 0 ? 'neg' : 'pos');

  return (
    <div className={`app tone-cards ${s.shell}`}>
      <Suspense fallback={null}>
        <SearchParamsSync onParams={applyParams} />
      </Suspense>


      <main>
        {head}

        <div className={s.toolbar}>
          <div className={s.search}>
            <label htmlFor="card-search" className="sr-only">Search cards</label>
            <svg aria-hidden="true" viewBox="0 0 24 24" className={s.searchIcon}><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            <input
              id="card-search" type="search" className={s.searchInput} placeholder="Search by card, bank or program"
              value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off"
            />
          </div>
          <div className={`seg ${s.seg}`} role="group" aria-label="Country">
            {(['all', 'CA', 'US'] as const).map((c) => (
              <button key={c} type="button" aria-pressed={country === c} onClick={() => setCountry(c)}>
                {c === 'all' ? 'All' : c === 'CA' ? 'Canada' : 'US'} <span className={s.segCt}>{countryCounts[c]}</span>
              </button>
            ))}
          </div>
          <button
            type="button" className={s.filterBtn} onClick={() => setFiltersOpen(true)}
            aria-expanded={filtersOpen} aria-controls="card-filters"
          >
            Filters{activeFilters.length > 0 && <span className={s.filterCt}>{activeFilters.length}</span>}
          </button>
        </div>

        {(activeFilters.length > 0 || query) && (
          <div className={s.active} aria-label="Active filters">
            {query && (
              <button type="button" className={s.activeChip} onClick={() => setQuery('')}>
                “{query}” <span aria-hidden="true">×</span><span className="sr-only">remove search</span>
              </button>
            )}
            {activeFilters.map((f) => (
              <button key={f.key} type="button" className={s.activeChip} onClick={f.clear}>
                {f.label} <span aria-hidden="true">×</span><span className="sr-only">remove filter</span>
              </button>
            ))}
            <button type="button" className={s.clearLink} onClick={clearAll}>Clear all</button>
          </div>
        )}

        <div className={`stats ${s.stats}`} aria-live="polite">
          {statCell('Cards shown', filtered.length, `${stats.ca.length} Canadian · ${stats.us.length} US`)}
          {country === 'all' ? (
            <>
              {statCell('Top value · CA$', stats.topCA ? formatCurrency(stats.topCA.first_year_value, 'CA') : '–', stats.topCA?.name ?? 'no Canadian cards in view', valueTone(stats.topCA?.first_year_value))}
              {statCell('Median value · CA$', stats.medCA != null ? formatCurrency(stats.medCA, 'CA') : '–', stats.ca.length ? `middle of ${stats.ca.length} Canadian cards` : 'no Canadian cards in view')}
              {statCell('Top value · US$', stats.topUS ? formatCurrency(stats.topUS.first_year_value, 'US') : '–', stats.topUS?.name ?? 'no US cards in view', valueTone(stats.topUS?.first_year_value))}
            </>
          ) : (
            <>
              {(() => {
                const top = country === 'CA' ? stats.topCA : stats.topUS;
                const med = country === 'CA' ? stats.medCA : stats.medUS;
                const cur = country === 'CA' ? 'CA$' : 'US$';
                return (
                  <>
                    {statCell(`Top value · ${cur}`, top ? formatCurrency(top.first_year_value, country) : '–', top?.name ?? 'no cards in view', valueTone(top?.first_year_value))}
                    {statCell(`Median value · ${cur}`, med != null ? formatCurrency(med, country) : '–', filtered.length ? `middle of ${filtered.length} cards` : 'no cards in view')}
                  </>
                );
              })()}
              {statCell('No foreign fees', stats.noFx, 'cards with 0% foreign transaction fee')}
            </>
          )}
        </div>

        <div className={s.tableHead}>
          <span>Showing {filtered.length} of {cards.length} · sorted by {sortLabel} {arrow}</span>
          <span className={s.tableHint}>Tap a value for the math, perks and earn rates</span>
        </div>

        <div className={`tablewrap ${s.tablewrap}`}>
          <div className="tablescroll">
            <table className={s.table}>
              <caption className="sr-only">Credit cards, {filtered.length} shown, sorted by {sortLabel}</caption>
              <thead>
                <tr>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      scope="col"
                      className={`${col.right ? 'r' : ''} ${col.className ?? ''}`}
                      aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                    >
                      <button type="button" className={s.sortBtn} onClick={() => onSort(col.key)}>
                        {col.label}
                        <span className={s.sortAr} aria-hidden="true">{sortKey === col.key ? arrow : ''}</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const isOpen = openReceipt === c.slug;
                  const max = c.country === 'CA' ? stats.maxCA : stats.maxUS;
                  const pct = Math.round(Math.max(0, Math.min(100, (c.first_year_value / max) * 100)));
                  const rid = `rcpt-${c.slug}`;
                  const sub = [c.issuer, programName(c.rewards_program), c.network !== 'Unknown' ? c.network : ''].filter(Boolean).join(' · ');
                  const value = formatCurrency(c.first_year_value, c.country);
                  // Compact row: name, issuer line and the four numbers. Perks,
                  // the value math and earn rates live in the detail row that
                  // opens from the value button, so the list stays scannable and
                  // the prerendered HTML stays light. Short global class names are
                  // scoped under .table in cards.module.css.
                  return (
                    <Fragment key={c.slug}>
                      <tr className={`R${isOpen ? ' rcpt-open' : ''}`}>
                        <th scope="row" className="N">
                          <span className={`cc ${c.country === 'CA' ? 'ca' : 'us'}`}>{c.country}</span>
                          <a href={`/cards/${c.slug}`}>{c.name}</a>
                          <small>{sub}</small>
                        </th>
                        <td className="F">
                          {c.annual_fee === 0 ? <span className="fr">No fee</span> : formatCurrency(c.annual_fee, c.country)}
                        </td>
                        <td className="B">
                          {c.welcome_bonus_points
                            ? <>{num(c.welcome_bonus_points)}<small> pts</small></>
                            : c.welcome_bonus_value > 0 ? formatCurrency(c.welcome_bonus_value, c.country) : <span className="no">none listed</span>}
                        </td>
                        <td className="P col-cpp">{cppFor(c).toFixed(2)}</td>
                        <td className="V">
                          <button
                            type="button"
                            className={`valbtn ${c.first_year_value < 0 ? 'negv' : 'pos'}`}
                            aria-expanded={isOpen}
                            aria-controls={isOpen ? rid : undefined}
                            onClick={() => setOpenReceipt((x) => (x === c.slug ? null : c.slug))}
                          >
                            {value}
                          </button>
                          <i style={{ '--w': `${pct}%` } as CSSProperties} />
                        </td>
                      </tr>
                      {isOpen && <DetailRow c={c} id={rid} value={value} verified={verified} />}
                    </Fragment>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={COLUMNS.length} className={s.emptyCell}>
                      <p className={s.emptyTitle}>No cards match these filters</p>
                      <p className={s.emptyText}>Try removing a filter or two.</p>
                      <button type="button" className="btn btn-sm" onClick={clearAll}>Clear all filters</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="foot">
            <span>Values in each card&apos;s own currency · bars compare cards within the same currency</span>
            <span><a href="/how-we-value-points">How we value points</a> · <a href="/compare">Compare side by side</a></span>
          </div>
        </div>
      </main>

      <aside
        id="card-filters"
        className={`rail ${s.drawer}${filtersOpen ? ` open ${s.drawerOpen}` : ''}`}
        aria-label="Card filters"
      >
        <div className={s.drawerHead}>
          <span className={s.drawerTitle}>Filters</span>
          <button type="button" className="btn btn-sm" onClick={() => setFiltersOpen(false)}>Close</button>
        </div>

        <h2 className="rail-h">Card type</h2>
        {CARD_TYPES.map(([t, label]) => (
          <label key={t} className={`filt${types.includes(t) ? ' on' : ''}`}>
            <input type="checkbox" checked={types.includes(t)} onChange={() => toggle(types, t, setTypes)} /> {label}
            <span className="ct">{typeCounts[t]}</span>
          </label>
        ))}

        <h2 className="rail-h">Annual fee</h2>
        <label className={`filt${maxFee === 0 ? ' on' : ''}`}>
          <input type="checkbox" checked={maxFee === 0} onChange={() => setMaxFee(maxFee === 0 ? FEE_MAX : 0)} /> No annual fee
          <span className="ct">{noFeeCount}</span>
        </label>
        <label className={s.rangeLabel} htmlFor="maxfee">Max annual fee</label>
        <input
          id="maxfee" type="range" min={0} max={FEE_MAX} step={25} value={maxFee}
          onChange={(e) => setMaxFee(Number(e.target.value))}
          aria-valuetext={maxFee >= FEE_MAX ? 'Any fee' : `Up to $${maxFee}`}
        />
        <div className="range">{maxFee >= FEE_MAX ? 'Any fee' : maxFee === 0 ? 'No fee only' : `Up to $${maxFee}`}</div>

        <h2 className="rail-h">Perks</h2>
        {RAIL_PERKS.map((k) => (
          <label key={k} className={`filt${benefits.includes(k) ? ' on' : ''}`}>
            <input type="checkbox" checked={benefits.includes(k)} onChange={() => toggle(benefits, k, setBenefits)} /> {perkLabel(k)}
            <span className="ct">{perkCounts[k]}</span>
          </label>
        ))}

        <h2 className="rail-h">Network</h2>
        {networks.map((n) => (
          <label key={n} className={`filt${networkFilter.includes(n) ? ' on' : ''}`}>
            <input type="checkbox" checked={networkFilter.includes(n)} onChange={() => toggle(networkFilter, n, setNetworkFilter)} /> {n}
            <span className="ct">{netCounts[n]}</span>
          </label>
        ))}

        <div className={s.drawerFoot}>
          <button type="button" className="btn" onClick={clearAll} disabled={!activeFilters.length && !query}>Clear all</button>
          <button type="button" className="btn btn-primary" onClick={() => setFiltersOpen(false)}>
            Show {filtered.length} {filtered.length === 1 ? 'card' : 'cards'}
          </button>
        </div>
      </aside>

      {filtersOpen && <div className={s.scrim} onClick={() => setFiltersOpen(false)} aria-hidden="true" />}
    </div>
  );
}

// The expanded detail for one card: perks, the first-year value math line by
// line, and the illustrative earn rates. Rendered only for the open row.
function DetailRow({ c, id, value, verified }: { c: SlimCard; id: string; value: string; verified: string }) {
  const lines = receiptLines(c);
  const earn = earnLines(c);
  const perks = perksFor(c);
  return (
    <tr className="rcpt" id={id}>
      <td colSpan={COLUMNS.length}>
        <div className={`receipt ${s.receipt}`}>
          {perks.length > 0 && (
            <div className={s.perksBlock}>
              <div className={s.receiptCap}>Perks we track</div>
              <ul className={s.perks}>
                {perks.map(([k, label, title]) => <li key={k} className={s.perk} title={title}>{label}</li>)}
              </ul>
            </div>
          )}
          <div className={s.receiptCap}>How we got {value}</div>
          {lines.map((l, i) => (
            <div className="rl" key={i}>
              <span className="lab">{l.label}</span>
              <span className="dots" />
              <span className={`amt${l.neg ? ' neg' : ''}`}>
                {l.neg ? '−' : ''}{formatCurrency(Math.abs(l.amount), c.country)}
              </span>
            </div>
          ))}
          <div className="rl total">
            <span className="lab">EST. FIRST-YEAR VALUE</span>
            <span className="dots" />
            <span className={`amt${c.first_year_value < 0 ? ' neg' : ''}`}>{value}</span>
          </div>
          {earn.length > 0 && (
            <div className={s.earn}>
              <div className={`rl ${s.dim}`}>
                <span className="lab">earn on your spend</span>
                <span className="dots" />
                <span className="note">rates only, not in the total above</span>
              </div>
              {earn.map((e, i) => (
                <div className={`rl ${s.dim}`} key={i}>
                  <span className={`lab ${s.earnCat}`}>{e.category}</span>
                  <span className="dots" />
                  <span className="mono">{e.rate}</span>
                </div>
              ))}
            </div>
          )}
          <div className="rl verify">
            <VerifiedStamp date={verified} cadenceDays={14} verb="CHECKED" />
            <span className="dots" />
            <span className="note">same formula for every card</span>
          </div>
          <a className={s.receiptLink} href={`/cards/${c.slug}`}>Full card details <span aria-hidden="true">→</span></a>
        </div>
      </td>
    </tr>
  );
}
