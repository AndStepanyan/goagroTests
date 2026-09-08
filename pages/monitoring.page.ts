import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';


export class MonitoringPage extends BasePage {
  readonly root: Locator;
  readonly header: Locator;
  readonly logo: Locator;
  readonly monitoringLink: Locator;

  readonly searchInput: Locator;
  readonly vehicleTab: Locator;
  readonly geoZonesTab: Locator;

  readonly map: Locator;
  readonly statisticsPanel: Locator;
  readonly chart: Locator;

  constructor(page: Page) {
    super(page);

    this.root = page.locator('app-monitoring-main');
    this.header = page.locator('app-navbar');
    this.logo = page.getByRole('img', { name: 'logo' });

    this.monitoringLink = page
      .locator('#main-menu-navigation')
      .getByRole('link', { name: 'Мониторинг', exact: true });

    this.searchInput = this.root.getByPlaceholder('Поиск', {
      exact: true,
    });

    this.vehicleTab = this.root.getByRole('button', {
      name: 'Техника',
      exact: true,
    });

    this.geoZonesTab = this.root.getByRole('button', {
      name: 'Геозоны',
      exact: true,
    });

    this.map = this.root.locator('app-ol-yandex-map #map');
    this.statisticsPanel = this.root.locator('.bottom-sidebar');
    this.chart = this.statisticsPanel.locator('apx-chart');
  }

  async open() {
    await this.page.goto('/monitoring');
  }
}