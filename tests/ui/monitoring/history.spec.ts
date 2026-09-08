import { test, expect } from '@playwright/test';
import { MonitoringHistoryPage } from '../../../pages/monitoring-history.page';

test.describe('История', () => {
  test('Пользователь видит историю', async ({ page }) => {
    const historyPage = new MonitoringHistoryPage(page);
    await historyPage.open();

    await expect(page).toHaveURL(/\/monitoringHistory/);
  });
});
