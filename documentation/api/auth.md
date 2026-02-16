# Authentication API

## Sync User
**POST** `/auth/sync`

Syncs a user from Clerk to the local database. This endpoint is typically called immediately after a successful Clerk sign-in to ensure the user exists in the Advyon system.

### Headers
| Header | Value | Required |
|---|---|---|
| Authorization | `Bearer <token>` | Yes |

### Response (200 OK)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User synced successfully",
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "clerkId": "user_clerk_123",
    "role": "PENDING"
  }
}
```

---

## Onboard User
**POST** `/auth/onboard`

Completes the user onboarding process by assigning a role.

### Request Body
```json
{
  "role": "LAWYER" // Enum: "LAWYER", "CLIENT", "UPLOAD_CLIENT"
}
```

### Response (200 OK)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User onboarded successfully",
  "data": {
    "id": "user_123",
    "role": "LAWYER"
  }
}
```

---

## Get Current User
**GET** `/auth/me`

Retrieves the profile of the currently authenticated user.

### Response (200 OK)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User profile retrieved successfully",
  "data": {
    "id": "user_123",
    "email": "lawyer@advyon.com",
    "name": "Jane Doe",
    "role": "LAWYER",
    "avatarUrl": "https://img.clerk.com/..."
  }
}
```

---

## Update Profile
**PATCH** `/auth/me`

Updates the current user's profile information.

### Request Body
```json
{
  "name": "Jane Doe Updated",
  "imageUrl": "https://new-image-url.com"
}
```

### Response (200 OK)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User profile updated successfully"
}
```
