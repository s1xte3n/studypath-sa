# UJ 2027 Catalogue Source-Reconciliation Matrix

**Status:** Working evidence matrix; not an approved catalogue and not authority for definitive eligibility decisions.  
**Research date:** 2026-10-14  
**Owner:** Project owner acting as temporary curator/reviewer  
**Related requirement/gap:** REQ-CAT-001, NFR-DATA-001, GAP-001, Q-019  
**Gate impact:** `REQUIREMENTS READY` remains blocked until the required programme records are complete, reconciled and curator-signed.

## Purpose and decision rule

Track each candidate from official source evidence through reconciliation and approval. A search-indexed prospectus excerpt or a current programme page alone is not a complete admission rule. Where sources conflict, are incomplete, or do not establish applicability to the 2027 intake, do not select an arbitrary value. The eligibility evaluator must return `UNKNOWN` for a candidate when a material rule is missing, stale, conflicting or unsigned.

A record is publication-ready only when the curator has reviewed the complete applicable 2027 prospectus and faculty-yearbook/programme rules; confirmed programme code, campus, duration, subject requirements, APS calculation and inclusions/exclusions, special conditions and selection notes; recorded source URL, source version and verification date; and signed off the normalized record and boundary tests.

## Official source register

| Source ID | Source | Evidence available in this research pass | Limitation |
|---|---|---|---|
| SRC-UJ-2027-PROS | [UJ 2027 Undergraduate Prospectus (PDF)](https://www.uj.ac.za/wp-content/uploads/2026/06/uj_undergrad_prospectus2027.pdf) | Original uploaded PDF visually inspected for all seven candidate rows: printed pages 42, 44, 86 and 91; APS method on printed page 16. | Table layout and visible codes/thresholds verified; complete-rule interpretation, exceptions, curator sign-off and tests remain open. |
| SRC-UJ-CBE-2027 | [UJ College of Business and Economics Undergraduate 2027 Intake Brochure (PDF)](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf) | Original uploaded PDF visually inspected: printed pages 9–12 (PDF pages 12–15), including Information Management, Information Systems and Business Information Technology. | Visual comparison confirms the shown CBE values; complete-rule interpretation, exceptions, curator sign-off and tests remain open. |
| SRC-UJ-CBE-YB-2026 | [UJ CBE Undergraduate Yearbook 2026 (PDF)](https://www.uj.ac.za/wp-content/uploads/2026/02/cbe-undergraduate-yearbook-2026-03-02.pdf) | Current faculty yearbook lists Business Information Technology code DI1401 | 2026 yearbook is corroborative context, not a substitute for 2027 requirements. |
| SRC-UJ-PAGE-IT | [BSc in Information Technology](https://www.uj.ac.za/university-courses/bsc-in-information-technology/) | Official current programme page | Current page's displayed 2026 application window does not itself prove complete 2027 rules. |
| SRC-UJ-PAGE-CSI | [BSc in Computer Science and Informatics](https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics) | Official current programme page | Verify complete 2027 source and faculty rules. |
| SRC-UJ-PAGE-CSI-EXT | [BSc in Computer Science and Informatics Extended](https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics-extended/) | Official current page lists code B2E02Q, APS 26, English level 4 and Mathematics level 5 | Older Academy page reportedly lists B2E01Q; resolve against the full applicable 2027 prospectus/yearbook. |
| SRC-UJ-PAGE-CSI-AI | [BSc in Computer Science and Informatics specialising in AI](https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics-specialising-in-ai-artificial-intelligence/) | Official current programme page | Verify complete 2027 rule and all conditions. |
| SRC-UJ-PAGE-BCOM-IS | [BCom in Information Systems](https://www.uj.ac.za/university-courses/bcom-in-information-systems/) | Official current page lists B1CISQ, APS 26, English 4, Mathematics/Technical Mathematics 4 and no Mathematical Literacy | Verify full 2027 table and any additional rules. |
| SRC-UJ-PAGE-DIP-BIT | [Diploma in Business Information Technology](https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/) | Official current page lists DI1401; APS 22 with Mathematics or 24 with Mathematical Literacy; English 4; Mathematics/Technical Mathematics 3 or Mathematical Literacy 6 | Current page's displayed application window is 2026; do not treat alone as a 2027 guarantee. |
| SRC-UJ-PAGE-BCOM-IM | [BCom in Information Management](https://www.uj.ac.za/university-courses/bcom-in-information-management/) | Official current page lists B34IMQ and APS 28, English 4, Mathematics/Technical Mathematics 4 or Mathematical Literacy 6 | The 2027 prospectus table text appears to distinguish APS 26 with Mathematics/Technical Mathematics from APS 28 with Mathematical Literacy. Inspect original table and reconcile. |
| SRC-UJ-ACADEMY-OLD | [UJ Academy undergraduate courses](https://www.uj.ac.za/faculties/science/departments-2/academy-of-computer-science-and-software-engineering/courses-and-programmes/undergraduate-courses/) | Older page cited for B2E01Q comparison | Age/applicability unknown; not controlling over 2027 evidence without explicit confirmation. |

## Programme reconciliation matrix

**Status meanings:**  
- **RESEARCH LEAD** — plausible official-source values recorded, but completeness or 2027 applicability not established.  
- **RECONCILIATION REQUIRED** — a material discrepancy or missing rule must be resolved.  
- **NOT APPROVED** — no record below is currently approved for definitive screening.

| Candidate ID | Preliminary identity / lead (not definitive) | Evidence to reconcile | Remaining required checks | Current disposition |
|---|---|---|---|---|
| UJ-2027-BSC-IT | BSc in Information Technology; B2I01Q; reported APS 30, English 5, Mathematics 6; APK; 3 years | 2027 prospectus plus current programme page | Inspect complete 2027 table; APS calculation/inclusions; subjects/exclusions; conditions/selection; source page/version; curator sign-off | RESEARCH LEAD — NOT APPROVED |
| UJ-2027-BSC-CSI | BSc in Computer Science and Informatics; B2I02Q; reported APS 30, English 5, Mathematics 6; APK; 3 years | 2027 prospectus plus current programme page | Same complete rule review as above; confirm all programme-specific conditions | RESEARCH LEAD — NOT APPROVED |
| UJ-2027-BSC-CSI-EXT | BSc in Computer Science and Informatics Extended; 2027/current page code B2E02Q; reported APS 26, English 4, Mathematics 5; APK; 4 years | Current page and 2027 prospectus reportedly show B2E02Q; older Academy page reportedly shows B2E01Q | The 2027 prospectus visibly lists B2E02Q; older B2E01Q is from a historical page. Record the source-cycle distinction, then confirm any remaining extended-programme conditions and obtain curator sign-off | RECONCILIATION REQUIRED — NOT APPROVED |
| UJ-2027-BSC-CSI-AI | BSc in Computer Science and Informatics specialising in AI; B2I04Q; reported APS 34, English 5, Mathematics 7; APK; 3 years | 2027 prospectus plus current programme page | Inspect full 2027 table; APS formula/inclusions; all additional conditions and exclusions | RESEARCH LEAD — NOT APPROVED |
| UJ-2027-BCOM-IS | BCom in Information Systems; B1CISQ; prospectus lead APS 26, English 4, Mathematics/Technical Mathematics 4, Mathematical Literacy not accepted; APB; 3 years | 2027 prospectus plus current programme page | Original prospectus and CBE brochure tables visually confirm the displayed subject columns and values; finish full conditions/APS interpretation and obtain curator sign-off | RESEARCH LEAD — NOT APPROVED |
| UJ-2027-DIP-BIT | Diploma in Business Information Technology; central prospectus indexed text appears as D1I40J; current programme page and 2027 CBE brochure show DI1401; reported APS 22 with Mathematics/Technical Mathematics or 24 with Mathematical Literacy; APB; 3 years | Central prospectus search extraction vs official 2027 CBE brochure/current page; 2026 CBE yearbook corroborates DI1401 | Original central prospectus visibly shows DI1401, APS 22 with Mathematics/Technical Mathematics OR 24 with Mathematical Literacy, English 4, Mathematics/Technical Mathematics 3 OR Mathematical Literacy 6, APB and 3 years. The earlier D1I40J string is an extraction/transcription variation, not the visible printed code. Confirm full conditions and obtain curator sign-off | RECONCILIATION REQUIRED — likely extraction issue, not yet proven; NOT APPROVED |
| UJ-2027-BCOM-IM | BCom in Information Management; B34IMQ; prospectus table text appears APS 26 with Mathematics/Technical Mathematics or 28 with Mathematical Literacy; current page gives APS 28 with Mathematics/Technical Mathematics 4 or Mathematical Literacy 6; APK; 3 years | 2027 prospectus, current programme page, and relevant faculty information | Original prospectus and CBE brochure visually confirm APS 26 with Mathematics/Technical Mathematics OR 28 with Mathematical Literacy, English 4, Mathematics 4, Mathematical Literacy 6, Technical Mathematics 4, APK and 3 years. Resolve how current page's general APS 28 wording applies to 2027 and complete conditions/sign-off | RECONCILIATION REQUIRED — NOT APPROVED |

## Shared verification checklist for every candidate

- [ ] Exact qualification name and code visually confirmed in the applicable 2027 source.
- [ ] Intake/cycle applicability explicitly established.
- [ ] Campus and study duration confirmed.
- [ ] APS formula documented, including which subjects count and any excluded subjects (including Life Orientation where applicable).
- [ ] English level and all required subject-level thresholds confirmed.
- [ ] Mathematics, Technical Mathematics and Mathematical Literacy treated as distinct subjects; no unsupported equivalence inferred.
- [ ] All restrictions, exceptions, selection notes, prior-study restrictions and qualification-specific conditions reviewed.
- [ ] Any extended-degree/diploma pathway is described only as the source states; no assumed articulation.
- [ ] Official source URL, title, relevant page/table number, version/publication date, verification date and source snapshot/reference recorded.
- [ ] Conflicting sources resolved with official evidence or the affected field/rule left unresolved.
- [ ] Normalized record reviewed and signed off by curator.
- [ ] Deterministic evaluator tests cover pass/fail boundaries, missing inputs, alternative subject routes, and conflicting/unknown rule behavior.
- [ ] Catalogue version incremented and the traceability register updated.

## Required reconciliation actions

1. **P0 — Inspect original PDF tables:** capture exact page numbers and verify all seven candidate rows from the central 2027 prospectus. Search snippets are discovery aids only.
2. **P0 — Resolve CSI Extended code:** confirm whether B2E01Q is obsolete/incorrect or has a valid scope; do not silently discard it.
3. **P0 — Resolve Diploma Business IT code:** inspect the central prospectus page to determine whether D1I40J is a text extraction/OCR error; corroborating official 2027 CBE brochure and current page show DI1401, but visual confirmation is still required.
4. **P0 — Resolve Information Management APS:** confirm whether the APS is conditional on Mathematics/Technical Mathematics versus Mathematical Literacy, and align the threshold with each subject route.
5. **P0 — Complete full-rule extraction:** record APS subject inclusion/calculation, exclusions, conditions, selection rules and cycle for every candidate.
6. **P0 — Curator approval:** sign off each complete record and its deterministic test cases.
7. **P0 — Acceptance gate:** achieve 6–8 complete verified records; seven candidates alone do not satisfy the target.
8. **Separate open gaps:** subject canonical IDs/aliases (GAP-002), verified pathway relationships (GAP-003), privacy/runtime evidence (GAP-004) and funding catalogue (GAP-005) remain independent blockers.

## Traceability

| Requirement / gap | Contract or artifact | Planned tests | Implementation state | Gate evidence |
|---|---|---|---|---|
| REQ-CAT-001 / GAP-001 | Programme catalogue register + this matrix; future catalogue API schema remains draft | T-API-001: catalogue schema/provenance; evaluator boundary tests to be assigned when requirements are finalized | Documentation only; no catalogue loader/evaluator verified | Open until complete records and curator sign-off |
| NFR-DATA-001 / GAP-001 | Source provenance, freshness and catalogue version | T-API-001; T-API-004 for public fields/provenance | Not implemented/verified | Open |
| GAP-002 | Canonical subject IDs and aliases | Add explicit subject normalization and unknown-subject tests after approval | Not resolved | Open |
| GAP-003 | Verified pathway relationship records | Add provenance and relationship-type tests after evidence is curated | Not resolved | Open |
| GAP-004 | API/network/privacy behavior | T-API-002, T-API-003, T-API-004 | Not implemented or verified | P0 release blocker |
| GAP-005 | Funding opportunity catalogue | Funding provenance/freshness and unknown-sensitive-criteria tests to be defined | Not resolved | Open |

## Change log

- 2026-10-14 — Initial reconciliation matrix created from the current research register and official UJ search-indexed pages/PDF text. No candidate approved. Three issues remain under explicit review: CSI Extended code, Diploma Business IT code extraction, and conditional Information Management APS. Full-page inspection and curator sign-off remain outstanding.


## Follow-up official-source review — 2026-10-14

This section records additional official UJ search results reviewed after the matrix was merged. Search-result text is useful evidence, but it is not a substitute for inspecting the original applicable 2027 prospectus/yearbook page and recording its page number.

| Candidate / question | Additional official-source evidence | Interpretation | Disposition |
|---|---|---|---|
| UJ-2027-BSC-IT | Current UJ programme page lists code B2I01Q, 3 years at Auckland Park Kingsway, APS 30, English level 5 (60%+) and Mathematics level 6 (70%+): https://www.uj.ac.za/university-courses/bsc-in-information-technology/ | Corroborates the preliminary programme-page lead, but the page displays an April–October 2026 application window and does not by itself certify the 2027 intake's complete rules. | Research lead; not approved. |
| UJ-2027-BSC-CSI | Current UJ programme page lists code B2I02Q, 3 years at Auckland Park Kingsway, APS 30, English level 5 (60%+) and Mathematics level 6 (70%+): https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics | Corroborates the preliminary programme-page lead only. | Research lead; not approved. |
| UJ-2027-BSC-CSI-EXT | Current UJ page lists code B2E02Q, 4 years at Auckland Park Kingsway, APS 26, English level 4 (50%+) and Mathematics level 5 (60%+): https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics-extended/. The older Academy page lists B2E01Q: https://www.uj.ac.za/faculties/science/departments-2/academy-of-computer-science-and-software-engineering/courses-and-programmes/undergraduate-courses/ | Evidence supports B2E02Q as the current page's code. B2E01Q comes from an older page of unconfirmed cycle, so it should be recorded as a historical-source discrepancy rather than assumed to be a competing 2027 rule. | Still verify against applicable 2027 prospectus/yearbook; not approved. |
| UJ-2027-BSC-CSI-AI | Current UJ page lists code B2I04Q, 3 years at Auckland Park Kingsway, APS 34, English level 5 (60%+) and Mathematics level 7 (80%+): https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics-specialising-in-ai-artificial-intelligence/ | Corroborates the preliminary programme-page lead only. | Research lead; not approved. |
| UJ-2027-BCOM-IS | Current UJ page lists code B1CISQ, 3 years at Auckland Park Bunting Road, APS 26, English 4 (50%), Mathematics 4 (50%), Technical Mathematics 4 (50%) and says Mathematical Literacy is not accepted: https://www.uj.ac.za/university-courses/bcom-in-information-systems/ | Clarifies that Mathematics and Technical Mathematics are listed separately and Mathematical Literacy is excluded on the current page. 2027 applicability and complete rule still need confirmation. | Research lead; not approved. |
| UJ-2027-DIP-BIT | Current UJ page lists code DI1401, 3 years at Auckland Park Bunting Road, APS 22 with Mathematics or 24 with Mathematical Literacy; English 4 (50%); Mathematics/Technical Mathematics 3 (40%) or Mathematical Literacy 6 (70%); selection based on academic credit: https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/. UJ's 2026 CBE yearbook search result labels the qualification D1401, while earlier 2024/2025 yearbook search results show DI1401. | The source trail itself includes a likely typographical or extraction variation in the programme code across yearbook editions. Do not describe D1I40J as definitively an OCR error until the original 2027 central prospectus row is inspected; DI1401 is the current programme-page code. | Reconcile visually with the 2027 central prospectus and 2027 CBE brochure; not approved. |
| UJ-2027-BCOM-IM | Current UJ page lists B34IMQ, APS 28, English 4 (50%), Mathematics or Technical Mathematics 4 (50%), or Mathematical Literacy 6 (70%): https://www.uj.ac.za/university-courses/bcom-in-information-management/. UJ's departmental undergraduate page states APS 26 with Mathematics or 28 with Mathematical Literacy: https://www.uj.ac.za/faculties/college-of-business-and-economics/schools/school-of-consumer-intelligence-and-information-systems/information-and-knowledge-management/courses-and-programmes/undergraduate/ | The conditional APS interpretation has support from an official departmental page, but the current programme page and departmental page differ in how they state the minimum APS. Neither page alone proves the full 2027 intake rule. | Keep APS as unresolved for 2027 until the original 2027 prospectus/yearbook is checked and the discrepancy is curator-signed. |

### What this follow-up does and does not resolve

- It strengthens provenance for the current programme-page values for all seven candidates.
- It identifies that the old CSI Extended code comes from an older page; this does not prove which code the 2027 official intake rules require.
- It identifies an official departmental page that states conditional APS values for Information Management; the mismatch with the current programme page remains and must be resolved for the relevant cycle.
- It does not verify original PDF page numbers, the complete 2027 admission rule tables, APS subject inclusion/exclusion formulas, all programme-specific exceptions, or curator sign-off.
- It does not change any candidate to publication-ready. GAP-001 remains P0/open and the evaluator must return `UNKNOWN` when a material rule is incomplete or unresolved.
## Official 2027 CBE brochure cross-check — 2026-10-14

Additional official UJ search-indexed evidence was reviewed for the two CBE candidates. The evidence is stronger than a general current programme page, but the relevant original PDF page/table numbers have not yet been visually confirmed. Keep both records unapproved pending the full-rule and curator checks.

| Candidate / question | Additional official evidence | Reconciliation impact | Remaining disposition |
|---|---|---|---|
| UJ-2027-DIP-BIT — qualification code and minimums | The official [CBE Undergraduate 2027 Intake Brochure](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf) search-indexed table lists **DI1401**, APS 22 with Mathematics/Technical Mathematics or 24 with Mathematical Literacy, English level 4, Mathematics/Technical Mathematics level 3, or Mathematical Literacy level 6. The current official [programme page](https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/) lists the same code and thresholds and notes selection based on academic credit. The central [UJ 2027 Undergraduate Prospectus](https://www.uj.ac.za/wp-content/uploads/2026/06/uj_undergrad_prospectus2027.pdf) search extraction previously appeared as D1I40J. | Two official 2027/current sources support DI1401 and matching subject/APS routes. This makes a central-PDF extraction or transcription issue plausible, but does not prove it without checking the original central prospectus row. | **Partially reconciled; NOT APPROVED.** Visually verify the central prospectus row/page and record the page number. Confirm full 2027 selection conditions, campus, duration, APS inclusion rules and curator sign-off. |
| UJ-2027-BCOM-IM — conditional APS | The official [CBE Undergraduate 2027 Intake Brochure](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf) states APS **26 with Mathematics/Technical Mathematics OR 28 with Mathematical Literacy**, English level 4, Mathematics level 4, Mathematical Literacy level 6, Technical Mathematics level 4. The central [UJ 2027 Undergraduate Prospectus](https://www.uj.ac.za/wp-content/uploads/2026/06/uj_undergrad_prospectus2027.pdf) search-indexed row presents the same conditional APS pairing. The current [programme page](https://www.uj.ac.za/university-courses/bcom-in-information-management/) gives a general minimum APS 28 and subject alternatives without explaining the conditional APS distinction. | The two 2027 brochure/prospectus search results support the conditional APS rule. The programme-page wording is less specific, not sufficient by itself to overturn the 2027 intake table. The original table still requires visual review and complete-rule checks. | **Conditionally reconciled at search-text level; NOT APPROVED.** Verify original 2027 table/page, full APS inclusion/exclusion rules and programme-specific conditions, then obtain curator sign-off. |

### Evidence limits and decisions

- Search-indexed official-source text is recorded as discovery/corroboration evidence, not as a substitute for the original PDF table.
- No exact PDF page number or visual table inspection has been recorded for these two rows in this update.
- Do not load either candidate into definitive eligibility screening until the shared verification checklist is complete and the curator signs the normalized record.
- GAP-001 remains P0/open; REQUIREMENTS READY remains **NOT PASSED**. No eligibility code, executable tests or release data were changed by this research update.


## Original PDF visual verification — 2026-10-14

The project owner uploaded the two original PDFs into this review. The following pages were rendered and visually inspected, rather than relying only on search-indexed text:

| Source | PDF page | Printed page | Rows/details visually confirmed |
|---|---:|---:|---|
| UJ 2027 Undergraduate Prospectus | 16 | 16 | APS method: sum achievement ratings of six school subjects; Life Orientation is excluded. Example shows six subject ratings summing to APS 35. |
| UJ 2027 Undergraduate Prospectus | 42 | 42 | B34IMQ Information Management; B1CISQ Information Systems. Table column order visibly separates Mathematics, Mathematical Literacy and Technical Mathematics. |
| UJ 2027 Undergraduate Prospectus | 44 | 44 | Diploma in Business Information Technology code **DI1401**; APS 22 with Mathematics/Technical Mathematics OR 24 with Mathematical Literacy; English 4; Mathematics/Technical Mathematics 3 OR Mathematical Literacy 6; APB; 3 years. |
| UJ 2027 Undergraduate Prospectus | 86 | 86 | B2I01Q Information Technology (APS 30, English 5, Mathematics 6); B2I02Q Computer Science and Informatics (APS 30, English 5, Mathematics 6); B2I04Q CSI specialising in AI (APS 34, English 5, Mathematics 7); APK. The page note says Technical Mathematics and Technical Science are not accepted for Faculty of Science degree programmes. |
| UJ 2027 Undergraduate Prospectus | 91 | 91 | Extended CSI code **B2E02Q**, APS 26, English 4, Mathematics 5, APK; 4 years. |
| UJ CBE Undergraduate 2027 Intake Brochure | 13 | 10 | B34IMQ Information Management: APS 26 with Mathematics/Technical Mathematics OR 28 with Mathematical Literacy; English 4; Mathematics 4; Mathematical Literacy 6; Technical Mathematics 4; APK. B1CISQ Information Systems: APS 26; English 4; Mathematics 4; Mathematical Literacy not accepted; Technical Mathematics 4; APB. |
| UJ CBE Undergraduate 2027 Intake Brochure | 15 | 12 | Diploma Business Information Technology code **DI1401**; APS 22 with Mathematics/Technical Mathematics OR 24 with Mathematical Literacy; English 4; Mathematics/Technical Mathematics 3; Mathematical Literacy 6; APB. |

### Reconciliation decisions from visual evidence

1. **Diploma Business Information Technology code:** the central prospectus visibly prints **DI1401**, matching the 2027 CBE brochure and current programme page. The earlier extracted string D1I40J is not the visible printed code. Mark the code discrepancy as resolved by visual inspection; retain the extracted string only as a documented extraction error.
2. **CSI Extended code:** the applicable 2027 prospectus visibly prints **B2E02Q**. The older Academy page's B2E01Q is a historical-source difference; it must not override the 2027 prospectus code.
3. **Information Management APS:** both original 2027 sources visually support APS 26 with Mathematics/Technical Mathematics OR 28 with Mathematical Literacy. The current programme page's generic APS 28 wording is less specific; use the original 2027 intake table as the evidence for the 2027 lead, subject to curator sign-off.
4. **APS calculation:** the prospectus's generic APS page says six school subjects are counted and Life Orientation is excluded. This is a cross-cutting calculation note, not proof that every programme has no other subject inclusion/exclusion or special conditions.
5. **No approval implied:** all seven records remain **NOT APPROVED** until programme-specific rule completeness, conditions/selection notes, provenance/versioning, boundary tests and curator sign-off are complete. These documents are research evidence, not implementation or test results.

### Revised remaining work

- [ ] Interpret and capture complete programme-specific rules, including any footnotes, exceptions, selection conditions and applicant-category limits.
- [ ] Confirm the exact APS subject set for each candidate; do not infer programme-specific APS inputs solely from the general APS example.
- [ ] Obtain curator sign-off for each normalized record and associated test cases.
- [ ] Build the traceability matrix and deterministic eligibility tests; implementation and tests have not been verified.
- [ ] Reach 6–8 complete approved records. The current seven are candidates only; they are not yet complete approved records.
- [ ] Keep GAP-002, GAP-003, GAP-004 and GAP-005 open until independently evidenced.
