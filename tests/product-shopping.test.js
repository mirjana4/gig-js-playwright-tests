const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-page');
const { InventoryPage } = require('../pages/inventory-page');
const { CartPage } = require('../pages/cart-page');
const { CheckoutPage } = require('../pages/checkout-page');
const { CheckoutOverviewPage } = require('../pages/checkout-overview-page');
const { CheckoutCompletePage } = require('../pages/checkout-complete-page');

test.describe('Product Shopping', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;
  let checkoutOverviewPage;
  let checkoutCompletePage;

  const productName = 'Sauce Labs Bike Light';

  test.beforeAll(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('product shopping test', async ({ page }) => {
    // 1. Login page
    await expect(page).toHaveURL('https://www.saucedemo.com');
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Inventory page
    await expect(page).toHaveURL('/inventory.html');
    await expect(await inventoryPage.itemsCount()).toBeGreaterThan(0);

    const productPriceStr = await inventoryPage.getItemPrice(productName);
    const productPrice = parseFloat(productPriceStr.replace('$', ''));

    await inventoryPage.addToCart(productName);
    await inventoryPage.goToCart();

    // 3. Cart page
    await expect(page).toHaveURL('/cart.html');
    await expect(await cartPage.itemsCount()).toBe(1);
    await expect(await cartPage.getItemQuantity(productName)).toBe('1');
    await expect(await cartPage.getItemPrice(productName)).toBe(productPriceStr);

    await cartPage.goToNextStep();

    // 4. Checkout page
    await expect(page).toHaveURL('/checkout-step-one.html');
    await expect(await checkoutPage.getTitle()).toBe('Checkout: Your Information');
    await checkoutPage.fillPaymentDetails('Test', 'Test', '123456');

    await checkoutPage.goToNextStep();

    // 5. Checkout Overview page
    await expect(page).toHaveURL('/checkout-step-two.html');
    await expect(await checkoutOverviewPage.getTitle()).toBe('Checkout: Overview');
    await expect(await checkoutOverviewPage.getPaymentInfo()).toBe('SauceCard #31337');
    await expect(await checkoutOverviewPage.getShippingInfo()).toBe('Free Pony Express Delivery!');
    await expect(await checkoutOverviewPage.getPriceSubtotal()).toBe('Item total: ' + productPriceStr);

    const priceTax = productPrice * 0.08;
    await expect(await checkoutOverviewPage.getPriceTax()).toBe('Tax: $' + priceTax.toFixed(2));
  
    const priceTotal = productPrice + priceTax;
    await expect(await checkoutOverviewPage.getPriceTotal()).toBe('Total: $' + priceTotal.toFixed(2));

    await checkoutOverviewPage.finishPayment();

    // 6. Checkout Complete page
    await expect(page).toHaveURL('/checkout-complete.html');
    await expect(await checkoutCompletePage.getTitle()).toBe('Checkout: Complete!');
    await expect(await checkoutCompletePage.getCompleteHeaderText()).toBe('Thank you for your order!');

    const completeLabelText = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';
    await expect(await checkoutCompletePage.getCompleteLabelText()).toBe(completeLabelText);

    await checkoutCompletePage.back();

    // 7. Inventory page
    await expect(page).toHaveURL('/inventory.html');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
