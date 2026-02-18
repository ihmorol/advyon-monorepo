# Feature Flow Checklist (2026-02-18)

- Mode: Jest + Supertest workflow checks with mocked auth principals mapped to seeded accounts.
- Accounts: lawyer `LAW-0001`, admin `ADM-0001`, client `CLI-0001`.
- Scope: Admin, billing, schedule, message, notification, case lifecycle flows.

| Flow | Check | HTTP Status | Expected | Result |
| --- | --- | --- | --- | --- |
| Case | Lawyer list cases | 200 | 200 | PASS |
| Case | Lawyer create case | 201 | 201 | PASS |
| Case | Lawyer update case status | 200 | 200 | PASS |
| Case | Lawyer archive case | 400 | 200 | FAIL |
| Case | Lawyer restore case | 400 | 200 | FAIL |
| Schedule | Lawyer create schedule event | 201 | 201 | PASS |
| Schedule | Lawyer list schedules | 200 | 200 | PASS |
| Schedule | Lawyer check schedule conflict | 200 | 200 | PASS |
| Schedule | Lawyer delete schedule event | 200 | 200 | PASS |
| Message | Lawyer send message to client | 500 | 201 | FAIL |

- Total checks: 10
- Passed: 7
- Failed: 3