# Phase 2 — REQUIREMENTS READY Exit Checklist

**Purpose:** One auditable checklist for deciding whether Phase 2 (requirements matrix and traceability) is complete.  
**Baseline inspected:** `main` at merge commit `f3fdc009f19600abc6830fd1af1752c1ff633149` (PR #79 merged; 2026-10-15). Audit changes are proposed on `docs/phase-2-a4-a6-traceability-audit`.  
**Current gate:** OPEN — the requirements/source/traceability audit is evidenced on this branch; explicit overall product-owner acceptance and the formal gate-status update remain pending.  
**Rule:** Do not tick an item because it is planned, described as a proposal, or expected to be done. Link the evidence or record the explicit owner decision. If an item is not applicable, record why and who approved that disposition.

## What passing Phase 2 means

Phase 2 passes when the approved product scope is unambiguous; every in-scope requirement is uniquely identified, prioritised, testable and linked to measurable acceptance criteria and planned verification IDs; cross-document references are consistent; remaining unknowns are explicitly assigned to later gates or resolved by an owner decision; and the product owner explicitly accepts the reconciled baseline.

Phase 2 does **not** certify that the catalogue is publication-ready, the architecture/API contract is implementation-ready, code is implemented, tests have passed, runtime privacy has been verified, CI/release evidence exists, or the service is safe for public use. Those remain separate gates.

## A. Scope and source-of-truth alignment — REQUIRED

- [x] **A1. PRD baseline approval is recorded.** `docs/product/PRD.md` and `docs/product/ACCEPTANCE-CRITERIA.md` have explicit product-owner approval recorded for the Phase 1 baseline.
- [x] **A2. Reconcile the full MVP scope against all later decisions.** The PRD, requirements matrix, acceptance criteria and traceability matrix now distinguish the D-044 API-first target, D-045 anonymous/authenticated boundary, D-046 approved but gated authenticated extension, and D-047 current local synthetic-only demo. The interim demo does not silently remove longer-term approved scope. Evidence: [MVP Scope Reconciliation](MVP-SCOPE-RECONCILIATION-D-044-D-047.md). This records A2 only; A3–A6 are assessed separately below, and the overall Phase 2 gate remains open.
- [x] **A3. Resolve the authenticated-feature requirements boundary.** The product owner accepted the proposed D-048 boundary on 2026-10-15. The five D-046 authenticated features remain approved future scope but are excluded from the D-047/G-SYN-001 local synthetic-only demo; academic-profile persistence is off by default pending separate explicit opt-in and an approved lifecycle; the tracker remains page-memory-only. Exact API/identity/session contracts, comparison fields, dashboard outputs and lifecycle parameters are explicitly assigned to Q-018 / Phase 3 and Q-020 before implementation. Evidence: [A3 authenticated-boundary review](PHASE-2-A3-AUTHENTICATED-BOUNDARY-REVIEW.md), [D-048 decision record](../project/DECISIONS.md), and the owner approval on [PR #74](https://github.com/s1xte3n/studypath-sa/pull/74). This closes A3's boundary-decision criterion only; Q-018, Q-020, G-SYN-001 and the overall Phase 2 gate remain open.
- [x] **A4. Confirm P0/P1 ordering and exclusions are consistent.** The supplied specification calls M4 funding matching and M5 application tracking “Must Have”; owner-approved OR-001 retains both in the intended MVP at P1 behind the P0 discovery/correctness/privacy/accessibility journey. `PRD.md`, `SCOPE.md`, `REQUIREMENTS.md` and `FEATURE-BACKLOG.md` align. D-047/G-SYN-001 excludes real learner data, production identity, persistence, uploads, AI/document processing, direct application submission, cost planning, Azure provisioning and deployment from the current local demo. D-046 authenticated features remain future/gated scope under D-048, not silently deleted. This is an explicit owner-approved priority/slice decision, not a claim that the supplied specification originally ranked M4/M5 as P1.
- [x] **A5. Review OR-001–OR-019 dispositions.** OR-001–OR-018 each records an owner-approved resolution or explicit future-scope disposition. OR-019 remains **OPEN** for API/runtime composition, provider logging/retention and cost review; its next gate is Q-018 / Phase 3 plus the applicable privacy/security and cost gates. D-044–D-048 already bound current anonymous behavior to catalogue-only public data and client-side matching, and D-047 bounds the immediate demo to local synthetic fixtures. OR-019 does not authorize profile transmission or silently change those user-facing rules. The unresolved implementation/runtime choices remain visible and must be resolved before the affected architecture is frozen.
- [x] **A6. Confirm supplied source references and terminology are represented faithfully.** The supplied specification's South African/national product ambition and API-first serverless Azure baseline remain documented as intended direction; the approved 6–8 record Gauteng-prioritised pilot and no-national-coverage claim are explicitly bounded interim scope, not a silent replacement of the long-term direction. The source labels M4 funding and M5 tracking “Must Have”; OR-001 records the owner-approved decision to sequence them at P1 behind P0. The hackathon programme's interactive-app, deck maximum 10 slides, demo video maximum 90 seconds, SSDLC, Lean Business Canvas and Monday 23:59 Sonke submission requirements are recorded in Phase 0 evidence; the portal timezone/upload details still require verification. The supplied SOP's phased lifecycle and requirement → contract/UI → test → implementation → CI/release traceability are reflected in this checklist and matrix. See `docs/project/ARTIFACT-INDEX.md` and `docs/project/PHASE0-ONLINE-EVIDENCE.md`.

**Evidence:** owner decision(s) in `docs/project/DECISIONS.md`; aligned scope/PRD/acceptance criteria; open-question dispositions.

## A4–A6 evidence notes — source and scope reconciliation

| Source / decision | Source-derived statement | Approved project disposition | Remaining boundary |
|---|---|---|---|
| `SPEC-1-StudyPath-SA.txt` | M4 funding and M5 application tracking are labelled Must Have; the specification describes national South African scope and an API-first serverless Azure architecture. | OR-001 retains M4/M5 in intended MVP scope at P1 behind P0. OR-008 sets a bounded 6–8 record Gauteng-prioritised pilot without claiming national coverage. D-044 API-first direction is retained; D-047 is only the immediate local synthetic-only demo. | The bounded pilot is not national coverage; runtime/API composition and cost remain later gates. |
| `FNB AOTY Hackathon 2026 - Programme.pdf` | Interactive app; deck no more than 10 slides; demo video no more than 90 seconds; SSDLC and Lean Business Canvas; submission Monday at 23:59 via Sonke after the event. | Deliverables and the derived 26 October 2026 date are recorded in Phase 0 evidence. | Sonke portal timezone/upload constraints and any organiser updates still need direct confirmation. |
| `Standard_Project_Operating_Procedure_Software_Development_Final.docx` | Phased SSDLC, quality gates, and traceability from requirement through interface/test/implementation/CI/release. | Phase 2 checklist and traceability artifacts follow that lifecycle and keep evidence distinct from plans. | Completing this documentation review does not satisfy implementation or release gates. |

## B. Functional and non-functional requirements — REQUIRED

- [x] **B1. Canonical matrix coverage.** Every in-scope functional requirement and NFR has a unique stable ID, priority, concise normative requirement, dependencies, affected logical component/interface, acceptance-criteria references and planned verification IDs in `docs/product/REQUIREMENTS.md`.
- [x] **B2. No missing or orphaned acceptance criteria.** Every requirement maps to measurable criteria in `docs/product/ACCEPTANCE-CRITERIA.md`; every criterion maps back to a requirement; IDs and ranges match exactly across the matrix, PRD, traceability registry and backlog.
- [x] **B3. Criteria are testable.** Criteria specify observable outcomes and important boundaries, including valid/invalid inputs, missing or unsupported data, empty results, recoverable errors, state reset and uncertainty. Avoid subjective wording such as “works well” without an observable outcome.
- [x] **B4. Eligibility semantics are complete.** The deterministic `ELIGIBLE`, `NOT_ELIGIBLE`, `UNKNOWN` states, AND/OR/conditional rules, precedence, unsupported/missing/conflicting rules, explanation/source requirements, and separation of eligibility from preference ranking are explicit. No requirement permits admission or funding guarantees.
- [x] **B5. Subject input contract is consistent.** The owner-approved subject-catalogue-v1 rules (exact canonical labels after approved whitespace/case cleanup, no unapproved aliases, distinct Mathematics/Mathematical Literacy/Technical Mathematics, distinct English streams, duplicate handling and unresolved-subject behavior) match the acceptance criteria, reference contract and T-SUB-001–012 descriptions.
- [x] **B6. Catalogue acceptance is explicit without pretending data is ready.** Requirements specify the bounded 6–8 record pilot, official-source provenance, admission cycle, verification date/freshness, conditions/exceptions, catalogue version, curator sign-off and the rule that material uncertainty cannot produce a false-positive `ELIGIBLE`. Known source conflicts and missing records are tracked, not guessed.
- [x] **B7. Relationship behavior is complete.** Only source-backed, curator-approved relationships may be shown; the safe initial relationship set may be empty; relationship suggestions cannot change eligibility.
- [x] **B8. Funding and tracker requirements are aligned.** AC-FUND-001–009 and AC-APP-001–009 are linked correctly. The tracker lifecycle/terminal states match OR-016 and the PRD; page-memory-only behavior is consistent. Funding remains P1 and is not silently promoted over the core journey.
- [x] **B9. Privacy and synthetic-only boundaries are normative.** Requirements clearly state that the interim demo uses synthetic data only, does not require login, keeps learner inputs/results/tracker entries in page memory, does not persist or transmit them, and clears state on reset/reload. The documented interim boundary is not described as legal clearance or verified runtime behavior.
- [x] **B10. UX, accessibility, performance, reliability and content NFRs are testable.** Required accessibility target/viewport, keyboard/focus/error behavior, performance target and its agreed measurement dependency, loading/empty/failure behavior, honest data/source limitations and no-guarantee copy are stated. Any protocol not yet selected is explicitly assigned to a later gate.
- [x] **B11. Each deferred feature and unsupported scenario has a defined disposition.** It is clear whether the feature is excluded, unknown/unavailable, a later phase, or requires owner decision; the UI must not imply unsupported capability.

**Evidence:** canonical matrix and acceptance criteria with exact cross-references; approved subject-v1 documents; recorded owner decisions for any scope disposition.

## C. Requirement-to-verification traceability — REQUIRED

- [x] **C1. Complete forward traceability.** Every requirement maps to its PRD/acceptance criteria, logical UI/API contract or explicitly pending interface, planned test ID(s), expected implementation area, and CI/release evidence field.
- [x] **C2. Complete reverse traceability.** Every acceptance criterion and planned test ID maps to at least one requirement; there are no orphan IDs, duplicate IDs with conflicting meanings, missing ranges or stale references.
- [x] **C3. Test IDs match the actual test intent.** In particular, T-SUB-001–012 align with the approved no-alias contract and checked-in reference tests. Reference normalizer tests are not described as proving UI duplicate rejection, programme-level `UNKNOWN`, dictionary refresh or runtime privacy.
- [x] **C4. Test evidence is labelled honestly.** Planned IDs, owner decisions, source research, checked-in tests, executed tests, CI results and release evidence are distinguished. Missing implementation/CI/release evidence is marked unavailable/not verified; no fabricated run URLs or inferred results.
- [x] **C5. The traceability matrix is consistent with the dependency matrix and backlog.** Dependencies and sequencing do not imply that blocked work is complete or authorize implementation before its gate.
- [x] **C6. Traceability is retained for the interim synthetic-only journey.** The requirements intended for the local demo map to the G-SYN-001 acceptance IDs without conflating that later implementation gate with Phase 2 completion.

**Evidence:** `docs/product/TRACEABILITY-MATRIX.md`, `docs/product/DEPENDENCY-MATRIX.md`, `docs/product/FEATURE-BACKLOG.md`, `docs/project/G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md`.

**Automated documentation-ID audit on the proposed branch:** 134 defined acceptance-criterion IDs; zero duplicate AC definitions; zero AC IDs missing from the canonical matrix; all 10 PRD requirement IDs represented in the canonical matrix; zero canonical-matrix/backlog test IDs missing from the traceability registry or Q-020 test plan; zero conflicting repeated test-definition rows across those registries. This checks identifiers/mappings only, not application behavior or executed tests.

## D. Cross-document consistency and unresolved-gap classification — REQUIRED

- [x] **D1. Cross-check the full requirements set.** Reconcile `PRD.md`, `USER-STORIES.md`, `SCOPE.md`, `OPEN-REQUIREMENTS.md`, `ACCEPTANCE-CRITERIA.md`, `REQUIREMENTS.md`, `TRACEABILITY-MATRIX.md`, `FEATURE-BACKLOG.md`, `DEPENDENCY-MATRIX.md`, `REQUIREMENT-GAPS.md`, `DECISIONS.md`, `OPEN-QUESTIONS.md`, `PROJECT-STATUS.md` and `ARTIFACT-INDEX.md`. Resolve contradictory current statements; clearly mark historical/superseded text.
- [x] **D2. GAP-001 — catalogue evidence.** The requirement and its acceptance threshold are explicit; known source conflicts and incomplete records are visible; the rule for uncertainty is defined. Publication-ready records are a later catalogue gate, not a Phase 2 blocker by themselves.
- [x] **D3. GAP-002 — subject vocabulary.** The owner-approved contract and reference-test mapping are consistent. The requirements explicitly distinguish contract/reference tests from production integration, evaluator behavior and runtime privacy. Any current-head test claim has an exact commit/run citation or is marked unverified.
- [x] **D4. GAP-003 — pathway relationships.** The evidence threshold is explicit and an empty verified set is allowed. No relationship needs to be invented merely to pass Phase 2.
- [x] **D5. GAP-004 — privacy/runtime boundary.** Requirements clearly state prohibited flows and required behavior; runtime/provider inspection is assigned to the appropriate later verification/release gate rather than falsely marked passed.
- [x] **D6. GAP-005 — funding records.** P1 scope and acceptance criteria are explicit. The absence of 3–5 verified funding records is tracked as a feature/data readiness blocker, not concealed or confused with requirements completeness.
- [x] **D7. GAP-006/007 — tracker and funding criteria cross-check.** Preserve their documented resolved status as documentation cross-checks only; do not claim implementation or tests are complete.
- [x] **D8. GAP-008 and GAP-009–013 — architecture/quality decisions.** Each unresolved API/runtime/cache/error/cost, performance protocol, accessibility evidence, unsupported-rule, resilience or persistence issue is assigned to Phase 3/4, implementation, security/privacy, test or release as appropriate. If an item changes user-visible behavior or acceptance criteria, bring it back to Section A/B before passing Phase 2.
- [x] **D9. Q-018/Q-020 boundary is explicit.** Authenticated-feature scope and approved constraints are not confused with implementation readiness. Any remaining uncertainty that changes product behavior is resolved or explicitly scoped out; identity-provider selection, exact runtime schema, provider capability, cost proof, legal review and runtime security tests remain separate gates where they do not leave requirements ambiguous.
- [x] **D10. Interim demo restrictions are consistent everywhere.** No document instructs the team to provision Azure, deploy publicly, configure production identity, persist real learner data or add unapproved recurring cost as part of the synthetic-only gate.

**Evidence:** updated gap register, decision/open-question dispositions, project status and artifact index.

## E. Formal gate acceptance — REQUIRED

- [x] **E1. Publish a concise Phase 2 review summary.** See `PHASE2-TRACEABILITY-REVIEW.md` for the reviewed artifact set, source fidelity findings, corrected AC/requirement mappings, explicit decisions, remaining blockers and evidence links. The review is a proposed audit record on the current branch; the overall gate remains open.
- [ ] **E2. Obtain explicit product-owner acceptance.** Record the decision, date, accepted baseline/commit, and any conditions or exclusions in `docs/project/DECISIONS.md` or a linked gate record. A PR merge or CI pass alone is not product-owner gate acceptance.
- [ ] **E3. Update the gate status consistently.** Change `REQUIREMENTS READY` to PASSED only after A–E are satisfied; update `PROJECT-STATUS.md`, `REQUIREMENT-GAPS.md`, `OPEN-QUESTIONS.md` and `ARTIFACT-INDEX.md` to the same disposition.
- [x] **E4. Preserve the conditional handoff.** `PHASE2-TRACEABILITY-REVIEW.md` records Phase 3 entry criteria and the downstream catalogue, architecture/API, implementation, privacy/security, test, cost, CI, external review and release gates that remain open. Phase 3 is not authorized to start until overall Phase 2 acceptance is recorded; no implementation, privacy clearance, catalogue readiness, deployment or release readiness is claimed.

## Items that are not automatic Phase 2 blockers

Provided the requirement and acceptance behavior are clear, the following remain mandatory at their own gates but do not alone prevent Phase 2 from passing:

- Completing/signing off the 6–8 publication-ready programme records and resolving source conflicts before publication.
- Curating 3–5 current official funding records before enabling the P1 funding feature.
- Approving named pathway relationships; an empty verified set is permitted.
- Freezing detailed architecture and API schemas, runtime composition, API Management necessity, cache/error/timeout behavior, environment and cost review before implementation/provisioning.
- Building the learner-facing app and browser privacy harness; executing the full golden set and privacy/accessibility tests; proving CI on the reviewed implementation commit.
- Verifying hosting/provider logs, telemetry, retention, privacy notice and other public-demo controls before any public demo.
- Qualified privacy/legal and age-appropriate review before any real learner data, production identity, authenticated persistence or deployment.
- Deployment, smoke tests, rollback and release approval.

If any of these exposes a missing or contradictory **requirement**, return that specific issue to Sections A–D. Do not use this list to waive a requirement.

## Gate decision record

- **Baseline commit reviewed:** `f3fdc009f19600abc6830fd1af1752c1ff633149`; proposed checklist updates are on `docs/phase-2-a4-a6-traceability-audit`.
- **Gate result:** OPEN until all required items are evidenced and E2 owner acceptance is recorded. A3 is closed at the requirements-boundary decision level only.
- **Owner acceptance:** A3 boundary acceptance recorded as D-048 on 2026-10-15. A4–A6 and B–D are marked evidenced in this proposed audit branch; overall REQUIREMENTS READY acceptance is still pending an explicit owner decision on the reconciled baseline.
- **Next gate:** Phase 3 — architecture and ADRs, after REQUIREMENTS READY passes.
