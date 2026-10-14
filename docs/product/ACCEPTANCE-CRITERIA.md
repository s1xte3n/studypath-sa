# StudyPath SA — MVP Acceptance Criteria

**Status:** Draft; criteria are candidate test oracles. OR-002's field contract is approved; mark/subject validation and other criteria remain subject to open decisions in `OPEN-REQUIREMENTS.md`.  
**Convention:** Each AC has a unique ID and maps to one PRD requirement. These are product acceptance criteria, not evidence that implementation or tests exist.

## REQ-EXP-001 — Anonymous pathway input

- **AC-EXP-001:** Given the explorer is available, when a learner opens it, then they can begin entering pathway inputs without creating an account or supplying a name, email, phone number or national ID.
- **AC-EXP-002:** Given a mark is not a whole-number percentage from 0 through 100 inclusive, is decimal, negative, above 100, malformed, or missing for an entered subject, when submitted, then the field is rejected with a field-specific explanation and no recommendation is generated from that invalid value. Values 0 and 100 are valid; no rounding or coercion is performed.
- **AC-EXP-003:** Given study stage, a subject entry, or a mark for an entered subject is missing, when the learner submits, then the missing required field is identified and the system does not silently substitute zero or another default. Career/study interests, province/intended location, and preferred study mode may be blank without blocking submission.
- **AC-EXP-004:** Given a subject identifier or alias is not explicitly supported by the subject catalogue, when submitted, then the learner is told which subject cannot currently be matched; the system does not silently rename it, use fuzzy matching, or infer an equivalent subject.
- **AC-EXP-005:** Given duplicate entries resolve to the same canonical subject, including through different approved aliases or case/whitespace variants, when submitted, then the duplicate is rejected for learner resolution; the system never double-counts the subject.
- **AC-EXP-006:** Given valid inputs with study stage and at least one subject/mark pair, when submitted, then the current exploration can request matching and render the result or a defined recoverable error; funding need is not requested in this first form.
- **AC-EXP-009:** Given a Grade 11 or Grade 12 learner, then entered marks are treated as current results and are not assumed to be final matric results.
- **AC-EXP-010:** Given a recent matric graduate with incomplete or unavailable final results, then missing information is not inferred or replaced with zero and affected pathway screening returns UNKNOWN where the missing information prevents a reliable conclusion.
- **AC-EXP-011:** Given marks of 0, 1, 99 or 100, when validated, then the values are accepted as valid whole-number percentages.
- **AC-EXP-012:** Given a decimal, negative, above-100 or malformed mark, when validated, then the value is rejected and is never rounded or coerced into a valid mark.
- **AC-EXP-013:** Given a supported subject alias is entered with different letter case or surrounding/repeated whitespace, when normalized, then it resolves only if the normalized alias is explicitly present in the catalogue.
- **AC-EXP-014:** Given an unsupported subject is present alongside valid supported subjects, when matching proceeds, then valid subjects may still be used; any pathway whose reliable eligibility decision is blocked by that unsupported subject is UNKNOWN.
- **AC-EXP-007:** Given a request fails, when the error is shown, then the learner's academic inputs are not included in the visible technical error message.
- **AC-EXP-008:** Given the user resets/leaves the exploration according to the approved reset policy, then temporary inputs/results are cleared according to that policy.

## REQ-CAT-001 — Curated catalogue

