# StudyPath SA — Hackathon Implementation Handoff

**Date:** 2026-10-21  
**Delivery mode:** Hackathon MVP; production hardening is explicitly post-event.  
**Decision authority:** D-054 and the approved product requirements, architecture, API contract, acceptance criteria, and G-SYN-001 boundary.  
**Status:** Implementation instructions frozen; product implementation and G-SYN-001 remain NOT PASSED.

## 1. Goal and definition of done

Deliver one working browser journey that can be shown reliably to judges:

1. Open the React/Vite app without an account.
2. Select study stage and enter supported subjects and whole-number marks.
3. Reject missing, malformed, duplicate, unsupported, decimal, negative, and over-100 values with clear accessible feedback.
4. Evaluate only against supported deterministic rules and approved local fixtures.
5. Render ELIGIBLE, NOT_ELIGIBLE, or UNKNOWN with reasons, missing-data caveats, and source/provenance details where available.
6. Explain official next steps without implying admission or funding is guaranteed.
7. Reset the journey and demonstrate that learner-entered data is not persisted or transmitted.
8. Run documented local start, test, and build commands successfully; verify the critical journey in a browser at desktop and narrow mobile width.
9. Produce the judge materials listed in HACKATHON-SUBMISSION-CHECKLIST.md.

A feature is not done because the form validates, an endpoint returns 2xx, or a remote CI badge is green. The learner-facing journey and business outcomes must be verified.

## 2. Approved scope and explicit exclusions

### P0 — required for the demo

- Existing React/Vite interface and accessible subject/mark validation.
- Deterministic evaluator integration with the UI; do not duplicate eligibility logic in presentation components.
- A bounded catalogue using existing approved evaluator fixtures. Each real-world requirement displayed as authoritative must have a source URL/name, applicable cycle, checked date, verification/publication state, and curator sign-off. If evidence is absent, label the item synthetic/demo or show UNKNOWN; never guess.
- Clear result states, explanations, detail view, empty/error states, source links, and next steps.
- Verified alternatives only; when no reviewed relationship exists, say no verified alternative is available.
- In-memory-only learner inputs, results and tracker state; reset clears current state. No learner-specific data in URLs, storage, cookies, logs, analytics, telemetry, or network requests.
- Keyboard and screen-reader usable forms/results, visible focus, responsive layout at 320px and larger, browser tests, unit tests, build, and demo rehearsal.
- Clear disclosure that the catalogue is bounded and this is not an admissions decision.

### P1 — only after P0 is stable

- Funding matches only if reviewed official-source records and complete acceptance criteria are available.
- Page-memory-only manual tracker only if P0 is stable and status-transition criteria can be tested in time.
- Do not fabricate catalogue breadth to make the demo look complete.

### Out of scope for this event's critical path

- Azure provisioning or deployment; hosted API runtime/provider decisions; API Management; public endpoint exposure.
- Authentication, real learner data, saved profiles, durable persistence, cross-device sync, uploads, AI advice/extraction, direct application submission.
- Production abuse controls, compliance claims, backup/restore certification, production SLOs, or claims that the R100/month cloud budget is certified.

These exclusions are delivery sequencing, not permanent cancellation. Do not remove production gates or represent the local demo as production-ready.

## 3. Existing implementation baseline

Repository: s1xte3n/studypath-sa; default branch: main; use a short-lived feature branch and pull request.

Relevant paths identified in the repository:

- src/main.jsx — current React/Vite entry point and learner form. Current form only validates entries and explicitly does not calculate pathways.
- src/styles.css — responsive styles.
- src/domain/student-input-validation.mjs — student-entry validation.
- src/domain/eligibility/uj-2027-evaluator.mjs — deterministic UJ 2027 evaluator.
- src/api/local-catalogue-handler.mjs — local catalogue handler.
- tests/e2e/student-form.spec.mjs and playwright.config.mjs — existing browser tests/configuration.
- docs/product/REQUIREMENTS.md, docs/product/ACCEPTANCE-CRITERIA.md, docs/product/TRACEABILITY-MATRIX.md — requirement and acceptance source of truth.
- docs/project/G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md — current demo verification gate.
- docs/project/HACKATHON-IMPLEMENTATION-BASELINE.md — approved scope baseline.

Inspect evaluator input/output, fixtures and golden cases before modifying them. The existing evaluator must remain the only eligibility authority.

## 4. Implementation order (small vertical slices)

### Slice A — evaluator/UI contract

- Inspect evaluator input/output, fixture provenance, and golden cases.
- Define the smallest adapter between validated form state and evaluator input/output.
- Add unit tests for the adapter and UI-level tests for each eligibility state.
- Ensure invalid form data cannot reach the evaluator.
- Preserve the evaluator as the only eligibility authority.

