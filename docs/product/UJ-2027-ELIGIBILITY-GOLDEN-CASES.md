# UJ 2027 Eligibility Golden-Case Oracle (Draft)

**Status:** Draft test oracle; not executable and not approval to publish the catalogue.  
**Scope:** UJ 2027 NSC pilot only. International, NC(V), transfer, mature-age and other admission routes are out of scope.  
**Catalogue version target:** `uj-2027-pilot-v0.1-draft`  
**Related:** REQ-CAT-001, REQ-MAT-001, GAP-001, `UJ-2027-SOURCE-RECONCILIATION-MATRIX.md`, `UJ-2027-CURATOR-REVIEW-PACK.md`.  
**Important:** A case marked `ELIGIBLE` is conditional on the named programme record being fully reconciled, current, and curator-approved. Current candidate records remain unapproved. No case below is evidence that an implementation test has run.

## State semantics

- `ELIGIBLE`: every applicable mandatory rule is source-backed, cycle-correct, current, curator-approved, and satisfied by valid learner inputs. This means minimum published requirements appear satisfied; it does not mean UJ will offer admission.
- `NOT_ELIGIBLE`: at least one independently verified, applicable mandatory requirement is definitively failed.
- `UNKNOWN`: no verified mandatory failure settles the result, and material input, rule, source, cycle, mapping, or approval evidence is missing or ambiguous.
- A verified mandatory failure may yield `NOT_ELIGIBLE` even if another unrelated field is unknown, but the failed requirement and source must be shown. Do not turn a missing mark into zero.
- A ranking score must never override this state.

## Source-backed pilot rule leads

These are source leads, not approved machine rules. The cycle-specific source is the UJ 2027 Undergraduate Prospectus and, for CBE programmes, the 2027 CBE Undergraduate Intake Brochure. UJ says prospectus content may change.

