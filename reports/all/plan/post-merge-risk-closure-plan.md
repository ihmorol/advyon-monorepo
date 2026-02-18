# Post-Merge Risk Closure Plan (Final-Day Execution)

Date: 2026-02-18
Scope: `advyon-client` + `advyon-server` merged state on `ihm/fix/merge-teamwork`
Goal: Close merge risks with the minimum safe change set, preserve cross-repo contracts, and finish tomorrow with auditable evidence.

## 1) Operating Constraints (Non-Negotiable)
- No feature expansion, no UX redesign, no schema rewrites.
- Only stabilization, compatibility, validation, and governance fixes.
- No breaking API changes; additive or compatibility-only adjustments.
- Keep risky surfaces behind feature flags until evidence gates pass.
- If a requirement is unclear, mark `BL` in SSOT instead of guessing.

## 2) Validated Current State (Evidence Snapshot)
- Client build now runs: `npm run build` passes in `advyon-client`.
- Targeted server tests now run: Team 3 Jest suite passes (5/5).
- Targeted client Vitest partially passes (2/3 suites); one fails due to missing `@testing-library/react-hooks`.
- Client lint is still failing (41 errors, 7 warnings in latest run).
- Server lint is still failing (large error set, including lint config/test-env issues and `no-explicit-any`).
- Server build still fails on 3 concrete issues:
  - Stripe API version mismatch (`src/app/config/stripe.config.ts`)
  - missing `uuid` typings in message module
  - `IMessage` export mismatch in message model/service

Interpretation: environment-level blockers are reduced, but quality/build-readiness blockers remain active.

## 2.1) Phase Execution Log (Live)

- Phase 1 (P0 Build Integrity) - Completed
  - Applied minimal compile fixes:
    - `advyon-server/src/app/config/stripe.config.ts` API version alignment.
    - `advyon-server/src/app/modules/message/message.service.ts` type/import compatibility fixes.
  - Result: `npm run build` now passes in both `advyon-client` and `advyon-server`.

- Phase 2 (P0 Verification Unblock) - Completed for targeted suites
  - Updated `advyon-client/src/hooks/__tests__/useAuthApi.test.js` for current testing-library compatibility and deterministic retry-timer handling.
  - Result:
    - targeted client Vitest suites pass (`useAuthApi`, `useCommunityStore`, `AIToolsPage`).
    - targeted server Jest suites pass for Team 3 AI/community.
    - targeted Team 1 server service suites (`case.test.ts`, `document.test.ts`) pass.

- Team 2 Scope Decision
  - Team 2 is intentionally deferred from this final-day stabilization execution.
  - Team 2 rows remain `NS` and outside current critical-path closure.

- Phase 3 (P0 Security and Contract Safety) - In progress (static verification complete)
  - Static client/server route parity reviewed for:
    - documents/download,
    - AI/community tools,
    - admin/billing,
    - schedule/notification/message.
  - Runtime smoke execution added with seeded role principals (lawyer/admin/client) and passed in matrix form.
  - During smoke checks, two ID-reference defects were remediated:
    - `notification.service.ts` recipient/sender filtering now resolves `User.id` to ObjectId before querying.
    - `schedule.service.ts` now resolves `createdBy`/`participants`/`caseId` identifiers to ObjectId references.
    - `message.service.ts` now resolves business `caseId` values before ObjectId usage in create-thread flows.
  - Evidence:
    - `reports/all/strategy/api-smoke-matrix-2026-02-18.md` (`20/20` checks passed).
    - `reports/all/strategy/feature-flow-checklist-2026-02-18.md` (`27/27` checks passed).
  - Client consumer parity remediations (minimum-safe):
    - `useMessageStore` now uses server-compatible message endpoints (`/messages/pending/count`, `DELETE /messages/:id`) and robustly parses wrapped payloads.
    - `useAnalyticsStore` now composes data from `/analytics/metrics/cases`, `/analytics/metrics/clients`, and `/analytics/metrics/deadlines` instead of non-existent `/analytics/overview`.
    - Added dashboard-safe routes for `/dashboard/messages` and `/dashboard/messages/:messageId` to remove runtime navigation dead-ends.
  - Verification refresh: `advyon-client` build re-run and passing after parity fixes.

