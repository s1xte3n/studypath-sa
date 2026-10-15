# Q-020 Lifecycle and Implementation Readiness

**Status:** Owner decisions Q020-DEC-01–14 recorded on 2026-10-15. Proposals/constraints are approved to the extent recorded below; implementation readiness remains NOT PASSED pending privacy/legal, architecture, cost and test evidence.
**Scope authority:** D-046 approves the five authenticated features and explicit opt-in for academic-profile persistence. It does not approve a data-retention schedule, identity-provider configuration, database schema, session design, or runtime implementation.
**Baseline:** Q-020, Q-018, D-044, D-045, D-046, `docs/project/Q020-CHANGE-CONTROL.md`, `docs/architecture/API-CONTRACT.md`, and AC-AUTH-001–016.
**Security boundary:** Synthetic data only. No real learner data, cloud provisioning, production identity configuration, or deployment is authorized by this document.

## 1. Objective and gate decision

Turn the approved authenticated feature scope into a reviewable lifecycle and implementation plan without silently approving high-impact unresolved choices.

**Q-020 remains OPEN / P0.** The owner has approved the proposal/constraint/gate disposition for Q020-DEC-01–14 as recorded below. Approval of a proposal does not prove provider capability, legal suitability, configured retention, actual deletion behavior, affordability or runtime controls. Those require evidence and the dependent gates remain open.

### Approved scope that this proposal preserves

- Authenticated server-side deterministic pathway matching.
- Account-linked saved pathway identifiers.
- Comparison of supported, verified catalogue fields.
- Account-linked saved funding-opportunity identifiers.
- A dashboard derived from authorized matching and saved-item data.
- Academic profile persistence only after explicit, recorded opt-in.
- The application tracker remains page-memory-only and has no API, account sync or browser-storage persistence.
- Anonymous matching remains client-side. Anonymous learner inputs, results and tracker entries must not be transmitted to APIs, URLs, analytics, application logs or error telemetry.
- No application submission, uploads, document extraction, AI eligibility decisions, sensitive financial documents, notifications or profile persistence by implication.

## 2. Data inventory and proposed purpose limitation

Only the fields below may be considered for the authenticated MVP. The exact database/API schema is still a decision gate.

| Data class | Minimum proposed fields | Purpose | Storage proposal | Explicit exclusions |
|---|---|---|---|---|
| Account reference | Identity-provider immutable subject identifier; internal opaque account key if needed; created/updated timestamps | Associate authorized records with the authenticated account | Server-side; credentials remain with the identity provider | Passwords, national ID, date of birth, phone number, address, advertising identifiers |
| Academic profile | Study stage; canonical subject IDs and integer marks; optional controlled interest IDs, province/location preference and study-mode preference | Deterministic matching and learner-requested personalization | Persist only after separate explicit opt-in; otherwise process request-scoped data without writing it | Free-text notes, identity/contact fields, inferred sensitive traits, uploaded report cards |
| Profile-consent event | Purpose and notice version; affirmative action; timestamp; withdrawal timestamp/status; policy version | Prove which profile-storage choice was made and enable withdrawal | Minimal audit record; no marks or profile payload in the event | Profile values, full request body, unnecessary device fingerprint |
| Saved pathways | Stable programme catalogue ID; account reference; created/updated timestamps | Let the learner save and revisit a pathway | Server-side account-owned record | Duplicated programme descriptions, eligibility snapshots, marks, recommendation rationale snapshots |
| Saved funding | Stable funding-opportunity ID; account reference; created/updated timestamps | Let the learner save and revisit a funding opportunity | Server-side account-owned record | Financial documents, bank details, income/household details, duplicated opportunity content |
| Matching response | Request-scoped result using current catalogue version and submitted approved inputs | Show deterministic, explainable match/eligibility results | Return to client; do not persist by default | Persisted score histories, profile/result snapshots, hidden ranking or admission guarantees |
| Dashboard | Derived view of current authorized profile status and saved IDs/catalogue data | Provide a concise personal overview | Compute from source records at request time; avoid a separate dashboard table | Duplicate personal-data store, independent profile collection, extra inferred traits |
| Operational/security events | Event type, timestamp, request/correlation ID, outcome, service version; opaque account reference only if needed and approved | Security investigation, reliability and audit | Restricted, time-limited operational store after logging review | Marks, subjects, interests, profile bodies, tokens, cookies, match output, saved-item contents |
| Application tracker | Current page-session entries only | Manual application tracking in the current page | Browser memory only | Any API, database, local/session storage, IndexedDB, cookie, account/cloud sync or reload restoration |

