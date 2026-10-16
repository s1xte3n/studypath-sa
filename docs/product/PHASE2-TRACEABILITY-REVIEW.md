# Phase 2 — Final Requirement Traceability Review

**Review date:** 2026-10-14; final owner gate acceptance recorded 2026-10-16  
**Status:** A4–A6 source/scope review and traceability corrections were merged in PR #80. The product owner accepted the reconciled baseline on `main` commit `aeb7b27da3a5bfc01e5f7a378f391f1d43a16c0c`; Phase 2 `REQUIREMENTS READY` is **PASSED for requirements definition and traceability only** (D-049). Downstream implementation, catalogue, privacy, test, CI/release and deployment gates remain open.  
**Baseline:** `docs/product/REQUIREMENTS.md`, `docs/product/ACCEPTANCE-CRITERIA.md`, `docs/product/TRACEABILITY-MATRIX.md`, `docs/product/REQUIREMENT-GAPS.md`, approved PRD and owner approval record.  
**Evidence rule:** A planned test ID, draft contract, approved requirement, or owner attestation is not evidence of implementation, execution, CI success, privacy verification, or release readiness.

## 1. Review conclusion

The requirement → acceptance criteria → planned test ID links are substantially present for all nine functional requirements and eight NFRs. The traceability matrix names expected UI/contract surfaces and implementation areas. The tracker lifecycle and funding/tracker AC ranges have been cross-checked in planning documents.

This review does **not** find a complete implementation trace. The contract/UI column often describes a target surface rather than a concrete source path; the test registry consists of design IDs, not executable tests; implementation, CI, and release evidence are unavailable. The API contract is explicitly draft. The subject-v1 approval and test file references should be checked against actual repository contents and executed evidence before claiming closure.

## 2. Requirement-by-requirement traceability

| Requirement | Acceptance criteria | Contract/UI surface currently identified | Planned test IDs | Implementation evidence | CI evidence | Release evidence / blocker |
|---|---|---|---|---|---|---|
| `REQ-EXP-001` | `AC-EXP-001–014` | Anonymous explorer form; validation; subject dictionary/normalization proposal; page-memory state | `T-EXP-001–004`, `T-SUB-001–010` | **Not verified**; no implementation path/evidence recorded in the matrix | **Not available** | Subject v1 needs repository/test execution cross-check; privacy boundary remains release-blocking |
| `REQ-CAT-001` | `AC-CAT-001–012` | Draft `GET /api/v1/programmes`; catalogue response, provenance, empty/stale states | `T-CAT-001–003`, `T-API-001–002`, `T-API-004` | **Not verified** | **Not available** | 6–8 publication-ready programme records and curator sign-off not evidenced; source conflicts remain open |
| `REQ-MAT-001` | `AC-MAT-001–021` | Deterministic evaluator, rule/reason model, eligibility results and stable grouping; no frozen runtime contract | `T-MAT-001–004` | **Not verified** | **Not available** | Golden-set cases and evaluator results not evidenced; incomplete rules must stay `UNKNOWN` |
| `REQ-ALT-001` | `AC-ALT-001–007` | Draft relationship evidence contract; alternatives/related-field empty state | `T-ALT-001–002`, `T-REL-001–008` | **Not verified** | **Not available** | No named relationship pair approved; empty relationship catalogue is safer than inferred relationships |
| `REQ-DET-001` | `AC-DET-001–007` | Pathway detail, source links, unknown/missing state | `T-DET-001–002` | **Not verified** | **Not available** | No release evidence recorded |
| `REQ-PRV-001` | `AC-PRV-001–013` | Privacy notice/reset; memory-only inputs; catalogue-only API boundary | `T-PRV-001–004`, `T-API-003`, `T-SUB-009` | **Not verified** | **Not available** | **Release blocker:** requests, browser storage, URLs, logs, telemetry, provider retention and dependencies must be inspected |
| `REQ-UX-001` | `AC-UX-001–011` | Mobile-first learner journey; validation/loading/empty/error/retry states | `T-UX-001–003`, `T-API-002` | **Not verified** | **Not available** | Accessibility and recovery-state evidence not available |
| `REQ-FUND-001` (P1) | `AC-FUND-001–009` | Draft `GET /api/v1/funding-opportunities`; limited-input matching and source/deadline display | `T-FUND-001–003`, `T-API-001–002`, `T-API-004` | **Not verified** | **Not available** | 3–5 current, official-source funding records not verified; feature remains blocked until records are curated |
| `REQ-APP-001` (P1) | `AC-APP-001–009` | Manual tracker, approved lifecycle, page-memory-only list/form | `T-APP-001–004` | **Not verified** | **Not available** | Lifecycle/AC mapping checked in planning; runtime memory-only behavior and tests unverified |
| `REQ-AUTH-001` (approved future scope; excluded from D-047 demo) | `AC-AUTH-001–016` | Authenticated API/identity, authorization/isolation, profile opt-in lifecycle, saved items, comparison and dashboard; exact contracts pending Q-018/Q-020 | `T-AUTH-001–018`, `T-PRV-001–006`, `T-API-001–004` | Future authenticated boundary and lifecycle controls | **Not available** | Not authorized for implementation; contract, privacy/security, tests and cost gates remain open |
| `NFR-SEC-001` | NFR requirement in `REQUIREMENTS.md` | Build/hosting/network boundary; HTTPS/no client secrets/trusted validation | `T-SEC-001`, `T-API-004` | **Not verified** | **Not available** | Security/configuration evidence not available |
| `NFR-PRV-001` | NFR requirement in `REQUIREMENTS.md` | Storage/network/log/telemetry inspection | `T-PRV-001–004`, `T-API-003` | **Not verified** | **Not available** | **Release blocker** until verified |
| `NFR-DATA-001` | NFR requirement in `REQUIREMENTS.md` | Structured official-source metadata and catalogue validation | `T-CAT-001`, `T-MAT-003`, `T-API-001`, `T-API-004` | **Not verified** | **Not available** | Source/cycle/freshness/sign-off completeness not evidenced |
| `NFR-REL-001` | NFR requirement in `REQUIREMENTS.md` | Bounded loading, stale/empty/error states; draft API failure semantics | `T-CAT-002`, `T-UX-003`, `T-API-002` | **Not verified** | **Not available** | Timeout/retry/cache semantics need approval before implementation |
| `NFR-ACC-001` | NFR requirement in `REQUIREMENTS.md` | All learner-facing UI; WCAG 2.2 AA target at 320 CSS px | `T-UX-001–002` | **Not verified** | **Not available** | Browser/tooling protocol and accessibility evidence not available |
| `NFR-PERF-001` | NFR requirement in `REQUIREMENTS.md` | In-browser evaluator/benchmark | `T-PERF-001` | **Not verified** | **Not available** | Device/browser protocol and p95 results not available |
| `NFR-COMP-001` | NFR requirement in `REQUIREMENTS.md` | Results/funding/detail copy review | `T-COMP-001` | **Not verified** | **Not available** | Copy review evidence not available |
| `NFR-SCOPE-001` | NFR requirement in `REQUIREMENTS.md` | Catalogue-scope disclosure and no-results state | `T-CAT-003` | **Not verified** | **Not available** | Scope-copy evidence not available |

