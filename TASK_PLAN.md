# Advyon Legal Platform - Complete Task Plan

## Project Overview
**Advyon** is a next-generation legal practice management platform powered by AI, built with:
- **Frontend**: React + Vite + Tailwind CSS + Clerk Authentication
- **Backend**: Node.js + Express + MongoDB + Mongoose
- **AI Integration**: OpenRouter (Gemini), Groq, Google Generative AI
- **Real-time**: Socket.io for notifications and updates
- **File Storage**: Cloudinary

---

## Current State Analysis

### ✅ Already Implemented
| Feature | Status | Notes |
|---------|--------|-------|
| Authentication (Clerk) | ✅ | JWT-based with backend sync |
| User Management | ✅ | Roles: superAdmin, admin, lawyer, client, judge |
| Case Management | ✅ | CRUD, folders, status tracking |
| Document Management | ✅ | Upload, AI analysis, categorization |
| AI Document Analysis | ✅ | OpenRouter integration for legal doc analysis |
| Schedule/Calendar | ✅ | Events, hearings, deadlines |
| Community Hub | ✅ | Threads, replies, voting |
| Messaging | ✅ | Client-lawyer communication |
| Notifications (API) | ✅ | REST endpoints ready |
| Socket.io | ✅ | Connection established |
| Legal Database | ✅ | Bangladesh laws seed data |
| Analytics (Basic) | ✅ | Basic stats page |

### ⚠️ Partially Implemented / Broken
| Feature | Status | Issue |
|---------|--------|-------|
| Form Validation | ⚠️ | Some Zod schemas exist, not applied consistently |
| Document Preview | ⚠️ | Has viewer but may have bugs |
| Document Download | ⚠️ | UI exists, functionality missing |
| Client Management | ⚠️ | List view exists, CRUD incomplete |
| Landing Page | ⚠️ | Basic hero, needs loading state |
| Sync Error Handling | ⚠️ | Error after login reported |

### ❌ Missing / Coming Soon
| Feature | Status | Priority |
|---------|--------|----------|
| Content Moderation | ❌ | AI-based for community |
| AI Tools Page | ❌ | Listed as ComingSoon |
| Case Archive | ❌ | Route exists, no implementation |
| Payment Integration | ❌ | Not started |
| Admin Controls | ❌ | Basic routes exist |
| Public Pages | ❌ | About, Contact, How to use |

---

## Structured Task List

### 🔴 Phase 1: Critical Fixes & Foundation

#### 1.1 Landing Page Loading State
**Priority**: 🔴 Critical  
**Status**: ❌ Missing  
**Description**: Add loading animation before showing landing page content  
**Files to Modify**:
- `advyon-client/src/pages/Home.jsx`
- Create loading component

**Acceptance Criteria**:
- [ ] Loading state shown before content
- [ ] Smooth transition to landing content
- [ ] Handles auth state checking

---

#### 1.2 Remove GitHub Login from Clerk
**Priority**: 🔴 Critical  
**Status**: ❌ Needs Configuration  
**Description**: Disable GitHub OAuth provider in Clerk  
**Files to Modify**:
- `advyon-client/src/features/auth/components/SignInForm.jsx`
- `advyon-client/src/features/auth/components/SignUpForm.jsx`

**Acceptance Criteria**:
- [ ] GitHub login button removed
- [ ] Only email/password and Google remain (if desired)

---

#### 1.3 Fix Sync Error After Login
**Priority**: 🔴 Critical  
**Status**: ⚠️ Bug Reported  
**Description**: Users experiencing sync errors after authentication  
**Files to Modify**:
- `advyon-client/src/hooks/useAuthApi.js`
- `advyon-client/src/layouts/DashboardLayout.jsx`
- `advyon-server/src/app/modules/auth/auth.service.ts`

**Acceptance Criteria**:
- [ ] Graceful error handling
- [ ] Retry mechanism
- [ ] Clear error messages
- [ ] Fallback to onboarding if needed

---

#### 1.4 All Form Validation with Zod
**Priority**: 🔴 Critical  
**Status**: ⚠️ Partial  
**Description**: Implement comprehensive Zod validation for all forms  
**Existing Validations**:
- `user.validation.ts` ✅
- `auth.validation.ts` ✅
- `case.validation.ts` ✅
- `document.validation.ts` ✅
- `admin.validation.ts` ✅
- `legal.validation.ts` ✅

