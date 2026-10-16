# StudyPath SA — Infrastructure and Delivery Architecture

**Status:** Proposed infrastructure plan; no resources provisioned and no deployment verified.  
**Budget:** Maximum R100/month total. **Current release slice:** D-047 local synthetic demo.

## Requirement drivers

`REQ-CAT-001`, `REQ-PRV-001`, `NFR-SEC-001`, `NFR-REL-001`, `NFR-ACC-001`, `NFR-DATA-001`, `NFR-PERF-001`; D-044 API-first direction; D-047 local-demo boundary; COST-01/R100 cap.

## Current and candidate components

| Component | Role | Status / gate |
|---|---|---|
| React + Vite | Browser application | Documented baseline; actual source/build state must be checked before claiming implementation |
| Local synthetic catalogue fixtures | Demo catalogue | Preferred current slice; source data must be reviewed and synthetic/non-personal |
| Static Web Apps | Candidate web hosting | Candidate only; verify plan, region, quotas, deployment path and cost |
| Azure Functions | Candidate API runtime | Candidate only; no provisioning before contract and cost review |
| Azure API Management | Optional gateway candidate | Need/plan/cost must be justified; do not assume required |
| PostgreSQL | Potential later catalogue/personal-data store | Not approved for current slice; no provisioning |
| Blob Storage | Upload storage | Out of current MVP scope; do not provision for this slice |
| Entra External ID | Future authenticated features | Not approved for current demo; provider/flow unresolved |
| Azure OpenAI / Document Intelligence | AI/document workflows | Deferred/out of current MVP; do not provision |
| Application Insights | Candidate monitoring | Only after telemetry privacy review, field filtering and cost review |
| Key Vault | Candidate secret store | Only if approved runtime has secrets; no client secrets |
| Terraform | IaC direction | Validate repository presence and configuration before claiming; no apply before plan review |
| GitHub Actions | CI/CD direction | Inspect current workflows and latest run results; no CI status inferred from planned workflows |

## Environments

| Environment | Purpose | Data policy | Credentials/resources |
|---|---|---|---|
| Local | Development and demo | Synthetic fixtures only; learner inputs memory-only | No cloud credentials required |
| CI/test | Automated validation | Synthetic fixtures; deterministic golden set | Minimal permissions; no production secrets |
| Staging | Future pre-release validation if approved | Synthetic only | Isolated from production; separate identities/config |
| Production | Not deployed | Real learner data prohibited until privacy/legal review and controls are verified | Separate resource group/config/identity/secrets; explicit approval and cost controls |

The broad specification's three Azure environments are not a command to provision them before scope, cost, privacy and operational requirements are accepted. D-047 explicitly limits the current demo to local and synthetic data.

## Network and access boundaries

- Current local slice: no Azure network, API gateway, database or storage is required.
- Later public catalogue API: HTTPS only; public read operations; restrictive CORS to approved frontend origin; schema validation; bounded requests; no profile-bearing endpoints.
- Catalogue publication is not an anonymous write API. Use reviewed pull requests or a separately approved curator access mechanism.
- Future private data services must use managed identity where supported, least privilege, network restrictions, encryption and audited access.
- Do not create public Blob containers or public database endpoints. Blob uploads are out of scope.

## IaC and repository organization

Use Terraform only after the exact infrastructure is approved. Prefer reusable modules and environment-specific roots, remote state with encryption/locking and restricted access, pinned provider versions, fmt/validate/plan checks, and reviewed plans. Keep secrets out of state where possible; treat state as sensitive. Never run `terraform apply` automatically against production without explicit approval.

The documented repository layout is a target, not evidence that paths exist. Before implementation, inspect the actual repo, workflows and configuration and reconcile any structure difference rather than moving files blindly.

## CI/CD strategy

1. Pull request: markdown/link checks as appropriate, lint, unit/reference tests, schema/contract tests, frontend build, dependency and secret scan.
2. If Terraform is introduced: `terraform fmt -check`, `terraform validate`, security/static checks, and plan artifact review; no apply in untrusted PR context.
3. Merge: rerun required checks on the exact merge commit; preserve run URL and commit SHA.
4. Deployment (only after approval): deploy a versioned artifact to the selected environment, verify health/smoke checks, record commit and deployment output.
5. Production promotion: manual approval, protected environment/secrets, non-destructive smoke tests and known rollback mechanism.
6. Failed health/smoke check blocks promotion; rollback to last known-good artifact where supported.

Current repo status notes historical contract-test workflow passes, but no app build, browser journey, runtime privacy, cloud provisioning, deployment or release verification is claimed. Inspect current Actions runs before relying on historical evidence.

## Cost controls

Before provisioning:
- Produce an exact resource inventory with SKU/plan, region, monthly usage assumptions, included quotas, storage/log retention, egress, support, domain and overage exposure.
- Revalidate provider pricing/quotas at the time of provisioning and use private billing evidence where needed.
- Confirm total stays under R100/month with a safety margin; a calculator estimate is not proof of the actual bill.
- Configure budget alerts and usage caps/alerts where available; alerts are not necessarily hard spending limits.
- Prefer local/free-tier options; do not introduce paid/metered dependencies without explicit owner approval.
- No resource provisioning is authorized by this document.

## Deployment and rollback

- Current target is a repeatable local demo; deployment is not yet approved.
- For static hosting, use immutable/versioned builds and preserve the prior known-good release; rollback by redeploying the prior artifact.
- For an API, deploy compatible contract/runtime versions and avoid destructive schema changes; rollback or forward-fix according to reviewed migration plan.
- Do not run migrations or provisioning as an unreviewed side effect of frontend deployment.
- Record deployment environment, artifact/commit SHA, CI run, smoke results, and approver.
- If deployment fails, leave the last known-good version active, block promotion, and record the error without exposing secrets or learner data.

## Recovery and availability

No numeric SLO, RTO or RPO is approved. For the local demo, version-control fixtures and source allow rollback by reverting a reviewed commit. For any persistent service, require documented backups, retention, restore test, owner, RTO/RPO and failure drills before release. Catalogue API outages must produce a recoverable UI error; never fabricate fallback records. Monitoring and alert thresholds require an approved runtime and budget.

## Infrastructure freeze checklist

- [ ] Confirm D-047 slice and target hosting.
- [ ] Confirm API Management necessity vs Functions/static catalogue alternative.
- [ ] Freeze region, service plans, quotas, network exposure, origins/CORS and API route contract.
- [ ] Review exact monthly cost/overage under R100.
- [ ] Verify tenant/subscription permissions and deployment owner privately.
- [ ] Approve identity/secrets model and provider telemetry/retention.
- [ ] Approve Terraform state backend, CI permissions, protected environments and rollback.
- [ ] Decide environments and minimum monitoring.
- [ ] Record approval in ADR and project decisions before provisioning.

**Gate:** No cloud infrastructure is authorized or verified.
