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
| SRC-UJ-2027-PROS | [UJ 2027 Undergraduate Prospectus (PDF)](https://www.uj.ac.za/wp-content/uploads/2026/06/uj_undergrad_prospectus2027.pdf) | Search-indexed table text for multiple programmes and NSC requirements | Search extraction can flatten table columns or misread codes. Inspect the relevant PDF page visually and capture the page number before approving data. |
| SRC-UJ-CBE-2027 | [UJ College of Business and Economics Undergraduate 2027 Intake Brochure (PDF)](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf) | Search-indexed 2027 CBE admission table; lists Business Information Technology as DI1401 | Still verify the relevant PDF page/table and reconcile with the central prospectus before sign-off. |
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
| UJ-2027-BSC-CSI-EXT | BSc in Computer Science and Informatics Extended; 2027/current page code B2E02Q; reported APS 26, English 4, Mathematics 5; APK; 4 years | Current page and 2027 prospectus reportedly show B2E02Q; older Academy page reportedly shows B2E01Q | Inspect full 2027 table and relevant yearbook; establish whether older code is obsolete; confirm extended-programme conditions and eligibility scope | RECONCILIATION REQUIRED — NOT APPROVED |
| UJ-2027-BSC-CSI-AI | BSc in Computer Science and Informatics specialising in AI; B2I04Q; reported APS 34, English 5, Mathematics 7; APK; 3 years | 2027 prospectus plus current programme page | Inspect full 2027 table; APS formula/inclusions; all additional conditions and exclusions | RESEARCH LEAD — NOT APPROVED |
| UJ-2027-BCOM-IS | BCom in Information Systems; B1CISQ; prospectus lead APS 26, English 4, Mathematics/Technical Mathematics 4, Mathematical Literacy not accepted; APB; 3 years | 2027 prospectus plus current programme page | Confirm the column-to-value mapping from original table; confirm exact Mathematics vs Technical Mathematics wording; full conditions and APS rules | RESEARCH LEAD — NOT APPROVED |
| UJ-2027-DIP-BIT | Diploma in Business Information Technology; central prospectus indexed text appears as D1I40J; current programme page and 2027 CBE brochure show DI1401; reported APS 22 with Mathematics/Technical Mathematics or 24 with Mathematical Literacy; APB; 3 years | Central prospectus search extraction vs official 2027 CBE brochure/current page; 2026 CBE yearbook corroborates DI1401 | Inspect original central prospectus table. Determine whether D1I40J is OCR/table-extraction error or true source conflict. Confirm 2027 APS alternatives, subject-level minima, campus and conditions against 2027 table | RECONCILIATION REQUIRED — likely extraction issue, not yet proven; NOT APPROVED |
| UJ-2027-BCOM-IM | BCom in Information Management; B34IMQ; prospectus table text appears APS 26 with Mathematics/Technical Mathematics or 28 with Mathematical Literacy; current page gives APS 28 with Mathematics/Technical Mathematics 4 or Mathematical Literacy 6; APK; 3 years | 2027 prospectus, current programme page, and relevant faculty information | Inspect original prospectus table to confirm conditional APS mapping; reconcile APS statement and subject alternatives; check faculty yearbook, special conditions and exclusions | RECONCILIATION REQUIRED — NOT APPROVED |

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
