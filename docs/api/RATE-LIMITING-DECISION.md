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