**Files to Modify**:
- `advyon-client/src/pages/CreateCasePage.jsx` - Add client validation
- `advyon-client/src/pages/OnboardingPage.jsx` - Add validation
- `advyon-client/src/pages/dashboard/CreateEventPage.jsx` - Add validation
- `advyon-client/src/features/community/components/CreateThreadModal.jsx` - Add validation
- All forms in dashboard

**Acceptance Criteria**:
- [ ] Every form has Zod schema
- [ ] Client-side validation before submission
- [ ] Server-side validation on all endpoints
- [ ] Clear error messages
- [ ] Real-time validation feedback

---

### 🟠 Phase 2: Content & Data

#### 2.1 Update Content with Meaningful Data
**Priority**: 🟠 High  
**Status**: ❌ Placeholder Content  
**Description**: Replace all placeholder text with meaningful legal platform content  
**Areas to Update**:
- Landing page (Home.jsx)
- About page
- Feature descriptions
- Empty states
- Tooltips and help text
- Email templates
- Notification messages

**Acceptance Criteria**:
- [ ] All placeholder text replaced
- [ ] Content reflects legal industry
- [ ] Professional tone throughout
- [ ] Multi-language support considered

---

#### 2.2 Metadata API Updates
**Priority**: 🟠 High  
**Status**: ⚠️ Partial  
**Description**: Expand metadata API for dynamic content  
**Current**: Practice areas, Languages  
**Files to Modify**:
- `advyon-server/src/app/modules/metadata/metadata.route.ts`
- `advyon-server/src/app/modules/metadata/metadata.constant.ts`

**New Endpoints Needed**:
- [ ] Court locations
- [ ] Case types/categories
- [ ] Document templates
- [ ] Urgency levels
- [ ] Hearing types
- [ ] Legal specializations

**Acceptance Criteria**:
- [ ] All metadata accessible via API
- [ ] Cached responses
- [ ] Admin-configurable values

---

### 🟡 Phase 3: AI Features

#### 3.1 Content Moderation for Community Hub
**Priority**: 🟡 Medium  
**Status**: ❌ Not Started  
**Description**: AI-powered content moderation for community posts  
**Files to Create**:
- `advyon-server/src/app/modules/community/community.moderation.ts`
- Moderation middleware

**Features**:
- [ ] Toxicity detection
- [ ] Spam detection
- [ ] Off-topic detection
- [ ] Auto-flag inappropriate content
- [ ] Human review queue

**Acceptance Criteria**:
- [ ] Automatic moderation on thread creation
- [ ] Automatic moderation on replies
- [ ] Confidence threshold configurable
- [ ] Appeals process

---

#### 3.2 AI Features in Community Posts
**Priority**: 🟡 Medium  
**Status**: ❌ Not Started  
**Description**: AI assistance for community Q&A  
**Features**:
- [ ] Auto-suggest similar threads
- [ ] AI-generated answer suggestions
- [ ] Legal reference recommendations
- [ ] Thread summarization
- [ ] Smart tagging suggestions

**Files to Modify**:
- `advyon-server/src/app/modules/community/community.service.ts`
- `advyon-client/src/features/community/components/CreateThreadModal.jsx`

---

#### 3.3 AI Tools Page
**Priority**: 🟡 Medium  
**Status**: ❌ Coming Soon  
**Description**: Dedicated page for AI-powered legal tools  
**Files to Create**:
- `advyon-client/src/pages/dashboard/AIToolsPage.jsx`
- `advyon-server/src/app/modules/ai/ai.tools.ts`

**Tools to Include**:
- [ ] Contract analyzer
- [ ] Legal document generator
- [ ] Case law researcher
- [ ] Legal writing assistant
- [ ] Deposition summarizer
- [ ] Brief analyzer

**Acceptance Criteria**:
- [ ] All tools functional
- [ ] Usage limits/pagination
- [ ] History of AI interactions
- [ ] Export results

---

#### 3.4 Centralized AI Context
**Priority**: 🟡 Medium  
**Status**: ⚠️ Basic Implementation  
**Description**: Unified AI context manager that rejects unnecessary questions  
**Files to Modify**:
- `advyon-server/src/app/modules/ai/ai.service.ts`
- `advyon-client/src/store/useAIStore.js`

