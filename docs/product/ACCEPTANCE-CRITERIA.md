# StudyPath SA — MVP Acceptance Criteria

**Status:** Approved by product owner on 2026-10-14 as the MVP acceptance-criteria baseline; criteria are targets/test oracles, not evidence that implementation or tests exist. Actual catalogue/relationship records, implementation, test execution and verification evidence remain outstanding.  
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
- **AC-CAT-012:** Before pilot acceptance, the published catalogue contains 6–8 distinct, curated programme records with complete applicable source/cycle/freshness/sign-off metadata. Prioritise Gauteng; include degree, diploma, higher-certificate or TVET options only where official evidence supports them. The UI does not claim national coverage, and Phase 0 source checks do not count as complete catalogue records unless they meet the same publication criteria.

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
- **AC-MAT-016:** Given a pathway is classified `ELIGIBLE`, when its decision evidence is inspected, then every applicable mandatory minimum requirement needed for the supported screening is present in a complete rule set, verified for the explicit admission cycle, current under the source-freshness policy, curator-signed-off, and met by the learner; no partial or unverified rule set can produce `ELIGIBLE`.
- **AC-MAT-017:** Given a programme's minimum criteria are incomplete, unsupported or materially unresolved, when the programme is shown for discovery, then its eligibility is `UNKNOWN` and the UI explains the material limitation; the programme is not silently excluded solely because confident screening is unavailable.
- **AC-MAT-018:** Given eligibility is `ELIGIBLE`, when the result is presented, then the learner-facing explanation states that the learner meets only the verified minimum requirements assessed for the programme and admission cycle, and explicitly says this is not an admission decision or guarantee and the institution makes the final decision.
- **AC-MAT-019:** Given a programme has `UNKNOWN` eligibility because a material criterion is incomplete or unsupported, when interest, location, study mode or any ranking preference is changed, then the eligibility remains `UNKNOWN` unless the underlying verified requirements/input facts change; ranking never upgrades eligibility.
- **AC-MAT-020:** Given an applicable verified mandatory requirement fails and no applicable alternative satisfies it, when other material requirements remain unknown, then the result follows OR-004 precedence and is `NOT_ELIGIBLE`; the completeness gate must not incorrectly override a confirmed mandatory failure.
- **AC-MAT-021:** Results are grouped deterministically by eligibility state, with stable catalogue order within each group; no weighted numeric preference score is calculated or displayed. Supported interest, location and study-mode fit appears only as separate plain-language labels. A missing/unsupported preference is “not assessed” or “not available”, and preference fit never changes eligibility.

## REQ-ALT-001 — Alternatives

- **AC-ALT-001:** Every displayed alternative has a curated pathway identity and a reviewed relationship or an explicit, approved matching basis.
- **AC-ALT-002:** Each relationship is labelled accurately (for example alternative, related field, progression or articulation) where that relationship type is available and verified.
- **AC-ALT-003:** An alternative's eligibility state is calculated independently using its own requirements; it is not inherited from the preferred pathway.
- **AC-ALT-004:** When no verified alternatives exist, the product explains that the current pilot has no verified alternative to show.
- **AC-ALT-005:** The product does not claim guaranteed credit transfer, articulation or admission through an alternative pathway.
- **AC-ALT-006:** Every published relationship records its type (`ALTERNATIVE`, `RELATED_FIELD`, `PROGRESSION` or `ARTICULATION`), explanation/rationale, documented provenance, verification date and curator approval, plus an official evidence source/URL where applicable. A relationship missing required metadata is not presented as verified.
- **AC-ALT-007:** An `ARTICULATION` relationship is published only with explicit official evidence supporting that articulation claim. Similar names, subjects or apparent similarity are not sufficient; uncertain relationships are withheld or explicitly described as unverified rather than asserted as fact.

## REQ-DET-001 — Details and official next steps

- **AC-DET-001:** Opening a displayed pathway shows its institution and qualification/programme identity.
- **AC-DET-002:** The details view shows available location, study mode and requirements, and marks unavailable fields as unknown/unavailable.
- **AC-DET-003:** Every displayed admission requirement and deadline has a source URL and verification context; an unverified deadline is not displayed as authoritative.
- **AC-DET-004:** Each official next-step link resolves to the URL recorded for the corresponding source record and has a meaningful accessible label.
- **AC-DET-005:** An unknown pathway identifier produces a clear not-found state and does not expose unrelated catalogue information.
- **AC-DET-006:** Details and results clearly state that the institution/provider makes the final admission decision.
- **AC-DET-007:** Next-step content is limited to official source links and neutral, source-backed guidance to verify requirements or continue with the institution/provider; no personalised action planner, predefined next-action taxonomy, application submission or unsupported deadline is implied.

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

