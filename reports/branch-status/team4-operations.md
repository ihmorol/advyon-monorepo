# Team 4 – Core Practice Operations

## Branch Identity
- Workflow doc branch: `sif/feat/core-practice-operations`
- SSOT / execution alias: `sif/feat/core-practice-operations`
- Owners: backend-lead, frontend-lead, database-architect, data-engineer pod
- Code areas: case/schedule/client/message/socket/analytics modules in server + corresponding dashboard pages/hooks

## Current Status (2026-02-18)
- Branch has not been pulled locally; SSOT rows for all Team 4 WBS items remain `NS` (not started).
- No schema migrations, socket adapters, or analytics upgrades exist yet; calendar and notification dependencies are uninstalled.
- Contract-first deliverables (WBS-OPS-04) and caching/pagination dedupe tasks (TD backlog) are unscheduled.

## Completed Work to Date
- None documented for Team 4 scope.

## Outstanding Scope Summary
1. **Data & Case Lifecycle** – Personalization DB (WBS-4.1) and case archive lifecycle (WBS-4.2) with archive/restore/search/auto-archive/permanent delete.
2. **Case Flow Enhancements** – Case creation wizard (WBS-5.1), workspace sidebar real-time updates (WBS-5.2), complete client management (WBS-7.1), client-lawyer messaging channel (WBS-7.2).
3. **Scheduling & Notifications** – Schedule system (WBS-6.1) with calendar dependency, plus notification system using sockets (WBS-9.1) and NotificationBell component.
4. **Analytics & KPI** – Analytics page upgrade (WBS-8.1) + future extension (WBS-8.1-FUT), Team 4 forms validation (WBS-1.4 slice), KPI instrumentation for case creation (WBS-SM-KPI-02) and analytics readiness (WBS-SM-MVP-05).
5. **Dependencies & Ops** – Install `@fullcalendar/react`, `recharts`, `node-cron`; implement caching strategy, pagination, virtual scrolling, request dedupe, contract-first workflow (WBS-OPS-04), integration/E2E tests (WBS-TD-TS-02/03).

## Concerns / Risks Before Merge
- Large volume of database and socket changes increases conflict risk; contract-first docs must precede implementation.
- Notification/socket work touches shared hooks (`useSocket`, `Sidebar`)—needs coordination with other teams to avoid regressions.
- Schedule/calendar feature introduces heavy dependency footprint; wrap third-party libs behind adapters to limit bundle impact.
- Analytics and personalization features require privacy review and data retention policies before production.

## Manual Verification Plan
1. **Case Flow** – Execute multi-step case wizard including template selection, uploads, deadline auto-calc, duplicate detection, auto-numbering.
2. **Archive Lifecycle** – Archive case, verify hidden from active list, search archived list, restore, test 30-day scheduler and permanent delete with audit logs.
3. **Personalization** – Validate data capture per event, opt-out controls, and analytics feed-consuming views.
4. **Sidebar Real-time Updates** – Simulate case creation, messages, notifications; confirm counters update via socket + fallback polling.
5. **Schedule UX** – Test month/week/day, drag/drop reschedule, recurring events, reminders, Google sync handshake, conflict detection, courtroom resource booking.
6. **Client Management & Messaging** – CRUD clients, assign to cases, manage document access, send messages with attachments/read receipts/templates/notifications/search.
7. **Notifications** – Trigger each notification type, confirm read/unread toggles, preferences UI, web push + email channel behavior.
8. **Analytics Dashboard** – Validate each metric, custom date ranges, export (PDF/Excel), and performance with new charts/caching.
9. **Quality Gates** – Run API integration tests, E2E flows, and ensure Team 4 forms Zod schemas enforced.

## Pre-Merge Checklist
- Publish API/data contracts and migration plans for personalization, archive, messaging, schedule, notifications before writing code.
- Implement dependencies inside adapter modules with feature flags; keep existing routes functional until new flows meet parity.
- Provide migration scripts with rollback notes, update SSOT after each slice, and attach manual verification evidence.
- Coordinate with DevOps for sockets/push infrastructure and scheduling cron deployment before requesting merge.
