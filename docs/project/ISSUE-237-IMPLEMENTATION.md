# Issue #237 — What-If Mark Planner

## Objective

Allow a learner to explore hypothetical subject-mark changes without altering the actual profile or its discovery results.

## Requirement traceability

| Requirement | Contract / implementation | Verification |
|---|---|---|
| R237-01: Clearly labelled hypothetical mode | What-if mark planner section and persistent hypothetical-results disclaimer in `src/main.jsx` | Browser lifecycle and content assertions |
| R237-02: Reuse deterministic eligibility evaluator | `src/domain/what-if-mark-planner.mjs` delegates both baseline and draft evaluation to `buildPathwayResults`; no parallel eligibility rules | Unit threshold-boundary test |
| R237-03: Explain affected comparisons | Compare each pathway state and stable requirement-evidence row IDs; show before/after learner value and status | Unit and browser assertions |
| R237-04: Validate inputs | Uses the profile's `validateStudentEntries` rules; scenario must retain actual subject identities; malformed inputs fail closed | Unit tests for missing, unsupported, duplicate, non-integer and out-of-range marks |
| R237-05: Isolate actual profile | Draft marks are held in component-local state and only sent to the simulation function; no profile setters or persistence are called | Unit immutability test and browser lifecycle test |
| R237-06: Reset / exit | Reset copies actual marks into the draft; exit unmounts the planner and discards hypothetical state | Browser test |
| R237-07: Preserve uncertainty | Existing evaluator outcomes and requirement evidence are used as-is; no special treatment promotes `UNKNOWN` | Unit ambiguity test |
| R237-08: Accessibility / mobile | Native labelled number inputs, buttons, headings and live status region; responsive layout | Browser keyboard/mobile assertions |

## Data and safety boundaries

- Uses only the current synthetic UJ 2027 pilot catalogue and the existing deterministic evaluator.
- The simulation is not an admission prediction and does not guarantee that any target mark secures admission.
- Actual marks and current results are never changed by the simulation; changing the actual profile remains a separate user action.
- No AI eligibility decisions, persistence, API calls, external writes, cloud provisioning, or new dependencies are added.
- Missing or ambiguous requirements continue to produce `UNKNOWN` where the existing evaluator does so.

## Verification record

CI and review evidence will be added after the pull request checks complete. This document does not assert local tests were run.
