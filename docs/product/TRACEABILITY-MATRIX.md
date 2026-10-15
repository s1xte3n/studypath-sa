# Gate classification update — 2026-10-14

The matrix below remains a traceability plan, not proof of implementation. For gate purposes, distinguish requirements completeness from data publication, architecture/API approval, implementation, CI and release. Open catalogue conflicts (GAP-001) and the absence of a verified relationship pair (GAP-003) do not make the requirements ambiguous: the safe contract is to withhold unsupported records/relationships and report uncertainty/no verified alternative. GAP-002's owner-approved subject-v1 decision and executable reference test file have been found in the repository; test execution and production implementation remain unverified. GAP-005 is P1 and does not block P0 requirements readiness. GAP-004 and GAP-008 remain downstream architecture/implementation/release blockers as classified in REQUIREMENT-GAPS.md.

**Evidence placeholders:** implementation paths/symbols, executed test results, CI run IDs/URLs, tested commit, deployment URL, smoke tests and release approval remain Not verified / Not available. Do not fill them with planned IDs or owner approval.

---
# StudyPath SA — Traceability Matrix

**Status:** Planned traceability baseline. D-044 selects API-first; draft contract exists. A GitHub Actions run passed the existing Node.js subject-catalogue contract tests on PR #56 (run 38643577867, commit ee2181e62786176ab2c353ad4e112bd309672dbb). This is limited contract-test evidence, not application implementation, runtime privacy or release verification.  
**Chain:** Requirement → contract/UI → test ID → implementation area → CI/release evidence.

**Scope applicability:** D-044/D-045 define the intended API-first tiered architecture; D-046 records the approved but gated authenticated feature extension; D-047 limits the current verification slice to a local synthetic-only browser demo. The local demo does not require a hosted API, and no learner-specific input/result/tracker data may be transmitted or persisted. Authenticated acceptance criteria remain future/gated requirements, not current demo implementation evidence. See [MVP Scope Reconciliation](MVP-SCOPE-RECONCILIATION-D-044-D-047.md).

| Requirement | PRD / acceptance source | Contract or UI | Test IDs | Expected implementation area (unverified) | CI evidence | Release evidence |
|---|---|---|---|---|---|---|
| REQ-EXP-001 | PRD §5; AC-EXP-001–014; draft subject contract | Anonymous explorer form; owner-approved subject-catalogue-v1 contract; reference tests exist | T-EXP-001–006, T-SUB-001–012 | Form, subject dictionary, validation, memory state | T-SUB-001–012 reference tests passed in GitHub Actions run [38643577867](https://github.com/s1xte3n/studypath-sa/actions/runs/38643577867), PR #56; application tests not present/verified | Owner-approved v1 has no aliases; production implementation and runtime evidence unavailable |
| REQ-CAT-001 | PRD §5; AC-CAT-001–012; draft API contract | API catalogue response/source fields; client adapter; empty/stale state | T-CAT-001–005, T-API-001–002, T-API-004, T-NFR-001 | Curated source data, API adapter, catalogue validator | Not available | 6–8 reviewed records not evidenced; API contract/cost/privacy review open |
| REQ-MAT-001 | PRD §5; AC-MAT-001–021 | Eligibility result/reason model; no API frozen | T-MAT-001–008, T-NFR-002–003 | Deterministic evaluator, composite rules, reasons, stable ordering | Not available | Golden set not executed |
| REQ-ALT-001 | PRD §5; AC-ALT-001–007; draft pathway relationship contract | Relationship type, rationale, official source, cycle, freshness and curator sign-off | T-ALT-001–002, T-REL-001–008 | Reviewed relationship data and alternatives UI | Not available | No specific relationship approved; exact pair evidence/sign-off outstanding |
| REQ-DET-001 | PRD §5; AC-DET-001–006 | Detail/source links/not-found state | T-DET-001–006 | Detail view and source-link handling | Not available | Not available |
| REQ-PRV-001 | PRD §5; AC-PRV-001–013; D-044/Q-018 | Privacy notice, reset, catalogue-only API requests; no profile in URL/storage/network/logs | T-PRV-001–006, T-API-003 | Memory state, API request inspection, telemetry/dependency controls, hosting review | Not available | Privacy verification not available |
| REQ-UX-001 | PRD §5; AC-UX-001–011 | Responsive journey, loading/empty/error states | T-UX-001–005, T-PERF-001, T-NFR-005 | UI patterns, semantic controls, recoverable errors | Not available | Accessibility evidence not available |
| REQ-FUND-001 | PRD §5; AC-FUND-001–009; draft API contract | Public funding catalogue data; matching uses only approved limited client inputs | T-FUND-001–006, T-API-001–002, T-API-004 | Funding records, API adapter and client-side matching | Not available | 3–5 reviewed records not available; API boundary open |
| REQ-APP-001 | PRD §5; OR-016; AC-APP-001–009 | Tracker fields/status lifecycle; memory-only | T-APP-001–006 | In-memory tracker and transition validation | Not available | Lifecycle/AC mapping cross-checked in planning; implementation and tests unavailable |
| NFR-SEC-001 | PRD §6 | Build/hosting/network boundary | T-SEC-001, T-API-004 | Build configuration and any network boundary | Not available | Not available |
| NFR-PRV-001 | PRD §6; OR-006 | Storage/network/log/telemetry inspection | T-PRV-001–006, T-API-003 | Storage, network, logging, hosting review | Not available | Release blocker until evidenced |
| NFR-DATA-001 | PRD §6; OR-005/008 | Requirement/source metadata | T-CAT-001, T-CAT-004–005, T-MAT-005, T-MAT-008, T-NFR-001 | Catalogue validation/evaluator | Not available | Not available |
| NFR-REL-001 | PRD §6; draft API contract | Bounded API loading/timeout, empty/error/stale states; no fabricated fallback | T-CAT-002, T-UX-004, T-API-002 | API adapter and failure-state behavior | Not available | Timeout/retry/cache targets not approved |
| NFR-ACC-001 | PRD §6 | All learner-facing UI | T-UX-001–003, T-UX-005 | Responsive and accessible UI | Not available | Not available |
| NFR-PERF-001 | PRD §6; OR-012 | In-browser matching/results | T-PERF-001 | Evaluator and benchmark harness | Not available | Device/protocol/results not available |
| NFR-COMP-001 | PRD §6 | Results/funding/details copy | T-COMP-001 | Content review | Not available | Not available |
| NFR-SCOPE-001 | PRD §6; OR-008 | Catalogue scope disclosure | T-CAT-003 | Catalogue and UX copy | Not available | Not available |

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
