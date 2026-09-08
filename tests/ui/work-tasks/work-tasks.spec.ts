import { test, expect } from '@playwright/test';
import { WorkTasksPage } from '../../../pages/work-tasks.page';

test.describe('Work Tasks', () => {
  test('User can open Work Tasks page', async ({ page }) => {
    const workTasksPage = new WorkTasksPage(page);

    await workTasksPage.open();

    await expect(page).toHaveURL(/\/workTask$/);
    await expect(workTasksPage.title).toBeVisible();
    await expect(workTasksPage.searchInput).toBeVisible();
    await expect(workTasksPage.filtersButton).toBeVisible();
    await expect(workTasksPage.addButton).toBeVisible();
  });

  test('should display work tasks table', async ({ page }) => {
    const workTasksPage = new WorkTasksPage(page);
    await workTasksPage.open();

    await expect(workTasksPage.table).toBeVisible();
    await expect(workTasksPage.rows.first()).toBeVisible();
    await expect(workTasksPage.columnHeaders).toContainText([
      'Номер',
      'Тип задачи',
      'Сезон',
      'Вид работы',
      'Период выполнения',
      'Геозоны',
      'Техника',
      'Агрегаты',
      'План/Факт',
      'Статус',
    ]);
  });

  test('User can open new task page', async ({ page }) => {
    const workTasksPage = new WorkTasksPage(page);
    await workTasksPage.open();
    await workTasksPage.addButton.click();

    await expect(page).toHaveURL(/\/workTask\/new$/);
  });
});
