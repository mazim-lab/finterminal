"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E1110",
          color: "#CDD6D0",
          fontFamily:
            "ui-monospace, SFMono-Regular, 'JetBrains Mono', Menlo, Consolas, monospace",
          lineHeight: 1.5,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <main style={{ maxWidth: 520, padding: "40px 24px", textAlign: "left" }}>
          <h1
            style={{
              margin: "0 0 14px",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: "#CDD6D0",
            }}
          >
            The board went dark
          </h1>
          <p style={{ margin: "0 0 22px", color: "#93A098", fontSize: 15 }}>
            Something went wrong loading FinTerminal. Reloading usually clears it, and nothing you did caused this.
          </p>
          <button
            type="button"
            onClick={() => {
              reset();
              window.location.reload();
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.04em",
              color: "#46B36C",
              border: "1px solid #46B36C",
              background: "transparent",
              padding: "10px 20px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Reload the page
          </button>
        </main>
      </body>
    </html>
  );
}
