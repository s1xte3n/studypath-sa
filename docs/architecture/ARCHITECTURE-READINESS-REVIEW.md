# StudyPath SA — Architecture Readiness Gate Review

**Gate:** Phase 3 — `ARCHITECTURE READY`  
**Assessment date:** 2026-10-16  
**Disposition:** **PASSED for architecture design, requirements traceability, security-boundary definition, and recorded trade-offs.**  
**Next phase:** Phase 4 — API/interface contracts.  
**Authority and limits:** The product owner approved the architecture baseline on 2026-10-16. This review records whether the stated architecture gate criteria are evidenced in the repository; it does not approve un-frozen endpoint/runtime details, claim implementation, or authorize cloud provisioning or real learner-data processing.

## 1. Gate criteria and evidence

| Gate criterion | Evidence in repository | Assessment |
|---|---|---|
| Architecture is traceable to approved requirements | `docs/product/REQUIREMENTS.md`; this review's requirement-to-component/ADR/test mapping below; `docs/product/ACCEPTANCE-CRITERIA.md` | **PASS** — each in-scope functional and non-functional requirement is linked to logical components, relevant ADRs/boundaries, and existing acceptance/verification IDs. Test IDs are planned verification paths, not claims of execution. |
| Security and privacy boundaries are explicit | `docs/architecture/ARCHITECTURE.md` sections 2–7; `docs/architecture/SECURITY-ARCHITECTURE.md`; ADR-001 and ADR-003 | **PASS** — anonymous learner state is page-memory-only; public API boundary is catalogue-only; curator publication is controlled; authenticated/persistent features are deferred behind Q-018/Q-020; cloud provisioning remains gated. |
| Major trade-offs are recorded | `docs/architecture/ADR-001.md` through `ADR-005.md` and `ADR-INDEX.md` | **PASS** — alternatives and consequences are recorded for API-first versus static-only, client versus server matching, curated versus AI/scraped rules, privacy versus convenience, cloud-service composition/cost, and telemetry/recovery. ADR-002/004/005 remain proposed designs where detailed approval is still needed. |
| Unresolved choices are visible and assigned to later gates | `docs/project/OPEN-QUESTIONS.md`, especially Q-018, Q-020 and Q-019; `docs/architecture/ARCHITECTURE.md` section 11 | **PASS** — remaining API contract, rule semantics, catalogue evidence, privacy/runtime inspection, cost, deployment and release questions are not hidden or treated as resolved. |

## 2. Requirement traceability

This is an architecture-level mapping. The canonical requirement text, priority, acceptance criteria and verification IDs remain in `docs/product/REQUIREMENTS.md`; detailed endpoint schemas belong to Phase 4.

