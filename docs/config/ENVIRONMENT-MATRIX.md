# Environment Matrix — Hackathon MVP

| Environment | Status / purpose | Configuration | Data | Identity / secrets | Network and permissions | Readiness evidence |
|---|---|---|---|---|---|---|
| Local development | Intended supported target; local run not independently verified here | Node.js/npm and repository files; no app env file required by inspected source | Draft catalogue and synthetic learner inputs | No app secrets or sign-in | Browser-only matching; no learner-data API calls intended | npm ci, npm test, npm run build, browser E2E |
| CI | Workflows exist | Workflow Node.js version and lockfile | Synthetic fixtures | No app secrets identified in inspected browser workflow | No deployment permission needed for browser checks | Workflow results on exact PR head |
| Automated test | Supported via Node test runner; Playwright via existing workflow | Test files, fixtures, browser runner | Synthetic data only | No live credentials | No production target | Unit and E2E results |
| Development deployment | Not verified or authorized | Not established | No real learner data | Not established | No provisioning/deployment authorized | Blocked pending approval |
| Staging | Not verified | Not established | Production data prohibited | Not established | No deployment authorized | Not applicable until provisioned |
| Production | Project status says not deployed; not authorized | Not established | Real learner data prohibited until gates pass | No identity/secret configuration claimed | No deployment authorized | Release gates not passed |

The documented Azure architecture is a target design, not evidence that services exist. Do not create resources or incur costs in this phase.
