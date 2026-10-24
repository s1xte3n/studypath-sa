const BANDS = [
  [0, 29, 1],
  [30, 39, 2],
  [40, 49, 3],
  [50, 59, 4],
  [60, 69, 5],
  [70, 79, 6],
  [80, 100, 7]
];

const LIFE_ORIENTATION = "LIFE ORIENTATION";
const SUPPORTED_SUBJECTS = new Set([
  "ENGLISH HOME LANGUAGE", "ENGLISH FIRST ADDITIONAL LANGUAGE", "ENGLISH SECOND ADDITIONAL LANGUAGE",
  "MATHEMATICS", "MATHEMATICAL LITERACY", "PHYSICAL SCIENCES", "LIFE SCIENCES",
  "GEOGRAPHY", "HISTORY", "BUSINESS STUDIES", "ACCOUNTING", LIFE_ORIENTATION
]);
const normaliseSubject = value => typeof value === "string" ? value.trim().replace(/\s+/g, " ").toUpperCase() : "";

export function achievementLevelForMark(mark) {
  if (!Number.isInteger(mark) || mark < 0 || mark > 100) {
    throw new RangeError("Marks must be whole numbers from 0 to 100.");
  }
  return BANDS.find(([min, max]) => mark >= min && mark <= max)[2];
}

/**
 * Calculate a provisional UJ-style APS for the hackathon demo.
 *
 * Without programme requirements, use the six highest achievement levels
 * among supplied supported subjects, excluding Life Orientation. If
 * requiredSubjects are provided, all of them must be present and are counted
 * first; the remaining slots are filled with the highest levels available.
 *
 * This is a demo heuristic based on UJ's public FAQ, not a verified 2027
 * programme eligibility decision. The retained prospectus/catalogue and
 * programme-specific rules still require source review and curator approval.
 */
export function calculateProvisionalAps(subjectRows, { requiredSubjects = [] } = {}) {
  if (!Array.isArray(subjectRows) || subjectRows.length === 0) {
    return { state: "UNKNOWN", aps: null, reason: "Add subject marks before calculating an estimate.", includedSubjects: [], excludedSubjects: [] };
  }
  if (!Array.isArray(requiredSubjects)) {
    return { state: "UNKNOWN", aps: null, reason: "Programme subject requirements are unavailable or invalid; no total is shown.", includedSubjects: [], excludedSubjects: [] };
  }

  const seen = new Set();
  const parsed = [];
  for (const row of subjectRows) {
    const subject = normaliseSubject(row?.subject);
    const rawMark = typeof row?.mark === "string" ? row.mark.trim() : row?.mark;
    if (!subject || !SUPPORTED_SUBJECTS.has(subject) ||
        !(typeof rawMark === "string" || typeof rawMark === "number") || rawMark === "" || rawMark === null || rawMark === undefined ||
        !Number.isInteger(Number(rawMark)) || Number(rawMark) < 0 || Number(rawMark) > 100) {
      return { state: "INPUT_REJECTED", aps: null, reason: "Every listed subject needs a supported name and a whole-number mark from 0 to 100.", includedSubjects: [], excludedSubjects: [] };
    }
    if (seen.has(subject)) {
      return { state: "INPUT_REJECTED", aps: null, reason: "Duplicate subjects cannot be counted twice. Correct the subject list first.", includedSubjects: [], excludedSubjects: [] };
    }
    seen.add(subject);
    const mark = Number(rawMark);
    parsed.push({ subject: row.subject.trim().replace(/\s+/g, " "), mark, level: achievementLevelForMark(mark) });
  }

  const excludedSubjects = parsed.filter(row => normaliseSubject(row.subject) === LIFE_ORIENTATION);
  const eligibleSubjects = parsed.filter(row => normaliseSubject(row.subject) !== LIFE_ORIENTATION);
  if (eligibleSubjects.length < 6) {
    return { state: "UNKNOWN", aps: null, reason: "A provisional total needs at least six supported non-Life-Orientation subjects. Add the remaining subjects; no total is shown yet.", includedSubjects: [], excludedSubjects };
  }

  const requiredNames = requiredSubjects.map(normaliseSubject);
  if (requiredNames.some(name => !name || !SUPPORTED_SUBJECTS.has(name) || name === LIFE_ORIENTATION) ||
      new Set(requiredNames).size !== requiredNames.length || requiredNames.length > 6) {
    return { state: "UNKNOWN", aps: null, reason: "The programme's required-subject rules are unavailable or unresolved; no programme-specific total is shown.", includedSubjects: [], excludedSubjects };
  }
  const missingRequired = requiredNames.filter(name => !eligibleSubjects.some(row => normaliseSubject(row.subject) === name));
  if (missingRequired.length > 0) {
    return { state: "UNKNOWN", aps: null, reason: `Add the programme-required subject(s): ${missingRequired.join(", ")}. No programme-specific total is shown.`, includedSubjects: [], excludedSubjects };
  }

  const requiredRows = requiredNames.map(name => eligibleSubjects.find(row => normaliseSubject(row.subject) === name));
  const requiredSet = new Set(requiredNames);
  const remaining = eligibleSubjects
    .filter(row => !requiredSet.has(normaliseSubject(row.subject)))
    .sort((a, b) => b.level - a.level);
  const selectedNames = new Set([...requiredRows, ...remaining.slice(0, 6 - requiredRows.length)].map(row => normaliseSubject(row.subject)));
  const includedSubjects = eligibleSubjects.filter(row => selectedNames.has(normaliseSubject(row.subject)));

  return {
    state: "PROVISIONAL",
    aps: includedSubjects.reduce((total, row) => total + row.level, 0),
    reason: requiredNames.length > 0
      ? "Indicative programme-specific total: required subjects were included, then the highest remaining achievement levels filled the six places. Source review and curator approval are outstanding. This does not determine eligibility or guarantee admission."
      : "Indicative general total: the six highest achievement levels were counted, excluding Life Orientation. Programme-required subjects can change the six selected subjects. Source review and curator approval are outstanding; this does not determine programme eligibility or guarantee admission.",
    includedSubjects,
    excludedSubjects
  };
}

export const APS_SOURCE = {
  title: "UJ 2027 Undergraduate Prospectus",
  url: "https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf",
  policyTitle: "UJ frequently asked questions — APS calculation",
  policyUrl: "https://www.uj.ac.za/frequently-asked-questions",
  version: "Online 25 June 2026 prospectus; public FAQ rule interpretation used provisionally for hackathon",
  printedPage: 16,
  status: "DRAFT_NOT_FOR_DEFINITIVE_SCREENING"
};
