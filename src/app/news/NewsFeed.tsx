"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { NewsItem } from "@/data/news";
import { humanToISO, monthLabel } from "./humanDate";
import s from "./news.module.css";

export type ArchiveItem = Pick<
  NewsItem,
  "slug" | "headline" | "dek" | "date" | "category" | "region" | "exclusive" | "sourceLabel" | "href" | "hrefLabel"
>;

// Every story is rendered into the HTML on the server. Items past the first
// page (or outside the chosen category) only get the `hidden` attribute, so the
// full archive is always in the prerendered markup and nothing shifts on load.
const PAGE = 20;
const ALL = "all";

export function NewsArchive({ items }: { items: ArchiveItem[] }) {
  const [cat, setCat] = useState<string>(ALL);
  const [visible, setVisible] = useState(PAGE);
  const listRef = useRef<HTMLDivElement>(null);

  const cats = useMemo(() => {
    const counts = new Map<string, number>();
    for (const it of items) counts.set(it.category, (counts.get(it.category) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [items]);

  // Rank each item within the current filter so "Load more" pages through it.
  const { shownFlags, matchCount } = useMemo(() => {
    let rank = 0;
    const flags = items.map((it) => {
      if (cat !== ALL && it.category !== cat) return false;
      return rank++ < visible;
    });
    return { shownFlags: flags, matchCount: rank };
  }, [items, cat, visible]);

  const groups = useMemo(() => {
    const out: { label: string; rows: { it: ArchiveItem; idx: number }[] }[] = [];
    items.forEach((it, idx) => {
      const label = monthLabel(it.date);
      const last = out[out.length - 1];
      if (last && last.label === label) last.rows.push({ it, idx });
      else out.push({ label, rows: [{ it, idx }] });
    });
    return out;
  }, [items]);

  const shownCount = Math.min(visible, matchCount);
  const remaining = matchCount - shownCount;

  function pick(next: string) {
    setCat(next);
    setVisible(PAGE);
  }

  function loadMore() {
    const firstNew = shownCount;
    setVisible((v) => v + PAGE);
    // Move focus to the first newly revealed story so keyboard users keep their place.
    requestAnimationFrame(() => {
      const links = listRef.current?.querySelectorAll<HTMLAnchorElement>(`li:not([hidden]) .${s.title} a`);
      links?.[firstNew]?.focus();
    });
  }

  return (
    <>
      {cats.length > 1 ? (
        <div className={s.filters} role="group" aria-label="Filter stories by category">
          <button type="button" className={s.fbtn} aria-pressed={cat === ALL} onClick={() => pick(ALL)}>
            All <span className={s.fct}>{items.length}</span>
          </button>
          {cats.map(([c, n]) => (
            <button key={c} type="button" className={s.fbtn} aria-pressed={cat === c} onClick={() => pick(c)}>
              {c} <span className={s.fct}>{n}</span>
            </button>
          ))}
        </div>
      ) : null}

      <p className={s.count} aria-live="polite">
        Showing {shownCount} of {matchCount} {cat === ALL ? "stories" : `in ${cat}`}
      </p>

      <div ref={listRef}>
        {groups.map((g) => {
          const anyShown = g.rows.some((r) => shownFlags[r.idx]);
          return (
            <div key={g.label} className={s.month} hidden={!anyShown}>
              <h3 className={s.monthLabel}>{g.label}</h3>
              <ol className={s.stories}>
                {g.rows.map(({ it, idx }) => (
                  <li key={it.slug} className={s.story} hidden={!shownFlags[idx]}>
                    <time className={s.when} dateTime={humanToISO(it.date) ?? undefined}>
                      <span className={s.whenDay}>{it.date.split(",")[0]}</span>
                    </time>
                    <div className={s.storyBody}>
                      <div className={s.chipsRow}>
                        <span className="chip">{it.category}</span>
                        <span className="chip">{it.region === "CA" ? "Canada" : "US"}</span>
                      </div>
                      <h4 className={s.title}>
                        <Link href={`/news/${it.slug}`}>{it.headline}</Link>
                      </h4>
                      <p className={s.dek}>{it.dek}</p>
                      {it.exclusive ? (
                        <p className={s.src}>According to {it.exclusive.join(" and ")}</p>
                      ) : it.sourceLabel ? (
                        <p className={s.src}>Source: {it.sourceLabel}</p>
                      ) : null}
                      <div className={s.actions}>
                        <Link href={`/news/${it.slug}`} className={s.act}>
                          Read the full story <span aria-hidden="true">&rarr;</span>
                        </Link>
                        {it.href ? (
                          <Link href={it.href} className={`${s.act} ${s.actAlt}`}>
                            {it.hrefLabel ?? "Open related section"} <span aria-hidden="true">&rarr;</span>
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>

      {remaining > 0 && (
        <button type="button" className="loadmore" onClick={loadMore}>
          Load more ({remaining} more)
        </button>
      )}
    </>
  );
}
