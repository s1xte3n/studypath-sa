# StudyPath SA — User Stories and Use Cases

**Status:** Draft; mapped to `docs/product/PRD.md`.  
**Rule:** Stories describe product behavior, not implementation tasks.

## Primary persona
**Grade 11–12 learner:** needs realistic, understandable South African study options from current subjects/marks, interests and preferences, without being forced to register first.

## Secondary persona
**Recent matric graduate:** needs to explore options, but programme/admission-cycle coverage may be incomplete and must be shown as unknown where unsupported.

## Scope note — approved future authenticated extension

The stories and use cases below describe the current anonymous-first journey and intended P1 funding/tracker behavior. The D-046 authenticated extension is separately recorded as `REQ-AUTH-001` in `PRD.md` and `REQUIREMENTS.md`, with future-scope criteria `AC-AUTH-001–016`. It is deliberately not represented as a current D-047/G-SYN-001 demo journey; Q-018/Q-020 and the applicable privacy, security, contract, test and cost gates remain prerequisites.

## Stories and use cases

| Story ID | Requirement ID | User story / use case | Outcome |
|---|---|---|---|
| US-EXP-001 | REQ-EXP-001 | As a learner, I want to enter my grade/year, subjects and marks so that matching uses my actual results. | Validated temporary inputs; no silent defaulting |
| US-EXP-002 | REQ-EXP-001 | As a learner, I want to state career interests and study preferences so that relevant options can be prioritised. | Preferences influence recommendation ordering only under approved rules |
| US-EXP-003 | REQ-EXP-001 | As a learner, I want useful errors for invalid or missing input so I can correct it. | Field-specific errors and preserved valid values |
| US-CAT-001 | REQ-CAT-001 | As a learner, I want to see real institutions and qualifications with official sources. | Published, curated records only |
| US-CAT-002 | REQ-CAT-001 | As a learner, I want to know when programme data is incomplete or stale. | Missing/stale facts are visible and cannot support certainty |
| US-MAT-001 | REQ-MAT-001 | As a learner, I want an eligibility state for each screened pathway. | ELIGIBLE, NOT_ELIGIBLE or UNKNOWN with grounded reasons |
| US-MAT-002 | REQ-MAT-001 | As a learner, I want to understand which requirement my marks meet or do not meet. | Reasons correspond to structured rules and my inputs |
| US-MAT-003 | REQ-MAT-001 | As a learner, I want unknown requirements to remain unknown rather than be guessed. | Incomplete rules or inputs cannot produce false certainty |
| US-ALT-001 | REQ-ALT-001 | As a learner, I want related alternatives if my preferred option is not suitable. | Verified alternatives or honest no-alternative state |
| US-ALT-002 | REQ-ALT-001 | As a learner, I want to understand whether an option is an alternative, related field or progression route. | Relationship type and basis are disclosed |
| US-DET-001 | REQ-DET-001 | As a learner, I want programme details, location and study mode so I can decide what to investigate. | Available sourced details with missing fields identified |
| US-DET-002 | REQ-DET-001 | As a learner, I want an official next-step link so I can verify requirements directly. | Link points to recorded official source |
| US-PRV-001 | REQ-PRV-001 | As a learner, I want to explore without an account or personal identifiers. | Anonymous journey is usable |
| US-PRV-002 | REQ-PRV-001 | As a learner, I want my marks not to be stored or placed in telemetry. | Profile inputs remain temporary and are not captured by logs/analytics |
| US-UX-001 | REQ-UX-001 | As a mobile user, I want to complete the journey on a small screen. | Responsive content and controls |
| US-UX-002 | REQ-UX-001 | As a keyboard or assistive-technology user, I want controls, errors and statuses to be understandable. | Keyboard-operable and semantically labelled flow |
| US-UX-003 | REQ-UX-001 | As a learner, I want understandable loading, empty and failure states. | No silent failures or fabricated results |
| US-FUND-001 | REQ-FUND-001 | As a learner, I want to discover funding opportunities that may fit my circumstances. | Source-backed matches, reasons, unknowns and official next steps; no award guarantee |
| US-FUND-002 | REQ-FUND-001 | As a learner, I want to understand why a funding opportunity may or may not fit. | Funding criteria are evaluated separately from admission eligibility |
| US-APP-001 | REQ-APP-001 | As a learner, I want to manually record and review an application status. | Learner-reported status and next steps within the approved data-handling model |
| US-APP-002 | REQ-APP-001 | As a learner, I want to know when a status or save action fails. | Clear validation/failure state; no false success claim |

## Use cases

### UC-01 — Explore pathways anonymously
- **Requirements:** REQ-EXP-001, REQ-MAT-001, REQ-CAT-001, REQ-UX-001, REQ-PRV-001
- **Actor:** Anonymous learner
- **Precondition:** Application loads.
- **Main flow:** Open explorer → enter validated academic inputs and preferences → request recommendations → review eligibility states/reasons → open pathway details and official source.
- **Alternates:** Invalid input → show field errors; no applicable records → explain no results; incomplete catalogue rules → UNKNOWN; service failure → recoverable error.
- **Postcondition:** Learner has viewed results; no reusable profile is persisted.
- **Not covered:** Save pathway, account creation, application tracking.

### UC-02 — Understand an eligibility result
- **Requirements:** REQ-MAT-001, REQ-DET-001
- **Actor:** Anonymous learner
- **Precondition:** Recommendation exists.
- **Main flow:** Select pathway → review status and reasons → inspect source-backed requirements → follow official next-step link.
- **Alternates:** Missing rule/source → display uncertainty; source unavailable → disclose that verification is needed.
- **Postcondition:** Learner can explain the displayed result without mistaking it for an admission decision.

### UC-03 — Find an alternative
- **Requirements:** REQ-ALT-001, REQ-CAT-001, REQ-MAT-001
- **Actor:** Anonymous learner
- **Precondition:** A preferred pathway or result is available.
- **Main flow:** Open alternatives → review related records and relationship labels → compare their known eligibility and sources.
- **Alternates:** No reviewed relationship/data → explain no verified alternative is available in the pilot.
- **Postcondition:** Learner sees only supported alternatives and understands uncertainty.

### UC-04 — Recover from invalid input or service failure
- **Requirements:** REQ-EXP-001, REQ-UX-001, REQ-PRV-001
- **Actor:** Anonymous learner
- **Precondition:** Learner is in the explorer.
- **Main flow:** Submit invalid data or encounter a dependency failure → receive clear message → correct/retry or return without losing unrelated valid input.
- **Postcondition:** No fabricated result; no sensitive input appears in error telemetry.

## Excluded stories (not MVP)
- Create an account or save a pathway across sessions unless separately approved.
- Upload a document or use AI to extract requirements.
- Calculate total cost/funding gap.
- Receive deadline notifications.
- Submit an application through an external provider.
- Synchronise application status with an institution or funding provider.

Funding matching and manual application tracking are included as P1 / medium-priority intended MVP capabilities. Their acceptance is conditional on resolving the relevant data, privacy, lifecycle and persistence questions in `OPEN-REQUIREMENTS.md`.
