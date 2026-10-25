import test from "node:test";
import assert from "node:assert/strict";
import { buildWhyNotYet } from "../src/domain/why-not-yet.mjs";

test("NOT_ELIGIBLE identifies specific recorded requirements that are not met", () => {
  const result = buildWhyNotYet({
    state: "NOT_ELIGIBLE",
    reasonCodes: ["MATHEMATICS_BELOW_MINIMUM"],
    requirementEvidence: [{
      id: "subject-1",
      label: "Mathematics",
      rule: "Level 5",
      learnerValue: "Level 4",
      status: "NOT_MET",
      explanation: "The achievement level is below the recorded minimum of Level 5."
    }]
  });

  assert.equal(result.state, "NOT_ELIGIBLE");
  assert.equal(result.blockers.length, 1);
  assert.equal(result.blockers[0].label, "Mathematics");
  assert.equal(result.blockers[0].rule, "Level 5");
  assert.equal(result.blockers[0].learnerValue, "Level 4");
  assert.match(result.blockers[0].explanation, /below the recorded minimum/i);
});

test("UNKNOWN with missing required input asks for missing information, not rejection", () => {
  const result = buildWhyNotYet({
    state: "UNKNOWN",
    reasonCodes: ["REQUIRED_INPUT_MISSING"],
    requirementEvidence: [{
      id: "subject-2",
      label: "Physical Sciences",
      rule: "Required subject; minimum not recorded",
      learnerValue: "Not provided",
      status: "UNKNOWN",
      explanation: "This subject is not present. Because the transcript is incomplete, absence is not treated as failure."
    }]
  });

  assert.equal(result.state, "UNKNOWN");
  assert.match(result.title, /more information/i);
  assert.match(result.explanation, /not a rejection/i);
  assert.equal(result.blockers[0].status, undefined);
  assert.match(result.blockers[0].explanation, /absence is not treated as failure/i);
  assert.ok(result.nextSteps.some(step => /add the missing subject result/i.test(step)));
  assert.ok(!result.title.toLowerCase().includes("not eligible"));
});

test("UNKNOWN with unresolved alternative semantics directs learner to confirm the rule", () => {
  const result = buildWhyNotYet({
    state: "UNKNOWN",
    reasonCodes: ["ALTERNATIVE_RULE_UNRESOLVED"],
    requirementEvidence: [{
      id: "subject-1",
      label: "Mathematics",
      rule: "Required subject; minimum not recorded",
      learnerValue: "75% (Level 5)",
      status: "UNKNOWN",
      explanation: "The catalogue does not establish whether this subject is an alternative or an additional requirement."
    }]
  });

  assert.equal(result.state, "UNKNOWN");
  assert.match(result.title, /alternatives need confirmation/i);
  assert.ok(result.nextSteps.some(step => /official source links/i.test(step)));
  assert.match(result.blockers[0].explanation, /alternative or an additional requirement/i);
});

test("UNKNOWN without a recognised reason fails safely without inventing a blocker", () => {
  const result = buildWhyNotYet({
    state: "UNKNOWN",
    reasonCodes: ["UNRECOGNISED_REASON"],
    requirementEvidence: []
  });

  assert.equal(result.state, "UNKNOWN");
  assert.deepEqual(result.blockers, []);
  assert.match(result.explanation, /does not support a reliable conclusion/i);
  assert.ok(result.nextSteps.length > 0);
});

test("ELIGIBLE explains that no recorded blocker was found without guaranteeing admission", () => {
  const result = buildWhyNotYet({ state: "ELIGIBLE", reasonCodes: [], requirementEvidence: [] });
  assert.equal(result.blockers.length, 0);
  assert.match(result.explanation, /not an admission decision/i);
});

test("unsupported states are rejected rather than mislabelled", () => {
  assert.throws(() => buildWhyNotYet({ state: "INVALID" }), /supported eligibility state/);
});
