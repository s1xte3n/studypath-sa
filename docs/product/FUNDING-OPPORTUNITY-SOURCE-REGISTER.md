# StudyPath SA — Funding Opportunity Source Register

**Status:** Phase 2 research draft; no record is approved for learner-facing publication.  
**Research date:** 2026-10-14  
**Related gap:** GAP-005 (P0), REQ-FUND-001  
**Safety boundary:** This register records official-source leads only. It does not determine an individual's funding eligibility, collect household income/identity data, or submit applications. Funding providers remain authoritative.

## 1. Publication rules

A record may be published only after a curator verifies the active cycle, deadline/time zone where stated, full criteria and exclusions, coverage, document checklist, application route, source provenance, freshness, and sign-off. A page being live or an application portal being accessible is not enough. Expired, conflicting, incomplete, or unreviewed records must not be presented as currently open.

StudyPath SA must not calculate eligibility using sensitive financial details. Where household income, SASSA status, disability, citizenship/residency, or other sensitive/unsupported criteria affect the provider's decision, show the provider's published criteria and direct learners to the official provider. The app must not ask learners to enter income, identity numbers, bank details, disability/medical details, or upload supporting documents.

## 2. Preliminary source register

| ID | Opportunity / provider | Applicable cycle and observed status | Published criteria / scope observed | Deadline | Provenance and disposition |
|---|---|---|---|---|---|
| `FUND-NSFAS-BURSARY-2027` | NSFAS bursary | 2027; official NSFAS application page reports open | Public universities and TVET context; official page describes South African citizens/permanent residents and published household-income/SASSA criteria. These are sensitive criteria: do not use for app-side eligibility decisions. | **CONFLICT — do not publish deadline until rechecked.** NSFAS operational application page reports 31 Oct 2026; a 18 Sep 2026 ministerial statement on gov.za reports 18 Nov 2026, while a 22 Sep 2026 government update reports 31 Oct 2026. | [NSFAS application page](https://www.nsfas.org.za/content/how-to-apply.html); [DHET Minister's 2027 cycle statement](https://www.gov.za/news/speeches/minister-buti-manamela-launch-nsfas-2027-application-cycle-18-sep-2026); [government update, 22 Sep 2026](https://www.gov.za/news/media-statements/nsfas-records-over-51000-applications-within-four-days-opening-2027). Record the contradiction and obtain direct provider confirmation before learner-facing deadline publication. |
| `FUND-NSFAS-LOAN-2027` | NSFAS student loan / missing-middle route | 2027; scheme described by NSFAS and DHET; operational application/deadline and final terms require direct verification | Official NSFAS page describes a student-loan income band and different coverage from the bursary. Do not reproduce an income-based eligibility decision in StudyPath SA. Repayment applies; exact 2027 loan terms and availability need verification. | Not independently established for this distinct loan product; do not inherit the bursary deadline without official confirmation. | [NSFAS application/funding page](https://www.nsfas.org.za/content/how-to-apply.html); [DHET Minister's 2027 cycle statement](https://www.gov.za/news/speeches/minister-buti-manamela-launch-nsfas-2027-application-cycle-18-sep-2026). **Research lead only** pending product-specific official terms, deadline and curator sign-off. |
| `FUND-FUNZA-LUSHAKA-2027` | Funza Lushaka Bursary | 2027; official scheme homepage states new applications open 1 Oct 2026 | Teaching bursary; first-time applicants must be 30 or younger according to the official homepage. Subject/qualification requirements, conditions, coverage, service obligations and full checklist still require verification against official 2027 guidance. | 31 Jan 2027 for new applications; 30 Nov 2026 for returning bursars, as displayed on official homepage. Confirm timezone and cycle before publication. | [Official Funza Lushaka homepage](https://www.funzalushaka.doe.gov.za/Home/). Current-cycle lead, **not publication-ready** until full rules, coverage and curator sign-off are captured. |
| `FUND-GRDM-2027` | Garden Route District Municipality further-study financial assistance | 2027; official municipal notice says applications opened 1 Sep 2026 | Grade 12/current or past Grade 12 and current tertiary students are mentioned; full-time study at SAQA-accredited tertiary/TVET institutions; applicant's parents must permanently reside within Garden Route municipal area. Published application pack asks for income/residential proof; StudyPath SA must not collect or assess those documents. Verify complete criteria and amount/coverage. | 31 Oct 2026, per official municipal notice. Timezone not stated. | [Official Garden Route District Municipality notice](https://www.gardenroute.gov.za/2026/09/04/04-september-2026-opportunities-financial-assistance-towards-further-studies-2027/). Geographically restricted lead; publish only with explicit region restriction and full reviewed rules. |
| `FUND-NC-PREMIER-2027` | Northern Cape Premier's Bursary Programme | 2027; official provincial page reports applications invited | RSA citizens, unemployed youth aged 18–30 from the Northern Cape, full-time undergraduate/first qualification at an accredited South African HEI. Published awards vary by combined household-income band; do not calculate or request that sensitive information. Verify application route, full conditions and coverage. | 31 Oct 2026, per official provincial page. Timezone not stated. | [Official Northern Cape provincial bursary page](https://www.northerncape.gov.za/bursary/). Region- and sensitivity-restricted lead; do not imply nationwide availability or determine eligibility. |

## 3. Cycle conflict and freshness handling

- **NSFAS deadline conflict is material.** The official NSFAS application page and a 22 September government update report 31 October 2026; a 18 September ministerial statement reports 18 November 2026. This register intentionally does not resolve the contradiction by guessing. Recheck the live official portal and obtain provider clarification; then record the source, timestamp, evidence and reviewer decision.
- The NSFAS loan route is not automatically the same opportunity as the NSFAS bursary. Do not assume identical deadlines, coverage, or terms.
- Funza Lushaka is restricted to teaching and has a distinct application workflow. Verify the full 2027 rulebook before matching.
- Garden Route and Northern Cape opportunities have residency/location restrictions. Do not show them as generally available to all South African learners.
- Do not present expired records (for example, the DFFE 2027 bursary whose published deadline was 2 October 2026) as open on the research date. Keep expired opportunities only if the product needs a clearly labelled historical record.

## 4. Minimum record schema before publication

Every approved record must contain:

- stable opportunity ID, provider and exact opportunity title;
- opportunity type (bursary, scholarship, loan or other, only as stated by provider);
- applicable cycle and explicit status (`OPEN`, `CLOSED`, `UPCOMING`, `CONFLICTED`, `UNKNOWN`, `EXPIRED`);
- official eligibility criteria, exclusions and conditions in plain language, with sensitive criteria flagged as provider-assessed and not app-calculated;
- study level, fields/qualifications, institution/region restrictions only where the source states them;
- coverage/amount and payment periodicity only when explicitly stated;
- deadline exactly as published, timezone only if stated, and unresolved date conflicts;
- application steps and official application URL;
- document checklist metadata only; no uploads or document collection in StudyPath SA;
- source title, publisher, URL, relevant section/page, source/cycle date, checked-at date, catalogue version and curator sign-off;
- verification/review-by date, expiry behavior and learner-facing limitations.

## 5. Planned tests

- `T-FUND-001`: expired opportunity is never labelled `OPEN`.
- `T-FUND-002`: conflicting deadline sources force `CONFLICTED`/non-publication until resolved.
- `T-FUND-003`: a loan is not presented as a bursary or as non-repayable.
- `T-FUND-004`: region/field/study-level restrictions are shown without broadening the opportunity's scope.
- `T-FUND-005`: sensitive income, identity, disability, banking and document data are not requested or sent to the catalogue API/telemetry.
- `T-FUND-006`: missing amount/coverage is shown as not specified, never estimated.
- `T-FUND-007`: deadline/time zone are not inferred when the official source omits them.
- `T-FUND-008`: no record is published without cycle, provenance, freshness and curator sign-off.
- `T-FUND-009`: provider link and next steps are official and usable.
- `T-FUND-010`: stale or unavailable funding catalogue produces a recoverable UI state and never fabricated results.

These tests are planned only; no executable tests have been created or run.

## 6. Gate assessment

Current research yields four potentially relevant opportunity leads, but **zero publication-ready funding records**. The NSFAS deadline conflict alone prevents safe publication of its deadline, and other records still need full criteria/coverage verification and curator sign-off. The 3–5 verified-record requirement is therefore unmet. GAP-005 remains P0/open and `REQUIREMENTS READY` remains not passed.

**Decision requested:** approve the publication rules and record schema. Do not approve individual opportunity records until the evidence and review checklist is complete.
