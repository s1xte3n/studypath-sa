# StudyPath SA — Hackathon Submission Checklist

**Event dates:** 23–25 October 2026.  
**Submission deadline:** Monday, 26 October 2026 at 23:59 through Sonke, according to the supplied programme. Confirm timezone and portal-specific restrictions in Sonke.  
**Source:** FNB AOTY Hackathon 2026 - Programme.pdf supplied with this project.

## Required Sonke submission

- [ ] Team profile created; required for judging even for a solo participant.
- [ ] Confirm the correct team members are listed.
- [ ] Presentation deck exported as PDF (programme says PDF preferred), no more than 10 slides.
- [ ] Deck includes product/features, screenshots, judge demo details/account if applicable, security/privacy approach, user-journey story, and technical architecture.
- [ ] Demo video is no more than 90 seconds.
- [ ] Demo video link is included on the slides.
- [ ] SSDLC fields completed in Sonke.
- [ ] Lean Business Canvas completed in Sonke.
- [ ] Required files/links submitted using Sonke's Submit Files workflow by the deadline.
- [ ] Final submission confirmation captured and checked.

## Recommended 10-slide deck structure

1. **Problem and impact** — South African learners face fragmented study-pathway information.
2. **Target user and story** — a Grade 11–12 learner needs to understand realistic next steps.
3. **StudyPath SA solution** — subjects/marks to explainable pathway outcomes.
4. **Live product journey** — screenshots of input, validation, results and details.
5. **How matching works** — deterministic requirements; ELIGIBLE, NOT_ELIGIBLE, UNKNOWN; missing evidence remains unknown.
6. **Trust and privacy** — synthetic-only demo, page-memory state, no learner-data transmission, source provenance and limitations.
7. **Architecture** — current local React/Vite slice and intended API-first Azure architecture, clearly distinguishing implemented from planned.
8. **Impact and sustainability** — intended outcomes and a proposed sustainability model; do not claim traction without evidence.
9. **Demo instructions and video** — exact run/demo instructions or deployed URL only if verified; video link; synthetic test profile.
10. **Roadmap and ask** — immediate hackathon MVP, next validation steps, post-hackathon production-hardening gates.

Keep the deck truthful: planned Azure services are not deployed services; synthetic/demo records are not verified admissions data; matches are not admissions decisions. Preserve mandatory information while staying at or below 10 slides.

## 90-second demo storyboard

- **0–10 seconds:** State the problem and open StudyPath SA.
- **10–25 seconds:** Enter a supported synthetic learner profile and demonstrate accessible validation.
- **25–50 seconds:** Generate actual evaluator-backed results and explain status/reasons, including uncertainty.
- **50–65 seconds:** Open a result's source/requirement detail and show the official next step.
- **65–78 seconds:** Demonstrate reset and explain that inputs are held in page memory only.
- **78–90 seconds:** State the bounded catalogue/demo limitation and the next product step.

Record only after the full journey works reliably. Do not spend demo time on features that are not implemented.

## SSDLC evidence checklist

- [ ] Link the approved PRD and requirement matrix.
- [ ] Link the architecture and decision records.
- [ ] Link API/interface contracts and OpenAPI, noting that the local demo does not use a hosted runtime.
- [ ] Link test strategy, test cases and requirement-to-test traceability.
- [ ] Provide the PR/commit and CI run evidence for the submitted build.
- [ ] Summarise security/privacy controls and remaining limitations.
- [ ] Distinguish automated test evidence from manual checks.
- [ ] Explicitly state that Azure provisioning, public deployment, real learner data and production readiness are not claimed.

## Lean Business Canvas preparation

Use the actual Sonke fields. Keep every entry consistent with product evidence.

- **Problem:** learners must navigate fragmented admissions, qualification and funding information.
- **Customer segments:** South African Grade 11–12 learners and recent matric graduates; supporting stakeholders are hypotheses until validated.
- **Unique value proposition:** explainable, uncertainty-aware study pathways and next steps in one learner-centred journey.
- **Solution:** subject/mark input, deterministic screening, sourced pathway details and future verified funding/tracking.
- **Channels:** school/career guidance networks and youth/community partners are hypotheses, not existing partnerships unless evidenced.
- **Revenue/sustainability:** present options as hypotheses for validation; do not claim confirmed revenue or traction.
- **Costs:** retain the R100/month constraint as a planning decision, not a certified production cost estimate.
- **Key metrics:** completed pathway journeys, comprehension of reasons/uncertainty, successful next-step discovery and usability feedback.
- **Unfair advantage:** describe only defensible product differentiation; do not claim exclusive data or partnerships without evidence.

## Final submission freeze

Before upload:
- [ ] Freeze the demo commit and record its SHA.
- [ ] Re-run the exact checks required by the implementation handoff.
- [ ] Verify screenshots match the submitted build.
- [ ] Open the demo video link in a private/incognito session.
- [ ] Verify links, file readability, slide count and video duration.
- [ ] Run the complete demo twice, including a fresh start and reset.
- [ ] Upload early enough to allow for portal/network issues.
- [ ] Confirm Sonke shows the submission as received.

## Source caveat

The supplied programme states no presentations are scheduled; submission is through Sonke. The provided excerpt does not state the actual Sonke form fields, file-size limits, video-hosting requirements or timezone; verify those in the portal rather than assuming them.


---

## Demo-readiness assessment — 2026-10-24 (review branch; not submission approval)

**Reviewed main SHA:** `d377512d38cf4e93833e1c50984605cac12adbdb`. The supplied programme confirms: team profile required for judging; PDF preferred; maximum 10 slides; demo video maximum 90 seconds; video link on slides; SSDLC and Lean Business Canvas; upload through Sonke by Monday 26 October 2026 at 23:59. **Timezone and portal-specific restrictions remain unverified and must be checked in Sonke.**

### Added preparation artifacts on `docs/hackathon-demo-readiness`
- `docs/project/DEMO-RUNBOOK.md` — timed live journey, synthetic profile, reset/restart and fallback.
- `docs/project/PRESENTATION-DECK-CONTENT.md` — ten-slide content draft. Not an exported PDF; screenshots and final video link are placeholders.
- `docs/project/HACKATHON-SSDLC-LEAN-CANVAS-PREP.md` — evidence-based SSDLC and Lean Business Canvas draft for the actual portal fields.

### Status of required deliverables
- [x] Programme limits extracted from supplied PDF (10 slides; 90-second video; Sonke; SSDLC and Lean Business Canvas).
- [x] Synthetic profile and timed runbook drafted.
- [x] Ten-slide deck content drafted within the programme limit.
- [x] SSDLC and Lean Business Canvas preparation drafted with implemented/planned boundaries separated.
- [ ] Export final PDF and replace screenshot placeholders using the frozen candidate.
- [ ] Record video <=90 seconds and insert tested link into the deck.
- [ ] Rehearse twice from a fresh session and record candidate-specific evidence.
- [ ] Confirm team profile and portal requirements/timezone.
- [ ] Complete actual SSDLC and Lean Business Canvas fields in Sonke.
- [ ] Upload files via Submit Files and capture submission receipt.

No portal interaction, PDF export, screenshots, video recording, rehearsal, or submission was performed by this assistant. The supplied programme does not specify portal form field names, file-size limits, video-hosting rules, or timezone; verify them in Sonke rather than guessing.
