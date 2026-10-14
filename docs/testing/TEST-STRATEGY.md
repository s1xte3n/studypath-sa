# StudyPath SA — Test Strategy

Status: Draft; no tests were run as part of this document. Date: 2026-10-14.

## Objectives
Prove core journey, deterministic eligibility, source provenance, privacy, accessibility and resilience before implementation is declared complete. Acceptance criteria are test oracles, not test results. Use synthetic data only. Record exact commands, environment versions, outcomes, failures and retained evidence.

## Test levels
| Level | Coverage | Evidence |
|---|---|---|
| Unit | Input validation/normalization; eligibility AND/OR/conditions; preference separation; funding freshness/matching; tracker transitions/reset | Automated report and deterministic fixtures |
| Schema/data | Programme/funding/relationship schemas; source URL, cycle, verification, version and curator sign-off | Schema output and manual source audit |
| Golden set | At least 20 versioned synthetic eligibility cases | 100% expected classifications; zero false-positive ELIGIBLE |
| Integration | UI/domain interfaces, catalogue loading, error/empty states; HTTP contracts only if API-first is approved | Interface tests and report |
| Accessibility | WCAG 2.2 AA target, 320 CSS px, keyboard, labels, focus, error associations, contrast, screen-reader review | Automated checks plus manual results |
| Privacy/security | Persistent storage, URLs, network, logs/telemetry, synthetic data, dependencies and configuration | Inspection notes and scan output |
| Performance | In-browser matching p95 ≤1 second for up to 100 records on agreed device/browser | Repeatable benchmark with environment details |
| End-to-end | Enter synthetic marks → results → details/source → reset; funding/tracker when implemented | Dated journey report |
| Regression | Accepted eligibility/privacy/tracker/accessibility behaviour | Full suite results |
| Release smoke | Deployed version, load, catalogue, official links, reset, errors, privacy notice and rollback/monitoring if applicable | Dated smoke report; currently not applicable because app is not deployed |

## Golden-set requirements
Proposed fixture path: tests/fixtures/eligibility-golden-v1.json. Include at least 20 synthetic cases:
1. All mandatory requirements verified/met → ELIGIBLE.
2. Verified mandatory failure → NOT_ELIGIBLE.
3. Missing material learner result → UNKNOWN.
4. Missing/ambiguous material rule → UNKNOWN.
5. Mandatory failure plus unknown, applying OR-004 precedence.
6. AND group pass/fail/unknown.
7. OR alternatives pass/all fail/no pass plus unknown.
8. Conditional requirement true/false/unknown.
9. Verified complete APS formula versus unsupported/incomplete formula.
10. Life Orientation handling verified versus unknown.
11. Explicit alias normalization.
12. Duplicate canonical subject through aliases.
13. Unsupported subject that does/does not affect a pathway.
14. Stale/wrong-cycle source.
15. Conflicting authoritative sources.
16. Partial rule set cannot yield ELIGIBLE.
17. Preference changes do not change eligibility.
18. Stable output order for same input/catalogue version.
19. Verified alternative and unverified articulation.
20. Empty catalogue/source unavailable/dependency failure.

Acceptance: 100% expected classifications and zero false-positive ELIGIBLE. Any false-positive ELIGIBLE blocks release.

## Input tests
Study stage required; at least one subject/mark pair; 0, 1, 99, 100 accepted; -1, 101, decimals, blank and malformed marks rejected. Missing is never zero. Aliases must be explicit, fuzzy matching prohibited, canonical duplicates rejected. Optional preferences can be blank. Grade 11/12 marks are not assumed final matric marks. Reset clears input/results and reload does not restore app-controlled profile values.

## Funding tests
Only approved limited inputs; missing material criteria → UNKNOWN; funding eligibility separate from admission; official source/date/status present; 30-day boundary; overdue/uncheckable → UNVERIFIED; passed deadline → EXPIRED unless official extension; deadline changes trigger re-verification; no award guarantee/application submission claim.

## Tracker tests
Test every allowed and forbidden transition in FUNDING-TRACKER-PRIVACY-POLICY.md. Verify WITHDRAWN terminal, correction/removal behaviour, submittedAt only for SUBMITTED, statuses labelled learner-reported, approved fields only, clear/reset clears associated funding state, reload starts empty, and no localStorage/sessionStorage/cookies/IndexedDB/server persistence.

## Accessibility/privacy/browser matrix
At 320 CSS px, no unintended horizontal overflow. Keyboard-only completion, visible focus, labels, associated errors and non-colour-only status. Test current stable Chrome, Edge, Firefox and Safari where available and record exact versions/gaps. Inspect storage before/after input, results, reset, navigation and reload; inspect requests, URLs/referrers, logs, errors and hosting telemetry. Public-demo privacy gate remains blocked while provider practices are unknown.

## Performance protocol
Record device, OS, browser, catalogue size (up to 100), warm/cold conditions, sample count and percentile method. Measure p95; do not treat target as pass without evidence.

## Traceability IDs
Use stable test IDs by requirement: T-EXP, T-CAT, T-MAT, T-ALT, T-DET, T-PRV, T-UX, T-FUND and T-APP with numeric suffixes. Map every AC to one or more IDs before implementation, then add test paths/commands and CI run evidence.

## Evidence status
Test framework/code not verified; golden fixture not created here; tests not run; accessibility/privacy/performance checks not performed; deployment smoke test not applicable while undeployed.

Gate: DRAFT. Phase 6 needs test IDs, fixture owner, test framework/commands and evidence-retention review.
