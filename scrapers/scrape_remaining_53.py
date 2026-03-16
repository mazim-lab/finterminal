#!/usr/bin/env python3
"""
Scrape remaining 53 cards missing earn_rates.

Step 1: Use Scrapling PlayWrightFetcher to discover individual card URLs from listing pages (RBC, National Bank, Neo)
Step 2: Use agent-browser to scrape each card's detail page (expanding accordions/tabs)
Step 3: Save text to detail_cache/{slug}.txt

Tools: ONLY scrapling and agent-browser. Nothing else.
"""

import json, os, re, subprocess, time
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "src" / "data"
SCRAPE_DIR = Path(__file__).parent / "detail_cache"
SCRAPE_DIR.mkdir(exist_ok=True)

AB = "/Users/shafbot/.openclaw/tools/node-v22.22.0/bin/agent-browser"


def run_ab(cmd, timeout=30):
    """Run agent-browser command."""
    try:
        result = subprocess.run(
            f"{AB} {cmd}", shell=True, capture_output=True, text=True, timeout=timeout
        )
        return result.stdout.strip()
    except subprocess.TimeoutExpired:
        return None
    except Exception as e:
        return f"ERROR: {e}"


def scrape_with_agent_browser(url, slug):
    """Open a page with agent-browser, expand accordions, get text, save to cache."""
    cache_file = SCRAPE_DIR / f"{slug}.txt"

    print(f"    Opening {url[:80]}...")
    run_ab("close", timeout=5)
    time.sleep(1)

    result = run_ab(f'open "{url}"', timeout=30)
    if not result or "✗" in (result or ""):
        print(f"    FAIL: Could not open page")
        return False

    run_ab("wait --load networkidle", timeout=20)
    time.sleep(3)

    # Try to expand accordions/tabs
    snapshot = run_ab("snapshot -i -c", timeout=10) or ""
    expand_keywords = [
        'earn', 'rate', 'reward', 'benefit', 'feature', 'detail',
        'coverage', 'insurance', 'travel', 'perk', 'point',
        'cash back', 'cashback', 'show more', 'view more',
        'expand', 'learn more', 'see all', 'view all'
    ]
    clicked = 0
    for line in snapshot.split('\n'):
        btn_match = re.search(r'button.*?\[ref=(e\d+)\]', line)
        if btn_match and any(kw in line.lower() for kw in expand_keywords):
            ref = btn_match.group(1)
            run_ab(f"click @{ref}", timeout=5)
            clicked += 1
            time.sleep(0.3)

    if clicked:
        print(f"    Expanded {clicked} accordion(s)")
        time.sleep(2)

    # Also try clicking tab elements
    for line in snapshot.split('\n'):
        tab_match = re.search(r'tab.*?\[ref=(e\d+)\]', line)
        if tab_match and any(kw in line.lower() for kw in ['earn', 'rate', 'reward', 'feature', 'benefit']):
            ref = tab_match.group(1)
            run_ab(f"click @{ref}", timeout=5)
            time.sleep(1)

    # Get text
    text = run_ab('get text "main"', timeout=15) or ""
    if len(text) < 100:
        text = run_ab('get text "body"', timeout=15) or ""

    if len(text) > 200:
        cache_file.write_text(text)
        print(f"    OK: {len(text)} chars")
        return True
    else:
        print(f"    FAIL: too short ({len(text)} chars)")
        return False


# ============================================================
# STEP 1: Discover individual card URLs from listing pages
# ============================================================

def discover_rbc_urls():
    """Use Scrapling to find RBC individual card URLs."""
    from scrapling import PlayWrightFetcher

    print("\n=== Discovering RBC card URLs ===")
    page = PlayWrightFetcher.fetch(
        'https://www.rbcroyalbank.com/credit-cards/all-credit-cards.html',
        headless=True, timeout=20000
    )

    links = page.css('a[href]')
    card_urls = {}
    for link in links:
        href = link.attrib.get('href', '')
        if not href.startswith('http'):
            href = 'https://www.rbcroyalbank.com' + href
        # Match RBC card detail pages
        m = re.match(
            r'https://www\.rbcroyalbank\.com/(?:credit-cards|business/credit-cards)/(?:travel|rewards|cash-back|low-interest|no-fee|student|business|cards)/([^/]+)\.html',
            href
        )
        if m:
            slug = m.group(1)
            if slug not in ('index',) and slug not in card_urls:
                card_urls[slug] = href

    print(f"  Found {len(card_urls)} RBC card pages")
    return card_urls


