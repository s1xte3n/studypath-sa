# Architecture Decision Records — Index

**Status:** Architecture baseline and logical boundaries approved by product owner on 2026-10-16. Approval does not convert unapproved implementation details or deferred service choices into accepted decisions.  
**Rule:** An ADR records a decision and its context; it is not proof of implementation.

| ADR | Title | Status | Requirement / decision | Summary |
|---|---|---|---|---|
| [ADR-001](ADR-001.md) | API-first architecture with tiered data boundary | Accepted direction; implementation gates open | D-044–D-047, REQ-EXP-001, REQ-CAT-001, REQ-PRV-001 | Public catalogue API direction; anonymous matching remains client-side; local synthetic demo remains current slice |
| [ADR-002](ADR-002.md) | Curated catalogue, provenance and deterministic eligibility | Proposed design consistent with approved requirements | REQ-CAT-001, REQ-MAT-001, REQ-ALT-001, REQ-FUND-001, NFR-DATA-001 | Human-reviewed records, explicit UNKNOWN, version/freshness and source traceability |
| [ADR-003](ADR-003.md) | Privacy-first anonymous boundary and gated authenticated extension | Accepted privacy boundary; future controls proposed | REQ-PRV-001, NFR-PRV-001, NFR-SEC-001, D-046/D-047 | No learner data transmission/persistence/telemetry in current demo |
| [ADR-004](ADR-004.md) | Infrastructure, environments and R100/month cost gate | Proposed; no provisioning authorized | NFR-SEC-001, NFR-REL-001, D-003/D-004/D-047 | Local-first demo; cloud components are candidates pending resource/cost approval |
| [ADR-005](ADR-005.md) | Privacy-preserving observability and recovery | Proposed; runtime-specific decisions open | NFR-REL-001, NFR-PRV-001, NFR-DATA-001 | Technical-only allowlisted signals, no profile telemetry, explicit recovery behavior |

## Gate rule

The owner approved the architecture baseline on 2026-10-16. This does not close material implementation gates tracked in `docs/project/OPEN-QUESTIONS.md`, especially API contract/runtime composition, catalogue rule semantics, privacy/runtime inspection, cost and deployment responsibility. No ADR authorizes provisioning or authenticated profile handling on its own.
