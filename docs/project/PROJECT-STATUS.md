# StudyPath SA — Project Status

**Status:** Phase 0 — Discovery in progress  
**Gate:** `PROJECT READY` — **BLOCKED / NOT PASSED**  
**Last updated:** 2026-10-13

## Verified repository state
- Repository: https://github.com/s1xte3n/studypath-sa
- Visibility: private; default branch: `main`.
- Connected GitHub integration reports admin, read and write permissions.
- Initial root listing contained `README.md` only; README content is a project title and one-line description.
- Phase 0 baseline documentation was merged to `main` in PR #1.
- Accepted Phase 0 decision updates were merged to `main` in PR #2 (merge commit `9c5aaa8c3b6743f48308fc77d1ac1c0366844423`).
- This is a remote repository inspection. Local working-tree state has not been inspected.

## State by area

| Area | Status |
|---|---|
| Product specification, hackathon programme, development SOP | Supplied as project references; programme details still need to be checked against deliverable planning |
| Documented React/Vite + Azure stack | Owner-confirmed baseline; not provisioned/validated |
| Application source and dependencies | Not found in initial root listing; no implementation verified |
| Tests, CI workflows, infrastructure, database, deployment | Not yet verified; none shown in initial root listing |
| MVP journey | Direction accepted: anonymous learner journey from subject/mark/interest inputs to explainable pathways, eligibility/uncertainty and official next steps |
| Initial catalogue strategy | Direction accepted: small, manually curated official-source catalogue; source inventory and operating details outstanding |
| Budget | R100/month hard cap accepted; service-by-service cost/quotas/overage feasibility not verified |
| Privacy and identity | Synthetic data/minimisation and anonymous-first direction accepted; data-handling review and persistence boundary details remain |
| Azure subscription and accountable owners | Not confirmed; names and access evidence outstanding |

## Completed
- Confirmed repository identity, private visibility, default branch and integration permissions.
- Inspected the root listing and README.
- Created and merged Phase 0 baseline documentation in PR #1.
- Recorded and merged owner decisions for MVP direction, curated data strategy, hard budget cap, privacy/data minimisation, anonymous-first exploration, no provisioning before ownership/cost checks, and need for named team responsibilities in PR #2.
- Re-fetched the updated Phase 0 documents from `main` after PR #2 merged.

## Remaining P0 blockers
1. Produce the initial official-source catalogue plan: source URLs, permitted use, initial catalogue scope, curator, verification cadence and provenance.
2. Confirm Azure subscription/tenant availability, access permissions and accountable cloud owner.
3. Document service-by-service price, quotas and overage checks against the R100/month cap; establish cost controls before any provisioning.
4. Record the learner data inventory and purpose, privacy/consent review where applicable, retention/deletion and incident-handling approach; keep synthetic data only until approved.
5. Name the accountable product approver and product, data/catalogue, cloud, security/privacy and release/demo owners.
6. Review the hackathon programme for team eligibility and mandatory deliverables; this remains a Phase 0 validation item.

## Resolved in principle
- MVP journey and key exclusions (Q-001).
- Anonymous exploration first; defer cross-session saves and manual tracking (Q-006).
- Start with a small manually curated official-source catalogue rather than assuming live integrations are mandatory (Q-007).

These decisions set direction but do not by themselves provide the operational evidence needed to pass the gate.

## Evidence limitations
Only repository metadata, the root listing and README were inspected for the initial baseline. No application tests, build, security scan, cloud resource, deployment or CI run has been performed or verified. The absence of files in the initial root listing is not a complete audit of every possible branch or historical commit. Cost, privacy, source-permission and subscription checks are not yet evidenced.

## Next gate
Finish the remaining P0 evidence and named ownership, approve the Phase 0 artifacts, and explicitly record PROJECT READY approval before starting PRD work. No application implementation or cloud provisioning is authorised by this documentation change.
