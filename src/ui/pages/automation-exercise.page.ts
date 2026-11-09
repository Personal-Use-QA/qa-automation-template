import type { Locator, Page } from '@playwright/test';

export class AutomationExercisePage {
  static readonly PATH = '/';
  // --- navigation ---
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly testCasesLink: Locator;
  readonly apiLink: Locator;
  readonly contactLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loggedIn: Locator;
  readonly referenceHeading: Locator;
  readonly apiHeading: Locator;
  readonly referenceScenarios: Locator;
  readonly apiEndpoints: Locator;
  // --- home ---
  readonly hero: Locator;
  readonly subscriptionHeading: Locator;
  readonly subscriptionEmail: Locator;
  readonly subscribeButton: Locator;
  readonly subscriptionSuccess: Locator;
  readonly scrollUp: Locator;
  readonly recommendedAdd: Locator;
  // --- catalog ---
  readonly allProductsHeading: Locator;
  readonly searchedHeading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;
  readonly productOneLink: Locator;
  readonly productTwoLink: Locator;
  readonly womenCategory: Locator;
  readonly womenDress: Locator;
  readonly menCategory: Locator;
  readonly menTshirts: Locator;
  readonly poloBrand: Locator;
  readonly madameBrand: Locator;
  readonly categoryHeading: Locator;
  readonly brandHeading: Locator;
  readonly detailName: Locator;
  readonly detailCategory: Locator;
  readonly detailPrice: Locator;
  readonly detailAvailability: Locator;
  readonly detailCondition: Locator;
  readonly detailBrand: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly addedModal: Locator;
  readonly continueShopping: Locator;
  readonly viewCartModal: Locator;
  readonly reviewName: Locator;
  readonly reviewEmail: Locator;
  readonly reviewText: Locator;
  readonly reviewSubmit: Locator;
  readonly reviewSuccess: Locator;
  // --- cart ---
  readonly cartRows: Locator;
  readonly cartOne: Locator;
  readonly cartTwo: Locator;
  readonly cartOnePrice: Locator;
  readonly cartOneQuantity: Locator;
  readonly cartOneTotal: Locator;
  readonly cartTwoPrice: Locator;
  readonly cartTwoQuantity: Locator;
  readonly cartTwoTotal: Locator;
  readonly removeOne: Locator;
  readonly emptyCart: Locator;
  readonly checkoutButton: Locator;
  readonly registerLoginModal: Locator;
  // --- account ---
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly loginError: Locator;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly signupError: Locator;
  readonly accountInfoHeading: Locator;
  readonly titleMr: Locator;
  readonly password: Locator;
  readonly days: Locator;
  readonly months: Locator;
  readonly years: Locator;
  readonly newsletter: Locator;
  readonly offers: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;
  readonly address1: Locator;
  readonly address2: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobile: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreated: Locator;
  readonly continueButton: Locator;
  readonly accountDeleted: Locator;
  // --- contact ---
  readonly contactName: Locator;
  readonly contactEmail: Locator;
  readonly contactSubject: Locator;
  readonly contactMessage: Locator;
  readonly contactUpload: Locator;
  readonly contactSubmit: Locator;
  readonly contactSuccess: Locator;
  readonly contactHome: Locator;
  // --- checkout ---
  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;
  readonly checkoutOrder: Locator;
  readonly orderComment: Locator;
  readonly placeOrder: Locator;
  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly cvc: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly payButton: Locator;
  readonly orderPlaced: Locator;
  readonly downloadInvoice: Locator;

