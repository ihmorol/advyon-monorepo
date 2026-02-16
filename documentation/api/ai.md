# AI Integration API

Endpoints for interacting with the AI Legal Assistant (powered by Google Gemini/Groq).

## Chat with AI
**POST** `/ai/chat`

Sends a message to the AI assistant and receives a streamed or complete response.

### Request Body
```json
{
  "message": "Summarize the key points of the contract",
  "context": {
    "caseId": "case_123",
    "documentId": "doc_456"
  }
}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "reply": "Based on the contract, here are the key points...",
    "sources": ["doc_456"]
  }
}
```

---

## Analyze Document
**POST** `/ai/documents/analyze`

Manually triggers the AI analysis pipeline for a specific document. This is useful for re-processing or handling failed jobs.

### Request Body
```json
{
  "documentId": "doc_123"
}
```
