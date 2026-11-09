import { test as base } from '@playwright/test';
import { TodosClient } from '../clients/todos.client';

export const test = base.extend<{ todosClient: TodosClient }>({
  todosClient: async ({ request }, use) => {
    await use(new TodosClient(request));
  },
});
export { expect } from '@playwright/test';
