import json, io, time
from pathlib import Path
from playwright.sync_api import sync_playwright
from markitdown import MarkItDown
md=MarkItDown()
us=json.load(open('src/data/us_cards_comprehensive.json',encoding='utf-8')); byslug={c['slug']:c for c in us}
JOBS=['marriott-bonvoy-bevy-american-express-card','marriott-bonvoy-brilliant-american-express-card','hilton-honors-american-express-aspire-card','blue-business-plus-credit-card','business-green-rewards-card']
LABELS=['Travel','Shopping & Entertainment','Rewards & Benefits','Shopping','Travel Coverage','Card Benefits','Insurance','Coverage','Protection','Benefits']
def fetch(br,url):
    pg=br.new_page(); pg.goto(url,wait_until='domcontentloaded',timeout=45000); pg.wait_for_timeout(5000)
    for _ in range(25): pg.keyboard.press('End'); pg.wait_for_timeout(350)
    pg.wait_for_timeout(1500)
    clicked=0
    for label in LABELS:
        try:
            for el in pg.get_by_role('button', name=label).all()[:4]:
                try: el.scroll_into_view_if_needed(timeout=800); el.click(timeout=1200); clicked+=1; pg.wait_for_timeout(600)
                except: pass
        except: pass
    pg.wait_for_timeout(1500)
    t=md.convert_stream(io.BytesIO(pg.content().encode()),file_extension='.html').text_content; pg.close(); return t,clicked
man=[]
with sync_playwright() as p:
    ff=p.firefox.launch(headless=True)
    for slug in JOBS:
        url=byslug[slug].get('apply_url'); done=False
        for attempt in range(2):
            try:
                t,clicked=fetch(ff,url)
                if len(t)>30000 and len(t) not in (63714,64965):
                    Path('data/raw/cards/us-'+slug+'.md').write_text(t,encoding='utf-8')
                    man.append({'slug':slug,'name':byslug[slug]['name'],'country':'US','md_path':'data/raw/cards/us-'+slug+'.md'})
                    print(f"OK {slug} ({len(t)}, {clicked} clicks)",flush=True); done=True; break
                else: print(f"thin {slug} {len(t)}",flush=True)
            except Exception as e: print(f"err {slug} {type(e).__name__}",flush=True)
            time.sleep(4)
        if not done: print(f"UNRESOLVED {slug}",flush=True)
        time.sleep(4)
    ff.close()
json.dump({'entries':man},open('data/raw/cards/manifest_amextabs.json','w'),indent=2)
print('resolved',len(man))
