# ONE-DAY SPRINT - Remaining Tasks
## Agent Execution Guide - 19 Feb 2026
## Context: Single Agent, 8-12 Hour Sprint, Sequential Execution

---

## ⚡ CRITICAL: READ THIS FIRST

**Your Mission**: Complete as many MVP-critical tasks as possible in one day. Work SEQUENTIALLY through this list. Do NOT skip around.

**Time Budget**: 8-12 hours total  
**Estimated Completion**: 15-20 tasks (core MVP functional)  
**Success Metric**: Platform demo-able with auth, cases, documents, messages, notifications working

---

## 📋 BEFORE YOU START

### Required Context Files (READ THESE FIRST)
1. **SSOT Status**: `docs/task-orchestration/SSOT_WBS_TRACKER.md` - Check current status
2. **Team Status**: `reports/branch-status/team1-foundation.md`, `team4-operations.md`, `team5-admin.md`
3. **Merge Status**: `reports/all/strategy/implementation-verification-2026-02-18.md`
4. **Risk Analysis**: `reports/all/strategy/cross-repo-risks.md`
5. **Project Structure**: `AGENTS.md` - Understand codebase layout
6. **Team 3 Handoff**: `docs/task-orchestration/team3-handoff/TEAM3_MANUAL_VERIFICATION_PLAYBOOK.md` - Example of good verification

### Skill to Load
```
Use skill: "feature-development" - Complete end-to-end workflow for developing features
```

### Environment Setup (5 min)
```bash
# Verify builds work
cd advyon-client && npm run build
cd ../advyon-server && npm run build

# Run seed if needed
cd advyon-server && npm run seed:db

# Start dev servers
cd advyon-server && npm run dev  # Terminal 1
cd advyon-client && npm run dev  # Terminal 2
```

---

## 🎯 EXECUTION ORDER (DO NOT REORDER)

## PHASE 1: FOUNDATION HARDENING (2 hours)
**Goal**: Make auth and documents rock-solid for demo

---

### TASK 1: WBS-1.2 GitHub Login Removal Verification
**Status**: 🟡 In Progress → Should be Done  
**Skill**: `frontend-lead`  
**Time**: 15 min  
**Priority**: CRITICAL  

**Evidence Required**:
- Screenshot of login page showing ONLY Email + Google (no GitHub)
- Vitest auth test passing: `npx vitest run src/features/auth/useAuthApi.test.ts`

**Steps**:
1. Read Clerk configuration: `advyon-client/src/components/auth/SignInForm.jsx`
2. Check Clerk dashboard (if access) or inspect sign-in component
3. Verify no GitHub OAuth provider configured
4. Run targeted test: `cd advyon-client && npx vitest run useAuthApi --reporter=verbose`
5. Take screenshot of login page
6. Update `docs/task-orchestration/SSOT_WBS_TRACKER.md` line 108: Change IP → DN, add evidence
7. Commit: `git add . && git commit -m "docs: WBS-1.2 GitHub removal verified with evidence"`

**If GitHub still present**:
- Remove from ClerkProvider in `advyon-client/src/main.jsx`
- Update SSOT
- Commit fix

**References**:
- File: `advyon-client/src/components/auth/SignInForm.jsx`
- File: `advyon-client/src/main.jsx`
- Test: `advyon-client/src/features/auth/useAuthApi.test.ts`

---

### TASK 2: WBS-1.3 Sync Error Manual Verification
**Status**: 🟡 In Progress  
**Skill**: `frontend-lead` + `qa-testing-lead`  
**Time**: 30 min  
**Priority**: CRITICAL  

**Evidence Required**:
- Network throttling test results
- Retry mechanism logs
- Fallback to onboarding confirmation

**Steps**:
1. Read sync logic: `advyon-client/src/features/auth/useAuthSync.js`
2. Open Chrome DevTools → Network tab → Throttle to "Slow 3G"
3. Sign in with test account
4. Watch for retry attempts in console (should see "Retrying sync...")
5. Simulate failure: Block `POST /users/sync` in Network tab, verify graceful error
6. Test success case: Unblock, verify sync completes
7. Capture console logs showing retry behavior
8. Update SSOT line 109: Add evidence links
9. Commit evidence

**Test Script** (save as `test-sync.js`):
```javascript
// Run in browser console during sign-in
console.log('Testing sync retry...');
// Should see multiple attempts before success
```

