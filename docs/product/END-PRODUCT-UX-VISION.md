# StudyPath SA — End-Product Experience Vision

**Status:** Target experience / design requirements, not yet fully implemented  
**Purpose:** Record the product owner’s desired hackathon presentation experience and provide a baseline for gap analysis.  
**Scope boundary:** This document describes the intended learner-facing experience. It does not approve new admission rules, institution affiliation, official branding, or catalogue facts.

## 1. Product experience

StudyPath SA should help Grade 11–12 learners and recent matric graduates discover and compare study pathways through an approachable, mobile-first interface. The primary journey is:

1. Discover pathways.
2. Create or refine a learner profile using school stage, subjects, marks, interests and preferences.
3. Review pathway matches with a plain-language explanation of evidence, missing data and uncertainty.
4. Open official requirements and compare pathways.
5. Save a shortlist.
6. Track personal application preparation manually, without implying that StudyPath submits applications.

The interface should communicate: **eligibility is a starting point, not a promise of admission**.

## 2. Target information architecture

- **Discover:** learner profile completeness, pathway totals, filters, results and explanations.
- **My profile:** editable school stage, subjects and marks; validation and profile-completeness guidance.
- **Shortlist:** saved pathways, comparison details and manual application-progress tracking.
- **Theme control:** accessible light/dark mode toggle, respecting the operating-system preference on first load and allowing an explicit in-session override.

Navigation and controls must remain usable at narrow mobile widths. Important explanations and eligibility states must appear before secondary metadata.

## 3. Discovery dashboard

The target dashboard should support:

- A clear hero heading and concise explanation of the service.
- Profile-completeness percentage with a defined, documented calculation.
- Dynamic summary counts for all pathways, eligible, needs review/unknown, not eligible, and saved pathways.
- Pathway cards with qualification name, field/category, duration where supported, eligibility state, explanation, relevant profile marks, requirements status, official-source link, save action and compare action.
- Useful empty, loading, validation, error and no-results states.
- Clear next steps when the learner’s profile is incomplete or a requirement needs review.

**Consistency rule:** counts, saved totals and profile completeness must be derived from current application state and the defined rules. Do not hardcode sample counts that contradict the visible catalogue or learner profile.

## 4. Pathway and eligibility presentation

Use only the canonical states:

- `ELIGIBLE`: only when the deterministic configured rules and supporting evidence justify that state.
- `NOT_ELIGIBLE`: explain the specific supported requirement that is unmet; never imply that the learner lacks potential.
- `UNKNOWN`: use when requirements, provenance or required profile information are missing, unverified or insufficient.

Eligibility and ranking are separate concepts. Explanations must identify what is known, what is missing, and what the learner should verify. Link to official institution sources when a suitable source is recorded. Do not present ranking as suitability or admission probability.

## 5. Demo data and truthfulness

For presentation, synthetic profiles and illustrative catalogue records may be used to demonstrate richer screens, pathway comparisons, estimates and alternative pathways. They must be visibly identified as **illustrative demo data** wherever a reasonable user could mistake them for official information.

- Keep synthetic learner data separate from authoritative catalogue records.
- Label APS and other calculated values as estimates and disclose their calculation basis.
- Mark unverified thresholds and requirements explicitly; missing evidence must not become a definitive eligibility result.
- Fees, deadlines, funding and institution-specific requirements must either be supported by a recorded authoritative source or visibly labelled as illustrative examples that must not be relied upon.
- Do not invent source URLs or claim that an example is officially verified.
- Do not guarantee admission or funding, or imply that StudyPath submits applications or contacts institutions.
- Demo data must not silently become production catalogue data.

## 6. Visual direction

The target visual exploration is a distinctive purple-led identity with blue reserved for interactive links/focus and yellow used for small emphasis moments. The supplied concept’s proposed values are:

