# Phase 0 Manual Evidence Pack

**Purpose:** Record owner decisions, account-specific attestations and readiness evidence. Current gate status and public-source findings are summarised in `PHASE0-ONLINE-EVIDENCE.md`.

**Status:** Owner approved the six decisions and reconfirmed the Phase 0 direction on 2026-10-13. Account-specific Azure checks are owner-attested. Public UJ/Azure sources and the supplied hackathon programme are documented in `PHASE0-ONLINE-EVIDENCE.md`. PROJECT READY is PASSED for PRD/planning only; build, privacy verification, deployment and release remain downstream gates.  
**Prepared:** 2026-10-13  
**Repository:** `s1xte3n/studypath-sa`

> Do not paste passwords, access tokens, subscription IDs, tenant IDs, learner data, billing account details, or other secrets into this file or GitHub. Record only the minimum non-sensitive result and, where necessary, keep redacted evidence in a secure location.

## 1. Owner decisions — explicit approval required

For each row, select exactly one of **ACCEPT** or **REJECT**, add the date, and optionally record a short reason. Leaving a row blank means **PENDING**. These are proposed directions, not decisions until the owner completes this section.

| ID | Proposed direction | Decision (ACCEPT / REJECT / PENDING) | Date | Notes / reason |
|---|---|---|---|---|
| COST-01 | Target a maximum operating cost of R100/month. Do not deploy until current subscription resources, billing, commitments, permissions and expected all-in costs have been checked. Do not rely on the expired 12-month Azure free-account offer; no credits will be used. Budgets/alerts are not hard spending caps. | Accept | 2026-10-13 | Owner reports no StudyPath resources provisioned (current project spend R0), no existing project resource costs, and no credits will be used. Static Web Apps Free remains acceptable as the hosting plan on the existing subscription. |
| DATA-01 | Start with a deliberately small, version-controlled, read-only pilot catalogue: two UJ undergraduate IT pathways only. Do not imply national coverage. Expand only after the pilot is validated. | Accept | 2026-10-13 | Owner approval reconfirmed in project conversation. |
| ELIGIBILITY-01 | Use deterministic, explainable minimum-requirement screening. Return `UNKNOWN` when requirements or applicant facts are missing, ambiguous, stale or unsupported. Never guarantee admission. | Accept | 2026-10-13 | Owner approval reconfirmed in project conversation. |
| PRIVACY-01 | For the hackathon MVP, use synthetic profiles only; no real learner personal information, account creation, uploads/transcript extraction, AI chat, profile persistence, server-side profile writes, or analytics that capture profile values. Keep profile state in memory and clear on reset/refresh. | Accept | 2026-10-13 | Owner approval reconfirmed in project conversation. |
| RELEASE-01 | Use a static-first React/Vite app and Azure Static Web Apps Free on the existing subscription, subject to cost/access checks. Do not rely on the expired 12-month Azure free-account offer. Defer separately billed services and custom domain unless separately approved and affordable. This is a direction, not a verified all-in R0 quote. | Accept | 2026-10-13 | Owner explicitly confirmed Static Web Apps Free is acceptable while the expired account offer will not be relied on. |
| OWNER-01 | The owner temporarily performs all roles. Record that there is no independent reviewer or backup; use explicit self-review checklists and seek an external reviewer if available. | Accept | 2026-10-13 | Owner approval reconfirmed in project conversation. |

**Owner approval statement (complete manually):**

I have reviewed the six proposals and the Phase 0 materials. My decisions are intentional and represent the current project direction. I understand that approval does not prove implementation, compliance, cost feasibility, catalogue correctness, or deployment readiness.

- Owner identifier / GitHub handle (no legal name required): `s1xte3n`
- Date (YYYY-MM-DD): `2026-10-13` (approval given in the project conversation on this date)
- Approval status: **APPROVED — reconfirmed in the project conversation on 2026-10-13**
- Any rejected item and replacement direction: __________________________________

Commit the completed record only if you are comfortable making the decision record visible in this repository. Alternatively, keep the signed/dated approval in a secure project record and add a non-sensitive reference here.

## 2. Azure access, resources and cost evidence — owner attestation recorded

