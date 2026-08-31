// tests/p
// rofile/settings.spec.ts
import { test, expect } from '@playwright/test';
// import { SettingsPage } from '../../pages/settings.page'; // Твой PageObject

test.describe('История', () => {

  test('Пользователь видит истору', async ({ page }) => {

    await page.goto('/monitoringHistory'); 

    await expect(page).toHaveURL(/.*\/monitoringHistory/);

    



    // // 3. Проверки
    // await expect(page.locator('h1')).toContainText('Настройки');
  });

});
