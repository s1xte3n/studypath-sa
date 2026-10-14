# StudyPath SA — Pathway Relationship Evidence Contract

**Status:** Draft proposal for GAP-003; not an approved relationship catalogue.  
**Research date:** 2026-10-14.  
**Scope:** UJ 2027 starting-set research only. Do not publish a relationship or use it in matching until its exact evidence and owner/curator approval are recorded.

## 1. Purpose and safety rule

Pathway relationships help learners explore plausible next options without implying guaranteed admission, credit transfer, or formal articulation. Similar titles, shared subject areas, NQF levels, or a generic progression rule are not sufficient evidence for a programme-to-programme relationship.

Every relationship must be stored and reviewed separately from programme eligibility. A relationship must never turn an `UNKNOWN` eligibility result into `ELIGIBLE`, and it must not override a programme's own verified entry requirements.

## 2. Relationship types

| Type | Intended meaning | Minimum evidence required |
|---|---|---|
| `ALTERNATIVE` | A different qualification a learner may consider for a similar broad study goal; not a claim of equivalence or progression | Official source supports the target programme's purpose/field, and a curator records the learner-facing rationale. State that admission is assessed separately. |
| `RELATED_FIELD` | A programme in a related subject/career area, without asserting equivalence or progression | Official programme purpose, curriculum/field description, or faculty source supports the stated relationship; curator-approved rationale. |
| `PROGRESSION` | A plausible next qualification level after completing a prior qualification | Official rule identifies the prior qualification/accepted category and target qualification route, including all relevant marks, experience, credits and selection conditions. Generic NQF progression language alone is insufficient to assert a specific pair. |
| `ARTICULATION` | A formal, officially recognised route with admission/credit/entry implications between named qualifications | Explicit official articulation/credit-transfer agreement, faculty rule, yearbook entry or written institutional confirmation identifying the qualifications and applicable conditions. |

If evidence only supports exploration rather than a formal route, use `ALTERNATIVE` or `RELATED_FIELD` where justified; never downgrade missing articulation evidence into an implied progression claim.

## 3. Required relationship record

Each proposed or approved relationship must include:

- Stable relationship ID.
- Source programme ID and target programme ID, both resolving to catalogue records.
- Relationship type and concise learner-facing rationale.
- Evidence status: `PROPOSED`, `VERIFIED`, `REJECTED`, or `EXPIRED`.
- Exact official source title, URL, relevant section/page, and quoted or faithfully transcribed evidence note.
- Source applicability/cycle, publication or effective date where available, and verification date.
- Explicit conditions, exclusions, credit/experience/mark requirements, and whether formal articulation is actually stated.
- Curator/reviewer identity or role, decision date, and decision note.
- Review-by date or change trigger. Re-check at least every 30 days and sooner after source, cycle, or programme changes.
- Learner-facing caveat where required: the target programme's admission criteria apply separately; the relationship is not an admission or credit-transfer guarantee.

Do not create an approved record with missing source, cycle, rationale, or sign-off fields.

## 4. Preliminary official-source evidence review

The following sources inform the contract but do **not** approve a specific pair of the seven catalogue candidates.

