# StudyPath SA — Artifact Index

**Last updated:** 2026-10-18
**Phase:** 4 — API/interface contracts/runtime validation (`ARCHITECTURE READY` passed 2026-10-16 for design/traceability only; four relevant browser/build/contract/eligibility workflows passed on main merge commit `6c91b5f9eabbdd07316f92eac876c6f8f5cd41d4`; no OpenAPI run is claimed for that commit; G-SYN-001 remains open/not passed; runtime, cost, privacy coverage and catalogue publication evidence remain open)  
**Historical-note convention:** Dated sections below preserve prior review snapshots. Where an older row says “proposed,” “on branch for review,” or “not started,” use the latest status table and subsequent dated updates as current; earlier snapshots are not current approval or implementation evidence.  
**Gate:** Phase 0 `PROJECT READY`, Phase 1 `PRD READY`, Phase 2 `REQUIREMENTS READY`, and Phase 3 `ARCHITECTURE READY` are accepted for their stated scope only. Phase 4 API/interface contract/runtime validation is current. The current synthetic-only browser baseline and five passing main-commit CI workflows are documented below; G-SYN-001, downstream runtime/privacy, cost, catalogue publication and release gates remain open.

## Latest synthetic-only gate evidence — 2026-10-18

Current `main`: `6c91b5f9eabbdd07316f92eac876c6f8f5cd41d4` (merge of [PR #137](https://github.com/s1xte3n/studypath-sa/pull/137)). Four workflows passed on that exact commit: [browser E2E/privacy/accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39120290042), [browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39120290021), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39120290039), and [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/39120290056). PR #137 adds automated 320px viewport regression coverage. The OpenAPI workflow is path-filtered and did not run for this test-only change.

G-SYN-001 remains OPEN / NOT PASSED: the UI still stops at input validation, local reproduction and manual accessibility checks remain unverified, and catalogue/provenance/privacy evidence is incomplete. Remote CI is not local test evidence. No provisioning, deployment, paid services or real learner data are approved.

## Source-of-truth references

| Artifact | Supplied filename | Purpose |
|---|---|---|
| Product and technical specification | `SPEC-1-StudyPath-SA.txt` | Product scope and documented technical baseline |
| Hackathon programme | `FNB AOTY Hackathon 2026 - Programme.pdf` | Competition rules and deliverables |
| Software development SOP | `Standard_Project_Operating_Procedure_Software_Development_Final.docx` | Lifecycle, quality gates and process |

These references were supplied in the project conversation; they are not yet stored in this repository.

## Phase 0 artifacts

| Artifact | Path | Status |
|---|---|---|
| Project overview | `docs/project/PROJECT-OVERVIEW.md` | Present in repository |
| Project status | `docs/project/PROJECT-STATUS.md` | Updated on main; Phase 1 planning authorized |
| Master project checklist | `docs/project/MASTER-PROJECT-CHECKLIST.md` | Present; Phase 0 recorded as passed for Phase 1 planning only |
| Decisions and assumptions | `docs/project/DECISIONS.md` | D-044–D-048 recorded on main; current decisions and gate limits documented |
| Q-020 change control | `docs/project/Q020-CHANGE-CONTROL.md` | Owner-approved feature boundary and implementation gates documented; Q-020 remains open/not passed |
| Open questions | `docs/project/OPEN-QUESTIONS.md` | Present in repository; downstream work tracked |
| Project charter | `docs/project/PROJECT-CHARTER.md` | Present in repository |
| Artifact index | `docs/project/ARTIFACT-INDEX.md` | Updated on this PR branch |
| PROJECT READY evidence pack | `docs/project/PROJECT-READY-EVIDENCE.md` | Baseline pack retained; consult Phase 0 evidence files for gate decision and evidence distinctions |
| Phase 0 online evidence | `docs/project/PHASE0-ONLINE-EVIDENCE.md` | Official UJ/Microsoft source checks, programme summary, owner attestations and Phase 0 gate decision |

## Accepted Phase 0 decisions

- Primary MVP journey is anonymous-first: learner enters subjects/marks and interests, sees explainable pathway matches and eligibility/uncertainty, and follows official-source next steps.
- D-046 separately approves authenticated pathway matching, saved pathways, pathway comparison, saved funding opportunities and a personal dashboard, subject to Q-020 lifecycle/security/privacy/test/cost gates. Academic profile persistence requires explicit opt-in. Keep the application tracker page-memory-only. Continue to defer uploads, AI chat and direct application submission.
- Include funding matching (M4) and manual application tracking (M5) in the intended MVP at P1 / medium priority, behind the P0 core pathway-discovery journey. OR-015 funding rules and OR-016 tracker lifecycle/field rules are approved; tracker entries are page-memory-only and no persistence mechanism is in scope.
- Start with a 6–8 record manually curated official-source pilot, prioritising Gauteng; qualification types are included only where supported by official evidence. No national coverage claim.
- Enforce R100/month maximum total spend; prefer free tiers and validate costs, quotas and overages before provisioning.
- Use synthetic development data and minimise personal data.
- Do not provision Azure until subscription/tenant access, permissions, cost controls and deployment responsibility are confirmed.
- Record accountable owners for product, catalogue/data, cloud, security/privacy and release/demo readiness.

## Readiness evidence status

The owner approved the Phase 0 decision records and attests that account-specific checks are complete. Official UJ and Microsoft public sources and the supplied hackathon programme are recorded in `docs/project/PHASE0-ONLINE-EVIDENCE.md`. PROJECT READY passed for PRD/planning only. Owner attestations are not represented as independently inspected Azure portal evidence.

| Requirement | Current evidence | Remaining blocker |
|---|---|---|
| Catalogue | Two official UJ programme pages checked; OR-008 sets a 6–8 curated programme-record target prioritising Gauteng; OR-005/007 source and eligibility boundaries recorded | Actual publication-ready records, relationship evidence and curator review records remain outstanding; no backup curator/independent reviewer confirmed |
| Cloud | Owner attests subscription/access and permission checks complete | Recheck planned resource permissions before provisioning; assistant did not access Azure portal |
| Budget | Official Microsoft pages checked; owner attests budget/billing checks complete | Recheck planned resources and private cost evidence before provisioning |
| Privacy | Synthetic-only boundary approved | Verify implementation, telemetry/logging, notice, retention and applicable privacy/legal review before public use |
| Accountability | Role matrix exists | Confirm role acceptance/availability; currently one person holds all roles |
| Hackathon | Supplied programme reviewed; owner confirms Sonke profile and new-app status | Verify portal timezone/upload details and complete all deliverables |

## Repository evidence

- Private repository: https://github.com/s1xte3n/studypath-sa
- Default branch: `main`.
- Historical initial root listing reported `README.md` only; that statement is superseded by the current repository inspection below.
- Current reviewed `main` commit: `6a6099f10f5957ef0e7e0c87fed058af172921f3`.
- Current artifacts include `package.json`/`package-lock.json`, `src/main.jsx`, `src/styles.css`, student-entry validation, local catalogue handler, UJ evaluator/golden cases, Playwright browser tests and five CI workflows.
- Five workflows passed on this main commit on 2026-10-17: [browser E2E/privacy/accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654154), [browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654225), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654207), [OpenAPI validation](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654244), [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654276).
- These are remote CI results. Local reproduction was not completed because a local clone attempt failed at DNS resolution for `github.com`; no local test run is claimed.
- The browser suite covers basic form validation/reset, invalid input, a keyboard-focus assertion, selected no-transmission/no-persistence checks and automated axe checks. It explicitly states the basic form does not calculate an eligibility result. G-SYN-001 remains OPEN / NOT PASSED.
- Owner confirmed the project has not been deployed and no project Azure resources have been provisioned; no deployment/provisioning is claimed.

## G-SYN-001 synthetic-only MVP — evidence reconciliation (2026-10-17)

| Evidence area | Current evidence | Status / limitation |
|---|---|---|
| Repository baseline | Current main commit `6a6099f10f5957ef0e7e0c87fed058af172921f3`; app entry, manifest/lockfile, browser harness and local catalogue handler present | Baseline verified remotely |
| CI | Five workflows passed on current main commit; run links are listed above | CI passed; not a release approval |
| Browser journey | Student-entry form, basic validation and reset are tested | Does not yet establish the full explainable pathway-result and official-next-step journey |
| Privacy | Automated checks cover selected network, URL, storage, cookie, console and reload behaviors | Full SYN-004 channels and failure paths are not yet evidenced |
| Accessibility/responsiveness | Automated axe scan and keyboard-focus assertion pass; responsive breakpoint exists | Manual keyboard/focus and narrow-viewport review not documented |
| Local reproducibility | Local clone attempt failed at GitHub DNS resolution | Local install/build/test not run by assistant |
| Gate | `docs/project/G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md` | **OPEN / NOT PASSED**; synthetic-only use continues, no deployment/provisioning/real learner data |

## Phase 1 product artifacts

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Product requirements document | `docs/product/PRD.md` | Owner-approved baseline; D-046/D-048 future authenticated scope is explicitly mapped to REQ-AUTH-001 and excluded from D-047 demo | Authenticated implementation remains blocked by Q-018/Q-020 lifecycle, privacy/security, contract, test and cost gates |
| User stories/use cases | `docs/product/USER-STORIES.md` | Draft | Stories and core use cases mapped to requirement IDs |
| Acceptance criteria | `docs/product/ACCEPTANCE-CRITERIA.md` | Owner-approved baseline; AC-AUTH-001–016 document D-046/D-048 future scope | Authenticated criteria are planned test oracles, not implementation or test evidence |
| Scope | `docs/product/SCOPE.md` | D-044–D-048 scope boundary reconciled; Phase 2 gate remains open | P0 core journey precedes P1 funding/tracker; authenticated extension is future/gated; implementation boundaries remain open |
| Open requirements | `docs/product/OPEN-REQUIREMENTS.md` | OR-001–OR-018 dispositions recorded; OR-019 remains open for API/runtime composition and cost/provider review; OR-016 page-memory-only policy aligned | Funding records, runtime privacy and tracker implementation evidence remain outstanding; future persistence requires separate change control |

## Planned downstream artifacts

| Artifact | Status | Dependency |
|---|---|---|
| Requirements and traceability matrix | Created — planning baseline | PRD approval; Phase 2 audit/owner acceptance remains in progress |
| Architecture and ADRs | Draft artifacts exist; not frozen/approved | `REQUIREMENTS READY` acceptance, then Phase 3 review |
| API/interface contracts | Draft contract exists; not implementation-ready | Phase 3 architecture, OR-019/Q-018, privacy/provider and cost review |
| Environment and secret inventory | Not verified / not ready | Approved contracts and an authorized deployment plan; no provisioning is currently authorized |
| Test strategy and test cases | Partial: domain, contract, Playwright browser, privacy/accessibility and golden-case tests exist; current CI passed remotely, but privacy channel coverage and manual checks remain incomplete | Approved requirements/contracts; complete core journey and expanded verification |
| Implementation, security review and CI/CD | React/Vite scaffold and browser harness exist; core pathway-result journey is not established; five workflows passed on current main; local reproduction and full security review remain outstanding | Approved upstream artifacts; G-SYN-001 remains open/not passed |
| Release and smoke-test evidence | Not available | Implemented/deployed release |
| Deck, demo video, Lean Business Canvas and SSDLC evidence | Not started/verified | Hackathon submission plan |

## Evidence rules

“Draft” is not approval. “Not verified” does not prove an external artifact does not exist. Never claim implementation, tests, builds, provisioning or deployment without direct evidence. Update this index when artifacts are created, reviewed, approved or superseded.

## Phase 4 — API/interface contract (draft review baseline, 2026-10-16)

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Canonical API/interface contract | `docs/api/API-CONTRACT.md` | Draft v1.0.0; review required | Defines two public read-only catalogue GET routes plus browser-local matching/tracker interfaces; no learner-specific HTTP payloads or tracker persistence. |
| Endpoint inventory | `docs/api/API-ENDPOINTS.md` | Draft v1.0.0 | Maps operations/interfaces to requirement IDs, priorities, authentication and status. |
| Reusable schemas | `docs/api/API-SCHEMAS.md` | Draft v1.0.0 | Freezes draft ID, date/time, casing, nullability, enums, provenance, programme, funding and local-interface schemas. |
| Error/status contract | `docs/api/API-ERRORS.md` | Draft v1.0.0 | Defines API error envelope, status semantics and local domain errors. |
| Variables inventory | `docs/api/API-VARIABLES.md` | Draft v1.0.0 | Defines path/query/header/body variables and browser-local data boundaries. |
| Examples | `docs/api/API-EXAMPLES.md` | Draft v1.0.0 | Contains illustrative request/response examples; sample values are not catalogue evidence. |
| Contract changelog | `docs/api/API-CHANGELOG.md` | Initial draft entry | Records field/version/privacy decisions and remaining review gates. |
| OpenAPI | `docs/api/openapi.yaml` | Draft OpenAPI 3.1.0 | Dedicated Redocly validation is configured in `.github/workflows/openapi-validation.yml`. On PR #87 merge, Redocly lint passed but 3/33 API invariant tests failed due to overly brittle assertions; follow-up fixes are proposed on `fix/phase-4-contract-ci`. Do not mark contract validation passed until follow-up CI is green. |
| Existing architecture contract note | `docs/architecture/API-CONTRACT.md` | Historical draft; superseded by canonical `docs/api/` artifacts | Retained for architecture history; updated to point to the Phase 4 canonical contract. |

### Phase 4 scope and gate limits

The draft contract maps API-001 to `REQ-CAT-001`, `REQ-DET-001`, `REQ-MAT-001`, `REQ-ALT-001` and `NFR-DATA-001`; API-002 to `REQ-FUND-001` and privacy/data-quality NFRs; IF-001 to the anonymous exploration/matching/privacy requirements; and IF-002 to `REQ-APP-001` and `REQ-PRV-001`. Authenticated routes, profile persistence, saved items, comparison/dashboard endpoints, tracker persistence, uploads, AI, admin writes and direct application submission are explicitly excluded from this contract.

**Not yet passed:** owner review of the frozen draft; successful CI result for the new Redocly validation and API-specific assertions; API runtime/provider selection and OR-019/Q-018 cost/logging/cache/CORS/rate-limit decisions; catalogue/funding record publication; implementation, CI, privacy/runtime verification, deployment and release evidence. Creating these documents does not authorize provisioning or real learner data.

## Gate assessment

**PRD READY: PASSED on 2026-10-14** after explicit owner approval of the revised PRD and measurable acceptance criteria. PR #22 merged the documentation alignment to `main`. This gate approves the requirements baseline only. Actual programme/funding catalogue curation, relationship evidence, test execution, privacy review, provisioning and deployment remain outstanding and are not claimed.

Phase 0 `PROJECT READY`, Phase 1 `PRD READY` and Phase 2 `REQUIREMENTS READY` have passed for their respective planning/requirements baselines only. Current next phase is Phase 3 architecture and ADRs. No application implementation, app test execution, Azure provisioning or deployment is claimed.

## Phase 1 PRD artifacts and approval

| Artifact | Path | Status |
|---|---|---|
| Product requirements document | `docs/product/PRD.md` | Owner-approved on 2026-10-14; `PRD READY` passed for the requirements baseline only |
| MVP acceptance criteria | `docs/product/ACCEPTANCE-CRITERIA.md` | Owner-approved on 2026-10-14; criteria are targets/test oracles, not test results |
| Policy reconciliation and review | `docs/product/POLICY-SELECTIONS-REVIEW.md` | Reconciled in PR #22, merged to `main`; see recorded owner approval in `docs/project/DECISIONS.md` |

The approval does not claim implementation, catalogue curation, test passage, privacy clearance, deployment or release readiness. Next gate: Phase 2 requirements matrix and end-to-end traceability.


## Phase 2 — Requirements matrix and traceability (updated 2026-10-14)

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Canonical requirements matrix | `docs/product/REQUIREMENTS.md` | Created — planning baseline; updated by the Phase 2 traceability audit | Nine current MVP functional requirements plus REQ-AUTH-001 future scope, and eight NFRs, mapped to acceptance/verification criteria. |
| Traceability matrix | `docs/product/TRACEABILITY-MATRIX.md` | Created — evidence pending | Requirement → PRD/AC → contract/UI → test ID → expected implementation area → CI/release evidence. Contract, implementation, CI and release evidence remain unavailable. |
| Feature backlog | `docs/product/FEATURE-BACKLOG.md` | Created — blocked items labelled | P0 core journey sequenced before P1 funding and tracker. Ambiguous behavior is not treated as an implementation task. |
| Dependency matrix | `docs/product/DEPENDENCY-MATRIX.md` | Created — planning baseline | Functional, data, privacy and verification dependencies recorded; architecture and API boundaries are not assumed. |
| Requirement gaps | `docs/product/REQUIREMENT-GAPS.md` | Created — open; gate blocked | Records catalogue, subject vocabulary, relationship, privacy, funding, tracker AC/status and interface-boundary gaps. |
| Requirements gate | — | **NOT PASSED** | Requirement IDs and planned test IDs are present, but P0 gaps and traceability evidence remain. No implementation or tests are claimed. |

### Phase 2 evidence and limits

The five requirement artifacts were committed on branch `docs/phase-2-requirements-matrix`. This update does not claim a pull request was opened, the branch was merged, tests were executed, or implementation/deployment changed. Test IDs are planned verification identifiers only. Exact AC-FUND/AC-APP references and tracker transitions require verification before those tests are implemented. See `docs/product/REQUIREMENT-GAPS.md`.


## Phase 2 GAP resolution — 2026-10-14

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Architecture decision and constraints | `docs/architecture/ARCHITECTURE.md` | Draft based on approved API-first direction | Runtime composition, privacy-boundary confirmation, provider retention and cost review remain open. |
| API interface contract | `docs/architecture/API-CONTRACT.md` | Draft — not implementation-ready | Candidate GET routes serve only public curated data. Exact schemas, cache/error semantics and runtime are pending review. |
| UJ 2027 programme catalogue register | `docs/product/PROGRAMME-CATALOGUE-REGISTER.md` | Candidate register — not publication-ready | Four UJ candidates listed; none is verified eligibility data until full rule/provenance review and curator sign-off. |
| Requirement gaps | `docs/product/REQUIREMENT-GAPS.md` | Updated — P0 evidence blockers remain | GAP-001 starting source and GAP-008 architecture direction resolved at decision level; catalogue, privacy, funding and contract evidence remain open. |

D-044 supersedes D-019's static-first selection only. Sensitive financial criteria remain excluded; unknown or unsupported criteria lead to uncertainty and official-provider direction. No implementation, tests, provisioning or deployment are claimed.


## Contract proposals and traceability extension — 2026-10-14

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Subject normalization contract | `docs/product/SUBJECT-NORMALIZATION-CONTRACT.md` | Contract reference retained; subject-catalogue-v1 policy subsequently owner-approved | T-SUB-001–012 reference tests are limited to normalization; production integration and runtime privacy remain unverified. |
| Pathway relationship evidence contract | `docs/product/PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md` | Draft proposal merged in PR #31 | Defines evidence/sign-off requirements; no relationship pair approved; GAP-003 open; T-REL-001–008 planned only. |
| Traceability registry | `docs/product/TRACEABILITY-MATRIX.md` | Updated through merged PR #79 and this proposed audit | Planned test IDs remain plans except where an exact historical CI run is cited; application/release evidence remains unavailable. |
| Canonical requirements matrix | `docs/product/REQUIREMENTS.md` | Updated planning baseline | AC-DET-007, REQ-AUTH-001 and AC-NFR cross-cutting mappings are explicitly linked; implementation evidence remains unavailable. |

Historical note: the Phase 2 gate was not passed at the time this section was written. On 2026-10-16 the owner accepted the reconciled baseline and `REQUIREMENTS READY` passed for requirements definition/traceability only. No application implementation, app test run, privacy clearance, Azure provisioning or deployment is implied.
## GAP-001 source follow-up — 2026-10-14

| Artifact | Path | Status / purpose |
|---|---|---|
| UJ 2027 catalogue source reconciliation matrix | `docs/product/UJ-2027-SOURCE-RECONCILIATION-MATRIX.md` | Updated with official CBE 2027 brochure cross-check for Business Information Technology and Information Management; search-text evidence only, no record approved. |
| UJ 2027 programme catalogue register | `docs/product/PROGRAMME-CATALOGUE-REGISTER.md` | Updated to record the stronger CBE brochure evidence and the remaining original-table/curator checks. |

The source follow-up is documentation-only. GAP-001 and the REQUIREMENTS READY gate remain open/not passed; no application tests or release evidence are implied.

### Q-020 lifecycle and implementation readiness

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Lifecycle and implementation readiness | `docs/project/Q020-LIFECYCLE-IMPLEMENTATION-READINESS.md` | Proposed; explicit owner decisions open | Data inventory, opt-in/withdrawal, retention/deletion/backups, identity/session controls, authorization, API proposals, cost gate and T-AUTH verification plan. Does not authorize implementation. |

Q-020 remains P0 and implementation readiness is not passed. See the artifact's Q020-DEC-01–14 approval register; do not infer approval from the proposal.


## Q-020 owner decisions A–E — 2026-10-15

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Q-020 gate-closure decision pack | `docs/project/Q020-DECISION-PACK.md` | Owner decisions A–E approved | Design/constraint approvals only; independent legal, provider, cost, implementation and runtime-test gates remain open. |
| Q-020 owner decision record | `docs/project/Q020-OWNER-DECISIONS-A-E.md` | Approved decision record | Records each approval and its limits; does not authorize real learner data, provisioning, production identity configuration or deployment. |

Q-020 remains **OPEN / P0** and `Q-020 IMPLEMENTATION READY` remains **NOT PASSED**. The R100/month cap is approved but cost compliance is not verified. Privacy/legal review, provider capability, executable runtime tests/CI and operational controls remain outstanding.


## Q-020 external gate evidence

| Artifact | Path | Status | Notes |
|---|---|---|---|
| G-Q020-1 external review request | `docs/project/G-Q020-1-EXTERNAL-REVIEW-REQUEST.md` | Preparation merged via PR #67; gate remains blocked | Reviewer scope, evidence limitations, decision questions and response template. No qualified review/sign-off evidenced. |
| Q-020 privacy/legal/age review pack | `docs/project/Q020-PRIVACY-LEGAL-AGE-REVIEW.md` | Prepared; not approved | Data inventory and review questions; not legal advice or proof of compliance. Real learner data remains prohibited. |


## Synthetic-only MVP verification gate — 2026-10-15

| Artifact | Path | Status | Notes |
|---|---|---|---|
| G-SYN-001 synthetic-only MVP gate | `docs/project/G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md` | Defined; **NOT PASSED** | Sets SYN-001–SYN-010 acceptance criteria for a local browser-only demo, privacy canaries, accessibility, provenance and CI. App/UI and runtime privacy evidence are not yet established. |

The inspected main tree at `e3564527b48dc0ca3cb55d4c208da5dc620b23ff` contains eligibility domain code, golden-case tests, and two workflows, but does not establish a runnable learner-facing UI, package manifest/lockfile, browser privacy harness, API, or deployment. Passing domain/contract tests does not pass G-SYN-001 or the Phase 2 `REQUIREMENTS READY` gate.


## MVP scope reconciliation — D-044–D-047

| Artifact | Path | Status | Notes |
|---|---|---|---|
| MVP scope reconciliation | `docs/product/MVP-SCOPE-RECONCILIATION-D-044-D-047.md` | Merged via PR #71 (commit `ef23f08f703d45ad7d3f9a2565c087117246cf4f`) | Separates intended API-first architecture, anonymous/authenticated scope, and the interim D-047 local synthetic-only demo. Phase 2 checklist A2 is checked; A3–A6 and the overall Phase 2 gate remain open. No implementation or runtime evidence implied. |
| Phase 2 A3 authenticated-boundary review | `docs/product/PHASE-2-A3-AUTHENTICATED-BOUNDARY-REVIEW.md` | Owner accepted 2026-10-15; A3 boundary decision recorded as D-048 | Five authenticated features remain future scope and are excluded from the current local demo; profile persistence requires separate opt-in and approved lifecycle; tracker remains page-memory-only. Exact contracts and lifecycle controls remain in Q-018 / Phase 3 and Q-020. No implementation, privacy clearance or runtime evidence implied. |

## Phase 2 traceability audit — 2026-10-15

The audit branch reconciles the pathway-detail AC-DET range, maps the approved future authenticated extension as REQ-AUTH-001, maps AC-NFR-001–005 to existing requirements, updates the OR-019 register status, adds G-SYN-001 mappings and records the bidirectional ID audit plus A4–A6/source fidelity evidence. A–D checklist evidence is marked complete on the proposed branch; the gate remains OPEN pending review/merge and explicit overall product-owner acceptance. No application implementation, runtime privacy evidence, deployment or release readiness is claimed.


## Phase 2 acceptance and Phase 3 handoff — 2026-10-16

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Phase 2 exit checklist | `docs/product/PHASE-2-REQUIREMENTS-READY-CHECKLIST.md` | **PASSED** for requirements definition and traceability | A–E satisfied; explicit owner acceptance of merged commit `aeb7b27da3a5bfc01e5f7a378f391f1d43a16c0c` recorded in D-049. |
| Owner acceptance decision | `docs/project/DECISIONS.md` (D-049) | Accepted 2026-10-16 | Acceptance conditions and exclusions are explicit; downstream gates are not waived. |

Phase 3 architecture/ADR work may begin. OR-019, Q-018, Q-020, G-SYN-001, catalogue/funding provenance, executable app/browser/privacy tests, cost validation, qualified review where required, provisioning and deployment remain open at their own gates. PR #80 contract CI passed on its PR head (run #56); no workflow result was returned for merge commit `aeb7b27da3a5bfc01e5f7a378f391f1d43a16c0c`. No application build, runtime privacy test, provisioning or deployment is claimed.


## Phase 3 architecture artifacts — 2026-10-16

The following artifacts are present on branch `docs/phase-3-architecture-baseline` as **proposed/draft architecture for owner review**, not approved implementation contracts. Existing D-044–D-047 boundaries and Q-018/Q-020 gates are preserved.

| Artifact | Path | Status | Notes |
|---|---|---|---|
| System architecture | `docs/architecture/ARCHITECTURE.md` | Draft — review required | Components, boundaries, flows, failure/recovery, scalability, availability and cost constraints; explicitly not architecture-ready |
| Data model | `docs/architecture/DATA-MODEL.md` | Proposed — review required | Logical catalogue entities, provenance, constraints, indexes, lifecycle and ownership; no database approved |
| Security architecture | `docs/architecture/SECURITY-ARCHITECTURE.md` | Draft — runtime unverified | Trust boundaries, current privacy rules, future authentication gates and threat checklist |
| Infrastructure | `docs/architecture/INFRASTRUCTURE.md` | Proposed — no provisioning authorized | Environments, candidate Azure services, CI/CD, Terraform, cost controls, deployment and rollback |
| Observability | `docs/architecture/OBSERVABILITY.md` | Proposed — not implemented | Privacy-preserving logs/metrics/alerts, operational signals and verification checklist |
| ADR index | `docs/architecture/ADR-INDEX.md` | Draft — review required | Index of five decisions and gate rule |
| ADR-001 | `docs/architecture/ADR-001.md` | Accepted direction; details open | API-first boundary and tiered data handling; not runtime authorization |
| ADR-002 | `docs/architecture/ADR-002.md` | Proposed | Curated provenance and deterministic eligibility |
| ADR-003 | `docs/architecture/ADR-003.md` | Privacy boundary accepted; future controls proposed | Anonymous privacy and gated authenticated extension |
| ADR-004 | `docs/architecture/ADR-004.md` | Proposed — no provisioning authorized | Infrastructure composition and R100/month cost gate |
| ADR-005 | `docs/architecture/ADR-005.md` | Proposed | Privacy-preserving observability and recovery |

### Phase 3 readiness

**Architecture gate: NOT PASSED.** These documents record a coherent proposal, but owner review/freeze is still required for API contract/runtime composition, eligibility rule semantics and golden set, pilot publication evidence, CI requirements, cost/resource list, and (before any authenticated or real-learner-data use) identity, authorization, consent/lifecycle and privacy controls. No implementation, tests, CI result, cloud provisioning or deployment is implied by artifact creation.


## Phase 3 architecture gate evidence

| Artifact | Path | Status |
|---|---|---|
| Architecture readiness review and requirement/security/trade-off traceability | `docs/architecture/ARCHITECTURE-READINESS-REVIEW.md` | Added for the Phase 3 `ARCHITECTURE READY` pass; design/traceability only, not implementation or release evidence |

Phase 3 `ARCHITECTURE READY` is passed. Phase 4 API/interface contracts is the current phase. Q-018, Q-020, Q-019, G-SYN-001 and implementation/release evidence remain open where applicable.


## Phase 4 validation evidence — 2026-10-16

PR #89 merged as `bbad7b869a1e2e59184d37c486a7185d70e809f5`. The merge-commit OpenAPI validation, contract tests and UJ eligibility golden-case verification all passed: [OpenAPI](https://github.com/s1xte3n/studypath-sa/actions/runs/38912794797), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/38912794987), [golden cases](https://github.com/s1xte3n/studypath-sa/actions/runs/38912795061). This is automated documentation/contract-test evidence, not runtime, privacy, catalogue-publication or deployment evidence. Phase 4 is not passed. Remaining work includes owner contract review, OR-019/Q-018 provider/runtime, network/cache/rate-limit/retry/logging and cost decisions, and verification/sign-off of publication-ready catalogue records.


## Phase 4 continuation artifacts — 2026-10-16

- `docs/product/FUNDING-CATALOGUE-REGISTER.md` — official-source research register for initial funding candidates. NSFAS 2027 is a research lead only; conflicting official closing-date statements block publication pending clarification and curator sign-off.
- `docs/project/DECISIONS.md` — D-052 records owner approval to continue with the public catalogue contract baseline and reiterates the implementation/provisioning limits.
- Owner approval permits continued Phase 4 work; it does not pass the contract gate. Runtime/provider/cost decisions, source-backed publication records, runtime privacy and release evidence remain outstanding.


## Synthetic-only browser privacy evidence update — 2026-10-18

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Synthetic-only MVP gate | `docs/project/G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md` | Updated for main `bf137ec9060d59942ded92af258e2bf9e23cbc0a` | Reconciles PRs #132/#133 and merge-commit CI evidence; gate remains **NOT PASSED**. |
| Browser lifecycle privacy tests | `tests/e2e/student-form.spec.mjs` | PR #132 merged | Tests selected in-memory lifecycle behavior across storage APIs, reload and new-tab contexts. |
| Browser privacy channel instrumentation | `tests/e2e/student-form.spec.mjs` | PR #133 merged | Test-only instrumentation for additional browser channels and sentinel checks; not a complete provider/hosting or compliance audit. |

Merge-commit workflows passed: [browser E2E/privacy/accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39118371483), [browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39118371484), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39118371572), [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/39118371618). These are remote CI results; no local test execution or release readiness is implied.


