# StudyPath SA — Scope

**Status:** Draft; reflects approved Phase 0 direction pending resolution of the source-specification conflict.

## MVP (P0 candidate)

The MVP is the anonymous-first, source-grounded pathway explorer:
1. Capture the approved subset of grade/year, subjects/marks, interests and preferences.
2. Use a small manually curated catalogue of actual South African institution/programme records with official source provenance.
3. Screen minimum requirements deterministically and return ELIGIBLE, NOT_ELIGIBLE or UNKNOWN.
4. Explain results with requirement-linked reasons and official sources.
5. Show verified related/alternative pathways where catalogue relationships exist.
6. Provide pathway details and official next steps.
7. Provide accessible mobile-first form, results, loading, empty, validation and failure states.
8. Preserve the anonymous/privacy-minimising boundary: no account, no persistent profile, synthetic development/demo data.

**Pilot limitation:** Phase 0 records two official University of Johannesburg programme pages checked. The actual published catalogue size and release freshness policy are not frozen here. The MVP must not claim national catalogue completeness.

## P1 — Next after core MVP, subject to approval

- Funding catalogue and funding matching, with eligibility requirements, verified deadlines and document lists.
- Manual application tracker for university/funding opportunities, with status, deadlines, required documents and notes.
- Saved pathways and authenticated learner profile.
- A more complete curated catalogue covering additional institutions, provinces, qualification types and TVET options.
- Institution/qualification comparison.

These items appear in the broader specification, but are not part of the accepted initial MVP cut line. Priorities must be explicitly reconciled before implementation.

## P2 — Later product capabilities

- Cost planner (tuition, registration, accommodation, transport, food, data, books/equipment, application fees and funding gap).
- AI career-to-study and requirement explanation using verified catalogue context.
- Document assistant for extraction, source-document retention and checklist generation, with human verification of extracted requirements.
- Deadline and missing-document notifications.
- Skill-gap analysis and learner progress tracking.

## P3 — Future / exploratory

- Progress tracking from Grade 11 through admission and graduation.
- External university/funding-system integrations for application status.
- Broad catalogue ingestion automation with human review.
- Multilingual support, enhanced low-data/offline capabilities and other new features after user research.

These future ideas are not approved implementation commitments.

## Explicit exclusions for the initial MVP

- Direct submission of university, TVET or bursary applications.
- Claiming or predicting an authoritative admission/funding decision.
- Guaranteeing admission, bursary eligibility, funding or articulation.
- Full student-management replacement.
- Automated nationwide web crawling or unsupported institutional coverage claims.
- AI as the authority for eligibility, requirements or deadlines.
- Document upload or extraction in the initial MVP.
- Accounts, authentication, cross-session saving, manual tracking and notifications in the initial MVP.
- Real learner personal data in development/demo testing.
- Paid Azure services or provisioning without renewed cost approval; R100/month total cap and no-provisioning boundary remain in force.

## Scope conflict requiring decision

The supplied specification labels student profile (M1), pathway matching (M2), institution information (M3), funding matching (M4), application tracker (M5), official-source authority (M6) and national architecture (M7) as Must Have. Approved Phase 0 decisions explicitly defer cross-session saves and manual application tracking, and the accepted MVP journey is anonymous-first with a small curated catalogue. The hackathon cut line in the specification also says stop after M6, which conflicts with the narrower Phase 0 direction.

This scope document follows the later explicit Phase 0 direction for the initial MVP, but this is **not** a silent deletion of M4/M5. Product owner approval of the reconciliation is required before PRD READY.

## Dependencies and constraints

- Official-source catalogue maintenance and verification.
- Deterministic eligibility rules and explicit UNKNOWN behavior.
- Synthetic-only data, privacy/telemetry review and no profile persistence.
- Total spend cap of R100/month; no paid/metered resource without renewed approval.
- Hackathon submission requires an interactive app, a deck of no more than 10 slides, a demo video no longer than 90 seconds, SSDLC and Lean Business Canvas. The supplied programme gives submission on Monday after the 23–25 October 2026 event; the owner must confirm Sonke portal timezone/upload constraints.

## Definition of MVP scope completion

Scope is not considered delivered until all approved P0 requirements have testable acceptance criteria, the required core journey is verified against a synthetic test set, privacy/source boundaries are evidenced, and no unresolved P0 product ambiguity remains. This is a scope definition, not a claim that the MVP is implemented.
