# StudyPath SA — Project Status

**Status:** Phase 1 — PRD and requirements planning  
**Gate:** `PROJECT READY` — **PASSED for Phase 1 planning only**  
**Last updated:** 2026-10-14

## Verified repository state
- Repository: https://github.com/s1xte3n/studypath-sa
- Visibility: private; default branch: `main`.
- Connected GitHub integration reports admin, read and write permissions.
- Initial root listing contained `README.md` only; README content is a project title and one-line description.
- Phase 0 baseline documentation and accepted direction decisions are present in the project documentation.
- The PROJECT READY evidence pack and owner-confirmation update were merged through PRs #4 and #5.
- Added `docs/project/PHASE0-RESOLUTION-PROPOSAL.md` and `docs/project/PHASE0-ONLINE-EVIDENCE.md`. Official UJ programme pages and Microsoft Static Web Apps pricing/quota sources were checked online. The owner approved all six decision records and attests the account-specific checks are complete. PROJECT READY is passed for Phase 1 PRD/planning only; account-specific evidence remains owner-attested rather than independently inspected.
- Local repository verification was supplied by the project owner on 2026-10-14: path `Sixteen/Desktop/Projects/studypath-sa`, branch `main`, HEAD `3a8f17e44c9c2f079b8ce71e14eebd56519cb52e`, `git status` clean, local branch up to date with `origin/main`, and `git rev-list --left-right --count main...origin/main` returned `0 0`. The tracked-file listing supplied for this check contains repository guidance and `docs/project/` files; it does not list application source, a package manifest, tests or CI workflow. This is owner-supplied command output, not a direct inspection of the local filesystem by the assistant.

## State by area

| Area | Status |
|---|---|
| Product specification, hackathon programme, development SOP | Supplied project references; hackathon programme reviewed and online evidence logged |
| Documented React/Vite + Azure stack | Owner-confirmed baseline; not provisioned/validated |
| Application source and dependencies | Not found in initial root listing; no implementation verified |
| Tests, CI workflows, infrastructure, database | Not verified; no execution evidence available | 
| Deployment | Confirmed by project owner on 2026-10-14: StudyPath SA has not been deployed. No live application URL or deployment has been verified. |
| MVP journey | Direction accepted: anonymous learner journey from subject/mark/interest inputs to explainable pathways, eligibility/uncertainty and official next steps |
| Catalogue | Two UJ programme pages checked online; minimum thresholds and 2026 application dates recorded in `PHASE0-ONLINE-EVIDENCE.md`; full admission prediction remains out of scope and ambiguity maps to UNKNOWN |
| Budget | Owner attests subscription/access/billing and R100/month checks are complete. Public Microsoft pricing/quota sources were checked. Account-specific billing records and a saved quote were not uploaded; attestation is not independent verification. Free static hosting only; no paid add-ons without renewed approval. |
| Privacy and identity | Synthetic-only, no-persistence/no-profile-telemetry boundary approved; implementation verification, hosting metadata review and any applicable privacy/legal assessment are downstream build/release gates; real learner inputs remain prohibited |
| Azure subscription and accountable owners | Owner confirms a subscription exists and is theirs; permissions/billing visibility are not independently verified. Owner will hold all roles for now; no backup/independent reviewer. |
| Hackathon | Owner confirms team profile and new-app status. Supplied programme reviewed: interactive real-time app, deck max 10 slides, demo video max 90 seconds, SSDLC and Lean Business Canvas; Monday 23:59 submission implies 26 Oct 2026. Sonke portal not independently accessed; verify displayed timezone/upload details at submission. |

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

## Phase 0 disposition

PROJECT READY is **PASSED for Phase 1 PRD and requirements planning only**, based on the owner’s explicit approvals, the owner’s attestation that account-specific checks are complete, official-source research recorded in `PHASE0-ONLINE-EVIDENCE.md`, and review of the supplied hackathon programme.

The following are downstream implementation/release controls, not blockers to beginning PRD work:
1. Implement and test the synthetic-only boundary; verify no profile values are transmitted, persisted or logged.
2. Review hosting metadata, privacy notice, retention and incident process before a public demo; real learner data remains prohibited until the appropriate privacy/legal review is complete.
3. Keep eligibility to sourced minimum-requirement screening and return UNKNOWN on incomplete or ambiguous rules.
4. Before provisioning, recheck the planned resource list against the R100/month cap and the owner's private cost evidence; do not add paid/metered services without renewed approval.
5. Verify the Sonke portal’s displayed submission deadline/timezone and upload limits before final submission.
6. Obtain independent review if feasible; the owner remains the single person holding all roles.

## Resolved in principle
- MVP journey and key exclusions.
- Anonymous exploration first; defer cross-session saves and manual tracking.
- Start with a small manually curated catalogue from official sources.
- Hard R100/month total spend cap; no provisioning before cost/access approval.
- Azure Static Web Apps Free is an acceptable hosting plan on the existing subscription; the project will not rely on the expired 12-month Azure free-account offer. Owner reports no project resources currently provisioned and no credits will be used.

Owner approval of the Phase 0 direction/materials is recorded. These approvals do not by themselves provide the external and implementation evidence required to pass the gate.

## Evidence limitations
- No application tests, build, security scan, cloud resource, or CI run has been performed or verified. The project owner confirmed on 2026-10-14 that StudyPath SA has not been deployed; therefore there is no live deployment to smoke-test yet. Phase 0 passage does not imply these exist.
- The owner attests that Azure access, billing, commitments and cost checks are complete. Account-specific details were not independently inspected by the assistant and no billing screenshot or saved quote was committed; see `PHASE0-ONLINE-EVIDENCE.md`.
- Pricing review is a preliminary screen of official pricing pages, not a saved Pricing Calculator quote; final regional prices, currency conversion, tax, usage assumptions and credits remain unverified.
- Official UJ programme pages and Microsoft pricing/quota pages were checked online on 2026-10-13. The catalogue is a bounded two-programme pilot; full admission predictions remain unsupported and must return UNKNOWN where rules are incomplete.
- Hackathon deliverables and date are extracted from the supplied programme. The owner confirms Sonke profiling and new-app status; the portal itself was not accessed. Confirm the portal timezone/upload details before submission.
- The supplied local tracked-file listing and remote repository inspection do not constitute a complete audit of every branch or historical commit.

## Next gate
Phase 1 — create and approve the PRD, user stories, measurable acceptance criteria and requirements traceability matrix. PROJECT READY passage authorizes planning only; it is not a deployment approval. No application implementation, Azure provisioning or deployment was performed by this documentation update.
