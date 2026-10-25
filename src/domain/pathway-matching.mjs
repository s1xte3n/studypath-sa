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


const SUBJECT_LABELS = Object.fromEntries([...SUBJECT_IDS.entries()].map(([label, id]) => [id, label]));

function buildRequirementEvidence(programme, learnerInput, outcome, sourceLinks) {
  const requirements = programme.requirements ?? {};
  const marks = new Map(learnerInput.subjects.map(subject => [subject.subjectId, subject]));
  const sourceForRule = sourceLinks;
  const rows = [];
  const apsMin = requirements.aps?.min;
  if (Number.isInteger(apsMin)) {
    const value = Number.isInteger(outcome.aps) ? outcome.aps : null;
    rows.push({
      id: "aps", label: "Admission Point Score (APS)", rule: `At least ${apsMin}`,
      learnerValue: value === null ? "Not calculated from available inputs" : `Provisional APS ${value}`,
      status: value === null ? "UNKNOWN" : value >= apsMin ? "MET" : "NOT_MET",
      explanation: value === null ? "The evaluator could not calculate a supported APS from the available subject inputs."
        : value >= apsMin ? `Recorded APS minimum met (${value} ≥ ${apsMin}).` : `Recorded APS minimum not met (${value} < ${apsMin}).`,
      sourceLinks: sourceForRule
    });
  }
  const englishRule = requirements.english;
  if (englishRule) {
    const englishId = englishRule.mappingStatus === "DEMO_DEFAULT_HOME_LANGUAGE"
      ? "ENGLISH_HOME_LANGUAGE"
      : ["ENGLISH_HOME_LANGUAGE", "ENGLISH_FIRST_ADDITIONAL_LANGUAGE", "ENGLISH_SECOND_ADDITIONAL_LANGUAGE"].find(id => marks.has(id));
    const english = englishId ? marks.get(englishId) : null;
    const rule = [Number.isInteger(englishRule.minPercent) ? `${englishRule.minPercent}%` : null,
      Number.isInteger(englishRule.minLevel) ? `Level ${englishRule.minLevel}` : null].filter(Boolean).join(" / ") || "Minimum not recorded";
    const passes = english && (englishRule.minPercent == null || english.percent >= englishRule.minPercent)
      && (englishRule.minLevel == null || levelForPercent(english.percent) >= englishRule.minLevel);
    rows.push({
      id: "english", label: "English", rule,
      learnerValue: english ? `${SUBJECT_LABELS[english.subjectId] ?? english.subjectId}: ${english.percent}% (Level ${levelForPercent(english.percent)})` : "Required English result not provided",
      status: !english ? "UNKNOWN" : passes ? "MET" : "NOT_MET",
      explanation: !english
        ? englishRule.mappingStatus === "DEMO_DEFAULT_HOME_LANGUAGE" ? "English Home Language is not present. This demo assumption is not verified institutional policy." : "No supported English result is available to compare."
        : passes ? "The available English result meets the recorded minimum." : "The available English result is below the recorded minimum.",
      sourceLinks: sourceForRule
    });
  }
  for (const [index, rule] of (requirements.subjectRules ?? []).entries()) {
    const subject = marks.get(rule.subject);
    const label = SUBJECT_LABELS[rule.subject] ?? rule.subject;
    let status = "UNKNOWN";
    let learnerValue = subject ? `${subject.percent}% (Level ${levelForPercent(subject.percent)})` : "Not provided";
    let explanation = "The recorded rule cannot be conclusively compared with available inputs.";
    const ruleText = rule.accepted === false ? "Not accepted for this pathway"
      : [Number.isInteger(rule.minPercent) ? `${rule.minPercent}%` : null, Number.isInteger(rule.minLevel) ? `Level ${rule.minLevel}` : null].filter(Boolean).join(" / ")
      || (rule.mandatory === true ? "Required subject; minimum not recorded" : "No explicit minimum recorded");
    if (rule.accepted === false) {
      status = subject ? "NOT_MET" : "MET";
      learnerValue = subject ? `${subject.percent}% entered` : "No mark entered for this subject";
      explanation = subject ? "The catalogue records this subject as not accepted for this pathway." : "No mark was entered for this subject; the recorded exclusion is not triggered.";
    } else if (rule.mandatory === "UNRESOLVED_ALTERNATIVE_SEMANTICS") {
      status = "UNKNOWN";
      explanation = "The catalogue does not establish whether this subject is an alternative or an additional requirement.";
    } else if (!subject) {
      if (rule.mandatory === true && learnerInput.transcriptComplete) {
        status = "NOT_MET";
        explanation = "The learner profile is marked complete, but this required subject is absent.";
      } else {
        status = "UNKNOWN";
        explanation = rule.mandatory === true ? "This subject is not present. Because the transcript is incomplete, absence is not treated as failure." : "No mark is available; no conclusion is drawn.";
      }
    } else if (Number.isInteger(rule.minPercent) && subject.percent < rule.minPercent) {
      status = "NOT_MET"; explanation = `The mark is below the recorded minimum of ${rule.minPercent}%.`;
    } else if (Number.isInteger(rule.minLevel) && levelForPercent(subject.percent) < rule.minLevel) {
      status = "NOT_MET"; explanation = `The achievement level is below the recorded minimum of Level ${rule.minLevel}.`;
    } else if (Number.isInteger(rule.minPercent) || Number.isInteger(rule.minLevel)) {
      status = "MET"; explanation = "The available subject result meets the recorded minimum.";
    }
    rows.push({ id: `subject-${index + 1}`, label, rule: ruleText, learnerValue, status, explanation, sourceLinks: sourceForRule });
  }
  for (const [index, note] of (programme.unresolved ?? []).entries()) {
    rows.push({ id: `unresolved-${index + 1}`, label: "Unresolved catalogue condition", rule: "Not fully verified or encoded",
      learnerValue: "Cannot be evaluated reliably", status: "UNKNOWN", explanation: note, sourceLinks: sourceForRule });
  }
  return rows;
}

