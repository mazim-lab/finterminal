import type { Metadata } from "next";
import Link from "next/link";
import { SWEET_SPOTS } from "@/data/sweet-spots";
import { TRAVEL_GUIDES, type TravelGuide } from "@/data/travel-guides";
import { ogMeta } from "@/lib/og";
import { programGroups, spotHref } from "./programs";
import s from "./travel.module.css";

export const metadata: Metadata = {
  title: "Travel & Points | FinTerminal",
  description:
    "Guides for turning Canadian credit card points into real trips: Aeroplan, Avios, AAdvantage and the transfer partners that feed them, plus worked sweet-spot examples you can copy.",
  alternates: { canonical: "/travel" },
  ...ogMeta("Travel & Points", "Travel & points", "/travel"),
};

// How the long-form guides are grouped on the hub. Any guide not listed here
// still renders, under "More guides", so adding one to TRAVEL_GUIDES just works.
const GUIDE_GROUPS: { label: string; slugs: string[] }[] = [
  {
    label: "Program playbooks",
    slugs: ["aeroplan-sweet-spots", "avios-sweet-spots-rbc-avion-transfer", "aadvantage-sweet-spots", "business-class-sweet-spots-canada"],
  },
  {
    label: "Moving your points",
    slugs: ["points-transfer-partners-canada", "amex-mr-to-aeroplan", "rbc-avion-to-aadvantage"],
  },
  {
    label: "Booking and the airport",
    slugs: ["how-to-book-award-flights-canada", "airline-alliances-guide-canada", "airport-lounge-access-canada"],
  },
];

function groupedGuides() {
  const bySlug = new Map(TRAVEL_GUIDES.map((g) => [g.slug, g]));
  const used = new Set<string>();
  const groups = GUIDE_GROUPS.map((grp) => ({
    label: grp.label,
    guides: grp.slugs.map((slug) => bySlug.get(slug)).filter((g): g is TravelGuide => {
      if (!g) return false;
      used.add(g.slug);
      return true;
    }),
  }));
  const rest = TRAVEL_GUIDES.filter((g) => !used.has(g.slug));
  if (rest.length) groups.push({ label: "More guides", guides: rest });
  return groups.filter((g) => g.guides.length > 0);
}

function GuideCard({ g }: { g: TravelGuide }) {
  return (
    <article className="link-card">
      <span className="lc-kicker">{g.tag}</span>
      <h4 className="lc-title">
        <Link href={`/travel/${g.slug}`}>{g.title}</Link>
      </h4>
      <p className={`lc-dek ${s.clamp3}`}>{g.dek}</p>
      <div className="lc-meta">
        <span>{g.read}</span>
        <span aria-hidden="true">·</span>
        <span>{g.date}</span>
      </div>
    </article>
  );
}

export default function TravelPage() {
  const guides = groupedGuides();
  const programs = programGroups();
  const [lead, ...others] = SWEET_SPOTS;
  const recent = others.slice(0, 5);

  return (
    <div className="wrap tone-travel">
      <div className="page">
      <header className="page-head">
        <span className="eyebrow">Travel &amp; points</span>
        <h1>Turn your points into actual trips</h1>
        <p className="dek">
          Most Canadian points are worth far more as a plane seat than as a statement credit, if you know where to
          aim them. Start with a program guide, then steal ideas from the worked
          examples, each dated so you know how fresh it is.
        </p>
        <div className={s.headStats}>
          <span><b>{TRAVEL_GUIDES.length}</b> guides</span>
          <span><b>{SWEET_SPOTS.length}</b> worked sweet spots</span>
          <span><b>{programs.length}</b> programs covered</span>
        </div>
      </header>

      <section className="section" aria-labelledby="guides-h">
        <div className="section-head">
          <h2 id="guides-h">The guides</h2>
          <p>The long reads, worth a coffee each.</p>
        </div>
        <div className={s.guideGroups}>
          {guides.map((grp) => (
            <div key={grp.label}>
              <h3 className={s.groupLabel}>{grp.label}</h3>
              <div className={s.guideGrid}>
                {grp.guides.map((g) => <GuideCard key={g.slug} g={g} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {lead ? (
        <section className="section" aria-labelledby="latest-h">
          <div className="section-head">
            <h2 id="latest-h">Latest sweet spots</h2>
            <Link className="more" href="/travel/sweet-spots">All {SWEET_SPOTS.length} sweet spots &rarr;</Link>
          </div>
          <div className={s.latest}>
            <article className={`link-card ${s.lead}`}>
              <span className="lc-kicker">Newest · {lead.program}</span>
              <h3 className="lc-title">
                <Link href={spotHref(lead)}>{lead.title}</Link>
              </h3>
              <p className={`lc-dek ${s.clampLead}`}>{lead.dek}</p>
              <div className="lc-meta">
                <span>{lead.date}</span>
                <span aria-hidden="true">·</span>
                <span>{lead.read}</span>
              </div>
            </article>
            {recent.length > 0 ? (
              <ul className={`rows ${s.latestList}`}>
                {recent.map((spot) => (
                  <li key={spot.slug} className="row is-link">
                    <div className="r-main">
                      <div className={s.rowMeta}>
                        <span className={s.prog}>{spot.program}</span>
                        <span aria-hidden="true">·</span>
                        <span>{spot.date}</span>
                      </div>
                      <div className={`r-title ${s.clamp2}`}>
                        <Link href={spotHref(spot)}>{spot.title}</Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      {programs.length > 0 ? (
        <section className="section" aria-labelledby="programs-h">
          <div className="section-head">
            <h2 id="programs-h">Browse sweet spots by program</h2>
            <p>We rotate through these programs, one new example at a time.</p>
          </div>
          <ul className={s.progGrid} role="list">
            {programs.map((grp) => (
              <li key={grp.slug} className={s.progTile}>
                <span className={s.progName}>
                  <Link href={`/travel/sweet-spots#${grp.slug}`}>{grp.program}</Link>
                </span>
                <span className={s.progCount}>
                  {grp.spots.length} post{grp.spots.length === 1 ? "" : "s"}
                  <span className={s.progDate}>latest {grp.spots[0].date}</span>
                </span>
                <span className={`${s.progLatest} ${s.clamp2}`}>{grp.spots[0].title}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className={s.footNote}>
        Each worked example walks through a real redemption on one program, with the date we last checked it. Want the math behind our point values?{" "}
        <Link href="/how-we-value-points">Here is how we value points</Link>.
      </p>
      </div>
    </div>
  );
}
