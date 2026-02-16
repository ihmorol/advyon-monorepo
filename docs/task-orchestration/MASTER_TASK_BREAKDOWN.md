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

## GitHub Multi-Device Coordination Protocol
- Canonical remotes: one GitHub repository with two app folders (`advyon-client`, `advyon-server`) and branch-per-team execution.
- Required team branches:
  - `sro/feat/foundation-document-reliability`
  - `msi/feat/public-content-metadata`
  - `ihm/feat/ai-community-intelligence`
  - `sif/feat/core-practice-operations`
  - `ab/feat/admin-commerce-governance`
- Device bootstrap sequence (every device):
  1. `git fetch origin --prune`
  2. `git checkout <team-branch>`
  3. `git pull --rebase origin <team-branch>`
  4. run repo health checks before coding.
- Sync rhythm:
  - Every 4 hours: push branch and open/update draft PR.
  - End of day: update SSOT status and handoff notes.
  - No direct pushes to integration branch without PR checks.
- Merge cadence:
  - Team branches merge into integration in scheduled windows (2 windows per day).
  - Integration merges to release only after QA + security gates pass for changed WBS IDs.

## AI Precision Execution Rules (Anti-Hallucination)
- Do not implement features outside explicit WBS scope for the active task.
- Do not invent endpoints, payload fields, or file paths; if absent, create only what the WBS references or what is required to wire the referenced behavior.
- Each task must include a `Task Packet` before coding:
  - Objective, in-scope files, out-of-scope files, API contract, data contract, acceptance checklist, test plan, rollback plan.
- Each PR must map changed files back to WBS IDs and include evidence for each acceptance item.
- Unknowns must be logged as blockers in SSOT (`BL`) instead of guessed behavior.
- Any cross-team file touch requires a documented contract update and orchestrator approval.

## Five Independent Team Workflows
| Team | Branch | Primary Scope | Non-Overlap Boundary |
|---|---|---|---|
| Team 1 Foundation Reliability | `sro/feat/foundation-document-reliability` | Auth sync, validation framework, document preview/download stability | Owns auth hooks, document viewer stack, document download endpoints |
| Team 2 Public Experience | `msi/feat/public-content-metadata` | Landing/public pages, content replacement, metadata APIs | Owns public pages and metadata module |
| Team 3 AI and Community Intelligence | `ihm/feat/ai-community-intelligence` | Moderation, AI tools, AI context, community AI assistance | Owns AI and community modules |
| Team 4 Core Practice Operations | `sif/feat/core-practice-operations` | Cases, schedule, clients, messaging, notifications, archive, analytics, personalization | Owns case/schedule/client/message/socket/analytics operations |
| Team 5 Admin Commerce Governance | `ab/feat/admin-commerce-governance` | Admin controls, payments, security/performance/testing governance, release metrics | Owns admin/payment/subscription and governance controls |

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
| WBS-9.1 | Notification System Using Socket | Team 4 | Use namespaced socket events and idempotent client reducers; preserve existing REST notification endpoints and deliver web push plus email notification channels | `backend-lead`, `devops-engineer`; backend-dev, frontend-dev, devops-engineer | Commit after >=3 files or logical unit |
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

## Program Operations Backlog (Execution Control for 5 AI Teams)
| WBS ID | Source Need | Team | How to Implement Without Breaking | Skill and Agents | Commit |
|---|---|---|---|---|---|
| WBS-OPS-01 | Multi-device Git safety | Team 5 | Enforce branch protections, required checks, and CODEOWNERS to prevent unreviewed cross-team changes | `devops-engineer`, `security-engineer`; devops-engineer, security-engineer | Commit after >=3 files or logical unit |
| WBS-OPS-02 | PR quality consistency | Team 5 | Add PR template requiring WBS mapping, acceptance evidence, and rollback notes | `team-orchestrator`, `qa-testing-lead`; team-orchestrator, qa-tester | Commit after >=3 files or logical unit |
| WBS-OPS-03 | Cross-device sync discipline | Team 5 | Define mandatory fetch/rebase/push cadence and stale-branch alerts | `team-orchestrator`, `devops-engineer`; team-orchestrator, devops-engineer | Commit after >=3 files or logical unit |
| WBS-OPS-04 | Contract-first development | Team 4 | Publish and freeze API/data contracts per sprint window before implementation starts | `architecture-lead`, `backend-lead`; architecture-lead, backend-dev, frontend-dev | Commit after >=3 files or logical unit |
| WBS-OPS-05 | Merge train and conflict playbook | Team 5 | Run twice-daily merge windows and deterministic conflict resolution rules | `team-orchestrator`; team-orchestrator, devops-engineer | Commit after >=3 files or logical unit |
| WBS-OPS-06 | Handoff SLA governance | Team 5 | Track handoff SLA (<4 hours), enforce handoff template completeness, escalate blockers | `handoff-management`, `team-orchestrator`; team-orchestrator, qa-tester | Commit after >=3 files or logical unit |

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

