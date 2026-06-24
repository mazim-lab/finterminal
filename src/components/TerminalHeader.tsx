"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { SplitFlapWordmark } from "./SplitFlapWordmark";
import { Ticker } from "./Ticker";

const NAV = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Personal Finance", href: "/personal-finance" },
  { label: "Deals", href: "/deals" },
  { label: "Credit Cards", href: "/cards" },
  { label: "Travel & Points", href: "/travel" },
  { label: "Current Portfolio", href: "/portfolio" },
];

export function TerminalHeader() {
  const path = usePathname() || "/";
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  // On mobile the tab strip is hidden, so tapping the wordmark opens a dropdown
  // of the tabs. On desktop the wordmark stays a plain link to home.
  const onBrandClick = (e: MouseEvent) => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width:760px)").matches) {
      e.preventDefault();
      setOpen((o) => !o);
    }
  };

  return (
    <div className="topbar">
      <div className={`brand${open ? " open" : ""}`} onClickCapture={onBrandClick}>
        <SplitFlapWordmark />
        <span className="navcaret" aria-hidden="true">▾</span>
      </div>

      <nav className="desknav">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className={isActive(n.href) ? "on" : ""}>
            {n.label}
          </a>
        ))}
      </nav>

      <div className="right">
        <Ticker />
        <input
          className="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") router.push(`/cards${q ? `?q=${encodeURIComponent(q)}` : ""}`); }}
          placeholder="⌘K  search 195 cards…"
        />
      </div>

      {open && (
        <>
          <div className="mobnav-overlay" onClick={() => setOpen(false)} />
          <nav className="mobnav">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={isActive(n.href) ? "on" : ""} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ))}
          </nav>
        </>
      )}
    </div>
  );
}
