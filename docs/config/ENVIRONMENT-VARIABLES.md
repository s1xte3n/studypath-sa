# Environment Variables — Hackathon MVP

**Status:** Initial inventory from current repository inspection. No cloud runtime is approved by this document.

| Name | Consumer | Type / validation | Required environment | Source / default | Secret? / commit? | Failure behaviour |
|---|---|---|---|---|---|---|
| No application-specific variable currently required | React/Vite local browser app | Not applicable | Local, CI | Static imports and Vite defaults | Not applicable | Build/test failure is surfaced by npm exit code |
| Node.js version | GitHub Actions workflows | Runtime version; currently Node.js 22 in browser build workflow | CI | Workflow configuration | No / yes | CI fails if install/test/build fails |
| API_BASE_URL | Proposed Postman environment only; not consumed by app code | HTTP(S) URL for an explicitly approved test target | Manual API contract testing | User-configured; no default live host | No / yes if non-sensitive | Requests cannot run without a valid target |

No verified runtime variables for Azure, PostgreSQL, Blob Storage, Entra External ID, Azure OpenAI, Application Insights, or Key Vault were found in the inspected local MVP source. Do not add guessed variables or claim these services are configured. The local MVP imports draft catalogue data at build time and does not call a hosted API.

Before adding a variable, identify its source-code consumer, type, requiredness, validation, default, failure behavior, tests and owner; update this inventory. Variables prefixed VITE_ are public browser-bundle values and must never contain secrets.
