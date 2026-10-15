# StudyPath SA — Canonical Requirements Matrix

**Status:** Phase 2 requirements baseline reconciled against the latest gate findings. D-044 selects API-first; detailed API/runtime decisions remain downstream architecture/contract work.
**Date:** 2026-10-14. **Gate:** assess requirements completeness separately from implementation, CI and release readiness.

Priority meanings follow the SOP: P0 core/release blocker/security; P1 intended-MVP behavior behind P0; P2 important quality/deferred; P3 future/extended. Status describes planning, not implementation. Components below are logical areas; no API or architecture contract is frozen.

## Scope applicability (D-044–D-047)

- **Intended architecture:** API-first; review the versioned `/api/v1` contract before dependent components are implemented. The local G-SYN-001 gate does not require a hosted API or cloud provisioning; local synthetic catalogue fixtures are acceptable for that gate.
- **Anonymous path:** public catalogue retrieval only, with deterministic matching in the browser. Learner profile inputs, results and tracker entries stay in page memory and are never sent to an API, URL, analytics, application log or error telemetry.
- **Approved authenticated extension:** authenticated server-side matching, saved pathways, pathway comparison, saved funding opportunities and a derived dashboard are intended scope under D-046. These are not in the current local-demo slice and remain gated by Q-018/Q-020 and applicable contract, security/privacy, testing and cost evidence. Academic-profile persistence requires explicit opt-in; tracker entries never persist or sync across sessions.
- **Current D-047 slice:** synthetic data only; local browser demo; no authentication, production identity, real learner data, profile persistence, uploads, cloud sync, Azure provisioning or deployment. Requirements below describe intended behavior where applicable, not evidence that it has been implemented or verified.
- **Priority:** core discovery/correctness/privacy/accessibility are P0. Funding and manual tracking remain P1 and cannot displace P0 reliability or correctness. See [MVP Scope Reconciliation](MVP-SCOPE-RECONCILIATION-D-044-D-047.md).

## Functional requirements

| Requirement ID | Requirement | Priority | Dependencies | Affected components / UI contract | Acceptance criteria | Verification IDs | Status |
|---|---|---:|---|---|---|---|---|
| REQ-EXP-001 | Anonymous pathway inputs; required stage and subject/mark pairs; optional interests/location/mode; strict whole-number mark and subject validation; no identity requirement | P0 | REQ-CAT-001, REQ-PRV-001, explicit subject vocabulary | Explorer form, subject catalogue, validation, memory-only state, API catalogue client plus client-side matching (interim privacy-preserving boundary; final API contract open); draft subject contract linked | AC-EXP-001–014 | T-EXP-001–006, T-SUB-001–012 | Subject catalogue v1 owner-approved in SUBJECT-CATALOGUE-V1-APPROVAL.md; executable contract tests exist, execution not verified |
| REQ-CAT-001 | Bounded 6–8 programme catalogue, official-source provenance, applicable cycle, freshness, version and curator sign-off; no national-completeness claim | P0 | Official sources, source-record contract, curator review | API-served curated catalogue contract (draft), source provenance, publication/review process, results/details | AC-CAT-001–012 | T-CAT-001–005, T-API-001–002, T-API-004, T-NFR-001 | Catalogue records outstanding |
| REQ-MAT-001 | Deterministic ELIGIBLE / NOT_ELIGIBLE / UNKNOWN screening, sourced reasons, approved composite rules, stable eligibility grouping, no numeric weighted score or admission guarantee | P0 | REQ-EXP-001, REQ-CAT-001, composite-rule policy | Eligibility evaluator, reason builder, results UI | AC-MAT-001–021 | T-MAT-001–008 | Specified; golden set outstanding |
| REQ-ALT-001 | Show only verified alternative, related-field, progression or articulation relationships; otherwise disclose no verified alternative | P0 | REQ-CAT-001, REQ-MAT-001, relationship evidence | Relationship catalogue, alternatives UI; draft relationship contract linked | AC-ALT-001–007 | T-ALT-001–002, T-REL-001–008 | Relationship evidence contract defined; zero verified pairs is the safe initial catalogue state |
| REQ-DET-001 | Show sourced pathway details, available location/mode, known requirements and official next steps; unknown fields remain explicit | P0 | REQ-CAT-001, REQ-MAT-001 | Detail view, official links, source metadata | AC-DET-001–006 | T-DET-001–006 | Specified |
| REQ-PRV-001 | Anonymous, privacy-minimising flow; no profile persistence or profile telemetry/logging; reset clears state; synthetic-only development/demo | P0 | API request boundary, hosting/telemetry review, privacy notice, REQ-EXP-001 | Memory state, storage/network/logging, privacy notice | AC-PRV-001–013 | T-PRV-001–006, T-API-003 | Release verification outstanding |
| REQ-UX-001 | Accessible mobile-first flow with validation, loading, empty and recoverable failure states; WCAG 2.2 AA target at 320 CSS px | P0 | Core journey, agreed test browsers/device | All learner-facing UI | AC-UX-001–011 | T-UX-001–005, T-PERF-001, T-NFR-005 | Evidence outstanding |
| REQ-FUND-001 | 3–5 official-source funding opportunities; explainable matching, criteria, deadlines/cycle/currentness and uncertainty; no sensitive financial inputs or award guarantee | P1 | OR-015, REQ-PRV-001, reviewed funding records | Funding catalogue, limited-input flow, match/source/deadline UI | AC-FUND-001–009 | T-FUND-001–006, T-API-001–002, T-API-004 | Scope and AC mapping cross-checked; verified funding records remain outstanding |
| REQ-APP-001 | Manual learner-reported application tracker with approved fields/status lifecycle; page-memory-only; no submission or persistence | P1 | OR-016, REQ-PRV-001; REQ-FUND-001 for funding targets | Tracker form/list, in-memory state, transition validation | AC-APP-001–009 | T-APP-001–006 | Lifecycle and AC mapping cross-checked; implementation and test evidence outstanding |

