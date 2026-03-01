# Chat API

## Overview

The Chat module provides real-time 1-on-1 messaging between clients and lawyers. It uses WebSocket for real-time updates and MongoDB for persistent storage.

## Base URL

```
/api/v1/chat
```

## Models

### Conversation Model

Represents a 1-on-1 chat between two users.

```typescript
{
  _id: ObjectId,
  participants: ObjectId[],    // Exactly 2 users
  lastMessage: String,        // Preview of last message
  lastMessageAt: Date,       // For sorting
  unreadCounts: Map<String, Number>,  // Per-user unread count
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `{ participants: 1 }` - Find conversations between users
- `{ lastMessageAt: -1 }` - Sort by recent

### ChatMessage Model

Individual messages within a conversation.

```typescript
{
  _id: ObjectId,
  conversationId: ObjectId,  // Reference to Conversation
  senderId: ObjectId,        // Reference to User
  content: String,           // Message body (max 5000 chars)
  status: String,            // "sent" | "delivered" | "read"
  readAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `{ conversationId: 1, createdAt: -1 }` - Paginated retrieval

---

## Endpoints

### Create/Get Conversation

**POST** `/chat/conversations`

Get an existing conversation or create a new one with another user.

**Auth Required**: Yes

**Request Body**:
```json
{
  "otherUserId": "user_id_here"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "conv_123",
    "participants": [
      { "_id": "user1", "fullName": "John Doe", "avatarUrl": "..." },
      { "_id": "user2", "fullName": "Jane Smith", "avatarUrl": "..." }
    ],
    "lastMessage": "Hello!",
    "lastMessageAt": "2024-01-15T10:00:00Z",
    "unreadCounts": {
      "user1": 0,
      "user2": 2
    }
  }
}
```

**Error Cases**:
- 400: Cannot create conversation with yourself

---

### Get All Conversations

**GET** `/chat/conversations`

Get all conversations for the current user.

**Auth Required**: Yes

**Query Parameters**:
None required.

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "_id": "conv_123",
      "participants": [...],
      "lastMessage": "See you tomorrow",
      "lastMessageAt": "2024-01-15T10:00:00Z",
      "unreadCount": 2
    }
  ]
}
```

---

### Get Messages

**GET** `/chat/conversations/:id/messages`

Get paginated messages for a conversation.

**Auth Required**: Yes

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Conversation ID |

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 50 | Messages per page |

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "_id": "msg_123",
        "senderId": { "_id": "user1", "fullName": "John" },
        "content": "Hello!",
        "status": "read",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 100,
      "totalPages": 2
    }
  }
}
```

---

### Send Message

**POST** `/chat/conversations/:id/messages`

Send a message in a conversation.

**Auth Required**: Yes

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------ id | string | Conversation ID |

**|-------------|
|Request Body**:
```json
{
  "content": "Hello, how can I help you?"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "_id": "msg_456",
    "conversationId": "conv_123",
    "senderId": { "_id": "user1", "fullName": "John" },
    "content": "Hello, how can I help you?",
    "status": "sent",
    "createdAt": "2024-01-15T10:05:00Z"
  }
}
```

**Side Effects**:
- Updates conversation `lastMessage` and `lastMessageAt`
- Increments unread count for the other user
- Emits WebSocket event to conversation room

---

### Mark as Read

**PATCH** `/chat/conversations/:id/read`

Mark all messages in a conversation as read.

**Auth Required**: Yes

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Conversation ID |

**Request Body**:
```json
{}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Messages marked as read"
}
```

---

## WebSocket Events

### Connection

Connect to WebSocket server using Socket.io:

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  auth: {
    token: 'Bearer <clerk_jwt>'
  }
});
```

### Events

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `chat:join` | Client → Server | `{ conversationId }` | Join conversation room |
| `chat:leave` | Client → Server | `{ conversationId }` | Leave conversation room |
| `chat:typing` | Client → Server | `{ conversationId }` | User is typing |
| `chat:stop-typing` | Client → Server | `{ conversationId }` | User stopped typing |
| `chat:message` | Server → Client | `{ conversationId }` | New message received |
| `chat:read` | Server → Client | `{ conversationId }` | Messages marked as read |

### Example Usage

```javascript
// Join conversation
socket.emit('chat:join', 'conv_123');

// Listen for new messages
socket.on('chat:message', (data) => {
  console.log('New message:', data);
});

// Send typing indicator
socket.emit('chat:typing', { conversationId: 'conv_123' });
```

---

## Frontend Integration

### Chat Service

```javascript
// services/chat/chatService.js
import api from '../_shared/apiClient';

export const chatService = {
  getConversations: () => api.get('/chat/conversations'),
  getOrCreateConversation: (otherUserId) => 
    api.post('/chat/conversations', { otherUserId }),
  getMessages: (conversationId, params) => 
    api.get(`/chat/conversations/${conversationId}/messages`, { params }),
  sendMessage: (conversationId, content) => 
    api.post(`/chat/conversations/${conversationId}/messages`, { content }),
  markAsRead: (conversationId) => 
    api.patch(`/chat/conversations/${conversationId}/read`)
};
```

### React Query Hooks

```javascript
// services/chat/chatService.js (continued)
export const useConversations = () => useQuery({
  queryKey: ['conversations'],
  queryFn: () => chatService.getConversations()
});

export const useConversationMessages = (conversationId) => useQuery({
  queryKey: ['messages', conversationId],
  queryFn: () => chatService.getMessages(conversationId),
  enabled: !!conversationId
});

export const useSendChatMessage = (conversationId) => useMutation({
  mutationFn: (content) => chatService.sendMessage(conversationId, content)
});

export const useMarkChatAsRead = (conversationId) => useMutation({
  mutationFn: () => chatService.markAsRead(conversationId)
});
```

---

## Use Cases

### Client Finding a Lawyer

1. Client navigates to `/dashboard/find-lawyers`
2. Browses or searches lawyers by name or practice area
3. Clicks "Chat" button on a lawyer's card
4. System creates conversation and redirects to `/dashboard/chat/:conversationId`
5. Client can send messages, receive real-time replies

### Lawyer Messaging Clients

1. Lawyer navigates to `/dashboard/chat`
2. Sees list of all conversations with clients
3. Selects a conversation to view messages
4. Can send replies in real-time

---

*Last Updated: March 2026*
