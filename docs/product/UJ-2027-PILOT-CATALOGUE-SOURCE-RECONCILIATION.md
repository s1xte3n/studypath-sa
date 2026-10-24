# UJ 2027 Pilot Catalogue — Existing-Source Reconciliation

**Status:** Working evidence register — NOT APPROVED FOR DEFINITIVE SCREENING  
**Scope:** The seven existing UJ 2027 NSC pilot records only. This document does not add programmes or use current programme webpages as authority.  
**Catalogue baseline:** `docs/product/uj-2027-pilot-catalogue-draft.json`, blob SHA `f23e2afbb831d0a2ab6b526d34ae3086bd0e5170`, catalogue version `uj-2027-pilot-v0.1-draft`.  
**Source policy:** Use the applicable UJ 2027 Undergraduate Prospectus as the primary source; use the existing UJ College of Business and Economics (CBE) Undergraduate 2027 Intake Brochure for CBE programme rows, as recorded in the catalogue. Current programme webpages are corroborative only under the existing policy.

## 1. Evidence boundary and source-version status

The catalogue records these existing source candidates:

1. March-named 2027 Undergraduate Prospectus: https://www.uj.ac.za/wp-content/uploads/2026/03/uj_prospectus2027_24-march-2027-final.pdf
2. June-named 2027 Undergraduate Prospectus: https://www.uj.ac.za/wp-content/uploads/2026/06/uj_undergrad_prospectus2027.pdf
3. Online 25 June 2026 prospectus, uploaded under a July path: https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf
4. CBE Undergraduate 2027 Intake Brochure: https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf

The existing catalogue records local inspection metadata for the online 25 June prospectus (100 pages; SHA-256 `998901c32c614f00a5b8f9fe22b6f4e3c06772c2bf00bf07fd6bef1304ea499c`) and the CBE brochure (SHA-256 `37a22d52403b1dfd09d830f0e1a284b9df4bb3864d51d4efb97d4a4d48b78598`). Those records explicitly say that a full visual inspection of every relevant row/footnote and a comparison of every prospectus candidate were not completed.

For this review, the March-named prospectus PDF's indexed text could be inspected at its printed pages. The June- and July-named prospectus PDFs and the CBE brochure could not be retrieved through the current document viewer during this pass. Therefore, this is a **partial reconciliation**, not evidence that all four source files have been compared. No governing prospectus version is selected here. Do not infer byte-level or content equivalence from similar filenames or dates.

## 2. Requirements recorded for the seven existing programmes

The values below are the candidate values already recorded in the draft catalogue and/or visible in the March-named prospectus extraction. The March PDF is a candidate source only; these observations do not establish that it governs the 2027 intake. “English” preserves the source column label and does not imply Home Language or First Additional Language mapping.

