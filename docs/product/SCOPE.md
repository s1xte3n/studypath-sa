# StudyPath SA — Scope

**Status:** Scope reconciliation for D-044–D-048 is recorded. The Phase 1 PRD baseline is owner-approved. D-046 authenticated features are approved future scope but excluded from the D-047/G-SYN-001 local synthetic-only demo; the tracker remains page-memory-only. Phase 2 `REQUIREMENTS READY` remains open, and this document does not establish implementation readiness.

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

- **REQ-FUND-001 — Funding catalogue and matching:** a 3–5-opportunity official-source pilot with limited non-sensitive inputs, source-backed criteria, provenance, verification dates, deadline/timezone and expiry handling, explainable matches and explicit uncertainty.
- **REQ-APP-001 — Manual application tracker:** learner-reported tracking of supported university/funding applications, with defined status transitions and minimal approved fields. Keep entries page-memory-only; do not use browser-local persistence, server persistence or cloud sync. Any proposed change requires explicit change control and privacy/security review.
- Catalogue expansion beyond the initial 6–8 record pilot, including additional institutions, provinces, qualification types and TVET options only when the corresponding official records can be verified.
- Institution/qualification comparison.

D-046 separately approves authenticated pathway matching, saved pathways, pathway comparison, saved funding opportunities and a derived personal dashboard as future product scope. These features are excluded from the D-047/G-SYN-001 local synthetic-only demo and remain gated by Q-018/Q-020, exact contracts, security/privacy review, test evidence and cost approval. Academic-profile persistence is off by default and requires separate explicit opt-in under an approved lifecycle. P1 means medium priority within the intended MVP, not permission to skip acceptance criteria or privacy/security gates.

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
- Accounts, authentication, cross-session saving and notifications in the D-047/G-SYN-001 local synthetic-only demo. Authenticated features remain approved future scope under D-046 but are gated and not implemented by this boundary.
- Direct application submission and external application-system status synchronisation.
- Tracker persistence: excluded. Tracker entries remain page-memory-only unless a future, separately approved change supersedes the current decision; collection of sensitive funding inputs remains excluded.
- Real learner personal data in development/demo testing.
- Paid Azure services or provisioning without renewed cost approval; R100/month total cap and no-provisioning boundary remain in force.

## Funding and tracker boundaries

The supplied specification labels M4 funding matching and M5 application tracking as Must Have. OR-001 includes both in the intended MVP at P1 / medium priority, behind the P0 core pathway-discovery journey.

- **Funding (OR-015):** Target 3–5 curated official-provider/government opportunities. Use limited non-sensitive inputs (study stage, intended field/interest and location). Record official source, criteria, required-document checklist metadata, published amount/coverage, deadline/timezone as stated, cycle, verification date, catalogue version, curator sign-off and expiry/currentness. Re-verify at least every 30 days and sooner after material changes. Do not collect sensitive financial data, upload documents or guarantee awards.
- **Tracker (OR-016):** Use the owner-approved status lifecycle and permitted tracker fields. Status is learner-reported; `submitted_at` is optional and manually entered. Tracker entries are page-memory-only for the current page session. Do not use browser-local storage, IndexedDB, cookies, accounts, server/database persistence or cloud sync. Reload/close may discard entries; disclose this before tracking and do not claim entries are saved or recoverable. Any future persistence proposal is out of scope and requires a new explicit owner decision plus privacy/security review before implementation. Academic/profile inputs and results remain memory-only; saved pathways and authenticated persistence remain excluded from the D-047/G-SYN-001 demo.
- **Cost planner (OR-017):** Deferred from the initial MVP. Future semantics are ZAR, once-off versus annual recurring costs, source/date and estimate labeling, unknown values rather than zero, confirmed funding deducted only, potential funding shown separately, and no definitive gap when essential costs are missing. A negative calculated need is represented as zero remaining gap plus a separately shown surplus.
- **AI/document assistant (OR-018):** Deferred entirely from the initial MVP. No uploads, extraction or AI document chat. Future consideration requires explicit consent, file/size and upload safeguards, retention/deletion, access control, confidence handling, human verification, prompt-injection defenses and official-source verification. AI never becomes the eligibility authority.

These decisions define requirements only; they do not establish implementation or test evidence.

## Dependencies and constraints

- Official-source catalogue maintenance and verification.
- Deterministic eligibility rules and explicit UNKNOWN behavior.
- Synthetic-only data, privacy/telemetry review and no profile persistence.
- Total spend cap of R100/month; no paid/metered resource without renewed approval.
- Hackathon submission requires an interactive app, a deck of no more than 10 slides, a demo video no longer than 90 seconds, SSDLC and Lean Business Canvas. The supplied programme gives submission on Monday after the 23–25 October 2026 event; the owner must confirm Sonke portal timezone/upload constraints.

## Definition of MVP scope completion

Scope is not considered delivered until all approved P0 requirements have testable acceptance criteria, the required core journey is verified against a synthetic test set, privacy/source boundaries are evidenced, and no unresolved P0 product ambiguity remains. This is a scope definition, not a claim that the MVP is implemented.
