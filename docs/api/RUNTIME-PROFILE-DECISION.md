# Phase 4 — Runtime Profile Decision and Exit Evidence

**Status:** Review checklist / decision record template. No runtime profile is approved by this document.
**Date:** 2026-10-16
**Owner:** Product owner / cloud owner / security reviewer (currently one person; independent review is not confirmed).
**Controls:** D-051, D-052, Q-018, Q-020, OR-019. The R100/month hard cap and no-provisioning boundary remain in force.

## Purpose

The public catalogue wire contract is owner-approved for continued work. Phase 4 cannot be marked CONTRACT READY for implementation until the deployment/runtime profile is explicit enough to implement, verify and cost. This document makes the remaining decisions reviewable without inventing deployment values or authorizing provisioning.

## Fixed contract boundaries

- Public operations only: GET /api/v1/programmes and GET /api/v1/funding-opportunities.
- Anonymous, read-only, non-personalized responses. No learner marks, subjects, interests, profiles, match results, account identifiers, financial circumstances or tracker data in requests, logs or responses.
- No API write routes, authenticated routes, upload/AI route, profile persistence or tracker endpoint.
- Published records must be curator-approved and source-backed. Invalid, stale or unavailable catalogues must fail closed; they must not become a fabricated empty success.
- No real learner data, Azure provisioning, paid/metered service or deployment until the relevant approval and evidence gates pass.

## Runtime profile decisions still required

Do not substitute a guessed default for a row marked OPEN.

| Decision | Required approved value/evidence | Current state | Gate consequence |
|---|---|---|---|
| Runtime/provider composition | Named hosting/runtime services and whether API Management is required; component diagram and trust boundaries | OPEN under Q-018 / OR-019 | No implementation of a hosted API or provisioning |
| Origin and CORS | Approved exact deployment origin(s), allowed methods/headers, preflight behavior; no wildcard with credentials | OPEN; deployment origin not approved | Do not configure or invent production origins |
| Cache policy | Numeric TTL, cache headers, stale-on-error policy, and rule/catalogue freshness behavior | OPEN | No claim of freshness or safe hosted caching |
| Timeouts and retries | Per-hop timeout, total request budget, retryable status codes, max attempts/backoff, and idempotency rationale | OPEN | Do not implement arbitrary retries/timeouts |
| Rate limits | Numeric per-IP/client limits, response behavior, Retry-After semantics, and abuse assumptions | OPEN | No operational abuse-control claim |
| Request/diagnostic logging | Exact fields retained, redaction rules, access controls, provider defaults, retention period and deletion evidence | OPEN | No learner data; no runtime approval |
| Error correlation | Request-ID generation/validation, propagation and safe response behavior | Contract envelope defined; runtime behavior OPEN | Contract is not runtime evidence |
| Cost and quotas | Saved cost estimate for the complete service list, region, traffic assumptions, quotas/overages and billing evidence | OPEN; hard cap R100/month | No provisioning or paid/metered services |
| Data publication | Source evidence, cycle, all material rules, provenance, test oracle and curator approval for each record | OPEN (Q-019 evidence completeness) | Do not publish unapproved catalogue records |
| Operational ownership | Health/alert approach, outage behavior, rollback/disable procedure and accountable operator | OPEN | No release readiness claim |

## Required evidence pack

Before the gate review, attach or link:

1. A completed runtime profile with every table row assigned a value, evidence reference, owner and review date.
2. A cost estimate for every proposed service and any third-party tool, reconciled to the R100/month cap. Identify zero-cost assumptions and quota/overage risks.
3. A redacted provider configuration review covering access logs, diagnostic logs, request/response capture, retention, telemetry, CDN/cache behavior, default error pages and region.
4. Tests or verifiable configuration assertions for CORS, cache headers, request-size/body rejection, unsupported query parameters, error envelopes, timeout/unavailable behavior, rate limiting and absence of learner-data logging.
5. Per-record publication evidence for the initial programme/funding catalogue. A contract schema does not make a record verified.
6. Product-owner approval of the completed profile and explicit approval before any provisioning or deployment. Independent review remains recommended before public learner use.

## Safe interim implementation rule

Until the profile and cost are approved, keep work to repository-local tests, synthetic fixtures, OpenAPI/schema validation and browser-only behavior. Do not add an API runtime, cloud resources, external telemetry, a deployment origin, secrets, or a client API call that would imply a hosted service exists.

## Gate decision

- **Wire-contract baseline:** owner-approved for continued contract work (D-052).
- **OpenAPI and static contract assertions:** automated in CI; review the latest workflow result on the candidate commit.
- **Runtime/provider profile:** NOT READY.
- **Catalogue publication:** NOT READY.
- **Phase 4 CONTRACT READY:** OPEN / NOT PASSED until the required decisions and evidence are recorded.
- **Phase 5 environment-variable inventory:** should start from the approved runtime profile, not precede it or encode guessed values.
- **Provisioning/deployment:** not authorized.

## Decision record

Complete only after owner review:

- Runtime composition and API Management decision:
- Deployment origin(s) and CORS:
- Cache TTL/stale policy:
- Timeout/retry profile:
- Rate limits:
- Logging fields and retention:
- Cost evidence and cap confirmation:
- Catalogue publication evidence:
- Approved by / date:
- Links to verification runs:
- Explicit provisioning authorization (yes/no):
