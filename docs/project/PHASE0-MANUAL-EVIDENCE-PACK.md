# Phase 0 Manual Evidence Pack

**Purpose:** Collect the owner decisions and external evidence that cannot safely be inferred or fabricated by an assistant. Complete this pack before the PROJECT READY gate can pass.

**Status:** Template; not yet completed or approved.  
**Prepared:** 2026-10-13  
**Repository:** `s1xte3n/studypath-sa`

> Do not paste passwords, access tokens, subscription IDs, tenant IDs, learner data, billing account details, or other secrets into this file or GitHub. Record only the minimum non-sensitive result and, where necessary, keep redacted evidence in a secure location.

## 1. Owner decisions — explicit approval required

For each row, select exactly one of **ACCEPT** or **REJECT**, add the date, and optionally record a short reason. Leaving a row blank means **PENDING**. These are proposed directions, not decisions until the owner completes this section.

| ID | Proposed direction | Decision (ACCEPT / REJECT / PENDING) | Date | Notes / reason |
|---|---|---|---|---|
| COST-01 | Target a maximum operating cost of R100/month. Do not deploy until current subscription resources, billing, credits, permissions and expected all-in costs have been checked. Budgets/alerts are not hard spending caps. | Accept | | |
| DATA-01 | Start with a deliberately small, version-controlled, read-only pilot catalogue: two UJ undergraduate IT pathways only. Do not imply national coverage. Expand only after the pilot is validated. | Accept | | |
| ELIGIBILITY-01 | Use deterministic, explainable minimum-requirement screening. Return `UNKNOWN` when requirements or applicant facts are missing, ambiguous, stale or unsupported. Never guarantee admission. | Accept | | |
| PRIVACY-01 | For the hackathon MVP, use synthetic profiles only; no real learner personal information, account creation, uploads/transcript extraction, AI chat, profile persistence, server-side profile writes, or analytics that capture profile values. Keep profile state in memory and clear on reset/refresh. | Accept | | |
| RELEASE-01 | Use a static-first React/Vite app and consider Azure Static Web Apps Free only after cost/access checks. Defer separately billed services and custom domain unless separately approved and affordable. This is a proposal, not a verified R0 quote. | Accept | | |
| OWNER-01 | The owner temporarily performs all roles. Record that there is no independent reviewer or backup; use explicit self-review checklists and seek an external reviewer if available. | Accept | | |

**Owner approval statement (complete manually):**

I have reviewed the six proposals above. My decisions in the table are intentional and represent the current project direction. I understand that accepting a proposal does not prove implementation, compliance, cost feasibility, catalogue correctness, or deployment readiness.

- Owner identifier / GitHub handle (no legal name required): ____________________
- Date (YYYY-MM-DD): ____________________
- Approval status: **APPROVED** (circle one)
- Any rejected item and replacement direction: __________________________________

Commit the completed record only if you are comfortable making the decision record visible in this repository. Alternatively, keep the signed/dated approval in a secure project record and add a non-sensitive reference here.

## 2. Azure access, resources and cost evidence — owner must inspect manually

Do not provision, delete, resize, or modify resources as part of this evidence-gathering step.

### In Azure Portal

- [ ] Sign in to the correct Azure account and subscription.
- [ ] Confirm the account can view the subscription and its resource list.
- [ ] Open **Subscriptions** and confirm the subscription status is active.
- [ ] Open **All resources** and record existing resources relevant to StudyPath SA.
- [ ] Open **Cost Management + Billing** and inspect current month-to-date spend, prior spend, credits and any existing budgets.
- [ ] Check whether any resources already incur recurring charges, including resources outside this repository/project.
- [ ] Confirm the intended deployment region and whether any required service is unavailable or chargeable there.
- [ ] If considering Static Web Apps Free, verify the actual plan, quotas, storage/bandwidth constraints and suitability for the intended app. Free tier does not establish an all-in R0 cost.
- [ ] Do not treat a budget or alert as a hard spending stop.
- [ ] Capture redacted screenshots or export evidence to a secure location. Never commit subscription IDs, tenant IDs, billing identifiers or sensitive account details.

**Record only non-sensitive results here:**

- Subscription status visible and active? **YES**
- Existing project resources found? **NO** — short resource types/count only: we going to create these as we go
- Current monthly spend/commitments reviewed? **NO**
- Credits/benefits and expiry reviewed? **UNKNOWN**
- Expected total incremental cost within R100/month? **YES**
- Evidence date: ____________________
- Secure evidence reference (no secrets): ____________________

**Stop condition:** If access, billing, existing resources, recurring costs or all-in cost cannot be verified, deployment remains blocked.

## 3. Catalogue validation — official-source evidence required

The initial proposal names these candidates, but the current summary does **not** establish that all admission conditions have been fully validated. Check the current official pages and relevant prospectus before publishing results.

1. UJ BSc in Information Technology: https://www.uj.ac.za/university-courses/bsc-in-information-technology/
2. UJ Diploma in Business Information Technology: https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/
3. UJ undergraduate application information: https://www.uj.ac.za/admission-aid/undergraduate/important-information-before-you-apply/

For each programme, verify and record:

- [ ] Current programme name and qualification type.
- [ ] Programme code, campus, attendance mode and duration.
- [ ] Current application opening/closing date and time; note applicant category and academic year.
- [ ] APS formula and any subject-specific APS treatment.
- [ ] Required school-leaving qualification / applicant category.
- [ ] Exact subject requirements, levels/percentages, subject equivalencies and exclusions.
- [ ] Additional selection rules, portfolio/test/interview requirements, capacity restrictions, or other conditions.
- [ ] Official source URL, date checked, academic-year/catalogue version and reviewer.
- [ ] A second check against the current official prospectus or admissions rules where available.
- [ ] Fees, residence, transport and other costs are either verified from official sources or explicitly shown as “not verified / not provided”; do not estimate without a label and basis.
- [ ] Funding options and deadlines are linked to official providers and are not described as guaranteed.
- [ ] Unsupported or ambiguous cases produce `UNKNOWN`, not an assumed pass/fail.