## Cross-cutting non-functional requirements

| Requirement ID | Requirement | Priority | Dependencies | Affected components | Verification IDs | Status |
|---|---|---:|---|---|---|---|
| NFR-SEC-001 | No client secrets; HTTPS for network requests; validate inputs at trusted boundary | P0 | API runtime/gateway decision, hosting/network boundary and dependency inventory | Build/hosting and any network boundary | T-SEC-001, T-API-004 | Specified |
| NFR-PRV-001 | No profile persistence, analytics capture or application-log capture | P0 | REQ-PRV-001; storage/network/log inspection | Storage, network, telemetry, logs | T-PRV-001–006, T-API-003 | Release blocker until evidenced |
| NFR-DATA-001 | Eligibility claims and displayed requirements trace to official source records and metadata | P0 | REQ-CAT-001 | Catalogue, evaluator, results/details | T-CAT-001, T-CAT-004–005, T-MAT-005, T-MAT-008, T-NFR-001 | Specified |
| NFR-REL-001 | Missing/stale data, empty results and failures produce honest recoverable states; no indefinite loading | P0 | REQ-UX-001 | UI states, API data boundary and network failure semantics | T-CAT-002, T-UX-004, T-API-002 | Specified; numeric network SLOs not approved |
| NFR-ACC-001 | WCAG 2.2 AA target; 320 CSS px; keyboard, focus, labels, errors, contrast, non-colour-only states; supported stable browsers | P0 | REQ-UX-001 and test environment | All learner-facing UI | T-UX-001–003, T-UX-005 | Evidence outstanding |
| NFR-PERF-001 | In-browser matching p95 ≤1 second for up to 100 records on an agreed device/browser | P1 | Matching implementation and benchmark protocol | Evaluator/benchmark harness | T-PERF-001 | Device/protocol not yet recorded |
| NFR-COMP-001 | Never imply official admission/funding decision or guarantee | P0 | Content/source policy | Results, funding, detail copy | T-COMP-001 | Specified |
| NFR-SCOPE-001 | Bounded catalogue; no nationwide coverage claim | P0 | REQ-CAT-001 | Landing/results/empty-state copy | T-CAT-003 | Specified |

## Requirements-gate checklist

