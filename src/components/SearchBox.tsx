"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { KIND_LABELS, searchEntries, type SearchEntry } from "@/lib/search-index";

// Honest topbar search. Types filter a build-time index of cards and guides
// client-side; results group by kind and are keyboard navigable. The ⌘K / Ctrl-K
// hint is real: a global handler focuses this input from anywhere on the page.
export function SearchBox() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => (q.trim() ? searchEntries(q, 8) : []), [q]);

  // Group the flat result list by kind while preserving relevance order, so the
  // dropdown reads "Cards / Guides / News" but the highlighted index still walks
  // the same ordered array.
  const grouped = useMemo(() => {
    const order: SearchEntry["kind"][] = ["card", "guide", "news"];
    const flat: SearchEntry[] = [];
    const sections: { kind: SearchEntry["kind"]; items: { entry: SearchEntry; index: number }[] }[] = [];
    for (const kind of order) {
      const items = results
        .filter((r) => r.kind === kind)
        .map((entry) => {
          const index = flat.length;
          flat.push(entry);
          return { entry, index };
        });
      if (items.length) sections.push({ kind, items });
    }
    return { flat, sections };
  }, [results]);

  // Reset the highlight whenever the query text changes. Handled where q is set
  // (typing) rather than in an effect, so there is no cascading re-render.
  const setQuery = useCallback((next: string) => {
    setQ(next);
    setActive(0);
  }, []);

  // Real ⌘K / Ctrl-K: focus the search from anywhere. Escape blurs and closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close the dropdown on an outside click.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const go = (entry: SearchEntry) => {
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
    router.push(entry.href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!grouped.flat.length) {
      if (e.key === "Enter" && q.trim()) router.push(`/cards?q=${encodeURIComponent(q.trim())}`);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a + 1) % grouped.flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a - 1 + grouped.flat.length) % grouped.flat.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = grouped.flat[active];
      if (entry) go(entry);
    }
  };

  const showList = open && q.trim().length > 0;

  return (
    <div className="searchbox" ref={boxRef}>
      <input
        ref={inputRef}
        className="search"
        type="search"
        role="combobox"
        aria-expanded={showList}
        aria-controls="search-results"
        aria-autocomplete="list"
        aria-label="Search cards and guides"
        value={q}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="⌘K  search cards & guides"
      />
      {showList && (
        <div className="search-pop" id="search-results" role="listbox">
          {grouped.flat.length === 0 ? (
            <div className="search-empty">No matches for &ldquo;{q.trim()}&rdquo;</div>
          ) : (
            grouped.sections.map((section) => (
              <div className="search-group" key={section.kind}>
                <div className="search-grouplabel">{KIND_LABELS[section.kind]}</div>
                {section.items.map(({ entry, index }) => (
                  <button
                    key={entry.href}
                    type="button"
                    role="option"
                    aria-selected={index === active}
                    className={`search-opt${index === active ? " on" : ""}`}
                    onMouseEnter={() => setActive(index)}
                    onMouseDown={(e) => { e.preventDefault(); go(entry); }}
                  >
                    {entry.title}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
