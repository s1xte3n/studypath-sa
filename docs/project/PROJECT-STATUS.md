# StudyPath SA — Project Status

**Status:** Phase 0 — Discovery in progress  
**Gate:** `PROJECT READY` — **BLOCKED / NOT PASSED**  
**Last updated:** 2026-10-13

## Verified repository state
- Repository: https://github.com/s1xte3n/studypath-sa
- Visibility: private; default branch: `main`.
- Connected GitHub integration reports admin, read and write permissions.
- Initial root listing contained `README.md` only; README content is a project title and one-line description.
- Phase 0 baseline documentation and accepted direction decisions are present in the project documentation.
- The PROJECT READY evidence pack was merged via PR #4. A follow-up owner-confirmation update is in review.
- This is remote repository inspection. Local working-tree state has not been inspected.

## State by area

| Area | Status |
|---|---|
| Product specification, hackathon programme, development SOP | Supplied project references; the hackathon programme has now been reviewed for app criteria and submission requirements |
| Documented React/Vite + Azure stack | Owner-confirmed baseline; not provisioned/validated |
| Application source and dependencies | Not found in initial root listing; no implementation verified |
| Tests, CI workflows, infrastructure, database, deployment | Not yet verified; no execution evidence available |
| MVP journey | Direction accepted: anonymous learner journey from subject/mark/interest inputs to explainable pathways, eligibility/uncertainty and official next steps |
| Catalogue | Candidate official sources, provenance fields and a proposed cadence documented in the draft evidence pack; curator, permitted-use approval and verified catalogue records outstanding |
| Budget | R100/month hard cap accepted; preliminary service screen identifies Azure PostgreSQL as a material risk; all-in regional estimate and cost approval outstanding |
| Privacy and identity | Proposed data inventory, browser-only handling, retention and incident process documented for review; privacy/consent review and named owner outstanding |
| Azure subscription and accountable owners | Owner confirms a subscription exists and is theirs; permissions/billing visibility are not independently verified. Owner will hold all roles for now; no backup/independent reviewer. |
| Hackathon | Owner confirms Sonke team profile is complete and this is a new app being developed before the event; profile not independently inspected and exact deadline remains unconfirmed |

## Completed
- Confirmed repository identity, private visibility, default branch and integration permissions.
- Inspected the root listing and README.
- Established Phase 0 documentation and recorded the accepted MVP, budget, privacy, anonymous-first and no-provisioning directions.
- Reviewed the supplied product specification for the catalogue/provenance and deterministic eligibility guardrails.
- Reviewed the supplied hackathon programme: team profiling, app eligibility, deck/video, SSDLC, Lean Business Canvas and submission timing.
- Researched official Azure pricing/documentation pages for the preliminary budget screen.
- Merged `docs/project/PROJECT-READY-EVIDENCE.md` via PR #4; the pack does not constitute approval or gate passage.
- Recorded owner confirmations: one person holds all roles for now; Azure subscription exists and is owned by the project owner; team is profiled on Sonke; this is a new app being developed before the hackathon.

## Remaining P0 blockers
1. Approve catalogue scope/source-use policy/cadence and create verified admission records; the owner is curator but no backup is appointed.
2. Inspect Azure tenant/subscription details, effective permissions and billing visibility; ownership is owner-confirmed, not independently verified.
3. Produce an all-in estimate including credit expiry, overages and non-Azure costs, and record cost approval. PostgreSQL is a material risk against R100/month.
4. Complete privacy/security review of the learner-data inventory, applicable consent questions, notice, retention/deletion and incident handling. Owner is assigned, but review evidence and private incident contact route remain outstanding.
5. Assess the concentration risk of one person holding every role; arrange independent review if feasible before learner-facing release.
6. Independently verify Sonke profile visibility and confirm exact submission deadline/upload procedure.

## Resolved in principle
- MVP journey and key exclusions.
- Anonymous exploration first; defer cross-session saves and manual tracking.
- Start with a small manually curated catalogue from official sources.
- Hard R100/month total spend cap; no provisioning before cost/access approval.

These decisions set direction but do not by themselves provide the evidence required to pass the gate.

## Evidence limitations
- No application tests, build, security scan, cloud resource, deployment or CI run has been performed or verified.
- Azure subscription ownership is owner-confirmed; tenant details, effective permissions, billing visibility and service access have not been inspected.
- Pricing review is a preliminary screen of official pricing pages, not a saved Pricing Calculator quote; final regional prices, currency conversion, tax, usage assumptions and credits remain unverified.
- The catalogue source list is a draft plan, not a populated or approved catalogue. Source availability does not itself establish permission to reproduce content.
- General hackathon requirements are extracted from the supplied programme. Owner confirms Sonke profiling and new-app status, but profile visibility and exact deadline have not been independently inspected.
- The absence of files in the initial root listing is not a complete audit of every branch or historical commit.

## Next gate
Resolve the P0 items, review and approve the Phase 0 artifacts, then explicitly record PROJECT READY approval before starting PRD work. No application implementation or cloud provisioning is authorised by this evidence-documentation change.
