import { test, expect } from '../../fixtures/base.fixture';

test.describe('Checkout Flow', () => {

  test.beforeEach(async ({ authenticatedPage, cartPage }) => {
    await authenticatedPage.addToCartByIndex(0);
    await authenticatedPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('TC016 - Full checkout completes with success message', async ({
    checkoutPage
  }) => {
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderSuccess();
  });

  test('TC017 - Checkout overview shows item total and tax', async ({
    checkoutPage, page
  }) => {
    await checkoutPage.fillShippingInfo('Jane', 'Smith', '67890');
    await expect(page.locator('.summary_subtotal_label')).toBeVisible();
    await expect(page.locator('.summary_tax_label')).toBeVisible();
  });

});
