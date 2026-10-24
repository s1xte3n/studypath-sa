## APS calculator traceability — issue #189 (2026-10-24)

| Requirement slice | Contract / implementation | Tests | Evidence and remaining gate |
|---|---|---|---|
| Explainable provisional UJ 2027 APS | `src/domain/eligibility/provisional-aps.mjs`; learner panel in `src/main.jsx`; responsive/theme styles in `src/styles.css`; source link/version and printed page disclosed | `tests/provisional-aps.test.mjs`; `tests/e2e/student-form.spec.mjs` APS scenario | Implemented on branch `feat/189-provisional-aps-calculator`; CI not yet run. Draft source and curator review remain open. |
| Six-subject selection safety | Exactly six distinct non-LO subjects may produce a provisional total; <6 returns UNKNOWN; >6 returns UNKNOWN and does not select subjects automatically | Unit tests for exact-six, <6, >6, Life Orientation, duplicates and invalid marks; browser test verifies >6 state | This intentionally deviates from the issue's original “six highest” wording because `docs/product/uj-2027-pilot-catalogue-draft.json` marks the applicable selection rule unresolved. Do not resolve by inference. |
| Eligibility separation | APS panel explicitly says it does not determine programme eligibility; existing draft catalogue publication gate remains unchanged | Browser test asserts pathway cards remain UNKNOWN when an APS estimate is visible | Requires CI evidence on PR head; G-SYN-001 remains OPEN / NOT PASSED. |

## Current implementation reconciliation — 2026-10-22

This section supplements the broader requirements traceability plan below. The historical matrix includes requirements for the intended API-first product and future authenticated scope; its planned test IDs are not proof that those features exist. For current local-demo status, use the latest gate and status records.

**Reviewed baseline:** `aa43b783ecb97aa3dac8f1ed18ebe727e5231e41` on `main`. The project owner supplied exact-commit CI output for [browser E2E/privacy/accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39681570939), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39681570917), and [browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39681571109). This evidence is owner-supplied and was not independently rerun here.

| Requirement / current slice | Current contract/UI and implementation | Executed-test / CI evidence | Remaining gap / disposition |
|---|---|---|---|
| REQ-EXP-001 — synthetic student input | `src/main.jsx`; `src/domain/student-input-validation.mjs`; supported stages and subject/whole-number mark input | `tests/e2e/student-form.spec.mjs` exercises valid entry, invalid marks, row editing and reset; browser workflow linked above | No interests/preferences input in the current UI; full PRD breadth not implemented. |
| REQ-MAT-001 — explainable eligibility state | `src/domain/pathway-matching.mjs` calls deterministic UJ evaluator; `src/main.jsx` renders state, reason, limitation and source link | `tests/pathway-matching.test.mjs` asserts draft results stay UNKNOWN even with strong marks; E2E asserts seven UNKNOWN cards | Catalogue remains draft, governing prospectus/version and some rules unresolved, curator sign-off absent. Do not claim definitive eligibility or mark this requirement fully passed. |
| REQ-CAT-001 / NFR-DATA-001 — sourced catalogue | `docs/product/uj-2027-pilot-catalogue-draft.json`; records include source evidence and unresolved fields | Browser E2E checks result cards and source links are present; current CI link above | Source completeness, authoritative version reconciliation, freshness and curator approval remain blocked. |
| REQ-PRV-001 / NFR-PRV-001 — memory-only demo | React component state; privacy notice says values are not sent or saved across reload; browser instrumentation in `tests/e2e/student-form.spec.mjs` | Browser E2E/privacy workflow above | Test evidence covers selected instrumented channels only; no hosting/provider log, external analytics, legal/privacy review or deployment boundary audit. |
| REQ-UX-001 / NFR-ACC-001 — accessible responsive journey | Labels, live status, focus styles and responsive styles in `src/main.jsx` / `src/styles.css` | E2E includes axe scan, keyboard focus and 320px viewport checks | Manual keyboard and responsive review not evidenced. |
| REQ-APP-001 — application tracker | No learner-facing tracker implementation identified in current `src/main.jsx` | No current tracker test evidence identified | Not implemented in this local demo; remains out of the current vertical slice. |
| REQ-FUND-001 — funding discovery | No funding matching flow identified in current `src/main.jsx` | No current funding-flow test evidence identified | Not implemented in this local demo; candidate records remain research-only. |
| REQ-AUTH-001 — authenticated features | No authenticated account/profile flow in current local demo | Not in the current browser MVP workflows | Future/gated scope; not part of this synthetic-only demo. |
| API/runtime and deployment | Local browser demo; no verified hosted API runtime or deployed service identified by this evidence | Contract workflow passed on the reviewed commit | Contract tests are not runtime integration or deployment evidence. No cloud provisioning/deployment approval. |