| Requirement | Logical components / architecture response | Boundary or decision | ADR / related decision | Acceptance and verification path | State / next gate |
|---|---|---|---|---|---|
| `REQ-EXP-001` — anonymous pathway inputs and validation | Browser explorer form, subject catalogue, input validation, page-memory state, client-side evaluator | Learner inputs never enter public catalogue requests, URLs, browser storage, logs or telemetry | ADR-001, ADR-003; D-045/D-047 | AC-EXP-001–014; T-EXP-001–006; T-SUB-001–012 | Design traced; UI/runtime verification remains open under G-SYN-001 |
| `REQ-CAT-001` — bounded, sourced catalogue | Curated catalogue/read model, source records, cycle/freshness/version metadata, curator review/publication | Public read-only catalogue; publish only supported, reviewed records | ADR-001, ADR-002 | AC-CAT-001–012; T-CAT-001–005; T-API-001–002, T-API-004; T-NFR-001 | Schema/API contract and publication evidence remain Phase 4/data-gate work |
| `REQ-MAT-001` — deterministic eligibility and uncertainty | Client-side deterministic evaluator, reason builder, result grouping | `ELIGIBLE`, `NOT_ELIGIBLE`, `UNKNOWN`; incomplete/unsupported evidence cannot imply eligibility | ADR-002; D-045 | AC-MAT-001–021; T-MAT-001–008; AC-NFR-002 golden-set control | Rule semantics and golden-set execution remain open |
| `REQ-ALT-001` — verified pathway relationships | Relationship records, evidence references, alternatives UI | No inferred/unverified alternatives; empty verified set is valid | ADR-002; OR-007 | AC-ALT-001–007; T-ALT-001–002; T-REL-001–008 | Relationship evidence/sign-off remains open |
| `REQ-DET-001` — sourced details and next steps | Detail view, official links, requirement/source metadata | Missing facts remain unknown; only authoritative links/details are presented | ADR-002; NFR-DATA-001 | AC-DET-001–007; T-DET-001–006 | Content and runtime verification remain open |
| `REQ-PRV-001` — anonymous, memory-only privacy | Browser memory/reset, network boundary, telemetry/logging restrictions | No profile persistence, profile transmission or profile telemetry; synthetic data only | ADR-001, ADR-003, ADR-005; D-047 | AC-PRV-001–013; T-PRV-001–006; T-API-003 | Design traced; browser/provider runtime evidence remains a release blocker |
| `REQ-UX-001` — accessible, resilient mobile-first journey | UI validation, loading/empty/error/retry/reset states | Recoverable failure; do not invent fallback catalogue data | ADR-001, ADR-005 | AC-UX-001–011; T-UX-001–005; T-PERF-001; T-NFR-005 | UI/accessibility/browser evidence remains open |
| `REQ-FUND-001` — sourced funding matches (P1) | Funding catalogue and limited-input matching/results | No sensitive financial/family inputs; no award guarantee; unverified records withheld | ADR-002, ADR-003 | AC-FUND-001–009; T-FUND-001–006; T-API-001–002, T-API-004 | Funding records and implementation remain gated behind P0 core work |
| `REQ-APP-001` — manual application tracker (P1) | Tracker form/list, transition validation, page-memory state | No submission, durable storage or sync | ADR-003; D-047 | AC-APP-001–009; T-APP-001–006 | Implementation and test evidence remain open |
| `REQ-AUTH-001` — authenticated extension (future scope) | Future identity/API, server-side matching, saved pathways, comparison, saved funding, derived dashboard | Not part of current D-047 demo; profile persistence requires explicit opt-in; tracker stays memory-only | ADR-001, ADR-003; D-046/D-048; Q-018/Q-020 | AC-AUTH-001–016; T-AUTH-001–018; T-PRV-001–006; T-API-001–004 | **Gated future scope**; no implementation or real learner data authorized |
| `NFR-SEC-001` — trusted-boundary security/no client secrets | Browser/API boundary, HTTPS for any network path, validation and secret handling | No browser-bundled secrets; request validation at trusted boundary | ADR-001, ADR-003, ADR-004 | T-SEC-001; T-API-004 | Runtime/hosting review remains open |
| `NFR-PRV-001` — no profile persistence/analytics/log capture | Page-memory state, reset, allowlisted telemetry policy | No learner data in storage, requests, URLs, logs or telemetry | ADR-003, ADR-005 | T-PRV-001–006; T-API-003 | Release blocker until verified |
| `NFR-DATA-001` — claims trace to official sources | Source records, rule-level provenance, catalogue version and review state | Missing/stale/unsupported evidence must not produce certainty | ADR-002, ADR-005 | T-CAT-001, T-CAT-004–005, T-MAT-005, T-MAT-008, T-NFR-001 | Data verification/publication remains open |
| `NFR-REL-001` — honest recoverable failure states | API adapter, schema/version checks, loading/error/retry UI | No silent fabricated fallback; stale/malformed/unavailable catalogue is disclosed | ADR-001, ADR-004, ADR-005 | T-CAT-002; T-UX-004; T-API-002 | Contract and runtime tests remain open |
| `NFR-ACC-001` — WCAG 2.2 AA accessibility target | Responsive UI, semantic controls, keyboard/focus/error patterns | Must be verified on the agreed viewport/browser set | ADR-005 (quality/observability consequences) | T-UX-001–003; T-UX-005 | Accessibility evidence remains open |
| `NFR-PERF-001` — client matching performance target | In-browser evaluator and benchmark harness | Target is p95 ≤1 second for up to 100 records on an agreed device/browser; protocol still needs definition | ADR-001, ADR-002 | T-PERF-001 | Benchmark protocol and measurement remain open |
| `NFR-COMP-001` — no admission/funding guarantee | Result, funding and detail copy | Explain screening limits; link to official provider decisions | ADR-002 | T-COMP-001 | Content review remains open |
| `NFR-SCOPE-001` — bounded catalogue/no national-coverage claim | Catalogue scope and learner-facing disclosure | Initial pilot is 6–8 programmes; only supported verified records are shown | ADR-002; OR-008 | T-CAT-003 | Catalogue publication remains open |

