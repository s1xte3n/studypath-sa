# StudyPath SA — Project Status

**Status:** Phase 2 — Requirements matrix and traceability  
**Phase 0 gate:** `PROJECT READY` — **PASSED for Phase 1 planning only**  
**Last completed gate:** `PRD READY` — **PASSED on 2026-10-14 for the approved PRD/acceptance-criteria baseline only**  
**Current gate:** `REQUIREMENTS READY` — **OPEN; Phase 2 remains in progress**  
**Historical-note convention:** This file preserves dated status snapshots as an audit trail. Older statements that a PR was only proposed/on a branch, or that later checklist items were still open, describe the snapshot at that date; subsequent merged PRs and the latest Phase 2 audit note below supersede those statuses. The current gate remains OPEN unless the top status and explicit owner-acceptance record say otherwise.  
**Latest Phase 2 audit note (2026-10-15):** PR #79 is merged at `f3fdc009f19600abc6830fd1af1752c1ff633149`. The follow-on branch `docs/phase-2-a4-a6-traceability-audit` records A4–A6 source/scope review, corrects the `AC-DET-007`, `REQ-AUTH-001`, `AC-NFR-001–005` and OR-019 summary mappings, and records the bidirectional ID audit and G-SYN-001 requirement mappings. The proposed checklist marks A–D evidence items complete on that branch; review/merge and explicit overall product-owner acceptance remain pending before Phase 2 can pass. PR #79's contract-test workflow passed on its PR head; no workflow result was returned for the merge commit. No app build, browser journey, runtime privacy, cloud provisioning, deployment or release is claimed.  
**Last updated:** 2026-10-15

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

## Product direction update — 2026-10-15

The owner selected tiered matching: anonymous users use a public catalogue API with client-side matching; logged-in users are intended to use authenticated server-side matching and may later receive account-gated features. Recorded as D-045 and reflected in the draft architecture/API contract on branch `docs/login-tiered-matching-change-control`. This is a documentation/change-control proposal only. Authentication, profile transmission, persistence, feature-specific data lifecycle, privacy/security approval, cost verification, implementation, CI and deployment are not complete. Q-018 remains open for architecture/security/cost gates; Q-020 requires the logged-in special features and data lifecycle to be defined. No Azure provisioning or real learner-data use is authorized.

## Q-020 gate-closure work — 2026-10-15

Prepared a review/decision pack on branch `docs/q020-gate-closure-proposal`: `Q020-DECISION-PACK.md`, `Q020-PRIVACY-LEGAL-AGE-REVIEW.md`, `Q020-ARCHITECTURE-THREAT-MODEL.md`, and `Q020-COST-AND-TEST-READINESS.md`. These are proposals/checklists, not proof that the gates have passed. The recommended session design is Entra External ID candidate + OIDC authorization code with PKCE and memory-only token cache. The authenticated service stack is still unpriced; the R100/month cap is not demonstrated for it. A qualified South African privacy/legal review is still required before real learner data. No implementation, provisioning, production identity configuration or deployment is authorized.

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


## Pathway relationship evidence proposal — 2026-10-14

Added `docs/product/PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md` on branch `docs/phase-2-pathway-relationships` as a draft proposal for GAP-003. It defines relationship types and required provenance, distinguishes general qualification progression from named-programme articulation, and records candidate questions without approving any pair. Official UJ sources were researched, but programme-specific relationship evidence and curator sign-off remain outstanding. No application code or executable tests were changed or run; no CI, privacy clearance, Azure provisioning or deployment is implied. GAP-003 remains open and `REQUIREMENTS READY` remains not passed.


## Traceability alignment after PR #31 — 2026-10-14

PR #31 was merged into `main` (merge commit `a191416f27c917e0767841856517dccdabbf2861`). The pathway relationship evidence contract remains a proposal: no programme pair is approved and GAP-003 remains open. The subject normalization contract from PR #30 also remains a proposal pending owner/curator decisions; GAP-002 remains open.

