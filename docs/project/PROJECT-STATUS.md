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
- The PROJECT READY evidence pack and owner-confirmation update were merged through PRs #4 and #5.
- Added `docs/project/PHASE0-RESOLUTION-PROPOSAL.md` with a static-first cost strategy, two official UJ pilot records, and a synthetic-data-only privacy boundary. The owner approved COST-01, DATA-01, ELIGIBILITY-01, PRIVACY-01, RELEASE-01 and OWNER-01, and has now reconfirmed approval of the Phase 0 materials. Required external and implementation evidence remain outstanding; PROJECT READY remains blocked.
- This is remote repository inspection. Local working-tree state has not been inspected.

## State by area

| Area | Status |
|---|---|
| Product specification, hackathon programme, development SOP | Supplied project references; the hackathon programme has now been reviewed for app criteria and submission requirements |
| Documented React/Vite + Azure stack | Owner-confirmed baseline; not provisioned/validated |
| Application source and dependencies | Not found in initial root listing; no implementation verified |
| Tests, CI workflows, infrastructure, database, deployment | Not yet verified; no execution evidence available |
| MVP journey | Direction accepted: anonymous learner journey from subject/mark/interest inputs to explainable pathways, eligibility/uncertainty and official next steps |
| Catalogue | Two source-backed UJ pilot records and explicit UNKNOWN/eligibility boundaries documented in `PHASE0-RESOLUTION-PROPOSAL.md`; owner approval and complete-rule verification remain outstanding |
| Budget | Owner reports no resources provisioned for StudyPath SA and current project spend is R0; no credits will be used. Approved direction is Azure Static Web Apps Free on the existing subscription, without relying on the expired 12-month Azure free-account offer. Subscription billing/commitments and future all-in cost remain unverified. |
| Privacy and identity | Synthetic-only, no-persistence/no-analytics boundary proposed; implementation, hosting metadata review and legal/privacy assessment remain outstanding; real learner inputs are not approved |
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
- Owner confirmed no StudyPath SA resources have been provisioned (reported current project spend R0), no existing project resource costs, and no credits will be used. Owner clarified that Azure Static Web Apps Free is acceptable on the existing subscription; the expired 12-month free-account offer will not be relied on.

## Remaining P0 blockers
1. Reconcile and verify consistency across `DECISIONS.md`, `OPEN-QUESTIONS.md`, the resolution proposal, this evidence pack and `ARTIFACT-INDEX.md`; owner approval of the direction is now recorded.
2. Verify subscription status, effective deployment permissions, billing visibility, applicable offer/plan terms, any non-project commitments, and the R100/month all-in cost constraint before deployment. Owner reports no StudyPath resources and no credits; billing evidence is not yet recorded.
3. Verify the two programme records and admission cycle again before use; complete the rule set before returning final eligibility states.
4. Implement the synthetic-only privacy boundary, verify no profile values are transmitted/stored/logged, and review hosting metadata, notice and incident process. Real learner inputs remain blocked pending appropriate privacy/legal review.
5. Assess the concentration risk of one person holding every role; arrange independent review if feasible before learner-facing release.
6. Independently verify Sonke profile visibility and confirm exact submission deadline/upload procedure.

## Resolved in principle
- MVP journey and key exclusions.
- Anonymous exploration first; defer cross-session saves and manual tracking.
- Start with a small manually curated catalogue from official sources.
- Hard R100/month total spend cap; no provisioning before cost/access approval.
- Azure Static Web Apps Free is an acceptable hosting plan on the existing subscription; the project will not rely on the expired 12-month Azure free-account offer. Owner reports no project resources currently provisioned and no credits will be used.

Owner approval of the Phase 0 direction/materials is recorded. These approvals do not by themselves provide the external and implementation evidence required to pass the gate.

## Evidence limitations
- No application tests, build, security scan, cloud resource, deployment or CI run has been performed or verified.
- Azure subscription ownership and the absence of StudyPath resources are owner-confirmed, not independently verified. Current project spend R0 and no use of credits are owner-reported. Tenant details, effective permissions, billing visibility, unrelated subscription commitments and all-in future cost have not been inspected.
- Pricing review is a preliminary screen of official pricing pages, not a saved Pricing Calculator quote; final regional prices, currency conversion, tax, usage assumptions and credits remain unverified.
- The catalogue source list is a draft plan, not a populated or approved catalogue. Source availability does not itself establish permission to reproduce content.
- General hackathon requirements are extracted from the supplied programme. Owner confirms Sonke profiling and new-app status, but profile visibility and exact deadline have not been independently inspected.
- The absence of files in the initial root listing is not a complete audit of every branch or historical commit.

## Next gate
Complete and review the remaining P0 evidence, reconcile the Phase 0 artifacts, then record a formal PROJECT READY gate decision before starting PRD work. No application implementation or cloud provisioning is authorised by this evidence-documentation change.
