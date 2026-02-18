# Task Packet · WBS-SM-KPI-07 Support Ticket Volume Tracking

## Objective
Capture every public contact/support submission as a KPI so Ops can monitor ticket volume, channel mix, urgency load, and SLA trends directly from analytics dashboards.

## In-Scope Files
- `advyon-server/src/app/modules/analytics/support-kpi.service.ts` (new)
- `advyon-server/src/app/modules/analytics/analytics.route.ts` (expose KPI endpoint)
- `advyon-server/src/app/modules/contact/contact.service.ts` (emit events)
- `advyon-server/src/app/modules/contact/contact.model.ts`
- `advyon-server/src/app/modules/analytics/analytics.controller.ts`
- Evidence docs under `docs/task-orchestration/evidence/`

## Out-of-Scope
- Client dashboards/visualizations (Team 4)
- Historical migration of legacy tickets (none exist)
- Alerting/notifications (future WBS)

## KPI Contract
- Store per-day aggregates:
  - `date` (UTC), `totalTickets`, breakdowns by `topicKey`, `urgencyKey`, `source`.
  - `avgFirstResponseMinutes` placeholder (future once staffed)
- Expose `GET /analytics/support-tickets?range=30d` returning:
  ```jsonc
  {
    "period": "30d",
    "totalTickets": 42,
    "byUrgency": [{ "key": "critical-24h", "count": 8 }],
    "byTopic": [{ "key": "ai-compliance", "count": 10 }],
    "dailyTrend": [{ "date": "2026-02-17", "count": 6 }]
  }
  ```

## Data / Schema Changes
- `SupportTicketMetric` model with schema:
  - `date: string (YYYY-MM-DD)`
  - `counts.total`
  - `counts.byUrgency`, `counts.byTopic`, `counts.bySource`
  - `updatedAt`
- Aggregation pipeline in service to compute stats on demand (no cron yet).

## Acceptance Checklist Mapping
- Contact/support events instrumented → service records metric per submission.
- KPI accessible via API → new analytics endpoint documented + test evidence.
- Supports future dashboards → data includes breakdowns + trends.

## Test Plan
- Unit test `SupportKpiService.recordTicket` ensures counters increment and date bucket created.
- Integration test hitting `/analytics/support-tickets` returns aggregated payload.
- Manual check: submit two contact tickets with different urgency; confirm endpoint reflects counts.

## Rollback Plan
- Feature flag `SUPPORT_KPI_ENABLED` default true; disable to stop recording.
- Remove analytics route or revert commits if causing regression (contact flow unaffected).

## Risks / Blockers
- Volume might be low initially; ensure code handles zero-data.
- Without background job counts rely on upsert per submission; guard with optimistic concurrency (use `$inc` with updates).
