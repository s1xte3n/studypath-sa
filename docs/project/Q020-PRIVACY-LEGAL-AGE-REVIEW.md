# Q-020 South African Privacy, Legal and Age-Appropriate Review

**Status:** REVIEW PACK PREPARED — qualified review and sign-off NOT COMPLETE.
**Use boundary:** Synthetic data only. Real learner data remains prohibited until the applicable review and runtime gates are evidenced.
**Date:** 2026-10-15

## 1. Purpose and limits

This pack organizes the review required before processing real Grade 11–12 learner data. It is not legal advice, a legal opinion, or evidence of POPIA compliance. A qualified South African privacy/legal reviewer must assess the actual product, responsible-party/operator roles, data flows, identity provider, hosting, notice, consent, retention, deletion and incident arrangements and record a decision.

## 2. Proposed data inventory for review

| Data class | Minimum proposed data | Purpose | Proposed handling |
|---|---|---|---|
| Account reference | Identity-provider issuer + immutable subject; opaque internal key only if necessary | Link authorized saved records | No email as ownership key; no national ID |
| Academic profile | Study stage; canonical subject IDs; integer marks; optional controlled interest IDs, province and study-mode preference | Deterministic matching | Persist only after separate explicit opt-in |
| Consent evidence | Purpose/notice version, affirmative timestamp, withdrawal state/time | Record the learner's choice | No profile values in consent events |
| Saved pathways/funding | Stable catalogue IDs and timestamps | Save/revisit selected items | Account-scoped; no copied catalogue descriptions |
| Matching request/result | Approved minimal fields and deterministic response | Request-scoped matching | No match-history persistence by default |
| Operational logs | Event type, timestamp, opaque correlation ID, outcome and service version | Reliability/security | Allowlisted fields; no marks, interests, payloads, tokens or match output |
| Application tracker | User-entered tracker items | Current-page manual tracking | Browser memory only; no API, local storage, session storage, cookies or account sync |

Unknown fields are out of scope unless separately approved with a purpose, retention rule and test. Do not collect national ID, date of birth, address, phone number, household income, bank details, financial documents, free-text notes or report-card uploads in this MVP.

## 3. Legal and age questions for reviewer

The reviewer must record answers, rationale, sources and any conditions for each item:

1. Identify the responsible party and any operators; determine required operator agreements and cross-border processing disclosures.
2. Confirm which information qualifies as personal information in this product, including marks and account-linked preferences.
3. Determine the lawful basis and purpose limitation for each processing operation, including transient authenticated matching, saved IDs, consent evidence and security logs.
4. Assess POPIA sections 34–35 for learners who are children; determine applicable definitions, authorizations, competent-person consent requirements and whether the product should exclude under-age users until an appropriate flow is approved.
5. Assess whether consent for optional profile persistence is sufficiently separate, informed, specific, age-appropriate, unbundled, revocable and demonstrable.
6. Review privacy notice content, timing, plain language, accessibility and disclosures about identity, hosting, storage, retention, deletion and support contacts.
7. Determine data-subject rights and operational processes for access, correction, objection, deletion, complaints and any applicable exceptions.
8. Review retention periods for profiles, consent evidence, account references, saved items, security logs, backups and deletion proof; document why each period is necessary and lawful.
9. Review account deletion and withdrawal semantics, including queued work, caches, replicas, provider copies, backup restoration and legal holds.
10. Review security safeguards, breach response, incident notification responsibilities/timelines and a private contact route.
11. Review hosting/service regions, international transfers, sub-processors, terms, telemetry defaults and access controls.
12. Decide whether an independent reviewer, guardian/competent-person flow, age gate or a temporary no-account/no-real-data restriction is required for the hackathon demo.

## 4. Existing engineering proposals for review — not commitments

- Separate, unchecked opt-in before profile persistence; login alone is not consent.
- No persisted match history/result snapshots by default.
- Withdrawal immediately blocks future profile writes and use of the persisted profile for personalization.
- Active profile deletion target: 30 days after withdrawal.
- Active account-linked data deletion target: 30 days after account deletion.
- Backup expiry target: 35 days maximum, with deletion tombstones reapplied before restored data becomes available.
- Routine logs target: 30 days or shorter, with no profile payloads.
- Saved programme/funding IDs retained until removal/account deletion.
- Minimal consent/deletion evidence retained for a period selected after review.
- Tracker remains page-memory-only.

Targets must be changed if legal advice, provider behavior or cost evidence requires it. They must not be shown to learners as guarantees until implemented and verified.

## 5. Required reviewer deliverable

The reviewer should return a signed/dated note containing:
- reviewer role/qualification and scope;
- reviewed artifacts and service providers;
- applicable legal requirements and sources;
- decisions for questions 1–12 above;
- approved notice/consent wording or required revisions;
- approved retention/deletion schedule and any exceptions;
- unresolved risks, mitigations, owner and due date;
- explicit disposition: APPROVED, APPROVED WITH CONDITIONS, or NOT APPROVED for the proposed processing;
- explicit statement on whether real learner data may be used and under which controls.

No real learner data may be introduced until this deliverable is recorded and the technical privacy/security controls are verified.

## 6. Source

- South African Government, *Protection of Personal Information Act 4 of 2013*, Part C, sections 34–35 (children's personal information): https://www.justice.gov.za/legislation/acts/2013-004.pdf

The Act's text is a starting point, not a substitute for an applicability analysis or legal advice.
