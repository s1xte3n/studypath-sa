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
2. Accept the owner-approved anonymous first-form fields (study stage, at least one subject and mark per entered subject; optional interests, intended location and study mode). Funding need is excluded from the first form and requires a separate approved P1 flow. (C; OR-002/003)
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
- **Source record:** For each requirement used in eligibility screening, record the institution, qualification/programme and requirement ID; official publisher; source page/document title and URL; last verification date; applicable admission cycle; extracted requirement including conditions and exceptions; catalogue version; and curator sign-off status.
- **Supported admission cycle:** Only a cycle explicitly identified for the programme requirement is supported. Do not silently carry requirements forward from a prior cycle.
- **Source freshness:** Re-verify admission sources at least every 30 days, and sooner when a source announces a change, a relevant deadline passes, or the applicable cycle changes. Stale, inaccessible or otherwise unverifiable requirements cannot support confident eligibility.
- **Source conflicts and sign-off:** Prefer official sources explicitly applicable to the programme and cycle. A programme-specific source takes precedence over a general institutional page only when applicability is clear. Unresolved authoritative conflicts block confident screening and yield `UNKNOWN` where material. A curator verifies each extracted requirement against its source before publication; a release/public-demo check reviews cycle, catalogue version, verification dates and unresolved conflicts. These are requirements, not claims of implemented controls.
- **Catalogue pilot:** target 6–8 curated programme records, prioritising Gauteng and official sources that can be verified and maintained. Include degree, diploma, higher-certificate or TVET records only where supported by official evidence. The two UJ pages checked in Phase 0 do not establish that the full target is already met; this is a bounded pilot, not national coverage.
- **Temporary inputs:** values used to generate results during the current anonymous exploration; no profile persistence is allowed in the MVP.

### Eligibility rules
1. Eligibility must be deterministic, explainable and testable from structured, source-backed rules. Evaluate eligibility separately from preference ranking.
2. **Precedence:** A verified, applicable mandatory requirement confirmed to fail yields `NOT_ELIGIBLE`, even when another requirement is unknown, only if the failed rule is genuinely mandatory and no applicable alternative satisfies it. If there is no confirmed mandatory failure but a material required fact or rule is unknown, return `UNKNOWN`. Return `ELIGIBLE` only when every applicable mandatory requirement required for supported screening is verified and met.
3. **AND / all required:** Any confirmed mandatory failure makes the combination fail; otherwise an unknown component makes it unknown; all components must pass for the combination to pass.
4. **OR / accepted alternatives:** Any verified passing alternative satisfies the combination. The combination fails only when every alternative is known to fail. If no alternative passes and at least one is unknown, the combination is unknown.
5. **Conditional requirements:** A verified-false condition means its dependent requirement is not applicable and is skipped. A verified-true condition requires evaluation of the dependent requirement. If the condition is unknown and could change the outcome, return `UNKNOWN`.
6. **APS/points and Life Orientation:** Calculate points only when an authoritative source applicable to the specific programme and admission cycle defines the method, included/excluded subjects, mark-to-points conversion and thresholds. Do not assume a universal APS formula or include/exclude Life Orientation by default. If required details are unsupported or unverified and could change the outcome, return `UNKNOWN`.
7. **Subject substitutions/equivalence:** Accept a substitution only when explicitly supported by a verified, applicable official requirement or an approved catalogue rule with provenance. Do not infer equivalence from similar names. An unsupported or uncertain substitution that could change the outcome is not counted as satisfied and yields `UNKNOWN` where it affects the result.
8. Missing subject results, missing/ambiguous rules, uncertain programme/cycle applicability, unsupported calculation methods or stale/unverified requirements yield `UNKNOWN` where they prevent a reliable conclusion and no confirmed mandatory failure already determines `NOT_ELIGIBLE`.
9. `ELIGIBLE` means only that all represented, supported and verified minimum requirements in the pilot screening are met. It is not an admission decision, prediction or guarantee; final decisions remain with the institution. No AI-generated result may override structured authoritative requirements. AI is not required for the initial MVP.
10. Every displayed requirement and actionable deadline (if displayed) must be traceable to an active source record. No deadline should be shown unless verified for the relevant cycle.
11. A requirement may be used for confident screening only when its explicitly supported admission cycle and source freshness are verified. Re-verify at least every 30 days and sooner after a source-announced change, a relevant deadline passing, or a cycle change.
12. Resolve source conflicts only when official-source applicability makes the governing requirement clear. If authoritative sources remain in conflict, do not select a favorable threshold; the affected requirement remains unresolved and yields `UNKNOWN` when it could change the result, subject to OR-004 precedence.
13. A curator verifies extracted requirements against the source before publication. Before release/public demo, check the catalogue version, cycle applicability, verification dates and unresolved conflicts. This is a required control; it is not evidence that implementation or operational verification has occurred.
14. `ELIGIBLE` is permitted only when the full set of applicable mandatory minimum requirements needed for the supported screening is complete, verified for the explicit admission cycle, current under the source-freshness policy, and curator-signed-off, and every applicable requirement is met under OR-004. A partial rule set must never produce `ELIGIBLE`.
15. A programme with incomplete, unsupported or unresolved minimum criteria may remain visible for discovery, but must show `UNKNOWN` eligibility and explain the material limitation. Discovery, preference fit and ranking must never upgrade eligibility or imply that requirements are met.
16. Use this learner-facing `ELIGIBLE` explanation: “You meet the verified minimum requirements we assessed. Based on the official requirements verified for this programme and admission cycle, you meet all applicable minimum requirements covered by our supported screening. This is not an admission decision or a guarantee of acceptance. The institution makes the final admission decision.” Keep the explanation tied to the requirements actually assessed; do not imply a complete institutional admission assessment.
17. Do not calculate or display a weighted numeric preference score. Group results deterministically by eligibility state, then use stable catalogue order within each group. Show separate plain-language preference-fit labels only for supported interests, location and study mode. Missing/unsupported preferences are “not assessed” or “not available”. Preference fit never upgrades eligibility and does not imply admission probability.

