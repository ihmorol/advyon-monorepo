# Activity API

The Activity API provides an audit trail and history of actions performed within the platform.

## Get My Recent Activities
**GET** `/activities/me/recent`

Retrieves the 10 most recent actions performed by the current user.

### Response
```json
{
  "success": true,
  "data": [
    {
      "action": "UPLOAD_DOCUMENT",
      "description": "Uploaded contract.pdf",
      "timestamp": "2024-01-20T10:00:00Z",
      "relatedId": "doc_123"
    }
  ]
}
```

---

## Get Dashboard Stats
**GET** `/activities/me/stats`

Retrieves activity statistics for the user dashboard (e.g., number of cases active, documents uploaded today).

---

## Get Case Activities
**GET** `/activities/:caseId`

Retrieves the full history/timeline for a specific case.

**Permissions**:
- Admins/Lawyers: Full access.
- Clients: Can only see shared activities.

---

## Get System Activities (Admin)
**GET** `/activities`

Retrieves a paginated list of all activities across the system.
