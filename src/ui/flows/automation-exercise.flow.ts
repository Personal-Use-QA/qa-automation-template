import type { Page } from '@playwright/test';
import { AutomationExercisePage } from '../pages/automation-exercise.page';
import type { DemoIdentity } from '../../fixtures/credentials';

/** Start an isolated visit to the practice store. */
export async function openAutomationExercise(page: Page): Promise<void> {
  const response = await page.goto(AutomationExercisePage.PATH, { waitUntil: 'load' });
  if (!response?.ok())
    throw new Error('Practice store navigation failed: HTTP ' + response?.status());
}

/** Choose a catalogue product and the quantity to buy. */
export async function addProduct(page: Page, product: 1 | 2 = 1, quantity = 1) {
  const ae = new AutomationExercisePage(page);
  await inspectProduct(page, product);
  await ae.quantityInput.fill(String(quantity));
  const selection = {
    name: await ae.detailName.innerText(),
    price: Number((await ae.detailPrice.innerText()).replace(/^Rs\.\s*/, '').replaceAll(',', '')),
    quantity,
  };
  await ae.addToCartButton.click();
  await ae.addedModal.waitFor({ state: 'visible' });
  await ae.continueShopping.click();
  await ae.addedModal.waitFor({ state: 'hidden' });
  return selection;
}

/** Inspect the current browser's shopping cart. */
export async function openCart(page: Page): Promise<void> {
  await new AutomationExercisePage(page).cartLink.click();
  await page.waitForLoadState('load');
}

/** Browse the store's product catalogue. */
export async function openProducts(page: Page): Promise<void> {
  await new AutomationExercisePage(page).productsLink.click();
  // Search handlers are bound by scripts below the visible form; clicks can precede those downloads.
  await page.waitForLoadState('load');
}

/** Inspect a known product from the visible catalogue. */
export async function inspectProduct(page: Page, product: 1 | 2 = 1): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await openProducts(page);
  await (product === 1 ? ae.productOneLink : ae.productTwoLink).click();
  await page.waitForLoadState('load');
}

/** Read the selected product's current business name for later search and invoice checks. */
export async function readProductName(page: Page): Promise<string> {
  return new AutomationExercisePage(page).detailName.innerText();
}

/** Buy the product selected from the search results without clearing the search first. */
export async function addSearchResult(page: Page): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await ae.productOneLink.click();
  await page.waitForLoadState('load');
  await ae.addToCartButton.click();
  await ae.addedModal.waitFor({ state: 'visible' });
  await ae.continueShopping.click();
  await ae.addedModal.waitFor({ state: 'hidden' });
}

/** Search the catalogue through the customer search form. */
export async function searchCatalogue(page: Page, term: string): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await ae.searchInput.fill(term);
  const destination = page.waitForURL((url) => url.searchParams.get('search') === term, {
    waitUntil: 'load',
  });
  await ae.searchButton.click();
  await destination;
}

/** Remove the product owned by this case from its isolated cart. */
export async function removeFirstProduct(page: Page): Promise<void> {
  await new AutomationExercisePage(page).removeOne.click();
}

/** Request checkout using the current cart and customer session. */
export async function proceedToCheckout(page: Page): Promise<void> {
  await new AutomationExercisePage(page).checkoutButton.click();
}

/** Choose the registration path offered at visitor checkout. */
export async function registerFromCheckout(page: Page): Promise<void> {
  await new AutomationExercisePage(page).registerLoginModal.click();
}

/** Add a recommended item using the home-page recommendation carousel. */
export async function addRecommendedProduct(page: Page): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await ae.recommendedAdd.scrollIntoViewIfNeeded();
  await ae.recommendedAdd.click();
  await ae.addedModal.waitFor({ state: 'visible' });
  await ae.viewCartModal.click();
}

/** Browse a women's category, then an independent men's category. */
export async function browseCategory(page: Page, category: 'women' | 'men'): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await (category === 'women' ? ae.womenCategory : ae.menCategory).click();
  await (category === 'women' ? ae.womenDress : ae.menTshirts).click();
  await page.waitForLoadState('load');
}

/** Browse the products grouped under one named brand. */
export async function browseBrand(page: Page, brand: 'polo' | 'madame'): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await (brand === 'polo' ? ae.poloBrand : ae.madameBrand).click();
}

/** Open one of the store's customer-facing reference screens. */
export async function openReference(page: Page, reference: 'cases' | 'api'): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await (reference === 'cases' ? ae.testCasesLink : ae.apiLink).click();
}

/** Scroll to the subscription section at the foot of the page. */
export async function scrollToFooter(page: Page): Promise<void> {
  await new AutomationExercisePage(page).subscriptionHeading.scrollIntoViewIfNeeded();
}

