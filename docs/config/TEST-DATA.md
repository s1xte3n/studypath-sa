# Test Data Inventory

1. **Non-secret configuration:** repository paths, test runner settings, and a manually configured test target URL.
2. **Secrets:** none required by the inspected local browser MVP.
3. **Generated test state:** temporary React memory and browser audit arrays created by E2E tests; discarded when page/test context ends.
4. **Synthetic test data:** fabricated subject marks and learner scenarios. Do not use real learner marks or identifiers in demos.
5. **Approved reference data:** none of the UJ 2027 pilot catalogue is approved for definitive eligibility screening. Provenance notes are research evidence, not publication sign-off.
6. **Production data:** prohibited in local development, CI and demo fixtures.

Keep fixtures deterministic and version-controlled. Test fixtures must declare synthetic and catalogue status. Never mutate the draft catalogue to imply curator approval. Do not persist learner entries in localStorage, sessionStorage, cookies, URLs, server requests, analytics or logs. Reset clears the form, notice and results; reload starts fresh. Generated test state is isolated to each test/browser context.
