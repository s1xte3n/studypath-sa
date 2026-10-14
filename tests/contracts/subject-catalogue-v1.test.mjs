import test from "node:test";
import assert from "node:assert/strict";

// Contract-only reference implementation. This deliberately has no aliases.
// Keep in sync with docs/product/SUBJECT-CATALOGUE-V1.md.
const VERSION = "subject-catalogue-v1";
const SUBJECTS = new Map([
  ["mathematics", "MATHEMATICS"],
  ["mathematical literacy", "MATHEMATICAL_LITERACY"],
  ["technical mathematics", "TECHNICAL_MATHEMATICS"],
  ["physical sciences", "PHYSICAL_SCIENCES"],
  ["technical sciences", "TECHNICAL_SCIENCES"],
  ["life sciences", "LIFE_SCIENCES"],
  ["life orientation", "LIFE_ORIENTATION"],
  ["english — home language", "ENGLISH_HOME_LANGUAGE"],
  ["english — first additional language", "ENGLISH_FIRST_ADDITIONAL_LANGUAGE"],
  ["english — second additional language", "ENGLISH_SECOND_ADDITIONAL_LANGUAGE"],
]);

function normalizeSubject(input, catalogueVersion = VERSION) {
  if (typeof input !== "string" || catalogueVersion !== VERSION) {
    return { subjectId: null, displayName: null, normalizationStatus: "UNRESOLVED", catalogueVersion: VERSION };
  }
  const key = input.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-ZA");
  const subjectId = SUBJECTS.get(key);
  if (!subjectId) {
    return { subjectId: null, displayName: null, normalizationStatus: "UNRESOLVED", catalogueVersion: VERSION };
  }
  const displayName = [...SUBJECTS.entries()].find(([, id]) => id === subjectId)[0];
  return {
    subjectId,
    displayName,
    normalizationStatus: "CANONICAL",
    catalogueVersion: VERSION,
  };
}

function normalizeSubjectSet(labels) {
  const normalized = labels.map((label) => normalizeSubject(label));
  const resolved = normalized.filter((item) => item.subjectId !== null);
  const ids = resolved.map((item) => item.subjectId);
  return {
    entries: normalized,
    duplicate: new Set(ids).size !== ids.length,
  };
}

test("T-SUB-001: trims and collapses whitespace for exact canonical label", () => {
  assert.equal(normalizeSubject("  Mathematics   ").subjectId, "MATHEMATICS");
});
test("T-SUB-002: case variation resolves to same canonical ID", () => {
  assert.equal(normalizeSubject("mAtHeMaTiCs").subjectId, "MATHEMATICS");
});
test("T-SUB-003: unapproved abbreviations and aliases remain unresolved", () => {
  for (const label of ["Maths", "Math Lit", "Tech Maths", "English HL", "English FAL"]) {
    assert.equal(normalizeSubject(label).normalizationStatus, "UNRESOLVED", label);
  }
});
test("T-SUB-004: Mathematics, Mathematical Literacy and Technical Mathematics remain distinct", () => {
  assert.deepEqual(
    ["Mathematics", "Mathematical Literacy", "Technical Mathematics"].map((label) => normalizeSubject(label).subjectId),
    ["MATHEMATICS", "MATHEMATICAL_LITERACY", "TECHNICAL_MATHEMATICS"],
  );
});
test("T-SUB-005: Physical Sciences and Technical Sciences remain distinct", () => {
  assert.notEqual(normalizeSubject("Physical Sciences").subjectId, normalizeSubject("Technical Sciences").subjectId);
});
test("T-SUB-006: English HL, FAL and Second Additional Language remain distinct", () => {
  const ids = [
    "English — Home Language",
    "English — First Additional Language",
    "English — Second Additional Language",
  ].map((label) => normalizeSubject(label).subjectId);
  assert.equal(new Set(ids).size, 3);
});
test("T-SUB-007: duplicate resolved subject IDs are detectable", () => {
  assert.equal(normalizeSubjectSet(["Mathematics", " mathematics "]).duplicate, true);
});
test("T-SUB-008: unsupported input never selects an arbitrary mapping", () => {
  assert.equal(normalizeSubject("Technical Science").subjectId, null);
});
test("T-SUB-009: non-string subject input is unresolved", () => {
  assert.equal(normalizeSubject(null).normalizationStatus, "UNRESOLVED");
});
test("T-SUB-010: stale catalogue version is unresolved", () => {
  assert.equal(normalizeSubject("Mathematics", "subject-catalogue-v0").normalizationStatus, "UNRESOLVED");
});
test("T-SUB-011: result does not return raw input label", () => {
  const input = "Learner's private label";
  const result = normalizeSubject(input);
  assert.equal(Object.hasOwn(result, "inputLabel"), false);
  assert.equal(JSON.stringify(result).includes(input), false);
});
test("T-SUB-012: unsupported English level cannot map to a generic English rule", () => {
  assert.equal(normalizeSubject("English").normalizationStatus, "UNRESOLVED");
});
