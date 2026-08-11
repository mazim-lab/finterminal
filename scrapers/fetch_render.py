#!/usr/bin/env python3
"""Capture issuer card detail pages to markdown, for the benefits and offers refresh.

Reads a JSON target file mapping card slug -> render engine, looks each slug up in the
card decks, opens its apply_url in a real browser, scrolls the page so lazy-loaded
benefit sections render, converts the final HTML to markdown with markitdown, and writes
one .md per card.

Usage:
    python scrapers/fetch_render.py scrapers/my_targets.json

Target file format. The engine is "cr" for chromium or "ff" for firefox:
    {
      "cibc-aventura-visa-infinite-card": "cr",
      "american-express-gold-card": "ff"
    }
A bare slug resolves against the Canadian deck first, then the US deck. Prefix a slug
with "ca:" or "us:" to force which deck it comes from.

Prerequisites. Run this locally, never from cloud or cron:
  * pip install playwright markitdown  (see scrapers/requirements.txt)
  * playwright install chromium firefox
  * a residential IP. Issuers and Amex return 403 to datacenter addresses.

Per-issuer engine choices are documented in scrapers/SCRAPING.md. Amex blocks
page.evaluate under CSP, so "ff" targets are scrolled with the keyboard and their
"All Benefits" sub-tabs are clicked open rather than scrolled with JS.

Output goes to data/raw/cards/<slug>.md, or data/raw/cards/us-<slug>.md for US cards,
plus a per-run manifest at data/raw/cards/manifest_render_<date>_<target-stem>.json.
Everything under data/raw/ is gitignored and must never be committed. A capture under
MIN_CHARS is treated as a listing or redirect page rather than a card page: it is
reported as thin and discarded, leaving any previous capture in place. Never write into
scrapers/detail_cache, which IS tracked by git.
"""
import io
import json
import sys
import time
from datetime import date
from pathlib import Path

from markitdown import MarkItDown
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "raw" / "cards"

# Below this many characters a capture is a listing/redirect page, not a card page.
MIN_CHARS = 6000

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")

md = MarkItDown()


def load_decks():
    """Return slug -> (country, card), keeping CA and US entries distinct."""
    ca = json.load(open(ROOT / "src/data/canadian_cards_comprehensive.json", encoding="utf-8"))
    us = json.load(open(ROOT / "src/data/us_cards_comprehensive.json", encoding="utf-8"))
    byslug = {}
    for c in ca:
        byslug["ca:" + c["slug"]] = ("CA", c)
    for c in us:
        byslug["us:" + c["slug"]] = ("US", c)
    return byslug


def resolve(byslug, key):
    """Resolve a target key. Bare slugs prefer CA, then US; ca:/us: force a deck."""
    if key.startswith(("ca:", "us:")):
        return byslug.get(key)
    return byslug.get("ca:" + key) or byslug.get("us:" + key)


def render_js(browser, url):
    """Scroll to the bottom until the page stops growing, then capture."""
    ctx = browser.new_context(user_agent=UA, viewport={"width": 1440, "height": 1000})
    pg = ctx.new_page()
    pg.goto(url, wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(4000)
    last = 0
    for _ in range(25):
        try:
            h = pg.evaluate("document.body.scrollHeight")
            if h == last:
                break
            last = h
            pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        except Exception:
            break
        pg.wait_for_timeout(900)
    pg.wait_for_timeout(1500)
    html, final_url = pg.content(), pg.url
    ctx.close()
    return html, final_url


def render_keys(browser, url):
    """Amex: eval() is CSP-blocked, so keyboard-scroll and click the benefit tabs open."""
    ctx = browser.new_context(user_agent=UA, viewport={"width": 1440, "height": 1000})
    pg = ctx.new_page()
    pg.goto(url, wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(5000)
    for _ in range(40):
        pg.keyboard.press("End")
        pg.wait_for_timeout(350)
    # Click only these exact buttons. Clicking broadly by text hits nav links and
    # navigates away, which contaminates the capture.
    for label in ["Travel", "Shopping & Entertainment", "Rewards & Benefits", "Benefits"]:
        try:
            for el in pg.get_by_role("button", name=label).all()[:4]:
                try:
                    el.click(timeout=1500)
                    pg.wait_for_timeout(600)
                except Exception:
                    pass
        except Exception:
            pass
    pg.wait_for_timeout(1500)
    html, final_url = pg.content(), pg.url
    ctx.close()
    return html, final_url


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    target_file = Path(argv[1])
    targets = json.load(open(target_file, encoding="utf-8"))
    byslug = load_decks()
    OUT.mkdir(parents=True, exist_ok=True)

    engines = {e for e in targets.values()}
    out = []
    with sync_playwright() as p:
        cr = p.chromium.launch(headless=True) if "cr" in engines else None
        ff = p.firefox.launch(headless=True) if "ff" in engines else None
        for key, engine in targets.items():
            entry = resolve(byslug, key)
            if not entry:
                print(f"SKIP  {key}: not in deck", flush=True)
                out.append({"slug": key, "status": "not_in_deck"})
                continue
            country, card = entry
            url = card.get("apply_url")
            if not url:
                print(f"SKIP  {key}: no apply_url", flush=True)
                out.append({"slug": key, "status": "no_apply_url"})
                continue
            browser = ff if engine == "ff" else cr
            renderer = render_keys if engine == "ff" else render_js
            try:
                html, final_url = renderer(browser, url)
                text = md.convert_stream(
                    io.BytesIO(html.encode()), file_extension=".html"
                ).text_content
            except Exception as exc:  # noqa: BLE001
                print(f"FAIL  {key}: {type(exc).__name__} {exc}"[:200], flush=True)
                out.append({"slug": key, "status": "fetch_error", "error": type(exc).__name__})
                continue

            n = len(text)
            redirected = final_url.rstrip("/") != url.rstrip("/")
            slug = card["slug"]
            path = OUT / f"{'us-' if country == 'US' else ''}{slug}.md"
            if n < MIN_CHARS:
                kept = " (kept existing capture)" if path.exists() else ""
                print(f"THIN  {key}: {n} chars{kept} final={final_url}", flush=True)
                out.append({"slug": slug, "status": "thin", "chars": n, "final_url": final_url})
                continue
            path.write_text(text, encoding="utf-8")
            flag = f" REDIRECTED {final_url}" if redirected else ""
            print(f"OK    {key}: {n} chars -> {path.name}{flag}", flush=True)
            out.append({
                "slug": slug,
                "status": "ok",
                "country": country,
                "chars": n,
                "md_path": str(path.relative_to(ROOT)).replace("\\", "/"),
                "final_url": final_url,
                "redirected": redirected,
            })
            time.sleep(2)
        for b in (cr, ff):
            if b:
                b.close()

    manifest = OUT / f"manifest_render_{date.today().isoformat()}_{target_file.stem}.json"
    manifest.write_text(json.dumps(out, indent=2), encoding="utf-8")
    ok = sum(1 for r in out if r["status"] == "ok")
    print(f"\nDONE {ok}/{len(out)} captured -> {manifest.name}", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
