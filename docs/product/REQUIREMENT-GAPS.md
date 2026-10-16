# StudyPath SA — Requirement Gaps

**Status:** Open downstream gap register after Phase 2 `REQUIREMENTS READY` passed on 2026-10-16. These gaps do not reopen requirements readiness unless new evidence reveals a requirement ambiguity or contradiction. Ambiguous requirements are not implementation tasks.  
**Sources:** Approved PRD, acceptance criteria and OPEN-REQUIREMENTS.md.

## Blocking gaps

| Gap ID | Priority | Requirement(s) | Gap | Evidence / decision required | Owner | Disposition |
|---|---:|---|---|---|---|---|
| GAP-001 | P0 | REQ-CAT-001, NFR-DATA-001 | Seven UJ candidates now have preliminary official-source code/threshold leads, but none is a publication-ready record and the 6–8 verified-record target is unmet | Verify full 2027 applicability, code, campus, subject grades, programme-specific APS formula/inclusions, conditions/exceptions, official next steps, source freshness/version and curator sign-off. Resolve B2E01Q (older Academy page) versus B2E02Q (2027 prospectus/current programme page); reconcile Diploma in Business Information Technology code D1I40J (indexed 2027 prospectus) versus DI1401 (current page); reconcile BCom Information Management APS wording in 2027 prospectus versus current programme page before publication. | Product owner/curator | Starting-source decision resolved; preliminary evidence captured; definitive catalogue acceptance remains blocked |
| GAP-002 | P0 | REQ-EXP-001, REQ-MAT-001, REQ-PRV-001 | Owner-approved subject-v1 contract and traceability were previously inconsistent; runtime and evaluator guarantees remain unverified | PH2-002 aligns T-SUB-001–012 descriptions to the checked-in reference suite and corrects canonical display-label output. PR #79 then reconciled planned verification IDs across the requirements matrix, traceability registry and backlog; its latest PR-head contract-test workflow passed run [#52](https://github.com/s1xte3n/studypath-sa/actions/runs/38785826810) at commit `a6e3d2378595049c340f5654ece5ee6a723327d2`. This does not verify the current merge commit, app behavior or runtime privacy. Keep programme-level UNKNOWN, duplicate rejection, dictionary refresh, and runtime request/URL/log/telemetry privacy as separate obligations. | QA/documentation owner; implementation/security owners for later evidence | Documentation mapping corrections merged; GAP-002 remains open for current application/CI, evaluator and runtime/privacy evidence |
| GAP-003 | P0 | REQ-ALT-001 | Verified pathway relationship set not evidenced | Draft proposal in [`PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md`](./PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md) defines relationship types, source/sign-off requirements, candidate dispositions and planned tests. Exact programme-pair evidence and owner/curator approval remain outstanding. | Product owner/curator | Proposal available for review; no pair approved; GAP-003 remains open |
| GAP-004 | P0 | REQ-PRV-001, NFR-PRV-001 | API-first adds a network boundary, but host/provider retention, API logs, browser storage, dependencies and actual request payloads have not been inspected | Verify provider/runtime configuration, logs/retention, request payloads, browser storage/history, dependencies/telemetry and privacy notice; catalogue API requests must contain no learner profile values | Security/privacy + owner | Open release blocker; synthetic-only remains; no public learner-input demo until evidenced |
| GAP-005 | P1 | REQ-FUND-001 | Required 3–5 current official-source funding records not verified | Curate criteria, document checklist metadata, published coverage/amount, deadline/timezone, cycle, verification/version/sign-off | Product owner/curator | P1 funding blocked on records |
| GAP-006 | P0 | REQ-APP-001 | Tracker transition table needed cross-check | **Resolved by Phase 2 source inspection:** PRD and OR-016 agree on the allowed transitions and terminal states. Preserve these rules in test cases. | QA/documentation owner | Resolved; no longer a gate blocker |
| GAP-007 | P0 | REQ-FUND-001, REQ-APP-001 | Exact funding/tracker acceptance-criteria ranges were initially unverified | **Resolved by Phase 2 source inspection:** AC-FUND-001–009 and AC-APP-001–009 were confirmed in ACCEPTANCE-CRITERIA.md and linked in the matrix. | QA/documentation owner | Resolved; no longer a gate blocker |
| GAP-008 | P0 | All requirements | API-first direction is owner-approved, but runtime composition, route/schema details, API Management necessity, cache/failure semantics and privacy boundary are not frozen | Review `docs/architecture/ARCHITECTURE.md` and draft `docs/architecture/API-CONTRACT.md`; confirm catalogue-only requests, error/cache semantics, runtime services and costs | Architect/product owner + cloud/privacy owner | Direction resolved; contract/cost/privacy decisions remain open; no provisioning |

## High-priority verification gaps

