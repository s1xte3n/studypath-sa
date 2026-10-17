# Phase 4 — Option B Compatibility, Security and Cost Evidence

**Review date:** 2026-10-17  
**Status:** Documentary assessment complete for candidate screening; hosted runtime validation and all-in cost certification remain blocked/unverified.  
**Owner decision:** Option B approved for validation only.  
**Not authorized:** Azure provisioning, paid services, hosted API implementation, deployment, or real learner data.  
**Budget ceiling:** R100/month total project spend.

## 1. Executive disposition

**Option B remains a reasonable first candidate, but it is not yet cleared for implementation or deployment.**

Official Microsoft documentation supports the main shape: Static Web Apps Free includes managed Azure Functions APIs; the app exposes those APIs under the `/api` prefix; Node.js 22 is listed in the current Static Web Apps runtime configuration documentation; and the platform imposes a 45-second maximum API request duration. The exact managed route mapping and deployed behavior have not been tested, and no deployment is authorized.

The full monthly cost is **not certified**. Static Web Apps Free is listed at $0, but the integrated API is billed at Azure Functions Consumption rates. The applicability of free grants, subscription-specific billing, ancillary usage, GitHub Actions usage, and the billing currency/tax treatment still need private account review. No evidence currently proves the complete project cost remains under R100/month.

## 2. Compatibility evidence

### 2.1 Verified from current public documentation

| Concern | Evidence | Assessment |
|---|---|---|
| Managed API available on Free | Static Web Apps plans and pricing list managed Azure Functions APIs on Free; bring-your-own API backends require Standard | Supports trying Option B without a separate Function App or API Management |
| Route prefix | Static Web Apps API prefix is fixed at `/api`; same-app routing avoids custom CORS rules | Contract paths `/api/v1/programmes` and `/api/v1/funding-opportunities` are compatible in principle |
| Node runtime | Current Static Web Apps configuration and language/runtime pages list `node:20` and `node:22` values | Use Node.js 22 as the validation candidate, set explicitly via `staticwebapp.config.json`; do not infer API runtime from Vite's build Node version |
| Request duration | Static Web Apps API overview documents a 45-second maximum duration per API request | API should be designed to return quickly and make no upstream calls |
| Managed API restrictions | Managed Functions are HTTP-trigger-only; no managed identity, Key Vault references, Durable Functions, or direct standalone Function endpoint | Fits a simple public read-only catalogue only if it needs no secrets, background jobs, or private downstream resources |
| Logging | Microsoft managed-Functions documentation says logs are available if Application Insights is added | Do not enable Application Insights until fields, retention, access and cost are approved; lack of App Insights also limits operational diagnostics |
| Free quota | Published quota page lists 100 GB bandwidth/subscription/month, 250 MB max single deployment, 500 MB storage across environments, and no Free-plan overage bandwidth | Quota excess may interrupt service; Free has no SLA |

**Documentation caveat:** Microsoft's API-support article still contains an older runtime list that labels Node.js 20 as preview and omits Node.js 22. The newer Static Web Apps runtime configuration/language pages list Node.js 22. This documentation-version discrepancy means Node.js 22 is a candidate to test, not a claim that the hosted runtime has been verified.

### 2.2 Repository facts inspected

At main commit `62669c2eb7466c0d363c412d6a71b1342b0d1b17`:

- `package.json` describes a React/Vite browser application and has build/test scripts.
- `vite.config.js` configures the local Vite dev and preview servers.
- The repository tree contains the OpenAPI contract and contract-validation workflows.
- The inspected tree does not contain a top-level API handler directory, `staticwebapp.config.json`, or a Static Web Apps deployment workflow.

Therefore the current repository does **not** yet prove that the two public API routes are implemented or that the Static Web Apps deployment contract is configured.

### 2.3 Required local-only compatibility checks

Before any deployment approval, implement or prepare a local synthetic integration harness (without adding a hosted service) to verify:

1. Both exact contract paths resolve to the correct handler route after the `/api` prefix.
2. The API runtime is explicitly set to the selected supported Node version and the configuration file is included in the expected deployment artifact.
3. Only `GET` is accepted; unknown query parameters and any request body are rejected with the canonical error schema.
4. Response schemas, stable ID ordering, error envelopes, content type, safe headers and empty-catalogue behavior match the OpenAPI contract.
5. Catalogue records cannot be published unless source, applicable cycle, verification timestamp and curator approval are present.
6. Integration tests use synthetic fixtures only and include learner-marker sentinels proving no learner input is transmitted.

These local checks can validate handlers and packaging, but **cannot prove the Azure-managed runtime's deployed behavior**. Hosted route verification remains blocked until a separate deployment authorization is given.

## 3. Security and privacy assessment

### Required controls for this public catalogue profile

