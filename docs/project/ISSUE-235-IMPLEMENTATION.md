# Issue #235 — Why Not Yet? implementation traceability

**Status:** Implemented on branch `feat/235-why-not-yet`; pending CI, review and merge. Not deployed.

## Objective

Explain recorded requirement shortfalls and the actual missing input or unresolved rule without treating `UNKNOWN` as rejection.

## Requirement → contract → test → implementation

| Requirement | Contract | Test evidence | Implementation |
|---|---|---|---|
| R235-01: Explain a supported `NOT_ELIGIBLE` result | `buildWhyNotYet(item)` returns the unmet requirement label, recorded rule, learner value and evaluator explanation from `requirementEvidence`; it does not recompute eligibility | `tests/why-not-yet.test.mjs`: specific Mathematics shortfall | `src/domain/why-not-yet.mjs`; rendered in `src/main.jsx` |
| R235-02: Explain `UNKNOWN` from missing input | Maps known evaluator reason codes and exposes only evidence rows marked `UNKNOWN`; next steps request input only when evidence supports it | `tests/why-not-yet.test.mjs`: incomplete subject input | `src/domain/why-not-yet.mjs` |
| R235-03: Explain unresolved rules/source uncertainty | Uses explicit reason-code copy for alternative semantics, material ambiguity, source conflicts/currentness and publication-gate failures | `tests/why-not-yet.test.mjs`: unresolved alternative and unrecognised reason | `src/domain/why-not-yet.mjs` |
| R235-04: Never render UNKNOWN as rejection | UI uses the evaluator state, a separate unknown heading and explicit non-rejection caveat | `tests/why-not-yet.test.mjs`; browser E2E to be verified by CI | `src/main.jsx`; `src/styles.css` |
| R235-05: Accessible and mobile-readable | Semantic headings/lists, recorded-value labels, existing details disclosure, responsive padding | `tests/e2e/discovery-dashboard.spec.mjs`: issue-specific 320px test verifies UNKNOWN versus NOT_ELIGIBLE copy and no overflow; existing issue #234 keyboard/mobile test remains in place | `src/main.jsx`; `src/styles.css` |

## Boundaries

- The deterministic evaluator remains the sole eligibility authority; this module only presents evaluator state, reason codes and evidence.
- No thresholds, institution rules, source URLs, fees, deadlines, bridging routes or admission chances are inferred.
- Unknown inputs and unresolved rules remain unknown; no mark change is described as a guarantee.
- No AI decision-making, persistent student data, API, cloud resource or new dependency was added.

## Verification

- Branch: `feat/235-why-not-yet`
- Commit(s): see the branch history and linked PR.
- Automated unit, build, contract and browser checks: pending.
- Release/deployment: not performed by this change.
