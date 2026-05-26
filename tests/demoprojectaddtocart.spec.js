// tests/demoprojectaddtocart.spec.js
// TC07 – TC09 - Add to Cart and Purchase
// Data source: TestData/testdata.xlsx
//   Sheet "Products"        → Category, ProductName, TCReference
//   Sheet "PurchaseDetails" → Name, Country, City, CreditCard, Month, Year
//   Sheet "Login"  row 0    → valid credentials for beforeEach login

const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../Pages/LoginPage');

const { CartPage } = require('../Pages/CartPage');

const testData = require('../utils/testdata.json');

async function loginUser(page) {

    const loginPage = new LoginPage(page);

    const creds = testData.validlogincredentials;

    await loginPage.navigateToApplication();

    await loginPage.login(
        creds.username,
        creds.password
    );

    await expect(
        loginPage.welcomeText
    ).toBeVisible();
}

test.describe(
    'Add To Cart and Purchase Functionality',
    () => {

    test(
        'TC07 - Select product and add to cart',
        async ({ page }) => {

        await loginUser(page);

        const cartPage = new CartPage(page);

        await cartPage.selectFirstProduct();

        const alertMessage =
            await cartPage.addToCartAndAcceptAlert();

        expect(alertMessage)
            .toContain('Product added');
    });

    test(
        'TC08 - Add Phone product and complete purchase',
        async ({ page }) => {

        await loginUser(page);

        const cartPage = new CartPage(page);

        await cartPage.goToCategory('phones');

        await cartPage.selectProductByName(
            'Samsung galaxy s6'
        );

        const alertMessage =
            await cartPage.addToCartAndAcceptAlert();

        expect(alertMessage)
            .toContain('Product added');

        await cartPage.goToCart();

        await cartPage.clickPlaceOrder();

        await cartPage.fillOrderForm(
            testData.placeorderDetails
        );

        await cartPage.clickPurchase();

        const confirmationText =
            await cartPage.getConfirmationText();
expect(confirmationText)
    .toContain(
        testData.purchaseSuccessMessage.message
    )
console.log(confirmationText);
        await cartPage.clickConfirmOk();
    });

    test(
        'TC09 - Add Monitor product and complete purchase',
        async ({ page }) => {

        await loginUser(page);

        const cartPage = new CartPage(page);

        await cartPage.goToCategory('monitors');

        await cartPage.selectProductByName(
            'Apple monitor 24'
        );

        const alertMessage =
            await cartPage.addToCartAndAcceptAlert();

        expect(alertMessage)
            .toContain('Product added');

        await cartPage.goToCart();

        await cartPage.clickPlaceOrder();

        await cartPage.fillOrderForm(
            testData.placeorderDetails
        );

        await cartPage.clickPurchase();

        const confirmationText =
            await cartPage.getConfirmationText();
expect(confirmationText)
    .toContain(
        testData.purchaseSuccessMessage.message
    )

        await cartPage.clickConfirmOk();
    })

});