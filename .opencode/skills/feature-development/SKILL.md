---
name: feature-development
description: Complete end-to-end workflow for developing new features in AI-powered full stack applications. Guides teams through requirements, design, implementation, security review, and deployment phases with clear handoffs and quality gates. Use when starting a new feature, managing feature development lifecycle, or coordinating multi-role development efforts.
license: MIT
compatibility: opencode
metadata:
  category: workflow
  scope: project-management
  duration: 1-3 weeks
---

# Feature Development Workflow

Complete workflow for developing features in AI-powered applications.

## Overview

**Duration**: 1-3 weeks depending on complexity  
**Participants**: All team members  
**Orchestrator**: Manages and tracks throughout

## Phase 1: Requirements (Days 1-2)

### Participants
- **Primary**: Product Manager
- **Consulted**: Architecture Lead, AI/ML Specialist (if AI feature)
- **Informed**: All team members

### Activities

#### Day 1: Discovery
- Conduct user research
- Analyze competitor solutions
- Define problem statement
- Draft initial requirements

#### Day 2: Refinement
- Review technical feasibility
- Discuss AI requirements
- Refine scope
- Define success metrics
- Finalize acceptance criteria

### Output
- [ ] Completed "Requirements to Design" handoff
- [ ] User stories with acceptance criteria
- [ ] Success metrics defined
- [ ] Priority and timeline agreed

### Handoff
**Product Manager** → **Architecture Lead** (Requirements to Design)

---

## Phase 2: Design & Architecture (Days 3-5)

### Participants
- **Primary**: Architecture Lead
- **Consulted**: AI/ML Specialist, Backend Lead, Frontend Lead
- **Informed**: Product Manager, Team Orchestrator

### Activities

#### Day 3: System Design
- Create system architecture
- Define component boundaries
- Plan data flow
- Identify technical risks
- Draft architecture diagrams

#### Day 4: Technical Specifications
- Design API contracts
- Create database schema
- Design AI architecture
- Plan UI components
- Security considerations

#### Day 5: Review & Approval
- Architecture review meeting
- Risk assessment
- Effort estimation
- Timeline adjustment
- Final approval

### Output
- [ ] Architecture Decision Records (ADRs)
- [ ] System diagrams
- [ ] Technical specifications
- [ ] Estimated effort and timeline

### Handoffs
- **Architecture Lead** → **Frontend Lead** (Design to Frontend)
- **Architecture Lead** → **Backend Lead** (Design to Backend)
- **Architecture Lead** → **AI/ML Specialist** (if applicable)

---

## Phase 3: AI Development (Days 6-10) - If AI Feature

### Participants
- **Primary**: AI/ML Specialist
- **Consulted**: Backend Lead, Database Architect
- **Informed**: Architecture Lead, Team Orchestrator

### Activities

#### Days 6-7: AI Architecture
- Design AI workflow
- Create prompt templates
- Define RAG strategy
- Select models and parameters
- Set up evaluation framework

#### Days 8-9: Implementation
- Implement vector database schema
- Build RAG pipeline
- Test prompt variations
- Evaluate AI performance
- Optimize cost/latency

#### Day 10: Integration Prep
- Document API specifications
- Define error handling
- Create integration guide
- Set up monitoring

### Output
- [ ] Working AI pipeline
- [ ] Prompt library
- [ ] API specifications
- [ ] Performance benchmarks

### Handoff
**AI/ML Specialist** → **Backend Lead** (AI to Backend)

---

## Phase 4: Backend Development (Days 6-12)

### Participants
- **Primary**: Backend Lead
- **Consulted**: Database Architect, AI/ML Specialist
- **Informed**: Frontend Lead, Architecture Lead, Team Orchestrator

### Activities

#### Days 6-8: Foundation
- Set up API structure
- Implement data models
- Create database migrations
- Build authentication
- Set up error handling

#### Days 9-10: Core Logic
- Implement business logic
- Integrate with AI services
- Implement caching
- Add input validation
- Create comprehensive tests

#### Days 11-12: API Finalization
- Finalize API contracts
- Generate TypeScript types
- Create API documentation
- Performance optimization
- Security hardening

### Output
- [ ] Implemented API endpoints
- [ ] Database migrations
- [ ] Unit and integration tests
- [ ] API documentation (OpenAPI)
- [ ] TypeScript types for frontend

### Handoff
**Backend Lead** → **Frontend Lead** (Backend to Frontend)

---

## Phase 5: Frontend Development (Days 11-16)

