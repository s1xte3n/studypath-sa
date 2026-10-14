# StudyPath SA — Project Status

**Status:** Phase 2 — Requirements matrix and traceability  
**Phase 0 gate:** `PROJECT READY` — **PASSED for Phase 1 planning only**  
**Current gate:** `PRD READY` — **PASSED on 2026-10-14 for the approved PRD/acceptance-criteria baseline only**  
**Last updated:** 2026-10-14

## Verified repository state
- Repository: https://github.com/s1xte3n/studypath-sa
- Visibility: private; default branch: `main`.
- Connected GitHub integration reports admin, read and write permissions.
- Initial root listing contained `README.md` only; README content is a project title and one-line description.
- Phase 0 baseline documentation and accepted direction decisions are present in the project documentation.
- The PROJECT READY evidence pack and owner-confirmation update were merged through PRs #4 and #5.
- On 2026-10-14, the owner supplied Azure portal details stating that the `StudyPath SA` subscription is Active, the owner role is Owner, the plan is Azure Plan, and no costs exist. These details are owner-attested; subscription identifiers are intentionally excluded from the repository. Billing scope/date range and redacted portal evidence have not been independently reviewed.
- Added `docs/project/PHASE0-RESOLUTION-PROPOSAL.md` and `docs/project/PHASE0-ONLINE-EVIDENCE.md`. Official UJ programme pages and Microsoft Static Web Apps pricing/quota sources were checked online. The owner approved all six decision records and attests the account-specific checks are complete. PROJECT READY is passed for Phase 1 PRD/planning only; account-specific evidence remains owner-attested rather than independently inspected.
- Local repository verification was supplied by the project owner on 2026-10-14: path `Sixteen/Desktop/Projects/studypath-sa`, branch `main`, HEAD `3a8f17e44c9c2f079b8ce71e14eebd56519cb52e`, `git status` clean, local branch up to date with `origin/main`, and `git rev-list --left-right --count main...origin/main` returned `0 0`. The tracked-file listing supplied for this check contains repository guidance and `docs/project/` files; it does not list application source, a package manifest, tests or CI workflow. This is owner-supplied command output, not a direct inspection of the local filesystem by the assistant.

## State by area

| Area | Status |
|---|---|
| Product specification, hackathon programme, development SOP | Supplied project references; hackathon programme reviewed and online evidence logged |
| Documented React/Vite + Azure stack | Owner-confirmed baseline; not provisioned/validated |
| Application source and dependencies | Not found in initial root listing; no implementation verified |
| Tests, CI workflows, infrastructure, database | Not verified; no execution evidence available | 
| Deployment | Confirmed by project owner on 2026-10-14: StudyPath SA has not been deployed. No live application URL or deployment has been verified. |
| MVP journey | Direction accepted: anonymous learner journey from subject/mark/interest inputs to explainable pathways, eligibility/uncertainty and official next steps |
| Catalogue | UJ 2027 prospectus selected as starting source; four programme candidates listed in `docs/product/PROGRAMME-CATALOGUE-REGISTER.md`. These are research leads, not publication-ready records. The 6–8 record target, complete source/rule verification and relationship evidence remain outstanding; ambiguity maps to UNKNOWN |
| Budget | Owner reports an Active `StudyPath SA` Azure Plan subscription, Owner access, and no costs as of 2026-10-14. This is owner-supplied portal information; billing scope/date range and supporting evidence are not independently reviewed. Public Microsoft pricing/quota sources were checked. No saved quote was uploaded. Free static hosting only; no paid add-ons without renewed approval. |
| Privacy and identity | Synthetic-only, no-persistence/no-profile-telemetry boundary approved; implementation verification, hosting metadata review and any applicable privacy/legal assessment are downstream build/release gates; real learner inputs remain prohibited |
| Azure subscription and accountable owners | Owner confirms a subscription exists and is theirs; permissions/billing visibility are not independently verified. Under OR-014, temporary single-owner review is accepted with documented self-review/release checks; seek independent review before public learner use and record the limitation if unavailable. |
| Hackathon | Owner confirms team profile and new-app status. Supplied programme reviewed: interactive real-time app, deck max 10 slides, demo video max 90 seconds, SSDLC and Lean Business Canvas; Monday 23:59 submission implies 26 Oct 2026. Sonke portal not independently accessed; verify displayed timezone/upload details at submission. |

