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

### Option B — Azure Static Web Apps Free + managed Azure Functions API, without API Management

**Candidate to verify and cost first; not yet approved.**

- Static Web Apps Free hosts the frontend and its managed HTTP-triggered Functions API. Microsoft documents managed API functions as available on the Free plan.
- Serve only the two anonymous, read-only catalogue routes. Keep the API response limited to curator-approved catalogue data; no learner profile or tracker storage.
- Use the built-in same-app `/api` route where compatible with the approved `/api/v1` contract; verify routing and error behavior locally before any deployment.
- Keep catalogue data as a versioned, reviewed deployment artifact initially; do not add PostgreSQL, Blob Storage, identity or AI unless a separate approved requirement establishes need.
- Do not enable optional telemetry until its exact fields, retention, access and cost are reviewed.
- Verify the managed Functions runtime supports the selected Node.js runtime and the required APIs; do not assume compatibility based on the frontend's Node version.
- No learner inputs, matching results or tracker entries reach the API.

**Advantages:** potentially the smallest Azure-hosted API profile; the frontend and API share an origin and the built-in route avoids custom CORS rules for the app's own calls. Avoids a separate Function App and API Management resource.

**Disadvantages and checks:** managed Functions have platform/runtime restrictions and API constraints. Confirm route prefix mapping, supported Node runtime, response duration limits, API behavior, quotas, default logging and actual subscription pricing. Free-plan pricing does not establish total project cost, service availability or an SLA. No deployment until these checks and the full cost review pass.

### Option C — Azure Static Web Apps Standard + separate Azure Functions + optional API Management Consumption

- Use this only if Option B's managed API restrictions prevent meeting a confirmed requirement.
- Static Web Apps Standard is required for bringing an existing Functions app or API Management backend into the Static Web Apps routing integration.
- First evaluate Standard + separate Functions without API Management; add API Management Consumption only if gateway policy, routing, rate-limit or governance needs justify it.
- If a separate public Function endpoint is used, define its direct-access policy, CORS and abuse controls; do not assume Static Web Apps routing protects the Function endpoint itself.

**Advantages:** more control over the Functions hosting plan and runtime; API Management can centralize supported gateway policies if selected.

**Disadvantages and checks:** Standard hosting and separate Functions introduce additional cost/configuration; Functions requires a storage account and may create other billable usage. API Management Consumption is usage-billed, not proof of zero cost. Confirm total cost, region, quotas, provider logs/retention, direct endpoint security and any Static Web Apps integration requirements.

### Option D — API Management fixed-cost tier or full documented Azure baseline

**Not recommended for the initial MVP under the current evidence.**

The full stack (fixed-cost API Management, database, Blob Storage, identity, AI/document services and paid monitoring) is not justified by the two public read-only catalogue routes alone. Do not select it unless a specific approved requirement and a service-by-service estimate demonstrate that the complete project remains within the hard cap.

## Provisional recommendation

Evaluate **Option B first**, because it may satisfy the catalogue-only API need using Static Web Apps Free's managed Functions capability. Option C is the fallback if verified runtime/route constraints make Option B unsuitable. Keep Option A as the safe interim state while approval and cost evidence are gathered.

This is a recommendation for review, not a decision. It does not establish that Option B fits the budget, supports the required Node.js runtime, meets operational needs, or should be created.

## Evidence required before selecting Option B or C

1. Current Microsoft pricing calculator estimate for every proposed resource and selected region, plus a written inventory of resources included/excluded.
2. Confirmation of the actual subscription offer/billing scope and applicable free grants; review Cost Analysis privately and do not commit identifiers/screenshots.
3. Documented request-volume and execution-duration assumptions, with quota and overage stop conditions.
4. Runtime compatibility evidence for the managed Functions API, including Node.js version, route mapping to `/api/v1`, response constraints, and behavior for unsupported methods/queries.
5. Provider-settings review for request/response capture, access logs, diagnostics, retention, telemetry, default error pages and data location.
6. Threat review for anonymous routes, rate limits, abuse controls and, for Option C, direct Function endpoint exposure.
7. Approved CORS (if any cross-origin calls are used), cache TTL/stale policy, timeout/retry values, rate limits, logging allow-list/retention and operational owner.
8. Synthetic integration tests for both routes, error envelopes, response schema, catalogue provenance/freshness, unavailable/timeout behavior and proof learner data is absent from network requests and logs.
9. Product-owner approval of the selected option and explicit authorization before provisioning.

## External references reviewed 2026-10-16

- Microsoft Learn — API support overview and Static Web Apps plan constraints: https://learn.microsoft.com/en-us/azure/static-web-apps/apis-overview
- Microsoft Learn — API support in Static Web Apps with Azure Functions: https://learn.microsoft.com/en-us/azure/static-web-apps/apis-functions
- Microsoft Learn — Static Web Apps pricing plans: https://learn.microsoft.com/en-us/azure/static-web-apps/plans
- Azure Functions pricing and grants: https://azure.microsoft.com/en-us/pricing/details/functions/
- Microsoft Learn — Azure Functions consumption costs, including related storage/monitoring/network charges: https://learn.microsoft.com/en-us/azure/azure-functions/functions-consumption-costs
- Azure API Management pricing: https://azure.microsoft.com/en-gb/pricing/details/api-management/
- Existing project cost baseline and caveats: ../project/AZURE-COST-ESTIMATE.md
- Existing architecture alternatives and no-provisioning boundary: ../architecture/ADR-004.md

## Decision record — complete after review

- Selected option (A / B / C / D):
- Reason and requirement(s) satisfied:
- Hosting plan, runtime version and region:
- API Management decision and evidence:
- Complete monthly cost estimate / R100 cap confirmation:
- Approved CORS origins or same-origin confirmation:
- Cache TTL and stale policy:
- Timeouts/retries:
- Rate limits:
- Logging allow-list and retention:
- Operational owner and rollback/disable method:
- Reviewer / date:
- Explicit provisioning authorization (yes/no):
