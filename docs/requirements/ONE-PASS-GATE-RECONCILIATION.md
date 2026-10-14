# Consolidated Gate Reconciliation — 2026-10-14

**Result: NOT PASS — REQUIREMENTS READY remains blocked.** This records evidence, not a claim that the product cannot be completed.

## Requested outcomes

| Requested outcome | Evidence found | Result |
|---|---|---|
| 1. Verify 6–8 admission-cycle-specific programme records | UJ 2027 prospectus and programme pages provide preliminary values. The existing reconciliation matrix and curator pack explicitly say records are not publication-ready; APS inclusions, conditions, exceptions and executable expected outcomes remain incomplete. | BLOCKED |
| 2. Confirm catalogue-only API and client-side matching | D-044 and architecture/API drafts describe public catalogue-only APIs and client-side matching. Owner acceptance of the final clarification is still required; no runtime has been verified. | PENDING OWNER ACCEPTANCE; RUNTIME UNVERIFIED |
| 3. Verify funding and pathway relationships | Relationship contract is draft and no pair is approved. A signed-off catalogue of 3–5 funding opportunities is not evidenced. | BLOCKED |
| 4. Trace every requirement and AC to tests and implementation | Existing matrix maps broad requirement families, but every AC is not yet mapped to an executable test and actual implementation symbol. Runnable application source is not verified. | BLOCKED |
| 5. Approve executable test cases and thresholds | A proposed executable strategy with thresholds is prepared in this review, but owner approval and execution evidence are absent. | PENDING OWNER ACCEPTANCE |

## Official-source observations

The official UJ 2027 prospectus search result lists Diploma in Business Information Technology, code DI1401, with APS alternatives of 22 with Mathematics/Technical Mathematics or 24 with Mathematical Literacy; English level 4 (50%+); Mathematics/Technical Mathematics level 3 (40%) or Mathematical Literacy level 6 (70%). The current official programme page shows the same visible minimums. This corroborates a candidate record, but does not close all pilot records or establish every condition, exception, APS inclusion rule or applicable cycle.

Sources:
- https://www.uj.ac.za/wp-content/uploads/2026/06/uj_undergrad_prospectus2027.pdf
- https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/
- https://www.uj.ac.za/university-courses/bsc-in-information-technology/
- https://www.uj.ac.za/admission-aid/undergraduate/

UJ notes that prospectus content is subject to change. A search excerpt or current programme page alone is not a complete, signed-off eligibility oracle.

## Test strategy and mandatory pass thresholds

These are required acceptance thresholds, not claims of executed tests:

- **Eligibility:** at least 20 versioned synthetic golden cases; 100% expected-state and reason assertions pass; zero false-positive ELIGIBLE results. Missing, stale, unsigned, conflicting or cycle-ambiguous material rules cannot produce ELIGIBLE. A separately verified mandatory failure may produce NOT_ELIGIBLE; otherwise material uncertainty produces UNKNOWN.
- **Determinism:** identical normalized inputs, catalogue version and rules always produce identical state and reasons.
- **Traceability:** every PRD requirement and acceptance criterion maps to design/API/UI contract, named test ID, planned/actual implementation location and release evidence. Missing mapping blocks REQUIREMENTS READY.
- **Catalogue:** all 6–8 programme records need stable IDs, official source/title/URL, applicable cycle, full extracted rules/conditions/exceptions, APS method/inclusions, verification date, catalogue version and curator sign-off. Unresolved material source conflict blocks confident eligibility.
- **Funding:** 3–5 official opportunities require exact provider, criteria, applicable cycle, published deadline, official URL, verification date, known limitations and curator sign-off. Unknown/sensitive criteria are not inferred; expired opportunities are not shown as open.
- **Relationships:** each displayed pair requires source and target IDs, relationship type, exact official evidence, applicability/date, rationale, curator sign-off and expiry/review state. Generic NQF language or similar titles do not prove articulation. If no pairs qualify, show none as verified.
- **Privacy:** PRIV-001–012 all pass with synthetic sentinels. Zero sentinel occurrences in requests, URLs/history/referrers, storage/cookies, console, app telemetry and reviewed provider logs. Any leak blocks release. Provider-side log/retention checks require actual configuration evidence.
- **Accessibility/UX:** all approved ACs pass at documented viewport/browser targets; keyboard/focus, labels/error association, status semantics and manual accessibility review are recorded.
- **Build/CI:** clean reproducible install, required tests and production build pass on the reviewed commit; CI evidence is linked.
- **Release:** deployed build identity, smoke tests, official links, error/no-results states and provider configuration are verified. No P0 test may be skipped or blocked at release.

