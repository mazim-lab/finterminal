'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import s from './wizard.module.css';

// ── Types ────────────────────────────────────────────────

interface ChecklistItem {
  id: string;
  label: string;
}

interface StepData {
  title: string;
  time?: string;
  cost?: string;
  content: React.ReactNode;
  checklist: ChecklistItem[];
}

// ── Tip / Warning Boxes ──────────────────────────────────

function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className={`cd-note ${s.tip}`}>
      <div className="cap">Tip</div>
      <div>{children}</div>
    </div>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className={`cd-note red ${s.tip}`}>
      <div className="cap">Watch out</div>
      <div>{children}</div>
    </div>
  );
}

function CardRec({ name, note }: { name: string; note?: string }) {
  return (
    <span className={s.rec}>
      <span className={s.recName}>{name}</span>
      {note && <span className={s.recNote}>{note}</span>}
    </span>
  );
}

// ── Step Data ────────────────────────────────────────────

const STEPS: StepData[] = [
  {
    title: 'Get a US Mailing Address',
    time: '1-2 days',
    cost: '~$70-90 USD/year',
    content: (
      <>
        <p>Before anything else, you need a US residential address. This is where your cards, bank statements, and IRS correspondence will be mailed.</p>
        <p><strong>Option A: Mail forwarding service.</strong> Companies like <strong>24/7 Parcel</strong>, <strong>US Global Mail</strong>, and <strong>Traveling Mailbox</strong> give you a real street address (not a PO box) and scan or forward your mail. Expect to pay $70–90 USD per year.</p>
        <p><strong>Option B: Friend or family in the US.</strong> If you have someone willing to receive mail for you, this is the cheapest option.</p>
        <WarningBox>
          <strong>Critical check:</strong> Go to the USPS address lookup tool and verify your address. Look for &quot;Commercial Mail Receiving Agency&quot;, which must show <strong>&quot;N&quot;</strong>. If it shows &quot;Y&quot;, card issuers like Chase may flag and reject your applications.
        </WarningBox>
        <TipBox>
          <strong>Pro tip:</strong> Check your address at <strong>USPS.com</strong> before committing to any service. If the result includes &quot;Commercial Mail Receiving Agency: Y&quot;, find a different provider.
        </TipBox>
      </>
    ),
    checklist: [
      { id: 's1-chose', label: 'Chose a mail forwarding service (or have a US contact)' },
      { id: 's1-verified', label: 'Verified address is NOT flagged as commercial on USPS' },
      { id: 's1-address', label: 'Have your US street address ready' },
    ],
  },
  {
    title: 'Open a US Bank Account',
    time: '1-2 weeks',
    cost: 'Free',
    content: (
      <>
        <p>You need a US bank account for paying credit card bills in USD and for address verification with card issuers.</p>
        <p>The easiest path is through <strong>Canadian banks with US subsidiaries</strong>:</p>
        <ul>
          <li><strong>CIBC US.</strong> Most popular. No monthly fee on Smart Account. Open online from Canada.</li>
          <li><strong>TD Bank.</strong> Great if you&apos;re already a TD Canada customer. Branches across US East Coast.</li>
          <li><strong>BMO Harris.</strong> BMO&apos;s US banking arm. Easy cross-border setup.</li>
          <li><strong>RBC Bank.</strong> RBC&apos;s US presence, primarily in the Southeast.</li>
        </ul>
        <TipBox>
          Set your <strong>US mailing address as the primary address</strong> on this account. You&apos;ll use bank statements as proof of address when applying for credit cards.
        </TipBox>
      </>
    ),
    checklist: [
      { id: 's2-opened', label: 'Opened a US bank account' },
      { id: 's2-address', label: 'Set US address as primary on the account' },
      { id: 's2-online', label: 'Can access online banking' },
    ],
  },
  {
    title: 'Get Your First US Credit Card',
    time: '2-4 weeks',
    cost: 'Varies',
    content: (
      <>
        <p><strong>Amex Global Transfer</strong> lets you use your existing Canadian Amex relationship to get approved for a US Amex card, with no US credit history or ITIN required.</p>
        <p><strong>Requirements:</strong></p>
        <ul>
          <li>An existing Canadian Amex card, open for at least 3 months</li>
          <li>Your US mailing address</li>
          <li>Your US bank account</li>
        </ul>
        <p><strong>How to apply:</strong> Apply on the US Amex website and check the box saying you have an existing Amex card from another country. Or call the Amex Global Transfer line.</p>
        <WarningBox>
          <strong>Start with a personal card, not a business card.</strong> Business cards do <em>not</em> build personal credit history in the US. Your first card must be personal.
        </WarningBox>
        <p><strong>Best starter cards:</strong></p>
        <div className={s.recs}>
          <CardRec name="Amex Hilton Honors" note="no annual fee, great keeper" />
          <CardRec name="Amex Gold Card" note="strong earning" />
        </div>
        <TipBox>
          Your first US card will be your oldest account on your US credit report forever. Pick something you&apos;ll want to keep long-term. A no-annual-fee card like Hilton Honors is ideal.
        </TipBox>
      </>
    ),
    checklist: [
      { id: 's3-applied', label: 'Applied via Global Transfer (or Nova Credit)' },
      { id: 's3-verified', label: 'Verified identity and address with Amex' },
      { id: 's3-received', label: 'Received card at US address' },
    ],
  },
  {
    title: 'Apply for an ITIN',
    time: 'about 7 weeks (9 to 11 in tax season or from abroad)',
    cost: '$0-300',
    content: (
      <>
        <p>An <strong>Individual Taxpayer Identification Number (ITIN)</strong> is a tax ID from the IRS for people who aren&apos;t eligible for an SSN. You need this for Chase, Citi, Capital One, and most non-Amex issuers.</p>

        <h3 className={s.sub}>Method 1: Use a Tax Service (Hands-off)</h3>
        <p>Services like <strong>US Tax Resources</strong> handle the entire process for $150–300. They prepare your W-7 form and file a 1040-NR tax return on your behalf.</p>

        <h3 className={s.sub}>Method 2: DIY with Gambling Income (~$10)</h3>
        <TipBox>
          <strong>The DIY approach is straightforward.</strong> File a 1040-NR declaring $75 to $100 of US-source gambling income (from US online casinos, self-declared, no proof needed). You&apos;ll owe ~$9 in taxes, and this creates a valid reason for an ITIN.
        </TipBox>
        <p>You&apos;ll need: <strong>Form W-7</strong>, <strong>Form 1040-NR</strong>, <strong>Schedule 1</strong>, <strong>Schedule OI</strong>, your Canadian SIN, and a list of dates you were in the US during the tax year.</p>

        {/* ── Submission Paths ─────────────────── */}
        <h3 className={s.sub}>How to Submit</h3>
        <div className={s.paths}>
            <div className={`${s.box} ${s.boxRec}`}>
              <p className={s.boxTitle}>Path A: In-Person at IRS TAC <span className="chip chip-green">Recommended</span></p>
              <ul className={s.small}>
                <li>Call <strong>844-545-5640</strong> to book (up to 2 months ahead). Backup: <strong>267-941-1000</strong></li>
                <li>Bring passport + completed W-7, 1040-NR, Schedule 1, Schedule OI + copies</li>
                <li>20 min–1 hour. Clerk checks completeness only.</li>
              </ul>
            </div>
            <div className={s.box}>
              <p className={s.boxTitle}>Path B: Mail-In</p>
              <ul className={s.small}>
                <li>Mail to: IRS ITIN Operation, P.O. Box 149342, Austin, TX 78714-9342, USA</li>
                <li>Canada Post registered mail (~$15) for tracking</li>
                <li>Include either your <strong>original passport</strong> or a copy certified by Passport Canada (the issuing agency). A notarized copy is not enough.</li>
                <li>To skip mailing your passport, an IRS-authorized Certifying Acceptance Agent (CAA) or a Taxpayer Assistance Center can verify it in person, so you never send the original.</li>
              </ul>
              <WarningBox>If you mail the original passport, it can take up to 60 days to return. Some have been lost in transit. Have upcoming travel? Use Path A.</WarningBox>
            </div>
        </div>

        {/* ── Form Instructions ────────────────── */}
        <div className={s.forms}>
          <h3 className={s.sub}>Line-by-Line Form Instructions</h3>
          <p className={s.note}>Most fields are left blank. Click each form to expand.</p>

          <TipBox>
            <strong>Don&apos;t be intimidated!</strong> The key entries are your name, address, SIN, passport info, and a small gambling income number. That&apos;s it.
          </TipBox>

          <p className={s.note}>Form line numbers may change year to year, so verify against current forms from <a href="https://www.irs.gov/forms-instructions" target="_blank" rel="noopener noreferrer">irs.gov</a>.</p>

          {/* W-7 */}
          <details className="acc">
            <summary>
              <span className={s.fnum}>1</span>
              Form W-7, ITIN Application
            </summary>
            <div className={`accbody ${s.formBody}`}>
              <div className={s.key}>
                <strong>Top right:</strong> Check <span className="fld">&quot;Apply for a New ITIN&quot;</span>
              </div>
              <div className={s.key}>
                <strong>Reason:</strong> Check box <span className="fld">(b) filing a tax return</span>
              </div>
              <p><strong>Name:</strong> Must match passport exactly</p>
              <p><strong>Mailing address:</strong> Canadian address is fine</p>
              <p><strong>Foreign address:</strong> Write again even if same as mailing</p>
              <p><strong>Birth info:</strong> As on passport. Unrecognized birth country → use recognized one.</p>
              <div className={s.key}>
                <strong>6a:</strong> All countries of citizenship &nbsp;|&nbsp; <strong>6b:</strong> <span className="fld">Your Canadian SIN</span> (REQUIRED)
              </div>
              <p><strong>US Visa type:</strong> Leave blank</p>
              <div className={s.key}>
                <strong>ID Document:</strong> Check <span className="fld">&quot;Passport&quot;</span> → Canada, passport #, expiry. Leave &quot;date of entry&quot; blank.
              </div>
              <p><strong>6e:</strong> No &nbsp;|&nbsp; <strong>6f, 6g:</strong> Blank</p>
              <p><strong>Sign:</strong> In ink (not digital), date, phone (Canadian OK)</p>
              <p><strong>Acceptance Agent:</strong> Do not complete</p>
            </div>
          </details>

          {/* 1040-NR */}
          <details className="acc">
            <summary>
              <span className={s.fnum}>2</span>
              Form 1040-NR, Non-Resident Tax Return
            </summary>
            <div className={`accbody ${s.formBody}`}>
              <p><strong>Filing status:</strong> Single (or Married Filing Separately)</p>
              <p><strong>Name:</strong> Match W-7 exactly</p>
              <div className={s.key}>
                <strong>Identifying number:</strong> <span className="fld">Leave blank</span>, you&apos;re applying for one!
              </div>
              <p><strong>Address:</strong> Canadian mailing address</p>
              <p><strong>Virtual currency:</strong> Yes or No &nbsp;|&nbsp; <strong>Dependents:</strong> Blank</p>

              <div className={s.key}>
                <p className={s.linesTitle}>Income &amp; Tax Lines (e.g. $85 gambling income):</p>
                <div className={s.lines}>
                  {[
                    ['Line 8', '$85'], ['Line 9', '$85'], ['Line 11', '$85'], ['Line 15', '$85'],
                    ['Line 16', '$9'], ['Line 18', '$9'], ['Line 22', '$9'], ['Line 24', '$9'],
                    ['Line 26', '$0'], ['Line 32', '$0'], ['Line 33', '$0'], ['Line 37', '$9'],
                  ].map(([line, val]) => (
                    <div key={line} className={s.line}>
                      <span>{line}</span>
                      <span className={s.lineVal}>{val}</span>
                    </div>
                  ))}
                </div>
                <p className={s.note}>$9 tax from IRS Tax Table for $75–$99 income.</p>
              </div>

              <p><strong>Line 38:</strong> Blank (under $1,000 = no penalty)</p>
              <p><strong>Third Party Designee:</strong> &quot;No&quot;</p>
              <p><strong>Sign:</strong> In ink, date, occupation. PIN blank.</p>
              <p><strong>Paid Preparer:</strong> Blank (paid services must include PTIN)</p>
            </div>
          </details>

          {/* Schedule OI */}
          <details className="acc">
            <summary>
              <span className={s.fnum}>3</span>
              Schedule OI, Other Information
            </summary>
            <div className={`accbody ${s.formBody}`}>
              <p><strong>Name:</strong> At top of page</p>
              <div className={s.key}>
                <strong>A:</strong> Country of citizenship &nbsp;|&nbsp; <strong>B:</strong> <span className="fld">Canada</span>
              </div>
              <p><strong>C, D:</strong> &quot;No&quot;</p>
              <div className={s.key}>
                <strong>E:</strong> <span className="fld">&quot;Not present in U.S., no U.S. immigration status&quot;</span>
              </div>
              <p><strong>F:</strong> No</p>
              <p><strong>G:</strong> Dates entered/left USA (check <a href="https://i94.cbp.dhs.gov" target="_blank" rel="noopener noreferrer">i94.cbp.dhs.gov</a>). Blank if not in US.</p>
              <p><strong>H:</strong> Days in USA for each of 3 tax years</p>
              <WarningBox>
                <strong>Substantial Presence Test:</strong> If (current year × 1) + (prior year × ⅓) + (2 years ago × ⅙) ≥ 183, get professional help.
              </WarningBox>
              <p><strong>I, J, K:</strong> &quot;No&quot; &nbsp;|&nbsp; <strong>L, M:</strong> Blank</p>
            </div>
          </details>

          {/* Schedule 1 */}
          <details className="acc">
            <summary>
              <span className={s.fnum}>4</span>
              Schedule 1, Additional Income
            </summary>
            <div className={`accbody ${s.formBody}`}>
              <div className={s.key}>
                <strong>Line 8b:</strong> <span className="fld">Your gambling income (e.g. $85)</span>
              </div>
              <p><strong>Everything else:</strong> Blank or $0</p>
            </div>
          </details>
        </div>

        {/* Payment & After */}
        <div className={s.box}>
          <p className={s.boxTitle}>Payment (~$9 USD)</p>
          <p className={s.smallP}>Pay by check to &quot;United States Treasury&quot; or online at <a href="https://www.irs.gov/payments" target="_blank" rel="noopener noreferrer">irs.gov/payments</a>. Late penalty caps at ~$9 + minimal interest.</p>
        </div>

        <div className={s.box}>
          <p className={s.boxTitle}>After Submission</p>
          <ul className={s.small}>
            <li>Processing: about 7 weeks, or 9 to 11 weeks if you apply during tax season (mid-January to late April) or from outside the US, then you receive a letter with your 9-digit ITIN</li>
            <li><strong>Immediately</strong> link ITIN to your Amex US account</li>
            <li>Expires if unused for 3 years, so file periodically</li>
            <li>Lost letter? Call +1 267-941-1000 with name, address, birthdate</li>
          </ul>
        </div>

        <TipBox>
          You don&apos;t need to wait for your ITIN to start building credit, and that&apos;s why we get the Amex card first. Apply for your ITIN in parallel while your card builds history.
        </TipBox>

        <p className={s.note}>This guide is for informational purposes only and does not constitute tax advice. Talk to a cross-border tax professional for your specific situation, and always report your income accurately.</p>
      </>
    ),
    checklist: [
      { id: 's4-method', label: 'Chose application method (service vs DIY)' },
      { id: 's4-forms', label: 'Completed W-7, 1040-NR, Schedule 1, Schedule OI' },
      { id: 's4-submitted', label: 'Submitted forms (in-person or by mail)' },
      { id: 's4-received', label: 'Received ITIN letter' },
    ],
  },
  {
    title: 'Build Your Credit History',
    time: '3-12 months',
    cost: 'Varies',
    content: (
      <>
        <p>Now you play the waiting game. Your first Amex card is reporting to the US credit bureaus, and you need history before other issuers will approve you.</p>
        <ul>
          <li><strong>Get 1-2 more Amex personal cards</strong> in your first 3-6 months to build credit file depth.</li>
          <li><strong>Amex business cards don&apos;t count for Chase&apos;s 5/24 rule</strong>, so grab Business Platinum, Business Gold, etc. freely during this period.</li>
          <li><strong>Keep utilization at 5-10%</strong> on all cards. Low utilization signals responsible credit use.</li>
          <li><strong>Open a Chase checking account</strong> if you can visit a US branch, since having a banking relationship helps approval odds later.</li>
        </ul>
        <WarningBox>
          <strong>Critical:</strong> Once you receive your ITIN, call Amex immediately and link it to all your US accounts. Without this, Chase and other issuers may not be able to pull your credit.
        </WarningBox>
      </>
    ),
    checklist: [
      { id: 's5-itin', label: 'Linked ITIN to all Amex accounts' },
      { id: 's5-cards', label: 'Got 1-2 more Amex personal cards' },
      { id: 's5-util', label: 'Keeping utilization at 5-10%' },
    ],
  },
  {
    title: 'Apply for Chase Cards',
    time: 'Month 12-18',
    cost: 'Varies',
    content: (
      <>
        <p>Chase is the holy grail for churners. Ultimate Rewards points are incredibly flexible, and their hotel cards are best-in-class. But Chase is the pickiest issuer.</p>
        <p><strong>What Chase wants:</strong></p>
        <ul>
          <li>At least <strong>12-18 months</strong> of US credit history</li>
          <li>A credit score above ~700</li>
          <li>Ideally, a Chase banking relationship</li>
        </ul>
        <h3 className={s.sub}>The 5/24 Rule</h3>
        <p>Chase will deny you if you&apos;ve opened <strong>5 or more personal credit cards</strong> across all issuers in the past 24 months. That&apos;s why we get Amex business cards first, since they don&apos;t count.</p>
        <p><strong>Recommended first Chase cards:</strong></p>
        <div className={s.recs}>
          <CardRec name="Chase Sapphire Preferred" note="great starter" />
          <CardRec name="Ink Business Preferred" note="doesn't count for 5/24" />
          <CardRec name="Chase Aeroplan Card" note="useful for Canadians" />
        </div>
        <TipBox>
          If you can visit a US Chase branch, apply in-person. Chase sometimes requires document verification for applicants without an SSN. Being in-branch makes this much smoother.
        </TipBox>
      </>
    ),
    checklist: [
      { id: 's6-history', label: '12+ months of US credit history' },
      { id: 's6-524', label: 'Under 5/24 (fewer than 5 personal cards in 24 months)' },
      { id: 's6-applied', label: 'Applied for first Chase card' },
    ],
  },
  {
    title: 'Expand to Other Issuers',
    time: '18+ months',
    cost: 'Varies',
    content: (
      <>
        <p>Once you have Chase cards and solid credit history, the world opens up:</p>
        <ul>
          <li><strong>Capital One:</strong> Typically wants ~3 years of history. Max 1 application per 6 months. Worth it for the Venture X.</li>
          <li><strong>Citi:</strong> The Strata Premier is excellent. Citi ThankYou points transfer to Air Canada Aeroplan and more.</li>
          <li><strong>Bank of America:</strong> Alaska Airlines card is a fan favourite. Apply in-branch with ITIN, since the online system doesn&apos;t always handle ITINs well.</li>
        </ul>
        <TipBox>
          Keep building and maintaining your credit. Pay all balances in full, keep accounts open, and space out applications. A mature profile earns you better approval odds and higher limits.
        </TipBox>
      </>
    ),
    checklist: [
      { id: 's7-cap1', label: 'Building toward Capital One eligibility' },
      { id: 's7-citi', label: 'Exploring Citi / Bank of America options' },
      { id: 's7-fx', label: 'Managing FX payments efficiently (Wise, VBCE, etc.)' },
    ],
  },
];