def discover_nbc_urls():
    """Use Scrapling to find National Bank individual card URLs."""
    from scrapling import PlayWrightFetcher

    print("\n=== Discovering National Bank card URLs ===")
    page = PlayWrightFetcher.fetch(
        'https://www.nbc.ca/personal/mastercard-credit-cards.html',
        headless=True, timeout=20000
    )

    links = page.css('a[href]')
    card_urls = {}
    for link in links:
        href = link.attrib.get('href', '')
        if not href.startswith('http'):
            href = 'https://www.nbc.ca' + href
        # Match National Bank card detail pages
        m = re.match(r'https://www\.nbc\.ca/personal/mastercard-credit-cards/([^/#]+)\.html', href)
        if m:
            slug = m.group(1)
            # Skip non-card pages
            if slug not in ('offers', 'benefits', 'features', 'rewards-program', 'insurance',
                           'mastercard-credit-cards', 'comparison'):
                card_urls[slug] = href

    # Also check business cards
    page2 = PlayWrightFetcher.fetch('https://www.nbc.ca/business/credit-cards.html', headless=True, timeout=20000)
    links2 = page2.css('a[href]')
    for link in links2:
        href = link.attrib.get('href', '')
        if not href.startswith('http'):
            href = 'https://www.nbc.ca' + href
        m = re.match(r'https://www\.nbc\.ca/business/credit-cards/([^/#]+)\.html', href)
        if m:
            slug = m.group(1)
            if slug not in ('index', 'credit-cards'):
                card_urls[slug] = href

    print(f"  Found {len(card_urls)} National Bank card pages")
    return card_urls


def discover_neo_urls():
    """Use Scrapling to find Neo Financial individual card URLs."""
    from scrapling import PlayWrightFetcher

    print("\n=== Discovering Neo Financial card URLs ===")
    page = PlayWrightFetcher.fetch(
        'https://www.neofinancial.com/credit-cards',
        headless=True, timeout=20000
    )

    links = page.css('a[href]')
    card_urls = {}
    for link in links:
        href = link.attrib.get('href', '')
        if not href.startswith('http'):
            href = 'https://www.neofinancial.com' + href
        m = re.match(r'https://www\.neofinancial\.com/credit-cards/(neo-[^/]+)', href)
        if m:
            slug = m.group(1)
            card_urls[slug] = href

    print(f"  Found {len(card_urls)} Neo Financial card pages")
    return card_urls


# ============================================================
# MAIN
# ============================================================

