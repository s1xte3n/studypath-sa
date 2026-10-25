import test from "node:test";
import assert from "node:assert/strict";
import { simulateWhatIfMarks } from "../src/domain/what-if-mark-planner.mjs";

const catalogue = {
  institution: "Synthetic test institution",
  admissionCycle: "2027",
  status: "APPROVED_FOR_HACKATHON_DEMO_ONLY",
  catalogueVersion: "what-if-tests-v1",
  sources: [],
  programmes: [{
    id: "TEST-PATHWAY",
    name: "Synthetic test pathway",
    status: "APPROVED_FOR_HACKATHON_DEMO_ONLY",
    faculty: "Test Faculty",
    requirements: {
      english: { minLevel: 4, mappingStatus: "SOURCE_VERIFIED" },
      subjectRules: [{ subject: "MATHEMATICS", mandatory: true, minLevel: 6 }],
      aps: { min: 25 }
    },
    unresolved: []
  }]
};

function profile(mathMark = "69") {
  return [
    { subject: "English Home Language", mark: "80" },
    { subject: "Mathematics", mark: mathMark },
    { subject: "Physical Sciences", mark: "75" },
    { subject: "Life Sciences", mark: "75" },
    { subject: "Geography", mark: "75" },
    { subject: "Accounting", mark: "75" }
  ];
}

function simulate(actual, draft, activeCatalogue = catalogue) {
  return simulateWhatIfMarks({
    stage: "MATRIC_GRADUATE",
    actualSubjects: actual,
    simulatedSubjects: draft,
    catalogue: activeCatalogue
  });
}

test("a mark threshold boundary reuses the evaluator and explains the changed requirement", () => {
  const actual = profile("69");
  const result = simulate(actual, profile("70"));
  assert.equal(result.valid, true);
  assert.equal(result.hypothetical, true);
  assert.equal(result.stateChangeCount, 1);
  const pathway = result.changes.find(item => item.id === "TEST-PATHWAY");
  assert.equal(pathway.beforeState, "NOT_ELIGIBLE");
  assert.equal(pathway.afterState, "ELIGIBLE");
  assert.ok(pathway.requirements.some(item => item.label === "Mathematics" && item.before.status === "NOT_MET" && item.after.status === "MET"));
});

test("no-op scenarios report no changed pathways", () => {
  const marks = profile("70");
  const result = simulate(marks, profile("70"));
  assert.equal(result.valid, true);
  assert.equal(result.changedPathwayCount, 0);
  assert.deepEqual(result.changes, []);
});

test("invalid, missing, out-of-range and unsupported subject inputs fail safely", () => {
  assert.equal(simulate(profile(), profile("70").map(item => item.subject === "Mathematics" ? { ...item, mark: "" } : item)).valid, false);
  assert.equal(simulate(profile(), profile("70").map(item => item.subject === "Mathematics" ? { ...item, mark: "101" } : item)).valid, false);
  assert.equal(simulate(profile(), profile("70").map(item => item.subject === "Mathematics" ? { ...item, subject: "Made-up subject" } : item)).valid, false);
  assert.equal(simulate(profile(), profile("70").slice(1)).valid, false);
});

test("scenario cannot change subject identities or duplicate subjects", () => {
  const changedIdentity = profile("70").map(item => item.subject === "Mathematics" ? { ...item, subject: "History" } : item);
  assert.equal(simulate(profile(), changedIdentity).valid, false);
  const duplicate = [...profile("70"), { subject: "Mathematics", mark: "70" }];
  assert.equal(simulate(profile(), duplicate).valid, false);
});

test("simulation leaves the actual profile unchanged", () => {
  const actual = profile("69");
  const before = structuredClone(actual);
  const result = simulate(actual, profile("70"));
  assert.equal(result.valid, true);
  assert.deepEqual(actual, before);
  assert.equal(actual.find(item => item.subject === "Mathematics").mark, "69");
});

test("UNKNOWN remains UNKNOWN when material rule ambiguity remains", () => {
  const uncertainCatalogue = structuredClone(catalogue);
  uncertainCatalogue.programmes[0].unresolved = ["Exact AND/OR branch interpretation requires curator review."];
  const result = simulate(profile("70"), profile("75"), uncertainCatalogue);
  assert.equal(result.valid, true);
  assert.equal(result.changes[0].beforeState, "UNKNOWN");
  assert.equal(result.changes[0].afterState, "UNKNOWN");
});
