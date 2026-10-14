# Phase 2 — Requirements and Verification Readiness Plan

**Status:** Working plan; not a gate-passage record.  
**Current verified phase:** Phase 2 — Requirements Matrix and Traceability.  
**Gate:** `REQUIREMENTS READY` — **NOT PASSED**.  
**Baseline:** Approved `docs/product/PRD.md` and `docs/product/ACCEPTANCE-CRITERIA.md` (2026-10-14).  
**Purpose:** Define what must be settled before implementation, what will be proved during implementation, and what evidence is required to pass each gate.

## 1. Rules for evidence and status

- **Requirement/decision approved** means the owner approved the rule or scope; it does not mean it is implemented or tested.
- **Prepared** means the contract, test case, evidence procedure or review checklist exists.
- **Implemented** means code/configuration exists at a reviewed commit.
- **Executed** means the named command or test ran against the identified revision/environment and produced retained output.
- **Passed** means the actual result meets the stated acceptance threshold.
- **Blocked** means a dependency or required evidence is missing. A blocked test is not a pass.
- **Not applicable/deferred** requires a documented scope decision; do not silently omit it.

Every evidence record should identify requirement/test ID, commit SHA, command or procedure, environment/browser where relevant, date, outcome, and a link/path to sanitized output. Never retain learner values, secrets, tokens, or sensitive provider data in evidence.

## 2. Work that must be completed or explicitly dispositioned before implementation

| Work item | Required pre-implementation outcome | Existing evidence / location | Owner action and closure evidence | Status |
|---|---|---|---|---|
| P2-01 Requirements traceability | Every in-scope PRD requirement maps to acceptance criteria, test IDs, planned component/API contract, and evidence needed for release | `docs/requirements/REQUIREMENTS-MATRIX.md` | Audit the matrix against the full PRD and acceptance criteria; fix missing IDs, incorrect mappings, and ambiguous status labels; record review commit | OPEN |
| P2-02 Programme eligibility oracle (GAP-001) | Only complete, cycle-specific, curator-approved rules may produce `ELIGIBLE`; unknown or conflicting material rules have deterministic expected outcomes | `docs/product/PROGRAMME-CATALOGUE-REGISTER.md`; `docs/product/UJ-2027-SOURCE-RECONCILIATION-MATRIX.md`; `docs/product/UJ-2027-CURATOR-REVIEW-PACK.md` | Finish source-level rule extraction for 6–8 pilot records, record formula/inclusions/exceptions, resolve or quarantine conflicts, and sign off record-level expected outcomes | OPEN |
| P2-03 Subject contract | Supported canonical subject IDs and aliases are explicit; unsupported or ambiguous values never silently map to a different subject | `docs/product/SUBJECT-NORMALIZATION-CONTRACT.md`; `docs/product/SUBJECT-CATALOGUE-V1-APPROVAL.md`; `tests/contracts/subject-catalogue-v1.test.mjs` | Confirm approved vocabulary and any remaining scope boundaries; preserve existing contract tests and identify their intended app integration point | OWNER-APPROVED CONTRACT; integration unverified |
| P2-04 Relationship evidence (GAP-003) | No relationship is shown as a verified alternative or articulation without source-backed evidence and curator sign-off | `docs/product/PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md` | Either supply verified evidence for each published relationship or explicitly ship no unverified relationships; define test fixtures for missing/conflicting/expired evidence | OPEN |
| P2-05 Funding catalogue (GAP-005) | 3–5 official opportunities have verified criteria, cycle/deadline, freshness, provenance and sign-off; unsupported/sensitive criteria stay unknown | PRD, acceptance criteria, requirement-gap register | Curate and review actual records; verify deadlines and official provider links; prepare deterministic expected outcomes and expired/unknown cases | OPEN |
| P2-06 Privacy and data-flow boundary | Confirm the initial API-first interpretation: public catalogue records only; all learner inputs, results and tracker state remain client-memory-only and never leave the browser | `docs/architecture/ARCHITECTURE.md`; `docs/architecture/API-CONTRACT.md`; `docs/requirements/GAP-002-PRIVACY-VERIFICATION-PLAN.md`; D-044 / Q-018 / OR-019 | Record explicit owner confirmation of catalogue-only API and client-side matching, or stop for change control. Inventory all intended network destinations and hosting/provider metadata to review | OPEN |
| P2-07 Runtime/API feasibility (GAP-008 / Q-018) | Runtime composition, API Management necessity, endpoint schemas, failure/cache behavior, and provider logging/retention review are settled sufficiently to approve dependent implementation | Draft `docs/architecture/ARCHITECTURE.md` and `docs/architecture/API-CONTRACT.md` | Approve or revise runtime diagram and contract; document response schemas, validation, errors, cache/freshness, timeout/retry, CORS and contract tests. No learner profile fields or write routes | OPEN |
| P2-08 Cost and provisioning guard | Exact planned resource list and quotas are reviewed against the R100/month hard cap; no resources are created without explicit approval | `docs/project/AZURE-COST-ESTIMATE.md`; `docs/project/DECISIONS.md` | Revalidate pricing, quotas, region and billing scope for the approved design; record estimate assumptions and owner approval. If local-only testing can establish the slice, do that first | OPEN |
| P2-09 Test strategy (Phase 6 dependency) | Each requirement has planned test level, fixture, steps, assertions, pass threshold, evidence format and failure handling | `docs/requirements/REQUIREMENTS-MATRIX.md`; privacy plan; acceptance criteria | Review/approve the consolidated test plan before relying on implementation results | OPEN |
| P2-10 Repo/tooling baseline | Agree on app scaffold, supported Node/runtime versions, lockfile, local commands, lint/test/build checks and intended CI evidence | Owner-supplied inventory recorded in `docs/project/PROJECT-STATUS.md` | Reconfirm the current main tree before adding app source; document versions and reproducible commands in the implementation PR | OPEN |

