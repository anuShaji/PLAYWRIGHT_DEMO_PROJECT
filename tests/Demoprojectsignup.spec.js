const { test, expect } = require('@playwright/test');

const { SignupPage } = require('../Pages/SignupPage');

const testData = require('../TestData/testdata.json');

test.describe('Signup Functionality', () => {

    test('TC01 - Sign Up -> Enter Data -> Click Sign Up', async ({ page }) => {

        const signupPage = new SignupPage(page);

        const uniqueUsername =
            testData.signup.username;

        await signupPage.navigateToApplication();

        await signupPage.clickSignupLink();

        await signupPage.enterUsername(uniqueUsername);

        await signupPage.enterPassword(testData.signup.password);

        page.once('dialog', async dialog => {

            console.log(dialog.message());

            await dialog.accept();
        });

        await signupPage.clickSignupButton();

        await page.waitForTimeout(2000);
    });

    test('TC02 - Sign Up -> Enter Data -> Click Close', async ({ page }) => {

        const signupPage = new SignupPage(page);

        await signupPage.navigateToApplication();

        await signupPage.clickSignupLink();
         //await this.username.clear();

        await signupPage.enterUsername(testData.signup.username);

        await signupPage.enterPassword(testData.signup.password);

        await signupPage.clickCloseButton();

        expect(await signupPage.isSignupModalClosed()).toBeTruthy();
    });

});