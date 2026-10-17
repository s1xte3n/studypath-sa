import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("404 is documented as routing-level, not a list-operation response", async () => {
  const [contract, errors, openapi] = await Promise.all([
    read("../../docs/api/API-CONTRACT.md"),
    read("../../docs/api/API-ERRORS.md"),
    read("../../docs/api/openapi.yaml"),
  ]);

  assert.match(contract, /\x60404 NOT_FOUND\x60 is a routing\/gateway outcome/);
  assert.match(contract, /not an expected response from API-001 or API-002/);
  assert.match(errors, /\| 404 \| \x60NOT_FOUND\x60 \| Routing\/gateway outcome/);
  assert.match(errors, /not a response expected from either current list operation/);
  assert.match(openapi, /A 404 NOT_FOUND for an unmatched path is a\s+routing\/gateway outcome, not a response from either operation/);

  const operationBlocks = [
    openapi.split("  /programmes:\n")[1]?.split("  /funding-opportunities:\n")[0],
    openapi.split("  /funding-opportunities:\n")[1]?.split("components:\n")[0],
  ];
  assert.ok(operationBlocks.every(Boolean), "both catalogue operations must be present");
  for (const block of operationBlocks) {
    assert.doesNotMatch(block, /^        '404':/m, "404 is not an operation response for list routes");
  }
});

test("both 429 OpenAPI responses document the same optional Retry-After contract", async () => {
  const [contract, errors, openapi] = await Promise.all([
    read("../../docs/api/API-CONTRACT.md"),
    read("../../docs/api/API-ERRORS.md"),
    read("../../docs/api/openapi.yaml"),
  ]);

  assert.match(contract, /\x60Retry-After\x60 on \x60429 RATE_LIMITED\x60/);
  assert.match(contract, /non-negative integer number of seconds/);
  assert.match(errors, /\x60Retry-After\x60 is optional/);
  assert.match(errors, /non-negative integer number of seconds/);

  const operationBlocks = [
    openapi.split("  /programmes:\n")[1]?.split("  /funding-opportunities:\n")[0],
    openapi.split("  /funding-opportunities:\n")[1]?.split("components:\n")[0],
  ];
  assert.equal(operationBlocks.length, 2);
  for (const block of operationBlocks) {
    const response = block.split("        '429':\n")[1]?.split(/\n        '[0-9]{3}':/)[0];
    assert.ok(response, "each operation must define a 429 response");
    assert.match(response, /Retry-After:/);
    assert.match(response, /type: integer/);
    assert.match(response, /minimum: 0/);
    assert.match(response, /Optional non-negative integer retry delay in seconds/);
  }
});
