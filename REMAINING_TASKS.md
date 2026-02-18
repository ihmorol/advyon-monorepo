# Remaining Tasks (Excluding Team 2 & Billing)
## Generated: 19 Feb 2026

---

## Status Legend
- ✅ Done
- 🟡 In Progress
- 🔴 Not Started
- ⚠️ Blocked

---

## TEAM 1: Foundation & Document Reliability

### WBS-1.2 Remove GitHub Login from Clerk
**Status**: 🟡 In Progress  
**Owner**: Team 1  
**Priority**: MVP  

**Remaining Work**:
- [ ] Manual verification evidence (screenshots/logs)
- [ ] Confirm only email/password and Google remain
- [ ] Run targeted Vitest auth tests
- [ ] Update documentation

**Agent Workflow**:
1. Branch: `sro/feat/foundation-document-reliability`
2. Test auth flow in dev environment
3. Capture evidence (screenshots of login page)
4. Run `npm run test` in advyon-client (targeted auth tests)
5. Commit with evidence links
6. Mark DN in SSOT

---

### WBS-1.3 Fix Sync Error After Login
**Status**: 🟡 In Progress  
**Owner**: Team 1  
**Priority**: MVP  

**Remaining Work**:
- [ ] Manual resilience testing (network failure scenarios)
- [ ] Verify retry mechanism under load
- [ ] Document error handling edge cases
- [ ] Complete evidence attachment

**Agent Workflow**:
1. Test `syncUserWithRetry` with throttled network
2. Simulate Clerk token expiration mid-sync
3. Verify fallback to onboarding flow
4. Capture logs of retry attempts
5. Run `useAuthApi` vitest suite
6. Commit evidence + mark DN

---

### WBS-1.4 Form Validation (Team 1 Domain)
**Status**: 🟡 In Progress  
**Owner**: Team 1  
**Priority**: MVP  

**Remaining Work**:
- [ ] Add Zod schemas to all Team 1 forms (auth, profile, onboarding)
- [ ] Client-side validation before submission
- [ ] Server-side validation on endpoints
- [ ] Real-time validation feedback UI
- [ ] Link evidence to SSOT

**Agent Workflow**:
1. Audit all forms in Team 1 scope (check `src/features/auth`, `src/features/profile`)
2. Create Zod schemas matching existing validation logic
3. Add client validation with react-hook-form or manual
4. Add server validation middleware
5. Test each form with invalid inputs
6. Update SSOT with schema file paths

---

### WBS-5.3 Fix Document Preview in Workspace
**Status**: 🟡 In Progress  
**Owner**: Team 1  
**Priority**: MVP  

**Remaining Work**:
- [ ] Manual reliability matrix (test 10+ PDFs of varying sizes)
- [ ] Mobile responsiveness verification
- [ ] Error boundary testing (corrupted PDFs)
- [ ] Print functionality verification
- [ ] Update SSOT evidence

**Agent Workflow**:
1. Create test document set (small PDF, large PDF, scanned PDF, corrupted PDF)
2. Test preview for each in workspace
3. Test on mobile viewport
4. Verify error boundaries catch failures gracefully
5. Run `document.test.ts` suite
6. Document results in `reports/branch-status/team1-foundation.md`

---

### WBS-5.4 Fix Document Preview Page
**Status**: 🟡 In Progress  
**Owner**: Team 1  
**Priority**: MVP  

**Remaining Work**:
- [ ] Multi-type support verification (PDF, DOCX, images)
- [ ] Smooth navigation between pages
- [ ] Print functionality manual test
- [ ] Share functionality manual test
- [ ] Version history display verification

**Agent Workflow**:
1. Upload different document types to test case
2. Test preview for each type
3. Navigate between documents in same case
4. Test print button (capture browser print dialog)
5. Test share button (verify shareable link generation)
6. Upload multiple versions, verify history display
7. Commit evidence + mark DN

---

### WBS-5.5 Documents Page Download Button
**Status**: 🟡 In Progress  
**Owner**: Team 1  
**Priority**: MVP  

**Remaining Work**:
- [ ] Security review of download endpoints
- [ ] Batch download manual test (select 3+ files)
- [ ] Progress indicator verification
- [ ] Download analyzed version test
- [ ] Security evidence documentation

**Agent Workflow**:
1. Review `document.service.ts` download security
2. Test single file download with unauthorized user (should fail)
3. Test batch download with progress tracking
4. Test "download analyzed" (if feature exists)
5. Run security checklist from `reports/all/strategy/cross-repo-risks.md`
6. Document security test results
7. Commit + mark DN

