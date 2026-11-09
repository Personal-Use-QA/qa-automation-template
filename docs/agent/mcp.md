# Browser reconnaissance

Five Codex MCP servers are configured in .codex/config.toml: playwright, playwright-mobile, playwright-mobile-webkit, playwright-tablet, playwright-tablet-webkit.

<!-- prettier-ignore -->
| Flag | Why |
| --- | --- |
| @playwright/mcp@{{PLAYWRIGHT_MCP_VERSION}} | Exact pin prevents mid-session latest re-resolution |
| --isolated | Prevents profile collisions and reuse of a live signed-in session |
| --output-dir reports/explore/mcp | Keeps generated evidence out of source |
| --timeout-action 15000 | Matches TIMEOUTS.enabled |
| --device | Uses one pinned phone/tablet emulation profile |
| --browser webkit | Checks Safari-engine device behavior |

One-time install, printed by bootstrap:

```sh
npx @playwright/mcp@{{PLAYWRIGHT_MCP_VERSION}} install-browser webkit
```

Use public demo routes for starter recon. For product work resolve the environment, then sign in with injected credentials. On WebKit submit with Enter if an overlay swallows the sign-in click. Never copy secrets into snapshots or connector pages.

Pass a filename to browser_snapshot: reports/explore/dom/<url-slug>.yaml. A nameless snapshot cannot support a reliable cache hit. Reuse only matching URL, role and current state; emit [STALE-DOM] on mismatch. Weekly stale guard:

```sh
find reports/explore/dom -name '*.yaml' -mtime +7
```

<!-- prettier-ignore -->
| Command | Navigate | Snapshot | Interact |
| --- | --- | --- | --- |
| qa-team | 12 | 18 | 24 |
| qa-team-mobile | 12 per device | 18 per device | 24 per device |
| qa-team-a11y | 6 | 8 | 12 |
| nightly-heal | 4 | 6 | 8 |
| rate | 0 | 0 | 0 |
| dormant | 0 | 0 | 0 |

Starter budgets; narrower role caps in AGENTS.md also apply. Emit [MCP-OFFLINE] for unavailable tools and [MCP-SKIP] <route> for a route omitted with a reason. All browser_run_code_unsafe tools are denied through disabled_tools in .codex/config.toml. Recon tooling never enters committed tests.
