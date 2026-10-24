# APS issue #189 — acceptance reconciliation

**Updated:** 2026-10-24  
**Scope:** Reconcile the implemented hackathon demo with the still-open authoritative-source and curator-approval gates. This document does not approve the UJ catalogue or enable definitive eligibility screening.

## Current decision

The hackathon demo now calculates an **indicative best-six APS heuristic** from supported supplied subjects, excluding Life Orientation. Where configured, required subjects are included in the six before the remaining places are filled by the highest achievement levels. The UI explains the selection and marks the score as provisional.

This is a demo behavior, **not an approved, authoritative UJ admissions rule**. The implementation change does not resolve the source audit or curator-approval requirements, and APS does not determine programme eligibility. Programme outcomes must remain `UNKNOWN` while the catalogue publication gate is closed.

## Merged implementation

- **PR #209:** [Apply UJ best-six APS heuristic for hackathon demo](https://github.com/s1xte3n/studypath-sa/pull/209)
- **Merge commit:** [`9116c0d7faf68ab1be91b047c1cabff0b1aafb7e`](https://github.com/s1xte3n/studypath-sa/commit/9116c0d7faf68ab1be91b047c1cabff0b1aafb7e)
- **Relevant files:** `src/domain/eligibility/provisional-aps.mjs`, `src/main.jsx`, `tests/provisional-aps.test.mjs`, `tests/e2e/student-form.spec.mjs`.

The repository owner reported successful merge-commit workflows for Browser E2E/privacy/accessibility, Browser MVP build, contract tests, UJ eligibility golden-case verification, and the GitHub Pages preview workflow. Those results are CI evidence for the merge commit; the preview workflow alone is not proof of production deployment or approval.

## Acceptance disposition

| Requirement / control | Current disposition | Remaining evidence or action |
|---|---|---|
| Deterministic provisional mark-to-level calculation | Implemented; automated coverage exists | Keep tests aligned with any future rule changes |
| Best-six selection for the hackathon demo | Implemented in PR #209 | Clearly label as provisional/demo behavior |
| Life Orientation exclusion and explanation | Implemented; browser assertion covers exclusion copy | Retain regression coverage |
| Required-subject inclusion | Supported by the demo configuration | Verify cycle- and programme-specific rules against authoritative sources before any definitive use |
| APS separated from programme eligibility | Required; programme eligibility remains `UNKNOWN` while the catalogue gate is closed | Do not infer eligibility from an APS total |
| Governing UJ source version, scale, footnotes and selection semantics | **Blocked** | Verify official source files, version, printed pages, footnotes and relevant programme rules |
| Catalogue approval and curator sign-off | **Blocked**; audited catalogue remains `DRAFT_NOT_FOR_DEFINITIVE_SCREENING`, with zero curator-approved programme records | Record dated, scoped, evidence-backed curator approval before publication |
| Manual accessibility and broader privacy review | **Open** under [issue #185](https://github.com/s1xte3n/studypath-sa/issues/185) | Manual keyboard/screen-reader, device/browser matrix, hosting/provider logs and external telemetry review remain unverified |
| Overall synthetic demo gate | **G-SYN-001: OPEN / NOT PASSED** | Complete the gate’s full criterion-by-criterion evidence review |

## Required next steps

1. Keep issue [#189](https://github.com/s1xte3n/studypath-sa/issues/189) open until source verification and curator approval criteria pass.
2. Verify the governing UJ source version, APS bands, selection semantics, programme-specific required subjects and footnotes against official materials.
3. Record human curator sign-off with reviewer, date, scope and supporting evidence; automated tests are not curator approval.
4. Update the versioned catalogue/rule contract and golden cases in a separate reviewed change if source verification changes the rule.
5. Keep all affected programme eligibility results `UNKNOWN` until the catalogue publication gate passes.

## Guardrails

Use synthetic data only. The APS figure is indicative and must not be represented as a definitive admissions score, an NSC pass/fail determination, guaranteed admission, or funding eligibility. Do not fabricate requirements or source approval. No real learner data, cloud provisioning or production deployment is authorized by this reconciliation.
