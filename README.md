# {{PROJECT_NAME}}

A Playwright + TypeScript QA template with UI, API and mobile demos, engineering gates, and native Codex skills. Demo targets are public and require no credentials.

Temporary example: `npm run test:ae` runs Automation Exercise guest regression. See [example commands](docs/guide/run.md#temporary-automation-exercise-example), [functional cases](docs/testcases/automationexercise.md), and [daily regression and Pages setup](docs/guide/ci.md#temporary-automation-exercise-example). Account and order journeys require explicit selection.

1. Clone your repository from this template.
2. Run ./bootstrap.sh (Git Bash on Windows); review with --dry-run first if desired.
3. Run npm ci.
4. Run npx playwright install --with-deps chromium firefox webkit.
5. Run npm run test:sanity.
6. Run npx playwright test --project=ui-chromium --reporter=html, then npm run report.

Layer handoff: **designer → locators → automation → architect**. Implementation: **pages/clients → flows → fixtures → specs**.

Start with [install](docs/guide/install.md), [run](docs/guide/run.md), [write tests](docs/guide/write-tests.md), [CI](docs/guide/ci.md), [architecture](docs/guide/architecture.md), and [agents](docs/guide/agents.md).

Customize product identity, target URLs, roles, CI environment and concurrency first. [Placeholders](PLACEHOLDERS.md) lists every choice. Public examples remain runnable before bootstrap; replacing URLs alone does not turn TodoMVC cases into product coverage.

Reference-source limits and verification caveats are explicit in [decisions](docs/DECISIONS.md). Codex skills are tracked directly in .agents/skills/ and need no installation. Bootstrap does not publish externally or authorize integrations.
