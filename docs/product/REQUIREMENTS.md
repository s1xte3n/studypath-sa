# StudyPath SA — Canonical Requirements Matrix

**Status:** Phase 2 baseline derived from the owner-approved PRD and acceptance criteria.  
**Date:** 2026-10-14. **Gate:** REQUIREMENTS READY NOT PASSED; test IDs are planned, not executed.

Priority meanings follow the SOP: P0 core/release blocker/security; P1 intended-MVP behavior behind P0; P2 important quality/deferred; P3 future/extended. Status describes planning, not implementation. Components below are logical areas; no API or architecture contract is frozen.

## Functional requirements

| Requirement ID | Requirement | Priority | Dependencies | Affected components / UI contract | Acceptance criteria | Verification IDs | Status |
|---|---|---:|---|---|---|---|---|
| REQ-EXP-001 | Anonymous pathway inputs; required stage and subject/mark pairs; optional interests/location/mode; strict whole-number mark and subject validation; no identity requirement | P0 | REQ-CAT-001, REQ-PRV-001, explicit subject vocabulary | Explorer form, subject catalogue, validation, memory-only state, recommendation interface (not frozen) | AC-EXP-001–014 | T-EXP-001–004 | Specified |
| REQ-CAT-001 | Bounded 6–8 programme catalogue, official-source provenance, applicable cycle, freshness, version and curator sign-off; no national-completeness claim | P0 | Official sources, source-record contract, curator review | Catalogue data/schema, source provenance, publication/review process, results/details | AC-CAT-001–012 | T-CAT-001–003 | Catalogue records outstanding |
| REQ-MAT-001 | Deterministic ELIGIBLE / NOT_ELIGIBLE / UNKNOWN screening, sourced reasons, approved composite rules, stable eligibility grouping, no numeric weighted score or admission guarantee | P0 | REQ-EXP-001, REQ-CAT-001, composite-rule policy | Eligibility evaluator, reason builder, results UI | AC-MAT-001–021 | T-MAT-001–004 | Specified; golden set outstanding |
| REQ-ALT-001 | Show only verified alternative, related-field, progression or articulation relationships; otherwise disclose no verified alternative | P0 | REQ-CAT-001, REQ-MAT-001, relationship evidence | Relationship catalogue, alternatives UI | AC-ALT-001–007 | T-ALT-001–002 | Relationship evidence outstanding |
| REQ-DET-001 | Show sourced pathway details, available location/mode, known requirements and official next steps; unknown fields remain explicit | P0 | REQ-CAT-001, REQ-MAT-001 | Detail view, official links, source metadata | AC-DET-001–006 | T-DET-001–002 | Specified |
| REQ-PRV-001 | Anonymous, privacy-minimising flow; no profile persistence or profile telemetry/logging; reset clears state; synthetic-only development/demo | P0 | Hosting/telemetry review, privacy notice, REQ-EXP-001 | Memory state, storage/network/logging, privacy notice | AC-PRV-001–013 | T-PRV-001–004 | Release verification outstanding |
| REQ-UX-001 | Accessible mobile-first flow with validation, loading, empty and recoverable failure states; WCAG 2.2 AA target at 320 CSS px | P0 | Core journey, agreed test browsers/device | All learner-facing UI | AC-UX-001–011 | T-UX-001–003 | Evidence outstanding |
| REQ-FUND-001 | 3–5 official-source funding opportunities; explainable matching, criteria, deadlines/cycle/currentness and uncertainty; no sensitive financial inputs or award guarantee | P1 | OR-015, REQ-PRV-001, reviewed funding records | Funding catalogue, limited-input flow, match/source/deadline UI | AC-FUND-* (exact range to verify; GAP-007) | T-FUND-001–003 | Catalogue and AC mapping outstanding |
| REQ-APP-001 | Manual learner-reported application tracker with approved fields/status lifecycle; page-memory-only; no submission or persistence | P1 | OR-016, REQ-PRV-001; REQ-FUND-001 for funding targets | Tracker form/list, in-memory state, transition validation | AC-APP-* (exact range to verify; GAP-006/007) | T-APP-001–004 | Transition/AC mapping check outstanding |

## Cross-cutting non-functional requirements

| Requirement ID | Requirement | Priority | Dependencies | Affected components | Verification IDs | Status |
|---|---|---:|---|---|---|---|
| NFR-SEC-001 | No client secrets; HTTPS for network requests; validate inputs at trusted boundary | P0 | Hosting/network boundary and dependency inventory | Build/hosting and any network boundary | T-SEC-001 | Specified |
| NFR-PRV-001 | No profile persistence, analytics capture or application-log capture | P0 | REQ-PRV-001; storage/network/log inspection | Storage, network, telemetry, logs | T-PRV-001–004 | Release blocker until evidenced |
| NFR-DATA-001 | Eligibility claims and displayed requirements trace to official source records and metadata | P0 | REQ-CAT-001 | Catalogue, evaluator, results/details | T-CAT-001, T-MAT-003 | Specified |
| NFR-REL-001 | Missing/stale data, empty results and failures produce honest recoverable states; no indefinite loading | P0 | REQ-UX-001 | UI states and data boundary | T-CAT-002, T-UX-003 | Specified; numeric network SLOs not approved |
| NFR-ACC-001 | WCAG 2.2 AA target; 320 CSS px; keyboard, focus, labels, errors, contrast, non-colour-only states; supported stable browsers | P0 | REQ-UX-001 and test environment | All learner-facing UI | T-UX-001–002 | Evidence outstanding |
| NFR-PERF-001 | In-browser matching p95 ≤1 second for up to 100 records on an agreed device/browser | P1 | Matching implementation and benchmark protocol | Evaluator/benchmark harness | T-PERF-001 | Device/protocol not yet recorded |
| NFR-COMP-001 | Never imply official admission/funding decision or guarantee | P0 | Content/source policy | Results, funding, detail copy | T-COMP-001 | Specified |
| NFR-SCOPE-001 | Bounded catalogue; no nationwide coverage claim | P0 | REQ-CAT-001 | Landing/results/empty-state copy | T-CAT-003 | Specified |

## Gate checklist

- [x] Unique IDs, priorities, dependencies, affected areas, acceptance criteria and verification IDs assigned.
- [ ] Confirm exact funding/tracker acceptance-criteria IDs.
- [ ] Freeze UI/API contracts and implementation areas after architecture decision.
- [ ] Author executable test cases and attach CI/release evidence.
- [ ] Resolve or explicitly block P0 gaps in REQUIREMENT-GAPS.md.

Do not mark requirements implemented or tested from this matrix alone. REQUIREMENTS READY remains NOT PASSED.