## 3. Test-ID and contract/UI review

- Every listed requirement has planned verification IDs in the current traceability matrix.
- The acceptance-criteria document states each AC maps to one PRD requirement. The funding and tracker AC ranges are present and referenced.
- `T-API-001–004` are explicitly planned and must be checked against the frozen API contract before implementation.
- `T-SUB-001–010` and `T-REL-001–008` remain planned contract tests. Their documents describe target behavior, not executed verification.
- The matrix's “Contract or UI” entries are mostly logical surfaces, not verified source-file paths. During implementation, replace/augment these with exact repository paths and symbols/components.
- The API contract is `DRAFT / NOT IMPLEMENTATION-READY`; no routes/schema/runtime/caching/error contract should be described as frozen.
- No implementation path, CI run ID/URL, tested commit, deployment URL, smoke-test result, or release approval was verified during this review. These fields must stay **Not available** until actual evidence is linked.

## 4. Open issues and safe disposition

| Issue | Phase 2 disposition | Downstream consequence |
|---|---|---|
| Programme catalogue/source conflicts and 6–8 record target (`GAP-001`) | Keep open; do not treat research leads as verified catalogue records | Catalogue publication and confident eligibility are blocked until reviewed records exist |
| Subject dictionary (`GAP-002`) | Owner-approved v1 direction is recorded, but confirm exact approved artifact and execute contract tests; keep runtime proof open | Unsupported/ambiguous subjects cannot be guessed; affected eligibility remains `UNKNOWN` |
| Relationship evidence (`GAP-003`) | Keep relationship set empty until a specific pair has evidence and curator sign-off | Do not invent alternatives or imply articulation |
| Privacy boundary (`GAP-004`) | Requirement is approved; runtime/provider verification is not complete | Release blocker; learner inputs must remain page-memory-only and absent from API requests, URLs, storage, logs and telemetry |
| Funding catalogue (`GAP-005`) | Align gap priority to P1, matching `REQ-FUND-001`; keep funding feature blocked on verified records | Core P0 pathway journey remains separable; do not make funding claims without verified records |
| API runtime/route/schema/cache/error/cost (`GAP-008`) | Keep implementation decisions in Phase 3 architecture and Phase 4 contract, with environment/cost verification in Phase 5; preserve catalogue-only API boundary | No provisioning; retain R100/month cap and no learner-profile payloads |
| Performance/accessibility/network protocol (`GAP-009–012`) | Carry as explicit verification/design work into architecture/test strategy and implementation gates | No unsupported performance or accessibility conformance claim |
| Persistence (`GAP-013`) | Excluded by approved scope; any change requires change control | Tracker/profile remain page-memory-only |

