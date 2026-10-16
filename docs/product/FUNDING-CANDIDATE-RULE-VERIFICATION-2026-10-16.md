# Funding candidate rule-verification update — 2026-10-16

**Purpose:** Record an official-source verification pass after PR #93 merged. This is research evidence only, not publication approval or an eligibility decision.
**Scope:** Northern Cape Premier's Bursary Programme 2027 and Garden Route District Municipality External Bursary 2027.
**Disposition:** Both remain research-only. No funding catalogue API/runtime data, eligibility implementation, or tests are changed by this report.

## 1. Northern Cape Premier's Bursary Programme 2027

Official sources reviewed:

- Main programme page: https://www.northerncape.gov.za/bursary/
- Application checklist: https://www.northerncape.gov.za/bursary/CheckList
- Programme FAQ: https://www.northerncape.gov.za/bursary/faq
- About the programme: https://www.northerncape.gov.za/bursary/AboutUs

### Supported facts

The current programme page describes applicants as South African citizens, unemployed, aged 18–30, resident in the Northern Cape, and applying for full-time undergraduate/first-qualification studies at an accredited South African higher education institution. It says current Grade 12 learners, Grade 12 completers, and already-enrolled students may apply. It prioritises scarce/critical fields and STEM, and says selection also considers academic achievement, disability, demographic and geographic spread, household financial means, and available budget. The page gives a closing date of 31 October 2026 and says late applications will not be considered.

The checklist specifies identity, academic results, proof of higher-education acceptance/registration, intended curriculum, household financial evidence and multiple supporting civil-status documents. These documents include identity documents and bank/financial records belonging to applicants and family members. StudyPath SA must not collect or store these documents or household financial details.

### Material source conflict — BLOCKED

The programme FAQ gives a different age range (18–35) and a different household-income/maximum-award table from the current programme page. The main page states award bands of R120,000 / R100,000 / R80,000 for household-income bands up to R800,000; the FAQ describes R100,000 / R80,000 / R60,000 / R50,000 bands and an 18–35 age range. These differences could change eligibility and funding representations. The sources reviewed do not establish which version governs the 2027 cycle.

**Rule handling:** Do not encode a definitive age boundary, award amount, or income rule. Do not infer a match from the summary page. Keep the opportunity unpublished until the Office of the Premier provides authoritative clarification or a clearly dated current-cycle advert resolves the discrepancy. Household-income criteria remain outside StudyPath SA's data collection and matching inputs.

## 2. Garden Route District Municipality External Bursary 2027

Official notice: https://www.gardenroute.gov.za/2026/09/04/04-september-2026-opportunities-financial-assistance-towards-further-studies-2027/

### Supported facts

The notice invites current tertiary students and current Grade 12 learners / Grade 12 completers to apply for financial assistance for the 2027 academic year. It restricts support to full-time study at SAQA-accredited tertiary or TVET institutions. It explicitly limits eligibility to applicants whose parents permanently reside within the Garden Route municipal area. Applications opened on 1 September 2026 and the notice states a closing date of 31 October 2026.

The notice asks for a completed application form, detailed CV and cover letter, Grade 12/equivalent or latest tertiary results, certified ID, an affidavit of parents' combined income, and proof of residential address. It directs submissions to the municipality's Records/Training and Development Section in George. Confirm the official application form and submission instructions immediately before any publication.

### Application-form review — 2027 form not conclusively identified

The 2027 notice says the form is available from the municipality's website and offices, but the web materials retrievable in this review did not establish an unambiguously 2027-labelled form file. The municipality's official site exposes a generic “Bursary Application Form” page (published in 2024) and a publicly indexed PDF named “Bursary Application Form 2026”. Do not assume either file is the authoritative 2027 version without confirmation from the municipality.

The accessible form text asks for highly identifying personal information, including identity number, date of birth, residential/contact addresses, phone numbers, and next-of-kin identity/contact details. It also requests race, gender and disability information for employment-equity monitoring, as well as field of study and institution. The 2027 notice separately requires an affidavit of parents' combined income and proof of address. StudyPath SA must not collect or store the form, identity documents, household-income evidence, or these sensitive fields. The application should be completed and submitted directly through the official provider process.

### Remaining evidence gaps — NOT PUBLICATION-READY

The reviewed notice and accessible form materials do not provide a normalized award amount/coverage or a complete, machine-testable set of selection conditions. Do not infer a field-of-study restriction or assume that living in the district alone qualifies an applicant; the notice specifically states the parents' permanent-residence condition. The exact 2027 form version and any additional cycle-specific conditions need confirmation.

**Rule handling:** The full-time mode, institution accreditation category, Grade 12/current student scope, parental permanent-residence condition and published date may be recorded as source-backed draft facts, but the record remains research-only pending curator review, confirmation of the 2027 form, normalized non-sensitive rules, evidence capture, and curator sign-off. If a rule or applicant fact is missing, conflicting, or would require sensitive household data, return UNKNOWN or direct the learner to the official provider process rather than asserting eligibility.

## 3. Required next steps

1. Ask the Northern Cape Office of the Premier to clarify the current 2027 age and award-band rules; retain the response or corrected dated official source.
2. Ask Garden Route District Municipality to confirm the authoritative 2027 application form and whether it adds selection, award, or submission conditions.
3. Add deterministic tests only after the curator approves a normalized, non-sensitive rule set. Tests must assert UNKNOWN for unresolved Northern Cape age/award conflicts and for any criteria not evidenced by official sources.
4. Obtain curator sign-off for each record, including source title/URL, relevant section, verification date, cycle, and reviewer.
5. Do not publish either opportunity or mark the funding catalogue gate passed from this research update alone.

## Verification boundary

This report records a web-source review. It does not establish that a live application was submitted, that a provider confirmed a rule directly, that catalogue code/tests changed, or that either opportunity is approved for publication. No learner data, provisioning, deployment, or application submission is involved.
