# StudyPath SA — Traceability Matrix

**Status:** Planned traceability baseline. D-044 selects API-first; draft contract exists, but no implementation, CI run or release has been verified.  
**Chain:** Requirement → contract/UI → test ID → implementation area → CI/release evidence.

| Requirement | PRD / acceptance source | Contract or UI | Test IDs | Expected implementation area (unverified) | CI evidence | Release evidence |
|---|---|---|---|---|---|---|
| REQ-EXP-001 | PRD §5; AC-EXP-001–014 | Anonymous explorer form; validation; matching invocation (not frozen) | T-EXP-001–004 | Form, subject aliases, validation, memory state | Not available | Not available |
| REQ-CAT-001 | PRD §5; AC-CAT-001–012; draft API contract | API catalogue response/source fields; client adapter; empty/stale state | T-CAT-001–003, T-API-001–002, T-API-004 | Curated source data, API adapter, catalogue validator | Not available | 6–8 reviewed records not evidenced; API contract/cost/privacy review open |
| REQ-MAT-001 | PRD §5; AC-MAT-001–021 | Eligibility result/reason model; no API frozen | T-MAT-001–004 | Deterministic evaluator, composite rules, reasons, stable ordering | Not available | Golden set not executed |
| REQ-ALT-001 | PRD §5; AC-ALT-001–007 | Relationship type, rationale, source | T-ALT-001–002 | Reviewed relationship data and alternatives UI | Not available | Relationship evidence not available |
| REQ-DET-001 | PRD §5; AC-DET-001–006 | Detail/source links/not-found state | T-DET-001–002 | Detail view and source-link handling | Not available | Not available |
| REQ-PRV-001 | PRD §5; AC-PRV-001–013; D-044/Q-018 | Privacy notice, reset, catalogue-only API requests; no profile in URL/storage/network/logs | T-PRV-001–004, T-API-003 | Memory state, API request inspection, telemetry/dependency controls, hosting review | Not available | Privacy verification not available |
| REQ-UX-001 | PRD §5; AC-UX-001–011 | Responsive journey, loading/empty/error states | T-UX-001–003 | UI patterns, semantic controls, recoverable errors | Not available | Accessibility evidence not available |
| REQ-FUND-001 | PRD §5; AC-FUND-001–009; draft API contract | Public funding catalogue data; matching uses only approved limited client inputs | T-FUND-001–003, T-API-001–002, T-API-004 | Funding records, API adapter and client-side matching | Not available | 3–5 reviewed records not available; API boundary open |
| REQ-APP-001 | PRD §5; OR-016; AC-APP-001–009 | Tracker fields/status lifecycle; memory-only | T-APP-001–004 | In-memory tracker and transition validation | Not available | Lifecycle/AC cross-check outstanding |
| NFR-SEC-001 | PRD §6 | Build/hosting/network boundary | T-SEC-001 | Build configuration and any network boundary | Not available | Not available |
| NFR-PRV-001 | PRD §6; OR-006 | Storage/network/log/telemetry inspection | T-PRV-001–004 | Storage, network, logging, hosting review | Not available | Release blocker until evidenced |
| NFR-DATA-001 | PRD §6; OR-005/008 | Requirement/source metadata | T-CAT-001, T-MAT-003 | Catalogue validation/evaluator | Not available | Not available |
| NFR-REL-001 | PRD §6; draft API contract | Bounded API loading/timeout, empty/error/stale states; no fabricated fallback | T-CAT-002, T-UX-003, T-API-002 | API adapter and failure-state behavior | Not available | Timeout/retry/cache targets not approved |
| NFR-ACC-001 | PRD §6 | All learner-facing UI | T-UX-001–002 | Responsive and accessible UI | Not available | Not available |
| NFR-PERF-001 | PRD §6; OR-012 | In-browser matching/results | T-PERF-001 | Evaluator and benchmark harness | Not available | Device/protocol/results not available |
| NFR-COMP-001 | PRD §6 | Results/funding/details copy | T-COMP-001 | Content review | Not available | Not available |
| NFR-SCOPE-001 | PRD §6; OR-008 | Catalogue scope disclosure | T-CAT-003 | Catalogue and UX copy | Not available | Not available |

## Planned test ID registry