- **Anonymous by design:** no learner identity, profile, marks, interests, match results, funding circumstances or tracker data are accepted or returned.
- **Read-only allow-list:** implement only `GET /api/v1/programmes` and `GET /api/v1/funding-opportunities`. No write, upload, identity, admin, health-detail or learner-specific endpoints.
- **Strict request handling:** reject unknown query parameters, request bodies and unsupported methods in handler code. Do not assume platform route rules alone enforce API business validation.
- **Same origin:** frontend requests use the Static Web Apps `/api` route. Do not configure wildcard CORS; no external origin is currently approved.
- **No secrets:** managed Functions lack managed-identity and Key Vault-reference support. The catalogue handler must require no secrets or privileged downstream access.
- **Minimal response:** publish only reviewed public catalogue data; use bounded response size and safe error messages; never return stack traces or internal configuration.
- **No learner telemetry:** no request/response body capture, profile data, tokens, learner-specific URLs, analytics, session replay or error payloads. Application Insights remains disabled unless a separate cost/privacy review approves a technical-metadata allow-list and retention.
- **Cache policy:** set cache headers on the API response itself. Static Web Apps global headers do not modify API responses. Proposed initial value for review: `Cache-Control: public, max-age=300, must-revalidate`; no stale-while-revalidate until source freshness behavior is proven. This is a proposal, not an approved setting.
- **Freshness:** include catalogue version, applicable cycle and verification timestamps; client must not present stale/incomplete rules as current. Caching does not replace source verification.
- **Timeouts/retries:** no upstream calls should be made by these handlers. Target sub-second execution in tests; treat the platform's 45-second maximum as a hard ceiling, not a normal target. Do not add automatic retry loops.
- **Abuse/rate limits — OPEN RISK:** the reviewed Static Web Apps documentation does not establish a native configurable numeric per-IP rate limit for this managed API profile. Do not claim one exists. A process-memory counter is not a reliable distributed rate limit. Verify available platform controls before approval; if a hard rate-limit requirement cannot be met, Option B fails that requirement and the team must re-evaluate Option C or another explicitly costed control.
- **Availability:** Free has no SLA and can stop serving after quota excess. This is acceptable only if the owner explicitly accepts demo-level availability; do not claim production resilience.

### Security conclusion

The low-sensitivity, read-only data model is compatible with a minimal managed API in principle. The major residual risk is anonymous abuse/availability and the lack of verified numeric rate limiting/operational diagnostics. These are **open gates**, not resolved controls. If rate limiting or diagnostics require paid services, re-estimate before proceeding; do not add them silently.

## 4. Monthly cost model

### 4.1 Known published price basis

| Component | Candidate configuration | Public price basis | Current estimate status |
|---|---|---|---|
| Static Web Apps | Free plan, one app, Azure-provided hostname | Published price is $0; Free includes managed Functions API integration | $0 for the listed hosting plan, subject to published quotas and terms |
| Managed Functions API | Consumption billing, HTTP-only, no upstream dependencies | Azure Functions Consumption list rates: $0.20 per million executions and $0.000016 per GB-second; monthly grants list 1 million executions and 400,000 GB-s for eligible paid Consumption subscriptions | Conditional; actual eligibility and managed API billing must be checked against the subscription |
| API Management | Excluded | None | $0 because not included |
| Separate Function App | Excluded | None | $0 because not included |
| PostgreSQL / Blob Storage / Entra / Key Vault / AI | Excluded | None | $0 because not included |
| Application Insights / paid monitoring | Excluded | Not estimated | $0 only while not enabled; diagnostic gap remains |
| Custom domain | Excluded; use Azure-provided hostname | No registrar purchase planned | $0 in this profile; any future domain is a new cost decision |
| GitHub Actions | Existing private-repository workflows; SWA deploy workflow not yet configured | GitHub usage has separate plan and quota rules | Unknown until account plan, included minutes and artifact storage are verified |
| Ancillary network/storage/tax/currency | Must be checked for the exact integrated API and billing scope | Not established by the Static Web Apps Free price alone | Unknown; prevents all-in cost certification |

### 4.2 Function usage scenarios

Azure Functions Consumption pricing states that billing is based on executions and GB-seconds. For illustration, assume the minimum billed execution shape of 128 MB memory and 100 ms duration (0.125 GB × 0.1 s = 0.0125 GB-s per call). These are workload calculations, not measured application usage.

| Monthly calls | GB-s at 128 MB × 100 ms | Execution-meter amount if no free grant | Compute-meter amount if no free grant | Combined indicative amount before ancillary charges |
|---:|---:|---:|---:|---:|
| 10,000 | 125 | $0.002 | $0.002 | $0.004 |
| 100,000 | 1,250 | $0.020 | $0.020 | $0.040 |
| 1,000,000 | 12,500 | $0.200 | $0.200 | $0.400 |

Formula: executions ÷ 1,000,000 × $0.20, plus billable GB-s × $0.000016. Values are rounded for readability. Regional rates, minimum metering, request duration/memory, eligibility for free grants, network/storage usage, and applicable taxes/currency conversion may change the actual bill. If the subscription qualifies for the published free grants and stays within them, these two meters may be offset; **that is not confirmed for this subscription**.

