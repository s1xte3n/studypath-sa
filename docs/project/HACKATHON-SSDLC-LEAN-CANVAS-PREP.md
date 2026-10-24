# StudyPath SA — SSDLC and Lean Business Canvas Submission Preparation

**Purpose:** evidence-based draft for transfer into Sonke. This document does not mean any portal field has been completed.

**Baseline inspected:** `main` commit `268e4f55ccfce55874f6621a0b491acf93c6432f` (2026-10-24). The supplied programme (pp. 3–4) requires a deck of no more than 10 slides (PDF preferred), a demo video no longer than 90 seconds with its link on the slides, SSDLC, Lean Business Canvas, and submission through Sonke after team profiling.

## 1. SSDLC — suggested evidence-led entries

### Product and requirements
StudyPath SA is a South African study-pathway exploration prototype for Grade 11–12 learners and recent matric graduates. The current demo scope is narrower than the long-term vision: study-stage, subject and mark entry; deterministic processing of a draft UJ 2027 pilot catalogue; pathway details and official-source links; uncertainty disclosure; reset; and light/dark themes.

### Architecture and implementation
- **Implemented for the demo:** React 19 + Vite browser application, JavaScript ES modules, client-side form validation and matching adapter, local JSON draft catalogue, transient in-memory form/results state, Node test runner and Playwright browser tests.
- **Not implemented/verified as running:** hosted API runtime, production identity, persistent accounts, Azure deployment, live catalogue ingestion, funding integration, real application submission.
- **Intended architecture only:** API-first architecture and Azure services documented elsewhere in the repository. Do not present intended services as deployed infrastructure.

### Security and privacy boundary
- Synthetic learner inputs only.
- The current UI states entries/results stay in page memory and are not sent to a server or saved across reloads. Browser E2E tests instrument selected network, URL/history, storage, cookie, console/error and reload paths.
- Those tests do not establish provider/hosting logs, all third-party telemetry, complete platform behavior, legal compliance, or production privacy safety.
- No real learner data, cloud provisioning, public deployment, or paid service is authorized by this task.
- Never include real personal data or secret values in screenshots, test fixtures, video, issue comments, or submitted materials.

### Eligibility/data integrity
- Matching logic is deterministic, but the UJ 2027 catalogue is marked `DRAFT_NOT_FOR_DEFINITIVE_SCREENING`.
- All learner-facing outcomes from this catalogue must remain `UNKNOWN`. Do not describe results as admissions decisions, ranked recommendations, or verified eligibility.
- Official UJ links are next-step references; a link is not proof that every catalogue field is current or verified.
- No admission or funding guarantees; no application submission capability.

### Testing and evidence
The repository contains Node tests and Playwright E2E coverage for form interaction, invalid marks, results, reset, keyboard focus, 320px layout, selected privacy behavior, and light/dark theme axe checks. The assistant inspected test source but did not execute tests locally. The owner previously reported successful CI on commit `0eafef65f42c10255ba6e307e6648ee822761a30`; that is not the current `main` SHA and is not current-candidate evidence. On inspected `main` SHA `d377512d38cf4e93833e1c50984605cac12adbdb`, the GitHub combined status endpoint returned a successful status named **Vercel** only. This does not establish relevant test workflows or release readiness.

### Open risks and deferred gates
- `G-SYN-001`: OPEN / NOT PASSED.
- Catalogue source/version/rule reconciliation and curator sign-off are incomplete.
- Manual keyboard/screen-reader review and full hosting/provider/telemetry privacy review are incomplete.
- Current-candidate exact-commit tests/build and two full manual rehearsals are not evidenced here.
- Funding matching and manual application tracking are not part of the verified core journey.
- No production readiness, legal/privacy certification, cloud deployment, or real learner-data processing is claimed.

