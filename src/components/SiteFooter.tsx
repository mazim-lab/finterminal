import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-foot">
      <span className="sf-disc">
        Some links on FinTerminal are affiliate links. If you buy through them we may earn a
        commission, at no extra cost to you. It never changes our rankings or what we recommend.{" "}
        <Link href="/disclosure">Learn more</Link>.
      </span>
      <span className="sf-meta">© {year} FinTerminal · independent · verified data · no sponsored noise</span>
    </footer>
  );
}
