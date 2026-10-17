import { createServer } from "node:http";

const ROUTES = new Map([
  ["/api/v1/programmes", "programmes"],
  ["/api/v1/funding-opportunities", "fundingOpportunities"],
]);
const ID_PATTERN = /^[A-Z0-9][A-Z0-9._-]{0,99}$/;
const QUALIFICATION_TYPES = new Set(["DEGREE", "DIPLOMA", "HIGHER_CERTIFICATE", "TVET", "OTHER"]);
const STUDY_MODES = new Set(["ON_CAMPUS", "ONLINE", "DISTANCE", "HYBRID", "UNKNOWN"]);
const INSTITUTION_TYPES = new Set(["UNIVERSITY", "TVET_COLLEGE", "OTHER"]);
const PROVINCES = new Set([
  "EASTERN_CAPE", "FREE_STATE", "GAUTENG", "KWAZULU_NATAL", "LIMPOPO",
  "MPUMALANGA", "NORTHERN_CAPE", "NORTH_WEST", "WESTERN_CAPE", "UNKNOWN",
]);
const REQUIREMENT_TYPES = new Set([
  "SUBJECT_MARK", "APS", "LANGUAGE", "QUALIFICATION", "RESIDENCY",
  "FINANCIAL", "DOCUMENT", "OTHER",
]);
const REQUIREMENT_OPERATORS = new Set([
  "GTE", "GT", "LTE", "LT", "EQ", "IN", "ALL_OF", "ANY_OF", "CONDITIONAL",
]);
const RELATIONSHIP_TYPES = new Set(["PROGRESSION", "ALTERNATIVE", "RELATED_FIELD", "ARTICULATION"]);
const UTC_PATTERN = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,9})?Z$/;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasText(value, maxLength = 300) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= maxLength;
}

function validId(value) {
  return typeof value === "string" && ID_PATTERN.test(value);
}

function validISODate(value) {
  if (typeof value !== "string") return false;
  const match = DATE_PATTERN.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const monthDays = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= monthDays[month - 1];
}

function validUtcTimestamp(value) {
  if (typeof value !== "string") return false;
  const match = UTC_PATTERN.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const datePart = match[1] + "-" + match[2] + "-" + match[3];
  return validISODate(datePart) && year >= 1 && hour <= 23 && minute <= 59 && second <= 59;
}

function validHttpsUrl(value, nullable = false) {
  if (nullable && value === null) return true;
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.length > 0
      && url.username === "" && url.password === "";
  } catch {
    return false;
  }
}

function validSource(source) {
  return isObject(source)
    && validId(source.sourceId)
    && hasText(source.sourceName)
    && hasText(source.publisher)
    && validHttpsUrl(source.sourceUrl)
    && validUtcTimestamp(source.verifiedAt)
    && hasText(source.applicableCycle, 40)
    && (source.sourceSection === null || hasText(source.sourceSection))
    && (source.evidenceNote === null || hasText(source.evidenceNote, 2000))
    && Object.hasOwn(source, "sourceSection")
    && Object.hasOwn(source, "evidenceNote");
}

