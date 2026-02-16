# Admin API

Administrative endpoints for user and system management.

## Get All Users (Admin)
**GET** `/admin/users`

Lists all users in the system with optional role filtering.

### Query Parameters
| Param | Description |
|---|---|
| `role` | Filter by `lawyer`, `client`, `admin` |
| `status` | Filter by `active`, `blocked` |

---

## Update User Role
**PATCH** `/admin/users/:id/role`

Promotes or demotes a user. **Super Admin only**.

### Request Body
```json
{
  "role": "LAWYER"
}
```

---

## Update User Status
**PATCH** `/admin/users/:id/status`

Blocks or activates a user account.

### Request Body
```json
{
  "status": "blocked" // active
}
```

---

## Soft Delete User
**DELETE** `/admin/users/:id`

Marks a user record as deleted without removing it from the database permanently.
