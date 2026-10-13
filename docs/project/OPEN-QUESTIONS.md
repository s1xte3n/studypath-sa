# StudyPath SA — Open Questions

**Status:** Phase 0 discovery  
**Last updated:** 2026-10-13  
**Priority:** P0 blocks readiness/safety/budget; P1 must resolve before dependent phase; P2/P3 later.

The owner accepted the seven proposed Phase 0 decision directions on 2026-10-13. The draft evidence pack at `docs/project/PROJECT-READY-EVIDENCE.md` documents candidate evidence and proposals, but it does not resolve questions that require owner approval, access or named people.

| ID | Priority | Question / remaining work | Owner | Required evidence / gate impact |
|---|---|---|---|---|
| Q-001 | Resolved in principle | MVP journey and exclusions | Product owner/team — name outstanding | Direction accepted: subjects/marks/interests → explainable pathway matches → eligibility/uncertainty → official next steps; defer uploads, AI chat and application submission. Convert to acceptance criteria in the PRD only after PROJECT READY. |
| Q-002 | P0 | What exact initial catalogue records will be used, who curates them, and how are they verified? | Catalogue/data owner — name outstanding | Evidence pack lists candidate official sources, provenance fields and a proposed 30-day active-development cadence. Still approve scope and source-use rules, name curator/backup, and verify actual programme records and admission cycle. |
| Q-003 | P0 | Is an Azure subscription/tenant available and who owns it? | Cloud owner — name outstanding | Confirm subscription availability, permissions, billing visibility and named owner. Never store credentials in docs. No provisioning before confirmation. |
| Q-004 | P0 | Can the chosen services fit the R100/month cap, including quotas and overages? | Cloud owner + budget approver — names outstanding | Evidence pack contains a preliminary pricing screen, not an all-in quote. Save a dated regional Pricing Calculator estimate with usage assumptions, tax/FX/credits expiry, quotas and non-Azure costs; approve cost controls. PostgreSQL is a material risk. |
| Q-005 | P0 | What learner data is collected, why, and how are privacy notice/consent where applicable, retention, deletion and incidents handled? | Security/privacy owner — name outstanding | Review the proposed inventory and browser-only approach, confirm applicable POPIA/minor-consent questions with a qualified adviser, approve notice/retention/logging and incident process. Synthetic data only until approved. |
| Q-006 | Resolved in principle | Anonymous exploration versus saved pathways/tracking | Product/security owner — names outstanding | Anonymous exploration first; defer cross-session saves and manual application tracking until account, persistence and privacy boundaries are approved. |
| Q-007 | Resolved in principle | Curated catalogue versus mandatory live integrations | Product/data owner — name outstanding | Begin with a small manually curated official-source catalogue. Source-use approval and verified records remain under Q-002. |
| Q-008 | P0 | Who is the accountable approver and who owns each workstream? | Team lead — name outstanding | Record names and explicit acceptance for product approval, product, catalogue/data, cloud/subscription, budget, security/privacy, engineering/QA and release/demo responsibilities and availability. |
| Q-009 | P1 | Which deployment region, domain and environments are intended? | Cloud owner — name outstanding | Decide only after access and cost checks. No provisioning before the budget/access gate. |
| Q-010 | P0 | Has the team met the hackathon's team-profile and submission requirements? | Team/release lead — name outstanding | Programme requires a Sonke team profile to be judged, even for solo participants. Verify team profile/registration, new vs existing app status, any feature requirement, session attendance, exact deadline and upload procedure. |
| Q-011 | Resolved in principle | Is AI/document extraction required for the MVP? | Product owner — name outstanding | Current accepted direction defers uploads and AI chat; no Azure OpenAI or Document Intelligence deployment in the initial MVP unless scope, privacy and budget are explicitly reconsidered. |
| Q-012 | P1 | What measurable success and demo acceptance criteria define completion? | Product owner/team — names outstanding | Define in PRD after PROJECT READY; include functional real-time input processing because static-only sites are not eligible under the supplied programme. |
| Q-013 | P2 | How will catalogue records be refreshed and stale requirements flagged? | Catalogue/data owner — name outstanding | Proposed 30-day active-development verification and recheck before application cycles; approve and implement after readiness. |
| Q-014 | P3 | What post-hackathon support, scale and operating model is intended? | Product owner — name outstanding | Future roadmap decision. |
| Q-015 | P0 | Does the complete service set fit the R100/month total cap in the intended Azure region? | Cloud owner + budget approver — names outstanding | Must have a saved all-in estimate and documented go/no-go; free grants/credits must include expiry and related-service costs. |
| Q-016 | P0 | Which people will serve as privacy incident contact and final release approver? | Team lead — name outstanding | Record a private incident contact route, escalation/notification decision owner and release/demo approver before any learner-facing demo. |

## Gate policy
Do not start PRD refinement until P0 questions are resolved or explicitly accepted by the project owner and PROJECT READY is recorded as passed. Do not provision cloud services while subscription ownership/access and cost feasibility remain unverified. Do not use real learner data until the data-handling approach is approved.
