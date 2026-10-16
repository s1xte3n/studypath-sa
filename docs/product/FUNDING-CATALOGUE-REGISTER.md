# StudyPath SA — Funding Catalogue Register

**Status:** Research register only. No opportunity in this file is approved for publication or definitive funding eligibility guidance.  
**Research date:** 2026-10-16  
**Owner/curator:** Project owner (temporary single-owner review under OR-014)  
**Requirement:** OR-015 / D-039; Q-002 and funding publication evidence  
**Catalogue target:** 3–5 verified opportunities; do not claim national coverage.

## Candidate FND-NSFAS-2027 — National Student Financial Aid Scheme

**Provider:** National Student Financial Aid Scheme (NSFAS)  
**Applicable cycle:** 2027  
**Status:** **BLOCKED — official deadline conflict; not publication-ready**  
**Official sources:**
- NSFAS application guidance: https://www.nsfas.org.za/content/how-to-apply.html
- South African Government announcement (18 September 2026): https://www.gov.za/news/speeches/minister-buti-manamela-launch-nsfas-2027-application-cycle-18-sep-2026
- NSFAS disability support page (supporting context, not a substitute for general cycle rules): https://nsfas.org.za/content/disability-support.html

### Observed facts

- The official NSFAS application page states the 2027 application period closes on **31 October 2026**.
- The South African Government announcement for the launch of the 2027 NSFAS cycle states it closes on **18 November 2026**.
- These are conflicting official statements for the same 2027 cycle. The research pass cannot establish which date currently governs the general application process.
- NSFAS's published process requires applicants to use the official myNSFAS channel and complete the provider's own application and supporting-document process. StudyPath SA must not submit applications or request learner identity/household data.
- Funding eligibility depends on the applicable official funding policy and applicant circumstances. Do not infer eligibility from programme eligibility or promise funding.

### Normalized draft handling

| Field | Draft value | Reason |
|---|---|---|
| Stable ID | `FND-NSFAS-2027` | Internal catalogue ID; not an NSFAS reference |
| Provider | National Student Financial Aid Scheme | Official provider name |
| Cycle | `2027` | Explicitly named in both official sources |
| Official website | https://www.nsfas.org.za/ | Official provider site |
| Application URL | https://my.nsfas.org.za/ | Official application channel referenced by NSFAS |
| Deadline text | **Unresolved — official sources conflict; confirm with NSFAS before relying on a date** | Avoid silently choosing one date |
| Deadline timestamp | `null` | No definitive date selected |
| Requirements | Not normalized for eligibility in this research pass | Complete applicable 2027 policy/rule and applicant-category review first |
| Required documents | Provider-generated list; refer learner to myNSFAS | Individual checklist can vary; don't invent a universal list |
| Amount/coverage | Not normalized in this research pass | Verify against the applicable 2027 funding policy and applicant/institution category |
| Source verification | 2026-10-16 | Web research date; not curator approval |
| Publication status | Research-only / not publishable | Curator sign-off and source conflict resolution are outstanding |

### Required actions before publication

1. Recheck the NSFAS 2027 application page and the relevant official funding policy on the day of curation.
2. Obtain authoritative clarification from NSFAS about the general 2027 closing date and retain the response or official corrected source as evidence.
3. Capture the source title, URL, relevant section, version/date, cycle, verification date and reviewer in the final catalogue record.
4. Verify the applicable 2027 eligibility rules, applicant categories, institutional/qualification scope, funding coverage and required-document behavior. Where rules depend on sensitive household or personal information, do not collect that information in StudyPath SA; direct learners to the provider's official eligibility check.
5. Have the curator sign off the normalized record and corresponding deterministic tests. If the deadline conflict remains unresolved, omit the deadline as a definitive field and keep the record unpublished until the approved schema/presentation explicitly supports that limitation.
6. Reach the OR-015 target of 3–5 complete, approved funding opportunities using official provider/government sources. This one candidate does not satisfy the target.

## Publication guardrails

- Never state or imply that StudyPath SA submits a funding application, guarantees funding, or replaces the provider's assessment.
- Do not collect IDs, household income, bank details, passwords, OTPs, uploaded documents or other sensitive funding data.
- Missing, sensitive, stale or conflicting criteria remain unknown and must not be treated as a pass.
- Re-verify published opportunities at least every 30 days and sooner after an official source change or relevant deadline/cycle change.
- The register is a research artifact only; it is not a published API catalogue and is not curator sign-off.

**Disposition:** NSFAS 2027 is a credible official-source candidate, but the conflicting closing dates make it unsuitable for definitive deadline display until reconciled.


## Candidate FND-FUNZA-LUSHAKA-2027 — Funza Lushaka Bursary Programme

