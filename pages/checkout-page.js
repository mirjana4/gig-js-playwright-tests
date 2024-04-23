exports.CheckoutPage = class CheckoutPage {

  constructor(page) {
    this.page = page;
    this.titleLabel = page.getByTestId('title');
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueBtn = page.getByTestId('continue');
  }

  async getTitle() {
    return this.titleLabel.textContent();
  }

  async fillPaymentDetails(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async goToNextStep() {
    await this.continueBtn.click();
  }
}