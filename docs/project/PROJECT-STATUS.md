# Current decision — catalogue approved for hackathon demo only (2026-10-24)

The project owner approved `docs/product/uj-2027-pilot-catalogue-draft.json` version `uj-2027-pilot-v0.3-hackathon-demo` as the source of truth for the bounded hackathon demo. All 30 programme records are individually `APPROVED_FOR_HACKATHON_DEMO_ONLY` by the project owner; this does not imply UJ endorsement or institutional curator sign-off. The definitive-screening gate remains closed, and unresolved eligibility must remain `UNKNOWN`.

PR #211 remains open. Its reported checks are green for Browser E2E/privacy/accessibility, Browser MVP build, contract tests, UJ eligibility golden-case verification and GitGuardian; Vercel failed only because its deployment was rate-limited and is no longer a required hosting target. Vercel deployment must be disabled at the Vercel/GitHub integration level; no repository workflow currently manages that external check.

---

# APS issue #189 — fail-closed acceptance update (2026-10-24)

**Reviewed base:** `main` at `a48eb653cabae511c60d9a49043ff6a2532c2457`.  
**Candidate branch:** `fix/189-aps-fail-closed-selection`.  
**Decision:** the current issue acceptance contract requires exactly six supported non-Life-Orientation subjects for a provisional total. Fewer or more than six must return `UNKNOWN`; no automatic subset selection or programme-required-subject inclusion is allowed until the applicable official rule is verified, versioned and curator-reviewed.

**Candidate changes:** calculator and tests updated; learner-facing limitation text updated; browser regression changed to expect `UNKNOWN` for more than six eligible subjects. Relevant paths: `src/domain/eligibility/provisional-aps.mjs`, `src/main.jsx`, `tests/provisional-aps.test.mjs`, `tests/e2e/student-form.spec.mjs`.

**Verification:** files have been committed to the candidate branch through GitHub contents operations. The assistant has not run tests or a build locally. Candidate CI has not yet been verified. Do not mark issue #189 complete or claim these changes pass until workflows run on the exact PR head.

**Source/curator gate:** `docs/project/UJ-2027-CATALOGUE-EVIDENCE-AUDIT.md` now reports 30 records approved for hackathon demo and zero institutional curator sign-offs; governing source-version confirmation, complete rule/footnote verification and curator sign-off remain outstanding. Programme eligibility must remain `UNKNOWN`; G-SYN-001 remains **OPEN / NOT PASSED**. No deployment, provisioning or real learner data is authorized.

---

# Cross-screen regression update — issue #185 (2026-10-24)

