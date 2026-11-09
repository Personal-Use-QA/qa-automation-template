---
name: memory-readme
description: "Memory admission and maintenance rules."
metadata:
  type: reference
---

# Memory store

These are authored starter rules derived from the brief. The original fact files were unavailable; no product-specific bodies were copied.

Admit stable preferences, workflow rules and expensive-to-rediscover facts. Never store transient bug state, diffs or facts already encoded by code or Git. The four types are user, feedback, project and reference. Update rather than duplicate; delete when wrong.

Each fact has name, one-line description and metadata.type, then a rule, Why, How to apply and optional wiki-links to existing facts.

Codex reads this repository store through AGENTS.md. Keep this as the single authoritative memory store; do not create machine-specific copies. Read MEMORY.md first and open only relevant facts.
