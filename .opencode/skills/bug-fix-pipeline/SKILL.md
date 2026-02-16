---
name: bug-fix-pipeline
description: Structured workflow for investigating, fixing, and deploying bug fixes. Guides teams through reproduction, root cause analysis, implementation, testing, and deployment of fixes. Use when fixing bugs, investigating issues, or coordinating hotfix deployments.
license: MIT
compatibility: opencode
metadata:
  category: workflow
  scope: maintenance
  duration: hours to days
---

# Bug Fix Pipeline

Structured workflow for fixing bugs in production or staging.

## Overview

**Duration**: Hours to days (depending on severity)  
**Participants**: Relevant team members  
**Orchestrator**: Assigns and tracks

## Severity Levels

### Critical (P0)
- System down or unusable
- Data loss or corruption
- Security breach
- **Response**: Immediate, all hands

### High (P1)
- Major feature broken
- Significant performance issue
- Workaround exists but difficult
- **Response**: Within 4 hours

### Medium (P2)
- Feature partially broken
- Minor performance issue
- Easy workaround available
- **Response**: Within 24 hours

### Low (P3)
- Cosmetic issues
- Edge case bugs
- Feature requests disguised as bugs
- **Response**: Next sprint

---

## Phase 1: Triage (Immediate)

### Participants
- **Primary**: Team Orchestrator
- **Consulted**: Product Manager (if user-facing)
- **Informed**: All team members

### Activities
1. **Assess Severity**
   - Determine impact on users
   - Check if workaround exists
   - Identify affected areas

2. **Assign Owner**
   - Identify best person to fix
   - Consider expertise and availability
   - Clear their other work if critical

3. **Communicate**
   - Notify stakeholders
   - Post in team channel
   - Update status page (if public)

### Output
- [ ] Severity classified
- [ ] Owner assigned
- [ ] Stakeholders notified
- [ ] Ticket created/updated

---

## Phase 2: Investigation (Hours 1-4)

### Participants
- **Primary**: Assigned Developer
- **Consulted**: Relevant specialists
- **Informed**: Team Orchestrator

### Activities

#### Step 1: Reproduce
```
□ Get exact reproduction steps
□ Try on different environments
□ Check different browsers/devices
□ Identify consistent triggers
□ Note intermittent vs consistent
```

#### Step 2: Gather Data
```
□ Check application logs
□ Review error tracking (Sentry, etc.)
□ Look at recent deployments
□ Check database state
□ Review user reports
```

#### Step 3: Isolate
```
□ Find minimal reproduction case
□ Identify when bug was introduced
□ Check git history
□ Review related code changes
□ Test hypothesis
```

### Root Cause Analysis Template

```markdown
## Bug Report: [Title]

### Symptoms
[What users see]

### Reproduction Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Root Cause
[Technical explanation of why it happens]

### Affected Areas
- [Area 1]
- [Area 2]

### Introduced In
[Commit/PR/Release]
```

### Output
- [ ] Bug reproduced consistently
- [ ] Root cause identified
- [ ] Affected areas mapped
- [ ] Fix approach determined

---

## Phase 3: Fix Implementation (Hours 2-8)

### Participants
- **Primary**: Assigned Developer
- **Consulted**: Architecture Lead (if complex)
- **Reviewed**: Peer developer
- **Informed**: Team Orchestrator

### Activities

#### Step 1: Create Fix Branch
```bash
git checkout -b fix/bug-description-123
```

#### Step 2: Implement Fix
```
□ Write minimal fix
□ Add unit tests for bug
□ Ensure fix doesn't break existing tests
□ Consider edge cases
□ Add comments explaining fix
```

#### Step 3: Test Locally
```
□ Verify fix resolves issue
□ Run full test suite
□ Test edge cases
□ Check related features
□ Performance test if relevant
```

### Code Review Checklist
- [ ] Fix addresses root cause, not symptoms
- [ ] Tests added/updated
- [ ] No unintended side effects
- [ ] Documentation updated if needed
- [ ] Follows coding standards

