import { test, expect } from '../../../src/ui/fixtures/automation-exercise.fixture';
import { AS_NO_LOGIN, asTag, DEMO_ROLE } from '../../../src/fixtures/credentials';
import * as flow from '../../../src/ui/flows/automation-exercise.flow';

test.describe('Automation Exercise cart', () => {
  test.beforeEach(async ({ page }) => {
    await flow.openAutomationExercise(page);
  });

  test(
    'AutomationExercise.TC12 - Positive Scenario - Add two products to the cart',
    { tag: ['@ae-cart', AS_NO_LOGIN, '@regression', '@high'] },
    async ({ page, ae }) => {
      const one = await flow.addProduct(page, 1);
      const two = await flow.addProduct(page, 2);
      await flow.openCart(page);
      await expect(ae.cartRows).toHaveCount(2);
      await expect(ae.cartOne).toContainText(one.name);
      await expect(ae.cartTwo).toContainText(two.name);
      await expect(ae.cartOnePrice).toHaveText('Rs. ' + one.price);
      await expect(ae.cartTwoPrice).toHaveText('Rs. ' + two.price);
      await expect(ae.cartOneQuantity).toHaveText('1');
      await expect(ae.cartTwoQuantity).toHaveText('1');
      await expect(ae.cartOneTotal).toHaveText('Rs. ' + one.price);
      await expect(ae.cartTwoTotal).toHaveText('Rs. ' + two.price);
    },
  );

  test(
    'AutomationExercise.TC13 - Positive Scenario - Preserve the requested cart quantity',
    { tag: ['@ae-cart', AS_NO_LOGIN, '@regression', '@high'] },
    async ({ page, ae }) => {
      const selection = await flow.addProduct(page, 1, 4);
      await flow.openCart(page);
      await expect(ae.cartOneQuantity).toHaveText('4');
      await expect(ae.cartOneTotal).toHaveText('Rs. ' + selection.price * 4);
    },
  );

  test(
    'AutomationExercise.TC17 - Positive Scenario - Remove a product from the cart',
    { tag: ['@ae-cart', AS_NO_LOGIN, '@regression', '@high'] },
    async ({ page, ae }) => {
      await flow.addProduct(page, 1);
      const remaining = await flow.addProduct(page, 2);
      await flow.openCart(page);
      await flow.removeFirstProduct(page);
      await expect(ae.cartOne).toBeHidden();
      await expect(ae.cartTwo).toBeVisible();
      await expect(ae.cartRows).toHaveCount(1);
      await expect(ae.cartTwo).toContainText(remaining.name);
      await expect(ae.cartTwoPrice).toHaveText('Rs. ' + remaining.price);
      await expect(ae.cartTwoQuantity).toHaveText('1');
      await expect(ae.cartTwoTotal).toHaveText('Rs. ' + remaining.price);
    },
  );

  test(
    'AutomationExercise.TC20 - Positive Scenario - Preserve searched products after sign in',
    { tag: ['@ae-cart', asTag(DEMO_ROLE), '@regression', '@high', '@journey'] },
    async ({ page, ae, account }) => {
      await flow.inspectProduct(page);
      const name = await flow.readProductName(page);
      await flow.openProducts(page);
      await flow.searchCatalogue(page, name);
      await expect(ae.productNames).toHaveText([name]);
      await flow.addSearchResult(page);
      await flow.openCart(page);
      await expect(ae.cartOne).toContainText(name);
      await flow.openLogin(page);
      await flow.signIn(page, account);
      await expect(ae.loggedIn).toContainText(account.name);
      await flow.openCart(page);
      await expect(ae.cartOne).toContainText(name);
      await expect(ae.cartOneQuantity).toHaveText('1');
    },
  );

  test(
    'AutomationExercise.TC22 - Positive Scenario - Add a recommended product to the cart',
    { tag: ['@ae-cart', AS_NO_LOGIN, '@regression', '@med'] },
    async ({ page, ae }) => {
      await flow.addRecommendedProduct(page);
      await expect(ae.cartOne).toBeVisible();
      await expect(ae.cartOneQuantity).toHaveText('1');
      await expect(ae.cartRows).toHaveCount(1);
    },
  );

  test(
    'AutomationExercise.TC28 - Negative Scenario - Require sign in before checkout',
    { tag: ['@ae-cart', AS_NO_LOGIN, '@regression', '@high'] },
    async ({ page, ae }) => {
      await flow.addProduct(page);
      await flow.openCart(page);
      await flow.proceedToCheckout(page);
      await expect(ae.registerLoginModal).toBeVisible();
      await expect(ae.checkoutOrder).toBeHidden();
    },
  );
});
