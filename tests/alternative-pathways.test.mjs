import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildPathwayResults } from "../src/domain/pathway-matching.mjs";
import { suggestAlternativePathways } from "../src/domain/alternative-pathways.mjs";

const catalogue = JSON.parse(await readFile(new URL("../docs/product/uj-2027-pilot-catalogue-draft.json", import.meta.url), "utf8"));
const learner = {
  stage: "MATRIC_GRADUATE",
  subjects: [
    { subject: "English Home Language", mark: "90" },
    { subject: "Mathematics", mark: "50" },
    { subject: "Physical Sciences", mark: "75" },
    { subject: "Life Sciences", mark: "70" },
    { subject: "Geography", mark: "65" },
    { subject: "Accounting", mark: "60" }
  ]
};

test("suggestions only use unique active catalogue records and preserve each evaluated state", () => {
  const results = buildPathwayResults(learner, catalogue);
  const preferred = results.find(item => item.id === "UJ-2027-BSC-IT");
  const suggestions = suggestAlternativePathways({ preferred, results, catalogue });

  assert.ok(suggestions.length > 0);
  assert.ok(suggestions.length <= 3);
  assert.equal(new Set(suggestions.map(item => item.id)).size, suggestions.length);
  for (const suggestion of suggestions) {
    assert.ok(catalogue.programmes.some(programme => programme.id === suggestion.id));
    assert.equal(suggestion.state, results.find(item => item.id === suggestion.id).state);
    assert.ok(["ELIGIBLE", "NOT_ELIGIBLE", "UNKNOWN"].includes(suggestion.state));
    assert.ok(suggestion.relevanceReason.length > 0);
    assert.ok(suggestion.relationshipDisclaimer.includes("not a verified progression"));
  }
});

test("eligible preferred pathways do not trigger recovery suggestions", () => {
  const results = buildPathwayResults(learner, catalogue);
  const preferred = { ...results.find(item => item.id === "UJ-2027-BSC-IT"), state: "ELIGIBLE" };
  assert.deepEqual(suggestAlternativePathways({ preferred, results, catalogue }), []);
});

test("mixed candidate states are preserved without promotion or demotion", () => {
  const syntheticCatalogue = {
    catalogueVersion: "test-v1",
    programmes: [
      { id: "preferred", faculty: "Test Faculty", requirements: { subjectRules: [{ subject: "MATHEMATICS" }] } },
      { id: "candidate-eligible", faculty: "Test Faculty", requirements: { subjectRules: [{ subject: "MATHEMATICS" }] } },
      { id: "candidate-not-eligible", faculty: "Test Faculty", requirements: { subjectRules: [{ subject: "MATHEMATICS" }] } },
      { id: "candidate-unknown", faculty: "Test Faculty", requirements: { subjectRules: [{ subject: "MATHEMATICS" }] } }
    ]
  };
  const results = [
    { id: "preferred", state: "UNKNOWN", name: "Preferred", reason: "Uncertain", requirementEvidence: [] },
    { id: "candidate-eligible", state: "ELIGIBLE", name: "Eligible candidate", reason: "Recorded minimums met", requirementEvidence: [{ status: "MET" }] },
    { id: "candidate-not-eligible", state: "NOT_ELIGIBLE", name: "Not eligible candidate", reason: "Recorded minimum not met", requirementEvidence: [{ status: "NOT_MET" }] },
    { id: "candidate-unknown", state: "UNKNOWN", name: "Unknown candidate", reason: "Evidence missing", requirementEvidence: [{ status: "UNKNOWN" }] }
  ];
  const suggestions = suggestAlternativePathways({ preferred: results[0], results, catalogue: syntheticCatalogue, limit: 3 });
  assert.deepEqual(suggestions.map(item => item.state).sort(), ["ELIGIBLE", "NOT_ELIGIBLE", "UNKNOWN"]);
  for (const suggestion of suggestions) {
    assert.equal(suggestion.reason, results.find(item => item.id === suggestion.id).reason);
    assert.deepEqual(suggestion.requirementEvidence, results.find(item => item.id === suggestion.id).requirementEvidence);
  }
});

test("empty, partial, duplicate and unknown catalogue data fail closed without invented records", () => {
  const results = buildPathwayResults(learner, catalogue);
  const preferred = results.find(item => item.id === "UJ-2027-BSC-IT");
  assert.deepEqual(suggestAlternativePathways({ preferred, results, catalogue: { ...catalogue, programmes: [] } }), []);
  assert.deepEqual(suggestAlternativePathways({ preferred, results: [preferred], catalogue }), []);
  const duplicated = [...results, results[0], { ...results[0], id: "NOT-IN-CATALOGUE", name: "Invented pathway" }];
  const suggestions = suggestAlternativePathways({ preferred, results: duplicated, catalogue });
  assert.ok(suggestions.every(item => catalogue.programmes.some(programme => programme.id === item.id)));
  assert.ok(!suggestions.some(item => item.id === "NOT-IN-CATALOGUE"));
});

test("duplicate catalogue IDs and duplicate evaluated results are emitted at most once", () => {
  const results = buildPathwayResults(learner, catalogue);
  const preferred = results.find(item => item.id === "UJ-2027-BSC-IT");
  const duplicateCatalogue = { ...catalogue, programmes: [...catalogue.programmes, catalogue.programmes[1]] };
  const suggestions = suggestAlternativePathways({
    preferred,
    results: [...results, results[1]],
    catalogue: duplicateCatalogue
  });
  assert.equal(new Set(suggestions.map(item => item.id)).size, suggestions.length);
});

test("unsupported preferred IDs and invalid limits do not produce suggestions", () => {
  const results = buildPathwayResults(learner, catalogue);
  assert.deepEqual(suggestAlternativePathways({
    preferred: { id: "NOT-IN-CATALOGUE", state: "UNKNOWN" }, results, catalogue
  }), []);
  assert.throws(() => suggestAlternativePathways({
    preferred: results[0], results, catalogue, limit: 0
  }), /limit must be/);
});
