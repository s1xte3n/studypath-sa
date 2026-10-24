import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(here, "fixtures", "uj-2027-eligibility-golden-cases.v1.json");
const cataloguePath = path.join(here, "..", "docs", "product", "uj-2027-pilot-catalogue-draft.json");

const [oracle, catalogue] = await Promise.all([
  readFile(fixturePath, "utf8").then(JSON.parse),
  readFile(cataloguePath, "utf8").then(JSON.parse),
]);

const validStates = new Set([
  "ELIGIBLE",
  "NOT_ELIGIBLE",
  "UNKNOWN",
  "INPUT_REJECTED",
  "SAME_AS_FIRST_EVALUATION",
]);
const validReason = /^[A-Z][A-Z0-9_]*$/;
const programmesById = new Map(catalogue.programmes.map((programme) => [programme.id, programme]));

function levelForPercent(percent) {
  if (!Number.isInteger(percent) || percent < 0 || percent > 100) {
    throw new RangeError(`Mark must be an integer from 0 to 100; received ${percent}`);
  }
  if (percent < 30) return 1;
  if (percent < 40) return 2;
  if (percent < 50) return 3;
  if (percent < 60) return 4;
  if (percent < 70) return 5;
  if (percent < 80) return 6;
  return 7;
}

function canonicalSubjectId(subjectId) {
  return subjectId.trim().toUpperCase();
}

function calculateAps(subjects, requiredSubjectIds = []) {
  const normalized = subjects.map((subject) => ({
    id: canonicalSubjectId(subject.subjectId),
    percent: subject.percent,
  }));

  for (const subject of normalized) {
    if (!subject.id || subject.id === "LIFE_ORIENTATION") continue;
    if (!Number.isInteger(subject.percent) || subject.percent < 0 || subject.percent > 100) {
      throw new RangeError(`Invalid mark for ${subject.id}`);
    }
  }

  const counted = normalized.filter((subject) => subject.id && subject.id !== "LIFE_ORIENTATION");
  const seen = new Set();
  for (const subject of counted) {
    if (seen.has(subject.id)) throw new TypeError(`Duplicate canonical subject: ${subject.id}`);
    seen.add(subject.id);
  }

  const required = requiredSubjectIds.map(canonicalSubjectId);
  if (required.some((id) => !counted.some((subject) => subject.id === id))) {
    throw new TypeError("A required subject is missing from the APS selection");
  }

  const ranked = counted
    .map((subject) => ({ ...subject, level: levelForPercent(subject.percent) }))
    .sort((a, b) => b.level - a.level || a.id.localeCompare(b.id));

  const selected = new Map();
  for (const requiredId of required) {
    const subject = ranked.find((candidate) => candidate.id === requiredId);
    if (subject) selected.set(requiredId, subject);
  }
  for (const subject of ranked) {
    if (selected.size >= 6) break;
    if (!selected.has(subject.id)) selected.set(subject.id, subject);
  }
  if (selected.size !== 6) throw new TypeError("Six eligible APS subjects are required");
  return [...selected.values()].reduce((sum, subject) => sum + subject.level, 0);
}

test("golden-case fixture has the expected schema and scope", () => {
  assert.equal(oracle.schemaVersion, "studypath-eligibility-golden-cases-v1");
  assert.equal(oracle.scope.institution, "University of Johannesburg");
  assert.equal(oracle.scope.admissionCycle, "2027");
  assert.equal(oracle.scope.applicantRoute, "NSC");
  assert.equal(oracle.scope.syntheticOnly, true);
  assert.ok(Array.isArray(oracle.cases));
  assert.ok(oracle.cases.length >= oracle.assertionPolicy.minimumCaseCount);
});

test("every golden case has a unique ID, explicit expected outcome and reason codes", () => {
  const ids = oracle.cases.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length, "case IDs must be unique");

  for (const item of oracle.cases) {
    assert.match(item.id, /^UJ-GOLD-\d{3}$/);
    assert.ok(item.scenario?.trim(), `${item.id}: scenario is required`);
    assert.ok(validStates.has(item.expectedState), `${item.id}: unsupported expected state`);
    assert.ok(Array.isArray(item.expectedReasonCodes) && item.expectedReasonCodes.length > 0);
    assert.ok(item.expectedReasonCodes.every((reason) => validReason.test(reason)));
    assert.equal(item.inputIsSynthetic, true, `${item.id}: only synthetic data is allowed`);
    assert.ok(item.learnerInput && Array.isArray(item.learnerInput.subjects));
    assert.ok(programmesById.has(item.programmeId), `${item.id}: unknown programme ID`);
  }
});

