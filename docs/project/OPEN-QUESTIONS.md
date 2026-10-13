# StudyPath SA — Open Questions

**Status:** Phase 0 discovery  
**Last updated:** 2026-10-13  
**Priority:** P0 blocks readiness/safety/budget; P1 must resolve before dependent phase; P2/P3 later.

| ID | Priority | Question | Owner | Required evidence / gate impact |
|---|---|---|---|---|
| Q-001 | P0 | What is the exact must-have MVP journey and what is explicitly deferred? | Product owner/team | Approved scope, exclusions and demo path; blocks PROJECT READY |
| Q-002 | P0 | Which official institution, qualification, admission, cost, deadline and funding data is available? | Product/data owner | Source URLs/dataset inventory, permitted use, minimum catalogue, curator and verification cadence |
| Q-003 | P0 | Is an Azure subscription/tenant available and who owns it? | Cloud owner | Availability and access confirmation; never store credentials in docs |
| Q-004 | P0 | Can the chosen service set fit the R100/month cap, including quotas and overages? | Project/cloud owner | Region-specific pricing and usage checks; cost controls; blocks provisioning |
| Q-005 | P0 | What learner data is collected, why, and how are notices/consent, retention, deletion and incident handling addressed? | Product/privacy owner | Documented data inventory and review; audience includes minors |
| Q-006 | P0 | Does anonymous use include saved pathways/tracking, or do those require accounts? | Product/security owner | Approved user journey and access/persistence boundary |
| Q-007 | P0 | Is a curated official-source catalogue acceptable, or are live integrations mandatory? | Product/data owner | Explicit decision with evidence of available APIs/data |
| Q-008 | P1 | Who are team members, their roles and availability, and who approves scope/security/release? | Team lead | Named responsibilities and decision owner |
| Q-009 | P1 | Which deployment region, domain and environments are intended? | Cloud owner | Deployment target and environment plan |
| Q-010 | P1 | What hackathon eligibility, team-profile and submission requirements apply to this team? | Team lead | Cross-check programme against team circumstances |
| Q-011 | P1 | Is AI/document extraction required for the MVP? | Product owner | Explicit in-scope/out-of-scope decision and cost/privacy assessment |
| Q-012 | P1 | What measurable success and demo acceptance criteria define completion? | Product owner/team | Testable criteria tied to the main student journey |
| Q-013 | P2 | How will catalogue records be refreshed and stale requirements flagged? | Data owner | Data stewardship process |
| Q-014 | P3 | What post-hackathon support, scale and operating model is intended? | Product owner | Future roadmap decision |

## Gate policy
Do not start PRD refinement until P0 questions are resolved or explicitly accepted by the project owner. Do not provision cloud services while cost feasibility and ownership remain unknown. Do not use real learner data until the data-handling approach is approved.
