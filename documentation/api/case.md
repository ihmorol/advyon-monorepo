# Case Management API

## Create Case
**POST** `/cases`

Creates a new legal case or matter.

### Request Body
```json
{
  "title": "Smith vs. Jones",
  "description": "Property dispute regarding boundary lines...",
  "status": "ACTIVE" // ACTIVE, CLOSED, ARCHIVED
}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "case_123",
    "title": "Smith vs. Jones",
    "caseNumber": "cas-2024-001",
    "status": "ACTIVE"
  }
}
```

---

## Get All Cases
**GET** `/cases`

Retrieves a paginated list of cases.

### Query Parameters
| Param | Description |
|---|---|
| `page` | Page number (default 1) |
| `limit` | Items per page (default 10) |
| `searchTerm` | Search by title or description |
| `status` | Filter by status |

---

## Get Single Case
**GET** `/cases/:caseId`

Retrieves detailed information about a specific case.

---

## Update Case
**PUT** `/cases/:caseId`

Updates case details.

### Request Body
```json
{
  "status": "CLOSED",
  "description": "Case settled out of court."
}
```

---

## Delete Case
**DELETE** `/cases/:caseId`

Soft-deletes a case. It can be restored by an admin if needed.

---

## Case Documents

### Upload Document
**POST** `/cases/:caseId/documents`

Uploads a file to the case.

**Content-Type**: `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `file` | File | The document to upload (PDF, DOCX) |
| `folder` | String | (Optional) Folder name |
| `description` | String | (Optional) Document description |

### List Documents
**GET** `/cases/:caseId/documents`

Retrieves all documents associated with the case.

### Check Processing Status
**GET** `/cases/:caseId/documents/:documentId/status`

Returns the AI processing status (OCR, summarization) for a specific document.
