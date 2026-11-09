import type { Page } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';

/** Start a fresh todo list in the current isolated browser context. */
export async function openTodoApp(page: Page): Promise<void> {
  await page.goto(TodoPage.PATH);
}
/** Submit one title through the same input a user uses. */
export async function addTodo(page: Page, title: string): Promise<void> {
  const todo = new TodoPage(page);
  await todo.newTodoInput.fill(title);
  await todo.newTodoInput.press('Enter');
}
/** Mark every current todo complete in one business action. */
export async function completeAllTodos(page: Page): Promise<void> {
  await new TodoPage(page).toggleAll.check();
}
