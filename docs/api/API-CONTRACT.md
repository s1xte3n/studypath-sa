# StudyPath SA — Canonical API / Interface Contract

**Contract version:** 1.0.0-draft  
**API base path:** `/api/v1`  
**Status:** Contract baseline prepared for owner review; not implemented. The public catalogue wire contract is defined here. Runtime/provider deployment remains gated by OR-019/Q-018, cost review and privacy verification. Authenticated operations are deliberately not contracted for implementation.  
**Authority:** `docs/product/REQUIREMENTS.md`, `docs/product/ACCEPTANCE-CRITERIA.md`, D-044–D-048, D-050, `docs/architecture/ARCHITECTURE.md`, `docs/architecture/SECURITY-ARCHITECTURE.md`, and `docs/architecture/API-CONTRACT.md`.

## 1. Contract invariants

1. Anonymous HTTP requests retrieve public catalogue data only. They MUST NOT transmit marks, subjects entered by a learner, interests, profile fields, match results, tracker entries, account identifiers, or sensitive financial data.
2. Anonymous matching is deterministic and client-side. The catalogue API does not calculate eligibility, rank learners, persist inputs, or return learner-specific results.
3. Catalogue requirements and funding information must retain official-source provenance, applicable cycle, verification time, catalogue version, publication state and curator sign-off. Unsupported or materially incomplete eligibility rules must not be represented as verified.
4. Eligibility values are exactly `ELIGIBLE`, `NOT_ELIGIBLE`, `UNKNOWN`. A recommendation is not an admission or funding decision.
5. The application tracker is page-memory-only. No tracker HTTP endpoint exists in this contract. No upload, AI, identity, profile, saved-item, dashboard, comparison, admin-write or health endpoint is approved here.
6. Only synthetic data may be used until the required privacy/legal review and runtime controls are verified. This contract is not evidence of runtime privacy or catalogue readiness.

## 2. Global wire conventions

- JSON media type: `application/json; charset=utf-8`.
- Successful response bodies are JSON. Error responses use the canonical `APIError` schema.
- Property names use lower camelCase. Enum values use uppercase snake case.
- API IDs are opaque, stable strings matching `^[A-Z0-9][A-Z0-9._-]{0,99}$`. IDs are case-sensitive and must not be derived from learner inputs. Programme IDs in the pilot are stable catalogue keys, not UUIDs. Do not use a mutable display title as an ID.
- Timestamps are RFC 3339 UTC timestamps with `Z`, e.g. `2026-10-16T12:00:00Z`. Date-only values use ISO 8601 `YYYY-MM-DD`. A source's local timezone must not be guessed; if the source does not state timezone semantics, represent the original deadline text and set normalized deadline fields to null.
- Required properties are non-null unless a schema explicitly permits `null`. Unknown/unavailable information is represented as `null` where allowed, never invented or replaced with a plausible value.
- API responses must not contain student-specific data, secrets, stack traces or internal configuration.
- No request body is accepted by the public GET operations. Unknown query parameters are rejected with `400 INVALID_QUERY_PARAMETER`; there are no pagination, filtering or sorting parameters because the approved bounded pilot returns the full published set and deterministic ordering.
- List order is stable ascending by `id`. Consumers must not rely on a particular item count.
- No mutation or idempotency-key header applies to read-only GET operations. GETs are safe and idempotent.
- `Cache-Control`, CORS allow-list, rate limits, provider request logging and cache TTL must be set by the deployment profile only after OR-019/Q-018 cost/provider review. Until that profile is approved, do not claim a hosted runtime is ready. Do not cache stale eligibility rules as current; clients must display source freshness/cycle state.
- All network traffic must use HTTPS. No API secrets belong in browser code.

## 3. Authentication and authorization

| Caller / operation | Authentication | Authorization |
|---|---|---|
| Anonymous public catalogue reads | None | Public published catalogue records only; no write access |
| Local browser matching | No HTTP operation | Operates on validated public catalogue data and page-memory learner inputs only |
| Local page-memory tracker | No HTTP operation | Current page/session only; no server or account persistence |
| Authenticated extension | **Not contracted / not approved for implementation** | Requires separate frozen identity, authorization, ownership, consent/lifecycle, isolation and cost contract under Q-018/Q-020 |

