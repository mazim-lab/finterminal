import json, io, time
from pathlib import Path
from playwright.sync_api import sync_playwright
from markitdown import MarkItDown
md=MarkItDown()
B="https://www.americanexpress.com/us/credit-cards/card/"
# full exact slugs (= card name kebab); personal remaining
SL={
 'delta-skymiles-gold-american-express-card':'delta-skymiles-gold-american-express-card',
 'delta-skymiles-platinum-american-express-card':'delta-skymiles-platinum-american-express-card',
 'delta-skymiles-reserve-american-express-card':'delta-skymiles-reserve-american-express-card',
 'delta-skymiles-blue-american-express-card':'delta-skymiles-blue-american-express-card',
 'marriott-bonvoy-bevy-american-express-card':'marriott-bonvoy-bevy-american-express-card',
 'marriott-bonvoy-brilliant-american-express-card':'marriott-bonvoy-brilliant-american-express-card',
}
us=json.load(open('src/data/us_cards_comprehensive.json',encoding='utf-8')); byslug={c['slug']:c for c in us}
def fetch(br,url):
    pg=br.new_page(); pg.goto(url,wait_until='domcontentloaded',timeout=40000); pg.wait_for_timeout(4500)
    for _ in range(8): pg.keyboard.press('End'); pg.wait_for_timeout(300)
    t=md.convert_stream(io.BytesIO(pg.content().encode()),file_extension='.html').text_content; pg.close(); return t
def real(t):
    return len(t)>8000 and len(t) not in (63714,64965)
man=[]
with sync_playwright() as p:
    b=p.firefox.launch(headless=True)
    for i,(slug,sl) in enumerate(SL.items(),1):
        url=B+sl+'/'; t=None
        for attempt in range(3):
            try:
                t=fetch(b,url)
                if real(t): break
                print(f"  {slug} throttled (len {len(t)}), waiting...",flush=True); time.sleep(18)
            except Exception as e: print(f"  {slug} err {type(e).__name__}",flush=True); time.sleep(10)
        if t and real(t):
            mp='data/raw/cards/us-'+slug+'.md'; Path(mp).write_text(t,encoding='utf-8')
            man.append({'slug':slug,'name':byslug[slug]['name'],'country':'US','md_path':mp})
            print(f"[{i}/6] OK {slug} ({len(t)})",flush=True)
        else: print(f"[{i}/6] FAIL {slug}",flush=True)
        time.sleep(7)
    b.close()
# include already-saved distinct personal pages
for extra in ('american-express-gold-card','hilton-honors-american-express-aspire-card'):
    mp='data/raw/cards/us-'+extra+'.md'
    if Path(mp).exists() and not any(e['slug']==extra for e in man):
        man.append({'slug':extra,'name':byslug[extra]['name'],'country':'US','md_path':mp})
Path('data/raw/cards/manifest_usamex3.json').write_text(json.dumps(man,indent=2),encoding='utf-8')
print('total for extraction:',len(man))
