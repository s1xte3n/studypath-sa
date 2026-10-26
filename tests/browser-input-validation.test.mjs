import test from "node:test";
import assert from "node:assert/strict";
import { validateStudentEntries } from "../src/domain/student-input-validation.mjs";

const valid = (mark = "75") => ({ stage: "GRADE_12", subjects: [{ subject: "Mathematics", mark }] });

test("accepts valid integer marks including the 0 and 100 boundaries", () => {
  for (const mark of ["0", "50", "100"]) {
    assert.deepEqual(validateStudentEntries(valid(mark)), []);
  }
});

test("rejects an unknown or missing study stage", () => {
  assert.deepEqual(validateStudentEntries({ ...valid(), stage: "" }), ["Select your current study stage."]);
  assert.deepEqual(validateStudentEntries({ ...valid(), stage: "GRADE_13" }), ["Select your current study stage."]);
});

test("rejects missing subject rows", () => {
  assert.deepEqual(validateStudentEntries({ stage: "GRADE_12", subjects: [] }), ["Add at least one subject and mark."]);
  assert.deepEqual(validateStudentEntries({ stage: "GRADE_12" }), ["Add at least one subject and mark."]);
});

test("ignores completely blank optional rows but validates partially completed rows", () => {
  const blankRows = Array.from({ length: 6 }, () => ({ subject: "", mark: "", customSubject: false }));
  assert.deepEqual(validateStudentEntries({ stage: "GRADE_12", subjects: blankRows }), [
    "Add at least one subject and mark."
  ]);
  assert.deepEqual(validateStudentEntries({ stage: "GRADE_12", subjects: [
    { subject: "Mathematics", mark: "75" },
    ...blankRows.slice(1)
  ] }), []);
  assert.deepEqual(validateStudentEntries({ stage: "GRADE_12", subjects: [
    { subject: "", mark: "75" }
  ] }), ["Choose a subject for row 1."]);
  assert.deepEqual(validateStudentEntries({ stage: "GRADE_12", subjects: [
    { subject: "Mathematics", mark: "" }
  ] }), ["Enter a whole-number mark from 0 to 100 for row 1."]);
  assert.deepEqual(validateStudentEntries({ stage: "GRADE_12", subjects: [
    { subject: "", mark: "", customSubject: true }
  ] }), [
    "Choose a subject for row 1.",
    "Enter a whole-number mark from 0 to 100 for row 1."
  ]);
});

test("rejects decimal, non-numeric, negative and over-100 marks", () => {
  for (const mark of ["72.5", "abc", "-1", "101", " "]) {
    assert.equal(validateStudentEntries(valid(mark)).some(message => message.includes("whole-number mark")), true, mark);
  }
});

test("rejects unsupported subjects before pathway evaluation", () => {
  assert.deepEqual(validateStudentEntries({
    stage: "GRADE_12",
    subjects: [{ subject: "Made-up subject", mark: "90" }]
  }), ["Choose a supported subject for row 1."]);
});

test("rejects duplicate subjects", () => {
  assert.deepEqual(validateStudentEntries({ stage: "GRADE_11", subjects: [
    { subject: "Mathematics", mark: "60" },
    { subject: "Mathematics", mark: "70" }
  ] }), ["Mathematics is listed more than once."]);
});

test("does not treat a valid form as an eligibility decision", () => {
  assert.deepEqual(validateStudentEntries(valid("80")), []);
});
