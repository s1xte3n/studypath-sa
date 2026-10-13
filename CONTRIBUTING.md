# Contributing to StudyPath SA

## Current phase
The project is in Phase 0 discovery. Keep changes limited to approved discovery artifacts until the `PROJECT READY` gate passes. Do not start application architecture, API contracts, infrastructure or implementation based on assumptions.

## Workflow
1. Check `docs/project/PROJECT-STATUS.md`, `OPEN-QUESTIONS.md` and `DECISIONS.md`.
2. Work on a short-lived branch; avoid direct commits to `main` for substantive changes.
3. Keep changes focused and explain the objective, requirement, rationale and affected files in the pull request.
4. Update source-of-truth documentation when an approved decision changes scope, architecture, data handling, budget or delivery.
5. Link requirements, contracts, tests and evidence as they become available.
6. Request review from the accountable team member before merging.

## Quality expectations
- Prefer small, reviewable changes and preserve unrelated behaviour.
- Do not claim a test, build, deployment or security check passed unless it was run and its result recorded.
- Add tests for new or changed behaviour once implementation begins.
- Explain blockers and unknowns rather than silently guessing.
- Use accessible, mobile-first UI patterns and clear user-facing uncertainty.

## Security and learner data
- Never commit secrets, tokens, credentials, private keys, real learner records or production exports.
- Use synthetic data for development and demos.
- Validate inputs and enforce authorization server-side for any saved learner data.
- Do not log sensitive student information.
- Report suspected exposure promptly to the repository owner using a private channel; do not include secrets in an issue or pull request.

## Pull request checklist
- [ ] Scope and rationale are stated.
- [ ] Related requirement/decision/question is linked.
- [ ] Tests/checks and actual results are recorded, or explicitly marked not run.
- [ ] Documentation and traceability records are updated.
- [ ] No secrets or real learner data are included.
- [ ] Budget, privacy, API and infrastructure implications are identified.
