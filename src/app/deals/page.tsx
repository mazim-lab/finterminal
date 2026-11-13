import type { Metadata } from "next";
import type { Deal } from "@/data/deals";
import { DEALS, dealsTodayISO, isDealExpired } from "@/data/deals";
import { ogMeta } from "@/lib/og";
import { ageLabel, daysBetween, humanToISO, isoToHuman } from "@/app/news/humanDate";
import s from "./deals.module.css";

export const metadata: Metadata = {
  title: "Deals | FinTerminal",
  description: "A short, hand-picked list of genuinely good deals for Canadians. Links go straight to the merchant.",
  alternates: { canonical: "/deals" },
  ...ogMeta("Deals", "Deals"),
};

// Live deals posted within this many days count as "Recent picks"; older live
// deals (usually ones with no end date) sit under "Still listed".
const RECENT_DAYS = 30;
// If even the newest live pick is older than this, we say so up top.
const STALE_DAYS = 21;

type Aged = { d: Deal; postedISO: string | null; age: number | null };

function withAge(d: Deal, today: string): Aged {
  const postedISO = humanToISO(d.posted);
  return { d, postedISO, age: postedISO ? daysBetween(postedISO, today) : null };
}

function Price({ d, big }: { d: Deal; big?: boolean }) {
  if (!d.price) return null;
  return (
    <span className={`${s.price} ${big ? s.priceBig : ""}`}>
      <span className={s.priceLabel}>Price when posted</span>
      <span className={s.now}>{d.price}</span>
      {d.was ? (
        <span className={s.was}>
          <span className="sr-only">was </span>
          <s>{d.was}</s>
        </span>
      ) : null}
    </span>
  );
}

function Posted({ a, archived }: { a: Aged; archived?: boolean }) {
  const old = !archived && a.age !== null && a.age > STALE_DAYS;
  return (
    <span className={s.posted}>
      Posted <time dateTime={a.postedISO ?? undefined}>{a.d.posted}</time>
      {a.age !== null && !archived ? (
        <span className={old ? s.ageOld : s.age}> ({ageLabel(a.age)})</span>
      ) : null}
    </span>
  );
}