def main():
    # Load card data
    ca_cards = json.load(open(DATA_DIR / "canadian_cards_comprehensive.json"))
    us_cards = json.load(open(DATA_DIR / "us_cards_comprehensive.json"))
    all_cards = ca_cards + us_cards

    # Find cards missing earn_rates
    missing = [c for c in all_cards if not c.get('earn_rates') or len(c.get('earn_rates', {})) == 0]
    print(f"Cards missing earn_rates: {len(missing)}")

    # --- Step 1: Discover URLs ---
    rbc_urls = discover_rbc_urls()
    nbc_urls = discover_nbc_urls()
    neo_urls = discover_neo_urls()

    # Map discovered URLs to our card slugs
    url_updates = 0
    for card in all_cards:
        slug = card.get('slug', '')
        issuer = card.get('issuer', '')

        if issuer == 'RBC':
            # Try matching our slug to RBC's slug format
            # Our: rbc-avion-visa-infinite, RBC's: rbc-avion-visa-infinite or rbc-visa-infinite-avion
            for rbc_slug, url in rbc_urls.items():
                # Normalize both slugs for comparison
                our_parts = set(slug.replace('rbc-', '').split('-'))
                their_parts = set(rbc_slug.replace('rbc-', '').split('-'))
                # If >70% overlap, it's a match
                if len(our_parts & their_parts) / max(len(our_parts), 1) > 0.6:
                    if card.get('apply_url') != url:
                        card['apply_url'] = url
                        url_updates += 1
                        print(f"  Updated URL: {slug} -> {url}")
                    break

        elif issuer == 'National Bank':
            for nbc_slug, url in nbc_urls.items():
                our_parts = set(slug.replace('national-bank-', '').split('-'))
                their_parts = set(nbc_slug.split('-'))
                if len(our_parts & their_parts) / max(len(our_parts), 1) > 0.5:
                    if card.get('apply_url') != url:
                        card['apply_url'] = url
                        url_updates += 1
                        print(f"  Updated URL: {slug} -> {url}")
                    break

        elif issuer == 'Neo Financial':
            for neo_slug, url in neo_urls.items():
                if neo_slug in slug or slug.replace('neo-financial-', 'neo-') == neo_slug:
                    if card.get('apply_url') != url:
                        card['apply_url'] = url
                        url_updates += 1
                        print(f"  Updated URL: {slug} -> {url}")
                    break

    print(f"\nUpdated {url_updates} card URLs")

    # Save updated URLs
    ca_out = [c for c in all_cards if c.get('country', '').upper() == 'CA']
    us_out = [c for c in all_cards if c.get('country', '').upper() == 'US']
    with open(DATA_DIR / "canadian_cards_comprehensive.json", "w") as f:
        json.dump(ca_out, f, indent=2)
    with open(DATA_DIR / "us_cards_comprehensive.json", "w") as f:
        json.dump(us_out, f, indent=2)

    # --- Step 2: Scrape detail pages with agent-browser ---
    # Reload to get updated URLs
    ca_cards = json.load(open(DATA_DIR / "canadian_cards_comprehensive.json"))
    us_cards = json.load(open(DATA_DIR / "us_cards_comprehensive.json"))
    all_cards = ca_cards + us_cards
    missing = [c for c in all_cards if not c.get('earn_rates') or len(c.get('earn_rates', {})) == 0]

    print(f"\n=== Scraping {len(missing)} cards with agent-browser ===")

    success = 0
    fail = 0
    for i, card in enumerate(missing):
        slug = card['slug']
        url = card.get('apply_url', '')
        issuer = card.get('issuer', '')

        # Skip cards with no URL or listing page URLs
        if not url or url.endswith('/credit-cards/') or url.endswith('/credit-cards'):
            print(f"\n[{i+1}/{len(missing)}] [{issuer}] {slug} - SKIP (no detail URL)")
            fail += 1
            continue

        print(f"\n[{i+1}/{len(missing)}] [{issuer}] {slug}")
        if scrape_with_agent_browser(url, slug):
            success += 1
        else:
            fail += 1

        time.sleep(1)

    # Close agent-browser
    run_ab("close", timeout=5)

    print(f"\n=== Scraping done: {success} success, {fail} fail ===")

    # --- Step 3: Run the parser ---
    print("\n=== Running parser ===")
    result = subprocess.run(
        ["python3", str(Path(__file__).parent / "detail_scraper.py"), "--all"],
        capture_output=True, text=True, timeout=600
    )
    # Print last 10 lines of output
    lines = result.stdout.strip().split('\n')
    for line in lines[-10:]:
        print(line)

    # Final count
    ca_final = json.load(open(DATA_DIR / "canadian_cards_comprehensive.json"))
    us_final = json.load(open(DATA_DIR / "us_cards_comprehensive.json"))
    all_final = ca_final + us_final
    has_rates = len([c for c in all_final if c.get('earn_rates') and len(c['earn_rates']) > 0])
    print(f"\n=== FINAL: {has_rates}/{len(all_final)} cards with earn_rates ===")


if __name__ == "__main__":
    main()
