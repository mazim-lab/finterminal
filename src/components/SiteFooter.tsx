import Link from "next/link";
import { NewsletterSignup } from "./NewsletterSignup";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-foot">
      <div className="sf-nl">
        <span className="sf-nl-label">Canada&apos;s no-fluff cards &amp; points brief. One short email, no spam.</span>
        <NewsletterSignup compact />
      </div>

      <span className="sf-disc">
        Some links on FinTerminal are affiliate links. If you buy through them we may earn a
        commission, at no extra cost to you. It never changes our rankings or what we recommend.{" "}
        <Link href="/disclosure">Learn more</Link>.
      </span>

      <span className="sf-links">
        <Link href="/about">About</Link>
        {" · "}
        <Link href="/newsletter">Newsletter</Link>
        {" · "}
        <Link href="/contact">Contact</Link>
        {" · "}
        <Link href="/directory">Directory</Link>
        {" · "}
        <Link href="/disclosure">Disclosure</Link>
      </span>

      <span className="sf-meta">© {year} FinTerminal · verified data · dated on every number</span>
    </footer>
  );
}