**References**:
- File: `advyon-client/src/features/auth/useAuthSync.js`
- File: `advyon-client/src/features/auth/useAuthApi.js`
- Test: `advyon-client/src/features/auth/useAuthApi.test.ts`

---

### TASK 3: WBS-1.4 Form Validation - Team 1 Domain
**Status**: 🟡 In Progress  
**Skill**: `frontend-lead` + `backend-lead`  
**Time**: 45 min  
**Priority**: CRITICAL  

**Scope**: Auth forms, profile forms, onboarding forms  
**Evidence Required**:
- List of forms with Zod schemas
- Screenshots of validation errors
- Server validation middleware proof

**Steps**:
1. **Audit Forms** - Find all Team 1 forms:
   ```bash
   cd advyon-client
   find src/features -name "*.jsx" -o -name "*.js" | xargs grep -l "form\|Form" | head -20
   ```

2. **Check Current Validation**:
   - Read: `advyon-client/src/features/auth/components/LoginForm.jsx`
   - Read: `advyon-client/src/features/auth/components/RegisterForm.jsx`
   - Read: `advyon-client/src/features/profile/components/ProfileForm.jsx`

3. **Add Zod Schema** (if missing):
   ```javascript
   // In form file or separate validation.js
   import { z } from 'zod';
   
   const loginSchema = z.object({
     email: z.string().email('Invalid email'),
     password: z.string().min(8, 'Password must be 8+ chars')
   });
   ```

4. **Add Client Validation**:
   - Use `react-hook-form` with `zodResolver` if available
   - Or manual validation before submit

5. **Add Server Validation** (if missing):
   - Read: `advyon-server/src/app/modules/user/user.validation.ts`
   - Add validation middleware to routes

6. **Test Each Form**:
   - Submit empty form → should show errors
   - Submit invalid email → should show error
   - Submit valid → should succeed

7. Document in SSOT line 110: Add checklist with ✅ for each form

**References**:
- Client validation example: `advyon-client/src/features/community/validation.js` (Team 3 example)
- Server validation: `advyon-server/src/app/modules/user/user.validation.ts`
- Zod docs: Already used in project

---

### TASK 4: WBS-5.3 Document Preview Manual Test
**Status**: 🟡 In Progress  
**Skill**: `frontend-lead` + `qa-testing-lead`  
**Time**: 30 min  
**Priority**: HIGH  

**Evidence Required**:
- Test 5 PDFs of different sizes (1MB, 5MB, 10MB, 20MB, 50MB+)
- Mobile screenshot
- Error boundary test with corrupted PDF

**Steps**:
1. Locate document preview component:
   ```bash
   find advyon-client/src -name "*DocumentPreview*" -o -name "*Preview*" | grep -i document
   ```

2. **Test Matrix**:
   | File | Size | Result | Screenshot |
   |------|------|--------|------------|
   | small.pdf | 1MB | ✅ | [link] |
   | medium.pdf | 5MB | ✅ | [link] |
   | large.pdf | 10MB | ✅ | [link] |
   | xlarge.pdf | 20MB | ? | [link] |
   | corrupted.pdf | - | Error caught | [link] |

3. **Mobile Test**:
   - Chrome DevTools → Device toolbar → iPhone 12 Pro
   - Test preview renders correctly

4. **Update SSOT** line 121: Add reliability matrix

**References**:
- Component: `advyon-client/src/features/documents/components/DocumentViewer.jsx` (find exact path)
- Error boundary: `advyon-client/src/components/ErrorBoundary.jsx`

---

## PHASE 2: MESSAGING & NOTIFICATIONS (2.5 hours)
**Goal**: Real-time communication working end-to-end

---

### TASK 5: WBS-7.2 Client-Lawyer Messaging - File Attachments
**Status**: 🟡 In Progress  
**Skill**: `frontend-lead` + `backend-lead`  
**Time**: 45 min  
**Priority**: CRITICAL  

**Evidence Required**:
- Video/screenshots of file upload in message
- File appears in conversation
- Size limit enforced

**Steps**:
1. **Find Message Components**:
   ```bash
   find advyon-client/src -name "*Message*" -o -name "*Chat*" | head -10
   find advyon-server/src/app/modules -name "*message*" -type d
   ```

