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
| Project overview | `docs/project/PROJECT-OVERVIEW.md` | Present in repository |
| Project status | `docs/project/PROJECT-STATUS.md` | Updated in readiness evidence branch; merge pending |
| Decisions and assumptions | `docs/project/DECISIONS.md` | Present in repository |
| Open questions | `docs/project/OPEN-QUESTIONS.md` | Updated in readiness evidence branch; merge pending |
| Project charter | `docs/project/PROJECT-CHARTER.md` | Present in repository |
| Artifact index | `docs/project/ARTIFACT-INDEX.md` | Updated in readiness evidence branch; merge pending |
| PROJECT READY evidence pack | `docs/project/PROJECT-READY-EVIDENCE.md` | Draft in readiness evidence branch; owner review and evidence still required |

## Accepted Phase 0 decisions
- Primary MVP journey is anonymous-first: learner enters subjects/marks and interests, sees explainable pathway matches and eligibility/uncertainty, and follows official-source next steps.
- Defer document uploads, AI chat, application submission, cross-session saved pathways and manual application tracking from the initial MVP.
- Start with a small, manually curated official-source catalogue.
- Enforce R100/month maximum total spend; prefer free tiers and validate costs, quotas and overages before provisioning.
- Use synthetic development data and minimise personal data.
- Do not provision Azure until subscription/tenant access, permissions, cost controls and deployment responsibility are confirmed.
- Record named accountable owners for product, catalogue/data, cloud, security/privacy and release/demo readiness.

## Readiness evidence status
| Requirement | Current evidence | Remaining blocker |
|---|---|---|
| Catalogue | Candidate official sources, permitted-use cautions, provenance fields and proposed cadence drafted | Approval, curator/backup and verified records |
| Cloud | No Azure subscription/access evidence | Confirm subscription/tenant, permissions and named owner |
| Budget | Preliminary official pricing screen and cost controls drafted | Saved all-in regional estimate, expiry/overage review and budget approval |
| Privacy | Proposed data inventory, minimisation, retention and incident process drafted | Named owner, applicable consent/privacy review and explicit approval |
| Accountability | Role matrix created with placeholders | Actual names, role acceptance and availability |
| Hackathon | General app criteria and deliverables extracted from supplied programme | Verify Sonke profile/team registration and exact deadline |

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
Complete P0 evidence and named ownership, obtain owner/team approval, and explicitly record PROJECT READY as passed before PRD refinement.
