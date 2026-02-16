---
name: system-design
description: System architecture and design workflow for making technical decisions. Guides teams through requirements analysis, architecture design, technology selection, and documentation. Use when designing new systems, making architectural decisions, or evaluating technical approaches.
license: MIT
compatibility: opencode
metadata:
  category: workflow
  scope: architecture
  duration: 2-5 days
---

# System Design Workflow

Comprehensive system design process for technical decision-making.

## Overview

**Duration**: 2-5 days depending on complexity  
**Lead**: Architecture Lead  
**Participants**: Relevant specialists

## Design Process

### Phase 1: Requirements Analysis (Day 1)

#### Input Gathering
```
□ Business requirements
□ Functional requirements
□ Non-functional requirements
□ Constraints (budget, timeline, team)
□ Success criteria
```

#### Questions to Answer
- What problem are we solving?
- Who are the users?
- What's the scale? (users, requests, data)
- What are the performance requirements?
- What are the security requirements?
- What's the budget?
- What's the timeline?

#### Output
- [ ] Requirements document
- [ ] Scale estimates
- [ ] Constraint list

---

### Phase 2: High-Level Design (Day 1-2)

#### Architecture Patterns

**Monolith**
```
Frontend → Backend → Database
```
- Pros: Simple, fast to develop
- Cons: Hard to scale, tight coupling
- Use: Small teams, simple products

**Microservices**
```
Frontend → API Gateway → Service A
                          → Service B
                          → Service C
```
- Pros: Scalable, independent deployment
- Cons: Complex, operational overhead
- Use: Large teams, complex domains

**Serverless**
```
Frontend → API Gateway → Lambda Functions
                         → Lambda Functions
```
- Pros: No server management, auto-scale
- Cons: Cold starts, vendor lock-in
- Use: Variable traffic, event-driven

**AI-Native Architecture**
```
Frontend → Backend → AI Layer → LLM APIs
              ↓         ↓
         Vector DB   Cache
```
- Specialized for AI features
- RAG pipeline integration
- Cost optimization layer

#### Component Design

Identify major components:
- **Frontend**: Web, mobile, desktop
- **Backend**: API, workers, services
- **Data**: Database, cache, search
- **AI**: LLM integration, embeddings
- **Infrastructure**: Hosting, CDN, monitoring

#### Output
- [ ] Architecture diagram
- [ ] Component list
- [ ] Technology options identified

---

### Phase 3: Technology Selection (Day 2-3)

#### Decision Matrix

For each technology choice, evaluate:

| Criteria | Weight | Option A | Option B | Option C |
|----------|--------|----------|----------|----------|
| Scalability | 25% | 4 | 5 | 3 |
| Performance | 20% | 5 | 4 | 4 |
| Cost | 20% | 3 | 4 | 5 |
| Team Expertise | 15% | 5 | 3 | 4 |
| Ecosystem | 10% | 5 | 4 | 3 |
| Maintainability | 10% | 4 | 4 | 3 |
| **Weighted Score** | | **4.15** | **4.25** | **3.85** |

#### Common Technology Decisions

**Frontend Framework**
- React: Large ecosystem, flexible
- Vue: Easy to learn, great DX
- Angular: Enterprise, opinionated
- Svelte: Performance, simplicity

**Backend Framework**
- Node.js/Express: JavaScript full-stack
- Python/FastAPI: AI/ML integration
- Go: Performance, concurrency
- Rust: Safety, performance

**Database**
- PostgreSQL: Relational, reliable
- MongoDB: Flexible, document
- Redis: Cache, real-time
- Vector DB: AI embeddings

**AI/LLM**
- OpenAI: GPT-4, embeddings
- Anthropic: Claude
- Local: Privacy, cost

**Hosting**
- Vercel: Frontend, serverless
- AWS: Full cloud platform
- GCP: AI/ML focused
- Azure: Enterprise integration

#### Output
- [ ] Technology stack selected
- [ ] Decision rationale documented
- [ ] ADR created

---

### Phase 4: Detailed Design (Day 3-4)

#### API Design

**RESTful API**
```
GET    /api/users          # List
GET    /api/users/:id      # Get one
POST   /api/users          # Create
PUT    /api/users/:id      # Update
DELETE /api/users/:id      # Delete
```

