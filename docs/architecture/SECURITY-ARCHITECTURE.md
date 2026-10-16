# StudyPath SA — Security Architecture

**Status:** Security design baseline; implementation/runtime verification not performed.  
**Scope:** D-047 synthetic local demo and constraints for any later API/cloud tier.

## Security objectives and requirements

- `REQ-PRV-001`, `NFR-PRV-001`: no learner input/result/tracker transmission, persistence or telemetry in the current demo.
- `NFR-SEC-001`: protect the application and catalogue boundary.
- `REQ-CAT-001`, `REQ-MAT-001`, `NFR-DATA-001`: preserve source authority and prevent unsupported eligibility claims.
- Future `REQ-AUTH-001` is approved scope direction only; identity and profile persistence remain gated by Q-018/Q-020.

## Assets and trust boundaries

| Asset/boundary | Threats | Required controls |
|---|---|---|
| Learner inputs/results in browser memory | Accidental persistence, telemetry capture, URL/referrer leakage, extension or shared-device exposure | Page memory only; no local/session storage, cookies, analytics, URL encoding or profile-bearing requests; reset; clear disclosure that reload/exit discards state |
| Public catalogue response | Malformed/tampered payload, stale/expired rules, unsafe content, misleading source | Runtime schema validation, safe rendering, source/cycle/freshness checks, explicit unknown states, curated version |
| Source URLs and catalogue records | Phishing, compromised source, transcription error, fabricated/unsupported rules | Official sources preferred, curator review, source-to-rule traceability, HTTPS, record sign-off and change history |
| Repository and CI | Dependency compromise, secret leakage, malicious PR, unreviewed catalogue change | Secret scanning, dependency audit, protected PR workflow where available, least privilege, synthetic fixtures |
| Hosting/API provider logs | Automatic body/query capture, URL logging, IP/metadata retention | Inspect actual telemetry/log fields and retention; prohibit learner profile in request; disable/redact capture where configurable before public demo |
| Future authenticated API | Token forgery/replay, broken object-level authorization, cross-user access, over-collection | Verify issuer/audience/signature/expiry, server-side identity-to-owner mapping, authorization on every object, negative cross-user tests, data minimisation and consent |
| Future cloud configuration | Public storage, excessive IAM, secret exposure, over-budget resources | No provisioning until approved; managed identity, least privilege, private storage where needed, Key Vault, budget/quota/alert controls |

## Current demo controls

1. Use synthetic test and demo data only. Real learner data is prohibited until a separate privacy/legal review and implementation verification.
2. Anonymous use does not require identity.
3. Do not persist learner inputs/results/tracker entries in browser storage, cookies, server storage, API calls, URL/query/path, analytics, console logs, error reports or provider request bodies.
4. Public API calls, if used in the later API-first slice, retrieve catalogue records only and are not personalized.
5. Reset clears page-memory state. The interface explains that reload/close may discard data.
6. Do not request national identity number, household income, bank details or sensitive financial/family documents for funding matching.
7. Catalogue write/publication access is restricted to the designated curator workflow; public API is read-only.
8. Escape/encode catalogue content in UI and validate URLs before rendering outbound links. Avoid HTML injection and open redirects.
9. Keep dependency set small; review transitive telemetry and browser persistence behavior, not only direct application code.
10. Never claim runtime privacy is verified until browser network/storage inspection and provider logging/retention review have been completed.

## Future authentication/authorization (not approved for current implementation)

Before any authenticated server-side feature:
- Select and configure an identity provider and exact login/token flow.
- Validate tokens at the trusted API boundary (issuer, audience, signature, expiry, not-before and allowed algorithms); reject malformed/expired tokens with 401.
- Derive owner identity from validated claims, never from a client-supplied owner ID.
- Authorize every read/write by ownership and approved role; use parameterized queries and deny by default.
- Test User A cannot read/update/delete User B's profile/bookmarks; test missing, expired, wrong-audience and forged tokens; test privilege escalation and mass assignment.
- Explicit opt-in must precede academic profile persistence. Login is not consent.
- Define profile field allowlist, purpose, retention/deletion, consent revocation, export requirements if applicable, privacy notice, incident process, audit scope and access controls.
- Keep profile payloads out of logs, traces, URLs, metrics labels, crash reports and third-party AI prompts unless separately approved.
- Tracker data remains memory-only; no tracker sync or persistence without change control.

## Secrets, identity and infrastructure

The current local demo should not require runtime secrets. Never put secrets in source, Vite-exposed variables, fixtures, docs or browser bundles. If a cloud/API deployment is approved, use managed identities where supported, store remaining secrets in Key Vault, grant least-privilege access, rotate credentials, separate environment identities, and keep production credentials out of CI logs. Terraform state may contain sensitive values and must use an approved protected backend and access policy; no state backend is assumed to exist.

## Input, output and dependency security

- Validate subject IDs and marks against the approved vocabulary/range; reject unknown fields where the contract requires strict schemas.
- Validate response schemas, string lengths, enums, date values, and source URLs.
- Use safe DOM/text rendering; no untrusted HTML from source descriptions.
- Apply HTTPS, appropriate content security policy/security headers and restrictive CORS only after hosting/API origins are frozen.
- Avoid logging request bodies by default. Error responses expose stable codes and request/correlation IDs, not stack traces or profile data.
- Review dependency vulnerabilities and licenses; pin/lock dependencies and keep builds reproducible.
- Rate limiting and abuse controls apply if a public API is deployed; exact service and limits remain undecided.

## Threat model / release blockers

| Threat | Severity | Mitigation/evidence required |
|---|---|---|
| Learner marks leaked through API/URL/telemetry | P0 | Automated/static checks plus browser network, URL, storage and telemetry inspection |
| False positive eligibility from missing/stale requirements | P0 | Golden test set, UNKNOWN on incomplete rules, source review, zero false-positive ELIGIBLE target |
| Malicious or misleading catalogue content | P0 | Curator sign-off, source traceability, schema validation, safe rendering |
| Future cross-user data exposure | P0 for authenticated tier | Object-level authorization and cross-user isolation tests before activation |
| Secrets committed or exposed to client | P0 if secrets introduced | Secret scanning, environment separation, managed identity/Key Vault review |
| Dependency captures user data | P0 | Dependency/telemetry inventory and runtime verification |
| Uncontrolled cloud cost | P1/P0 release blocker under budget constraint | Resource-by-resource cost and quota review, budget alerts, no-provisioning gate |

## Security verification checklist

- [ ] Inspect repository for secrets and confirm no secrets are embedded in client configuration.
- [ ] Test invalid/unknown subject and out-of-range marks.
- [ ] Inspect browser localStorage, sessionStorage, cookies, URLs, referrers, network requests, console and error telemetry.
- [ ] Verify no profile values appear in API/provider logs or monitoring.
- [ ] Validate catalogue schema, stale data behavior, source links and safe content rendering.
- [ ] Run dependency and secret scans in CI and retain run evidence.
- [ ] If cloud deployment is later approved, review IAM/RBAC, TLS, CORS, headers, storage access, Key Vault, network exposure, cost controls and rollback.
- [ ] Do not mark any check passed until executed and evidenced.

**Gate:** Security design documented; security implementation and runtime privacy remain unverified.
