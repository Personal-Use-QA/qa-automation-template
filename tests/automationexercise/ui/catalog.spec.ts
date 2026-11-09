import { test, expect } from '../../../src/ui/fixtures/automation-exercise.fixture';
import { AS_NO_LOGIN } from '../../../src/fixtures/credentials';
import * as flow from '../../../src/ui/flows/automation-exercise.flow';

test.describe('Automation Exercise catalog', () => {
  test.beforeEach(async ({ page }) => {
    await flow.openAutomationExercise(page);
  });

  test(
    'AutomationExercise.TC08 - Positive Scenario - Browse products and inspect product details',
    { tag: ['@ae-catalog', AS_NO_LOGIN, '@regression', '@high'] },
    async ({ page, ae }) => {
      await flow.openProducts(page);
      await expect(ae.allProductsHeading).toBeVisible();
      await expect(ae.productOneLink).toBeVisible();
      await flow.inspectProduct(page);
      await expect(ae.detailName).not.toBeEmpty();
      await expect(ae.detailCategory).toContainText(/Category:\s*\S/);
      await expect(ae.detailPrice).toHaveText(/Rs\.\s*\d+/);
      await expect(ae.detailAvailability).toContainText(/Availability:\s*\S/);
      await expect(ae.detailCondition).toContainText(/Condition:\s*\S/);
      await expect(ae.detailBrand).toContainText(/Brand:\s*\S/);
    },
  );

  test(
    'AutomationExercise.TC09 - Positive Scenario - Search for a product',
    { tag: ['@ae-catalog', AS_NO_LOGIN, '@regression', '@high'] },
    async ({ page, ae }) => {
      await flow.inspectProduct(page);
      const name = await flow.readProductName(page);
      await flow.openProducts(page);
      await flow.searchCatalogue(page, name);
      await expect(ae.searchedHeading).toBeVisible();
      await expect(ae.productNames).toHaveText([name]);
    },
  );

  test(
    'AutomationExercise.TC18 - Positive Scenario - Browse category products',
    { tag: ['@ae-catalog', AS_NO_LOGIN, '@regression', '@med'] },
    async ({ page, ae }) => {
      await flow.browseCategory(page, 'women');
      await expect(ae.categoryHeading).toHaveText('Women - Dress Products');
      await expect(ae.productNames).not.toHaveCount(0);
      await flow.browseCategory(page, 'men');
      await expect(ae.categoryHeading).toHaveText('Men - Tshirts Products');
      await expect(ae.productNames).not.toHaveCount(0);
    },
  );

  test(
    'AutomationExercise.TC19 - Positive Scenario - Browse brand products',
    { tag: ['@ae-catalog', AS_NO_LOGIN, '@regression', '@med'] },
    async ({ page, ae }) => {
      await flow.openProducts(page);
      await flow.browseBrand(page, 'polo');
      await expect(ae.brandHeading).toHaveText('Brand - Polo Products');
      await expect(ae.productNames).not.toHaveCount(0);
      await flow.browseBrand(page, 'madame');
      await expect(ae.brandHeading).toHaveText('Brand - Madame Products');
      await expect(ae.productNames).not.toHaveCount(0);
    },
  );

  test(
    'AutomationExercise.TC21 - Positive Scenario - Submit a product review',
    { tag: ['@ae-catalog', AS_NO_LOGIN, '@regression', '@med', '@journey'] },
    async ({ page, ae, publicIdentity }) => {
      await flow.inspectProduct(page);
      await flow.submitReview(page, publicIdentity);
      await expect(ae.reviewSuccess).toBeVisible();
    },
  );

  test(
    'AutomationExercise.TC27 - Negative Scenario - Show no products for an unmatched search',
    { tag: ['@ae-catalog', AS_NO_LOGIN, '@regression', '@med'] },
    async ({ page, ae, publicIdentity }) => {
      await flow.openProducts(page);
      await flow.searchCatalogue(page, publicIdentity.email);
      await expect(ae.searchedHeading).toBeVisible();
      await expect(ae.productNames).toHaveCount(0);
    },
  );
});
