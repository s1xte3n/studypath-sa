# Q-020 Owner Decisions A–E — Approval Record

**Decision date:** 2026-10-15  
**Decision owner:** Project owner  
**Status:** A–E approved; independent evidence gates remain open  
**Related:** [Decision pack](Q020-DECISION-PACK.md), [Lifecycle readiness](Q020-LIFECYCLE-IMPLEMENTATION-READINESS.md), [Architecture/threat model](Q020-ARCHITECTURE-THREAT-MODEL.md), [Cost and test readiness](Q020-COST-AND-TEST-READINESS.md).

## Explicit owner decisions

| ID | Owner decision | Recorded disposition | What this approval does not establish |
|---|---|---|---|
| Q020-A | APPROVE | Evaluate Microsoft Entra External ID first; proposed SPA session design is OIDC authorization code + PKCE with MSAL and memory-only token cache. | Does not select/configure a production tenant or verify provider capabilities, security, regions, retention or cost. |
| Q020-B | APPROVE | Adopt the logical API/account-isolation baseline: derive ownership from validated token subject; scope every read/write/delete; default deny; parameterized SQL; no client-supplied account authority; no profile data in URLs/logs/telemetry; no-store account responses. | Does not establish implementation, schema correctness, authorization enforcement, cross-account isolation or runtime privacy. |
| Q020-C | APPROVE | Accept the listed retention/deletion windows as internal engineering targets only: stop use/writes immediately on withdrawal; active profile deletion target 30 days; active account-linked deletion target 30 days after account deletion; backup expiry target 35 days; routine log retention 30 days or less; no match history by default; saved IDs until removal/account deletion. | Not a legal conclusion, public commitment, service guarantee or proof that provider controls and deletion/restore behavior meet the targets. Qualified review and provider/runtime verification remain required. |
| Q020-D | APPROVE | Keep the hard total project cap at R100/month and defer authenticated persistence/features unless a complete evidence-backed forecast proves the entire service design fits. | Does not establish affordability or authorize provisioning. Current all-in cost compliance remains unverified. |
| Q020-E | APPROVE | Adopt the executable acceptance matrix, including privacy canaries, negative authorization and cross-account isolation, consent/withdrawal, deletion/restore, operational controls, accessibility/security/regression, and 20+ reviewed synthetic golden cases with zero false-positive ELIGIBLE outcomes. | Does not mean tests have been implemented, run, passed or wired into CI. |

## Implementation and data-use boundary

These decisions approve design directions, constraints and acceptance thresholds only. They do **not** authorize:
- collecting or processing real learner data;
- cloud provisioning or paid/metered services;
- production identity configuration;
- implementation of authenticated persistence before all applicable gates pass;
- deployment or public release.

Preserve the existing anonymous privacy boundary: anonymous learner inputs, results and tracker entries remain page-memory-only and must not be sent to APIs, URLs, analytics, application logs or error telemetry. The application tracker remains non-persistent.

## Remaining gates

1. Qualified South African privacy/legal and age-appropriate design review, documented before real learner data.
2. Identity-provider capability and configuration review, including supported flows, tenant/service terms, regions, logs, retention, deletion, backup and recovery behavior.
3. Complete service-by-service cost forecast demonstrating the full workload fits within R100/month, including quotas, overages, taxes/FX and shutdown controls.
4. Verified runnable application/API/runtime baseline and reviewed API/schema/architecture contracts.
5. Implementation and execution of the approved test matrix on a recorded commit, with CI evidence; documentation-only contract tests are insufficient for runtime assurance.
6. Verified operational controls for logging, telemetry, caching, backup expiry, deletion, restore tombstones, monitoring and incident response.
7. Traceability and release-gate reconciliation before separate explicit authorization for implementation, provisioning or deployment.

**Current gate:** Q-020 IMPLEMENTATION READY — **NOT PASSED**. Legal review, provider verification, cost compliance, implementation, runtime tests and deployment are not claimed complete.