- **AC-UX-001:** At 320 CSS pixels wide, all core controls and result content remain usable without unintended horizontal scrolling.
- **AC-UX-002:** Every form input has a programmatic label and applicable constraints/instructions.
- **AC-UX-003:** The core flow can be completed using keyboard alone, with visible focus and a logical focus order.
- **AC-UX-004:** Validation errors are associated with their inputs and communicated without relying on colour alone.
- **AC-UX-005:** ELIGIBLE, NOT_ELIGIBLE and UNKNOWN are distinguishable by text and semantics, not colour alone.
- **AC-UX-006:** Loading, no-results, dependency failure and not-found states are understandable and provide an appropriate next action.
- **AC-UX-007:** External source links have descriptive accessible names and do not unexpectedly discard entered state.
- **AC-UX-008:** Accessibility and performance checks are executed against the recorded test environment and browser matrix; test reports identify versions and any browser not tested.
- **AC-UX-009:** The experience targets WCAG 2.2 AA and remains usable at a minimum viewport width of 320 CSS pixels; keyboard operation, visible focus, programmatic labels, associated validation errors, contrast and non-colour-only states are checked. The target is not reported as achieved until evidence is recorded.
- **AC-UX-010:** The current stable Chrome, Edge, Firefox and Safari versions are tested where available; tested versions and unavailable/untested browsers are documented without implying unsupported coverage.
- **AC-UX-011:** Using synthetic fixtures and up to 100 catalogue records on an agreed, recorded test device/browser, in-browser matching completes within 1 second at p95. Record the measurement method and result; a target alone is not a pass. Network-service targets require separate approval if network-dependent services are introduced.

## Cross-cutting verification criteria

- **AC-NFR-001:** A catalogue audit shows 100% of requirements used for eligibility have an authoritative source and verification metadata; exceptions force UNKNOWN rather than unsupported certainty.
- **AC-NFR-002:** A versioned synthetic golden set contains at least 20 cases covering positive eligibility, mandatory failure, UNKNOWN/missing data, composite AND/OR/conditional rules, stale/conflicting sources and unsupported calculations. Every expected classification matches and there are zero false-positive `ELIGIBLE` results before matching-rule acceptance.
- **AC-NFR-003:** No implementation is accepted based solely on HTTP 2xx or a visually plausible screen; assertions cover displayed state, reasons, source references, privacy behavior and failure states.
- **AC-NFR-004:** No criterion is marked passed until an actual test or review has been executed and its evidence recorded.
- **AC-NFR-005:** If five representative users are available, conduct a moderated usability check and record tasks, completion and observed issues. If five users are unavailable, document the limitation and the evidence actually obtained; do not describe a small convenience sample as statistically representative.

## REQ-FUND-001 — Funding opportunities and matching (P1 / medium priority)

- **AC-FUND-001:** Every published opportunity links to an authoritative official provider/government source and displays verification metadata.
- **AC-FUND-002:** Funding matching uses deterministic structured criteria and is evaluated separately from admission eligibility.
- **AC-FUND-003:** Missing, ambiguous, unsupported or disallowed material criteria are explained; the system does not claim confirmed eligibility and returns UNKNOWN where appropriate.
- **AC-FUND-004:** Expired, stale, unverified or cycle-inapplicable opportunities are not presented as currently available with a definitive deadline or eligibility claim.
- **AC-FUND-005:** If no published opportunity meets supported criteria, the system shows an honest empty state and does not fabricate opportunities.
- **AC-FUND-006:** The pilot contains no more than the approved 3–5 curated opportunities until scope is explicitly changed; each has curator sign-off and official provenance.
- **AC-FUND-007:** Each funding record includes provider/opportunity identity, criteria/conditions, required-document checklist metadata, amount/coverage as published, deadline/timezone as stated, applicable cycle, source title/URL, verification date, catalogue version, curator sign-off and expiry/currentness state. Missing values are shown as unknown, not invented.
- **AC-FUND-008:** Funding records are re-verified at least every 30 days and sooner after a provider change, deadline passage or applicability/cycle change; stale or expired records are flagged and excluded from current definitive matches.
- **AC-FUND-009:** Funding inputs are limited to study stage, intended field/interest and location. No national ID, household income, bank details, family/financial documents or document uploads are requested in this pilot; where a material provider criterion cannot be assessed within this boundary, uncertainty is disclosed.

