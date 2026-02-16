# OpenCode Rules

## Strict Commit Policy (MANDATORY)

### Rule: Commit After File Changes

**Applies To:** ALL AGENTS  
**Priority:** CRITICAL  
**Enforcement:** STRICT

---

### Requirement

All agents MUST commit changes to version control after modifying **3 or more files** during any runtime session. This is not optional and applies consistently throughout the entire runtime.

### Trigger Conditions

The commit rule is triggered when:
- Agent has modified 3 or more files
- Agent completes a logical unit of work
- Agent is about to switch contexts or handoff work
- Before ending a session or task

### Commit Process

1. **Stage Changes**: Automatically stage all modified files
2. **Check Threshold**: Verify if 3+ files have been changed
3. **Create Commit**: If threshold met, commit immediately
4. **Use Proper Message**: Follow conventional commit format

### Commit Message Format

```
{type}: {description} - {files_changed}
```

**Types:**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**
```
feat: Add user authentication module - 4 files changed
fix: Resolve null pointer exception in login - 3 files changed
docs: Update API documentation - 5 files changed
```

### Exceptions

The following files do NOT count toward the threshold:
- `.gitignore`
- `.env` files
- `*.log` files

### Enforcement

- **Immediate**: Commit must happen as soon as threshold is reached
- **No Exceptions**: Unless explicitly approved by orchestrator
- **No Batching**: Do not wait for "more changes" - commit at threshold
- **No Skipping**: Skipping commits is a policy violation

### Consequences

Failure to commit after 3+ file changes:
1. Blocks handoff to next agent
2. Prevents task completion
3. Requires immediate remediation
4. Logged in quality metrics

### Configuration

```json
{
  "rules": {
    "versionControl": {
      "commitPolicy": {
        "enabled": true,
        "threshold": 3,
        "strict": true,
        "enforcement": "immediate"
      }
    }
  }
}
```

### Verification

Agents must verify commit status:
- Check `git status` to see modified files
- Confirm commit count meets threshold
- Validate commit message format
- Ensure no uncommitted changes remain

---

**Remember: Commit early, commit often. The 3-file threshold is a MAXIMUM, not a minimum.**

Last Updated: 2026-02-16
