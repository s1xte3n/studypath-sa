# G-SYN-001 — Synthetic-Only MVP Verification Gate

**Status:** OPEN — current repository and CI evidence reviewed; acceptance criteria remain partially satisfied and the gate is NOT PASSED.
**Last evidence review:** 2026-10-18
**Latest repository baseline reviewed:** `6c91b5f9eabbdd07316f92eac876c6f8f5cd41d4` (main; PR #137 merge)
**Scope:** Local, synthetic-only browser demo. This gate does not approve real learner-data processing, legal compliance, Azure provisioning, production identity, persistent profiles, public deployment, or paid services.

## Objective

Deliver the smallest runnable student journey that can be tested end-to-end without processing real learner information or introducing unapproved recurring costs. The demo must not require a login or transmit learner inputs/results/tracker entries. Catalogue requests, if introduced later and separately approved, may contain public catalogue data only.

## Current repository baseline and evidence

The current `main` commit reviewed is `6c91b5f9eabbdd07316f92eac876c6f8f5cd41d4` (PR #137 merge). The earlier `e3564527b48dc0ca3cb55d4c208da5dc620b23ff` inspection and the `6a6099f10f5957ef0e7e0c87fed058af172921f3` CI snapshot below are historical and must not be used to describe the current tree.

Current repository artifacts include:

- React/Vite application entry point: `src/main.jsx`; responsive styles: `src/styles.css`.
- Dependency manifest and lockfile: `package.json` and `package-lock.json`.
- Student-entry validation: `src/domain/student-input-validation.mjs`.
- Deterministic UJ 2027 evaluator: `src/domain/eligibility/uj-2027-evaluator.mjs`.
- Local catalogue handler: `src/api/local-catalogue-handler.mjs`.
- Browser tests: `tests/e2e/student-form.spec.mjs`; Playwright configuration: `playwright.config.mjs`.
- Unit/domain/API/contract tests and UJ eligibility golden-case fixtures.
- Five workflows: browser E2E/privacy/accessibility, browser MVP build, contract tests, OpenAPI validation, and UJ eligibility golden-case verification.

Historical CI snapshot — all five workflows passed on commit `6a6099f10f5957ef0e7e0c87fed058af172921f3` on 2026-10-17 (not the current main baseline):
- [Browser E2E, privacy and accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654154)
- [Browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654225)
- [Contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654207)
- [OpenAPI validation](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654244)
- [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654276)

These are remote CI results, not evidence that the assistant ran a clean local install or reproduced the tests locally. A local clone attempt was blocked by DNS resolution for `github.com`; no local test command is claimed to have run.

### What the current browser evidence establishes

The browser suite tests editable student-entry rows, basic input validation and reset; invalid-input announcements; a keyboard-focus assertion; an automated privacy check covering same-origin GET-only behavior, URL parameters, local/session storage, cookies, console output and reload reset; and an axe scan for critical/serious accessibility violations. The suite explicitly asserts that basic form validation does not calculate an eligibility result.

This is a useful baseline, but it does **not** establish the complete student journey from marks/interests to explainable pathway results and official next steps. The current privacy test does not evidence every requested channel and failure mode in SYN-004. A responsive CSS breakpoint is present, but a documented manual keyboard and narrow-viewport review was not found in the evidence reviewed.


## Latest browser privacy evidence — 2026-10-18

Reviewed PR #135 merge commit `9cde29ae3bb6c3d928c30549a35be9c4fe95f94e` on `main`, following merged PRs #132, #133 and #135. The earlier 2026-10-17 five-workflow list above is a historical snapshot for commit `6a6099f10f5957ef0e7e0c87fed058af172921f3`; it is not the latest repository baseline.

- [PR #132 — Expand synthetic-only browser lifecycle privacy tests](https://github.com/s1xte3n/studypath-sa/pull/132) added assertions that transient learner entries do not appear in local/session storage, cookies, IndexedDB, Cache API, a fresh tab, or after reload.
- [PR #133 — Instrument additional synthetic-only browser privacy channels](https://github.com/s1xte3n/studypath-sa/pull/133) added test-only instrumentation for fetch, XHR, sendBeacon, WebSocket, history mutations, window errors and unhandled promise rejections, plus checks against sentinel values in the observed channels. The test blocks non-local HTTP requests and external WebSocket construction in its test context.
- PR #132/#133 browser privacy instrumentation remains the current coverage baseline. PR [#135](https://github.com/s1xte3n/studypath-sa/pull/135) fixed a false positive in `tests/e2e/student-form.spec.mjs`: the generic marker `93` could match an unrelated Vite asset URL, so the marker was changed to `learner-privacy-sentinel-7f4a2d`; the separate synthetic mark remains `93` and its exact-value leakage checks remain.
- All four PR #135 workflow runs passed on head commit `973f5c10e3a8b261639d0c9c219e63532c92c6d5`: [browser E2E/privacy/accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39119250982), [browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39119250960), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39119250884), and [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/39119250985). These runs were associated with the PR head; the workflow-run lookup returned no merge-commit workflow runs for `9cde29ae3bb6c3d928c30549a35be9c4fe95f94e`, so do not describe them as merge-commit CI.

These tests improve selected browser-context evidence only. They do not establish host/provider logs, browser behavior outside the instrumented context, external analytics or telemetry not exercised by the tests, legal compliance, complete privacy safety, or release readiness. No local test run, Azure provisioning, deployment, or real learner-data processing is claimed. The gate remains **OPEN / NOT PASSED**.

## Latest main-branch baseline — 2026-10-18 (PR #137 merge)

Reviewed current `main` commit `6c91b5f9eabbdd07316f92eac876c6f8f5cd41d4`, the merge commit for [PR #137 — Add narrow mobile viewport regression coverage](https://github.com/s1xte3n/studypath-sa/pull/137). The working tree is not available through this remote repository inspection, and no clean local install or local test run is claimed.

Four GitHub Actions workflows completed successfully on this exact main merge commit:
- [Browser E2E, privacy and accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39120290042) — job `Chromium learner journey, privacy and accessibility`, success.
- [Browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39120290021) — job `Install, test and build browser MVP`, success.
- [Contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39120290039) — job `Node.js contract tests`, success.
- [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/39120290056) — job `verify`, success.

PR #137 adds an automated 320px viewport regression test for form visibility, horizontal overflow, control bounds and keyboard focus. This is automated coverage, not a documented manual responsive/accessibility review. The OpenAPI validation workflow is path-filtered to `docs/api/**`, `tests/contracts/**`, and its own workflow file; PR #137 did not change those paths, so no OpenAPI run was expected for this commit and none is claimed.

The current UI remains a basic subject/mark-entry form. `src/main.jsx` calls `validateStudentEntries` and explicitly states that pathway matching is not enabled; the separate evaluator in `src/domain/eligibility/uj-2027-evaluator.mjs` is not integrated into the learner-facing flow. Thus the latest CI improves confidence in the current scaffold but does not close SYN-002 or the full G-SYN-001 gate. The privacy test suite covers selected browser channels and lifecycle checks; unexercised failure paths, host/provider logs, external telemetry and behavior outside the instrumented browser context remain unverified. The current privacy test defines `learnerMarker` but does not enter that value into any UI field; assertions against that marker are therefore vacuous. The test does exercise the actual entered subject (`Mathematics`) and mark (`93`). Treat only those entered values as exercised sentinels until the test is corrected or its scope is explicitly limited. 

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

## Traceability and current evidence assessment

| Requirement | Test IDs | Current implementation/evidence | Status |
|---|---|---|---|
| REQ-CAT-001 — curated catalogue and provenance | SYN-002, SYN-003, SYN-008 | Local catalogue handler exists; source-backed publication-ready programme records and curator sign-off remain outstanding. | Partial; catalogue publication blocked |
| REQ-ALT-001 — verified alternatives/relationships | SYN-002, SYN-008 | Handler integrity checks exist, but approved relationship pairs and learner-facing alternatives are not established. | Not passed |
| REQ-DET-001 — pathway detail and official next steps | SYN-002, SYN-006, SYN-008 | Complete result/detail/official-next-step journey is not established in the current browser suite. | Not passed |
| REQ-UX-001 — accessible mobile-first experience | SYN-006 | Responsive CSS and automated axe checks exist; documented manual keyboard and narrow-viewport review not found. | Partial |
| REQ-EXP-001 — anonymous input and results | SYN-002, SYN-005, SYN-006 | Student-entry form and validation exist; tests explicitly assert no eligibility result is calculated by the basic form. | Partial |
| REQ-MAT-001 — deterministic eligibility and uncertainty | SYN-002, SYN-003 | `src/domain/eligibility/uj-2027-evaluator.mjs` and golden-case tests exist; evaluator-to-UI integration and reviewed 20+ case zero-false-positive release evidence remain outstanding. | Partial |
| REQ-PRV-001 / NFR-PRV-001 — memory-only synthetic exploration | SYN-004, SYN-005 | Browser suite instruments fetch, XHR, sendBeacon, WebSocket, history, window errors and unhandled rejections, and checks selected storage/cookie/reload/fresh-tab behavior; provider logs, external analytics/telemetry and unexercised browser/platform paths remain outside the evidence. | Partial |
| REQ-APP-001 — manual tracker, session-only | SYN-005 | No verified tracker journey/reset evidence in the current browser suite. | Not passed |
| REQ-FUND-001 — P1 funding pilot | SYN-002, SYN-005, SYN-008; T-FUND-001–006 | Funding candidates remain research-only until 3–5 records have complete current official-source rules and curator approval. | Blocked |
| NFR-SEC-001 — secrets/input/transport boundary | SYN-009 | Manifest, lockfile and CI are present; a full security/dependency/hosting boundary review is not established by the cited workflows alone. | Partial |
| NFR-DATA-001 — sourced eligibility claims | SYN-002, SYN-003, SYN-008 | Evaluator and catalogue code exist; complete learner-facing provenance and official next steps are not verified. | Partial |
| NFR-REL-001 — honest recoverable failures | SYN-006 | Browser suite covers invalid input; complete loading, empty and runtime-failure states are not established. | Partial |
| NFR-ACC-001 — accessibility | SYN-006 | Automated axe scan and keyboard-focus assertion passed in CI; manual review remains outstanding. | Partial |
| NFR-PERF-001 — matching p95 target | SYN-002 plus T-PERF-001 | No benchmark protocol/device/result evidence reviewed. | Not passed |
| NFR-COMP-001 / NFR-SCOPE-001 — no guarantees and bounded pilot | SYN-002, SYN-008 | Full learner-facing result copy and source disclosures have not been reviewed as a complete journey. | Not passed |
| SYN-001, SYN-007 — reproducibility and CI | SYN-001, SYN-007 | Lockfile/build/test setup exists; all four PR #135 workflows passed on its head commit. No workflow runs were returned for the merge commit, and local reproduction was not run. | Partial / PR-head CI passed |
| SYN-009, SYN-010 — scope and documentation | SYN-009, SYN-010 | No deployment/provisioning is claimed; project docs are being reconciled by this change. | Partial until review/merge |

**Traceability boundary:** P1 funding remains gated on 3–5 verified records and must be omitted/disabled rather than fabricated until that gate passes. The rows above add requirement-to-SYN mappings only; they do not imply implementation or test evidence.

## Required next actions

1. Complete the core browser journey from synthetic inputs to explainable, deterministic pathway results and official-source next steps, or explicitly revise scope through change control.
2. Expand privacy instrumentation and tests to cover all applicable SYN-004 channels and error paths; ensure test reports do not echo sentinel payloads.
3. Add reset/reload/fresh-tab assertions for every implemented transient result, funding state and tracker entry.
4. Record manual keyboard/focus and narrow-viewport checks; verify visible limitations, provenance and no-guarantee language in the full journey.
5. Preserve the reviewed golden-case evidence, including the requirement for zero false-positive `ELIGIBLE` results; verify the required case count and oracle review before release.
6. Run a clean local install/build/test when network access is available and record exact commands/results. Keep remote CI results separately identified.
7. Update traceability and the artifact index to the reviewed commit, then reassess each SYN criterion with evidence links.

## Current gate decision

**G-SYN-001: NOT PASSED.** PR #135's four PR-head workflows passed, but the merge-commit workflow lookup returned no runs. Current code and CI materially advance the baseline. However, the core pathway journey, full privacy channel/failure coverage, tracker/result lifecycle assertions, manual accessibility/responsive evidence, local reproducibility evidence and complete provenance/limitations review are not all established. Continue with synthetic data only. Do not treat documentation updates or green CI as proof of privacy safety, admission correctness, public-demo readiness or release approval.
