# Feature Catalog

Use this catalog to navigate to detailed guides for every client-facing feature. Each guide covers screens, state management, and backend dependencies.

| Feature | Description | Guide |
|---------|-------------|-------|
| Authentication | Clerk-powered login, verification, and guard rails | [Auth & Identity](features/auth.md) |
| Onboarding | Role-specific wizard + profile capture | [Onboarding Wizard](features/onboarding.md) |
| Workspace | Case board, sharing controls, AI widgets | [Workspace & Case Ops](features/workspace.md) |
| Dashboard | KPI widgets, admin views, AI insights | [Dashboard & Analytics](features/dashboard.md) |
| Documents | Uploads, AI summaries, PDF viewer | [Document Management](features/documents.md) |
| Schedule | Calendar, reminders, recurring events | [Scheduling & Calendar](features/schedule.md) |
| Community | Threads, replies, AI assistants, gamification | [Community Hub](features/community.md) |
| Legal Research | Statute search, filters, modals | [Legal Experience](features/legal.md) |
| Profile | Personal data, preferences, verification | [Profile & Preferences](features/profile.md) |
| Landing | Marketing pages, lead capture | [Landing Surfaces](features/landing.md) |

## Messaging & Collaboration Shortcuts
- **Find Lawyers** (`FindLawyersPage.jsx`) lets clients discover and contact verified attorneys using filters sourced from `/users` and metadata.
- **Chat** (`ChatPage.jsx`) provides Socket.io-driven 1:1 messaging with typing indicators and read receipts; it relies on `useChatStore` + `useMessageStore`.
- **Admin & Billing panels** live under `/dashboard/admin` and `/dashboard/billing`, consuming the same stores documented in the feature guides above.

> Source: advyon-client/src/pages/dashboard/FindLawyersPage.jsx (c73ac5a)
> Source: advyon-client/src/pages/dashboard/ChatPage.jsx (c73ac5a)
> Source: advyon-client/src/store/useMessageStore.js (c73ac5a)

For API mappings and data contracts, cross-reference the [Server API](../api/index.md) section.
