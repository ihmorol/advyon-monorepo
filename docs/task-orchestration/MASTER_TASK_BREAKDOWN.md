# Advyon Master Task Breakdown and Team Orchestration

## Skill and Workflow Usage
- Skill `team-orchestrator`: used for ownership model, dependency control, and handoff governance.
- Skill `feature-development`: used for phase gates (requirements, architecture, implementation, QA, security, deployment).
- Skill `handoff-management`: used for handoff templates, acceptance tracking, and blocker escalation.
- Workflow `sprint-planning`: used for sprint cadence and status governance.

## Scope Baseline
This plan is a full decomposition of `TASK_PLAN.md` and includes:
- MVP tasks
- Post-MVP tasks
- Future tasks
- Technical debt and refactoring tasks
- Dependency installation tasks
- Success-metric verification tasks

## Stakeholder Decisions Already Locked
- Payment provider: Stripe.
- AI boundary: legal-only answers with prompt-injection resistance.
- Archive policy: auto-archive after 30 days.
- Notification channels: web push and email.
- Calendar sync: Google Calendar.
- Compliance/mobile app: out of current scope.

## Explicit Feasibility Notes
- Strict zero-dependency parallel execution for all full-stack tasks is not fully feasible in real systems; mitigation is contract-first development and non-overlapping file ownership per team branch.
- `features/messages/components/MessageThread.jsx` does not exist and must be created.
- `contact`, `payment`, `subscription`, `community.moderation`, and `ai.tools` server modules are missing and must be created.
- Push notifications require service worker and web push credentials; task is feasible but infrastructure credentials are a prerequisite.
- Usage-based billing is feasible only if metering events are defined first; otherwise implement with placeholder counters and harden later.
- Blog page is marked future and should ship as placeholder route unless CMS choice is finalized.

## Non-Breaking Implementation Guardrails
- Use feature flags for unfinished or high-risk features (AI tools, payments, moderation).
- Keep existing API contracts backward compatible; add new versioned fields instead of destructive changes.
- Route-level error boundaries and rollback toggles must be in place before major UI rewrites.
- Keep migration scripts idempotent and reversible for schema changes.
- Every task has mandatory commit checkpoint: commit immediately after touching 3+ files or closing a logical unit.

## Five Independent Team Workflows
| Team | Branch | Primary Scope | Non-Overlap Boundary |
|---|---|---|---|
| Team 1 Foundation Reliability | `team1/foundation-document-reliability` | Auth sync, validation framework, document preview/download stability | Owns auth hooks, document viewer stack, document download endpoints |
| Team 2 Public Experience | `team2/public-content-metadata` | Landing/public pages, content replacement, metadata APIs | Owns public pages and metadata module |
| Team 3 AI and Community Intelligence | `team3/ai-community-intelligence` | Moderation, AI tools, AI context, community AI assistance | Owns AI and community modules |
| Team 4 Core Practice Operations | `team4/core-practice-operations` | Cases, schedule, clients, messaging, notifications, archive, analytics, personalization | Owns case/schedule/client/message/socket/analytics operations |
| Team 5 Admin Commerce Governance | `team5/admin-commerce-governance` | Admin controls, payments, security/performance/testing governance, release metrics | Owns admin/payment/subscription and governance controls |

## Full Task Breakdown (100 percent coverage of structured tasks)

