# Q-020 Architecture, Session Proposal and Threat Model

**Status:** PROPOSAL — requires owner decision and privacy/security review; not implemented or configured.
**Date:** 2026-10-15
**Scope:** Authenticated matching, optional profile persistence, saved pathway/funding IDs, comparison and derived dashboard. The anonymous boundary and page-memory-only tracker remain unchanged.

## 1. Recommended architecture

### Identity and session

- First candidate: Microsoft Entra External ID, subject to audience/minor, terms, data-flow, logging and cost review.
- Browser protocol: OpenID Connect authorization-code flow with PKCE using supported MSAL; no implicit flow.
- Token cache: memory only. Do not persist access/refresh tokens in localStorage, sessionStorage, IndexedDB, URLs, cookies or logs.
- Page reload may require sign-in again. Logout clears in-memory account state and MSAL cache and redirects away from account pages.
- Send access tokens only in the Authorization: Bearer header to the intended API; never send tokens to analytics or unrelated hosts.
- API validates signature, issuer, audience, expiry, allowed tenant/authority and required scopes on every request. Fail closed.
- No app-managed cookie session in this proposal. If a BFF/cookie session is later chosen, require a separate design with Secure, HttpOnly, SameSite cookies, CSRF protection, session rotation and server-side invalidation.
- No client secret in the SPA. Server-side secrets, if any, must use managed identity/Key Vault or an approved secret store.

Microsoft documentation recommends authorization code + PKCE for SPAs and describes External ID authentication options:
- https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow
- https://learn.microsoft.com/en-us/entra/architecture/deployment-external-authentication-access-control
- https://learn.microsoft.com/en-us/entra/identity-platform/reference-third-party-cookies-spas

### Runtime and service-selection constraints

- Keep API Management out of the initial design unless a documented requirement justifies its cost/complexity.
- A server-side API/runtime and durable store are required for the approved authenticated feature scope; their service choice remains cost-gated.
- Use the smallest supportable managed runtime and database only if the full service-by-service forecast is within R100/month. If not, defer authenticated persistence/features and keep the anonymous static MVP.
- No real learner data, cloud provisioning, production identity configuration or deployment authorized.

## 2. Logical API contract proposal

This proposal is not an OpenAPI specification and does not freeze field names/status codes. The existing API-CONTRACT.md remains draft v0.1 until the owner approves the session/API proposal and all field schemas are reviewed.

| Operation | Auth | Request data | Persistence rule |
|---|---|---|---|
| GET /api/v1/programmes | Public | None | Public versioned catalogue only |
| GET /api/v1/funding-opportunities | Public | None | Public versioned catalogue only |
| POST /api/v1/matches | Required for server-side authenticated matching | Approved minimal fields in body only | Request-scoped; do not store request or result |
| GET /api/v1/me/profile-consent | Required | None | Return current purpose/version/status only |
| PUT /api/v1/me/academic-profile | Required + active explicit opt-in | Approved profile schema | Store only allowlisted fields |
| DELETE /api/v1/me/academic-profile | Required | Explicit withdrawal/deletion action | Stop future use/writes immediately; idempotent deletion workflow |
| GET/PUT/DELETE /api/v1/me/saved-pathways | Required | Stable programme IDs only | Scope every operation to verified subject |
| GET/PUT/DELETE /api/v1/me/saved-funding | Required | Stable funding IDs only | Scope every operation to verified subject |
| GET /api/v1/me/dashboard | Required | None | Derived from current authorized data; no separate dashboard table |
| Account deletion operation | Required + reauthentication/confirmation per reviewed policy | Confirmation | Disable access; cascade approved deletion; safe status reporting |

No tracker route. No generic arbitrary-account CRUD. No profile values in path/query parameters. Authenticated responses containing account data use Cache-Control: no-store, private; disable shared/CDN caching. Public catalogue caching is versioned and separate.

### Minimal logical data model

- account: internal opaque key if necessary, identity issuer + immutable subject, lifecycle status, timestamps.
- academic_profile: account key, schema version, study stage, canonical subject/mark entries, optional approved controlled preferences, timestamps.
- profile_consent: account key, purpose and notice version, affirmative timestamp, withdrawal status/time, minimal audit metadata; no profile values.
- saved_pathway: account key, programme ID, timestamps; unique (account_key, programme_id).
- saved_funding: account key, funding ID, timestamps; unique (account_key, funding_id).
- deletion_job: only if required; opaque account reference, timestamps, state, retry count and safe error code.
- No match-history, stored dashboard, tracker or duplicated catalogue-description tables.

