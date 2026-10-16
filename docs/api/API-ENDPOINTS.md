# StudyPath SA — Endpoint Inventory

**Contract version:** 1.0.0-draft · **API prefix:** `/api/v1` · **Status:** Defined for review, not implemented.

| Contract ID | Method | Path/interface | Auth | Priority | Requirement owner | Status |
|---|---|---|---|---|---|---|
| API-001 | GET | `/api/v1/programmes` | Public; no bearer token | P0 | REQ-CAT-001, REQ-DET-001, REQ-MAT-001, REQ-ALT-001, NFR-DATA-001 | Contract defined; catalogue publication/runtime not verified |
| API-002 | GET | `/api/v1/funding-opportunities` | Public; no bearer token | P1 | REQ-FUND-001, NFR-DATA-001, NFR-PRV-001 | Contract defined; records/runtime not verified; feature must be withheld until reviewed records exist |
| IF-001 | Local interface | Anonymous client-side matching | None | P0 | REQ-EXP-001, REQ-MAT-001, REQ-ALT-001, REQ-DET-001, REQ-PRV-001 | Contract defined; implementation/evidence not verified |
| IF-002 | Local interface | Page-memory manual application tracker | None | P1 | REQ-APP-001, REQ-PRV-001 | Contract defined; implementation/evidence not verified |

## Explicitly not endpointed in this contract

| Capability | Reason / controlling decision |
|---|---|
| `GET/PUT/DELETE /profile`, profile results | Authenticated extension; Q-018/Q-020 identity, explicit opt-in, lifecycle, privacy/security, isolation and cost gates remain open |
| `POST /matches` | Authenticated server-side matching is future scope under D-046/D-048, not the anonymous path and not approved for implementation |
| Saved pathways, saved funding, comparison, dashboard | Future authenticated scope; schemas and lifecycle must be separately approved |
| Application tracker CRUD | Tracker is page-memory-only; no server/database sync |
| Document upload/analysis, AI, direct application submission | Out of current demo scope; no upload, AI or application submission endpoint |
| Admin catalogue write/publish | No approved admin requirement/authorization contract |
| Programme/funding detail endpoint | Detail fields are returned by the bounded list response; add a dedicated detail endpoint only through change control if a requirement emerges |
| Health endpoint | Runtime/provider decision and operational contract not frozen; do not add without approved requirement/decision |

## Global semantics

- No request body for GET operations.
- Unknown query parameters: `400 INVALID_QUERY_PARAMETER`.
- Success: `200 OK`, JSON response.
- Expected HTTP errors: `400`, `429`, `500`, `503`, `504`; exact error codes/messages are in `API-ERRORS.md`.
- Read-only operations are safe and idempotent; no idempotency key.
- Responses return all published records in stable `id` ascending order; no pagination/filter/sort controls in v1 for the bounded pilot.
- No learner data may be present in requests, responses, URLs or technical telemetry.
