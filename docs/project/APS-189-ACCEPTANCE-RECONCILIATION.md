# APS issue #189 — acceptance reconciliation

**Date:** 2026-10-24  
**Scope:** Requirement reconciliation and verification status only. This document does not approve the UJ catalogue or change the APS algorithm.

## Decision

The original requirement to “select the six highest eligible subjects” is not implementable safely from the retained evidence. The UJ 2027 catalogue is still `DRAFT_NOT_FOR_DEFINITIVE_SCREENING`, and the catalogue evidence audit explicitly records APS selection when more than six eligible subjects are supplied as unresolved. Required-subject inclusion semantics are also not approved.

Therefore, preserve the current fail-closed behavior. Do not infer or auto-select the top six. A provisional APS total is available only when exactly six distinct supported non-Life-Orientation subjects are supplied. Fewer or more than six eligible subjects yields `UNKNOWN` and no total. This is an intentional safety boundary, not a defect to work around.

## Implementation inspected

- `src/domain/eligibility/provisional-aps.mjs`
  - Mark-to-level bands for the provisional calculation.
  - Input validation for supported subject names and whole-number marks from 0–100.
  - Duplicate subject rejection and Life Orientation exclusion.
  - `UNKNOWN` for fewer or more than six eligible subjects.
  - Explicit statement that the total is provisional and does not determine programme eligibility.
  - Source metadata identifies the UJ 2027 Undergraduate Prospectus, printed page 16, with draft status.
- `tests/provisional-aps.test.mjs`
  - Mark-band boundaries and invalid boundaries.
  - Exactly six distinct subjects.
  - Life Orientation exclusion.
  - Fewer-than-six and greater-than-six behavior.
  - Duplicate, missing, invalid and unsupported input.
  - Draft source disclosure.
- `docs/project/UJ-2027-CATALOGUE-EVIDENCE-AUDIT.md`
  - Records 30 draft programme records and zero curator-approved records.
  - Governing source-version confirmation, full source/footnote reconciliation and curator approval remain outstanding.

## Acceptance disposition

| Requirement | Disposition | Evidence / remaining work |
|---|---|---|
| Deterministic mark bands and boundaries | Implemented; unit coverage present | `tests/provisional-aps.test.mjs`; run current CI for future changes |
| Exactly-six, distinct, supported non-LO inputs | Implemented; unit coverage present | `src/domain/eligibility/provisional-aps.mjs` |
| Fewer than six or more than six eligible subjects | Implemented as `UNKNOWN`; no total | Do not replace with automatic top-six selection without an approved rule |
| Explainability and source disclosure | Provisional UI and source metadata exist | Source remains draft; not authoritative approval |
| APS distinct from programme eligibility | Preserved | Draft catalogue outcomes remain `UNKNOWN` |
| Required-subject inclusion when more than six are supplied | Blocked | Needs authoritative, cycle-specific rule and curator review |
| Governing UJ source version and footnotes | Blocked | Candidate source comparison and human verification outstanding |
| Curator approval / catalogue publication | Blocked | No approved programme records; keep publication gate closed |
| Manual accessibility and broader privacy review | Tracked separately | Issue [#185](https://github.com/s1xte3n/studypath-sa/issues/185) remains open |

## CI evidence boundary

The repository owner reported successful CI for the APS implementation merged in commit `4204f0b8bf350e4d7d7b7d890c47038415c5aabc`:

- [Contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/40107386834)
- [Browser E2E, privacy and accessibility](https://github.com/s1xte3n/studypath-sa/actions/runs/40107386820)
- [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/40107386706)
- [Browser MVP build](https://github.com/s1xte3n/studypath-sa/actions/runs/40107386703)

These are owner-reported workflow results for that commit, not a claim that this documentation change ran tests or that source/curator/manual gates passed. No local tests were run as part of this reconciliation.

## Required next steps

1. Compare retained official UJ 2027 prospectus candidates and record an approved governing-source decision.
2. Verify APS scale, subject-selection notes, programme-specific subject constraints and footnotes against authoritative sources.
3. Obtain actual curator review and dated sign-off; do not infer approval from automated structural tests.
4. If a verified rule resolves the >6 selection question, update the versioned catalogue/rule contract and tests in a separate reviewed change. Until then, keep >6 as `UNKNOWN`.
5. Keep issue #189 open and G-SYN-001 `OPEN / NOT PASSED` until the required evidence and approval are recorded.

## Guardrails

Synthetic data only. No definitive admission claims, fabricated programme rules, learner-data persistence, cloud provisioning or production deployment. A provisional APS score is not a pass/fail determination for the National Senior Certificate and does not guarantee admission.