**Minimization rules**

1. Prefer canonical catalogue identifiers and controlled enums to free text.
2. Never accept an account/owner ID from the client as the authority for data ownership.
3. Do not persist match responses or duplicate catalogue snapshots unless a separately approved requirement proves this necessary.
4. Every stored field must map to a requirement, purpose, owner, retention rule and test.
5. Unknown/unapproved fields are rejected or ignored safely; do not silently expand the schema.
6. Do not collect real learner data during development or testing; use synthetic fixtures.

## 3. Proposed lifecycle

The lifecycle below is a recommended baseline and needs explicit approval before the schema or persistence code is frozen.

### 3.1 Account creation and authentication

- Use an established identity provider; the documented Microsoft Entra External ID baseline is a candidate, **not yet selected/configured or cost-approved**.
- Keep passwords and primary credential recovery with the identity provider; the application must not store passwords.
- Use the provider's immutable subject as the external identity key, mapped to an opaque internal account key only if needed. Do not use email as the ownership key.
- Require server-side validation of issuer, audience, signature, expiry, nonce/state and intended API audience according to the selected protocol/provider. Reject missing, invalid, expired and wrong-audience credentials.
- Finalize session/token storage and expiry only after a threat-model review. Do not put bearer tokens in URLs or persistent browser storage. If cookie sessions are chosen, require Secure, HttpOnly, appropriate SameSite, CSRF defenses and logout invalidation. If an OAuth/OIDC browser flow is used, require PKCE and state/nonce checks.
- Login must not automatically opt the learner into profile persistence.

### 3.2 Matching without profile persistence

- An authenticated learner may submit only the approved minimum matching fields to the authenticated API over HTTPS.
- Validate types, enumerations, canonical subject IDs, whole-number marks (0–100), array lengths and request size on the server.
- Treat the request as transient. Do not write the profile, request body or match response to a database, cache, URL, logs or telemetry.
- Return deterministic results with eligibility states `ELIGIBLE`, `NOT_ELIGIBLE` or `UNKNOWN`; missing or unresolved rule evidence must not become a positive eligibility assertion.
- If the product cannot support non-persistent authenticated matching safely, stop and obtain a product decision rather than silently persisting data.

### 3.3 Explicit profile-storage opt-in

- Present a clear, age-appropriate notice immediately before enabling persistence. State the exact fields, purpose, storage behavior, retention/deletion, withdrawal route and relevant service providers in plain language.
- Use a separate, unchecked opt-in action. Do not bundle it with login, general terms, saved-item actions or a preselected checkbox.
- Record the notice/purpose version and affirmative action timestamp. Store no marks or profile values in the consent event.
- The save operation must fail closed if consent is absent, invalid, withdrawn or cannot be verified.
- Re-consent is required when a material purpose or field change invalidates the prior consent version.
- Withdrawal immediately disables future profile writes and reads of the persisted profile for personalization; initiate deletion of the profile and derived personal copies according to the approved schedule. A transient matching request may remain available if it can be processed without persistence.

### 3.4 Saved items and comparison

- Save only a stable programme or funding-opportunity identifier plus required account ownership and timestamps.
- Enforce uniqueness for the pair (account, catalogue item) to prevent duplicates; use idempotent save/remove semantics.
- Resolve displayed content from the current verified catalogue. Handle retired, expired, withdrawn or missing IDs explicitly; do not present stale snapshots as current.
- Comparison uses only approved, verified catalogue fields, displays missing fields as unavailable, and links to official sources. It does not calculate an invented score or guarantee admission/funding.
- The dashboard derives from current authorized source records and should not create its own persistent copy.

### 3.5 Retention and deletion — proposed policy for approval

