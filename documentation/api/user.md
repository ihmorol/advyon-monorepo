# User Management API

## Create User
**POST** `/users/create-user`

Creates a new user manually (Admin only).

### Request Body
```json
{
  "email": "client@example.com",
  "password": "securePassword123",
  "role": "CLIENT"
}
```

---

## Get My Profile
**GET** `/users/me/profile`

Alias for retrieving the logged-in user's full profile details.

---

## Update My Profile
**PATCH** `/users/me/profile`

Updates personal details. Note: Email cannot be changed via this endpoint.

### Request Body
```json
{
  "fullName": "John Doe",
  "phone": "+1234567890",
  "address": "123 Legal St",
  "bio": "Senior Associate",
  "timezone": "America/New_York",
  "preferredLanguage": "en"
}
```

---

## User Preferences
**GET** `/users/me/preferences`
**PATCH** `/users/me/preferences`

Manage UI and notification settings.

### Request Body (PATCH)
```json
{
  "theme": "dark", // white, dark, system
  "notifications": {
    "email": true,
    "push": false
  },
  "dashboardConfig": {
    "layout": "compact"
  }
}
```

---

## Get Lawyer's Clients
**GET** `/users/my-clients`

(Lawyer Only) Retrieves a list of clients associated with cases where the current user is assigned as a lawyer.

---

## Admin Operations

### Get All Users
**GET** `/users/`

### Get User by ID
**GET** `/users/:id`

### Update User
**PATCH** `/users/:id`

### Delete User
**DELETE** `/users/:id`
