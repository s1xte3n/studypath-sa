# StudyPath SA — FNB AOTY Hackathon 2026 Deck Content

**Draft only — not a final exported deck.** The supplied programme (p. 3) allows **no more than 10 slides**, prefers PDF, requires the demo video link on the slides, and asks for product/features, screenshots, demo details, security, user journey and architecture. This draft contains exactly 10 slide sections.

**Source baseline reviewed:** `main` commit `d1378dc61b7dd742c422e5431d93985abd3f45c0` (2026-10-25). Live UI validation and fresh screenshots from the exact frozen candidate remain pending.

## Slide 1 — StudyPath SA
**Explore study pathways with more clarity.**  
For South African Grade 11–12 learners and recent matric graduates.  
Challenge: Access to higher education.  
*Prototype status: local browser demo; synthetic data only.*

## Slide 2 — The learner problem
Learners navigate scattered programme and admissions information. A useful next step is not just a list of courses: it is knowing what to investigate, what remains uncertain, and where official information lives.  
**Evidence status:** problem framing from the hackathon challenge; user research and market validation remain future work.

## Slide 3 — The StudyPath SA journey
1. Enter current study stage.
2. Add supported subjects and marks.
3. Explore pathway cards.
4. Read explanations, limitations and source links.
5. Verify requirements with the institution.

**Synthetic demo profile:** Grade 12; Mathematics 75; Physical Sciences 81.

## Slide 4 — Product walkthrough
Insert fresh screenshots from the frozen candidate of:
- Empty form and validation.
- Pathway results with **Unknown** states.
- Expanded details with official UJ links.
- Provisional APS panel showing its source and limitations.
- Saved-pathway comparison (including a removal/update interaction).
- Reset and theme toggle.

**Do not use screenshots from a different commit than the submitted build.**

## Slide 5 — Matching and uncertainty
The current application uses deterministic client-side logic to transform supported subjects/marks into pathway outcomes and includes a separate provisional APS panel. The APS estimate is not an eligibility decision and remains unavailable when the input does not meet its exact-six-subject rule. The UJ 2027 pilot catalogue is draft and not approved for definitive screening. Therefore, all learner-facing outcomes remain **UNKNOWN**.  
**Not an admission decision. No admission or funding guarantee.**

## Slide 6 — Trust and privacy boundary
- Synthetic learner data only.
- Current demo holds entries/results in page memory; reload clears them.
- Browser tests cover selected transmission/persistence paths.
- Full provider/hosting/telemetry and manual accessibility reviews remain open.
- No real learner-data processing, public deployment, or legal/privacy certification is claimed.

## Slide 7 — Technical architecture
**Implemented now:** React + Vite browser UI; JavaScript ES modules; local draft JSON catalogue; deterministic client-side matching/validation; Node tests and Playwright E2E tests.  
**Planned architecture, not deployed:** API-first services and Azure components described in architecture documents. The current demo does not use a verified hosted API runtime.  
Use a two-part diagram labelled “Implemented local demo” vs “Planned future architecture”; do not draw planned cloud services as live components.

## Slide 8 — Impact and sustainability
**Intended impact:** help learners discover next steps and interpret uncertainty, rather than replace official admissions guidance.  
**Measures to test:** task completion, comprehension of unknown states, successful source discovery, usability feedback.  
**Sustainability hypotheses:** education/career-guidance partnerships or grant/impact support, subject to validation. No traction, revenue, or partnerships are claimed.

## Slide 9 — Judge demo and video
**Live demo:** follow `docs/project/DEMO-RUNBOOK.md`; use fictional Grade 12 / Mathematics 75 / Physical Sciences 81. Demonstrate saving, comparing and removing pathways only after rehearsing those interactions on the frozen candidate. No account is needed for the local demo.  
**Demo video (<=90 seconds): LINK PENDING — insert tested final URL after recording.**  
This slide is not ready for submission until the final URL and private-session playback are verified.

## Slide 10 — Roadmap and close
1. Curate and verify catalogue requirements, source versions and sign-off.
2. Complete synthetic-only privacy, accessibility and release-gate evidence.
3. Validate usefulness with appropriate research before broadening institutions or adding funding.
4. Treat hosted runtime, identity, deployment and production operations as separately approved post-hackathon work.

**Ask:** feedback on learner usability, clarity of uncertainty, and which verified official sources most improve the next-step journey.

## Export/freeze checklist

- [ ] Export PDF at <=10 slides.
- [ ] Replace screenshot placeholders with screenshots from the frozen candidate SHA.
- [ ] Replace the video placeholder with a working URL; verify in private/incognito session.
- [ ] Check no real learner data, secrets, misleading claims, or draft data presented as verified.
- [ ] Verify every slide and link; confirm the PDF opens and is readable.
- [ ] Record candidate SHA and final deck location in `HACKATHON-SUBMISSION-CHECKLIST.md`.
