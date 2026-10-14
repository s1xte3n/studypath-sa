# StudyPath SA — Requirements Matrix and Traceability

**Status:** Phase 2 working draft; not a gate-passage record.  
**Baseline:** Approved PRD and acceptance criteria dated 2026-10-14.  
**Last updated:** 2026-10-14 (subject-contract test evidence update).  
**Scope:** Trace approved requirements to acceptance criteria, planned test evidence, implementation location and release evidence. This matrix records planned traceability, not implementation or test completion.

## Status vocabulary
- **Approved requirement:** Product owner approved the requirement/acceptance-criteria baseline.
- **Open evidence:** Requirement is approved, but authoritative catalogue evidence, privacy review, or curator sign-off is missing.
- **Planned:** Test or implementation is identified but not yet evidenced as executed.
- **Not implemented / not verified:** No application source, executed test, CI result, or release evidence has been verified for the item.

## Requirement-to-test-to-implementation matrix

| Requirement ID | Requirement / scope | Acceptance criteria | Planned verification / test IDs | Implementation location | Current evidence / gap | Status |
|---|---|---|---|---|---|---|
| REQ-EXP-001 | Anonymous pathway input, stage-aware marks, validation and subject normalization | AC-EXP-001–014 | T-EXP-001 required fields; T-EXP-002 mark boundaries/decimals/malformed input; T-EXP-003 duplicate canonical subjects; T-EXP-004 unsupported subjects; T-EXP-005 stage-specific interpretation; T-EXP-006 reset and failure messages; T-SUB-001–012 subject contract | Not verified; UI/runtime location not established; contract reference tests at tests/contracts/subject-catalogue-v1.test.mjs | Owner-approved subject-catalogue-v1 contract; owner supplied output for exact repository command reports 12/12 passed, 0 failed. Application integration/runtime privacy not verified. | Contract tests passed per supplied output; app implementation not verified |
| REQ-CAT-001 | Curated official-source programme catalogue, applicable cycle, freshness and sign-off | AC-CAT-001–012 | T-CAT-001 provenance completeness; T-CAT-002 cycle mismatch; T-CAT-003 conflicting sources; T-CAT-004 stale/unavailable source; T-CAT-005 6–8 record pilot audit | Proposed catalogue/API contract under docs/architecture; executable location not verified | Seven UJ candidate leads and visual reconciliation documented; not publication-ready; GAP-001 open; curator sign-off and 6–8 complete records outstanding | Open evidence |
| REQ-MAT-001 | Deterministic eligibility states and explainable rule evaluation; ranking kept separate | AC-MAT-001–021 | T-MAT-001 all mandatory rules pass; T-MAT-002 mandatory failure; T-MAT-003 unknown rule/input; T-MAT-004 AND/OR/conditional boundaries; T-MAT-005 APS/source conflict; T-MAT-006 deterministic repeatability; T-MAT-007 ranking cannot override eligibility; T-MAT-008 reasons/source traceability | Not verified; API/runtime composition remains open under GAP-008 | OR-004/005 decisions recorded; official UJ source review preliminary/incomplete; no executable evaluator or tests verified | Planned; blocked on verified rules and implementation |
| REQ-ALT-001 | Alternatives and pathway relationships, distinct from eligibility and formal articulation | AC-ALT-001–007 | T-REL-001 invalid/missing evidence; T-REL-002 articulation evidence; T-REL-003 generic NQF text is insufficient; T-REL-004 eligibility independence; T-REL-005 expired/conflicting evidence; T-REL-006 truthful learner wording; T-REL-007 curator sign-off | docs/product/PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md (draft only); runtime location not verified | Candidate questions documented; no relationship pair approved; GAP-003 open | Planned; curator/source evidence required |
| REQ-DET-001 | Programme details, official next steps, source links and clear unavailable fields | AC-DET-001–007 | T-DET-001 stable programme identity; T-DET-002 unavailable fields; T-DET-003 source/deadline provenance; T-DET-004 official URL correctness; T-DET-005 unknown ID; T-DET-006 no admission guarantee | Not verified; UI/API contract not frozen | PRD/AC baseline approved; catalogue records and application implementation outstanding | Planned |
| REQ-PRV-001 | Anonymous, memory-only learner exploration; no profile persistence or transmission; synthetic-only demos | AC-PRV-001–013 | T-PRV-001 browser storage inspection; T-PRV-002 network request inspection; T-PRV-003 URL/referrer inspection; T-PRV-004 logs/error telemetry inspection; T-PRV-005 reset/navigation/reload; T-PRV-006 privacy notice and hosting retention review | Not verified; implementation and hosting configuration not established | OR-006 policy approved; GAP-004 privacy/runtime evidence open; real learner data prohibited pending required review | Release blocker |
| REQ-UX-001 | Mobile-first accessible experience, clear states, supported browsers and performance | AC-UX-001–011 | T-UX-001 320px layout; T-UX-002 keyboard/focus; T-UX-003 labels/error association; T-UX-004 state semantics; T-UX-005 supported-browser matrix; T-UX-006 performance at agreed environment | Not verified; no app source/test environment verified | Acceptance criteria define targets; no measured accessibility, browser or performance results available | Planned |
| NFR acceptance criteria | Catalogue provenance, golden-set testing, assertions beyond HTTP success, evidence discipline and usability review | AC-NFR-001–005 | T-NFR-001 catalogue audit; T-NFR-002 versioned 20+ case golden set; T-NFR-003 state/reason/source/privacy assertions; T-NFR-004 evidence audit; T-NFR-005 usability check or documented unavailability | Not verified | No automated test suite, CI result, or usability evidence verified | Planned; align NFR requirement ID before gate sign-off |
| REQ-FUND-001 | P1 funding matching using limited non-sensitive inputs and 3–5 official opportunities | AC-FUND-001–009 | T-FUND-001 provenance/freshness; T-FUND-002 deterministic criteria; T-FUND-003 unknown/sensitive criteria; T-FUND-004 expired opportunity; T-FUND-005 honest empty state; T-FUND-006 input minimisation | Not verified; funding catalogue/API/UI not established | OR-015 policy recorded; GAP-005 funding records/evidence open | P1; open evidence |
| REQ-APP-001 | P1 manual tracker with approved statuses/transitions, page-memory-only lifecycle | AC-APP-001–009 | T-APP-001 supported catalogue reference; T-APP-002 allowed/blocked transitions; T-APP-003 terminal states; T-APP-004 invalid update; T-APP-005 reset/no telemetry; T-APP-006 page-memory-only/no persistence | Not verified; UI/runtime location not established | OR-016 policy recorded; page-memory-only required; no implementation or tests verified | P1; planned |
| Deferred cost-planning criteria | Deferred cost-planning rules | AC-COST-FUT-001–005 | Future tests only if scope approved | Out of initial MVP | Deferred by PRD; do not implement without change control | Deferred |
| Deferred AI/document criteria | Deferred AI/document assistance safeguards | AC-AI-FUT-001–005 | Future tests only if scope approved | Out of initial MVP | Upload/extraction and AI assistance excluded from initial MVP | Deferred |

