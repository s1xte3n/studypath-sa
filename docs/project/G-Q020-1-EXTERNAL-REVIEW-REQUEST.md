# G-Q020-1 — External Privacy, Legal and Minors Review Request

**Gate status:** BLOCKED — no qualified independent review is evidenced.
**Prepared:** 2026-10-15
**Purpose:** Give a qualified South African privacy/legal reviewer a bounded, evidence-led review request. This document is not legal advice, a compliance certificate, or a substitute for the review.

## Review request

Please review the actual proposed StudyPath SA product and data lifecycle before any real learner information is collected or persisted. The intended users include Grade 11–12 learners and recent matric graduates; some may be children for purposes of applicable law.

Please review these repository artifacts and their linked sources:
- `docs/project/Q020-PRIVACY-LEGAL-AGE-REVIEW.md` — data inventory, legal questions and engineering proposals.
- `docs/project/Q020-OWNER-DECISIONS-A-E.md` — owner-approved constraints and proposed lifecycle decisions.
- `docs/project/Q020-ARCHITECTURE-THREAT-MODEL.md` — proposed architecture and threat model; not evidence of implementation.
- `docs/project/Q020-NEXT-GATE-EVIDENCE-CLOSURE.md` — prerequisite gates and stop conditions.
- The approved PRD, acceptance criteria and any current privacy notice/consent text, once identified.
- Applicable provider terms, hosting/data-region facts, telemetry/logging settings and actual data-flow diagrams when available.

The current repository evidence does **not** establish a complete runnable application, configured identity provider, deployed services, verified telemetry behavior, or implemented deletion controls. Please treat architecture descriptions as proposals unless independently evidenced.

## Scope for a written opinion

Please document the legal basis and rationale, source authorities and any limitations for each item below.

1. **Roles and processing map:** Identify the responsible party and any operators; purposes and data categories; recipients/sub-processors; storage and processing locations; cross-border transfers; operator agreements and disclosures.
2. **Children/minors:** Apply POPIA and other relevant South African law to the intended age range, including the definition of a child, sections 34–35 and any applicable authorization/competent-person consent requirements. State whether an age gate, exclusion, guardian/competent-person process or other controls are necessary.
3. **Lawful basis and minimisation:** Assess each data element and operation, including marks, subject choices, interests, province/study-mode preferences, account references, saved pathway IDs, consent evidence and security logs. Challenge any field without a documented necessity.
4. **Consent and notice:** Review separate optional profile-persistence opt-in; login versus consent distinction; notice timing, purposes, recipients, retention, rights, contact details, withdrawal and age-appropriate/plain-language accessibility. Approve or redline actual proposed wording.
5. **Rights and lifecycle:** Assess access, correction, objection, deletion, withdrawal, account closure, backups, caches, replicas, queued jobs, provider-held data, restored backups and any legal holds. State what can and cannot be promised.
6. **Retention:** Review the proposed 30-day active deletion targets, 35-day maximum backup expiry target, routine logs of 30 days or less, saved-item retention, and minimal consent/deletion evidence. These are engineering proposals, not legal requirements or implemented guarantees.
7. **Security and incidents:** Review proposed access restrictions, ownership isolation, data minimisation in logs/telemetry, incident handling, breach notification responsibilities and escalation/contact route.
8. **Demo boundary:** Decide what may be shown publicly and whether the demo must remain entirely synthetic and anonymous until specified conditions are met.
9. **Required changes:** List mandatory and recommended changes, each with severity, owner, due date and evidence required to close it.
10. **Disposition:** Explicitly state whether the proposed processing is not approved, approved with conditions, or approved within a defined scope. State separately whether real learner data may be used now, and if not, exactly what must happen first.

## Evidence limitations to consider

- No real learner data is authorized for development or testing.
- The application tracker is intended to remain page-memory-only and must not be sent to an API or persisted.
- Anonymous learner inputs/results are intended to remain in page memory, without URLs, analytics, logs, telemetry or persistence.
- Authenticated profile persistence, if later retained in scope, requires separate explicit opt-in; login alone is not consent.
- The identity provider is a candidate, not tenant-configured or independently verified.
- No all-in service-cost forecast has proven compliance with the R100/month cap.
- Proposed retention values are internal targets only.
- The technical controls and runtime behavior have not been established by contract-test CI.

If these limits prevent a meaningful final opinion, please issue a scoped preliminary review and identify the concrete artifacts or evidence required for the final review. Do not infer implementation from a design document.

## Reviewer response template

Copy and complete the following in a signed report or in the section below. Avoid putting confidential client data or secrets in the public repository; store sensitive evidence securely and commit only a redacted outcome.

- Reviewer name:
- Professional role/qualifications and relevant South African privacy/legal experience:
- Organization (if applicable):
- Review date:
- Materials and versions/commit SHAs reviewed:
- Actual product/runtime evidence inspected:
- Legal authorities and guidance considered:
- Conflicts of interest or limitations:
- Findings by scope item (1–10):
- Mandatory conditions and owners:
- Recommended improvements:
- Approved notice/consent wording or attached redacted reference:
- Approved retention/deletion schedule:
- Child/minor access decision:
- Public demo and real-data decision:
- Outstanding evidence and due dates:
- Disposition: `NOT APPROVED` / `APPROVED WITH CONDITIONS` / `APPROVED WITHIN DEFINED SCOPE`
- Real learner data authorized? `NO` / `YES, ONLY WITH THE FOLLOWING CONTROLS:`
- Signature or verifiable approval reference:

## Gate acceptance criteria

G-Q020-1 can be considered closed only when:
- reviewer qualifications/role and scope are recorded;
- a dated, evidence-linked decision addresses every applicable scope item;
- required changes are tracked with owners and objective closure evidence;
- actual notice/consent text is reviewed, or explicitly recorded as not yet available;
- the real-data/demo boundary is unambiguous;
- conditions that require technical implementation remain open until tested;
- the project owner records the disposition without representing this preparation as independent approval.

A qualified review does not itself prove that technical controls work. Any conditions requiring implementation or runtime evidence remain release blockers.

## Starting legal source

- South African Government, *Protection of Personal Information Act 4 of 2013*, particularly Part C, sections 34–35: https://www.justice.gov.za/legislation/acts/2013-004.pdf

The reviewer should verify the current law and all other applicable authorities independently. This link is a starting source, not a complete legal analysis.
