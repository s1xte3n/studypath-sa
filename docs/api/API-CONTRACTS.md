# StudyPath SA — API and Interface Contracts

Status: Draft; contract freeze blocked by architecture decision. Date: 2026-10-14.

## Contract boundary
The supplied specification names /api/v1, but no backend API is verified as implemented. Until Phase 3 selects architecture, define in-process JavaScript module interfaces only; do not implement HTTP endpoints. If static-first is approved, these are domain contracts, not HTTP APIs.

## Shared enums
Eligibility: ELIGIBLE, NOT_ELIGIBLE, UNKNOWN. Eligibility is not an admission decision. Apply OR-004 precedence, AND/OR/conditional rules, and never allow preference fit to upgrade eligibility.
Tracker status: DRAFT, READY_TO_SUBMIT, SUBMITTED, AWAITING_DOCUMENTS, UNDER_REVIEW, ACCEPTED, REJECTED, WITHDRAWN. All are learner-reported. WITHDRAWN is terminal.
Funding record status: CURRENT, UNVERIFIED, EXPIRED. Do not present UNVERIFIED/EXPIRED as confirmed current.

## Proposed in-process interfaces
Input validator:
- Input: studyStage (GRADE_11, GRADE_12, RECENT_MATRIC_GRADUATE), at least one subject/mark pair, optional interests/location/studyMode.
- Output: either canonical validated input or structured field issues with code REQUIRED, INVALID_MARK, UNSUPPORTED_SUBJECT or DUPLICATE_SUBJECT.
- Marks are whole-number percentages 0–100 inclusive; reject decimals, do not coerce; no fuzzy subject matching.

Eligibility evaluator:
- Input: canonical learner input and verified versioned pathway record.
- Output: pathwayId, state, requirement-level reasons/outcomes, source references and catalogueVersion.
- Same input and catalogue version must return the same state/reasons. A partial or unverified rule set cannot yield ELIGIBLE.

Funding evaluator:
- Input: approved limited funding fields and verified funding record.
- Output: opportunityId, state, reasons, unknown criteria, official source URL, verification date and record status.
- Do not request ID, household income, bank details, sensitive attributes or documents. Missing material criteria yield UNKNOWN.

Tracker transition validator:
- Input: current tracker entry and requested next status.
- Output: updated entry or structured INVALID_TRANSITION.
- Only transitions in FUNDING-TRACKER-PRIVACY-POLICY.md are valid. Submission date is optional and only valid for SUBMITTED. Clear/reset removes tracker and transient funding state; reload starts empty.

## Error behaviour
Validation errors are field-specific. Unsupported subject, empty catalogue, no results, unknown pathway, stale source and matching failure have distinct recoverable UI states. Errors must not include marks/profile values. A failed recomputation must not leave stale results presented as current.

## Future HTTP candidates — only if API-first approved
- GET /api/v1/pathways
- GET /api/v1/pathways/{pathwayId}
- GET /api/v1/funding/opportunities
- POST /api/v1/matching/pathways
- POST /api/v1/matching/funding

These are proposed, not frozen or implemented. No profile, application persistence, upload, authentication or AI endpoints are included in the MVP. If HTTP is approved, define request/response schemas, status codes, error envelope, IDs, date/time semantics, CORS, auth, logging hygiene, rate limits and compatibility policy before implementation.

Gate: BLOCKED pending Phase 3 choice and owner review.
