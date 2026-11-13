"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBox } from "./SearchBox";

// Primary sections. Routes are frozen; only labels are ours to choose.
// Each pillar carries its FAEConf identity hue in the mobile menu dot.
export const PRIMARY_NAV = [
  { label: "Cards", href: "/cards", match: ["/cards", "/compare", "/how-we-value-points", "/guides"], dot: "var(--fin-d)" },
  { label: "Travel", href: "/travel", match: ["/travel"], dot: "var(--acct-d)" },
  { label: "Money", href: "/personal-finance", match: ["/personal-finance"], dot: "var(--econ-d)" },
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
  const menuRef = useRef<HTMLDetailsElement>(null);

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

  // The phone menu is a native <details> disclosure, so it opens and closes
  // with JavaScript off. With JavaScript on, React mirrors its open state to
  // add the extras: close on navigation and Escape, lock page scroll, and
  // mount the search box only while the menu is open.
  useEffect(() => {
    const el = menuRef.current;
    if (el && el.open !== open) el.open = open;
  }, [open]);

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
          <details
            ref={menuRef}
            className="menu"
            onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
          >
            <summary className="icon-btn menu-btn" aria-controls="mnav">
              <Menu aria-hidden="true" className="menu-ico-open" />
              <X aria-hidden="true" className="menu-ico-close" />
              <span className="sr-only">Menu</span>
            </summary>
            <div className="mnav" id="mnav">
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
          </details>
        </div>
      </div>
    </header>
  );
}
