import { test, expect } from '../../fixtures/base.fixture';

test.describe('Cart Actions', () => {

  test('TC011 - Add one item shows badge count of 1', async ({
    authenticatedPage, cartPage
  }) => {
    await authenticatedPage.addToCartByIndex(0);
    await expect(authenticatedPage.cartBadge).toHaveText('1');
    await authenticatedPage.goToCart();
    await cartPage.expectItemCount(1);
  });

  test('TC012 - Add three items shows badge count of 3', async ({
    authenticatedPage, cartPage
  }) => {
    await authenticatedPage.addToCartByIndex(0);
    await authenticatedPage.addToCartByIndex(1);
    await authenticatedPage.addToCartByIndex(2);
    await expect(authenticatedPage.cartBadge).toHaveText('3');
    await authenticatedPage.goToCart();
    await cartPage.expectItemCount(3);
  });

  test('TC013 - Remove one item decreases cart count', async ({
    authenticatedPage, cartPage
  }) => {
    await authenticatedPage.addToCartByIndex(0);
    await authenticatedPage.addToCartByIndex(1);
    await authenticatedPage.goToCart();
    await cartPage.removeItem(0);
    await cartPage.expectItemCount(1);
  });

  test('TC014 - Continue shopping returns to products page', async ({
    authenticatedPage, cartPage
  }) => {
    await authenticatedPage.goToCart();
    await cartPage.continueShoppingButton.click();
    await authenticatedPage.expectOnProductsPage();
  });

  test('TC015 - Removing all items hides cart badge', async ({
    authenticatedPage, cartPage
  }) => {
    await authenticatedPage.addToCartByIndex(0);
    await authenticatedPage.goToCart();
    await cartPage.removeItem(0);
    await cartPage.expectItemCount(0);
    await expect(authenticatedPage.cartBadge).not.toBeVisible();
  });

});
