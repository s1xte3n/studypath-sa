# Secrets Management — Hackathon MVP

## Current finding

The inspected browser-only implementation and browser-build workflow do not require an application secret. This is not a claim that repository secrets or Azure configuration have been audited. No secret values belong in this file.

## Rules

- Do not add secrets to React/Vite source, VITE_* variables, Postman templates, fixtures, screenshots, logs or test output.
- Do not commit .env files containing credentials. Keep local secret files ignored; provide a safe example only when a real consumer is introduced.
- If a hosted service is approved, use the approved secret store (Azure Key Vault) and managed identity where supported; scope access to the minimum required role.
- Record each new secret's exact name, consumer, approved source, access owner, rotation policy and compromise response before implementing integration.
- Never claim a GitHub Actions secret exists without checking through an authorized process. Never print secret values.
- On suspected exposure: stop use, notify the owner, revoke/rotate at source, review audit logs, remove exposed copies where possible and record incident scope.

Azure database credentials, storage keys, Entra credentials, AI keys and telemetry connection strings are not required by the current local slice and must not be invented. Future integrations require architecture, cost, privacy, environment and security review.
