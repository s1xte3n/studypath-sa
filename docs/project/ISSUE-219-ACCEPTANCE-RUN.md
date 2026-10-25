# Issue #219 — Student discovery acceptance run

**Purpose:** Record repeatable automated and manual acceptance evidence for the source-backed hackathon demo. This file is a run plan until candidate-commit CI and owner-performed manual checks are recorded below.

## Candidate and scope

- Tracking issue: [#219 — Finalise the source-backed student discovery demo and acceptance run](https://github.com/s1xte3n/studypath-sa/issues/219)
- Parent delivery tracker: [#160](https://github.com/s1xte3n/studypath-sa/issues/160)
- Current base observed before this change: `8b6bfbb4f66ef1f054a16bbbafa9648279a3d15a` (main)
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
| PR number / URL | Pending |
| Exact PR-head SHA | Pending |
| Unit and contract tests | Pending candidate CI |
| Playwright E2E | Pending candidate CI |
| Production build | Pending candidate CI |
| CI workflow run URLs | Pending candidate CI |

A successful workflow is automated evidence only; it does not count as a manual rehearsal or prove that an external website was reachable during a human demo.

## Manual acceptance checklist — owner to complete

Perform on the exact candidate build, using a fresh private/incognito session and synthetic data only.

- [ ] Open one official-source link from pathway details and confirm the destination is the intended institution/official document.
- [ ] Confirm all 30 cards show UNKNOWN and that explanations disclose the draft/unverified status.
- [ ] Confirm campus/eligibility filters and visible counts reconcile with the displayed cards.
- [ ] Save and remove pathways; verify empty, one-item, and three-item shortlist states; verify comparison rows follow saved items.
- [ ] Confirm reset clears the profile, results, filters, shortlist and tracker.
- [ ] Reload and confirm no learner-specific state is restored.
- [ ] At 320px, verify no page-level horizontal overflow; confirm comparison remains usable by scrolling within its own container.
- [ ] Verify light/dark theme and keyboard-only operation through profile, discovery, source links and shortlist.
- [ ] Record any manual accessibility findings separately; do not infer screen-reader certification from automated axe checks.
- [ ] Run the timed demo twice and record browser/OS, candidate SHA, outcome and deviations.

| Manual evidence | Result |
|---|---|
| Date/time and operator | Pending |
| Exact candidate SHA / URL used | Pending |
| Browser and OS | Pending |
| Official source destination checked | Pending |
| Desktop and 320px mobile | Pending |
| Themes and keyboard-only flow | Pending |
| Two complete rehearsals | Pending |
| Defects / deviations | Pending |

## Demo profile and expected outcomes

1. Start from an empty page.
2. Choose Grade 12.
3. Add Mathematics = 75 and Physical Sciences = 81.
4. Select **Explore pathways**.
5. Expected: 30 current catalogue candidates, all eligibility states UNKNOWN; the provisional APS total is unavailable for this two-subject profile because the demo rule requires exactly six distinct supported non-Life-Orientation subjects.
6. Open pathway details and inspect source provenance; use official sources to verify current requirements.
7. Save/compare pathways, then reset and reload.
8. Expected: reset/reload leave no learner profile, results or shortlist restored.

## Known limitations and stop conditions

- Catalogue records remain draft/unverified; do not treat UNKNOWN as eligible or not eligible.
- Do not invent a source URL if a link is absent. If an available source fails to open during manual rehearsal, record it as a defect and use the documented fallback with disclosure.
- If any draft result displays a definitive eligibility state, stop the demo and investigate.
- Final deck export, fresh candidate screenshots, video recording (maximum 90 seconds), final video link, portal completion and submission receipt remain separate deliverables tracked under [#164](https://github.com/s1xte3n/studypath-sa/issues/164). This acceptance run does not mark them complete.