| Candidate ID | Programme / code | Visible 2027 minimum lead | Official evidence | Open before definitive screening |
|---|---|---|---|---|
| UJ-2027-BSC-IT | BSc in Information Technology / B2I01Q | APS 30; English level 5 (60%+); Mathematics level 6 (70%+); APK; 3 years | [2027 prospectus](https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf), printed p. 86; [programme page](https://www.uj.ac.za/university-courses/bsc-in-information-technology/) | Full applicable conditions, source version confirmation, curator sign-off |
| UJ-2027-BSC-CSI | BSc in Computer Science and Informatics / B2I02Q | APS 30; English 5; Mathematics 6; APK; 3 years | [2027 prospectus](https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf), printed p. 86; [programme page](https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics) | Full applicable conditions, source version confirmation, curator sign-off |
| UJ-2027-BSC-CSI-EXT | BSc in Computer Science and Informatics Extended / B2E02Q | APS 26; English 4 (50%+); Mathematics 5 (60%+); APK; 4 years | [2027 prospectus](https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf), printed p. 91; [programme page](https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics-extended/) | Confirm full conditions and the exact scope of the Science faculty subject restriction; curator sign-off |
| UJ-2027-BSC-CSI-AI | BSc in Computer Science and Informatics Specialising in AI / B2I04Q | APS 34; English 5; Mathematics 7 (80%+); APK; 3 years | [2027 prospectus](https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf), printed p. 86; [programme page](https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics-specialising-in-ai-artificial-intelligence/) | Full applicable conditions and curator sign-off |
| UJ-2027-BCOM-IS | BCom in Information Systems / B1CISQ | APS 26; English 4; Mathematics or Technical Mathematics 4; Mathematical Literacy not accepted; APB; 3 years | [2027 CBE brochure](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf), printed p. 10; [programme page](https://www.uj.ac.za/university-courses/bcom-in-information-systems/) | Full applicable conditions and curator sign-off |
| UJ-2027-DIP-BIT | Diploma in Business Information Technology / DI1401 | APS 22 with Mathematics/Technical Mathematics OR 24 with Mathematical Literacy; English 4; Mathematics/Technical Mathematics 3 OR Mathematical Literacy 6; APB; 3 years | [2027 prospectus](https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf), printed p. 44; [2027 CBE brochure](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf), printed p. 12; [programme page](https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/) | Confirm full conditions and precise alternative-branch semantics; curator sign-off |
| UJ-2027-BCOM-IM | BCom in Information Management / B34IMQ | APS 26 with Mathematics/Technical Mathematics OR 28 with Mathematical Literacy; English 4; corresponding subject level 4/6; APK; 3 years | [2027 CBE brochure](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf), printed p. 10; [programme page](https://www.uj.ac.za/university-courses/bcom-in-information-management/) | Resolve difference in specificity on current programme page; confirm full conditions and curator sign-off |

### Shared source rules currently visible

- The UJ 2027 prospectus says APS is the sum of six school-subject achievement ratings and Life Orientation is excluded (printed p. 16).
- The prospectus maps NSC percentage bands to achievement levels: 0–29% = 1; 30–39% = 2; 40–49% = 3; 50–59% = 4; 60–69% = 5; 70–79% = 6; 80–100% = 7.
- The prospectus includes a note that Technical Mathematics and Technical Science are not accepted for Faculty of Science degree programmes (printed pp. 86 and 91). The precise application of this note must be encoded only after its full scope is confirmed.
- These rules do not settle every subject-selection, English-stream, missing-subject, or special-condition question. Do not silently infer those rules.
- Current UJ programme pages display a 2026 application window. They corroborate programme identity/minimums but are not, by themselves, complete evidence for every 2027 condition.
- Sources: [UJ 2027 Undergraduate Prospectus](https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf), [UJ 2027 CBE brochure](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf), [UJ undergraduate admissions](https://www.uj.ac.za/admission-aid/undergraduate/).

## Golden cases

The test harness must eventually assert **both state and exact reason code(s)**. Invalid marks and duplicate canonical subjects are input-validation rejections (`INPUT_REJECTED`), not eligibility `UNKNOWN` outcomes; no recommendation should be produced for those inputs. The following are normative expectations for a future evaluator contract, conditional on the stated record preconditions. Synthetic data only.

| Test ID | Scenario | Record/input precondition | Expected state | Required reason code(s) |
|---|---|---|---|---|
| UJ-GOLD-001 | All mandatory rules met exactly at every threshold | Complete, current, signed-off BSc IT record; six valid APS subjects; APS 30; English 5; Mathematics 6 | ELIGIBLE | `ALL_VERIFIED_REQUIREMENTS_MET` |
| UJ-GOLD-002 | APS one point below minimum | Same record; APS 29; other rules met | NOT_ELIGIBLE | `APS_BELOW_MINIMUM` |
| UJ-GOLD-003 | APS exactly at minimum | Same record; APS 30; subject rules met | ELIGIBLE | `ALL_VERIFIED_REQUIREMENTS_MET` |
| UJ-GOLD-004 | English level one below minimum | Same record; APS 35; English 4; Mathematics 7 | NOT_ELIGIBLE | `ENGLISH_BELOW_MINIMUM` |
| UJ-GOLD-005 | Mathematics level one below minimum | Same record; APS 35; English 6; Mathematics 5 | NOT_ELIGIBLE | `MATHEMATICS_BELOW_MINIMUM` |
| UJ-GOLD-006 | Missing English result | Signed-off record; APS and Mathematics meet thresholds; English absent | UNKNOWN | `REQUIRED_INPUT_MISSING` |
| UJ-GOLD-007 | Unsupported English-stream mapping | English is entered but its stream cannot be mapped under the approved input contract | UNKNOWN | `SUBJECT_MAPPING_UNRESOLVED` |
| UJ-GOLD-008 | Candidate programme record not curator-approved | Learner appears to meet visible BSc IT minimums; record status remains DRAFT | UNKNOWN | `CATALOGUE_RECORD_NOT_APPROVED` |
| UJ-GOLD-009 | Admission-cycle mismatch | Learner meets a record whose applicable cycle is not established as 2027 | UNKNOWN | `ADMISSION_CYCLE_UNVERIFIED` |
| UJ-GOLD-010 | Material source conflict could change result | Two official-source interpretations disagree on a mandatory rule and no precedence decision exists | UNKNOWN | `MATERIAL_SOURCE_CONFLICT` |
| UJ-GOLD-011 | Stale/unavailable material source | Record freshness is outside approved policy or the source cannot be reverified | UNKNOWN | `SOURCE_NOT_CURRENTLY_VERIFIED` |
| UJ-GOLD-012 | Diploma BIT Mathematics route exactly meets minimum | Signed-off record; APS 22; English 4; Mathematics 3; valid six-subject APS | ELIGIBLE | `ALL_VERIFIED_REQUIREMENTS_MET` |
| UJ-GOLD-013 | Diploma BIT Mathematics route APS below minimum | Signed-off record; APS 21; Mathematics 3; English 4 | NOT_ELIGIBLE | `APS_BELOW_MINIMUM` |
| UJ-GOLD-014 | Diploma BIT Mathematical Literacy route exactly meets minimum | Signed-off record; APS 24; English 4; Mathematical Literacy 6; no conflicting branch | ELIGIBLE | `ALL_VERIFIED_REQUIREMENTS_MET` |
| UJ-GOLD-015 | Diploma BIT Mathematical Literacy route below subject minimum | Signed-off record; APS 30; English 5; Mathematical Literacy 5 | NOT_ELIGIBLE | `MATHEMATICAL_LITERACY_BELOW_MINIMUM` |
| UJ-GOLD-016 | Diploma BIT branch is ambiguous | Rule data does not identify whether the learner satisfies the Mathematics or Mathematical Literacy branch | UNKNOWN | `ALTERNATIVE_RULE_UNRESOLVED` |
| UJ-GOLD-017 | Mathematical Literacy offered for BCom Information Systems | Signed-off BCom IS record; Mathematical Literacy is the only mathematics-like subject supplied; no accepted Mathematics/Technical Mathematics result | NOT_ELIGIBLE | `MATHEMATICAL_LITERACY_NOT_ACCEPTED` |
| UJ-GOLD-018 | Science-degree subject restriction applies | Signed-off Science degree record; a required Mathematics result is absent and only a subject explicitly excluded by the verified rule is supplied | NOT_ELIGIBLE | `REQUIRED_SUBJECT_NOT_ACCEPTED` |
| UJ-GOLD-019 | Life Orientation incorrectly inflates APS | The six eligible school subjects produce APS 29; adding Life Orientation would falsely raise it to 30 | NOT_ELIGIBLE | `APS_BELOW_MINIMUM` |
| UJ-GOLD-020 | More than six school subjects with a resolvable required-subject-constrained selection | Signed-off BSc IT record; learner has seven valid subjects including required English and Mathematics; the six best eligible subjects including required programme subjects sum to APS 30; English 5 and Mathematics 6 | ELIGIBLE | `ALL_VERIFIED_REQUIREMENTS_MET` |
| UJ-GOLD-021 | Duplicate canonical subject | Two entries resolve to the same canonical subject and would otherwise be double-counted | INPUT_REJECTED | `DUPLICATE_SUBJECT_INPUT` |
| UJ-GOLD-022 | Invalid mark | A mark is decimal, malformed, below 0 or above 100 | INPUT_REJECTED | `INVALID_MARK_INPUT` |
| UJ-GOLD-023 | Same normalized inputs, rules and catalogue version evaluated twice | Deterministic evaluator available; evaluate the identical fixture twice | SAME_AS_FIRST_EVALUATION | `DETERMINISTIC_RESULT` (test assertion, not learner-facing reason) |
| UJ-GOLD-024 | High APS cannot compensate for failed mandatory subject | Signed-off record; APS 40 but Mathematics is below the mandatory threshold | NOT_ELIGIBLE | `MATHEMATICS_BELOW_MINIMUM` |
| UJ-GOLD-025 | One verified mandatory failure plus another unknown input | Signed-off record; Mathematics definitely below threshold; another unrelated optional/context field missing | NOT_ELIGIBLE | `MATHEMATICS_BELOW_MINIMUM` |
| UJ-GOLD-026 | No verified failure, but a material rule is missing | Candidate record has no signed-off interpretation for a mandatory condition | UNKNOWN | `MANDATORY_RULE_UNRESOLVED` |

## Execution and acceptance requirements

This document is a test oracle draft, not test execution evidence. The companion JSON fixture now includes synthetic subject/mark vectors for each scenario. APS boundary calculations were checked structurally against the published NSC rating bands, but the fixtures have not been executed against an eligibility engine. Before the eligibility blocker can be closed:

1. Reconcile all seven candidate records against the complete applicable 2027 sources and record exact pages, source versions, verification dates and conditions. Compare the two prospectus URLs already identified in `UJ-2027-APS-AND-SOURCE-RECONCILIATION.md` and record the governing version.
2. Apply the official six-best-subject APS rule, excluding Life Orientation and including required programme subjects. Resolve all material language mapping, alternative-branch and faculty-restriction interpretations or keep those rules explicitly unsupported.
3. Obtain curator sign-off on each normalized programme rule and its case expectations.
4. Turn these cases into versioned fixtures and execute them against the actual evaluator once implementation is authorised by the earlier project gates.
5. Assert 100% of expected states and exact reason codes; zero false-positive `ELIGIBLE`; deterministic repeatability; and correct unknown handling.
6. Do not mark this blocker complete solely because this document exists. If a material rule cannot be verified, record the blocker and retain `UNKNOWN` safeguards.

## Change log

- 2026-10-14 — Draft created from existing project source-reconciliation evidence and official UJ web search results. No executable evaluator tests were run and no candidate record is approved for definitive screening.