2. **Read Current Implementation**:
   - Client: `advyon-client/src/features/messages/components/ChatInterface.jsx` (find exact)
   - Server: `advyon-server/src/app/modules/message/message.service.ts`
   - Controller: `advyon-server/src/app/modules/message/message.controller.ts`

3. **Add File Upload to UI**:
   - Add file input to message composer
   - Show attachment preview
   - Add file size limit (10MB)

4. **Update Server Endpoint**:
   - Modify `POST /messages` to accept `attachments` array
   - Upload to Cloudinary (already configured)
   - Store URLs in message document

5. **Test**:
   - Lawyer sends message with PDF attachment
   - Client receives and can download
   - Try uploading 15MB file → should reject

6. **Commit**: `feat(WBS-7.2): add file attachments to messaging`

**References**:
- File: `advyon-client/src/features/messages/components/MessageInput.jsx` (find exact)
- File: `advyon-server/src/app/modules/message/message.service.ts`
- Cloudinary config: `advyon-server/src/app/config/cloudinary.config.ts`

---

### TASK 6: WBS-7.2 Read Receipts
**Status**: 🔴 Not Started  
**Skill**: `frontend-lead` + `backend-lead`  
**Time**: 30 min  
**Priority**: HIGH  

**Evidence Required**:
- Screenshot showing "Read" status
- Database shows `readAt` timestamp

**Steps**:
1. **Update Message Schema** (if needed):
   ```typescript
   // advyon-server/src/app/modules/message/message.model.ts
   readAt: { type: Date, default: null }
   ```

2. **Add Mark-as-Read Endpoint**:
   ```typescript
   // PATCH /messages/:id/read
   async markAsRead(messageId: string, userId: string) {
     await Message.findByIdAndUpdate(messageId, { readAt: new Date() });
   }
   ```

3. **Update UI**:
   - Show "Delivered" / "Read" status below messages
   - Call mark-as-read when message enters viewport

4. **Test**: Send message, open as recipient, verify status changes

5. **Commit**

**References**:
- Model: `advyon-server/src/app/modules/message/message.model.ts`
- Socket events: `advyon-server/src/app/modules/message/message.socket.ts` (if exists)

---

### TASK 7: WBS-9.1 Notification System - Real Socket Test
**Status**: 🟡 In Progress  
**Skill**: `frontend-lead` + `backend-lead`  
**Time**: 45 min  
**Priority**: CRITICAL  

**Evidence Required**:
- Notification appears in real-time
- Badge counter updates
- All notification types tested

**Test Checklist**:
- [ ] Case update notification
- [ ] New message notification
- [ ] Document upload notification
- [ ] Deadline reminder

**Steps**:
1. **Verify Socket Setup**:
   - Server: `advyon-server/src/server.ts` (socket.io setup)
   - Client: `advyon-client/src/lib/socket.js` (socket client)

2. **Test Real-Time**:
   - Open two browsers (Lawyer + Client)
   - Lawyer creates case → Client should get notification
   - Send message → Real-time badge update

3. **Test Each Type**:
   ```javascript
   // In browser console of receiving user
   socket.on('notification', (data) => console.log('Received:', data));
   ```

4. **Fix Any Issues**:
   - Check auth token passing in socket connection
   - Verify room joining (user-specific rooms)

5. **Update SSOT** line 129: Add evidence

**References**:
- Server socket: `advyon-server/src/app/modules/notification/notification.socket.ts`
- Client socket: `advyon-client/src/lib/socket.js`
- Store: `advyon-client/src/store/notificationStore.js`

---

### TASK 8: WBS-9.1 Notification Preferences UI
**Status**: 🔴 Not Started  
**Skill**: `frontend-lead`  
**Time**: 30 min  
**Priority**: MEDIUM  

**Evidence Required**:
- Settings page with notification toggles
- Toggles persist after refresh

**Steps**:
1. Create `NotificationSettingsPage.jsx`
2. Add toggles for:
   - Case updates
   - Messages
   - Documents
   - Deadlines
   - AI analysis complete
3. Connect to API endpoint
4. Save preferences to backend
5. Test toggles work

**References**:
- Settings example: `advyon-client/src/features/profile/pages/ProfileSettings.jsx`
- API: Create endpoint if doesn't exist

---

## PHASE 3: SCHEDULE & ANALYTICS (2 hours)
**Goal**: Visual schedule and analytics working

---

### TASK 9: WBS-6.1 Schedule - Basic Calendar View
**Status**: 🟡 In Progress  
**Skill**: `frontend-lead`  
**Time**: 45 min  
**Priority**: HIGH  

