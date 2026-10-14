# StudyPath SA — Open Product Requirements

**Status:** OR-001–OR-018 decisions are recorded. OR-016 lifecycle and page-memory-only persistence are aligned with the approved policy review; persistent storage is excluded from the initial MVP.  
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
- **Decision:** **Resolved by owner on 2026-10-14.** Apply the privacy and telemetry contract below to the MVP:
  1. **Data minimisation:** Development/demo flows use synthetic data only. Do not require or collect learner names, contact details, national IDs or accounts. Real learner data remains prohibited until the required privacy/legal review is complete.
  2. **Browser storage:** Academic/profile inputs and results remain in memory for the active exploration only. Do not write them to localStorage, sessionStorage, IndexedDB, profile cookies or URLs/query parameters.
  3. **Reset and exit:** An explicit Reset clears inputs, results and temporary profile state. Leaving or reloading ends the exploration; do not restore prior profile values through browser navigation where app behavior can control this. Browser-managed history/autofill behavior must be inspected and addressed where controllable.
  4. **Application telemetry:** Do not include profile values in application logs, client error reports or telemetry. Do not add analytics SDKs, advertising trackers or third-party error reporters to the MVP. No academic inputs/preferences may be sent to analytics, advertising or unrelated third-party endpoints.
  5. **Hosting/security metadata:** Provider-generated hosting/access/security logs may contain technical metadata, potentially including IP address and browser/device information. Do not assume collection is disabled, anonymised or short-lived. Inspect actual hosting configuration and provider policies, then record the fields and retention that can be verified before public demo.
  6. **Privacy notice:** Before learner input, present a plain-language notice describing in-memory processing, the absence of app profile storage/transmission, and any hosting/provider metadata collection that the review verifies. The notice must describe observed behavior, not intended behavior alone.
  7. **Retention:** The application retains no learner profile after the temporary exploration ends. Provider-generated metadata follows the provider's documented policy; record verified details rather than inventing a retention period.
  8. **Review/release accountability:** The project owner records the privacy notice review, actual hosting/provider metadata and retention review, and inspection evidence before public demo. Real learner data remains prohibited until applicable privacy/legal review is complete.
- **Acceptance criteria:** AC-PRV-001 through AC-PRV-013 in ACCEPTANCE-CRITERIA.md.
- **Impact:** Privacy acceptance tests and release readiness. Approval resolves the policy decision only; actual implementation, provider configuration review and test evidence remain outstanding.
- **Status:** Resolved by owner decision; implementation and release verification remain a blocker. Do not represent the app as cleared for real learner data.

### OR-007 — What does ELIGIBLE mean in the MVP?
- **Decision:** **Resolved by owner on 2026-10-14.** `ELIGIBLE` means the learner meets every applicable mandatory minimum requirement covered by the supported screening, where the full applicable rule set is complete, verified for the programme's admission cycle, current under OR-005, and curator-signed-off. It is not an admission decision, prediction or guarantee. The institution makes the final admission decision.
- **Classification boundary:** Apply OR-004 precedence. Return `NOT_ELIGIBLE` when a verified, applicable genuinely mandatory requirement fails and no applicable alternative satisfies it. Return `UNKNOWN` when no confirmed mandatory failure determines the result but a material input, requirement, source, cycle applicability, calculation or rule remains missing, stale, unsupported or unresolved. Never return `ELIGIBLE` from a partial or unverified rule set.
- **Discovery boundary:** A programme may remain discoverable when its full minimum criteria are unavailable, but its eligibility must be `UNKNOWN` with a clear explanation of what is unavailable or unsupported. Discovery, interest/location fit or ranking must not upgrade eligibility or imply the learner meets requirements.
- **Learner-facing wording:** “You meet the verified minimum requirements we assessed. Based on the official requirements verified for this programme and admission cycle, you meet all applicable minimum requirements covered by our supported screening. This is not an admission decision or a guarantee of acceptance. The institution makes the final admission decision.”
- **Impact:** Core trust/safety, eligibility explanations and UI copy.
- **Status:** Resolved — owner-approved policy; catalogue completeness checks, UI implementation and test evidence remain outstanding.

## P1 — Resolve before requirements baseline / architecture

