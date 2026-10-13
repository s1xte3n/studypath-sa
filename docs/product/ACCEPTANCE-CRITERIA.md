# StudyPath SA — MVP Acceptance Criteria

**Status:** Draft; criteria are candidate test oracles pending decisions in `OPEN-REQUIREMENTS.md`.  
**Convention:** Each AC has a unique ID and maps to one PRD requirement. These are product acceptance criteria, not evidence that implementation or tests exist.

## REQ-EXP-001 — Anonymous pathway input

- **AC-EXP-001:** Given the explorer is available, when a learner opens it, then they can begin entering pathway inputs without creating an account or supplying a name, email, phone number or national ID.
- **AC-EXP-002:** Given a mark outside the approved range or in an invalid format, when submitted, then the input is rejected with a field-specific explanation and no recommendation is generated from the invalid value.
- **AC-EXP-003:** Given a required field is missing, when the learner submits, then the field is identified and the system does not silently substitute zero or another default.
- **AC-EXP-004:** Given a subject is not in the supported vocabulary, when submitted, then the learner is told the subject cannot currently be matched; the system does not infer a different subject silently.
- **AC-EXP-005:** Given duplicate subject entries, when submitted, then the learner is asked to resolve the duplicate or the approved deterministic duplicate policy is applied; results must not double-count a subject.
- **AC-EXP-006:** Given valid inputs, when submitted, then the current exploration can request matching and render the result or a defined recoverable error.
- **AC-EXP-007:** Given a request fails, when the error is shown, then the learner's academic inputs are not included in the visible technical error message.
- **AC-EXP-008:** Given the user resets/leaves the exploration according to the approved reset policy, then temporary inputs/results are cleared according to that policy.

## REQ-CAT-001 — Curated catalogue

- **AC-CAT-001:** Every pathway presented as a real institution/programme has a stable catalogue identity and a recorded authoritative source URL.
- **AC-CAT-002:** Every requirement used to determine eligibility has a source record and verification metadata; if absent or materially stale, the affected result cannot be presented as definitively ELIGIBLE.
- **AC-CAT-003:** When no published catalogue record matches the learner's supported context, the product shows a clear no-results state and does not fabricate an institution or programme.
- **AC-CAT-004:** Where a record lacks location, study mode or another field, the UI identifies that field as unavailable/unknown rather than inventing a value.
- **AC-CAT-005:** When records conflict or refer to a different admission cycle, the system does not silently select a favorable threshold; the affected eligibility is UNKNOWN until reviewed.
- **AC-CAT-006:** The UI does not claim comprehensive coverage of South African institutions; the pilot scope/limitations are discoverable by the learner.

## REQ-MAT-001 — Deterministic eligibility and explanations

- **AC-MAT-001:** For a fixture whose complete applicable hard requirements are known and all are met, the result is ELIGIBLE and each checked requirement has a corresponding explanation/source.
- **AC-MAT-002:** For a fixture with a known applicable hard requirement not met, the result is NOT_ELIGIBLE and the failed requirement and observed input are identified.
- **AC-MAT-003:** For a fixture with a missing required subject result or missing/ambiguous material requirement, the result is UNKNOWN unless a separate known failure already determines NOT_ELIGIBLE under the approved precedence rule.
- **AC-MAT-004:** A mark exactly equal to a verified minimum threshold is treated according to the published comparison operator; if the operator is not known, result is UNKNOWN.
- **AC-MAT-005:** Unsupported APS/points calculations, subject equivalence, qualification-specific exceptions or admission-cycle rules do not get inferred by the UI or an AI model.
- **AC-MAT-006:** The same input and catalogue version produce the same eligibility state and reasons.
- **AC-MAT-007:** Preference ranking cannot change an eligibility state; an ineligible result cannot be labelled eligible because of interest/location fit.
- **AC-MAT-008:** Every displayed reason is traceable to a learner input and/or a structured catalogue rule; generic unsupported claims are prohibited.
- **AC-MAT-009:** If the recommendation dependency fails, the UI reports failure and does not display stale or invented results as current.
- **AC-MAT-010:** No UI text describes ELIGIBLE as admission confirmation, guaranteed admission or a probability of acceptance.

## REQ-ALT-001 — Alternatives