## Completed
- Confirmed repository identity, private visibility, default branch and integration permissions.
- Inspected the root listing and README.
- Established Phase 0 documentation and recorded the accepted MVP, budget, privacy, anonymous-first and no-provisioning directions.
- Reviewed the supplied product specification for the catalogue/provenance and deterministic eligibility guardrails.
- Reviewed the supplied hackathon programme: team profiling, app eligibility, deck/video, SSDLC, Lean Business Canvas and submission timing.
- Owner approved OR-008–OR-018 on 2026-10-14; the aligned PRD/policy documentation was merged into `main` via PR #22 (merge commit `520abc6a033b73502f9a30f922b032809615d235`). The product owner explicitly approved the revised PRD and measurable acceptance criteria on 2026-10-14; `PRD READY` is passed for the requirements baseline only. Tracker entries are page-memory-only under the approved policy; no persistence is in scope. No implementation, test execution, privacy clearance or release evidence is implied.
- Researched official Azure pricing/documentation pages for the preliminary budget screen.
- Merged `docs/project/PROJECT-READY-EVIDENCE.md` via PR #4; the pack does not constitute approval or gate passage.
- Recorded owner confirmations: one person holds all roles for now; Azure subscription exists and is owned by the project owner; team is profiled on Sonke; this is a new app being developed before the hackathon.
- Owner confirmed no StudyPath SA resources have been provisioned (reported current project spend R0), no existing project resource costs, and no credits will be used. Owner clarified that Azure Static Web Apps Free is acceptable on the existing subscription; the expired 12-month free-account offer will not be relied on.

## Phase 0 disposition

PROJECT READY is **PASSED for Phase 1 PRD and requirements planning only**, based on the owner’s explicit approvals, the owner’s attestation that account-specific checks are complete, official-source research recorded in `PHASE0-ONLINE-EVIDENCE.md`, and review of the supplied hackathon programme.

The following are downstream implementation/release controls, not blockers to beginning PRD work:
1. Implement and test the synthetic-only boundary; verify no profile values are transmitted, persisted or logged.
2. Review hosting metadata, privacy notice, retention and incident process before a public demo; real learner data remains prohibited until the appropriate privacy/legal review is complete.
3. Keep eligibility to sourced minimum-requirement screening and return UNKNOWN on incomplete or ambiguous rules.
4. Before provisioning, recheck the planned resource list against the R100/month cap and the owner's private cost evidence; do not add paid/metered services without renewed approval.
5. Verify the Sonke portal’s displayed submission deadline/timezone and upload limits before final submission.
6. Under OR-014, retain source/relationship self-review records, run available automated checks and complete a release checklist; seek independent review before public learner use, and document the limitation if no reviewer is available.

## Owner-approved direction and remaining boundaries
- MVP journey and key exclusions.
- Anonymous exploration first; cross-session saved pathways and accounts remain excluded. Funding matching and manual application tracking are intended P1 MVP capabilities. OR-015 funding rules and OR-016 lifecycle/field rules are documented; tracker entries are page-memory-only under the approved policy; no persistence is in scope. Cost planning and the AI/document assistant remain deferred under OR-017/018.
- Start with a 6–8 record manually curated official-source pilot, prioritising Gauteng, under OR-008; actual records and review evidence remain outstanding.
- Hard R100/month total spend cap; no provisioning before cost/access approval.
- Azure Static Web Apps Free is an acceptable hosting plan on the existing subscription; the project will not rely on the expired 12-month Azure free-account offer. Owner reports no project resources currently provisioned and no credits will be used.

Owner approval of the Phase 0 direction/materials is recorded. These approvals do not by themselves provide the external and implementation evidence required to pass the gate.

## Evidence limitations
- No application tests, build, security scan, cloud resource, or CI run has been performed or verified. The project owner confirmed on 2026-10-14 that StudyPath SA has not been deployed; therefore there is no live deployment to smoke-test yet. Phase 0 passage does not imply these exist.
- The owner reports that the `StudyPath SA` subscription is Active, their role is Owner, the plan is Azure Plan, and no costs exist (2026-10-14). Account-specific details, billing scope/date range and redacted evidence were not independently inspected by the assistant; no billing screenshot or saved quote was committed. See `PHASE0-ONLINE-EVIDENCE.md`.
- Pricing review is a preliminary screen of official pricing pages, not a saved Pricing Calculator quote; final regional prices, currency conversion, tax, usage assumptions and credits remain unverified.
- Official UJ programme pages and Microsoft pricing/quota pages were checked online on 2026-10-13. OR-008 supersedes the earlier two-programme proposal with a target of 6–8 curated programme records prioritising Gauteng; the actual publication-ready catalogue remains outstanding. Full admission predictions remain unsupported and incomplete rules must return UNKNOWN.
- Hackathon deliverables and date are extracted from the supplied programme. The owner confirms Sonke profiling and new-app status; the portal itself was not accessed. Confirm the portal timezone/upload details before submission.
- The supplied local tracked-file listing and remote repository inspection do not constitute a complete audit of every branch or historical commit.