**Evidence Required**:
- Calendar displays events
- Month/week/day views switch
- Events clickable

**Steps**:
1. **Check Dependencies**:
   ```bash
   cd advyon-client && npm list @fullcalendar/react
   ```
   Should already be installed (WBS-DEP-CL-03)

2. **Create Calendar Component**:
   ```bash
   find advyon-client/src -name "*Schedule*" -o -name "*Calendar*" | head -10
   ```

3. **Implement Basic Views**:
   - Month view (default)
   - Week view toggle
   - Day view toggle
   - Show event titles

4. **Connect to API**:
   - GET `/schedules` endpoint (should exist)
   - Map events to FullCalendar format

5. **Test**: Create event, see it on calendar

**References**:
- Service: `advyon-client/src/features/schedule/services/scheduleService.js`
- Store: `advyon-client/src/store/scheduleStore.js`
- FullCalendar docs: Already in dependencies

---

### TASK 10: WBS-6.1 Schedule - Conflict Detection
**Status**: 🔴 Not Started  
**Skill**: `backend-lead`  
**Time**: 30 min  
**Priority**: MEDIUM  

**Evidence Required**:
- Creating overlapping events shows warning
- Conflict highlighted in UI

**Steps**:
1. Read schedule service: `advyon-server/src/app/modules/schedule/schedule.service.ts`
2. Add conflict check in create/update:
   ```typescript
   const conflicts = await Schedule.find({
     userId,
     $or: [
       { startTime: { $lt: endTime, $gte: startTime } },
       { endTime: { $gt: startTime, $lte: endTime } }
     ]
   });
   
   if (conflicts.length > 0) {
     return { warning: 'Scheduling conflict detected', conflicts };
   }
   ```
3. Show warning in UI when creating event
4. Highlight conflicting events in calendar

**References**:
- Service: `advyon-server/src/app/modules/schedule/schedule.service.ts`
- Model: `advyon-server/src/app/modules/schedule/schedule.model.ts`

---

### TASK 11: WBS-8.1 Analytics - Basic Dashboard
**Status**: 🟡 In Progress  
**Skill**: `frontend-lead`  
**Time**: 45 min  
**Priority**: HIGH  

**Evidence Required**:
- Analytics page loads with charts
- Data from `/analytics/metrics/*` displays
- At least 3 metrics visible

**Steps**:
1. **Verify Dependencies**:
   ```bash
   cd advyon-client && npm list recharts
   ```

2. **Find Analytics Components**:
   ```bash
   find advyon-client/src -name "*Analytics*" -o -name "*Dashboard*" | head -10
   ```

3. **Test API Endpoints**:
   ```bash
   curl http://localhost:5000/analytics/metrics/cases
   curl http://localhost:5000/analytics/metrics/overview
   ```

4. **Create Charts**:
   - Cases by status (pie chart)
   - Cases over time (line chart)
   - Upcoming deadlines (list)

5. **Use Recharts**:
   ```jsx
   import { PieChart, Pie, Cell } from 'recharts';
   ```

6. **Test**: Load analytics page, verify charts render

**References**:
- Store: `advyon-client/src/store/analyticsStore.js`
- Service: `advyon-client/src/features/analytics/services/analyticsService.js`
- Recharts examples: Already in project dependencies

---

## PHASE 4: CASE MANAGEMENT (1.5 hours)
**Goal**: Smooth case creation and client management

---

### TASK 12: WBS-5.1 New Case Creation - Basic Wizard
**Status**: 🔴 Not Started  
**Skill**: `frontend-lead`  
**Time**: 45 min  
**Priority**: HIGH  

**Evidence Required**:
- Multi-step form works
- Case created successfully
- At least 2 steps implemented

**Steps**:
1. **Find Current New Case Form**:
   ```bash
   find advyon-client/src -name "*NewCase*" -o -name "*CaseForm*" | head -10
   ```

2. **Convert to Wizard**:
   - Step 1: Case details (title, type, urgency)
   - Step 2: Client assignment
   - Step 3: Review & Create

3. **Add State Management**:
   ```javascript
   const [step, setStep] = useState(1);
   const [formData, setFormData] = useState({});
   ```

4. **Navigation**:
   - Next/Back buttons
   - Progress indicator
   - Can't proceed if invalid