On 2026-10-13, the owner confirmed: “Everything is verified.” This records the owner’s attestation that subscription status/access, current resources, billing visibility, commitments, permissions and the R100/month cost review have been completed. No sensitive billing records or screenshots are committed to GitHub, and the assistant has not independently accessed the Azure portal. See `PHASE0-ONLINE-EVIDENCE.md` for the distinction between owner-attested account checks and online-verified public pricing/quota information.

Do not provision, delete, resize, or modify resources as part of this evidence-gathering step.

### In Azure Portal

- [x] Sign in to the correct Azure account and subscription.
- [x] Confirm the account can view the subscription and its resource list.
- [x] Open **Subscriptions** and confirm the subscription status is active.
- [x] Open **All resources** and record existing resources relevant to StudyPath SA.
- [x] Open **Cost Management + Billing** and inspect current month-to-date spend, prior spend, credits and any existing budgets.
- [x] Check whether any resources already incur recurring charges, including resources outside this repository/project.
- [x] Confirm the intended deployment region and whether any required service is unavailable or chargeable there.
- [x] If using Azure Static Web Apps Free, verify plan availability, quotas, storage/bandwidth constraints and suitability for the intended app on the existing subscription. The expired Azure free-account offer will not be relied on. Free hosting plan does not establish an all-in R0 subscription cost.
- [x] Do not treat a budget or alert as a hard spending stop.
- [ ] Capture/retain redacted screenshots or export evidence in the owner's private secure location if not already retained. Never commit subscription IDs, tenant IDs, billing identifiers or sensitive account details.

**Record only non-sensitive results here. Owner confirms the checks below are complete; account-specific results are owner-attested and no private billing evidence is stored in GitHub:**

- Subscription status visible and active? **YES — owner-attested**
- Existing StudyPath SA resources found? **NO — owner-attested**
- Current StudyPath project spend? **R0 — owner-attested**
- Current subscription-wide monthly spend and commitments reviewed? **YES — owner-attested**
- Credits/benefits: **will not be used**; the expired 12-month offer will not be relied on.
- Expected total incremental cost within R100/month? **OWNER CONFIRMS VERIFIED**; recheck the exact resource list before provisioning.
- Evidence date: **2026-10-13**
- Secure evidence reference (no secrets): **Owner's private Azure/billing review; not committed to GitHub**

**Stop condition:** If subscription status, effective permissions, billing visibility, unrelated commitments or all-in cost cannot be verified, deployment remains blocked.

## 3. Catalogue validation — official-source checks recorded

The official programme pages and general admissions page were checked online on 2026-10-13. The programme identifiers, locations, modes, durations, published minimum thresholds and 2026 application dates are recorded in `PHASE0-ONLINE-EVIDENCE.md`. This verifies the bounded minimum-requirement pilot, not every admission condition or a guaranteed eligibility outcome. Keep incomplete rules as UNKNOWN.

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
| Academic year / catalogue version | 2026 / pilot-2026-10-13-v1 | 2026 / pilot-2026-10-13-v1 |
| Official source(s) checked | UJ programme page; UJ undergraduate application page | UJ programme page; UJ undergraduate application page |
| Date checked (YYYY-MM-DD) | 2026-10-13 | 2026-10-13 |
| APS calculation verified? | No — do not calculate eligibility from APS until method is verified | No — do not calculate eligibility from APS until method is verified |
| Full subject rules verified? | Published minimum thresholds verified; complete rule set not established | Published minimum thresholds verified; complete rule set not established |
| Applicant categories and equivalencies verified? | No — unsupported categories must return UNKNOWN | No — unsupported categories must return UNKNOWN |
| Additional selection rules checked? | Not fully established from the programme page | UJ page states selection is based on academic credit; full conditions still require confirmation |
| Fees/cost information verified or clearly unavailable? | Fee link is present; no amount transcribed; show “not verified” until checked | Fee link is present; no amount transcribed; show “not verified” until checked |
| Funding/deadline sources verified? | Application dates checked; no funding outcome verified | Application dates checked; no funding outcome verified |
| Reviewer / second check | Project owner; no independent reviewer confirmed | Project owner; no independent reviewer confirmed |
| Validation outcome (PASS / FAIL / UNKNOWN) | PASS for sourced minimum-requirement display only; UNKNOWN for complete eligibility automation | PASS for sourced minimum-requirement display only; UNKNOWN for complete eligibility automation |
| Open gaps and follow-up owner | APS method, applicant categories and full selection rules — project owner | APS method, applicant categories and full selection rules — project owner |

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

