# Funding and Tracker Policy Selections — Review Record

- **Status:** Proposed selections for review — NOT final approval
- **Date:** 2026-10-14
- **Related policy:** [Funding, Application Tracking and Privacy Policy](FUNDING-TRACKER-PRIVACY-POLICY.md)
- **Related PR:** [PR #10](https://github.com/s1xte3n/studypath-sa/pull/10) added the policy baseline and is already merged. This review record is separate; it does not approve implementation or change that merge.
- **Decision authority:** Product owner approval remains outstanding.

## 1. Selections submitted for review

| Topic | Proposed selection | Review status |
|---|---|---|
| Funding catalogue freshness | Re-verify active opportunities against the official provider source at least every 30 days; mark records UNVERIFIED when overdue or when the official source cannot be checked. | Proposed; not approved |
| Tracker persistence | Page memory only. No server/database, localStorage, sessionStorage, cookies, account, or cloud sync. Reload/close may discard entries. | Proposed; not approved |
| Tracker transitions | Use the transition table in `FUNDING-TRACKER-PRIVACY-POLICY.md`, including terminal WITHDRAWN and explicit correction/removal behaviour. | Proposed; not approved |

These selections express the preferred direction for product-owner review only. They are not authorisation to implement, do not change the source-of-truth status to approved, and do not unblock the PRD gate.

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
- Every transition in the proposed table is accepted, and every unlisted transition is rejected with an understandable message.
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

**PRD gate remains BLOCKED.** Recording these preferences is not equivalent to approving them. Before the PRD can be marked READY, the product owner must explicitly confirm or amend these selections, resolve the remaining policy questions, and align the PRD, requirements matrix, acceptance criteria, and test strategy.

Remaining review items include:
1. Approve or change the 30-day threshold and the display treatment for `UNVERIFIED` opportunities.
2. Approve the status vocabulary, transition table, correction behaviour, and session-only retention.
3. Decide whether any predefined next-action options are included.
4. Review hosting/provider telemetry defaults and ensure no learner-specific values are emitted.
5. Reconcile the resulting requirements with the supplied StudyPath SA specification and official hackathon programme.

## 4. Traceability to carry forward

| Requirement area | Contract/behaviour to define in PRD | Test evidence required | Implementation/release evidence |
|---|---|---|---|
| Funding freshness | Catalogue freshness, source provenance, status and deadline display rules | Freshness boundary, unavailable source, deadline change/expiry and unknown-criteria cases | Catalogue verification record, automated test results, demo evidence |
| Tracker transitions | Exact states, allowed transitions, correction/removal and reset | Positive/negative transition tests and reset/reload tests | Reviewed client implementation and CI results |
| Anonymous-first/privacy | Permitted inputs, no persistence, no sensitive telemetry, disclosure | Storage inspection, telemetry/log review, accessibility and synthetic-data checks | Security/privacy review and release smoke-test evidence |

**Current state:** documented for review; not approved, not implemented, not tested, and not deployed.