## 5. MVP feature requirements

### REQ-EXP-001 — Anonymous pathway input

- **Priority:** P0
- **Status:** Field contract and mark/subject validation rules approved by owner on 2026-10-14 (OR-002 and OR-003); supported subjects and aliases must be explicitly listed in the maintained catalogue.
- **Problem / user story:** As a Grade 11–12 learner, I want to enter my marks and study interests without registering so that I can explore possible pathways with low friction.
- **Actors:** Anonymous learner; recent matric graduate.
- **Preconditions:** Interactive application is available; catalogue has at least one published record or the product can show an empty-data state.
- **Trigger:** Learner starts pathway exploration.
- **Inputs:** Required study stage (Grade 11, Grade 12, or recent matric graduate); at least one subject and a mark for every entered subject. Optional career/study interests, province/intended location, and preferred study mode. Funding need is excluded from this first form; any later funding flow is governed by the separate P1 funding requirements.
- **Business rules:** No name, email, national ID, phone number or account is required. Every entered subject requires a whole-number percentage mark from 0 through 100 inclusive. Reject decimals without rounding, negative values, values above 100, malformed text and missing marks with field-specific validation. Never replace a missing result with zero. Accept only explicitly approved subject identifiers or aliases from the supported subject catalogue. Normalize case and surrounding/repeated whitespace before alias lookup; do not use fuzzy matching or silent guesses. Reject duplicate canonical subjects, including duplicates introduced by aliases. An unsupported subject must be identified to the learner and must not be silently renamed or treated as equivalent to another subject. Matching may proceed with other valid supported subjects; return UNKNOWN for a pathway when the unsupported subject prevents a reliable eligibility conclusion. Subject equivalence/substitution is governed by OR-004. Grade 11 and Grade 12 marks are current results, not presumed final matric results. Recent matric graduates should use final matric results where available. Incomplete/unavailable results remain missing and are not defaulted to zero; affected screening returns UNKNOWN where missing data prevents a reliable conclusion. Optional fields may be blank without blocking discovery. Inputs are temporary and must not be persisted or sent to analytics, application logs or error telemetry; this is a requirement to verify, not a claim that implementation controls exist.
- **Success state:** Valid inputs are accepted for the current exploration and can be used to request matching.
- **Failure states:** Invalid mark, missing required field, unsupported subject, malformed value or unavailable recommendation service produces an understandable, field-specific or recoverable error; inputs must not be silently changed.
- **Permissions:** Anonymous learner may submit only their current form data; no cross-user data access exists.
- **Edge cases:** No subjects entered; missing mark for an entered subject; mark at minimum/maximum; decimal mark; duplicate subject; unknown subject alias; Grade 11 versus Grade 12; recent matric graduate with incomplete/unavailable final results; no interest selected; optional province/study mode omitted or unsupported.
- **Dependencies:** Approved input schema; subject vocabulary/normalisation; deterministic matching; privacy-safe frontend and telemetry configuration.
- **Acceptance criteria:** See AC-EXP-001 through AC-EXP-008 in `ACCEPTANCE-CRITERIA.md`.
- **Non-functional requirements:** Mobile-first responsive layout; WCAG 2.2 AA target at viewports down to 320 CSS pixels; keyboard operation, visible focus, labelled controls and screen-reader-accessible errors; no secrets in client; no PII collection; no persistence/telemetry of profile values; in-browser matching p95 target ≤1 second for up to 100 catalogue records on an agreed test device/browser.
- **Out of scope:** Account creation, profile storage, anonymous-to-account migration, document upload, importing marks from files.

