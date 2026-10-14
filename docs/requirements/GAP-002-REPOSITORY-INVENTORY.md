# GAP-002 — Repository Inventory and Runtime/Privacy Evidence

**Status:** Inventory baseline prepared from the connected GitHub repository view and existing project records. **GAP-002 remains OPEN.** This is not a full recursive checkout inventory, a privacy assurance, or proof that application/runtime code is absent from every branch or external system.
**Date:** 2026-10-14
**Repository:** https://github.com/s1xte3n/studypath-sa
**Default branch:** `main`
**Visibility:** Private
**Scope:** Locate all repository surfaces that could implement, transmit, persist, log, observe, build, deploy, or expose learner profile data; identify evidence needed to verify the approved browser-memory-only boundary.

## 1. Executive finding

The connected repository evidence and the owner's subsequent local `git ls-files` output support a documentation-led project state. The root `README.md` contains only the project title and one-line description. Repository metadata reports private visibility, default branch `main`, and repository size 417 KB. The owner-supplied tracked-file list contains project artifacts predominantly under `docs/project/`, `docs/product/`, `docs/architecture/`, and `docs/requirements/`, plus repository guidance and one contract test.

No application entry point, package manifest, frontend source, API implementation, test runner configuration, CI workflow, deployment configuration, Terraform, database migration, or Azure Function implementation was verified through the available repository file lookups. This must be stated as **not found/not verified**, not as proof those files do not exist. The GitHub connection could fetch known files but did not expose a recursive private-repository tree in this review; GitHub code search returned no indexed matches. The owner-supplied local `git ls-files`, branch, tag, and history output is now recorded in §3.3 as the available tracked-tree inventory evidence.

The owner supplied the full command output reproduced in §3.3 (not independently reproduced by this assistant). `git status` reports `## main...origin/main` with no listed working-tree changes. Local `main` and `origin/main` both point to `8da1dcf97d14276b4e4cad010168dfd13b87cca7`; latest commit is dated `2026-10-14T20:01:24+02:00`, subject `docs: record approved conservative rule interpretations`. Listed refs are local `main`, `origin/HEAD -> origin/main`, `origin/main`, remote `origin/docs/gap002-repository-inventory` at `0546ca53479674488f866e77c0da353a19bcf7f7`, and remote `origin/docs/phase-0-project-state` at `bab0a2127f71bf4415e376c4a646bcabe5a5e9b7`. `git tag --list` returned no tag names. The supplied tracked-file list contains the subject catalogue contract test and no listed app source, package manifest, lockfile, API/function implementation, CI workflow, or infrastructure/deployment file. This materially completes the tracked-file inventory for the reported local clone, but remains owner-supplied evidence.

## 2. Approved privacy and runtime boundary

The approved interim architecture in `docs/architecture/ARCHITECTURE.md` and decision D-044 requires:

- Learner marks, subjects, interests, profile inputs, match results, and tracker entries remain in browser memory only.
- Never send learner values to an API, URL/query string, analytics, application logs, client error reports/telemetry, or unrelated third-party endpoint.
- Do not persist these values in `localStorage`, `sessionStorage`, IndexedDB, cookies, database, Blob Storage, or cross-session/cloud sync.
- APIs, if implemented, may serve public curated programme/funding records and provenance only. Matching remains client-side pending the unresolved runtime/API feasibility decision.
- No accounts, profile persistence, uploads, AI document assistant, or application submission are approved for this MVP.
- Reset must clear temporary input/results; leaving/reloading ends exploration without app-controlled restoration.
- Use synthetic data for development/demo. Real learner data remains prohibited until the applicable privacy/legal review and implementation verification are complete.
- Hosting/access/security providers may collect technical metadata such as IP/browser information; actual hosting configuration and provider retention must be reviewed and reflected accurately in a privacy notice before public use.

These are approved design requirements, **not verified runtime behaviour**.

## 3. Repository inventory — evidence register

Evidence labels:
- **Verified file:** fetched from `main` through the connected GitHub integration.
- **Recorded in index/status:** path is listed by an existing repository artifact index/status record, but not all such files were individually fetched in this pass.
- **Owner-supplied:** the owner previously supplied command output or described local state; not independently reproduced here.
- **Not found/not verified:** direct lookup or available search did not establish a file/implementation. This is not proof of absence from every branch or external deployment.

### 3.1 Root and project metadata

