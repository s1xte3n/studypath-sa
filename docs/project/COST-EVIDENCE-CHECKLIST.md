# StudyPath SA — Owner-Only Monthly Cost Evidence Checklist

**Budget ceiling:** R100/month for the complete project.  
**Current status:** NOT CERTIFIED.  
**Purpose:** Collect only the minimum evidence needed to decide whether Option B can fit the cap.  
**Privacy:** Billing screenshots, subscription IDs, tenant IDs, account numbers, payment details, and resource identifiers must stay private. Do not commit screenshots or identifiers to this repository.

## Why the current estimate is insufficient

Static Web Apps Free has a published $0 price, but that does not certify the total cost of the integrated Functions API, monitoring, bandwidth or ancillary services, GitHub Actions, taxes, currency conversion, or any existing subscription charges. Public pricing alone cannot establish eligibility for subscription-specific free grants.

## Owner checks — perform in the Azure/GitHub accounts privately

| ID | Check | Evidence to record here (no identifiers) | Gate |
|---|---|---|---|
| COST-001 | Confirm the Azure subscription billing offer/type and whether Azure Functions Consumption free grants apply to this subscription and this managed API usage | `Confirmed / Not confirmed / Not applicable`; date checked | Required |
| COST-002 | In Azure Cost Management, inspect current month-to-date costs and prior comparable month; distinguish existing baseline from this project | Redacted category totals and currency only | Required |
| COST-003 | Verify the applicable Functions Consumption execution and GB-second rates, grant limits, and whether any grant is shared with other workloads | Price source/date; grant eligibility status | Required |
| COST-004 | Estimate traffic scenarios for 10k, 100k, and 1M monthly catalogue reads using observed/benchmarked duration and memory; include executions and GB-seconds | Scenario totals and assumptions | Required |
| COST-005 | Identify all ancillary charge paths: outbound bandwidth, storage, logging/Application Insights, DNS/domain, API Management or other gateway, and any paid monitoring | Each included or explicitly excluded with reason | Required |
| COST-006 | Confirm GitHub Actions included minutes/storage and current usage for this private repository; identify any likely overage | Included allowance and usage totals, no account IDs | Required |
| COST-007 | Confirm billing currency, tax/VAT treatment, FX conversion approach, and an explicit contingency reserve | Currency and conservative conversion date/rate; tax assumption | Required |
| COST-008 | Define usage stop controls and an alert threshold below R100; note that budget alerts notify and do not necessarily stop charges | Alert threshold, owner, stop procedure | Required |
| COST-009 | Add existing project spend plus projected incremental spend and contingency | Total in ZAR per month | Required |
| COST-010 | Owner signs off that the conservative all-in total is below R100/month and accepts the documented Free-plan no-SLA/quota risks | `Approved / Rejected`; date | Required |

## Calculation template

For each monthly scenario, calculate:

`Total ZAR = (Functions execution charge + Functions compute charge + bandwidth + storage + monitoring + other Azure charges) × conservative FX/tax factor + incremental GitHub Actions cost + existing project baseline`

Do not subtract free grants until COST-001 confirms eligibility and how they are shared. Avoid double-counting included GitHub/Azure allowances; record the source and date for every price.

The published illustrative calculation in `docs/api/OPTION-B-VALIDATION-EVIDENCE.md` is a sensitivity example, not an invoice estimate or a certification of the R100 cap.

## Required evidence output (safe to commit)

- Check date.
- Price sources and price effective dates.
- Grant eligibility status (no subscription identifiers).
- Three monthly request scenarios and assumed memory/duration.
- Included/excluded cost categories with reasons.
- Conservative ZAR conversion/tax assumptions.
- Existing project baseline, projected incremental total, contingency.
- Owner decision and next review date.

## Decision rule

- **PASS:** every category is accounted for, private account checks are complete, conservative all-in total plus contingency is below R100/month, and cost alerts/stop procedures are recorded.
- **FAIL:** expected total is at/above R100, or a required cost is unbounded/unverified.
- **BLOCKED:** account-specific evidence is unavailable or incomplete.

No Azure resources or paid services may be provisioned based on this checklist. Cost certification is a prerequisite for a separate decision; it is not deployment authorization.
