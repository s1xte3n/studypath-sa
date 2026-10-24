# Hackathon demo eligibility rule-evaluation change

**Date:** 2026-10-24  
**Branch:** `fix/hackathon-demo-eligibility-rule-evaluation`  
**Status:** Implemented on candidate branch; CI and review pending. Not merged.

## Objective

Apply owner decision D-HACK-ELIG-001 without weakening the definitive publication gate: the repository-approved UJ 2027 catalogue may be evaluated for the bounded hackathon demo, but only explicit deterministic rule evidence may support `NOT_ELIGIBLE`, and material unresolved rules must keep a would-be positive outcome at `UNKNOWN`.

## Contract

- `APPROVED_FOR_HACKATHON_DEMO_ONLY` selects the explicit hackathon evaluation mode; it is not approval for definitive screening.
- The definitive path still calls `validateCatalogueForPublication`. A catalogue that fails that gate returns `UNKNOWN` with `CATALOGUE_PUBLICATION_GATE_FAILED`.
- The demo evaluator can report a deterministic negative result when a verified rejection/minimum rule independently establishes it (for example, a required Mathematics level below the encoded minimum).
- A positive result is not emitted when `programme.unresolved` contains material unresolved rules. The evaluator returns `UNKNOWN` with `MATERIAL_RULES_UNRESOLVED`.
- Unknown admission cycles, unresolved English-stream assumptions, alternative-route ambiguity, missing input, incomplete transcript, duplicate subjects and invalid marks retain fail-closed handling.
- No admission guarantee, institutional endorsement, production approval, data collection or deployment is implied.

## Requirement traceability

| Requirement / decision | Contract / implementation | Regression test | Candidate evidence |
|---|---|---|---|
| D-HACK-ELIG-001 — bounded demo evaluation without institutional sign-off as a blanket blocker | `src/domain/pathway-matching.mjs`; `src/domain/eligibility/uj-2027-evaluator.mjs` | `tests/pathway-matching.test.mjs`: demo mode reaches deterministic rule evaluation | CI pending on candidate PR |
| D-HACK-ELIG-002 — unresolved rules remain UNKNOWN | Evaluator applies explicit negative rules before the unresolved-positive-result guard | Strong marks remain UNKNOWN with `MATERIAL_RULES_UNRESOLVED`; explicit Maths minimum failure is NOT_ELIGIBLE | CI pending on candidate PR |
| Definitive publication remains strict | `src/domain/eligibility/catalogue-publication-gate.mjs` unchanged; adapter invokes it outside demo mode | Test asserts an unpublishable catalogue marked for definitive screening remains UNKNOWN | CI pending on candidate PR |
| Input/source guardrails remain in force | Existing input validation, source links, cycle and English mapping checks retained | Unsupported/fractional marks, English First Additional Language under Home-Language assumption, and wrong cycle tests | CI pending on candidate PR |

## Rule-by-rule disposition

- **Admission cycle:** anything other than `2027` remains `UNKNOWN`.
- **Source conflict/staleness/unverified catalogue:** remains `UNKNOWN`; demo mode is selected only by the exact owner-approved demo status.
- **Subject acceptance / explicit minimum failures:** may return `NOT_ELIGIBLE` when the encoded rule is decisive and no unresolved alternative semantics govern that same rule.
- **Alternative-route semantics:** remain `UNKNOWN` when the applicable route cannot be determined.
- **English stream:** the explicit demo assumption still requires English Home Language; First Additional Language or an unmapped stream is not silently treated as equivalent.
- **APS:** the evaluator retains the current six-subject calculation behavior. The separate provisional APS contract continues to fail closed when the selection input is ambiguous; this change does not authorize arbitrary subject selection.
- **Transcript completeness:** incomplete transcripts remain `UNKNOWN`.
- **Positive outcomes:** current programme records retain material unresolved fields, so they must remain `UNKNOWN` until those records' unresolved rules are resolved. This PR is not intended to force any `ELIGIBLE` result from the current catalogue.

## Verification boundary

The assistant has edited files through GitHub repository operations but has not run a local checkout, `npm test`, browser tests, or a build. Do not mark this change verified until CI has run on the exact PR head and its required workflows/results are reviewed. G-SYN-001 remains OPEN / NOT PASSED.
