'use client';

import { Fragment, useState, useMemo } from 'react';
import type { CSSProperties } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Benefits } from '@/data/cards';
import { CARDS_VERIFIED } from '@/data/cards';
import { formatCurrency, receiptLines, earnLines, type SlimCard } from '@/data/card-view';
import { VerifiedStamp } from '@/components/VerifiedStamp';

type SortKey = 'name' | 'tags' | 'fee' | 'bonus' | 'cpp' | 'value';
type SortDir = 'asc' | 'desc';

const CARD_TYPES = ['travel', 'cashback', 'airline', 'hotel', 'business'];

// Tag chips now carry human words (spec 3.7): "no-fx" reads "no foreign fees".
// [benefit key, short chip label, full tooltip].
const TAG_DEFS: [keyof Benefits, string, string][] = [
  ['lounge_access', 'lounge access', 'Airport lounge access'],
  ['no_fx_fee', 'no foreign fees', 'No foreign transaction fees'],
  ['car_rental_insurance', 'rental car insurance', 'Rental car collision/damage insurance'],
  ['free_checked_bags', 'free checked bag', 'Free checked bag on the co-brand airline'],
  ['travel_medical', 'travel medical', 'Emergency travel medical coverage'],
  ['trip_cancellation', 'trip cancellation', 'Trip cancellation / interruption coverage'],
  ['mobile_insurance', 'mobile insurance', 'Cell phone / mobile device insurance'],
  ['purchase_protection', 'purchase protection', 'Purchase protection on new buys'],
  ['extended_warranty', 'extended warranty', 'Extended manufacturer warranty'],
  ['flight_delay', 'flight delay', 'Flight / baggage delay coverage'],
];
const RAIL_BENEFITS: [keyof Benefits, string][] = [
  ['lounge_access', 'Lounge access'], ['no_fx_fee', 'No FX fee'], ['car_rental_insurance', 'Car rental ins.'], ['free_checked_bags', 'Free checked bag'],
];

// Family & everyday lens (spec 3.7). Built ONLY from data that actually exists
// on the slim card: no annual fee, cash-back category, no foreign fees, rental
// car insurance. No invented groceries/gas fields — earn categories aren't in
// this payload, so we don't pretend they are.
type FamilyKey = 'nofee' | 'cashback' | 'nofx' | 'carins';
const FAMILY_DEFS: { key: FamilyKey; label: string; test: (c: SlimCard) => boolean }[] = [
  { key: 'nofee', label: 'No annual fee', test: (c) => c.annual_fee === 0 },
  { key: 'cashback', label: 'Cash back', test: (c) => c.categories.includes('cashback') },
  { key: 'nofx', label: 'No foreign fees', test: (c) => c.benefits.no_fx_fee },
  { key: 'carins', label: 'Rental car insurance', test: (c) => c.benefits.car_rental_insurance },
];

const COLUMNS: { key: SortKey; label: string; right?: boolean }[] = [
  { key: 'name', label: 'Card' }, { key: 'tags', label: 'Tags' }, { key: 'fee', label: 'Annual fee', right: true },
  { key: 'bonus', label: 'Bonus', right: true }, { key: 'cpp', label: 'Base ¢/pt', right: true }, { key: 'value', label: 'Est. 12-mo value', right: true },
];
const tagsFor = (c: SlimCard) => TAG_DEFS.filter(([k]) => c.benefits[k]);
const cppFor = (c: SlimCard) => c.cpp_cad ?? 1.0;

