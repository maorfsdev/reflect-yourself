# reflect-yourself

**Add self-evolving AI skills to [Cursor](https://cursor.sh) with a single command.**

Install this skill, and your Cursor agent learns from every correction you make. Run `/reflect-yourself` at the end of a session, and it captures what you taught it - turning one-time corrections into permanent knowledge.

> Inspired by [claude-reflect](https://github.com/BayramAnnakov/claude-reflect) for Claude Code.

## Why use this?

- **Stop repeating yourself** - Correct the agent once, it remembers forever
- **Skills that grow** - Your personal skills evolve as you work
- **Zero config** - Just install and run `/reflect-yourself`

## What it does

### 1. Learn from Corrections

When you correct the agent ("no, use mysqli not PDO"), it captures and routes the learning to the right place.

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│  You correct    │ ──► │  /reflect-yourself  │ ──► │  Updates skills │
│  the agent      │     │  captures it        │     │  and rules      │
└─────────────────┘     └─────────────────────┘     └─────────────────┘
```

### 2. Discover Workflow Patterns

Analyzes your session to find repeating tasks that could become reusable skills.

### 3. Smart Routing

Automatically determines where learnings should go:
- **Project Skills** (`.cursor/skills/`) - Codebase-specific knowledge
- **Personal Skills** (`~/.cursor/skills/`) - Reusable across projects  
- **Project Rules** (`.cursor/rules/`) - Coding standards & conventions

## Installation

Installs globally to `~/.cursor/skills-cursor/` - available in all your projects, invisible to git.

### Quick Install (One-liner)

**macOS/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/AshkanAhmady/reflect-yourself/main/install.sh | bash
```

**Windows PowerShell:**
```powershell
iwr -useb https://raw.githubusercontent.com/AshkanAhmady/reflect-yourself/main/install.ps1 | iex
```

### Alternative Methods

**npm/npx:**
```bash
npx reflect-yourself-install
```

**Git clone:**
```bash
git clone https://github.com/AshkanAhmady/reflect-yourself ~/.cursor/skills-cursor/reflect-yourself
```

**Manual download:**
1. Download ZIP from [GitHub releases](https://github.com/AshkanAhmady/reflect-yourself/releases)
2. Extract to `~/.cursor/skills-cursor/reflect-yourself/`
3. Done - the skill is now available in all projects

### Uninstall

```bash
# macOS/Linux
rm -rf ~/.cursor/skills-cursor/reflect-yourself ~/.cursor/reflect-queue.json

# Windows PowerShell
Remove-Item -Recurse -Force "$env:USERPROFILE\.cursor\skills-cursor\reflect-yourself", "$env:USERPROFILE\.cursor\reflect-queue.json"
```

## Commands

| Command | Description |
|---------|-------------|
| `/reflect-yourself` | Process session corrections with human review |
| `/reflect-yourself-skills` | Discover skill candidates from repeating patterns |
| `/reflect-yourself-queue` | View pending learnings without processing |
| `/reflect-yourself-skip` | Discard all queued learnings |

## How It Works

### Correction Detection

The system detects corrections through patterns like:
- "no, use X" / "don't use Y" / "actually..."
- "remember:" (explicit marker - highest confidence)
- "always do X" / "never do Y"

### Confidence Scoring

| Score | Meaning |
|-------|---------|
| 0.90+ | Explicit "remember:" or direct correction |
| 0.80 | Clear correction with "no" / "don't" / "always" |
| 0.70 | Implicit correction or strong preference |
| 0.60 | Inferred from context |

Learnings below 0.60 confidence are discarded.

### Placement Decision

```
Is it codebase-specific?
├── YES → Project Skill (.cursor/skills/)
└── NO → Could other projects benefit?
         ├── YES → Personal Skill (~/.cursor/skills/)
         └── NO → Probably doesn't need to be a skill
```

### Skill Improvement Routing

When you're corrected while using an existing skill, the correction is routed back to that skill:

```
You: "Help me debug the user dashboard"
Agent: [uses dashboard-debug skill, makes mistake]
You: "No, check network tab first"

→ /reflect-yourself routes this to the skill itself
→ dashboard-debug skill gets updated with new step
```

## File Structure

```
reflect-yourself/
├── SKILL.md                          # Skill manifest
├── commands/
│   ├── reflect-yourself.md           # Main reflection command
│   ├── reflect-yourself-skills.md    # Skill discovery
│   ├── reflect-yourself-queue.md     # View queue
│   └── reflect-yourself-skip.md      # Clear queue
├── rules/
│   └── session-reflect.mdc           # Always-on reminder rule
├── bin/
│   └── install.js                    # npm/npx installer
├── package.json                      # npm package config
├── install.sh                        # Installer for macOS/Linux
├── install.ps1                       # Installer for Windows
├── README.md
├── LICENSE
└── .gitignore

# Queue file location (created on install):
~/.cursor/reflect-queue.json          # Global, never pollutes project repos
```

## Usage

### End of Session Reflection

Run `/reflect-yourself` at the end of productive sessions:

1. The agent analyzes the conversation for corrections and patterns
2. Presents learnings in a table with confidence scores
3. You approve, edit, skip, or redirect each learning
4. Approved learnings are applied to the appropriate destination

### Skill Discovery

Run `/reflect-yourself-skills` to find patterns that should become skills:

1. Reviews session for repeating request types
2. Groups similar requests by intent
3. Proposes skill candidates with workflows
4. Generates SKILL.md files for approved candidates

### Session Reminders

The `session-reflect.mdc` rule provides gentle reminders:
- After completing significant tasks
- When multiple corrections occurred
- At natural session endings

## Comparison with claude-reflect

| Feature | claude-reflect | reflect-yourself |
|---------|----------------|------------------|
| Platform | Claude Code | Cursor |
| Automatic hooks | ✅ Pre/post hooks | ❌ Manual trigger |
| Skill discovery | ✅ Python scripts | ✅ Agent-based |
| Cross-session history | ✅ JSON storage | ⚠️ Queue + manual |
| Plugin marketplace | ✅ Available | ❌ Not yet |

**Key difference:** Cursor doesn't have Claude Code's hook system, so you trigger `/reflect-yourself` manually. The rule file reminds you at natural stopping points.

## Safety

- **Human review required** - All learnings require your approval before being applied
- **Scoped writes** - Only writes to `.cursor/` directories (project or personal)
- **Backup shown** - Before modifying existing skills, you'll see the current content
- **Undo via git** - All changes are in your repo, use `git checkout` to restore if needed

## Tips

1. **Use explicit markers** for important learnings:
   ```
   remember: always use venv for Python projects
   ```

2. **Run after complex sessions** - The more corrections, the more value from reflection

3. **Review skill health** - Keep skills under 500 lines, merge related ones

4. **Project vs Personal** - Put reusable patterns in personal skills, codebase-specific knowledge in project skills

## Contributing

Pull requests welcome! Please:
1. Keep commands concise and focused
2. Test with real Cursor sessions
3. Update README for new features

## License

MIT - See [LICENSE](LICENSE)

## Credits

- Inspired by [claude-reflect](https://github.com/BayramAnnakov/claude-reflect) by Bayram Annakov
- Built for the [Cursor](https://cursor.sh) editor
