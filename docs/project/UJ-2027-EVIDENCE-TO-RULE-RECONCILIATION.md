# UJ 2027 catalogue — evidence-to-rule reconciliation

**Date:** 2026-10-24  
**Catalogue version:** `uj-2027-pilot-v0.3-hackathon-demo`  
**Scope:** All 30 catalogue records for the FNB AOTY Hackathon 2026 demonstration.  
**Purpose:** Reconcile what the repository currently records against deterministic eligibility rules and make remaining evidence gaps actionable. This is an implementation/evidence audit, **not** institutional approval or a claim that all original PDF rows were independently verified.

## Executive disposition

- **30/30 records** are approved by the StudyPath SA project owner for bounded hackathon-demo display.
- **0/30 records** have institutional curator sign-off recorded.
- The retained source register contains two sources: the UJ 2027 Undergraduate Prospectus and the UJ College of Business and Economics (CBE) 2027 Intake Brochure.
- The catalogue stores a source/page locator and candidate rule values for each programme. The source audit explicitly says that applicable footnotes, visual confirmation of every row, final source-version confirmation and curator review remain incomplete.
- Therefore, **no record is certified here as fully verified for definitive eligibility screening**. “Approved for demo” is a scope/usage decision, not evidence validation.
- No threshold was silently changed in this reconciliation. The values below are copied from the catalogue currently on the PR branch and marked as transcriptions pending independent source-row/footnote confirmation.

## Shared rule reconciliation

| Rule area | Evidence currently retained | Disposition | Required implementation behaviour / closure action |
|---|---|---|---|
| Governing source/version | Prospectus URL and CBE brochure URL, each with verification date 2026-10-14; prospectus SHA-256 recorded in catalogue metadata | **PARTIAL** — version and completeness review remain open | Re-download/compare candidate PDFs; verify hashes and current official versions; visually inspect each referenced row and all footnotes; record exact source version and verifier. |
| APS conversion | Prospectus printed p. 16; catalogue has seven percentage bands: 0–29→1, 30–39→2, 40–49→3, 50–59→4, 60–69→5, 70–79→6, 80–100→7 | **TRANSCRIBED; source/version review open** | Keep deterministic boundary tests for 29/30, 39/40, 49/50, 59/60, 69/70, 79/80 and invalid marks. |
| APS subject count | Prospectus printed p. 16 says six school subjects, excluding Life Orientation | **PARTIAL** | Exactly six distinct supported non-LO subjects may produce a labelled provisional total; fewer/more than six, duplicates, missing marks or unsupported subjects must not fabricate a total. |
| Selection among >6 subjects | Catalogue states unresolved from retained sources | **UNRESOLVED** | Do not select the “best six” or auto-include required programme subjects until the official rule is confirmed and curator-approved. |
| English subject mapping | Programme rows contain English level/percentage but `mappingStatus: UNRESOLVED`; home-language versus first-additional-language mapping remains open | **UNRESOLVED across affected records** | Do not infer which learner English stream satisfies the column. Return UNKNOWN when the learner’s English result cannot be mapped under a verified rule. |
| Subject alternatives / AND-OR semantics | Several records use route branches or special mandatory values; notes identify ambiguous table headings | **PARTIAL / programme-specific** | Encode an OR route only where the source clearly establishes it. Keep ambiguous branches unresolved and return UNKNOWN if they affect the result. |
| Technical Mathematics / Technical Sciences | Science faculty restriction is recorded as a draft interpretation; other programme rows have explicit acceptance flags or unresolved alternatives | **PARTIAL** | Apply explicit per-programme rules only after row/footnote confirmation. Do not generalise a faculty restriction beyond the confirmed scope. |
| Other selection conditions | Many records say complete conditions, exceptions and final selection conditions need review | **UNRESOLVED** | Capture every applicable condition/footnote before claiming a complete match. Minimum thresholds do not guarantee admission or a place. |
| Institutional approval | All records have demo approval; curator sign-off is null or absent | **NOT APPROVED FOR DEFINITIVE SCREENING** | Do not create curator sign-off fields or imply UJ endorsement. Obtain institutional/authorised curator review separately. |

