import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';

export class CheckoutPage extends BasePage {
  // Step 1: Information
  readonly firstNameInput = this.page.getByPlaceholder('First Name');
  readonly lastNameInput = this.page.getByPlaceholder('Last Name');
  readonly zipCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
  readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
  readonly cancelButton = this.page.getByRole('button', { name: 'Cancel' });
  readonly errorMessage = this.page.locator('[data-test="error"]');

  // Step 2: Overview
  readonly overviewTitle = this.page.locator('.title');
  readonly finishButton = this.page.getByRole('button', { name: 'Finish' });
  readonly itemTotal = this.page.locator('.summary_subtotal_label');
  readonly tax = this.page.locator('.summary_tax_label');
  readonly totalPrice = this.page.locator('.summary_total_label');

  // Finish Page
  readonly thankYouHeader = this.page.locator('.complete-header');
  readonly backHomeButton = this.page.getByRole('button', { name: 'Back Home' });

  async assertOnCheckoutStep1() {
    Logger.step('Memverifikasi di Checkout Step 1 (Information)');
    await expect(this.page).toHaveURL(/.*checkout-step-one/);
  }

  async assertOnCheckoutStep2() {
    Logger.step('Memverifikasi di Checkout Step 2 (Overview)');
    await expect(this.page).toHaveURL(/.*checkout-step-two/);
    await expect(this.overviewTitle).toHaveText('Checkout: Overview');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, zipCode: string) {
    Logger.step('Mengisi data checkout');
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  async continueToOverview() {
    Logger.step('Klik Continue ke Overview');
    await this.continueButton.click();
  }

  async finishOrder() {
    Logger.step('Klik Finish Order');
    await this.finishButton.click();
  }

  async assertOrderSuccess() {
    Logger.step('Memverifikasi order berhasil');
    await expect(this.thankYouHeader).toHaveText('Thank you for your order!');
    Logger.success('Checkout BERHASIL - Order Completed');
  }
}