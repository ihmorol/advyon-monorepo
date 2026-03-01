# API Reference

## Base URL

```
Development: http://localhost:5000/api/v1
Production: https://api.advyon.com/api/v1
```

## Authentication

### Overview

The Advyon API uses **Bearer Token** authentication (JWT) for protected endpoints. All protected routes require a valid Clerk JWT token.

### Getting a Token

1. **Client-side (Clerk)**:
   ```javascript
   // After sign in, Clerk provides the token
   const token = await clerk.session.getToken();
   ```

2. **Include in Requests**:
   ```http
   Authorization: Bearer <your_jwt_token>
   ```

### Example Request

```javascript
const response = await fetch('http://localhost:5000/api/v1/cases', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...',
    'Content-Type': 'application/json'
  }
});
```

## Response Format

All API responses follow a standardized structure:

### Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Paginated Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Data retrieved successfully",
  "data": [
    // Array of items
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPage": 10
  }
}
```

### Error Response

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation error",
  "error": "Details here"
}
```

## Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created |
| 204 | No Content | Successful deletion |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Invalid/missing token |
| 403 | Forbidden | No permission |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate entry |
| 422 | Unprocessable | Validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Error | Server error |

---

## Endpoints by Module

## 1. Authentication (`/auth`)

### POST /auth/sync

Synchronize user data from Clerk to local database.

**Auth Required**: Yes

**Request**:
```json
// Headers: Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "USR-0001",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "client"
  }
}
```

### POST /auth/login

User login (delegated to Clerk).

**Auth Required**: No

### POST /auth/register

User registration (delegated to Clerk).

**Auth Required**: No

---

## 2. Users (`/users`)

> **Note**: For the **Lawyer Directory** (find lawyers, search, filter by practice area), see the dedicated [Lawyer Directory Documentation](lawyer-directory.md).

### GET /users/me/profile

Get current user's profile.

**Auth Required**: Yes

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "USR-0001",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "client",
    "avatarUrl": "https://...",
    "status": "active"
  }
}
```

### PATCH /users/me/profile

Update current user's profile.

**Auth Required**: Yes

**Request Body**:
```json
{
  "fullName": "John Smith",
  "phone": "+1234567890",
  "address": "123 Main St",
  "bio": "Law enthusiast",
  "timezone": "UTC",
  "preferredLanguage": "en"
}
```

### GET /users/me/preferences

Get user preferences.

**Auth Required**: Yes

**Response**:
```json
{
  "success": true,
  "data": {
    "theme": "dark",
    "notifications": {
      "emailDigest": true,
      "pushAlerts": false,
      "hearingReminders": true
    },
    "dashboardConfig": {
      "showActivityFeed": true,
      "showAIInsights": true,
      "defaultView": "classic"
    }
  }
}
```

### PATCH /users/me/preferences

Update user preferences.

**Auth Required**: Yes

**Request Body**:
```json
{
  "theme": "dark",
  "notifications": {
    "emailDigest": false
  }
}
```

### GET /users/my-clients

Get clients for a lawyer.

**Auth Required**: Lawyer+

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "USR-0002",
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "casesCount": 5
    }
  ]
}
```

---

## 3. Cases (`/cases`)

### POST /cases

Create a new case.

**Auth Required**: Yes

**Request Body**:
```json
{
  "title": "Smith v. Johnson",
  "caseType": "Civil Litigation",
  "description": "Contract dispute case",
  "urgency": "medium"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "CAS-2024-001",
    "caseNumber": "CASE-2024-001",
    "title": "Smith v. Johnson",
    "caseType": "Civil Litigation",
    "status": "active",
    "urgency": "medium",
    "createdBy": "USR-0001",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

### GET /cases

Get all cases with optional filters.

**Auth Required**: Yes

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| status | string | Filter by status |
| search | string | Search in title |

**Example**:
```
GET /api/v1/cases?page=1&limit=10&status=active&search=contract
```

### GET /cases/:caseId

Get case by ID.

**Auth Required**: Yes

### PUT /cases/:caseId

Update case.

**Auth Required**: Yes

**Request Body**:
```json
{
  "title": "Updated Title",
  "status": "pending",
  "progress": 50
}
```

### DELETE /cases/:caseId

Soft delete a case.

**Auth Required**: Yes

### PATCH /cases/:caseId/archive

Archive a case.

**Auth Required**: Yes

### PATCH /cases/:caseId/restore

Restore an archived case.

**Auth Required**: Yes

---

## 4. Documents (`/documents`)

### POST /cases/:caseId/documents

Upload document to case.

**Auth Required**: Yes

**Content-Type**: multipart/form-data

**Form Data**:
| Field | Type | Description |
|-------|------|-------------|
| file | File | Document file |
| folder | string | Folder name |

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "DOC-001",
    "fileName": "contract.pdf",
    "fileType": "application/pdf",
    "fileSize": 1024000,
    "cloudinaryUrl": "https://...",
    "processingStatus": "pending",
    "uploadedAt": "2024-01-15T10:00:00Z"
  }
}
```

### GET /documents/:caseId/:documentId/status

Check document processing status.

**Auth Required**: Yes

**Response**:
```json
{
  "success": true,
  "data": {
    "documentId": "DOC-001",
    "processingStatus": "completed",
    "aiAnalysis": {
      "summary": "This is a contract...",
      "documentCategory": "Contract",
      "confidenceScore": 0.95
    }
  }
}
```

### POST /documents/:caseId/:documentId/reanalyze

Re-trigger AI analysis.

**Auth Required**: Yes

---

## 5. AI (`/ai`)

### POST /ai/chat

