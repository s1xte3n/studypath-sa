# StudyPath SA — Artifact Index

**Last updated:** 2026-10-14  
**Phase:** 2 — Requirements matrix and traceability  
**Gate:** Phase 0 `PROJECT READY` passed for Phase 1 planning only; Phase 1 `PRD READY` **passed on 2026-10-14** after explicit owner approval of the revised PRD and measurable acceptance criteria. Phase 2 requirements traceability remains outstanding.

## Source-of-truth references

| Artifact | Supplied filename | Purpose |
|---|---|---|
| Product and technical specification | `SPEC-1-StudyPath-SA.txt` | Product scope and documented technical baseline |
| Hackathon programme | `FNB AOTY Hackathon 2026 - Programme.pdf` | Competition rules and deliverables |
| Software development SOP | `Standard_Project_Operating_Procedure_Software_Development_Final.docx` | Lifecycle, quality gates and process |

These references were supplied in the project conversation; they are not yet stored in this repository.

## Phase 0 artifacts

| Artifact | Path | Status |
|---|---|---|
| Project overview | `docs/project/PROJECT-OVERVIEW.md` | Present in repository |
| Project status | `docs/project/PROJECT-STATUS.md` | Updated on main; Phase 1 planning authorized |
| Master project checklist | `docs/project/MASTER-PROJECT-CHECKLIST.md` | Present; Phase 0 recorded as passed for Phase 1 planning only |
| Decisions and assumptions | `docs/project/DECISIONS.md` | Present in repository |
| Open questions | `docs/project/OPEN-QUESTIONS.md` | Present in repository; downstream work tracked |
| Project charter | `docs/project/PROJECT-CHARTER.md` | Present in repository |
| Artifact index | `docs/project/ARTIFACT-INDEX.md` | Updated on this PR branch |
| PROJECT READY evidence pack | `docs/project/PROJECT-READY-EVIDENCE.md` | Baseline pack retained; consult Phase 0 evidence files for gate decision and evidence distinctions |
| Phase 0 online evidence | `docs/project/PHASE0-ONLINE-EVIDENCE.md` | Official UJ/Microsoft source checks, programme summary, owner attestations and Phase 0 gate decision |

## Accepted Phase 0 decisions

- Primary MVP journey is anonymous-first: learner enters subjects/marks and interests, sees explainable pathway matches and eligibility/uncertainty, and follows official-source next steps.
- Defer document uploads, AI chat, direct application submission, cross-session saved pathways and authenticated profiles.
- Include funding matching (M4) and manual application tracking (M5) in the intended MVP at P1 / medium priority, behind the P0 core pathway-discovery journey. OR-015 funding rules and OR-016 tracker lifecycle/field rules are approved; tracker entries are page-memory-only and no persistence mechanism is in scope.
- Start with a 6–8 record manually curated official-source pilot, prioritising Gauteng; qualification types are included only where supported by official evidence. No national coverage claim.
- Enforce R100/month maximum total spend; prefer free tiers and validate costs, quotas and overages before provisioning.
- Use synthetic development data and minimise personal data.
- Do not provision Azure until subscription/tenant access, permissions, cost controls and deployment responsibility are confirmed.
- Record accountable owners for product, catalogue/data, cloud, security/privacy and release/demo readiness.

## Readiness evidence status

The owner approved the Phase 0 decision records and attests that account-specific checks are complete. Official UJ and Microsoft public sources and the supplied hackathon programme are recorded in `docs/project/PHASE0-ONLINE-EVIDENCE.md`. PROJECT READY passed for PRD/planning only. Owner attestations are not represented as independently inspected Azure portal evidence.

| Requirement | Current evidence | Remaining blocker |
|---|---|---|
| Catalogue | Two official UJ programme pages checked; OR-008 sets a 6–8 curated programme-record target prioritising Gauteng; OR-005/007 source and eligibility boundaries recorded | Actual publication-ready records, relationship evidence and curator review records remain outstanding; no backup curator/independent reviewer confirmed |
| Cloud | Owner attests subscription/access and permission checks complete | Recheck planned resource permissions before provisioning; assistant did not access Azure portal |
| Budget | Official Microsoft pages checked; owner attests budget/billing checks complete | Recheck planned resources and private cost evidence before provisioning |
| Privacy | Synthetic-only boundary approved | Verify implementation, telemetry/logging, notice, retention and applicable privacy/legal review before public use |
| Accountability | Role matrix exists | Confirm role acceptance/availability; currently one person holds all roles |
| Hackathon | Supplied programme reviewed; owner confirms Sonke profile and new-app status | Verify portal timezone/upload details and complete all deliverables |

## Repository evidence

- Private repository: https://github.com/s1xte3n/studypath-sa
- Default branch: `main`.
- Initial root listing: `README.md` only; no application source, tests, CI/CD, infrastructure or deployment verified in the initial inspection.
- Project owner supplied local status on 2026-10-14: branch `main`, clean working tree, synchronized with `origin/main`. This was owner-supplied command output, not direct local filesystem inspection by the assistant.
- Owner confirmed the project has not been deployed and no project Azure resources have been provisioned.

## Phase 1 product artifacts

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Product requirements document | `docs/product/PRD.md` | Draft — owner review required | Feature specifications include actors, preconditions, triggers, inputs, rules, success/failure, permissions, edge cases, dependencies, acceptance links, NFRs and exclusions |
| User stories/use cases | `docs/product/USER-STORIES.md` | Draft | Stories and core use cases mapped to requirement IDs |
| Acceptance criteria | `docs/product/ACCEPTANCE-CRITERIA.md` | Draft | Candidate testable criteria for every MVP requirement; no test execution implied |
| Scope | `docs/product/SCOPE.md` | Draft | P0 core journey plus P1 medium-priority funding matching and manual tracking; implementation boundaries remain open |
| Open requirements | `docs/product/OPEN-REQUIREMENTS.md` | OR-001–OR-018 policy decisions recorded; OR-016 lifecycle and page-memory-only persistence aligned | Funding records and tracker implementation evidence remain outstanding; any future persistence would require separate change control |

