import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ogMeta } from "@/lib/og";

export const metadata = {
  title: "Newsletter | FinTerminal",
  description:
    "Canada's no-fluff cards and points brief. One short, honest email with the best current offers, a points tip worth using, and a personal-finance note or two.",
  ...ogMeta("Newsletter", "Newsletter"),
};

export default function NewsletterPage() {
  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <div className="head"><h1>The FinTerminal Brief</h1></div>
          <p className="lede">
            Canada&apos;s no-fluff cards and points brief. Every so often I send one short, honest email: the best
            current offers, a points tip worth using, and a personal-finance note or two. No sponsored noise, no daily
            spam, and you can leave any time.
          </p>

          <div className="cd-sec">Get it in your inbox</div>
          <NewsletterSignup />

          <ul style={{ marginTop: 16 }}>
            <li>The best live card offers and deals, with the honest catch spelled out.</li>
            <li>Points sweet-spots and redemption ideas you can actually book.</li>
            <li>Plain-language personal-finance notes made for Canadians.</li>
          </ul>

          <p className="lede" style={{ marginTop: 18, fontSize: 13 }}>
            We only ever use your email to send this newsletter, and every issue has a one-click unsubscribe.
          </p>
        </div>
      </main>
    </div>
  );
}