## Next gate
Phase 1 `PRD READY` passed on 2026-10-14 after explicit owner approval of the revised PRD and measurable acceptance criteria. Current work is **Phase 2 — Requirements matrix and traceability**; `REQUIREMENTS READY` has not passed. Tracker entries are page-memory-only and persistent storage is out of scope. These planning gates do not approve implementation, Azure provisioning or deployment. No application tests were run and no cloud resources or deployment were changed by the documentation updates.


## Azure cost estimate update — 2026-10-14

Created [`docs/project/AZURE-COST-ESTIMATE.md`](AZURE-COST-ESTIMATE.md). The preliminary baseline estimates **R0/month for Azure Static Web Apps Free only**, with the static React/Vite app and browser-side matching; no backend, database, AI, API Management, or paid monitoring is included. Microsoft public pricing/quota sources were checked on 2026-10-14. This is not a saved, authenticated Azure Pricing Calculator quote and does not independently verify subscription billing. The owner must save/review the calculator result and private billing evidence before provisioning. The R100/month cap and no-provisioning boundary remain unchanged.


## Azure Pricing Calculator output supplied — 2026-10-14

The project owner supplied a calculator table showing Azure Static Web Apps, Free tier, **Central US**, **$0.00 estimated monthly cost**, **$0.00 estimated upfront cost**, and a **$0.00 Support** line. Licensing program is shown as Microsoft Customer Agreement (MCA); billing account/profile fields in the pasted table are blank. This evidence is recorded in [`AZURE-COST-ESTIMATE.md`](AZURE-COST-ESTIMATE.md). The calculator output is owner-supplied and has not been independently inspected in a signed-in session. It applies to the listed items only, not necessarily all project or third-party costs. Private Cost Analysis/billing scope verification and review of the exact planned resource list remain required before provisioning. The R100/month hard cap and no-provisioning boundary remain in force.

## Phase 1 PRD gate disposition

- **Gate:** `PRD READY` — **PASSED on 2026-10-14** after explicit product-owner approval of `docs/product/PRD.md` and `docs/product/ACCEPTANCE-CRITERIA.md`.
- **Approved scope boundary:** P1 funding matching and manual application tracking; tracker entries page-memory-only; next steps limited to official links and neutral source-backed guidance; cost planning and AI/document assistance deferred.
- **Meaning:** Requirements baseline approved for Phase 2 planning. Acceptance criteria are targets/test oracles, not test results.
- **Still outstanding:** Requirements matrix and traceability, curated programme/funding records, relationship provenance, implementation, automated tests, accessibility/performance measurements, privacy/hosting review, CI/CD, infrastructure validation, deployment and release evidence.
- **Verification:** Documentation state updated only. No application tests were run; no cloud resources were provisioned and no deployment was performed.


## Phase 2 GAP-001–GAP-008 update — 2026-10-14

The project owner selected API-first MVP architecture, UJ 2027 as the starting programme-catalogue source, and the policy of keeping sensitive funding criteria unknown and directing learners to official checks. D-044 records the architecture decision and supersedes D-019's static-first choice only.

Draft architecture and API contract documents are recorded under `docs/architecture/`. The safe interim boundary is catalogue-only API responses; learner marks, subjects, interests, match results and tracker entries remain client-side and must not be transmitted. Owner confirmation is still required under OR-019/Q-018 before the final API contract is frozen.

The UJ catalogue register identifies four candidate programme leads from official UJ sources, but none is marked as a verified publication-ready record. GAP-001, GAP-002, GAP-003, GAP-004 and GAP-005 remain evidence blockers. GAP-006 and GAP-007 remain resolved by prior source inspection. GAP-008's architecture direction is resolved, but runtime composition, final API schema, network behavior, provider retention/logging and cost feasibility remain open.

No application code, executable tests, CI workflow, Azure resource, deployment, privacy clearance or release evidence was created or verified by this documentation update. The R100/month cap and no-provisioning gate remain in force.


## UJ 2027 catalogue evidence review — 2026-10-14

Official-source research has captured preliminary programme code and minimum-threshold leads for four UJ programmes in `docs/product/PROGRAMME-CATALOGUE-REGISTER.md`. The current official programme pages list B2I01Q (APS 30, English 5, Mathematics 6), B2I02Q (APS 30, English 5, Mathematics 6), B2E02Q (APS 26, English 4, Mathematics 5) and B2I04Q (APS 34, English 5, Mathematics 7). The indexed 2027 prospectus also shows B2E02Q and an exclusion note for Technical Mathematics and Technical Science for Faculty of Science degree programmes.

**Evidence limitation:** these are preliminary source leads, not complete eligibility rules or curator-approved catalogue records. The full programme-specific APS calculation/inclusions, exceptions and source/cycle reconciliation remain outstanding. The Academy undergraduate-courses page contains an older B2E01Q label for the extended CSI programme, while the 2027 prospectus and current programme page show B2E02Q; this conflict is explicitly open. No eligibility evaluator may consume these candidate values as definitive data. GAP-001 remains open, the 6–8 verified-record target is unmet, and `REQUIREMENTS READY` remains not passed. No application code or tests were changed or run.


