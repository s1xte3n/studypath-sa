# StudyPath SA — Open Product Requirements

**Status:** Open decision register for PRD review. No issue below is silently resolved.  
**Owner:** Product owner (currently one person holds all project roles, per Phase 0 status).  
**Priority:** P0 blocks PRD READY; P1 affects important behavior/scope; P2 can be decided before relevant later feature.

## P0 — Resolve before PRD READY

### OR-001 — MVP scope conflict: funding and application tracking
- **Conflict:** The supplied `SPEC-1-StudyPath-SA.txt` labels funding matching (M4) and manual application tracking (M5) Must Have, while the earlier Phase 0 decision deferred tracking from the initial MVP.
- **Decision:** **Resolved by owner on 2026-10-14.** Include M4 funding matching and M5 manual application tracking in the intended MVP at P1 / medium priority, behind the P0 core pathway-discovery journey.
- **Boundary:** This resolves scope inclusion only. It does not approve account creation, cross-session persistence, financial-data collection, tracker storage, or detailed eligibility/status rules.
- **Impact:** PRD, stories, acceptance criteria and scope updated on branch `docs/phase-1-prd-scope-b`.
- **Status:** Resolved — scope decision recorded; downstream design questions remain open.

### OR-002 — Anonymous input contract
- **Decision:** **Resolved by owner on 2026-10-14.** The anonymous first form requires study stage, at least one subject, and a mark for each entered subject. Study stage options are Grade 11, Grade 12, and recent matric graduate. Career/study interests, province/intended location, and preferred study mode are optional. Funding need is excluded from the first form and may be considered in the separate P1 funding flow after its requirements and data boundary are approved.
- **Stage-specific handling:** Grade 11 and Grade 12 inputs represent current results and must not be treated as final matric results. Recent matric graduates should enter final matric results where available. Incomplete/unavailable results must remain missing, not be inferred or replaced with zero; affected pathway decisions return UNKNOWN where the missing information prevents a reliable conclusion.
- **Validation and privacy:** No name, email, phone number, national ID or account is required. Every entered subject requires a mark, validated according to OR-003 once the mark scale and precision are approved. Optional fields may be blank without blocking discovery. Inputs are temporary and must not be persisted or sent to analytics, application logs or error telemetry. This is a requirement, not evidence of implemented controls.
- **Impact:** UX, validation, matching, privacy review and test fixtures.
- **Status:** Resolved — owner approved the field contract; OR-003 and OR-006 remain separate blockers.
### OR-003 — Mark validation and subject vocabulary
- **Decision:** **Resolved by owner on 2026-10-14.** Marks use whole-number percentages from 0 through 100 inclusive. Decimal values are rejected rather than rounded; negative values, values above 100, malformed text and missing marks for entered subjects are rejected with field-specific validation. Missing results are never substituted with zero.
- **Subject identity:** Each supported subject must have a stable canonical identifier and display name. Only explicitly approved catalogue aliases are accepted. Normalise case and surrounding/repeated whitespace before alias lookup; do not use fuzzy matching or silently guess a subject. Reject duplicate canonical subjects, including duplicates entered through aliases, so a subject cannot be counted twice.
- **Unsupported subjects:** Identify the unsupported subject to the learner and explain that it cannot currently be matched. Do not silently rename it or infer equivalence/substitution. Matching may continue using other valid supported subjects, but a pathway returns UNKNOWN when the unsupported subject prevents a reliable eligibility conclusion.
- **Boundary:** The supported subject vocabulary and its aliases must be explicitly maintained in the catalogue; this decision does not itself establish that any particular subject or alias is supported. Subject equivalence/substitution remains subject to OR-004.
- **Impact:** Input validation, subject catalogue design and deterministic matching tests.
- **Status:** Resolved — owner approved the validation and normalization contract; implementation and test evidence remain outstanding.

