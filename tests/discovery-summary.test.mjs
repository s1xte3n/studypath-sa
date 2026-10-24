import test from "node:test";
import assert from "node:assert/strict";
import { getDiscoverySummary, getProfileCompleteness } from "../src/domain/discovery-summary.mjs";

test("profile completeness follows the documented two-section formula", () => {
  assert.deepEqual(getProfileCompleteness({ stage: "", subjects: [{ subject: "", mark: "" }] }), {
    completedSections: 0, requiredSections: 2, percentage: 0
  });
  assert.equal(getProfileCompleteness({ stage: "GRADE_12", subjects: [] }).percentage, 50);
  assert.equal(getProfileCompleteness({
    stage: "",
    subjects: [{ subject: "Mathematics", mark: "75" }]
  }).percentage, 50);
  assert.equal(getProfileCompleteness({
    stage: "GRADE_12",
    subjects: [{ subject: "Mathematics", mark: "75" }, { subject: "", mark: "" }]
  }).percentage, 100);
});

test("invalid marks and duplicate subjects do not complete the subject section", () => {
  for (const mark of ["", "-1", "101", "75.5", "abc"]) {
    assert.equal(getProfileCompleteness({
      stage: "GRADE_12",
      subjects: [{ subject: "Mathematics", mark }]
    }).percentage, 50);
  }
  assert.equal(getProfileCompleteness({
    stage: "GRADE_12",
    subjects: [
      { subject: "Mathematics", mark: "75" },
      { subject: "Mathematics", mark: "80" }
    ]
  }).percentage, 50);
});

const results = [
  { id: "a", state: "UNKNOWN", campus: "Auckland Park" },
  { id: "b", state: "UNKNOWN", campus: "Doornfontein" },
  { id: "c", state: "NOT_ELIGIBLE", campus: "Auckland Park" },
  { id: "d", state: "ELIGIBLE", campus: null }
];

test("discovery summary distinguishes total candidates from filtered visible results", () => {
  const summary = getDiscoverySummary({
    stage: "GRADE_12",
    subjects: [{ subject: "Mathematics", mark: "75" }],
    results,
    eligibilityFilter: "UNKNOWN"
  });
  assert.equal(summary.totalCandidates, 4);
  assert.equal(summary.visibleCount, 2);
  assert.deepEqual(summary.stateCounts, { ELIGIBLE: 0, NOT_ELIGIBLE: 0, UNKNOWN: 2 });
  assert.deepEqual(summary.campuses, ["Auckland Park", "Doornfontein"]);
});

test("counts reconcile with simultaneous state and campus filters", () => {
  const summary = getDiscoverySummary({
    stage: "GRADE_12",
    subjects: [],
    results,
    eligibilityFilter: "UNKNOWN",
    campusFilter: "Doornfontein"
  });
  assert.equal(summary.totalCandidates, 4);
  assert.equal(summary.visibleCount, 1);
  assert.deepEqual(summary.stateCounts, { ELIGIBLE: 0, NOT_ELIGIBLE: 0, UNKNOWN: 1 });
  assert.deepEqual(summary.visibleResults.map(item => item.id), ["b"]);
});

test("filter with no matches returns zero visible results without changing candidate total", () => {
  const summary = getDiscoverySummary({
    stage: "GRADE_12",
    subjects: [],
    results,
    eligibilityFilter: "ELIGIBLE",
    campusFilter: "Doornfontein"
  });
  assert.equal(summary.totalCandidates, 4);
  assert.equal(summary.visibleCount, 0);
  assert.deepEqual(summary.stateCounts, { ELIGIBLE: 0, NOT_ELIGIBLE: 0, UNKNOWN: 0 });
});
