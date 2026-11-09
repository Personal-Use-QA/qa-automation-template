import { test as base } from '@playwright/test';
import { createDemoIdentity, type DemoIdentity } from '../../fixtures/credentials';
import {
  cleanupDisposableAccount,
  createDisposableAccount,
} from '../flows/automation-exercise.flow';

export const test = base.extend<{
  identity: DemoIdentity;
  account: DemoIdentity;
  nonexistentIdentity: DemoIdentity;
}>({
  nonexistentIdentity: async ({}, use) => {
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
    if (response.status() !== 200 || body.responseCode !== 201) {
      throw new Error('Disposable account setup failed; no customer details are logged.');
    }
    await use(identity);
  },
});
export { expect } from '@playwright/test';