### MVP Backlog
| WBS ID | Source Task | Team | How to Implement Without Breaking | Skill and Agents | Commit |
|---|---|---|---|---|---|
| WBS-1.1 | Landing Page Loading State | Team 2 | Add pre-render loading shell in `Home.jsx`; gate content render on auth and content readiness; animate transition with fallback timeout | `frontend-lead`, `qa-testing-lead`; frontend-dev, qa-tester | Commit after >=3 files or logical unit |
| WBS-1.2 | Remove GitHub Login from Clerk | Team 1 | Remove GitHub provider button from sign-in/sign-up UI while preserving Clerk backend config compatibility | `frontend-lead`; frontend-dev | Commit after >=3 files or logical unit |
| WBS-1.3 | Fix Sync Error After Login | Team 1 | Add retry with capped backoff in auth sync hook; add dashboard fail-safe routing and user-facing error state | `backend-lead`, `frontend-lead`; backend-dev, frontend-dev, qa-tester | Commit after >=3 files or logical unit |
| WBS-1.4 | All Form Validation with Zod (program) | Teams 1-5 by domain | Keep shared schema package; domain teams validate only owned forms/endpoints; enforce same error contract | `backend-lead`, `frontend-lead`, `architecture-lead`; backend-dev, frontend-dev | Commit after >=3 files or logical unit |
| WBS-2.1 | Replace Placeholder Content | Team 2 | Replace all placeholder text with legal-domain copy and consistent tone; do not alter existing business logic | `product-manager`, `ui-ux-designer`; product-manager, frontend-dev | Commit after >=3 files or logical unit |
| WBS-2.2 | Metadata API Updates | Team 2 | Extend metadata constants/routes with additive endpoints and cache layer; keep old keys intact | `backend-lead`, `database-architect`; backend-dev, data-engineer | Commit after >=3 files or logical unit |
| WBS-5.1 | New Case Creation UI Update | Team 4 | Replace current form with wizard behind feature flag; keep old submit path until parity achieved | `frontend-lead`, `backend-lead`; frontend-dev, backend-dev, qa-tester | Commit after >=3 files or logical unit |
| WBS-5.3 | Fix Document Preview in Workspace | Team 1 | Harden viewer for large files, mobile layout, loading skeletons, and error boundary wrapper | `frontend-lead`; frontend-dev, qa-tester | Commit after >=3 files or logical unit |
| WBS-5.4 | Fix Document Preview Page | Team 1 | Expand viewer adapters per document type and add print/share/version panels as additive components | `frontend-lead`, `backend-lead`; frontend-dev, backend-dev | Commit after >=3 files or logical unit |
| WBS-5.5 | Documents Page Download Button | Team 1 | Implement secure signed download endpoints and client progress UI with batch queueing | `backend-lead`, `security-engineer`; backend-dev, frontend-dev, security-engineer | Commit after >=3 files or logical unit |
| WBS-7.1 | Complete Client Management Workflow | Team 4 | Deliver full CRUD with soft-delete/archive patterns and role checks; keep list endpoint backward compatible | `backend-lead`, `frontend-lead`; backend-dev, frontend-dev | Commit after >=3 files or logical unit |
| WBS-7.2 | Client-Lawyer Interconnection Message | Team 4 | Add case-scoped message model extensions, search indexes, and UI features in isolated message module | `backend-lead`, `frontend-lead`; backend-dev, frontend-dev | Commit after >=3 files or logical unit |
| WBS-9.1 | Notification System Using Socket | Team 4 | Use namespaced socket events and idempotent client reducers; preserve existing REST notification endpoints | `backend-lead`, `devops-engineer`; backend-dev, frontend-dev, devops-engineer | Commit after >=3 files or logical unit |
| WBS-10.1 | Landing Page Redesign | Team 2 | Rebuild sectionized marketing page while preserving route and auth CTA behaviors | `ui-ux-designer`, `frontend-lead`; ui-ux-designer, frontend-dev | Commit after >=3 files or logical unit |
| WBS-10.2 | About Page | Team 2 | Replace placeholder with production content and responsive layout without route changes | `ui-ux-designer`, `product-manager`; ui-ux-designer, frontend-dev | Commit after >=3 files or logical unit |
| WBS-10.4 | Contact Page | Team 2 | Create contact UI and backend route with validation and anti-spam rate limiting | `frontend-lead`, `backend-lead`, `security-engineer`; frontend-dev, backend-dev | Commit after >=3 files or logical unit |
| WBS-11.1 | MVP Admin Controls | Team 5 | Build admin panel with role-locked routes and audit logging; no privileged action without explicit permission checks | `security-engineer`, `backend-lead`; backend-dev, frontend-dev, security-engineer | Commit after >=3 files or logical unit |
| WBS-12.1 | Payment Integration | Team 5 | Add Stripe subscription flows with webhook verification, billing UI, and idempotent invoice events | `backend-lead`, `devops-engineer`, `security-engineer`; backend-dev, frontend-dev, devops-engineer | Commit after >=3 files or logical unit |

