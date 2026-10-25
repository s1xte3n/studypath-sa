import test from "node:test";
import assert from "node:assert/strict";
import { getDiscoverySummary, getProfileCompleteness } from "../src/domain/discovery-summary.mjs";

test("profile completeness progresses across three required sections and six subjects", () => {
  assert.deepEqual(getProfileCompleteness({ stage: "", subjects: [] }), {
    completedSections: 0, requiredSections: 3, percentage: 0,
    subjectCount: 0, requiredSubjectCount: 6, markedSubjectCount: 0, hasStage: false
  });
  assert.equal(getProfileCompleteness({ stage: "GRADE_12", subjects: [] }).percentage, 33);
  assert.equal(getProfileCompleteness({
    stage: "GRADE_12",
    subjects: [{ subject: "Mathematics", mark: "" }]
  }).percentage, 39);
  assert.equal(getProfileCompleteness({
    stage: "GRADE_12",
    subjects: [{ subject: "Mathematics", mark: "75" }]
  }).percentage, 44);
  assert.deepEqual(getProfileCompleteness({
    stage: "GRADE_12",
    subjects: [
      { subject: "Mathematics", mark: "75" },
      { subject: "Physical Sciences", mark: "80" },
      { subject: "Life Sciences", mark: "70" },
      { subject: "Geography", mark: "65" },
      { subject: "History", mark: "60" },
      { subject: "Accounting", mark: "90" }
    ]
  }), {
    completedSections: 3, requiredSections: 3, percentage: 100,
    subjectCount: 6, requiredSubjectCount: 6, markedSubjectCount: 6, hasStage: true
  });
  assert.equal(getProfileCompleteness({
    stage: "GRADE_12",
    subjects: [
      { subject: "Mathematics", mark: "75" },
      { subject: "Physical Sciences", mark: "80" },
      { subject: "Life Sciences", mark: "70" },
      { subject: "Geography", mark: "65" },
      { subject: "History", mark: "60" },
      { subject: "Accounting", mark: "90" },
      { subject: "Business Studies", mark: "99" }
    ]
  }).percentage, 100, "extra subjects do not increase completeness beyond 100%");
});

test("invalid marks contribute no mark progress and duplicate subjects do not count", () => {
  for (const mark of ["", "-1", "101", "75.5", "abc"]) {
    const profile = getProfileCompleteness({
      stage: "GRADE_12",
      subjects: [{ subject: "Mathematics", mark }]
    });
    assert.equal(profile.percentage, 39);
    assert.equal(profile.subjectCount, 1);
    assert.equal(profile.markedSubjectCount, 0);
  }
  const duplicateProfile = getProfileCompleteness({
    stage: "GRADE_12",
    subjects: [
      { subject: "Mathematics", mark: "75" },
      { subject: "Mathematics", mark: "80" }
    ]
  });
  assert.equal(duplicateProfile.percentage, 33);
  assert.equal(duplicateProfile.subjectCount, 0);
  assert.equal(duplicateProfile.markedSubjectCount, 0);
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
