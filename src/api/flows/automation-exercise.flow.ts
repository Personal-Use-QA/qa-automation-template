import type { APIRequestContext, APIResponse } from '@playwright/test';
import { AutomationExerciseClient } from '../clients/automation-exercise.client';
import type { DemoIdentity } from '../../fixtures/credentials';

/** Read the public catalogue using its documented request method. */
export function readProducts(
  request: APIRequestContext,
  method: 'GET' | 'POST' = 'GET',
): Promise<APIResponse> {
  return new AutomationExerciseClient(request).productsList(method);
}

/** Read the public brands using its documented request method. */
export function readBrands(
  request: APIRequestContext,
  method: 'GET' | 'PUT' = 'GET',
): Promise<APIResponse> {
  return new AutomationExerciseClient(request).brandsList(method);
}

/** Find catalogue products for a customer's search term. */
export function searchProducts(request: APIRequestContext, term?: string): Promise<APIResponse> {
  return new AutomationExerciseClient(request).searchProduct(term);
}

/** Check whether the supplied customer credentials identify an account. */
export function verifyCustomer(
  request: APIRequestContext,
  form: Record<string, string>,
  method: 'POST' | 'DELETE' = 'POST',
): Promise<APIResponse> {
  return new AutomationExerciseClient(request).verifyLogin(form, method);
}

/** Create only the disposable customer owned by the current case. */
export function createDisposableAccount(
  request: APIRequestContext,
  identity: DemoIdentity,
): Promise<APIResponse> {
  const { role, ...form } = identity;
  void role;
  return new AutomationExerciseClient(request).createAccount(form);
}

/** Delete only the disposable customer owned by the current case. */
export function deleteDisposableAccount(
  request: APIRequestContext,
  identity: DemoIdentity,
): Promise<APIResponse> {
  return new AutomationExerciseClient(request).deleteAccount({
    email: identity.email,
    password: identity.password,
  });
}

/** Remove a disposable account even after a failing UI or API assertion. */
export async function cleanupDisposableAccount(
  request: APIRequestContext,
  identity: DemoIdentity,
): Promise<void> {
  const response = await deleteDisposableAccount(request, identity);
  const body: { responseCode?: number } = await response.json();
  if (response.status() !== 200 || ![200, 404].includes(body.responseCode ?? 0)) {
    throw new Error('Disposable account cleanup failed; no customer details are logged.');
  }
}

/** Change only the account created by the current case. */
export function updateDisposableAccount(
  request: APIRequestContext,
  identity: DemoIdentity,
): Promise<APIResponse> {
  const { role, ...form } = identity;
  void role;
  return new AutomationExerciseClient(request).updateAccount(form);
}

/** Retrieve only the account created by the current case. */
export function readDisposableAccount(
  request: APIRequestContext,
  identity: DemoIdentity,
): Promise<APIResponse> {
  return new AutomationExerciseClient(request).userDetail(identity.email);
}
