"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { SplitFlapWordmark } from "./SplitFlapWordmark";
import { Ticker } from "./Ticker";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBox } from "./SearchBox";

// Six plain words (spec 3.5). Routes are unchanged; only the labels moved:
// "Personal Finance" → Money, "Current Portfolio" → Portfolio.
const NAV = [
  { label: "Cards", href: "/cards" },
  { label: "Travel", href: "/travel" },
  { label: "Money", href: "/personal-finance" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "News", href: "/news" },
  { label: "Deals", href: "/deals" },
];

export function TerminalHeader() {
  const path = usePathname() || "/";
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <div className="topbar">
      <div className="brand">
        <SplitFlapWordmark />
      </div>

      <nav className="desknav" aria-label="Primary">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className={isActive(n.href) ? "on" : ""}>
            {n.label}
          </a>
        ))}
      </nav>

      <div className="right">
        <Ticker />
        <SearchBox />
        <ThemeToggle />
        <button
          type="button"
          className="navbtn"
          aria-expanded={open}
          aria-controls="mobnav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <>
          <div className="mobnav-overlay" onClick={() => setOpen(false)} />
          <nav className="mobnav" id="mobnav" aria-label="Primary">
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
