#!/usr/bin/env python3
"""
Scrape remaining cards using Playwright Firefox.
BMO and PC Financial block Chromium but Firefox works.
"""
import json, os, time
from pathlib import Path
from playwright.sync_api import sync_playwright

DATA_DIR = Path(__file__).parent.parent / "src" / "data"
SCRAPE_DIR = Path(__file__).parent / "detail_cache"

ca_cards = json.load(open(DATA_DIR / "canadian_cards_comprehensive.json"))
cached = set(f.replace(".txt", "") for f in os.listdir(SCRAPE_DIR) if f.endswith(".txt"))

# Get remaining uncached cards with URLs
remaining = [c for c in ca_cards if c["slug"] not in cached and c.get("apply_url")]
print("Remaining uncached cards: {}".format(len(remaining)))
for c in remaining:
    print("  [{}] {} -> {}".format(c.get("issuer", "?"), c["slug"], c.get("apply_url", "N/A")[:80]))

if not remaining:
    print("Nothing to do!")
    exit(0)

with sync_playwright() as p:
    browser = p.firefox.launch(headless=True)
    context = browser.new_context(
        user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0"
    )
    page = context.new_page()
    
    success = 0
    fail = 0
    
    for card in remaining:
        slug = card["slug"]
        url = card["apply_url"]
        cache_file = SCRAPE_DIR / "{}.txt".format(slug)
        
        print("\n[{}] Fetching {}...".format(card.get("issuer", "?"), slug))
        try:
            page.goto(url, timeout=30000, wait_until="domcontentloaded")
            time.sleep(2)  # Let JS render
            
            text = page.inner_text("body")
            
            if len(text) > 200:
                cache_file.write_text(text)
                print("  OK: {} chars".format(len(text)))
                success += 1
            else:
                print("  WARN: too short ({} chars)".format(len(text)))
                fail += 1
        except Exception as e:
            print("  FAIL: {}".format(str(e)[:200]))
            fail += 1
        
        time.sleep(1)
    
    browser.close()

print("\n=== Done: {} success, {} fail ===".format(success, fail))

# Final cache count
cached_after = set(f.replace(".txt", "") for f in os.listdir(SCRAPE_DIR) if f.endswith(".txt"))
print("Total cache files: {} (was {})".format(len(cached_after), len(cached)))
