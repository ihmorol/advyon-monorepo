# OpenCode Skills Index

This directory contains all OpenCode-detectable skills for the AI-powered full stack team.

## Structure

```
.opencode/skills/
├── ai-ml-specialist/           # AI/ML Specialist role
├── architecture-lead/          # Architecture Lead role
├── backend-lead/               # Backend Lead role
├── bug-fix-pipeline/           # Bug fix workflow
├── data-engineer/              # Data Engineer role (NEW)
├── database-architect/         # Database Architect role
├── deployment-workflow/        # Deployment workflow
├── devops-engineer/            # DevOps Engineer role
├── feature-development/        # Feature development workflow
├── frontend-lead/              # Frontend Lead role
├── handoff-management/         # Handoff process
├── product-manager/            # Product Manager role
├── qa-testing-lead/            # QA/Testing Lead role (NEW)
├── security-engineer/          # Security Engineer role
├── team-orchestrator/          # Team Orchestrator role
└── ui-ux-designer/             # UI/UX Designer role (NEW)
```

## Team Roles (12 skills) - Complete Team v2.0

### Core Roles
1. **team-orchestrator** - Central coordination hub
2. **product-manager** - Requirements and roadmap
3. **architecture-lead** - System design and standards

### Design & Experience
4. **ui-ux-designer** - User research and design (NEW)

### Development Roles
5. **ai-ml-specialist** - AI integration and RAG
6. **frontend-lead** - React/Next.js development
7. **backend-lead** - API and business logic
8. **database-architect** - PostgreSQL and vector DB

### Quality & Security
9. **qa-testing-lead** - Test automation and quality gates (NEW)
10. **security-engineer** - Security reviews and audits

### Operations & Infrastructure
11. **devops-engineer** - CI/CD and infrastructure
12. **data-engineer** - Analytics pipelines and metrics (NEW)

## Workflow Skills (4 skills)

1. **feature-development** - End-to-end feature workflow (12 phases)
2. **bug-fix-pipeline** - Bug investigation and resolution
3. **deployment-workflow** - Production deployment
4. **handoff-management** - Work transition process (14 templates)

## Total: 16 Skills (up from 13)

## Usage

Each skill contains:
- **Frontmatter**: Metadata for OpenCode discovery
- **Core Capabilities**: What the role/workflow does
- **Deliverables**: What they produce
- **Best Practices**: How to execute well
- **Anti-Patterns**: What to avoid

## Integration with Team Orchestration

These skills work with the team documentation in:
- `team-orchestration/team-structure/` - Detailed role profiles
- `team-orchestration/handoff-templates/` - Handoff documents
- `team-orchestration/workflows/` - Process documentation
- `team-orchestration/cross-functional/` - Shared standards

## How OpenCode Discovers Skills

OpenCode automatically scans:
1. `.opencode/skills/<name>/SKILL.md` (project-local)
2. `~/.config/opencode/skills/<name>/SKILL.md` (global)

Each SKILL.md must have:
- `name`: Lowercase with hyphens (matches directory name)
- `description`: 1-1024 characters
- Optional: `license`, `compatibility`, `metadata`

## Skill Naming Convention

All skill names follow: `^[a-z0-9]+(-[a-z0-9]+)*$`

Examples:
- ✅ `team-orchestrator`
- ✅ `ai-ml-specialist`
- ✅ `feature-development`
- ❌ `TeamOrchestrator`
- ❌ `ai_ml_specialist`
- ❌ `featureDevelopment`

## Getting Started

1. Activate the skill you need: `skill({ name: "team-orchestrator" })`
2. The skill content will be loaded into context
3. Follow the guidance in the skill to complete your task

## Maintenance

- Keep skills up-to-date with current practices
- Version control all changes
- Review and update quarterly
- Add new skills as team evolves

---

**Created**: 2026-02-16
**Updated**: 2026-02-16
**Version**: 2.0
**Team Size**: 12 specialists
**Skills Count**: 16 (13 existing + 3 new)
**Handoff Templates**: 14
**Quality Gates**: 9
