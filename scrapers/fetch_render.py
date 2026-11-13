#!/usr/bin/env python3
"""Capture issuer card detail pages to markdown, for the benefits and offers refresh.

Reads a JSON target file mapping card slug -> render engine, looks each slug up in the
card decks, opens its apply_url in a real browser, scrolls the page so lazy-loaded
benefit sections render, converts the final HTML to markdown with markitdown, and writes
one .md per card.

Usage:
    python scrapers/fetch_render.py scrapers/my_targets.json

Target file format. The engine is "cr" for chromium, "ff" for firefox with keyboard
scrolling (Amex), or "ffjs" for firefox with JS scrolling (BMO, PC Financial, Simplii and
Triangle, which refuse chromium):
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

BROWSER LIMIT (hard rule, owner's instruction 2026-11-13). Run ONE fetch_render.py at a
time, sequentially through one targets file. Never launch parallel issuer waves, and never
run it alongside other agents that build, test or drive browsers. On 2026-11-13 eleven
parallel waves left about 55 headless Chrome and 16 Firefox processes alive and starved
the machine. The script enforces this:
  * MAX_BROWSERS = 3. One invocation never has more than 3 browser instances open, and it
    opens one page at a time. The FETCH_RENDER_MAX_BROWSERS env var may LOWER the cap
    (minimum 1) but can never raise it above 3.
  * A lock file (data/raw/fetch_render.lock, holding the PID) makes a second invocation
    refuse to start while one is running. A lock whose PID is no longer alive, or that
    is older than LOCK_STALE_HOURS, is treated as stale and replaced.
  * Every browser and context is closed in a finally block, even after errors.
"""
import ctypes
import io
import json
import os
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

# Hard cap on simultaneously open browser instances. Never raise this above 3.
MAX_BROWSERS = 3
LOCK = ROOT / "data" / "raw" / "fetch_render.lock"
LOCK_STALE_HOURS = 6


def browser_cap():
    """MAX_BROWSERS, optionally lowered (never raised) by FETCH_RENDER_MAX_BROWSERS."""
    try:
        env = int(os.environ.get("FETCH_RENDER_MAX_BROWSERS", MAX_BROWSERS))
    except ValueError:
        env = MAX_BROWSERS
    return max(1, min(MAX_BROWSERS, env))


def _pid_alive(pid):
    """True if a process with this PID exists. Never sends a signal (os.kill(pid, 0)
    would terminate the process on Windows)."""
    if pid <= 0:
        return False
    if os.name == "nt":
        k32 = ctypes.windll.kernel32
        h = k32.OpenProcess(0x1000, False, pid)  # PROCESS_QUERY_LIMITED_INFORMATION
        if not h:
            return False
        try:
            code = ctypes.c_ulong()
            if not k32.GetExitCodeProcess(h, ctypes.byref(code)):
                return False
            return code.value == 259  # STILL_ACTIVE
        finally:
            k32.CloseHandle(h)
    try:
        os.kill(pid, 0)
    except ProcessLookupError:
        return False
    except PermissionError:
        return True
    return True


def acquire_lock():
    """Create the lock file atomically. Returns True on success, False if another live
    fetch_render.py holds it. Replaces a stale lock (dead PID or too old)."""
    LOCK.parent.mkdir(parents=True, exist_ok=True)
    for _ in range(2):
        try:
            fd = os.open(str(LOCK), os.O_CREAT | os.O_EXCL | os.O_WRONLY)
        except FileExistsError:
            try:
                info = json.loads(LOCK.read_text(encoding="utf-8"))
                pid, started = int(info.get("pid", 0)), float(info.get("started", 0))
            except (OSError, ValueError):
                pid, started = 0, 0.0
            age_h = (time.time() - started) / 3600 if started else 1e9
            if _pid_alive(pid) and age_h < LOCK_STALE_HOURS:
                print(f"REFUSING TO START: another fetch_render.py (PID {pid}) holds "
                      f"{LOCK}. Run one capture at a time.", flush=True)
                return False
            print(f"Removing stale lock (PID {pid}, age {age_h:.1f}h)", flush=True)
            try:
                LOCK.unlink()
            except FileNotFoundError:
                pass
            continue
        with os.fdopen(fd, "w", encoding="utf-8") as fh:
            json.dump({"pid": os.getpid(), "started": time.time()}, fh)
        return True
    return False


