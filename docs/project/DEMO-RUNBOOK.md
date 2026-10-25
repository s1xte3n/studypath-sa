# StudyPath SA — Hackathon Demo Runbook

**Status:** rehearsal-ready draft; the owner must rehearse against the frozen candidate before recording/submission.  
**Source baseline reviewed:** `main` commit `d1378dc61b7dd742c422e5431d93985abd3f45c0` (2026-10-25). The live UI and full rehearsal on the frozen submission candidate remain owner tasks.  
**Data boundary:** fictional learner inputs only. No real learner records.

## Chosen synthetic profile

- Current stage: **Grade 12**
- Subject 1: **Mathematics — 75**
- Subject 2: **Physical Sciences — 81**
- No learner name, ID number, school, contact details, or other identifying information.

Expected result: the current draft UJ 2027 catalogue displays **30 pathway cards**, and every displayed eligibility state remains **Unknown**. With only two entered subjects, the provisional APS panel must explain that a total is unavailable because it requires exactly six distinct supported non-Life-Orientation subjects; APS does not change eligibility. Do not call these recommendations, ranked matches, admission decisions, or confirmed eligibility. Marks are plausible synthetic demo inputs, not evidence of qualification thresholds.

## Timed live demo (target: 3 minutes)

| Time | Exact interaction | Expected observation / narration |
|---|---|---|
| 0:00–0:20 | Open the local app in a fresh browser tab. | Empty stage and subject/mark fields; no learner inputs prefilled. State that this is a local prototype and use fictional data only. |
| 0:20–0:45 | Select **Grade 12**. Select **Mathematics**, enter **75**. Click **Add another subject**; choose **Physical Sciences**, enter **81**. | Inputs remain in the page; no account or name field is requested. |
| 0:45–1:00 | Change one mark to **101**, click **Explore pathways**, then restore it to **75**. | Clear validation says marks must be whole numbers from 0–100. Invalid input must not produce results. Correcting the mark should clear the stale error. |
| 1:00–1:35 | Click **Explore pathways** with valid values. | “Pathway exploration completed”; 30 cards; every eligibility state is **Unknown**. Explain the catalogue is draft and not approved for definitive screening. |
| 1:35–2:00 | On one card, open **View pathway details and next steps**. Point to eligibility limitation, requirement notes, official UJ source links, and source checked date where shown. | Links are for independent verification. Costs, deadlines and funding are not supplied by this catalogue. StudyPath SA does not submit applications. |
| 2:00–2:30 | Save up to three cards using **Save to shortlist**. Show **Compare saved pathways** and its rows/count; remove one pathway and confirm the comparison updates. | The comparison uses recorded fields only; missing values are labelled “Not recorded”. Saved selections are in page memory only. Do not imply the tracker submits applications. |
| 2:30–2:45 | Toggle theme and switch back, then click **Reset**. | Light and dark themes are available. Reset clears profile, results, shortlist, comparison and tracker state. Do not claim full manual accessibility certification. |
| 2:45–3:00 | Reload the page. | Learner inputs/results are not restored. Close by stating catalogue curation and verification remain open. |

## Recording version (maximum 90 seconds)

- **0–8s:** State the learner problem and introduce StudyPath SA.
- **8–20s:** Enter Grade 12, Mathematics 75, Physical Sciences 81.
- **20–28s:** Show invalid mark 101, validation, and correction.
- **28–42s:** Explore pathways; show 30 cards and **Unknown** states.
- **42–54s:** Expand details and show an official UJ source link.
- **54–69s:** Save up to three pathways; show comparison rows/count, then remove one and show the comparison update.
- **69–78s:** Toggle theme and press **Reset**.
- **78–90s:** State that the catalogue is a draft, results are not admission decisions, and no application is submitted.

The supplied programme limits the video to 90 seconds. After recording, verify actual duration and test the link in a private/incognito session. Insert the final working URL into the deck and checklist; until then, video and final deck-link criteria remain **OPEN**.

## Reset / restart

1. Press **Reset**.
2. Reload and confirm stage/subject/mark fields are empty.
3. If unresponsive, close the tab and open a new local app tab/session.
4. Do not paste or retain real learner data in notes, screenshots, overlays, URLs, or logs.

## Fallback if a live interaction fails

1. Stop repeating the failed action; do not improvise an unsupported feature.
2. Reload the local app and rerun the synthetic profile once.
3. If still unavailable, use screenshots from the same frozen candidate and explicitly label the segment as a screenshot/recorded fallback. Do not claim the live app succeeded.
4. If results do not appear or any draft result is not **Unknown**, stop the demo/recording until investigated.
5. If a source link fails, disclose that it could not be verified during the demo; do not invent its contents.
6. If theme switching fails, continue in the default theme and record the defect; do not claim both themes were demonstrated.

## Rehearsal checklist (owner to complete)

- [ ] Start from a fresh browser session on the frozen candidate commit.
- [ ] Run the full 3-minute journey twice.
- [ ] Verify invalid input blocks results.
- [ ] Verify 30 results all show **Unknown**.
- [ ] Open at least one official-source link and confirm the destination.
- [ ] Verify both themes.
- [ ] Save up to three pathways; verify comparison rows/count update after saving and removal.
- [ ] Verify Reset clears shortlist/comparison/tracker as well as profile/results; reload must not restore learner state.
- [ ] Verify 320px layout and keyboard-only completion.
- [ ] Record screen-reader/manual accessibility findings separately.
- [ ] Record candidate SHA, browser/OS, exact command, pass/fail, and deviations.
- [ ] After recording, verify video duration <=90 seconds, audio/readability, and private-session link access.

**Evidence limitation:** source files and browser tests were inspected remotely; this assistant did not run the app, perform the rehearsal, record video, or verify a final video link.
