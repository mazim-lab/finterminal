"use client";

import { useEffect } from "react";

// global-error replaces the root layout, so none of site.css loads here.
// Minimal inline styles using the site's hex values, light and dark.
const CSS = `
:root{--bg:#ffffff;--surface:#ffffff;--text:#18181b;--text-2:#52525b;--text-3:#6b6b75;--border:#e4e4e7;--accent:#4338ca;--on-accent:#ffffff;--soft:#eef0ff}
@media (prefers-color-scheme:dark){:root{--bg:#0d0f16;--surface:#141722;--text:#ecebe6;--text-2:#a9adbb;--text-3:#8a8fa0;--border:#272c3d;--accent:#a5acff;--on-accent:#0d0f16;--soft:#1a1e47}}
*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:flex;flex-direction:column;background:var(--bg);color:var(--text);
  font-family:'Source Sans 3',system-ui,-apple-system,'Segoe UI',sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}
main{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 16px}
.box{max-width:560px;width:100%;background:var(--soft);border-radius:28px;padding:32px 28px}
.k{font-size:16px;font-weight:600;color:var(--accent)}
h1{font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:600;letter-spacing:-.01em;line-height:1.15;margin-top:8px}
p.c{font-size:17px;line-height:1.6;color:var(--text-2);margin:12px 0 24px}
button{display:inline-flex;align-items:center;height:44px;padding:0 20px;border-radius:999px;border:1px solid var(--accent);
  background:var(--accent);color:var(--on-accent);font:inherit;font-size:16px;font-weight:600;cursor:pointer}
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
