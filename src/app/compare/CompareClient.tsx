'use client';

import { Fragment, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Benefits, EarnRate } from '@/data/cards';
import { formatCurrency, programName, isUnvalued, isTextOnlyBonus } from '@/data/card-view';
import s from './compare.module.css';

export interface CompareCard {
  slug: string;
  name: string;
  issuer: string;
  country: 'CA' | 'US';
  network: string;
  rewards_program: string;
  annual_fee: number;
  first_year_fee: number | null;
  welcome_bonus: string;
  welcome_bonus_points: number | null;
  welcome_bonus_value: number;
  first_year_value: number;
  cpp_cad: number | null;
  foreign_transaction_fee: boolean | null;
  foreign_transaction_fee_pct: number | null;
  earn_rates_summary: string;
  earn_rates: EarnRate[];
  benefits: Benefits;
  benefits_incomplete: boolean;
  apply_url: string | null;
}

const MAX = 4;

// useSearchParams lives only in this null-rendering leaf inside its own
// Suspense, so the rest of the page still prerenders as static HTML.
function ParamsSeed({ onSeed }: { onSeed: (slugs: string[]) => void }) {
  const qs = useSearchParams().get('cards') ?? '';
  useEffect(() => {
    onSeed(qs.split(',').map((x) => x.trim()).filter(Boolean));
  }, [qs, onSeed]);
  return null;
}

