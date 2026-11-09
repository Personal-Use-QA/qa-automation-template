import type { APIRequestContext, APIResponse } from '@playwright/test';

/** Request map for the public practice API; application codes live inside HTTP 200 responses. */
export class AutomationExerciseClient {
  constructor(private readonly request: APIRequestContext) {}

  productsList(method: 'GET' | 'POST' = 'GET'): Promise<APIResponse> {
    return this.request.fetch('/api/productsList', { method });
  }
  brandsList(method: 'GET' | 'PUT' = 'GET'): Promise<APIResponse> {
    return this.request.fetch('/api/brandsList', { method });
  }
  searchProduct(term?: string): Promise<APIResponse> {
    return this.request.post('/api/searchProduct', {
      form: term === undefined ? {} : { search_product: term },
    });
  }
  verifyLogin(
    form: Record<string, string>,
    method: 'POST' | 'DELETE' = 'POST',
  ): Promise<APIResponse> {
    return this.request.fetch('/api/verifyLogin', { method, form });
  }
  createAccount(form: Record<string, string>): Promise<APIResponse> {
    return this.request.post('/api/createAccount', { form });
  }
  deleteAccount(form: Record<string, string>): Promise<APIResponse> {
    return this.request.delete('/api/deleteAccount', { form });
  }
  updateAccount(form: Record<string, string>): Promise<APIResponse> {
    return this.request.put('/api/updateAccount', { form });
  }
  userDetail(email: string): Promise<APIResponse> {
    return this.request.get('/api/getUserDetailByEmail', { params: { email } });
  }
}
