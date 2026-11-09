# Codex conventions

Checked 2026-11-08.

Commands and trimmed literal output:

```text
codex --version
codex-cli 0.164.0-alpha.11.1

codex --help
Usage: codex [OPTIONS] [PROMPT]
       codex [OPTIONS] <COMMAND> [ARGS]
  mcp               Manage external MCP servers for Codex
  plugin            Manage Codex plugins
  -s, --sandbox <SANDBOX_MODE>
          [possible values: read-only, workspace-write, danger-full-access]
  -a, --ask-for-approval <APPROVAL_POLICY>
          Possible values:
          - on-request: The model decides when to ask the user for approval
          - never:      Never ask for user approval

codex mcp --help
Usage: codex mcp [OPTIONS] <COMMAND>
Commands:
  list
  get
  add
  remove
  login
  logout
```

<!-- prettier-ignore -->
| Capability | Codex location or implementation | Evidence |
| --- | --- | --- |
| Root and nested instructions | AGENTS.md from root to working directory; AGENTS.override.md takes precedence | [Official instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md) |
| Repository skills | .agents/skills/<name>/SKILL.md, directly tracked and discoverable | [Official skills](https://learn.chatgpt.com/docs/build-skills) |
| User skills | ~/.agents/skills/; not modified by this template | Same skill documentation |
| Explicit invocation | $skill-name; descriptions also support automatic selection | Same skill documentation |
| Config | Trusted project .codex/config.toml; user ~/.codex/config.toml | [Config scope](https://learn.chatgpt.com/docs/config-file/config-basic) |
| MCP | [mcp_servers.name], command, args and disabled_tools | [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference) |
| MCP timeouts | startup_timeout_sec and tool_timeout_sec supported; defaults inherited | Same reference |
| Permissions | Operator approval_policy and sandbox_mode; no override shipped | CLI help above; config reference |
| Roles and discipline | Repository-local Codex skills; sequential handoffs | [Skill catalog](skills.md) |
| Policy checks | AGENTS.md plus CI and scripts/doc-sync-check.mjs; no lifecycle hooks required | [Enforcement](enforcement.md) |
| Memory | Repo-local docs/agent/memory/ read/update rule | AGENTS.md §25 |

The skill location and invocation were rechecked against official OpenAI documentation on 2026-11-08. No connector was authenticated and no MCP server registered. The unavailable reference checkout is not needed to use this Codex-only scaffold.
