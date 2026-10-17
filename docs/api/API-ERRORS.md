# StudyPath SA — Error and Status Contract

**Contract version:** 1.0.0-draft. This table defines expected API errors; runtime status behavior has not been executed.

## HTTP error envelope

```json
{
  "error": {
    "code": "INVALID_QUERY_PARAMETER",
    "message": "The request contains an unsupported query parameter.",
    "requestId": "req-opaque-id"
  }
}
```

All fields are required for HTTP errors. `message` is safe and non-sensitive. `requestId` is an opaque correlation identifier, not a user/session identifier. Do not expose exception messages, stack traces, database details, secrets, tokens or learner data.

## HTTP status mapping

| Status | Code | When used | Client behavior |
|---:|---|---|---|
| 400 | `INVALID_QUERY_PARAMETER` | Any unsupported query parameter on API-001/API-002 | Fix client request; do not retry unchanged |
| 400 | `INVALID_ACCEPT_HEADER` | Explicitly unsupported response media type | Retry only with `Accept: application/json` |
| 404 | `NOT_FOUND` | Reserved for a future contracted resource route; not expected from current list operations | Show not found; do not infer an empty catalogue |
| 405 | `METHOD_NOT_ALLOWED` | Unsupported HTTP method on a known API route | Correct method; no automatic retry |
| 406 | `NOT_ACCEPTABLE` | Client explicitly requests an unsupported response format | Request JSON |
| 429 | `RATE_LIMITED` | Only when a configured deployment-level control actually enforces a request limit and the limit is exceeded; not provided by the current Option B evidence | Respect `Retry-After` if supplied; no aggressive retry |
| 500 | `INTERNAL_ERROR` | Unexpected server failure | Show recoverable generic error; support may use requestId |
| 503 | `CATALOGUE_UNAVAILABLE` | Catalogue store/provider unavailable or no valid snapshot can be served | Show recoverable error; do not substitute fabricated data |
| 504 | `UPSTREAM_TIMEOUT` | Approved upstream dependency exceeds configured timeout | Show recoverable error; retry only within client retry policy |

For 429 responses, `Retry-After` is an optional integer number of seconds. No numeric rate limit is currently approved or established for Option B. Do not claim or simulate `RATE_LIMITED` unless an actual deployment-level control enforces the limit. See [RATE-LIMITING-DECISION.md](RATE-LIMITING-DECISION.md). The 404/405/406 entries are HTTP semantics for gateway/routing behavior; only the current list operations are defined application routes.

## Rules

- Current list operations return `200` with `items: []` when the published set is genuinely empty. An outage, invalid catalogue snapshot or timeout must not be represented as an empty success.
- Error responses must not echo query values or request bodies.
- Do not return HTTP 200 with an error envelope.
- Do not return an eligibility state from an API error. Eligibility is local matching and an API failure is a transport/catalogue failure, not `NOT_ELIGIBLE`.
- If the client receives invalid JSON, wrong content type, missing required schema properties, invalid enums or missing provenance, treat it as `CATALOGUE_INVALID` and fail closed.
- Client retry is permitted only for transient `429`, `503` and `504`, bounded by the yet-to-be-approved runtime retry profile. Do not retry `400`, `405`, `406` or schema validation errors.
- Never log request bodies, marks, interests, matching results or tracker entries. Technical logs may include status, route template, latency and requestId only, subject to provider review.

## Local interface errors (not HTTP)

| Code | Meaning | Required behavior |
|---|---|---|
| `INVALID_INPUT` | Required stage/subject/mark invalid or missing | Field-level accessible validation; no matching |
| `UNSUPPORTED_SUBJECT` | Subject ID/alias not in approved subject catalogue | Name unsupported subject; do not guess equivalent |
| `DUPLICATE_SUBJECT` | Multiple inputs resolve to same canonical subject | Ask learner to resolve duplicate |
| `CATALOGUE_INVALID` | Invalid schema/provenance/enum/source URL | Do not show definitive match; recoverable error |
| `CATALOGUE_STALE` | Catalogue record exceeds review policy or cycle is not applicable | Show stale/unknown limitation; no unsupported eligibility |
| `RULES_INCOMPLETE` | Material mandatory rule is missing/unsupported | Return `UNKNOWN` unless a verified mandatory failure already determines `NOT_ELIGIBLE` |
| `INVALID_TARGET` | Tracker target does not resolve to an available catalogue record | Reject tracker addition |
| `INVALID_STATUS_TRANSITION` | Tracker state change is not permitted by approved transition table | Preserve prior state and explain allowed next action |
| `INVALID_DATE` | Invalid date or unsupported timezone assumption | Reject/keep date unknown; never infer timezone |
| `FIELD_LIMIT_EXCEEDED` | Notes or checklist field exceeds contract bounds | Field-level validation; do not truncate silently |