def release_lock():
    """Remove the lock only if this process owns it."""
    try:
        info = json.loads(LOCK.read_text(encoding="utf-8"))
        if int(info.get("pid", 0)) == os.getpid():
            LOCK.unlink()
    except (OSError, ValueError):
        pass


class BrowserPool:
    """Launches browsers lazily, keeps at most browser_cap() open, closes all on exit."""

    def __init__(self, playwright):
        self.p = playwright
        self.cap = browser_cap()
        self.open = {}  # engine -> browser, in launch order

    def get(self, engine):
        launcher = "firefox" if engine in ("ff", "ffjs") else "chromium"
        if launcher in self.open:
            return self.open[launcher]
        while len(self.open) >= self.cap:
            oldest = next(iter(self.open))
            self._close(oldest)
        b = getattr(self.p, launcher).launch(headless=True)
        self.open[launcher] = b
        return b

    def _close(self, key):
        b = self.open.pop(key, None)
        if b is not None:
            try:
                b.close()
            except Exception:  # noqa: BLE001
                pass

    def close_all(self):
        for key in list(self.open):
            self._close(key)


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
    try:
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
        return pg.content(), pg.url
    finally:
        ctx.close()


def render_keys(browser, url):
    """Amex: eval() is CSP-blocked, so keyboard-scroll and click the benefit tabs open."""
    ctx = browser.new_context(user_agent=UA, viewport={"width": 1440, "height": 1000})
    try:
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
        return pg.content(), pg.url
    finally:
        ctx.close()


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    if not acquire_lock():
        return 3
    try:
        return run(Path(argv[1]))
    finally:
        release_lock()


def capture_one(pool, byslug, key, engine):
    """Capture one target with a pooled browser; returns its manifest record.
    Engines: "ff" = firefox + keyboard scroll (Amex, CSP-safe); "ffjs" = firefox + JS
    scroll (BMO, PC Financial, Simplii, Triangle); anything else = chromium + JS scroll."""
    entry = resolve(byslug, key)
    if not entry:
        print(f"SKIP  {key}: not in deck", flush=True)
        return {"slug": key, "status": "not_in_deck"}
    country, card = entry
    url = card.get("apply_url")
    if not url:
        print(f"SKIP  {key}: no apply_url", flush=True)
        return {"slug": key, "status": "no_apply_url"}
    renderer = render_keys if engine == "ff" else render_js
    try:
        html, final_url = renderer(pool.get(engine), url)
        text = md.convert_stream(io.BytesIO(html.encode()), file_extension=".html").text_content
    except Exception as exc:  # noqa: BLE001
        print(f"FAIL  {key}: {type(exc).__name__} {exc}"[:200], flush=True)
        return {"slug": key, "status": "fetch_error", "error": type(exc).__name__}

    n = len(text)
    redirected = final_url.rstrip("/") != url.rstrip("/")
    slug = card["slug"]
    path = OUT / f"{'us-' if country == 'US' else ''}{slug}.md"
    if n < MIN_CHARS:
        kept = " (kept existing capture)" if path.exists() else ""
        print(f"THIN  {key}: {n} chars{kept} final={final_url}", flush=True)
        return {"slug": slug, "status": "thin", "chars": n, "final_url": final_url}
    path.write_text(text, encoding="utf-8")
    flag = f" REDIRECTED {final_url}" if redirected else ""
    print(f"OK    {key}: {n} chars -> {path.name}{flag}", flush=True)
    return {
        "slug": slug,
        "status": "ok",
        "country": country,
        "chars": n,
        "md_path": str(path.relative_to(ROOT)).replace("\\", "/"),
        "final_url": final_url,
        "redirected": redirected,
    }


def run(target_file):
    targets = json.load(open(target_file, encoding="utf-8"))
    byslug = load_decks()
    OUT.mkdir(parents=True, exist_ok=True)

    out = []
    with sync_playwright() as p:
        pool = BrowserPool(p)
        try:
            for key, engine in targets.items():
                rec = capture_one(pool, byslug, key, engine)
                out.append(rec)
                if rec["status"] == "ok":
                    time.sleep(2)
        finally:
            pool.close_all()

    manifest = OUT / f"manifest_render_{date.today().isoformat()}_{target_file.stem}.json"
    manifest.write_text(json.dumps(out, indent=2), encoding="utf-8")
    ok = sum(1 for r in out if r["status"] == "ok")
    print(f"\nDONE {ok}/{len(out)} captured -> {manifest.name}", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