### REQ-CAT-001 — Curated institution and qualification catalogue

- **Priority:** P0
- **Status:** Owner-approved bounded pilot target of 6–8 curated programme records, prioritising Gauteng and verifiable official sources (OR-008). Actual record selection, source verification and release evidence remain outstanding.
- **Problem / user story:** As a learner, I want to explore real study options with credible requirements rather than generic or invented examples.
- **Actors:** Anonymous learner; catalogue curator.
- **Preconditions:** Catalogue contains approved published records.
- **Trigger:** Learner views recommendations or opens pathway details.
- **Inputs:** Curated institution, qualification/programme, institution type, province/location, study mode, qualification type, requirements, application information and source records where verified.
- **Business rules:** The pilot targets 6–8 curated programme records, prioritising Gauteng and verifiable official sources. Include qualification types only when supported by actual official evidence; do not force coverage across provinces/types or imply national completeness. No fake/example institution may be represented as real. Every eligibility requirement must meet the complete OR-005 source/cycle/freshness/sign-off contract; each record must pass curator review before publication. The two UJ pages checked during Phase 0 do not prove the pilot target has been met.
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
- **Non-functional requirements:** Same inputs and catalogue version produce the same eligibility states and reasons; no frontend-only authoritative eligibility logic; deterministic eligibility grouping and stable within-group order; no weighted numeric preference score; in-browser matching p95 ≤1 second for up to 100 records on the agreed test device/browser.
- **Out of scope:** Automated admissions decisions, admission probability prediction, AI as eligibility authority, unsupported APS/points inference.

### REQ-ALT-001 — Relevant alternatives and next steps

