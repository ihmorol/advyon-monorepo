# Manual Verification Matrix

Use this checklist to document evidence before requesting any merge into the integration branch. Record results in SSOT with timestamps, tester, and artifact links.

## Team 1 – Foundation & Document Reliability
| Suite | Steps | Evidence |
| --- | --- | --- |
| Auth providers | Remove GitHub button, exercise email + Google sign in/out, capture screenshots. | Clerk staging screenshots + console logs |
| Login sync resilience | Simulate API failure, observe retry/backoff, confirm fallback onboarding route and user messaging. | Network capture + UI video |
| Zod validation | Run automated schema script against auth/onboarding/document forms; capture CLI output. | Validation report |
| Workspace document preview | Test PDF/Docx/Image/large file/mobile/offline scenarios, confirm loading + error boundary. | Screen recording |
| Document preview page | Validate print/share/version controls and fallback download; capture audit log for downloads. | UI runbook |
| Download security | Attempt expired/foreign signed URLs and batch progress/resume flows; confirm rejection logs. | Server log excerpt |
| Upload security | Upload disallowed MIME + oversize files; verify rejection + telemetry. | QA log |

## Team 2 – Public Experience & Metadata
| Suite | Steps | Evidence |
| --- | --- | --- |
| Content replacement | Run diff of copy inventory vs placeholders; capture approved content map. | Copy inventory |
| Landing loading/perf | Simulate slow data, verify skeleton; run Lighthouse + WebPageTest for <2s LCP. | Perf report |
| Accessibility | Run Axe/Lighthouse a11y on landing/about/contact/How-To; conduct manual keyboard + screen reader pass. | A11y report |
| Contact flow | Submit valid/invalid forms, trigger spam filter, verify ticket + email/push results. | API logs + screenshots |
| Metadata API | Hit each metadata endpoint, verify caching + admin overrides; run schema assertions. | Postman collection |
| Validation coverage | Execute schema tests for contact/public forms; attach console output. | Validation log |

## Team 3 – AI & Community Intelligence
| Suite | Steps | Evidence |
| --- | --- | --- |
| Moderation abuse suite | Run `fuck you` thread, queue visibility, appeal + resolution states. | API + UI capture |
| Assist guardrails | Validate Ask Question preconditions, similar threads, smart tags, failure UX. | Screen recording |
| AI tools workspace | Execute multi-tool history, filters, search, export JSON/CSV, pagination, refresh. | UI capture |
| Context/privacy | Test off-topic + prompt-injection rejection, context profile endpoint, memory continuity. | API logs |
| Validation parity | Attempt invalid categories, short titles, AI tool inputs, confirm client/server rejection. | CLI log |
| KPI endpoints | Call `/ai/tools/metrics` & `/community/metrics/engagement` after generating events. | CURL output |
| Build/tests | `npm run build` for server/client + targeted jest suite (listed in playbook). | CI log |

## Team 4 – Core Practice Operations
| Suite | Steps | Evidence |
| --- | --- | --- |
| Case wizard | Complete multi-step wizard with uploads/templates/deadlines/duplicate detection/auto-numbering. | UI capture |
| Archive lifecycle | Archive/search/restore/permanent delete; verify auto-archive scheduler + audit logs. | DB + log snippets |
| Personalization | Confirm event tracking, opt-out controls, analytics consumption, data retention policy. | API docs |
| Sidebar real-time | Trigger case/message/notification events; observe socket/fallback behavior. | Socket trace |
| Schedule UX | Month/week/day views, drag/drop, recurring events, reminders, Google sync, conflict detection, courtroom booking. | QA report |
| Client management + messaging | CRUD clients, assign to cases, send attachments, read receipts, templates, notifications, search. | UI capture |
| Notifications | Test each notification type, mark read/unread, adjust preferences, validate web push + email channel. | Notification logs |
| Analytics | Validate metrics, custom date range, PDF/Excel exports, chart performance. | Export artifacts |
| Validation/tests | Run Zod schemas for Team 4 forms, API integration tests, and E2E flows. | Test logs |

## Evidence Logging Rules
1. Attach artifacts (screenshots, logs, recordings) to SSOT rows and note the tester + timestamp.
2. Link build/test output (server/client `npm run build`, jest/vitest replacements) whenever manual verification references automated checks.
3. If any suite fails, mark the relevant WBS row as `BL`, capture the blocker, and notify the orchestrator before re-testing.
