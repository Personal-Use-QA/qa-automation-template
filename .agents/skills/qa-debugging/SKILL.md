---
name: qa-debugging
description: 'Use when you investigate a failed test, flaky run or unexpected application result.'
---

# qa-debugging

## Inputs

<failure report or case ID>

## Workflow

1. Read the actual failing report and smallest touched call chain before proposing a fix.

2. Classify the failure as test, product, configuration, environment or insufficient evidence. Preserve the original symptom and revision-bound artifacts.

3. Reproduce the smallest case. Inspect DOM state, request ordering, response timing and test isolation; distinguish the triggering event from its eventual visible state. State a falsifiable cause and test it.

4. Apply the minimal fix only after evidence supports the cause. Do not hide the problem with sleeps, swallowed errors, broader retries, or raised worker counts. Product defects become findings with still evidence.

5. Re-run the affected case and use $qa-verify. Return root cause, supporting evidence, change and remaining uncertainty.

Apply root AGENTS.md and the relevant nested guide. This is a Codex role/workflow skill, not a separately configured agent. Keep sequential handoffs unless the user authorizes delegation.
