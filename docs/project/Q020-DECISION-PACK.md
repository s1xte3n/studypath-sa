# Q-020 Gate-Closure Decision Pack

**Status:** Owner decisions A–E APPROVED on 2026-10-15. Approval records the design direction and constraints only; it does not pass Q-020 implementation readiness or authorize implementation, provisioning, production identity configuration, deployment, or real learner-data use.
**Date:** 2026-10-15
**Decision record:** [Q-020 owner decisions A–E](Q020-OWNER-DECISIONS-A-E.md)
**Related:** [Lifecycle readiness](Q020-LIFECYCLE-IMPLEMENTATION-READINESS.md), [API contract](../architecture/API-CONTRACT.md), [Change control](Q020-CHANGE-CONTROL.md).

## Prior approvals

Q020-DEC-01–14 were recorded on 2026-10-15. Those approvals set the direction to evaluate Microsoft Entra External ID first, minimize persisted profile fields, require explicit profile-storage opt-in, avoid default match-history persistence, treat retention/deletion periods as targets subject to verification, and require privacy, architecture, cost and test gates.

## Owner decisions A–E

### A — APPROVED: identity/session design baseline

Evaluate Microsoft Entra External ID as the first identity-provider candidate, subject to provider, audience, privacy and cost checks. The proposed browser SPA design is OpenID Connect authorization-code flow + PKCE using MSAL, with token cache in memory only. Tokens must not be persisted in localStorage, sessionStorage, IndexedDB, URLs, cookies, analytics or logs. Send access tokens only in the Authorization header to the intended API. Server-side validation must cover issuer, audience, signature, expiry and required scopes. Logout must clear in-memory account state. A reload may require reauthentication.

**Limit:** This is an approved design direction, not a configured or provider-verified implementation. XSS/CSP/dependency controls, tenant/service terms, supported flows and exact configuration still require review. Microsoft references: [authorization-code flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow), [External ID architecture](https://learn.microsoft.com/en-us/entra/architecture/deployment-external-authentication-access-control).

### B — APPROVED: API and account-isolation baseline

The logical design baseline requires every authenticated API operation to derive ownership from the validated token subject. Client-supplied account IDs are never authoritative. Scope every read, write and delete to that subject; default deny; use parameterized SQL and account+catalogue-ID uniqueness constraints where applicable; return account data with no-store semantics; keep profile-bearing values out of URLs, logs and telemetry; and never send learner inputs to public catalogue endpoints.

**Limit:** This is a design baseline, not implementation authorization or evidence that authentication, authorization, SQL isolation or runtime privacy has been implemented or tested. Update the API contract, threat model and tests before any approved implementation.

### C — APPROVED: internal retention/deletion engineering targets only

- Stop profile use and writes immediately when profile-storage opt-in is withdrawn.
- Target active profile deletion within 30 days of withdrawal.
- Target active account-linked data deletion within 30 days of account deletion.
- Target backup expiry within 35 days; replay deletion tombstones before restored data is reactivated.
- Target routine operational-log retention of 30 days or less; never log profile payloads.
- Keep saved stable IDs until removal/account deletion; do not store match history or result snapshots by default.
- Retain only minimum consent/deletion evidence for a period set after privacy/legal review.

**Limit:** These are internal targets, not service guarantees, public promises or proof of implementation. Qualified privacy/legal review, provider-setting verification and executable deletion/restore tests are required before publishing commitments.

### D — APPROVED: hard R100/month cap; defer authenticated persistence/features

The hard cap is **R100 per month for the total project**. Defer implementation of authenticated persistence/features unless an evidence-backed, service-by-service forecast demonstrates that the entire design fits within the cap. Continue the anonymous static MVP with synthetic data and a page-memory-only tracker meanwhile. Do not provision paid/metered services until cost and provisioning gates pass.

The recorded $0 estimate only covers Static Web Apps Free; the authenticated backend, database, backup, monitoring, DNS, GitHub usage, taxes/FX and related costs are not comprehensively priced. Entra External ID's published base-tier free allowance does not establish that the full stack is free. See [official External ID pricing](https://azure.microsoft.com/en-us/pricing/details/microsoft-entra-external-id/).

**Limit:** The budget cap is approved; affordability is **not verified**. No cost-compliance claim or provisioning authorization follows from this decision.

### E — APPROVED: executable test acceptance matrix

Use the acceptance matrix in [Q020 cost and test readiness](Q020-COST-AND-TEST-READINESS.md). Tests must run against the actual API/runtime boundary, not only mocks. Use synthetic fixtures only. Cover authentication, invalid inputs, deterministic matching, anonymous privacy canaries, authenticated payload privacy, consent/withdrawal, ownership and cross-account isolation, logout/account switching, failure paths, deletion and restore-after-deletion, provider retention, tracker non-persistence, catalogue freshness, cost/load, accessibility, regression and security. Require zero false-positive `ELIGIBLE` outcomes across at least 20 reviewed synthetic golden cases.

**Limit:** The test threshold is approved, but the test suite has not thereby been implemented or run. A written matrix or passing documentation/contract CI does not close runtime gates.

## Remaining evidence gates — Q-020 stays OPEN / P0

1. **South African privacy/legal and age-appropriate design review:** obtain a documented decision from a qualified reviewer before any real learner data. The checklist is prepared, not signed off. Review lawful basis, notice, consent/competent-person questions, retention, operator responsibilities and applicable POPIA requirements, including sections 34–35. Source: [POPIA Act 4 of 2013](https://www.justice.gov.za/legislation/acts/2013-004.pdf).
2. **Identity/provider verification:** verify tenant and service capabilities, terms, supported flows, regions, logs, retention/deletion controls, backups and recovery behavior. No production identity configuration is verified.
3. **All-in cost forecast:** document realistic usage, service-by-service pricing, currency/tax, quotas, overages and a shutdown plan; demonstrate the full design fits R100/month before provisioning.
4. **Runnable implementation baseline:** inspect and establish the actual application/API/runtime, schema and deployment architecture before implementation. Current repository evidence does not establish a verified authenticated runtime.
5. **Executable tests and CI evidence:** implement and run the approved test matrix on a recorded commit; include privacy canaries, authorization/cross-account isolation, consent withdrawal, deletion/restore, failure paths, accessibility, security and 20+ golden cases with zero false-positive ELIGIBLE results.
6. **Operational controls:** verify logging/telemetry/cache configuration, backup expiry, deletion workflows, restore tombstones, monitoring, incident handling and environment separation.
7. **Change-control/release gate:** reconcile approved decisions into the API contract, architecture, threat model, traceability matrix, test registry and release checklist. Obtain evidence-backed gate acceptance before any implementation authorization that involves persisted learner data, provisioning or deployment.

## Gate result

**Q-020 IMPLEMENTATION READY — NOT PASSED.** A–E are approved design/constraint decisions only. Legal review, provider capability, cost compliance, implementation, runtime tests, CI for runtime controls and deployment remain unverified or incomplete. No real learner data, cloud provisioning, production identity configuration or deployment is authorized by this decision pack.
