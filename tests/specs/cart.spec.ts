import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { Users } from '../fixtures/users';
import { Logger } from '../utils/Logger';

test.describe('Epic 3: Shopping Cart', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    Logger.info('=== Epic 3 - Shopping Cart Test Dimulai ===');
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

  });

  // ==================== TC-CART-001 ====================
  test('TC-CART-001 - Add single product ke Cart dan verifikasi di Cart Page', 
    { tag: ['@TC-CART-001', '@smoke', '@cart', '@positive'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-CART-001');
    
    await loginPage.login(Users.standard.username, Users.standard.password);

    await test.step('1. Tambahkan 1 produk dari Inventory Page', async () => {
      await inventoryPage.addProductToCart();
    });

    await test.step('2. Buka Shopping Cart', async () => {
      await inventoryPage.goToCart();
      await cartPage.assertOnCartPage();
    });

    await test.step('3. Verifikasi produk muncul di cart', async () => {
      await cartPage.assertCartItemCount(1);
      const itemName = await cartPage.cartItemNames.first().textContent();
      expect(itemName?.trim()).toContain('Sauce Labs Backpack');
      Logger.success('TC-CART-001 BERHASIL');
    });
  });

  // ==================== TC-CART-002 ====================
  test('TC-CART-002 - Add multiple products ke Cart', 
    { tag: ['@TC-CART-002', '@cart', '@positive'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-CART-002');

    await loginPage.login(Users.standard.username, Users.standard.password);

    await test.step('1. Tambahkan 3 produk berbeda', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
      await inventoryPage.page.getByRole('button', { name: 'Add to cart' }).nth(2).click();
    });

    await test.step('2. Buka Cart dan verifikasi', async () => {
      await inventoryPage.goToCart();
      await cartPage.assertOnCartPage();
      await cartPage.assertCartItemCount(3);
      Logger.success('TC-CART-002 BERHASIL');
    });
  });

  // ==================== TC-CART-003 ====================
  test('TC-CART-003 - Remove product dari Cart', 
    { tag: ['@TC-CART-003', '@cart', '@positive'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-CART-003');

    await loginPage.login(Users.standard.username, Users.standard.password);

    await test.step('1. Tambah produk', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.goToCart();
    });

    await test.step('2. Hapus produk', async () => {
      await cartPage.removeFirstItem();
    });

    await test.step('3. Verifikasi cart kosong', async () => {
      await cartPage.assertCartItemCount(0);
      await expect(cartPage.cartBadge).not.toBeVisible();
      Logger.success('TC-CART-003 BERHASIL');
    });
  });

  // ==================== TC-CART-004 ====================
  test('TC-CART-004 - Continue Shopping dari Cart Page', 
    { tag: ['@TC-CART-004', '@cart', '@positive', '@navigation'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-CART-004');

    await loginPage.login(Users.standard.username, Users.standard.password);

    await test.step('1. Tambah produk dan buka cart', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.goToCart();
    });

    await test.step('2. Klik Continue Shopping', async () => {
      await cartPage.continueShopping();
    });

    await test.step('3. Verifikasi kembali ke Inventory Page', async () => {
      await inventoryPage.assertOnInventoryPage();
      Logger.success('TC-CART-004 BERHASIL');
    });
  });

  // ==================== TC-CART-005 ====================
  test('TC-CART-005 - Cart persist setelah logout & login lagi', 
    { tag: ['@TC-CART-005', '@cart', '@positive', '@persist'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-CART-005');

    await loginPage.login(Users.standard.username, Users.standard.password);

    await test.step('1. Tambah produk ke cart', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.goToCart();
      await cartPage.assertCartItemCount(1);
    });

    await test.step('2. Logout', async () => {
      await inventoryPage.page.getByRole('button', { name: 'Open Menu' }).click();
      await inventoryPage.page.getByRole('link', { name: 'Logout' }).click();
    });

    await test.step('3. Login kembali', async () => {
      await loginPage.login(Users.standard.username, Users.standard.password);
    });

    await test.step('4. Cek cart masih ada isinya', async () => {
      await inventoryPage.goToCart();
      await cartPage.assertCartItemCount(1);
      Logger.success('TC-CART-005 BERHASIL - Cart persist');
    });
  });

     // ==================== TC-CART-006 ====================
  test('TC-CART-006 - Akses Cart Page tanpa login (Negative)', 
    { tag: ['@TC-CART-006', '@negative', '@security', '@cart'] }, 
    async ({ page }) => {
    
    Logger.info('Menjalankan TC-CART-006 - Akses Cart tanpa login (Negative)');

    await test.step('1. Langsung akses Cart Page tanpa login', async () => {
      await page.goto('https://www.saucedemo.com/cart.html', { waitUntil: 'networkidle' });
    });

    await test.step('2. Verifikasi error message muncul', async () => {
      const errorText = page.locator('h3[data-test="error"]'); // locator yang benar
      
      await expect(errorText).toBeVisible({ timeout: 10000 });
      await expect(errorText).toContainText("You can only access '/cart.html' when you are logged in.");
      
      Logger.success('TC-CART-006 BERHASIL - Security error message muncul');
    });
  });

  // ==================== TC-CART-007 ====================
  test('TC-CART-007 - Cart kosong saat pertama kali login', 
    { tag: ['@TC-CART-007', '@cart', '@positive'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-CART-007');

    await loginPage.login(Users.standard.username, Users.standard.password);

    await test.step('1. Buka Cart setelah login', async () => {
      await inventoryPage.goToCart();
      await cartPage.assertOnCartPage();
    });

    await test.step('2. Verifikasi cart kosong', async () => {
      await cartPage.assertCartItemCount(0);
      Logger.success('TC-CART-007 BERHASIL - Cart kosong saat pertama login');
    });
  });

  // ==================== TC-CART-008 ====================
  test('TC-CART-008 - Remove semua produk hingga cart kosong', 
    { tag: ['@TC-CART-008', '@cart', '@positive'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-CART-008');

    await loginPage.login(Users.standard.username, Users.standard.password);

    await test.step('1. Tambah 2 produk', async () => {
      await inventoryPage.addProductToCart();
      await inventoryPage.page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
      await inventoryPage.goToCart();
    });

    await test.step('2. Hapus semua produk', async () => {
      await cartPage.removeFirstItem();
      await cartPage.removeFirstItem();
    });

    await test.step('3. Verifikasi cart benar-benar kosong', async () => {
      await cartPage.assertCartItemCount(0);
      await expect(cartPage.cartBadge).not.toBeVisible();
      Logger.success('TC-CART-008 BERHASIL - Semua produk dihapus');
    });
  });
});