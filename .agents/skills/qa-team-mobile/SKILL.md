---
name: qa-team-mobile
description: 'Use when you use $qa-team-mobile, automate mobile, or verify tablet behavior.'
---

# qa-team-mobile

Run the four-role pipeline at pinned phone and tablet viewports.

## Args

url=<URL> | <feature> [devices=<names>]

## Procedure

1. Read src/mobile/AGENTS.md. Recon each requested device; reuse UI page objects and flows before creating divergent behavior.

2. Designer uses MTC IDs and form-factor tags. Locators verifies divergent controls at the actual emulation size. Automation proves three repetitions in each affected project.

3. Use @mobile-only / @tablet-only only for true form-factor exclusivity. Do not replace device profiles with ad hoc viewport guesses. Architect verifies reuse and responsive evidence.

4. Return the role verdict, device matrix, case IDs and verification evidence.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.
