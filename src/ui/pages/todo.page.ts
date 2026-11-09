import type { Locator, Page } from '@playwright/test';

export class TodoPage {
  static readonly PATH = '/todomvc';
  // --- input ---
  readonly newTodoInput: Locator;
  // --- list ---
  readonly todoItems: Locator;
  readonly todoTitles: Locator;
  readonly toggleAll: Locator;
  readonly todoCount: Locator;
  constructor(page: Page) {
    // Reason: the demo input has no test ID; its placeholder is the stable user-facing label.
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoTitles = page.getByTestId('todo-title');
    this.toggleAll = page.getByLabel('Mark all as complete');
    this.todoCount = page.getByTestId('todo-count');
  }
}
