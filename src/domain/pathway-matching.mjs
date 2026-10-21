import { evaluateEligibility } from "./eligibility/uj-2027-evaluator.mjs";

const SUBJECT_IDS = new Map([
  ["English Home Language", "ENGLISH_HOME_LANGUAGE"],
  ["English First Additional Language", "ENGLISH_FIRST_ADDITIONAL_LANGUAGE"],
  ["English Second Additional Language", "ENGLISH_SECOND_ADDITIONAL_LANGUAGE"],
  ["Mathematics", "MATHEMATICS"],
  ["Mathematical Literacy", "MATHEMATICAL_LITERACY"],
  ["Physical Sciences", "PHYSICAL_SCIENCES"],
  ["Life Sciences", "LIFE_SCIENCES"],
  ["Geography", "GEOGRAPHY"],
  ["History", "HISTORY"],
  ["Business Studies", "BUSINESS_STUDIES"],
  ["Accounting", "ACCOUNTING"],
  ["Life Orientation", "LIFE_ORIENTATION"]
]);

/**
 * Builds learner-facing pathway outcomes from the draft catalogue.
 * The current UJ pilot is deliberately not approved for definitive screening,
 * so its results must remain UNKNOWN regardless of the marks supplied.
 */
export function buildPathwayResults({ stage, subjects }, catalogue) {
  if (!catalogue || !Array.isArray(catalogue.programmes)) {
    throw new TypeError("A catalogue with programme records is required.");
  }

  const learnerInput = {
    studyStage: stage,
    transcriptComplete: stage === "MATRIC_GRADUATE",
    subjects: subjects.map(({ subject, mark }) => {
      const subjectId = SUBJECT_IDS.get(subject);
      if (!subjectId) throw new TypeError("Unsupported subject in learner input.");
      const percent = typeof mark === "number" ? mark : Number(mark);
      if (!Number.isInteger(percent) || percent < 0 || percent > 100) {
        throw new RangeError("Marks must be whole numbers from 0 to 100.");
      }
      return { subjectId, percent };
    })
  };

  return catalogue.programmes.map((programme) => {
    const outcome = evaluateEligibility({
      programme,
      learnerInput,
      admissionCycle: catalogue.admissionCycle,
      catalogueStatus: catalogue.status
    });

    return {
      id: programme.id,
      name: programme.name,
      institution: catalogue.institution,
      faculty: programme.faculty ?? null,
      campus: programme.campus ?? null,
      state: outcome.state === "NOT_ELIGIBLE" ? "NOT_ELIGIBLE" :
        outcome.state === "ELIGIBLE" ? "ELIGIBLE" : "UNKNOWN",
      reason: outcome.explanation,
      reasonCodes: outcome.reasonCodes,
      catalogueStatus: catalogue.status,
      sourceUrl: catalogue.sources?.[0]?.url ?? null,
      limitation: "This 2027 pilot catalogue is a draft and is not approved for definitive eligibility screening."
    };
  });
}
