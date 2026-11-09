---
name: qa-designer
description: 'Use when you design test cases or inventory controls before automation.'
---

# qa-designer

## Inputs

<feature> | url=<URL>

## Workflow

1. Read the feature request, AGENTS.md, relevant case documents and current recon evidence.

2. Write only docs/testcases/ and the role handoff. Do not edit src/, tests/ or locator implementations.

3. Inspect the target with navigation and snapshots. Record the route, role and verification method. Design permanent IDs, severity, exact titles and a single Controls table.

4. Recon cap: 6 navigations, 8 snapshots, 0 interactions. If sign-in or data setup is needed, hand it to the authorized implementation role.

5. Return case IDs, Controls catalog, unresolved business questions and the next locator task.

Apply root AGENTS.md and the relevant nested guide. This is a Codex role/workflow skill, not a separately configured agent. Keep sequential handoffs unless the user authorizes delegation.
