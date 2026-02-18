# Branch Status Rollup – 18 Feb 2026

This folder summarizes the four product branches called out in the workflow docs. SSOT data currently lists five team branches; Team 5 (admin/commerce/governance) remains unscheduled, so this rollup focuses on the four product delivery tracks (Teams 1–4) and cites Team 5 items where they block release.

## State of Each Branch

| Team / Branch                                       | Status                            | Recent Activity                                                                                                                                                   | Next Critical Actions                                                                                                                                                                  |
| --------------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Team 1 – `sro/feat/foundation-document-reliability` | Not started                       | No local branch; WBS-1.2/1.3/1.4 slice and WBS-5.3/5.4/5.5 still `NS` in SSOT.                                                                                    | Create Task Packets, implement auth/document fixes, add validation + download security, run manual regression + unit tests.                                                            |
| Team 2 – `ihm/feat/public-content-metadata`         | Not started                       | Public pages still placeholder; metadata/contact modules not created.                                                                                             | Lock IA + copy, implement landing/about/contact/metadata scope, ship validation + accessibility/performance audits, add KPI instrumentation.                                           |
| Team 3 – `ihm/feat/ai-community-intelligence`       | Done (pending controlled rollout) | Moderation, AI tools, centralized context, assist UX, validation, sanitizer, KPI endpoints all merged on branch; docs, risk audit, and manual playbook published. | Execute manual verification, add privacy retention + opt-out controls, configure monitoring + feature flags, coordinate GO/NOGO with security + product before merging to integration. |
| Team 4 – `sif/feat/core-practice-operations`        | Not started                       | No commits or SSOT progress; schedule, notification, analytics, personalization tasks pending.                                                                    | Publish contracts/migrations, implement personalization/archive/case wizard/schedule/message/notification flows, install dependencies, add tests + KPI coverage.                       |

## What’s Actually Done

- Team 3 deliverables (WBS-3.1/3.2/3.3/3.4, Team 3 slices of WBS-1.4, WBS-TD-SC-02, WBS-DEP-SV-02, WBS-SM-KPI-04/05) are complete on their branch with supporting documentation and manual playbooks.
- Program-level efforts (validation WBS-1.4, SM and KPI tasks, operations backlog, governance/commerce work) remain open because Teams 1, 2, 4, and 5 have not started their slices.

## What’s Missing Before Production

1. **Feature Implementation Gaps** – All Team 1, 2, and 4 WBS items are outstanding; payment/admin/governance (Team 5) is also unscheduled, so there is no billing, admin RBAC, or production-ready governance yet.
2. **Shared Validation & QA** – WBS-1.4 and WBS-SM-MVP-02 cannot close until every team adds Zod coverage + evidence. Only Team 3 contributed so far.
3. **Program Operations** – Branch protections, PR template, sync cadence, merge train, and handoff SLAs (WBS-OPS-01…06) remain `NS`; these governance tasks block reliable multi-branch merges.
4. **Testing Debt** – Integration/E2E suites (WBS-TD-TS-02/03) exist only on paper. Relying solely on manual verification is risky.
5. **Release Infrastructure** – No stripe/payment/schedule/calendar dependencies installed; no observability dashboards or KPI exports wired for Teams 1/2/4/5.

## Concerns to Track

- **Missing Modules** – Several server/client modules called out in Master Task Breakdown do not exist (contact, payment, subscription, community.moderation, AI tools pages). Teams must create them without assuming scaffolding.
- **Security & Compliance** – File uploads, payments, admin privileges, personalization data retention, and inbound contact forms introduce attack surfaces requiring security review before go-live.
- **Operational Cadence** – Without branch protections + merge governance, parallel work will collide once Teams 1/2/4 spin up.
- **Testing Environment Limits** – Client-side test runners (Vitest) fail in this environment; plan fallback validation (Node scripts, targeted Jest) until infra issue is solved.

## Manual Verification Overview

A consolidated manual verification tracker lives in `manual-verification.md`. Per-branch details are embedded in:

- `team1-foundation.md`
- `team2-public.md`
- `team3-ai.md`
- `team4-operations.md`

Key manual gates before merging to integration:

1. Run Team 3’s abuse + AI verification suite end-to-end (moderation, AI tools, context, KPI endpoints, builds/tests) per published playbook.
2. Once Team 1 implements document/auth fixes, execute auth provider coverage, workspace preview regression, download security checks, and upload guard validations.
3. For Team 2, rerun Lighthouse/Axe/perf budgets plus contact form anti-spam tests and metadata contract validation.
4. For Team 4, perform case/schedule/message/notification flows, archive lifecycle tests, analytics exports, and socket reliability drills.

## Next Work Needed Before Merge

1. **Stand up Remaining Branches** – Checkout/pull remote branches (or create them) for Teams 1, 2, and 4; prepare Task Packets and start incremental commits tied to WBS IDs.
2. **Finish Governance Tasks** – Have Team 5 enable branch protections, PR templates, sync cadence enforcement, and CODEOWNERS before more pods begin work.
3. **Plan Release Gates** – Define integration merge windows, QA/security review schedule, and staging verification plan so completed branches (Team 3) have a clear path to production.
4. **Manual Verification Evidence** – Record results of each manual suite in SSOT with links to logs/screens; without evidence, orchestrator cannot mark tasks `DN`.
5. **Production Readiness** – For each branch, document rollback plans, feature flags, and monitoring hooks prior to integration merge.
