# StudyPath SA — Artifact Index

**Last updated:** 2026-10-13  
**Phase:** 0 — Discovery  
**Gate:** PROJECT READY — NOT PASSED

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
| Project overview | `docs/project/PROJECT-OVERVIEW.md` | Updated on decision branch; merge pending |
| Project status | `docs/project/PROJECT-STATUS.md` | Updated on decision branch; merge pending |
| Decisions and assumptions | `docs/project/DECISIONS.md` | Updated on decision branch; merge pending |
| Open questions | `docs/project/OPEN-QUESTIONS.md` | Updated on decision branch; merge pending |
| Project charter | `docs/project/PROJECT-CHARTER.md` | Updated on decision branch; merge pending |
| Artifact index | `docs/project/ARTIFACT-INDEX.md` | Updated on decision branch; merge pending |

## Accepted Phase 0 decisions
- Primary MVP journey is anonymous-first: learner enters subjects/marks and interests, sees explainable pathway matches and eligibility/uncertainty, and follows official-source next steps.
- Defer document uploads, AI chat, application submission, cross-session saved pathways and manual application tracking from the initial MVP.
- Start with a small, manually curated official-source catalogue.
- Enforce R100/month maximum total spend; prefer free tiers and validate costs, quotas and overages before provisioning.
- Use synthetic development data and minimise personal data.
- Do not provision Azure until subscription/tenant access, permissions, cost controls and deployment responsibility are confirmed.
- Record named accountable owners for product, catalogue/data, cloud, security/privacy and release/demo readiness.

## Repository evidence
- Private repository: https://github.com/s1xte3n/studypath-sa
- Default branch: `main`
- Initial root listing: `README.md` only.
- Phase 0 baseline docs merged in PR #1; these decision updates are pending review.
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
| Deck, demo video, Lean Business Canvas and SSDLC evidence | Not yet verified | Hackathon programme and team plan |

## Evidence rules
“Draft” is not approval. “Not verified” does not prove an external artifact does not exist. Never claim implementation, tests, builds, provisioning or deployment without direct evidence. Update this index when artifacts are created, reviewed, approved or superseded.

## Gate
Complete remaining P0 evidence and named ownership in `OPEN-QUESTIONS.md`, obtain owner/team approval, and explicitly record PROJECT READY as passed before PRD refinement.