function ViewLink({ d, primary }: { d: Deal; primary?: boolean }) {
  return (
    <a
      href={d.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${primary ? "btn-primary" : ""} ${s.view}`}
    >
      View at {d.merchant}
      <span className="sr-only">: {d.title} (opens in a new tab)</span>
      <span aria-hidden="true">&#8599;</span>
    </a>
  );
}

/** Full card, used for recent picks. */
function DealCard({ a }: { a: Aged }) {
  const { d } = a;
  return (
    <article className={s.card}>
      <div className={s.cardTop}>
        <span className="chip">{d.category}</span>
        <span className={s.merchant}>{d.merchant}</span>
      </div>
      <h3 className={s.cardTitle}>{d.title}</h3>
      <Price d={d} big />
      <p className={s.blurb}>{d.blurb}</p>
      <div className={s.cardMeta}>
        <Posted a={a} />
        {d.expires ? <span className="chip chip-amber">{d.expires}</span> : null}
      </div>
      <div className={s.cardCta}>
        <ViewLink d={d} primary />
      </div>
    </article>
  );
}

/** Compact row, used for older listings and the archive. The full note sits in a disclosure. */
function DealRow({ a, archived }: { a: Aged; archived?: boolean }) {
  const { d } = a;
  return (
    <li className={`${s.row} ${archived ? s.rowArchived : ""}`}>
      <div className={s.rowMain}>
        <h3 className={s.rowTitle}>{d.title}</h3>
        <div className={s.rowPosted}>
          <Posted a={a} archived={archived} />
        </div>
        <div className={s.rowMeta}>
          <span className={s.merchant}>{d.merchant}</span>
          <span className="chip">{d.category}</span>
          {archived ? <span className="chip chip-red">Expired</span> : null}
          {d.expires ? (
            <span className={archived ? s.endedLabel : "chip chip-amber"}>{d.expires}</span>
          ) : null}
        </div>
        <details className={s.note}>
          <summary>Our note</summary>
          <p>{d.blurb}</p>
        </details>
      </div>
      <div className={s.rowEnd}>
        <Price d={d} />
        <ViewLink d={d} />
      </div>
    </li>
  );
}

export default async function DealsPage() {
  const today = dealsTodayISO();
  const source = DEALS;
  const active = source.filter((d) => !isDealExpired(d, today)).map((d) => withAge(d, today));
  // Most-recently-expired first.
  const archived = source
    .filter((d) => isDealExpired(d, today))
    .sort((a, b) => (b.expiresAt ?? "").localeCompare(a.expiresAt ?? ""))
    .map((d) => withAge(d, today));

  // An unparseable posted date never counts as recent.
  const recent = active.filter((a) => a.age !== null && a.age <= RECENT_DAYS);
  const older = active.filter((a) => a.age === null || a.age > RECENT_DAYS);

  const ages = active.map((a) => a.age).filter((n): n is number => n !== null);
  const newestAge = ages.length ? Math.min(...ages) : null;
  const newest = active.find((a) => a.age === newestAge) ?? null;
  const stale = newestAge === null || newestAge > STALE_DAYS;

  return (
    <div className="wrap">
    <div className="page tone-neutral">
      <header className="page-head">
        <span className="eyebrow">Deals</span>
        <h1>Deals worth passing along</h1>
        <p className="dek">
          A short, hand-picked list of things that save you real money: good gear at a proper discount, or buys that pay
          for themselves. Every link goes straight to the merchant, and we checked each price on their own page the day
          we posted it.
        </p>
        <div className="meta">
          <span>{active.length} listed</span>
          <span className="sep" aria-hidden="true">/</span>
          <span>{recent.length} posted in the last {RECENT_DAYS} days</span>
          <span className="sep" aria-hidden="true">/</span>
          <span>{archived.length} in the archive</span>
          <span className="sep" aria-hidden="true">/</span>
          <span>
            ages as of <time dateTime={today}>{isoToHuman(today)}</time>
          </span>
        </div>
      </header>

      {stale && active.length > 0 ? (
        <div className={`notice amber ${s.notice}`} role="note">
          <span className={s.noticeMark} aria-hidden="true">!</span>
          <p>
            <strong>Heads up, we haven&apos;t added a new pick in a while.</strong>{" "}
            {newest ? (
              <>
                The newest one below went up on {newest.d.posted}. Prices move fast, so some of these may have gone up
                or sold out since we posted them.
              </>
            ) : (
              <>Prices move fast, so some of these may have gone up or sold out since we posted them.</>
            )}{" "}
            Give the merchant page a quick look before you buy.
          </p>
        </div>
      ) : null}

      <section className={s.section} aria-labelledby="deals-recent">
        <div className="section-head">
          <h2 id="deals-recent">Recent picks</h2>
          <p>Posted in the last {RECENT_DAYS} days</p>
        </div>
        {recent.length ? (
          <div className={s.grid}>
            {recent.map((a, i) => <DealCard key={`${a.d.url}-${i}`} a={a} />)}
          </div>
        ) : (
          <div className="empty">
            <h3>Nothing new in the last {RECENT_DAYS} days</h3>
            <p>
              We only post a deal after checking it on the merchant&apos;s own page, and we haven&apos;t added one
              lately. {older.length ? "The older picks below are still listed because they never had an end date." : "Check back soon."}
            </p>
          </div>
        )}
      </section>

      {older.length > 0 && (
        <section className={s.section} aria-labelledby="deals-older">
          <div className="section-head">
            <h2 id="deals-older">Still listed</h2>
            <p>Posted more than {RECENT_DAYS} days ago</p>
          </div>
          <p className={s.sectionNote}>
            These were good prices when we found them and the merchant never gave an end date, so we leave them up.
            Treat them as leads rather than promises and check the price before you buy.
          </p>
          <ul className={s.rows}>
            {older.map((a, i) => <DealRow key={`${a.d.url}-${i}`} a={a} />)}
          </ul>
        </section>
      )}

      {archived.length > 0 && (
        <section className={s.section} aria-labelledby="deals-archive">
          <details className={`acc ${s.archive}`}>
            <summary>
              <h2 id="deals-archive" className={s.archiveTitle}>Archive</h2>
              <span className={s.archiveCount}>{archived.length} expired</span>
            </summary>
            <div className={s.archiveBody}>
              <p className={s.sectionNote}>
                These have passed their end date and are likely gone, but we keep them here for the record. Prices
                and offers below are no longer current.
              </p>
              <ul className={s.rows}>
                {archived.map((a, i) => <DealRow key={`${a.d.url}-${i}`} a={a} archived />)}
              </ul>
            </div>
          </details>
        </section>
      )}

      <p className={s.fine}>
        Deals change fast and can sell out or expire without notice. Prices and terms are set by the merchant, so
        always confirm the details on their page before you buy.
      </p>
    </div>
    </div>
  );
}
