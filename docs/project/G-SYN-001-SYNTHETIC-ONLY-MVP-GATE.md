# G-SYN-001 — Synthetic-Only MVP Verification Gate

**Status:** OPEN — gate defined; runnable application and runtime privacy evidence are not yet established.
**Date:** 2026-10-15
**Base commit inspected:** `e3564527b48dc0ca3cb55d4c208da5dc620b23ff`
**Scope:** Build and verify a minimal local, browser-only StudyPath SA demo using synthetic data. This gate does not approve legal compliance, real learner-data processing, Azure provisioning, production identity, persistent profiles, or deployment.

## Objective

Deliver the smallest runnable student journey that can be tested end-to-end without processing real learner information or introducing unapproved recurring costs. The demo must not require a login or transmit learner inputs/results/tracker entries. Catalogue requests, if introduced later and separately approved, may contain public catalogue data only.

## Verified baseline at the inspected commit

The recursive GitHub tree at `e3564527b48dc0ca3cb55d4c208da5dc620b23ff` contains:

- Deterministic eligibility evaluator: `src/domain/eligibility/uj-2027-evaluator.mjs`.
- Golden-case and evaluator tests: `tests/uj-2027-eligibility-ci-final.test.mjs`, `tests/uj-2027-eligibility-golden-cases.test.mjs`, plus test fixtures.
- Two GitHub Actions workflows: `.github/workflows/contract-tests.yml` and `.github/workflows/uj-eligibility-golden-case-verification.yml`.
- Product, requirements, architecture, and privacy-verification documentation.

The inspected tree did **not** show a root `package.json`/lockfile, app entry point, frontend UI, browser-test harness, API implementation, or deployment/infrastructure code. This is a statement about the inspected default-branch tree, not every external system or branch. The current workflows invoke Node's test runner directly; a passing domain test does not establish a working UI or runtime privacy.

## Scope for this gate

### Allowed

- A local, runnable, mobile-first browser demo with deterministic client-side matching.
- Synthetic example profiles and synthetic sentinel values only.
- A clearly labelled demo catalogue. Do not represent unresolved or unapproved programme records as authoritative eligibility decisions.
- A manual application tracker that exists only in in-memory page state and can be cleared.
- Local development and CI tests using synthetic fixtures.

### Explicitly deferred

- Real learner data, including real marks, names, contact details, ID numbers, documents, or identifiable tracker entries.
- Login, production identity configuration, authenticated matching, profile persistence, saved accounts, database writes, cloud sync, uploads, AI extraction/chat, and application submission.
- Azure provisioning, public deployment, paid services, custom domains, or changes that could breach the hard total spend cap of R100/month.
- Any claim that the app is legally compliant or that independent South African privacy/legal review has occurred.

This is a temporary scope reduction, not a conclusion that privacy law does not apply. Before a public demo, separately review hosting/provider metadata, request logs, cookies, telemetry, third-party assets, privacy notice accuracy, and any other processing introduced by the actual deployment. Do not publish until the demo boundary and hosting behavior are verified.

## Gate exit criteria

All applicable items must pass on one reviewed commit; documentation alone does not satisfy them.

| ID | Acceptance criterion | Required evidence |
|---|---|---|
| SYN-001 | Reproducible local app setup, build, and test commands exist; dependencies are locked and justified. | Exact commands, runtime version, lockfile, clean install/build/test result. |
| SYN-002 | Core learner journey runs from synthetic inputs to explainable results and official-source next steps. | Browser end-to-end test; source/record provenance; honest `ELIGIBLE`, `NOT_ELIGIBLE`, or `UNKNOWN` behavior. |
| SYN-003 | Incomplete/unapproved catalogue data cannot produce false-positive `ELIGIBLE` results. | Deterministic tests; zero false-positive `ELIGIBLE` outcomes across the reviewed golden set; unresolved rules produce `UNKNOWN`. |
| SYN-004 | Synthetic sentinel values never enter network requests, URLs/history, browser storage, cookies, logs, console output, analytics, telemetry, or third-party destinations. | Automated browser instrumentation and reports that do not echo sentinel payloads. Test fetch/XHR, beacon, WebSocket, navigation, local/session storage, IndexedDB, Cache API, cookies, history, console, and error paths where applicable. |
| SYN-005 | Reset clears all current input, results, funding state, and tracker entries. Reload/new tab does not restore them. | Automated browser assertions before/after reset, reload, and fresh-tab scenarios. |
| SYN-006 | Loading, empty, invalid-input, and failure states are understandable and accessible; primary journey works by keyboard and on a narrow viewport. | Automated checks plus documented manual keyboard/focus and responsive checks. |
| SYN-007 | CI runs the relevant deterministic tests, privacy tests, and production build on pull requests. | Successful workflow run URL and commit SHA. A contract-only pass is insufficient. |
| SYN-008 | Demo limitations and data status are visible; no admission or funding guarantee is implied. | Reviewed UI copy and source links; unverified records clearly labelled or excluded. |
| SYN-009 | No unapproved infrastructure, secrets, or recurring services are introduced. | Diff review and repository scan; no provisioning/deployment action; cost-impact statement. |
| SYN-010 | Interim scope, open risks, and evidence links are reflected in project status and artifact index. | Updated source-of-truth documentation tied to the reviewed commit. |

