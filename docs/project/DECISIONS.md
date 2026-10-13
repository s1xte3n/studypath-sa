# StudyPath SA — Decisions and Assumptions

**Status:** Phase 0 decisions recorded; PROJECT READY evidence gate still pending  
**Last updated:** 2026-10-13

## Confirmed decisions

| ID | Decision | Source / consequence |
|---|---|---|
| D-001 | Project name: StudyPath SA | Supplied product specification |
| D-002 | Target a hackathon MVP | Owner decision; prioritise a complete demonstrable journey |
| D-003 | Use documented React/Vite and Azure technology baseline | Owner confirmed; actual service use and cost feasibility remain open |
| D-004 | Total project spend must not exceed R100/month | Owner decision; verify costs and quotas before provisioning |
| D-005 | Prefer free tiers and free tools | Owner decision; free-tier suitability is not assumed |
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
| D-017 | Record accountable owners for product decisions, catalogue verification, security/privacy and release/demo readiness | Owner accepted Phase 0 proposal on 2026-10-13; names and responsibilities are not yet supplied |

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

## Still unresolved
- Exact official sources, catalogue inventory, permitted use, curator, verification cadence and provenance fields.
- Azure subscription/tenant availability, accountable cloud owner, access and documented service-by-service cost/quotas/overage checks.
- Learner data inventory and purpose, privacy notice/consent review where applicable, retention/deletion and incident handling.
- Names and availability of team members and named product, data, security/privacy and release owners.
- Hackathon team eligibility and deliverable obligations against the supplied programme.
- Deployment region/domain/environment and whether AI/document extraction is in or out of the MVP (proposal: defer unless separately justified and approved).
- Measurable acceptance criteria and demo success conditions.

## Change control
Record approved changes to scope, stack, budget, audience, data use or deadlines here with rationale, alternatives, consequences and affected artifacts. Assumptions are not approvals.