| Programme / code | Existing recorded minimums | Existing source location | Evidence status / unresolved issue |
|---|---|---|---|
| BSc in Information Technology — B2I01Q | APS 30; English level 5 (60%+); Mathematics level 6 (70%+); Physical Science not applicable; 3 years; APK | March prospectus printed p.86; draft catalogue also points to online prospectus p.86 | March candidate table confirms these values. English stream mapping, complete conditions and governing version remain unresolved. Science faculty restriction is printed alongside the table. |
| BSc in Computer Science and Informatics — B2I02Q | APS 30; English level 5 (60%+); Mathematics level 6 (70%+); Physical Science not applicable; 3 years; APK | March prospectus printed p.86; draft catalogue also points to online prospectus p.86 | March candidate table confirms these values. English stream mapping, complete conditions and governing version remain unresolved. Science faculty restriction is printed alongside the table. |
| BSc in Computer Science and Informatics Extended — B2E02Q | APS 26; English level 4 (50%+); Mathematics level 5 (60%+); Physical Science and Life Science not applicable in the table; 4 years; APK | March prospectus printed p.91; draft catalogue points to online prospectus p.91 | March candidate table confirms the threshold row and repeats the Science faculty restriction. Exact applicability/scope of the restriction and extended-programme first-time-entry condition must be preserved and verified against the governing version. |
| BSc in Computer Science and Informatics specialising in AI — B2I04Q | APS 34; English level 5 (60%+); Mathematics level 7 (80%+); Physical Science not applicable; 3 years; APK | March prospectus printed p.86; draft catalogue points to online prospectus p.86 | March candidate table confirms these values. English stream mapping, complete conditions and governing version remain unresolved. Science faculty restriction is printed alongside the table. |
| BCom in Information Systems — B1CISQ | APS 26; English level 4 (50%+); Mathematics level 4 (50%+); Mathematical Literacy not accepted; Technical Mathematics level 4 (50%+); 3 years; APB | March prospectus printed p.42; draft catalogue uses CBE brochure printed p.10 | March candidate table has separate Mathematics, Mathematical Literacy and Technical Mathematics columns. It shows Mathematics 4, Mathematical Literacy “Not accepted”, and Technical Mathematics 4. Do not rewrite this as an AND or OR rule without a supported interpretation from the applicable source table/notes. Governing version and full applicable conditions remain unresolved. |
| Diploma in Business Information Technology — DI1401 | APS 22 with Maths/Technical Maths OR APS 24 with Mathematical Literacy; English level 4 (50%+); Maths level 3 (40%+); Mathematical Literacy level 6 (70%+); Technical Mathematics level 3 (40%+); 3 years; APB | March prospectus printed p.44; draft catalogue also cites CBE brochure printed p.12 | March candidate explicitly states the APS route as Maths/Tech Maths OR Mathematical Literacy, and its columns show English 4, Mathematics 3, Mathematical Literacy 6, Technical Mathematics 3. Verify the exact pairing of each APS route with the corresponding subject threshold and all diploma notes in the governing source. |
| BCom in Information Management — B34IMQ | Draft catalogue records APS 26 with Maths/Technical Maths OR APS 28 with Mathematical Literacy; English level 4 (50%+); Maths/Technical Maths level 4 (50%+) or Mathematical Literacy level 6 (70%+); 3 years; APK | Draft catalogue cites CBE brochure printed p.10; March prospectus printed p.42 lists “28 with Mathematical Literacy”, English 4, Mathematics 4, Mathematical Literacy 6, Technical Mathematics 4 | **Material source discrepancy:** the March candidate shows “28 with Mathematical Literacy” in the APS cell, whereas the existing draft's CBE brochure extraction records a separate APS 26 Maths/Technical Maths route. Do not combine these into a single verified rule until the CBE brochure is visually checked and the governing source policy/version is approved. |

**Important:** The threshold summary is not a complete admission-rule transcription. The source's APS notes, applicable programme notes, selection conditions, and any page-level disclaimers must be included in the final record. Meeting minimum requirements does not guarantee acceptance; the March candidate explicitly says this on printed p.85 and elsewhere.

## 3. Cross-cutting rules observed in the existing candidate source

These are observations from the March-named prospectus candidate, not a determination that this version governs:

- Printed p.86: the Science table lists B2I01Q, B2I02Q and B2I04Q and says Technical Mathematics and Technical Science are not accepted for degree programmes in the Faculty of Science.
- Printed p.91: the extended Science table lists B2E02Q and repeats the Technical Mathematics/Technical Science restriction.
- Printed p.42: the CBE degree table excludes Life Orientation from APS and states that all degrees are presented in English only.
- Printed p.44: the diploma notes exclude Life Orientation from APS and state that all diplomas are presented in English only.
- Printed p.38 and programme-specific notes: extended programmes may only consider new first-time entering candidates with no previous studies at a higher education institution. Applicability to each of these seven records must be recorded from the relevant section rather than generalized beyond the source's scope.
- Printed p.85: meeting minimum admission requirements does not guarantee acceptance.

