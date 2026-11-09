---
name: fable-mode
description: 'Use when you make a gated judgment, plan a risky change, or verify a completion claim.'
---

# fable-mode

Use evidence gates to keep judgment, execution and verification aligned.

## Args

<task>

## Procedure

1. State the intended outcome and inspect the smallest relevant slice. Resolve necessary decisions; avoid plan bureaucracy within an established QA pipeline.

2. Implement a minimal change. Delegate only when explicitly authorized; keep a read-only investigator inside its scope. Honor user-set parallelism.

3. Use systematic debugging for any failure and TDD for net-new tests. Run the checks that can disprove the claimed result. Separate observed facts from assumptions.

4. Return verdict, evidence, risks and the next unresolved decision.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.