### Required test levels

| Level | Required coverage |
|---|---|
| Unit/domain | Input validation, subject normalization, eligibility state/reasons, tracker transitions, funding criteria |
| Catalogue contract | Schema, provenance, cycle, freshness, sign-off, conflict and unsupported-rule handling |
| Integration | Catalogue adapter + deterministic evaluator + UI; no learner-data fields in requests |
| Browser/privacy | Network interception (fetch/XHR/beacon/WebSocket/navigation), storage/cookies, URL/referrer, console, reset, reload, error paths |
| Accessibility/UX | Keyboard/focus, labels, errors, mobile layout, status announcements, supported browsers |
| CI/build | Contract/unit/privacy suites and production build on pull requests |
| Release smoke | Reviewed build, source links, catalogue version, failure states and deployment identity |

### Privacy test IDs

- PRIV-001: intercept all outbound network sinks; no synthetic learner sentinels leave the browser.
- PRIV-002: reject unapproved third-party destinations.
- PRIV-003: inspect localStorage, sessionStorage, IndexedDB, Cache Storage, cookies and service-worker caches.
- PRIV-004: inspect address bar, history, query/hash and referrer.
- PRIV-005: inspect console, error handling, analytics and client telemetry.
- PRIV-006: review actual server/provider logs and fields.
- PRIV-007: reset clears inputs, results, funding and tracker state.
- PRIV-008: reload/new tab does not restore app-controlled learner state.
- PRIV-009: repeat leak checks on timeout, offline, malformed payload and exceptions.
- PRIV-010: reproducible install/tests/build in CI.
- PRIV-011: source audit of network, storage, logging, telemetry and navigation sinks.
- PRIV-012: hosting/provider access logs, diagnostics, retention, third-party requests and terms reviewed before public demo.

A browser test cannot prove provider-side retention. PRIV-006 and PRIV-012 require configuration and review evidence.

## Architecture boundary

Recommended boundary for owner confirmation: API serves public curated programme/funding records and provenance only; matching remains client-side; no learner marks, subjects, interests, preferences, results, tracker entries, identifiers or sensitive financial data are sent to APIs, URLs, analytics, logs or telemetry. No server-side matching, write routes, accounts, uploads, database persistence or cloud sync. Any change requires privacy/security review, threat review, API contract revision and cost approval before implementation.

## Why the gate cannot honestly be marked PASS today

1. The documented repository inventory does not verify a runnable application, package manifest/lockfile, browser harness, CI workflow or deployment.
2. The owner-supplied 12/12 subject-contract result is not evidence of eligibility logic, app integration or runtime privacy.
3. Source candidates are not complete approved eligibility oracles.
4. No signed-off funding catalogue or verified pathway relationship pair is evidenced.
5. A proposed test plan is not owner-approved or executed; provider-side privacy evidence is absent.

## Gate disposition

- PROJECT READY: previously passed for planning only.
- PRD READY: previously passed for PRD/acceptance criteria only.
- REQUIREMENTS READY: **NOT PASSED**.
- Architecture/API contract: draft; runtime and final contract unverified.
- Test strategy: proposed; owner acceptance and execution outstanding.
- Implementation/privacy/release: not evidenced as passed.

Do not provision Azure until an exact resource list is reviewed against the R100/month cap and the owner explicitly approves. Synthetic-only data remains mandatory. Do not mark this report PASS until the source records, decision acceptance, implementation, executed tests and review evidence exist.
