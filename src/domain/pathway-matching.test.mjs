import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildPathwayResults } from "./pathway-matching.mjs";

const catalogue = JSON.parse(
  await readFile(new URL("../../docs/product/uj-2027-pilot-catalogue-draft.json", import.meta.url), "utf8")
);
const learner = {
  stage: "GRADE_12",
  subjects: [
    { subject: "English Home Language", mark: "65" },
    { subject: "Mathematics", mark: "75" },
    { subject: "Physical Sciences", mark: "68" },
    { subject: "Life Sciences", mark: "62" },
    { subject: "Geography", mark: "71" },
    { subject: "Business Studies", mark: "66" }
  ]
};

test("pathway results expose programme facts and retained official UJ source URLs", () => {
  const results = buildPathwayResults(learner, catalogue);
  assert.ok(results.length > 0);

  const it = results.find(item => item.id === "UJ-2027-BSC-IT");
  assert.ok(it, "expected the draft catalogue's BSc in Information Technology record");
  assert.equal(it.code, "B2I01Q");
  assert.equal(it.faculty, "Faculty of Science");
  assert.equal(it.campus, "Auckland Park Kingsway");
  assert.equal(it.durationYears, 3);
  assert.ok(it.sourceLinks.some(link => link.url === "https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf"));
  assert.ok(it.sourceLinks.some(link => link.url.endsWith(".pdf")));
  assert.ok(it.sourceLinks.every(link => link.url.startsWith("https://www.uj.ac.za/")));
});

test("draft catalogue results remain UNKNOWN and unresolved evidence is surfaced", () => {
  const results = buildPathwayResults(learner, catalogue);
  assert.ok(results.every(item => item.state === "UNKNOWN"));
  const it = results.find(item => item.id === "UJ-2027-BSC-IT");
  assert.ok(it.requirementNotes.includes("English stream mapping"));
  assert.equal(it.catalogueStatus, "DRAFT_NOT_FOR_DEFINITIVE_SCREENING");
});

test("missing detail data uses empty notes and source links rather than invented values", () => {
  const minimalCatalogue = {
    ...catalogue,
    programmes: [{ id: "SAMPLE", name: "Sample pathway", status: "DRAFT" }],
    sources: []
  };
  const result = buildPathwayResults(learner, minimalCatalogue)[0];
  assert.deepEqual(result.requirementNotes, []);
  assert.deepEqual(result.sourceLinks, []);
  assert.equal(result.code, null);
  assert.equal(result.durationYears, null);
  assert.equal(result.faculty, null);
  assert.equal(result.campus, null);
});
