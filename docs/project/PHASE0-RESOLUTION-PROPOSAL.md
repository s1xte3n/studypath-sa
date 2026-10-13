# StudyPath SA — Phase 0 Blocker Resolution Proposal

**Prepared:** 2026-10-13  
**Status:** Evidence-informed proposal for project-owner approval  
**Gate:** PROJECT READY remains **BLOCKED / NOT APPROVED** until the owner accepts these controls and the remaining evidence is verified.  
**Scope:** Cost, initial catalogue and privacy/security controls only. No application code or cloud resources are changed by this document.

## 1. Cost resolution

### Decision proposed: static-first, no paid backend for the hackathon MVP

For the first functional demo, use a client-side React/Vite app and a version-controlled, read-only catalogue JSON file. Run deterministic matching in the browser. Do not use PostgreSQL, Azure API Management, a separately billed Functions app, Blob Storage, Azure OpenAI, Document Intelligence, paid identity, or other metered services in this phase.

Candidate hosting: Azure Static Web Apps Free, subject to checking the actual subscription and deployment permissions. Microsoft's pricing page lists the Free plan as free and includes 100 GB bandwidth per subscription per month; if the free plan's usage quotas are exceeded, the site may stop serving rather than incur automatic bandwidth overage. The app size quota is 250 MB per app and the subscription has a 500 MB total storage quota. See:
- https://azure.microsoft.com/en-us/pricing/details/app-service/static/
- https://learn.microsoft.com/en-us/azure/static-web-apps/quotas

This is a proposed **R0 Azure service-cost target**, not a certified all-in quote. Other costs can still arise from existing resources, DNS/domain purchases, GitHub usage beyond applicable allowances, taxes, credit expiry, or unrelated resources in the subscription. The project owner must inspect Azure Cost Management and the subscription's current resources/billing settings before any deployment.

### Cost controls required

1. Do not provision a resource unless its price, quota, overage behaviour and deletion path are documented.
2. Use the Free hosting plan only; do not upgrade to Standard or add metered integrations without a new cost decision.
3. No custom domain purchase for the MVP; use the platform-provided hostname.
4. No paid database, API gateway, AI, document processing, analytics, monitoring ingestion or persistent storage.
5. Review existing Azure resources and Cost Management before deployment; ensure StudyPath does not accidentally reuse or incur costs on unrelated resources.
6. Add a release checklist item to confirm current plan and billable resources before and after deployment. Budgets/alerts alone are not a hard spending stop.
7. If any required cost cannot be confirmed as zero under the actual subscription, stop and obtain an all-in estimate under the R100/month cap before proceeding.

**Cost gate status:** Architecture-level cost risk reduced. Actual subscription, existing-resource charges, billing currency/credits and all-in spend are not independently verified. Do not claim that the cap has been proven until the owner records that check.

## 2. Catalogue resolution

### Bounded pilot scope

The initial catalogue will be explicitly labelled **“University of Johannesburg pilot — two undergraduate IT pathways; not a national catalogue.”** This is a proposed bounded demo dataset, not a representation of all South African study options.

Only store concise factual fields, rule values, source URLs and provenance. Link to the official programme pages rather than copying page prose, layouts, images or prospectus content. Record the source and verification date with each record. Recheck before the relevant application cycle and at least every 30 days during active development. A missing, conflicting or stale rule must produce `UNKNOWN`, never a guessed eligibility result.

### Source-verified candidate records

The following minimum requirement values were visible on official University of Johannesburg programme pages when checked on 2026-10-13. They are a source-backed starting point, not a complete admissions decision rule. The source pages state that content can change and admissions remain subject to the institution's own process.

| Field | Record UJ-BSC-IT | Record UJ-DIP-BIT |
|---|---|---|
| Institution | University of Johannesburg | University of Johannesburg |
| Programme | BSc in Information Technology | Diploma in Business Information Technology |
| Programme code | B2I01Q | DI1401 |
| Qualification type | Degree | Diploma |
| NQF level | 7 | 6 |
| Campus / mode | Auckland Park Kingsway / full-time | Auckland Park Bunting Road / full-time |
| Duration | 3 years | 3 years |
| Minimum APS displayed by UJ | 30 | 22 with Mathematics, or 24 with Mathematical Literacy |
| English displayed by UJ | Level 5 (60%+) | Level 4 (50%) |
| Mathematics / Mathematical Literacy displayed by UJ | Mathematics level 6 (70%+) | Mathematics or Technical Mathematics level 3 (40%), or Mathematical Literacy level 6 (70%) |
| Application dates displayed | 1 April 2026 – 31 October 2026 | 1 April 2026 – 31 October 2026 |
| Official programme source | https://www.uj.ac.za/university-courses/bsc-in-information-technology/ | https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/ |
| Official general admissions page | https://www.uj.ac.za/admission-aid/undergraduate/important-information-before-you-apply/ | Same |
| Source verification date | 2026-10-13 | 2026-10-13 |
| Catalogue version | pilot-2026-10-13-v1 | pilot-2026-10-13-v1 |

The UJ admissions page states undergraduate curricular applications close at 12:00 on 31 October 2026. Because deadlines can change, the product should display this as a sourced date with a “verify with institution” warning and a direct link, not as a guaranteed current deadline.

### Eligibility safety boundary

