# Community API

Endpoints for the Q&A Forum and Community features.

## Get Statistics
**GET** `/community/stats`
**GET** `/community/trending-topics`
**GET** `/community/top-contributors`

Public endpoints to retrieve community health metrics and trends.

---

## Create Thread
**POST** `/community/threads`

Starts a new discussion thread.

### Request Body
```json
{
  "title": "Question about Intellectual Property",
  "content": "Can someone explain...",
  "tags": ["IP", "Copyright"]
}
```

---

## Get Threads
**GET** `/community/threads`

Retrieves a list of discussion threads.

---

## Interaction
**POST** `/community/threads/:threadId/reply` - Add a reply.
**PATCH** `/community/threads/:id/vote` - Upvote/Downvote a thread.
**PATCH** `/community/threads/:id/solve` - Mark a thread as solved.
**PATCH** `/community/replies/:replyId/vote` - Upvote/Downvote a reply.
