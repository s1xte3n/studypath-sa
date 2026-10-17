import test from "node:test";
import assert from "node:assert/strict";
import { request as httpRequest } from "node:http";
import { createLocalCatalogueServer } from "../../src/api/local-catalogue-handler.mjs";

const source = {
  sourceId: "SYNTHETIC-SOURCE",
  sourceName: "Synthetic test source",
  publisher: "StudyPath test fixture",
  sourceUrl: "https://example.invalid/synthetic-fixture",
  verifiedAt: "2026-10-17T10:00:00Z",
  applicableCycle: "2027",
  sourceSection: null,
  evidenceNote: "Synthetic fixture only; not an admissions requirement.",
};

const programme = (id, overrides = {}) => ({
  id,
  institution: {
    id: "SYNTHETIC-INSTITUTION",
    name: "Synthetic institution",
    institutionType: "UNIVERSITY",
    province: "GAUTENG",
    websiteUrl: "https://example.invalid",
  },
  title: `Synthetic programme ${id}`,
  qualificationType: "DEGREE",
  nqfLevel: null,
  durationYears: 3,
  studyModes: ["ON_CAMPUS"],
  locationText: null,
  applicableCycle: "2027",
  requirements: [],
  relationships: [],
  sources: [{ ...source }],
  verifiedAt: "2026-10-17T10:00:00Z",
  catalogueVersion: "synthetic-2026-10-17.1",
  publicationStatus: "PUBLISHED",
  curatorApproved: true,
  limitations: ["Synthetic fixture; not a real programme."],
  ...overrides,
});

const funding = (id, overrides = {}) => ({
  id,
  name: `Synthetic funding ${id}`,
  provider: "Synthetic test provider",
  description: null,
  officialWebsiteUrl: "https://example.invalid/funding",
  applicationUrl: null,
  applicableCycle: "2027",
  deadlineText: "Synthetic deadline not applicable",
  deadlineAt: null,
  deadlineTimezone: null,
  requirements: [],
  requiredDocuments: [],
  publishedAmountText: null,
  sources: [{ ...source }],
  verifiedAt: "2026-10-17T10:00:00Z",
  catalogueVersion: "synthetic-2026-10-17.1",
  publicationStatus: "PUBLISHED",
  curatorApproved: true,
  limitations: ["Synthetic fixture; not a real funding opportunity."],
  ...overrides,
});

