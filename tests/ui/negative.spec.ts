import { test, expect } from '../../fixtures/base.fixture';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Negative UI Tests', () => {

  test('TC018 - Invalid credentials shows error message', async ({
    loginPage
  }) => {
    await loginPage.goto();
    await loginPage.login('wrong_user', 'wrong_pass');
    await loginPage.expectErrorMessage(
      'Username and password do not match'
    );
  });

  test('TC019 - Locked out user cannot login', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(
      process.env.LOCKED_USERNAME!,
      process.env.VALID_PASSWORD!
    );
    await loginPage.expectErrorMessage(
      'Sorry, this user has been locked out'
    );
  });

  test('TC020 - Empty form submission shows username required error', async ({
    loginPage
  }) => {
    await loginPage.goto();
    await loginPage.loginButton.click();
    await loginPage.expectErrorMessage('Username is required');
  });

  test('TC021 - Username only without password shows error', async ({
    loginPage
  }) => {
    await loginPage.goto();
    await loginPage.usernameInput.fill('standard_user');
    await loginPage.loginButton.click();
    await loginPage.expectErrorMessage('Password is required');
  });

  test('TC022 - Empty checkout form shows first name required error', async ({
    authenticatedPage, cartPage, checkoutPage
  }) => {
    await authenticatedPage.addToCartByIndex(0);
    await authenticatedPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText(
      'First Name is required'
    );
  });

});