| Test ID | Requirement(s) | Verification intent | Priority |
|---|---|---|---:|
| T-EXP-001 | REQ-EXP-001 | Valid required fields and study-stage options | P0 |
| T-EXP-002 | REQ-EXP-001 | Mark boundaries 0/100; reject decimal, negative, >100, malformed/missing without coercion | P0 |
| T-EXP-003 | REQ-EXP-001 | Approved alias normalization, duplicate canonical subject, unsupported subject | P0 |
| T-EXP-004 | REQ-EXP-001, REQ-PRV-001 | Optional fields blank and no identity requirement | P0 |
| T-CAT-001 | REQ-CAT-001, NFR-DATA-001 | Source/cycle/freshness/version/sign-off completeness | P0 |
| T-CAT-002 | REQ-CAT-001, NFR-REL-001 | Missing, stale, conflicting or wrong-cycle rule cannot create certainty | P0 |
| T-CAT-003 | REQ-CAT-001, NFR-SCOPE-001 | Empty state and no national-completeness claim | P0 |
| T-MAT-001 | REQ-MAT-001 | ELIGIBLE/NOT_ELIGIBLE/UNKNOWN and threshold boundaries | P0 |
| T-MAT-002 | REQ-MAT-001 | AND/OR/conditional precedence; known failure plus unknown | P0 |
| T-MAT-003 | REQ-MAT-001, NFR-DATA-001 | Reasons trace to input, rule, source and cycle | P0 |
| T-MAT-004 | REQ-MAT-001 | Determinism, stable order, no weighted numeric score | P0 |
| T-ALT-001 | REQ-ALT-001 | Verified relationship type/rationale/source required | P0 |
| T-ALT-002 | REQ-ALT-001 | No invented alternative/articulation without evidence | P0 |
| T-DET-001 | REQ-DET-001 | Detail fields, unknown values and official links | P0 |
| T-DET-002 | REQ-DET-001 | Unknown ID and stale/moved/wrong-cycle source | P0 |
| T-PRV-001 | REQ-PRV-001, NFR-PRV-001 | Storage/reload/reset inspection | P0 |
| T-PRV-002 | REQ-PRV-001, NFR-PRV-001 | Network/URL inspection for profile values | P0 |
| T-PRV-003 | REQ-PRV-001, NFR-PRV-001 | Logs/client telemetry do not capture profile values | P0 |
| T-PRV-004 | REQ-PRV-001 | Hosting metadata/privacy notice/synthetic-only review | P0 |
| T-UX-001 | REQ-UX-001, NFR-ACC-001 | Keyboard, focus, labels, errors, contrast, non-colour-only status | P0 |
| T-UX-002 | REQ-UX-001, NFR-ACC-001 | 320 CSS px and supported browser checks | P0 |
| T-UX-003 | REQ-UX-001, NFR-REL-001 | Loading/empty/validation/failure/retry behavior | P0 |
| T-FUND-001 | REQ-FUND-001 | Explainable funding match using approved limited inputs | P1 |
| T-FUND-002 | REQ-FUND-001 | Missing/expired/conflicting criteria/deadline uncertainty | P1 |
| T-FUND-003 | REQ-FUND-001, REQ-PRV-001 | 3–5 verified records; no sensitive inputs/award guarantee | P1 |
| T-APP-001 | REQ-APP-001 | Create/list/edit and validate permitted tracker fields | P1 |
| T-APP-002 | REQ-APP-001 | Allowed and rejected status transitions | P1 |
| T-APP-003 | REQ-APP-001, REQ-PRV-001 | Tracker state is memory-only; reload does not restore | P1 |
| T-APP-004 | REQ-APP-001 | No uploads/submission; fields follow approved minimal schema | P1 |
| T-SEC-001 | NFR-SEC-001 | No client secrets, HTTPS-only requests, trusted input boundary | P0 |
| T-PERF-001 | NFR-PERF-001 | Repeat benchmark on agreed device/browser, report p95 and environment | P1 |
| T-COMP-001 | NFR-COMP-001 | Copy review for no admission/funding guarantee | P0 |

Test IDs are design identifiers only. Add executable test paths, commands, CI run IDs/URLs, commit SHA and release evidence when available. Never infer success from a 2xx response or documentation alone.


## API-first verification additions (planned only)

| Test ID | Requirement(s) | Verification intent | Priority |
|---|---|---|---:|
| T-API-001 | REQ-CAT-001, REQ-FUND-001, NFR-DATA-001 | Validate catalogue response schema and required source/cycle/version/freshness/sign-off metadata | P0 |
| T-API-002 | NFR-REL-001, REQ-UX-001 | API timeout, unavailable, malformed, stale and empty responses produce bounded, honest recoverable UI states | P0 |
| T-API-003 | REQ-PRV-001, NFR-PRV-001 | Inspect requests and confirm no marks, subjects, interests, match results or tracker entries are transmitted | P0 |
| T-API-004 | NFR-SEC-001, NFR-DATA-001 | Confirm HTTPS, no client secrets, approved public catalogue fields and preserved provenance | P0 |

These IDs are proposed verification targets, not executed tests. Confirm against the final contract before implementation.
