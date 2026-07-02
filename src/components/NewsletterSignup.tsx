"use client";

import { useState, type FormEvent } from "react";

// Same no-backend delivery as the contact form. Signups land in the inbox so
// the list can be built now; move to a proper email tool (beehiiv/Kit) with
// confirmed opt-in before sending any bulk mail, per CASL.
const ENDPOINT = "https://formsubmit.co/ajax/finterminal@tahleh.com";

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

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
          email: data.get("email"),
          source: compact ? "Newsletter signup (footer)" : "Newsletter signup",
          _subject: "New FinTerminal newsletter signup",
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json.success === true || json.success === "true")) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return <p className="nlok">You&apos;re on the list. Thanks for signing up.</p>;
  }

  return (
    <form className={compact ? "nlform compact" : "nlform"} onSubmit={onSubmit}>
      <input
        className="finput nlinput"
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        aria-label="Email address"
      />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
      <button className="fbtn nlbtn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "…" : "Subscribe"}
      </button>
      {status === "err" && <span className="ferr">Could not sign you up. Try again shortly.</span>}
    </form>
  );
}
