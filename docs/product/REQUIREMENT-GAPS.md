# StudyPath SA — Requirement Gaps

**Status:** Open register for Phase 2. Ambiguous requirements are not implementation tasks.  
**Sources:** Approved PRD, acceptance criteria and OPEN-REQUIREMENTS.md.

## Blocking gaps

| Gap ID | Priority | Requirement(s) | Gap | Evidence / decision required | Owner | Disposition |
|---|---:|---|---|---|---|---|
| GAP-001 | P0 | REQ-CAT-001, NFR-DATA-001 | 6–8 publication-ready programme records are not verified; two UJ pages do not meet the catalogue target | Select real records and record official source, cycle, rule conditions, verification date, version and curator sign-off | Product owner/curator | Block definitive catalogue acceptance |
| GAP-002 | P0 | REQ-EXP-001 | Actual supported subject IDs and aliases are not defined in the reviewed baseline | Approve canonical names/IDs and explicit aliases; retain unsupported-subject behavior | Product owner/curator | Block P0-02; do not infer subjects |
| GAP-003 | P0 | REQ-ALT-001 | Verified pathway relationship set not evidenced | Record type, rationale, provenance, verification date and approval; explicit official articulation evidence | Product owner/curator | No verified alternative claim until records exist |
| GAP-004 | P0 | REQ-PRV-001, NFR-PRV-001 | Hosting metadata/retention and actual storage/network/telemetry behavior not independently inspected | Inspect host, provider retention, browser storage/network and dependencies; align privacy notice | Security/privacy + owner | Public learner-input demo blocked until verified; synthetic-only remains |
| GAP-005 | P0 | REQ-FUND-001 | Required 3–5 current official-source funding records not verified | Curate criteria, document checklist metadata, published coverage/amount, deadline/timezone, cycle, verification/version/sign-off | Product owner/curator | P1 funding blocked on records |
| GAP-006 | P0 | REQ-APP-001 | Exact normalized status-transition table must be cross-checked against PRD and OR-016 | Publish allowed/denied transitions and map each to cases before tracker implementation | Product owner/QA | Do not implement transitions yet |
| GAP-007 | P0 | REQ-FUND-001, REQ-APP-001 | Exact AC-FUND and AC-APP ID ranges/content are not verified in this matrix pass | Check full acceptance-criteria file and correct references in all artifacts | QA/documentation owner | Traceability provisional until confirmed |
| GAP-008 | P0 | All requirements | No API/interface contract or frozen component boundary exists; PRD does not require an API architecture | Decide client-only/static vs networked boundary in architecture; freeze interfaces/contracts before dependent implementation | Architect/product owner | Do not invent endpoints or assume backend |

## High-priority verification gaps

| Gap ID | Priority | Requirement(s) | Gap | Evidence / decision required | Disposition |
|---|---:|---|---|---|---|
| GAP-009 | P1 | NFR-PERF-001 | p95 ≤1 s target lacks named device/browser and benchmark protocol | Record device/OS/browser, dataset, warm-up, repetitions and percentile calculation | T-PERF-001 is planned only |
| GAP-010 | P1 | NFR-ACC-001 | Browser versions, tooling and accessibility evidence format not recorded | Record versions, viewports, automated findings and manual keyboard/screen-reader checks | No conformance claim without evidence |
| GAP-011 | P1 | REQ-MAT-001 | Some programmes may require unsupported APS or subject-equivalence rules | Per-record rule representability review; unsupported rules stay UNKNOWN | Do not invent formula |
| GAP-012 | P1 | NFR-REL-001 | Numerical timeout/retry/availability targets intentionally not set before any network service is approved | If architecture introduces network dependency, define behavior before contract/implementation | No numeric network SLO assumed |
| GAP-013 | P1 | REQ-APP-001 | Persistent tracker storage conflicts with approved privacy boundary | No action for current scope; formal change control and privacy/security approval required for future persistence | Persistence explicitly excluded |

## Conflict and duplication review

- Funding and tracker scope conflict: resolved by owner; both are intended MVP at P1 behind the P0 journey.
- Persistence conflict: resolved; both profile and tracker remain page-memory-only. No localStorage, sessionStorage, IndexedDB, cookies, server/database or cloud sync.
- Weighted preference score: excluded. Results group by eligibility state and use stable catalogue order; supported preference fit may be plain-language only.
- Next steps: official links and neutral source-backed guidance only; no personalized task planner or predefined action taxonomy.
- Cost planner and AI/document assistant: deferred from initial MVP.
- National coverage: the catalogue is a 6–8-record pilot prioritising Gauteng; no comprehensive national claim.
- Test IDs, criteria and requirements do not prove implementation, tests, CI or release readiness.

## Gate assessment

- [x] Unique IDs/priorities assigned to nine functional requirements and eight NFRs.
- [x] Planned verification IDs assigned to each requirement.
- [ ] Confirm funding/tracker acceptance-criteria references and status transitions.
- [ ] Resolve P0 data, privacy, and interface-boundary gaps.
- [ ] Add actual contract/UI paths, executable test paths and CI/release evidence.
- [ ] Execute required tests and retain results.

**Decision:** REQUIREMENTS READY NOT PASSED. No implementation code is included; no task is created for ambiguous behavior.