Chat with AI assistant.

**Auth Required**: Yes

**Request Body**:
```json
{
  "message": "Summarize my case documents",
  "caseId": "CAS-2024-001",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi!" }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "response": "Based on your case documents..."
  }
}
```

### POST /ai/tools/:toolKey/run

Run a specific AI tool.

**Auth Required**: Yes

**Request Body**:
```json
{
  "input": "Review this contract",
  "caseId": "CAS-2024-001",
  "documentId": "DOC-001"
}
```

**Available Tools**:
- `legal_research`
- `document_summarize`
- `case_insights`
- `contract_review`
- `legal_writer`

### GET /ai/tools/history

Get AI tool usage history.

**Auth Required**: Yes

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| toolKey | string | Filter by tool |

### POST /ai/documents/analyze

Trigger AI document analysis.

**Auth Required**: Yes

**Request Body**:
```json
{
  "documentId": "DOC-001"
}
```

---

## 6. Community (`/community`)

### GET /community/threads

Get community threads.

**Auth Required**: No (public)

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| category | string | Filter by category |
| solved | boolean | Filter solved threads |

### POST /community/threads

Create a new thread.

**Auth Required**: Yes (client+)

**Request Body**:
```json
{
  "title": "How to file a motion?",
  "content": "I need help with...",
  "category": "Civil Litigation",
  "tags": ["motion", "filing"]
}
```

### PATCH /community/threads/:id/vote

Vote on a thread.

**Auth Required**: Yes

**Request Body**:
```json
{
  "voteType": "upvote" | "downvote"
}
```

### POST /community/threads/:threadId/reply

Add reply to thread.

**Auth Required**: Yes

**Request Body**:
```json
{
  "content": "Here is the answer..."
}
```

### POST /community/assist/similar

Get similar thread suggestions (AI).

**Auth Required**: Yes

**Request Body**:
```json
{
  "content": "Question about contracts"
}
```

---

## 7. Messages (`/messages`)

> **Note**: For **real-time 1-on-1 chat** between clients and lawyers, see the dedicated [Chat API Documentation](chat.md).

### POST /messages

Send a message.

**Auth Required**: Yes

**Request Body**:
```json
{
  "receiverId": "USR-0002",
  "content": "Hello!",
  "caseId": "CAS-2024-001",
  "priority": "high"
}
```

### GET /messages

Get my messages.

**Auth Required**: Yes

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| status | string | Filter by status |
| caseId | string | Filter by case |

### PATCH /messages/:id/read

Mark message as read.

**Auth Required**: Yes

---

## 8. Notifications (`/notifications`)

### GET /notifications

Get my notifications.

**Auth Required**: Yes

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "NOT-001",
      "type": "case_update",
      "title": "Case Updated",
      "message": "Your case status changed",
      "isRead": false,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### PATCH /notifications/read-all

Mark all notifications as read.

**Auth Required**: Yes

---

## 9. Schedule (`/schedules`)

### POST /schedules

Create a calendar event.

**Auth Required**: Yes

**Request Body**:
```json
{
  "title": "Court Hearing",
  "description": "Preliminary hearing",
  "eventType": "hearing",
  "date": "2024-02-15",
  "startTime": "10:00",
  "endTime": "11:00",
  "caseId": "CAS-2024-001",
  "participants": ["USR-0002"]
}
```

### GET /schedules

Get events.

**Auth Required**: Yes

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | date | Start date filter |
| endDate | date | End date filter |
| caseId | string | Filter by case |

---

## 10. Legal (`/legal`)

### GET /legal

Search legal acts.

**Auth Required**: Yes

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| q | string | Search query |
| actName | string | Filter by act name |
| year | string | Filter by year |

**Example**:
```
GET /api/v1/legal?q=contract&actName=Indian%20Contract%20Act
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "LEG-001",
      "actName": "Indian Contract Act",
      "year": "1872",
      "number": "9",
      "title": "Contract defined",
      "previewText": "An agreement enforceable by law...",
      "fullText": "..."
    }
  ]
}
```

---

## 11. Payments (`/payments`)

### POST /payments/create-intent

Create Stripe payment intent.

**Auth Required**: Yes

**Request Body**:
```json
{
  "amount": 4999,
  "currency": "usd"
}
```

### GET /payments/history

Get payment history.

**Auth Required**: Yes

---

## 12. Subscriptions (`/subscriptions`)

### POST /subscriptions

Create subscription.

**Auth Required**: Yes

**Request Body**:
```json
{
  "plan": "pro",
  "billingInterval": "month"
}
```

### PATCH /subscriptions

Update subscription.

**Auth Required**: Yes

### DELETE /subscriptions

Cancel subscription.

**Auth Required**: Yes

---

## 13. Admin (`/admin`)

### GET /admin/users

Get all users (paginated).

**Auth Required**: Admin

### PATCH /admin/users/:id/status

Update user status.

**Auth Required**: Admin

**Request Body**:
```json
{
  "status": "blocked"
}
```

### GET /admin/settings

Get system settings.

**Auth Required**: Admin

### PATCH /admin/settings

Update system settings.

**Auth Required**: Admin

---

## 14. Analytics (`/analytics`)

### GET /analytics/dashboard

Get dashboard analytics.

**Auth Required**: Lawyer+

### GET /analytics/activities

Get activity logs.

**Auth Required**: Lawyer+

---

## Interactive Documentation

Access the interactive Swagger UI at:

```
http://localhost:5000/api-docs
```

This provides:
- Endpoint testing
- Request/response schemas
- Authentication setup
- Code examples

---

*Last Updated: March 2026*