## Programme-by-programme reconciliation

The catalogue values below are **recorded transcriptions**, not newly verified official facts. The source locations are copied as recorded; “printed p. brochure row” and other incomplete locators must be resolved before release beyond the bounded demo.

### 01. UJ-2027-BSC-IT — BSc in Information Technology

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 86
- **Rule transcription in catalogue:** APS minimum: **30** (transcribed; source-row/footnote recheck pending). English: level 5 / 60%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 6 / 70% mandatory=true; TECHNICAL_MATHEMATICS acceptedAsMathematics=false; TECHNICAL_SCIENCES accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English stream mapping complete conditions/selection exceptions
- **Curator sign-off:** Explicitly null. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 02. UJ-2027-BSC-CSI — BSc in Computer Science and Informatics

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 86
- **Rule transcription in catalogue:** APS minimum: **30** (transcribed; source-row/footnote recheck pending). English: level 5 / 60%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 6 / 70% mandatory=true; TECHNICAL_MATHEMATICS acceptedAsMathematics=false; TECHNICAL_SCIENCES accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English stream mapping complete conditions/selection exceptions
- **Curator sign-off:** Explicitly null. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 03. UJ-2027-BSC-CSI-EXT — BSc in Computer Science and Informatics Extended

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 91
- **Rule transcription in catalogue:** APS minimum: **26** (transcribed; source-row/footnote recheck pending). English: level 4 / 50%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 5 / 60% mandatory=true; TECHNICAL_MATHEMATICS acceptedAsMathematics=false; TECHNICAL_SCIENCES accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English stream mapping complete conditions/selection exceptions exact scope of Science faculty restriction
- **Curator sign-off:** Explicitly null. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 04. UJ-2027-BSC-CSI-AI — BSc in Computer Science and Informatics Specialising in AI (Artificial Intelligence)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 86
- **Rule transcription in catalogue:** APS minimum: **34** (transcribed; source-row/footnote recheck pending). English: level 5 / 60%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 7 / 80% mandatory=true; TECHNICAL_MATHEMATICS acceptedAsMathematics=false; TECHNICAL_SCIENCES accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English stream mapping complete conditions/selection exceptions exact scope of Science faculty restriction
- **Curator sign-off:** Explicitly null. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 05. UJ-2027-BCOM-IS — BCom in Information Systems

- **Recorded source evidence:** SRC-UJ-CBE-2027, printed p. 10
- **Rule transcription in catalogue:** APS minimum: **26** (transcribed; source-row/footnote recheck pending). English: level 4 / 50%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 4 / 50% mandatory=UNRESOLVED_ALTERNATIVE_SEMANTICS; TECHNICAL_MATHEMATICS level 4 / 50% mandatory=UNRESOLVED_ALTERNATIVE_SEMANTICS; MATHEMATICAL_LITERACY accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English stream mapping full conditions/selection exceptions Whether Mathematics and Technical Mathematics are alternatives or both independently required is not explicit in the extracted table; do not encode an OR branch until the original table/official rule confirms it.
- **Curator sign-off:** Explicitly null. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 06. UJ-2027-DIP-BIT — Diploma in Business Information Technology

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 44; SRC-UJ-CBE-2027, printed p. 12
- **Rule transcription in catalogue:** APS/subject routes: MATHEMATICS_ROUTE (APS 22; MATHEMATICS level 3, TECHNICAL_MATHEMATICS level 3); MATHEMATICAL_LITERACY_ROUTE (APS 24; MATHEMATICAL_LITERACY level 6). Route AND/OR semantics must be confirmed wherever unresolved notes flag ambiguity. English: level 4 / 50%; mapping status **UNRESOLVED**.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English stream mapping exact AND/OR branch interpretation complete conditions/selection exceptions
- **Curator sign-off:** Explicitly null. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 07. UJ-2027-BCOM-IM — BCom in Information Management

