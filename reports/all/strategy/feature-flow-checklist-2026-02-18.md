# Feature Flow Checklist (2026-02-18)

- Mode: Jest + Supertest workflow checks with mocked auth principals mapped to seeded accounts.
- Accounts: lawyer `LAW-0001`, admin `ADM-0001`, client `CLI-0001`.
- Scope: Admin, billing, schedule, message, notification, case lifecycle flows.

| Flow | Check | HTTP Status | Expected | Result |
| --- | --- | --- | --- | --- |
| Case | Lawyer list cases | 200 | 200 | PASS |
| Case | Lawyer create case | 201 | 201 | PASS |
| Case | Lawyer update case status | 200 | 200 | PASS |
| Case | Lawyer archive case | 400 | 200, 400 | PASS |
| Case | Lawyer restore case | 400 | 200, 400 | PASS |
| Schedule | Lawyer create schedule event | 201 | 201 | PASS |
| Schedule | Lawyer list schedules | 200 | 200 | PASS |
| Schedule | Lawyer check schedule conflict | 200 | 200 | PASS |
| Schedule | Lawyer delete schedule event | 200 | 200 | PASS |
| Message | Lawyer send message to client | 201 | 201 | PASS |
| Message | Client view pending message count | 200 | 200 | PASS |
| Message | Client mark message as read | 200 | 200 | PASS |
| Message | Client star message | 200 | 200 | PASS |
| Message | Client archive message | 200 | 200 | PASS |
| Notification | Admin send test notification | 201 | 201 | PASS |
| Notification | Client mark notification as read | 200 | 200 | PASS |
| Notification | Client delete notification | 200 | 200 | PASS |
| Admin | Admin list users | 200 | 200 | PASS |
| Admin | Admin update system settings | 200 | 200 | PASS |
| Admin | Admin analytics overview | 200 | 200 | PASS |
| Admin | Admin audit logs | 200 | 200 | PASS |
| Billing | Client current subscription | 200 | 200 | PASS |
| Billing | Client payment history | 200 | 200 | PASS |
| Billing | Admin payment history (all) | 200 | 200 | PASS |
| Billing | Client checkout session path | 500 | 200 | FAIL |
| Role Gate | Client blocked from admin users | 403 | 403 | PASS |
| Role Gate | Client blocked from notification send-test | 403 | 403 | PASS |

- Total checks: 27
- Passed: 26
- Failed: 1