# MVP Test Cases

| Test ID | Priority | Preconditions / action | Expected result | Automation status |
|---|---:|---|---|---|
| T-EXP-001 | P0 | Submit missing mark | Accessible validation error; no result cards | Existing tests; CI pending |
| T-EXP-002 | P0 | Submit out-of-range, decimal or empty mark | Validation error; no results | Existing validation/E2E coverage |
| T-EXP-003 | P0 | Submit duplicate subject rows | Duplicate validation; no results | Existing validation tests |
| T-MAT-001 | P0 | Valid synthetic marks against draft catalogue | Every displayed state is UNKNOWN | New adapter unit test and E2E assertions |
| T-MAT-002 | P0 | Strong marks against draft catalogue | No ELIGIBLE state | New adapter unit test |
| T-MAT-003 | P0 | Unsupported subject/invalid mark reaches adapter | Input rejected; UI provides safe recovery | New adapter test; UI behavior pending CI |
| T-CAT-001 | P0 | Catalogue results render | Draft disclosure and source link displayed | E2E assertions; CI pending |
| T-PRV-001 | P0 | Enter marks and render results | No learner input/results sent in network request | Existing privacy E2E must pass on updated app |
| T-EXP-004 | P0 | Reset after results | Form resets; results and notice disappear | Existing E2E reset case; CI pending |
| T-NFR-001 | P0 | View at 320px and keyboard navigate | No horizontal overflow; visible focus | Existing Playwright checks; CI pending |
| T-API-001 | P1 | GET /api/v1/programmes with JSON Accept | OpenAPI response conforms when runtime exists | Contract tests exist; live runtime blocked |
| T-API-002 | P1 | Unsupported Accept | Canonical 406 NOT_ACCEPTABLE when runtime exists | Contract defines behavior; live runtime blocked |
| T-SEC-001 | P0 | Cross-user access attempt | Not applicable: no identity or user-specific server resource in local slice | Deferred; not a pass |

Each run must record tested commit, command/workflow URL, exit status and exclusions.