const TOTAL_STEPS = STEPS.length;
const BASE = '/guides/us-cards-for-canadians/interactive';

// ── Checklist Hook (localStorage) ────────────────────────

function useChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('us-cards-guide-checklist');
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = useCallback((id: string) => {
    setChecked(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try { localStorage.setItem('us-cards-guide-checklist', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return { checked, toggle };
}

// ── URL sync (null-rendering leaf, so the page itself prerenders) ──

function StepFromUrl({ onStep }: { onStep: (step: number) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const param = searchParams.get('step');
    if (param === 'summary') {
      onStep(TOTAL_STEPS + 1);
    } else if (param) {
      const n = parseInt(param, 10);
      if (n >= 1 && n <= TOTAL_STEPS) onStep(n);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

// ── Step Indicator ───────────────────────────────────────

function StepIndicator({ current, onNavigate }: { current: number; onNavigate: (step: number) => void }) {
  return (
    <ol className={s.dots}>
      {STEPS.map((step, i) => {
        const stepNum = i + 1;
        const isCurrent = current === stepNum;
        const isCompleted = current > stepNum;
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => onNavigate(stepNum)}
              className={`${s.dot} ${isCurrent ? s.dotOn : isCompleted ? s.dotDone : ''}`}
              aria-label={`Go to step ${stepNum}: ${step.title}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {stepNum}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

// ── Checklist ────────────────────────────────────────────

function CheckItem({ item, checked, toggle }: { item: ChecklistItem; checked: Record<string, boolean>; toggle: (id: string) => void }) {
  return (
    <label className={`${s.check} ${checked[item.id] ? s.checkOn : ''}`}>
      <input type="checkbox" checked={!!checked[item.id]} onChange={() => toggle(item.id)} />
      <span>{item.label}</span>
    </label>
  );
}

function Checklist({ items, checked, toggle }: { items: ChecklistItem[]; checked: Record<string, boolean>; toggle: (id: string) => void }) {
  return (
    <fieldset className={s.checklist}>
      <legend className={s.checklistTitle}>Checklist</legend>
      {items.map(item => <CheckItem key={item.id} item={item} checked={checked} toggle={toggle} />)}
    </fieldset>
  );
}

// ── Intro Screen ─────────────────────────────────────────

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className={s.intro}>
      <ol className={s.overview}>
        {STEPS.map((step, i) => (
          <li key={i}>
            <span className={s.ovNum}>{i + 1}</span>
            <span className={s.ovTitle}>{step.title}</span>
            {step.time && <span className={s.ovMeta}>{step.time}</span>}
          </li>
        ))}
      </ol>

      <div className={s.introCta}>
        <button type="button" onClick={onStart} className="btn btn-primary btn-lg">
          Start Guide &rarr;
        </button>
        <span className={s.hint}>Your checklist saves in this browser as you go.</span>
      </div>
    </div>
  );
}

// ── Summary Screen ───────────────────────────────────────

function SummaryScreen({ checked, toggle, onBack }: { checked: Record<string, boolean>; toggle: (id: string) => void; onBack: () => void }) {
  const allItems = STEPS.flatMap((step, i) =>
    step.checklist.map(item => ({ ...item, stepNum: i + 1, stepTitle: step.title }))
  );
  const completedCount = allItems.filter(item => checked[item.id]).length;
  const pct = allItems.length > 0 ? (completedCount / allItems.length) * 100 : 0;

  return (
    <div>
      <p className={s.kicker}>Summary</p>
      <h2 className={s.stepTitle}>Your Master Checklist</h2>
      <p className={s.count}>
        <span className="num">{completedCount}</span> of <span className="num">{allItems.length}</span> tasks completed
      </p>
      <div className={s.bar} role="progressbar" aria-valuemin={0} aria-valuemax={allItems.length} aria-valuenow={completedCount} aria-label="Tasks completed">
        <div className={s.barFill} style={{ width: `${pct}%` }} />
      </div>

      <div className={s.sumList}>
        {STEPS.map((step, i) => (
          <section key={i} className={s.sumStep}>
            <h3 className={s.sumHead}>
              <span className={s.ovNum}>{i + 1}</span>
              {step.title}
            </h3>
            <div className={s.sumItems}>
              {step.checklist.map(item => <CheckItem key={item.id} item={item} checked={checked} toggle={toggle} />)}
            </div>
          </section>
        ))}
      </div>

      {/* Recommended Timeline */}
      <section className={s.timeline}>
        <h3 className={s.blockTitle}>Recommended First-Year Timeline</h3>
        {[
          { month: 'Month 0', text: 'Get US address + bank account → Apply for first Amex via Global Transfer' },
          { month: 'Month 1-2', text: 'Submit ITIN application (process in parallel)' },
          { month: 'Month 3-6', text: 'Get 1-2 more Amex personal cards + business cards freely' },
          { month: 'Month 4', text: 'Receive ITIN → Link to all Amex accounts immediately' },
          { month: 'Month 12-18', text: 'Apply for Chase Sapphire Preferred + Ink Business Preferred' },
          { month: 'Month 18+', text: 'Expand to Capital One, Citi, Bank of America' },
        ].map(item => (
          <div key={item.month} className={s.tlRow}>
            <span className={s.tlMonth}>{item.month}</span>
            <span className={s.tlText}>{item.text}</span>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <h3 className={s.blockTitle}>Ready to Start?</h3>
        <p className={s.ctaText}>Browse our US cards database to find the best current welcome bonuses.</p>
        <div className="cta-row">
          <Link href="/cards?country=US&sort=value" className="cd-apply primary">Browse US Cards &rarr;</Link>
          <Link href="/cards?country=CA" className="cd-apply">Canadian Cards &rarr;</Link>
        </div>
      </section>

      <div className={s.nav}>
        <button type="button" onClick={onBack} className="btn">&larr; Back to Step 7</button>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────

export default function USCardsGuidePage() {
  return <USCardsGuideWizard />;
}

function USCardsGuideWizard() {
  const router = useRouter();
  const { checked, toggle } = useChecklist();
  const focusRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  // step: 0 = intro, 1-7 = steps, 8 = summary
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [animating, setAnimating] = useState(false);

  const navigateTo = useCallback((step: number) => {
    if (animating) return;
    setDirection(step > currentStep ? 'right' : 'left');
    setAnimating(true);

    // Update URL
    if (step === 0) router.replace(BASE, { scroll: false });
    else if (step > TOTAL_STEPS) router.replace(`${BASE}?step=summary`, { scroll: false });
    else router.replace(`${BASE}?step=${step}`, { scroll: false });

    setTimeout(() => {
      moved.current = true;
      setCurrentStep(step);
      setAnimating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  }, [currentStep, animating, router]);

  // Move keyboard focus to the new screen after a user-driven step change.
  useEffect(() => {
    if (moved.current) focusRef.current?.focus({ preventScroll: true });
  }, [currentStep]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentStep < TOTAL_STEPS + 1) navigateTo(currentStep + 1);
      if (e.key === 'ArrowLeft' && currentStep > 0) navigateTo(currentStep - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentStep, navigateTo]);

  const isIntro = currentStep === 0;
  const isSummary = currentStep > TOTAL_STEPS;
  const stepData = !isIntro && !isSummary ? STEPS[currentStep - 1] : null;
  const anim = animating ? (direction === 'right' ? s.outRight : s.outLeft) : '';

  return (
    <div className="app norail tone-cards">
      <main>
        <div className={`doc ${s.wiz}`}>
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span className="sep" aria-hidden="true">/</span>
            <Link href="/cards">Cards</Link><span className="sep" aria-hidden="true">/</span>
            <Link href="/guides/us-cards-for-canadians">US cards guide</Link><span className="sep" aria-hidden="true">/</span>
            <span className="cur" aria-current="page">Interactive</span>
          </nav>

          <div className="head">
            <span className="eyebrow">Interactive guide</span>
            <h1 className={isIntro ? s.h1 : s.h1Small}>The Complete Guide to US Credit Cards for Canadians</h1>
          </div>
          {isIntro && (
            <>
              <p className="lede">
                Everything you need to know about getting an ITIN, building US credit, and accessing the world&apos;s best rewards cards, in 7 simple steps.
              </p>
              <div className="docmeta">
                <span className="gd">7 STEPS</span><span className="sep">·</span>
                <span>Last updated February 2026</span>
              </div>
            </>
          )}

          <Link href="/guides/us-cards-for-canadians" className={s.toggle}>
            <span><strong>Prefer to read everything at once?</strong> View the full article</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>

          {/* Progress bar (hidden on intro) */}
          {!isIntro && (
            <div className={s.progress}>
              <div className={s.progRow}>
                <span className={s.progStep}>
                  {isSummary ? 'Summary' : `Step ${currentStep} of ${TOTAL_STEPS}`}
                </span>
                <span className={s.progName}>
                  {isSummary ? 'Complete' : stepData?.title}
                </span>
              </div>
              <div className={s.bar}>
                <div className={s.barFill} style={{ width: `${isSummary ? 100 : (currentStep / TOTAL_STEPS) * 100}%` }} />
              </div>
              <StepIndicator current={currentStep} onNavigate={navigateTo} />
            </div>
          )}

          {/* Content with slide animation */}
          <div ref={focusRef} tabIndex={-1} className={`${s.stage} ${anim}`}>
            {isIntro && <IntroScreen onStart={() => navigateTo(1)} />}

            {stepData && (
              <div>
                <p className={s.kicker}>Step {currentStep}</p>
                <h2 className={s.stepTitle}>{stepData.title}</h2>
                {(stepData.time || stepData.cost) && (
                  <dl className={s.facts}>
                    {stepData.time && (<div><dt>Time</dt><dd>{stepData.time}</dd></div>)}
                    {stepData.cost && (<div><dt>Cost</dt><dd>{stepData.cost}</dd></div>)}
                  </dl>
                )}

                <div className={s.content}>
                  {stepData.content}
                </div>

                <Checklist items={stepData.checklist} checked={checked} toggle={toggle} />

                <div className={s.nav}>
                  <button type="button" onClick={() => navigateTo(currentStep - 1)} className="btn">
                    &larr; {currentStep === 1 ? 'Overview' : 'Previous'}
                  </button>
                  <button type="button" onClick={() => navigateTo(currentStep + 1)} className="btn btn-primary">
                    {currentStep === TOTAL_STEPS ? 'View Summary' : 'Next Step'} &rarr;
                  </button>
                </div>
              </div>
            )}

            {isSummary && (
              <SummaryScreen checked={checked} toggle={toggle} onBack={() => navigateTo(TOTAL_STEPS)} />
            )}
          </div>
        </div>

        <Suspense fallback={null}>
          <StepFromUrl onStep={setCurrentStep} />
        </Suspense>

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'The Complete Guide to US Credit Cards for Canadians',
              description: 'Step-by-step guide to getting an ITIN, building US credit, and accessing the best US rewards cards as a Canadian.',
              datePublished: '2026-02-22',
              dateModified: '2026-02-22',
              author: { '@type': 'Organization', name: 'FinTerminal' },
              publisher: { '@type': 'Organization', name: 'FinTerminal' },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finterminal.ca/' },
                { '@type': 'ListItem', position: 2, name: 'Cards', item: 'https://www.finterminal.ca/cards' },
                { '@type': 'ListItem', position: 3, name: 'US cards guide', item: 'https://www.finterminal.ca/guides/us-cards-for-canadians' },
                { '@type': 'ListItem', position: 4, name: 'Interactive', item: 'https://www.finterminal.ca/guides/us-cards-for-canadians/interactive' },
              ],
            }),
          }}
        />
      </main>
    </div>
  );
}
