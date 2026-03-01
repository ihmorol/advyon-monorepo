# Features

The application is structured around these core functional areas.

## Authentication (`src/features/auth`)
Handles the user session flow using **Clerk**.
- **Login/Signup**: Redirects to Clerk hosted pages or handled via embedded components.
- **Onboarding**: Post-signup flow to determine user role (Lawyer/Client).

## Workspace (`src/features/workspace`)
The primary interface for Lawyers.
- **Case List**: Kanban or List view of active cases.
- **Case Detail**: Tabbed interface showing Documents, Calendar, and Messages for a specific case.

## Community (`src/features/community`)
Q&A Forum for legal professionals and clients.
- **Feed**: List of trending threads.
- **Thread View**: Detailed discussion with nested replies and voting mechanisms.

## Dashboard (`src/features/dashboard`)
The landing page after login.
- **Widgets**: Reusable dashboard cards (Recent Activity, Upcoming Deadlines).
- **Layout**: Grid-based layout that adapts to user role.

---

## New Features (Recent Updates)

### Find Lawyers (`src/pages/dashboard/FindLawyersPage.jsx`)

A lawyer directory allowing clients to find and connect with legal professionals.

**Features**:
- Browse all verified lawyers
- Search by name
- Filter by practice area (Criminal Law, Civil Law, Family Law, etc.)
- Pagination
- Quick actions: Email, Call, Chat

**Practice Areas Supported**:
- Criminal Law
- Civil Law
- Corporate Law
- Family Law
- Tax Law
- Labor Law
- Immigration Law
- Property Law
- Constitutional Law
- Environmental Law
- Intellectual Property
- Banking Law
- Human Rights
- Cyber Law

**UI Components**:
- Lawyer cards with avatar, name, practice area
- Verification badge (green checkmark)
- Experience years
- Bar council information
- Location
- Email/Call/Chat buttons

### Real-time Chat (`src/pages/dashboard/ChatPage.jsx`)

1-on-1 messaging between clients and lawyers with WebSocket support.

**Features**:
- Conversation list with last message preview
- Unread message count badges
- Real-time message delivery
- Typing indicators
- Read receipts (single/double check)
- Online status indicators
- Search/filter conversations
- Mobile-responsive design

**Technical Implementation**:
- Socket.io for real-time events
- Optimistic UI updates
- Pagination for message history
- Conversation rooms

**WebSocket Events**:
- `chat:join` - Join conversation room
- `chat:leave` - Leave conversation room
- `chat:typing` / `chat:stop-typing` - Typing indicators
- `chat:message` - New message received
- `chat:read` - Read receipt update

### Integration Flow

1. **Client finds lawyer**: `/dashboard/find-lawyers`
2. **Click Chat**: Creates conversation via API
3. **Redirect**: To `/dashboard/chat/:conversationId`
4. **Real-time chat**: Send/receive messages instantly

---

## Services (`src/services/`)

| Service | Purpose |
|---------|---------|
| `chat/chatService.js` | Real-time chat API calls |
| `users/userService.js` | Lawyer directory, user management |
| `cases/caseService.js` | Case CRUD operations |
| `documents/documentService.js` | Document management |
| `community/communityService.js` | Forum posts and replies |
| `ai/aiService.js` | AI tools and chat |

## Store Integration

| Store | Used By |
|-------|---------|
| `useChatStore.js` | ChatPage, socket events |
| `useAuthStore.js` | All pages (user role) |
| `useAIStore.js` | AIToolsPage, AIAssistant |
