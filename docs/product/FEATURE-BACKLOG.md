# StudyPath SA — Feature Backlog

**Status:** Planning only. D-044 selects API-first, but runtime, final contract, privacy boundary and cost remain open. Items are implementation-ready only to the extent that their acceptance criteria are specified; blocked items are explicitly labelled. Ambiguous behavior is not converted into a task.

## P0 — Architecture and data-contract gate

### P0-00 — Freeze the API-first data boundary and prove budget feasibility
- **Requirements:** REQ-CAT-001, REQ-FUND-001, REQ-PRV-001, NFR-SEC-001, NFR-REL-001.
- **Decision:** API-first selected by D-044. Safe interim design exposes only public curated programme/funding data; matching stays client-side and learner inputs/results/tracker state must not cross the network.
- **Deliverable:** Review `docs/architecture/ARCHITECTURE.md` and `docs/architecture/API-CONTRACT.md`; approve routes/schema, cache/error semantics, provider logging/retention controls, hosting/runtime services and service-by-service costs under R100/month.
- **Verification:** T-API-001–004, T-PRV-001–004, T-SEC-001; actual runtime and cost evidence required.
- **Blocked:** Final endpoint schema, API Management necessity, provider retention/logging, network behavior and monthly cost. No provisioning before explicit review; do not transmit learner profile data.

## P0 — Core pathway journey

### P0-01 — Curate and validate programme catalogue
- **Requirements:** REQ-CAT-001, NFR-DATA-001.
- **Dependencies:** Official source pages, source-record contract, curator review.
- **Deliverable:** 6–8 distinct real programme records with applicable cycle, rule conditions, official publisher/title/URL, verification date, catalogue version and curator sign-off.
- **Verification:** T-CAT-001–005, T-NFR-001; AC-CAT-001–012.
- **Blocked:** Actual record selection/review evidence. Do not seed fabricated data.

### P0-02 — Approve supported subject vocabulary
- **Requirements:** REQ-EXP-001, REQ-MAT-001.
- **Dependencies:** The owner-approved `subject-catalogue-v1` contract and its exact canonical labels; no aliases are accepted. Verify the checked-in reference tests against that contract.
- **Deliverable:** Explicit supported subject catalogue using exact canonical labels after approved whitespace/case cleanup, with no aliases or inferred equivalence.
- **Verification:** T-SUB-001–012, T-EXP-003.
- **Boundary:** The contract decision is recorded; production integration, UI duplicate rejection, evaluator behavior, dictionary refresh and runtime privacy still require implementation and verification. Do not infer unsupported subjects or equivalence.

### P0-03 — Anonymous input validation and memory-only state
- **Requirements:** REQ-EXP-001, REQ-PRV-001.
- **Dependencies:** P0-02 and approved PRD input contract.
- **Deliverable:** Required study stage and subject/whole-number mark pairs; optional preferences; duplicate detection; field-specific errors; temporary state.
- **Verification:** T-EXP-001–006, T-PRV-001–003.
- **Excluded:** Identity fields, accounts, saved profile, persistent state.

### P0-04 — Deterministic eligibility evaluator and reasons
- **Requirements:** REQ-MAT-001, NFR-COMP-001.
- **Dependencies:** P0-01–P0-03; verified rules and approved composite operators.
- **Deliverable:** ELIGIBLE / NOT_ELIGIBLE / UNKNOWN, source-linked reasons, deterministic grouping and stable ordering; no weighted score.
- **Verification:** T-MAT-001–008, T-NFR-002–003; at least 20 golden cases with 100% expected agreement and zero false-positive ELIGIBLE.
- **Constraint:** Unsupported APS, subject substitution or programme-specific formulas remain UNKNOWN. Do not invent formulas.

### P0-05 — Results and pathway detail views
- **Requirements:** REQ-DET-001, REQ-CAT-001, REQ-UX-001.
- **Dependencies:** P0-01 and P0-04.
- **Deliverable:** Sourced result/detail views, unknown fields, official links and honest empty/not-found states.
- **Verification:** T-DET-001–002, T-CAT-003, T-UX-003.
- **Excluded:** Application submission, unverified costs/deadlines, personalised task planner.

### P0-06 — Publish verified pathway relationships
- **Requirements:** REQ-ALT-001.
- **Dependencies:** P0-01 and P0-04; rationale, provenance and approval for every relationship.
- **Deliverable:** Only reviewed ALTERNATIVE, RELATED_FIELD, PROGRESSION or ARTICULATION records.
- **Verification:** T-ALT-001–002.
- **Blocked:** Relationship records are not evidenced. ARTICULATION requires explicit official evidence.

### P0-07 — Accessible and resilient learner experience
- **Requirements:** REQ-UX-001, NFR-ACC-001, NFR-REL-001.
- **Dependencies:** Core journey and defined states.
- **Deliverable:** Keyboard-operable responsive journey, semantic labels/errors, visible focus, non-colour-only status, loading/empty/recoverable errors.
- **Verification:** T-UX-001–005, T-PERF-001, T-NFR-005.
- **Evidence:** Record browser versions, viewports, automated scans and manual checks.

### P0-08 — Prove privacy/security and scope boundaries
- **Requirements:** REQ-PRV-001, NFR-PRV-001, NFR-SEC-001, NFR-SCOPE-001.
- **Dependencies:** P0-03–P0-07, hosting/telemetry inventory and accurate privacy notice.
- **Deliverable:** No profile persistence, URL/network/log/telemetry leakage, client secrets or unsupported national claims; synthetic-only test data.
- **Verification:** T-PRV-001–006, T-SEC-001, T-COMP-001, T-CAT-003, T-API-003–004.
- **Release blocker:** Any privacy-boundary violation or unreviewed hosting metadata.

## P1 — Intended MVP after P0

### P1-01 — Curated funding matching pilot
- **Requirement:** REQ-FUND-001.
- **Dependencies:** P0 privacy boundary, OR-015, approved limited non-sensitive inputs, 3–5 verified funding records.
- **Deliverable:** Source-backed criteria, checklist metadata, published amount/coverage if available, deadline/timezone, cycle, currentness and explanation.
- **Verification:** T-FUND-001–003.
- **Blocked:** Actual source-verified funding records. No sensitive financial inputs, uploads or award guarantees.

### P1-02 — Manual memory-only application tracker
- **Requirement:** REQ-APP-001.
- **Dependencies:** OR-016 lifecycle and permitted fields; REQ-PRV-001; funding targets only if used.
- **Deliverable:** Create/list/edit learner-reported entries, allowed status transitions, optional manually entered submitted date, deadline, notes and approved checklist metadata.
- **Verification:** T-APP-001–006.
- **Constraint:** Page-memory-only. No localStorage, sessionStorage, IndexedDB, cookies, database, server persistence, cloud sync, uploads or external submission.
- **Resolved during Phase 2 review:** AC-APP-001–009 and the OR-016 transition table were verified in the approved PRD/acceptance criteria. Preserve those exact rules; implementation still awaits the other listed dependencies.

## P2 / P3 — Not initial-MVP implementation work
- **P2:** Cost planner (OR-017); AI/document assistant (OR-018); notifications; skill-gap analysis.
- **P3:** Graduation progress, external provider status sync, broad automated catalogue ingestion, expanded multilingual/offline features.
- These are deferred or future ideas, not approved commitments.

## Sequencing
P0-00 → P0-01 → P0-02 → P0-03 → P0-04 → P0-05 → P0-06 → P0-07 → P0-08 → P1-01 → P1-02.

Do not move a blocked item into implementation until its gap is resolved. Requirements documentation does not establish implementation or test completion.