function validRequirement(rule, sourceIds) {
  return isObject(rule)
    && validId(rule.ruleId)
    && REQUIREMENT_TYPES.has(rule.requirementType)
    && REQUIREMENT_OPERATORS.has(rule.operator)
    && (rule.subjectId === null || validId(rule.subjectId))
    && (rule.threshold === null || (typeof rule.threshold === "number" && Number.isFinite(rule.threshold)))
    && (rule.acceptedValues === null || (Array.isArray(rule.acceptedValues)
      && rule.acceptedValues.every((value) => typeof value === "string"
        || (typeof value === "number" && Number.isFinite(value))))
    && (rule.conditionRuleId === null || validId(rule.conditionRuleId))
    && typeof rule.mandatory === "boolean"
    && hasText(rule.description, 500)
    && Array.isArray(rule.sourceIds)
    && rule.sourceIds.length > 0
    && rule.sourceIds.every((sourceId) => validId(sourceId) && sourceIds.has(sourceId))
    && ["VERIFIED", "UNKNOWN"].includes(rule.verificationState);
}

function validRelationship(relationship, sourceIds) {
  return isObject(relationship)
    && validId(relationship.id)
    && validId(relationship.fromProgrammeId)
    && validId(relationship.toProgrammeId)
    && RELATIONSHIP_TYPES.has(relationship.type)
    && hasText(relationship.rationale, 500)
    && relationship.evidenceStatus === "VERIFIED"
    && Array.isArray(relationship.sourceIds)
    && relationship.sourceIds.length > 0
    && relationship.sourceIds.every((sourceId) => validId(sourceId) && sourceIds.has(sourceId))
    && hasText(relationship.applicableCycle, 40)
    && validUtcTimestamp(relationship.verifiedAt)
    && validISODate(relationship.reviewBy)
    && relationship.curatorApproved === true
    && hasText(relationship.caveat, 500);
}

function validCommonRecord(record) {
  if (!isObject(record) || !validId(record.id)
    || record.publicationStatus !== "PUBLISHED" || record.curatorApproved !== true
    || !hasText(record.applicableCycle, 40)
    || !validUtcTimestamp(record.verifiedAt)
    || !hasText(record.catalogueVersion, 100)
    || !Array.isArray(record.sources) || record.sources.length === 0
    || !record.sources.every(validSource)) return null;
  return new Set(record.sources.map((source) => source.sourceId));
}

function publicationReady(record, kind) {
  const sourceIds = validCommonRecord(record);
  if (!sourceIds) return false;

  if (kind === "programmes") {
    const institution = record.institution;
    if (!isObject(institution)
      || !validId(institution.id)
      || !hasText(institution.name)
      || !INSTITUTION_TYPES.has(institution.institutionType)
      || !PROVINCES.has(institution.province)
      || !validHttpsUrl(institution.websiteUrl, true)
      || !hasText(record.title)
      || !QUALIFICATION_TYPES.has(record.qualificationType)
      || !Array.isArray(record.studyModes)
      || !record.studyModes.every((mode) => STUDY_MODES.has(mode))
      || !(record.nqfLevel === null || (Number.isInteger(record.nqfLevel) && record.nqfLevel > 0))
      || !(record.durationYears === null || (typeof record.durationYears === "number"
        && Number.isFinite(record.durationYears) && record.durationYears > 0))
      || !(record.locationText === null || typeof record.locationText === "string")
      || !Array.isArray(record.requirements)
      || !record.requirements.every((rule) => validRequirement(rule, sourceIds))
      || !Array.isArray(record.relationships)
      || !record.relationships.every((relationship) => validRelationship(relationship, sourceIds))
      || !Array.isArray(record.limitations)
      || !record.limitations.every((limitation) => typeof limitation === "string" && limitation.length <= 500)) {
      return false;
    }
    return true;
  }

  return hasText(record.name)
    && hasText(record.provider)
    && (record.description === null || (typeof record.description === "string" && record.description.length <= 2000))
    && validHttpsUrl(record.officialWebsiteUrl, true)
    && validHttpsUrl(record.applicationUrl, true)
    && hasText(record.deadlineText)
    && (record.deadlineAt === null || validUtcTimestamp(record.deadlineAt))
    && (record.deadlineTimezone === null || (typeof record.deadlineTimezone === "string" && record.deadlineTimezone.length <= 100))
    && Array.isArray(record.requirements)
    && record.requirements.every((rule) => validRequirement(rule, sourceIds))
    && Array.isArray(record.requiredDocuments)
    && record.requiredDocuments.every((document) => hasText(document, 120))
    && (record.publishedAmountText === null
      || (typeof record.publishedAmountText === "string" && record.publishedAmountText.length <= 300))
    && Array.isArray(record.limitations)
    && record.limitations.every((limitation) => typeof limitation === "string" && limitation.length <= 500);
}

function parseAccept(header) {
  if (header === undefined || header.trim() === "") return { accepted: true };
  const entries = header.split(",");
  if (entries.some((entry) => entry.trim() === "")) return { malformed: true };

  for (const entry of entries) {
    const [mediaRaw, ...params] = entry.trim().split(";");
    const media = mediaRaw.trim().toLowerCase();
    if (!/^(\*|[!#$%&'*+.^_\`|~0-9a-z-]+)\/(\*|[!#$%&'*+.^_\`|~0-9a-z-]+)$/.test(media)) {
      return { malformed: true };
    }
    let quality = 1;
    for (const param of params) {
      const match = /^\s*q\s*=\s*(.*?)\s*$/i.exec(param);
      if (match) {
        if (!/^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(match[1])) return { malformed: true };
        quality = Number(match[1]);
      }
    }
    const permitsJson = media === "application/json" || media === "application/*" || media === "*/*";
    if (permitsJson && quality > 0) return { accepted: true };
  }
  return { accepted: false };
}

function writeJson(res, statusCode, body, extraHeaders = {}) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    ...extraHeaders,
  });
  res.end(JSON.stringify(body));
}