| Source | What it supports | What it does not establish |
|---|---|---|
| [UJ Academic Regulations 2026, section 4.2.10](https://www.uj.ac.za/wp-content/uploads/2021/10/academic-regulations-2026.pdf) | General qualification-progression provisions: an accredited Higher Certificate may meet a statutory minimum for entry to an undergraduate diploma/degree, and an accredited diploma may meet a statutory minimum for an advanced diploma/undergraduate degree. The regulations also say additional programme-specific APS, language, placement-test or other requirements may still apply. | It does not, by itself, establish that any named qualification in this pilot articulates into any other named qualification or satisfies that target's full entry requirements. |
| [UJ undergraduate admissions information](https://www.uj.ac.za/admission-aid/new/) | UJ cautions that not all Short Learning Programmes, Continuing Education Programmes or Non-subsidised Programmes give access to a curricular diploma or degree. It also notes that extended qualifications are earmarked for applicants without previous tertiary studies. | It does not establish a progression link from the Higher Certificate in Information Technology or any other specific CEP/SLP/NSP into a listed degree. |
| [UJ Diploma in Business Information Technology](https://www.uj.ac.za/university-courses/diploma-in-business-information-technology/) | Identifies the diploma's purpose as applying IT and business-management principles; lists the qualification as a three-year NQF level 6 diploma and provides its own entry rules. | It does not itself establish articulation into a named degree or advanced diploma. |
| [UJ Advanced Diploma in Business Information Technology](https://www.uj.ac.za/university-courses/advanced-diploma-in-business-information-technology/) | Lists entry for an appropriate bachelor's degree or a three-year Diploma in Information Technology, plus at least one year of software-development experience and a final-year average of at least 60%. | “Appropriate” is not enough to assume that the Diploma in Business Information Technology is accepted without faculty confirmation. The target is also outside the current undergraduate Grade 11–12 pilot catalogue. |
| [UJ Higher Certificate in Information Technology](https://www.uj.ac.za/university-courses/higher-certificate-in-information-technology/) | Identifies a Higher Certificate in IT as a Continuous Education Programme (CEP), with its own admission and departmental-selection process. | It does not establish an automatic or guaranteed route into any of the listed BSc programmes. UJ's general admissions warning specifically prevents inferring this. |

Source pages were reviewed through official UJ search-indexed content on 2026-10-14. The applicable 2027 yearbook sections and any qualification-specific articulation agreements have not been fully inspected or curator-signed.

## 5. Candidate relationship disposition

No pair is approved by this proposal. These are research questions, not recommendations shown to learners.

| Candidate question | Current disposition | Evidence needed before approval |
|---|---|---|
| BSc Information Technology ↔ BSc Computer Science and Informatics | Possible `RELATED_FIELD` or `ALTERNATIVE`; **not approved** | Compare official 2027 programme purposes/curricula; document why a learner might compare them; curator sign-off. Do not imply equivalence. |
| BSc Computer Science and Informatics ↔ its Extended qualification | Possible `ALTERNATIVE`; **not approved** | Verify the current 2027 entry rules and the official purpose/selection conditions for the extended route. Check prior-tertiary-study restriction before recommending it. |
| BSc CSI ↔ BSc CSI specialising in AI | Possible `RELATED_FIELD`; **not approved** | Verify official 2027 programme descriptions and curriculum distinctions; document the specialisation difference and curator rationale. |
| BCom Information Systems ↔ Diploma in Business Information Technology | Possible `RELATED_FIELD` or `ALTERNATIVE`; **not approved** | Verify both applicable 2027 programme purposes/curricula and explain the degree/diploma difference. No articulation claim without explicit evidence. |
| Diploma in Business Information Technology → Advanced Diploma in Business Information Technology | Research lead only; **not approved** | Obtain UJ confirmation that this exact diploma is an “appropriate” three-year Diploma in IT for entry; verify the current target-cycle rules, experience and grade conditions. Target is outside the current undergraduate pilot set. |
| Higher Certificate in Information Technology → any listed BSc | **Do not assert** | Requires explicit current official evidence for the exact route and conditions; general progression provisions and the CEP warning are insufficient. |
| Any TVET qualification → a listed UJ qualification | **Do not assert** | Requires an applicable official UJ/TVET articulation or admissions rule for the exact qualification and cycle. No such pair has been verified in this review. |

## 6. Planned acceptance tests

- `T-REL-001`: reject a relationship with a missing/invalid source or unresolved source programme/target programme ID.
- `T-REL-002`: reject `ARTICULATION` unless the evidence explicitly identifies the named qualifications and route/conditions.
- `T-REL-003`: generic NQF progression language alone cannot approve a programme pair.
- `T-REL-004`: a relationship never changes eligibility state; eligibility is evaluated independently against verified programme rules.
- `T-REL-005`: expired, conflicting or unreviewed evidence is not displayed as a verified relationship.
- `T-REL-006`: learner-facing text distinguishes exploration/related field from formal progression or articulation and never guarantees admission or credit transfer.
- `T-REL-007`: no relationship is published before curator sign-off; preserve evidence and verification date.
- `T-REL-008`: relationship API responses contain catalogue metadata only; no learner marks, subjects, interests, results or tracker entries are transmitted.

These tests are planned; no executable tests have been created or run.

## 7. Traceability and gate

- Requirement: `REQ-ALT-001`.
- Gap: `GAP-003`.
- Proposed contract: this document.
- Planned verification: `T-REL-001` through `T-REL-008`.
- Implementation/API path: not yet defined; final API contract remains open under GAP-008.
- CI/release evidence: none.

**Decision requested:** approve or amend the relationship types, evidence threshold, required fields and candidate dispositions. Until approved and backed by exact source evidence, the relationship catalogue remains empty for matching purposes and GAP-003 stays open.
