import test from "node:test";
import assert from "node:assert/strict";
import { achievementLevelForMark, calculateProvisionalAps, APS_SOURCE } from "../src/domain/eligibility/provisional-aps.mjs";

const six = [29, 30, 40, 50, 60, 80].map((mark, index) => ({ subject: ["Mathematics", "Physical Sciences", "Life Sciences", "Geography", "History", "Accounting"][index], mark }));

test("mark bands include every documented boundary", () => {
  for (const [mark, expected] of [[0,1],[29,1],[30,2],[39,2],[40,3],[49,3],[50,4],[59,4],[60,5],[69,5],[70,6],[79,6],[80,7],[100,7]]) {
    assert.equal(achievementLevelForMark(mark), expected, `mark ${mark}`);
  }
  assert.throws(() => achievementLevelForMark(-1), RangeError);
  assert.throws(() => achievementLevelForMark(101), RangeError);
  assert.throws(() => achievementLevelForMark(75.5), RangeError);
});

test("calculates a provisional total from exactly six distinct non-LO subjects", () => {
  const result = calculateProvisionalAps(six);
  assert.equal(result.state, "PROVISIONAL");
  assert.equal(result.aps, 1 + 2 + 3 + 4 + 5 + 7);
  assert.equal(result.includedSubjects.length, 6);
  assert.equal(result.excludedSubjects.length, 0);
  assert.match(result.reason, /does not determine programme eligibility/);
});

test("selects the six highest achievement levels when more than six subjects are supplied", () => {
  const rows = [...six, { subject: "Business Studies", mark: 100 }];
  const result = calculateProvisionalAps(rows);
  assert.equal(result.state, "PROVISIONAL");
  assert.equal(result.aps, 2 + 3 + 4 + 5 + 7 + 7);
  assert.equal(result.includedSubjects.length, 6);
  assert.ok(!result.includedSubjects.some(row => row.subject === "Mathematics"));
  assert.match(result.reason, /Programme-required subjects can change/);
});

test("Life Orientation is excluded and reported", () => {
  const result = calculateProvisionalAps([...six, { subject: "Life Orientation", mark: 100 }]);
  assert.equal(result.state, "PROVISIONAL");
  assert.equal(result.aps, 22);
  assert.deepEqual(result.excludedSubjects.map(row => row.subject), ["Life Orientation"]);
});

test("fewer than six eligible subjects returns UNKNOWN without a total", () => {
  const result = calculateProvisionalAps(six.slice(0, 5));
  assert.equal(result.state, "UNKNOWN");
  assert.equal(result.aps, null);
});

test("programme-required subjects are included before filling remaining places with highest levels", () => {
  const rows = [...six, { subject: "Business Studies", mark: 100 }];
  const result = calculateProvisionalAps(rows, { requiredSubjects: ["Mathematics", "Physical Sciences"] });
  assert.equal(result.state, "PROVISIONAL");
  assert.equal(result.includedSubjects.length, 6);
  assert.ok(result.includedSubjects.some(row => row.subject === "Mathematics"));
  assert.ok(result.includedSubjects.some(row => row.subject === "Physical Sciences"));
  assert.equal(result.aps, 1 + 2 + 3 + 5 + 7 + 7);
});

test("missing required programme subject returns UNKNOWN", () => {
  const result = calculateProvisionalAps(six, { requiredSubjects: ["English Home Language"] });
  assert.equal(result.state, "UNKNOWN");
  assert.equal(result.aps, null);
  assert.match(result.reason, /Add the programme-required subject/);
});

test("unresolved or invalid required-subject rules return UNKNOWN", () => {
  assert.equal(calculateProvisionalAps(six, { requiredSubjects: ["Life Orientation"] }).state, "UNKNOWN");
  assert.equal(calculateProvisionalAps(six, { requiredSubjects: ["Computer Science"] }).state, "UNKNOWN");
  assert.equal(calculateProvisionalAps(six, { requiredSubjects: ["Mathematics", "Mathematics"] }).state, "UNKNOWN");
});

test("duplicate canonical subjects are rejected", () => {
  const result = calculateProvisionalAps([...six, { subject: " mathematics ", mark: 95 }]);
  assert.equal(result.state, "INPUT_REJECTED");
  assert.equal(result.aps, null);
});

test("missing, fractional, and out-of-range marks are rejected", () => {
  for (const mark of ["", "75.5", "-1", "101", undefined]) {
    const result = calculateProvisionalAps(six.map((row, index) => index === 0 ? { ...row, mark } : row));
    assert.equal(result.state, "INPUT_REJECTED");
    assert.equal(result.aps, null);
  }
});

test("unsupported subjects and non-string/non-number marks are rejected", () => {
  assert.equal(calculateProvisionalAps(six.map((row, index) => index === 0 ? { ...row, subject: "Computer Science" } : row)).state, "INPUT_REJECTED");
  assert.equal(calculateProvisionalAps(six.map((row, index) => index === 0 ? { ...row, mark: true } : row)).state, "INPUT_REJECTED");
});

test("source disclosure links the prospectus and policy FAQ but retains draft status", () => {
  assert.equal(APS_SOURCE.status, "DRAFT_NOT_FOR_DEFINITIVE_SCREENING");
  assert.equal(APS_SOURCE.printedPage, 16);
  assert.match(APS_SOURCE.url, /uj_undergrad_prospectus2027/);
  assert.match(APS_SOURCE.policyUrl, /frequently-asked-questions/);
});
