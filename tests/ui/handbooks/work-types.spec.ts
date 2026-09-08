import { test, expect } from '@playwright/test';
import { WorkTypesPage } from '../../../pages/work-types.page';

const expectedColumns = [
  'Наименование',
  'Тип работы',
  'Группа работ',
  'Единицы изм',
  'Цвет',
  'Дата создания',
  'Дата изменения',
];

test.describe('Виды работ', () => {
  test('страница загружается с основными элементами', async ({
    page,
  }) => {
    const workTypesPage = new WorkTypesPage(page);

    await workTypesPage.open();

    await expect(page).toHaveURL(/\/handbooks\/workType$/);
    await expect(workTypesPage.root).toBeVisible();

    await expect(
      workTypesPage.toolbar.sectionName,
    ).toBeVisible();

    await expect(
      workTypesPage.toolbar.pageTitle('Виды Работ'),
    ).toBeVisible();

    await expect(
      workTypesPage.toolbar.searchInput,
    ).toBeVisible();

    await expect(
      workTypesPage.toolbar.filtersButton,
    ).toBeVisible();

    await expect(
      workTypesPage.toolbar.columnSettingsButton,
    ).toBeVisible();

    await expect(workTypesPage.addButton).toBeVisible();
    await expect(workTypesPage.table).toBeVisible();

    for (const columnName of expectedColumns) {
      await expect(
        workTypesPage.columnHeaders.filter({
          hasText: columnName,
        }),
      ).toBeVisible();
    }

    await expect(workTypesPage.pagination).toBeVisible();
    await expect(workTypesPage.totalInfo).toHaveText(
      /Всего:\s*\d+/,
    );
  });
});