**Evidence rule:** exact-commit workflow results support only the named workflows. They do not prove every planned test ID passed, all requirements are implemented, or a release is approved. Maintain the chain Requirement ID → UI/API contract → executable test → implementation → CI run/commit → release evidence; use `Not evidenced` where a link in the chain is missing.

---

## Current CI evidence update — 2026-10-22

For commit `aa43b783ecb97aa3dac8f1ed18ebe727e5231e41` on `main`, the project owner supplied output from `gh run list --commit` showing these workflows completed successfully:

- [Browser E2E, privacy and accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39681570939)
- [Contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39681570917)
- [Browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39681571109)

This is exact-commit CI evidence for the three named workflows, supplied by the repository owner. It does **not** fill every row's implementation/test/release evidence fields, prove that all planned requirements are implemented, or establish a deployment/release. Requirement-level traceability and release approval remain open. No independent workflow rerun is claimed.

---

# Gate classification update — 2026-10-14

The matrix below remains a traceability plan, not proof of implementation. For gate purposes, distinguish requirements completeness from data publication, architecture/API approval, implementation, CI and release. Open catalogue conflicts (GAP-001) and the absence of a verified relationship pair (GAP-003) do not make the requirements ambiguous: the safe contract is to withhold unsupported records/relationships and report uncertainty/no verified alternative. GAP-002's owner-approved subject-v1 decision and executable reference test file have been found in the repository; test execution and production implementation remain unverified. GAP-005 is P1 and does not block P0 requirements readiness. GAP-004 and GAP-008 remain downstream architecture/implementation/release blockers as classified in REQUIREMENT-GAPS.md.

**Evidence placeholders:** implementation paths/symbols, executed test results, CI run IDs/URLs, tested commit, deployment URL, smoke tests and release approval remain Not verified / Not available. Do not fill them with planned IDs or owner approval.

---
# StudyPath SA — Traceability Matrix

**Status:** Planned traceability baseline. D-044 selects API-first; draft contract exists. Historical subject-catalogue reference tests passed on PR #56 (run [38643577867](https://github.com/s1xte3n/studypath-sa/actions/runs/38643577867), commit `ee2181e62786176ab2c353ad4e112bd309672dbb`). The documentation-only PR #79 contract-test workflow also passed on PR head `a6e3d2378595049c340f5654ece5ee6a723327d2` (run [#52](https://github.com/s1xte3n/studypath-sa/actions/runs/38785826810)); no workflow result was returned for merge commit `f3fdc009f19600abc6830fd1af1752c1ff633149`. These are limited contract-suite results, not application build/journey, runtime privacy or release verification.  
**Chain:** Requirement → contract/UI → test ID → implementation area → CI/release evidence.

**Scope applicability:** D-044/D-045 define the intended API-first tiered architecture; D-046 records the approved but gated authenticated feature extension; D-047 limits the current verification slice to a local synthetic-only browser demo. The local demo does not require a hosted API, and no learner-specific input/result/tracker data may be transmitted or persisted. Authenticated acceptance criteria remain future/gated requirements, not current demo implementation evidence. See [MVP Scope Reconciliation](MVP-SCOPE-RECONCILIATION-D-044-D-047.md).

