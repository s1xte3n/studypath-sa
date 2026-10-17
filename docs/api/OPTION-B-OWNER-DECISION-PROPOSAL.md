# Phase 4 — Owner Decision: Option B as the First Runtime Candidate

**Status:** Owner-approved candidate for validation only; not an approved deployable runtime, implementation authorization, or provisioning authorization.  
**Decision date:** 2026-10-17  
**Decision:** APPROVE CANDIDATE  
**Hard constraint:** Total project spend must remain at or below R100/month. No cloud resources may be provisioned under this decision.

## Recorded owner decision

The product owner approved **Option B — Azure Static Web Apps Free with its managed Azure Functions API, without API Management — as the first candidate for compatibility, security, and cost validation only**.

This approval is not approval to implement a hosted API, create resources, incur charges, configure a deployment origin, or deploy. The local synthetic-only React/Vite demo remains the working environment until the validation evidence is reviewed and a separate explicit provisioning/deployment authorization is given.

## Recommendation rationale

Option B is the smallest plausible hosted profile for the two contracted public catalogue operations:

- `GET /api/v1/programmes`
- `GET /api/v1/funding-opportunities`

The API is anonymous, read-only and non-personalized. Learner matching and the manual tracker remain browser-local. The API must not receive marks, subjects, interests, learner profiles, matching results, or tracker entries.

The candidate avoids adding a separate Function App, API Management, database, Blob Storage, identity service, or AI service without an approved requirement. This rationale is provisional until compatibility and cost gates pass.

## Validation conditions before Phase 4 can pass

- [ ] Confirm current Static Web Apps Free managed API capabilities, supported Functions/Node.js runtime, route mapping for the exact `/api/v1` contract, request/response limits, and unsupported-method behavior. Run local synthetic integration tests; documentation alone is insufficient.
- [ ] Prepare a complete resource inventory and current pricing estimate for the selected region, including any storage, network, monitoring, domain, or other charges. Verify the subscription offer and free grants privately. Demonstrate total expected spend stays within R100/month with usage/overage stop conditions.
- [ ] Inspect default platform and application logging/diagnostics. Specify an allow-list of technical metadata only, access controls and retention. No request/response bodies, learner values, tokens, profiles, or matching results may be logged.
- [ ] Define cache TTL and stale-data behavior; timeout and retry rules; numeric abuse/rate-limit behavior; safe error envelopes; and the operational disable/rollback method.
- [ ] Confirm the app and API can use same-origin routing. Do not invent deployment origins or configure wildcard CORS as a shortcut.
- [ ] Add synthetic API integration tests for both routes, response schemas, errors, unavailable/timeout behavior, query/body rejection, catalogue provenance/freshness, and proof that learner sentinel values are not transmitted or logged.
- [ ] Verify the catalogue has only curator-approved, source-backed records before returning records as published. An empty or incomplete catalogue must not be misrepresented as verified recommendations.
- [ ] Obtain explicit approval for the final runtime settings and a separate explicit authorization before any provisioning or deployment.

If a condition fails, retain the local demo and evaluate Option C only against the specific unmet requirement. Do not provision a paid/metered resource to “try it”.

## Scope excluded from this decision

This decision does not approve or implement PostgreSQL, Blob Storage, Entra External ID, AI/Document Intelligence, authenticated learner endpoints, learner data persistence, uploads, admin write routes, analytics/session replay, or application submission.

No real learner data may be used. No cloud resources, paid services, deployment origins, secrets, or deployment settings are authorized by this decision.

## Next gate

Produce the evidence report covering compatibility, security, cost, residual risks, and unresolved private subscription checks. Phase 4 remains open until the evidence is reviewed and all required gates pass.

## Evidence references

- [Runtime profile options](RUNTIME-PROFILE-OPTIONS.md)
- [Canonical API contract](API-CONTRACT.md)
- [API variables and privacy boundary](API-VARIABLES.md)
- [ADR-004 — runtime and cost boundary](../architecture/ADR-004.md)
- [Microsoft Static Web Apps API overview](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-overview)
- [Microsoft Static Web Apps Functions API support](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-functions)
- [Microsoft Static Web Apps plans](https://learn.microsoft.com/en-us/azure/static-web-apps/plans)
- [Azure Functions pricing](https://learn.microsoft.com/en-us/azure/azure-functions/pricing)
