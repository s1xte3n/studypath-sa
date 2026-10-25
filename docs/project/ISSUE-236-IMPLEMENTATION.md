# Issue #236 — Alternative Pathway Suggestions implementation traceability

**Status:** Implemented on feature branch; CI and review required. Not merged or deployed.

## Objective

Offer a small set of data-supported alternatives when a preferred catalogue pathway is `NOT_ELIGIBLE` or `UNKNOWN`, while preserving each alternative's own deterministic eligibility outcome.

## Requirement → contract → test → implementation

| Requirement | Contract | Verification | Implementation |
|---|---|---|---|
| R236-01: Only active catalogue records | Candidate IDs must exist in the supplied catalogue and evaluated results; duplicates are removed; preferred record is excluded | Unit test for fabricated IDs, partial data and duplicate IDs | `src/domain/alternative-pathways.mjs` |
| R236-02: Explain relevance using recorded attributes | Reason states shared recorded subject rules and/or shared faculty/college; no progression relationship is inferred | Unit tests assert reason and disclaimer | `src/domain/alternative-pathways.mjs`; `src/main.jsx` |
| R236-03: Preserve each candidate's independent eligibility state/evidence | Recommender reuses the independently evaluated result for that candidate; it never computes or changes eligibility | Unit tests compare suggestion state to original evaluated result; browser coverage | `src/domain/alternative-pathways.mjs`; `src/main.jsx` |
| R236-04: Missing/ambiguous requirements remain unknown | Displayed state, reason and requirement evidence come from the existing deterministic evaluator | Unit tests cover mixed states; existing evaluator tests remain authoritative | `src/domain/pathway-matching.mjs`; `src/main.jsx` |
| R236-05: Empty, partial and duplicate data states | Empty result gets a plain-language no-suggestions state; no records are generated | Unit tests and browser test | `src/main.jsx`; `tests/e2e/discovery-dashboard.spec.mjs` |
| R236-06: Accessible navigation and no result reordering | Suggestions are a separate section; primary result ordering is unchanged; links target the existing result card | Browser test follows an alternative link; existing mobile/a11y workflow covers layout | `src/main.jsx`; `src/styles.css` |

## Data and safety boundaries

- Uses only the UJ 2027 pilot catalogue and existing deterministic pathway results.
- Suggestion reasons are based on common catalogue subject-rule attributes and/or faculty/college; these are relevance signals, not approved programme relationships.
- Does not claim articulation, progression, equivalence, credit transfer, admission chances, fees, funding or deadlines.
- Does not change eligibility, rank the main results list, or send/persist learner data.
- The catalogue remains hackathon-demo-only; provisional eligibility is not an admission decision.

## Verification status

- Unit tests: added; pending CI execution.
- Browser, mobile and accessibility tests: added/updated; pending CI execution.
- Build and contract checks: pending CI.
- Merge/release/deployment: not performed.
