export interface PFArticle {
  slug: string;
  title: string;
  dek: string;
  tag: string;
  read: string;
  /** Display month-year, e.g. "Jul 2026". */
  date: string;
  /**
   * Scheduled go-live date "YYYY-MM-DD" (America/Toronto). The article is hidden
   * from the listing, the sitemap, and its own page until this date passes. Omit
   * for evergreen articles that are always live.
   */
  publishAt?: string;
}

// Personal Finance guides. Newest first. The eight July articles are pre-written
// and drip out one every 3 days via publishAt (see isPFPublished + revalidate on
// the page and sitemap). No cron or deploy needed; they reveal on schedule.
export const PF_ARTICLES: PFArticle[] = [
  {
    slug: "how-to-build-credit-canada",
    title: "How to build (or rebuild) credit in Canada",
    dek: "How credit scores work in Canada, who tracks them (Equifax and TransUnion, roughly 300 to 900), the factors that move them, and a practical playbook to build credit from scratch, from a thin file, or after missed payments.",
    tag: "Money",
    read: "10 min read",
    date: "Jul 2026",
  },
  {
    slug: "check-your-credit-report-canada",
    title: "Check your credit report and score in Canada, free",
    dek: "How to read your Canadian credit report, check both your report and score for free from Equifax Canada and TransUnion Canada, understand why your number moves, spot and dispute errors, and see through common credit myths.",
    tag: "Money",
    read: "9 min read",
    date: "Jul 2026",
  },
  {
    slug: "newcomer-to-canada-first-cards-accounts",
    title: "Newcomer to Canada: your first credit cards and bank accounts",
    dek: "A plain-language playbook for newcomers: get a SIN, open a chequing and savings account, get a first credit card to start a Canadian credit file, and build credit from scratch. Your foreign credit history does not transfer.",
    tag: "Money",
    read: "9 min read",
    date: "Jul 2026",
  },
  {
    slug: "credit-card-travel-insurance-canada",
    title: "What your credit card's travel insurance actually covers",
    dek: "What credit-card travel insurance in Canada actually covers: emergency medical, trip cancellation, delays and rental cars, plus the age caps and day limits that catch people out.",
    tag: "Cards",
    read: "9 min read",
    date: "Jul 2026",
  },
  {
    slug: "fhsa-vs-rrsp-home-buyers-plan",
    title: "FHSA vs the RRSP Home Buyers' Plan: which to use for a first home",
    dek: "The FHSA gives a tax-free withdrawal you never repay; the Home Buyers' Plan is a loan from your own RRSP you repay over 15 years. Which to prioritize for a first home, and how to use both.",
    tag: "Strategy",
    read: "10 min read",
    date: "Jul 2026",
  },
  {
    slug: "rrsp-vs-tfsa-canada",
    title: "RRSP vs TFSA: the honest decision for Canadians",
    dek: "The real answer comes down to your marginal tax rate now versus in retirement. A plain-language head-to-head on how each account works, who each one favours, the refund trap, withdrawal and room mechanics, and why 'both' is usually right.",
    tag: "Strategy",
    read: "12 min read",
    date: "Jul 2026",
  },
  {
    slug: "credit-card-interest-canada",
    title: "How credit card interest works in Canada (and how to never pay it)",
    dek: "Grace periods, how interest is actually calculated, why cash advances are worse, and the one habit that keeps the interest you pay at zero. Plus what to do if you already carry a balance.",
    tag: "Cards",
    read: "9 min read",
    date: "Jul 2026",
  },
  {
    slug: "resp-cesg-grant-canada",
    title: "RESP and the 20% CESG grant: the easiest guaranteed return in Canada",
    dek: "The government adds 20 percent to what you put in an RESP, up to $500 a year per child. Here is how the grant works, how not to leave money on the table, and how to invest it.",
    tag: "Money",
    read: "9 min read",
    date: "Jul 2026",
    publishAt: "2026-07-25",
  },
  {
    slug: "two-player-mode-couples-welcome-bonuses",
    title: "Two-player mode: how Canadian couples double their welcome bonuses",
    dek: "Two people means two sets of welcome bonuses, plus referral points for pointing each other to cards. Here is how to run it as a household without wrecking anyone's credit.",
    tag: "Points",
    read: "8 min read",
    date: "Jul 2026",
    publishAt: "2026-07-22",
  },
  {
    slug: "canadian-account-order-of-operations",
    title: "Where your next dollar should go: the Canadian account order",
    dek: "Employer match, FHSA, TFSA, RRSP, or taxable? A clear order of operations for Canadians, with the marginal-rate logic that decides when an RRSP beats a TFSA.",
    tag: "Strategy",
    read: "10 min read",
    date: "Jul 2026",
    publishAt: "2026-07-19",
  },
  {
    slug: "points-vs-cash-back-canada",
    title: "Points vs cash back: which actually wins for your household",
    dek: "Travel points can be worth more per dollar, but only if you use them well. Here is the honest cents-per-point threshold where simple cash back is the smarter, lower-effort choice.",
    tag: "Strategy",
    read: "9 min read",
    date: "Jul 2026",
    publishAt: "2026-07-16",
  },
  {
    slug: "foreign-transaction-fee-cards-canada",
    title: "The 2.5% foreign transaction fee, and the cards that kill it",
    dek: "That quiet 2.5 percent on every foreign-currency purchase adds up fast. Here is when it actually matters and the Canadian cards (Scotia Passport, Wealthsimple, Rogers) that skip or rebate it.",
    tag: "Cards",
    read: "8 min read",
    date: "Jul 2026",
    publishAt: "2026-07-13",
  },
  {
    slug: "fhsa-playbook-canada",
    title: "The FHSA playbook: Canada's most underused account",
    dek: "The First Home Savings Account gives you an RRSP-style deduction and a TFSA-style tax-free withdrawal for a first home. Here is how the room works, how to invest it, and how to stack it with the RRSP Home Buyers' Plan.",
    tag: "Strategy",
    read: "11 min read",
    date: "Jul 2026",
    publishAt: "2026-07-10",
  },
  {
    slug: "are-credit-card-points-taxable-canada",
    title: "Are credit card points and cash back taxable in Canada?",
    dek: "For everyday personal spending the answer is no, but self-employment, business cards, and referral bonuses carry real nuances the CRA cares about. Here is what actually counts as income.",
    tag: "Money",
    read: "8 min read",
    date: "Jul 2026",
    publishAt: "2026-07-07",
  },
  {
    slug: "how-to-hit-minimum-spend-canada",
    title: "How to hit a credit card minimum spend without wasting a dollar",
    dek: "Welcome bonuses need a minimum spend in the first few months. Here are the honest ways to get there, from prepaying real bills to gift cards, without buying junk you do not need.",
    tag: "Points",
    read: "9 min read",
    date: "Jul 2026",
    publishAt: "2026-07-04",
  },
  {
    slug: "pay-bills-with-credit-card-canada",
    title: "Paying rent, taxes, and your mortgage with a credit card in Canada",
    dek: "Third-party services will run your rent, taxes, or mortgage through your card for a fee of about 1.75 to 2.99 percent. Here is the honest math, the services (Chexy, PaySimply, Plastiq), and the three cases where it actually pays off.",
    tag: "Cards",
    read: "10 min read",
    date: "Jul 2026",
    publishAt: "2026-07-01",
  },
  {
    slug: "costco-membership-worth-it-canada",
    title: "Does a Costco membership pay for itself?",
    dek: "A clear, no-hype look at Costco Canada's fees, the 2% Executive reward, and where the savings really come from, so you can run the breakeven math for your own household.",
    tag: "Money",
    read: "8 min read",
    date: "Jun 2026",
  },
  {
    slug: "smith-manoeuvre",
    title: "The Smith Manoeuvre, explained properly",
    dek: "How Canadian homeowners can turn mortgage interest into a tax deduction and build an investment portfolio at the same time. Every variation, step by step, with the risks laid out honestly.",
    tag: "Strategy",
    read: "18 min read",
    date: "Jun 2026",
  },
];

// Today's date in Canadian time as "YYYY-MM-DD" (en-CA formats this way).
function pfTodayISO(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** True once an article's publishAt date has arrived (or if it has none). */
export function isPFPublished(slug: string): boolean {
  const a = PF_ARTICLES.find((x) => x.slug === slug);
  if (!a) return false;
  if (!a.publishAt) return true;
  return a.publishAt <= pfTodayISO();
}

/** Articles currently live, in list order (newest first). */
export function livePFArticles(): PFArticle[] {
  return PF_ARTICLES.filter((a) => isPFPublished(a.slug));
}

/** Look up a single PF article by slug (for the boarding-pass meta rule, etc.). */
export function pfArticleBySlug(slug: string): PFArticle | undefined {
  return PF_ARTICLES.find((a) => a.slug === slug);
}
