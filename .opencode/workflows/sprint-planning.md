---
name: sprint-planning
description: Sprint planning and management workflow for agile teams. Guides sprint ceremonies including planning, daily standups, reviews, and retrospectives. Use when planning sprints, conducting ceremonies, or managing agile processes.
license: MIT
compatibility: opencode
metadata:
  category: workflow
  scope: project-management
  duration: 2 weeks
---

# Sprint Planning Workflow

Complete agile sprint management for AI software engineering teams.

## Sprint Cycle (2 Weeks)

```
Week 1                    Week 2
├─ Day 1: Planning        ├─ Day 8: Mid-sprint check
├─ Days 2-5: Development  ├─ Days 9-12: Development
├─ Days 2-5: Daily Standup├─ Days 9-12: Daily Standup
└─ Day 5: Review prep     └─ Day 12: Demo prep
                          └─ Day 13: Sprint Review
                          └─ Day 14: Retrospective
```

## Phase 1: Sprint Planning (Day 1, 2 hours)

### Participants
- **Required**: Product Manager, Architect, all Developers
- **Optional**: Stakeholders
- **Facilitator**: Orchestrator

### Agenda

#### 1. Review Previous Sprint (20 min)
- What was completed?
- What wasn't completed?
- Why items weren't completed

#### 2. Capacity Planning (15 min)
- Team availability
- Vacation/time off
- Support/maintenance load

#### 3. Story Review (45 min)
Product Manager presents:
- Priority order
- Story details
- Acceptance criteria
- Dependencies

#### 4. Estimation (30 min)
Team estimates each story:
- **Story Points**: 1, 2, 3, 5, 8, 13
- **Planning Poker**: Async voting
- **Discussion**: Align on complexity

#### 5. Sprint Commitment (10 min)
- Select stories for sprint
- Team commits to scope
- Document in sprint board

### Output
- [ ] Sprint goal defined
- [ ] Stories selected and estimated
- [ ] Sprint board updated
- [ ] Team commitment recorded

---

## Phase 2: Daily Standups (15 min each day)

### Format
```
Each team member answers:
1. What did you complete yesterday?
2. What are you working on today?
3. Any blockers?
```

### Orchestrator's Role
- Keep time (strict 15 min)
- Capture blockers
- Assign action items
- Note cross-dependencies

### Blocker Resolution
```
Blocker reported → Owner assigned → ETA set → Follow up
```

---

## Phase 3: Mid-Sprint Check (Day 8, 30 min)

### Activities
1. **Progress Review**
   - Stories completed: X/Y
   - Stories in progress
   - Stories not started

2. **Burndown Analysis**
   - On track? Ahead? Behind?
   - Identify risks

3. **Scope Adjustment** (if needed)
   - Can we add more?
   - Do we need to remove anything?
   - Re-prioritize if necessary

4. **Blocker Review**
   - Open blockers
   - Resolution status
   - New blockers

### Output
- [ ] Sprint status assessed
- [ ] Risks identified
- [ ] Adjustments made (if any)
- [ ] Team aligned

---

## Phase 4: Sprint Review (Day 13, 1 hour)

### Participants
- **Required**: Product Manager, all Developers
- **Optional**: Stakeholders, users
- **Facilitator**: Product Manager

### Agenda

#### 1. Sprint Goal Review (5 min)
- Did we meet the goal?
- If not, why?

#### 2. Demo (40 min)
Each team member demos completed work:
- Show the feature
- Explain user value
- Answer questions

#### 3. Feedback Gathering (10 min)
- Stakeholder feedback
- User reactions
- Questions/discussion

#### 4. Backlog Review (5 min)
- Update backlog based on feedback
- New items discovered
- Priority adjustments

### Output
- [ ] Demo completed
- [ ] Feedback documented
- [ ] Backlog updated
- [ ] Stakeholders informed

---

## Phase 5: Sprint Retrospective (Day 14, 1 hour)

### Participants
- **Required**: All team members
- **Facilitator**: Orchestrator
- **No managers** (safe space)

### Format: Start/Stop/Continue

#### 1. Generate Insights (15 min)
Each person writes on sticky notes:
- **Start**: Things we should start doing
- **Stop**: Things we should stop doing
- **Continue**: Things we should keep doing

#### 2. Group & Vote (15 min)
- Group similar items
- Vote on most important (3 votes each)

#### 3. Discuss Top Items (20 min)
For top 3 items:
- Why is this important?
- What can we do about it?
- Who will own it?

#### 4. Action Items (10 min)
Document:
- What we'll change
- Who owns it
- When it will be done

### Output
- [ ] Retrospective completed
- [ ] Action items documented
- [ ] Owners assigned
- [ ] Team feeling heard

---

## Sprint Metrics

### Velocity
- **Definition**: Story points completed per sprint
- **Target**: Stable or increasing
- **Tracking**: Average of last 3 sprints

### Completion Rate
- **Formula**: (Completed stories / Committed stories) × 100
- **Target**: > 80%
- **Action if low**: Reduce commitment next sprint

### Cycle Time
- **Definition**: Time from start to completion
- **Target**: < 5 days average
- **Tracking**: Per story type

### Happiness Index
- **Scale**: 1-5 (1 = very unhappy, 5 = very happy)
- **Tracking**: Anonymous survey post-retro
- **Target**: > 4.0

---

## Sprint Board Structure

```
Backlog          To Do         In Progress        Review           Done
├─ Story A       ├─ Task 1     ├─ Task 2          ├─ Task 3        ├─ Task 4
├─ Story B       └─ Task 5     └─ Task 6          └─ Task 7        └─ Task 8
└─ Story C
```

### Columns
- **Backlog**: Prioritized, estimated
- **To Do**: Committed to sprint
- **In Progress**: Actively worked on
- **Review**: Code review/testing
- **Done**: Completed, deployed

---

## Story Lifecycle

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Created   │────▶│   Refined   │────▶│  Estimated  │
└─────────────┘     └─────────────┘     └─────────────┘
                                                │
┌─────────────┐     ┌─────────────┐     ┌─────▼───────┐
│    Done     │◀────│    Test     │◀────│   Develop   │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## Anti-Patterns to Avoid

❌ **Death by Planning**: 4+ hour planning sessions
❌ **Standup Status Report**: Reporting to manager, not team
❌ **Blame Game Retros**: Focusing on who, not what
❌ **Scope Creep**: Adding work mid-sprint without removing
❌ **Carry Over**: Consistently not completing committed work
❌ **Skipping Ceremonies**: Missing standups or retrospectives

---

## Tools

### Recommended
- **Board**: Linear, Jira, GitHub Projects
- **Estimation**: PlanningPokerOnline, Parabol
- **Retros**: EasyRetro, FunRetro
- **Metrics**: Linear Insights, Jira Dashboards

---

## Success Criteria

Sprint is successful when:
- [ ] Sprint goal achieved
- [ ] > 80% of stories completed
- [ ] Zero critical bugs in production
- [ ] Team happiness > 4.0
- [ ] Retrospective action items completed
- [ ] Stakeholders satisfied

---

**Workflow Version**: 1.0  
**Sprint Duration**: 2 weeks  
**Last Updated**: 2026-02-16
