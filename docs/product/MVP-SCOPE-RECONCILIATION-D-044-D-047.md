# StudyPath SA — MVP Scope Reconciliation (D-044–D-047)

**Purpose:** Reconcile the approved API-first product direction, anonymous/authenticated boundary, authenticated feature scope, and interim synthetic-only local demo without treating them as contradictory releases.
**Status:** Documentation reconciliation for review; it introduces no new feature authorization and does not pass Phase 2 or any implementation/release gate.
**Decision sources:** `docs/project/DECISIONS.md`, decisions D-044, D-045, D-046 and D-047 (2026-10-14 to 2026-10-15).
**Related requirements:** `docs/product/PRD.md`, `REQUIREMENTS.md`, `ACCEPTANCE-CRITERIA.md`, `TRACEABILITY-MATRIX.md`, and `docs/project/G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md`.

## 1. Reconciled scope in one view

The decisions apply at different levels and must be read together:

| Level | Approved scope | What it does not authorize |
|---|---|---|
| Product/architecture direction — D-044 | API-first architecture; review the versioned `/api/v1` contract before dependent UI/backend components are implemented; curate the initial programme catalogue from official UJ 2027 sources and expand only after verification. | It does not itself require a hosted API for the local verification slice, freeze the draft API contract, authorize cloud provisioning, or make candidate catalogue records publication-ready. |
| Intended matching boundary — D-044/D-045 | Anonymous users retrieve public catalogue data only and match in the browser. Learner marks, subjects, interests, results and tracker entries stay in page memory and are not sent to APIs, URLs, analytics, application logs or error telemetry. Authenticated server-side matching is the later product direction, subject to gates. | Anonymous profile-bearing API calls are prohibited. The authenticated direction is not permission to configure identity, transmit real learner data or provision services now. |
| Approved authenticated scope extension — D-046 | Personalised server-side pathway matching, saved pathways, pathway comparison, saved funding opportunities and a derived personal study dashboard. Academic-profile persistence requires separate explicit opt-in; login alone is not consent. The tracker remains page-memory-only and must not sync or persist across sessions. | Scope approval is not implementation approval. Exact schemas/lifecycle, authorization and isolation, privacy/security and applicable legal review, tests, provider controls and full cost verification remain gates. |
| Current local build/verification slice — D-047 / G-SYN-001 | A local browser demo using synthetic profiles, marks, interests, tracker entries and fixtures only. Inputs, results and tracker entries remain in page memory; reset/reload ends the temporary exploration. No real learner data, production identity, authentication, authenticated matching, profile persistence, uploads, cloud sync, Azure provisioning or deployment. | This is not a cancellation of the intended API-first or authenticated product direction. It is not legal clearance, runtime privacy proof, or authorization for a public demo. |

**Interpretation for the current gate:** G-SYN-001 must be runnable locally without provisioning or deploying a hosted API. Local synthetic catalogue fixtures may be used for that gate. The draft `/api/v1` contract remains the intended architectural direction and must be reviewed before later components depend on it. This interpretation limits the current verification slice; it does not remove the public catalogue API from the intended architecture.

## 2. Priority and feature disposition

### P0 — current core journey

- Anonymous subject/mark input with the approved validation and subject-vocabulary contract.
- Deterministic, explainable `ELIGIBLE`, `NOT_ELIGIBLE` and `UNKNOWN` minimum-requirement screening, separate from preference fit.
- A bounded, source-backed catalogue; unresolved or incomplete material requirements cannot produce a false-positive `ELIGIBLE`.
- Official source links, transparent limitations, accessible responsive UX, and the D-047 synthetic-only in-memory boundary.
- Reproducible local build/test and the G-SYN-001 browser, privacy, accessibility and deterministic-matching evidence.

### P1 — intended anonymous-first MVP, behind P0

- Funding matching using only approved non-sensitive inputs and official, verified opportunity records.
- Manual application tracking with the approved statuses/transitions and page-memory-only entries. No API, database, browser storage, cookies, account or cloud sync.
- These features must not displace P0 correctness, privacy, accessibility, testing or demo reliability. Missing verified records must be disclosed; do not imply feature/data readiness from requirements alone.

### Approved but gated authenticated extension

- Personalised server-side matching, saved pathways, pathway comparison, saved funding opportunities and the derived dashboard.
- Academic-profile persistence only after explicit opt-in and an approved lifecycle. Saved pathways/funding are limited to approved stable catalogue identifiers and minimum approved ownership/audit metadata; comparison uses supported verified fields and marks missing fields unavailable.
- This extension is not part of the D-047 local demo acceptance slice. Do not implement or expose these features until their Q-018/Q-020 and related contract, security/privacy, test and cost gates are passed.

### Explicitly out of the current slice

Real learner data; production identity; authentication; authenticated matching; academic-profile persistence; cross-session tracker persistence; uploads/document extraction; AI chat; direct application submission; cloud sync; Azure provisioning/deployment; and any unapproved billable service. Broader specification features not approved in the current scope remain deferred rather than silently implied.

## 3. Acceptance and evidence boundaries

- `AC-AUTH-001`–`AC-AUTH-*` describe the gated authenticated extension; they are not requirements to implement authenticated behavior in G-SYN-001.
- G-SYN-001 is not passed by this reconciliation document. It requires implementation and evidence tied to a reviewed commit, including deterministic golden cases, browser-level privacy canaries, reset/reload behavior, accessibility, reproducible build/tests and CI.
- A requirement, owner decision, draft contract, checked-in test, executed test, CI run and release verification are different evidence types. Do not present one as another.
- The hard total spend cap remains R100/month. This scope reconciliation authorizes no spend, provisioning, deployment or production identity.
- Public demo use remains subject to review of actual hosting/provider metadata, logs, cookies, telemetry, third-party resources, privacy notice accuracy and runtime evidence. The independent privacy/legal review is deferred, not waived; real learner-data processing remains prohibited until applicable review and controls are verified.

## 4. Requirement trace

| Decision | Reconciled artifact treatment | Gate status |
|---|---|---|
| D-044 | API-first target and `/api/v1` review requirement retained; local gate does not require hosted API provisioning. | Architecture/API approval remains open. |
| D-045 | Anonymous catalogue-only API plus client-side matching; no transmission/persistence of anonymous learner profile/results/tracker data. Authenticated matching is future and gated. | Q-018 remains open for architecture/security/cost evidence. |
| D-046 | Five authenticated features are recorded as approved scope, with academic-profile opt-in and tracker memory-only rule. | Q-020 and implementation gates remain open. |
| D-047 | Local synthetic-only browser demo is the immediate verification target; no auth, real data, persistence, cloud sync, provisioning or deployment. | G-SYN-001 is OPEN / NOT PASSED. |

**Conclusion:** The scope is reconciled at the decision level for A2 review. This does not by itself close A3, complete the full Phase 2 matrix/traceability review, pass G-SYN-001, approve public demo use, or mark the application implemented/deployed.