The model demonstrates that a small catalogue API could have low function-meter costs. It does **not** prove a complete R100/month all-in cost because ancillary charges, grant eligibility and private billing scope remain unverified.

### 4.3 Private checks required to certify the R100/month cap

The owner must privately verify, without committing identifiers or screenshots:

1. Subscription offer/billing scope, billing currency, tax/transaction treatment and whether the Consumption free grants apply to the integrated managed API.
2. Current signed-in Azure Pricing Calculator result for the exact selected region and service configuration.
3. Cost Analysis for the relevant subscription and date range, including any pre-existing resources or shared usage that could be charged to the project.
4. Whether any storage, outbound data transfer, diagnostics or other meters apply to the managed API profile.
5. GitHub account plan, Actions minutes/artifact storage and whether the deployment workflow would incur any additional third-party cost.
6. A usage assumption, budget alert/monitoring owner, and a documented stop/disable procedure. A budget alert is not itself a hard spending cap.

**Cost gate result: NOT PASSED.** The public evidence and existing owner-supplied calculator result do not certify the all-in monthly total under R100. Do not provision until the private checks and exact resource inventory are reviewed and the total is demonstrated within the cap.

## 5. Proposed bounded deployment profile (not approved for deployment)

If all gates pass, validate this narrow configuration first:

- One Azure Static Web Apps Free resource, selected region confirmed by current calculator evidence.
- Managed Azure Functions API only; explicitly select Node.js 22 only after compatibility test and supported-runtime confirmation.
- Two anonymous, read-only catalogue routes under `/api/v1`.
- Versioned, curator-reviewed catalogue artifact; no database or external service calls.
- No API Management, separate Function App, database, storage service, identity, AI or paid telemetry.
- Azure-provided hostname; same-origin API calls; no CORS allow-list required for first-party calls.
- Small JSON responses; API response cache header proposed as above; strict schema and method/query/body validation.
- No secrets and no learner-specific data.
- Documented free-tier quota and abuse risk; if a hard rate-limit or availability guarantee is mandatory, stop and re-evaluate architecture/cost rather than claiming this profile meets it.

This profile is a candidate for further validation, not an authorization to provision or deploy.

## 6. Gate checklist

- [x] Owner approved Option B as a validation candidate only.
- [x] Public Microsoft documentation reviewed for plans, route prefix, API limits, runtime settings and pricing basis.
- [ ] Local synthetic route/contract integration tests completed.
- [ ] Exact managed runtime and route mapping proven without relying only on documentation.
- [ ] Security test for method/body/query rejection and public-only responses completed.
- [ ] Abuse/rate-limit and operational diagnostics decision recorded.
- [ ] Cache TTL/freshness policy approved.
- [ ] Private subscription, grant, Cost Analysis and GitHub usage checks completed.
- [ ] Complete all-in estimate demonstrates <= R100/month.
- [ ] Product owner approves final settings and separately authorizes provisioning/deployment.

**Current gate:** Phase 4 remains open. No Azure resources were provisioned and no deployment was performed.

## 7. Official sources reviewed 2026-10-17

1. Microsoft Learn — API support overview, fixed `/api` prefix and 45-second request maximum: https://learn.microsoft.com/en-us/azure/static-web-apps/apis-overview
2. Microsoft Learn — Managed Functions capabilities, restrictions, routing and Application Insights logging: https://learn.microsoft.com/en-us/azure/static-web-apps/apis-functions
3. Microsoft Learn — Current Static Web Apps configuration and API runtime values: https://learn.microsoft.com/en-us/azure/static-web-apps/configuration
4. Microsoft Learn — Supported Static Web Apps runtimes: https://learn.microsoft.com/en-us/azure/static-web-apps/languages-runtimes
5. Microsoft Learn — Static Web Apps quotas: https://learn.microsoft.com/en-us/azure/static-web-apps/quotas
6. Microsoft Azure — Static Web Apps pricing, including Functions Consumption billing rates basis: https://azure.microsoft.com/en-us/pricing/details/app-service/static/
7. Microsoft Learn — Azure Functions pricing, Consumption grants and rates: https://learn.microsoft.com/en-us/azure/azure-functions/pricing
8. Microsoft Learn — Static Web Apps response headers, route configuration and note that global headers do not affect API responses: https://learn.microsoft.com/en-us/azure/static-web-apps/configuration
9. Project cost worksheet (owner-supplied calculator output for Static Web Apps Free only): [AZURE-COST-ESTIMATE.md](../project/AZURE-COST-ESTIMATE.md)
10. Canonical API contract: [API-CONTRACT.md](API-CONTRACT.md)
11. Runtime option comparison: [RUNTIME-PROFILE-OPTIONS.md](RUNTIME-PROFILE-OPTIONS.md)
