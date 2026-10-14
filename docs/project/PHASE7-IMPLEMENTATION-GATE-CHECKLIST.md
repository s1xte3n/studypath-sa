# Phase 7 — Implementation Gate Checklist

**Purpose:** Keep a traceable list of work that must be implemented and evidenced before the Phase 7 implementation gate can pass. This is a forward-looking checklist, not evidence that implementation has started or passed.

**Project-state warning:** The current project status document reports Phase 2 — requirements matrix and traceability, with `REQUIREMENTS READY` not passed. Phase 7 is the implementation stage in the project lifecycle, not the currently verified project phase. Do not mark Phase 7 active or passed until the earlier gates and status record are updated with evidence.

**Scope and safety constraints**
- Synthetic data only; no real learner data.
- No Azure provisioning or deployment without the required resource/cost review and explicit approval. Total spend cap remains R100/month.
- Learner inputs, eligibility results, and tracker entries remain in browser memory and must not be sent to APIs, URLs, analytics, application logs, client error telemetry, or unrelated third parties.
- The approved API-first direction does not freeze the draft API contract. Safe interim boundary: APIs may serve public curated programme/funding records only; matching remains client-side pending resolution of Q-018/OR-019.
- Do not treat candidate catalogue records as verified rules. Unverified or ambiguous material requirements must produce `UNKNOWN`; never produce a false-positive `ELIGIBLE`.

## A. Preconditions before Phase 7 implementation

These are earlier lifecycle gates and must be completed or explicitly dispositioned before dependent implementation is treated as approved.

- [ ] **Phase 2 — Requirements and traceability:** pass `REQUIREMENTS READY`; map every in-scope requirement to acceptance criteria, API/UI contract, test ID, implementation artifact, and evidence.
- [ ] Resolve P0 requirement gaps that affect correctness or architecture, including programme-rule/test-oracle gap GAP-001, privacy verification GAP-002, relationship provenance GAP-003, funding-record gap GAP-005, and runtime/API/privacy/cost question Q-018/OR-019.
- [ ] **Phase 3 — Architecture:** confirm runtime composition and client/server responsibilities; document network destinations, data flows, trust boundaries, failure behavior, hosting/provider metadata and retention assumptions.
- [ ] **Phase 4 — API/interface contracts:** review and approve the versioned `/api/v1` contract before dependent API integration. Confirm routes, schemas, validation, errors, cache/freshness semantics, timeouts and permitted public catalogue fields. Keep learner data out of requests.
- [ ] **Phase 5 — Environments/configuration:** document local/test/production configuration, safe defaults, allowed origins/destinations, secrets policy, and budget/resource assumptions. No secrets in source or client bundles.
- [ ] **Phase 6 — Test strategy:** approve unit, integration/contract, browser E2E, privacy, accessibility, performance, security, regression and release-verification plans with test IDs and acceptance thresholds.
- [ ] Record any unresolved item as a blocker or explicit accepted limitation with an owner and resolution point. Do not silently treat assumptions as approvals.

## B. Phase 7 implementation work

### B1. Runnable application and core student journey

- [ ] Add a reproducible app scaffold consistent with the approved architecture and existing repository conventions; include pinned dependencies/lockfile and documented local run/build commands.
- [ ] Implement a responsive, accessible anonymous journey for Grade 11, Grade 12 and recent matric graduates.
- [ ] Implement subject selection using stable canonical IDs and an explicitly maintained alias list; normalize case/whitespace only as approved. Reject duplicate canonical subjects and unsupported or malformed input clearly.
- [ ] Validate marks as whole-number percentages from 0–100 inclusive; reject decimals, malformed values, missing values and out-of-range values without rounding or silently substituting zero.
- [ ] Implement field-associated validation, loading, empty, recoverable error and reset states; support keyboard use and visible focus.
- [ ] Keep all learner-entered values/results in page memory only. Reset clears the in-memory profile, results, funding selections and tracker entries; reload/exit must not restore them.
- [ ] Do not add accounts, profile persistence, local/session storage, IndexedDB, profile cookies, uploads, AI document assistance, cost planning or application submission; these are outside the approved MVP.

### B2. Deterministic, explainable eligibility and matching

- [ ] Implement the approved deterministic rules for `ELIGIBLE`, `NOT_ELIGIBLE` and `UNKNOWN`, including AND/OR groups, conditional requirements, missing/unsupported data, and unresolved/conflicting/stale source rules.
- [ ] Require complete, current, cycle-specific, curator-approved evidence for every applicable mandatory rule before returning `ELIGIBLE`.
- [ ] A verified mandatory failure yields `NOT_ELIGIBLE` only where the rule is mandatory and no applicable alternative satisfies it; material unknowns without a confirmed failure yield `UNKNOWN`.
- [ ] Separate eligibility from preference fit. Do not calculate a weighted numeric preference score or let interests/location/study mode upgrade eligibility.
- [ ] Explain which verified requirements passed/failed or remain unknown; state that this is minimum-requirement screening, not an admission decision or guarantee.
- [ ] Add a versioned synthetic golden set of at least 20 cases covering positive cases, mandatory failures, missing data, AND/OR/conditional rules, stale/conflicting sources and unsupported calculations.
- [ ] Run the golden suite and record evidence of full expected-classification agreement and **zero false-positive `ELIGIBLE` results**.

### B3. Curated programme and funding records

