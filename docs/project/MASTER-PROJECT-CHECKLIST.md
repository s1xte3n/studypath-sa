# StudyPath SA — Master Project Checklist

**Last updated:** 2026-10-14  
**Repository:** https://github.com/s1xte3n/studypath-sa  
**Current phase:** Phase 1 — PRD and requirements planning  
**Current gate:** `PROJECT READY` — **PASSED for Phase 1 planning only**

## Gate status at a glance

| Phase | Exit gate | Evidence-based status | Checklist disposition |
|---|---|---|---|
| 0 — Project State | `PROJECT READY` | **PASSED on 2026-10-13 for Phase 1 planning only.** Scope, constraints, key decisions and high-impact risks are documented. Owner-supplied command output dated 2026-10-14 shows a clean local `main` branch matching `origin/main` (`0 0` divergence). Owner confirms the app has not been deployed. Azure account-specific checks remain owner-attested, not independently inspected. | **Complete for the Phase 1 planning gate. Do not label Phase 0 “in progress.”** Keep Azure/Sonke evidence limitations visible; deployment is a known not-deployed state and must be addressed at later delivery/release gates. |
| 1 — PRD | `PRD READY` | Not verified; PRD and measurable acceptance criteria have not been approved. | Not complete |
| 2 — Requirements | `REQUIREMENTS READY` | Not verified; requirements matrix and traceability are not yet approved. | Not complete |
| 3 — Architecture | `ARCHITECTURE READY` | Proposed baseline exists; architecture approval and implementation are not verified. | Not complete |
| 4 — API / Interface Contract | `CONTRACT READY` | Initial endpoint inventory exists; complete, approved contract is not verified. | Not complete |
| 5 — Environments | `ENV READY` | Not verified; environment and configuration inventory is not established as complete. | Not complete |
| 6 — Test Strategy | `TEST READY` | Not verified; approved test strategy and mapped test cases are not established. | Not complete |
| 7 — Implementation | `IMPLEMENTATION READY` | Not verified; no application implementation has been verified. | Not complete |
| 8 — Quality | `QUALITY READY` | Not verified; test, security, accessibility and quality evidence is not available. | Not complete |
| 9 — Delivery | `DELIVERY READY` | Not verified; CI/CD and infrastructure validation evidence is not available. | Not complete |
| 10 — Release | `RELEASE READY` | Not verified; deployment, smoke tests, rollback and release evidence are not available. | Not complete |
| 11 — Change Control | `CHANGE CONTROLLED` | Not verified; change-control evidence is not established. | Not complete |

## Phase 0 — Project State gate checklist

- [x] Purpose, primary users and MVP direction documented.
- [x] Scope boundaries and key exclusions documented.
- [x] Budget cap and no-provisioning-without-resource-specific-cost-review rule recorded.
- [x] Synthetic-data-only and privacy guardrails recorded.
- [x] Eligibility states and `UNKNOWN` behaviour for missing/ambiguous requirements recorded.
- [x] High-impact risks, owner-attested items and unresolved evidence limitations documented.
- [x] Repository identity, visibility, default branch, initial root listing and README inspected remotely.
- [x] Phase 0 decision records and public-source evidence reviewed and recorded.
- [x] Project owner approved the six recorded decision directions.
- [x] Gate decision recorded: **PROJECT READY — PASSED for Phase 1 PRD/requirements planning only.**
- [x] Local working-tree status and local/remote commit comparison checked using owner-supplied command output (2026-10-14); assistant did not directly inspect the local filesystem.
- [ ] Azure account-specific evidence independently inspected by the assistant or another reviewer.
- [ ] Application code, tests, CI/CD and infrastructure verified.
- [x] Deployment state established from owner confirmation: not deployed; no live deployment to verify.

The unchecked items above are **evidence limitations or downstream implementation/release work**, not a reason to rewrite the recorded Phase 0 gate as “in progress.” The local Git caveat is closed based on owner-supplied command output; Azure/Sonke evidence limitations remain. Deployment is confirmed not to exist yet, so implementation, delivery and release work remains ahead. Do not infer that missing evidence proves an external artifact does not exist.

## Phase 1 — PRD gate checklist

- [ ] Define the target user problems and primary student journey.
- [ ] State MVP scope, non-goals and constraints.
- [ ] Define measurable acceptance criteria and success measures.
- [ ] Define supported input fields, validation and reset behaviour.
- [ ] Specify explainable pathway results and `ELIGIBLE`, `NOT_ELIGIBLE`, `UNKNOWN` semantics.
- [ ] State official-source/provenance requirements and catalogue limitations.
- [ ] Specify accessibility, privacy, error, empty and loading states.
- [ ] Record risks, assumptions and unresolved product decisions.
- [ ] Obtain explicit PRD approval before treating Phase 1 as complete.

## Remaining phase gates

Do not mark a phase complete just because a document exists. Confirm that its required artefacts are reviewed/approved and that evidence is recorded.

- **Phase 2 — Requirements:** map each requirement to acceptance criteria, UI/API contract, test ID, implementation, CI result and release evidence.
- **Phase 3 — Architecture:** approve the architecture, data flows, trust boundaries, key decisions and deployment model.
- **Phase 4 — API/interface contract:** define and approve schemas, validation, errors, authentication/authorisation where applicable, and versioning.
- **Phase 5 — Environments:** document configuration, secret handling, environment separation, access and cost controls; never commit secrets.
- **Phase 6 — Test strategy:** map unit, integration, contract, accessibility, security, regression and end-to-end tests to requirements.
- **Phase 7 — Implementation:** implement only approved scope; keep matching deterministic and explainable.
- **Phase 8 — Quality/security:** record actual test and scan commands/results; verify privacy boundaries and cross-user isolation if any identity/persistence is later approved.
- **Phase 9 — Delivery:** validate CI/CD and infrastructure changes before applying them; obtain approval before billable or destructive operations.
- **Phase 10 — Release:** verify deployed version, smoke tests, rollback, monitoring, privacy notice and release approval.
- **Phase 11 — Change control:** record proposed changes, impact analysis, approval, traceability updates and regression evidence.

## Evidence and status rules

1. **Passed** means the specific named gate was met within its stated scope. It does not imply later gates passed.
2. **Not verified** means there is insufficient evidence; it does not mean the item is necessarily absent.
3. Keep owner attestations distinct from independently inspected evidence.
4. Do not claim code changes, test runs, provisioning, deployment or submission unless actually performed and verified.
5. Keep the current status aligned across this checklist, `PROJECT-STATUS.md`, `PROJECT-OVERVIEW.md` and `ARTIFACT-INDEX.md`.
6. No Azure provisioning or real learner data is authorised by the Phase 0 planning gate.

## Next action

Proceed to **Phase 1 — PRD and measurable acceptance criteria**. Keep Phase 0 recorded as **PASSED for Phase 1 planning only**, with its evidence caveats retained.
