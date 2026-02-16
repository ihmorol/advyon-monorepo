---
name: code-review
description: Comprehensive code review workflow for ensuring code quality, security, and maintainability. Guides reviewers through systematic checks and provides templates for constructive feedback. Use when reviewing code, requesting reviews, or establishing review standards.
license: MIT
compatibility: opencode
metadata:
  category: workflow
  scope: quality-assurance
  duration: 1-4 hours
---

# Code Review Workflow

Systematic code review process for high-quality code.

## Overview

**Duration**: 1-4 hours depending on PR size  
**Reviewer**: Peer developer + security (if needed)  
**Author**: Developer who wrote the code

## Review Process

### Step 1: Author Preparation (Before Requesting Review)

```
□ Self-review the code
□ Run all tests locally
□ Ensure CI passes
□ Write clear PR description
□ Link related issues
□ Add screenshots (if UI changes)
□ Mark as ready for review
```

### PR Description Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Refactoring
- [ ] Documentation

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors

## Screenshots (if applicable)
[Attach screenshots]

## Related Issues
Fixes #123
Relates to #456
```

---

### Step 2: Review Assignment

**Automated Assignment**:
- Random reviewer from team
- Based on code ownership
- Expertise matching

**Manual Assignment**:
- Architect for design changes
- Security engineer for auth changes
- Database architect for schema changes

---

### Step 3: Reviewer Checklist

#### A. Functionality (10 min)
- [ ] Code works as intended
- [ ] Edge cases handled
- [ ] Error handling complete
- [ ] No obvious bugs
- [ ] Logic is correct

#### B. Code Quality (10 min)
- [ ] Follows naming conventions
- [ ] Properly formatted
- [ ] No code duplication (DRY)
- [ ] Functions are focused (Single Responsibility)
- [ ] Comments explain "why" not "what"
- [ ] No magic numbers/strings

#### C. Testing (5 min)
- [ ] Unit tests included
- [ ] Tests are meaningful
- [ ] Edge cases tested
- [ ] Test coverage adequate

#### D. Security (5 min)
- [ ] Input validated
- [ ] Output sanitized
- [ ] No secrets in code
- [ ] Auth checks present
- [ ] Rate limiting considered
- [ ] No injection vulnerabilities

#### E. Performance (5 min)
- [ ] No N+1 queries
- [ ] Proper indexing considered
- [ ] No memory leaks
- [ ] Async/await used correctly
- [ ] No unnecessary re-renders (frontend)

#### F. Documentation (5 min)
- [ ] Code is self-documenting
- [ ] Complex logic commented
- [ ] API changes documented
- [ ] README updated if needed

---

### Step 4: Review Types

#### Approval Levels

**Approve** ✅
- Ready to merge
- All concerns addressed

**Request Changes** 🔄
- Issues need fixing
- Specific changes requested

**Comment** 💬
- Questions or suggestions
- No blocking issues

---

### Step 5: Providing Feedback

#### Good Feedback Examples

**Specific and Actionable**:
```
❌ "This code is messy"
✅ "Consider extracting this logic into a separate 
    function to improve readability. The function 
    is currently 50 lines and handles 3 different 
    concerns."
```

**Explains Why**:
```
❌ "Use const here"
✅ "Consider using const instead of let since this 
    variable is never reassigned. This helps signal 
    to future readers that the value is immutable."
```

**Offers Alternatives**:
```
❌ "This is wrong"
✅ "This approach works, but have you considered using 
    Array.filter() instead? It might be more readable 
    and declarative."
```

#### Comment Prefixes

- **nit**: Minor issue, author's choice
- **question**: Seeking understanding
- **suggestion**: Recommendation, not required
- **issue**: Problem that needs fixing
- **praise**: Good work acknowledgment

---

### Step 6: Author Response

#### Handling Feedback

**For Minor Issues (nits)**:
- Fix if you agree
- Explain if you disagree
- It's okay to skip if justified

**For Major Issues**:
- Fix before merge
- Ask for clarification if unclear
- Discuss alternatives if disagree

**For Questions**:
- Answer clearly
- Update code if question reveals confusion
- Add comments if needed

#### Response Template

```
@reviewer Thanks for the review!

✅ Fixed: [List of changes made]
❓ Question: [Clarification needed]
💭 Thought: [Why I did it this way]
```

---

### Step 7: Iteration

```
Review Round 1 → Author Updates → Review Round 2 → ... → Approval
```

**Typical**: 1-2 rounds  
**Complex PRs**: 3+ rounds  
**Goal**: Resolution, not perfection

---

## Review Timing

### For Reviewers
- **Goal**: Start review within 4 hours
- **Target**: Complete review within 24 hours
- **Urgent**: Same day for critical fixes

### For Authors
- **Small PRs** (< 100 lines): 30 min review
- **Medium PRs** (100-500 lines): 1-2 hour review
- **Large PRs** (> 500 lines): Split into smaller PRs

---

## Review Metrics

### Track These
- **Review Time**: Time from request to first comment
- **Iteration Count**: Number of review rounds
- **Defects Found**: Issues caught in review
- **Approval Rate**: % approved on first review

### Targets
- Review start: < 4 hours
- Review completion: < 24 hours
- First-pass approval: > 60%
- Defects found: Increasing (good!)

---

## Special Cases

### Security-Critical Code
- **Required**: Security engineer review
- **Focus**: Auth, crypto, input validation
- **Tools**: Static analysis, dependency scan

### Database Changes
- **Required**: Database architect review
- **Focus**: Migrations, indexes, queries
- **Check**: Backward compatibility

### AI/ML Code
- **Required**: AI engineer review
- **Focus**: Prompt safety, cost, performance
- **Test**: Output validation

### Breaking Changes
- **Required**: Architect + Product Manager review
- **Focus**: Migration path, communication
- **Docs**: Breaking change documentation

---

## Review Tools

### GitHub/GitLab
- **Suggestions**: Direct code suggestions
- **Threads**: Conversation on specific lines
- **Resolve**: Mark threads as resolved
- **Dismiss**: Dismiss stale reviews

### IDE Integration
- **GitLens**: Inline blame and history
- **CodeStream**: Review from IDE
- **GitHub Copilot**: AI-assisted review

---

## Anti-Patterns to Avoid

❌ **Rubber Stamping**: Approving without reading
❌ **Bike Shedding**: Arguing over trivial details
❌ **Delayed Reviews**: Waiting days to start
❌ **Personal Attacks**: "You did this wrong"
❌ **No Context**: Not reading PR description
❌ **Perfectionism**: Blocking for minor nits

---

## Best Practices

### For Reviewers
- Review promptly
- Be kind and constructive
- Explain reasoning
- Approve when good enough
- Learn from the code

### For Authors
- Keep PRs small
- Write clear descriptions
- Respond to all comments
- Don't take feedback personally
- Thank reviewers

---

## Success Criteria

Code review is successful when:
- [ ] Review started within 4 hours
- [ ] All comments addressed
- [ ] Tests pass
- [ ] No security issues
- [ ] Approved by required reviewers
- [ ] Author and reviewer both learned something

---

**Workflow Version**: 1.0  
**Review Time Target**: < 24 hours  
**Last Updated**: 2026-02-16
