# StudyPath SA — PROJECT READY Evidence Pack

**Status:** Draft for owner review  
**Prepared:** 2026-10-13  
**Gate:** PROJECT READY — BLOCKED / NOT PASSED  
**Purpose:** Collect the evidence and decisions required by Phase 0. This document does not authorise cloud provisioning or feature implementation.

## Evidence convention

- **Verified fact** — directly supported by an inspected project reference, official source or repository state.
- **Proposal** — a concrete starting point that still requires owner approval.
- **Outstanding** — cannot be verified from the current information and requires an accountable person or access.
- **Not a legal opinion:** privacy, source-use and compliance decisions must be reviewed by the designated responsible person and, where necessary, a qualified adviser.

## 1. Catalogue and source stewardship

### Proposed bounded catalogue scope

Start with a deliberately small pilot, not a claim of national completeness. Include only qualification records whose admission requirements for a clearly identified admission cycle have been checked against the institution's own official source. The pilot should cover the qualification types supported by verified data (degree, diploma, higher certificate and TVET programme where available). Include a link to official funding guidance such as NSFAS, but do not calculate funding eligibility from incomplete or outdated data.

A catalogue record is not ready to power eligibility unless all applicable requirements are represented, its source and admission cycle are clear, and the curator has verified it. If a required subject, mark, APS rule, programme-specific condition or source is missing or ambiguous, return `UNKNOWN`; do not infer a pass.

### Candidate official sources

These are starting points for the curator, not a statement that every page may be copied or that any specific programme record has been approved.

