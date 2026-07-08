import type { Deal } from "@/data/deals";
import { DEALS, dealsTodayISO, isDealExpired } from "@/data/deals";
import { ogMeta } from "@/lib/og";

export const metadata = {
  title: "Deals | FinTerminal",
  description: "A short, hand-picked list of genuinely good deals for Canadians. Links go straight to the merchant.",
  ...ogMeta("Deals", "Deals"),
};

function DealCard({ d }: { d: Deal }) {
  return (
    <a href={d.url} target="_blank" rel="noopener noreferrer" className="arow-card">
      <div className="at">{d.title}</div>
      <div className="ab">{d.blurb}</div>
      <div className="am">
        {d.price && (
          <>
            <span style={{ color: "var(--em)", fontWeight: 600 }}>{d.price}</span>
            {d.was && (
              <span style={{ color: "var(--ink-dim)", textDecoration: "line-through", marginLeft: 5 }}>{d.was}</span>
            )}
            <span className="sep">·</span>
          </>
        )}
        <span className="tg">{d.category}</span><span className="sep">·</span>
        <span>{d.merchant}</span><span className="sep">·</span>
        <span>{d.posted}</span>
        {d.expires && <><span className="sep">·</span><span>{d.expires}</span></>}
        <span className="ext">open →</span>
      </div>
    </a>
  );
}

export default async function DealsPage() {
  const today = dealsTodayISO();
  const source = DEALS;
  const active = source.filter((d) => !isDealExpired(d, today));
  // Most-recently-expired first.
  const archived = source.filter((d) => isDealExpired(d, today)).sort((a, b) =>
    (b.expiresAt ?? "").localeCompare(a.expiresAt ?? "")
  );

  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <div className="head"><h1>Deals</h1><span className="meta">hand-picked</span></div>

          <div className="cd-sec">Today&apos;s picks</div>
          {active.length ? (
            active.map((d, i) => <DealCard key={i} d={d} />)
          ) : (
            <div className="cd-empty">No live deals at the moment. Check back soon, we add fresh picks regularly.</div>
          )}

          {archived.length > 0 && (
            <details className="coll" style={{ marginTop: 14 }}>
              <summary className="cd-sec">Archive · {archived.length} expired</summary>
              <p className="lede" style={{ fontSize: 12.5, marginTop: 4 }}>
                These have passed their end date and are likely gone, but we keep them here for the record. Prices
                and offers below are no longer current.
              </p>
              <div style={{ opacity: 0.62 }}>
                {archived.map((d, i) => <DealCard key={i} d={d} />)}
              </div>
            </details>
          )}

          <p className="lede" style={{ marginTop: 18, fontSize: 12.5 }}>
            Deals change fast and can sell out or expire without notice. Prices and terms are set by the
            merchant, so always confirm the details on their page before you buy.
          </p>
        </div>
      </main>
    </div>
  );
}
