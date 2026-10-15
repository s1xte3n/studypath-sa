# Change control — tiered anonymous and authenticated matching

**Date:** 2026-10-15  
**Decision reference:** D-045  
**Status:** Product direction accepted; architecture/security/cost gates open  
**Scope:** Requirements and architecture documentation only

## Owner decision

- **Anonymous/non-logged-in users (Option A):** public catalogue API access; matching runs in the browser. Learner subjects, marks, interests, results and tracker entries remain in page memory and must not be transmitted to the API, URLs, analytics, application logs or error telemetry.
- **Logged-in users (Option B):** authenticated server-side matching is the intended direction. Logged-in users may receive additional special features, but those features have not yet been specified.
- The two user classes must have separate data boundaries. Anonymous requests must not be upgraded to profile-bearing requests merely because the API exists.

## What this decision does not approve

It does not authorize implementation, Azure provisioning, deployment, real learner-data use, profile persistence, saved-pathway sync, tracker sync, database/storage, uploads, AI, or any unspecified account feature. Login does not itself authorize storing learner data across sessions.

## Required gates before authenticated matching

1. **Product contract:** enumerate each logged-in feature; define its purpose, fields, data flow, user-visible behavior and acceptance criteria. State explicitly whether data is session-only or stored across sessions.
2. **Privacy/legal:** assess applicable South African privacy obligations and the intended learner/minor audience; define notice/consent where applicable, data minimisation, retention/deletion, account closure and incident handling. Use synthetic data until review and implementation controls are verified.
3. **Identity and authorization:** select and approve the identity provider and configuration; validate tokens on the trusted server boundary; authorize every request server-side; enforce account ownership and cross-user isolation; apply least privilege. Never trust a client-supplied user/account ID.
4. **API contract:** define the authenticated match request/response, strict input schema, size limits, validation, error format, timeout/retry/cache behavior, versioning and CORS. Profile values must not be placed in URLs.
5. **Logging and telemetry:** verify actual platform/provider logging and retention. Exclude learner profile payloads from application logs, analytics and error telemetry. Document technical metadata that providers may collect and its retention/access controls.
6. **Security and tests:** threat-model authentication bypass, token expiry/tampering, IDOR, cross-account access, injection, over-posting, rate abuse, accidental payload logging and data deletion. Add unit, contract, integration and end-to-end tests; prove account isolation with two synthetic accounts.
7. **Cost and operations:** compare Static Web Apps, Functions, identity, optional API Management, monitoring and egress against the hard R100/month cap. Record quotas, failure modes, alerts, rollback and operational ownership. Do not provision until the exact resource list and costs are approved.
8. **Traceability and approval:** update REQUIREMENTS.md, TRACEABILITY-MATRIX.md, acceptance criteria and test registry. Obtain explicit approval of the authenticated contract and privacy/security/cost review before implementation.

## Safe implementation order

1. Complete the anonymous catalogue-only/client-side journey and its privacy verification.
2. Define logged-in special features and the minimum data lifecycle.
3. Approve identity, authorization, authenticated API contract, privacy/security controls and cost.
4. Implement authenticated matching behind tests and server-side authorization.
5. Verify CI on the exact PR head, runtime privacy/logging behavior, cross-user isolation and release gates before any public learner use.

## Current evidence

This document and D-045 record the product direction only. No authenticated implementation, tests, CI result, Azure resource, deployment, privacy clearance or release evidence is claimed.
