# Catalogue Integrity Invariants — Local Synthetic API Harness

**Status:** Implementation-level safety rules for the local synthetic catalogue handler; not a publication approval or evidence that real catalogue data is valid.  
**Scope:** `src/api/local-catalogue-handler.mjs` and its contract tests only. No hosted runtime, cloud provisioning, or deployment is covered.

## Confirmed contract and requirement basis

- `docs/api/openapi.yaml` defines `CatalogueId` as a stable, bounded identifier shape. It does not express uniqueness across catalogue items or foreign-key constraints.
- `docs/product/PRD.md` requires source-backed programme/cycle metadata, curator review, and no invented or unsupported pathway relationships.
- `docs/product/ACCEPTANCE-CRITERIA.md` requires every displayed alternative to have a curated pathway identity and reviewed relationship/basis (AC-ALT-001), and says relationships missing required metadata are not presented as verified (AC-ALT-006).
- `docs/product/PATHWAY-RELATIONSHIP-EVIDENCE-CONTRACT.md` is explicitly a **draft proposal**, not an approved relationship catalogue. Its T-REL-001 proposes rejecting relationships with unresolved source/target programme IDs. The local handler guard below supports this safe boundary but does not approve any relationship pair or close GAP-003.

## Invariants enforced

| ID | Invariant | Failure handling | Basis / limit |
|---|---|---|---|
| CAT-INT-001 | IDs of publication-ready programme records are unique within the programme endpoint; funding IDs are unique within the funding endpoint. | Withhold every publication-ready record with a colliding ID; do not select an arbitrary winner. Other valid records remain available. | Safety invariant derived from stable catalogue identity. JSON Schema's ID pattern alone does not declare uniqueness. The two endpoint namespaces are checked separately. |
| CAT-INT-002 | A record's `sourceId` values are unique within that record. | Withhold the ambiguous record. | Source references must resolve within the owning record; duplicate IDs make that resolution ambiguous. |
| CAT-INT-003 | Every published pathway relationship's `fromProgrammeId` equals the programme record that contains it, and both endpoint IDs resolve to unique publication-ready programme records. | Omit the relationship, not the otherwise publication-ready programme. | Based on AC-ALT-001/006 and the draft T-REL-001 proposal. No relationship is thereby approved as evidence-backed; real relationships remain blocked on GAP-003. |
| CAT-INT-004 | Requirement `sourceIds` resolve to source records in the same owning record. | Withhold a record containing an unresolved requirement source reference. | Already enforced by the local validator and covered by existing tests. |

## Deliberately not inferred

- `conditionRuleId` is validated for identifier shape only. No approved source in the current API schema defines its resolution scope, conditional graph semantics, or whether forward references are allowed; do not invent those rules here.
- IDs are not forced to be globally unique across programme and funding endpoint namespaces.
- Matching catalogue-version strings across every item and the envelope are not enforced here; the release catalogue review remains required.
- Duplicate requirement `ruleId` or relationship `id` behavior beyond the checks above is not expanded without an approved uniqueness contract.
- The API's `items` array has no OpenAPI `uniqueItems` constraint. This note records the local handler's safety behavior rather than claiming the schema already specifies it.

## Verification plan

- Duplicate programme IDs: all colliding records are withheld; non-colliding valid records remain.
- Duplicate funding IDs: all colliding records are withheld; non-colliding valid records remain.
- Duplicate source IDs in one record: that record is withheld.
- Relationship target missing, endpoint duplicate/unpublishable, or `fromProgrammeId` inconsistent with the owning record: the relationship is omitted and the programme remains discoverable.
- Existing malformed nested requirements/relationships continue to fail the existing publication-readiness validator.
- Execute the local Node test suite and verify CI on the exact PR head before marking this step passed. No local execution or CI result is claimed by this document.
