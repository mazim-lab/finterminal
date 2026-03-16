import json
from pathlib import Path

DATA_DIR = Path('src/data')
CACHE_DIR = Path('scrapers/detail_cache')

def find_missing_earn_rates():
    ca_path = DATA_DIR / "canadian_cards_comprehensive.json"
    us_path = DATA_DIR / "us_cards_comprehensive.json"

    with open(ca_path) as f:
        ca_cards = json.load(f)
    with open(us_path) as f:
        us_cards = json.load(f)

    all_cards = ca_cards + us_cards
    missing_cards = []

    for card in all_cards:
        if not card.get('earn_rates'):
            slug = card.get('slug')
            if slug:
                cache_file = CACHE_DIR / f"{slug}.txt"
                if cache_file.exists():
                    missing_cards.append(slug)

    return missing_cards

if __name__ == "__main__":
    missing = find_missing_earn_rates()
    for slug in missing:
        print(slug)
    print(f"\nTotal missing: {len(missing)}")
