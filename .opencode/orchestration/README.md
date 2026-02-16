---
name: team-orchestration
description: Central orchestration system for managing multi-agent AI software engineering teams. Coordinates task assignment, handoff management, workflow execution, and cross-functional collaboration.
license: MIT
compatibility: opencode
metadata:
  category: orchestration
  scope: project-wide
  version: "2.0"
---

# Team Orchestration System

World-class orchestration for AI software engineering teams.

## System Overview

This orchestration system coordinates 12 specialized agents working together to build AI-powered full stack applications.

## Agent Registry (12 Agents)

### Core Agents

| Agent | Mode | Purpose |
|-------|------|---------|
| **orchestrator** | orchestrate | Central coordination |
| **product-manager** | plan | Requirements & roadmap |
| **architect** | plan | System design |

### Design & Experience

| Agent | Mode | Purpose |
|-------|------|---------|
| **ui-ux-designer** | design | User research & design |

### Development Agents

| Agent | Mode | Purpose |
|-------|------|---------|
| **ai-engineer** | build | AI/ML integration |
| **frontend-dev** | build | UI/UX development |
| **backend-dev** | build | API & business logic |
| **devops-engineer** | build | Infrastructure |
| **data-engineer** | build | Analytics & data |

### Quality & Security Agents

| Agent | Mode | Purpose |
|-------|------|---------|
| **qa-tester** | test | Testing & QA |
| **security-engineer** | review | Security reviews |

## Workflow Engine

### Active Workflows

1. **feature-development** - End-to-end feature creation
2. **bug-fix-pipeline** - Bug triage and resolution
3. **deployment-workflow** - Production deployment
4. **handoff-management** - Work transitions
5. **sprint-planning** - Sprint ceremonies
6. **code-review** - Review process
7. **system-design** - Architecture design
8. **ai-integration** - AI feature development
9. **security-audit** - Security assessment
10. **performance-optimization** - Performance tuning

## Task Assignment Matrix

```
Requirements → product-manager
User Research → ui-ux-designer
Design → ui-ux-designer (UI) + architect (technical)
System Architecture → architect
AI Features → ai-engineer
Database Schema → database-architect
Backend APIs → backend-dev
Frontend UI → frontend-dev
Quality Assurance → qa-tester
Security Review → security-engineer
AI Ethics Review → ai-engineer (if applicable)
Analytics → data-engineer
Deployment → devops-engineer
```

## Handoff Protocol

### Automated Handoffs
When an agent completes work, the orchestrator:

1. **Validates** completion criteria
2. **Packages** context and deliverables
3. **Routes** to next agent in workflow
4. **Notifies** receiving agent
5. **Tracks** in project dashboard

### Handoff Status
- `pending` - Awaiting validation
- `ready` - Validated, ready for pickup
- `active` - Currently being worked on
- `blocked` - Blocked, needs resolution
- `complete` - Finished successfully

## Context Management

### Project Context
- Active features
- Current sprint
- Blockers and risks
- Team availability

### Feature Context
- Requirements
- Design specs
- Technical decisions
- Progress status

### Agent Context
- Current tasks
- Skills loaded
- Conversation history
- Performance metrics

## Quality Gates (9 Total)

### Phase 1: Design & Planning

#### Gate 1: Requirements Validation
**Agent**: product-manager  
**Check**: Clear, testable, feasible

#### Gate 2: Architecture & Design Approval
**Agent**: architect + ui-ux-designer  
**Check**: Scalable, secure, accessible

#### Gate 3: Database Schema Approval
**Agent**: database-architect  
**Check**: Optimized, migratable

### Phase 2: Development

#### Gate 4: Code Review
**Agent**: architect  
**Check**: Follows standards, reviewed

#### Gate 5: QA Testing Approval
**Agent**: qa-tester  
**Check**: ≥80% coverage, all tests pass

#### Gate 6: AI Ethics Review (if applicable)
**Agent**: ai-engineer + product-manager  
**Check**: Bias checked, safety validated

### Phase 3: Release

#### Gate 7: Security Approval
**Agent**: security-engineer  
**Check**: No critical/high vulnerabilities

#### Gate 8: Staging Validation
**Agent**: devops-engineer  
**Check**: Performance criteria met

#### Gate 9: Post-Deployment Verification
**Agent**: product-manager  
**Check**: Success metrics achieved

## Communication Protocol

### Agent-to-Agent
- Direct handoffs via orchestrator
- Async context sharing
- Conflict resolution via orchestrator

### Agent-to-Human
- Status updates
- Decision requests
- Blocker escalations
- Approval requests

### Broadcast
- Sprint updates
- Release announcements
- Process changes
- Team wins

## Metrics & Analytics

### Velocity Metrics
- Story points completed
- Cycle time
- Lead time
- Throughput

### Quality Metrics
- Bug escape rate
- Test coverage
- Security vulnerabilities
- Performance regressions

### Collaboration Metrics
- Handoff completion rate
- Cross-agent communication
- Conflict resolution time
- Knowledge sharing

## Escalation Matrix

| Level | Trigger | Action |
|-------|---------|--------|
| 1 | Agent blocked > 2 hours | Notify orchestrator |
| 2 | Conflict between agents | Orchestrator mediation |
| 3 | Technical decision needed | Architect decision |
| 4 | Requirements unclear | Product manager clarification |
| 5 | Resource constraint | Human escalation |

## Configuration

### Environment Variables
```bash
# Team Settings
TEAM_SIZE=12
SPRINT_LENGTH=2w
DAILY_STANDUP=09:00

# Quality Gates (9 total)
REQUIRE_REVIEW=true
QA_TESTING=true
AI_ETHICS_REVIEW=true
SECURITY_SCAN=true
MIN_COVERAGE=80

# Communication
SLACK_WEBHOOK=https://...
EMAIL_ALERTS=true
```

### Workflow Config
```yaml
workflows:
  feature-development:
    phases: 12
    estimated_duration: 1-3 weeks
    parallel_work: true
    agents_involved:
      - product-manager
      - architect
      - ui-ux-designer
      - database-architect
      - ai-engineer
      - backend-dev
      - frontend-dev
      - qa-tester
      - security-engineer
      - devops-engineer
      - data-engineer
    
  bug-fix-pipeline:
    severity_thresholds:
      critical: 1h
      high: 4h
      medium: 24h
      low: next-sprint
```

## Best Practices

### For Agents
1. **Load relevant skills** before starting work
2. **Follow handoff templates** for context transfer
3. **Ask clarifying questions** early
4. **Escalate blockers** immediately
5. **Document decisions** in ADRs

### For Orchestration
1. **Balance workload** across team
2. **Minimize context switching**
3. **Enable parallel work** when possible
4. **Track metrics** for improvement
5. **Celebrate wins** publicly

## Troubleshooting

### Agent Not Responding
1. Check agent availability
2. Review assigned tasks
3. Reassign if blocked

### Handoff Stuck
1. Verify completion criteria
2. Check for missing context
3. Escalate to orchestrator

### Workflow Delayed
1. Identify bottleneck
2. Add resources if needed
3. Adjust timeline
4. Communicate with stakeholders

## Support

For orchestration issues:
- Check logs: `.opencode/logs/`
- Review dashboard: `.opencode/dashboard.md`
- Contact: orchestrator@team.local

---

**Version**: 2.0  
**Team Size**: 12 agents  
**Workflow Phases**: 12  
**Quality Gates**: 9  
**Last Updated**: 2026-02-16  
**Status**: Production Ready
