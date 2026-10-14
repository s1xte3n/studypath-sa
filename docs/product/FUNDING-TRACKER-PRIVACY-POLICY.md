# Funding, Application Tracking and Privacy Policy

- **Status:** Three policy decisions approved by product owner; PRD and implementation alignment pending
- **Scope:** StudyPath SA MVP; funding matching (P1) and manual application tracking (P1)
- **Date:** 2026-10-14
- **Authority:** Product decisions must be reconciled with the supplied StudyPath SA specification, Phase 0 decisions and hackathon rules before PRD approval.
- **Important:** This document defines proposed product rules. It does not claim that any feature is implemented, tested or deployed.

## 1. Product guardrails

1. The core pathway-discovery journey remains P0. Funding matching and manual application tracking are P1 (medium priority) and must not displace core matching correctness, privacy/security, test coverage or demo reliability.
2. The learner journey is anonymous-first. Neither feature requires an account.
3. No cross-session persistence is approved by this policy.
4. Development and demonstration must use synthetic data. Do not enter real learner records into development/demo environments.
5. Eligibility and status are deterministic, explainable and distinguish known facts from missing or unverified information.
6. Official providers remain authoritative for funding criteria, deadlines and application outcomes. StudyPath SA does not guarantee funding or admission and does not submit applications.

## 2. Funding matching (REQ-FUND-001)

### 2.1 Catalogue record

Each published funding opportunity must have:
- Stable internal opportunity ID and published opportunity/provider name.
- Funding type, such as bursary, scholarship or grant, using the supported catalogue vocabulary.
- Official provider source URL.
- Applicable study levels, qualifications, fields, institutions and location restrictions where the provider specifies them.
- Published mandatory and optional applicant criteria, represented as structured fields with explicit unknown values.
- Published benefits/coverage/amount only where stated by the provider.
- Required documents only where explicitly listed by the provider.
- Application opening date and deadline as published, including timezone where available; distinguish date-only deadlines from exact times.
- Record status: CURRENT, EXPIRED, UNVERIFIED or INACTIVE.
- Last-verified date, verifier/curator reference, and catalogue version.
- A short, source-grounded summary and the official next step.

Do not publish a definitive eligibility criterion, amount, required document or deadline based only on an AI summary, search snippet or unverified third-party listing. A third-party source may be used to discover a lead, but the record remains UNVERIFIED until the official provider source supports the material facts.

### 2.2 Learner inputs

Allowed by default, only when relevant to an explicit published criterion:
- Current study stage (for example Grade 12 or matric graduate).
- Intended qualification, field of study and institution.
- Subjects and marks already provided for pathway matching.
- Province or intended study location.

Do not collect by default:
- National identity/passport numbers, bank details, account credentials or copies of identity documents.
- Household income, parent/guardian employment or financial documents.
- Health, disability, race or other sensitive attributes.
- Personal application documents or unstructured sensitive notes.

If a funding opportunity requires a criterion that is not available from permitted inputs, return UNKNOWN for that criterion. Do not infer it, collect it silently, or claim eligibility. Adding a sensitive input requires separate documented necessity, privacy, security, consent and retention review.

### 2.3 Matching semantics

Funding eligibility is separate from admission eligibility and uses:
- ELIGIBLE only when all applicable mandatory criteria are supported by verified data and are satisfied.
- NOT_ELIGIBLE when at least one verified mandatory criterion is not satisfied.
- UNKNOWN when a necessary criterion is missing, ambiguous, stale or unsupported and no verified mandatory failure already establishes NOT_ELIGIBLE.

Each result must show the reason(s), criteria checked, missing/unknown criteria, official source, verification date and provider next step. Never guarantee an award or claim that StudyPath SA has applied on the learner's behalf.

### 2.4 Deadlines and freshness