## 3. Security and trust boundaries

1. **Learner ↔ browser:** anonymous inputs, derived matches and tracker entries exist in page memory only. Reset clears them; reload/exit may discard them.
2. **Browser ↔ public catalogue API:** public, read-only catalogue data only. No marks, subjects/results, interests, profile values, recommendation results or tracker entries are permitted in requests.
3. **Curator ↔ catalogue publication:** a human-reviewed publication workflow requires official/authoritative sources, applicable cycle, verification date, rule completeness, version and sign-off. The public API is not a write interface.
4. **Runtime/provider ↔ telemetry/logging:** technical allowlist only if runtime is later approved. Actual browser capture, provider log fields, retention and dependencies must be inspected; policy text is not proof of behavior.
5. **Future authenticated tier:** separate trust boundary, excluded from the current demo. Identity/token validation, server-side ownership checks, cross-user isolation, consent/notice, lifecycle, privacy/legal review, cost and tests must pass Q-018/Q-020 before implementation.
6. **Cloud and deployment:** no resource provisioning or deployment is authorized by this gate. Exact services, region, quotas, permissions, cost/overages, secrets, telemetry retention and rollback require separate approval.

## 4. Major trade-offs recorded

- **API-first vs static-only:** preserves D-044 direction but introduces contract/runtime work; API Management may be unnecessary under the R100/month cap. (ADR-001, ADR-004)
- **Client-side anonymous matching vs server-side profile matching:** keeps learner data local and demoable; requires deterministic client logic and golden tests. Authenticated server-side matching remains future gated scope. (ADR-001, ADR-003)
- **Human-curated vs AI-generated/scraped requirements:** slower and narrower, but provides auditable sources and reduces unsupported eligibility claims. (ADR-002)
- **Privacy vs convenience:** page-memory-only state can be lost on reload; localStorage/sessionStorage and telemetry capture are excluded. (ADR-003, ADR-005)
- **Cloud gateway/service composition vs cost/complexity:** Functions/API Management and database/storage/identity/AI services are not presumed necessary; evaluate each resource against the R100/month ceiling and actual scope. (ADR-004)
- **Diagnostics vs data minimisation:** allowlisted technical telemetry limits exposure but makes debugging less detailed; no runtime-specific logging or SLO promises are frozen. (ADR-005)

## 5. Explicitly not passed by this gate

This gate does **not** pass or authorize: Phase 4 API contract approval; final route/schema/error/cache/CORS/timeout decisions; eligibility rule semantics and reviewed golden-set execution; publication-ready catalogue/funding records; G-SYN-001 browser journey/privacy/accessibility evidence; application build/test evidence; CI for the current implementation; external privacy/legal review; cloud provisioning; deployment; or release. Q-018, Q-020, Q-019 and the G-SYN-001 gate remain active where applicable.

**Gate conclusion:** Architecture is sufficiently traceable, security boundaries are explicit, and major trade-offs are recorded. Proceed to Phase 4 contracts while preserving all listed downstream gates.
