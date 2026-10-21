# Test Data Plan

- tests/fixtures/uj-2027-eligibility-golden-cases.v1.json is synthetic draft-oracle data. Assumed-signoff cases are test scenarios, not authority to produce positive learner-facing eligibility.
- docs/product/uj-2027-pilot-catalogue-draft.json is used only with its current draft status.
- Pathway adapter tests load the draft catalogue read-only.
- Browser tests create subject/mark inputs in isolated Playwright pages.
- No tests use real names, emails, IDs, accounts or learner transcripts.
- Cleanup discards the Node process and browser context; no files, database rows, cookies, localStorage or server state should be created.
- Reset tests assert initial form state and removal of result cards/status notices.
- Fixture changes require deliberate version and test updates; draft assumptions must not become approved reference data silently.