**Implementation entry rule:** Items P2-01 through P2-09 must be closed or explicitly dispositioned by the accountable owner before dependent implementation is approved. P2-10 may be completed as the first approved implementation task after the earlier architecture/interface/test decisions are sufficiently stable. No cloud provisioning is implied or authorized by this plan.

## 3. Evidence to produce during implementation

| Evidence ID | Requirement area | Planned check | Pass condition | Evidence retained |
|---|---|---|---|---|
| EV-INPUT | REQ-EXP-001 | Automated validation tests for required fields, marks 0/100, decimals, malformed/range errors, duplicate canonical subjects, unsupported subjects and stage-specific interpretation | All approved acceptance cases pass; invalid data never generates recommendations; no silent coercion/defaults | Test output tied to commit SHA |
| EV-CATALOGUE | REQ-CAT-001 | Catalogue schema/provenance audit and source review | 6–8 distinct pilot records are complete, current, cycle-specific and curator-signed-off; no unresolved material conflict is treated as authoritative | Versioned catalogue, source URLs/verification dates, review checklist |
| EV-ELIGIBILITY | REQ-MAT-001 | Deterministic evaluator unit tests plus versioned synthetic golden set of at least 20 cases | 100% expected-classification agreement; **zero false-positive `ELIGIBLE`**; repeated inputs/version produce identical states and reasons | Fixture version, command, sanitized test report |
| EV-RELATIONSHIP | REQ-ALT-001 | Relationship provenance and uncertainty tests | No unverified relationship is described as confirmed articulation or guaranteed progression | Reviewed relationship records and test output |
| EV-FUNDING | REQ-FUND-001 | Funding rules, deadlines, stale/expired/unknown and sensitive-criterion tests | 3–5 verified official opportunities; missing/unsupported sensitive criteria remain unknown; no invented deadline/amount/eligibility | Versioned records, source review, test output |
| EV-TRACKER | REQ-APP-001 | Allowed/blocked state transitions and lifecycle tests | Only approved transitions occur; tracker is memory-only; Reset clears tracker state | Test output and reset assertions |
| EV-PRIVACY | REQ-PRV-001 | Execute all PRIV-001–PRIV-012 checks in `GAP-002-PRIVACY-VERIFICATION-PLAN.md` against a runnable browser build | No learner sentinel in network requests, URL/history, storage, console, telemetry, errors or app logs; reset/reload behavior conforms; provider metadata/retention reviewed | Sanitized browser reports, destination inventory, config/retention review |
| EV-API | Draft API contract | Contract tests, schema validation, timeout/failure/malformed/stale-response tests | Only approved public catalogue fields/routes; invalid or stale responses never fabricate results; bounded recoverable errors; no learner values transmitted | Contract-test report and approved schema version |
| EV-UX | REQ-UX-001 | Keyboard, focus, label/error association, responsive layout, state semantics and supported-browser checks | All approved accessibility/usability criteria pass at agreed viewport/browser matrix; no critical journey blocked by keyboard or validation | Browser/version/viewport, automated and manual check records |
| EV-QUALITY | Cross-cutting | Clean install, lint, unit/contract tests, production build and CI run | Commands succeed on a clean checkout; dependency lockfile is committed; CI result is green for the reviewed commit | CI URL/run ID, commands and commit SHA |
| EV-RELEASE | Release readiness | Final scope/security/privacy/catalogue/accessibility/cost checklist and smoke test | All release blockers pass or are explicitly blocked from public demo; no claim of admission guarantee, real-learner-data clearance or unverified deployment | Signed checklist and sanitized smoke-test evidence |

