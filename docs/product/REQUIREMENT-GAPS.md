# StudyPath SA — Requirement Gaps

**Status:** Open register for Phase 2. Ambiguous requirements are not implementation tasks.  
**Sources:** Approved PRD, acceptance criteria and OPEN-REQUIREMENTS.md.

## Blocking gaps

| Gap ID | Priority | Requirement(s) | Gap | Evidence / decision required | Owner | Disposition |
|---|---:|---|---|---|---|---|
| GAP-001 | P0 | REQ-CAT-001, NFR-DATA-001 | Seven UJ candidates now have preliminary official-source code/threshold leads, but none is a publication-ready record and the 6–8 verified-record target is unmet | Verify full 2027 applicability, code, campus, subject grades, programme-specific APS formula/inclusions, conditions/exceptions, official next steps, source freshness/version and curator sign-off. Resolve B2E01Q (older Academy page) versus B2E02Q (2027 prospectus/current programme page); reconcile Diploma in Business Information Technology code D1I40J (indexed 2027 prospectus) versus DI1401 (current page); reconcile BCom Information Management APS wording in 2027 prospectus versus current programme page before publication. | Product owner/curator | Starting-source decision resolved; preliminary evidence captured; definitive catalogue acceptance remains blocked |
| GAP-002 | P0 | REQ-EXP-001 | Actual supported subject IDs and aliases are not approved | Draft proposal added in [`SUBJECT-NORMALIZATION-CONTRACT.md`](./SUBJECT-NORMALIZATION-CONTRACT.md): candidate IDs, exact-label-only baseline, unresolved/ambiguous handling, language distinction, privacy boundary and planned tests. Owner/curator approval and subject scope confirmation remain required. | Product owner/curator | Proposal available for review; GAP-002 remains open; do not infer subjects |
| GAP-003 | P0 | REQ-ALT-001 | Verified pathway relationship set not evidenced | Draft proposal in [`PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md`](./PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md) defines relationship types, source/sign-off requirements, candidate dispositions and planned tests. Exact programme-pair evidence and owner/curator approval remain outstanding. | Product owner/curator | Proposal available for review; no pair approved; GAP-003 remains open |
| GAP-004 | P0 | REQ-PRV-001, NFR-PRV-001 | API-first adds a network boundary, but host/provider retention, API logs, browser storage, dependencies and actual request payloads have not been inspected | Verify provider/runtime configuration, logs/retention, request payloads, browser storage/history, dependencies/telemetry and privacy notice; catalogue API requests must contain no learner profile values | Security/privacy + owner | Open release blocker; synthetic-only remains; no public learner-input demo until evidenced |
| GAP-005 | P0 | REQ-FUND-001 | Required 3–5 current official-source funding records not verified | Curate criteria, document checklist metadata, published coverage/amount, deadline/timezone, cycle, verification/version/sign-off | Product owner/curator | P1 funding blocked on records |
| GAP-006 | P0 | REQ-APP-001 | Tracker transition table needed cross-check | **Resolved by Phase 2 source inspection:** PRD and OR-016 agree on the allowed transitions and terminal states. Preserve these rules in test cases. | QA/documentation owner | Resolved; no longer a gate blocker |
| GAP-007 | P0 | REQ-FUND-001, REQ-APP-001 | Exact funding/tracker acceptance-criteria ranges were initially unverified | **Resolved by Phase 2 source inspection:** AC-FUND-001–009 and AC-APP-001–009 were confirmed in ACCEPTANCE-CRITERIA.md and linked in the matrix. | QA/documentation owner | Resolved; no longer a gate blocker |
| GAP-008 | P0 | All requirements | API-first direction is owner-approved, but runtime composition, route/schema details, API Management necessity, cache/failure semantics and privacy boundary are not frozen | Review `docs/architecture/ARCHITECTURE.md` and draft `docs/architecture/API-CONTRACT.md`; confirm catalogue-only requests, error/cache semantics, runtime services and costs | Architect/product owner + cloud/privacy owner | Direction resolved; contract/cost/privacy decisions remain open; no provisioning |

## High-priority verification gaps

| Gap ID | Priority | Requirement(s) | Gap | Evidence / decision required | Disposition |
|---|---:|---|---|---|---|
| GAP-009 | P1 | NFR-PERF-001 | p95 ≤1 s target lacks named device/browser and benchmark protocol | Record device/OS/browser, dataset, warm-up, repetitions and percentile calculation | T-PERF-001 is planned only |
| GAP-010 | P1 | NFR-ACC-001 | Browser versions, tooling and accessibility evidence format not recorded | Record versions, viewports, automated findings and manual keyboard/screen-reader checks | No conformance claim without evidence |
| GAP-011 | P1 | REQ-MAT-001 | Some programmes may require unsupported APS or subject-equivalence rules | Per-record rule representability review; unsupported rules stay UNKNOWN | Do not invent formula |
| GAP-012 | P1 | NFR-REL-001 | API-first introduces a network dependency; timeout/retry/cache/fallback and availability targets are not approved | Define bounded loading, stale-data, timeout/retry and API-failure behavior before implementation; never fabricate fallback data | No numeric network SLO assumed; resilience contract open |
| GAP-013 | P1 | REQ-APP-001 | Persistent tracker storage conflicts with approved privacy boundary | No action for current scope; formal change control and privacy/security approval required for future persistence | Persistence explicitly excluded |

