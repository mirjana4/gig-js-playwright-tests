exports.CheckoutCompletePage = class CheckoutCompletePage {

  constructor(page) {
    this.page = page;
    this.titleLabel = page.getByTestId('title');
    this.completeHeaderLabel = page.getByTestId('complete-header');
    this.completeLabel = page.getByTestId('complete-text');
    this.backBtn = page.getByTestId('back-to-products');
  }

  async getTitle() {
    return await this.titleLabel.textContent();
  }

  async getCompleteHeaderText() {
    return await this.completeHeaderLabel.textContent();
  }

  async getCompleteLabelText() {
    return await this.completeLabel.textContent();
  }

  async back() {
    await this.backBtn.click();
  }
}