function errorResponse(res, statusCode, code, message, requestId, extraHeaders = {}) {
  writeJson(res, statusCode, { error: { code, message, requestId } }, extraHeaders);
}

/**
 * Local-only API contract harness. Uses injected synthetic data and has no
 * network client, persistence, cloud bindings, authentication, or rate limiter.
 * It is not a production/deployment handler.
 */
export function createLocalCatalogueHandler({
  programmes = [],
  fundingOpportunities = [],
  catalogueVersion = "synthetic-2026-10-17.1",
  now = () => new Date(),
  requestId = () => "local-request-id",
} = {}) {
  const catalogues = { programmes, fundingOpportunities };

  return function localCatalogueHandler(req, res) {
    let id = "local-request-id";
    try {
      id = requestId();
      const url = new URL(req.url ?? "/", "http://127.0.0.1");
      const kind = ROUTES.get(url.pathname);
      if (!kind) {
        errorResponse(res, 404, "NOT_FOUND", "The requested route was not found.", id);
        return;
      }

      if (req.method !== "GET") {
        errorResponse(res, 405, "METHOD_NOT_ALLOWED", "This route only supports GET.", id, { Allow: "GET" });
        return;
      }

      if (url.searchParams.size > 0) {
        errorResponse(res, 400, "INVALID_QUERY_PARAMETER", "The request contains an unsupported query parameter.", id);
        return;
      }

      const accept = parseAccept(req.headers.accept);
      if (accept.malformed) {
        errorResponse(res, 400, "INVALID_ACCEPT_HEADER", "The Accept header is malformed.", id);
        return;
      }
      if (!accept.accepted) {
        errorResponse(res, 406, "NOT_ACCEPTABLE", "The server can only provide JSON for this resource.", id);
        return;
      }

      const contentLength = Number(req.headers["content-length"] ?? 0);
      if (contentLength > 0 || req.headers["transfer-encoding"] !== undefined) {
        errorResponse(res, 400, "INVALID_REQUEST_BODY", "GET requests must not contain a body.", id);
        req.resume();
        return;
      }

      const items = catalogues[kind]
        .filter((record) => publicationReady(record, kind))
        .slice()
        .sort((a, b) => a.id.localeCompare(b.id));

      writeJson(res, 200, {
        contractVersion: "1.0.0-draft",
        catalogueVersion,
        generatedAt: now().toISOString(),
        items,
      });
    } catch {
      if (!res.headersSent) {
        errorResponse(res, 500, "INTERNAL_ERROR", "An unexpected server error occurred.", id);
      } else {
        res.destroy();
      }
    }
  };
}

export function createLocalCatalogueServer(options = {}) {
  return createServer(createLocalCatalogueHandler(options));
}
