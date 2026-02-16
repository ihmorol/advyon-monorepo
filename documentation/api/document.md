# Document API

Endpoints for managing and interacting with legal documents. Note that most document uploads are handled within the context of a Case (see Case API).

## Get Document Content
**GET** `/documents/:documentId/content`

Retrieves the raw content or viewer-compatible data for a document.

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "content": "Full text content of the document...",
    "mimeType": "application/pdf"
  }
}
```

---

## Get Document by ID
**GET** `/documents/id/:documentId`

Retrieves document metadata.

---

## Get Document Status
**GET** `/documents/:caseId/:documentId/status`

Checks the processing status of the document (e.g., OCR or AI analysis in progress).

### Response
```json
{
  "success": true,
  "data": {
    "status": "COMPLETED", // PROCESSING, FAILED
    "progress": 100
  }
}
```

---

## Update Summary
**PUT** `/documents/:documentId/summary`

Manually update the AI-generated summary.

### Request Body
```json
{
  "summary": "This is a revised summary of the contract..."
}
```

---

## Re-analyze Document
**POST** `/documents/:caseId/:documentId/reanalyze`

Triggers a re-run of the AI analysis pipeline.

---

## Download Document
**GET** `/documents/:caseId/:documentId/download`

Generates a secure download link or streams the file.
