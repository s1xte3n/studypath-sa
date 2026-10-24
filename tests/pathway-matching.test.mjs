import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildPathwayResults } from "../src/domain/pathway-matching.mjs";

const catalogue = JSON.parse(await readFile(new URL("../docs/product/uj-2027-pilot-catalogue-draft.json", import.meta.url), "utf8"));

test("demo-approved catalogue results remain UNKNOWN regardless of strong marks", () => {
  const results = buildPathwayResults({
    stage: "MATRIC_GRADUATE",
    subjects: [
      { subject: "English First Additional Language", mark: "90" },
      { subject: "Mathematics", mark: "90" },
      { subject: "Physical Sciences", mark: "90" },
      { subject: "Life Sciences", mark: "90" },
      { subject: "Geography", mark: "90" },
      { subject: "Accounting", mark: "90" }
    ]
  }, catalogue);

  assert.equal(results.length, catalogue.programmes.length);
  assert.ok(results.every((item) => item.state === "UNKNOWN"));
  assert.ok(results.every((item) => item.catalogueStatus === "APPROVED_FOR_HACKATHON_DEMO_ONLY"));
  assert.ok(results.every((item) => item.sourceUrl?.startsWith("https://")));

  const informationTechnology = results.find(item => item.id === "UJ-2027-BSC-IT");
  const prospectus = informationTechnology.sourceLinks.find(item =>
    item.url.includes("uj_undergrad_prospectus2027_online_25jun2026.pdf")
  );
  assert.equal(prospectus.location, "printed p. 86");
  assert.equal(prospectus.verificationDate, "2026-10-14");
});

test("unsupported subjects and invalid marks fail closed", () => {
  assert.throws(() => buildPathwayResults({
    stage: "GRADE_12",
    subjects: [{ subject: "Made-up subject", mark: "90" }]
  }, catalogue), /Unsupported subject/);

  assert.throws(() => buildPathwayResults({
    stage: "GRADE_12",
    subjects: [{ subject: "Mathematics", mark: "90.5" }]
  }, catalogue), /whole numbers/);
});

test("empty or malformed catalogue is rejected", () => {
  assert.throws(() => buildPathwayResults({ stage: "GRADE_12", subjects: [] }, null), /catalogue/);
});

test("publication-gate failures force UNKNOWN even if catalogue status is changed to approved", () => {
  const unverified = structuredClone(catalogue);
  unverified.status = "APPROVED_FOR_DEFINITIVE_SCREENING";
  const results = buildPathwayResults({
    stage: "MATRIC_GRADUATE",
    subjects: [
      { subject: "English First Additional Language", mark: "90" },
      { subject: "Mathematics", mark: "90" },
      { subject: "Physical Sciences", mark: "90" },
      { subject: "Life Sciences", mark: "90" },
      { subject: "Geography", mark: "90" },
      { subject: "Accounting", mark: "90" }
    ]
  }, unverified);

  assert.ok(results.every(item => item.state === "UNKNOWN"));
  assert.ok(results.every(item => item.reasonCodes.includes("CATALOGUE_PUBLICATION_GATE_FAILED")));
});
