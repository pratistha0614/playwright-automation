import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly sortDropdown: Locator;
  readonly productItems: Locator;
  readonly cartBadge: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page         = page;
    this.pageTitle    = page.locator('.title');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productItems = page.locator('.inventory_item');
    this.cartBadge    = page.locator('.shopping_cart_badge');
    this.burgerMenu   = page.locator('#react-burger-menu-btn');
    this.logoutLink   = page.locator('#logout_sidebar_link');
  }

  async expectOnProductsPage() {
    await expect(this.pageTitle).toHaveText('Products');
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async addToCartByIndex(index: number) {
    const addButtons = this.page.locator('[data-test^="add-to-cart"]');
    await addButtons.nth(index).click();
  }

  async getProductNames(): Promise<string[]> {
    return await this.page
      .locator('.inventory_item_name')
      .allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.page
      .locator('.inventory_item_price')
      .allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}
