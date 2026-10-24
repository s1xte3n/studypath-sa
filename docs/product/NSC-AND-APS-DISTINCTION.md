# NSC and institution-specific APS distinction

**Research checked:** 2026-10-24  
**Purpose:** record authoritative public context for Issue #203 and constrain the hackathon MVP.  
**Status:** research evidence only; not a reviewed NSC rules engine and not institutional admission approval.

## Source 1 — Department of Basic Education subject-choice guidance

- **Title:** Subject choice and career pathing
- **URL:** https://www.education.gov.za/Informationfor/Learners/SubjectChoiceandCareerPathing.aspx
- **What it supports:** the DBE page states that learners need seven subjects for the NSC: four compulsory subjects (two official languages, Mathematics or Mathematical Literacy, and Life Orientation) plus three electives.
- **What it does not support by itself:** a complete executable rule for NSC pass, endorsement/access level, designated subjects, exemptions, special cases, or current institutional admission.

## Source 2 — Department of Basic Education NSC examination FAQ

- **Title:** FAQs on Examinations
- **URL:** https://www.education.gov.za/Curriculum/NationalSeniorCertificate%28NSC%29Examinations/FAQsonExams.aspx
- **What it supports:** the DBE FAQ summarises NSC minimum requirements and distinguishes general NSC attainment from Higher Certificate, Diploma and Bachelor study admission requirements. It also warns that institutions and programmes may require additional subject combinations and achievement levels.
- **What it does not support by itself:** implementing a complete pass/access-level calculator without reconciling the current governing policy, amendments, designated-subject rules, required inputs and exceptional cases.

## Product contract

1. Allow a learner to enter a seven-subject NSC profile.
2. Keep the institution/programme APS calculation separate from NSC pass or access-level assessment.
3. For the current provisional UJ APS demo, count only exactly six supported non-Life-Orientation subjects. If fewer or more than six eligible subjects are supplied, return `UNKNOWN`; do not automatically choose the top six.
4. Do not infer NSC pass, Bachelor’s/Diploma/Higher Certificate access, or programme eligibility from APS.
5. Programme eligibility for the draft catalogue remains `UNKNOWN` where definitive requirements are not curator-approved.
6. Any future NSC rules engine requires the applicable policy and amendments to be verified, versioned, mapped to required learner inputs, independently reviewed and tested before implementation.

## Verification and provenance limits

The two linked sources were retrieved from the official Department of Basic Education website on 2026-10-24. This records the public pages checked, not a formal legal/policy review or institutional approval. No rule thresholds are encoded by Issue #203. Source content can change; verify the applicable policy/version again before implementing an NSC pass/access-level calculator.
