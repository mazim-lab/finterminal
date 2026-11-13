import Link from "next/link";
import s from "./status-page.module.css";

export const metadata = {
  title: "Page not found | FinTerminal",
  description: "That page is not here. Try the search, or jump to cards, travel, money or news.",
  robots: { index: false },
};

const ROUTES = [
  { href: "/cards", label: "Cards", dek: "Compare every card with the same formula", tone: "tone-cards" },
  { href: "/travel", label: "Travel", dek: "Points sweet spots and how to book them", tone: "tone-travel" },
  { href: "/personal-finance", label: "Money", dek: "Personal finance guides for Canadians", tone: "tone-money" },
  { href: "/news", label: "News", dek: "What changed in cards and points lately", tone: "tone-neutral" },
];

export default function NotFound() {
  return (
    <main className="wrap page">
      <div className={s.box}>
        <p className={s.code}>404</p>
        <h1 className={s.title}>Sorry, I couldn&apos;t find that page</h1>
        <p className={s.copy}>
          It may have moved, or the link has a typo. The search box at the top of every page (press{" "}
          <kbd className={s.kbd}>Ctrl</kbd> <kbd className={s.kbd}>K</kbd>) is the quickest way to find it again.
        </p>

        <ul className={`grid-2 ${s.routes}`}>
          {ROUTES.map((r) => (
            <li key={r.href} className={`link-card has-stripe ${r.tone}`}>
              <span className="lc-kicker">{r.label}</span>
              <span className="lc-title"><Link href={r.href}>{r.dek}</Link></span>
            </li>
          ))}
        </ul>

        <p className={s.home}>
          <Link href="/" className="btn btn-primary">Back to the home page</Link>
        </p>
      </div>
    </main>
  );
}