- **AC-CAT-001:** Every pathway presented as a real institution/programme has a stable catalogue identity and a recorded authoritative source URL.
- **AC-CAT-002:** Every requirement used to determine eligibility has a source record and verification metadata; if absent or materially stale, the affected result cannot be presented as definitively ELIGIBLE.
- **AC-CAT-003:** When no published catalogue record matches the learner's supported context, the product shows a clear no-results state and does not fabricate an institution or programme.
- **AC-CAT-004:** Where a record lacks location, study mode or another field, the UI identifies that field as unavailable/unknown rather than inventing a value.
- **AC-CAT-005:** When records conflict or refer to a different admission cycle, the system does not silently select a favorable threshold; the affected eligibility is UNKNOWN until reviewed.
- **AC-CAT-006:** The UI does not claim comprehensive coverage of South African institutions; the pilot scope/limitations are discoverable by the learner.
- **AC-CAT-007:** Every requirement used for screening records the institution, qualification/programme and requirement ID; official publisher; source title and URL; last verification date; applicable admission cycle; extracted rule including conditions/exceptions; catalogue version; and curator sign-off status.
- **AC-CAT-008:** A requirement without an explicitly identified applicable admission cycle is not used to produce a confident eligibility result; prior-cycle rules are not silently carried forward.
- **AC-CAT-009:** Admission sources are re-verified at least every 30 days and sooner after a source-announced change, a relevant deadline passes, or the cycle changes. A stale, inaccessible or otherwise unverifiable material requirement cannot support ELIGIBLE.
- **AC-CAT-010:** When official sources conflict, the governing source is selected only when programme/cycle applicability is clear. An unresolved authoritative conflict is recorded and yields UNKNOWN when it could change the result, subject to the approved OR-004 precedence rules.
- **AC-CAT-011:** Before publication, a curator verifies extracted requirements against their sources. Before release/public demo, the catalogue version, cycle applicability, verification dates and unresolved conflicts are reviewed; evidence of the review is retained.

## REQ-MAT-001 — Deterministic eligibility and explanations

- **AC-MAT-001:** For a fixture whose complete applicable hard requirements are known and all are met, the result is ELIGIBLE and each checked requirement has a corresponding explanation/source.
- **AC-MAT-002:** For a fixture with a known applicable hard requirement not met, the result is NOT_ELIGIBLE and the failed requirement and observed input are identified.
- **AC-MAT-003:** For a fixture with a missing required subject result or missing/ambiguous material requirement and no confirmed mandatory failure, the result is UNKNOWN.
- **AC-MAT-004:** If one verified, applicable mandatory requirement fails and another material requirement is unknown, the result is NOT_ELIGIBLE only when the failed rule is genuinely mandatory and no applicable alternative satisfies it; the failed rule and observed input are identified.
- **AC-MAT-005:** If no mandatory requirement is confirmed failed but a required fact/rule is unknown, the result is UNKNOWN; ELIGIBLE requires every applicable mandatory requirement for supported screening to be verified and met.
- **AC-MAT-006:** For an AND/all-required group, any confirmed mandatory failure makes the group fail; otherwise an unknown component makes it unknown; all components must pass for the group to pass.
- **AC-MAT-007:** For an OR/accepted-alternatives group, any verified passing alternative satisfies the group; the group fails only when all alternatives are known to fail; if none passes and any alternative is unknown, the group is unknown.
- **AC-MAT-008:** A verified-false condition skips its dependent requirement; a verified-true condition requires evaluation; an unknown condition that could change the outcome yields UNKNOWN.
- **AC-MAT-009:** APS/points is calculated only from an authoritative, applicable programme/cycle formula that specifies subject inclusion/exclusion, mark conversion and thresholds. Unsupported required calculation details, including unresolved Life Orientation treatment, yield UNKNOWN when outcome-changing; no universal formula is assumed.
- **AC-MAT-010:** Subject substitutions/equivalence are accepted only when explicitly supported by a verified applicable official requirement or approved catalogue rule with provenance. Similar names alone are insufficient; an uncertain or unsupported substitution is not counted as satisfied and yields UNKNOWN when outcome-changing.
- **AC-MAT-011:** The same input and catalogue version produce the same eligibility state and reasons.
- **AC-MAT-012:** Preference ranking cannot change an eligibility state; an ineligible result cannot be labelled eligible because of interest/location fit.
- **AC-MAT-013:** Every displayed reason is traceable to a learner input and/or a structured catalogue rule; generic unsupported claims are prohibited.
- **AC-MAT-014:** If the recommendation dependency fails, the UI reports failure and does not display stale or invented results as current.
- **AC-MAT-015:** No UI text describes ELIGIBLE as admission confirmation, guaranteed admission or a probability of acceptance.

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
- **AC-PRV-002:** Browser storage inspection finds no academic/profile values in localStorage, sessionStorage, IndexedDB, profile cookies or other persistent app-controlled browser storage.
- **AC-PRV-003:** Network inspection confirms marks, subjects, interests, location and study preferences are not sent to analytics, advertising, third-party error-reporting or unrelated third-party endpoints.
- **AC-PRV-004:** Application logs, client error reports and application telemetry contain no raw marks, subject profile, interests, location or other profile payload values.
- **AC-PRV-005:** Product-generated URLs, query strings and referrers do not contain academic inputs or profile values.
- **AC-PRV-006:** Development/demo fixtures and recorded test runs use synthetic values only.
- **AC-PRV-007:** Before a public demo, the privacy notice and actual hosting/provider telemetry configuration and retention policy have been reviewed; the review records verified fields/policy and any unresolved unknowns.
- **AC-PRV-008:** Browser-storage inspection after entry, result generation, reset, navigation and reload finds no profile values in persistent browser storage.
- **AC-PRV-009:** Network inspection confirms no academic inputs or preferences are sent to analytics, advertising, error-reporting or unrelated third-party endpoints, including via SDKs or indirect requests.
- **AC-PRV-010:** Explicit Reset clears current inputs, results and temporary profile state; leaving or reloading does not restore prior values through application-controlled behavior.
- **AC-PRV-011:** Inspection confirms URLs, application logs and client error reports contain no academic profile values.
- **AC-PRV-012:** The privacy notice is shown before learner input and accurately describes in-memory processing, no app profile storage/transmission, and hosting/provider metadata practices verified by review.
- **AC-PRV-013:** Before public demo, evidence records the hosting metadata/retention review, privacy notice review, storage/network inspection results and owner release decision. Any unresolved material provider practice keeps the public-demo privacy gate blocked.

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