export default function Explorer({ cards, networks }: { cards: SlimCard[]; networks: string[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [country, setCountry] = useState<'CA' | 'US' | 'all'>((searchParams.get('country') as 'CA' | 'US') || 'all');
  const [types, setTypes] = useState<string[]>(searchParams.get('type') ? searchParams.get('type')!.split(',') : []);
  const [networkFilter, setNetworkFilter] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<(keyof Benefits)[]>([]);
  const [family, setFamily] = useState<FamilyKey[]>([]);
  const [maxFee, setMaxFee] = useState(1000);
  const [sortKey, setSortKey] = useState<SortKey>('value');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openReceipt, setOpenReceipt] = useState<string | null>(null);

  const base = useMemo(() => (country === 'all' ? cards : cards.filter((c) => c.country === country)), [country, cards]);
  const typeCounts = useMemo(() => Object.fromEntries(CARD_TYPES.map((t) => [t, base.filter((c) => c.categories.includes(t)).length])), [base]);
  const netCounts = useMemo(() => Object.fromEntries(networks.map((n) => [n, base.filter((c) => c.network === n).length])), [base, networks]);
  const benefitCounts = useMemo(() => Object.fromEntries(RAIL_BENEFITS.map(([k]) => [k, base.filter((c) => c.benefits[k]).length])), [base]);
  const familyCounts = useMemo(() => Object.fromEntries(FAMILY_DEFS.map((f) => [f.key, base.filter(f.test).length])), [base]);

  const filtered = useMemo(() => {
    let list = base;
    if (query) {
      const words = query.toLowerCase().split(/\s+/).filter(Boolean).map((w) => (w === 'amex' ? 'american express' : w));
      list = list.filter((c) => {
        let t = `${c.name} ${c.issuer} ${c.rewards_program} ${c.card_type}`.toLowerCase();
        if (t.includes('american express')) t += ' amex';
        if (t.includes('mastercard')) t += ' mc';
        return words.every((w) => t.includes(w));
      });
    }
    if (types.length) list = list.filter((c) => types.some((t) => c.categories.includes(t)));
    if (networkFilter.length) list = list.filter((c) => networkFilter.includes(c.network));
    if (benefits.length) list = list.filter((c) => benefits.every((b) => c.benefits[b]));
    if (family.length) list = list.filter((c) => family.every((f) => FAMILY_DEFS.find((d) => d.key === f)!.test(c)));
    if (maxFee < 1000) list = list.filter((c) => c.annual_fee <= maxFee);

    const dir = sortDir === 'asc' ? 1 : -1;
    const val = (c: SlimCard): number | string => {
      switch (sortKey) {
        case 'name': return c.name.toLowerCase();
        case 'tags': return tagsFor(c).length;
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
  }, [base, query, types, networkFilter, benefits, family, maxFee, sortKey, sortDir]);

  const maxValue = Math.max(...filtered.map((c) => c.first_year_value), 1);
  const top = filtered.reduce<SlimCard | null>((a, c) => (!a || c.first_year_value > a.first_year_value ? c : a), null);
  const noFx = filtered.filter((c) => c.benefits.no_fx_fee).length;
  // Median est. 12-mo value across the CURRENTLY FILTERED set. Reuses each card's
  // already-computed first_year_value (no new methodology). Currency is native per
  // card; like the "Top value" stat we render with the middle card's country
  // (unambiguous when a single country is filtered; representative when mixed).
  const byValue = [...filtered].sort((a, b) => a.first_year_value - b.first_year_value);
  const mid = Math.floor(byValue.length / 2);
  const medianValue = byValue.length
    ? (byValue.length % 2 ? byValue[mid].first_year_value : (byValue[mid - 1].first_year_value + byValue[mid].first_year_value) / 2)
    : 0;
  const medianCountry = country !== 'all' ? country : (byValue[mid]?.country ?? 'CA');

  const onSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir(key === 'name' ? 'asc' : 'desc'); }
  };
  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const arrow = sortDir === 'asc' ? '▲' : '▼';
  const sortLabel = COLUMNS.find((c) => c.key === sortKey)?.label.toLowerCase() ?? 'value';

  return (
    <div className="app">
      <button
        type="button"
        className="railtoggle"
        onClick={() => setFiltersOpen((o) => !o)}
        aria-expanded={filtersOpen}
      >
        {filtersOpen ? 'Hide filters' : 'Filters'}
      </button>
      <aside className={`rail${filtersOpen ? ' open' : ''}`}>
        <h4>Country</h4>
        {(['all', 'CA', 'US'] as const).map((c) => (
          <label key={c} className={`filt${country === c ? ' on' : ''}`}>
            <input type="radio" name="country" checked={country === c} onChange={() => setCountry(c)} /> {c === 'all' ? 'All' : c}
          </label>
        ))}

        <h4>Card type</h4>
        {CARD_TYPES.map((t) => (
          <label key={t} className={`filt${types.includes(t) ? ' on' : ''}`} style={{ textTransform: 'capitalize' }}>
            <input type="checkbox" checked={types.includes(t)} onChange={() => toggle(types, t, setTypes)} /> {t}
            <span className="ct">{typeCounts[t]}</span>
          </label>
        ))}

        <h4>Family &amp; everyday</h4>
        {FAMILY_DEFS.map((f) => (
          <label key={f.key} className={`filt${family.includes(f.key) ? ' on' : ''}`}>
            <input type="checkbox" checked={family.includes(f.key)} onChange={() => toggle(family, f.key, setFamily)} /> {f.label}
            <span className="ct">{familyCounts[f.key]}</span>
          </label>
        ))}

        <h4>Max annual fee</h4>
        <input type="range" min={0} max={1000} step={25} value={maxFee} onChange={(e) => setMaxFee(Number(e.target.value))} />
        <div className="range">{maxFee >= 1000 ? 'Any' : `$0 to $${maxFee}`}</div>

        <h4>Benefits</h4>
        {RAIL_BENEFITS.map(([k, label]) => (
          <label key={k} className={`filt${benefits.includes(k) ? ' on' : ''}`}>
            <input type="checkbox" checked={benefits.includes(k)} onChange={() => toggle(benefits, k, setBenefits)} /> {label}
            <span className="ct">{benefitCounts[k]}</span>
          </label>
        ))}

        <h4>Network</h4>
        {networks.map((n) => (
          <label key={n} className={`filt${networkFilter.includes(n) ? ' on' : ''}`}>
            <input type="checkbox" checked={networkFilter.includes(n)} onChange={() => toggle(networkFilter, n, setNetworkFilter)} /> {n}
            <span className="ct">{netCounts[n]}</span>
          </label>
        ))}
      </aside>

      <main>
        <div className="head">
          <h1>Card Explorer</h1>
          <span className="meta">showing {filtered.length} / {cards.length} · sorted by {sortLabel} {arrow}</span>
        </div>
        {/* the formula, promoted from the table footer to a subtitle (spec 3.7) */}
        <p className="subhead">
          Est. 12-month value = <b>welcome bonus × base ¢/pt − annual fee</b>, in each card&apos;s native currency. Tap any value to see the math.
        </p>
        <div className="guidestrip">
          <a className="guidechip" href="/guides/us-cards-for-canadians"><span className="gi">▸</span> US Cards for Canadians: the ITIN guide</a>
        </div>

        <div className="stats">
          <div className="stat"><div className="l">Cards tracked</div><div className="v">{filtered.length}</div><div className="d">comprehensive data</div></div>
          <div className="stat"><div className="l">Top value</div><div className="v em">{top ? formatCurrency(top.first_year_value, top.country) : '—'}</div><div className="d">{top ? top.name : ''}</div></div>
          <div className="stat"><div className="l">Median 12-mo value</div><div className="v">{filtered.length ? formatCurrency(medianValue, medianCountry) : '—'}</div><div className="d">midpoint of {filtered.length} filtered</div></div>
          <div className="stat"><div className="l">No-FX options</div><div className="v">{noFx}</div><div className="d">0% foreign txn</div></div>
        </div>

        <div className="tablewrap">
          <div className="tablescroll">
            <table>
              <thead>
                <tr>
                  {COLUMNS.map((col) => (
                    <th key={col.key} className={`${col.right ? 'r' : ''}${col.key === 'cpp' ? ' col-cpp' : ''}`} onClick={() => onSort(col.key)}>
                      {col.label}{sortKey === col.key && <span className="ar"> {arrow}</span>}
                    </th>
                  ))}
                  {/* Value index is a visual guide, not sortable: no cursor, no onClick,
                      and a plain-language title so the header explains itself (spec 3.7). */}
                  <th className="r col-vindex nosort" title="A bar showing each card's estimated value relative to the strongest card in this list. Visual only, not a sort.">Value index</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const tags = tagsFor(c);
                  const isOpen = openReceipt === c.slug;
                  const lines = isOpen ? receiptLines(c) : [];
                  const earn = isOpen ? earnLines(c) : [];
                  return (
                    <Fragment key={c.slug}>
                    <tr className={`cardrow${isOpen ? ' rcpt-open' : ''}`}>
                      <td data-label="Card">
                        <a href={`/cards/${c.slug}`}>
                          <div className="cn">
                            <span className={`cc ${c.country.toLowerCase()}`}>{c.country}</span>
                            {c.name}
                            {c.network !== 'Unknown' && <span className="netok">{c.network}</span>}
                          </div>
                          <div className="ci" style={{ textTransform: 'lowercase' }}>{c.issuer} · {c.rewards_program || c.card_type}</div>
                        </a>
                      </td>
                      <td data-label="Tags">
                        {tags.slice(0, 3).map(([k, label, title]) => <span key={k} className="tag em" title={title}>{label}</span>)}
                        {tags.length > 3 && <span className="tag em" title={tags.slice(3).map(([, l]) => l).join(', ')}>+{tags.length - 3}</span>}
                      </td>
                      <td className={`r mono${c.annual_fee > 0 ? ' negv' : ''}`} data-label="Annual fee">{formatCurrency(c.annual_fee, c.country)}</td>
                      <td className="r mono" data-label="Bonus">{c.welcome_bonus_points ? c.welcome_bonus_points.toLocaleString() : (c.welcome_bonus_value > 0 ? formatCurrency(c.welcome_bonus_value, c.country) : '—')}</td>
                      <td className="r mono col-cpp" data-label="Base ¢/pt">{cppFor(c).toFixed(2)}</td>
                      <td className="r" data-label="Est. 12-mo value">
                        {/* THE RECEIPT (spec 3.6): the value is a button that expands the
                            row into a mono ledger of the real math. Keyboard accessible. */}
                        <button
                          type="button"
                          className={`valbtn big ${c.first_year_value < 0 ? 'negv' : 'pos'}`}
                          aria-expanded={isOpen}
                          onClick={() => setOpenReceipt((s) => (s === c.slug ? null : c.slug))}
                        >
                          {formatCurrency(c.first_year_value, c.country)}
                        </button>
                      </td>
                      <td className="r col-vindex" data-label="Value index"><span className="vbar" style={{ '--w': `${Math.max(0, (c.first_year_value / maxValue) * 100)}%` } as CSSProperties} /></td>
                    </tr>
                    {isOpen && (
                      <tr className="rcpt">
                        <td colSpan={7}>
                          <div className="receipt">
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
                              <span className={`amt${c.first_year_value < 0 ? ' neg' : ''}`}>{formatCurrency(c.first_year_value, c.country)}</span>
                            </div>
                            {earn.length > 0 && (
                              <div className="rl-earn" style={{ borderTop: '1px solid var(--line)', marginTop: '8px', paddingTop: '8px' }}>
                                <div className="rl" style={{ color: 'var(--ink-dim)' }}>
                                  <span className="lab">earn on your spend</span>
                                  <span className="dots" />
                                  <span className="note">rates only, not in the total above</span>
                                </div>
                                {earn.map((e, i) => (
                                  <div className="rl" key={i} style={{ color: 'var(--ink-dim)' }}>
                                    <span className="lab" style={{ color: 'var(--ink)' }}>{e.category}</span>
                                    <span className="dots" />
                                    <span className="mono">{e.rate}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="rl verify">
                              <VerifiedStamp date={CARDS_VERIFIED} verb="CHECKED" />
                              <span className="dots" />
                              <span className="note">same formula for every card</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                    </Fragment>
                  );
                })}
                {filtered.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: '60px', color: 'var(--ink-dim)' }} className="mono">no cards match these filters</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="foot">
            <span>same formula for every card · native currency</span>
            <span>click a column to sort · <a href="/how-we-value-points">methodology →</a></span>
          </div>
        </div>
      </main>
    </div>
  );
}
