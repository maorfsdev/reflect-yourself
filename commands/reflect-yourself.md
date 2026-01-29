# /reflect-yourself - Session Self-Learning System

A self-learning system for Cursor that captures corrections, discovers patterns, and syncs learnings to skills and rules.

---

## How It Works

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│  You correct    │ ──► │  /reflect-yourself  │ ──► │  Updates skills │
│  the agent      │     │  captures it        │     │  and rules      │
└─────────────────┘     └─────────────────────┘     └─────────────────┘
```

---

## Instructions for Agent

When this command is invoked, perform the following steps:

### Phase 1: Session Analysis

Scan the current conversation for:

#### 1.1 Corrections (High Priority)
Look for patterns indicating the user corrected the agent:
- "no, use X" / "don't use Y" / "actually..." / "that's wrong"
- "not like that" / "I meant..." / "you should have..."
- "remember:" (explicit marker - highest confidence)
- "always do X" / "never do Y" (preference statements)

#### 1.2 Positive Feedback
Capture what worked well:
- "Perfect!" / "Exactly right" / "Great approach"
- "Yes, like that" / "That's what I wanted"
- Implicit approval (user proceeds without correction)

#### 1.3 Workflow Patterns
Identify repeating tasks that could become skills:
- Same type of request made multiple times
- Multi-step workflows that were followed
- Domain knowledge that was needed repeatedly

### Phase 2: Learning Extraction

For each identified learning, extract:

```yaml
learning:
  type: correction | preference | pattern | knowledge
  content: "The actual learning statement"
  context: "What triggered this learning"
  confidence: 0.60-0.95
  source: "Quote or summary from conversation"
```

#### Confidence Scoring

| Score | Meaning |
|-------|---------|
| 0.90+ | Explicit "remember:" or direct correction |
| 0.80  | Clear correction with "no" / "don't" / "always" |
| 0.70  | Implicit correction or strong preference |
| 0.60  | Inferred from context |

**Discard learnings below 0.60 confidence.**

### Phase 3: Smart Filtering

**KEEP learnings that are:**
- Reusable across sessions
- Actionable and specific
- Not one-time task instructions
- Not context-specific to a single file

**DISCARD:**
- Questions (not corrections)
- One-time instructions ("now add X to this file")
- Vague feedback ("that looks better")
- Already captured in existing skills/rules

### Phase 4: Placement Decision

For each learning, determine the correct destination:

#### Project Skills (`.cursor/skills/`)
```
Is it specific to THIS codebase?
├── Database schemas, conventions → YES
├── Project-specific tools/APIs → YES
├── Team workflow patterns → YES
└── Codebase structure knowledge → YES
```

#### Personal Skills (`~/.cursor/skills/`)
```
Is it reusable across projects?
├── General coding patterns → YES
├── Language best practices → YES
├── Tool usage (git, docker, etc.) → YES
└── Personal workflow preferences → YES
```

#### Project Rules (`.cursor/rules/`)
```
Is it a coding standard or convention?
├── File-specific patterns → YES (with glob)
├── Always-apply standards → YES (alwaysApply: true)
└── Style/formatting preferences → YES
```

#### Existing Skill Update
```
Does this improve an existing skill?
├── Correction while using a skill → Update that skill
├── New edge case for known pattern → Add to existing
└── Supersedes old approach → Replace in existing
```

### Phase 5: Human Review

Present learnings in a summary table:

```markdown
## Learnings Captured

| # | Type | Learning | Confidence | Destination |
|---|------|----------|------------|-------------|
| 1 | correction | "Always run tests before committing" | 0.85 | personal-skill: git-workflow |
| 2 | preference | "Use TypeScript strict mode in this project" | 0.80 | project-rule: typescript.mdc |
| 3 | pattern | "Check logs before debugging API issues" | 0.75 | project-skill: api-debugging |

### Actions Available

For each learning, you can:
- **Apply** - Accept and add to destination
- **Edit** - Modify before applying
- **Skip** - Discard this learning
- **Redirect** - Change the destination

