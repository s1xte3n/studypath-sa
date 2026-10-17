import { createServer } from "node:http";

const ROUTES = new Map([
  ["/api/v1/programmes", "programmes"],
  ["/api/v1/funding-opportunities", "fundingOpportunities"],
]);
const ID_PATTERN = /^[A-Z0-9][A-Z0-9._-]{0,99}$/;
const UTC_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validSource(source) {
  return source && hasText(source.sourceId) && hasText(source.sourceName)
    && hasText(source.publisher) && typeof source.sourceUrl === "string"
    && source.sourceUrl.startsWith("https://") && UTC_PATTERN.test(source.verifiedAt ?? "")
    && hasText(source.applicableCycle);
}

function publicationReady(record, kind) {
  if (!record || !ID_PATTERN.test(record.id ?? "")
    || record.publicationStatus !== "PUBLISHED" || record.curatorApproved !== true
    || !hasText(record.applicableCycle) || !UTC_PATTERN.test(record.verifiedAt ?? "")
    || !hasText(record.catalogueVersion) || !Array.isArray(record.sources)
    || record.sources.length === 0 || !record.sources.every(validSource)) return false;

  if (kind === "programmes") {
    return hasText(record.title) && record.institution && hasText(record.institution.id)
      && hasText(record.institution.name) && hasText(record.qualificationType)
      && Array.isArray(record.studyModes) && Array.isArray(record.requirements)
      && Array.isArray(record.relationships) && Array.isArray(record.limitations);
  }

  return hasText(record.name) && hasText(record.provider)
    && hasText(record.deadlineText) && Array.isArray(record.requirements)
    && Array.isArray(record.requiredDocuments) && Array.isArray(record.limitations);
}

function parseAccept(header) {
  if (header === undefined || header.trim() === "") return { accepted: true };
  const entries = header.split(",");
  if (entries.some((entry) => entry.trim() === "")) return { malformed: true };

  for (const entry of entries) {
    const [mediaRaw, ...params] = entry.trim().split(";");
    const media = mediaRaw.trim().toLowerCase();
    if (!/^(\*|[!#$%&'*+.^_`|~0-9a-z-]+)\/(\*|[!#$%&'*+.^_`|~0-9a-z-]+)$/.test(media)) {
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
    const id = requestId();
    let url;
    try {
      url = new URL(req.url ?? "/", "http://127.0.0.1");
    } catch {
      errorResponse(res, 400, "INVALID_QUERY_PARAMETER", "The request URL is invalid.", id);
      return;
    }

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
  };
}

export function createLocalCatalogueServer(options = {}) {
  return createServer(createLocalCatalogueHandler(options));
}
