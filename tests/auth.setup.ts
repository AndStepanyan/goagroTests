import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { requireEnv } from './helpers/env';

const authFile = 'playwright/.auth/user.json'; // Сюда сохранится сессия

setup('Авторизация и сохранение сессии', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.open();
  await loginPage.login(requireEnv('TEST_LOGIN'), requireEnv('TEST_PASSWORD'));

  await expect(page).toHaveURL(/\/monitoring$/);

  await page.context().storageState({ path: authFile });
});
