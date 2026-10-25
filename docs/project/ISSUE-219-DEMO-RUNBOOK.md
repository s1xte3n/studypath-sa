# Issue #219 — Student discovery demo runbook

**Purpose:** repeat the bounded StudyPath SA hackathon demo from a fresh browser session. Use synthetic marks only. This runbook describes the current React/Vite prototype; it does not claim definitive admissions screening or production readiness.

## Candidate and preflight

1. Open the candidate pull request for Issue [#219](https://github.com/s1xte3n/studypath-sa/issues/219) and record its exact head SHA after the latest change.
2. Wait for the required CI workflows on that exact SHA. Record the workflow URLs and result in the PR/issue; do not substitute a green run from an earlier SHA.
3. Start the app using the repository's documented development command (`npm run dev`) or serve the built app using the configured preview workflow.
4. Open a private/incognito window or a fresh browser context at the demo URL. Confirm the default blank profile and no prior result cards. The app keeps learner input, results, shortlist, and tracker in page memory only.
5. Use the light theme first. Keep the official source details available in another tab if presenting live.

## Synthetic learner profile

Set **Current stage** to **Grade 12** and enter these six distinct supported subjects and fictional marks:

| Subject | Synthetic mark |
|---|---:|
| English Home Language | 70 |
| Mathematics | 75 |
| Physical Sciences | 72 |
| Life Sciences | 68 |
| Geography | 71 |
| Business Studies | 74 |

These are illustrative test inputs, not a real learner's results and not a recommendation or admission prediction. Submit **Explore pathways**.

## Expected visible outcomes

- The profile completeness indicator updates from the current form state.
- Discovery results and summary counts are generated from the catalogue/results currently loaded by the application. Read the visible total and state counts during the run; do not narrate a hardcoded count.
- Each card displays the result's actual `ELIGIBLE`, `NOT_ELIGIBLE`, or `UNKNOWN` state and its current explanation. Unresolved or insufficient evidence must remain `UNKNOWN`; a provisional APS estimate is not programme eligibility.
- Open at least one card's details and confirm that the displayed source title, location/page reference, and URL come from the existing catalogue evidence. If a programme-specific link is absent, the UI must say so instead of inventing a link.
- Use the eligibility filter, then clear filters and confirm the visible count reconciles with the displayed cards.
- Save three distinct pathways. The comparison table should show those three selected pathways and only supported catalogue fields: name, institution, campus, programme code, published duration, actual eligibility state/explanation, and recorded official source links. Missing fields should read **Not recorded** or otherwise clearly indicate absence.
- Confirm the full-capacity message and disabled save action when three items are saved. Remove one option, then save another. The comparison and saved count should update together.
- Toggle dark mode and confirm the comparison remains readable. At 320 CSS px, the comparison table may scroll within its own labelled region; the page itself should not gain horizontal overflow.

Do not claim a fixed distribution of eligibility states without checking the rendered results on the candidate commit. Catalogue records and rule evaluations can change; the UI is the runtime source for the values narrated in the demo.

## Reset and fresh-session check

1. Click **Reset** and confirm the stage, subject rows, marks, validation notice, results, filters, saved pathways, comparison, and manual tracker are cleared.
2. Reload the page and confirm learner-specific values and results do not return.
3. If time permits, repeat the profile entry once to demonstrate that the flow can be rerun.

## Fallback if a live interaction fails

- Refresh the page to restore the blank, transient state and re-enter the synthetic profile.
- If the live app or network is unavailable, present a previously captured screenshot/video only if it is from the same reviewed candidate version and is clearly labelled as a recording. Do not imply the interaction is currently working.
- If comparison fails, demonstrate pathway cards and available source details only; explicitly disclose that comparison is blocked and do not claim Issue #219 is accepted.
- If a source URL fails, state that the recorded link did not load during the demo. Do not replace it with an unverified URL on the fly.

## Verification commands and evidence record

Run these against the candidate PR checkout/commit:

```sh
npm test
npm run build
npx playwright test
```

Record the exact SHA, commands, exit codes, and CI links in the PR/issue. If a script is absent or a check is blocked, record it as blocked rather than silently omitting it. Keep automated results separate from owner-performed/manual checks.

| Evidence item | Result / link |
|---|---|
| Candidate PR-head SHA | Pending candidate PR |
| Unit/domain tests (`npm test`) | Pending CI on exact SHA |
| Production build (`npm run build`) | Pending CI on exact SHA |
| Browser/E2E/accessibility tests (`npx playwright test`) | Pending CI on exact SHA |
| Light/dark and 320px review | Record actual reviewer, viewport, and result |
| Official source-link spot checks | Record exact links opened and outcome |
| Fresh-session, reset, and reload | Record actual outcome |
| Known limitations | Draft catalogue, unresolved requirements, and any failures found |

## Product and data disclosures

- Synthetic marks only; do not enter real student information.
- The catalogue is approved for the bounded hackathon demo only and is not UJ endorsement or a definitive admissions catalogue.
- Eligibility reflects current deterministic rules and available repository evidence; missing or unresolved evidence remains `UNKNOWN`.
- APS is provisional, subject to its displayed source and limitation notes, and never overrides pathway eligibility.
- Costs, deadlines, funding, and direct application submission are not provided by this demo.
- No learner profile persists across reload or is intentionally sent to a server by the local application.
- G-SYN-001 remains a separate gate; this demo/runbook does not pass it or establish production readiness.
