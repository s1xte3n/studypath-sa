# UJ 2027 pilot catalogue evidence audit

**Audit baseline:** `main` at `91ed42b4ca451ab0d9a12ccf63b73d541585b45d`  
**Catalogue file:** `docs/product/uj-2027-pilot-catalogue-draft.json`  
**Catalogue version:** `uj-2027-pilot-v0.2-draft`  
**Catalogue status:** `DRAFT_NOT_FOR_DEFINITIVE_SCREENING`  
**Audit date:** 2026-10-24

## Baseline inventory

| Check | Inspected result |
|---|---|
| Programme records | 30 |
| Records with `status: DRAFT` | 30 |
| Records explicitly `status: APPROVED` | 0 |
| Records with `curatorSignoff: null` | 7 |
| Records with no `curatorSignoff` property | 23 |
| Source records | 2 |
| Source version approval | Outstanding |
| Catalogue publication | Not approved |

All 30 records remain draft. The differing shape of the missing sign-off field is a data consistency issue, but neither `null` nor an absent property represents approval.

## Retained source register

| Source ID | Cycle source | Version recorded in catalogue | Verification date | Outstanding limitation |
|---|---|---|---|---|
| SRC-UJ-2027-PROS | [UJ 2027 Undergraduate Prospectus](https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf) | “Online 25 June 2026 version (path includes July 2026 upload)” | 2026-10-14 | Final curator sign-off, applicable footnotes, source-version confirmation and byte-level comparison against candidate PDFs remain outstanding. |
| SRC-UJ-CBE-2027 | [UJ CBE Undergraduate 2027 Intake Brochure](https://www.uj.ac.za/wp-content/uploads/2026/04/brochure-cbe_undergraduate_2027-intake.pdf) | “2027 intake brochure” | 2026-10-14 | Exact applicable conditions/footnotes and curator approval remain outstanding; at least one record still has an unverified printed-page reference. |

The retained metadata records local SHA-256 values and says the PDFs were inspected with `pdftotext -layout`. This repository audit did not retrieve or independently hash the PDF bytes, visually inspect every row/footnote, or compare candidate prospectus PDFs. Those are not claimed as completed here.

## Programme-level evidence matrix

Every record below is draft, lacks a complete approved curator sign-off, and must not support definitive eligibility. The listed printed page is the current catalogue transcription, not an independent confirmation that all footnotes and conditions have been reconciled.

| Programme ID | Source location(s) recorded | Material open interpretation / evidence gap |
|---|---|---|
| `UJ-2027-BSC-IT` | Prospectus printed p. 86 | English stream mapping; complete conditions and selection exceptions; curator sign-off. |
| `UJ-2027-BSC-CSI` | Prospectus printed p. 86 | English stream mapping; complete conditions and selection exceptions; curator sign-off. |
| `UJ-2027-BSC-CSI-EXT` | Prospectus printed p. 91 | English mapping; complete conditions; scope of Science faculty restriction; sign-off. |
| `UJ-2027-BSC-CSI-AI` | Prospectus printed p. 86 | English mapping; complete conditions; scope of Science faculty restriction; sign-off. |
| `UJ-2027-BCOM-IS` | CBE brochure printed p. 10 | Mathematics/Technical Mathematics AND/OR semantics unresolved; English mapping; conditions; sign-off. |
| `UJ-2027-DIP-BIT` | Prospectus printed p. 44; CBE brochure printed p. 12 | Exact AND/OR branch interpretation; English mapping; conditions; sign-off. |
| `UJ-2027-BCOM-IM` | CBE brochure printed p. 10 | Conflicting specificity versus current programme page; English mapping; conditions; sign-off. |
| `UJ-2027-FADA-BARCH` | Prospectus printed p. 32 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-FADA-BA-COMDES` | Prospectus printed p. 32 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-FADA-BA-DIGMEDIA` | Prospectus printed p. 32 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-FADA-BA-INDDES` | Prospectus printed p. 32 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-FADA-BA-FASHION` | Prospectus printed p. 33 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-FADA-BA-VISART` | Prospectus printed p. 33 | English mapping; programme-specific international exception not encoded generally; sign-off. |
| `UJ-2027-FADA-DIP-ARCH` | Prospectus printed p. 34 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-FEBE-BENG-CIVIL` | Prospectus printed p. 60 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-FEBE-BENG-ELECTRICAL` | Prospectus printed p. 60 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-FEBE-BENG-MECHANICAL` | Prospectus printed p. 60 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-FEBE-BENGTECH-CHEM` | Prospectus printed p. 60 | Mathematics/Technical Mathematics column semantics; English mapping; sign-off. |
| `UJ-2027-FEBE-BENGTECH-CIVIL` | Prospectus printed p. 60 | Subject alternatives transcribed from table headings require curator confirmation. |
| `UJ-2027-FEBE-BENGTECH-MINING` | Prospectus printed p. 60 | Subject alternatives transcribed from table headings require curator confirmation. |
| `UJ-2027-FEBE-MINE-SURVEY` | Prospectus printed p. 61 | Subject alternatives transcribed from table headings require curator confirmation. |
| `UJ-2027-FEBE-BSC-CONSTRUCTION` | Prospectus printed p. 61 | Subject alternatives transcribed from table headings require curator confirmation. |
| `UJ-2027-FEBE-URBAN-PLANNING` | Prospectus printed p. 61 | Technical Mathematics acceptance unresolved. |
| `UJ-2027-FEBE-DIP-MGMT-SERVICES` | Prospectus printed p. 62 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-FEBE-DIP-OPS-MGMT` | Prospectus printed p. 62 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-CBE-BCOM-ACCOUNTING` | Prospectus printed p. 41; CBE brochure page to verify | Brochure printed-page location remains unresolved; English mapping; sign-off. |
| `UJ-2027-CBE-BCOM-BUSMGMT` | Prospectus printed p. 41 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-CBE-BCOM-FINANCE` | Prospectus printed p. 41 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-CBE-BCOM-MARKETING` | Prospectus printed p. 42 | English stream mapping; complete selection conditions; sign-off. |
| `UJ-2027-CBE-BSC-HOSPITALITY` | Prospectus printed p. 40 | English stream mapping; complete selection conditions; sign-off. |

## Publication decision

**Decision: retain all 30 records as draft; promote zero records.**

Reasons:
- The governing prospectus candidate has not been fully compared against alternative candidate PDFs.
- Catalogue source policy does not state an approved governing source version.
- English Home Language/First Additional Language mapping remains unresolved.
- APS selection when more than six eligible subjects are provided and required-subject constraints remain unresolved in the retained catalogue policy.
- Programme-specific AND/OR semantics, footnotes, restrictions and conditions remain unresolved for affected records.
- No real curator sign-off is recorded.

No programme was promoted and no curator identity or approval was invented. The official URLs are links to source material, not proof that every transcribed rule is complete or current.

## Machine-checkable gate

`src/domain/eligibility/catalogue-publication-gate.mjs` checks explicit catalogue approval, approved source-version status, official UJ HTTPS URLs, version/date/checksum/inspection metadata, unresolved source limitations, unique identifiers, programme approval, named dated curator sign-off, unresolved rules, and exact printed-page references that resolve to declared sources.

The validator is a structural gate; it cannot independently verify the truth of source interpretation or confer curator authority. The evaluator and learner-facing adapter must continue to fail closed. A passing structural fixture in automated tests is synthetic test data only, not an approved real programme.

## Remaining work

1. Compare retained prospectus bytes with alternative official UJ 2027 prospectus candidates and document a source-version decision.
2. Complete source-by-source and programme-by-programme human verification of rows, footnotes, restrictions and conditions.
3. Resolve English mapping and APS six-subject selection rules from authoritative cycle-specific sources.
4. Obtain actual curator review/sign-off; do not use the synthetic test fixture as approval.
5. Re-run all relevant workflows on the resulting candidate commit and update this audit with exact CI links/results.
6. Keep `G-SYN-001` NOT PASSED until catalogue provenance, manual quality review, privacy and submission evidence are independently closed.