This update aligns the traceability registry with T-SUB-001–010 and T-REL-001–008 and corrects the funding/tracker acceptance-criteria cross-check status. These test IDs are plans only. No application code or executable tests were created/run; no CI result, privacy clearance, Azure provisioning or deployment is claimed. `REQUIREMENTS READY` remains not passed.
## GAP-001 — additional official 2027 CBE source cross-check (2026-10-14)

Reviewed the official UJ CBE Undergraduate 2027 Intake Brochure search-indexed table against the current programme pages and central 2027 prospectus search text. For Diploma in Business Information Technology, the CBE brochure and current page both list DI1401 and the same preliminary APS/subject routes; the central prospectus extraction's D1I40J variation is therefore plausibly an extraction/transcription issue but remains open until the original table is visually checked. For BCom Information Management, both the CBE 2027 brochure and central prospectus search text support APS 26 with Mathematics/Technical Mathematics or 28 with Mathematical Literacy; the current programme page's generic APS 28 statement is less specific.

These are research findings only. Original PDF page numbers/table layouts, complete APS calculation and inclusion/exclusion rules, full programme-specific conditions, source snapshots and curator sign-off remain outstanding. No candidate is approved for definitive eligibility screening. GAP-001 remains P0/open; REQUIREMENTS READY remains not passed. No application code or executable tests were changed or run; no CI result, privacy clearance, Azure provisioning or deployment is claimed.


## Subject contract test evidence — 2026-10-14

The project owner supplied terminal output from the repository command `node --test tests/contracts/subject-catalogue-v1.test.mjs`, reporting **12 tests passed, 0 failed** across T-SUB-001–T-SUB-012. This is owner-supplied execution evidence and is recorded in the requirements matrix. It supports the subject-contract test scope only; it does not prove production matcher integration, CI execution, privacy/runtime behavior, or correct programme eligibility decisions. The bounded `subject-catalogue-v1` contract is owner-approved. GAP-002 remains open for runtime/privacy verification; GAP-001 remains open pending complete programme rules and curator sign-off. `REQUIREMENTS READY` remains **NOT PASSED**. No cloud resources were provisioned and no deployment was performed.


## UJ 2027 curator approval update — 2026-10-14

The project owner explicitly approved all seven candidate records and the shared interpretation proposals in `docs/product/UJ-2027-CURATOR-REVIEW-PACK.md` after reviewing the pack. This is owner/curator approval of the bounded NSC pilot baseline; it is not independent assurance, does not resolve source details absent from the evidence, and does not authorize definitive `ELIGIBLE` results when material rules are unknown. The catalogue register now records this approval. GAP-001 remains open pending completion of programme-specific source/rule fields, signed expected outcomes, deterministic evaluator implementation, and a project-wide 20+ synthetic golden set with zero false-positive `ELIGIBLE` outcomes. GAP-002 runtime/privacy, GAP-003 relationship evidence, GAP-004 privacy/runtime verification, GAP-005 funding records, GAP-008 API/runtime feasibility, implementation and CI remain open. `REQUIREMENTS READY` remains NOT PASSED. No application code/tests were changed or run; no CI, cloud provisioning, or deployment is claimed.

## GAP-002 repository inventory update — 2026-10-14

