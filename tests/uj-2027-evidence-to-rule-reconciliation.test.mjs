import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const cataloguePath = path.join(here, "..", "docs", "product", "uj-2027-pilot-catalogue-draft.json");
const reconciliationPath = path.join(here, "..", "docs", "project", "UJ-2027-EVIDENCE-TO-RULE-RECONCILIATION.md");

const [catalogue, reconciliation] = await Promise.all([
  readFile(cataloguePath, "utf8").then(JSON.parse),
  readFile(reconciliationPath, "utf8"),
]);

test("evidence-to-rule reconciliation covers all 30 catalogue records and preserves evidence limitations", () => {
  assert.equal(catalogue.programmes.length, 30);
  for (const programme of catalogue.programmes) {
    assert.ok(reconciliation.includes(programme.id), `Missing programme ID from reconciliation: ${programme.id}`);
    assert.ok(reconciliation.includes(programme.name), `Missing programme name from reconciliation: ${programme.name}`);
    assert.ok(programme.sourceEvidence.length > 0, `Missing source locator: ${programme.id}`);
    assert.ok(reconciliation.includes(programme.sourceEvidence[0].sourceId), `Missing source ID: ${programme.id}`);
    assert.ok(reconciliation.includes("UNKNOWN"), "Unresolved rules must preserve UNKNOWN eligibility");
  }
  assert.match(reconciliation, /not newly verified official facts/i);
  assert.match(reconciliation, /0\/30 records\*\* have institutional curator sign-off recorded/i);
  assert.match(reconciliation, /Official-source re-verification and curator closure remain outstanding/i);
});