## 5. Evidence register template

Populate only when evidence exists. Do not replace “Not available” with an assumption.

| Evidence type | Required record | Current state |
|---|---|---|
| Implementation | Exact path(s), relevant symbol/component, commit SHA | Not available / not verified |
| Executable tests | Test file path, exact command, pass/fail counts, environment | Not available / not verified |
| CI | Workflow/run URL, commit SHA, result, timestamp | Not available / not verified |
| Privacy/security | Request capture, storage/log/telemetry review, provider retention/config evidence, reviewer/date | Not available / not verified |
| Catalogue | Catalogue version, each source URL/page/cycle, verification date, conflicts, curator sign-off | Not complete |
| Deployment | Environment, deployed commit, URL, smoke-test command/results, rollback reference | Not available / not verified |
| Release | Acceptance sign-off, known limitations, unresolved blockers, approval/date | Not available / not verified |

## 6. Gate decision

**Phase 2 remains NOT PASSED in the canonical matrix.** This review improves traceability and corrects a priority inconsistency; it does not certify source-data completion, runtime privacy, implementation, tests, CI, or release readiness.

Before changing the gate, the project owner/reviewer must confirm:
1. This requirement-to-AC-to-test mapping is accepted.
2. Each remaining P0 ambiguity is either resolved or explicitly bounded so that the behavior is unambiguous and safe.
3. Contract/UI target surfaces are sufficient at requirements level; exact implementation paths are intentionally deferred until implementation.
4. Catalogue, subject, relationship and funding records remain data/evidence gates, not assumptions hidden in the requirements.
5. The next phase begins with architecture work; API route/schema/runtime/cache/error/cost choices remain unfrozen until their appropriate gates.

**Recommended next gate after this review is accepted:** Phase 3 — Architecture. Phase 3 must not weaken the page-memory-only privacy boundary or the R100/month cap. Phase 2 acceptance does not authorize infrastructure provisioning or deployment.


## 6. A4–A6 source/scope audit and traceability corrections — 2026-10-15

### Artifacts reviewed

- Product baseline and user stories: `PRD.md`, `USER-STORIES.md`, `SCOPE.md`, `OPEN-REQUIREMENTS.md`.
- Requirement and verification chain: `ACCEPTANCE-CRITERIA.md`, `REQUIREMENTS.md`, `TRACEABILITY-MATRIX.md`, `FEATURE-BACKLOG.md`, `DEPENDENCY-MATRIX.md`, `REQUIREMENT-GAPS.md`.
- Governance/handoff: `PHASE-2-REQUIREMENTS-READY-CHECKLIST.md`, `DECISIONS.md`, `OPEN-QUESTIONS.md`, `PROJECT-STATUS.md`, `ARTIFACT-INDEX.md`, `G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md`.
- Supplied source references: `SPEC-1-StudyPath-SA.txt`, `FNB AOTY Hackathon 2026 - Programme.pdf`, and `Standard_Project_Operating_Procedure_Software_Development_Final.docx`, with the Phase 0 source notes retained in `PHASE0-ONLINE-EVIDENCE.md`.

### Reconciliations made

