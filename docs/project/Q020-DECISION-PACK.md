# Q-020 Gate-Closure Decision Pack

**Status:** Proposal for owner decisions; no implementation, provisioning, production identity configuration, or real learner-data use authorized.
**Date:** 2026-10-15
**Related:** [Lifecycle readiness](Q020-LIFECYCLE-IMPLEMENTATION-READINESS.md), [API contract](../architecture/API-CONTRACT.md), [Change control](Q020-CHANGE-CONTROL.md).

## What is already approved

Q020-DEC-01–14 were recorded on 2026-10-15. The owner approved the direction to evaluate Microsoft Entra External ID first, minimum profile fields, explicit profile-storage opt-in, no default match-history persistence, retention/deletion targets subject to verification, and mandatory privacy, architecture, cost and test gates.

Those decisions do **not** prove legal compliance, actual provider behavior, affordability, or runtime security.

## Recommended decisions requiring owner approval

### DECISION A — Session and browser token handling

**Recommendation: APPROVE** Microsoft Entra External ID as the first identity-provider candidate, subject to provider/audience/privacy/cost checks, with OpenID Connect authorization-code flow + PKCE using MSAL for a browser SPA. Keep token cache in memory only; do not persist tokens in localStorage, sessionStorage, IndexedDB, URLs, cookies, analytics or logs. A page reload may require sign-in again. Send access tokens only in the Authorization header to the intended API. Validate issuer, audience, signature, expiry and required scopes server-side. Use short-lived access tokens and explicit logout/cache clearing.

**Trade-off:** Simpler and likely cheaper than a backend-for-frontend session service, but requires rigorous XSS/CSP/dependency controls and can require reauthentication after reload. This is a proposed architecture, not configured or verified. Microsoft recommends authorization code + PKCE for SPAs; see [Microsoft identity platform auth-code flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow) and [External ID architecture](https://learn.microsoft.com/en-us/entra/architecture/deployment-external-authentication-access-control).

**Reject if:** you require server-managed HttpOnly application sessions. If rejected, a BFF/session architecture needs a separate costed design and new approval.

### DECISION B — API and account-isolation baseline

**Recommendation: APPROVE** the logical contract in [Q020 architecture and security proposal](Q020-ARCHITECTURE-THREAT-MODEL.md) as the design baseline, not as authorization to implement. Every authenticated API operation derives the owner from the validated token subject; no client-supplied account ID is authoritative. All reads/writes/deletes are scoped to that subject. Default deny; parameterized queries; unique account+catalogue-ID constraints; no-store account responses; no profile-bearing URLs, logs or telemetry; public catalogue endpoints never receive learner inputs.

**Reject if:** you want a different API/auth architecture. Any change must update the API contract, threat model and tests before implementation.

### DECISION C — Retention/deletion targets

**Recommendation: APPROVE AS INTERNAL ENGINEERING TARGETS ONLY**, pending privacy/legal review and provider verification:
- Stop profile use/writes immediately when opt-in is withdrawn.
- Target active profile deletion within 30 days of withdrawal.
- Target active account-linked data deletion within 30 days of account deletion.
- Target backup expiry within 35 days, with deletion tombstones replayed before restored data is reactivated.
- Target routine operational-log retention of 30 days or less; do not log profile payloads.
- Retain saved IDs until removal/account deletion; do not store match history or result snapshots by default.
- Keep only minimum consent/deletion evidence for a period set by the privacy/legal reviewer.

**Important:** these are not service guarantees, public promises, or evidence that deletion is implemented. Do not publish them as commitments until lawful basis, exceptions, actual service settings and restore behavior are reviewed and tested.

### DECISION D — R100/month cap and authenticated-feature scope

**Recommendation: APPROVE the hard R100/month cap and DEFER implementation of authenticated persistence/features unless a complete service-by-service forecast proves the entire design fits the cap.** Continue the anonymous static MVP with synthetic data and page-memory-only tracker in the meantime. Entra External ID's published base tier has a free allowance for the first 50,000 monthly active users, but that does not make Functions, database, backup, monitoring, DNS, GitHub usage or all project costs free. See [official External ID pricing](https://azure.microsoft.com/en-us/pricing/details/microsoft-entra-external-id/).

**Reason:** the currently recorded $0 estimate only covers Static Web Apps Free; authenticated backend, durable storage, backups and diagnostics are not costed. No credible all-in forecast under R100 is currently evidenced. A budget cap is not a target to spend; do not use unverified free quotas as a guarantee.

**Reject only if:** you are willing to revise the approved R100 cap through an explicit change-control decision. Do not provision until then.

### DECISION E — Test readiness threshold

**Recommendation: APPROVE** the acceptance matrix in [Q020 cost and test readiness](Q020-COST-AND-TEST-READINESS.md). Tests must be executable against the actual API/runtime boundary, not just mocks. No real learner data. Require synthetic fixtures, negative authorization tests, privacy canaries across network/storage/logs/telemetry, withdrawal/deletion/restore tests, failure-path tests, and deterministic golden cases with zero false-positive ELIGIBLE results.

**Reject if:** you propose changing the acceptance criteria; record the rationale and update the traceability matrix before implementation.

## What cannot be closed by owner approval alone

1. **South African privacy/legal and age-appropriate design review:** this document prepares the review but does not replace a qualified review. POPIA sections 34–35 restrict processing of children's personal information subject to specified authorizations. The applicable age/competent-person, lawful basis, notice, consent, retention and operator questions need a documented reviewer decision before real learner data. Source: [POPIA Act 4 of 2013, sections 34–35](https://www.justice.gov.za/legislation/acts/2013-004.pdf).
2. **Provider capability:** inspect the selected tenant/service terms, regions, logs, retention controls, deletion behavior, backups and recovery settings.
3. **Actual cost:** confirm current signed-in pricing/billing context, usage assumptions, quota/overage behavior, third-party costs and worst-case shutdown plan.
4. **Executable tests:** implement and run them after a permitted implementation phase. A written test plan or passing documentation-contract CI does not close runtime controls.

## Approval response format

Reply with a compact decision set, for example:

- A — APPROVE
- B — APPROVE
- C — APPROVE AS INTERNAL TARGETS
- D — APPROVE R100 CAP; DEFER AUTHENTICATED FEATURES
- E — APPROVE

You may reject or amend any item. Silence is not approval. Even if A–E are approved, no real learner data, provisioning, production identity configuration, or deployment is authorized until their independent evidence gates pass.
