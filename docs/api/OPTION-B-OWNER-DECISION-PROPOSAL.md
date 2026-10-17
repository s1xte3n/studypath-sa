# Phase 4 — Owner Decision Proposal: Option B as the First Runtime Candidate

**Status:** Proposed for owner approval; not an approved runtime, implementation authorization, or provisioning authorization.  
**Date:** 2026-10-17  
**Decision requested:** Approve or reject Option B as the *first candidate to validate*.  
**Hard constraint:** Total spend must remain at or below R100/month. No cloud resources may be provisioned under this proposal.

## Recommendation

Approve **Option B — Azure Static Web Apps Free with its managed Azure Functions API, without API Management — as the first runtime candidate to validate**.

This is the smallest plausible hosted profile for the currently contracted public catalogue API. It avoids adding a separate Function App, API Management, database, Blob Storage, identity service, or AI service without an approved requirement. It is a candidate, not a claim that the option is compatible, free in total, secure enough, or ready to deploy.

Keep the existing local synthetic-only React/Vite demo as the working environment while validation is performed.

## Why this is the preferred candidate

1. The v1 API contract contains only two anonymous, read-only catalogue operations: `GET /api/v1/programmes` and `GET /api/v1/funding-opportunities`.
2. Learner matching and the manual tracker remain browser-local. The API must not receive marks, subjects, interests, learner profiles, matching results, or tracker entries.
3. A same-app managed API may avoid a separate public API origin and the associated CORS configuration.
4. Avoiding unnecessary services reduces cost, configuration, security boundaries, and operational work under the R100/month cap.
5. Option C (Static Web Apps Standard plus a separate Function App, with API Management only if justified) remains the fallback if a verified managed-API limitation blocks a requirement.

## Conditions before Phase 4 can pass

Option B is **not** selected as the deployable runtime until every item below has evidence and owner sign-off:

- [ ] Confirm current Static Web Apps Free managed API capabilities, supported Functions/Node.js runtime, route mapping for the exact `/api/v1` contract, request/response limits, and unsupported-method behavior using current Microsoft documentation and a local synthetic integration test.
- [ ] Prepare a complete resource inventory and current pricing estimate for the selected region, including any storage, network, monitoring, domain, or other charges. Verify the subscription offer and free grants privately. Demonstrate the total stays within R100/month with usage/overage stop conditions.
- [ ] Inspect default platform and application logging/diagnostics. Specify an allow-list of technical metadata only, access controls and retention. No request/response bodies, learner values, tokens, profiles, or matching results may be logged.
- [ ] Define cache TTL and stale-data behavior; timeout and retry rules; numeric abuse/rate-limit behavior; safe error envelopes; and the operational disable/rollback method.
- [ ] Confirm the app and API can use same-origin routing. Do not invent deployment origins or configure wildcard CORS as a shortcut.
- [ ] Add synthetic API integration tests for both routes, response schemas, errors, unavailable/timeout behavior, query/body rejection, catalogue provenance/freshness, and proof that learner sentinel values are not transmitted or logged.
- [ ] Verify the catalogue has only curator-approved, source-backed records before returning records as published. An empty or incomplete catalogue must not be misrepresented as verified recommendations.
- [ ] Obtain explicit approval for the final runtime settings and a separate explicit authorization before any provisioning or deployment.

If any condition fails, retain the local demo and evaluate Option C only against the specific unmet requirement. Do not provision a paid/metered resource to “try it”.

## Scope that remains excluded

This proposal does not approve or implement PostgreSQL, Blob Storage, Entra External ID, AI/Document Intelligence, authenticated learner endpoints, learner data persistence, uploads, admin write routes, analytics/session replay, or application submission.

No real learner data may be used. No cloud resources, paid services, deployment origins, secrets, or deployment settings are authorized by this proposal.

## Decision requested from product owner

Choose one:

- **APPROVE CANDIDATE:** Option B is the first candidate for documentation, compatibility, security, and cost validation only. This is not authorization to deploy.
- **REJECT CANDIDATE:** Keep Option A (local synthetic demo) and record the reason or preferred alternative before further runtime work.

**Owner decision:** Pending  
**Reason:** Pending  
**Date:** Pending

## Evidence references

- [Runtime profile options](RUNTIME-PROFILE-OPTIONS.md)
- [Canonical API contract](API-CONTRACT.md)
- [API variables and privacy boundary](API-VARIABLES.md)
- [ADR-004 — runtime and cost boundary](../architecture/ADR-004.md)
- [Microsoft Static Web Apps API overview](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-overview)
- [Microsoft Static Web Apps Functions API support](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-functions)
- [Microsoft Static Web Apps plans](https://learn.microsoft.com/en-us/azure/static-web-apps/plans)
- [Azure Functions pricing](https://azure.microsoft.com/en-us/pricing/details/functions/)
