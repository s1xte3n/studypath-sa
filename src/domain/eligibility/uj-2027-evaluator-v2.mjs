/**
 * Conservative deterministic UJ 2027 pilot eligibility evaluator.
 * testOnlyAssumptions is for synthetic golden cases only; never enable it in production.
 */
const BANDS=[[0,29,1],[30,39,2],[40,49,3],[50,59,4],[60,69,5],[70,79,6],[80,100,7]];
export function levelForPercent(mark){if(!Number.isInteger(mark)||mark<0||mark>100)throw new RangeError("Mark must be an integer from 0 to 100");return BANDS.find(([a,b])=>mark>=a&&mark<=b)[2];}
const norm=v=>typeof v==="string"?v.trim().toUpperCase():"";
const out=(state,code,explanation,aps=null)=>({state,reasonCodes:[code],explanation,aps});
const ENGLISH=["ENGLISH","ENGLISH_HOME_LANGUAGE","ENGLISH_FIRST_ADDITIONAL_LANGUAGE","ENGLISH_SECOND_ADDITIONAL_LANGUAGE"];
function apsFor(subjects,required){const list=subjects.filter(s=>s.id!=="LIFE_ORIENTATION"),picked=new Map();for(const id of required){const s=list.find(x=>x.id===id);if(!s)return null;picked.set(id,s);}for(const s of [...list].sort((a,b)=>b.level-a.level||a.id.localeCompare(b.id))){if(picked.size>=6)break;if(!picked.has(s.id))picked.set(s.id,s);}return picked.size===6?[...picked.values()].reduce((n,s)=>n+s.level,0):null;}
function parseSubjects(input){if(!input||!Array.isArray(input.subjects))return {error:out("INPUT_REJECTED","INVALID_INPUT_SHAPE","A subjects array is required.")};const subjects=[],seen=new Set();for(const raw of input.subjects){const id=norm(raw?.subjectId);if(!id)return {error:out("INPUT_REJECTED","INVALID_SUBJECT_INPUT","Each subject needs an ID.")};if(seen.has(id))return {error:out("INPUT_REJECTED","DUPLICATE_SUBJECT_INPUT",`Duplicate subject: ${id}.`)};seen.add(id);if(!Number.isInteger(raw.percent)||raw.percent<0||raw.percent>100)return {error:out("INPUT_REJECTED","INVALID_MARK_INPUT",`Invalid mark for ${id}; expected an integer from 0 to 100.`)};subjects.push({id,percent:raw.percent,level:levelForPercent(raw.percent)});}return {subjects};}
export function evaluateEligibility({programme,learnerInput,admissionCycle,catalogueStatus,testOnlyAssumptions=false}){
 if(!programme)return out("INPUT_REJECTED","PROGRAMME_REQUIRED","A programme record is required.");
 if(admissionCycle!=="2027")return out("UNKNOWN","ADMISSION_CYCLE_UNVERIFIED","The admission cycle is not verified.");
 if(catalogueStatus==="SOURCE_CONFLICT")return out("UNKNOWN","MATERIAL_SOURCE_CONFLICT","Authoritative sources conflict.");
 if(catalogueStatus==="SOURCE_STALE")return out("UNKNOWN","SOURCE_NOT_CURRENTLY_VERIFIED","The source is not verified as current.");
 if(catalogueStatus==="UNVERIFIED")return out("UNKNOWN","ADMISSION_CYCLE_UNVERIFIED","The programme cycle is unverified.");
 const testApproved=testOnlyAssumptions&&catalogueStatus==="ASSUMED_SIGNED_OFF_FOR_TEST_ONLY";
 if((programme.status!=="APPROVED"||!programme.curatorSignoff)&&!testApproved)return out("UNKNOWN","CATALOGUE_RECORD_NOT_APPROVED","The programme record is draft and has no curator sign-off.");
 if(programme.unresolved?.length&&!testOnlyAssumptions)return out("UNKNOWN","MANDATORY_RULE_UNRESOLVED","Material programme rules remain unresolved.");
 const parsed=parseSubjects(learnerInput);if(parsed.error)return parsed.error;const subjects=parsed.subjects;
 if(subjects.some(s=>s.id==="ENGLISH_UNMAPPED_STREAM"))return out("UNKNOWN","SUBJECT_MAPPING_UNRESOLVED","The English result cannot be mapped to the requirement.");
 const req=programme.requirements??{},rules=req.subjectRules??[];
 const english=subjects.find(s=>ENGLISH.includes(s.id));
 if(!english)return out("UNKNOWN","REQUIRED_INPUT_MISSING","A required English result is missing.");
 if(req.english?.mappingStatus==="UNRESOLVED"&&!testOnlyAssumptions)return out("UNKNOWN","SUBJECT_MAPPING_UNRESOLVED","The accepted English subject stream has not been verified.");
 for(const rule of rules)if(rule.accepted===false&&subjects.some(s=>s.id===rule.subject))return out("NOT_ELIGIBLE",rule.subject==="MATHEMATICAL_LITERACY"?"MATHEMATICAL_LITERACY_NOT_ACCEPTED":"REQUIRED_SUBJECT_NOT_ACCEPTED",`${rule.subject} is not accepted for this programme.`);
 if(programme.faculty==="Faculty of Science"&&subjects.some(s=>["TECHNICAL_MATHEMATICS","TECHNICAL_SCIENCES"].includes(s.id)))return out("NOT_ELIGIBLE","REQUIRED_SUBJECT_NOT_ACCEPTED","Technical Mathematics and Technical Science are not accepted for Faculty of Science degree programmes.");
 let aps=null,minAps=req.aps?.min,routeSubject=null;
 if(Array.isArray(req.apsBranches)&&req.apsBranches.length){
   const matches=[];
   for(const branch of req.apsBranches)for(const rule of branch.subjects??[]){const s=subjects.find(x=>x.id===rule.subject);if(s&&s.level>=(rule.minLevel??1))matches.push({branch,rule,s});}
   const routeIds=[...new Set(matches.map(x=>x.s.id))];
   if(routeIds.length>1)return out("UNKNOWN","ALTERNATIVE_RULE_UNRESOLVED","Multiple alternative route subjects are present; no route is chosen automatically.");
   if(!matches.length){const hasRoute=req.apsBranches.some(b=>(b.subjects??[]).some(r=>subjects.some(s=>s.id===r.subject)));if(hasRoute)return out("NOT_ELIGIBLE","REQUIRED_SUBJECT_BELOW_MINIMUM","The available alternative-route subject is below its required level.");return out("UNKNOWN","REQUIRED_INPUT_MISSING","No applicable mathematics route can be established.");}
   const match=matches[0];routeSubject=match.s;minAps=match.branch.min;aps=apsFor(subjects,[english.id,routeSubject.id]);
 }else{
   const required=rules.filter(r=>r.mandatory===true).map(r=>r.subject);
   for(const r of rules){if(r.mandatory===true&&!subjects.some(s=>s.id===r.subject)){if(rules.some(x=>x.mandatory==="UNRESOLVED_ALTERNATIVE_SEMANTICS")&&!testOnlyAssumptions)return out("UNKNOWN","ALTERNATIVE_RULE_UNRESOLVED","The required-subject alternatives are unresolved.");return out("NOT_ELIGIBLE","REQUIRED_SUBJECT_MISSING",`Required subject ${r.subject} is missing.`);}}
   aps=apsFor(subjects,[english.id,...required]);
 }
 // A known hard subject failure takes precedence over incomplete unrelated transcript data.
 for(const rule of rules){if(rule.accepted===false||rule.mandatory===false||!Number.isInteger(rule.minLevel))continue;if(rule.mandatory==="UNRESOLVED_ALTERNATIVE_SEMANTICS"&&!testOnlyAssumptions)return out("UNKNOWN","ALTERNATIVE_RULE_UNRESOLVED","Subject-rule alternatives are unresolved.",aps);const s=subjects.find(x=>x.id===rule.subject);if(!s){if(rule.mandatory===true)return out("NOT_ELIGIBLE","REQUIRED_SUBJECT_MISSING",`Required subject ${rule.subject} is missing.`,aps);continue;}if(s.level<rule.minLevel)return out("NOT_ELIGIBLE",rule.subject==="MATHEMATICS"?"MATHEMATICS_BELOW_MINIMUM":rule.subject==="MATHEMATICAL_LITERACY"?"MATHEMATICAL_LITERACY_BELOW_MINIMUM":"REQUIRED_SUBJECT_BELOW_MINIMUM",`${rule.subject} is below required level ${rule.minLevel}.`,aps);}
 if(english.level<(req.english?.minLevel??1))return out("NOT_ELIGIBLE","ENGLISH_BELOW_MINIMUM",`English level ${english.level} is below required level ${req.english.minLevel}.`,aps);
 if(aps===null)return out("UNKNOWN","REQUIRED_INPUT_MISSING","Six APS subjects including required subjects cannot be selected.");
 if(Number.isInteger(minAps)&&aps<minAps)return out("NOT_ELIGIBLE","APS_BELOW_MINIMUM",`APS ${aps} is below minimum ${minAps}.`,aps);
 if(!learnerInput.transcriptComplete)return out("UNKNOWN","REQUIRED_INPUT_MISSING","The transcript is incomplete; eligibility cannot be confirmed.",aps);
 return {state:"ELIGIBLE",reasonCodes:["ALL_VERIFIED_REQUIREMENTS_MET"],explanation:"All encoded minimum requirements are met. This does not guarantee admission.",aps};
}