## Planned downstream artifacts

| Artifact | Status | Dependency |
|---|---|---|
| Requirements and traceability matrix | Not started | PRD approval |
| Architecture and ADRs | Not started | Approved requirements |
| API/interface contracts | Not started | Requirements and architecture |
| Environment and secret inventory | Not started | Approved contracts and deployment plan |
| Test strategy and test cases | Not started | Approved requirements/contracts |
| Implementation, security review and CI/CD | Not started | Approved upstream artifacts |
| Release and smoke-test evidence | Not available | Implemented/deployed release |
| Deck, demo video, Lean Business Canvas and SSDLC evidence | Not started/verified | Hackathon submission plan |

## Evidence rules

“Draft” is not approval. “Not verified” does not prove an external artifact does not exist. Never claim implementation, tests, builds, provisioning or deployment without direct evidence. Update this index when artifacts are created, reviewed, approved or superseded.

## Gate assessment

**PRD READY: PASSED on 2026-10-14** after explicit owner approval of the revised PRD and measurable acceptance criteria. PR #22 merged the documentation alignment to `main`. This gate approves the requirements baseline only. Actual programme/funding catalogue curation, relationship evidence, test execution, privacy review, provisioning and deployment remain outstanding and are not claimed.

Phase 0 `PROJECT READY` passed for Phase 1 planning only. Current work is Phase 2 requirements traceability; `REQUIREMENTS READY` has not passed. No application implementation, test execution, Azure provisioning or deployment is claimed.

## Phase 1 PRD artifacts and approval

| Artifact | Path | Status |
|---|---|---|
| Product requirements document | `docs/product/PRD.md` | Owner-approved on 2026-10-14; `PRD READY` passed for the requirements baseline only |
| MVP acceptance criteria | `docs/product/ACCEPTANCE-CRITERIA.md` | Owner-approved on 2026-10-14; criteria are targets/test oracles, not test results |
| Policy reconciliation and review | `docs/product/POLICY-SELECTIONS-REVIEW.md` | Reconciled in PR #22, merged to `main`; see recorded owner approval in `docs/project/DECISIONS.md` |

The approval does not claim implementation, catalogue curation, test passage, privacy clearance, deployment or release readiness. Next gate: Phase 2 requirements matrix and end-to-end traceability.


## Phase 2 — Requirements matrix and traceability (updated 2026-10-14)

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Canonical requirements matrix | `docs/product/REQUIREMENTS.md` | Created — planning baseline | Nine functional requirements and eight cross-cutting NFRs mapped to priority, dependencies, logical components, acceptance criteria and planned verification IDs. |
| Traceability matrix | `docs/product/TRACEABILITY-MATRIX.md` | Created — evidence pending | Requirement → PRD/AC → contract/UI → test ID → expected implementation area → CI/release evidence. Contract, implementation, CI and release evidence remain unavailable. |
| Feature backlog | `docs/product/FEATURE-BACKLOG.md` | Created — blocked items labelled | P0 core journey sequenced before P1 funding and tracker. Ambiguous behavior is not treated as an implementation task. |
| Dependency matrix | `docs/product/DEPENDENCY-MATRIX.md` | Created — planning baseline | Functional, data, privacy and verification dependencies recorded; architecture and API boundaries are not assumed. |
| Requirement gaps | `docs/product/REQUIREMENT-GAPS.md` | Created — open; gate blocked | Records catalogue, subject vocabulary, relationship, privacy, funding, tracker AC/status and interface-boundary gaps. |
| Requirements gate | — | **NOT PASSED** | Requirement IDs and planned test IDs are present, but P0 gaps and traceability evidence remain. No implementation or tests are claimed. |

### Phase 2 evidence and limits

The five requirement artifacts were committed on branch `docs/phase-2-requirements-matrix`. This update does not claim a pull request was opened, the branch was merged, tests were executed, or implementation/deployment changed. Test IDs are planned verification identifiers only. Exact AC-FUND/AC-APP references and tracker transitions require verification before those tests are implemented. See `docs/product/REQUIREMENT-GAPS.md`.


## Phase 2 GAP resolution — 2026-10-14

| Artifact | Path | Status | Notes |
|---|---|---|---|
| Architecture decision and constraints | `docs/architecture/ARCHITECTURE.md` | Draft based on approved API-first direction | Runtime composition, privacy-boundary confirmation, provider retention and cost review remain open. |
| API interface contract | `docs/architecture/API-CONTRACT.md` | Draft — not implementation-ready | Candidate GET routes serve only public curated data. Exact schemas, cache/error semantics and runtime are pending review. |
| UJ 2027 programme catalogue register | `docs/product/PROGRAMME-CATALOGUE-REGISTER.md` | Candidate register — not publication-ready | Four UJ candidates listed; none is verified eligibility data until full rule/provenance review and curator sign-off. |
| Requirement gaps | `docs/product/REQUIREMENT-GAPS.md` | Updated — P0 evidence blockers remain | GAP-001 starting source and GAP-008 architecture direction resolved at decision level; catalogue, privacy, funding and contract evidence remain open. |

D-044 supersedes D-019's static-first selection only. Sensitive financial criteria remain excluded; unknown or unsupported criteria lead to uncertainty and official-provider direction. No implementation, tests, provisioning or deployment are claimed.
