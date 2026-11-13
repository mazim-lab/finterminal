import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterSignup } from "./NewsletterSignup";

const COLS = [
  {
    title: "Sections",
    links: [
      { label: "Credit cards", href: "/cards" },
      { label: "Travel and points", href: "/travel" },
      { label: "Sweet spots", href: "/travel/sweet-spots" },
      { label: "Personal finance", href: "/personal-finance" },
      { label: "Rates", href: "/rates" },
      { label: "News", href: "/news" },
      { label: "Deals", href: "/deals" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    title: "Tools and method",
    links: [
      { label: "Compare cards", href: "/compare" },
      { label: "How we value points", href: "/how-we-value-points" },
      { label: "US cards for Canadians", href: "/guides/us-cards-for-canadians" },
      { label: "All topics", href: "/tags" },
      { label: "Site directory", href: "/directory" },
    ],
  },
  {
    title: "FinTerminal",
    links: [
      { label: "About", href: "/about" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Contact", href: "/contact" },
      { label: "Disclosure", href: "/disclosure" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Logo />
            <p>
              Canadian cards, points, travel and everyday money, written by one dad in Ontario.
              Numbers carry the date we last checked them.
            </p>
            <div className="foot-nl">
              <span className="nl-label">A short cards and points email. No spam.</span>
              <NewsletterSignup compact />
            </div>
          </div>
          {COLS.map((c) => (
            <nav className="foot-col" key={c.title} aria-label={c.title}>
              <h2>{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="foot-legal">
          <p>
            FinTerminal has no affiliate links right now. If that changes, the disclosure page will
            say so first, and it will never change our rankings or what we recommend.{" "}
            <Link href="/disclosure">Learn more</Link>. General information, not financial advice.
          </p>
          <span>© {year} FinTerminal</span>
        </div>
      </div>
    </footer>
  );
}
