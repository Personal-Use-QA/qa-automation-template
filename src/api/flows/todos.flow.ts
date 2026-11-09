import type { APIRequestContext, APIResponse } from '@playwright/test';
import { TodosClient } from '../clients/todos.client';

/** Read one todo without mixing assertions into the request action. */
export function fetchTodo(request: APIRequestContext, id: number): Promise<APIResponse> {
  return new TodosClient(request).getOne(id);
}
/** Read the available todo collection. */
export function fetchTodos(request: APIRequestContext): Promise<APIResponse> {
  return new TodosClient(request).getAll();
}
