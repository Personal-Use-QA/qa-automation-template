import { test, expect } from '../../../src/ui/fixtures/automation-exercise.fixture';
import { AS_NO_LOGIN, asTag, DEMO_ROLE } from '../../../src/fixtures/credentials';
import * as flow from '../../../src/ui/flows/automation-exercise.flow';

test.describe('Automation Exercise account', () => {
  test.beforeEach(async ({ page }) => {
    await flow.openAutomationExercise(page);
  });

  test(
    'AutomationExercise.TC01 - Positive Scenario - Register and delete a new account',
    { tag: ['@ae-account', AS_NO_LOGIN, '@regression', '@high', '@journey'] },
    async ({ page, ae, identity }) => {
      await flow.openLogin(page);
      await flow.beginSignup(page, identity);
      await expect(ae.accountInfoHeading).toBeVisible();
      await flow.completeSignup(page, identity);
      await expect(ae.accountCreated).toBeVisible();
      await flow.continueToStore(page);
      await expect(ae.loggedIn).toContainText(identity.name);
      await flow.deleteCustomer(page);
      await expect(ae.accountDeleted).toBeVisible();
    },
  );

  test(
    'AutomationExercise.TC02 - Positive Scenario - Sign in with valid credentials',
    { tag: ['@ae-account', asTag(DEMO_ROLE), '@regression', '@high', '@journey'] },
    async ({ page, ae, account }) => {
      await flow.openLogin(page);
      await flow.signIn(page, account);
      await expect(ae.loggedIn).toContainText(account.name);
      await flow.deleteCustomer(page);
      await expect(ae.accountDeleted).toBeVisible();
    },
  );

  test(
    'AutomationExercise.TC03 - Negative Scenario - Reject invalid credentials',
    { tag: ['@ae-account', AS_NO_LOGIN, '@regression', '@high'] },
    async ({ page, ae, publicIdentity }) => {
      await flow.openLogin(page);
      await flow.signIn(page, publicIdentity);
      await expect(ae.loginError).toBeVisible();
      await expect(ae.loggedIn).toBeHidden();
      await expect(ae.loginLink).toBeVisible();
    },
  );

  test(
    'AutomationExercise.TC04 - Positive Scenario - Sign out of an account',
    {
      tag: ['@ae-account', asTag(DEMO_ROLE), '@regression', '@high', '@journey', '@logout-revokes'],
    },
    async ({ page, ae, account }) => {
      await flow.openLogin(page);
      await flow.signIn(page, account);
      await expect(ae.loggedIn).toContainText(account.name);
      await flow.signOut(page);
      await expect(ae.loginEmail).toBeVisible();
      await expect(ae.loggedIn).toBeHidden();
    },
  );

  test(
    'AutomationExercise.TC05 - Negative Scenario - Reject an existing signup email',
    { tag: ['@ae-account', AS_NO_LOGIN, '@regression', '@med', '@journey'] },
    async ({ page, ae, account }) => {
      await flow.openLogin(page);
      await flow.beginSignup(page, account);
      await expect(ae.signupError).toBeVisible();
    },
  );
});
