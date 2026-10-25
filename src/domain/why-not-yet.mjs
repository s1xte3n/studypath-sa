const REASON_COPY = {
  REQUIRED_INPUT_MISSING: {
    title: "More information is needed",
    explanation: "The available profile does not contain all information needed to assess this pathway. This is unknown, not a rejection."
  },
  ENGLISH_STREAM_ASSUMPTION_UNMET: {
    title: "English requirement needs confirmation",
    explanation: "The current demo assumption does not establish whether your English stream meets this pathway's official rule. Confirm the accepted stream with the institution."
  },
  SUBJECT_MAPPING_UNRESOLVED: {
    title: "A subject rule needs confirmation",
    explanation: "The catalogue cannot reliably map one of the recorded subject rules to your profile. No conclusion is drawn from that unresolved mapping."
  },
  ALTERNATIVE_RULE_UNRESOLVED: {
    title: "Subject alternatives need confirmation",
    explanation: "The available catalogue does not establish how the listed subject alternatives should be applied. This is not a rejection."
  },
  MATERIAL_RULES_UNRESOLVED: {
    title: "A programme rule is unresolved",
    explanation: "A recorded uncertainty could change the result, so StudyPath cannot reliably determine eligibility from the available information."
  },
  MATERIAL_SOURCE_CONFLICT: {
    title: "Official sources need reconciliation",
    explanation: "The available sources conflict on a material requirement. Confirm the current rule with the institution before relying on this result."
  },
  SOURCE_NOT_CURRENTLY_VERIFIED: {
    title: "Source currentness is unverified",
    explanation: "The source record has not been verified as current for this admission cycle. Check the institution's current official requirements."
  },
  ADMISSION_CYCLE_UNVERIFIED: {
    title: "Admission cycle is unverified",
    explanation: "The catalogue does not establish a verified rule set for the selected admission cycle."
  },
  CATALOGUE_PUBLICATION_GATE_FAILED: {
    title: "Requirements are not verified for screening",
    explanation: "The catalogue has not passed the evidence checks required for definitive screening. No eligibility conclusion can be made."
  },
  CATALOGUE_RECORD_NOT_APPROVED: {
    title: "Programme information is not approved",
    explanation: "This programme record is not approved for definitive eligibility screening."
  },
  REQUIRED_SUBJECT_NOT_ACCEPTED: {
    title: "A recorded subject restriction applies",
    explanation: "The catalogue records a subject restriction for this pathway. Review the specific comparison and confirm the rule with the institution."
  },
  APS_BELOW_MINIMUM: {
    title: "Recorded APS minimum not met",
    explanation: "The provisional APS calculated from the available inputs is below the minimum recorded in the catalogue."
  },
  ENGLISH_BELOW_MINIMUM: {
    title: "Recorded English minimum not met",
    explanation: "The available English result is below the minimum recorded in the catalogue."
  },
  MATHEMATICS_BELOW_MINIMUM: {
    title: "Recorded Mathematics minimum not met",
    explanation: "The available Mathematics result is below the minimum recorded in the catalogue."
  },
  MATHEMATICAL_LITERACY_BELOW_MINIMUM: {
    title: "Recorded Mathematical Literacy minimum not met",
    explanation: "The available Mathematical Literacy result is below the minimum recorded in the catalogue."
  },
  MATHEMATICAL_LITERACY_NOT_ACCEPTED: {
    title: "Recorded subject restriction applies",
    explanation: "The catalogue records Mathematical Literacy as not accepted for this pathway."
  },
  REQUIRED_SUBJECT_BELOW_MINIMUM: {
    title: "A recorded subject minimum is not met",
    explanation: "At least one available subject result is below a minimum recorded in the catalogue."
  },
  REQUIRED_SUBJECT_MISSING: {
    title: "A required subject is missing",
    explanation: "The profile is marked complete, but a required subject recorded for this pathway is absent."
  }
};

const UNKNOWN_REASONS = new Set([
  "REQUIRED_INPUT_MISSING", "ENGLISH_STREAM_ASSUMPTION_UNMET",
  "SUBJECT_MAPPING_UNRESOLVED", "ALTERNATIVE_RULE_UNRESOLVED",
  "MATERIAL_RULES_UNRESOLVED", "MATERIAL_SOURCE_CONFLICT",
  "SOURCE_NOT_CURRENTLY_VERIFIED", "ADMISSION_CYCLE_UNVERIFIED",
  "CATALOGUE_PUBLICATION_GATE_FAILED", "CATALOGUE_RECORD_NOT_APPROVED"
]);

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

