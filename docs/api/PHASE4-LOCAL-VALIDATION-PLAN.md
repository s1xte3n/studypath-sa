# Phase 4 — Local-Only API Compatibility Validation Plan

**Status:** PR #113 is merged. Its head-commit CI completed successfully for all five workflows: contract tests (run `39033122606`), OpenAPI validation (`39033122712`), browser MVP build (`39033122697`), browser E2E/privacy/accessibility (`39033122592`), and UJ eligibility golden-case verification (`39033122589`). The content-type regex syntax regression is fixed. Hosted runtime/configuration validation remains blocked; Phase 4 is still open.  
**Documentation baseline:** `main` includes PR #114 merge commit `4b1d2a97c43c8352e34cda1a48c95b2706e40d00`. The nested requirement and pathway-relationship cases were introduced by PR #112; PR #113 fixed the test regex.  
**Runtime candidate:** Option B (Static Web Apps managed Functions), approved for validation only.  
**Hard boundaries:** no Azure resources, deployment, paid services, real learner data, or hosted API implementation are authorized by this plan.

## Objective

Prepare reproducible local evidence that the proposed public catalogue contract can be implemented safely before any hosted-runtime decision. Local results cannot prove Azure managed-runtime behavior, provider routing, billing, or hosted abuse controls.

## Existing verified repository state

- The React/Vite browser MVP and Node test suite exist.
- The public catalogue contract is defined in `docs/api/API-CONTRACT.md`.
- API-001 and API-002 remain contract-only for runtime/deployment. `src/api/local-catalogue-handler.mjs` is a local test harness only; it is not an approved production or Azure handler.
- CI for PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` completed successfully across all five workflows listed above. Contract tests, OpenAPI validation, browser build, browser E2E/privacy/accessibility, and UJ eligibility golden-case verification all passed.
- These are repository/CI results only; they do not test a deployed API, Azure managed-runtime behavior, provider routing, billing, or hosted abuse controls.
- Those workflows do not test a deployed API.

## Validation matrix

Implement a local-only adapter/harness only after its shape is agreed; keep fixtures synthetic and keep handlers unconnected to the browser until their contract tests pass.

| ID | Area | Input / scenario | Expected result | Evidence |
|---|---|---|---|---|
| LAPI-001 | Route mapping | `GET /api/v1/programmes` | Resolves only to API-001; JSON response envelope is checked with synthetic fixtures | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-002 | Route mapping | `GET /api/v1/funding-opportunities` | Resolves only to API-002; JSON response envelope is checked with synthetic fixtures | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-003 | Stable order | Synthetic items in shuffled input order | Published response sorted by stable ID ascending | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-004 | Empty catalogue | No curator-approved synthetic records | `200` with `items: []`; no fallback/invented record | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-005 | Query allow-list | Any unknown query parameter | `400 INVALID_QUERY_PARAMETER` using canonical error schema; marker not reflected | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-006 | Method allow-list | `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS` to catalogue route | `405 METHOD_NOT_ALLOWED` with `Allow: GET` in the local handler; hosted/platform OPTIONS behavior remains unverified | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-007 | Request body | GET carrying a JSON body | Rejected; marker is not reflected. No request-body parsing/logging is implemented in this harness | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-008 | Content negotiation | Unsupported explicit `Accept` value and malformed syntax | `406 NOT_ACCEPTABLE` for valid-but-unsupported; `400 INVALID_ACCEPT_HEADER` for malformed syntax | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-009 | Schema integrity | Missing required fields, invalid enums, malformed IDs and impossible UTC timestamps | Invalid records excluded; no repair or guessing | `tests/api/local-catalogue-handler.test.mjs` — automated; partial schema subset, CI pending |
| LAPI-010 | Publication guard | Draft, unsigned, source-less, missing-source, invalid-cycle/date records | Records excluded; broader catalogue curation review remains separate | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-011 | Privacy sentinel | Synthetic marker strings in query/body/header positions | No marker appears in response; no request logging or URL generation exists in the harness. CI does not establish provider log behavior | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-012 | No downstream calls | Spy on global `fetch` during a raw HTTP request to the local server | Zero `fetch` calls from handler; this is not a full OS-level network sandbox | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-013 | Safe errors | Injected timestamp-provider failure | Generic `500 INTERNAL_ERROR`; no stack/path/configuration sentinel leakage | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-014 | Response headers | Successful and error responses | JSON content type and `X-Content-Type-Options: nosniff`; cache policy remains unapproved and is not invented | `tests/api/local-catalogue-handler.test.mjs` — success and representative 400/404/405/406/500 error headers asserted; contract-test CI passed on PR #113 head commit (run `39033122606`) |
| LAPI-015 | Bounded response | 250-record synthetic fixture | Response JSON under 1 MB and local response under 5 seconds; this is a representative regression budget, not a production maximum | `tests/api/local-catalogue-handler.test.mjs` — automated; contract-test CI passed on PR #113 head commit `e6805b85ce90ef44bb2ee733742d37bee6fed8b0` (run `39033122606`) |
| LAPI-016 | Package/config | Inspect local package and runtime configuration | BLOCKED: no approved Static Web Apps handler layout/runtime config exists; do not invent deployment config during local-only validation | Remains blocked pending runtime decision and explicit deployment approval |

## Remaining contract and runtime gates

1. The contract lists `429 RATE_LIMITED` but a verified numeric rate-limiting mechanism is not established for this managed API profile. Do not implement a fake process-memory limiter or claim this response is operationally guaranteed. Resolve this requirement through the security decision gate.
2. The local Node adapter detects GET bodies when content-length or transfer-encoding is observable; verify Azure/platform behavior separately before deployment.
3. Canonical error shape/status handling follows `docs/api/API-ERRORS.md` and `docs/api/openapi.yaml`; malformed Accept syntax is `400 INVALID_ACCEPT_HEADER`, while valid-but-unsupported negotiation is `406 NOT_ACCEPTABLE`.
4. Approve cache/security header values before making them defaults. The five-minute cache proposal remains unapproved.
5. Use synthetic fixtures only. Never include marks, interests, funding circumstances, learner IDs, or real profile data in requests or test logs.

## Acceptance gate

This plan is complete only when each applicable LAPI case has a test ID, implementation reference, and passing CI evidence. LAPI-009 now has additional nested requirement and pathway-relationship cases in this branch, but still does not validate every OpenAPI constraint. LAPI-014 has explicit assertions for JSON content type, `nosniff`, canonical error envelope keys, and absence of exception sentinels across representative 400/404/405/406/500 responses; PR #111 is merged and its CI evidence must be checked against the actual workflow results. LAPI-016 and all Azure-hosted behavior remain blocked until separate runtime/deployment approval. The rate-limit, subscription cost, cache policy and operational diagnostic gates are not satisfied by local tests.

## Gate decision

**Phase 4 remains OPEN.** The regex fix is CI-verified on PR #113's head commit, and all five workflows passed. The local-only harness is test code, not a production API handler. Remaining hosted runtime/configuration, operational rate limiting, cost, cache, and provider privacy behavior are not verified. This plan authorizes neither Azure resources nor deployment.
