# Messaging API

Internal messaging system for secure communication between Lawyers and Clients.

## Get My Messages
**GET** `/messages`

Retrieves the inbox for the current user.

### Query Parameters
| Param | Description | Enum |
|---|---|---|
| `status` | Filter by message status | `unread`, `read`, `replied`, `archived` |
| `page` | Page number | |
| `limit` | items per page | |

---

## Get Pending Count
**GET** `/messages/pending-count`

Returns the total number of unread messages (useful for notification badges).

---

## Send Message
**POST** `/messages`

Sends a new secure message.

### Request Body
```json
{
  "receiverId": "user_456",
  "subject": "Question about the hearing",
  "content": "When should I arrive?",
  "priority": "normal" // low, medium, high
}
```

---

## Mark as Read
**PATCH** `/messages/:id/read`

Updates the status of a message to 'read'.

---

## Archive Message
**PATCH** `/messages/:id/archive`

Moves a message to the archive.
