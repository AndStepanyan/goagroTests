import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class WorkTasksPage extends BasePage {

  readonly title: Locator;
  readonly filtersButton: Locator;
  readonly addButton: Locator;
  readonly searchInput: Locator;
  readonly table: Locator;
  readonly rows: Locator;
  readonly columnHeaders: Locator;

  constructor(page: Page) {
    super(page);

    this.title = page.locator('.custom_header').getByText('Задачи', { exact: true });
    this.searchInput = page.getByRole('searchbox', { name: 'Поиск' });
    this.filtersButton = page.getByRole('button', { name: 'Фильтры' });
    this.addButton = page.getByRole('button', { name: 'Добавить' });
    this.table = page.getByRole('table');
    this.rows = page.locator('datatable-body-row');
    this.columnHeaders = page.getByRole('columnheader');
  }

  async open() {
    await this.page.goto('/workTask');
  }
}