## 3. Threat model (initial)

| Threat / misuse | Assets at risk | Required controls | Verification |
|---|---|---|---|
| Token theft or replay | Account data | PKCE, short-lived access tokens, memory-only token cache, HTTPS, strict audience/scope validation, logout and reauthentication | Invalid/expired/wrong-audience token tests; inspect browser storage and network |
| XSS or compromised dependency | In-memory tokens and learner inputs | CSP, output encoding, dependency pinning/audit, no unsafe HTML, least-privilege script sources, secure build pipeline | XSS regression cases, CSP check, dependency/security scan |
| IDOR/BOLA cross-account access | Profiles/saved IDs | Derive owner from validated identity, never trust client account ID, scope every query, deny by default, DB constraints | User A attempts all read/update/delete operations against User B; verify unchanged DB |
| Overcollection or consent bypass | Academic profile | Separate unchecked opt-in, purpose/notice version, server-enforced consent gate, allowlist schema | Login-only and withdrawn-consent tests create no profile/write |
| Sensitive payload leakage | Marks, subjects, interests, results | No body logging, allowlisted logs, no profile URLs, telemetry off for learner payloads, no-store headers | Synthetic canary across network, logs, traces, analytics, errors, caches |
| Shared-device exposure | Previous learner's profile/results | Clear memory/query cache on logout/account switch, no persistent token cache, safe loading/error states, reauth for destructive actions | Multi-tab, back/forward, logout, account switch and expired-session tests |
| SQL injection / malformed input | Data integrity and confidentiality | Schema validation, parameterized SQL, bounded input, transaction boundaries, rate limits | Injection strings, invalid enums/marks, oversized payload tests |
| CSRF | Authenticated state-changing endpoints | Bearer-token API with no ambient app cookies; strict CORS and Origin policy. If cookie session is adopted, add CSRF tokens and SameSite defense | Cross-origin state-change tests |
| Deletion incomplete or resurrected | Withdrawn/deleted data | Cascading deletion, idempotent jobs, deletion tombstones, cache/replica review, restore replay before activation | Withdrawal, account deletion, failed-worker retry, backup restore tests |
| Provider diagnostics/backups retain payloads | Learner privacy | Inspect service diagnostics and retention individually; disable body capture; least-privilege access; verify provider deletion terms | Configuration review and synthetic runtime canary |
| Abuse/denial of service | API availability/cost | Payload/rate limits, timeouts, bounded retries, budget alerts, service disable/runbook | Load/abuse test at approved workload and cost threshold |
| Stale catalogue produces false confidence | Learner decisions | Catalogue provenance/versioning, stale-state handling, deterministic rules, UNKNOWN on missing material rules | Golden cases; retired/unknown source cases; zero false-positive ELIGIBLE |

## 4. Trust boundaries and invariants

1. Anonymous browser → public catalogue: catalogue data only; learner inputs/results/tracker never leave the page.
2. Authenticated browser → API: HTTPS, approved minimum fields in body only, bearer token header; no URL or telemetry payload.
3. API → database: authenticated subject-derived scope, parameterized SQL, transaction boundaries, minimal fields.
4. API/services → diagnostics: allowlist only; no bodies, tokens, cookies, marks, interests, results or saved-item content.
5. Identity provider → API: tokens accepted only after full issuer/audience/signature/expiry/scope validation.
6. Backup restore → live store: deleted records remain unavailable until deletion tombstones are reapplied and verified.
7. Login is not profile-storage consent. Tracker never persists. Match results are not stored by default. Eligibility remains deterministic; unresolved requirements produce UNKNOWN.

## 5. Required design artifacts before implementation

- Approved OpenAPI 3.1 schema with request/response JSON Schemas, status/error semantics, auth scopes, cache headers, idempotency, pagination, concurrency and rate-limit behavior.
- Data-flow and trust-boundary diagram including identity provider, hosting, API, database, backups, logs and third-party operators.
- Provider configuration evidence: tenant/audience, token validation, allowed origins, CORS, CSP, logging, retention, data region and deletion capabilities.
- SQL ownership constraints/migration plan, rollback plan and test database.
- Privacy/legal reviewer disposition from Q020-PRIVACY-LEGAL-AGE-REVIEW.md.
- Cost evidence and shutdown plan from Q020-COST-AND-TEST-READINESS.md.

**Gate:** Not implementation-ready until these artifacts and independent review are accepted. No provisioning or real learner data is authorized.
