# StudyPath SA — Decisions and Assumptions

**Status:** Phase 0 draft; approval pending  
**Last updated:** 2026-10-13

## Confirmed decisions

| ID | Decision | Source / consequence |
|---|---|---|
| D-001 | Project name: StudyPath SA | Supplied product specification |
| D-002 | Target a hackathon MVP | Owner decision; prioritise a complete demonstrable journey |
| D-003 | Use documented React/Vite and Azure technology baseline | Owner confirmed; actual service use and cost feasibility remain open |
| D-004 | Total project spend must not exceed R100/month | Owner decision; verify costs and quotas before provisioning |
| D-005 | Prefer free tiers and free tools | Owner decision; free-tier suitability is not assumed |
| D-006 | Delivery is team-based | Member roles and capacity remain unknown |
| D-007 | Intended audience includes minors | Requires privacy-by-design and data minimisation |
| D-008 | Anonymous exploration is preferred | Save/track persistence and account requirements remain open |
| D-009 | Canonical repository is private GitHub repo `s1xte3n/studypath-sa` | Verified 2026-10-13; baseline branch is `docs/phase-0-baseline` |
| D-010 | Supplied product spec, hackathon programme and software development SOP are source-of-truth references | Do not silently replace or invent requirements |

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
| A-01 | Supplied product specification remains the approved product baseline | Owner confirms no superseding requirements |
| A-02 | The programme's stated submission deadline remains operative | Check supplied programme and any organiser updates |
| A-03 | A small manually curated official-source catalogue may be sufficient for the demo | Explicit product-owner approval |
| A-04 | Anonymous exploration can cover the initial pathway-discovery journey | Confirm acceptance criteria |
| A-05 | Not every service in the documented Azure baseline will necessarily be needed for the MVP | Cost and architecture review; no service is removed without approval |

## Open decisions
- Exact MVP journey and deferred features.
- Catalogue sources, provenance, data owner and verification cadence.
- Azure subscription/tenant availability and service-level cost plan.
- Authentication boundary for saved pathways and manual application tracking.
- Learner data notice/consent considerations, retention, deletion and incident response.
- Team roles, approver, success criteria and deployment target.
- Whether AI/document extraction is required for the MVP.

## Change control
Record approved changes to scope, stack, budget, audience, data use or deadlines here with rationale, alternatives, consequences and affected artifacts. Assumptions are not approvals.
