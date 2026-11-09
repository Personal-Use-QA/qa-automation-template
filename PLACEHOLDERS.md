# Template choices

All values are non-secret. Answers use KEY=value without shell evaluation or quote expansion. Blank answers retain defaults. Native Codex skills are tracked directly in .agents/skills/; bootstrap only customizes values.

<!-- prettier-ignore -->
| TOKEN | Meaning | Default | Files |
| --- | --- | --- | --- |
| {{PROJECT_NAME}} | project name | QA Automation | AGENTS.md, README.md, package.json |
| {{PRODUCT_NAME}} | product name | Demo App | AGENTS.md |
| {{ORG_NAME}} | org name | Example Team | AGENTS.md |
| {{REPO_SLUG}} | repo slug | qa-automation-template | package.json |
| {{GITHUB_REPO}} | github repo | example/qa-automation | docs/guide/ci.md |
| {{BASE_URL_UI}} | base url ui | https://demo.playwright.dev | AGENTS.md, src/config/env.ts |
| {{BASE_URL_API}} | base url api | https://jsonplaceholder.typicode.com | AGENTS.md, src/config/env.ts |
| {{ENV_NAME}} | env name | demo | AGENTS.md |
| {{GH_ENVIRONMENT}} | gh environment | qa | .github/workflows/_ui-unit.yml, .github/workflows/ci.yml, .github/workflows/on-demand.yml, .github/workflows/regression.yml, AGENTS.md, docs/guide/ci.md |
| {{API_SPEC_URLS}} | api spec urls | none | AGENTS.md |
| {{CASE_PREFIX}} | case prefix | QA | AGENTS.md |
| {{DEFAULT_ROLE}} | default role | default | AGENTS.md |
| {{WORKERS}} | workers | 1 | AGENTS.md, playwright.config.ts |
| {{MAX_LANES}} | max lanes | 2 | .github/workflows/regression-firefox.yml, .github/workflows/regression-webkit.yml, .github/workflows/regression.yml, AGENTS.md |
| {{CONCURRENCY_GROUP}} | concurrency group | qa-shared | .github/workflows/ci.yml, .github/workflows/on-demand.yml, .github/workflows/regression-firefox.yml, .github/workflows/regression-webkit.yml, .github/workflows/regression.yml, AGENTS.md, docs/guide/ci.md |
| {{RUNNER_LABEL}} | runner label | ubuntu-latest | .github/workflows/_ui-unit.yml, .github/workflows/ci.yml, .github/workflows/on-demand.yml, .github/workflows/regression.yml, AGENTS.md, docs/guide/ci.md |
| {{PLAYWRIGHT_MCP_VERSION}} | playwright mcp version | 0.0.79 | .codex/config.toml, docs/agent/mcp.md |
| {{DEVICE_MOBILE}} | device mobile | Pixel 10 | .codex/config.toml, playwright.config.ts |
| {{DEVICE_MOBILE_WEBKIT}} | device mobile webkit | iPhone 17 | .codex/config.toml, playwright.config.ts |
| {{DEVICE_TABLET}} | device tablet | Galaxy Tab S9 | .codex/config.toml, playwright.config.ts |
| {{DEVICE_TABLET_WEBKIT}} | device tablet webkit | iPad Pro 11 | .codex/config.toml, playwright.config.ts |
| {{CONFLUENCE_SITE}} | confluence site | https://example.atlassian.net | .agents/skills/qa-confluence-architecture/SKILL.md, .agents/skills/qa-confluence/SKILL.md |
| {{CONFLUENCE_SPACE}} | confluence space | QA | .agents/skills/qa-confluence-architecture/SKILL.md, .agents/skills/qa-confluence/SKILL.md |
| {{JIRA_PROJECT}} | jira project | QA | docs/agent/connectors.md |
| {{TEST_MAILBOX_DOMAIN}} | test mailbox domain | example.com | AGENTS.md, docs/agent/connectors.md |
| {{POSTMAN_CLI_PATH}} | postman cli path | postman | AGENTS.md, docs/agent/connectors.md |
| {{DESIGN_SOURCE_URL}} | design source url | https://example.com/design-reference.git | .agents/skills/awesome-design/design-md/README.md |
| {{DESIGN_SOURCE_SHA}} | design source sha | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa | .agents/skills/awesome-design/design-md/README.md |
| {{CONNECTOR_MCP_URL}} | connector mcp url | https://example.com/mcp | docs/agent/connectors.md |