The source table uses the column heading “English”; “all degrees/diplomas are presented in English only” describes the language of delivery and does not itself settle whether English Home Language and/or First Additional Language satisfies the English admission threshold. The catalogue's English-stream mapping therefore remains unresolved.

## 4. Conflicts and blockers that must remain explicit

| ID | Conflict / unknown | Required resolution before any definitive eligibility claim |
|---|---|---|
| SRC-01 | Governing prospectus version among March, June and online 25 June candidates is unresolved. | Compare the actual existing PDFs, record version metadata and checksums, inspect relevant pages visually, and document the reason for the selected version. If that cannot be established, keep the catalogue non-definitive. |
| SRC-02 | B34IMQ Information Management APS route differs between the recorded CBE brochure extraction and March prospectus candidate. | Re-open the existing CBE brochure printed p.10 and the corresponding prospectus row/notes; preserve the source hierarchy and record the conflict. Do not choose one route by inference. |
| SRC-03 | B1CISQ Mathematics versus Technical Mathematics field interpretation is not a safely established composite rule from the current draft. | Inspect the full applicable row, table headers, footnotes and CBE brochure p.10. Record whether the table supports alternatives or distinct constraints; do not assume AND/OR. |
| SRC-04 | DI1401 APS branches must be mapped to their corresponding subject-threshold columns and notes. | Inspect the complete row and all notes for three-year diplomas in the governing prospectus and CBE brochure p.12. |
| SRC-05 | English Home Language vs First Additional Language is unresolved for all seven records. | Use only an explicit applicable rule in the existing source set. If none exists, retain the unresolved flag and return UNKNOWN where this could affect the outcome. |
| SRC-06 | Science faculty restriction wording is clear in the candidate source, but its exact applicability must be bound to the governing version and these programme records. | Verify p.86 and p.91 in the governing PDF and preserve the restriction as an explicit mandatory rule for the covered programmes. |
| SRC-07 | Complete selection conditions and any programme-specific exceptions have not been transcribed and reviewed for all seven. | Inspect all applicable notes/disclaimers and complete a row-by-row evidence trail before curation. |
| SRC-08 | No curator sign-off is recorded in the draft catalogue. | The named curator must review the source evidence and record sign-off; do not invent approval or promote records before it exists. |

## 5. Safe disposition and next actions

1. Keep `uj-2027-pilot-v0.1-draft` marked `DRAFT_NOT_FOR_DEFINITIVE_SCREENING`.
2. Keep all seven learner-facing eligibility results `UNKNOWN`; no threshold-only match may produce a definitive `ELIGIBLE` state while mandatory source interpretation remains unresolved.
3. Complete the direct comparison of the three existing prospectus PDFs and the existing CBE brochure. Record exact source-file hashes and the pages visually inspected; a successful web text extraction alone is not full visual verification.
4. Complete a row-by-row rule register including source ID, governing version, printed page, exact table/column, applicable footnotes, raw source wording, normalized logic, unresolved conditions, verification date and curator sign-off.
5. Add or confirm a fail-closed validator so missing provenance, unresolved mandatory rules or missing curator sign-off cannot publish a record for definitive screening.
6. Update the catalogue only after the evidence and rule interpretation are complete. Keep source-derived values separate from interpretations and implementation assumptions.
7. Record the exact commit, validation/test commands and actual CI results in `docs/project/PROJECT-STATUS.md`. Documentation progress alone does not pass G-SYN-001 or the release gate.

## 6. Verification record

- Repository catalogue file was fetched from the default branch; blob SHA is recorded above.
- Existing catalogue source metadata and seven programme records were inspected.
- March-named prospectus candidate was inspected via its indexed PDF text for printed pages 42, 44, 86 and 91 and relevant notes.
- Direct retrieval of the June- and July-named prospectus PDFs and the CBE brochure failed in the current document viewer. Their prior local-inspection metadata is copied from the existing catalogue record, not independently re-created in this review.
- No repository code, catalogue data, eligibility evaluator, or tests were changed as part of this evidence note.
- This note is not curator sign-off and does not certify source-version selection.
