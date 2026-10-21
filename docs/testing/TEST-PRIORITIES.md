# Test Priorities and Execution Order

- **P0:** release-blocking correctness, privacy, security, core journey and data-integrity failures.
- **P1:** important MVP functionality and contract/error handling.
- **P2:** secondary robustness and edge coverage.
- **P3:** deferred production hardening.

Execution order:
1. npm ci --no-audit --no-fund and inspect secret/configuration changes.
2. npm test — domain, fixture and contract tests.
3. npm run build.
4. Existing Playwright E2E/privacy/accessibility workflow.
5. Confirm draft catalogue returns UNKNOWN for all learner-facing programme cards.
6. Manual keyboard and screen-reader-oriented review.
7. Hosted API/security/deployment checks only after a runtime is approved and exists.

P0 correctness, privacy, reset and build checks must pass before demo release. A blocked check is BLOCKED, not PASS.
