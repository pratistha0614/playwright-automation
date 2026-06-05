import { test, expect } from '../../fixtures/base.fixture';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Login Functionality', () => {

  test('TC001 - Valid login redirects to products page', async ({
    loginPage, productsPage
  }) => {
    await loginPage.goto();
    await loginPage.login(
      process.env.VALID_USERNAME!,
      process.env.VALID_PASSWORD!
    );
    await productsPage.expectOnProductsPage();
  });

  test('TC002 - Login page shows all required elements', async ({
    loginPage
  }) => {
    await loginPage.goto();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('TC003 - Logout redirects back to login page', async ({
    authenticatedPage, loginPage
  }) => {
    await authenticatedPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('TC004 - Session persists after page reload', async ({
    loginPage, productsPage, page
  }) => {
    await loginPage.goto();
    await loginPage.login(
      process.env.VALID_USERNAME!,
      process.env.VALID_PASSWORD!
    );
    await page.reload();
    await productsPage.expectOnProductsPage();
  });

});
