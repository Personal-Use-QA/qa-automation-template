import { test, expect } from '../../../src/ui/fixtures/automation-exercise.fixture';
import { AS_NO_LOGIN } from '../../../src/fixtures/credentials';
import * as flow from '../../../src/ui/flows/automation-exercise.flow';

test.describe('Automation Exercise contact', () => {
  test.beforeEach(async ({ page }) => {
    await flow.openAutomationExercise(page);
  });

  test(
    'AutomationExercise.TC06 - Positive Scenario - Submit the contact form with an attachment',
    { tag: ['@ae-contact', AS_NO_LOGIN, '@regression', '@med', '@journey'] },
    async ({ page, ae, publicIdentity }) => {
      await flow.submitContact(page, publicIdentity);
      await expect(ae.contactSuccess).toBeVisible();
      await flow.returnFromContact(page);
      await expect(ae.hero).toBeInViewport();
    },
  );
});
