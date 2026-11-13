import type { Metadata } from "next";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ogMeta } from "@/lib/og";
import s from "../simple-page.module.css";

export const metadata: Metadata = {
  title: "Newsletter | FinTerminal",
  description:
    "Canada's no-fluff cards and points brief. One short, honest email with the best current offers, a points tip worth using, and a personal-finance note or two.",
  alternates: { canonical: "/newsletter" },
  ...ogMeta("Newsletter", "Newsletter", "/newsletter"),
};

export default function NewsletterPage() {
  return (
    <main className="wrap page tone-neutral">
      <header className="page-head">
        <span className="eyebrow">Newsletter</span>
        <h1>The FinTerminal Brief</h1>
        <p className="dek">
          Canada&apos;s no-fluff cards and points brief. Every so often I send one short, honest email: the best
          current offers, a points tip worth using, and a personal-finance note or two. No daily spam, and you can
          leave any time.
        </p>
      </header>

      <div className={`doc ${s.body}`}>
        <section className={s.panel} aria-labelledby="nl-get">
          <h2 id="nl-get" className={s.panelTitle}>Get it in your inbox</h2>
          <NewsletterSignup />
          <p className={s.fine}>
            I only ever use your email to send this newsletter, and every issue has a one-click unsubscribe.
          </p>
        </section>

        <h2 className="cd-sec sm">What&apos;s in each issue</h2>
        <ul>
          <li>The best live card offers and deals, with the honest catch spelled out.</li>
          <li>Points sweet-spots and redemption ideas you can actually book.</li>
          <li>Plain-language personal-finance notes made for Canadians.</li>
        </ul>
      </div>
    </main>
  );
}