export default function CompareClient({
  cards, benefitLabels, picks,
}: { cards: CompareCard[]; benefitLabels: [keyof Benefits, string][]; picks: string[] }) {
  const bySlug = useMemo(() => new Map(cards.map((c) => [c.slug, c])), [cards]);
  const [slugs, setSlugs] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const seeded = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSeed = useCallback((list: string[]) => {
    if (seeded.current) return;
    seeded.current = true;
    const valid = [...new Set(list)].filter((x) => bySlug.has(x)).slice(0, MAX);
    if (valid.length) setSlugs(valid);
  }, [bySlug]);

  // Keep the URL shareable: /compare?cards=a,b
  useEffect(() => {
    if (!seeded.current) return;
    const url = slugs.length ? `/compare?cards=${slugs.join(',')}` : '/compare';
    window.history.replaceState(window.history.state, '', url);
  }, [slugs]);

  const selected = slugs.map((x) => bySlug.get(x)!).filter(Boolean);
  const full = selected.length >= MAX;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const words = q.split(/\s+/).map((w) => (w === 'amex' ? 'american express' : w));
    return cards.filter((c) => {
      if (slugs.includes(c.slug)) return false;
      let t = `${c.name} ${c.issuer} ${c.rewards_program}`.toLowerCase();
      if (t.includes('american express')) t += ' amex';
      return words.every((w) => t.includes(w));
    }).slice(0, 8);
  }, [query, cards, slugs]);

  const add = (slug: string) => {
    seeded.current = true;
    setSlugs((cur) => (cur.includes(slug) || cur.length >= MAX ? cur : [...cur, slug]));
    setQuery('');
    setActive(0);
    inputRef.current?.focus();
  };
  const remove = (slug: string) => { seeded.current = true; setSlugs((cur) => cur.filter((x) => x !== slug)); };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); add(results[Math.min(active, results.length - 1)].slug); }
    else if (e.key === 'Escape') { setQuery(''); }
  };

  // Highlight winners only when every card shares a currency; a CA$ and a US$
  // figure are not comparable without a guessed exchange rate.
  const sameCurrency = selected.length > 1 && selected.every((c) => c.country === selected[0].country);
  const best = (vals: number[], pick: 'min' | 'max') => {
    if (!sameCurrency) return vals.map(() => false);
    const target = pick === 'min' ? Math.min(...vals) : Math.max(...vals);
    const winners = vals.filter((v) => v === target).length;
    return vals.map((v) => v === target && winners < vals.length);
  };
  const feeWin = best(selected.map((c) => c.annual_fee), 'min');
  // "Highest value" is judged only among valued cards; a card we don't value
  // never wins or loses on a dollar figure, and needs two valued cards to compare.
  const valuedCount = selected.filter((c) => !isUnvalued(c)).length;
  const valueWin = valuedCount > 1
    ? best(selected.map((c) => (isUnvalued(c) ? -Infinity : c.first_year_value)), 'max')
    : selected.map(() => false);

  const fx = (c: CompareCard) => (c.foreign_transaction_fee === false ? '0%'
    : c.foreign_transaction_fee_pct != null ? `${c.foreign_transaction_fee_pct}%` : 'Not listed');
  const earn = (c: CompareCard): ReactNode => {
    const rates = c.earn_rates.filter((r) => { const n = parseFloat(r.rate); return isNaN(n) || n <= 10; });
    if (rates.length) {
      return (
        <ul className={s.earn}>
          {rates.map((r, i) => <li key={i}><b>{r.rate.match(/^[\d.]+x?/)?.[0] || r.rate}</b> {r.category}</li>)}
        </ul>
      );
    }
    return c.earn_rates_summary ? <span className={s.text}>{c.earn_rates_summary}</span> : <span className={s.none}>Not listed</span>;
  };

  type Row = { label: string; group?: string; cells: (c: CompareCard, i: number) => ReactNode };
  const rows: Row[] = [
    { group: 'The basics', label: 'Country', cells: (c) => <span className={`cc ${c.country.toLowerCase()}`}>{c.country}</span> },
    { label: 'Issuer', cells: (c) => c.issuer },
    { label: 'Network', cells: (c) => (c.network !== 'Unknown' ? c.network : <span className={s.none}>Not listed</span>) },
    { label: 'Rewards program', cells: (c) => (c.rewards_program ? programName(c.rewards_program) : <span className={s.none}>None</span>) },
    { group: 'Cost and value', label: 'Annual fee', cells: (c, i) => (
      <span className={`${s.num}${feeWin[i] ? ` ${s.win}` : ''}`}>
        {c.annual_fee === 0 ? 'No fee' : formatCurrency(c.annual_fee, c.country)}
        {feeWin[i] && <span className="chip chip-green">Lowest</span>}
        {c.first_year_fee != null && c.first_year_fee !== c.annual_fee && (
          <span className={s.sub}>{c.first_year_fee === 0 ? 'first year free' : `first year ${formatCurrency(c.first_year_fee, c.country)}`}</span>
        )}
      </span>
    ) },
    { label: 'Welcome bonus', cells: (c) => (
      <span className={s.num}>
        {c.welcome_bonus_points ? `${c.welcome_bonus_points.toLocaleString('en-CA')} pts`
          : c.welcome_bonus_value > 0 ? formatCurrency(c.welcome_bonus_value, c.country)
            : isTextOnlyBonus(c) ? <span className={s.none}>See offer</span> : <span className={s.none}>None listed</span>}
        {c.welcome_bonus_points && c.welcome_bonus_value > 0 ? <span className={s.sub}>worth about {formatCurrency(c.welcome_bonus_value, c.country)}</span> : null}
      </span>
    ) },
    { label: 'Est. first-year value', cells: (c, i) => (isUnvalued(c) ? (
      <span className={s.num}>
        <span className={s.none}>Not valued</span>
        <span className={s.sub}>bonus is in points with no fixed rate</span>
      </span>
    ) : (
      <span className={`${s.num} ${s.big} ${c.first_year_value < 0 ? s.neg : s.pos}`}>
        {formatCurrency(c.first_year_value, c.country)}
        {valueWin[i] && <span className="chip chip-green">Highest</span>}
      </span>
    )) },
    { label: 'Base value per point', cells: (c) => (c.cpp_cad != null ? <span className={s.num}>{c.cpp_cad.toFixed(2)}¢</span> : <span className={s.none}>Not valued</span>) },
    { label: 'Foreign transaction fee', cells: (c) => <span className={`${s.num}${fx(c) === '0%' ? ` ${s.pos}` : ''}`}>{fx(c)}</span> },
    { group: 'Earning', label: 'Earn rates', cells: earn },
    { label: 'Welcome offer', cells: (c) => (c.welcome_bonus ? <span className={s.text}>{c.welcome_bonus}</span> : <span className={s.none}>Not listed</span>) },
    ...benefitLabels.map(([k, label], idx): Row => ({
      group: idx === 0 ? 'Perks and insurance' : undefined,
      label,
      cells: (c) => (c.benefits_incomplete
        ? <span className={s.none}>Being verified</span>
        : c.benefits[k]
          ? <span className={s.yes}><span aria-hidden="true">✓</span> Yes</span>
          : <span className={s.no}><span aria-hidden="true">–</span> No</span>),
    })),
  ];

  const listId = 'compare-results';

  return (
    <div className={s.root}>
      <Suspense fallback={null}><ParamsSeed onSeed={onSeed} /></Suspense>

      <section className={s.picker} aria-label="Choose cards">
        <div className={s.pickerTop}>
          <label htmlFor="compare-search" className={s.pickLabel}>
            Add a card <span className={s.count}>{selected.length} of {MAX} picked</span>
          </label>
          <div className={s.searchWrap}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className={s.icon}><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            <input
              ref={inputRef}
              id="compare-search" type="search" autoComplete="off" className={s.search}
              placeholder={full ? 'Four cards picked. Remove one to add another.' : 'Type a card, bank or program, e.g. Cobalt, TD, Aeroplan'}
              value={query} disabled={full}
              onChange={(e) => { setQuery(e.target.value); setActive(0); }}
              onKeyDown={onKey}
              role="combobox" aria-expanded={results.length > 0} aria-controls={listId} aria-autocomplete="list"
              aria-activedescendant={results.length ? `opt-${results[Math.min(active, results.length - 1)].slug}` : undefined}
            />
          </div>
          {query.trim() && (
            <ul id={listId} role="listbox" className={s.results} aria-label="Matching cards">
              {results.map((c, i) => (
                <li key={c.slug} id={`opt-${c.slug}`} role="option" aria-selected={i === active}>
                  <button type="button" className={`${s.opt}${i === active ? ` ${s.optOn}` : ''}`} onClick={() => add(c.slug)} onMouseEnter={() => setActive(i)}>
                    <span className={`cc ${c.country.toLowerCase()}`}>{c.country}</span>
                    <span className={s.optMain}>
                      <span className={s.optName}>{c.name}</span>
                      <span className={s.optSub}>{c.issuer} · {c.annual_fee === 0 ? 'no fee' : `${formatCurrency(c.annual_fee, c.country)} a year`}</span>
                    </span>
                    <span className={s.optAdd} aria-hidden="true">Add</span>
                  </button>
                </li>
              ))}
              {results.length === 0 && <li className={s.noRes}>No cards match “{query.trim()}”.</li>}
            </ul>
          )}
        </div>

        {selected.length > 0 && (
          <ul className={s.picked} aria-label="Picked cards">
            {selected.map((c) => (
              <li key={c.slug} className={s.pill}>
                <span className={`cc ${c.country.toLowerCase()}`}>{c.country}</span>
                <span className={s.pillName}>{c.name}</span>
                <button type="button" className={s.pillX} onClick={() => remove(c.slug)} aria-label={`Remove ${c.name}`}>×</button>
              </li>
            ))}
            {selected.length > 1 && (
              <li><button type="button" className={s.clear} onClick={() => { seeded.current = true; setSlugs([]); }}>Clear all</button></li>
            )}
          </ul>
        )}
      </section>

      {selected.length === 0 ? (
        <div className={s.empty}>
          <h2 className={s.emptyH}>Nothing picked yet</h2>
          <p>Search above for any card we track, or start with the three Canadian cards that score highest on our first-year estimate.</p>
          <div className={s.quick}>
            {picks.map((p) => bySlug.get(p)).filter(Boolean).map((c) => (
              <button key={c!.slug} type="button" className={s.quickBtn} onClick={() => add(c!.slug)}>
                <span className={s.quickPlus} aria-hidden="true">+</span>
                <span className={s.quickName}>{c!.name}</span>
                <span className={s.quickVal}>{isUnvalued(c!) ? 'Not valued' : `${formatCurrency(c!.first_year_value, c!.country)} first year`}</span>
              </button>
            ))}
          </div>
          <p className={s.emptyFoot}>Prefer to browse with filters? <a href="/cards">Open the Card Explorer</a>.</p>
        </div>
      ) : (
        <>
          {selected.length > 1 && !sameCurrency && (
            <p className={`notice amber ${s.mixed}`}>
              You are comparing Canadian and US cards. Each value stays in its own currency, so we skip the
              &quot;lowest&quot; and &quot;highest&quot; badges here.
            </p>
          )}
          <div className={`tablewrap ${s.wrap}`}>
            <div className={`tablescroll ${s.scroll}`}>
              <table className={s.table} style={{ minWidth: 160 + selected.length * 200 }}>
                <caption className="sr-only">Comparison of {selected.map((c) => c.name).join(', ')}</caption>
                <thead>
                  <tr>
                    <td className={s.corner} />
                    {selected.map((c) => (
                      <th key={c.slug} scope="col" className={s.colHead}>
                        <a href={`/cards/${c.slug}`} className={s.colName}>{c.name}</a>
                        <span className={s.colSub}>{c.issuer}</span>
                        <button type="button" className={s.colX} onClick={() => remove(c.slug)}>Remove</button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => <Fragment key={r.label}>{renderRow(r)}</Fragment>)}
                  <tr>
                    <th scope="row" className={s.rowHead}>Links</th>
                    {selected.map((c) => (
                      <td key={c.slug}>
                        <div className={s.links}>
                          <a href={`/cards/${c.slug}`} className="btn btn-sm">Full details</a>
                          {c.apply_url && (
                            <a href={c.apply_url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Apply <span aria-hidden="true">↗</span></a>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={s.footnote}>
            Est. first-year value = welcome bonus × base ¢/pt − annual fee, in each card&apos;s own currency.{' '}
            <a href="/how-we-value-points">How we value points</a>
          </p>
        </>
      )}
    </div>
  );

  function renderRow(r: Row) {
    const sel = selected;
    return (
      <>
        {r.group && (
          <tr className={s.groupRow}>
            <th scope="colgroup" colSpan={sel.length + 1}>{r.group}</th>
          </tr>
        )}
        <tr>
          <th scope="row" className={s.rowHead}>{r.label}</th>
          {sel.map((c, i) => <td key={c.slug}>{r.cells(c, i)}</td>)}
        </tr>
      </>
    );
  }
}