| Surface | Current evidence | GAP-002 significance | Required follow-up |
|---|---|---|---|
| `README.md` | **Verified file**; title and one-line project description only | No architecture/runtime/privacy instructions currently visible in the README | Keep it as a pointer to source-of-truth docs once implementation begins |
| `package.json` and lockfiles | **Not found/not verified**; direct lookup for `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock` did not establish them | Cannot establish frontend/backend dependencies, scripts, SDKs, telemetry packages, or test commands | Inspect `git ls-files`, then package manifests and dependency lockfiles |
| Frontend entry/config (`index.html`, `src/**`, `vite.config.*`) | **Not found/not verified** in direct lookups/search | No runtime boundary or browser-memory behaviour can be inspected | Inventory all source files and identify all network/storage/logging imports |
| API/backend entry points | **Not found/not verified**; no confirmed API implementation | Cannot verify that request schemas exclude learner values or that APIs only return public catalogue data | Inspect every route/handler and prove request/response data-flow boundaries |
| CI/test configuration | **Not found/not verified**; repository search returned no indexed workflow/test matches; package manifest unavailable | No reproducible CI result or security/privacy regression gate established | Inspect `.github/workflows/**`, test configs, scripts, status checks, and branch rules |
| Infrastructure/deployment | **Not found/not verified**: no confirmed Terraform, Azure Functions, Static Web Apps, API Management, or deployment manifests | No deployed configuration, headers, logs, environment variables, resource permissions, or telemetry setup to audit | Inspect all IaC/workflow/config files; compare against Azure portal only after explicit scoped review |
| Secrets/environment files | Not exhaustively inventoried | Cannot claim secret scanning or environment hygiene | List tracked dotfiles and config templates; scan for committed secrets without printing secret values; never fetch or expose secret values |
| Git history/branches | Repository metadata and recent commits/PRs inspected; branch search returned `main` only in the available result page | Does not establish all historical branches/tags/releases or external copies | Owner to run branch/tag/remote inventory locally; inspect current and relevant history for deleted source/config |

### 3.2 Verified documentation and known repository artifacts

The following files were directly fetched from `main` in this review unless otherwise marked.

| Path | Evidence | Relevance to GAP-002 |
|---|---|---|
| `docs/project/PROJECT-STATUS.md` | Verified file | Records project state, owner-supplied local inventory, no-deployment claim, and open privacy/runtime gaps |
| `docs/project/ARTIFACT-INDEX.md` | Verified file | Lists documented artifacts and prior repository-state evidence; contains historical sections that may be stale relative to later changes |
| `docs/project/PROJECT-OVERVIEW.md` | Verified file | Product guardrails, anonymous-first scope, privacy expectations |
| `docs/project/PROJECT-CHARTER.md` | Verified file | Audience includes minors; product guardrails and initial exclusions |
| `docs/project/DECISIONS.md` | Verified file | D-026–D-030 and D-044 include input, eligibility, privacy, and API-first boundaries |
| `docs/project/OPEN-QUESTIONS.md` | Verified file | Tracks unresolved API/runtime/privacy feasibility and downstream evidence |
| `docs/requirements/REQUIREMENTS-MATRIX.md` | Verified file | Maps requirements to planned tests and records that implementation/runtime privacy are unverified |
| `docs/architecture/ARCHITECTURE.md` | Verified file | API-first decision and explicit browser-memory-only data boundary |
| `docs/architecture/API-CONTRACT.md` | Recorded in artifact index/status | Draft catalogue-only API contract; exact schemas/runtime remain pending. Must inspect the file before implementation |
| `docs/product/PRD.md` | Verified file | Approved product scope and privacy constraints; not implementation evidence |
| `docs/product/ACCEPTANCE-CRITERIA.md` | Verified file | Includes input validation/reset/privacy-related acceptance targets; criteria are not test results |
| `docs/product/SUBJECT-CATALOGUE-V1.md` | Verified file | Subject contract explicitly notes no learner values to catalogue API/telemetry and that runtime is unverified |
| `docs/product/SUBJECT-NORMALIZATION-CONTRACT.md` | Verified file | Draft contract; defines proposed normalized values and prohibits sending raw learner labels to API/telemetry |
| `docs/product/PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md` | Verified file | Catalogue/data provenance only; not a runtime privacy control |
| `docs/product/PROGRAMME-CATALOGUE-REGISTER.md` | Verified file | Public catalogue source records; catalogue only, not learner profiles |
| `docs/product/REQUIREMENTS.md`, `TRACEABILITY-MATRIX.md`, `FEATURE-BACKLOG.md`, `DEPENDENCY-MATRIX.md`, `REQUIREMENT-GAPS.md` | Recorded in artifact index/status | Requirements and planned traceability; verify current versions and consistency before using as implementation evidence |
| `docs/product/UJ-2027-SOURCE-RECONCILIATION-MATRIX.md`, `UJ-2027-RULE-RECONCILIATION-UPDATE.md`, `UJ-2027-CURATOR-REVIEW-PACK.md` | Some verified in prior project work; curator pack now records owner approval | Admission data only; no proof of runtime privacy |
| `docs/product/SUBJECT-CATALOGUE-V1-APPROVAL.md` | Recorded in recent project history/status | Owner-approved subject contract decision; application integration remains unverified |
| `docs/project/PHASE0-ONLINE-EVIDENCE.md`, `PROJECT-READY-EVIDENCE.md`, `MASTER-PROJECT-CHECKLIST.md`, `DECISIONS.md`, `OPEN-QUESTIONS.md`, `PROJECT-CHARTER.md` | Recorded in artifact index/status; some individually fetched | Planning and owner-attested readiness evidence, not runtime evidence |

