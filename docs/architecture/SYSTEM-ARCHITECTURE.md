# StudyPath SA — System Architecture

Status: Draft options; architecture not approved. Date: 2026-10-14.

## Constraints
- Anonymous-first; synthetic data only; no identifying data in MVP.
- Deterministic, explainable, source-backed eligibility; AI cannot decide eligibility.
- Profile, funding inputs/results and tracker are transient browser-memory state only.
- Pilot: 6–8 programme records and 3–5 funding records, manually curated.
- Cost planner, AI chat, uploads, authentication, cross-session persistence and application submission are excluded.
- R100/month cap; no provisioning authorised.
- Supplied specification names /api/v1 and an API-first Azure architecture, while the current cost estimate assumes Static Web Apps Free and client-side matching. These cannot be treated as one approved architecture.

## Option A — Static-first pilot (recommended for owner review, not approved)
- React + Vite static app on Azure Static Web Apps Free.
- Small read-only, versioned catalogue bundled with the app; matching runs in-browser.
- No runtime backend, database, API gateway, authentication, AI or document service.
- Funding/tracker state remains in memory; catalogue freshness uses manual verification and release checklist.
- Advantages: fewer services, aligns with anonymous-first scope and narrow cost estimate.
- Trade-offs: no server-side catalogue API; small catalogue must remain within hosting limits; freshness is a manual operation.

## Option B — API-first (supplied specification direction, not approved for MVP)
- React + Vite, API Management, Azure Functions, PostgreSQL and read-only catalogue/matching API.
- Accounts, learner persistence, uploads and AI remain excluded unless separately approved.
- Requires service-specific security/cost design; current Static Web Apps-only estimate does not cover it.
- Advantages: consistent with supplied API-first direction and future modularity.
- Trade-offs: greater operational and cost surface; API security, failure and telemetry review required.

Owner must select A or B before Phase 3 approval and Phase 4 contract freeze.

## Logical modules
Experience UI; input normalization/validation; pure eligibility engine; funding evaluator; tracker transition validator; versioned catalogue/provenance; presentation adapters; schema/golden-set/source-freshness checks. Preference fit must never change eligibility.

## Data and trust boundaries
Programme rules require stable IDs, official source/publisher/title/URL, explicit admission cycle, verification date, rule conditions/exceptions, catalogue version and curator sign-off. Partial rules cannot yield ELIGIBLE. Conflicts or material unknowns yield UNKNOWN unless verified mandatory failure precedence applies.
Funding records include official source/application URL, criteria, published required-document checklist, deadline/timezone if stated, verification date, status and version. Reverify at least every 30 days; stale/uncheckable records become UNVERIFIED.
Tracker permits only approved linked target/category/status/optional reference deadline and optional learner-reported submission date when SUBMITTED. No notes, documents or sensitive data. WITHDRAWN terminal.
Relationships use ALTERNATIVE, RELATED_FIELD, PROGRESSION or ARTICULATION; articulation requires explicit official evidence.

## Security and operations
Validate all learner inputs; no profile values in logs, telemetry, URLs or third-party services; no secrets in client bundle/repository. If Option B is selected, define CORS, validation, rate limits, safe errors, least privilege and whether transient learner input reaches the API. No real learner data until privacy/legal review.
Before provisioning: exact resource list, region, quotas, private billing/Cost Analysis review, expected total ≤R100/month, and renewed explicit approval. No resource creation under this document.

## Phase 3 gate
- [ ] Owner selects architecture.
- [ ] Data flow, module boundaries and trust boundaries reviewed.
- [ ] Privacy/telemetry and operational failure modes defined.
- [ ] Cost/resource list reviewed against budget.
Gate: BLOCKED pending owner selection and cost/security review.
