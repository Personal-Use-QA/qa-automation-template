---
name: qa-automation
description: 'Use when you implement QA flows, fixtures or specs after case and locator handoff.'
---

# qa-automation

## Inputs

<case IDs or implementation handoff>

## Workflow

1. Read the approved cases and verified page object/client contract.

2. Write flows, fixtures and tests. Do not edit locator definitions or silently change case intent.

3. Use $qa-tdd for new coverage. Build one business action per flow, keep selectors out of flows/specs and derive the lane from the sign-in role. Invoke $qa-debugging for failures.

4. Recon cap: 4 navigations, 6 snapshots, 12 safe interactions. Honor user-selected workers and lane counts.

5. Use $qa-verify and prove affected cases three times. Return case mapping, commands and output, evidence and architect handoff.

Apply root AGENTS.md and the relevant nested guide. This is a Codex role/workflow skill, not a separately configured agent. Keep sequential handoffs unless the user authorizes delegation.
