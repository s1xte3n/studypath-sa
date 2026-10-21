# StudyPath SA — Hackathon Implementation Baseline

**Purpose:** Freeze the smallest coherent, judge-ready product slice and its implementation boundaries before coding.
**Planning date:** 2026-10-21
**Hackathon:** FNB App of the Year Hackathon 2026; programme runs 23–25 October. The supplied programme says submission is due Monday, 26 October 2026 at 23:59 through Sonke.
**Status:** Scope direction approved by owner under D-054 on 2026-10-21; implementation and G-SYN-001 remain OPEN / NOT PASSED. This approval does not approve deployment or production readiness.
**Authority:** Owner direction in the project conversation on 2026-10-21: optimise for a hackathon-ready product in two days; production hardening follows after the hackathon. Existing approved PRD, requirements, acceptance criteria, architecture, and D-044–D-053 boundaries remain authoritative except for this explicitly scoped delivery priority.

## 1. Delivery objective

Build a polished, reliable, responsive web app that completes one credible student journey: a South African learner enters supported subjects and marks, receives deterministic and explainable pathway outcomes with uncertainty clearly represented, inspects official-source details, and understands what to do next.

This is a **hackathon demo target**, not a production launch. Prefer one complete, truthful journey over many incomplete features. The programme accepts web apps that receive and process data in real time; a static brochure alone is not sufficient.

## 2. Hackathon implementation slice (P0)

The implementation handoff is limited to the following:

1. **Learner inputs:** study stage, at least one supported subject and whole-number mark (0–100); optional preferences only where the approved UI contract supports them. No names, email, phone, national ID, account or sensitive financial details.
2. **Validation:** required/malformed/out-of-range values, unsupported subjects and duplicates are explained accessibly. Invalid input never generates a match.
3. **Catalogue:** a small, synthetic/demo or explicitly curator-verified catalogue. Each real-world claim shown to judges must have source URL, source name, applicable cycle, checked date, and verification/publication state. Do not represent unverified demo fixtures as verified institutional requirements.
4. **Deterministic matching:** ELIGIBLE, NOT_ELIGIBLE, or UNKNOWN; stable and explainable reasons; missing, stale, contradictory or unsupported mandatory rules cannot yield a definitive positive eligibility claim. No fabricated APS formula, subject equivalence, cutoff, fee, deadline or funding criterion.
5. **Results and details:** match/uncertain/not-eligible states, source-linked reasons, clear catalogue limits, official next steps, useful empty/loading/error states and recovery.
6. **Verified alternatives only:** show an alternative relationship only if its evidence is recorded and reviewed; otherwise say no verified alternative is available.
7. **Privacy and lifecycle:** learner inputs, results and manual tracker state remain page-memory-only; reset clears them; do not put them in URLs, browser storage, cookies, logs, analytics, telemetry or network requests. The browser must not send learner-specific data to the public catalogue API.
8. **Accessible, mobile-first experience:** keyboard and visible-focus operation, labels and field errors, semantic result announcements, readable small-screen layout including 320px width, and no critical/serious automated accessibility violations.
9. **Demo resilience:** deterministic synthetic fixtures, no required third-party live dependency during the judge journey, clear demo-data disclosure, and a repeatable start/reset/reload procedure.

### Priority order if time is constrained

**P0-A:** complete learner input → validated deterministic results → explanations and official-source next steps → reset/recovery → browser regression/privacy/accessibility checks.

**P0-B:** verified programme details and one evidence-backed alternative only if the curator can substantiate it.

**P1 only after P0 is stable:** funding matching and page-memory manual tracker, and only to the extent that approved, sourced records and acceptance criteria are available. Do not weaken eligibility correctness or privacy to add breadth.

## 3. Explicitly out of the two-day critical path

Do not implement these to make the demo appear more production-like:

- Azure provisioning/deployment, a public hosted API, API Management or an unverified runtime adapter.
- Authentication, profiles, saved pathways, cross-device sync, durable persistence or application submission.
- Uploads, AI chat, automated scraping or AI-generated eligibility decisions.
- Production abuse controls, provider logging/retention configuration, service-level guarantees, or a claim that the R100/month all-in cloud budget has been certified.
- National catalogue completeness or unverified institution/funding coverage.

These remain future work and/or mandatory pre-deployment gates. Do not delete or silently waive the existing security, privacy, cost, catalogue-publication, or release controls. A local browser-only synthetic demo does not need a hosted API to prove the core student journey.

## 4. Architecture and API implementation boundary

