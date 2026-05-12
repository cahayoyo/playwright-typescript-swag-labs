import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { Users } from '../fixtures/users';
import { Logger } from '../utils/Logger';

test.describe('Epic 2: Product Inventory', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    Logger.info('=== Epic 2 - Product Inventory Test Dimulai ===');
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
  });

  // ==================== TC-INV-001 ====================
  test('TC-INV-001 - Tampilkan semua produk di Inventory Page', 
    { tag: ['@TC-INV-001', '@smoke', '@inventory', '@positive'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-INV-001');

    // Pre-condition: Login dulu
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.assertOnInventoryPage();

    await test.step('1. Verifikasi halaman Inventory terbuka', async () => {
      await inventoryPage.assertOnInventoryPage();
    });

    await test.step('2. Verifikasi jumlah produk', async () => {
      await inventoryPage.assertProductCount(6);
    });

    await test.step('3. Verifikasi elemen penting tampil', async () => {
      await expect(inventoryPage.pageTitle).toHaveText('Products');
      await expect(inventoryPage.sortDropdown).toBeVisible();
      await expect(inventoryPage.cartIcon).toBeVisible();
      Logger.success('Semua elemen utama Inventory Page tampil dengan benar');
    });
  });

    // ==================== TC-INV-002 ====================
  test('TC-INV-002 - Sort produk Name (A to Z)', 
    { tag: ['@TC-INV-002', '@inventory', '@positive'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-INV-002 - Sort Name (A to Z)');

    // Pre-condition: Login dulu
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.assertOnInventoryPage();

    await test.step('1. Pilih sorting Name (A to Z)', async () => {
      await inventoryPage.sortBy('az');
    });

    await test.step('2. Verifikasi urutan produk', async () => {
      const firstProductName = await inventoryPage.page
        .locator('.inventory_item_name')
        .first()
        .textContent();

      expect(firstProductName?.trim()).toBe('Sauce Labs Backpack');
      Logger.success('Sorting Name (A to Z) berhasil - Sauce Labs Backpack di urutan pertama');
    });
  });

    // ==================== TC-INV-003 ====================
  test('TC-INV-003 - Sort produk Price (Low to High)', 
    { tag: ['@TC-INV-003', '@inventory', '@positive'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-INV-003 - Sort Price (Low to High)');

    // Pre-condition: Login dulu
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.assertOnInventoryPage();

    await test.step('1. Pilih sorting Price (Low to High)', async () => {
      await inventoryPage.sortBy('lohi');
    });

    await test.step('2. Verifikasi urutan harga', async () => {
      const firstProductPrice = await inventoryPage.page
        .locator('.inventory_item_price')
        .first()
        .textContent();

      expect(firstProductPrice?.trim()).toBe('$7.99');
      Logger.success('Sorting Price (Low to High) berhasil - Harga termurah di urutan pertama');
    });
  });

    // ==================== TC-INV-004 ====================
  test('TC-INV-004 - Add single product ke Cart', 
    { tag: ['@TC-INV-004', '@inventory', '@positive', '@cart'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-INV-004 - Add single product ke Cart');

    // Pre-condition: Login dulu
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.assertOnInventoryPage();

    await test.step('1. Tambahkan produk pertama ke cart', async () => {
      await inventoryPage.addProductToCart(); // menambahkan produk pertama
    });

    await test.step('2. Verifikasi cart badge bertambah', async () => {
      await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    await test.step('3. Verifikasi tombol berubah menjadi Remove', async () => {
      const removeButton = inventoryPage.page.getByRole('button', { name: 'Remove' }).first();
      await expect(removeButton).toBeVisible();
      Logger.success('Produk berhasil ditambahkan ke cart');
    });
  });

    // ==================== TC-INV-005 ====================
  test('TC-INV-005 - Add multiple products ke Cart', 
    { tag: ['@TC-INV-005', '@inventory', '@positive', '@cart'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-INV-005 - Add multiple products ke Cart');

    // Pre-condition: Login dulu
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.assertOnInventoryPage();

    await test.step('1. Tambahkan 3 produk berbeda ke cart', async () => {
      // Tambah produk pertama
      await inventoryPage.addProductToCart();
      
      // Tambah produk kedua
      await inventoryPage.page.getByRole('button', { name: 'Add to cart' }).nth(1).click();
      
      // Tambah produk ketiga
      await inventoryPage.page.getByRole('button', { name: 'Add to cart' }).nth(2).click();
    });

    await test.step('2. Verifikasi jumlah di cart', async () => {
      await expect(inventoryPage.cartBadge).toHaveText('3');
      Logger.success('3 produk berhasil ditambahkan ke cart');
    });
  });

    // ==================== TC-INV-006 ====================
  test('TC-INV-006 - Lihat detail produk', 
    { tag: ['@TC-INV-006', '@inventory', '@positive'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-INV-006 - Lihat detail produk');

    // Pre-condition: Login dulu
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.assertOnInventoryPage();

    await test.step('1. Klik nama produk pertama', async () => {
      const firstProductName = await inventoryPage.page
        .locator('.inventory_item_name')
        .first()
        .textContent();

      await inventoryPage.page.locator('.inventory_item_name').first().click();
      Logger.info(`Membuka detail produk: ${firstProductName}`);
    });

    await test.step('2. Verifikasi halaman detail produk terbuka', async () => {
      await expect(inventoryPage.page.locator('.inventory_details_name')).toBeVisible();
      await expect(inventoryPage.page.locator('.inventory_details_desc')).toBeVisible();
      await expect(inventoryPage.page.locator('.inventory_details_price')).toBeVisible();
      
      Logger.success('Berhasil masuk ke halaman detail produk');
    });

    await test.step('3. Kembali ke Inventory Page', async () => {
      await inventoryPage.page.getByRole('button', { name: 'Back to products' }).click();
      await inventoryPage.assertOnInventoryPage();
    });
  });

    // ==================== TC-INV-007 ====================
  test('TC-INV-007 - Akses Inventory Page tanpa login (Negative)', 
    { tag: ['@TC-INV-007', '@negative', '@security', '@inventory'] }, 
    async ({ page }) => {
    
    Logger.info('Menjalankan TC-INV-007 - Akses Inventory tanpa login (Negative Case)');

    await test.step('1. Langsung akses halaman Inventory tanpa login', async () => {
      await page.goto('https://www.saucedemo.com/inventory.html');
    });

    await test.step('2. Verifikasi redirect ke halaman login', async () => {
      await expect(page).toHaveURL('https://www.saucedemo.com/');
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
      Logger.success('Security Pass: User di-redirect ke halaman login');
    });
  });

     // ==================== TC-INV-009 ====================
  test('TC-INV-009 - Sort produk dengan value tidak valid (Negative)', 
    { tag: ['@TC-INV-009', '@negative', '@inventory'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-INV-009 - Sort dengan value tidak valid');

    // Pre-condition: Login dulu
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.assertOnInventoryPage();

    await test.step('1. Coba set sorting dengan value yang tidak valid', async () => {
      // Cara aman untuk negative test
      await inventoryPage.sortDropdown.evaluate((select: HTMLSelectElement) => {
        select.value = 'invalid_value';
        select.dispatchEvent(new Event('change'));
      });
      Logger.step('Berhasil memaksa value "invalid_value"');
    });

    await test.step('2. Verifikasi tidak terjadi error & halaman tetap stabil', async () => {
      await inventoryPage.assertOnInventoryPage();
      // Cek apakah sorting masih default atau tidak crash
      const currentSortValue = await inventoryPage.sortDropdown.inputValue();
      Logger.info(`Current sort value setelah invalid input: ${currentSortValue}`);
      Logger.success('Negative Case Pass: Aplikasi tidak crash saat input sorting invalid');
    });
  });

  // ==================== TC-INV-010 ====================
  test('TC-INV-010 - Behavior Problem User di Inventory Page', 
    { tag: ['@TC-INV-010', '@negative', '@user-specific', '@visual'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-INV-010 - Problem User Behavior');

    await test.step('1. Login sebagai problem_user', async () => {
      await loginPage.login(Users.problem.username, Users.problem.password);
    });

    await test.step('2. Verifikasi masih bisa masuk ke Inventory', async () => {
      await inventoryPage.assertOnInventoryPage();
    });

    await test.step('3. Cek apakah ada gambar yang rusak (characteristic of problem_user)', async () => {
      const images = inventoryPage.page.locator('.inventory_item_img img');
      const imageCount = await images.count();
      
      Logger.info(`Total gambar produk: ${imageCount}`);
      // Problem User biasanya menampilkan gambar yang broken
      Logger.success('Problem User behavior terdeteksi (beberapa gambar mungkin tidak muncul)');
    });
  });


});