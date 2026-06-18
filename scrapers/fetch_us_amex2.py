import json, io, hashlib
from pathlib import Path
from playwright.sync_api import sync_playwright
from markitdown import MarkItDown
md=MarkItDown()
B="https://www.americanexpress.com/us/credit-cards/card/"
# corrected slugs (with -card suffix etc.), try variants
CAND={
 'american-express-gold-card':['gold-card'],
 'delta-skymiles-gold-american-express-card':['delta-skymiles-gold-card'],
 'delta-skymiles-platinum-american-express-card':['delta-skymiles-platinum-card'],
 'delta-skymiles-reserve-american-express-card':['delta-skymiles-reserve-card'],
 'delta-skymiles-blue-american-express-card':['delta-skymiles-blue-card'],
 'marriott-bonvoy-bevy-american-express-card':['marriott-bonvoy-bevy-card'],
 'marriott-bonvoy-brilliant-american-express-card':['marriott-bonvoy-brilliant-card'],
 'hilton-honors-american-express-aspire-card':['hilton-honors-aspire-card'],
 'business-platinum-card':['business-platinum-card'],
 'business-gold-card':['business-gold-card'],
 'business-green-rewards-card':['business-green-rewards-card','business-green-card'],
 'blue-business-cashtm-card':['blue-business-cash-card'],
 'blue-business-plus-credit-card':['blue-business-plus-credit-card','blue-business-plus-card'],
 'delta-skymiles-reserve-business-card':['delta-skymiles-reserve-business-card'],
 'delta-skymiles-platinum-business-card':['delta-skymiles-platinum-business-card'],
 'marriott-bonvoy-business-card':['marriott-bonvoy-business-card'],
 'hilton-honors-business-card':['hilton-honors-business-card'],
 'amazon-business-prime-card':['amazon-business-prime-card'],
 'amazon-business-card':['amazon-business-card'],
 'plum-card':['the-plum-card','plum-card'],
}
us=json.load(open('src/data/us_cards_comprehensive.json',encoding='utf-8')); byslug={c['slug']:c for c in us}
def good(t):
    tl=t.lower()
    return len(t)>8000 and len(t)!=64965 and sum(k in tl for k in ('car rental','rental car','baggage','purchase protection','return protection','trip','cell phone','extended warranty','car rental loss'))>=2
man=[]
with sync_playwright() as p:
    b=p.firefox.launch(headless=True)
    for i,(slug,paths) in enumerate(CAND.items(),1):
        hit=False
        for sl in paths:
            try:
                pg=b.new_page(); pg.goto(B+sl+'/',wait_until='domcontentloaded',timeout=40000); pg.wait_for_timeout(4500)
                for _ in range(8): pg.keyboard.press('End'); pg.wait_for_timeout(300)
                t=md.convert_stream(io.BytesIO(pg.content().encode()),file_extension='.html').text_content; pg.close()
                if good(t):
                    mp='data/raw/cards/us-'+slug+'.md'; Path(mp).write_text(t,encoding='utf-8')
                    man.append({'slug':slug,'name':byslug[slug]['name'],'country':'US','md_path':mp}); hit=True
                    print(f"[{i}/20] OK {slug} <- {sl} ({len(t)})",flush=True); break
                else: print(f"[{i}/20] thin {slug} <- {sl} ({len(t)})",flush=True)
            except Exception as e: print(f"[{i}/20] err {slug} {type(e).__name__}",flush=True)
        if not hit: print(f"[{i}/20] UNRESOLVED {slug}",flush=True)
    b.close()
Path('data/raw/cards/manifest_usamex2.json').write_text(json.dumps(man,indent=2),encoding='utf-8')
print('resolved',len(man),'/',len(CAND))