| Requirement | PRD / acceptance source | Contract or UI | Test IDs | Expected implementation area (unverified) | CI evidence | Release evidence |
|---|---|---|---|---|---|---|
| REQ-EXP-001 | PRD §5; AC-EXP-001–014; draft subject contract | Anonymous explorer form; owner-approved subject-catalogue-v1 contract; reference tests exist | T-EXP-001–006, T-SUB-001–012 | Form, subject dictionary, validation, memory state | T-SUB-001–012 reference tests passed in GitHub Actions run [38643577867](https://github.com/s1xte3n/studypath-sa/actions/runs/38643577867), PR #56; application tests not present/verified | Owner-approved v1 has no aliases; production implementation and runtime evidence unavailable |
| REQ-CAT-001 | PRD §5; AC-CAT-001–012; draft API contract | API catalogue response/source fields; client adapter; empty/stale state | T-CAT-001–005, T-API-001–002, T-API-004, T-NFR-001 | Curated source data, API adapter, catalogue validator | Not available | 6–8 reviewed records not evidenced; API contract/cost/privacy review open |
| REQ-MAT-001 | PRD §5; AC-MAT-001–021 | Eligibility result/reason model; no API frozen | T-MAT-001–008, T-NFR-002–003 | Deterministic evaluator, composite rules, reasons, stable ordering | Not available | Golden set not executed |
| REQ-ALT-001 | PRD §5; AC-ALT-001–007; draft pathway relationship contract | Relationship type, rationale, official source, cycle, freshness and curator sign-off | T-ALT-001–002, T-REL-001–008 | Reviewed relationship data and alternatives UI | Not available | No specific relationship approved; exact pair evidence/sign-off outstanding |
| REQ-DET-001 | PRD §5; AC-DET-001–007 | Detail/source links/not-found state and source-backed next-step guidance | T-DET-001–006 | Detail view and source-link handling | Not available | Not available |
| REQ-PRV-001 | PRD §5; AC-PRV-001–013; D-044/Q-018 | Privacy notice, reset, catalogue-only API requests; no profile in URL/storage/network/logs | T-PRV-001–006, T-API-003 | Memory state, API request inspection, telemetry/dependency controls, hosting review | Not available | Privacy verification not available |
| REQ-UX-001 | PRD §5; AC-UX-001–011 | Responsive journey, loading/empty/error states | T-UX-001–005, T-PERF-001, T-NFR-005 | UI patterns, semantic controls, recoverable errors | Not available | Accessibility evidence not available |
| REQ-FUND-001 | PRD §5; AC-FUND-001–009; draft API contract | Public funding catalogue data; matching uses only approved limited client inputs | T-FUND-001–006, T-API-001–002, T-API-004 | Funding records, API adapter and client-side matching | Not available | 3–5 reviewed records not available; API boundary open |
| REQ-APP-001 | PRD §5; OR-016; AC-APP-001–009 | Tracker fields/status lifecycle; memory-only | T-APP-001–006 | In-memory tracker and transition validation | Not available | Lifecycle/AC mapping cross-checked in planning; implementation and tests unavailable |
| REQ-AUTH-001 (future scope; not D-047 demo) | PRD §5; D-046/D-048; AC-AUTH-001–016 | Authenticated API/identity, authorization/isolation, opt-in profile lifecycle, saved items, comparison and dashboard; contracts pending Q-018/Q-020 | T-AUTH-001–018, T-PRV-001–006, T-API-001–004 | Future authenticated boundary and lifecycle controls | Not available | Not authorized for implementation; contracts, privacy/security, tests and cost remain open |
| NFR-SEC-001 | PRD §6 | Build/hosting/network boundary | T-SEC-001, T-API-004 | Build configuration and any network boundary | Not available | Not available |
| NFR-PRV-001 | PRD §6; OR-006 | Storage/network/log/telemetry inspection | T-PRV-001–006, T-API-003 | Storage, network, logging, hosting review | Not available | Release blocker until evidenced |
| NFR-DATA-001 | PRD §6; OR-005/008 | Requirement/source metadata | T-CAT-001, T-CAT-004–005, T-MAT-005, T-MAT-008, T-NFR-001 | Catalogue validation/evaluator | Not available | Not available |
| NFR-REL-001 | PRD §6; draft API contract | Bounded API loading/timeout, empty/error/stale states; no fabricated fallback | T-CAT-002, T-UX-004, T-API-002 | API adapter and failure-state behavior | Not available | Timeout/retry/cache targets not approved |
| NFR-ACC-001 | PRD §6 | All learner-facing UI | T-UX-001–003, T-UX-005 | Responsive and accessible UI | Not available | Not available |
| NFR-PERF-001 | PRD §6; OR-012 | In-browser matching/results | T-PERF-001 | Evaluator and benchmark harness | Not available | Device/protocol/results not available |
| NFR-COMP-001 | PRD §6 | Results/funding/details copy | T-COMP-001 | Content review | Not available | Not available |
| NFR-SCOPE-001 | PRD §6; OR-008 | Catalogue scope disclosure | T-CAT-003 | Catalogue and UX copy | Not available | Not available |

## Cross-cutting acceptance criteria traceability

| Acceptance criterion | Requirement(s) | Evidence status |
|---|---|---|
| AC-NFR-001 | REQ-CAT-001, REQ-MAT-001, NFR-DATA-001 | Planned source/provenance audit; not executed |
| AC-NFR-002 | REQ-MAT-001, NFR-DATA-001 | Planned golden-set gate; not executed |
| AC-NFR-003 | REQ-CAT-001, REQ-MAT-001, REQ-PRV-001, NFR-REL-001, NFR-PRV-001 | Cross-cutting assertion rule; implementation and evidence unavailable |
| AC-NFR-004 | All in-scope requirements | Evidence-governance rule; not a standalone product requirement |
| AC-NFR-005 | REQ-UX-001, NFR-ACC-001 | Usability evidence/limitation record not available |
| AC-COST-FUT-001–005 | OR-017 | Deferred future-scope criteria; not initial-MVP gates |
| AC-AI-FUT-001–005 | OR-018 | Deferred future-scope criteria; not initial-MVP gates |

## Planned test ID registry

| Test ID | Requirement(s) | Verification intent | Priority |
|---|---|---|---:|
| T-EXP-001 | REQ-EXP-001 | Valid required fields and study-stage options | P0 |
| T-EXP-002 | REQ-EXP-001 | Mark boundaries 0/100; reject decimal, negative, >100, malformed/missing without coercion | P0 |
| T-EXP-003 | REQ-EXP-001 | Reject unapproved aliases; detect duplicate canonical subjects; keep unsupported subjects unresolved | P0 |
| T-EXP-004 | REQ-EXP-001, REQ-PRV-001 | Optional fields blank and no identity requirement | P0 |
| T-EXP-005 | REQ-EXP-001 | Grade 11/12 marks are current results; recent matric graduate missing results are not inferred | P0 |
| T-EXP-006 | REQ-EXP-001, REQ-PRV-001 | Safe failure messages; reset/leave clears temporary inputs and results | P0 |
| T-SUB-001 | REQ-EXP-001 | Trim/collapse whitespace and resolve an exact canonical label; return the canonical display label | P0 |
| T-SUB-002 | REQ-EXP-001 | Case variation of an exact canonical label resolves to the same ID | P0 |
| T-SUB-003 | REQ-EXP-001 | Unapproved abbreviations and aliases remain unresolved | P0 |
| T-SUB-004 | REQ-EXP-001 | Mathematics, Mathematical Literacy and Technical Mathematics remain distinct | P0 |
| T-SUB-005 | REQ-EXP-001 | Physical Sciences and Technical Sciences remain distinct | P0 |
| T-SUB-006 | REQ-EXP-001 | English Home Language, First Additional Language and Second Additional Language remain distinct | P0 |
| T-SUB-007 | REQ-EXP-001 | Duplicate resolved subject IDs are detectable in a subject set | P0 |
| T-SUB-008 | REQ-EXP-001 | Unsupported input does not select an arbitrary mapping | P0 |
| T-SUB-009 | REQ-EXP-001 | Non-string subject input remains unresolved | P0 |
| T-SUB-010 | REQ-EXP-001 | Catalogue-version mismatch remains unresolved | P0 |
| T-SUB-011 | REQ-EXP-001, REQ-PRV-001 | Reference normalizer output omits the raw input label; runtime egress still requires T-PRV-002/003 | P0 |
| T-SUB-012 | REQ-EXP-001, REQ-MAT-001 | Generic/unsupported English label remains unresolved; programme-level UNKNOWN requires evaluator tests | P0 |
| T-CAT-001 | REQ-CAT-001, NFR-DATA-001 | Source/cycle/freshness/version/sign-off completeness | P0 |
| T-CAT-002 | REQ-CAT-001, NFR-REL-001 | Missing, stale, conflicting or wrong-cycle rule cannot create certainty | P0 |
| T-CAT-003 | REQ-CAT-001, NFR-SCOPE-001 | Empty state and no national-completeness claim | P0 |
| T-CAT-004 | REQ-CAT-001, NFR-DATA-001 | Unavailable, moved or inaccessible official source blocks publication/confident use | P0 |
| T-CAT-005 | REQ-CAT-001, NFR-DATA-001 | Audit the 6–8-record pilot threshold and required record metadata before publication | P0 |
| T-MAT-001 | REQ-MAT-001 | All applicable mandatory rules are verified and met before ELIGIBLE is returned | P0 |
| T-MAT-002 | REQ-MAT-001 | A confirmed mandatory failure yields NOT_ELIGIBLE under the approved precedence rules | P0 |
| T-MAT-003 | REQ-MAT-001 | Missing, unsupported or materially unknown rule/input produces UNKNOWN unless a confirmed mandatory failure controls | P0 |
| T-MAT-004 | REQ-MAT-001 | AND/OR/conditional precedence; known failure plus unknown | P0 |
| T-MAT-005 | REQ-MAT-001, NFR-DATA-001 | APS/points method, subject inclusion and source conflicts do not produce unsupported certainty | P0 |
| T-MAT-006 | REQ-MAT-001 | Same inputs and catalogue version produce the same state, reasons and stable ordering | P0 |
| T-MAT-007 | REQ-MAT-001, NFR-COMP-001 | Preferences/ranking never upgrade or override eligibility; no weighted score or guarantee | P0 |
| T-MAT-008 | REQ-MAT-001, NFR-DATA-001 | Reasons trace to input/rule/source/cycle; ELIGIBLE requires a complete verified applicable rule set | P0 |
| T-ALT-001 | REQ-ALT-001 | Verified relationship type/rationale/source required | P0 |
| T-ALT-002 | REQ-ALT-001 | No invented alternative/articulation without evidence | P0 |
| T-REL-001 | REQ-ALT-001 | Reject relationship with missing source or unresolved programme IDs | P0 |
| T-REL-002 | REQ-ALT-001 | ARTICULATION requires explicit evidence naming both qualifications and conditions | P0 |
| T-REL-003 | REQ-ALT-001 | Generic NQF progression language alone cannot approve a named programme pair | P0 |
| T-REL-004 | REQ-ALT-001, REQ-MAT-001 | Relationship never changes independent eligibility state | P0 |
| T-REL-005 | REQ-ALT-001, NFR-DATA-001 | Expired/conflicting/unreviewed evidence is not shown as verified | P0 |
| T-REL-006 | REQ-ALT-001, NFR-COMP-001 | Learner-facing copy distinguishes exploration from formal progression/articulation | P0 |
| T-REL-007 | REQ-ALT-001, NFR-DATA-001 | Relationship requires provenance, review date and curator sign-off before publication | P0 |
| T-REL-008 | REQ-ALT-001, REQ-PRV-001 | Relationship/catalogue API contains no learner profile values | P0 |
| T-DET-001 | REQ-DET-001 | Detail fields, unknown values and official links | P0 |
| T-DET-002 | REQ-DET-001 | Missing/unavailable fields remain unknown; no unsupported field values | P0 |
| T-DET-003 | REQ-DET-001, NFR-DATA-001 | Displayed requirement/deadline details include applicable source and cycle provenance | P0 |
| T-DET-004 | REQ-DET-001 | Official next-step links match the recorded source URL | P0 |
| T-DET-005 | REQ-DET-001 | Unknown catalogue ID produces a recoverable not-found state | P0 |
| T-DET-006 | REQ-DET-001, NFR-COMP-001 | Detail copy does not imply admission confirmation or guarantee | P0 |
| T-PRV-001 | REQ-PRV-001, NFR-PRV-001 | Browser storage inspection finds no profile values in persistent storage | P0 |
| T-PRV-002 | REQ-PRV-001, NFR-PRV-001 | Network requests exclude learner profile values and unrelated third-party egress | P0 |
| T-PRV-003 | REQ-PRV-001, NFR-PRV-001 | Product URLs, query strings and referrers exclude profile values | P0 |
| T-PRV-004 | REQ-PRV-001, NFR-PRV-001 | Application logs, client error reports and telemetry exclude profile values | P0 |
| T-PRV-005 | REQ-PRV-001 | Reset/navigation/reload clears temporary state and does not restore prior values | P0 |
| T-PRV-006 | REQ-PRV-001 | Privacy notice and actual hosting/provider metadata and retention practices are reviewed | P0 |
| T-UX-001 | REQ-UX-001, NFR-ACC-001 | Layout and controls remain usable at 320 CSS px | P0 |
| T-UX-002 | REQ-UX-001, NFR-ACC-001 | Keyboard operation, visible focus, contrast and non-colour-only status | P0 |
| T-UX-003 | REQ-UX-001, NFR-ACC-001 | Inputs have programmatic labels; validation errors are associated and understandable | P0 |
| T-UX-004 | REQ-UX-001, NFR-REL-001 | Loading, empty, validation, not-found and failure states are clear and recoverable | P0 |
| T-UX-005 | REQ-UX-001, NFR-ACC-001 | Supported browser/version matrix is recorded; unavailable browsers are disclosed | P0 |
| T-FUND-001 | REQ-FUND-001 | Explainable funding match using approved limited inputs | P1 |
| T-FUND-002 | REQ-FUND-001 | Missing/expired/conflicting criteria/deadline uncertainty | P1 |
| T-FUND-003 | REQ-FUND-001, REQ-PRV-001 | Unknown criteria are disclosed; no sensitive inputs or award guarantee | P1 |
| T-FUND-004 | REQ-FUND-001 | Expired or stale opportunity is excluded from current definitive matches | P1 |
| T-FUND-005 | REQ-FUND-001 | Empty/no-match state is honest and does not fabricate an opportunity | P1 |
| T-FUND-006 | REQ-FUND-001, REQ-PRV-001 | Inputs are limited to approved non-sensitive fields | P1 |
| T-APP-001 | REQ-APP-001 | Create/list/edit and validate permitted tracker fields | P1 |
| T-APP-002 | REQ-APP-001 | Allowed and rejected status transitions | P1 |
| T-APP-003 | REQ-APP-001 | Terminal statuses reject further transitions; a new attempt requires a new entry | P1 |
| T-APP-004 | REQ-APP-001 | Invalid update is rejected without falsely reporting success; fields follow the approved schema | P1 |
| T-APP-005 | REQ-APP-001, REQ-PRV-001 | Reset/delete clears active tracker entries; tracker values are not exposed in telemetry | P1 |
| T-APP-006 | REQ-APP-001, REQ-PRV-001 | Page-memory-only lifecycle: no browser/server persistence or sync; reload does not restore | P1 |
| T-SEC-001 | NFR-SEC-001 | No client secrets, HTTPS-only requests, trusted input boundary | P0 |
| T-PERF-001 | NFR-PERF-001 | Repeat benchmark on agreed device/browser, report p95 and environment | P1 |
| T-COMP-001 | NFR-COMP-001 | Copy review for no admission/funding guarantee | P0 |
| T-NFR-001 | REQ-CAT-001, NFR-DATA-001 | Audit source and verification metadata for every rule used for eligibility | P0 |
| T-NFR-002 | REQ-MAT-001 | Versioned 20+ case synthetic golden set; expected outcomes match with zero false-positive ELIGIBLE | P0 |
| T-NFR-003 | REQ-MAT-001, REQ-PRV-001, REQ-UX-001 | Assertions cover displayed state, reasons, sources, privacy boundary and failure states, not just HTTP status or appearance | P0 |
| T-NFR-004 | All requirements | Evidence audit: no criterion is marked passed without executed test/review evidence | P0 |
| T-NFR-005 | REQ-UX-001 | Usability review with five representative users if available; otherwise document unavailability and actual evidence | P1 |

Test IDs are design identifiers only. Add executable test paths, commands, CI run IDs/URLs, commit SHA and release evidence when available. Never infer success from a 2xx response or documentation alone.


## API-first verification additions (planned only)

| Test ID | Requirement(s) | Verification intent | Priority |
|---|---|---|---:|
| T-API-001 | REQ-CAT-001, REQ-FUND-001, NFR-DATA-001 | Validate catalogue response schema and required source/cycle/version/freshness/sign-off metadata | P0 |
| T-API-002 | NFR-REL-001, REQ-UX-001 | API timeout, unavailable, malformed, stale and empty responses produce bounded, honest recoverable UI states | P0 |
| T-API-003 | REQ-PRV-001, NFR-PRV-001 | Inspect requests and confirm no marks, subjects, interests, match results or tracker entries are transmitted | P0 |
| T-API-004 | NFR-SEC-001, NFR-DATA-001 | Confirm HTTPS, no client secrets, approved public catalogue fields and preserved provenance | P0 |

These IDs are proposed verification targets, not executed tests. Confirm against the final contract before implementation.


## Contract-proposal test traceability — 2026-10-14

The merged subject and pathway documents define additional **planned** tests. These IDs extend the verification registry; they do not mean implementation exists or tests have run.

| Test family | Contract | Requirements/gap | Gate condition |
|---|---|---|---|
| T-SUB-001–012 | [Subject catalogue v1](SUBJECT-CATALOGUE-V1.md) | REQ-EXP-001, REQ-MAT-001, REQ-CAT-001, REQ-PRV-001; GAP-002 | Reference-test IDs now align to the checked-in Node test cases. These tests cover normalization only; evaluator UNKNOWN semantics, duplicate rejection, runtime egress, and real dictionary refresh need separate tests/evidence. |
| T-REL-001–008 | [Pathway relationship evidence contract](PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md) | REQ-ALT-001, REQ-MAT-001, REQ-PRV-001; GAP-003 | Approve evidence threshold and curator workflow; verify each named pair before publication; then add executable tests. |

**Verification state (historical evidence, 2026-10-14):** the checked-in Node.js subject-catalogue reference tests T-SUB-001–012 ran successfully in GitHub Actions run [38643577867](https://github.com/s1xte3n/studypath-sa/actions/runs/38643577867) for PR #56 at commit `ee2181e62786176ab2c353ad4e112bd309672dbb`. PH2-002 aligns the documented IDs to the cases in that suite. Check the PR's current head commit for CI status; historical CI evidence must not be treated as verification of a later revision. The suite is a reference normalizer, not production application or runtime privacy verification. Application/build, privacy/network, accessibility, catalogue publication, deployment, smoke-test and release evidence remain unavailable. Privacy/network tests remain release blockers.


## A3 owner decision traceability — D-048 (2026-10-15)

| Decision | Requirements / acceptance criteria | Planned verification | Disposition and evidence boundary |
|---|---|---|---|
| D-048 — authenticated-feature boundary accepted | D-046; REQ-AUTH-001; AC-AUTH-001–016; AC-APP-001–009 for page-memory-only tracker | T-AUTH-001–018, T-PRV-001–004, T-API-001–004 and G-SYN-001 privacy canaries remain planned until contracts and implementation are ready | Owner approval recorded in PR #74 and docs/project/DECISIONS.md. Five authenticated features remain future scope, excluded from current local demo; profile persistence requires separate opt-in; tracker remains page-memory-only. This is decision evidence only, not test execution, runtime privacy verification, implementation, or release evidence. Exact contracts remain in Q-018 / Phase 3 and Q-020. |


## Cross-screen quality review addendum — 2026-10-24

**Reviewed baseline:** `d027fe6efab3c4c746ad79de03284ddf3d6cca91` (PR #193 merge). This repository review found existing browser coverage for the primary journey, draft-catalogue UNKNOWN disclosure, reset, shortlist/tracker lifecycle, selected privacy channels, keyboard focus, 320px layout, axe critical/serious findings in light/dark themes, and dark-theme contrast.

| Test ID | Requirement(s) | New regression coverage proposed in PR #194 | Evidence status |
|---|---|---|---|
| T-EXP-002 | REQ-EXP-001 | Fractional, negative, blank, and >100 browser marks must block results and associate an error with the mark field | Added to Playwright spec; awaiting CI |
| T-EXP-003 | REQ-EXP-001 | Duplicate canonical subjects must be rejected before evaluation | Added to Playwright spec; awaiting CI |
| T-UX-003 | REQ-UX-001, NFR-ACC-001 | Missing stage must expose field-specific invalid state and error association | Added to Playwright spec; awaiting CI |
| T-UX-001 | REQ-UX-001, NFR-ACC-001 | Desktop viewport (1440 CSS px) must show results without document horizontal overflow | Added to Playwright spec; awaiting CI |

Automation is not manual accessibility certification. Manual keyboard/screen-reader checks, actual-device review, full privacy/provider review, and candidate-commit verification remain outstanding. The UJ draft catalogue remains fail-closed to UNKNOWN; G-SYN-001 remains NOT PASSED.



## Core journey state consistency — PR #161 follow-up (2026-10-24)

- **Requirement:** A change to the current learner profile must invalidate prior results and any profile-specific shortlist/tracker state, so saved options and notes cannot silently carry across profiles.
- **Regression test:** `tests/e2e/student-form.spec.mjs` — `editing a learner profile clears its saved pathways and tracker notes`.
- **Evidence status:** Test added on branch `fix/161-clear-stale-pathway-state`; awaiting PR CI. This is not yet a passed test or merged implementation.
- **Privacy boundary:** State remains in React page memory only; no persistence or network feature is introduced.


## Discovery dashboard requirement — issue #184

| Requirement | UI/domain contract | Test/evidence | Status |
|---|---|---|---|
| DISC-001 — profile completeness | `src/domain/discovery-summary.mjs`; two required sections: selected stage (50%) and at least one unique subject with whole-number mark 0–100 (50%); optional extra rows do not reduce completeness | `tests/discovery-summary.test.mjs`; `tests/e2e/discovery-dashboard.spec.mjs` | Implemented on PR branch; CI evidence pending |
| DISC-002 — state-derived candidate counts and filters | Counts derive from current `results`; total catalogue candidates remain separate from visible filtered count; state counts describe only visible results; eligibility and available campus filters | Same unit and E2E test files | Implemented on PR branch; CI evidence pending |
| DISC-003 — draft catalogue uncertainty | No matching rule changed; status filter uses the result's existing state and the draft catalogue remains UNKNOWN | Existing pathway-matching golden cases plus new dashboard tests | Must remain UNKNOWN until catalogue approval gate passes |
| DISC-004 — accessible empty state and responsive layout | Labelled controls, visible empty-state recovery, clear-filters action, theme-aware styles and 320px E2E check | `tests/e2e/discovery-dashboard.spec.mjs` | Automated CI pending; manual accessibility review remains separate |

The dashboard is a summary of the current in-memory result set only. It adds no persistence, network transmission, account, telemetry, backend or new dependency.


## Issue #185 — cross-screen regression pass (2026-10-24)

**Reviewed main SHA:** `b0fb8aa7c046e5317d55fba990a31a4e724bd079` (merge of PR #196).

| Requirement | Implementation / contract | Test ID / evidence | Status |
|---|---|---|---|
| UX-185-01 — invalid learner input is field-associated | `src/main.jsx` maps duplicate-subject and supported-subject validation to `aria-invalid` / `aria-describedby` fields | `tests/e2e/student-form.spec.mjs`: duplicate subjects, mark boundaries, missing stage and reset regression cases | Implemented on PR branch; CI pending |
| UX-185-02 — responsive layout remains usable | Existing 320px check plus desktop result-card overflow regression | `tests/e2e/student-form.spec.mjs` | Implemented on PR branch; CI pending |
| PRV-185-01 — transient learner state remains page-memory only | Existing privacy instrumentation, URL/storage/reload checks, and reset lifecycle coverage reused | Existing `no learner entries are transmitted or persisted across reload` test and related E2E cases | Existing automated scope retained; external/provider logs and uninstrumented channels not verified |
| ACC-185-01 — theme and accessibility regressions | Existing axe scans in light/dark themes, keyboard focus and contrast checks reused | Existing E2E suite | Automated CI pending on candidate branch; manual screen-reader review not performed |

Automated coverage is not a complete manual accessibility or privacy audit. Current draft-catalogue results must remain `UNKNOWN`; G-SYN-001 remains OPEN / NOT PASSED.


## Three-pillar differentiation reconciliation — 2026-10-24

Product direction and scope mapping: [THREE-PILLAR-DIFFERENTIATION.md](THREE-PILLAR-DIFFERENTIATION.md). This is a proposed positioning hypothesis, not proof of uniqueness or implementation completion.

| Pillar | Existing requirement / issue | Current implementation evidence | Remaining gap / disposition |
|---|---|---|---|
| 1. What can I do with my actual marks? | `REQ-EXP-001`, `REQ-MAT-001`; issues [#161](https://github.com/s1xte3n/studypath-sa/issues/161), [#187](https://github.com/s1xte3n/studypath-sa/issues/187), [#189](https://github.com/s1xte3n/studypath-sa/issues/189) | Existing input and deterministic adapter journey; source-backed APS is tracked separately | APS rules need source confirmation; UJ catalogue and curator approval remain draft/blocked; do not upgrade UNKNOWN results. |
| 2. If I do not qualify, what other route can I take? | `REQ-ALT-001`, `AC-ALT-001–007`; related catalogue issue [#187](https://github.com/s1xte3n/studypath-sa/issues/187) and comparison issue [#186](https://github.com/s1xte3n/studypath-sa/issues/186) | Requirements and target UX describe alternatives; no approved relationship pair / complete alternatives UI is evidenced | Implement explicit relationship data and alternatives UI only after authoritative source review and curator sign-off. If no verified alternative exists, say so; do not infer progression. |
| 3. What do I do next? | `REQ-APP-001`, `REQ-FUND-001`; target UX includes manual tracking | Traceability states the current local demo has no learner-facing tracker or funding flow | Manual tracker is deferred from the current balanced sprint; funding discovery is not implemented. Define and test a page-memory-only tracker; add deadlines/funding only from authoritative, dated sources. |

All three pillars must preserve synthetic-only demo data, no application submission, no admission/funding guarantees, and no unverified facts. Add implementation paths, test IDs, exact commit/CI links and release evidence only after work is actually completed and verified. G-SYN-001 remains OPEN / NOT PASSED.