## UJ catalogue expansion — 2026-10-14

The preliminary UJ 2027 research set has expanded from four to seven candidates in `docs/product/PROGRAMME-CATALOGUE-REGISTER.md`: four Faculty of Science computing degrees, BCom in Information Systems (B1CISQ), Diploma in Business Information Technology (code conflict D1I40J vs DI1401), and BCom in Information Management (APS wording conflict). Official-source search-indexed 2027 prospectus text and current UJ programme pages were compared. The three material source conflicts (extended CSI code, Diploma in Business IT code, Information Management APS wording) remain unresolved. These are candidate leads, not curator-approved records. The full 2027 rule tables/yearbooks, programme-specific APS calculations/inclusions, exceptions and curator sign-off are still required. GAP-001/Q-019 remain open; 6–8 fully verified records are not yet available; `REQUIREMENTS READY` remains not passed. No application code or tests were changed or run; no Azure resource was provisioned and no deployment was performed.


## Catalogue reconciliation matrix — 2026-10-14

Created `docs/product/UJ-2027-SOURCE-RECONCILIATION-MATRIX.md` and linked it from the programme register and requirement gaps. The matrix records the official-source register, seven candidate-level reconciliation rows, evidence checklist, open discrepancies and requirement-to-test traceability. Fresh official-source research indicates the Business Information Technology code `DI1401` appears in both the current UJ page and the official 2027 CBE intake brochure, while the central prospectus search-indexed text appears as `D1I40J`; this may be a PDF text extraction/OCR issue but must be checked against the original page. Information Management APS text appears conditional by Mathematics route versus Mathematical Literacy and must be confirmed against the original table. CSI Extended code `B2E01Q` versus `B2E02Q` still needs authoritative resolution. All seven records remain research leads, not approved rules. GAP-001 remains open; `REQUIREMENTS READY` remains not passed. No app code/tests were changed or run; no Azure resource was provisioned or deployed.


## UJ official programme-page follow-up — 2026-10-14

Reviewed additional official UJ programme-page search results and the official departmental Information Management page. Current programme pages corroborate preliminary values for the seven candidates. The departmental Information Management page explicitly states APS 26 with Mathematics or 28 with Mathematical Literacy, while the current programme page states minimum APS 28 alongside its subject alternatives; the 2027 rule remains unresolved pending original-table review. The older CSI Extended page's B2E01Q should be treated as a historical-source discrepancy, not automatically as a current 2027 conflict. Diploma Business Information Technology has code variations in search-indexed yearbook evidence; the current programme page lists DI1401, but the original 2027 prospectus row still requires visual confirmation. Evidence and limitations are recorded in `docs/product/UJ-2027-SOURCE-RECONCILIATION-MATRIX.md`. No programme is approved, GAP-001 remains open, and no application code/tests or Azure/deployment work was performed.

## Subject normalization proposal — 2026-10-14

Added `docs/product/SUBJECT-NORMALIZATION-CONTRACT.md` as a draft proposal for GAP-002. It proposes stable identifiers while keeping Mathematics, Mathematical Literacy and Technical Mathematics distinct; prohibits unapproved aliases and fuzzy eligibility matching; defines unresolved/ambiguous behavior as non-matching; calls out Home Language vs First Additional Language distinctions; and defines planned test scenarios and the catalogue-only API privacy boundary. Linked the proposal from `docs/product/REQUIREMENT-GAPS.md`. This is not an approved subject dictionary or implementation. GAP-002 remains open pending product-owner/curator decisions. No application code or executable tests were changed or run; no CI result, privacy clearance, Azure provisioning or deployment is implied.


## Funding catalogue research — 2026-10-14

Added `docs/product/FUNDING-OPPORTUNITY-SOURCE-REGISTER.md` on branch `docs/phase-2-funding-catalogue` as a research draft for GAP-005. Four official-source leads are recorded: NSFAS bursary, NSFAS loan/missing-middle route, Funza Lushaka 2027, Garden Route District Municipality 2027 assistance and Northern Cape Premier's Bursary 2027 (the register records five rows, with NSFAS bursary and loan separated). The NSFAS deadline conflict between the operational portal (31 October) and a 18 September DHET ministerial statement (18 November) is explicitly unresolved; a 22 September government update reports 31 October. No deadline should be published until rechecked and reconciled. Regional, field, study-level and sensitive financial criteria remain provider-assessed; the app must not collect or calculate income/identity-based eligibility. Zero records are publication-ready; GAP-005 remains open. This is documentation-only; no app code/tests, CI, privacy clearance, Azure provisioning or deployment is claimed.
