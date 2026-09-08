import { Locator } from '@playwright/test';

export class ListPageToolbarComponent {
  readonly root: Locator;
  readonly breadcrumb: Locator;
  readonly sectionName: Locator;

  readonly searchInput: Locator;
  readonly filtersButton: Locator;
  readonly columnSettingsButton: Locator;

  constructor(pageRoot: Locator) {
    this.root = pageRoot.locator(
      ':scope > .custom_header > .left_side',
    );

    this.breadcrumb = this.root.locator('app-breadcrumb');

    this.sectionName = this.breadcrumb.getByText(
      'Справочники',
      { exact: true },
    );

    this.searchInput = this.root.getByPlaceholder('Поиск', {
      exact: true,
    });

    this.filtersButton = this.root.getByRole('button', {
      name: 'Фильтры',
      exact: true,
    });

    this.columnSettingsButton = this.root
      .locator('.left_side_actions button.btn-filter')
      .filter({ hasNotText: 'Фильтры' });
  }

  pageTitle(title: string): Locator {
    return this.breadcrumb.getByText(title, {
      exact: true,
    });
  }

  async search(value: string) {
    await this.searchInput.fill(value);
  }

  async openFilters() {
    await this.filtersButton.click();
  }

  async openColumnSettings() {
    await this.columnSettingsButton.click();
  }
}