## Traceability

| Requirement | Test IDs | Implementation | CI evidence | Release evidence |
|---|---|---|---|---|
| REQ-CAT-001 — curated catalogue and provenance | SYN-002, SYN-003, SYN-008 | Curated synthetic fixtures and source metadata; publication-ready real records remain a separate catalogue gate | Not available | Not available |
| REQ-ALT-001 — verified alternatives/relationships | SYN-002, SYN-008 | Not yet established for UI; do not display unverified relationship pairs | Not available | Not available |
| REQ-DET-001 — pathway detail and official next steps | SYN-002, SYN-006, SYN-008 | Not yet established for UI | Not available | Not available |
| REQ-UX-001 — accessible mobile-first experience | SYN-006 | Not yet established for UI | Not available | Not available |
| REQ-EXP-001 — anonymous input and results | SYN-002, SYN-005, SYN-006 | Not yet established for UI | Not available for UI | Not available |
| REQ-MAT-001 — deterministic eligibility and uncertainty | SYN-002, SYN-003 | `src/domain/eligibility/uj-2027-evaluator.mjs` | Existing workflow must be checked against current commit; no runtime UI claim | Not available |
| REQ-PRV-001 — memory-only synthetic exploration | SYN-004, SYN-005 | Browser implementation not yet established | Privacy suite not yet present/verified | Not available |
| REQ-APP-001 — manual tracker, session-only | SYN-005 | UI implementation not yet established | Not available | Not available |
| REQ-FUND-001 — P1 funding pilot | SYN-002, SYN-005, SYN-008 when enabled; T-FUND-001–006 | Keep omitted/disabled until 3–5 current official-source records are curated; any transient state must clear under SYN-005 | Not available | Not available |
| NFR-SEC-001 — secrets/input/transport boundary | SYN-009 | Build/dependency and network boundary not yet established | Not available | Not available |
| NFR-DATA-001 — sourced eligibility claims | SYN-002, SYN-003, SYN-008 | Not yet established for full UI journey | Not available | Not available |
| NFR-REL-001 — honest recoverable failures | SYN-006 | Not yet established for UI | Not available | Not available |
| NFR-ACC-001 — accessibility | SYN-006 | Not yet established for UI | Not available | Not available |
| NFR-PERF-001 — matching p95 target | SYN-002 plus T-PERF-001 | Benchmark protocol/device/result not recorded | Not available | Not available |
| NFR-PRV-001 — no profile persistence/telemetry | SYN-004, SYN-005 | Browser privacy harness not yet established | Not available | Not available |
| NFR-COMP-001 — no guarantees | SYN-002, SYN-008 | UI copy not yet reviewed | Not available | Not available |
| NFR-SCOPE-001 — bounded pilot/no national claim | SYN-008 | UI scope disclosure not yet established | Not available | Not available |
| NFR — accessibility, reproducibility, evidence | SYN-001, SYN-006, SYN-007, SYN-010 | Not yet established for UI | Not available | Not available |

**Traceability boundary:** P1 funding remains gated on 3–5 verified records and must be omitted/disabled rather than fabricated until that gate passes. The rows above add requirement-to-SYN mappings only; they do not imply implementation or test evidence.

## Required sequence

1. Confirm the approved requirement/contract baseline and keep `REQUIREMENTS READY` status truthful.
2. Add the smallest browser-only app shell and synthetic fixtures; do not add APIs or persistence merely to make the demo appear complete.
3. Add browser privacy canaries and end-to-end tests before claiming the memory-only boundary.
4. Wire the tests and build into CI, then inspect the actual run results for the commit.
5. Perform a focused accessibility, source-provenance, dependency, and hosting-boundary review.
6. Record passed/failed/blocked items and obtain explicit review before any public deployment.

## Current gate decision

**G-SYN-001: NOT PASSED.** The gate is defined and the repository baseline has been inspected, but the learner-facing app, browser-level privacy tests, build evidence, and runtime verification are not established. Continue using synthetic fixtures only. Do not infer privacy safety from absence of a UI, a documentation checklist, or a passing domain/contract test.
