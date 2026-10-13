# StudyPath SA — Product Requirements Document

**Status:** Draft for owner review; not approved  
**Phase:** 1 — Product requirements  
**Baseline date:** 2026-10-14  
**Product:** StudyPath SA  
**Primary source:** `SPEC-1-StudyPath-SA.txt` plus approved Phase 0 decisions recorded in `docs/project/ARTIFACT-INDEX.md` and `docs/project/PROJECT-STATUS.md`.

## 1. Purpose and source hierarchy

StudyPath SA helps South African Grade 11–12 learners and recent matric graduates understand plausible study pathways from their subjects, marks, interests and preferences, and identify an actionable next step using authoritative information.

This PRD distinguishes:
- **Confirmed (C):** stated in the supplied product specification or approved Phase 0 project state.
- **Assumption (A):** a provisional interpretation needed to make a requirement testable; requires owner confirmation.
- **Open (O):** an unresolved decision that must not be silently treated as approved.

Where the broader specification conflicts with the accepted Phase 0 MVP boundary, this PRD records the conflict rather than silently expanding scope. Phase 0 approved planning only. No implementation or deployment is implied.

## 2. Product goals and non-goals

### Goals
1. Let a learner explore without creating an account or providing identifying information. (C)
2. Accept academic subjects and marks, interests, province/location, study-mode preferences and funding need where those fields are in the approved MVP input contract. (C; exact minimum set O)
3. Show a small, curated set of South African study options and explain why each is or is not a plausible match. (C)
4. Show explicit eligibility states: `ELIGIBLE`, `NOT_ELIGIBLE`, `UNKNOWN`; missing/ambiguous catalogue rules must not be presented as certainty. (C)
5. Trace displayed requirements and next steps to source records, preferring official institution/government/provider information. (C)
6. Deliver a mobile-first, accessible, reliable interactive application suitable for a hackathon demo. (C)

### Non-goals for the initial MVP
- Creating an account, authentication, cross-session profile persistence or saved pathways; these remain excluded unless separately approved.
- Direct application submission or application-system integration.
- Cost planning, notifications, institution comparison, AI chat, document upload/extraction, skill-gap analysis or graduation tracking.
- Guaranteeing admission, funding, application outcomes or completeness of national coverage.
- Full national catalogue coverage or automated crawling.
- Using real learner personal data in development/demo flows. Synthetic-only boundary applies.

Funding matching (M4) and manual application tracking (M5) are included in the intended MVP at **P1 / medium priority**, behind the P0 core pathway-discovery journey. This is a scope decision only: funding data rules and tracker lifecycle/data handling remain unresolved, and no account, persistent storage, or financial-data collection approach is approved. See `OPEN-REQUIREMENTS.md`.

## 3. Actors and permissions

| Actor | Permissions | Restrictions |
|---|---|---|
| Anonymous learner (primary) | Enter temporary academic/preferences inputs; request recommendations; view pathway details, reasons, eligibility state and source links; explore supported funding matches and manually manage tracker entries under the approved tracker data boundary | No account or cross-session persistence is approved; funding and tracker inputs must not be collected or persisted until the data/privacy rules are approved |
| Recent matric graduate (secondary) | Same anonymous exploration capabilities | Same restrictions; qualification/cycle fit may remain UNKNOWN if data does not cover them |
| Catalogue curator (operational role; not a learner-facing MVP feature) | Review official sources and maintain the small curated catalogue outside the learner workflow | Publication workflow/tooling is not confirmed as MVP; only verified published data may drive claims |
| Product owner/reviewer | Approve requirements, data boundaries and release decisions | Does not acquire learner-data access beyond what is explicitly approved |

**Assumption A-ROLE-1:** The MVP has no authenticated administrative interface. Catalogue data is curated through a controlled process outside the learner product until a separate requirement is approved.

## 4. Core domain terms and rules

- **Pathway:** an institution-specific qualification/programme and its available verified admission information.
- **Eligibility state:** `ELIGIBLE`, `NOT_ELIGIBLE`, or `UNKNOWN`; not an admission decision.
- **Official source:** institution, government or funding-provider source authoritative for the relevant requirement.
- **Source record:** source name, URL, verification date and associated catalogue record/version where available.
- **Catalogue pilot:** a deliberately bounded catalogue. Phase 0 records two official University of Johannesburg programme pages checked; this is not evidence of broad national coverage.
- **Temporary inputs:** values used to generate results during the current anonymous exploration; no profile persistence is allowed in the MVP.

