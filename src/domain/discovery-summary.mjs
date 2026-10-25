const VALID_STATES = ["ELIGIBLE", "NOT_ELIGIBLE", "UNKNOWN"];

const REQUIRED_SUBJECT_COUNT = 6;

/**
 * Profile completeness has three required sections:
 * 1. current study stage;
 * 2. six distinct subjects, earned progressively;
 * 3. valid whole-number marks for those subjects, earned progressively.
 * Each section contributes one third of the score. Subject and mark progress
 * increases row-by-row until six valid, distinct subject/mark pairs are entered.
 * Additional subjects do not increase completeness beyond 100%.
 */
export function getProfileCompleteness({ stage, subjects }) {
  const hasStage = typeof stage === "string" && stage.trim().length > 0;
  const rows = Array.isArray(subjects) ? subjects : [];
  const subjectCounts = new Map();

  for (const row of rows) {
    const subject = typeof row?.subject === "string" ? row.subject.trim() : "";
    if (subject) subjectCounts.set(subject, (subjectCounts.get(subject) || 0) + 1);
  }

  const uniqueSubjects = new Set(
    [...subjectCounts.entries()].filter(([, count]) => count === 1).map(([subject]) => subject)
  );
  const validMarkedSubjects = new Set();

  for (const row of rows) {
    const subject = typeof row?.subject === "string" ? row.subject.trim() : "";
    if (!subject || !uniqueSubjects.has(subject)) continue;
    if (row.mark === "" || row.mark === null || row.mark === undefined) continue;
    const mark = Number(row.mark);
    if (Number.isInteger(mark) && mark >= 0 && mark <= 100) validMarkedSubjects.add(subject);
  }

  const subjectCount = Math.min(uniqueSubjects.size, REQUIRED_SUBJECT_COUNT);
  const markedSubjectCount = Math.min(validMarkedSubjects.size, REQUIRED_SUBJECT_COUNT);
  const subjectSectionComplete = subjectCount === REQUIRED_SUBJECT_COUNT;
  const marksSectionComplete = markedSubjectCount === REQUIRED_SUBJECT_COUNT;
  const completedSections = Number(hasStage) + Number(subjectSectionComplete) + Number(marksSectionComplete);
  const requiredSections = 3;
  const percentage = Math.round(
    (Number(hasStage) / 3 + subjectCount / REQUIRED_SUBJECT_COUNT / 3 + markedSubjectCount / REQUIRED_SUBJECT_COUNT / 3) * 100
  );

  return {
    completedSections,
    requiredSections,
    percentage,
    subjectCount,
    requiredSubjectCount: REQUIRED_SUBJECT_COUNT,
    markedSubjectCount,
    hasStage
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
