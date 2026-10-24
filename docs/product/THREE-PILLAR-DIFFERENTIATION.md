# StudyPath SA — Three-Pillar Differentiation Plan

**Status:** Proposed product direction; documentation only. This is not evidence that all capabilities are implemented or that learner demand has been validated.
**Date:** 2026-10-24
**Trigger:** Mentor feedback from Ronny Mabokela (University of Johannesburg): “There seems to be many solutions addressing the same problem. Please try to be unique.”
**Goal:** Differentiate StudyPath SA by supporting the learner from understanding their realistic options, through finding alternative routes, to taking practical next steps.

## Positioning hypothesis

> StudyPath SA helps South African Grade 11–12 learners and recent matric graduates understand which study pathways their actual marks may support, discover evidence-backed alternatives when a preferred route is blocked or uncertain, and organise the next steps they need to take.

This is a hypothesis to validate with learners and mentors, not a proven competitive advantage. Do not claim that no competitor offers these capabilities until competitor research supports that claim.

## Pillar 1 — “What can I do with my actual marks?”

### User problem
Learners need to understand how their current subjects and marks relate to programme requirements, and what is known versus missing.

### Intended experience
- Capture and validate school stage, subjects and marks.
- Show the requirements and source evidence relevant to each pathway.
- Explain each eligibility outcome with the applicable rule and learner data.
- Keep eligibility deterministic and separate from ranking or personal preference.
- Use the canonical states `ELIGIBLE`, `NOT_ELIGIBLE`, and `UNKNOWN`.
- Where supported by a verified, versioned rule set, show an explainable indicative APS calculation; never treat APS alone as proof of admission.
- Link to official institution requirements and disclose source version, date and limitations.