### Eligibility rules
1. Eligibility must be deterministic, explainable and testable from structured, source-backed rules.
2. A verified, applicable hard requirement that the learner does not meet yields `NOT_ELIGIBLE`.
3. `ELIGIBLE` is allowed only when every applicable hard requirement required for the supported screening is known and met.
4. Missing subject results, missing/ambiguous rules, uncertain programme/cycle applicability, unsupported calculation methods or stale/unverified requirements yield `UNKNOWN` where they prevent a reliable conclusion.
5. Preference ranking is distinct from eligibility and must never be presented as an admission probability or decision.
6. No AI-generated result may override structured authoritative requirements. AI is not required for the initial MVP.
7. Every displayed requirement and actionable deadline (if displayed) must be traceable to an active source record. No deadline should be shown unless verified for the relevant cycle.

## 5. MVP feature requirements

### REQ-EXP-001 — Anonymous pathway input

- **Priority:** P0
- **Status:** Confirmed intent; exact field contract partly open.
- **Problem / user story:** As a Grade 11–12 learner, I want to enter my marks and study interests without registering so that I can explore possible pathways with low friction.
- **Actors:** Anonymous learner; recent matric graduate.
- **Preconditions:** Interactive application is available; catalogue has at least one published record or the product can show an empty-data state.
- **Trigger:** Learner starts pathway exploration.
- **Inputs:** Grade/year; subject names and marks; career interests; province/location; preferred study modes; whether funding is needed, to the extent confirmed in the MVP input contract. Exact required/optional status is open.
- **Business rules:** No name, email, ID number, phone number or account is required. Validate marks against the approved scale and reject invalid values; the mark scale and allowed precision are open. Missing academic inputs must be preserved as missing rather than defaulted to zero. Inputs are temporary and must not be persisted or sent to analytics/logs.
- **Success state:** Valid inputs are accepted for the current exploration and can be used to request matching.
- **Failure states:** Invalid mark, missing required field, unsupported subject, malformed value or unavailable recommendation service produces an understandable, field-specific or recoverable error; inputs must not be silently changed.
- **Permissions:** Anonymous learner may submit only their current form data; no cross-user data access exists.
- **Edge cases:** No subjects entered; mark at minimum/maximum; decimal mark; duplicate subject; unknown subject alias; Grade 11 versus Grade 12; recent matric graduate; no interest selected; unsupported province/study mode.
- **Dependencies:** Approved input schema; subject vocabulary/normalisation; deterministic matching; privacy-safe frontend and telemetry configuration.
- **Acceptance criteria:** See AC-EXP-001 through AC-EXP-008 in `ACCEPTANCE-CRITERIA.md`.
- **Non-functional requirements:** Mobile-first responsive layout; labelled controls; keyboard operation; screen-reader accessible errors; no secrets in client; no PII collection; no persistence/telemetry of profile values; target performance threshold remains open.
- **Out of scope:** Account creation, profile storage, anonymous-to-account migration, document upload, importing marks from files.

### REQ-CAT-001 — Curated institution and qualification catalogue

- **Priority:** P0
- **Status:** Confirmed small curated catalogue; exact minimum record count and release freshness policy open.
- **Problem / user story:** As a learner, I want to explore real study options with credible requirements rather than generic or invented examples.
- **Actors:** Anonymous learner; catalogue curator.
- **Preconditions:** Catalogue contains approved published records.
- **Trigger:** Learner views recommendations or opens pathway details.
- **Inputs:** Curated institution, qualification/programme, institution type, province/location, study mode, qualification type, requirements, application information and source records where verified.
- **Business rules:** Catalogue records must be grounded in official sources; a record without a usable authoritative source cannot support a positive eligibility claim. The MVP is a bounded pilot, not national coverage. No fake/example institution may be represented as real. Every supported requirement must identify its source and verification date; cycle/version should be recorded where available.
- **Success state:** Learner sees only published catalogue records and can distinguish verified information from missing/unknown information.
- **Failure states:** No matching catalogue data yields a clear empty state; invalid/stale/unverifiable records are suppressed from definitive claims and cause UNKNOWN where material.
- **Permissions:** Learners read published data only. Catalogue editing/publishing is not exposed in the MVP unless separately approved.
- **Edge cases:** No records for selected province/mode; expired cycle; conflicting official pages; missing subject threshold; source unavailable; programme page moved; duplicate programme names; records from different admission years.
- **Dependencies:** Curator, official-source access, source metadata and review policy.
- **Acceptance criteria:** See AC-CAT-001 through AC-CAT-006.
- **Non-functional requirements:** Source links are usable on mobile and accessible; catalogue changes are reviewable; no unsupported claims of national completeness.
- **Out of scope:** Automated nationwide crawling, public institution self-service, full admin catalogue UI, unreviewed user-submitted requirements.

