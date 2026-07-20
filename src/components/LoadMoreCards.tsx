"use client";

import { Fragment, useState } from "react";
import Link from "next/link";

export type ListCard = {
  href: string;
  title: string;
  dek: string;
  /** Emerald-highlighted lead tag, e.g. "Strategy" or "Sweet spot". */
  tag: string;
  /** Remaining meta values shown after the tag, e.g. ["8 min read", "Jun 2026"]. */
  meta: string[];
};

// A simple, reusable "Load more" list of arow-card links. Server components pass
// plain card data; this client island handles revealing the archive a page at a time.
// Pass `gridClassName` to wrap the cards in a grid container (e.g. a two-up layout);
// omit it and the cards render as a plain stacked list, as before.
export function LoadMoreCards({
  cards,
  pageSize = 10,
  gridClassName,
}: {
  cards: ListCard[];
  pageSize?: number;
  gridClassName?: string;
}) {
  const [visible, setVisible] = useState(pageSize);
  const shown = cards.slice(0, visible);
  const remaining = cards.length - visible;

  const items = shown.map((c) => (
    <Link key={c.href} href={c.href} className="arow-card">
      <div className="at">{c.title}</div>
      <div className="ab">{c.dek}</div>
      <div className="am">
        <span className="tg">{c.tag}</span>
        {c.meta.map((m, j) => (
          <Fragment key={j}><span className="sep">·</span><span>{m}</span></Fragment>
        ))}
      </div>
    </Link>
  ));

  return (
    <>
      {gridClassName ? <div className={gridClassName}>{items}</div> : items}
      {remaining > 0 && (
        <button type="button" className="loadmore" onClick={() => setVisible((v) => v + pageSize)}>
          Load more ({remaining} more)
        </button>
      )}
    </>
  );
}
