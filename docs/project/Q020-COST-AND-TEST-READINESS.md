# Q-020 Cost Model and Executable Test Readiness

**Status:** Planning baseline only; authenticated-feature costs are not yet verified, tests are not yet implemented/executed.
**Hard cap:** R100/month total project spend.
**Date:** 2026-10-15

## 1. Cost decision

The existing AZURE-COST-ESTIMATE.md only prices Static Web Apps Free at a displayed USD $0/month for the supplied configuration. It does not price the authenticated API, durable database, backup, logs, identity add-ons, domain, or third-party/GitHub usage. It is therefore not evidence that the authenticated design fits R100/month.

### Service-by-service estimate register

| Service/workload | Proposed use | Current cost evidence | Cost status / control |
|---|---|---|---|
| Azure Static Web Apps Free | Serve React/Vite static app | Owner-supplied calculator shows $0/month for one Free app | Preliminary $0 for listed SKU only; recheck quotas and subscription context |
| Microsoft Entra External ID base | Customer identity | Official pricing page states first 50,000 MAUs in base tier are free | Base tier appears $0 at expected hackathon scale; confirm region/terms and exclude premium/SMS add-ons |
| Azure Functions / API runtime | Validate tokens, matching, account operations, deletion jobs | No estimate saved for actual workload/region | **UNPRICED — gate blocker**; estimate requests, execution duration, memory, storage and egress |
| Durable database | Account/profile/saved IDs and consent evidence | No provider/SKU chosen or estimate | **UNPRICED — gate blocker**; estimate compute, storage, backups, HA, I/O and region |
| Backup/restore | Retention and deletion replay | No design/provider selected | **UNPRICED — gate blocker**; verify capability, retention, restore charges and storage |
| Key Vault/secret store | Backend secrets if required | No resource selected or estimate | Cost and transaction assumptions required; prefer managed identity where possible |
| Application Insights/diagnostics | Restricted operational logs and traces | Excluded from existing estimate | **UNPRICED**; estimate ingestion/retention and disable payload capture |
| API Management | API gateway | Excluded; not recommended for first low-cost version absent need | Keep out unless an approved requirement and cost evidence justify it |
| DNS/custom domain | Optional custom domain | Not included in existing estimate | Use provided hostname initially; third-party domain is separate cost |
| GitHub Actions/Packages | CI and artifacts | Not independently costed | Check account plan and quotas; limit artifacts and workflow minutes |
| Currency conversion/tax/other | All applicable charges | No billing evidence independently reviewed | Confirm billing currency, taxes, FX and Cost Analysis privately |

**Cost gate result: NOT PASSED.** No exact, evidence-backed all-in forecast for the authenticated design is available. Do not provision any service. If the authenticated stack cannot be demonstrated to remain within R100/month, defer authenticated persistence/features and keep the static anonymous MVP until an approved budget/scope change.

### Required workload assumptions

Before pricing, record:
- expected monthly active users and peak concurrent users;
- API requests per user per session, average/p95 duration and memory;
- catalogue size, profile size, saved items per account, database growth;
- log/trace ingestion volume and retention;
- backup frequency, backup size, restore frequency and retention;
- data region, redundancy/HA choice, bandwidth/egress and retry behavior;
- free-tier allowances, quotas, hard-stop behavior and metered overage exposure;
- current ZAR exchange/tax/billing assumptions, GitHub plan usage and any domain cost.

Produce three scenarios: low expected, realistic demo peak, and adverse/abuse peak. For each, include ZAR/month per service, assumptions/source/date, quota thresholds, shutdown action and owner. Alerts are detection controls, not proof of a hard spending cap.

## 2. Executable acceptance matrix

These are test specifications, not evidence of tests run. Implement tests against the actual API and persistence boundary when implementation is authorized. Use synthetic users A/B and synthetic learner profiles only.