| Gap ID | Priority | Requirement(s) | Gap | Evidence / decision required | Disposition |
|---|---:|---|---|---|---|
| GAP-009 | P1 | NFR-PERF-001 | p95 ≤1 s target lacks named device/browser and benchmark protocol | Record device/OS/browser, dataset, warm-up, repetitions and percentile calculation | T-PERF-001 is planned only |
| GAP-010 | P1 | NFR-ACC-001 | Browser versions, tooling and accessibility evidence format not recorded | Record versions, viewports, automated findings and manual keyboard/screen-reader checks | No conformance claim without evidence |
| GAP-011 | P1 | REQ-MAT-001 | Some programmes may require unsupported APS or subject-equivalence rules | Per-record rule representability review; unsupported rules stay UNKNOWN | Do not invent formula |
| GAP-012 | P1 | NFR-REL-001 | API-first introduces a network dependency; timeout/retry/cache/fallback and availability targets are not approved | Define bounded loading, stale-data, timeout/retry and API-failure behavior before implementation; never fabricate fallback data | No numeric network SLO assumed; resilience contract open |
| GAP-013 | P1 | REQ-APP-001 | Persistent tracker storage conflicts with approved privacy boundary | No action for current scope; formal change control and privacy/security approval required for future persistence | Persistence explicitly excluded |

## Conflict and duplication review

- Funding and tracker scope conflict: resolved by owner; both are intended MVP at P1 behind the P0 journey.
- Persistence conflict: resolved; both profile and tracker remain page-memory-only. No localStorage, sessionStorage, IndexedDB, cookies, server/database or cloud sync.
- Weighted preference score: excluded. Results group by eligibility state and use stable catalogue order; supported preference fit may be plain-language only.
- Architecture: API-first selected by D-044, superseding D-019's static-first selection. This does not approve sending learner inputs to an API; catalogue-only responses are the safe default pending OR-019/Q-018.
- Programme source: UJ 2027 prospectus selected as the starting source. Candidate records are research leads, not publication-ready data.
- Next steps: official links and neutral source-backed guidance only; no personalized task planner or predefined action taxonomy.
- Cost planner and AI/document assistant: deferred from initial MVP.
- National coverage: the catalogue is a 6–8-record pilot prioritising Gauteng; no comprehensive national claim.
- Test IDs, criteria and requirements do not prove implementation, tests, CI or release readiness. Reference normalizer tests do not establish production evaluator semantics or runtime privacy.

## Gate assessment

- [x] Unique IDs/priorities assigned to nine functional requirements and eight NFRs.
- [x] Planned verification IDs assigned to each requirement.
- [x] Funding/tracker acceptance-criteria ranges and the OR-016 lifecycle cross-checked against the approved source documents (GAP-006/007 resolved as documentation checks).
- [x] Requirements and acceptance criteria explicitly identify unresolved programme-data, relationship, privacy, architecture and quality constraints without treating missing implementation evidence as completed work.
- [ ] Resolve any remaining product-behavior ambiguity that changes requirement scope or acceptance criteria.
- [ ] Complete the Phase 2 cross-document consistency review and obtain explicit product-owner gate acceptance.

The following are tracked as later data-curation, architecture, implementation, test, security/privacy or release evidence—not automatic Phase 2 requirements-completeness blockers: completing the 6–8 publication-ready programme records; obtaining 3–5 verified funding records (P1); approving any relationship pairs (an empty set is allowed); runtime privacy inspection; final API/runtime/cost decisions; executable app/UI paths; test execution; CI and release evidence.

**Decision (superseded 2026-10-16):** The product owner accepted the reconciled requirements baseline at merged commit `aeb7b27da3a5bfc01e5f7a378f391f1d43a16c0c`; `REQUIREMENTS READY` is PASSED for requirements definition and traceability only (D-049). GAP-001 catalogue publication, GAP-003 relationship publication, GAP-004 privacy assurance, GAP-005 funding records, and GAP-008 detailed architecture/contract decisions remain open for their applicable downstream gates. This status does not claim implementation, tests beyond the cited contract CI, runtime privacy verification or release readiness.


## UJ 2027 source reconciliation note — 2026-10-14

The catalogue register now records preliminary values from official UJ search-indexed prospectus text and current programme pages. They remain research leads only: do not load them into an eligibility evaluator as verified requirements. The older Academy undergraduate-courses page labels the extended CSI programme B2E01Q, whereas the indexed 2027 prospectus and current programme page label it B2E02Q. Treat the conflict as unresolved until the full applicable 2027 source/yearbook and official programme guidance are reconciled. GAP-001 remains open.


## Additional UJ catalogue source conflicts — 2026-10-14