| Record | Recommended default proposal | Approval still required |
|---|---|---|
| Unpersisted matching request/result | Keep only for request processing; do not persist | Confirm infrastructure/provider diagnostic settings cannot capture bodies |
| Persisted academic profile | Keep only while the learner's explicit opt-in remains active; on withdrawal, stop use/write immediately and delete active profile records within 30 days | Privacy/legal approval of period, exceptions and verification evidence |
| Saved pathways/funding | Keep until learner removes the item or deletes the account; no independent retention of catalogue snapshots | Owner/privacy approval; ensure stale catalogue IDs are handled |
| Consent audit event | Retain only the minimum evidence needed to demonstrate the choice, for a defined period approved by privacy/legal review; never include profile values | Exact duration and lawful purpose remain undecided |
| Account deletion | Disable access promptly; queue cascading deletion of account-linked profile, saved items and derived data; target completion within 30 days | Re-authentication, recovery window, exceptions and exact deletion SLA require approval |
| Backups | Recommended maximum expiry 35 days after creation; deleted data may remain in inaccessible backups until expiry, must not be restored to active use without reapplying deletions | Confirm provider capabilities, actual backup schedule/cost and legal suitability |
| Security/operational logs | Propose 30 days for routine logs and shorter retention where practical; restrict access and never log profile payloads | Confirm legal/security need, provider defaults, actual configuration and cost |
| Identity-provider records | Follow the selected provider's documented retention/deletion and recovery behavior; delete or disable the account where supported | Provider selection, data residency, export/delete capability and terms review |

These periods are **proposals, not approved commitments**. Do not advertise them to learners or implement them as policy until approved and technically verified. If the platform cannot guarantee deletion/backup behavior, disclose the actual limitation and block persistence until the owner accepts a lawful, safe policy.

Deletion must cover active database rows, replicas where controllable, derived personal data, caches, queued jobs, exports and provider copies under project control. Backups must expire on a documented schedule; restoration procedures must reapply deletion tombstones before restored data becomes available. Keep only the minimum deletion/audit proof approved by privacy/legal review.

## 4. Authorization, isolation and operational controls

### Mandatory server controls

- Every authenticated route verifies the credential server-side and authorizes the requested action for the authenticated subject.
- Derive account ownership from the verified identity context, never from a request-body or URL account ID.
- Scope every read, update and delete query by authenticated account; apply database foreign keys and uniqueness constraints. Consider row-level security only as defense-in-depth, not as a replacement for application authorization tests.
- Deny by default; return a non-revealing not-found/forbidden response for cross-account identifiers.
- Use parameterized SQL, schema validation, bounded payload sizes, request rate limits and safe transaction boundaries.
- Use TLS in transit, verify encryption at rest and backup protection in the chosen services, use managed identity where supported, and keep secrets in Key Vault or an approved secret store. No secrets in client bundles, repository files, test fixtures or logs.
- Keep development, test and production identities/resources isolated. Use synthetic data in all non-production environments.

### Logging, telemetry, caching and errors

- Start with no product analytics for learner profiles.
- Use an allowlist for log fields; redact authorization headers, cookies, tokens, request bodies and response bodies at source.
- Do not log marks, subject selections, interests, profile values, match results, saved-item IDs or tracker entries. Avoid raw identity-provider claims in routine logs.
- Verify Application Insights, API Management, Functions, hosting/CDN, identity provider and database diagnostics individually; disabling application logs alone is insufficient.
- Authenticated profile and account-specific responses should use `Cache-Control: no-store, private`; disable shared/CDN caching for them. Public catalogue responses may use a separate versioned cache policy.
- Errors returned to clients must not contain stack traces, SQL, tokens, provider internals or other accounts' data.
- Inspect real network requests, browser storage, server logs and telemetry with synthetic canary values to prove absence of prohibited fields.

### Shared devices, logout and account recovery

- On logout or account switch, invalidate the server session/refresh path as supported, clear in-memory account data and query caches, and navigate away from account-specific views.
- A new account must not render previous account content while requests are loading or failing.
- Define account recovery and re-authentication for profile withdrawal/account deletion; do not invent a local password recovery mechanism.
- Decide whether a signed-in account is available to minors and whether parental/guardian flows are required only after privacy/legal review; do not infer this from provider defaults.
- Test browser back/forward, multiple tabs, expired sessions, account switching, offline state and failed logout.

## 5. API and schema proposals (not frozen)

The current `docs/architecture/API-CONTRACT.md` remains draft v0.1. These are logical resource proposals, not implementation authorization.