test("the catalogue retains 30 demo-source records while programme records remain individually unapproved", () => {
  assert.ok(catalogue.programmes.length >= 7);
  assert.equal(catalogue.status, "APPROVED_FOR_HACKATHON_DEMO_ONLY");
  assert.equal(catalogue.catalogueVersion, "uj-2027-pilot-v0.3-hackathon-demo");
  assert.equal(catalogue.demoApproval.approvalScope, "FNB AOTY Hackathon 2026 demonstration only");
  assert.equal(catalogue.programmes.length, 30);
  const requiredPilotIds = [
    "UJ-2027-BSC-IT",
    "UJ-2027-BSC-CSI",
    "UJ-2027-BSC-CSI-EXT",
    "UJ-2027-BSC-CSI-AI",
    "UJ-2027-BCOM-IS",
    "UJ-2027-DIP-BIT",
    "UJ-2027-BCOM-IM",
  ];
  for (const id of requiredPilotIds) assert.ok(programmesById.has(id), `missing original pilot ${id}`);
  for (const programme of catalogue.programmes) {
    assert.equal(programme.status, "DRAFT", `${programme.id} must remain draft until curated`);
    assert.equal(programme.curatorSignoff ?? null, null, `${programme.id} must not imply curator approval`);
  }
});

test("NSC percentage-to-level mapping honours every boundary", () => {
  const boundaries = [
    [0, 1], [29, 1], [30, 2], [39, 2], [40, 3], [49, 3],
    [50, 4], [59, 4], [60, 5], [69, 5], [70, 6], [79, 6],
    [80, 7], [100, 7],
  ];
  for (const [mark, expectedLevel] of boundaries) {
    assert.equal(levelForPercent(mark), expectedLevel, `mark ${mark}`);
  }
  for (const invalid of [-1, 101, 65.5, "65", null]) {
    assert.throws(() => levelForPercent(invalid), RangeError);
  }
});

test("APS excludes Life Orientation and requires exactly six eligible school subjects", () => {
  const case19 = oracle.cases.find((item) => item.id === "UJ-GOLD-019");
  assert.ok(case19);
  assert.equal(calculateAps(case19.learnerInput.subjects, ["MATHEMATICS", "ENGLISH_FIRST_ADDITIONAL_LANGUAGE"]), 29);

  const case1 = oracle.cases.find((item) => item.id === "UJ-GOLD-001");
  assert.ok(case1);
  assert.equal(calculateAps(case1.learnerInput.subjects, ["MATHEMATICS", "ENGLISH_FIRST_ADDITIONAL_LANGUAGE"]), 30);
});

test("APS selection includes required subjects before filling the six highest eligible subjects", () => {
  const case20 = oracle.cases.find((item) => item.id === "UJ-GOLD-020");
  assert.ok(case20);
  assert.equal(calculateAps(case20.learnerInput.subjects, ["MATHEMATICS", "ENGLISH_FIRST_ADDITIONAL_LANGUAGE"]), 30);
});

test("duplicate canonical subjects and invalid marks are rejected by APS input validation", () => {
  const duplicateCase = oracle.cases.find((item) => item.id === "UJ-GOLD-021");
  const invalidCase = oracle.cases.find((item) => item.id === "UJ-GOLD-022");
  assert.ok(duplicateCase);
  assert.ok(invalidCase);
  assert.throws(() => calculateAps(duplicateCase.learnerInput.subjects), /Duplicate canonical subject/);
  assert.throws(() => calculateAps(invalidCase.learnerInput.subjects), /Invalid mark/);
});

test("expected outcome categories include uncertainty, verified failure, rejection and determinism", () => {
  const byId = new Map(oracle.cases.map((item) => [item.id, item]));
  assert.equal(byId.get("UJ-GOLD-001").expectedState, "ELIGIBLE");
  assert.equal(byId.get("UJ-GOLD-002").expectedState, "NOT_ELIGIBLE");
  assert.equal(byId.get("UJ-GOLD-006").expectedState, "UNKNOWN");
  assert.equal(byId.get("UJ-GOLD-021").expectedState, "INPUT_REJECTED");
  assert.equal(byId.get("UJ-GOLD-023").expectedState, "SAME_AS_FIRST_EVALUATION");
  assert.equal(byId.get("UJ-GOLD-025").expectedState, "NOT_ELIGIBLE");
});

test("fixtures do not falsely label draft catalogue cases as definitive eligibility", () => {
  for (const item of oracle.cases) {
    if (item.catalogueStatus === "DRAFT" ||
        item.catalogueStatus === "SOURCE_CONFLICT" ||
        item.catalogueStatus === "SOURCE_STALE" ||
        item.catalogueStatus === "DRAFT_ALTERNATIVE_RULE_UNRESOLVED" ||
        item.catalogueStatus === "DRAFT_MANDATORY_RULE_MISSING") {
      assert.notEqual(item.expectedState, "ELIGIBLE", `${item.id} cannot be ELIGIBLE with unresolved evidence`);
    }
  }
});