- Phase 4 Support (Data Readiness) - Completed
  - Added full reset development seeding utility: `advyon-server/scripts/seed.database.ts`.
  - Added run commands in `advyon-server/package.json`:
    - `npm run seed:db` (reset + seed)
    - `npm run seed:db:dry` (validation-only dry run)
  - Seeder refactored to use Mongo-generated `_id` values for all relational references, with post-seed integrity validation.
  - Seeder uses the three provided test accounts for relational data population (lawyer/admin/client).
  - Execution completed on dev DB with `npm run seed:db`; reference validation returned zero mismatches.
  - Resulting counts include users 3, cases 12, documents 36, schedules 20, notifications 30, messages 30, subscriptions 20, payments 20.

## 3) Concern Coverage Matrix (Docs + Reports)

| Concern Source | Concern | Fix Strategy (Minimum Change) | Mitigation | Prevention |
| --- | --- | --- | --- | --- |
| reports/all/plan/merge-readiness.md | tooling blockers historically blocked all evidence | keep runtime/tooling fixed and lock versions in team runbook | run build/lint/test smoke at start/end of day | enforce preflight script before coding |
| reports/all/strategy/cross-repo-risks.md | router/API alignment drift | contract verification checklist by route group | block merges if contract check fails | maintain frozen contract table per sprint window |
| reports/advyon-client/strategy/branch-analysis.md | document viewer regressions | run Team 1 manual matrix only; no refactor | keep fallback download + error boundary active | add regression suite once lint baseline stable |
| reports/advyon-server/strategy/branch-analysis.md | upload/download and payment risks | fix compile blockers + run targeted API checks | keep strict middleware and auth checks enabled | add route-level security tests in CI |
| reports/branch-status/team1-foundation.md | auth/doc work merged but unverified | execute focused manual + targeted tests | do not mark DN until artifacts attached | SSOT evidence field mandatory on each row |
| reports/branch-status/team2-public.md | Team 2 not started | declare explicit blocker/defer decision now | avoid silent scope creep before deadline | enforce WBS split: release-critical vs post-release |
| reports/branch-status/team3-ai.md | privacy retention and rollout risk | keep AI feature-flag rollout controlled | add retention + opt-out task as hard gate | add monitoring alerts for abuse/PII patterns |
| reports/branch-status/team4-operations.md | backend merged, UI incomplete | verify backend contracts now; keep UI gated | avoid partial UI enablement | require contract-first + consumer tests |
| reports/branch-status/manual-verification.md | manual evidence missing | execute only release-critical suites first | all failed suites become `BL` instantly | daily evidence upload protocol |
| docs/task-orchestration/MASTER_TASK_BREAKDOWN.md | incomplete practical closure sequencing | run this phase plan in critical-first order | explicit owner + deadline per phase | keep this file and SSOT synchronized |
| docs/task-orchestration/AI_EXECUTION_PROTOCOL.md | anti-assumption rule | enforce confirmation gates for unknowns | unresolved question => `BL` | handoff template requires open-question section |
| docs/task-orchestration/team3-handoff/* | residual AI safety/compliance risks | retain tool flags + moderation thresholds + policy blocks | stage rollout and watch metrics | add retention/opt-out and periodic risk audit |

## 4) Phase Plan (Most Critical to Least Critical)

### Phase 1 - P0 Build Integrity (Immediate, highest priority)
Objective: make both repos compile and run targeted tests without changing product behavior.

Tasks:
1. Fix server TypeScript blockers only:
   - Stripe API version string alignment.
   - `uuid` typings resolution.
   - `IMessage` export/type mismatch correction.
2. Keep client build green; do not touch non-blocking warnings in this phase.
3. Re-run:
   - `advyon-client`: `npm run build`
   - `advyon-server`: `npm run build`

Risk mitigation:
- Small, isolated fixes; no route behavior changes.
- Revert only the minimal patch if regression appears.

Prevention:
- Add compile gate in pre-merge checklist for both repos.

Exit criteria:
- Both builds pass.

### Phase 2 - P0 Verification Unblock
Objective: ensure minimum automated evidence is runnable and trustworthy.

Tasks:
1. Fix Vitest dependency gap for `useAuthApi` test (`@testing-library/react-hooks` replacement or compatible adapter).
2. Keep Team 3 targeted Jest suite passing.
3. Define temporary lint scope strategy for deadline:
   - enforce strict lint on changed critical files,
   - track full-repo lint debt separately (no hiding, no disabling globally).

Risk mitigation:
- No broad eslint rule relaxations across entire repo.
- Any temporary lint exception must include owner + due date.

Prevention:
- Align lint config for test environment globals and Node globals.

Exit criteria:
- Targeted critical suites pass on both repos.

### Phase 3 - P0 Security and Contract Safety
Objective: close highest-impact post-merge security and compatibility risks.

Tasks:
1. Validate cross-repo contracts for these flows (request/response compatibility only):
   - document preview/download,
   - AI tools + community moderation,
   - admin + billing,
   - schedule + notifications.
2. Run security checks with existing behavior:
   - upload MIME/size rejection,
   - signed download authorization,
   - payment webhook signature/idempotency,
   - AI policy rejection for off-topic/injection.

Risk mitigation:
- Keep admin/billing and operations UI feature gates controlled until checks pass.

Prevention:
- Publish and freeze contract matrix in SSOT evidence links.

Exit criteria:
- No unresolved critical contract mismatch.
- Security-sensitive paths have evidence logs.

### Phase 4 - P1 User-Story Verification (Release-Critical)
Objective: prove user stories that were merged are working end-to-end.

Tasks:
1. Team 1 manual matrix (auth sync, viewer reliability, secure downloads, upload guardrails).
2. Team 3 manual matrix (moderation, AI assist, tools history/export, context policy).
3. Team 5 manual matrix (admin controls + billing happy path + webhook replay in test mode).
4. Team 4 API verification matrix (schedule/notification/message/archive) while keeping unfinished UI gated.

Risk mitigation:
- Failed suite immediately marks related WBS as `BL`.

Prevention:
- Every manual run includes timestamp, tester, artifacts, and linked SSOT row.

Exit criteria:
- All release-critical merged stories have pass/fail evidence and no silent gaps.

### Phase 5 - P1 Governance and Merge-Risk Prevention
Objective: prevent re-introduction of merge chaos after this stabilization.

Tasks:
1. Enforce OPS controls from WBS-OPS-01..06:
   - branch protections and required checks,
   - PR template WBS mapping + rollback section,
   - fixed merge windows and conflict ownership,
   - handoff SLA discipline.
2. Keep commit checkpoint rule active (3+ files or logical unit).

Risk mitigation:
- No integration merge outside merge windows.

Prevention:
- branch protection + required-check policy enforces this automatically.

Exit criteria:
- OPS controls configured and referenced in SSOT evidence.

### Phase 6 - P2 Technical Debt Containment (Bare-Minimum for Deadline)
Objective: reduce the highest debt that can break release confidence without broad refactors.

Tasks:
1. Prioritize lint debt only in release-critical files touched by merged scope.
2. Log remaining debt as explicit backlog rows (owner + due date), not hidden.
3. Capture performance watchpoints (client large chunk warning; server hot paths).

Risk mitigation:
- avoid mass refactor before deadline.

Prevention:
- staged debt burn-down after release with enforced gates.

Exit criteria:
- no unresolved critical debt in release-critical paths.

## 5) Confirmation Gates (No Assumptions)
These confirmations are required before final `DN` marking:
1. Product confirmation: Team 2 public scope is release-critical now or explicitly deferred.
2. Security confirmation: acceptable residual risk for AI personalization retention until opt-out ships.
3. Operations confirmation: Team 4 server-only validation is acceptable while UI remains feature-gated.
4. Commercial confirmation: Stripe test-mode + webhook evidence is sufficient for this release candidate.
5. QA confirmation: manual evidence matrix completeness for all merged user stories.

If any confirmation is missing, related rows stay `IP` or move to `BL`.

## 6) Tracker Update Policy for Tomorrow Close
- Only mark `DN` when acceptance checklist + evidence links are complete.
- Use `IP` for partially implemented/verified work.
- Use `BL` for any unresolved dependency, decision, or failed gate.
- Update SSOT and reports in the same cycle to avoid state drift.

## 7) Definition of Completion for This Final-Day Plan
- Builds pass for both repos.
- Release-critical targeted tests pass.
- Manual verification evidence exists for merged critical user stories.
- Security/contract checks pass for sensitive flows.
- SSOT status reflects real state (`DN`/`IP`/`BL`) with proof links.
- No untracked assumption remains.
