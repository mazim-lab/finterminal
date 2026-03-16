#!/usr/bin/env python3
"""Re-scrape missing cards with correct URLs and appropriate tools.

Strategy per bank:
- RBC: agent-browser with networkidle wait (individual card pages)
- TD: agent-browser with networkidle + extra wait for JS rendering
- National Bank: agent-browser (individual URLs where available)
- Neo: agent-browser (individual card pages)  
- MBNA: agent-browser (rewards cards only; True Line cards have no earn rates)
- Wealthsimple: StealthyFetcher (Camoufox) to bypass Cloudflare
- Amex Essential: StealthyFetcher (Camoufox) to bypass anti-bot
- Desjardins: StealthyFetcher (JS-rendered SPA)
- Chase: agent-browser with networkidle
"""

import json
import os
import subprocess
import time
import sys

# Unbuffered output
sys.stdout.reconfigure(line_buffering=True)

AGENT_BROWSER = "/Users/shafbot/.openclaw/tools/node-v22.22.0/bin/agent-browser"
PROJECT = os.path.expanduser("~/Documents/Shafbot Projects/churningcanada")
CACHE_DIR = os.path.join(PROJECT, "scrapers", "detail_cache")
SESSION = "rescrape"

# Cards that genuinely have no earn rates (skip these)
NO_EARN_RATES = {
    "mbna-true-line-mastercard",       # Low-rate card, no rewards
    "mbna-true-line-gold-mastercard",  # Low-rate card, no rewards
    "td-low-rate-visa-card",           # Low-rate card
    "td-u-s-dollar-visa-card",         # USD card, no rewards
    "rbc-u-s-dollar-visa-gold",        # USD card, no rewards  
    "rbc-rateadvantage-visa",          # Low-rate card
    "rbc-visa-classic-low-rate-option",# Low-rate card
    "scotiabank-u-s-dollar-visa-card", # USD card
    "slate-credit-card",               # Balance transfer card, no rewards
    "td-business-select-ratetm-visa-card",  # Low-rate business card
    "americanexpress-essentialtm-creditcard",  # Basic card, SPA doesn't render
}

# URL fixes: cards with listing page URLs that need individual card URLs
URL_FIXES = {
    # RBC - listing page URLs
    "rbc-cash-back-mastercard": "https://www.rbcroyalbank.com/credit-cards/cash-back/rbc-cashback-mastercard.html",
    # TD - browse-all URLs need individual pages
    "td-aeroplan-visa-infinite-card": "https://www.td.com/ca/en/personal-banking/products/credit-cards/aeroplan/aeroplan-visa-infinite-card",
    "td-aeroplan-visa-platinum-credit-card": "https://www.td.com/ca/en/personal-banking/products/credit-cards/aeroplan/aeroplan-visa-platinum-card",
    "td-aeroplan-visa-infinite-privilege-credit-card": "https://www.td.com/ca/en/personal-banking/products/credit-cards/aeroplan/aeroplan-visa-infinite-privilege-card",
    "td-rewards-visa-card": "https://www.td.com/ca/en/personal-banking/products/credit-cards/travel-rewards/rewards-visa-card",
    # National Bank - corrected URLs
    "national-bank-business-line-mastercard": "https://www.nbc.ca/business/credit-cards/mastercard-line-credit.html",
    "national-bank-platinum-business-mastercard": "https://www.nbc.ca/business/credit-cards/platinum-mastercard.html",
    # Desjardins - individual card page
    "desjardins-bonus-visa": "https://www.desjardins.com/ca/personal/loans-credit/credit-cards/bonus-visa/index.jsp",
}

# Cards to scrape with StealthyFetcher (Camoufox) instead of agent-browser
USE_STEALTHY = {
    "wealthsimple-cash-back-visa",
}


def get_missing_cards():
    """Get all cards missing earn_rates."""
    missing = []
    for fname in ["canadian_cards_comprehensive.json", "us_cards_comprehensive.json"]:
        path = os.path.join(PROJECT, "src", "data", fname)
        cards = json.load(open(path))
        for c in cards:
            if not c.get("earn_rates"):
                slug = c.get("slug", "")
                if slug not in NO_EARN_RATES:
                    url = URL_FIXES.get(slug, c.get("apply_url", ""))
                    missing.append({
                        "slug": slug,
                        "name": c.get("name", ""),
                        "issuer": c.get("issuer", ""),
                        "url": url,
                        "file": fname,
                    })
    return missing


