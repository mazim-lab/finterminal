"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBox } from "./SearchBox";

// Primary sections. Routes are frozen; only labels are ours to choose.
// Each pillar carries its FAEConf identity hue in the mobile menu dot.
export const PRIMARY_NAV = [
  { label: "Cards", href: "/cards", match: ["/cards", "/compare", "/how-we-value-points"], dot: "var(--fin-d)" },
  { label: "Travel", href: "/travel", match: ["/travel"], dot: "var(--acct-d)" },
  { label: "Money", href: "/personal-finance", match: ["/personal-finance", "/guides"], dot: "var(--econ-d)" },
  { label: "Rates", href: "/rates", match: ["/rates"], dot: "var(--econ-d)" },
  { label: "News", href: "/news", match: ["/news"], dot: "var(--neutral-mix)" },
  { label: "Deals", href: "/deals", match: ["/deals"], dot: "var(--neutral-mix)" },
  { label: "Portfolio", href: "/portfolio", match: ["/portfolio"], dot: "var(--neutral-mix)" },
];

const MORE_NAV = [
  { label: "All topics", href: "/tags" },
  { label: "How we value points", href: "/how-we-value-points" },
  { label: "Compare cards", href: "/compare" },
  { label: "Site directory", href: "/directory" },
  { label: "About", href: "/about" },
  { label: "Newsletter", href: "/newsletter" },
];

export function SiteHeader() {
  const path = usePathname() || "/";
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route change and lock page scroll while open.
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (match: string[]) => match.some((m) => path === m || path.startsWith(m + "/"));

  return (
    <header className="site-header">
      <div className="wrap hdr">
        <Logo />
        <nav className="nav" aria-label="Primary">
          {PRIMARY_NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(n.match) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hdr-right">
          <SearchBox />
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="mnav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className="mnav" id="mnav" hidden={!open}>
        {open && <SearchBox />}
        <nav className="mnav-group" aria-label="Sections">
          <div className="mnav-label">Sections</div>
          {PRIMARY_NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(n.match) ? "page" : undefined}>
              {n.label}
              <span className="mnav-dot" style={{ background: n.dot }} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <nav className="mnav-group mnav-sub" aria-label="More">
          <div className="mnav-label">More</div>
          {MORE_NAV.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
