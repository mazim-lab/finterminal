#!/usr/bin/env python3
"""
Save already-fetched card text to cache files.
Run agent-browser for BMO cards that block everything else.
"""
import subprocess, json, re, time, os
from pathlib import Path

SCRAPE_DIR = Path(__file__).parent / "detail_cache"

# --- BMO cards: use agent-browser ---
DATA_DIR = Path(__file__).parent.parent / "src" / "data"
ca_cards = json.load(open(DATA_DIR / "canadian_cards_comprehensive.json"))
cached = set(f.replace(".txt", "") for f in os.listdir(SCRAPE_DIR) if f.endswith(".txt"))

bmo_cards = [c for c in ca_cards if c.get("issuer") == "BMO" and c["slug"] not in cached and c.get("apply_url")]

print("=== BMO: {} cards to scrape via agent-browser ===".format(len(bmo_cards)))

for card in bmo_cards:
    slug = card["slug"]
    url = card["apply_url"]
    cache_file = SCRAPE_DIR / "{}.txt".format(slug)
    
    print("  Scraping {}...".format(slug))
    try:
        # Start agent-browser session
        result = subprocess.run(
            ["agent-browser", "get", "text", "main", "--url", url, "--timeout", "15000"],
            capture_output=True, text=True, timeout=30
        )
        text = result.stdout.strip()
        if len(text) > 200:
            cache_file.write_text(text)
            print("    OK: {} chars".format(len(text)))
        else:
            print("    WARN: too short ({} chars)".format(len(text)))
            if result.stderr:
                print("    stderr: {}".format(result.stderr[:200]))
    except subprocess.TimeoutExpired:
        print("    FAIL: timeout")
    except FileNotFoundError:
        print("    FAIL: agent-browser not found")
        break
    except Exception as e:
        print("    FAIL: {}".format(e))
    
    time.sleep(2)

# Final count
cached_after = set(f.replace(".txt", "") for f in os.listdir(SCRAPE_DIR) if f.endswith(".txt"))
print("\n=== Summary ===")
print("Cache files: {}".format(len(cached_after)))
print("New: {}".format(len(cached_after - cached)))
