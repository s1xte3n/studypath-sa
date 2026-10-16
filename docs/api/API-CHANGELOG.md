# StudyPath SA — API Contract Changelog

## 1.0.0-draft — 2026-10-16

Initial Phase 4 contract baseline created for review.

- Defined public, anonymous, read-only catalogue operations: `GET /api/v1/programmes` and `GET /api/v1/funding-opportunities`.
- Defined browser-local interfaces for deterministic anonymous matching and page-memory application tracking; these are not HTTP endpoints.
- Froze lowerCamelCase JSON properties, uppercase enum values, stable opaque catalogue ID syntax, UTC RFC 3339 timestamps, ISO date values, nullable/required conventions, error envelope, stable ordering and bounded-pilot list semantics.
- Explicitly excluded learner input/result/tracker data from API requests, URLs, browser storage, analytics, logs and error telemetry.
- Explicitly excluded tracker persistence/sync, profile endpoints, authenticated match routes, uploads, AI, direct application submission, admin writes and health routes.
- Defined source provenance, applicable-cycle, catalogue freshness, deterministic eligibility and no-fabricated-data rules.
- Kept API Management/provider composition, cache TTL, CORS origins, numeric rate limits, retry/timeouts and cloud cost as open deployment-profile gates under OR-019/Q-018; no provisioning is authorized.

### Contract decisions to review

1. Confirm the field inventory and enum names against the final catalogue data model.
2. Confirm whether the bounded pilot needs a dedicated detail endpoint; this draft keeps all supported details in the list response to avoid adding an unapproved route.
3. Approve the deployment profile for CORS, cache, rate limiting, timeouts/retries, provider logging/retention and cost before implementation.
4. Do not freeze authenticated feature routes until Q-018/Q-020 lifecycle, identity, consent, authorization/isolation and cost decisions are complete.

### Compatibility rules

Breaking wire changes require a major version namespace and migration plan. Additive optional fields may be introduced within v1 only if clients tolerate unknown properties. Changing requiredness, nullability, enum values, ID meaning, sort semantics, or error codes is breaking. Update all contract documents, OpenAPI and tests before dependent code.


## 1.0.0-draft follow-up — validation automation (2026-10-16)

- Added `.github/workflows/openapi-validation.yml` to run pinned Redocly CLI `lint --extends spec` against the OpenAPI 3.1 document and execute `node --test` on pull requests/pushes affecting API docs or contract tests.
- Added `tests/contracts/openapi-contract.test.mjs` for route inventory, anonymous/read-only scope, response status presence, schema declarations and learner-data privacy invariants.
- Initial CI evidence: Redocly OpenAPI lint passed on PR #87; 3 of 33 Node tests failed because assertions expected enum values in OpenAPI rather than the reusable Markdown schema, and expected route/privacy wording in the wrong document. Corrective assertions are proposed on `fix/phase-4-contract-ci`; contract approval remains blocked until the follow-up run passes.


## 1.0.0-draft follow-up — contract CI corrected (2026-10-16)

- PR #89 corrected two remaining test assertions: route paths are checked against the contract/endpoint inventory rather than the path-variable inventory, and the tracker privacy assertion now matches the documented IF-002 wording.
- All three workflows passed on merge commit `bbad7b869a1e2e59184d37c486a7185d70e809f5`: [OpenAPI validation](https://github.com/s1xte3n/studypath-sa/actions/runs/38912794797), [contract tests](https://github.com/s1xte3n/studypath-sa/actions/runs/38912794987), and [UJ eligibility golden-case verification](https://github.com/s1xte3n/studypath-sa/actions/runs/38912795061).
- This closes the current automated assertion failures only. Contract owner review, runtime/provider/network and cost decisions, verified catalogue records, implementation and runtime privacy verification remain open; this draft is not yet approved for implementation.


## Owner approval update — 2026-10-16

The product owner explicitly approved proceeding with the current public catalogue wire-contract baseline. Scope remains limited to anonymous read-only catalogue retrieval at `GET /api/v1/programmes` and `GET /api/v1/funding-opportunities`; learner matching and manual tracking remain browser-local. This approval does not authorize implementation, provisioning, paid services, authenticated endpoints or real learner data. Runtime/provider settings, cost, source-backed catalogue publication and runtime privacy evidence remain open.
