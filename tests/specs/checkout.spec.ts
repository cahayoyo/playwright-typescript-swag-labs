import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Users } from '../fixtures/users';
import { Logger } from '../utils/Logger';

test.describe('Epic 4: Checkout Process', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    Logger.info('=== Epic 4 - Checkout Process Test Dimulai ===');
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.login(Users.standard.username, Users.standard.password);
  });

  // ==================== TC-CHECK-001 ====================
  test('TC-CHECK-001 - Checkout - Step 1 (Information)', 
    { tag: ['@TC-CHECK-001', '@positive', '@checkout'] }, async () => {
    
    Logger.info('Menjalankan TC-CHECK-001');

    await test.step('1. Tambah produk & mulai checkout', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.goToCart();
      await cartPage.goToCheckout();
      await checkoutPage.assertOnCheckoutStep1();
    });

    await test.step('2. Isi data informasi', async () => {
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.continueToOverview();
    });

    Logger.success('TC-CHECK-001 BERHASIL');
  });

  // ==================== TC-CHECK-002 ====================
  test('TC-CHECK-002 - Checkout - Step 2 (Overview) + Finish', 
    { tag: ['@TC-CHECK-002', '@positive', '@checkout', '@end-to-end'] }, async () => {
    
    Logger.info('Menjalankan TC-CHECK-002');

    await test.step('1. Sampai ke Overview', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.goToCart();
      await cartPage.goToCheckout();
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.continueToOverview();
      await checkoutPage.assertOnCheckoutStep2();
    });

    await test.step('2. Finish Order', async () => {
      await checkoutPage.finishOrder();
      await checkoutPage.assertOrderSuccess();
    });

    Logger.success('TC-CHECK-002 BERHASIL - Full Checkout');
  });

  // ==================== TC-CHECK-003 ====================
  test('TC-CHECK-003 - Checkout dengan data kosong (Negative)', 
    { tag: ['@TC-CHECK-003', '@negative', '@validation', '@checkout'] }, async () => {
    
    Logger.info('Menjalankan TC-CHECK-003');

    await test.step('1. Mulai checkout', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.goToCart();
      await cartPage.goToCheckout();
    });

    await test.step('2. Klik Continue tanpa isi data', async () => {
      await checkoutPage.continueButton.click();
    });

    await test.step('3. Verifikasi error', async () => {
      await expect(checkoutPage.errorMessage).toContainText('First Name is required');
      Logger.success('TC-CHECK-003 BERHASIL');
    });
  });

  // ==================== TC-CHECK-004 ====================
  test('TC-CHECK-004 - Checkout dengan First Name kosong', 
    { tag: ['@TC-CHECK-004', '@negative', '@validation', '@checkout'] }, async () => {
    
    Logger.info('Menjalankan TC-CHECK-004');

    await test.step('1. Mulai checkout', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.goToCart();
      await cartPage.goToCheckout();
    });

    await test.step('2. Isi Last Name & Zip, kosongkan First Name', async () => {
      await checkoutPage.lastNameInput.fill('Doe');
      await checkoutPage.zipCodeInput.fill('12345');
      await checkoutPage.continueButton.click();
    });

    await test.step('3. Verifikasi error', async () => {
      await expect(checkoutPage.errorMessage).toContainText('First Name is required');
      Logger.success('TC-CHECK-004 BERHASIL');
    });
  });

  // ==================== TC-CHECK-005 ====================
  test('TC-CHECK-005 - Checkout dengan Last Name kosong', 
    { tag: ['@TC-CHECK-005', '@negative', '@validation', '@checkout'] }, async () => {
    
    Logger.info('Menjalankan TC-CHECK-005');

    await test.step('1. Mulai checkout', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.goToCart();
      await cartPage.goToCheckout();
    });

    await test.step('2. Isi First Name & Zip, kosongkan Last Name', async () => {
      await checkoutPage.firstNameInput.fill('John');
      await checkoutPage.zipCodeInput.fill('12345');
      await checkoutPage.continueButton.click();
    });

    await test.step('3. Verifikasi error', async () => {
      await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
      Logger.success('TC-CHECK-005 BERHASIL');
    });
  });

  // ==================== TC-CHECK-006 ====================
  test('TC-CHECK-006 - Checkout dengan Zip Code kosong', 
    { tag: ['@TC-CHECK-006', '@negative', '@validation', '@checkout'] }, async () => {
    
    Logger.info('Menjalankan TC-CHECK-006');

    await test.step('1. Mulai checkout', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.goToCart();
      await cartPage.goToCheckout();
    });

    await test.step('2. Isi First & Last Name, kosongkan Zip', async () => {
      await checkoutPage.firstNameInput.fill('John');
      await checkoutPage.lastNameInput.fill('Doe');
      await checkoutPage.continueButton.click();
    });

    await test.step('3. Verifikasi error', async () => {
      await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
      Logger.success('TC-CHECK-006 BERHASIL');
    });
  });

  // ==================== TC-CHECK-007 ====================
  test('TC-CHECK-007 - Cancel Checkout di Step 1', 
    { tag: ['@TC-CHECK-007', '@positive', '@checkout', '@navigation'] }, async () => {
    
    Logger.info('Menjalankan TC-CHECK-007');

    await test.step('1. Mulai checkout', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.goToCart();
      await cartPage.goToCheckout();
    });

    await test.step('2. Klik Cancel', async () => {
      await checkoutPage.cancelButton.click();
    });

    await test.step('3. Verifikasi kembali ke Cart', async () => {
      await cartPage.assertOnCartPage();
      Logger.success('TC-CHECK-007 BERHASIL');
    });
  });

  // ==================== TC-CHECK-008 ====================
  test('TC-CHECK-008 - Cancel Checkout di Step 2', 
    { tag: ['@TC-CHECK-008', '@positive', '@checkout', '@navigation'] }, async () => {
    
    Logger.info('Menjalankan TC-CHECK-008');

    await test.step('1. Sampai ke Step 2', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.goToCart();
      await cartPage.goToCheckout();
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.continueToOverview();
    });

    await test.step('2. Klik Cancel di Overview', async () => {
      await checkoutPage.cancelButton.click();
    });

    await test.step('3. Verifikasi kembali ke Inventory', async () => {
      await inventoryPage.assertOnInventoryPage();
      Logger.success('TC-CHECK-008 BERHASIL');
    });
  });

  // ==================== TC-CHECK-009 ====================
  test('TC-CHECK-009 - Verifikasi total harga di Overview', 
    { tag: ['@TC-CHECK-009', '@positive', '@checkout', '@calculation'] }, async () => {
    
    Logger.info('Menjalankan TC-CHECK-009');

    await test.step('1. Tambah 2 produk', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
      await inventoryPage.goToCart();
      await cartPage.goToCheckout();
    });

    await test.step('2. Isi data & ke Overview', async () => {
      await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
      await checkoutPage.continueToOverview();
    });

    await test.step('3. Verifikasi total harga', async () => {
      const itemTotal = await checkoutPage.itemTotal.textContent();
      const total = await checkoutPage.totalPrice.textContent();

      expect(itemTotal).toContain('$');
      expect(total).toContain('$');
      Logger.success('TC-CHECK-009 BERHASIL - Perhitungan harga benar');
    });
  });
});