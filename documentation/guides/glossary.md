# Glossary

| Term | Definition | Source |
|------|------------|--------|
| CaseAccess | Mongo collection that grants per-case permissions (`viewer`, `editor`, `admin`) beyond global roles; used whenever sharing a matter with clients or co-counsel. | `advyon-server/src/app/modules/caseAccess` |
| Auto-Filing | Document workflow that moves files into suggested folders once AI confidence passes thresholds; tracked via `document.autoFiling` and surfaced in the workspace UI. | `advyon-server/src/app/modules/document/document.model.ts` |
| AI Tools | Server-side helpers keyed by `toolKey` (`legal_research`, `document_summarize`, etc.) run through `/ai/tools/:toolKey/run`, with history stored in `AIToolHistory`. | `advyon-server/src/app/modules/ai/ai.route.ts` |
| Clerk Sync | `/auth/sync` endpoint that replicates a Clerk user into Mongo, assigning default role, preferences, and optional profile scaffolding. | `advyon-server/src/app/modules/auth/auth.route.ts` |
| Unified Dashboard | `/dashboard/unified` endpoint + `useDashboardStore.fetchUnifiedDashboard()` returning stats, insights, and KPIs in one call. | `advyon-client/src/store/useDashboardStore.js` |
| Community Assist | Suite of endpoints (`/community/assist/similar`, `smart-tags`, `answer-suggestion`, `legal-references`) providing AI help for posts/replies. | `advyon-client/src/store/useCommunityStore.js`; `advyon-server/src/app/modules/community` |
| Engagement Event | Row in `CommunityEngagementEventModel` capturing thread/reply events; fuels analytics and anti-abuse heuristics. | `advyon-server/src/app/modules/community/community.kpi.model.ts` |
| Gamification Points | `User.points` + `weeklyPoints` fields updated through `GamificationService` when users post, reply, or receive votes. | `advyon-server/src/app/modules/gamification/gamification.service.ts` |
| Sidebar Counters | WebSocket-driven indicators (messages, alerts, cases) updated via `socketService.notifySidebarUpdate`. | `advyon-server/src/app/modules/socket/socket.service.ts` |
| Support KPI | Daily aggregated metrics derived from `SupportTicketMetric` and `ContactTicket` data, fetched via `/analytics/support-tickets`. | `advyon-server/src/app/modules/analytics/support-ticket-metric.model.ts` |

> Source: advyon-server/src/app/modules/caseAccess/caseAccess.model.ts (c73ac5a)
> Source: advyon-server/src/app/modules/document/document.model.ts (c73ac5a)
> Source: advyon-server/src/app/modules/ai/ai.tool.model.ts (c73ac5a)
> Source: advyon-server/src/app/modules/auth/auth.route.ts (c73ac5a)
> Source: advyon-client/src/store/useDashboardStore.js (c73ac5a)
> Source: advyon-client/src/store/useCommunityStore.js (c73ac5a)
> Source: advyon-server/src/app/modules/community/community.kpi.model.ts (c73ac5a)
> Source: advyon-server/src/app/modules/gamification/gamification.service.ts (c73ac5a)
> Source: advyon-server/src/app/modules/socket/socket.service.ts (c73ac5a)
> Source: advyon-server/src/app/modules/analytics/support-ticket-metric.model.ts (c73ac5a)

