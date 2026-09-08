// pages/base.page.ts
import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }
}