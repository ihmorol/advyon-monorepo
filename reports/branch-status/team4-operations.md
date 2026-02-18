# Team 4 - Core Practice Operations

## Branch Identity
- Workflow doc branch: `sif/feat/core-practice-operations`
- SSOT / execution alias: `sif/feat/core-practice-operations`
- Owners: backend-lead, frontend-lead, database-architect, data-engineer pod
- Code areas: case/schedule/client/message/socket/analytics modules in server + upcoming dashboard pages/hooks

## Current Status (2026-02-18)
- Server modules for schedule, notification, messaging, personalization, analytics, socket, and archive automation are merged in `advyon-server/src/app/modules/*`.
- Client only contains dependency scaffolding (`advyon-client/package.json` includes `@fullcalendar/*`, `recharts`, `socket.io-client`), but no UI landed yet.
- Verification is blocked: server `npm install` cannot fetch `stripe/node-cron/uuid`, so `cmd /c npm run build` fails and no Jest suites run; client `cmd /c npm run build` fails because Node is v22.11.0 (<22.12).

## Completed Work to Date
- Server-side schedule service/controller/validation with conflict detection and recurrence support (`src/app/modules/schedule/*`).
- Messaging, notification, and socket services (`src/app/modules/message/*`, `notification/*`, `socket/socket.service.ts`).
- Analytics/KPI extensions plus personalization/user preference modules (`src/app/modules/analytics/*`, `user.personalization.*`).
- Archive scheduler and task generator for case lifecycle automation (`src/app/modules/case/archive-scheduler.ts`, `task.generator.ts`).

## Outstanding Scope Summary
1. **Client Experience** - Build the dashboard schedule, notification center, messaging, personalization, and analytics UI; dependencies are installed but unused.
2. **Tooling & Tests** - Resolve server `npm install`/`tsc` failures and React 19 lint/build issues to run API/Jest suites for schedule, notifications, messaging, personalization, and analytics.
3. **Manual Evidence** - Execute the Team 4 manual plan (case wizard, archive lifecycle, personalization, sidebar real-time, schedule UX, messaging, notifications, analytics) and attach logs/screens.
4. **Performance & Privacy** - Validate data retention, personalization opt-outs, and socket scaling impacts once tooling allows runtime testing.

## Concerns / Risks Before Merge
- Lack of automated tests plus missing npm dependencies means none of the new APIs have been executed locally; cron jobs (archive scheduler) cannot be validated without `node-cron`.
- Client UI does not yet consume the new APIs, so contracts could drift without reference implementations or Postman evidence.
- Manual verification plan is extensive; without build/test logs the SSOT rows must remain `NS`/`IP` and release cannot proceed.

## Manual Verification Plan
1. **Case wizard** - Complete multi-step wizard with uploads/templates/deadlines/duplicate detection/auto-numbering.
2. **Archive lifecycle** - Archive/search/restore/permanent delete; verify auto-archive scheduler + audit logs.
3. **Personalization** - Confirm event tracking, opt-out controls, analytics consumption, data retention policy.
4. **Sidebar real-time** - Trigger case/message/notification events; observe socket/fallback behavior.
5. **Schedule UX** - Month/week/day views, drag/drop, recurring events, reminders, Google sync, conflict detection, courtroom booking.
6. **Client management & messaging** - CRUD clients, assign to cases, send attachments/read receipts/templates/notifications/search.
7. **Notifications** - Test each notification type, mark read/unread, adjust preferences, validate web push + email channel.
8. **Analytics** - Validate metrics, custom date range, PDF/Excel exports, chart performance.
9. **Validation/tests** - Run Zod schemas for Team 4 forms, API integration tests, and E2E flows once tooling is restored.

## Pre-Merge Checklist
- [ ] Fix server dependency install (`npm install`), rerun `cmd /c npm run lint`, `cmd /c npm run build`, and targeted Jest covering schedule/notification/message modules.
- [ ] Upgrade Node for the client so Vite builds succeed; wire new UI as soon as feasible or document the decision to ship server-only APIs.
- [ ] Execute the manual verification suites and capture evidence for every WBS row.
- [ ] Update SSOT with links to logs, manual artifacts, and follow-up tickets for any deferred UI work.