- **AC-ALT-001:** Every displayed alternative has a curated pathway identity and a reviewed relationship or an explicit, approved matching basis.
- **AC-ALT-002:** Each relationship is labelled accurately (for example alternative, related field, progression or articulation) where that relationship type is available and verified.
- **AC-ALT-003:** An alternative's eligibility state is calculated independently using its own requirements; it is not inherited from the preferred pathway.
- **AC-ALT-004:** When no verified alternatives exist, the product explains that the current pilot has no verified alternative to show.
- **AC-ALT-005:** The product does not claim guaranteed credit transfer, articulation or admission through an alternative pathway.

## REQ-DET-001 — Details and official next steps

- **AC-DET-001:** Opening a displayed pathway shows its institution and qualification/programme identity.
- **AC-DET-002:** The details view shows available location, study mode and requirements, and marks unavailable fields as unknown/unavailable.
- **AC-DET-003:** Every displayed admission requirement and deadline has a source URL and verification context; an unverified deadline is not displayed as authoritative.
- **AC-DET-004:** Each official next-step link resolves to the URL recorded for the corresponding source record and has a meaningful accessible label.
- **AC-DET-005:** An unknown pathway identifier produces a clear not-found state and does not expose unrelated catalogue information.
- **AC-DET-006:** Details and results clearly state that the institution/provider makes the final admission decision.

## REQ-PRV-001 — Privacy-minimising anonymous exploration

- **AC-PRV-001:** A learner can complete the supported core flow without authentication or identifying information.
- **AC-PRV-002:** Browser storage inspection after entry/submission shows no persistent copy of academic profile values beyond the approved temporary in-memory/session behavior.
- **AC-PRV-003:** Network inspection confirms marks, subjects and preferences are not sent to analytics, advertising, error-reporting or unrelated third-party endpoints.
- **AC-PRV-004:** Application logs and client error reports contain no raw marks, subject profile, interests or other profile payload values.
- **AC-PRV-005:** URLs, query strings and referrers generated by the product do not contain academic inputs.
- **AC-PRV-006:** Development/demo fixtures use synthetic values only.
- **AC-PRV-007:** Before a public demo, the privacy notice and hosting/provider telemetry/retention configuration have been reviewed; this is a release gate, not inferred from frontend behavior alone.

## REQ-UX-001 — Accessible mobile-first experience

- **AC-UX-001:** At the approved minimum viewport, all core controls and result content remain usable without unintended horizontal scrolling.
- **AC-UX-002:** Every form input has a programmatic label and applicable constraints/instructions.
- **AC-UX-003:** The core flow can be completed using keyboard alone, with visible focus and a logical focus order.
- **AC-UX-004:** Validation errors are associated with their inputs and communicated without relying on colour alone.
- **AC-UX-005:** ELIGIBLE, NOT_ELIGIBLE and UNKNOWN are distinguishable by text and semantics, not colour alone.
- **AC-UX-006:** Loading, no-results, dependency failure and not-found states are understandable and provide an appropriate next action.
- **AC-UX-007:** External source links have descriptive accessible names and do not unexpectedly discard entered state.
- **AC-UX-008:** Accessibility and performance tests run against the approved browser/device matrix and quantitative thresholds; until these are approved, this criterion is not fully measurable.

## Cross-cutting verification criteria

- **AC-NFR-001:** A catalogue audit shows 100% of requirements used for eligibility have an authoritative source and verification metadata; exceptions force UNKNOWN rather than unsupported certainty.
- **AC-NFR-002:** Synthetic golden cases cover positive eligibility, known failure, missing inputs, missing rules, exact thresholds, conflicting sources, no results and unsupported calculations.
- **AC-NFR-003:** No implementation is accepted based solely on HTTP 2xx or a visually plausible screen; assertions cover displayed state, reasons, source references, privacy behavior and failure states.
- **AC-NFR-004:** No criterion is marked passed until an actual test or review has been executed and its evidence recorded.

## Criteria requiring owner decisions before baseline approval

- Mark range, precision, missing/optional fields and supported subject vocabulary.
- Eligibility precedence when one rule fails while another is unknown.
- Definition of stale source and applicable admission cycle.
- Supported browsers/viewports, accessibility conformance level and performance thresholds.
- Reset/temporary-data lifecycle and exact hosting telemetry review.
- Whether funding matching and manual application tracking belong in this MVP despite the approved Phase 0 cut line.
