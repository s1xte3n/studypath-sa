# StudyPath SA — Data Model

**Status:** Proposed logical catalogue model; schema and runtime persistence not approved.  
**Scope:** Current synthetic local demo plus the future public catalogue API. Does not authorize personal-data persistence.

## Principles and requirement mapping

- `REQ-CAT-001`, `REQ-MAT-001`, `REQ-ALT-001`, `REQ-DET-001`, `REQ-FUND-001`, `NFR-DATA-001`.
- Source provenance, applicable cycle, version and review state travel with every rule that can affect displayed requirements, eligibility, deadlines or next steps.
- Unknown/incomplete data is explicit. Do not use null/default values to imply that a requirement is absent or satisfied.
- The D-047 demo uses synthetic fixture data in the repository and in-memory learner inputs; no database is required or authorized for this slice.

## Entities

| Entity | Key fields | Relationships / constraints | Owner |
|---|---|---|---|
| Institution | `institution_id` (stable opaque ID), name, type, province, official URL, active state | One institution has many programmes; official URL must be HTTPS where supported; do not infer province/type | Catalogue curator |
| Programme/Qualification | `programme_id`, institution ID, official name, qualification type, NQF level if verified, duration if verified, modes, locations, cycle, status | FK to institution; unique by institution + official programme identifier/cycle where available; no invented NQF/duration | Catalogue curator |
| Subject | `subject_id`, canonical name, optional official/code aliases only if approved | Canonical IDs stable; input labels map through approved vocabulary; unknown labels rejected or explicitly unsupported | Product/data owner |
| Requirement Rule | `rule_id`, programme ID, rule type, subject ID where applicable, operator, threshold/value, composition group, mandatory flag, source record ID, cycle, verification state | FK to programme, subject, source; operators allow-listed; threshold range validated; unsupported rule representation marks affected eligibility UNKNOWN | Catalogue curator |
| Funding Provider | `provider_id`, name, official URL, provider type | Stable ID; no claims of government/official status without evidence | Catalogue curator |
| Funding Opportunity | `funding_id`, provider ID, title, summary, official application URL, deadline with timezone/date semantics, cycle, required documents, status | FK to provider; expired/unknown deadlines shown as such; application URL must be sourced | Catalogue curator |
| Funding Rule | `funding_rule_id`, funding ID, rule type, supported criterion/value, source record ID, cycle, verification state | Unsupported/sensitive criteria do not become deterministic matches; explain uncertainty and direct to provider | Catalogue curator |
| Source Record | `source_id`, source URL, source name, source type, checked-at date, content hash if captured, source publication/update date if known, source status | HTTPS preferred; every requirement/deadline/eligibility rule points to a source record; retain evidence that supports each transcribed value | Catalogue curator |
| Catalogue Version | `catalogue_version`, schema version, release timestamp, effective cycle, reviewer/sign-off, content checksum | Immutable published snapshot; version increments on approved content changes | Catalogue curator |
| Pathway Relationship | `relationship_id`, from programme ID, to programme ID, type, rationale, source record, cycle, verification/sign-off | Both endpoints must exist; no self-link; supported types: PROGRESSION, ALTERNATIVE, RELATED_FIELD, ARTICULATION; publish only with evidence | Catalogue curator |
| Learner inputs/results | Ephemeral client state only | No durable ID, database row, local/session storage, URL, API payload, log or telemetry in D-047 | Learner/browser |
| Tracker entry | Target opportunity, status, deadline, required-doc checklist, notes, timestamps if needed for current view | Page memory only; reload/exit may discard; no sync or cross-session guarantee | Learner/browser |

## Requirement rule representation

Each rule needs an explicit operator (for example `GTE`, `GT`, `EQ`, `IN`, `REQUIRED`, `POINTS_MINIMUM`) and a declared composition group (for example ALL/ANY only where source wording supports it). Do not assume that every qualification uses the same points calculation or that all displayed conditions combine with AND. Source text that cannot be represented faithfully is marked unsupported and produces `UNKNOWN`.

Each rule carries: `source_id`, `cycle`, `verified_at`, `catalogue_version`, `verification_status`, and `curator_signoff`. The evaluator must not treat a record as definitive unless all material rules are complete and current for the relevant cycle.

## Relationships

- Institution 1—N Programme.
- Programme 1—N Requirement Rule.
- Subject 1—N Requirement Rule.
- Source Record 1—N Requirement Rule/Funding Rule/Pathway Relationship (logical reference).
- Funding Provider 1—N Funding Opportunity.
- Funding Opportunity 1—N Funding Rule.
- Programme N—N Programme via Pathway Relationship.

Avoid polymorphic foreign keys without referential integrity. For a future relational implementation, use concrete nullable FK columns or separate programme-application and funding-application relations if application tracking persistence is ever approved. No application table is in the current D-047 model.

## Constraints and validation

- IDs are stable opaque strings in fixture/API contracts; the exact format must be frozen in the API contract.
- Marks are whole-number percentages under the owner-approved subject contract; enforce its range and required subject pairing at the UI boundary. Do not silently clamp.
- A threshold must be numeric and within the valid domain for its rule type.
- Deadline values require explicit timezone semantics; date-only deadlines must remain date-only when the source does not specify a time.
- Source URLs must be valid and point to evidence supporting the field/rule; broken or changed sources trigger review.
- Publication is blocked for missing source, cycle, rule completeness, verification date or curator sign-off.
- Never infer eligibility from absence of a rule. Unknown subject/rule/points method means UNKNOWN.
- No learner PII, national IDs, household income, bank data or sensitive family/financial documents in the current catalogue or funding flow.

## Indexes (future API/database only)

If a relational database is later approved, consider:
- Unique index on institution stable identifier.
- Unique index on (institution ID, programme stable identifier, cycle).
- Index on programme type, institution/province and active cycle for catalogue filters.
- Index on requirement rule (programme ID, cycle, verification state).
- Index on funding opportunity (provider ID, cycle, deadline, publication status).
- Index on source record (verification date, status).
- Unique/version index on catalogue release version.
- Index both endpoints and relationship type for pathway lookup.

Do not create indexes or provision a database before the runtime decision is approved and measured.

## Lifecycle, versioning and retention

1. Draft → source checked → rule extracted → schema validated → cycle/freshness checked → reviewed → signed off → published.
2. Published records are immutable for a release; corrections create a new catalogue version.
3. Superseded versions are retained for audit and rollback with clear effective dates; do not apply a new-cycle requirement to an old cycle.
4. Review at least every 30 days and sooner when a source changes, a deadline passes or a new cycle is published, as required by OR-005.
5. Withdraw a record from definitive matching when source provenance or freshness cannot be confirmed.
6. Local learner inputs/results/tracker entries are transient; reset clears them and reload/exit may discard them. No retention/deletion workflow for server-side learner data is applicable to this slice because such data must not be stored.

## Migration and recovery

- Current demo: version-controlled fixture/schema changes reviewed by pull request and golden-set tests; rollback by reverting the catalogue commit/release.
- Future relational catalogue: migrations must be forward/backward reviewed, tested against synthetic fixtures, and backed by a versioned rollback/forward-fix plan. Backup/PITR requirements depend on the approved service.
- A restore test is mandatory before a persistent production database is approved; no database restore is claimed or applicable today.

## Open schema decisions

Freeze before API implementation: stable ID format, schema versioning and compatibility, canonical subject IDs, rule operators/composition, points calculation support, date/time contract, catalogue cache freshness, publication status vocabulary, and whether catalogue storage remains file-backed or uses a database. Authenticated profile persistence is a separate gated design and is not included here.
