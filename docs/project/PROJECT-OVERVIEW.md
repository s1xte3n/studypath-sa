# StudyPath SA — Project Overview

**Status:** Phase 0 — Discovery in progress  
**Last updated:** 2026-10-13  
**Readiness gate:** PROJECT READY — NOT PASSED

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
- Anonymous exploration first. Defer cross-session saved pathways and manual application tracking until account, persistence and privacy boundaries are approved.
- Use synthetic development data and minimise collection. Anonymous exploration should not ask for names, ID numbers or contact details.
- R100/month is a hard total spend cap; prefer free tiers and verify prices, quotas, and overage risks before provisioning.
- Do not provision Azure resources until subscription/tenant access, permissions, cost controls and deployment responsibility are confirmed.
- Name accountable owners for product decisions, catalogue verification, cloud, security/privacy and release/demo readiness.

These are accepted directions, not evidence that catalogue data, cost feasibility, privacy review, team ownership or Azure access have been verified.

## Users and constraints
- Primary audience includes minors; privacy-by-design and data minimisation are required.
- Hackathon MVP target: 26 October 2026, based on the supplied programme; confirm all current organiser requirements and deliverables.
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
PROJECT READY remains blocked by outstanding source catalogue evidence, Azure ownership/access, service-by-service cost validation, operational privacy/data-handling review, named team owners, and hackathon requirement verification. See `PROJECT-STATUS.md` and `OPEN-QUESTIONS.md`.
