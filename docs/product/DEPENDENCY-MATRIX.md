# StudyPath SA — Dependency Matrix

**Status:** Planning baseline, 2026-10-14, updated for D-044. API-first direction is approved; runtime and final interface contract are not yet approved.

| Requirement/work | Dependencies | Type | Required sequence / constraint | Risk if missing |
|---|---|---|---|---|
| REQ-EXP-001 / P0-03 | Explicit subject IDs/aliases; REQ-PRV-001 | Data/privacy | Freeze supported vocabulary before validation is complete | Silent subject substitution or double counting |
| REQ-CAT-001 / P0-01 | Official UJ 2027 starting sources, source-record contract, curator review, API catalogue contract | Data/API governance | Publish only records with cycle/freshness/version/sign-off; API may return public catalogue data only | False eligibility claims or unverified catalogue responses |
| REQ-MAT-001 / P0-04 | REQ-EXP-001, REQ-CAT-001, composite-rule policy | Functional/data | Only supported structured rules; unknown remains UNKNOWN | False-positive ELIGIBLE |
| REQ-ALT-001 / P0-06 | Catalogue, eligibility, relationship evidence | Data/functional | Publish only sourced and approved relationships; articulation requires explicit official evidence | Unsupported progression claim |
| REQ-DET-001 / P0-05 | Catalogue and eligibility result | Functional | Result/detail use same identity and source metadata | Contradictory detail and result |
| REQ-PRV-001 / P0-08 | Hosting/provider metadata, API request/log inventory, telemetry inventory, privacy notice, input flow | Privacy/security | Verify storage/network/log/retention; do not send profile values in API requests | Unapproved data transmission/retention/disclosure |
| REQ-UX-001 / P0-07 | Core views, defined empty/loading/error states | Cross-cutting | Test keyboard, screen sizes and failure behavior | Inaccessible or confusing journey |
| NFR-SEC-001 | Hosting/network boundary, dependency inventory | Security | No client secrets; HTTPS where network exists | Secret exposure/unsafe transport |
| NFR-PRV-001 | REQ-PRV-001, storage/network/log inspection | Privacy | Release gate | Profile leakage |
| NFR-DATA-001 | REQ-CAT-001, source metadata | Data integrity | Required provenance before eligibility certainty | Unsupported claim |
| NFR-REL-001 | REQ-UX-001, API contract and failure semantics | Reliability | Define timeout/retry/cache/stale-data behavior before implementation; never fabricate fallback data | Indefinite loading/fabricated fallback |
| NFR-ACC-001 | REQ-UX-001, test browser/device | Accessibility | Retain reproducible conformance evidence | Unverifiable accessibility claim |
| NFR-PERF-001 | Matching implementation, agreed device/browser/protocol | Performance | Record fixture, repetitions and p95 method | Unrepeatable performance claim |
| NFR-COMP-001 | Results/funding/details copy | Product safety | No official-decision or guarantee language | User misinterprets guidance |
| NFR-SCOPE-001 | Bounded catalogue and scope disclosure | Scope | Disclose pilot limitations | False national coverage claim |
| REQ-FUND-001 / P1-01 | OR-015, REQ-PRV-001, verified funding catalogue | Data/privacy | After P0; approved non-sensitive inputs only | Sensitive data or stale deadline |
| REQ-APP-001 / P1-02 | OR-016, REQ-PRV-001, tracker lifecycle | Privacy/state | After P0; memory-only only | Unauthorized retention/invalid status |

## Proposed sequencing

```text
Official programme records ──> Curated catalogue ─────────┐
Subject vocabulary ──────────> Anonymous input ────────────┤
Privacy boundary + memory state ──────────────────────────┤
                                                         v
                                            Deterministic eligibility
                                                         |
                                       +-----------------+----------------+
                                       v                                  v
                               Pathway details                    Verified alternatives
                                       |
                                       v
                           Accessible/resilient core journey
                                       |
                                       v
                         Privacy/security/release verification
                                       |
                           +-----------+-----------+
                           v                       v
                    Funding pilot (P1)       Tracker (P1, memory-only)
```

## Constraints and unresolved dependencies

- The 6–8 programme records and 3–5 funding records must be real, sourced and reviewed; Phase 0 source checks do not meet publication acceptance by themselves.
- The actual supported subject vocabulary and alias list is not established by this matrix.
- Funding/tracker acceptance-criteria IDs and the tracker transition table need verification before test implementation.
- D-044 selects API-first, but exact runtime composition, route/schema details, API Management necessity, cache/failure semantics and cost remain open. The draft API contract proposes catalogue-only GET routes; no learner inputs may be sent while OR-019/Q-018 remains unresolved.
- Performance device/browser and benchmark protocol must be recorded before a performance acceptance result can be claimed.
- API-first introduces a network dependency. Timeout/retry/cache/fallback behavior must be defined before implementation; numerical availability targets remain unapproved.
- Any request for account creation, persistence, sensitive funding inputs, AI/document processing, external submission or paid infrastructure requires explicit change control.

Requirement change propagation: PRD → requirements matrix → architecture (if needed) → UI/API contract → tests → implementation → CI/release evidence.
