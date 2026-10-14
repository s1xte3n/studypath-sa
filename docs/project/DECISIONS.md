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
| D-016 | Do not provision Azure resources until subscription/tenant access, permissions, cost controls and deployment responsibility are confirmed | Owner accepted Phase 0 proposal on 2026-10-13 and attests access/permission checks are complete; assistant did not independently inspect the portal |
| D-017 | Record accountable owners for product decisions, catalogue verification, security/privacy and release/demo readiness | Owner accepted Phase 0 proposal on 2026-10-13; role assignments are documented separately, but there is no backup or independent reviewer |

| D-018 | Provisional single-person ownership for the initial build: the project owner will hold all project roles for now | Owner confirmation on 2026-10-13. Owner also reports an existing owned Azure subscription, a completed Sonke team profile, and that StudyPath SA is a new app being developed before the hackathon. These reports are not independently verified. Risk: no backup or independent reviewer; Azure permissions, billing visibility and cost feasibility remain outstanding. |
| D-019 | Static-first hackathon architecture: Azure Static Web Apps Free, static catalogue JSON, client-side deterministic matching; no paid/metered backend or custom domain. Do not rely on the expired 12-month Azure free-account offer. | Owner accepted on 2026-10-13. Static Web Apps Free is a hosting-plan choice on the existing subscription, distinct from the expired account offer. Owner attests subscription, permission, billing and cost checks are complete; retain private cost evidence and recheck the exact resource list before provisioning. |
| D-020 | Initial catalogue proposed as two UJ undergraduate IT pathways with official source links and provenance | Owner approved the two-pathway pilot; official programme pages checked 2026-10-13 and recorded in `PHASE0-ONLINE-EVIDENCE.md`. Only minimum-requirement screening is supported; complete eligibility classification remains UNKNOWN where rules are incomplete. |
| D-021 | Hackathon privacy boundary: synthetic profiles only, no real learner data, accounts, uploads, persistence, analytics or learner-profile telemetry | Owner approved on 2026-10-13 (Q-005). Implement and verify before demo. Real-learner-data use remains blocked pending appropriate privacy/legal review. |
| D-022 | Initial catalogue scope: two UJ undergraduate IT pilot pathways; project owner is initial curator | Owner approved on 2026-10-13 (Q-002). Complete-rule validation, source-use review and provenance checks remain required before final eligibility output. |
| D-023 | The project owner accepts responsibility for cloud/budget decisions and for privacy incident contact and final release approval for the initial MVP | Owner approved on 2026-10-13 (Q-003, Q-004, Q-015, Q-016) and attests account-specific checks are complete. Keep private incident contact details out of GitHub; implementation and release checks remain downstream. |
| D-024 | Current hackathon readiness assumption retained: owner reports the team is profiled on Sonke and the app is new for the event | Owner confirms profile completion and new-app status; supplied programme checked and summary recorded in `PHASE0-ONLINE-EVIDENCE.md`. Portal visibility is owner-attested; confirm timezone and upload limits before submission. |

| D-025 | Funding matching (M4) and manual application tracking (M5) are included in the intended MVP scope at medium priority (P1), behind the P0 core pathway-discovery journey. They must not displace core correctness, privacy, testing or demo reliability. This supersedes the earlier Phase 0 decision to defer tracking as a scope decision only; it does not approve accounts, cross-session persistence, storage, collection of financial data, or any specific tracking implementation. Resolve funding data rules (OR-015), tracker lifecycle and data handling (OR-016), and privacy/telemetry constraints before implementing these features. | Owner decision on 2026-10-14. Funding and tracking are in scope at medium priority; implementation details remain open. |

| D-026 | Anonymous first-form contract: study stage (Grade 11, Grade 12, recent matric graduate), at least one subject and a mark for each entered subject are required. Career/study interests, province/intended location and preferred study mode are optional. Funding need is excluded from the first form. Grade 11/12 marks are current results; recent matric graduates use final results where available. Missing information is never replaced with zero and may force UNKNOWN. Inputs remain temporary and must not be persisted or sent to analytics, application logs or error telemetry. | Owner approval on 2026-10-14 (OR-002). Mark and subject validation details are approved under D-027; concrete supported subjects/aliases must be explicitly catalogued. Privacy telemetry behavior requires implementation verification under OR-006. |
| D-027 | Mark and subject input contract: marks are whole-number percentages from 0 through 100 inclusive; 0 and 100 are valid, decimals are rejected without rounding, and negative, above-100, malformed or missing marks are rejected with field-specific validation. Each supported subject has a stable canonical identifier/display name; accept only explicitly listed aliases after case and whitespace normalization, without fuzzy matching or silent guesses. Reject duplicate canonical subjects, including aliases. Identify unsupported subjects; never silently rename or infer equivalence. Matching may continue with other supported subjects, but a pathway returns UNKNOWN when an unsupported subject prevents reliable screening. Subject equivalence/substitution remains governed by OR-004. | Owner approval on 2026-10-14 (OR-003). This is a requirements decision only; implementation and automated tests remain outstanding. |
| D-028 | Eligibility precedence and supported composite rules: a verified, applicable mandatory failure yields NOT_ELIGIBLE despite unrelated unknown requirements only when the rule is genuinely mandatory and no applicable alternative satisfies it; with no confirmed failure, a material unknown yields UNKNOWN; ELIGIBLE requires every applicable mandatory requirement for supported screening to be verified and met. AND groups require all components; a confirmed failure fails the group, otherwise an unknown makes it unknown. OR groups pass if any alternative is verified passing, fail only if all are known to fail, and otherwise return unknown. Conditional requirements are skipped only when their condition is verified false; verified true requires evaluation, and an outcome-changing unknown condition yields UNKNOWN. APS/points calculations require an authoritative applicable programme/cycle-specific formula specifying subject inclusion/exclusion, conversion and thresholds; Life Orientation is not universally included/excluded. Subject substitutions require explicit verified applicable official support or an approved provenance-backed catalogue rule; no name-based inference. These rules support minimum-requirement screening only and do not predict or guarantee admission. | Owner approval on 2026-10-14 (OR-004). Requirements decision only; implementation, source verification per programme and automated tests remain outstanding. |

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
- The owner subsequently attested that the subscription/access/billing and R100/month checks are complete. These are owner attestations, not independent billing verification, and do not establish future spend will be R0. Recheck the exact resource list before provisioning.

## Downstream controls and open work
- Validate the full rule set before implementing any eligibility classification beyond minimum-requirement screening; return UNKNOWN for ambiguity.
- Implement and test the synthetic-only privacy boundary, reset behaviour, and absence of profile persistence/transmission/logging; complete applicable privacy/legal review before real learner data is considered.
- Keep account-specific cost evidence private and recheck the exact intended resources against the R100/month cap before provisioning; no billable add-ons without renewed approval.
- Confirm the Sonke portal's displayed timezone, file limits and upload workflow before submission; owner confirms the profile is complete.
- Seek independent review if feasible; no backup/reviewer is currently confirmed.
- Define measurable acceptance criteria and demo success conditions in the PRD.

## Change control
Record approved changes to scope, stack, budget, audience, data use or deadlines here with rationale, alternatives, consequences and affected artifacts. Assumptions are not approvals.