/** Return to the page heading with the arrow or normal browser scrolling. */
export async function returnToTop(page: Page, method: 'arrow' | 'scroll'): Promise<void> {
  const ae = new AutomationExercisePage(page);
  if (method === 'arrow') await ae.scrollUp.click();
  else await ae.homeLink.scrollIntoViewIfNeeded();
}

/** Subscribe the synthetic mailbox through the page's own form. */
export async function subscribe(page: Page, email: string): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await ae.subscriptionEmail.fill(email);
  await ae.subscribeButton.click();
}

/** Open the sign-in and registration screen. */
export async function openLogin(page: Page): Promise<void> {
  await new AutomationExercisePage(page).loginLink.click();
}

/** Submit the credentials assigned to the current isolated case. */
export async function signIn(page: Page, identity: DemoIdentity): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await ae.loginEmail.fill(identity.email);
  await ae.loginPassword.fill(identity.password);
  await ae.loginButton.click();
}

/** End only the disposable customer's current session. */
export async function signOut(page: Page): Promise<void> {
  await new AutomationExercisePage(page).logoutLink.click();
}

/** Begin registration with the current case's disposable identity. */
export async function beginSignup(page: Page, identity: DemoIdentity): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await ae.signupName.fill(identity.name);
  await ae.signupEmail.fill(identity.email);
  await ae.signupButton.click();
}

/** Complete the account and address information for a disposable customer. */
export async function completeSignup(page: Page, identity: DemoIdentity): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await ae.titleMr.check();
  await ae.password.fill(identity.password);
  await ae.days.selectOption(identity.birth_date);
  await ae.months.selectOption(identity.birth_month);
  await ae.years.selectOption(identity.birth_year);
  await ae.newsletter.check();
  await ae.offers.check();
  await ae.firstName.fill(identity.firstname);
  await ae.lastName.fill(identity.lastname);
  await ae.company.fill(identity.company);
  await ae.address1.fill(identity.address1);
  await ae.address2.fill(identity.address2);
  await ae.country.selectOption(identity.country);
  await ae.state.fill(identity.state);
  await ae.city.fill(identity.city);
  await ae.zipcode.fill(identity.zipcode);
  await ae.mobile.fill(identity.mobile_number);
  await ae.createAccountButton.click();
}

/** Continue from an account confirmation into the store. */
export async function continueToStore(page: Page): Promise<void> {
  await new AutomationExercisePage(page).continueButton.click();
}

/** Delete the disposable customer through the visible account action. */
export async function deleteCustomer(page: Page): Promise<void> {
  await new AutomationExercisePage(page).deleteAccountLink.click();
}

/** Submit the practice contact form with a harmless in-memory attachment. */
export async function submitContact(page: Page, identity: DemoIdentity): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await ae.contactLink.click();
  await page.waitForLoadState('load');
  await ae.contactName.fill(identity.name);
  await ae.contactEmail.fill(identity.email);
  await ae.contactSubject.fill('Automation practice example');
  await ae.contactMessage.fill('Synthetic functional test of the practice contact form.');
  await ae.contactUpload.setInputFiles({
    name: 'example.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('Practice attachment'),
  });
  page.once('dialog', (dialog) => dialog.accept());
  await ae.contactSubmit.click();
}

/** Return from the contact acknowledgement to the store. */
export async function returnFromContact(page: Page): Promise<void> {
  await new AutomationExercisePage(page).contactHome.click();
  await page.waitForLoadState('load');
}

/** Submit a synthetic review through the practice product form. */
export async function submitReview(page: Page, identity: DemoIdentity): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await ae.reviewName.fill(identity.name);
  await ae.reviewEmail.fill(identity.email);
  await ae.reviewText.fill('Synthetic automation practice review.');
  await ae.reviewSubmit.click();
}

/** Continue a reviewed order to the practice payment form. */
export async function placeOrder(page: Page): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await ae.orderComment.fill('Synthetic practice order');
  await ae.placeOrder.click();
}

/** Confirm a practice purchase with clearly synthetic, non-payment card data. */
export async function payForOrder(page: Page, identity: DemoIdentity): Promise<void> {
  const ae = new AutomationExercisePage(page);
  await ae.nameOnCard.fill(identity.name);
  await ae.cardNumber.fill('0000000000000000');
  await ae.cvc.fill('000');
  await ae.expiryMonth.fill('12');
  await ae.expiryYear.fill('2030');
  await ae.payButton.click();
}

/** Download the invoice after the practice order is confirmed. */
export async function downloadInvoice(page: Page) {
  const pending = page.waitForEvent('download');
  await new AutomationExercisePage(page).downloadInvoice.click();
  const download = await pending;
  const stream = await download.createReadStream();
  if (!stream) throw new Error('The practice invoice did not produce a download.');
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  return {
    filename: download.suggestedFilename(),
    content: Buffer.concat(chunks).toString('utf8'),
    failure: await download.failure(),
  };
}
