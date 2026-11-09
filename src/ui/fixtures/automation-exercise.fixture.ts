import { test as base } from '@playwright/test';
import { AUTOMATION_EXERCISE_URL } from '../../config/env';
import { AutomationExercisePage } from '../pages/automation-exercise.page';
import { createDemoIdentity, type DemoIdentity } from '../../fixtures/credentials';
import {
  cleanupDisposableAccount,
  createDisposableAccount,
} from '../../api/flows/automation-exercise.flow';

export const test = base.extend<{
  ae: AutomationExercisePage;
  identity: DemoIdentity;
  account: DemoIdentity;
  publicIdentity: DemoIdentity;
}>({
  publicIdentity: async ({}, use) => {
    await use(createDemoIdentity());
  },
  identity: async ({ request }, use) => {
    const identity = createDemoIdentity();
    try {
      await use(identity);
    } finally {
      await cleanupDisposableAccount(request, identity);
    }
  },
  account: async ({ request, identity }, use) => {
    const response = await createDisposableAccount(request, identity);
    const body: { responseCode?: number } = await response.json();
    if (response.status() !== 200 || body.responseCode !== 201)
      throw new Error('Disposable customer setup failed; customer details are not logged.');
    await use(identity);
  },
  page: async ({ page }, use) => {
    // The example exercises the application; external ad and consent services are outside its scope.
    await page.route('**/*', (route) =>
      new URL(route.request().url()).origin === new URL(AUTOMATION_EXERCISE_URL).origin
        ? route.continue()
        : route.abort(),
    );
    await use(page);
  },
  ae: async ({ page }, use) => {
    await use(new AutomationExercisePage(page));
  },
});
export { expect } from '@playwright/test';
