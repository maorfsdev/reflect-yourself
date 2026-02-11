---
name: /reflect-yourself-skip
description: Discard all pending learnings without applying.
---

# /reflect-yourself-skip - Discard Pending Learnings

Discard all queued learnings without applying them.

---

## Instructions for Agent

1. Read the queue file at `~/.cursor/reflect-queue.json` (global location)
2. Show what will be discarded in a **compact card-style list** (no wide tables):

```markdown
## Discarding Learnings

The following will be permanently discarded:

---

### 1. "Use prepared statements"
**Captured:** Jan 29 · **Type:** correction

---

### 2. "Prefer async/await over callbacks"
**Captured:** Jan 28 · **Type:** preference

---
```

3. **Ask Question:** Use the ask question tool for confirmation. Present: **Yes, discard all** / **No, keep queue**. Do not proceed to clear the queue until the user confirms via the chosen option (or an explicit typed "yes" / "confirm").
4. If user confirms, clear the queue:
   - Set `learnings` array to `[]`
   - Or delete the file entirely
5. Confirm:

```markdown
✅ Queue cleared. 2 learnings discarded.
```
