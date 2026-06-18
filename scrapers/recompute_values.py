#!/usr/bin/env python3
"""Recompute Canadian cards' welcome-bonus value + first-year value from the
CURRENT welcome_bonus text, using baseline cents-per-point (cpp_cad, aligned with
Prince of Travel's Points Valuations). Methodology:
  - points bonus  -> value = points x baseline_cpp / 100  (ignore issuers' inflated
    "up to $X" marketing; we use a consistent baseline)
  - cash/$ bonus  -> value = the stated $ (excluding spend thresholds)
  - first-year value = value - effective annual fee (0 if fee waived/rebated yr 1)
Only welcome_bonus_value_cad, welcome_bonus_points, first_year_value_cad, last_updated change.
"""
import re, json
fn = 'src/data/canadian_cards_comprehensive.json'
cards = json.load(open(fn, encoding='utf-8'))
TODAY = '2026-06-18'

def parse_points(text):
    best = None
    for m in re.finditer(r'(?<!\$)(\d{1,3}(?:,\d{3})+|\d{4,7})', text):
        n = int(m.group(1).replace(',', ''))
        ctx = text[max(0, m.start()-25):m.end()+18].lower()
        if any(w in ctx for w in ('spend', 'purchase', 'within', 'in total')):
            continue
        if n >= 1000 and (best is None or n > best):
            best = n
    return best

def parse_value_dollars(text):
    best = None
    for m in re.finditer(r'\$(\d{1,3}(?:,\d{3})*|\d+)', text):
        n = int(m.group(1).replace(',', ''))
        ctx = text[max(0, m.start()-32):m.end()+28].lower()
        if any(w in ctx for w in ('spend', 'purchase', 'within', 'minimum')):
            continue
        if any(w in ctx for w in ('value', 'credit', 'cash back', 'cash', 'off travel', 'gift', 'worth', 'statement', 'rebate', 'back')):
            if n <= 5000 and (best is None or n > best):
                best = n
    return best

def fee_waived(text):
    t = text.lower()
    return bool(re.search(r'annual fee[s]?.{0,30}(waiv|rebat)|fee (waiv|rebat)|no annual fee.{0,20}first year|first year free|fees? waived (in )?(the )?first year', t))

n = 0
for c in cards:
    wb = c.get('welcome_bonus') or ''
    cond = c.get('welcome_bonus_conditions') or ''
    prog = (c.get('rewards_program') or '').lower()
    cpp = c.get('cpp_cad') or 1.0
    fee = c.get('annual_fee') or 0
    fyf = c.get('first_year_fee')
    eff_fee = 0 if (fyf == 0 or fee_waived(wb + ' ' + cond)) else (fyf if isinstance(fyf, (int, float)) else fee)
    is_cash = 'cash' in prog
    value = None
    pts = None if is_cash else parse_points(wb)
    if pts:
        value = round(pts * cpp / 100)
        c['welcome_bonus_points'] = pts
    else:
        d = parse_value_dollars(wb)
        if d is not None:
            value = d
            c['welcome_bonus_points'] = None
    if value is not None:
        c['welcome_bonus_value_cad'] = value
        c['first_year_value_cad'] = round(value - eff_fee)
        c['last_updated'] = TODAY
        n += 1

json.dump(cards, open(fn, 'w', encoding='utf-8'), indent=2, ensure_ascii=True)
print(f'recomputed {n}/{len(cards)} CA cards')
