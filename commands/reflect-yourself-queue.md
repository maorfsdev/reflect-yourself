---
name: /reflect-yourself-queue
description: View pending learnings queue without processing.
---

# /reflect-yourself-queue - View Pending Learnings

View the queue of captured learnings without processing them.

---

## Instructions for Agent

1. Read the queue file at `~/.cursor/reflect-queue.json` (global location)
2. If the file doesn't exist or is empty, report "No pending learnings"
3. Display learnings in a formatted table:

```markdown
## Pending Learnings Queue

| # | Date | Type | Learning | Confidence | Status |
|---|------|------|----------|------------|--------|
| 1 | Jan 29 | correction | "Use prepared statements" | 0.85 | pending |
| 2 | Jan 28 | preference | "Prefer async/await over callbacks" | 0.80 | pending |

**Total:** 2 pending learnings

### Actions
- Run `/reflect-yourself` to process and apply these learnings
- Run `/reflect-yourself-skip` to discard all pending learnings
```

4. If there are learnings with `status: "applied"`, they can be cleaned up
5. Show age of oldest learning to encourage processing
