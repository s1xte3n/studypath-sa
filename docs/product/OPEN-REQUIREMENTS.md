# StudyPath SA — Open Product Requirements

**Status:** Open decision register for PRD review. No issue below is silently resolved.  
**Owner:** Product owner (currently one person holds all project roles, per Phase 0 status).  
**Priority:** P0 blocks PRD READY; P1 affects important behavior/scope; P2 can be decided before relevant later feature.

## P0 — Resolve before PRD READY

### OR-001 — MVP scope conflict: funding and application tracking
- **Conflict:** The supplied `SPEC-1-StudyPath-SA.txt` labels funding matching (M4) and manual application tracking (M5) Must Have. The same specification's hackathon cut line says stop after M6, while the approved Phase 0 state explicitly defers manual application tracking and the initial MVP direction is anonymous-first with a small curated catalogue. The current PRD/SCOPE excludes funding matching and tracking from the initial MVP.
- **Decision required:** Confirm the Phase 0 MVP cut line as authoritative for this release, or restore M4/M5 and define how accounts/privacy/data persistence fit the MVP.
- **Impact:** Scope, user journey, authentication, data model, acceptance criteria, hackathon demo.
- **Status:** Open; no silent resolution.

### OR-002 — Anonymous input contract
- **Ambiguity:** M1 lists grade/year, subjects/marks, interests, location, study modes and funding requirements. Phase 0 journey mentions subjects/marks and interests, but does not freeze which other fields are mandatory.
- **Decision required:** Approve required/optional fields for Grade 11, Grade 12 and recent matric graduates; decide whether province, study mode and funding need are in the first form.
- **Impact:** UX, validation, matching, test fixtures.
- **Status:** Open.

### OR-003 — Mark validation and subject vocabulary
- **Ambiguity:** No mark scale, decimal precision, accepted subject identifiers/aliases, duplicate policy or unsupported-subject behavior is approved.
- **Decision required:** Confirm scale (likely 0–100 only if explicitly approved), precision, required subjects, alias policy and duplicate handling.
- **Impact:** Input validation and deterministic matching tests.
- **Status:** Open.

### OR-004 — Eligibility precedence and composite rules
- **Ambiguity:** The supplied pseudocode says missing required subject => UNKNOWN, and known below-threshold requirement => NOT_ELIGIBLE, but does not specify precedence when a learner fails one known rule while another rule is missing. APS/points calculation, life-orientation exclusions, subject substitutions, and conditional/alternative requirements are not defined.
- **Decision required:** Approve precedence and supported requirement operators; list unsupported rules that force UNKNOWN.
- **Impact:** Core correctness and false-eligibility risk.
- **Status:** Open.

### OR-005 — Admission cycle and source freshness
- **Ambiguity:** Catalogue versioning is described, and Phase 0 checked two UJ programme pages, but no current admission cycle, stale-source threshold, re-verification cadence, conflict resolution process or release-time source check is frozen.
- **Decision required:** Define supported cycle(s), minimum source metadata, freshness threshold, source conflict policy and curator sign-off.
- **Impact:** Whether a requirement can be used for ELIGIBLE/NOT_ELIGIBLE.
- **Status:** Open.

### OR-006 — Privacy and browser telemetry boundary
- **Ambiguity:** Phase 0 prohibits persistence/telemetry of profile values, but static hosting, browser storage, hosting access logs, Application Insights/analytics and third-party error reporting have not been implementation-verified.
- **Decision required:** Approve permitted telemetry fields, storage/session reset behavior, privacy notice, retention and pre-public-demo review owner.
- **Impact:** Privacy acceptance tests and release readiness. Until resolved, use synthetic-only data and do not represent the app as cleared for real learner data.
- **Status:** Open as downstream gate; telemetry implementation must not be assumed safe.

### OR-007 — What does ELIGIBLE mean in the MVP?
- **Ambiguity:** Could mean only all represented minimum requirements are met, but institutional admissions may include selection, subject combinations, quotas, documents and cycle conditions not captured by the pilot.
- **Decision required:** Approve exact wording: ELIGIBLE means the learner meets all supported, verified minimum requirements in the pilot catalogue; it is not a prediction/guarantee of admission. Decide whether any programme should be screened if full minimum criteria are unavailable.
- **Impact:** Core trust/safety and UI copy.
- **Status:** Open.

## P1 — Resolve before requirements baseline / architecture

