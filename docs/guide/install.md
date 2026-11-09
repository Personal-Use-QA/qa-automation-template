# Install

Use Node 20 from .nvmrc and npm. On Windows, run bootstrap through Git Bash; PowerShell can run npm commands directly.

1. Clone your new repository from the template.
2. Run ./bootstrap.sh or ./bootstrap.sh --answers answers.env. Use --dry-run to review.
3. Run npm ci.
4. Run npx playwright install --with-deps chromium firefox webkit.
5. Run npm run test:sanity.
6. Open npm run report after an HTML report run.

Public defaults require no sign-in. Bootstrap creates a blank .env only when absent and never reads an existing .env. Keep credentials local or in CI Secrets. Codex discovers tracked .agents/skills/ directly; no skill package installation is required. Connector authorization remains optional.
