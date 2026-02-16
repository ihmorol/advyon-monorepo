# AI Full Stack Team - OpenCode Configuration

World-class multi-agent AI software engineering team for OpenCode.

## 🚀 Quick Start

### 1. Activate an Agent

Press **TAB** in OpenCode to switch between agents:

```
[TAB]
├─ orchestrator       (Coordination)
├─ product-manager    (Requirements)
├─ architect          (System Design)
├─ ui-ux-designer     (Design & Research)
├─ ai-engineer        (AI Integration)
├─ frontend-dev       (UI Development)
├─ backend-dev        (API Development)
├─ qa-tester          (Testing & QA)
├─ security-engineer  (Security Review)
├─ devops-engineer    (Infrastructure)
└─ data-engineer      (Analytics & Data)
```

### 2. Start a Workflow

Each agent has specialized workflows:

**Orchestrator:**
- `/start-feature [name]` - Begin feature development
- `/sprint-planning` - Sprint ceremonies
- `/status` - Project status

**Product Manager:**
- `/story [description]` - Create user story
- `/roadmap` - View product roadmap
- `/prioritize` - Assess priority

**Architect:**
- `/design [feature]` - Design system
- `/adr [title]` - Create decision record
- `/review [proposal]` - Review design

**Developers:**
- `/implement [feature]` - Build feature
- `/test [component]` - Write tests
- `/deploy [env]` - Deploy application

### 3. Automatic Handoffs

When work is complete, the orchestrator automatically:
1. Validates completion
2. Packages context
3. Routes to next agent
4. Notifies team

## 📁 Structure

```
.opencode/
├── config.json              # Master configuration
├── README.md               # This file
├── agents/                 # 12 Persona Agents (TAB-switchable)
│   ├── orchestrator.md
│   ├── product-manager.md
│   ├── architect.md
│   ├── ui-ux-designer.md       # NEW
│   ├── ai-engineer.md
│   ├── frontend-dev.md
│   ├── backend-dev.md
│   ├── qa-tester.md
│   ├── security-engineer.md
│   ├── devops-engineer.md
│   └── data-engineer.md        # NEW
├── skills/                 # 16 Skills (auto-detected)
│   ├── team-orchestrator/
│   ├── product-manager/
│   ├── architecture-lead/
│   ├── ui-ux-designer/         # NEW
│   ├── ai-ml-specialist/
│   ├── database-architect/
│   ├── backend-lead/
│   ├── frontend-lead/
│   ├── qa-testing-lead/        # NEW
│   ├── security-engineer/
│   ├── devops-engineer/
│   ├── data-engineer/          # NEW
│   ├── feature-development/
│   ├── bug-fix-pipeline/
│   ├── deployment-workflow/
│   └── handoff-management/
├── workflows/              # 8 Advanced Workflows
│   ├── feature-development.md
│   ├── sprint-planning.md
│   ├── bug-fix-pipeline.md
│   ├── deployment-workflow.md
│   ├── code-review.md
│   ├── system-design.md
│   ├── performance-optimization.md
│   └── handoff-management.md
└── orchestration/          # Team Orchestration
    └── README.md

 team-orchestration/         # Extended Documentation
├── team-structure/         # Role profiles (12)
├── handoff-templates/      # Handoff documents (14)
├── workflows/              # Process docs
└── cross-functional/       # Shared standards
```

## 🎯 Agents Overview

### Core Agents

| Agent | Mode | Best For |
|-------|------|----------|
| **orchestrator** | orchestrate | Project coordination, task assignment, conflict resolution |
| **product-manager** | plan | Requirements, user stories, prioritization |
| **architect** | plan | System design, ADRs, technical decisions |

### Design & Experience

| Agent | Mode | Best For |
|-------|------|----------|
| **ui-ux-designer** | design | User research, wireframes, design systems, accessibility |

### Development Agents

| Agent | Mode | Best For |
|-------|------|----------|
| **ai-engineer** | build | LLM integration, RAG, prompt engineering |
| **frontend-dev** | build | React/Next.js, UI components, styling |
| **backend-dev** | build | APIs, business logic, database integration |
| **devops-engineer** | build | CI/CD, deployment, infrastructure |
| **data-engineer** | build | Analytics pipelines, metrics, vector databases |

### Quality & Security Agents

| Agent | Mode | Best For |
|-------|------|----------|
| **qa-tester** | test | Test automation, quality gates, test strategy |
| **security-engineer** | review | Security audits, vulnerability assessment |

## 🔄 Workflow Integration

### Feature Development Flow (12 Phases)

```
1. Product Manager defines requirements
2. Architect designs system (parallel with UI/UX)
3. UI/UX Designer creates designs
4. Database Architect implements schema
5. AI Engineer designs AI components (if needed, parallel)
6. Backend Dev implements APIs
7. QA Tester tests backend
8. Frontend Dev implements UI (parallel with QA)
9. AI Ethics Review (if applicable)
10. Security Engineer reviews
11. DevOps Engineer prepares deployment
12. DevOps Engineer deploys
```

### Agent Switching Example