### REQ-MAT-001 — Deterministic eligibility screening and explainable matching

- **Priority:** P0
- **Status:** Confirmed.
- **Problem / user story:** As a learner, I want to understand which options appear to meet published minimum requirements and why, so I can choose a sensible next step.
- **Actors:** Anonymous learner.
- **Preconditions:** Valid input and applicable catalogue data are available.
- **Trigger:** Learner requests pathway recommendations.
- **Inputs:** Current exploration inputs; structured qualification requirements; applicable source/cycle metadata; approved preferences.
- **Business rules:** Return one of `ELIGIBLE`, `NOT_ELIGIBLE`, `UNKNOWN` per screened pathway. Apply hard requirements deterministically. Missing/ambiguous information cannot be treated as passing. Separate eligibility from preference ranking. Reasons must cite the actual rule/input relationship. Do not provide admission probabilities or guarantee outcomes.
- **Success state:** Results contain pathway identity, eligibility state, understandable reasons, relevant requirement information and source references.
- **Failure states:** Invalid inputs are rejected; incomplete data returns UNKNOWN; catalogue/recommendation failure is communicated without fabricated fallback results.
- **Permissions:** Available to anonymous learners; no account required.
- **Edge cases:** Missing required subject; one known failed threshold plus another missing rule; mark exactly equal to threshold; APS/points calculation unsupported; source conflict; requirement cycle mismatch; no results; multiple equal-ranked results.
- **Dependencies:** REQ-EXP-001, REQ-CAT-001, verified rules and an approved policy for unknown values and scoring.
- **Acceptance criteria:** See AC-MAT-001 through AC-MAT-010.
- **Non-functional requirements:** Same inputs and same catalogue version produce the same eligibility states; explanations must be consistent with the rules; no frontend-only authoritative eligibility logic; performance target open.
- **Out of scope:** Automated admissions decisions, admission probability prediction, AI as eligibility authority, unsupported APS/points inference.

### REQ-ALT-001 — Relevant alternatives and next steps

- **Priority:** P0
- **Status:** Confirmed as part of the core journey; relationship coverage and alternative-selection rules open.
- **Problem / user story:** As a learner whose preferred option is not supported by the current results, I want relevant alternatives or an honest explanation that none can be established.
- **Actors:** Anonymous learner.
- **Preconditions:** A preferred pathway or result set exists; curated relationship data may exist.
- **Trigger:** A preferred pathway is ineligible/unknown, or the learner asks to explore related options.
- **Inputs:** Preferred pathway, eligibility outcomes and curated alternative/progression relationships where available.
- **Business rules:** Alternatives must be related through reviewed catalogue relationships or a clearly stated matching basis. Do not imply that an alternative is guaranteed or that it leads to a specific qualification unless verified. Diploma, higher-certificate, TVET and progression routes appear only where supported by actual data.
- **Success state:** Learner sees relevant sourced alternatives and a practical next step, or a clear explanation that no verified alternative is available in the pilot.
- **Failure states:** Missing relationship data produces no invented alternative; source failure leaves the uncertainty visible.
- **Permissions:** Anonymous read-only exploration.
- **Edge cases:** No alternative records; alternative is also NOT_ELIGIBLE/UNKNOWN; relationship is stale; different province/mode; pathway is a progression rather than direct equivalent.
- **Dependencies:** REQ-CAT-001, REQ-MAT-001 and reviewed pathway relationships.
- **Acceptance criteria:** See AC-ALT-001 through AC-ALT-005.
- **Non-functional requirements:** Clearly distinguish alternatives, progression and related-field suggestions; explain why each is shown.
- **Out of scope:** Guaranteeing articulation/credit transfer, creating unsupported pathways, personalized human counselling.