## Per-Task Safety Strategy (Mandatory)
Use this matrix as the default implementation policy to minimize security risk and major regressions.

### Product Tasks (MVP, Post-MVP, Future)
| WBS ID | Safest Strategy | Best Low-Risk Solution |
|---|---|---|
| WBS-1.1 | Isolate loading UI from auth logic and cap wait time. | Add a standalone loading shell with timeout fallback and keep existing auth flow untouched. |
| WBS-1.2 | Disable provider at identity source before UI edits. | Remove GitHub in Clerk config first, then remove UI button and keep provider allowlist tests. |
| WBS-1.3 | Make sync idempotent with bounded retries. | Add jittered retries, circuit breaker, user-safe error message, and onboarding fallback route. |
| WBS-1.4 | Use single source of truth for validation schemas. | Define shared Zod contracts server-first and derive client validators from the same schemas. |
| WBS-2.1 | Keep changes content-only to avoid behavior regression. | Use copy key replacement only, preserve existing component logic and route behavior. |
| WBS-2.2 | Apply additive API evolution only. | Add new metadata endpoints and constants without removing existing keys; validate responses with schema guards. |
| WBS-5.1 | Run new case wizard behind feature flag until parity. | Keep legacy create flow active, dual-run validation, then cut over after parity tests pass. |
| WBS-5.3 | Contain preview failures to UI boundary. | Add viewer error boundary, lazy load PDF rendering, and memory-safe handling for large files. |
| WBS-5.4 | Use per-document-type adapters with fallback. | Introduce adapter registry and default safe fallback to download if rendering fails. |
| WBS-5.5 | Never expose direct file paths or permanent links. | Use short-lived signed URLs, strict auth checks, audit logs, and batch queue with cancellation. |
| WBS-7.1 | Enforce tenant and role checks on every mutation. | Use server-side ACL checks, soft-delete model, and immutable activity logs for client lifecycle. |
| WBS-7.2 | Treat all messages as sensitive scoped resources. | Validate case membership per action, scan attachments, sanitize content, and index search safely. |
| WBS-9.1 | Ensure event delivery is idempotent and channel-safe. | Emit versioned socket events with idempotency keys, plus opt-in web push and email channels. |
| WBS-10.1 | Keep marketing changes isolated from app core. | Implement landing redesign in dedicated components and avoid auth/session code modification. |
| WBS-10.2 | Restrict to static and content-safe changes. | Use static data blocks and snapshot tests; no stateful business logic added. |
| WBS-10.4 | Protect inbound public forms against abuse. | Add server-side validation, CSRF protection, rate limiting, and anti-spam challenge before ticket creation. |
| WBS-11.1 | Apply least privilege and explicit approval for high-risk actions. | Build admin RBAC matrix, enforce scoped permissions, and require audit log writes for every admin mutation. |
| WBS-12.1 | Delegate PCI-sensitive flows to provider. | Use Stripe Checkout/Billing Portal, verify webhook signatures, and enforce idempotent billing ledger updates. |
| WBS-3.1 | Use asynchronous moderation with safe uncertain handling. | Moderate via queue, auto-hold uncertain content for review, and keep threshold/appeal paths configurable. |
| WBS-3.3 | Feature-flag each AI tool independently. | Add per-tool kill switches, strict prompt/output filters, timeout budgets, and provider failover fallbacks. |
| WBS-3.4 | Guard every LLM call with policy and scope checks. | Run legal-domain classifier plus prompt-injection filter before calling model and before returning output. |
| WBS-4.1 | Minimize data and separate behavioral storage from identity. | Store personalization in additive module with opt-out controls and privacy-safe aggregation. |
| WBS-4.2 | Prefer reversible archive over destructive delete. | Implement archive state machine, restore endpoint, and delayed hard-delete worker with audit trail. |
| WBS-5.2 | Keep real-time UX resilient to socket instability. | Use versioned events and fallback polling when socket disconnects or event order is uncertain. |
| WBS-6.1 | Make server authoritative for schedule conflicts. | Validate conflicts server-side in transactions; client DnD remains optimistic but rollback-capable. |
| WBS-8.1 | Decouple analytics reads from transactional workload. | Use cached aggregates and async export jobs instead of heavy live queries on OLTP paths. |
| WBS-3.2 | Keep AI assistance non-blocking and advisory only. | Provide suggestions with citations and require user confirmation before posting actions. |
| WBS-10.3 | Keep tutorials static and low-risk. | Build static guide pages with versioned content and no privileged or mutable endpoints. |
| WBS-10.5 | Keep policy pages immutable and traceable. | Serve versioned static pages and maintain change history; blog remains placeholder until CMS decision. |
| WBS-8.1-FUT | Protect advanced reporting with async and RBAC. | Use materialized views, signed export links, and strict role-based report access controls. |