The owner supplied local Git output for the current checkout. The reported working tree is clean and synchronized (## main...origin/main); local main and origin/main point to 8da1dcf97d14276b4e4cad010168dfd13b87cca7. The tracked-file list contains project documentation, repository guidance, and tests/contracts/subject-catalogue-v1.test.mjs; it contains no package manifest/lockfile, application source, API/function implementation, CI workflow, infrastructure, or deployment configuration. The displayed non-documentation history shows only the contract test and repository guidance additions. This is owner-supplied evidence, not an independently reproduced checkout. The remote inventory branch appears in the branch list but is not the checked-out local branch in the supplied output.

**Disposition:** tracked repository inventory is complete for the reported checkout, subject to the limits of owner-supplied command output and the refs/history actually fetched. GAP-002 remains **OPEN** for runtime/privacy assurance: there is no verified runnable application to inspect or test, no CI result, and no hosting/provider configuration to audit. This does not pass REQUIREMENTS READY. No application code, test, cloud resource, or deployment was changed or executed by this documentation update.


## GAP-002 implementation baseline follow-up — 2026-10-14

Created `docs/requirements/GAP-002-PRIVACY-VERIFICATION-PLAN.md` on a dedicated branch. It defines the minimum runnable browser-only slice and 12 evidence-backed privacy tests covering network egress, third-party destinations, storage/cookies, URLs/history, console/telemetry, API/provider logs, reset, reload, error paths, CI/dependencies, source-sink inventory and hosting retention. This is a plan only. The supplied tracked-tree inventory has no verified runnable app or browser harness, so learner-data non-transmission/non-persistence/non-logging/non-telemetry cannot yet be tested. No app code, dependency, test harness, CI, cloud resource or deployment was added or changed. GAP-002 remains OPEN; no runtime privacy claim is made.


## Phase 2 PH2-001 status reconciliation — 2026-10-15

Updated the requirements matrix, requirement-gap register and project status summary to use one consistent disposition for the funding/tracker documentation cross-check:

- GAP-006 is **resolved as a documentation cross-check**: PRD and OR-016 agree on tracker status transitions and terminal states. This does not mean tracker implementation or transition tests are complete.
- GAP-007 is **resolved as a documentation cross-check**: AC-FUND-001–009 and AC-APP-001–009 are present in `docs/product/ACCEPTANCE-CRITERIA.md` and linked from the requirements matrix. This does not mean funding/tracker features or their tests are implemented.
- REQ-FUND-001 remains P1; current official-source funding records are still outstanding. Its scope/acceptance-criteria mapping is no longer marked outstanding.
- REQ-APP-001 remains P1; its lifecycle/acceptance-criteria mapping is no longer marked outstanding. Implementation and test evidence remain unavailable.
- The requirement-gap register no longer treats publication-ready catalogue data, runtime privacy checks, final API details, executable app paths, test execution, CI or release evidence as automatic requirements-completeness blockers. These remain open in their respective data, architecture, implementation, security/privacy, test and release gates unless they expose unresolved product behavior.

**Gate disposition:** Phase 2 remains **OPEN**. PH2-001 corrects status contradictions only; it does not approve the requirements baseline, close other gaps, or claim code/test/CI/deployment work. No application tests were run, no CI was triggered by this documentation update, and no cloud resources or deployment were changed.


## Phase 2 PH2-002 — subject contract/test traceability reconciliation (2026-10-15)

Prepared on branch `docs/phase-2-ph2-002-subject-traceability` for review. The owner-approved `subject-catalogue-v1` policy remains exact canonical labels after trim/whitespace-collapse/case-insensitive matching, with no aliases. The change aligns the traceability registry and subject contract's T-SUB-001–012 descriptions with the checked-in reference-normalizer tests, corrects the reference normalizer to return canonical display labels rather than lower-case lookup keys, and makes the test/runtime evidence boundary explicit.

**Not claimed:** this reference suite is not production application code; it does not verify programme-level eligibility `UNKNOWN`, UI duplicate rejection, actual dictionary refresh, network/URL/log/telemetry privacy, deployment or release readiness. CI results must be checked against the exact tested commit; the PR's latest run status is the source for revision-specific execution evidence. GAP-002 and `REQUIREMENTS READY` remain open.

## Q-020 authenticated feature scope approval — 2026-10-15

The product owner approved D-046's authenticated feature scope: personalised pathway matching, saved pathways, pathway comparison, saved funding opportunities and a personal study dashboard. Academic profile persistence requires explicit opt-in; the application tracker remains page-memory-only. Pathway comparison is an approved scope extension to the earlier PRD institution-comparison non-goal. The PRD, acceptance criteria, architecture and draft API contract have been reconciled on branch docs/q020-approved-feature-scope for review.

**Still blocked:** Q-020/Q-018 lifecycle details, exact schemas, identity provider, server-side authorization/account isolation, consent/withdrawal and privacy notice, retention/deletion/backup expiry, shared-device/session behavior, provider logging/telemetry/cache controls, privacy/legal review, executable acceptance tests, and total cost within R100/month. No authenticated implementation, real learner-data use, provisioning or deployment is authorized by this documentation change. The anonymous D-045 privacy boundary and memory-only tracker policy remain unchanged. REQUIREMENTS READY remains open; no tests or CI results are claimed by this update.

## Q-020 lifecycle and implementation readiness — 2026-10-15

A reviewable proposal is recorded in [Q020-LIFECYCLE-IMPLEMENTATION-READINESS.md](Q020-LIFECYCLE-IMPLEMENTATION-READINESS.md). It defines minimum proposed data classes, transient versus persisted behavior, opt-in and withdrawal, proposed retention/deletion/backup windows, account isolation, logging/telemetry/cache controls, session/shared-device handling, candidate API resources, a test plan and explicit owner decisions. These are proposals, not approved policy.

**Q-020 IMPLEMENTATION READY: NOT PASSED.** Identity provider/session design, exact persisted fields, retention periods, deletion and backup behavior, privacy/legal review, frozen API contract, workload/cost evidence and executable security/privacy tests remain open. No authenticated implementation, real learner data, Azure provisioning or deployment is claimed or authorized.

## Q-020 owner decision register — 2026-10-15

The product owner explicitly approved the proposal/constraint/gate dispositions for Q020-DEC-01–14. The register and boundaries are recorded in `docs/project/Q020-LIFECYCLE-IMPLEMENTATION-READINESS.md`.

- Approved proposal directions: first evaluate Microsoft Entra External ID (not yet selected); minimal controlled profile fields; no match-history/result persistence by default; separate versioned opt-in and withdrawal; profile retained only while opt-in is active; saved items retained until removal/account deletion; shared-device clearing/account partitioning; and the proposed deletion/backup/log-retention targets.
- Approved security constraints: no tokens in URLs or persistent browser storage; cookie sessions require CSRF protection. The session mechanism remains deferred until threat-model review.
- Approved gates: complete South African privacy/legal and age-appropriate design review before real learner data; select/provision hosting only after security and full cost assessment; evidence a realistic service-by-service workload forecast under the R100/month cap.
- The 30-day active-data deletion targets, 35-day backup-expiry target and 30-day-or-shorter routine-log target are not verified guarantees or public-facing promises. Provider capabilities/configuration, legal suitability, deletion/restore behavior and tests remain to be evidenced.
- Q-020 remains **OPEN / P0; IMPLEMENTATION READY — NOT PASSED**. The approvals do not authorize real learner data, cloud provisioning, production identity configuration, authenticated implementation or deployment. No runtime tests, security/privacy tests, cost verification, CI run or deployment were performed by this documentation update.
- The anonymous privacy boundary and page-memory-only application tracker remain unchanged.


## Q-020 owner decisions A–E — 2026-10-15

The owner explicitly approved all five decisions A–E. The approved design baseline and limits are recorded in [Q020-DECISION-PACK.md](Q020-DECISION-PACK.md) and the [owner decision record](Q020-OWNER-DECISIONS-A-E.md): (A) evaluate Entra External ID first with OIDC authorization code + PKCE and memory-only token cache; (B) adopt token-subject-derived API ownership and account-isolation constraints; (C) accept retention/deletion periods as internal engineering targets only; (D) maintain the hard R100/month total cap and defer authenticated persistence/features unless a complete forecast proves affordability; (E) adopt the executable acceptance matrix, including 20+ reviewed synthetic golden cases and zero false-positive ELIGIBLE results.

**Q-020 remains OPEN / P0; IMPLEMENTATION READY — NOT PASSED.** These are design/constraint approvals, not evidence of legal compliance, provider capability, cost compliance, implementation, runtime tests, CI for runtime controls or deployment. Qualified South African privacy/legal and age-appropriate review, provider verification, a complete cost forecast, runnable implementation baseline, executable tests/CI and operational-control verification remain open. Real learner data, provisioning, production identity configuration and deployment remain unauthorized until applicable gates pass. Anonymous inputs/results/tracker entries remain page-memory-only and must not be transmitted to APIs, URLs, analytics, logs or telemetry.


## G-Q020-1 — External privacy/legal/minors review preparation — 2026-10-15

- **Gate state: BLOCKED — qualified independent review not evidenced.**
- Added `docs/project/G-Q020-1-EXTERNAL-REVIEW-REQUEST.md` with scope, evidence limitations, reviewer questions, decision criteria and a response template.
- Existing `docs/project/Q020-PRIVACY-LEGAL-AGE-REVIEW.md` remains the data-inventory and legal-questions pack.
- This work prepares the review; it is not legal advice, a legal opinion, POPIA compliance evidence, or approval to process real learner data.
- No qualified reviewer has been identified or signed off in repository evidence. Do not infer a reviewer has been contacted.
- Real learner data remains prohibited; synthetic-only development, no provisioning/deployment, and no authenticated persistence remain in force.


## Synthetic-only MVP gate — 2026-10-15

**G-SYN-001 — Synthetic-Only MVP Verification: OPEN / NOT PASSED.** See [G-SYN-001 gate criteria](G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md). The gate is defined to keep work moving without real learner data or an external legal review at this stage; it is not a legal-compliance finding or permission to deploy publicly.

**Verified repository correction at commit `e3564527b48dc0ca3cb55d4c208da5dc620b23ff`:** the recursive default-branch tree includes `src/domain/eligibility/uj-2027-evaluator.mjs`, golden-case tests, and two GitHub Actions workflows. Earlier statements in this status file that no tests/workflows or application source were found reflect earlier snapshots and are superseded to that extent. The inspected tree still does not establish a root package manifest/lockfile, learner-facing UI/app entry point, browser-test harness, API implementation, or deployment/infrastructure code. Domain tests are not runtime privacy evidence.

**Next action:** build a minimal local browser-only vertical slice with synthetic fixtures, then implement and run the SYN-001–SYN-010 checks. Do not mark the gate passed until results are tied to a commit. The Phase 2 `REQUIREMENTS READY` gate remains open; this bounded demo work does not silently close it. No Azure provisioning, deployment, real learner data, production identity, or persistence is authorized.


## MVP scope reconciliation — D-044–D-047

**Merged:** PR [#71](https://github.com/s1xte3n/studypath-sa/pull/71), merge commit `ef23f08f703d45ad7d3f9a2565c087117246cf4f`. Reconciliation document: `docs/product/MVP-SCOPE-RECONCILIATION-D-044-D-047.md`.

The scope model distinguishes (1) the intended API-first `/api/v1` architecture, (2) the D-045 anonymous client-side matching and D-046 approved but gated authenticated feature extension, and (3) the immediate D-047 local synthetic-only browser demo. The PRD, canonical requirements matrix, acceptance criteria and traceability matrix explicitly record this distinction. The local demo does not require a hosted API, but this does not cancel the API-first target. No new implementation, provisioning, deployment or real learner-data use is authorized.

**Checklist disposition:** A2 is checked on `main`. A3–A6, the remaining Phase 2 evidence and formal product-owner acceptance remain open. G-SYN-001 remains OPEN / NOT PASSED. The branch's contract-test workflow passed run [#32](https://github.com/s1xte3n/studypath-sa/actions/runs/38775543157); no application build, runtime privacy tests, provisioning or deployment were performed by this documentation change.


## A3 authenticated-feature boundary accepted — 2026-10-15

**Decision status:** Product owner approved the A3 proposal as written; D-048 records the decision. The requirements checklist now marks A3 complete at the boundary-decision level only.

- Five authenticated features remain approved future scope but are excluded from the D-047/G-SYN-001 local synthetic-only demo.
- Academic-profile persistence remains off by default pending separate explicit opt-in and approved lifecycle controls.
- The tracker remains page-memory-only.
- Exact API schemas, identity/session/authorization, comparison/dashboard behavior, retention/deletion/backups, provider controls and cost remain open under Q-018 / Phase 3 and Q-020.
- **Still open/not passed:** A4–A6; overall Phase 2 REQUIREMENTS READY; Q-018; Q-020 implementation readiness; G-SYN-001; browser privacy/accessibility/runtime evidence; application build/test evidence; external privacy/legal review; provisioning and deployment.

The owner decision is not implementation or test evidence. No application code, runtime behavior, infrastructure or deployment was changed by this decision record.