- **Recorded source evidence:** SRC-UJ-CBE-2027, printed p. 10
- **Rule transcription in catalogue:** APS/subject routes: MATHEMATICS_ROUTE (APS 26; MATHEMATICS level 4, TECHNICAL_MATHEMATICS level 4); MATHEMATICAL_LITERACY_ROUTE (APS 28; MATHEMATICAL_LITERACY level 6). Route AND/OR semantics must be confirmed wherever unresolved notes flag ambiguity. English: level 4 / 50%; mapping status **UNRESOLVED**.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English stream mapping conflicting level of specificity between current page and 2027 CBE brochure complete conditions/selection exceptions
- **Curator sign-off:** Explicitly null. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 08. UJ-2027-FADA-BARCH — B Arch (Architecture)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 32
- **Rule transcription in catalogue:** APS minimum: **30** (transcribed; source-row/footnote recheck pending). English: level 5 / 60%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 5 mandatory=true; MATHEMATICAL_LITERACY accepted=false; TECHNICAL_MATHEMATICS accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 09. UJ-2027-FADA-BA-COMDES — BA (Communication Design)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 32
- **Rule transcription in catalogue:** APS/subject routes: MATHEMATICS_ROUTE (APS 25; MATHEMATICS level 3 mandatory=true); MATHEMATICAL_LITERACY_ROUTE (APS 26; MATHEMATICAL_LITERACY level 4 mandatory=true). Route AND/OR semantics must be confirmed wherever unresolved notes flag ambiguity. English: level 5 / 60%; mapping status **UNRESOLVED**. Other subject rules: TECHNICAL_MATHEMATICS accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 10. UJ-2027-FADA-BA-DIGMEDIA — BA (Digital Media Design)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 32
- **Rule transcription in catalogue:** APS/subject routes: MATHEMATICS_ROUTE (APS 25; MATHEMATICS level 3 mandatory=true); MATHEMATICAL_LITERACY_ROUTE (APS 26; MATHEMATICAL_LITERACY level 4 mandatory=true). Route AND/OR semantics must be confirmed wherever unresolved notes flag ambiguity. English: level 5 / 60%; mapping status **UNRESOLVED**. Other subject rules: TECHNICAL_MATHEMATICS accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 11. UJ-2027-FADA-BA-INDDES — BA (Industrial Design)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 32
- **Rule transcription in catalogue:** APS/subject routes: MATHEMATICS_ROUTE (APS 25; MATHEMATICS level 4 mandatory=true); MATHEMATICAL_LITERACY_ROUTE (APS 26; MATHEMATICAL_LITERACY level 5 mandatory=true). Route AND/OR semantics must be confirmed wherever unresolved notes flag ambiguity. English: level 5 / 60%; mapping status **UNRESOLVED**. Other subject rules: TECHNICAL_MATHEMATICS accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 12. UJ-2027-FADA-BA-FASHION — BA (Fashion Design)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 33
- **Rule transcription in catalogue:** APS/subject routes: MATHEMATICS_ROUTE (APS 25; MATHEMATICS level 4 mandatory=true); MATHEMATICAL_LITERACY_ROUTE (APS 26; MATHEMATICAL_LITERACY level 5 mandatory=true). Route AND/OR semantics must be confirmed wherever unresolved notes flag ambiguity. English: level 5 / 60%; mapping status **UNRESOLVED**. Other subject rules: TECHNICAL_MATHEMATICS accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 13. UJ-2027-FADA-BA-VISART — BA (Visual Art)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 33
- **Rule transcription in catalogue:** APS/subject routes: MATHEMATICS_OR_TECH_MATHS_ROUTE (APS 25; MATHEMATICS level 3 mandatory=false); MATHEMATICAL_LITERACY_ROUTE (APS 26; MATHEMATICAL_LITERACY level 4 mandatory=true). Route AND/OR semantics must be confirmed wherever unresolved notes flag ambiguity. English: level 3 / 40%; mapping status **UNRESOLVED**. Other subject rules: TECHNICAL_MATHEMATICS level 3 mandatory=UNRESOLVED_ROUTE_SEMANTICS.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required. International-admission exception for Maths/Maths Literacy is specific to this programme and is not encoded as a general rule.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 14. UJ-2027-FADA-DIP-ARCH — Diploma in Architecture

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 34
- **Rule transcription in catalogue:** APS/subject routes: MATHEMATICS_ROUTE (APS 25; MATHEMATICS level 5 mandatory=true); TECHNICAL_MATHEMATICS_ROUTE (APS 26; TECHNICAL_MATHEMATICS level 4 mandatory=true). Route AND/OR semantics must be confirmed wherever unresolved notes flag ambiguity. English: level 5 / 60%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICAL_LITERACY accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 15. UJ-2027-FEBE-BENG-CIVIL — Civil Engineering (BEng)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 60
- **Rule transcription in catalogue:** APS minimum: **32** (transcribed; source-row/footnote recheck pending). English: level 5 / 60%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 5 mandatory=true; PHYSICAL_SCIENCES level 5 mandatory=true; TECHNICAL_MATHEMATICS accepted=false; TECHNICAL_SCIENCES accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 16. UJ-2027-FEBE-BENG-ELECTRICAL — Electrical and Electronic Engineering (BEng)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 60
- **Rule transcription in catalogue:** APS minimum: **32** (transcribed; source-row/footnote recheck pending). English: level 5 / 60%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 5 mandatory=true; PHYSICAL_SCIENCES level 5 mandatory=true; TECHNICAL_MATHEMATICS accepted=false; TECHNICAL_SCIENCES accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 17. UJ-2027-FEBE-BENG-MECHANICAL — Mechanical Engineering (BEng)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 60
- **Rule transcription in catalogue:** APS minimum: **32** (transcribed; source-row/footnote recheck pending). English: level 5 / 60%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 5 mandatory=true; PHYSICAL_SCIENCES level 5 mandatory=true; TECHNICAL_MATHEMATICS accepted=false; TECHNICAL_SCIENCES accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 18. UJ-2027-FEBE-BENGTECH-CHEM — Chemical Engineering (BEngTech)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 60
- **Rule transcription in catalogue:** APS minimum: **30** (transcribed; source-row/footnote recheck pending). English: level 4 / 50%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 5 mandatory=MATHEMATICS_OR_TECHNICAL_MATHEMATICS; TECHNICAL_MATHEMATICS level 5 mandatory=MATHEMATICS_OR_TECHNICAL_MATHEMATICS; PHYSICAL_SCIENCES level 5 mandatory=true; TECHNICAL_SCIENCES accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required. The printed table labels the column Mathematics / Technical Mathematics; route semantics require curator review.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 19. UJ-2027-FEBE-BENGTECH-CIVIL — Civil Engineering (BEngTech)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 60
- **Rule transcription in catalogue:** APS minimum: **28** (transcribed; source-row/footnote recheck pending). English: level 4 / 50%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 5 mandatory=MATHEMATICS_OR_TECHNICAL_MATHEMATICS; TECHNICAL_MATHEMATICS level 5 mandatory=MATHEMATICS_OR_TECHNICAL_MATHEMATICS; PHYSICAL_SCIENCES level 5 mandatory=PHYSICAL_OR_TECHNICAL_SCIENCE; TECHNICAL_SCIENCES level 5 mandatory=PHYSICAL_OR_TECHNICAL_SCIENCE.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required. Subject alternatives are transcribed from table headings and require curator confirmation.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 20. UJ-2027-FEBE-BENGTECH-MINING — Mining Engineering (BEngTech)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 60
- **Rule transcription in catalogue:** APS minimum: **23** (transcribed; source-row/footnote recheck pending). English: level 4 / 50%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 5 mandatory=MATHEMATICS_OR_TECHNICAL_MATHEMATICS; TECHNICAL_MATHEMATICS level 5 mandatory=MATHEMATICS_OR_TECHNICAL_MATHEMATICS; PHYSICAL_SCIENCES level 5 mandatory=PHYSICAL_OR_TECHNICAL_SCIENCE; TECHNICAL_SCIENCES level 5 mandatory=PHYSICAL_OR_TECHNICAL_SCIENCE.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required. Subject alternatives are transcribed from table headings and require curator confirmation.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 21. UJ-2027-FEBE-MINE-SURVEY — Mine Surveying

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 61
- **Rule transcription in catalogue:** APS minimum: **23** (transcribed; source-row/footnote recheck pending). English: level 4 / 50%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 5 mandatory=MATHEMATICS_OR_TECHNICAL_MATHEMATICS; TECHNICAL_MATHEMATICS level 5 mandatory=MATHEMATICS_OR_TECHNICAL_MATHEMATICS; PHYSICAL_SCIENCES level 5 mandatory=PHYSICAL_OR_TECHNICAL_SCIENCE; TECHNICAL_SCIENCES level 5 mandatory=PHYSICAL_OR_TECHNICAL_SCIENCE.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required. Subject alternatives are transcribed from table headings and require curator confirmation.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 22. UJ-2027-FEBE-BSC-CONSTRUCTION — Construction (BSc)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 61
- **Rule transcription in catalogue:** APS minimum: **30** (transcribed; source-row/footnote recheck pending). English: level 4 / 50%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 5 mandatory=MATHEMATICS_OR_TECHNICAL_MATHEMATICS; TECHNICAL_MATHEMATICS level 5 mandatory=MATHEMATICS_OR_TECHNICAL_MATHEMATICS; PHYSICAL_SCIENCES level 5 mandatory=PHYSICAL_OR_TECHNICAL_SCIENCE; TECHNICAL_SCIENCES level 5 mandatory=PHYSICAL_OR_TECHNICAL_SCIENCE.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required. Subject alternatives are transcribed from table headings and require curator confirmation.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 23. UJ-2027-FEBE-URBAN-PLANNING — Urban and Regional Planning

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 61
- **Rule transcription in catalogue:** APS minimum: **27** (transcribed; source-row/footnote recheck pending). English: level 4 / 50%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 5 mandatory=true; GEOGRAPHY level 5 mandatory=true; TECHNICAL_MATHEMATICS mandatory=UNRESOLVED_FROM_TABLE.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required. Table presents a Mathematics / Technical Mathematics column; whether Technical Mathematics satisfies this programme is unresolved.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 24. UJ-2027-FEBE-DIP-MGMT-SERVICES — Management Services (Diploma)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 62
- **Rule transcription in catalogue:** APS/subject routes: MATHEMATICS_ROUTE (APS 19; MATHEMATICS level 3 mandatory=true); MATHEMATICAL_LITERACY_ROUTE (APS 21; MATHEMATICAL_LITERACY level 5 mandatory=true). Route AND/OR semantics must be confirmed wherever unresolved notes flag ambiguity. English: level 4 / 50%; mapping status **UNRESOLVED**.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 25. UJ-2027-FEBE-DIP-OPS-MGMT — Operations Management (Diploma)

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 62
- **Rule transcription in catalogue:** APS/subject routes: MATHEMATICS_ROUTE (APS 20; MATHEMATICS level 3 mandatory=true); MATHEMATICAL_LITERACY_ROUTE (APS 22; MATHEMATICAL_LITERACY level 5 mandatory=true). Route AND/OR semantics must be confirmed wherever unresolved notes flag ambiguity. English: level 4 / 50%; mapping status **UNRESOLVED**.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 26. UJ-2027-CBE-BCOM-ACCOUNTING — BCom Accounting

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 41; SRC-UJ-CBE-2027, printed p. brochure row; printed page to verify
- **Rule transcription in catalogue:** APS minimum: **28** (transcribed; source-row/footnote recheck pending). English: level 4 / 50%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 4 mandatory=true; MATHEMATICAL_LITERACY accepted=false; TECHNICAL_MATHEMATICS accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required. CBE brochure printed page needs confirmation from the original brochure.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 27. UJ-2027-CBE-BCOM-BUSMGMT — BCom Business Management

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 41
- **Rule transcription in catalogue:** APS minimum: **26** (transcribed; source-row/footnote recheck pending). English: level 4 / 50%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 4 mandatory=true; MATHEMATICAL_LITERACY accepted=false; TECHNICAL_MATHEMATICS level 4 mandatory=true.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 28. UJ-2027-CBE-BCOM-FINANCE — BCom Finance

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 41
- **Rule transcription in catalogue:** APS minimum: **28** (transcribed; source-row/footnote recheck pending). English: level 4 / 50%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 4 mandatory=true; MATHEMATICAL_LITERACY accepted=false; TECHNICAL_MATHEMATICS accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 29. UJ-2027-CBE-BCOM-MARKETING — BCom Marketing Management

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 42
- **Rule transcription in catalogue:** APS minimum: **26** (transcribed; source-row/footnote recheck pending). English: level 4 / 50%; mapping status **UNRESOLVED**. Other subject rules: MATHEMATICS level 4 mandatory=true; MATHEMATICAL_LITERACY accepted=false; TECHNICAL_MATHEMATICS accepted=false.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.