### OR-004 — Eligibility precedence and composite rules
- **Decision:** **Resolved by owner on 2026-10-14.** Apply the precedence and operators below to deterministic minimum-requirement screening:
  1. **Precedence:** Return `NOT_ELIGIBLE` when at least one verified, applicable mandatory requirement is confirmed to fail, even if another requirement is unknown, provided the failed rule is genuinely mandatory and no applicable alternative satisfies it. If no confirmed mandatory failure exists but a material required fact or rule is unknown, return `UNKNOWN`. Return `ELIGIBLE` only when every applicable mandatory requirement required for supported screening is verified and met.
  2. **AND / all required:** Any confirmed mandatory failure makes the combination fail; absent a confirmed failure, any unknown component makes the combination unknown; all components must pass for the combination to pass.
  3. **OR / accepted alternatives:** Any verified passing alternative satisfies the combination. Return failure only when every alternative is known to fail. If none passes and at least one alternative is unknown, return unknown.
  4. **Conditional requirements:** If a condition is verified false, skip its dependent requirement; if verified true, evaluate the dependent requirement. If the condition is unknown and could change the result, return unknown.
  5. **APS/points and Life Orientation:** Calculate points only when an authoritative, applicable source defines the programme/cycle-specific method, included/excluded subjects, mark-to-points conversion and thresholds. Do not assume a universal APS formula or include/exclude Life Orientation by default. If required calculation details are unsupported or unverified and could change the outcome, return unknown.
  6. **Subject substitutions/equivalence:** Accept only substitutions explicitly supported by a verified applicable official requirement or an approved catalogue rule with provenance. Do not infer equivalence from similar names. If a potentially outcome-changing substitution is unsupported or uncertain, return unknown; do not count it as satisfied.
- **Boundary:** These rules classify only supported minimum requirements; they do not predict or guarantee admission. Preference ranking remains separate. This decision does not establish any institution's actual formula, thresholds, subject substitutions or programme requirements; those must be verified per applicable source.
- **Impact:** Deterministic matching, explainability, source governance and false-eligibility prevention.
- **Status:** Resolved — owner approved the contract; implementation and automated test evidence remain outstanding.

### OR-005 — Admission cycle and source freshness
- **Decision:** **Resolved by owner on 2026-10-14.** The pilot supports only admission cycles explicitly identified on each programme requirement record; prior-cycle rules must not be carried forward silently. Each requirement record must identify the institution, qualification/programme and requirement; official publisher; source page/document title and URL; last verification date; applicable admission cycle; extracted requirement including conditions/exceptions; catalogue version; and curator sign-off status.
- **Freshness:** Re-verify admission sources at least every 30 days, and sooner when a source announces a change, a relevant deadline passes, or the applicable cycle changes. A source that is stale, inaccessible or otherwise unverifiable cannot support a confident eligibility conclusion.
- **Conflicts:** Prefer an official source that explicitly applies to the programme and cycle. A programme-specific source takes precedence over a general institutional page only when its applicability is clear. If authoritative sources remain in conflict, do not guess: mark the affected requirement unresolved and return `UNKNOWN` where the conflict prevents reliable screening, unless a separately verified mandatory failure already determines `NOT_ELIGIBLE` under OR-004.
- **Sign-off/release check:** A curator must verify extracted requirements against the source before publication. Before release/public demo, review the catalogue version, cycle applicability, verification dates and unresolved conflicts. These are required controls, not evidence that tooling or operational checks have been implemented.
- **Impact:** Whether a requirement can be used for ELIGIBLE/NOT_ELIGIBLE.
- **Status:** Resolved — owner-approved contract; source records, curation controls, implementation and verification evidence remain outstanding.

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

## P1 — Resolve before requirements baseline / architecture

### OR-015 — Funding data and matching
Funding matching is in the intended MVP at medium priority. Provider coverage, applicant criteria, permitted learner inputs, required documents, deadline timezone, funding amount/coverage, source freshness and expiry policy are not defined. Resolve before the funding feature is specified for implementation.

### OR-016 — Application tracking lifecycle and data handling
Manual application tracking is in the intended MVP at medium priority. The broad specification lists statuses DRAFT, READY_TO_SUBMIT, SUBMITTED, AWAITING_DOCUMENTS, UNDER_REVIEW, ACCEPTED, REJECTED and WITHDRAWN, but transition rules, who may set statuses, whether `submitted_at` is user-entered, permitted fields, reset/deletion behavior and persistence are not defined. Resolve before tracker implementation. Do not assume accounts or cross-session persistence.

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

**PRD READY: BLOCKED.** OR-001 through OR-005 are resolved by owner decision, including the admission-cycle/source-freshness contract. OR-006 privacy/telemetry and OR-007 the exact learner-facing meaning/scope of ELIGIBLE remain material P0 blockers. The resolved contracts still require implementation, catalogue evidence, tests and release verification; decisions alone do not pass those gates. OR-015 and OR-016 remain P1 because the medium-priority funding and tracker features are in the intended MVP; resolve their data, lifecycle and privacy contracts before implementation. No implementation tasks are created here.
