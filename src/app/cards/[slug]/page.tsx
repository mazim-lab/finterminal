import { allCards, Card, BENEFIT_LABELS, Benefits, formatCurrency } from '@/data/cards';
import { valuationFor } from '@/data/point-valuations';
import { Metadata } from 'next';
import Link from 'next/link';

export function generateStaticParams() {
  return allCards.map(card => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = allCards.find(c => c.slug === slug);
  if (!card) return { title: 'Card Not Found' };
  return {
    title: `${card.name} | FinTerminal`,
    description: `${card.name} by ${card.issuer}. Annual fee: ${formatCurrency(card.annual_fee, card.country)}. ${card.welcome_bonus || 'Compare and learn more.'}`,
  };
}

const TAG_DEFS: [keyof Benefits, string][] = [
  ['lounge_access', 'lounge'], ['no_fx_fee', 'no-fx'], ['car_rental_insurance', 'car-ins'],
  ['free_checked_bags', 'free-bag'], ['travel_medical', 'travel-med'], ['trip_cancellation', 'trip-cancel'],
  ['mobile_insurance', 'mobile'], ['purchase_protection', 'purchase'], ['extended_warranty', 'warranty'], ['flight_delay', 'flight-delay'],
];

// ── Answer-first generated copy ─────────────────────────
// Everything below is derived from a card's real fields so all ~195 cards (and any
// future ones) get an answer-first verdict + FAQ from a single template. No em dashes
// in any generated prose (house voice). Never fabricate facts; drop what we can't back
// with data.

// Strip em dashes (and en dashes) from any data-sourced string before it reaches
// generated prose or JSON-LD. House voice forbids em dashes, and some issuer-sourced
// fields (welcome_bonus, conditions, value formula) can contain them; the upstream
// cleaners do not remove a stray dash mid-string, so we guard here. Replace with a
// comma when the dash sits between words, otherwise just drop it.
function stripDashes(s: string): string {
  return s
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/,\s*,/g, ',')
    .replace(/,(\s*[.;])/g, '$1');
}

// Trim trailing punctuation/whitespace so we can safely append our own sentence.
// Also strips em/en dashes so data-sourced text stays within house voice.
function stripTrailingPunct(s: string): string {
  return stripDashes(s).replace(/[\s.;,]+$/, '').trim();
}

// Coerce card_type to a safe value. The US importer passes it through with no
// fallback, so an empty/undefined value would otherwise render as "undefined".
function cardTypeWord(card: Card): string {
  return card.card_type || 'rewards';
}

// A short, plain description of who the card suits, inferred from data only.
function audienceFor(card: Card): string {
  const b = card.benefits;
  const type = cardTypeWord(card);
  if (card.is_business) return 'small business owners who want to earn on company spending';
  if (b.lounge_access) return 'frequent flyers who value lounge access and premium travel perks';
  if (b.no_fx_fee) return 'people who travel or shop in other currencies and want to skip foreign transaction fees';
  if (type === 'cashback') return 'people who want straightforward cash back without tracking points';
  if (card.categories?.includes('travel')) return 'travellers who want to earn flexible points toward flights and trips';
  if (type === 'secured') return 'people building or rebuilding their credit history';
  if (type === 'student') return 'students who want a simple first rewards card';
  return 'everyday spenders who want to earn rewards on regular purchases';
}

