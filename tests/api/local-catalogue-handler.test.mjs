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
