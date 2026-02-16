# Notification API

Real-time notification system for system events.

## Get Notifications
**GET** `/notifications`

Retrieves a list of notifications for the user.

### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "notif_123",
      "type": "DOCUMENT_UPLOAD",
      "message": "New document uploaded to Case #123",
      "read": false,
      "createdAt": "2024-01-20T12:00:00Z"
    }
  ]
}
```

---

## Get Summary
**GET** `/notifications/summary`

Returns metadata about notifications, such as the count of unread items.

---

## Mark as Read
**PATCH** `/notifications/:id/read`

Marks a single notification as read.
