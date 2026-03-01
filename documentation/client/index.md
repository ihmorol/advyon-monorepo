# Frontend Documentation

## Overview

The Advyon frontend is a **Single Page Application (SPA)** built with React 18, TypeScript, and Vite. It provides a modern, responsive interface for the legal practice management platform.

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI Framework |
| Vite | 5.x | Build Tool & Dev Server |
| TypeScript | 5.x | Type Safety |
| JavaScript | ES2022 | Language |

### UI & Styling

| Technology | Purpose |
|------------|---------|
| Tailwind CSS | Utility-first CSS |
| Shadcn UI | Accessible Components |
| Lucide React | Icons |
| React Markdown | Markdown Rendering |

### State Management

| Technology | Purpose |
|------------|---------|
| Zustand | Client State |
| TanStack Query | Server State |
| React Context | Theme/Auth Context |

### Routing & Navigation

| Technology | Purpose |
|------------|---------|
| React Router 6 | Client-side Routing |
| Clerk React | Auth Navigation |

## Directory Structure

```
advyon-client/
├── public/                     # Static assets
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── main.jsx                # Entry point
│   ├── App.jsx                 # Root component
│   ├── index.css               # Global styles
│   │
│   ├── routes/                 # Routing
│   │   └── index.jsx          # Route definitions
│   │
│   ├── components/            # Shared components
│   │   ├── ui/                # Shadcn UI components
│   │   │   ├── button.jsx
│   │   │   ├── input.jsx
│   │   │   ├── card.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── select.jsx
│   │   │   ├── table.jsx
│   │   │   ├── calendar.jsx
│   │   │   ├── form.jsx
│   │   │   └── ...
│   │   ├── layout/            # Layout components
│   │   │   ├── AppLayout.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   ├── auth/              # Auth components
│   │   │   └── RequireRole.jsx
│   │   ├── 3d/                # Three.js components
│   │   │   └── LegalScene.jsx
│   │   │
│   │   ├── AIAssistant.jsx    # AI chat widget
│   │   ├── AIAssistantProvider.jsx
│   │   ├── SmartFileUploader.jsx
│   │   └── RouteErrorBoundary.jsx
│   │
│   ├── pages/                 # Page components
│   │   ├── auth/
│   │   │   ├── SignInPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   └── AuthSuccessPage.jsx
│   │   │
│   │   ├── dashboard/         # Protected pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── WorkspacePage.jsx
│   │   │   ├── CreateCasePage.jsx
│   │   │   ├── SchedulePage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── AnalyticsPage.jsx
│   │   │   ├── CommunityHubPage.jsx
│   │   │   ├── AIToolsPage.jsx
│   │   │   ├── BillingPage.jsx
│   │   │   ├── ClientsPage.jsx
│   │   │   ├── MyDocumentsPage.jsx
│   │   │   ├── DocumentViewerPage.jsx
│   │   │   ├── TextReviewPage.jsx
│   │   │   ├── ThreadDetailPage.jsx
│   │   │   ├── AskQuestionPage.jsx
│   │   │   ├── LawyerVerificationPage.jsx
│   │   │   └── AdminPanelPage.jsx
│   │   │
│   │   └── public/            # Public pages
│   │       ├── Home.jsx
│   │       ├── AboutPage.jsx
│   │       ├── ContactPage.jsx
│   │       ├── BlogPage.jsx
│   │       ├── CareersPage.jsx
│   │       ├── HowToUsePage.jsx
│   │       ├── TermsPage.jsx
│   │       ├── PrivacyPage.jsx
│   │       ├── CookiePolicyPage.jsx
│   │       ├── SecurityPage.jsx
│   │       ├── AccessibilityPage.jsx
│   │       └── ComingSoonPage.jsx
│   │
│   ├── features/              # Feature modules
│   │   ├── workspace/
│   │   │   ├── components/
│   │   │   │   ├── WorkspaceView.jsx
│   │   │   │   ├── DashboardView.jsx
│   │   │   │   ├── CaseCard.jsx
│   │   │   │   ├── CreateCaseModal.jsx
│   │   │   │   ├── ParticipantsModal.jsx
│   │   │   │   ├── PermissionsToggles.jsx
│   │   │   │   └── ...
│   │   │   └── index.js
│   │   │
│   │   ├── community/
│   │   ├── profile/
│   │   └── schedule/
│   │
│   ├── services/             # API services
│   │   ├── _shared/
│   │   │   └── apiClient.js
│   │   ├── auth/
│   │   │   ├── auth.service.js
│   │   │   └── authService.js
│   │   ├── cases/
│   │   ├── documents/
│   │   ├── users/
│   │   ├── messages/
│   │   ├── notifications/
│   │   ├── community/
│   │   ├── schedule/
│   │   ├── ai/
│   │   ├── billing/
│   │   └── admin/
│   │
│   ├── store/                # Zustand stores
│   │   ├── useAuthStore.js
│   │   ├── useAIStore.js
│   │   ├── useCommunityStore.js
│   │   ├── useDashboardStore.js
│   │   ├── useScheduleStore.js
│   │   ├── useMessageStore.js
│   │   ├── useActivityStore.js
│   │   ├── usePreferencesStore.js
│   │   ├── cases.js
│   │   ├── documents.js
│   │   ├── legal.js
│   │   └── onboarding.js
│   │
│   ├── hooks/                # Custom hooks
│   │   ├── useAuthApi.js
│   │   ├── useSocket.js
│   │   ├── useMobile.jsx
│   │   ├── useBootSequence.js
│   │   ├── useDocumentDownload.js
│   │   └── useSmartUpload.js
│   │
│   ├── layouts/              # Layout wrappers
│   │   ├── AppLayout.jsx
│   │   ├── DashboardLayout.jsx
│   │   └── AuthLayout.jsx
│   │
│   └── lib/                  # Utilities
│       ├── api/
│       │   ├── api.js
│       │   └── apiErrorHandler.js
│       ├── config/
│       │   └── env.js
│       ├── validation/
│       │   ├── authSchemas.js
│       │   └── documentSchemas.js
│       └── stripe/
│           └── stripeClient.js
│
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Application Entry Point

### main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AIAssistantProvider } from "./components";
import { router } from "./routes";
import "./index.css";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <AIAssistantProvider>
          <RouterProvider router={router} />
        </AIAssistantProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
);
```