### OR-008 — Catalogue scope and minimum coverage
- **Ambiguity:** Two UJ programme pages were checked during Phase 0, but minimum number of programme records, qualification mix and supported provinces are not frozen.
- **Decision required:** Approve a named bounded pilot catalogue and acceptance threshold; no national coverage claim.
- **Impact:** Demonstration usefulness and alternative pathways.

### OR-009 — Alternative relationship model
- **Ambiguity:** ALTERNATIVE, RELATED_FIELD, PROGRESSION and ARTICULATION are listed in the specification, but no curator criteria or evidence standard is approved.
- **Decision required:** Define relationship provenance and who may publish relationships; articulation claims need explicit official evidence.
- **Impact:** Alternative recommendation accuracy.

### OR-010 — Preference ranking
- **Ambiguity:** The specification proposes weighted scoring for career, mode, location, affordability and academic fit, but Phase 0 has not approved weights or whether ranking is necessary for the pilot.
- **Decision required:** Approve ranking fields/weights and missing-data behavior, or use transparent deterministic grouping without a numeric score.
- **Impact:** Ordering, explainability and testing.

### OR-011 — Accessibility and browser support
- **Ambiguity:** Mobile-first/accessibility is required, but WCAG target, browser matrix, minimum viewport and quantitative performance thresholds are not approved.
- **Decision required:** Approve conformance target and measurable test environment.
- **Impact:** Verifiable quality gate.

### OR-012 — Failure behavior and performance targets
- **Ambiguity:** Loading/error states are required but timeout, retry, p95 latency, availability and low-bandwidth targets are absent.
- **Decision required:** Set thresholds suitable for a static/cost-constrained pilot; distinguish measured targets from aspirations.
- **Impact:** Acceptance criteria and release tests.

### OR-013 — Success metric thresholds
- **Ambiguity:** Specification suggests pathway generation, saving, funding, application creation, conversion and matching-quality metrics. Saving/funding/tracking are excluded from current MVP and numeric thresholds are absent.
- **Decision required:** Approve synthetic test-set size, zero false-eligibility target, usability measure and evidence method.
- **Impact:** Demo evaluation and product validation.

### OR-014 — Ownership and review
- **Ambiguity:** Phase 0 records one person currently holding all roles, no backup catalogue curator and no independent reviewer.
- **Decision required:** Confirm whether single-person review is accepted for the hackathon MVP and define how source records are reviewed before publishing.
- **Impact:** Governance, data quality and risk acceptance.

## P2 — Resolve before any relevant later feature

### OR-015 — Funding data and matching
Funding provider coverage, applicant criteria, document list, deadline timezone, funding amount/coverage and expiry policy are not defined. Resolve only if funding matching is brought into scope.

### OR-016 — Application tracking lifecycle
The broad specification lists statuses DRAFT, READY_TO_SUBMIT, SUBMITTED, AWAITING_DOCUMENTS, UNDER_REVIEW, ACCEPTED, REJECTED and WITHDRAWN, but transition rules, who may set statuses and whether `submitted_at` is user-entered are not defined. Resolve before tracker scope is approved.

### OR-017 — Cost planner semantics
Estimate source/freshness, annual versus once-off costs, currency, missing categories, confirmed versus potential funding, and negative funding-gap handling are not defined. Resolve before cost planner approval.

### OR-018 — AI/document assistant
Supported file types/size, consent, retention/deletion, extraction confidence, human verification, prompt-injection handling and source-document access controls are not defined. AI/document processing remains out of initial MVP.

## Unverifiable or underspecified statements requiring measurable definitions
- “Relevant pathways”, “realistic”, “recently verified”, “low-data”, “responsive”, “fast”, “accessible” and “clear next step” need operational definitions before a test can objectively pass.
- “National architecture” is a future extensibility direction, not evidence that MVP catalogue coverage is national.
- “Every displayed requirement is traceable” needs a defined minimum source record schema and an audit/test procedure.
- “No profile telemetry” must define which hosting/network/security metadata may be collected and how inspection evidence is captured.
- “No false eligibility” requires an approved golden test set and explicit supported-rule boundary.

## Gate disposition

**PRD READY: BLOCKED.** The PRD, stories, scope and candidate acceptance criteria have been drafted. OR-001 through OR-007 are material to product scope, correctness and privacy and remain open. Obtain explicit decisions and update the artifacts before marking the PRD approved. No implementation tasks are created here.
