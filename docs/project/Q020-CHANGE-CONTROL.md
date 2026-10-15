# Q-020 Change Control — Authenticated Learner Feature Scope

**Status:** Owner-approved scope; documentation change submitted for review. Implementation remains blocked by lifecycle, contract, privacy/security, test and cost gates.
**Decision:** D-046, approved by the product owner on 2026-10-15.
**Affected baseline:** PRD and acceptance criteria approved 2026-10-14; D-045 tiered matching direction.

## 1. Approved feature scope

1. **Personalised pathway matching:** authenticated server-side deterministic matching using approved minimum profile fields.
2. **Saved pathways:** account-linked stable programme identifiers; resolve details from the current verified catalogue.
3. **Pathway comparison:** compare supported, verified catalogue fields; disclose unavailable fields and provide official source links. This is a scope change from the earlier PRD non-goal for institution comparison.
4. **Saved funding opportunities:** account-linked stable opportunity identifiers; resolve current details from the verified funding catalogue.
5. **Personal study dashboard:** derived view over approved matching and saved-item features; no independent permission to collect or persist more data.

**Academic profile persistence:** allowed only after explicit opt-in. Login alone is not consent. Define consent capture/version, withdrawal, retention, correction and deletion before implementation. Matching without persistence should remain possible where technically and product-wise supported.

**Application tracker:** retain page-memory-only behavior. No API submission, database, localStorage, sessionStorage, IndexedDB, cookies, account sync or cloud sync; reload/close may discard entries.

## 2. Privacy tier boundary

- Anonymous learners: public catalogue API only; matching stays client-side. Learner inputs, results and tracker entries remain in page memory and are not sent to APIs, URLs, analytics, application logs or error telemetry.
- Authenticated matching: only approved minimum fields in an authenticated HTTPS request body. Do not place profile values in URLs, logs, analytics, error telemetry or unnecessary traces.
- Use synthetic data in development/demo until applicable privacy/legal review and runtime controls are verified.
- Funding workflows must not collect national ID, household income, bank details or financial documents under this change.

## 3. Data lifecycle gates

Before implementation, approve for each category (profile, saved programme IDs, saved funding IDs and any derived dashboard state):
- exact fields, purpose, minimization and source of each field;
- opt-in, notice version, consent evidence, withdrawal and behavior without consent;
- where stored, access boundary, cache behavior and whether data is derived or duplicated;
- retention duration, inactive-account handling, correction/export expectations where applicable, deletion and backup-expiry policy;
- account recovery, logout/account-switch behavior and shared-device exposure;
- handling of retired/expired catalogue identifiers and current source refreshes.

Do not invent retention periods or deletion SLAs before the owner reviews the applicable privacy/legal requirements and actual storage design.

## 4. Security/privacy gates

- Verify authentication server-side; choose and configure the identity provider deliberately.
- Enforce server-side authorization and account ownership on every read/write/delete; test cross-user isolation with guessed IDs and direct requests.
- Validate request/response schemas and constrain accepted fields.
- Inspect provider, application, error and monitoring logs for sensitive fields and retention; ensure profile values and raw matching payloads are excluded.
- Define no-store/private cache semantics for account-specific responses, CORS, rate limits, timeouts and safe errors.
- Review consent/notice, data minimization, privacy/legal applicability, account recovery, logout and shared-device behavior.
- Verify deletion of active data, derived copies and eventual backup expiry.
- No real learner data until applicable privacy/legal review and controls are verified.

## 5. Cost gate

The full solution must remain within the hard R100/month project cap. Cost the actual proposed identity, runtime, database, monitoring, backups, networking and any API-management components at the expected workload. Verify quotas, metering and overages. No new resource may be provisioned before the full cost and exact resource list are approved.

## 6. Acceptance and evidence gates

Before feature acceptance, freeze the API/UI contracts and execute relevant unit, integration, API-contract, end-to-end, accessibility, privacy/security and resilience tests. Required scenarios include anonymous privacy, authenticated matching, opt-in/withdrawal, ownership isolation, bookmarks, comparison, dashboard, shared devices, tracker non-persistence, logs/telemetry, deletion and cost. Record the exact tested commit and CI results. A written plan or HTTP 2xx response is not evidence of acceptance.

## 7. Traceability and next gate

Map each approved feature to requirement ID → UI/API contract → test ID → implementation → CI result → release evidence. Update the requirements matrix and backlog with the authenticated feature requirements and their blockers. Keep Q-020 open until lifecycle decisions, schemas, security/privacy review, cost estimate and executable test oracles are complete. Do not mark REQUIREMENTS READY, implementation, deployment or release complete from this documentation decision.

## 8. Explicit exclusions

No tracker persistence, application submission/integration, uploads, document extraction, AI-based eligibility decisions, notifications, sensitive financial-data collection or implicit profile storage is approved by this change.
