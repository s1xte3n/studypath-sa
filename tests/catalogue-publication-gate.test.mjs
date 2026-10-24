import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateCatalogueForPublication } from "../src/domain/eligibility/catalogue-publication-gate.mjs";

const draftCatalogue = JSON.parse(await readFile(
  new URL("../docs/product/uj-2027-pilot-catalogue-draft.json", import.meta.url), "utf8"
));

test("current UJ pilot catalogue fails closed as draft", () => {
  const result = validateCatalogueForPublication(draftCatalogue);
  assert.equal(result.publishable, false);
  assert.ok(result.issues.some(issue => issue.code === "CATALOGUE_NOT_APPROVED"));
  assert.ok(result.issues.some(issue => issue.code === "SOURCE_VERSION_NOT_APPROVED"));
  assert.ok(result.issues.some(issue => issue.code === "CURATOR_SIGNOFF_INVALID"));
  assert.ok(result.issues.some(issue => issue.code === "PROGRAMME_RULES_UNRESOLVED"));
  assert.ok(result.issues.some(issue => issue.code === "SOURCE_LIMITATION_OPEN"));
});

test("missing or malformed catalogue fails closed", () => {
  assert.equal(validateCatalogueForPublication(null).publishable, false);
  assert.equal(validateCatalogueForPublication({}).publishable, false);
});

test("a fabricated approval flag cannot bypass missing provenance and sign-off", () => {
  const candidate = structuredClone(draftCatalogue);
  candidate.status = "APPROVED_FOR_DEFINITIVE_SCREENING";
  candidate.sourcePolicy.governingSourceVersionStatus = "VERIFIED_AND_APPROVED";
  for (const source of candidate.sources) source.limitation = "";
  for (const programme of candidate.programmes) {
    programme.status = "APPROVED";
    programme.unresolved = [];
    programme.curatorSignoff = null;
  }
  const result = validateCatalogueForPublication(candidate);
  assert.equal(result.publishable, false);
  assert.ok(result.issues.some(issue => issue.code === "CURATOR_SIGNOFF_INVALID"));
});

test("unknown source references, non-official URLs, invalid dates and unresolved page locations fail closed", () => {
  const candidate = structuredClone(draftCatalogue);
  candidate.status = "APPROVED_FOR_DEFINITIVE_SCREENING";
  candidate.sourcePolicy.governingSourceVersionStatus = "VERIFIED_AND_APPROVED";
  candidate.sources[0].url = "http://example.invalid/prospectus.pdf";
  candidate.sources[0].verificationDate = "2026-02-31";
  candidate.programmes[0].sourceEvidence = [{ sourceId: "DOES-NOT-EXIST", location: "printed p. to verify" }];
  const result = validateCatalogueForPublication(candidate);
  assert.ok(result.issues.some(issue => issue.code === "SOURCE_URL_INVALID"));
  assert.ok(result.issues.some(issue => issue.code === "SOURCE_VERIFICATION_DATE_INVALID"));
  assert.ok(result.issues.some(issue => issue.code === "PROGRAMME_SOURCE_UNKNOWN"));
  assert.ok(result.issues.some(issue => issue.code === "SOURCE_LOCATION_INVALID"));
});

test("a deliberately complete synthetic fixture can pass structural checks", () => {
  const fixture = {
    catalogueVersion: "synthetic-test-v1",
    institution: "University of Johannesburg",
    admissionCycle: "2027",
    status: "APPROVED_FOR_DEFINITIVE_SCREENING",
    sourcePolicy: { governingSourceVersionStatus: "VERIFIED_AND_APPROVED" },
    sources: [{
      id: "SYNTHETIC-SOURCE",
      url: "https://www.uj.ac.za/example.pdf",
      sourceVersion: "Synthetic fixture only",
      verificationDate: "2026-10-24",
      limitation: "",
      localEvidence: { sha256: "a".repeat(64), inspectedLocally: true }
    }],
    programmes: [{
      id: "SYNTHETIC-PROGRAMME",
      name: "Synthetic programme",
      code: "SYN-001",
      status: "APPROVED",
      curatorSignoff: {
        curatorName: "Synthetic test curator (not a real approval)",
        signedAt: "2026-10-24",
        scope: "Test fixture only",
        evidenceReference: "TEST-FIXTURE"
      },
      unresolved: [],
      sourceEvidence: [{ sourceId: "SYNTHETIC-SOURCE", location: "printed p. 1" }]
    }]
  };
  assert.deepEqual(validateCatalogueForPublication(fixture), { publishable: true, issues: [] });
});