```
You: I need to build an AI chat feature

[TAB → product-manager]
PM: Let me define the requirements...
    ✓ User story created
    ✓ Acceptance criteria defined

[TAB → orchestrator]
Orchestrator: Routing to design phase...

[TAB → ui-ux-designer]
UI/UX: Creating user experience...
    ✓ User research
    ✓ Wireframes
    ✓ Figma designs

[TAB → architect]
Architect: Designing system architecture...
    ✓ API specifications
    ✓ Data models
    ✓ ADR created

[TAB → database-architect]
Database: Implementing schema...
    ✓ Table migrations
    ✓ Vector DB setup

[TAB → ai-engineer]
AI Engineer: Building AI pipeline...
    ✓ RAG implementation
    ✓ Prompt templates
    ✓ Streaming endpoint

[Auto-handoff to backend-dev]
Backend: Implementing APIs...
    ✓ REST endpoints
    ✓ AI integration
    ✓ Authentication

[TAB → qa-tester]
QA: Testing implementation...
    ✓ Unit tests (80%+ coverage)
    ✓ API tests
    ✓ E2E tests

[Auto-handoff to frontend-dev]
Frontend: Building UI...
    ✓ React components
    ✓ AI chat interface
    ✓ Responsive design

[TAB → security-engineer]
Security: Security review...
    ✓ Prompt injection tests
    ✓ OWASP Top 10 checks
    ✓ Auth validation

[TAB → data-engineer]
Data Engineer: Analytics setup...
    ✓ Event tracking
    ✓ Metrics dashboard

[TAB → devops-engineer]
DevOps: Deploying to production...
    ✓ CI/CD pipeline
    ✓ Monitoring configured
    ✓ Feature flags

[TAB → orchestrator]
Orchestrator: Feature deployed successfully! 🎉
```

## 🛠️ Skills (Auto-Detected)

OpenCode automatically discovers these skills:

### Team Skills (12)
- `team-orchestrator` - Central coordination
- `product-manager` - Product management
- `architecture-lead` - System architecture
- `ui-ux-designer` - User research and design
- `ai-ml-specialist` - AI integration patterns
- `database-architect` - Database design
- `backend-lead` - Backend development
- `frontend-lead` - Frontend best practices
- `qa-testing-lead` - Test automation and quality
- `security-engineer` - Security practices
- `devops-engineer` - Deployment patterns
- `data-engineer` - Analytics and data pipelines

### Workflow Skills (4)
- `feature-development` - End-to-end feature workflow (12 phases)
- `bug-fix-pipeline` - Bug resolution
- `deployment-workflow` - Production deployment
- `handoff-management` - Work transitions (14 templates)

## 📊 Quality Gates (9 Total)

All work passes through quality gates:

### Design & Planning
1. **Requirements Validation** - Clear and testable?
2. **Architecture & Design Approval** - Scalable and accessible?
3. **Database Schema Approval** - Optimized and migratable?

### Development
4. **Code Review** - Follows standards?
5. **QA Testing Approval** - ≥80% coverage, all tests pass?
6. **AI Ethics Review** - Bias checked, safety validated?

### Release
7. **Security Approval** - No vulnerabilities?
8. **Staging Validation** - Performance criteria met?
9. **Post-Deployment Verification** - Success metrics achieved?

## 📈 Metrics

### Tracked Automatically
- Handoff completion rate
- Average handoff time
- Blocker resolution time
- Code review time
- Test coverage
- Deployment frequency
- Error rates

### Targets
- Handoff completion: 100%
- Handoff time: < 4 hours
- Blocker resolution: < 24 hours
- Test coverage: > 80%

## 🔧 Customization

### Add New Agent

1. Create `.opencode/agents/my-agent.md`
2. Add frontmatter with name, mode, description
3. Add to `config.json` agents section
4. Restart OpenCode

### Add New Workflow

1. Create `.opencode/workflows/my-workflow.md`
2. Add frontmatter with metadata
3. Document phases and outputs
4. Reference from relevant agents

### Modify Configuration

Edit `.opencode/config.json`:
- Enable/disable agents
- Configure workflows
- Set quality thresholds
- Customize communication

## 🎓 Best Practices

### For Users
1. **Start with orchestrator** for new projects
2. **Switch agents** with TAB for specialized work
3. **Load relevant skills** before starting
4. **Follow workflows** for consistency
5. **Complete handoffs** properly

### For Agents
1. **Stay in character** - Follow your role
2. **Use available tools** - Skills, workflows, templates
3. **Ask clarifying questions** - Ensure understanding
4. **Document decisions** - ADRs, comments
5. **Escalate blockers** - Don't stay stuck
6. **COMMIT AFTER 3+ FILES CHANGED** - MANDATORY RULE: See `.opencode/RULES.md`

## 🆘 Support

### Troubleshooting

**Agent not showing in TAB:**
- Check `.opencode/config.json`
- Verify agent file exists
- Ensure valid frontmatter

**Skills not loading:**
- Verify SKILL.md exists
- Check frontmatter format
- Review permissions

**Handoff stuck:**
- Contact orchestrator
- Check handoff queue
- Review completion criteria

### Resources

- **Team Docs**: `team-orchestration/`
- **Handoff Templates**: `team-orchestration/handoff-templates/`
- **Workflow Guides**: `.opencode/workflows/`
- **Agent Definitions**: `.opencode/agents/`

## 📚 Documentation

- **Getting Started**: This file
- **Team Structure**: `team-orchestration/team-structure/`
- **Workflows**: `.opencode/workflows/`
- **Skills**: `.opencode/skills/`
- **Configuration**: `.opencode/config.json`

---

**Version**: 2.0  
**Team Size**: 12 agents  
**Workflows**: 8  
**Skills**: 16  
**Handoff Templates**: 14  
**Quality Gates**: 9  
**Last Updated**: 2026-02-16

**Complete 12-person AI software engineering team ready!** 🚀