Approved operational policy decisions:
- Recheck active funding records against the official provider source at least every 30 days.
- Recheck deadline changes before continuing to present a deadline as confirmed when a change is reported or suspected.
- Store the published deadline faithfully; retain timezone where provided and distinguish date-only deadlines from exact times.
- Mark a record EXPIRED after its confirmed deadline has passed unless the provider explicitly publishes an extension.
- Mark a record UNVERIFIED when the freshness threshold is exceeded or the official source cannot be checked.
- Do not present EXPIRED or UNVERIFIED records as confirmed current opportunities. If displayed for context, label them clearly and do not assert current eligibility/deadline certainty.

The 30-day threshold is an approved StudyPath SA catalogue policy, not a provider requirement. Catalogue publication and verification are curator responsibilities. Re-verify sooner when a deadline change is reported or suspected.

## 3. Manual application tracker (REQ-APP-001)

### 3.1 Purpose and claims

The tracker records learner-reported progress only. It does not submit applications, communicate with institutions/providers, verify receipt, or synchronise external application status. Every status must be labelled as learner-reported.

### 3.2 Permitted fields

The proposed initial tracker record is limited to:
- Internal tracker-entry ID generated in the current session.
- Reference to a supported pathway/qualification/institution or funding opportunity, where available.
- Application category: study or funding.
- Status from the approved state list.
- Optional target deadline copied from a verified catalogue record, clearly labelled as a reference date rather than a guarantee.
- Optional learner-entered submission date, only when status is SUBMITTED; label it learner-reported.
- No additional next-action choice field in the initial MVP. Next-step guidance is limited to official source links and neutral, source-backed guidance; no predefined action taxonomy or personalised task planner.

Do not collect free-text notes, identity numbers, account credentials, bank/household financial data, sensitive attributes, document contents, file uploads, application passwords or copies of submitted forms in the initial tracker. Do not treat an institution's status as verified unless a separately approved integration provides that evidence.

### 3.3 Statuses and transitions

Approved MVP status vocabulary:
- DRAFT — learner intends to prepare an application.
- READY_TO_SUBMIT — learner reports that they have prepared it and intend to submit it.
- SUBMITTED — learner reports submitting it.
- AWAITING_DOCUMENTS — learner reports that the provider requested further documents.
- UNDER_REVIEW — learner reports that the provider is reviewing it.
- ACCEPTED — learner reports an acceptance/award outcome.
- REJECTED — learner reports a rejection outcome.
- WITHDRAWN — learner reports withdrawing the application.

Allowed transitions:
- DRAFT -> READY_TO_SUBMIT, WITHDRAWN
- READY_TO_SUBMIT -> DRAFT, SUBMITTED, WITHDRAWN
- SUBMITTED -> AWAITING_DOCUMENTS, UNDER_REVIEW, ACCEPTED, REJECTED, WITHDRAWN
- AWAITING_DOCUMENTS -> SUBMITTED, UNDER_REVIEW, ACCEPTED, REJECTED, WITHDRAWN
- UNDER_REVIEW -> AWAITING_DOCUMENTS, ACCEPTED, REJECTED, WITHDRAWN
- ACCEPTED -> WITHDRAWN only if the learner explicitly corrects/reports withdrawal; retain that it is learner-reported.
- REJECTED -> WITHDRAWN only to record the learner's decision to stop tracking; do not rewrite the historical rejection as a different outcome.
- WITHDRAWN is terminal in the MVP.

For correction of an incorrectly entered status, permit an explicit “correct status” action with confirmation and an audit-free in-session replacement, clearly indicating the status is learner-reported. Do not silently permit arbitrary transitions. If this correction rule is not implemented, the learner must be able to remove the entry and create a corrected one.

The product owner approved this status vocabulary and transition model on 2026-10-14. Implementation must preserve these transitions and the stated correction/removal behaviour.

### 3.4 Persistence, reset and deletion

Approved initial MVP boundary:
- Tracker entries exist in client memory for the current page session only.
- No server/database persistence, localStorage, sessionStorage, browser cookies, cross-session save, account or cloud sync.
- A page reload, tab close or session reset may discard tracker entries; explain this before the learner starts tracking.
- Provide a visible “Clear tracker” action with confirmation. It clears all in-memory tracker entries and associated transient funding inputs/results.
- Reset must also clear relevant form state and visible derived results; do not leave stale results on screen.
- If a save/persistence operation does not exist, do not show a “saved” claim. Use “tracked in this session” wording.
- If persistence is proposed later, stop and require a new decision covering identity/session ownership, authentication, access control, retention, deletion, backups, cross-user isolation and security testing.