## 4. Privacy verification detail

Use only the synthetic sentinels defined in the privacy plan. The automated harness must inspect fetch, XHR, beacon, WebSocket, navigation, URL/history, browser storage, cookies/cache, console and error/telemetry sinks. Tests must not print the sentinel payloads into logs.

A passing browser test alone does not prove hosting-provider retention. Before public use, separately inspect actual hosting/API configuration and available provider logs, identify technical metadata collected, access controls and retention, and document limitations. If provider evidence is inaccessible, record the check as blocked and do not claim the privacy gate passed.

## 5. Gate rules

### Phase 2 — `REQUIREMENTS READY`

Pass only when:
- The requirements matrix is reviewed against the approved PRD and acceptance criteria, with no missing or contradictory in-scope mappings.
- Each requirement has acceptance criteria, test IDs, a planned implementation/interface location, and evidence/pass criteria.
- P0 gaps affecting correctness, privacy or architecture are closed or have an explicitly approved, safe disposition.
- Catalogue and relationship uncertainties cannot be interpreted as permission to publish unverified data.
- API/runtime/privacy/cost boundaries are approved sufficiently for downstream design.
- Deferred scope and open questions have owners and explicit dispositions.
- The review commit and gate decision are recorded in `docs/project/PROJECT-STATUS.md`.

### Phase 3–6 gates

Each gate requires its own reviewed artifact and explicit pass decision. A draft architecture, draft API contract, planned test, owner assertion or green documentation-only PR is not equivalent to runtime evidence.

### Phase 7 implementation gate

Pass only when the approved application and its core journey exist at a reviewed commit; required tests have actually executed; all mandatory acceptance thresholds pass; privacy and eligibility evidence is retained; failures are fixed or explicitly block release; and the evidence ledger points to reproducible results. A successful build or HTTP 2xx response alone is insufficient.

## 6. Current limitations and prohibited claims

- The repository status record reports no verified application source, package manifest/lockfile, API implementation, CI workflow, infrastructure or deployment. Reconfirm the live `main` tree before implementation; this plan does not independently prove the local workspace state.
- The owner-supplied subject contract command reports 12 passed / 0 failed. It is evidence for that contract test only, not application behavior, eligibility correctness or privacy.
- No runnable application, browser privacy run, CI result, Azure resource or deployment is established by this document.
- Synthetic data only. No real learner data until applicable privacy/legal review and implementation verification are complete.
- R100/month is a hard cap. No provisioning without exact resource/cost review and explicit approval.
- Never claim admission or funding is guaranteed, never invent catalogue data, and never represent an unverified result as `ELIGIBLE`.

## 7. Immediate next actions

1. Review `docs/requirements/REQUIREMENTS-MATRIX.md` against every requirement and acceptance criterion; produce a precise gap list rather than rewriting approved requirements.
2. Resolve the catalogue-only API/client-side matching decision and document the outcome under Q-018/OR-019.
3. Close or disposition P0 programme, subject, relationship, funding and privacy evidence gaps.
4. Approve architecture and API contract; finish the executable test strategy.
5. Update `docs/project/PROJECT-STATUS.md` only after evidence supports the phase/gate status.

**Current decision:** Continue Phase 2. Phase 7 is not approved or passed by this plan.
