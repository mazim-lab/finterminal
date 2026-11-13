import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ogMeta } from "@/lib/og";
import s from "../simple-page.module.css";

export const metadata: Metadata = {
  title: "Contact | FinTerminal",
  description:
    "Reach the person behind FinTerminal: questions about cards or points, a request for an exclusive credit-card referral link, feedback, or a partnership and data enquiry.",
  alternates: { canonical: "/contact" },
  ...ogMeta("Contact", "Contact", "/contact"),
};

export default function ContactPage() {
  return (
    <div className="wrap page tone-neutral">
      <header className="page-head">
        <span className="eyebrow">Contact</span>
        <h1>Contact</h1>
        <p className="dek">
          One actual person runs FinTerminal, and that person reads every message. Use this to ask a question about
          cards or points, to request one of my exclusive credit-card referral links, to send feedback, or to talk
          partnerships and data. Pick a reason so I know how to help, and I&apos;ll get back to you.
        </p>
      </header>

      <div className={`doc ${s.body}`}>
        <section className={s.panel} aria-labelledby="send-msg">
          <h2 id="send-msg" className={s.panelTitle}>Send a message</h2>
          <ContactForm />
          <p className={s.fine}>
            Every message comes straight to my inbox. I read them myself and aim to reply within a few days.
          </p>
        </section>
      </div>
    </div>
  );
}
