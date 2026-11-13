"use client";

import { useEffect } from "react";

// global-error replaces the root layout, so none of site.css loads here.
// Minimal inline styles using the FAEConf hex values, light and dark.
const CSS = `
:root{--bg:#ffffff;--surface:#ffffff;--text:#18181b;--text-2:#52525b;--text-3:#6b6b75;--border:#e4e4e7;--accent:#18181b;--on-accent:#ffffff}
@media (prefers-color-scheme:dark){:root{--bg:#0d0f16;--surface:#141722;--text:#ecebe6;--text-2:#a9adbb;--text-3:#8a8fa0;--border:#272c3d;--accent:#ecebe6;--on-accent:#0d0f16}}
*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:flex;flex-direction:column;background:var(--bg);color:var(--text);
  font-family:Inter,system-ui,-apple-system,'Segoe UI',sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}
.bar{height:3px;background:linear-gradient(90deg,#4f46e5 0 33.33%,#0891b2 33.33% 66.66%,#c026d3 66.66%)}
main{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 16px}
.box{max-width:520px;width:100%}
.k{font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--text-3)}
h1{font-size:30px;font-weight:700;letter-spacing:-.025em;line-height:1.15;margin-top:8px}
p.c{font-size:17px;line-height:1.6;color:var(--text-2);margin:12px 0 24px}
button{display:inline-flex;align-items:center;height:44px;padding:0 20px;border-radius:7px;border:1px solid var(--accent);
  background:var(--accent);color:var(--on-accent);font:inherit;font-size:14.5px;font-weight:600;cursor:pointer}
button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
`;

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
    <html lang="en-CA">
      <head>
        <title>Something went wrong | FinTerminal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </head>
      <body>
        <div className="bar" aria-hidden="true" />
        <main>
          <div className="box">
            <p className="k">FinTerminal</p>
            <h1>Something went wrong</h1>
            <p className="c">
              Something went wrong loading FinTerminal. Reloading usually clears it, and nothing you did caused this.
            </p>
            <button
              type="button"
              onClick={() => {
                reset();
                window.location.reload();
              }}
            >
              Reload the page
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
