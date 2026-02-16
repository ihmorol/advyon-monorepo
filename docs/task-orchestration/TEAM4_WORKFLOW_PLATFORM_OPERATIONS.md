# Team 4 Workflow - Core Practice Operations

## Branch and Ownership
- Branch: `team4/core-practice-operations`
- Primary skills: `backend-lead`, `frontend-lead`, `database-architect`, `data-engineer`
- Agent roles: backend-dev, frontend-dev, database-architect, data-engineer, qa-tester

## Parallel Independence Contract
- Team 4 owns operational product flows (cases, schedules, clients, messaging, notifications, analytics).
- Owned paths:
  - `advyon-server/src/app/modules/case/`
  - `advyon-server/src/app/modules/schedule/`
  - `advyon-server/src/app/modules/message/`
  - `advyon-server/src/app/modules/socket/`
  - `advyon-server/src/app/modules/user/` (personalization and client workflow scope)
  - `advyon-server/src/app/modules/analytics/`
  - `advyon-client/src/pages/CreateCasePage.jsx`
  - `advyon-client/src/pages/dashboard/ArchivedCasesPage.jsx` (create)
  - `advyon-client/src/pages/dashboard/SchedulePage.jsx`
  - `advyon-client/src/pages/dashboard/CreateEventPage.jsx`
  - `advyon-client/src/pages/dashboard/ClientsPage.jsx`
  - `advyon-client/src/hooks/useSocket.js`
  - `advyon-client/src/components/Sidebar.jsx`
  - `advyon-client/src/components/NotificationBell.jsx` (create)
- Do not modify public pages, AI policy engine, or payment/admin modules.

## Execution Workflow (independent)
1. Requirements pass: lock API contracts for archive, schedule, client, messaging, and notifications.
2. Design pass: finalize schema updates, websocket event contracts, and analytics aggregates.
3. Build pass: implement in vertical slices with backward-compatible APIs.
4. Validation pass: integration and E2E tests for end-to-end operations.
5. Handoff pass: publish API docs, migration notes, and SSOT status updates.

## Assigned Tasks
| Order | WBS ID | Deliverable | Requirement Match | Commit Rule |
|---|---|---|---|---|
| 1 | WBS-4.1 | Personalization data system | Behavior tracking, preferences, history patterns | Commit after >=3 files or logical unit |
| 2 | WBS-4.2 | Case archive lifecycle | Archive/restore/search/auto-archive/permanent delete with integrity | Commit after >=3 files or logical unit |
| 3 | WBS-5.1 | Case creation wizard overhaul | Multi-step, templates, assignment, upload, deadlines, duplicate checks, auto-numbering | Commit after >=3 files or logical unit |
| 4 | WBS-5.2 | Real-time sidebar operations | Live counters, alerts, activity indicators, online status | Commit after >=3 files or logical unit |
| 5 | WBS-6.1 | Full schedule system | Multi-view calendar, DnD, recurring events, reminders, Google sync, conflicts, resource booking | Commit after >=3 files or logical unit |
| 6 | WBS-7.1 | Full client management CRUD | Add/edit/archive/detail/associations/access/billing history | Commit after >=3 files or logical unit |
| 7 | WBS-7.2 | Client-lawyer messaging enhancements | Case threads, attachments, receipts, templates, notifications, search | Commit after >=3 files or logical unit |
| 8 | WBS-8.1 | Analytics dashboard enhancement | All listed legal and business metrics, date range, exports | Commit after >=3 files or logical unit |
| 9 | WBS-8.1-FUT | Advanced reporting extension | Scheduled and advanced analytics cohorts | Commit after >=3 files or logical unit |
| 10 | WBS-9.1 | Real-time notification system | Types, read/unread, preferences, web push | Commit after >=3 files or logical unit |
| 11 | WBS-1.4 (Team 4 domain) | Zod validation for operations forms | Case/schedule/client/message form + endpoint validation | Commit after >=3 files or logical unit |
| 12 | WBS-DEP-CL-03 | Calendar dependency integration | Calendar library wrapped in isolated adapter | Commit after >=3 files or logical unit |
| 13 | WBS-DEP-CL-04 | Charts dependency integration | Recharts only in analytics surfaces | Commit after >=3 files or logical unit |
| 14 | WBS-DEP-SV-03 | Scheduler dependency integration | `node-cron` with idempotent job locking | Commit after >=3 files or logical unit |
| 15 | WBS-TD-PF-01 | Caching strategy implementation | Cache high-read operational endpoints | Commit after >=3 files or logical unit |
| 16 | WBS-TD-PF-03 | Pagination for all list endpoints | Backward-compatible pagination contracts | Commit after >=3 files or logical unit |
| 17 | WBS-TD-PF-04 | Virtual scrolling for large lists | Apply where list volumes are high | Commit after >=3 files or logical unit |
| 18 | WBS-TD-PF-05 | Request deduplication | Client and server dedupe patterns | Commit after >=3 files or logical unit |
| 19 | WBS-TD-TS-02 | API integration tests | Integration suites for Team 4 modules | Commit after >=3 files or logical unit |
| 20 | WBS-TD-TS-03 | E2E critical operation flows | Cases, schedule, notifications, client workflows | Commit after >=3 files or logical unit |
| 21 | WBS-SM-MVP-05 | Basic analytics tracking readiness | Analytics baseline validated | Commit after >=3 files or logical unit |
| 22 | WBS-SM-MVP-02 (Team 4 domain) | Form validation coverage verification | Team 4 owned forms fully validated | Commit after >=3 files or logical unit |
| 23 | WBS-SM-KPI-02 | Case creation KPI instrumentation | Creation funnel tracked | Commit after >=3 files or logical unit |

## Required Handoff Package
- Migration and rollback scripts for data/schema changes.
- Socket event contract reference with payload examples.
- Integration and E2E test artifacts.
- SSOT updates with known limitations and deferred items.