| Finding | Correction | Evidence / remaining boundary |
|---|---|---|
| `AC-DET-007` existed in the acceptance criteria but the PRD, canonical matrix and traceability row referenced only `AC-DET-001–006`. | Aligned the PRD, canonical requirements matrix and traceability matrix to `AC-DET-001–007`. | Documentation mapping only; tests remain planned. |
| `REQ-AUTH-001` and `AC-AUTH-001–016` described owner-approved D-046/D-048 future scope but the canonical requirements matrix omitted the requirement. | Added `REQ-AUTH-001` as P3/future scope in the PRD and canonical matrix; aligned user-story scope note and traceability row. | Authenticated implementation remains excluded from D-047/G-SYN-001 and blocked by Q-018/Q-020, privacy/security, tests and cost gates. |
| `AC-NFR-001–005` were defined as cross-cutting verification criteria but had no explicit canonical requirement mapping. | Added a mapping table to the canonical requirements and traceability matrices; clarified that these are cross-cutting controls, not separate product NFRs. | AC-COST-FUT and AC-AI-FUT remain future criteria tied to OR-017/OR-018, not initial-MVP gates. |
| The open-requirements and artifact-index summaries stopped at OR-018 although OR-019 had been added. | Updated current summaries to show OR-001–OR-018 dispositions recorded and OR-019 explicitly open. | OR-019's runtime/API composition, provider-retention and cost choices remain assigned to Q-018/Phase 3 and later gates. |
| The synthetic-only gate traceability table covered only part of the current demo requirement set. | Added explicit G-SYN-001 mappings for catalogue, relationships, detail views, accessibility, funding's gated/disabled state, and the relevant NFRs. | Mapping only; all implementation/CI/runtime evidence fields remain unavailable. |
| GAP-002 still called the PR #79 traceability correction “proposed.” | Updated it to record PR #79 merge and its exact PR-head contract-test run. | Run #52 passed at PR-head commit `a6e3d2378595049c340f5654ece5ee6a723327d2`; this is not CI evidence for the merge commit or application/runtime behavior. |

### Bidirectional identifier audit (proposed branch)

A documentation-ID audit against the proposed branch found:

- 134 acceptance-criterion definitions; zero duplicate AC definitions.
- Zero defined acceptance-criterion IDs missing from the canonical requirements matrix.
- All 10 PRD functional requirement IDs represented in the canonical requirements matrix, including `REQ-AUTH-001` as future/gated scope.
- Zero test IDs referenced by the canonical requirements matrix or feature backlog missing from the traceability registry or Q-020 test plan.
- Zero conflicting repeated test-definition rows across the traceability and Q-020 registries.

These are documentation/reference checks, not executable application tests. The checked-in subject-catalogue reference suite has historical run evidence. PR #79's contract-test run #52 passed on its PR head only. This audit branch's Contract tests workflow run [#54](https://github.com/s1xte3n/studypath-sa/actions/runs/38789226191) passed on head `fbe002e29f35fdbf97a46ada391fca520667e036`. These contract-workflow results do not establish an application build, browser journey, runtime privacy test, catalogue publication or release evidence.

### Source fidelity and priority decisions

- The supplied specification labels funding matching (M4) and application tracking (M5) “Must Have,” describes national South African scope, and sets an API-first/serverless Azure direction. The approved OR-001 decision keeps M4/M5 in the intended MVP at P1 behind the P0 core journey; OR-008 bounds the initial data pilot to 6–8 curated records prioritising Gauteng without a national-coverage claim. D-044's API-first direction is retained. D-047 limits only the immediate verification slice to a local synthetic-only demo.
- The supplied hackathon programme's interactive-app requirement, deck limit (10 slides), demo-video limit (90 seconds), SSDLC, Lean Business Canvas and Monday 23:59 Sonke submission are recorded in Phase 0 evidence. The date is derived from the programme's stated event end; portal timezone/upload details remain to be confirmed.
- The supplied SOP's phased lifecycle and traceability chain are reflected in the Phase 2 checklist. Completing documentation review does not pass application, security/privacy, deployment or release gates.

### Remaining blockers and conditional Phase 3 handoff

- Remaining Phase 2 work: review and merge this proposed audit baseline, then obtain explicit overall product-owner acceptance (E2) for the reconciled baseline. The checklist marks A–D evidence items complete on this branch; this does not itself constitute owner acceptance. Do not mark `REQUIREMENTS READY` passed before that decision is recorded.
- Later gates remain open: verified 6–8 programme records and curator sign-off; relationship-pair evidence; 3–5 funding records before enabling P1 funding; architecture/API/provider/cost review within the R100/month cap; a runnable local UI and browser/privacy harness; golden-set, accessibility, performance and runtime privacy evidence; qualified privacy/legal review before real learner data; CI on the reviewed implementation commit; and deployment/release checks.
- Phase 3 entry criteria, **after** Phase 2 acceptance: freeze architecture and ADRs against the accepted requirement baseline; resolve OR-019/Q-018 API/runtime composition, timeout/retry/cache/failure semantics, identity boundaries and provider controls; prove full cost against the R100/month cap before provisioning; preserve the page-memory-only learner-data boundary and synthetic-only demo restrictions. No infrastructure provisioning is authorized by this handoff.

**Evidence limits:** This review is documentation-only. It does not claim application code changes, executed application tests, current-merge CI, runtime privacy verification, external legal review, catalogue readiness, cloud provisioning, deployment or release readiness.
