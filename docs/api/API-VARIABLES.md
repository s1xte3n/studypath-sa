# StudyPath SA — API and Interface Variables

**Contract version:** 1.0.0-draft. This inventory is normative for the current contract.

## 1. Path variables

| Variable | Type | Used by | Required | Validation |
|---|---|---|---|---|
| None | — | API-001, API-002 | — | Both are collection routes; no path parameters |

No individual detail route is defined in v1; the bounded collection response contains approved detail fields. Add a detail route only through change control.

## 2. Query variables

| Variable | Type | Used by | Required/default | Validation / semantics |
|---|---|---|---|---|
| None supported | — | API-001, API-002 | No query parameters | Any query parameter, including unknown or empty parameters, returns `400 INVALID_QUERY_PARAMETER`. The pilot returns all published items in deterministic ID order. |

Pagination, filtering and client-controlled sorting are intentionally absent for the bounded 6–8 programme and 3–5 funding pilot. If scale requires them, add a backward-compatible or new-version contract change rather than silently accepting parameters.

## 3. Headers

| Header | Direction | Required | Contract |
|---|---|---|---|
| `Accept` | Request | Recommended | `application/json`; unsupported explicit media type may receive `406 NOT_ACCEPTABLE` |
| `Content-Type` | Request | No body on GET | Do not send a request body. If a body is sent, gateway/runtime must reject it rather than interpreting learner data |
| `Authorization` | Request | No | Public catalogue is anonymous. A bearer token does not personalize or change catalogue contents |
| `Cache-Control` | Response | Runtime-dependent | Must be approved with provider/runtime profile; never treat expired rules as current |
| `Retry-After` | Response | Optional | Integer seconds when 429/temporary retry window is communicated |
| `X-Request-Id` | Response header | Optional duplicate | If exposed, it must equal `error.requestId`; no learner/session identifier |

Do not define CORS origins until the deployment origin is approved. Do not expose secrets in headers.

## 4. Body variables — public HTTP operations

API-001 and API-002 accept no request body. No learner data may be sent in a GET body, path, query string, header or cookie. Unknown request-body handling must be strict at the gateway/runtime.

## 5. Browser-local input variables (IF-001)

| Field | Type | Required | Nullability/default | Validation/privacy |
|---|---|---|---|---|
| `stage` | enum | Yes | Non-null | `GRADE_11`, `GRADE_12`, `MATRIC_GRADUATE` |
| `subjects` | array of `{subjectId, mark}` | Yes | At least one entry | Canonical supported subject ID; unique after alias normalization; integer mark 0–100 inclusive |
| `interests` | string array | No | Empty array when omitted in normalized local state | Only values from the approved interest vocabulary; no free-form PII |
| `province` | enum | No | Null when not supplied | South African province enum from schemas |
| `studyModes` | enum array | No | Empty array when omitted | `ON_CAMPUS`, `ONLINE`, `DISTANCE`, `HYBRID`, `UNKNOWN` |
| `fundingRequired` | — | Not in first explorer form | Not applicable | Funding need is excluded from the first form; any separate P1 flow requires its approved limited-input contract |

Marks, interests, stage, province, matching results and tracker entries remain in page memory. They are prohibited from URLs, local/session storage, cookies, analytics, logs, error telemetry and API requests.

## 6. Browser-local tracker variables (IF-002)

| Field | Type | Required | Nullability/limit |
|---|---|---|---|
| `id` | opaque page-local string | Yes | Generated locally; never a server/database identifier |
| `targetType` | enum | Yes | `PROGRAMME` or `FUNDING_OPPORTUNITY` |
| `targetId` | CatalogueId | Yes | Must resolve to currently available catalogue record |
| `status` | ApplicationStatus | Yes | Default `DRAFT` |
| `deadline` | ISO date | No | Null if unknown; no guessed timezone |
| `requiredDocuments` | array of checklist items | No | Empty array by default; each item has bounded name and status |
| `notes` | string | No | Null by default; max 2,000 Unicode characters |
| `createdAt`, `updatedAt` | RFC 3339 UTC timestamps | Yes | Local runtime timestamp; not an official provider timestamp |
| `statusIsLearnerReported` | boolean | Yes | Always `true` |

No variable from IF-002 is sent to a server or persisted across page reload/close.

## 7. Response variables

Response property names, requiredness, enums and nullability are specified in `API-SCHEMAS.md`. API list envelopes always contain `contractVersion`, `catalogueVersion`, `generatedAt`, and `items`; `items` can be empty but never null. IDs are stable and case-sensitive. All public catalogue item order is ascending by `id`.
