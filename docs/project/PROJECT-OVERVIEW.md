# StudyPath SA — Project Overview

**Status:** Phase 2 — Requirements matrix and traceability  
**Last updated:** 2026-10-14  
**Phase 0 gate:** PROJECT READY — PASSED for Phase 1 planning only  
**Latest passed gate:** PRD READY — PASSED on 2026-10-14 for the approved PRD/acceptance-criteria baseline only

## Purpose
Help South African Grade 11–12 learners and recent matric graduates explore study pathways using school marks, subjects, interests, preferences and admission requirements.

## Product guardrails
- Explain qualification/institution matches and show why a pathway matched.
- Represent eligibility as `ELIGIBLE`, `NOT_ELIGIBLE`, or `UNKNOWN`.
- Base eligibility on deterministic, testable rules and verified requirements.
- Offer degrees, diplomas, higher certificates and TVET options where supported by verified data.
- Do not guarantee admission or funding, claim to submit applications, or invent requirements, costs, deadlines or eligibility.
- Label estimates and demo data. AI may help explain or extract information, but is not the authority for eligibility or funding decisions.

## Accepted Phase 0 direction
- MVP journey: learner enters relevant subjects/marks and interests, explores explainable pathway matches, reviews eligibility and uncertainty, then follows official-source next steps.
- Defer document uploads, AI chat and application submission from the initial MVP unless a later approved change establishes a requirement.
- Start with a small manually curated catalogue from official sources; record provenance, including source URL, verification date and catalogue version where practical.
- Anonymous exploration first. Cross-session saved pathways remain excluded. Manual application tracking is included at P1 with page-memory-only entries; no server/database or browser storage is approved.
- Use synthetic development data and minimise collection. Anonymous exploration should not ask for names, ID numbers or contact details.
- R100/month is a hard total spend cap; prefer free tiers and verify prices, quotas, and overage risks before provisioning.
- Do not provision Azure resources until subscription/tenant access, permissions, cost controls and deployment responsibility are confirmed.
- Name accountable owners for product decisions, catalogue verification, cloud, security/privacy and release/demo readiness.

The owner approved these directions and attests that account-specific checks are complete. Public-source checks and the gate decision are recorded in `PHASE0-ONLINE-EVIDENCE.md`. Account-specific Azure records were not independently inspected by the assistant. Implementation, testing, provisioning and release remain unverified.

## Users and constraints
- Primary audience includes minors; privacy-by-design and data minimisation are required.
- Hackathon submission deadline: Monday 26 October 2026 at 23:59 per the supplied programme and calendar inference; confirm timezone and upload limits in Sonke.
- Maximum total project spend: R100/month. Prefer free tiers. Verify prices, quotas and overage risk before provisioning.

## Technology baseline
The owner confirmed the documented baseline: React, Vite, Azure Static Web Apps, Azure API Management, Azure Functions, Azure Database for PostgreSQL, Azure Blob Storage, Microsoft Entra External ID, Azure AI Document Intelligence, Azure OpenAI, Azure Key Vault, Application Insights, Terraform and GitHub Actions. API prefix: `/api/v1`.

This is a baseline, not evidence that these services have been provisioned or that every service belongs in the MVP. Any budget-driven scope change requires an explicit decision.

## Repository baseline (verified 2026-10-13)
- Repository: https://github.com/s1xte3n/studypath-sa
- Visibility: private
- Default branch: `main`
- Initial inspected root contents: `README.md` only
- Phase 0 baseline documentation was merged in PR #1.
- Application code, tests, CI/CD, infrastructure and deployment are not yet evidenced by the initial inspection.

## Current gate
Phase 0 `PROJECT READY` passed on 2026-10-13 for Phase 1 planning only. Phase 1 `PRD READY` passed on 2026-10-14 after explicit owner approval of the revised PRD and measurable acceptance criteria. Current work is Phase 2 requirements traceability; `REQUIREMENTS READY` has not passed. Neither gate means the app is implemented, tested, deployed or ready for public learner use. Account-specific Azure and hackathon checks remain owner-attested; public UJ/Microsoft source checks are logged in `PHASE0-ONLINE-EVIDENCE.md`. See `PROJECT-STATUS.md` and `OPEN-QUESTIONS.md`.