### Participants
- **Primary**: Frontend Lead
- **Consulted**: Backend Lead, AI/ML Specialist
- **Informed**: Product Manager, Architecture Lead, Team Orchestrator

### Activities

#### Days 11-12: Setup & Architecture
- Set up component structure
- Define state management
- Create API client
- Set up TypeScript types
- Implement base components

#### Days 13-14: Feature Implementation
- Build UI components
- Implement user flows
- Integrate API endpoints
- Implement AI features (streaming)
- Add loading and error states

#### Days 15-16: Polish & Testing
- Responsive design adjustments
- Performance optimization
- Accessibility improvements
- Unit and integration tests
- Cross-browser testing

### Output
- [ ] Implemented frontend features
- [ ] Responsive UI
- [ ] Accessible components
- [ ] Comprehensive tests
- [ ] Performance optimized

### Handoffs
- **Frontend Lead** → **Security Engineer** (Security Review)
- **Backend Lead** → **Security Engineer** (Security Review)

---

## Phase 6: Security Review (Days 17-18)

### Participants
- **Primary**: Security Engineer
- **Consulted**: Frontend Lead, Backend Lead
- **Informed**: Architecture Lead, Team Orchestrator

### Activities
- Review code for vulnerabilities
- Test authentication/authorization
- Check input validation
- Review AI security
- Validate data handling
- Test for OWASP Top 10
- Document findings

### Output
- [ ] Security review report
- [ ] List of findings (if any)
- [ ] Approved for deployment

### Handoff
**Security Engineer** → **DevOps Engineer** (via approved implementation)

---

## Phase 7: Deployment Preparation (Days 17-18)

### Participants
- **Primary**: DevOps Engineer
- **Consulted**: Frontend Lead, Backend Lead
- **Informed**: Team Orchestrator

### Activities
- Review deployment requirements
- Update infrastructure
- Set up monitoring and alerts
- Prepare database migrations
- Create deployment plan
- Test in staging

### Output
- [ ] Infrastructure ready
- [ ] Monitoring configured
- [ ] Deployment plan documented
- [ ] Rollback plan tested
- [ ] Staging deployment successful

### Handoff
**DevOps Engineer** confirms readiness to **Team Orchestrator**

---

## Phase 8: Deployment (Day 19)

### Participants
- **Primary**: DevOps Engineer
- **On Standby**: All developers
- **Informed**: Product Manager, Team Orchestrator

### Deployment Schedule
```
09:00 - Pre-deployment checks
09:30 - Deploy to staging (final verification)
10:00 - Database migrations
10:30 - Backend deployment
11:00 - Frontend deployment
11:30 - Smoke tests
12:00 - Monitor metrics
14:00 - Go/No-go decision
14:30 - Feature announcement (if go)
```

### Output
- [ ] Production deployment successful
- [ ] Healthy metrics
- [ ] Smoke tests pass
- [ ] Feature enabled

---

## Phase 9: Post-Deployment (Days 19-21)

### Participants
- **Primary**: Product Manager, Team Orchestrator
- **Consulted**: All team members
- **Monitoring**: DevOps Engineer

### Activities

#### Day 19: Immediate Monitoring
- Monitor error rates
- Watch performance metrics
- Check user feedback
- Verify key user flows
- Standby for issues

#### Day 20: Validation
- Review success metrics
- Gather user feedback
- Validate acceptance criteria
- Document learnings
- Plan iterations

#### Day 21: Retrospective
- What went well?
- What could improve?
- Process adjustments
- Knowledge sharing
- Celebrate wins!

### Output
- [ ] Success metrics validation
- [ ] User feedback collected
- [ ] Post-mortem completed
- [ ] Process improvements identified

---

## Quality Gates

### Gate 1: Requirements Approval
**Check**: Product Manager sign-off  
**Before**: Moving to design

### Gate 2: Architecture Approval
**Check**: Architecture Lead approves design  
**Before**: Moving to implementation

### Gate 3: Code Review
**Check**: All code reviewed  
**Before**: Moving to security review

### Gate 4: Security Approval
**Check**: Security Engineer approves  
**Before**: Moving to deployment

### Gate 5: Staging Validation
**Check**: All tests pass in staging  
**Before**: Production deployment

### Gate 6: Post-Deployment Verification
**Check**: Success metrics met  
**Before**: Feature announcement

---

## Success Criteria

Feature development is successful when:
- [ ] All acceptance criteria met
- [ ] Success metrics achieved
- [ ] Zero critical bugs in production
- [ ] Performance targets met
- [ ] Security review passed
- [ ] Team learns captured
- [ ] Documentation complete
