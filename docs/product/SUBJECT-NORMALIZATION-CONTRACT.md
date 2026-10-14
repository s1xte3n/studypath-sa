# StudyPath SA — Subject Normalization Contract (Proposal)

**Status:** Draft proposal for owner/curator approval; not an approved catalogue or implementation contract.  
**Phase:** 2 — Requirements and traceability  
**Related gap:** GAP-002 (P0), REQ-EXP-001, REQ-MAT-001  
**Scope:** Normalization of learner-entered/selectable school-subject labels to stable identifiers used by programme rules.

## 1. Objective and safety invariant

Use stable subject identifiers so learner input and verified programme rules refer to the same subject without silently equating subjects that may have different admission treatment.

**Safety invariant:** if a subject identity, alias, level interpretation, or programme rule is missing or ambiguous, the evaluator must not treat it as a match. Eligibility remains `UNKNOWN` unless a separate, verified mandatory rule proves `NOT_ELIGIBLE`. Subject normalization does not calculate APS and does not establish admission eligibility by itself.

## 2. Proposed data contract

A normalized subject entry should carry:

| Field | Type | Meaning |
|---|---|---|
| `subjectId` | stable string or null | Canonical identifier from the approved subject catalogue; null when unresolved |
| `displayName` | string | Curator-approved canonical display label |
| `inputLabel` | string | Original learner/catalogue label for transparent display and debugging; never send learner values to the catalogue API or telemetry |
| `normalizationStatus` | enum | `CANONICAL`, `APPROVED_ALIAS`, or `UNRESOLVED` |
| `aliasId` | string or null | Approved alias record used, otherwise null |
| `catalogueVersion` | string | Version of the subject dictionary used |
| `sourceRef` | string or null | Provenance for a subject-specific rule/alias when one is required |

The runtime must not accept a client-supplied `subjectId` as authoritative proof of the learner's subject. Resolve it through the approved dictionary and validate it against the current catalogue version.

## 3. Proposed initial canonical identifiers

These identifiers are **proposals**, not approved alias rules. Labels below are kept deliberately distinct.

| Proposed ID | Canonical display name | Alias policy at proposal stage |
|---|---|---|
| `MATHEMATICS` | Mathematics | Exact canonical label only; no abbreviations or inferred equivalents |
| `MATHEMATICAL_LITERACY` | Mathematical Literacy | Exact canonical label only; never map to Mathematics |
| `TECHNICAL_MATHEMATICS` | Technical Mathematics | Exact canonical label only; never map to Mathematics or Mathematical Literacy |
| `TECHNICAL_SCIENCES` | Technical Sciences | Exact canonical label only; do not equate with Physical Sciences or Technical Science without source review |
| `PHYSICAL_SCIENCES` | Physical Sciences | Exact canonical label only |
| `LIFE_SCIENCES` | Life Sciences | Exact canonical label only |
| `ENGLISH` | English | Provisional umbrella is insufficient where an institution distinguishes Home Language vs First Additional Language; use unresolved until language type is captured |
| `LIFE_ORIENTATION` | Life Orientation | Exact canonical label only; do not assume APS inclusion/exclusion |
| `OTHER_UNRESOLVED` | Other / unrecognized subject | Sentinel for UI handling only; never a subject rule key |

Do not publish this list as the final national subject dictionary until the product owner/curator approves the supported scope and checks it against the chosen school-curriculum inputs and the official programme rules. Add further subjects only when needed by a supported, verified catalogue record.

### Language distinction

Where an official rule distinguishes English Home Language from English First Additional Language, the data model must represent that distinction explicitly (for example, separate approved subject IDs or a separate verified language-course-type field). Do not normalize both to a generic `ENGLISH` rule key for eligibility evaluation.

## 4. Normalization algorithm

1. Preserve the supplied label as `inputLabel` for the current page session.
2. Apply only safe lexical cleanup: trim leading/trailing whitespace and collapse repeated internal whitespace. Case-insensitive comparison may be used for exact-label lookup.
3. Match the cleaned label to one canonical display name or an explicitly approved alias record.
4. If exactly one approved mapping exists, return its canonical `subjectId`, mapping status, alias ID if applicable, and dictionary version.
5. If no mapping exists, return `UNRESOLVED` with `subjectId = null`; preserve the original label for a clear UI prompt.
6. If multiple mappings exist, return `UNRESOLVED` and record a catalogue-validation defect. Never pick the first match.
7. Do not use fuzzy matching, semantic similarity, abbreviations, spelling correction, or AI to decide eligibility mappings. A future spelling suggestion may be presented to the learner, but must require explicit learner selection and still resolve to an approved entry.

## 5. Alias register

No aliases are approved by this proposal. Each alias added later must include:

