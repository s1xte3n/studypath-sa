# StudyPath SA — Artifact Index

**Last updated:** 2026-10-14  
**Phase:** 1 — PRD and requirements planning  
**Gate:** PROJECT READY passed for Phase 1 planning only; **PRD READY remains blocked pending product decisions**.

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
- Defer document uploads, AI chat, application submission, cross-session saved pathways and manual application tracking from the initial MVP.
- Start with a small, manually curated official-source catalogue.
- Enforce R100/month maximum total spend; prefer free tiers and validate costs, quotas and overages before provisioning.
- Use synthetic development data and minimise personal data.
- Do not provision Azure until subscription/tenant access, permissions, cost controls and deployment responsibility are confirmed.
- Record accountable owners for product, catalogue/data, cloud, security/privacy and release/demo readiness.

## Readiness evidence status

The owner approved the Phase 0 decision records and attests that account-specific checks are complete. Official UJ and Microsoft public sources and the supplied hackathon programme are recorded in `docs/project/PHASE0-ONLINE-EVIDENCE.md`. PROJECT READY passed for PRD/planning only. Owner attestations are not represented as independently inspected Azure portal evidence.

| Requirement | Current evidence | Remaining blocker |
|---|---|---|
| Catalogue | Two official UJ programme pages checked; source/provenance and UNKNOWN boundary recorded | Refresh before release; no backup curator; catalogue pilot size not frozen |
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
| Scope | `docs/product/SCOPE.md` | Draft | MVP, P1/P2/P3, exclusions and unresolved scope conflict |
| Open requirements | `docs/product/OPEN-REQUIREMENTS.md` | Open — decisions required | P0 ambiguities and later-feature questions explicitly recorded |

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

**PRD READY: BLOCKED.** The five requested product artifacts are drafted on branch `docs/phase-1-prd`. High-impact decisions remain open, especially the conflict between funding/tracking Must Have scope in the broad specification and the narrower Phase 0 MVP cut line, the input contract, eligibility precedence, admission-cycle/source freshness, and the exact privacy/telemetry boundary. Resolve the P0 items in `docs/product/OPEN-REQUIREMENTS.md` and revise the artifacts before approving the PRD.

PROJECT READY passed for Phase 1 planning only. No application implementation, test execution, Azure provisioning or deployment is claimed.
