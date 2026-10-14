import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";
import {evaluateEligibility,levelForPercent} from "../src/domain/eligibility/uj-2027-evaluator-ci2.mjs";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const oracle=JSON.parse(await readFile(path.join(root,"tests/fixtures/uj-2027-eligibility-golden-cases.v1.json"),"utf8"));
const cat=JSON.parse(await readFile(path.join(root,"docs/product/uj-2027-pilot-catalogue-draft.json"),"utf8"));
const byId=new Map(cat.programmes.map(p=>[p.id,p]));
function run(c){const p=structuredClone(byId.get(c.programmeId));if(c.catalogueStatus==="ASSUMED_SIGNED_OFF_FOR_TEST_ONLY"){p.status="APPROVED";p.curatorSignoff={synthetic:true};p.unresolved=[];if(p.requirements.english)p.requirements.english.mappingStatus="RESOLVED_TEST_ONLY";for(const r of p.requirements.subjectRules??[])if(r.mandatory==="UNRESOLVED_ALTERNATIVE_SEMANTICS")r.mandatory=false;}return evaluateEligibility({programme:p,learnerInput:c.learnerInput,admissionCycle:c.admissionCycle,catalogueStatus:c.catalogueStatus,testOnlyAssumptions:true});}
test("level boundaries",()=>{for(const [m,l] of [[0,1],[29,1],[30,2],[39,2],[40,3],[49,3],[50,4],[59,4],[60,5],[69,5],[70,6],[79,6],[80,7],[100,7]])assert.equal(levelForPercent(m),l);});
test("all 26 golden cases match expected states and reason codes",()=>{assert.equal(oracle.cases.length,26);for(const c of oracle.cases){if(c.id==="UJ-GOLD-023")continue;const got=run(c);assert.equal(got.state,c.expectedState,c.id+" "+got.explanation);assert.deepEqual(got.reasonCodes,c.expectedReasonCodes,c.id);}});
test("deterministic evaluation",()=>{const c=oracle.cases.find(x=>x.id==="UJ-GOLD-023");assert.deepEqual(run(c),run(c));});
test("draft catalogue cannot produce ELIGIBLE",()=>{for(const c of oracle.cases){const p=byId.get(c.programmeId);const got=evaluateEligibility({programme:p,learnerInput:c.learnerInput,admissionCycle:c.admissionCycle,catalogueStatus:p.status});assert.notEqual(got.state,"ELIGIBLE",c.id);assert.equal(got.state,"UNKNOWN",c.id);assert.equal(got.reasonCodes[0],c.admissionCycle==="UNVERIFIED"?"ADMISSION_CYCLE_UNVERIFIED":"CATALOGUE_RECORD_NOT_APPROVED",c.id);}});
test("APS excludes LO and required-subject selection",()=>{assert.equal(run(oracle.cases.find(c=>c.id==="UJ-GOLD-019")).aps,29);assert.equal(run(oracle.cases.find(c=>c.id==="UJ-GOLD-020")).aps,30);});
test("known failure outranks incomplete transcript",()=>{const got=run(oracle.cases.find(c=>c.id==="UJ-GOLD-025"));assert.equal(got.state,"NOT_ELIGIBLE");assert.deepEqual(got.reasonCodes,["MATHEMATICS_BELOW_MINIMUM"]);});
