# StudyPath SA — Decisions and Assumptions

**Status:** Phase 0 decisions recorded; PROJECT READY passed for Phase 1 PRD/requirements planning only  
**Last updated:** 2026-10-13

Owner explicitly approved COST-01, DATA-01, ELIGIBILITY-01, PRIVACY-01, RELEASE-01 and OWNER-01, and approved the directions recorded for Q-002, Q-003, Q-004, Q-005, Q-010, Q-015 and Q-016 on 2026-10-13. The owner subsequently attested that all remaining account-specific checks are complete. Official UJ and Microsoft public sources and the supplied hackathon programme are documented in `PHASE0-ONLINE-EVIDENCE.md`. Account-specific portal/billing records were not independently inspected by the assistant. PROJECT READY passed for Phase 1 planning only.

## Confirmed decisions

| ID | Decision | Source / consequence |
|---|---|---|
| D-001 | Project name: StudyPath SA | Supplied product specification |
| D-002 | Target a hackathon MVP | Owner decision; prioritise a complete demonstrable journey |
| D-003 | Use documented React/Vite and Azure technology baseline | Owner confirmed; actual service use and cost feasibility remain open |
| D-004 | Total project spend must not exceed R100/month | Owner decision; verify costs and quotas before provisioning |
| D-005 | Prefer free tiers and free tools where suitable; do not rely on the expired 12-month Azure free-account offer | Owner clarification on 2026-10-13: Azure Static Web Apps Free remains acceptable on the existing subscription; account offer and service hosting plan are distinct |
| D-006 | Delivery is team-based | Named member roles, capacity and accountable owners still need recording |
| D-007 | Intended audience includes minors | Requires privacy-by-design and data minimisation |
| D-008 | Anonymous exploration is preferred | Initial MVP is anonymous-first; defer cross-session saving and application tracking until identity, persistence and privacy boundaries are approved |
| D-009 | Canonical repository is private GitHub repo `s1xte3n/studypath-sa` | Verified 2026-10-13; default branch is `main` |
| D-010 | Supplied product spec, hackathon programme and software development SOP are source-of-truth references | Do not silently replace or invent requirements |
| D-011 | MVP journey: enter relevant subjects/marks and interests, explore explainable pathway matches, review eligibility/uncertainty, and follow official next steps | Owner accepted Phase 0 proposal on 2026-10-13; detailed acceptance criteria belong in the PRD after the readiness gate |
| D-012 | Initial pathway catalogue will be small and manually curated from official sources | Owner accepted Phase 0 proposal on 2026-10-13; source inventory, minimum catalogue, permitted use, curator and verification cadence still require evidence |
| D-013 | R100/month is a hard total spend cap; prefer free tiers and validate service pricing, quotas and overages before provisioning | Owner accepted Phase 0 proposal on 2026-10-13; no cost feasibility claim is made until a service-by-service check is documented |
| D-014 | Use synthetic development data and minimise personal data; anonymous exploration should not require names, ID numbers or contact details | Owner accepted Phase 0 proposal on 2026-10-13; privacy notice, retention/deletion and incident handling still require review |
| D-015 | Anonymous exploration first; defer saved pathways and manual application tracking until account and data-protection boundaries are approved | Owner accepted Phase 0 proposal on 2026-10-13 |
| D-016 | Do not provision Azure resources until subscription/tenant access, permissions, cost controls and deployment responsibility are confirmed | Owner accepted Phase 0 proposal on 2026-10-13; actual subscription/access evidence remains outstanding |
| D-017 | Record accountable owners for product decisions, catalogue verification, security/privacy and release/demo readiness | Owner accepted Phase 0 proposal on 2026-10-13; role assignments are documented separately, but there is no backup or independent reviewer |