## Cross-cutting blockers and dependencies

| Gap / decision | Affected requirements | Closure evidence required | Current state |
|---|---|---|---|
| GAP-001 — complete programme rules and source reconciliation | REQ-CAT-001, REQ-MAT-001, REQ-DET-001 | 6–8 distinct records with complete programme/cycle-specific rules, official sources, verification dates, conflict dispositions and curator sign-off | Open; visual PDF inspection is documented but does not complete rule extraction or sign-off |
| GAP-002 — subject dictionary and approved aliases | REQ-EXP-001, REQ-MAT-001 | Approved canonical subjects, language distinctions, aliases, versioning policy, normalization tests and runtime/privacy verification | Owner-approved bounded subject-catalogue-v1 contract; owner supplied repository test output reports 12/12 passing. Contract decision and test execution are evidenced by owner report; production implementation, runtime/privacy verification remain open |
| GAP-003 — pathway relationship evidence | REQ-ALT-001 | Exact official evidence for each pair, accurate relationship type/rationale, review metadata and curator approval | Open; no relationship pair approved |
| GAP-004 — privacy/runtime | REQ-PRV-001 and release readiness | Verified browser storage, network, URL, logs/telemetry, reset, privacy notice and hosting-provider retention review | Open; policy exists but implementation/review evidence is absent |
| GAP-005 — funding catalogue | REQ-FUND-001 | 3–5 current official opportunities with supported criteria, deadlines, source verification, 30-day freshness and curator sign-off | Open |
| GAP-008 / Q-018 — runtime and API feasibility | REQ-EXP-001, REQ-MAT-001, REQ-DET-001, REQ-PRV-001 | Approved API schema/runtime composition, network boundary, retention/logging review and feasibility/cost evidence consistent with client-only learner data | Open |
| Implementation/test/CI baseline | All in-scope requirements | Source tree, test strategy, automated tests, CI workflow/results, accessibility/performance reports and release checklist | Not verified; no application code or test execution is evidenced by this matrix |

## Evidence ledger

