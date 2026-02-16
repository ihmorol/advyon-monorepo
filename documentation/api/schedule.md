# Scheduling API

Calendar and event management.

## Create Event
**POST** `/schedule`

Creates a new calendar event.

### Request Body
```json
{
  "title": "Court Hearing",
  "startTime": "2024-02-15T09:00:00Z",
  "endTime": "2024-02-15T11:00:00Z",
  "type": "HEARING", // MEETING, DEADLINE
  "caseId": "case_123"
}
```

---

## Get Events
**GET** `/schedule`

Retrieves all events visible to the user.

---

## Update Event
**PATCH** `/schedule/:id`

Updates event details (time, description).

---

## Delete Event
**DELETE** `/schedule/:id`

Removes an event from the calendar.
