---
name: handoff-management
description: Standardized process for handing off work between team members in AI software engineering teams. Ensures complete documentation, clear acceptance criteria, and smooth transitions. Use when transferring work between roles, completing tasks for others, or reviewing handoff completeness.
license: MIT
compatibility: opencode
metadata:
  category: process
  scope: team-coordination
---

# Handoff Management

Standardized process for transferring work between team members.

## Purpose

Handoffs ensure:
- Complete context transfer
- Clear acceptance criteria
- No information loss
- Accountability tracking
- Quality maintenance

## Handoff Types

### 1. Requirements to Design
**From**: Product Manager  
**To**: Architecture Lead

**Key Elements**:
- Problem statement
- User stories
- Acceptance criteria
- Success metrics
- Constraints

### 2. Design to Frontend
**From**: Architecture Lead  
**To**: Frontend Lead

**Key Elements**:
- UI specifications
- Component architecture
- API contracts
- State management plan
- Responsive requirements

### 3. Design to Backend
**From**: Architecture Lead  
**To**: Backend Lead

**Key Elements**:
- API specifications
- Data models
- Integration requirements
- Performance targets
- Security requirements

### 4. AI to Backend
**From**: AI/ML Specialist  
**To**: Backend Lead

**Key Elements**:
- AI service specifications
- Prompt templates
- RAG configuration
- Error handling patterns
- Cost estimates

### 5. Backend to Frontend
**From**: Backend Lead  
**To**: Frontend Lead

**Key Elements**:
- API documentation
- TypeScript types
- Endpoint specifications
- Error codes
- Rate limits

### 6. Implementation to DevOps
**From**: All Developers  
**To**: DevOps Engineer

**Key Elements**:
- Deployment requirements
- Environment variables
- Database migrations
- Infrastructure needs
- Monitoring requirements

---

## Handoff Process

### Step 1: Originator Preparation

The person completing work must:

```
□ Finish the work completely
□ Test thoroughly
□ Document decisions made
□ Fill out handoff template
□ Attach supporting files
□ Review for completeness
```

### Step 2: Submit to Orchestrator

```
□ Save handoff document to: team-orchestration/handoffs/
□ Name: [date]-[from]-to-[to]-[feature].md
□ Notify Team Orchestrator
□ Include in daily standup
```

### Step 3: Orchestrator Review

Team Orchestrator checks:

```
Quality Gates:
□ All template sections filled
□ Acceptance criteria are SMART
  (Specific, Measurable, Achievable, Relevant, Time-bound)
□ Dependencies identified
□ No critical blockers
□ Required reviewers assigned
```

**If incomplete**: Return to originator with feedback

### Step 4: Reviewer Assessment

Assigned reviewer checks:

```
□ Technical accuracy
□ Completeness
□ Risk identification
□ Resource requirements
□ Timeline feasibility
```

### Step 5: Receiver Review

The person receiving work reviews:

```
□ Understands requirements
□ Has all needed context
□ Can meet acceptance criteria
□ Timeline is realistic
□ Asks clarifying questions
```

### Step 6: Question Resolution

If receiver has questions:

```
1. Document questions in handoff
2. Originators responds
3. Orchestrator facilitates if needed
4. Update handoff with answers
5. Confirm understanding
```

### Step 7: Acceptance

Receiver confirms:

```
□ I understand the requirements
□ I can meet acceptance criteria
□ Timeline is agreed
□ I have all needed resources
□ [SIGNATURE]: ___________
```

### Step 8: Completion

Orchestrator:

```
□ Confirms handoff complete
□ Updates project tracking
□ Assigns next work
□ Archives handoff document
□ Notifies stakeholders
```

---

## Handoff Template

