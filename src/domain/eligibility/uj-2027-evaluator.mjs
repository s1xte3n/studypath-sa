/**
 * Deterministic, explainable UJ pilot eligibility evaluator.
 *
 * This module is intentionally conservative. It is not an admission decision,
 * and it must return UNKNOWN for the current draft catalogue unless a rule and
 * source are verified. testOnlyAssumptions exists solely to execute synthetic
 * golden cases and must never be enabled by application/API code.
 */

const LEVEL_BANDS = [
  [0, 29, 1],
  [30, 39, 2],
  [40, 49, 3],
  [50, 59, 4],
  [60, 69, 5],
  [70, 79, 6],
  [80, 100, 7],
];

const VALID_STATES = new Set(["ELIGIBLE", "NOT_ELIGIBLE", "UNKNOWN", "INPUT_REJECTED"]);

export function levelForPercent(percent) {
  if (!Number.isInteger(percent) || percent < 0 || percent > 100) {
    throw new RangeError("Mark must be an integer from 0 to 100");
  }
  return LEVEL_BANDS.find(([min, max]) => percent >= min && percent <= max)[2];
}

function normalizeSubjectId(value) {
  return typeof value === "string" ? value.trim().toUpperCase() : "";
}

function rejected(reasonCode, message) {
  return {
    state: "INPUT_REJECTED",
    reasonCodes: [reasonCode],
    explanation: message,
    aps: null,
  };
}

function unknown(reasonCode, message, aps = null) {
  return { state: "UNKNOWN", reasonCodes: [reasonCode], explanation: message, aps };
}

function notEligible(reasonCode, message, aps = null) {
  return { state: "NOT_ELIGIBLE", reasonCodes: [reasonCode], explanation: message, aps };
}

function getSubject(subjects, ids) {
  return subjects.find((subject) => ids.includes(subject.id));
}

function calculateAps(subjects, requiredIds) {
  const eligibleSubjects = subjects.filter((subject) => subject.id !== "LIFE_ORIENTATION");
  const selected = new Map();

  for (const requiredId of requiredIds) {
    const required = eligibleSubjects.find((subject) => subject.id === requiredId);
    if (!required) return { error: "REQUIRED_INPUT_MISSING" };
    selected.set(required.id, required);
  }

  const ranked = eligibleSubjects
    .map((subject) => ({ ...subject, level: levelForPercent(subject.percent) }))
    .sort((a, b) => b.level - a.level || a.id.localeCompare(b.id));

  for (const subject of ranked) {
    if (selected.size >= 6) break;
    if (!selected.has(subject.id)) selected.set(subject.id, subject);
  }

  if (selected.size < 6) return { error: "REQUIRED_INPUT_MISSING" };
  return { aps: [...selected.values()].reduce((sum, subject) => sum + subject.level, 0) };
}

function findRule(programme, subjectId) {
  return programme.requirements?.subjectRules?.find((rule) => rule.subject === subjectId);
}

/**
 * @param {object} args
 * @param {object} args.programme Programme record from the catalogue.
 * @param {object} args.learnerInput Synthetic or learner input.
 * @param {string} args.admissionCycle Admission cycle being evaluated.
 * @param {string} args.catalogueStatus Source/curation status for this evaluation.
 * @param {boolean} [args.testOnlyAssumptions=false] Enables assumptions only for test fixtures.
 */
