import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';

export class CartPage extends BasePage {
  // Locators
  readonly cartTitle = this.page.locator('.title');
  readonly cartItems = this.page.locator('.cart_item');
  readonly cartItemNames = this.page.locator('.inventory_item_name');
  readonly cartItemPrices = this.page.locator('.inventory_item_price');
  readonly continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
  readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
  readonly removeButtons = this.page.getByRole('button', { name: 'Remove' });
  readonly cartBadge = this.page.locator('.shopping_cart_badge');

  async assertOnCartPage() {
    Logger.step('Memverifikasi sedang di halaman Shopping Cart');
    await expect(this.cartTitle).toHaveText('Your Cart');
    Logger.success('Berhasil masuk ke Cart Page');
  }

  async assertCartItemCount(expectedCount: number) {
    Logger.step(`Memverifikasi jumlah item di cart = ${expectedCount}`);
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async removeFirstItem() {
    Logger.step('Menghapus item pertama dari cart');
    await this.removeButtons.first().click();
  }

  async continueShopping() {
    Logger.step('Klik Continue Shopping');
    await this.continueShoppingButton.click();
  }

  async goToCheckout() {
    Logger.step('Melanjutkan ke Checkout');
    await this.checkoutButton.click();
  }

  async getCartCount(): Promise<string> {
    const count = await this.cartBadge.textContent();
    return count?.trim() || '0';
  }
}