# UJ 2027 Pilot — Source and APS Rule Reconciliation Log

**Status:** Working evidence log for GAP-001; not a publication approval.  
**Prepared:** 2026-10-14  
**Branch:** `docs/uj-2027-eligibility-oracle`  
**Scope:** UJ 2027 undergraduate NSC pilot candidates only.

## 1. Source version decision — proposed

The repository's earlier documents refer to more than one official UJ 2027 prospectus URL:

1. [UJ 2027 Undergraduate Prospectus, June 2026 upload](https://www.uj.ac.za/wp-content/uploads/2026/06/uj_undergrad_prospectus2027.pdf)
2. [UJ 2027 Undergraduate Prospectus, online 25 June 2026, July upload](https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf)

Both are presented by UJ as 2027 prospectus material. Search-indexed content from the June URL confirms the extended CSI row as code B2E02Q, APS 26, English 4 (50%+), Mathematics 5 (60%+), and APK, printed page 91. The July URL is also listed by UJ's official CBE archives. The current UJ undergraduate page explicitly warns that prospectus content is subject to change.

**Proposed source handling:** retain both URLs in provenance until the repository curator compares the actual PDFs and records checksums/version differences. Use the currently published official 2027 prospectus as the primary cycle-specific source, with the 2027 CBE brochure for CBE-specific rows. Do not claim the PDFs are identical until byte/content comparison is performed.

**Evidence limitation:** direct PDF retrieval through the available web interface was blocked by site access restrictions. Search-indexed excerpts support the facts listed here, but they are not a substitute for saving the source files, comparing them, and recording exact file hashes/page screenshots in the repository.

## 2. APS policy — evidence that resolves one previous open question

Official UJ FAQ pages state:
- APS is based on the six **best** school subjects, excluding Life Orientation.
- The subjects used for APS must include the required programme subjects.
- For applicants currently in Grade 12, UJ says to apply using final Grade 11 results and that Grade 12 mid-term results are not considered. Final selection is later based on final Grade 12 results.

Sources:
- [UJ FAQ — How to calculate an APS?](https://www.uj.ac.za/faq/can-i-apply-without-a-copy-of-my-id-passport-document/)
- [UJ Frequently Asked Questions](https://www.uj.ac.za/frequently-asked-questions)
- [UJ 2027 Undergraduate Prospectus](https://www.uj.ac.za/wp-content/uploads/2026/06/uj_undergrad_prospectus2027.pdf), printed p. 16, for six school subjects and Life Orientation exclusion.

### Adopt as source-backed policy, pending curator sign-off

1. For this NSC pilot, compute achievement levels using the published UJ NSC band mapping, not an invented or rounded mapping.
2. Calculate APS from the six best eligible school subjects excluding Life Orientation.
3. The selected six must include the applicable programme-required subjects; the implementation must not simply choose the six highest marks and then separately satisfy a subject rule with a seventh subject unless the official calculation policy supports that exact combination.
4. Do not infer a missing mark, substitute a different subject, or double-count duplicate canonical subjects.
5. If a learner provides more than six subjects, the implementation must use the six best eligible subjects while ensuring programme-required subjects are included. If the supplied data is insufficient to determine a valid selection under the rule, return `UNKNOWN`.
6. Grade 11 marks may support a provisional screening result only if the product clearly identifies the source stage and does not describe it as final Grade 12 eligibility. Final matric applicants are assessed on final Grade 12 results.

### Mark-to-level mapping evidenced in UJ prospectus material

| Percentage | Achievement level |
|---|---:|
| 0–29% | 1 |
| 30–39% | 2 |
| 40–49% | 3 |
| 50–59% | 4 |
| 60–69% | 5 |
| 70–79% | 6 |
| 80–100% | 7 |

A mark must be a valid whole-number percentage from 0 through 100 under the current product acceptance criteria. Do not round decimal values into a band.

## 3. Programme evidence snapshot

The following records remain **draft** because complete conditions, cycle-specific interpretation and curator sign-off are not all complete.

| Candidate | Cycle-specific evidence currently located | Confirmed visible minimums | Still unresolved |
|---|---|---|---|
| BSc Information Technology — B2I01Q | 2027 prospectus, printed p. 86; [official programme page](https://www.uj.ac.za/university-courses/bsc-in-information-technology/) | APS 30; English 5 (60%+); Mathematics 6 (70%+); APK | Full applicable conditions, English stream interpretation, final source-version comparison, curator sign-off |
| BSc Computer Science and Informatics — B2I02Q | 2027 prospectus, printed p. 86; [official programme page](https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics) | APS 30; English 5 (60%+); Mathematics 6 (70%+); APK | Full applicable conditions, English stream interpretation, final source-version comparison, curator sign-off |
| BSc Computer Science and Informatics specialising in AI — B2I04Q | 2027 prospectus, printed p. 86; [official programme page](https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics-specialising-in-ai-artificial-intelligence/) | APS 34; English 5 (60%+); Mathematics 7 (80%+); APK | Full applicable conditions, English stream interpretation, final source-version comparison, curator sign-off |
| BSc Computer Science and Informatics Extended — B2E02Q | 2027 prospectus, printed p. 91; [official programme page](https://www.uj.ac.za/university-courses/bsc-in-computer-science-and-informatics-extended/) | APS 26; English 4 (50%+); Mathematics 5 (60%+); APK; four years | Full applicable conditions and confirmation of exact scope of Faculty of Science subject restriction; curator sign-off |
| BCom Information Systems — B1CISQ | 2027 prospectus table and 2027 CBE brochure, printed p. 10; [official programme page](https://www.uj.ac.za/university-courses/bcom-in-information-systems/) | APS 26; English 4; Mathematics 4; Mathematical Literacy not accepted; Technical Mathematics 4 is shown in a separate column | The extracted table does not establish whether Mathematics and Technical Mathematics are alternatives or both mandatory; do not encode either interpretation until the original row/official wording is confirmed; full conditions and curator sign-off remain open |
| Diploma Business Information Technology — DI1401 | 2027 prospectus, printed p. 44; 2027 CBE brochure, printed p. 12; [official programme page](https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/) | APS 22 with Mathematics or 24 with Mathematical Literacy; English 4; Mathematics/Technical Mathematics 3 or Mathematical Literacy 6; APB; three years | Full conditions and precise route semantics; curator sign-off |
| BCom Information Management — B34IMQ | 2027 CBE brochure, printed p. 10; [official programme page](https://www.uj.ac.za/university-courses/bcom-in-information-management/) | CBE brochure: APS 26 with Mathematics/Technical Mathematics OR 28 with Mathematical Literacy; English 4 and corresponding subject level 4/6; APK; three years | Resolve difference from current page's general APS 28 wording; full conditions and branch semantics; curator sign-off |

The official programme pages currently show an application window for 2026. They are useful corroboration of identity and visible minimums but are not sufficient by themselves to establish all 2027 rules. UJ warns that prospectus content may change.

## 4. Mandatory interpretation safeguards

- Mathematics, Technical Mathematics and Mathematical Literacy remain separate canonical subjects. For BCom Information Systems, do not assume Mathematics and Technical Mathematics are interchangeable alternatives merely because both columns show level 4; the exact rule semantics remain unresolved.
- Physical Sciences and Technical Sciences remain separate canonical subjects.
- English is a source label, not proof of equivalence across Home Language / First Additional Language / Second Additional Language. Until the governing rule is documented, an unsupported stream mapping yields `UNKNOWN`.
- The prospectus contains a note that Technical Mathematics and Technical Science are not accepted for Faculty of Science degree programmes. Preserve that as a source-backed restriction only within its confirmed scope; do not generalise it to CBE programmes or non-degree programmes.
- APS minimums and subject minimums are independent mandatory checks. High APS cannot compensate for a failed mandatory subject.
- Minimum requirements are not a guarantee of admission. Selection/capacity may still apply.
- If a material condition is unresolved, the record remains draft and cannot support `ELIGIBLE`. A separate verified mandatory failure can still justify `NOT_ELIGIBLE`.

## 5. Gate actions still outstanding

- [ ] Save the two official 2027 prospectus PDFs and the 2027 CBE brochure into a reviewed evidence location (subject to repository policy/licensing).
- [ ] Record source title, official URL, publication/version evidence, retrieval date, SHA-256 and exact printed/PDF page references.
- [ ] Compare the two prospectus versions and explicitly select the governing version or document any material differences.
- [ ] Confirm the English-subject mapping rule from authoritative UJ source or keep it unsupported.
- [ ] Extract all footnotes, selection conditions, subject restrictions and exceptions from the applicable programme rows.
- [ ] Verify the APS rule including required subjects in the six best subjects and translate it into exact deterministic fixtures.
- [ ] Obtain curator sign-off on every complete programme record and each expected test state/reason.
- [ ] Execute at least 20 golden cases against the actual evaluator once implementation is permitted; assert 100% state/reason outcomes and zero false-positive `ELIGIBLE`.
- [ ] Update the catalogue register, source reconciliation matrix, curator pack, requirements matrix and acceptance criteria with matching evidence.
- [ ] Only then propose closing GAP-001 in a focused PR.

## 6. Change log

- 2026-10-14 — Added official UJ FAQ evidence for six best subjects and required programme subjects; recorded source-version discrepancy and seven candidate records. This log is evidence preparation, not curator sign-off or gate passage.