**Provider:** Department of Basic Education / Funza Lushaka Bursary Programme  
**Applicable cycle:** 2027  
**Status:** **RESEARCHED CANDIDATE — not publication-ready**  
**Research date:** 2026-10-16  
**Official sources:**
- Programme home and current cycle dates: https://www.funzalushaka.doe.gov.za/Home/
- Official FAQ and programme/selection conditions: https://www.funzalushaka.doe.gov.za/Home/FAQ
- Official application portal: https://www.funzalushaka.doe.gov.za/

### Observed facts

- The official programme home page says 2027 applications for new applicants close on **31 January 2027**; re-applications for existing/returning bursars close on **30 November 2026**. These are different applicant categories and must not be merged.
- The official page states first-time applicants must be 30 years old or younger.
- The official FAQ describes the programme as supporting selected students completing teaching qualifications in identified priority subject areas. It lists BEd and PGCE in Senior Phase/FET teaching as supported qualification types, subject to applicable programme rules.
- The FAQ states applicants must already have admission to an eligible public higher education institution and meet the programme's national selection criteria; selection and allocations are not guaranteed.
- The FAQ describes a service obligation to teach at a public school for the same number of years as bursary support received.
- The official FAQ says award value varies by institution and the bursary may cover essential expenses such as tuition, accommodation/meals, books and learning materials, and potentially a living allowance subject to caps and available allocation. Do not publish a fixed award amount.

### Normalized draft handling

| Field | Draft value | Reason |
|---|---|---|
| Stable ID | `FND-FUNZA-LUSHAKA-2027` | Internal catalogue ID; not a provider reference |
| Provider | Funza Lushaka Bursary Programme | Official programme name |
| Cycle | `2027` | Explicitly listed by the official programme page |
| Official website | https://www.funzalushaka.doe.gov.za/ | Official provider portal |
| Application URL | https://www.funzalushaka.doe.gov.za/ | Official application portal |
| Deadline text | New applicants: 31 January 2027; returning bursars: 30 November 2026 | Applicant categories must remain distinct |
| Deadline timestamp | `null` pending contract normalization and recheck | Do not assume an end-of-day timezone from a date-only statement |
| Eligibility summary | Teaching-qualification-focused; age, citizenship, admission, priority subject and national selection rules apply | Full current-cycle rules must be extracted and reviewed before deterministic matching |
| Amount/coverage | Variable by institution and allocation; no fixed amount asserted | Official FAQ describes variable institutional cost structures and caps |
| Service obligation | Teaching service obligation applies; official FAQ says one year of service for each funded year | Must be prominent before a learner treats the award as suitable |
| Source verification | 2026-10-16 | Research date; not curator approval |
| Publication status | Research-only / not publishable | Full 2027 policy/rule verification, normalized fields, tests and curator sign-off remain outstanding |

### Required actions before publication

1. Verify the complete 2027 policy, official application notes and all current-cycle criteria against the current official portal.
2. Capture exact source sections, version/publication dates, applicant categories, supported qualification types, priority subjects, citizenship/age rules, institutional admission conditions, service obligation and award/coverage caveats.
3. Preserve the distinct new-applicant and returning-bursar deadlines; normalize a timestamp only if the provider supplies an unambiguous time and timezone.
4. Create deterministic tests only for supported facts; do not infer individual funding eligibility from academic marks alone.
5. Have the curator sign off the complete record and its source evidence before publication.

**Disposition:** This adds a second official-source funding candidate, not a second approved opportunity. The 3–5 verified-opportunity target is still unmet.

## Candidate FND-NC-PREMIER-2027 — Northern Cape Premier's Bursary Programme

**Provider:** Northern Cape Provincial Government, Office of the Premier  
**Applicable cycle:** 2027  
**Status:** **RESEARCHED CANDIDATE — not publication-ready**  
**Research date:** 2026-10-16  
**Official source:** https://www.northerncape.gov.za/bursary/

### Observed facts

- The official provincial bursary page advertises support for full-time undergraduate / first-qualification studies at an accredited South African higher education institution.
- The published eligibility summary identifies South African citizenship and unemployed youth aged 18–30 from the Northern Cape as the intended applicant group.
- The official page lists a closing date of **31 October 2026** and states that late applications will not be considered.
- The page includes income-banded award values and asks for household/parent/guardian financial evidence. These are sensitive criteria and documents; StudyPath SA must not collect or infer them. Applicants must use the provider's official process.
- The source page is official, but this research pass did not verify the full advert, all exclusions, required proof, award conditions, or the latest application submission instructions.

### Normalized draft handling