### Post-MVP Backlog
| WBS ID | Source Task | Team | How to Implement Without Breaking | Skill and Agents | Commit |
|---|---|---|---|---|---|
| WBS-3.1 | Community Content Moderation | Team 3 | Insert moderation middleware in thread/reply create path with configurable threshold and review queue | `ai-ml-specialist`, `security-engineer`; ai-engineer, backend-dev | Commit after >=3 files or logical unit |
| WBS-3.3 | AI Tools Page | Team 3 | Ship tool adapters behind per-tool toggles; degrade gracefully when provider quota fails | `ai-ml-specialist`, `frontend-lead`; ai-engineer, frontend-dev | Commit after >=3 files or logical unit |
| WBS-3.4 | Centralized AI Context | Team 3 | Centralize legal scope guardrails and prompt-injection filters in shared AI service and store | `ai-ml-specialist`, `security-engineer`; ai-engineer, backend-dev | Commit after >=3 files or logical unit |
| WBS-4.1 | Personalization Database | Team 4 | Add additive personalization collections/fields with async write pipeline and opt-out controls | `database-architect`, `backend-lead`; database-architect, backend-dev, data-engineer | Commit after >=3 files or logical unit |
| WBS-4.2 | Case Archive Implementation | Team 4 | Use soft-archive state machine with restore paths and 30-day auto-archive scheduler | `backend-lead`, `database-architect`; backend-dev | Commit after >=3 files or logical unit |
| WBS-5.2 | Workspace Sidebar Real-time Updates | Team 4 | Bind sidebar counters to socket event bus with fallback polling when socket disconnects | `frontend-lead`, `backend-lead`; frontend-dev, backend-dev | Commit after >=3 files or logical unit |
| WBS-6.1 | Complete Schedule Features | Team 4 | Incremental calendar enhancements: recurring events, drag/drop, conflicts, then Google sync | `frontend-lead`, `backend-lead`; frontend-dev, backend-dev | Commit after >=3 files or logical unit |
| WBS-8.1 | Update Analytics Page | Team 4 | Build analytics aggregates and export jobs using additive APIs and cached query layers | `data-engineer`, `backend-lead`, `frontend-lead`; data-engineer, backend-dev, frontend-dev | Commit after >=3 files or logical unit |

### Future Backlog
| WBS ID | Source Task | Team | How to Implement Without Breaking | Skill and Agents | Commit |
|---|---|---|---|---|---|
| WBS-3.2 | AI Features in Community Posts | Team 3 | Add suggest/summarize/tag APIs as optional helpers; never block normal posting flow | `ai-ml-specialist`, `backend-lead`; ai-engineer, backend-dev, frontend-dev | Commit after >=3 files or logical unit |
| WBS-10.3 | How To Use Page | Team 2 | Publish tutorial page with reusable content blocks and analytics instrumentation | `ui-ux-designer`, `product-manager`; ui-ux-designer, frontend-dev | Commit after >=3 files or logical unit |
| WBS-10.5 | Other Public Pages | Team 2 | Add policy/security/accessibility pages and keep blog as placeholder until CMS selection | `ui-ux-designer`, `security-engineer`; frontend-dev, product-manager | Commit after >=3 files or logical unit |
| WBS-8.1-FUT | Advanced Reporting Extension | Team 4 | Add scheduled reports and advanced cohorts after base analytics stabilizes | `data-engineer`; data-engineer, backend-dev | Commit after >=3 files or logical unit |

