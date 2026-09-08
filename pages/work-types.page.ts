import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ListPageToolbarComponent } from '../components/list-page-toolbar.component';

export class WorkTypesPage extends BasePage {
  readonly root: Locator;
  readonly toolbar: ListPageToolbarComponent;

  readonly addButton: Locator;

  readonly table: Locator;
  readonly columnHeaders: Locator;
  readonly rows: Locator;

  readonly pagination: Locator;
  readonly totalInfo: Locator;

  constructor(page: Page) {
    super(page);

    this.root = page.locator('app-types-of-work');

    this.toolbar = new ListPageToolbarComponent(this.root);

    this.addButton = this.root
      .locator(':scope > .custom_header > .right_side')
      .getByRole('button', {
        name: 'Добавить',
        exact: true,
      });

    this.table = this.root
      .locator('app-data-table')
      .getByRole('table');

    this.columnHeaders =
      this.table.getByRole('columnheader');

    this.rows =
      this.table.locator('datatable-body-row');

    this.pagination =
      this.root.locator('app-custom-pager .pager-wrapper');

    this.totalInfo =
      this.pagination.locator('.total-info');
  }

  async open() {
    await this.page.goto('/handbooks/workType');
  }
}