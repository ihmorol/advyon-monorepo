# Team 5 Workflow - Admin, Commerce, and Governance

## Branch and Ownership
- Branch: `team5/admin-commerce-governance`
- Primary skills: `security-engineer`, `backend-lead`, `devops-engineer`, `qa-testing-lead`
- Agent roles: backend-dev, frontend-dev, security-engineer, devops-engineer, qa-tester, data-engineer

## Parallel Independence Contract
- Team 5 owns admin controls, billing/payment stack, and cross-team governance controls.
- Owned paths:
  - `advyon-server/src/app/modules/admin/`
  - `advyon-server/src/app/modules/payment/` (create)
  - `advyon-server/src/app/modules/subscription/` (create)
  - billing/admin client pages including `advyon-client/src/pages/dashboard/BillingPage.jsx` (create)
  - shared security middleware and CI governance config
- Team 5 consumes Team 3 moderation and Team 4 analytics through stable API contracts only.

## Device and GitHub Execution Rules
- Start each session with: `git fetch origin --prune`, `git checkout team5/admin-commerce-governance`, `git pull --rebase origin team5/admin-commerce-governance`.
- Team 5 owns repository governance and must enforce branch safety for all teams.
- Build a Task Packet for each WBS item (scope, contracts, test plan, rollback) before code edits.
- Push at least every 4 hours and update SSOT evidence links in the same cycle.
- Unknown behavior is a blocker; set SSOT status to `BL` instead of guessing implementation.
- Follow `docs/task-orchestration/AI_EXECUTION_PROTOCOL.md` for deterministic execution details.

## Execution Workflow (independent)
1. Requirements pass: lock admin scope and subscription model.
2. Design pass: finalize RBAC, Stripe flows, webhook model, and security controls.
3. Build pass: implement admin and billing in isolated modules and guarded routes.
4. Validation pass: security tests, billing integration tests, and operational runbooks.
5. Handoff pass: release readiness report with SSOT and compliance evidence.

## Assigned Tasks
| Order | WBS ID | Deliverable | Requirement Match | Commit Rule |
|---|---|---|---|---|
| 1 | WBS-11.1 | MVP admin control center | User management, oversight, moderation controls, system settings, analytics summary, bulk operations, audit logs | Commit after >=3 files or logical unit |
| 2 | WBS-12.1 | Stripe payment and subscription system | Plans, payment methods, invoices, trial, usage billing, payment history | Commit after >=3 files or logical unit |
| 3 | WBS-1.4 (Team 5 domain) | Zod validation for admin and billing forms | Client/server validation parity with clear errors | Commit after >=3 files or logical unit |
| 4 | WBS-DEP-CL-01 | Add `@stripe/stripe-js` | Client stripe loader stable and pinned | Commit after >=3 files or logical unit |
| 5 | WBS-DEP-CL-02 | Add `@stripe/react-stripe-js` | React Stripe components integrated in billing flow | Commit after >=3 files or logical unit |
| 6 | WBS-DEP-SV-01 | Add `stripe` server SDK | Verified webhook signatures and idempotent handlers | Commit after >=3 files or logical unit |
| 7 | WBS-OPS-01 | Multi-device Git safety | Branch protections, required checks, and CODEOWNERS enforced | Commit after >=3 files or logical unit |
| 8 | WBS-OPS-02 | PR quality consistency | PR template enforces WBS mapping and rollback evidence | Commit after >=3 files or logical unit |
| 9 | WBS-OPS-03 | Cross-device sync discipline | 4-hour sync cadence and stale branch control active | Commit after >=3 files or logical unit |
| 10 | WBS-OPS-05 | Merge train and conflict playbook | Two daily merge windows with deterministic conflict resolution | Commit after >=3 files or logical unit |
| 11 | WBS-OPS-06 | Handoff SLA governance | Handoff SLA below 4 hours with escalation flow | Commit after >=3 files or logical unit |
| 12 | WBS-TD-CQ-04 | TypeScript interface governance | Shared contracts standardized across teams | Commit after >=3 files or logical unit |
| 13 | WBS-TD-CQ-05 | JSDoc governance | Public APIs/services documented | Commit after >=3 files or logical unit |
| 14 | WBS-TD-TS-05 | Performance benchmark governance | Benchmarks and budgets in CI | Commit after >=3 files or logical unit |
| 15 | WBS-TD-SC-01 | Global rate limiting | Endpoint-level and global controls enforced | Commit after >=3 files or logical unit |
| 16 | WBS-TD-SC-04 | CORS hardening | Environment-specific allowed origins and methods | Commit after >=3 files or logical unit |
| 17 | WBS-TD-SC-05 | Secrets management audit | Secret rotation and environment governance | Commit after >=3 files or logical unit |
| 18 | WBS-SM-MVP-03 | Payment reliability verification | Stripe checkout + webhook tests pass | Commit after >=3 files or logical unit |
| 19 | WBS-SM-MVP-04 | Admin controls verification | Role and audit controls validated | Commit after >=3 files or logical unit |
| 20 | WBS-SM-MVP-06 | Uptime governance | SLO monitoring baseline active | Commit after >=3 files or logical unit |
| 21 | WBS-SM-MVP-02 (Team 5 domain) | Form validation coverage verification | Team 5 owned forms fully validated | Commit after >=3 files or logical unit |
| 22 | WBS-SM-KPI-01 | Registration KPI instrumentation | Registration trend reporting available | Commit after >=3 files or logical unit |
| 23 | WBS-SM-KPI-06 | Revenue KPI instrumentation | Revenue and billing event pipeline verified | Commit after >=3 files or logical unit |

## Required Handoff Package
- Security review and threat model updates.
- Stripe test-mode validation logs and webhook replay evidence.
- Admin access matrix and audit-log samples.
- SSOT status updates and release go/no-go checklist.
