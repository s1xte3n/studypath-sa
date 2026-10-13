# StudyPath SA — User Stories and Use Cases

**Status:** Draft; mapped to `docs/product/PRD.md`.  
**Rule:** Stories describe product behavior, not implementation tasks.

## Primary persona
**Grade 11–12 learner:** needs realistic, understandable South African study options from current subjects/marks, interests and preferences, without being forced to register first.

## Secondary persona
**Recent matric graduate:** needs to explore options, but programme/admission-cycle coverage may be incomplete and must be shown as unknown where unsupported.

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
- Create account and save a pathway across sessions.
- Create, update or track a university/bursary application.
- Match a funding opportunity and add it to a tracker.
- Upload a document or use AI to extract requirements.
- Calculate total cost/funding gap.
- Receive deadline notifications.
- Submit an application through an external provider.

These exclusions are subject to resolution of the scope conflict documented in `OPEN-REQUIREMENTS.md`.