**Acceptance:** a valid synthetic test profile produces the expected deterministic state and reasons; identical inputs produce identical results; incomplete or unsupported rules cannot produce a false-positive ELIGIBLE.

### Slice B — results and detail experience

- Add a result state after successful validation and evaluation.
- Show status, reasons, known/missing requirements, catalogue scope disclosure, source/provenance, and official next steps.
- Render absent or unverified evidence as unknown; do not invent an alternative.
- Add clear empty, failure, and retry/edit paths.
- Add reset that returns the app to its initial state and clears results.

**Acceptance:** all three eligibility states are understandable; every asserted requirement is traceable to evidence; no match is represented as guaranteed admission; reset returns to a clean state.

### Slice C — privacy and accessibility regression

- Extend existing Playwright tests to cover the actual results flow and reset lifecycle.
- Assert learner sentinel values do not appear in URL, browser storage, cookies, outbound request URLs/bodies, or application telemetry channels instrumented by the test.
- Cover keyboard operation, labels, validation announcements, result announcement, and 320px layout.
- Run the project's existing automated accessibility checks; manually keyboard-check the primary journey.

**Acceptance:** applicable tests pass, no new critical/serious automated accessibility findings are introduced, and no tested network/storage channel receives learner-specific data.

### Slice D — release-candidate rehearsal

- Run clean dependency installation, unit/domain/API/contract tests, browser E2E, and production build.
- Run the app from a fresh terminal using README instructions.
- Rehearse the exact judge journey using synthetic values; verify reset and reload behavior.
- Record actual command output, commit SHA, CI run links and known limitations. Unrun checks must be marked BLOCKED or NOT RUN.

**Acceptance:** documented steps reproduce the demo from a clean checkout; no external service is required for the critical journey; no P0 defect remains open.

## 5. Requirement-to-verification traceability

| Requirement / control | Implementation boundary | Verification expectation |
|---|---|---|
| REQ-EXP-001 / AC-EXP-001–014 | src/main.jsx, src/domain/student-input-validation.mjs | Required fields, whole-number marks 0–100 inclusive, malformed values, duplicate/unsupported subjects, accessible errors; no evaluation on invalid input |
| REQ-CAT-001 / AC-CAT-001–012 | Approved local catalogue/evaluator fixtures and source display | Every real-world requirement shown as verified has complete source/cycle/date/state evidence; otherwise disclose demo/unknown |
| REQ-MAT-001 / AC-MAT-001–021 | src/domain/eligibility/uj-2027-evaluator.mjs and adapter | Golden cases, boundary/missing-data tests, stable reasons, all three statuses, no false-positive eligibility |
| REQ-ALT-001 / AC-ALT-001–007 | Verified relationship data and result UI | Show only evidence-backed relationships; safe no-verified-alternative state |
| REQ-DET-001 | Results/detail UI | Sources, known requirements, unknown fields, official next steps and limitations are visible |
| Privacy / AC-NFR-001–005 | Page-memory state and browser test instrumentation | No learner data in URL/storage/cookies/network/log/telemetry; reset and reload lifecycle tested |
| Accessibility / responsive requirements | Form/results markup and styles | Keyboard-only critical journey, visible focus, labels/announcements, 320px browser regression |
| G-SYN-001 | Whole local demo | Fresh local start, applicable tests/build, browser walkthrough and recorded evidence |

The full canonical requirements and acceptance criteria remain authoritative. This table is the hackathon execution subset, not a replacement for the full traceability matrix.

## 6. Commands and evidence protocol

The repository currently declares these package scripts:

    npm ci
    npm test
    npm run build
    npm run dev

Run the existing Playwright/browser workflow using the exact repository instructions and installed browser dependencies; inspect package.json, playwright.config.mjs, and the workflows first rather than guessing a test command. Capture exit codes and failures. If a command cannot run because a dependency, browser, network, or environment is unavailable, mark it BLOCKED with the exact reason.

For every PR, report changed paths and requirement IDs; tests actually executed and exact outcomes; CI workflow links tied to PR head or merge commit; browser checks and viewport sizes; remaining failures, limitations and deferred controls.

## 7. Merge and demo gate

Do not merge or call the product hackathon-ready until:
- The valid learner journey reaches actual evaluator-backed results.
- All three eligibility states and critical validation boundaries are covered.
- Provenance and demo-data disclosure are honest.
- Privacy lifecycle tests cover the results flow, not just the entry form.
- Required unit/browser/build/contract workflows pass for the proposed changes.
- The primary journey is keyboard-operable and usable at 320px.
- A reviewer can follow the README start/reset instructions.
- Submission artifacts and a rehearsed demo are ready.

No cloud deployment is required or implied by this gate. Production readiness is a separate post-hackathon release decision.
