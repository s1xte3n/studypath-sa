# StudyPath SA — API Examples

**Contract version:** 1.0.0-draft. Values below are illustrative schema examples only, not verified StudyPath SA catalogue records. Do not publish sample values as actual admissions/funding information.

## 1. List programmes

Request:
```http
GET /api/v1/programmes HTTP/1.1
Accept: application/json
```

Illustrative response:
```json
{
  "contractVersion": "1.0.0-draft",
  "catalogueVersion": "example-version",
  "generatedAt": "2026-10-16T12:00:00Z",
  "items": []
}
```

An empty array means no currently published/approved records are available. It must not be filled with invented data. A production pilot is expected to publish 6–8 programme records only after source, cycle, full rule, freshness and curator-sign-off checks pass.

## 2. List funding opportunities

Request:
```http
GET /api/v1/funding-opportunities HTTP/1.1
Accept: application/json
```

Illustrative response:
```json
{
  "contractVersion": "1.0.0-draft",
  "catalogueVersion": "example-version",
  "generatedAt": "2026-10-16T12:00:00Z",
  "items": []
}
```

Funding feature is not ready for publication until 3–5 current official-source records are reviewed.

## 3. Unsupported query parameter

Request:
```http
GET /api/v1/programmes?page=1 HTTP/1.1
Accept: application/json
```

Response: `400 Bad Request`
```json
{
  "error": {
    "code": "INVALID_QUERY_PARAMETER",
    "message": "The request contains an unsupported query parameter.",
    "requestId": "req-opaque-id"
  }
}
```

## 4. Catalogue unavailable

Response: `503 Service Unavailable`
```json
{
  "error": {
    "code": "CATALOGUE_UNAVAILABLE",
    "message": "The catalogue is temporarily unavailable. Try again later.",
    "requestId": "req-opaque-id"
  }
}
```

Do not substitute an empty 200 response or fabricated fallback catalogue during an outage.

## 5. Local matching input (not an HTTP request)

```json
{
  "stage": "GRADE_12",
  "subjects": [
    {"subjectId": "MATHEMATICS", "mark": 75},
    {"subjectId": "ENGLISH_HOME_LANGUAGE", "mark": 68}
  ],
  "interests": ["SOFTWARE_DEVELOPMENT"],
  "province": "GAUTENG",
  "studyModes": ["ON_CAMPUS"]
}
```

This object stays in browser memory and must not be transmitted, logged, persisted, or encoded in the URL. Example subject IDs are illustrative and must match the separately approved subject catalogue.

## 6. Local matching result (not an HTTP response)

```json
{
  "programmeId": "UJ-2027-BSC-IT",
  "status": "UNKNOWN",
  "reasons": [
    "The complete applicable APS calculation rule has not been verified."
  ],
  "sources": [],
  "limitations": [
    "Screening information only; the institution makes the admission decision."
  ]
}
```

## 7. Local tracker entry (not persisted or sent to an API)

```json
{
  "id": "local-opaque-id",
  "targetType": "PROGRAMME",
  "targetId": "UJ-2027-BSC-IT",
  "status": "DRAFT",
  "deadline": null,
  "requiredDocuments": [],
  "notes": null,
  "createdAt": "2026-10-16T12:00:00Z",
  "updatedAt": "2026-10-16T12:00:00Z",
  "statusIsLearnerReported": true
}
```

## 8. Compatibility test expectations

Consumers should assert exact status, content type, required envelope fields, field types, enum membership, stable ID ordering, source provenance and correct empty/error distinction. A 2xx response alone is not contract success.
