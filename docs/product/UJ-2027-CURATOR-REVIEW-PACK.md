# UJ 2027 — GAP-001 Curator Review Pack

**Status:** Curator approved on 2026-10-14 as the bounded UJ 2027 NSC pilot rule baseline, subject to the explicit UNKNOWN safeguards and evidence/test limitations below. This approval does not certify unresolved rules or permit definitive ELIGIBLE outcomes where material evidence is missing.  
**Prepared:** 2026-10-14  
**Curator / final approver:** Project owner; explicit approval recorded in the project conversation on 2026-10-14  
**Requirement / blocker:** REQ-CAT-001, REQ-MAT-001, REQ-DET-001; GAP-001 / Q-019  
**Catalogue version proposed:** `uj-2027-pilot-v0.1-draft` (not approved for publication)

## 1. Purpose and approval boundary

This pack turns the seven documented UJ 2027 candidate leads into a structured review checklist. It records source-backed visible requirements separately from unresolved interpretation. It is **not** an approved catalogue, a guarantee of admission, or permission to show definitive eligibility results.

The curator has approved the bounded pilot baseline recorded below. The exact expected test outcomes remain pending because executable rule-oracle verification has not yet been completed. If a material rule remains missing, conflicting, or ambiguous, the implementation must return `UNKNOWN` unless a different, independently verified mandatory requirement already proves `NOT_ELIGIBLE`. Do not convert a draft or incomplete record into `ELIGIBLE`.

### Approval rules

- Use the applicable **2027 NSC** admission table for this pilot. NC(V), international, transfer, mature-age, and other applicant categories are not covered by these draft NSC records.
- Preserve official source wording and a normalized interpretation side by side.
- Treat Mathematics, Technical Mathematics, Mathematical Literacy, Physical Sciences, Technical Sciences, and Life Sciences as distinct subjects. Never infer equivalence.
- The general 2027 prospectus says APS is calculated from six school subjects and excludes Life Orientation (printed p. 16). That general rule does not by itself establish each programme's included subjects, handling of alternatives, or all special conditions.
- The prospectus states that Technical Mathematics and Technical Science are not accepted for Faculty of Science degree programmes (printed pp. 86 and 91). The draft applies this source note only to the three Faculty of Science degree candidates below, subject to curator confirmation.
- The table's “English” level does not, by itself, establish whether Home Language and First Additional Language are treated differently. Do not infer a language-stream mapping without authoritative evidence.
- The published minimums are minimum admission requirements, not an admission offer. Selection, capacity, and changes to requirements may still apply.

## 2. Primary sources and provenance

