---
name: phase-kickoff
description: "Reads a phase doc and produces an ordered execution plan with spec-first work packages, tiered test requirements, and RTL/Hebrew UI obligations. Use when the user asks to break down a phase into tasks, plan the next implementation sprint, create work packages from a roadmap doc, or kick off a new project phase."
---

# Phase Kickoff (Spec-first + Israeli-first)

**Workflow:** When invoked, use plan mode first to present the plan for review. Only create files after the user explicitly approves the plan and asks to implement it.

## Inputs

- Phase file (default: `docs/phases/CURRENT.md`)
- Desired parallelism (single vs 2–3 tracks)

## Output

1) Phase summary
2) Ordered plan by epics
3) Proposed work packages with:
   - title, goal, acceptance criteria
   - spec checklist (contracts, invariants, error codes)
   - criticality (CRITICAL vs STANDARD)
   - RTL/Hebrew obligations (if UI)
   - dependencies + risks
4) First work package to execute now

### Example Work Package

```
WP-2: Implement billing webhook handler
  Goal: Process Stripe webhook events for subscription lifecycle
  Acceptance: invoice.paid, subscription.deleted events handled; idempotency key checked
  Spec: POST /webhooks/stripe → verify signature → upsert subscription record
  Criticality: CRITICAL
  RTL: N/A (backend only)
  Depends on: WP-1 (DB schema)
  Risks: Stripe test-mode vs live-mode key mismatch
```

## Todos and Verification

When the user approves the plan, add every deliverable as a todo — including a todo to update `CURRENT.md` per the project-tracking skill (see `references/` for related skills). Before marking kickoff complete, verify the todo count matches the number of deliverables; if not, reconcile by adding the missing items.
