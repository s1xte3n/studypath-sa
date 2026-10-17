# Phase 4 — Local-Only API Compatibility Validation Plan

**Status:** Planned; no API handlers implemented by this document.  
**Base:** main commit `0238d27ff3ece8960f61cf59fa1b8f08b990cc75`.  
**Runtime candidate:** Option B (Static Web Apps managed Functions), approved for validation only.  
**Hard boundaries:** no Azure resources, deployment, paid services, real learner data, or hosted API implementation are authorized by this plan.

## Objective

Prepare reproducible local evidence that the proposed public catalogue contract can be implemented safely before any hosted-runtime decision. Local results cannot prove Azure managed-runtime behavior, provider routing, billing, or hosted abuse controls.

## Existing verified repository state

- The React/Vite browser MVP and Node test suite exist.
- The public catalogue contract is defined in `docs/api/API-CONTRACT.md`.
- API-001 and API-002 remain contract-only; the repository does not yet contain the approved API handlers.
- Post-merge CI on this base commit passed: browser build, browser E2E/privacy/accessibility, contract tests, and OpenAPI validation.
- Those workflows do not test a deployed API.

## Validation matrix

Implement a local-only adapter/harness only after its shape is agreed; keep fixtures synthetic and keep handlers unconnected to the browser until their contract tests pass.

| ID | Area | Input / scenario | Expected result | Evidence |
|---|---|---|---|---|
| LAPI-001 | Route mapping | `GET /api/v1/programmes` | Resolves only to API-001; JSON response matches the canonical schema | Unit/integration test |
| LAPI-002 | Route mapping | `GET /api/v1/funding-opportunities` | Resolves only to API-002; JSON response matches the canonical schema | Unit/integration test |
| LAPI-003 | Stable order | Synthetic items in shuffled input order | Published response sorted by stable ID ascending | Unit test |
| LAPI-004 | Empty catalogue | No curator-approved synthetic records | `200` with `items: []`; no fallback/invented record | Unit test |
| LAPI-005 | Query allow-list | Any unknown query parameter | `400 INVALID_QUERY_PARAMETER` using canonical error schema | Contract test |
| LAPI-006 | Method allow-list | `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS` to catalogue route | `405 METHOD_NOT_ALLOWED` where application handler receives request; note platform preflight behavior separately | Contract test |
| LAPI-007 | Request body | GET carrying any body, including JSON | Rejected; body is not parsed, logged, or reflected | Contract test |
| LAPI-008 | Content negotiation | Unsupported explicit `Accept` value | `406 NOT_ACCEPTABLE` per contract | Contract test |
| LAPI-009 | Schema integrity | Missing required fields, invalid enums, malformed IDs/timestamps | Record rejected from publication; never silently repaired with guessed data | Unit test |
| LAPI-010 | Publication guard | Missing source, applicable cycle, verification time, or curator approval | Record excluded from published response | Unit test |
| LAPI-011 | Privacy sentinel | Synthetic marker strings in forbidden query/body/header positions | No marker appears in response, logs, error text, URL generation, or outbound calls | Automated sentinel test |
| LAPI-012 | No downstream calls | Instrument network/fetch client in harness | Zero external calls from catalogue handler | Test spy / blocked network |
| LAPI-013 | Safe errors | Simulated internal failure | Generic `500 INTERNAL_ERROR`; no stack, path, environment, or configuration leakage | Contract test |
| LAPI-014 | Response headers | Successful and error responses | JSON content type; explicit cache/security headers are set at handler level only after policy approval | Header assertion |
| LAPI-015 | Bounded response | Upper-bound synthetic catalogue | Response size bounded and execution comfortably below target; do not treat platform 45-second maximum as target | Test measurement |
| LAPI-016 | Package/config | Inspect build artifact and runtime config in a local fixture | Selected Node runtime explicit; config/handler packaging matches intended route layout | Build/packaging check |

## Contract questions to settle before coding

1. The contract lists `429 RATE_LIMITED` but a verified numeric rate-limiting mechanism is not established for this managed API profile. Do not implement a fake process-memory limiter or claim this response is operationally guaranteed. Resolve this requirement through the security decision gate.
2. Confirm whether a GET request with a body can be reliably detected by the selected local adapter; reject where observable, and document platform behavior separately.
3. Decide canonical error shape and status handling directly from `docs/api/API-ERRORS.md` and the OpenAPI contract; do not create parallel schemas.
4. Approve cache/security header values before making them defaults. The five-minute cache proposal remains unapproved.
5. Use synthetic fixtures only. Never include marks, interests, funding circumstances, learner IDs, or real profile data in requests or test logs.

## Acceptance gate

This plan is complete only when each applicable LAPI case has a test ID, implementation reference, and CI evidence. Cases that depend on Azure-hosted behavior must remain explicitly blocked until separate deployment approval. The rate-limit, subscription cost, and operational diagnostic gates are not satisfied by local tests.

## Gate decision

**Phase 4 remains OPEN.** This plan authorizes neither production handler implementation nor deployment. It is a test design artifact for owner review.