## Privacy-test false-positive correction — 2026-10-18

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Synthetic-only MVP gate | `docs/project/G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md` | Updated for PR #135 merge `9cde29ae3bb6c3d928c30549a35be9c4fe95f94e` | Records PR-head CI evidence and distinguishes it from merge-commit evidence; G-SYN-001 remains NOT PASSED. |
| Project status | `docs/project/PROJECT-STATUS.md` | Updated for PR #135 | Records the sentinel-collision root cause, passing PR-head workflows and evidence limitation. |
| Privacy test sentinel | `tests/e2e/student-form.spec.mjs` | PR #135 merged | Uses a distinctive sentinel instead of `93` to prevent incidental asset URL matches; mark-specific leakage checks remain. |

All four PR-head workflows passed on `973f5c10e3a8b261639d0c9c219e63532c92c6d5`: [browser E2E/privacy/accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39119250982), [browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39119250960), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39119250884), and [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/39119250985). No workflow runs were returned for merge commit `9cde29ae3bb6c3d928c30549a35be9c4fe95f94e`; no local tests, deployment or release readiness are claimed.


## Hackathon implementation baseline — 2026-10-21

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Hackathon implementation baseline | `docs/project/HACKATHON-IMPLEMENTATION-BASELINE.md` | Proposed for review in PR | Freezes the P0 local synthetic-only student journey, explicit production deferrals, implementation sequence, demo-ready evidence, and submission deliverables. Does not claim implementation or gate completion. |
| Hackathon-first delivery decision | `docs/project/DECISIONS.md` — D-054 | Proposed in PR | Records owner direction to prioritise a judge-ready product now and production hardening after the event, without waiving privacy or correctness requirements. |


