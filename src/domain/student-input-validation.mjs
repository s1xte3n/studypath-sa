const VALID_STAGES = new Set(["GRADE_11", "GRADE_12", "MATRIC_GRADUATE"]);
const VALID_SUBJECTS = new Set([
  "English Home Language",
  "English First Additional Language",
  "English Second Additional Language",
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "Geography",
  "History",
  "Business Studies",
  "Accounting",
  "Life Orientation"
]);

/**
 * Validate the learner form without performing pathway matching or eligibility decisions.
 * Returns user-facing validation messages; an empty array means the form is structurally valid.
 */
export function validateStudentEntries({ stage, subjects } = {}) {
  const errors = [];
  if (!VALID_STAGES.has(stage)) errors.push("Select your current study stage.");
  if (!Array.isArray(subjects) || subjects.length === 0) {
    errors.push("Add at least one subject and mark.");
    return errors;
  }

  const activeRows = subjects
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => {
      const subject = typeof item?.subject === "string" ? item.subject.trim() : "";
      const markText = typeof item?.mark === "string" ? item.mark.trim() : item?.mark;
      return Boolean(item?.customSubject) || subject !== "" || (markText !== "" && markText !== null && markText !== undefined);
    });

  if (activeRows.length === 0) {
    errors.push("Add at least one subject and mark.");
    return errors;
  }

  const seen = new Set();
  activeRows.forEach(({ item, index }) => {
    const row = index + 1;
    const subject = typeof item?.subject === "string" ? item.subject.trim() : "";
    const markText = typeof item?.mark === "string" ? item.mark.trim() : item?.mark;
    if (!subject) errors.push(`Choose a subject for row ${row}.`);
    else if (!item?.customSubject && !VALID_SUBJECTS.has(subject)) errors.push(`Choose a supported subject for row ${row}.`);
    if (markText === "" || markText === null || markText === undefined || !Number.isInteger(Number(markText)) || Number(markText) < 0 || Number(markText) > 100) {
      errors.push(`Enter a whole-number mark from 0 to 100 for row ${row}.`);
    }
    if (subject && seen.has(subject)) errors.push(`${subject} is listed more than once.`);
    if (subject) seen.add(subject);
  });
  return errors;
}
