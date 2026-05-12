import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByPlaceholder('Username');
  readonly passwordInput = this.page.getByPlaceholder('Password');
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  readonly errorMessage = this.page.locator('[data-test="error"]');
  readonly inventoryHeader = this.page.locator('.inventory_list');

  async login(username: string, password: string) {
    Logger.step('Memulai proses login');
    await this.navigate();
    Logger.info(`Mengisi username: ${username}`);
    await this.usernameInput.fill(username);
    Logger.info('Mengisi password');
    await this.passwordInput.fill(password);
    Logger.step('Klik tombol Login');
    await this.loginButton.click();
  }

  async assertSuccessfulLogin() {
    Logger.step('Memverifikasi berhasil login');
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.inventoryHeader).toBeVisible();
    Logger.success('Login BERHASIL - Berada di Inventory Page');
  }
  
  async assertErrorMessage(expectedText: string) {
    Logger.step('Memverifikasi error message');
    await expect(this.errorMessage).toHaveText(expectedText);
    Logger.success(`Error message muncul sesuai: "${expectedText}"`);
  }
}