  constructor(page: Page) {
    // Reason: catalog cards, prices and icon buttons lack semantic labels; stable site IDs and containers scope them.
    // --- navigation ---
    this.homeLink = page.getByRole('banner').getByRole('link', { name: /Home/ });
    this.productsLink = page.getByRole('banner').getByRole('link', { name: /Products/ });
    this.cartLink = page.getByRole('banner').getByRole('link', { name: /Cart/ });
    this.loginLink = page.getByRole('link', { name: /Signup \/ Login/ });
    this.testCasesLink = page.getByRole('banner').getByRole('link', { name: /Test Cases/ });
    this.apiLink = page.getByRole('banner').getByRole('link', { name: /API Testing/ });
    this.contactLink = page.getByRole('link', { name: /Contact us/ });
    this.logoutLink = page.getByRole('link', { name: /Logout/ });
    this.deleteAccountLink = page.getByRole('link', { name: /Delete Account/ });
    this.loggedIn = page.getByText('Logged in as');
    this.referenceHeading = page.getByRole('heading', { name: 'Test Cases', exact: true });
    this.apiHeading = page.getByRole('heading', { name: 'APIs List for practice', exact: true });
    this.referenceScenarios = page.getByRole('link', { name: /^Test Case \d+:/ });
    this.apiEndpoints = page.getByRole('link', { name: /^API \d+:/ });
    // --- home ---
    // Reason: the carousel repeats this heading; its active slide supplies a unique business target.
    this.hero = page
      .locator('#slider-carousel .item.active')
      .getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' })
      .filter({ visible: true });
    this.subscriptionHeading = page.getByRole('heading', { name: 'Subscription', exact: true });
    this.subscriptionEmail = page.getByPlaceholder('Your email address', { exact: true });
    this.subscribeButton = page.locator('#subscribe');
    this.subscriptionSuccess = page.getByText('You have been successfully subscribed!', {
      exact: true,
    });
    this.scrollUp = page.locator('#scrollUp');
    this.recommendedAdd = page.locator('#recommended-item-carousel [data-product-id="1"]');
    // --- catalog ---
    this.allProductsHeading = page.getByRole('heading', { name: 'All Products', exact: true });
    this.searchedHeading = page.getByRole('heading', { name: 'Searched Products', exact: true });
    this.searchInput = page.getByPlaceholder('Search Product', { exact: true });
    this.searchButton = page.locator('#submit_search');
    this.productNames = page.locator('.features_items .productinfo p');
    this.productOneLink = page
      .locator('.features_items')
      .getByRole('link', { name: /View Product/ })
      .and(page.locator('[href="/product_details/1"]'));
    this.productTwoLink = page
      .locator('.features_items')
      .getByRole('link', { name: /View Product/ })
      .and(page.locator('[href="/product_details/2"]'));
    this.womenCategory = page.getByRole('link', { name: /Women$/ });
    this.womenDress = page.locator('#Women').getByRole('link', { name: 'Dress', exact: true });
    this.menCategory = page.getByRole('link', { name: /Men$/ });
    this.menTshirts = page.locator('#Men').getByRole('link', { name: 'Tshirts', exact: true });
    this.poloBrand = page.getByRole('link', { name: /Polo/ });
    this.madameBrand = page.getByRole('link', { name: /Madame/ });
    this.categoryHeading = page.getByRole('heading', {
      name: /(?:Women - Dress|Men - Tshirts) Products/i,
    });
    this.brandHeading = page.getByRole('heading', { name: /Brand - (?:Polo|Madame) Products/i });
    this.detailName = page.locator('.product-information').getByRole('heading', { level: 2 });
    this.detailCategory = page.getByText(/^Category:/);
    this.detailPrice = page.locator('.product-information').getByText(/^Rs\./);
    this.detailAvailability = page.getByRole('paragraph').filter({ hasText: /^Availability:/ });
    this.detailCondition = page.getByRole('paragraph').filter({ hasText: /^Condition:/ });
    this.detailBrand = page.getByRole('paragraph').filter({ hasText: /^Brand:/ });
    this.quantityInput = page.getByRole('spinbutton');
    this.addToCartButton = page.getByRole('button', { name: /Add to cart/i });
    this.addedModal = page.getByRole('heading', { name: 'Added!', exact: true });
    this.continueShopping = page.getByRole('button', { name: 'Continue Shopping', exact: true });
    this.viewCartModal = page.getByRole('link', { name: 'View Cart', exact: true });
    this.reviewName = page.getByPlaceholder('Your Name', { exact: true });
    this.reviewEmail = page.getByPlaceholder('Email Address', { exact: true });
    this.reviewText = page.getByPlaceholder('Add Review Here!', { exact: true });
    this.reviewSubmit = page.getByRole('button', { name: 'Submit', exact: true });
    this.reviewSuccess = page.getByText('Thank you for your review.', { exact: true });
    // --- cart ---
    this.cartRows = page.locator('#cart_info_table tbody tr[id^="product-"]');
    this.cartOne = page.locator('#product-1');
    this.cartTwo = page.locator('#product-2');
    this.cartOnePrice = this.cartOne.locator('.cart_price p');
    this.cartOneQuantity = this.cartOne.getByRole('button');
    this.cartOneTotal = this.cartOne.locator('.cart_total_price');
    this.cartTwoPrice = this.cartTwo.locator('.cart_price p');
    this.cartTwoQuantity = this.cartTwo.getByRole('button');
    this.cartTwoTotal = this.cartTwo.locator('.cart_total_price');
    this.removeOne = this.cartOne.locator('[data-product-id="1"]');
    this.emptyCart = page.getByText('Cart is empty!', { exact: false });
    this.checkoutButton = page.getByText('Proceed To Checkout', { exact: true });
    this.registerLoginModal = page.getByRole('link', { name: 'Register / Login', exact: true });
    // --- account ---
    this.loginEmail = page.getByTestId('login-email');
    this.loginPassword = page.getByTestId('login-password');
    this.loginButton = page.getByTestId('login-button');
    this.loginError = page.getByText('Your email or password is incorrect!', { exact: true });
    this.signupName = page.getByTestId('signup-name');
    this.signupEmail = page.getByTestId('signup-email');
    this.signupButton = page.getByTestId('signup-button');
    this.signupError = page.getByText('Email Address already exist!', { exact: true });
    this.accountInfoHeading = page.getByText('Enter Account Information', { exact: true });
    this.titleMr = page.getByLabel('Mr.', { exact: true });
    this.password = page.getByTestId('password');
    this.days = page.getByTestId('days');
    this.months = page.getByTestId('months');
    this.years = page.getByTestId('years');
    this.newsletter = page.getByLabel('Sign up for our newsletter!', { exact: true });
    this.offers = page.getByLabel('Receive special offers from our partners!', { exact: true });
    this.firstName = page.getByTestId('first_name');
    this.lastName = page.getByTestId('last_name');
    this.company = page.getByTestId('company');
    this.address1 = page.getByTestId('address');
    this.address2 = page.getByTestId('address2');
    this.country = page.getByTestId('country');
    this.state = page.getByTestId('state');
    this.city = page.getByTestId('city');
    this.zipcode = page.getByTestId('zipcode');
    this.mobile = page.getByTestId('mobile_number');
    this.createAccountButton = page.getByTestId('create-account');
    this.accountCreated = page.getByTestId('account-created');
    this.continueButton = page.getByTestId('continue-button');
    this.accountDeleted = page.getByTestId('account-deleted');
    // --- contact ---
    this.contactName = page.getByTestId('name');
    this.contactEmail = page.getByTestId('email');
    this.contactSubject = page.getByTestId('subject');
    this.contactMessage = page.getByTestId('message');
    this.contactUpload = page.locator('input[name="upload_file"]');
    this.contactSubmit = page.getByTestId('submit-button');
    this.contactSuccess = page
      .getByText('Success! Your details have been submitted successfully.', { exact: true })
      .filter({ visible: true });
    this.contactHome = page.locator('#form-section').getByRole('link', { name: /Home$/ });
    // --- checkout ---
    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
    this.checkoutOrder = page.getByRole('heading', { name: 'Review Your Order', exact: true });
    this.orderComment = page.locator('textarea[name="message"]');
    this.placeOrder = page.getByRole('link', { name: 'Place Order', exact: true });
    this.nameOnCard = page.getByTestId('name-on-card');
    this.cardNumber = page.getByTestId('card-number');
    this.cvc = page.getByTestId('cvc');
    this.expiryMonth = page.getByTestId('expiry-month');
    this.expiryYear = page.getByTestId('expiry-year');
    this.payButton = page.getByTestId('pay-button');
    this.orderPlaced = page.getByText('Congratulations! Your order has been confirmed!', {
      exact: true,
    });
    this.downloadInvoice = page.getByRole('link', { name: 'Download Invoice', exact: true });
  }
}