// 2 to 4 sentence plain-language verdict, built entirely from real fields.
function buildBottomLine(card: Card): string {
  const cur = card.country;
  const netPart = card.network && card.network !== 'Unknown' ? ` on the ${card.network} network` : '';
  const typeWord = (card.is_business ? 'business ' : '') + cardTypeWord(card);

  // Sentence 1: what it is + annual fee.
  let feeClause: string;
  if (card.annual_fee === 0) {
    feeClause = 'has no annual fee';
  } else {
    feeClause = `carries a ${formatCurrency(card.annual_fee, cur)} annual fee`;
    if (card.first_year_fee === 0) {
      feeClause += ', though the first year is free';
    } else if (card.first_year_fee != null && card.first_year_fee !== card.annual_fee) {
      feeClause += `, or ${formatCurrency(card.first_year_fee, cur)} in the first year`;
    }
  }
  const s1 = `The ${card.name} is a ${typeWord} card from ${card.issuer}${netPart} that ${feeClause}.`;

  // Sentence 2: welcome bonus + first-year value, only with real numbers.
  let s2 = '';
  const hasBonus = card.welcome_bonus_points || card.welcome_bonus_value > 0;
  if (hasBonus) {
    const bonusPhrase = card.welcome_bonus_points
      ? `a welcome bonus of ${card.welcome_bonus_points.toLocaleString()} points`
      : `a welcome bonus worth about ${formatCurrency(card.welcome_bonus_value, cur)}`;
    if (card.first_year_value > 0) {
      s2 = `It offers ${bonusPhrase}, which we estimate at roughly ${formatCurrency(card.first_year_value, cur)} of value in your first year after the fee.`;
    } else if (card.annual_fee > 0) {
      s2 = `It offers ${bonusPhrase}, though the annual fee offsets most of that in the first year.`;
    } else {
      s2 = `It offers ${bonusPhrase}.`;
    }
  } else if (card.first_year_value > 0) {
    s2 = `We estimate roughly ${formatCurrency(card.first_year_value, cur)} of value in your first year.`;
  }

  // Sentence 3: who it suits.
  const s3 = `It suits ${audienceFor(card)}.`;

  // Sentence 4: one honest caveat.
  let s4 = '';
  if (card.cons.length > 0) {
    s4 = `One thing to weigh: ${stripTrailingPunct(card.cons[0])}.`;
  } else if (card.annual_fee > 0 && !hasBonus) {
    s4 = `Just note it charges an annual fee without a listed welcome bonus, so the everyday earn rates need to carry their weight.`;
  } else if (card.foreign_transaction_fee === true) {
    const pct = card.foreign_transaction_fee_pct != null ? `${card.foreign_transaction_fee_pct}%` : 'the standard';
    s4 = `Just note it charges ${pct} on foreign currency purchases, so it is not ideal for spending abroad.`;
  } else if (card.benefits_incomplete) {
    s4 = `We are still verifying its full benefit list, so check the issuer's terms before you apply.`;
  }

  return [s1, s2, s3, s4].filter(Boolean).join(' ');
}

interface Faq { q: string; a: string; }

