const VALID_STATES = ["ELIGIBLE", "NOT_ELIGIBLE", "UNKNOWN"];

/**
 * Completeness tracks three required sections:
 * 1. a selected study stage;
 * 2. at least one subject selected exactly once;
 * 3. a whole-number mark from 0 to 100 for a uniquely selected subject.
 * Each section contributes one third. Additional blank rows are optional.
 */
export function getProfileCompleteness({ stage, subjects }) {
  const hasStage = typeof stage === "string" && stage.trim().length > 0;
  const rows = Array.isArray(subjects) ? subjects : [];
  const subjectCounts = new Map();

  for (const row of rows) {
    if (typeof row?.subject === "string" && row.subject.trim()) {
      subjectCounts.set(row.subject, (subjectCounts.get(row.subject) || 0) + 1);
    }
  }

  const hasUniqueSubject = [...subjectCounts.values()].some(count => count === 1);
  const hasUniqueValidSubjectMark = rows.some((row) => {
    if (typeof row?.subject !== "string" || !row.subject.trim()) return false;
    if (subjectCounts.get(row.subject) !== 1) return false;
    if (row.mark === "" || row.mark === null || row.mark === undefined) return false;
    const mark = Number(row.mark);
    return Number.isInteger(mark) && mark >= 0 && mark <= 100;
  });

  const completedSections = Number(hasStage) + Number(hasUniqueSubject) + Number(hasUniqueValidSubjectMark);
  const requiredSections = 3;
  return {
    completedSections,
    requiredSections,
    percentage: Math.round((completedSections / requiredSections) * 100)
  };
}

/**
 * Summarises and filters only the current result records. State counts describe
 * the visible result set after all active filters have been applied.
 */
export function getDiscoverySummary({
  stage,
  subjects,
  results,
  eligibilityFilter = "ALL",
  campusFilter = "ALL"
}) {
  const candidates = Array.isArray(results) ? results : [];
  const campuses = [...new Set(candidates
    .map(item => typeof item.campus === "string" ? item.campus.trim() : "")
    .filter(Boolean))].sort((a, b) => a.localeCompare(b));

  const visibleResults = candidates.filter((item) => {
    const stateMatches = eligibilityFilter === "ALL" || item.state === eligibilityFilter;
    const campusMatches = campusFilter === "ALL" || item.campus === campusFilter;
    return stateMatches && campusMatches;
  });

  const stateCounts = Object.fromEntries(VALID_STATES.map(state => [state, 0]));
  for (const item of visibleResults) {
    if (VALID_STATES.includes(item.state)) stateCounts[item.state] += 1;
  }

  return {
    profile: getProfileCompleteness({ stage, subjects }),
    totalCandidates: candidates.length,
    visibleCount: visibleResults.length,
    visibleResults,
    campuses,
    stateCounts
  };
}