The supplied files `SPEC-1-StudyPath-SA.txt`, `FNB AOTY Hackathon 2026 - Programme.pdf`, and `Standard_Project_Operating_Procedure_Software_Development_Final.docx` are project conversation attachments and are recorded as **not yet stored in the repository** by `ARTIFACT-INDEX.md`.

### 3.3 Local tracked-tree, refs and non-documentation history (owner-supplied)

The owner supplied the requested command output. It is recorded as owner-supplied evidence rather than an independently reproduced checkout:

- Working tree/status: `## main...origin/main`; no changed-file entries were shown.
- Local `main` and `origin/main`: `8da1dcf97d14276b4e4cad010168dfd13b87cca7`.
- Latest commit: `2026-10-14T20:01:24+02:00`, `docs: record approved conservative rule interpretations`.
- Listed refs: local `main`; `origin/HEAD -> origin/main`; `origin/main`; `origin/docs/gap002-repository-inventory` at `0546ca53479674488f866e77c0da353a19bcf7f7`; and `origin/docs/phase-0-project-state` at `bab0a2127f71bf4415e376c4a646bcabe5a5e9b7`.
- Tags: no tag names were printed.
- Tracked paths: the output enumerates the tracked file paths under `.gitignore`, `CONTRIBUTING.md`, `SECURITY.md`, `README.md`, project documentation, and `tests/contracts/subject-catalogue-v1.test.mjs`. No `package.json`, lockfile, application source tree, API/function implementation, `.github/workflows` entry, infrastructure file, or deployment configuration appears in the supplied list.
- Non-documentation history: the supplied `git log --all --name-status ... -- . ':!docs'` shows additions for `tests/contracts/subject-catalogue-v1.test.mjs`, `SECURITY.md`, `CONTRIBUTING.md`, `.gitignore`, and `README.md`; it does not show application source/configuration in the displayed history.
- The inventory branch is listed as a remote ref, but the local branch list supplied contains only local `main`. The branch ref exists remotely; this transcript does not prove it has been checked out or merged.

**Inventory conclusion:** the supplied tracked-file inventory is complete for the owner's reported local checkout at the stated commit, subject to the normal limits of a command transcript and the branches/history actually fetched locally. The evidence supports that this checkout is documentation-led and has one contract test, not a verified runnable application. It does not rule out untracked local files, other remote branches not fetched, external copies, or resources outside Git.

### 3.4 Tests and test evidence

| Item | Evidence | Interpretation |
|---|---|---|
| `tests/contracts/subject-catalogue-v1.test.mjs` | Referenced by the requirements matrix; owner supplied output reporting 12 passed / 0 failed on 2026-10-14 | The output is owner-supplied; it was not independently reproduced in this inventory task. Test file presence, script wiring, and CI execution remain to be checked from a complete tree |
| Privacy tests | Not verified | Need tests that fail if learner values enter network requests, URLs, storage, console/application logs, telemetry, error reporting, or unexpected third-party calls |
| Reset/unload tests | Acceptance targets exist; execution not verified | Need browser-level checks that Reset clears state and reload/close does not restore learner inputs/results |
| API contract tests | Not verified | Need tests asserting requests contain no learner profile fields and API responses are public catalogue data only |
| CI result | Not verified | Need a workflow run tied to the exact commit, with test results and security checks |

## 4. Required full-tree inventory procedure

The connected GitHub view in this task did not return a recursive tree for the private repository, and GitHub code search returned no indexed results. To finish the **full repository inventory**, run these commands in the existing local clone from its repository root. They only read state and write inventory output under `/tmp`; they do not modify tracked files.

