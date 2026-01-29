---
name: /reflect-yourself-skip
description: Discard all pending learnings without applying.
---

# /reflect-yourself-skip - Discard Pending Learnings

Discard all queued learnings without applying them.

---

## Instructions for Agent

1. Read the queue file at `~/.cursor/reflect-queue.json` (global location)
2. Show what will be discarded:

```markdown
## Discarding Learnings

The following learnings will be permanently discarded:

| # | Learning | Captured |
|---|----------|----------|
| 1 | "Use prepared statements" | Jan 29 |
| 2 | "Prefer async/await over callbacks" | Jan 28 |

**Are you sure?** This cannot be undone.
```

3. If user confirms, clear the queue:
   - Set `learnings` array to `[]`
   - Or delete the file entirely

4. Confirm:
```markdown
✅ Queue cleared. 2 learnings discarded.
```
