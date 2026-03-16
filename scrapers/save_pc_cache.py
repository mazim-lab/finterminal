#!/usr/bin/env python3
"""Save PC Financial card data to cache via urllib with redirect handling."""
import re, ssl, time
from pathlib import Path
from urllib.request import Request, urlopen, HTTPRedirectHandler, build_opener, HTTPSHandler

SCRAPE_DIR = Path(__file__).parent / "detail_cache"

pc_cards = {
    "pc-mastercard": "https://www.pcfinancial.ca/en/credit-cards/pc-mastercard/",
    "pc-world-mastercard": "https://www.pcfinancial.ca/en/credit-cards/world-mastercard/",
    "pc-world-elite-mastercard": "https://www.pcfinancial.ca/en/credit-cards/world-elite/",
    "pc-insiders-world-elite-mastercard": "https://www.pcfinancial.ca/en/credit-cards/insiders/",
}

ctx = ssl.create_default_context()
headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}

# Custom redirect handler that handles 308
class CustomRedirectHandler(HTTPRedirectHandler):
    def http_error_308(self, req, fp, code, msg, headers):
        return self.http_error_302(req, fp, code, msg, headers)

opener = build_opener(CustomRedirectHandler, HTTPSHandler(context=ctx))

for slug, url in pc_cards.items():
    cache_file = SCRAPE_DIR / "{}.txt".format(slug)
    if cache_file.exists():
        print("Already cached: {}".format(slug))
        continue
    print("Fetching {}...".format(slug))
    try:
        req = Request(url, headers=headers)
        resp = opener.open(req, timeout=15)
        html = resp.read().decode("utf-8", errors="replace")
        text = re.sub(r'<[^>]+>', ' ', html)
        text = re.sub(r'\s+', ' ', text).strip()
        if len(text) > 200:
            cache_file.write_text(text)
            print("  OK: {} chars".format(len(text)))
        else:
            print("  WARN: too short ({} chars)".format(len(text)))
    except Exception as e:
        print("  FAIL: {}".format(e))
    time.sleep(1)