/**
 * Turns deterministic evaluator states, reason codes and requirement evidence
 * into learner-facing blockers. It does not evaluate eligibility or infer rules.
 */
export function buildWhyNotYet(item) {
  if (!item || !["ELIGIBLE", "NOT_ELIGIBLE", "UNKNOWN"].includes(item.state)) {
    throw new TypeError("A pathway result with a supported eligibility state is required.");
  }

  const codes = Array.isArray(item.reasonCodes) ? item.reasonCodes : [];
  const evidence = Array.isArray(item.requirementEvidence) ? item.requirementEvidence : [];
  const unmet = evidence.filter(row => row.status === "NOT_MET");
  const unknown = evidence.filter(row => row.status === "UNKNOWN");
  const primaryCode = codes.find(code => REASON_COPY[code]) || null;

  if (item.state === "ELIGIBLE") {
    return {
      state: item.state,
      title: "No recorded blocker found",
      explanation: "The evaluator found that the available inputs meet the minimums it could assess. This remains provisional and is not an admission decision.",
      blockers: [],
      nextSteps: ["Review the recorded requirements and confirm current official rules before applying."]
    };
  }

  if (item.state === "NOT_ELIGIBLE") {
    const blockers = unmet.map(row => ({
      id: row.id,
      label: row.label,
      rule: row.rule,
      learnerValue: row.learnerValue,
      explanation: row.explanation
    }));
    if (blockers.length === 0 && primaryCode) {
      blockers.push({
        id: `reason-${primaryCode}`,
        label: REASON_COPY[primaryCode].title,
        rule: null,
        learnerValue: null,
        explanation: REASON_COPY[primaryCode].explanation
      });
    }
    return {
      state: item.state,
      title: "Recorded requirement not met",
      explanation: "The evaluator identified a recorded requirement that is not met. This is a comparison against the available catalogue, not an admission decision.",
      blockers,
      nextSteps: ["Open the available official source links and confirm the requirement for the intended admission cycle."]
    };
  }

  const copy = primaryCode && UNKNOWN_REASONS.has(primaryCode) ? REASON_COPY[primaryCode] : null;
  const blockers = unknown.map(row => ({
    id: row.id,
    label: row.label,
    rule: row.rule,
    learnerValue: row.learnerValue,
    explanation: row.explanation
  }));
  const nextSteps = [];
  if (primaryCode === "REQUIRED_INPUT_MISSING") {
    if (unknown.some(row => /english/i.test(row.label) || /english/i.test(row.learnerValue))) {
      nextSteps.push("Add the English result and stream that appear on your results statement, if available.");
    }
    if (unknown.some(row => row.status === "UNKNOWN" && /subject/i.test(row.label))) {
      nextSteps.push("Add the missing subject result if it is available on your results statement.");
    }
    if (nextSteps.length === 0) nextSteps.push("Complete the relevant subject results in your profile, then explore again.");
  }
  if (["ENGLISH_STREAM_ASSUMPTION_UNMET", "SUBJECT_MAPPING_UNRESOLVED", "ALTERNATIVE_RULE_UNRESOLVED", "MATERIAL_RULES_UNRESOLVED", "MATERIAL_SOURCE_CONFLICT", "SOURCE_NOT_CURRENTLY_VERIFIED", "ADMISSION_CYCLE_UNVERIFIED", "CATALOGUE_PUBLICATION_GATE_FAILED", "CATALOGUE_RECORD_NOT_APPROVED"].includes(primaryCode)) {
    nextSteps.push("Use the available official source links to confirm the rule and admission cycle with the institution.");
  }
  if (nextSteps.length === 0) nextSteps.push("Review the recorded limitations and available official source links; do not treat this unknown result as a rejection.");
  return {
    state: item.state,
    title: copy?.title || "Eligibility cannot be determined yet",
    explanation: copy?.explanation || "The available information does not support a reliable conclusion. This is unknown, not a rejection.",
    blockers,
    nextSteps
  };
}