5. **Test**: Create case through wizard

**References**:
- Component: `advyon-client/src/features/cases/components/CaseForm.jsx` (find exact)
- API: `advyon-client/src/features/cases/services/caseService.js`

---

### TASK 13: WBS-7.1 Client Management - Invite Flow
**Status**: 🟡 In Progress  
**Skill**: `frontend-lead`  
**Time**: 30 min  
**Priority**: MEDIUM  

**Evidence Required**:
- "Add Client" button works
- Invite sent to existing user
- Access revocation works

**Steps**:
1. **Find Clients Page**:
   ```bash
   find advyon-client/src -name "*Client*" -type f | grep -i page
   ```

2. **Verify Current Implementation**:
   - According to SSOT, this is partially done
   - Should have case selection + invite flow

3. **Test Invite Flow**:
   - Click "Add Client"
   - Select case
   - Enter existing user email
   - Verify `/case-access/share` called

4. **Test Remove Access**:
   - Click "Remove Access"
   - Verify `/case-access/:caseId/:userId` called
   - Verify access revoked

5. **Fix Any Issues**

**References**:
- Page: `advyon-client/src/features/clients/pages/ClientsPage.jsx`
- Service: `advyon-client/src/features/caseAccess/services/caseAccessService.js`
- Backend: `advyon-server/src/app/modules/caseAccess/caseAccess.service.ts`

---

### TASK 14: WBS-4.2 Archive - Basic Functionality
**Status**: 🟡 In Progress  
**Skill**: `frontend-lead` + `backend-lead`  
**Time**: 30 min  
**Priority**: MEDIUM  

**Evidence Required**:
- Can archive a case
- Archived cases hidden from active list
- Can restore archived case

**Steps**:
1. **Check Backend** (should be merged):
   - Read: `advyon-server/src/app/modules/archive/archive.service.ts`
   - Verify archive/restore endpoints exist

2. **Add Archive Button**:
   - In case actions menu
   - Confirmation dialog
   - Call `POST /cases/:id/archive`

3. **Filter Active Cases**:
   - Modify case list to exclude archived
   - Add "Show Archived" toggle

4. **Restore Function**:
   - In archived cases view
   - Call `POST /cases/:id/restore`

5. **Test**: Archive → Verify hidden → Restore → Verify visible

**References**:
- Service: `advyon-server/src/app/modules/archive/archive.service.ts` (or in case service)
- Store: `advyon-client/src/store/caseStore.js`

---

## PHASE 5: POLISH & PROGRAM (1 hour)
**Goal**: Error handling, loading states, basic program ops

---

### TASK 15: WBS-TD-CQ-02 Add Loading States
**Status**: 🔴 Not Started  
**Skill**: `frontend-lead`  
**Time**: 30 min  
**Priority**: HIGH  

**Evidence Required**:
- Loading spinners on all async operations
- No jarring content flashes

**Critical Areas**:
- [ ] Auth loading (login/register)
- [ ] Case list loading
- [ ] Document upload
- [ ] Message sending
- [ ] Analytics loading

**Steps**:
1. **Find Missing Loading States**:
   ```bash
   cd advyon-client
   grep -r "isLoading\|loading\|Loading" src/features --include="*.jsx" | grep -v node_modules
   ```

2. **Add to Each Critical Component**:
   ```jsx
   if (isLoading) return <LoadingSpinner />;
   // or
   <Button disabled={isLoading}>
     {isLoading ? 'Loading...' : 'Submit'}
   </Button>
   ```

3. **Use Existing Spinner**:
   - Find project's loading component
   - Or use simple: `<div className="animate-spin">⏳</div>`

4. **Quick Test**: Throttle network, verify spinners appear

**References**:
- Component: Find existing loader in `advyon-client/src/components/ui/`

---

### TASK 16: WBS-TD-CQ-01 Basic Error Handling
**Status**: 🔴 Not Started  
**Skill**: `frontend-lead`  
**Time**: 20 min  
**Priority**: HIGH  

**Evidence Required**:
- API errors show user-friendly messages
- No console errors visible to users

**Quick Implementation**:
1. Create error handler utility:
   ```javascript
   // utils/errorHandler.js
   export const handleApiError = (error) => {
     const message = error.response?.data?.message || 'Something went wrong';
     toast.error(message);
     console.error(error);
   };
   ```

