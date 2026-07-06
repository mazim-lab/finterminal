import Link from "next/link";
import { ArticleTags } from "@/components/ArticleTags";
import { ArticleHero } from "@/components/ArticleHero";
import { CreditGaugeMotif } from "@/components/heroes/motifs";
import { ogMeta } from "@/lib/og";
import { ArticleSchema } from "@/components/ArticleSchema";

export const metadata = {
  title: "Check Your Credit Report and Score in Canada, Free | FinTerminal",
  description:
    "How to read your Canadian credit report, check both your report and score for free from Equifax Canada and TransUnion Canada, understand why your number moves, spot and dispute errors, and see through common credit myths. General info as of July 2026, not credit advice.",
  ...ogMeta("Check Your Credit Report and Score in Canada, Free", "Personal finance"),
};

export const revalidate = 3600;

const TOC = [
  { id: "short", label: "The short answer" },
  { id: "report-vs-score", label: "Report versus score, and what is on your report" },
  { id: "check", label: "How to check both, for free" },
  { id: "updates", label: "How often it updates, and why your number moves" },
  { id: "read", label: "How to read your report and spot errors" },
  { id: "dispute", label: "How to dispute an error" },
  { id: "myths", label: "Myths worth clearing up" },
  { id: "faq", label: "Frequently asked questions" },
];

const FAQ = [
  {
    q: "Is my credit report the same as my credit score?",
    a: "No, they are two different things. Your credit report is the detailed file itself: a list of your credit accounts, your payment history on each, who has recently checked your file, and any collections or public records tied to your name. Your credit score is a single number, running roughly from 300 to 900, that a scoring model calculates as a shorthand summary of that report. The report is the underlying record; the score is a compressed snapshot of it. Two different scoring models can read the same report and produce slightly different numbers, which is why the exact figure a lender pulls can differ from the free educational score you see in an app. This is general information as of July 2026, not credit advice.",
  },
  {
    q: "How do I check my credit report and score for free in Canada?",
    a: "You can request your credit report directly from the two Canadian bureaus, Equifax Canada and TransUnion Canada, and each also offers ways to see a score. Separately, many banks and free apps show you an educational score at no cost, which is handy for tracking the trend over time. The important nuance is that the free educational score you see may differ from the exact score a lender pulls when you apply, because it can be built on a different model. Checking your own report or score is treated as a soft inquiry and does not affect your score, so you can look as often as you like. The Government of Canada also explains your rights and how to get your report.",
  },
  {
    q: "Why did my credit score go down when I did nothing wrong?",
    a: "Small month to month movement is normal and does not always mean you did something wrong. Your score is recalculated from your report as new information arrives, and lenders report on their own schedules, so the balance shown on a card can change simply because of when your statement closed relative to when it was reported. A higher reported balance nudges your utilization up, a new hard inquiry from an application can ding it a little, and the mix of what updated that month all feed in. If the change is small, it is usually just the number breathing. A large, unexplained drop is worth investigating by reading your actual report.",
  },
  {
    q: "Does checking my own credit report hurt my score?",
    a: "No. When you check your own report or score, it is recorded as a soft inquiry, and soft inquiries do not affect your score at all. You can check as often as you like, and doing so regularly is good practice because it helps you catch errors and signs of fraud early. What can nudge your score down is a hard inquiry, which happens when a lender pulls your file to assess a new credit application. So checking your own is safe, while applying for several new products in a short window is what is worth spacing out.",
  },
  {
    q: "I found a mistake on my credit report. How do I fix it?",
    a: "You have the right to dispute information you believe is inaccurate, and it is free. Because Equifax Canada and TransUnion Canada keep separate files, check both, since an error can appear on one and not the other. Contact the bureau that shows the error and file a dispute through its formal process, including any supporting documents, such as a statement showing a payment was on time. The bureau investigates, typically by checking with the creditor that supplied the information, and corrects or removes anything found to be inaccurate. Fixing genuine errors is legitimate and free, which is very different from paid credit-repair schemes that promise to erase accurate negative history.",
  },
  {
    q: "How do I actually raise my score once I understand it?",
    a: "Understanding and checking your report is the first half; the action steps to raise your number are a separate topic. In short, it comes down to paying every bill on time, keeping your card balances low relative to your limits, keeping older accounts open, and limiting how often you apply for new credit. For the full, step by step playbook, including how to start from nothing or rebuild after missed payments, see our companion guide on how to build or rebuild credit in Canada. This page is about understanding and monitoring; that one is about improving. This is general information, not financial or credit advice.",
  },
];

