# GAP-002 — Minimum Runnable Baseline and Privacy Verification Plan

**Status:** Baseline plan established; runtime privacy verification BLOCKED because no runnable application has been verified in the repository inventory.  
**Date:** 2026-10-14  
**Repository baseline reported by owner:** `8da1dcf97d14276b4e4cad010168dfd13b87cca7`  
**Scope:** Define the smallest reviewable implementation and evidence required to prove the approved browser-memory-only learner-data boundary. This document is not evidence that the boundary is implemented.

## 1. Current finding

The owner-supplied tracked-file inventory lists no application entry point, package manifest/lockfile, frontend source, API implementation, CI workflow, browser test harness, or deployment configuration. The only listed executable test is `tests/contracts/subject-catalogue-v1.test.mjs`; its 12-pass result was owner-supplied and does not test runtime privacy.

**Therefore the requested negative privacy claims cannot yet be verified.** There is no confirmed runnable journey in which to inject synthetic sentinel values and observe network, storage, logging, or telemetry sinks. A source-level absence check against a documentation-only tree would not prove runtime behavior or provider-side collection.

## 2. Implementation baseline — proposed, minimal and reversible

Do not provision Azure or introduce a server runtime as part of this baseline. First produce a local, runnable, browser-only vertical slice that uses synthetic data and can be exercised in an automated browser. Preserve the approved React/Vite direction where compatible with the eventual repository evidence; confirm the actual toolchain when the code baseline is created.

Minimum components:
1. A documented app entry point and deterministic local development/build/test commands.
2. One learner input form with synthetic sentinel-friendly fields; client-side matching/result rendering only.
3. One explicit reset action that clears all form values, derived results and transient tracker state.
4. Public catalogue fixtures only; no learner profile API, server-side matching, upload, authentication, database or cloud persistence.
5. A browser test harness capable of observing outbound requests, URL/history changes, browser storage/cookies, console output and page lifecycle/reset behavior.
6. CI that runs contract tests, privacy regression tests and production build on pull requests, with results tied to the reviewed commit.

This is a proposed minimum implementation baseline, not a stack redesign approval. Do not add dependencies or hosting services without reviewing necessity, maintenance burden, security and the R100/month cap. Runtime/API composition remains subject to OR-019/Q-018 and D-044; any API, if subsequently approved, is catalogue-only and receives no learner values.

## 3. Data-flow invariants

Use synthetic sentinel strings such as `STUDYPATH_PRIVACY_SENTINEL_MARK_7391`, `STUDYPATH_PRIVACY_SENTINEL_SUBJECT_2846`, `STUDYPATH_PRIVACY_SENTINEL_INTEREST_6152`, and `STUDYPATH_PRIVACY_SENTINEL_TRACKER_9037` in automated tests only. Never use real learner data in these tests.

- Learner inputs, derived match results, funding inputs and tracker entries live only in in-memory application state.
- No learner values or derived results appear in fetch/XHR request URLs, query parameters, headers, bodies, sendBeacon, WebSocket messages, navigation URLs, referrers under app control, analytics, error reporting, traces, console output or application logs.
- No learner values or derived results are written to localStorage, sessionStorage, IndexedDB, Cache API, cookies, service-worker caches, URL fragments, history state, downloads, or any server/database/blob store.
- No profile-specific route or server-side matching endpoint is present.
- Requests permitted for public catalogue data have fixed public-catalogue purposes and do not vary with learner input; catalogue responses contain no learner-specific records.
- Reset removes input state, computed output, funding state and tracker entries from the live UI/state.
- Reloading or opening a new tab does not restore learner inputs/results/tracker entries through app-controlled mechanisms.
- Any unavoidable platform/hosting metadata (e.g. IP address, user-agent, request timing) must be separately inventoried from learner values and reviewed against the selected provider's logging/retention defaults before public use.

## 4. Required verification suite

