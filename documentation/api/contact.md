# Contact API

## Overview

The Contact module handles support tickets and inquiries from users. It provides a public API for submitting contact requests with rate limiting and email notifications.

## Base URL

```
/api/v1/contact
```

## Contact Ticket Model

```typescript
{
  referenceId: String,       // Unique reference (e.g., "TKT-2024-0001")
  fullName: String,         // User's full name
  email: String,            // User's email
  orgName: String,         // Organization name (optional)
  role: String,            // User role (optional)
  phone: String,           // Phone number (optional)
  topicKey: String,        // Topic category key
  topicLabel: String,      // Topic display label
  urgencyKey: String,      // Urgency level
  message: String,         // Message content
  source: String,          // "public-site" | "marketing" | "unknown"
  status: String,          // "new" | "triaged" | "closed"
  attachments: [{
    label: String,
    url: String
  }],
  ipAddress: String,       // User's IP address
  userAgent: String,       // Browser user agent
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

## Endpoints

### GET /contact/meta

Get contact form metadata (topics, urgency options).

**Auth Required**: No (Public)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "topics": [
      { "key": "general", "label": "General Inquiry" },
      { "key": "support", "label": "Technical Support" },
      { "key": "billing", "label": "Billing Question" }
    ],
    "urgencies": [
      { "key": "low", "label": "Low" },
      { "key": "medium", "label": "Medium" },
      { "key": "high", "label": "High" }
    ]
  }
}
```

---

### POST /contact

Submit a contact/support request.

**Auth Required**: No (Public)

**Rate Limited**: Yes (contact rate limiter)

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "orgName": "Acme Corp",
  "role": "lawyer",
  "phone": "+1234567890",
  "topicKey": "support",
  "topicLabel": "Technical Support",
  "urgencyKey": "high",
  "message": "I'm having trouble uploading documents..."
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Contact request submitted successfully",
  "data": {
    "referenceId": "TKT-2024-0001",
    "status": "new"
  }
}
```

## Email Notifications

When a contact form is submitted:
1. Confirmation email sent to the user
2. Notification email sent to the support team (configured via SMTP)

## Rate Limiting

The contact endpoint has strict rate limiting to prevent spam:
- Configurable limit per IP address
- Returns 429 Too Many Requests when exceeded

## Use Cases

- General inquiries from potential clients
- Technical support requests
- Billing questions
- Partnership inquiries

---

*Last Updated: March 2026*
