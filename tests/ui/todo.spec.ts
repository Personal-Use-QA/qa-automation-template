import { test, expect } from '../../src/ui/fixtures/ui.fixture';
import { addTodo, completeAllTodos, openTodoApp } from '../../src/ui/flows/todo.flow';
import { AS_NO_LOGIN } from '../../src/fixtures/credentials';

test.describe('Todo', { tag: ['@todo', AS_NO_LOGIN] }, () => {
  test.beforeEach(async ({ page }) => {
    await openTodoApp(page);
  });
  test(
    'Todo.TC01 - Positive Scenario - Page renders new-todo input',
    { tag: '@sanity' },
    async ({ todoPage }) => {
      await expect(todoPage.newTodoInput).toBeVisible();
    },
  );
  test(
    'Todo.TC02 - Positive Scenario - Added todo appears in list',
    { tag: '@sanity' },
    async ({ page, todoPage }) => {
      await addTodo(page, 'Review the case document');
      await expect(todoPage.todoTitles).toHaveText(['Review the case document']);
    },
  );
  test(
    'Todo.TC03 - Positive Scenario - Complete all marks every todo',
    { tag: '@regression' },
    async ({ page, todoPage }) => {
      await addTodo(page, 'Design the case');
      await addTodo(page, 'Verify the case');
      await completeAllTodos(page);
      await expect(todoPage.todoItems).toHaveClass([/completed/, /completed/]);
      await expect(todoPage.todoCount).toHaveText('0 items left');
    },
  );
  test(
    'Todo.TC04 - Negative Scenario - Blank title adds no todo',
    { tag: '@regression' },
    async ({ page, todoPage }) => {
      await addTodo(page, '   ');
      await expect(todoPage.todoItems).toHaveCount(0);
    },
  );
});