### Programme validation record

| Field | BSc Information Technology | Diploma in Business Information Technology |
|---|---|---|
| Academic year / catalogue version | | |
| Official source(s) checked | | |
| Date checked (YYYY-MM-DD) | | |
| APS calculation verified? | | |
| Full subject rules verified? | | |
| Applicant categories and equivalencies verified? | | |
| Additional selection rules checked? | | |
| Fees/cost information verified or clearly unavailable? | | |
| Funding/deadline sources verified? | | |
| Reviewer / second check | | |
| Validation outcome (PASS / FAIL / UNKNOWN) | | |
| Open gaps and follow-up owner | | |

**Stop condition:** Do not implement a confident eligibility decision for a programme while material admission rules are incomplete. Keep the status `UNKNOWN` where necessary.

## 4. Privacy and demo boundary — confirm the actual build matches

This is a project risk-control proposal, not a legal opinion or POPIA certification. Do not use real learner data until the required privacy/legal review is complete.

- [ ] The demo uses synthetic example marks/subjects only.
- [ ] No names, ID numbers, contact details, school names, addresses, accounts or real learner records are requested.
- [ ] No upload, transcript extraction, AI chat, or free-text field is present in the demo.
- [ ] Profile state is in browser memory only and clears on reset/refresh.
- [ ] No profile values are written to local storage, cookies, URLs, server APIs, application logs, analytics, session replay or telemetry.
- [ ] The catalogue is read-only and contains no personal information.
- [ ] Reset/clear behaviour is visible, keyboard accessible and tested.
- [ ] HTTPS is enabled for any hosted demo; no secrets are present in client code or repository history.
- [ ] Hosting/platform logs and retention have been reviewed; any remaining metadata is documented.
- [ ] Privacy notice explains the demo-data boundary, limitations and contact/feedback route without claiming legal compliance.
- [ ] Accessibility and privacy smoke tests are recorded.
- [ ] Any real-learner-data release remains blocked until appropriate review and safeguards are approved.

**Evidence record**

- Commit/PR reviewed: ____________________
- Date reviewed: ____________________
- Checks run and results: ____________________
- Remaining gaps / risk owner: ____________________
- Reviewer: ____________________

## 5. Hackathon eligibility and submission evidence — verify with organiser

Do not infer that a profile or team is registered merely because the owner recalls completing it. Check the organiser/Sonke portal directly and preserve non-sensitive proof.

- [ ] Confirm the correct event and team profile are visible and complete.
- [ ] Confirm the event permits an application that is being built before the event and clarify any “app-only” / static-site restrictions.
- [ ] Confirm the final submission deadline, timezone and required submission method directly with the organiser.
- [ ] Confirm the required presentation deck format/slide limit and content.
- [ ] Confirm demo video duration limit and how the video must be linked/submitted.
- [ ] Confirm SSDLC and Lean Business Canvas requirements and accepted formats.
- [ ] Confirm whether a public demo URL, repository link, team member details or other deliverables are required.
- [ ] Store screenshots/emails in a secure project location and record the date/source here.

**Evidence record**

- Portal/event checked: ____________________
- Team profile visible and complete? **YES**
- App eligibility confirmed? **YES**
- Deadline, timezone and submission route confirmed: It's on the document
- Deliverables confirmed: ____________________
- Confirmation source/date: ____________________
- Unresolved organiser questions: ____________________

## 6. Accountability and review

- [ ] Record that the project is currently operated by one person and that no independent reviewer/back-up is confirmed.
- [ ] Identify a possible external reviewer/mentor if available; do not list someone without their agreement.
- [ ] Before a release, complete a self-review of requirements, matching rules, privacy, accessibility, dependency/security checks, tests, deployment and rollback.
- [ ] Keep test and deployment evidence distinct from a code review or a written checklist.

Reviewer / mentor (if confirmed): ____________________  
Agreed role and date: ____________________  
If none, record: **No independent reviewer currently confirmed.**

## 7. Phase 0 gate decision

The gate is **not passed** until the following are evidenced:

- [ ] The six owner decisions above are explicitly recorded and contradictions in `DECISIONS.md`, `OPEN-QUESTIONS.md` and the resolution proposal are reconciled.
- [ ] Azure subscription access, current resources, billing/credits and the R100/month cost constraint have been reviewed.
- [ ] Pilot catalogue admission rules are validated, with material unknowns explicitly handled.
- [ ] The synthetic-only privacy boundary is approved and can be verified in the actual implementation.
- [ ] Hackathon eligibility, team/profile status, deadline and submission deliverables are confirmed.
- [ ] Owner/independent-review limitations and residual risks are documented.
- [ ] `PROJECT-STATUS.md`, `DECISIONS.md`, `OPEN-QUESTIONS.md` and `ARTIFACT-INDEX.md` agree with this evidence.
- [ ] Gate decision and date are recorded.

**Gate result:** PASSED (select only after reviewing evidence)  
**Decision date:** ____________________  
**Evidence references:** ____________________  
**Outstanding blockers:** ____________________

Passing Phase 0 authorizes the next planning gate; it does not by itself authorize deployment or prove the app is implemented, tested, compliant, or release-ready.