---

## TEAM 4: Core Practice Operations

### WBS-4.1 Robust Personalization Database
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: Post-MVP  

**Remaining Work**:
- [ ] Verify user behavior tracking endpoints
- [ ] Test case preference learning
- [ ] Dashboard widget personalization UI
- [ ] Notification preferences wiring
- [ ] AI interaction history capture
- [ ] Document access patterns tracking

**Agent Workflow**:
1. Review personalization backend modules (already merged)
2. Test `/personalization/preferences` endpoints
3. Create test user, perform actions, verify tracking
4. Check dashboard personalization UI integration
5. Verify data flows to personalization service
6. Create contract verification document
7. Commit evidence + mark DN

---

### WBS-4.2 Case Archive Implementation
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: Post-MVP  

**Remaining Work**:
- [ ] Fix archive/restore edge case (currently returns 400)
- [ ] Manual policy confirmation (30-day automation)
- [ ] Archived cases list view verification
- [ ] Search archived cases test
- [ ] Permanent delete option test
- [ ] Data integrity verification post-restore

**Agent Workflow**:
1. Test archive case endpoint (currently guarded 400)
2. Debug and fix edge case in archive/restore
3. Test archive scheduler (if 30-day automation exists)
4. Verify archived cases hidden from active view
5. Test search within archived cases
6. Test permanent delete (with confirmation)
7. Archive case, restore it, verify data intact
8. Commit fixes + evidence

---

### WBS-5.1 New Case Creation UI Update
**Status**: 🔴 Not Started  
**Owner**: Team 4  
**Priority**: MVP  

**Remaining Work**:
- [ ] Multi-step wizard implementation
- [ ] Template selection UI
- [ ] Client assignment flow
- [ ] Document upload during creation
- [ ] Deadline auto-calculation
- [ ] Duplicate detection
- [ ] Case number auto-generation

**Agent Workflow**:
1. Branch: `sif/feat/core-practice-operations`
2. Create task packet with scope/contracts/tests/rollback
3. Design multi-step wizard component
4. Add template selection step
5. Add client assignment step
6. Integrate document upload in wizard
7. Implement deadline auto-calc logic
8. Add duplicate detection (check existing case names)
9. Implement case number generation
10. Write tests for each step
11. Commit incrementally (every 3+ files)
12. Mark DN with evidence

---

### WBS-5.2 Workspace Sidebar Real-time Updates
**Status**: 🔴 Not Started  
**Owner**: Team 4  
**Priority**: MVP  

**Remaining Work**:
- [ ] Real-time notification counts in sidebar
- [ ] New case alerts
- [ ] Message notifications badge
- [ ] Activity indicators
- [ ] Online status indicator

**Agent Workflow**:
1. Review existing socket.io setup
2. Add socket events for notification count updates
3. Update sidebar component to listen for events
4. Add new case alert toast/indicator
5. Add message notification badge logic
6. Implement activity indicator (pulse animation)
7. Add online status tracking (if not exists)
8. Test with multiple concurrent users
9. Commit + mark DN

---

### WBS-6.1 Complete Schedule Features
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: Post-MVP  

**Remaining Work**:
- [ ] Calendar view implementation (month/week/day)
- [ ] Drag-and-drop rescheduling UI
- [ ] Recurring events support
- [ ] Reminders and notifications
- [ ] Calendar sync (Google Calendar)
- [ ] Conflict detection UI
- [ ] Resource booking (courtrooms)

**Agent Workflow**:
1. Verify backend schedule endpoints work (already fixed)
2. Install FullCalendar dependency (`WBS-DEP-CL-03`)
3. Create calendar view component with month/week/day tabs
4. Implement drag-and-drop using FullCalendar DnD
5. Add recurring event logic (RRULE)
6. Wire reminders to notification system (WBS-9.1)
7. Research Google Calendar API integration
8. Add conflict detection visual indicators
9. Add courtroom resource dropdown
10. Test all flows
11. Commit + mark DN

---

### WBS-7.1 Complete Client Management Workflow
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: MVP  

**Remaining Work**:
- [ ] Client detail view completion
- [ ] Edit client details form
- [ ] Delete/archive client flow
- [ ] Case association UI improvements
- [ ] Document access management UI
- [ ] Billing history view (exclude payment - view only)

**Agent Workflow**:
1. Review existing `ClientsPage` implementation
2. Create client detail view modal/page
3. Add edit client form with validation
4. Add delete/archive confirmation flow
5. Improve case association dropdown/selector
6. Add document access management UI
7. Create billing history read-only view
8. Test all CRUD operations
9. Commit + mark DN

