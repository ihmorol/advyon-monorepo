# Lawyer Directory API

## Overview

The Lawyer Directory allows clients to find and connect with verified legal professionals. Lawyers can create profiles with their practice areas, experience, and verification status.

## Base URL

```
/api/v1/users
```

---

## Lawyer Profile Model

### Profile Schema

```typescript
{
  id: String,                    // Unique ID (e.g., "LRY-0001")
  userId: String,               // Reference to User
  barRegistrationNumber: String, // Bar association registration
  barCouncilName: String,       // Name of bar council
  yearsOfExperience: Number,    // Years of practice
  primaryPracticeArea: String,   // Main area of law
  verificationStatus: String,   // "pending" | "verified" | "rejected"
  verificationNotes: String,    // Admin notes
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### Practice Areas

The system supports the following practice areas:

| Area | Description |
|------|-------------|
| Criminal Law | Criminal defense and prosecution |
| Civil Law | Civil litigation matters |
| Corporate Law | Business and corporate legal |
| Family Law | Marriage, divorce, custody |
| Tax Law | Tax compliance and disputes |
| Labor Law | Employment and labor relations |
| Immigration Law | Immigration and citizenship |
| Property Law | Real estate and property |
| Constitutional Law | Constitutional rights |
| Environmental Law | Environmental regulations |
| Intellectual Property | Patents, trademarks, copyrights |
| Banking Law | Financial and banking regulations |
| Human Rights | Human rights law |
| Cyber Law | Technology and cybersecurity law |

---

## Endpoints

### Get All Lawyers (Directory)

**GET** `/users/lawyers`

Retrieves a list of lawyers with their profiles for the lawyer directory. Supports search, practice area filter, and pagination.

**Auth Required**: No (Public endpoint)

**Query Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Search by lawyer name |
| practiceArea | string | Filter by practice area |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 12) |

**Example Request**:
```
GET /api/v1/users/lawyers?search=john&practiceArea=Civil%20Law&page=1&limit=12
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "lawyers": [
      {
        "id": "USR-0001",
        "fullName": "John Smith",
        "email": "john@example.com",
        "avatarUrl": "https://...",
        "role": "lawyer",
        "lawyer": {
          "id": "LRY-0001",
          "barRegistrationNumber": "BRN/2020/12345",
          "barCouncilName": "State Bar Association",
          "yearsOfExperience": 10,
          "primaryPracticeArea": "Civil Law",
          "verificationStatus": "verified"
        },
        "bio": "Experienced civil litigation attorney...",
        "address": "New York, NY",
        "phone": "+1234567890"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 12,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

### Lawyer Profile Fields

Each lawyer object includes:

| Field | Type | Description |
|-------|------|-------------|
| id | String | User ID |
| fullName | String | Full name |
| email | String | Email address |
| avatarUrl | String | Profile picture URL |
| phone | String | Contact number |
| address | String | Office address |
| bio | String | Biography |
| lawyer.yearsOfExperience | Number | Years of practice |
| lawyer.primaryPracticeArea | String | Main practice area |
| lawyer.barCouncilName | String | Bar council |
| lawyer.barRegistrationNumber | String | Registration number |
| lawyer.verificationStatus | String | "pending" / "verified" / "rejected" |

---

## Frontend Integration

### Find Lawyers Page

The frontend provides a dedicated page at `/dashboard/find-lawyers` with:

**Features**:
- Search by lawyer name
- Filter by practice area
- Pagination
- Verified badge display
- Quick actions: Email, Call, Chat

### Service Integration

```javascript
// services/users/userService.js
export const useLawyers = (params) => useQuery({
  queryKey: ['lawyers', params],
  queryFn: () => api.get('/users/lawyers', { params })
});
```

### UI Components

**Lawyer Card**:
- Avatar with verification badge
- Name and practice area
- Years of experience
- Bar council
- Location
- Email, Call, and Chat buttons

---

## Verification Workflow

### Status Types

| Status | Description | Badge Color |
|--------|-------------|-------------|
| pending | Under review | Yellow |
| verified | Approved by admin | Green |
| rejected | Not approved | Red |

### Admin Verification

Admins can verify lawyers through the admin panel:

1. Review lawyer profile and documents
2. Set verification status to "verified" or "rejected"
3. Add verification notes if needed

---

## Client-Lawyer Connection

### Flow

1. **Browse**: Client visits `/dashboard/find-lawyers`
2. **Search**: Filter by name or practice area
3. **View**: See lawyer profile details
4. **Connect**: Click Chat/Email/Call

### Chat Integration

When clicking "Chat":
1. Frontend calls `POST /chat/conversations` with lawyer's user ID
2. Backend creates or retrieves existing conversation
3. Redirects to `/dashboard/chat/:conversationId`
4. Real-time messaging begins

---

## Security Considerations

- Public endpoint for reading (no auth required)
- Write operations require authentication
- Only verified information is displayed
- Email/phone may be hidden for privacy

---

*Last Updated: March 2026*
