# Q-020 Next Gate — Evidence Closure Before Implementation

**Status:** OPEN — evidence collection and external review required.  
**As of:** 2026-10-15  
**Branch purpose:** Documentation-only gate plan. This file does not pass any gate or authorize implementation, provisioning, production identity configuration, real learner data, or deployment.

## Objective

Close the external-evidence blockers for Q-020 before freezing the authenticated architecture/schema or implementing persistence. Owner approvals A–E are design decisions only. The current contract-test CI result is not runtime, privacy, security, legal, provider, or cost evidence.

## Gate sequence and evidence register

Record evidence in repository-safe form. Do not commit tenant IDs, subscription IDs, billing screenshots containing identifiers, access tokens, learner data, or other secrets. Keep sensitive portal evidence private and record only the reviewer, date, scope, redacted evidence reference, and conclusion.

| Gate ID | Required action | Acceptable evidence / completion record | Owner / reviewer | Current state |
|---|---|---|---|---|
| G-Q020-1 Privacy, legal and minors | Obtain a qualified South African privacy/legal review of the actual data inventory, purposes, lawful basis, child/minor treatment, consent/withdrawal, privacy notice, operator terms, cross-border processing, retention/deletion, incident handling and public-demo boundary. | Completed Q020-PRIVACY-LEGAL-AGE-REVIEW.md with reviewer qualifications/role, review date, sources, decision, conditions, and explicitly unresolved points. No real learner data until any required conditions are met. | Qualified external reviewer; project owner records outcome | **BLOCKED — review not evidenced** |
| G-Q020-2 Identity provider | Verify Entra External ID suitability and supported SPA OIDC authorization-code + PKCE/MSAL flow; audience/age restrictions, tenant/service terms, region/data location, token/session behavior, logs, retention, deletion, recovery and relevant provider commitments. Do not create/configure a production tenant as part of this documentation gate. | Dated capability matrix citing official provider documentation/terms; clearly distinguish documented facts from tenant-specific settings that remain unverified; security/privacy reviewer disposition. | Identity/cloud owner + security/privacy reviewer | **OPEN — candidate only** |
| G-Q020-3 Full-stack cost | Price every intended service and relevant add-on for an explicitly stated region and workload, including API compute, database, storage/I/O, backups/restores, logs/metrics, identity, egress, GitHub usage, domain, taxes, FX and overages. Include quotas and alert/shutdown controls. | Saved itemized estimate and source/date for each line; monthly total in ZAR using stated FX/tax assumptions; low/expected/peak cases; evidence that every scenario stays at or below **R100/month**. If not, defer authenticated persistence/features and reduce scope. | Cloud/budget owner; independent check if available | **BLOCKED — all-in cost not proven** |
| G-Q020-4 Runnable baseline | Inspect the default branch and establish the actual source, dependency manifests, API, schema/migrations, configuration, tests, CI and infrastructure baseline. Record missing artifacts rather than inferring implementation from design docs. | Commit SHA; file inventory; exact setup/build/test commands; tool/runtime versions; results and logs; reviewed architecture/API/schema deltas. | Engineering owner | **BLOCKED — application runtime not verified** |
| G-Q020-5 Test implementation and execution | Implement the approved acceptance matrix only after contracts and legal/privacy/provider/cost decisions are resolved. Run on the actual runnable application/API with synthetic fixtures. | Commit-linked results for authentication and token rejection; input validation; deterministic matching; anonymous and authenticated privacy canaries; opt-in/withdrawal; ownership and cross-account isolation; logout/account switching; errors/timeouts; deletion; restore-after-deletion; retention/logging; tracker non-persistence; accessibility/security/regression; and at least 20 reviewed golden cases with **zero false-positive ELIGIBLE** outcomes. | Engineering + QA/security reviewer | **NOT STARTED / NOT VERIFIED** |
| G-Q020-6 Operational controls | Design and test allowlisted logging, no-store cache behavior, monitoring/alerts, backup expiry, deletion queue/tombstones, restore replay, incident response, environment separation and access restrictions. | Configured control evidence and negative tests from the actual environment; restore/deletion rehearsal record; reviewed incident/runbook. | Cloud/security owner | **NOT STARTED / NOT VERIFIED** |
| G-Q020-7 Release authorization | Reconcile requirements-to-contract-to-test-to-implementation-to-CI evidence and record remaining risks. Obtain a separate explicit authorization for any provisioning or deployment. | Updated traceability matrix, passed CI for the relevant commit, runtime smoke/security/privacy results, release checklist and explicit owner approval. | Project owner + reviewer where available | **BLOCKED by G-Q020-1–6** |

## Required working order

1. Complete G-Q020-1 review pack and obtain qualified review; do not self-label it as legal approval.
2. Complete G-Q020-2 provider capability/terms evidence without configuring production identity.
3. Complete G-Q020-3 all-in cost evidence. If the R100/month cap cannot be demonstrated, stop the authenticated persistence work and retain the anonymous static MVP.
4. Inspect and document G-Q020-4. The repository must contain a verified runnable implementation baseline before runtime tests can be claimed.
5. Freeze reviewed API/schema contracts and implement the G-Q020-5 tests with synthetic data.
6. Implement and exercise G-Q020-6 operational controls.
7. Pass traceability and release review, then seek separate authorization before provisioning or deployment.

## Stop conditions

- Any unclear legal/minor-processing requirement: no real learner data.
- Provider capability or deletion/retention behavior not demonstrated: no authenticated persistence.
- Forecast exceeds or cannot prove compliance with R100/month: defer authenticated persistence/features; do not provision.
- Missing runtime, test evidence, or unresolved cross-account/privacy failure: do not pass implementation readiness.
- Never use production accounts or real learner information as a test fixture.
- Never claim a target retention period is a legal entitlement, provider guarantee, or achieved outcome without evidence.

## Gate exit decision

**Q-020 implementation readiness: NOT PASSED.** This gate plan becomes complete only when each prerequisite has linked, dated evidence and an explicit pass/conditional-pass decision. Checklist completion alone is not evidence of compliance or correct runtime behavior.
