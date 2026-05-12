import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';

export class InventoryPage extends BasePage {
  // Locators
  readonly pageTitle = this.page.locator('.title');
  readonly inventoryItems = this.page.locator('.inventory_item');
  readonly sortDropdown = this.page.locator('.product_sort_container');
  readonly cartBadge = this.page.locator('.shopping_cart_badge');
  readonly cartIcon = this.page.locator('.shopping_cart_link');
  readonly addToCartButtons = this.page.getByRole('button', { name: 'Add to cart' });
  readonly removeButtons = this.page.getByRole('button', { name: 'Remove' });

  async assertOnInventoryPage() {
    Logger.step('Memverifikasi sedang di halaman Inventory');
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.inventoryItems).toHaveCount(6);
    Logger.success('Inventory Page berhasil dimuat (6 produk)');
  }

  async sortBy(optionValue: string) {
    Logger.step(`Mengurutkan produk: ${optionValue}`);
    await this.sortDropdown.selectOption(optionValue);
  }

  async addProductToCart(productName: string = 'first') {
    if (productName === 'first') {
      await this.addToCartButtons.first().click();
    } else {
      await this.page.getByText(productName).locator('..').getByRole('button', { name: 'Add to cart' }).click();
    }
    Logger.success(`Produk ditambahkan ke cart: ${productName}`);
  }

  async goToCart() {
    Logger.step('Membuka Shopping Cart');
    await this.cartIcon.click();
  }

  async getCartCount(): Promise<string> {
    Logger.step('Mengambil jumlah item di cart');
    const count = await this.cartBadge.textContent();
    const result = count?.trim() || '0';
    Logger.info(`Jumlah item di cart: ${result}`);
    return result;
  }

  async assertProductCount(expectedCount: number = 6) {
    Logger.step(`Memverifikasi jumlah produk = ${expectedCount}`);
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }
}