import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

const [openapi, contract, endpoints, errors, schemas, variables] = await Promise.all([
  read("../../docs/api/openapi.yaml"),
  read("../../docs/api/API-CONTRACT.md"),
  read("../../docs/api/API-ENDPOINTS.md"),
  read("../../docs/api/API-ERRORS.md"),
  read("../../docs/api/API-SCHEMAS.md"),
  read("../../docs/api/API-VARIABLES.md"),
]);

test("OpenAPI declares version 3.1 and the approved API base", () => {
  assert.match(openapi, /^openapi:\s*3\.1\.0\s*$/m);
  assert.match(openapi, /url:\s*\/api\/v1/);
});

test("only the two approved public catalogue paths are declared", () => {
  const pathsSection = openapi.split(/^components:\s*$/m)[0];
  const paths = [...pathsSection.matchAll(/^  (\/[^:]+):\s*$/gm)].map((m) => m[1]);
  assert.deepEqual(paths, ["/programmes", "/funding-opportunities"]);
  assert.match(pathsSection, /operationId: listProgrammes/);
  assert.match(pathsSection, /operationId: listFundingOpportunities/);
  assert.equal((pathsSection.match(/^    get:\s*$/gm) ?? []).length, 2);
  assert.doesNotMatch(pathsSection, /^    (post|put|patch|delete):\s*$/m);
});

test("public operations are anonymous, read-only and define required HTTP outcomes", () => {
  const pathsSection = openapi.split(/^components:\s*$/m)[0];
  for (const status of ["200", "400", "405", "406", "429", "500", "503", "504"]) {
    assert.ok(pathsSection.includes(`'${status}':`), `missing documented HTTP status ${status}`);
  }
  assert.equal((pathsSection.match(/^      security: \[\]/gm) ?? []).length, 2);
  assert.match(pathsSection, /ProgrammeCatalogueResponse/);
  assert.match(pathsSection, /FundingCatalogueResponse/);
  assert.match(pathsSection, /APIErrorResponse/);
});

test("OpenAPI error and catalogue schemas exist and close unexpected properties", () => {
  assert.match(openapi, /^    APIErrorResponse:\s*$/m);
  assert.match(openapi, /^    ProgrammeCatalogueResponse:\s*$/m);
  assert.match(openapi, /^    FundingCatalogueResponse:\s*$/m);
  assert.match(openapi, /additionalProperties:\s*false/);
  assert.match(openapi, /ELIGIBLE/);
  assert.match(openapi, /NOT_ELIGIBLE/);
  assert.match(openapi, /UNKNOWN/);
});

test("Markdown inventory and error/schema docs preserve the same contract boundary", () => {
  for (const text of [contract, endpoints, variables]) {
    assert.match(text, /\/api\/v1\/programmes/);
    assert.match(text, /\/api\/v1\/funding-opportunities/);
    assert.match(text, /page-memory-only|page memory/i);
  }
  for (const status of ["400", "405", "406", "429", "500", "503", "504"]) {
    assert.ok(errors.includes(status), `API-ERRORS.md missing status ${status}`);
  }
  assert.match(schemas, /EligibilityStatus/);
  assert.match(schemas, /DateTimeUTC/);
  assert.match(schemas, /CatalogueId/);
});

test("learner inputs and tracker data are prohibited from API transmission", () => {
  assert.match(contract, /MUST NOT transmit marks/i);
  assert.match(contract, /tracker is page-memory-only/i);
  assert.match(errors, /Never log request bodies, marks, interests, matching results or tracker entries/i);
  assert.match(variables, /must not be sent to a server or persisted across page reload\/close/i);
});
