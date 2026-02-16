---
name: performance-optimization
description: Performance tuning and optimization workflow for improving application speed, efficiency, and scalability. Guides teams through profiling, bottleneck identification, optimization implementation, and validation. Use when improving performance, investigating slow operations, or preparing for scale.
license: MIT
compatibility: opencode
metadata:
  category: workflow
  scope: optimization
  duration: 1-5 days
---

# Performance Optimization Workflow

Systematic approach to improving application performance.

## Overview

**Duration**: 1-5 days depending on complexity  
**Trigger**: Slow performance, scale preparation, or proactive tuning  
**Goal**: Measurable performance improvement

## Optimization Process

### Phase 1: Measurement & Profiling (Day 1)

#### Identify Slow Operations

**User-Reported Issues**
- Page loads slowly
- API calls timeout
- Search is slow
- AI responses lag

**Metric-Based Detection**
- P95 latency > target
- Error rate increase
- CPU/memory spikes
- Database slow queries

#### Profiling Tools

**Frontend**
- Lighthouse (Chrome DevTools)
- Web Vitals
- React Profiler
- Bundle analyzer

**Backend**
- Node.js: clinic.js, 0x
- APM: Datadog, New Relic
- Logging: Response times

**Database**
- PostgreSQL: pg_stat_statements
- MongoDB: Profiler
- Redis: SLOWLOG

**AI/LLM**
- Token usage tracking
- Response time monitoring
- Cost analysis

#### Establish Baseline

Measure current performance:
```
Metric          | Current | Target | Gap
----------------|---------|--------|-----
Page Load       | 4.2s    | 2.0s   | 2.2s
API Response    | 800ms   | 200ms  | 600ms
DB Query        | 150ms   | 50ms   | 100ms
AI Response     | 5s      | 3s     | 2s
```

#### Output
- [ ] Performance baseline established
- [ ] Bottlenecks identified
- [ ] Profiling data collected

---

### Phase 2: Analysis (Day 1-2)

#### Common Bottlenecks

**Frontend**
- Large bundle size
- Unoptimized images
- Blocking JavaScript
- Excessive re-renders
- No caching

**Backend**
- N+1 queries
- Missing indexes
- Synchronous operations
- Memory leaks
- Inefficient algorithms

**Database**
- Missing indexes
- Full table scans
- Lock contention
- Large transactions
- Poor query design

**AI/LLM**
- Large prompts
- No caching
- Inefficient models
- Sequential calls
- High token usage

**Network**
- Large payloads
- Too many requests
- No compression
- Slow third-party APIs

#### Root Cause Analysis

**5 Whys Technique**
```
Problem: API is slow
Why? Database queries are slow
Why? No indexes on foreign keys
Why? Schema designed without query patterns
Why? Requirements not clear during design
Why? No performance requirements specified

Solution: Add indexes, define perf requirements
```

#### Prioritization

**Impact vs Effort Matrix**
```
High Impact, Low Effort → Do First
High Impact, High Effort → Plan Carefully
Low Impact, Low Effort → Fill In
Low Impact, High Effort → Don't Do
```

#### Output
- [ ] Root causes identified
- [ ] Optimizations prioritized
- [ ] Implementation plan

---

### Phase 3: Optimization (Day 2-4)

#### Frontend Optimizations

**Bundle Size**
```typescript
// Code splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Tree shaking
import { specificFunction } from 'library';
```

**Images**
```typescript
// Next.js Image optimization
<Image
  src="/photo.jpg"
  width={800}
  height={600}
  priority={true}
/>
```

**Caching**
```typescript
// React Query caching
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

#### Backend Optimizations

**Database Queries**
```typescript
// Bad: N+1 queries
const users = await db.users.findAll();
for (const user of users) {
  user.posts = await db.posts.find({ userId: user.id });
}

// Good: Single query with join
const users = await db.users.findAll({
  include: [{ model: db.posts }]
});
```

**Caching**
```typescript
// Redis cache
const cacheKey = `user:${userId}`;
let user = await redis.get(cacheKey);

if (!user) {
  user = await db.users.findById(userId);
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
}
```

**Async Operations**
```typescript
// Bad: Sequential
const a = await fetchA();
const b = await fetchB();

