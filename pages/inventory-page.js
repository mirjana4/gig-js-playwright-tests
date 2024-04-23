exports.InventoryPage = class InventoryPage {

  constructor(page) {
    this.page = page;
    this.inventoryItem = page.getByTestId('inventory-item');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async addToCart(productName) {
    await this.inventoryItem
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async itemsCount() {
    return await this.inventoryItem.count();
  }

  async getItemPrice(productName) {
    return await this.inventoryItem
      .filter({ hasText: productName })
      .getByTestId('inventory-item-price')
      .textContent();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}