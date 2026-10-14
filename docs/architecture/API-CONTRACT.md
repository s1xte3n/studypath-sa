# StudyPath SA — Draft API Contract

**Version:** Draft v0.1  
**Base path:** `/api/v1`  
**Status:** Proposed for review; not frozen and not implemented.  
**Authority:** D-044 and `docs/architecture/ARCHITECTURE.md`.

## Purpose and privacy boundary
The API serves public curated catalogue data only under the interim privacy boundary. It must not receive learner marks, subjects, interests, profile values, matching results, tracker entries, identity data or sensitive financial data. Eligibility/funding matching remains client-side until OR-019 is explicitly resolved through change control.

All routes below are candidates. Do not implement until routes/schema, runtime, cache/error behavior and cost are approved.

## Candidate routes
| Method/path | Purpose | Learner data accepted? | Status |
|---|---|---|---|
| `GET /api/v1/programmes` | Return versioned curated programme catalogue and provenance | No | Draft candidate |
| `GET /api/v1/funding-opportunities` | Return versioned public funding opportunities and provenance | No | Draft candidate |

No write routes, server-side matching endpoint or tracker endpoint is approved. Do not add admin, auth, upload or health routes without a requirement/decision.

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
- Requests must not depend on learner inputs. Do not put learner data in path, query, headers, body or analytics.
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
- Confirm catalogue-only endpoints/client-side matching under OR-019/Q-018.
- Approve endpoint names, schemas, enums and validation rules.
- Decide runtime composition and API Management necessity after cost review.
- Approve cache freshness, timeout/retry, error envelope, CORS, rate limits and API version policy.
- Define executable schema/contract tests.
- Verify source records; schema design does not verify catalogue data.

**Contract gate: DRAFT / NOT IMPLEMENTATION-READY.**