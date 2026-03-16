#!/usr/bin/env python3
"""
Fix CIBC card cache files.
CIBC blocks all browsers, but the listing page (via web_fetch) contains
earn rates, fees, and perks inline for each card.
This script splits the listing page text into per-card cache files.
"""

import json, re, os
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "src" / "data"
SCRAPE_DIR = Path(__file__).parent / "detail_cache"
SCRAPE_DIR.mkdir(exist_ok=True)

# Load cards
ca_cards = json.load(open(DATA_DIR / "canadian_cards_comprehensive.json"))
us_cards = json.load(open(DATA_DIR / "us_cards_comprehensive.json"))
all_cards = ca_cards + us_cards

# CIBC card slug -> detail URL mapping (extracted from listing page)
CIBC_URLS = {
    "cibc-aventura-visa-infinite-card": "/en/personal-banking/credit-cards/all-credit-cards/aventura-visa-infinite-card.html",
    "cibc-aeroplan-visa-infinite-card": "/en/personal-banking/credit-cards/all-credit-cards/aeroplan-visa-infinite-card.html",
    "cibc-aventura-visa-infinite-privilege-card": "/en/personal-banking/credit-cards/all-credit-cards/aventura-visa-infinite-privilege-card.html",
    "cibc-aeroplan-visa-infinite-privilege-card": "/en/personal-banking/credit-cards/all-credit-cards/aeroplan-visa-infinite-privilege-card.html",
    "cibc-aventura-gold-visa-card": "/en/personal-banking/credit-cards/all-credit-cards/aventura-gold-visa-card.html",
    "cibc-aventura-visa-card": "/en/personal-banking/credit-cards/all-credit-cards/aventura-visa-card.html",
    "cibc-aeroplan-visa-card": "/en/personal-banking/credit-cards/all-credit-cards/aeroplan-visa-card.html",
    "cibc-adapta-mastercard": "/en/personal-banking/credit-cards/all-credit-cards/adapta-mastercard.html",
    "cibc-dividend-visa-infinite-card": "/en/personal-banking/credit-cards/all-credit-cards/dividend-visa-infinite-card.html",
    "cibc-dividend-platinum-visa-card": "/en/personal-banking/credit-cards/all-credit-cards/dividend-visa-platinum-card.html",
    "cibc-dividend-visa-card": "/en/personal-banking/credit-cards/all-credit-cards/dividend-visa-card.html",
    "cibc-costco-mastercard": "/en/personal-banking/credit-cards/all-credit-cards/costco-mastercard.html",
    "cibc-adapta-mastercard-for-students": "/en/personal-banking/credit-cards/all-credit-cards/adapta-mastercard-for-students.html",
    "cibc-dividend-visa-card-for-students": "/en/personal-banking/credit-cards/all-credit-cards/dividend-visa-for-students.html",
    "cibc-aventura-visa-card-for-students": "/en/personal-banking/credit-cards/all-credit-cards/aventura-visa-for-students.html",
    "cibc-aeroplan-visa-card-for-students": "/en/personal-banking/credit-cards/all-credit-cards/aeroplan-visa-for-students.html",
}

# Read the listing page text (pre-fetched)
listing_file = Path(__file__).parent / "cibc_listing.txt"
if not listing_file.exists():
    print("ERROR: cibc_listing.txt not found. Fetch it first with web_fetch.")
    print("       Save the text output to scrapers/cibc_listing.txt")
    exit(1)

listing_text = listing_file.read_text()

# Split listing into per-card sections
# Each card starts with "### [CIBC ..." 
sections = re.split(r'(?=### \[CIBC )', listing_text)

print("Found {} card sections in listing page".format(len(sections)))

# Match sections to cards by URL slug
cached = 0
for section in sections:
    if not section.strip():
        continue
    # Find the URL in this section
    url_match = re.search(r'/en/personal-banking/credit-cards/all-credit-cards/([^)]+\.html)', section)
    if not url_match:
        continue
    url_path = url_match.group(0)
    
    # Find which card this belongs to
    for slug, expected_path in CIBC_URLS.items():
        if url_path == expected_path:
            cache_file = SCRAPE_DIR / "{}.txt".format(slug)
            if not cache_file.exists():
                cache_file.write_text(section)
                print("  Created cache for {}: {} chars".format(slug, len(section)))
                cached += 1
            else:
                print("  Cache already exists for {}".format(slug))
            break

# Also update apply_url for CIBC cards
updated = 0
for card in all_cards:
    if card.get("slug") in CIBC_URLS:
        new_url = "https://www.cibc.com" + CIBC_URLS[card["slug"]]
        if card.get("apply_url") != new_url:
            card["apply_url"] = new_url
            updated += 1

if updated > 0:
    ca_out = [c for c in all_cards if c.get("country", "").upper() == "CA"]
    us_out = [c for c in all_cards if c.get("country", "").upper() == "US"]
    with open(DATA_DIR / "canadian_cards_comprehensive.json", "w") as f:
        json.dump(ca_out, f, indent=2)
    with open(DATA_DIR / "us_cards_comprehensive.json", "w") as f:
        json.dump(us_out, f, indent=2)
    print("\nUpdated {} CIBC card URLs".format(updated))

print("\nCached {} new CIBC card files".format(cached))