**Features**:
- [ ] Context boundary enforcement
- [ ] Off-topic question rejection
- [ ] Scope limitation (legal-only)
- [ ] Context-aware responses
- [ ] Conversation memory

---

### 🟢 Phase 4: Database & Backend

#### 4.1 Robust Personalization Database
**Priority**: 🟢 Medium  
**Status**: ⚠️ Basic Schema Exists  
**Description**: Enhanced user personalization system  
**Current Schema**: `user.model.ts` has preferences field  

**Enhancements**:
- [ ] User behavior tracking
- [ ] Case preference learning
- [ ] Dashboard widget personalization
- [ ] Notification preferences
- [ ] AI interaction history
- [ ] Search history
- [ ] Document access patterns

**Files to Modify**:
- `advyon-server/src/app/modules/user/user.model.ts`
- `advyon-server/src/app/modules/user/user.service.ts`
- Create `personalization` module

---

#### 4.2 Case Archive Implementation
**Priority**: 🟢 Medium  
**Status**: ❌ Route Exists, No Logic  
**Description**: Complete case archiving system  
**Files to Modify**:
- `advyon-server/src/app/modules/case/case.service.ts`
- `advyon-client/src/pages/dashboard/ArchivedCasesPage.jsx` (create)
- `advyon-client/src/routes/index.jsx`

**Features**:
- [ ] Archive case endpoint
- [ ] Restore case endpoint
- [ ] Archived cases list view
- [ ] Search archived cases
- [ ] Archive after X days automation
- [ ] Permanent delete option

**Acceptance Criteria**:
- [ ] Cases can be archived
- [ ] Archived cases hidden from active view
- [ ] Can restore archived cases
- [ ] Data integrity maintained

---

### 🔵 Phase 5: UI/UX Improvements

#### 5.1 New Case Creation UI Update
**Priority**: 🔵 Medium  
**Status**: ⚠️ Basic Form Exists  
**Description**: Enhanced case creation experience  
**Current**: `CreateCasePage.jsx` - basic form  

**Improvements**:
- [ ] Multi-step wizard
- [ ] Template selection
- [ ] Client assignment
- [ ] Document upload during creation
- [ ] Deadline auto-calculation
- [ ] Duplicate detection
- [ ] Case number auto-generation

**Files to Modify**:
- `advyon-client/src/pages/CreateCasePage.jsx`
- `advyon-client/src/features/cases/components/CaseWizard.jsx` (create)

---

#### 5.2 Workspace Sidebar Real-time Updates
**Priority**: 🔵 Medium  
**Status**: ❌ Not Implemented  
**Description**: Real-time updates in workspace sidebar  
**Files to Modify**:
- `advyon-client/src/components/Sidebar.jsx`
- `advyon-client/src/hooks/useSocket.js`

**Features**:
- [ ] Real-time notification counts
- [ ] New case alerts
- [ ] Message notifications
- [ ] Activity indicators
- [ ] Online status

---

#### 5.3 Fix Document Preview in Workspace
**Priority**: 🔵 High  
**Status**: ⚠️ Has Issues  
**Description**: Fix document preview functionality  
**Files to Modify**:
- `advyon-client/src/pages/dashboard/DocumentViewerPage.jsx`
- `advyon-client/src/features/documents/components/PDFViewer.jsx`
- `advyon-client/src/features/workspace/components/WorkspaceView.jsx`

**Issues to Fix**:
- [ ] PDF rendering errors
- [ ] Large file handling
- [ ] Mobile responsiveness
- [ ] Loading states
- [ ] Error boundaries

---

#### 5.4 Fix Document Preview Page
**Priority**: 🔵 High  
**Status**: ⚠️ Partial  
**Description**: Standalone document preview page fixes  
**Files to Modify**:
- `advyon-client/src/pages/dashboard/TextReviewPage.jsx`
- `advyon-client/src/pages/dashboard/DocumentViewerPage.jsx`

**Acceptance Criteria**:
- [ ] All document types supported
- [ ] Smooth navigation
- [ ] Print functionality
- [ ] Share functionality
- [ ] Version history

---