**Reviewed `main` baseline:** `82b60fac1476192c66082aa8b1ff2b1fd25a34be` ([commit](https://github.com/s1xte3n/studypath-sa/commit/82b60fac1476192c66082aa8b1ff2b1fd25a34be)). This is the repository's latest commit confirmed before this branch was created.

**Scripts confirmed from `package.json`:**
- `npm test` → `node --test`
- `npm run build` → `vite build`
- `npx playwright test` runs the Playwright browser suite separately; `playwright.config.mjs` starts the Vite dev server at `127.0.0.1:4173`.

**Targeted changes on branch `test/185-filter-empty-state-regression`:**
- Added a Playwright scenario for the all-`UNKNOWN` draft catalogue: selecting `ELIGIBLE` must show the recoverable no-match state, preserve the total candidate count, and show zero visible results; clearing filters must restore all 30 records as `UNKNOWN`.
- Added a keyboard test that opens pathway details with Enter and verifies the disclosure content is visible.
- Existing automated coverage already includes malformed/fractional/negative/blank/out-of-range marks, duplicate subjects, missing-stage association, 320px and desktop layout, light/dark axe scans, selected privacy channels, storage/reload/fresh-tab behavior, and shortlist/tracker reset.

**Verification state:** the changes are committed to this branch but no local test/build has been run by the assistant. CI for this branch is pending until a PR is opened. Do not mark either new test passed before CI reports its result.

**Still blocked/unverified:** manual keyboard walkthrough, screen-reader review, physical-device and browser-matrix checks, host/provider logs and external telemetry review. Automated instrumentation observes only the channels it instruments. The catalogue is approved for hackathon demo only and remains `DRAFT_NOT_FOR_DEFINITIVE_SCREENING` for definitive screening; G-SYN-001 remains **OPEN / NOT PASSED**. No deployment, provisioning or real learner data is authorized.

---

# Provisional APS calculator update — PR #189 implementation branch (2026-10-24)

**Candidate branch:** `feat/189-provisional-aps-calculator`, based on `main` commit `896a52d97bdfe14fdda0e20f14a51b276a594fb8`.

**Implemented on this branch; awaiting CI review:**
- `src/domain/eligibility/provisional-aps.mjs` adds a pure mark-to-level calculator using the bands retained in the draft UJ 2027 catalogue.
- The calculator returns a provisional total only for exactly six distinct non-Life-Orientation subjects; fewer subjects return UNKNOWN, and more than six eligible subjects return UNKNOWN without silently selecting a subset.
- `src/main.jsx` and `src/styles.css` show the included subject marks/levels, excluded Life Orientation, the official prospectus link, and source-review limitations.
- `tests/provisional-aps.test.mjs` covers mark boundaries, exact-six calculation, Life Orientation exclusion, insufficient/excess subjects, duplicates, invalid marks and draft-source disclosure.
- `tests/e2e/student-form.spec.mjs` adds browser coverage for visible explanation, source link, more-than-six guardrail and continued UNKNOWN eligibility.

**Source and rule limitation:** this is a *provisional* calculation based on the draft record, not a verified or official admission score. The retained catalogue explicitly says the more-than-six selection rule and programme-specific required-subject selection need resolution. The calculator therefore deliberately does not implement issue #189's original “select the six highest” acceptance wording until the official rule is reconciled and curator-approved. It does not change programme eligibility.

**Verification:** no local tests or build have been run by the assistant for this branch. GitHub Actions results are pending PR creation. Do not mark the issue complete until CI, accessibility/privacy regression and traceability evidence are reviewed. G-SYN-001 remains OPEN / NOT PASSED; no deployment, provisioning or real learner data is authorised.

---

# Local verification update — PR #197 merge (2026-10-24)

**Reviewed commit:** `2a424b1ab085f59384ad3d2a593d5af67fb4fe08`, merge of [PR #197](https://github.com/s1xte3n/studypath-sa/pull/197).

**Owner-supplied local verification on this commit:**
- `npm test`: 86 passed, 0 failed, 0 skipped.
- `npx playwright test`: 31 passed, 0 failed.
- `npm run build`: passed with Vite 7.3.7.
- `git status -sb`: `main...origin/main`; working tree clean and branch aligned with `origin/main`.

These are terminal results supplied by the project owner; the assistant did not execute the commands locally. They verify the reported automated test/build results only. Physical-device testing, manual keyboard and screen-reader review, browser-matrix review, provider/hosting logs and a full external telemetry audit remain unverified. The browser network instrumentation observes only its instrumented channels.

**Gate disposition: G-SYN-001 remains OPEN / NOT PASSED.** The UJ 2027 catalogue remains `DRAFT_NOT_FOR_DEFINITIVE_SCREENING`; authoritative source-file verification, full rule reconciliation and curator sign-off are still outstanding. Full privacy/hosting review, manual accessibility evidence and criterion-by-criterion release evidence reconciliation remain open. No deployment, provisioning, paid services or real learner-data use is authorized.

---

# Cross-screen quality review — PR #193 baseline (2026-10-24)

**Reviewed main commit:** `d027fe6efab3c4c746ad79de03284ddf3d6cca91`. The branch-level review inspected `package.json`, `playwright.config.mjs`, `src/main.jsx`, `src/styles.css`, `src/domain/student-input-validation.mjs`, `tests/e2e/student-form.spec.mjs`, `tests/e2e/shortlist-tracker.spec.mjs`, and the browser E2E workflow.

**Actual scripts:** `npm test` runs `node --test`; `npm run build` runs `vite build`; Playwright is run separately with `npx playwright test`. The browser CI workflow installs Chromium, runs unit/contract tests, Playwright, then a production build.

**Existing automated coverage observed in source:** valid and invalid journey, all-draft-catalogue UNKNOWN disclosure, reset, result detail/source links, field-level mark/subject validation, selected privacy channels and browser storage, reload/fresh-tab behavior, shortlist/tracker reset, keyboard focus, 320px layout, axe critical/serious scans in light/dark themes, and dark-theme contrast checks.

**Targeted gaps added on branch `test/185-cross-screen-regression-coverage`:** browser tests for fractional/negative/blank/over-range marks, duplicate subjects, missing-stage field association, and desktop viewport overflow while rendering results. These are proposed until CI runs on the PR head.

**Not verified by source review:** no local `npm test`, Playwright, or build was executed by this assistant; no physical-device test, manual keyboard walkthrough, screen-reader review, browser-matrix review, provider/hosting log inspection, or full external telemetry audit was performed. The E2E network instrumentation only observes the channels instrumented by the tests. Report those as unrun/blocked, not passed.

**Gate remains OPEN / NOT PASSED.** Catalogue publication and curator sign-off remain blocked. No hosting enablement, deployment, provisioning, or real learner data is approved.

---

# Post-merge reconciliation — PR #192 (2026-10-24)

**Verified main commit:** `8cb0a0c66a326484b4f158e61eadddcb792c2cbb`, merge of [PR #192](https://github.com/s1xte3n/studypath-sa/pull/192). This section supersedes the earlier top-level statements below that describe the catalogue gate as proposed, unmerged, or awaiting CI.

**Merged implementation:** `src/domain/eligibility/catalogue-publication-gate.mjs`, adapter integration in `src/domain/pathway-matching.mjs`, gate tests, and `docs/project/UJ-2027-CATALOGUE-EVIDENCE-AUDIT.md`.

**Owner-supplied exact-commit CI evidence:** Contract tests [#287](https://github.com/s1xte3n/studypath-sa/actions/runs/40095802263), UJ eligibility golden-case verification [#125](https://github.com/s1xte3n/studypath-sa/actions/runs/40095802269), Browser E2E/privacy/accessibility [#184](https://github.com/s1xte3n/studypath-sa/actions/runs/40095802279), and Browser MVP build [#190](https://github.com/s1xte3n/studypath-sa/actions/runs/40095802289) completed successfully on `8cb0a0c`. The preview workflow [#10](https://github.com/s1xte3n/studypath-sa/actions/runs/40095802294) completed; this alone does not prove its deployment step ran or that a public release is approved.

**Still blocking:** the 2027 UJ catalogue remains `DRAFT_NOT_FOR_DEFINITIVE_SCREENING` with zero curator-approved programme records in the audited draft. Official PDF hashes/visual inspection, competing source reconciliation, rule interpretation, and human curator sign-off have not been evidenced. The fail-closed gate's structural synthetic fixture is not real catalogue approval. G-SYN-001 remains **NOT PASSED** pending the full criterion-by-criterion evidence review and outstanding privacy/accessibility/reproducibility checks. No Azure provisioning or production deployment is implied.

---

# Current catalogue-gate work — 2026-10-24

**Base commit inspected:** `91ed42b4ca451ab0d9a12ccf63b73d541585b45d` on `main`. Work is proposed on branch `feat/187-fail-closed-catalogue-gate`; it has not been merged or deployed.

**Catalogue baseline:** `uj-2027-pilot-v0.2-draft`, status `DRAFT_NOT_FOR_DEFINITIVE_SCREENING`; 30 programme records, 30 `DRAFT`, 0 `APPROVED`; 7 records explicitly have `curatorSignoff: null`, and 23 omit that property. Two official-source records are retained. Source-version approval and curator sign-off remain outstanding.

**Changes proposed in this branch:**
- Add `src/domain/eligibility/catalogue-publication-gate.mjs` to enforce explicit catalogue/source approval, source version/date/checksum/inspection evidence, official UJ HTTPS URLs, unique IDs, programme approval, named/date/scope/evidence curator sign-off, resolved rules, and exact printed-page references.
- Integrate the gate into `src/domain/pathway-matching.mjs`. Any failed gate returns learner-facing `UNKNOWN` with `CATALOGUE_PUBLICATION_GATE_FAILED`, even if the catalogue-level status is manually changed.
- Add automated tests for the current draft, missing catalogue/provenance/sign-off, invalid source/date/page references, forged approval flags, adapter fail-closed behavior, and a clearly synthetic structural fixture.
- Add `docs/project/UJ-2027-CATALOGUE-EVIDENCE-AUDIT.md` with the inspected baseline and record-by-record unresolved evidence summary.

**Source verification limits:** This work uses catalogue metadata already in Git. It does not independently download or hash the official PDFs, compare competing prospectus versions, visually verify every table/footnote, resolve English stream mapping or APS selection rules, or obtain human curator approval. The structural test fixture is synthetic and is not real approval.

**Verification status:** The GitHub connector was used to create/update branch files. No local checkout, `npm test`, build, browser suite, or CI run was executed by this assistant for this branch. The proposed changes require review and CI. G-SYN-001 remains **NOT PASSED**; no deployment or publication is authorized.

---

## PR #176 merged — 2026-10-24

**Verified main commit:** `0eafef65f42c10255ba6e307e6648ee822761a30` (merge of PR #176).

- Theme toggle and dark-theme styles are merged.
- Dark-theme footer wordmark contrast override is included.
- Owner-reported successful CI on the merge commit: Contract tests #258, Browser MVP build #161, UJ eligibility golden-case #108, and Browser E2E/privacy/accessibility #155.
- These workflow results are evidence for this commit; they do not establish production readiness or completion of the broader target UX.
- The target experience remains documented in `docs/product/END-PRODUCT-UX-VISION.md`; perform a code-to-acceptance-criteria gap analysis before choosing the next implementation slice.
- Local Playwright execution was not performed by this assistant. The project owner supplied a failing local/CI test output before the CSS correction; the merged-commit browser workflow subsequently passed.

---

## Earlier repair notes — 2026-10-24

**Main baseline inspected:** `268d6f03322f82b7c47a3ddf0598e067880a73a1` (PR #175, `v0/uj-fnb-purple-theme`). The merge diff removed the theme toggle and its dark-theme CSS that had been introduced by PR #174. The browser accessibility check reported a contrast ratio of 4.07:1 for `#0876c9` text on `#f1ecf8`, below the 4.5:1 WCAG AA threshold for normal text.

**Repair branch:** `fix/restore-theme-accessible-blue` (changes committed through GitHub API; pending PR/CI at the time of this note).

- Restore an accessible light/dark theme toggle with an initial OS-preference default and in-session override.
- Restore explicit dark-surface and supporting-text styles while retaining the purple-led design.
- Replace the interaction blue with `#0065A8`; calculated contrast is 5.28:1 on `#f1ecf8` and 6.13:1 on white. These are local mathematical checks, not a substitute for the browser accessibility scan.
- Extend the browser accessibility test to exercise the toggle and scan both themes.
- Record the requested end-product design baseline in `docs/product/END-PRODUCT-UX-VISION.md`.

**Historical verification note (superseded):** this note described the pre-merge state. PR #176 has since merged; see the current status section above. The broader end-product experience remains a target baseline and is not claimed fully implemented.

---
## Fresh-session demo and repository hygiene evidence — 2026-10-23

**Candidate commit under review:** `640bd1ade8ab274b49eb9b48999024ca5b43a334`. This evidence was supplied by the project owner in the project conversation; it is not an independent local inspection by the assistant.

**Manual browser journey — owner-reported PASS (8/8 checks):**
- Application opened from a fresh development-server session.
- Form showed placeholder selections and no prefilled learner marks.
- Invalid/incomplete input produced a clear validation message.
- Valid synthetic inputs produced expected pathway results and explanations.
- Draft UJ catalogue / non-definitive eligibility disclosure was visible.
- Official-source links were present and opened intended sources.
- Reset cleared learner inputs, validation messages and displayed results.
- At a 320px viewport, no horizontal overflow or blocking interaction issue was observed.

**Tracked-path filename screen — owner-supplied output:** `git ls-files` listed the tracked repository paths. The supplied PowerShell pattern scan returned no matches for environment files, secret/credential-named paths, common generated-output paths, or `.pem`, `.pfx`, and `.key` files. The supplied `.gitignore` excludes dependencies, build/test outputs, local environment files, common key formats, secret directories and local tooling output. This is a preliminary filename check only; it does not inspect file contents or Git history and does not establish that no secrets or personal data are present.

**Not evidenced by this report:** output of `git status --short` was not supplied; no clean working tree is asserted here. No manual screen-reader review is reported. Full privacy/hosting/provider-log and third-party telemetry review, UJ source provenance and curator sign-off remain open. A successful manual demo does not pass G-SYN-001.

**Next action:** complete content-level secret/data review without copying any sensitive values into issues, verify the working-tree state, record manual keyboard/screen-reader checks if available, and continue catalogue-curation and privacy evidence closure.

---

## Current implementation and gate reconciliation — 2026-10-22

The earlier status summary above remains the current exact-commit CI record; this section adds a source-level implementation reconciliation after inspecting `src/main.jsx`, `src/domain/pathway-matching.mjs`, `tests/pathway-matching.test.mjs`, `tests/e2e/student-form.spec.mjs`, and `docs/product/uj-2027-pilot-catalogue-draft.json`.

**Implemented in the local demo:** student stage and subject/mark entry, input validation, deterministic adapter-to-evaluator integration, in-memory pathway results, seven UJ 2027 pilot result cards, explicit UNKNOWN states, explanations/limitations, official-source links, draft-catalogue/no-guarantee disclosure, and reset. Browser tests cover the results journey, invalid inputs, selected privacy channels, reset, keyboard focus and 320px layout; adapter tests assert that draft-catalogue outcomes remain UNKNOWN even for strong marks.

**Still open:** G-SYN-001 remains **OPEN / NOT PASSED**. The catalogue is marked `DRAFT_NOT_FOR_DEFINITIVE_SCREENING`; source-version and rule interpretation issues and missing curator sign-off prohibit definitive eligibility claims. Current CI evidence is the three owner-supplied exact-commit workflow results listed above; no independent rerun is claimed. Manual accessibility/responsive review, a clean local verification record on the frozen candidate commit, complete privacy/hosting/provider review and requirement-level evidence audit remain outstanding. Funding matching and the application tracker are not implemented in the current UI. There is no verified hosted API runtime, Azure deployment, public release, or authorization to use real learner data.

**Next action:** finish the SYN-001–SYN-010 evidence table in `docs/project/G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md`, reconcile the requirement-level matrix, then freeze a candidate commit and perform a demo/release review. Do not mark the gate passed based on green CI or documentation edits alone.

---

# Current verification update — 2026-10-22

**Reviewed commit:** `aa43b783ecb97aa3dac8f1ed18ebe727e5231e41` on `main`. The project owner supplied terminal output confirming the local branch was `main`, synchronized with `origin/main`, `git status --short` was empty, and the current commit was `aa43b783ecb97aa3dac8f1ed18ebe727e5231e41`. This is owner-supplied local evidence.

**GitHub Actions on this exact commit — owner-supplied `gh run list --commit` output:**
- [Browser E2E, privacy and accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39681570939) — completed, success.
- [Contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39681570917) — completed, success.
- [Browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39681571109) — completed, success.

These results establish that the three listed workflows passed for this commit. They do not establish that every planned test/workflow ran, that the application is deployed, or that all requirements are implemented. The assistant has not independently rerun the workflows.

**Current disposition:** the exact-commit CI evidence gap for these three workflows is closed. Overall release remains **OPEN / NOT PASSED**. Preserve the local synthetic-only demo scope. The UJ 2027 catalogue remains `DRAFT_NOT_FOR_DEFINITIVE_SCREENING`; learner-facing eligibility remains `UNKNOWN` until verified rules, provenance, catalogue version and curator approval justify a stronger state. Azure provisioning, public deployment, paid services and real learner-data use remain unauthorized.

**Next gate:** reconcile traceability evidence against actual implementation and executed tests; prepare and verify the submission deck (maximum 10 slides), demo video (maximum 90 seconds), SSDLC fields and Lean Business Canvas; verify Sonke portal requirements and retain submission confirmation. Do not claim submission or release until evidence exists.

---

# StudyPath SA — Project Status


## Current verification update — 2026-10-21 (supersedes the older Phase 5–7 in-progress snapshot below)

**Reviewed repository state:** The project owner supplied local Git output showing branch `main`, synchronized with `origin/main`, at merge commit `0c4120864f51580e09f6588872cd78d404e91493` (PR #147). The owner also supplied local verification outputs; these are owner-reported evidence, not independently executed by this update.

**Local automated verification reported by the owner**
- `npm test`: 71 tests passed, 0 failed, 0 skipped.
- `npm run build`: passed using Vite 7.3.7.
- `npx playwright test --workers=1`: 11 browser tests passed.
- The initial parallel Playwright run had 10 passes and one timeout. The isolated timed-out test and subsequent serial suite passed; root cause of the initial timeout is not established.
- The owner reported manual passes for invalid-input validation, seven draft pathway candidates, all eligibility states remaining `UNKNOWN`, admissions disclosures and official-source links, reset behavior, no learner input/result restoration after reload, and keyboard navigation with visible focus.
- The owner reported a 320 CSS-pixel viewport check with `viewportWidth: 320`, `pageWidth: 320`, and `hasHorizontalOverflow: false`.

**Current disposition:** The local synthetic-only browser MVP has passed the owner-reported local automated checks and manual journey checks above. This supersedes the older statement in the historical Phase 5–7 snapshot that implementation/CI verification was pending. It does not rewrite the historical snapshot or establish that all CI workflows passed on the current merge commit.

**Still open / not passed**
1. G-SYN-001 and the overall release gate remain **OPEN / NOT PASSED** pending full requirement-to-test traceability and review of all required evidence.
2. The UJ 2027 catalogue is approved for bounded hackathon demo display but remains `DRAFT_NOT_FOR_DEFINITIVE_SCREENING`; all learner-facing eligibility results must remain `UNKNOWN` until source rules, catalogue version/provenance and curator approval support stronger conclusions.
3. The initial parallel Playwright timeout has no established root cause and should be monitored in CI; serial success is recorded without increasing timeouts or changing application behavior merely to mask it.
4. Local `test-results/` was reported as an untracked generated directory. The owner must remove generated artifacts if present and verify a clean working tree.
5. This update does not independently verify GitHub Actions on the exact current merge SHA, complete all Phase 0 inventory files, certify costs, pass hosted API/runtime controls, or verify cloud configuration.
6. Azure provisioning/deployment, paid services, public hosting, and real learner-data use remain unauthorized. Production security, privacy/legal, cost, provider-retention, abuse/rate-limit, catalogue publication, deployment, monitoring and rollback gates remain mandatory before hosted/public release.

**Next action:** remove local generated test artifacts if present; verify `git status` is clean on `main`; reconcile the remaining project documents and traceability; inspect CI results on the exact current commit; then perform the formal hackathon demo/release-gate review. No deployment or production-readiness claim is made.


**Status:** Architecture design/traceability passed on 2026-10-16. On 2026-10-21 the owner reprioritised delivery for the FNB hackathon: freeze a local synthetic-only React/Vite vertical slice first; production hardening follows after the event. The implementation baseline is proposed in `docs/project/HACKATHON-IMPLEMENTATION-BASELINE.md`; this is not evidence implementation has started. G-SYN-001 remains OPEN / NOT PASSED.  
**Phase 0 gate:** `PROJECT READY` — **PASSED for Phase 1 planning only**  
**Last completed gate:** `ARCHITECTURE READY` — **PASSED on 2026-10-16 for architecture design/traceability only**  
**Current delivery objective:** Hackathon implementation baseline review, then local browser-only implementation of the P0 student journey. The hosted API runtime profile, abuse controls, provider logging/retention, and R100/month cost certification remain blocked/deferred for post-hackathon hosted deployment; they do not block the local synthetic-only journey. Phase 4 hosted-runtime contract evidence is not passed by this scope decision.  
**Historical-note convention:** This file preserves dated status snapshots as an audit trail. Older statements that a PR was only proposed/on a branch, or that later checklist items were still open, describe the snapshot at that date; subsequent merged PRs and the latest Phase 2 audit note below supersede those statuses. The latest dated acceptance note and D-049 decision record are authoritative for the current gate; older snapshots remain historical.  
**Historical Phase 2 audit snapshot (2026-10-15; superseded by the acceptance note below):** PR #79 is merged at `f3fdc009f19600abc6830fd1af1752c1ff633149`. The follow-on branch `docs/phase-2-a4-a6-traceability-audit` records A4–A6 source/scope review, corrects the `AC-DET-007`, `REQ-AUTH-001`, `AC-NFR-001–005` and OR-019 summary mappings, and records the bidirectional ID audit and G-SYN-001 requirement mappings. At that snapshot, checklist items and overall owner acceptance remained pending. PR #80 subsequently merged the traceability audit, and D-049 records explicit owner acceptance on 2026-10-16; see the current Phase 2 acceptance note below. This audit branch's Contract tests workflow run [#54](https://github.com/s1xte3n/studypath-sa/actions/runs/38789226191) passed on head `fbe002e29f35fdbf97a46ada391fca520667e036`. PR #79's contract-test workflow passed on its PR head; no workflow result was returned for the merge commit. No app build, browser journey, runtime privacy, cloud provisioning, deployment or release is claimed.  
**Last updated:** 2026-10-18

## Current synthetic-only MVP evidence snapshot — 2026-10-18

Reviewed current `main` commit: `6c91b5f9eabbdd07316f92eac876c6f8f5cd41d4` (merge of PR #137).

- Four GitHub Actions workflows passed on this exact main commit: [browser E2E/privacy/accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39120290042), [browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39120290021), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39120290039), and [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/39120290056).
- PR #137 adds a 320px viewport automated regression check. It does not constitute manual accessibility or responsive verification.
- The OpenAPI validation workflow is path-filtered and was not triggered by PR #137's changes; no OpenAPI pass is claimed on this SHA.
- `src/main.jsx` still implements form entry, validation and reset only; it explicitly says pathway matching is not enabled. The deterministic evaluator is separate and not connected to the learner-facing flow.
- Selected browser privacy and lifecycle checks exist, but full failure-path coverage, external host/provider behavior and telemetry boundaries remain unverified.
- Remote CI success is not local reproduction. Local working-tree status and a clean local install/test/build remain unverified.
- G-SYN-001 remains **OPEN / NOT PASSED**. No Azure provisioning, deployment, paid service or real learner-data use is authorized.

## Historical synthetic-only MVP evidence snapshot — 2026-10-17

Reviewed current `main` commit: `6a6099f10f5957ef0e7e0c87fed058af172921f3`.

- Current artifacts include `package.json`/`package-lock.json`, React/Vite entry point `src/main.jsx`, responsive stylesheet `src/styles.css`, student input validation, a local catalogue handler, deterministic UJ evaluator/golden-case tests, Playwright browser tests, and five CI workflows.
- All five GitHub Actions workflows passed on the reviewed main commit: [browser E2E/privacy/accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654154), [browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654225), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654207), [OpenAPI validation](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654244), and [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/39045654276).
- Browser evidence covers basic form validation/reset, invalid-input announcements, a keyboard-focus assertion, selected no-transmission/no-persistence checks and an axe scan. It explicitly does not calculate an eligibility result from the basic form.
- The complete pathway-result journey and official next steps, comprehensive SYN-004 privacy-channel/failure coverage, tracker/result lifecycle verification, documented manual responsive/keyboard review, and complete publication-ready catalogue evidence remain outstanding.
- Remote CI results are not local reproduction. A local clone attempt was blocked by DNS resolution for `github.com`; no local test command is claimed to have run.
- G-SYN-001 remains **OPEN / NOT PASSED**. No Azure provisioning, deployment, paid service or real learner-data use is authorized by this status update.

## Verified repository state
- Repository: https://github.com/s1xte3n/studypath-sa
- Visibility: private; default branch: `main`.
- Connected GitHub integration reports admin, read and write permissions.
- Historical Phase 0 root listing contained `README.md` only; that early snapshot is superseded by the current repository evidence recorded in the 2026-10-17 synthetic-only MVP snapshot below.
- Phase 0 baseline documentation and accepted direction decisions are present in the project documentation.
- The PROJECT READY evidence pack and owner-confirmation update were merged through PRs #4 and #5.
- On 2026-10-14, the owner supplied Azure portal details stating that the `StudyPath SA` subscription is Active, the owner role is Owner, the plan is Azure Plan, and no costs exist. These details are owner-attested; subscription identifiers are intentionally excluded from the repository. Billing scope/date range and redacted portal evidence have not been independently reviewed.
- Added `docs/project/PHASE0-RESOLUTION-PROPOSAL.md` and `docs/project/PHASE0-ONLINE-EVIDENCE.md`. Official UJ programme pages and Microsoft Static Web Apps pricing/quota sources were checked online. The owner approved all six decision records and attests the account-specific checks are complete. PROJECT READY is passed for Phase 1 PRD/planning only; account-specific evidence remains owner-attested rather than independently inspected.
- Local repository verification was supplied by the project owner on 2026-10-14: path `Sixteen/Desktop/Projects/studypath-sa`, branch `main`, HEAD `3a8f17e44c9c2f079b8ce71e14eebd56519cb52e`, `git status` clean, local branch up to date with `origin/main`, and `git rev-list --left-right --count main...origin/main` returned `0 0`. The tracked-file listing supplied for this check contains repository guidance and `docs/project/` files; it does not list application source, a package manifest, tests or CI workflow. This is owner-supplied command output, not a direct inspection of the local filesystem by the assistant.

## Product direction update — 2026-10-15

The owner selected tiered matching: anonymous users use a public catalogue API with client-side matching; logged-in users are intended to use authenticated server-side matching and may later receive account-gated features. Recorded as D-045 and reflected in the draft architecture/API contract on branch `docs/login-tiered-matching-change-control`. This is a documentation/change-control proposal only. Authentication, profile transmission, persistence, feature-specific data lifecycle, privacy/security approval, cost verification, implementation, CI and deployment are not complete. Q-018 remains open for architecture/security/cost gates; Q-020 requires the logged-in special features and data lifecycle to be defined. No Azure provisioning or real learner-data use is authorized.

## Q-020 gate-closure work — 2026-10-15

Prepared a review/decision pack on branch `docs/q020-gate-closure-proposal`: `Q020-DECISION-PACK.md`, `Q020-PRIVACY-LEGAL-AGE-REVIEW.md`, `Q020-ARCHITECTURE-THREAT-MODEL.md`, and `Q020-COST-AND-TEST-READINESS.md`. These are proposals/checklists, not proof that the gates have passed. The recommended session design is Entra External ID candidate + OIDC authorization code with PKCE and memory-only token cache. The authenticated service stack is still unpriced; the R100/month cap is not demonstrated for it. A qualified South African privacy/legal review is still required before real learner data. No implementation, provisioning, production identity configuration or deployment is authorized.

## State by area

| Area | Status |
|---|---|
| Product specification, hackathon programme, development SOP | Supplied project references; hackathon programme reviewed and online evidence logged |
| Documented React/Vite + Azure stack | Owner-confirmed baseline; not provisioned/validated |
| Application source and dependencies | Current React/Vite scaffold, package manifest/lockfile, input validation and local catalogue handler are present; full learner pathway journey remains incomplete |
| Tests and CI workflows | Browser, contract, OpenAPI and eligibility tests/workflows are present; five main-commit workflows passed remotely on 2026-10-17; local reproduction not performed |
| Infrastructure, database and deployment | No provisioning or deployment is claimed; runtime/provider behavior, all-in cost and release evidence remain outstanding | 
| Deployment | Confirmed by project owner on 2026-10-14: StudyPath SA has not been deployed. No live application URL or deployment has been verified. |
| MVP journey | Direction accepted: anonymous learner journey from subject/mark/interest inputs to explainable pathways, eligibility/uncertainty and official next steps |
| Catalogue | UJ 2027 prospectus selected as starting source; four programme candidates listed in `docs/product/PROGRAMME-CATALOGUE-REGISTER.md`. These are research leads, not publication-ready records. The 6–8 record target, complete source/rule verification and relationship evidence remain outstanding; ambiguity maps to UNKNOWN |
| Budget | Owner reports an Active `StudyPath SA` Azure Plan subscription, Owner access, and no costs as of 2026-10-14. This is owner-supplied portal information; billing scope/date range and supporting evidence are not independently reviewed. Public Microsoft pricing/quota sources were checked. No saved quote was uploaded. Free static hosting only; no paid add-ons without renewed approval. |
| Privacy and identity | Synthetic-only, no-persistence/no-profile-telemetry boundary approved; implementation verification, hosting metadata review and any applicable privacy/legal assessment are downstream build/release gates; real learner inputs remain prohibited |
| Azure subscription and accountable owners | Owner confirms a subscription exists and is theirs; permissions/billing visibility are not independently verified. Under OR-014, temporary single-owner review is accepted with documented self-review/release checks; seek independent review before public learner use and record the limitation if unavailable. |
| Hackathon | Owner confirms team profile and new-app status. Supplied programme reviewed: interactive real-time app, deck max 10 slides, demo video max 90 seconds, SSDLC and Lean Business Canvas; Monday 23:59 submission implies 26 Oct 2026. Sonke portal not independently accessed; verify displayed timezone/upload details at submission. |

## Completed
- Confirmed repository identity, private visibility, default branch and integration permissions.
- Inspected the root listing and README.
- Established Phase 0 documentation and recorded the accepted MVP, budget, privacy, anonymous-first and no-provisioning directions.
- Reviewed the supplied product specification for the catalogue/provenance and deterministic eligibility guardrails.
- Reviewed the supplied hackathon programme: team profiling, app eligibility, deck/video, SSDLC, Lean Business Canvas and submission timing.
- Owner approved OR-008–OR-018 on 2026-10-14; the aligned PRD/policy documentation was merged into `main` via PR #22 (merge commit `520abc6a033b73502f9a30f922b032809615d235`). The product owner explicitly approved the revised PRD and measurable acceptance criteria on 2026-10-14; `PRD READY` is passed for the requirements baseline only. Tracker entries are page-memory-only under the approved policy; no persistence is in scope. No implementation, test execution, privacy clearance or release evidence is implied.
- Researched official Azure pricing/documentation pages for the preliminary budget screen.
- Merged `docs/project/PROJECT-READY-EVIDENCE.md` via PR #4; the pack does not constitute approval or gate passage.
- Recorded owner confirmations: one person holds all roles for now; Azure subscription exists and is owned by the project owner; team is profiled on Sonke; this is a new app being developed before the hackathon.
- Owner confirmed no StudyPath SA resources have been provisioned (reported current project spend R0), no existing project resource costs, and no credits will be used. Owner clarified that Azure Static Web Apps Free is acceptable on the existing subscription; the expired 12-month free-account offer will not be relied on.

## Phase 0 disposition

PROJECT READY is **PASSED for Phase 1 PRD and requirements planning only**, based on the owner’s explicit approvals, the owner’s attestation that account-specific checks are complete, official-source research recorded in `PHASE0-ONLINE-EVIDENCE.md`, and review of the supplied hackathon programme.

The following are downstream implementation/release controls, not blockers to beginning PRD work:
1. Implement and test the synthetic-only boundary; verify no profile values are transmitted, persisted or logged.
2. Review hosting metadata, privacy notice, retention and incident process before a public demo; real learner data remains prohibited until the appropriate privacy/legal review is complete.
3. Keep eligibility to sourced minimum-requirement screening and return UNKNOWN on incomplete or ambiguous rules.
4. Before provisioning, recheck the planned resource list against the R100/month cap and the owner's private cost evidence; do not add paid/metered services without renewed approval.
5. Verify the Sonke portal’s displayed submission deadline/timezone and upload limits before final submission.
6. Under OR-014, retain source/relationship self-review records, run available automated checks and complete a release checklist; seek independent review before public learner use, and document the limitation if no reviewer is available.

## Owner-approved direction and remaining boundaries
- MVP journey and key exclusions.
- Anonymous exploration first; cross-session saved pathways and accounts remain excluded. Funding matching and manual application tracking are intended P1 MVP capabilities. OR-015 funding rules and OR-016 lifecycle/field rules are documented; tracker entries are page-memory-only under the approved policy; no persistence is in scope. Cost planning and the AI/document assistant remain deferred under OR-017/018.
- Start with a 6–8 record manually curated official-source pilot, prioritising Gauteng, under OR-008; actual records and review evidence remain outstanding.
- Hard R100/month total spend cap; no provisioning before cost/access approval.
- Azure Static Web Apps Free is an acceptable hosting plan on the existing subscription; the project will not rely on the expired 12-month Azure free-account offer. Owner reports no project resources currently provisioned and no credits will be used.

Owner approval of the Phase 0 direction/materials is recorded. These approvals do not by themselves provide the external and implementation evidence required to pass the gate.

## Evidence limitations
- Five remote CI workflows passed on main commit `6a6099f10f5957ef0e7e0c87fed058af172921f3` on 2026-10-17 (see current evidence snapshot above). The assistant did not reproduce the tests locally; the local clone attempt failed at DNS resolution for `github.com`.
- No deployment, cloud provisioning, live-hosting smoke test, comprehensive security review, runtime/provider privacy verification, or release is claimed. The project owner previously confirmed that StudyPath SA has not been deployed. Phase 0 passage and green CI do not imply release readiness.
- The owner reports that the `StudyPath SA` subscription is Active, their role is Owner, the plan is Azure Plan, and no costs exist (2026-10-14). Account-specific details, billing scope/date range and redacted evidence were not independently inspected by the assistant; no billing screenshot or saved quote was committed. See `PHASE0-ONLINE-EVIDENCE.md`.
- Pricing review is a preliminary screen of official pricing pages, not a saved Pricing Calculator quote; final regional prices, currency conversion, tax, usage assumptions and credits remain unverified.
- Official UJ programme pages and Microsoft pricing/quota pages were checked online on 2026-10-13. OR-008 supersedes the earlier two-programme proposal with a target of 6–8 curated programme records prioritising Gauteng; the actual publication-ready catalogue remains outstanding. Full admission predictions remain unsupported and incomplete rules must return UNKNOWN.
- Hackathon deliverables and date are extracted from the supplied programme. The owner confirms Sonke profiling and new-app status; the portal itself was not accessed. Confirm the portal timezone/upload details before submission.
- The supplied local tracked-file listing and remote repository inspection do not constitute a complete audit of every branch or historical commit.

## Phase 3 architecture approval — 2026-10-16

The product owner explicitly approved the architecture baseline in `docs/architecture/` on 2026-10-16. This approves the documented logical architecture, current D-047 local synthetic-demo boundary, privacy constraints, catalogue/provenance principles, and gated nature of future runtime/authenticated features. It does not approve unresolved endpoint schemas, runtime/service composition, catalogue publication records or rule semantics, CI requirements, cost feasibility, Azure provisioning, real learner-data processing, or deployment. Those remain explicit downstream gates.

## Next gate
Proceed to **Phase 4 — API/interface contracts**. Define and review the versioned `/api/v1` catalogue-only contract and schema/error/freshness behavior before dependent API-client implementation. Keep learner marks, subjects, interests, matching results and tracker entries out of API requests. Resolve the eligibility contract and golden-set semantics against approved requirements, and preserve `UNKNOWN` for missing or ambiguous source rules. No Azure provisioning or real learner-data use is authorized. Application build/runtime privacy/deployment status remains unverified.


## Azure cost estimate update — 2026-10-14

Created [`docs/project/AZURE-COST-ESTIMATE.md`](AZURE-COST-ESTIMATE.md). The preliminary baseline estimates **R0/month for Azure Static Web Apps Free only**, with the static React/Vite app and browser-side matching; no backend, database, AI, API Management, or paid monitoring is included. Microsoft public pricing/quota sources were checked on 2026-10-14. This is not a saved, authenticated Azure Pricing Calculator quote and does not independently verify subscription billing. The owner must save/review the calculator result and private billing evidence before provisioning. The R100/month cap and no-provisioning boundary remain unchanged.


## Azure Pricing Calculator output supplied — 2026-10-14

The project owner supplied a calculator table showing Azure Static Web Apps, Free tier, **Central US**, **$0.00 estimated monthly cost**, **$0.00 estimated upfront cost**, and a **$0.00 Support** line. Licensing program is shown as Microsoft Customer Agreement (MCA); billing account/profile fields in the pasted table are blank. This evidence is recorded in [`AZURE-COST-ESTIMATE.md`](AZURE-COST-ESTIMATE.md). The calculator output is owner-supplied and has not been independently inspected in a signed-in session. It applies to the listed items only, not necessarily all project or third-party costs. Private Cost Analysis/billing scope verification and review of the exact planned resource list remain required before provisioning. The R100/month hard cap and no-provisioning boundary remain in force.

## Phase 1 PRD gate disposition

- **Gate:** `PRD READY` — **PASSED on 2026-10-14** after explicit product-owner approval of `docs/product/PRD.md` and `docs/product/ACCEPTANCE-CRITERIA.md`.
- **Approved scope boundary:** P1 funding matching and manual application tracking; tracker entries page-memory-only; next steps limited to official links and neutral source-backed guidance; cost planning and AI/document assistance deferred.
- **Meaning:** Requirements baseline approved for Phase 2 planning. Acceptance criteria are targets/test oracles, not test results.
- **Still outstanding:** Requirements matrix and traceability, curated programme/funding records, relationship provenance, implementation, automated tests, accessibility/performance measurements, privacy/hosting review, CI/CD, infrastructure validation, deployment and release evidence.
- **Verification:** Documentation state updated only. No application tests were run; no cloud resources were provisioned and no deployment was performed.


## Phase 2 GAP-001–GAP-008 update — 2026-10-14

The project owner selected API-first MVP architecture, UJ 2027 as the starting programme-catalogue source, and the policy of keeping sensitive funding criteria unknown and directing learners to official checks. D-044 records the architecture decision and supersedes D-019's static-first choice only.

Draft architecture and API contract documents are recorded under `docs/architecture/`. The safe interim boundary is catalogue-only API responses; learner marks, subjects, interests, match results and tracker entries remain client-side and must not be transmitted. Owner confirmation is still required under OR-019/Q-018 before the final API contract is frozen.

The UJ catalogue register identifies four candidate programme leads from official UJ sources, but none is marked as a verified publication-ready record. GAP-001, GAP-002, GAP-003, GAP-004 and GAP-005 remain evidence blockers. GAP-006 and GAP-007 remain resolved by prior source inspection. GAP-008's architecture direction is resolved, but runtime composition, final API schema, network behavior, provider retention/logging and cost feasibility remain open.

No application code, executable tests, CI workflow, Azure resource, deployment, privacy clearance or release evidence was created or verified by this documentation update. The R100/month cap and no-provisioning gate remain in force.


## UJ 2027 catalogue evidence review — 2026-10-14

Official-source research has captured preliminary programme code and minimum-threshold leads for four UJ programmes in `docs/product/PROGRAMME-CATALOGUE-REGISTER.md`. The current official programme pages list B2I01Q (APS 30, English 5, Mathematics 6), B2I02Q (APS 30, English 5, Mathematics 6), B2E02Q (APS 26, English 4, Mathematics 5) and B2I04Q (APS 34, English 5, Mathematics 7). The indexed 2027 prospectus also shows B2E02Q and an exclusion note for Technical Mathematics and Technical Science for Faculty of Science degree programmes.

**Evidence limitation:** these are preliminary source leads, not complete eligibility rules or curator-approved catalogue records. The full programme-specific APS calculation/inclusions, exceptions and source/cycle reconciliation remain outstanding. The Academy undergraduate-courses page contains an older B2E01Q label for the extended CSI programme, while the 2027 prospectus and current programme page show B2E02Q; this conflict is explicitly open. No eligibility evaluator may consume these candidate values as definitive data. GAP-001 remains open, the 6–8 verified-record target is unmet, and `REQUIREMENTS READY` remains not passed. No application code or tests were changed or run.


## UJ catalogue expansion — 2026-10-14

The preliminary UJ 2027 research set has expanded from four to seven candidates in `docs/product/PROGRAMME-CATALOGUE-REGISTER.md`: four Faculty of Science computing degrees, BCom in Information Systems (B1CISQ), Diploma in Business Information Technology (code conflict D1I40J vs DI1401), and BCom in Information Management (APS wording conflict). Official-source search-indexed 2027 prospectus text and current UJ programme pages were compared. The three material source conflicts (extended CSI code, Diploma in Business IT code, Information Management APS wording) remain unresolved. These are candidate leads, not curator-approved records. The full 2027 rule tables/yearbooks, programme-specific APS calculations/inclusions, exceptions and curator sign-off are still required. GAP-001/Q-019 remain open; 6–8 fully verified records are not yet available; `REQUIREMENTS READY` remains not passed. No application code or tests were changed or run; no Azure resource was provisioned and no deployment was performed.


## Catalogue reconciliation matrix — 2026-10-14

Created `docs/product/UJ-2027-SOURCE-RECONCILIATION-MATRIX.md` and linked it from the programme register and requirement gaps. The matrix records the official-source register, seven candidate-level reconciliation rows, evidence checklist, open discrepancies and requirement-to-test traceability. Fresh official-source research indicates the Business Information Technology code `DI1401` appears in both the current UJ page and the official 2027 CBE intake brochure, while the central prospectus search-indexed text appears as `D1I40J`; this may be a PDF text extraction/OCR issue but must be checked against the original page. Information Management APS text appears conditional by Mathematics route versus Mathematical Literacy and must be confirmed against the original table. CSI Extended code `B2E01Q` versus `B2E02Q` still needs authoritative resolution. All seven records remain research leads, not approved rules. GAP-001 remains open; `REQUIREMENTS READY` remains not passed. No app code/tests were changed or run; no Azure resource was provisioned or deployed.


## UJ official programme-page follow-up — 2026-10-14

Reviewed additional official UJ programme-page search results and the official departmental Information Management page. Current programme pages corroborate preliminary values for the seven candidates. The departmental Information Management page explicitly states APS 26 with Mathematics or 28 with Mathematical Literacy, while the current programme page states minimum APS 28 alongside its subject alternatives; the 2027 rule remains unresolved pending original-table review. The older CSI Extended page's B2E01Q should be treated as a historical-source discrepancy, not automatically as a current 2027 conflict. Diploma Business Information Technology has code variations in search-indexed yearbook evidence; the current programme page lists DI1401, but the original 2027 prospectus row still requires visual confirmation. Evidence and limitations are recorded in `docs/product/UJ-2027-SOURCE-RECONCILIATION-MATRIX.md`. No programme is approved, GAP-001 remains open, and no application code/tests or Azure/deployment work was performed.

## Subject normalization proposal — 2026-10-14

Added `docs/product/SUBJECT-NORMALIZATION-CONTRACT.md` as a draft proposal for GAP-002. It proposes stable identifiers while keeping Mathematics, Mathematical Literacy and Technical Mathematics distinct; prohibits unapproved aliases and fuzzy eligibility matching; defines unresolved/ambiguous behavior as non-matching; calls out Home Language vs First Additional Language distinctions; and defines planned test scenarios and the catalogue-only API privacy boundary. Linked the proposal from `docs/product/REQUIREMENT-GAPS.md`. This is not an approved subject dictionary or implementation. GAP-002 remains open pending product-owner/curator decisions. No application code or executable tests were changed or run; no CI result, privacy clearance, Azure provisioning or deployment is implied.


## Pathway relationship evidence proposal — 2026-10-14

Added `docs/product/PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md` on branch `docs/phase-2-pathway-relationships` as a draft proposal for GAP-003. It defines relationship types and required provenance, distinguishes general qualification progression from named-programme articulation, and records candidate questions without approving any pair. Official UJ sources were researched, but programme-specific relationship evidence and curator sign-off remain outstanding. No application code or executable tests were changed or run; no CI, privacy clearance, Azure provisioning or deployment is implied. GAP-003 remains open and `REQUIREMENTS READY` remains not passed.


## Traceability alignment after PR #31 — 2026-10-14

PR #31 was merged into `main` (merge commit `a191416f27c917e0767841856517dccdabbf2861`). The pathway relationship evidence contract remains a proposal: no programme pair is approved and GAP-003 remains open. The subject normalization contract from PR #30 also remains a proposal pending owner/curator decisions; GAP-002 remains open.

This update aligns the traceability registry with T-SUB-001–010 and T-REL-001–008 and corrects the funding/tracker acceptance-criteria cross-check status. These test IDs are plans only. No application code or executable tests were created/run; no CI result, privacy clearance, Azure provisioning or deployment is claimed. `REQUIREMENTS READY` remains not passed.
## GAP-001 — additional official 2027 CBE source cross-check (2026-10-14)

Reviewed the official UJ CBE Undergraduate 2027 Intake Brochure search-indexed table against the current programme pages and central 2027 prospectus search text. For Diploma in Business Information Technology, the CBE brochure and current page both list DI1401 and the same preliminary APS/subject routes; the central prospectus extraction's D1I40J variation is therefore plausibly an extraction/transcription issue but remains open until the original table is visually checked. For BCom Information Management, both the CBE 2027 brochure and central prospectus search text support APS 26 with Mathematics/Technical Mathematics or 28 with Mathematical Literacy; the current programme page's generic APS 28 statement is less specific.

These are research findings only. Original PDF page numbers/table layouts, complete APS calculation and inclusion/exclusion rules, full programme-specific conditions, source snapshots and curator sign-off remain outstanding. No candidate is approved for definitive eligibility screening. GAP-001 remains P0/open; REQUIREMENTS READY remains not passed. No application code or executable tests were changed or run; no CI result, privacy clearance, Azure provisioning or deployment is claimed.


## Subject contract test evidence — 2026-10-14

The project owner supplied terminal output from the repository command `node --test tests/contracts/subject-catalogue-v1.test.mjs`, reporting **12 tests passed, 0 failed** across T-SUB-001–T-SUB-012. This is owner-supplied execution evidence and is recorded in the requirements matrix. It supports the subject-contract test scope only; it does not prove production matcher integration, CI execution, privacy/runtime behavior, or correct programme eligibility decisions. The bounded `subject-catalogue-v1` contract is owner-approved. GAP-002 remains open for runtime/privacy verification; GAP-001 remains open pending complete programme rules and curator sign-off. `REQUIREMENTS READY` remains **NOT PASSED**. No cloud resources were provisioned and no deployment was performed.


## UJ 2027 curator approval update — 2026-10-14

The project owner explicitly approved all seven candidate records and the shared interpretation proposals in `docs/product/UJ-2027-CURATOR-REVIEW-PACK.md` after reviewing the pack. This is owner/curator approval of the bounded NSC pilot baseline; it is not independent assurance, does not resolve source details absent from the evidence, and does not authorize definitive `ELIGIBLE` results when material rules are unknown. The catalogue register now records this approval. GAP-001 remains open pending completion of programme-specific source/rule fields, signed expected outcomes, deterministic evaluator implementation, and a project-wide 20+ synthetic golden set with zero false-positive `ELIGIBLE` outcomes. GAP-002 runtime/privacy, GAP-003 relationship evidence, GAP-004 privacy/runtime verification, GAP-005 funding records, GAP-008 API/runtime feasibility, implementation and CI remain open. `REQUIREMENTS READY` remains NOT PASSED. No application code/tests were changed or run; no CI, cloud provisioning, or deployment is claimed.

## GAP-002 repository inventory update — 2026-10-14

The owner supplied local Git output for the current checkout. The reported working tree is clean and synchronized (## main...origin/main); local main and origin/main point to 8da1dcf97d14276b4e4cad010168dfd13b87cca7. The tracked-file list contains project documentation, repository guidance, and tests/contracts/subject-catalogue-v1.test.mjs; it contains no package manifest/lockfile, application source, API/function implementation, CI workflow, infrastructure, or deployment configuration. The displayed non-documentation history shows only the contract test and repository guidance additions. This is owner-supplied evidence, not an independently reproduced checkout. The remote inventory branch appears in the branch list but is not the checked-out local branch in the supplied output.

**Disposition:** tracked repository inventory is complete for the reported checkout, subject to the limits of owner-supplied command output and the refs/history actually fetched. GAP-002 remains **OPEN** for runtime/privacy assurance: there is no verified runnable application to inspect or test, no CI result, and no hosting/provider configuration to audit. This does not pass REQUIREMENTS READY. No application code, test, cloud resource, or deployment was changed or executed by this documentation update.


## GAP-002 implementation baseline follow-up — 2026-10-14

Created `docs/requirements/GAP-002-PRIVACY-VERIFICATION-PLAN.md` on a dedicated branch. It defines the minimum runnable browser-only slice and 12 evidence-backed privacy tests covering network egress, third-party destinations, storage/cookies, URLs/history, console/telemetry, API/provider logs, reset, reload, error paths, CI/dependencies, source-sink inventory and hosting retention. This is a plan only. The supplied tracked-tree inventory has no verified runnable app or browser harness, so learner-data non-transmission/non-persistence/non-logging/non-telemetry cannot yet be tested. No app code, dependency, test harness, CI, cloud resource or deployment was added or changed. GAP-002 remains OPEN; no runtime privacy claim is made.


## Phase 2 PH2-001 status reconciliation — 2026-10-15

Updated the requirements matrix, requirement-gap register and project status summary to use one consistent disposition for the funding/tracker documentation cross-check:

- GAP-006 is **resolved as a documentation cross-check**: PRD and OR-016 agree on tracker status transitions and terminal states. This does not mean tracker implementation or transition tests are complete.
- GAP-007 is **resolved as a documentation cross-check**: AC-FUND-001–009 and AC-APP-001–009 are present in `docs/product/ACCEPTANCE-CRITERIA.md` and linked from the requirements matrix. This does not mean funding/tracker features or their tests are implemented.
- REQ-FUND-001 remains P1; current official-source funding records are still outstanding. Its scope/acceptance-criteria mapping is no longer marked outstanding.
- REQ-APP-001 remains P1; its lifecycle/acceptance-criteria mapping is no longer marked outstanding. Implementation and test evidence remain unavailable.
- The requirement-gap register no longer treats publication-ready catalogue data, runtime privacy checks, final API details, executable app paths, test execution, CI or release evidence as automatic requirements-completeness blockers. These remain open in their respective data, architecture, implementation, security/privacy, test and release gates unless they expose unresolved product behavior.

**Gate disposition:** Phase 2 remains **OPEN**. PH2-001 corrects status contradictions only; it does not approve the requirements baseline, close other gaps, or claim code/test/CI/deployment work. No application tests were run, no CI was triggered by this documentation update, and no cloud resources or deployment were changed.


## Phase 2 PH2-002 — subject contract/test traceability reconciliation (2026-10-15)

Prepared on branch `docs/phase-2-ph2-002-subject-traceability` for review. The owner-approved `subject-catalogue-v1` policy remains exact canonical labels after trim/whitespace-collapse/case-insensitive matching, with no aliases. The change aligns the traceability registry and subject contract's T-SUB-001–012 descriptions with the checked-in reference-normalizer tests, corrects the reference normalizer to return canonical display labels rather than lower-case lookup keys, and makes the test/runtime evidence boundary explicit.

**Not claimed:** this reference suite is not production application code; it does not verify programme-level eligibility `UNKNOWN`, UI duplicate rejection, actual dictionary refresh, network/URL/log/telemetry privacy, deployment or release readiness. CI results must be checked against the exact tested commit; the PR's latest run status is the source for revision-specific execution evidence. GAP-002 and `REQUIREMENTS READY` remain open.

## Q-020 authenticated feature scope approval — 2026-10-15

The product owner approved D-046's authenticated feature scope: personalised pathway matching, saved pathways, pathway comparison, saved funding opportunities and a personal study dashboard. Academic profile persistence requires explicit opt-in; the application tracker remains page-memory-only. Pathway comparison is an approved scope extension to the earlier PRD institution-comparison non-goal. The PRD, acceptance criteria, architecture and draft API contract have been reconciled on branch docs/q020-approved-feature-scope for review.

**Still blocked:** Q-020/Q-018 lifecycle details, exact schemas, identity provider, server-side authorization/account isolation, consent/withdrawal and privacy notice, retention/deletion/backup expiry, shared-device/session behavior, provider logging/telemetry/cache controls, privacy/legal review, executable acceptance tests, and total cost within R100/month. No authenticated implementation, real learner-data use, provisioning or deployment is authorized by this documentation change. The anonymous D-045 privacy boundary and memory-only tracker policy remain unchanged. REQUIREMENTS READY remains open; no tests or CI results are claimed by this update.

## Q-020 lifecycle and implementation readiness — 2026-10-15

A reviewable proposal is recorded in [Q020-LIFECYCLE-IMPLEMENTATION-READINESS.md](Q020-LIFECYCLE-IMPLEMENTATION-READINESS.md). It defines minimum proposed data classes, transient versus persisted behavior, opt-in and withdrawal, proposed retention/deletion/backup windows, account isolation, logging/telemetry/cache controls, session/shared-device handling, candidate API resources, a test plan and explicit owner decisions. These are proposals, not approved policy.

**Q-020 IMPLEMENTATION READY: NOT PASSED.** Identity provider/session design, exact persisted fields, retention periods, deletion and backup behavior, privacy/legal review, frozen API contract, workload/cost evidence and executable security/privacy tests remain open. No authenticated implementation, real learner data, Azure provisioning or deployment is claimed or authorized.

## Q-020 owner decision register — 2026-10-15

The product owner explicitly approved the proposal/constraint/gate dispositions for Q020-DEC-01–14. The register and boundaries are recorded in `docs/project/Q020-LIFECYCLE-IMPLEMENTATION-READINESS.md`.

- Approved proposal directions: first evaluate Microsoft Entra External ID (not yet selected); minimal controlled profile fields; no match-history/result persistence by default; separate versioned opt-in and withdrawal; profile retained only while opt-in is active; saved items retained until removal/account deletion; shared-device clearing/account partitioning; and the proposed deletion/backup/log-retention targets.
- Approved security constraints: no tokens in URLs or persistent browser storage; cookie sessions require CSRF protection. The session mechanism remains deferred until threat-model review.
- Approved gates: complete South African privacy/legal and age-appropriate design review before real learner data; select/provision hosting only after security and full cost assessment; evidence a realistic service-by-service workload forecast under the R100/month cap.
- The 30-day active-data deletion targets, 35-day backup-expiry target and 30-day-or-shorter routine-log target are not verified guarantees or public-facing promises. Provider capabilities/configuration, legal suitability, deletion/restore behavior and tests remain to be evidenced.
- Q-020 remains **OPEN / P0; IMPLEMENTATION READY — NOT PASSED**. The approvals do not authorize real learner data, cloud provisioning, production identity configuration, authenticated implementation or deployment. No runtime tests, security/privacy tests, cost verification, CI run or deployment were performed by this documentation update.
- The anonymous privacy boundary and page-memory-only application tracker remain unchanged.


## Q-020 owner decisions A–E — 2026-10-15

The owner explicitly approved all five decisions A–E. The approved design baseline and limits are recorded in [Q020-DECISION-PACK.md](Q020-DECISION-PACK.md) and the [owner decision record](Q020-OWNER-DECISIONS-A-E.md): (A) evaluate Entra External ID first with OIDC authorization code + PKCE and memory-only token cache; (B) adopt token-subject-derived API ownership and account-isolation constraints; (C) accept retention/deletion periods as internal engineering targets only; (D) maintain the hard R100/month total cap and defer authenticated persistence/features unless a complete forecast proves affordability; (E) adopt the executable acceptance matrix, including 20+ reviewed synthetic golden cases and zero false-positive ELIGIBLE results.

**Q-020 remains OPEN / P0; IMPLEMENTATION READY — NOT PASSED.** These are design/constraint approvals, not evidence of legal compliance, provider capability, cost compliance, implementation, runtime tests, CI for runtime controls or deployment. Qualified South African privacy/legal and age-appropriate review, provider verification, a complete cost forecast, runnable implementation baseline, executable tests/CI and operational-control verification remain open. Real learner data, provisioning, production identity configuration and deployment remain unauthorized until applicable gates pass. Anonymous inputs/results/tracker entries remain page-memory-only and must not be transmitted to APIs, URLs, analytics, logs or telemetry.


## G-Q020-1 — External privacy/legal/minors review preparation — 2026-10-15

- **Gate state: BLOCKED — qualified independent review not evidenced.**
- Added `docs/project/G-Q020-1-EXTERNAL-REVIEW-REQUEST.md` with scope, evidence limitations, reviewer questions, decision criteria and a response template.
- Existing `docs/project/Q020-PRIVACY-LEGAL-AGE-REVIEW.md` remains the data-inventory and legal-questions pack.
- This work prepares the review; it is not legal advice, a legal opinion, POPIA compliance evidence, or approval to process real learner data.
- No qualified reviewer has been identified or signed off in repository evidence. Do not infer a reviewer has been contacted.
- Real learner data remains prohibited; synthetic-only development, no provisioning/deployment, and no authenticated persistence remain in force.


## Synthetic-only MVP gate — 2026-10-15

**G-SYN-001 — Synthetic-Only MVP Verification: OPEN / NOT PASSED.** See [G-SYN-001 gate criteria](G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md). The gate is defined to keep work moving without real learner data or an external legal review at this stage; it is not a legal-compliance finding or permission to deploy publicly.

**Verified repository correction at commit `e3564527b48dc0ca3cb55d4c208da5dc620b23ff`:** the recursive default-branch tree includes `src/domain/eligibility/uj-2027-evaluator.mjs`, golden-case tests, and two GitHub Actions workflows. Earlier statements in this status file that no tests/workflows or application source were found reflect earlier snapshots and are superseded to that extent. This paragraph and the following next-action note are a historical status snapshot from 2026-10-15, before the current React/Vite scaffold, browser tests and five CI workflows were added. They are retained for audit history only and are superseded by the 2026-10-17 synthetic-only MVP evidence snapshot near the top of this file. The Phase 2 `REQUIREMENTS READY` gate passed on 2026-10-16 for requirements definition and traceability only; G-SYN-001 remains open/not passed. No Azure provisioning, deployment, real learner data, production identity, or persistence is authorized.


## MVP scope reconciliation — D-044–D-047

**Merged:** PR [#71](https://github.com/s1xte3n/studypath-sa/pull/71), merge commit `ef23f08f703d45ad7d3f9a2565c087117246cf4f`. Reconciliation document: `docs/product/MVP-SCOPE-RECONCILIATION-D-044-D-047.md`.

The scope model distinguishes (1) the intended API-first `/api/v1` architecture, (2) the D-045 anonymous client-side matching and D-046 approved but gated authenticated feature extension, and (3) the immediate D-047 local synthetic-only browser demo. The PRD, canonical requirements matrix, acceptance criteria and traceability matrix explicitly record this distinction. The local demo does not require a hosted API, but this does not cancel the API-first target. No new implementation, provisioning, deployment or real learner-data use is authorized.

**Checklist disposition:** A2 is checked on `main`. A3–A6, the remaining Phase 2 evidence and formal product-owner acceptance remain open. G-SYN-001 remains OPEN / NOT PASSED. The branch's contract-test workflow passed run [#32](https://github.com/s1xte3n/studypath-sa/actions/runs/38775543157); no application build, runtime privacy tests, provisioning or deployment were performed by this documentation change.


## A3 authenticated-feature boundary accepted — 2026-10-15

**Decision status:** Product owner approved the A3 proposal as written; D-048 records the decision. The requirements checklist now marks A3 complete at the boundary-decision level only.

- Five authenticated features remain approved future scope but are excluded from the D-047/G-SYN-001 local synthetic-only demo.
- Academic-profile persistence remains off by default pending separate explicit opt-in and approved lifecycle controls.
- The tracker remains page-memory-only.
- Exact API schemas, identity/session/authorization, comparison/dashboard behavior, retention/deletion/backups, provider controls and cost remain open under Q-018 / Phase 3 and Q-020.
- **Still open/not passed:** A4–A6; overall Phase 2 REQUIREMENTS READY; Q-018; Q-020 implementation readiness; G-SYN-001; browser privacy/accessibility/runtime evidence; application build/test evidence; external privacy/legal review; provisioning and deployment.

The owner decision is not implementation or test evidence. No application code, runtime behavior, infrastructure or deployment was changed by this decision record.


## Phase 2 REQUIREMENTS READY — accepted 2026-10-16

The product owner explicitly accepted the reconciled requirements baseline on merged `main` commit `aeb7b27da3a5bfc01e5f7a378f391f1d43a16c0c` (PR #80). D-049 records the decision, accepted scope, conditions and exclusions. The Phase 2 checklist A–E is complete and `REQUIREMENTS READY` is PASSED for requirements definition and traceability only. This permits Phase 3 architecture/ADR work to begin; it does not certify implementation readiness or authorize deployment.

**Still open / not passed:** OR-019 API/runtime composition, provider logging/retention and cost; Q-018 architecture/API contracts; Q-020 lifecycle and privacy/security controls; G-SYN-001 synthetic-only browser demo; verified catalogue/funding publication; deterministic implementation and golden-set execution; browser privacy/accessibility checks; external privacy/legal review where required; CI evidence tied to the reviewed implementation commit; Azure provisioning, deployment and release.

**Evidence limits:** PR #80's contract tests passed on PR head `159f0d6e351317e6e1f4607dcabafbccaf63a2d9` (run [#56](https://github.com/s1xte3n/studypath-sa/actions/runs/38789412582)); no workflow result was returned for merge commit `aeb7b27da3a5bfc01e5f7a378f391f1d43a16c0c`. This is documentation/contract CI evidence only, not app build, browser, runtime privacy or release evidence. No provisioning or deployment was performed.


## Phase 3 `ARCHITECTURE READY` — PASSED (2026-10-16)

The architecture readiness assessment is recorded in [ARCHITECTURE-READINESS-REVIEW.md](../architecture/ARCHITECTURE-READINESS-REVIEW.md). Requirements trace to logical components, ADRs, security boundaries and acceptance/verification IDs; major trade-offs are documented in ADR-001–ADR-005. The pass is limited to the architecture design baseline. It does not claim implementation, tests, CI, runtime privacy/accessibility verification, catalogue publication, cloud provisioning, deployment or release.

**Next gate:** Phase 4 API/interface contracts. Keep the initial public API catalogue-only; learner marks, subjects/results, interests, recommendations and tracker entries must not be request fields. Define schemas, provenance, versioning, validation, errors, freshness/cache semantics and contract tests. Q-018, Q-020, Q-019 and G-SYN-001 remain open as applicable. No cloud provisioning or real learner-data processing is authorized.


## Phase 4 follow-up — contract validation automation (2026-10-16)

PR #86 merged the canonical draft interface documentation. The next change adds `.github/workflows/openapi-validation.yml`, which runs pinned Redocly CLI validation against `docs/api/openapi.yaml` and executes `node --test`. It also adds `tests/contracts/openapi-contract.test.mjs` to assert the two approved public read-only paths, documented response status coverage, core schema declarations and learner-data privacy boundary.

**Status:** PR #87 merged at `e725ffc6e1858612cccd3aaa291ee469da7e0d5b`. The first observed `OpenAPI validation` run passed Redocly lint but failed 3 of 33 Node tests due to assertions that did not match the source documentation layout; follow-up fix is in PR branch `fix/phase-4-contract-ci`. Contract gate remains blocked until the corrective CI run passes. Owner approval, runtime/provider/cost decisions, catalogue record verification and privacy/runtime evidence remain required. No application runtime or deployment is claimed.


## Phase 4 contract CI update — 2026-10-16

PR #89 merged at `bbad7b869a1e2e59184d37c486a7185d70e809f5`. The merge-commit GitHub Actions runs all passed: [OpenAPI validation](https://github.com/s1xte3n/studypath-sa/actions/runs/38912794797), [Contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/38912794987), and [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/38912795061). The earlier brittle contract assertions are corrected. This verifies the documented contract checks and current golden-case workflow only; it does not verify an application runtime, privacy/telemetry behaviour, published catalogue data, cloud resources or deployment.

**Phase 4 remains open.** Complete owner review of the frozen fields/enums and resolve OR-019/Q-018 deployment-profile decisions (provider/runtime, CORS, cache, rate limits, timeout/retry, provider logging/retention and cost). Verify publication-ready programme/funding records and provenance. No API implementation, Azure provisioning or real learner-data use is authorized by these CI results.


## Phase 4 owner approval and funding evidence update — 2026-10-16

The product owner explicitly confirmed: “I verified and approve all” and instructed the project to continue. Record this as approval to proceed with the reviewed Phase 4 public catalogue contract baseline and its documented scope: anonymous read-only catalogue retrieval only; matching and manual tracking remain browser-local; synthetic data only; no learner data in API requests; no provisioning or deployment authorization.

The approval does not create evidence for runtime settings or data publication. OR-019/Q-018 still require an evidence-backed deployment profile for runtime/provider composition, CORS origins, cache behavior/TTL, rate limits, timeouts/retries, provider logging/retention and total cost under the R100/month cap. No paid/metered services or Azure resources are authorized by this documentation approval.

A source check for the funding register found conflicting official 2027 NSFAS closing-date statements: the NSFAS application page currently states 31 October 2026, while the South African Government announcement of the 2027 cycle states 18 November 2026. The candidate is recorded as research-only with deadline unresolved; neither date is normalized into a definitive learner-facing deadline until NSFAS provides authoritative clarification and the curator records the source/version.

**Current gate:** Phase 4 `CONTRACT READY` remains **OPEN / NOT PASSED**. Next evidence work is source reconciliation and complete, curator-approved programme/funding records, plus the deployment profile and passing checks on the current PR/merge commit. This approval is not implementation, test, privacy-runtime, provisioning, deployment or release evidence.


## Option B runtime candidate validation — 2026-10-17

The product owner approved Option B (Azure Static Web Apps Free + managed Azure Functions API, without API Management) as the first candidate for compatibility, security and cost validation only. PR #105 records the decision. `docs/api/OPTION-B-VALIDATION-EVIDENCE.md` documents current Microsoft compatibility evidence, security controls and residual risks, a conditional Functions usage model, and private billing checks still required. Current disposition: **candidate plausible; all-in cost NOT CERTIFIED; runtime security/rate-limit controls NOT VERIFIED; Phase 4 OPEN**. The local synthetic-only demo remains in place. No Azure resources were provisioned and no deployment was performed or authorized.


## Rate-limiting disposition — D-053 (2026-10-17)

D-053 is recorded in `docs/project/DECISIONS.md` and detailed in `docs/api/RATE-LIMITING-DECISION.md`. Option B does not currently establish numeric per-IP rate limiting; API Management Consumption does not support the required custom `rate-limit-by-key` policy. No paid gateway or in-memory counter is selected. Local synthetic-only work and local API validation may continue, but public hosted API deployment is blocked until a viable control is costed and tested or an explicit risk exception is approved. The API contract's `429 RATE_LIMITED` behavior is conditional on actual deployment-level enforcement. No resources were provisioned and no deployment was performed. Phase 4 and the R100/month cost gate remain open.


## Synthetic-only browser evidence update — 2026-10-18

Latest main commit reviewed: `bf137ec9060d59942ded92af258e2bf9e23cbc0a` (PR #133 merge). PR [#132](https://github.com/s1xte3n/studypath-sa/pull/132) extended browser lifecycle checks to IndexedDB, Cache API, cookies, local/session storage, fresh-tab isolation and reload reset. PR [#133](https://github.com/s1xte3n/studypath-sa/pull/133) instrumented additional test-context channels (fetch, XHR, sendBeacon, WebSocket, history, window errors and unhandled rejections) and checked sentinel-value leakage. Four workflows passed on the merge commit: [browser E2E/privacy/accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39118371483), [browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39118371484), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39118371572), and [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/39118371618).

This supersedes the 2026-10-17 snapshot as the latest browser test baseline; it does not rewrite that historical record. G-SYN-001 remains **OPEN / NOT PASSED** because the complete pathway-result journey, authoritative catalogue provenance/curator sign-off, manual responsive/keyboard review, complete privacy boundary evidence, local reproducibility and release gates remain outstanding. No deployment, Azure provisioning, paid services or real learner-data processing is authorized.


## Privacy-test false-positive correction — 2026-10-18

PR [#135](https://github.com/s1xte3n/studypath-sa/pull/135) merged into `main` as [`9cde29ae3bb6c3d928c30549a35be9c4fe95f94e`](https://github.com/s1xte3n/studypath-sa/commit/9cde29ae3bb6c3d928c30549a35be9c4fe95f94e). In `tests/e2e/student-form.spec.mjs`, the learner privacy marker changed from the overly broad value `93` to `learner-privacy-sentinel-7f4a2d`, avoiding accidental matches in unrelated asset URLs while preserving the synthetic mark `93` and exact-value checks.

All four PR-head workflows passed on `973f5c10e3a8b261639d0c9c219e63532c92c6d5`: [browser E2E/privacy/accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/39119250982), [browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/39119250960), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/39119250884), and [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/39119250985). The workflow lookup returned no runs for the merge commit, and no local test run is claimed. This is a test-quality correction, not new evidence that learner data cannot leak in every environment. G-SYN-001 remains **OPEN / NOT PASSED**; no deployment, provisioning, paid service or real learner-data use is authorized.


## Provider logging and telemetry review — 2026-10-21

The project owner approved a scoped local-only review: Azure is planned but not deployed; synthetic/demo data only; provider defaults may be accepted only after documented terms and retention are reviewed. The evidence and mandatory pre-deployment checklist are recorded in [Provider Logging and Telemetry Review](PROVIDER-LOGGING-TELEMETRY-REVIEW.md).

The repository review found no dedicated analytics SDK in `package.json`, a loopback-only Vite dev/preview host in `vite.config.js`, and React page-memory state in `src/main.jsx`. These facts and selected browser tests do not establish provider-side logs, telemetry, terms, retention or deletion. Those remain **NOT VERIFIED** because there is no deployed Azure configuration to inspect. The local-only documentation checklist item is complete within scope; provider verification and G-SYN-001 remain open. No provisioning, deployment or real learner-data use is authorized.


## Azure provider logging research — 2026-10-21

Official Microsoft documentation research is recorded in [Azure Logging and External Telemetry Research](AZURE-LOGGING-TELEMETRY-RESEARCH.md). It covers the planned Azure logging surfaces and distinguishes platform Activity Log, configurable resource diagnostics, application monitoring, and exported-copy retention. Documented examples include Activity Log's 90-day default retention, configurable API Management request/body/client-IP logging, Functions/Application Insights telemetry, PostgreSQL diagnostic categories, Blob request logs, and license-dependent Entra audit/sign-in retention. These are service-documentation findings, not evidence of StudyPath's actual configuration.

No deployed Azure resources, diagnostic settings, workspaces, storage lifecycle policies, Entra tenant logs, AI endpoints, or provider terms for a final selected SKU/region were inspected. Exact service selection and settings remain unknown. The research checkbox may be complete; actual provider verification remains open and is mandatory before deployment. No provisioning or deployment was performed, and synthetic/demo data only remains required.


## Hackathon implementation handoff — 2026-10-21

- Owner direction recorded in D-054: prioritise a hackathon-ready product now; production hardening follows after the event.
- Current repository inspection confirms the React/Vite form validates entries but does not yet calculate learner-facing pathway results. The existing deterministic UJ 2027 evaluator and local catalogue handler are separate code paths and must be inspected and integrated through a small tested adapter.
- Handoff: docs/project/HACKATHON-IMPLEMENTATION-HANDOFF.md. Submission requirements and preparation: docs/project/HACKATHON-SUBMISSION-CHECKLIST.md.
- Next action: implement the P0 evaluator-to-UI vertical slice on a feature branch, then add results/details, privacy/accessibility regression and demo rehearsal.
- Gate state: G-SYN-001 remains OPEN / NOT PASSED. Do not claim product readiness until the learner-facing journey is tested end-to-end. This documentation change did not run tests, deploy services, verify runtime privacy, or certify cost.
- Hackathon dates/deadline per supplied programme: 23–25 October 2026; submission Monday 26 October 2026 at 23:59 via Sonke. Verify portal timezone and field/file requirements.


## Phase 5–7 implementation branch snapshot — 2026-10-21

**Branch:** `feat/hackathon-pathway-results-phases-5-7`  
**Base commit inspected:** `9586593f188760b9e8c29edbe5e3fbef2a86f365` (main at branch creation).  
**Status:** Implementation in progress; CI verification pending; no merge, deployment, or release claimed.

- Added a learner-facing adapter at `src/domain/pathway-matching.mjs` that calls the existing deterministic UJ evaluator and maps supported UI subjects to canonical subject IDs.
- Updated `src/main.jsx` and `src/styles.css` to render pathway cards, UNKNOWN states, draft-catalogue disclosure, official source links, and resettable result state.
- Added `tests/pathway-matching.test.mjs` and updated browser E2E expectations for results rendering.
- Added initial Phase 5 inventory files under `docs/config/`, Phase 6 strategy/matrix/cases/priority/release gate files under `docs/testing/`, and contract-scoped Postman collection/environment template.
- The current UJ catalogue remains `DRAFT_NOT_FOR_DEFINITIVE_SCREENING`; all learner-facing outcomes must remain UNKNOWN. The draft does not support publication or definitive eligibility.
- Local npm commands were not run through the GitHub connector. The PR's CI workflows must be inspected before marking implementation tests passed.
- Postman runtime requests are not executed because no hosted API runtime is verified. Azure provisioning, deployment, real learner data, and paid services remain unauthorized.

### Current blockers / next gate

1. Verify all CI workflows on the PR head; fix any failures.
2. Review privacy E2E after results render, including request interception and reset/reload behavior.
3. Confirm source and official next-step links, 320px layout, keyboard focus, and axe results.
4. Keep G-SYN-001 OPEN until its full evidence gate is met.
5. Catalogue publication remains blocked until governing prospectus version, applicable rules, curator sign-off, and source provenance are resolved.


## Verification update — PR #170 merged (2026-10-24)

**Current main commit verified via GitHub:** `a69618c62b614c66c01dd445289f014b1d4c3a05` (merge of PR #170, `fix/p0-journey-verification`).

The following GitHub Actions runs are recorded as completed with conclusion `success` on that exact SHA:
- [Browser MVP build #145](https://github.com/s1xte3n/studypath-sa/actions/runs/40032421662)
- [Contract tests #242](https://github.com/s1xte3n/studypath-sa/actions/runs/40032421627)
- [UJ eligibility golden-case verification #102](https://github.com/s1xte3n/studypath-sa/actions/runs/40032421586)
- [Browser E2E, privacy and accessibility #139](https://github.com/s1xte3n/studypath-sa/actions/runs/40032421578)

**Verified scope:** PR #170 adds rejection of unsupported subject strings at the input-validation boundary and an explicit empty-result message. The four listed CI workflows passed on the merge SHA. No independent local execution is asserted here.

**Release/gate status remains OPEN / NOT PASSED.** The catalogue is still `DRAFT_NOT_FOR_DEFINITIVE_SCREENING`, eligibility must remain `UNKNOWN`, and source/rule reconciliation, curator approval, broader privacy/hosting review, manual accessibility checks, and complete requirement-to-test evidence reconciliation remain open. No deployment or real learner-data use is authorized by this CI evidence.


---

# Hackathon demo-readiness review — 2026-10-24

**Scope:** remote repository review and documentation preparation on branch `docs/hackathon-demo-readiness`; no app code changes. **Main baseline inspected:** `d377512d38cf4e93833e1c50984605cac12adbdb` (commit message: merge PR #177, recording PR #176 merge/CI evidence). GitHub repository metadata reports default branch `main` and private visibility. A remote GitHub connector does not expose the local developer working tree; local uncommitted changes are therefore **not inspected / unknown**.

## Current implementation findings
- `src/main.jsx` has study-stage, subject and mark inputs; validation; calls `buildPathwayResults`; renders pathway cards/details; discloses draft/UNKNOWN/no-guarantee limitations; provides official-source links; resets transient inputs/results; supports light/dark themes and session-only save/tracking state.
- `src/domain/pathway-matching.mjs` maps supported subjects, validates integer marks 0–100, calls the deterministic evaluator, and carries catalogue provenance/source details into result objects. The draft catalogue boundary forces learner-facing outcomes to `UNKNOWN`.
- `tests/e2e/student-form.spec.mjs` contains tests for input/edit/reset, invalid values, error correction, stale notices, URL/history handling, keyboard focus, 320px overflow, selected privacy/network/storage/reload behavior, and axe critical/serious checks in light/dark themes.
- This source inspection is not a fresh test run. No local install, Node tests, Vite build, Playwright run, fresh-session rehearsal, or manual screen-reader review was performed by this assistant.

## Exact-commit verification
The GitHub combined status endpoint for `d377512d38cf4e93833e1c50984605cac12adbdb` returned one successful status context named **Vercel**. This does not prove the required test workflows ran on this exact SHA and is not a basis for claiming deployment/release readiness. The previously owner-reported four passing workflows refer to merge commit `0eafef65f42c10255ba6e307e6648ee822761a30`, not this current main SHA.

## Work prepared on this branch
- `docs/project/DEMO-RUNBOOK.md` — synthetic Grade 12 profile (Mathematics 75, Physical Sciences 81), timed runbook, validation step, expected seven UNKNOWN cards, reset/reload and fallback.
- `docs/project/PRESENTATION-DECK-CONTENT.md` — ten-slide content draft compliant with the official slide ceiling; screenshot and final video URL placeholders remain.
- `docs/project/HACKATHON-SSDLC-LEAN-CANVAS-PREP.md` — evidence-aligned draft, including actual limitations and manual Sonke actions.
- `docs/project/HACKATHON-SUBMISSION-CHECKLIST.md` — programme-derived requirements and remaining owner actions.

## Open blockers / owner actions
1. Rehearse twice from a fresh session on the exact candidate; record SHA, browser/OS, commands, results and deviations.
2. Run and capture current-candidate install/test/build and relevant Playwright/CI evidence; distinguish owner-supplied evidence from independently reproduced results.
3. Perform and record manual keyboard, screen-reader and responsive review.
4. Capture screenshots and export final <=10-slide PDF from the frozen candidate.
5. Record video <=90 seconds, verify its URL privately, and place that link on the final deck.
6. Verify Sonke team profile, deadline timezone and portal file/field requirements; complete actual SSDLC and Lean Business Canvas forms; upload through Submit Files and retain confirmation.
7. Continue catalogue provenance/rule reconciliation, curator sign-off and full hosting/provider/telemetry privacy review before considering `G-SYN-001` closure.

**Gate:** `G-SYN-001` remains **OPEN / NOT PASSED**. Documentation preparation is not app verification or release approval. No public deployment, Azure provisioning, paid services, or real learner data were used or authorized.


## Core journey stale-state fix — proposed PR (2026-10-24)

- **Inspected baseline:** `301c7515e2e66c071da7cf12d26ae6e00158aa08` on `main`.
- **Observed defect:** profile input changes clear visible results and validation notices, but leave `savedPathways` and `tracking` in React state. A subsequent submission can therefore reveal shortlist entries and manual notes created for an earlier profile.
- **Proposed change:** the shared profile-change invalidation handler also clears the shortlist and tracker; add a Playwright regression covering save, add a tracker note, edit a mark, and submit the revised profile.
- **Affected files:** `src/main.jsx`, `tests/e2e/student-form.spec.mjs`, `docs/product/TRACEABILITY-MATRIX.md`.
- **Verification status:** source inspected through GitHub; no local checkout or local tests were run by this assistant. Branch created from the reviewed baseline; PR CI is required before treating the regression as verified.
- **Unchanged safeguards:** synthetic inputs only; UJ catalogue remains draft and learner-facing eligibility remains UNKNOWN; G-SYN-001 remains **NOT PASSED**. No deployment, provisioning, or submission-artefact work is included.


## Issue #184 — discovery dashboard implementation on PR branch

**Inspected baseline:** `60945363fa1542cc39bde3dd9b77f1a8da026f50` on `main`. The learner journey rendered the full result array directly; there was no profile-completeness summary, candidate/visible count distinction, or filter state. Result records include an eligibility state and optional campus, which are the only discovery filters introduced.

**Implemented on branch `feat/184-discovery-dashboard-filters` (pending PR review/CI):**
- A deterministic profile-completeness score based on two required sections only: stage selected (50%) and at least one unique subject with a valid whole-number mark from 0 to 100 (50%). Blank optional extra rows do not lower the score.
- Total catalogue candidates, currently visible count, and eligibility-state counts derived from the active filtered result set.
- Eligibility-state and available-campus filters, with a clear-filter action and accessible empty state.
- Focused domain unit tests and Playwright coverage for completeness, count/filter consistency, UNKNOWN-only draft results, empty-state recovery, and 320px layout in light/dark themes.
- No change to eligibility evaluation, catalogue contents, storage, networking, dependencies, or deployment.

**Verification:** The assistant inspected the relevant main-branch source and scripts through GitHub. It did not run tests locally. PR CI results are pending; report each workflow result only after it completes. The UJ catalogue remains draft, all current outcomes remain UNKNOWN, and G-SYN-001 remains NOT PASSED. Manual keyboard/screen-reader and external provider/privacy checks are not established by these automated tests.


## Issue #185 — implementation candidate (2026-10-24)

**Reviewed main commit:** `b0fb8aa7c046e5317d55fba990a31a4e724bd079` (PR #196 merge). GitHub repository contents and issue #185/#160 were inspected remotely. This environment does not expose a local checkout or working-tree state, so no local git status is asserted.

**Verified defect from source inspection:** the form's error-to-field mapper associated ordinary missing-subject and mark errors, but did not associate duplicate-subject errors or the supported-subject validation branch with their corresponding controls. This left the global error notice visible while affected fields lacked `aria-invalid` / `aria-describedby` feedback. The UI currently uses a fixed subject select, so unsupported-subject selection is not directly reachable through normal browser interaction; duplicate-subject is reproducible through the form.

**Changes on `fix/185-mobile-accessibility-privacy-regressions`:**
- Associate duplicate-subject errors with every affected subject select.
- Map supported-subject validation errors to the relevant subject field.
- Add Playwright regressions for fractional, negative, blank and over-range marks; duplicate-subject field association; missing-stage association/reset; and desktop overflow while displaying results.
- Reuse existing 320px, light/dark axe, keyboard-focus, privacy instrumentation, reload and reset coverage rather than duplicating it.

**Verification:** no local commands were executed. Candidate branch CI has not yet been observed at the time of this update. Report tests as pending until CI provides exact-commit evidence. Manual keyboard walkthrough, screen-reader review, physical-device/browser matrix, provider/hosting logs, and full external telemetry audit remain unrun/blocked. G-SYN-001 remains OPEN / NOT PASSED; no deployment, provisioning or real learner data is approved.


# Product differentiation planning update — 2026-10-24

**Trigger:** Mentor feedback from Ronny Mabokela (University of Johannesburg) said that many solutions address the same problem and StudyPath SA should be more unique.

**Documentation added on branch `docs/three-pillar-differentiation`:** [THREE-PILLAR-DIFFERENTIATION.md](../product/THREE-PILLAR-DIFFERENTIATION.md), linked from the end-product UX vision and requirements traceability matrix.

**Three pillars recorded:** (1) explain what a learner's actual marks support, (2) discover evidence-backed alternative routes when a preferred pathway is blocked or uncertain, and (3) organise manual application-preparation next steps, with deadlines/funding shown only when source-backed.

**Existing-scope reconciliation:** Pillar 1 is partly present in the existing local journey; source-backed APS is already tracked in #189 and still depends on official rule confirmation. Pillar 2 is already represented by REQ-ALT-001 but approved relationships and a complete alternatives flow are not evidenced. Pillar 3 is present in target UX / REQ-APP-001 and REQ-FUND-001 but the tracker and funding flow are explicitly not implemented in the current local demo. This documentation does not claim uniqueness, learner validation or feature completion.

**Guardrails:** no invented alternatives, progression rules, costs, deadlines or funding; keep draft-catalogue results UNKNOWN; no application submission, cloud provisioning, persistent learner data or production deployment. G-SYN-001 remains OPEN / NOT PASSED. Implementation must follow existing P0 stability and evidence prerequisites.


---

## Issue #185 evidence reconciliation — 2026-10-24

**Reviewed main commit:** 4204f0b8bf350e4d7d7b7d890c47038415c5aabc (merge of PR #202). This section supersedes earlier Issue #185 notes in this file that describe the targeted regression tests or CI evidence as pending.

**Repository scripts verified from package.json:**
- npm test — node --test
- npm run build — vite build
- npx playwright test — browser E2E suite (separate command; Playwright config starts the Vite dev server on localhost).

**GitHub Actions completed successfully on the exact reviewed SHA:**
- [Browser E2E, privacy and accessibility — run 40107386820](https://github.com/s1xte3n/studypath-sa/actions/runs/40107386820)
- [Browser MVP build — run 40107386703](https://github.com/s1xte3n/studypath-sa/actions/runs/40107386703)
- [Contract tests — run 40107386834](https://github.com/s1xte3n/studypath-sa/actions/runs/40107386834)
- [UJ eligibility golden-case verification — run 40107386706](https://github.com/s1xte3n/studypath-sa/actions/runs/40107386706)

**Source-reviewed automated coverage:** valid/corrected and invalid learner journeys; field-associated missing-stage, mark and duplicate-subject errors; malformed, fractional, negative, blank and out-of-range marks; draft-catalogue outcomes remaining UNKNOWN; provisional APS guardrails; result details; recoverable empty filter results; reset of form/results/shortlist/tracker state; reload and fresh-tab non-restoration; URL/storage/cookie and instrumented request/console/error-channel privacy checks; keyboard focus; 320px mobile and desktop result overflow; axe checks in light and dark themes; dark-theme contrast checks.

**Evidence limits / outstanding manual work:** the assistant did not execute a local clean install, npm test, Playwright or build. The linked CI runs are remote CI evidence, not local reproduction. A human manual keyboard walkthrough, screen-reader review, physical-device/browser-matrix checks, and hosting/provider log plus external telemetry review have not been evidenced. Browser instrumentation only observes the channels and scenarios explicitly exercised; it is not proof of zero leakage across all platform/hosting channels.

**Disposition:** the implementation-level regression coverage and exact-SHA CI are evidenced. Issue #185 must remain open until the remaining manual/privacy evidence is recorded or explicitly marked blocked with an owner and accepted scope. G-SYN-001 remains **OPEN / NOT PASSED**; the UJ 2027 catalogue remains DRAFT_NOT_FOR_DEFINITIVE_SCREENING, and all draft-catalogue eligibility results must remain UNKNOWN. No deployment, cloud provisioning, real learner data, or production-readiness claim is approved.


## APS hackathon heuristic update — 2026-10-24

**Status:** proposed in PR; not merged or CI-verified.

Online research found UJ's public FAQ says APS uses the six best school subjects excluding Life Orientation, while including required programme subjects. UKZN and UCT publish similar but institution-specific variants. The hackathon implementation therefore proposes a provisional general estimate using the six highest supported non-LO achievement levels, plus an optional `requiredSubjects` input that forces programme-required subjects into the six before filling remaining places with the highest levels. The UI explicitly warns that the general score is not programme-specific.

This is a demo heuristic, not a definitive UJ 2027 rule approval. Programme matching remains `UNKNOWN` because the catalogue has no curator-approved programme records. The prospectus/source audit and production verification remain open. G-SYN-001 remains OPEN / NOT PASSED. See [PR #208](https://github.com/s1xte3n/studypath-sa/pull/208) for acceptance reconciliation and [PR #209](https://github.com/s1xte3n/studypath-sa/pull/209) for the hackathon implementation proposal.
\n\n## Issue #203 — NSC and APS distinction implementation candidate (2026-10-24)

**Reviewed `main` baseline:** `0a5809816e43ce67c371e89ed6e6a22e9d4ee71e` (PR #211 merge). The GitHub remote repository was inspected; no local checkout or local working-tree state was available.

**Source review:** the Department of Basic Education subject-choice page states that the NSC requires seven subjects and identifies four compulsory subject categories. The DBE NSC examination FAQ describes NSC minimum requirements and distinguishes Higher Certificate, Diploma and Bachelor admission requirements. These sources are recorded in `docs/product/NSC-AND-APS-DISTINCTION.md`. This research does not authorize an NSC pass calculator or encode thresholds without policy/version and reviewer approval.

**Candidate changes on `feat/203-nsc-aps-distinction`:** learner-facing copy distinguishes the seven-subject NSC profile from the six-subject provisional UJ APS input; official DBE subject guidance is linked; unit and browser assertions verify that a seven-subject input does not trigger automatic subset selection and that the APS estimate is not an NSC pass decision.

**Verification:** GitHub contents writes created the candidate branch changes. Tests/build have not been executed by the assistant, and CI is pending until the PR is opened. Do not claim the candidate passes until exact-head workflows complete.

**Unchanged safeguards:** no NSC pass/access-level calculator; no arbitrary top-six selection; UJ draft-catalogue programme eligibility remains `UNKNOWN`; synthetic data only; no deployment/provisioning. G-SYN-001 remains **OPEN / NOT PASSED**. Issue #185 manual keyboard/screen-reader, device/browser and external hosting/privacy evidence remains open.
