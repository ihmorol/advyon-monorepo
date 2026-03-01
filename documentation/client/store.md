# State Management (Store)

Advyon uses **Zustand** for lightweight, global state management.

## Core Stores

| Store | File | Description |
|-------|------|-------------|
| **Auth Store** | `useAuthStore.js` | Stores user profile, role, and authentication status. |
| **Preferences** | `usePreferencesStore.js` | UI theme (dark/light), notification settings, and language. |

## Feature Stores

| Store | File | Description |
|-------|------|-------------|
| **AI Store** | `useAIStore.js` | Manages chat history with the Legal Assistant and analysis results. |
| **Activity** | `useActivityStore.js` | Caches recent user activities to reduce API calls. |
| **Community** | `useCommunityStore.js` | Manages threads, replies, and optimistically updates vote counts. |
| **Dashboard** | `useDashboardStore.js` | Stores widget configuration and cached stats. |
| **Messages** | `useMessageStore.js` | Manages inbox state (read/unread counts). |
| **Chat Store** | `useChatStore.js` | **NEW**: Manages real-time chat state, active conversation, typing indicators, optimistic messages |

## Usage Pattern

We use the "Slice" pattern where applicable, or separate stores for distinct domains to prevent unnecessary re-renders.

```javascript
import useAuthStore from '@/store/useAuthStore';

// Selector pattern to avoid re-renders
const user = useAuthStore((state) => state.user);
```

## Chat Store (NEW)

The Chat Store manages real-time messaging state:

```javascript
const {
  activeConversationId,
  setActiveConversation,
  optimisticMessages,
  addOptimisticMessage,
  removeOptimisticMessage,
  typingUsers,
  setUserTyping,
  setUserStopTyping,
} = useChatStore();
```

### State Structure

```javascript
{
  // Active conversation
  activeConversationId: string | null,
  
  // Optimistic messages (sent but not confirmed)
  optimisticMessages: Array<{
    _tempId: string,
    conversationId: string,
    senderId: object,
    content: string,
    status: string,
    createdAt: string,
    _isOptimistic: boolean
  }>,
  
  // Typing indicators per conversation
  typingUsers: Record<string, string[]>,
  
  // Actions
  setActiveConversation: (id) => void,
  addOptimisticMessage: (message) => void,
  removeOptimisticMessage: (tempId) => void,
  setUserTyping: (conversationId, userId) => void,
  setUserStopTyping: (conversationId, userId) => void
}
```

### Integration with WebSocket

The Chat Store integrates with Socket.io:

1. **Join/Leave**: Automatically joins conversation rooms
2. **Typing**: Tracks typing indicators in real-time
3. **Optimistic Updates**: Shows messages immediately while sending
4. **Read Receipts**: Updates when messages are read
