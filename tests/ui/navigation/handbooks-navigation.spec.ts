import { test, expect } from '@playwright/test';
import { HeaderComponent } from '../../../components/header.component';
import { MonitoringPage } from '../../../pages/monitoring.page';

const handbooks = [
  {
    name: 'Структура компании',
    path: '/handbooks/organization',
  },
  {
    name: 'Пользователи',
    path: '/handbooks/user',
  },
  {
    name: 'Персонал',
    path: '/handbooks/employee',
  },
  {
    name: 'Должности',
    path: '/handbooks/employeePosition',
  },
  {
    name: 'Роли',
    path: '/handbooks/role',
  },
  {
    name: 'Марка и модель техники',
    path: '/handbooks/vehicleBrand',
  },
  {
    name: 'Техника',
    path: '/handbooks/vehicle',
  },
  {
    name: 'Агрегаты и прицепы',
    path: '/handbooks/aggregateTrailer',
  },
  {
    name: 'Производные Культуры',
    path: '/handbooks/rawCulture',
  },
  {
    name: 'Культуры',
    path: '/handbooks/culture',
  },
  {
    name: 'Геозоны',
    path: '/handbooks/geoZone',
  },
  {
    name: 'Инвентарь',
    path: '/handbooks/inventory',
  },
  {
    name: 'Оборудование Телеметрии',
    path: '/handbooks/tracker',
  },
  {
    name: 'Импорты и шаблоны',
    path: '/handbooks/auditImport',
  },
  {
    name: 'Виды работ',
    path: '/handbooks/workType',
  },
  {
    name: 'Смены работ',
    path: '/handbooks/shift',
  },
] as const;

test.describe('Handbooks menu', () => {
  test('displays all handbook links on hover', async ({ page }) => {
    const monitoringPage = new MonitoringPage(page);
    const header = new HeaderComponent(page);

    await monitoringPage.open();
    await header.openHandbooksMenu();

    await expect(header.handbooksDropdown).toBeVisible();
    await expect(header.handbookLinks).toHaveCount(handbooks.length);

    for (const handbook of handbooks) {
      await expect(
        header.handbookLink(handbook.name),
      ).toBeVisible();
    }
  });

  for (const handbook of handbooks) {
    test(`opens "${handbook.name}" page`, async ({ page }) => {
      const monitoringPage = new MonitoringPage(page);
      const header = new HeaderComponent(page);

      await monitoringPage.open();
      await header.openHandbooksMenu();
      await header.handbookLink(handbook.name).click();

      await expect(page).toHaveURL(
        new RegExp(`${handbook.path}$`),
      );
    });
  }
});