## Routing

### Route Structure

Routes are defined in `src/routes/index.jsx` using React Router 6:

```jsx
export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'auth', element: <AuthLayout /> },
      { path: 'about', element: <AboutPage /> },
      // ...
    ]
  },
  
  // Protected Routes
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'workspace', element: <WorkspacePage /> },
      { path: 'schedule', element: <SchedulePage /> },
      // ...
    ]
  }
]);
```

### Protected Routes

Protected routes are wrapped with `RequireRole` component:

```jsx
<RequireRole allowedRoles={['lawyer', 'admin']}>
  <AnalyticsPage />
</RequireRole>
```

## State Management

### Zustand Stores

The application uses Zustand for client-side state management:

#### useAuthStore

```javascript
const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false })
}));
```

#### useAIStore

Manages AI chat, tool execution, and analysis:

```javascript
const useAIStore = create((set, get) => ({
  histories: { global: [] },
  isSending: false,
  
  sendMessage: async (caseId, message) => {
    set({ isSending: true });
    // API call...
  },
  
  analyzeDocument: async (documentId) => {
    // Document analysis...
  },
  
  runTool: async (toolKey, input) => {
    // Tool execution...
  }
}));
```

### TanStack Query

Server state is managed with TanStack Query (React Query):

```javascript
const { data, isLoading, error } = useQuery({
  queryKey: ['cases', caseId],
  queryFn: () => caseService.getCase(caseId),
  enabled: !!caseId
});
```

