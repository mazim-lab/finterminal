"use client";

import { useState, type FormEvent } from "react";

// FormSubmit routes the message straight to the inbox below. No backend, no
// secrets in the repo. The address is a dedicated business inbox; first-ever
// submission triggers a one-time "activate form" email that must be clicked.
const ENDPOINT = "https://formsubmit.co/ajax/finterminal@tahleh.com";

const REASONS = [
  "A question about cards or points",
  "Request an exclusive referral link",
  "Feedback about the site",
  "Partnership, data, or API enquiry",
  "Something else",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [reason, setReason] = useState(REASONS[0]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return; // bot trap
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          reason: data.get("reason"),
          message: data.get("message"),
          _subject: `FinTerminal contact: ${data.get("reason")}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json.success === true || json.success === "true")) {
        setStatus("ok");
        form.reset();
        setReason(REASONS[0]);
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="fok" role="status">
        Thanks, your message is on its way. One actual person reads everything here, and I&apos;ll reply to the
        email you gave, usually within a few days.
      </div>
    );
  }

  return (
    <form className="fform" onSubmit={onSubmit}>
      <div className="ffield">
        <label className="flabel" htmlFor="c-name">Name</label>
        <input className="finput" id="c-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="ffield">
        <label className="flabel" htmlFor="c-email">Email</label>
        <input className="finput" id="c-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
      </div>
      <div className="ffield">
        <label className="flabel" htmlFor="c-reason">What is this about?</label>
        <select
          className="finput fselect"
          id="c-reason"
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          {REASONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="ffield">
        <label className="flabel" htmlFor="c-message">Message</label>
        <textarea className="finput ftext" id="c-message" name="message" rows={6} required placeholder="Tell me what you need…" />
      </div>

      {/* honeypot: real people leave this empty */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />

      <div className="frow">
        <button className="fbtn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "err" && (
          <span className="ferr">Something went wrong sending that. Please try again in a moment.</span>
        )}
      </div>
    </form>
  );
}
