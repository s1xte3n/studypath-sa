# Phase 4 — Rate-Limiting Decision

**Decision ID:** D-053  
**Date:** 2026-10-17  
**Status:** Engineering disposition for the current MVP; public hosted deployment remains blocked.  
**Related:** D-044, D-050–D-052, Q-018, Q-004, OR-019, ADR-004, ADR-005.  
**Scope:** Anonymous, read-only public catalogue routes only: `GET /api/v1/programmes` and `GET /api/v1/funding-opportunities`.

## Decision

1. **Do not add API Management or another paid gateway solely to obtain rate limiting under the R100/month total budget.**
2. **Do not implement an in-memory Function rate limiter.** It would not provide reliable shared enforcement across instances/restarts and must not be represented as an abuse control.
3. Keep Option B (Static Web Apps Free + managed Functions) as a **validation candidate only**. Its current evidence does not establish configurable numeric per-IP rate limiting.
4. Continue the local synthetic-only browser demo and local API harness work. A publicly accessible hosted API remains **NO-GO** until an effective abuse/traffic control is selected, costed, configured and tested, or the owner explicitly approves a documented risk exception after reviewing the threat and availability implications.
5. Do not treat the API contract's `429 RATE_LIMITED` response as implemented or guaranteed. A hosted handler/gateway may return this response only when an actual deployment-level enforcement control is configured and has triggered it. The API contract reserves the error semantics for that case.
6. Revisit a different runtime only if hosted API delivery becomes a confirmed requirement. Evaluate the actual enforcement mechanism and all-in monthly cost together; do not assume API Management Consumption supports arbitrary per-IP key limiting.

## Evidence and trade-offs

- Microsoft's Static Web Apps configuration documents IP-range access restrictions for the Standard plan, not a configurable numeric request-rate policy for the proposed Free managed API profile: https://learn.microsoft.com/en-us/azure/static-web-apps/configuration
- Microsoft's API Management policy reference says `rate-limit-by-key` returns 429 for a configured key limit, but the policy's supported-tier list excludes Consumption: https://learn.microsoft.com/en-us/azure/api-management/rate-limit-by-key-policy
- Microsoft's advanced throttling guidance explicitly states that `rate-limit-by-key` and `quota-by-key` are unavailable in API Management Consumption. Subscription-key-based rate limiting is not an adequate substitute for public anonymous clients because a key embedded in browser-delivered code is not secret: https://learn.microsoft.com/en-us/azure/api-management/api-management-sample-flexible-throttling
- A fixed-cost gateway or edge/WAF control may provide other options, but its applicability, regional availability, policy behavior and total cost have not been verified for this project. No estimate or budget compliance is implied.

The catalogue is intended to contain bounded, reviewed public records and make no upstream calls or learner-specific computations. This reduces backend exposure but does **not** eliminate scraping, denial-of-service, quota exhaustion or availability risks. Static Web Apps quotas and caching are not equivalent to a numeric per-IP rate limit.

## Required behavior

- No process-memory counters, hidden local-only throttles presented as security controls, or claims that Option B enforces a numeric per-IP limit.
- If no deployment-level rate control is present, do not fabricate a 429 response. Platform errors may still occur, but they are not proof of the contracted `RATE_LIMITED` control.
- If a control is later selected, document its keying scope, request/window limits, burst behavior, `Retry-After` behavior, counter scope, bypass/direct-origin exposure, monitoring, cost and abuse tests.
- Keep catalogue responses bounded, same-origin, cacheable only under an approved freshness policy, read-only and free of learner inputs. These controls are defence-in-depth, not replacements for rate limiting.
- Do not provision resources or deploy as part of this decision.

## Gate impact

- **Local synthetic-only work:** may continue.
- **Option B validation:** may continue; it must report numeric rate limiting as unsupported/unverified.
- **Public hosted API:** blocked pending an enforceable and cost-approved abuse-control decision or explicit owner-approved risk exception.
- **R100/month budget:** not certified by this decision.
- **Phase 4:** remains OPEN / NOT PASSED until its independent runtime, cost, security, contract and catalogue evidence gates pass.


## Follow-up options review — 2026-10-17

This review checks whether a managed edge/gateway provides a documented alternative that can be accepted under the existing R100/month total cap. It is documentation-only; no account was configured, no price quote was obtained, and no service was provisioned.

| Candidate | Evidence reviewed | Disposition for this MVP |
|---|---|---|
| Azure Static Web Apps Free + managed Functions | Static Web Apps managed APIs are supported, but the reviewed configuration does not establish a configurable numeric per-IP rate policy. See [Static Web Apps API support](https://learn.microsoft.com/en-us/azure/static-web-apps/apis). | Remains a validation candidate only; do not claim numeric per-IP limiting. |
| Azure API Management Consumption | Microsoft's policy reference says `rate-limit-by-key` is unavailable in Consumption; the flexible-throttling guidance confirms the tier limitation. See [rate-limit-by-key](https://learn.microsoft.com/en-us/azure/api-management/rate-limit-by-key-policy) and [advanced throttling](https://learn.microsoft.com/en-us/azure/api-management/api-management-sample-flexible-throttling). | Does not satisfy the required arbitrary per-IP key-based control. Do not assume subscription-key throttling protects an anonymous public browser API. |
| Azure Front Door Standard | Microsoft's published pricing lists a **US$35/month base fee** before request and data-transfer charges. See [Front Door pricing](https://azure.microsoft.com/en-us/pricing/details/frontdoor/). | Not compatible with the R100/month total budget on published base pricing alone; no calculator estimate or region-specific quote was obtained. |
| Cloudflare Free rate-limiting rules | Cloudflare's published feature table limits Free rule-expression fields to Path and Verified Bot; Source IP is listed for Business, not Free. See [rate-limiting features by plan](https://developers.cloudflare.com/learning-paths/application-security/rate-limiting/features/). | Not accepted as a verified per-IP control on the Free plan. A different paid plan would require separate pricing and approval. |

### Result

No reviewed option is both demonstrated to enforce the required anonymous per-IP limit and evidenced as fitting the R100/month total cap. This is a bounded documentation review, not proof that no alternative exists.

**Disposition unchanged:** keep public hosted API **NO-GO**. Continue local synthetic-only validation. Reopen the decision only if (a) the owner changes the budget and approves a fully costed enforcement design, or (b) the owner explicitly requests a documented risk-exception review after considering abuse, availability, and cost exposure. A risk exception must not be described as rate limiting, and it does not itself establish that the R100/month cap is met. Do not provision or deploy as part of this review.
