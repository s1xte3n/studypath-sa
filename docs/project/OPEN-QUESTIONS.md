# StudyPath SA — Open Questions

**Status:** Phase 0 discovery  
**Last updated:** 2026-10-13  
**Priority:** P0 blocks readiness/safety/budget; P1 must resolve before dependent phase; P2/P3 later.

The owner accepted the seven proposed Phase 0 decision directions on 2026-10-13. This resolves the direction of the MVP and several policy choices, but does not replace the evidence and named ownership needed to pass the PROJECT READY gate.

| ID | Priority | Question / remaining work | Owner | Required evidence / gate impact |
|---|---|---|---|---|
| Q-001 | Resolved in principle | MVP journey and exclusions | Product owner/team | Direction accepted: subjects/marks/interests → explainable pathway matches → eligibility/uncertainty → official next steps; defer uploads, AI chat and application submission. Turn into testable scope and acceptance criteria in the PRD after PROJECT READY. |
| Q-002 | P0 | Which official sources and exact catalogue records will be used? Who curates and verifies them, and how often? | Product/data owner — name outstanding | Source URLs/inventory, permitted use, minimum catalogue, curator, verification cadence and provenance requirements; blocks readiness until the initial data plan is evidenced. |
| Q-003 | P0 | Is an Azure subscription/tenant available and who owns it? | Cloud owner — name outstanding | Confirm subscription availability, access and permissions; never store credentials in docs. No provisioning before confirmation. |
| Q-004 | P0 | Can the chosen service set fit the R100/month cap, including quotas and overages? | Project/cloud owner — name outstanding | Service-by-service region/usage pricing, quota and overage review, cost controls and documented go/no-go. Proposal accepted; feasibility is not yet verified and blocks provisioning/readiness. |
| Q-005 | P0 | What learner data is collected, why, and how are privacy notice/consent where applicable, retention, deletion and incident handling addressed? | Product/privacy owner — name outstanding | Data inventory and documented review for an audience including minors. Synthetic data only until approved; anonymous exploration should not request names, ID numbers or contact details. |
| Q-006 | Resolved in principle | Anonymous exploration versus saved pathways/tracking | Product/security owner — name outstanding | Direction accepted: anonymous exploration first; defer cross-session saves and manual application tracking until account, persistence and privacy boundaries are approved. Record the decision in the PRD/architecture later. |
| Q-007 | Resolved in principle | Curated catalogue versus mandatory live integrations | Product/data owner — name outstanding | Direction accepted: begin with a small manually curated catalogue from official sources. Confirm source availability, permitted use and catalogue evidence under Q-002. |
| Q-008 | P0 | Who are the named owners and accountable approver? | Team lead — name outstanding | Record named product, catalogue/data, cloud, security/privacy and release/demo responsibilities and availability. The owner accepted the need for these roles but supplied no names. |
| Q-009 | P1 | Which deployment region, domain and environments are intended? | Cloud owner | Deployment target and environment plan; no provisioning before cost/access gate |
| Q-010 | P1 | What hackathon eligibility, team-profile and submission requirements apply to this team? | Team lead | Cross-check programme against team circumstances and track all deliverables |
| Q-011 | P1 | Is AI/document extraction required for the MVP? | Product owner | Proposed default is defer; confirm in scope decision after reviewing hackathon/product requirements, costs and privacy implications |
| Q-012 | P1 | What measurable success and demo acceptance criteria define completion? | Product owner/team | Testable criteria tied to the primary student journey, to be authored during PRD |
| Q-013 | P2 | How will catalogue records be refreshed and stale requirements flagged? | Data owner | Data stewardship process; define the initial verification cadence as part of Q-002 |
| Q-014 | P3 | What post-hackathon support, scale and operating model is intended? | Product owner | Future roadmap decision |

## Gate policy
Do not start PRD refinement until P0 questions are resolved or explicitly accepted by the project owner and the PROJECT READY gate is recorded as passed. Do not provision cloud services while subscription ownership/access and cost feasibility remain unverified. Do not use real learner data until the data-handling approach is approved.
