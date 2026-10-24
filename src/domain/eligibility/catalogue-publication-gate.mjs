const ISO_DATE = /^\\d{4}-\\d{2}-\\d{2}$/;
const APPROVED_CATALOGUE_STATUS = "APPROVED_FOR_DEFINITIVE_SCREENING";
const APPROVED_SOURCE_STATUS = "VERIFIED_AND_APPROVED";

const isNonEmpty = value => typeof value === "string" && value.trim().length > 0;
const isDate = value => {
  if (!ISO_DATE.test(value ?? "")) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === value;
};

/**
 * Validates whether a catalogue can be used for definitive eligibility screening.
 * This is deliberately stricter than checking whether a source URL exists.
 * It does not approve data or verify source contents; a named human curator must
 * complete and record that work before the catalogue can pass this gate.
 */
export function validateCatalogueForPublication(catalogue) {
  const issues = [];
  const add = (code, path, message) => issues.push({ code, path, message });

  if (!catalogue || typeof catalogue !== "object" || Array.isArray(catalogue)) {
    return { publishable: false, issues: [{ code: "CATALOGUE_INVALID", path: "$", message: "Catalogue must be an object." }] };
  }

  if (catalogue.status !== APPROVED_CATALOGUE_STATUS) {
    add("CATALOGUE_NOT_APPROVED", "status", "Catalogue is not explicitly approved for definitive screening.");
  }
  if (!isNonEmpty(catalogue.catalogueVersion)) add("CATALOGUE_VERSION_MISSING", "catalogueVersion", "Catalogue version is required.");
  if (!isNonEmpty(catalogue.institution)) add("INSTITUTION_MISSING", "institution", "Institution is required.");
  if (!isNonEmpty(catalogue.admissionCycle)) add("ADMISSION_CYCLE_MISSING", "admissionCycle", "Admission cycle is required.");

  const policy = catalogue.sourcePolicy;
  if (!policy || typeof policy !== "object") {
    add("SOURCE_POLICY_MISSING", "sourcePolicy", "Source policy is required.");
  } else if (policy.governingSourceVersionStatus !== APPROVED_SOURCE_STATUS) {
    add("SOURCE_VERSION_NOT_APPROVED", "sourcePolicy.governingSourceVersionStatus", "Governing source version has not been explicitly verified and approved.");
  }

  const sources = Array.isArray(catalogue.sources) ? catalogue.sources : [];
  if (!sources.length) add("SOURCES_MISSING", "sources", "At least one official source is required.");

  const sourceById = new Map();
  for (const [index, source] of sources.entries()) {
    const path = `sources[${index}]`;
    if (!isNonEmpty(source?.id)) add("SOURCE_ID_MISSING", `${path}.id`, "Source ID is required.");
    else if (sourceById.has(source.id)) add("SOURCE_ID_DUPLICATE", `${path}.id`, "Source IDs must be unique.");
    else sourceById.set(source.id, source);

    if (!isNonEmpty(source?.url) || !source.url.startsWith("https://www.uj.ac.za/")) {
      add("SOURCE_URL_INVALID", `${path}.url`, "A cycle-relevant official UJ HTTPS URL is required.");
    }
    if (!isNonEmpty(source?.sourceVersion)) add("SOURCE_VERSION_MISSING", `${path}.sourceVersion`, "Source version must be recorded.");
    if (!isDate(source?.verificationDate)) add("SOURCE_VERIFICATION_DATE_INVALID", `${path}.verificationDate`, "A valid source verification date is required.");
    if (!isNonEmpty(source?.localEvidence?.sha256) || !/^[a-f0-9]{64}$/i.test(source.localEvidence.sha256)) {
      add("SOURCE_CHECKSUM_MISSING", `${path}.localEvidence.sha256`, "A SHA-256 checksum for the inspected source is required.");
    }
    if (source?.localEvidence?.inspectedLocally !== true) {
      add("SOURCE_INSPECTION_UNCONFIRMED", `${path}.localEvidence.inspectedLocally`, "Inspection of the retained source must be explicitly recorded.");
    }
    if (isNonEmpty(source?.limitation)) {
      add("SOURCE_LIMITATION_OPEN", `${path}.limitation`, "Outstanding source limitations must be resolved before publication.");
    }
  }

  const programmes = Array.isArray(catalogue.programmes) ? catalogue.programmes : [];
  if (!programmes.length) add("PROGRAMMES_MISSING", "programmes", "At least one programme record is required.");

  const seenProgrammeIds = new Set();
  for (const [index, programme] of programmes.entries()) {
    const path = `programmes[${index}]`;
    if (!isNonEmpty(programme?.id)) add("PROGRAMME_ID_MISSING", `${path}.id`, "Programme ID is required.");
    else if (seenProgrammeIds.has(programme.id)) add("PROGRAMME_ID_DUPLICATE", `${path}.id`, "Programme IDs must be unique.");
    else seenProgrammeIds.add(programme.id);

    if (programme?.status !== "APPROVED") add("PROGRAMME_NOT_APPROVED", `${path}.status`, "Programme record is not approved.");
    const signoff = programme?.curatorSignoff;
    if (!signoff || !isNonEmpty(signoff.curatorName) || !isDate(signoff.signedAt) ||
        !isNonEmpty(signoff.scope) || !isNonEmpty(signoff.evidenceReference)) {
      add("CURATOR_SIGNOFF_INVALID", `${path}.curatorSignoff`, "Named curator, date, scope and evidence reference are required; do not invent or infer sign-off.");
    }

    if (!Array.isArray(programme?.unresolved) || programme.unresolved.length > 0) {
      add("PROGRAMME_RULES_UNRESOLVED", `${path}.unresolved`, "Missing or unresolved programme rules prevent definitive screening.");
    }
    if (!isNonEmpty(programme?.code)) add("PROGRAMME_CODE_MISSING", `${path}.code`, "Official programme code is required.");
    if (!isNonEmpty(programme?.name)) add("PROGRAMME_NAME_MISSING", `${path}.name`, "Programme name is required.");

    const evidence = Array.isArray(programme?.sourceEvidence) ? programme.sourceEvidence : [];
    if (!evidence.length) add("PROGRAMME_EVIDENCE_MISSING", `${path}.sourceEvidence`, "At least one exact source reference is required.");
    for (const [evidenceIndex, item] of evidence.entries()) {
      const evidencePath = `${path}.sourceEvidence[${evidenceIndex}]`;
      if (!sourceById.has(item?.sourceId)) {
        add("PROGRAMME_SOURCE_UNKNOWN", `${evidencePath}.sourceId`, "Evidence must reference a declared source.");
      }
      if (!isNonEmpty(item?.location) || !/printed\\s+p(?:age)?\\.?\\s*\\d+/i.test(item.location)) {
        add("SOURCE_LOCATION_INVALID", `${evidencePath}.location`, "Exact printed page location is required; generic or unresolved page references fail closed.");
      }
    }
  }

  return { publishable: issues.length === 0, issues };
}
