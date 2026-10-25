const SUBJECT_LABELS = {
  MATHEMATICS: "Mathematics",
  MATHEMATICAL_LITERACY: "Mathematical Literacy",
  PHYSICAL_SCIENCES: "Physical Sciences",
  LIFE_SCIENCES: "Life Sciences",
  GEOGRAPHY: "Geography",
  HISTORY: "History",
  BUSINESS_STUDIES: "Business Studies",
  ACCOUNTING: "Accounting",
  ENGLISH_HOME_LANGUAGE: "English Home Language",
  ENGLISH_FIRST_ADDITIONAL_LANGUAGE: "English First Additional Language",
  ENGLISH_SECOND_ADDITIONAL_LANGUAGE: "English Second Additional Language"
};

function subjectRules(programme) {
  const rules = programme?.requirements?.subjectRules;
  if (!Array.isArray(rules)) return new Set();
  return new Set(rules
    .filter(rule => rule && rule.accepted !== false && typeof rule.subject === "string")
    .map(rule => rule.subject));
}

function facultyKey(programme) {
  return typeof programme?.faculty === "string" && programme.faculty.trim()
    ? programme.faculty.trim().toLocaleLowerCase("en")
    : null;
}

/**
 * Suggests exploration alternatives from an active catalogue and its already
 * evaluated pathway results. This function does not evaluate eligibility,
 * infer progression/articulation, rank the main result list, or create records.
 */
export function suggestAlternativePathways({ preferred, results, catalogue, limit = 3 }) {
  if (!preferred || typeof preferred.id !== "string") {
    throw new TypeError("A preferred pathway result with an id is required.");
  }
  if (!Array.isArray(results) || !catalogue || !Array.isArray(catalogue.programmes)) {
    throw new TypeError("Evaluated results and a catalogue with programme records are required.");
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 10) {
    throw new RangeError("Alternative pathway limit must be a whole number from 1 to 10.");
  }
  if (preferred.state === "ELIGIBLE") return [];

  const catalogueById = new Map();
  for (const programme of catalogue.programmes) {
    if (programme && typeof programme.id === "string" && !catalogueById.has(programme.id)) {
      catalogueById.set(programme.id, programme);
    }
  }
  const evaluatedById = new Map();
  for (const result of results) {
    if (result && typeof result.id === "string" && !evaluatedById.has(result.id)) {
      evaluatedById.set(result.id, result);
    }
  }
  const preferredProgramme = catalogueById.get(preferred.id);
  if (!preferredProgramme || !evaluatedById.has(preferred.id)) return [];

  const preferredSubjects = subjectRules(preferredProgramme);
  const preferredFaculty = facultyKey(preferredProgramme);
  const seen = new Set([preferred.id]);
  const candidates = [];

  for (const programme of catalogue.programmes) {
    if (!programme || typeof programme.id !== "string" || seen.has(programme.id)) continue;
    seen.add(programme.id);
    const evaluated = evaluatedById.get(programme.id);
    if (!evaluated) continue;

    const sharedSubjects = [...subjectRules(programme)]
      .filter(subject => preferredSubjects.has(subject));
    const sameFaculty = Boolean(preferredFaculty && facultyKey(programme) === preferredFaculty);
    if (sharedSubjects.length === 0 && !sameFaculty) continue;

    const reasons = [];
    if (sharedSubjects.length > 0) {
      reasons.push(`Both catalogue records include the recorded subject rule: ${sharedSubjects
        .map(subject => SUBJECT_LABELS[subject] ?? subject.replaceAll("_", " ").toLocaleLowerCase("en"))
        .join(", ")}.`);
    }
    if (sameFaculty) reasons.push("Both records are listed under the same faculty or college.");
    candidates.push({
      ...evaluated,
      relevanceReason: reasons.join(" "),
      relevanceEvidence: {
        sharedSubjectRules: sharedSubjects,
        sameFaculty,
        catalogueVersion: catalogue.catalogueVersion ?? null
      },
      relationshipDisclaimer: "This is a catalogue-based exploration suggestion, not a verified progression, articulation, credit-transfer or admission route. Assess this programme's own requirements separately."
    });
  }

  return candidates
    .sort((a, b) => {
      const score = item => (item.relevanceEvidence.sharedSubjectRules.length * 2)
        + (item.relevanceEvidence.sameFaculty ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, limit);
}
