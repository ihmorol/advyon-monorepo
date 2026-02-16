# State Management (Store)

Advyon uses **Zustand** for lightweight, global state management.

## Core Stores

| Store | File | Description |
|---|---|---|
| **Auth Store** | `useAuthStore.js` | Stores user profile, role, and authentication status. |
| **Preferences** | `usePreferencesStore.js` | UI theme (dark/light), notification settings, and language. |

## Feature Stores

| Store | File | Description |
|---|---|---|
| **AI Store** | `useAIStore.js` | Manages chat history with the Legal Assistant and analysis results. |
| **Activity** | `useActivityStore.js` | Caches recent user activities to reduce API calls. |
| **Community** | `useCommunityStore.js` | Manages threads, replies, and optimistically updates vote counts. |
| **Dashboard** | `useDashboardStore.js` | Stores widget configuration and cached stats. |
| **Messages** | `useMessageStore.js` | Manages inbox state (read/unread counts). |

## Usage Pattern

We use the "Slice" pattern where applicable, or separate stores for distinct domains to prevent unnecessary re-renders.

```javascript
import useAuthStore from '@/store/useAuthStore';

// Selector pattern to avoid re-renders
const user = useAuthStore((state) => state.user);
```
