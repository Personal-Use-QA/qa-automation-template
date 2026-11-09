import { test, expect } from '../../../src/ui/fixtures/automation-exercise.fixture';
import { AS_NO_LOGIN, asTag, DEMO_ROLE } from '../../../src/fixtures/credentials';
import * as flow from '../../../src/ui/flows/automation-exercise.flow';

test.describe('Automation Exercise checkout', () => {
  test.beforeEach(async ({ page }) => {
    await flow.openAutomationExercise(page);
  });

  test(
    'AutomationExercise.TC14 - Positive Scenario - Register during checkout and place an order',
    { tag: ['@ae-checkout', AS_NO_LOGIN, '@regression', '@high', '@journey'] },
    async ({ page, ae, identity }) => {
      const selection = await flow.addProduct(page);
      await flow.openCart(page);
      await flow.proceedToCheckout(page);
      await expect(ae.registerLoginModal).toBeVisible();
      await flow.registerFromCheckout(page);
      await flow.beginSignup(page, identity);
      await expect(ae.accountInfoHeading).toBeVisible();
      await flow.completeSignup(page, identity);
      await expect(ae.accountCreated).toBeVisible();
      await flow.continueToStore(page);
      await expect(ae.loggedIn).toContainText(identity.name);
      await flow.openCart(page);
      await flow.proceedToCheckout(page);
      await expect(ae.checkoutOrder).toBeVisible();
      await expect(ae.deliveryAddress).toContainText(identity.address1);
      await expect(ae.billingAddress).toContainText(identity.address1);
      await expect(ae.cartOne).toContainText(selection.name);
      await expect(ae.cartOneQuantity).toHaveText('1');
      await expect(ae.cartOneTotal).toHaveText('Rs. ' + selection.price);
      await flow.placeOrder(page);
      await flow.payForOrder(page, identity);
      await expect(ae.orderPlaced).toBeVisible();
      await flow.deleteCustomer(page);
      await expect(ae.accountDeleted).toBeVisible();
    },
  );

  test(
    'AutomationExercise.TC15 - Positive Scenario - Register before checkout and place an order',
    { tag: ['@ae-checkout', AS_NO_LOGIN, '@regression', '@high', '@journey'] },
    async ({ page, ae, identity }) => {
      await flow.openLogin(page);
      await flow.beginSignup(page, identity);
      await expect(ae.accountInfoHeading).toBeVisible();
      await flow.completeSignup(page, identity);
      await expect(ae.accountCreated).toBeVisible();
      await flow.continueToStore(page);
      await expect(ae.loggedIn).toContainText(identity.name);
      const selection = await flow.addProduct(page);
      await flow.openCart(page);
      await flow.proceedToCheckout(page);
      await expect(ae.checkoutOrder).toBeVisible();
      await expect(ae.deliveryAddress).toContainText(identity.address1);
      await expect(ae.billingAddress).toContainText(identity.address1);
      await expect(ae.cartOne).toContainText(selection.name);
      await expect(ae.cartOneQuantity).toHaveText('1');
      await expect(ae.cartOneTotal).toHaveText('Rs. ' + selection.price);
      await flow.placeOrder(page);
      await flow.payForOrder(page, identity);
      await expect(ae.orderPlaced).toBeVisible();
      await flow.deleteCustomer(page);
      await expect(ae.accountDeleted).toBeVisible();
    },
  );

  test(
    'AutomationExercise.TC16 - Positive Scenario - Sign in before checkout and place an order',
    { tag: ['@ae-checkout', asTag(DEMO_ROLE), '@regression', '@high', '@journey'] },
    async ({ page, ae, account }) => {
      await flow.openLogin(page);
      await flow.signIn(page, account);
      await expect(ae.loggedIn).toContainText(account.name);
      const selection = await flow.addProduct(page);
      await flow.openCart(page);
      await flow.proceedToCheckout(page);
      await expect(ae.checkoutOrder).toBeVisible();
      await expect(ae.cartOne).toContainText(selection.name);
      await expect(ae.deliveryAddress).toContainText(account.address1);
      await expect(ae.billingAddress).toContainText(account.address1);
      await expect(ae.cartOneQuantity).toHaveText('1');
      await expect(ae.cartOneTotal).toHaveText('Rs. ' + selection.price);
      await flow.placeOrder(page);
      await flow.payForOrder(page, account);
      await expect(ae.orderPlaced).toBeVisible();
      await flow.deleteCustomer(page);
      await expect(ae.accountDeleted).toBeVisible();
    },
  );

  test(
    'AutomationExercise.TC23 - Positive Scenario - Match delivery and billing addresses',
    { tag: ['@ae-checkout', AS_NO_LOGIN, '@regression', '@high', '@journey'] },
    async ({ page, ae, identity }) => {
      await flow.openLogin(page);
      await flow.beginSignup(page, identity);
      await expect(ae.accountInfoHeading).toBeVisible();
      await flow.completeSignup(page, identity);
      await expect(ae.accountCreated).toBeVisible();
      await flow.continueToStore(page);
      await expect(ae.loggedIn).toContainText(identity.name);
      await flow.addProduct(page);
      await flow.openCart(page);
      await flow.proceedToCheckout(page);
      await expect(ae.checkoutOrder).toBeVisible();
      await expect(ae.deliveryAddress).toContainText(identity.firstname + ' ' + identity.lastname);
      await expect(ae.deliveryAddress).toContainText(identity.company);
      await expect(ae.deliveryAddress).toContainText(identity.address1);

      await expect(ae.deliveryAddress).toContainText(identity.address2);
      await expect(ae.deliveryAddress).toContainText(identity.city);
      await expect(ae.deliveryAddress).toContainText(identity.state);
      await expect(ae.deliveryAddress).toContainText(identity.zipcode);
      await expect(ae.deliveryAddress).toContainText(identity.country);
      await expect(ae.deliveryAddress).toContainText(identity.mobile_number);
      await expect(ae.billingAddress).toContainText(identity.firstname + ' ' + identity.lastname);
      await expect(ae.billingAddress).toContainText(identity.company);
      await expect(ae.billingAddress).toContainText(identity.address1);
      await expect(ae.billingAddress).toContainText(identity.address2);
      await expect(ae.billingAddress).toContainText(identity.city);
      await expect(ae.billingAddress).toContainText(identity.state);
      await expect(ae.billingAddress).toContainText(identity.zipcode);
      await expect(ae.billingAddress).toContainText(identity.country);
      await expect(ae.billingAddress).toContainText(identity.mobile_number);
      await flow.deleteCustomer(page);
      await expect(ae.accountDeleted).toBeVisible();
    },
  );

  test(
    'AutomationExercise.TC24 - Positive Scenario - Download an invoice after ordering',
    { tag: ['@ae-checkout', AS_NO_LOGIN, '@regression', '@med', '@journey'] },
    async ({ page, ae, identity }) => {
      const selection = await flow.addProduct(page);
      await flow.openCart(page);
      await flow.proceedToCheckout(page);
      await flow.registerFromCheckout(page);
      await flow.beginSignup(page, identity);
      await expect(ae.accountInfoHeading).toBeVisible();
      await flow.completeSignup(page, identity);
      await expect(ae.accountCreated).toBeVisible();
      await flow.continueToStore(page);
      await expect(ae.loggedIn).toContainText(identity.name);
      await flow.openCart(page);
      await flow.proceedToCheckout(page);
      await expect(ae.checkoutOrder).toBeVisible();
      await expect(ae.deliveryAddress).toContainText(identity.address1);
      await expect(ae.billingAddress).toContainText(identity.address1);
      await expect(ae.cartOne).toContainText(selection.name);
      await expect(ae.cartOneQuantity).toHaveText('1');
      await expect(ae.cartOneTotal).toHaveText('Rs. ' + selection.price);
      await flow.placeOrder(page);
      await flow.payForOrder(page, identity);
      await expect(ae.orderPlaced).toBeVisible();
      const invoice = await flow.downloadInvoice(page);
      expect(invoice.failure).toBeNull();
      expect(invoice.filename).toMatch(/invoice/i);
      expect(invoice.content).toContain(identity.name);
      expect(invoice.content).toContain(String(selection.price));
      await flow.continueToStore(page);
      await flow.deleteCustomer(page);
      await expect(ae.accountDeleted).toBeVisible();
    },
  );
});
