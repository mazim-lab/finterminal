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

def categorize_missing(slugs):
    categorized = {
        "Bad URL": [],
        "Blocked": [],
        "No Earn Rates": [],
        "Needs new regex": []
    }

    for slug in slugs:
        cache_file = CACHE_DIR / f"{slug}.txt"
        content = cache_file.read_text().lower()

        if any(keyword in content for keyword in ["compare", "avion rewards", "all credit cards", "all-cards", "credit-cards"]):
            categorized["Bad URL"].append(slug)
        elif any(keyword in content for keyword in ["security service", "are you a robot", "what happened?"]):
            categorized["Blocked"].append(slug)
        elif "low rate" in content and not any(keyword in content for keyword in ["points", "cash back", "rewards"]):
            categorized["No Earn Rates"].append(slug)
        else:
            categorized["Needs new regex"].append(slug)
            
    return categorized

if __name__ == "__main__":
    missing_slugs = find_missing_earn_rates()
    categorized_cards = categorize_missing(missing_slugs)

    for category, cards in categorized_cards.items():
        print(f"--- {category} ({len(cards)}) ---")
        for card in cards:
            print(card)
        print()