| Operation | Proposed behavior | Contract requirements |
|---|---|---|
| `POST /api/v1/matches` | Authenticated, transient deterministic match | No profile values in URL; validated request body; no request/result persistence; no-store response; stable error model |
| `GET /api/v1/me/profile-consent` | Read current profile-storage consent state | Authenticated account scope; return purpose/version/status only |
| `PUT /api/v1/me/academic-profile` | Create/replace the minimal persisted profile | Require active explicit consent; account derived from auth context; schema versioning; no partial unsafe writes |
| `DELETE /api/v1/me/academic-profile` | Withdraw profile persistence and start deletion | Idempotent; stop use/write immediately; return deletion status without leaking values |
| `GET /api/v1/me/saved-pathways` / `PUT` / `DELETE` | List/add/remove stable programme IDs | Account scoped; catalogue validity; idempotency and uniqueness |
| `GET /api/v1/me/saved-funding` / `PUT` / `DELETE` | List/add/remove stable funding IDs | Account scoped; expired/withdrawn state explicit |
| `GET /api/v1/me/dashboard` | Derived account overview | No new storage; no-store response; only approved sources |
| Account deletion workflow | Disable access and cascade approved deletion | Exact endpoint/provider action, confirmation, SLA, backups and evidence still need design |

No tracker route is allowed. Avoid broad generic CRUD endpoints. Before contract freeze, define JSON schemas, status codes, field constraints, authentication requirements, idempotency, concurrency, pagination, versioning, error responses, cache headers, rate limits and OpenAPI contract tests.

### Minimum logical data model proposal

- `account`: opaque internal key (only if required), identity-provider issuer + immutable subject, created/updated timestamps, lifecycle status.
- `academic_profile`: account key, schema version, study stage, approved subject/mark entries, approved optional preference enums, created/updated timestamps.
- `profile_consent`: account key, purpose ID/version, notice version, affirmative timestamp, withdrawn timestamp/status, minimal audit metadata.
- `saved_pathway`: account key, programme ID, created/updated timestamps, unique (account key, programme ID).
- `saved_funding`: account key, opportunity ID, created/updated timestamps, unique (account key, opportunity ID).
- `deletion_job` (only if needed): opaque account reference, requested/completed timestamps, status, retry count and safe failure code; no profile payload.
- Do not add a stored dashboard table, matching-history table, tracker table or catalogue-description snapshots in this scope.

The model is not ready for migrations until ownership, retention, consent, deletion and provider choices are approved.

## 6. Identity, hosting and cost gate

The architecture baseline mentions Microsoft Entra External ID, Azure Functions, API Management, Azure Database for PostgreSQL, Key Vault and Application Insights. This is a documented technology baseline, not proof that these services are provisioned or affordable.

Before selecting/configuring services:

1. Compare the candidate identity provider's support for the intended South African learner audience, including minors, recovery, account deletion, MFA/abuse controls, data location, diagnostic logging, service terms and current price.
2. Cost the complete design in ZAR/month, including identity MAU, Functions execution, API Management tier, PostgreSQL compute/storage/backups, Key Vault, monitoring ingestion/retention, bandwidth/egress, static hosting, DNS/domain, taxes and FX assumptions.
3. Record request volume, profile size, saved-item counts, database size, log volume, retention, backup schedule, free quota, overage behavior and alert thresholds.
4. Demonstrate a safe stop/disable plan before any metered service is enabled.
5. Confirm total expected and worst-case spend remains at or below **R100/month**. If not demonstrable, reduce scope or choose a simpler architecture; do not provision and do not rely on an expired free-account offer.
6. Keep billing alerts and budget alerts as detection controls, not as a hard guarantee that no overage can occur.

**No provisioning is authorized by this document.**

## 7. Acceptance and verification plan

These tests are planned. They have not been executed merely by being documented.