```bash
git status --short --branch
git remote -v
git branch --all --verbose --no-abbrev
git tag --list
git log -1 --format='%H%n%ad%n%s' --date=iso-strict
git ls-files
git ls-files | sort > /tmp/studypath-tracked-files.txt
git ls-files | grep -E '(^|/)(package\.json|[^/]*lock[^/]*|vite\.config\.[^/]+|index\.html|host\.json|function\.json|staticwebapp\.config\.json|Dockerfile|docker-compose[^/]*|terraform\.tf|.*\.tf|.*\.ya?ml|.*\.json|.*\.env.*)$' || true
git ls-files | grep -E '(^|/)(src|app|api|functions|tests?|e2e|infra|infrastructure|terraform|\.github/workflows)(/|$)' || true
git log --all --name-status --format='commit %H %ad %s' --date=short -- . ':!docs'
```

Share the **non-secret** output of the tracked-file, branch/tag, and recent-history commands. Do not share access tokens, environment values, connection strings, personal learner data, or unredacted secret-scanner output. If a secret scanner reports a finding, share only the file path, finding type, and redacted status.

After that tree is available, enumerate every source/config file that can:
1. accept or transform learner input;
2. compute/display eligibility or pathway results;
3. initiate network requests or construct URLs;
4. write browser storage/cookies or server-side persistence;
5. emit console output, logs, traces, analytics, error reports, or telemetry;
6. configure API routes, CORS, headers, caches, authentication, hosting, environment variables, deployment, or third-party providers;
7. run tests, linting, builds, dependency/security scans, and CI/CD.

## 5. GAP-002 evidence checklist

- [ ] Full tracked-file inventory from local clone and current `main` SHA recorded.
- [ ] All relevant source/config files reviewed; no unexplained implementation surfaces.
- [ ] Dependency and lockfile inventory completed; network/storage/telemetry SDKs identified.
- [ ] All outbound network calls mapped by destination, method, payload and purpose; demonstrate no learner input/result/tracker value leaves browser memory.
- [ ] All browser/server storage and cookie use inventoried; prove learner data is not persisted.
- [ ] Console, server logs, client error reporting, analytics, traces and telemetry reviewed with synthetic sentinel values.
- [ ] API handlers/contracts reviewed; public catalogue-only API boundary verified.
- [ ] Build/deploy workflows, environment variables, hosting metadata, caching, CORS, headers and provider retention reviewed.
- [ ] Automated privacy regression tests added and run; include negative assertions on fetch/XHR/beacon/WebSocket, URL, storage and logging paths where relevant to the actual implementation.
- [ ] Current CI results linked to the reviewed commit; failures/blockers recorded.
- [ ] Privacy notice reflects verified hosting/provider metadata and retention; applicable legal/privacy review status recorded before public learner use.
- [ ] Independent reviewer sought before public use; if unavailable, record the single-owner review limitation.

## 6. Gate disposition

**Tracked repository inventory: COMPLETE for the owner-reported local checkout at `8da1dcf97d14276b4e4cad010168dfd13b87cca7` (owner-supplied evidence). GAP-002 overall: OPEN — runtime/privacy verification remains blocked.**

Reason: the supplied tree materially completes the tracked-file inventory for the reported local checkout and indicates no tracked runnable application, package manifest, CI workflow, or infrastructure/deployment configuration. Consequently, runtime data flow, browser storage behaviour, provider telemetry, deployed configuration, and CI controls cannot currently be verified from the listed tracked files. The repository baseline SHA supplied by the owner (`9271da47bb93aee5e2f0dbdfc6b8fea41feae5c1`) differs from the earlier PR #46 base SHA; reconcile this against current `main` before merging this documentation update.

No application code, tests, configuration, cloud resource, or deployment was changed or executed by this inventory preparation. Next actions: review and merge the inventory documentation update only after checking its current diff/base; independently reproduce the local inventory when access permits; retain GAP-002 as open for runtime/privacy until an implementation exists and the required negative tests, configuration review and CI evidence are available. Do not mark privacy verified without implementation and execution evidence.


## 7. Owner-supplied local inventory follow-up

The command transcript supplied in the project conversation has been incorporated above. It is a useful inventory artifact, but it is not a signed CI run, an independently reproduced checkout, or proof of deployed state. Keep the distinction between (a) tracked repository inventory, now supported by the supplied `git ls-files` list, and (b) runtime privacy assurance, which remains unverified.


## Follow-up — implementation baseline and privacy verification plan (2026-10-14)

See [`GAP-002-PRIVACY-VERIFICATION-PLAN.md`](GAP-002-PRIVACY-VERIFICATION-PLAN.md) for the proposed minimum runnable browser-only baseline, sink inventory, synthetic sentinel strategy, 12 required negative/privacy tests, execution procedure and gate. The key outcome is unchanged: runtime privacy is not verifiable until runnable application code and an observable test harness exist. GAP-002 remains open.
