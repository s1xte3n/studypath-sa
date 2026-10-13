# StudyPath SA — Phase 0 Online Evidence and Owner Attestation

**Evidence date:** 2026-10-14 (repository/deployment update; public-source checks below were performed on 2026-10-13)  
**Repository:** https://github.com/s1xte3n/studypath-sa  
**Gate decision:** PROJECT READY — **PASSED for PRD/planning only**, based on the project owner's explicit confirmation that the remaining access, cost, operational and team checks have been completed, plus the public-source checks recorded below.  
**Important boundary:** This decision authorizes Phase 1 PRD work. It does not assert that application code, privacy controls, tests, CI/CD, Azure resources or a deployment exist. Cloud provisioning and learner-facing release remain subject to their own implementation, cost and release gates.

## 1. Evidence classification

- **Online-verified:** Facts visible in official public sources linked below as checked on 2026-10-13.
- **Owner-attested:** The project owner stated on 2026-10-13 that all previously listed checks are verified and confirmed the hackathon details. The owner has not uploaded redacted portal screenshots or a saved cost estimate to this repository; therefore, the assistant cannot independently inspect those account-specific records.
- **Not implemented / downstream gate:** Technical controls that can only be tested against an actual build remain implementation and release requirements.
- **Owner-supplied command output (2026-10-14):** Local Git state and tracked-file inventory are recorded below; the assistant did not directly access the local filesystem.
- **Owner-confirmed deployment state (2026-10-14):** The project has not been deployed. This is not a deployment failure; there is no live deployment to test.
- **Owner-supplied Azure portal details (2026-10-14):** The owner reports that the `StudyPath SA` subscription is `Active`, the owner role is `Owner`, and the plan is `Azure Plan`. The owner reports that no costs exist. The subscription ID and directory identifiers were intentionally not recorded in this repository. The billing scope, cost-analysis date range, and supporting screenshots were not independently inspected; this remains owner-attested evidence pending independent review.

## 2. Local repository and deployment state (owner-supplied evidence, 2026-10-14)

The project owner supplied command output for local path `Sixteen/Desktop/Projects/studypath-sa` showing:

- Branch: `main`.
- HEAD: `3a8f17e44c9c2f079b8ce71e14eebd56519cb52e` (`docs: fix checklist index formatting`).
- `git status`: clean; branch up to date with `origin/main`.
- `git rev-list --left-right --count main...origin/main`: `0 0`, indicating no local/remote commit divergence in that comparison.
- The supplied `git ls-files` listing contains `.gitignore`, `CONTRIBUTING.md`, `README.md`, `SECURITY.md`, and project documentation under `docs/project/`; it does not list app source, a package manifest, tests, CI workflow or infrastructure files.
- Deployment: the project owner confirmed StudyPath SA has not been deployed. No live URL, hosting resource, deployment history or smoke-test result is claimed.

**Evidence boundary:** These are owner-supplied command output and confirmation, not an independent local filesystem or Azure portal inspection. The Git result resolves the local working-tree/synchronisation caveat based on the supplied output. Deployment is now a known **not deployed** state, not an unresolved question about whether a deployment exists. Azure subscription/billing/cost evidence and the Sonke portal remain owner-attested or unverified as described below.

## 3. University of Johannesburg pilot catalogue — public-source checks

### UJ-BSC-IT — BSc in Information Technology

Official source: https://www.uj.ac.za/university-courses/bsc-in-information-technology/

The official programme page currently shows:
- Programme code **B2I01Q**; undergraduate; full-time.
- NQF level **7**, 360 credits.
- Campus: Auckland Park Kingsway; duration: 3 years.
- Applications open **1 April 2026** and close **31 October 2026**.
- Published minimum requirements: **APS 30**, English level 5 (60%+), Mathematics level 6 (70%+).

### UJ-DIP-BIT — Diploma in Business Information Technology

Official source: https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/

