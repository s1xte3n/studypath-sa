# Issue #206 — visual design implementation record

**Status:** implementation candidate on `feat/206-visual-design-system`; awaiting CI and rendered review.
**Scope:** existing local browser MVP only. No route, copy, eligibility, persistence, or network behaviour is intentionally changed.

## Design tokens

The existing stylesheet now defines the issue's approved baseline in its existing CSS system:

- Ground `#fcfcfd`; ink `#16191f`; secondary ink `#454c58`.
- Muted ground `#f3f4f6`; rule `#dde0e6`; action accent `#074ce0`.
- Dark surface `#16191f`; light panel `#ffffff`; secondary on-dark text `#d0d4dd`.
- Body 16px, interface 15px, small 14px, metadata 13px, labels 12px, line-height 1.6.
- 24px spacing baseline, 12px panel radius, 1px hairline borders, 160ms ease-out interaction transitions.

These tokens are applied to the existing form, results, discovery summary, pathway cards, shortlist, APS panel, disclosures and footer. Existing status colours remain distinct so status meaning is not replaced with a single accent.

## Screen composition

The existing hero content is preserved and placed beside a compact, CSS-built three-step illustration: subjects → study pathways → official sources. It describes the existing product flow and introduces no new programme facts, testimonials, pricing or statistics. At 760px and below the hero stacks; at 480px the illustration becomes a vertical sequence.

Host Grotesk and Instrument Sans are declared as preferred font families with system fallbacks. No remote font import or font-related network request is added, so the interface remains usable when those fonts are not installed.

## Accessibility and behaviour

- Native controls, existing labels, buttons, details disclosures and result semantics are retained.
- Visible keyboard focus uses the blue accent; light and dark surfaces have explicit overrides.
- Reduced-motion preference disables transitions and press movement.
- New browser coverage checks the illustration and horizontal overflow at 320, 480, 760 and 1280 CSS pixels, toggles dark mode, and checks reduced-motion computed styles.

## Evidence and limits

The browser test is added but has **not** been executed by the assistant. CI, actual rendered screenshot comparison, manual keyboard walkthrough and contrast/assistive-technology review are pending until the candidate workflows and human checks provide evidence. CSS token presence is not proof that every colour combination passes contrast requirements.

No local test/build run, deployment, production readiness, or definitive eligibility result is claimed. Synthetic learner data only. G-SYN-001 remains **OPEN / NOT PASSED**.

## Traceability

Issue #206 → this record and visual contract → `tests/e2e/student-form.spec.mjs` (responsive overflow, dark theme, reduced motion) → `src/main.jsx` and `src/styles.css` → PR CI pending → no release evidence.