### REQ-DET-001 — Pathway detail and official next steps

- **Priority:** P0
- **Status:** Confirmed.
- **Problem / user story:** As a learner, I want to inspect the requirements, location, study mode and official application information behind a recommendation before acting.
- **Actors:** Anonymous learner.
- **Preconditions:** A catalogue pathway is available.
- **Trigger:** Learner opens a recommendation.
- **Inputs:** Selected pathway identifier; published catalogue and source records.
- **Business rules:** Show only data present in the catalogue; visibly distinguish unknown/unavailable fields. External links must lead to the recorded official source. A recommendation is guidance, not admission confirmation. Do not fabricate deadlines, costs or requirements.
- **Success state:** Detail view displays qualification/institution identity, available location/study mode, applicable sourced requirements, eligibility reasons and official next-step link(s).
- **Failure states:** Unknown pathway identifier produces a not-found state; source URL unavailable or stale is disclosed and cannot support a definitive claim.
- **Permissions:** Anonymous read-only access.
- **Edge cases:** Incomplete detail record; duplicate names; official source redirects; source refers to a different admission cycle; mobile external-link handling.
- **Dependencies:** REQ-CAT-001, REQ-MAT-001 and source provenance.
- **Acceptance criteria:** See AC-DET-001 through AC-DET-006.
- **Non-functional requirements:** Mobile-readable; links have meaningful labels; external-source provenance is accessible; clear uncertainty and no guarantees.
- **Out of scope:** Application submission, scraping live source pages at request time, displaying unverified fees/deadlines.

### REQ-PRV-001 — Anonymous and privacy-minimising exploration

- **Priority:** P0
- **Status:** Confirmed Phase 0 boundary; exact hosting/provider metadata and notice wording are downstream release checks.
- **Problem / user story:** As a learner, I want to explore without creating an account or leaving a persistent academic profile.
- **Actors:** Anonymous learner; product owner/operator.
- **Preconditions:** Learner can load the application.
- **Trigger:** Learner uses any exploration workflow.
- **Inputs:** Academic marks, subjects, interests and preferences supplied in the current session.
- **Business rules:** Do not require identifying information. Do not persist profile values, place them in URL/query parameters, analytics events, client error reports or application logs. Do not use real learner data in development/demo testing. Clear temporary form/result state when the session is ended or reset according to the approved session policy (exact reset semantics open). Hosting/security telemetry may contain technical metadata; its exact fields, retention and privacy notice must be reviewed before public use.
- **Success state:** Learner can complete anonymous exploration while the product does not store a reusable profile.
- **Failure states:** If a component requires persistence or external transmission of profile values, the workflow must not proceed until approved; technical failure must not expose entered values.
- **Permissions:** No account or cross-user profile access. Operators must not receive learner marks through routine logs.
- **Edge cases:** Browser refresh/back, shared device, multiple tabs, browser crash, analytics SDK enabled by default, third-party error reporting, browser autofill.
- **Dependencies:** Frontend/session design, hosting configuration, telemetry configuration, privacy notice and review.
- **Acceptance criteria:** See AC-PRV-001 through AC-PRV-007.
- **Non-functional requirements:** Minimise data, secure transport, safe errors, no secrets/client-side credentials, accessible privacy notice before public demo.
- **Out of scope:** Authentication, cross-session saved profile, consent-based data storage, learner account export/deletion workflows until accounts exist.

### REQ-UX-001 — Accessible, mobile-first interactive experience

- **Priority:** P0
- **Status:** Confirmed product quality intent; formal supported-browser/device matrix and quantitative accessibility/performance thresholds open.
- **Problem / user story:** As a learner using a phone, keyboard or assistive technology, I want to complete the pathway journey and understand the next action.
- **Actors:** Anonymous learner, including users of assistive technology and users with limited connectivity.
- **Preconditions:** Application is loaded in a supported browser.
- **Trigger:** Learner navigates, submits inputs, reviews results or encounters an error.
- **Inputs:** User interaction and current exploration data.
- **Business rules:** Provide labelled inputs, visible focus, keyboard access, understandable instructions, validation, loading, empty and error states; never use colour alone to communicate eligibility. Use plain language and responsive layouts.
- **Success state:** Learner can navigate the core flow and distinguish eligibility states, reasons, sources and next steps.
- **Failure states:** Slow/unavailable recommendation service displays a recoverable message and retry/return path; empty catalogue is explained; validation errors identify the affected field.
- **Permissions:** Same anonymous permissions as REQ-EXP-001.
- **Edge cases:** Narrow screen; zoom; long institution/programme names; no results; delayed response; keyboard-only use; reduced motion; external link opens/fails.
- **Dependencies:** All MVP journey features and chosen UI design.
- **Acceptance criteria:** See AC-UX-001 through AC-UX-008.
- **Non-functional requirements:** WCAG 2.2 AA is proposed as a target, not yet approved; supported browsers, load-time and low-bandwidth thresholds require owner confirmation.
- **Out of scope:** Native mobile apps, full offline operation, multilingual content unless separately prioritised.

