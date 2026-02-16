# API Reference Overview

The Advyon Server provides a comprehensive RESTful API for managing cases, documents, users, and activities.

## Base URL

All API requests should be prefixed with:

```
http://localhost:5000/api/v1
```

## Authentication

The API uses **Bearer Token** authentication (JWT) for protected endpoints.

1.  Obtain an access token via the Login or Sign Up endpoints.
2.  Include the token in the `Authorization` header of subsequent requests:

```http
Authorization: Bearer <your_access_token>
```

## Response Format

All responses follow a standard JSON structure:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { ... },
  "meta": { ... } // Optional (pagination, etc.)
}
```

## Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request succeeded. |
| 201 | Created | Resource created successfully. |
| 400 | Bad Request | Validation error or invalid input. |
| 401 | Unauthorized | Missing or invalid authentication token. |
| 403 | Forbidden | User does not have permission. |
| 404 | Not Found | Resource not found. |
| 500 | Internal Server Error | Something went wrong on the server. |

## Interactive Documentation

For interactive testing, you can use the Swagger UI available at:

`http://localhost:5000/api-docs`
