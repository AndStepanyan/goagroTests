// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

const authFile = 'playwright/.auth/user.json'; // Сюда сохранится сессия

setup('Авторизация и сохранение сессии', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.open();
  await loginPage.login(process.env.TEST_LOGIN!, process.env.TEST_PASSWORD!);

  await expect(page).toHaveURL("https://eagleeyewebtest.innline.org/monitoring");

  await page.context().storageState({ path: authFile });
});