### Evidence links
- Repository: https://github.com/s1xte3n/studypath-sa
- Parent tracker: https://github.com/s1xte3n/studypath-sa/issues/160
- Demo/submission task: https://github.com/s1xte3n/studypath-sa/issues/164
- Synthetic-only gate: https://github.com/s1xte3n/studypath-sa/blob/main/docs/project/G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md
- Submission checklist: https://github.com/s1xte3n/studypath-sa/blob/main/docs/project/HACKATHON-SUBMISSION-CHECKLIST.md
- Add final-candidate CI run URLs only after the relevant workflows complete on that exact SHA.

## 2. Lean Business Canvas — draft content

Use Sonke's actual fields; adapt wording to the available form without making stronger claims than the evidence supports.

| Canvas field | Evidence-aligned draft |
|---|---|
| Problem | South African learners must piece together qualification options and admissions information across sources, and may struggle to understand what to investigate next. Validate the scale and frequency through learner/career-guidance research. |
| Customer segments | Primary hypothesis: South African Grade 11–12 learners and recent matric graduates. Supporting users such as school career-guidance staff, parents/guardians and youth organisations are not yet validated. |
| Unique value proposition | One clear study-pathway exploration journey that explains what is known, what remains uncertain, and where to verify information. |
| Solution | Current prototype: enter study stage, subjects and marks; explore draft UJ pilot pathway cards; read uncertainty notes and official-source links. Verified multi-institution catalogue, funding discovery and manual application tracking are roadmap items, not current verified capabilities. |
| Channels | Hypotheses to test: school career-guidance networks, community/youth organisations and digital discovery. No partnership or distribution agreement is claimed. |
| Revenue / sustainability | Unvalidated options for research: institutional/career-guidance partnerships, sponsored support with conflict-of-interest controls, or grant/impact funding. No revenue, payer commitment, or commercial traction is evidenced. |
| Costs | Current demo runs locally with repository-managed dependencies. Cloud costs are not incurred/verified by this task. The documented R100/month constraint is a planning ceiling, not a validated production cost estimate. |
| Key metrics | Pilot metrics to test: successful journey completion, learner understanding of UNKNOWN/limitations, successful official next-step discovery, task completion time, usability feedback. No usage or traction figures are claimed. |
| Unfair advantage | Proposed differentiation to test: explainable uncertainty-aware pathway exploration and traceable source evidence. No exclusive data, proprietary catalogue, or confirmed partnership is claimed. |
| Existing alternatives | Research task: compare official university admissions pages, school career guidance and existing study/career discovery services before asserting competitive position. |
| Early adopters | Hypothesis: learners actively comparing study options and career-guidance staff supporting matric learners. No early-adopter cohort is confirmed. |

## 3. Manual Sonke actions — owner only

- [ ] Confirm the team profile exists and all intended team members are listed.
- [ ] Open the actual SSDLC fields and transfer/edit this draft to match the portal schema.
- [ ] Open the actual Lean Business Canvas fields and transfer/edit this draft.
- [ ] Attach the final PDF deck and submit the video as Sonke requires.
- [ ] Confirm deadline timezone and file-size/format/link restrictions in Sonke.
- [ ] Use **Submit Files** from the dashboard/team page.
- [ ] Capture the confirmation/receipt and verify the submission is marked received.

Do not report portal steps as complete until the owner supplies confirmation evidence.


---

## Current implementation baseline update — 2026-10-24

Reviewed `main` SHA: `268e4f55ccfce55874f6621a0b491acf93c6432f` (PR #204 merged). Current browser E2E coverage verifies 30 draft-catalogue candidates and all 30 learner-facing eligibility states as `UNKNOWN`. Do not reuse earlier seven-card wording in a live demo or deck. The separate APS calculator remains provisional and does not determine programme eligibility.

Exact-SHA merge checks reported successful: [Browser E2E/privacy/accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/40109136651), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/40109136649), and [browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/40109136652). Preview deployment job [40109136711](https://github.com/s1xte3n/studypath-sa/actions/runs/40109136711) was skipped. These CI results do not mean Sonke portal fields, final deck/video, rehearsal, or submission are complete.