## Conflict and duplication review

- Funding and tracker scope conflict: resolved by owner; both are intended MVP at P1 behind the P0 journey.
- Persistence conflict: resolved; both profile and tracker remain page-memory-only. No localStorage, sessionStorage, IndexedDB, cookies, server/database or cloud sync.
- Weighted preference score: excluded. Results group by eligibility state and use stable catalogue order; supported preference fit may be plain-language only.
- Architecture: API-first selected by D-044, superseding D-019's static-first selection. This does not approve sending learner inputs to an API; catalogue-only responses are the safe default pending OR-019/Q-018.
- Programme source: UJ 2027 prospectus selected as the starting source. Candidate records are research leads, not publication-ready data.
- Next steps: official links and neutral source-backed guidance only; no personalized task planner or predefined action taxonomy.
- Cost planner and AI/document assistant: deferred from initial MVP.
- National coverage: the catalogue is a 6–8-record pilot prioritising Gauteng; no comprehensive national claim.
- Test IDs, criteria and requirements do not prove implementation, tests, CI or release readiness.

## Gate assessment

- [x] Unique IDs/priorities assigned to nine functional requirements and eight NFRs.
- [x] Planned verification IDs assigned to each requirement.
- [x] Confirmed AC-FUND-001–009, AC-APP-001–009 and the OR-016 status lifecycle against the approved source documents.
- [ ] Complete 6–8 fully verified UJ-starting programme records and approve the subject vocabulary.
- [ ] Verify relationship evidence and 3–5 official funding records.
- [ ] Resolve API/profile privacy boundary, runtime/cost, provider retention/logging and network failure semantics.
- [ ] Add actual contract/UI paths, executable test paths and CI/release evidence.
- [ ] Execute required tests and retain results.

**Decision:** REQUIREMENTS READY NOT PASSED. GAP-001's starting-source choice and GAP-008's high-level architecture direction are resolved; catalogue evidence, subject vocabulary, relationships, funding records, privacy/runtime verification and final API contract remain open. No implementation code is included; no task is created for ambiguous behavior.


## UJ 2027 source reconciliation note — 2026-10-14

The catalogue register now records preliminary values from official UJ search-indexed prospectus text and current programme pages. They remain research leads only: do not load them into an eligibility evaluator as verified requirements. The older Academy undergraduate-courses page labels the extended CSI programme B2E01Q, whereas the indexed 2027 prospectus and current programme page label it B2E02Q. Treat the conflict as unresolved until the full applicable 2027 source/yearbook and official programme guidance are reconciled. GAP-001 remains open.


## Additional UJ catalogue source conflicts — 2026-10-14

Seven candidates are now documented as preliminary research leads. Two additional conflicts have been identified alongside the existing extended-CSI code conflict: (1) Diploma in Business Information Technology is labelled D1I40J in indexed 2027 prospectus text and DI1401 on the current programme page; (2) BCom in Information Management has different APS wording in the 2027 prospectus and current programme page. The current programme pages expose a 2026 application window, so their general metadata must not be assumed to fully establish 2027 requirements. GAP-001 remains open; no preliminary value is approved for definitive eligibility screening.


## Catalogue reconciliation matrix — 2026-10-14

Added [`UJ-2027-SOURCE-RECONCILIATION-MATRIX.md`](./UJ-2027-SOURCE-RECONCILIATION-MATRIX.md) to track official sources, candidate-level requirements, evidence gaps, source conflicts, curator checks and traceability. This improves evidence management but does not close GAP-001: original 2027 PDF tables still need visual/page-level verification, complete admission rules and APS calculations remain to be reviewed, and no candidate has curator sign-off. The Diploma Business IT code difference may be a search-extraction/OCR issue because the official 2027 CBE brochure and current programme page show DI1401; inspect the central prospectus table before concluding. The Information Management APS appears conditional in prospectus table text and requires original-table confirmation. GAP-001 remains P0/open.


## Pathway relationship evidence proposal — 2026-10-14

Added [`PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md`](./PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md) as a draft for GAP-003. It separates alternatives, related-field suggestions, progression and formal articulation; requires exact official-source provenance and curator sign-off; and prohibits inferring a relationship from similar titles or generic NQF rules alone. Official UJ admissions/regulations sources provide general context but do not approve a specific pair in the seven-programme pilot. No pair is approved, no learner-facing relationship should be published from this proposal, and planned tests T-REL-001–008 have not been implemented or run. GAP-003 remains open.
