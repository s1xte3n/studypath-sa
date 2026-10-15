# Phase 2 A3 — Authenticated-feature boundary review

**Status:** Accepted by the product owner on 2026-10-15; recorded as D-048. A3's authenticated-feature boundary decision is closed after reconciliation in the requirements, traceability and checklist artifacts. Q-018, Q-020, G-SYN-001 and the overall Phase 2 gate remain open.
**Scope:** Requirements-only change control. This document does not authorize implementation, identity configuration, transmission of real learner data, persistence, provisioning or deployment.
**Baseline:** D-044–D-047, Q-018, Q-020, `REQ-AUTH-001`, `AC-AUTH-001–016`, and `T-AUTH-001–018`.

## 1. Decision requested

Approve the following boundary for the requirements baseline:

1. Keep D-046's five authenticated features as **approved future product scope**: authenticated server-side pathway matching, saved pathways, pathway comparison, saved funding opportunities, and a derived personal dashboard.
2. Keep those features **out of the D-047 / G-SYN-001 local synthetic-only demo**. Do not expose login or authenticated-only controls in that demo.
3. Treat academic-profile persistence as **off by default**. Login is not consent. Profile writes require separate explicit opt-in after approved notice; withdrawal must stop future writes and invoke the approved deletion lifecycle.
4. Keep the application tracker **page-memory-only**, including for authenticated users. It must not sync to accounts or survive reload/close.
5. Freeze the exact authenticated API/UI contracts only after the named decisions in Section 4 are resolved through Q-018/Q-020 and the applicable architecture, privacy/security, cost and test gates. Until then, acceptance criteria remain requirements-level intent, not executable contract approval.
6. Do not pass A3 or Phase 2 merely because this proposal is merged. Record explicit owner acceptance and reconcile any resulting change-control decision first.

**Recommended disposition:** accept this boundary. It preserves the approved feature direction without allowing undecided schemas, data lifecycle or provider assumptions to leak into implementation.

## 2. Feature-by-feature requirements disposition

| Feature | Required observable behavior | Existing acceptance criteria | Requirement-level status |
|---|---|---|---|
| Authenticated pathway matching | Server validates the credential and request; absent/invalid/expired credentials are rejected; only an explicitly allowlisted minimum input contract is accepted; results use deterministic, explainable `ELIGIBLE`, `NOT_ELIGIBLE`, or `UNKNOWN` semantics. Anonymous matching remains client-side and sends no learner-specific fields. | AC-AUTH-001–002, AC-AUTH-013, AC-AUTH-015–016 | Core outcome is defined. Exact request/response schema, allowed-field list and identity/session contract remain OPEN for Q-018 / Phase 3. |
| Saved pathways | A learner can save and remove a pathway. Persist only its stable catalogue ID and necessary ownership/audit metadata; render current catalogue details; show a defined unavailable/retired state rather than stale copied details. A user cannot read or modify another account's items. | AC-AUTH-006–007, AC-AUTH-011, AC-AUTH-014–016 | Core outcome is defined. Exact item schema, duplicate behavior, retired-ID presentation and API error contract remain OPEN for Phase 3. |
| Pathway comparison | Compare only selected supported records and verified catalogue fields; label unavailable fields; link official sources; do not invent values, weighted scores, admission probabilities or guarantees. | AC-AUTH-009, AC-AUTH-015–016 | Safety behavior is defined. Exact comparison field set, ordering and empty/partial comparison UX remain OPEN and must be approved in the UI/API contract. |
| Saved funding opportunities | A learner can save and remove an opportunity. Persist only the stable opportunity ID and necessary ownership/audit metadata; render current catalogue details and clearly identify expired/withdrawn opportunities. Do not imply award approval. Cross-account access is denied. | AC-AUTH-006, AC-AUTH-008, AC-AUTH-011, AC-AUTH-014–016 | Core outcome is defined. Exact item schema and stale/expired/withdrawn interaction remain OPEN for Phase 3. P1 funding-data readiness remains separate. |
| Derived personal dashboard | Dashboard summaries are derived only from the learner's authorized matching/saved-pathway/saved-funding data; do not create a second profile store or duplicate unnecessary personal data. Empty and unavailable states must be explicit. | AC-AUTH-010–011, AC-AUTH-013–016 | Privacy/data-minimisation boundary is defined. Exact cards, summaries, calculation rules and empty-state copy are OPEN product/UI decisions; do not build an assumed dashboard. |
| Academic-profile opt-in | No academic profile is persisted by default. Explicit opt-in follows approved notice. Only allowlisted fields are written; consent version/time are recorded without logging profile values. Withdrawal blocks subsequent writes and triggers approved deletion of profile/derived copies under the approved backup-expiry policy. | AC-AUTH-003–005, AC-AUTH-014–016 | Default/no-consent behavior is defined. Exact field allowlist, notice text, consent evidence model, retention period and deletion/backup expiry remain OPEN for Q-020 and required privacy/legal review. |
| Session and account changes | On logout, session end or account switch, clear or isolate account-specific results/caches so the next account cannot see prior account data. Server enforces ownership on every protected read/write. | AC-AUTH-006, AC-AUTH-011, AC-AUTH-013–016 | Required outcome is defined. Identity provider, session/recovery behavior, cache policy and exact authorization contract remain OPEN for Q-018 / Phase 3. |
| Application tracker | Entries remain in page memory only; no account save, API transmission, browser storage, cross-session sync or restore after reload/close. Status remains learner-reported; the app never claims to submit or verify an application. | AC-AUTH-012 plus AC-APP-001–009 | Defined by approved OR-016. No change to tracker scope or persistence is proposed. |