async function withServer(options, run) {
  const server = createLocalCatalogueServer(options);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

async function send(url, path, options = {}) {
  const response = await fetch(new URL(path, url), options);
  return { status: response.status, headers: response.headers, body: await response.json() };
}

function sendRaw(url, path, { method = "GET", headers = {}, body = "" } = {}) {
  const target = new URL(path, url);
  return new Promise((resolve, reject) => {
    const req = httpRequest({
      hostname: target.hostname,
      port: target.port,
      path: target.pathname + target.search,
      method,
      headers: { ...(body ? { "Content-Length": Buffer.byteLength(body) } : {}), ...headers },
    }, (res) => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try { resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data) }); }
        catch (error) { reject(error); }
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

test("API-001 returns only publication-ready synthetic programmes in stable ID order", async () => {
  await withServer({
    programmes: [
      programme("SYNTH-Z"),
      programme("SYNTH-A"),
      programme("SYNTH-DRAFT", { publicationStatus: "DRAFT" }),
      programme("SYNTH-UNSIGNED", { curatorApproved: false }),
      programme("SYNTH-NOSOURCE", { sources: [] }),
    ],
    now: () => new Date("2026-10-17T12:00:00Z"),
  }, async (base) => {
    const result = await send(base, "/api/v1/programmes");
    assert.equal(result.status, 200);
    assert.match(result.headers.get("content-type"), /^application\/json; charset=utf-8$/);
    assert.equal(result.headers.get("x-content-type-options"), "nosniff");
    assert.deepEqual(result.body.items.map((item) => item.id), ["SYNTH-A", "SYNTH-Z"]);
    assert.equal(result.body.generatedAt, "2026-10-17T12:00:00.000Z");
  });
});

test("API-002 returns the published synthetic funding catalogue", async () => {
  await withServer({ fundingOpportunities: [funding("FUND-Z"), funding("FUND-A")] }, async (base) => {
    const result = await send(base, "/api/v1/funding-opportunities");
    assert.equal(result.status, 200);
    assert.deepEqual(result.body.items.map((item) => item.id), ["FUND-A", "FUND-Z"]);
  });
});

test("an empty published catalogue is a successful empty list, not fabricated data", async () => {
  await withServer({ programmes: [programme("SYNTH-DRAFT", { publicationStatus: "DRAFT" })] }, async (base) => {
    const result = await send(base, "/api/v1/programmes");
    assert.equal(result.status, 200);
    assert.deepEqual(result.body.items, []);
  });
});

test("unknown query parameters are rejected without echoing learner-like values", async () => {
  const marker = "SYNTHETIC-PRIVACY-SENTINEL-987";
  await withServer({}, async (base) => {
    const result = await send(base, `/api/v1/programmes?marks=${marker}`);
    assert.equal(result.status, 400);
    assert.equal(result.body.error.code, "INVALID_QUERY_PARAMETER");
    assert.doesNotMatch(JSON.stringify(result.body), new RegExp(marker));
  });
});

test("unsupported methods receive 405 and Allow: GET", async () => {
  await withServer({}, async (base) => {
    const result = await send(base, "/api/v1/programmes", { method: "POST" });
    assert.equal(result.status, 405);
    assert.equal(result.headers.get("allow"), "GET");
    assert.equal(result.body.error.code, "METHOD_NOT_ALLOWED");
  });
});

test("unsupported Accept representation is 406 NOT_ACCEPTABLE; JSON and wildcard are accepted", async () => {
  await withServer({}, async (base) => {
    const unsupported = await send(base, "/api/v1/programmes", { headers: { Accept: "text/html" } });
    assert.equal(unsupported.status, 406);
    assert.equal(unsupported.body.error.code, "NOT_ACCEPTABLE");
    assert.doesNotMatch(JSON.stringify(unsupported.body), /text\/html/i);

    const json = await send(base, "/api/v1/programmes", { headers: { Accept: "application/json" } });
    assert.equal(json.status, 200);

    const wildcard = await send(base, "/api/v1/programmes", { headers: { Accept: "*/*" } });
    assert.equal(wildcard.status, 200);
  });
});

test("malformed Accept syntax is distinct from a valid but unsupported representation", async () => {
  await withServer({}, async (base) => {
    const result = await send(base, "/api/v1/programmes", { headers: { Accept: "not-a-media-type" } });
    assert.equal(result.status, 400);
    assert.equal(result.body.error.code, "INVALID_ACCEPT_HEADER");
  });
});

test("GET request bodies are rejected and never reflected", async () => {
  const marker = "SYNTHETIC-BODY-SENTINEL-456";
  await withServer({}, async (base) => {
    const result = await sendRaw(base, "/api/v1/programmes", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ marks: marker }),
    });
    assert.equal(result.status, 400);
    assert.equal(result.body.error.code, "INVALID_REQUEST_BODY");
    assert.doesNotMatch(JSON.stringify(result.body), new RegExp(marker));
  });
});

test("unknown routes return a safe 404 error envelope", async () => {
  await withServer({}, async (base) => {
    const result = await send(base, "/api/v1/admin");
    assert.equal(result.status, 404);
    assert.equal(result.body.error.code, "NOT_FOUND");
    assert.deepEqual(Object.keys(result.body.error).sort(), ["code", "message", "requestId"]);
  });
});


test("schema integrity excludes missing fields, invalid enums, malformed IDs and impossible UTC timestamps", async () => {
  await withServer({
    programmes: [
      programme("SYNTH-VALID"),
      programme("synthetic-lowercase-id"),
      programme("SYNTH-BAD-ENUM", { qualificationType: "CERTIFICATE" }),
      programme("SYNTH-BAD-DATE", { verifiedAt: "2026-02-30T10:00:00Z" }),
      programme("SYNTH-MISSING-TITLE", { title: undefined }),
      programme("SYNTH-MISSING-CYCLE", { applicableCycle: "" }),
      programme("SYNTH-BAD-SOURCE-DATE", {
        sources: [{ ...source, verifiedAt: "2026-13-01T00:00:00Z" }],
      }),
      programme("SYNTH-BAD-PROVINCE", {
        institution: {
          id: "SYNTHETIC-INSTITUTION",
          name: "Synthetic institution",
          institutionType: "UNIVERSITY",
          province: "ATLANTIS",
          websiteUrl: "https://example.invalid",
        },
      }),
    ],
  }, async (base) => {
    const result = await send(base, "/api/v1/programmes");
    assert.equal(result.status, 200);
    assert.deepEqual(result.body.items.map((item) => item.id), ["SYNTH-VALID"]);
  });
});