| Token | Proposed value | Use |
|---|---|---|
| UJ-inspired purple | `#5B2A86` | Brand identity and primary actions |
| FNB-inspired blue | `#0065A8` | Links, interactive emphasis and focus (subject to contrast testing) |
| FNB-inspired yellow | `#F4C400` | Deliberate small highlights |
| Canvas | `#F7F7F4` | Light page background |
| Charcoal | `#1D2028` | Supporting text/surfaces |
| Eligible surface | `#E8F5ED` | Eligibility state styling |
| Unknown surface | `#FFF6D5` | Uncertainty state styling |

These values are design estimates, not official brand specifications. The palette must not imply sponsorship, affiliation or endorsement by the University of Johannesburg or FNB. All text and interactive states must pass applicable WCAG contrast checks; adjust individual token values where required and document the change.

Dark mode should retain the purple identity while using deep violet-charcoal surfaces, legible supporting text and a sufficiently contrasting blue focus/link colour. Respect reduced-motion preferences.

## 7. Accessibility and responsive behaviour

- Mobile-first layout with no horizontal overflow at 320 CSS pixels.
- Keyboard-operable navigation, forms, theme toggle, save/compare controls and disclosures.
- Visible focus styles with sufficient contrast.
- Explicit labels, useful validation messages, `aria-invalid` and associated descriptions where appropriate.
- Eligibility must be communicated in text, not by colour alone.
- Respect reduced-motion preferences.
- Run automated accessibility scans in both light and dark themes; supplement automation with manual keyboard and screen-reader checks.

## 8. Functional acceptance criteria

1. A learner can enter, edit and reset synthetic school stage, subjects and marks.
2. Profile completeness and dashboard counts are calculated from defined state/rules.
3. The catalogue shows varied, explainable states only where demo rules justify them; missing/unverified evidence results in `UNKNOWN`.
4. Every displayed pathway has a clear details/requirements route; official sources are labelled with their provenance when available.
5. Learners can save, remove and compare pathways within the approved shortlist limit.
6. Manual application tracking can update status and a personal next action without submitting an application.
7. Light/dark mode toggles accessibly and the chosen in-session theme is reflected consistently across the interface.
8. Layout, validation, eligibility explanations and actions work at mobile and desktop sizes.
9. Demo-data disclosures are visible and cannot reasonably be mistaken for official verified guidance.
10. Automated tests cover core learner journeys, invalid input, theme toggling, accessibility, transient-data privacy and responsive layout.

## 9. Delivery plan and traceability

Implement this target incrementally after inspecting the actual merged code. For each gap, record:

**Requirement ID → UI/API contract → Test ID → Implementation path → CI result → release evidence.**

Suggested implementation order:

1. Stabilise current `main`: restore theme toggle and correct contrast regressions.
2. Preserve this target experience as the product/design baseline.
3. Inventory current UI against this document and the approved requirements matrix.
4. Prioritise the smallest end-to-end improvements: profile completeness, dynamic summary counts, pathway card information hierarchy, compare flow and clearly labelled synthetic demo catalogue.
5. Add/adjust browser tests and accessibility checks for each change.
6. Review data provenance, security/privacy boundaries and demo disclosures before presentation sign-off.

## 10. Differentiation follow-up

The proposed three-pillar product direction is documented in [THREE-PILLAR-DIFFERENTIATION.md](THREE-PILLAR-DIFFERENTIATION.md): (1) explain what the learner's actual marks support, (2) show evidence-backed alternative routes when a preferred route is blocked or uncertain, and (3) organise manual application-preparation next steps. This direction must be validated with learners and mentor feedback; it does not imply that all three pillars are implemented. Existing requirements and issue references are mapped in that document. Maintain all source, eligibility, privacy and synthetic-data safeguards.

## 11. Explicitly out of scope for the current visual target

This design document does not authorise public deployment, Azure provisioning, real learner data, definitive admission screening from the draft catalogue, fabricated fees/deadlines/funding, automatic applications, or a change to approved API/security contracts. Production hardening remains a separate gate.
