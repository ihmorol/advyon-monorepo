# Routing

Client-side routing is handled by **React Router v6**.

## Router Structure

Routes are defined in `src/routes/index.jsx`.

### Public Routes (AppLayout)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page |
| `/auth/signin` | SignInPage | Login page |
| `/auth/signup` | SignUpPage | Registration page |
| `/auth/success` | AuthSuccessPage | Auth callback |
| `/onboarding` | OnboardingPage | Role selection |
| `/contact` | ContactPage | Contact form |
| `/about` | AboutPage | About us |
| `/how-to-use` | HowToUsePage | How to use guide |
| `/blog` | BlogPage | Blog posts |
| `/terms` | TermsPage | Terms of service |
| `/privacy` | PrivacyPage | Privacy policy |
| `/cookies` | CookiePolicyPage | Cookie policy |
| `/security` | SecurityPage | Security info |
| `/accessibility` | AccessibilityPage | Accessibility statement |

### Protected Routes (DashboardLayout)

| Route | Page | Description | Role |
|-------|------|-------------|------|
| `/dashboard` | Dashboard | Main dashboard | All |
| `/dashboard/workspace` | WorkspacePage | Case management | All |
| `/dashboard/workspace/:caseId` | WorkspacePage | Case details | All |
| `/dashboard/cases/new` | CreateCasePage | Create new case | All |
| `/dashboard/cases/active` | ComingSoonPage | Active cases | All |
| `/dashboard/cases/archived` | ComingSoonPage | Archived cases | All |
| `/dashboard/documents` | MyDocumentsPage | Document list | All |
| `/dashboard/schedule` | SchedulePage | Calendar | All |
| `/dashboard/schedule/new` | CreateEventPage | Create event | All |
| `/dashboard/community` | CommunityHubPage | Forum | All |
| `/dashboard/community/ask` | CommunityHubPage | Ask question | All |
| `/dashboard/community/thread/:threadId` | ThreadDetailPage | Thread detail | All |
| `/dashboard/legal` | LegalSearchPage | Legal search | All |
| `/dashboard/profile` | ProfilePage | User profile | All |
| `/dashboard/profile/verify` | LawyerVerificationPage | Lawyer verification | Lawyer |
| `/dashboard/find-lawyers` | **FindLawyersPage** | Lawyer directory | Client |
| `/dashboard/chat` | **ChatPage** | Messages list | All |
| `/dashboard/chat/:conversationId` | **ChatPage** | Chat detail | All |
| `/dashboard/ai-assistant` | AIToolsPage | AI tools | All |
| `/dashboard/workspace/doc/:docId` | DocumentViewerPage | Document viewer | All |
| `/dashboard/review/:docId` | TextReviewPage | Text review | All |
| `/dashboard/clients` | ClientsPage | My clients | Lawyer+ |
| `/dashboard/analytics` | AnalyticsPage | Analytics | Lawyer+ |
| `/dashboard/admin` | AdminPanelPage | Admin panel | Admin |
| `/dashboard/billing` | BillingPage | Subscription | All |
| `/dashboard/settings` | ComingSoonPage | Settings | All |
| `/dashboard/legal-database` | ComingSoonPage | Legal DB | All |

## Route Protection

We use `RequireRole` component to enforce roles:

```jsx
import RequireRole from '@/components/auth/RequireRole';

// Admin only route
<RequireRole allowedRoles={['admin', 'superAdmin']}>
  <AdminPanelPage />
</RequireRole>

// Lawyer and admin
<RequireRole allowedRoles={['lawyer', 'admin']}>
  <AnalyticsPage />
</RequireRole>
```

## Navigation

Navigation is handled by:
- **Sidebar**: Left navigation menu with role-based links
- **Navbar**: Top navigation with search and profile
- **Direct links**: From pages like FindLawyers → Chat

## New Features

### Find Lawyers (Client → Lawyer Connection)

- **Route**: `/dashboard/find-lawyers`
- **Purpose**: Browse and search verified lawyers
- **Features**: 
  - Search by name
  - Filter by practice area
  - Pagination
  - Direct Chat/Email/Call actions

### Real-time Chat

- **Route**: `/dashboard/chat` and `/dashboard/chat/:conversationId`
- **Purpose**: 1-on-1 messaging between clients and lawyers
- **Features**:
  - Real-time WebSocket messaging
  - Typing indicators
  - Read receipts
  - Online status
  - Conversation list