## Technical Debt and Refactoring Backlog
| WBS ID | Source Task | Team | How to Implement Without Breaking | Skill and Agents | Commit |
|---|---|---|---|---|---|
| WBS-TD-CQ-01 | Consistent error handling across API calls | Team 1 owner, all teams apply | Introduce shared error envelope and adapters; migrate route-by-route | `architecture-lead`, `backend-lead`; backend-dev | Commit after >=3 files or logical unit |
| WBS-TD-CQ-02 | Proper loading states everywhere | Team 1 owner, all teams apply | Use shared loading components and state machine conventions | `frontend-lead`; frontend-dev | Commit after >=3 files or logical unit |
| WBS-TD-CQ-03 | Error boundaries for all routes | Team 1 owner | Add route-level boundaries and telemetry hooks | `frontend-lead`; frontend-dev | Commit after >=3 files or logical unit |
| WBS-TD-CQ-04 | Standardize TypeScript interfaces | Team 5 owner, all teams apply | Create interface contracts package and lint rule gates | `architecture-lead`; architecture-lead, backend-dev, frontend-dev | Commit after >=3 files or logical unit |
| WBS-TD-CQ-05 | Add comprehensive JSDoc comments | Team 5 owner | Document public service/API surfaces only; avoid noisy comments | `architecture-lead`; backend-dev, frontend-dev | Commit after >=3 files or logical unit |
| WBS-TD-PF-01 | Implement caching strategies | Team 4 owner | Add cache by endpoint class with TTL and invalidation hooks | `data-engineer`, `backend-lead`; data-engineer, backend-dev | Commit after >=3 files or logical unit |
| WBS-TD-PF-02 | Optimize images and assets | Team 2 owner | Compress, lazy-load, and provide responsive variants | `frontend-lead`; frontend-dev | Commit after >=3 files or logical unit |
| WBS-TD-PF-03 | Pagination on all list endpoints | Team 4 owner | Add default pagination with backward-compatible query params | `backend-lead`; backend-dev | Commit after >=3 files or logical unit |
| WBS-TD-PF-04 | Virtual scrolling for large lists | Team 4 owner | Add list virtualization in high-volume pages only | `frontend-lead`; frontend-dev | Commit after >=3 files or logical unit |
| WBS-TD-PF-05 | Request deduplication | Team 4 owner | Add client query dedupe and server idempotency keys | `frontend-lead`, `backend-lead`; frontend-dev, backend-dev | Commit after >=3 files or logical unit |
| WBS-TD-TS-01 | Unit tests for critical utilities | Team 1 owner | Add test baseline for auth/doc utilities and shared libs | `qa-testing-lead`; qa-tester, backend-dev, frontend-dev | Commit after >=3 files or logical unit |
| WBS-TD-TS-02 | Integration tests for API endpoints | Team 4 owner | Build API integration suites per module with seeded fixtures | `qa-testing-lead`; qa-tester, backend-dev | Commit after >=3 files or logical unit |
| WBS-TD-TS-03 | E2E tests for critical flows | Team 4 owner | Add Playwright flows for auth/case/document/payment entry points | `qa-testing-lead`; qa-tester, frontend-dev | Commit after >=3 files or logical unit |
| WBS-TD-TS-04 | Accessibility audits | Team 2 owner | Run automated and manual audits on public and dashboard critical paths | `qa-testing-lead`, `ui-ux-designer`; qa-tester, ui-ux-designer | Commit after >=3 files or logical unit |
| WBS-TD-TS-05 | Performance benchmarks | Team 5 owner | Define budgets and collect regression baseline in CI | `devops-engineer`; devops-engineer, qa-tester | Commit after >=3 files or logical unit |
| WBS-TD-SC-01 | Rate limiting on all endpoints | Team 5 owner | Add global and per-route rate limits with allow-list exceptions | `security-engineer`, `backend-lead`; security-engineer, backend-dev | Commit after >=3 files or logical unit |
| WBS-TD-SC-02 | Input sanitization | Team 3 owner, all teams apply | Sanitize user-generated text and AI inputs/outputs centrally | `security-engineer`; security-engineer, backend-dev | Commit after >=3 files or logical unit |
| WBS-TD-SC-03 | File upload security | Team 1 owner | Add MIME/type validation, size caps, malware scan hook points | `security-engineer`; security-engineer, backend-dev | Commit after >=3 files or logical unit |
| WBS-TD-SC-04 | CORS configuration review | Team 5 owner | Harden CORS policy per environment and audit wildcard origins | `security-engineer`; security-engineer, devops-engineer | Commit after >=3 files or logical unit |
| WBS-TD-SC-05 | Secrets management audit | Team 5 owner | Rotate secrets, update `.env` governance, and remove leaked defaults | `security-engineer`, `devops-engineer`; security-engineer, devops-engineer | Commit after >=3 files or logical unit |

## Dependency Installation Backlog
| WBS ID | Dependency Task | Team | Safe Method | Skill and Agents | Commit |
|---|---|---|---|---|---|
| WBS-DEP-CL-01 | Add `@stripe/stripe-js` | Team 5 | Pin exact version and add smoke test | `frontend-lead`; frontend-dev | Commit after >=3 files or logical unit |
| WBS-DEP-CL-02 | Add `@stripe/react-stripe-js` | Team 5 | Integrate only billing routes and lazy-load checkout components | `frontend-lead`; frontend-dev | Commit after >=3 files or logical unit |
| WBS-DEP-CL-03 | Add calendar library (`@fullcalendar/react` preferred) | Team 4 | Isolate wrapper component to avoid global bundle regression | `frontend-lead`; frontend-dev | Commit after >=3 files or logical unit |
| WBS-DEP-CL-04 | Add `recharts` (if needed) | Team 4 | Use only analytics pages with dynamic imports | `frontend-lead`; frontend-dev | Commit after >=3 files or logical unit |
| WBS-DEP-SV-01 | Add `stripe` SDK | Team 5 | Verify webhook signature in middleware | `backend-lead`, `security-engineer`; backend-dev | Commit after >=3 files or logical unit |
| WBS-DEP-SV-02 | Add moderation package (`@tensorflow-models/toxicity` preferred) | Team 3 | Run in async moderation queue to protect response latency | `ai-ml-specialist`; ai-engineer, backend-dev | Commit after >=3 files or logical unit |
| WBS-DEP-SV-03 | Add `node-cron` | Team 4 | Schedule archive jobs with idempotent locks | `backend-lead`; backend-dev | Commit after >=3 files or logical unit |

