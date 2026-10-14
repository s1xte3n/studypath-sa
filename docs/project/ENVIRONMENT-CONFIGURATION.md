# StudyPath SA — Environment, Configuration and Secrets

Status: Draft inventory; no deployment configuration approved. Date: 2026-10-14.

## Current evidence boundary
Owner reports the app is not deployed. Application build/runtime configuration has not been verified in this planning pass. No Azure provisioning is authorised here. Architecture choice remains unresolved.

## Proposed environments
- Local development: synthetic fixtures only.
- CI/test: deterministic synthetic fixtures; lint, tests, schema checks and build must not require Azure credentials.
- Preview/staging: not configured/verified; synthetic data only.
- Public demo/production: not deployed; no real learner profiles and no persistent learner data.

## Configuration inventory
| Setting | Type | When needed | Rule |
|---|---|---|---|
| VITE_APP_ENV | Public build-time string | If environment label is needed | Allowlist values; no sensitive data |
| VITE_CATALOGUE_VERSION | Public build-time string | Versioned bundled catalogue | Must match catalogue metadata |
| VITE_PUBLIC_BASE_PATH | Public path | Only if host needs non-root path | Validate; no secrets |
| API_BASE_URL | Public URL | Only if API-first is approved | HTTPS outside local development; no credentials in URL |
| Telemetry configuration | Sensitive/operational | Only after explicit privacy review | Do not enable before fields/retention are reviewed; no learner data |
| Deployment identity/credentials | Secret or federated identity | Only for approved deployment workflow | Prefer short-lived OIDC/federation and least privilege |

Do not add every variable by default. For static-first, remove unnecessary API/telemetry settings. Vite-exposed values are public; never place tokens, keys, passwords or private connection strings in them.

## Rules
- Commit no secrets, personal identifiers, subscription IDs or unredacted portal screenshots.
- Use synthetic data only; never put marks, interests, location, funding inputs or tracker statuses in environment variables.
- Prefer least-privilege CI and short-lived deployment identity if deployment is later approved.
- Key Vault is only needed if the approved architecture has server-side secrets; do not provision it solely because the broader specification mentions it.
- Keep telemetry disabled until provider defaults, fields and retention have been reviewed.
- Before provisioning, review exact resource list, region, quotas and all-in expected spend against R100/month and obtain renewed explicit approval.

## Phase 5 gate
- [ ] Architecture approved.
- [ ] Only required variables retained; owner/default/type/environment documented.
- [ ] Secrets kept outside Git and client bundles.
- [ ] CI permissions minimized; synthetic fixtures used.
- [ ] Telemetry/privacy review recorded.
- [ ] No provisioning without explicit approval.
Gate: BLOCKED pending architecture and telemetry review.
