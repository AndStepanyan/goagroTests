import { test, expect } from '@playwright/test';
import { HeaderComponent } from '../../../components/header.component';
import { MonitoringPage } from '../../../pages/monitoring.page';

test.describe('Header', () => {
  test('displays main header elements', async ({ page }) => {
    const monitoringPage = new MonitoringPage(page);
    const header = new HeaderComponent(page);

    await monitoringPage.open();

    await expect(header.root).toBeVisible();
    await expect(header.logoLink).toBeVisible();

    await expect(header.monitoringLink).toBeVisible();
    await expect(header.historyLink).toBeVisible();
    await expect(header.tasksLink).toBeVisible();
    await expect(header.handbooksTrigger).toBeVisible();

    await expect(header.monitoringLink).toHaveAttribute(
      'href',
      '/monitoring',
    );

    await expect(header.historyLink).toHaveAttribute(
      'href',
      '/monitoringHistory',
    );

    await expect(header.tasksLink).toHaveAttribute(
      'href',
      '/workTask',
    );

    await expect(header.notificationButton).toBeVisible();
    await expect(header.userMenuTrigger).toBeVisible();

    await expect(header.userName).toHaveText(/\S+/);
    await expect(header.organizationCount).toHaveText(/\d+/);
  });
});