### REQ-FUND-001 — Curated funding opportunities and deterministic matching

- **Priority:** P1 (medium; intended MVP scope after the P0 core journey).
- **Status:** Scope approved; funding criteria, data coverage and freshness rules remain open (OR-015).
- **Problem / user story:** As a learner, I want to discover funding opportunities that may fit my circumstances so that I can verify them with the provider.
- **Actors:** Learner; catalogue curator.
- **Preconditions:** At least one funding record has been reviewed and published with an authoritative source and verification metadata.
- **Trigger:** Learner opens funding options or requests funding matches.
- **Inputs:** Only funding-related learner inputs explicitly approved in the input/privacy contract; do not assume household income, identity or other sensitive financial data may be collected.
- **Business rules:** Match only against structured, source-backed criteria; evaluate funding eligibility separately from admission eligibility; use `ELIGIBLE`, `NOT_ELIGIBLE` or `UNKNOWN` only where the approved rules support that conclusion. Missing criteria, incomplete inputs, expired deadlines or uncertain applicability must not produce a positive certainty claim. Link to the official provider source. Never guarantee an award.
- **Success state:** The learner sees a bounded set of source-backed opportunities, matching reasons, missing information and official next steps.
- **Failure states:** No supported matches, incomplete funding criteria, stale/expired record or unavailable catalogue produces an honest empty/uncertain/error state; no opportunity or deadline is invented.
- **Permissions:** Learners can view published opportunities and submit only the approved inputs; catalogue publication is a controlled curator responsibility.
- **Dependencies:** OR-002 input contract; OR-006 privacy/telemetry boundary; OR-015 funding criteria, provenance, deadline and expiry rules; curated funding records.
- **Acceptance criteria:** See AC-FUND-001 through AC-FUND-005 in `ACCEPTANCE-CRITERIA.md`.
- **Non-functional requirements:** Deterministic, explainable, accessible and testable; no funding-profile telemetry; catalogue freshness and official-source links are visible.
- **Out of scope:** Guaranteeing funding, automatic applications, unverified national coverage or AI making eligibility decisions.

### REQ-APP-001 — Manual application tracker

- **Priority:** P1 (medium; intended MVP scope after the P0 core journey).
- **Status:** Scope approved; lifecycle, status transitions, and data/persistence boundary remain open (OR-006, OR-016).
- **Problem / user story:** As a learner, I want to record and review my own university or funding application progress so that I can organise my next steps.
- **Actors:** Learner.
- **Preconditions:** The tracker data-handling model and allowed lifecycle have been approved; no tracker implementation may bypass this gate.
- **Trigger:** Learner adds an application to the tracker or updates a tracked application.
- **Inputs:** A selected pathway/funding opportunity, an approved status, relevant dates and document checklist fields only where those fields have been approved.
- **Business rules:** Tracking is manual and learner-reported; never claim that StudyPath submitted, verified or received an application. Use only approved statuses and transitions. No account, cross-session persistence, sensitive notes or personal document storage is implied by this requirement; OR-006/OR-016 must define what data is permitted and for how long before implementation.
- **Success state:** The learner can review the status and next steps of a manually tracked application within the approved data-handling boundary.
- **Failure states:** Invalid status transition, missing required field, unavailable storage or unsupported persistence produces a clear error without falsely reporting a successful save.
- **Permissions:** A learner may access only tracker entries permitted by the approved session/ownership model; if persistence is later approved, ownership and cross-user isolation must be tested.
- **Dependencies:** OR-006 privacy/telemetry boundary; OR-016 lifecycle, transition rules, dates, status authority and persistence decision; funding catalogue for funding-related entries.
- **Acceptance criteria:** See AC-APP-001 through AC-APP-006 in `ACCEPTANCE-CRITERIA.md`.
- **Non-functional requirements:** Accessible status controls, clear learner-reported labeling, safe reset/deletion behavior and no sensitive tracker data in telemetry.
- **Out of scope:** Direct submission, external application-system integration, institution-verified status unless an integration is separately approved, notifications and document uploads.

