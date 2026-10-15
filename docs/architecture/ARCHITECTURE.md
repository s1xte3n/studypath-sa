# StudyPath SA — API-First MVP Architecture

**Status:** Draft based on owner decisions D-044 (2026-10-14) and D-045 (2026-10-15).  
**Gate:** Tiered product direction selected; authenticated runtime, identity/authorization, privacy/security, final contract, cost and provider evidence remain open.

## Approved direction
Use an API-first design and review the versioned interface before implementing dependent components. Start programme curation from the official UJ 2027 undergraduate prospectus, expanding only after each record is verified. This supersedes D-019's static-first choice only; it does not approve accounts, profile persistence, database writes, AI, uploads, application submission or deployment.

## Tiered data boundary (D-045; design direction only)
- **Anonymous/non-logged-in:** public curated programme/funding catalogue API only; deterministic matching runs client-side. Learner marks, subjects, interests, results and tracker entries remain in page memory and must never be sent to an API, URL, analytics, application log or error telemetry.
- **Authenticated/logged-in:** server-side matching is the intended direction, using only explicitly approved profile fields over HTTPS in an authenticated request. Do not put profile values in URLs or telemetry; exclude profile payloads from application/error logs. Server-side matching must not be implemented until the identity provider, authentication flow, server-side authorization, account isolation, data minimisation, consent/notice, logging/retention/deletion, error/cache behavior, threat model, tests and cost are approved.
- Login does not itself authorize profile persistence, saved pathways, cross-session tracker sync, profile storage or any unspecified special feature. Q-020 requires each account-gated feature and data lifecycle to be explicitly defined.
- No real learner data in development/demo; use synthetic data. Real learner data remains blocked until applicable privacy/legal review and implementation verification are complete.
- Database, Blob Storage, profile persistence, uploads and cloud sync remain out of scope unless a later approved change explicitly includes them.
- Use synthetic data for development/demo. Real learner data remains prohibited until applicable privacy/legal review and implementation verification are complete.
- Funding flow must not ask for national ID, household income, bank details, family/financial documents or other sensitive financial data. If a material criterion is unsupported or sensitive, disclose uncertainty and direct the learner to official checks.

## Logical components
1. React/Vite learner client: accessible explorer, results/details, funding view and memory-only tracker.
2. API client/adapter: HTTPS requests, schema validation, bounded loading/error states; no profile fields in requests.
3. Programme catalogue API: public curated records with source/cycle/freshness/version/sign-off metadata.
4. Funding catalogue API: public official-provider records and provenance; anonymous funding matching stays client-side. Authenticated server-side funding matching is not approved until its input fields and privacy/security contract are separately specified.
5. Deterministic evaluator: approved rules only; anonymous matching runs client-side; authenticated matching may run server-side only after the gates in D-045/Q-020 pass. Both paths must return ELIGIBLE, NOT_ELIGIBLE or UNKNOWN with sourced reasons; stale/unrepresentable rules never yield ELIGIBLE.
6. Human-curated source/review process; no record is publication-ready until provenance, applicable cycle, verification and curator sign-off are complete.
7. Operational/security controls: HTTPS, no client secrets, inspect provider logs/retention, no profile telemetry, and cost review for approved runtime.

## Runtime and cost constraints
Azure Static Web Apps, API Management and Azure Functions are candidates from the documented baseline, not verified provisioned services. Before approving runtime:
- Compare hosting, Functions, optional API Management, monitoring and egress costs/quotas against the hard **R100/month** cap.
- Verify service availability, quotas, region support, network configuration and provider retention/security logs.
- Decide whether API Management is necessary; record any approved deviation from the documented baseline.
- No resources may be provisioned until the exact resource list, costs, quotas, access and rollback/deployment responsibilities are reviewed.
- Do not introduce PostgreSQL, Blob Storage, Entra External ID, Azure OpenAI or Document Intelligence into the initial learner journey without explicit change control.

## API design constraints
- Base path: `/api/v1`.
- Draft route/schema candidates are in `API-CONTRACT.md`; they are not frozen for implementation.
- Public read endpoints only under the interim privacy boundary. No endpoint accepts learner marks, subjects, interests, profile data, results or tracker entries.
- Responses carry catalogue version and provenance. A successful HTTP response does not prove records are verified or eligible for definitive screening.
- API failure, malformed responses, stale data or missing provenance must produce an honest recoverable state, never fabricated fallback data.
- Define cache freshness, timeout/retry behavior and error schema before implementation; do not claim a numeric availability SLO without approval.

## Trust boundaries
| Boundary | Data allowed | Required control |
|---|---|---|
| Browser → catalogue API | Public catalogue request only; no learner profile | Inspect URL/headers/body; no profile values in query parameters |
| API → browser | Public curated records and provenance | Validate schema and source/cycle/freshness |
| Browser memory | Temporary profile, results and tracker entries | Reset clears; reload/exit ends session; no browser storage persistence |
| Runtime/provider logs | Technical request/host metadata may be generated | Inspect actual fields, access and retention before public demo; never log profile values |
| Curator → catalogue | Official-source records and review metadata | Required provenance, cycle, verification date, version and curator sign-off |

## Open decisions/evidence
- D-045 resolves the product direction: anonymous catalogue-only/client-side matching; authenticated server-side matching. Q-018 remains open for the authenticated contract, privacy/security, identity/authorization and cost gates; Q-020 defines account-gated features and data lifecycle.
- Runtime/cost: choose Functions/API Management composition and prove complete cost stays within R100/month.
- Contract: approve paths, schemas, error format, cache semantics, timeout/retry, CORS and version compatibility.
- Privacy: inspect provider logging/retention, API logs, request payloads, dependencies, browser storage/history and privacy notice.
- Data: verify 6–8 programme records and 3–5 funding records; curate subject IDs and relationship evidence.
- Delivery: no app source, automated tests, CI, infrastructure validation or deployment is verified by this document.

**Gate: DIRECTION SELECTED / NOT READY FOR IMPLEMENTATION.**