2. Wrap all API calls:
   ```javascript
   try {
     await api.post('/cases', data);
   } catch (error) {
     handleApiError(error);
   }
   ```

3. Add to 3-5 most critical features (cases, auth, messages)

**References**:
- API client: `advyon-client/src/services/_shared/apiClient.js`
- Toast: Find existing toast library in project

---

### TASK 17: WBS-OPS-01 Branch Protections (If GitHub Access)
**Status**: 🔴 Not Started  
**Skill**: `devops-engineer`  
**Time**: 10 min  
**Priority**: LOW  

**Only if you have admin access to GitHub repo**

**Steps**:
1. Go to repo Settings → Branches
2. Add rule for `main`:
   - Require pull request reviews
   - Require status checks (if CI set up)
3. Add rule for team branches:
   - `sro/feat/*`, `msi/feat/*`, etc.

**References**:
- GitHub docs: Settings → Branches → Add rule

---

## 🏁 END-OF-DAY CHECKLIST

Before finishing, verify:

### Builds Pass
```bash
cd advyon-client && npm run build  # Should complete with 0 errors
cd ../advyon-server && npm run build  # Should complete with 0 errors
```

### Critical Paths Work
- [ ] Can login with email + password
- [ ] Can create new case
- [ ] Can upload document
- [ ] Can preview document
- [ ] Can send message with file
- [ ] Receive real-time notification
- [ ] View schedule on calendar
- [ ] View analytics dashboard
- [ ] Archive/restore case

### SSOT Updated
- [ ] All completed tasks marked DN
- [ ] Evidence links added
- [ ] Commit hashes recorded

### Commits Made
```bash
git log --oneline -20  # Verify commits with WBS references
```

---

## 🚨 TROUBLESHOOTING

### Build Fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npx tsc --noEmit
```

### Socket.io Not Working
1. Check server running on correct port
2. Verify CORS config in `advyon-server/src/app.ts`
3. Check client connects to correct URL

### Tests Failing
- Focus on manual verification for MVP
- Skip vitest if environment issues (use schema checks instead)
- Prioritize working features over perfect tests

### Out of Time
If running out of time, ensure these 5 work:
1. ✅ Auth (login/logout)
2. ✅ Create case
3. ✅ Upload/view document
4. ✅ Send message
5. ✅ Receive notification

---

## 📚 CONTEXT EXTRACTION REFERENCES

When working on a task, extract context from:

### Code Patterns
- Team 3 code (complete): `advyon-client/src/features/community/`
- Team 3 validation: `advyon-client/src/features/community/validation.js`
- Team 3 server: `advyon-server/src/app/modules/community/`

### Similar Features
- Auth pattern: `advyon-client/src/features/auth/`
- API pattern: `advyon-client/src/services/`
- Store pattern: `advyon-client/src/store/`

### Configuration
- Environment: `advyon-client/.env.example`, `advyon-server/.env.example`
- Routes: `advyon-server/src/app/routes.ts`
- Middleware: `advyon-server/src/app/middlewares/`

### Testing
- Team 3 tests: `advyon-server/src/app/modules/community/community.moderation.service.test.ts`
- Test config: `advyon-server/jest.config.js`

---

## 🎯 SUCCESS CRITERIA

At end of day, you should have:

**Must Have (Demo Blockers)**:
- [ ] Login works, no GitHub option
- [ ] Can create case via wizard
- [ ] Can upload and preview document
- [ ] Can send/receive messages
- [ ] Real-time notifications work

**Should Have (Polish)**:
- [ ] Form validation on critical forms
- [ ] Loading states visible
- [ ] Basic error handling
- [ ] Schedule calendar view
- [ ] Analytics charts display

**Nice to Have (If Time)**:
- [ ] File attachments in messages
- [ ] Read receipts
- [ ] Notification preferences
- [ ] Archive/restore cases

---

## 📝 NOTES FOR AGENT

1. **Don't over-engineer** - Get it working first, polish later
2. **Use existing patterns** - Copy from Team 3 (they're complete)
3. **Test manually** - Don't rely solely on automated tests
4. **Commit often** - Every 30-60 min or after each feature
5. **Update SSOT** - Mark tasks DN with evidence immediately
6. **Ask for help** - If stuck >20 min on one issue, move on

**Remember**: A working MVP with 15 tasks done is better than a perfect MVP with 5 tasks done.

---

**Good luck! Execute with confidence. You've got this.** 🚀