---

### WBS-7.2 Client-Lawyer Interconnection Message
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: MVP  

**Remaining Work**:
- [ ] Real Clerk token E2E test (currently mocked)
- [ ] File attachments in messages
- [ ] Read receipts implementation
- [ ] Message templates
- [ ] Message search

**Agent Workflow**:
1. Test with real Clerk session (not mocked)
2. Add file attachment upload to message input
3. Implement read receipts (mark as read when viewed)
4. Create message templates dropdown
5. Add message search functionality
6. Test full flow: lawyer sends → client receives → replies
7. Test file attachments (size limits, types)
8. Commit + mark DN

---

### WBS-8.1 Update Analytics Page
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: Post-MVP  

**Remaining Work**:
- [ ] Dashboard visualization parity
- [ ] Case resolution time chart
- [ ] Win/loss ratio display
- [ ] Revenue tracking UI (view only, no billing)
- [ ] Client acquisition metrics
- [ ] Document processing stats
- [ ] AI usage analytics integration
- [ ] Custom date range selector
- [ ] Export reports (PDF/Excel)

**Agent Workflow**:
1. Install Recharts dependency (`WBS-DEP-CL-04`)
2. Create analytics dashboard layout
3. Connect to `/analytics/metrics/*` endpoints (already exist)
4. Implement case resolution time chart
5. Add win/loss ratio widget
6. Add client acquisition metrics
7. Add document processing stats
8. Integrate AI usage data from Team 3 KPIs
9. Add date range picker
10. Implement PDF/Excel export
11. Test all metrics load correctly
12. Commit + mark DN

---

### WBS-9.1 Notification System Using Socket
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: MVP  

**Remaining Work**:
- [ ] Real Clerk token E2E verification
- [ ] Push notifications (PWA)
- [ ] Email notifications channel
- [ ] Notification preferences UI
- [ ] Mark as read/unread functionality

**Agent Workflow**:
1. Test socket connections with real Clerk tokens
2. Verify all notification types work:
   - Case updates
   - New messages
   - Document uploads
   - Hearing reminders
   - Deadlines
   - AI analysis complete
3. Add PWA push notification support
4. Integrate email notifications (use existing mail config)
5. Create notification preferences page
6. Implement mark as read/unread
7. Test notification reliability
8. Commit + mark DN

---

## TEAM 5: Admin Controls (No Billing)

### WBS-11.1 MVP Admin Controls
**Status**: 🟡 In Progress  
**Owner**: Team 5  
**Priority**: MVP  

**Remaining Work**:
- [ ] User management CRUD completion
- [ ] Case oversight interface
- [ ] Content moderation controls
- [ ] System settings page
- [ ] Analytics overview for admin
- [ ] Bulk operations
- [ ] Audit logs view
- [ ] superAdmin-only role mutation protection

**Agent Workflow**:
1. Branch: `ab/feat/admin-commerce-governance`
2. Create admin dashboard shell
3. Implement user management (list, edit, disable)
4. Add case oversight (view all cases, reassign)
5. Add content moderation controls (review queue UI)
6. Create system settings page
7. Add admin analytics overview
8. Implement bulk operations (bulk disable, bulk delete)
9. Create audit logs viewer
10. Add superAdmin-only guards to role mutations
11. Test role-based access (client should be blocked)
12. Commit + mark DN

---

## PROGRAM / SHARED ITEMS

### WBS-SM-MVP-01 All Critical Bugs Fixed
**Status**: 🟡 In Progress  
**Owner**: Program  
**Priority**: Governance  

**Remaining Work**:
- [ ] Triage all open issues
- [ ] Fix P0/P1 bugs
- [ ] Regression test
- [ ] Document fixed bugs

**Agent Workflow**:
1. Review GitHub issues / internal bug list
2. Categorize by severity
3. Fix critical bugs one by one
4. Run full test suite after each fix
5. Document fixes in changelog
6. Mark DN when all P0/P1 resolved

---

### WBS-SM-MVP-02 All Forms Validated
**Status**: 🟡 In Progress  
**Owner**: All Teams  
**Priority**: Governance  

**Remaining Work**:
- [ ] Team 1: Auth, profile, document forms
- [ ] Team 4: Case, schedule, client, message forms
- [ ] Team 5: Admin forms
- [ ] Cross-team validation audit

**Agent Workflow**:
1. Each team validates their domain forms
2. Use shared Zod validation patterns
3. Test client + server validation
4. Document validation schemas
5. Run automated schema checks
6. Mark DN when all teams complete

