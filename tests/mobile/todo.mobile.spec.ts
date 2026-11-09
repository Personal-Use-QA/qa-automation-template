import { test, expect } from '../../src/ui/fixtures/ui.fixture';
import { addTodo, openTodoApp } from '../../src/ui/flows/todo.flow';
import { AS_NO_LOGIN } from '../../src/fixtures/credentials';

test.describe('Todo mobile', { tag: ['@todo-mobile', AS_NO_LOGIN] }, () => {
  test.beforeEach(async ({ page }) => {
    await openTodoApp(page);
  });
  test(
    'Todo.MTC01 - Positive Scenario - Input usable at phone width',
    { tag: '@sanity' },
    async ({ page, todoPage }) => {
      await expect(todoPage.newTodoInput).toBeEditable();
      await addTodo(page, 'Use the phone input');
      await expect(todoPage.todoTitles).toHaveText(['Use the phone input']);
    },
  );
});