Which learnings should I apply? (e.g., "1,2" or "all" or "1 with edit")
```

### Phase 6: Apply Learnings

**Path Safety:** Only write to these locations:
- `.cursor/skills/` (project)
- `.cursor/rules/` (project)
- `~/.cursor/skills/` (personal)

Never write outside `.cursor/` directories.

For approved learnings:

1. **New Skill Creation:**
   - Create skill directory with SKILL.md
   - Follow the create-skill guidelines
   - Use third-person descriptions with trigger terms

2. **Skill Updates:**
   - **Backup first:** Show the user the current content before modifying
   - Read existing skill file
   - Add learning to appropriate section
   - Maintain skill structure and conciseness

3. **Rule Creation:**
   - Create .mdc file in `.cursor/rules/`
   - Set appropriate globs or alwaysApply
   - Keep under 50 lines

4. **Deduplication:**
   - Before adding, check if similar content exists
   - Offer to merge, replace, or skip duplicates

### Phase 7: Summary Report

After applying, provide:

```markdown
## Reflection Complete

### Applied
- ✅ Added "Run tests before commit" to `git-workflow` skill
- ✅ Created new rule `typescript.mdc` for strict mode

### Skipped
- ⏭️ "Check logs first" - too vague, needs more context

### Skill Health Check
- `git-workflow`: 45 lines (OK)
- `api-debugging`: 89 lines (OK)

### Recommendations
- Consider running /reflect-yourself-skills to discover command patterns
- Review skills that are growing large (>300 lines)
```

---

## Skill Discovery Mode

When invoked with "discover skills" or "find patterns":

1. Review conversation history for repeating request types
2. Group similar requests by intent (not exact wording)
3. Identify workflows that could be automated
4. Propose skill candidates with:
   - Suggested name
   - Description
   - Key steps
   - Recommended location

Example output:
```markdown
## Skill Candidates Discovered

### 1. `api-debugging` (High Confidence)
**Evidence:** 5 similar requests involving API debugging
**Pattern:** Check logs → Verify request → Test endpoint → Check response
**Location:** Project skill (specific to this codebase)

### 2. `component-creation` (Medium Confidence)
**Evidence:** 3 requests to create UI components
**Pattern:** Create file → Add styles → Write tests → Export
**Location:** Personal skill (reusable pattern)

Should I generate these skills? (yes/no/select)
```

---

## Queue System

Learnings can be queued for later processing:

**Queue file:** `~/.cursor/reflect-queue.json` (global location, never pollutes project repos)

**Limits:**
- Maximum 50 pending learnings (older ones should be processed or discarded)
- Warn user if queue has items older than 7 days

```json
{
  "version": 1,
  "learnings": [
    {
      "id": "abc123",
      "timestamp": "2026-01-29T10:30:00Z",
      "type": "correction",
      "content": "Always check for null before accessing properties",
      "confidence": 0.85,
      "source": "User corrected null pointer error",
      "status": "pending"
    }
  ]
}
```

When running /reflect-yourself:
1. Load existing queue
2. Add new learnings from current session
3. Process all pending learnings
4. Clear applied learnings from queue

---

## Locations Reference

| Type | Path | Scope |
|------|------|-------|
| Project Skills | `.cursor/skills/` | This repo only |
| Personal Skills | `~/.cursor/skills/` | All your projects |
| Project Rules | `.cursor/rules/` | This repo only |
| Queue | `~/.cursor/reflect-queue.json` | Pending learnings (global) |
| Built-in Skills | `~/.cursor/skills-cursor/` | **DO NOT MODIFY** |

---

## When to Run

**Run /reflect-yourself when:**
- End of a productive session
- After solving a complex problem
- When you've corrected the agent multiple times
- Before committing significant changes
- After learning something new about the codebase

**Skip when:**
- Simple Q&A session
- Trivial one-off tasks
- No corrections or new patterns emerged
