# Owner-supplied local verification — 2026-10-24

## Scope and provenance

This record transcribes terminal results supplied by the project owner in the StudyPath SA project conversation. The assistant did not execute these commands and cannot independently verify the local machine, checkout, or terminal session.

**Repository:** [s1xte3n/studypath-sa](https://github.com/s1xte3n/studypath-sa)  
**Latest remote `main` baseline used for this documentation change:** [`a840137e99f2ffc8af3d96f8f90eb8f4cfefda1f`](https://github.com/s1xte3n/studypath-sa/commit/a840137e99f2ffc8af3d96f8f90eb8f4cfefda1f), merge commit for PR #212.  
**Exact local test HEAD:** not captured in the supplied terminal output; therefore these results must not be represented as independently tied to that SHA.

## Final clean verification reported by the owner

The owner stopped the separately running development server, then reran the verification sequence:

| Command | Reported result | Status |
| --- | --- | --- |
| `npm test` | 100 passed, 0 failed; duration 1241.1265 ms | PASS (owner-reported) |
| `npm run build` | Vite 7.3.7; 35 modules transformed; build succeeded in 2.44 s | PASS (owner-reported) |
| `npx playwright test` | 34 passed, 0 failed; default four-worker run completed in 47.8 s | PASS (owner-reported) |

Reported production build artifacts:
- `dist/index.html` — 0.62 kB (gzip 0.37 kB)
- `dist/assets/index-BI7pUvUH.css` — 23.40 kB (gzip 5.32 kB)
- `dist/assets/index-BcF3W2KH.js` — 313.30 kB (gzip 86.81 kB)

The owner also reported an earlier serial Playwright run with 34/34 passing (57.3 s), a second serial run with 34/34 passing (58.5 s), and eight targeted tests passing with `--workers=1`.

## Initial transient failure and disposition

An initial `npx playwright test` run, while a separate `npm run dev` server was still running, reported 30/34 passing and four failures involving missing `#stage` or profile-completeness progressbar elements. The eight targeted tests then passed serially. After the separate dev server was stopped, the complete suite passed with both serial and default four-worker execution.

**Interpretation:** the final reruns are green in the owner-supplied output. The cause of the initial failures is not established; do not label it definitively as a port conflict or application defect without further evidence. No application code change was reported as part of this rerun.

## Evidence boundaries and remaining work

- These are owner-supplied local results, not execution by the assistant and not GitHub Actions results.
- The local checkout's exact tested commit SHA and `git status` output were not captured in the supplied results.
- Current-commit GitHub Actions were not checked as part of this local verification record.
- Manual keyboard walkthrough, screen-reader review, physical-device/browser-matrix checks, and hosting/provider logs plus external telemetry review remain unverified unless separately evidenced.
- Passing automated tests and build does not establish production readiness, full privacy/legal review, official catalogue approval, or release acceptance.

**Gate disposition:** issue #185 remains open for outstanding manual/privacy evidence. `G-SYN-001` remains **OPEN / NOT PASSED** until its full acceptance evidence and approvals are recorded. Continue using synthetic data only; no deployment, cloud provisioning, or production-readiness claim is implied.