| Evidence item | Link / location | What it proves | What it does not prove |
|---|---|---|---|
| Approved PRD | ../product/PRD.md | Approved scope and product rules baseline | Implementation or tests |
| Approved acceptance criteria | ../product/ACCEPTANCE-CRITERIA.md | Acceptance targets and test oracles | Test execution/pass |
| Programme candidate register | ../product/PROGRAMME-CATALOGUE-REGISTER.md | Candidate leads and recorded research state | Publication-ready catalogue |
| UJ source reconciliation | ../product/UJ-2027-SOURCE-RECONCILIATION-MATRIX.md | Visual inspection/source discrepancy notes | Curator sign-off or complete rules |
| Subject normalization contract | ../product/SUBJECT-NORMALIZATION-CONTRACT.md; ../product/SUBJECT-CATALOGUE-V1-APPROVAL.md | Owner-approved bounded subject contract; owner supplied output for `node --test tests/contracts/subject-catalogue-v1.test.mjs` reports 12 passed / 0 failed | Does not prove application integration, privacy/runtime behavior, or programme eligibility correctness |
| Relationship evidence contract | ../product/PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md | Proposed evidence threshold and candidate questions | Approved relationships |
| Open product requirements | ../product/OPEN-REQUIREMENTS.md | Recorded owner decisions and outstanding policy details | Runtime compliance |
| Project status | ../project/PROJECT-STATUS.md | Recorded project state and known evidence limits | Independent local workspace/build/deployment verification |

## Gate assessment

**REQUIREMENTS READY: NOT PASSED.**

This matrix is the initial traceability artifact. The phase cannot pass while programme rules remain incomplete, pathway relationships and funding records are unsupported, privacy/runtime controls lack verification, and the API/runtime contract is unresolved. The bounded subject-catalogue-v1 decision is owner-approved and its 12 contract tests are reported passing, but runtime/privacy evidence remains open. Requirements and tests are mapped at a planning level; implementation paths, executable test results, CI evidence and release evidence remain absent.

## Next actions

1. Review and approve this matrix's requirement IDs and cross-links; align the NFR identifiers with the PRD before gate sign-off.
2. Complete GAP-001 by turning the seven UJ candidates into full rule records and obtaining curator sign-off; reach the 6–8 verified-record target.
3. Close the remaining GAP-002 runtime/privacy evidence and verify the committed contract test command in CI; do not reopen approved subject IDs/alias policy without change control.
4. Resolve GAP-003 with evidence-backed relationship pairs or leave the relationship catalogue empty.
5. Build and verify GAP-004 privacy/runtime evidence and GAP-008 API/runtime feasibility before learner-facing implementation is release-ready.
6. Curate 3–5 funding records for GAP-005.
7. After evidence decisions, freeze API/interface contracts and test strategy, then implement and run tests. Do not mark criteria passed without recorded execution evidence.


## GAP-001 / GAP-002 joint review update — 2026-10-14

New draft contracts on this branch:
- [Canonical Subject Catalogue v1](../product/SUBJECT-CATALOGUE-V1.md) proposes stable IDs, exact-label-only normalization, no aliases in v1, and explicit English HL/FAL/Second Additional Language distinctions.
- [UJ 2027 Subject Routes and Rule Semantics](../product/UJ-2027-ROUTE-MODEL.md) captures the seven existing candidate leads, formal AND/OR/conditional semantics, required evidence fields and publication checklist.

This historical update records the state before the owner decision and test evidence documented later in this file. It is superseded for subject-contract approval and reported contract-test execution by the **Subject contract test evidence update** below. The following GAP-001 blockers remain current: complete programme-specific APS method/included-subject sets, confirmed interpretation of the source's “English” column, fully resolved subject-column/branch semantics where applicable, and curator sign-off. GAP-001 remains open. GAP-002 remains open for production integration and runtime/privacy verification; do not promote draft programme rules to the learner-facing evaluator.

Remaining gate evidence: source-level review of every 2027 table and footnote; complete APS/English/route rules; signed record-by-record review; runtime/privacy verification; and CI evidence for the contract tests.


## Subject contract test evidence update — 2026-10-14

The project owner supplied terminal output for `node --test tests/contracts/subject-catalogue-v1.test.mjs`: **12 tests passed, 0 failed** (T-SUB-001–T-SUB-012). Record this as owner-supplied execution evidence. It confirms the contract test file's reported behavior only; it does not establish production application integration, CI execution, privacy/runtime compliance, or eligibility-rule correctness. The owner-approved bounded subject contract is recorded in `docs/product/SUBJECT-CATALOGUE-V1-APPROVAL.md`. GAP-002 remains open for runtime/privacy verification; GAP-001 and the overall `REQUIREMENTS READY` gate remain open/not passed.


## UJ 2027 curator approval traceability update — 2026-10-14

The project owner approved all seven bounded UJ 2027 NSC pilot candidate rules and shared interpretation proposals. Evidence: `docs/product/UJ-2027-CURATOR-REVIEW-PACK.md` approval register and `docs/product/PROGRAMME-CATALOGUE-REGISTER.md`. This satisfies the owner/curator-decision portion of GAP-001, but not the full closure criteria. Source-specific unresolved semantics must remain `UNKNOWN`; the 12 worksheet cases are not approved executable oracles, no evaluator implementation has been verified, and the required project-wide 20+ synthetic golden set with zero false-positive `ELIGIBLE` outcomes remains unexecuted. GAP-001 remains open; GAP-002/003/004/005/008 and implementation/CI evidence remain open. `REQUIREMENTS READY` remains NOT PASSED. No application code or tests were changed or run.