import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact — FinTerminal",
  description:
    "Reach the person behind FinTerminal: questions about cards or points, a request for an exclusive credit-card referral link, feedback, or a partnership and data enquiry.",
};

export default function ContactPage() {
  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <div className="head"><h1>Contact</h1></div>
          <p className="lede">
            One actual person runs FinTerminal, and that person reads every message. Use this to ask a question about
            cards or points, to request one of our exclusive credit-card referral links, to send feedback, or to talk
            partnerships and data. Pick a reason so I know how to help, and I&apos;ll get back to you.
          </p>

          <div className="cd-sec">Send a message</div>
          <ContactForm />

          <p className="lede" style={{ marginTop: 20, fontSize: 13 }}>
            Every message comes straight to my inbox. I read them myself and aim to reply within a few days.
          </p>
        </div>
      </main>
    </div>
  );
}
