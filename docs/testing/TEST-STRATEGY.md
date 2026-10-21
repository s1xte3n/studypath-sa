# Test Strategy — Hackathon MVP

## Objective and scope

Prove the anonymous synthetic-only student journey: input validation, draft-safe eligibility uncertainty, reset lifecycle, no transmission/persistence of learner entries, accessible form interactions, and a reproducible build. The UJ 2027 pilot catalogue is DRAFT_NOT_FOR_DEFINITIVE_SCREENING and must not produce definitive eligibility.

## Layers

1. Static/configuration: lockfile install and Node.js version; inspect for accidental secrets.
2. Unit/domain: Node built-in test runner for validation, evaluator/golden cases, and pathway adapter.
3. Contract: approved public catalogue OpenAPI and subject-catalogue contract tests.
4. Browser E2E: Playwright + axe via existing CI workflow; form validation, result rendering, reset, 320px layout, keyboard focus, selected privacy channels.
5. Integration/deployment: blocked/not applicable to the current local-only slice; no hosted runtime or cloud deployment is claimed.

## Commands

- Clean install: npm ci --no-audit --no-fund
- Unit/domain/contract tests: npm test
- Build: npm run build
- Browser tests: inspect .github/workflows/browser-e2e-privacy-a11y.yml for the exact CI command and installed browser dependencies.
- API/Postman: contract operations are specified but no hosted runtime is claimed. Do not infer a test passed because the contract exists.

A check is PASS only when actually executed and output/exit status inspected. Remote CI does not prove local reproduction. External service, authentication, cross-user isolation, deployment smoke, and manual screen-reader checks remain blocked/not applicable until supporting implementation/environment exists.

## Release criteria

All P0 tests pass on the candidate commit; no draft record yields definitive eligibility; no learner data leaves the browser; browser regression/accessibility automation passes; demo can start and reset; source limitations are visible; manual review and release evidence are recorded. Production readiness is out of scope.
