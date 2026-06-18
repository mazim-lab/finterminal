import json, io
from pathlib import Path
from playwright.sync_api import sync_playwright
from markitdown import MarkItDown
md=MarkItDown()
PATH={
 'platinum-card':('platinum','p'),'american-express-gold-card':('gold','p'),'american-express-green-card':('green','p'),
 'blue-cash-preferred-card':('blue-cash-preferred','p'),'blue-cash-everyday-card':('blue-cash-everyday','p'),
 'delta-skymiles-gold-american-express-card':('delta-skymiles-gold','p'),'delta-skymiles-platinum-american-express-card':('delta-skymiles-platinum','p'),
 'delta-skymiles-reserve-american-express-card':('delta-skymiles-reserve','p'),'delta-skymiles-blue-american-express-card':('delta-skymiles-blue','p'),
 'marriott-bonvoy-bevy-american-express-card':('marriott-bonvoy-bevy','p'),'marriott-bonvoy-brilliant-american-express-card':('marriott-bonvoy-brilliant','p'),
 'hilton-honors-american-express-card':('hilton-honors','p'),'hilton-honors-american-express-surpass-card':('hilton-honors-surpass','p'),
 'hilton-honors-american-express-aspire-card':('hilton-honors-aspire','p'),
 'business-platinum-card':('business-platinum','b'),'business-gold-card':('business-gold','b'),'business-green-rewards-card':('business-green','b'),
 'blue-business-cashtm-card':('blue-business-cash','b'),'blue-business-plus-credit-card':('blue-business-plus','b'),
 'delta-skymiles-reserve-business-card':('delta-skymiles-reserve-business','b'),'delta-skymiles-platinum-business-card':('delta-skymiles-platinum-business','b'),
 'marriott-bonvoy-business-card':('marriott-bonvoy-business','b'),'hilton-honors-business-card':('hilton-honors-business','b'),
 'amazon-business-prime-card':('amazon-business-prime','b'),'amazon-business-card':('amazon-business','b'),'plum-card':('the-plum-card','b'),
}
def cands(path,typ):
    P='https://www.americanexpress.com/us/credit-cards/card/{}/'
    B1='https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/american-express-{}/'
    B2='https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/{}/'
    return [P.format(path)] if typ=='p' else [B1.format(path),B2.format(path),P.format(path)]
us=json.load(open('src/data/us_cards_comprehensive.json',encoding='utf-8')); byslug={c['slug']:c for c in us}
def good(t):
    tl=t.lower()
    return len(t)>8000 and sum(k in tl for k in ('car rental','rental car','baggage','purchase protection','return protection','trip','insurance','cell phone','extended warranty'))>=2
man=[]
with sync_playwright() as p:
    b=p.firefox.launch(headless=True)
    for i,(slug,(path,typ)) in enumerate(PATH.items(),1):
        hit=False
        for url in cands(path,typ):
            try:
                pg=b.new_page(); pg.goto(url,wait_until='domcontentloaded',timeout=40000); pg.wait_for_timeout(4500)
                for _ in range(8): pg.keyboard.press('End'); pg.wait_for_timeout(300)
                t=md.convert_stream(io.BytesIO(pg.content().encode()),file_extension='.html').text_content; pg.close()
                if good(t):
                    mp='data/raw/cards/us-'+slug+'.md'; Path(mp).write_text(t,encoding='utf-8')
                    man.append({'slug':slug,'name':byslug[slug]['name'],'country':'US','md_path':mp}); hit=True
                    print(f"[{i}/26] OK {slug} ({len(t)})",flush=True); break
            except Exception as e:
                print(f"[{i}/26] err {slug} {type(e).__name__}",flush=True)
        if not hit: print(f"[{i}/26] UNRESOLVED {slug}",flush=True)
    b.close()
Path('data/raw/cards/manifest_usamex.json').write_text(json.dumps(man,indent=2),encoding='utf-8')
print('resolved',len(man),'/',len(PATH))
