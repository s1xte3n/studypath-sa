# StudyPath SA — Project Charter

**Status:** Draft; accepted Phase 0 direction, formal gate approval pending  
**Last updated:** 2026-10-13

## Mission
Help South African Grade 11–12 learners and recent matric graduates discover plausible study pathways and understand admission requirements and next steps.

## Target users
South African learners in Grades 11–12 and recent matric graduates. The audience includes minors, so privacy and data minimisation are foundational constraints.

## Accepted MVP direction
A mobile-first journey in which a learner enters relevant subjects/marks and interests, explores explainable qualification/institution matches, understands eligibility and uncertainty, and follows official-source links for next steps.

Initial exclusions: document uploads, AI chat and application submission. Saved pathways and manual application tracking are deferred until the authentication, persistence and privacy boundary is approved.

Start with a small, manually curated catalogue from official sources. Record source URLs, verification dates and catalogue version where practical. The catalogue owner, exact sources, permitted use and verification cadence remain to be confirmed.

This records the owner's accepted Phase 0 direction on 2026-10-13. Detailed requirements and measurable acceptance criteria must be defined in the PRD only after PROJECT READY is passed.

## Guardrails
- Eligibility values are `ELIGIBLE`, `NOT_ELIGIBLE`, `UNKNOWN`.
- Use verified requirements and deterministic rules for eligibility.
- Clearly explain matches and missing data.
- No admission/funding guarantees and no claims that applications are submitted.
- Never fabricate institutions, requirements, fees, deadlines or funding.
- Label estimates and demo data.
- AI may assist with explanations/extraction but must not be the eligibility authority.
- Use synthetic development data and minimise personal data; anonymous exploration should not request names, ID numbers or contact details.

## Delivery and constraints
- Hackathon MVP target date: 26 October 2026, according to the supplied programme; current rules and deliverables must still be verified.
- Budget ceiling: R100/month total; prefer free tiers.
- Owner-confirmed baseline: React/Vite and documented Azure services, with API prefix `/api/v1`.
- The project owner reports an existing Azure subscription and owns all project roles for now; verify tenant details, effective permissions and billing visibility before provisioning.
- The project owner temporarily holds product, catalogue/data, cloud/budget, security/privacy, engineering/QA and release/demo responsibilities. No backup or independent reviewer is appointed.
- No cloud provisioning until access and cost controls are evidenced and the R100/month cap is shown feasible.

## Candidate success criteria (pending PRD)
1. A learner can complete the agreed primary journey on a mobile viewport.
2. Each displayed eligibility state is supported by deterministic rules and traceable requirement data; missing facts yield `UNKNOWN`.
3. Each pathway provides a clear explanation and official-source next step.
4. Invalid input, missing catalogue data and service failures have understandable states.
5. Tests and CI provide evidence for core matching and journey requirements.
6. Demo, presentation deck, Lean Business Canvas and other required deliverables are tracked against the supplied programme.

## Governance
Project owner/team must approve scope, requirements, architecture changes, privacy/data decisions, spending and release. Maintain traceability: Requirement ID → UI/API contract → Test ID → implementation → CI result → release evidence.

## Approval required
The MVP direction and provisional single-person role assignments are owner-confirmed. The owner also reports an existing owned Azure subscription, a completed Sonke team profile and new-app status; these statements are not all independently verified. The charter and PROJECT READY gate remain pending until catalogue records are approved and verified, cost feasibility is evidenced, privacy/security review is recorded, Azure access/billing is inspected, hackathon details are confirmed, and the owner explicitly approves the Phase 0 exit.