Seven candidates are now documented as preliminary research leads. Two additional conflicts have been identified alongside the existing extended-CSI code conflict: (1) Diploma in Business Information Technology is labelled D1I40J in indexed 2027 prospectus text and DI1401 on the current programme page; (2) BCom in Information Management has different APS wording in the 2027 prospectus and current programme page. The current programme pages expose a 2026 application window, so their general metadata must not be assumed to fully establish 2027 requirements. GAP-001 remains open; no preliminary value is approved for definitive eligibility screening.


## Catalogue reconciliation matrix — 2026-10-14

Added [`UJ-2027-SOURCE-RECONCILIATION-MATRIX.md`](./UJ-2027-SOURCE-RECONCILIATION-MATRIX.md) to track official sources, candidate-level requirements, evidence gaps, source conflicts, curator checks and traceability. This improves evidence management but does not close GAP-001: original 2027 PDF tables still need visual/page-level verification, complete admission rules and APS calculations remain to be reviewed, and no candidate has curator sign-off. The Diploma Business IT code difference may be a search-extraction/OCR issue because the official 2027 CBE brochure and current programme page show DI1401; inspect the central prospectus table before concluding. The Information Management APS appears conditional in prospectus table text and requires original-table confirmation. GAP-001 remains P0/open.


## Pathway relationship evidence proposal — 2026-10-14

Added [`PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md`](./PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md) as a draft for GAP-003. It separates alternatives, related-field suggestions, progression and formal articulation; requires exact official-source provenance and curator sign-off; and prohibits inferring a relationship from similar titles or generic NQF rules alone. Official UJ admissions/regulations sources provide general context but do not approve a specific pair in the seven-programme pilot. No pair is approved, no learner-facing relationship should be published from this proposal, and planned tests T-REL-001–008 have not been implemented or run. GAP-003 remains open.

## Requirements-gate reconciliation — 2026-10-14

This section supersedes the earlier blanket statement that all open P0/P1 gaps block the requirements gate. Priority describes product/release criticality; it does not mean every data, implementation, infrastructure or release evidence item must be complete before architecture can be designed.

| Gap | Requirements gate | Blocking gate / safe current disposition |
|---|---|---|
| GAP-001 (P0 catalogue records/source conflicts) | Requirement and acceptance threshold are explicit; conflicts are recorded, not resolved by assumption. Does not block architecture planning. | Blocks publication of affected records and confident eligibility. Keep conflicting rules out of the verified catalogue; material uncertainty yields UNKNOWN. |
| GAP-002 (P0 subject contract) | Owner-approved v1 contract and executable reference tests exist at SUBJECT-CATALOGUE-V1-APPROVAL.md and tests/contracts/subject-catalogue-v1.test.mjs. | Test execution is not verified; production behavior and privacy boundary remain unverified. |
| GAP-003 (P0 relationships) | Requirement explicitly allows no verified alternative; the evidence contract states the threshold. No pair is required to define the requirement. | Keep relationship data empty until exact evidence and curator sign-off exist. |
| GAP-004 (P0 privacy) | Privacy invariant and prohibited data flows are explicit. | Release blocker until requests, URLs, browser storage, logs, telemetry, dependencies and provider retention are inspected. Contract design must preserve catalogue-only requests. |
| GAP-005 (P1 funding) | Scope, priority and AC-FUND-001–009 are defined. | Funding feature remains blocked until 3–5 current official-source records are curated; does not block P0 requirements readiness. |
| GAP-008 (P0 API/runtime) | API-first direction is decided; unresolved route/schema/runtime/cache/error/cost decisions are explicitly downstream architecture and API-contract work. | Blocks implementation/provisioning until architecture, contract, environment and cost review are approved. No provisioning is authorized here. |
| GAP-009–012 (P1 quality/resilience) | Quality targets and safe behavior are stated; missing protocols are explicit. | Resolve protocol details before dependent implementation/verification; retain test evidence placeholders. |

**Requirements-gate disposition (2026-10-16):** No open finding in this register required silently changing an approved requirement or inventing data to define it. The product owner accepted the reconciled baseline and Phase 2 passed for requirements definition/traceability; Phase 3 architecture may begin. The gap rows remain active at their stated downstream gates. This does not declare catalogue, runtime, test, privacy, CI-on-merge-commit or release evidence complete.

### Evidence placeholders (intentionally not completed)

- Implementation paths/symbols: Not verified
- Test execution commands/results: Not run / not verified in this review
- CI workflow/run URL and tested commit: Not available
- Runtime privacy inspection: Not performed
- Deployment/smoke test/release approval: Not available


## Phase 2 gate acceptance — 2026-10-16

D-049 records explicit product-owner acceptance of the requirements baseline at merged commit `aeb7b27da3a5bfc01e5f7a378f391f1d43a16c0c`. Phase 2 `REQUIREMENTS READY` is PASSED for requirements definition and traceability only. Keep each gap open until its own evidence is satisfied; if downstream work reveals a missing or contradictory requirement, reopen the relevant Phase 2 issue through change control.
