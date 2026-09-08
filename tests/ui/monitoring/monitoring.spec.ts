import { test, expect } from '@playwright/test';
import { MonitoringPage } from '../../../pages/monitoring.page';

test.describe('Monitoring page', () => {
  test('loads main monitoring elements', async ({ page }) => {
    const monitoringPage = new MonitoringPage(page);

    await monitoringPage.open();

    await expect(page).toHaveURL(/\/monitoring$/);

    await expect(monitoringPage.root).toBeVisible();
    await expect(monitoringPage.header).toBeVisible();
    await expect(monitoringPage.logo).toBeVisible();
    await expect(monitoringPage.monitoringLink).toBeVisible();

    await expect(monitoringPage.searchInput).toBeVisible();
    await expect(monitoringPage.vehicleTab).toBeVisible();
    await expect(monitoringPage.geoZonesTab).toBeVisible();

    await expect(monitoringPage.map).toBeVisible();
    await expect(monitoringPage.statisticsPanel).toBeVisible();
    //await expect(monitoringPage.chart).toBeVisible(); // TODO: вернуть проверку chart,  когда тестовому пользователю добавят технику.
  });
});