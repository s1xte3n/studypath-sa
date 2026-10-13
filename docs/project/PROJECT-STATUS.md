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
- A draft evidence pack is being prepared on branch `readiness/evidence-pack-2026-10-13`; it is not yet merged to `main`.
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
| Azure subscription and accountable owners | Not confirmed; subscription, permissions, approver and role names outstanding |
| Hackathon | General requirements extracted from supplied programme; team profile, account/team circumstances and exact Sonke deadline not verified |

## Completed
- Confirmed repository identity, private visibility, default branch and integration permissions.
- Inspected the root listing and README.
- Established Phase 0 documentation and recorded the accepted MVP, budget, privacy, anonymous-first and no-provisioning directions.
- Reviewed the supplied product specification for the catalogue/provenance and deterministic eligibility guardrails.
- Reviewed the supplied hackathon programme: team profiling, app eligibility, deck/video, SSDLC, Lean Business Canvas and submission timing.
- Researched official Azure pricing/documentation pages for the preliminary budget screen.
- Drafted `docs/project/PROJECT-READY-EVIDENCE.md` on the readiness evidence branch. This draft does not constitute approval or gate passage.

## Remaining P0 blockers
1. Approve the initial catalogue scope, source-use policy and verification cadence; name the curator and create actual verified records.
2. Confirm Azure subscription/tenant availability, permissions and accountable cloud owner.
3. Produce a dated all-in cost estimate for the intended region and usage, including credits expiry, overages and non-Azure costs; obtain budget sign-off and establish controls. Current PostgreSQL pricing evidence is a material risk against R100/month.
4. Obtain security/privacy review of the learner-data inventory, applicable consent questions, notice, retention/deletion and incident handling; name the owner.
5. Name the accountable product approver and product, catalogue/data, cloud, security/privacy, engineering/QA and release/demo owners.
6. Verify team-specific Sonke profiling/registration and confirm the exact submission deadline and requirements with the platform/organisers.

## Resolved in principle
- MVP journey and key exclusions.
- Anonymous exploration first; defer cross-session saves and manual tracking.
- Start with a small manually curated catalogue from official sources.
- Hard R100/month total spend cap; no provisioning before cost/access approval.

These decisions set direction but do not by themselves provide the evidence required to pass the gate.

## Evidence limitations
- No application tests, build, security scan, cloud resource, deployment or CI run has been performed or verified.
- No Azure subscription or permissions have been inspected.
- Pricing review is a preliminary screen of official pricing pages, not a saved Pricing Calculator quote; final regional prices, currency conversion, tax, usage assumptions and credits remain unverified.
- The catalogue source list is a draft plan, not a populated or approved catalogue. Source availability does not itself establish permission to reproduce content.
- The general hackathon requirements are extracted from the supplied programme; this team's Sonke profile and registration have not been inspected.
- The absence of files in the initial root listing is not a complete audit of every branch or historical commit.

## Next gate
Resolve the P0 items, review and approve the Phase 0 artifacts, then explicitly record PROJECT READY approval before starting PRD work. No application implementation or cloud provisioning is authorised by this evidence-documentation change.
