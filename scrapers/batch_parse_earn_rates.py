#!/usr/bin/env python3
"""Batch parse earn_rates from cached detail text files for cards missing them.
Processes only BATCH_SIZE cards, with PACE_SECONDS delay between reads."""

import json
import os
import sys
import time

# Add parent dir so we can import
sys.path.insert(0, os.path.dirname(__file__))
from detail_scraper import parse_earn_rates

BATCH_SIZE = int(os.environ.get("BATCH_SIZE", "12"))
PACE_SECONDS = int(os.environ.get("PACE_SECONDS", "5"))  # delay between file reads

PROJECT_ROOT = os.path.dirname(os.path.dirname(__file__))
CACHE_DIR = os.path.join(os.path.dirname(__file__), "detail_cache")

def load_json(path):
    with open(path, "r") as f:
        return json.load(f)

def save_json(path, data):
    with open(path, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved {path}")

def process_cards(json_path, label):
    cards = load_json(json_path)
    missing = []
    for card in cards:
        er = card.get("earn_rates")
        if not er or (isinstance(er, dict) and len(er) == 0):
            missing.append(card)

    print(f"\n{'='*60}")
    print(f"{label}: {len(missing)}/{len(cards)} cards missing earn_rates")
    print(f"{'='*60}")

    processed = 0
    updated = 0
    for card in missing:
        if processed >= BATCH_SIZE:
            print(f"\nBatch limit ({BATCH_SIZE}) reached. Run again for more.")
            break

        slug = card.get("slug", "")
        name = card.get("name", slug)
        cache_file = os.path.join(CACHE_DIR, f"{slug}.txt")

        if not os.path.exists(cache_file):
            print(f"  SKIP (no cache): {name}")
            continue

        if processed > 0:
            print(f"  ... waiting {PACE_SECONDS}s ...")
            time.sleep(PACE_SECONDS)

        print(f"  Reading [{processed+1}/{BATCH_SIZE}]: {name}")
        with open(cache_file, "r") as f:
            text = f.read()

        rates = parse_earn_rates(text)
        if rates:
            card["earn_rates"] = rates
            updated += 1
            print(f"    ✅ Found {len(rates)} earn rate(s): {list(rates.keys())}")
        else:
            print(f"    ❌ No earn rates parsed (may genuinely have none)")

        processed += 1

    if updated > 0:
        save_json(json_path, cards)

    print(f"\n{label} summary: processed={processed}, updated={updated}")
    return processed, updated

def main():
    ca_path = os.path.join(PROJECT_ROOT, "src", "data", "canadian_cards_comprehensive.json")
    us_path = os.path.join(PROJECT_ROOT, "src", "data", "us_cards_comprehensive.json")

    total_processed = 0
    total_updated = 0

    for path, label in [(ca_path, "Canadian"), (us_path, "US")]:
        if not os.path.exists(path):
            print(f"SKIP: {path} not found")
            continue
        remaining = BATCH_SIZE - total_processed
        if remaining <= 0:
            break
        # Temporarily override batch size for this file
        old = BATCH_SIZE
        p, u = process_cards(path, label)
        total_processed += p
        total_updated += u

    print(f"\n{'='*60}")
    print(f"TOTAL: processed={total_processed}, updated={total_updated}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
