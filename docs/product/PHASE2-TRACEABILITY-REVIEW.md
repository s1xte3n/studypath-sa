# Phase 2 — Final Requirement Traceability Review

**Review date:** 2026-10-14  
**Status:** Review artifact proposed; Phase 2 gate remains **NOT PASSED** pending the explicit closure conditions below.  
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
| `REQ-DET-001` | `AC-DET-001–006` | Pathway detail, source links, unknown/missing state | `T-DET-001–002` | **Not verified** | **Not available** | No release evidence recorded |
| `REQ-PRV-001` | `AC-PRV-001–013` | Privacy notice/reset; memory-only inputs; catalogue-only API boundary | `T-PRV-001–004`, `T-API-003`, `T-SUB-009` | **Not verified** | **Not available** | **Release blocker:** requests, browser storage, URLs, logs, telemetry, provider retention and dependencies must be inspected |
| `REQ-UX-001` | `AC-UX-001–011` | Mobile-first learner journey; validation/loading/empty/error/retry states | `T-UX-001–003`, `T-API-002` | **Not verified** | **Not available** | Accessibility and recovery-state evidence not available |
| `REQ-FUND-001` (P1) | `AC-FUND-001–009` | Draft `GET /api/v1/funding-opportunities`; limited-input matching and source/deadline display | `T-FUND-001–003`, `T-API-001–002`, `T-API-004` | **Not verified** | **Not available** | 3–5 current, official-source funding records not verified; feature remains blocked until records are curated |
| `REQ-APP-001` (P1) | `AC-APP-001–009` | Manual tracker, approved lifecycle, page-memory-only list/form | `T-APP-001–004` | **Not verified** | **Not available** | Lifecycle/AC mapping checked in planning; runtime memory-only behavior and tests unverified |
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