**GraphQL**
```graphql
type Query {
  user(id: ID!): User
  users(limit: Int): [User]
}

type Mutation {
  createUser(input: CreateUserInput!): User
}
```

**API Standards**
- Versioning: /api/v1/
- Authentication: JWT
- Rate limiting: Yes
- Documentation: OpenAPI

#### Data Model

**Relational Schema**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Document Schema**
```typescript
interface User {
  _id: ObjectId;
  email: string;
  name: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  createdAt: Date;
}
```

#### Security Design

**Authentication Flow**
```
User → Login → JWT Token → Use Token → Validate → Access
```

**Authorization Model**
- RBAC: Role-based
- ABAC: Attribute-based
- ACL: Access control lists

**Data Protection**
- Encryption at rest
- Encryption in transit (TLS)
- PII handling
- Audit logging

#### AI Integration Design

**RAG Pipeline**
```
User Query → Embed → Vector Search → Retrieve Context → 
Build Prompt → LLM Call → Stream Response
```

**Components**
- Document ingestion
- Chunking strategy
- Embedding model
- Vector database
- Retrieval logic
- Prompt template
- Response handling

#### Scalability Design

**Horizontal Scaling**
- Load balancer
- Multiple app instances
- Database read replicas
- Caching layer

**Vertical Scaling**
- Bigger servers
- More CPU/RAM
- Database optimization

**Strategies**
- Caching: Redis
- CDN: CloudFlare
- Database: Sharding, partitioning
- Async processing: Queue workers

#### Output
- [ ] API specifications
- [ ] Data models
- [ ] Security design
- [ ] Scalability plan
- [ ] AI integration design

---

### Phase 5: Review & Approval (Day 4-5)

#### Design Review Meeting

**Participants**
- Architecture Lead (facilitator)
- Backend Lead
- Frontend Lead
- DevOps Engineer
- Security Engineer (if security-critical)
- Product Manager

**Agenda** (2 hours)
1. **Context** (10 min): Problem and requirements
2. **Architecture** (30 min): High-level design
3. **Technology** (20 min): Stack decisions
4. **Deep Dive** (40 min): Detailed design areas
5. **Risks** (10 min): What could go wrong
6. **Questions** (10 min): Discussion

#### Review Checklist

- [ ] Scales to expected load
- [ ] Secure by design
- [ ] Cost-effective
- [ ] Maintainable
- [ ] Team can build it
- [ ] Timeline is realistic
- [ ] Risks are identified
- [ ] Alternatives considered

#### Output
- [ ] Design review completed
- [ ] Feedback incorporated
- [ ] Design approved
- [ ] ADR finalized
- [ ] Implementation tickets created

---

## Architecture Decision Records (ADRs)

### Template

```markdown
# ADR-XXX: [Title]

## Status
- Proposed / Accepted / Deprecated / Superseded by ADR-YYY

## Context
What is the issue that we're seeing?

## Decision
What is the change that we're proposing?

## Consequences
What becomes easier or more difficult?

### Positive
- [Benefit 1]
- [Benefit 2]

### Negative
- [Drawback 1]
- [Drawback 2]

### Mitigation
How we'll address negatives:
- [Mitigation 1]

## Alternatives Considered

### Alternative 1: [Name]
- **Description**: What is it?
- **Pros**: Benefits
- **Cons**: Drawbacks
- **Why Rejected**: Reason

### Alternative 2: [Name]
...

## References
- [Link 1]
- [Link 2]
```

---

## Design Artifacts

### Required
- [ ] Architecture diagram
- [ ] ADR for major decisions
- [ ] API specifications
- [ ] Data models
- [ ] Security model

### Optional
- [ ] Sequence diagrams
- [ ] Deployment diagram
- [ ] Cost estimates
- [ ] Risk assessment
- [ ] Migration plan

---

## Success Criteria

Design is complete when:
- [ ] All requirements addressed
- [ ] Architecture approved
- [ ] ADRs documented
- [ ] Team understands design
- [ ] Implementation tickets created
- [ ] Risks identified and mitigated

---

**Workflow Version**: 1.0  
**Design Duration**: 2-5 days  
**Last Updated**: 2026-02-16