### OR-008 — Catalogue scope and minimum coverage
- **Decision:** **Resolved by owner on 2026-10-14.** The initial pilot targets **6–8 curated programme records**, prioritising Gauteng and official sources that can be maintained and verified reliably. Include degrees, diplomas, higher certificates or TVET options only where relevant official evidence supports the record; do not force qualification-type or province coverage for appearance's sake.
- **Boundary:** The 6–8 figure is a pilot catalogue target, not a national coverage claim. The two UJ pages checked in Phase 0 do not by themselves establish that 6–8 complete, publication-ready records exist. Each published record remains subject to OR-005 source/cycle/freshness/sign-off controls and OR-007 eligibility completeness.
- **Status:** Resolved — scope target approved; record selection, curation and verification evidence remain outstanding.

### OR-009 — Alternative relationship model
- **Decision:** **Resolved by owner on 2026-10-14.** Supported relationship types are `ALTERNATIVE`, `RELATED_FIELD`, `PROGRESSION` and `ARTICULATION`. Every published relationship must have a documented type, rationale/explanation, provenance, verification date and curator approval. Record an official evidence source/URL where applicable. An `ARTICULATION` relationship requires explicit official evidence; do not infer articulation, credit transfer or progression from similarity of names or subjects.
- **Boundary:** Relationship publication does not guarantee admission, credit transfer, articulation or progression. If evidence is missing, stale, conflicting or insufficient for the claimed type, do not publish the relationship as verified; show no relationship or disclose the uncertainty.
- **Status:** Resolved — evidence policy approved; curated relationship records and verification evidence remain outstanding.

### OR-010 — Preference ranking
- **Decision:** **Resolved by owner on 2026-10-14.** Do not calculate or display a weighted numeric preference score. Group results deterministically by eligibility state; within each group use a stable catalogue order. Show separate, plain-language preference-fit labels only for supported interests, location and study mode.
- **Missing preferences:** A blank or unsupported preference is labelled “not assessed” or “not available”; it is not treated as a mismatch or a positive fit. Eligibility is calculated independently and must never be upgraded by preference fit. The groups and fit labels must not imply admission probability or certainty.
- **Status:** Resolved — grouping policy approved; presentation and deterministic behavior still require implementation and tests.

### OR-011 — Accessibility and browser support
- **Decision:** **Resolved by owner on 2026-10-14.** Target **WCAG 2.2 Level AA** and a minimum supported viewport of **320 CSS pixels**. Test the current stable versions of Chrome, Edge, Firefox and Safari where available; record tested versions and report unavailable/untested browsers honestly.
- **Required checks:** Include keyboard-only operation, visible focus, programmatic labels, input-associated errors, contrast, status not conveyed by colour alone, responsive layout and accessible loading/empty/error states.
- **Status:** Resolved — target and test matrix approved; conformance and browser-test evidence remain outstanding.

### OR-012 — Failure behavior and performance targets
- **Decision:** **Resolved by owner on 2026-10-14.** For in-browser matching, target **p95 completion at or below 1 second for up to 100 catalogue records** on an agreed, recorded test device/browser using synthetic fixtures.
- **Failure behavior:** Do not leave the interface loading indefinitely. Show a recoverable, understandable error and a retry/return path where appropriate; never include academic/profile values in technical error text. This matching target is a requirement, not a measured result.
- **Network boundary:** If network-dependent services are introduced, define and approve their timeout, retry, availability and low-bandwidth targets before implementation or release; the local matching target does not establish network performance.
- **Status:** Resolved — target approved; agreed test environment and measurement evidence remain outstanding.

### OR-013 — Success metric thresholds
- **Decision:** **Resolved by owner on 2026-10-14.** Maintain a versioned golden set of at least **20 synthetic cases** spanning positive eligibility, mandatory failure, UNKNOWN/missing data, composite AND/OR/conditional rules, stale or conflicting sources and unsupported calculations.
- **Acceptance target:** All expected classifications must match, with **zero false-positive `ELIGIBLE` results**. Any mismatch blocks acceptance of the matching rules until investigated and corrected. This is a target for future verification, not evidence that the set or tests already exist.
- **Usability evidence:** If five representative users are available, run a moderated usability check and record task completion and observed issues. If five users are unavailable, record the limitation and the evidence actually obtained; do not claim statistical validation from a small convenience sample.
- **Status:** Resolved — measures approved; golden-set creation, test execution and usability evidence remain outstanding.

