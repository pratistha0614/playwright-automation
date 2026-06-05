import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page                   = page;
    this.pageTitle              = page.locator('.title');
    this.cartItems              = page.locator('.cart_item');
    this.checkoutButton         = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async expectOnCartPage() {
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async expectItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeItem(index: number) {
    const removeButtons = this.page.locator('[data-test^="remove"]');
    await removeButtons.nth(index).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
