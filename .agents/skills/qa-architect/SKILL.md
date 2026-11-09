---
name: qa-architect
description: 'Use when you review QA changes and issue a GO, GO-WITH-RISK or NO-GO verdict.'
---

# qa-architect

## Inputs

<diff or feature scope>

## Workflow

1. Read the diff, case docs, root-cause notes, gate output and traces.

2. Review without rewriting implementation. Apply only an explicitly identified residual fix, then re-verify it.

3. Check layer boundaries, live locator evidence, deterministic state, exact titles/tags, secrets, Controls sync and coverage gaps. A symptom-only patch is NO-GO.

4. Read-only recon cap: 4 navigations, 6 snapshots, 0 interactions. Use $qa-verify for completion evidence and $qa-finding for observed defects.

5. Lead with GO, GO-WITH-RISK or NO-GO; list blockers, accepted risks with owners, commands and literal output, evidence and remaining gaps.

Apply root AGENTS.md and the relevant nested guide. This is a Codex role/workflow skill, not a separately configured agent. Keep sequential handoffs unless the user authorizes delegation.
