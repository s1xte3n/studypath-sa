# UJ 2027 Pilot — Subject Routes and Deterministic Rule Semantics

**Status:** Rule-encoding contract and evidence ledger; not approved for learner-facing eligibility.  
**As-of date:** 2026-10-14  
**Requirements:** REQ-CAT-001, REQ-MAT-001; GAP-001 and GAP-002  
**Canonical subject dictionary:** [SUBJECT-CATALOGUE-V1.md](./SUBJECT-CATALOGUE-V1.md)

## 1. Required rule representation

Each programme record must preserve official source wording and machine interpretation side by side. Do not flatten OR branches into simultaneously required subjects or treat every subject shown in a table as interchangeable.

Required fields: stable programme ID/title/code; institution/campus/duration when source-backed; intake cycle; source title/version/URL/page; verification date and retained review note; every threshold with original wording, canonical subject ID or unresolved source label, operator and level/percentage; APS threshold and exact method/included/excluded subjects/conversion; AND/OR/conditional expression; exclusions/substitutions/exceptions; selection criteria and applicant restrictions; catalogue version; reviewer role/date/approval status; linked tests.

If a required field is absent or could change the result, the record is not publishable. The evaluator returns UNKNOWN unless another verified mandatory failure independently establishes NOT_ELIGIBLE.

## 2. Operator semantics

- AND: all requirements must pass. Any confirmed mandatory failure fails the conjunction; otherwise an unknown component makes it unknown.
- OR: one verified passing branch is sufficient. Fail only when all branches are known to fail; if no branch passes and one or more are unknown, return unknown.
- Conditional: evaluate a dependent requirement only when its condition is verified true; skip it only when the condition is verified false. If the condition is unknown and could affect the result, return unknown.
- Explicit exclusion: a rejected subject cannot satisfy a positive requirement. Apply definitive failure only after exclusion scope is verified for the programme/cycle.
- APS: never infer a universal method. A generic prospectus statement that points are based on six subjects and excludes Life Orientation does not define every programme's subject selection, substitutions or exceptions.
- Unknown English level: if the source says only “English” and does not establish how HL/FAL results apply, keep the rule unresolved.
- Subject threshold: preserve the source's achievement level and percentage wording. Do not round, convert a percentage to a level using an assumed scale, or infer equivalence.
- ELIGIBLE means only that supported, verified minimum-screening requirements pass; it is not an admission decision.

## 3. Seven UJ 2027 source leads — not publication-ready

The repository records visual review of the UJ 2027 Undergraduate Prospectus and UJ CBE 2027 Intake Brochure. Values below are visible minimums recorded by that review, not proof that every applicable rule, footnote, APS inclusion or selection condition is complete. Subject IDs are proposed mappings, not signed-off UJ interpretations.

| Candidate | Source location and identity | Visible minimums recorded | Route interpretation currently supported | Remaining blockers |
|---|---|---|---|---|
| UJ-2027-BSC-IT — BSc in Information Technology, B2I01Q | Prospectus printed p. 86; APK; 3 years | APS 30; “English” level 5 (60%+); Mathematics level 6 (70%+) | Mathematics threshold AND unresolved English requirement AND unresolved APS rule | APS formula/included subjects; English HL/FAL semantics; table footnotes/selection; rule approval |
| UJ-2027-BSC-CSI — BSc in Computer Science and Informatics, B2I02Q | Prospectus printed p. 86; APK; 3 years | APS 30; “English” level 5 (60%+); Mathematics level 6 (70%+) | Same unresolved structure; Science faculty note says Technical Mathematics and Technical Sciences are not accepted for Faculty of Science degrees | Confirm note scope; APS formula; English semantics; footnotes/selection; approval |
| UJ-2027-BSC-CSI-EXT — BSc in Computer Science and Informatics Extended, B2E02Q | Prospectus printed p. 91; APK; 4 years | APS 26; “English” level 4 (50%+); Mathematics level 5 (60%+) | Mathematics threshold AND unresolved English rule AND unresolved APS rule | Extended-programme restrictions; APS formula; English semantics; footnotes/selection; approval |
| UJ-2027-BSC-CSI-AI — BSc in Computer Science and Informatics specialising in AI, B2I04Q | Prospectus printed p. 86; APK; 3 years | APS 34; “English” level 5 (60%+); Mathematics level 7 (80%+) | Mathematics threshold AND unresolved English rule AND unresolved APS rule | Specialisation-specific conditions; APS formula; English semantics; footnotes/selection; approval |
| UJ-2027-BCOM-IS — BCom in Information Systems, B1CISQ | Prospectus printed p. 42; CBE brochure printed p. 10 (PDF p. 13); APB; 3 years | APS 26; “English” level 4 (50%+); Mathematics level 4 (50%+); Technical Mathematics level 4 (50%+); Mathematical Literacy not accepted in visible table | Do not encode Mathematics OR Technical Mathematics yet. Separate columns do not prove alternatives or joint requirements. | Exact table column semantics; APS formula; English semantics; footnotes/selection; approval |
| UJ-2027-DIP-BIT — Diploma in Business Information Technology, DI1401 | Prospectus printed p. 44; CBE brochure printed p. 12 (PDF p. 15); APB; 3 years | APS 22 with Mathematics/Technical Mathematics OR APS 24 with Mathematical Literacy; English level 4; Mathematics/Technical Mathematics level 3 OR Mathematical Literacy level 6 | Candidate branches: (APS 22 AND accepted Mathematics/Technical Mathematics route) OR (APS 24 AND Mathematical Literacy route); English is additional. Exact grouping and whether Mathematics/Technical Mathematics are alternatives remain to verify. | Branch grouping; APS formula; English semantics; selection/footnotes; approval |
| UJ-2027-BCOM-IM — BCom in Information Management, B34IMQ | Prospectus printed p. 42; CBE brochure printed p. 10 (PDF p. 13); APK; 3 years | APS 26 with Mathematics/Technical Mathematics OR APS 28 with Mathematical Literacy; English level 4; Mathematics level 4; Technical Mathematics level 4; Mathematical Literacy level 6 | Do not encode route yet. Conditional APS wording and separate subject columns do not settle branch grouping. | Exact route grouping; APS formula; English semantics; selection/footnotes; approval |