## Hackathon implementation handoff — 2026-10-21

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Hackathon implementation baseline | docs/project/HACKATHON-IMPLEMENTATION-BASELINE.md | Approved scope direction under D-054; implementation/gate still open | Defines the synthetic-only P0 slice and post-event production deferrals. |
| Hackathon implementation handoff | docs/project/HACKATHON-IMPLEMENTATION-HANDOFF.md | Added on this PR branch | Vertical-slice order, affected code paths, requirement/test traceability, verification expectations and merge/demo gate. |
| Hackathon submission checklist | docs/project/HACKATHON-SUBMISSION-CHECKLIST.md | Added on this PR branch | Programme-based deck/video/SSDLC/Lean Business Canvas requirements plus proposed demo and submission rehearsal. |
| Project status | docs/project/PROJECT-STATUS.md | Updated on this PR branch | Records current implementation gap and next action; no tests or release are claimed. |

This documentation handoff does not pass G-SYN-001, Phase 4 runtime validation, quality/delivery/release gates, or authorize cloud provisioning, public deployment or real learner data.


## Phase 5–7 implementation branch update — 2026-10-21

Branch: `feat/hackathon-pathway-results-phases-5-7` (not yet merged; CI pending).

| Artifact | Path | Status |
|---|---|---|
| Pathway adapter | `src/domain/pathway-matching.mjs` | Added on implementation branch; CI pending |
| Learner journey/results UI | `src/main.jsx`, `src/styles.css` | Updated on implementation branch; browser CI pending |
| Adapter tests | `tests/pathway-matching.test.mjs` | Added; execution pending |
| Postman collection | `tests/postman/StudyPath-SA-API.postman_collection.json` | Contract-scoped; not run because no runtime is verified |
| Postman environment template | `tests/postman/StudyPath-SA-environment-template.json` | Non-secret template; API_BASE_URL disabled until runtime is approved |
| Environment variables | `docs/config/ENVIRONMENT-VARIABLES.md` | Initial repository-based inventory; review required as runtime evolves |
| Environment matrix | `docs/config/ENVIRONMENT-MATRIX.md` | Initial local/CI/deployment boundary inventory |
| Secret handling | `docs/config/SECRETS-MANAGEMENT.md` | Local MVP boundary documented; repository/provider secrets not audited |
| Test data | `docs/config/TEST-DATA.md`, `docs/testing/TEST-DATA-PLAN.md` | Synthetic-only lifecycle documented |
| Test strategy | `docs/testing/TEST-STRATEGY.md` | Initial strategy; must be reconciled against full requirement matrix |
| Test matrix/cases/priorities/release gates | `docs/testing/TEST-MATRIX.md`, `TEST-CASES.md`, `TEST-PRIORITIES.md`, `RELEASE-GATES.md` | Initial vertical-slice traceability; not a complete all-requirement sign-off |
| Project status | `docs/project/PROJECT-STATUS.md` | Branch snapshot appended; implementation and CI not yet accepted |