- For the hackathon slice, implement the learner journey in the existing React/Vite browser application and connect it to the existing deterministic evaluator using approved local synthetic fixtures.
- Keep learner-specific computation client-side and state in page memory.
- The /api/v1 public catalogue contract remains a separate, future integration boundary. The local API harness and OpenAPI files are validation artifacts, not evidence of a deployed API.
- Do not add cloud service dependencies, secrets, external telemetry, persistent storage or new paid dependencies as a shortcut.
- Preserve the approved React/Vite architecture and use the repository's existing scripts/test tooling unless a documented reason requires change.

## 5. Implementation order and evidence

1. **Baseline reconciliation:** confirm current main SHA and inspect UI, evaluator, catalogue fixtures, tests and workflows before editing.
2. **Thin vertical slice:** wire validated inputs to deterministic evaluator; render grouped outcomes, reason explanations and source-backed details; include loading/empty/error/reset states.
3. **Catalogue truthfulness:** validate every record against the source/provenance contract; label synthetic examples as demo data; withhold unsupported claims.
4. **Regression tests:** cover input boundaries, unsupported/duplicate subjects, all three eligibility states, incomplete rules, stable order, invalid catalogue, empty catalogue, errors and reset.
5. **Privacy/accessibility tests:** inspect network, URLs, browser storage, logs/telemetry integrations, reload/new-tab lifecycle, keyboard, focus, 320px layout and automated accessibility.
6. **CI and build:** run and record the repository's relevant contract, OpenAPI, evaluator/golden-case, browser privacy/accessibility and build workflows on the reviewed commit. Fix regressions before demo freeze.
7. **Demo rehearsal:** repeat the entire journey from a clean browser, including one positive/uncertain/negative example where supported by verified rules; rehearse failure/recovery and ensure no fabricated claims appear.
8. **Submission artifacts:** create a PDF presentation deck of at most 10 slides including feature details, screenshots, demo details, security, user journey and architecture; include a demo video of at most 90 seconds and its link on the slides; complete the Sonke SSDLC and Lean Business Canvas; profile the team before submission. The supplied programme says submission is through Sonke by Monday, 26 October 2026, 23:59. Recheck the Sonke dashboard for any updates.

## 6. Definition of demo-ready

The product may be described as **hackathon demo-ready** only when all applicable items are evidenced on the same reviewed commit:

- [ ] One complete end-to-end learner journey works on desktop and mobile.
- [ ] Deterministic evaluator is connected to the UI and all three eligibility states have grounded, explainable behavior.
- [ ] No unsupported positive eligibility, invented requirement, fabricated source, or misleading admission/funding guarantee is displayed.
- [ ] Catalogue source/cycle/freshness status and synthetic/demo data are disclosed.
- [ ] Invalid input, missing/incomplete data, empty results, recoverable errors and reset work correctly.
- [ ] Learner inputs/results/tracker are not persisted or transmitted; privacy tests pass.
- [ ] Keyboard/focus/mobile layout and accessibility checks pass; manual checks are recorded.
- [ ] Relevant tests, build and CI are green on the reviewed commit; known failures and limitations are disclosed.
- [ ] Demo rehearsal is repeatable and no required live service can derail the core journey.
- [ ] PDF deck (10 slides maximum), demo video (90 seconds maximum), Sonke SSDLC and Lean Business Canvas are complete; team profile/submission steps are verified.

Passing this checklist is a hackathon demo decision only. It is not G-SYN-001 release approval, production readiness, privacy/legal certification, budget certification, or deployment authorization.

## 7. Production follow-up after the hackathon

Retain the following as explicit later gates: final runtime/provider profile; API deployment and route mapping; CORS/cache/timeout/retry/error-correlation behavior; enforceable abuse control; service-by-service cost verification under R100/month; provider terms/logging/telemetry/retention/deletion review; catalogue curator sign-off and complete executable rule evidence; security/privacy/legal review; infrastructure/CI/CD; monitoring/rollback; and release verification. No production gate is passed by this baseline.

## 8. Source references

- docs/product/PRD.md, REQUIREMENTS.md, ACCEPTANCE-CRITERIA.md, FEATURE-BACKLOG.md
- docs/architecture/ARCHITECTURE.md, SECURITY-ARCHITECTURE.md
- docs/project/G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md
- docs/api/API-CONTRACT.md, API-ERRORS.md, PHASE4-LOCAL-VALIDATION-PLAN.md
- Supplied FNB AOTY Hackathon 2026 - Programme.pdf
