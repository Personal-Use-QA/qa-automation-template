import { test, expect } from '../../../src/ui/fixtures/automation-exercise.fixture';
import { AS_NO_LOGIN } from '../../../src/fixtures/credentials';
import * as flow from '../../../src/ui/flows/automation-exercise.flow';

test.describe('Automation Exercise home', () => {
  test.beforeEach(async ({ page }) => {
    await flow.openAutomationExercise(page);
  });

  test(
    'AutomationExercise.TC07 - Positive Scenario - Open the test cases reference',
    { tag: ['@ae-home', AS_NO_LOGIN, '@regression', '@low'] },
    async ({ page, ae }) => {
      await flow.openReference(page, 'cases');
      await expect(ae.referenceHeading).toBeVisible();
      await expect(ae.referenceScenarios).not.toHaveCount(0);
    },
  );

  test(
    'AutomationExercise.TC10 - Positive Scenario - Subscribe from the home page',
    { tag: ['@ae-home', AS_NO_LOGIN, '@regression', '@med', '@journey'] },
    async ({ page, ae, publicIdentity }) => {
      await flow.scrollToFooter(page);
      await flow.subscribe(page, publicIdentity.email);
      await expect(ae.subscriptionSuccess).toBeVisible();
    },
  );

  test(
    'AutomationExercise.TC11 - Positive Scenario - Subscribe from the cart',
    { tag: ['@ae-cart', AS_NO_LOGIN, '@regression', '@med', '@journey'] },
    async ({ page, ae, publicIdentity }) => {
      await flow.openCart(page);
      await flow.subscribe(page, publicIdentity.email);
      await expect(ae.subscriptionSuccess).toBeVisible();
    },
  );

  test(
    'AutomationExercise.TC25 - Positive Scenario - Return to the top with the arrow',
    { tag: ['@ae-home', AS_NO_LOGIN, '@regression', '@low'] },
    async ({ page, ae }) => {
      await flow.scrollToFooter(page);
      await expect(ae.subscriptionHeading).toBeInViewport();
      await flow.returnToTop(page, 'arrow');
      await expect(ae.hero).toBeInViewport();
    },
  );

  test(
    'AutomationExercise.TC26 - Positive Scenario - Return to the top by scrolling',
    { tag: ['@ae-home', AS_NO_LOGIN, '@regression', '@low'] },
    async ({ page, ae }) => {
      await flow.scrollToFooter(page);
      await expect(ae.subscriptionHeading).toBeInViewport();
      await flow.returnToTop(page, 'scroll');
      await expect(ae.hero).toBeInViewport();
    },
  );

  test(
    'AutomationExercise.TC29 - Positive Scenario - Open the API reference',
    { tag: ['@ae-home', AS_NO_LOGIN, '@regression', '@low'] },
    async ({ page, ae }) => {
      await flow.openReference(page, 'api');
      await expect(ae.apiHeading).toBeVisible();
      await expect(ae.apiEndpoints).not.toHaveCount(0);
    },
  );
});
