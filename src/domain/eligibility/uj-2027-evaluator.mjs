const BANDS=[[0,29,1],[30,39,2],[40,49,3],[50,59,4],[60,69,5],[70,79,6],[80,100,7]];
export function levelForPercent(mark){if(!Number.isInteger(mark)||mark<0||mark>100)throw new RangeError("Invalid mark");return BANDS.find(([a,b])=>mark>=a&&mark<=b)[2];}
const R=(state,reason,explanation,aps=null)=>({state,reasonCodes:[reason],explanation,aps});
const norm=x=>typeof x==="string"?x.trim().toUpperCase():"";
const EN=["ENGLISH","ENGLISH_HOME_LANGUAGE","ENGLISH_FIRST_ADDITIONAL_LANGUAGE","ENGLISH_SECOND_ADDITIONAL_LANGUAGE"];
function subjectsOf(input){if(!input||!Array.isArray(input.subjects))return {error:R("INPUT_REJECTED","INVALID_INPUT_SHAPE","Subjects are required.")};const a=[],seen=new Set();for(const x of input.subjects){const id=norm(x?.subjectId);if(!id)return {error:R("INPUT_REJECTED","INVALID_SUBJECT_INPUT","A subject ID is invalid.")};if(seen.has(id))return {error:R("INPUT_REJECTED","DUPLICATE_SUBJECT_INPUT","Duplicate canonical subject.")};seen.add(id);if(!Number.isInteger(x.percent)||x.percent<0||x.percent>100)return {error:R("INPUT_REJECTED","INVALID_MARK_INPUT","Marks must be integers from 0 to 100.")};a.push({id,percent:x.percent,level:levelForPercent(x.percent)});}return {a};}
function apsFor(a,required){const chosen=new Map();const eligible=a.filter(s=>s.id!=="LIFE_ORIENTATION");for(const id of required){const s=eligible.find(x=>x.id===id);if(!s)return null;chosen.set(id,s);}for(const s of [...eligible].sort((x,y)=>y.level-x.level||x.id.localeCompare(y.id))){if(chosen.size===6)break;if(!chosen.has(s.id))chosen.set(s.id,s);}return chosen.size===6?[...chosen.values()].reduce((n,s)=>n+s.level,0):null;}
export function evaluateEligibility({programme,learnerInput,admissionCycle,catalogueStatus,evaluationMode="DEFINITIVE",testOnlyAssumptions=false}){
 if(!programme)return R("INPUT_REJECTED","PROGRAMME_REQUIRED","Programme record is required.");
 if(admissionCycle!=="2027")return R("UNKNOWN","ADMISSION_CYCLE_UNVERIFIED","Admission cycle is unverified.");
 if(catalogueStatus==="SOURCE_CONFLICT")return R("UNKNOWN","MATERIAL_SOURCE_CONFLICT","Sources conflict.");
 if(catalogueStatus==="SOURCE_STALE")return R("UNKNOWN","SOURCE_NOT_CURRENTLY_VERIFIED","Source currentness is unverified.");
 if(catalogueStatus==="UNVERIFIED")return R("UNKNOWN","ADMISSION_CYCLE_UNVERIFIED","Cycle is unverified.");
 if(catalogueStatus==="DRAFT_ALTERNATIVE_RULE_UNRESOLVED")return R("UNKNOWN","ALTERNATIVE_RULE_UNRESOLVED","Alternative route is unresolved.");
 if(catalogueStatus==="DRAFT_MANDATORY_RULE_MISSING")return R("UNKNOWN","MANDATORY_RULE_UNRESOLVED","A mandatory rule is unresolved.");
 const demoMode=evaluationMode==="HACKATHON_DEMO"&&catalogueStatus==="APPROVED_FOR_HACKATHON_DEMO_ONLY"&&programme.status==="APPROVED_FOR_HACKATHON_DEMO_ONLY";
 const testApproved=testOnlyAssumptions&&catalogueStatus==="ASSUMED_SIGNED_OFF_FOR_TEST_ONLY";
 if(!demoMode&&(programme.status!=="APPROVED"||!programme.curatorSignoff)&&!testApproved)return R("UNKNOWN","CATALOGUE_RECORD_NOT_APPROVED","Catalogue record is not approved for definitive screening.");
 const parsed=subjectsOf(learnerInput);if(parsed.error)return parsed.error;const a=parsed.a;
 if(a.some(s=>s.id==="ENGLISH_UNMAPPED_STREAM"))return R("UNKNOWN","SUBJECT_MAPPING_UNRESOLVED","English stream cannot be mapped.");
 const req=programme.requirements??{},rules=req.subjectRules??[];
 const englishMappingStatus=req.english?.mappingStatus;
 const usesHomeLanguageDemoAssumption=englishMappingStatus==="DEMO_DEFAULT_HOME_LANGUAGE";
 const english=usesHomeLanguageDemoAssumption
   ? a.find(s=>s.id==="ENGLISH_HOME_LANGUAGE")
   : a.find(s=>EN.includes(s.id));
 if(!english){
   if(usesHomeLanguageDemoAssumption&&a.some(s=>["ENGLISH_FIRST_ADDITIONAL_LANGUAGE","ENGLISH_SECOND_ADDITIONAL_LANGUAGE","ENGLISH"].includes(s.id)))
     return R("UNKNOWN","ENGLISH_STREAM_ASSUMPTION_UNMET","This demo assumes English Home Language when the programme source does not specify a stream; First Additional Language or an unspecified stream is not treated as equivalent.");
   return R("UNKNOWN","REQUIRED_INPUT_MISSING","English Home Language result is required under the provisional demo assumption.");
 }
 if(englishMappingStatus==="UNRESOLVED"&&!testOnlyAssumptions)return R("UNKNOWN","SUBJECT_MAPPING_UNRESOLVED","English stream mapping is unresolved.");
 for(const r of rules)if(r.accepted===false&&a.some(s=>s.id===r.subject))return R("NOT_ELIGIBLE",r.subject==="MATHEMATICAL_LITERACY"?"MATHEMATICAL_LITERACY_NOT_ACCEPTED":"REQUIRED_SUBJECT_NOT_ACCEPTED",r.subject+" is not accepted.");
 if(programme.faculty==="Faculty of Science"&&a.some(s=>["TECHNICAL_MATHEMATICS","TECHNICAL_SCIENCES"].includes(s.id)))return R("NOT_ELIGIBLE","REQUIRED_SUBJECT_NOT_ACCEPTED","Technical Mathematics and Technical Science are not accepted for Faculty of Science degrees.");
 let aps=null,minAps=req.aps?.min;
 if(Array.isArray(req.apsBranches)&&req.apsBranches.length){const matches=[];for(const b of req.apsBranches)for(const r of b.subjects??[]){const s=a.find(x=>x.id===r.subject);if(s&&s.level>=(r.minLevel??1))matches.push({b,r,s});}const routeIds=[...new Set(matches.map(x=>x.s.id))];if(routeIds.length>1)return R("UNKNOWN","ALTERNATIVE_RULE_UNRESOLVED","Multiple alternative subject routes are present.");if(!matches.length){const low=req.apsBranches.flatMap(b=>(b.subjects??[]).map(r=>({r,s:a.find(x=>x.id===r.subject)}))).find(x=>x.s&&x.s.level<(x.r.minLevel??1));if(low){const code=low.r.subject==="MATHEMATICAL_LITERACY"?"MATHEMATICAL_LITERACY_BELOW_MINIMUM":low.r.subject==="MATHEMATICS"?"MATHEMATICS_BELOW_MINIMUM":"REQUIRED_SUBJECT_BELOW_MINIMUM";return R("NOT_ELIGIBLE",code,"Alternative route subject is below minimum.");}return R("UNKNOWN","REQUIRED_INPUT_MISSING","No applicable subject route is present.");}const m=matches[0];minAps=m.b.min;aps=apsFor(a,[english.id,m.s.id]);}
 else {const required=rules.filter(r=>r.mandatory===true).map(r=>r.subject);for(const r of rules){if(r.mandatory===true&&!a.some(s=>s.id===r.subject)){if(rules.some(x=>x.mandatory==="UNRESOLVED_ALTERNATIVE_SEMANTICS")&&!testOnlyAssumptions)return R("UNKNOWN","ALTERNATIVE_RULE_UNRESOLVED","Subject alternative semantics are unresolved.");return R("NOT_ELIGIBLE","REQUIRED_SUBJECT_MISSING","Required subject "+r.subject+" is missing.");}}aps=apsFor(a,[english.id,...required]);}
 for(const r of rules){if(r.accepted===false||r.mandatory===false||!Number.isInteger(r.minLevel))continue;if(r.mandatory==="UNRESOLVED_ALTERNATIVE_SEMANTICS"&&!testOnlyAssumptions)return R("UNKNOWN","ALTERNATIVE_RULE_UNRESOLVED","Subject alternatives are unresolved.",aps);const s=a.find(x=>x.id===r.subject);if(!s){if(r.mandatory===true)return R("NOT_ELIGIBLE","REQUIRED_SUBJECT_MISSING","Required subject is missing.",aps);continue;}if(s.level<r.minLevel)return R("NOT_ELIGIBLE",r.subject==="MATHEMATICS"?"MATHEMATICS_BELOW_MINIMUM":r.subject==="MATHEMATICAL_LITERACY"?"MATHEMATICAL_LITERACY_BELOW_MINIMUM":"REQUIRED_SUBJECT_BELOW_MINIMUM","Required subject level is below minimum.",aps);}
 if(english.level<(req.english?.minLevel??1))return R("NOT_ELIGIBLE","ENGLISH_BELOW_MINIMUM","English level is below minimum.",aps);
 if(aps===null)return R("UNKNOWN","REQUIRED_INPUT_MISSING","Cannot select six valid APS subjects.");
 if(Number.isInteger(minAps)&&aps<minAps)return R("NOT_ELIGIBLE","APS_BELOW_MINIMUM","APS is below minimum.",aps);
 if(!learnerInput.transcriptComplete)return R("UNKNOWN","REQUIRED_INPUT_MISSING","Transcript is incomplete.",aps);
 if(programme.unresolved?.length&&!testOnlyAssumptions)return R("UNKNOWN","MATERIAL_RULES_UNRESOLVED","At least one material programme rule remains unresolved; verified minimums do not establish a confident positive eligibility outcome.",aps);
 return {state:"ELIGIBLE",reasonCodes:["ALL_VERIFIED_REQUIREMENTS_MET"],explanation:"Minimum requirements met; admission is not guaranteed.",aps};
}
