import { test, expect } from '../../fixtures/base.fixture';

test.describe('Product Listing and Sorting', () => {

  test('TC005 - Products page shows all 6 items', async ({
    authenticatedPage
  }) => {
    const count = await authenticatedPage.productItems.count();
    expect(count).toBe(6);
  });

  test('TC006 - Sort products by name A to Z', async ({
    authenticatedPage
  }) => {
    await authenticatedPage.sortBy('az');
    const names = await authenticatedPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('TC007 - Sort products by name Z to A', async ({
    authenticatedPage
  }) => {
    await authenticatedPage.sortBy('za');
    const names = await authenticatedPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('TC008 - Sort products by price low to high', async ({
    authenticatedPage
  }) => {
    await authenticatedPage.sortBy('lohi');
    const prices = await authenticatedPage.getProductPrices();
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('TC009 - Sort products by price high to low', async ({
    authenticatedPage
  }) => {
    await authenticatedPage.sortBy('hilo');
    const prices = await authenticatedPage.getProductPrices();
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

  test('TC010 - Clicking product name opens detail page', async ({
    authenticatedPage, page
  }) => {
    await page.locator('.inventory_item_name').first().click();
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page).toHaveURL(/inventory-item/);
  });

});
