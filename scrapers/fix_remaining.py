#!/usr/bin/env python3
"""
Fix remaining cards that couldn't be scraped by detail_scraper.py.
- CIBC: Extract data from listing page HTML (browsers blocked)
- BMO/Simplii/PC Financial: Use individual card page URLs with urllib
"""

import json, re, os, time, ssl, urllib.request
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "src" / "data"
SCRAPE_DIR = Path(__file__).parent / "detail_cache"
SCRAPE_DIR.mkdir(exist_ok=True)

# Load cards
ca_cards = json.load(open(DATA_DIR / "canadian_cards_comprehensive.json"))
us_cards = json.load(open(DATA_DIR / "us_cards_comprehensive.json"))
all_cards = ca_cards + us_cards

cached = set(f.replace(".txt", "") for f in os.listdir(SCRAPE_DIR) if f.endswith(".txt"))

# --- CIBC: Fetch listing page and split into per-card cache files ---

CIBC_SLUG_TO_PATH = {
    "cibc-aventura-visa-infinite-card": "aventura-visa-infinite-card",
    "cibc-aeroplan-visa-infinite-card": "aeroplan-visa-infinite-card",
    "cibc-aventura-visa-infinite-privilege-card": "aventura-visa-infinite-privilege-card",
    "cibc-aeroplan-visa-infinite-privilege-card": "aeroplan-visa-infinite-privilege-card",
    "cibc-aventura-gold-visa-card": "aventura-gold-visa-card",
    "cibc-aventura-visa-card": "aventura-visa-card",
    "cibc-aeroplan-visa-card": "aeroplan-visa-card",
    "cibc-adapta-mastercard": "adapta-mastercard",
    "cibc-dividend-visa-infinite-card": "dividend-visa-infinite-card",
    "cibc-dividend-platinum-visa-card": "dividend-visa-platinum-card",
    "cibc-dividend-visa-card": "dividend-visa-card",
    "cibc-costco-mastercard": "costco-mastercard",
    "cibc-adapta-mastercard-for-students": "adapta-mastercard-for-students",
    "cibc-dividend-visa-card-for-students": "dividend-visa-for-students",
    "cibc-aventura-visa-card-for-students": "aventura-visa-for-students",
    "cibc-aeroplan-visa-card-for-students": "aeroplan-visa-for-students",
}

# Reverse: URL path fragment -> slug
PATH_TO_SLUG = {}
for slug, path_frag in CIBC_SLUG_TO_PATH.items():
    PATH_TO_SLUG[path_frag] = slug

missing_cibc = [s for s in CIBC_SLUG_TO_PATH if s not in cached]
if missing_cibc:
    print("=== CIBC: {} cards missing cache ===".format(len(missing_cibc)))
    
    # Fetch individual card pages using urllib (no browser needed)
    ctx = ssl.create_default_context()
    headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}
    
    for slug in missing_cibc:
        path_frag = CIBC_SLUG_TO_PATH[slug]
        url = "https://www.cibc.com/en/personal-banking/credit-cards/all-credit-cards/{}.html".format(path_frag)
        cache_file = SCRAPE_DIR / "{}.txt".format(slug)
        
        print("  Fetching {}...".format(slug))
        try:
            req = urllib.request.Request(url, headers=headers)
            resp = urllib.request.urlopen(req, context=ctx, timeout=15)
            html = resp.read().decode("utf-8", errors="replace")
            
            # Extract text content (simple: strip tags)
            text = re.sub(r'<[^>]+>', ' ', html)
            text = re.sub(r'\s+', ' ', text).strip()
            
            if len(text) > 200:
                cache_file.write_text(text)
                print("    OK: {} chars".format(len(text)))
            else:
                print("    WARN: too short ({} chars)".format(len(text)))
        except Exception as e:
            print("    FAIL: {}".format(e))
        
        time.sleep(1)  # Be polite
    
    # Update apply_url for CIBC cards
    updated = 0
    for card in all_cards:
        if card.get("slug") in CIBC_SLUG_TO_PATH:
            path_frag = CIBC_SLUG_TO_PATH[card["slug"]]
            new_url = "https://www.cibc.com/en/personal-banking/credit-cards/all-credit-cards/{}.html".format(path_frag)
            if card.get("apply_url") != new_url:
                card["apply_url"] = new_url
                updated += 1
    if updated:
        print("  Updated {} CIBC apply_urls".format(updated))
else:
    print("=== CIBC: all cached ===")

# --- BMO / Simplii / PC Financial: Try urllib on their individual pages ---

remaining = [c for c in all_cards if c.get("slug") not in cached 
             and c.get("slug") not in CIBC_SLUG_TO_PATH
             and c.get("apply_url")]

if remaining:
    print("\n=== Other banks: {} cards missing ===".format(len(remaining)))
    
    ctx = ssl.create_default_context()
    headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
    
    for card in remaining:
        slug = card["slug"]
        url = card["apply_url"]
        cache_file = SCRAPE_DIR / "{}.txt".format(slug)
        
        print("  [{issuer}] Fetching {slug}...".format(issuer=card.get("issuer", "?"), slug=slug))
        try:
            req = urllib.request.Request(url, headers=headers)
            resp = urllib.request.urlopen(req, context=ctx, timeout=15)
            html = resp.read().decode("utf-8", errors="replace")
            
            # Extract text content
            text = re.sub(r'<[^>]+>', ' ', html)
            text = re.sub(r'\s+', ' ', text).strip()
            
            if len(text) > 200:
                cache_file.write_text(text)
                print("    OK: {} chars".format(len(text)))
            else:
                print("    WARN: too short ({} chars)".format(len(text)))
        except Exception as e:
            print("    FAIL: {}".format(e))
        
        time.sleep(1)
else:
    print("\n=== Other banks: all cached ===")

# Refresh cache count
cached_after = set(f.replace(".txt", "") for f in os.listdir(SCRAPE_DIR) if f.endswith(".txt"))
print("\n=== Summary ===")
print("Cache before: {}".format(len(cached)))
print("Cache after: {}".format(len(cached_after)))
print("New files: {}".format(len(cached_after - cached)))

# Save updated card data
ca_out = [c for c in all_cards if c.get("country", "").upper() == "CA"]
us_out = [c for c in all_cards if c.get("country", "").upper() == "US"]
with open(DATA_DIR / "canadian_cards_comprehensive.json", "w") as f:
    json.dump(ca_out, f, indent=2)
with open(DATA_DIR / "us_cards_comprehensive.json", "w") as f:
    json.dump(us_out, f, indent=2)
print("Saved card data.")
