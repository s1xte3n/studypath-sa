# StudyPath SA — Architecture Contract Decision Note

**Status:** Historical Phase 3 draft; superseded as the canonical interface specification by [`docs/api/API-CONTRACT.md`](../api/API-CONTRACT.md) and its supporting schemas, endpoint inventory, error contract, variables, examples, changelog and OpenAPI file.
**Architecture authority:** D-044–D-050 and `docs/architecture/ARCHITECTURE.md`.
**Last reconciled:** 2026-10-16.

The original architecture-stage contract draft is retained for historical traceability. Do not implement directly from its candidate route list. Phase 4 defines the public contract as:
- `GET /api/v1/programmes` — public read-only, curated programme catalogue.
- `GET /api/v1/funding-opportunities` — public read-only, curated funding catalogue.
- Anonymous matching (IF-001) and manual tracker (IF-002) are browser-local interfaces, not HTTP endpoints.

The anonymous privacy boundary is unchanged: learner inputs, matching results and tracker entries remain in page memory and MUST NOT be transmitted to APIs, URLs, browser storage, analytics, application logs or error telemetry. The tracker has no persistence/sync endpoint. Authenticated routes, profile writes, saved pathways/funding, comparison/dashboard endpoints, uploads, AI, direct application submission, admin writes and health routes remain outside this contract.

The Phase 4 contract is a draft, not implementation-ready evidence. OR-019/Q-018 runtime/provider composition, CORS, caching, timeout/retry and rate-limit profile, provider logging/retention, cost, catalogue/funding publication, contract tests, runtime privacy verification and deployment remain open. No real learner data or Azure provisioning is authorized by this note.