test("internal exceptions return a generic 500 without stack or configuration leakage", async () => {
  await withServer({
    now: () => { throw new Error("PRIVATE_STACK_SENTINEL /etc/private/config"); },
  }, async (base) => {
    const result = await send(base, "/api/v1/programmes");
    assert.equal(result.status, 500);
    assert.match(result.headers.get("content-type"), /^application\/json; charset=utf-8$/);
    assert.equal(result.headers.get("x-content-type-options"), "nosniff");
    assert.equal(result.body.error.code, "INTERNAL_ERROR");
    assert.deepEqual(Object.keys(result.body.error).sort(), ["code", "message", "requestId"]);
    assert.doesNotMatch(JSON.stringify(result.body), /PRIVATE_STACK_SENTINEL|\/etc\/private\/config|Error:/);
  });
});

test("profile-like headers are neither echoed nor used for catalogue personalization", async () => {
  const marker = "SYNTHETIC-HEADER-SENTINEL-789";
  await withServer({ programmes: [programme("SYNTH-PUBLIC")] }, async (base) => {
    const result = await sendRaw(base, "/api/v1/programmes", {
      headers: { "X-Student-Profile": marker },
    });
    assert.equal(result.status, 200);
    assert.deepEqual(result.body.items.map((item) => item.id), ["SYNTH-PUBLIC"]);
    assert.doesNotMatch(JSON.stringify(result.body), new RegExp(marker));
  });
});

