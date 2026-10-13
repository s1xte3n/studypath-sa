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

## Users and constraints
- Primary audience includes minors; minimise personal data and establish privacy safeguards before collecting real learner data.
- Anonymous exploration is preferred; saved pathways and manual application tracking/authentication boundaries remain undecided.
- Hackathon MVP target: 26 October 2026, based on the supplied programme.
- Maximum total project spend: R100/month. Prefer free tiers. Verify prices, quotas and overage risk before provisioning.

## Technology baseline
The owner confirmed the documented baseline: React, Vite, Azure Static Web Apps, Azure API Management, Azure Functions, Azure Database for PostgreSQL, Azure Blob Storage, Microsoft Entra External ID, Azure AI Document Intelligence, Azure OpenAI, Azure Key Vault, Application Insights, Terraform and GitHub Actions. API prefix: `/api/v1`.

This is a baseline, not evidence that these services have been provisioned or that every service belongs in the MVP. Any budget-driven scope change requires an explicit decision.

## Repository baseline (verified 2026-10-13)
- Repository: https://github.com/s1xte3n/studypath-sa
- Visibility: private
- Default branch: `main`
- Initial inspected root contents: `README.md` only
- A documentation baseline is being prepared on `docs/phase-0-baseline`.
- Application code, tests, CI/CD, infrastructure and deployment are not yet evidenced by this inspection.

## Current gate
PROJECT READY is blocked by unresolved MVP scope, verified catalogue/data sources, cost feasibility, learner-data/privacy decisions and authentication/persistence boundaries. See `PROJECT-STATUS.md` and `OPEN-QUESTIONS.md`.