- [ ] Complete and curator-sign-off the 6–8 programme-record pilot, prioritising Gauteng; include only verified official-source evidence for the explicitly supported admission cycle.
- [ ] Resolve or safely quarantine source conflicts and rule gaps in `docs/product/UJ-2027-SOURCE-RECONCILIATION-MATRIX.md`. Research leads must not be consumed as authoritative eligibility rules.
- [ ] Every published programme rule includes institution/programme/requirement identifiers, official source title and URL, verification date, admission cycle, extracted conditions/exceptions, catalogue version and curator sign-off.
- [ ] Implement source-freshness checks/metadata and the policy to re-verify at least every 30 days and sooner after a source-announced change, deadline passing or cycle change.
- [ ] Curate and verify 3–5 official funding opportunities, including eligibility criteria, source, deadline/timezone as published, cycle, required-document checklist metadata, verification date, version, curator sign-off and expiry state.
- [ ] Missing or sensitive funding criteria remain unknown; show official provider links and no funding guarantee.
- [ ] Publish pathway relationships only when type, rationale, provenance, verification date and curator approval are recorded; articulation must have explicit official evidence.

### B4. Funding matching and manual application tracker

- [ ] Implement funding matching only with approved non-sensitive inputs and verified curated criteria; missing material criteria must not be guessed.
- [ ] Implement the approved tracker statuses and permitted transitions; terminal states are `ACCEPTED`, `REJECTED` and `WITHDRAWN`.
- [ ] Limit tracker fields to catalogue ID, status, optional manually entered submitted date and timestamps; no identity/contact details, profile snapshots, sensitive notes or documents.
- [ ] Keep tracker entries page-memory-only. Verify reset and reload/exit behavior; do not add persistence or cloud sync.

### B5. Privacy, security and network boundaries

- [ ] Implement automated browser privacy tests for all 12 controls in `docs/requirements/GAP-002-PRIVACY-VERIFICATION-PLAN.md`.
- [ ] Intercept `fetch`, XHR, `sendBeacon`, WebSocket and relevant navigation/network sinks; assert that synthetic sentinel profile, subject, interest and tracker values never appear in requests or URLs.
- [ ] Assert no profile persistence in localStorage, sessionStorage, IndexedDB, cookies or browser cache mechanisms controlled by the app.
- [ ] Assert no profile values leak through console output, thrown errors, client telemetry, analytics, referrers or third-party destinations.
- [ ] Exercise reset, reload/new-tab and failure/timeout paths, not only the happy path.
- [ ] Audit source for network, storage, logging and telemetry sinks; allowlist permitted destinations and document any technical metadata a hosting/provider may collect.
- [ ] Review actual hosting/provider settings, access logs, retention and privacy notice before public demonstration. Automated browser tests alone cannot prove provider-side logging/retention behavior.
- [ ] Keep development/test fixtures synthetic and ensure no secrets are committed or bundled into the client.

### B6. Accessibility, performance and failure handling

- [ ] Test at a minimum viewport of 320 CSS pixels and target WCAG 2.2 AA: labels, keyboard-only operation, visible focus, associated errors, contrast, non-colour-only status, responsive layout and loading/empty/error states.
- [ ] Test current stable Chrome, Edge, Firefox and Safari where available; record versions and disclose untested browsers.
- [ ] Measure in-browser matching p95 at or below 1 second for up to 100 catalogue records on a recorded test device/browser.
- [ ] For any approved network dependency, implement and test explicit timeout, retry, error and low-bandwidth behavior; never expose profile values in error messages or logs.

### B7. Automation and build reproducibility

- [ ] Add automated test scripts and CI workflow for install-from-lockfile, lint/static checks where configured, unit tests, contract tests, browser/privacy tests and production build.
- [ ] Ensure CI fails on test failures, build failures and privacy regression failures; publish actionable logs without learner data or secrets.
- [ ] Verify a clean checkout can install, test and build using documented commands.
- [ ] Record exact CI run/commit evidence; do not describe a test as passed unless it ran successfully.

## C. Required evidence to pass the Phase 7 gate

- [ ] Every in-scope requirement is traced: **Requirement ID → API/UI contract → Test ID → implementation path/commit → CI result → release evidence**.
- [ ] App starts locally from a clean checkout and the core synthetic student journey completes end to end.
- [ ] Unit, contract, integration and browser E2E tests pass; at least 20 golden eligibility cases pass with zero false-positive `ELIGIBLE`.
- [ ] All 12 GAP-002 privacy checks have recorded results; no runtime privacy claim is made while any required check is unrun or blocked.
- [ ] Accessibility and performance measurements are recorded against the approved thresholds, with limitations documented.
- [ ] Catalogue and funding records have source provenance, verification dates, admission/cycle applicability and curator sign-off; unresolved records are excluded from definitive eligibility.
- [ ] Security/source review and single-owner review evidence are recorded. Seek independent review before public learner use; if unavailable, document the limitation and do not claim independent assurance.
- [ ] Known defects, residual risks, exclusions and any accepted limitations are documented; no unresolved high-impact issue is hidden.
- [ ] Release checklist is completed. Deployment is a separate controlled step requiring approved resource/cost review, explicit provisioning approval, deployment verification and smoke-test evidence.

## D. Explicit non-evidence

The following do **not** pass the implementation gate by themselves:
- A PRD, architecture diagram or checklist without working code and test evidence.
- A successful HTTP 2xx response without contract and behavior assertions.
- A code review without execution of the relevant tests.
- Unit tests alone as proof of browser privacy or provider-side retention.
- Candidate catalogue values without authoritative rule verification and curator sign-off.
- A successful local build as proof of accessibility, security, deployment or release readiness.

## E. Current disposition

**Status: NOT PASSED / implementation evidence outstanding.** This checklist records required work; it does not claim that the application, automated privacy tests, CI, infrastructure or deployment exists or has been verified.

**Next action:** complete and pass the earlier requirements, architecture, API contract, environment and test-strategy gates; then implement in small reviewable changes and attach evidence to each traceability row. Keep the browser-only synthetic prototype as the safe implementation starting point if Q-018/OR-019 has not yet approved the final API contract.