/**
 * Builds learner-facing pathway outcomes.
 * Hackathon-demo evaluation uses the owner-approved repository catalogue but
 * still returns UNKNOWN when material programme rules remain unresolved.
 * Definitive screening always requires the strict publication gate.
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

  const demoMode = catalogue.status === "APPROVED_FOR_HACKATHON_DEMO_ONLY";
  const publicationGate = demoMode ? null : validateCatalogueForPublication(catalogue);

  return catalogue.programmes.map((programme) => {
    const outcome = demoMode || publicationGate.publishable
      ? evaluateEligibility({
          programme,
          learnerInput,
          admissionCycle: catalogue.admissionCycle,
          catalogueStatus: catalogue.status,
          evaluationMode: demoMode ? "HACKATHON_DEMO" : "DEFINITIVE"
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
      englishRequirementNote: programme.requirements?.english?.mappingStatus === "DEMO_DEFAULT_HOME_LANGUAGE"
        ? "Demo assumption: where the programme source does not specify an English stream, this demo assumes English Home Language. English First Additional Language is not treated as equivalent. Verify the official requirement; this is not confirmed UJ policy."
        : null,
      sourceLinks: buildSourceLinks(programme, catalogue),
      requirementEvidence: buildRequirementEvidence(programme, learnerInput, outcome, buildSourceLinks(programme, catalogue)),
      state: outcome.state === "NOT_ELIGIBLE" ? "NOT_ELIGIBLE" :
        outcome.state === "ELIGIBLE" ? "ELIGIBLE" : "UNKNOWN",
      reason: outcome.explanation,
      reasonCodes: outcome.reasonCodes,
      catalogueStatus: catalogue.status,
      sourceUrl: catalogue.sources?.[0]?.url ?? null,
      limitation: demoMode
        ? "Hackathon-demo estimate only. Material programme rules remain unresolved; UNKNOWN is used where those gaps prevent a reliable outcome. Meeting listed minimums does not guarantee admission."
        : publicationGate.publishable
          ? "Minimum requirements do not guarantee admission; consult the official institution for current requirements."
          : "This catalogue has not passed the evidence publication gate and is not approved for definitive eligibility screening."
    };
  });
}
