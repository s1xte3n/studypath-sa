# StudyPath SA — Canonical Subject Catalogue v1

**Status:** Proposed controlled-vocabulary baseline for owner/curator review; not yet approved for production eligibility decisions.  
**Version:** subject-catalogue-v1-draft  
**As-of date:** 2026-10-14  
**Requirements:** REQ-EXP-001, REQ-MAT-001; GAP-002

## 1. Safety invariants

This catalogue defines subject identity, not admission eligibility. Programme rules separately define thresholds, language interpretation, APS logic, alternatives and exceptions.

1. Mathematics, Mathematical Literacy and Technical Mathematics are distinct.
2. Physical Sciences and Technical Sciences are distinct.
3. English Home Language, English First Additional Language and English Second Additional Language are distinct.
4. No alias is approved in v1. Only exact canonical display labels resolve after approved whitespace/case cleanup.
5. Do not calculate APS until the applicable programme/cycle source defines the method and included/excluded subjects.
6. An unresolved identity or material rule yields UNKNOWN unless another independently verified mandatory rule establishes NOT_ELIGIBLE.

## 2. Canonical IDs

This is a bounded vocabulary for the current UJ pilot, not a national subject catalogue.

| Canonical ID | Display label | Identity policy |
|---|---|---|
| MATHEMATICS | Mathematics | Distinct from Mathematical Literacy and Technical Mathematics |
| MATHEMATICAL_LITERACY | Mathematical Literacy | Distinct from Mathematics and Technical Mathematics |
| TECHNICAL_MATHEMATICS | Technical Mathematics | Distinct from Mathematics and Mathematical Literacy |
| PHYSICAL_SCIENCES | Physical Sciences | Distinct from Technical Sciences |
| TECHNICAL_SCIENCES | Technical Sciences | Distinct from Physical Sciences |
| LIFE_SCIENCES | Life Sciences | No alias unless separately approved |
| LIFE_ORIENTATION | Life Orientation | APS inclusion/exclusion is programme-specific |
| ENGLISH_HOME_LANGUAGE | English — Home Language | Distinct language level |
| ENGLISH_FIRST_ADDITIONAL_LANGUAGE | English — First Additional Language | Distinct language level |
| ENGLISH_SECOND_ADDITIONAL_LANGUAGE | English — Second Additional Language | Distinct language level; not interchangeable with HL/FAL |
| UNRESOLVED_SUBJECT | Unrecognised or unsupported subject | UI sentinel only; never a programme rule key |

The DBE FET curriculum listing distinguishes English Home Languages and First Additional Language, and lists Mathematics, Mathematical Literacy, Technical Mathematics and Technical Sciences separately. This supports retaining distinct identities; it does not establish any UJ programme's acceptance or substitution rules. Sources: [DBE CAPS FET phase](https://www.education.gov.za/Curriculum/NCSGradesR12/CAPSFET/tabid/570/Default.aspx), [DBE NCS subject statements](https://www.education.gov.za/Curriculum/CurriculumStatements/FurtherEducationandTraining/NCSSubjectStatements.aspx).

## 3. Alias register

No aliases are approved in v1. Do not automatically map Maths, Math Lit, Tech Maths, Technical Science, English HL, English FAL, or language abbreviations. Add an alias only after its exact meaning, scope and evidence are reviewed and collision tests pass.

Any future alias record must include exact input string, normalized lookup key, target canonical ID, scope, reason, evidence URL, applicable cycle if scoped, approver role/date, effective dates, collision check, positive test and near-match negative test.

## 4. Normalization algorithm

1. Keep the original input label only in current page memory for learner-facing error recovery.
2. Trim leading/trailing whitespace and collapse repeated internal whitespace.
3. Use case-insensitive exact matching against canonical display labels only.
4. Resolve only when exactly one canonical label matches.
5. No match or multiple matches returns UNRESOLVED; never select the first result.
6. No fuzzy matching, spelling correction, semantic similarity, abbreviation expansion or AI-based identity resolution.
7. Reject duplicate learner entries that resolve to the same canonical ID.
8. A catalogue version mismatch invalidates the client-side mapping until the public dictionary is refreshed.

| Field | Contract |
|---|---|
| subjectId | Canonical ID or null |
| displayName | Canonical display label or null |
| normalizationStatus | CANONICAL or UNRESOLVED in v1 |
| catalogueVersion | Exact dictionary version |
| inputLabel | Page-memory-only original label; never send to API, URL, logs or telemetry |

## 5. Programme rule semantics

A programme table column labelled only “English” must be recorded as ENGLISH_REQUIREMENT_UNRESOLVED until the applicable UJ source or official clarification establishes whether it accepts Home Language, First Additional Language, both, or another defined rule. Do not silently attach it to one canonical language ID.

A table listing separate Mathematics and Technical Mathematics columns is not automatically an OR expression. The source layout and footnotes must establish whether the entries are alternatives or separate requirements. An explicit “not accepted” note is a negative rule, not a synonym mapping.

## 6. Planned tests

| Test ID | Case | Expected |
|---|---|---|
| T-SUB-001 | Exact canonical label with whitespace cleanup | One canonical ID |
| T-SUB-002 | Case variation of exact canonical label | Same ID |
| T-SUB-003 | Alias not present in approved register | UNRESOLVED |
| T-SUB-004 | Mathematics vs Mathematical Literacy vs Technical Mathematics | Three different IDs |
| T-SUB-005 | Physical Sciences vs Technical Sciences | Two different IDs |
| T-SUB-006 | English HL vs English FAL | Different IDs; no cross-mapping |
| T-SUB-007 | Duplicate entries resolve to same canonical ID | Reject duplicate |
| T-SUB-008 | Ambiguous dictionary collision | UNRESOLVED and catalogue defect |
| T-SUB-009 | Unsupported subject affects a programme requirement | UNKNOWN unless another verified mandatory failure settles it |
| T-SUB-010 | Stale dictionary version | Refresh/recoverable unknown; never trust stale mapping |
| T-SUB-011 | Raw learner label inspected in requests/URLs/logs/telemetry | No raw label leaves page memory |
| T-SUB-012 | Rule uses unresolved English level or unsupported substitution | Affected eligibility UNKNOWN |

These are test specifications, not evidence of executed tests.

## 7. Approval and change control

GAP-002 closes only after the owner/curator approves this bounded scope, exact-label-only/no-alias policy, English-level representation, versioning/stale-client behaviour, and test contract. Any alias or canonical ID change requires a version update and regression tests.

**Current gate state: OPEN — proposed catalogue documented; owner/curator approval and executed tests remain outstanding.**
