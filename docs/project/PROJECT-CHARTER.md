# StudyPath SA — Project Charter

**Status:** Draft for owner/team approval  
**Last updated:** 2026-10-13

## Mission
Help South African Grade 11–12 learners and recent matric graduates discover plausible study pathways and understand admission requirements and next steps.

## Target users
South African learners in Grades 11–12 and recent matric graduates. The audience includes minors, so privacy and data minimisation are foundational constraints.

## Candidate MVP outcome
A mobile-first journey in which a learner can enter relevant marks/subjects and interests, explore explainable qualification/institution matches, understand eligibility and uncertainty, and follow official-source links for next steps. Saved pathways and manual application tracking are candidates but depend on an approved authentication and privacy boundary.

This is a candidate scope, not an approved implementation requirement. Q-001 and related P0 questions must be resolved before the PRD.

## Guardrails
- Eligibility values are `ELIGIBLE`, `NOT_ELIGIBLE`, `UNKNOWN`.
- Use verified requirements and deterministic rules for eligibility.
- Clearly explain matches and missing data.
- No admission/funding guarantees and no claims that applications are submitted.
- Never fabricate institutions, requirements, fees, deadlines or funding.
- Label estimates and demo data.
- AI may assist with explanations/extraction but must not be the eligibility authority.

## Delivery and constraints
- Hackathon MVP target date: 26 October 2026, according to the supplied programme.
- Budget ceiling: R100/month total; prefer free tiers.
- Owner-confirmed baseline: React/Vite and documented Azure services, with API prefix `/api/v1`.
- Use synthetic development data; do not commit secrets or real learner records.
- No cloud provisioning until cost, subscription ownership and access are verified.

## Candidate success criteria (pending approval)
1. A learner can complete the agreed primary journey on a mobile viewport.
2. Each displayed eligibility state is supported by deterministic rules and traceable requirement data; missing facts yield `UNKNOWN`.
3. Each pathway provides a clear explanation and official-source next step.
4. Invalid input, missing catalogue data and service failures have understandable states.
5. Tests and CI provide evidence for core matching and journey requirements.
6. Demo, presentation deck, Lean Business Canvas and other required deliverables are tracked against the supplied programme.

## Governance
Project owner/team must approve scope, requirements, architecture changes, privacy/data decisions, spending and release. Maintain traceability: Requirement ID → UI/API contract → Test ID → implementation → CI result → release evidence.

## Approval required
This charter is not approved until the owner/team confirms the MVP journey, exclusions, success criteria, named owners and P0 risk decisions.