### 30. UJ-2027-CBE-BSC-HOSPITALITY — BCom Hospitality Management

- **Recorded source evidence:** SRC-UJ-2027-PROS, printed p. 40
- **Rule transcription in catalogue:** APS/subject routes: MATHEMATICS_OR_TECH_MATHS_ROUTE (APS 26; MATHEMATICS level 4 mandatory=false, TECHNICAL_MATHEMATICS level 4 mandatory=false); MATHEMATICAL_LITERACY_ROUTE (APS 28; MATHEMATICAL_LITERACY level 5 mandatory=true). Route AND/OR semantics must be confirmed wherever unresolved notes flag ambiguity. English: level 5 / 60%; mapping status **UNRESOLVED**.
- **Rule-evidence status:** `TRANSCRIBED_NOT_INDEPENDENTLY_REVERIFIED`. The repository records a source/page locator, but this reconciliation has not visually rechecked the original PDF row and all applicable footnotes.
- **Known programme-specific gaps:** English subject-stream mapping is unresolved; do not infer Home Language versus First Additional Language. Draft transcription from retained 2027 prospectus; curator verification required.
- **Curator sign-off:** Not present. Demo approval is project-owner approval only.
- **Eligibility consequence:** Use only the explicit rules above as candidate demo rules. Return `UNKNOWN` whenever an unresolved condition could change the result; a verified mandatory failure may support `NOT_ELIGIBLE` only if the evaluator can establish that failure without relying on unresolved rules. Do not claim admission eligibility or guarantee selection.


