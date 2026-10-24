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
const normaliseSubject = value => typeof value === "string" ? value.trim().replace(/\\s+/g, " ").toUpperCase() : "";

export function achievementLevelForMark(mark) {
  if (!Number.isInteger(mark) || mark < 0 || mark > 100) {
    throw new RangeError("Marks must be whole numbers from 0 to 100.");
  }
  return BANDS.find(([min, max]) => mark >= min && mark <= max)[2];
}

/**
 * Calculate a provisional UJ 2027 APS only when exactly six distinct,
 * non-Life-Orientation subjects are supplied. This intentionally does not
 * choose six from a larger set because the retained draft source leaves that
 * selection rule unresolved. It does not evaluate programme eligibility.
 */
export function calculateProvisionalAps(subjectRows) {
  if (!Array.isArray(subjectRows) || subjectRows.length === 0) {
    return { state: "UNKNOWN", aps: null, reason: "Add subject marks before calculating an estimate.", includedSubjects: [], excludedSubjects: [] };
  }

  const seen = new Set();
  const parsed = [];
  for (const row of subjectRows) {
    const subject = normaliseSubject(row?.subject);
    const rawMark = typeof row?.mark === "string" ? row.mark.trim() : row?.mark;
    if (!subject || rawMark === "" || rawMark === null || rawMark === undefined ||
        !Number.isInteger(Number(rawMark)) || Number(rawMark) < 0 || Number(rawMark) > 100) {
      return { state: "INPUT_REJECTED", aps: null, reason: "Every listed subject needs a supported name and a whole-number mark from 0 to 100.", includedSubjects: [], excludedSubjects: [] };
    }
    if (seen.has(subject)) {
      return { state: "INPUT_REJECTED", aps: null, reason: "Duplicate subjects cannot be counted twice. Correct the subject list first.", includedSubjects: [], excludedSubjects: [] };
    }
    seen.add(subject);
    const mark = Number(rawMark);
    parsed.push({ subject: row.subject.trim().replace(/\\s+/g, " "), mark, level: achievementLevelForMark(mark) });
  }

  const excludedSubjects = parsed.filter(row => normaliseSubject(row.subject) === LIFE_ORIENTATION);
  const eligibleSubjects = parsed.filter(row => normaliseSubject(row.subject) !== LIFE_ORIENTATION);
  if (eligibleSubjects.length < 6) {
    return { state: "UNKNOWN", aps: null, reason: "A provisional total needs exactly six non-Life-Orientation subjects. Add the remaining subjects; no total is shown yet.", includedSubjects: [], excludedSubjects };
  }
  if (eligibleSubjects.length > 6) {
    return { state: "UNKNOWN", aps: null, reason: "More than six eligible subjects were entered. The retained draft source does not resolve which six to count, so StudyPath will not choose them automatically.", includedSubjects: [], excludedSubjects };
  }

  return {
    state: "PROVISIONAL",
    aps: eligibleSubjects.reduce((total, row) => total + row.level, 0),
    reason: "Indicative total only: source review and curator approval are still outstanding. This score does not determine programme eligibility or guarantee admission.",
    includedSubjects: eligibleSubjects,
    excludedSubjects
  };
}

export const APS_SOURCE = {
  title: "UJ 2027 Undergraduate Prospectus",
  url: "https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf",
  version: "Online 25 June 2026 version; draft source record",
  printedPage: 16,
  status: "DRAFT_NOT_FOR_DEFINITIVE_SCREENING"
};