// Good: Parallel
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

#### Database Optimizations

**Indexes**
```sql
-- Add index for frequent queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Composite index
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
```

**Query Optimization**
```sql
-- Bad: SELECT *
SELECT * FROM users WHERE status = 'active';

-- Good: Select only needed columns
SELECT id, name, email FROM users WHERE status = 'active';
```

**Connection Pooling**
```typescript
// Prisma connection pooling
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Pool settings
  connectionLimit: 20,
});
```

#### AI Optimizations

**Caching**
```typescript
// Cache embeddings (deterministic)
const cacheKey = hash(document);
let embedding = await cache.get(cacheKey);

if (!embedding) {
  embedding = await openai.embeddings.create({ input: document });
  await cache.set(cacheKey, embedding);
}
```

**Model Selection**
```typescript
// Use cheaper models for simple tasks
const model = complexity > 0.8 ? 'gpt-4' : 'gpt-3.5-turbo';

const response = await openai.chat.completions.create({
  model,
  messages,
});
```

**Streaming**
```typescript
// Stream responses to reduce perceived latency
res.setHeader('Content-Type', 'text/event-stream');

const stream = await openai.chat.completions.create({
  model: 'gpt-4',
  messages,
  stream: true,
});

for await (const chunk of stream) {
  res.write(chunk.choices[0]?.delta?.content || '');
}
```

#### Infrastructure Optimizations

**CDN**
- Cache static assets
- Edge location serving
- Compression (Brotli, Gzip)

**Database Scaling**
- Read replicas
- Connection pooling
- Query caching

**Application Scaling**
- Horizontal scaling
- Load balancing
- Auto-scaling

---

### Phase 4: Validation (Day 4-5)

#### Testing

**Before/After Comparison**
```
Metric          | Before | After | Improvement
----------------|--------|-------|------------
Page Load       | 4.2s   | 1.8s  | 57%
API Response    | 800ms  | 150ms | 81%
DB Query        | 150ms  | 20ms  | 87%
AI Response     | 5s     | 2.5s  | 50%
```

**Load Testing**
```bash
# Artillery load test
artillery quick --count 50 --num 20 http://api.example.com/endpoint
```

**Regression Testing**
- Ensure no functionality broken
- Check all user flows
- Verify error handling

#### Monitoring

**Production Monitoring**
- Watch for errors
- Monitor response times
- Check resource usage
- Validate improvements

**Alerting**
- Set performance alerts
- Threshold: P95 > target
- Notify on degradation

#### Output
- [ ] Improvements validated
- [ ] Before/after metrics documented
- [ ] No regressions introduced
- [ ] Production monitoring in place

---

## Performance Targets

### Frontend
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.8s

### Backend
- **API Response (P95)**: < 200ms
- **Database Query**: < 50ms
- **Error Rate**: < 0.1%
- **Uptime**: > 99.9%

### AI
- **First Token**: < 500ms
- **Full Response**: < 5s
- **Cost per Request**: Within budget
- **Accuracy**: Meeting targets

---

## Quick Wins Checklist

### Frontend
- [ ] Enable gzip/Brotli compression
- [ ] Optimize images (WebP, proper sizing)
- [ ] Lazy load below-fold content
- [ ] Add resource hints (preload, prefetch)
- [ ] Minimize third-party scripts

### Backend
- [ ] Add database indexes
- [ ] Implement caching
- [ ] Fix N+1 queries
- [ ] Enable connection pooling
- [ ] Compress API responses

### AI
- [ ] Cache embeddings
- [ ] Use appropriate models
- [ ] Implement streaming
- [ ] Batch requests
- [ ] Monitor costs

---

## Anti-Patterns to Avoid

❌ Premature optimization
❌ Optimizing without measuring
❌ Ignoring mobile performance
❌ Not testing under load
❌ Forgetting about accessibility
❌ Over-optimizing at cost of readability

---

## Success Criteria

Performance optimization successful when:
- [ ] Targets met or exceeded
- [ ] No functionality regressions
- [ ] Production monitoring shows improvement
- [ ] Cost implications acceptable
- [ ] Documentation updated

---

**Workflow Version**: 1.0  
**Optimization Duration**: 1-5 days  
**Last Updated**: 2026-02-16