| Test ID | Scenario | Expected evidence | Traceability |
|---|---|---|---|
| T-AUTH-001 | Missing, expired, wrong-issuer/audience or invalid credential | API rejects request; no data returned; safe response | AC-AUTH-002 |
| T-AUTH-002 | User A reads/updates/deletes User B profile or saved IDs by changing path/body IDs | Denied without disclosing existence or content; database unchanged | AC-AUTH-006 |
| T-AUTH-003 | Login with no profile-storage opt-in | No profile row or profile write; matching can remain transient | AC-AUTH-003 |
| T-AUTH-004 | Opt-in with valid notice version | Only allowlisted fields saved; consent event recorded without values | AC-AUTH-004 |
| T-AUTH-005 | Consent absent, withdrawn, stale or wrong purpose version | Profile write fails closed | AC-AUTH-003–005 |
| T-AUTH-006 | Withdraw consent while profile exists | Future use/write stops immediately; deletion job and final evidence meet approved SLA | AC-AUTH-005 |
| T-AUTH-007 | Delete account with profile and saved items | Access disabled; active records and derived copies removed; backup expiry documented | AC-AUTH-014 |
| T-AUTH-008 | Duplicate save and concurrent add/remove | Idempotent result; no duplicate rows or inconsistent state | AC-AUTH-007–008 |
| T-AUTH-009 | Retired programme or expired funding ID | Explicit unavailable/retired state; no invented details | AC-AUTH-007–009 |
| T-AUTH-010 | Inspect browser network, storage, app/API logs, telemetry, traces and cache using synthetic canaries | No anonymous learner data transmitted; no prohibited profile values in logs/telemetry; authenticated responses not shared-cached | AC-AUTH-001, 011–013 |
| T-AUTH-011 | Logout/account switch/back button/multiple tabs/expired session | No prior-account content visible to next user; caches cleared or isolated | AC-AUTH-011 |
| T-AUTH-012 | Invalid enum, unknown subject, decimal/out-of-range mark, oversized payload, injection strings | Server validation rejects safely; no unsafe SQL or eligibility result | AC-AUTH-002 |
| T-AUTH-013 | Matching repeated with same catalogue version and inputs | Same deterministic result and explanation; unresolved evidence yields UNKNOWN | AC-AUTH-002, existing eligibility ACs |
| T-AUTH-014 | Failure of identity, database, deletion worker or catalogue dependency | Fail closed; no cross-account fallback, accidental writes or sensitive error output | AC-AUTH-013–016 |
| T-AUTH-015 | Restore backup containing previously deleted profile | Deletion tombstone/replay prevents deleted data becoming active | AC-AUTH-014 |
| T-AUTH-016 | Load/cost test at approved workload | Evidence-backed monthly forecast at or below R100; no unexpected metered service | AC-AUTH-015 |
| T-AUTH-017 | Accessibility and age-appropriate consent/withdrawal flow | Keyboard/screen-reader checks, plain-language notice and unambiguous opt-in/out | AC-AUTH-004–005 |
| T-AUTH-018 | Tracker create/update/reload/API inspection | Entries remain in memory only and disappear after reload; no request/storage writes | AC-AUTH-012 |

Each test must record test data version, environment, exact command/steps, expected and actual result, timestamp, commit SHA, artifacts and pass/fail/block status. Authorization/isolation tests must run against the actual server/API boundary, not only mocks. Privacy tests must inspect the configured provider/telemetry path, not just source code.

## 8. Traceability and implementation sequence

| Gate | Required output | Exit condition |
|---|---|---|
| Q020-A — Owner policy decisions | Approved fields/purposes; retention/deletion schedule; consent notice/version; account deletion/recovery/shared-device behavior | Every item below the approval register is explicitly accepted or revised |
| Q020-B — Privacy/legal review | Data-flow inventory, age/minor assessment, notice/consent and withdrawal wording, retention/deletion/backup rationale, incident contact/process | Review decision and unresolved risks recorded; no real data before applicable review |
| Q020-C — Architecture/provider | Identity provider and protocol, session design, hosting/database/logging choices, threat model, service-region/data residency, account isolation design | Architecture decision record and updated frozen API contract approved |
| Q020-D — Cost | Service-by-service monthly forecast, workload assumptions, quota/overage behavior, alerts and shutdown plan | Evidence demonstrates R100/month cap without unapproved paid/metered dependencies |
| Q020-E — Test readiness | Executable API schemas and T-AUTH tests, synthetic fixtures, privacy canary plan, migration/rollback/deletion tests | Test plan reviewed and mapped to requirement/AC IDs |
| Q020-F — Implementation | Small PRs for identity, transient matching, saved IDs, opt-in profile lifecycle, deletion workflow, comparison/dashboard | Code reviewed; tests run; security/privacy checks pass; no tracker persistence |
| Q020-G — Release | Deployment, runtime privacy inspection, backup/restore deletion test, smoke test, cost review, incident and rollback evidence | Explicit release approval; no gate inferred from documentation or CI alone |

## 9. Owner approval register — decisions recorded 2026-10-15

The product owner explicitly approved the proposals, security constraints, or gates listed below. “Approved proposal” means the proposed policy direction is accepted; it does not certify legal compliance, provider capabilities, configured runtime behavior, or release readiness.