---

### WBS-SM-MVP-04 Admin Controls Functional
**Status**: 🟡 In Progress  
**Owner**: Team 5 + Security  
**Priority**: Governance  

**Remaining Work**:
- [ ] Verify role-gate abuse paths blocked
- [ ] Test client blocked from admin endpoints
- [ ] superAdmin-only mutation path secured

**Agent Workflow**:
1. Create test users (client, lawyer, admin, superAdmin)
2. Attempt admin actions as client (should fail)
3. Attempt superAdmin actions as admin (should fail)
4. Verify proper 403 responses
5. Document security test results
6. Commit + mark DN

---

### WBS-SM-MVP-05 Basic Analytics Tracking
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: Governance  

**Remaining Work**:
- [ ] Verify analytics events firing
- [ ] Dashboard parity with tracked metrics
- [ ] Export functionality working

**Agent Workflow**:
1. Verify `/analytics/metrics/*` endpoints return data
2. Check client sends analytics events
3. Verify dashboard displays metrics
4. Test export to PDF/Excel
5. Commit + mark DN

---

## TECHNICAL DEBT (High Priority)

### WBS-TD-CQ-01 Consistent Error Handling
**Status**: 🔴 Not Started  
**Owner**: Team 1  
**Priority**: High  

**Agent Workflow**:
1. Audit all API calls in Team 1 scope
2. Implement try-catch with user-friendly messages
3. Add error logging
4. Test error scenarios
5. Commit + mark DN

---

### WBS-TD-CQ-02 Proper Loading States
**Status**: 🔴 Not Started  
**Owner**: All Teams  
**Priority**: High  

**Agent Workflow**:
1. Audit all async operations
2. Add loading spinners/skeletons
3. Add error states
4. Test slow network scenarios
5. Commit + mark DN

---

### WBS-TD-CQ-03 Error Boundaries for All Routes
**Status**: 🔴 Not Started  
**Owner**: Team 1  
**Priority**: High  

**Agent Workflow**:
1. Create error boundary component
2. Wrap all route components
3. Add fallback UI
4. Test by throwing errors
5. Commit + mark DN

---

### WBS-TD-TS-01 Unit Tests for Critical Utilities
**Status**: 🟡 In Progress  
**Owner**: Team 1  
**Priority**: High  

**Agent Workflow**:
1. Identify critical utilities (auth, validation, API clients)
2. Write unit tests with Vitest
3. Achieve 80%+ coverage
4. Run tests in CI
5. Commit + mark DN

---

### WBS-TD-TS-02 Integration Tests for API Endpoints
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: High  

**Agent Workflow**:
1. Identify critical API flows
2. Write integration tests with Jest + Supertest
3. Test happy path and error cases
4. Run tests against seeded database
5. Commit + mark DN

---

### WBS-TD-TS-03 E2E Tests for Critical User Flows
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: High  

**Agent Workflow**:
1. Identify critical flows (login → create case → upload doc → message)
2. Write smoke tests (already started)
3. Expand to full E2E coverage
4. Run tests in CI
5. Commit + mark DN

---

### WBS-TD-SC-01 Rate Limiting on All Endpoints
**Status**: 🔴 Not Started  
**Owner**: Team 5  
**Priority**: High  

**Agent Workflow**:
1. Install express-rate-limit
2. Add rate limiting middleware
3. Configure limits per endpoint type
4. Test rate limiting
5. Commit + mark DN

---

### WBS-TD-SC-03 File Upload Security
**Status**: 🔴 Not Started  
**Owner**: Team 1  
**Priority**: High  

**Agent Workflow**:
1. Review file upload endpoints
2. Add file type validation
3. Add file size limits
4. Scan for malware (if possible)
5. Test with malicious files
6. Commit + mark DN

---

## DEPENDENCIES

### WBS-DEP-CL-03 FullCalendar Integration
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: High  

**Agent Workflow**:
1. Already merged - verify installation
2. Wire to schedule features (WBS-6.1)
3. Test calendar rendering
4. Commit + mark DN

---

### WBS-DEP-CL-04 Recharts Integration
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: High  

**Agent Workflow**:
1. Already merged - verify installation
2. Wire to analytics (WBS-8.1)
3. Test chart rendering
4. Commit + mark DN

---

### WBS-DEP-SV-03 node-cron
**Status**: 🟡 In Progress  
**Owner**: Team 4  
**Priority**: High  

**Agent Workflow**:
1. Already integrated - verify working
2. Test archive scheduler (WBS-4.2)
3. Test reminder jobs (WBS-6.1, WBS-9.1)
4. Commit + mark DN

