import { test, expect } from '../../../src/api/fixtures/automation-exercise.fixture';
import {
  createDisposableAccount,
  deleteDisposableAccount,
  readBrands,
  readDisposableAccount,
  readProducts,
  searchProducts,
  updateDisposableAccount,
  verifyCustomer,
} from '../../../src/api/flows/automation-exercise.flow';
import { AS_NO_LOGIN, asTag, DEMO_ROLE } from '../../../src/fixtures/credentials';

test.describe('Automation Exercise API', { tag: ['@ae-api', '@regression'] }, () => {
  test(
    'TC01 - Positive - Catalog - GET /api/productsList - Return product shapes',
    { tag: [AS_NO_LOGIN, '@high'] },
    async ({ request }) => {
      const response = await readProducts(request);
      const body = await response.json();
      expect(response.status()).toBe(200);
      expect(body.responseCode).toBe(200);
      expect(body.products).toEqual(expect.any(Array));
      expect(body.products.length).toBeGreaterThan(0);
      for (const product of body.products) {
        expect(product).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(String),
            brand: expect.any(String),
            category: expect.objectContaining({
              category: expect.any(String),
              usertype: expect.objectContaining({ usertype: expect.any(String) }),
            }),
          }),
        );
      }
    },
  );
  test(
    'TC02 - Negative - Catalog - POST /api/productsList - Reject unsupported method',
    { tag: [AS_NO_LOGIN, '@med'] },
    async ({ request }) => {
      const response = await readProducts(request, 'POST');
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({
        responseCode: 405,
        message: 'This request method is not supported.',
      });
    },
  );
  test(
    'TC03 - Positive - Catalog - GET /api/brandsList - Return brand shapes',
    { tag: [AS_NO_LOGIN, '@med'] },
    async ({ request }) => {
      const response = await readBrands(request);
      const body = await response.json();
      expect(response.status()).toBe(200);
      expect(body.responseCode).toBe(200);
      expect(body.brands).toEqual(expect.any(Array));
      expect(body.brands.length).toBeGreaterThan(0);
      for (const brand of body.brands) {
        expect(brand).toEqual(
          expect.objectContaining({ id: expect.any(Number), brand: expect.any(String) }),
        );
      }
    },
  );
  test(
    'TC04 - Negative - Catalog - PUT /api/brandsList - Reject unsupported method',
    { tag: [AS_NO_LOGIN, '@med'] },
    async ({ request }) => {
      const response = await readBrands(request, 'PUT');
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({
        responseCode: 405,
        message: 'This request method is not supported.',
      });
    },
  );
  test(
    'TC05 - Positive - Catalog - POST /api/searchProduct - Return matching products',
    { tag: [AS_NO_LOGIN, '@high'] },
    async ({ request }) => {
      const response = await searchProducts(request, 'Men Tshirt');
      const body = await response.json();
      expect(response.status()).toBe(200);
      expect(body.responseCode).toBe(200);
      expect(body.products).toEqual(expect.any(Array));
      expect(body.products.length).toBeGreaterThan(0);
      for (const product of body.products) {
        expect(product).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(String),
            brand: expect.any(String),
            category: expect.any(Object),
          }),
        );
        expect(product.name.toLowerCase()).toContain('men tshirt');
      }
    },
  );
  test(
    'TC06 - Negative - Catalog - POST /api/searchProduct - Reject a missing search term',
    { tag: [AS_NO_LOGIN, '@med'] },
    async ({ request }) => {
      const response = await searchProducts(request);
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({
        responseCode: 400,
        message: 'Bad request, search_product parameter is missing in POST request.',
      });
    },
  );
  test(
    'TC07 - Positive - Account - POST /api/verifyLogin - Accept a disposable account',
    { tag: [asTag(DEMO_ROLE), '@high', '@journey'] },
    async ({ request, account }) => {
      const response = await verifyCustomer(request, {
        email: account.email,
        password: account.password,
      });
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({ responseCode: 200, message: 'User exists!' });
    },
  );
  test(
    'TC08 - Negative - Account - POST /api/verifyLogin - Reject a missing email',
    { tag: [AS_NO_LOGIN, '@high'] },
    async ({ request, nonexistentIdentity }) => {
      const response = await verifyCustomer(request, { password: nonexistentIdentity.password });
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({
        responseCode: 400,
        message: 'Bad request, email or password parameter is missing in POST request.',
      });
    },
  );
  test(
    'TC09 - Negative - Account - DELETE /api/verifyLogin - Reject unsupported method',
    { tag: [AS_NO_LOGIN, '@med'] },
    async ({ request }) => {
      const response = await verifyCustomer(request, {}, 'DELETE');
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({
        responseCode: 405,
        message: 'This request method is not supported.',
      });
    },
  );
  test(
    'TC10 - Negative - Account - POST /api/verifyLogin - Reject unknown credentials',
    { tag: [AS_NO_LOGIN, '@high'] },
    async ({ request, nonexistentIdentity }) => {
      const response = await verifyCustomer(request, {
        email: nonexistentIdentity.email,
        password: nonexistentIdentity.password,
      });
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({ responseCode: 404, message: 'User not found!' });
    },
  );
  test(
    'TC11 - Positive - Account - POST /api/createAccount - Create a disposable account',
    { tag: [AS_NO_LOGIN, '@high', '@journey'] },
    async ({ request, identity }) => {
      const response = await createDisposableAccount(request, identity);
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({ responseCode: 201, message: 'User created!' });
      const detail = await readDisposableAccount(request, identity);
      const body = await detail.json();
      expect(detail.status()).toBe(200);
      expect(body.responseCode).toBe(200);
      expect(body.user.email === identity.email).toBe(true);
      expect(body.user.name).toBe(identity.name);
      expect(body.user.address1).toBe(identity.address1);
    },
  );
  test(
    'TC12 - Positive - Account - DELETE /api/deleteAccount - Delete a disposable account',
    { tag: [AS_NO_LOGIN, '@high', '@journey'] },
    async ({ request, account }) => {
      const response = await deleteDisposableAccount(request, account);
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({ responseCode: 200, message: 'Account deleted!' });
      const verification = await verifyCustomer(request, {
        email: account.email,
        password: account.password,
      });
      expect(verification.status()).toBe(200);
      expect(await verification.json()).toEqual({ responseCode: 404, message: 'User not found!' });
    },
  );
  test(
    'TC13 - Positive - Account - PUT /api/updateAccount - Update a disposable account',
    { tag: [AS_NO_LOGIN, '@high', '@journey'] },
    async ({ request, account }) => {
      const changed = {
        ...account,
        company: 'Updated Example Company',
        city: 'Updated Example City',
      };
      const response = await updateDisposableAccount(request, changed);
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({ responseCode: 200, message: 'User updated!' });
      const detail = await readDisposableAccount(request, account);
      const body = await detail.json();
      expect(detail.status()).toBe(200);
      expect(body.responseCode).toBe(200);
      expect(body.user.email === account.email).toBe(true);
      expect(body.user.company).toBe(changed.company);
      expect(body.user.city).toBe(changed.city);
    },
  );
  test(
    'TC14 - Positive - Account - GET /api/getUserDetailByEmail - Return the created account',
    { tag: [AS_NO_LOGIN, '@high', '@journey'] },
    async ({ request, account }) => {
      const response = await readDisposableAccount(request, account);
      const body = await response.json();
      expect(response.status()).toBe(200);
      expect(body.responseCode).toBe(200);
      expect(body.user).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          email: expect.any(String),
          first_name: expect.any(String),
          last_name: expect.any(String),
          country: expect.any(String),
          address1: expect.any(String),
        }),
      );
      expect(body.user.email === account.email).toBe(true);
      expect(body.user.first_name).toBe(account.firstname);
      expect(body.user.last_name).toBe(account.lastname);
      expect(body.user.address1).toBe(account.address1);
      expect(body.user.country).toBe(account.country);
    },
  );
});