- [x] Unique requirement IDs, priorities, dependencies, affected areas, acceptance criteria and planned verification IDs are assigned.
- [x] Funding/tracker AC ranges and the OR-016 lifecycle are cross-checked in the source documents (GAP-006/007 resolved).
- [x] API-first direction is recorded in D-044; API contract remains deliberately draft pending Phase 3/4 decisions.
- [x] Subject catalogue v1 policy is owner-approved; PH2-002 aligns the traceability registry to the checked-in reference test IDs and corrects canonical display-label behavior in the reference normalizer. Current PR CI and runtime implementation remain unverified until evidence is recorded.
- [x] Relationship rules prohibit unsupported/inferred relationships; an empty verified-relationship set is an allowed safe outcome.
- [x] Catalogue conflicts, funding record gaps, runtime privacy evidence and detailed API decisions are classified as downstream data-curation, architecture/contract, implementation or release blockers—not hidden or treated as resolved.
- [ ] Product owner confirms this reconciled requirements baseline as the gate decision.

The requirements gate does not claim implementation, test execution, CI success, privacy verification or release readiness. Those are later gates with evidence placeholders.

## Requirements-gate reconciliation — 2026-10-14

The earlier checklist incorrectly coupled REQUIREMENTS READY to final API/runtime decisions, executable test results, CI/release evidence and closure of every data/runtime gap. Those items remain important, but belong to later gates unless they reveal unresolved product behavior or acceptance criteria.

| Finding | Requirements-gate disposition | Later gate / release disposition |
|---|---|---|
| GAP-001 — UJ programme source conflicts and 6–8 record target | Requirement is explicit: publish only 6–8 fully curated records with source/cycle/freshness/sign-off; unresolved conflicts cannot support confident eligibility. No requirement ambiguity is hidden. | Catalogue publication and confident eligibility remain blocked until source conflicts are reconciled and records are signed off. |
| GAP-002 — subject vocabulary | Owner-approved bounded subject-catalogue-v1 contract and executable reference test file exist; the test registry is aligned to the checked-in test cases. | Contract-test execution, production implementation and privacy/runtime behavior remain unverified. |
| GAP-003 — pathway relationships | Requirement explicitly allows no verified alternative when no pair meets evidence/sign-off rules. Empty relationship data is the safe default, not a requirements ambiguity. | Do not publish a relationship until exact pair evidence and curator sign-off exist. |
| GAP-004 / NFR-PRV-001 — privacy boundary | Product policy is explicit: learner data stays page-memory-only and is excluded from API requests, URLs, storage, logs and telemetry. | Actual request, storage, logs, telemetry, dependency and provider-retention inspection remains a release blocker. |
| GAP-005 — funding records (P1) | Funding scope and AC-FUND-001–009 are defined; funding is P1 and is not a P0 requirements-gate blocker. | Funding feature remains disabled/omitted until 3–5 current official-source records are curated and reviewed. |
| GAP-008 — API/runtime/cost/error semantics | API-first is approved; unresolved design choices are explicitly assigned to architecture/API-contract phases. The product privacy invariant remains unchanged. | Do not implement/provision until architecture, API, environment and cost gates approve the concrete design. |
| GAP-009–012 — performance, accessibility evidence, unsupported rule representation, network resilience | Targets and safe behavior are specified; remaining protocols/evidence are visible rather than silently assumed. | Agree protocols and verify behavior before claiming quality/release acceptance. |
| Implementation, CI and release evidence | Honest placeholders remain Not verified / Not available; these are not requirements-gate blockers. | Fill with exact paths, commands, commit/run IDs, URLs and results only when actual work is performed. |

**Proposed gate decision:** the requirements baseline is sufficiently specified to proceed to Phase 3 architecture review, subject to product-owner acceptance of this reconciliation. This is not a claim that the product is implemented, the catalogue is publishable or the application is release-ready.

## Historical contract notes — 2026-10-14 (superseded where inconsistent with the reconciliation above)

- The older SUBJECT-NORMALIZATION-CONTRACT.md remains a proposal; the controlling bounded decision is SUBJECT-CATALOGUE-V1-APPROVAL.md and SUBJECT-CATALOGUE-V1.md. Reference tests exist but execution and runtime implementation are unverified.
- PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md defines the evidence threshold; no programme pair is approved, and an empty verified-relationship set is permitted by the requirement.
- AC-FUND-001–009 and AC-APP-001–009 references and tracker transition rules have been cross-checked in planning documents. This closes the documentation cross-check only, not implementation/test work.
- The requirements-gate disposition above supersedes the historical NOT PASSED statement where it conflates requirement completeness with later evidence gates. Product-owner acceptance is still required; implementation, test execution, CI, privacy verification and release remain unverified.