---

## PROGRAM OPERATIONS (Before Production)

### WBS-OPS-01 Multi-device Git Safety
**Status**: 🔴 Not Started  
**Owner**: Team 5  
**Priority**: Critical  

**Agent Workflow**:
1. Configure branch protections in GitHub
2. Add required status checks
3. Set up CODEOWNERS
4. Test protections
5. Document in SSOT

---

### WBS-OPS-02 PR Quality Consistency
**Status**: 🔴 Not Started  
**Owner**: Team 5  
**Priority**: Critical  

**Agent Workflow**:
1. Create PR template with WBS mapping
2. Add acceptance evidence section
3. Add rollback section
4. Test template
5. Document

---

### WBS-OPS-03 Cross-device Sync Discipline
**Status**: 🔴 Not Started  
**Owner**: All Teams  
**Priority**: Critical  

**Agent Workflow**:
1. Document fetch/rebase cadence
2. Set up stale branch detection
3. Configure alerts
4. Train team
5. Document

---

### WBS-OPS-04 Contract-first Development
**Status**: 🔴 Not Started  
**Owner**: Team 4  
**Priority**: High  

**Agent Workflow**:
1. Document API contract versioning
2. Create contract change process
3. Add consumer compatibility tests
4. Enforce process
5. Document

---

### WBS-OPS-05 Merge Train and Conflict Playbook
**Status**: 🔴 Not Started  
**Owner**: Team 5  
**Priority**: Critical  

**Agent Workflow**:
1. Schedule daily merge windows
2. Define conflict resolution SLA
3. Create integration branch
4. Document playbook
5. Test process

---

### WBS-OPS-06 Handoff SLA Governance
**Status**: 🔴 Not Started  
**Owner**: All Teams  
**Priority**: High  

**Agent Workflow**:
1. Create handoff template
2. Define 4-hour acceptance SLA
3. Document escalation path
4. Test with team
5. Document

---

## Agent Workflow Guidelines

### For Each Task:

1. **Pre-Work**
   - Read SSOT WBS Tracker for current status
   - Check `reports/branch-status/` for team-specific notes
   - Create task packet (scope, contracts, tests, rollback)

2. **Development**
   - Work on assigned branch per team
   - Commit after every 3+ files or logical unit
   - Use conventional commits: `feat(WBS-5.3): add document preview error boundary`

3. **Testing**
   - Run targeted tests: `npx vitest run` (client) or `npm test` (server)
   - Manual verification per task checklist
   - Security review where applicable

4. **Documentation**
   - Update evidence in this file
   - Update SSOT WBS Tracker with commit hashes
   - Add screenshots/logs to `reports/branch-status/`

5. **Completion**
   - Mark task DN in SSOT
   - Run lint: `npm run lint` (client and server)
   - Verify build: `npm run build` (client and server)
   - Commit final evidence

### Single Agent Daily Workflow:

```
09:00 - Check SSOT for assigned tasks
09:15 - Pick highest priority task from this file
09:30 - Create task packet (5 min)
09:35 - Start implementation
11:00 - First commit (if 3+ files touched)
13:00 - Continue development
15:00 - Testing and manual verification
16:00 - Update SSOT and evidence
16:30 - Final commit with evidence
17:00 - Pick next task or help unblock others
```

### Priority Order for Single Agent:

**Week 1**: 
1. Complete Team 1 manual verification (WBS-1.2, 1.3, 5.3, 5.4, 5.5)
2. Close WBS-1.4 validation for Team 1 domain

**Week 2**:
1. Complete WBS-7.1, WBS-7.2 (Client/Messaging)
2. Complete WBS-9.1 (Notifications)
3. Start WBS-6.1 (Schedule)

**Week 3**:
1. Complete WBS-8.1 (Analytics)
2. Complete WBS-4.1, WBS-4.2 (Personalization/Archive)
3. Start WBS-5.1, WBS-5.2 (Case Creation/Sidebar)

**Week 4**:
1. Complete Team 5 Admin (WBS-11.1)
2. Close all Program items
3. Address Technical Debt
4. Final integration testing

---

## Summary

**Total Tasks**: 45  
**Completed**: 8 (Team 3 + partial)  
**In Progress**: 15  
**Not Started**: 22  

**Estimated Completion with Single Agent**: 4-5 weeks  
**Risk Areas**: 
- Real-time socket features (need WebSocket expertise)
- Security hardening (needs security review)
- Program operations (needs GitHub admin access)
