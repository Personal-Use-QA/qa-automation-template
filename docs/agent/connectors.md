# Optional account integrations

All are optional and unusable until authorized. Account OAuth grants cannot be copied into a repository. No source account access was inspected. Auth availability varies by product and installed integration; no unverified provider endpoints are shipped.

<!-- prettier-ignore -->
| Connector | QA use | Skill/workflow | Codex authorization | Data rule |
| --- | --- | --- | --- | --- |
| Atlassian | Jira triage and Confluence publishing | qa-confluence, qa-confluence-architecture; Jira {{JIRA_PROJECT}} | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Slack | Run summaries | Authorized summary delivery | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Notion | QA knowledge base | Authorized documentation draft | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Linear | Defect triage | qa-finding | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Figma | Design versus build checks | qa-ui | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Google Drive | Shared evidence documents | Authorized evidence lookup | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Gmail | Notification checks in a plus-addressed {{TEST_MAILBOX_DOMAIN}} inbox | Mailbox workflow | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Google Calendar | Release and test schedules | Authorized schedule lookup | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Postman | API collections; CLI {{POSTMAN_CLI_PATH}} | API engineering | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Grafana Cloud | Service health during failure triage | nightly-heal | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Asana | QA work tracking | Authorized task triage | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Box | Evidence and specs | Authorized file lookup | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Canva | QA diagrams | qa-ui | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| HubSpot | Customer workflow checks | Authorized workflow QA | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Intercom | Support-driven regression signals | Authorized issue triage | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| monday.com | QA scheduling | Authorized task triage | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| Adobe | Design assets | qa-ui | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |
| context7 | Current library docs | Engineering discipline | Use an available Codex connector sign-in flow, or configure the provider's documented MCP and run codex mcp login when OAuth is supported | Never put secrets or .env values into a connector |

Generic Codex remote MCP shape, only after finding the provider's official endpoint:

```toml
[mcp_servers.optional_connector]
url = "{{CONNECTOR_MCP_URL}}"
```

Then run codex mcp login optional_connector if that server supports OAuth. For context7, OAuth applies to its configured MCP server, not a copied secret. For Postman use the documented CLI sign-in flow outside repository files.