- **Priority:** P0
- **Status:** Core journey confirmed; OR-009 relationship types and evidence policy are owner-approved. Curated relationships and their evidence still require verification.
- **Problem / user story:** As a learner whose preferred option is not supported by the current results, I want relevant alternatives or an honest explanation that none can be established.
- **Actors:** Anonymous learner.
- **Preconditions:** A preferred pathway or result set exists; curated relationship data may exist.
- **Trigger:** A preferred pathway is ineligible/unknown, or the learner asks to explore related options.
- **Inputs:** Preferred pathway, eligibility outcomes and curated alternative/progression relationships where available.
- **Business rules:** Supported relationship types are `ALTERNATIVE`, `RELATED_FIELD`, `PROGRESSION` and `ARTICULATION`. Each published relationship must include its type, explanation/rationale, documented provenance, verification date and curator approval, with official evidence/URL where applicable. `ARTICULATION` requires explicit official evidence; never infer it from similarity. If evidence is missing or insufficient, do not publish the relationship as verified. Do not imply guaranteed admission, credit transfer or progression. Diploma, higher-certificate and TVET routes appear only where actual official evidence supports them.
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
- **Status:** Privacy/data-boundary decision approved by owner on 2026-10-14 (OR-006); implementation and release verification outstanding.
- **Problem / user story:** As a learner, I want to explore study pathways without identifying myself or having my academic profile retained or used for unrelated tracking.
- **Actors:** Anonymous learner.
- **Preconditions:** The privacy notice is visible before learner input; only synthetic data is used in development/demo.
- **Trigger:** Learner begins or resets pathway exploration.
- **Inputs:** Current exploration inputs and results held in memory only.
- **Business rules:** Do not require identifying information. Do not persist profile values in localStorage, sessionStorage, IndexedDB, profile cookies or URLs/query parameters. Do not send profile values to analytics, advertising, unrelated third-party endpoints, application logs, client error reports or telemetry. Do not add analytics SDKs, advertising trackers or third-party error reporters to the MVP. Reset clears inputs, results and temporary profile state. Leaving/reloading ends the exploration and prior values must not be restored by application-controlled navigation behavior. Hosting/access/security providers may collect technical metadata; inspect the actual configuration and provider retention policy and describe verified practices in the privacy notice. The application retains no profile after exploration ends. Use synthetic data only; real learner data is prohibited until applicable privacy/legal review is complete.
- **Success state:** The anonymous flow functions without identifying details, profile values remain in memory for the active exploration, reset clears them, and the privacy notice matches verified behavior.
- **Failure states:** If privacy notice or hosting metadata review is incomplete, the public-demo gate remains blocked. Any profile value found in persistent storage, URLs, application logs, client error reports or prohibited network destinations fails the relevant acceptance criteria.
- **Permissions:** Anonymous learner uses only the current in-memory exploration; no account or cross-session profile access is available.
- **Edge cases:** Browser refresh/back, shared device, multiple tabs, browser crash, browser autofill, browser history, accidental telemetry SDK inclusion, provider-generated access/security metadata and unknown provider retention.
- **Dependencies:** Frontend/session design, hosting configuration, telemetry dependency review, privacy notice, browser storage/network inspection and owner release review.
- **Acceptance criteria:** See AC-PRV-001 through AC-PRV-013 in ACCEPTANCE-CRITERIA.md.
- **Non-functional requirements:** Minimise data, secure transport, safe errors, no client-side secrets, no profile persistence/telemetry, and an accessible privacy notice before learner input.

### REQ-UX-001 — Accessible, mobile-first interactive experience

- **Priority:** P0
- **Status:** Owner-approved target: WCAG 2.2 AA, minimum 320 CSS-pixel viewport, current stable Chrome/Edge/Firefox/Safari where available, and in-browser matching p95 ≤1 second for up to 100 records on an agreed test device/browser (OR-011/012). Test evidence remains outstanding.
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
- **Non-functional requirements:** Target WCAG 2.2 AA at 320 CSS pixels minimum; test current stable Chrome, Edge, Firefox and Safari where available and record versions/untested browsers. Include keyboard, visible focus, programmatic labels, associated errors, contrast, non-colour-only states and responsive/loading/empty/error states. In-browser matching target is p95 ≤1 second for up to 100 records on an agreed test device/browser. Network-dependent timeout/retry/availability/low-bandwidth targets must be approved before any network-dependent service is introduced.
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
| NFR-REL-001 | Dependency failures, no-results and stale/missing data produce honest recoverable/uncertain states; no indefinite loading | Confirmed; any network-dependent timeout/retry/availability/low-bandwidth thresholds must be approved before those services are introduced |
| NFR-ACC-001 | WCAG 2.2 AA target; 320 CSS-pixel minimum viewport; current stable Chrome, Edge, Firefox and Safari where available; keyboard, focus, labels, associated errors, contrast and non-colour-only states | Owner-approved target (OR-011); browser/conformance evidence outstanding |
| NFR-PERF-001 | In-browser matching p95 ≤1 second for up to 100 catalogue records on an agreed test device/browser; no indefinite loading and recoverable errors | Owner-approved target (OR-012); measurement environment/results outstanding; network targets are separate if network services are introduced |
| NFR-COMP-001 | Do not represent results as official admission/funding decisions or guarantee outcomes | Confirmed |
| NFR-SCOPE-001 | Initial catalogue is bounded; do not claim nationwide coverage | Confirmed Phase 0 direction |

