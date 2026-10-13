# StudyPath SA — Artifact Index

**Last updated:** 2026-10-13  
**Phase:** 1 — PRD and requirements planning  
**Gate:** PROJECT READY — PASSED for Phase 1 planning only

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
| Project status | `docs/project/PROJECT-STATUS.md` | Updated on main; Phase 1 planning authorized |\n| Master project checklist | `docs/project/MASTER-PROJECT-CHECKLIST.md` | Added on 2026-10-13; Phase 0 explicitly recorded as passed for Phase 1 planning only |
| Decisions and assumptions | `docs/project/DECISIONS.md` | Present in repository |
| Open questions | `docs/project/OPEN-QUESTIONS.md` | Updated on main; downstream work tracked |
| Project charter | `docs/project/PROJECT-CHARTER.md` | Present in repository |
| Artifact index | `docs/project/ARTIFACT-INDEX.md` | Updated on main |
| PROJECT READY evidence pack | `docs/project/PROJECT-READY-EVIDENCE.md` | Baseline pack retained; see completed `PHASE0-MANUAL-EVIDENCE-PACK.md` and `PHASE0-ONLINE-EVIDENCE.md` for gate decision and evidence distinctions |
| Phase 0 online evidence | `docs/project/PHASE0-ONLINE-EVIDENCE.md` | Official UJ/Microsoft source checks, hackathon programme summary, owner attestations, and Phase 0 gate decision |

## Accepted Phase 0 decisions
- Primary MVP journey is anonymous-first: learner enters subjects/marks and interests, sees explainable pathway matches and eligibility/uncertainty, and follows official-source next steps.
- Defer document uploads, AI chat, application submission, cross-session saved pathways and manual application tracking from the initial MVP.
- Start with a small, manually curated official-source catalogue.
- Enforce R100/month maximum total spend; prefer free tiers and validate costs, quotas and overages before provisioning.
- Use synthetic development data and minimise personal data.
- Do not provision Azure until subscription/tenant access, permissions, cost controls and deployment responsibility are confirmed.
- Record named accountable owners for product, catalogue/data, cloud, security/privacy and release/demo readiness.

## Readiness evidence status

The owner approved the six decision records and attests that account-specific checks are complete. Official UJ and Microsoft public sources and the supplied hackathon programme are recorded in `docs/project/PHASE0-ONLINE-EVIDENCE.md`. PROJECT READY passed on 2026-10-13 for PRD/planning only. Owner attestations are not represented as independently inspected Azure portal evidence.
| Requirement | Current evidence | Remaining blocker |
|---|---|---|
| Catalogue | Two official UJ programme pages checked; source/provenance and UNKNOWN boundary recorded | Full admission prediction remains out of scope; validate/refresh before releases; no backup curator |
| Cloud | Owner attests subscription/access and permission checks complete; no sensitive account evidence stored in repo | Recheck planned resource permissions before provisioning; assistant did not access Azure portal |
| Budget | Official Microsoft plan/quota pages checked; owner attests budget and billing checks complete | Keep private cost evidence; recheck every intended paid/metered resource before provisioning |
| Privacy | Synthetic-only boundary approved and owner assigned | Verify actual implementation, telemetry/logging, notice and applicable privacy/legal review before public learner-facing use |
| Accountability | Role matrix created with placeholders | Actual names, role acceptance and availability |
| Hackathon | Supplied programme reviewed; owner confirms Sonke profile and new-app status | Verify displayed portal timezone/file limits at submission; build all required deliverables |

## Repository evidence
- Private repository: https://github.com/s1xte3n/studypath-sa
- Default branch: `main`
- Initial root listing: `README.md` only.
- No application code, tests, CI/CD, infrastructure or deployment have been verified by the initial inspection.

## Planned artifacts / status
| Artifact | Status | Dependency |
|---|---|---|
| PRD and user stories | Not started | PROJECT READY approval |
| Requirements and traceability matrix | Not started | PRD approval |
| Architecture and ADRs | Not started | Requirements baseline |
| API/interface contracts | Not started | Architecture/requirements |
| Environment and secret inventory | Not started | Approved contracts and deployment plan |
| Test strategy and test cases | Not started | Requirements/contracts |
| Implementation, security review and CI/CD | Not started | Approved upstream artifacts |
| Release and smoke-test evidence | Not available | Implemented/deployed release |
| Deck, demo video, Lean Business Canvas and SSDLC evidence | Not started/verified | Team profile and hackathon submission plan |

## Evidence rules
“Draft” is not approval. “Not verified” does not prove an external artifact does not exist. Never claim implementation, tests, builds, provisioning or deployment without direct evidence. Update this index when artifacts are created, reviewed, approved or superseded.

## Gate
PROJECT READY passed on 2026-10-13 for Phase 1 PRD and requirements planning only. This does not establish implementation, tests, cloud provisioning or deployment. Next deliverables: approved PRD, requirements matrix and traceability.

| Phase 0 resolution proposal | `docs/project/PHASE0-RESOLUTION-PROPOSAL.md` | Retained as historical proposal; subsequent owner approvals and Phase 0 gate disposition are recorded in `PHASE0-MANUAL-EVIDENCE-PACK.md`, `PHASE0-ONLINE-EVIDENCE.md`, and `PROJECT-STATUS.md` |
