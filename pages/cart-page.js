exports.CartPage = class CartPage {

  constructor(page) {
    this.page = page;
    this.inventoryItem = page.getByTestId('inventory-item');
    this.checkoutBtn = page.getByTestId('checkout');
  }

  async itemsCount() {
    return await this.inventoryItem.count();
  }

  async getItemQuantity(productName) {
    return await this.inventoryItem
      .filter({ hasText: productName })
      .getByTestId('item-quantity')
      .textContent();
  }

  async getItemPrice(productName) {
    return await this.inventoryItem
      .filter({ hasText: productName })
      .getByTestId('inventory-item-price')
      .textContent();
  }

  async goToNextStep() {
    await this.checkoutBtn.click();
  }
}