## 3. Requirements and verification traceability

| Requirement / contract | Existing test IDs | Current evidence status |
|---|---|---|
| REQ-AUTH-001 and AC-AUTH-001–016 | T-AUTH-001–018; AC-APP-001–009 for tracker behavior | Planned test coverage only. Exact schemas, provider/session behavior, consent/retention values, comparison fields and dashboard summaries must be frozen before tests can be executable contracts. |
| D-045 anonymous boundary | T-PRV-001–004, T-API-001–004 and G-SYN-001 privacy canaries | Runtime behavior not verified. The local synthetic-only gate remains OPEN / NOT PASSED. |
| Q-018 architecture, API and cost | API contract review and approved cost/test plan | Not passed. No provisioning or deployment is authorized. |
| Q-020 lifecycle, privacy/security and identity | T-AUTH-001–018 and Q-020 lifecycle evidence register | Not passed. This proposal is not legal/privacy clearance, provider verification or runtime security evidence. |

No test is claimed executed by this document. A successful documentation/contract CI run would not prove authorization isolation, consent/withdrawal, deletion, browser privacy, cost compliance or runtime behavior.

## 4. Open decisions that must not be guessed

| Decision | Required owner/gate disposition |
|---|---|
| Authenticated matching fields and request/response schema | Approve exact allowlist and versioned API contract in Phase 3/Q-018 before implementation. |
| Identity provider, login/logout, account recovery and session expiry | Resolve under Q-018/Q-020 with provider capability and security evidence. |
| Profile fields, consent notice/version, withdrawal semantics, retention and backup expiry | Resolve under Q-020 and applicable privacy/legal review before any profile persistence. |
| Saved pathway/funding schemas, duplicates and retired/expired item states | Approve the minimal data contract and observable states in Phase 3; store stable IDs, not copied catalogue records. |
| Comparison fields, ordering, empty/partial states | Product owner must approve the comparison field set and observable UI behavior before implementation. |
| Dashboard cards, summaries and empty states | Product owner must approve the specific derived outputs and calculation rules before implementation. |
| Authorization, cache/error behavior, logs/telemetry, resilience and total monthly cost | Resolve in Q-018/Q-020 and security/cost gates. Preserve the R100/month cap; no provisioning until approved. |

If the owner does not want to make these future-scope decisions now, use formal change control to defer the affected feature(s) explicitly. Do not mark A3 complete based on this proposal alone.

## 5. Interim restrictions remain unchanged

- G-SYN-001 uses synthetic fixtures and page-memory state only.
- No login, production identity, authenticated matching, profile persistence, account-saved pathways/funding, cloud sync, uploads, real learner data, Azure provisioning or deployment in the current demo.
- Anonymous learner inputs, results and tracker entries must not be sent to APIs, URLs, analytics, application logs or error telemetry.
- The external South African privacy/legal review remains deferred, not waived. Real learner-data use remains prohibited until applicable review and controls are verified.
- The R100/month total spend cap remains hard.

## 6. Acceptance and gate status

**A3 boundary decision: ACCEPTED by the product owner on 2026-10-15 and recorded as D-048.**

The owner accepted the boundary in Section 1 as proposed. The exact contracts and unresolved parameters in Section 4 are explicitly deferred to Q-018 / Phase 3 and Q-020, with privacy/legal review and applicable architecture, security, cost and test gates still required. The checklist and source-of-truth records have been reconciled to record this acceptance.

This closes A3's boundary-decision criterion only. It does **not** pass the full Phase 2 REQUIREMENTS READY gate, G-SYN-001, Q-018, Q-020 or release readiness, and does not authorize implementation, real learner data, production identity, persistence, provisioning or deployment.
