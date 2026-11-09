import type { APIRequestContext, APIResponse } from '@playwright/test';

export const TODOS_PATH = '/todos';
/** Keep route construction out of business flows. */
export const todoPath = (id: number): string => TODOS_PATH + '/' + id;
export class TodosClient {
  constructor(private readonly request: APIRequestContext) {}
  /** Build a read request for one todo. */
  getOne(id: number): Promise<APIResponse> {
    return this.request.get(todoPath(id));
  }
  /** Build a read request for all todos. */
  getAll(): Promise<APIResponse> {
    return this.request.get(TODOS_PATH);
  }
}