| ID | Area | Executable scenario | Pass criterion |
|---|---|---|---|
| Q020-T01 | Authentication | Missing, malformed, expired, invalid-signature, wrong-issuer/audience/scope token | Request denied; no protected data returned; safe error |
| Q020-T02 | Input validation | Unknown subject ID, mark decimal/outside 0–100, invalid enum, extra field, oversized body, injection strings | Reject safely; no write/SQL effect; no fabricated match |
| Q020-T03 | Determinism | Same synthetic request and catalogue version repeated | Identical eligibility/rationale; unresolved rules return UNKNOWN |
| Q020-T04 | Anonymous privacy | Enter unique canary values in anonymous form and inspect browser network, URL, storage, API, logs and telemetry | Values remain page-memory-only; no outbound requests or persistence containing canary |
| Q020-T05 | Authenticated payload privacy | Submit synthetic canaries for authenticated transient matching; inspect URLs, headers, logs, traces, errors, caches | Values only in intended HTTPS body; no URL/log/telemetry/error leakage; response no-store |
| Q020-T06 | Consent | Sign in without opt-in and attempt profile write directly | Server rejects; no profile row |
| Q020-T07 | Opt-in | Valid explicit opt-in with current purpose/notice version | Only allowlisted fields saved; audit event has no profile values |
| Q020-T08 | Withdrawal | Withdraw while profile exists; race with concurrent profile write/read | Future use/writes stop immediately; deletion begins; behavior matches approved SLA |
| Q020-T09 | Saved-item ownership | User A creates/list/removes own saved IDs | Only A's IDs visible; duplicates idempotent |
| Q020-T10 | Cross-account isolation | User A guesses User B IDs and attempts GET/PUT/PATCH/DELETE and alternate body/path IDs | Denied without disclosure; B's records unchanged |
| Q020-T11 | Logout/account switch | Multiple tabs, browser back/forward, expired session, failed network, switch A→B | A's data not shown to B; local account state cleared; safe failure |
| Q020-T12 | Failure paths | Identity provider timeout, DB unavailable, deletion worker failure, catalogue stale/missing | Fail closed; no unsafe writes, cross-account fallback or sensitive error |
| Q020-T13 | Deletion | Delete account with profile, consent, saved items and queued work | Access disabled; active data/derived copies removed; operation idempotent and auditable |
| Q020-T14 | Backup restore | Restore synthetic backup containing deleted account; replay deletion tombstones | Deleted account data never becomes available in active service |
| Q020-T15 | Provider retention | Inspect actual identity, hosting, API, database, backup and diagnostics settings | Evidence matches approved schedule; no body capture; unsupported retention is documented and blocks persistence |
| Q020-T16 | Tracker non-persistence | Create/edit tracker entries, inspect network/storage, reload page | No API/browser-storage writes; entries disappear after reload |
| Q020-T17 | Funding/pathway freshness | Remove/retire catalogue item or expire opportunity | UI explicitly identifies unavailable/expired item and links official source; no stale snapshot presented as current |
| Q020-T18 | Cost/load | Exercise approved low/realistic/adverse workload and calculate metered usage | Forecast/evidence stays ≤R100/month; quota/disable behavior verified |
| Q020-T19 | Accessibility/age | Keyboard/screen-reader review of notice, opt-in, withdrawal and account deletion | Understandable, unbundled choices; labels/focus/errors accessible; legal reviewer conditions met |
| Q020-T20 | Regression/security | Run lint, unit, contract, integration, E2E, dependency/security scans on exact commit | All required jobs pass; results tied to SHA; no unresolved critical/high findings without approved exception |

## 3. Golden-set acceptance

- Use a versioned synthetic catalogue and at least 20 synthetic cases.
- Include boundary marks, alternative qualification routes, missing/ambiguous rules, invalid subjects, stale catalogue data and unsupported programme types.
- Require 100% agreement with signed expected outcomes and **zero false-positive ELIGIBLE results**.
- Every expected outcome must cite the source/rule and catalogue version. A missing material rule must expect UNKNOWN.
- Golden cases and expected outcomes require curator review; test code must not generate its own expected answer from the implementation.

## 4. Evidence required for each executed test

Record test ID, requirement/acceptance-criterion IDs, fixture/catalogue version, environment, exact command or reproducible steps, expected and actual result, timestamp, commit SHA, artifact/log reference and PASS, FAIL, BLOCKED or NOT RUN. Never attach real learner data, tokens, cookies or unredacted service identifiers.

## 5. Suggested command gates (to finalize after source/stack inspection)

The repository inventory must be rechecked before implementation because current documentation does not establish an application package, API runtime, database migration system or executable integration environment. Once those exist, the CI pipeline should include equivalent repository-appropriate commands for:
1. formatting/lint;
2. unit tests for validation, deterministic matching, consent and deletion state machines;
3. API/OpenAPI schema validation and contract tests;
4. integration tests against a disposable test database and real authorization middleware;
5. privacy-canary tests over network, browser storage, logs, traces and error paths;
6. two-account isolation tests against actual endpoints and persisted rows;
7. withdrawal, account-deletion, failed-job retry and restore-after-deletion tests;
8. E2E/accessibility checks for anonymous and authenticated journeys;
9. dependency/security scans and secret scanning;
10. build, deployment smoke tests and cost/rollback checks only after separately authorized provisioning.

Do not invent commands for packages or services that have not been verified in the repository. The actual command list must be committed with the implementation and run in CI.

## 6. Gate disposition

- **Test specifications:** proposed and reviewable.
- **Executable tests:** not yet implemented or run.
- **Runtime privacy/isolation/deletion:** not verified.
- **Cost gate:** not passed.
- **Next gate:** owner decisions on the decision pack; qualified privacy/legal review; service-by-service cost evidence; then freeze OpenAPI and executable tests before implementation.
