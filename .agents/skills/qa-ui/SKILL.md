---
name: qa-ui
description: 'Use when you design a QA page, compare interface directions, or use $qa-ui.'
---

# qa-ui

Design a business-readable QA interface before implementation.

## Args

<screen or tool goal>

## Procedure

1. Inspect existing components, constraints and user decisions. Sketch competing directions only where a real choice matters.

2. Explain each option with concrete user tasks. Choose from the user-approved constraints; request a team decision only when the alternatives materially affect the result.

3. Build the selected direction, verify keyboard access and responsive states, and capture evidence. Do not expose implementation details in the product flow.

4. Return the chosen direction, rationale, paths and verification.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.