### OR-014 — Ownership and review
- **Decision:** **Resolved by owner on 2026-10-14.** Accept temporary single-owner review for the hackathon MVP. The owner is responsible for curating and signing off source/relationship records, retaining review evidence, running available automated checks and completing a release checklist.
- **Risk control:** Seek independent review before public learner use. If an independent reviewer is unavailable, document that limitation and do not claim independent assurance. This temporary arrangement does not waive OR-005 source verification, OR-007 completeness requirements, privacy/legal review, or the ban on real learner data before the required review.
- **Status:** Resolved — temporary governance arrangement approved; actual review records and release evidence remain outstanding.

### OR-015 — Funding data and matching

- **Decision:** **Resolved by owner on 2026-10-14.** The initial P1 funding pilot targets **3–5 curated opportunities** published by official funding providers or government sources. Do not imply national coverage.
- **Permitted learner inputs:** Limit matching inputs to non-sensitive study stage, intended field/interest, and province or intended location. Do not collect national ID, household income, bank details, family/financial documents or other sensitive financial data for this pilot. If a provider's material criteria require unsupported or sensitive information, show the limitation and return UNKNOWN where appropriate; direct the learner to the official provider rather than guessing.
- **Required funding record:** Record provider and opportunity identity; official publisher and source title/URL; applicable applicant/study criteria and conditions; required documents as an informational checklist only (no uploads); amount/coverage and whether one-off, annual or otherwise specified; deadline exactly as published, including timezone when stated; applicable cycle; last verification date; catalogue version; curator sign-off; and expiry/currentness state. Do not infer missing award values or deadline timezones.
- **Freshness and expiry:** Re-verify at least every 30 days, and sooner when the provider announces a change, a deadline passes, or applicability/cycle changes. Expired or unverifiable opportunities must not be presented as currently available. If the source omits a material deadline detail, disclose the gap.
- **Matching semantics:** Use deterministic, source-backed criteria. Keep funding eligibility separate from admission eligibility. Apply the approved ELIGIBLE, NOT_ELIGIBLE, and UNKNOWN semantics and never guarantee an award, imply funding approval, or claim to submit an application.
- **Status:** Resolved — rules approved; 3–5 source-verified records, curation evidence, implementation and tests remain outstanding.

### OR-016 — Application tracking lifecycle and data handling

- **Decision:** **Owner-approved on 2026-10-14.** Define a learner-reported status lifecycle, permitted fields and **page-memory-only persistence**. The separate `POLICY-SELECTIONS-REVIEW.md` confirms no server/database, localStorage, sessionStorage, cookies, account or cloud sync; reload/close may discard entries. This supersedes older wording that described browser-local persistence as a future direction.
- **Status set:** DRAFT, READY_TO_SUBMIT, SUBMITTED, AWAITING_DOCUMENTS, UNDER_REVIEW, ACCEPTED, REJECTED, WITHDRAWN.
- **Allowed transitions:** DRAFT → READY_TO_SUBMIT; READY_TO_SUBMIT → DRAFT or SUBMITTED; SUBMITTED → AWAITING_DOCUMENTS, UNDER_REVIEW, ACCEPTED, REJECTED or WITHDRAWN; AWAITING_DOCUMENTS → SUBMITTED, UNDER_REVIEW or WITHDRAWN; UNDER_REVIEW → AWAITING_DOCUMENTS, ACCEPTED, REJECTED or WITHDRAWN. WITHDRAWN may also be selected from DRAFT or READY_TO_SUBMIT. ACCEPTED, REJECTED and WITHDRAWN are terminal; create a new tracker entry for a new application or later application attempt.
- **Status authority and dates:** Every status is learner-reported. submitted_at is optional, entered by the learner, and is not verified by StudyPath SA. Never imply the app submitted, received or verified an application.
- **Permitted tracker fields:** A supported pathway/funding-opportunity catalogue ID, status, optional learner-entered submission date, and system-created/updated timestamps. Do not store identity/contact details, academic marks, subjects, interests/preferences, a snapshot of profile/results, sensitive notes, financial documents or uploaded files. Link to catalogue records rather than copying pathway/profile content.
- **Persistence:** Tracker entries exist in page memory for the current page session only. Do not use server/database persistence, localStorage, sessionStorage, IndexedDB, cookies, accounts or cloud sync. Reload/close may discard entries; disclose this before tracking and never claim entries are saved or recoverable. Profile inputs/results are also memory-only. A future persistence proposal is out of scope for this MVP and requires a new explicit owner decision plus privacy/security review before implementation.
- **Reset and deletion:** Core exploration Reset clears profile inputs/results. A separate tracker-clear/delete action must remove all tracker entries from the active session; if persistent storage is approved in a future change, it must also delete the corresponding stored entries. Do not claim deletion from storage that has not been implemented or verified.
- **Status:** Lifecycle, data minimisation and page-memory-only persistence are resolved and aligned with the approved policy review. Implementation and tests remain outstanding.

