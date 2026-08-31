// pages/login.page.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  readonly serverErrorMessage: Locator; 
  readonly fieldValidationErrors: Locator;

  constructor(page: Page) {
    super(page); 
    
    this.loginInput = page.locator('[formcontrolname="username"]'); 
    this.passwordInput = page.locator('app-password-input input');
    this.submitButton = page.locator('.login_button');

    this.serverErrorMessage = page.locator('.error-message, snack-bar-container');  
    
    this.fieldValidationErrors = page.getByText('Обязательное поле');
  }

  async open() {
    await this.page.goto('pages/login');
  }

  async login(login: string, pass: string) {
    await this.loginInput.fill(login);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
  }
}