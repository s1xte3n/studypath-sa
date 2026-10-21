# Test Matrix — Requirement Traceability

Status describes known evidence, not assumed completion. Canonical requirements remain in docs/product/REQUIREMENTS.md.

| Requirement | Priority | Contract / implementation | Test IDs | Type | Automation / status |
|---|---:|---|---|---|---|
| REQ-EXP-001 | P0 | Learner form; student-input-validation.mjs; main.jsx | T-EXP-001–006; browser E2E | Unit + E2E | Existing validation tests; new results flow requires CI verification |
| REQ-CAT-001 | P0 | uj-2027-pilot-catalogue-draft.json | T-CAT-001–005; golden-case catalogue assertions | Unit/fixture | Draft only; publication gate open |
| REQ-MAT-001 | P0 | uj-2027-evaluator.mjs; pathway-matching.mjs | T-MAT-001–008; pathway-matching.test.mjs | Unit + E2E | Draft outcomes expected UNKNOWN; PR CI pending |
| REQ-ALT-001 | P0 | Catalogue relationship evidence and results | T-ALT-001–002 | Unit/catalogue | No alternative shown without verified relationship evidence |
| REQ-PRV-001 | P0 | Page-memory-only state; no learner-data API call | Existing privacy E2E | Browser privacy | CI must verify no outbound requests after results render |
| REQ-NFR-001 | P0 | Responsive, keyboard-operable UI | Browser E2E and axe | E2E/accessibility | Automation exists; manual screen-reader review unverified |
| Public catalogue contract | P0 | docs/api/API-CONTRACT.md; docs/api/openapi.yaml | tests/contracts/openapi-contract.test.mjs; tests/api | Contract | Hosted endpoint tests blocked until runtime exists |

This matrix covers the vertical slice and does not mark all project requirements implemented. Funding, tracking, authentication, persistence, upload/AI, hosted API and cloud deployment are out of scope or blocked by existing gates.