```markdown
# Handoff: [From Role] to [To Role]

## Metadata
- **Handoff ID**: [TYPE]-[DATE]-[NUMBER]
- **Date**: YYYY-MM-DD
- **From**: [Name] ([Role])
- **To**: [Name] ([Role])
- **Feature**: [Feature Name]
- **Priority**: Critical/High/Medium/Low

## Context
[Background information and why this work is needed]

## Deliverables
[What is being handed off]

### Completed Work
- [Item 1]
- [Item 2]

### Documentation
- [Link 1]
- [Link 2]

## Acceptance Criteria
- [ ] [Criterion 1 - specific and testable]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Technical Specifications
[Details needed to continue work]

### Architecture
[Design decisions, patterns used]

### Dependencies
- [Dependency 1]
- [Dependency 2]

### Constraints
- [Constraint 1]
- [Constraint 2]

## Resources
### Files
- [File 1]: [Location]
- [File 2]: [Location]

### Access
- [System 1]: [How to access]
- [System 2]: [How to access]

## Timeline
- **Start Date**: [When work should begin]
- **Target Completion**: [When work should be done]
- **Review Date**: [When to check progress]

## Open Questions
| Question | Asked By | Status | Answer |
|----------|----------|--------|--------|
| [Q1] | [Name] | Open/Resolved | [Answer] |

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Plan] |

## Sign-off

### Originator
- [ ] Work complete and tested
- [ ] Documentation complete
- [ ] **Signature**: ___________ Date: _____

### Reviewer (if required)
- [ ] Technical review passed
- [ ] **Signature**: ___________ Date: _____

### Receiver
- [ ] Requirements understood
- [ ] Timeline agreed
- [ ] **Signature**: ___________ Date: _____

### Orchestrator
- [ ] Handoff complete
- [ ] **Signature**: ___________ Date: _____
```

---

## Quality Gates

### Gate 1: Completeness
- All template sections filled
- No placeholder text
- Supporting documents attached
- Links are working

### Gate 2: Clarity
- Requirements are unambiguous
- Acceptance criteria are testable
- Examples provided where helpful
- Technical terms defined

### Gate 3: Dependencies
- All blockers resolved
- Prerequisites met
- Resources available
- External dependencies identified

### Gate 4: Review
- Required reviewers assigned
- Technical accuracy verified
- Risks identified
- Feedback incorporated

### Gate 5: Acceptance
- Receiver can proceed without questions
- Timeline is realistic
- Resources are available
- Success criteria understood

---

## Common Issues & Solutions

### Issue: Incomplete Documentation
**Solution**: Require template checklist completion before submission

### Issue: Ambiguous Requirements
**Solution**: Require specific, testable acceptance criteria with examples

### Issue: Receiver Doesn't Understand
**Solution**: Encourage questions, schedule clarification meeting

### Issue: Timeline Disagreement
**Solution**: Negotiate realistic timeline, document trade-offs

### Issue: Handoff Sitting in Queue
**Solution**: Orchestrator tracks and escalates after 4 hours

---

## Metrics

### Track These
- **Handoff Volume**: Number per week
- **Completion Rate**: % completed successfully
- **Average Time**: Hours from submission to acceptance
- **Rejection Rate**: % sent back for more info
- **Question Count**: Average questions per handoff

### Targets
- Handoff completion: 100%
- Average time: < 4 hours
- Rejection rate: < 10%
- Questions: < 3 per handoff

---

## Best Practices

### For Originators
- Complete work before handing off
- Test thoroughly
- Document assumptions
- Be available for questions
- Provide examples

### For Receivers
- Review promptly
- Ask questions early
- Clarify unclear items
- Confirm understanding
- Negotiate timelines honestly

### For Orchestrator
- Review for completeness, not correctness
- Facilitate communication
- Track and escalate
- Document decisions
- Measure and improve

---

## Anti-Patterns to Avoid

❌ Handing off incomplete work
❌ Vague acceptance criteria
❌ Not documenting assumptions
❌ Receiver not asking questions
❌ Orchestrator becoming a bottleneck
❌ No follow-up on handoffs
❌ Accepting handoff without understanding