Official sources recorded in the repository:
- [UJ 2027 Undergraduate Prospectus](https://www.uj.ac.za/wp-content/uploads/2026/06/uj_undergrad_prospectus2027.pdf)
- [UJ CBE Undergraduate 2027 Intake Brochure](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf)
- [UJ Diploma in Business Information Technology](https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/)
- [UJ BCom in Information Systems](https://www.uj.ac.za/university-courses/bcom-in-information-systems/)
- [UJ BCom in Information Management](https://www.uj.ac.za/university-courses/bcom-in-information-management/)

These are source links and prior review notes; values have not been independently re-extracted in this change. Do not treat this document as independent source verification.

## 4. Publication checklist for every record

- [ ] Full original 2027 table, all footnotes and applicable faculty/yearbook rules reviewed.
- [ ] English requirement mapped to a supported language-level rule or retained as unresolved.
- [ ] Every table column's AND/OR meaning and conditional branches confirmed.
- [ ] APS conversion, included/excluded subjects, threshold and programme-specific exceptions captured.
- [ ] Exclusions/substitutions and faculty notes have confirmed scope.
- [ ] Selection criteria, applicant categories and prerequisites recorded.
- [ ] Programme identity, cycle, source URL/version/page, verification date and catalogue version complete.
- [ ] Boundary tests cover branches, thresholds, missing values, unknown rules and repeatability.
- [ ] Curator approval, date and decision note recorded.

## 5. Minimum test oracles

| Test ID | Scenario | Expected result |
|---|---|---|
| T-RULE-001 | Every AND component verified and passing | Pass conjunction |
| T-RULE-002 | One verified mandatory AND component fails | Fail conjunction |
| T-RULE-003 | One OR branch passes | Pass OR expression |
| T-RULE-004 | Every OR branch verified and failing | Fail OR expression |
| T-RULE-005 | No OR branch passes and at least one branch is unknown | UNKNOWN |
| T-RULE-006 | APS formula or subject inclusion could change outcome but is unverified | UNKNOWN; record not publishable |
| T-RULE-007 | English HL/FAL interpretation unresolved | UNKNOWN; record not publishable |
| T-RULE-008 | Technical Mathematics substituted for Mathematics without explicit rule | Must not satisfy Mathematics requirement |
| T-RULE-009 | Mathematical Literacy used instead of the accepted subject(s) for BCom Information Systems | Cannot satisfy visible rule; definitive failure only after rule scope approval |
| T-RULE-010 | Material footnote/selection condition omitted | Reject publication |
| T-RULE-011 | Source cycle is not 2027 or conflicts with requested cycle | No definitive 2027 screening |
| T-RULE-012 | Same input and approved catalogue version evaluated twice | Identical state and explanations |

These are test specifications only; no executable test run is claimed.

## 6. Current disposition and exact closure work

**GAP-001 and GAP-002 remain OPEN.** Seven candidates exist, but they are not seven complete curator-approved programme rules. The subject IDs and semantics are proposed; no aliases are approved and no eligibility evaluator/test suite has been verified.

To close:
1. Approve SUBJECT-CATALOGUE-V1.md or record amendments.
2. Inspect original source tables and footnotes for every candidate, especially APS subject selection and separate subject columns in the CBE records.
3. Resolve UJ “English” to HL/FAL acceptance or preserve it as unsupported and exclude the affected programme from definitive screening.
4. Record the complete APS method and all branch logic per programme.
5. Obtain curator sign-off and run deterministic boundary tests.
6. Publish only records meeting every checklist item. If fewer than 6–8 are complete, keep GAP-001 open and report the smaller verified set.

No application code, eligibility implementation, executed tests, CI result or deployment is asserted by this document.
