---
name: deployment-workflow
description: Complete deployment workflow for releasing features to production. Covers pre-deployment checks, blue/green or rolling deployments, database migrations, verification, rollback procedures, and post-deployment monitoring. Use when deploying to production, managing releases, or handling rollbacks.
license: MIT
compatibility: opencode
metadata:
  category: workflow
  scope: deployment
  duration: 2-4 hours
---

# Deployment Workflow

Complete workflow for deploying to production safely.

## Overview

**Duration**: 2-4 hours (typical)  
**Participants**: DevOps Engineer (lead), All Developers (support)  
**Orchestrator**: Coordinates timing

## Pre-Deployment Checklist

### 1. Code Readiness
- [ ] All features complete and tested
- [ ] Code reviewed and approved
- [ ] Security review passed
- [ ] No critical or high bugs open
- [ ] Documentation updated

### 2. Test Results
- [ ] Unit tests: 100% pass
- [ ] Integration tests: 100% pass
- [ ] E2E tests: 100% pass
- [ ] Performance tests: Within targets
- [ ] Security scans: No critical issues

### 3. Infrastructure
- [ ] Staging deployment successful
- [ ] Smoke tests pass in staging
- [ ] Infrastructure capacity sufficient
- [ ] Monitoring configured
- [ ] Rollback plan tested

### 4. Database (if migrations)
- [ ] Migration scripts reviewed
- [ ] Backward-compatible (or downtime scheduled)
- [ ] Rollback script ready
- [ ] Data backup completed

### 5. Communication
- [ ] Team notified of deployment window
- [ ] Stakeholders informed
- [ ] Status page updated (if maintenance)
- [ ] On-call engineer aware

---

## Deployment Day Schedule

### T-60 Minutes: Pre-Deployment
```
□ Verify all checks passed
□ Confirm deployment window still valid
□ Check system health
□ Ensure rollback plan ready
□ Brief team on deployment steps
```

### T-30 Minutes: Final Preparations
```
□ Merge deployment branch to main
□ Tag release: git tag -a v1.2.3 -m "Release 1.2.3"
□ Push tags: git push origin v1.2.3
□ Update deployment runbook
```

### T-0: Deployment Start

#### Step 1: Database Migrations (if any)
```bash
# Create backup first
pg_dump $DATABASE_URL > backup-$(date +%s).sql

# Run migrations
npx prisma migrate deploy

# Verify migrations
npx prisma migrate status
```

#### Step 2: Deploy Backend
```bash
# Option A: Blue/Green
docker-compose -f docker-compose.blue.yml up -d
# Health check, then switch traffic

# Option B: Rolling (Kubernetes)
kubectl set image deployment/app app=myapp:v1.2.3
kubectl rollout status deployment/app

# Option C: Vercel
vercel --prod
```

#### Step 3: Deploy Frontend
```bash
# Build
npm run build

# Deploy
vercel --prod
# or
npm run deploy:frontend
```

#### Step 4: Verify Deployment
```bash
# Health checks
curl -f https://api.example.com/health
curl -f https://example.com

# Smoke tests
npm run test:smoke
```

### T+30 Minutes: Monitoring
```
□ Watch error rates
□ Monitor response times
□ Check error logs
□ Verify key user flows
□ Confirm database performance
```

### T+60 Minutes: Go/No-Go Decision

**Go**: 
- All health checks pass
- Error rates normal
- No critical alerts
- User flows working

**No-Go (Rollback)**:
- Error rate > 1%
- P95 latency > 5s
- Critical functionality broken
- Database issues

---

## Deployment Strategies

### 1. Blue/Green Deployment

```yaml
# Current: Green environment active
# Deploy: Blue environment
# Switch: Load balancer points to Blue
# Rollback: Point back to Green

Pros:
- Instant rollback
- Zero downtime
- Full testing before switch

Cons:
- Double infrastructure cost
- Database migrations still risky
```

### 2. Rolling Deployment