// 4 to 6 Q/As, each dropped entirely when its backing data is missing.
function buildCardFaqs(card: Card): Faq[] {
  const cur = card.country;
  const faqs: Faq[] = [];

  // Annual fee (always answerable).
  faqs.push({
    q: `What is the annual fee for the ${card.name}?`,
    a: card.annual_fee === 0
      ? `The ${card.name} has no annual fee.`
      : (() => {
          let a = `The ${card.name} has an annual fee of ${formatCurrency(card.annual_fee, cur)}.`;
          if (card.first_year_fee === 0) a += ` The fee is waived for the first year.`;
          else if (card.first_year_fee != null && card.first_year_fee !== card.annual_fee) a += ` In the first year the fee is ${formatCurrency(card.first_year_fee, cur)}.`;
          return a;
        })(),
  });

  // Welcome bonus.
  if (card.welcome_bonus || card.welcome_bonus_points || card.welcome_bonus_value > 0) {
    let a: string;
    if (card.welcome_bonus) {
      a = stripTrailingPunct(card.welcome_bonus) + '.';
    } else if (card.welcome_bonus_points) {
      a = `The ${card.name} offers a welcome bonus of ${card.welcome_bonus_points.toLocaleString()} points.`;
    } else {
      a = `The ${card.name} offers a welcome bonus worth about ${formatCurrency(card.welcome_bonus_value, cur)}.`;
    }
    if (card.welcome_bonus_conditions) a += ` ${stripTrailingPunct(card.welcome_bonus_conditions)}.`;
    faqs.push({ q: `What welcome bonus does the ${card.name} offer?`, a });
  }

  // Foreign transaction fees (only when we actually know).
  if (card.foreign_transaction_fee === false) {
    faqs.push({
      q: `Does the ${card.name} charge foreign transaction fees?`,
      a: `No. The ${card.name} does not charge foreign transaction fees, so purchases in other currencies do not carry the usual surcharge.`,
    });
  } else if (card.foreign_transaction_fee === true) {
    const pct = card.foreign_transaction_fee_pct != null ? `${card.foreign_transaction_fee_pct}%` : 'the standard rate';
    faqs.push({
      q: `Does the ${card.name} charge foreign transaction fees?`,
      a: `Yes. The ${card.name} charges ${pct} on purchases made in a foreign currency, which is worth keeping in mind if you travel or shop abroad.`,
    });
  }

  // First-year value (only when positive, so we never surface a negative headline).
  if (card.first_year_value > 0) {
    let a = `We estimate the ${card.name} is worth roughly ${formatCurrency(card.first_year_value, cur)} in the first year.`;
    if (card.first_year_value_formula) a += ` That is based on ${stripDashes(card.first_year_value_formula)}.`;
    else a += ` That estimate values the welcome bonus at our baseline redemption rate and subtracts the annual fee.`;
    faqs.push({ q: `What is the ${card.name} worth in the first year?`, a });
  }

  // Who it is best for.
  faqs.push({
    q: `Who is the ${card.name} best for?`,
    a: `The ${card.name} is best for ${audienceFor(card)}.`,
  });

  // Main downsides (only when we have cons).
  if (card.cons.length > 0) {
    const list = card.cons.slice(0, 3).map(stripTrailingPunct);
    const a = list.length === 1
      ? `The main downside is that ${list[0].charAt(0).toLowerCase() + list[0].slice(1)}.`
      : `A few things to weigh: ${list.join('; ')}.`;
    faqs.push({ q: `What are the main downsides of the ${card.name}?`, a });
  }

  // Payment network (only when we actually know it). Always-answerable filler that
  // helps thin free cards reach a useful FAQ count without fabricating anything.
  if (card.network && card.network !== 'Unknown') {
    faqs.push({
      q: `What payment network does the ${card.name} use?`,
      a: `The ${card.name} runs on the ${card.network} network, so you can use it anywhere ${card.network} is accepted.`,
    });
  }

  // Where the card is offered. Answerable from country for every card.
  const countryName = card.country === 'CA' ? 'Canada' : card.country === 'US' ? 'the United States' : null;
  if (countryName) {
    faqs.push({
      q: `Is the ${card.name} available in ${card.country === 'CA' ? 'Canada' : 'the US'}?`,
      a: `Yes. The ${card.name} is a ${card.country === 'CA' ? 'Canadian' : 'US'} card offered in ${countryName}, and you generally need to be a resident with a local credit history to apply.`,
    });
  }

  return faqs.slice(0, 6);
}

