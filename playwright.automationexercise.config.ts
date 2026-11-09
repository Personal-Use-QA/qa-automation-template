import { defineConfig, devices } from '@playwright/test';
import { AUTOMATION_EXERCISE_URL, TIMEOUTS, fromEnv } from './src/config/env';

// This temporary example has separate discovery, configuration and reports from the scaffold.
export default defineConfig({
  testDir: './tests/automationexercise',
  forbidOnly: true,
  fullyParallel: false,
  workers: Number(fromEnv(process.env.WORKERS, '1')),
  retries: 0,
  timeout: TIMEOUTS.test,
  expect: { timeout: TIMEOUTS.visible },
  grep:
    process.env.AE_ALLOW_JOURNEYS === '1'
      ? /^/
      : /^(?!.*@journey)(?!.*@logout-revokes)(?!.*@sqli)(?!.*@xss)/,
  outputDir: process.env.PLAYWRIGHT_OUTPUT_DIR || 'test-results/automationexercise',
  reporter: [
    ['list'],
    [
      'json',
      { outputFile: process.env.PLAYWRIGHT_JSON_OUTPUT_NAME || 'results/automationexercise.json' },
    ],
    [
      'html',
      {
        outputFolder:
          process.env.PLAYWRIGHT_HTML_OUTPUT_DIR || 'playwright-report/automationexercise',
        open: 'never',
      },
    ],
  ],
  use: {
    baseURL: AUTOMATION_EXERCISE_URL,
    testIdAttribute: 'data-qa',
    actionTimeout: TIMEOUTS.enabled,
    navigationTimeout: TIMEOUTS.page,
    trace: process.env.AE_ALLOW_JOURNEYS === '1' ? 'off' : 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'ae-chromium',
      testDir: './tests/automationexercise/ui',
      use: { ...devices['Desktop Chrome'] },
    },
    { name: 'ae-api', testDir: './tests/automationexercise/api' },
  ],
});