| Field | Draft value | Reason |
|---|---|---|
| Stable ID | `FND-NC-PREMIER-2027` | Internal catalogue ID only |
| Provider | Northern Cape Provincial Government — Office of the Premier | As named by the official page |
| Cycle | `2027` | Advertised cycle |
| Official website | https://www.northerncape.gov.za/bursary/ | Official provincial page |
| Application URL | https://www.northerncape.gov.za/bursary/ | Entry page; verify the current form and submission channel from the full advert |
| Deadline text | 31 October 2026; no late applications | Official page statement; recheck before publication |
| Deadline timestamp | `null` | Date-only source; no time/timezone normalized |
| Eligibility summary | Intended for qualifying unemployed South African citizens aged 18–30 from the Northern Cape pursuing a first undergraduate qualification full-time | Summary only; full rules not yet normalized |
| Award amount/coverage | Official page displays income-banded award values; not reproduced as a definitive user-facing amount in this research pass | Full advert, conditions and budget availability need review |
| Sensitive data handling | Do not collect household income, bank statements, IDs or supporting documents in StudyPath SA | Refer applicants to the provider's own process |
| Source verification | 2026-10-16 | Research date, not curator approval |
| Publication status | Research-only / not publishable | Full advert review, normalized criteria, tests and curator sign-off outstanding |

### Required actions before publication

1. Review the complete official advert and application form; record source title, version/date, sections and exact submission method.
2. Verify citizenship, residence, age, unemployment, qualification-level, institution, academic-performance, income-band and other conditions, distinguishing hard requirements from preferences.
3. Do not build eligibility checks from household income or request financial documents. Keep unsupported/sensitive rules unknown and link to the official provider process.
4. Recheck deadline and available funding on the day of curation; do not infer an extension.
5. Create deterministic tests for every non-sensitive, explicitly supported rule and obtain curator sign-off.

**Disposition:** Potentially relevant to Northern Cape learners, but restricted geography and sensitive financial criteria require careful handling. It is a research candidate, not an approved funding opportunity.

## Candidate FND-GRDM-2027 — Garden Route District Municipality External Bursary

**Provider:** Garden Route District Municipality  
**Applicable cycle:** 2027  
**Status:** **RESEARCHED CANDIDATE — not publication-ready**  
**Research date:** 2026-10-16  
**Official source:** https://www.gardenroute.gov.za/2026/09/04/04-september-2026-opportunities-financial-assistance-towards-further-studies-2027/

### Observed facts

- The official municipal notice advertises financial assistance for further studies in the 2027 academic year and states applications opened on 1 September 2026.
- The published closing date is **31 October 2026**.
- The notice requests a completed application, CV and cover letter, Grade 12 or latest tertiary results, ID, an affidavit of parents' combined income, and proof of residential address.
- Applications are described as being submitted to the municipality's Records office for the attention of the Training and Development Section. The complete advert/form must be reviewed to confirm the current submission instructions.
- This is a locally scoped opportunity, not a national bursary. The exact residency boundary, qualification/field restrictions, selection rules, amount and award conditions have not yet been normalized in this research pass.
- Household income and identity documents are sensitive. StudyPath SA must not collect them; direct applicants to the official municipal process.

### Normalized draft handling

| Field | Draft value | Reason |
|---|---|---|
| Stable ID | `FND-GRDM-2027` | Internal catalogue ID only |
| Provider | Garden Route District Municipality | Official notice |
| Cycle | `2027` | Explicitly advertised |
| Official website | https://www.gardenroute.gov.za/ | Official municipal website |
| Opportunity notice | https://www.gardenroute.gov.za/2026/09/04/04-september-2026-opportunities-financial-assistance-towards-further-studies-2027/ | Official notice and form link |
| Deadline text | 31 October 2026 | Official notice; recheck before publication |
| Deadline timestamp | `null` | Date-only source; no time/timezone normalized |
| Eligibility summary | Financial assistance for further study in 2027; full residency, study-level and selection rules need verification | Do not infer broad eligibility from the notice heading |
| Required documents | Notice lists application form, CV, cover letter, results, ID, parental combined-income affidavit and proof of address | Applicant should confirm the complete current checklist with the municipality |
| Award amount/coverage | Not normalized | Verify official advert and conditions |
| Sensitive data handling | Do not collect IDs or household income evidence in StudyPath SA | Refer applicants to the municipality |
| Source verification | 2026-10-16 | Research date, not curator approval |
| Publication status | Research-only / not publishable | Full advert/rules, deterministic tests and curator sign-off outstanding |

### Required actions before publication

1. Review the complete advert and application form, including exact residency, qualification, field-of-study, academic, financial and selection criteria.
2. Confirm whether the programme is limited to residents of the district and represent that geographic restriction explicitly.
3. Confirm submission channel, deadline details, award amount/coverage, and any service or repayment obligation from the official source.
4. Never collect IDs, household income evidence or supporting documents in StudyPath SA.
5. Recheck current-cycle status and have the curator approve the normalized record and tests.

**Disposition:** Potentially useful as a locally scoped opportunity, but it must not be presented as nationally available. It remains research-only.

