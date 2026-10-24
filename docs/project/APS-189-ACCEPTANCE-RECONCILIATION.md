# APS issue #189 — acceptance reconciliation

**Updated:** 2026-10-24  
**Scope:** Align implementation with the fail-closed APS contract and the owner-approved, bounded hackathon-demo catalogue. Demo catalogue approval does not enable definitive eligibility screening.

## Current decision

The learner-facing demo may show a provisional total **only when exactly six distinct supported non-Life-Orientation subjects are supplied**. Fewer than six returns `UNKNOWN`; more than six also returns `UNKNOWN` with no total and no automatic subject selection. Life Orientation is excluded and disclosed.

The project owner has approved the 30-record catalogue as the source of truth for the bounded hackathon demo. The retained catalogue/source audit still does not resolve every governing-source, subject-selection or programme-required-subject detail. This approval does not settle those technical rules: the calculator must not apply an unverified best-six heuristic or force required subjects into the total. This deliberately fails closed rather than implying an unapproved admissions rule.

## Implementation history and current candidate

- **Historical PR #209:** [Apply UJ best-six APS heuristic for hackathon demo](https://github.com/s1xte3n/studypath-sa/pull/209), merge commit [`9116c0d7faf68ab1be91b047c1cabff0b1aafb7e`](https://github.com/s1xte3n/studypath-sa/commit/9116c0d7faf68ab1be91b047c1cabff0b1aafb7e) introduced best-six demo selection.
- The current issue #189 acceptance contract supersedes that provisional selection behavior until authoritative policy and curator review exist.
- **Candidate change:** branch `fix/189-aps-fail-closed-selection` changes `src/domain/eligibility/provisional-aps.mjs`, `src/main.jsx`, `tests/provisional-aps.test.mjs` and `tests/e2e/student-form.spec.mjs` to fail closed for more than six eligible subjects and remove programme-required-subject selection from the calculator.
- Candidate CI has not yet been verified. Do not describe this branch as merged or tested.

## Acceptance disposition

| Requirement / control | Current disposition | Remaining evidence or action |
|---|---|---|
| Deterministic mark-to-level calculation | Implemented; unit tests cover documented boundaries | Verify applicable official source version and notes/footnotes |
| Exactly six distinct non-Life-Orientation subjects | Provisional total allowed | Source/curator review still required |
| Fewer than six eligible subjects | Returns `UNKNOWN` with no total | Retain tests |
| More than six eligible subjects | Returns `UNKNOWN` with no automatic selection | Current candidate tests the fail-closed result |
| Programme-required-subject inclusion | Not implemented pending verification | Verify applicable cycle- and programme-specific rules before adding |
| Life Orientation exclusion | Excluded and shown to the learner | Retain unit/browser coverage |
| APS separated from programme eligibility | Programme outcomes remain `UNKNOWN` while catalogue gate is closed | Do not infer eligibility from an APS total |
| Governing UJ source version, scale, footnotes and selection semantics | **Blocked** | Verify official source files, version, printed pages, footnotes and relevant programme rules |
| Hackathon demo catalogue approval | **Approved for bounded demo only** in `uj-2027-pilot-v0.3-hackathon-demo`; all 30 records are `APPROVED_FOR_HACKATHON_DEMO_ONLY`, with zero institutional curator sign-offs | Keep definitive-screening gate closed; unresolved programme rules return `UNKNOWN` |
| Manual accessibility and broader privacy review | **Open** under [issue #185](https://github.com/s1xte3n/studypath-sa/issues/185) | Manual keyboard/screen-reader, device/browser matrix, hosting/provider logs and external telemetry review remain unverified |
| Overall synthetic demo gate | **G-SYN-001: OPEN / NOT PASSED** | Complete criterion-by-criterion evidence review |

## Required next steps

1. Review and merge the fail-closed candidate only if unit, browser, contract, golden-case and build workflows pass on its exact head SHA.
2. Verify the governing UJ 2027 source version, APS bands, selection semantics, programme-specific required subjects and footnotes against official materials.
3. Record human curator sign-off with reviewer, date, scope and supporting evidence; automated tests are not curator approval.
4. Only after the source/rule gate passes, propose any best-six or programme-required-subject behavior as a separate reviewed change with versioned rules and golden cases.
5. Keep all affected programme eligibility results `UNKNOWN` until the catalogue publication gate passes.

## Guardrails

Use synthetic data only. The APS figure is indicative and must not be represented as a definitive admissions score, an NSC pass/fail determination, guaranteed admission, or funding eligibility. Do not fabricate requirements or source approval. No real learner data, cloud provisioning or production deployment is authorized by this reconciliation.


## Owner-approved demo scope (2026-10-24)

The project owner has approved the 30-record UJ 2027 pilot catalogue as the source of truth for the FNB AOTY Hackathon 2026 demo. This does not mean UJ has endorsed the catalogue or that every record has institutional curator sign-off. All 30 records now carry explicit project-owner demo approval and retain their unresolved notes. This does not mean UJ endorsement, institutional curator sign-off, or approval for definitive screening. The APS calculator continues to fail closed for unresolved subject selection; APS does not independently establish programme eligibility. The definitive-screening gate remains closed.
