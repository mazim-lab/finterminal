export const metadata = {
  title: "Affiliate Disclosure | FinTerminal",
  description: "How FinTerminal uses affiliate links, and our promise that they never change our rankings or recommendations.",
};

export default function DisclosurePage() {
  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <div className="head"><h1>Affiliate Disclosure</h1></div>
          <p className="lede">
            The short version: some of the links on FinTerminal are affiliate links. If you click one
            and sign up or buy something, we may earn a commission. It costs you nothing extra, and it
            never changes what we rank first or what we recommend.
          </p>

          <div className="cd-sec">How it works</div>
          <p>
            Running a site like this costs money, and we would rather be paid by the banks and retailers
            than wall everything off behind ads or a paywall. So when a card issuer, store, or travel
            partner has an affiliate program, we sometimes use their tracking links. If you go on to open
            an account or make a purchase, they pay us a referral fee.
          </p>

          <div className="cd-sec">What it does not do</div>
          <p>
            Our rankings are independent. The Card Explorer sorts by our own estimated value, calculated
            the same way for every card, and an affiliate relationship never moves a card up the list or
            buys a better write-up. Deals are chosen because they are genuinely good, not because they pay.
            When something has a real catch, we tell you, affiliate link or not. If we ever cannot link to
            the best option, we will still tell you it is the best option.
          </p>

          <div className="cd-sec">Not financial advice</div>
          <p>
            FinTerminal is information, not personalized financial advice. We are not licensed advisors.
            Always check the current terms with the bank or retailer before you apply or buy, since offers
            change often.
          </p>

          <p className="lede" style={{ marginTop: 20 }}>
            Questions? <a className="lnk" href="/contact">Reach out any time</a>. We would rather earn your trust
            than a quick click.
          </p>
        </div>
      </main>
    </div>
  );
}
