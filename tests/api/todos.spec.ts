import { test, expect } from '../../src/api/fixtures/api.fixture';
import { fetchTodo, fetchTodos } from '../../src/api/flows/todos.flow';
import { AS_NO_LOGIN } from '../../src/fixtures/credentials';

test.describe('Todos API', { tag: ['@todos-api', AS_NO_LOGIN] }, () => {
  test(
    'TC01 - Positive - Read - GET /todos/{id} - Returns todo shape',
    { tag: '@sanity' },
    async ({ request }) => {
      const response = await fetchTodo(request, 1);
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({
        userId: expect.any(Number),
        id: expect.any(Number),
        title: expect.any(String),
        completed: expect.any(Boolean),
      });
    },
  );
  test(
    'TC02 - Positive - Read - GET /todos - Returns non-empty list',
    { tag: '@regression' },
    async ({ request }) => {
      const response = await fetchTodos(request);
      expect(response.status()).toBe(200);
      const todos: unknown[] = await response.json();
      expect(todos.length).toBeGreaterThanOrEqual(1);
    },
  );
  test(
    'TC03 - Negative - Read - GET /todos/{id} - Unknown id returns 404',
    { tag: '@regression' },
    async ({ request }) => {
      const response = await fetchTodo(request, 0);
      expect(response.status()).toBe(404);
    },
  );
});