The official programme page currently shows:
- Programme code **DI1401**; undergraduate; full-time.
- NQF level **6**, 384 credits.
- Campus: Auckland Park Bunting Road; duration: 3 years.
- Applications open **1 April 2026** and close **31 October 2026**.
- Published minimum requirements: APS 22 with Mathematics, or 24 with Mathematical Literacy; English level 4 (50%); Mathematics/Technical Mathematics level 3 (40%) or Mathematical Literacy level 6 (70%).
- The page says selection is based on academic credit.

### General UJ undergraduate application information

Official source: https://www.uj.ac.za/admission-aid/undergraduate/important-information-before-you-apply/

The page states undergraduate curricular applications close at **12:00 on 31 October 2026**, that applicants should consult the current undergraduate prospectus, and that online applications are free. The page also warns that published information may change and applicants should rely on official UJ processes.

### Catalogue acceptance boundary

These public pages verify the listed programme identifiers, campus/mode/duration, stated minimum thresholds and 2026 application dates as displayed online. They do **not** provide every rule needed to guarantee an admission outcome or fully automate every applicant category.

For the MVP:
- Describe results as a **minimum-requirement screen**, not an admission prediction.
- Keep the source URL and verification date with every record.
- Use deterministic checks only for rules explicitly represented and verified.
- Return UNKNOWN whenever APS calculation details, applicant category, subject equivalency, additional rule, source freshness or input data is missing/ambiguous.
- Do not claim admission, selection, fees or funding outcomes.
- Recheck programme pages and the prospectus before release and refresh the catalogue at least every 30 days during active development.

## 4. Hosting and cost-source check

Official Microsoft sources:
- Static Web Apps pricing: https://azure.microsoft.com/en-us/pricing/details/app-service/static/
- Static Web Apps quotas: https://learn.microsoft.com/en-us/azure/static-web-apps/quotas
- Hosting plans: https://learn.microsoft.com/en-us/azure/static-web-apps/plans

The official pages describe a Free plan with 100 GB bandwidth per subscription/month, a 250 MB per-app deployment limit and 500 MB total storage across environments; if Free-plan quotas are exceeded, the site may stop serving rather than bill bandwidth overage. Standard has different billable terms. GitHub Actions/storage and any separately added services can have separate usage limits/costs.

This public-source check supports the **static-first Free-plan design**, but is not itself an all-in quote for the owner's subscription.

### Owner attestation — account-specific checks

On 2026-10-13, the project owner stated: **“Everything is verified.”** For Phase 0 recordkeeping, this is treated as the owner's attestation that the previously listed subscription/access, current resources, billing visibility, existing commitments, intended permissions, deployment responsibility and R100/month budget checks have been completed.

- Owner reports no StudyPath resources have been provisioned and current StudyPath resource spend is R0.
- Owner will not use Azure credits or rely on the expired 12-month Azure free-account offer.
- Azure Static Web Apps Free is the selected hosting direction.
- The project-wide hard cap remains **R100/month**.

**Evidence limitation (updated 2026-10-14):** The owner supplied the subscription status/role/plan details above and reports no costs exist. No sensitive subscription identifiers, billing records, screenshots or saved Pricing Calculator estimate were added to the repository. The cost statement is recorded as owner-supplied, not as independently inspected billing evidence; the exact billing scope and date range are not documented here. Before any resource is created, retain a private/redacted cost record, have a second reviewer inspect the portal evidence if available, and confirm that the intended deployment contains no paid or metered add-ons. Do not add PostgreSQL, APIM, separately billed Functions, AI, document extraction, paid monitoring or other billable services without a new cost review and explicit approval.

## 5. Hackathon programme and owner confirmation

Source: supplied FNB AOTY Hackathon 2026 - Programme.pdf (event briefing exported from Sonke on 11 October 2026).

