# Codex operation

Codex reads root AGENTS.md and the nested mobile AGENTS.md. Repository-local skills live directly in .agents/skills/ and are checked into Git; bootstrap does not install, link or duplicate them.

Invoke $qa-team for the pipeline, or $qa-designer, $qa-locators, $qa-automation and $qa-architect for a specific role. Codex performs sequential role handoffs by default. These skills do not spawn agents; delegation requires user authorization. Use $qa-team-mobile or $qa-team-a11y for specialized coverage.

The included $qa-tdd, $qa-debugging and $qa-verify skills supply development discipline without external skill packages. Dormant skills must be completed before use. Edit the canonical SKILL.md and its relevant assets in place.

Playwright MCP is configured only in .codex/config.toml. It is reconnaissance-only and denies browser_run_code_unsafe on all five servers. Bootstrap prints browser setup and optional connector guidance without installing integrations. Operator approval and sandbox policy remain under operator control.

Read docs/agent/memory/MEMORY.md at session start, update stable facts without duplication and delete wrong facts. See [skill catalog](../agent/skills.md), [enforcement](../agent/enforcement.md) and [conventions](../agent/CODEX-CONVENTIONS.md).
