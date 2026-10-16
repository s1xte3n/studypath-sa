# Phase 4 — Runtime Profile Options for Owner Decision

**Status:** Proposal for review only; no option is approved by this document.
**Date:** 2026-10-16
**Related:** D-004, D-044, D-050–D-052, ADR-001, ADR-004, ADR-005, Q-018, Q-020, OR-019.
**Hard constraint:** total project spend must remain at or below R100/month. This document does not authorize provisioning.

## Decision required

The public catalogue wire contract is approved for continued work, but a hosted runtime is not selected. Choose and approve a runtime profile before implementation of a hosted API or Phase 5 environment configuration.

The architecture direction is API-first (D-044). The current local synthetic demo remains the implementation slice and can continue without a hosted API. The static-only option below is therefore a fallback/demo choice, not a silent replacement for the API-first decision.

## Options

### Option A — Continue local/browser-only demo temporarily

- Keep the React/Vite app and synthetic inputs local.
- Do not make API calls; do not claim API-001/API-002 are implemented.
- Continue contract/schema tests and browser work in the repository.
- No cloud runtime cost while no resources are provisioned.

**Advantages:** lowest operational risk; no new provider logging or runtime CORS behavior to verify.

**Disadvantages:** does not deliver the approved API-first catalogue runtime. This is a temporary holding state, not Phase 4 closure.

### Option B — Static Web Apps Free + Azure Functions Flex Consumption, without API Management

**Candidate to cost and threat-model first; not yet approved.**

- Static Web Apps Free hosts the frontend.
- A separately deployed HTTP Azure Functions app serves only the two anonymous, read-only catalogue routes.
- Keep catalogue data as a versioned, reviewed deployment artifact initially; do not add PostgreSQL, Blob Storage, identity, AI or learner-profile persistence unless a separate approved requirement establishes need.
- Do not enable Application Insights or other telemetry until its exact fields, retention, access and cost are reviewed.
- Configure only the final approved frontend origin and exact allowed methods/headers.
- No learner inputs, matching results or tracker entries reach the API.

**Advantages:** preserves API-first direction with a smaller component set than the full documented Azure baseline; avoids a fixed API Management tier if the gateway is not required.

**Disadvantages and checks:** Azure Functions requires a storage account and may create other billable usage. Free execution grants depend on subscription/plan conditions and do not establish that total cost is zero. Region, hosting compatibility, quota, logging defaults, cold-start behavior, CORS, rate limiting and all service costs must be verified before approval. A direct public Function endpoint also needs an explicit threat/abuse review.

### Option C — Static Web Apps + Azure Functions + API Management Consumption

- Same catalogue-only backend boundary as Option B, with API Management Consumption in front of the Function.
- Use it only if gateway policy, routing, rate-limit or governance needs justify the additional component.

**Advantages:** a dedicated gateway boundary can centralize supported API policies.

**Disadvantages and checks:** increases configuration and operational complexity. Microsoft documents Consumption as usage-billed rather than a fixed monthly tier, but usage above included thresholds and the rest of the architecture may incur charges. This does not prove compliance with the R100/month cap. Confirm policy support, quota behavior, total cost and monitoring before selecting it.

### Option D — API Management fixed-cost tier or full documented Azure baseline

**Not recommended for the initial MVP under the current evidence.**

The full stack (API Management fixed-cost tier, database, Blob Storage, identity, AI/document services and paid monitoring) is not justified by the two public read-only catalogue routes alone. Do not select it unless a specific approved requirement and a service-by-service estimate demonstrate that the complete project remains within the hard cap.

## Provisional recommendation

Evaluate **Option B first**, with Option C as the fallback only if the threat/policy review identifies a requirement that Option B cannot satisfy. Keep Option A as the safe interim state while approval and cost evidence are gathered.

This is a recommendation for review, not a decision. It does not establish that Option B fits the budget, that the required plan is available in a chosen region, or that any resource should be created.

## Evidence required before selecting Option B or C

1. Current Microsoft pricing calculator export for every proposed resource and selected region, including the Function hosting plan, required storage account, bandwidth, logs/monitoring and any gateway.
2. Confirmation of the actual subscription offer/billing scope and whether relevant free grants apply; review Cost Analysis privately and do not commit identifiers/screenshots.
3. A documented request-volume and execution-duration assumption, with quota and overage stop conditions.
4. A provider-settings review for request/response capture, access logs, diagnostics, retention, telemetry, default error pages and data location.
5. A threat review for public anonymous routes, rate limits, abuse controls, error handling and the consequences of a public direct Function URL.
6. Approved exact CORS origin(s), cache TTL/stale policy, timeout/retry values, rate limits, logging allow-list/retention and operational owner.
7. Synthetic integration tests for both routes, invalid query/body/method behavior, response schema, catalogue provenance/freshness, timeout/unavailable behavior, rate limits, and proof that learner data is absent from network requests and logs.
8. Product-owner approval of the selected option and explicit authorization before provisioning.

## External references reviewed 2026-10-16

- Azure Functions pricing and grants: https://azure.microsoft.com/en-us/pricing/details/functions/
- Microsoft Learn, estimating Azure Functions consumption costs and related storage/monitoring/network charges: https://learn.microsoft.com/en-us/azure/azure-functions/functions-consumption-costs
- Azure API Management pricing: https://azure.microsoft.com/en-gb/pricing/details/api-management/
- Microsoft Learn, API Management tier capabilities (including Consumption tier limitations): https://learn.microsoft.com/en-us/azure/api-management/api-management-features
- Existing project cost baseline and its caveats: ../project/AZURE-COST-ESTIMATE.md
- Existing architecture alternatives and no-provisioning boundary: ../architecture/ADR-004.md

## Decision record — complete after review

- Selected option (A / B / C / D):
- Reason and requirement(s) satisfied:
- Hosting plan and region:
- API Management decision and evidence:
- Complete monthly cost estimate / R100 cap confirmation:
- Approved CORS origins:
- Cache TTL and stale policy:
- Timeouts/retries:
- Rate limits:
- Logging allow-list and retention:
- Operational owner and rollback/disable method:
- Reviewer / date:
- Explicit provisioning authorization (yes/no):
