# API Smoke Matrix (2026-02-18)

- Mode: Jest + Supertest with mocked auth principal mapping to seeded accounts.
- Seed accounts used: lawyer `LAW-0001`, admin `ADM-0001`, client `CLI-0001`.
- Note: This validates API behavior and role gates without Clerk token issuance flow.

| Endpoint Check | HTTP Status | Expected | Result |
| --- | --- | --- | --- |
| Health endpoint | 200 | 200 | PASS |
| Subscription plans public endpoint | 200 | 200 | PASS |
| Lawyer list cases | 200 | 200 | PASS |
| Client list cases | 200 | 200 | PASS |
| Lawyer list own documents | 200 | 200 | PASS |
| Lawyer list messages | 200 | 200 | PASS |
| Client list notifications | 200 | 200 | PASS |
| Lawyer list schedules | 200 | 200 | PASS |
| Lawyer analytics case metrics | 200 | 200 | PASS |
| Community public thread list | 200 | 200 | PASS |
| Lawyer community engagement metrics | 200 | 200 | PASS |
| Client community assist similar threads | 200 | 200 | PASS |
| Lawyer AI tools history | 200 | 200 | PASS |
| Lawyer AI context profile | 200 | 200 | PASS |
| Client own subscription | 200 | 200 | PASS |
| Client own payment history | 200 | 200 | PASS |
| Admin list users | 200 | 200 | PASS |
| Admin read settings | 200 | 200 | PASS |
| Admin list all payments | 200 | 200 | PASS |
| Role gate check: client blocked from admin users | 403 | 403 | PASS |

- Total checks: 20
- Passed: 20
- Failed: 0