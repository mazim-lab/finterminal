"use client";

import { useState, type FormEvent } from "react";

// Posts straight into our Kit (finterminal.kit.com) inline form so subscribers
// land on the real list with Kit's double opt-in + one-click unsubscribe (CASL).
// This is the exact endpoint/field Kit's own embed script uses; no API key, so
// nothing secret ships in the repo.
const KIT_ENDPOINT = "https://app.kit.com/forms/9639853/subscriptions";

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return; // bot trap
    setStatus("sending");
    try {
      const res = await fetch(KIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email_address: data.get("email") }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.status !== "error" && !json?.errors) {
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
    return (
      <p className="nlok">
        Almost there. Check your inbox and click the confirmation link to finish signing up.
      </p>
    );
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
