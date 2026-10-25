import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildPathwayResults } from "../src/domain/pathway-matching.mjs";

const catalogue = JSON.parse(await readFile(new URL("../docs/product/uj-2027-pilot-catalogue-draft.json", import.meta.url), "utf8"));
const strongMarks = [
  { subject: "English Home Language", mark: "90" },
  { subject: "Mathematics", mark: "90" },
  { subject: "Physical Sciences", mark: "90" },
  { subject: "Life Sciences", mark: "90" },
  { subject: "Geography", mark: "90" },
  { subject: "Accounting", mark: "90" }
];

test("hackathon demo returns provisional outcomes for interpretable source-backed minimums", () => {
  const results = buildPathwayResults({ stage: "MATRIC_GRADUATE", subjects: strongMarks }, catalogue);

  assert.equal(results.length, catalogue.programmes.length);
  assert.ok(results.every(item => item.catalogueStatus === "APPROVED_FOR_HACKATHON_DEMO_ONLY"));
  assert.ok(results.some(item => item.state === "UNKNOWN"));
  assert.ok(results.some(item => item.state === "ELIGIBLE"), "interpretable source-backed minimums should produce useful positive outcomes");
  assert.ok(results.every(item => item.sourceUrl?.startsWith("https://")));

  const informationTechnology = results.find(item => item.id === "UJ-2027-BSC-IT");
  assert.equal(informationTechnology.state, "ELIGIBLE");
  assert.ok(informationTechnology.reasonCodes.includes("RECORDED_MINIMUMS_MET_PROVISIONALLY"));
  assert.match(informationTechnology.reason, /provisional/i);
  assert.match(informationTechnology.reason, /admission is not guaranteed/i);
  const prospectus = informationTechnology.sourceLinks.find(item =>
    item.url.includes("uj_undergrad_prospectus2027_online_25jun2026.pdf")
  );
  assert.equal(prospectus.location, "printed p. 86");
  assert.equal(prospectus.verificationDate, "2026-10-14");
});

test("a verified mandatory-subject failure can return NOT_ELIGIBLE despite unrelated unresolved conditions", () => {
  const results = buildPathwayResults({
    stage: "MATRIC_GRADUATE",
    subjects: [
      { subject: "English Home Language", mark: "90" },
      { subject: "Mathematics", mark: "50" },
      { subject: "Physical Sciences", mark: "90" },
      { subject: "Life Sciences", mark: "90" },
      { subject: "Geography", mark: "90" },
      { subject: "Accounting", mark: "90" }
    ]
  }, catalogue);

  const informationTechnology = results.find(item => item.id === "UJ-2027-BSC-IT");
  assert.equal(informationTechnology.state, "NOT_ELIGIBLE");
  assert.ok(informationTechnology.reasonCodes.includes("MATHEMATICS_BELOW_MINIMUM"));
});

test("explicit subject rejection is evaluated before unresolved positive-outcome checks", () => {
  const results = buildPathwayResults({
    stage: "MATRIC_GRADUATE",
    subjects: [
      { subject: "English Home Language", mark: "90" },
      { subject: "Mathematics", mark: "90" },
      { subject: "Mathematical Literacy", mark: "90" },
      { subject: "Physical Sciences", mark: "90" },
      { subject: "Life Sciences", mark: "90" },
      { subject: "Geography", mark: "90" }
    ]
  }, catalogue);

  const accounting = results.find(item => item.id === "UJ-2027-CBE-BCOM-ACCOUNTING");
  assert.equal(accounting.state, "NOT_ELIGIBLE");
  assert.ok(accounting.reasonCodes.includes("MATHEMATICAL_LITERACY_NOT_ACCEPTED"));
});

test("English stream assumption remains explicit and unresolved streams stay UNKNOWN", () => {
  const results = buildPathwayResults({
    stage: "MATRIC_GRADUATE",
    subjects: strongMarks.map(item => item.subject === "English Home Language"
      ? { subject: "English First Additional Language", mark: item.mark }
      : item)
  }, catalogue);

  const informationTechnology = results.find(item => item.id === "UJ-2027-BSC-IT");
  assert.equal(informationTechnology.state, "UNKNOWN");
  assert.ok(informationTechnology.reasonCodes.includes("ENGLISH_STREAM_ASSUMPTION_UNMET"));
});

test("unsupported subjects and invalid marks fail closed", () => {
  assert.throws(() => buildPathwayResults({
    stage: "GRADE_12",
    subjects: [{ subject: "Made-up subject", mark: "90" }]
  }, catalogue), /Unsupported subject/);

  assert.throws(() => buildPathwayResults({
    stage: "GRADE_12",
    subjects: [{ subject: "Mathematics", mark: "90.5" }]
  }, catalogue), /whole numbers/);
});

test("empty or malformed catalogue is rejected", () => {
  assert.throws(() => buildPathwayResults({ stage: "GRADE_12", subjects: [] }, null), /catalogue/);
});

test("definitive screening still requires the strict publication gate", () => {
  const unverified = structuredClone(catalogue);
  unverified.status = "APPROVED_FOR_DEFINITIVE_SCREENING";
  const results = buildPathwayResults({ stage: "MATRIC_GRADUATE", subjects: strongMarks }, unverified);

  assert.ok(results.every(item => item.state === "UNKNOWN"));
  assert.ok(results.every(item => item.reasonCodes.includes("CATALOGUE_PUBLICATION_GATE_FAILED")));
});

test("wrong admission cycle remains UNKNOWN in demo mode", () => {
  const wrongCycle = { ...structuredClone(catalogue), admissionCycle: "2028" };
  const results = buildPathwayResults({ stage: "MATRIC_GRADUATE", subjects: strongMarks }, wrongCycle);
  assert.ok(results.every(item => item.state === "UNKNOWN"));
  assert.ok(results.every(item => item.reasonCodes.includes("ADMISSION_CYCLE_UNVERIFIED")));
});

test("requirement evidence exposes recorded rules, learner comparisons, provenance and unresolved uncertainty", () => {
  const results = buildPathwayResults({ stage: "MATRIC_GRADUATE", subjects: strongMarks }, catalogue);
  const informationTechnology = results.find(item => item.id === "UJ-2027-BSC-IT");

  assert.ok(Array.isArray(informationTechnology.requirementEvidence));
  const english = informationTechnology.requirementEvidence.find(row => row.id === "english");
  assert.equal(english.rule, "60% / Level 5");
  assert.match(english.learnerValue, /90%/);
  assert.equal(english.status, "MET");
  assert.ok(english.sourceLinks.some(source => source.url.startsWith("https://www.uj.ac.za/")));
  assert.ok(informationTechnology.requirementEvidence.some(row => row.status === "UNKNOWN" && /unresolved|assumption|conditions/i.test(row.explanation)));
  assert.match(informationTechnology.limitation, /does not guarantee admission/i);
});

test("incomplete transcripts do not turn an absent required subject into a rejection", () => {
  const results = buildPathwayResults({
    stage: "GRADE_12",
    subjects: [
      { subject: "English Home Language", mark: "75" },
      { subject: "Mathematics", mark: "75" }
    ]
  }, catalogue);
  const informationTechnology = results.find(item => item.id === "UJ-2027-BSC-IT");
  assert.equal(informationTechnology.state, "UNKNOWN");
  assert.ok(informationTechnology.reasonCodes.includes("REQUIRED_INPUT_MISSING"));
  const sciences = informationTechnology.requirementEvidence.find(row => row.label === "Physical Sciences");
  assert.equal(sciences.status, "UNKNOWN");
  assert.match(sciences.explanation, /transcript is incomplete/i);
});