### Technical Debt and Refactoring Tasks
| WBS ID | Safest Strategy | Best Low-Risk Solution |
|---|---|---|
| WBS-TD-CQ-01 | Standardize non-sensitive error handling globally. | Adopt a common error envelope that hides stack traces and maps to stable client messages. |
| WBS-TD-CQ-02 | Prevent loading deadlocks and stale UI states. | Use cancellable requests, deterministic loading states, and timeout fallbacks for every async path. |
| WBS-TD-CQ-03 | Localize runtime UI failures to route scope. | Add route-level error boundaries with recovery actions and telemetry correlation IDs. |
| WBS-TD-CQ-04 | Freeze type contracts across teams. | Publish versioned shared TS contract package and block incompatible changes in CI. |
| WBS-TD-CQ-05 | Document only stable interfaces. | Add JSDoc for public APIs/services and enforce docs lint to prevent stale signatures. |
| WBS-TD-PF-01 | Avoid caching sensitive or cross-tenant leakage. | Use scoped cache keys (tenant/user), TTL controls, and explicit invalidation hooks. |
| WBS-TD-PF-02 | Optimize assets without changing functional behavior. | Use safe image pipeline (strip metadata, compress variants) and preserve existing UI outputs. |
| WBS-TD-PF-03 | Prevent unbounded list queries. | Enforce max page size, stable sort, and cursor/page contracts on all list endpoints. |
| WBS-TD-PF-04 | Keep virtualized UI accessible and predictable. | Use virtualization where needed with keyboard/a11y fallback to paginated views. |
| WBS-TD-PF-05 | Make retries and duplicates harmless. | Add request fingerprint dedupe client-side and idempotency keys server-side. |
| WBS-TD-TS-01 | Keep unit tests deterministic and isolated. | Use pure fixtures and strict mocks for critical utilities with no network dependence. |
| WBS-TD-TS-02 | Validate module integration against real contracts. | Run integration suites on seeded ephemeral DB and reset state between test cases. |
| WBS-TD-TS-03 | Verify critical flows end-to-end in hermetic env. | Use Playwright with deterministic test data and failure artifacts for triage. |
| WBS-TD-TS-04 | Shift accessibility left in CI. | Run automated a11y checks plus manual keyboard/screen-reader pass on high-traffic routes. |
| WBS-TD-TS-05 | Gate regressions with measurable budgets. | Enforce performance thresholds in CI and fail builds on regression deltas. |
| WBS-TD-SC-01 | Throttle abuse before it hits core services. | Implement adaptive route-level and user-level rate limiting with escalation controls. |
| WBS-TD-SC-02 | Sanitize once, encode by output context. | Centralize sanitization pipeline and context-aware encoding for UI, markdown, and logs. |
| WBS-TD-SC-03 | Never trust uploaded files. | Validate MIME and extension, scan content, quarantine suspicious files, and enforce size limits. |
| WBS-TD-SC-04 | Remove wildcard CORS behavior. | Use strict origin/method/header allowlist per environment and verify preflight policy. |
| WBS-TD-SC-05 | Treat secrets as rotated credentials, not constants. | Rotate secrets, scan history for leaks, and move all runtime secrets to managed secure storage. |