#### 5.5 Documents Page Download Button
**Priority**: 🔵 High  
**Status**: ❌ Not Working  
**Description**: Make download button functional  
**Files to Modify**:
- `advyon-client/src/pages/dashboard/MyDocumentsPage.jsx`
- `advyon-server/src/app/modules/document/document.controller.ts`

**Acceptance Criteria**:
- [ ] Download original file
- [ ] Download analyzed version
- [ ] Batch download
- [ ] Progress indicator
- [ ] Security checks

---

### 🟣 Phase 6: Schedule & Calendar

#### 6.1 Complete Schedule Features
**Priority**: 🟣 Medium  
**Status**: ⚠️ Basic CRUD  
**Description**: Full-featured calendar system  
**Files to Modify**:
- `advyon-client/src/pages/dashboard/SchedulePage.jsx`
- `advyon-client/src/pages/dashboard/CreateEventPage.jsx`
- `advyon-server/src/app/modules/schedule/schedule.service.ts`

**Features**:
- [ ] Calendar view (month/week/day)
- [ ] Drag-and-drop rescheduling
- [ ] Recurring events
- [ ] Reminders and notifications
- [ ] Calendar sync (Google/Outlook)
- [ ] Conflict detection
- [ ] Resource booking (courtrooms)

---

### 🟤 Phase 7: Client Management

#### 7.1 Complete Client Management Workflow
**Priority**: 🟤 High  
**Status**: ⚠️ List View Only  
**Description**: Full client CRUD and management  
**Files to Modify**:
- `advyon-client/src/pages/dashboard/ClientsPage.jsx`
- `advyon-server/src/app/modules/user/user.service.ts`

**Features**:
- [ ] Add new client
- [ ] Edit client details
- [ ] Delete/archive client
- [ ] Client detail view
- [ ] Case association
- [ ] Document access management
- [ ] Billing history

---

#### 7.2 Client-Lawyer Interconnection Message
**Priority**: 🟤 High  
**Status**: ⚠️ Basic Messaging Exists  
**Description**: Enhanced messaging between clients and lawyers  
**Files to Modify**:
- `advyon-server/src/app/modules/message/message.service.ts`
- `advyon-client/src/features/messages/components/MessageThread.jsx`

**Features**:
- [ ] Case-specific messaging
- [ ] File attachments
- [ ] Read receipts
- [ ] Message templates
- [ ] Notification integration
- [ ] Message search

---

### ⚫ Phase 8: Analytics & Reporting

#### 8.1 Update Analytics Page
**Priority**: ⚫ Medium  
**Status**: ⚠️ Basic Stats  
**Description**: Comprehensive analytics dashboard  
**Files to Modify**:
- `advyon-client/src/pages/dashboard/AnalyticsPage.jsx`
- `advyon-server/src/app/modules/analytics/analytics.service.ts`

**New Metrics**:
- [ ] Case resolution time
- [ ] Win/loss ratio
- [ ] Revenue tracking
- [ ] Client acquisition
- [ ] Document processing stats
- [ ] AI usage analytics
- [ ] Custom date ranges
- [ ] Export reports (PDF/Excel)

---

### ⚪ Phase 9: Notifications

#### 9.1 Notification System Using Socket
**Priority**: ⚪ High  
**Status**: ⚠️ API Ready, Socket Setup  
**Description**: Real-time notification system  
**Files to Modify**:
- `advyon-server/src/app/modules/socket/socket.service.ts`
- `advyon-client/src/hooks/useSocket.js`
- `advyon-client/src/components/NotificationBell.jsx` (create)

**Features**:
- [ ] Real-time notifications
- [ ] Notification types:
  - Case updates
  - New messages
  - Document uploads
  - Hearing reminders
  - Deadlines
  - AI analysis complete
- [ ] Mark as read/unread
- [ ] Notification preferences
- [ ] Push notifications (PWA)

---

### 🌐 Phase 10: Public Pages

#### 10.1 Landing Page
**Priority**: 🌐 High  
**Status**: ⚠️ Basic Hero  
**Description**: Professional marketing landing page  
**Files to Create/Modify**:
- `advyon-client/src/pages/Home.jsx` - Complete redesign
- `advyon-client/src/features/landing/components/`

**Sections Needed**:
- [ ] Hero with CTA
- [ ] Features showcase
- [ ] How it works
- [ ] Testimonials
- [ ] Pricing preview
- [ ] FAQ
- [ ] Trust badges
- [ ] Footer with links

