# Decision: default English stream for UJ 2027 demo matching

**Decision date:** 2026-10-24  
**Scope:** UJ 2027 catalogue used in the StudyPath SA hackathon demonstration  
**Decision owner:** StudyPath SA project owner  
**Status:** Approved provisional demo assumption; not independently verified official admission guidance

## Decision

When a programme's recorded English requirement does not explicitly identify the accepted NSC English subject stream, the hackathon demo will provisionally interpret the requirement as **English Home Language**.

If the official source explicitly names a different stream or names multiple accepted streams, the explicit source wording takes precedence; do not overwrite it with this default.

## Implementation and display rules

- Keep the assumption identifiable in catalogue metadata and/or the learner-facing explanation; do not present it as a verified UJ rule.
- Do not silently treat English First Additional Language as equivalent to Home Language.
- Where the learner's English stream is known to be Home Language, compare its result against the transcribed level/percentage threshold using the existing deterministic rule.
- Where the learner has only First Additional Language, or their stream is unknown, do not infer equivalence. Return `UNKNOWN` if this assumption is material to the outcome.
- Continue returning `UNKNOWN` when other unresolved rules could change the outcome. This decision resolves only the default stream assumption; it does not close source verification or curator sign-off.
- This demo assumption is not institutional approval, UJ endorsement, or permission for definitive admission screening.

## Rationale and trade-off

The project owner has chosen a consistent, explicit default to make the hackathon demo behaviour deterministic when the retained catalogue does not specify a stream. The trade-off is that this may differ from an institution's actual rule. Therefore the assumption must remain disclosed, traceable, and replaceable when an authoritative source or authorised curator confirms the accepted stream.

## Follow-up evidence required

Before definitive screening, verify each programme's English requirement against the exact current official prospectus/brochure row and footnotes, record the source locator and verification date, and obtain authorised curator review. Update the catalogue and tests from that evidence rather than treating this demo assumption as source evidence.