| ID | Test | Pass condition | Evidence required |
|---|---|---|---|
| PRIV-001 | Network sink interception | Sentinel values are absent from every request URL, query, header and body; absent from XHR, fetch, beacon, WebSocket and navigation destinations | Automated browser report listing destination/method and pass/fail without echoing sentinel payloads |
| PRIV-002 | Third-party destination allowlist | No unexpected third-party request occurs; any catalogue request matches the approved origin/path/method | Captured request inventory with destination and purpose |
| PRIV-003 | Storage and cookies | Sentinel values and derived results are absent from local/session storage, IndexedDB, Cache API, cookies and service-worker caches | Browser storage snapshot before/after input, matching, reset and reload |
| PRIV-004 | URL/history/referrer | Sentinel values are absent from current URL, query, fragment, history state, navigation and app-controlled referrer values | Browser assertions across input, result, reset and reload |
| PRIV-005 | Console and client telemetry | Sentinel values are absent from console messages, error events, traces, analytics and error-reporting payloads | Instrumented test sinks and dependency/config review |
| PRIV-006 | Server/API logs | No request containing learner values is sent to an app API; if catalogue API exists, inspect actual server/provider logs and retention settings | Route review plus redacted log/config evidence; do not log real or synthetic payloads to production |
| PRIV-007 | Reset | All input fields, computed results and transient tracker/funding state are cleared; no stale result remains visible | Browser assertion and screenshot/test artifact using synthetic data |
| PRIV-008 | Reload/new tab | Inputs/results/tracker do not restore after reload or a fresh tab | Browser test after a complete interaction |
| PRIV-009 | Failure paths | Network errors, malformed catalogue responses and runtime exceptions do not include learner values in user-visible errors, console or telemetry | Injected failure tests with sink assertions |
| PRIV-010 | Build/dependency/CI | Lockfile and scripts are reproducible; privacy suite and build run in CI on the same commit; no unexplained analytics/error SDK | CI URL and commit SHA, dependency inventory, build/test logs |
| PRIV-011 | Static source audit | Search all sources/config for storage APIs, network sinks, logging, telemetry SDKs, service workers, caches and URL mutation; each occurrence is explained | Reviewed source-sink inventory with file/line and disposition |
| PRIV-012 | Hosting/provider boundary | Actual hosting, CDN, API and monitoring configuration and data retention are reviewed; privacy notice matches verified behavior | Redacted configuration/provider documentation and privacy review record |

**Pass rule:** all applicable tests pass; every network destination and persistent sink is accounted for; no unexplained learner-data sink exists; no false-positive “privacy verified” claim based only on source review. Any failing, skipped, unsupported or uninstrumented sink means GAP-002 remains OPEN.

## 5. Execution procedure after runnable code exists

1. Record exact branch and commit SHA; start with a clean working tree.
2. Install from the committed lockfile and record runtime/browser versions.
3. Run existing contract tests, lint/type checks if configured, and production build.
4. Launch the app locally with network access observable; use synthetic sentinels only.
5. Run PRIV-001–PRIV-009 in an automated browser, then manually inspect all requests and browser storage.
6. Review every source/config sink from PRIV-011 and all runtime dependencies, including transitive analytics/error-reporting packages.
7. If any API/hosting is added, review actual server, platform, CDN and provider logging/retention configuration for PRIV-006/012. Local browser tests cannot establish provider-side behavior.
8. Run the same suite in CI; record the exact workflow run URL, commit SHA, passed/failed/skipped tests and retained redacted artifacts.
9. Review reset/reload behavior, privacy notice, CSP/headers, CORS, cache behavior and unexpected egress before considering a public demo.
10. Use independent reviewer if available; if not, record the single-owner review limitation. No real learner inputs until the applicable privacy/legal review and release gate are complete.

## 6. Explicit blockers and non-claims

- No app code has been written or tested as part of this plan.
- No runtime behavior has been observed, so no claim is made that transmission, persistence, logging or telemetry leakage is absent.
- No API/provider logs, hosting configuration, external telemetry, CI run, deployment or privacy/legal review has been inspected or verified.
- The architecture's API-first direction and browser-only learner data boundary coexist, but final runtime composition, route/schema, provider retention and cost feasibility remain open under OR-019/Q-018.
- Do not provision resources or add billable services. Keep synthetic-only development and the R100/month cap.

## 7. Gate

**Implementation baseline plan: DOCUMENTED. Runnable baseline: NOT ESTABLISHED. Runtime privacy verification: BLOCKED. GAP-002: OPEN.**

The next valid gate is a reviewed implementation PR that adds the minimum runnable browser-only slice and executable privacy suite. After that, run and retain evidence for the tests above; do not mark this gap closed merely because the tests exist.