| ID | Decision | Owner disposition | State and remaining boundary |
|---|---|---|---|
| Q020-DEC-01 | Identity provider | Approve proposal: evaluate Microsoft Entra External ID first; select only after audience, privacy, protocol and cost checks | APPROVED PROPOSAL; provider is not selected/configured and evaluation evidence remains required |
| Q020-DEC-02 | Exact persisted profile fields | Approve proposal: study stage; canonical subject IDs and integer marks; controlled optional interest IDs, province and study-mode preferences; no free text | APPROVED PROPOSAL; final API/schema validation and privacy review remain required |
| Q020-DEC-03 | Matching-result persistence | Approve proposal: do not store match history or result snapshots by default | APPROVED |
| Q020-DEC-04 | Consent and withdrawal | Approve proposal: separate unchecked opt-in; versioned notice/purpose and timestamp; stop writes immediately on withdrawal and initiate profile deletion | APPROVED PROPOSAL; notice text, implementation and verification remain required |
| Q020-DEC-05 | Profile retention | Approve proposal: retain only while opt-in remains active; target active-store deletion within 30 days after withdrawal | APPROVED TARGET, subject to privacy/legal and technical verification; not a verified service guarantee |
| Q020-DEC-06 | Saved-item retention | Approve proposal: retain until learner removes item or account is deleted; stable IDs only | APPROVED |
| Q020-DEC-07 | Account deletion SLA | Approve proposal: disable access promptly; target active-data deletion within 30 days | APPROVED TARGET, subject to privacy/legal and technical verification; not a verified service guarantee |
| Q020-DEC-08 | Backup expiry | Approve proposal: target maximum 35 days and reapply deletion records before restored data is reactivated | APPROVED TARGET, subject to provider capability, backup design and restore-test evidence |
| Q020-DEC-09 | Routine log retention | Approve proposal: target 30 days or shorter; no profile payloads; verify each provider's actual behavior | APPROVED TARGET, subject to service-by-service configuration and verification |
| Q020-DEC-10 | Session model | Approve security constraints: no tokens in URLs or persistent browser storage; cookie sessions require CSRF protection; mechanism deferred until threat-model review | CONSTRAINTS APPROVED; SESSION MECHANISM DEFERRED / OPEN |
| Q020-DEC-11 | Shared-device/account recovery | Approve proposal: clear/partition account data on logout or account switch; define re-authentication and recovery with selected provider | APPROVED PROPOSAL; detailed design and tests remain required |
| Q020-DEC-12 | Minors and legal review | Approve gate: complete applicable South African privacy/legal and age-appropriate design review before real learner data | GATE APPROVED; review is not evidenced complete; real learner data remains blocked |
| Q020-DEC-13 | Hosting/database/logging stack | Approve gate: approve services only after security and full cost assessment; no provisioning before approval | GATE APPROVED; service selection, assessment and provisioning authorization remain open |
| Q020-DEC-14 | Workload and monthly cap | Approve gate: establish realistic workload and service-by-service forecast within R100/month | GATE APPROVED; cost evidence is not yet available and no paid provisioning is authorized |

### Consequences and non-approvals

- The approved retention windows are targets, not verified guarantees or public-facing promises. Do not represent them as implemented or assured until provider settings, legal suitability, deletion workflows and restore behavior are verified.
- Q020-DEC-01 does not select Microsoft Entra External ID unconditionally or authorize production identity configuration.
- Q020-DEC-10 intentionally leaves the session mechanism undecided.
- Q020-DEC-12–14 approve mandatory gates, not completion of those gates.
- No real learner data, cloud provisioning, production identity configuration or deployment is authorized by these decisions.
- The anonymous privacy boundary remains unchanged: anonymous learner inputs/results/tracker entries must not be transmitted to APIs, URLs, analytics, application logs or error telemetry. The application tracker remains page-memory-only.



## 10. Current readiness assessment

- **Scope:** Approved under D-046.
- **Lifecycle policy:** Owner proposal/constraint/gate dispositions recorded for Q020-DEC-01–14; retention/deletion targets and controls still require privacy/legal, provider and runtime verification.
- **API contract/schema:** Draft, not frozen.
- **Identity/authentication/authorization:** Entra External ID is the first candidate to evaluate, not selected/configured; session mechanism deferred; server-side authorization/isolation not implemented or verified.
- **Privacy/legal review:** Not evidenced as completed for this authenticated scope.
- **Implementation/tests:** No authenticated runtime implementation or test results are claimed by this document.
- **CI:** Existing contract workflow is not a substitute for runtime privacy/security tests.
- **Cloud/cost:** Exact service design and monthly forecast for the authenticated scope are not verified; no provisioning authorized.
- **Release:** Not authorized.

**Gate result: Q-020 IMPLEMENTATION READY — NOT PASSED.** Proceed to implementation only after the owner approval register and dependent privacy, architecture, cost and test gates have evidence-backed closure.
