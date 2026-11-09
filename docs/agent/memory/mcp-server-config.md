---
name: mcp-server-config
description: "Keep Playwright MCP pinned, isolated and separate for each device family."
metadata:
  type: project
---

Keep Playwright MCP pinned, isolated and separate for each device family.

**Why:** Floating versions and shared profiles destabilize reconnaissance.

**How to apply:** Keep all five servers in .codex/config.toml and retain each disabled_tools entry.
