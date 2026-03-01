# Feature Case Studies

## 1. Solo Attorney Intake to Insights
**Scenario**: A lawyer signs in, creates a new case, uploads evidence, and receives AI insights before a hearing.
1. The lawyer authenticates via Clerk, then `useAuthStore.fetchProfile()` hydrates local state using `/users/me/profile`.
2. From `WorkspacePage`, the attorney triggers `useCasesStore.createCase()`, which hits `POST /cases` with title, type, urgency, and deadline metadata. The backend validates via `CaseValidation.createCaseValidation` and persists the record with `Case` + `Activity` entries.
3. Evidence upload uses `useDocumentsStore.uploadDocument()` -> `POST /cases/:caseId/documents`. `fileUploadSecurity` enforces MIME/extension/size limits before streaming to Cloudinary. `DocumentControllers` save the row with `processingStatus=pending`.
4. `useAIStore.analyzeDocument()` calls `POST /ai/documents/analyze` to kick off the AI adapter. When finished, Socket.io emits `analysis:complete` so the lawyer sees summaries and legal references inline.
5. `useDashboardStore.fetchUnifiedDashboard()` pulls `/dashboard/unified`, allowing the lawyer to view AI insights and upcoming deadlines compiled from `analytics` + `insight` modules.

> Source: advyon-client/src/store/useAuthStore.js (c73ac5a)
> Source: advyon-client/src/store/cases.js (c73ac5a)
> Source: advyon-server/src/app/modules/case/case.route.ts (c73ac5a)
> Source: advyon-client/src/store/documents.js (c73ac5a)
> Source: advyon-server/src/app/middlewares/fileUploadSecurity.ts (c73ac5a)
> Source: advyon-server/src/app/modules/ai/ai.route.ts (c73ac5a)
> Source: advyon-client/src/store/useDashboardStore.js (c73ac5a)

## 2. Client Collaboration & Access Control
**Scenario**: An admin shares a case with a client who then contributes documents and messages.
1. Admin selects a case and calls `/case-access/share` through the case drawer UI (server restricts to `admin`, `superAdmin`, or `lawyer`). `CaseAccessController.shareCase` writes a row with role `viewer`/`editor` depending on payload.
2. The client logs in, `useCasesStore.fetchCases()` now returns shared matters because server-side queries join CaseAccess.
3. The client uploads receipts via `useDocumentsStore.uploadDocument()` and monitors AI processing status through `/cases/:caseId/documents/:documentId/status` polls.
4. Any chat or structured message goes through `useMessageStore.sendMessage()` -> `POST /messages`, storing attachments and triggering notifications for attorneys.
5. Case admins can revoke or downgrade access through `/case-access/:caseId/:userId`, immediately removing shares and purging caches on the frontend.

> Source: advyon-server/src/app/modules/caseAccess/caseAccess.route.ts (c73ac5a)
> Source: advyon-client/src/store/cases.js (c73ac5a)
> Source: advyon-client/src/store/documents.js (c73ac5a)
> Source: advyon-client/src/store/useMessageStore.js (c73ac5a)

## 3. Community Engagement & Reputation Loop
**Scenario**: A community member asks a legal question, receives AI assistance, and gains reputation through accepted answers.
1. `CommunityHubPage` invokes `useCommunityStore.createThread()`, which sanitizes input, maps category IDs, and POSTs to `/community/threads`. The backend runs AI moderation (OpenRouter) before publishing and awarding `CREATE_THREAD` points.
2. Other users use `useCommunityStore.fetchThreads()` + filters (category, search) to discover the post. AI assist endpoints `/community/assist/similar`, `/assist/smart-tags`, `/assist/answer-suggestion` help reduce duplicates and craft responses.
3. When a reply is accepted via `/community/threads/:threadId/accept`, `GamificationService.awardPoints('ACCEPTED_ANSWER')` updates user totals. Leaderboards update automatically thanks to `User.points` fields and the `getTopContributors` endpoint.
4. Engagement metrics stream into `CommunityEngagementEventModel` and can be surfaced through analytics dashboards or exported for ops reviews.

> Source: advyon-client/src/store/useCommunityStore.js (c73ac5a)
> Source: advyon-server/src/app/modules/community/community.service.ts (c73ac5a)
> Source: advyon-server/src/app/modules/gamification/gamification.service.ts (c73ac5a)
> Source: advyon-server/src/app/modules/community/community.kpi.model.ts (c73ac5a)

