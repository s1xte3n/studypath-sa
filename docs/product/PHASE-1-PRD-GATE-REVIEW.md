# Phase 1 — PRD Gate Review

Status: BLOCKED — review completed; owner approval not recorded.
Date: 2026-10-14.

## Confirmed baseline
- Primary users: South African Grade 11–12 learners; recent matric graduates are secondary users.
- Core journey: enter study stage, supported subjects and marks; optionally provide interests, intended location and study mode; view curated pathways, deterministic eligibility, explanations, official sources and next steps.
- Anonymous exploration; no identifying information or account required.
- Eligibility states: ELIGIBLE, NOT_ELIGIBLE, UNKNOWN. Deterministic eligibility is separate from preference fit; no weighted numeric preference score.
- Catalogue target: 6–8 curated programme records prioritising Gauteng; not national coverage.
- Funding and manual tracker are P1 behind core P0 discovery; funding pilot 3–5 official opportunities.
- Tracker is page-memory-only; no server/database, localStorage, sessionStorage, cookies, account or cloud sync. Reload/close may discard entries. Statuses are learner-reported.
- Cost planner, AI chat, document upload/extraction, account creation, cross-session saving and application submission are out of initial MVP scope.
- Synthetic data only. Budget cap R100/month. Existing cost estimate does not authorise provisioning.

## Remaining blockers
1. PRD is still marked draft; explicit owner approval is required.
2. Decision on predefined tracker next-action options remains open. Proposal for review: omit these from initial implementation; show verified official pathway/provider links separately. This is not approved.
3. Supplied SPEC defines API-first Azure architecture; approved MVP/privacy and cost decisions currently imply a static-first pilot. Phase 3 must resolve this conflict explicitly.
4. Hosting/provider telemetry fields and retention have not been inspected; public-demo privacy gate remains blocked.
5. Actual 6–8 programme and 3–5 funding records with official provenance and curator sign-off are not evidenced.
6. Supported canonical subject identifiers and aliases must be explicitly listed.
7. Approved funding freshness, page-memory tracker persistence and transitions must align across PRD, matrix, acceptance criteria and test strategy.

## Approval checklist
- [ ] Owner approves PRD and measurable outcomes.
- [ ] Owner accepts or rejects proposed next-action default.
- [ ] Scope conflict with supplied specification is explicitly acknowledged.
- [ ] Requirements matrix and existing acceptance criteria reviewed together.
- [ ] Open questions and assumptions remain visible.

Gate decision: Phase 1 remains BLOCKED. Drafting documentation does not constitute product approval.