| D-018 | Provisional single-person ownership for the initial build: the project owner will hold all project roles for now | Owner confirmation on 2026-10-13. Owner also reports an existing owned Azure subscription, a completed Sonke team profile, and that StudyPath SA is a new app being developed before the hackathon. These reports are not independently verified. Risk: no backup or independent reviewer; Azure permissions, billing visibility and cost feasibility remain outstanding. |
| D-019 | Static-first hackathon architecture: Azure Static Web Apps Free, static catalogue JSON, client-side deterministic matching; no paid/metered backend or custom domain. Do not rely on the expired 12-month Azure free-account offer. | Owner accepted on 2026-10-13. Static Web Apps Free is a hosting-plan choice on the existing subscription, distinct from the expired account offer. Deployment still requires subscription, permission, billing and cost verification; no all-in cost guarantee. |
| D-020 | Initial catalogue proposed as two UJ undergraduate IT pathways with official source links and provenance | Proposal in `PHASE0-RESOLUTION-PROPOSAL.md`; pages checked 2026-10-13. Owner acceptance and complete-rule validation required before eligibility classification. |
| D-021 | Hackathon privacy boundary: synthetic profiles only, no real learner data, accounts, uploads, persistence, analytics or learner-profile telemetry | Owner approved on 2026-10-13 (Q-005). Implement and verify before demo. Real-learner-data use remains blocked pending appropriate privacy/legal review. |
| D-022 | Initial catalogue scope: two UJ undergraduate IT pilot pathways; project owner is initial curator | Owner approved on 2026-10-13 (Q-002). Complete-rule validation, source-use review and provenance checks remain required before final eligibility output. |
| D-023 | The project owner accepts responsibility for cloud/budget decisions and for privacy incident contact and final release approval for the initial MVP | Owner approved on 2026-10-13 (Q-003, Q-004, Q-015, Q-016). Private incident contact route, escalation process, subscription permissions and all-in cost evidence remain outstanding. |
| D-024 | Current hackathon readiness assumption retained: owner reports the team is profiled on Sonke and the app is new for the event | Owner approval recorded on 2026-10-13 (Q-010); profile visibility, eligibility, deadline and submission procedure still require external verification. |

## Product guardrails from the supplied specification
- Eligibility states: `ELIGIBLE`, `NOT_ELIGIBLE`, `UNKNOWN`.
- Eligibility must be deterministic, explainable, testable and grounded in verified requirements.
- Missing data must not produce fabricated certainty.
- Do not guarantee admission/funding or claim to submit applications.
- Label estimates/demo data clearly.
- AI supports explanations and extraction; it does not decide eligibility or funding.

## Assumptions requiring validation

| ID | Assumption | Required validation |
|---|---|---|
| A-01 | Supplied product specification remains the approved product baseline | Confirm no superseding requirements |
| A-02 | The programme's stated submission deadline remains operative | Check supplied programme and any organiser updates |
| A-03 | The selected official sources permit the intended catalogue use | Review source terms and record URLs |
| A-04 | The proposed anonymous journey is sufficient for a coherent hackathon demonstration | Define testable acceptance criteria in the PRD |
| A-05 | A subset of the documented Azure baseline can be sufficient for the MVP | Approved architecture and cost review; do not remove baseline services without recording a decision |

## Owner-confirmed subscription and cost facts (2026-10-13)
- Owner reports that no StudyPath SA Azure resources have been provisioned and current project resource spend is R0.
- Owner reports no existing project resource costs and has decided not to use Azure credits.
- Azure Static Web Apps Free is acceptable on the existing subscription; the project must not rely on the expired 12-month Azure free-account offer.
- These are owner reports/decisions, not independent billing or subscription verification. They do not establish that the full subscription has no unrelated costs or that future all-in cost is R0.

## Downstream controls and open work
- Validate the full rule set before implementing any eligibility classification beyond minimum-requirement screening; return UNKNOWN for ambiguity.
- Implement and test the synthetic-only privacy boundary, reset behaviour, and absence of profile persistence/transmission/logging; complete applicable privacy/legal review before real learner data is considered.
- Keep account-specific cost evidence private and recheck the exact intended resources against the R100/month cap before provisioning; no billable add-ons without renewed approval.
- Confirm the Sonke portal's displayed timezone, file limits and upload workflow before submission; owner confirms the profile is complete.
- Seek independent review if feasible; no backup/reviewer is currently confirmed.
- Define measurable acceptance criteria and demo success conditions in the PRD.

## Change control
Record approved changes to scope, stack, budget, audience, data use or deadlines here with rationale, alternatives, consequences and affected artifacts. Assumptions are not approvals.
