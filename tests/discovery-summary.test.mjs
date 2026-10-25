import test from "node:test";
import assert from "node:assert/strict";
import { getDiscoverySummary, getProfileCompleteness } from "../src/domain/discovery-summary.mjs";

test("profile completeness counts three required sections independently", () => {
  assert.deepEqual(getProfileCompleteness({ stage: "", subjects: [{ subject: "", mark: "" }] }), {
    completedSections: 0, requiredSections: 3, percentage: 0
  });
  assert.deepEqual(getProfileCompleteness({ stage: "GRADE_12", subjects: [] }), {
    completedSections: 1, requiredSections: 3, percentage: 33
  });
  assert.deepEqual(getProfileCompleteness({
    stage: "",
    subjects: [{ subject: "Mathematics", mark: "" }]
  }), {
    completedSections: 1, requiredSections: 3, percentage: 33
  });
  assert.deepEqual(getProfileCompleteness({
    stage: "GRADE_12",
    subjects: [{ subject: "Mathematics", mark: "" }, { subject: "", mark: "" }]
  }), {
    completedSections: 2, requiredSections: 3, percentage: 67
  });
  assert.deepEqual(getProfileCompleteness({
    stage: "GRADE_12",
    subjects: [{ subject: "Mathematics", mark: "75" }, { subject: "", mark: "" }]
  }), {
    completedSections: 3, requiredSections: 3, percentage: 100
  });
});

test("invalid marks do not complete the mark section, while the unique subject section still counts", () => {
  for (const mark of ["", "-1", "101", "75.5", "abc"]) {
    assert.deepEqual(getProfileCompleteness({
      stage: "GRADE_12",
      subjects: [{ subject: "Mathematics", mark }]
    }), {
      completedSections: 2, requiredSections: 3, percentage: 67
    });
  }
});

test("duplicate subjects do not count as a unique subject or valid unique subject mark", () => {
  assert.deepEqual(getProfileCompleteness({
    stage: "GRADE_12",
    subjects: [
      { subject: "Mathematics", mark: "75" },
      { subject: "Mathematics", mark: "80" }
    ]
  }), {
    completedSections: 1, requiredSections: 3, percentage: 33
  });
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
