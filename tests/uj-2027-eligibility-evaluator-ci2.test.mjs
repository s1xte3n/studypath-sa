import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { evaluateEligibility, levelForPercent } from "../src/domain/eligibility/uj-2027-evaluator-ci2.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [oracle, catalogue] = await Promise.all([
  readFile(path.join(root,"tests/fixtures/uj-2027-eligibility-golden-cases.v1.json"),"utf8").then(JSON.parse),
  readFile(path.join(root,"docs/product/uj-2027-pilot-catalogue-draft.json"),"utf8").then(JSON.parse),
]);
const programmes = new Map(catalogue.programmes.map(p=>[p.id,p]));

function evaluateCase(item) {
  const original = programmes.get(item.programmeId);
  assert.ok(original, `${item.id}: programme exists`);
  // The assumptions are explicitly synthetic. They let positive-path cases
  // exercise logic without falsely approving the real draft catalogue.
  const programme = structuredClone(original);
  if (item.catalogueStatus === "ASSUMED_SIGNED_OFF_FOR_TEST_ONLY") {
    programme.status = "APPROVED";
    programme.curatorSignoff = { testFixtureOnly: true };
    programme.unresolved = [];
    if (programme.requirements?.english) programme.requirements.english.mappingStatus = "RESOLVED_TEST_FIXTURE_ONLY";
    for (const rule of programme.requirements?.subjectRules ?? []) {
      if (rule.mandatory === "UNRESOLVED_ALTERNATIVE_SEMANTICS") rule.mandatory = false;
    }
  }
  return evaluateEligibility({
    programme,
    learnerInput: item.learnerInput,
    admissionCycle: item.admissionCycle,
    catalogueStatus: item.catalogueStatus,
    testOnlyAssumptions: true,
  });
}

test("fixture schema, scope and unique golden-case IDs are valid",()=>{
  assert.equal(oracle.schemaVersion,"studypath-eligibility-golden-cases-v1");
  assert.equal(oracle.scope.institution,"University of Johannesburg");
  assert.equal(oracle.scope.admissionCycle,"2027");
  assert.equal(oracle.scope.applicantRoute,"NSC");
  assert.equal(oracle.scope.syntheticOnly,true);
  assert.ok(oracle.cases.length>=oracle.assertionPolicy.minimumCaseCount);
  const ids=oracle.cases.map(c=>c.id);
  assert.equal(new Set(ids).size,ids.length);
  for(const item of oracle.cases){
    assert.equal(item.inputIsSynthetic,true,item.id);
    assert.ok(programmes.has(item.programmeId),item.id);
    assert.ok(item.expectedReasonCodes.length>0,item.id);
  }
});

test("mark-to-level boundaries and invalid values",()=>{
  for(const [mark,level] of [[0,1],[29,1],[30,2],[39,2],[40,3],[49,3],[50,4],[59,4],[60,5],[69,5],[70,6],[79,6],[80,7],[100,7]])assert.equal(levelForPercent(mark),level);
  for(const invalid of [-1,101,65.5,"65",null])assert.throws(()=>levelForPercent(invalid),RangeError);
});

test("all 26 golden cases match exact expected state and ordered reason codes",()=>{
  assert.equal(oracle.cases.length,26);
  for(const item of oracle.cases){
    if(item.id==="UJ-GOLD-023")continue; // determinism is asserted separately
    const actual=evaluateCase(item);
    assert.equal(actual.state,item.expectedState,`${item.id}: ${actual.explanation}`);
    assert.deepEqual(actual.reasonCodes,item.expectedReasonCodes,item.id);
  }
});

test("deterministic case returns the same state, reasons and APS on repeated evaluations",()=>{
  const item=oracle.cases.find(c=>c.id==="UJ-GOLD-023");
  assert.ok(item);
  const first=evaluateCase(item),second=evaluateCase(item);
  assert.deepEqual(second,first);
  assert.equal(item.expectedState,"SAME_AS_FIRST_EVALUATION");
  assert.deepEqual(item.expectedReasonCodes,["DETERMINISTIC_RESULT"]);
});

test("current production catalogue never returns ELIGIBLE while records remain draft",()=>{
  for(const item of oracle.cases){
    const programme=programmes.get(item.programmeId);
    const actual=evaluateEligibility({programme,learnerInput:item.learnerInput,admissionCycle:item.admissionCycle,catalogueStatus:programme.status});
    assert.notEqual(actual.state,"ELIGIBLE",item.id);
    assert.equal(actual.state,"UNKNOWN",item.id);
    assert.equal(actual.reasonCodes[0],"CATALOGUE_RECORD_NOT_APPROVED",item.id);
  }
});

test("golden-case APS exclusions and required-subject selection are consistent",()=>{
  const loCase=oracle.cases.find(c=>c.id==="UJ-GOLD-019");
  const topSixCase=oracle.cases.find(c=>c.id==="UJ-GOLD-020");
  assert.equal(evaluateCase(loCase).aps,29);
  assert.equal(evaluateCase(topSixCase).aps,30);
});

test("known subject failures are not hidden by incomplete transcript data",()=>{
  const item=oracle.cases.find(c=>c.id==="UJ-GOLD-025");
  const actual=evaluateCase(item);
  assert.equal(actual.state,"NOT_ELIGIBLE");
  assert.deepEqual(actual.reasonCodes,["MATHEMATICS_BELOW_MINIMUM"]);
});