### Output
- [ ] Fix implemented
- [ ] Tests passing
- [ ] Code reviewed
- [ ] Ready for deployment

---

## Phase 4: Deployment (Hours 4-12)

### For Hotfixes (Critical/High)

#### Quick Deployment Process
```
1. Security review (if applicable)
2. Deploy to staging
3. Smoke test
4. Deploy to production
5. Monitor closely
```

#### Hotfix Branch Strategy
```bash
# Create hotfix from main
git checkout -b hotfix/critical-fix-123 main

# Make fix
git commit -m "fix: resolve critical issue with X"

# Merge to main and develop
git checkout main
git merge hotfix/critical-fix-123
git checkout develop
git merge hotfix/critical-fix-123
```

### For Regular Fixes (Medium/Low)

#### Standard Deployment
- Include in next scheduled release
- Full testing cycle
- Regular deployment process

### Output
- [ ] Fix deployed
- [ ] Smoke tests pass
- [ ] Monitoring shows normal metrics

---

## Phase 5: Verification (Hours 12-24)

### Participants
- **Primary**: Assigned Developer
- **Verified By**: QA or Product Manager
- **Monitored By**: DevOps Engineer

### Activities

#### Step 1: Confirm Fix
```
□ Test in production
□ Verify with original reporter
□ Check error logs (errors should stop)
□ Monitor user feedback
```

#### Step 2: Monitor
```
□ Watch for 24-48 hours
□ Check related metrics
□ Look for new issues
□ Verify no regressions
```

### Output
- [ ] Fix verified in production
- [ ] No regressions observed
- [ ] Original reporter satisfied

---

## Phase 6: Post-Incident Review (Within 1 week)

### Participants
- **Primary**: Team Orchestrator
- **Required**: All involved
- **Optional**: Stakeholders

### Activities

#### Review Questions
```
1. What went wrong?
2. Why did it happen? (5 Whys)
3. How was it detected?
4. How well did we respond?
5. What could we improve?
```

#### Action Items
```
□ Process improvements
□ Monitoring enhancements
□ Test coverage gaps
□ Documentation updates
□ Training needs
```

### Post-Mortem Template

```markdown
# Post-Mortem: [Bug Title]

## Summary
[One-paragraph summary]

## Timeline
- 09:00 - Issue reported by user
- 09:15 - Triage complete, assigned to dev
- 10:30 - Root cause identified
- 12:00 - Fix deployed
- 14:00 - Fix verified

## Root Cause
[Technical explanation]

## Impact
- Users affected: [Number]
- Duration: [Time]
- Features affected: [List]

## Resolution
[How it was fixed]

## Lessons Learned
1. [Lesson 1]
2. [Lesson 2]

## Action Items
- [ ] [Action 1] - Owner: [Name] - Due: [Date]
- [ ] [Action 2] - Owner: [Name] - Due: [Date]
```

### Output
- [ ] Post-mortem completed
- [ ] Action items assigned
- [ ] Knowledge documented

---

## Communication Templates

### Initial Report (Public)
```
We're investigating reports of [issue]. 
Some users may experience [symptom].
We'll update here in 30 minutes.
```

### Update (Public)
```
Update: We've identified the root cause and are working on a fix.
ETA: 2 hours.
```

### Resolution (Public)
```
Resolved: The issue has been fixed and all systems are operational.
We apologize for the inconvenience.
```

### Internal Update
```
🐛 Bug Update: [Severity]
Issue: [Description]
Status: [Investigating/Fixing/Testing/Deployed]
ETA: [Time]
Owner: [Name]
```

---

## Success Criteria

Bug fix is successful when:
- [ ] Root cause identified and documented
- [ ] Fix deployed and verified
- [ ] No regressions introduced
- [ ] Post-mortem completed (P0/P1)
- [ ] Action items created
- [ ] Communication completed