def scrape_with_agent_browser(url, slug, extra_wait=0):
    """Scrape a page using agent-browser. Returns text or None."""
    try:
        # Open the page
        result = subprocess.run(
            [AGENT_BROWSER, "--session", SESSION, "open", url],
            capture_output=True, text=True, timeout=45
        )
        if result.returncode != 0:
            print(f"    ⚠️ Failed to open: {result.stderr[:100]}")
            return None

        # Wait for network idle
        subprocess.run(
            [AGENT_BROWSER, "--session", SESSION, "wait", "--load", "networkidle"],
            capture_output=True, text=True, timeout=30
        )
        
        # Extra wait for JS-heavy pages (TD)
        if extra_wait:
            time.sleep(extra_wait / 1000)

        # Get the text content via JS eval (more reliable for JS-heavy pages)
        result = subprocess.run(
            [AGENT_BROWSER, "--session", SESSION, "eval",
             "document.querySelector('main')?.innerText || document.body.innerText"],
            capture_output=True, text=True, timeout=20
        )
        
        text = result.stdout.strip()
        # Remove surrounding quotes from JSON string output
        if text.startswith('"') and text.endswith('"'):
            text = json.loads(text)

        if text and len(text) > 100:
            return text
        else:
            print(f"    ⚠️ Got too little text ({len(text or '')} chars)")
            return None

    except subprocess.TimeoutExpired:
        print(f"    ⚠️ Timeout")
        return None
    except Exception as e:
        print(f"    ⚠️ Error: {e}")
        return None


def scrape_with_stealthy(url, slug):
    """Scrape a page using Scrapling StealthyFetcher (Camoufox)."""
    try:
        from scrapling import StealthyFetcher
        response = StealthyFetcher.fetch(
            url,
            headless=True,
            network_idle=True,
            wait=3000,
            disable_resources=False,
            block_images=True,
        )
        if response.status == 200:
            text = response.get_all_text(separator=' ', strip=True)
            if text and len(text) > 100:
                return text
            else:
                print(f"    ⚠️ StealthyFetcher got too little text ({len(text or '')} chars)")
                return None
        else:
            print(f"    ⚠️ StealthyFetcher status {response.status}")
            return None
    except Exception as e:
        print(f"    ⚠️ StealthyFetcher error: {e}")
        return None


def save_cache(slug, text):
    """Save text to cache file."""
    path = os.path.join(CACHE_DIR, f"{slug}.txt")
    with open(path, "w") as f:
        f.write(text)
    print(f"    💾 Saved {len(text)} chars to cache")


def main():
    missing = get_missing_cards()
    print(f"Found {len(missing)} cards to re-scrape (excluding no-earn-rate cards)\n")
    
    scraped = 0
    failed = []
    
    for i, card in enumerate(missing):
        slug = card["slug"]
        url = card["url"]
        issuer = card["issuer"]
        
        print(f"[{i+1}/{len(missing)}] {card['name']} ({issuer})")
        print(f"    URL: {url}")
        
        if not url or url == "NONE":
            print(f"    ⛔ No URL available")
            failed.append(card)
            continue
        
        text = None
        if slug in USE_STEALTHY:
            print(f"    🦊 Using StealthyFetcher (Camoufox)")
            text = scrape_with_stealthy(url, slug)
        else:
            extra_wait = 3000 if issuer == "TD" else 0
            print(f"    🌐 Using agent-browser" + (f" (+{extra_wait}ms wait)" if extra_wait else ""))
            text = scrape_with_agent_browser(url, slug, extra_wait)
        
        if text:
            save_cache(slug, text)
            scraped += 1
        else:
            failed.append(card)
        
        # Rate limiting: sleep between requests
        if i < len(missing) - 1:
            sleep_time = 5 if slug not in USE_STEALTHY else 8
            print(f"    ⏳ Sleeping {sleep_time}s...")
            time.sleep(sleep_time)
    
    print(f"\n{'='*60}")
    print(f"Done: {scraped} scraped, {len(failed)} failed")
    if failed:
        print(f"\nFailed cards:")
        for c in failed:
            print(f"  ❌ {c['issuer']}: {c['name']} ({c['slug']})")


if __name__ == "__main__":
    main()
