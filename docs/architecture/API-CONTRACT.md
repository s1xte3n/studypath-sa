# StudyPath SA — Draft API Contract

**Version:** Draft v0.1  
**Base path:** `/api/v1`  
**Status:** Proposed for review; not frozen and not implemented.  
**Authority:** D-044/D-045 and `docs/architecture/ARCHITECTURE.md`.

## Purpose and tiered privacy boundary
- Anonymous requests may retrieve public curated catalogue data only. Anonymous APIs must not receive learner marks, subjects, interests, profile values, match results, tracker entries, identity data or sensitive financial data. Anonymous matching stays client-side.
- Authenticated server-side matching is the product direction under D-045, but no profile-bearing route is approved for implementation yet. A future route must require verified authentication, server-side authorization and ownership/account-isolation checks, accept only approved minimum fields, validate all input, avoid profile data in URLs/logs/telemetry, and define retention/deletion and error/cache semantics.
- D-046 approves the authenticated feature scope: server-side pathway matching, saved pathways, pathway comparison, saved funding opportunities and a derived dashboard. Academic profile persistence requires explicit opt-in; login alone is not consent. Q-020 remains open for exact schemas, lifecycle, identity, authorization/isolation, privacy/legal review, operational controls, tests and cost. No feature route is implementation-approved yet. The tracker remains page-memory-only and has no persistence/sync route.
- Do not use real learner data until applicable privacy/legal review and implementation controls are verified. Development/demo data must be synthetic.

All routes below are candidates. Do not implement until route/schema, identity, authorization, privacy/security, runtime, cache/error behavior, tests and total cost are approved.

## Candidate routes
| Method/path | Purpose | Learner data accepted? | Status |
|---|---|---|---|
| `GET /api/v1/programmes` | Return versioned curated programme catalogue and provenance | No | Draft candidate |
| `GET /api/v1/funding-opportunities` | Return versioned public funding opportunities and provenance | No | Draft candidate |
| `POST /api/v1/matches` | Authenticated server-side pathway matching using approved minimal profile fields | Yes, authenticated only | Candidate; schema/security/cost gate required |
| Authenticated profile resource (path TBD) | Read/update/delete opted-in academic profile | Yes, authenticated only | Candidate; explicit opt-in and lifecycle schema required |
| Authenticated saved-pathway resource (path TBD) | Add/list/remove stable programme IDs | No profile values; account-linked IDs | Candidate; ownership/deletion/retention contract required |
| Authenticated saved-funding resource (path TBD) | Add/list/remove stable funding-opportunity IDs | No profile values; account-linked IDs | Candidate; ownership/deletion/retention contract required |
| Pathway comparison (client-derived or API path TBD) | Compare approved fields from public catalogue records | No learner profile required by default | Candidate; comparison field set and UX contract required |
| Personal dashboard (path TBD or client-derived) | Aggregate only authorized matching/bookmark data | Depends on approved underlying features | Candidate; derived-data and cache behavior required |

Identity-provider routes and all candidate authenticated feature routes remain unfrozen and must not be implemented until the approved identity flow, schema, server-side authorization, account isolation, consent/lifecycle, privacy/logging/cache behavior, test contracts and full cost pass. No application-tracker endpoint is allowed: tracker entries remain page-memory-only. Do not add admin, upload or health routes without a requirement/decision.

## Draft response envelope
```json
{
  "catalogueVersion": "string",
  "generatedAt": "ISO-8601 timestamp",
  "items": []
}
```
These are schema placeholders, not catalogue data. Each item must carry record-specific provenance required by approved requirements. Inclusion in an API response does not make a record publication-ready.

### Programme fields to define
- Stable programme ID; institution and exact qualification/programme title.
- Qualification type only where the official source identifies it.
- Explicit applicable cycle; no silent carry-forward.
- Structured deterministic rules, including thresholds, conditions, alternatives, exclusions and explanation/source text.
- Official publisher, source title/URL, verification date(s), catalogue version, curator sign-off and currentness state.
- Unsupported rule limitations. Material unsupported rules must yield UNKNOWN.

### Funding fields to define
- Stable opportunity ID, provider and exact opportunity name.
- Official publisher, source title/URL, applicant/study criteria and conditions.
- Unsupported/sensitive criteria explicitly flagged as not assessed.
- Informational document checklist only; no uploads.
- Published amount/coverage and payment periodicity only if explicitly stated.
- Deadline exactly as published, timezone only when stated, applicable cycle, verification date, version, curator sign-off and currentness/expiry state.
- Official provider link for definitive eligibility and application steps.

## Transport and failure requirements
- HTTPS only; no secrets/API keys in browser code.
- Public catalogue requests must not depend on learner inputs and must not receive learner data. Authenticated matching may receive only approved minimum fields in the request body over HTTPS after all gates pass; never put profile values in paths, query strings, analytics, logs or error telemetry.
- Define cache headers/TTL and stale-data handling before implementation.
- Define bounded timeout/retry behavior and a consistent error envelope. UI must show recoverable errors; no fabricated fallback catalogue or eligibility result.
- Validate response schema. Missing provenance, malformed JSON, empty responses and API errors require explicit behavior.
- Inspect provider-generated technical logs and retention before public learner use.

## Candidate error envelope (proposed)
```json
{
  "error": {
    "code": "STRING_CODE",
    "message": "Safe, non-sensitive message",
    "requestId": "optional opaque correlation identifier"
  }
}
```
Approve before implementation. Do not include learner values, stack traces, secrets or internal configuration in errors.

## Decisions required to freeze the contract
- Preserve public catalogue-only requests and client-side anonymous matching under D-045. Define and approve authenticated schemas/routes for matching and the D-046 saved-profile/bookmark/dashboard features before implementation.
- Approve endpoint names, schemas, enums and validation rules.
- Decide runtime composition and API Management necessity after cost review.
- Approve cache freshness, timeout/retry, error envelope, CORS, rate limits and API version policy.
- Define executable schema/contract tests.
- Verify source records; schema design does not verify catalogue data.

**Contract gate: DRAFT / NOT IMPLEMENTATION-READY.**

## Q-020 lifecycle implementation-readiness proposal

The proposed data inventory, lifecycle rules, deletion/backup behavior, authorization requirements, cache/logging controls, candidate resource operations and approval register are documented in [Q020-LIFECYCLE-IMPLEMENTATION-READINESS.md](../project/Q020-LIFECYCLE-IMPLEMENTATION-READINESS.md). This does not freeze this draft contract. Exact schemas, status/error semantics, auth/session protocol, retention, idempotency, concurrency, rate limits and OpenAPI tests remain gates. No authenticated feature route is implementation-approved.