test("catalogue handler makes no downstream fetch calls", async () => {
  const originalFetch = globalThis.fetch;
  let downstreamCalls = 0;
  globalThis.fetch = async () => {
    downstreamCalls += 1;
    throw new Error("Unexpected downstream network call");
  };
  try {
    await withServer({ programmes: [programme("SYNTH-NETWORK-FREE")] }, async (base) => {
      const result = await sendRaw(base, "/api/v1/programmes");
      assert.equal(result.status, 200);
      assert.equal(result.body.items[0].id, "SYNTH-NETWORK-FREE");
      assert.equal(downstreamCalls, 0);
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a representative synthetic catalogue response stays within the local payload budget", async () => {
  const programmes = Array.from({ length: 250 }, (_, index) =>
    programme("SYNTH-" + String(index).padStart(4, "0")));
  await withServer({ programmes }, async (base) => {
    const startedAt = process.hrtime.bigint();
    const result = await sendRaw(base, "/api/v1/programmes");
    const elapsedMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    const responseBytes = Buffer.byteLength(JSON.stringify(result.body));
    assert.equal(result.status, 200);
    assert.equal(result.body.items.length, 250);
    assert.ok(responseBytes < 1_000_000, "synthetic 250-item response should remain under 1 MB");
    assert.ok(elapsedMs < 5000, "local synthetic response should complete under 5 seconds");
  });
});


test("PUT, PATCH, DELETE and OPTIONS are rejected by the local route handler", async () => {
  await withServer({}, async (base) => {
    for (const method of ["PUT", "PATCH", "DELETE", "OPTIONS"]) {
      const result = await sendRaw(base, "/api/v1/programmes", { method });
      assert.equal(result.status, 405, method + " should be rejected");
      assert.equal(result.headers.allow, "GET");
      assert.equal(result.body.error.code, "METHOD_NOT_ALLOWED");
    }
  });
});


test("funding publication rejects missing required nullable schema properties", async () => {
  await withServer({
    fundingOpportunities: [
      funding("FUND-VALID"),
      funding("FUND-MISSING-DESCRIPTION", { description: undefined }),
      funding("FUND-MISSING-DEADLINE", { deadlineAt: undefined }),
      funding("FUND-INVALID-ID", { id: "funding-invalid" }),
    ],
  }, async (base) => {
    const result = await send(base, "/api/v1/funding-opportunities");
    assert.equal(result.status, 200);
    assert.deepEqual(result.body.items.map((item) => item.id), ["FUND-VALID"]);
  });
});

test("all local HTTP error classes preserve the required safe response headers", async () => {
  await withServer({
    now: () => { throw new Error("PRIVATE_HEADER_TEST_SENTINEL"); },
  }, async (base) => {
    const cases = [
      { path: "/api/v1/programmes?unknown=1", status: 400, code: "INVALID_QUERY_PARAMETER" },
      { path: "/api/v1/programmes", headers: { Accept: "not-a-media-type" }, status: 400, code: "INVALID_ACCEPT_HEADER" },
      { path: "/api/v1/programmes", headers: { Accept: "text/html" }, status: 406, code: "NOT_ACCEPTABLE" },
      { path: "/api/v1/programmes", method: "POST", status: 405, code: "METHOD_NOT_ALLOWED" },
      { path: "/api/v1/not-a-route", status: 404, code: "NOT_FOUND" },
      { path: "/api/v1/programmes", status: 500, code: "INTERNAL_ERROR" },
    ];

    for (const scenario of cases) {
      const result = await sendRaw(base, scenario.path, {
        method: scenario.method ?? "GET",
        headers: scenario.headers ?? {},
      });
      assert.equal(result.status, scenario.status, scenario.code + " status");
      assert.match(result.headers["content-type"] ?? "", /^application\\/json; charset=utf-8$/);
      assert.equal(result.headers["x-content-type-options"], "nosniff");
      assert.equal(result.body.error.code, scenario.code);
      assert.deepEqual(Object.keys(result.body.error).sort(), ["code", "message", "requestId"]);
      assert.doesNotMatch(JSON.stringify(result.body), /PRIVATE_HEADER_TEST_SENTINEL|Error:/);
    }
  });
});

test("nested requirements and pathway relationships must satisfy source-backed schema constraints", async () => {
  const validRequirement = {
    ruleId: "SYNTH-RULE-1",
    requirementType: "SUBJECT_MARK",
    operator: "GTE",
    subjectId: "MATHEMATICS",
    threshold: 60,
    acceptedValues: null,
    conditionRuleId: null,
    mandatory: true,
    description: "Synthetic minimum mark requirement.",
    sourceIds: ["SYNTHETIC-SOURCE"],
    verificationState: "VERIFIED",
  };
  const validRelationship = {
    id: "SYNTH-REL-1",
    fromProgrammeId: "SYNTH-VALID",
    toProgrammeId: "SYNTH-OTHER",
    type: "ALTERNATIVE",
    rationale: "Synthetic relationship rationale.",
    evidenceStatus: "VERIFIED",
    sourceIds: ["SYNTHETIC-SOURCE"],
    applicableCycle: "2027",
    verifiedAt: "2026-10-17T10:00:00Z",
    reviewBy: "2027-01-01",
    curatorApproved: true,
    caveat: "Synthetic relationship caveat.",
  };

  await withServer({
    programmes: [
      programme("SYNTH-VALID", {
        requirements: [validRequirement],
        relationships: [validRelationship],
      }),
      programme("SYNTH-BAD-RULE-SOURCE", {
        requirements: [{ ...validRequirement, ruleId: "SYNTH-RULE-2", sourceIds: ["MISSING-SOURCE"] }],
      }),
      programme("SYNTH-BAD-RULE-ENUM", {
        requirements: [{ ...validRequirement, ruleId: "SYNTH-RULE-3", operator: "APPROXIMATELY" }],
      }),
      programme("SYNTH-BAD-RELATIONSHIP", {
        relationships: [{ ...validRelationship, id: "SYNTH-REL-2", curatorApproved: false }],
      }),
      programme("SYNTH-BAD-RELATIONSHIP-DATE", {
        relationships: [{ ...validRelationship, id: "SYNTH-REL-3", reviewBy: "2027-02-30" }],
      }),
    ],
  }, async (base) => {
    const result = await send(base, "/api/v1/programmes");
    assert.equal(result.status, 200);
    assert.deepEqual(result.body.items.map((item) => item.id), ["SYNTH-VALID"]);
  });
});
