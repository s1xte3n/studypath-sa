# Funding and Tracker Policy Selections — Review Record

- **Status:** Policy decisions and PRD alignment approved by the product owner on 2026-10-14; PR #22 merged the documentation alignment to `main`. `PRD READY` passed for the requirements baseline only.
- **Date:** 2026-10-14
- **Related policy:** [Funding, Application Tracking and Privacy Policy](FUNDING-TRACKER-PRIVACY-POLICY.md)
- **Related PR:** [PR #10](https://github.com/s1xte3n/studypath-sa/pull/10) added the policy baseline and is already merged. This review record is separate; it does not approve implementation or change that merge.
- **Decision authority:** Product owner explicitly approved all three selections in the project conversation on 2026-10-14. This record captures that approval; it does not claim implementation, testing, or deployment.

## 1. Selections submitted for review

| Topic | Approved policy decision | Status |
|---|---|---|
| Funding catalogue freshness | Re-verify active opportunities against the official provider source at least every 30 days; mark records UNVERIFIED when overdue or when the official source cannot be checked. | Approved by product owner |
| Tracker persistence | Page memory only. No server/database, localStorage, sessionStorage, cookies, account, or cloud sync. Reload/close may discard entries. | Approved by product owner |
| Tracker transitions | Use the transition table in `FUNDING-TRACKER-PRIVACY-POLICY.md`, including terminal WITHDRAWN and explicit correction/removal behaviour. | Approved by product owner |

The product owner approved these three policy decisions and subsequently approved the revised PRD and measurable acceptance criteria on 2026-10-14. The PRD and acceptance criteria now align to page-memory-only tracker behavior. This is not proof of implementation, test completion, deployment, or release readiness.

## 2. Impact assessment

### Anonymous-first requirements

- **Consistent, with a boundary to preserve:** Page-memory-only tracking does not require accounts, authentication, a learner identity, or cross-session identifiers.
- Funding matching can use only relevant permitted inputs already described in the policy. If a provider criterion is missing or requires a disallowed/sensitive attribute, the result must remain `UNKNOWN` rather than prompting for extra data by default.
- The interface must disclose that tracker entries may be lost on reload or when the page closes. It must not imply that entries are saved or recoverable.
- Do not add analytics identifiers or hidden session persistence to make the tracker appear continuous across visits.

### Privacy

- Page-memory-only is the lowest-persistence option among those considered, but it does not mean “no processing” or eliminate browser-memory exposure while the page is open.
- Keep learner marks, funding inputs, and tracker statuses out of logs, telemetry, error traces, and AI prompts unless a separately reviewed purpose and safeguards are approved.
- Provide a visible clear/reset action that removes tracker entries and associated transient funding inputs/results from the current page state.
- Synthetic data remains required for development, tests, screenshots, and demos.
- The 30-day rule is an operational freshness policy, not a guarantee that provider information remains correct for 30 days. Recheck sooner when a deadline change is suspected; label overdue/uncheckable records `UNVERIFIED` and avoid presenting them as confirmed current.
- Statuses must always be learner-reported; StudyPath SA must not imply provider verification, application submission, or an award guarantee.

### Architecture

- No new backend, database schema, account system, storage service, or persistence API is implied by these selections.
- The tracker can be modelled as client-side in-memory state with deterministic transition validation. A page reload naturally starts a new tracker session.
- Funding freshness requires catalogue metadata (at minimum last-verified date, source URL, record status, and preferably curator/catalogue version) plus a defined curation/re-verification process. It does not by itself mandate a scheduled job or new cloud service; the MVP may use a documented manual catalogue verification workflow if operationally feasible.
- Do not add browser storage as a workaround. Any future persistence proposal requires a separate decision and privacy/security/architecture review.

### Testing and acceptance evidence

Before these rules can be considered implemented, tests should cover:

**Funding freshness**
- A record within the 30-day threshold can remain current only when the official source supports its material facts.
- An overdue record becomes `UNVERIFIED`; inability to check the official source does not silently preserve confirmed status.
- Suspected/published deadline changes trigger re-verification; confirmed expired records are not shown as current absent an explicit provider extension.
- Missing or unsupported mandatory criteria produce `UNKNOWN` unless a verified mandatory failure already establishes `NOT_ELIGIBLE`.

**Tracker transitions**
- Every transition in the approved table is accepted, and every unlisted transition is rejected with an understandable message.
- `WITHDRAWN` is terminal; corrections follow the explicit correction flow or remove-and-recreate fallback.
- `SUBMITTED`-only submission date constraints and learner-reported status labels are enforced.
- Clear/reset removes all tracker and associated transient funding state.
- Reload starts empty; no tracker data is written to localStorage, sessionStorage, cookies, or server APIs.

**Privacy and UX**
- No account is required; no sensitive attributes or documents are requested by default.
- UI disclosure precedes tracker use; reset confirmation and empty/error states are accessible.
- Automated tests, telemetry, logs, and screenshots contain no real learner data or sensitive tracker/funding values.
- Use synthetic fixtures and verify source links/status labels in demo flows.

No tests were run as part of this review record. These are proposed acceptance tests, not evidence of passing tests.

## 3. PRD gate assessment

**PRD READY: PASSED on 2026-10-14** after owner approval of the revised PRD and measurable acceptance criteria. This approves the requirements baseline only, not implementation or release.

Remaining work after `PRD READY`:
1. During Phase 2, create/approve the requirements traceability matrix and map each requirement to acceptance criteria, UI/API contract, test ID, implementation, CI result and release evidence.
2. Review hosting/provider telemetry defaults before public demo and ensure no learner-specific values are emitted; this remains a downstream privacy/release control.
3. During Phase 6 and release planning, align the test strategy and record actual test results; no tests are claimed as run by this documentation update.

## 4. Traceability to carry forward

| Requirement area | Contract/behaviour to define in PRD | Test evidence required | Implementation/release evidence |
|---|---|---|---|
| Funding freshness | Catalogue freshness, source provenance, status and deadline display rules | Freshness boundary, unavailable source, deadline change/expiry and unknown-criteria cases | Catalogue verification record, automated test results, demo evidence |
| Tracker transitions | Exact states, allowed transitions, correction/removal and reset | Positive/negative transition tests and reset/reload tests | Reviewed client implementation and CI results |
| Anonymous-first/privacy | Permitted inputs, no persistence, no sensitive telemetry, disclosure | Storage inspection, telemetry/log review, accessibility and synthetic-data checks | Security/privacy review and release smoke-test evidence |

**Current state:** the three policy decisions are owner-approved and recorded. The PRD/acceptance-criteria alignment is proposed on this branch and still requires owner review. Features are not implemented, tested or deployed.