## API Client

### Configuration

The API client is configured in `src/services/_shared/apiClient.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - adds auth token
api.interceptors.request.use((config) => {
  const token = window.Clerk?.session?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors...
    return Promise.reject(error);
  }
);

export default api;
```

## Components

### UI Components (Shadcn)

The application uses Shadcn UI components located in `src/components/ui/`:

| Component | Purpose |
|-----------|---------|
| Button | Clickable actions |
| Input | Text input fields |
| Card | Content containers |
| Dialog | Modal dialogs |
| Select | Dropdown selection |
| Table | Data tables |
| Calendar | Date picker |
| Form | Form with validation |
| Tabs | Tabbed interface |
| Badge | Status labels |
| Avatar | User images |

### Layout Components

| Component | Purpose |
|-----------|---------|
| AppLayout | Public pages wrapper |
| DashboardLayout | Protected pages wrapper |
| AuthLayout | Auth pages wrapper |
| Navbar | Top navigation |
| Sidebar | Left navigation |
| Footer | Page footer |

### Custom Components

#### AIAssistant

Floating AI chat widget:

```jsx
<AIAssistant isOpen={isOpen} onToggle={toggle} />
```

#### SmartFileUploader

Drag-drop file upload:

```jsx
<SmartFileUploader
  caseId={caseId}
  onUploadComplete={handleUpload}
/>
```

## Pages

### Public Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page |
| About | `/about` | About us |
| Contact | `/contact` | Contact form |
| SignIn | `/auth/signin` | Login |
| SignUp | `/auth/signup` | Registration |

### Dashboard Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard` | Main dashboard |
| Workspace | `/dashboard/workspace` | Case management |
| Schedule | `/dashboard/schedule` | Calendar |
| Documents | `/dashboard/documents` | Document list |
| Community | `/dashboard/community` | Forum |
| AI Tools | `/dashboard/ai-assistant` | AI assistant |
| Profile | `/dashboard/profile` | User profile |
| Analytics | `/dashboard/analytics` | Analytics (Lawyer) |
| Clients | `/dashboard/clients` | Client list (Lawyer) |
| Admin | `/dashboard/admin` | Admin panel |
| Billing | `/dashboard/billing` | Subscription |

## Services

API services are organized by feature:

```
services/
├── auth/
│   └── auth.service.js
├── cases/
│   └── caseService.js
├── documents/
│   └── documentService.js
├── users/
│   └── userService.js
├── messages/
├── notifications/
├── community/
├── schedule/
├── ai/
│   ├── ai.service.js
│   └── aiTools.service.js
├── billing/
│   └── billingService.js
└── admin/
    └── adminService.js
```

### Example Service

```javascript
// services/cases/caseService.js
import api from '../_shared/apiClient';

export const caseService = {
  getCases: (params) => api.get('/cases', { params }),
  getCase: (id) => api.get(`/cases/${id}`),
  createCase: (data) => api.post('/cases', data),
  updateCase: (id, data) => api.put(`/cases/${id}`, data),
  deleteCase: (id) => api.delete(`/cases/${id}`),
  archiveCase: (id) => api.patch(`/cases/${id}/archive`)
};
```

## Authentication

### Clerk Integration

The app uses Clerk for authentication:

```jsx
// Sign in
const { signIn } = useClerk();
signIn.signInWithUsername({ username, password });

// Get token
const token = await clerk.session.getToken();

// Sign out
const { signOut } = useClerk();
signOut();
```

### Auth Flow

1. User clicks "Sign In"
2. Redirected to Clerk
3. After success, redirected to `/auth/success`
4. Backend syncs user data
5. User redirected to `/dashboard`

## Environment Variables

Create `.env` file:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:5000/api/v1
```

## Development

### Running the App

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

### Building

The app uses Vite for building:

```bash
npm run build
# Output: dist/
```

---

*Last Updated: March 2026*
