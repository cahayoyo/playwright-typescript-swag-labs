import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Users } from '../fixtures/users';
import { Logger } from '../utils/Logger';

test.describe('Epic 1: User Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    Logger.info('=== Test Case Baru Dimulai ===');
    loginPage = new LoginPage(page);
  });

  test.afterEach(async () => {
    Logger.info('=== Test Case Selesai ===\n');
  });

  // ==================== TC-AUTH-001 ====================
  test('TC-AUTH-001 - Login berhasil menggunakan standard_user', 
    { tag: ['@TC-AUTH-001', '@smoke', '@positive', '@auth'] }, 
    async () => {
    
    const user = Users.standard;
    Logger.info(`Menjalankan TC-AUTH-001 | User: ${user.description}`);

    await test.step('1. Buka website Swag Labs', async () => {
      Logger.step('Membuka https://www.saucedemo.com/');
      await loginPage.navigate();
    });

    await test.step('2. Masukkan username dan password', async () => {
      await loginPage.usernameInput.fill(user.username);
      await loginPage.passwordInput.fill(user.password);
      Logger.info(`Input -> Username: ${user.username} | Password: *******`);
    });

    await test.step('3. Klik tombol Login', async () => {
      await loginPage.loginButton.click();
    });

    await test.step('4. Verifikasi berhasil login', async () => {
      await loginPage.assertSuccessfulLogin();
    });
  });

  // ==================== TC-AUTH-002 ====================
  test('TC-AUTH-002 - Login gagal - Username salah', 
    { tag: ['@TC-AUTH-002', '@negative', '@auth'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-AUTH-002 | Negative Case - Username salah');

    await test.step('1. Buka website Swag Labs', async () => {
      Logger.step('Membuka https://www.saucedemo.com/');
      await loginPage.navigate();
    });

    await test.step('2. Masukkan username yang salah', async () => {
      await loginPage.usernameInput.fill('wrong_user');
      await loginPage.passwordInput.fill('secret_sauce');
      Logger.info('Input -> Username: wrong_user | Password: *******');
    });

    await test.step('3. Klik tombol Login', async () => {
      await loginPage.loginButton.click();
    });

    await test.step('4. Verifikasi error message muncul', async () => {
      await loginPage.assertErrorMessage(
        'Epic sadface: Username and password do not match any user in this service'
      );
    });
  });

  // ==================== TC-AUTH-003 ====================
  test('TC-AUTH-003 - Login gagal - Password salah', 
    { tag: ['@TC-AUTH-003', '@negative', '@auth', '@validation'] }, 
    async () => {
    
    const user = Users.standard;
    Logger.info(`Menjalankan TC-AUTH-003 | Negative Case - Password salah`);

    await test.step('1. Buka website Swag Labs', async () => {
      Logger.step('Membuka https://www.saucedemo.com/');
      await loginPage.navigate();
    });

    await test.step('2. Masukkan username benar, password salah', async () => {
      await loginPage.usernameInput.fill(user.username);
      await loginPage.passwordInput.fill('wrong_password');
      Logger.info(`Input -> Username: ${user.username} | Password: wrong_password`);
    });

    await test.step('3. Klik tombol Login', async () => {
      await loginPage.loginButton.click();
    });

    await test.step('4. Verifikasi error message muncul', async () => {
      await loginPage.assertErrorMessage(
        'Epic sadface: Username and password do not match any user in this service'
      );
    });
  });

    // ==================== TC-AUTH-004 ====================
  test('TC-AUTH-004 - Login gagal - Username kosong', 
    { tag: ['@TC-AUTH-004', '@negative', '@auth', '@validation'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-AUTH-004 | Negative Case - Username kosong');

    await test.step('1. Buka website Swag Labs', async () => {
      Logger.step('Membuka https://www.saucedemo.com/');
      await loginPage.navigate();
    });

    await test.step('2. Kosongkan username, isi password', async () => {
      await loginPage.usernameInput.fill('');
      await loginPage.passwordInput.fill('secret_sauce');
      Logger.info('Input -> Username: (kosong) | Password: *******');
    });

    await test.step('3. Klik tombol Login', async () => {
      await loginPage.loginButton.click();
    });

    await test.step('4. Verifikasi error message', async () => {
      await loginPage.assertErrorMessage(
        'Epic sadface: Username is required'
      );
    });
  });

    // ==================== TC-AUTH-005 ====================
  test('TC-AUTH-005 - Login gagal - Password kosong', 
    { tag: ['@TC-AUTH-005', '@negative', '@auth', '@validation'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-AUTH-005 | Negative Case - Password kosong');

    await test.step('1. Buka website Swag Labs', async () => {
      Logger.step('Membuka https://www.saucedemo.com/');
      await loginPage.navigate();
    });

    await test.step('2. Isi username, kosongkan password', async () => {
      await loginPage.usernameInput.fill('standard_user');
      await loginPage.passwordInput.fill('');
      Logger.info('Input -> Username: standard_user | Password: (kosong)');
    });

    await test.step('3. Klik tombol Login', async () => {
      await loginPage.loginButton.click();
    });

    await test.step('4. Verifikasi error message', async () => {
      await loginPage.assertErrorMessage(
        'Epic sadface: Password is required'
      );
    });
  });

     // ==================== TC-AUTH-006 ====================
  test('TC-AUTH-006 - Login gagal - Semua field kosong', 
    { tag: ['@TC-AUTH-006', '@negative', '@auth', '@validation'] }, 
    async () => {
    
    Logger.info('Menjalankan TC-AUTH-006 | Negative Case - Semua field kosong');

    await test.step('1. Buka website Swag Labs', async () => {
      Logger.step('Membuka https://www.saucedemo.com/');
      await loginPage.navigate();
    });

    await test.step('2. Kosongkan semua field', async () => {
      await loginPage.usernameInput.fill('');
      await loginPage.passwordInput.fill('');
      Logger.info('Input -> Username: (kosong) | Password: (kosong)');
    });

    await test.step('3. Klik tombol Login', async () => {
      await loginPage.loginButton.click();
    });

    await test.step('4. Verifikasi error message', async () => {
      await loginPage.assertErrorMessage(
        'Epic sadface: Username is required'
      );
    });
  });

    // ==================== TC-AUTH-007 ====================
  test('TC-AUTH-007 - Login gagal dengan locked_out_user', 
    { tag: ['@TC-AUTH-007', '@negative', '@auth', '@user-specific'] }, 
    async () => {
    
    const user = Users.locked;
    Logger.info(`Menjalankan TC-AUTH-007 | User: ${user.description}`);

    await test.step('1. Buka website Swag Labs', async () => {
      Logger.step('Membuka https://www.saucedemo.com/');
      await loginPage.navigate();
    });

    await test.step('2. Masukkan locked_out_user', async () => {
      await loginPage.usernameInput.fill(user.username);
      await loginPage.passwordInput.fill(user.password);
      Logger.info(`Input -> Username: ${user.username} | Password: *******`);
    });

    await test.step('3. Klik tombol Login', async () => {
      await loginPage.loginButton.click();
    });

    await test.step('4. Verifikasi error message locked user', async () => {
      await loginPage.assertErrorMessage(
        'Epic sadface: Sorry, this user has been locked out.'
      );
    });
  });

    // ==================== TC-AUTH-008 ====================
  test('TC-AUTH-008 - Login berhasil dengan performance_glitch_user', 
    { tag: ['@TC-AUTH-008', '@positive', '@auth', '@user-specific', '@performance'] }, 
    async () => {
    
    const user = Users.performance;   // pastikan sudah ada di users.ts
    Logger.info(`Menjalankan TC-AUTH-008 | User: ${user.description}`);

    await test.step('1. Buka website Swag Labs', async () => {
      Logger.step('Membuka https://www.saucedemo.com/');
      await loginPage.navigate();
    });

    await test.step('2. Masukkan performance_glitch_user', async () => {
      await loginPage.usernameInput.fill(user.username);
      await loginPage.passwordInput.fill(user.password);
      Logger.info(`Input -> Username: ${user.username} | Password: *******`);
    });

    await test.step('3. Klik tombol Login', async () => {
      await loginPage.loginButton.click();
    });

    await test.step('4. Verifikasi berhasil login (meski ada delay)', async () => {
      await loginPage.assertSuccessfulLogin();
      Logger.success('Performance Glitch User berhasil login');
    });
  });

    // ==================== TC-AUTH-009 ====================
  test('TC-AUTH-009 - Logout berhasil', 
    { tag: ['@TC-AUTH-009', '@positive', '@auth', '@smoke'] }, 
    async () => {
    
    const user = Users.standard;
    Logger.info(`Menjalankan TC-AUTH-009 | Logout Test`);

    await test.step('1. Login terlebih dahulu', async () => {
      await loginPage.login(user.username, user.password);
      await loginPage.assertSuccessfulLogin();
    });

    await test.step('2. Klik hamburger menu', async () => {
      await loginPage.page.getByRole('button', { name: 'Open Menu' }).click();
      Logger.step('Menu terbuka');
    });

    await test.step('3. Klik Logout', async () => {
      await loginPage.page.getByRole('link', { name: 'Logout' }).click();
      Logger.step('Klik Logout');
    });

    await test.step('4. Verifikasi kembali ke halaman login', async () => {
      await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/');
      await expect(loginPage.loginButton).toBeVisible();
      Logger.success('Logout BERHASIL - Kembali ke halaman login');
    });
  });

});