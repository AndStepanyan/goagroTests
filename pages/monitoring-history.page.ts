import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class MonitoringHistoryPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto('/monitoringHistory');
  }
}