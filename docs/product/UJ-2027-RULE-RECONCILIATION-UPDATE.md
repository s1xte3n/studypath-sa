# GAP-001 — Rule-by-Rule Reconciliation Update

**Evidence date:** 2026-10-14  
**Branch:** `docs/gap001-reconcile-official-source-conflicts`  
**Status:** Evidence update only. This is not curator sign-off, an approved catalogue, or permission to make definitive learner-facing eligibility decisions.

## Objective

Reconcile the three previously highlighted source discrepancies using the original visually inspected 2027 PDFs and additional official UJ search-indexed programme pages. Keep unresolved rule semantics explicit rather than inferring them.

## Findings and decisions

| Candidate / issue | Evidence now available | Reconciliation decision | Still blocks publication? |
|---|---|---|---|
| BSc Computer Science and Informatics Extended code | The 2027 prospectus printed p. 91 and the current [UJ programme page](https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics-extended/) both show **B2E02Q**, APS 26, English 4, Mathematics 5, APK, 4 years. The older Academy page shows B2E01Q. | Treat **B2E02Q as the 2027 candidate code**. Record B2E01Q as a historical older-page discrepancy, not an unresolved competing 2027 code and not an alias. | No longer blocks code reconciliation; full conditions and curator sign-off still block publication. |
| Diploma in Business Information Technology code | The original 2027 prospectus printed p. 44 and 2027 CBE brochure printed p. 12 / PDF p. 15 visually show **DI1401**. The current [UJ programme page](https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/) and the official [2027 CBE brochure](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf) also show DI1401. | Use **DI1401** in the draft record. The prior `D1I40J` string is a transcription/extraction variation; do not retain it as an alternative programme code. | No longer blocks code reconciliation; exact conditional rule grouping, selection meaning and full conditions still block publication. |
| BCom Information Management APS | Original 2027 prospectus printed p. 42 and 2027 CBE brochure printed p. 10 / PDF p. 13 visually show **APS 26 with Mathematics/Technical Mathematics OR APS 28 with Mathematical Literacy**. The current [UJ programme page](https://www.uj.ac.za/university-courses/bcom-in-information-management/) states general APS 28, while UJ's [departmental undergraduate page](https://www.uj.ac.za/faculties/college-of-business-and-economics/schools/school-of-consumer-intelligence-and-information-systems/information-and-knowledge-management/courses-and-programmes/undergraduate/) states APS 26 with Mathematics or 28 with Mathematical Literacy. | For the **2027 draft**, retain the conditional values printed in both 2027 intake sources. Record the generic APS 28 page wording as a less-specific current-page statement, not a replacement for the cycle-specific table. Do not mark the record approved. | The threshold conflict is sufficiently reconciled for the draft; complete subject-route grouping, full conditions and curator sign-off still block publication. |

## Cycle-specific visible rule values retained

These values are transcription of visible minimums, not complete eligibility rules.

- **BSc Information Technology — B2I01Q:** APS 30; English 5; Mathematics 6; Auckland Park Kingsway; 3 years. Prospectus printed p. 86.
- **BSc Computer Science and Informatics — B2I02Q:** APS 30; English 5; Mathematics 6; Auckland Park Kingsway; 3 years. Prospectus printed p. 86. The prospectus Faculty of Science note says Technical Mathematics and Technical Science are not accepted for Faculty of Science degree programmes; retain this as a source note and confirm the precise rule scope before implementation.
- **BSc Computer Science and Informatics Extended — B2E02Q:** APS 26; English 4; Mathematics 5; Auckland Park Kingsway; 4 years. Prospectus printed p. 91.
- **BSc Computer Science and Informatics specialising in AI — B2I04Q:** APS 34; English 5; Mathematics 7; Auckland Park Kingsway; 3 years. Prospectus printed p. 86.
- **BCom Information Systems — B1CISQ:** APS 26; English 4; Mathematics 4 and Technical Mathematics 4 as distinct table columns; Mathematical Literacy not accepted; Auckland Park Bunting Road; 3 years. Prospectus printed p. 42 and CBE brochure printed p. 10 / PDF p. 13.
- **Diploma Business Information Technology — DI1401:** APS 22 with Mathematics/Technical Mathematics OR APS 24 with Mathematical Literacy; English 4; Mathematics/Technical Mathematics 3 OR Mathematical Literacy 6; Auckland Park Bunting Road; 3 years. Prospectus printed p. 44 and CBE brochure printed p. 12 / PDF p. 15. Current UJ page also says selection is based on academic credit; the 2027 meaning/criteria are not established by that phrase and no numeric threshold may be invented.
- **BCom Information Management — B34IMQ:** APS 26 with Mathematics/Technical Mathematics OR APS 28 with Mathematical Literacy; English 4; Mathematics 4; Technical Mathematics 4; Mathematical Literacy 6; Auckland Park Kingsway; 3 years. Prospectus printed p. 42 and CBE brochure printed p. 10 / PDF p. 13.

General APS note in the 2027 prospectus printed p. 16: APS sums achievement ratings for six school subjects and excludes Life Orientation. This does **not** establish the programme-specific included-subject selection, tie/alternative handling, every condition, or all exceptions. Do not implement an evaluator from these rows alone.

## Remaining P0 work

1. Inspect and record every relevant table footnote, faculty rule, selection condition, exception, applicant-category restriction and applicable intake note for each of the seven candidates.
2. Define and document exact Boolean semantics for alternative subject routes and APS conditions, particularly DI1401 and B34IMQ. Do not infer a route merely because a value appears in a column.
3. Record the six-subject APS method plus any programme-specific APS subject inclusion/exclusion rules supported by official sources; otherwise keep the affected interpretation unresolved.
4. Add source snapshot/version metadata and a rule-level provenance reference to each normalized record.
5. Have the designated curator review and sign off each complete record and the deterministic boundary-test oracles; record role, date and catalogue version. This note does not constitute that approval.
6. Reach the requirement's 6–8 **complete approved** records. Seven draft candidates alone do not satisfy the gate.
7. Keep GAP-002 subject normalization, GAP-003 pathway relationship evidence, GAP-004 runtime/privacy evidence, GAP-005 funding records, and Q-018 API/runtime feasibility as separate blockers.

## Traceability and verification

- Requirements: REQ-CAT-001, REQ-MAT-001, REQ-DET-001; GAP-001 / Q-019.
- Primary sources: [UJ 2027 Undergraduate Prospectus](https://www.uj.ac.za/wp-content/uploads/2026/06/uj_undergrad_prospectus2027.pdf), printed pages 16, 42, 44, 86 and 91; [UJ CBE Undergraduate 2027 Intake Brochure](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf), printed pages 10 and 12 (PDF pages 13 and 15).
- Corroborating official pages: programme links in the findings table.
- Verified in this pass: official source search-indexed text and prior documented visual inspection of the original uploaded PDFs. No programme curator approval was obtained.
- Tests: test specifications only; no executable eligibility evaluator or tests were run.
- Implementation: documentation only; no application code, deployment, or cloud resources changed.

**Disposition:** The three highlighted identity/threshold discrepancies are reconciled for the draft records. GAP-001 remains **OPEN** because the records are not complete and curator-approved.
