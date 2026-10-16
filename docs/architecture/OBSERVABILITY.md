# StudyPath SA — Observability and Operational Signals

**Status:** Design proposal; no monitoring resource or runtime telemetry has been verified.  
**Privacy rule:** Learner profile inputs, results, marks, interests, funding criteria, and tracker notes must never be logged or emitted as telemetry.

## Goals and requirements

Supports `REQ-PRV-001`, `NFR-PRV-001`, `NFR-REL-001`, `NFR-DATA-001`, `NFR-PERF-001`, `NFR-SEC-001`. Observability must diagnose technical failure and catalogue quality without collecting learner-specific content.

## Current local demo

- Do not add analytics or session replay by default.
- Avoid console logging of inputs, results or source payloads that could contain user-entered values.
- Show user-facing loading, empty, stale, validation and recoverable error states.
- Record test results and build/CI evidence in repository/project artifacts, not learner session telemetry.
- Runtime privacy cannot be claimed until browser storage/network inspection and dependency/provider logging behavior have been reviewed.

## Future API telemetry contract

### Allowed structured log fields
- UTC timestamp
- environment and service/component name
- operation name and HTTP method/route template (not raw URL/query)
- status/error code
- duration in milliseconds
- generated request/correlation ID
- deployed version/commit SHA
- catalogue/schema version
- dependency outcome and retry count
- coarse technical exception class, with sanitized message

### Forbidden fields
- Request/response bodies
- marks, subject results, interests, location preferences or funding inputs
- eligibility result tied to a learner or profile
- tracker notes, application details, names, email, identity claims or tokens
- query strings, fragments, referrer strings containing inputs
- raw uploaded documents (uploads are out of scope)
- full source response bodies where they may contain untrusted/personal content

Use allowlisted logging rather than trying to redact arbitrary object serialization after the fact. Review platform default request logging and retention before enabling it.

## Metrics and operational signals

| Signal | Definition | Purpose | Alerting |
|---|---|---|---|
| Catalogue API availability | Successful public catalogue requests / valid requests | Detect service outages | Threshold/period must be approved with chosen host |
| API latency | Request duration by route template | Detect slow responses | Establish baseline before threshold |
| API error rate | 5xx/timeouts/schema errors | Detect failures | Threshold must be approved |
| Catalogue freshness | Age of last source verification by record/cycle | Prevent stale requirements | Flag records after 30 days or sooner on cycle/source/deadline change (OR-005) |
| Provenance completeness | Published rules with source, cycle, verification and sign-off | Detect unsafe records | Publication gate should require complete coverage |
| Unknown eligibility rate | Share of results classified UNKNOWN in golden set/aggregate tests | Detect unsupported catalogue coverage | Use only synthetic test aggregate; do not attach to user identity |
| False-positive ELIGIBLE count | Golden cases where evaluator returns ELIGIBLE but expected state is not | Critical correctness indicator | Release-blocking target: zero in approved golden set |
| Client failures | Schema mismatch, fetch failure, validation failures aggregated without values | Improve reliability | Do not send values or raw payloads |
| CI/deployment health | Workflow result, tested SHA, build/smoke result | Reproducibility | Required checks block release |
| Cost/usage | Resource usage and projected spend | Maintain R100/month cap | Alerts based on reviewed inventory; no cost assumptions here |

Do not create high-cardinality labels from user IDs, marks, subject combinations, or raw URLs.

## Traces and correlation

- Correlation IDs may link technical API gateway/function operations only.
- Never attach request bodies, profile values or source documents to traces.
- Browser-to-API distributed tracing is not enabled until instrumentation fields and propagation headers are reviewed.
- Do not use cookies or stable anonymous IDs for analytics in the current demo.

## Dashboards

If an API/cloud runtime is approved, a minimal dashboard should show:
1. Request volume, latency and 4xx/5xx/timeout rate.
2. Catalogue version and last successful publication.
3. Stale/expired records and provenance completeness.
4. Synthetic golden-set eligibility failures, especially false-positive ELIGIBLE.
5. CI/deployment status and current commit.
6. Budget/usage forecast against the R100/month cap.

The current local demo can report test and catalogue validation outcomes in CI output and a reviewed release checklist; no cloud dashboard is required.

## Alerts and response

- P0: evidence of learner-data leakage, false-positive eligibility in release golden set, or published unsupported rule → stop demo/release, remove/withdraw affected content, preserve sanitized technical evidence and investigate.
- P1: catalogue freshness/provenance issue, repeated API errors, build/deploy failure or budget threshold approaching → block affected release or disable affected record/service until resolved.
- API dependency failure → bounded timeout, no unbounded retry; show retryable error state.
- Stale catalogue → mark unavailable/unknown; do not silently treat stale rule as current.
- Cost warning → stop provisioning/promotion until spend forecast is reviewed.

Exact alert thresholds, retention, on-call/incident owner and escalation contacts must be approved before production. Do not put private contact details in the repository.

## Verification checklist

- [ ] Inspect dependencies for analytics/session replay/telemetry.
- [ ] Inspect browser network, storage, console and error reporting with synthetic profiles.
- [ ] Inspect actual host/API provider access logs, request-body capture and retention.
- [ ] Confirm no PII/profile values in logs, traces, metrics, URLs or error messages.
- [ ] Verify catalogue freshness/provenance checks and golden-set failure visibility.
- [ ] Test dependency timeout, malformed response and stale-data behavior.
- [ ] Capture CI run URL and exact tested commit.
- [ ] Confirm alert ownership, response steps and cost alerts before deployment.

**Gate:** Observability plan documented; no runtime signals, dashboards or alerts are claimed as implemented.
