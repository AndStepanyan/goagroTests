// pages/base.page.ts
import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Общий метод для всех страниц. 
  // Например, жесткое ожидание, пока Angular не закончит все сетевые запросы.
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  // Сюда же потом можно будет добавить общие методы, 
  // например: закрыть всплывающее уведомление, обновить страницу и т.д.
}