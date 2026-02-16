# Case Access API

Manage permissions and sharing for cases.

## Share Case
**POST** `/case-access/share`

Grants a user access to a specific case.

### Request Body
```json
{
  "caseId": "case_123",
  "email": "colleague@lawfirm.com"
}
```

---

## Get Shared Users
**GET** `/case-access/:caseId/users`

Lists all users who have been granted access to the case.

---

## Revoke Access
**DELETE** `/case-access/:caseId/:userId`

Removes a user's access to the case.