## 6. Cross-cutting non-functional requirements

| ID | Requirement | Status / verification intent |
|---|---|---|
| NFR-SEC-001 | No secrets in client code; use HTTPS for network requests; validate inputs at the trusted boundary | Confirmed direction; verify through static review and network/security tests |
| NFR-PRV-001 | No learner profile persistence, analytics capture or application-log capture in MVP | Confirmed; verify using network inspection, storage inspection and synthetic test runs |
| NFR-DATA-001 | Eligibility claims and displayed requirements trace to official source records and verification metadata | Confirmed; catalogue audit and automated completeness checks |
| NFR-REL-001 | Dependency failures, no-results and stale/missing data produce honest recoverable/uncertain states | Confirmed intent; exact retry/timeout thresholds open |
| NFR-ACC-001 | Accessible forms, keyboard support, focus states, non-colour-only status and clear errors | Confirmed intent; WCAG target level requires approval |
| NFR-PERF-001 | Core flow should feel responsive on typical mobile connections | Confirmed intent; measurable p95/load-time and test environment thresholds are open |
| NFR-COMP-001 | Do not represent results as official admission/funding decisions or guarantee outcomes | Confirmed |
| NFR-SCOPE-001 | Initial catalogue is bounded; do not claim nationwide coverage | Confirmed Phase 0 direction |

## 7. Dependencies and hidden assumptions

1. The owner must approve the exact MVP input fields and validation ranges.
2. A curator must maintain and verify source-backed catalogue records; no backup curator is currently confirmed.
3. Official programme requirements can be incomplete, cycle-specific or internally inconsistent; UNKNOWN handling is essential.
4. The matching engine needs explicit rules for multiple missing/failed requirements, APS/points and subject aliases before it can be fully testable.
5. A client-only/static deployment is the current cost-constrained proposal; confirm in architecture phase. This PRD does not mandate implementation architecture.
6. Browser storage, analytics, error reporting and hosting telemetry must be inspected to substantiate the privacy boundary.
7. The source specification describes funding matching and application tracking as Must Have, while approved Phase 0 decisions defer them. Product owner must confirm this prioritisation conflict before PRD READY.
8. The FNB hackathon requires an interactive application and submission deliverables (deck max 10 slides, demo video max 90 seconds, SSDLC and Lean Business Canvas); the PRD does not itself satisfy these submission deliverables.

## 8. Success measures

For the MVP demo, measure with synthetic test journeys only:
- Percentage of representative test profiles that receive a valid, schema-conforming result or an honest no-results/UNKNOWN state.
- Zero false-positive ELIGIBLE results in the manually reviewed golden test set (target; test set must be approved).
- Percentage of displayed requirements with official source and verification metadata.
- Successful completion rate for the anonymous marks-to-pathway-details journey in moderated usability tests.
- Number of privacy boundary violations observed in network/storage/log inspection: target zero.

Exact thresholds, test set size, and measurement ownership are open; do not report success metrics until measured.

## 9. Explicitly unresolved / not approved

See `docs/product/OPEN-REQUIREMENTS.md`. The owner resolved the M4/M5 scope conflict by including funding matching and manual application tracking at P1 / medium priority; their detailed data rules and tracker persistence/lifecycle remain open. Other open items include the input contract, eligibility semantics for composite requirements, source freshness, supported admission cycles, privacy/telemetry details, measurable accessibility/performance targets and MVP success thresholds.

## 10. PRD gate assessment

**Gate status: BLOCKED — draft is comprehensive enough for review, but PRD READY is not claimed.** OR-001 scope has been resolved by owner decision: M4 funding matching and M5 manual application tracking are P1 / medium-priority intended MVP features. Their detailed data, lifecycle, and privacy constraints remain open alongside other high-impact requirements. Candidate acceptance criteria are recorded in `ACCEPTANCE-CRITERIA.md`. No implementation tasks are created by this document.
