import { evaluateEligibility } from "./eligibility/uj-2027-evaluator.mjs";
import { validateCatalogueForPublication } from "./eligibility/catalogue-publication-gate.mjs";

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

function buildSourceLinks(programme, catalogue) {
  const evidence = Array.isArray(programme.sourceEvidence) ? programme.sourceEvidence : [];
  const sources = catalogue.sources || [];
  const links = evidence
    .filter(item => typeof item.url === "string" && item.url.startsWith("https://www.uj.ac.za/"))
    .map(item => {
      const source = sources.find(candidate => candidate.id === item.sourceId)
        || sources.find(candidate => candidate.url === item.url);
      return {
        title: item.title || "Official UJ programme information",
        url: item.url,
        role: item.role || null,
        location: item.location || null,
        verificationDate: source?.verificationDate || null
      };
    });

  const sourceIds = new Set(evidence.map(item => item.sourceId).filter(Boolean));
  for (const source of sources) {
    if (sourceIds.has(source.id) && typeof source.url === "string" && source.url.startsWith("https://www.uj.ac.za/")) {
      links.push({
        title: source.title || "Official UJ source document",
        url: source.url,
        role: source.sourceVersion || "Prospectus / intake source",
        location: evidence.find(item => item.sourceId === source.id)?.location || null,
        verificationDate: source.verificationDate || null
      });
    }
  }

  return [...new Map(links.map(link => [link.url, link])).values()];
}

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

  const publicationGate = validateCatalogueForPublication(catalogue);

  return catalogue.programmes.map((programme) => {
    const outcome = publicationGate.publishable
      ? evaluateEligibility({
          programme,
          learnerInput,
          admissionCycle: catalogue.admissionCycle,
          catalogueStatus: catalogue.status
        })
      : {
          state: "UNKNOWN",
          reasonCodes: ["CATALOGUE_PUBLICATION_GATE_FAILED"],
          explanation: "Catalogue evidence has not passed the publication gate; eligibility cannot be determined."
        };

    return {
      id: programme.id,
      name: programme.name,
      code: programme.code ?? null,
      institution: catalogue.institution,
      faculty: programme.faculty ?? null,
      campus: programme.campus ?? null,
      durationYears: Number.isInteger(programme.durationYears) ? programme.durationYears : null,
      requirements: programme.requirements ?? null,
      requirementNotes: Array.isArray(programme.unresolved) ? programme.unresolved : [],
      sourceLinks: buildSourceLinks(programme, catalogue),
      state: outcome.state === "NOT_ELIGIBLE" ? "NOT_ELIGIBLE" :
        outcome.state === "ELIGIBLE" ? "ELIGIBLE" : "UNKNOWN",
      reason: outcome.explanation,
      reasonCodes: outcome.reasonCodes,
      catalogueStatus: catalogue.status,
      sourceUrl: catalogue.sources?.[0]?.url ?? null,
      limitation: publicationGate.publishable
        ? "Minimum requirements do not guarantee admission; consult the official institution for current requirements."
        : "This catalogue has not passed the evidence publication gate and is not approved for definitive eligibility screening."
    };
  });
}