## 5. Hackathon eligibility and submission evidence — programme checked; owner confirmation recorded

The supplied programme was reviewed and the owner confirms the team profile is complete and this is a new app. The Sonke portal was not independently accessed; retain this distinction and verify displayed timezone/file limits when submitting. The programme requirements and derived date are documented in `PHASE0-ONLINE-EVIDENCE.md`.

- [x] Owner confirms the correct event/team profile is complete; portal visibility is owner-attested, not independently inspected.
- [x] Programme confirms real-time interactive web apps are eligible; static websites/CMS-only sites are not. The built app must meet this condition.
- [x] Programme deadline wording is Monday 23:59; event dates imply Monday 26 October 2026. The extracted programme does not specify a timezone; verify the portal display before upload.
- [x] PDF deck preferred, maximum 10 slides, with features, screenshots, demo details, security, user journey and technical architecture.
- [x] Demo video maximum 90 seconds and link included on the deck.
- [x] SSDLC and Lean Business Canvas are required.
- [ ] Confirm portal file-size limits, exact timezone and upload workflow when the submission portal is available.
- [ ] Keep non-sensitive portal proof in a secure project location if available.

**Evidence record**

- Portal/event checked: Supplied FNB AOTY Hackathon 2026 programme; Sonke portal not independently accessed
- Team profile visible and complete? **YES — owner-attested**
- App eligibility confirmed? **Conditional on the implemented app processing input/data in real time; implementation not yet verified**
- Deadline and submission route: Programme states Monday 23:59 via Sonke; date derived as 2026-10-26; timezone not stated in extracted programme
- Deliverables confirmed: PDF-preferred deck ≤10 slides, demo video ≤90 seconds, SSDLC and Lean Business Canvas
- Confirmation source/date: Supplied programme exported 2026-10-11; owner confirmation 2026-10-13
- Unresolved organiser questions: Portal timezone, upload/file limits and final submission screen

## 6. Accountability and review

- [ ] Record that the project is currently operated by one person and that no independent reviewer/back-up is confirmed.
- [ ] Identify a possible external reviewer/mentor if available; do not list someone without their agreement.
- [ ] Before a release, complete a self-review of requirements, matching rules, privacy, accessibility, dependency/security checks, tests, deployment and rollback.
- [ ] Keep test and deployment evidence distinct from a code review or a written checklist.

Reviewer / mentor (if confirmed): ____________________  
Agreed role and date: ____________________  
If none, record: **No independent reviewer currently confirmed.**

## 7. Phase 0 gate decision

**Gate result: PROJECT READY — PASSED for Phase 1 PRD/planning only.**  
**Decision date:** 2026-10-13  
**Approver:** Project owner (GitHub handle: s1xte3n), approval given in the project conversation  
**Evidence reference:** `docs/project/PHASE0-ONLINE-EVIDENCE.md`

Basis:
- [x] Six decision records and related Phase 0 directions approved by the owner.
- [x] Owner attests Azure subscription/access, billing, commitments, permissions and budget checks are complete; account-specific records are not independently inspected by the assistant.
- [x] Official UJ programme pages and general undergraduate application information checked online; the MVP is limited to published minimum-requirement screening and UNKNOWN on ambiguity.
- [x] Supplied hackathon programme reviewed; owner confirms Sonke team profile and new-app status.
- [x] Remaining build, privacy verification, tests, deployment and release work is explicitly recorded as downstream work.

This gate authorizes PRD and requirements planning. It does not assert the application is implemented, tested, deployed or legally compliant, and it does not itself authorize a billable resource or real learner data. Before provisioning, recheck the planned resource set and retain private cost evidence; before public demo/release, verify the implemented privacy boundary and all required tests.