A future authenticated route must derive owner identity from a validated identity token and must never trust a client-supplied owner ID. This paragraph is a constraint, not authorization to implement such routes.

## 4. Operation catalogue

### API-001 — List published programmes

- **Method/path:** `GET /api/v1/programmes`
- **Requirement mapping:** `REQ-CAT-001`, `REQ-DET-001`, `REQ-MAT-001`, `REQ-ALT-001`, `NFR-DATA-001`, `NFR-SCOPE-001`.
- **Priority:** P0.
- **Status:** Public read-only contract defined; implementation and catalogue publication not verified.
- **Authentication:** None.
- **Authorization:** Published, curator-approved records only. Draft, rejected, expired or unsigned records MUST NOT be returned as current published programme records.
- **Path variables:** None.
- **Query variables:** None. Unknown query parameters return `400 INVALID_QUERY_PARAMETER`.
- **Headers:** `Accept: application/json` (recommended); `Authorization` is not required and must not be used to personalize the result. No request body.
- **Success:** `200 OK`, `ProgrammeCatalogueResponse`. Empty approved catalogue returns `200` with `items: []`; do not invent fallback records.
- **Expected errors:** `400 INVALID_QUERY_PARAMETER`; `429 RATE_LIMITED`; `500 INTERNAL_ERROR`; `503 CATALOGUE_UNAVAILABLE`; `504 UPSTREAM_TIMEOUT`.
- **Validation:** Reject unsupported query parameters. Validate every published record against the response schema before serialization. Omit records whose publication evidence is incomplete rather than relaxing schema requirements.
- **Isolation/privacy:** The response is identical in substance for anonymous callers and contains no learner data. Request telemetry may contain technical metadata only; do not log request bodies or learner values.
- **Side effects:** None. No write, audit event containing learner data, or catalogue mutation.
- **Idempotency:** Safe/idempotent GET; repeated reads do not change state.
- **Pagination/filter/sort:** Not applicable to the bounded pilot; return the complete published set ordered by `id` ascending. Revisit through versioned contract change if catalogue size justifies pagination.
- **Freshness:** Each record carries `verifiedAt`, `applicableCycle`, `publicationStatus`, and `catalogueVersion`. Client must show stale/expired/unknown states honestly and must not infer eligibility from incomplete rules.

### API-002 — List published funding opportunities

- **Method/path:** `GET /api/v1/funding-opportunities`
- **Requirement mapping:** `REQ-FUND-001`, `NFR-DATA-001`, `NFR-PRV-001`.
- **Priority:** P1.
- **Status:** Public read-only contract defined; funding records and implementation not verified. Feature must remain unavailable/clearly empty until 3–5 records are curated and reviewed.
- **Authentication:** None.
- **Authorization:** Published, curator-approved opportunities only.
- **Path variables:** None.
- **Query variables:** None. Unknown query parameters return `400 INVALID_QUERY_PARAMETER`.
- **Headers:** `Accept: application/json` (recommended). No request body.
- **Success:** `200 OK`, `FundingCatalogueResponse`. Empty approved catalogue returns `200` with `items: []`.
- **Expected errors:** `400 INVALID_QUERY_PARAMETER`; `429 RATE_LIMITED`; `500 INTERNAL_ERROR`; `503 CATALOGUE_UNAVAILABLE`; `504 UPSTREAM_TIMEOUT`.
- **Validation:** Validate each record against the schema; do not invent requirements, amount, deadline, timezone, required documents or award likelihood. Unsupported criteria are marked `UNKNOWN` or explicitly not assessed.
- **Isolation/privacy:** Response is public and non-personalized. The request must not carry marks, financial circumstances, identity or tracker data.
- **Side effects:** None.
- **Idempotency:** Safe/idempotent GET.
- **Pagination/filter/sort:** Not applicable to the bounded pilot; complete published set ordered by `id` ascending.
- **Deadline semantics:** Preserve `deadlineText` as published. `deadlineAt` is nullable and may be populated only when the official source unambiguously provides date, time and timezone. Do not infer timezone or extend expired opportunities.