| Source ID | Official source | Relevant location | Use and limitations |
|---|---|---|---|
| `SRC-UJ-2027-PROS` | [UJ 2027 Undergraduate Prospectus (PDF)](https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf) | Printed p. 16 (APS note); p. 42 (BCom rows); p. 44 (Diploma row); p. 86 (three Science degrees); p. 91 (extended Science degree) | Primary cycle-specific source. Local reviewed artifact: `uj_undergrad_prospectus2027_online_25jun2026.pdf`. Table values were inspected in the supplied PDF; interpretation and curator sign-off remain open. |
| `SRC-UJ-CBE-2027` | [UJ College of Business and Economics Undergraduate 2027 Intake Brochure (PDF)](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf) | Printed p. 10 / PDF p. 13 (BCom rows); printed p. 12 / PDF p. 15 (Diploma row) | Additional 2027 faculty-specific table for BCom and Diploma candidates. Local reviewed artifact: `brochure-cbe_undergraduate_2027-intake.pdf`. |
| `SRC-UJ-PAGE-BCOM-IM` | [BCom Information Management official programme page](https://www.uj.ac.za/university-courses/bcom-in-information-management/) | Current web page | Corroborative current page; its general APS wording differs in specificity from the 2027 CBE table. Do not replace the 2027 conditional values with generic wording without curator decision. |
| `SRC-UJ-PAGE-BCOM-IS` | [BCom Information Systems official programme page](https://www.uj.ac.za/university-courses/bcom-in-information-systems/) | Current web page | Corroborates code and broad subject pattern; the 2027 prospectus/CBE table remains the cycle-specific basis. |
| `SRC-UJ-PAGE-DIP-BIT` | [Diploma in Business Information Technology official programme page](https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/) | Current web page | Corroborates code and broad minimums; its selection wording does not define a numeric selection rule for the 2027 record. |
| `SRC-UJ-PAGE-CSI-EXT` | [BSc Computer Science and Informatics Extended official programme page](https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics-extended/) | Current web page | Corroborates current code B2E02Q and visible minimums; historical B2E01Q page is not an alternative 2027 code. |

**Source-cycle note:** The official 2027 CBE brochure explicitly presents BCom Information Management APS as “26 with Maths/Tech Maths OR 28 with Mathematical Literacy.” The extracted text from the central prospectus row shows “28 with Mathematical Literacy” and does not independently establish the APS 26 branch. Therefore, the APS 26 branch is currently supported by the 2027 CBE brochure; the apparent difference in presentation is recorded for curator review rather than overstated as two identical source confirmations.

## 3. Shared APS and subject-level interpretation checklist

The project owner approved the proposed shared interpretation checklist on 2026-10-14. Approval records the intended policy; it does not create missing source evidence. Where the exact subject-selection method, English stream mapping, or selection conditions remain unverified, keep the affected result `UNKNOWN` rather than infer eligibility.

- [ ] APS is the sum of the six applicable school-subject achievement ratings.
- [ ] Life Orientation is excluded from APS, per the prospectus note.
- [ ] The exact six subjects to use when more than six are supplied, and treatment of missing/duplicate subjects, are specified in the product rule contract and do not invent marks.
- [ ] The English level shown in the table is matched only to a source-supported English result; Home Language vs First Additional Language treatment is resolved.
- [ ] Rating thresholds are inclusive minimums (e.g. level 5 / 60% means at least the stated level/percentage) only after the curator confirms the catalogue's mark-to-level mapping source and rule.
- [ ] Alternative APS/subject routes are represented as explicit Boolean branches. No branch is inferred only from a column's visual placement.
- [ ] The source's selection notes, programme availability/campus conditions, applicant-category restrictions, and change warnings are represented or explicitly out of scope.
- [ ] The record's source URL, source title/version, printed page, verification date, reviewer, catalogue version and linked tests are stored.
- [ ] A rule is not marked approved until both the record and its boundary-test expected outcomes are signed off.

**Important missing rule evidence:** The prospectus table gives achievement levels and percentages, but this pack does not establish an authoritative conversion for every learner qualification/result format. Do not silently convert non-NSC, incomplete, foreign, NC(V), or differently reported marks using these NSC rows.

## 4. Candidate record review sheets

Every record below is a **draft proposal**. Curator decision and signature fields are intentionally blank.

### R1 — BSc in Information Technology

**Stable draft ID:** `UJ-2027-BSC-IT`  
**Qualification code:** `B2I01Q`  
**Source:** 2027 prospectus, printed p. 86  
**Campus / duration:** Auckland Park Kingsway (APK); 3 years  
**Visible table minimums:** APS 30; English level 5 (60%+); Mathematics level 6 (70%+); Physical Science “Not applicable.”

**Proposed normalized facts (not yet an approved rule):**
- APS threshold: 30.
- English threshold: level 5 / 60%+ as printed.
- Mathematics threshold: level 6 / 70%+ as printed.
- Physical Science is not a stated minimum for this row.
- Faculty of Science note says Technical Mathematics and Technical Science are not accepted for Faculty of Science degree programmes.

**Curator must resolve:**
- [ ] Confirm the general APS calculation and exact eligible six-subject selection method.
- [ ] Confirm whether the Faculty of Science note excludes a candidate whose submitted subject is Technical Mathematics/Technical Science from APS calculation, from satisfying the Mathematics requirement, or from consideration more broadly. Do not encode a broader consequence than the source supports.
- [ ] Confirm English qualification-stream interpretation (HL/FAL).
- [ ] Confirm all applicable footnotes, selection conditions and applicant-category limits for this programme.

**Proposed test oracle after resolution:** APS 29 vs 30; English one level below vs level 5; Mathematics level 5 vs 6; Technical Mathematics presented instead of Mathematics; missing English or Mathematics. Expected results are **not approved yet**.

**Curator decision:** Approved by project owner on 2026-10-14, with the pack's explicit UNKNOWN safeguards.  
**Conditions / source note:** ____________________________________  
**Curator / date / catalogue version:** ___________________________

### R2 — BSc in Computer Science and Informatics

**Stable draft ID:** `UJ-2027-BSC-CSI`  
**Qualification code:** `B2I02Q`  
**Source:** 2027 prospectus, printed p. 86  
**Campus / duration:** APK; 3 years  
**Visible table minimums:** APS 30; English level 5 (60%+); Mathematics level 6 (70%+); Physical Science “Not applicable.”

**Proposed normalized facts (not yet an approved rule):** Same visible threshold pattern as R1, with the programme identity and code above. The Faculty of Science note concerning Technical Mathematics and Technical Science is printed directly after the Faculty of Science table.

**Curator must resolve:**
- [ ] Confirm the APS and English interpretation shared with R1.
- [ ] Confirm the exact scope and consequences of the Faculty of Science subject note.
- [ ] Confirm whether any programme-specific conditions beyond the row and faculty note apply.
- [ ] Confirm applicant categories and any selection restrictions.

**Proposed test oracle after resolution:** APS 29/30; English level 4/5; Mathematics level 5/6; Technical Mathematics instead of Mathematics; missing required input. Expected results are **not approved yet**.

**Curator decision:** ☐ Approve ☐ Reject ☐ Needs more evidence  
**Conditions / source note:** ____________________________________  
**Curator / date / catalogue version:** ___________________________

### R3 — BSc in Computer Science and Informatics specialising in AI

**Stable draft ID:** `UJ-2027-BSC-CSI-AI`  
**Qualification code:** `B2I04Q`  
**Source:** 2027 prospectus, printed p. 86  
**Campus / duration:** APK; 3 years  
**Visible table minimums:** APS 34; English level 5 (60%+); Mathematics level 7 (80%+); Physical Science “Not applicable.”

**Proposed normalized facts (not yet an approved rule):**
- APS threshold: 34.
- English threshold: level 5 / 60%+.
- Mathematics threshold: level 7 / 80%+.
- Physical Science is not a stated minimum for this row.
- Faculty of Science subject note applies as described for R1/R2, subject to curator confirmation.

**Curator must resolve:**
- [ ] Confirm exact APS and English interpretation.
- [ ] Confirm Technical Mathematics / Technical Science exclusion scope.
- [ ] Confirm that no additional AI-specialisation condition, selection criterion, or restriction is omitted from the applicable 2027 materials.
- [ ] Confirm applicant-category limits and selection notes.

**Proposed test oracle after resolution:** APS 33/34; English level 4/5; Mathematics level 6/7; Technical Mathematics instead of Mathematics; missing data. Expected results are **not approved yet**.

**Curator decision:** ☐ Approve ☐ Reject ☐ Needs more evidence  
**Conditions / source note:** ____________________________________  
**Curator / date / catalogue version:** ___________________________

### R4 — BSc in Computer Science and Informatics Extended

**Stable draft ID:** `UJ-2027-BSC-CSI-EXT`  
**Qualification code:** `B2E02Q`  
**Source:** 2027 prospectus, printed p. 91  
**Campus / duration:** APK; 4 years  
**Visible table minimums:** APS 26; English level 4 (50%+); Mathematics level 5 (60%+); Physical Science and Life Science “Not applicable.”

**Proposed normalized facts (not yet an approved rule):**
- APS threshold: 26.
- English threshold: level 4 / 50%+.
- Mathematics threshold: level 5 / 60%+.
- Physical Science and Life Science are not stated as minimums for this row.
- The current programme page and 2027 prospectus show B2E02Q. The older B2E01Q page is treated as historical, not as an alias or a competing 2027 code.
- The Faculty of Science note concerning Technical Mathematics and Technical Science appears on printed p. 91.

**Curator must resolve:**
- [ ] Confirm whether the Faculty of Science subject note applies to this extended programme in the same way as the three-year degrees.
- [ ] Confirm whether any extended-degree participation, progression, or selection conditions are required to describe minimum eligibility accurately.
- [ ] Confirm APS, English-stream interpretation, applicant categories and other footnotes.

**Proposed test oracle after resolution:** APS 25/26; English level 3/4; Mathematics level 4/5; Technical Mathematics instead of Mathematics; missing required data. Expected results are **not approved yet**.

**Curator decision:** ☐ Approve ☐ Reject ☐ Needs more evidence  
**Conditions / source note:** ____________________________________  
**Curator / date / catalogue version:** ___________________________

### R5 — BCom in Information Systems

**Stable draft ID:** `UJ-2027-BCOM-IS`  
**Qualification code:** `B1CISQ`  
**Sources:** 2027 prospectus, printed p. 42; 2027 CBE brochure, printed p. 10 / PDF p. 13  
**Campus / duration:** Auckland Park Bunting Road (APB); 3 years  
**Visible table minimums:** APS 26; English level 4 (50%+); Mathematics level 4 (50%+); Mathematical Literacy “Not accepted”; Technical Mathematics level 4 (50%+).

**Proposed normalized facts (not yet an approved rule):**
- APS threshold: 26.
- English threshold: level 4 / 50%+.
- Mathematical Literacy is explicitly marked “Not accepted.”
- Mathematics and Technical Mathematics appear in separate columns, both with level 4 / 50%+.

**Curator must resolve:**
- [ ] Confirm whether Mathematics **OR** Technical Mathematics is an accepted route, rather than requiring both. Current official programme-page wording supports “Mathematics/Technical Mathematics 4,” but the normalized rule must cite and preserve the approved interpretation.
- [ ] Confirm that “Mathematical Literacy not accepted” means it cannot satisfy the Mathematics requirement and whether its presence otherwise affects APS calculation.
- [ ] Confirm English-stream interpretation, APS selection method, all applicable conditions and applicant categories.

**Proposed test oracle after resolution:** APS 25/26; English level 3/4; Mathematics level 3/4; Technical Mathematics level 3/4; Mathematical Literacy at any level as the only mathematics-like subject. Expected results are **not approved yet**.

**Curator decision:** ☐ Approve ☐ Reject ☐ Needs more evidence  
**Conditions / source note:** ____________________________________  
**Curator / date / catalogue version:** ___________________________

### R6 — Diploma in Business Information Technology

**Stable draft ID:** `UJ-2027-DIP-BIT`  
**Qualification code:** `DI1401`  
**Sources:** 2027 prospectus, printed p. 44; 2027 CBE brochure, printed p. 12 / PDF p. 15  
**Campus / duration:** Auckland Park Bunting Road (APB); 3 years  
**Visible table minimums:** APS 22 with Mathematics/Technical Mathematics **OR** APS 24 with Mathematical Literacy; English level 4 (50%+); Mathematics level 3 (40%+); Mathematical Literacy level 6 (70%+); Technical Mathematics level 3 (40%+).

**Proposed normalized facts (not yet an approved rule):**
- APS branch A as printed: 22 with Mathematics/Technical Mathematics.
- APS branch B as printed: 24 with Mathematical Literacy.
- English threshold: level 4 / 50%+.
- Subject columns show Mathematics level 3, Mathematical Literacy level 6, and Technical Mathematics level 3.
- Code DI1401 is visually shown in the 2027 prospectus and 2027 CBE brochure. The earlier string `D1I40J` is treated as an extraction/transcription variation, not an alternative code.
- A current programme page mentions selection based on academic credit, but the evidence here does not establish the applicable 2027 criteria or a numeric threshold.

**Curator must resolve:**
- [ ] Confirm the precise branches: whether branch A requires APS ≥22 **and** either Mathematics ≥3 or Technical Mathematics ≥3; and branch B requires APS ≥24 **and** Mathematical Literacy ≥6.
- [ ] Confirm English level 4 applies to both branches.
- [ ] Confirm how APS is calculated within each branch and whether the relevant mathematics subject must be included in the six APS subjects.
- [ ] Establish what “selection based on academic credit” means for the 2027 intake, or explicitly keep that selection rule out of scope and label the record as minimum-requirements screening only.
- [ ] Confirm applicant-category limits and all footnotes/conditions.

**Proposed test oracle after resolution:** Test each APS/subject route independently, including APS 21/22/23/24; Math or Technical Math level 2/3; Mathematical Literacy level 5/6; English level 3/4; and mixed subjects that do not satisfy any single complete branch. Expected results are **not approved yet**.

**Curator decision:** ☐ Approve ☐ Reject ☐ Needs more evidence  
**Conditions / source note:** ____________________________________  
**Curator / date / catalogue version:** ___________________________

### R7 — BCom in Information Management

**Stable draft ID:** `UJ-2027-BCOM-IM`  
**Qualification code:** `B34IMQ`  
**Sources:** 2027 CBE brochure, printed p. 10 / PDF p. 13; central prospectus, printed p. 42; current official programme page  
**Campus / duration:** APK; 3 years  
**Visible CBE table minimums:** APS 26 with Mathematics/Technical Mathematics **OR** APS 28 with Mathematical Literacy; English level 4 (50%+); Mathematics level 4 (50%+); Mathematical Literacy level 6 (70%+); Technical Mathematics level 4 (50%+).

**Proposed normalized facts (not yet an approved rule):**
- Branch A APS value: 26 with Mathematics/Technical Mathematics.
- Branch B APS value: 28 with Mathematical Literacy.
- English threshold: level 4 / 50%+.
- Subject columns show Mathematics level 4, Mathematical Literacy level 6, and Technical Mathematics level 4.
- The current official programme page's generic APS 28 wording is less specific than the CBE 2027 intake table. Keep the cycle-specific CBE table as the draft evidence and document this source difference; do not silently collapse the two branches.

**Curator must resolve:**
- [ ] Confirm the exact Boolean route: whether branch A is APS ≥26 AND English ≥4 AND (Mathematics ≥4 OR Technical Mathematics ≥4), while branch B is APS ≥28 AND English ≥4 AND Mathematical Literacy ≥6.
- [ ] Confirm whether Mathematics/Technical Mathematics and Mathematical Literacy branches are mutually exclusive, or whether a candidate can satisfy one route while also presenting the other subject.
- [ ] Confirm which subjects count toward APS in each branch and whether a candidate may use a different six-subject combination.
- [ ] Confirm English-stream interpretation, applicant categories and any additional conditions.

**Proposed test oracle after resolution:** Test branch A at APS 25/26 with Mathematics and Technical Mathematics boundaries; test branch B at APS 27/28 and Mathematical Literacy 5/6; test English 3/4; test mixed/ambiguous subjects. Expected results are **not approved yet**.

**Curator decision:** ☐ Approve ☐ Reject ☐ Needs more evidence  
**Conditions / source note:** ____________________________________  
**Curator / date / catalogue version:** ___________________________

## 5. Cross-record decisions requiring curator confirmation

Record each decision here once, then link it from all affected records.

| Decision ID | Question | Affected records | Curator decision / evidence |
|---|---|---|---|
| CUR-001 | What exact APS subject-selection method is used when a learner supplies more than six subjects? | All seven | Pending |
| CUR-002 | How does the catalogue map an NSC percentage/achievement level to the prospectus's stated level and percentage, including boundary values? | All seven | Pending |
| CUR-003 | How is the table's “English” requirement applied to Home Language vs First Additional Language? | All seven | Approved policy: no inferred HL/FAL mapping; UNKNOWN if material |
| CUR-004 | What is the precise consequence of the Faculty of Science Technical Mathematics / Technical Science note? | R1–R4 | Approved conservative handling: do not broaden beyond source; UNKNOWN if consequence is material and unresolved |
| CUR-005 | Is Mathematics OR Technical Mathematics accepted for BCom Information Systems, and how is Mathematical Literacy excluded? | R5 | Approved as draft interpretation; require source-grounded branch semantics and UNKNOWN if unresolved |
| CUR-006 | What exact AND/OR branches apply to the Diploma in Business Information Technology? | R6 | Approved as draft interpretation; do not return ELIGIBLE until branch oracle is verified |
| CUR-007 | What exact AND/OR branches apply to BCom Information Management, and how is the current generic APS wording recorded against the CBE 2027 table? | R7 | Approved as draft interpretation; retain source discrepancy note and verify branch oracle |
| CUR-008 | Which selection conditions, footnotes and applicant categories must be represented for this MVP's NSC minimum-screening scope? | All seven | Approved scope: 2027 NSC minimum-screening only; unresolved material conditions remain UNKNOWN |

## 6. Boundary-test sign-off worksheet

These are test **designs**, not passed tests. Once the curator resolves the rule, fill in the expected status and reason for every case. Use synthetic profiles only.

| Test ID | Scenario | Expected status | Explanation / source |
|---|---|---|---|
| `UJ27-GOLD-001` | Every confirmed mandatory condition exactly at its threshold | Pending curator | Must not assume threshold inclusivity without approved rule semantics |
| `UJ27-GOLD-002` | APS one point below; all listed subjects meet thresholds | Pending curator | APS boundary |
| `UJ27-GOLD-003` | APS meets threshold; one mandatory subject one level below | Pending curator | Subject boundary |
| `UJ27-GOLD-004` | APS and subjects meet one complete OR branch only | Pending curator | Alternative-route semantics |
| `UJ27-GOLD-005` | APS meets one branch, but subject conditions are split across incompatible branches | Pending curator | Prevent invalid cross-branch combination |
| `UJ27-GOLD-006` | Required English mark/level missing | Pending curator | Missing mandatory input |
| `UJ27-GOLD-007` | Subject label is unsupported or ambiguous | Pending curator | Unknown must not become a rule key |
| `UJ27-GOLD-008` | Technical Mathematics submitted for a Faculty of Science degree | Pending curator | Scope of faculty exclusion |
| `UJ27-GOLD-009` | Mathematical Literacy submitted for BCom Information Systems | Pending curator | Explicit “Not accepted” note |
| `UJ27-GOLD-010` | APS cannot be calculated from the supported supplied subjects | Pending curator | Missing/incomplete evidence |
| `UJ27-GOLD-011` | A verified mandatory failure coexists with an unrelated unknown | Pending curator | Confirm precedence only if mandatory failure is independent of alternatives |
| `UJ27-GOLD-012` | Candidate meets the published minimums but additional selection criteria are not verified | Pending curator | Minimum eligibility must not be presented as guaranteed admission |

The eventual project-wide golden set must contain at least 20 synthetic cases with **zero false-positive `ELIGIBLE` outcomes** before eligibility-engine sign-off. This 12-row worksheet is only the programme-rule review subset and does not satisfy that full validation gate.

## 7. Curator approval register

The project owner explicitly approved all seven candidate records and the shared interpretation proposals on 2026-10-14 after reviewing this pack. This is a recorded product-owner/curator decision, not independent review or proof that every source ambiguity is resolved. Catalogue records remain bounded to the 2027 NSC pilot; unsupported applicant categories and material missing conditions must return `UNKNOWN`. The test-oracle column remains pending because no expected-outcome matrix or executable evaluator has yet been verified.

| Record | Curator decision | Curator initials/name | Date | Catalogue version | Test-oracle sign-off |
|---|---|---|---|---|---|
| R1 — B2I01Q | Approved as bounded NSC pilot draft; UNKNOWN safeguards apply | Project owner (explicit approval in conversation) | 2026-10-14 | `uj-2027-pilot-v0.1-draft` | Pending executable test-oracle verification |
| R2 — B2I02Q | Approved as bounded NSC pilot draft; UNKNOWN safeguards apply | Project owner (explicit approval in conversation) | 2026-10-14 | `uj-2027-pilot-v0.1-draft` | Pending executable test-oracle verification |
| R3 — B2I04Q | Approved as bounded NSC pilot draft; UNKNOWN safeguards apply | Project owner (explicit approval in conversation) | 2026-10-14 | `uj-2027-pilot-v0.1-draft` | Pending executable test-oracle verification |
| R4 — B2E02Q | Approved as bounded NSC pilot draft; UNKNOWN safeguards apply | Project owner (explicit approval in conversation) | 2026-10-14 | `uj-2027-pilot-v0.1-draft` | Pending executable test-oracle verification |
| R5 — B1CISQ | Approved as bounded NSC pilot draft; UNKNOWN safeguards apply | Project owner (explicit approval in conversation) | 2026-10-14 | `uj-2027-pilot-v0.1-draft` | Pending executable test-oracle verification |
| R6 — DI1401 | Approved as bounded NSC pilot draft; UNKNOWN safeguards apply | Project owner (explicit approval in conversation) | 2026-10-14 | `uj-2027-pilot-v0.1-draft` | Pending executable test-oracle verification |
| R7 — B34IMQ | Approved as bounded NSC pilot draft; UNKNOWN safeguards apply | Project owner (explicit approval in conversation) | 2026-10-14 | `uj-2027-pilot-v0.1-draft` | Pending executable test-oracle verification |

**GAP-001 exit criteria (all required):**

- [ ] At least 6–8 complete, distinct programme records, with the required fields and applicable 2027 evidence.
- [ ] All material conflicts, footnotes, Boolean route semantics, APS rules, exclusions, selection notes and applicant-category boundaries resolved or explicitly excluded with safe `UNKNOWN` behaviour.
- [ ] Source URL, source version/page, verification date and catalogue version recorded for each rule.
- [ ] Curator signs off each record and its boundary-test oracle.
- [ ] Deterministic tests implement the approved rules; the project-wide synthetic golden set contains at least 20 cases with zero false-positive `ELIGIBLE` results.
- [ ] Requirements matrix, catalogue register, project status and traceability references updated with evidence.

**Current disposition:** Curator approval is recorded for the seven bounded NSC pilot draft records and the shared interpretation proposals. GAP-001 remains **OPEN** because the record set still needs complete source/rule-field verification, approved test oracles, deterministic implementation, and a project-wide 20+ case golden set with zero false-positive `ELIGIBLE` results. Approval does not override the requirement to return `UNKNOWN` when a material rule or input is unresolved. `REQUIREMENTS READY` remains **NOT PASSED**.
