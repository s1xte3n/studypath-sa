import { validateStudentEntries } from "./student-input-validation.mjs";
import { buildPathwayResults } from "./pathway-matching.mjs";

function copySubjects(subjects) {
  return subjects.map(({ subject, mark }) => ({ subject, mark }));
}

function requirementChanges(beforeRows = [], afterRows = []) {
  const beforeById = new Map(beforeRows.map(row => [row.id, row]));
  const afterById = new Map(afterRows.map(row => [row.id, row]));
  const ids = new Set([...beforeById.keys(), ...afterById.keys()]);
  const changed = [];
  for (const id of ids) {
    const before = beforeById.get(id) ?? null;
    const after = afterById.get(id) ?? null;
    if (!before || !after || before.status !== after.status
      || before.learnerValue !== after.learnerValue
      || before.rule !== after.rule
      || before.explanation !== after.explanation) {
      changed.push({
        id,
        label: after?.label ?? before?.label ?? "Recorded requirement",
        before: before ? { status: before.status, learnerValue: before.learnerValue, rule: before.rule, explanation: before.explanation } : null,
        after: after ? { status: after.status, learnerValue: after.learnerValue, rule: after.rule, explanation: after.explanation } : null
      });
    }
  }
  return changed;
}

/** Runs hypothetical marks through the same deterministic evaluator as discovery. */
export function simulateWhatIfMarks({ stage, actualSubjects, simulatedSubjects, catalogue } = {}) {
  const actual = copySubjects(Array.isArray(actualSubjects) ? actualSubjects : []);
  const draft = copySubjects(Array.isArray(simulatedSubjects) ? simulatedSubjects : []);
  const actualErrors = validateStudentEntries({ stage, subjects: actual });
  if (actualErrors.length) {
    return { valid: false, errors: actualErrors.map(message => `Actual profile: ${message}`), changes: [] };
  }
  const errors = validateStudentEntries({ stage, subjects: draft });
  if (errors.length) return { valid: false, errors, changes: [] };

  const actualIds = actual.map(item => item.subject).sort();
  const draftIds = draft.map(item => item.subject).sort();
  if (actualIds.length !== draftIds.length || actualIds.some((subject, index) => subject !== draftIds[index])) {
    return {
      valid: false,
      errors: ["The hypothetical scenario must use the same supported subjects as the actual profile. Change marks only; edit the actual profile separately to change subjects."],
      changes: []
    };
  }

  let beforeResults;
  let afterResults;
  try {
    beforeResults = buildPathwayResults({ stage, subjects: actual }, catalogue);
    afterResults = buildPathwayResults({ stage, subjects: draft }, catalogue);
  } catch {
    return { valid: false, errors: ["These marks could not be evaluated. Check supported subjects and whole-number marks from 0 to 100."], changes: [] };
  }

  const beforeById = new Map(beforeResults.map(item => [item.id, item]));
  const changes = afterResults.flatMap(after => {
    const before = beforeById.get(after.id);
    if (!before) return [];
    const requirements = requirementChanges(before.requirementEvidence, after.requirementEvidence);
    if (before.state === after.state && requirements.length === 0) return [];
    return [{
      id: after.id,
      name: after.name,
      beforeState: before.state,
      afterState: after.state,
      stateChanged: before.state !== after.state,
      requirements
    }];
  });

  return {
    valid: true,
    errors: [],
    changes,
    changedPathwayCount: changes.length,
    stateChangeCount: changes.filter(item => item.stateChanged).length,
    hypothetical: true
  };
}
