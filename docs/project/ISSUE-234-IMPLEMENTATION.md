# Issue #234 — Explainable Match Card implementation traceability

**Status:** Implemented on branch `feat/234-explainable-match-card`; pending CI and review. Not merged or deployed.

## Objective

Expose the deterministic eligibility outcome with requirement-level comparisons, learner values, source links, and explicit uncertainty while preserving `ELIGIBLE`, `NOT_ELIGIBLE`, and `UNKNOWN`.

## Requirement → contract → test → implementation

| Requirement | UI/domain contract | Test evidence | Implementation |
|---|---|---|---|
| R234-01: Show recorded rule, learner value, comparison, and explanation | Each result exposes `requirementEvidence[]` with `id`, `label`, `rule`, `learnerValue`, `status`, `explanation`, and `sourceLinks[]` | `tests/pathway-matching.test.mjs`: requirement evidence includes English rule/value/status and source | `src/domain/pathway-matching.mjs`; `src/main.jsx`; `src/styles.css` |
| R234-02: Preserve unknown for missing/incomplete inputs | Missing mandatory subject in an incomplete transcript returns `UNKNOWN`, not a failure | `tests/pathway-matching.test.mjs`: incomplete transcript case | `src/domain/eligibility/uj-2027-evaluator.mjs` |
| R234-03: Display provenance only when recorded | Evidence links reuse catalogue source URLs, title, location and verification date already stored | Existing pathway-matching source assertions plus new source-link assertion | `src/domain/pathway-matching.mjs`; `src/main.jsx` |
| R234-04: Disclose unresolved conditions and limitations | Unresolved catalogue notes become `UNKNOWN` evidence rows; UI explains that unknown is not rejection and matches are not admission guarantees | New evidence test checks unresolved rows and provisional limitation | `src/domain/pathway-matching.mjs`; `src/main.jsx` |
| R234-05: Accessible responsive breakdown | Native headings, lists, definition lists and links; content appears in the existing native `details/summary` expansion | Existing Playwright mobile discovery coverage; issue-specific keyboard/mobile browser test added; execution result pending CI | `src/main.jsx`; `src/styles.css` |

## Changed files

- `src/domain/pathway-matching.mjs`
- `src/domain/eligibility/uj-2027-evaluator.mjs`
- `src/main.jsx`
- `src/styles.css`
- `tests/pathway-matching.test.mjs`

## Data and safety boundaries

- Eligibility decisions remain in the deterministic evaluator; no AI decision-making was added.
- No institution requirements, marks, source URLs, verification dates, fees, or deadlines were invented.
- Catalogue source links are displayed as stored evidence, not proof that a source or rule is complete/current.
- The UJ 2027 pilot catalogue remains approved for hackathon-demo use only, not definitive admission screening.
- Learner data remains in page memory; no persistence, API, cloud resource, or new dependency was added.

## Verification status

- Repository changes were committed to the feature branch through GitHub.
- Automated tests/build, browser interaction, keyboard operation, accessibility, mobile layout, and CI status: **pending verification**. Do not mark the issue complete until the PR checks and issue-specific browser evidence pass.
- Release/deployment status: **not deployed by this change**.
