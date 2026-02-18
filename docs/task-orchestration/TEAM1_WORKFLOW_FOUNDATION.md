# Team 1 Workflow - Foundation and Document Reliability

## Branch and Ownership
- Branch: `sro/feat/foundation-document-reliability`
- Primary skills: `frontend-lead`, `backend-lead`, `qa-testing-lead`, `security-engineer`
- Agent roles: frontend-dev, backend-dev, qa-tester, security-engineer

## Parallel Independence Contract
- Team 1 owns auth and document reliability areas.
- Owned paths:
  - `advyon-client/src/features/auth/`
  - `advyon-client/src/hooks/useAuthApi.js`
  - `advyon-client/src/layouts/DashboardLayout.jsx`
  - `advyon-client/src/pages/dashboard/DocumentViewerPage.jsx`
  - `advyon-client/src/pages/dashboard/TextReviewPage.jsx`
  - `advyon-client/src/pages/dashboard/MyDocumentsPage.jsx`
  - `advyon-client/src/features/documents/components/PDFViewer.jsx`
  - `advyon-client/src/features/workspace/components/WorkspaceView.jsx`
  - `advyon-server/src/app/modules/document/`
- Do not modify Team 2/3/4/5 owned modules unless orchestrator approves shared hotfix.

## Device and GitHub Execution Rules
- Start each session with: `git fetch origin --prune`, `git checkout sro/feat/foundation-document-reliability`, `git pull --rebase origin sro/feat/foundation-document-reliability`.
- Work only in Team 1 owned paths unless an approved cross-team contract exists.
- Build a Task Packet for each WBS item (scope, contracts, test plan, rollback) before code edits.
- Push at least every 4 hours and update SSOT evidence links in the same cycle.
- Unknown behavior is a blocker; set SSOT status to `BL` instead of guessing implementation.
- Follow `docs/task-orchestration/AI_EXECUTION_PROTOCOL.md` for deterministic execution details.

## Execution Workflow (independent)
1. Requirements pass: confirm WBS checklist items and acceptance tests from SSOT.
2. Design pass: define error and loading patterns before coding.
3. Build pass: implement in small slices with feature flags if behavior risk is high.
4. Validation pass: unit + integration + manual regression on auth and document flows.
5. Handoff pass: publish handoff doc with evidence and SSOT status updates.

## Assigned Tasks
| Order | WBS ID | Deliverable | Requirement Match | Commit Rule |
|---|---|---|---|---|
| 1 | WBS-1.2 | Remove GitHub login option from Clerk forms | GitHub removed, supported providers unchanged | Commit after >=3 files or logical unit |
| 2 | WBS-1.3 | Fix post-login sync resilience | Graceful errors, retry, fallback onboarding | Commit after >=3 files or logical unit |
| 3 | WBS-1.4 (Team 1 domain) | Zod validation for auth/onboarding/document forms | Client/server validation parity with clear errors | Commit after >=3 files or logical unit |
| 4 | WBS-5.3 | Workspace document preview stability fixes | PDF reliability, mobile, loading, boundaries | Commit after >=3 files or logical unit |
| 5 | WBS-5.4 | Document preview page completeness | Multi-type support, print/share/version controls | Commit after >=3 files or logical unit |
| 6 | WBS-5.5 | Functional and secure document downloads | Single, analyzed, batch download with progress/security | Commit after >=3 files or logical unit |
| 7 | WBS-TD-CQ-01 | Shared API error envelope adoption (Team 1 scope) | Consistent error UX in owned modules | Commit after >=3 files or logical unit |
| 8 | WBS-TD-CQ-02 | Loading-state standardization (Team 1 scope) | No blank waits in owned routes | Commit after >=3 files or logical unit |
| 9 | WBS-TD-CQ-03 | Route-level error boundaries (Team 1 scope) | Fallback rendering and telemetry added | Commit after >=3 files or logical unit |
| 10 | WBS-TD-TS-01 | Unit tests for critical Team 1 utilities | Test coverage for auth and doc helpers | Commit after >=3 files or logical unit |
| 11 | WBS-TD-SC-03 | File upload security hardening (Team 1 scope) | MIME, size, and validation checks enforced | Commit after >=3 files or logical unit |
| 12 | WBS-SM-MVP-01 | Critical bug closure verification (Team 1 owned bugs) | No open critical bugs in Team 1 scope | Commit after >=3 files or logical unit |
| 13 | WBS-SM-MVP-02 (Team 1 domain) | Form validation coverage verification | Team 1 owned forms fully validated | Commit after >=3 files or logical unit |
| 14 | WBS-SM-KPI-03 | Document upload rate instrumentation | Upload funnel events measurable | Commit after >=3 files or logical unit |

## Required Handoff Package
- Updated SSOT rows for all Team 1 WBS IDs.
- Test evidence: unit, integration, and manual repro notes.
- Risk register: unresolved defects or deferred items.
- Rollback notes for auth sync and download endpoints.