### Existing plan / gap
- **Already planned / partly implemented:** core student input and explainable eligibility journey are in implementation issue [#161](https://github.com/s1xte3n/studypath-sa/issues/161); eligibility/catalogue publication safeguards are in [#187](https://github.com/s1xte3n/studypath-sa/issues/187).
- **Already tracked:** source-backed APS calculator in [#189](https://github.com/s1xte3n/studypath-sa/issues/189).
- **Not yet complete:** the UJ 2027 catalogue remains draft and learner-facing eligibility must remain `UNKNOWN` until source verification and curator sign-off support stronger outcomes. Interests/preferences and broad multi-institution catalogue coverage are not evidenced as implemented.

### Acceptance outcomes
- Every result explains the basis and the unknowns.
- Unsupported or missing rules never produce definitive eligibility.
- APS and eligibility are distinct; no admission guarantee is implied.
- Official links and source provenance are visible where available.

## Pillar 2 — “If I do not qualify, what other route can I take?”

### User problem
A course finder can leave learners at a dead end when a preferred programme does not fit their current results. Learners need realistic, explainable alternatives rather than a list of unrelated courses.

### Intended experience
- When the primary choice is `NOT_ELIGIBLE` or `UNKNOWN`, offer a separate “Explore alternatives” path where evidence-backed alternatives exist.
- Include degrees, diplomas, higher certificates and TVET options only where catalogue coverage supports them.
- Represent the relationship explicitly (for example, related field, alternate qualification type, bridging/foundation route, or progression route); do not infer that one qualification guarantees entry to another.
- Explain why each alternative is shown and which requirement/source supports the relationship.
- Show the destination institution, admission cycle, official source, verification date, unresolved data and eligibility state.
- If no reviewed relationship exists, say that no verified alternative is available yet; do not invent one.
- Keep alternative discovery separate from eligibility and ranking.

### Existing plan / gap
- **Already specified in requirements:** `REQ-ALT-001` and acceptance criteria `AC-ALT-001–007` in the requirements/traceability baseline; the end-product vision also includes pathway discovery and comparison.
- **Implementation gap:** traceability records no approved relationship pair and no complete alternative-pathway UI/data. The current catalogue is draft, so do not manufacture examples to make this pillar appear complete.
- **Related work:** [#187](https://github.com/s1xte3n/studypath-sa/issues/187) is a prerequisite for any catalogue-backed definitive claims. [#186](https://github.com/s1xte3n/studypath-sa/issues/186) covers shortlist/comparison, not the alternative-relationship engine itself.

### Acceptance outcomes
- Alternatives have an explicit, reviewed relationship type and rationale.
- Every relationship has authoritative source evidence, applicable cycle/version, verification date and curator approval before it is presented as verified.
- Unverified relationships are withheld or clearly marked `UNKNOWN`; no unsupported progression claims.
- Tests cover no alternatives, multiple alternatives, stale/missing source, missing relationship data, duplicate relationships and safe UNKNOWN handling.

## Pillar 3 — “What do I do next?”

### User problem
A recommendation is less useful if the learner does not know which documents, requirements, deadlines or funding opportunities to investigate next.

### Intended experience
- Provide a manual, learner-controlled action checklist for a chosen pathway.
- Track preparation states such as `NOT_STARTED`, `IN_PROGRESS`, `READY_TO_SUBMIT`, and `SUBMITTED_BY_LEARNER` only if these statuses are approved and accurately defined. The app must not imply it submits anything.
- Allow personal next actions and notes only within the approved privacy boundary.
- Show application deadlines, required documents, costs and funding opportunities only when sourced from authoritative, dated records; otherwise label as unavailable/unverified.
- Clearly distinguish an application-preparation reminder from an official deadline or an institution's application status.
- In the current browser-only demo, keep all learner-specific tracker state in page memory, cleared by reset/reload; do not add storage, accounts, network transmission or telemetry without a separate approved privacy/security decision.
- Do not guarantee funding, rank eligibility based on funding availability, or claim that funding/application submissions have occurred.

### Existing plan / gap
- **Already specified as target UX / requirement:** manual tracker appears in `END-PRODUCT-UX-VISION.md` and `REQ-APP-001`; funding discovery appears in `REQ-FUND-001` and the traceability baseline.
- **Not implemented in the current local demo:** the traceability matrix records no learner-facing tracker and no funding matching flow. The current MVP tracker explicitly defers funding and the manual tracker from the balanced sprint.
- **Implementation direction:** reuse the existing local-only state boundary first; defer persistent profiles, authenticated storage, cloud sync and application submission. Deadline/funding data needs a verified source catalogue before being presented as actionable facts.

### Acceptance outcomes
- The learner can add, update and clear a manual checklist for a selected pathway.
- Status transitions and reset behaviour are deterministic and tested.
- Deadlines, document lists, fees and funding information carry source/provenance and are not fabricated.
- Missing or stale records are disclosed as unavailable/unverified.
- Tests cover tracker state transitions, reset/reload, privacy channels, deadline uncertainty, and empty/error states.

## Cross-pillar user journey

1. Enter a synthetic learner profile and review source-backed results (Pillar 1).
2. Choose a preferred pathway; if it is unsuitable or uncertain, inspect only evidence-backed alternatives (Pillar 2).
3. Select a pathway to investigate and create a manual preparation checklist, with verified requirements/deadlines where available (Pillar 3).
4. Open official sources and complete all applications directly with the institution. StudyPath SA does not submit applications or guarantee admission/funding.

## Delivery and sequencing

1. Keep current P0 work and the catalogue publication gate stable; do not rebuild the working core journey.
2. Complete/verify the source-backed APS issue [#189](https://github.com/s1xte3n/studypath-sa/issues/189) only when its official rules and tests are grounded.
3. Establish at least one curator-reviewed alternative relationship before claiming Pillar 2 works with verified data; use a synthetic structural fixture for tests, never as official catalogue evidence.
4. Implement a minimal page-memory-only manual action tracker after the P0 journey remains green.
5. Add deadline/funding records only after provenance, freshness and rule review; show unavailable rather than guessing.
6. Run unit, contract, browser, privacy and accessibility regression tests for each increment; update traceability with actual commit/CI evidence.
7. Revalidate the proposition with mentor Ronny Mabokela and target learners. Change scope based on evidence, not assumptions.

## Non-goals and guardrails

- No automatic applications or claims that StudyPath SA contacted institutions.
- No admission or funding guarantees.
- No fabricated institutions, requirements, fees, deadlines, funding opportunities, alternatives or progression routes.
- No definitive eligibility from the draft UJ catalogue.
- No AI-authoritative eligibility decisions; use deterministic verified rules.
- No cloud provisioning, public production deployment, persistent learner data or paid service without separate approval.
- G-SYN-001 remains OPEN / NOT PASSED until all existing gate criteria and evidence are reviewed and approved.

## Validation questions

- Which part of this journey is currently hardest for learners to complete with existing tools?
- Do learners trust and understand the explanation of their eligibility and its sources?
- When their first choice is blocked, do they find the verified alternatives relevant and actionable?
- Does the action checklist help them make progress, and which fields are actually useful?
- Which existing products do learners currently use for each task, and what do those products already do well?
- Does this proposition change the mentor's “not unique enough” assessment after seeing a working, truthful demonstration?
