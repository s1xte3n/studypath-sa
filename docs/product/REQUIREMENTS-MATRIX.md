# StudyPath SA — Requirements Traceability Matrix

Status: Draft for review; not an approved baseline. Date: 2026-10-14.

## Traceability rule
Maintain requirement ID → PRD section → acceptance criteria → interface/contract → test ID → implementation → CI result → release evidence. An acceptance criterion is a test oracle, not proof of implementation or passing tests. Leave evidence fields empty until verified.

| Requirement | Priority | Existing acceptance criteria | Component/interface | Verification method | Dependencies/blockers | Evidence status |
|---|---|---|---|---|---|---|
| REQ-EXP-001 Anonymous pathway input | P0 | AC-EXP-001–014 | Input form, validation, temporary profile state | Unit tests for required fields, mark boundaries, aliases, duplicates, unsupported subjects; keyboard/form tests | Canonical subject list, reset/privacy notice | Not implemented or tested |
| REQ-CAT-001 Curated catalogue | P0 | AC-CAT-001–012; AC-NFR-001 | Versioned read-only catalogue and detail UI | Schema validation, source/provenance audit, cycle/freshness checks, empty-state tests | 6–8 reviewed programme records | Not implemented or tested |
| REQ-MAT-001 Deterministic eligibility | P0 | AC-MAT-001–021; golden-set ACs | Pure eligibility engine and results UI | AND/OR/conditional tests, unknown precedence, determinism, source/reason checks | Complete verified rules and subject vocabulary | Not implemented or tested |
| REQ-ALT-001 Alternatives | P0 | AC-ALT-001–007 | Relationship catalogue and alternatives UI | Relationship validation; articulation evidence checks; independent eligibility evaluation | Verified relationships and provenance | Not implemented or tested |
| REQ-DET-001 Details/next steps | P0 | AC-DET-001–006 | Details view and official links | Link identity, unknown ID, source/cycle context and accessibility tests | Official URLs; next-action decision | Not implemented or tested |
| REQ-PRV-001 Privacy-minimising exploration | P0 | AC-PRV-001–013 | Browser state, notice, hosting/build config | Storage/network/log/telemetry inspection; reset/reload; synthetic-data audit | Provider telemetry review | Not implemented or tested |
| REQ-UX-001 Accessible mobile-first UX | P0 | AC-UX-001–011 | All screens/components | WCAG 2.2 AA audit, 320 CSS px, keyboard/screen reader, browser matrix, performance benchmark | Agreed test device/browser | Not implemented or tested |
| REQ-FUND-001 Funding opportunities | P1 | Funding criteria in ACCEPTANCE-CRITERIA.md and policy | Funding form/results/catalogue | Eligibility and unknown cases; 30-day freshness, expiry and source-unavailable tests | 3–5 official records; approved limited inputs | Not implemented or tested |
| REQ-APP-001 Manual tracker | P1 | Tracker criteria and transition table in FUNDING-TRACKER-PRIVACY-POLICY.md | In-memory tracker state/UI | Every allowed and forbidden transition; terminal WITHDRAWN; submission date; reset/reload/storage tests | Page-memory disclosure; next-action decision | Not implemented or tested |

## Cross-cutting targets
- Golden set: at least 20 versioned synthetic cases; 100% expected classifications; zero false-positive ELIGIBLE.
- Matching performance: p95 ≤1 second for up to 100 records on an agreed, recorded device/browser.
- Accessibility: WCAG 2.2 AA target, 320 CSS px minimum, keyboard support and visible focus.
- Browser matrix: current stable Chrome, Edge, Firefox and Safari where available; record exact versions and gaps.
- Provenance: every eligibility rule includes official publisher/source/title/URL, applicable cycle, verification date, rule details, catalogue version and curator sign-off.
- Funding: reverify at least every 30 days and sooner after suspected source/deadline changes; overdue/uncheckable becomes UNVERIFIED.
- Privacy: no profile/tracker values in persistent browser storage, URLs, analytics, logs or error telemetry.
- Budget: R100/month cap; no provisioning without renewed approval and reviewed resource list.

Phase 2 gate remains draft until PRD approval, AC mapping review, owners and concrete test IDs are assigned.