## 5. Non-HTTP interface contracts

These are browser-local interfaces, not REST endpoints. Their detailed data types and status rules are defined in `API-SCHEMAS.md`.

### IF-001 — Anonymous matching

- **Requirement:** `REQ-EXP-001`, `REQ-MAT-001`, `REQ-ALT-001`, `REQ-DET-001`, `REQ-PRV-001`.
- **Inputs:** Validated stage, canonical supported subject IDs with integer marks 0–100, optional interests/location/study modes, and validated public programme records.
- **Output:** Local result collection with programme ID, one eligibility state, sourced reasons, source references, data-quality limitations and deterministic order.
- **Errors:** `INVALID_INPUT`, `UNSUPPORTED_SUBJECT`, `DUPLICATE_SUBJECT`, `CATALOGUE_INVALID`, `CATALOGUE_STALE`, `RULES_INCOMPLETE`. These are domain outcomes, not HTTP status codes.
- **Privacy:** Learner input/result stays in page memory. It MUST NOT be serialized into HTTP requests, URL/history, browser storage, analytics, logs or error telemetry.
- **Side effects/idempotency:** Pure deterministic evaluation; no persistence or external side effects. Identical inputs and catalogue version must yield identical eligibility states and reasons.
- **Eligibility:** Follow OR-004 precedence and composite AND/OR/conditional rules. A verified mandatory failure may yield `NOT_ELIGIBLE` despite unrelated unknown facts; otherwise material uncertainty yields `UNKNOWN`; `ELIGIBLE` requires all applicable mandatory rules to be verified and met. Do not calculate APS unless the applicable official method is verified.

### IF-002 — Manual application tracker

- **Requirement:** `REQ-APP-001`; priority P1.
- **Storage:** In-memory page state only. No API, localStorage, sessionStorage, cookie, account sync, database or restoration after reload/close.
- **Inputs:** Approved target type/target ID, application status, optional learner-entered deadline, required-document checklist and notes per `API-SCHEMAS.md`.
- **Status values:** `DRAFT`, `READY_TO_SUBMIT`, `SUBMITTED`, `AWAITING_DOCUMENTS`, `UNDER_REVIEW`, `ACCEPTED`, `REJECTED`, `WITHDRAWN`.
- **Authority:** Status and `submittedAt` are learner-reported, not provider-confirmed. The UI must not submit applications.
- **Errors:** `INVALID_TARGET`, `INVALID_STATUS_TRANSITION`, `INVALID_DATE`, `FIELD_LIMIT_EXCEEDED`.
- **Side effects/idempotency:** In-memory state only. Editing the same item updates the current page state; no durable operation or idempotency key exists.

## 6. Cross-cutting error semantics

All HTTP error responses use `APIError`: `error.code`, safe `error.message`, and opaque `error.requestId`. No stack traces, secrets, learner data or internal configuration. See `API-ERRORS.md` for exact status/code mapping.

## 7. Compatibility and versioning

- `/api/v1` is the major API namespace. Breaking changes require a new major path (e.g. `/api/v2`) and a migration/deprecation plan.
- Within v1, additive optional response properties may be introduced only when consumers tolerate unknown fields. Removing/renaming properties, changing type/nullability, changing enum values, changing ID semantics, changing sort order or changing error codes is breaking.
- Clients must ignore unknown response properties but reject missing required properties, wrong types, unsupported enum values and unsupported schema versions.
- No separate `schemaVersion` field is currently defined; `contractVersion` identifies the API contract document, while `catalogueVersion` identifies the dataset. Do not confuse the two.
- Contract changes must update this file, schemas, endpoint inventory, variables, examples, changelog and OpenAPI before dependent implementation/tests change.

## 8. Readiness / known gates

This contract does not make the following complete: OR-019/Q-018 runtime composition, API Management necessity, CORS origins, cache TTL, numeric rate limits, timeout/retry values, hosting/provider log review, catalogue publication, funding publication, G-SYN-001 browser privacy verification, authenticated Q-020 contracts, implementation, CI or deployment. No Azure provisioning or real learner data is authorized by this document.