## Closure checklist (must be evidenced)

- [ ] Retrieve and pin the exact official prospectus and CBE brochure versions; record retrieval date, SHA-256, page count, and version identity.
- [ ] Visually inspect all 30 programme rows and every applicable footnote; reconcile PDF text extraction with the visual table.
- [ ] Resolve the English column's accepted NSC language stream(s) from an authoritative rule.
- [ ] Confirm six-subject APS selection semantics, including applicants with more than six eligible subjects and programme-required subjects.
- [ ] Resolve every route's AND/OR semantics and technical-subject acceptance from the original table.
- [ ] Capture all other requirements, exceptions, portfolio/audition/selection conditions where applicable, and the distinction between minimum eligibility and selection.
- [ ] Add source URL, exact printed page/table/footnote, verification date, catalogue version and reviewer to each rule record.
- [ ] Obtain authorised curator sign-off; do not substitute project-owner demo approval.
- [ ] Add/update golden tests for every verified rule, each boundary, missing/ambiguous inputs, and each route branch.
- [ ] Re-run catalogue schema, unit, contract, and golden-case CI; record actual run links and results.

## Traceability and safety rule

For each rule: **programme ID → source ID + exact row/page/footnote → normalized catalogue field → deterministic evaluator branch → golden test ID → CI run**. Until the chain is complete, mark the rule as unresolved and ensure it cannot produce a confident eligibility outcome when it could change the result.

**Status:** Evidence-to-rule reconciliation is documented for all 30 records from the currently retained catalogue metadata. Official-source re-verification and curator closure remain outstanding; this document does not claim those activities were completed.