export function evaluateEligibility({
  programme,
  learnerInput,
  admissionCycle,
  catalogueStatus,
  testOnlyAssumptions = false,
}) {
  if (!programme || !learnerInput || !Array.isArray(learnerInput.subjects)) {
    return rejected("INVALID_INPUT_SHAPE", "A programme and a subjects array are required.");
  }
  if (!VALID_STATES.has("UNKNOWN")) throw new Error("Internal state configuration invalid");

  if (admissionCycle !== "2027") {
    return unknown("ADMISSION_CYCLE_UNVERIFIED", "The requested admission cycle is not the verified 2027 pilot cycle.");
  }
  if (catalogueStatus === "SOURCE_CONFLICT") {
    return unknown("MATERIAL_SOURCE_CONFLICT", "Source requirements conflict; no definitive result is safe.");
  }
  if (catalogueStatus === "SOURCE_STALE") {
    return unknown("SOURCE_NOT_CURRENTLY_VERIFIED", "The source has not been verified as current.");
  }
  if (catalogueStatus === "UNVERIFIED") {
    return unknown("ADMISSION_CYCLE_UNVERIFIED", "The programme's applicable cycle has not been verified.");
  }
  if (programme.status !== "APPROVED" &&
      !(testOnlyAssumptions && catalogueStatus === "ASSUMED_SIGNED_OFF_FOR_TEST_ONLY")) {
    return unknown("CATALOGUE_RECORD_NOT_APPROVED", "Programme rules are draft and have not been curator-approved.");
  }
  if (!testOnlyAssumptions && (programme.curatorSignoff == null || programme.status !== "APPROVED")) {
    return unknown("CATALOGUE_RECORD_NOT_APPROVED", "Programme rules are draft and have not been curator-approved.");
  }

  const subjects = [];
  const seen = new Set();
  for (const input of learnerInput.subjects) {
    const id = normalizeSubjectId(input?.subjectId);
    if (!id) return rejected("INVALID_SUBJECT_INPUT", "Every subject must have a valid subject ID.");
    if (seen.has(id)) return rejected("DUPLICATE_SUBJECT_INPUT", `Subject ${id} appears more than once.`);
    seen.add(id);
    if (!Number.isInteger(input.percent) || input.percent < 0 || input.percent > 100) {
      return rejected("INVALID_MARK_INPUT", `The mark for ${id} must be an integer from 0 to 100.`);
    }
    subjects.push({ id, percent: input.percent });
  }

  const english = getSubject(subjects, [
    "ENGLISH",
    "ENGLISH_HOME_LANGUAGE",
    "ENGLISH_FIRST_ADDITIONAL_LANGUAGE",
    "ENGLISH_SECOND_ADDITIONAL_LANGUAGE",
  ]);
  if (!english && !learnerInput.transcriptComplete) {
    return unknown("REQUIRED_INPUT_MISSING", "The English result is missing from an incomplete transcript.");
  }
  if (!english) return unknown("REQUIRED_INPUT_MISSING", "A required English result is missing.");

  const englishMapping = programme.requirements?.english?.mappingStatus;
  if (englishMapping === "UNRESOLVED" && !testOnlyAssumptions) {
    return unknown("SUBJECT_MAPPING_UNRESOLVED", "The accepted English subject stream has not been verified.");
  }
  if (english.id === "ENGLISH_UNMAPPED_STREAM") {
    return unknown("SUBJECT_MAPPING_UNRESOLVED", "The English result cannot be mapped to the programme requirement.");
  }

  const requiredIds = ["ENGLISH_FIRST_ADDITIONAL_LANGUAGE", "ENGLISH_HOME_LANGUAGE", "ENGLISH"];
  const subjectRules = programme.requirements?.subjectRules ?? [];
  const requiredRuleIds = subjectRules
    .filter((rule) => rule.mandatory === true)
    .map((rule) => rule.subject);
  const mathRule = subjectRules.find((rule) =>
    ["MATHEMATICS", "TECHNICAL_MATHEMATICS", "MATHEMATICAL_LITERACY"].includes(rule.subject)
  );

  // A verified, explicit rejection is a deterministic failure.
  for (const rule of subjectRules) {
    if (rule.accepted === false && subjects.some((subject) => subject.id === rule.subject)) {
      return notEligible("REQUIRED_SUBJECT_NOT_ACCEPTED", `${rule.subject} is not accepted for this programme.`);
    }
  }

  const scienceDegreeRestriction = programme.faculty === "Faculty of Science" &&
    Number(programme.durationYears) <= 4;
  if (scienceDegreeRestriction && subjects.some((subject) =>
    ["TECHNICAL_MATHEMATICS", "TECHNICAL_SCIENCES"].includes(subject.id)
  )) {
    const technicalMath = subjects.find((subject) => subject.id === "TECHNICAL_MATHEMATICS");
    const technicalScience = subjects.find((subject) => subject.id === "TECHNICAL_SCIENCES");
    if (technicalMath || technicalScience) {
      return notEligible("REQUIRED_SUBJECT_NOT_ACCEPTED", "Technical Mathematics and Technical Science are not accepted for Faculty of Science degree programmes.");
    }
  }

  let branchAps = null;
  const apsBranches = programme.requirements?.apsBranches;
  if (Array.isArray(apsBranches) && apsBranches.length > 0) {
    const branchResults = [];
    for (const branch of apsBranches) {
      const branchRules = (branch.subjects ?? []).map((rule) => rule.subject);
      const branchInputSubjects = subjects.filter((subject) => branchRules.includes(subject.id));
      const missingBranchSubject = branchRules.length > 0 &&
        !branchInputSubjects.some((subject) => {
          const rule = branch.subjects.find((item) => item.subject === subject.id);
          return rule && subject.level >= (rule.minLevel ?? 1);
        });
      if (missingBranchSubject) continue;
      const required = [...new Set([...requiredIds.filter((id) => subjects.some((s) => s.id === id)), ...branchRules.filter((id) => subjects.some((s) => s.id === id))])];
      const result = calculateAps(subjects, required);
      if (!result.error && result.aps >= branch.min) {
        branchResults.push({ branch, aps: result.aps });
      }
    }
    if (branchResults.length === 0) {
      const allMissing = apsBranches.every((branch) =>
        (branch.subjects ?? []).every((rule) => !subjects.some((subject) => subject.id === rule.subject))
      );
      if (allMissing && !learnerInput.transcriptComplete) {
        return unknown("REQUIRED_INPUT_MISSING", "No applicable mathematics route can be established from the incomplete transcript.");
      }
      return notEligible("NO_APS_BRANCH_SATISFIED", "No verified APS and subject branch is satisfied.");
    }
    if (branchResults.length > 1 && !testOnlyAssumptions) {
      return unknown("ALTERNATIVE_RULE_UNRESOLVED", "More than one alternative subject route matches; the branch interpretation needs verification.");
    }
    branchAps = Math.max(...branchResults.map((result) => result.aps));
  } else {
    const requiredSubject = subjectRules.find((rule) => rule.mandatory === true);
    if (requiredSubject && !subjects.some((subject) => subject.id === requiredSubject.subject)) {
      const alternativesUnresolved = subjectRules.some((rule) =>
        rule.mandatory === "UNRESOLVED_ALTERNATIVE_SEMANTICS"
      );
      if (alternativesUnresolved) {
        return unknown("ALTERNATIVE_RULE_UNRESOLVED", "The catalogue does not establish whether the listed subject requirements are alternatives.");
      }
      return notEligible("REQUIRED_SUBJECT_MISSING", `Required subject ${requiredSubject.subject} is missing.`);
    }
    const aps = calculateAps(subjects, [...new Set([...requiredIds.filter((id) => subjects.some((s) => s.id === id)), ...requiredRuleIds])]);
    if (aps.error) return unknown(aps.error, "Six valid APS subjects including required subjects could not be selected.");
    branchAps = aps.aps;
  }

  const englishLevel = levelForPercent(english.percent);
  const minEnglish = programme.requirements?.english?.minLevel;
  if (Number.isInteger(minEnglish) && englishLevel < minEnglish) {
    return notEligible("ENGLISH_BELOW_MINIMUM", `English level ${englishLevel} is below required level ${minEnglish}.`, branchAps);
  }

  const minAps = programme.requirements?.aps?.min;
  if (Number.isInteger(minAps) && branchAps < minAps) {
    return notEligible("APS_BELOW_MINIMUM", `APS ${branchAps} is below the minimum ${minAps}.`, branchAps);
  }

  for (const rule of subjectRules) {
    if (rule.subject === "MATHEMATICAL_LITERACY" && rule.accepted === false) continue;
    if (rule.mandatory === false || rule.accepted === false) continue;
    if (rule.mandatory === "UNRESOLVED_ALTERNATIVE_SEMANTICS") {
      if (!testOnlyAssumptions) {
        return unknown("ALTERNATIVE_RULE_UNRESOLVED", "The required subject branch is not verified.");
      }
      continue;
    }
    if (!Number.isInteger(rule.minLevel)) continue;
    const subject = getSubject(subjects, [rule.subject]);
    if (!subject) {
      if (rule.mandatory === true) {
        return notEligible("REQUIRED_SUBJECT_MISSING", `Required subject ${rule.subject} is missing.`, branchAps);
      }
      continue;
    }
    if (levelForPercent(subject.percent) < rule.minLevel) {
      return notEligible(rule.subject === "MATHEMATICS" ? "MATHEMATICS_BELOW_MINIMUM" : "REQUIRED_SUBJECT_BELOW_MINIMUM",
        `${rule.subject} is below the required level ${rule.minLevel}.`, branchAps);
    }
  }

  if (!learnerInput.transcriptComplete) {
    return unknown("REQUIRED_INPUT_MISSING", "The transcript is incomplete; eligibility cannot be confirmed.", branchAps);
  }

  return {
    state: "ELIGIBLE",
    reasonCodes: ["ALL_VERIFIED_REQUIREMENTS_MET"],
    explanation: "All encoded minimum requirements are met. This does not guarantee admission.",
    aps: branchAps,
  };
}