Do not translate the table above into a claim of guaranteed eligibility. The current evidence is enough to show sourced minimum thresholds, but the complete programme rules, APS calculation details, applicant categories and selection conditions must be validated before any rule is used to return a final `ELIGIBLE` or `NOT_ELIGIBLE` result. Until then:
- Display the published minimums with their source links.
- Label the result as a **minimum-requirement screen**, not an admission prediction.
- Return `UNKNOWN` where any required rule, applicant category, subject equivalency, APS method or source freshness is unclear.
- Do not provide a fabricated tuition fee, funding result, capacity/selection outcome or application guarantee.
- Do not add other institutions, programmes, TVET options, fees or funding rules without the same source/provenance review.

SAQA's register states that registered qualifications are public property, that reproduction/quotation should acknowledge SAQA, and that the material must not be sold for profit: https://regqs.saqa.org.za/search.php. The pilot above uses institution programme pages as the source of entry thresholds and does not require reproducing SAQA register content. If SAQA fields are later added, preserve attribution and review the applicable terms. DHET's private-institution register asks published institution lists to include explanatory information and registered qualifications: https://www.dhet.gov.za/Registers_DocLib/Register%20of%20Private%20Higher%20education%20Institutions%2011%20September%202025.pdf. Check for a newer register before relying on it.

**Catalogue gate status:** The owner approved the narrow, source-linked pilot scope and the “minimum-requirement screen only / UNKNOWN on ambiguity” boundary on 2026-10-13. Full eligibility automation remains out of scope until complete rules have been verified.

## 3. Privacy and security resolution

### Proposed hard boundary for the hackathon MVP

The first demo will use **synthetic sample learner profiles only**. It will not invite members of the public to submit real marks or personal details until the owner has completed an appropriate privacy review.

The first version must not include:
- Names, identity numbers, contact details, school names, exact addresses or account creation.
- Uploads, transcripts, document extraction, AI chat or free-text personal narratives.
- Server-side learner profiles, database writes, cross-session persistence, saved pathways or application tracking.
- Analytics, advertising trackers, session replay or telemetry containing entered profile values.
- Local storage or cookies for learner profile values. Inputs should exist in browser memory only and be cleared on reset/refresh.

Required controls:
1. Use a clearly labelled synthetic demo profile and synthetic marks; do not ask demo participants to enter real learner data.
2. Process the demo inputs locally in the browser. Do not send subject/mark/interest values to APIs, logs, telemetry, analytics or third-party services.
3. Keep the catalogue static and read-only; no profile endpoint or server-side storage.
4. Provide a visible reset/clear control and explain that results are guidance, not an admission or funding decision.
5. Minimise infrastructure logs and never add learner input values to logs or error reports. Review hosting-provider technical metadata and retention settings before public deployment.
6. Use HTTPS through the hosting provider; protect the repository and deployment secrets; never commit credentials.
7. Maintain an incident checklist: restrict/disable the affected deployment if needed, preserve relevant technical evidence without collecting learner input, assess what data was involved, and seek appropriate advice on any notification duties.
8. Do not test with real student data. Use synthetic test cases only.

### POPIA boundary

This is a privacy-by-design proposal, not a legal opinion or a certification of POPIA compliance. POPIA sections 34–35 address processing personal information of children; section 35 provides defined circumstances for authorised processing, including prior consent of a competent person in the applicable case. The official Act is at https://www.justice.gov.za/legislation/acts/2013-004.pdf and the Information Regulator's children-processing guidance is at https://inforegulator.org.za/popia/.

Browser-only handling reduces exposure but does not automatically mean that no personal information is processed or that POPIA is inapplicable. A public learner-facing release, real learner inputs, analytics, persistence, accounts, or any backend processing remains blocked until the owner has documented the applicable lawful basis, transparency notice, retention/deletion, operator/hosting review and any required competent-person consent or other authorisation with qualified advice as appropriate.

For the synthetic-only demo, the privacy notice should still identify the project, explain that the demo is not collecting or storing real learner profiles, warn users not to enter real personal information, state the role of the hosting provider and link to a contact route. Do not claim that the notice itself establishes legal compliance.

**Privacy gate status:** The owner approved the synthetic-data-only MVP boundary on 2026-10-13. It must still be implemented and verified before the demo; the privacy/security review is not a legal certification. No public processing of real learner data is approved by this proposal.

## 4. Owner decision record

The owner explicitly approved COST-01, DATA-01, ELIGIBILITY-01, PRIVACY-01, RELEASE-01 and OWNER-01 on 2026-10-13, and reconfirmed approval of the Phase 0 materials in the project conversation. These decisions establish direction; they do not satisfy the external evidence, implementation or verification gates below.

- **COST-01:** Static Web Apps Free only for the first demo; no paid or metered backend services; no custom domain; do not deploy until actual subscription/resource/billing review confirms the cap can be maintained.
- **DATA-01:** Accept the two-programme UJ pilot as the initial bounded catalogue, with official links and provenance.
- **ELIGIBILITY-01:** Until full programme rules are verified, show source-backed minimum requirements only, label the output a minimum-requirement screen, and use `UNKNOWN` for ambiguity.
- **PRIVACY-01:** Synthetic learner data only for the hackathon demo; no real learner inputs, uploads, accounts, persistence, analytics or learner-profile telemetry.
- **RELEASE-01:** No public learner-facing use of real learner data until privacy/legal review is documented. No Azure provisioning until actual subscription permissions and billing/resource review are complete.
- **OWNER-01:** Accept that one person currently holds all roles and that no independent reviewer/backup is available; arrange an independent review before a real learner-data release if feasible.

**Remaining gate condition:** Do not describe Azure access, cost, privacy compliance or deployment as independently verified until evidence is captured. Owner approval of the Phase 0 direction is recorded, but PROJECT READY must remain blocked until the manual evidence pack's required checks are completed and reviewed. If any required check fails, keep the gate blocked and revise the plan.