---

#### 10.2 About Page
**Priority**: 🌐 Medium  
**Status**: ⚠️ Placeholder  
**Description**: Company and team information  
**Files to Modify**:
- `advyon-client/src/pages/AboutPage.jsx`

**Content**:
- [ ] Company mission
- [ ] Team members
- [ ] Vision and values
- [ ] Timeline/milestones
- [ ] Partners

---

#### 10.3 How to Use Page
**Priority**: 🌐 Medium  
**Status**: ❌ Not Started  
**Description**: User guide and tutorials  
**Files to Create**:
- `advyon-client/src/pages/HowToUsePage.jsx`

**Content**:
- [ ] Getting started guide
- [ ] Feature tutorials
- [ ] Video demonstrations
- [ ] FAQs
- [ ] Best practices

---

#### 10.4 Contact Page
**Priority**: 🌐 Medium  
**Status**: ❌ Not Started  
**Description**: Contact form and information  
**Files to Create**:
- `advyon-client/src/pages/ContactPage.jsx`
- `advyon-server/src/app/modules/contact/contact.route.ts`

**Features**:
- [ ] Contact form
- [ ] Email integration
- [ ] Support ticket creation
- [ ] Office locations
- [ ] Social links

---

#### 10.5 Other Public Pages
**Priority**: 🌐 Low  
**Status**: ❌ Not Started  
**Pages Needed**:
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] Cookie Policy
- [ ] Security
- [ ] Accessibility
- [ ] Careers
- [ ] Blog (future)

---

### 🔒 Phase 11: Admin & Security

#### 11.1 MVP Admin Controls
**Priority**: 🔒 High  
**Status**: ⚠️ Basic Routes  
**Description**: Administrative dashboard and controls  
**Files to Modify**:
- `advyon-server/src/app/modules/admin/admin.service.ts`
- Create admin panel UI

**Features**:
- [ ] User management
- [ ] Case oversight
- [ ] Content moderation
- [ ] System settings
- [ ] Analytics overview
- [ ] Bulk operations
- [ ] Audit logs

---

### 💳 Phase 12: Payments

#### 12.1 Payment Integration
**Priority**: 💳 Critical (MVP)  
**Status**: ❌ Not Started  
**Description**: Payment system for subscriptions and services  
**Files to Create**:
- `advyon-server/src/app/modules/payment/payment.route.ts`
- `advyon-server/src/app/modules/subscription/subscription.model.ts`
- `advyon-client/src/pages/dashboard/BillingPage.jsx`

**Features**:
- [ ] Subscription plans
- [ ] Stripe integration
- [ ] Payment history
- [ ] Invoice generation
- [ ] Usage-based billing
- [ ] Trial management
- [ ] Payment method management

**Subscription Tiers**:
- Free Tier (Limited)
- Professional (Lawyers)
- Enterprise (Firms)

---

## Implementation Priority Matrix

### Must Have (MVP Launch)
1. ✅ Landing Page Loading State
2. ✅ Remove GitHub Login
3. ✅ Fix Sync Error After Login
4. ✅ All Form Validation with Zod
5. ✅ Content Update with Meaningful Data
6. ✅ New Case Creation UI Update
7. ✅ Fix Document Preview
8. ✅ Documents Page Download Button
9. ✅ Complete Client Management
10. ✅ Notification System
11. ✅ Landing Page
12. ✅ About Page
13. ✅ Contact Page
14. ✅ MVP Admin Controls
15. ✅ Payment Integration

### Should Have (Post-MVP)
1. 🟡 Content Moderation
2. 🟡 AI Tools Page
3. 🟡 AI Context Management
4. 🟡 Case Archive
5. 🟡 Workspace Real-time Updates
6. 🟡 Complete Schedule Features
7. 🟡 Analytics Updates
8. 🟡 Personalization Database

### Nice to Have (Future)
1. 🟢 Advanced AI Features in Community
2. 🟢 How to Use Page
3. 🟢 Additional Public Pages
4. 🟢 Advanced Reporting

---

## Technical Debt & Refactoring

### Code Quality
- [ ] Consistent error handling across all API calls
- [ ] Implement proper loading states everywhere
- [ ] Add error boundaries for all routes
- [ ] Standardize TypeScript interfaces
- [ ] Add comprehensive JSDoc comments

