# StudyPath SA — Azure Cost Estimate

**Estimate date:** 2026-10-14  
**Status:** Preliminary estimate completed from public Microsoft pricing; **not** a saved Azure Pricing Calculator quote  
**Budget limit:** R100/month total  
**Deployment status:** Not deployed; no StudyPath Azure resources are reported as provisioned  
**Approval boundary:** This estimate does not authorize provisioning.

## 1. Estimate summary

| Item | Proposed configuration | Estimated Azure monthly cost | Basis |
|---|---|---:|---|
| Azure Static Web Apps | Free plan; one app; static React/Vite build; client-side deterministic matching; read-only catalogue bundled with app | R0 | Microsoft lists the Free plan as free |
| Azure Functions / API | Excluded; no backend API in this MVP estimate | R0 included | Not deployed or costed; adding Functions may incur consumption charges |
| Azure Database for PostgreSQL | Excluded | R0 included | Not part of the static-first MVP |
| API Management | Excluded | R0 included | Not part of the static-first MVP |
| Azure OpenAI / Document Intelligence | Excluded | R0 included | AI chat and document extraction are out of scope |
| Application Insights / other paid monitoring | Excluded | R0 included | No separately billed monitoring resource assumed |
| Custom domain registration | Not included; use the Azure-provided hostname for the MVP | Not estimated | Registrar charges are outside Azure hosting price |
| **Estimated Azure recurring total for the listed MVP configuration** | **Azure Static Web Apps Free only** | **R0/month** | **Conditional estimate; see limitations below** |

The estimate is R0 only while the deployed design remains within the listed Free plan and does not add paid or separately metered resources. It is not a guarantee that every project-related cost (for example, third-party domain registration or GitHub usage beyond applicable allowances) is zero.

## 2. Azure Pricing Calculator worksheet

Open the official [Azure Pricing Calculator](https://azure.microsoft.com/en-us/pricing/calculator/) and add only the service below for this MVP estimate:

- **Service:** Static Web Apps
- **Plan/SKU:** Free
- **Quantity:** 1 app
- **Usage period:** 730 hours/month if the calculator requires an hours input; the Free plan itself is listed at no charge
- **Region:** no region-specific paid SKU is assumed for this Free-plan estimate; select the intended deployment region if the calculator requires one
- **Currency:** ZAR, if available in the calculator; otherwise record the displayed currency and do not silently convert it
- **APIs / Functions:** none added
- **Other Azure services:** none added
- **Support plan / custom domain / Front Door / database / monitoring:** do not add for this baseline

Save or export the calculator result privately, then record the date, currency, service configuration, and displayed total. Do not commit subscription IDs, tenant IDs, account identifiers, billing details, or unredacted portal screenshots to the repository.

## 3. Free-plan limits and behaviour

Microsoft's published Static Web Apps pricing and quota pages list the following Free-plan limits:

- 100 GB bandwidth per subscription per month.
- 250 MB maximum size per app deployment.
- 500 MB total storage across environments.
- Up to 10 Free-plan apps per subscription.
- No SLA on the Free plan.
- If Free-plan quotas are exceeded, the app may stop being served; the Free plan does not provide paid bandwidth overage billing.

GitHub Actions and Packages have separate quotas and billing rules. The Azure Free-plan price does not prove that all GitHub usage is free under every account or workload.

## 4. Sources

1. Microsoft Azure Static Web Apps pricing: https://azure.microsoft.com/en-us/pricing/details/app-service/static/
2. Microsoft Learn — Static Web Apps quotas: https://learn.microsoft.com/en-us/azure/static-web-apps/quotas
3. Microsoft Learn — Static Web Apps hosting plans: https://learn.microsoft.com/en-us/azure/static-web-apps/plans
4. Official Azure Pricing Calculator: https://azure.microsoft.com/en-us/pricing/calculator/

Public sources were checked on 2026-10-14. Microsoft notes that calculator prices are estimates and can vary by agreement, date, currency conversion, and taxes. The public Free-plan listing supports the R0 baseline, but no authenticated subscription-specific calculator quote or billing evidence was available to inspect.

## 5. Assumptions and exclusions

### Assumptions
- One StudyPath SA web app, anonymous-first.
- React/Vite static build; pathway filtering/matching runs in the browser.
- Small read-only catalogue shipped with the app.
- No API calls to Azure services at runtime.
- No user accounts, uploads, cross-session saves, database, AI calls, or separately billed telemetry.
- Azure Static Web Apps Free is accepted for the hackathon/demo baseline.

### Exclusions
- Paid Static Web Apps Standard plan, Azure Functions consumption, PostgreSQL, API Management, Azure OpenAI, Document Intelligence, Front Door, paid monitoring, support plans, domain registration, and any other add-ons.
- GitHub plan/usage charges and other third-party costs.
- Taxes, currency effects, and account-specific discounts or agreements not reflected in a signed-in calculator estimate.

## 6. Cost controls and decision

1. **Hard cap:** R100/month total project spend.
2. **Baseline decision:** use Static Web Apps Free only; no paid or metered add-ons.
3. **Before provisioning:** save the Azure Pricing Calculator result, confirm the subscription/billing scope and current Cost Analysis period privately, and compare the exact planned resource list with this estimate.
4. **Change control:** any added Azure service, plan upgrade, custom domain, or paid monitoring requires a new estimate and explicit owner approval.
5. **Quota monitoring:** review bandwidth, deployment size, storage, GitHub Actions usage, and actual Cost Analysis after deployment.
6. **Stop condition:** do not provision if the expected all-in monthly cost cannot be shown to remain within R100/month.

## 7. Evidence status

- **Online-verified:** Microsoft publicly lists Azure Static Web Apps Free at no charge and publishes the quotas above.
- **Owner-attested:** project owner reports an Active Azure subscription and no current StudyPath resource costs as of 2026-10-14.
- **Not independently verified:** subscription-specific calculator result, billing scope/date range, cost screenshots, and any account-specific pricing.
- **Not performed:** Azure resources have not been provisioned; no deployment or post-deployment cost observation exists.

**Disposition:** Preliminary baseline is within the budget on Azure service list price (**R0/month for Static Web Apps Free only**). Keep the estimate marked preliminary until the owner saves and reviews the authenticated calculator result and private billing evidence.