import test from "node:test";
import assert from "node:assert/strict";
import { evaluateEligibility } from "../src/domain/eligibility/uj-2027-evaluator.mjs";

const programme = {
  id: "TEST-ENGLISH-STREAM",
  status: "APPROVED",
  curatorSignoff: {
    curatorName: "Test fixture",
    signedAt: "2026-10-24",
    scope: "Synthetic unit test only",
    evidenceReference: "fixture"
  },
  unresolved: [],
  requirements: {
    aps: { min: 0 },
    english: {
      minLevel: 5,
      minPercent: 60,
      mappingStatus: "DEMO_DEFAULT_HOME_LANGUAGE",
      mappingAssumption: "ENGLISH_HOME_LANGUAGE"
    },
    subjectRules: []
  }
};

const baseSubjects = [
  { subjectId: "MATHEMATICS", percent: 75 },
  { subjectId: "PHYSICAL_SCIENCES", percent: 68 },
  { subjectId: "LIFE_SCIENCES", percent: 62 },
  { subjectId: "GEOGRAPHY", percent: 71 },
  { subjectId: "BUSINESS_STUDIES", percent: 66 }
];

function evaluate(englishSubject) {
  return evaluateEligibility({
    programme,
    learnerInput: {
      studyStage: "MATRIC_GRADUATE",
      transcriptComplete: true,
      subjects: [...baseSubjects, englishSubject]
    },
    admissionCycle: "2027",
    catalogueStatus: "APPROVED_FOR_DEFINITIVE_SCREENING"
  });
}

test("default English stream assumption evaluates English Home Language against the recorded threshold", () => {
  const result = evaluate({ subjectId: "ENGLISH_HOME_LANGUAGE", percent: 55 });
  assert.equal(result.state, "NOT_ELIGIBLE");
  assert.equal(result.reasonCodes[0], "ENGLISH_BELOW_MINIMUM");
});

test("First Additional Language is not silently treated as Home Language under the demo assumption", () => {
  const result = evaluate({ subjectId: "ENGLISH_FIRST_ADDITIONAL_LANGUAGE", percent: 80 });
  assert.equal(result.state, "UNKNOWN");
  assert.equal(result.reasonCodes[0], "ENGLISH_STREAM_ASSUMPTION_UNMET");
  assert.match(result.explanation, /English Home Language/i);
  assert.match(result.explanation, /not treated as equivalent/i);
});

test("an unspecified English stream is not treated as Home Language under the demo assumption", () => {
  const result = evaluate({ subjectId: "ENGLISH", percent: 80 });
  assert.equal(result.state, "UNKNOWN");
  assert.equal(result.reasonCodes[0], "ENGLISH_STREAM_ASSUMPTION_UNMET");
});