### Dependency Tasks
| WBS ID | Safest Strategy | Best Low-Risk Solution |
|---|---|---|
| WBS-DEP-CL-01 | Pin versions and verify integrity. | Add exact `@stripe/stripe-js` version, lockfile update, and smoke test in billing route only. |
| WBS-DEP-CL-02 | Restrict payment UI dependency scope. | Add `@stripe/react-stripe-js` with lazy loading and isolate usage to billing components. |
| WBS-DEP-CL-03 | Encapsulate calendar dependency behind adapter. | Wrap calendar library in a single component boundary to prevent broad UI coupling. |
| WBS-DEP-CL-04 | Keep charting optional and isolated. | Import charts dynamically on analytics pages and avoid global bundle coupling. |
| WBS-DEP-SV-01 | Enforce provider SDK hardening. | Use pinned `stripe` SDK, strict webhook signature validation, and replay-safe event handling. |
| WBS-DEP-SV-02 | Isolate moderation runtime and resources. | Run toxicity stack asynchronously with worker limits and fallback review queue. |
| WBS-DEP-SV-03 | Prevent duplicate scheduled executions. | Use `node-cron` with distributed lock/idempotent job guards and execution telemetry. |

### Program Operations Tasks
| WBS ID | Safest Strategy | Best Low-Risk Solution |
|---|---|---|
| WBS-OPS-01 | Enforce repository safety by policy, not convention. | Configure branch protections, required checks, CODEOWNERS, and protected environments. |
| WBS-OPS-02 | Make review quality non-optional. | Use mandatory PR template with WBS mapping, acceptance evidence, and rollback notes. |
| WBS-OPS-03 | Reduce drift across 5 devices via strict sync cadence. | Enforce fetch/rebase/push cycle every 4 hours with stale branch alerts. |
| WBS-OPS-04 | Freeze contracts before implementation. | Publish versioned API/data contracts at sprint start and block unapproved contract drift. |
| WBS-OPS-05 | Eliminate random merges and conflict chaos. | Use fixed merge windows and deterministic conflict ownership rules. |
| WBS-OPS-06 | Treat handoff latency as delivery risk. | Enforce handoff template and SLA under 4 hours with automatic blocker escalation. |

### Success Metrics and KPI Verification Tasks
| WBS ID | Safest Strategy | Best Low-Risk Solution |
|---|---|---|
| WBS-SM-MVP-01 | Block release on unresolved critical bugs. | Gate release with automated severity check and signed QA confirmation. |
| WBS-SM-MVP-02 | Verify complete validation coverage objectively. | Maintain form-endpoint coverage matrix with automated pass/fail checks in CI. |
| WBS-SM-MVP-03 | Validate payment reliability in controlled mode. | Run Stripe test-mode transaction suite with webhook replay verification before release. |
| WBS-SM-MVP-04 | Prove admin safety, not just functionality. | Execute RBAC abuse tests, audit-log integrity checks, and privileged action review. |
| WBS-SM-MVP-05 | Detect analytics data drift early. | Use event-to-report reconciliation checks and schema conformance alerts. |
| WBS-SM-MVP-06 | Track uptime via proactive monitoring. | Use synthetic checks, SLO/error budget alerts, and incident response runbook validation. |
| WBS-SM-MVP-07 | Enforce performance at build and runtime. | Apply Lighthouse and Web Vitals budgets with hard fail thresholds. |
| WBS-SM-KPI-01 | Collect only needed registration telemetry. | Use privacy-safe event schema with minimal fields and retention controls. |
| WBS-SM-KPI-02 | Make case-creation KPI reproducible. | Instrument deterministic funnel events with schema versioning and dedupe keys. |
| WBS-SM-KPI-03 | Protect upload telemetry from sensitive leakage. | Track upload outcomes without storing document contents or sensitive metadata. |
| WBS-SM-KPI-04 | Measure AI usage with safety context. | Record model, latency, cost, and safety outcome metadata only. |
| WBS-SM-KPI-05 | Track engagement without exposing private content. | Log interaction counts and states, not raw post/reply bodies. |
| WBS-SM-KPI-06 | Reconcile revenue against source of truth. | Cross-check internal revenue events with Stripe ledger reconciliation jobs. |
| WBS-SM-KPI-07 | Standardize support metrics from controlled sources. | Track ticket lifecycle events from contact pipeline with strict schema validation. |

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
- Deterministic execution protocol: `docs/task-orchestration/AI_EXECUTION_PROTOCOL.md`