```yaml
# Gradually replace instances
# 1. Deploy to 10% of instances
# 2. Monitor for errors
# 3. Deploy to 50%
# 4. Deploy to 100%

Pros:
- No double infrastructure
- Gradual risk

Cons:
- Complex rollback
- Version skew during deployment
```

### 3. Canary Deployment

```yaml
# Deploy to small subset of users
# Monitor for issues
# Gradually increase traffic
# Full rollout if stable

Pros:
- Test with real traffic
- Limited blast radius
- Data-driven go/no-go

Cons:
- Complex routing setup
- Requires feature flags
```

---

## Database Migration Strategy

### Safe Migration Principles

1. **Additive Changes First**
```sql
-- Good: Add column with default
ALTER TABLE users ADD COLUMN preferences JSONB DEFAULT '{}';

-- Bad: Remove column immediately
ALTER TABLE users DROP COLUMN old_field;
```

2. **Backward Compatibility**
```sql
-- Deploy 1: Add new column (both old and new work)
ALTER TABLE users ADD COLUMN email_normalized VARCHAR(255);
UPDATE users SET email_normalized = LOWER(email);

-- Deploy 2: Update code to use new column

-- Deploy 3: Remove old column (after code deployed)
ALTER TABLE users DROP COLUMN email;
```

3. **Zero-Downtime Migrations**
```sql
-- Use CONCURRENTLY for indexes
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);

-- Add NOT NULL in separate step
ALTER TABLE users ALTER COLUMN email SET NOT NULL;
```

### Migration Rollback

```bash
# If migration fails
npx prisma migrate resolve --rolled-back [migration-name]

# Or manual rollback
psql $DATABASE_URL < rollback-script.sql
```

---

## Rollback Procedures

### When to Rollback
- Error rate > 1% for > 5 minutes
- Critical functionality broken
- Database migration failure
- Security issue discovered

### Rollback Steps

#### Code Rollback
```bash
# Option 1: Git revert
git revert HEAD
git push origin main

# Option 2: Deploy previous version
vercel --prod --version=v1.2.2

# Option 3: Kubernetes rollback
kubectl rollout undo deployment/app
```

#### Database Rollback
```bash
# Restore from backup
psql $DATABASE_URL < backup-[timestamp].sql

# Or apply rollback script
psql $DATABASE_URL < rollback-script.sql
```

#### Verification
```bash
# Confirm rollback
kubectl rollout status deployment/app

# Health checks
curl -f https://api.example.com/health

# Smoke tests
npm run test:smoke
```

---

## Post-Deployment

### Immediate (First Hour)
- Monitor error rates
- Check response times
- Watch key metrics
- Be on standby

### Short-term (First Day)
- Monitor for anomalies
- Check user feedback
- Verify scheduled jobs
- Review logs for warnings

### Long-term (First Week)
- Compare metrics to baseline
- Gather user feedback
- Document lessons learned
- Update runbooks

---

## Communication

### Deployment Start
```
🚀 Deploying v1.2.3 to production
Features:
- Feature A
- Feature B
- Bug fixes

ETA: 30 minutes
```

### Deployment Complete
```
✅ v1.2.3 deployed successfully
All health checks pass.
Monitoring for next hour.
```

### Rollback
```
⚠️ Rolling back to v1.2.2
Reason: [Issue description]
ETA: 10 minutes
```

---

## Success Criteria

Deployment is successful when:
- [ ] All health checks pass
- [ ] Error rates within normal range
- [ ] Response times acceptable
- [ ] No critical alerts
- [ ] Key user flows working
- [ ] Monitoring shows stable system
- [ ] Stakeholders notified
- [ ] Documentation updated

---

## Anti-Patterns to Avoid

❌ Deploying without testing in staging
❌ No rollback plan
❌ Deploying at end of day/week
❌ Not monitoring after deployment
❌ Big bang deployments (deploy everything at once)
❌ Skipping database backup
❌ Deploying with known issues