## REQ-APP-001 — Manual application tracker (P1 / medium priority)

- **AC-APP-001:** Every tracker entry references a supported pathway or funding-opportunity catalogue ID and contains only approved tracker fields.
- **AC-APP-002:** Only transitions in the OR-016 transition table are accepted; all other transitions produce an understandable error and leave the prior state unchanged.
- **AC-APP-003:** Every displayed status is clearly labelled learner-reported. An optional submitted_at value is manually entered and is not presented as independently verified.
- **AC-APP-004:** Invalid updates or unavailable state produce an error and never falsely report a successful save.
- **AC-APP-005:** Reset/delete clears the active tracker entries according to the current approved lifecycle, and tracker values are not exposed in telemetry.
- **AC-APP-006:** No tracker entry can expose another server-side user's data; if any persistence model is approved later, its access/isolation risks must be tested before release. Browser-local storage must not be represented as account-level ownership or secure isolation.
- **AC-APP-007:** Until explicit OR-006-compatible change control and privacy/security review authorizes persistent tracker-only storage, entries exist only in memory and are not restored after reload.
- **AC-APP-008:** If tracker-only persistence is approved in a future change, storage contains only the approved catalogue ID, status, optional learner-entered submission date and timestamps; it contains no academic/profile inputs/results, copied pathway snapshots, identity/contact details, sensitive notes, financial documents or uploads.
- **AC-APP-009:** ACCEPTED, REJECTED and WITHDRAWN are terminal statuses; an attempt to transition from a terminal status is rejected and requires a new entry for a new application/attempt.

## Deferred feature contract checks — not initial MVP acceptance gates

These criteria record future semantics approved under OR-017 and OR-018. They do not add the features to the initial MVP or imply implementation.

### Future cost planner (OR-017)

- **AC-COST-FUT-001:** All displayed costs and funding amounts use ZAR and show source, verification date and estimate/confirmed labeling.
- **AC-COST-FUT-002:** Once-off/first-year costs and recurring annual costs are shown separately; missing or unverified categories are unknown, never zero.
- **AC-COST-FUT-003:** Only confirmed funding is deducted from the confirmed-only estimate; potential funding is displayed separately and never deducted.
- **AC-COST-FUT-004:** If any essential cost category is missing or stale, the planner does not display a definitive total funding gap.
- **AC-COST-FUT-005:** A calculated amount below zero is displayed as ZAR 0 remaining gap with any excess shown separately as surplus/over-coverage.

### Future AI/document safeguards (OR-018)

- **AC-AI-FUT-001:** No document upload, extraction or AI document chat is present in the initial MVP.
- **AC-AI-FUT-002:** Any future AI/document proposal specifies consent and purpose, permitted types/size, upload validation/malware handling, access control, retention and verifiable deletion before implementation.
- **AC-AI-FUT-003:** Any future extraction flow displays uncertainty/confidence appropriately and requires human verification against authoritative sources before extracted requirements are used.
- **AC-AI-FUT-004:** Uploaded content is treated as untrusted input; prompt-injection defenses and controls against document/data exfiltration are specified and tested.
- **AC-AI-FUT-005:** AI never decides admission or funding eligibility; deterministic, verified rules remain authoritative.
## Remaining decisions and verification evidence

- The approved mark range/precision, subject normalization, alias-only lookup, duplicate policy and unsupported-subject behavior are recorded under OR-003; the concrete supported subject vocabulary and aliases must be maintained explicitly in the catalogue.
- OR-004 eligibility precedence, OR-005 admission-cycle/source-freshness, OR-006 privacy/telemetry and OR-007 eligibility meaning/discovery contracts are approved; catalogue records, completeness gates, UI explanations and release checks still require implementation and evidence.
- OR-015 funding rules are approved; the 3–5 official-source records, curation evidence and implementation remain outstanding.
- OR-016 lifecycle, transition, field and page-memory-only persistence rules are approved. Persistent tracker storage is excluded from the initial MVP.
- OR-017 cost-planner semantics and OR-018 future AI/document safeguards are recorded for later scope; neither feature is part of initial MVP acceptance.
- OR-008–OR-014 decisions are owner-approved; actual catalogue completeness, relationship evidence, accessibility conformance, performance measurements, golden-set results and usability evidence remain to be verified.
- OR-006 policy is approved; implementation evidence for reset/temporary-data lifecycle, storage/network inspection and exact hosting telemetry/retention review is required before public demo.