## 7. Dependencies and hidden assumptions

1. The owner-approved first-form contract and whole-number percentage/subject-normalisation rules are recorded under OR-002/003; the concrete supported subject vocabulary and aliases still need to be explicitly maintained in the catalogue.
2. The owner temporarily holds all curator/reviewer roles under OR-014. No independent reviewer or backup is confirmed; seek independent review before public learner use and document the limitation if unavailable.
3. Official programme requirements can be incomplete, cycle-specific or internally inconsistent; UNKNOWN handling is essential.
4. The matching engine needs explicit rules for multiple missing/failed requirements, APS/points and subject equivalence/substitution before it can be fully testable; OR-003 defines mark validation and the alias lookup policy.
5. A client-only/static deployment is the current cost-constrained proposal; confirm in architecture phase. This PRD does not mandate implementation architecture.
6. Browser storage, network traffic, application/error telemetry dependencies and hosting/provider metadata and retention must be inspected to substantiate the approved OR-006 privacy boundary.
7. The scope conflict is resolved: funding matching and manual application tracking are intended MVP P1 capabilities behind the P0 core journey. Their funding data contract (OR-015) and tracker lifecycle/data boundary (OR-016) remain open and must be resolved before those features are implemented.
8. The FNB hackathon requires an interactive application and submission deliverables (deck max 10 slides, demo video max 90 seconds, SSDLC and Lean Business Canvas); the PRD does not itself satisfy these submission deliverables.

## 8. Success measures

For the MVP demo, measure with synthetic test journeys only:
- A versioned golden set of at least 20 cases covering positive eligibility, mandatory failure, UNKNOWN/missing data, composite AND/OR/conditional rules, stale/conflicting sources and unsupported calculations.
- 100% agreement with expected classifications across that golden set and zero false-positive `ELIGIBLE` results; any mismatch blocks acceptance of the matching rules until investigated and corrected.
- 100% of eligibility requirements displayed with the required official-source, cycle, verification, catalogue-version and curator-sign-off metadata; missing/incomplete rules must not produce `ELIGIBLE`.
- In-browser matching p95 ≤1 second for up to 100 catalogue records on the agreed test device/browser, measured and recorded rather than assumed.
- Zero privacy-boundary violations in storage/network/log inspection.
- If five representative users are available, a moderated usability check records task completion and observed issues. If fewer are available, record the limitation and actual evidence; do not claim statistical validation from a small convenience sample.

These are approved targets, not measured results. Do not report success until the test set, device/browser details, run results and any usability evidence are recorded.

## 9. Explicitly unresolved / not approved

See `docs/product/OPEN-REQUIREMENTS.md`. OR-001 through OR-014 have owner-approved policy decisions, including the 6–8 record pilot target, relationship evidence, deterministic eligibility grouping, WCAG/browser targets, matching performance and success measures. These are requirements, not proof of implementation or passing tests. OR-006 privacy implementation/hosting review remain release gates. OR-015 funding criteria/data and OR-016 tracker lifecycle/data handling remain open for the intended P1 features; OR-017/018 remain later-scope decisions.

## 10. PRD gate assessment

**Gate status: BLOCKED — PRD READY is not claimed.** OR-001 through OR-014 are owner-approved, but the PRD still needs explicit owner approval and OR-015/016 remain open before the P1 funding/tracker features can be implemented or the requirements baseline treated as complete. The initial catalogue's actual 6–8 verified records, relationship records, accessibility/performance conformance, golden-set results, privacy review and release evidence remain outstanding. Candidate acceptance criteria are recorded in `ACCEPTANCE-CRITERIA.md`. No implementation, test passage, privacy clearance or release readiness is claimed.