| Source | Intended use | Source-use note / status |
|---|---|---|
| [SAQA — registered qualifications search](https://regqs.saqa.org.za/search.php) | Check qualification registration metadata and NQF details; acknowledge SAQA where reproducing or quoting its material | SAQA states registered qualifications are public property, that reproduction/quotation should acknowledge SAQA, and that material must not be sold for profit. Verify the applicable terms before use. |
| [SAQA — registration of qualifications](https://saqa.org.za/services/registration-of-qualifications/) | Explain the role of SAQA registers and find the correct register | Official SAQA source; use for context, not as a substitute for institution-specific entry requirements. |
| [DHET — Register of Private Higher Education Institutions (11 September 2025 edition)](https://www.dhet.gov.za/Registers_DocLib/Register%20of%20Private%20Higher%20education%20Institutions%2011%20September%202025.pdf) | Verify the registration status of a private higher education institution | The register says it is available for public inspection and asks that published lists of registered institutions include explanatory information and registered qualifications. Check for a newer edition before using it in a live catalogue. |
| [NSFAS — official FAQs](https://www.nsfas.org.za/content/faqs.html) | Link to current funding guidance and identify the official policy to check | Dynamic official page. Verify the current academic-year policy and application window before showing any deadline or rule. |
| [NSFAS — policies and guidelines](https://www.nsfas.org.za/content/policies.html) | Locate the policy/guideline applicable to the relevant funding year | Select the correct current policy; do not reuse a previous year's thresholds or requirements without verification. |
| Institution's own official admissions/prospectus page for each selected programme | Source of subject marks, APS, language, programme-specific conditions, campus, study mode and application cycle | Exact programme URLs and source-use terms must be recorded per record. Do not use third-party summaries as the authoritative rule. |
| Selected TVET college's official programme/admissions page | Source for TVET programme-specific entry requirements and application details | Institution and programme selection remain outstanding; verify against current official material. |

**Permitted-use rule:** link to official pages and store only the minimum factual fields needed for the pathway experience. Do not copy page layouts, images or substantial prose. Record and comply with applicable terms, licences and attribution requirements for every source. A public URL alone does not prove unrestricted reuse rights.

### Required provenance fields

Every qualification, requirement and funding record must capture, as applicable:

- Stable internal record ID and entity type.
- Institution/provider name and official programme/qualification title.
- Qualification type, campus/location and study mode only where verified.
- Admission/funding cycle or academic year.
- Each requirement as a structured rule with its meaning, units, and any relevant exceptions.
- Official source name, exact source URL, page/document title and publication/update date if visible.
- `verified_at` date, curator identifier, catalogue version, and a short verification note.
- Optional content hash or source snapshot reference where lawful and useful.
- Record status: draft, verified, stale, withdrawn; never expose draft records as authoritative.
- Deadline date, year, time and timezone only if explicitly stated by the official source.

### Proposed verification cadence

**Proposal requiring approval:** verify each active record at entry, every 30 days while the catalogue is used in active development/demo preparation, and before the relevant application cycle/deadline is published. Recheck immediately when a source announces a change. Mark a record stale when the verification window expires or the source cannot be checked. Do not show stale requirements or deadlines as current; eligibility must fall back to `UNKNOWN` when relevant source data is stale or unavailable.

**Outstanding:** appoint a named catalogue curator and backup; approve the initial list of institutions/programmes; review each source's permitted use; and populate the first verified records. Until that happens, this is a source plan, not a completed catalogue.

## 2. Azure subscription, tenant and access

**Verified:** the repository is private and the connected GitHub integration reports repository write/admin access. This is not evidence of Azure access.

**Owner-confirmed:** the project owner reports that an Azure subscription exists and that they own it. This is not an independent inspection of the tenant or subscription. **Outstanding — do not provision:** confirm tenant/directory and subscription identifiers, billing currency, offer type, region availability, credits, effective permissions, billing visibility, resource ownership, deletion authority and emergency contacts. Record only non-secret identifiers in an approved inventory; never record credentials or tokens. The owner currently holds all roles, so independent review and backup coverage are absent.

Do not paste secrets, access tokens, connection strings, payment details or identity documents into GitHub issues, pull requests or project documents. If no subscription is available, report that plainly; do not create one or attach billing without explicit approval.

## 3. Budget and preliminary service assessment

**Hard constraint:** total project spend must remain at or below **R100 per month**. Free tiers are not assumed to be sufficient, perpetual or free of overage/related charges. The following is a preliminary risk screen using official pricing/documentation pages reviewed on 2026-10-13; it is not a saved Azure Pricing Calculator quote or a cost approval.

| Documented service | Preliminary pricing / quota finding | Budget decision |
|---|---|---|
| Azure Static Web Apps | The Free plan lists free hosting and SSL, 100 GB bandwidth per subscription and plan-specific limits; exceeding Free plan quotas can prevent the site being served. Standard has billable monthly pricing and possible bandwidth overage. [Official pricing](https://azure.microsoft.com/en-us/pricing/details/app-service/static/) | Candidate only after confirming Free plan suitability and quotas. Do not select Standard under the current cap without a verified quote and approval. |
| Azure Functions | Consumption includes a monthly grant of 1 million executions and 400,000 GB-s on eligible pay-as-you-go subscriptions; associated storage and networking can be charged separately. [Official pricing](https://learn.microsoft.com/en-us/azure/azure-functions/pricing) | Usage may be low-cost, but not proven to be R0. Estimate storage, networking and expected execution. |
| Azure API Management | Consumption tier has no fixed cost but bills for requests above its included threshold; other tiers have fixed monthly costs. [Cost guidance](https://learn.microsoft.com/en-us/azure/api-management/plan-manage-costs) | Avoid fixed-cost tiers. Obtain the exact regional consumption estimate and configure API quotas/rate limits if used. |
| Azure Database for PostgreSQL Flexible Server | Pricing is based on compute, storage and backup. The official pricing page returned a B1ms example of **US$12.41/month** for a listed pay-as-you-go configuration before local currency/tax/offer differences. [Official pricing](https://azure.microsoft.com/en-us/pricing/details/postgresql/flexible-server/) | **High risk against R100/month.** Verify region, free-offer eligibility, duration and included storage. Do not create a paid server unless the complete quote proves the cap can be met. |
| Azure Blob Storage / Functions storage account | Storage capacity, operations, redundancy and data transfer can be billable; a storage account associated with Functions is not included in the Functions execution grant. [Azure storage pricing](https://azure.microsoft.com/en-us/pricing/details/storage/blobs/) | Estimate stored GB, operation counts, redundancy and egress. Avoid uploads/documents in the MVP. |
| Microsoft Entra External ID | Core offering lists the first 50,000 monthly active users as free; premium add-ons do not inherit that free tier. [Official pricing](https://azure.microsoft.com/en-us/pricing/details/microsoft-entra-external-id/) | Authentication is deferred for the anonymous-first MVP. If reconsidered, exclude premium/SMS add-ons unless separately priced and approved. |
| Application Insights / Azure Monitor | Application Insights is billed through Log Analytics ingestion; the default Pay-as-you-go Log Analytics tier includes a 5 GB/month free data allowance per billing account, while ingestion, retention, alerts and data transfer can still affect costs. [Cost guidance](https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/cost-usage) | Use minimal telemetry, avoid logging student inputs, set sampling/retention deliberately and verify alert/ingestion costs. |
| Azure Key Vault | Operations and selected service features are metered; price depends on operation/type and region. [Official pricing](https://azure.microsoft.com/en-us/pricing/details/key-vault/) | Required only if the approved deployed design needs secrets. Price the chosen tier/operations; never hardcode secrets as a cheaper substitute. |
| Azure AI Document Intelligence / Azure OpenAI | These are documented in the broader architecture, but uploads and AI chat/document extraction are deferred from the accepted MVP direction. Usage is separately metered and workload/model/region dependent. [Document Intelligence pricing](https://azure.microsoft.com/en-us/pricing/details/ai-document-intelligence/) · [Azure OpenAI pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/) | **Exclude from the initial deployment.** No model, document or token budget has been approved. |
| GitHub Actions and other non-Azure tools | Billing depends on the account/plan, runners, minutes and storage. | Verify separately; R100/month is the total project cap, not an Azure-only allowance. |

### Budget assessment and controls

**Preliminary conclusion: budget feasibility is NOT VERIFIED.** The PostgreSQL price example alone is a material risk; the table does not establish an all-in monthly total. An eligible temporary credit/free grant does not establish ongoing affordability after it expires. Currency conversion, tax, regional pricing, outbound traffic, storage, backups, logs, GitHub usage and all other services must be included.

Before provisioning, the cloud owner must save a dated Pricing Calculator estimate for the intended region and expected workload, including a low/expected/high usage scenario, trial/credit expiry, every metered dependency, and the total converted to ZAR. Record quote assumptions and source links; review with the budget approver.

**Proposed controls (approval required):**
1. Prefer local development and a free static-hosting plan if the required experience can be demonstrated without paid services; any deviation from the documented architecture must be recorded and approved before adoption.
2. No paid or metered cloud resource until an all-in estimate is approved in writing.
3. Configure Azure budget alerts at low thresholds (for example, 50%, 75%, 90%, 100%) and notify the named owner; understand that budgets/alerts are not a hard spend cap and may not stop resources.
4. Use service quotas, API rate limits, restrictive request limits, log sampling/retention and least-privilege access where supported.
5. Disable unneeded services; no AI, uploads, paid APIM tier, always-on compute or production-grade database until justified.
6. Review Cost Management daily during the hackathon and weekly otherwise; compare actual and forecast spend with the R100 cap.
7. Document a stop-work action: disable/remove nonessential billable resources if forecast or actual spend threatens the cap, while preserving required evidence and data safely.
8. Record the resource owner, expiry/review date and teardown checklist for every resource.

**Go/no-go:** no provisioning until a named budget approver signs off on the saved estimate and controls.

## 4. Learner data, privacy and incident handling

### Proposed data inventory and purpose

| Data category | Purpose | MVP handling proposal | Retention proposal |
|---|---|---|---|
| Grade/year, subjects and marks | Deterministic matching against verified requirements | Process in browser memory for anonymous exploration; do not send to server or telemetry in the first demo unless a reviewed design explicitly requires it | Discard when the session/page is cleared; no local storage by default |
| Career interests, province/location preference, study mode and funding preference | Rank or filter pathway options and explain recommendations | Use only the minimum needed; make optional inputs clear; avoid precise home address | Same transient browser-memory policy |
| Catalogue records and official-source metadata | Explain matches and link to official next steps | Store public/non-identifying catalogue data in version-controlled files only after source-use review; include provenance | Retain version history for audit; withdraw stale/incorrect public-facing records promptly |
| Technical operational logs | Diagnose availability and errors | Avoid logging marks, subject-level input, free text, IDs, tokens or request bodies; minimise IP/identifiers where configurable | Proposed short retention (30 days) pending security/privacy approval and platform constraints |
| Accounts, names, ID numbers, contact details, uploaded documents, saved pathways and application notes | Not required for anonymous-first MVP | Do not collect or implement in this phase | Not applicable because collection is excluded |

This inventory is a proposal, not an implemented behaviour. Any future change that sends learner input to a backend, persists it, creates an account or adds analytics must update the inventory and undergo review before implementation.

### Privacy review required

- The audience includes Grade 11–12 learners and may include children. The designated privacy owner must assess applicable POPIA obligations and any consent/guardian requirements with a qualified adviser before release; this document does not decide the legal position.
- Provide a plain-language privacy notice identifying the responsible party, purpose, data categories, recipients/processors, retention, contact route and user rights as determined by the review.
- Do not request names, South African ID numbers, contact details, household income or uploaded documents for anonymous pathway exploration.
- Do not use real learner data in development, screenshots, tests, demo accounts, logs or issue reports. Use synthetic data.
- Do not claim to make admissions or funding decisions. Show source, verification date, uncertainty and a link to the authoritative institution/provider.
- Review cookies, analytics, hosting logs, third-party scripts and cross-border processing before release; “anonymous” must be verified against the actual telemetry and hosting configuration.
- Confirm data-subject request handling and how the project owner will respond to access, correction, deletion and complaints where applicable.

### Retention and deletion proposal

- Anonymous profile inputs: browser memory only; a visible **Clear inputs** action should reset them immediately; no local storage, cookies for profile data or backend persistence.
- Catalogue: versioned source records retained for provenance, with stale or erroneous records marked withdrawn and removed from active matching.
- Operational logs: proposed maximum 30 days, subject to platform capabilities, incident needs and privacy approval; never use logs as a shadow profile store.
- If a future release adds accounts/persistence, stop and define account deletion, backups, replicas, retention exceptions and confirmation behaviour before collecting the data.

### Incident handling proposal

1. Anyone identifying suspected exposure, unauthorised access, a secret leak or accidental collection reports it immediately to the named security/privacy owner through an agreed private channel.
2. The incident owner triages severity and affected systems; restrict access or disable the affected feature/resource promptly where safe.
3. Revoke/rotate exposed credentials and invalidate affected access; do not paste the exposed value into tickets or chat.
4. Preserve the minimum relevant technical evidence, avoid copying learner data, record timeline and actions, and restrict access to the incident record.
5. Assess scope, affected people, processor/provider obligations and any required regulator/data-subject notifications with the privacy owner and qualified adviser; do not make unsupported legal claims or delay escalation.
6. Fix the cause, verify containment, record corrective actions and lessons learned, and approve reopening only after checks pass.

**Owner-confirmed:** the project owner will hold the security/privacy role and act as incident contact for now. **Outstanding:** approve retention periods and the privacy notice; document applicable consent review with qualified advice where needed; verify hosting/telemetry behaviour; confirm the browser-only approach; and establish a private incident contact route.

## 5. Accountability and approvals

The project owner confirms they will hold all roles below for now. Their name was not provided in this conversation, so this document uses **Project owner (name not provided)** rather than inventing an identity. This single-person arrangement is accepted provisionally; it concentrates approval, implementation, privacy, billing and release responsibilities and provides no independent reviewer.

| Role | Named person | Minimum responsibility / approval |
|---|---|---|
| Accountable project/product approver | Project owner (owner-confirmed; name not provided) | Approves scope, acceptance criteria, budget trade-offs and PROJECT READY gate |
| Product owner | Project owner (owner-confirmed; name not provided) | Owns student journey, prioritisation, claims and demo acceptance |
| Catalogue/data curator + backup | Project owner (no backup appointed) | Verifies official sources, requirements, provenance, cycle/version and stale-data handling |
| Cloud/subscription owner | Project owner (subscription ownership owner-confirmed; access not independently verified) | Confirms tenant/subscription, permissions, regions, resource ownership, cost visibility and teardown |
| Budget approver | Project owner (owner-confirmed; name not provided) | Approves dated all-in estimate and confirms the R100/month cap |
| Security/privacy owner | Project owner (owner-confirmed; name not provided) | Reviews learner-data inventory, POPIA/consent questions, retention, logging, incident process and release risks |
| Release/demo owner | Project owner (owner-confirmed; name not provided) | Owns working demo, smoke-test evidence, deck, video, SSDLC and Lean Business Canvas submission |
| Engineering/QA owner | Project owner (owner-confirmed; name not provided) | Owns implementation traceability, tests, CI evidence and technical readiness |

The owner has accepted these roles provisionally for the pre-hackathon build and 23–26 October event window. Capacity, backup coverage and conflicts remain a risk. This assignment is not PROJECT READY approval; the owner must still explicitly approve/reject the readiness pack.

## 6. Hackathon programme verification

### Facts supported by the supplied FNB AOTY Hackathon 2026 programme

- The event is an apps-only hackathon. The programme permits a web app that can receive and process data in real time, as well as native apps and PWAs; static websites or CMS-only platforms are not eligible submissions.
- A participant may work alone, although a team is recommended. A team must be profiled on Sonke to be judged, including a solo participant; one person creates/profiles the team and can add members later.
- If entering an existing app, the team must work on at least one feature during the hackathon and participate in all programme sessions.
- Required submissions: a presentation deck (PDF preferred, no more than 10 slides); the deck should cover features, screenshots, demo details/account for judges, security, user journey and technical architecture; a demo video of no more than 90 seconds; completion of the SSDLC; and completion of the Lean Business Canvas.
- The submission checklist also says the PowerPoint slides must include the demo video and that a demo video link must be on the slides.
- There are no live presentations; submission is through Sonke by Monday at 23:59. Based on the programme's Friday 23 October to Sunday 25 October 2026 event dates, the Monday is **26 October 2026** (calendar inference). Confirm the exact Sonke deadline and upload procedure in the platform/with organisers.
- The programme describes judging criteria as Product, Creativity, Usability, Sustainability, Impact, Presentation and Intelligence, each weighted 10.

### Eligibility status for this team

**Owner-confirmed, partly verified.** The owner reports the team is profiled on Sonke and StudyPath SA is a new app being started before the hackathon; the Sonke profile has not been independently inspected. The concept aligns with “Access to higher education.” The app must be functional and process inputs/data, not be a static marketing page. Based on the reported new-app status, the existing-app feature requirement is not currently applicable, subject to event rules.

**Outstanding team-specific checks:**
- Independently verify Sonke profile visibility and participant registration.
- Treat this as a new app being developed before the event; reconfirm event/session rules and any platform-specific conditions.
- Confirm all team members are eligible/registered under the participant invitation and accept the IP rules. The supplied programme does not define a separate age/nationality/residency eligibility test, so do not invent one; ask organisers if unsure.
- Confirm exact Sonke deadline, file formats/size limits, how demo access is provided, and any updates to the supplied programme.

### Submission tracker

| Deliverable | Acceptance check | Owner | Status |
|---|---|---|---|
| Sonke team profile | Team is visible/profiled; solo team if working alone | Project owner (owner-confirmed) | Reported complete; not independently inspected |
| Working app | Real student journey processes inputs and produces a result; not static-only | Engineering/release — outstanding | Not started/verified |
| Feature developed during event (if existing app) | One feature identified and evidenced in the hackathon work | Project owner | Not applicable based on owner-confirmed new-app status; reconfirm against event rules |
| Deck, PDF preferred, maximum 10 slides | Features, screenshots, demo details, security, user journey, architecture; video included/linked | Release/demo owner — outstanding | Not started |
| Demo video | Duration at or below 90 seconds; accessible link on deck | Release/demo owner — outstanding | Not started |
| SSDLC in Sonke | Completed and reviewed before submission | Security/engineering owner — outstanding | Not started |
| Lean Business Canvas in Sonke | Completed and reviewed before submission | Product owner — outstanding | Not started |
| Submission | All required files submitted through Sonke by confirmed deadline | Release/demo owner — outstanding | Not verified |

## Gate decision

**PROJECT READY remains BLOCKED / NOT PASSED.** This evidence pack advances source discovery and documents a preliminary cost/privacy/hackathon assessment, but it does not resolve the following hard blockers:

1. Explicit approval of catalogue scope/source-use policy/cadence and verified admission records; the owner is assigned as curator but no backup is appointed.
2. Direct confirmation of Azure tenant/subscription details, effective permissions and billing visibility; subscription ownership is owner-confirmed but not independently verified.
3. A dated all-in pricing estimate and evidence the R100/month cap can be met. PostgreSQL pricing is a material risk.
4. Privacy/security review of the learner-data inventory, applicable consent questions, notice, retention/deletion and incident handling.
5. Independently verify the Sonke profile and confirm the exact deadline/upload procedure.

Do not start detailed PRD design or provision cloud services until the project owner records an explicit gate decision. If the budget requires a deviation from the documented stack, document and approve that change first.
