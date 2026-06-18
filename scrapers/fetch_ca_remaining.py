import json, io
from pathlib import Path
from playwright.sync_api import sync_playwright
from markitdown import MarkItDown
md=MarkItDown()
R="https://www.rbcroyalbank.com/credit-cards"; S="https://www.scotiabank.com/ca/en/personal/credit-cards"; BM="https://www.bmo.com/en-ca/main/personal/credit-cards"; N="https://www.nbc.ca/personal/mastercard-credit-cards"
CAND={
 'rbc-cash-back-mastercard':('cr',[R+'/cash-back/rbc-cash-back-mastercard.html']),
 'westjet-rbc-mastercard':('cr',[R+'/travel/westjet-rbc-world-elite-mastercard.html']),
 'rbc-u-s-dollar-visa-gold':('cr',[R+'/travel/rbc-us-dollar-visa-gold.html',R+'/no-annual-fee/rbc-us-dollar-visa-gold.html']),
 'rbc-rateadvantage-visa':('cr',[R+'/low-interest/rbc-rateadvantage-visa.html']),
 'rbc-avion-visa-business':('cr',[R+'/business/rbc-avion-visa-business.html']),
 'scotia-momentum-no-fee-visa-card-for-students':('cr',[S+'/visa/momentum-no-fee-visa-card.html']),
 'scotia-momentum-for-business-visa-card':('cr',[S+'/mastercard/momentum-business-visa-card.html',S+'/visa/momentum-business-visa-card.html']),
 'scotiabank-passport-visa-infinite-business-card':('cr',[S+'/visa/passport-infinite-business-card.html']),
 'bmo-preferred-rate-mastercard':('ff',[BM+'/bmo-preferred-rate-mastercard/']),
 'bmo-u-s-dollar-mastercard':('ff',[BM+'/bmo-us-dollar-mastercard/']),
 'bmo-cashback-business-mastercard':('ff',['https://www.bmo.com/en-ca/main/business/credit-cards/bmo-cashback-business-mastercard/']),
 'national-bank-syncro-mastercard':('cr',[N+'/syncro.html']),
 'national-bank-platinum-business-mastercard':('cr',['https://www.nbc.ca/business/credit-cards/platinum-business-mastercard.html']),
}
ca=json.load(open('src/data/canadian_cards_comprehensive.json',encoding='utf-8')); byslug={c['slug']:c for c in ca}
def good(t):
    tl=t.lower(); return len(t)>8000 and sum(k in tl for k in ('car rental','trip cancellation','emergency','purchase security','purchase protection','mobile device','extended warranty','baggage'))>=2
man=[]
with sync_playwright() as p:
    cr=p.chromium.launch(headless=True); ff=p.firefox.launch(headless=True)
    for slug,(eng,urls) in CAND.items():
        br=ff if eng=='ff' else cr
        for url in urls:
            try:
                pg=br.new_page(); pg.goto(url,wait_until='domcontentloaded',timeout=35000); pg.wait_for_timeout(4000)
                for _ in range(8): pg.keyboard.press('End'); pg.wait_for_timeout(300)
                t=md.convert_stream(io.BytesIO(pg.content().encode()),file_extension='.html').text_content; pg.close()
                if good(t):
                    mp='data/raw/cards/'+slug+'.md'; Path(mp).write_text(t,encoding='utf-8')
                    man.append({'slug':slug,'name':byslug[slug]['name'],'country':'CA','md_path':mp})
                    print(f"OK {slug} ({len(t)})",flush=True); break
                else: print(f"thin {slug} {len(t)} {url.split('/')[-1][:30]}",flush=True)
            except Exception as e: print(f"err {slug} {type(e).__name__}",flush=True)
        else: print(f"UNRESOLVED {slug}",flush=True)
    cr.close(); ff.close()
Path('data/raw/cards/manifest_ca_rem.json').write_text(json.dumps(man,indent=2),encoding='utf-8')
print('resolved',len(man),'/',len(CAND))