The programme states:
- The hackathon runs **Friday 23 October to Sunday 25 October 2026**.
- It is apps-only. A web app must receive and process data in real time; static websites or CMS-only platforms are not eligible.
- Participants may work solo, but a team must be profiled on Sonke to be judged.
- Submission is through Sonke by **Monday at 23:59**. From the programme dates, the Monday is **26 October 2026**.
- Deliverables: PDF deck preferred, maximum 10 slides; demo video no more than 90 seconds; SSDLC completion; Lean Business Canvas completion. The deck must include the demo video/link and cover features, screenshots, demo details, security, user journey and technical architecture.
- The programme lists Product, Creativity, Usability, Sustainability, Impact, Presentation and Intelligence as judging criteria, each weighted 10.

The project owner confirms that the Sonke team profile is complete and StudyPath SA is a new app being developed before the hackathon. This is an owner attestation; the Sonke portal itself was not accessed in this review. The programme gives a submission deadline of Monday 23:59 but does not specify a timezone in the extracted text. Confirm the displayed portal deadline/timezone when preparing final submission.

## 6. Readiness decision and boundaries

### Decision

**PROJECT READY — PASSED for Phase 1 (PRD and requirements planning), dated 2026-10-13.**

Basis:
1. Owner explicitly approved COST-01, DATA-01, ELIGIBILITY-01, PRIVACY-01, RELEASE-01 and OWNER-01.
2. Owner approved the associated Phase 0 direction and now attests that all account-specific and operational checks have been completed.
3. Official UJ programme and Microsoft hosting/quota pages were checked online and recorded above.
4. The supplied hackathon programme was reviewed and the owner confirmed the team-profile/new-app statements.
5. The initial catalogue is deliberately limited to two UJ IT pathways and is constrained to minimum-requirement screening with UNKNOWN on ambiguity.

### What this gate authorizes

- Start PRD drafting, user stories, acceptance criteria and a requirements traceability matrix.
- Continue planning against the approved static-first architecture and synthetic-data-only boundary.
- Prepare the catalogue schema with provenance and explicit unknown states.

### What this gate does not authorize or claim

- It does not claim that the app has been implemented, tested, built, deployed or submitted.
- It does not independently certify the owner's Azure billing/account records or provide a legal opinion or POPIA compliance certification.
- It does not permit real learner data, uploads, accounts, persistence, profile analytics or AI processing.
- It does not automatically authorize Azure provisioning. Before provisioning, the actual planned resources must be rechecked against the R100/month cap and the private owner cost record; obtain explicit approval for any billable service.
- It does not permit final admission predictions. Full eligibility outcomes must remain UNKNOWN wherever rules are incomplete or ambiguous.

## 7. Next gate

**Phase 1 — PRD approval.** Define measurable acceptance criteria and scope, map requirements to tests, and keep the initial MVP real-time interactive (not a static landing page). Subsequent gates must verify implementation, privacy behaviour, tests, CI/CD, cost, deployment and release evidence before public learner-facing use.


## 8. Azure cost estimate follow-up — 2026-10-14

Created [`AZURE-COST-ESTIMATE.md`](AZURE-COST-ESTIMATE.md) as a preliminary estimate worksheet. The selected baseline is one Azure Static Web Apps Free app, with an estimated Azure recurring cost of **R0/month** for that service only. The estimate excludes Functions/APIs, PostgreSQL, API Management, Azure OpenAI, Document Intelligence, Front Door, paid monitoring, domain registration, and potential third-party/GitHub usage charges. The public Microsoft pricing page and quota documentation support the Free-plan baseline and its quota limitations.

**Evidence boundary:** the worksheet is not a saved Azure Pricing Calculator quote and does not verify account-specific prices, currency/tax treatment, billing scope, or Cost Analysis. The owner must save/review the signed-in calculator result and privately inspect current Cost Analysis before provisioning. No resources were created as part of this estimate; the R100/month cap and explicit no-provisioning boundary remain in force.
