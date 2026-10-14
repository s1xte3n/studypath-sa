# StudyPath SA — Scope

**Status:** Draft; reflects owner-approved Phase 0 and OR-008–OR-014 decisions. Explicit PRD approval and OR-015/016 detail remain outstanding.

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

**Pilot limitation:** Target 6–8 curated programme records, prioritising Gauteng and official sources that can be verified and maintained. Include qualification types only where official evidence supports them. The two UJ pages checked in Phase 0 do not establish that the 6–8 publication-ready record target has been met. The MVP must not claim national catalogue completeness.

## P1 — Medium-priority capabilities in the intended MVP

Funding matching and manual application tracking are in the intended MVP scope at medium priority. They follow the P0 core pathway-discovery journey and must not displace core eligibility correctness, privacy safeguards, test coverage or demo reliability.

- **REQ-FUND-001 — Funding catalogue and matching:** a bounded, curated set of funding opportunities with source-backed criteria, provenance, verification dates, deadline/expiry handling, explainable matches and explicit uncertainty.
- **REQ-APP-001 — Manual application tracker:** learner-reported tracking of supported university/funding applications, with approved statuses and next steps. Tracker lifecycle and data/persistence model must be approved before implementation.
- Catalogue expansion beyond the initial 6–8 record pilot, including additional institutions, provinces, qualification types and TVET options only when the corresponding official records can be verified.
- Institution/qualification comparison.

Saved pathways and authenticated learner profiles remain outside the intended MVP and require separate approval. P1 means medium priority within the intended MVP, not permission to skip acceptance criteria or privacy/security gates.

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
- Accounts, authentication, cross-session saving and notifications in the initial MVP.
- Direct application submission and external application-system status synchronisation.
- Persistent tracker records or collection of sensitive funding inputs until their data-handling rules are approved.
- Real learner personal data in development/demo testing.
- Paid Azure services or provisioning without renewed cost approval; R100/month total cap and no-provisioning boundary remain in force.

## Funding and tracker boundaries still open

The supplied specification labels M4 funding matching and M5 application tracking as Must Have. OR-001 resolves the scope conflict by including both in the intended MVP at P1 / medium priority, behind the P0 core pathway-discovery journey. Funding criteria/data rules (OR-015) and tracker lifecycle/data handling (OR-016) remain open. The approved OR-006 privacy boundary applies: this scope decision does not authorise accounts, cross-session persistence, persistent tracker records or collection of sensitive financial data.

## Dependencies and constraints

- Official-source catalogue maintenance and verification.
- Deterministic eligibility rules and explicit UNKNOWN behavior.
- Synthetic-only data, privacy/telemetry review and no profile persistence.
- Total spend cap of R100/month; no paid/metered resource without renewed approval.
- Hackathon submission requires an interactive app, a deck of no more than 10 slides, a demo video no longer than 90 seconds, SSDLC and Lean Business Canvas. The supplied programme gives submission on Monday after the 23–25 October 2026 event; the owner must confirm Sonke portal timezone/upload constraints.

## Definition of MVP scope completion

Scope is not considered delivered until all approved P0 requirements have testable acceptance criteria, the required core journey is verified against a synthetic test set, privacy/source boundaries are evidenced, and no unresolved P0 product ambiguity remains. This is a scope definition, not a claim that the MVP is implemented.