export default async function CardDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = allCards.find(c => c.slug === slug);

  if (!card) {
    return (
      <div className="app norail">
        <main>
          <div className="head"><h1>404 · No Such Card</h1></div>
          <p className="cd-empty">That card isn’t in the registry. <Link href="/cards" style={{ color: 'var(--emerald)', fontWeight: 700 }}>← back to explorer</Link></p>
        </main>
      </div>
    );
  }

  const benefitEntries = Object.entries(card.benefits) as [keyof Benefits, boolean][];
  const active = benefitEntries.filter(([, v]) => v);
  const cpp = card.cpp_cad ?? 1.0;
  const val = valuationFor(card.rewards_program);
  const maxCpp = val.max ?? null;
  const bonusDisplay = card.welcome_bonus_points
    ? card.welcome_bonus_points.toLocaleString()
    : (card.welcome_bonus_value > 0 ? formatCurrency(card.welcome_bonus_value, card.country) : 'none');
  const fxLabel = card.foreign_transaction_fee === false
    ? '0%'
    : (card.foreign_transaction_fee_pct != null ? `${card.foreign_transaction_fee_pct}%` : 'n/a');

  const tags = TAG_DEFS.filter(([k]) => card.benefits[k]).map(([, l]) => l);

  const bottomLine = buildBottomLine(card);
  const faqs = buildCardFaqs(card);

  // Drop APR/interest-rate rows that leaked into earn_rates (no card earns >10× base).
  const earnRates = [...card.earn_rates]
    .filter(er => { const n = parseFloat(er.rate); return isNaN(n) || n <= 10; })
    .sort((a, b) => (parseFloat(b.rate) || 0) - (parseFloat(a.rate) || 0));

  const similar = allCards
    .filter(c => c.slug !== card.slug && c.card_type === card.card_type && c.country === card.country)
    .sort((a, b) => b.first_year_value - a.first_year_value)
    .slice(0, 4);

  return (
    <div className="app norail">
      <main>
        <nav className="crumb">
          <Link href="/">home</Link><span className="sep">/</span>
          <Link href="/cards">cards</Link><span className="sep">/</span>
          <span className="cur">{card.slug}</span>
        </nav>

        <div className="head">
          <h1>{card.name}</h1>
          <span className="meta">{card.issuer} · {card.rewards_program || card.card_type} · {card.network}</span>
        </div>

        <div className="cd-tags">
          <span className="tag em">{card.country === 'CA' ? 'Canada' : 'United States'}</span>
          <span className="tag">{card.card_type}</span>
          {card.is_business && <span className="tag">business</span>}
          {tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        {/* answer-first verdict */}
        {bottomLine && (
          <div className="cd-note">
            <div className="cap">The bottom line</div>
            <p style={{ margin: 0 }} className="sub">{bottomLine}</p>
          </div>
        )}

        {/* headline vitals */}
        <div className="vitals">
          <div className="vital">
            <div className="k">Annual fee</div>
            <div className={`val${card.annual_fee > 0 ? ' neg' : ''}`}>{card.annual_fee === 0 ? 'Free' : formatCurrency(card.annual_fee, card.country)}</div>
            {card.first_year_fee != null && card.first_year_fee !== card.annual_fee && (
              <div className="sub">{card.first_year_fee === 0 ? 'first year free' : `first year ${formatCurrency(card.first_year_fee, card.country)}`}</div>
            )}
          </div>
          <div className="vital">
            <div className="k">Welcome bonus</div>
            <div className="val">{bonusDisplay}</div>
            <div className="sub">{card.welcome_bonus_points ? 'points' : (card.welcome_bonus_value > 0 ? 'est. value' : 'none listed')}</div>
          </div>
          <div className="vital">
            <div className="k">Est. 12-mo value</div>
            <div className={`val ${card.first_year_value < 0 ? 'neg' : 'pos'}`}>{formatCurrency(card.first_year_value, card.country)}</div>
            <div className="sub">bonus × ¢/pt − fee</div>
          </div>
          {card.cpp_cad != null && (
            <div className="vital">
              <div className="k">Base ¢/pt</div>
              <div className="val">{cpp.toFixed(2)}</div>
              {maxCpp && <div className="sub">up to {maxCpp.toFixed(1)}¢ sweet spot</div>}
            </div>
          )}
          <div className="vital">
            <div className="k">Foreign txn</div>
            <div className={`val sm${fxLabel === '0%' ? ' pos' : ''}`}>{fxLabel}</div>
          </div>
          <div className="vital">
            <div className="k">Benefits</div>
            <div className="val sm">{active.length} / {benefitEntries.length}</div>
          </div>
        </div>

        {card.first_year_value_formula && (
          <p className="cd-formula">// {card.first_year_value_formula} = <b>{formatCurrency(card.first_year_value, card.country)}</b></p>
        )}

        {/* welcome bonus detail */}
        {card.welcome_bonus && (
          <>
            <div className="cd-sec">Welcome Offer</div>
            <div className="cd-note">
              {card.welcome_bonus}
              {card.welcome_bonus_conditions && <div className="fine">{card.welcome_bonus_conditions}</div>}
            </div>
          </>
        )}

        {/* notes for canadians */}
        {card.notes_for_canadians && (
          <>
            <div className="cd-sec">Note · For Canadians</div>
            <div className="cd-note red">{card.notes_for_canadians}</div>
          </>
        )}

        {/* earn rates */}
        <div className="cd-sec">Earn Rates</div>
        {earnRates.length > 0 ? (
          <div>
            {earnRates.map((er, i) => (
              <div key={i} className="erow">
                <span className="erate">{er.rate.match(/^[\d.]+x?/)?.[0] || er.rate}</span>
                <span className="ecat">{er.category}</span>
              </div>
            ))}
          </div>
        ) : card.earn_rates_summary ? (
          <p className="cd-empty">{card.earn_rates_summary}</p>
        ) : (
          <p className="cd-empty">no earn-rate data on file</p>
        )}

        {/* benefits */}
        <div className="cd-sec">Benefits &amp; Insurance</div>
        {card.benefits_incomplete ? (
          <p className="cd-empty">benefits data pending verification</p>
        ) : (
          <div className="benlist">
            {benefitEntries.map(([key, on]) => (
              <div key={key} className={`ben ${on ? 'on' : 'off'}`}>
                <span className="mk">{on ? '✓' : '·'}</span>{BENEFIT_LABELS[key]}
              </div>
            ))}
          </div>
        )}

        {/* key perks */}
        {card.key_perks.length > 0 && (
          <>
            <div className="cd-sec">Key Perks</div>
            <div className="cd-list">
              {card.key_perks.map((p, i) => <div key={i} className="cd-li">{p}</div>)}
            </div>
          </>
        )}

        {/* insurance detail */}
        {Object.keys(card.insurance).length > 0 && (
          <>
            <div className="cd-sec">Insurance Detail</div>
            <div className="kv">
              {Object.entries(card.insurance).map(([k, v]) => (
                <div key={k} className="kvrow">
                  <div className="kvk">{k.replace(/_/g, ' ')}</div>
                  <div className="kvv">{v}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* pros / cons */}
        {(card.pros.length > 0 || card.cons.length > 0) && (
          <>
            <div className="cd-sec">Assessment</div>
            <div className="proscons">
              <div>
                {card.pros.map((p, i) => <div key={i} className="pc-li pro"><span className="s">+</span>{p}</div>)}
              </div>
              <div>
                {card.cons.map((p, i) => <div key={i} className="pc-li con"><span className="s">−</span>{p}</div>)}
              </div>
            </div>
          </>
        )}

        {/* apply */}
        {card.apply_url && (
          <div style={{ marginTop: 18 }}>
            <a href={card.apply_url} target="_blank" rel="noopener noreferrer" className="cd-apply">APPLY →</a>
          </div>
        )}

        {/* similar */}
        {similar.length > 0 && (
          <>
            <div className="cd-sec">Similar Cards</div>
            <div>
              {similar.map(c => (
                <div key={c.slug} className="simrow">
                  <div style={{ minWidth: 0 }}>
                    <Link href={`/cards/${c.slug}`} className="sn">{c.name}</Link>
                    <div className="si">{c.issuer} · {c.annual_fee === 0 ? 'no fee' : `${formatCurrency(c.annual_fee, c.country)}/yr`}</div>
                  </div>
                  <span className="sv" style={c.first_year_value < 0 ? { color: 'var(--red)' } : undefined}>{formatCurrency(c.first_year_value, c.country)}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <>
            <div className="cd-sec">Frequently asked questions</div>
            {faqs.map((f, i) => (
              <div key={i}>
                <h4>{f.q}</h4>
                <p className="sub" style={{ marginTop: 4 }}>{f.a}</p>
              </div>
            ))}
          </>
        )}

        <p className="cd-formula" style={{ marginTop: 22 }}>// last updated {card.last_updated || 'n/a'} · est. value = welcome bonus × base ¢/pt − annual fee</p>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // A credit card is a financial product, not a retail Product. Using
            // schema.org/CreditCard (no offers/price) avoids Google's Merchant-listing
            // and Product-snippet requirements (image, availability, reviews, etc.),
            // which do not apply to cards and which we will not fabricate.
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CreditCard',
              name: card.name,
              description: `${card.name} by ${card.issuer}. ${card.card_type} credit card.`,
              provider: { '@type': 'Organization', name: card.issuer },
            }),
          }}
        />

        {/* FAQPage schema, built from the SAME faqs array as the visible FAQ so
            they can never drift. Rendered only when at least one FAQ exists. */}
        {faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map(f => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              }),
            }}
          />
        )}
      </main>
    </div>
  );
}