This is an intentionally limited tracker. Page-memory-only persistence was explicitly approved by the product owner on 2026-10-14. If session-only tracking proves insufficient, raise a new scope/privacy decision rather than silently adding browser or server persistence.

## 4. Privacy and anonymous-first boundary (REQ-PRIV-001)

### 4.1 Data minimisation

- Collect only fields necessary for a displayed pathway/funding result or a session-only tracker entry.
- Explain why each optional field is requested and allow the learner to continue without it where possible.
- Do not require an account for pathway discovery, funding matching or session-only tracking.
- Do not request sensitive inputs by default. If missing sensitive information prevents a definitive funding result, show UNKNOWN and link to the provider's official criteria.
- No document uploads or AI document extraction are included in this policy.

### 4.2 Processing and retention

- Treat pathway inputs, funding inputs and tracker entries as transient session data.
- Do not send these values to analytics, telemetry, application logs, error traces or AI prompts unless a separately approved and documented need, lawful basis, minimisation and security controls exist.
- Operational telemetry may record non-sensitive technical events (for example request success/failure and latency) only after a telemetry field review confirms that inputs, marks, funding attributes, tracker statuses and free text are not included.
- Clear transient data on explicit reset and when the page session ends. Do not imply cross-session recovery.
- Use synthetic learner data in development, automated tests, screenshots and demos. Do not use real student records in development/demo environments.

### 4.3 Security and access

- No authentication or server-side student profile is introduced by these features.
- Do not store tracker/funding learner data in a shared server catalogue. The catalogue contains curated opportunity facts; learner-specific values remain transient on the client.
- Validate all catalogue records and inputs; render external source URLs safely and clearly.
- Never place secrets or personal data in client code or repository files.
- If architecture changes to persist personal/session data, require an approved privacy/security review, ownership model, deletion and retention rules, server-side authorisation where applicable, and cross-user isolation tests before implementation.

### 4.4 User-facing disclosure

Before tracker use, state that entries are held only in the current page session and may be lost on reload or when the page is closed. On funding results, state that matches are informational, based on the listed source and verification date, and must be confirmed with the provider. Label all tracker statuses as learner-reported.

## 5. Acceptance criteria

### Funding
- Every published opportunity has an official source URL, verification date and explicit record status.
- Unsupported or missing criteria yield UNKNOWN rather than invented certainty.
- Funding eligibility is calculated separately from admission eligibility.
- Expired/unverified records are not presented as confirmed current opportunities.
- No funding award, application submission or provider confirmation is claimed.

### Tracker
- Only approved fields and statuses are accepted.
- Invalid transitions are rejected with an understandable explanation.
- All displayed statuses are labelled learner-reported.
- Session-only data is not persisted to a server, localStorage, sessionStorage or cookies.
- Clear tracker/reset removes transient tracker and associated form/result state.
- Reloading/ending the session does not claim data was saved or recoverable.

### Privacy
- No account is required.
- Sensitive funding attributes and personal documents are not requested by default.
- Automated tests, logs and telemetry do not expose marks, funding inputs or tracker details.
- Development/demo evidence uses synthetic data.
- Any proposed persistence or sensitive-input change is blocked pending explicit approval and revised requirements.

## 6. Decisions still required

The following items remain before the PRD can be marked READY:
1. Obtain explicit product-owner approval of the revised PRD and measurable success criteria.
2. Review hosting/provider telemetry defaults before public demo as a downstream privacy/release control.
3. In Phase 2, complete the requirements traceability matrix; in Phase 6, approve the test strategy and record actual test evidence.

The 30-day freshness threshold, page-memory-only tracker persistence, and status-transition model are approved policy decisions. This does not authorise a claim that features are implemented or tested. Implementation should begin only through the normal SSDLC gate after the PRD, requirements matrix, acceptance criteria and test strategy are aligned and reviewed.
