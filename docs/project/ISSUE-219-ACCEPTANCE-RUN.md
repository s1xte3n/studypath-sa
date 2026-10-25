# Issue #219 — Student discovery acceptance run

**Purpose:** Record repeatable automated and manual acceptance evidence for the source-backed hackathon demo. This file is a run plan until candidate-commit CI and owner-performed manual checks are recorded below.

## Candidate and scope

- Tracking issue: [#219 — Finalise the source-backed student discovery demo and acceptance run](https://github.com/s1xte3n/studypath-sa/issues/219)
- Parent delivery tracker: [#160](https://github.com/s1xte3n/studypath-sa/issues/160)
- Candidate main commit after PR #228: `2b89ac280b93c038914600c66c72f82aff65def9` (documentation-only source-link scope correction; not an application-code change)
- Synthetic profile: Grade 12; Mathematics 75; Physical Sciences 81.
- Catalogue expectation in the current browser tests: 30 candidate cards, all `UNKNOWN`.
- Product boundary: draft 2027 pilot catalogue; no definitive admissions screening, guaranteed admission/funding, application submission, persistent learner records, or production deployment.

## Automated coverage added for this issue

The new Playwright case in `tests/e2e/shortlist-tracker.spec.mjs` covers one fresh-session journey:

1. Empty profile, enter the synthetic profile and confirm completeness reaches 100%.
2. Explore pathways and reconcile the 30 visible cards, catalogue total, visible count and all-UNKNOWN state.
3. Apply the UNKNOWN filter and confirm counts/results remain consistent.
4. Open a recorded official-source link in a new tab and assert the opened URL equals the recorded HTTPS URL.
5. Save a pathway, verify a single shortlist/comparison row, toggle it off and verify no duplicate remains.
6. Save again, reset, and confirm profile/results/shortlist clear.
7. Reload and verify no learner state is restored in local storage, session storage or cookies.

Existing browser tests separately cover invalid mark handling, keyboard use, 320px layout, theme switching, provisional APS disclosure, source-link propagation into comparison, the three-item limit, and transient tracker state.

## Required commands and CI evidence

Run against the exact pull-request head SHA, not an assumed or older baseline:

```sh
npm ci --no-audit --no-fund
npm test
npx playwright test
npm run build
```

The repository's Browser E2E, privacy and accessibility workflow also installs Chromium and runs these checks. Record evidence after GitHub Actions completes:

| Evidence | Result |
|---|---|
| Earlier candidate commit | `6ea58b91b2f771d34d0f0b9781de3dd4dc2b6488` (previously reported; not the current evidence target) |
| PR #228 merge commit | `2b89ac280b93c038914600c66c72f82aff65def9` — documentation-only scope correction |
| Browser MVP build / tests on PR #228 merge | [GitHub Actions run 40188274276](https://github.com/s1x6te3n/studypath-sa/actions/runs/40188274276) — completed successfully, per owner-provided result |
| Browser E2E, privacy and accessibility on PR #228 merge | [GitHub Actions run 40188274290](https://github.com/s1x6te3n/studypath-sa/actions/runs/40188274290) — completed successfully, per owner-provided result |
| Contract tests on PR #228 merge | [GitHub Actions run 40188274295](https://github.com/s1x6te3n/studypath-sa/actions/runs/40188274295) — completed successfully, per owner-provided result |
| Exact PR-head SHA / URL used for the owner-attested manual run | Not recorded; deferred and not required for the current hackathon acceptance run |

**Evidence boundary:** these are GitHub Actions results reported in the issue evidence comment, not commands run in this session. Successful automation does not count as a manual rehearsal or prove production deployment. The source-link checks are excluded from remaining acceptance work by explicit project-owner decision.

## Manual acceptance checklist — owner attestation (2026-10-25)

**Status:** The project owner stated in the project conversation on 2026-10-25 that all manual acceptance checks listed below were performed and approved. This is recorded as **owner-attested**, not independently reproduced by the assistant. The assistant did not operate an interactive browser or independently perform these checks in its current session; the issue comment saying manual acceptance was "NOT RUN in this session" refers to that limitation and does not negate the separate owner attestation. Additional traceability details (browser/OS, exact tested URL, individual rehearsal timings, and supporting screenshots/video) are not recorded and are deferred; they are not blockers for the current hackathon acceptance run. Do not interpret this attestation as a production-readiness or definitive-admissions approval.

- [x] Existing official source links — project-owner approved; the owner confirms the links are working. No additional source-link verification is required for this acceptance run.
- [x] Confirm all 30 cards show UNKNOWN and that explanations disclose the draft/unverified status. — Owner-attested pass.
- [x] Confirm campus/eligibility filters and visible counts reconcile with the displayed cards. — Owner-attested pass.
- [x] Save and remove pathways; verify empty, one-item, and three-item shortlist states; verify comparison rows follow saved items. — Owner-attested pass.
- [x] Confirm reset clears the profile, results, filters, shortlist and tracker. — Owner-attested pass.
- [x] Reload and confirm no learner-specific state is restored. — Owner-attested pass.
- [x] At 320px, verify no page-level horizontal overflow; confirm comparison remains usable by scrolling within its own container. — Owner-attested pass.
- [x] Verify light/dark theme and keyboard-only operation through profile, discovery, source links and shortlist. — Owner-attested pass.
- [x] Review manual accessibility behaviour and record findings separately; automated axe checks are not treated as screen-reader certification. — Owner-attested pass; detailed findings not supplied.
- [x] Run the timed demo twice. — Owner-attested pass; individual timings and rehearsal artefacts not supplied.

| Manual evidence | Result |
|---|---|
| Date of owner attestation | 2026-10-25 |
| Operator | Project owner (attested in project conversation; GitHub identity not independently matched) |
| Exact candidate SHA / URL used | Not recorded; deferred for the current hackathon acceptance run |
| Browser and OS | Not recorded; deferred |
| Official source links | Owner-approved and confirmed working; no further verification requested |
| Desktop and 320px mobile | Owner-attested pass |
| Themes and keyboard-only flow | Owner-attested pass |
| Two complete rehearsals | Owner-attested pass; timings/recordings deferred |
| Defects / deviations | None reported by owner; no separate defect log supplied |
| Supporting evidence | Not supplied with the attestation; deferred |

**Disposition note:** the owner-attested manual checklist and the assistant-session limitation are distinct evidence statements. The candidate merge SHA and reported CI run links are recorded above. The additional manual-run metadata (browser/OS, exact tested URL, individual rehearsal timings, and supporting artefacts) is explicitly deferred and is not a blocker for the current hackathon acceptance run. Do not claim these details were captured.

## Demo profile and expected outcomes

1. Start from an empty page.
2. Choose Grade 12.
3. Add Mathematics = 75 and Physical Sciences = 81.
4. Select **Explore pathways**.
5. Expected: 30 current catalogue candidates, all eligibility states UNKNOWN; the provisional APS total is unavailable for this two-subject profile because the demo rule requires exactly six distinct supported non-Life-Orientation subjects.
6. Source links already present in the demo are owner-approved. No additional source-link verification is part of this acceptance run.
7. Save/compare pathways, then reset and reload.
8. Expected: reset/reload leave no learner profile, results or shortlist restored.

## Known limitations and stop conditions

- Catalogue records remain draft/unverified; do not treat UNKNOWN as eligible or not eligible.
- Do not invent a source URL if a link is absent. If an available source fails to open during manual rehearsal, record it as a defect and use the documented fallback with disclosure.
- If any draft result displays a definitive eligibility state, stop the demo and investigate.
- Final deck export, fresh candidate screenshots, video recording (maximum 90 seconds), final video link, portal completion and submission receipt remain separate deliverables tracked under [#164](https://github.com/s1xte3n/studypath-sa/issues/164). This acceptance run does not mark them complete.