### OR-017 — Cost planner semantics

- **Decision:** **Resolved by owner on 2026-10-14 as future-scope rules only.** Cost planning is deferred from the initial MVP and must not displace P0 pathway discovery or P1 funding/tracker correctness.
- **Future calculation rules:** Display values in South African rand (ZAR); distinguish once-off/first-year costs from recurring annual costs; show source, verification date and whether a value is an estimate. Missing or unverified categories are unknown, never zero. Deduct only funding explicitly recorded as confirmed, and label it learner-reported unless independently verified; show potential funding separately and do not deduct it from the confirmed-only estimate.
- **Funding gap:** Calculate a definitive gap only when all essential cost categories for the selected estimate are known and current. If essential inputs are missing, show an incomplete estimate without a definitive gap. A negative arithmetic result must not be shown as a negative funding need: show a remaining gap of ZAR 0 and any excess separately as a surplus/over-coverage amount.
- **Status:** Resolved for future design; feature remains out of the initial MVP and no cost values are approved or populated by this decision.

### OR-018 — AI/document assistant

- **Decision:** **Resolved by owner on 2026-10-14.** Defer the AI/document assistant entirely from the initial MVP. Do not implement document uploads, document extraction, AI document chat or AI-based eligibility decisions in the initial MVP.
- **Future safeguards:** Before any future proposal can be approved, specify explicit informed consent and purpose; permitted file types and size limits; upload validation and malware controls; access controls; retention and verifiable deletion; confidence/low-confidence handling; human review of extracted fields; verification against authoritative official sources; and prompt-injection protections treating uploaded content as untrusted data. Do not expose documents or extracted personal data to unrelated services or logs. AI may support explanations/extraction only; deterministic, verified rules remain authoritative for admission and funding eligibility. Any future implementation requires separate scope, privacy/security, architecture, budget and acceptance approval.
- **Status:** Resolved as deferred; future AI/document processing remains out of scope until separate change control and safeguards are approved.

## Unverifiable or underspecified statements requiring measurable definitions
- “Relevant pathways”, “realistic”, “recently verified”, “low-data”, “responsive”, “fast”, “accessible” and “clear next step” need operational definitions before a test can objectively pass.
- “National architecture” is a future extensibility direction, not evidence that MVP catalogue coverage is national.
- “Every displayed requirement is traceable” needs a defined minimum source record schema and an audit/test procedure.
- “No profile telemetry” must define which hosting/network/security metadata may be collected and how inspection evidence is captured.
- “No false eligibility” requires an approved golden test set and explicit supported-rule boundary.

## Gate disposition

**PRD READY: BLOCKED.** OR-001–OR-015 and OR-017–OR-018 have owner-approved decisions. OR-016 lifecycle, data-minimisation and page-memory-only persistence rules are approved and aligned with the policy review. Tracker persistence is not a blocker because persistent storage is excluded from this MVP. The PRD still requires explicit owner approval; source-verified catalogue records, relationship curation, accessibility/performance tests, golden-set results, privacy review, traceability and release evidence remain outstanding. No implementation or test passage is claimed.

