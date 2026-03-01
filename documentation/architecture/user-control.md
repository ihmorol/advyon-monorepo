# User Control & RBAC Diagram

## Role Taxonomy
| Role | Description | Sample Permissions |
|------|-------------|--------------------|
| `superAdmin` | Platform owners with global control | Toggle `SystemSettings`, run support KPIs, view every payment via `/payments/all` |
| `admin` | Firm-level administrators | Manage users via `/admin/**`, share cases, review analytics/support tickets |
| `lawyer` | Primary workspace users | Create/update cases, upload documents, schedule events, share cases they own |
| `client` | External clients invited to collaborate | Read assigned cases, upload/request documents, participate in community |
| `judge` | Read-only oversight role (profile scaffolded) | Consume shared case timelines & schedules |
| `student` | Future training role | Currently treated as least-privileged (read-only where allowed) |

> Source: advyon-server/src/app/modules/user/user.constant.ts (c73ac5a)

## Layered Authorization Model
1. **Global role guards** - `auth(...requiredRoles)` sits before controllers (e.g., `/payments/all` requires `admin` or `superAdmin`; `/case-access/share` allows `admin/superAdmin/lawyer`).
2. **Case-level ACLs** - `CaseAccessModel` stores `role` + `status` for each user/case pair. Routes fetch these records to confirm viewing/downloading rights beyond the global role.
3. **Feature flags** - `SystemSettings.features` toggles AI tools, community hub, billing, and notifications; UI reads them to hide modules while APIs still enforce roles.
4. **Client-side hints** - `<RequireRole>` prevents navigation to unauthorized React routes, but server validation remains the source of truth.

> Source: advyon-server/src/app/modules/caseAccess/caseAccess.route.ts (c73ac5a)
> Source: advyon-server/src/app/modules/admin/systemSettings.model.ts (c73ac5a)
> Source: advyon-client/src/components/auth/RequireRole.jsx (c73ac5a)

## Module Permissions Matrix
| Module | Routes | Allowed Roles | Notes |
|--------|--------|---------------|-------|
| Case Access | `/case-access/share`, `/case-access/:caseId/users`, `/case-access/:caseId/:userId` | `admin`, `superAdmin`, `lawyer` | Governs sharing and revocation; clients gain access only through granted entries |
| Analytics Support KPIs | `/analytics/support-tickets` | `admin`, `superAdmin` | Other analytics endpoints use general auth (any signed-in user) |
| Payments | `/payments/all` | `admin`, `superAdmin` | `/payments/me` available to any authenticated user; `/payments/webhook` is unauthenticated but guarded by Stripe signature |
| Subscriptions | `/subscriptions/**` | Authenticated users (clients, lawyers) | Plans endpoint public, but checkout/portal/cancel require JWT |
| Notifications | `/notifications/send-test` | `admin` | Rest of notification feeds available to the authenticated recipient only |
| AI Tool Metrics | `/ai/tools/metrics` | `lawyer`, `admin`, `superAdmin` | Protects firm-wide usage dashboards while still allowing all roles to chat with AI |

> Source: advyon-server/src/app/modules/analytics/analytics.route.ts (c73ac5a)
> Source: advyon-server/src/app/modules/payment/payment.route.ts (c73ac5a)
> Source: advyon-server/src/app/modules/subscription/subscription.route.ts (c73ac5a)
> Source: advyon-server/src/app/modules/notification/notification.route.ts (c73ac5a)
> Source: advyon-server/src/app/modules/ai/ai.route.ts (c73ac5a)

## RBAC & Sharing Diagram
```mermaid
graph TB
    SA(superAdmin)
    AD(admin)
    LW(lawyer)
    CL(client)

    subgraph Global Guards
        SA --> AdminAPI[/admin routes/]
        AD --> AdminAPI
        LW --> CaseAPI[/cases & documents/]
        CL --> CaseAPI
    end

    subgraph Case Scope
        CaseAPI -->|creates| Case((Case))
        Case --> CaseAccess[(CaseAccess)]
        CaseAccess -->|viewer/editor/admin| CL
        CaseAccess --> LW
    end

    subgraph Features
        LW -->|analytics| AnalyticsDash
        AD -->|support KPIs| AnalyticsDash
        SA -->|system toggles| Settings
        CL -->|billing| SubscriptionPortal
```

## Governance Workflows
- **Auditing**: Every admin mutation writes to `AuditLog` (action, actor, target, IP). Combined with Activity feeds, this enables compliance reports.
- **Gamification**: `GamificationService` awards/deducts points when users post or receive votes. Weekly resets run through cron to keep leaderboards fair.
- **Community Moderation**: `CommunityModerationService` stores AI risk scores; staffers (admins) can review and resolve appeals using dedicated endpoints.

> Source: advyon-server/src/app/modules/admin/auditLog.model.ts (c73ac5a)
> Source: advyon-server/src/app/modules/gamification/gamification.service.ts (c73ac5a)
> Source: advyon-server/src/app/modules/community/community.moderation.model.ts (c73ac5a)

## Client Experience Hooks
- Dashboard routes wrap `RequireRole`, while top-level navigation hides items when `useAuthStore.user.role` is insufficient.
- Zustand stores (`useCasesStore`, `useDocumentsStore`, `useMessageStore`) all assume the backend enforces scoping; they only cache resources tied to the authenticated user or shared cases.
- When roles change (via onboarding or admin actions), `useAuthStore.fetchProfile()` is re-invoked so the UI reroutes instantly.

> Source: advyon-client/src/routes/index.jsx (c73ac5a)
> Source: advyon-client/src/store/useMessageStore.js (c73ac5a)
> Source: advyon-client/src/store/useDocumentsStore.js (c73ac5a)