## REQ-FUND-001 — Funding opportunities and matching (P1 / medium priority)

- **AC-FUND-001:** Given a published funding opportunity is shown, when the learner opens it, then an authoritative provider source and verification metadata are available.
- **AC-FUND-002:** Given the learner requests funding matches, when criteria are evaluated, then funding eligibility is calculated separately from admission eligibility using only approved structured rules.
- **AC-FUND-003:** Given required criteria or learner inputs are missing or ambiguous, when a match is displayed, then the relevant uncertainty is shown and the system does not claim confirmed eligibility.
- **AC-FUND-004:** Given a deadline is expired, unverified or not applicable to the supported cycle, then the opportunity is not presented with a definitive current deadline or eligibility claim.
- **AC-FUND-005:** Given no published opportunity meets the supported criteria, then the system displays an honest empty state and does not fabricate opportunities.

## REQ-APP-001 — Manual application tracker (P1 / medium priority)

- **AC-APP-001:** Given the approved tracker data-handling model is available, when a learner adds an application, then the entry references a supported pathway or funding opportunity and uses only approved fields.
- **AC-APP-002:** Given a learner updates an application, when a status transition is requested, then only an approved transition is accepted; invalid transitions produce an understandable error.
- **AC-APP-003:** Given a tracker status is displayed, then it is clearly labelled as learner-reported unless a separately approved and implemented source verifies it.
- **AC-APP-004:** Given a save/update fails or persistence is unavailable, then the UI reports failure and does not claim the change was saved.
- **AC-APP-005:** Given tracker data is reset or deleted under the approved lifecycle, then the data is removed according to that policy and is not exposed in telemetry.
- **AC-APP-006:** Given persistence is approved, when a learner requests a tracker entry, then only the authorised owner/session can access it; cross-user isolation tests pass before release.

## Criteria requiring owner decisions before baseline approval

- The approved mark range/precision, subject normalization, alias-only lookup, duplicate policy and unsupported-subject behavior are recorded under OR-003; the concrete supported subject vocabulary and aliases must be maintained explicitly in the catalogue.
- OR-005 admission-cycle and source-freshness contract is approved; catalogue records and release checks still require implementation and evidence. OR-004 eligibility precedence and supported composite rules are approved.
- Funding provider coverage, supported criteria, required learner inputs, deadline timezone, freshness and expiry policy (OR-015).
- Tracker statuses/transitions, authority of `submitted_at`, allowed fields, reset/deletion behavior and whether any persistence is permitted (OR-016).
- Supported browsers/viewports, accessibility conformance level and performance thresholds.
- OR-006 policy is approved; implementation evidence for reset/temporary-data lifecycle, storage/network inspection and exact hosting telemetry/retention review is required before public demo.