### Performance
- [ ] Implement proper caching strategies
- [ ] Optimize images and assets
- [ ] Add pagination to all list endpoints
- [ ] Implement virtual scrolling for large lists
- [ ] Add request deduplication

### Testing
- [ ] Unit tests for critical utilities
- [ ] Integration tests for API endpoints
- [ ] E2E tests for critical user flows
- [ ] Accessibility audits
- [ ] Performance benchmarks

### Security
- [ ] Rate limiting on all endpoints
- [ ] Input sanitization
- [ ] File upload security
- [ ] CORS configuration review
- [ ] Secrets management audit

---

## File Structure Summary

### Client (`advyon-client/src/`)
```
pages/
  Home.jsx (Landing - needs update)
  AboutPage.jsx (needs content)
  ContactPage.jsx (create)
  HowToUsePage.jsx (create)
  CreateCasePage.jsx (update)
  dashboard/
    AIToolsPage.jsx (create)
    ArchivedCasesPage.jsx (create)
    AnalyticsPage.jsx (update)
    ClientsPage.jsx (update)
    DocumentViewerPage.jsx (fix)
    MyDocumentsPage.jsx (update)
    SchedulePage.jsx (update)

features/
  landing/ (create)
  cases/components/CaseWizard.jsx (create)
  documents/components/ (fixes)
  community/ (moderation)

components/
  NotificationBell.jsx (create)
  LoadingStates/ (create)
```

### Server (`advyon-server/src/app/modules/`)
```
payment/ (create)
subscription/ (create)
contact/ (create)
ai/
  ai.tools.ts (create)
  ai.moderation.ts (create)
community/
  community.moderation.ts (create)
user/
  personalization.service.ts (create)
```

---

## Dependencies to Add

### Client
- `@stripe/stripe-js` - Payment integration
- `@stripe/react-stripe-js` - React Stripe components
- `react-calendar` or `@fullcalendar/react` - Calendar views
- `recharts` - Advanced charts (if needed)

### Server
- `stripe` - Stripe SDK
- `bad-words` or `@tensorflow-models/toxicity` - Content moderation
- `node-cron` - Scheduled tasks (archiving)

---

## Notes & Considerations

### AI Usage Costs
- Monitor OpenRouter API usage
- Implement rate limiting per user
- Cache AI responses where possible

### Legal Compliance
- Ensure data retention policies
- Implement proper audit trails
- Consider jurisdiction-specific requirements

### Scalability
- Design for horizontal scaling
- Consider database sharding for large firms
- CDN for document delivery

---

## Questions for Stakeholder

1. **Payment Provider**: Stripe confirmed? Any specific requirements? ans: stripe
2. **Pricing Tiers**: What are the exact subscription tiers and features? ans: subscription of platform

3. **Admin Scope**: What level of admin control is needed for MVP? ans: legal control, community moderation, user management,case oversight. 

4. **AI Boundaries**: How strict should the AI context enforcement be? ans: it should be within legal boundaries. if it than proceed with answer and be aware of prompt injection of anykind. 

5. **Archive Policy**: Auto-archive after how many days? ans: 30 days 
6. **Notifications**: Email, SMS, or push notifications? Which provider? ans: push notification on the web and email. 

7. **Calendar Sync**: Which external calendars (Google, Outlook, Apple)? ans: google calendar

8. **Document Storage**: Cloudinary limits and backup strategy? ans: currently none, no need for backup strategy currently. 
9. **Compliance**: Any specific legal compliance requirements (GDPR, etc.)? ans: no need to worry about compliance. 
10. **Mobile App**: Is a mobile app planned for future? ans: no need to worry about mobile app currently. 

---

## Success Metrics

### MVP Launch Criteria
- [ ] All critical bugs fixed
- [ ] All forms validated
- [ ] Payment system working
- [ ] Admin controls functional
- [ ] Basic analytics tracking
- [ ] 99% uptime
- [ ] < 2s page load times

### Post-Launch KPIs
- User registration rate
- Case creation rate
- Document upload rate
- AI feature usage
- Community engagement
- Revenue metrics
- Support ticket volume

---

**Document Version**: 1.0  
**Last Updated**: 2026-02-16  
**Author**: Architecture Lead  
**Status**: Ready for Review