export default function CheckYourCreditReportPage() {
  return (
    <div className="app norail">
      <main>
        <div className="doc">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: FAQ.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
          <nav className="crumb">
            <Link href="/">home</Link><span className="sep">/</span>
            <Link href="/personal-finance">personal-finance</Link><span className="sep">/</span>
            <span className="cur">check-your-credit-report-canada</span>
          </nav>
          <ArticleSchema headline="Check Your Credit Report and Score in Canada, Free" path="/personal-finance/check-your-credit-report-canada" kicker="Personal finance" />

          <ArticleHero variant="graphic" alt="A credit-score gauge dial">
            <CreditGaugeMotif />
          </ArticleHero>

          <div className="head"><h1>How to Check and Understand Your Credit Report and Score in Canada</h1></div>
          <p className="lede">
            Your credit report is one of the most consequential documents in your financial life, and yet most people
            have never actually read theirs. The good news is that you are entitled to see it, you can check it for free,
            and looking at it does not cost you a single point. This guide is about understanding what is on that report,
            how to pull both your report and your score at no charge from the Canadian bureaus, why your number drifts a
            little from month to month, how to read the file and catch mistakes, and how to see through the myths that
            follow credit around. It is deliberately about knowing and watching your credit, not fixing it. When you are
            ready for the action steps to actually raise your number, we will point you to our companion guide.
          </p>
          <div className="docmeta">
            <span className="gd">PERSONAL FINANCE</span><span className="sep">·</span>
            <span>about 10 min read</span><span className="sep">·</span>
            <span>General info as of July 2026; general information, not financial or credit advice</span>
          </div>
          <ArticleTags path="/personal-finance/check-your-credit-report-canada" />

          <div className="cd-note short">
            <div className="cap">The short answer</div>
            <p style={{ margin: 0 }} className="sub">
              Your credit <em>report</em> is the detailed file (your accounts, payment history, inquiries, and any
              collections or public records), while your credit <em>score</em> is a single number, running roughly from
              300 to 900, that summarises that report. In Canada, two bureaus, Equifax Canada and TransUnion Canada, each
              keep their own report and score. You can check your report directly from both bureaus for free, and many
              banks and free apps show a free educational score that may differ from the exact score a lender pulls.
              Checking your own is a soft inquiry that does not hurt your score, so look often. Read your report to catch
              errors, and if you find one, you have the right to dispute it with the bureau for free. To actually raise
              your number, see our{" "}
              <Link href="/personal-finance/how-to-build-credit-canada">guide on building or rebuilding credit</Link>.
              This is general information, not financial or credit advice; confirm details with the bureau.
            </p>
          </div>

          <div className="toc">
            <div className="tt">In this guide</div>
            <div className="toc-grid">
              {TOC.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
            </div>
          </div>

          {/* REPORT VS SCORE */}
          <div id="report-vs-score" className="cd-sec" style={{ scrollMarginTop: 70 }}>Report versus score, and what is on your report</div>
          <p>
            People use the phrases interchangeably, but a credit report and a credit score are not the same thing, and
            knowing the difference is the whole foundation for reading either one. Your credit report is the actual file:
            a running record of how you have borrowed and repaid, assembled by a credit bureau from information that
            lenders and other creditors send it. Your credit score is a single number that a scoring model calculates by
            reading that report and boiling it down, commonly onto a scale of roughly 300 to 900 where higher is better,
            though the exact range and model can vary. The report is the story; the score is the one-line summary. When
            you want to understand your credit, the report is what you actually read.
          </p>
          <p>
            In Canada, that record is kept by two bureaus, Equifax Canada and TransUnion Canada, and each maintains its
            own separate report and produces its own score. Because they collect information independently, the two can
            hold different data, which is exactly why it is worth looking at both rather than assuming they agree. A given
            report generally holds a few kinds of information:
          </p>
          <ul>
            <li>
              <strong>Your accounts (tradelines):</strong> the credit cards, loans, lines of credit, and similar accounts
              in your name, each with its limit or original amount, current balance, and a month by month payment history
              showing whether you paid on time. This is the bulk of the report and the part that matters most.
            </li>
            <li>
              <strong>Inquiries:</strong> a list of who has recently looked at your file. Hard inquiries, from a lender
              assessing a new application, are visible to others and can nudge your score. Soft inquiries, like you
              checking your own report, are typically shown only to you and do not affect your score.
            </li>
            <li>
              <strong>Collections and public records:</strong> accounts that were sent to a collection agency, and in some
              cases public records such as a bankruptcy or a consumer proposal. These are the heavier negative marks, and
              they generally stay on your report for a number of years before dropping off.
            </li>
            <li>
              <strong>Personal information:</strong> identifying details like your name, current and past addresses, date
              of birth, and sometimes employment information. It is worth a glance, because an address or name you do not
              recognise can be an early clue that something is wrong.
            </li>
          </ul>
          <div className="cd-note">
            <div className="cap">Why the free score in your app may not match a lender&rsquo;s</div>
            <p style={{ margin: 0 }} className="sub">
              The educational score your bank or a free app shows you is real and useful for tracking your trend, but it
              can be built on a different scoring model than the one a particular lender pulls when you apply. So do not
              be alarmed if the number a lender quotes differs from the one in your app by a bit. Treat your free score as
              a reliable gauge of direction, not as the single official figure every lender will see, because there is no
              one universal number.
            </p>
          </div>

          {/* CHECK */}
          <div id="check" className="cd-sec" style={{ scrollMarginTop: 70 }}>How to check both, for free</div>
          <p>
            You do not have to pay to see your own credit. The most direct route is to go to the two bureaus themselves,
            and separately you can track a free educational score through many banks and apps. Here is how to do it, step
            by step.
          </p>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <div className="st">Request your report from Equifax Canada</div>
              <p>
                Go straight to{" "}
                <a href="https://www.equifax.ca/personal/" target="_blank" rel="noopener noreferrer">Equifax Canada</a>{" "}
                and request your credit report. You will need to verify your identity. This is one of the two files
                lenders may draw on, so it is the primary source, not a third-party guess. Checking it is a soft inquiry
                and does not affect your score.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <div className="st">Request your report from TransUnion Canada too</div>
              <p>
                Do the same at{" "}
                <a href="https://www.transunion.ca/" target="_blank" rel="noopener noreferrer">TransUnion Canada</a>.
                Because the two bureaus keep separate files, an account or an error can appear on one and not the other,
                so checking both gives you the full picture rather than half of it.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <div className="st">Get a free educational score for ongoing tracking</div>
              <p>
                Many Canadian banks now show a free credit score inside their online banking, and free apps such as
                Borrowell and Credit Karma offer an educational score as a third-party service. These are a convenient way
                to watch your number over time between full report checks. Just remember this is an educational score that
                may differ from the exact score a lender uses, so lean on the bureaus above as your source of record.
              </p>
            </div>
            <div className="step">
              <div className="num">4</div>
              <div className="st">Know your rights and check on a schedule</div>
              <p>
                The{" "}
                <a href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score.html" target="_blank" rel="noopener noreferrer">Government of Canada</a>{" "}
                (through the Financial Consumer Agency of Canada) explains your right to access your report and how to
                request it. A sensible habit is to review your full report from both bureaus once or twice a year, and to
                glance at your free educational score more often. Every one of these checks is a soft inquiry, so none of
                it costs you a point.
              </p>
            </div>
          </div>

          {/* UPDATES */}
          <div id="updates" className="cd-sec" style={{ scrollMarginTop: 70 }}>How often it updates, and why your number moves</div>
          <p>
            Your credit report is not a static snapshot; it is updated as new information flows in. Lenders and creditors
            generally report to the bureaus on their own cycles, often around once a month, so your report is really a
            rolling picture that shifts as each account reports in. Because your score is recalculated from that changing
            report, a little month to month movement is completely normal and rarely a sign that anything is wrong.
          </p>
          <p>
            The single most common reason a number drifts is timing. The balance a card reports depends on when its
            statement closed, so a month where you happened to carry a larger balance at statement time can push your
            reported utilization up, even if you paid it off days later. Beyond that, a new hard inquiry from an
            application, a new account that lowers your average account age, a balance that was paid down, or a negative
            mark aging off can all move the number in either direction. When the shift is small, it is usually just the
            report breathing as accounts update at slightly different times.
          </p>
          <div className="cd-note">
            <div className="cap">Small wobble versus a real signal</div>
            <p style={{ margin: 0 }} className="sub">
              A few points up or down between checks is background noise and not worth worrying about. What is worth a
              closer look is a large, unexplained drop, or a change you cannot tie to anything you did, because that is
              exactly the kind of thing that reading your actual report can explain, whether it is a reporting quirk, an
              error, or a sign of fraud.
            </p>
          </div>

          {/* READ */}
          <div id="read" className="cd-sec" style={{ scrollMarginTop: 70 }}>How to read your report and spot errors</div>
          <p>
            When you open your report, resist the urge to jump straight to the score and instead read the file itself.
            Go section by section and check that everything genuinely belongs to you and looks right. A calm, methodical
            pass tends to surface anything off.
          </p>
          <ul>
            <li>
              <strong>Personal information:</strong> confirm your name, addresses, and any employment details look
              correct. An address you have never lived at, or a name variation you do not recognise, can be an early sign
              of mixed files or identity theft.
            </li>
            <li>
              <strong>Accounts:</strong> make sure every account listed is actually yours, that the limits and balances
              look plausible, and that the payment history matches your memory. A payment marked late that you know you
              made on time, or an account you never opened, is exactly the kind of error to flag.
            </li>
            <li>
              <strong>Inquiries:</strong> scan the hard inquiries and check they line up with applications you actually
              made. An inquiry from a lender you never approached is worth questioning.
            </li>
            <li>
              <strong>Collections and public records:</strong> confirm any collection or public record is legitimate and
              belongs to you, and note the dates, since these items are meant to age off after a number of years.
            </li>
          </ul>
          <p>
            Errors are more common than people expect, and they are not always in your favour. Because the two bureaus
            hold separate files, an error can live on your Equifax report but not your TransUnion one, or the reverse,
            which is one more reason to read both. If everything checks out, you are done. If something is wrong, the next
            section is your move.
          </p>

          {/* DISPUTE */}
          <div id="dispute" className="cd-sec" style={{ scrollMarginTop: 70 }}>How to dispute an error</div>
          <p>
            If you find something inaccurate, you have the right to dispute it, and the process is free. You do not need a
            paid service to do this for you. Here is the honest, accurate version of how it works.
          </p>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <div className="st">Confirm which bureau shows the error</div>
              <p>
                Check whether the mistake appears on your Equifax report, your TransUnion report, or both, because they
                keep separate files. You may need to file the same dispute with each bureau that shows it.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <div className="st">Gather your supporting documents</div>
              <p>
                Pull together anything that backs up your case, such as a statement showing a payment was made on time, a
                letter confirming an account was closed, or records showing an account is not yours. Clear evidence makes
                the investigation smoother.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <div className="st">File the dispute with the bureau</div>
              <p>
                Contact the bureau,{" "}
                <a href="https://www.equifax.ca/personal/" target="_blank" rel="noopener noreferrer">Equifax Canada</a>{" "}
                or{" "}
                <a href="https://www.transunion.ca/" target="_blank" rel="noopener noreferrer">TransUnion Canada</a>, and
                use its formal dispute process to flag the specific item and explain what is wrong. Each bureau has a set
                way to submit a dispute.
              </p>
            </div>
            <div className="step">
              <div className="num">4</div>
              <div className="st">Let the bureau investigate, then follow up</div>
              <p>
                The bureau investigates the disputed item, typically by checking with the creditor that supplied the
                information, and corrects or removes anything found to be inaccurate. Keep a record of your dispute, watch
                for the outcome, and follow up if it is not resolved. Fixing a genuine error is free and can only help
                your report reflect reality.
              </p>
            </div>
          </div>
          <div className="cd-note">
            <div className="cap">A dispute fixes errors, not accurate history</div>
            <p style={{ margin: 0 }} className="sub">
              The dispute process exists to correct information that is genuinely wrong. It is not a way to erase accurate
              negative marks, and no legitimate service can wish away truthful history. If the information is correct, the
              honest path is time and good habits, not a dispute. That distinction is exactly what the myths below are
              about.
            </p>
          </div>

          {/* MYTHS */}
          <div id="myths" className="cd-sec" style={{ scrollMarginTop: 70 }}>Myths worth clearing up</div>
          <p>
            A lot of folklore surrounds credit in Canada, and some of it quietly costs people money or steers them wrong.
            Here are the ones worth setting straight.
          </p>
          <ul>
            <li>
              <strong>Checking your own score does not hurt it.</strong> Looking at your own report or score is a soft
              inquiry, and soft inquiries do not affect your score. You can check as often as you like, and doing so is
              good practice. Only a hard inquiry, from a lender assessing a new application, can nudge your number.
            </li>
            <li>
              <strong>Your income is not on your credit score.</strong> A credit score is about how you handle borrowed
              money, not how much you earn. Your salary is not a factor baked into the number itself. Lenders may ask for
              your income separately when you apply, but that is part of their own assessment, not your score.
            </li>
            <li>
              <strong>Carrying a balance does not help.</strong> There is a stubborn myth that leaving a balance on your
              card and paying interest somehow builds credit faster. It does not. Paying your statement in full builds
              exactly the same positive history, and it saves you the interest. Carrying a balance mainly benefits the
              lender.
            </li>
            <li>
              <strong>Closing your oldest card usually hurts.</strong> It feels tidy to cancel a card you rarely use, but
              closing your longest-held account can shorten your credit history and cut your total available credit, both
              of which can work against your score. If it is a no-fee card, keeping it open and lightly used is often the
              better move.
            </li>
            <li>
              <strong>There is no instant fix.</strong> Your report reflects real history, and a strong file is built over
              months, not overnight. Anyone promising to boost your score dramatically in days is selling something that
              is either doable yourself for free or simply not possible.
            </li>
            <li>
              <strong>Be wary of &ldquo;credit repair&rdquo; schemes.</strong> Services that charge a fee to erase
              accurate negative history are selling something they cannot legitimately deliver. You can dispute genuine
              errors yourself at no cost, and accurate information, good or bad, is not something a paid service can make
              disappear.
            </li>
          </ul>

          {/* FAQ */}
          <div id="faq" className="cd-sec" style={{ scrollMarginTop: 70 }}>Frequently asked questions</div>
          {FAQ.map((f) => (
            <div key={f.q}>
              <h4>{f.q}</h4>
              <p>{f.a}</p>
            </div>
          ))}

          <div className="cd-sec">Keep going</div>
          <p>
            Reading and monitoring your credit is a quietly powerful habit: it costs nothing, it does not touch your
            score, and it lets you catch problems while they are still small. Once you understand what is on your report
            and have checked it for errors, the natural next step is improving the number itself, and that is a separate
            skill with its own playbook. To actually raise your credit, our companion guide walks through paying on time,
            keeping balances low, and building or rebuilding a file from any starting point. This is general information
            as of July 2026, not financial or credit advice; confirm the details with the bureau.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/personal-finance/how-to-build-credit-canada" className="cd-apply">
              How to build (or rebuild) credit in Canada &rarr;
            </Link>
            <Link href="/personal-finance/newcomer-to-canada-first-cards-accounts" className="cd-apply">
              Newcomer to Canada: your first cards and accounts &rarr;
            </Link>
            <Link href="/personal-finance" className="cd-apply" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}>
              More personal finance &rarr;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