## Success Metrics Verification Tasks
| WBS ID | Metric Task | Team | Verification Method | Skill and Agents | Commit |
|---|---|---|---|---|---|
| WBS-SM-MVP-01 | All critical bugs fixed | Team 1 owner | Bug board zero critical before release | `qa-testing-lead`; qa-tester | Commit after >=3 files or logical unit |
| WBS-SM-MVP-02 | All forms validated | Teams 1-5 | Form coverage matrix with automated validation tests | `qa-testing-lead`; qa-tester | Commit after >=3 files or logical unit |
| WBS-SM-MVP-03 | Payment system working | Team 5 | Stripe test mode success + webhook pass | `backend-lead`, `qa-testing-lead`; backend-dev, qa-tester | Commit after >=3 files or logical unit |
| WBS-SM-MVP-04 | Admin controls functional | Team 5 | Role-based integration tests and audit log checks | `security-engineer`, `qa-testing-lead`; security-engineer, qa-tester | Commit after >=3 files or logical unit |
| WBS-SM-MVP-05 | Basic analytics tracking | Team 4 | Event audit and dashboard metric consistency checks | `data-engineer`; data-engineer, qa-tester | Commit after >=3 files or logical unit |
| WBS-SM-MVP-06 | 99 percent uptime target | Team 5 | Synthetic monitoring and incident SLO reports | `devops-engineer`; devops-engineer | Commit after >=3 files or logical unit |
| WBS-SM-MVP-07 | Less than 2s page load target | Team 2 owner | Performance budget checks and Lighthouse thresholds | `frontend-lead`, `qa-testing-lead`; frontend-dev, qa-tester | Commit after >=3 files or logical unit |
| WBS-SM-KPI-01 | User registration rate tracking | Team 5 | Analytics dashboard and weekly trend report | `data-engineer`; data-engineer | Commit after >=3 files or logical unit |
| WBS-SM-KPI-02 | Case creation rate tracking | Team 4 | Instrument case create funnel events | `data-engineer`; data-engineer, backend-dev | Commit after >=3 files or logical unit |
| WBS-SM-KPI-03 | Document upload rate tracking | Team 1 | Instrument upload start/success/fail events | `data-engineer`; data-engineer, backend-dev | Commit after >=3 files or logical unit |
| WBS-SM-KPI-04 | AI feature usage tracking | Team 3 | Track AI tool calls and completion rates | `ai-ml-specialist`, `data-engineer`; ai-engineer, data-engineer | Commit after >=3 files or logical unit |
| WBS-SM-KPI-05 | Community engagement tracking | Team 3 | Track posts, replies, likes, and resolution rates | `data-engineer`; data-engineer, backend-dev | Commit after >=3 files or logical unit |
| WBS-SM-KPI-06 | Revenue metric tracking | Team 5 | Stripe billing export and internal reconciliation | `data-engineer`; data-engineer, backend-dev | Commit after >=3 files or logical unit |
| WBS-SM-KPI-07 | Support ticket volume tracking | Team 2 | Contact form ticket instrumentation and dashboard | `data-engineer`; data-engineer, backend-dev | Commit after >=3 files or logical unit |

## Quality Gate Sequence (applies to every WBS item)
1. Requirements gate: owner confirms acceptance criteria are testable.
2. Design gate: architecture lead signs off interfaces and migration strategy.
3. Build gate: code review and unit/integration tests pass.
4. Security gate: security review for auth, payments, AI, and uploads.
5. Release gate: staging validation, metrics check, rollback plan ready.
6. Handoff gate: handoff template complete and accepted by next owner.

## Single Source of Truth Link
- Canonical tracker: `docs/task-orchestration/SSOT_WBS_TRACKER.md`
- Team execution packs: `docs/task-orchestration/TEAM1_WORKFLOW_FOUNDATION.md` through `docs/task-orchestration/TEAM5_WORKFLOW_COMMERCIAL_GOVERNANCE.md`
