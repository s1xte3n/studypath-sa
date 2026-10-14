# Owner Approval — Canonical Subject Catalogue v1

**Decision date:** 2026-10-14  
**Decision owner:** Project owner (owner approval; not independent review)  
**Decision:** APPROVED for the bounded StudyPath SA UJ 2027 pilot contract and contract-test implementation.

## Approved decisions

1. The catalogue scope is limited to the supported UJ 2027 pilot and is not represented as a complete national school-subject catalogue.
2. Canonical IDs and labels in `SUBJECT-CATALOGUE-V1.md` are approved as written:
   - `MATHEMATICS` — Mathematics
   - `MATHEMATICAL_LITERACY` — Mathematical Literacy
   - `TECHNICAL_MATHEMATICS` — Technical Mathematics
   - `PHYSICAL_SCIENCES` — Physical Sciences
   - `TECHNICAL_SCIENCES` — Technical Sciences
   - `LIFE_SCIENCES` — Life Sciences
   - `LIFE_ORIENTATION` — Life Orientation
   - `ENGLISH_HOME_LANGUAGE` — English — Home Language
   - `ENGLISH_FIRST_ADDITIONAL_LANGUAGE` — English — First Additional Language
   - `ENGLISH_SECOND_ADDITIONAL_LANGUAGE` — English — Second Additional Language
   - `UNRESOLVED_SUBJECT` — UI sentinel only; never a programme rule key
3. V1 permits no aliases. Exact canonical labels only are resolved after trimming, collapsing repeated whitespace and case-insensitive comparison.
4. Mathematics, Mathematical Literacy and Technical Mathematics remain distinct. Physical Sciences and Technical Sciences remain distinct. English HL, FAL and Second Additional Language remain distinct.
5. Unknown or ambiguous input never resolves by fuzzy matching, abbreviation expansion, spelling correction, semantic similarity or AI.
6. APS is programme-specific. Subject normalization does not calculate APS or establish eligibility.
7. An unresolved identity or material programme rule results in `UNKNOWN`, unless an independently verified mandatory rule proves `NOT_ELIGIBLE`.
8. The catalogue version for this approved contract is `subject-catalogue-v1`. Any ID, label, alias or matching-policy change requires a versioned change and regression tests.
9. The original learner-entered label must remain in page memory only and must not be sent to the catalogue API, URL, logs or telemetry.

## Verification and evidence boundaries

- The contract test suite is at `tests/contracts/subject-catalogue-v1.test.mjs` and uses Node's built-in test runner; it has no external dependencies.
- This approval records the intended contract. It does not claim that tests passed, that production code implements this contract, or that privacy/network inspection has been completed.
- UJ source evidence is recorded in `UJ-2027-PDF-EVIDENCE-LEDGER.md`. That evidence does not resolve programme-specific English, APS or AND/OR ambiguities.
- This is owner approval, not independent curator review. The programme catalogue remains blocked until complete record-level evidence and review are recorded.

## Gate disposition

- GAP-002 subject-contract decision: **OWNER APPROVED**.
- GAP-002 executable test evidence: **PENDING test execution and recorded result**.
- GAP-001 programme rules/source reconciliation: **OPEN**.
- REQUIREMENTS READY: **NOT PASSED**.
