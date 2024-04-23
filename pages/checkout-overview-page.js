exports.CheckoutOverviewPage = class CheckoutOverviewPage {

  constructor(page) {
    this.page = page;
    this.titleLabel = page.getByTestId('title');
    this.paymentInfoLabel = page.getByTestId('payment-info-value');
    this.shippingInfoLabel = page.getByTestId('shipping-info-value');
    this.priceSubtotalLabel = page.getByTestId('subtotal-label');
    this.priceTaxLabel = page.getByTestId('tax-label');
    this.priceTotalLabel = page.getByTestId('total-label');
    this.finishBtn = page.getByTestId('finish');
  }

  async getTitle() {
    return await this.titleLabel.textContent();
  }

  async getPaymentInfo() {
    return await this.paymentInfoLabel.textContent();
  }

  async getShippingInfo() {
    return await this.shippingInfoLabel.textContent();
  }

  async getPriceSubtotal() {
    return await this.priceSubtotalLabel.textContent();
  }

  async getPriceTax() {
    return await this.priceTaxLabel.textContent();
  }

  async getPriceTotal() {
    return await this.priceTotalLabel.textContent();
  }

  async finishPayment() {
    await this.finishBtn.click();
  }
}