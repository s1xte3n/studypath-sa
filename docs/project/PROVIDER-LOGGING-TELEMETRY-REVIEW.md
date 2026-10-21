# Provider Logging and Telemetry Review — Local-Only Scope

**Review date:** 2026-10-21  
**Decision owner:** Project owner (decision supplied in project conversation)  
**Status:** Local-only review documented; provider-specific verification deferred until before deployment  
**Applies to:** Current synthetic-only local browser demo  
**Does not apply to:** A deployed Azure environment, production/public demo, authenticated features, or real learner data

## Owner-approved decisions

The project owner confirmed:

- **Intended hosting:** Microsoft Azure is planned, not currently deployed.
- **Current deployment:** local-only.
- **Permitted data:** synthetic/demo data only.
- **Telemetry policy:** accept provider-default logging only after reviewing the provider's documented terms and retention.
- **Checklist scope:** document the local-only review now; keep provider-specific verification as a mandatory pre-deployment gate.

These decisions set scope and acceptance criteria. They do not constitute evidence that any provider's terms, logging configuration, telemetry, or retention have been inspected.

## Evidence reviewed

Repository evidence reviewed for this scoped assessment:

- `package.json`: the declared runtime dependencies are React, React DOM, Vite and the Vite React plugin; no dedicated analytics SDK is declared.
- `vite.config.js`: configures local Vite development and preview hosts as `127.0.0.1`; this is local-tool configuration, not an Azure hosting configuration.
- `index.html`: contains standard document metadata and loads the local application entry point; no explicit third-party analytics script is present in this file.
- `src/main.jsx`: learner inputs are held in React component state; the visible privacy notice says entries remain in page memory and are not sent to a server or saved across reloads.
- `tests/e2e/student-form.spec.mjs` and `docs/project/G-SYN-001-SYNTHETIC-ONLY-MVP-GATE.md`: browser tests cover selected request, URL/history, storage, cookie, reload/fresh-tab, console/error and lifecycle channels. These checks are scoped to the instrumented browser test context and the currently implemented form.

## Findings and confidence boundary

| Area | Finding | Evidence status |
|---|---|---|
| Application-declared analytics | No dedicated analytics SDK is declared in the current package manifest. | Verified by repository inspection; does not prove transitive packages or hosting telemetry are absent. |
| Application data flow | Current form state is held in page memory; the app does not currently submit learner data to an application API. | Supported by inspected implementation and selected browser tests; not a universal runtime guarantee. |
| Local development host | Vite dev and preview are configured for loopback. | Verified in `vite.config.js`. |
| Azure deployment/configuration | No deployed Azure environment or deployment-specific configuration was available in the reviewed evidence. | Not verified; project status records local-only/not deployed. |
| Host/provider request logs | Actual fields collected, access, retention and deletion behavior have not been inspected. | **Unknown / not verified.** |
| Provider/platform telemetry | Azure service diagnostics, platform logs, CDN/DNS/network layers (if later used), and any third-party processing have not been configured or inspected. | **Unknown / not verified.** |
| Provider terms and retention | No provider-specific terms/retention review evidence is recorded by this assessment. | **Pending pre-deployment review.** |
| CI provider logs | GitHub Actions is used for CI; its workflow logs are not proof of Azure hosting behavior. Do not place real learner data or secrets in test output. | Separate provider boundary; this review does not certify GitHub retention settings. |

## Required controls for the current local-only demo

1. Use synthetic/demo data only. Do not enter real learner data.
2. Keep the demo local; do not imply that local tests establish Azure or public-hosting behavior.
3. Keep learner inputs, results and tracker entries out of URLs, application requests, console output, analytics and error telemetry.
4. Treat selected browser privacy tests as evidence for their tested cases only. They do not prove the absence of browser extensions, operating-system telemetry, provider-side processing, or untested code paths.
5. Do not mark the overall synthetic-only MVP gate passed based on this document. Other implementation, catalogue, accessibility, test and release requirements remain separate.

## Mandatory pre-deployment evidence gate

Before any Azure/public deployment is approved, record evidence for the exact services and configuration proposed for that deployment:

- Identify every selected Azure service and any external DNS, CDN, monitoring, error-reporting, analytics or CI service that can observe traffic or data.
- Review the applicable official provider documentation/terms for diagnostic logs, request/URL fields, IP and other metadata, cookies, telemetry, access, retention, deletion and regional processing.
- Inspect the actual deployment configuration and defaults; document enabled log categories, destinations, sampling, redaction, access permissions and retention periods.
- Disable optional analytics and unnecessary diagnostics; where logs are required, avoid request-body capture and redact learner-related fields where supported.
- Confirm learner profiles are not placed in URLs, request bodies, telemetry, traces, logs, error reports or third-party prompts.
- Verify the privacy notice accurately describes unavoidable processing. Record any unresolved legal/privacy questions for qualified review before real learner data is considered.
- Capture dated evidence (official documentation links, relevant settings/export screenshots with secrets and identifiers redacted, configuration commit, and reviewer decision).
- Re-run the applicable deployed-environment privacy checks after configuration and before public use. Re-review if services, configuration or data flows change.

**Release rule:** If provider defaults or retention cannot be established, do not assume they are acceptable. Keep deployment blocked until the uncertainty is resolved and separately approved. This is consistent with the R100/month cap and existing no-provisioning/no-deployment gate.

## Checklist disposition

- [x] **Local-only application and repository review documented** for the current synthetic-only demo, within the evidence boundary above.
- [ ] **Provider-specific logging, telemetry and retention verified** — deferred; cannot be completed before the actual provider services and deployment configuration exist and are inspected.
- [ ] **Public deployment/privacy gate** — remains blocked until all pre-deployment evidence and other release gates pass.

This scoped checklist completion is not a claim of legal compliance, complete privacy assurance, provider-log verification, Azure configuration verification, deployment, or release readiness.
