// tests/auth.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('login page, full testing', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.open();
    });

  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(process.env.TEST_LOGIN!, process.env.TEST_PASSWORD!);
    await expect(page).toHaveURL("https://eagleeyewebtest.innline.org/monitoring");
  });

  test('Incorrect password error', async ({ page }) => {
    await loginPage.login(process.env.TEST_LOGIN!, 'WrongPass123!');

    await expect(page).toHaveURL(/.*\/pages\/error/);
  })

  test('Error with non-existent login', async ({ page }) => {
    await loginPage.login('not-exist@goagro.com', process.env.TEST_PASSWORD!);
    await expect(page).toHaveURL(/.*\/pages\/error/);
  });

  test('Empty Format Validation', async ({ page }) => {
    await loginPage.submitButton.click();

    await expect(loginPage.fieldValidationErrors).toHaveCount(2);
    await expect(loginPage.loginInput).toHaveClass(/.*is-invalid/);
    await expect(loginPage.passwordInput).toHaveClass(/.*is-invalid/);

    await expect(page).toHaveURL(/.*\/pages\/login/);

  });
});