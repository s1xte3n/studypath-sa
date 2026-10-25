# Issue #219 — Student discovery acceptance run

> **Scope update:** Issue [#187](https://github.com/s1xte3n/studypath-sa/issues/187) changes the old blanket-UNKNOWN demo expectation. The earlier CI/manual evidence below describes the prior behaviour only and does not verify the provisional eligibility change. Rerun checks against the #187 PR head before accepting the updated behaviour.

**Purpose:** Record repeatable automated and manual acceptance evidence for the source-backed hackathon demo. This file is a run plan until candidate-commit CI and owner-performed manual checks are recorded below.

## Candidate and scope

- Tracking issue: [#219 — Finalise the source-backed student discovery demo and acceptance run](https://github.com/s1xte3n/studypath-sa/issues/219)
- Parent delivery tracker: [#160](https://github.com/s1xte3n/studypath-sa/issues/160)
- Latest candidate main commit after PR #231: `c064b98d6c58649e529cdb43a5a1beac6624e612` (documentation-only acceptance evidence update; not an application-code change). The application behaviour was last changed earlier; required CI workflows were rerun against this latest main commit.
- Updated synthetic profile for positive/negative/unknown coverage: Grade 12; English Home Language 65; Mathematics 75; Physical Sciences 68; Life Sciences 62; Geography 71; Business Studies 66.
- Updated catalogue expectation: 30 candidate cards; show `ELIGIBLE` for records whose currently recorded minimums are met, `NOT_ELIGIBLE` when an explicit applicable minimum is failed, and `UNKNOWN` only when required inputs or material rule interpretations prevent evaluation. Counts must reconcile with the visible cards.
- Product boundary: draft 2027 pilot catalogue; no definitive admissions screening, guaranteed admission/funding, application submission, persistent learner records, or production deployment.

## Automated coverage added for this issue

The new Playwright case in `tests/e2e/shortlist-tracker.spec.mjs` covers one fresh-session journey:

1. Empty profile, enter the six-subject synthetic profile and confirm completeness reaches 100%.
2. Explore pathways and reconcile the 30 visible cards, catalogue total, visible count, and the ELIGIBLE / NOT_ELIGIBLE / UNKNOWN state counts.
3. Confirm at least one provisional match, one explicit negative result, and one UNKNOWN result; inspect the explanation and source evidence for each.
4. Apply the UNKNOWN filter and confirm counts/results remain consistent.
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
| Browser MVP build / tests on latest main commit `de1910e0d04c01a85119fca4ef5d72bc4bd357bb` | [GitHub Actions run 40188765506](https://github.com/s1x6te3n/studypath-sa/actions/runs/40188765506) — completed successfully, per owner-provided result |
| Browser E2E, privacy and accessibility on latest main commit `de1910e0d04c01a85119fca4ef5d72bc4bd357bb` | [GitHub Actions run 40188765456](https://github.com/s1x6te3n/studypath-sa/actions/runs/40188765456) — completed successfully, per owner-provided result |
| Contract tests on latest main commit `de1910e0d04c01a85119fca4ef5d72bc4bd357bb` | [GitHub Actions run 40188765461](https://github.com/s1x6te3n/studypath-sa/actions/runs/40188765461) — completed successfully, per owner-provided result |
| Browser MVP build / tests on latest main commit `bbc482a12ea38193e2c5e717b01e4e91fd88aeaa` | [GitHub Actions run 40189130267](https://github.com/s1x6te3n/studypath-sa/actions/runs/40189130267) — completed successfully, per owner-provided result |
| Contract tests on latest main commit `bbc482a12ea38193e2c5e717b01e4e91fd88aeaa` | [GitHub Actions run 40189130252](https://github.com/s1x6te3n/studypath-sa/actions/runs/40189130252) — completed successfully, per owner-provided result |
| Browser E2E, privacy and accessibility on latest main commit `bbc482a12ea38193e2c5e717b01e4e91fd88aeaa` | [GitHub Actions run 40189130226](https://github.com/s1x6te3n/studypath-sa/actions/runs/40189130226) — completed successfully, per owner-provided result |
| Browser MVP build / tests on latest main commit `c064b98d6c58649e529cdb43a5a1beac6624e612` | [GitHub Actions run 40189491842](https://github.com/s1xte3n/studypath-sa/actions/runs/40189491842) — completed successfully, per owner-provided result |
| Contract tests on latest main commit `c064b98d6c58649e529cdb43a5a1beac6624e612` | [GitHub Actions run 40189491838](https://github.com/s1xte3n/studypath-sa/actions/runs/40189491838) — completed successfully, per owner-provided result |
| Browser E2E, privacy and accessibility on latest main commit `c064b98d6c58649e529cdb43a5a1beac6624e612` | [GitHub Actions run 40189491872](https://github.com/s1xte3n/studypath-sa/actions/runs/40189491872) — completed successfully, per owner-provided result |
| Exact PR-head SHA / URL used for the owner-attested manual run | Not recorded; deferred and not required for the current hackathon acceptance run |

**Evidence boundary:** these are GitHub Actions results reported in the issue evidence comment, not commands run in this session. Successful automation does not count as a manual rehearsal or prove production deployment. The source-link checks are excluded from remaining acceptance work by explicit project-owner decision.

## Historical manual acceptance checklist — owner attestation (2026-10-25)

The checklist below attests to the **previous** all-UNKNOWN behaviour. It is retained as historical evidence and must not be used to claim the new provisional eligibility behaviour has passed manual acceptance.

**Status:** The project owner stated in the project conversation on 2026-10-25 that all manual acceptance checks listed below were performed and approved. This is recorded as **owner-attested**, not independently reproduced by the assistant. The assistant did not operate an interactive browser or independently perform these checks in its current session; the issue comment saying manual acceptance was "NOT RUN in this session" refers to that limitation and does not negate the separate owner attestation. Additional traceability details (browser/OS, exact tested URL, individual rehearsal timings, and supporting screenshots/video) are not recorded and are deferred; they are not blockers for the current hackathon acceptance run. Do not interpret this attestation as a production-readiness or definitive-admissions approval.

- [x] Existing official source links — project-owner approved; the owner confirms the links are working. No additional source-link verification is required for this acceptance run.
- [x] Confirm the previous build showed all 30 cards as UNKNOWN and disclosed draft/unverified status. — Owner-attested pass for the previous build only.
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

## Updated demo profile and expected outcomes (pending #187 verification)

1. Start from an empty page and choose Grade 12.
2. Enter English Home Language = 65, Mathematics = 75, Physical Sciences = 68, Life Sciences = 62, Geography = 71, and Business Studies = 66.
3. Select **Explore pathways**.
4. Expected: 30 candidates; the state counts reconcile to 30 and include useful provisional positive and negative outcomes plus UNKNOWN for genuinely unresolved cases. The provisional APS panel remains separately labelled and does not determine eligibility.
5. Open at least one source-backed provisional match, one NOT_ELIGIBLE result, and one UNKNOWN result. Read the recorded requirement, reason, source page and caveat.
6. Save/compare pathways, then reset and reload.
7. Expected: reset/reload leave no learner profile, results or shortlist restored.
8. **Not yet verified:** rerun the browser journey and record new CI/manual evidence for the #187 branch before calling this accepted.

## Known limitations and stop conditions

- Catalogue records remain approved for hackathon-demo use only, not definitive screening. Provisional ELIGIBLE means the learner meets the minimum requirements currently recorded; it is not a university decision or guarantee. UNKNOWN remains appropriate where a material rule or required input prevents evaluation.
- Do not invent a source URL if a link is absent. If an available source fails to open during manual rehearsal, record it as a defect and use the documented fallback with disclosure.
- If a provisional state is displayed without the provisional explanation and source/limitation disclosure, stop the demo and investigate. Do not describe demo outcomes as institutionally verified or guaranteed admission.
- Final deck export, fresh candidate screenshots, video recording (maximum 90 seconds), final video link, portal completion and submission receipt remain separate deliverables tracked under [#164](https://github.com/s1xte3n/studypath-sa/issues/164). This acceptance run does not mark them complete.
