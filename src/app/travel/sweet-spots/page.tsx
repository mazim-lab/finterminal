import type { Metadata } from "next";
import Link from "next/link";
import { SWEET_SPOTS } from "@/data/sweet-spots";
import { ogMeta } from "@/lib/og";
import { programGroups, programGuide, programTag, spotHref } from "../programs";
import s from "../travel.module.css";

const BASE = "https://www.finterminal.ca";
const TITLE = "Every sweet spot, by program";

export const metadata: Metadata = {
  title: "Sweet Spots: every worked points redemption | FinTerminal",
  description:
    "Every worked sweet-spot example on FinTerminal, grouped by loyalty program: Aeroplan, Avios, WestJet, Delta, United, Alaska, Flying Blue and more, each with the points price and the cents-per-point math.",
  alternates: { canonical: "/travel/sweet-spots" },
  ...ogMeta(TITLE, "Travel · Sweet spots", "/travel/sweet-spots"),
};

export default function SweetSpotsIndexPage() {
  const groups = programGroups();
  const latest = SWEET_SPOTS[0];

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FinTerminal sweet spots",
    numberOfItems: SWEET_SPOTS.length,
    itemListElement: SWEET_SPOTS.map((spot, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}${spotHref(spot)}`,
      name: spot.title,
    })),
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Travel", item: `${BASE}/travel` },
      { "@type": "ListItem", position: 3, name: "Sweet spots", item: `${BASE}/travel/sweet-spots` },
    ],
  };

  return (
    <div className="wrap tone-travel">
      <div className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span className="sep">/</span>
        <Link href="/travel">Travel</Link><span className="sep">/</span>
        <span className="cur" aria-current="page">Sweet spots</span>
      </nav>

      <header className="page-head">
        <span className="eyebrow">Sweet spots</span>
        <h1>{TITLE}</h1>
        <p className="dek">
          Each post walks through one real redemption: the route, the points price, the taxes, and the cents-per-point
          math, plus the catches. Pick a program to jump to its examples, newest first.
        </p>
        <div className={s.headStats}>
          <span><b>{SWEET_SPOTS.length}</b> posts</span>
          <span><b>{groups.length}</b> programs</span>
          {latest ? <span>latest <b>{latest.date}</b></span> : null}
        </div>
      </header>

      {groups.length > 0 ? (
        <nav className={s.jump} aria-label="Jump to a program">
          {groups.map((g) => (
            <a key={g.slug} href={`#${g.slug}`}>
              {g.program} <span>{g.spots.length}</span>
            </a>
          ))}
        </nav>
      ) : (
        <div className="empty">
          <h2 className={s.emptyH}>No sweet spots yet</h2>
          <p>The first worked example is on its way.</p>
        </div>
      )}

      {groups.map((g) => {
        const guide = programGuide(g.program);
        const tag = programTag(g.program);
        return (
          <section key={g.slug} id={g.slug} className={s.progSection} aria-labelledby={`${g.slug}-h`}>
            <div className={s.progHead}>
              <h2 id={`${g.slug}-h`}>{g.program}</h2>
              <span className="ct">{g.spots.length} post{g.spots.length === 1 ? "" : "s"}</span>
              {guide || tag ? (
                <span className={s.progLinks}>
                  {guide ? <Link href={guide.href}>{guide.label} &rarr;</Link> : null}
                  {tag ? <Link href={tag.href}>{tag.label} topic &rarr;</Link> : null}
                </span>
              ) : null}
            </div>
            <ul className="rows">
              {g.spots.map((spot) => (
                <li key={spot.slug} className={`row is-link ${s.spotRow}`}>
                  <span className="r-date">{spot.date}</span>
                  <div className="r-main">
                    <div className="r-title">
                      <Link href={spotHref(spot)}>{spot.title}</Link>
                    </div>
                    <p className={`r-sub ${s.clamp2}`}>{spot.dek}</p>
                    <div className={s.mobileMeta}>
                      <span>{spot.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{spot.read}</span>
                    </div>
                  </div>
                  <span className="r-end">{spot.read}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      </div>
    </div>
  );
}