- exact alias string and normalized lookup key;
- target canonical `subjectId`;
- scope (global only if safe, otherwise institution/programme/cycle-specific);
- reason and evidence source;
- reviewer/curator and approval date;
- effective-from/effective-to dates where relevant;
- collision check against all canonical names and existing aliases;
- tests for positive mapping, near-match non-mapping, and ambiguity.

Do not add aliases like `Maths`, `Math Lit`, `Tech Maths`, `English FAL`, or `English HL` until the owner/curator approves their meaning and the necessary language/course-type distinctions. These are examples requiring review, not approved mappings.

## 6. Matching and eligibility behavior

- Compare verified programme rules only against canonical IDs and any rule-specific attributes explicitly represented by the approved contract.
- Subject thresholds (such as achievement level or percentage) are separate from subject identity. Missing or invalid levels must not be silently converted.
- Do not assume a universal APS formula, APS inclusion list, or equivalence between subjects.
- If a programme rule requires an unsupported subject, equivalence, language category, or subject combination, that programme's eligibility is `UNKNOWN`.
- A learner's missing subject is not automatically a failing grade. It is missing information unless a verified rule establishes otherwise.
- `NOT_ELIGIBLE` may be returned only when a verified, current mandatory requirement is demonstrably failed and no verified alternative rule branch is satisfied.
- Normalization does not change ranking; there is no weighted preference score.

## 7. API and privacy boundary

Subject dictionaries and approved programme rules may be delivered as public catalogue data under `/api/v1`. Learner marks and subject selections stay in page memory and must not be sent to the catalogue API, URLs, logs, analytics, or telemetry. This document does not authorize profile persistence or server-side matching.

Unknown subject labels may be shown to the learner with a request to select a supported subject or continue with limited results. Do not transmit the raw label to a server merely to resolve it.

## 8. Acceptance criteria and test traceability

| Test ID | Scenario | Expected result |
|---|---|---|
| T-SUB-001 | Exact canonical label after whitespace cleanup | Resolves to the one approved ID |
| T-SUB-002 | Case variation of an exact canonical label | Resolves only if case-insensitive exact-label lookup is approved |
| T-SUB-003 | Explicit approved alias | Resolves to its recorded target and alias ID |
| T-SUB-004 | Unapproved abbreviation or near match | `UNRESOLVED`; no inferred equivalence |
| T-SUB-005 | Mathematics vs Mathematical Literacy vs Technical Mathematics | Three distinct IDs; no cross-mapping |
| T-SUB-006 | Ambiguous alias collision | `UNRESOLVED`; catalogue validation defect |
| T-SUB-007 | Missing achievement level | No inferred threshold result; affected eligibility is `UNKNOWN` unless another verified rule independently proves failure |
| T-SUB-008 | Programme rule requires unsupported language type or subject equivalence | Eligibility `UNKNOWN` |
| T-SUB-009 | Request inspection | Learner subject labels/marks are absent from catalogue API requests, URL, and telemetry |
| T-SUB-010 | Dictionary version mismatch | Do not trust stale client mapping; refresh public catalogue or return a recoverable unknown state |

These tests are planned, not executed. Before implementation, QA must add them to the approved test strategy and link each to acceptance criteria and implementation. Privacy test T-SUB-009 is a release gate.

## 9. Decisions required to close GAP-002

1. Approve or amend the initial canonical IDs and display labels.
2. Confirm whether learner inputs use a controlled subject picker, free-text input, or picker plus unresolved fallback.
3. Approve the case/whitespace normalization behavior.
4. Approve aliases individually with provenance; no bulk fuzzy aliases.
5. Decide how Home Language vs First Additional Language is represented.
6. Approve dictionary versioning and stale-version behavior.
7. Add final contract and test IDs to the requirements/traceability matrix after approval.

**Gate effect:** This proposal provides a reviewable candidate contract only. GAP-002 remains open until the product owner/curator approves the subject dictionary, alias policy, language distinction, and test contract. `REQUIREMENTS READY` remains blocked by GAP-001, GAP-003, GAP-004, GAP-005 and GAP-008 as well.


## Joint GAP-001/GAP-002 follow-up — 2026-10-14

The more focused v1 controlled-vocabulary proposal is now documented in [SUBJECT-CATALOGUE-V1.md](./SUBJECT-CATALOGUE-V1.md). It proposes a bounded canonical ID set, no aliases in v1, and separate English HL/FAL/Second Additional Language IDs. The UJ rule dependency and unresolved source semantics are captured in [UJ-2027-ROUTE-MODEL.md](./UJ-2027-ROUTE-MODEL.md).

This original document remains a proposal; the new document does not imply approval or implementation. GAP-002 stays open pending owner/curator approval and executed tests.
